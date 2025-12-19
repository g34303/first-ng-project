import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { KeyTriggerService } from './keytrigger.service';

@Injectable({
  providedIn: 'root',
})
export class LogSignSharedService {
  isLoginModalOpen = signal(false);
  isSigninModalOpen = signal(false);
  isTyped = false;
  isClicked = false;
  loginMessage: string = '';
  clickRegister = false;

  constructor(public keyTrigger: KeyTriggerService) {}

  buttonClick() {
    this.isClicked = !this.isClicked;
  }

  openLoginModal() {
    this.isLoginModalOpen = signal(true);
  }
  closeLoginModal() {
    this.isLoginModalOpen = signal(false);
    this.loginMessage = '';
  }

  openSigninModal() {
    this.isSigninModalOpen = signal(true);
  }
  closeSigninModal() {
    this.isSigninModalOpen = signal(false);
    this.keyTrigger.backTickHeld = signal(false);
  }

  handleRegister() {
    this.clickRegister = true;
    this.keyTrigger.backTickHeld = signal(false);
    // this.closeLoginModal();
    this.openSigninModal();
    console.log('Registration clicked');
  }
}
