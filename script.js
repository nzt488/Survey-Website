document.addEventListener('DOMContentLoaded', () => {

    // ─── LANGUAGE TOGGLE ────────────────────────────────
    const langToggle = document.getElementById('lang-toggle');
    const enBtn = document.getElementById('lang-en');
    const mrBtn = document.getElementById('lang-mr');
    let currentLang = 'en';

    function setActive(lang) {
        enBtn.classList.toggle('active', lang === 'en');
        mrBtn.classList.toggle('active', lang === 'mr');
    }

    function translate(lang) {
        document.querySelectorAll('[data-en][data-mr]').forEach(el => {
            el.textContent = el.getAttribute(lang === 'en' ? 'data-en' : 'data-mr');
        });
        // Update placeholders
        const nameInput = document.getElementById('fname');
        const phoneInput = document.getElementById('fphone');
        const msgInput = document.getElementById('fmsg');
        if (nameInput) nameInput.placeholder = lang === 'en' ? 'Enter your name' : 'तुमचे नाव लिहा';
        if (phoneInput) phoneInput.placeholder = lang === 'en' ? 'Enter your number' : 'फोन नंबर';
        if (msgInput) msgInput.placeholder = lang === 'en' ? 'Describe your land survey need...' : 'तुमची जमीन मोजणीची गरज सांगा...';
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'mr' : 'en';
        setActive(currentLang);
        translate(currentLang);
    });

    // Initialize active state
    setActive('en');


    // ─── NAVBAR SCROLL EFFECT ───────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });


    // ─── PARALLAX ON HERO ───────────────────────────────
    const parallaxEl = document.getElementById('hero-parallax');
    if (parallaxEl && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY;
            parallaxEl.style.transform = `translateY(${offset * 0.35}px)`;
        }, { passive: true });
    }


    // ─── FADE-IN ON SCROLL (INTERSECTION OBSERVER) ──────
    const fadeEls = document.querySelectorAll('.card, .why-item, .gallery-item, .stat-box, .trust-item');
    fadeEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => observer.observe(el));


    // ─── ENQUIRY FORM → WHATSAPP ─────────────────────────
    const form = document.getElementById('enquiry-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('fname').value.trim();
        const phone = document.getElementById('fphone').value.trim();
        const msg = document.getElementById('fmsg').value.trim();

        if (!name || !phone) return;

        const text =
            `Hello Samarth Surveyors,%0A%0A` +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Phone:* ${encodeURIComponent(phone)}%0A` +
            `*Requirement:* ${encodeURIComponent(msg)}`;

        window.open(`https://wa.me/919511298070?text=${text}`, '_blank');
        form.reset();
    });

});
