// Liste des PDF disponibles dans le dossier /pdfs/
const pdfs = [
  "pdfs/exercice1.pdf",
];

// Sélectionne un PDF au hasard
const randomPdf = pdfs[Math.floor(Math.random() * pdfs.length)];

// Affiche le PDF dans la page
const container = document.getElementById("pdfContainer");
container.innerHTML = `
  <iframe src="${randomPdf}" width="100%" height="600px" style="border: none;"></iframe>
`;

// Chronomètre infini qui démarre à 0
let seconds = 0;
const timer = document.getElementById("timer");

function updateTimer() {
  seconds++;
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  timer.textContent = `${min}:${sec}`;
}

setInterval(updateTimer, 1000);

// Bouton retour à la roue
const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
