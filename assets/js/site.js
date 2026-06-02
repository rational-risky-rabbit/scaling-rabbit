// site.js — shared navbar, footer, and helpers

function renderSiteChrome(activePage) {
  const nav = `
    <header class="navbar">
      <div class="navbar-inner">
        <a href="/" class="logo">Net Neutral <span class="accent">News</span></a>
        <nav class="nav-links">
          <a href="/"         class="nav-link ${activePage === 'home'    ? 'active' : ''}">News</a>
          <a href="/compass/" class="nav-link ${activePage === 'compass' ? 'active' : ''}">The Scale</a>
          <a href="/quiz/"    class="nav-link ${activePage === 'quiz'    ? 'active' : ''}">Test Yourself</a>
        </nav>
      </div>
    </header>`;
  const footer = `
    <footer>Net Neutral News &mdash; educating readers, not influencing them.</footer>`;
  document.getElementById('navbar-slot')?.insertAdjacentHTML('beforeend', nav);
  document.getElementById('footer-slot')?.insertAdjacentHTML('beforeend', footer);
}

async function loadJSON(path) {
  const res = await fetch('/content/' + path);
  if (!res.ok) throw new Error('Could not load ' + path + ' (' + res.status + ')');
  return res.json();
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[c]);
}

function biasToPercent(v) { return ((v + 3) / 6) * 100; }

function biasLabel(v) {
  if (v <= -2.5) return 'Far Left';
  if (v <= -1.5) return 'Left';
  if (v <= -0.5) return 'Centre-Left';
  if (v <   0.5) return 'Centre';
  if (v <   1.5) return 'Centre-Right';
  if (v <   2.5) return 'Right';
  return 'Far Right';
}
