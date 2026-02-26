import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { GithubStarsService } from '../../core/services/github-stars.service';
import { ThemeService } from '../../core/services/theme.service';
import { GITHUB_URL, NPM_URL } from '../../landing/landing.data';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, BadgeModule, MenuModule],
  host: {
    class: 'app-header',
    role: 'banner',
  },
  template: `
    <header class="header-bar">
      <a href="#" class="logo" aria-label="ng-mapcn início">ng-mapcn</a>
      <span class="badge-wrap">
        <span class="p-badge p-badge-secondary beta-badge">Beta</span>
      </span>

      <nav class="nav-desktop" aria-label="Navegação principal">
        <a class="nav-link" href="#features">Features</a>
        <a class="nav-link" href="#exemplos">Exemplos</a>
        <a class="nav-link" href="#componentes">Componentes</a>
        <a class="nav-link" href="#instalacao">Instalação</a>
        <button
          type="button"
          class="theme-toggle"
          (click)="themeService.toggle()"
          [attr.aria-label]="
            themeService.theme() === 'light'
              ? 'Ativar tema escuro'
              : 'Ativar tema claro'
          "
        >
          @if (themeService.theme() === 'light') {
            <span class="pi pi-moon theme-icon" aria-hidden="true"></span>
          } @else {
            <span class="pi pi-sun theme-icon" aria-hidden="true"></span>
          }
        </button>
        <a
          [href]="GITHUB_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="star-link"
        >
          <p-button
            icon="pi pi-github"
            [label]="starLabel"
            severity="secondary"
            [outlined]="true"
            ariaLabel="Ver repositório no GitHub"
          />
        </a>
        <a [href]="NPM_URL" target="_blank" rel="noopener noreferrer">
          <p-button
            label="Instalar"
            severity="primary"
            ariaLabel="Instalar via npm"
          />
        </a>
      </nav>

      <div class="nav-mobile">
        <p-menu #menu [model]="menuItems" [popup]="true" />
        <button
          type="button"
          class="theme-toggle"
          (click)="themeService.toggle()"
          [attr.aria-label]="
            themeService.theme() === 'light'
              ? 'Ativar tema escuro'
              : 'Ativar tema claro'
          "
        >
          @if (themeService.theme() === 'light') {
            <span class="pi pi-moon theme-icon" aria-hidden="true"></span>
          } @else {
            <span class="pi pi-sun theme-icon" aria-hidden="true"></span>
          }
        </button>
        <p-button
          icon="pi pi-bars"
          [text]="true"
          [rounded]="true"
          (click)="menu.toggle($event)"
          ariaLabel="Abrir menu"
        />
      </div>
    </header>
  `,
  styles: `
    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding-inline: 1.5rem;
      background: var(--background);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo {
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--foreground);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .badge-wrap {
      margin-left: 0.5rem;
    }
    .beta-badge {
      font-size: 0.7rem;
    }
    .nav-desktop {
      display: none;
      align-items: center;
      gap: 1rem;
    }
    .nav-desktop .nav-link {
      color: var(--muted-foreground);
      text-decoration: none;
      font-size: 0.875rem;
    }
    .nav-desktop .nav-link:hover {
      color: var(--foreground);
    }
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      padding: 0;
      border: 1px solid var(--border);
      border-radius: var(--border-radius);
      background: var(--background);
      color: var(--foreground);
      cursor: pointer;
      transition:
        background 0.15s ease,
        border-color 0.15s ease;
    }
    .theme-toggle:hover {
      background: var(--muted);
      border-color: var(--primary);
    }
    .theme-icon {
      font-size: 1.125rem;
    }
    .star-link {
      text-decoration: none;
    }
    .nav-mobile {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    @media (min-width: 768px) {
      .nav-desktop {
        display: flex;
      }
      .nav-mobile {
        display: none;
      }
    }
  `,
})
export class HeaderComponent implements OnInit {
  private readonly githubStars = inject(GithubStarsService);
  readonly GITHUB_URL = GITHUB_URL;
  readonly NPM_URL = NPM_URL;

  menu = viewChild<Menu>('menu');

  get starLabel(): string {
    const count = this.githubStars.stars();
    return count !== null ? `Star ${count}` : 'Star';
  }

  readonly themeService = inject(ThemeService);

  menuItems: { label: string; icon?: string; url?: string; target?: string }[] =
    [
      { label: 'Features', url: '#features' },
      { label: 'Exemplos', url: '#exemplos' },
      { label: 'Componentes', url: '#componentes' },
      { label: 'Instalação', url: '#instalacao' },
      {
        label: 'GitHub',
        icon: 'pi pi-github',
        url: GITHUB_URL,
        target: '_blank',
      },
      { label: 'Instalar (npm)', url: NPM_URL, target: '_blank' },
    ];

  ngOnInit(): void {
    this.githubStars.loadStars();
  }
}
