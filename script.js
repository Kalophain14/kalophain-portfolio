// ── THEME ─────────────────────────────────────────────────────────────────────

function triggerThemeRipple(btn) {
  const rect = btn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2.2;
  const ripple = document.createElement("div");
  ripple.className = "theme-ripple";
  const isLightNow = document.body.classList.contains("light-mode");
  ripple.style.cssText = `
    width: ${maxDim}px;
    height: ${maxDim}px;
    left: ${cx - maxDim / 2}px;
    top: ${cy - maxDim / 2}px;
    background: ${isLightNow ? "#111110" : "#f5f4f0"};
  `;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 650);
}

function toggleTheme(e) {
  const btn = document.getElementById("theme-btn");
  triggerThemeRipple(btn);

  // Fade out current about content
  const aboutText = document.querySelector(".about-text");
  if (aboutText) {
    aboutText.style.opacity = "0";
    aboutText.style.transform = "translateY(10px)";
    aboutText.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  }

  // Toggle light-mode (dark is default, no class needed)
  const isLight = document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  isDarkMode = !isLight;

  // Fade back in after mode switch
  if (aboutText) {
    setTimeout(() => {
      aboutText.style.transition =
        "opacity 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1)";
      aboutText.style.opacity = "1";
      aboutText.style.transform = "translateY(0)";
      setTimeout(() => {
        aboutText.style.transition = "";
        aboutText.style.opacity = "";
        aboutText.style.transform = "";
      }, 500);
    }, 120);
  }
}

// Apply saved theme immediately (before DOM ready to avoid flash)
(function () {
  const saved = localStorage.getItem("theme");
  // Dark is the default - only add light-mode class if explicitly saved as light
  if (saved === "light") {
    document.body.classList.add("light-mode");
  }
})();

// ── MENU ──────────────────────────────────────────────────────────────────────

function toggleMenu() {
  document.getElementById("mobile-menu").classList.toggle("open");
}

// ── MULTILINGUAL GREETING ─────────────────────────────────────────────────────

const greetings = [
  { text: "Sawubona", lang: "isiZulu" },
  { text: "Dumela", lang: "Setswana" },
  { text: "Hallo", lang: "Afrikaans" },
  { text: "Ndaa", lang: "Venda" },
  { text: "Dumela", lang: "Sepedi" },
  { text: "Hola", lang: "Spanish" },
  { text: "Hi", lang: "English" },
];

let greetingIndex = 0;

window.addEventListener("load", () => {
  const gel = document.getElementById("greeting-text");
  if (!gel) return;
  setInterval(() => {
    gel.classList.add("fade-out");
    setTimeout(() => {
      greetingIndex = (greetingIndex + 1) % greetings.length;
      gel.textContent = greetings[greetingIndex].text;
      gel.title = greetings[greetingIndex].lang;
      gel.classList.remove("fade-out");
    }, 450);
  }, 2200);
});

// ── NAV SCROLL ────────────────────────────────────────────────────────────────

