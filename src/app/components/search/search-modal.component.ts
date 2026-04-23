import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { Router } from '@angular/router';
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
  lucideRoute,
  lucideSearch,
  lucideSliders,
  lucideStar,
  lucideTerminal,
  lucideX,
} from '@ng-icons/lucide';

import { SearchService, SearchItem } from '../../core/services/search.service';

@Component({
  selector: 'app-search-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
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
      lucideRoute,
      lucideSearch,
      lucideSliders,
      lucideStar,
      lucideTerminal,
      lucideX,
    }),
  ],
  host: {
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
  template: `
    @if (searchService.isOpen()) {
      <div
        class="backdrop"
        role="presentation"
        (click)="searchService.close()"
      ></div>
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div class="search-input-wrap">
          <ng-icon name="lucideSearch" class="input-icon" aria-hidden="true" />
          <input
            #searchInput
            class="search-input"
            type="text"
            placeholder="Search pages and sections..."
            autocomplete="off"
            spellcheck="false"
            aria-label="Search"
            [value]="query()"
            (input)="onInput($event)"
            (keydown)="onInputKeydown($event)"
          />
          @if (query()) {
            <button
              type="button"
              class="clear-btn"
              aria-label="Clear search"
              (click)="clearQuery()"
            >
              <ng-icon name="lucideX" class="clear-icon" aria-hidden="true" />
            </button>
          }
          <kbd class="esc-hint">esc</kbd>
        </div>

        <div class="results-wrap" role="listbox" aria-label="Search results">
          @if (results().length === 0) {
            <div class="no-results">No results for "{{ query() }}"</div>
          } @else {
            @for (item of results(); track item.label; let i = $index) {
              <button
                type="button"
                class="result-item"
                [class.result-item-active]="i === focusedIndex()"
                role="option"
                [attr.aria-selected]="i === focusedIndex()"
                (click)="navigate(item)"
                (mouseenter)="focusedIndex.set(i)"
              >
                <div class="result-icon-wrap">
                  <ng-icon [name]="item.icon" class="result-icon" aria-hidden="true" />
                </div>
                <div class="result-text">
                  <span class="result-label">{{ item.label }}</span>
                  <span class="result-desc">{{ item.description }}</span>
                </div>
                <kbd class="result-enter">↵</kbd>
              </button>
            }
          }
        </div>

        <div class="modal-footer">
          <span class="hint"><kbd>↑↓</kbd> navigate</span>
          <span class="hint"><kbd>↵</kbd> select</span>
          <span class="hint"><kbd>esc</kbd> close</span>
        </div>
      </div>
    }
  `,
  styles: `
    .backdrop {
      position: fixed;
      inset: 0;
      background: color-mix(in srgb, var(--background) 60%, transparent);
      backdrop-filter: blur(4px);
      z-index: 199;
    }
    .modal {
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: min(600px, calc(100vw - 2rem));
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      box-shadow:
        0 16px 48px color-mix(in srgb, var(--foreground) 12%, transparent),
        0 4px 16px color-mix(in srgb, var(--foreground) 6%, transparent);
      z-index: 200;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .search-input-wrap {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      padding: 0.875rem 1rem;
      border-bottom: 1px solid var(--border);
    }
    .input-icon {
      font-size: 1rem;
      color: var(--muted-foreground);
      flex-shrink: 0;
    }
    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-size: 0.9375rem;
      color: var(--foreground);
      font-family: inherit;
    }
    .search-input::placeholder {
      color: var(--muted-foreground);
    }
    .clear-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border: none;
      background: var(--muted);
      border-radius: var(--radius-sm);
      color: var(--muted-foreground);
      cursor: pointer;
      flex-shrink: 0;
    }
    .clear-btn:hover {
      color: var(--foreground);
    }
    .clear-icon {
      font-size: 0.75rem;
    }
    .esc-hint {
      font-size: 0.6875rem;
      padding: 0.125rem 0.375rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--muted-foreground);
      background: var(--muted);
      flex-shrink: 0;
    }
    .results-wrap {
      max-height: 320px;
      overflow-y: auto;
      padding: 0.375rem;
    }
    .no-results {
      padding: 2rem;
      text-align: center;
      font-size: 0.875rem;
      color: var(--muted-foreground);
    }
    .result-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.625rem 0.75rem;
      border: none;
      background: transparent;
      border-radius: var(--radius-md);
      cursor: pointer;
      text-align: left;
      transition: background 0.1s ease;
    }
    .result-item:hover,
    .result-item-active {
      background: var(--muted);
    }
    .result-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: var(--radius-md);
      background: var(--background);
      border: 1px solid var(--border);
      flex-shrink: 0;
      color: var(--foreground);
    }
    .result-icon {
      font-size: 0.875rem;
    }
    .result-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
      min-width: 0;
    }
    .result-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--foreground);
    }
    .result-desc {
      font-size: 0.75rem;
      color: var(--muted-foreground);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .result-enter {
      font-size: 0.6875rem;
      padding: 0.125rem 0.375rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--muted-foreground);
      background: var(--background);
      opacity: 0;
      transition: opacity 0.1s ease;
      flex-shrink: 0;
    }
    .result-item-active .result-enter {
      opacity: 1;
    }
    .modal-footer {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.625rem 1rem;
      border-top: 1px solid var(--border);
      background: var(--muted);
    }
    .hint {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.6875rem;
      color: var(--muted-foreground);
    }
    .hint kbd {
      padding: 0.125rem 0.375rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--background);
      font-family: inherit;
    }
  `,
})
export class SearchModalComponent implements AfterViewChecked {
  readonly searchService = inject(SearchService);
  private readonly router = inject(Router);

  @ViewChild('searchInput') private searchInputRef?: ElementRef<HTMLInputElement>;

  readonly query = signal('');
  readonly focusedIndex = signal(0);

  private needsFocus = false;

  readonly results = computed(() =>
    this.searchService.filter(this.query()),
  );

  ngAfterViewChecked(): void {
    if (this.needsFocus && this.searchInputRef) {
      this.searchInputRef.nativeElement.focus();
      this.needsFocus = false;
    }
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.searchService.toggle();
      if (this.searchService.isOpen()) {
        this.reset();
        this.needsFocus = true;
      }
      return;
    }

    if (!this.searchService.isOpen()) return;

    if (event.key === 'Escape') {
      this.searchService.close();
      return;
    }

    const total = this.results().length;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusedIndex.update(i => (i + 1) % total);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusedIndex.update(i => (i - 1 + total) % total);
    } else if (event.key === 'Enter') {
      const item = this.results()[this.focusedIndex()];
      if (item) this.navigate(item);
    }
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.focusedIndex.set(0);
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
    }
  }

  navigate(item: SearchItem): void {
    this.searchService.close();
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    this.router.navigate([item.routerLink], {
      fragment: item.fragment,
    });
  }

  clearQuery(): void {
    this.query.set('');
    this.focusedIndex.set(0);
    this.searchInputRef?.nativeElement.focus();
  }

  private reset(): void {
    this.query.set('');
    this.focusedIndex.set(0);
  }
}
