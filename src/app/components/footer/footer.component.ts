import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GITHUB_URL, MAPCN_URL, NPM_URL } from '../../landing/landing.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-footer',
    role: 'contentinfo',
  },
  template: `
    <footer class="footer-bar">
      <p class="credits">
        Inspirado no
        <a [href]="MAPCN_URL" target="_blank" rel="noopener noreferrer"
          >mapcn</a
        >
        (React). MapLibre GL, shadcn/ui, licença MIT.
      </p>
      <p class="beta-note">
        Em beta — estamos evoluindo a API e os componentes. Use em produção com
        cuidado e acompanhe as releases.
      </p>
      <nav class="footer-links" aria-label="Links do rodapé">
        <a [href]="GITHUB_URL" target="_blank" rel="noopener noreferrer"
          >GitHub</a
        >
        <span class="sep">|</span>
        <a [href]="NPM_URL" target="_blank" rel="noopener noreferrer">npm</a>
        <span class="sep">|</span>
        <a
          [href]="GITHUB_URL + '/issues'"
          target="_blank"
          rel="noopener noreferrer"
          >Reportar bug</a
        >
      </nav>
    </footer>
  `,
  styles: `
    .footer-bar {
      padding: 2rem 1.5rem;
      border-top: 1px solid var(--border);
      background: var(--muted);
      color: var(--muted-foreground);
      font-size: 0.875rem;
      text-align: center;
    }
    .credits {
      margin: 0 0 0.5rem;
    }
    .credits a {
      color: var(--primary);
      text-decoration: none;
    }
    .credits a:hover {
      text-decoration: underline;
    }
    .beta-note {
      margin: 0 0 1rem;
      font-style: italic;
    }
    .footer-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      align-items: center;
    }
    .footer-links a {
      color: var(--primary);
      text-decoration: none;
    }
    .footer-links a:hover {
      text-decoration: underline;
    }
    .sep {
      color: var(--muted-foreground);
    }
  `,
})
export class FooterComponent {
  readonly GITHUB_URL = GITHUB_URL;
  readonly NPM_URL = NPM_URL;
  readonly MAPCN_URL = MAPCN_URL;
}
