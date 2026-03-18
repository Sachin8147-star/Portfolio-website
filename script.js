// Initialize Lucide Icons
lucide.createIcons();

// =========================================
// THEME TOGGLE
// =========================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateIcons(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    });
}

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

// =========================================
// SCROLL REVEAL
// =========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// =========================================
// LIVE CLOCK
// =========================================
function updateClock() {
    const clockElement = document.getElementById('live-clock');
    if (!clockElement) return;
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}
setInterval(updateClock, 1000);
updateClock();

// =========================================
// MOBILE MENU
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active');
        });

        // Close when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // =========================================
    // SCROLL SPY — Highlight Active Nav Link
    // =========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href') || '';
            if (href.includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });
});
