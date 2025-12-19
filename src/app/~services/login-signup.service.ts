import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { KeyTriggerService } from './keytrigger.service';

@Injectable({
  providedIn: 'root',
})
export class LogSignSharedService {
  isLoginModalOpen = signal(false);
  isSigninModalOpen = signal(false);
  isSuccessModalOpen = signal(false);
  isTyped = false;
  isClicked = false;
  loginMessage: string = '';
  clickRegister = false;

  constructor(public keyTrigger: KeyTriggerService) {}

  //note: NEVER DO this.keyTrigger.backTickHeld = signal(false);

  buttonClick() {
    this.isClicked = !this.isClicked;
  }

  openLoginModal() {
    this.isLoginModalOpen.set(true);
  }
  closeLoginModal() {
    this.isLoginModalOpen.set(false);
    this.loginMessage = '';
  }

  openSigninModal() {
    this.isSigninModalOpen.set(true);
  }
  closeSigninModal() {
    this.isSigninModalOpen.set(false);
  }

  openSuccessModal() {
    this.isSuccessModalOpen.set(true);
  }
  closeSuccessModal() {
    this.isSuccessModalOpen.set(false);
  }

  handleRegister() {
    this.clickRegister = true;
    this.keyTrigger.backTickHeld.set(false);
    // this.closeLoginModal();
    this.openSigninModal();
  }

  confettiTrigger = signal(0);

  fireConfetti() {
    this.confettiTrigger.update((v) => v + 1);
  }
}
