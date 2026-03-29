import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed w-full top-0 z-50 backdrop-blur-md bg-primary/80 border-b border-slate-700">
      <nav class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Portfolio
        </div>
        
        <button 
          (click)="toggleMenu()"
          class="md:hidden flex flex-col gap-1 cursor-pointer">
          <span class="w-6 h-0.5 bg-white block"></span>
          <span class="w-6 h-0.5 bg-white block"></span>
          <span class="w-6 h-0.5 bg-white block"></span>
        </button>

        <ul class="hidden md:flex gap-8" *ngIf="!isMobileOpen()">
          <li><a href="#home" class="hover:text-accent transition">Inicio</a></li>
          <li><a href="#about" class="hover:text-accent transition">Acerca de mí</a></li>
          <li><a href="#experience" class="hover:text-accent transition">Experiencia</a></li>
          <li><a href="#projects" class="hover:text-accent transition">Proyectos</a></li>
          <li><a href="#skills" class="hover:text-accent transition">Habilidades</a></li>
          <li><a href="#contact" class="hover:text-accent transition">Contacto</a></li>
          <li>
            <a
              href="Joaquin_Fernandez_Redondo_CV.pdf"
              download
              class="px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition">
              Descargar CV
            </a>
          </li>
        </ul>

        <ul 
          *ngIf="isMobileOpen()" 
          class="absolute top-full left-0 right-0 bg-secondary border-t border-slate-700 md:hidden flex flex-col p-4 gap-4">
          <li><a href="#home" class="hover:text-accent transition">Inicio</a></li>
          <li><a href="#about" class="hover:text-accent transition">Acerca de mí</a></li>
          <li><a href="#experience" class="hover:text-accent transition">Experiencia</a></li>
          <li><a href="#projects" class="hover:text-accent transition">Proyectos</a></li>
          <li><a href="#skills" class="hover:text-accent transition">Habilidades</a></li>
          <li><a href="#contact" class="hover:text-accent transition">Contacto</a></li>
          <li>
            <a
              href="Joaquin_Fernandez_Redondo_CV.pdf"
              download
              class="inline-block px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition">
              Descargar CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  isMobileOpen = signal(false);

  toggleMenu() {
    this.isMobileOpen.update(value => !value);
  }
}
