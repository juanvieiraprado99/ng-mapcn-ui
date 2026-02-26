import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GITHUB_URL, NPM_URL } from '../../landing/landing.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-hero' },
  imports: [ButtonModule],
  template: `
    <section class="hero-section">
      <h1 class="hero-title">
        Mapas bonitos para Angular, feitos de forma simples.
      </h1>
      <p class="hero-subtitle">
        Inspirado no mapcn (React). Componentes de mapa para Angular 18+ com
        MapLibre GL — theme-aware, zero config e estilização inspirada no
        shadcn/ui.
      </p>
      <div class="hero-ctas">
        <a [href]="NPM_URL" target="_blank" rel="noopener noreferrer">
          <p-button
            label="Instalar"
            severity="primary"
            ariaLabel="Instalar via npm"
          />
        </a>
        <a href="#instalacao">
          <p-button
            label="Documentação"
            severity="secondary"
            [outlined]="true"
            ariaLabel="Ver documentação"
          />
        </a>
        <a href="#exemplos">
          <p-button
            label="Ver exemplos"
            severity="secondary"
            [outlined]="true"
            ariaLabel="Ver exemplos"
          />
        </a>
        <a [href]="GITHUB_URL" target="_blank" rel="noopener noreferrer">
          <p-button
            icon="pi pi-github"
            label="GitHub"
            severity="secondary"
            [outlined]="true"
            ariaLabel="Repositório GitHub"
          />
        </a>
      </div>
    </section>
  `,
  styles: `
    .hero-section {
      text-align: center;
      padding-block: 4rem 5rem;
      padding-inline: 1.5rem;
      max-width: 720px;
      margin-inline: auto;
    }
    .hero-title {
      font-size: clamp(1.75rem, 4vw, 2.75rem);
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin: 0 0 1rem;
      color: var(--foreground);
    }
    .hero-subtitle {
      font-size: 1.125rem;
      color: var(--muted-foreground);
      line-height: 1.6;
      margin: 0 0 2rem;
    }
    .hero-ctas {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
    }
    .hero-ctas a {
      text-decoration: none;
    }
  `,
})
export class HeroComponent {
  readonly NPM_URL = NPM_URL;
  readonly GITHUB_URL = GITHUB_URL;
}
