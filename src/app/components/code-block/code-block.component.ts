import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';

import { ThemeService } from '../../core/services/theme.service';

hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);

const HLJS_LINK_ID = 'hljs-theme-link';

@Component({
  selector: 'app-code-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="code-block-wrapper">
      <button
        type="button"
        class="copy-btn"
        [attr.aria-label]="copied() ? 'Copiado' : 'Copiar código'"
        (click)="copy()"
      >
        {{ copied() ? 'Copiado!' : 'Copiar' }}
      </button>
      <pre class="code-pre"><code class="code-content" [innerHTML]="highlighted()"></code></pre>
    </div>
  `,
  styles: `
    .code-block-wrapper {
      position: relative;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      overflow: hidden;
      background: var(--muted);
    }

    .copy-btn {
      position: absolute;
      top: 0.625rem;
      right: 0.625rem;
      z-index: 1;
      padding: 0.25rem 0.625rem;
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      background: var(--background);
      color: var(--muted-foreground);
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease;
      font-family: inherit;
    }

    .copy-btn:hover {
      background: var(--muted);
      color: var(--foreground);
    }

    .code-pre {
      margin: 0;
      padding: 1.25rem 1rem;
      overflow-x: auto;
      font-size: 0.8125rem;
      line-height: 1.65;
      font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Consolas, monospace;
    }

    .code-content {
      background: transparent;
      font-family: inherit;
      font-size: inherit;
    }
  `,
})
export class CodeBlockComponent implements AfterViewInit, OnDestroy {
  readonly code = input.required<string>();
  readonly language = input<string>('html');

  private readonly themeService = inject(ThemeService);
  readonly copied = signal(false);
  private copyTimer: ReturnType<typeof setTimeout> | null = null;

  readonly highlighted = computed(() => {
    const lang = this.language();
    const raw = this.code();
    try {
      return hljs.highlight(raw, { language: lang }).value;
    } catch {
      return hljs.highlightAuto(raw).value;
    }
  });

  constructor() {
    effect(() => {
      const isDark = this.themeService.theme() === 'dark';
      this.applyThemeLink(isDark);
    });
  }

  ngAfterViewInit(): void {
    this.applyThemeLink(this.themeService.theme() === 'dark');
  }

  ngOnDestroy(): void {
    if (this.copyTimer) clearTimeout(this.copyTimer);
  }

  copy(): void {
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      this.copyTimer = setTimeout(() => this.copied.set(false), 2000);
    });
  }

  private applyThemeLink(isDark: boolean): void {
    const existing = document.getElementById(HLJS_LINK_ID) as HTMLLinkElement | null;
    const href = isDark
      ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css';

    if (existing) {
      existing.href = href;
    } else {
      const link = document.createElement('link');
      link.id = HLJS_LINK_ID;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }
}
