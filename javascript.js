document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // Handle links that target a full page reload or are not hash links
            if (!targetId || targetId === '#') {
                return;
            }

            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                const header = document.querySelector('.header');
                const mainNavUl = document.querySelector('.main-nav ul');
                const hamburgerMenuIcon = document.querySelector('.hamburger-menu i');

                if (targetElement && header) {
                    const headerOffset = header.offsetHeight; // Get header height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile nav if open
                    if (mainNavUl && hamburgerMenuIcon && mainNavUl.classList.contains('active')) {
                        mainNavUl.classList.remove('active');
                        hamburgerMenuIcon.classList.remove('fa-times');
                        hamburgerMenuIcon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.main-nav ul');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    } else {
        console.warn("Hamburger menu or main navigation links not found.");
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Show button after scrolling down 300px
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.warn("Back to Top button not found.");
    }

// FAQ Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentContent = header.nextElementSibling;
            const currentPlusIcon = header.querySelector('.icon-plus');
            const currentMinusIcon = header.querySelector('.icon-minus');

            // Close all others
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherContent = otherHeader.nextElementSibling;
                    const otherPlusIcon = otherHeader.querySelector('.icon-plus');
                    const otherMinusIcon = otherHeader.querySelector('.icon-minus');

                    if (otherContent && otherContent.classList.contains('open')) {
                        otherContent.classList.remove('open');
                        if (otherPlusIcon) otherPlusIcon.classList.remove('hidden');
                        if (otherMinusIcon) otherMinusIcon.classList.add('hidden');
                    }
                }
            });

            // Toggle current
            if (currentContent.classList.contains('open')) {
                currentContent.classList.remove('open');
                if (currentPlusIcon) currentPlusIcon.classList.remove('hidden');
                if (currentMinusIcon) currentMinusIcon.classList.add('hidden');
            } else {
                currentContent.classList.add('open');
                if (currentPlusIcon) currentPlusIcon.classList.add('hidden');
                if (currentMinusIcon) currentMinusIcon.classList.remove('hidden');
            }
        });
    });
} else {
    console.warn("FAQ accordion headers not found.");
}



    // Training Programs Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));

                // Add active class to clicked button and corresponding pane
                button.classList.add('active');
                const targetTab = button.dataset.tab;
                const targetPane = document.getElementById(targetTab);
                if (targetPane) {
                    targetPane.classList.add('active');
                } else {
                    console.warn(`Tab pane with ID '${targetTab}' not found.`);
                }
            });
        });

        // Set initial active tab if none is specified or set by default
        const initialActiveButton = document.querySelector('.tab-button.active');
        if (!initialActiveButton && tabButtons.length > 0) {
            tabButtons[0].click(); // Activate the first tab by default
        }
    } else {
        console.warn("Training program tabs or panes not found.");
    }


    // Testimonial Carousel
    const carousel = document.querySelector('.testimonial-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;

    // --- CRITICAL FIX: Only run carousel logic if all elements are found ---
    if (carousel && prevBtn && nextBtn && testimonialItems.length > 0) {
        function updateCarousel() {
            // Calculate the translation needed. Each item takes 100% width.
            carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
        }

        // Initialize carousel position immediately when loaded
        updateCarousel();

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            updateCarousel();
        });

        // Auto-scroll testimonials (optional)
        // Only enable auto-scroll if there's more than one testimonial
        if (testimonialItems.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialItems.length;
                updateCarousel();
            }, 5000); // Change testimonial every 5 seconds
        }
    } else {
        console.warn("One or more testimonial carousel elements not found. Carousel functionality disabled.");
    }


    // Scroll-triggered animations (Fade-in for services and reasons)
    const fadeInElements = document.querySelectorAll('.fade-in');

    if (fadeInElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, observerOptions);

        fadeInElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        console.warn("No elements with class 'fade-in' found for scroll animations.");
    }


    // Contact Form Submission (Google Apps Script Integration)
const contactForm = document.getElementById('contactForm');
const statusModal = document.getElementById('statusModal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalIcon = document.getElementById('modal-icon');
const closeButton = document.querySelector('.modal .close-button');
const modalOkBtn = document.querySelector('.modal-ok-btn');

if (contactForm && statusModal && modalTitle && modalMessage && modalIcon && closeButton && modalOkBtn) {
    // **IMPORTANT:** Replace with your deployed Google Apps Script Web App URL
    const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbwLDJ3aJjDziqiIuY5XA9O1ZoLj9sw6HGVED6DQ8wugDd1coXgLMb6qWg1o9dnht544/exec'; // <<< REMEMBER TO UPDATE THIS

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData(contactForm); // Get all form data

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
        }

        fetch(googleAppsScriptURL, {
            method: 'POST',
            // NO 'mode: "no-cors"'
            // NO 'headers: { "Content-Type": "application/json" }'
            body: formData // Send the FormData object directly
        })
        .then(response => {
            // When not using 'no-cors', you can read the response.
            // However, Apps Script's `doPost` returns JSON, so we expect that.
            // Check if the response is readable (not opaque) and parse JSON if so.
            // If the script is deployed correctly with "Anyone" access, it should return a standard response.
            return response.json(); // Attempt to parse as JSON
        })
        .then(data => {
            console.log(data); // Log the response from Apps Script
            if (data.status === 'success') {
                showModal('success', 'Message Sent!', 'Thank you for reaching out! We have received your message and will get back to you shortly.');
                contactForm.reset(); // Clear form fields
            } else {
                showModal('error', 'Submission Failed!', 'Error: ' + data.message + '. Please try again or contact us directly at info.produxlab@gmail.com.');
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            showModal('error', 'Submission Failed!', 'Oops! Something went wrong while sending your message. Please try again later. Details: ' + error.message);
        })
        .finally(() => {
            if (submitButton) {
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            }
        });
    });

    function showModal(type, title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modalIcon.innerHTML = ''; // Clear previous icon

        statusModal.classList.remove('success', 'error'); // Clear previous types

        if (type === 'success') {
            statusModal.classList.add('success');
            modalIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        } else if (type === 'error') {
            statusModal.classList.add('error');
            modalIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
        }
        statusModal.style.display = 'flex'; // Show the modal (flex for centering)
    }

    closeButton.addEventListener('click', () => {
        statusModal.style.display = 'none';
    });

    modalOkBtn.addEventListener('click', () => {
        statusModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == statusModal) {
            statusModal.style.display = 'none';
        }
    });
} else {
    console.warn("Contact form or modal elements not fully found. Contact form functionality disabled.");
}

    // Update current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("Span with ID 'currentYear' not found.");
    }


    // // Particles.js (if you choose to implement this for sparkles)
    // // You would need to include the particles.js library and an app.js for configuration.
    // // Ensure the particles.js library is loaded *before* this script.
    // /*
    // Example basic integration:
    if (typeof particlesJS !== 'undefined') {
        const homeSection = document.getElementById('particles-js');
        if (homeSection) {
            // It's often better to target a specific div *inside* the home section for particles
            // For example, <div id="particles-js"></div> within #home
            particlesJS('particles-js', { // 'home' is the ID of the element you want to apply particles to
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        } else {
            console.warn("Particles.js target element (e.g., #home) not found.");
        }
    } else {
        console.warn("Particles.js library not loaded. Ensure you've included it before this script.");
    }

});