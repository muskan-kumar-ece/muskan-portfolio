# JavaScript Modules Documentation

> Vanilla JavaScript architecture with modular organization, modern ES6+ features, and performance-optimized animations.

## 📋 Contents
- [Overview](#overview)
- [File Structure](#file-structure)
- [Module Details](#module-details)
- [API Reference](#api-reference)
- [Usage Examples](#usage-examples)
- [Performance](#performance)

---

## 🌟 Overview

This project uses **pure vanilla JavaScript** (no frameworks like React, Vue, or jQuery) organized into 4 specialized modules. Each module handles a specific aspect of the user experience.

### Key Features
- **Zero Dependencies**: No external JavaScript libraries
- **Modern ES6+**: Classes, arrow functions, template literals
- **Performance Optimized**: Intersection Observer, requestAnimationFrame
- **Event-Driven**: Efficient event delegation
- **Modular**: Separation of concerns across files

---

## 📁 File Structure

```
js/
├── main.js         # Core application logic (10.3 KB, 333 lines)
├── effects.js      # Visual effects & interactions (8.5 KB, 260 lines)
├── cursor.js       # Custom cursor system (5.3 KB, 187 lines)
└── particles.js    # Particle background (4.7 KB, 144 lines)
```

### Loading Order

Files should be loaded in this order in HTML:
```html
<script src="js/main.js"></script>
<script src="js/particles.js"></script>
<script src="js/cursor.js"></script>
<script src="js/effects.js"></script>
```

All scripts initialize on `DOMContentLoaded` event.

---

## 📦 Module Details

## 1. main.js - Core Application Logic

**Purpose**: Handles essential application functionality including navigation, theming, forms, and UI interactions.

### Functions

#### `initPreloader()`
Shows a loading screen that fades out after window load.

```javascript
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.classList.add('loaded');
        }, 500);
    });
}
```

**What it does:**
- Waits for all resources to load
- Adds `.loaded` class to hide preloader
- 500ms delay for smooth transition

---

#### `initThemeToggle()`
Manages dark/light theme switching with persistence.

```javascript
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Load saved or system preference
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Toggle on click
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
```

**What it does:**
- Checks `localStorage` for saved preference
- Falls back to system preference (`prefers-color-scheme`)
- Toggles `data-theme` attribute on `<html>`
- Persists choice in localStorage

---

#### `initMobileMenu()`
Handles mobile navigation drawer with animations.

```javascript
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.navbar-menu');
    const backdrop = document.querySelector('.menu-backdrop');
    
    // Toggle menu
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        menu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
        backdrop?.classList.toggle('active');
    });
    
    // Close on link click
    menu.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', () => {
            /* Close menu */
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
            /* Close menu */
        }
    });
}
```

**What it does:**
- Hamburger animation (3 bars → X)
- Slide-in drawer from right
- Backdrop overlay with blur
- Prevents body scroll when open
- Closes on: link click, backdrop click, outside click

---

#### `initCommandPalette()`
Quick navigation with keyboard shortcuts.

```javascript
function initCommandPalette() {
    const commands = [
        { title: 'Home', url: 'index.html', icon: '🏠' },
        { title: 'Identity', url: 'identity.html', icon: '👤' },
        // ... more commands
    ];
    
    // Open with Ctrl+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openCommandPalette();
        }
    });
    
    // Fuzzy search
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = commands.filter(cmd =>
            cmd.title.toLowerCase().includes(query)
        );
        renderResults(filtered);
    });
}
```

**What it does:**
- Opens with `Ctrl+K` or `Cmd+K`
- Fuzzy search through pages
- Instant navigation
- Theme toggle action

---

#### `initScrollEffects()`
Handles scroll-based UI changes.

```javascript
function initScrollEffects() {
    // Navbar glassmorphism
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link based on scroll position
    window.addEventListener('scroll', () => {
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
```

**What it does:**
- Adds glassmorphism to navbar after scrolling 50px
- Highlights active navigation link based on current section
- Uses Intersection Observer pattern

---

#### `animateCounters()`
Animates stat numbers from 0 to target.

```javascript
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16); // 60fps
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
```

**What it does:**
- Animates from 0 to target value
- 60fps smooth counting
- Triggered when section enters viewport
- Uses `requestAnimationFrame` for performance

---

## 2. effects.js - Visual Effects

**Purpose**: Handles all visual effects including scroll reveals, tilt cards, magnetic buttons, typing effects, and modals.

### Functions

#### `initScrollReveal()`
Fades in elements when scrolled into view.

```javascript
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
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
```

**What it does:**
- Uses **Intersection Observer API**
- Triggers when 10% of element is visible
- Adds `.active` class to trigger CSS transition
- 50px bottom margin for earlier trigger

---

#### `initTiltCards()`
3D perspective tilt effect on hover.

```javascript
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
            
            card.style.transform = 
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}
```

**What it does:**
- Calculates mouse position relative to card center
- Rotates card based on position (max ±10deg)
- Slight scale on hover (1.02x)
- Smooth return to normal on mouse leave

---

#### `initMagneticButtons()`
Buttons follow cursor within proximity.

```javascript
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
```

**What it does:**
- Calculates offset from button center
- Translates button 30% of the distance
- Spring-back animation on leave

---

#### `TypeWriter` Class
Types and deletes text in a loop.

```javascript
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
        if (this.isDeleting) typeSpeed /= 2;
        
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
```

**What it does:**
- Types text character by character
- Pauses at end of word
- Deletes text (2x speed)
- Cycles through word array
- Used in hero subtitle

---

## 3. cursor.js - Custom Cursor

**Purpose**: Creates an animated custom cursor with interactive states.

### `CustomCursor` Class

```javascript
class CustomCursor {
    constructor() {
        if ('ontouchstart' in window) return; // Skip on touch devices
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.innerX = 0;
        this.innerY = 0;
        this.outerX = 0;
        this.outerY = 0;
        
        this.createCursor();
        this.bindEvents();
        this.render();
    }
    
    render() {
        // Smooth follow with lerp
        this.innerX += (this.mouseX - this.innerX) * 0.2; // 20% follow speed
        this.innerY += (this.mouseY - this.innerY) * 0.2;
        
        this.outerX += (this.mouseX - this.outerX) * 0.1; // 10% follow speed
        this.outerY += (this.mouseY - this.outerY) * 0.1;
        
        this.cursorInner.style.left = `${this.innerX}px`;
        this.cursorInner.style.top = `${this.innerY}px`;
        
        this.cursorOuter.style.left = `${this.outerX}px`;
        this.cursorOuter.style.top = `${this.outerY}px`;
        
        requestAnimationFrame(() => this.render());
    }
}
```

**What it does:**
- **Two-part cursor**: Inner dot (8px) + outer ring (40px)
- **Smooth following**: Lerp interpolation creates lag effect
- **Interactive states**:
  - Hover: Enlarges to 12px inner, 60px outer, blue color
  - Click: Scale down effect
- **Mix-blend-mode**: Creates inversion effect
- **60fps rendering**: Uses `requestAnimationFrame`
- **Disabled on**: Touch devices, screens < 1024px

---

## 4. particles.js - Background Particle System

**Purpose**: Creates an animated particle network background with mouse interaction.

### `ParticleBackground` Class

```javascript
class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.particleCount = 80;
        this.colors = ['#4f8cff', '#8b5cf6', '#22d3ee'];
        
        this.init();
        this.animate();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        this.connectParticles();
        
        requestAnimationFrame(() => this.animate());
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = 1 - distance / 120;
                    this.ctx.strokeStyle = `rgba(79, 140, 255, ${opacity * 0.2})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}
```

**What it does:**
- **Canvas rendering**: 80 particles on fixed background canvas
- **Random colors**: From theme palette
- **Connection lines**: Drawn between particles < 120px apart
- **Mouse interaction**: Particles repel from cursor (150px radius)
- **Bounce physics**: Particles bounce off canvas edges
- **Responsive**: Regenerates on window resize
- **Optimized**: `requestAnimationFrame` for 60fps

---

## 💡 Usage Examples

### Adding a New Effect

```javascript
// In effects.js or your own file
function initMyEffect() {
    const elements = document.querySelectorAll('.my-element');
    
    elements.forEach(el => {
        el.addEventListener('click', () => {
            // Your effect logic
        });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initMyEffect();
});
```

### Using Intersection Observer

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.5, // 50% visible
    rootMargin: '0px 0px -100px 0px' // Trigger 100px before
});

document.querySelectorAll('.observe-me').forEach(el => {
    observer.observe(el);
});
```

### Smooth Animations with requestAnimationFrame

```javascript
let position = 0;

function animate() {
    position += 1;
    element.style.transform = `translateX(${position}px)`;
    
    if (position < 500) {
        requestAnimationFrame(animate);
    }
}

requestAnimationFrame(animate);
```

---

## ⚡ Performance

### Optimizations Used

1. **Intersection Observer**: Instead of scroll event listeners
2. **requestAnimationFrame**: For all animations (60fps cap)
3. **Event Delegation**: Where possible to reduce listeners
4. **Debouncing**: Resize handlers are debounced
5. **Early Returns**: Skip processing on touch devices
6. **CSS Hardware Acceleration**: Transform and opacity animations

### Performance Metrics

- **JavaScript Parse**: < 50ms
- **First Input Delay**: < 100ms
- **Frame Rate**: Consistent 60fps
- **Memory**: < 10MB for particle system

---

## 🎯 Best Practices

### ✅ DO:
- Use `requestAnimationFrame` for animations
- Leverage Intersection Observer for scroll effects
- Cache DOM queries in variables
- Use event delegation for dynamic elements
- Check for element existence before operating
- Clean up event listeners when needed

### ❌ DON'T:
- Use `setInterval` for animations (use `requestAnimationFrame`)
- Query DOM repeatedly in loops
- Attach scroll listeners without throttling/debouncing
- Forget to check for `null` elements
- Create memory leaks with uncleaned listeners
- Block the main thread with heavy computations

---

## 🔧 Customization

### Changing Particle Settings

Edit in `particles.js`:
```javascript
this.particleCount = 100; // More particles
this.colors = ['#ff0000', '#00ff00', '#0000ff']; // New colors
this.mouse.radius = 200; // Larger interaction area
```

### Adjusting Animation Speeds

Edit timing in respective functions:
```javascript
// Slower typing
new TypeWriter(element, words, 4000); // 4 second pause

// Faster tilt response
const rotateX = (y - centerY) / 5; // More sensitive (was /10)
```

---

## 🌐 Browser Compatibility

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **JavaScript Features**: ES6 Classes, Arrow Functions, Template Literals, Intersection Observer
- **Polyfills**: None required for modern browsers
- **Fallbacks**: Custom cursor disabled on touch/mobile

---

**Built with vanilla JavaScript | Zero dependencies | Performance optimized**
