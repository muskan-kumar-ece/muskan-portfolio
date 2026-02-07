/* ============================================
   MUSKAN KUMAR - EFFECTS
   Tilt cards, magnetic buttons, scroll reveals, typing text
   ============================================ */

// ============================================
// SCROLL REVEAL (Intersection Observer)
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// TILT CARD EFFECT
// ============================================
function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// TYPING TEXT EFFECT
// ============================================
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = wait;
        this.wordIndex = 0;
        this.text = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullText = this.words[current];

        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }

        this.element.innerHTML = `<span class="typing-text">${this.text}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.text === fullText) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

function initTypingEffect() {
    const element = document.querySelector('.typing-container');
    if (!element) return;

    const words = element.dataset.words?.split(',') || [
        'Founder of Enquebet',
        'Full Stack Engineer',
        'AI Research Enthusiast',
        'Building Products That Scale'
    ];

    new TypeWriter(element, words, 2000);
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// ============================================
// GALLERY MODAL
// ============================================
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal');
    const modalImage = modal?.querySelector('.modal-image');
    const modalClose = modal?.querySelector('.modal-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img')?.src;
            if (modalImage && imgSrc) {
                modalImage.src = imgSrc;
                modalBackdrop?.classList.add('active');
                modal?.classList.add('active');
            }
        });
    });

    modalClose?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        modalBackdrop?.classList.remove('active');
        modal?.classList.remove('active');
    }
}

// ============================================
// TABS / FILTERS
// ============================================
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs');

    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab');
        const targetId = container.dataset.target;
        const items = document.querySelectorAll(`${targetId} [data-category]`);

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Filter items
                const category = tab.dataset.category;

                items.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = '';
                        item.classList.add('reveal');
                        setTimeout(() => item.classList.add('active'), 50);
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('active');
                    }
                });
            });
        });
    });
}

// ============================================
// TIMELINE ANIMATION
// ============================================
function initTimeline() {
    const timeline = document.querySelector('.timeline');
    const timelineLine = document.querySelector('.timeline-line');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (!timeline) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineLine?.classList.add('animate');

                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 200);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(timeline);
}

// ============================================
// INITIALIZE ALL EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initTiltCards();
    initMagneticButtons();
    initTypingEffect();
    initParallax();
    initGalleryModal();
    initTabs();
    initTimeline();
});
