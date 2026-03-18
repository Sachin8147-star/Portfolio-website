// Apply saved theme before paint
const html = document.documentElement;
html.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');

document.addEventListener('DOMContentLoaded', () => {

    if (typeof lucide !== 'undefined') lucide.createIcons();

    // ── DESKTOP NAV SHOW/HIDE ──
    function checkDesk() {
        const dn = document.getElementById('desk-nav');
        const mb = document.getElementById('mob-btn');
        if (dn) dn.style.display = window.innerWidth >= 768 ? 'flex' : 'none';
        if (mb) mb.style.display = window.innerWidth >= 768 ? 'none' : 'block';
    }
    checkDesk();
    window.addEventListener('resize', checkDesk);

    // ── THEME TOGGLE ──
    const toggle = document.getElementById('theme-toggle');
    const sunI   = document.getElementById('sun-icon');
    const moonI  = document.getElementById('moon-icon');

    function applyTheme(t) {
        html.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
        if (sunI)  sunI.style.display  = t === 'light' ? 'block' : 'none';
        if (moonI) moonI.style.display = t === 'dark'  ? 'block' : 'none';
    }
    applyTheme(localStorage.getItem('theme') || 'dark');

    if (toggle) toggle.addEventListener('click', () =>
        applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
    );

    // ── MOBILE MENU ──
    const mobBtn  = document.getElementById('mob-btn');
    const mobMenu = document.getElementById('mobile-menu');
    if (mobBtn && mobMenu) {
        mobBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobMenu.style.display = mobMenu.style.display === 'block' ? 'none' : 'block';
        });
        document.querySelectorAll('.mobile-link').forEach(l =>
            l.addEventListener('click', () => { mobMenu.style.display = 'none'; })
        );
        document.addEventListener('click', (e) => {
            if (!mobMenu.contains(e.target) && !mobBtn.contains(e.target))
                mobMenu.style.display = 'none';
        });
    }

    // ── LIVE CLOCK ──
    function tick() {
        const el = document.getElementById('live-clock');
        if (el) el.textContent = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        });
    }
    setInterval(tick, 1000); tick();

    // ── RESPONSIVE GRIDS ──
    function checkGrids() {
        const w = window.innerWidth;
        document.querySelectorAll('.projects-grid').forEach(g => {
            g.style.gridTemplateColumns = w >= 640 ? '1fr 1fr' : '1fr';
        });
        document.querySelectorAll('.skills-grid').forEach(g => {
            g.style.gridTemplateColumns = w >= 768 ? '1fr 1fr 1fr' : w >= 640 ? '1fr 1fr' : '1fr';
        });
        document.querySelectorAll('.about-grid').forEach(g => {
            g.style.gridTemplateColumns = w >= 1024 ? '1fr 1fr' : '1fr';
        });
    }
    checkGrids();
    window.addEventListener('resize', checkGrids);

    // ── SCROLL SPY ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let cur = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 220) cur = s.id; });
        navLinks.forEach(l => {
            const href = l.getAttribute('href') || '';
            l.classList.toggle('active', cur !== '' && href.includes(cur));
        });
    }, { passive: true });

});