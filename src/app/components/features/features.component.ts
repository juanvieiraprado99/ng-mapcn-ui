import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCog,
  lucideLayoutGrid,
  lucideMapPin,
  lucidePalette,
  lucideRoute,
  lucideSun,
} from '@ng-icons/lucide';

import { FEATURES } from '../../landing/landing.data';

@Component({
  selector: 'app-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-features' },
  imports: [NgIcon],
  viewProviders: [
    provideIcons({
      lucideSun,
      lucideCog,
      lucidePalette,
      lucideLayoutGrid,
      lucideMapPin,
      lucideRoute,
    }),
  ],
  template: `
    <section class="features-section app-section" id="features">
      <div class="section-header">
        <h2 class="section-title">Everything you need</h2>
        <p class="section-subtitle">Powerful map components with sensible defaults and full flexibility.</p>
      </div>
      <div class="features-grid">
        @for (f of features; track f.title) {
          <div class="feature-item">
            <span class="feature-icon" aria-hidden="true">
              <ng-icon [name]="f.icon" class="size-[1.125rem]" />
            </span>
            <div>
              <h3 class="feature-title">{{ f.title }}</h3>
              <p class="feature-desc">{{ f.description }}</p>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .features-section {
      padding-block: 5rem 6rem;
    }
    .section-header {
      text-align: center;
      margin-bottom: 3rem;
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
    .features-grid {
      display: grid;
      gap: 2rem 3rem;
      grid-template-columns: 1fr;
    }
    @media (min-width: 640px) {
      .features-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1024px) {
      .features-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .feature-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    .feature-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--foreground);
      flex-shrink: 0;
      margin-top: 0.125rem;
      padding: 0.5rem;
      background: var(--muted);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
    }
    .feature-title {
      font-size: 0.9375rem;
      font-weight: 600;
      margin: 0 0 0.375rem;
      color: var(--foreground);
    }
    .feature-desc {
      margin: 0;
      font-size: 0.875rem;
      color: var(--muted-foreground);
      line-height: 1.6;
    }
  `,
})
export class FeaturesComponent {
  readonly features = FEATURES;
}
