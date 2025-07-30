/*
 * wheel.js – Gestion et dessin de la roue de la chance. Ce script dessine une
 * roue composée de 10 segments (5 segments « Maths » et 5 segments « Timer »)
 * disposés au hasard. Lorsque l'utilisateur clique sur le bouton "Tourner
 * la roue", une animation fait tourner la roue et un segment est sélectionné
 * de manière à obtenir une probabilité équivalente (50/50) entre les deux
 * types. À la fin de la rotation, l'utilisateur est redirigé vers la page
 * correspondante.
 */

(function() {
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const spinButton = document.getElementById('spinButton');

  // Création des segments : 5 « Maths » et 5 « Timer » mélangés.
  const segments = [];
  for (let i = 0; i < 5; i++) segments.push('Maths');
  for (let i = 0; i < 5; i++) segments.push('Timer');
  // Mélange pour que la disposition visuelle soit différente à chaque chargement.
  segments.sort(() => Math.random() - 0.5);

  // Palette de couleurs pour les segments. Les couleurs sont variées pour
  // distinguer visuellement chaque partie de la roue.
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#C9CBCF', '#8DD36F', '#FF6384', '#36A2EB'
  ];

  /**
   * Dessine la roue sur le canvas. Les textes sont positionnés au milieu de
   * chaque segment. La fonction accepte un paramètre optionnel de rotation,
   * mais l'animation est gérée via CSS afin de simplifier le code.
   *
   * @param {number} rotation Angle de rotation en radians (non utilisé dans
   * ce dessin initial, car la rotation est appliquée via CSS).
   */
  function drawWheel(rotation = 0) {
    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const segAngle = (2 * Math.PI) / segments.length;
    for (let i = 0; i < segments.length; i++) {
      const start = i * segAngle + rotation;
      const end = start + segAngle;
      // Dessin du segment
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Dessin du texte
      ctx.save();
      ctx.translate(radius, radius);
      const textAngle = start + segAngle / 2;
      ctx.rotate(textAngle);
      ctx.fillStyle = '#000000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(segments[i], radius - 10, 0);
      ctx.restore();
    }
    // Dessin du pointeur en haut de la roue
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.moveTo(radius, 5);
    ctx.lineTo(radius - 10, 25);
    ctx.lineTo(radius + 10, 25);
    ctx.closePath();
    ctx.fill();
  }

  // Dessiner la roue initiale
  drawWheel();

  let isSpinning = false;

  spinButton.addEventListener('click', function() {
    if (isSpinning) return;
    isSpinning = true;
    // Sélectionner aléatoirement le type (math ou timer) avec probabilité 50/50
    const targetType = Math.random() < 0.5 ? 'Maths' : 'Timer';
    // Filtrer les indices correspondant au type sélectionné
    const candidates = [];
    for (let i = 0; i < segments.length; i++) {
      if (segments[i] === targetType) {
        candidates.push(i);
      }
    }
    // Choisir au hasard un segment correspondant parmi les candidats
    const selectedIndex = candidates[Math.floor(Math.random() * candidates.length)];
    // Calcul de l'angle pour placer le segment sélectionné sous le pointeur
    const segAngle = (2 * Math.PI) / segments.length;
    // Trois tours complets pour l'animation + alignement du segment
    const finalRotation = 3 * 2 * Math.PI + (Math.PI / 2 - (selectedIndex + 0.5) * segAngle);
    // Appliquer la rotation via CSS pour une animation fluide
    canvas.style.transition = 'transform 4s ease-out';
    canvas.style.transform = `rotate(${finalRotation}rad)`;
    // Rediriger vers la page correspondante après l'animation
    setTimeout(() => {
      if (targetType === 'Maths') {
        window.location.href = 'math.html';
      } else {
        window.location.href = 'timer.html';
      }
    }, 4200);
  });
})();
