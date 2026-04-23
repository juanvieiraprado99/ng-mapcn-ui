import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { MarkerConfig, RouteConfig } from 'ng-mapcn';
import {
  MapComponent,
  MapControlsComponent,
  MarkerComponent,
  RouteComponent,
} from 'ng-mapcn';

const MARKERS: MarkerConfig[] = [
  {
    id: 'ny',
    position: [-74.006, 40.7128],
    color: '#ef4444',
    size: 'small',
    popup: { content: 'New York' },
  },
  {
    id: 'paris',
    position: [2.3522, 48.8566],
    color: '#3b82f6',
    size: 'medium',
    popup: { content: 'Paris' },
  },
  {
    id: 'tokyo',
    position: [139.6917, 35.6895],
    color: '#22c55e',
    size: 'large',
    popup: { content: 'Tokyo' },
  },
  {
    id: 'london',
    position: [-0.1276, 51.5074],
    color: '#8b5cf6',
    size: 'small',
    popup: { content: 'London' },
  },
  {
    id: 'sydney',
    position: [151.2093, -33.8688],
    color: '#f59e0b',
    size: 'medium',
    popup: { content: 'Sydney' },
  },
  {
    id: 'rio',
    position: [-43.1729, -22.9068],
    color: '#ec4899',
    size: 'small',
    popup: { content: 'Rio de Janeiro' },
  },
];

const ROTA_MAIRINQUE_SAO_ROQUE: RouteConfig = {
  id: 'rota-mr-sr',
  coordinates: [
    [-47.1855, -23.5393],
    [-47.1352, -23.5292],
    [-47.08, -23.52],
    [-47.04, -23.51],
  ],
  color: '#3b82f6',
  width: 4,
  opacity: 0.9,
  lineCap: 'round',
  lineJoin: 'round',
};

@Component({
    selector: 'app-markers-map-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'example-map-container' },
    imports: [
        MapComponent,
        MapControlsComponent,
        MarkerComponent,
        RouteComponent,
    ],
    template: `
    <div class="map-wrapper">
      <ng-map
        [mapId]="mapId"
        [center]="[-47.16, -23.53]"
        [zoom]="12"
        (mapReady)="onMapReady()"
      />
      <ng-map-controls
        [mapId]="mapId"
        [position]="'top-right'"
        [showZoom]="true"
      />
      @for (marker of markers; track marker.id) {
        <ng-marker [mapId]="mapId" [config]="marker" />
      }
      <ng-route [mapId]="mapId" [config]="routeConfig" />
    </div>
  `,
    styles: `
    .map-wrapper {
      width: 100%;
      height: 280px;
      border-radius: var(--border-radius);
      overflow: hidden;
      position: relative;
    }
  `
})
export class MarkersMapExampleComponent {
  readonly mapId = 'markers-map';
  readonly markers = MARKERS;
  readonly routeConfig = ROTA_MAIRINQUE_SAO_ROQUE;

  onMapReady(): void {}
}
