// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => {
  observer.observe(el);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-nosotros');
  const rate = scrolled * -0.5;
  
  if (hero) {
    hero.style.transform = `translate3d(0, ${rate}px, 0)`;
  }
});

// Smooth reveal animation on load
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Add interactive hover effects
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  const decorativeElements = document.querySelectorAll('.floating-element');
  decorativeElements.forEach((el, index) => {
    const speed = (index + 1) * 0.5;
    el.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
  });
});