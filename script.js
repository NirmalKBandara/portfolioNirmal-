// Global Variables
let isMenuOpen = false;

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingName = document.getElementById('typing-name');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollEffects();
    initializeThemeToggle();
    initializeCanvas(); 
    initializeTiltEffect(); 
});

/* =========================================
   1. Theme Toggle (Updated for Navbar)
   ========================================= */
function initializeThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-nav');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
}

/* =========================================
   2. Typing Effect (Terminal Style)
   ========================================= */
function initializeTypingEffect() {
    if (!typingName) return;
    const text = "Nirmal Bandara";
    let index = 0;
    let isDeleting = false;
    let wait = 2000;
    
    function type() {
        const currentText = text.substring(0, index);
        typingName.textContent = currentText;

        if (!isDeleting && index < text.length) {
            index++;
            setTimeout(type, 100);
        } else if (isDeleting && index > 0) {
            index--;
            setTimeout(type, 50);
        } else {
            // Pause at end or start
            isDeleting = !isDeleting;
            setTimeout(type, isDeleting ? wait : 500);
        }
    }
    setTimeout(type, 1000);
}

/* =========================================
   3. Interactive Canvas Background
   ========================================= */
function initializeCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // Resize handler
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-muted');
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* =========================================
   4. 3D Tilt Effect
   ========================================= */
function initializeTiltEffect() {
    const cards = document.querySelectorAll('.tilt-element');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5; 
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* =========================================
   5. Navigation & Form
   ========================================= */
function initializeNavigation() {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            navMenu.classList.remove('active');
        });
    });
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if(element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
}

function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });
}

// Form logic (Telegram) - Keeping your existing logic
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        const telegramMessage = `New Contact:\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
        const botToken = '8098091330:AAGlqw0b7Xql5qiVxKlO2UcQgcAyEAG500w';
        const chatId = '7772979858';

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: telegramMessage })
        })
        .then(response => response.json())
        .then(data => {
            alert('Message sent!');
            contactForm.reset();
        })
        .catch(error => alert('Failed to send.'))
        .finally(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    });
}

function downloadCV() {
    const link = document.createElement('a');
    link.href = '230081DCV.pdf'; 
    link.download = 'Nirmal_Bandara_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
