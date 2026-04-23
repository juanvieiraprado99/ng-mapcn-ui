import { Injectable, signal } from '@angular/core';

import { DOCS_NAV_GROUPS } from '../../landing/docs-nav.data';

export type SearchItem = {
  readonly label: string;
  readonly description: string;
  readonly routerLink: string;
  readonly fragment?: string;
  readonly externalUrl?: string;
  readonly icon: string;
};

const DOCS_ITEMS: readonly SearchItem[] = DOCS_NAV_GROUPS.flatMap(group =>
  group.items.map(item => ({
    label: item.label,
    description: item.description,
    routerLink: item.routerLink ?? '/',
    fragment: item.fragment,
    externalUrl: item.externalUrl,
    icon: item.icon,
  })),
);

@Injectable({ providedIn: 'root' })
export class SearchService {
  readonly isOpen = signal(false);

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  readonly items: readonly SearchItem[] = [
    {
      label: 'Home',
      description: 'Landing page',
      routerLink: '/',
      icon: 'lucideHome',
    },
    {
      label: 'Features',
      description: 'Library features overview',
      routerLink: '/',
      fragment: 'features',
      icon: 'lucideStar',
    },
    {
      label: 'Examples',
      description: 'Interactive map examples',
      routerLink: '/examples',
      icon: 'lucideMap',
    },
    {
      label: 'Components',
      description: 'Component reference',
      routerLink: '/docs',
      fragment: 'components',
      icon: 'lucideLayoutGrid',
    },
    {
      label: 'Installation',
      description: 'Get started / install',
      routerLink: '/docs',
      fragment: 'installation',
      icon: 'lucidePackage',
    },
    {
      label: 'Credits',
      description: 'Open-source acknowledgements',
      routerLink: '/credits',
      icon: 'lucideHeart',
    },
    ...DOCS_ITEMS,
  ];

  filter(query: string): readonly SearchItem[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.items;
    return this.items.filter(
      i =>
        i.label.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q),
    );
  }
}
