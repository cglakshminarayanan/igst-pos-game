// ============================================================
// APP.JS — Main game logic
// ============================================================

let state = {
  scenario: null,
  supplier: null,
  recipient: null,
  scoreCorrect: 0,
  scoreWrong: 0,
  streak: 0,
  answered: false,
  selectedOption: null,
  theme: 'light'
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScenarioSearch();
  initLocationSearch('supplier');
  initLocationSearch('recipient');
  initMap(onMapLocationClick);
  initButtons();
});

// ============================================================
// THEME
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('igst-theme') || 'light';
  applyTheme(saved);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.theme;
      if (t === 'weather') { fetchWeatherTheme(); return; }
      applyTheme(t);
    });
  });
}

function applyTheme(theme) {
  document.body.className = theme;
  state.theme = theme;
  localStorage.setItem('igst-theme', theme);
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  const active = document.querySelector(`.theme-btn[data-theme="${theme}"]`);
  if (active) active.classList.add('active');
  else document.querySelector('.theme-btn[data-theme="weather"]')?.classList.add('active');
}

function fetchWeatherTheme() {
  const weatherBar = document.getElementById('weatherBar');
  weatherBar.style.display = 'block';
  document.getElementById('weatherText').textContent = 'Detecting your location for weather…';
  if (!navigator.geolocation) {
    document.getElementById('weatherText').textContent = 'Geolocation not supported.';
    return;
  }
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude: lat, longitude: lon } = pos.coords;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(r => r.json())
      .then(data => {
        const wmo = data.current_weather?.weathercode ?? 0;
        let theme = 'light', desc = 'Clear';
        if (wmo <= 1)                          { theme = 'weather-sunny';  desc = '☀️ Sunny — warm theme activated'; }
        else if (wmo <= 3)                     { theme = 'weather-cloudy'; desc = '⛅ Cloudy — grey theme activated'; }
        else if (wmo <= 67 || (wmo >= 80 && wmo <= 82)) { theme = 'weather-rainy'; desc = '🌧️ Rainy — blue theme activated'; }
        else if (wmo >= 71 && wmo <= 77)       { theme = 'dark';           desc = '❄️ Snow — dark theme activated'; }
        else                                   { theme = 'dark';           desc = '🌩️ Stormy — dark theme activated'; }
        applyTheme(theme);
        document.getElementById('weatherText').textContent = desc;
        document.querySelector('.theme-btn[data-theme="weather"]')?.classList.add('active');
      })
      .catch(() => { weatherBar.style.display = 'none'; applyTheme('light'); });
  }, () => { weatherBar.style.display = 'none'; });
}

// ============================================================
// SCENARIO SEARCH
// ============================================================
function initScenarioSearch() {
  const input    = document.getElementById('scenarioSearch');
  const dropdown = document.getElementById('scenarioDropdown');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { dropdown.classList.add('hidden'); return; }
    const hits = SCENARIOS.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.keywords.some(k => k.toLowerCase().includes(q)) ||
      s.desc.toLowerCase().includes(q) ||
      s.sectionLabel.toLowerCase().includes(q) ||
      s.section.includes(q)
    );
    renderScenarioDropdown(hits, dropdown);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim()) input.dispatchEvent(new Event('input'));
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#step1')) dropdown.classList.add('hidden');
  });
}

function renderScenarioDropdown(results, dropdown) {
  dropdown.innerHTML = '';
  if (!results.length) {
    dropdown.innerHTML = '<div class="dropdown-empty">No scenarios found. Try "goods", "hotel", "transport", "import"…</div>';
    dropdown.classList.remove('hidden');
    return;
  }
  results.forEach(s => {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.innerHTML = `
      <span class="item-title">${s.title}<span class="item-badge">${s.sectionLabel}</span></span>
      <div class="item-desc">${s.desc}</div>`;
    item.addEventListener('click', () => selectScenario(s));
    dropdown.appendChild(item);
  });
  dropdown.classList.remove('hidden');
}

