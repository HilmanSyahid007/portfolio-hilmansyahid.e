document.addEventListener('DOMContentLoaded', () => {
    // DOM Selections
    const header = document.querySelector('header');
    const toTop = document.querySelector('#to-top');
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav-menu');
    const darkToggle = document.querySelector('#dark-toggle');
    const html = document.querySelector('html');

    // Header Offset (Calculate after load)
    const fixedNav = header.offsetTop;

    // Fungsi untuk Navbar Fixed & Back to Top visibility
    window.onscroll = function() {
        if (window.pageYOffset > fixedNav) {
            header.classList.add('navbar-fixed');
            toTop.classList.remove('hidden');
            toTop.classList.add('flex');
        } else {
            header.classList.remove('navbar-fixed');
            toTop.classList.remove('flex');
            toTop.classList.add('hidden');
        }
    }

    // Hamburger Menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('hamburger-active');
        navMenu.classList.toggle('hidden');
    });

    // Klik di luar hamburger
    window.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('hamburger-active');
            navMenu.classList.add('hidden');
        }
    });

    // Dark Mode Toggle
    darkToggle.addEventListener('click', function() {
        if (darkToggle.checked) {
            html.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            html.classList.remove('dark');
            localStorage.theme = 'light';
        }
    });

    // Sinkronisasi status toggle saat load
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        darkToggle.checked = true;
        html.classList.add('dark');
    } else {
        darkToggle.checked = false;
        html.classList.remove('dark');
    }

    // Smooth Scroll Logic
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Perlakuan khusus untuk link internal
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - header.offsetHeight;
                    window.scrollTo({
                        top: href === '#home' ? 0 : offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Typing Animation Logic
    const typingText = document.querySelector('#typing-text');
    const roles = [
        'Software Engineer', 
        'Industrial Automation Specialist', 
        'Industrial Informatics Technologist',
        'System Integration Expert'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typingText) type();

    // Scroll Reveal Animation (Intersection Observer)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.section-reveal').forEach(section => {
        revealObserver.observe(section);
    });

    // Scroll Spy (Active Navigation Highlighting)
    const navLinks = document.querySelectorAll('.nav-link');
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('text-primary');
                    link.classList.add('text-dark', 'dark:text-white');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('text-primary');
                        link.classList.remove('text-dark', 'dark:text-white');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => {
        spyObserver.observe(section);
    });
});

