import { Injectable, signal, computed, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyTriggerService {
  backTickHeld = signal(false);

  showSecret = computed(() => this.backTickHeld());
}
