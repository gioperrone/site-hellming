const btnMobile = document.getElementById("btn-mobile");
const nav = document.getElementById("nav");
const header = document.querySelector("header");
const navLinks = document.querySelectorAll("#nav a");

const carousel = document.querySelector('.store-carousel');
const fadeText = document.querySelector('.store-fade-text');
const arrow = fadeText.querySelector('.material-symbols-outlined');

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

// === Seta animada ===
let arrowPos = 0;
let arrowDirection = 1;
function animateArrow() {
  if (fadeText.style.opacity === '0') return; // parar animação se sumiu
  arrowPos += 0.2 * arrowDirection;
  if (arrowPos > 5 || arrowPos < 0) arrowDirection *= -1;
  arrow.style.transform = `translateX(${arrowPos}px)`;
  requestAnimationFrame(animateArrow);
}
animateArrow();

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

// === Carrossel Store - Drag & Scroll ===
function startDrag(e) {
  isDragging = true;
  carousel.classList.add('dragging');
  startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
  scrollLeft = carousel.scrollLeft;

  // fade desaparece no primeiro drag
  fadeText.style.opacity = '0';

  e.preventDefault();
}

function stopDrag() {
  isDragging = false;
  carousel.classList.remove('dragging');
}

function doDrag(e) {
  if (!isDragging) return;
  const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
  const walk = (x - startX) * 0.7;
  carousel.scrollLeft = scrollLeft - walk;
}

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('touchstart', startDrag);

carousel.addEventListener('mouseup', stopDrag);
carousel.addEventListener('mouseleave', stopDrag);
carousel.addEventListener('touchend', stopDrag);

carousel.addEventListener('mousemove', doDrag);
carousel.addEventListener('touchmove', doDrag);