import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("static export contains Borussia Deutsch Akademie", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /Borussia Deutsch Akademie/i);
  assert.match(html, /Fragen verstehen/);
  assert.match(html, /DEIN INTERVIEW-TRAINING/);
  assert.match(html, /Übersetzen/);
  assert.match(html, /anhören/i);
  assert.match(html, /Fragen und Wortschatz/);
  assert.doesNotMatch(html, /bda-progress|localStorage|Fortschritt/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|SkeletonPreview/);
});
