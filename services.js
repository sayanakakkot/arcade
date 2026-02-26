// Services Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Service Section Switcher
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const serviceSections = document.querySelectorAll('.service-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Get target service
            const targetService = link.getAttribute('data-service');

            // Smooth transition between sections
            serviceSections.forEach(section => {
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
            const targetSection = document.getElementById(targetService);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.classList.add('active');

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
            const targetLink = document.querySelector(`[data-service="${hash}"]`);
            if (targetLink) {
                targetLink.click();
            }
        }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Check for hash on page load
    handleHashChange();

    console.log('Services page loaded successfully!');
});
