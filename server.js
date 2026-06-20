const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'histography-secret-2024',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Normalize a string: lowercase, strip diacritics, strip non-alpha
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z\s]/g, '')
    .trim();
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function isCorrectGuess(input, acceptableNames) {
  const norm = normalize(input);
  if (!norm) return false;

  for (const accepted of acceptableNames) {
    const normAccepted = normalize(accepted);
    if (norm === normAccepted) return true;
    // Allow up to 2 edits, or 20% of the accepted name length (whichever is larger)
    const threshold = Math.max(2, Math.floor(normAccepted.length * 0.2));
    if (levenshtein(norm, normAccepted) <= threshold) return true;
  }
  return false;
}

// Get current figure clue (no name revealed)
app.get('/api/figure', (req, res) => {
  const figure = db.prepare('SELECT * FROM figures ORDER BY RANDOM() LIMIT 1').get();
  if (!req.session.game || req.session.game.figureId !== figure.id) {
    req.session.game = {
      figureId: figure.id,
      attempts: 0,
      maxAttempts: 3,
      solved: false,
      failed: false,
      hintIndex: 0
    };
  }
  const game = req.session.game;
  res.json({
    birth: { lat: figure.birth_lat, lon: figure.birth_lon, year: figure.birth_year },
    death: { lat: figure.death_lat, lon: figure.death_lon, year: figure.death_year },
    attemptsLeft: game.maxAttempts - game.attempts,
    solved: game.solved,
    failed: game.failed
  });
});

app.post('/api/guess', (req, res) => {
  const { guess } = req.body;
  if (!guess) return res.status(400).json({ error: 'No guess provided' });

  const game = req.session.game;
  if (!game) return res.status(400).json({ error: 'No active game' });
  if (game.solved || game.failed) return res.json({ solved: game.solved, failed: game.failed, attemptsLeft: 0 });

  const figure = db.prepare('SELECT * FROM figures WHERE id = ?').get(game.figureId);
  const acceptableNames = JSON.parse(figure.acceptable_names);

  if (isCorrectGuess(guess, acceptableNames)) {
    game.solved = true;
    req.session.game = game;
    return res.json({ correct: true, solved: true, name: figure.name, attemptsLeft: game.maxAttempts - game.attempts });
  }

  game.attempts++;
  const attemptsLeft = game.maxAttempts - game.attempts;

  if (attemptsLeft <= 0) {
    game.failed = true;
    req.session.game = game;
    return res.json({ correct: false, solved: false, failed: true, name: figure.name, attemptsLeft: 0 });
  }

  req.session.game = game;
  res.json({ correct: false, solved: false, failed: false, attemptsLeft });
});

app.get('/api/hint', (req, res) => {
  const game = req.session.game;
  if (!game) return res.status(400).json({ error: 'No active game' });

  const figure = db.prepare('SELECT * FROM figures WHERE id = ?').get(game.figureId);
  const hints = JSON.parse(figure.hints);
  const hint = hints[game.hintIndex % hints.length];
  game.hintIndex++;
  req.session.game = game;
  res.json({ hint });
});

app.post('/api/reset', (req, res) => {
  req.session.game = null;
  res.json({ ok: true });
});

// Serve world TopoJSON from world-atlas package
app.get('/api/world', (req, res) => {
  const topoPath = path.join(require.resolve('world-atlas/countries-110m.json'));
  res.sendFile(topoPath);
});

app.listen(PORT, () => {
  console.log(`Histography running at http://localhost:${PORT}`);
});
