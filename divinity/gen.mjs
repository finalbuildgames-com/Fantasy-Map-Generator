import { chromium } from "../node_modules/playwright/index.mjs";
import fs from "node:fs";
const [,, seed, template, out, extra] = process.argv;
const pins = { template, culturesSet: "european", statesNumber: 14, cultures: 10, religionsNumber: 7,
  mapName: "Divinity", year: 1541, era: "Age of the Crown", eraShort: "AC", ...(extra ? JSON.parse(extra) : {}) };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.addInitScript(p => { if (!sessionStorage.getItem("pinned")) { localStorage.setItem("fmg-locks", JSON.stringify(p)); sessionStorage.setItem("pinned","1"); localStorage.setItem("version","1.156.0"); } }, pins);
page.on("pageerror", e => console.error("pageerror", e.message));
const t0 = Date.now();
await page.goto(`https://mmo.finalbuildgames.com/map-candidate/?seed=${seed}&width=1920&height=1080`, { waitUntil: "load" });
await page.waitForFunction(() => window.FMG?.pack?.burgs?.length > 5 && window.FMG?.pack?.states?.length > 2, null, { timeout: 180000 });
await page.waitForTimeout(6000);
const info = await page.evaluate(() => { const P = FMG.pack; return { template: FMG.options?.generation?.template, burgs: P.burgs.length-1, states: P.states.length-1,
  cultures: P.cultures.map(c=>c.name).slice(1), statesN: P.states.slice(1).map(s=>s.fullName||s.name), burgN: P.burgs.slice(1).filter((_,i)=>i%35==0).map(b=>b.name), land: P.cells.h.filter(h=>h>=20).length, cells: P.cells.h.length }; });
await page.screenshot({ path: out + ".png" });
fs.writeFileSync(out + ".map", await page.evaluate(() => FMG.Services.Save.prepareMapData()));
console.log(JSON.stringify({ seed, ...info, secs: (Date.now()-t0)/1000 }));
await browser.close();
