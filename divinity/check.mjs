import { chromium } from "../node_modules/playwright/index.mjs";
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
const errs=[]; p.on("pageerror", e => errs.push(e.message));
await p.goto("https://mmo.finalbuildgames.com/map-candidate/", { waitUntil: "load" });
await p.waitForFunction(() => window.FMG?.pack?.states?.some(s => s.name === "Westckeria"), null, { timeout: 120000 });
await p.waitForTimeout(4000); await p.screenshot({ path: "live.png" });
console.log("loaded", await p.evaluate(() => FMG.pack.burgs.length - 1), "errors", errs.slice(0,3)); await b.close();
