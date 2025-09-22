// Image Carousel Functionality
class ImageCarousel {
    constructor() {
        this.track = document.getElementById('carousel-track');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.indicators = document.querySelectorAll('.indicator');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;

        this.init();
    }

    init() {
        if (!this.track) return;

        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto-play carousel
        this.startAutoPlay();
    }

    updateCarousel() {
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // Change slide every 4 seconds
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Navbar background on scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = 'none';
    }
}

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Fade in animation for sections
function setupFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.about-content, .skill-category, .project-card, .timeline-item, .contact-content');
    const projectItems = document.querySelectorAll('.about-projects li');
    const sideInfo = document.querySelector('.about-side-info');

    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If it's the about section, also animate the project items and side info
                if (entry.target.classList.contains('about-content')) {
                    projectItems.forEach(item => {
                        item.classList.add('visible');
                    });
                    if (sideInfo) {
                        setTimeout(() => {
                            sideInfo.classList.add('visible');
                        }, 600); // Delay after the last project item
                    }
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize word reveal effect for hero title
function initWordRevealEffect() {
    // Word reveal animation is now handled by CSS
    // No JavaScript needed for the new effect
}

// Enhanced fade in animations with staggered delays
function setupEnhancedAnimations() {
    // About section animations
    const aboutIntro = document.querySelector('.about-intro');
    const detailItems = document.querySelectorAll('.detail-item');
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-intro')) {
                    entry.target.classList.add('visible');
                }

                if (entry.target.classList.contains('detail-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, Array.from(detailItems).indexOf(entry.target) * 200);
                }

                if (entry.target.classList.contains('stat-number')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible', 'animate');
                        animateCounter(entry.target);
                    }, Array.from(statNumbers).indexOf(entry.target) * 300);
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements
    if (aboutIntro) observer.observe(aboutIntro);
    detailItems.forEach(item => observer.observe(item));
    statNumbers.forEach(number => observer.observe(number));
}

