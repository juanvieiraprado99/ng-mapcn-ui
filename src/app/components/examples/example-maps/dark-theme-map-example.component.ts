import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapComponent, MapControlsComponent } from 'ng-mapcn';

@Component({
    selector: 'app-dark-theme-map-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'example-map-container dark-theme' },
    imports: [MapComponent, MapControlsComponent],
    template: `
    <div class="map-wrapper">
      <ng-map
        [mapId]="mapId"
        [center]="[0, 0]"
        [zoom]="2"
        [theme]="'dark'"
        (mapReady)="onMapReady()"
      />
      <ng-map-controls
        [mapId]="mapId"
        [position]="'top-right'"
        [showZoom]="true"
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
export class DarkThemeMapExampleComponent {
  readonly mapId = 'dark-theme-map';

  onMapReady(): void {}
}
