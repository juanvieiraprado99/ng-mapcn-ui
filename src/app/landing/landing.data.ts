export const GITHUB_URL = 'https://github.com/juanvieiraprado99/ng-mapcn';
export const NPM_URL = 'https://www.npmjs.com/package/ng-mapcn';
export const MAPCN_URL = 'https://www.mapcn.dev/';
export const MAPLIBRE_URL = 'https://maplibre.org/';
export const ZARDUI_URL = 'https://zardui.com/';

export const FEATURES = [
  {
    title: 'Theme-aware',
    description:
      'The map adapts to light/dark mode automatically, following system preference or your app theme.',
    icon: 'lucideSun' as const,
  },
  {
    title: 'Zero config',
    description:
      'Works out of the box. Just drop <ng-map> with a mapId and optionally center and zoom.',
    icon: 'lucideCog' as const,
  },
  {
    title: 'shadcn-style',
    description:
      'Composable components and CSS variables. Integrates naturally with shadcn-inspired design systems.',
    icon: 'lucidePalette' as const,
  },
  {
    title: 'Composable',
    description:
      'Map, markers, routes and controls are separate components. Use only what you need.',
    icon: 'lucideLayoutGrid' as const,
  },
  {
    title: 'Markers & Popups',
    description:
      'Popups, tooltips, icons and sizes. Draggable markers and numbered stops on routes.',
    icon: 'lucideMapPin' as const,
  },
  {
    title: 'OSRM Route Planning',
    description:
      'Calculate routes between origin and destination with multiple alternatives, duration and distance.',
    icon: 'lucideRoute' as const,
  },
] as const;

export type ExampleId =
  | 'basic-map'
  | 'dark-theme-map'
  | 'flyto-globe-map'
  | 'flyto-markers-map'
  | 'markers-map'
  | 'routes-map'
  | 'route-planning-map'
  | 'tooltips-map';

export const EXAMPLES: ReadonlyArray<{
  id: ExampleId;
  name: string;
  description: string;
  demoLink: string;
}> = [
  {
    id: 'basic-map',
    name: 'Basic Map',
    description: 'Minimal map with zoom.',
    demoLink: '#',
  },
  {
    id: 'dark-theme-map',
    name: 'Dark Theme',
    description: 'Map forced to dark theme via theme="dark".',
    demoLink: '#',
  },
  {
    id: 'flyto-globe-map',
    name: 'Fly To Globe',
    description: 'Globe projection with animated flyTo to a coordinate.',
    demoLink: '#',
  },
  {
    id: 'flyto-markers-map',
    name: 'Fly To Markers',
    description: 'Click a marker to fly the camera to it.',
    demoLink: '#',
  },
  {
    id: 'markers-map',
    name: 'Markers',
    description: 'Markers with sizes, colors and popups, including a route.',
    demoLink: '#',
  },
  {
    id: 'routes-map',
    name: 'Routes',
    description: 'Multiple routes; one with stops and numbered markers.',
    demoLink: '#',
  },
  {
    id: 'route-planning-map',
    name: 'Route Planning',
    description: 'OSRM routes between two points with alternatives and ETA.',
    demoLink: '#',
  },
  {
    id: 'tooltips-map',
    name: 'Tooltips',
    description: 'Markers with tooltips (anchor, offset, showOnHover).',
    demoLink: '#',
  },
];

export const COMPONENTS_LIST = [
  {
    name: 'Map',
    selector: 'ng-map',
    description: 'Creates and manages the MapLibre GL map instance.',
  },
  {
    name: 'Marker',
    selector: 'ng-marker',
    description: 'Marker with popup, tooltip and custom icon support.',
  },
  {
    name: 'Route',
    selector: 'ng-route',
    description: 'Draws a line/route from coordinates with optional stops.',
  },
  {
    name: 'Route Planning',
    selector: 'ng-route-planning',
    description: 'OSRM-powered route planning between origin and destination.',
  },
  {
    name: 'Map Controls',
    selector: 'ng-map-controls',
    description: 'Groups zoom, compass, locate and fullscreen controls.',
  },
  {
    name: 'Zoom / Compass / Locate / Fullscreen',
    selector: 'ng-zoom-control, etc.',
    description: 'Individual, positionable controls.',
  },
] as const;
