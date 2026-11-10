---
name: Kingdom Builders 2027
description: 코람데오 청년회 2027 순배치. 해 진 직후의 코발트 하늘 아래 꿀빛 석회암 성벽을 한 단씩 쌓는다.
colors:
  sky-950: "#0c1946"
  sky-900: "#132a6c"
  sky-800: "#1a3887"
  sky-700: "#2247a6"
  sky-ink: "#f6f0e2"
  sky-ink-soft: "#c9d3f2"
  horizon: "rgb(242 168 92 / 0.34)"
  gold-lit: "#f4d58f"
  stone-1: "#e9c987"
  stone-3: "#d4a660"
  stone-4: "#c89659"
  mortar: "#8a6b48"
  mortar-deep: "#6f5236"
  earth: "#3a2918"
  passage: "#22160b"
  carve: "#3a2614"
  carve-sub: "#4a311b"
  carve-soft: "#5e4026"
  carve-faint: "#7a5a3a"
  chalk: "#c23b22"
  chalk-ink: "#fff4ec"
typography:
  display:
    fontFamily: "'Hahmlet Variable', 'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', serif"
    fontSize: "clamp(42px, 14.2cqi, 70px)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Hahmlet Variable', 'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', serif"
    fontSize: "clamp(28px, 8.4vw, 34px)"
    fontWeight: 800
    lineHeight: 1.24
    letterSpacing: "-0.015em"
  title:
    fontFamily: "'Hahmlet Variable', 'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1.32
    letterSpacing: "-0.01em"
  title-stone:
    fontFamily: "'Hahmlet Variable', 'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.25
  action:
    fontFamily: "'Hahmlet Variable', 'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', serif"
    fontSize: "19px"
    fontWeight: 800
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.5
  meta:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.45
    fontFeature: "'tnum'"
  label:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
rounded:
  none: "0px"
  tag: "4px"
  sheet: "22px 22px 0 0"
  arch: "999px 999px 0 0 / 66px 66px 0 0"
  pill: "999px"
spacing:
  mortar: "4px"
  stone-pad-y: "11px"
  stone-pad-x: "16px"
  sky-gutter: "20px"
  sky-gutter-wide: "22px"
  course: "clamp(44px, 6.6dvh, 58px)"
components:
  stone-cta:
    backgroundColor: "{colors.stone-1}"
    textColor: "{colors.carve}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0 25px 6px"
    height: "64px"
  stone-cta-disabled:
    backgroundColor: "{colors.stone-1}"
    textColor: "{colors.carve-soft}"
  name-slot:
    backgroundColor: "{colors.stone-1}"
    textColor: "{colors.carve}"
    rounded: "{rounded.none}"
    padding: "13px 20px"
    height: "80px"
  stone-pick:
    backgroundColor: "{colors.stone-1}"
    textColor: "{colors.carve}"
    typography: "{typography.title-stone}"
    rounded: "{rounded.none}"
    padding: "11px 16px 11px 20px"
    height: "72px"
  sheet:
    backgroundColor: "{colors.stone-1}"
    textColor: "{colors.carve}"
    rounded: "{rounded.sheet}"
  gate:
    backgroundColor: "{colors.passage}"
    textColor: "{colors.gold-lit}"
    rounded: "{rounded.arch}"
    height: "92px"
  wall-note:
    backgroundColor: "{colors.mortar-deep}"
    textColor: "{colors.gold-lit}"
    padding: "10px 14px"
  me-tag:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.chalk-ink}"
    rounded: "{rounded.tag}"
    padding: "1px 7px 2px"
  back-link:
    textColor: "{colors.sky-ink-soft}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 12px 0 4px"
---

# Design System: Kingdom Builders 2027

## Overview

**Creative North Star: "The Nehemiah Wall at Dusk"**

Every screen is a slice of the same place: a deep cobalt sky just after sunset, a few first stars and a distant wall-and-tower silhouette at the top, and a honey limestone wall rising from the bottom of the screen. The interface does not sit on top of the wall. It is built from the wall. Inputs are empty stone slots, buttons are wide stones, list rows are stones laid in courses, and the result page is the wall itself, with mortar joints between every item. The sky carries what you read; the wall carries what you touch, and the wall is always where the thumb reaches.

