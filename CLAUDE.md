# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

**ng-mapcn-ui** is the showcase/documentation site for the **ng-mapcn** Angular library — a MapLibre GL wrapper for Angular. It uses the Angular Router: `/` (landing), `/docs` (installation + components table), `/examples` (live demos).

## Commands

```bash
npm start        # Dev server at http://localhost:4200
npm run build    # Production build → dist/ng-mapcn-ui/
npm run watch    # Incremental dev build
npm test         # Unit tests via Karma + Jasmine
```

No linting or e2e configured.

## Architecture

Shell layout: `AppComponent` renders header, `<main><router-outlet /></main>`, and footer. Route components live under `pages/`:

```
app.routes.ts            – '', 'docs', 'examples', wildcard → ''
pages/
  landing-page.component.ts   – Hero + Features
  doc-page.component.ts       – Components table + Installation
  examples-page.component.ts  – Examples grid only
app.config.ts            – Router + `withInMemoryScrolling` (anchor fragments), HTTP, animations, `provideZard()`
core/services/
  theme.service.ts       – Light/dark toggle; persists to localStorage; also calls ng-mapcn's ThemeService
  github-stars.service.ts
components/              – Section components consumed by pages
  header / hero / features / installation / components-section / footer
  examples/
    examples.component.ts      – Bento grid + examples grid layout
    example-maps/              – Map demo components
landing/landing.data.ts  – Static content data (features, examples metadata)
```

## Patterns to follow

- **All components are standalone** with `ChangeDetectionStrategy.OnPush`. Never add NgModules.
- **Signals for state**: use `signal()` + `.asReadonly()` for exposed state (see `ThemeService`, `InstallationComponent`).
- **Theming**: `data-theme` and the `dark` class on `document.documentElement` drive Zard/Tailwind tokens. Global design tokens live in `src/styles.css`; map/fonts/sections in `src/styles.scss`.
- **Map components**: import `MapComponent`, `MapControlsComponent` etc. from `ng-mapcn`. Each demo in `example-maps/` is a self-contained standalone component.
- `@Component` decorator must be immediately above `export class` — no statements between them (TypeScript requirement).

## Key dependencies

- `ng-mapcn` — the library being showcased; provides `MapComponent` and related
- `maplibre-gl` (5.x) — underlying map engine
- **Zard UI** (via `zard-cli` + `src/components/ui`) + **Tailwind CSS v4** (`@tailwindcss/postcss`, `src/styles.css`) — UI primitives
- `@ng-icons/lucide` — icons in header/features
