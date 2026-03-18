// =========================================
// THEME TOGGLE
// =========================================
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {

    // Init icons
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    function updateIcons(theme) {
        if (!sunIcon || !moonIcon) return;
        if (theme === 'dark') {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    }
    updateIcons(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = htmlElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcons(next);
        });
    }

    // =========================================
    // SCROLL REVEAL — reliable mobile version
    // =========================================
    const revealEls = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        revealEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Reveal if any part of element is within viewport
            if (rect.top < windowHeight * 1.05) {
                el.classList.add('visible');
            }
        });
    }

    // Run immediately so elements already on screen appear right away
    checkReveal();

    // Also run on scroll
    window.addEventListener('scroll', checkReveal, { passive: true });

    // =========================================
    // LIVE CLOCK
    // =========================================
    function updateClock() {
        const clockEl = document.getElementById('live-clock');
        if (!clockEl) return;
        clockEl.textContent = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // =========================================
    // MOBILE MENU
    // =========================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // =========================================
    // SCROLL SPY
    // =========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href') || '';
            if (current && href.includes(current)) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

});
