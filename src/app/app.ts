import { Component, signal } from '@angular/core';
import { LoginButtonComponent } from './login-modal/login-modal.component';
import { SignUpComponent } from './signup-modal/signup-modal.component';
import { LogSignSharedService } from './~services/login-signup.service';
import { KeyTriggerService } from './~services/keytrigger.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginButtonComponent, SignUpComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  protected readonly title = signal('first-ng-project');
  constructor(public ls: LogSignSharedService, public keyTrigger: KeyTriggerService) {}

  backTickStatus() {
    console.log(this.keyTrigger.backTickHeld());
  }
}
