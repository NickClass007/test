document.addEventListener("DOMContentLoaded", function() {
  const toggleSwitch = document.querySelector('#themeToggle');
  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

  if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'light-mode') {
      toggleSwitch.checked = true;
    } else {
      toggleSwitch.checked = false;
    }
  }

  toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light-mode');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark-mode');
    }
  });
});

document.getElementById('dictionary-link').addEventListener('click', function() {
    document.getElementById('dictionary-section').style.display = 'block';
    history.pushState(null, '', 'index.html');
});

document.getElementById('declination-link').addEventListener('click', function() {
    document.getElementById('declination-section').style.display = 'block';
    history.pushState(null, '', 'declination.html');
});

document.getElementById('queryindex-link').addEventListener('click', function() {
    document.getElementById('queryindex-selection').syle.dispaly = 'block';
    history.pushState(null, '', 'queryindex.html');
});
  
document.getElementById('text-link').addEventListener('click', function() {
    document.getElementById('text-section').style.display = 'block';
    history.pushState(null, '', 'text.html');
});

document.getElementById('settings-link').addEventListener('click', function() {
    document.getElementById('settings-section').style.display = 'block';
    history.pushState(null, '', 'settings.html');
});
