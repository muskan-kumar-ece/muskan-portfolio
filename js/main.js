/* ============================================
   MUSKAN KUMAR - MAIN JAVASCRIPT
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initThemeToggle();
  initMobileMenu();
  initScrollEffects();
  initCommandPalette();
});

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('loaded');
      document.body.classList.add('loaded');
    }, 500);
  });
}

// ============================================
// THEME TOGGLE (Dark/Light Mode)
// ============================================
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  // Check for saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.navbar-menu');
  const backdrop = document.querySelector('.menu-backdrop');

  if (!menuBtn || !menu) return;

  // Toggle menu
  menuBtn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');

    menuBtn.classList.toggle('active');
    menuBtn.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.classList.toggle('menu-open');

    // Toggle backdrop
    if (backdrop) {
      backdrop.classList.toggle('active');
    }
  });

  // Close menu on link click
  const links = menu.querySelectorAll('.navbar-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      menuBtn.classList.remove('open');
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      if (backdrop) {
        backdrop.classList.remove('active');
      }
    });
  });

  // Close menu on backdrop click
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      menuBtn.classList.remove('open');
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      backdrop.classList.remove('active');
    });
  }

  // Close menu on outside click (except backdrop)
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target) && !backdrop?.contains(e.target)) {
      menuBtn.classList.remove('active');
      menuBtn.classList.remove('open');
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      if (backdrop) {
        backdrop.classList.remove('active');
      }
    }
  });
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Active nav link based on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href')?.includes(current)) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// COMMAND PALETTE (Ctrl+K)
// ============================================
function initCommandPalette() {
  const backdrop = document.querySelector('.command-palette-backdrop');
  const palette = document.querySelector('.command-palette');
  const input = document.querySelector('.command-palette-input');
  const results = document.querySelector('.command-palette-results');

  if (!palette) return;

  const commands = [
    { title: 'Home', url: 'index.html', icon: '🏠' },
    { title: 'Identity', url: 'identity.html', icon: '👤' },
    { title: 'Ecosystem', url: 'ecosystem.html', icon: '🚀' },
    { title: 'Proof', url: 'proof.html', icon: '🏆' },
    { title: 'Timeline', url: 'timeline.html', icon: '📅' },
    { title: 'Lab', url: 'lab.html', icon: '🧪' },
    { title: 'Blog', url: 'blog.html', icon: '📝' },
    { title: 'Connect', url: 'connect.html', icon: '🔗' },
    { title: 'Contact', url: 'contact.html', icon: '📬' },
    { title: 'Toggle Theme', action: 'toggleTheme', icon: '🌓' }
  ];

  // Open command palette with Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openCommandPalette();
    }

    if (e.key === 'Escape') {
      closeCommandPalette();
    }
  });

  // Close on backdrop click
  backdrop?.addEventListener('click', closeCommandPalette);

  function openCommandPalette() {
    backdrop?.classList.add('active');
    palette?.classList.add('active');
    input?.focus();
    renderResults(commands);
  }

  function closeCommandPalette() {
    backdrop?.classList.remove('active');
    palette?.classList.remove('active');
    if (input) input.value = '';
  }

  // Filter results on input
  input?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = commands.filter(cmd =>
      cmd.title.toLowerCase().includes(query)
    );
    renderResults(filtered);
  });

  function renderResults(items) {
    if (!results) return;

    results.innerHTML = items.map(item => `
      <div class="command-result" data-url="${item.url || ''}" data-action="${item.action || ''}">
        <span class="command-result-icon">${item.icon}</span>
        <span class="command-result-title">${item.title}</span>
      </div>
    `).join('');

    // Add click handlers
    results.querySelectorAll('.command-result').forEach(result => {
      result.addEventListener('click', () => {
        const url = result.dataset.url;
        const action = result.dataset.action;

        if (action === 'toggleTheme') {
          document.querySelector('.theme-toggle')?.click();
        } else if (url) {
          window.location.href = url;
        }

        closeCommandPalette();
      });
    });
  }
}

// ============================================
// SMOOTH SCROLL TO ANCHOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.querySelector('.back-to-top');
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// FORM HANDLING
// ============================================
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500));

  btn.textContent = 'Sent!';
  btn.style.background = 'var(--success)';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 2000);
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-value[data-target]');

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };

    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}
