import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

const INSTALL_CMD = `npm install ng-mapcn`;
const INSTALL_CSS = `/* Incluir em angular.json (styles) ou em estilos globais */
@import 'maplibre-gl/dist/maplibre-gl.css';`;

const QUICK_START_HTML = `<ng-map [mapId]="'my-map'" [center]="[0, 0]" [zoom]="2" (mapReady)="onMapReady($event)"></ng-map>
<ng-zoom-control [mapId]="'my-map'" position="top-right"></ng-zoom-control>`;

const QUICK_START_TS = `import { MapComponent, ZoomControlComponent } from 'ng-mapcn';
// ... imports no componente; onMapReady(map) { ... }`;

@Component({
  selector: 'app-installation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-installation' },
  template: `
    <section class="installation-section app-section" id="instalacao">
      <h2 class="section-title">Instalação</h2>
      <p class="requirement">Requisito: Angular 18 ou superior. O MapLibre GL já vem incluído na biblioteca.</p>
      <div class="code-block">
        <pre><code>{{ installCmd }}</code></pre>
        <button
          type="button"
          class="copy-btn"
          (click)="copy(installCmd, 1)"
          [attr.aria-label]="copied1() ? 'Copiado' : 'Copiar comando'"
        >
          {{ copied1() ? 'Copiado!' : 'Copiar' }}
        </button>
      </div>
      <p class="css-note">
        Incluir o CSS do MapLibre em <code>angular.json</code> (styles) ou em
        estilos globais:
      </p>
      <div class="code-block">
        <pre><code>{{ installCss }}</code></pre>
        <button
          type="button"
          class="copy-btn"
          (click)="copy(installCss, 2)"
          [attr.aria-label]="copied2() ? 'Copiado' : 'Copiar CSS'"
        >
          {{ copied2() ? 'Copiado!' : 'Copiar' }}
        </button>
      </div>

      <h3 class="subsection-title">Quick Start</h3>
      <p class="subsection-desc">Trecho mínimo de template e import:</p>
      <div class="code-block">
        <pre><code>{{ quickStartHtml }}</code></pre>
        <button
          type="button"
          class="copy-btn"
          (click)="copy(quickStartHtml, 3)"
          [attr.aria-label]="copied3() ? 'Copiado' : 'Copiar HTML'"
        >
          {{ copied3() ? 'Copiado!' : 'Copiar' }}
        </button>
      </div>
      <div class="code-block">
        <pre><code>{{ quickStartTs }}</code></pre>
        <button
          type="button"
          class="copy-btn"
          (click)="copy(quickStartTs, 4)"
          [attr.aria-label]="copied4() ? 'Copiado' : 'Copiar TypeScript'"
        >
          {{ copied4() ? 'Copiado!' : 'Copiar' }}
        </button>
      </div>
    </section>
  `,
  styles: `
    .installation-section {
      padding-block: 4rem 6rem;
    }
    .section-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 1rem;
      color: var(--foreground);
    }
    .subsection-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 2rem 0 0.5rem;
      color: var(--foreground);
    }
    .subsection-desc,
    .requirement,
    .css-note {
      margin: 0 0 0.75rem;
      color: var(--foreground);
      font-size: 0.9375rem;
      font-weight: 500;
      line-height: 1.5;
    }
    .requirement {
      margin: 0 0 1rem;
    }
    .css-note {
      margin: 1rem 0 0.5rem;
    }
    .css-note code {
      font-size: 0.875em;
      background: var(--muted);
      color: var(--foreground);
      padding: 0.15em 0.4em;
      border-radius: 0.25rem;
    }
    .code-block {
      position: relative;
      background: var(--muted);
      border: 1px solid var(--border);
      border-left: 3px solid var(--primary);
      border-radius: var(--border-radius);
      padding: 1.25rem 1.5rem;
      padding-right: 5rem;
      margin-bottom: 1.25rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    }
    .code-block pre {
      margin: 0;
      overflow-x: auto;
      font-size: 0.875rem;
      line-height: 1.6;
      font-family:
        ui-monospace, 'Cascadia Code', 'Source Code Pro', Consolas, monospace;
      color: var(--foreground);
    }
    .code-block code {
      white-space: pre;
    }
    .copy-btn {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      padding: 0.4rem 0.875rem;
      font-size: 0.8125rem;
      font-weight: 500;
      border-radius: 0.375rem;
      border: 1px solid var(--border);
      background: var(--background);
      color: var(--foreground);
      cursor: pointer;
      transition:
        background 0.15s ease,
        border-color 0.15s ease;
    }
    .copy-btn:hover {
      background: var(--muted);
      border-color: var(--primary);
    }
  `,
})
export class InstallationComponent {
  readonly installCmd = INSTALL_CMD;
  readonly installCss = INSTALL_CSS;
  readonly quickStartHtml = QUICK_START_HTML;
  readonly quickStartTs = QUICK_START_TS;

  readonly copied1 = signal(false);
  readonly copied2 = signal(false);
  readonly copied3 = signal(false);
  readonly copied4 = signal(false);

  async copy(text: string, which: 1 | 2 | 3 | 4): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      const sig =
        which === 1
          ? this.copied1
          : which === 2
            ? this.copied2
            : which === 3
              ? this.copied3
              : this.copied4;
      sig.set(true);
      setTimeout(() => sig.set(false), 2000);
    } catch {
      // ignore
    }
  }
}
