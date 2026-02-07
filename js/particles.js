/* ============================================
   MUSKAN KUMAR - PARTICLE BACKGROUND
   ============================================ */

class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.particleCount = 80;
        this.colors = ['#4f8cff', '#8b5cf6', '#22d3ee'];

        this.init();
        this.animate();
        this.handleResize();
        this.handleMouse();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resize();
            this.particles = [];
            this.createParticles();
        });
    }

    handleMouse() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const dx = (Math.random() - 0.5) * 0.5;
            const dy = (Math.random() - 0.5) * 0.5;
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];

            this.particles.push({
                x, y, size, dx, dy, color,
                baseX: x,
                baseY: y
            });
        }
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color;
        this.ctx.globalAlpha = 0.6;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = 1 - distance / 120;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(79, 140, 255, ${opacity * 0.2})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    updateParticle(particle) {
        // Mouse interaction
        if (this.mouse.x && this.mouse.y) {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);
                particle.x -= Math.cos(angle) * force * 2;
                particle.y -= Math.sin(angle) * force * 2;
            }
        }

        // Movement
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > this.canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > this.canvas.height) particle.dy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
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
}

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground('particles-canvas');
});
