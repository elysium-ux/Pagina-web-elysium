document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Revealed Elements - Optimized Timing
    const revealOptions = {
        threshold: 0.3, // Requiere que el 30% sea visible
        rootMargin: "0px 0px -150px 0px" // Retrasa la activación para que sea más centrada
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
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
        threshold: 0.4,
        rootMargin: "-150px 0px -150px 0px"
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
    }, { 
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
    });

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

    // 3. Global Futuristic Interaction (V4) - Optimized for 60fps
    const sphere = document.querySelector('#interactive-sphere');
    const interactiveText = document.querySelector('#interactive-text');
    const glassCards = document.querySelectorAll('.glass-card');
    const scrollRing = document.querySelector('#scrolling-ring');
    const nav = document.querySelector('nav');

    let lastScrollY = window.scrollY;
    let mouseX = 0, mouseY = 0;
    let ticking = false;

    function updateAnimations() {
        const scrolled = window.scrollY;

        // Scroll Interaction (Ring Rotation & Nav)
        if (scrollRing) {
            scrollRing.style.transform = `rotate(${scrolled * 0.15}deg) scale(${1 + Math.min(scrolled / 5000, 0.1)}) translateZ(0)`;
        }

        if (nav) {
            if (scrolled > 50) {
                nav.style.padding = '15px 0';
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
                nav.style.borderBottom = '1px solid rgba(0, 242, 255, 0.1)';
            } else {
                nav.style.padding = '25px 0';
                nav.style.background = 'transparent';
                nav.style.borderBottom = '1px solid transparent';
            }
        }

        // Mouse Parallax (Solo si hay movimiento)
        const moveX = (mouseX - window.innerWidth / 2) / 40;
        const moveY = (mouseY - window.innerHeight / 2) / 40;

        if (sphere) {
            sphere.style.transform = `translate3d(${moveX * -1.5}px, ${moveY * -1.5}px, 0) rotate(${moveX * 0.05}deg)`;
        }
        if (interactiveText) {
            interactiveText.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${moveY * 0.03}deg) rotateY(${moveX * 0.03}deg)`;
        }

        // Glass Cards Parallax
        glassCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                card.style.transform = `translate3d(${moveX * 0.15}px, ${moveY * 0.15}px, 0)`;
            }
        });

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    updateAnimations(); // Initial render

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

    // 4. Human Image Carousel Logic (Reel)
    const reelImages = document.querySelectorAll('#human-reel img');
    let reelIndex = 0;

    function rotateHumanReel() {
        if (reelImages.length > 1) {
            reelImages[reelIndex].classList.remove('active');
            reelIndex = (reelIndex + 1) % reelImages.length;
            reelImages[reelIndex].classList.add('active');
        }
    }

    if (reelImages.length > 0) {
        setInterval(rotateHumanReel, 4000);
    }

    // 5. Scalability Test Logic
    let currentStep = 0;
    let score = 0;
    let responses = []; // Array to store individual answer texts
    const totalSteps = 10;

    window.openTest = function () {
        document.getElementById('test-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.closeTest = function () {
        document.getElementById('test-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
        currentStep = 0;
        score = 0;
        responses = [];
        updateStepUI();
    };

    window.nextStep = function (step) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        currentStep = step;
        document.getElementById(`step-${currentStep}`).classList.add('active');
        updateProgress();
    };

    window.saveAnswer = function (points, next, answerText) {
        score += points;
        responses.push(answerText);
        nextStep(next + 1);
    };

    window.finishTest = function (e) {
        e.preventDefault();

        const nombre = e.target.querySelector('input[type="text"]').value;
        const email = e.target.querySelector('input[type="email"]').value;
        const finalScore = (score / 40) * 100;
        const nivel = document.getElementById('result-title').innerText;

        const data = {
            nombre: nombre,
            email: email,
            puntaje: Math.round(finalScore),
            nivel: nivel,
            respuestas: responses
        };

        const scriptURL = 'https://script.google.com/macros/s/AKfycbxV-UUctHhYF4qCvMTXJJQDF_7SUCq-Izc3siyqlc6CtLssxbkZCPAUq2F4-EFrIxE/exec';

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(() => console.log('Lead y respuestas enviadas a Elysium Sheets'))
            .catch(error => console.error('Error al enviar:', error));

        nextStep(12);
        displayResults();
    };

    function updateProgress() {
        const progress = (currentStep / totalSteps) * 100;
        document.getElementById('test-progress').style.width = `${Math.min(progress, 100)}%`;
    }

    function updateStepUI() {
        document.querySelectorAll('.test-step').forEach(step => step.classList.remove('active'));
        document.getElementById('step-0').classList.add('active');
        document.getElementById('test-progress').style.width = '0%';
    }

    function displayResults() {
        const finalScore = Math.round((score / 40) * 100);
        const nombreInput = document.querySelector('#lead-form input[type="text"]');
        const nombre = (nombreInput && nombreInput.value) ? nombreInput.value : "Interesado";
        
        document.getElementById('result-score').innerText = `${finalScore}%`;
        
        const titleEl = document.getElementById('result-title');
        const descEl = document.getElementById('result-desc');
        const whatsappBtn = document.getElementById('whatsapp-btn');

        if (finalScore < 40) {
            titleEl.innerText = "Nivel: Operativo Atrapado";
            descEl.innerText = "Tu negocio depende totalmente de ti. Necesitas ingeniería de procesos urgente para recuperar tu libertad.";
        } else if (finalScore < 75) {
            titleEl.innerText = "Nivel: En Crecimiento";
            descEl.innerText = "Tienes una estructura base, pero existen cuellos de botella que frenan tu rentabilidad.";
        } else {
            titleEl.innerText = "Nivel: Autoridad Escalable";
            descEl.innerText = "Tu empresa tiene bases sólidas. Elysium puede ayudarte a optimizar el rendimiento al máximo nivel.";
        }

        // Forzar actualización de URL de WhatsApp
        const mensaje = `Hola, soy ${nombre} y mi empresa tiene una calificación de ${finalScore}% en escalabilidad y me gustaría programar una consultoría GRATIS, por favor.`;
        const waUrl = `https://wa.me/522203215455?text=${encodeURIComponent(mensaje)}`;
        
        if (whatsappBtn) {
            whatsappBtn.setAttribute('href', waUrl);
        }
    }

    // --- Interactividad del Halo por Giroscopio (Mobile) ---
    const interactiveElements = document.querySelectorAll('#interactive-sphere, .footer-arc');
    
    function initGyroscope() {
        if (window.DeviceOrientationEvent) {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation, { passive: true });
                        }
                    })
                    .catch(console.error);
            } else {
                window.addEventListener('deviceorientation', handleOrientation, { passive: true });
            }
        }
    }

    // Activar al primer toque en cualquier parte del documento
    document.addEventListener('click', initGyroscope, { once: true });

    function handleOrientation(event) {
        if (window.innerWidth > 991) return;

        const x = event.gamma; // Izquierda/Derecha
        const y = event.beta;  // Frente/Atrás

        // Normalización para una sensación fluida
        const moveX = (x / 20) * 15; 
        const moveY = ((y - 45) / 20) * 15; 

        interactiveElements.forEach(el => {
            if (el.classList.contains('footer-arc')) {
                el.style.transform = `translateX(calc(-50% + ${moveX}px)) translateY(${moveY}px) translateZ(0)`;
            } else {
                el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            }
        });
    }
});