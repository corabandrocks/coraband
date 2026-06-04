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

// Members accordion behavior: keep one column open at a time
const membersGrid = document.querySelector('.band-grid');
const memberPanels = document.querySelectorAll('.band-member');

function updateMembersGridState() {
    if (!membersGrid) {
        return;
    }

    const hasOpenPanel = [...memberPanels].some(panel => panel.dataset.open === 'true');
    membersGrid.classList.toggle('has-open', hasOpenPanel);
}

function scrollMemberToCenter(panel) {
    const navHeight = nav ? nav.offsetHeight : 0;
    const panelRect = panel.getBoundingClientRect();
    const panelCenterY = panelRect.top + (panelRect.height / 2);
    const viewportCenterY = navHeight + ((window.innerHeight - navHeight) / 2);
    const scrollDelta = panelCenterY - viewportCenterY;

    window.scrollBy({
        top: scrollDelta,
        behavior: 'smooth'
    });
}

memberPanels.forEach(panel => {
    panel.addEventListener('click', () => {
        const isCurrentlyOpen = panel.dataset.open === 'true';
        
        // Close all other panels
        memberPanels.forEach(otherPanel => {
            if (otherPanel !== panel) {
                otherPanel.dataset.open = 'false';
            }
        });
        
        // Toggle current panel
        panel.dataset.open = isCurrentlyOpen ? 'false' : 'true';
        updateMembersGridState();

        if (!isCurrentlyOpen) {
            // Wait for layout changes before centering the opened member.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    scrollMemberToCenter(panel);
                });
            });
        }
    });
    
    // Make panel keyboard accessible
    panel.setAttribute('tabindex', '0');
    panel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            panel.click();
        }
    });
});

updateMembersGridState();

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
