import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../~services/auth.service';
import { KeyTriggerService } from '../~services/keytrigger.service';
import { LogSignSharedService } from '../~services/login-signup.service';

@Component({
  selector: 'login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginButtonComponent {
  today: Date;
  constructor(
    private auth: AuthService,
    public keyTrigger: KeyTriggerService,
    public ls: LogSignSharedService
  ) {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === ',') {
      this.keyTrigger.backTickHeld.set(true);
    }
  }
  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === ',') {
      this.keyTrigger.backTickHeld.set(false);
    }
  }

  onSubmit() {
    const username = this.loginForm.value.username!;
    const password = this.loginForm.value.password!;
    this.auth.login(username, password).subscribe({
      next: (res) => {
        console.log(res);
        this.ls.setUsername(res.username);
        this.ls.getJoinedDate(res.joinedDate);
        this.ls.loginMessage = 'Login successful!';

        this.ls.closeLoginModal();
        this.ls.openLoggedInPage();
      },
      error: (err) => {
        console.log(err);
        this.ls.loginMessage = 'Invalid username or password.';
      },
    });
  }

  loginSuccessCheck() {
    alert(this.ls.loginMessage);
    console.log(this.ls.loginMessage);
  }
}
