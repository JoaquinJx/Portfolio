import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../shared/animation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <style>
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes terminal-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .glow-text {
          animation: glow 2s ease-in-out infinite;
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: rgb(59, 130, 246);
          animation: terminal-blink 1s infinite;
          margin-left: 4px;
        }

        .terminal-window {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 8px;
          padding: 16px;
          font-family: 'Monaco', 'Courier New', monospace;
          color: rgb(59, 130, 246);
          font-size: 14px;
          line-height: 1.6;
          backdrop-filter: blur(10px);
          max-width: 600px;
          margin: 32px auto;
        }

        .terminal-header {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }
      </style>

      <div class="absolute inset-0 -z-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-accent opacity-20 rounded-full mix-blend-multiply filter blur-3xl float"></div>
        <div class="absolute -bottom-8 right-10 w-72 h-72 bg-blue-600 opacity-20 rounded-full mix-blend-multiply filter blur-3xl float" style="animation-delay: 2s;"></div>
      </div>

      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 slide-up">
          Hola, soy <span class="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Joaquín</span>
        </h1>
        
        <!-- Terminal interactivo -->
        <div class="terminal-window">
          <div class="terminal-header">
            <div class="terminal-dot dot-red"></div>
            <div class="terminal-dot dot-yellow"></div>
            <div class="terminal-dot dot-green"></div>
          </div>
          <div class="space-y-2">
            <div>$ whoami</div>
            <div style="color: rgb(148, 163, 184);">Full Stack Developer | Innovator</div>
            <div style="margin-top: 8px;">$ cat skills.txt</div>
            <div style="color: rgb(148, 163, 184); line-height: 2;">
              {{ displayedText }}<span class="cursor" *ngIf="showCursor"></span>
            </div>
          </div>
        </div>
        
        <p class="text-xl md:text-2xl text-slate-400 mb-8 slide-up" style="animation-delay: 0.2s">
          Creando soluciones escalables, eficientes e innovadoras
        </p>

        <div class="flex gap-4 justify-center flex-wrap slide-up" style="animation-delay: 0.4s">
          <button 
            class="group px-8 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg transition transform hover:scale-105 hover:shadow-lg hover:shadow-accent/50"
            (click)="scrollToProjects()">
            <span class="block">Ver Proyectos</span>
          </button>
          <button 
            class="group px-8 py-3 border-2 border-accent text-accent hover:bg-accent/10 rounded-lg transition transform hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
            (click)="downloadCV()">
            <span class="block">Descargar CV</span>
          </button>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 slide-up" style="animation-delay: 0.8s">
          <div class="flex flex-col items-center gap-2">
            <span class="text-sm text-slate-400">Scroll to explore</span>
            <div class="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
              <div class="w-1 h-2 bg-accent rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HeroComponent implements OnInit {
  @ViewChild('terminal') terminalElement!: ElementRef;
  
  displayedText = '';
  showCursor = true;
  private fullText = 'TypeScript • JavaScript • Node.js • NestJS • React • Angular • PostgreSQL • Docker • Test unitarios';

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    this.startTypewriterEffect();
  }

  private startTypewriterEffect(): void {
    this.showCursor = true;
    this.displayedText = '';
    this.animationService.typeWriter(this.fullText, 30).subscribe(
      (text) => {
        this.displayedText = text;
      },
      (error) => console.error('Error en typewriter:', error),
      () => {
        this.showCursor = false;
      }
    );
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    // Efecto de glow que sigue al mouse (opcional, para futuros enhancements)
  }

  scrollToProjects(): void {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadCV(): void {
    // Crear un enlace temporal para descargar el CV
    const link = document.createElement('a');
    link.href = 'Joaquin_Fernandez_Redondo_CV.pdf'; // Ruta relativa al archivo en public/
    link.download = 'Joaquin_Fernandez_Redondo_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
