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
  isLoggedInPageOpen = signal(false);
  isTyped = false;
  isClicked = false;
  loginMessage: string = '';
  clickRegister = false;
  username = signal<string | null>(null);
  joinedDate = signal<Date | null>(null);
  loggedIn = false;

  errorMessage = signal<string | null>(null);

  setErrorMessage(msg: string | null) {
    this.errorMessage.set(msg);
  }

  resetErrorMessage() {
    this.errorMessage.set(null);
  }

  setUsername(name: string) {
    this.username.set(name);
  }

  getJoinedDate(date: Date) {
    this.joinedDate.set(date);
  }

  constructor(public keyTrigger: KeyTriggerService) {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
    this.username.set(localStorage.getItem('username'));
    // local storage stores strings ONLY
    const storedDate = localStorage.getItem('joinedDate');
    this.joinedDate.set(storedDate ? new Date(storedDate) : null);
  }

  //note: NEVER DO this.keyTrigger.backTickHeld = signal(false);

  buttonClick() {
    this.isClicked = !this.isClicked;
  }

  allModalsClosed(): boolean {
    if (
      !this.isLoginModalOpen() &&
      !this.isSigninModalOpen() &&
      !this.isSuccessModalOpen() &&
      !this.isLoggedInPageOpen()
    ) {
      return true;
    } else {
      return false;
    }
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

  openLoggedInPage() {
    this.isLoggedInPageOpen.set(true);
  }

  closeLoggedInPage() {
    this.isLoggedInPageOpen.set(false);
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