function selectScenario(scenario) {
  state.scenario  = scenario;
  state.supplier  = null;
  state.recipient = null;
  state.answered  = false;

  document.getElementById('scenarioDropdown').classList.add('hidden');
  document.getElementById('scenarioSearch').value = '';

  const selEl = document.getElementById('selectedScenario');
  selEl.innerHTML = `
    <div class="sel-title">✅ ${scenario.title}</div>
    <div class="sel-section">${scenario.sectionLabel} · ${scenario.desc}</div>
    <span class="sel-change" id="changeScenario">Change scenario</span>`;
  selEl.classList.remove('hidden');

  document.getElementById('changeScenario').addEventListener('click', () => {
    selEl.classList.add('hidden');
    resetGame();
  });

  showStep(2);
  setMapClickTarget('supplier');
  clearLocations();
  updateProceedBtn();
}

// ============================================================
// LOCATION SEARCH
// ============================================================
function initLocationSearch(type) {
  const inputId    = type === 'supplier' ? 'supplierSearch'   : 'recipientSearch';
  const dropdownId = type === 'supplier' ? 'supplierDropdown' : 'recipientDropdown';
  const input      = document.getElementById(inputId);
  const dropdown   = document.getElementById(dropdownId);

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { dropdown.classList.add('hidden'); return; }
    const hits = LOCATIONS.filter(l =>
      l.name.toLowerCase().includes(q) ||
      (l.state  && l.state.toLowerCase().includes(q)) ||
      l.country.toLowerCase().includes(q)
    ).slice(0, 12);
    renderLocationDropdown(hits, dropdown, type);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length >= 2) input.dispatchEvent(new Event('input'));
  });

  document.addEventListener('click', e => {
    if (!e.target.closest(`#${inputId}`) && !e.target.closest(`#${dropdownId}`))
      dropdown.classList.add('hidden');
  });
}

function renderLocationDropdown(results, dropdown, type) {
  dropdown.innerHTML = '';
  if (!results.length) {
    dropdown.innerHTML = '<div class="dropdown-empty">No locations found.</div>';
    dropdown.classList.remove('hidden');
    return;
  }
  results.forEach(loc => {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    const typeLabel = loc.isTerritorialWaters ? '🌊 Territorial Waters — Section 9'
      : loc.type === 'city'    ? `🏙️ ${loc.state}, ${loc.country}`
      : loc.type === 'state'   ? `🗺️ State · ${loc.country}`
      : loc.type === 'UT'      ? `🏛️ UT · ${loc.country}`
      : `🌍 Country`;
    item.innerHTML = `
      <span class="item-title">${loc.name}</span>
      <div class="item-desc">${typeLabel}</div>`;
    item.addEventListener('click', () => selectLocation(type, loc));
    dropdown.appendChild(item);
  });
  dropdown.classList.remove('hidden');
}

function selectLocation(type, loc) {
  const dropdownId = type === 'supplier' ? 'supplierDropdown' : 'recipientDropdown';
  const inputId    = type === 'supplier' ? 'supplierSearch'   : 'recipientSearch';
  const selectedId = type === 'supplier' ? 'supplierSelected' : 'recipientSelected';

  document.getElementById(dropdownId).classList.add('hidden');
  document.getElementById(inputId).value = '';

  const desc = loc.isTerritorialWaters ? 'Territorial Waters — Section 9 applies'
    : loc.state ? `${loc.state}, ${loc.country}`
    : `${loc.type} · ${loc.country}`;

  const selEl = document.getElementById(selectedId);
  selEl.innerHTML = `<strong>${loc.name}</strong><small>${desc}</small>`;
  selEl.classList.remove('hidden');

  // Compute SVG coords from lat/lng if not already set by map click
  if (!loc._svgX && loc.lng != null) {
    const [sx, sy] = getProjectedCoords(loc.lng, loc.lat);
    loc._svgX = sx; loc._svgY = sy;
  }

  if (type === 'supplier') {
    state.supplier = loc;
    shadeLocation('supplier', loc);
    if (loc._svgX) placeMarker('supplier', loc._svgX, loc._svgY, loc.name);
    setMapClickTarget('recipient');
  } else {
    state.recipient = loc;
    shadeLocation('recipient', loc);
    if (loc._svgX) placeMarker('recipient', loc._svgX, loc._svgY, loc.name);
    setMapClickTarget('supplier');
  }
  updateProceedBtn();
}

