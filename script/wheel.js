/*
 * script/wheel.js – Dessine et anime la roue de fortune. La roue comporte
 * dix segments, avec cinq segments « Maths » et cinq segments « Timer »
 * répartis aléatoirement. Lorsque l'utilisateur lance la roue, la roue
 * tourne, un son est joué (si un fichier audio a été fourni), et un
 * segment est sélectionné avec une probabilité de 50/50. La redirection
 * vers math.html ou timer.html se fait après la rotation.
 */

(function() {
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const spinButton = document.getElementById('spinButton');
  const pointerEl = document.getElementById('pointer');
  const audioEl = document.getElementById('spinSound');

  // Création des segments : 5 "Maths" et 5 "Timer"
  const segments = [];
  for (let i = 0; i < 5; i++) segments.push('Maths');
  for (let i = 0; i < 5; i++) segments.push('Timer');
  // Mélange aléatoire
  segments.sort(() => Math.random() - 0.5);

  // Palette de couleurs sombres mais différentiables
  const colors = [
    '#2c3e50', '#34495e', '#1f2d3a', '#2d3a45', '#25303d',
    '#3a5068', '#2a3a4f', '#324a69', '#283f56', '#374e6e'
  ];

  /**
   * Dessine la roue avec un pointeur visible. Les textes sont centrés
   * horizontalement sur chaque segment.
   */
  function drawWheel() {
    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const segAngle = (2 * Math.PI) / segments.length;
    for (let i = 0; i < segments.length; i++) {
      const start = i * segAngle;
      const end = start + segAngle;
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Texte de segment
      ctx.save();
      ctx.translate(radius, radius);
      const textAngle = start + segAngle / 2;
      ctx.rotate(textAngle);
      ctx.fillStyle = '#e0e0e0';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(segments[i], radius - 20, 0);
      ctx.restore();
    }
    // Le pointeur est dessiné via CSS (#pointer), pas ici
  }

  drawWheel();

  let isSpinning = false;

  spinButton.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    // Lecture du son si disponible
    if (audioEl && audioEl.querySelector('source') && audioEl.querySelector('source').src) {
      audioEl.currentTime = 0;
      audioEl.play().catch(() => { /* la lecture peut être bloquée selon l'autorisation utilisateur */ });
    }
    // Choix du type (Maths ou Timer)
    const targetType = Math.random() < 0.5 ? 'Maths' : 'Timer';
    // Trouver un segment correspondant
    const candidateIndices = segments.map((seg, idx) => seg === targetType ? idx : -1).filter(idx => idx >= 0);
    const selectedIndex = candidateIndices[Math.floor(Math.random() * candidateIndices.length)];
    const segAngle = (2 * Math.PI) / segments.length;
    const finalRotation = 4 * 2 * Math.PI + (Math.PI / 2 - (selectedIndex + 0.5) * segAngle);
    canvas.style.transition = 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)';
    canvas.style.transform = `rotate(${finalRotation}rad)`;
    setTimeout(() => {
      if (targetType === 'Maths') {
        window.location.href = 'math.html';
      } else {
        window.location.href = 'timer.html';
      }
    }, 5200);
  });
})();
