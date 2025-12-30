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
  images: string[] = ['assets/img1.jpg', 'assets/img2.jpg', 'assets/img3.jpg'];

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
