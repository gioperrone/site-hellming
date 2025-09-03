const btnMobile = document.getElementById("btn-mobile");
const nav = document.getElementById("nav");
const header = document.querySelector("header");
const navLinks = document.querySelectorAll("#nav a");

btnMobile.addEventListener("click", () => {
  nav.classList.toggle("active");
  btnMobile.classList.toggle("active");

  if (nav.classList.contains("active")) {
    header.style.borderBottom = "none";
  } else {
    header.style.borderBottom = "2px solid var(--primary-color)";
  }
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    // Fecha o menu somente se estiver aberto (mobile)
    if (nav.classList.contains("active") && window.innerWidth <= 768) {
      nav.classList.remove("active");
      btnMobile.classList.remove("active");
      header.style.borderBottom = "2px solid var(--primary-color)"; // restaura a borda
    }
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId !== "#") {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
      }
    }
  });
});

// Contact Form (Demo)
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Message sent! (Demo only)');
  this.reset();
});
