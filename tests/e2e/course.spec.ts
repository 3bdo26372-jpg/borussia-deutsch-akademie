import { expect, test } from "@playwright/test";

test("question navigation is shareable and survives refresh", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Fragen öffnen/ }).click();
  await expect(page).toHaveURL(/#questions$/);
  await expect(page.getByRole("heading", { name: "Interviewfragen", exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Interviewfragen", exact: true })).toBeVisible();
  await page.goBack();
  await expect(page).not.toHaveURL(/#questions$/);
  await expect(page.getByRole("heading", { name: /Fragen verstehen/ })).toBeVisible();
});

test("one word assistant translates one word and never stacks", async ({ page }) => {
  await page.goto("/#questions");
  const words = page.locator(".question-card h2 .touch-word");
  await words.nth(0).click();
  await expect(page.locator(".word-assistant")).toHaveCount(1);
  await words.nth(1).click();
  await expect(page.locator(".word-assistant")).toHaveCount(1);
  await page.getByRole("button", { name: "Übersetzen", exact: true }).click();
  await expect(page.locator(".word-translation")).toBeVisible();
  await expect(page.locator(".word-translation")).not.toHaveText("المعنى غير متاح");
  await page.locator(".topbar").click({ position: { x: 5, y: 5 } });
  await expect(page.locator(".word-assistant")).toHaveCount(0);
});

test("filters have useful accessible names", async ({ page }) => {
  await page.goto("/#questions");
  await expect(page.getByLabel("Interviewfragen durchsuchen")).toBeVisible();
  await expect(page.getByLabel("Fragenkategorie")).toBeVisible();
  await expect(page.getByLabel("Sprachniveau")).toBeVisible();
  await page.getByLabel("Interviewfragen durchsuchen").fill("Loyalität");
  await expect(page.locator(".question-card")).toHaveCount(1);
  await page.getByLabel("Interviewfragen durchsuchen").fill("");
  await page.getByLabel("Fragenkategorie").selectOption({ label: "B2-Niveau" });
  await expect(page.locator(".question-card").first()).toBeVisible();
  await expect(page.locator(".questions-list")).not.toContainText("Kursthema");
});

test("Arabic stays hidden until translation is requested", async ({ page }) => {
  for (const section of ["home", "questions", "vocabulary", "situations"]) {
    await page.goto(`/#${section}`);
    const visibleText = await page.locator("body").innerText();
    expect(visibleText).not.toMatch(/[\u0600-\u06ff]/u);
    await expect(page.locator('[data-translation-status="missing"]')).toHaveCount(0);
  }
});

test("dialogues keep both roles interactive and shareable", async ({ page }) => {
  await page.goto("/#situations");
  await expect(page.getByRole("heading", { name: "Dialoge und Rollenspiele", exact: true })).toBeVisible();
  await expect(page.locator(".scenario-card")).toHaveCount(8);
  await expect(page.locator(".scenario-card.open .dialogue > div")).toHaveCount(4);
  await page.locator(".scenario-card.open .dialogue .touch-word").nth(1).click();
  await page.getByRole("button", { name: "Übersetzen", exact: true }).click();
  await expect(page.locator(".word-translation")).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Dialoge und Rollenspiele", exact: true })).toBeVisible();
});

test("light design can be selected and is remembered", async ({ page }) => {
  await page.goto("/#home");
  await page.getByRole("button", { name: "Helles Design aktivieren" }).click();
  await expect(page.locator(".app-shell")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("button", { name: "Dunkles Design aktivieren" })).toBeVisible();
  await expect(page.locator(".app-shell")).toHaveCSS("background-color", "rgb(244, 241, 232)");
  await page.reload();
  await expect(page.locator(".app-shell")).toHaveAttribute("data-theme", "light");
});

test("word details are an accessible modal", async ({ page }) => {
  await page.goto("/#vocabulary");
  await page.getByRole("button", { name: /Details öffnen/ }).first().click();
  const dialog = page.getByRole("dialog", { name: /die Bestellung/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".situation-turn")).toHaveCount(2);
  await expect(dialog.getByRole("button", { name: "Gespräch komplett anhören" })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Schließen ✓" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Wortdetails schließen" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("mobile layout keeps the primary navigation usable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/#home");
  const bottomNav = page.getByRole("navigation", { name: "Schnellnavigation" });
  await expect(bottomNav).toBeVisible();
  await bottomNav.getByRole("button", { name: /Wortschatz/ }).click();
  await expect(page).toHaveURL(/#vocabulary$/);
  await expect(page.getByLabel("Wortschatz durchsuchen")).toBeVisible();
});
