import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  category: string;
  items: {
    name: string;
    level: string;
    context: string;
  }[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="min-h-screen py-20 px-6">
      <div class="max-w-6xl mx-auto w-full">
        <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center">
          Habilidades y <span class="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Tecnologías</span>
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            *ngFor="let skill of skills"
            class="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-accent transition"
            data-aos="flip-left">
            
            <h3 class="text-lg font-bold mb-4 text-accent">{{ skill.category }}</h3>
            
            <div class="space-y-3">
              <div *ngFor="let item of skill.items" class="border border-slate-700/70 rounded-lg p-3 bg-slate-900/40">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-slate-200 font-medium">{{ item.name }}</span>
                  <span class="text-xs text-blue-300 bg-blue-500/10 border border-blue-400/30 px-2 py-1 rounded-full">
                    {{ item.level }}
                  </span>
                </div>
                <p class="text-xs text-slate-400 mt-2">{{ item.context }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-16 grid md:grid-cols-3 gap-6">
          <div class="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <div class="text-4xl font-bold text-accent mb-2">10+</div>
            <p class="text-slate-400">Proyectos Completados</p>
          </div>

          <div class="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <div class="text-4xl font-bold text-accent mb-2">3+</div>
            <p class="text-slate-400">Años de Experiencia</p>
          </div>

          <div class="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <div class="text-4xl font-bold text-accent mb-2">Activo</div>
            <p class="text-slate-400">GitHub en uso continuo</p>
          </div>
        </div>

        <div class="mt-8 text-center">
          <a
            href="https://github.com/JoaquinJx"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-accent text-accent hover:bg-accent/10 transition">
            Ver actividad y repositorios en GitHub
          </a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class SkillsComponent {
  skills: Skill[] = [
    {
      category: 'Frontend',
      items: [
        { name: 'Angular', level: 'Uso profesional', context: 'Desarrollo de SPA con componentes standalone y TypeScript estricto.' },
        { name: 'React', level: 'Intermedio', context: 'Implementación de interfaces para paneles y dashboards.' },
        { name: 'TypeScript', level: 'Avanzado', context: 'Tipado fuerte, patrones de arquitectura y mantenimiento de código.' },
        { name: 'Tailwind CSS', level: 'Intermedio', context: 'Diseño de interfaces responsivas con foco en velocidad de entrega.' }
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js / NestJS', level: 'Uso profesional', context: 'APIs REST, autenticación JWT y separación por capas.' },
        { name: 'Java / Spring Boot', level: 'Intermedio', context: 'Servicios backend y diseño de endpoints orientados a dominio.' },
        { name: 'PostgreSQL', level: 'Uso profesional', context: 'Modelado relacional, consultas y migraciones con Prisma.' },
        { name: 'SQL Server', level: 'Intermedio', context: 'Consultas y mantenimiento de esquemas en entornos heredados.' }
      ]
    },
    {
      category: 'Tools & Arquitectura',
      items: [
        { name: 'Docker', level: 'Intermedio', context: 'Entornos reproducibles para desarrollo y despliegue.' },
        { name: 'Git / GitHub', level: 'Uso profesional', context: 'Flujos de ramas, PR y colaboración técnica diaria.' },
        { name: 'Jest', level: 'Intermedio', context: 'Pruebas unitarias en servicios backend.' },
        { name: 'Linux', level: 'Intermedio', context: 'Automatización y operación de herramientas de desarrollo.' }
      ]
    },
    {
      category: 'Conceptos',
      items: [
        { name: 'Clean Architecture', level: 'Aplicado', context: 'Diseño desacoplado para facilitar cambios y testing.' },
        { name: 'SOLID', level: 'Aplicado', context: 'Código mantenible en módulos backend y frontend.' },
        { name: 'REST APIs', level: 'Uso profesional', context: 'Diseño de contratos consistentes y versionables.' },
        { name: 'Testing', level: 'Intermedio', context: 'Cobertura de lógica crítica en servicios y casos de uso.' }
      ]
    }
  ];
}
