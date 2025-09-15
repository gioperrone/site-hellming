const btnMobile = document.getElementById("btn-mobile");
const nav = document.getElementById("nav");
const header = document.querySelector("header");
const navLinks = document.querySelectorAll("#nav a");

// === Funções menu mobile ===
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
    nav.classList.remove("active");
    btnMobile.classList.remove("active");
  }
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("active") && window.innerWidth <= 768) {
      nav.classList.remove("active");
      btnMobile.classList.remove("active");
      resetHeaderStyles();
    }
  });
});

// Smooth scroll
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

// Reduzir/ampliar header ao scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

// === Preloader ===
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    const minTime = 2000; // tempo mínimo em ms (2s)
    const start = performance.now();

    const end = () => {
      const elapsed = performance.now() - start;
      const delay = Math.max(0, minTime - elapsed);
      setTimeout(() => {
        preloader.classList.add("hidden");
      }, delay);
    };

    end();
  }
});

// === Ocultar "Drag →" ao rolar o carrossel ===
const carousel = document.querySelector('.store-carousel');
const fadeText = document.querySelector('.store-fade-text');

if (carousel && fadeText) {
  carousel.addEventListener('scroll', () => {
    if (carousel.scrollLeft > 0) {
      fadeText.style.opacity = '0';   // desaparece ao rolar
      // remove o listener pra não ficar rodando à toa
      carousel.removeEventListener('scroll', arguments.callee);
    }
  });
}