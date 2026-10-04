# Piața Design System

Canonical reference for every UI surface in this repo. The tokens live in
`src/styles/theme.css` (raw pigments) and `src/styles/globals.css` (semantic
layer); this file explains how to use them. `npm run check:contrast` verifies
the accessibility contract and is part of `npm run verify`.

**The one rule:** components reference semantic or category tokens. Never a raw
hex, never `bg-[#...]`, never a literal colour in a class.

---

## 1. Principles

1. **Content-type colour is structural, never decorative.** The five category
   lines map to real content types (events, jobs, traffic, people, polls) and
   are used only as markers: tags, left stripes, result bars, icons.
2. **Warm neutrals carry the interface.** Limestone and parchment ground the
   page; ochre is the rare accent; verdigris and plum signal state. Pure `#000`
   and `#FFF` are excluded from body copy and page backgrounds.
3. **Editorial, not dashboard.** Bodoni Moda for display, Lora for reading,
   Work Sans for interface. Rules and radii, not shadows.
4. **The forum is the product.** Dense, link-first, alive with other people's
   presence. Never a lonely listing.

---

## 2. Colour

### Raw pigments — `theme.css`

| Token | Hex | Role |
| --- | --- | --- |
| `--calcar` | `#EDE4D0` | FAȚADĂ — page ground (light) |
| `--ocru` | `#C8923A` | Brass — rare accent, borders, fills |
| `--teracota` | `#A8472E` | Terracotta — primary action (light) |
| `--oblon` | `#4A6652` | Verdigris — secondary accent (light) |
| `--piatra` | `#8C877D` | Cobblestone — dividers, disabled |
| `--cerneala` | `#26231F` | Ink — body text (light) |
| `--roz` | `#D8A898` | Chalk — tinted fills (light) |
| `--amurg` | `#1C2230` | Nightfall — page ground (dark) |
| `--sodiu` | `#E59B2F` | Sodium — primary action (dark) |
| `--tei` | `#A9B565` | Tea — secondary accent (dark) |
| `--hartie` | `#EAE3D3` | Parchment — body text (dark) |
| `--apa` | `#55645E` | River — dividers (dark) |

### Semantic layer — `globals.css`

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `--calcar` | `--amurg` | page background |
| `--surface` | `#EEE5D4` | `#2A303D` | cards, panels |
| `--text` | `--cerneala` | `--hartie` | body copy |
| `--text-muted` | cerneala @72% | hartie @75% | secondary copy |
| `--border` | `--piatra` | `--apa` | **decorative** dividers only |
| `--control-border` | `--text-muted` | `--text-muted` | **interactive** control edges |
| `--action` | `--teracota` | `--sodiu` | primary button fill, links |
| `--action-text` | `--calcar` | `--amurg` | label on an action fill |
| `--accent` | `--oblon` | `--tei` | secondary accent text/icon |
| `--danger` | `--linie-trafic` | `--linie-trafic` | stripes and icons only |
| `--focus-ring` | `--cerneala` | `--hartie` | focus outline |

`--border` and `--control-border` are deliberately different. Cobblestone sits
at 2.83:1, fine for a divider but below the 3:1 that WCAG 1.4.11 requires of a
form control's boundary. Inputs, selects, textareas, checkboxes, radios and
switches use `--control-border` (5.50 light / 7.58 dark).

### Category lines

| Token | Hex | On-colour token | Marker |
| --- | --- | --- | --- |
| `--linie-evenimente` | `#F2C200` | `--linie-on-clar` (ink, 9.30) | events |
| `--linie-joburi` | `#0B5CA8` | `--linie-on-intens` (white, 6.75) | jobs |
| `--linie-trafic` | `#D6182B` | `--linie-on-intens` (white, 5.22) | traffic |
| `--linie-oameni` | `#0B7A41` | `--linie-on-intens` (white, 5.42) | people |
| `--linie-sondaje` | `#F28A1E` | `--linie-on-clar` (ink, 6.28) | polls |

Text on a category fill uses the paired on-colour token, never `--action-text`.
Yellow and orange take ink; blue, red and green take white. The pure-white ban
in principle 2 governs body copy and page backgrounds — it yields here, because
warm `calcar` on red measures 4.13 and on green 4.29, both under the 4.5 body
minimum, while white clears both.

### Dark mode

