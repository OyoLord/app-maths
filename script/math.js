/*
 * math.js – Génère des exercices aléatoires de type TAGE MAGE et gère
 * l'affichage de la réponse. Chaque chargement de la page produit un
 * énoncé unique sélectionné parmi plusieurs catégories : proportions,
 * suites, logique, vitesse/temps et taux d'ouvrage. Les réponses sont
 * calculées automatiquement en JavaScript et ne sont pas visibles avant
 * que l'utilisateur clique sur le bouton « Afficher la réponse ».
 */

/**
 * Génère un exercice aléatoire et sa réponse. Les catégories d'exercices
 * sont inspirées du TAGE MAGE :
 * 0 : Proportions
 * 1 : Suite arithmétique
 * 2 : Suite de carrés
 * 3 : Vitesse et temps
 * 4 : Taux d'ouvrage
 *
 * @returns {{question: string, answer: string}}
 */
function generateExercise() {
  const type = Math.floor(Math.random() * 5);
  let question = '';
  let answer = '';
  switch (type) {
    case 0: {
      // Proportions simples
      const pens = Math.floor(Math.random() * 5) + 1; // 1 à 5 stylos
      const cost = (Math.floor(Math.random() * 5) + 1) * 2; // prix total en euros
      const pens2 = pens + (Math.floor(Math.random() * 5) + 3); // plus de stylos
      question = `Si ${pens} stylos coûtent ${cost} euros, combien coûtent ${pens2} stylos ?`;
      const unitPrice = cost / pens;
      answer = `${(unitPrice * pens2).toFixed(2)} euros`;
      break;
    }
    case 1: {
      // Suite arithmétique
      const start = Math.floor(Math.random() * 10) + 1; // premier terme
      const diff = Math.floor(Math.random() * 5) + 1;   // différence
      question = `Quelle est la prochaine valeur de la suite suivante : ${start}, ${start + diff}, ${start + 2 * diff}, ${start + 3 * diff}, … ?`;
      answer = `${start + 4 * diff}`;
      break;
    }
    case 2: {
      // Suite de carrés (logique)
      const n = Math.floor(Math.random() * 5) + 2; // de 2 à 6
      const seq = [];
      for (let i = 1; i <= 4; i++) {
        seq.push(Math.pow(n + i - 1, 2));
      }
      question = `Complétez la suite suivante (carrés de nombres) : ${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, …`;
      answer = `${Math.pow(n + 4, 2)}`;
      break;
    }
    case 3: {
      // Vitesse et temps
      const distance = (Math.floor(Math.random() * 9) + 2) * 10; // 20 à 100 km
      const hours = Math.floor(Math.random() * 4) + 1; // 1 à 4 heures
      question = `Un véhicule parcourt ${distance} km en ${hours} heure${hours > 1 ? 's' : ''}. Quelle est sa vitesse moyenne en km/h ?`;
      answer = `${(distance / hours).toFixed(2)} km/h`;
      break;
    }
    case 4: {
      // Taux d'ouvrage (travail)
      const workers = Math.floor(Math.random() * 5) + 2; // 2 à 6 ouvriers
      const days = Math.floor(Math.random() * 5) + 3;    // 3 à 7 jours
      const targetDays = Math.floor(Math.random() * 5) + 1; // 1 à 5 jours
      question = `${workers} ouvrier${workers > 1 ? 's' : ''} construisent un mur en ${days} jour${days > 1 ? 's' : ''}. Combien d'ouvrier${targetDays > 1 ? 's' : ''} sont nécessaires pour le construire en ${targetDays} jour${targetDays > 1 ? 's' : ''} ?`;
      const totalWork = workers * days;
      answer = `${Math.ceil(totalWork / targetDays)} ouvriers`;
      break;
    }
  }
  return { question, answer };
}

// Insérer l'exercice dans la page
const exerciseEl = document.getElementById('exercise');
const answerEl = document.getElementById('answer');
const showAnswerBtn = document.getElementById('showAnswer');
const backBtn = document.getElementById('backButton');

const { question, answer } = generateExercise();
exerciseEl.textContent = question;
answerEl.textContent = answer;

showAnswerBtn.addEventListener('click', () => {
  answerEl.style.display = 'block';
});

backBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});
