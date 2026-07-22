import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("static export contains Borussia Deutsch Akademie", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /Borussia Deutsch Akademie/i);
  assert.match(html, /Deutsch sprechen/);
  assert.match(html, /DEIN WEG ZUM ERFOLG/);
  assert.match(html, /hover-translation/);
  assert.doesNotMatch(html, /bda-progress|localStorage|Fortschritt/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|SkeletonPreview/);
});