window.addEventListener("scroll", () => {
  const nav = document.getElementById("main-nav");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
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
  if (cursorRing) {
    cursorRing.style.left = cx + "px";
    cursorRing.style.top = cy + "px";
  }
  if (cursorDot) {
    cursorDot.style.left = mx + "px";
    cursorDot.style.top = my + "px";
  }
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
    entries.forEach((entry) => {
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

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ── PARTICLES ─────────────────────────────────────────────────────────────────

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let isDarkMode = !document.body.classList.contains("light-mode");
let mouse = { x: -9999, y: -9999 };
let time = 0;
let particles = [];

const CFG = {
  count: 220,
  magnetRadius: 180,
  fieldStrength: 18,
  waveSpeed: 0.5,
  waveAmplitude: 1,
  lerpSpeed: 0.07,
  rotationSpeed: 0.4,
  pulseSpeed: 2,
  particleSize: 1.8,
  ringRadius: 4,
};

function getColor() {
  return isDarkMode ? "rgba(220,130,255," : "rgba(40,40,55,";
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
    const r = Math.max(0.5, this.size * pulse * this.depth);
    const alpha = 0.35 + this.depth * 0.5;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = getColor() + alpha + ")";
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.vy || 0.01, this.vx || 0.01) + Math.PI / 2);
    ctx.beginPath();
    ctx.ellipse(0, 0, r, r * 2.4, 0, 0, Math.PI * 2);
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
      <p>I recently started out thinking the hardest part would be learning the syntax. Turns out, the 
      syntax is the easy part. The harder parts are understanding why systems are designed the way they 
      are, learning to read other people's code, and building the confidence to push your own solutions.</p>
      <p>Java and Spring Boot have been my world this past few months — from building APIs, wrestling with SQL queries, 
      to slowly understanding what "clean code" actually means in practice.</p>
      <p>What surprised me most: how much of engineering is communication. Writing clear commit messages, 
      documenting your work, asking good questions — that stuff matters just as much as the code itself.</p>
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
  {
    tag: "Cloud",
    date: "February 2026",
    title: "My Visit to AWS",
    body: `
      <p>Walking into an AWS office for the first time felt surreal.</p>
      <p>I've been studying cloud infrastructure on my own — reading docs, watching re:Invent talks, 
      experimenting with EC2 and S3 on a free tier account. But being in a room with engineers who 
      actually build and maintain these services at scale was a completely different experience.</p>
      <p>What stood out most wasn't the technology — it was the culture. The obsession with customer 
      outcomes, the "working backwards" mindset, the way they think about failure as a given rather 
      than an exception. It reshaped how I think about building systems.</p>
      <p>I left with more questions than answers, which felt right. The best learning experiences 
      usually do that.</p>
    `,
  },
  {
    tag: "Events",
    date: "January 2026",
    title: "Hackathon Experience",
    body: `
      <p>48 hours. One idea. A team of strangers. No sleep.</p>
      <p>My first hackathon was everything I expected and nothing like I imagined. The energy in the 
      room at 2am — people debugging, sketching on whiteboards, arguing about architecture — was 
      unlike anything I'd experienced in a normal work week.</p>
      <p>We built a real-time notification system for local community alerts using Spring Boot and 
      WebSockets. It wasn't perfect. It crashed twice during the demo. But we shipped something, 
      and that felt huge.</p>
      <p>The biggest lesson? Constraints make you creative. When you have 48 hours and no budget, 
      you stop overthinking and start building. I'll carry that mindset into every project going forward.</p>
    `,
  },
  {
    tag: "Growth",
    date: "January 2026",
    title: "Lessons from Building Side Projects",
    body: `
      <p>Side projects are where I do my best learning — and make my worst mistakes.</p>
      <p>There's a specific kind of frustration that comes from being the only person responsible 
      for a project. No senior developer to ask. No code review. Just you, the documentation, 
      and Stack Overflow at midnight. It's humbling in the best way.</p>
      <p>Here's what building on my own has taught me: start smaller than you think. Every time I 
      scoped a project, I overestimated what I could build and underestimated how long it would take. 
      Now I try to get something working first, then expand.</p>
      <p>The other big lesson: done is better than perfect. I have three unfinished projects sitting 
      in private repos because I kept refactoring instead of shipping. The projects that actually 
      taught me the most were the ones I pushed through to completion — bugs and all.</p>
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

// ── DOM EVENT LISTENERS ───────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // Mobile menu
  const menuBtn = document.getElementById("menu-btn");
  if (menuBtn) menuBtn.addEventListener("click", toggleMenu);

  const mobileClose = document.getElementById("mobile-close");
  if (mobileClose) mobileClose.addEventListener("click", toggleMenu);

  document.querySelectorAll(".mobile-menu a").forEach((a) => {
    a.addEventListener("click", () => {
      document.getElementById("mobile-menu").classList.remove("open");
    });
  });

  // Blog rows — wire up all posts dynamically
  for (let i = 0; i < blogPosts.length; i++) {
    const el = document.getElementById("blog-" + i);
    if (el) {
      el.addEventListener(
        "click",
        (function (idx) {
          return function () {
            openPost(idx);
          };
        })(i),
      );
    }
  }

  // Modal close button
  const modalCloseBtn = document.getElementById("modal-close-btn");
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

  // Click outside modal to close
  const modal = document.getElementById("blog-modal");
  if (modal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
