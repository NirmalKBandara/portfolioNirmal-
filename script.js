// Global Variables
let isMenuOpen = false;
let currentSection = 'home';

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingName = document.getElementById('typing-name');
const contactForm = document.getElementById('contactForm');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeTypingEffect();
    initializeFormHandling();
    initializeAnimations();
    initializeSmoothScrolling();
    initializeThemeToggle();
    initializeFloatingThemeToggle(); 
});

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            if (isMenuOpen) {
                toggleMobileMenu();
            }
            
            // Update active navigation
            updateActiveNav(this);
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

function updateActiveNav(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background on scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation based on scroll position
        updateActiveNavOnScroll();
        
        // Animate elements on scroll
        // animateOnScroll();                       //Still in progress
        
        lastScrollTop = scrollTop;
    });
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
                currentSection = sectionId;
            }
        }
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Typing Effect
function initializeTypingEffect() {
    if (!typingName) return;
    
    const text = "Nirmal Bandara";
    const speed = 100;
    const pause = 2000;
    let index = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = isDeleting ? 
            text.substring(0, index - 1) : 
            text.substring(0, index + 1);
        
        typingName.textContent = currentText;
        
        if (!isDeleting && index === text.length) {
            // Finished typing, start deleting after pause
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pause);
            return;
        }
        
        if (isDeleting && index === 0) {
            // Finished deleting, start typing again
            isDeleting = false;
            setTimeout(typeWriter, speed);
            return;
        }
        
        index = isDeleting ? index - 1 : index + 1;
        const currentSpeed = isDeleting ? speed / 2 : speed;
        
        setTimeout(typeWriter, currentSpeed);
    }
    
    // Add cursor effect
    typingName.style.borderRight = '2px solid #667eea';
    typingName.style.animation = 'blink-cursor 1s infinite';
    
    // Add CSS for cursor animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink-cursor {
            0%, 50% { border-color: #667eea; }
            51%, 100% { border-color: transparent; }
        }
    `;
    document.head.appendChild(style);
    
    // Start typing effect
    setTimeout(typeWriter, 1000);
}

// Form Handling
function initializeFormHandling() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
    
    // Add floating label functionality
    const formFields = document.querySelectorAll('.form-field input, .form-field textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (field.value) {
            field.parentNode.classList.add('focused');
        }
    });
}

function handleFormSubmission() {
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        
        // Remove focused class from form fields
        document.querySelectorAll('.form-field').forEach(field => {
            field.classList.remove('focused');
        });
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const telegramMessage = 
        `New Contact Form Submission:\n` +
        `Name: ${firstName} ${lastName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Message: ${message}`;

    const botToken = '8098091330:AAGlqw0b7Xql5qiVxKlO2UcQgcAyEAG500w';
    const chatId = '7772979858';

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent to Telegram!');
    })
    .catch(error => {
        alert('Failed to send message.');
    });
});

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#48bb78' : '#f56565'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for different elements
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillCard(entry.target);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
                
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .skill-card,
        .project-card,
        .stat,
        .contact-item,
        .about-text,
        .hero-text,
        .hero-image
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function animateOnScroll() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.parallax');
    
    parallax.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

function animateSkillCard(card) {
    const delay = Math.random() * 300;
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, delay);
}

function animateProjectCard(card) {
    const delay = Math.random() * 200;
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    }, delay);
}

function animateCounter(stat) {
    const numberElement = stat.querySelector('.stat-number');
    const finalNumber = parseInt(numberElement.textContent);
    const duration = 2000;
    const increment = finalNumber / (duration / 16);
    let currentNumber = 0;
    
    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            numberElement.textContent = finalNumber + '+';
            clearInterval(counter);
        } else {
            numberElement.textContent = Math.floor(currentNumber) + '+';
        }
    }, 16);
}

// Utility Functions
function downloadCV() {
    // Create a temporary link for CV download
    const link = document.createElement('a');
    link.href = 'https://github.com/NirmalKBandara/portfolioNirmal-/blob/main/230081DCV.pdf'; // Replace with actual CV path
    link.download = 'Nirmal_Bandara_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('CV download started!', 'success');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS classes for animations
const animationStyles = `
    .skill-card,
    .project-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .skill-card.animate-in,
    .project-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-text {
        opacity: 0;
        transform: translateX(-50px);
        animation: slideInLeft 1s ease-out forwards;
    }
    
    .hero-image {
        opacity: 0;
        transform: translateX(50px);
        animation: slideInRight 1s ease-out forwards;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Add animation styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Performance optimization
const debouncedScrollHandler = debounce(updateActiveNavOnScroll, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// Preload important images
function preloadImages() {
    const imageUrls = [
        // Add your image URLs here
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();

// Export functions for external use
window.portfolioFunctions = {
    scrollToSection,
    downloadCV,
    showNotification
};

// ===== THEME TOGGLE FUNCTIONALITY =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a little animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

// Floating theme toggle functionality
function initializeFloatingThemeToggle() {
    const floatingToggle = document.getElementById('floatingThemeToggle');
    const floatingIcon = document.getElementById('floatingThemeIcon');
    const heroSection = document.getElementById('home');
    
    // Show/hide floating toggle based on hero section visibility
    function handleScroll() {
        const heroRect = heroSection.getBoundingClientRect();
        const isHeroVisible = heroRect.bottom > 100;
        
        if (isHeroVisible) {
            floatingToggle.classList.remove('visible');
        } else {
            floatingToggle.classList.add('visible');
        }
    }
    
    // Update floating icon
    function updateFloatingIcon(theme) {
        if (theme === 'dark') {
            floatingIcon.className = 'fas fa-moon';
        } else {
            floatingIcon.className = 'fas fa-sun';
        }
    }
    
    // Click handler for floating toggle
    floatingToggle.addEventListener('click', () => {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        updateFloatingIcon(newTheme);
        
        // Animation
        floatingToggle.style.transform = 'translateY(-5px) scale(0.9)';
        setTimeout(() => {
            floatingToggle.style.transform = 'translateY(0) scale(1)';
        }, 150);
    });
    
    // Initialize floating icon
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    updateFloatingIcon(currentTheme);
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
}

