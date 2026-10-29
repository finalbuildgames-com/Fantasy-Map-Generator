# Divinity Online map candidate

Our fork of Azgaar's Fantasy Map Generator (MIT). The `divinity` branch adds the scripts and the candidate map behind
https://mmo.finalbuildgames.com/map-candidate/ (which opens `candidate.map` by default).

- Candidate: seed `1541`, template `continents`, 40,000 cells (density 7), "western" culture set (our addition: English, French, German, Italian, Castilian, Portuguese, Norse, Celtic, Latin bases, real historical place names used once each, state names without the "-ia" suffix), 14 states,
  map name "Divinity", year 1541, era "Age of the Crown" (AC), distance in km at 0.5 km per pixel (about 960 km wide).
  Two continents across an island-strewn strait.
- `candidates-sheet.jpg`: the 18 maps tried first (6 templates x seeds 1541, 7717, 9090, default density).
- `gen.mjs <seed> <template> <out> [json pins]`: generates a map headless (Playwright Chromium) with the pinned
  options and writes `<out>.png` and `<out>.map`.
- `check.mjs`: opens the live page and confirms the candidate loads.

Build and deploy (on foundry):

    npm ci --ignore-scripts && npx vite build --base /map-candidate/ && node scripts/pwa-precache.mjs
    sudo rsync -a --delete dist/ /var/www/map-candidate/ && sudo cp divinity/candidate.map /var/www/map-candidate/

nginx: `location = /map-candidate/` and `location ^~ /map-candidate/` in `/etc/nginx/conf.d/mmo.finalbuildgames.com.conf`.
`rsync --delete` removes `candidate.map`, so copy it again after every deploy.

Sibling forks: finalbuildgames-com/Armoria (heraldry, used for emblems) and finalbuildgames-com/TownGeneratorOS
(Watabou's GPL-3 city generator source).
