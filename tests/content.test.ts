import assert from "node:assert/strict";
import test from "node:test";
import { questions, scenarios, vocabulary } from "../app/course-data";

test("question bank is complete and stable", () => {
  assert.equal(questions.length, 55);
  assert.equal(new Set(questions.map((item) => item.id)).size, questions.length);
  assert.equal(new Set(questions.map((item) => item.qDe)).size, questions.length);
  assert.ok(questions.every((item) => item.qDe && item.answerDe && item.qAr));
  assert.ok(questions.some((item) => item.category === "المستوى B2"));
});

test("three-minute introduction has an interview-length answer", () => {
  const introduction = questions.find((item) => item.category.includes("3 دقائق"));
  assert.ok(introduction);
  const wordCount = introduction.answerDe.trim().split(/\s+/u).length;
  assert.ok(wordCount >= 320 && wordCount <= 430, `expected 320-430 words, received ${wordCount}`);
});

test("every vocabulary item has unique word-specific practice", () => {
  assert.equal(vocabulary.length, 167);
  assert.equal(new Set(vocabulary.map((item) => item.id)).size, vocabulary.length);
  assert.equal(new Set(vocabulary.map((item) => item.word.toLocaleLowerCase("de-DE"))).size, vocabulary.length);
  assert.equal(new Set(vocabulary.map((item) => item.exampleDe)).size, vocabulary.length);
  assert.equal(new Set(vocabulary.map((item) => item.situationDe)).size, vocabulary.length);
  for (const item of vocabulary) {
    assert.ok(item.word && item.arabic && item.type && item.category);
    assert.doesNotMatch(item.exampleDe, /[„“]/u, `${item.word} uses quotation marks in its example`);
    assert.doesNotMatch(item.situationDe, /[„“]/u, `${item.word} uses quotation marks in its situation`);
  }
});

test("all original dialogues are available with both roles", () => {
  assert.equal(scenarios.length, 8);
  for (const scenario of scenarios) {
    assert.equal(scenario.lines.length, 4, `${scenario.titleDe} must have four lines`);
    assert.ok(scenario.lines.some((line) => line.speaker === "Kunde"));
    assert.ok(scenario.lines.some((line) => line.speaker === "Mitarbeiter"));
  }
});

test("every vocabulary situation contains two clear speaker turns", () => {
  const speakerPattern = /(Kunde|Mitarbeiter|Interviewer|Bewerber|Prüfer|Teilnehmer):/gu;
  for (const item of vocabulary) {
    assert.equal([...item.situationDe.matchAll(speakerPattern)].length, 2, `${item.word} needs two speaker turns`);
  }
});
