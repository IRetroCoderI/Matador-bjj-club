# Matador Jiu-Jitsu — Website Maintainer's Guide

This is the source code for **www.matador-bjj.com**, the CSUN Brazilian
Jiu-Jitsu club website. It's plain HTML + CSS + a tiny bit of JavaScript —
no frameworks, no build step, nothing to install. Edit a file, save,
push, done.

Every file is heavily commented. If you open any page and read the big
comment block at the top, it tells you what's on that page and how to
edit it. This README is the map that ties it all together.

---

## What's in this folder

| File / folder | What it is |
|---|---|
| `index.html` | Home page (hero, intro, announcements, highlights, Instagram) |
| `schedule.html` | Club schedule + Forge's full schedule + locations |
| `join.html` | How to join: first-day guide, pricing, paperwork, FAQ |
| `team.html` | Coaches + officers |
| `gallery.html` | Photo grid (placeholders until we add photos) |
| `404.html` | Shown automatically for broken/mistyped URLs |
| `style.css` | **All** styling for every page — colors, fonts, layout |
| `script.js` | All JavaScript: the mobile menu + auto copyright year |
| `assets/img/` | Optimized logos (club, Forge, CSUN, Matadors) |
| `assets/fonts/` | Vitesse font files (the CSUN Athletics headline font) |
| `favicon_io/` | Browser tab icons |
| `aboutus.html`, `contactus.html`, `gettingstarted.html`, `howtojoin.html`, `meettheofficers.html` | Tiny redirect stubs — the old site's URLs, forwarding to the new pages so old links never break. Leave them alone. |
| `CNAME` | Tells GitHub Pages our custom domain. **Never delete this.** |
| `logos/`, root-level PNGs | Original/unoptimized art files. Not used by the live site, kept as source material. |

---

## The recipes (most common edits)

### 1. Update the club schedule
Open `schedule.html`, find the **CLUB SCHEDULE** section. Every class is
a small block:

```html
<div class="class-block is-csun">
    <span class="class-name">Fundamentals</span>
    <span class="class-time">5:45 – 7:45 PM</span>
</div>
```

- `is-csun` = red (on campus) · `is-forge` = gold (at Forge)
- Copy a block to add a class, delete one to remove it, edit the text
  to change times.
- There's only ONE copy of the schedule — it works on phones and
  desktops automatically.

### 2. Re-sync Forge's schedule
Forge posts a new schedule image at
[forgebjjacademy.com/schedule](https://forgebjjacademy.com/schedule/)
every month or two. Compare it against the **FORGE'S FULL ACADEMY
SCHEDULE** section in `schedule.html`, fix anything that changed, and
update the "Rebuilt from **June 2026**" date in the notice.

### 3. Post the fall dates
Open `index.html`, find the **ANNOUNCEMENTS** section — there's a
ready-to-paste list template in the comment right above it. Also check
`schedule.html` for the "Heads up: this is the Spring 2026 schedule"
notice and delete it once the schedule is current.

### 4. Update the officers
Open `team.html`. Each person is one card — edit names/roles in place,
copy a card to add someone, delete a card to remove someone. The
instructions (including how to add headshots) are in the comment at the
top of that file.

### 5. Add photos
Gallery: see the 3-step instructions at the top of `gallery.html`.
Headshots: see the top of `team.html`. In both cases you're swapping a
`<div class="photo-placeholder">` for an `<img>` tag.

### 6. Add a competition result
Open `index.html`, find **COMPETITION HIGHLIGHTS**, copy a card, fill in
the bracketed parts, pick a medal emoji (🥇🥈🥉🏆). Delete the
placeholder cards once you have real ones.

### 7. Change a color or font — site-wide
Open `style.css` and look at the `:root` block near the top (section 2,
"Design tokens"). Every color on the site points at those variables, so
changing `--red` there changes it everywhere at once.

### 8. Change a nav link or footer link
The header and footer are **copy-pasted on all five pages** (that's the
price of not using a framework). Make the same edit in `index.html`,
`schedule.html`, `join.html`, `team.html`, and `gallery.html`. Tip: use
your editor's find-across-files to make sure you caught them all.

---

## Previewing your changes locally

Any of these work — pick your favorite:

- Easiest: just double-click the `.html` file to open it in a browser.
- Nicer (acts exactly like the real site):

```bash
python3 -m http.server 8000 --directory "/Users/jesusramirez/Desktop/csun bjj website"
```

then visit http://localhost:8000. Press `Ctrl+C` in the terminal to stop it.

Always check your change at phone width too — either drag the browser
window narrow, or use DevTools device mode (right-click → Inspect →
the little phone icon). Most of our visitors are on phones.

---

## Publishing (deploying) changes

The site is hosted on **GitHub Pages** from the `main` branch of
`IRetroCoderI/Matador-bjj-club`. Anything pushed to `main` goes live at
www.matador-bjj.com within a minute or two.

```bash
git add -A
git commit -m "describe what you changed"
git push
```

If you're working on a branch (like `redesign-2026`), merge it into
`main` first — nothing goes live until it's on `main`.

---

## Design decisions (so future-you knows why)

- **CSUN red is `#CE0E2D`** — sampled from the official CSUN wordmark
  SVG. Use the `--red` variable, never hard-code new reds.
- **Forge gold `#C08A00`** tags anything happening at Forge. The
  red-vs-gold color coding is used consistently across the whole site.
- **Headlines: Vitesse** (the CSUN Athletics typeface, self-hosted from
  `assets/fonts/`). **Body: Atkinson Hyperlegible** (CSUN's official web
  font, loaded from Google Fonts).
- **Mobile-first**: `style.css` styles phones by default and layers on
  desktop layouts in `@media (min-width: ...)` blocks at the bottom.
- Old page URLs redirect instead of 404-ing, so links printed on old
  flyers and bios keep working forever.
