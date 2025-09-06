document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(".animar");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Se anima solo una vez
      }
    });
  }, { threshold: 0.2 });

  elementos.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(".animar");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elementos.forEach(el => observer.observe(el));
});