import { Routes } from '@angular/router';

import { CreditsPageComponent } from './pages/credits-page.component';
import { DocPageComponent } from './pages/doc-page.component';
import { ExamplesPageComponent } from './pages/examples-page.component';
import { LandingPageComponent } from './pages/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'docs', component: DocPageComponent },
  { path: 'examples', component: ExamplesPageComponent },
  { path: 'credits', component: CreditsPageComponent },
  {
    path: 'api-reference',
    loadComponent: () =>
      import('./pages/api-reference/api-reference-page.component').then(
        m => m.ApiReferencePageComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
