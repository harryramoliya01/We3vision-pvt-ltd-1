// Contact Form with WhatsApp and EmailJS Integration
console.log('Contact.js loaded successfully');

// Global variables
let contactForm = null;
let errorMessage = null;

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

    // Try to initialize immediately
    setTimeout(function() {
        initializeFormImmediately();
    }, 100);

    // Make reinitialize function globally available
    window.reinitializeContactForm = function() {
        console.log('Manual form reinitialization requested...');
        initializeFormImmediately();
        initializeForm();
    };

    console.log('Global test functions defined');
})();

// Function to initialize form immediately
function initializeFormImmediately() {
    contactForm = document.getElementById('contactForm');
    errorMessage = document.getElementById('errorMessage');
    
    console.log('Immediate form check - Contact form found:', contactForm);
    console.log('Immediate form check - Error message element found:', errorMessage);

    if (contactForm) {
        console.log('Adding event listeners to form and buttons immediately');
        
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
            console.log('WhatsApp button event listener added immediately');
        } else {
            console.error('WhatsApp button not found immediately!');
        }
        
        if (emailBtn) {
            emailBtn.addEventListener('click', function(e) {
                console.log('Email button clicked');
                handleButtonClick('email', e);
            });
            console.log('Email button event listener added immediately');
        } else {
            console.error('Email button not found immediately!');
        }
        
        console.log('Form and button event listeners added successfully immediately');
        return true;
    } else {
        console.error('Contact form not found immediately!');
        return false;
    }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("9fbAhK4AecFe8pJUV");
        console.log('EmailJS initialized');
    } else {
        console.log('EmailJS not available');
    }

    // Function to initialize form
    function initializeForm() {
        contactForm = document.getElementById('contactForm');
        errorMessage = document.getElementById('errorMessage');
        
        console.log('Contact form found:', contactForm);
        console.log('Error message element found:', errorMessage);

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
                console.log('WhatsApp button event listener added');
            } else {
                console.error('WhatsApp button not found!');
            }
            
            if (emailBtn) {
                emailBtn.addEventListener('click', function(e) {
                    console.log('Email button clicked');
                    handleButtonClick('email', e);
                });
                console.log('Email button event listener added');
            } else {
                console.error('Email button not found!');
            }
            
            console.log('Form and button event listeners added successfully');
            return true;
        } else {
            console.error('Contact form not found!');
            return false;
        }
    }

    // Try to initialize immediately
    if (!initializeForm()) {
        // If form not found, try again after a short delay
        console.log('Form not found immediately, retrying...');
        setTimeout(function() {
            if (!initializeForm()) {
                // If still not found, try again after another delay
                console.log('Form still not found, retrying again...');
                setTimeout(initializeForm, 1000);
            }
        }, 500);
    }

    // Also try immediate initialization
    initializeFormImmediately();

    // Also listen for content changes (for dynamic loading)
    if (typeof swup !== 'undefined') {
        document.addEventListener('swup:contentReplaced', function() {
            console.log('Content replaced, reinitializing form...');
            setTimeout(initializeForm, 100);
        });
        
        // Also listen for when new content is ready
        document.addEventListener('swup:pageViewReady', function() {
            console.log('Page view ready, reinitializing form...');
            setTimeout(initializeForm, 100);
        });
        
        // Listen for when content is loaded
        document.addEventListener('swup:contentLoaded', function() {
            console.log('Content loaded, reinitializing form...');
            setTimeout(initializeForm, 100);
        });
    }

    // Use MutationObserver to detect when form is added to DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // Check if the added node is the form
                        if (node.id === 'contactForm') {
                            console.log('Form detected by MutationObserver, initializing...');
                            setTimeout(initializeForm, 100);
                        }
                        // Check if the added node contains the form
                        if (node.querySelector && node.querySelector('#contactForm')) {
                            console.log('Form container detected by MutationObserver, initializing...');
                            setTimeout(initializeForm, 100);
                        }
                    }
                });
            }
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Fallback: check periodically for the form
    let checkCount = 0;
    const maxChecks = 10;
    const checkInterval = setInterval(function() {
        const form = document.getElementById('contactForm');
        if (form && !form.hasAttribute('data-initialized')) {
            console.log('Form found during periodic check, initializing...');
            form.setAttribute('data-initialized', 'true');
            initializeForm();
            clearInterval(checkInterval);
        } else if (checkCount >= maxChecks) {
            console.log('Max checks reached, stopping periodic check');
            clearInterval(checkInterval);
        }
        checkCount++;
    }, 1000);

    // Additional check for page transitions
    if (typeof swup !== 'undefined') {
        // When page transitions start, clear any existing initialization
        document.addEventListener('swup:willReplaceContent', function() {
            console.log('Page transition starting, clearing form initialization...');
            const form = document.getElementById('contactForm');
            if (form) {
                form.removeAttribute('data-initialized');
            }
        });
        
        // After page transition, check more frequently
        document.addEventListener('swup:contentReplaced', function() {
            console.log('Page transition complete, starting aggressive form check...');
            let transitionCheckCount = 0;
            const maxTransitionChecks = 20;
            const transitionInterval = setInterval(function() {
                const form = document.getElementById('contactForm');
                if (form && !form.hasAttribute('data-initialized')) {
                    console.log('Form found after page transition, initializing...');
                    form.setAttribute('data-initialized', 'true');
                    initializeForm();
                    clearInterval(transitionInterval);
                } else if (transitionCheckCount >= maxTransitionChecks) {
                    console.log('Max transition checks reached, stopping...');
                    clearInterval(transitionInterval);
                }
                transitionCheckCount++;
            }, 200); // Check every 200ms for faster response
        });
    }

    // Listen for URL changes (for SPA navigation)
    let currentUrl = window.location.href;
    setInterval(function() {
        if (window.location.href !== currentUrl) {
            console.log('URL changed, checking for form...');
            currentUrl = window.location.href;
            setTimeout(initializeForm, 100);
        }
    }, 100);

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', function() {
        console.log('Browser navigation detected, checking for form...');
        setTimeout(initializeForm, 100);
    });

    // Use event delegation on document body for button clicks
    // This will work even if buttons are added dynamically
    document.addEventListener('click', function(e) {
        // Check if clicked element is a WhatsApp or Email button
        if (e.target && e.target.matches && e.target.matches('button[value="whatsapp"], button[value="email"]')) {
            console.log('Button clicked via event delegation:', e.target.value);
            e.preventDefault();
            e.stopPropagation();
            
            // Get the form that contains this button
            const form = e.target.closest('form');
            if (form && form.id === 'contactForm') {
                console.log('Form found via event delegation, handling button click...');
                handleButtonClick(e.target.value, e);
            } else {
                console.error('Form not found for button click via event delegation');
            }
        }
    });

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

// Global functions - moved outside DOMContentLoaded for event delegation
function handleButtonClick(submitType, e) {
    console.log('Button click handler called with type:', submitType);
    e.preventDefault();
    e.stopPropagation();
    
    try {
        // Get the form from the event target
        const form = e.target.closest('form');
        if (!form || form.id !== 'contactForm') {
            console.error('Contact form not found in handleButtonClick');
            showError('Form not found. Please refresh the page.');
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
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
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset();
        }
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
                const form = document.getElementById('contactForm');
                if (form) {
                    form.reset();
                }
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
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            errorElement.style.backgroundColor = '#ff6b6b';
            
            // Hide error after 5 seconds
            setTimeout(() => {
                errorElement.style.display = 'none';
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