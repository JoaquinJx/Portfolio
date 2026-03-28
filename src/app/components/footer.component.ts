import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-slate-900 border-t border-slate-700 px-6 py-12">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 class="text-lg font-bold mb-4">Joaquín Fernández</h3>
            <p class="text-slate-400">Full Stack Developer | Creando soluciones escalables y eficientes.</p>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul class="space-y-2 text-slate-400">
              <li><a href="#home" class="hover:text-accent transition">Inicio</a></li>
              <li><a href="#about" class="hover:text-accent transition">Acerca de mí</a></li>
              <li><a href="#projects" class="hover:text-accent transition">Proyectos</a></li>
              <li><a href="#skills" class="hover:text-accent transition">Habilidades</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Conectar</h4>
            <ul class="space-y-2 text-slate-400">
              <li><a href="https://www.linkedin.com/in/joaquin-fernandez-207057210" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition">LinkedIn</a></li>
              <li><a href="mailto:joaquin.fernandez2980@gmail.com" class="hover:text-accent transition">Email</a></li>
              <li><a href="https://github.com/JoaquinJx" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-700 pt-8 text-center text-slate-500">
          <p>&copy; 2026 Joaquín Fernández. All rights reserved.</p>
          <p class=\"mt-2 text-sm\">Built with Angular, TypeScript and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {}
