// site.js — shared navbar, footer, helpers, and dark mode

function renderSiteChrome(activePage) {
  const nav = `
    <header class="navbar">
      <div class="navbar-inner">
        <a href="/" class="logo">Net Neutral <span class="accent">News</span></a>
        <div style="display:flex;align-items:center;gap:0.125rem;">
          <nav class="nav-links">
            <a href="/"         class="nav-link ${activePage === 'home'    ? 'active' : ''}">News</a>
            <a href="/compass/" class="nav-link ${activePage === 'compass' ? 'active' : ''}">The Scale</a>
            <a href="/quiz/"    class="nav-link ${activePage === 'quiz'    ? 'active' : ''}">Test Yourself</a>
          </nav>
          <button class="dark-toggle" id="dark-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
            ☀
          </button>
        </div>
      </div>
    </header>`;
  const footer = `
    <footer>Net Neutral News &mdash; educating readers, not influencing them.</footer>`;
  document.getElementById('navbar-slot')?.insertAdjacentHTML('beforeend', nav);
  document.getElementById('footer-slot')?.insertAdjacentHTML('beforeend', footer);
  initDarkMode();
}

// ─── Dark mode ────────────────────────────────────────────────────

function initDarkMode() {
  const btn = document.getElementById('dark-toggle');
  if (!btn) return;

  // Apply saved or system preference
  const saved = localStorage.getItem('nnn_dark');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved !== null ? saved === '1' : true; // dark by default

  if (isDark) enableDark(false);

  btn.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
      disableDark();
    } else {
      enableDark(true);
    }
  });
}

function enableDark(save) {
  document.body.classList.add('dark');
  const btn = document.getElementById('dark-toggle');
  if (btn) btn.textContent = '☾';
  if (save) localStorage.setItem('nnn_dark', '1');
}

function disableDark() {
  document.body.classList.remove('dark');
  const btn = document.getElementById('dark-toggle');
  if (btn) btn.textContent = '☀';
  localStorage.setItem('nnn_dark', '0');
}

// ─── Content loaders ──────────────────────────────────────────────

async function loadJSON(path) {
  const res = await fetch('/content/' + path);
  if (!res.ok) throw new Error('Could not load ' + path + ' (' + res.status + ')');
  return res.json();
}

// ─── Utilities ────────────────────────────────────────────────────

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
