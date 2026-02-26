// Hero - Single Image (no slider needed)

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.menu-link');

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

// Scroll Reveal Animation with throttling for better performance
const revealElements = document.querySelectorAll('.reveal');
let isScrolling = false;

const revealOnScroll = () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const windowHeight = window.innerHeight;

            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const revealPoint = window.innerWidth <= 768 ? 100 : 150;

                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });

            isScrolling = false;
        });
        isScrolling = true;
    }
};

// Initial check on page load
revealOnScroll();

// Throttled scroll event for better performance
window.addEventListener('scroll', revealOnScroll, { passive: true });

// Circular Progress Bars Animation
const progressBars = document.querySelectorAll('.progress-bar');
let progressAnimated = false;

const animateProgress = () => {
    if (progressAnimated) return;

    const windowHeight = window.innerHeight;
    const firstProgressBar = document.querySelector('.progress-circle');

    if (firstProgressBar) {
        const elementTop = firstProgressBar.getBoundingClientRect().top;

        if (elementTop < windowHeight - 150) {
            progressAnimated = true;

            progressBars.forEach(bar => {
                const target = parseInt(bar.getAttribute('data-target'));
                const circumference = 2 * Math.PI * 65; // 65 is the radius
                const offset = circumference - (target / 100) * circumference;

                setTimeout(() => {
                    bar.style.strokeDashoffset = offset;
                }, 100);
            });
        }
    }
};

window.addEventListener('scroll', animateProgress);

// Enhanced Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Get header height for offset
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                // Smooth scroll with easing
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header background on scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.padding = '15px 40px';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.3)';
        header.style.padding = '20px 40px';
    }

    lastScroll = currentScroll;
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`Thank you for subscribing with: ${email}`);
        newsletterForm.reset();
    });
}

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Add parallax effect to hero section (desktop only)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    // Only apply parallax on desktop
    if (hero && window.innerWidth > 480) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile portrait zoom animation for hero slides
const isMobilePortrait = () => {
    return window.innerWidth <= 480 && window.innerHeight > window.innerWidth;
};

const heroZoomOnScroll = () => {
    if (!isMobilePortrait()) return;

    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        const heroHeight = hero.offsetHeight;
        const scrollProgress = Math.max(0, Math.min(scrolled / (heroHeight * 0.7), 1));

        // Scale from 1.0 to 2.8 based on scroll (stronger zoom IN to fill completely)
        // Math.max ensures scale never goes below 1.0 (prevents zoom-out on over-scroll)
        const scale = Math.max(1.0, 1.0 + (scrollProgress * 1.8));

        // Add downward movement (translateY) as it zooms
        const translateY = scrollProgress * 30; // Move down 30px max

        const heroSlides = document.querySelectorAll('.hero-slide');
        heroSlides.forEach(slide => {
            slide.style.transform = `scale(${scale}) translateY(${translateY}px)`;

            // Gradually transition to cover for better fill
            if (scrollProgress > 0.4) {
                slide.style.backgroundSize = 'cover';
            }
        });
    }
};

// Add scroll listener for mobile zoom
window.addEventListener('scroll', heroZoomOnScroll, { passive: true });

// Re-check on resize
window.addEventListener('resize', () => {
    if (!isMobilePortrait()) {
        // Reset scale on desktop/landscape
        const heroSlides = document.querySelectorAll('.hero-slide');
        heroSlides.forEach(slide => {
            slide.style.transform = '';
        });
    } else {
        heroZoomOnScroll();
    }
});

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;

    const windowHeight = window.innerHeight;
    const statsSection = document.querySelector('.statistics');

    if (statsSection) {
        const elementTop = statsSection.getBoundingClientRect().top;

        if (elementTop < windowHeight - 150) {
            statsAnimated = true;

            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const number = parseInt(text);

                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            stat.textContent = number + (hasPlus ? '+' : '');
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                        }
                    }, 30);
                }
            });
        }
    }
};

window.addEventListener('scroll', animateStats);

// Initialize all animations on load
window.addEventListener('load', () => {
    revealOnScroll();
    animateProgress();
    animateStats();
});

console.log('Website loaded successfully!');
