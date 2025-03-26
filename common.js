import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase initialisieren
const database = getDatabase();

// Funktion zum Hochladen der JSON-Daten
async function uploadJSONToFirebase() {
  const response = await fetch('dictionary.json'); // Datei muss im Projektverzeichnis sein
  const jsonData = await response.json();

  set(ref(database, "/"), jsonData)
    .then(() => {
      console.log("Daten erfolgreich hochgeladen!");
    })
    .catch((error) => {
      console.error("Fehler beim Hochladen der JSON-Daten:", error);
    });
}

// Upload ausführen
uploadJSONToFirebase();

// Funktion: Wörter aus der Realtime Database abrufen
function fetchWordsFromDatabase() {
  const wordList = document.getElementById("word-list"); // Element, wo die Wörter angezeigt werden
  const dictionaryRef = ref(database, "dictionary");

  // Daten abrufen und anzeigen
  onValue(dictionaryRef, (snapshot) => {
    wordList.innerHTML = ""; // Liste vorher leeren
    snapshot.forEach((childSnapshot) => {
      const wordData = childSnapshot.val();
      const wordItem = document.createElement("div");
      wordItem.textContent = `${wordData.word}: ${wordData.definition}`;
      wordList.appendChild(wordItem);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.querySelector('#mode-switch');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.body.classList.add(currentTheme);
    toggleSwitch.checked = currentTheme === 'light-mode';
  } else {
    document.body.classList.add('dark-mode');
  }

  toggleSwitch.addEventListener('change', function () {
    if (this.checked) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light-mode');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    }
  });

  document.getElementById('dictionary-link').addEventListener('click', function () {
    document.getElementById('dictionary-section').style.display = 'block';
    fetchWordsFromDatabase(); // Abrufen der Wörter beim Anzeigen des Wörterbuchs
    history.pushState(null, '', 'index.html');
  });

  document.getElementById('declination-link').addEventListener('click', function () {
    document.getElementById('declination-section').style.display = 'block';
    history.pushState(null, '', 'declination.html');
  });

  document.getElementById('queryindex-link').addEventListener('click', function () {
    document.getElementById('queryindex-selection').style.display = 'block';
    history.pushState(null, '', 'queryindex.html');
  });

  document.getElementById('text-link').addEventListener('click', function () {
    document.getElementById('text-section').style.display = 'block';
    history.pushState(null, '', 'text.html');
  });

  document.getElementById('settings-link').addEventListener('click', function () {
    document.getElementById('settings-section').style.display = 'block';
    history.pushState(null, '', 'settings.html');
  });
});
