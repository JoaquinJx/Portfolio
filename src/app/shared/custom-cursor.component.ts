import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  template: `
    <div class="cursor-dot" #cursorDot></div>
    <div class="cursor-outline" #cursorOutline></div>
  `,
  styles: [`
    .cursor-dot {
      position: fixed;
      width: 8px;
      height: 8px;
      background: rgb(59, 130, 246);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
      transform: translate(-50%, -50%);
    }

    .cursor-outline {
      position: fixed;
      width: 30px;
      height: 30px;
      border: 2px solid rgb(59, 130, 246);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      opacity: 0.5;
      transition: opacity 0.2s;
    }

    :global(body) {
      cursor: none;
    }

    :global(a:hover) :global(button:hover) {
      .cursor-outline {
        opacity: 1;
        width: 35px;
        height: 35px;
      }
    }
  `]
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  private cursorDot!: HTMLElement;
  private cursorOutline!: HTMLElement;
  private mouseX = 0;
  private mouseY = 0;
  private dotX = 0;
  private dotY = 0;

  ngOnInit(): void {
    this.cursorDot = document.querySelector('.cursor-dot') as HTMLElement;
    this.cursorOutline = document.querySelector('.cursor-outline') as HTMLElement;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    // Cursor outline sigue al mouse directamente
    this.cursorOutline.style.left = this.mouseX + 'px';
    this.cursorOutline.style.top = this.mouseY + 'px';

    // Cursor dot sigue con un smooth delay
    this.dotX += (this.mouseX - this.dotX) * 0.2;
    this.dotY += (this.mouseY - this.dotY) * 0.2;

    this.cursorDot.style.left = this.dotX + 'px';
    this.cursorDot.style.top = this.dotY + 'px';
  }

  @HostListener('document:mouseenter')
  onMouseEnter(): void {
    this.cursorDot.style.opacity = '1';
    this.cursorOutline.style.opacity = '0.5';
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.cursorDot.style.opacity = '0';
    this.cursorOutline.style.opacity = '0';
  }

  ngOnDestroy(): void {
    // Restaurar cursor normal
    document.body.style.cursor = 'auto';
  }
}
