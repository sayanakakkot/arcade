// Works Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize slideshow for each section
    const initializeSlideshows = () => {
        const workSections = document.querySelectorAll('.work-section');

        workSections.forEach(section => {
            const slideshowContainer = section.querySelector('.slideshow-container');
            if (!slideshowContainer) return;

            const slideshow = slideshowContainer.querySelector('.slideshow');
            const slides = slideshow.querySelectorAll('.slide');
            const prevBtn = slideshowContainer.querySelector('.prev');
            const nextBtn = slideshowContainer.querySelector('.next');
            const dotsContainer = slideshowContainer.querySelector('.slide-dots');

            let currentSlide = 0;
            let autoSlideInterval = null;

            // Create dots
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            const dots = dotsContainer.querySelectorAll('.dot');

            // Show specific slide
            const showSlide = (index) => {
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));

                currentSlide = (index + slides.length) % slides.length;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            };

            // Go to specific slide
            const goToSlide = (index) => {
                showSlide(index);
                resetAutoSlide();
            };

            // Next slide
            const nextSlide = () => {
                showSlide(currentSlide + 1);
            };

            // Previous slide
            const prevSlide = () => {
                showSlide(currentSlide - 1);
            };

            // Auto-advance slides
            const startAutoSlide = () => {
                autoSlideInterval = setInterval(() => {
                    nextSlide();
                }, 4500); // 4.5 seconds
            };

            const stopAutoSlide = () => {
                if (autoSlideInterval) {
                    clearInterval(autoSlideInterval);
                    autoSlideInterval = null;
                }
            };

            const resetAutoSlide = () => {
                stopAutoSlide();
                startAutoSlide();
            };

            // Event listeners for buttons
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    prevSlide();
                    resetAutoSlide();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    nextSlide();
                    resetAutoSlide();
                });
            }

            // Pause on hover
            slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
            slideshowContainer.addEventListener('mouseleave', startAutoSlide);

            // Touch swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;

            slideshowContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoSlide();
            });

            slideshowContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoSlide();
            });

            const handleSwipe = () => {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe left - next slide
                        nextSlide();
                    } else {
                        // Swipe right - previous slide
                        prevSlide();
                    }
                }
            };

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                // Only respond if this section is active
                if (!section.classList.contains('active')) return;

                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    resetAutoSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    resetAutoSlide();
                }
            });

            // Start auto-slide only if section is active
            if (section.classList.contains('active')) {
                startAutoSlide();
            }

            // Store slideshow controls on the section for later use
            section.slideshowControls = {
                start: startAutoSlide,
                stop: stopAutoSlide,
                reset: resetAutoSlide
            };
        });
    };

    // Section Switcher
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const workSections = document.querySelectorAll('.work-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Get target work
            const targetWork = link.getAttribute('data-work');

            // Stop all slideshows
            workSections.forEach(section => {
                if (section.slideshowControls) {
                    section.slideshowControls.stop();
                }
            });

            // Smooth transition between sections
            workSections.forEach(section => {
                if (section.classList.contains('active')) {
                    // Fade out current section
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        section.classList.remove('active');
                    }, 300);
                }
            });

            // Show target section with smooth animation
            const targetSection = document.getElementById(targetWork);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.classList.add('active');

                    // Start slideshow for new section
                    if (targetSection.slideshowControls) {
                        targetSection.slideshowControls.start();
                    }

                    // Smooth scroll to top with offset for sticky header
                    const isMobile = window.innerWidth <= 768;
                    const scrollOffset = isMobile ? 150 : 80;

                    window.scrollTo({
                        top: Math.max(0, targetSection.offsetTop - scrollOffset),
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });

    // Hamburger Menu (reusing from main page)
    const hamburger = document.getElementById('hamburger');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (hamburger && menuOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Hash-based navigation (for direct links)
    const handleHashChange = () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const targetLink = document.querySelector(`[data-work="${hash}"]`);
            if (targetLink) {
                targetLink.click();
            }
        }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Initialize slideshows first
    initializeSlideshows();

    // Check for hash on page load
    handleHashChange();

    console.log('Works page loaded successfully with slideshows!');
});
