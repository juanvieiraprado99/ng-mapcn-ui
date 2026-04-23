import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBookOpen,
  lucideDatabase,
  lucideHeart,
  lucideHome,
  lucideLayoutGrid,
  lucideMap,
  lucideMapPin,
  lucideMoon,
  lucideMonitor,
  lucideNavigation,
  lucidePackage,
  lucidePalette,
  lucidePanelLeftClose,
  lucidePanelLeftOpen,
  lucideRoute,
  lucideSliders,
  lucideStar,
  lucideTerminal,
} from '@ng-icons/lucide';

import { DOCS_NAV_GROUPS, DocNavGroup, DocNavItem } from '../../landing/docs-nav.data';
import { SidebarService } from '../../core/services/sidebar.service';

type NavItem = {
  readonly label: string;
  readonly icon: string;
  readonly routerLink?: string;
  readonly fragment?: string;
  readonly externalUrl?: string;
};

type NavGroup = {
  readonly label: string | null;
  readonly items: readonly NavItem[];
};

const MAIN_ITEMS: readonly NavItem[] = [
  { label: 'Home', routerLink: '/', icon: 'lucideHome' },
  { label: 'Features', routerLink: '/', fragment: 'features', icon: 'lucideStar' },
  { label: 'Examples', routerLink: '/examples', icon: 'lucideMap' },
  { label: 'Components', routerLink: '/docs', fragment: 'components', icon: 'lucideLayoutGrid' },
  { label: 'Installation', routerLink: '/docs', fragment: 'installation', icon: 'lucidePackage' },
  { label: 'API Reference', routerLink: '/api-reference', icon: 'lucideDatabase' },
  { label: 'Credits', routerLink: '/credits', icon: 'lucideHeart' },
];

function docGroupToNavGroup(group: DocNavGroup): NavGroup {
  return {
    label: group.label,
    items: group.items.map((item: DocNavItem) => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink,
      fragment: item.fragment,
      externalUrl: item.externalUrl,
    })),
  };
}

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, NgIcon],
  viewProviders: [
    provideIcons({
      lucideBookOpen,
      lucideDatabase,
      lucideHeart,
      lucideHome,
      lucideLayoutGrid,
      lucideMap,
      lucideMapPin,
      lucideMoon,
      lucideMonitor,
      lucideNavigation,
      lucidePackage,
      lucidePalette,
      lucidePanelLeftClose,
      lucidePanelLeftOpen,
      lucideRoute,
      lucideSliders,
      lucideStar,
      lucideTerminal,
    }),
  ],
  host: {
    role: 'navigation',
    'aria-label': 'Sidebar navigation',
    '[class.collapsed]': 'sidebarService.collapsed()',
    class: 'app-sidebar',
  },
  template: `
    <div class="sidebar-inner">
      <button
        type="button"
        class="toggle-btn"
        (click)="sidebarService.toggle()"
        [attr.aria-label]="
          sidebarService.collapsed() ? 'Expand sidebar' : 'Collapse sidebar'
        "
        [attr.aria-expanded]="!sidebarService.collapsed()"
      >
        @if (sidebarService.collapsed()) {
          <ng-icon name="lucidePanelLeftOpen" class="toggle-icon" aria-hidden="true" />
        } @else {
          <ng-icon name="lucidePanelLeftClose" class="toggle-icon" aria-hidden="true" />
        }
      </button>

      <nav class="sidebar-nav">
        @for (group of navGroups; track group.label) {
          @if (group.label && !sidebarService.collapsed()) {
            <span class="group-label">{{ group.label }}</span>
          }
          @if (group.label && sidebarService.collapsed()) {
            <div class="group-divider" aria-hidden="true"></div>
          }

          @for (item of group.items; track item.label) {
            @if (item.externalUrl) {
              <a
                class="sidebar-link"
                [href]="item.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                [title]="sidebarService.collapsed() ? item.label : ''"
                [attr.aria-label]="item.label"
              >
                <ng-icon [name]="item.icon" class="link-icon" aria-hidden="true" />
                @if (!sidebarService.collapsed()) {
                  <span class="link-label">{{ item.label }}</span>
                  <ng-icon name="lucideNavigation" class="external-icon" aria-hidden="true" />
                }
              </a>
            } @else {
              <a
                class="sidebar-link"
                [routerLink]="item.routerLink"
                [fragment]="item.fragment ?? undefined"
                routerLinkActive="sidebar-link-active"
                [routerLinkActiveOptions]="{ exact: item.routerLink === '/' && !item.fragment }"
                [title]="sidebarService.collapsed() ? item.label : ''"
                [attr.aria-label]="item.label"
              >
                <ng-icon [name]="item.icon" class="link-icon" aria-hidden="true" />
                @if (!sidebarService.collapsed()) {
                  <span class="link-label">{{ item.label }}</span>
                }
              </a>
            }
          }
        }
      </nav>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      width: 220px;
      height: calc(100vh - 56px);
      position: sticky;
      top: 56px;
      border-right: 1px solid var(--border);
      background: var(--sidebar, var(--background));
      transition: width 0.2s ease;
      overflow-y: auto;
      overflow-x: hidden;
      flex-shrink: 0;
    }
    :host.collapsed {
      width: 56px;
    }
    .sidebar-inner {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 0.75rem 0.5rem;
      gap: 0.25rem;
    }
    .toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      padding: 0;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: transparent;
      color: var(--muted-foreground);
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease;
      flex-shrink: 0;
      align-self: flex-end;
      margin-bottom: 0.5rem;
    }
    :host.collapsed .toggle-btn {
      align-self: center;
    }
    .toggle-btn:hover {
      background: var(--muted);
      color: var(--foreground);
    }
    .toggle-icon {
      font-size: 1rem;
    }
    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }
    .group-label {
      display: block;
      padding: 0.625rem 0.625rem 0.25rem;
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--muted-foreground);
      margin-top: 0.25rem;
    }
    .group-divider {
      height: 1px;
      background: var(--border);
      margin: 0.5rem 0.25rem;
    }
    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      padding: 0.5rem 0.625rem;
      border-radius: var(--radius-md);
      color: var(--muted-foreground);
      text-decoration: none;
      font-size: 0.875rem;
      white-space: nowrap;
      transition: background 0.15s ease, color 0.15s ease;
      min-height: 2.25rem;
    }
    :host.collapsed .sidebar-link {
      justify-content: center;
      padding-inline: 0;
    }
    .sidebar-link:hover {
      background: var(--muted);
      color: var(--foreground);
    }
    .sidebar-link-active {
      background: var(--muted);
      color: var(--foreground);
      font-weight: 600;
    }
    .link-icon {
      font-size: 1rem;
      flex-shrink: 0;
    }
    .link-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .external-icon {
      font-size: 0.625rem;
      opacity: 0.5;
      flex-shrink: 0;
      rotate: 45deg;
    }
  `,
})
export class SidebarComponent {
  readonly sidebarService = inject(SidebarService);

  readonly navGroups: readonly NavGroup[] = [
    { label: null, items: MAIN_ITEMS },
    ...DOCS_NAV_GROUPS.map(docGroupToNavGroup),
  ];
}
