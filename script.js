const database = {};

async function loadDatabase() {
  try {
    const res = await fetch("gop-data.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load GOP database (${res.status})`);
    const data = await res.json();
    Object.assign(database, data);
  } catch (error) {
    console.warn("Could not load gop-data.json, falling back to hardcoded database.", error);
    Object.assign(database, {
      "GOP/2026/99991/1": { name: "ALI MOHAMMAD", doc: "GOP Permit", issued: "17 March 2026" },
      "GOP/2026/5001/1": { name: "MORAL SOJAN", doc: "GOP Permit", issued: "17 March 2026" },
      "GOP/2026/20779": { name: "ALI ASGAR", doc: "GOP Permit", issued: "17 March 2026" }
    });
  }
}

function setResult(html) {
  const result = document.getElementById("result");
  result.innerHTML = html;
}

function verify(refValue = null) {
  const input = (refValue || document.getElementById("ref").value).trim();

  if (!input) {
    setResult(`<div class="result invalid">⚠️ Please enter a reference number.</div>`);
    return;
  }

  if (database[input]) {
    const d = database[input];
    setResult(`
      <div class="result valid">
        ✔️ VALID DOCUMENT <br><br>
        <strong>Name:</strong> ${d.name}<br>
        <strong>Document:</strong> ${d.doc}<br>
        <strong>Issued:</strong> ${d.issued}
      </div>
    `);
  } else {
    setResult(`
      <div class="result invalid">
        ❌ DOCUMENT NOT FOUND
      </div>
    `);
  }
}

// Modal functions removed - verification now inline

// Close modal when clicking outside - removed

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(0, 51, 102, 0.98)';
  } else {
    header.style.background = 'rgba(0, 51, 102, 0.95)';
  }
});

// Load hero background configuration
async function loadHeroBackground() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let imageUrl = null;
  try {
    const res = await fetch('photo-config.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`photo-config.json load failed (${res.status})`);
    const config = await res.json();
    imageUrl = config.heroBackground;
  } catch (e) {
    console.warn('Could not load photo config or parse JSON. Using fallback background.', e);
  }

  if (imageUrl) {
    hero.style.backgroundImage = `url('${imageUrl}')`;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
    hero.style.backgroundRepeat = 'no-repeat';
  }
}

// Initialize
async function init() {
  await loadDatabase();
  await loadHeroBackground();

  const params = new URLSearchParams(window.location.search);
  const refParam = params.get("ref");

  if (refParam) {
    document.getElementById("ref").value = refParam;
    verify(refParam);
  }
}

window.addEventListener('load', init);
