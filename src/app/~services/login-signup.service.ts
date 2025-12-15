import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

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

  buttonClick() {
    this.isClicked = !this.isClicked;
  }

  openLoginModal() {
    this.isLoginModalOpen = signal(true);
  }
  closeLoginModal() {
    this.isLoginModalOpen = signal(false);
  }

  openSigninModal() {
    this.isSigninModalOpen = signal(true);
  }
  closeSigninModal() {
    this.isSigninModalOpen = signal(false);
  }

  handleRegister() {
    this.clickRegister = true;
    // this.closeLoginModal();
    this.openSigninModal();
    console.log('Registration clicked');
  }
}
