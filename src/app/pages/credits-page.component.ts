import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CreditsComponent } from '../components/credits/credits.component';

@Component({
  selector: 'app-credits-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CreditsComponent],
  template: `<app-credits />`,
})
export class CreditsPageComponent {}
