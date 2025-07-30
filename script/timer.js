/*
 * timer.js – Implémente un minuteur en trois phases pour la page « timer.html ».
 * Dès le chargement de la page, une séquence d'instructions guidées commence :
 * 1. Inspirez : durée aléatoire de 1 à 5 secondes, fond orange.
 * 2. Bloquez : durée aléatoire de 1 à 10 secondes, fond rouge.
 * 3. Soufflez : fond vert, durée fixe avant l'apparition du bouton de retour.
 * L'utilisateur peut ensuite revenir à la roue de la chance via un bouton.
 */

window.addEventListener('load', () => {
  const messageEl = document.getElementById('timerMessage');
  const backBtn = document.getElementById('backButton');

  function startSequence() {
    // Phase 1 : Inspirez
    const t1 = Math.floor(Math.random() * 5) + 1; // 1 à 5 secondes
    document.body.className = 'phase1';
    messageEl.textContent = 'Inspirez';
    setTimeout(() => {
      // Phase 2 : Bloquez
      const t2 = Math.floor(Math.random() * 10) + 1; // 1 à 10 secondes
      document.body.className = 'phase2';
      messageEl.textContent = 'Bloquez';
      setTimeout(() => {
        // Phase 3 : Soufflez
        document.body.className = 'phase3';
        messageEl.textContent = 'Soufflez';
        // Après 3 secondes, afficher le bouton de retour
        setTimeout(() => {
          backBtn.style.display = 'inline-block';
        }, 3000);
      }, t2 * 1000);
    }, t1 * 1000);
  }

  startSequence();

  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
