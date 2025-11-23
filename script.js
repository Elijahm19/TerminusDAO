// Main JavaScript for Terminus DAO Website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    checkSystemTheme();
    initScrollAnimations();
    initScrollProgress();
    initParallax();
    init3DTilt();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }

    themeToggle.addEventListener('click', function() {
        toggleTheme();
    });
}

function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');

    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Check for saved theme preference or use system preference
function checkSystemTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // Use saved preference
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        }
    }
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only auto-switch if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) {
        console.error('Mobile menu elements not found');
        return;
    }

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth Scroll Functionality
function initSmoothScroll() {
    // Get all navigation links that point to sections on the page
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Only handle links that point to elements on this page
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Get the header height to offset the scroll
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;

                // Calculate the target position
                const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px extra padding

                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without triggering scroll
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Active Navigation Link Highlight (Optional Enhancement)
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Call this function if you want active link highlighting
// Commented out by default as it's optional for v0
// highlightActiveSection();

// Utility function to update events dynamically (for future use)
function updateEvents(newEvents) {
    if (typeof events !== 'undefined') {
        events.length = 0;
        events.push(...newEvents);
        if (typeof renderEvents === 'function') {
            renderEvents();
        }
    }
}

// Utility function to update sponsors dynamically (for future use)
function updateSponsors(newSponsors) {
    if (typeof sponsors !== 'undefined') {
        sponsors.length = 0;
        sponsors.push(...newSponsors);
        if (typeof renderSponsors === 'function') {
            renderSponsors();
        }
    }
}

// Scroll Animation with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// Scroll Progress Indicator
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Parallax Scrolling Effect
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// 3D Tilt Effect on Cards
function init3DTilt() {
    const cards = document.querySelectorAll('.event-card, .sponsorship-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
}

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        updateEvents,
        updateSponsors
    };
}
