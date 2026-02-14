const yesBtn = document.getElementById("yesBtn");
const hellYesBtn = document.getElementById("hellYesBtn");
const secret = document.getElementById("secret");
const confettiCanvas = document.getElementById("confettiCanvas");

const notes = [
  "Yay! I pinky-promise endless cuddles and boba dates. 🧋💗",
  "Best answer ever. You + me + love = forever. 💞",
  "My heart just did a happy dance! Let's celebrate with boba. ✨",
];

let idx = 0;

const confetti = {
  particles: [],
  running: false,
  durationMs: 2200,
};

const resizeCanvas = () => {
  if (!confettiCanvas) {
    return;
  }

  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
};

const launchConfetti = () => {
  if (!confettiCanvas) {
    return;
  }

  resizeCanvas();
  const ctx = confettiCanvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const colors = ["#ff4f9a", "#ff79b2", "#ffd166", "#7bdff2", "#cdb4db", "#ff6f61"];
  confetti.particles = Array.from({ length: 170 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: -20 - Math.random() * confettiCanvas.height * 0.35,
    r: 4 + Math.random() * 5,
    tilt: Math.random() * Math.PI,
    speedY: 2 + Math.random() * 3,
    speedX: -1.2 + Math.random() * 2.4,
    spin: -0.15 + Math.random() * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  const start = performance.now();
  confetti.running = true;

  const draw = (timestamp) => {
    const elapsed = timestamp - start;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confetti.particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.tilt += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.tilt);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.8);
      ctx.restore();
    });

    if (elapsed < confetti.durationMs) {
      requestAnimationFrame(draw);
    } else {
      confetti.running = false;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  };

  requestAnimationFrame(draw);
};

const celebrate = () => {
  secret.textContent = notes[idx % notes.length];
  idx += 1;

  if (!confetti.running) {
    launchConfetti();
  }
};

yesBtn?.addEventListener("click", celebrate);
hellYesBtn?.addEventListener("click", celebrate);
window.addEventListener("resize", resizeCanvas);