Two guards, both required:

```css
@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) { … } }
:root[data-theme='dark'] { … }
```

The media query follows the OS; the attribute follows the in-app toggle; the
`:not()` guard stops the OS from overriding an explicit light choice.

---

## 3. Typography

Bodoni Moda (display) · Lora (body) · Work Sans (interface), all self-hosted
from `lib/` and verified with fontTools to carry the Romanian comma-below forms
`Ș ț Ș Ț` (U+0218–021B) and `ă â î` (U+0102/0103/00C2/00CE). Inter may be
layered on for numerals via the CDN link, with Work Sans as the offline fallback.

| Step | Size | Family | Token |
| --- | --- | --- | --- |
| Display | 3.5rem | Bodoni Moda | `font-display` |
| Title | 2rem | Bodoni Moda | `font-title` |
| Heading | 1.3125rem | Lora | `font-heading` |
| Body | 1rem | Lora | `font-body` |
| Nav | 0.9375rem | Work Sans | `font-nav` |
| Meta | 0.8125rem | Work Sans | `font-meta` |

Optical sizing is on for Bodoni, so `font-optical-sizing: auto` is set on
headings.

---

## 4. Space, radius, rules

- Spacing steps: `--space-1` 4px → `--space-9` 128px.
- Radius is 2px or 4px only. No pill buttons, no circles except a 2px
  checkbox/swatch.
- Borders are 1px `--control-border`, or the 4px category stripe, or a double
  rule drawn as `1px solid + 3px gap` via the `rule-double` utility.
- **No shadows.** Elevation comes from the `--surface` step and a rule.

---

## 5. Motion

`--motion-fast` 140ms, `--motion-base` 220ms, `--motion-slow` 320ms, with
`--ease-standard` and `--ease-entrance`. Interactive elements transition
`background-color`, `border-color`, `color`, `transform` and `opacity` only —
never `width`, `height` or `all`. `prefers-reduced-motion: reduce` drops every
duration to 0.01ms.

---

## 6. Component contract

Every primitive ships default, hover, focus-visible, active and disabled
states, and shows its resting label rather than reflowing.

- Focus is a global `2px solid` ring at `2px` offset — components must not
  remove it.
- Icons are `currentColor`, 1.5px stroke, 24px, and never emoji.
- Interactive targets are at least 44×44px.
- Status is never colour alone; pair it with text or an icon.
- `Modal` traps focus, restores it on close, closes on Escape, and locks scroll.
- `Toast` uses `role="status"` / `aria-live="polite"`.

---

## 7. Accessibility contract

`npm run check:contrast` parses the real CSS and asserts 4.5:1 for body text and
3:1 for UI components in **both** themes. It currently reports 34 verified pairs
and 0 failures.

### Adjustments made to the original spec

1. **Added `--linie-on-intens` / `--linie-on-clar`.** `calcar` on red is 4.13
   and on green 4.29 — both under 4.5. The spec's own category table prescribed
   white on those chips, so the on-colour tokens encode that.
2. **`--danger` is a marker, not body copy.** Red on limestone is 4.13 and on
   nightfall 3.05, so it clears 3:1 for stripes and icons but not 4.5 for text.
   Alert copy uses `--text`.
3. **Added `--control-border`.** Cobblestone at 2.83:1 fails WCAG 1.4.11 for
   form-control edges; `--text-muted` clears it at 5.50 / 7.58.
4. **Declared the Work Sans `@font-face` pair.** The stylesheet named Work Sans
   as the offline fallback without ever declaring it.

### Accepted tradeoffs

- **Category markers cannot reach 3:1 against the page.** Yellow on limestone
  is 1.33 and orange 1.97; blue on nightfall 2.35 and green 2.93. These are
  physically unreachable without abandoning the palette. The mitigation is that
  colour is never the sole carrier of meaning — every tag, stripe and marker
  also renders its text label. Reported by `check:contrast` as `warn`.
- **Banned for text:** ochre 2.18, cobblestone 2.83, river 2.55. Fills,
  borders and decoration only.

---

## 8. Out of scope

Existing `EventsGrid`, `TopBar`, `NavBar`, `CalendarView` and page shells still
carry their original zinc/indigo utilities. They are **not** yet migrated to
these tokens; the primitives and the style guide land first. Do not treat their
current colours as sanctioned.