Density is low and ceremonial on the sky and practical on the wall: names, roles, and phone numbers are set large in carved Hahmlet so they read the way an inscription reads. Material does the decorating. Raster limestone faces, chipped corners that differ from stone to stone, a soft top-lit bevel, and the cast shadow into the mortar give the depth. There is no card, no panel, and no flat UI chrome. The one red, a snapped chalk line, appears only where the visitor acts and where the visitor is "me".

The world rejects the event-page frame of gift boxes, confetti, and a white result card. It also avoids cream paper as a flat surface, black granite, and a lone tombstone-like slab: every stone sits in a course with neighbors.

**Key Characteristics:**
- Two zones on every page: cobalt sky above (reading), limestone wall below (acting).
- UI elements are stones: seeded widths, per-corner chips, raster faces, 4px mortar joints.
- Text on stone is carved: dark ink clipped through the stone texture, in Hahmlet.
- Chalk red marks only the primary action and "me".
- One motion word: landing. Things fall into place from above and settle with a short bounce.
- Mobile-first single column, capped at 480px.

## Colors

A dusk palette in two halves: cold cobalt sky and warm honey limestone, joined by a gold that reads as the last light on stone, with a single chalk red.

### Primary
- **Chalk-Line Red** (chalk): the snapped chalk (먹줄) line under the primary action and under "my" stone, the dashed outline of the empty name slot, the input caret, the action icon, the "나" tag, and text selection. It is never used for errors, decoration, or headings.
- **Chalk Paper** (chalk-ink): text on a red fill (the "나" tag, selection).

### Secondary
- **Last-Light Gold** (gold-lit): display titles on the sky (KINGDOM BUILDERS, the result place name), the build path line, note text on dark mortar, rolling text in the gate opening, and the focus ring on the sky.

### Tertiary
- **Dusk Horizon** (horizon): the warm radial glow at the bottom of the sky, where the sky meets the wall. It is used only as a gradient wash and never as a fill.

### Neutral
- **Night Cobalt** (sky-950), **Deep Cobalt** (sky-900), **Cobalt** (sky-800), **Lit Cobalt** (sky-700): the vertical sky gradient, darkest at the top. sky-950 is also the page background behind the 480px frame and the `theme-color`; sky-800 is the focus-ring color on stone.
- **Starlight** (sky-ink): body and headline text on the sky.
- **Haze** (sky-ink-soft): secondary text on the sky (verse citation, lede, back link, build hint).
- **Honey Limestone** (stone-1): the flat color behind stone surfaces that are not raster-faced (bottom sheet, gate frame gradient). Raster faces carry the actual stone color; see Shapes.
- **Amber Limestone** (stone-3), **Ochre Limestone** (stone-4): the lower stop of the gate frame gradient and the scrollbar thumb.
- **Mortar** (mortar): the 4px joints between stones and the wall background.
- **Deep Mortar** (mortar-deep): the inline note band inside the wall (errors and "slow" waits).
- **Earth** (earth): the ground strip under every wall, with grain noise.
- **Passage** (passage): the dark void inside the All Nations arch.
- **Carved Ink** (carve): primary text on stone.
- **Carved Sub-ink** (carve-sub): the English sub-line under Korean role and section titles on stone. It is a literal in the stylesheet, not yet a custom property.
- **Weathered Ink** (carve-soft): secondary text on stone (labels, meta, phone numbers, sheet descriptions).
- **Faint Ink** (carve-faint): placeholder only.

### Named Rules
**The Chalk-Line Rule.** Red marks the next action and "me", nothing else. If a red element is neither the thing to press nor the visitor's own name, it is wrong. Errors use gold on deep mortar, not red.

**The Two-Zones Rule.** Light text goes on the sky; carved dark ink goes on stone. Never put sky-ink on stone or carve on the sky.

## Typography

**Display Font:** Hahmlet Variable (self-hosted via @fontsource-variable/hahmlet, falling back to Pretendard Variable, then serif)
**Body Font:** Pretendard Variable (jsDelivr dynamic subset, falling back to the system Korean sans stack)

