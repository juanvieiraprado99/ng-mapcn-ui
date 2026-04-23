import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GITHUB_URL, MAPCN_URL, NPM_URL } from '../../landing/landing.data';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  host: {
    class: 'app-footer',
    role: 'contentinfo',
  },
  template: `
    <footer class="footer-bar">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="footer-logo">ng-mapcn</span>
          <p class="footer-tagline">Beautiful map components for Angular.</p>
          <p class="footer-beta">Currently in beta — API may evolve. Follow releases on GitHub.</p>
        </div>
        <nav class="footer-cols" aria-label="Footer navigation">
          <div class="footer-col">
            <h3 class="col-title">Product</h3>
            <a routerLink="/" fragment="features">Features</a>
            <a routerLink="/examples">Examples</a>
            <a routerLink="/docs" fragment="components">Components</a>
            <a routerLink="/docs" fragment="installation">Installation</a>
          </div>
          <div class="footer-col">
            <h3 class="col-title">Community</h3>
            <a [href]="GITHUB_URL" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a [href]="GITHUB_URL + '/issues'" target="_blank" rel="noopener noreferrer">Report a bug</a>
          </div>
          <div class="footer-col">
            <h3 class="col-title">Resources</h3>
            <a [href]="MAPCN_URL" target="_blank" rel="noopener noreferrer">mapcn (React)</a>
            <a href="https://maplibre.org" target="_blank" rel="noopener noreferrer">MapLibre GL</a>
            <a [href]="NPM_URL" target="_blank" rel="noopener noreferrer">npm</a>
          </div>
        </nav>
      </div>
      <div class="footer-bottom">
        <span>MIT License</span>
        <span class="sep">·</span>
        <span>Inspired by <a [href]="MAPCN_URL" target="_blank" rel="noopener noreferrer">mapcn</a></span>
      </div>
    </footer>
  `,
  styles: `
    .footer-bar {
      padding: 3rem 1.5rem 2rem;
      border-top: 1px solid var(--border);
      background: var(--background);
      color: var(--muted-foreground);
      font-size: 0.875rem;
    }
    .footer-inner {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      max-width: 1200px;
      margin-inline: auto;
    }
    @media (min-width: 768px) {
      .footer-inner {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
      }
    }
    .footer-brand {
      max-width: 260px;
    }
    .footer-logo {
      font-weight: 700;
      font-size: 1rem;
      color: var(--foreground);
    }
    .footer-tagline {
      margin: 0.5rem 0 0.375rem;
      color: var(--muted-foreground);
      line-height: 1.5;
    }
    .footer-beta {
      margin: 0;
      font-size: 0.8125rem;
      font-style: italic;
      color: var(--muted-foreground);
      line-height: 1.5;
    }
    .footer-cols {
      display: flex;
      gap: 3rem;
      flex-wrap: wrap;
    }
    .footer-col {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }
    .col-title {
      font-size: 0.8125rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--foreground);
      margin: 0 0 0.25rem;
    }
    .footer-col a {
      color: var(--muted-foreground);
      text-decoration: none;
      transition: color 0.15s;
    }
    .footer-col a:hover {
      color: var(--foreground);
    }
    .footer-bottom {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-top: 2.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
      font-size: 0.8125rem;
      max-width: 1200px;
      margin-inline: auto;
      margin-block-start: 2.5rem;
    }
    .footer-bottom a {
      color: var(--muted-foreground);
      text-decoration: none;
    }
    .footer-bottom a:hover {
      color: var(--foreground);
    }
    .sep {
      color: var(--border);
    }
  `,
})
export class FooterComponent {
  readonly GITHUB_URL = GITHUB_URL;
  readonly NPM_URL = NPM_URL;
  readonly MAPCN_URL = MAPCN_URL;
}
