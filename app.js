// Starfield background
(function () {
  const c = document.getElementById('starfield');
  const ctx = c.getContext('2d');
  let stars = [];

  function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }

  function create() {
    stars = [];
    const count = Math.floor((c.width * c.height) / 12000); // sparser
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.008 + 0.002,
        offset: Math.random() * Math.PI * 2,
        warm: Math.random() > 0.6,
      });
    }
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    t += 0.016;
    for (const s of stars) {
      const flicker = Math.sin(t * s.speed * 60 + s.offset) * 0.25 + 0.75;
      const a = s.a * flicker;
      ctx.fillStyle = s.warm
        ? `rgba(201,164,86,${a * 0.6})`
        : `rgba(200,196,188,${a})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); create(); });
  resize(); create(); draw();
})();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('active'))
);

// Animations
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
const ht = gsap.timeline({ defaults: { ease: 'power2.out' } });
ht.from('.hero-eyebrow', { opacity: 0, x: -20, duration: 0.6 })
  .from('.hero h1', { opacity: 0, y: 40, duration: 0.9 }, '-=0.3')
  .from('.hero-desc', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
  .from('.hero-actions', { opacity: 0, y: 15, duration: 0.6 }, '-=0.3')
  .from('.planet', { opacity: 0, scale: 0.85, duration: 1.2, ease: 'power3.out' }, '-=0.8')
  .from('.orbit-line', { opacity: 0, scale: 0.5, duration: 1, stagger: 0.15 }, '-=0.9');

// Scroll reveal
document.querySelectorAll('.reveal').forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 87%' },
  });
});

// Stagger about cards
gsap.utils.toArray('.about-cell').forEach((cell, i) => {
  gsap.to(cell, {
    opacity: 1, y: 0, duration: 0.7, delay: i * 0.12,
    ease: 'power2.out',
    scrollTrigger: { trigger: cell, start: 'top 88%' },
  });
});

// Stagger team cards
gsap.utils.toArray('.team-card').forEach((card, i) => {
  gsap.to(card, {
    opacity: 1, y: 0, duration: 0.7, delay: i * 0.12,
    ease: 'power2.out',
    scrollTrigger: { trigger: card, start: 'top 88%' },
  });
});

// Planet parallax on scroll
gsap.to('.hero-visual', {
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
  y: -80, ease: 'none',
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    const t = document.querySelector(this.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
