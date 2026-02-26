import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXAMPLES } from '../../landing/landing.data';
import {
  BasicMapExampleComponent,
  ControlsMapExampleComponent,
  CustomStyleMapExampleComponent,
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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-examples' },
  imports: [
    BasicMapExampleComponent,
    ControlsMapExampleComponent,
    CustomStyleMapExampleComponent,
    DarkThemeMapExampleComponent,
    FlytoGlobeMapExampleComponent,
    FlytoMarkersMapExampleComponent,
    MarkersMapExampleComponent,
    RoutesMapExampleComponent,
    RoutePlanningMapExampleComponent,
    TooltipsMapExampleComponent,
  ],
  template: `
    <section class="examples-section app-section" id="exemplos">
      <h2 class="section-title">Exemplos de mapas</h2>
      <div class="examples-grid">
        @for (ex of examples; track ex.id) {
          <div class="example-card">
            <div class="example-map-slot">
              @switch (ex.id) {
                @case ('basic-map') {
                  <app-basic-map-example />
                }
                @case ('controls-map') {
                  <app-controls-map-example />
                }
                @case ('custom-style-map') {
                  <app-custom-style-map-example />
                }
                @case ('dark-theme-map') {
                  <app-dark-theme-map-example />
                }
                @case ('flyto-globe-map') {
                  <app-flyto-globe-map-example />
                }
                @case ('flyto-markers-map') {
                  <app-flyto-markers-map-example />
                }
                @case ('markers-map') {
                  <app-markers-map-example />
                }
                @case ('routes-map') {
                  <app-routes-map-example />
                }
                @case ('route-planning-map') {
                  <app-route-planning-map-example />
                }
                @case ('tooltips-map') {
                  <app-tooltips-map-example />
                }
              }
            </div>
            <div class="example-card-body">
              <h3 class="example-card-title">{{ ex.name }}</h3>
              <p class="example-card-content">{{ ex.description }}</p>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .examples-section {
      padding-block: 4rem 6rem;
    }
    .section-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 2rem;
      text-align: center;
      color: var(--foreground);
    }
    .examples-grid {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: 1fr;
    }
    @media (min-width: 640px) {
      .examples-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1024px) {
      .examples-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .example-card {
      border-radius: var(--border-radius);
      border: 1px solid var(--border);
      overflow: hidden;
      background: var(--background);
    }
    .example-map-slot {
      min-height: 280px;
    }
    .example-map-slot app-basic-map-example,
    .example-map-slot app-controls-map-example,
    .example-map-slot app-custom-style-map-example,
    .example-map-slot app-dark-theme-map-example,
    .example-map-slot app-flyto-globe-map-example,
    .example-map-slot app-flyto-markers-map-example,
    .example-map-slot app-markers-map-example,
    .example-map-slot app-routes-map-example,
    .example-map-slot app-route-planning-map-example,
    .example-map-slot app-tooltips-map-example {
      display: block;
    }
    .example-card-body {
      padding: 1.25rem;
    }
    .example-card-title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.5rem;
    }
    .example-card-content {
      margin: 0 0 0;
      font-size: 0.875rem;
      color: var(--muted-foreground);
      line-height: 1.5;
    }
  `,
})
export class ExamplesComponent {
  readonly examples = EXAMPLES;
}
