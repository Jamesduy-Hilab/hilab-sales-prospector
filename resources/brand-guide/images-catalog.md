# HILAB Slide Images Catalog

The `images/` folder contains HILAB's official brand assets: logos, fonts, and backgrounds from Brand Guideline 2026.

## Folder structure

```
images/
├── logo/
│   ├── hilab-white.png        # HILAB full text — WHITE (930x248, RGBA)
│   ├── hilab-black.png        # HILAB full text — BLACK (930x248, RGBA)
│   ├── hilab-red.png          # HILAB full text — RED (4500x4500, RGBA)
│   ├── hi-icon-white.png      # HI icon — WHITE (812x812, RGBA)
│   ├── hi-icon-black.png      # HI icon — BLACK (812x812, RGBA)
│   └── hi-icon-red.png        # HI icon — RED (1080x1080, RGBA)
├── font/
│   ├── OpenSans-Variable.ttf          # Heading font (variable weight)
│   ├── OpenSans-Italic-Variable.ttf   # Heading font italic
│   ├── Inter-Variable.ttf             # Body font (variable weight)
│   └── Inter-Italic-Variable.ttf      # Body font italic
├── bg-dark/                   # 6 official dark backgrounds (1920x1280)
│   ├── 1.png → 6.png
└── bg-light/                  # 7 official light backgrounds (1920x1280)
    ├── 7.png → 13.png
```

## Usage in pptxgenjs

```javascript
// === BACKGROUND ===
// Dark background for cover slide
slide.background = { path: 'images/bg-dark/1.png' };

// Light background for content slide
slide.background = { path: 'images/bg-light/8.png' };

// === LOGO ===
// White HILAB logo on dark background (header)
slide.addImage({
  path: 'images/logo/hilab-white.png',
  x: 0.3, y: 0.25, w: 1.8, h: 0.48
});

// Black HILAB logo on light background (footer)
slide.addImage({
  path: 'images/logo/hilab-black.png',
  x: 0.3, y: 6.8, w: 1.2, h: 0.32
});

// Small HI icon (compact use)
slide.addImage({
  path: 'images/logo/hi-icon-black.png',
  x: 9.2, y: 6.8, w: 0.4, h: 0.4
});
```

---

## Logos

### Primary logo — "HILAB" (full text)

| File | Color | Size | Ratio | When to use |
|------|-------|------|-------|-------------|
| `logo/hilab-white.png` | **White** | 930x248 | **3.75:1 wide** | Dark/red backgrounds: Cover, CTA, Section Divider, headers, footers |
| `logo/hilab-black.png` | **Black** | 930x248 | **3.75:1 wide** | Light backgrounds: Content slides, headers, footers |
| `logo/hilab-red.png` | **Red** | 4500x4500 | **1:1 square** | Cover pages ONLY at square proportions, "About HILAB" slide |

> **WARNING**: `hilab-red.png` is SQUARE (1:1). Rendering it at wide proportions (e.g. 120x32) will severely distort it. For document/slide headers and footers, always use `hilab-black.png` or `hilab-white.png` (both 3.75:1 wide format).

### Secondary logo — "HI" (compact icon)

| File | Color | Size | When to use |
|------|-------|------|-------------|
| `logo/hi-icon-white.png` | **White** | 812x812 | Small footer on dark backgrounds, watermark |
| `logo/hi-icon-black.png` | **Black** | 812x812 | Small footer on light backgrounds, watermark |
| `logo/hi-icon-red.png` | **Red** | 1080x1080 | Accent, compact icon in content |

### Logo placement rules

- **Header (Cover/CTA slides)**: Full HILAB logo, top-left — `x: 0.3, y: 0.25, w: 1.8, h: 0.48`
- **Footer (content slides)**: Small HILAB logo or HI icon — `x: 0.3, y: 6.8, w: 1.2, h: 0.32` or HI icon `w: 0.4, h: 0.4`
- White logo on dark/red backgrounds, black or red logo on light backgrounds
- Safe spacing: 1/2 of logo height

---

## Fonts

| File | Font | Role |
|------|------|------|
| `font/OpenSans-Variable.ttf` | **Open Sans** (Variable) | **Headings** — Bold/Semibold |
| `font/OpenSans-Italic-Variable.ttf` | **Open Sans Italic** | Heading italic (rarely used) |
| `font/Inter-Variable.ttf` | **Inter** (Variable) | **Body text** — Regular/Medium |
| `font/Inter-Italic-Variable.ttf` | **Inter Italic** | Caption, emphasis |

