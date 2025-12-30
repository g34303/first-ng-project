import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogSignSharedService } from '../~services/login-signup.service';
import { MasonryComponent } from './masonry/masonry.component';

@Component({
  selector: 'loggedin-page',
  standalone: true,
  imports: [CommonModule, MasonryComponent],
  templateUrl: './loggedin-page.component.html',
  styleUrls: ['./loggedin-page.component.css'],
})
export class LoggedInPageComponent {
  constructor(public ls: LogSignSharedService) {}

  logOut() {
    this.ls.loggedIn = false;
    localStorage.removeItem('loggedIn');
  }
}
