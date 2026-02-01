// Preloader Handling
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500); // Small delay for a smooth experience
});
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline with slight delay for techy feel
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hover effect for cursor
const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.borderColor = 'rgba(212, 175, 55, 0.5)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'var(--primary-color)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.querySelector('.scroll-progress');

    // Progress bar
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / scrollTotal) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Advanced Reveal Animation
const revealElements = document.querySelectorAll('.philosophy-card, .project-card, .service-card, .skill-card, .section-header, .hero-content, .hero-image');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Magnetic Buttons Effect
const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline, .logo');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        const x = e.clientX - (position.left + position.width / 2);
        const y = e.clientY - (position.top + position.height / 2);

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

// Contact Form Handling with Formspree AJAX
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        const formData = new FormData(contactForm);

        btn.innerHTML = 'Mengirim Pesan...';
        btn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Thank you for your message! Your inquiry has been successfully sent to my inbox.');
                contactForm.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Sorry, something went wrong. Please try again later.');
                }
            }
        } catch (error) {
            alert('Connection issue. Please check your internet connectivity.');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}

// Initialize Lucide Icons
lucide.createIcons();
