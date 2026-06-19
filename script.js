// ===== NAVIGATION TOGGLE (mobile) =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// ===== PARTICLE CANVAS (homepage hero) =====
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 120;

  function resizeCanvas() {
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.5 ? '108, 92, 231' : '0, 206, 255'
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      // Move
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      ctx.fill();

      // Glow effect
      ctx.shadowColor = `rgba(${p.color}, 0.3)`;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - p.x;
        const dy = particles[j].y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108, 92, 231, ${0.08 * (1 - distance / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  createParticles();
  drawParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

console.log('❄️ Snowverse — universe of ideas');
