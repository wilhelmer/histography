const SVG_W = 960;
const SVG_H = 500;

// Equirectangular projection
function project(lat, lon) {
  const x = (lon + 180) / 360 * SVG_W;
  const y = (90 - lat) / 180 * SVG_H;
  return { x, y };
}

function svgEl(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function renderMap(topo) {
  const g = document.getElementById('countries');

  // Land fill (single merged shape)
  const landPath = featureToPath(topojson.feature(topo, topo.objects.land).geometry);
  g.appendChild(svgEl('path', { d: landPath, class: 'land' }));

  // Country borders as stroked lines, no fill
  const borderPath = meshToPath(topojson.mesh(topo, topo.objects.countries));
  g.appendChild(svgEl('path', { d: borderPath, class: 'borders' }));
}

// Break a coordinate sequence into SVG path commands,
// starting a new sub-path (M) whenever longitude jumps across the antimeridian.
function coordsToCommands(coords, close) {
  const cmds = [];
  let prevLon = null;
  for (let i = 0; i < coords.length; i++) {
    const [lon, lat] = coords[i];
    const { x, y } = project(lat, lon);
    const jump = prevLon !== null && Math.abs(lon - prevLon) > 180;
    cmds.push(`${i === 0 || jump ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`);
    prevLon = lon;
  }
  if (close) cmds.push('Z');
  return cmds.join(' ');
}

function meshToPath(mesh) {
  return mesh.coordinates.map(line => coordsToCommands(line, false)).join(' ');
}

function featureToPath(geometry) {
  if (!geometry) return '';
  const polys = geometry.type === 'Polygon'
    ? [geometry.coordinates]
    : geometry.type === 'MultiPolygon'
    ? geometry.coordinates
    : [];

  return polys.map(poly =>
    poly.map(ring => coordsToCommands(ring, true)).join(' ')
  ).join(' ');
}

// Label radius from marker center (clears the ring + padding)
const LABEL_R = 20;

// Compute label offsets that point away from each other.
// When markers are far apart, both labels go straight down (0, LABEL_R).
// When close, each label is pushed in the direction away from the other marker.
function labelOffsets(b, d) {
  const dx = d.x - b.x;
  const dy = d.y - b.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // If labels at default position (below) would overlap, steer them apart
  if (dist >= LABEL_R * 2) {
    return { birth: { x: 0, y: LABEL_R }, death: { x: 0, y: LABEL_R } };
  }

  // Unit vector from birth → death; labels go in opposite directions
  const nx = dist === 0 ? 1 : dx / dist;
  const ny = dist === 0 ? 0 : dy / dist;
  return {
    birth: { x: -nx * LABEL_R, y: -ny * LABEL_R },
    death: { x:  nx * LABEL_R, y:  ny * LABEL_R }
  };
}

function placeMarker(lat, lon, year, type, labelOffset) {
  const { x, y } = project(lat, lon);
  const g = svgEl('g', { class: `marker-${type}` });

  // Pulsing ring (animated)
  const pulse = svgEl('circle', { class: 'ring pulse-ring', cx: 0, cy: 0, r: 8 });
  // Static ring
  const ring = svgEl('circle', { class: 'ring', cx: 0, cy: 0, r: 8 });
  // Dot
  const dot = svgEl('circle', { class: 'dot', cx: 0, cy: 0, r: 4 });

  const lx = labelOffset ? labelOffset.x : 0;
  const ly = labelOffset ? labelOffset.y : LABEL_R;
  const label = svgEl('text', {
    class: `marker-label label-${type}`,
    x: lx,
    y: ly
  });
  label.textContent = year < 0 ? `${Math.abs(year)} BC` : year;

  g.appendChild(pulse);
  g.appendChild(ring);
  g.appendChild(dot);
  g.appendChild(label);

  document.getElementById('markers').appendChild(g);
  markerEls.push({ el: g, x, y });
  updateMarkerTransforms();
}

// Marker elements that should stay fixed-size across zoom levels: [{el, x, y}]
const markerEls = [];

// ── Game state ──────────────────────────────────────────────────────────────

let maxAttempts = 3;
let attemptsLeft = 3;
let gameOver = false;
let hintCount = 0;

async function loadFigure() {
  const res = await fetch('/api/figure');
  const data = await res.json();

  maxAttempts = data.attemptsLeft + (data.solved || data.failed ? 0 : 0);
  attemptsLeft = data.attemptsLeft;
  gameOver = data.solved || data.failed;

  const b = project(data.birth.lat, data.birth.lon);
  const d = project(data.death.lat, data.death.lon);
  const offsets = labelOffsets(b, d);
  placeMarker(data.birth.lat, data.birth.lon, data.birth.year, 'birth', offsets.birth);
  placeMarker(data.death.lat, data.death.lon, data.death.year, 'death', offsets.death);

  updateDots();

  if (data.solved) showMessage('✓ Already solved! Well done.', 'correct');
  if (data.failed) lockGame();
}

function updateDots() {
  const container = document.getElementById('attempt-dots');
  container.innerHTML = '';
  const label = document.getElementById('attempts-label');
  label.textContent = `Attempts left:`;
  for (let i = 0; i < maxAttempts; i++) {
    const dot = document.createElement('div');
    dot.className = 'attempt-dot' + (i >= attemptsLeft ? ' used' : '');
    container.appendChild(dot);
  }
}

function showMessage(text, type) {
  const el = document.getElementById('message-area');
  el.textContent = text;
  el.className = type || '';
}

function lockGame() {
  document.getElementById('guess-input').disabled = true;
  document.getElementById('submit-btn').disabled = true;
  document.getElementById('hint-btn').disabled = true;
  document.getElementById('giveup-btn').disabled = true;
  document.getElementById('play-again-btn').style.display = 'block';
  gameOver = true;
}

async function giveUp() {
  if (gameOver) return;
  const res = await fetch('/api/giveup', { method: 'POST' });
  const data = await res.json();
  showMessage(`The answer was: ${data.name}.`, 'gameover');
  lockGame();
}

async function submitGuess() {
  if (gameOver) return;
  const input = document.getElementById('guess-input');
  const guess = input.value.trim();
  if (!guess) return;

  const res = await fetch('/api/guess', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guess })
  });
  const data = await res.json();

  attemptsLeft = data.attemptsLeft;
  updateDots();

  if (data.correct) {
    showMessage(`🎉 Correct! It's ${data.name}!`, 'correct');
    document.getElementById('map-container').classList.add('celebrate');
    lockGame();
  } else if (data.failed) {
    showMessage(`Game over. The answer was: ${data.name}.`, 'gameover');
    lockGame();
  } else {
    showMessage(
      attemptsLeft === 1
        ? 'Not quite — last attempt!'
        : 'Not quite — try again.',
      'wrong'
    );
    input.value = '';
    input.focus();
  }
}

