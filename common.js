import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyCXihHnRqn5fcLShJ2ByKhNnfs2z8bjlvg",
  authDomain: "navis-salutaris-7b577.firebaseapp.com",
  projectId: "navis-salutaris-7b577",
  storageBucket: "navis-salutaris-7b577.firebasestorage.app",
  messagingSenderId: "321996551929",
  appId: "1:321996551929:web:a630f1249ebc93f6f75428"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", function() {
  const toggleSwitch = document.querySelector('#mode-switch');
  const currentTheme = localStorage.getItem('theme'); // Kein Need für ternäre Bedingung hier

  // Wenn es bereits ein Theme im localStorage gibt, wende es an
  if (currentTheme) {
    document.body.classList.add(currentTheme);
    toggleSwitch.checked = currentTheme === 'light-mode'; // Optimierung: prüft, ob es 'light-mode' ist
  } else {
    // Wenn kein Theme gespeichert ist, verwende den Standard (Dark Mode)
    document.body.classList.add('dark-mode');
  }

  // Event-Listener für das Umschalten des Modus
  toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
      // Wechsel zu Light Mode
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light-mode');
    } else {
      // Wechsel zu Dark Mode
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    }
  });
});

// Wörterbuch-Sektion anzeigen
document.getElementById('dictionary-link').addEventListener('click', function() {
  document.getElementById('dictionary-section').style.display = 'block';
  history.pushState(null, '', 'index.html');
});

// Event Listener für den "Declination"-Link
document.getElementById('declination-link').addEventListener('click', function() {
  document.getElementById('declination-section').style.display = 'block';
  history.pushState(null, '', 'declination.html');
});

// Event Listener für den "Query Index"-Link
document.getElementById('queryindex-link').addEventListener('click', function() {
  document.getElementById('queryindex-selection').style.display = 'block';
  history.pushState(null, '', 'queryindex.html');
});

// Event Listener für den "Text"-Link
document.getElementById('text-link').addEventListener('click', function() {
  document.getElementById('text-section').style.display = 'block';
  history.pushState(null, '', 'text.html');
});

// Event Listener für den "Settings"-Link
document.getElementById('settings-link').addEventListener('click', function() {
  document.getElementById('settings-section').style.display = 'block';
  history.pushState(null, '', 'settings.html');
});

// *** Firebase: Wörter in die Datenbank schreiben ***
const dictionaryForm = document.getElementById("dictionary-form");
const wordList = document.getElementById("word-list");

if (dictionaryForm) {
  dictionaryForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const word = document.getElementById("word").value.trim();
    const definition = document.getElementById("definition").value.trim();

    if (word && definition) {
      const wordRef = ref(database, "dictionary");
      const newWordRef = push(wordRef); // Neue Referenz für den Eintrag
      set(newWordRef, {
        word: word,
        definition: definition
      })
      .then(() => {
        alert("Wort erfolgreich hinzugefügt!");
        document.getElementById("word").value = ""; // Formular zurücksetzen
        document.getElementById("definition").value = "";
      })
      .catch((error) => {
        console.error("Fehler beim Speichern des Wortes: ", error);
      });
    }
  });

  // *** Firebase: Wörter aus der Datenbank anzeigen ***
  const wordRef = ref(database, "dictionary");
  onValue(wordRef, (snapshot) => {
    wordList.innerHTML = ""; // Liste zurücksetzen
    snapshot.forEach((childSnapshot) => {
      const wordData = childSnapshot.val();
      const wordItem = document.createElement("div");
      wordItem.textContent = `${wordData.word}: ${wordData.definition}`;
      wordList.appendChild(wordItem);
    });
  });
}
