export type DocNavItem = {
  readonly label: string;
  readonly description: string;
  readonly icon: string;
  readonly routerLink?: string;
  readonly fragment?: string;
  readonly externalUrl?: string;
};

export type DocNavGroup = {
  readonly label: string;
  readonly icon: string;
  readonly items: readonly DocNavItem[];
};

export const DOCS_NAV_GROUPS: readonly DocNavGroup[] = [
  // {
  //   label: 'Models',
  //   icon: 'lucideDatabase',
  //   items: [
  //     {
  //       label: 'Map',
  //       description: 'MapStylesConfig, MapConfig interfaces',
  //       routerLink: '/docs',
  //       fragment: 'api-map',
  //       icon: 'lucideMap',
  //     },
  //     {
  //       label: 'Viewport',
  //       description: 'MapViewport interface',
  //       routerLink: '/docs',
  //       fragment: 'api-viewport',
  //       icon: 'lucideMonitor',
  //     },
  //     {
  //       label: 'Markers',
  //       description: 'MarkerConfig, PopupConfig, TooltipConfig interfaces',
  //       routerLink: '/docs',
  //       fragment: 'api-markers',
  //       icon: 'lucideMapPin',
  //     },
  //     {
  //       label: 'Routes',
  //       description: 'RouteConfig, RouteStop, RouteClickEvent interfaces',
  //       routerLink: '/docs',
  //       fragment: 'api-routes',
  //       icon: 'lucideRoute',
  //     },
  //     {
  //       label: 'OSRM',
  //       description: 'OsrmRouteOptions, OsrmRouteData interfaces',
  //       routerLink: '/docs',
  //       fragment: 'api-osrm',
  //       icon: 'lucideNavigation',
  //     },
  //     {
  //       label: 'Theme',
  //       description: 'ThemeMode, ThemeConfig interfaces',
  //       routerLink: '/docs',
  //       fragment: 'api-theme',
  //       icon: 'lucidePalette',
  //     },
  //     {
  //       label: 'Controls',
  //       description: 'ControlPosition interface',
  //       routerLink: '/docs',
  //       fragment: 'api-controls',
  //       icon: 'lucideSliders',
  //     },
  //   ],
  // },
  // {
  //   label: 'Zard UI',
  //   icon: 'lucideLayoutGrid',
  //   items: [
  //     {
  //       label: 'Introduction',
  //       description: 'Zard UI core principles and architecture',
  //       externalUrl: 'https://zardui.com/docs/introduction',
  //       icon: 'lucideBookOpen',
  //     },
  //     {
  //       label: 'Installation',
  //       description: 'Install Zard UI in your Angular project',
  //       externalUrl: 'https://zardui.com/docs/installation',
  //       icon: 'lucidePackage',
  //     },
  //     {
  //       label: 'Components',
  //       description: 'Browse all Zard UI components',
  //       externalUrl: 'https://zardui.com/docs/components',
  //       icon: 'lucideLayoutGrid',
  //     },
  //     {
  //       label: 'CLI',
  //       description: 'Command-line tool for Zard UI',
  //       externalUrl: 'https://zardui.com/docs/cli',
  //       icon: 'lucideTerminal',
  //     },
  //     {
  //       label: 'Theming',
  //       description: 'Customize colors and design tokens',
  //       externalUrl: 'https://zardui.com/docs/theming',
  //       icon: 'lucidePalette',
  //     },
  //     {
  //       label: 'Dark Mode',
  //       description: 'Implement dark mode in Angular',
  //       externalUrl: 'https://zardui.com/docs/dark-mode',
  //       icon: 'lucideMoon',
  //     },
  //   ],
  // },
];
