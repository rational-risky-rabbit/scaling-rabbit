// ─────────────────────────────────────────────────────────────────────────
// site.js — shared navbar, footer, and content-loading helpers
// Loaded by every page. Vanilla JS, no dependencies, no build step.
// ─────────────────────────────────────────────────────────────────────────

// Inject navbar + footer into every page
function renderSiteChrome(activePage) {
  const nav = `
    <header class="navbar">
      <div class="navbar-inner">
        <a href="/" class="logo">Net Neutral <span class="accent">News</span></a>
        <nav class="nav-links">
          <a href="/" class="nav-link ${activePage === 'home' ? 'active' : ''}">News</a>
          <a href="/compass/" class="nav-link ${activePage === 'compass' ? 'active' : ''}">The Scale</a>
          <a href="/quiz/" class="nav-link ${activePage === 'quiz' ? 'active' : ''}">Test Yourself</a>
        </nav>
      </div>
    </header>
  `;
  const footer = `
    <footer>Net Neutral News — educating readers, not influencing them.</footer>
  `;
  document.getElementById('navbar-slot')?.insertAdjacentHTML('beforeend', nav);
  document.getElementById('footer-slot')?.insertAdjacentHTML('beforeend', footer);
}

// ─── Content loaders (fetch JSON files from /content/) ────────────────────

async function loadJSON(path) {
  const res = await fetch('/content/' + path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}

// ─── Utilities ────────────────────────────────────────────────────────────

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

// Convert bias value (-3..+3) to percent for plotting
function biasToPercent(value) {
  return ((value + 3) / 6) * 100;
}

function biasLabel(value) {
  if (value <= -2.5) return 'Far Left';
  if (value <= -1.5) return 'Left';
  if (value <= -0.5) return 'Centre-Left';
  if (value <   0.5) return 'Centre';
  if (value <   1.5) return 'Centre-Right';
  if (value <   2.5) return 'Right';
  return 'Far Right';
}
