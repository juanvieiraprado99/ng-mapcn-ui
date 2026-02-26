import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MapComponent, MapControlsComponent, MapService } from 'ng-mapcn';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-flyto-globe-map-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'example-map-container' },
  imports: [MapComponent, MapControlsComponent, ButtonModule],
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
        <p-button
          label="Ir para Mairinque, SP"
          severity="secondary"
          size="small"
          (onClick)="flyToMairinque()"
        />
      </div>
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
    .flyto-actions {
      position: absolute;
      bottom: 0.75rem;
      left: 0.75rem;
    }
  `,
})
export class FlytoGlobeMapExampleComponent {
  readonly mapId = 'flyto-globe-map';
  private readonly mapService = inject(MapService);

  readonly mairinqueCoordinates: [number, number] = [-47.1855, -23.5393];
  readonly mairinqueZoom = 14;

  onMapReady(): void {}

  flyToMairinque(): void {
    this.mapService.flyTo(
      this.mapId,
      this.mairinqueCoordinates,
      this.mairinqueZoom,
      2000,
    );
  }
}