function onMapLocationClick(type, loc) {
  selectLocation(type, loc);
}

function clearLocations() {
  ['supplier', 'recipient'].forEach(t => {
    const inputId    = t === 'supplier' ? 'supplierSearch'   : 'recipientSearch';
    const selectedId = t === 'supplier' ? 'supplierSelected' : 'recipientSelected';
    document.getElementById(inputId).value = '';
    document.getElementById(selectedId).classList.add('hidden');
    removeMarker(t);
    removeShading(t);
  });
  state.supplier  = null;
  state.recipient = null;
}

function updateProceedBtn() {
  document.getElementById('proceedToStep3').disabled = !(state.supplier && state.recipient);
}

// ============================================================
// STEP 3 — QUESTION
// ============================================================
function initButtons() {
  document.getElementById('proceedToStep3').addEventListener('click', showStep3);
  document.getElementById('tryAnotherBtn').addEventListener('click', resetGame);
  document.getElementById('closeWrongPopup').addEventListener('click', () =>
    document.getElementById('wrongPopup').classList.add('hidden'));
  document.getElementById('showAnswerBtn').addEventListener('click', showAnswer);
  document.getElementById('closeCorrectPopup').addEventListener('click', () => {
    document.getElementById('correctPopup').classList.add('hidden');
    resetGame();
  });
}

function showStep3() {
  showStep(3);
  renderQuestion();
}

function renderQuestion() {
  const s        = state.scenario;
  const supplier = state.supplier;
  const recipient= state.recipient;
  const isTW     = supplier?.isTerritorialWaters || recipient?.isTerritorialWaters;

  // Summary
  document.getElementById('scenarioSummary').innerHTML = `
    <div class="sum-label">Scenario</div>
    <div class="sum-row">
      <span class="sum-tag">${s.sectionLabel}</span>${s.questionText}
    </div>
    <div class="sum-row" style="margin-top:10px">
      <span class="sum-tag">Supplier</span>${supplier?.name || '—'}
      &nbsp;&nbsp;
      <span class="sum-tag">Recipient</span>${recipient?.name || '—'}
      ${isTW ? '<br><span style="color:var(--warn);font-size:12px;margin-top:6px;display:block">⚠️ Territorial waters detected — consider Section 9</span>' : ''}
    </div>`;

  // Options
  const opts = buildPOSOptions(s, supplier, recipient);
  const container = document.getElementById('posOptions');
  container.innerHTML = '';
  const icons = ['🅐','🅑','🅒','🅓','🅔'];
  opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'pos-option';
    btn.dataset.optId = opt.id;
    btn.innerHTML = `
      <span class="opt-icon">${icons[i] || '📍'}</span>
      <span class="opt-text">${opt.text}</span>
      <span class="opt-sub">${opt.sub || ''}</span>`;
    btn.addEventListener('click', () => handlePOSSelect(opt, btn, opts));
    container.appendChild(btn);
  });

  document.getElementById('resultArea').classList.add('hidden');
  state.answered = false;
}

function buildPOSOptions(scenario, supplier, recipient) {
  const isTW = supplier?.isTerritorialWaters || recipient?.isTerritorialWaters;

  // If territorial waters scenario or section 9
  if (isTW || scenario.section === '9') {
    return [
      { id: 'tw_correct', correct: true,
        text: 'Nearest coastal State/UT — territorial waters deemed location',
        sub: 'Section 9 — sea location mapped to nearest baseline State/UT' },
      { id: 'tw_supplier', correct: false,
        text: `Location of Supplier — ${supplier?.name || 'at sea'}`,
        sub: 'The sea coordinates themselves' },
      { id: 'tw_recipient', correct: false,
        text: `Location of Recipient — ${recipient?.name || 'unknown'}`,
        sub: 'Recipient\'s state/country' },
      { id: 'tw_port', correct: false,
        text: 'Nearest port of entry / customs point',
        sub: 'Where goods clear customs' },
    ];
  }

  // Use scenario-defined options
  if (scenario.options?.length) return scenario.options;

  // Generic fallback
  return [
    { id: 'supplier', correct: false, text: `Location of Supplier — ${supplier?.name || '?'}`, sub: 'Origin' },
    { id: 'recipient', correct: true,  text: `Location of Recipient — ${recipient?.name || '?'}`, sub: 'Destination' },
    { id: 'perform',  correct: false, text: 'Where service is actually performed', sub: 'Physical location' },
    { id: 'contract', correct: false, text: 'Where the contract is signed', sub: 'Execution location' },
  ];
}

