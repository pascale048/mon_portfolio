// Menu responsive
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav ul");

navToggle.addEventListener("click", () => {
  navList.classList.toggle("open");
});

// Scroll fluide
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Flèche haut
const scrollBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 250) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Simulation d'envoi
const form = document.querySelector(".contact-form");
form.addEventListener("submit", e => {
  e.preventDefault();
  alert("Message envoyé ! Merci pour votre contact.");
});
