import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { COMPONENTS_LIST } from '../../landing/landing.data';

@Component({
  selector: 'app-components-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-components-section' },
  imports: [TableModule],
  template: `
    <section class="components-section app-section" id="componentes">
      <h2 class="section-title">Componentes</h2>
      <div
        class="table-wrap"
        role="region"
        aria-label="Tabela de componentes da biblioteca ng-mapcn"
      >
        <p-table
          [value]="components"
          [tableStyle]="{ 'min-width': '50rem' }"
          styleClass="p-datatable-sm p-datatable-striped"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Componente</th>
              <th>Selector</th>
              <th>Descrição</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-c>
            <tr>
              <td>{{ c.name }}</td>
              <td>
                <code class="selector-code">{{ c.selector }}</code>
              </td>
              <td>{{ c.description }}</td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </section>
  `,
  styles: `
    .components-section {
      padding-block: 4rem 6rem;
    }
    .section-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 2rem;
      text-align: center;
      color: var(--foreground);
    }
    .table-wrap {
      overflow-x: auto;
      border-radius: var(--border-radius);
      border: 1px solid var(--border);
    }
    .selector-code {
      font-size: 0.8125rem;
      background: var(--muted);
      color: var(--foreground);
      padding: 0.2rem 0.5rem;
      border-radius: 0.25rem;
    }
  `,
})
export class ComponentsSectionComponent {
  readonly components: {
    name: string;
    selector: string;
    description: string;
  }[] = [...COMPONENTS_LIST];
}
