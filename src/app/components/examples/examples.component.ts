import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BasicMapExampleComponent,
  DarkThemeMapExampleComponent,
  FlytoGlobeMapExampleComponent,
  FlytoMarkersMapExampleComponent,
  MarkersMapExampleComponent,
  RoutePlanningMapExampleComponent,
  RoutesMapExampleComponent,
  TooltipsMapExampleComponent,
} from './example-maps';

@Component({
    selector: 'app-examples',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'app-examples' },
    imports: [
        BasicMapExampleComponent,
        DarkThemeMapExampleComponent,
        FlytoGlobeMapExampleComponent,
        FlytoMarkersMapExampleComponent,
        MarkersMapExampleComponent,
        RoutesMapExampleComponent,
        RoutePlanningMapExampleComponent,
        TooltipsMapExampleComponent,
    ],
    template: `
    <section class="examples-section app-section" id="examples">
      <div class="section-header">
        <h2 class="section-title">Explore the possibilities</h2>
        <p class="section-subtitle">Interactive demos — all running live in the browser.</p>
      </div>

      <div class="bento-grid">
        <div class="bento-card bento-big">
          <app-markers-map-example />
          <span class="bento-label">Markers & Routes</span>
        </div>
        <div class="bento-card bento-right">
          <app-routes-map-example />
          <span class="bento-label">Routes</span>
        </div>
        <div class="bento-card bento-bot1">
          <app-flyto-globe-map-example />
          <span class="bento-label">Globe</span>
        </div>
        <div class="bento-card bento-bot2">
          <app-route-planning-map-example />
          <span class="bento-label">Route Planning</span>
        </div>
        <div class="bento-card bento-bot3">
          <app-dark-theme-map-example />
          <span class="bento-label">Dark Theme</span>
        </div>
        <div class="bento-card bento-ext1">
          <app-basic-map-example />
          <span class="bento-label">Basic Map</span>
        </div>
        <div class="bento-card bento-ext2">
          <app-flyto-markers-map-example />
          <span class="bento-label">Fly To Markers</span>
        </div>
        <div class="bento-card bento-ext3">
          <app-tooltips-map-example />
          <span class="bento-label">Tooltips</span>
        </div>
      </div>
    </section>
  `,
    styles: `
    .examples-section {
      padding-block: 3rem 6rem;
    }
    .section-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }
    .section-title {
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      margin: 0 0 0.75rem;
      color: var(--foreground);
    }
    .section-subtitle {
      font-size: 1rem;
      color: var(--muted-foreground);
      margin: 0;
    }

    /* ── Bento grid ── */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 300px 220px 220px;
      gap: 0.75rem;
      grid-template-areas:
        "big big right"
        "bot1 bot2 bot3"
        "ext1 ext2 ext3";
    }
    @media (max-width: 900px) {
      .bento-grid {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 240px 200px 200px 200px 200px;
        grid-template-areas:
          "big big"
          "right bot1"
          "bot2 bot3"
          "ext1 ext2"
          "ext3 ext3";
      }
    }
    @media (max-width: 560px) {
      .bento-grid {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(8, 220px);
        grid-template-areas:
          "big"
          "right"
          "bot1"
          "bot2"
          "bot3"
          "ext1"
          "ext2"
          "ext3";
      }
    }
    .bento-card {
      border-radius: 12px;
      border: 1px solid var(--border);
      overflow: hidden;
      position: relative;
      background: var(--muted);
    }
    .bento-big  { grid-area: big; }
    .bento-right { grid-area: right; }
    .bento-bot1 { grid-area: bot1; }
    .bento-bot2 { grid-area: bot2; }
    .bento-bot3 { grid-area: bot3; }
    .bento-ext1 { grid-area: ext1; }
    .bento-ext2 { grid-area: ext2; }
    .bento-ext3 { grid-area: ext3; }

    .bento-label {
      position: absolute;
      bottom: 0.75rem;
      left: 0.75rem;
      background: rgba(0, 0, 0, 0.55);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.25rem 0.625rem;
      border-radius: 6px;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 10;
      pointer-events: none;
    }

    /* make map components fill bento card */
    .bento-card ::ng-deep .example-map-container {
      display: block;
      height: 100%;
    }
    .bento-card ::ng-deep .map-wrapper {
      height: 100% !important;
      border-radius: 0;
    }
  `
})
export class ExamplesComponent {}
