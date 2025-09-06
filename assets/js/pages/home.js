document.addEventListener("DOMContentLoaded", () => {
  console.log("Página de inicio cargada.");

  const banners = document.querySelectorAll(".banner-img");
  let currentIndex = 0;

  if (!banners.length) return;

  function changeBanner() {
    banners[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % banners.length;
    banners[currentIndex].classList.add("active");
  }

  setInterval(changeBanner, 8000);
});

// cambio de imagen principal al pasar sobre miniaturas
document.querySelectorAll(".product-thumbs img").forEach(thumb => {
  thumb.addEventListener("mouseenter", function() {
    const mainImg = this.closest(".product-card").querySelector(".main-img");

    // añade clase para iniciar el fade-out
    mainImg.classList.add("fade-out");

    // espera la transición y luego cambia la imagen
    setTimeout(() => {
      mainImg.src = this.dataset.main;

      // quita la clase para que vuelva a aparecer
      mainImg.classList.remove("fade-out");
    }, 200); // debe ser un poco menos que el tiempo de la transición (0.4s)
  });
});
