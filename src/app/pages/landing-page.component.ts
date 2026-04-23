import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FeaturesComponent } from '../components/features/features.component';
import { HeroComponent } from '../components/hero/hero.component';

@Component({
  selector: 'app-landing-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeroComponent, FeaturesComponent],
  template: `<app-hero /><app-features />`,
})
export class LandingPageComponent {}
