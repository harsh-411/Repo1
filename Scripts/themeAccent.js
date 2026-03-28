// themeAccent.js
document.addEventListener("DOMContentLoaded", function() {
  // Function to update the theme toggle icon
  function updateToggleIcon() {
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(toggle => {
      toggle.textContent = document.body.classList.contains('light-mode') ? "🌙" : "☀";
    });
  }

  // Theme Toggle Handling
  document.querySelectorAll('.theme-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      document.body.classList.toggle('light-mode');
      updateToggleIcon();
      // Optionally, store the theme in localStorage
      localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
  });

  // Set theme based on user preference or saved setting
  const savedTheme = localStorage.getItem('theme');
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  if (savedTheme) {
    document.body.classList.toggle('light-mode', savedTheme === 'light');
  } else if (!darkModeMediaQuery.matches) {
    document.body.classList.add('light-mode');
  }
  updateToggleIcon();

  // Listen for system theme changes (optional)
  darkModeMediaQuery.addEventListener('change', function(e) {
    if (e.matches) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    updateToggleIcon();
  });

  // Accent Color Selector Handling
  document.getElementById('accent-toggle')?.addEventListener('click', function() {
    const accentOptions = document.getElementById('accent-options');
    accentOptions.style.display = (accentOptions.style.display === "flex") ? "none" : "flex";
  });

  document.querySelectorAll('#accent-options button.accent-option').forEach(btn => {
    btn.addEventListener('click', function() {
      const color = this.getAttribute('data-color');
      document.documentElement.style.setProperty("--accent-color", color);
      document.getElementById('accent-options').style.display = "none";
      // Optionally, store the accent color in localStorage
      localStorage.setItem('accentColor', color);
      updateToggleIcon();
    });
  });

  // Load saved accent color if any
  const savedAccent = localStorage.getItem('accentColor');
  if (savedAccent) {
    document.documentElement.style.setProperty("--accent-color", savedAccent);
  }
});
