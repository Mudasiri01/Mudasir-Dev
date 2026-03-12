// ==================== Initialize AOS Animation ====================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// ==================== Navbar Scroll Effect ====================
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== Smooth Scrolling for Navigation Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ==================== Active Navigation Link on Scroll ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activeNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const sectionTop = section.offsetTop - navbarHeight - 10;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activeNavOnScroll);

// ==================== Counter Animation for Stats ====================
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    const statsSection = document.querySelector('.stats-section');
    const statsSectionTop = statsSection.offsetTop;
    const statsSectionHeight = statsSection.offsetHeight;
    const scrollY = window.pageYOffset + window.innerHeight;

    if (scrollY > statsSectionTop && !counterAnimated) {
        counterAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                current += increment;

                if (current < target) {
                    counter.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);

// ==================== Typing Effect for Role Text ====================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing after page load
    setTimeout(typeWriter, 1000);
}

// ==================== Animate Skill Bars on Scroll ====================
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkillBars() {
    const skillsSection = document.querySelector('#about');
    if (!skillsSection) return;

    const skillsSectionTop = skillsSection.offsetTop;
    const scrollY = window.pageYOffset + window.innerHeight;

    if (scrollY > skillsSectionTop && !skillsAnimated) {
        skillsAnimated = true;

        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';

            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }
}

window.addEventListener('scroll', animateSkillBars);

// ==================== Form Submission Handler ====================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Show success message (customize this based on your backend)
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        contactForm.reset();

        // Here you would typically send the form data to your backend
         Example: fetch('/api/contact', { method: 'POST', body: formData })
    });
}

// ==================== Add Parallax Effect to Hero Section ====================
window.addEventListener('scroll', function () {
    // Only apply parallax on desktop screens (992px+)
    if (window.innerWidth >= 992) {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');

        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroSection.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    } else {
        // Reset styles for mobile
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = 'none';
            heroSection.style.opacity = '1';
        }
    }
});

// ==================== Navbar Background on Mobile ====================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function () {
        if (!navbarCollapse.classList.contains('show')) {
            document.querySelector('.navbar').classList.add('mobile-open');
        } else {
            document.querySelector('.navbar').classList.remove('mobile-open');
        }
    });
}

// ==================== Preloader (Optional) ====================
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    // Trigger initial animations
    AOS.refresh();
});

// ==================== Add Glow Effect on Mouse Move (Optional Enhancement) ====================
document.addEventListener('mousemove', function (e) {
    const glowElements = document.querySelectorAll('.btn-primary-glow, .btn-secondary-glow');

    glowElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        element.style.setProperty('--x', `${x}px`);
        element.style.setProperty('--y', `${y}px`);
    });
});

// ==================== Lazy Loading for Images (Performance) ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==================== Add Active State to Portfolio Items ====================
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('click', function (e) {
        if (!e.target.classList.contains('btn')) {
            // Add your portfolio modal or navigation logic here
            console.log('Portfolio item clicked');
        }
    });
});

// ==================== Dynamic Year in Footer ====================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
}

// ==================== Add Scroll to Top Button (Optional) ====================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00d9ff 0%, #ff006e 100%);
    color: white;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0, 217, 255, 0.4);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-5px) scale(1.1)';
    this.style.boxShadow = '0 8px 25px rgba(0, 217, 255, 0.6)';
});

scrollToTopBtn.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 4px 15px rgba(0, 217, 255, 0.4)';
});

// ==================== Theme Toggle Logic ====================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.setAttribute('data-theme', 'light');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    const isLight = body.getAttribute('data-theme') === 'light';

    if (isLight) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

// ==================== Console Message ====================
console.log('%c Portfolio Website Loaded Successfully! ', 'background: linear-gradient(135deg, #00d9ff 0%, #ff006e 100%); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Developed with Mudasir iqbal', 'color: #00d9ff; font-size: 14px;');