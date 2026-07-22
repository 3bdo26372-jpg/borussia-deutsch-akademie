import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { questions, vocabulary } from "../app/course-data";

const pageSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const lexiconSource = pageSource.match(/const coreLexicon: Record<string, string> = (\{[\s\S]*?\});\r?\n\r?\nconst vocabularyTokenTranslations/u)?.[1];
assert.ok(lexiconSource, "core lexicon could not be read");
const lexicon = Function(`"use strict"; return (${lexiconSource});`)() as Record<string, string>;

const vocabularyTokens = new Map<string, string>();
for (const item of vocabulary) {
  vocabularyTokens.set(item.word.toLocaleLowerCase("de-DE"), item.arabic);
  const tokens = item.word.match(/[\p{L}\p{N}-]+/gu) ?? [];
  const lexical = tokens.map((token) => token.toLocaleLowerCase("de-DE")).filter((token) => !["der", "die", "das", "sich"].includes(token));
  if (lexical.length === 1 && !lexicon[lexical[0]]) vocabularyTokens.set(lexical[0], item.arabic);
}

function hasMeaning(word: string) {
  const normalized = word.replace(/^\[|\]$/g, "").toLocaleLowerCase("de-DE");
  if (lexicon[normalized] || vocabularyTokens.has(normalized)) return true;
  const candidates = [normalized.replace(/(en|ern|eln)$/u, ""), normalized.replace(/(e|er|es|em|n|s|t)$/u, "")];
  if (candidates.some((candidate) => lexicon[candidate] || vocabularyTokens.has(candidate))) return true;
  return [...Object.keys(lexicon), ...vocabularyTokens.keys()].some((key) => key.length >= 5 && normalized.includes(key));
}

test("every learning-content token has an Arabic meaning", () => {
  const texts = [
    ...questions.flatMap((item) => [item.qDe, item.answerDe]),
    ...vocabulary.flatMap((item) => [item.word, item.exampleDe, item.situationDe]),
    "Fragen verstehen. Wörter beherrschen.",
    "Konzentriertes Deutschtraining mit Interviewfragen, flexiblen Musterantworten und interaktivem Wortschatz.",
    "Jedes Lernwort bietet zwei Optionen: Übersetzen oder auf Deutsch anhören.",
    "DEUTSCH BEREIT FÜRS INTERVIEW",
    "DEIN INTERVIEW-TRAINING",
    "Wort antippen: Übersetzen oder mit deutscher Stimme anhören.",
    "Fragen mit Antworten. Interaktive Wörter. Interviewfragen. Wortschatz.",
    "Borussia Deutsch Akademie. Fragen und Wortschatz.",
    "Personalisieren: Ersetze nur Angaben in eckigen Klammern und sprich mit natürlichen Pausen.",
  ];
  const missing = new Set<string>();
  for (const text of texts) {
    for (const token of text.match(/[\p{L}\p{N}\[\]-]+/gu) ?? []) {
      if (!hasMeaning(token)) missing.add(token);
    }
  }
  assert.deepEqual([...missing].sort(), []);
});
