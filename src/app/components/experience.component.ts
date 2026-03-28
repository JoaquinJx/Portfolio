import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../shared/animation.service';

interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  type: 'work' | 'education';
  icon: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-20 px-6 relative overflow-hidden">
      <style>
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseCircle {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }

        .slide-in-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .slide-in-right {
          animation: slideInFromRight 0.8s ease-out forwards;
          opacity: 0;
        }

        .experience-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .timeline {
          position: relative;
          padding: 20px 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.2));
        }

        @media (max-width: 768px) {
          .timeline::before {
            left: 30px;
          }
        }

        .timeline-item {
          margin-bottom: 50px;
          position: relative;
        }

        .timeline-item:nth-child(odd) .experience-card {
          margin-left: 0;
          margin-right: auto;
          width: calc(50% - 50px);
        }

        .timeline-item:nth-child(even) .experience-card {
          margin-left: auto;
          margin-right: 0;
          width: calc(50% - 50px);
        }

        .timeline-dot {
          position: absolute;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgb(59, 130, 246), rgb(96, 165, 250));
          border: 3px solid rgba(15, 23, 42, 1);
          border-radius: 50%;
          left: 50%;
          top: 30px;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          animation: pulseCircle 2s ease-in-out infinite;
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .timeline-dot {
            left: 30px;
          }

          .timeline-item:nth-child(odd) .experience-card,
          .timeline-item:nth-child(even) .experience-card {
            width: calc(100% - 100px);
            margin-left: 70px !important;
            margin-right: 0 !important;
          }
        }

        .experience-card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8));
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .experience-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: all 0.6s;
        }

        .experience-card:hover::before {
          left: 100%;
        }

        .experience-card:hover {
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
          transform: translateY(-5px);
          background: linear-gradient(135deg, rgba(15, 23, 42, 1), rgba(30, 41, 59, 1));
        }

        .experience-header {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .company-info {
          flex: 1;
        }

        .company-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: rgb(59, 130, 246);
          margin-bottom: 4px;
        }

        .position {
          font-size: 1.3rem;
          font-weight: bold;
          color: white;
          margin-bottom: 4px;
        }

        .period {
          font-size: 0.9rem;
          color: rgb(148, 163, 184);
        }

        .experience-description {
          color: rgb(148, 163, 184);
          margin-bottom: 16px;
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }

        .achievements {
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .achievement-item {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
          color: rgb(148, 163, 184);
          font-size: 0.9rem;
        }

        .achievement-icon {
          color: rgb(59, 130, 246);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          position: relative;
          z-index: 1;
        }

        .tech-tag {
          font-size: 0.75rem;
          background: rgba(59, 130, 246, 0.15);
          color: rgb(147, 197, 253);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }

        .experience-card:hover .tech-tag {
          background: rgba(59, 130, 246, 0.25);
          border-color: rgba(59, 130, 246, 0.6);
          transform: scale(1.05);
        }

        .section-title {
          text-align: center;
          margin-bottom: 50px;
          animation: fadeInScale 0.8s ease-out;
        }

        .title-text {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 12px;
          background: linear-gradient(135deg, white, rgb(148, 163, 184));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .experience-type-badge {
          display: inline-block;
          background: rgba(59, 130, 246, 0.2);
          color: rgb(96, 165, 250);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }
      </style>

      <!-- Fondo decorativo -->
      <div class="absolute inset-0 -z-10 pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 opacity-10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent opacity-10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div class="experience-container">
        <!-- Título -->
        <div class="section-title">
          <h2 class="title-text">
            Experiencia <span class="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Profesional</span>
          </h2>
        </div>

        <!-- Timeline -->
        <div class="timeline">
          <div 
            *ngFor="let exp of experiences; let i = index"
            class="timeline-item"
            [style.animation-delay]="(i * 0.1) + 's'">
            
            <!-- Dot de timeline -->
            <div class="timeline-dot">{{ exp.icon }}</div>

            <!-- Card de experiencia -->
            <div 
              class="experience-card"
              [ngClass]="i % 2 === 0 ? 'slide-in-left' : 'slide-in-right'"
              #expCard>
              
              <!-- Badge de tipo -->
              <span class="experience-type-badge">
                {{ exp.type === 'work' ? '💼 Experiencia Laboral' : '🎓 Educación' }}
              </span>

              <!-- Header -->
              <div class="experience-header">
                <div class="company-info">
                  <div class="company-name">{{ exp.company }}</div>
                  <div class="position">{{ exp.position }}</div>
                  <div class="period">{{ exp.period }}</div>
                </div>
              </div>

              <!-- Descripción -->
              <p class="experience-description">{{ exp.description }}</p>

              <!-- Logros -->
              <div class="achievements" *ngIf="exp.achievements.length > 0">
                <div 
                  *ngFor="let achievement of exp.achievements"
                  class="achievement-item">
                  <span class="achievement-icon">✓</span>
                  <span>{{ achievement }}</span>
                </div>
              </div>

              <!-- Stack tecnológico -->
              <div class="tech-stack">
                <span 
                  *ngFor="let tech of exp.technologies"
                  class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChildren('expCard') experienceCards!: QueryList<ElementRef>;

  constructor(private animationService: AnimationService) {}

  experiences: Experience[] = [
    {
      id: 1,
      company: 'Akui Solutions',
      position: 'Full Stack Developer',
      period: 'Julio 2025 - Diciembre 2025',
      description: 'Desarrollo profesional de aplicaciones backend utilizando arquitectura hexagonal. Implementé soluciones escalables con Node.js y NestJS, siguiendo principios SOLID y Clean Code. Trabajé en un proyecto de gestión de seguros facilitando a brokers y empresas la implementación y gestión integral del servicio.',
      technologies: ['Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'GitHub', 'Postman', 'Pruebas Unitarias'],
      achievements: [
        'Implementación de arquitectura hexagonal en backend profesional',
        'Desarrollo de APIs REST robustas con NestJS y TypeScript',
        'Configuración de base de datos PostgreSQL con Prisma ORM',
        'Realización de pruebas unitarias garantizando funcionalidad del código',
        'Trabajo en proyecto de gestión seguros para brokers y empresas'
      ],
      type: 'work',
      icon: '💻'
    }
  ];

  ngAfterViewInit(): void {
    // Opcional: animar cards cuando entren en viewport
    this.experienceCards.forEach((card, index) => {
      setTimeout(() => {
        this.animationService.observeElement(card.nativeElement, () => {
          // Las animaciones están aplicadas por las clases slide-in-left/right
        });
      }, index * 100);
    });
  }
}
