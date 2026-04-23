import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapComponent, MapControlsComponent } from 'ng-mapcn';

@Component({
    selector: 'app-controls-map-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'example-map-container' },
    imports: [MapComponent, MapControlsComponent],
    template: `
    <div class="map-wrapper">
      <ng-map
        [mapId]="mapId"
        [center]="[-74.5, 40]"
        [zoom]="10"
        (mapReady)="onMapReady()"
      />
      <ng-map-controls
        [mapId]="mapId"
        [position]="'top-right'"
        [showZoom]="true"
        [showCompass]="true"
        [showLocate]="true"
        [showFullscreen]="true"
      />
    </div>
  `,
    styles: `
    .map-wrapper {
      width: 100%;
      height: 280px;
      border-radius: var(--border-radius);
      overflow: hidden;
    }
  `
})
export class ControlsMapExampleComponent {
  readonly mapId = 'controls-map';

  onMapReady(): void {}
}