> **Note**: These are variable font files. In pptxgenjs, just declare font names (`'Open Sans'`, `'Inter'`). Ensure fonts are installed on the system or embedded if needed.

---

## Backgrounds

### Dark mode — `bg-dark/` (use for ~20-25% of slides)

| File | Description | When to use |
|------|-------------|-------------|
| **bg-dark/1.png** | Black with **red data wave mesh** flowing from lower-left to center-right, clear 3D grid, strong glow | **Main cover slide**, AI/Data themes, key visual |
| **bg-dark/2.png** | Black with **red dot matrix wave** at bottom, softer glow, scattered particles | **Section divider**, tech slides, data platform |
| **bg-dark/3.png** | Black with **red dot particles close-up**, bokeh effect, concentrated | **Highlight slide**, big numbers on dark bg, impact moment |
| **bg-dark/4.png** | Dark black-brown-red with **soft mesh wave**, diffused glow, diagonal flow | **General section divider**, strategy slides, vision |
| **bg-dark/5.png** | **Red-black vertical columns gradient**, abstract geometric, light from both sides | **Cover alternative**, strong CTA, creative/distinctive slide |
| **bg-dark/6.png** | Black with **red dot wave horizontal band** centered, evenly distributed | **General dark slide**, summary, thank you |

### Light mode — `bg-light/` (use for ~70% of slides)

| File | Description | When to use |
|------|-------------|-------------|
| **bg-light/7.png** | White with **concave wave curves** forming funnel/tunnel at center, artistic | **Introduction**, "About HILAB" slide, opening content |
| **bg-light/8.png** | Light gray gradient with **subtle dot wave** at bottom-left, very clean | **Data/Analytics**, tables, charts, technical content |
| **bg-light/9.png** | White with **soft fabric swoosh**, minimal, gentle | **Clean content**, text-heavy, pricing, comparisons |
| **bg-light/10.png** | White with **very subtle diagonal wave lines**, nearly plain | **Text-heavy content**, bullet points, long descriptions |
| **bg-light/11.png** | White with **prominent curved wave lines** from bottom-right, elegant | **Benefits/features**, process flow, case study |
| **bg-light/12.png** | Light gray with **wave lines from right side**, slightly darker tone | **General content**, timeline, roadmap |
| **bg-light/13.png** | Light gray with **angular diagonal wave lines** at bottom-right | **Charts/graphs**, tech stack, technical comparisons |

---

## Background selection rules by slide type

| Slide type | Primary background | Alternative |
|------------|-------------------|-------------|
| **Cover** | bg-dark/1.png | bg-dark/5.png |
| **Section Divider** | bg-dark/4.png | bg-dark/2.png |
| **Main text content** | bg-light/10.png | bg-light/9.png |
| **Introduction/About** | bg-light/7.png | bg-light/11.png |
| **Data/Analytics** | bg-light/8.png | bg-light/13.png |
| **Benefits/Features** | bg-light/11.png | bg-light/7.png |
| **Case Study** | bg-light/11.png | bg-light/12.png |
| **Timeline/Roadmap** | bg-light/12.png | bg-light/10.png |
| **Tech Stack** | bg-light/13.png | bg-light/8.png |
| **Highlight/Big Number** | bg-dark/3.png | bg-light/9.png (subtle) |
| **Pricing** | bg-light/9.png | bg-light/10.png |
| **CTA/Closing** | bg-dark/6.png | bg-dark/5.png |
| **Thank You** | bg-dark/6.png | bg-dark/1.png |

---

## Combination rules (per Brand Guideline)

### Background distribution
- **Light backgrounds** (bg-light/): ~70% of slides — main content, data, comparisons
- **Dark backgrounds** (bg-dark/): ~20-25% of slides — cover, section divider, CTA, highlight
- **Note**: No separate red backgrounds in this asset set; use bg-dark/3.png or bg-dark/5.png when strong impact equivalent is needed

### Alternation rules
- Do NOT use more than 3 consecutive light background slides without visual elements
- Do NOT use more than 2 consecutive dark background slides
- Cover and CTA slides ALWAYS use dark backgrounds
- Section Dividers ALWAYS use dark backgrounds
- Alternate different light background variants to avoid monotony (e.g.: 10 → 11 → 8, not 10 → 10 → 10)

### Logo + background combinations
- Dark background → White logo (`hilab-white.png` or `hi-icon-white.png`)
- Light background → Black logo (`hilab-black.png` or `hi-icon-black.png`) or red logo (`hilab-red.png`)
