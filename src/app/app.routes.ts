import { Routes } from '@angular/router';
import { LoggedInPageComponent } from './loggedin-page/loggedin-page.component';
import { dashboardRedirectGuard } from './~services/redirect-guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: LoggedInPageComponent,
    canActivate: [dashboardRedirectGuard],
  },
  { path: '', component: LandingPageComponent },
  { path: '**', redirectTo: '' },
];
