import { Injectable } from '@angular/core';
import { Observable, interval, takeUntil, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private destroy$ = new Subject<void>();

  /**
   * Efecto de typing/terminal - escribe texto carácter por carácter
   */
  typeWriter(text: string, speed: number = 50): Observable<string> {
    return new Observable((observer) => {
      let index = 0;
      
      const subscription = interval(speed).subscribe(() => {
        if (index < text.length) {
          observer.next(text.substring(0, index + 1));
          index++;
        } else {
          subscription.unsubscribe();
          observer.complete();
        }
      });
    });
  }

  /**
   * Efecto de parpadeo de cursor
   */
  getCursorAnimation(): string {
    return `
      @keyframes blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
      .cursor-blink {
        animation: blink 1s infinite;
      }
    `;
  }

  /**
   * Parallax scrolling effect
   */
  getScrollOffset(element: HTMLElement, speed: number = 0.5): number {
    if (!element) return 0;
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const scrollProgress = (windowHeight - elementPosition) / windowHeight;
    return scrollProgress * 100 * speed;
  }

  /**
   * Animación de fade-up
   */
  getFadeUpAnimation(): string {
    return `
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .fade-up {
        animation: fadeUp 0.8s ease-out forwards;
      }
    `;
  }

  /**
   * Animación de slide
   */
  getSlideAnimation(): string {
    return `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .slide-in {
        animation: slideIn 0.8s ease-out forwards;
      }
    `;
  }

  /**
   * Animación de glow
   */
  getGlowAnimation(): string {
    return `
      @keyframes glow {
        0% {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0);
        }
        50% {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
        }
        100% {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0);
        }
      }
      .glow {
        animation: glow 2s ease-in-out infinite;
      }
    `;
  }

  /**
   * Detectar cuando un elemento entra en viewport
   */
  observeElement(element: HTMLElement, callback: () => void): IntersectionObserver {
    const options = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(element);
    return observer;
  }

  /**
   * Cleanup
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
