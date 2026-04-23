import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ApiReferenceSectionComponent } from '../components/api-reference-section/api-reference-section.component';
import { ComponentsSectionComponent } from '../components/components-section/components-section.component';
import { InstallationComponent } from '../components/installation/installation.component';

@Component({
  selector: 'app-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComponentsSectionComponent, InstallationComponent, ApiReferenceSectionComponent],
  template: `<app-components-section /><app-installation /><app-api-reference-section />`,
})
export class DocPageComponent {}
