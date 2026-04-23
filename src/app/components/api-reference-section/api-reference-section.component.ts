import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { ZardTableImports } from '@/components/ui/table/table.imports';

import {
  BasicMapExampleComponent,
  ControlsMapExampleComponent,
  DarkThemeMapExampleComponent,
  FlytoGlobeMapExampleComponent,
  MarkersMapExampleComponent,
  RoutePlanningMapExampleComponent,
  RoutesMapExampleComponent,
} from '../examples/example-maps';
import { API_REFERENCE, ApiCategory } from '../../landing/api-reference.data';

const CATEGORY_EXAMPLES = new Map<string, Type<unknown>>([
  ['map', BasicMapExampleComponent],
  ['viewport', FlytoGlobeMapExampleComponent],
  ['markers', MarkersMapExampleComponent],
  ['routes', RoutesMapExampleComponent],
  ['osrm', RoutePlanningMapExampleComponent],
  ['theme', DarkThemeMapExampleComponent],
  ['controls', ControlsMapExampleComponent],
]);

@Component({
  selector: 'app-api-reference-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-api-reference-section' },
  imports: [...ZardTableImports, NgComponentOutlet],
  template: `
    <section class="api-section app-section" id="api-reference">
      <div class="section-header">
        <h2 class="section-title">API Reference</h2>
        <p class="section-subtitle">
          All interfaces and types exported by <code class="pkg-name">ng-mapcn</code>.
        </p>
      </div>

      <nav class="category-nav" aria-label="API categories">
        @for (cat of categories; track cat.id) {
          <a class="cat-pill" [href]="'#api-' + cat.id">{{ cat.title }}</a>
        }
      </nav>

      @for (cat of categories; track cat.id) {
        <div class="category-block" [id]="'api-' + cat.id">
          <h3 class="category-title">{{ cat.title }}</h3>

          @if (getExample(cat.id); as exampleCmp) {
            <div class="category-preview">
              <ng-container *ngComponentOutlet="exampleCmp" />
            </div>
          }

          @for (iface of cat.interfaces; track iface.name) {
            <div class="interface-block">
              <div class="interface-header">
                <span class="interface-name">{{ iface.name }}</span>
                <span class="source-badge">{{ iface.source }}</span>
              </div>
              <p class="interface-desc">{{ iface.description }}</p>

              <div
                class="table-wrap overflow-x-auto"
                role="region"
                [attr.aria-label]="iface.name + ' properties'"
              >
                <table z-table zType="striped" zSize="compact" class="min-w-[42rem]">
                  <thead z-table-header>
                    <tr z-table-row>
                      <th z-table-head>Property</th>
                      <th z-table-head>Type</th>
                      <th z-table-head>Default</th>
                      <th z-table-head>Description</th>
                    </tr>
                  </thead>
                  <tbody z-table-body>
                    @for (prop of iface.props; track prop.property) {
                      <tr z-table-row>
                        <td z-table-cell>
                          <span class="prop-wrap">
                            <code class="prop-name">{{ prop.property }}</code>
                            @if (prop.required) {
                              <span class="required-badge" title="Required">*</span>
                            }
                          </span>
                        </td>
                        <td z-table-cell>
                          <code class="type-code">{{ prop.type }}</code>
                        </td>
                        <td z-table-cell>
                          @if (prop.default) {
                            <code class="default-code">{{ prop.default }}</code>
                          } @else {
                            <span class="no-default">—</span>
                          }
                        </td>
                        <td z-table-cell class="desc-cell">{{ prop.description }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }
        </div>
      }
    </section>
  `,
  styles: `
    .api-section {
      padding-block: 5rem 6rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 2rem;
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

    .pkg-name {
      font-size: 0.9em;
      background: var(--muted);
      color: var(--foreground);
      padding: 0.15em 0.4em;
      border-radius: 0.25rem;
    }

    /* Category nav pills */
    .category-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 3rem;
    }

    .cat-pill {
      display: inline-block;
      padding: 0.3rem 0.875rem;
      font-size: 0.8125rem;
      font-weight: 500;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--muted);
      color: var(--foreground);
      text-decoration: none;
      transition:
        background 0.15s ease,
        border-color 0.15s ease;
    }

    .cat-pill:hover {
      background: var(--primary);
      border-color: var(--primary);
      color: var(--primary-foreground);
    }

    /* Category block */
    .category-block {
      margin-bottom: 3.5rem;
    }

    .category-title {
      font-size: 1.125rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--foreground);
      margin: 0 0 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--border);
    }

    /* Live example preview */
    .category-preview {
      height: 280px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border);
      background: var(--muted);
      margin-bottom: 1.75rem;
    }

    .category-preview ::ng-deep .example-map-container {
      display: block;
      height: 100%;
    }

    .category-preview ::ng-deep .map-wrapper {
      height: 100% !important;
      border-radius: 0;
    }

    /* Interface block */
    .interface-block {
      margin-bottom: 2.5rem;
    }

    .interface-header {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      margin-bottom: 0.5rem;
    }

    .interface-name {
      font-size: 1rem;
      font-weight: 600;
      font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Consolas, monospace;
      color: var(--primary);
    }

    .source-badge {
      font-size: 0.75rem;
      font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Consolas, monospace;
      background: var(--muted);
      color: var(--muted-foreground);
      padding: 0.2em 0.55em;
      border-radius: 0.25rem;
      border: 1px solid var(--border);
    }

    .interface-desc {
      font-size: 0.9rem;
      color: var(--muted-foreground);
      margin: 0 0 0.875rem;
      line-height: 1.55;
    }

    /* Table cells */
    .prop-wrap {
      display: flex;
      align-items: center;
      gap: 0.375rem;
    }

    .prop-name {
      font-size: 0.8125rem;
      color: var(--foreground);
      background: transparent;
    }

    .required-badge {
      font-size: 0.75rem;
      font-weight: 700;
      color: #ef4444;
      line-height: 1;
    }

    .type-code {
      font-size: 0.8rem;
      color: var(--foreground);
      background: var(--muted);
      padding: 0.15em 0.4em;
      border-radius: 0.25rem;
      white-space: nowrap;
    }

    .default-code {
      font-size: 0.8rem;
      color: var(--foreground);
      background: var(--muted);
      padding: 0.15em 0.4em;
      border-radius: 0.25rem;
    }

    .no-default {
      color: var(--muted-foreground);
    }

    .desc-cell {
      font-size: 0.875rem;
      color: var(--muted-foreground);
      line-height: 1.5;
    }
  `,
})
export class ApiReferenceSectionComponent {
  readonly categories: ApiCategory[] = API_REFERENCE;

  getExample(categoryId: string): Type<unknown> | undefined {
    return CATEGORY_EXAMPLES.get(categoryId);
  }
}
