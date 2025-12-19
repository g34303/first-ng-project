import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../~services/auth.service';
import { LogSignSharedService } from '../~services/login-signup.service';
import { KeyTriggerService } from '../~services/keytrigger.service';

@Component({
  selector: 'signup-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css'],
})
export class SignUpComponent {
  constructor(
    private auth: AuthService,
    public keyTrigger: KeyTriggerService,
    public ls: LogSignSharedService
  ) {}

  signinForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passConfirm: new FormControl('', Validators.required),
  });

  onSubmit() {
    const username = this.signinForm.value.username!;
    const password = this.signinForm.value.password!;
    const passConfirm = this.signinForm.value.passConfirm!;

    this.auth.register(username!, password!, passConfirm!).subscribe({
      // next and err actually checks backend to see if register was successful
      error: (err) => {
        alert(err.error?.message || 'Registration failed');
      },
      next: () => {
        this.ls.openSuccessModal();
        this.ls.closeSigninModal();
      },
    });
    console.log(this.signinForm.value);
  }
}
