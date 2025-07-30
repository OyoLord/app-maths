/*
 * script/math.js – Gestion de la page maths. Ce script sélectionne au
 * hasard un fichier PDF depuis le dossier « pdfs/ » (voir la liste
 * pdfFiles ci-dessous) et l'affiche dans un iframe. Il démarre également
 * un chronomètre infini (compteur) qui affiche le temps écoulé depuis
 * l'ouverture de la page. Le bouton de retour renvoie à la roue.
 */

// IMPORTANT : Ajoutez ici les noms de vos fichiers PDF se trouvant dans le dossier « pdfs/ ».
// Exemple : ['exercice1.pdf', 'exercice2.pdf']
const pdfFiles = [
  exercice1.pdf,
];

(function() {
  const timerEl = document.getElementById('timer');
  const pdfContainer = document.getElementById('pdfContainer');
  const backBtn = document.getElementById('backButton');

  // Choisir un PDF aléatoirement
  if (pdfFiles.length > 0) {
    const chosen = pdfFiles[Math.floor(Math.random() * pdfFiles.length)];
    const iframe = document.createElement('iframe');
    iframe.src = 'pdfs/' + chosen;
    iframe.title = 'Exercice PDF';
    pdfContainer.appendChild(iframe);
  } else {
    // Message d'aide si aucun PDF n'est configuré
    pdfContainer.innerHTML = '<p style="color:#e0e0e0;">Aucun fichier PDF n\\'est configuré. Ajoutez vos fichiers dans le dossier <code>pdfs/</code> et mettez à jour la liste <code>pdfFiles</code> dans <code>math.js</code>.</p>';
  }

  // Chronomètre infini (compteur) – commence à zéro et incrémente toutes les secondes
  let seconds = 0;
  function updateTimer() {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    timerEl.textContent = `${mins}:${secs}`;
  }
  setInterval(updateTimer, 1000);

  // Bouton retour vers la roue
  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
})();
