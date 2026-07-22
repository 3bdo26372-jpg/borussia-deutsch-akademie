# Borussia Deutsch Akademie

A static German interview trainer focused on interview questions and practical vocabulary.

## Included

- 55 interview questions with adaptable model answers
- a three-minute self-introduction that only needs the learner's name
- 160+ interactive vocabulary entries with Arabic meanings and German examples
- tap or click any German learning word to translate that one word or hear it pronounced
- keyboard word navigation with one shared, non-stacking word assistant
- explicit German text-to-speech voice selection
- shareable `#questions` and `#vocabulary` links with browser Back/Refresh support
- German-only interface; Arabic appears only after requesting a translation
- responsive mobile-first interface
- accessibility labels, focus trapping and reduced-motion support
- security headers, sitemap, robots and social sharing metadata
- 100% static frontend: no API, server functions, database, accounts, or progress tracking

## Run locally

```bash
npm install
npm run dev
```

Build and validate:

```bash
npm run build
npm test
npm run test:e2e
```

Run every quality check with `npm run test:all`.

The app exports to the static `out/` directory and can be hosted on any static host.
