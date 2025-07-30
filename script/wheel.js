/*
 * Dessine et anime la roue de fortune. Contient 5 segments "Maths" et 5
 * segments "Timer" mélangés aléatoirement. Joue un son si un fichier audio
 * est configuré, puis redirige l'utilisateur vers la page correspondante.
 */
(function() {
  const canvas = document.getElementById('wheelCanvas');
  const ctx    = canvas.getContext('2d');
  const spinButton = document.getElementById('spinButton');
  const audioEl    = document.getElementById('spinSound');

  // Crée 5 segments « Maths » et 5 « Timer » puis les mélange
  const segments = [];
  for (let i = 0; i < 5; i++) segments.push('Maths');
  for (let i = 0; i < 5; i++) segments.push('Timer');
  segments.sort(() => Math.random() - 0.5);

  // Couleurs sombres pour les segments
  const colors = [
    '#2c3e50', '#34495e', '#1f2d3a', '#2d3a45', '#25303d',
    '#3a5068', '#2a3a4f', '#324a69', '#283f56', '#374e6e'
  ];

  // Dessine la roue avec le texte sur chaque segment
  function drawWheel() {
    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const segAngle = (2 * Math.PI) / segments.length;
    for (let i = 0; i < segments.length; i++) {
      const start = i * segAngle;
      const end   = start + segAngle;
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Texte
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
  }

  drawWheel();

  let isSpinning = false;

  spinButton.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    // Joue le son si un fichier est indiqué dans l’élément <source>
    if (audioEl && audioEl.querySelector('source') && audioEl.querySelector('source').src) {
      audioEl.currentTime = 0;
      audioEl.play().catch(() => { /* lecture bloquée */ });
    }
    // Choisit aléatoirement le type
    const targetType = Math.random() < 0.5 ? 'Maths' : 'Timer';
    const candidateIndices = segments
      .map((seg, idx) => (seg === targetType ? idx : -1))
      .filter(idx => idx >= 0);
    const selectedIndex = candidateIndices[Math.floor(Math.random() * candidateIndices.length)];
    const segAngle = (2 * Math.PI) / segments.length;
    // 4 tours complets + ajustement pour pointer sur le segment choisi
    const finalRotation = 4 * 2 * Math.PI + (Math.PI / 2 - (selectedIndex + 0.5) * segAngle);
    canvas.style.transition = 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)';
    canvas.style.transform  = `rotate(${finalRotation}rad)`;
    setTimeout(() => {
      if (targetType === 'Maths') {
        window.location.href = 'math.html';
      } else {
        window.location.href = 'timer.html';
      }
    }, 5200);
  });
})();
