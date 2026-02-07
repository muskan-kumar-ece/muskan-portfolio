# CSS Architecture Documentation

> Modern, scalable CSS design system built with custom properties, fluid typography, and advanced visual effects.

## 📋 Contents
- [Overview](#overview)
- [File Structure](#file-structure)
- [Design System](#design-system)
- [Components](#components)
- [Animations](#animations)
- [Responsive Design](#responsive-design)
- [Usage Examples](#usage-examples)

---

## 🌟 Overview

This CSS architecture implements a **design token system** using CSS custom properties (variables) for maximum maintainability and theming capabilities. No CSS preprocessors (Sass, Less) are used—everything is pure CSS with modern features.

### Key Features
- **CSS Custom Properties**: Centralized design tokens
- **Fluid Typography**: Automatic responsive scaling using `clamp()`
- **Glassmorphism**: Modern glass-like UI elements
- **Dark/Light Themes**: Full theme support with one attribute change
- **Zero Framework**: Pure CSS, no Tailwind or Bootstrap
- **Performance Optimized**: Minimal repaints, GPU-accelerated animations

---

## 📁 File Structure

```
css/
├── styles.css                  # Core design system & utilities
├── components.css              # Reusable UI components
├── animations.css              # Animation keyframes & classes
├── index-responsive.css        # Homepage responsive styles
├── contact-responsive.css      # Contact page responsive styles
├── identity-responsive.css     # Identity page responsive styles
├── blog-proof-responsive.css   # Blog/Proof responsive styles
└── responsive-global.css       # Global responsive utilities
```

### Loading Order
Files should be loaded in this order in HTML:
```html
<link rel="stylesheet" href="css/styles.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/[page]-responsive.css">
```

---

## 🎨 Design System

### 1. CSS Custom Properties

All design tokens are defined in `styles.css` under `:root`:

#### Color Palette
```css
:root {
    /* Backgrounds */
    --bg-base: #0b0f1a;          /* Main background */
    --bg-surface: #121826;        /* Cards, surfaces */
    --bg-elevated: #1a2235;       /* Elevated elements */
    --bg-overlay: rgba(11, 15, 26, 0.8);
    
    /* Accents */
    --accent-primary: #4f8cff;    /* Primary blue */
    --accent-secondary: #8b5cf6;  /* Purple */
    --accent-highlight: #22d3ee;  /* Cyan */
    --accent-gradient: linear-gradient(135deg, #4f8cff 0%, #8b5cf6 100%);
    
    /* Text */
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    
    /* Status Colors */
    --success: #22c55e;
    --warning: #f59e0b;
    --error: #ef4444;
}
```

#### Light Mode Override
```css
[data-theme="light"] {
    --bg-base: #f8fafc;
    --bg-surface: #ffffff;
    --bg-elevated: #f1f5f9;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-muted: #94a3b8;
}
```

### 2. Fluid Typography

Uses `clamp()` for automatic responsive scaling:

```css
:root {
    --text-xs: clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem);
    --text-sm: clamp(0.8rem, 0.75rem + 0.3vw, 0.875rem);
    --text-base: clamp(0.9rem, 0.85rem + 0.35vw, 1rem);
    --text-lg: clamp(1rem, 0.95rem + 0.4vw, 1.125rem);
    --text-xl: clamp(1.1rem, 1rem + 0.5vw, 1.25rem);
    --text-2xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
    --text-3xl: clamp(1.5rem, 1.3rem + 1vw, 1.875rem);
    --text-4xl: clamp(1.75rem, 1.5rem + 1.5vw, 2.25rem);
    --text-5xl: clamp(2rem, 1.7rem + 2vw, 3rem);
    --text-6xl: clamp(2.5rem, 2rem + 3vw, 3.75rem);
    --text-7xl: clamp(3rem, 2.5rem + 3.5vw, 4.5rem);
    --text-8xl: clamp(3.5rem, 3rem + 4vw, 6rem);
}
```

**How it works:**
- Minimum size at 320px viewport
- Preferred size scales with viewport width
- Maximum size at 1920px viewport
- No media queries needed for basic scaling

### 3. Fluid Spacing

Responsive spacing that adapts automatically:

```css
:root {
    --space-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.375rem);
    --space-sm: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
    --space-md: clamp(0.75rem, 0.6rem + 0.75vw, 1rem);
    --space-lg: clamp(1rem, 0.8rem + 1vw, 1.5rem);
    --space-xl: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);
    --space-2xl: clamp(2rem, 1.5rem + 2.5vw, 3rem);
    --space-3xl: clamp(2.5rem, 2rem + 3vw, 4rem);
    --space-4xl: clamp(3rem, 2.5rem + 4vw, 6rem);
}
```

### 4. Transitions & Timing

```css
:root {
    --transition-fast: 150ms ease;
    --transition-base: 250ms ease;
    --transition-slow: 400ms ease;
    --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 5. Border Radius

```css
:root {
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.5rem;
    --radius-full: 9999px;
}
```

### 6. Z-Index Scale

```css
:root {
    --z-base: 0;
    --z-dropdown: 100;
    --z-sticky: 200;
    --z-fixed: 300;
    --z-modal-backdrop: 400;
    --z-modal: 500;
    --z-popover: 600;
    --z-tooltip: 700;
    --z-cursor: 9999;
}
```

---

## 🧩 Components

All component styles are in `components.css`.

### Navigation

```css
.navbar {
    position: fixed;
    top: 0;
    z-index: var(--z-fixed);
    transition: all var(--transition-base);
}

.navbar.scrolled {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-subtle);
}
```

### Buttons

Three variants: primary, secondary, ghost

```css
.btn-primary {
    background: var(--accent-gradient);
    color: var(--text-primary);
    box-shadow: var(--glow-primary);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(79, 140, 255, 0.5);
}

.btn-secondary {
    background: transparent;
    border: 1px solid var(--border-default);
}

.btn-ghost {
    background: transparent;
    color: var(--accent-primary);
}
```

### Cards

```css
.card-glass {
    background: rgba(18, 24, 38, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-xl);
}

.project-card:hover {
    transform: translateY(-4px);
    border-color: var(--border-default);
}
```

### Forms

```css
.form-input {
    width: 100%;
    min-height: 44px;
    padding: var(--space-md) var(--space-lg);
    font-size: 16px; /* Prevents iOS zoom */
    background: var(--bg-surface);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-lg);
}

.form-input:focus {
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(79, 140, 255, 0.1);
}
```

---

## ✨ Animations

All animations are in `animations.css`.

### Keyframe Animations

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(79, 140, 255, 0.4); }
    50% { box-shadow: 0 0 40px rgba(79, 140, 255, 0.6); }
}

@keyframes blob-bounce {
    0%, 100% {
        border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
        transform: translate(0, 0) rotate(0deg);
    }
    33% {
        border-radius: 62% 38% 37% 63% / 54% 56% 44% 46%;
        transform: translate(5px, -10px) rotate(120deg);
    }
    66% {
        border-radius: 41% 59% 44% 56% / 38% 62% 63% 37%;
        transform: translate(-5px, 5px) rotate(240deg);
    }
}
```

### Utility Classes

```css
.animate-fade-in { animation: fadeIn 0.6s ease forwards; }
.animate-fade-in-up { animation: fadeInUp 0.6s ease forwards; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }
.animate-glow { animation: glowPulse 2s ease-in-out infinite; }
.animate-bounce { animation: bounce 1s ease infinite; }
```

### Scroll Reveal

Triggered by JavaScript Intersection Observer:

```css
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.active {
    opacity: 1;
    transform: translateY(0);
}

.reveal-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-left.active {
    opacity: 1;
    transform: translateX(0);
}
```

### Gradient Animations

```css
.gradient-text-animated {
    background: linear-gradient(135deg,
        var(--accent-primary) 0%,
        var(--accent-secondary) 25%,
        var(--accent-highlight) 50%,
        var(--accent-secondary) 75%,
        var(--accent-primary) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 3s linear infinite;
}

@keyframes gradient-shift {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
}
```

---

## 📱 Responsive Design

### Strategy

1. **Fluid First**: Use `clamp()` for automatic scaling
2. **Container Queries**: Responsive grids without media queries
3. **Breakpoint Overrides**: Page-specific adjustments
4. **Mobile Menu**: Drawer navigation < 768px

### Breakpoints

```css
/* Small mobile */
@media (max-width: 480px) { }

/* Large mobile / Small tablet */
@media (min-width: 481px) and (max-width: 768px) { }

/* Tablet landscape */
@media (min-width: 769px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

### Responsive Grid

```css
.grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
}

/* Auto-collapsing grids */
@media (max-width: 480px) {
    .grid-cols-2, .grid-cols-3, .grid-cols-4 {
        grid-template-columns: 1fr;
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    .grid-cols-3, .grid-cols-4 {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .grid-cols-4 {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

---

## 💡 Usage Examples

### Creating a New Component

```css
/* Use existing design tokens */
.my-component {
    padding: var(--space-lg);
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xl);
    transition: all var(--transition-base);
}

.my-component:hover {
    border-color: var(--accent-primary);
    transform: translateY(-4px);
}
```

### Using Gradient Text

```html
<h1 class="gradient-text">Hello World</h1>
<h1 class="gradient-text-animated">Animated Gradient</h1>
```

### Glass Effect

```html
<div class="card-glass">
    <!-- Content -->
</div>
```

### Scroll Reveal

```html
<div class="reveal">Fades in when scrolled into view</div>
<div class="reveal-left">Slides in from left</div>
<div class="reveal-right">Slides in from right</div>
```

### Layout Utilities

```html
<div class="flex items-center justify-between gap-lg">
    <div>Left</div>
    <div>Right</div>
</div>

<div class="grid grid-cols-3 gap-lg">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</div>
```

---

## 🎯 Best Practices

### ✅ DO:
- Use CSS custom properties for all values
- Use existing spacing/color variables
- Follow the design token system
- Test in both dark and light modes
- Use `clamp()` for responsive values
- Leverage existing utility classes
- Keep vendor prefixes for compatibility

### ❌ DON'T:
- Hard-code colors or sizes
- Use `!important` (use specificity instead)
- Create new spacing values arbitrarily
- Remove `-webkit-` prefixes
- Nest selectors too deeply (max 3 levels)
- Override core animations without testing

---

## 🔧 Customization

### Changing Colors

Edit `:root` in `styles.css`:
```css
:root {
    --accent-primary: #your-color;
    --accent-secondary: #your-color;
}
```

### Adjusting Spacing Scale

```css
:root {
    --space-lg: clamp(1.5rem, 1rem + 2vw, 2rem);
    /* min, preferred, max */
}
```

### Adding New Animations

Add to `animations.css`:
```css
@keyframes myAnimation {
    /* keyframes */
}

.animate-my-animation {
    animation: myAnimation 1s ease;
}
```

---

## 🌐 Browser Support

- **Modern browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **CSS Features**: Custom properties, Grid, Flexbox, `clamp()`, `backdrop-filter`
- **Graceful Degradation**: Fallbacks for older browsers where critical

---

## 📊 Performance

- **No preprocessor compilation** needed
- **CSS containment** for layout isolation
- **GPU-accelerated** animations (transform, opacity)
- **Minimal reflows** with careful property choices
- **Efficient selectors** (class-based, low specificity)

---

**Built with modern CSS best practices | Part of the Muskan Kumar Portfolio**
