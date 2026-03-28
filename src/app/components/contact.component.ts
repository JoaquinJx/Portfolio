import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <section id="contact" class="min-h-screen flex items-center py-20 px-6 bg-secondary/30">
      <div class="max-w-2xl mx-auto w-full">
        <h2 class="text-4xl md:text-5xl font-bold mb-8 text-center">
          Pongámonos en <span class="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Contacto</span>
        </h2>

        <p class="text-slate-400 text-center mb-12 text-lg">
          ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a hacer realidad tus ideas.
        </p>

        <form class="space-y-6" (ngSubmit)="submitForm()">
          <div>
            <label class="block text-sm font-medium mb-2">Nombre</label>
            <input 
              [(ngModel)]="formData.name"
              name="name"
              type="text" 
              placeholder="Tu nombre"
              class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition">
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Correo Electrónico</label>
            <input 
              [(ngModel)]="formData.email"
              name="email"
              type="email" 
              placeholder="tu@email.com"
              class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition">
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Mensaje</label>
            <textarea 
              [(ngModel)]="formData.message"
              name="message"
              placeholder="Tu mensaje aquí..."
              rows="5"
              class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition resize-none"></textarea>
          </div>

          <button 
            type="submit"
            class="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 rounded-lg transition transform hover:scale-105">
            Enviar Mensaje
          </button>

          <p *ngIf="submitMessage()" class="text-center text-sm" [ngClass]="{
            'text-green-400': !submitMessage().startsWith('Error'),
            'text-red-400': submitMessage().startsWith('Error')
          }">
            {{ submitMessage() }}
          </p>
        </form>

        <div class="mt-12 flex justify-center gap-8 flex-wrap">
          <a href="mailto:joaquin.fernandez2980@gmail.com" class="flex items-center gap-2 text-accent hover:text-blue-300 transition">
            <span class="text-2xl">📧</span> Email
          </a>
          <a href="https://www.linkedin.com/in/joaquin-fernandez-207057210" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-accent hover:text-blue-300 transition">
            <span class="text-2xl">💼</span> LinkedIn
          </a>
          <a href="https://github.com/JoaquinJx" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-accent hover:text-blue-300 transition">
            <span class="text-2xl">🐙</span> GitHub
          </a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ContactComponent {
  private readonly contactEmail = 'joaquin.fernandez2980@gmail.com';

  formData = {
    name: '',
    email: '',
    message: ''
  };

  submitMessage = signal('');

  submitForm() {
    const name = this.formData.name.trim();
    const email = this.formData.email.trim();
    const message = this.formData.message.trim();

    if (!name || !email || !message) {
      this.submitMessage.set('Error: completa todos los campos antes de enviar.');
      return;
    }

    const subject = encodeURIComponent(`Consulta profesional desde mi portafolio - ${name}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`
    );

    // Fallback sin EmailJS: abre el cliente de correo del visitante con el mensaje pre-cargado.
    window.location.href = `mailto:${this.contactEmail}?subject=${subject}&body=${body}`;

    this.submitMessage.set('Se abrió tu cliente de correo con el mensaje listo para enviar.');
    this.formData = { name: '', email: '', message: '' };

    setTimeout(() => {
      this.submitMessage.set('');
    }, 4000);
  }
}
