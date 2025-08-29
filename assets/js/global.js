// ============================
// INICIALIZAR DRAWER (MENÚ MÓVIL)
// ============================
function initDrawer() {
  const menuBtn = document.querySelector(".menu-btn");
  const drawer = document.querySelector("#mobileDrawer");
  const backdrop = document.querySelector("#backdrop");

  if (!menuBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add("open");
    backdrop.classList.add("show");
    backdrop.hidden = false;
    document.body.classList.add("no-scroll");
    menuBtn.setAttribute("aria-expanded", "true");
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    backdrop.classList.remove("show");
    setTimeout(() => (backdrop.hidden = true), 300);
    document.body.classList.remove("no-scroll");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", () => {
    drawer.classList.contains("open") ? closeDrawer() : openDrawer();
  });

  backdrop.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 901 && drawer.classList.contains("open")) closeDrawer();
  });
}

// ============================
// DETECTAR PÁGINA ACTUAL Y MARCAR "ACTIVE"
// ============================
function highlightActivePage() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    if (link.getAttribute("href").endsWith(currentPage)) {
      link.classList.add("active");
    }
  });
}

// ============================
// INICIALIZACIÓN
// ============================
document.addEventListener("DOMContentLoaded", () => {
  initDrawer();
  highlightActivePage();
});
