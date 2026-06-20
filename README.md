# Histography

A geography-based history quiz. Two map markers appear — one green (birth location) and one red (death location) — and you have three attempts to name the historical figure.

## Live version

Try it out at [https://histography.zeabur.app](https://histography.zeabur.app).

## Features

- Interactive world map with zoom and pan
- Birth and death markers with pulsing rings and year labels
- Fuzzy, diacritics-insensitive name matching (Levenshtein distance)
- Up to 3 guesses per round with visual attempt tracker
- Hint system (3 progressive hints per figure)
- Give up button that reveals the answer
- 21 historical figures included out of the box

## Tech stack

- **Node.js 22+** with the built-in `node:sqlite` module (no native addons)
- **Express** + `express-session` for the API and per-session game state
- **SVG** world map rendered from [Natural Earth 110m](https://www.naturalearthdata.com/) TopoJSON via the [`world-atlas`](https://github.com/topojson/world-atlas) package
- Vanilla JS frontend — no framework, no build step

## Getting started

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

Node.js 22.5 or later is required (for `node:sqlite`).

## Adding figures

Open `db.js` and add entries to the `figures` array. Each figure needs:

| Field                                  | Description                                |
| -------------------------------------- | ------------------------------------------ |
| `name`                                 | Canonical display name                     |
| `acceptable_names`                     | JSON array of accepted spelling variants   |
| `birth_lat`, `birth_lon`, `birth_year` | Birth coordinates and year (negative = BC) |
| `death_lat`, `death_lon`, `death_year` | Death coordinates and year                 |
| `hints`                                | JSON array of exactly 3 hint strings       |

Delete `histography.db` before restarting to reseed the database.

## License

[MIT](LICENSE)
