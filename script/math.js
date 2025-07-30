/*
 * script/math.js – Sélectionne un fichier PDF au hasard dans le dossier pdfs/,
 * l'affiche dans un iframe et lance un chronomètre infini. Le bouton
 * "Retour à la roue" renvoie à index.html.
 */

// Ajoutez ici le nom de vos fichiers PDF (ex : ['ex1.pdf','ex2.pdf','ex3.pdf'])
const pdfFiles = [
  pdfs/exercice1.pdf
];

(function() {
  const timerEl      = document.getElementById('timer');
  const pdfContainer = document.getElementById('pdfContainer');
  const backBtn      = document.getElementById('backButton');

  // Choisir un PDF aléatoire
  if (pdfFiles.length > 0) {
    const chosen = pdfFiles[Math.floor(Math.random() * pdfFiles.length)];
    const iframe = document.createElement('iframe');
    iframe.src   = 'pdfs/' + chosen;
    iframe.title = 'Exercice PDF';
    pdfContainer.appendChild(iframe);
  } else {
    // Message si aucun fichier PDF n'est renseigné
    pdfContainer.innerHTML =
      '<p style="color:#e0e0e0;">Aucun PDF configuré. Ajoutez vos fichiers dans le dossier <code>pdfs/</code> et mettez à jour la liste <code>pdfFiles</code> dans <code>script/math.js</code>.</p>';
  }

  // Chronomètre infini
  let seconds = 0;
  function updateTimer() {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    timerEl.textContent = `${mins}:${secs}`;
  }
  setInterval(updateTimer, 1000);

  // Retour vers la roue
  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
})();
