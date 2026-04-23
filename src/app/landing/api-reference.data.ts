export interface PropRow {
  property: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

export interface InterfaceDoc {
  name: string;
  source: string;
  description: string;
  props: PropRow[];
}

export interface ApiCategory {
  id: string;
  title: string;
  interfaces: InterfaceDoc[];
}

export const API_REFERENCE: ApiCategory[] = [
  {
    id: 'map',
    title: 'Map',
    interfaces: [
      {
        name: 'MapStylesConfig',
        source: 'map-config.interface.ts',
        description:
          'Defines custom MapLibre styles for each color theme. When not provided, MapComponent uses the default Carto Positron (light) and Dark Matter (dark) styles.',
        props: [
          {
            property: 'light',
            type: 'string | StyleSpecification',
            description: 'Style for the light theme (URL or MapLibre style specification object)',
          },
          {
            property: 'dark',
            type: 'string | StyleSpecification',
            description: 'Style for the dark theme (URL or MapLibre style specification object)',
          },
        ],
      },
      {
        name: 'MapConfig',
        source: 'map-config.interface.ts',
        description:
          'Full configuration passed to MapComponent via the [config] input. Centralizes all MapLibre canvas initialization options.',
        props: [
          {
            property: 'center',
            type: 'LngLatLike',
            description: 'Initial coordinates [lng, lat]',
          },
          {
            property: 'zoom',
            type: 'number',
            description: 'Initial zoom level',
          },
          {
            property: 'minZoom',
            type: 'number',
            description: 'Minimum allowed zoom level',
          },
          {
            property: 'maxZoom',
            type: 'number',
            description: 'Maximum allowed zoom level',
          },
          {
            property: 'pitch',
            type: 'number',
            default: '0',
            description: 'Map tilt in degrees',
          },
          {
            property: 'bearing',
            type: 'number',
            default: '0',
            description: 'Map rotation in degrees',
          },
          {
            property: 'projection',
            type: 'ProjectionSpecification',
            description: "Projection type (e.g. { type: 'globe' })",
          },
          {
            property: 'style',
            type: 'string | StyleSpecification',
            description: 'Single style URL or specification (overrides theme)',
          },
          {
            property: 'styles',
            type: 'MapStylesConfig',
            description: 'Separate styles for light/dark themes',
          },
          {
            property: 'theme',
            type: "'light' | 'dark' | 'auto'",
            description: "Active theme. 'auto' detects data-theme on the <html> element",
          },
          {
            property: 'showNavigationControl',
            type: 'boolean',
            default: 'false',
            description: 'Shows zoom and compass buttons',
          },
          {
            property: 'showScaleControl',
            type: 'boolean',
            default: 'false',
            description: 'Shows a graphical scale bar',
          },
          {
            property: 'showFullscreenControl',
            type: 'boolean',
            default: 'false',
            description: 'Shows a fullscreen toggle button',
          },
          {
            property: 'doubleClickZoom',
            type: 'boolean',
            description: 'Zoom on double click',
          },
          {
            property: 'dragRotate',
            type: 'boolean',
            description: 'Rotate the map by dragging',
          },
          {
            property: 'dragPan',
            type: 'boolean',
            description: 'Pan the map by dragging',
          },
          {
            property: 'keyboard',
            type: 'boolean',
            description: 'Keyboard navigation',
          },
          {
            property: 'scrollZoom',
            type: 'boolean',
            description: 'Zoom with scroll wheel or pinch gesture',
          },
          {
            property: 'touchZoomRotate',
            type: 'boolean',
            description: 'Zoom and rotate with touch gestures',
          },
          {
            property: 'boxZoom',
            type: 'boolean',
            description: 'Zoom by drawing a rectangular selection',
          },
          {
            property: 'container',
            type: 'string | HTMLElement',
            description: 'Container element or ID (optional; the component uses its own internal element)',
          },
        ],
      },
    ],
  },
  {
    id: 'viewport',
    title: 'Viewport',
    interfaces: [
      {
        name: 'MapViewport',
        source: 'map-viewport.interface.ts',
        description:
          'Represents the current camera state of the map. Used in controlled mode: the parent component holds the viewport as a signal and reacts to changes via the (viewportChange) output.',
        props: [
          {
            property: 'center',
            type: '[number, number]',
            required: true,
            description: 'Screen center coordinates [lng, lat]',
          },
          {
            property: 'zoom',
            type: 'number',
            required: true,
            description: 'Current zoom level',
          },
          {
            property: 'bearing',
            type: 'number',
            required: true,
            description: 'Current rotation in degrees',
          },
          {
            property: 'pitch',
            type: 'number',
            required: true,
            description: 'Current tilt in degrees',
          },
        ],
      },
    ],
  },
  {
    id: 'markers',
    title: 'Markers',
    interfaces: [
      {
        name: 'PopupConfig',
        source: 'marker-config.interface.ts',
        description:
          'Configures the popup attached to a marker (info balloon shown on click). Follows MapLibre PopupOptions.',
        props: [
          {
            property: 'content',
            type: 'string',
            required: true,
            description: 'HTML content of the popup',
          },
          {
            property: 'title',
            type: 'string',
            description: 'Title displayed above the content',
          },
          {
            property: 'closeButton',
            type: 'boolean',
            default: 'false',
            description: 'Shows a close button in the corner',
          },
          {
            property: 'closeOnClick',
            type: 'boolean',
            default: 'true',
            description: 'Closes the popup when the map is clicked',
          },
          {
            property: 'maxWidth',
            type: 'string',
            default: "'none'",
            description: "Maximum width (CSS). 'none' = controlled by CSS",
          },
          {
            property: 'anchor',
            type: 'AnchorString',
            default: "'bottom'",
            description:
              "Anchor point of the popup relative to the marker. Values: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
          },
          {
            property: 'offset',
            type: 'Offset',
            default: '16',
            description: 'Pixel offset (number, [x, y] or PointLike)',
          },
          {
            property: 'focusAfterOpen',
            type: 'boolean',
            default: 'true',
            description: 'Focuses the popup after it opens',
          },
        ],
      },
      {
        name: 'TooltipConfig',
        source: 'marker-config.interface.ts',
        description: 'Configures the tooltip of a marker (hint shown on mouse hover).',
        props: [
          {
            property: 'text',
            type: 'string',
            required: true,
            description: 'Tooltip text',
          },
          {
            property: 'enabled',
            type: 'boolean',
            default: 'true',
            description: 'Enables or disables the tooltip',
          },
          {
            property: 'showOnHover',
            type: 'boolean',
            default: 'true',
            description: 'Shows the tooltip on mouse hover',
          },
          {
            property: 'anchor',
            type: 'AnchorString',
            default: "'bottom'",
            description: 'Anchor point',
          },
          {
            property: 'offset',
            type: 'Offset',
            default: '12',
            description: 'Pixel offset',
          },
        ],
      },
      {
        name: 'MarkerConfig',
        source: 'marker-config.interface.ts',
        description:
          'Full configuration of a map marker. Used by the legacy API via <ng-marker> and MarkerService.',
        props: [
          {
            property: 'position',
            type: 'LngLatLike',
            required: true,
            description: 'Marker position [lng, lat]',
          },
          {
            property: 'id',
            type: 'string',
            description: 'Unique identifier for tracking and removal',
          },
          {
            property: 'icon',
            type: 'string | HTMLElement',
            description: 'Image URL or custom HTML element',
          },
          {
            property: 'color',
            type: 'string',
            description: 'Color of the default marker (MapLibre blue pin)',
          },
          {
            property: 'size',
            type: "'small' | 'medium' | 'large'",
            description: 'Size of the default marker',
          },
          {
            property: 'draggable',
            type: 'boolean',
            description: 'Allows the marker to be dragged',
          },
          {
            property: 'popup',
            type: 'PopupConfig',
            description: 'Popup shown on click',
          },
          {
            property: 'tooltip',
            type: 'TooltipConfig',
            description: 'Tooltip shown on hover',
          },
          {
            property: 'className',
            type: 'string',
            description: 'Additional CSS class on the marker element',
          },
          {
            property: 'data',
            type: 'Record<string, unknown>',
            description: 'Arbitrary associated data (not rendered)',
          },
          {
            property: 'visible',
            type: 'boolean',
            description: 'Marker visibility',
          },
          {
            property: 'rotation',
            type: 'number',
            description: 'Rotation in degrees',
          },
          {
            property: 'scale',
            type: 'number',
            description: 'Scale factor',
          },
        ],
      },
    ],
  },
  {
    id: 'routes',
    title: 'Routes',
    interfaces: [
      {
        name: 'RouteClickEvent',
        source: 'route-config.interface.ts',
        description:
          'Emitted by RouteComponent (<ng-route>) when the user clicks on a drawn route.',
        props: [
          {
            property: 'event',
            type: 'MapMouseEvent',
            required: true,
            description: 'Native MapLibre click event',
          },
          {
            property: 'config',
            type: 'RouteConfig',
            required: true,
            description: 'Configuration of the clicked route',
          },
        ],
      },
      {
        name: 'RouteConfig',
        source: 'route-config.interface.ts',
        description:
          'Configuration of a route/path drawn on the map. Used by the legacy API via <ng-route>.',
        props: [
          {
            property: 'coordinates',
            type: 'LngLatLike[]',
            required: true,
            description: 'Array of [lng, lat] coordinates that define the path',
          },
          {
            property: 'id',
            type: 'string',
            description: 'Unique identifier for tracking and removal',
          },
          {
            property: 'color',
            type: 'string',
            default: "'#3b82f6'",
            description: 'Line color',
          },
          {
            property: 'width',
            type: 'number',
            default: '4',
            description: 'Line width in pixels',
          },
          {
            property: 'opacity',
            type: 'number',
            default: '1',
            description: 'Opacity (0–1)',
          },
          {
            property: 'dashed',
            type: 'boolean',
            default: 'false',
            description: 'Enables a dashed line pattern',
          },
          {
            property: 'dashArray',
            type: 'number[]',
            default: '[2, 2]',
            description: 'Dash and gap pattern',
          },
          {
            property: 'lineCap',
            type: "'butt' | 'round' | 'square'",
            default: "'round'",
            description: 'Line end cap style',
          },
          {
            property: 'lineJoin',
            type: "'miter' | 'round' | 'bevel'",
            default: "'round'",
            description: 'Line join style at vertices',
          },
          {
            property: 'visible',
            type: 'boolean',
            default: 'true',
            description: 'Route visibility',
          },
          {
            property: 'showArrows',
            type: 'boolean',
            default: 'false',
            description: 'Shows directional arrows along the route',
          },
          {
            property: 'arrowSpacing',
            type: 'number',
            default: '100',
            description: 'Spacing between arrows in pixels',
          },
          {
            property: 'stops',
            type: 'RouteStop[]',
            description: 'Named stops along the route (renders numbered markers)',
          },
          {
            property: 'showStopMarkers',
            type: 'boolean',
            description: 'Shows markers at stops (defaults to true when stops is provided)',
          },
          {
            property: 'osrmData',
            type: 'OsrmRouteData',
            description: 'Duration and distance data calculated by OSRM',
          },
          {
            property: 'selected',
            type: 'boolean',
            description: 'Selected state — elevates the route z-order on screen',
          },
          {
            property: 'data',
            type: 'Record<string, unknown>',
            description: 'Arbitrary associated data',
          },
        ],
      },
    ],
  },
  {
    id: 'osrm',
    title: 'OSRM',
    interfaces: [
      {
        name: 'RouteStop',
        source: 'osrm.interface.ts',
        description: 'Represents a stop (waypoint) in a route planning sequence.',
        props: [
          {
            property: 'name',
            type: 'string',
            required: true,
            description: 'Stop name or label',
          },
          {
            property: 'lng',
            type: 'number',
            required: true,
            description: 'Longitude',
          },
          {
            property: 'lat',
            type: 'number',
            required: true,
            description: 'Latitude',
          },
        ],
      },
      {
        name: 'OsrmRouteData',
        source: 'osrm.interface.ts',
        description:
          'Processed result of a route calculated by OSRM. Populated by OsrmService and stored in RouteConfig.osrmData.',
        props: [
          {
            property: 'coordinates',
            type: '[number, number][]',
            required: true,
            description: 'Route geometry coordinates [lng, lat]',
          },
          {
            property: 'duration',
            type: 'number',
            required: true,
            description: 'Estimated duration in seconds',
          },
          {
            property: 'distance',
            type: 'number',
            required: true,
            description: 'Distance in meters',
          },
        ],
      },
      {
        name: 'OsrmResponse',
        source: 'osrm.interface.ts',
        description:
          'Raw response returned by the OSRM API (/route/v1 endpoint). Rarely used directly — OsrmService converts it to OsrmRouteData[].',
        props: [
          {
            property: 'code',
            type: 'string',
            required: true,
            description: "API status code ('Ok', 'NoRoute', etc.)",
          },
          {
            property: 'message',
            type: 'string',
            description: 'Optional error message',
          },
          {
            property: 'routes',
            type: 'Array<{ geometry, duration, distance, legs? }>',
            description: 'Array of alternative routes',
          },
          {
            property: 'waypoints',
            type: 'Array<{ location, name? }>',
            description: 'Waypoints snapped to the road network',
          },
        ],
      },
      {
        name: 'OsrmRouteOptions',
        source: 'osrm.interface.ts',
        description: 'Options for the OsrmService.getRoute() request.',
        props: [
          {
            property: 'profile',
            type: "'driving' | 'walking' | 'cycling'",
            default: "'driving'",
            description: 'Transport profile',
          },
          {
            property: 'alternatives',
            type: 'boolean',
            default: 'true',
            description: 'Include alternative routes in the response',
          },
          {
            property: 'overview',
            type: "'simplified' | 'full' | 'false'",
            default: "'full'",
            description: 'Level of geometry detail',
          },
          {
            property: 'geometries',
            type: "'geojson' | 'polyline' | 'polyline6'",
            default: "'geojson'",
            description: 'Geometry format returned',
          },
          {
            property: 'serverUrl',
            type: 'string',
            default: "'https://router.project-osrm.org'",
            description: 'OSRM server URL',
          },
        ],
      },
    ],
  },
  {
    id: 'theme',
    title: 'Theme',
    interfaces: [
      {
        name: 'ThemeMode',
        source: 'theme-config.interface.ts',
        description:
          "Union type used in MapConfig.theme and ThemeConfig.mode. Values: 'light' | 'dark' | 'auto'.",
        props: [
          {
            property: "'light'",
            type: 'ThemeMode',
            description: 'Forces light theme regardless of system preference',
          },
          {
            property: "'dark'",
            type: 'ThemeMode',
            description: 'Forces dark theme regardless of system preference',
          },
          {
            property: "'auto'",
            type: 'ThemeMode',
            description: 'Automatically detected via the data-theme attribute on <html>',
          },
        ],
      },
      {
        name: 'ThemeConfig',
        source: 'theme-config.interface.ts',
        description:
          'Public interface for advanced theme configuration. Exported in the public API but not yet directly integrated in ThemeService or MapComponent.',
        props: [
          {
            property: 'mode',
            type: 'ThemeMode',
            required: true,
            description: 'Desired theme',
          },
          {
            property: 'detectSystemPreference',
            type: 'boolean',
            description: 'Detects the operating system color scheme preference',
          },
          {
            property: 'storageKey',
            type: 'string',
            description: 'localStorage key used to persist the preference',
          },
          {
            property: 'onThemeChange',
            type: "(theme: 'light' | 'dark') => void",
            description: 'Callback fired when the theme changes',
          },
        ],
      },
    ],
  },
  {
    id: 'controls',
    title: 'Controls',
    interfaces: [
      {
        name: 'ControlPosition',
        source: 'control-config.interface.ts',
        description:
          'Defines the position of native controls on the map canvas. Mirrors MapLibre GL ControlPosition. Used as the [position] input on MapControlsComponent (<ng-map-controls>).',
        props: [
          {
            property: "'top-left'",
            type: 'ControlPosition',
            description: 'Top-left corner',
          },
          {
            property: "'top-right'",
            type: 'ControlPosition',
            description: 'Top-right corner',
          },
          {
            property: "'bottom-left'",
            type: 'ControlPosition',
            description: 'Bottom-left corner',
          },
          {
            property: "'bottom-right'",
            type: 'ControlPosition',
            description: 'Bottom-right corner',
          },
        ],
      },
    ],
  },
];
