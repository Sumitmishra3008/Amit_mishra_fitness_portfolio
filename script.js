/* =============================================
   AMIT MISHRA FITNESS PORTFOLIO
   Interactive JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ============ NAVBAR SCROLL EFFECT ============
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ============ MOBILE NAVIGATION ============
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // ============ COUNTER ANIMATION (triggers on page load) ============
    setTimeout(animateCounters, 800);

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out cubic)
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(easedProgress * target);
                
                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // ============ HERO PARTICLES ============
    const particlesContainer = document.getElementById('heroParticles');
    
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 6;
            const duration = Math.random() * 10 + 8;
            const opacity = Math.random() * 0.3 + 0.05;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                background: rgba(99, 102, 241, ${opacity});
                border-radius: 50%;
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
                pointer-events: none;
            `;

            particlesContainer.appendChild(particle);
        }

        // Add particle animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { 
                    transform: translate(0, 0) scale(1); 
                    opacity: 0.3;
                }
                25% { 
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.2);
                    opacity: 0.6;
                }
                50% { 
                    transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(0.8);
                    opacity: 0.2;
                }
                75% { 
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.1);
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============ SMOOTH SCROLL FOR ANCHORS ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============ ACTIVE NAV LINK HIGHLIGHTING ============
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ============ CERTIFICATE MODAL ============
    const certModal = document.getElementById('certModal');
    const certModalClose = document.getElementById('certModalClose');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalDesc = document.getElementById('certModalDesc');
    const certModalLink = document.getElementById('certModalLink');

    // Make openCertModal globally available
    window.openCertModal = function(title, description) {
        certModalTitle.textContent = title;
        certModalDesc.textContent = description;
        // Temporary link - user will replace with Google Drive link
        certModalLink.href = '#';
        certModalLink.onclick = function(e) {
            e.preventDefault();
            alert('Certificate link will be updated with Google Drive link soon.');
        };
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    if (certModalClose) {
        certModalClose.addEventListener('click', closeCertModal);
    }

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeCertModal();
            }
        });
    }

    function closeCertModal() {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCertModal();
        }
    });

    // ============ PARALLAX MICRO-EFFECTS ============
    window.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        const heroGlow = document.querySelector('.hero-image-glow');
        if (heroGlow) {
            heroGlow.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
        }
    });

    // ============ TYPING EFFECT FOR HERO ============
    // Subtle tilt effect on cert cards
    document.querySelectorAll('.cert-card, .spec-card, .method-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
