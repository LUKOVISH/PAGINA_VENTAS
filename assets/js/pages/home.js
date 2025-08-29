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
