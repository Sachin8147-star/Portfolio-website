// Apply saved theme immediately to prevent flash
const htmlElement = document.documentElement;
htmlElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');

document.addEventListener('DOMContentLoaded', () => {

    // Init Lucide icons
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // =========================================
    // THEME TOGGLE
    // =========================================
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    function updateIcons(theme) {
        if (!sunIcon || !moonIcon) return;
        sunIcon.classList.toggle('hidden', theme === 'dark');
        moonIcon.classList.toggle('hidden', theme !== 'dark');
    }
    updateIcons(htmlElement.getAttribute('data-theme'));

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcons(next);
        });
    }

    // =========================================
    // SUBTLE SCROLL ANIMATION (enhancement only)
    // Content is ALWAYS visible — we just add a
    // nice animation class when elements scroll in
    // =========================================
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('animate-in');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

        revealEls.forEach(el => obs.observe(el));
    }
    // If IntersectionObserver not supported, content still shows (opacity:1 in CSS)

    // =========================================
    // LIVE CLOCK
    // =========================================
    function updateClock() {
        const el = document.getElementById('live-clock');
        if (!el) return;
        el.textContent = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // =========================================
    // MOBILE MENU
    // =========================================
    const mobileBtn  = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden', !isHidden);
            mobileMenu.classList.toggle('active',  isHidden);
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
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
    const navLinks  = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 220) current = s.id;
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            link.classList.toggle('active', current !== '' && href.includes(current));
        });
    }, { passive: true });

});
