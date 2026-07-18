/* ============================================================
   YUTIKA AGARWAL — "AURORA GLASS" PORTFOLIO SCRIPT
   Handles: rotating role text, cursor-follow glow, scroll-reveal,
   count-up numbers, scroll progress, active nav, 3D tilt,
   card spotlight, magnetic buttons, mobile menu.
   ------------------------------------------------------------
   Quick tweak: change the rotating roles in the ROLES array below.
   ============================================================ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches || window.innerWidth < 760;

/* ---------- 0) Dark / light theme toggle ---------- */
(function theme() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  // Use saved choice, else follow the system preference
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let mode = saved || (prefersDark ? 'dark' : 'light');

  function apply(m) {
    root.setAttribute('data-theme', m);
    if (btn) btn.textContent = m === 'dark' ? '☀️' : '🌙';
  }
  apply(mode);

  btn.addEventListener('click', () => {
    mode = mode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', mode);
    apply(mode);
  });
})();

/* ---------- 1) Rotating role text (typing effect) ---------- */
const ROLES = [
  'Computer Vision Engineer',
  'LLM Fine-Tuning Specialist',
  'Deep Learning Researcher',
  'AI/ML Engineer',
];
(function typeRoles() {
  const el = document.getElementById('roleRotate');
  if (!el) return;
  let r = 0, c = 0, deleting = false;
  function tick() {
    const word = ROLES[r];
    el.textContent = word.slice(0, c);
    if (!deleting && c < word.length) c++;
    else if (deleting && c > 0) c--;
    else if (!deleting && c === word.length) { deleting = true; setTimeout(tick, 1600); return; }
    else { deleting = false; r = (r + 1) % ROLES.length; }
    setTimeout(tick, deleting ? 45 : 90);
  }
  tick();
})();

/* ---------- 2) Scroll-reveal ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* ---------- 3) Count-up numbers ---------- */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const start = performance.now(), duration = 1500;
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach((el) => statObserver.observe(el));

/* ---------- 4) Scroll progress + back-to-top + nav shadow ---------- */
const progress = document.getElementById('progress');
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');
function onScroll() {
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progress.style.width = (scrolled * 100) + '%';
  nav.classList.toggle('scrolled', h.scrollTop > 20);
  toTop.classList.toggle('show', h.scrollTop > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- 5) Active nav link highlighting ---------- */
const navLinks = document.querySelectorAll('.nav__links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach((s) => navObserver.observe(s));

/* ---------- 6) Mobile menu ---------- */
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => links.classList.remove('open')));

/* ---------- 7) Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   Desktop-only interactions (skip on touch / reduced motion)
   ============================================================ */
if (!isTouch && !reduceMotion) {

  /* 8) Cursor-follow aurora glow */
  const glow = document.getElementById('cursorGlow');
  let gx = innerWidth / 2, gy = innerHeight / 2, cx = gx, cy = gy;
  window.addEventListener('mousemove', (e) => { gx = e.clientX; gy = e.clientY; });
  (function glowLoop() {
    cx += (gx - cx) * 0.12;
    cy += (gy - cy) * 0.12;
    glow.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(glowLoop);
  })();

  /* 9) Magnetic buttons */
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* 10) 3D tilt + spotlight on cards */
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rotY = (px - 0.5) * 8;
      const rotX = (0.5 - py) * 8;
      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      if (el.hasAttribute('data-spotlight')) {
        el.style.setProperty('--mx', px * 100 + '%');
        el.style.setProperty('--my', py * 100 + '%');
      }
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}
