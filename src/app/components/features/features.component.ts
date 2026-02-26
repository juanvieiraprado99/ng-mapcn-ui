import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FEATURES } from '../../landing/landing.data';

@Component({
  selector: 'app-features',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-features' },
  imports: [CardModule],
  template: `
    <section class="features-section app-section" id="features">
      <h2 class="section-title">Características</h2>
      <div class="features-grid">
        @for (f of features; track f.title) {
          <div class="feature-card p-card">
            <div class="p-card-body">
              <span
                [class]="f.icon"
                class="feature-icon"
                aria-hidden="true"
              ></span>
              <h3 class="p-card-title">{{ f.title }}</h3>
              <p class="p-card-content">{{ f.description }}</p>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .features-section {
      padding-block: 4rem 6rem;
    }
    .section-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 2rem;
      text-align: center;
      color: var(--foreground);
    }
    .features-grid {
      display: grid;
      gap: 1.5rem;
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
    .feature-card {
      border-radius: var(--border-radius);
      border: 1px solid var(--border);
      padding: 1.5rem;
      background: var(--background);
    }
    .feature-icon {
      font-size: 1.5rem;
      color: var(--primary);
      display: block;
      margin-bottom: 0.75rem;
    }
    .p-card-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 0.5rem;
    }
    .p-card-content {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--muted-foreground);
      line-height: 1.5;
    }
  `,
})
export class FeaturesComponent {
  readonly features = FEATURES;
}
