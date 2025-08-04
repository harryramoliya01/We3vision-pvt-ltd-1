// Contact Form with WhatsApp and EmailJS Integration
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const errorMessage = document.getElementById('errorMessage');

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your EmailJS User ID
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const fullName = formData.get('fullName');
            const email = formData.get('email');
            const projectName = formData.get('projectName');
            const mobile = formData.get('mobile');
            const message = formData.get('message');
            const submitType = formData.get('submitType');

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
            if (submitType === 'whatsapp') {
                handleWhatsAppSubmission(fullName, email, projectName, mobile, message);
            } else if (submitType === 'email') {
                handleEmailSubmission(fullName, email, projectName, mobile, message);
            }
        });
    }

    function handleWhatsAppSubmission(fullName, email, projectName, mobile, message) {
        // Format message for WhatsApp
        const whatsappMessage = formatWhatsAppMessage(fullName, email, projectName, mobile, message);
        
        // Send to WhatsApp
        sendToWhatsApp(whatsappMessage);
        
        // Show success message
        showSuccess('WhatsApp message prepared! Please send the message.');
        
        // Reset form
        contactForm.reset();
    }

    function handleEmailSubmission(fullName, email, projectName, mobile, message) {
        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            showError('Email service is not available. Please try WhatsApp instead.');
            return;
        }

        // Prepare email template parameters
        const templateParams = {
            from_name: fullName,
            from_email: email,
            project_name: projectName,
            mobile_number: mobile,
            message: message,
            to_name: 'We3vision Team'
        };

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                showSuccess('Email sent successfully! We will get back to you soon.');
                contactForm.reset();
            }, function(error) {
                showError('Failed to send email. Please try WhatsApp instead.');
                console.error('EmailJS Error:', error);
            });
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
        // WhatsApp number (replace with your actual WhatsApp number)
        const whatsappNumber = '917383216096'; // We3vision's number from the contact page
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.style.backgroundColor = '#ff6b6b';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    function showSuccess(message) {
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
            alert(message);
        }
    }

    // Add floating label functionality
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
}); 