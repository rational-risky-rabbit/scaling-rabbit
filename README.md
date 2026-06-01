# Net Neutral News

A media literacy website. Two main features:

1. **News story comparisons** — see how different outlets cover the same event, plus an editorial breakdown of each outlet's framing.
2. **Two quizzes** — one that plots you on a political/factual scale (sharable as a URL), and one that tests your ability to spot bias in headlines.

**Stack:** plain HTML + CSS + vanilla JavaScript. No build step. No framework. No npm.
**Hosting:** Cloudflare Pages (free) connected to GitHub.
**Cost:** $0/month. You only pay for your domain.

---

## Project structure

```
scaling-rabbit/
├── index.html              # Homepage (list of stories)
├── news/index.html         # Story detail page  (?slug=...)
├── compass/index.html      # The Scale (sources plot + user dot if ?x=&y=)
├── quiz/index.html         # Quiz chooser & runner (?type=compass | literacy)
│
├── assets/
│   ├── css/style.css       # All styles
│   └── js/site.js          # Shared helpers (navbar, fetch, formatters)
│
├── content/                # 👈 EDIT THESE FILES TO UPDATE THE SITE
│   ├── stories/
│   │   ├── index.json      # List of story slugs
│   │   └── *.json          # One JSON file per story
│   ├── sources/
│   │   └── sources.json    # News outlets and their bias ratings
│   └── quiz/
│       ├── compass.json    # Placeholder political/factual quiz
│       └── literacy.json   # Placeholder media-literacy quiz
│
└── README.md
```

That's it. Open `index.html` directly in a browser, or serve the folder with any
static file server. **No `npm install`. No build step. Nothing to compile.**

---

## Running locally

You need a local web server because the browser blocks `fetch` of JSON files
from `file://` URLs. Easiest options:

```bash
# Python (already installed on most systems)
python3 -m http.server 8000
# then open http://localhost:8000

# Or Node's http-server (if you have node)
npx http-server -p 8000

# Or VS Code's "Live Server" extension — just click "Go Live"
```

---

## How to update content

### Add a new story

1. Create `content/stories/your-story-slug.json` following the template in `example-story.json`.
2. Add `"your-story-slug"` to the array in `content/stories/index.json`.
3. Commit and push. Cloudflare rebuilds and your story is live in ~30 seconds.

### Add a new news source

Edit `content/sources/sources.json`. Add a new object:

```json
{
  "id": "your-id",
  "name": "Display Name",
  "bias": {
    "political":   -1.5,
    "sensational":  1.0
  },
  "description": "Short one-line description."
}
```

Bias values run from **-3 to +3**:
- `political`: -3 = far-left, 0 = centre, +3 = far-right
- `sensational`: -3 = dry/factual, 0 = neutral, +3 = clickbait/emotive

### Update the quizzes

- **Compass quiz** (plots the user): `content/quiz/compass.json`. Each option carries a `weight` for both axes.
- **Literacy quiz** (right-answer scoring): `content/quiz/literacy.json`. Each question has a `correct` index and an `explanation`.

Both files currently contain **placeholders** — replace them with your real questions whenever you're ready. The scoring engine works automatically with any number of questions.

---

## How the quiz scoring works

### Compass quiz
Each answer carries a weight on two axes:

```json
{
  "text": "Free markets and individual responsibility",
  "weight": { "political": 2, "sensational": 0 }
}
```

The site adds up all weights and normalizes the final result to a `-3 to +3` range on each axis. The user is then plotted on the compass and given a shareable URL like:

```
https://yourdomain.com/compass/?x=1.2&y=-0.5
```

When someone opens that link, their position appears as an accent-coloured dot on the compass.

### Literacy quiz
One correct answer per question. Final score is a percentage with a verdict (Easy Target → Growing Awareness → Sharp Filter). Each question shows an explanation after answering.

---

## Deploying to Cloudflare Pages (free)

This repo is already at https://github.com/rational-risky-rabbit/scaling-rabbit

### One-time setup

1. Sign up free at https://dash.cloudflare.com (no credit card needed)
2. Go to **Workers & Pages → Create → Pages → Connect to Git**
3. Authorise GitHub, select **`scaling-rabbit`**
4. Build settings:
   - **Framework preset:** *None*
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/` *(or leave blank)*
5. Click **Save and Deploy**

In ~30 seconds you have a live URL like `scaling-rabbit.pages.dev`.

### Connect your GoDaddy domain

#### In Cloudflare Pages:
1. Open your project → **Custom domains → Set up a custom domain**
2. Enter your domain
3. Cloudflare will give you DNS instructions

#### In GoDaddy (easiest method):
Change your nameservers to the two that Cloudflare provides. Cloudflare then manages DNS automatically and your custom domain just works.

#### Alternative (keep GoDaddy DNS):
Add a `CNAME` record pointing `@` and `www` to `scaling-rabbit.pages.dev`.

DNS propagation usually takes 15 minutes to a few hours.

### Auto-deploy workflow

```bash
# Make changes locally
git add .
git commit -m "Add new story about [X]"
git push

# Cloudflare detects the push, rebuilds, deploys in ~30 seconds.
# Done.
```

---

## Editorial guidelines (suggestion)

To stay true to the project's mission of being non-partisan:

1. **Pick stories that genuinely have multiple framings**, not stories with one factual answer.
2. **Cover left, right, and centre outlets in every story** — show the full spectrum.
3. **Bias notes should focus on technique** (e.g. "uses emotive verb 'crushes'"), not on whether you agree with the outlet.
4. **Update source ratings over time** — outlets shift, and your scale should reflect that.
5. **Cite real excerpts.** Never invent quotes.

---

## Future ideas

- RSS feed (a single JSON-to-XML script before deploy)
- Newsletter signup (Buttondown free tier)
- Reader-submitted story suggestions (Formspree free tier)
- Search bar (Fuse.js, ~20 lines of JS)
