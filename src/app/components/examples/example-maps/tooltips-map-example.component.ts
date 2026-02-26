import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { MarkerConfig } from 'ng-mapcn';
import { MapComponent, MapControlsComponent, MarkerComponent } from 'ng-mapcn';

const TOOLTIP_MARKERS: MarkerConfig[] = [
  {
    id: 'ny',
    position: [-74.006, 40.7128],
    tooltip: { text: 'New York', anchor: 'top' },
  },
  {
    id: 'paris',
    position: [2.3522, 48.8566],
    tooltip: { text: 'Paris', anchor: 'bottom' },
  },
  {
    id: 'tokyo',
    position: [139.6917, 35.6895],
    tooltip: { text: 'Tokyo', anchor: 'left' },
  },
  {
    id: 'london',
    position: [-0.1276, 51.5074],
    tooltip: { text: 'London', anchor: 'right' },
  },
  {
    id: 'sydney',
    position: [151.2093, -33.8688],
    tooltip: { text: 'Sydney', anchor: 'top-left' },
  },
  {
    id: 'rio',
    position: [-43.1729, -22.9068],
    tooltip: { text: 'Rio', anchor: 'bottom-right', offset: 16 },
  },
  {
    id: 'dubai',
    position: [55.2708, 25.2048],
    tooltip: { text: 'Dubai', offset: [10, 20] },
  },
  {
    id: 'moscow',
    position: [37.6173, 55.7558],
    tooltip: { text: 'Moscow', showOnHover: false },
  },
  {
    id: 'cairo',
    position: [31.2357, 30.0444],
    tooltip: { text: 'Cairo', enabled: true },
  },
  {
    id: 'mumbai',
    position: [72.8777, 19.076],
    tooltip: { text: 'Mumbai', enabled: false },
  },
];

@Component({
  selector: 'app-tooltips-map-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'example-map-container' },
  imports: [MapComponent, MapControlsComponent, MarkerComponent],
  template: `
    <div class="map-wrapper">
      <ng-map
        [mapId]="mapId"
        [center]="[20, 20]"
        [zoom]="2"
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
export class TooltipsMapExampleComponent {
  readonly mapId = 'tooltips-map';
  readonly markers = TOOLTIP_MARKERS;

  onMapReady(): void {}
}
