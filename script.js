// script.js
(function() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const MAX_PARTICLES = 130;
  const SNOW_COLOR = 'rgba(210, 235, 255, 0.5)';

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height - height * 0.2;
      this.size = Math.random() * 2.8 + 0.8;
      this.speedY = Math.random() * 0.8 + 0.25;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.wobble = Math.random() * 100;
    }
    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.wobble + this.y * 0.003) * 0.2 + this.speedX * 0.1;
      if (this.y > height + 20) {
        this.y = -20;
        this.x = Math.random() * width;
      }
      if (this.x > width + 20) this.x = -20;
      if (this.x < -20) this.x = width + 20;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = SNOW_COLOR;
      ctx.shadowColor = 'rgba(160, 200, 255, 0.2)';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  let stars = [];
  for (let i = 0; i < 80; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  function drawStars() {
    for (let s of stars) {
      s.alpha += (Math.random() - 0.5) * 0.03;
      s.alpha = Math.min(0.7, Math.max(0.1, s.alpha));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210, 235, 255, ${s.alpha * 0.5})`;
      ctx.shadowColor = 'rgba(180, 215, 255, 0.1)';
      ctx.shadowBlur = 6;
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const grad = ctx.createRadialGradient(width*0.5, height*0.3, 100, width*0.5, height*0.5, width*0.9);
    grad.addColorStop(0, '#141d2b');
    grad.addColorStop(0.7, '#0a0e16');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    for (let p of particles) {
      p.update();
      p.draw();
    }
    drawStars();
    ctx.shadowBlur = 0;
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    resize();
    initParticles();
    stars = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
  });
})();
