// Slider
let current = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
function goToSlide(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = n;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}
function nextSlide() {
  goToSlide((current + 1) % slides.length);
}
function prevSlide() {
  goToSlide((current - 1 + slides.length) % slides.length);
}
let autoplay = setInterval(nextSlide, 6500);
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(autoplay);
    goToSlide(i);
    autoplay = setInterval(nextSlide, 6500);
  });
});
// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.product-card, .full-product-card, .stat-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s';
  observer.observe(el);
});
// Mobile
// Hamburger menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});
// Touch/swipe support
let touchStartX = 0;
document.querySelector('.slider').addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
document.querySelector('.slider').addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 40) {
    clearInterval(autoplay);
    diff > 0 ? nextSlide() : prevSlide();
    autoplay = setInterval(nextSlide, 6500);
  }
}, { passive: true });