// Contact Form with WhatsApp and EmailJS Integration
console.log('Contact.js loaded successfully');

// Global functions for testing - Available immediately
(function() {
    // Define functions immediately when script loads
    window.testJavaScript = function() {
        console.log('JavaScript test function called');
        alert('JavaScript is working!');
    };

    window.testWhatsAppDirect = function() {
        console.log('Testing WhatsApp directly...');
        const whatsappNumber = '917383216096';
        const testMessage = 'Hello from We3vision website!';
        const encodedMessage = encodeURIComponent(testMessage);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        console.log('Opening WhatsApp URL:', whatsappURL);
        window.open(whatsappURL, '_blank');
    };

    console.log('Global test functions defined');
})();

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    const contactForm = document.getElementById('contactForm');
    const errorMessage = document.getElementById('errorMessage');
    
    console.log('Contact form found:', contactForm);
    console.log('Error message element found:', errorMessage);

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("9fbAhK4AecFe8pJUV");
        console.log('EmailJS initialized');
    } else {
        console.log('EmailJS not available');
    }

    if (contactForm) {
        console.log('Adding event listeners to form and buttons');
        
        // Remove any existing event listeners
        contactForm.removeEventListener('submit', handleFormSubmit);
        
        // Add submit event listener to form
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add click event listeners to buttons for better control
        const whatsappBtn = contactForm.querySelector('button[value="whatsapp"]');
        const emailBtn = contactForm.querySelector('button[value="email"]');
        
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function(e) {
                console.log('WhatsApp button clicked');
                handleButtonClick('whatsapp', e);
            });
        }
        
        if (emailBtn) {
            emailBtn.addEventListener('click', function(e) {
                console.log('Email button clicked');
                handleButtonClick('email', e);
            });
        }
        
        console.log('Form and button event listeners added successfully');
    } else {
        console.error('Contact form not found!');
    }

    function handleButtonClick(submitType, e) {
        console.log('Button click handler called with type:', submitType);
        e.preventDefault();
        e.stopPropagation();
        
        try {
            // Get form data
            const formData = new FormData(contactForm);
            const fullName = formData.get('fullName');
            const email = formData.get('email');
            const projectName = formData.get('projectName');
            const mobile = formData.get('mobile');
            const message = formData.get('message');
            
            console.log('Form data collected:', { fullName, email, projectName, mobile, message, submitType });

            // Validate form data
            if (!fullName || !email || !projectName || !mobile || !message) {
                showError('Please fill in all required fields.');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address.');
                return;
            }

            // Validate mobile number (10 digits)
            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(mobile)) {
                showError('Please enter a valid 10-digit mobile number.');
                return;
            }

            // Handle submission based on type
            console.log('Submit type:', submitType);
            
            if (submitType === 'whatsapp') {
                console.log('Handling WhatsApp submission...');
                handleWhatsAppSubmission(fullName, email, projectName, mobile, message);
            } else if (submitType === 'email') {
                console.log('Handling Email submission...');
                handleEmailSubmission(fullName, email, projectName, mobile, message);
            } else {
                console.log('Unknown submit type:', submitType);
                showError('Please select a submission method. Submit type was: ' + submitType);
            }
        } catch (error) {
            console.error('Error in button click handler:', error);
            showError('An error occurred. Please try again.');
        }
    }

    function handleFormSubmit(e) {
        console.log('Form submit event triggered (fallback)');
        e.preventDefault();
        e.stopPropagation();
        console.log('Default form submission prevented');
        
        // This is just a fallback - the main handling is done by button click handlers
        showError('Please use the WhatsApp or Email buttons to submit the form.');
    }

    function handleWhatsAppSubmission(fullName, email, projectName, mobile, message) {
        console.log('WhatsApp submission triggered with:', { fullName, email, projectName, mobile, message });
        
        try {
            // Format message for WhatsApp
            const whatsappMessage = formatWhatsAppMessage(fullName, email, projectName, mobile, message);
            console.log('Formatted WhatsApp message:', whatsappMessage);
            
            // Send to WhatsApp
            sendToWhatsApp(whatsappMessage);
            
            // Show success message
            showSuccess('WhatsApp message prepared! Please send the message.');
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            console.error('Error in WhatsApp submission:', error);
            showError('Error preparing WhatsApp message. Please try again.');
        }
    }

    function handleEmailSubmission(fullName, email, projectName, mobile, message) {
        try {
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                showError('EmailJS is not loaded. Please try WhatsApp instead.');
                return;
            }

            // Show loading message
            showSuccess('Sending email... Please wait.');

            // Prepare email template parameters
            const templateParams = {
                from_name: fullName,
                from_email: email,
                project_name: projectName,
                mobile_number: mobile,
                message: message,
                to_name: 'We3vision Team'
            };

            console.log('Sending email with params:', templateParams);

            // Send email using EmailJS
            emailjs.send('service_kcjn8gj', 'template_tig18om', templateParams)
                .then(function(response) {
                    console.log('EmailJS Success:', response);
                    showSuccess('Email sent successfully! We will get back to you soon.');
                    contactForm.reset();
                }, function(error) {
                    console.error('EmailJS Error:', error);
                    showError('Failed to send email. Please try WhatsApp instead.');
                    
                    // Fallback to WhatsApp if email fails
                    setTimeout(() => {
                        if (confirm('Email failed. Would you like to try WhatsApp instead?')) {
                            handleWhatsAppSubmission(fullName, email, projectName, mobile, message);
                        }
                    }, 2000);
                });
        } catch (error) {
            console.error('Error in email submission:', error);
            showError('Error sending email. Please try WhatsApp instead.');
        }
    }

    function formatWhatsAppMessage(fullName, email, projectName, mobile, message) {
        const currentDate = new Date().toLocaleDateString('en-IN');
        const currentTime = new Date().toLocaleTimeString('en-IN');
        
        return `*New Contact Form Submission* 📝

*Date:* ${currentDate}
*Time:* ${currentTime}

*Contact Details:*
👤 *Name:* ${fullName}
📧 *Email:* ${email}
📱 *Mobile:* ${mobile}

*Project Information:*
💼 *Project Name:* ${projectName}

*Message:*
${message}

---
*Sent from We3vision Website Contact Form*`;
    }

    function sendToWhatsApp(message) {
        try {
            // WhatsApp number
            const whatsappNumber = '917383216096';
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            console.log('Opening WhatsApp URL:', whatsappURL);
            
            // Open WhatsApp in new tab
            const newWindow = window.open(whatsappURL, '_blank');
            
            // Check if window opened successfully
            if (newWindow) {
                console.log('WhatsApp window opened successfully');
            } else {
                console.error('Failed to open WhatsApp window - popup might be blocked');
                // Fallback: show the URL to user
                alert('WhatsApp URL: ' + whatsappURL + '\n\nPlease copy this URL and open it manually if WhatsApp doesn\'t open automatically.');
            }
        } catch (error) {
            console.error('Error opening WhatsApp:', error);
            alert('Error opening WhatsApp. Please try again or contact support.');
        }
    }

    function showError(message) {
        try {
            if (errorMessage) {
                errorMessage.textContent = message;
                errorMessage.style.display = 'block';
                errorMessage.style.backgroundColor = '#ff6b6b';
                
                // Hide error after 5 seconds
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000);
            } else {
                alert('Error: ' + message);
            }
        } catch (error) {
            console.error('Error showing error message:', error);
            alert('Error: ' + message);
        }
    }

    function showSuccess(message) {
        try {
            // Use Toastify for success notification
            if (typeof Toastify !== 'undefined') {
                Toastify({
                    text: message,
                    duration: 5000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#4CAF50",
                    stopOnFocus: true
                }).showToast();
            } else {
                // Fallback to alert if Toastify is not available
                alert('Success: ' + message);
            }
        } catch (error) {
            console.error('Error showing success message:', error);
            alert('Success: ' + message);
        }
    }

    // Add floating label functionality
    try {
        const formInputs = document.querySelectorAll('.form-input, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on page load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
        console.log('Floating labels initialized');
    } catch (error) {
        console.error('Error initializing floating labels:', error);
    }

    console.log('Contact form initialization complete');
}); 