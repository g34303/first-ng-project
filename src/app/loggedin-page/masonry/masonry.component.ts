import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'masonry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.css'],
})
export class MasonryComponent {
  images: string[] = [
    'https://dabonsym.com/wp-content/uploads/2026/01/zz-2501468461_TX_-1_600x.png',
    'https://dabonsym.com/wp-content/uploads/2026/01/zz-2307549924_TX_-1_600x.png',
    'https://dabonsym.com/wp-content/uploads/2026/01/imgi_13_zz-2507926108_TX_-1_600x.png',
    'https://dabonsym.com/wp-content/uploads/2026/01/055107-Zoom.1_600x.png',
    'https://dabonsym.com/wp-content/uploads/2026/01/zz-2504619507_TX_-2_600x.png',
    'https://dabonsym.com/wp-content/uploads/2026/01/zz-2503493775_TX_-1_600x.png',
    'https://dabonsym.com/wp-content/uploads/2026/01/618934-Zoom.1_600x.png',
    'https://dabonsym.com/wp-content/uploads/2026/01/zz-2505072621_TX_-1_600x.png',
    'https://dabonsym.com/wp-content/uploads/2026/01/4901610430255_600x.png',
    'https://dabonsym.com/wp-content/uploads/2026/01/TuxedoSam_MAGSAFE__Compatible_iPhone12Pro_Case_Front_SALES_600x.png',
    'https://dabonsym.com/wp-content/uploads/2026/01/4550624486088-2_600x.png',
    'https://dabonsym.com/wp-content/uploads/2026/01/zz-2505072575_TX_-1_600x.png',
  ];

  isOpen = false;
  currentIndex = 0;

  open(index: number) {
    this.currentIndex = index;
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    document.body.style.overflow = 'auto';
  }

  next() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.isOpen) {
      this.close();
    }
  }
}
