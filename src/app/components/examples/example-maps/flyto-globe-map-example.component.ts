import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MapComponent, MapControlsComponent, MapService } from 'ng-mapcn';

import { ZardButtonComponent } from '@/components/ui/button/button.component';

@Component({
  selector: 'app-flyto-globe-map-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'example-map-container' },
  imports: [MapComponent, MapControlsComponent, ZardButtonComponent],
  template: `
    <div class="map-wrapper">
      <ng-map
        [mapId]="mapId"
        [center]="[0, 0]"
        [zoom]="2"
        [projection]="{ type: 'globe' }"
        (mapReady)="onMapReady()"
      />
      <ng-map-controls
        [mapId]="mapId"
        [position]="'top-right'"
        [showZoom]="true"
        [showCompass]="true"
        [showFullscreen]="true"
      />
      <div class="flyto-actions">
        <button
          type="button"
          z-button
          zType="secondary"
          zSize="sm"
          (click)="flyToMairinque()"
        >
          Ir para Mairinque, SP
        </button>
      </div>
    </div>
  `,
  styles: `
    .map-wrapper {
      width: 100%;
      height: 280px;
      border-radius: var(--radius-md);
      overflow: hidden;
      position: relative;
    }
    .flyto-actions {
      position: absolute;
      bottom: 0.75rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }
  `,
})
export class FlytoGlobeMapExampleComponent {
  private readonly mapService = inject(MapService);

  readonly mapId = 'flyto-globe-map';

  onMapReady(): void {}

  flyToMairinque(): void {
    const map = this.mapService.getMap(this.mapId);
    if (!map) return;
    map.flyTo({
      center: [-47.1833, -23.5458],
      zoom: 10,
      essential: true,
    });
  }
}
