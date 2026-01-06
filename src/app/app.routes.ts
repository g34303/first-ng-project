import { Routes } from '@angular/router';
import { LoggedInPageComponent } from './loggedin-page/loggedin-page.component';
import { AppComponent } from './app';

export const routes: Routes = [
  { path: 'dashboard', component: LoggedInPageComponent },
  { path: '', component: AppComponent },
];