async function getHint() {
  if (gameOver) return;
  const res = await fetch('/api/hint');
  const data = await res.json();
  const area = document.getElementById('hint-area');
  area.textContent = `Hint: ${data.hint}`;
  hintCount++;
  if (hintCount >= 3) {
    document.getElementById('hint-btn').disabled = true;
  }
}

async function playAgain() {
  await fetch('/api/reset', { method: 'POST' });
  // Clear state
  document.getElementById('markers').innerHTML = '';
  markerEls.length = 0;
  document.getElementById('message-area').textContent = '';
  document.getElementById('message-area').className = '';
  document.getElementById('hint-area').textContent = '';
  document.getElementById('guess-input').value = '';
  document.getElementById('guess-input').disabled = false;
  document.getElementById('submit-btn').disabled = false;
  document.getElementById('hint-btn').disabled = false;
  document.getElementById('play-again-btn').style.display = 'none';
  document.getElementById('map-container').classList.remove('celebrate');
  gameOver = false;
  hintCount = 0;
  await loadFigure();
}

// ── Boot ─────────────────────────────────────────────────────────────────────

async function init() {
  const [topoRes] = await Promise.all([fetch('/api/world')]);
  const topo = await topoRes.json();
  renderMap(topo);
  await loadFigure();
}

document.getElementById('submit-btn').addEventListener('click', submitGuess);
document.getElementById('hint-btn').addEventListener('click', getHint);
document.getElementById('giveup-btn').addEventListener('click', giveUp);
document.getElementById('play-again-btn').addEventListener('click', playAgain);
document.getElementById('guess-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') submitGuess();
});

