import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  constructor() {
    console.log('APP COMPONENT CONSTRUCTED');
  }
  protected readonly title = signal('first-ng-project');
}
