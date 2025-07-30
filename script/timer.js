const trap = document.getElementById("trapMessage");
const timerMessage = document.getElementById("timerMessage");
const backButton = document.getElementById("backButton");

// Affiche le piège pendant 3 secondes
setTimeout(() => {
  trap.style.display = "none";
  timerMessage.style.display = "block";
  runBreathingTimer();
}, 3000);

function runBreathingTimer() {
  const phase1 = Math.floor(Math.random() * 10) + 2;
  const phase2 = Math.floor(Math.random() * 12) + 5;

  document.body.className = "phase1";
  timerMessage.textContent = "Inspirez";

  setTimeout(() => {
    document.body.className = "phase2";
    timerMessage.textContent = "Bloquez";

    setTimeout(() => {
      document.body.className = "phase3";
      timerMessage.textContent = "Soufflez";

      backButton.style.display = "block";
      backButton.onclick = () => window.location.href = "index.html";

    }, phase2 * 1000);

  }, phase1 * 1000);
}
