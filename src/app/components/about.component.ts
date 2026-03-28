import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../shared/animation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="min-h-screen flex items-center py-20 px-6 relative overflow-hidden">
      <style>
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
        }

        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .stat-card {
          padding: 20px;
          background: rgba(59, 130, 246, 0.05);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 8px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.5);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
        }

        .profile-card {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          border: 1px solid rgba(96, 165, 250, 0.35);
          box-shadow: 0 18px 38px rgba(15, 23, 42, 0.25);
        }

        .profile-card::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(130deg, rgba(59, 130, 246, 0.25), rgba(77, 211, 254, 0.15), rgba(59, 130, 246, 0.25));
          opacity: 0.4;
          transform: scale(1.06);
          transition: opacity 0.4s ease;
        }

        .profile-card:hover::before {
          opacity: 0.6;
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease, filter 0.8s ease;
        }

        .profile-card:hover .profile-image {
          transform: scale(1.08);
          filter: brightness(1.08) contrast(1.05);
        }

        .code-overlay {
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(2px);
        }

        .code-overlay:hover {
          background: rgba(0, 0, 0, 0.52);
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-top: 8px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, rgb(59, 130, 246), rgb(96, 165, 250));
          border-radius: 3px;
          animation: fillProgress 1.5s ease-out forwards;
        }

        @keyframes fillProgress {
          from { width: 0%; }
          to { width: var(--progress-width, 100%); }
        }
      </style>

      <!-- Fondo animado -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-accent opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style="animation-delay: 2s;"></div>
      </div>

      <div class="max-w-6xl mx-auto w-full">
        <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center fade-in-up">
          Acerca de <span class="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">mí</span>
        </h2>

        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Contenido de texto -->
          <div class="space-y-6 slide-in-left">
            <p class="text-slate-400 text-lg">
              Soy un desarrollador apasionado enfocado en crear soluciones y aplicaciones escalables y eficientes. 
              Cuento con experiencia sólida tanto en frontend como en backend, utilizando tecnologías modernas como React, 
              Angular y Node.js para implementar soluciones innovadoras.
            </p>
            
            <p class="text-slate-400 text-lg">
              Mi enfoque está en escribir código limpio siguiendo principios SOLID y Clean Architecture, asegurando que cada 
              proyecto sea mantenible y escalable. Tengo experiencia en bases de datos relacionales, autenticación con JWT y 
              Firebase, containerization con Docker, y en el desarrollo de APIs REST.
            </p>

            <p class="text-slate-400 text-lg">
              Soy un profesional en constante aprendizaje, listo para enfrentar nuevos desafíos y demostrar mis habilidades 
              en un equipo dinámico.
            </p>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 pt-6">
              <div class="stat-card fade-in-up" style="animation-delay: 0.2s">
                <div class="text-3xl font-bold text-accent">3+</div>
                <div class="text-sm text-slate-400 mt-2">Años Experiencia</div>
              </div>
              <div class="stat-card fade-in-up" style="animation-delay: 0.4s">
                <div class="text-3xl font-bold text-accent">10+</div>
                <div class="text-sm text-slate-400 mt-2">Proyectos</div>
              </div>
              <div class="stat-card fade-in-up" style="animation-delay: 0.6s">
                <div class="text-3xl font-bold text-accent">10+</div>
                <div class="text-sm text-slate-400 mt-2">Tecnologías</div>
              </div>
            </div>
          </div>

          <!-- Imagen y elemento visual -->
          <div class="relative slide-in-right">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-accent to-blue-600 rounded-lg opacity-20 pulse-glow" style="filter: blur(20px);"></div>
              <div class="profile-card relative w-full h-96 flex items-center justify-center overflow-hidden">
                <img src="/joaquin-profile.jpg" alt="Joaquín Fernández Redondo - Desarrollador Full Stack" 
                     class="profile-image rounded-lg opacity-90 transition-opacity duration-300" />
                
                <!-- Overlay con código decorativo -->
                <div class="code-overlay absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <pre class="text-xs text-white font-mono p-4 text-left"><code>{{ codeSnippet }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChildren('statCard') statCards!: QueryList<ElementRef>;

  codeSnippet = `const developer = {
  name: 'Joaquín',
  passion: 'Clean Code',
  motto: 'Build with Purpose'
}`;

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    this.addBlobAnimation();
  }

  ngAfterViewInit(): void {
    // Animar estadísticas cuando sean visibles
    this.statCards.forEach((card, index) => {
      setTimeout(() => {
        this.animationService.observeElement(card.nativeElement, () => {
          card.nativeElement.classList.add('fade-in-up');
        });
      }, index * 100);
    });
  }

  private addBlobAnimation(): void {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(20px, -50px) scale(1.1); }
        50% { transform: translate(-20px, 20px) scale(0.9); }
        75% { transform: translate(50px, 50px) scale(1.05); }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
    `;
    document.head.appendChild(style);
  }
}
