const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.edu-card, .exp-card, .skill-category, .achievement-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// Experience Carousel
const slides = document.querySelectorAll('.exp-slide');
const prevBtn = document.getElementById('expPrev');
const nextBtn = document.getElementById('expNext');
const dotsContainer = document.getElementById('expDots');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    const target = Math.max(0, Math.min(index, slides.length - 1));
    slides[target].classList.add('active');
    currentSlide = target;
    updateDots();
}

function createDots() {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'exp-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => showSlide(i));
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    document.querySelectorAll('.exp-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

if (slides.length > 0) {
    createDots();
    showSlide(0);
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1 < slides.length ? currentSlide + 1 : 0);
    });
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1 >= 0 ? currentSlide - 1 : slides.length - 1);
    });
}
