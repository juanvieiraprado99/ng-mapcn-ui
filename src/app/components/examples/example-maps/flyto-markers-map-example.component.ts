import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import type { MarkerConfig } from 'ng-mapcn';
import {
  MapComponent,
  MapControlsComponent,
  MapService,
  MarkerComponent,
} from 'ng-mapcn';

const FLYTO_MARKERS: MarkerConfig[] = [
  { id: 'sp', position: [-46.6339, -23.5505], popup: { content: 'São Paulo' } },
  {
    id: 'rj',
    position: [-43.1729, -22.9068],
    popup: { content: 'Rio de Janeiro' },
  },
  {
    id: 'bh',
    position: [-43.9378, -19.9167],
    popup: { content: 'Belo Horizonte' },
  },
  {
    id: 'curitiba',
    position: [-49.2733, -25.4284],
    popup: { content: 'Curitiba' },
  },
  {
    id: 'poa',
    position: [-51.2177, -30.0346],
    popup: { content: 'Porto Alegre' },
  },
  { id: 'bsb', position: [-47.8825, -15.7942], popup: { content: 'Brasília' } },
  {
    id: 'salvador',
    position: [-38.5108, -12.9716],
    popup: { content: 'Salvador' },
  },
  { id: 'recife', position: [-34.8811, -8.0476], popup: { content: 'Recife' } },
];

@Component({
  selector: 'app-flyto-markers-map-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'example-map-container' },
  imports: [MapComponent, MapControlsComponent, MarkerComponent],
  template: `
    <div class="map-wrapper">
      <ng-map
        [mapId]="mapId"
        [center]="[-47, -23]"
        [zoom]="5"
        (mapReady)="onMapReady()"
      />
      <ng-map-controls
        [mapId]="mapId"
        [position]="'top-right'"
        [showZoom]="true"
      />
      @for (marker of markers; track marker.id) {
        <ng-marker
          [mapId]="mapId"
          [config]="marker"
          (markerClick)="onMarkerClick(marker)"
        />
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
export class FlytoMarkersMapExampleComponent {
  readonly mapId = 'flyto-markers-map';
  readonly markers = FLYTO_MARKERS;
  private readonly mapService = inject(MapService);

  onMapReady(): void {}

  onMarkerClick(marker: MarkerConfig): void {
    const pos: [number, number] = Array.isArray(marker.position)
      ? (marker.position as [number, number])
      : [
          'lng' in marker.position ? marker.position.lng : marker.position.lon,
          marker.position.lat,
        ];
    this.mapService.flyTo(this.mapId, pos, 14, 1500);
  }
}
