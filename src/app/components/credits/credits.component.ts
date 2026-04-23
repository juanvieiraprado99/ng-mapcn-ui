import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink, lucideHeart, lucideMap, lucideLayoutGrid, lucidePalette } from '@ng-icons/lucide';

import { ZardBadgeComponent } from '@/components/ui/badge/badge.component';
import { ZardButtonComponent } from '@/components/ui/button/button.component';

import { MAPCN_URL, MAPLIBRE_URL, ZARDUI_URL } from '../../landing/landing.data';

interface CreditItem {
  readonly category: string;
  readonly name: string;
  readonly url: string;
  readonly icon: string;
  readonly role: string;
  readonly description: string;
}

@Component({
  selector: 'app-credits',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ZardBadgeComponent, ZardButtonComponent, NgIcon],
  viewProviders: [provideIcons({ lucideExternalLink, lucideHeart, lucideMap, lucideLayoutGrid, lucidePalette })],
  template: `
    <section class="credits-section app-section">
      <div class="credits-hero">
        <div class="credits-eyebrow">
          <ng-icon name="lucideHeart" class="eyebrow-icon" aria-hidden="true" />
          <span>Open Source</span>
        </div>
        <h1 class="credits-title">Built on great shoulders</h1>
        <p class="credits-subtitle">
          ng-mapcn would not exist without these outstanding open-source
          projects. We are grateful to their authors and contributors.
        </p>
        <div class="credits-divider" aria-hidden="true">
          <span class="divider-dot"></span>
          <span class="divider-dot"></span>
          <span class="divider-dot"></span>
        </div>
      </div>

      <div class="credits-grid">
        @for (item of credits; track item.name) {
          <article class="credit-card">
            <div class="card-top">
              <div class="card-icon-wrap">
                <ng-icon [name]="item.icon" class="card-icon" aria-hidden="true" />
              </div>
              <z-badge zType="secondary" class="card-badge">{{ item.category }}</z-badge>
            </div>
            <h2 class="card-name">{{ item.name }}</h2>
            <p class="card-role">{{ item.role }}</p>
            <p class="card-desc">{{ item.description }}</p>
            <a
              z-button
              zType="outline"
              class="card-link"
              [href]="item.url"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="'Visit ' + item.name + ' website'"
            >
              Visit {{ item.name }}
              <ng-icon name="lucideExternalLink" class="size-4" aria-hidden="true" />
            </a>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .credits-section {
      max-width: 1100px;
      margin-inline: auto;
      padding: 4rem 1.5rem 6rem;
    }
    .credits-hero {
      text-align: center;
      padding-block: 2rem 1rem;
      margin-bottom: 3.5rem;
    }
    .credits-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.8125rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--primary);
      margin-bottom: 1.25rem;
    }
    .eyebrow-icon {
      font-size: 0.875rem;
    }
    .credits-title {
      font-size: clamp(2.25rem, 5vw, 3.5rem);
      font-weight: 700;
      color: var(--foreground);
      margin: 0 0 1.25rem;
      letter-spacing: -0.03em;
      line-height: 1.1;
    }
    .credits-subtitle {
      font-size: 1.0625rem;
      color: var(--muted-foreground);
      max-width: 480px;
      margin-inline: auto;
      line-height: 1.7;
      margin-bottom: 2.5rem;
    }
    .credits-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .divider-dot {
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background: var(--border);
    }
    .divider-dot:nth-child(2) {
      background: var(--primary);
      opacity: 0.6;
    }
    .credits-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .credits-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .credit-card {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1.75rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--card);
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .credit-card:hover {
      border-color: var(--ring);
      box-shadow: 0 4px 20px color-mix(in srgb, var(--foreground) 6%, transparent);
    }
    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .card-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--radius-md);
      background: var(--muted);
      color: var(--foreground);
    }
    .card-icon {
      font-size: 1.125rem;
    }
    .card-badge {
      font-size: 0.6875rem;
    }
    .card-name {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--foreground);
      margin: 0;
    }
    .card-role {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--primary);
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .card-desc {
      font-size: 0.9375rem;
      color: var(--muted-foreground);
      line-height: 1.6;
      margin: 0;
      flex: 1;
    }
    .card-link {
      text-decoration: none;
      margin-top: 0.5rem;
      gap: 0.5rem;
      display: inline-flex;
      align-items: center;
    }
  `,
})
export class CreditsComponent {
  readonly MAPCN_URL = MAPCN_URL;
  readonly MAPLIBRE_URL = MAPLIBRE_URL;
  readonly ZARDUI_URL = ZARDUI_URL;

  readonly credits: readonly CreditItem[] = [
    {
      category: 'Map Engine',
      name: 'MapLibre GL JS',
      url: MAPLIBRE_URL,
      icon: 'lucideMap',
      role: 'Core rendering engine',
      description:
        'The open-source TypeScript library that powers all map rendering in ng-mapcn. MapLibre GL JS provides GPU-accelerated vector tile rendering, making smooth and performant maps possible.',
    },
    {
      category: 'Reference',
      name: 'mapcn',
      url: MAPCN_URL,
      icon: 'lucideLayoutGrid',
      role: 'Design & API reference',
      description:
        'The React implementation that served as the primary reference for ng-mapcn\'s component API, design decisions, and overall developer experience. Built on MapLibre and styled with Tailwind.',
    },
    {
      category: 'UI Library',
      name: 'Zard UI',
      url: ZARDUI_URL,
      icon: 'lucidePalette',
      role: 'Component library',
      description:
        'The shadcn/ui-inspired Angular component library used throughout ng-mapcn\'s interface. Built natively for Angular with Signals and Tailwind CSS v4, providing accessible and composable primitives.',
    },
  ];
}
