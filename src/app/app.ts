import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { HeroComponent } from './components/hero.component';
import { AboutComponent } from './components/about.component';
import { ExperienceComponent } from './components/experience.component';
import { ProjectsComponent } from './components/projects.component';
import { SkillsComponent } from './components/skills.component';
import { ContactComponent } from './components/contact.component';
import { FooterComponent } from './components/footer.component';
import { CustomCursorComponent } from './shared/custom-cursor.component';

declare global {
  interface Window {
    AOS: any;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CustomCursorComponent,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <app-custom-cursor></app-custom-cursor>
    
    <app-header></app-header>
    <main class="pt-16">
      <app-hero></app-hero>
      <app-about></app-about>
      <app-experience></app-experience>
      <app-projects></app-projects>
      <app-skills></app-skills>
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>

    <style>
      :host {
        --scroll-bar-color: rgb(59, 130, 246);
      }

      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(15, 23, 42, 0.5);
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, rgb(59, 130, 246), rgb(96, 165, 250));
        border-radius: 5px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, rgb(96, 165, 250), rgb(147, 197, 253));
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
      }

      /* Smooth scroll */
      html {
        scroll-behavior: smooth;
      }

      /* Global animations */
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      body {
        animation: fadeIn 0.5s ease-in;
      }
    </style>
  `,
  styles: [],
})
export class App implements OnInit, AfterViewInit {
  ngOnInit() {
    // Load AOS script dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@next/dist/aos.js';
    script.onload = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 1000,
          offset: 100,
          once: true,
          easing: 'ease-in-out-cubic'
        });
      }
    };
    document.body.appendChild(script);

    // Prevent default cursor on some elements
    this.setupInteractiveElements();
  }

  ngAfterViewInit(): void {
    // Smooth scroll navigation
    this.setupSmoothScrolling();
  }

  private setupInteractiveElements(): void {
    // Agregar estilos para interactividad mejorada
    const style = document.createElement('style');
    style.textContent = `
      a, button {
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      button:active {
        transform: scale(0.95);
      }

      a:hover {
        text-decoration: none;
      }

      /* Efecto ripple en botones */
      button::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
      }

      button:active::before {
        animation: ripple 0.6s ease-out;
      }

      @keyframes ripple {
        to {
          width: 300px;
          height: 300px;
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private setupSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }
}

