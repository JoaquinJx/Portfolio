import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../shared/animation.service';

interface Project {
  id: number;
  title: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  repository: string;
  demo?: string;
  icon: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="min-h-screen py-20 px-6 bg-secondary/30 relative overflow-hidden">
      <style>
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .project-card {
          animation: zoomIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .project-card:hover {
          animation: cardFloat 3s ease-in-out infinite;
        }

        .project-card-inner {
          position: relative;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8));
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          padding: 24px;
          height: 100%;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .project-card-inner::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: all 0.6s;
        }

        .project-card:hover .project-card-inner {
          background: linear-gradient(135deg, rgba(15, 23, 42, 1), rgba(30, 41, 59, 1));
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
          transform: translateY(-5px);
        }

        .project-card:hover .project-card-inner::before {
          animation: shimmer 0.6s ease-out;
        }

        .project-icon {
          font-size: 3rem;
          margin-bottom: 12px;
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .project-tag {
          font-size: 0.75rem;
          background: rgba(59, 130, 246, 0.15);
          color: rgb(147, 197, 253);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }

        .project-card:hover .project-tag {
          background: rgba(59, 130, 246, 0.25);
          border-color: rgba(59, 130, 246, 0.6);
          transform: scale(1.05);
        }

        .project-link {
          color: rgb(59, 130, 246);
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
        }

        .project-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, rgb(59, 130, 246), rgb(96, 165, 250));
          transition: width 0.3s ease;
        }

        .project-card:hover .project-link::after {
          width: 100%;
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 12px;
          color: white;
          position: relative;
          z-index: 1;
        }

        .project-description {
          color: rgb(148, 163, 184);
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
          line-height: 1.6;
        }
      </style>

      <!-- Fondo decorativo -->
      <div class="absolute inset-0 -z-10 pointer-events-none">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 opacity-10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent opacity-10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div class="max-w-6xl mx-auto w-full relative z-10">
        <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center">
          Proyectos <span class="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Destacados</span>
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            *ngFor="let project of projects; let i = index"
            class="project-card"
            [style.animation-delay]="(i * 0.1) + 's'"
            #projectCard>
            
            <div class="project-card-inner">
              <div class="project-icon">{{ project.icon }}</div>
              
              <h3 class="project-title">{{ project.title }}</h3>
              
              <p class="project-description">
                <strong class="text-slate-200">Problema:</strong> {{ project.problem }}
              </p>

              <p class="project-description">
                <strong class="text-slate-200">Solución:</strong> {{ project.solution }}
              </p>

              <p class="project-description">
                <strong class="text-slate-200">Resultado:</strong> {{ project.result }}
              </p>
              
              <div class="project-tags">
                <span 
                  *ngFor="let tag of project.tags"
                  class="project-tag">
                  {{ tag }}
                </span>
              </div>
              
              <a 
                [href]="project.repository"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link">
                Ver repositorio →
              </a>

              <a
                *ngIf="project.demo"
                [href]="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link ml-4">
                Ver demo →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  constructor(private animationService: AnimationService) {}

  projects: Project[] = [
    {
      id: 1,
      title: 'Plataforma Ecoturismo',
      problem: 'La operación manual de reservas y pagos generaba errores y fricción para brokers y usuarios finales.',
      solution: 'Diseñé una plataforma con backend en Node.js y PostgreSQL, autenticación JWT, APIs para reservas y panel administrativo para trazabilidad completa.',
      result: 'Se centralizó el flujo operativo en una única aplicación, reduciendo tareas manuales y mejorando el control de datos del negocio.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'Docker'],
      repository: 'https://github.com/JoaquinJx',
      demo: 'https://www.ecoturismo.com/',
      icon: '🌍'
    },
    {
      id: 2,
      title: 'Mercat Commerce Suite',
      problem: 'Las tiendas gestionaban su catálogo e inventario de forma manual con hojas de cálculo, lo que provocaba quiebres de stock, pérdida de ventas y falta de visibilidad en temporada alta.',
      solution: 'Desarrollé una plataforma e-commerce completa con vitrina pública de productos, carrito de compras, checkout y un backoffice centralizado para que los equipos gestionen el inventario en tiempo real por categorías (Moda, Hogar, Tecnología, Belleza).',
      result: 'Plataforma en producción que permite a las tiendas activarse en minutos, controlar el stock en tiempo real y ofrecer una experiencia de compra premium a sus clientes.',
      tags: ['Angular', 'Tailwind CSS', 'Java', 'Spring Boot', 'Vercel', 'Render'],
      repository: 'https://github.com/JoaquinJx',
      demo: 'https://frontend-inventory-ashen.vercel.app/',
      icon: '🛒'
    }
  ];

  ngAfterViewInit(): void {
    // Opcional: añadir observadores para animar cuando se ven
    this.projectCards.forEach((card, index) => {
      setTimeout(() => {
        this.animationService.observeElement(card.nativeElement, () => {
          card.nativeElement.style.opacity = '1';
        });
      }, index * 100);
    });
  }
}
