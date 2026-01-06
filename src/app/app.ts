import { Component, signal, effect } from '@angular/core';
import { LoginButtonComponent } from './login-modal/login-modal.component';
import { SignUpComponent } from './signup-modal/signup-modal.component';
import { LogSignSharedService } from './~services/login-signup.service';
import { KeyTriggerService } from './~services/keytrigger.service';
import { LoggedInPageComponent } from './loggedin-page/loggedin-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginButtonComponent, SignUpComponent, LoggedInPageComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  protected readonly title = signal('first-ng-project');
  constructor(public ls: LogSignSharedService, public keyTrigger: KeyTriggerService) {
    effect(() => {
      this.ls.confettiTrigger();
      setTimeout(() => {
        this.startConfetti();
      });
    });
  }
  private startConfetti(): void {
    if (this.confettiIntervalId !== null) return;
    this.confetti();
  }

  public stopConfetti(): void {
    if (this.confettiIntervalId !== null) {
      clearInterval(this.confettiIntervalId);
      this.confettiIntervalId = null;
    }
  }

  private confettiIntervalId: number | null = null;

  confetti(): void {
    const canvas = document.getElementById('confetti') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const mp = 150; // max particles
    const types = ['circle', 'circle', 'triangle', 'triangle', 'line'];

    const colors = [
      [238, 96, 169],
      [68, 213, 217],
      [245, 187, 152],
      [144, 148, 188],
      [235, 234, 77],
    ];

    const angles = [
      [4, 0, 4, 4],
      [2, 2, 0, 4],
      [0, 4, 2, 2],
      [0, 4, 4, 4],
    ];

    const particles: {
      x: number;
      y: number;
      r: number;
      d: number;
      l: number;
      a: number[];
      c: number[];
      t: string;
    }[] = [];

    // create particles
    for (let i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 4 + 1,
        d: Math.random() * mp,
        l: Math.floor(Math.random() * 65 - 30),
        a: angles[Math.floor(Math.random() * angles.length)],
        c: colors[Math.floor(Math.random() * colors.length)],
        t: types[Math.floor(Math.random() * types.length)],
      });
    }

    const update = () => {
      for (const p of particles) {
        p.y += Math.cos(p.d) + 1 + p.r / 2;

        if (p.y > H) {
          p.y = -10;
          p.x = Math.random() * W;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        const opacity = p.r <= 3 ? 0.4 : 0.8;

        if (p.t === 'circle') {
          ctx.fillStyle = `rgba(${p.c.join(',')}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }

        if (p.t === 'triangle') {
          ctx.fillStyle = `rgba(${p.c.join(',')}, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.r * p.a[0], p.y + p.r * p.a[1]);
          ctx.lineTo(p.x + p.r * p.a[2], p.y + p.r * p.a[3]);
          ctx.closePath();
          ctx.fill();
        }

        if (p.t === 'line') {
          ctx.strokeStyle = `rgba(${p.c.join(',')}, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.l, p.y + p.r * 5);
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      update();
    };

    this.confettiIntervalId = window.setInterval(draw, 23);

    window.addEventListener('resize', () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    });
  }
}
