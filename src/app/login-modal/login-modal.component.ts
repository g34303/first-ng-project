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
  constructor(
    private auth: AuthService,
    public keyTrigger: KeyTriggerService,
    public ls: LogSignSharedService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === '`') {
      this.keyTrigger.backTickHeld.set(true);
    }
  }
  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === '`') {
      this.keyTrigger.backTickHeld.set(false);
    }
  }

  onSubmit() {
    const username = this.loginForm.value.username!;
    const password = this.loginForm.value.password!;
    this.auth.login(username, password).subscribe({
      next: (res) => {
        console.log(res);
        this.ls.loginMessage = 'Login successful!';
        alert(this.ls.loginMessage);
      },
      error: (err) => {
        console.log(err);
        this.ls.loginMessage = 'Invalid username or password.';
        alert(this.ls.loginMessage);
      },
    });
  }

  loginSuccessCheck() {
    alert(this.ls.loginMessage);
  }
}
