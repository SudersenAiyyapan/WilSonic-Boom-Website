/* ═══════════════════════════════════════════════════════════════════════════
   WILSONIC BOOM - MAIN JAVASCRIPT
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initStatCounters();
    initSlideshow();
    initLightbox();
});

/* ── NAVBAR SCROLL EFFECT ───────────────────────────────────────────────── */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ── MOBILE MENU ────────────────────────────────────────────────────────── */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
}

/* ── SCROLL REVEAL ANIMATIONS ───────────────────────────────────────────── */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run on load
}

/* ── STAT COUNTER ANIMATION ─────────────────────────────────────────────── */
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    if (!stats.length) return;

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        };

        updateCounter();
    };

    // Observe when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

/* ── HERO SLIDESHOW ─────────────────────────────────────────────────────── */
function initSlideshow() {
    const slides = document.querySelectorAll('.slideshow-img');
    if (slides.length < 2) return;

    let currentSlide = 0;
    const interval = 4000;

    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    setInterval(nextSlide, interval);
}

/* ── LIGHTBOX ───────────────────────────────────────────────────────────── */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (!lightbox || !lightboxImg) return;

    // Open lightbox on subsystem card click
    document.querySelectorAll('.subsystem-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Only open if not a link
            if (card.tagName !== 'A') {
                const img = card.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightbox.classList.add('active');
                }
            }
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
}

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
