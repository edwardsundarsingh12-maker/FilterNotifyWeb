# Filter — marketing site

Static marketing site for **Filter: Schedule Notification** (`com.filternotify.app`), the Android
notification manager that mutes apps on a schedule and keeps every muted notification.

Live: <https://edwardsundarsingh12-maker.github.io/FilterNotifyWeb/>

## Preview locally

No build step — it's plain HTML, CSS and one JS file.

```powershell
python -m http.server 8080
# then open http://localhost:8080/
```

## Pages

| File | Purpose |
|---|---|
| `index.html` | Hero, features, how it works, privacy benefits, screenshot carousel, FAQ, CTA |
| `whats-new.html` | Release-note timeline with client-side search |
| `privacy.html` | Privacy policy — written from the app's actual on-device data behaviour |
| `terms.html` | Terms of service — licence, free/Pro tiers, Play Billing, platform limits |
| `styles.css` | Every colour and dimension token lives in `:root` at the top |
| `app.js` | Nav toggle, sticky-nav shadow, reveal observer, carousel arrows, changelog search, year |

## Assets

| File | What it is |
|---|---|
| `assets/icon.svg` | App icon (bell + clock badge) redrawn in the site palette |
| `assets/badge-googleplay.svg` | Generated, trademark-safe "Get it on Google Play" badge |
| `assets/app-1.png` | History tab — cropped from `01_save.png` |
| `assets/app-2.png` | Home tab with the blocked-today counter — de-skewed from `03_productive.png` |
| `assets/app-3.png` | Block All with a 22:00–07:00 window — de-skewed from `02_schedule.png` |
| `assets/0*.png` | The original Play Store ASO images; `01_save.png` is the `og:image` |

The `app-N.png` files are perspective-corrected crops of the phone screens inside the ASO art, so the
site never shows a marketing headline inside a phone mockup.

## What to swap before launch

1. **Play Store URL** — every CTA points at the placeholder
   `https://play.google.com/store/apps/details?id=com.filternotify.app`. Once the listing is live,
   replace it across all four HTML files.
2. **Release date** — `whats-new.html` lists v1.0.0 as *September 2026*; set the real publish date.
3. **New releases** — copy the commented `<article class="release">` template at the top of the
   timeline in `whats-new.html`. Newest first; add `class="feature"` for a highlighted rail dot.
4. **Legal dates** — bump "Last updated" in `privacy.html` / `terms.html` whenever they change.
5. **In-app WebView URLs** — point the app's Privacy Policy and Terms links at `privacy.html` and
   `terms.html` on this site.

## Retheme

Edit the `:root` block in `styles.css` (`--primary`, `--primary-soft`, `--accent`, `--accent-soft`,
`--bg`, `--bg-2`). A few effects use literal `rgba()` of the brand colours — glows, icon tiles, tag
chips — so after changing tokens, grep for the old values and update them too:

```powershell
Select-String -Path *.css,*.html,assets\*.svg -Pattern "224, 162, 51|139, 92, 246|e0a233|8b5cf6"
```

`assets/icon.svg` and `assets/badge-googleplay.svg` carry their own gradient stops — update those by
hand.

## Deploy

Pushing to `main` runs `.github/workflows/pages.yml`, which uploads the repository root as-is and
publishes it to GitHub Pages. `.nojekyll` stops Jekyll from touching the output.
