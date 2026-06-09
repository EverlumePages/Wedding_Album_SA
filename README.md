# A Keepsake — Wedding Memory Site

A multi-page, editorial wedding **memory** website (not an invitation). Built to hold
hundreds of photographs and short film memories from a wedding day, with a cinematic
feel and tasteful motion — no framework, no build step.

Sample couple: **Tharushi & Lahiru**, Lake Como.

---

## Pages

| File | What it is |
|------|------------|
| `index.html`   | Home — full-bleed hero (the couple walking away, the bride's long veil), intro, an editorial feature grid, parallax dividers, sentimental stats, and teasers into the rest of the site. |
| `gallery.html` | The full photo gallery — ~190 photographs in a masonry layout, filterable by chapter (Portraits, Ceremony, Just the Two, Celebration, Getting Ready, Details), with a full-screen lightbox (arrows, keyboard, swipe). |
| `film.html`    | The films — 16 short moving memories that open in a video player. |
| `story.html`   | Our Story — a timeline from first hello to the wedding day, plus a working **guestbook** (notes are saved in the visitor's browser). |

## How to view it

It's plain HTML/CSS/JS. Either:

- **Double-click `index.html`** to open it in a browser, **or**
- Serve the folder (nicer for caching), e.g.:
  ```bash
  npx serve .
  # or
  python -m http.server
  ```

An internet connection is needed the first time each photo/video loads — the media is
streamed from [Pexels](https://www.pexels.com) (free to use, no attribution required).

## Where everything lives

```
index.html · gallery.html · film.html · story.html
assets/
  css/style.css     ← the whole design system (colours, type, layout, animations)
  js/
    data.js         ← ★ the content: couple details, photos, videos, story
    main.js         ← shared: nav, scroll reveals, parallax, counters, lightbox, video modal
    gallery.js      ← builds the gallery + filters
    film.js         ← builds the film grid
    story.js        ← builds the timeline + guestbook
```

## Customising it for a real couple

Almost everything you'll want to change is in **`assets/js/data.js`**:

- **`SITE`** — the couple's first names, combined name, monogram, wedding date, place,
  tagline, and the little stat numbers on the home page.
- **`HERO`** — the photo IDs used for the big hero, the parallax dividers, the feature
  columns, and each page's banner.
- **`PHOTO_IDS`** — the gallery, grouped by chapter. Add/remove [Pexels](https://www.pexels.com)
  photo IDs, or change the chapters in `CHAPTERS`.
- **`VIDEOS`** — the films: each has a video `src`, a `poster` photo id, a `title`, and a `note`.
- **`STORY`** — the timeline entries on the Story page.

### Using your own photos instead of Pexels
Drop the couple's images into a folder (e.g. `assets/img/`) and either:
- replace the `pexImg()` helper in `data.js` to point at your files, or
- swap the hardcoded hero/banner `<img src="…">` URLs in the HTML and the `id` values in
  `data.js` for your own paths.

The couple's names also appear directly in the HTML (nav, footer, hero) — search & replace
`Tharushi` / `Lahiru` to rename quickly, and update the `<title>` of each page.

## Notes

- **Performance:** photos use responsive `srcset` + lazy-loading; videos use
  `preload="none"` and only load when played, so the pages stay fast even with hundreds of items.
- **Broken-image guard:** if any single photo URL ever fails, that tile quietly hides
  itself rather than showing a broken image.
- **Accessibility:** honours `prefers-reduced-motion` (animations switch off), full keyboard
  support in the lightbox (←/→/Esc).
- All media is from Pexels and free for commercial and personal use.
