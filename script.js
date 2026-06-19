// ===== NAVIGATION TOGGLE (mobile) =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== PARTICLE CANVAS (enhanced) =====
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 150;

  function resizeCanvas() {
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function createParticles() {
    particles = [];
    const colors = [
      '124, 58, 237',  // Purple
      '6, 182, 212',   // Cyan
      '236, 72, 153',  // Pink
      '251, 146, 60',  // Orange
      '167, 139, 250'  // Light Purple
    ];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 0.8,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Glow
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
      gradient.addColorStop(0, `rgba(${p.color}, ${p.opacity})`);
      gradient.addColorStop(1, `rgba(${p.color}, 0)`);
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.8})`;
      ctx.fill();

      // Connections with gradient
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - p.x;
        const dy = particles[j].y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const opacity = 0.12 * (1 - distance / 150);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          
          const gradient2 = ctx.createLinearGradient(p.x, p.y, particles[j].x, particles[j].y);
          gradient2.addColorStop(0, `rgba(${p.color}, ${opacity})`);
          gradient2.addColorStop(1, `rgba(${particles[j].color}, ${opacity})`);
          
          ctx.strokeStyle = gradient2;
          ctx.lineWidth = 0.8;
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

// ===== SMOOTH SCROLL =====
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

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

console.log('❄️ Snowverse — Where ideas become reality');
