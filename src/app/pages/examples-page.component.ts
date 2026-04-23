import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExamplesComponent } from '../components/examples/examples.component';

@Component({
  selector: 'app-examples-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExamplesComponent],
  template: `<app-examples />`,
})
export class ExamplesPageComponent {}
