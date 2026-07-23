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

function initCarousel(trackId, prevId, nextId, dotsId, itemsPerSlide) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const dotsContainer = document.getElementById(dotsId);
    const cards = track.querySelectorAll('.cert-card');
    if (!cards.length) return;

    let currentIndex = 0;

    function getItems() {
        const w = window.innerWidth;
        if (w <= 600) return 1;
        if (w <= 900) return 2;
        return itemsPerSlide || 3;
    }

    function getStepWidth() {
        const gap = 16;
        return cards[0].offsetWidth + gap;
    }

    function getMaxIndex() {
        const visible = getItems();
        return Math.max(0, cards.length - visible);
    }

    function renderDots() {
        const visible = getItems();
        const total = Math.ceil(cards.length / visible);
        dotsContainer.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', 'Ir a slide ' + (i + 1));
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        const visible = getItems();
        const maxPage = Math.ceil(cards.length / visible) - 1;
        const page = Math.min(Math.max(0, index), maxPage);
        currentIndex = page;
        const offset = -page * visible * getStepWidth();
        track.style.transform = 'translateX(' + offset + 'px)';
        document.querySelectorAll('#' + dotsId + ' .carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        const maxPage = Math.ceil(cards.length / getItems()) - 1;
        if (currentIndex < maxPage) goToSlide(currentIndex + 1);
        else goToSlide(0);
    }

    function prevSlide() {
        const maxPage = Math.ceil(cards.length / getItems()) - 1;
        if (currentIndex > 0) goToSlide(currentIndex - 1);
        else goToSlide(maxPage);
    }

    renderDots();
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    track.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    });

    window.addEventListener('resize', () => {
        renderDots();
        goToSlide(0);
    });
}

initCarousel('certTrack', 'certPrev', 'certNext', 'certDots', 3);
