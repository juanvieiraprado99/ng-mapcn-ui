export interface ApiProp {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

export interface ApiSection {
  id: string;
  title: string;
  type: 'component' | 'interface';
  selector?: string;
  description: string;
  inputs?: ApiProp[];
  outputs?: ApiProp[];
  properties?: ApiProp[];
  codeExample?: string;
}

export const API_SECTIONS: ApiSection[] = [
  {
    id: 'ng-map',
    title: 'MapComponent',
    type: 'component',
    selector: 'ng-map',
    description:
      'Main map component. Renders a MapLibre GL map and exposes lifecycle and interaction events. All other child components (markers, routes, controls) coordinate with it through mapId.',
    inputs: [
      { name: 'config', type: 'MapConfig', description: 'Aggregated configuration object. Alternative to passing each input individually.' },
      { name: 'center', type: '[number, number]', default: '[0, 0]', description: 'Initial map center coordinates [lng, lat].' },
      { name: 'zoom', type: 'number', default: '2', description: 'Initial zoom level (0-22).' },
      { name: 'styles', type: 'MapStylesConfig', description: 'Custom styles by theme (light / dark).' },
      { name: 'projection', type: 'ProjectionSpecification', description: "Map projection (e.g. { type: 'globe' })." },
      { name: 'theme', type: "'light' | 'dark' | 'auto'", default: "'auto'", description: "Map theme. 'auto' syncs with the data-theme attribute on <html>." },
      { name: 'mapId', type: 'string', default: "'default-map'", description: 'Unique identifier. Required when multiple maps are rendered on the same page.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading state over the map.' },
      { name: 'viewport', type: 'Partial<MapViewport>', description: 'Programmatically controls the viewport (center, zoom, bearing, pitch).' },
    ],
    outputs: [
      { name: 'mapReady', type: 'Map', description: 'Emitted when the map and style finish loading. Returns the native MapLibre instance.' },
      { name: 'viewportChange', type: 'MapViewport', description: 'Emitted on every map movement ({ center, zoom, bearing, pitch }).' },
      { name: 'mapClick', type: 'MapMouseEvent', description: 'Emitted when the map is clicked.' },
      { name: 'mapError', type: 'Error', description: 'Emitted when the map fails to initialize or load the style.' },
    ],
    codeExample: `<ng-map
  [center]="[-43.1729, -22.9068]"
  [zoom]="12"
  theme="auto"
  mapId="main-map"
  (mapReady)="onMapReady($event)"
  (mapClick)="onMapClick($event)"
  (viewportChange)="onViewportChange($event)"
>
  <ng-map-controls [showZoom]="true" [showCompass]="true" />
</ng-map>`,
  },

  {
    id: 'ng-marker',
    title: 'MarkerComponent',
    type: 'component',
    selector: 'ng-marker',
    description:
      'Adds a declarative marker to the map. Automatically reacts to config changes. Can display popup, tooltip, custom icon, and supports dragging.',
    inputs: [
      { name: 'config', type: 'MarkerConfig', required: true, description: 'Full marker configuration (position, icon, popup, tooltip, etc.).' },
      { name: 'mapId', type: 'string', default: "'default-map'", description: 'Parent map ID where the marker will be rendered.' },
    ],
    outputs: [
      { name: 'markerClick', type: 'MapMouseEvent', description: 'Emitted when the marker is clicked.' },
      { name: 'markerHover', type: 'MapMouseEvent', description: 'Emitted when hovering over the marker.' },
    ],
    codeExample: `<ng-map [center]="[-43.1729, -22.9068]" [zoom]="12">
  <ng-marker
    [config]="{
      id: 'marker-1',
      position: [-43.1729, -22.9068],
      color: '#3b82f6',
      size: 'medium',
      popup: { title: 'Rio de Janeiro', content: 'Wonderful City' },
      tooltip: { text: 'Rio de Janeiro' }
    }"
    (markerClick)="onMarkerClick($event)"
  />
</ng-map>`,
  },

  {
    id: 'ng-route',
    title: 'RouteComponent',
    type: 'component',
    selector: 'ng-route',
    description:
      'Draws a GeoJSON line/route on the map. Supports custom style (color, width, dashed line), numbered stop markers, and updates visual properties without recreating the layer.',
    inputs: [
      { name: 'config', type: 'RouteConfig', required: true, description: 'Route configuration (coordinates, color, width, stops, etc.).' },
      { name: 'mapId', type: 'string', default: "'default-map'", description: 'Parent map ID.' },
    ],
    outputs: [
      { name: 'routeClick', type: 'RouteClickEvent', description: 'Emitted when clicking on the route line. Contains the MapLibre event and route config.' },
    ],
    codeExample: `<ng-map [center]="[-43.18, -22.91]" [zoom]="13">
  <ng-route
    [config]="{
      id: 'route-1',
      coordinates: [[-43.18, -22.91], [-43.17, -22.90], [-43.16, -22.89]],
      color: '#ef4444',
      width: 4,
      dashed: false,
      showStopMarkers: true,
      stops: [
        { position: [-43.18, -22.91], label: 'Origin' },
        { position: [-43.16, -22.89], label: 'Destination' }
      ]
    }"
    (routeClick)="onRouteClick($event)"
  />
</ng-map>`,
  },

  {
    id: 'ng-map-controls',
    title: 'MapControlsComponent',
    type: 'component',
    selector: 'ng-map-controls',
    description:
      'Adds native controls to the map (zoom, compass, geolocation, fullscreen). Can be used inside <ng-map> (automatic context via DI) or outside (by providing mapId).',
    inputs: [
      { name: 'position', type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'", default: "'top-right'", description: 'Control position on the map.' },
      { name: 'showZoom', type: 'boolean', default: 'true', description: 'Shows zoom in/out buttons.' },
      { name: 'showCompass', type: 'boolean', default: 'false', description: 'Shows the compass (resets bearing and pitch when clicked).' },
      { name: 'showLocate', type: 'boolean', default: 'false', description: 'Shows geolocation button (flies to the user current position).' },
      { name: 'showFullscreen', type: 'boolean', default: 'false', description: 'Shows fullscreen button.' },
      { name: 'mapId', type: 'string', default: "'default-map'", description: 'Map ID. Required only when used outside <ng-map>.' },
    ],
    codeExample: `<!-- Inside <ng-map> - mapId is resolved automatically via DI -->
<ng-map [center]="[-43.1729, -22.9068]" [zoom]="12">
  <ng-map-controls
    position="top-right"
    [showZoom]="true"
    [showCompass]="true"
    [showLocate]="true"
    [showFullscreen]="true"
  />
</ng-map>`,
  },

  {
    id: 'MapConfig',
    title: 'MapConfig',
    type: 'interface',
    description: 'Complete configuration object passed to MapComponent through the [config] input. Centralizes all MapLibre canvas initialization options.',
    properties: [
      { name: 'center', type: 'LngLatLike', description: 'Initial center [lng, lat].' },
      { name: 'zoom', type: 'number', default: '2', description: 'Initial zoom.' },
      { name: 'minZoom', type: 'number', description: 'Minimum allowed zoom.' },
      { name: 'maxZoom', type: 'number', description: 'Maximum allowed zoom.' },
      { name: 'styles', type: 'MapStylesConfig', description: 'Styles by theme (light/dark).' },
      { name: 'projection', type: 'ProjectionSpecification', description: 'Map projection.' },
      { name: 'pitch', type: 'number', default: '0', description: 'Pitch in degrees (0-60).' },
      { name: 'bearing', type: 'number', default: '0', description: 'Rotation in degrees (-180 to 180).' },
      { name: 'doubleClickZoom', type: 'boolean', default: 'true', description: 'Enables double-click zoom.' },
      { name: 'dragRotate', type: 'boolean', default: 'true', description: 'Enables drag rotation.' },
      { name: 'dragPan', type: 'boolean', default: 'true', description: 'Enables drag pan.' },
      { name: 'keyboard', type: 'boolean', default: 'true', description: 'Enables keyboard shortcuts.' },
      { name: 'scrollZoom', type: 'boolean', default: 'true', description: 'Enables scroll zoom.' },
      { name: 'touchZoomRotate', type: 'boolean', default: 'true', description: 'Enables touch zoom/rotate.' },
      { name: 'boxZoom', type: 'boolean', default: 'true', description: 'Enables box zoom selection.' },
    ],
  },

  {
    id: 'MarkerConfig',
    title: 'MarkerConfig',
    type: 'interface',
    description: 'Complete marker configuration on the map. Used by the <ng-marker> component and MarkerService.',
    properties: [
      { name: 'position', type: 'LngLatLike', required: true, description: 'Marker coordinate [lng, lat].' },
      { name: 'id', type: 'string', description: 'Unique marker ID.' },
      { name: 'icon', type: 'string | HTMLElement', description: 'Custom icon URL or HTML element.' },
      { name: 'color', type: 'string', description: 'Default marker color (hex, rgb, etc.).' },
      { name: 'size', type: "'small' | 'medium' | 'large'", description: 'Default marker size.' },
      { name: 'draggable', type: 'boolean', default: 'false', description: 'Makes the marker draggable.' },
      { name: 'popup', type: 'PopupConfig', description: 'Popup configuration when clicked.' },
      { name: 'tooltip', type: 'TooltipConfig', description: 'Tooltip configuration when hovered.' },
      { name: 'className', type: 'string', description: 'Custom CSS class.' },
      { name: 'data', type: 'Record<string, unknown>', description: 'Arbitrary data associated with the marker.' },
      { name: 'visible', type: 'boolean', default: 'true', description: 'Marker visibility.' },
      { name: 'rotation', type: 'number', default: '0', description: 'Rotation in degrees.' },
      { name: 'scale', type: 'number', default: '1', description: 'Scale factor.' },
    ],
  },

  {
    id: 'PopupConfig',
    title: 'PopupConfig',
    type: 'interface',
    description: 'Configures the popup attached to a marker (information bubble shown on click). Follows MapLibre PopupOptions.',
    properties: [
      { name: 'content', type: 'string', description: 'Popup HTML content.' },
      { name: 'title', type: 'string', description: 'Popup title.' },
      { name: 'closeButton', type: 'boolean', default: 'false', description: 'Shows close button.' },
      { name: 'closeOnClick', type: 'boolean', default: 'true', description: 'Closes when clicking outside.' },
      { name: 'maxWidth', type: 'string', default: "'none'", description: "Maximum width (e.g. '300px')." },
      { name: 'anchor', type: "'center' | 'top' | 'bottom' | 'left' | 'right' | ...", default: "'bottom'", description: 'Popup anchor point.' },
      { name: 'offset', type: 'Offset', default: '16', description: 'Offset in pixels.' },
      { name: 'focusAfterOpen', type: 'boolean', default: 'true', description: 'Focuses the popup when opened.' },
    ],
  },

  {
    id: 'TooltipConfig',
    title: 'TooltipConfig',
    type: 'interface',
    description: 'Configures a marker tooltip (hint shown on hover).',
    properties: [
      { name: 'text', type: 'string', required: true, description: 'Tooltip text.' },
      { name: 'enabled', type: 'boolean', default: 'true', description: 'Enables/disables the tooltip.' },
      { name: 'showOnHover', type: 'boolean', default: 'true', description: 'Shows on hover.' },
      { name: 'anchor', type: 'string', default: "'bottom'", description: 'Anchor point.' },
      { name: 'offset', type: 'Offset', default: '12', description: 'Offset in pixels.' },
    ],
  },

  {
    id: 'RouteConfig',
    title: 'RouteConfig',
    type: 'interface',
    description: 'Configuration for a route/path drawn on the map. Used by the <ng-route> component.',
    properties: [
      { name: 'coordinates', type: 'LngLatLike[]', required: true, description: 'Route coordinates array (minimum 2 points).' },
      { name: 'id', type: 'string', description: 'Unique route ID.' },
      { name: 'color', type: 'string', default: "'#3b82f6'", description: 'Line color.' },
      { name: 'width', type: 'number', default: '3', description: 'Line width in pixels.' },
      { name: 'dashed', type: 'boolean', default: 'false', description: 'Dashed line.' },
      { name: 'dashArray', type: 'number[]', default: '[2, 2]', description: 'Dash pattern.' },
      { name: 'opacity', type: 'number', default: '1', description: 'Opacity (0-1).' },
      { name: 'lineCap', type: "'butt' | 'round' | 'square'", default: "'round'", description: 'Line cap style.' },
      { name: 'lineJoin', type: "'miter' | 'round' | 'bevel'", default: "'round'", description: 'Line join style.' },
      { name: 'stops', type: 'RouteStop[]', description: 'Stops with numbered markers.' },
      { name: 'showStopMarkers', type: 'boolean', description: 'Shows markers at stops.' },
      { name: 'selected', type: 'boolean', default: 'false', description: 'Raises the route in z-order when selected.' },
      { name: 'data', type: 'Record<string, unknown>', description: 'Arbitrary data associated with the route.' },
    ],
  },
];
