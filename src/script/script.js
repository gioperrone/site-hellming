const btnMobile = document.getElementById("btn-mobile");
const nav = document.getElementById("nav");
const header = document.querySelector("header");
const navLinks = document.querySelectorAll("#nav a");

function resetHeaderStyles() {
  header.style.borderBottom = "2px solid var(--primary-color)";
  header.style.background = "rgba(0,0,0,0.4)";
  header.style.backdropFilter = "blur(10px)";
}

btnMobile.addEventListener("click", () => {
  nav.classList.toggle("active");
  btnMobile.classList.toggle("active");

  if (nav.classList.contains("active")) {
    header.style.borderBottom = "none";
    header.style.background = "transparent";
    header.style.backdropFilter = "none";
  } else {
    resetHeaderStyles();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    resetHeaderStyles();
    // fechar o menu se estava aberto
    nav.classList.remove("active");
    btnMobile.classList.remove("active");
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

// reduzir e ampliar menu de navegação
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) { 
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});