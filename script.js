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

async function init() {
  await loadDatabase();

  const params = new URLSearchParams(window.location.search);
  const refParam = params.get("ref");

  if (refParam) {
    document.getElementById("ref").value = refParam;
    verify(refParam);
  }
}

window.onload = init;
