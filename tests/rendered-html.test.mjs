import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("static export contains Borussia Deutsch Akademie", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /Borussia Deutsch Akademie/i);
  assert.match(html, /data-word="Fragen"/);
  assert.match(html, /data-word="verstehen"/);
  assert.match(html, /data-word="DEIN"/);
  assert.match(html, /data-word="INTERVIEW-TRAINING"/);
  assert.match(html, /Übersetzen/);
  assert.match(html, /anhören/i);
  assert.match(html, /class="flag-line"/);
  assert.match(html, /manifest\.webmanifest/);
  assert.match(html, /rel="canonical"/);
  assert.doesNotMatch(html, /bda-progress|localStorage|Fortschritt/);
  assert.doesNotMatch(html, /INTERVIEW READY/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|SkeletonPreview/);
});

test("static export contains discoverability files", async () => {
  const robots = await readFile(new URL("../out/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8");
  assert.match(robots, /Sitemap: https:\/\/bvb-deutsch-akademie\.vercel\.app\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/bvb-deutsch-akademie\.vercel\.app\//);
});