function handlePOSSelect(opt, btnEl, allOpts) {
  if (state.answered) return;
  state.answered     = true;
  state.selectedOption = opt;

  document.querySelectorAll('.pos-option').forEach(b => b.style.pointerEvents = 'none');

  if (opt.correct) {
    btnEl.classList.add('selected-correct');
    state.scoreCorrect++;
    state.streak++;
    updateScore();
    showCorrectPopup();
  } else {
    btnEl.classList.add('selected-wrong');
    state.scoreWrong++;
    state.streak = 0;
    updateScore();
    showWrongPopup(opt);
  }
}

function updateScore() {
  document.getElementById('scoreCorrect').textContent = state.scoreCorrect;
  document.getElementById('scoreWrong').textContent   = state.scoreWrong;
  const streak = state.streak;
  document.getElementById('scoreStreak').textContent  = streak >= 3 ? `${streak} 🔥` : streak;
}

function showCorrectPopup() {
  const s = state.scenario;
  document.getElementById('correctProvision').innerHTML = `
    <div style="font-weight:700;margin-bottom:8px;font-size:15px">✅ ${s.sectionLabel} — ${s.title}</div>
    <div style="font-size:13px;line-height:1.75">${s.provision}</div>`;
  document.getElementById('correctPopup').classList.remove('hidden');
}

function showWrongPopup(opt) {
  document.getElementById('wrongPopupMsg').textContent =
    `You selected "${opt.text.slice(0, 60)}…" — that is not the correct place of supply.`;
  document.getElementById('wrongPopup').classList.remove('hidden');
}

function showAnswer() {
  document.getElementById('wrongPopup').classList.add('hidden');
  const s    = state.scenario;
  const opts = buildPOSOptions(s, state.supplier, state.recipient);

  // Highlight correct option in green
  document.querySelectorAll('.pos-option').forEach(btn => {
    const opt = opts.find(o => o.id === btn.dataset.optId);
    if (opt?.correct) btn.classList.add('reveal-correct');
  });

  const resultArea = document.getElementById('resultArea');
  resultArea.className = 'result-area wrong';
  resultArea.innerHTML = `
    <div class="result-title" style="color:var(--danger)">❌ Incorrect — Here is the Correct Answer</div>
    <div class="result-provision">
      <div style="margin-bottom:8px">
        <span class="result-section-tag">${s.sectionLabel}</span>
        <strong>${s.title}</strong>
      </div>
      <div style="margin-bottom:10px"><strong>Why your answer was wrong:</strong><br>${s.reason_wrong}</div>
      <div><strong>Correct legal provision:</strong><br>${s.provision}</div>
    </div>`;
  resultArea.classList.remove('hidden');
}

// ============================================================
// NAV
// ============================================================
function showStep(n) {
  [1, 2, 3].forEach(i => {
    const el = document.getElementById(`step${i}`);
    if (i <= n) el.classList.remove('hidden');
    else        el.classList.add('hidden');
  });
  if (n === 3) document.getElementById('step2').classList.remove('hidden');
}

function resetGame() {
  document.getElementById('correctPopup').classList.add('hidden');
  document.getElementById('wrongPopup').classList.add('hidden');
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step3').classList.add('hidden');
  document.getElementById('resultArea').classList.add('hidden');
  clearLocations();
  state.scenario = null;
  state.answered = false;
  showStep(1);
}
