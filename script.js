// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.background = '#1a1a1a';
            navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = '#1a1a1a';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add hover effects to download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Simple analytics tracking (optional)
    function trackEvent(eventName) {
        // You can integrate with Google Analytics or other tracking services here
        console.log('Event tracked:', eventName);
    }

    // Track download button clicks
    const downloadLinks = document.querySelectorAll('a[href="#download"], .download-btn');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function () {
            trackEvent('download_button_clicked');
        });
    });

    // Track GitHub link clicks
    const githubLinks = document.querySelectorAll('a[href*="github"]');
    githubLinks.forEach(link => {
        link.addEventListener('click', function () {
            trackEvent('github_link_clicked');
        });
    });

    // Track donate button clicks
    const donateLinks = document.querySelectorAll('a[href="#donate"], .donate-btn');
    donateLinks.forEach(link => {
        link.addEventListener('click', function () {
            trackEvent('donate_button_clicked');
        });
    });
});

// Add loading animation for better UX
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .feature-card, .download-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .feature-card.visible, .download-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Platform selector functionality
    const platformOptions = document.querySelectorAll('.platform-option');
    const downloadLinks = document.querySelectorAll('.download-link');

    platformOptions.forEach(option => {
        option.addEventListener('click', function (e) {
            e.preventDefault();

            // Check if this is a coming soon option
            if (this.classList.contains('coming-soon')) {
                alert('macOS version is coming soon! Windows version is currently available.');
                return;
            }

            // Remove active class from all options
            platformOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to clicked option
            this.classList.add('active');

            // Get the platform
            const platform = this.getAttribute('data-platform');
            console.log('Selected platform:', platform);
        });
    });

    // Download links functionality
    downloadLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const platform = this.getAttribute('data-platform');
            console.log('Selected download option:', platform);

            // Download logic
            if (platform === 'windows-github') {
                window.open('https://github.com/eccoripo/chitkode/releases/download/release.0.0.23/ChitKode.0.0.23.exe', '_blank');
            }
        });
    });

    // Set default active platform (Windows)
    const defaultPlatform = document.querySelector('[data-platform="windows"]');
    if (defaultPlatform) {
        defaultPlatform.classList.add('active');
    }
}); 