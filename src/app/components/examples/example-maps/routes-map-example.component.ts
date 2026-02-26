import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteConfig } from 'ng-mapcn';
import { MapComponent, MapControlsComponent, RouteComponent } from 'ng-mapcn';

const ROUTES: RouteConfig[] = [
  {
    id: 'route-usa',
    coordinates: [
      [-95.7129, 37.0902],
      [-87.6298, 41.8781],
      [-74.006, 40.7128],
    ],
    color: '#ef4444',
    width: 3,
  },
  {
    id: 'route-europa',
    coordinates: [
      [-3.7038, 40.4168],
      [2.3522, 48.8566],
      [8.6821, 50.1109],
    ],
    color: '#22c55e',
    width: 3,
  },
  {
    id: 'route-nyc-stops',
    coordinates: [
      [-74.006, 40.7128],
      [-73.9857, 40.7484],
      [-73.9792, 40.7527],
      [-73.9654, 40.7829],
    ],
    color: '#3b82f6',
    width: 4,
    stops: [
      { name: 'City Hall', lng: -74.006, lat: 40.7128 },
      { name: 'Empire State Building', lng: -73.9857, lat: 40.7484 },
      { name: 'Grand Central', lng: -73.9792, lat: 40.7527 },
      { name: 'Central Park', lng: -73.9654, lat: 40.7829 },
    ],
    showStopMarkers: true,
  },
];

@Component({
  selector: 'app-routes-map-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'example-map-container' },
  imports: [MapComponent, MapControlsComponent, RouteComponent],
  template: `
    <div class="map-wrapper">
      <ng-map
        [mapId]="mapId"
        [center]="[-73.98, 40.75]"
        [zoom]="11.2"
        (mapReady)="onMapReady()"
      />
      <ng-map-controls
        [mapId]="mapId"
        [position]="'top-right'"
        [showZoom]="true"
      />
      @for (route of routes; track route.id) {
        <ng-route [mapId]="mapId" [config]="route" />
      }
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
  `,
})
export class RoutesMapExampleComponent {
  readonly mapId = 'routes-map';
  readonly routes = ROUTES;

  onMapReady(): void {}
}
