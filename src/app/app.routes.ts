import { Routes } from '@angular/router';
import { LoggedInPageComponent } from './loggedin-page/loggedin-page.component';
import { AppComponent } from './app';
import { dashboardRedirectGuard } from './~services/redirect-guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: LoggedInPageComponent,
    canActivate: [dashboardRedirectGuard],
  },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' },
];
