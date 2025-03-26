import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase initialisieren
const database = getDatabase();

// Funktion zum Hochladen der JSON-Daten
async function uploadJSONToFirebase() {
  // JSON-Datei abrufen
  const response = await fetch('dictionary.json'); // Datei muss im Projektverzeichnis sein
  const jsonData = await response.json();

  // Daten in die Firebase-Datenbank schreiben
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

// Event Listener für den "Dictionary"-Link
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
