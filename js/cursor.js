/* ============================================
   MUSKAN KUMAR - CUSTOM CURSOR
   ============================================ */

class CustomCursor {
    constructor() {
        // Don't show on touch devices
        if ('ontouchstart' in window) return;

        this.cursor = null;
        this.cursorInner = null;
        this.cursorOuter = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.innerX = 0;
        this.innerY = 0;
        this.outerX = 0;
        this.outerY = 0;

        this.init();
    }

    init() {
        // Create cursor elements
        this.createCursor();
        this.bindEvents();
        this.render();
    }

    createCursor() {
        // Create container
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';

        // Create inner dot
        this.cursorInner = document.createElement('div');
        this.cursorInner.className = 'cursor-inner';

        // Create outer ring
        this.cursorOuter = document.createElement('div');
        this.cursorOuter.className = 'cursor-outer';

        this.cursor.appendChild(this.cursorInner);
        this.cursor.appendChild(this.cursorOuter);
        document.body.appendChild(this.cursor);

        // Add styles
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .custom-cursor {
        pointer-events: none;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        mix-blend-mode: difference;
      }
      
      .cursor-inner {
        position: fixed;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s, background 0.2s;
      }
      
      .cursor-outer {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, border 0.3s;
      }
      
      .custom-cursor.hover .cursor-inner {
        width: 12px;
        height: 12px;
        background: #4f8cff;
      }
      
      .custom-cursor.hover .cursor-outer {
        width: 60px;
        height: 60px;
        border-color: #4f8cff;
      }
      
      .custom-cursor.click .cursor-inner {
        transform: translate(-50%, -50%) scale(0.8);
      }
      
      .custom-cursor.click .cursor-outer {
        transform: translate(-50%, -50%) scale(0.9);
      }
      
      body {
        cursor: none !important;
      }
      
      a, button, input, textarea, select, [role="button"] {
        cursor: none !important;
      }
      
      @media (max-width: 1024px) {
        .custom-cursor {
          display: none;
        }
        body, a, button, input, textarea, select {
          cursor: auto !important;
        }
      }
    `;
        document.head.appendChild(style);
    }

    bindEvents() {
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .project-card, .social-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
        });

        // Hide when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });
    }

    render() {
        // Smooth follow for inner cursor
        this.innerX += (this.mouseX - this.innerX) * 0.2;
        this.innerY += (this.mouseY - this.innerY) * 0.2;

        // Slower follow for outer cursor
        this.outerX += (this.mouseX - this.outerX) * 0.1;
        this.outerY += (this.mouseY - this.outerY) * 0.1;

        this.cursorInner.style.left = `${this.innerX}px`;
        this.cursorInner.style.top = `${this.innerY}px`;

        this.cursorOuter.style.left = `${this.outerX}px`;
        this.cursorOuter.style.top = `${this.outerY}px`;

        requestAnimationFrame(() => this.render());
    }
}

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
});
