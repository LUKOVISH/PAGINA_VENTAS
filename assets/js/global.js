// ============================
// CARGAR PARTES DEL HTML (HEADER & FOOTER)
// ============================
async function includeHTML(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (container) {
    try {
      const response = await fetch(filePath);
      if (response.ok) {
        container.innerHTML = await response.text();

        // Si es el header, inicializamos su JS después de cargarlo
        if (filePath.includes("header")) {
          initDrawer();
          highlightActivePage();
        }
      } else {
        console.error(`Error al cargar ${filePath}`);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
}

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
// CARGA DE COMPONENTES AL INICIAR
// ============================
document.addEventListener("DOMContentLoaded", () => {
  includeHTML("header-container", "/partials/header.html");
  includeHTML("footer-container", "/partials/footer.html");
});
// Función para cargar partials
async function loadPartial(url, containerId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(`Error cargando ${url}:`, error);
    }
}

// Cargar header y footer cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    loadPartial('partials/header.html', 'header-container');
    loadPartial('partials/footer.html', 'footer-container');
});