// ── THEME ─────────────────────────────────────────────────────────────────────

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document
    .querySelectorAll(".theme-icon")
    .forEach((i) => (i.textContent = isDark ? "☀️" : "🌙"));
  updateParticleColors(isDark);
}

(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark-mode");
    document
      .querySelectorAll(".theme-icon")
      .forEach((i) => (i.textContent = "☀️"));
  }
})();

// ── MENU ──────────────────────────────────────────────────────────────────────

function toggleMenu() {
  document.getElementById("mobile-menu").classList.toggle("open");
}

// ── NAV SCROLL ────────────────────────────────────────────────────────────────

window.addEventListener("scroll", () => {
  const nav = document.getElementById("main-nav");
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

// ── CUSTOM CURSOR ─────────────────────────────────────────────────────────────

const cursorRing = document.getElementById("cursor");
const cursorDot = document.getElementById("cursor-dot");

let mx = -100,
  my = -100;
let cx = -100,
  cy = -100;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  cursorRing.style.left = cx + "px";
  cursorRing.style.top = cy + "px";
  cursorDot.style.left = mx + "px";
  cursorDot.style.top = my + "px";
  requestAnimationFrame(animateCursor);
}

animateCursor();

document
  .querySelectorAll("a, button, .project-row, .blog-row, .skill-list li")
  .forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover"),
    );
  });

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────────

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add("visible"), delay);
        revealObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  revealObserver.observe(el);
});

// ── PARTICLES ─────────────────────────────────────────────────────────────────

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let isDarkMode = document.body.classList.contains("dark-mode");
let mouse = { x: -9999, y: -9999 };
let time = 0;
let particles = [];

const CFG = {
  count: 200,
  magnetRadius: 130,
  fieldStrength: 10,
  waveSpeed: 0.5,
  waveAmplitude: 1,
  lerpSpeed: 0.07,
  rotationSpeed: 0.4,
  pulseSpeed: 2,
  particleSize: 1.8,
  ringRadius: 4,
};

function getColor() {
  return isDarkMode ? "rgba(255,159,252," : "rgba(100,100,110,";
}

function updateParticleColors(dark) {
  isDarkMode = dark;
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.ox = Math.random() * canvas.width;
    this.oy = Math.random() * canvas.height;
    this.x = this.ox;
    this.y = this.oy;
    this.vx = 0;
    this.vy = 0;
    this.size = CFG.particleSize * (0.5 + Math.random());
    this.offset = Math.random() * Math.PI * 2;
    this.speed = 0.3 + Math.random() * 0.7;
    this.depth = 0.4 + Math.random() * 0.6;
    this.angle = Math.random() * Math.PI * 2;
  }

  update() {
    const t = time * CFG.waveSpeed + this.offset;
    const waveX = Math.cos(t + this.angle) * CFG.waveAmplitude * this.speed;
    const waveY =
      Math.sin(t * 1.3 + this.angle) * CFG.waveAmplitude * this.speed;
    this.angle += CFG.rotationSpeed * 0.003 * this.speed;
    const tx = this.ox + Math.cos(this.angle) * CFG.ringRadius + waveX;
    const ty = this.oy + Math.sin(this.angle) * CFG.ringRadius + waveY;
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < CFG.magnetRadius) {
      const force = (1 - dist / CFG.magnetRadius) * CFG.fieldStrength;
      this.vx += (dx / dist) * force * this.depth;
      this.vy += (dy / dist) * force * this.depth;
    }
    this.vx += (tx - this.x) * CFG.lerpSpeed;
    this.vy += (ty - this.y) * CFG.lerpSpeed;
    this.vx *= 0.82;
    this.vy *= 0.82;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    const pulse = 1 + Math.sin(time * CFG.pulseSpeed + this.offset) * 0.3;
    const r = this.size * pulse * this.depth;
    const alpha = 0.2 + this.depth * 0.4;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = getColor() + alpha + ")";
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.vy, this.vx) + Math.PI / 2);
    ctx.beginPath();
    ctx.roundRect(-r, -r * 2, r * 2, r * 4, r);
    ctx.fill();
    ctx.restore();
  }
}

function init() {
  resize();
  particles = Array.from({ length: CFG.count }, () => new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  time += 0.016;
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resize();
  particles.forEach((p) => {
    p.ox = Math.random() * canvas.width;
    p.oy = Math.random() * canvas.height;
  });
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("mouseleave", () => {
  mouse.x = -9999;
  mouse.y = -9999;
});
window.addEventListener(
  "touchmove",
  (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  },
  { passive: true },
);
window.addEventListener("touchend", () => {
  mouse.x = -9999;
  mouse.y = -9999;
});

init();
animate();

// ── BLOG ──────────────────────────────────────────────────────────────────────

const blogPosts = [
  {
    tag: "Getting Started",
    date: "February 2026",
    title: "Why I Started This Blog",
    body: `
      <p>Building software is one thing — documenting the journey is another.</p>
      <p>I've been thinking about starting this blog for a while. Not because I have all the answers, 
      but because I think there's real value in writing things down as you go. The breakthroughs, the 
      bugs that took three hours to fix, the moments where something finally clicks — those are worth capturing.</p>
      <p>This is my space to be honest about what it's actually like to grow as a software engineer. 
      No polished highlight reels — just the real journey, from Cape Town to wherever this career takes me.</p>
    `,
  },
  {
    tag: "Learning",
    date: "February 2026",
    title: "Backing The-Engineer",
    body: `
      <p>A year goes by faster than you think.</p>
      <p>I recently started out, I thought the hardest part would be learning the syntax. Turns out, the 
      syntax is the easy part. The harder parts are understanding why systems are designed the way they 
      are, learning to read other people's code, and building the confidence to push your own solutions.</p>
      <p>Java and Spring Boot have been my world this past few months. from learning how to build APIs, wrestling with SQL queries, 
      and slowly started to understand what "clean code" actually means in practice — not just in theory.</p>
      <p>What surprised me most: how much of engineering is communication. Writing clear commit messages, 
      documenting your work, asking good questions. That stuff matters just as much as the code itself.</p>
    `,
  },
  {
    tag: "Life",
    date: "Coming Soon",
    title: "Engineering from Cape Town",
    body: `
      <p>This one is still being written — check back soon.</p>
      <p>I want to talk about what it's like navigating the tech industry from South Africa, the 
      opportunities I see, the challenges that come with the territory, and why I'm genuinely excited 
      about the road ahead.</p>
    `,
  },
];

function openPost(index) {
  const post = blogPosts[index];
  document.getElementById("modal-tag").textContent = post.tag;
  document.getElementById("modal-date").textContent = post.date;
  document.getElementById("modal-title").textContent = post.title;
  document.getElementById("modal-body").innerHTML = post.body;
  document.getElementById("blog-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("blog-modal").classList.remove("open");
  document.body.style.overflow = "";
}

function closePost(e) {
  if (e.target === document.getElementById("blog-modal")) closeModal();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
