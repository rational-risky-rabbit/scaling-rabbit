# Net Neutral News

A media literacy website for Mumbai readers. Three features:

1. **News story comparisons** — each story shows how different outlets covered the same event, with editorial analysis of each outlet's framing choices.
2. **The Scale** — a 2-axis compass plotting Indian news outlets on political lean vs sensationalism. Hover over each dot to read the source description.
3. **Two quizzes** — one that plots your worldview on three independent axes (economic, social, information sensitivity), and one that gives you a reader archetype from a set of eight (Owl to Cyclone).

**Stack:** Plain HTML + CSS + vanilla JavaScript. No build step. No framework. No npm.
**Hosting:** Cloudflare Pages (free) connected to GitHub.
**Cost:** $0/month. Domain renewal only.

---

## Project structure

```
scaling-rabbit/
│
├── index.html              # Homepage — stories grouped by category
├── news/index.html         # Story detail page (?slug=story-slug)
├── compass/index.html      # The Scale — source bias compass
├── quiz/index.html         # Quiz chooser, runner, and result cards
│
├── assets/
│   ├── css/style.css       # All styles, including dark mode tokens
│   └── js/site.js          # Navbar, footer, dark mode, shared helpers
│
└── content/                # 👈 EDIT THESE FILES TO UPDATE THE SITE
    ├── stories/
    │   ├── index.json          # Ordered list of story slugs (newest first)
    │   └── [slug].json         # One file per story
    ├── sources/
    │   └── sources.json        # All news outlets + bias coordinates
    └── quiz/
        ├── compass.json        # 30-question worldview survey (3 axes, Likert)
        └── literacy.json       # 32-question reader archetype quiz (3 axes, Likert)
```

**No `npm install`. No build step. Edit a file, push, live in 30 seconds.**

---

## How to add a new story

1. Create `content/stories/your-story-slug.json` — copy the structure from any existing story file.
2. Add `"your-story-slug"` to the **top** of the array in `content/stories/index.json` (newest first).
3. Commit and push. Cloudflare deploys in ~30 seconds.

### Story file structure

```json
{
  "slug": "your-story-slug",
  "title": "Full headline here",
  "date": "2026-06-07",
  "category": "National",
  "summary": "One or two sentence summary shown on the homepage.",
  "coverages": [
    {
      "source_id": "thehindu",
      "headline": "Exact headline as published",
      "url": "https://verified-real-url.com/article",
      "excerpt": "A direct quote or close paraphrase from the article.",
      "bias_notes": "Your editorial analysis of how this outlet framed the story."
    }
  ]
}
```

**Categories in use:** `National`, `Geopolitical`, `Economy`, `Maharashtra`, `Mumbai`

**Critical rule:** Only use real, verified URLs. Never fabricate a URL. If you cannot find a real URL for a source's coverage, omit that source.

---

## How to add a new news source

Edit `content/sources/sources.json`. Add a new object:

```json
{
  "id": "unique-id",
  "name": "Display Name",
  "bias": {
    "political":   0.0,
    "sensational": 0.0
  },
  "description": "One sentence describing the outlet's editorial lean."
}
```

**Bias scale (both axes):** -3 = far left / very factual, 0 = centre / neutral, +3 = far right / very sensational.

The `id` here must match the `source_id` used in story coverage files.

---

## How the quizzes work

### Survey One — Compass (`content/quiz/compass.json`)
30 Likert statements across 3 axes:
- `econ`: Individual Ownership ↔ State Ownership
- `social`: Libertarian ↔ Authoritarian
- `info`: Factual ↔ Sensational

Each question has:
```json
{ "id": "EC01", "axis": "econ", "direction": 1, "statement": "The statement." }
```
`direction: 1` means agreement pushes toward the `high_label`. `direction: -1` means agreement pushes toward the `low_label`.

Result: 3 axis scores (-3 to +3) shown as bars + a radar chart. Shareable URL encodes scores.

### Survey Two — Reader Archetype (`content/quiz/literacy.json`)
32 Likert statements across 3 axes:
- `verify`: Verifier ↔ Truster
- `emotion`: Cool-headed ↔ Fired-up
- `diet`: Broad reader ↔ Narrow reader

Result: one of 8 archetypes (🦉 Owl → 🌪 Cyclone) determined by which side of each axis the user lands. Result includes emoji, name, tagline, description, and the 3 axis bars. Can be saved as a 1080×1350 image.

---

## Dark mode

The site respects the user's OS dark mode preference on first visit. A ☀/☾ toggle in the navbar saves the preference to `localStorage`. All colours are CSS variable-driven — adding dark mode support to new elements means using `var(--ink)`, `var(--paper)` etc. rather than hardcoded hex values.

---

## Deploying

This repo is connected to Cloudflare Pages. Every push to `main` triggers an automatic rebuild (~30 seconds).

**Build settings:**
- Framework: None
- Build command: *(blank)*
- Output directory: `/`

**To run locally:**
```bash
python3 -m http.server 8000
# open http://localhost:8000
```
You need a local server (not `file://`) because the site fetches JSON files at runtime.

---

## Editorial rules

1. **Only use verified, real URLs.** If you can't find a real article, don't invent one.
2. **Cover the spectrum.** Each story should include sources from different positions on the bias scale — not just the ones you agree with.
3. **Bias notes describe technique, not verdict.** Write what the outlet *did* editorially, not whether they were right or wrong.
4. **Update source ratings over time.** Outlets shift. The scale should reflect current patterns, not historical ones.
5. **Cite real excerpts.** Never invent quotes.

---

## Sources currently in the registry

26 outlets including: Reuters, The Hindu, Indian Express, NDTV, Times of India, Republic World, The Print, The Wire, Hindustan Times, ANI, Business Standard, BusinessToday, Deccan Herald, The Diplomat, Al Jazeera, Bloomberg, CFR, Free Press Journal, NewsOnAir, NewsX, News9Live, Mumbai Live, Outlook India, The Federal, Tribune India, India TV News.