// Counter animation for stat numbers
function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));

    if (isNaN(number)) return;

    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }

        // Preserve original format (e.g., "1st", "[X]")
        if (text.includes('st') || text.includes('nd') || text.includes('rd') || text.includes('th')) {
            element.textContent = Math.floor(current) + text.replace(/\d+/, '');
        } else if (text.includes('[') && text.includes(']')) {
            element.textContent = text.replace(/\d+/, Math.floor(current));
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Contact form handling
function setupContactForm() {
    const form = document.querySelector('.contact-form form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            showNotification('Thank you for your message! Since this is a static website, please email me directly at maahirahmed2910@gmail.com', 'success');
            form.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: var(--font-sans);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;

    // Set colors based on type
    if (type === 'success') {
        notification.style.background = '#10b981';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
        notification.style.color = 'white';
    } else {
        notification.style.background = '#3b82f6';
        notification.style.color = 'white';
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');

    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme (default to dark)
    let currentTheme = savedTheme || 'dark';

    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Set initial navbar background
    setTimeout(() => {
        handleNavbarScroll();
    }, 100);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Apply theme with smooth transition
        document.documentElement.style.transition = 'all 0.3s ease';
        document.documentElement.setAttribute('data-theme', currentTheme);

        // Save preference
        localStorage.setItem('theme', currentTheme);

        // Update icon
        updateThemeIcon(currentTheme);

        // Update navbar immediately after theme change
        handleNavbarScroll();

        // Remove transition after animation completes
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);

        // Add a subtle animation effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeIcon.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
}

// Parallax effect for hero section
function setupParallax() {
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;

        if (heroSection) {
            heroSection.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Project card hover effects
function setupProjectEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    animateSkillBars();
    setupFadeInAnimations();
    setupEnhancedAnimations();
    setupContactForm();
    setupThemeToggle();
    setupProjectEffects();
    initWordRevealEffect();

    // Initialize carousel
    new ImageCarousel();

    // Setup throttled scroll events
    const throttledScroll = throttle(() => {
        highlightNavigation();
        handleNavbarScroll();
    }, 10);

    window.addEventListener('scroll', throttledScroll);

    // Initial call to set correct nav state
    highlightNavigation();
    handleNavbarScroll();
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Add a subtle loading animation
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;

    loadingScreen.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid #e5e7eb; border-top: 3px solid #6366f1; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="color: #6b7280; font-family: var(--font-sans);">Loading...</p>
        </div>
    `;

    // Add keyframe animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Remove loading screen after a short delay
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(loadingScreen)) {
                loadingScreen.remove();
            }
        }, 500);
    }, 1000);
});

// Easter egg: Konami code
(function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let userInput = [];

    document.addEventListener('keydown', function(e) {
        userInput.push(e.keyCode);
        userInput = userInput.slice(-konamiCode.length);

        if (userInput.join(',') === konamiCode.join(',')) {
            showNotification('🎉 Konami code activated! You found the easter egg!', 'success');
            // Add some fun effect
            document.body.style.animation = 'rainbow 2s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    });

    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(180deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
})();

// ===============================
// CTF CHALLENGE SYSTEM
// ===============================

class CTFChallenge {
    constructor() {
        this.flags = new Set();
        this.totalFlags = 5;
        this.terminal = null;
        this.progress = null;
        this.commands = {
            'help': 'Show available commands',
            'ls': 'List directory contents',
            'cat': 'Display file contents',
            'decode': 'Decode various encodings',
            'cipher': 'Work with ciphers',
            'flag': 'Submit a flag',
            'hint': 'Get a hint for current stage',
            'clear': 'Clear terminal',
            'exit': 'Close terminal'
        };
        this.init();
    }

    init() {
        // Add click sequence listener to logo for CTF activation
        const logo = document.querySelector('.logo-text');
        if (logo) {
            this.setupLogoClickSequence(logo);
        }
    }

    activateCTF() {
        this.showTerminal();
        this.showProgress();
        this.addTerminalLine('🔐 CTF Challenge Activated!');
        this.addTerminalLine('Find 5 hidden flags on this website.');
        this.addTerminalLine('');
        this.addTerminalLine('📝 How to submit flags:');
        this.addTerminalLine('   flag CTF{YourFlagHere}');
        this.addTerminalLine('');
        this.addTerminalLine('Type "hint" for your first clue...');
    }

    showTerminal() {
        const terminal = document.getElementById('ctf-terminal');
        const progress = document.getElementById('ctf-progress');

        if (terminal) {
            terminal.classList.remove('hidden');
            this.terminal = terminal;
            this.setupTerminalInput();
        }

        if (progress) {
            progress.classList.remove('hidden');
            this.progress = progress;
        }
    }

    showProgress() {
        const progress = document.getElementById('ctf-progress');
        if (progress) {
            progress.classList.remove('hidden');
        }
    }

    setupTerminalInput() {
        const input = document.getElementById('terminal-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.processCommand(input.value.trim());
                    input.value = '';
                }
            });
        }
    }

    processCommand(command) {
        this.addTerminalLine(`guest@maahir:~$ ${command}`);

        const [cmd, ...args] = command.split(' ');
        const lowerCmd = cmd.toLowerCase();

        switch (lowerCmd) {
            case 'help':
                this.showHelp();
                break;
            case 'ls':
                this.listFiles();
                break;
            case 'cat':
                this.catFile(args[0]);
                break;
            case 'decode':
                this.decode(args.join(' '));
                break;
            case 'cipher':
                this.cipher(args.join(' '));
                break;
            case 'flag':
                this.submitFlag(args.join(' '));
                break;
            case 'hint':
                this.showHint();
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'exit':
                this.closeTerminal();
                break;
            default:
                this.addTerminalLine(`Command not found: ${lowerCmd}`);
                this.addTerminalLine('Type "help" for available commands.');
        }
    }

    showHelp() {
        this.addTerminalLine('  - help - Show available commands');
        this.addTerminalLine('  - ls - List files');
        this.addTerminalLine('  - cat <file> - View file contents');
        this.addTerminalLine('  - decode <type> <data> - Decode Base64/Binary');
        this.addTerminalLine('  - cipher caesar <shift> <text> - Caesar cipher');
        this.addTerminalLine('  - flag <flag> - Submit discovered flags');
        this.addTerminalLine('  - hint - Get progressive hints');
        this.addTerminalLine('  - clear - Clear terminal');
        this.addTerminalLine('  - exit - Close terminal');
        this.addTerminalLine('');
        this.addTerminalLine('💡 Tip: Start with "hint" to get your first clue!');
    }

    listFiles() {
        this.addTerminalLine('total 8');
        this.addTerminalLine('drwxr-xr-x 2 guest guest 4096 Dec  1 12:00 .');
        this.addTerminalLine('drwxr-xr-x 3 guest guest 4096 Dec  1 12:00 ..');
        this.addTerminalLine('-rw-r--r-- 1 guest guest   42 Dec  1 12:00 secret.txt');
        this.addTerminalLine('-rw-r--r-- 1 guest guest  128 Dec  1 12:00 encrypted.txt');
        this.addTerminalLine('-rwxr-xr-x 1 guest guest  256 Dec  1 12:00 decoder.py');
    }

    catFile(filename) {
        switch (filename) {
            case 'secret.txt':
                this.addTerminalLine('Q1RGe1kwdV9GMHVuZF80bGxfRmw0Z3MhfQ==');
                this.addTerminalLine('');
                this.addTerminalLine('Hint: This looks like Base64...');
                break;
            case 'encrypted.txt':
                this.addTerminalLine('Message 1: Gur frperg vf va gur pbqr. Ybbx pybfryl ng gur Clguba oybpx.');
                this.addTerminalLine('Message 2: PGS{P43f4e_P1cu3e_Z4fg3e}');
                this.addTerminalLine('');
                this.addTerminalLine('Hint: Caesar cipher with shift 13...');
                break;
            case 'decoder.py':
                this.addTerminalLine('#!/usr/bin/env python3');
                this.addTerminalLine('import base64');
                this.addTerminalLine('import binascii');
                this.addTerminalLine('');
                this.addTerminalLine('# Binary message:');
                this.addTerminalLine('# 01000011010101000100011001111011010000100011000101101110001101000111001001111001010111110100010000110011011000110011000001100100001100110111001001111101');
                this.addTerminalLine('');
                this.addTerminalLine('# Use: decode binary <binary_string>');
                break;
            default:
                this.addTerminalLine(`cat: ${filename}: No such file or directory`);
        }
    }

    decode(text) {
        const [type, ...data] = text.split(' ');
        const dataStr = data.join(' ');

        switch (type) {
            case 'base64':
                try {
                    const decoded = atob(dataStr);
                    this.addTerminalLine(`Decoded: ${decoded}`);
                    if (decoded.includes('CTF{')) {
                        this.addTerminalLine('🎉 Flag found! Use "flag <flag>" to submit it.');
                    }
                } catch (e) {
                    this.addTerminalLine('Invalid Base64 string');
                }
                break;
            case 'binary':
                try {
                    const binary = dataStr.replace(/\s/g, '');
                    let result = '';
                    for (let i = 0; i < binary.length; i += 8) {
                        const byte = binary.substr(i, 8);
                        result += String.fromCharCode(parseInt(byte, 2));
                    }
                    this.addTerminalLine(`Decoded: ${result}`);
                    if (result.includes('CTF{')) {
                        this.addTerminalLine('🎉 Flag found! Use "flag <flag>" to submit it.');
                    }
                } catch (e) {
                    this.addTerminalLine('Invalid binary string');
                }
                break;
            default:
                this.addTerminalLine('Supported types: base64, binary');
                this.addTerminalLine('Usage: decode <type> <data>');
        }
    }

    cipher(text) {
        const [type, shift, ...data] = text.split(' ');
        const dataStr = data.join(' ');

        if (type === 'caesar') {
            const shiftNum = parseInt(shift) || 13;
            let result = '';
            for (let char of dataStr) {
                if (char.match(/[a-z]/i)) {
                    const code = char.charCodeAt(0);
                    const base = code >= 65 && code <= 90 ? 65 : 97;
                    result += String.fromCharCode(((code - base + shiftNum) % 26) + base);
                } else {
                    result += char;
                }
            }
            this.addTerminalLine(`Decrypted: ${result}`);
            if (result.includes('CTF{')) {
                this.addTerminalLine('🎉 Flag found! Use "flag <flag>" to submit it.');
            }
        } else {
            this.addTerminalLine('Supported ciphers: caesar');
            this.addTerminalLine('Usage: cipher caesar <shift> <text>');
        }
    }

    submitFlag(flag) {
        const validFlags = [
            'CTF{H1dd3n_1n_C0d3_B10ck}',
            'CTF{D3v3l0p3r_T00ls_4r3_C00l}',
            'CTF{C43s4r_C1ph3r_M4st3r}',
            'CTF{B1n4ry_D3c0d3r}',
            'CTF{Y0u_F0und_4ll_Fl4gs!}'
        ];

        // Normalize flag input (trim whitespace and handle common variations)
        const normalizedFlag = flag.trim();

        if (validFlags.includes(normalizedFlag)) {
            if (!this.flags.has(normalizedFlag)) {
                this.flags.add(normalizedFlag);
                this.addTerminalLine(`✅ Correct flag! Progress: ${this.flags.size}/${this.totalFlags}`);
                this.updateProgress();

                if (this.flags.size === this.totalFlags) {
                    this.completeCTF();
                }
            } else {
                this.addTerminalLine('❌ Flag already submitted!');
            }
        } else {
            this.addTerminalLine('❌ Invalid flag format or incorrect flag.');
            this.addTerminalLine('📝 Flag format: CTF{...}');
            this.addTerminalLine(`📥 You entered: "${normalizedFlag}"`);
        }
    }

    showHint() {
        const flagCount = this.flags.size;
        const hints = [
            'Look at the Python code block on the page. Sometimes hidden there...',
            'Open developer tools and inspect the page source. Look for hidden comments...',
            'I wonder whats in my directory...',
            'Looks like theres some encrytped text files',
            'Look for binary data in the decoder.py file and decode it!'
        ];

        if (flagCount < hints.length) {
            this.addTerminalLine(`Hint ${flagCount + 1}: ${hints[flagCount]}`);
        } else {
            this.addTerminalLine('No more hints available!');
        }
    }

    updateProgress() {
        const stages = [
            'stage-1', 'stage-2', 'stage-3', 'stage-4', 'stage-5'
        ];

        for (let i = 0; i < this.flags.size; i++) {
            const stage = document.getElementById(stages[i]);
            if (stage) {
                stage.classList.add('completed');
            }
        }

        const flagCount = document.getElementById('flag-count');
        if (flagCount) {
            flagCount.textContent = this.flags.size;
        }
    }

    completeCTF() {
        this.addTerminalLine('🎉🎉🎉 CONGRATULATIONS! 🎉🎉🎉');
        this.addTerminalLine('You have found all 5 flags!');
        this.addTerminalLine('You are a true cybersecurity enthusiast!');
        this.addTerminalLine('');
        this.addTerminalLine('Thanks for playing Maahir\'s CTF challenge!');

        // Celebration effect
        setTimeout(() => {
            showNotification('🏆 CTF COMPLETED! You found all flags!', 'success');
        }, 1000);
    }

    clearTerminal() {
        const output = document.getElementById('terminal-output');
        if (output) {
            output.innerHTML = '<div class="terminal-line">Terminal cleared.</div>';
        }
    }

    closeTerminal() {
        if (this.terminal) {
            this.terminal.classList.add('hidden');
        }
        if (this.progress) {
            this.progress.classList.add('hidden');
        }
    }

    addTerminalLine(text) {
        const output = document.getElementById('terminal-output');
        if (output) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.textContent = text;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
        }
    }

    setupLogoClickSequence(logo) {
        this.clickCount = 0;
        this.maxClicks = 5;
        this.colorSequence = [
            '#6366f1', // Default primary
            '#ef4444', // Red
            '#f59e0b', // Amber
            '#10b981', // Emerald
            '#8b5cf6', // Purple
            '#06b6d4'  // Cyan (final unlock)
        ];

        logo.addEventListener('click', (e) => {
            e.preventDefault();
            this.clickCount++;

            // Change color based on click count
            if (this.clickCount <= this.maxClicks) {
                const color = this.colorSequence[this.clickCount];
                logo.style.color = color;
                logo.style.textShadow = `0 0 10px ${color}`;

                // Add pulse animation
                logo.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    logo.style.transform = 'scale(1)';
                }, 200);

                // Show click progress
                if (this.clickCount < this.maxClicks) {
                    this.showClickProgress(this.clickCount, this.maxClicks);
                }
            }

            // Activate CTF on 5th click
            if (this.clickCount === this.maxClicks) {
                setTimeout(() => {
                    this.activateCTFWithSequence(logo);
                }, 500);
            }
        });
    }

    showClickProgress(current, total) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'click-progress-notification';
        notification.textContent = `${current}/${total} - Keep clicking the logo...`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--surface);
            color: var(--primary-color);
            padding: 0.5rem 1rem;
            border: 2px solid var(--primary-color);
            border-radius: 20px;
            font-family: var(--font-mono);
            font-size: 0.9rem;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);

        // Animate out
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }

    activateCTFWithSequence(logo) {
        // Final dramatic effect
        logo.style.animation = 'rainbow 2s ease-in-out, pulse 0.5s ease-in-out 3';

        // Show dramatic unlock message
        const unlockMsg = document.createElement('div');
        unlockMsg.className = 'ctf-unlock-message';
        unlockMsg.innerHTML = `
            <div class="unlock-content">
                <div class="unlock-icon">🔓</div>
                <div class="unlock-text">CTF CHALLENGE UNLOCKED!</div>
                <div class="unlock-subtext">Cybersecurity mode activated</div>
            </div>
        `;
        unlockMsg.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 20000;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;

        const unlockContent = unlockMsg.querySelector('.unlock-content');
        unlockContent.style.cssText = `
            text-align: center;
            color: white;
            font-family: var(--font-mono);
        `;

        const unlockIcon = unlockMsg.querySelector('.unlock-icon');
        unlockIcon.style.cssText = `
            font-size: 4rem;
            margin-bottom: 1rem;
            animation: bounce 1s ease-in-out infinite;
        `;

        const unlockText = unlockMsg.querySelector('.unlock-text');
        unlockText.style.cssText = `
            font-size: 2rem;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 0.5rem;
            text-shadow: 0 0 20px #10b981;
        `;

        const unlockSubtext = unlockMsg.querySelector('.unlock-subtext');
        unlockSubtext.style.cssText = `
            font-size: 1.2rem;
            color: #6366f1;
            opacity: 0.8;
        `;

        document.body.appendChild(unlockMsg);

        // Animate in
        setTimeout(() => {
            unlockMsg.style.opacity = '1';
        }, 100);

        // Start CTF after dramatic pause
        setTimeout(() => {
            unlockMsg.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(unlockMsg)) {
                    document.body.removeChild(unlockMsg);
                }
                this.activateCTF();
            }, 500);
        }, 3000);

        // Add bounce animation
        const bounceStyle = document.createElement('style');
        bounceStyle.textContent = `
            @keyframes bounce {
                0%, 20%, 60%, 100% { transform: translateY(0); }
                40% { transform: translateY(-20px); }
                80% { transform: translateY(-10px); }
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(bounceStyle);
    }
}

// Global function for terminal close button
function closeCTFTerminal() {
    const terminal = document.getElementById('ctf-terminal');
    const progress = document.getElementById('ctf-progress');
    if (terminal) terminal.classList.add('hidden');
    if (progress) progress.classList.add('hidden');
}

// Initialize CTF system
let ctfChallenge;

// Initialize CTF when page loads
document.addEventListener('DOMContentLoaded', function() {
    ctfChallenge = new CTFChallenge();
});