import { NgComponentOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  signal,
  Type,
  ViewChildren,
} from '@angular/core';

import { ZardTableImports } from '@/components/ui/table/table.imports';
import { CodeBlockComponent } from '../../components/code-block/code-block.component';
import {
  BasicMapExampleComponent,
  ControlsMapExampleComponent,
  MarkersMapExampleComponent,
  RoutesMapExampleComponent,
} from '../../components/examples/example-maps';
import { API_SECTIONS, ApiSection } from './api-reference.data';

const SECTION_MAP_PREVIEWS = new Map<string, Type<unknown>>([
  ['ng-map', BasicMapExampleComponent],
  ['ng-marker', MarkersMapExampleComponent],
  ['ng-route', RoutesMapExampleComponent],
  ['ng-map-controls', ControlsMapExampleComponent],
]);

@Component({
  selector: 'app-api-reference-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...ZardTableImports, CodeBlockComponent, NgComponentOutlet],
  template: `
    <div class="api-ref-layout">
      <!-- Internal anchor sidebar -->
      <aside class="api-ref-sidebar" aria-label="API navigation">
        <div class="sidebar-group-label">Components</div>
        @for (section of componentSections; track section.id) {
          <button
            type="button"
            class="sidebar-anchor"
            [class.active]="activeSectionId() === section.id"
            (click)="scrollTo(section.id)"
          >
            @if (section.selector) {
              <code class="anchor-code">&lt;{{ section.selector }}&gt;</code>
            } @else {
              {{ section.title }}
            }
          </button>
        }

        <div class="sidebar-group-label sidebar-group-label--mt">
          Interfaces
        </div>
        @for (section of interfaceSections; track section.id) {
          <button
            type="button"
            class="sidebar-anchor"
            [class.active]="activeSectionId() === section.id"
            (click)="scrollTo(section.id)"
          >
            <code class="anchor-code">{{ section.title }}</code>
          </button>
        }
      </aside>

      <div class="api-ref-content">
        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <span class="breadcrumb-item">Docs</span>
          <span class="breadcrumb-sep" aria-hidden="true">/</span>
          <span class="breadcrumb-item breadcrumb-item--active"
            >API Reference</span
          >
        </nav>

        <header class="page-header">
          <h1 class="page-title">API Reference</h1>
          <p class="page-subtitle">
            All components, inputs, outputs, and interfaces exported by the
            library
            <code class="pkg-badge">ng-mapcn</code>.
          </p>
        </header>

        <!-- Sections -->
        @for (section of sections; track section.id) {
          <section class="api-section" [id]="section.id" #sectionEl>
            <!-- Section header -->
            <div class="section-header">
              <div class="section-title-row">
                <h2 class="section-title">{{ section.title }}</h2>
                <span
                  class="type-badge"
                  [class]="'type-badge--' + section.type"
                >
                  {{ section.type === 'component' ? 'Component' : 'Interface' }}
                </span>
              </div>
              @if (section.selector) {
                <code class="section-selector"
                  >&lt;{{ section.selector }}&gt;</code
                >
              }
              <p class="section-desc">{{ section.description }}</p>
            </div>

            @if (getSectionMapPreview(section.id); as previewCmp) {
              <div
                class="section-map-preview"
                role="region"
                [attr.aria-label]="section.title + ' live map preview'"
              >
                <div class="preview-reference">
                  Reference:
                  <code class="preview-reference-code"
                    >&lt;{{ section.selector }}&gt;</code
                  >
                </div>
                <div class="section-map-canvas">
                  <ng-container *ngComponentOutlet="previewCmp" />
                </div>
              </div>
            }

            <!-- Inputs table -->
            @if (section.inputs?.length) {
              <div class="table-group">
                <h3 class="table-group-title">Inputs</h3>
                <div
                  class="table-wrap"
                  role="region"
                  [attr.aria-label]="section.title + ' inputs'"
                >
                  <table
                    z-table
                    zType="striped"
                    zSize="compact"
                    class="api-table"
                  >
                    <thead z-table-header>
                      <tr z-table-row>
                        <th z-table-head>Name</th>
                        <th z-table-head>Type</th>
                        <th z-table-head>Default</th>
                        <th z-table-head>Description</th>
                      </tr>
                    </thead>
                    <tbody z-table-body>
                      @for (prop of section.inputs; track prop.name) {
                        <tr z-table-row>
                          <td z-table-cell>
                            <span class="prop-wrap">
                              <code class="prop-name">{{ prop.name }}</code>
                              @if (prop.required) {
                                <span class="required-star" title="Required"
                                  >*</span
                                >
                              }
                            </span>
                          </td>
                          <td z-table-cell>
                            <code
                              class="type-code"
                              [class]="getTypeClass(prop.type)"
                              >{{ prop.type }}</code
                            >
                          </td>
                          <td z-table-cell>
                            @if (prop.default) {
                              <code class="default-code">{{
                                prop.default
                              }}</code>
                            } @else {
                              <span class="no-val">—</span>
                            }
                          </td>
                          <td z-table-cell class="desc-cell">
                            {{ prop.description }}
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            }

            <!-- Outputs table -->
            @if (section.outputs?.length) {
              <div class="table-group">
                <h3 class="table-group-title">Outputs</h3>
                <div
                  class="table-wrap"
                  role="region"
                  [attr.aria-label]="section.title + ' outputs'"
                >
                  <table
                    z-table
                    zType="striped"
                    zSize="compact"
                    class="api-table"
                  >
                    <thead z-table-header>
                      <tr z-table-row>
                        <th z-table-head>Name</th>
                        <th z-table-head>Emitted Type</th>
                        <th z-table-head>Description</th>
                      </tr>
                    </thead>
                    <tbody z-table-body>
                      @for (prop of section.outputs; track prop.name) {
                        <tr z-table-row>
                          <td z-table-cell>
                            <code class="prop-name">{{ prop.name }}</code>
                          </td>
                          <td z-table-cell>
                            <code
                              class="type-code"
                              [class]="getTypeClass(prop.type)"
                              >{{ prop.type }}</code
                            >
                          </td>
                          <td z-table-cell class="desc-cell">
                            {{ prop.description }}
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            }

            <!-- Properties table (interfaces) -->
            @if (section.properties?.length) {
              <div class="table-group">
                <h3 class="table-group-title">Properties</h3>
                <div
                  class="table-wrap"
                  role="region"
                  [attr.aria-label]="section.title + ' properties'"
                >
                  <table
                    z-table
                    zType="striped"
                    zSize="compact"
                    class="api-table"
                  >
                    <thead z-table-header>
                      <tr z-table-row>
                        <th z-table-head>Property</th>
                        <th z-table-head>Type</th>
                        <th z-table-head>Required</th>
                        <th z-table-head>Default</th>
                        <th z-table-head>Description</th>
                      </tr>
                    </thead>
                    <tbody z-table-body>
                      @for (prop of section.properties; track prop.name) {
                        <tr z-table-row>
                          <td z-table-cell>
                            <code class="prop-name">{{ prop.name }}</code>
                          </td>
                          <td z-table-cell>
                            <code
                              class="type-code"
                              [class]="getTypeClass(prop.type)"
                              >{{ prop.type }}</code
                            >
                          </td>
                          <td z-table-cell>
                            @if (prop.required) {
                              <span class="required-check" title="Required"
                                >✓</span
                              >
                            } @else {
                              <span class="no-val">—</span>
                            }
                          </td>
                          <td z-table-cell>
                            @if (prop.default) {
                              <code class="default-code">{{
                                prop.default
                              }}</code>
                            } @else {
                              <span class="no-val">—</span>
                            }
                          </td>
                          <td z-table-cell class="desc-cell">
                            {{ prop.description }}
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            }

            <!-- Code example -->
            @if (section.codeExample) {
              <div class="code-example-group">
                <h3 class="table-group-title">Example</h3>
                <app-code-block [code]="section.codeExample" language="html" />
              </div>
            }

            <hr class="section-divider" />
          </section>
        }

        <!-- Back to top button -->
        <button
          type="button"
          class="back-to-top"
          (click)="scrollToTop()"
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </div>
  `,
  styles: `
    .api-ref-layout {
      display: grid;
      grid-template-columns: 240px 1fr;
      min-height: calc(100vh - 56px);
    }

    /* ── Internal sidebar ── */
    .api-ref-sidebar {
      position: sticky;
      top: 56px;
      height: calc(100vh - 56px);
      overflow-y: auto;
      padding: 2rem 0.75rem 2rem 1.25rem;
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
      flex-shrink: 0;
    }

    .sidebar-group-label {
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--muted-foreground);
      padding: 0.375rem 0.5rem 0.25rem;
      margin-top: 0.25rem;
    }

    .sidebar-group-label--mt {
      margin-top: 1rem;
    }

    .sidebar-anchor {
      display: block;
      width: 100%;
      text-align: left;
      padding: 0.375rem 0.5rem;
      border-radius: var(--radius-md);
      border: none;
      background: transparent;
      color: var(--muted-foreground);
      font-size: 0.8125rem;
      font-family: inherit;
      cursor: pointer;
      transition:
        background 0.15s ease,
        color 0.15s ease;
    }

    .sidebar-anchor:hover {
      background: var(--muted);
      color: var(--foreground);
    }

    .sidebar-anchor.active {
      background: var(--muted);
      color: var(--foreground);
      font-weight: 600;
    }

    .anchor-code {
      font-size: 0.8rem;
      color: inherit;
      background: transparent;
      font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
    }

    .api-ref-content {
      max-width: 1100px;
      margin-inline: auto;
      padding: 2rem 2.5rem 4rem;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      color: var(--muted-foreground);
      margin-bottom: 1.5rem;
    }

    .breadcrumb-sep {
      opacity: 0.5;
    }

    .breadcrumb-item--active {
      color: var(--foreground);
      font-weight: 500;
    }

    .page-header {
      margin-bottom: 3rem;
    }

    .page-title {
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      font-weight: 700;
      letter-spacing: -0.025em;
      color: var(--foreground);
      margin: 0 0 0.75rem;
    }

    .page-subtitle {
      font-size: 1rem;
      color: var(--muted-foreground);
      margin: 0;
      line-height: 1.6;
    }

    .pkg-badge {
      font-size: 0.875em;
      background: var(--muted);
      color: var(--foreground);
      padding: 0.15em 0.45em;
      border-radius: 0.25rem;
      border: 1px solid var(--border);
    }

    /* ── Section ── */
    .api-section {
      scroll-margin-top: 72px;
    }

    .section-header {
      margin-bottom: 1.75rem;
    }

    .section-title-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 0.375rem;
    }

    .section-title {
      font-size: 1.375rem;
      font-weight: 700;
      letter-spacing: -0.015em;
      color: var(--foreground);
      margin: 0;
    }

    .type-badge {
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 0.2em 0.55em;
      border-radius: 999px;
      border: 1px solid;
    }

    .type-badge--component {
      background: color-mix(in oklch, var(--primary) 10%, transparent);
      color: var(--primary);
      border-color: color-mix(in oklch, var(--primary) 30%, transparent);
    }

    .type-badge--interface {
      background: color-mix(in oklch, oklch(0.6 0.2 300) 10%, transparent);
      color: oklch(0.55 0.2 300);
      border-color: color-mix(in oklch, oklch(0.6 0.2 300) 30%, transparent);
    }

    .section-selector {
      display: inline-block;
      font-size: 0.875rem;
      color: var(--muted-foreground);
      background: var(--muted);
      padding: 0.2em 0.55em;
      border-radius: 0.25rem;
      border: 1px solid var(--border);
      margin-bottom: 0.75rem;
      font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
    }

    .section-desc {
      font-size: 0.9375rem;
      color: var(--muted-foreground);
      line-height: 1.6;
      margin: 0;
    }

    .section-map-preview {
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border);
      background: var(--muted);
      margin-bottom: 1.75rem;
    }

    .preview-reference {
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      color: var(--muted-foreground);
      border-bottom: 1px solid var(--border);
      background: color-mix(in oklch, var(--background) 88%, var(--muted) 12%);
    }

    .preview-reference-code {
      margin-left: 0.35rem;
      font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
      color: var(--foreground);
    }

    .section-map-canvas {
      height: 240px;
    }

    .section-map-canvas ::ng-deep .example-map-container {
      display: block;
      height: 100%;
    }

    .section-map-canvas ::ng-deep .map-wrapper {
      height: 100% !important;
      border-radius: 0;
    }

    /* ── Tables ── */
    .table-group {
      margin-bottom: 1.75rem;
    }

    .table-group-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--foreground);
      margin: 0 0 0.625rem;
      letter-spacing: -0.01em;
    }

    .table-wrap {
      overflow-x: auto;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
    }

    .api-table {
      min-width: 44rem;
    }

    .prop-wrap {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    .prop-name {
      font-size: 0.8125rem;
      font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
      color: var(--foreground);
      background: transparent;
    }

    .required-star {
      font-size: 0.75rem;
      font-weight: 700;
      color: #ef4444;
      line-height: 1;
    }

    .required-check {
      font-size: 0.875rem;
      color: #22c55e;
      font-weight: 700;
    }

    .type-code {
      font-size: 0.775rem;
      font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
      padding: 0.15em 0.4em;
      border-radius: 0.25rem;
      white-space: nowrap;
    }

    .type-code--string {
      background: color-mix(in oklch, oklch(0.6 0.2 240) 12%, transparent);
      color: oklch(0.5 0.18 240);
    }

    .type-code--boolean {
      background: color-mix(in oklch, oklch(0.6 0.2 150) 12%, transparent);
      color: oklch(0.48 0.16 150);
    }

    .type-code--number {
      background: color-mix(in oklch, oklch(0.7 0.18 60) 14%, transparent);
      color: oklch(0.52 0.15 60);
    }

    .type-code--interface {
      background: color-mix(in oklch, oklch(0.6 0.2 300) 12%, transparent);
      color: oklch(0.5 0.18 300);
    }

    .type-code--default {
      background: var(--muted);
      color: var(--foreground);
    }

    .default-code {
      font-size: 0.775rem;
      font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
      background: var(--muted);
      color: var(--foreground);
      padding: 0.15em 0.4em;
      border-radius: 0.25rem;
    }

    .no-val {
      color: var(--muted-foreground);
    }

    .desc-cell {
      font-size: 0.875rem;
      color: var(--muted-foreground);
      line-height: 1.5;
    }

    .code-example-group {
      margin-bottom: 1.75rem;
    }

    .section-divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: 2.5rem 0;
    }

    /* ── Back to top button ── */
    .back-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 1px solid var(--border);
      background: var(--background);
      color: var(--foreground);
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px
        color-mix(in oklch, var(--foreground) 10%, transparent);
      transition:
        background 0.15s ease,
        box-shadow 0.15s ease;
      z-index: 50;
    }

    .back-to-top:hover {
      background: var(--muted);
      box-shadow: 0 4px 12px
        color-mix(in oklch, var(--foreground) 15%, transparent);
    }

    @media (max-width: 1024px) {
      .api-ref-layout {
        grid-template-columns: 200px 1fr;
      }
    }

    @media (max-width: 768px) {
      .api-ref-layout {
        grid-template-columns: 1fr;
      }

      .api-ref-sidebar {
        display: none;
      }

      .api-ref-content {
        width: 100%;
        max-width: 100vw;
        padding: 1.25rem 1rem 3rem;
        box-sizing: border-box;
      }

      .back-to-top {
        bottom: 1.25rem;
        right: 1.25rem;
      }
    }
  `,
})
export class ApiReferencePageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('sectionEl') sectionElements!: QueryList<
    ElementRef<HTMLElement>
  >;

  readonly sections: ApiSection[] = API_SECTIONS;
  readonly componentSections = API_SECTIONS.filter(
    (s) => s.type === 'component',
  );
  readonly interfaceSections = API_SECTIONS.filter(
    (s) => s.type === 'interface',
  );
  readonly activeSectionId = signal<string>(API_SECTIONS[0]?.id ?? '');

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) this.activeSectionId.set(visible.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );
    this.sectionElements.forEach((ref) =>
      this.observer!.observe(ref.nativeElement),
    );
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollTo(id: string): void {
    this.activeSectionId.set(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getSectionMapPreview(sectionId: string): Type<unknown> | undefined {
    return SECTION_MAP_PREVIEWS.get(sectionId);
  }

  getTypeClass(type: string): string {
    const t = type.toLowerCase();
    if (t.startsWith('string') || t.startsWith("'")) return 'type-code--string';
    if (t === 'boolean') return 'type-code--boolean';
    if (t === 'number') return 'type-code--number';
    if (
      /^[A-Z]/.test(type) ||
      type.includes('Config') ||
      type.includes('Event')
    ) {
      return 'type-code--interface';
    }
    return 'type-code--default';
  }
}
