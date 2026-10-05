document.documentElement.classList.add("js");

const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");

if (menuButton && menu) {
  const setMenuState = (isOpen) => {
    const isMobile = window.innerWidth <= 670;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.querySelector(".sr-only").textContent = isOpen ? "Cerrar menú" : "Abrir menú";
    menu.classList.toggle("is-open", isOpen);

    if (isMobile) {
      menu.toggleAttribute("inert", !isOpen);
      menu.setAttribute("aria-hidden", String(!isOpen));
    } else {
      menu.removeAttribute("inert");
      menu.removeAttribute("aria-hidden");
    }
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuState(false)));
  window.addEventListener("resize", () => {
    setMenuState(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
      menuButton.focus();
    }
  });
  setMenuState(false);
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => observer.observe(element));
}
