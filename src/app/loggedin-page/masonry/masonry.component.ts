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
    'https://unsplash.it/700/600?image=634',
    'https://unsplash.it/700/300?image=455',
    'https://unsplash.it/1500/700?image=629',
    'https://unsplash.it/700?image=594',
    'https://unsplash.it/700/450?image=417',
    'https://unsplash.it/700/400?image=410',
    'https://unsplash.it/700/550?image=628',
    'https://unsplash.it/700/450?image=421',
    'https://unsplash.it/700/567?image=572',
    'https://unsplash.it/700/978?image=623',
    'https://unsplash.it/700/654?image=621',
    'https://unsplash.it/700/500?image=423',
    'https://unsplash.it/1000/654?image=930',
    'https://unsplash.it/700/950?image=1045',
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
