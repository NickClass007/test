document.addEventListener("DOMContentLoaded", function() {
  const toggleSwitch = document.querySelector('#mode-switch');
  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light-mode';  // Fallback auf light-mode, falls nichts gespeichert

  // Setze das gespeicherte Thema beim Laden der Seite
  document.body.classList.add(currentTheme);
  if (currentTheme === 'light-mode') {
    toggleSwitch.checked = false;  // Aktiviert den Switch für Light Mode
  } else {
    toggleSwitch.checked = true;  // Deaktiviert den Switch für Dark Mode
  }

  // Event Listener für den Umschalter (Switch)
  toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light-mode');
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
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
    document.getElementById('queryindex-selection').style.display = 'block'; // Hier war der Fehler: `.syle` sollte `.style` sein
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
