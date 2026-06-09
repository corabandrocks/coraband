// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function markPageLoaded() {
    document.body.classList.remove('is-loading');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markPageLoaded, { once: true });
} else {
    markPageLoaded();
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll with offset for fixed navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.getElementById('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navigation
const nav = document.getElementById('nav');

function updateHeaderOnScroll() {
    const currentScroll = window.pageYOffset;

    if (nav) {
        nav.classList.toggle('scrolled', currentScroll > 0);
        nav.style.boxShadow = currentScroll > 0 ? '0 2px 10px rgba(0, 0, 0, 0.125)' : 'none';
    }

    if (backToTop) {
        backToTop.classList.toggle('visible', currentScroll > 300);
    }
}

window.addEventListener('scroll', () => {
    updateHeaderOnScroll();
}, { passive: true });

window.addEventListener('load', updateHeaderOnScroll);

// Scroll Spy - Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    // Use the middle of the viewport to determine active section
    const scrollPosition = window.pageYOffset + (window.innerHeight / 2);
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if middle of viewport is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);

// Members bio cards
const memberCards = document.querySelectorAll('.member-card');
const membersGrid = document.querySelector('.members-grid');

memberCards.forEach(card => {
    const btn = card.querySelector('.member-thumb');
    const drawer = card.querySelector('.member-bio-drawer');

    btn.addEventListener('click', () => {
        const isOpen = card.classList.contains('is-open');

        // Close all cards
        memberCards.forEach(c => {
            c.classList.remove('is-open');
            c.querySelector('.member-thumb').setAttribute('aria-expanded', 'false');
        });
        membersGrid?.classList.remove('has-open');

        if (!isOpen) {
            card.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
            membersGrid?.classList.add('has-open');
            // After the card expands, scroll it into view if needed
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 350);
        }
    });
});

// Optional: Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe show items for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const showItems = document.querySelectorAll('.show-item');
    const musicEmbeds = document.querySelectorAll('.music-embed');
    
    [...showItems, ...musicEmbeds].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});
