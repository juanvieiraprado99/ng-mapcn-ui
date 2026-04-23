import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ZardTableImports } from '@/components/ui/table/table.imports';

import { COMPONENTS_LIST } from '../../landing/landing.data';

@Component({
  selector: 'app-components-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-components-section' },
  imports: [...ZardTableImports],
  template: `
    <section class="components-section app-section" id="components">
      <div class="section-header">
        <h2 class="section-title">Components</h2>
        <p class="section-subtitle">Composable pieces — use only what you need.</p>
      </div>
      <div
        class="table-wrap overflow-x-auto"
        role="region"
        aria-label="ng-mapcn components table"
      >
        <table z-table zType="striped" zSize="compact" class="min-w-[50rem]">
          <thead z-table-header>
            <tr z-table-row>
              <th z-table-head>Component</th>
              <th z-table-head>Selector</th>
              <th z-table-head>Description</th>
            </tr>
          </thead>
          <tbody z-table-body>
            @for (c of components; track c.name) {
              <tr z-table-row>
                <td z-table-cell>{{ c.name }}</td>
                <td z-table-cell>
                  <code class="selector-code rounded bg-muted px-1.5 py-0.5 text-sm">{{ c.selector }}</code>
                </td>
                <td z-table-cell>{{ c.description }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: `
    .components-section {
      padding-block: 5rem 6rem;
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
    .selector-code {
      color: var(--foreground);
    }
  `,
})
export class ComponentsSectionComponent {
  readonly components = COMPONENTS_LIST;
}
