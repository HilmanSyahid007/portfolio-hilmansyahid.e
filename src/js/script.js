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
});

