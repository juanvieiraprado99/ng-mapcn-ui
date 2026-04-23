import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideGithub,
  lucideMapPin,
  lucideMenu,
  lucideMoon,
  lucideSearch,
  lucideSun,
} from '@ng-icons/lucide';

import { ZardButtonComponent } from '@/components/ui/button/button.component';
import { ZardDropdownMenuComponent } from '@/components/ui/dropdown/dropdown.component';
import { ZardDropdownMenuItemComponent } from '@/components/ui/dropdown/dropdown-item.component';

import { GithubStarsService } from '../../core/services/github-stars.service';
import { SearchService } from '../../core/services/search.service';
import { ThemeService } from '../../core/services/theme.service';
import { GITHUB_URL, NPM_URL } from '../../landing/landing.data';

type MobileNavExternal = {
  readonly label: string;
  readonly href: string;
  readonly target?: '_blank';
  readonly rel?: string;
};

type MobileNavInternal = {
  readonly label: string;
  readonly routerLink: string;
  readonly fragment?: string;
};

type MobileNavItem = MobileNavExternal | MobileNavInternal;

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ZardButtonComponent,
    ZardDropdownMenuComponent,
    ZardDropdownMenuItemComponent,
    NgIcon,
    RouterLink,
    RouterLinkActive,
  ],
  viewProviders: [
    provideIcons({ lucideGithub, lucideMapPin, lucideMenu, lucideMoon, lucideSearch, lucideSun }),
  ],
  host: {
    class: 'app-header',
    role: 'banner',
  },
  template: `
    <header class="header-bar">
      <div class="header-left">
        <a routerLink="/" class="logo" aria-label="ng-mapcn home">
          <ng-icon name="lucideMapPin" class="logo-icon" aria-hidden="true" />
          ng-mapcn
        </a>

        <nav class="nav-desktop" aria-label="Main navigation">
          <a class="nav-link" routerLink="/docs" fragment="installation" routerLinkActive="nav-link-active"
            >Docs</a>
          <a class="nav-link" routerLink="/docs" fragment="components" routerLinkActive="nav-link-active"
            >Components</a>
          <a class="nav-link" routerLink="/examples" routerLinkActive="nav-link-active"
            >Examples</a>
          <a class="nav-link" routerLink="/api-reference" routerLinkActive="nav-link-active"
            >API</a>
          <a class="nav-link" routerLink="/credits" routerLinkActive="nav-link-active"
            >Credits</a>
        </nav>
      </div>

      <div class="header-right">
        <!-- Search pill (desktop) -->
        <button
          type="button"
          class="search-btn"
          (click)="searchService.open()"
          [attr.aria-label]="shortcutKey() ? 'Search (' + shortcutKey() + ')' : 'Search'"
        >
          <ng-icon name="lucideSearch" class="search-icon" aria-hidden="true" />
          <span class="search-placeholder">Search...</span>
          @if (shortcutKey()) {
            <kbd class="search-kbd">{{ shortcutKey() }}</kbd>
          }
        </button>

        <!-- GitHub stars -->
        <a
          class="github-link"
          [href]="GITHUB_URL"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
        >
          <ng-icon name="lucideGithub" class="github-icon" aria-hidden="true" />
          @if (starCount !== null) {
            <span class="github-stars">{{ starCount }}</span>
          }
        </a>

        <!-- Theme toggle -->
        <button
          type="button"
          class="icon-btn"
          (click)="themeService.toggle()"
          [attr.aria-label]="themeService.theme() === 'light' ? 'Switch to dark theme' : 'Switch to light theme'"
        >
          @if (themeService.theme() === 'light') {
            <ng-icon name="lucideMoon" class="icon-btn-icon" aria-hidden="true" />
          } @else {
            <ng-icon name="lucideSun" class="icon-btn-icon" aria-hidden="true" />
          }
        </button>

        <!-- Mobile menu -->
        <div class="nav-mobile">
          <z-dropdown-menu>
            <button
              type="button"
              z-button
              zType="ghost"
              zSize="icon"
              dropdown-trigger
              aria-label="Open menu"
            >
              <ng-icon name="lucideMenu" class="size-4" />
            </button>
            @for (item of mobileNav; track item.label) {
              @if (isMobileNavExternal(item)) {
                <a
                  z-dropdown-menu-item
                  [href]="item.href"
                  [attr.target]="item.target ?? null"
                  [attr.rel]="item.rel ?? null"
                >
                  {{ item.label }}
                </a>
              } @else {
                <a
                  z-dropdown-menu-item
                  [routerLink]="item.routerLink"
                  [fragment]="item.fragment ?? undefined"
                >
                  {{ item.label }}
                </a>
              }
            }
          </z-dropdown-menu>
        </div>
      </div>
    </header>
  `,
  styles: `
    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding-inline: 1.25rem;
      background: var(--background);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
      gap: 1rem;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      min-width: 0;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }
    /* Logo */
    .logo {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-weight: 700;
      font-size: 1rem;
      color: var(--foreground);
      text-decoration: none;
      flex-shrink: 0;
    }
    .logo-icon {
      font-size: 1rem;
      color: var(--primary);
    }
    /* Desktop nav */
    .nav-desktop {
      display: none;
      align-items: center;
      gap: 0.25rem;
    }
    .nav-desktop .nav-link {
      color: var(--muted-foreground);
      text-decoration: none;
      font-size: 0.875rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius-sm);
      transition: color 0.15s ease, background 0.15s ease;
    }
    .nav-desktop .nav-link:hover {
      color: var(--foreground);
      background: var(--muted);
    }
    .nav-desktop .nav-link-active {
      color: var(--foreground);
      font-weight: 500;
    }
    /* Search pill */
    .search-btn {
      display: none;
      align-items: center;
      gap: 0.5rem;
      height: 2rem;
      padding-inline: 0.75rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: var(--muted);
      color: var(--muted-foreground);
      cursor: pointer;
      font-size: 0.8125rem;
      font-family: inherit;
      transition: border-color 0.15s ease, background 0.15s ease;
      min-width: 160px;
    }
    .search-btn:hover {
      background: var(--background);
      border-color: var(--ring);
    }
    .search-icon {
      font-size: 0.8125rem;
      flex-shrink: 0;
    }
    .search-placeholder {
      flex: 1;
      text-align: left;
    }
    .search-kbd {
      font-size: 0.6875rem;
      padding: 0.0625rem 0.3125rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--background);
      color: var(--muted-foreground);
      font-family: inherit;
    }
    /* GitHub link */
    .github-link {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      height: 2rem;
      padding-inline: 0.625rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: transparent;
      color: var(--muted-foreground);
      text-decoration: none;
      font-size: 0.8125rem;
      font-weight: 500;
      transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
    }
    .github-link:hover {
      color: var(--foreground);
      background: var(--muted);
    }
    .github-icon {
      font-size: 1rem;
    }
    .github-stars {
      font-variant-numeric: tabular-nums;
    }
    /* Icon button (theme toggle) */
    .icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      padding: 0;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: transparent;
      color: var(--muted-foreground);
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .icon-btn:hover {
      background: var(--muted);
      color: var(--foreground);
    }
    .icon-btn-icon {
      font-size: 1rem;
    }
    /* Mobile menu */
    .nav-mobile {
      display: flex;
      align-items: center;
    }
    /* Responsive */
    @media (min-width: 768px) {
      .nav-desktop {
        display: flex;
      }
      .search-btn {
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
  readonly searchService = inject(SearchService);
  readonly themeService = inject(ThemeService);
  readonly GITHUB_URL = GITHUB_URL;
  readonly NPM_URL = NPM_URL;

  readonly shortcutKey = computed<string | null>(() => {
    if (typeof navigator === 'undefined') return null;
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('win')) return 'Ctrl+K';
    if (ua.includes('mac')) return '⌘K';
    return null;
  });

  get starCount(): string | null {
    const count = this.githubStars.stars();
    if (count === null) return null;
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
  }

  readonly mobileNav: readonly MobileNavItem[] = [
    { label: 'Docs', routerLink: '/docs', fragment: 'installation' },
    { label: 'Components', routerLink: '/docs', fragment: 'components' },
    { label: 'Examples', routerLink: '/examples' },
    { label: 'API Reference', routerLink: '/api-reference' },
    { label: 'Credits', routerLink: '/credits' },
  ];

  ngOnInit(): void {
    this.githubStars.loadStars();
  }

  protected isMobileNavExternal(item: MobileNavItem): item is MobileNavExternal {
    return 'href' in item;
  }
}
