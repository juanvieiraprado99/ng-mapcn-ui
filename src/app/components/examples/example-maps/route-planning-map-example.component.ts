import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { OsrmRouteData } from 'ng-mapcn';
import {
  MapComponent,
  MapControlsComponent,
  RoutePlanningComponent,
} from 'ng-mapcn';

@Component({
  selector: 'app-route-planning-map-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'example-map-container' },
  imports: [MapComponent, MapControlsComponent, RoutePlanningComponent],
  template: `
    <div class="map-wrapper">
      <ng-map
        [mapId]="mapId"
        [center]="[4.9, 52.1]"
        [zoom]="8"
        (mapReady)="onMapReady()"
      />
      <ng-map-controls
        [mapId]="mapId"
        [position]="'top-right'"
        [showZoom]="true"
      />
      <ng-route-planning
        [mapId]="mapId"
        [start]="start"
        [end]="end"
        [selectedRouteIndex]="selectedIndex()"
        (routesLoaded)="onRoutesLoaded($event)"
        (routeSelected)="onRouteSelected($event)"
        (loadingChange)="onLoadingChange($event)"
      />
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
export class RoutePlanningMapExampleComponent {
  readonly mapId = 'route-planning-map';
  readonly start = { lng: 4.9041, lat: 52.3676, name: 'Amsterdam' };
  readonly end = { lng: 4.4777, lat: 51.9225, name: 'Rotterdam' };

  readonly selectedIndex = signal(0);
  readonly routes = signal<OsrmRouteData[]>([]);
  readonly loading = signal(false);

  onMapReady(): void {}

  onRoutesLoaded(r: OsrmRouteData[]): void {
    this.routes.set(r);
    this.selectedIndex.set(0);
  }

  onRouteSelected(event: { index: number; route: OsrmRouteData }): void {
    this.selectedIndex.set(event.index);
  }

  onLoadingChange(loading: boolean): void {
    this.loading.set(loading);
  }
}
