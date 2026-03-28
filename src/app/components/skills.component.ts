import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  category: string;
  items: string[];
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
              <div *ngFor="let item of skill.items" class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-accent"></div>
                <span class="text-slate-300">{{ item }}</span>
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
            <div class="text-4xl font-bold text-accent mb-2">0+</div>
            <p class="text-slate-400">Clientes Felices</p>
          </div>
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
      items: ['React', 'Angular', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Tailwind CSS']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'Java', 'PostgreSQL', 'SQL Server', 'JWT', 'FirebaseAuth']
    },
    {
      category: 'Tools & Arquitectura',
      items: ['Docker', 'Git', 'Jest', 'Jira', 'VS Code', 'Eclipse', 'Linux']
    },
    {
      category: 'Conceptos',
      items: ['Clean Architecture', 'SOLID', 'REST', 'SaaS', 'Escalabilidad', 'Testing']
    }
  ];
}
