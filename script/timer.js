/*
 * script/timer.js – Affiche "FULL PIÈGE" pendant 3 s, puis un cycle
 * de respiration : Inhale (1–5 s), Hold (1–10 s), Exhale. Le bouton de retour
 * apparaît 3 s après le début de l'expiration.
 */
window.addEventListener('load', () => {
  const trapEl   = document.getElementById('trapMessage');
  const msgEl    = document.getElementById('timerMessage');
  const backBtn  = document.getElementById('backButton');

  setTimeout(() => {
    trapEl.style.display = 'none';
    msgEl.style.display  = 'block';
    runCycle();
  }, 3000);

  function runCycle() {
    const inhale = Math.floor(Math.random() * 5) + 1; // 1–5 s
    document.body.className = 'phase-inhale';
    msgEl.textContent = 'Inhale';
    setTimeout(() => {
      const hold = Math.floor(Math.random() * 10) + 1; // 1–10 s
      document.body.className = 'phase-hold';
      msgEl.textContent = 'Hold';
      setTimeout(() => {
        document.body.className = 'phase-exhale';
        msgEl.textContent = 'Exhale';
        setTimeout(() => {
          backBtn.style.display = 'inline-block';
          backBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
          });
        }, 3000);
      }, hold * 1000);
    }, inhale * 1000);
  }
});
