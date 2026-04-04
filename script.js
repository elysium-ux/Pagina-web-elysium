document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Revealed Elements
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // If it's a stagger container, we don't need to do more, CSS handles children
                // But for individual reveals:
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal, .stagger-container').forEach(el => {
        revealObserver.observe(el);
    });

    // 1b. Staggered Observer for Methodology Blocks
    const methodologyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.pilar-stagger');
                cards.forEach(card => card.classList.add('active'));
            } else {
                const cards = entry.target.querySelectorAll('.pilar-stagger');
                cards.forEach(card => card.classList.remove('active'));
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: "-100px 0px -100px 0px"
    });

    const methodologyGrid = document.querySelector('.pilares-grid-observer');
    if (methodologyGrid) {
        methodologyObserver.observe(methodologyGrid);
    }

    // 1c. Pain Points Observer
    const painObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.reveal-stagger');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('active');
                    }, index * 100);
                });
            } else {
                const cards = entry.target.querySelectorAll('.reveal-stagger');
                cards.forEach(card => card.classList.remove('active'));
            }
        });
    }, { threshold: 0.1 });

    const painGrid = document.querySelector('.pain-list-v4');
    if (painGrid) {
        painObserver.observe(painGrid);
    }

    // 2. Smooth Scroll for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Global Futuristic Interaction (V4)
    const sphere = document.querySelector('#interactive-sphere');
    const interactiveText = document.querySelector('#interactive-text');
    const glassCards = document.querySelectorAll('.glass-card');
    const scrollRing = document.querySelector('#scrolling-ring');
    const nav = document.querySelector('nav');

    function handleInteractions(e) {
        const scrolled = window.scrollY;

        // Mouse Interaction (Global Parallax)
        if (e && e.type === 'mousemove') {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const moveX = (clientX - innerWidth / 2) / 30;
            const moveY = (clientY - innerHeight / 2) / 30;

            // Hero Elements
            if (sphere) {
                sphere.style.transform = `translate(${moveX * -1.2}px, ${moveY * -1.2}px) rotate(${moveX * 0.05}deg)`;
            }
            if (interactiveText) {
                interactiveText.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${moveY * 0.05}deg) rotateY(${moveX * 0.05}deg)`;
            }

            // Global Glass Cards Parallax
            glassCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < innerHeight && rect.bottom > 0) {
                    card.style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
                }
            });
        }

        // Scroll Interaction (Ring Rotation & Nav)
        if (scrollRing) {
            scrollRing.style.transform = `rotate(${scrolled * 0.2}deg) scale(${1 + Math.min(scrolled / 5000, 0.2)})`;
        }

        if (nav) {
            if (scrolled > 50) {
                nav.style.padding = '15px 0';
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
                nav.style.borderBottom = '1px solid rgba(0, 242, 255, 0.1)';
            } else {
                nav.style.padding = '25px 0';
                nav.style.background = 'transparent';
                nav.style.borderBottom = '1px solid transparent';
            }
        }
    }

    window.addEventListener('mousemove', handleInteractions);
    window.addEventListener('scroll', handleInteractions);
    handleInteractions(); // Initial call

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });

        // Close menu on link click
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            });
        });
    }
});