**Character:** Hahmlet is a Korean serif with chiseled terminals, used heavy (700–900) so that names read as cut into stone. Pretendard handles everything functional: labels, descriptions, meta, numbers. Chinese and Japanese runs fall back to the body stack.

### Hierarchy
- **Display** (Hahmlet 900, fluid up to 70px, line-height 0.9, uppercase for the Latin title): the KINGDOM / BUILDERS lockup on the home sky, in gold with a soft navy text shadow. The result page's place name uses the same weight and color at clamp(42px, 13vw, 58px) and line-height 1.02.
- **Headline** (Hahmlet 800, fluid 28–34px, line-height 1.24): page titles on the sky (the All Nations rolling title). The build title runs a step smaller at clamp(23px, 6.8vw, 28px), line-height 1.3.
- **Title** (Hahmlet 800, 22px, line-height 1.32): bottom-sheet titles and leader names on stone; 19px at weight 800 for lintel and plaque titles.
- **Title-stone** (Hahmlet 700–800, 18–20px, line-height 1.2–1.25): a name or group carved on a stone (picks, All Nations cells, members).
- **Action** (Hahmlet 800, 19px): text on the primary stone button. It is 16px inside wall messages.
- **Body** (Pretendard 400, 16px, line-height 1.55, max 28ch on the sky lede): explanatory text.
- **Body-sm** (Pretendard 500, 15px, line-height 1.5): sheet descriptions, hints, the back link, and states.
- **Meta** (Pretendard 500–600, 14px, tabular numbers): birth years, phone digits, and counts. Leader phone numbers use 16px at weight 600.
- **Label** (Pretendard 600, 13px): the name-slot label, the verse citation, and English sub-lines under Korean titles.

### Named Rules
**The Carved-Name Rule.** Every person, group, or place name is set in Hahmlet at weight 700 or heavier. On stone it is carved: ink at 86% opacity is clipped through the stone face texture, so the grain shows through the letters.

**The Korean-First Pairing Rule.** Where two languages pair, Korean leads in Hahmlet and English follows below in a smaller Pretendard line (carve-sub). Words are never broken mid-word (`word-break: keep-all`).

## Layout

The page is a single column capped at 480px and centered. Above 520px the frame lifts off the cobalt page with a hairline and a deep ambient shadow. Every page splits vertically into **sky** (header, title, copy) and **wall** (every interactive element), with an **earth** strip at the bottom. On the home page the sky takes about 60% of the first viewport and the wall about 40%, so the name slot and confirm stone sit within thumb reach.

The wall is built from **courses**: rows of 3–5 stones with seeded widths. Odd rows start with a narrow stone so vertical joints stagger, and the course height is fluid (clamp(44px, 6.6dvh, 58px)). Functional stones (slot, CTA, gate) are flanked by small decorative stones (flex 0.25–0.6 against 5–6) so they read as laid into the wall rather than as full-bleed bars. The top course of a home wall is ragged and half-built.

Rhythm: 4px mortar everywhere (course gap, stone gap, wall inset). Text inside stones uses 11–20px padding. The sky uses 20–22px gutters, and safe-area insets are added to the top of the sky and the bottom of the earth. The type uses container units (`cqi`), so the wall and titles scale with the 480px frame, not the window.

## Elevation & Depth

Depth is physical, not UI elevation. Each stone is lit from the top-left: a bright inset edge and highlight on the top and left, and a darker inset falloff on the bottom and right. The whole wall then casts a small drop shadow into the mortar. Sky elements have no shadows except the title's text shadow. Overlays (the bottom sheet) cast a broad navy shadow upward. Wood scaffolding casts short soft shadows. No hard offset shadows.