// ── Zoom & pan ────────────────────────────────────────────────────────────────

const svg = document.getElementById('world-map');
const mapRoot = document.getElementById('map-root');
const MIN_ZOOM = 1;
const MAX_ZOOM = 12;
const ZOOM_STEP = 1.15;

let zoom = 1, panX = 0, panY = 0;
let dragging = false, dragStart = null;

function updateMarkerTransforms() {
  // Scale markers so they stay the same physical size regardless of zoom or
  // how much the SVG has shrunk to fit a narrow screen.
  const displayW = svg.getBoundingClientRect().width || SVG_W;
  const s = (SVG_W / displayW) / zoom;
  for (const { el, x, y } of markerEls) {
    el.setAttribute('transform', `translate(${x},${y}) scale(${s})`);
  }
}

function applyTransform() {
  mapRoot.setAttribute('transform', `translate(${panX},${panY}) scale(${zoom})`);
  updateMarkerTransforms();
}

// Convert a screen point to SVG viewBox coordinates
function toSVGCoords(screenX, screenY) {
  const rect = svg.getBoundingClientRect();
  return {
    x: (screenX - rect.left) / rect.width  * SVG_W,
    y: (screenY - rect.top)  / rect.height * SVG_H
  };
}

svg.addEventListener('wheel', e => {
  e.preventDefault();
  const delta = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
  const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * delta));
  const ratio = newZoom / zoom;
  const { x, y } = toSVGCoords(e.clientX, e.clientY);
  // Keep the point under the cursor fixed
  panX = x - ratio * (x - panX);
  panY = y - ratio * (y - panY);
  zoom = newZoom;
  applyTransform();
}, { passive: false });

svg.addEventListener('mousedown', e => {
  if (e.button !== 0) return;
  dragging = true;
  dragStart = toSVGCoords(e.clientX, e.clientY);
  svg.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', e => {
  if (!dragging) return;
  const cur = toSVGCoords(e.clientX, e.clientY);
  panX += cur.x - dragStart.x;
  panY += cur.y - dragStart.y;
  dragStart = cur;
  applyTransform();
});

window.addEventListener('mouseup', () => {
  dragging = false;
  svg.style.cursor = 'grab';
});

// Touch support
let lastTouchDist = null;

svg.addEventListener('touchstart', e => {
  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    lastTouchDist = Math.sqrt(dx * dx + dy * dy);
  } else if (e.touches.length === 1) {
    dragStart = toSVGCoords(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: true });

svg.addEventListener('touchmove', e => {
  e.preventDefault();
  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (lastTouchDist) {
      const delta = dist / lastTouchDist;
      const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * delta));
      const ratio = newZoom / zoom;
      const { x, y } = toSVGCoords(mx, my);
      panX = x - ratio * (x - panX);
      panY = y - ratio * (y - panY);
      zoom = newZoom;
      applyTransform();
    }
    lastTouchDist = dist;
  } else if (e.touches.length === 1 && dragStart) {
    const cur = toSVGCoords(e.touches[0].clientX, e.touches[0].clientY);
    panX += cur.x - dragStart.x;
    panY += cur.y - dragStart.y;
    dragStart = cur;
    applyTransform();
  }
}, { passive: false });

svg.addEventListener('touchend', () => { lastTouchDist = null; }, { passive: true });

document.getElementById('zoom-reset').addEventListener('click', () => {
  zoom = 1; panX = 0; panY = 0;
  applyTransform();
});

svg.style.cursor = 'grab';

window.addEventListener('resize', updateMarkerTransforms);

init();
