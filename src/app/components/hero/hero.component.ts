import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ZardButtonComponent } from '@/components/ui/button/button.component';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-hero' },
  imports: [ZardButtonComponent, RouterLink],
  template: `
    <section class="hero-section">
      <h1 class="hero-title">
        Beautiful maps,<br />made simple
      </h1>
      <p class="hero-subtitle">
        Ready to use, customizable map components for Angular.<br />
        Built on MapLibre GL. Styled like shadcn/ui.
      </p>
      <div class="hero-ctas">
        <a
          z-button
          zType="default"
          routerLink="/docs"
          fragment="installation"
          aria-label="Get started with installation"
        >
          Get Started
        </a>
        <a
          z-button
          zType="outline"
          routerLink="/docs"
          fragment="components"
          aria-label="View map components"
        >
          View Components
        </a>
      </div>
    </section>
  `,
  styles: `
    .hero-section {
      text-align: center;
      padding-block: 6rem 4rem;
      padding-inline: 1.5rem;
      max-width: 760px;
      margin-inline: auto;
    }
    .hero-title {
      font-size: clamp(2.75rem, 6vw, 4.5rem);
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -0.03em;
      margin: 0 0 1.5rem;
      color: var(--foreground);
    }
    .hero-subtitle {
      font-size: 1.125rem;
      color: var(--muted-foreground);
      line-height: 1.65;
      margin: 0 0 2.5rem;
    }
    .hero-ctas {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
    }
    .hero-ctas a[z-button] {
      text-decoration: none;
    }
  `,
})
export class HeroComponent {}