### Shadow Vocabulary
- **Stone bevel** (`box-shadow: inset 0 2px 1px -1px rgb(255 248 228 / 0.7), inset 0 9px 10px -8px rgb(255 246 222 / 0.5), inset 3px 0 5px -3px rgb(255 246 222 / 0.3), inset 0 -3px 2px -1px rgb(64 36 10 / 0.5), inset 0 -12px 14px -10px rgb(70 40 12 / 0.42), inset -4px 0 6px -3px rgb(70 40 12 / 0.28)`): every stone.
- **Mortar cast** (`filter: drop-shadow(0 2px 2px rgb(40 22 8 / 0.45))`): applied to the wall or list container, not to individual stones, so the shadow follows the chipped silhouettes.
- **Sky title glow** (`text-shadow: 0 3px 12px rgb(6 12 40 / 0.7)`): gold display text on the sky.
- **Sheet lift** (`box-shadow: 0 -14px 44px rgb(6 12 40 / 0.5)`), over a backdrop of rgb(6 12 40 / 0.64).
- **Arch recess** (`box-shadow: inset 0 10px 18px rgb(0 0 0 / 0.55)`): the gate opening, deepening to `inset 0 14px 22px rgb(0 0 0 / 0.65)` on press.

### Named Rules
**The Lit-From-Above Rule.** Light comes from the upper left of the sky. Highlights go on top and left edges, shade on bottom and right. Pressed stones sink 2px; they never lift.

## Shapes

A stone has no border-radius. Its corners are **chipped**: each of the four corners gets a seeded bevel 1.5–8px deep with up to ±17° of tilt, or stays intact (40% chance). The chips are built from four intersecting linear-gradient masks, so no two stones share a silhouette, and the same seed always produces the same wall. Stone faces are tiling 192px raster plates in five limestone tones (honey, gold, amber, ochre, wheat), plus a paler **fresh-cut** face for the name slot, "my" stone, and the plaque. Each stone offsets its texture randomly so tiling never repeats visibly. All plates come from the procedural generator at `scripts/stone-plates/generator.html`, and each `.webp` has a `.json` provenance sidecar.

The other shapes in the world are the round arch of the All Nations gate (a 999px / 66px elliptical top over a radial voussoir pattern), the bottom sheet's 22px top corners, the 4px "나" tag, pill-shaped hover areas for the back link, and a circular close button. Wood (crane mast, boom, scaffold poles, planks) uses its own raster grain and 2–4px radii.

## Components

