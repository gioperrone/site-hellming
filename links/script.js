// ========================================
// HELLming - Links Page
// ========================================

// Remove o foco visual do botão depois do clique.
// Mantém a página simples e sem interferir
// no funcionamento dos links.

document.querySelectorAll('.link-button').forEach((link) => {

  link.addEventListener('click', () => {
    link.blur();
  });

});