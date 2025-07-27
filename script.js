// Show message on button click
const btn = document.getElementById("activateBtn");
const msg = document.getElementById("message");

btn.addEventListener("click", () => {
  msg.classList.remove("hidden");
  startParticles();
});

// Particle animation
const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

let particlesArray = [];

function initParticles() {
  particlesArray = [];
  const count = 100;
  for (let i = 0; i < count; i++) {
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * -1.5 - 1,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    let p = particlesArray[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y += p.speedY;
    if (p.y < -10) {
      p.y = canvas.height + Math.random() * 100;
      p.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(animateParticles);
}

function startParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
  animateParticles();
    }