### Buttons
Tactile and heavy: a button is a wide stone you press into the wall.
- **Shape:** stone silhouette with chipped corners, no radius, min-height 64px.
- **Primary (stone CTA):** carved-ink Hahmlet 800 19px on a raster face. A snapped chalk-line raster (13px tall, rotated -0.6°) runs under it, and an ArrowRight icon in chalk red.
- **Hover / Active:** hover brightens to 1.05. Active sinks 2px and dims to 0.96 (140ms, ease-out `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Disabled:** ink drops to carve-soft and the chalk line and icon disappear. The stone stays, so the wall does not open a hole.
- **Busy:** three 6px square dots bob in place of the label.
- **Quiet:** the same stone without the chalk line or icon, for secondary returns ("처음으로 돌아가기").

### Inputs / Fields
- **Name slot:** an empty fresh-cut stone in the middle course, outlined by a 2px dashed chalk line inset 4px. The label is 13px Pretendard 600 in carve-soft and the value is 26px Hahmlet 700 with a chalk caret. The placeholder is 22px weight 400 in carve-faint.
- **Focus:** the dashed outline turns solid chalk.
- **Filled:** the outline disappears and the slot reads as a placed stone.
- **Error:** a deep-mortar note band below the wall courses, with gold text and an AlertCircle icon. Slow-loading waits use the same band with sky-ink text.

### Selection stones (picks)
- Used in the same-name sheet and the All Nations lists. A stone at least 72px tall (84px in All Nations) shows a carved name (Hahmlet 20px), a meta line (birth year, last four digits, tabular), and a ChevronRight in carve-soft. Hover and press work like the CTA. Lists lay out in 4px mortar gaps (8px inside the sheet) with the mortar cast shadow.

### Bottom Sheet
- A native `<dialog>` with a stone-1 base, grain noise, and a top light wash, 22px top corners, and a 44×5px handle. The title is Hahmlet 800 22px. A 44px circular close button sits top right. It slides up in 420ms ease-out over a navy backdrop that fades in over 300ms. Page scroll locks while it is open.

### Navigation
- **Back link:** a ChevronLeft plus 15px Pretendard 600 in sky-ink-soft, on a 44px-tall pill hit area. Hover fills it with white at 7%.
- **Logo:** the CoramDeo wordmark, inverted to a single light color on the sky (opacity 0.92), linking home from inner pages. It repeats at 70% opacity on the earth strip of the result page.

### All Nations Gate (signature)
- A round-arched stone frame (with radial voussoir joints in mortar-deep) around a dark passage, 92px tall, laid in its own course at the bottom of the home wall. A Globe icon and five-language rolling text in gold sit inside it, crossfading over 500ms. Hover warms the horizon glow inside the passage, and press deepens the recess.

### Lintels, Plaque, Leader and Member Stones (result wall)
- **Plaque:** a fresh-cut stone with the full path ("3국 · 이서준 그룹 · 최하린 순"), with a small tracked line beneath it.
- **Lintel:** a full-width section-title stone (Korean Hahmlet title, English carve-sub line, tabular count). It becomes the members disclosure, with a chevron that rotates 180° in 300ms.
- **Leader row:** a 34% role stone (Korean role plus English sub-line) beside a name-and-phone stone. The phone is plain text, never a link.
- **Member stones:** wrap in a flowing course. When the list opens they drop in one after another, staggered 38ms each.
- **Me:** a fresh-cut face, the name underlined with a 2.5px chalk line (offset 6px), and a red "나" tag.

### Crane and Wall Build (signature reveal)
- A wooden jib crane (mast, boom, strut, pulley, counterweight, drum and crank) stands on the left and scaffolding against the wall on the right. A stone hangs from a rope and sling and swings ±1.6° over 2.8s. Each tap drops one stone into the next dashed slot: an ease-in fall (`cubic-bezier(.5,0,.9,.35)`), a 5px squash (scaleY 0.96) at 78%, a 2px rebound, and settle (540ms; 760ms for the final stone). Dust motes puff on landing, then the inscription carves in left to right (a clip-path wipe, 460ms). The fourth stone is "me": fresh-cut, chalk-underlined, heavier. The site shakes for 380ms, and a dawn glow fades up behind the wall over 1100ms. Extra taps queue. Vibration is a secondary cue only.
- **Reduced motion:** no swing, shake, dust, or fall. Stones and members simply fade in (200ms linear), and the sheet fades instead of sliding.

## Do's and Don'ts

### Do:
- **Do** build every wall-zone control (inputs, primary actions, selectable rows) as a stone: a raster face, seeded chips, the stone bevel, and 4px mortar to its neighbors (8px in the bottom-sheet list).
- **Do** keep reading on the sky and acting on the wall, with the primary action inside the bottom wall within thumb reach.
- **Do** carve names in Hahmlet 700–900 in carved ink, and put English as a smaller Pretendard line beneath Korean.
- **Do** reserve chalk red (#c23b22) for the next action and for "me".
- **Do** use landing as the motion vocabulary: fall from above, ease in, short bounce, settle. Pair every motion with a reduced-motion fade.
- **Do** generate new stone or wood textures with `scripts/stone-plates/generator.html` and ship each raster with its provenance `.json`.
- **Do** keep focus visible: a 3px gold ring on the sky, switched to cobalt on stone and in the sheet.

### Don't:
- **Don't** use gift boxes, confetti, or a white result card. The reveal is a wall being built.
- **Don't** float a stone slab or card alone on the sky. Stones sit in a wall course or rest on the earth strip.
- **Don't** use cream paper as a flat surface or black granite. The dark arch passage is a void in the wall, not a material.
- **Don't** round stone corners with border-radius or give stones borders. Corners chip; edges are lit and shaded.
- **Don't** use red for errors or emphasis. Errors are gold on deep mortar.
- **Don't** add hard offset shadows or flat UI elevation. Depth comes from the bevel and the mortar cast.
- **Don't** link leader phone numbers. They show as text only.
