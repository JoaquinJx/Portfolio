# Angular Portfolio Project

Un portafolio moderno construido con **Angular 21**, **Tailwind CSS** y **AOS** (Animate On Scroll) para aprender Angular de manera práctica.

## 🚀 Características

- ✅ **Componentes Standalone** - Arquitectura moderna de Angular
- ✅ **Tailwind CSS** - Estilos modernos y responsivos
- ✅ **Animaciones AOS** - Efectos de scroll automáticos
- ✅ **Responsive Design** - Compatible con todos los dispositivos
- ✅ **TypeScript** - Código tipado y seguro
- ✅ **Git workflow** - Ready para versionar

## 📋 Secciones Incluidas

1. **Header/Navbar** - Navegación con menú móvil
2. **Hero** - Sección de bienvenida llamativa
3. **Acerca de mí** - Sección con información personal
4. **Proyectos** - Galería de proyectos con tags de tecnologías
5. **Skills** - Tecnologías y habilidades organizadas por categoría
6. **Contacto** - Formulario funcional con validación
7. **Footer** - Enlaces rápidos y redes sociales

## 🛠️ Tecnologías

- **Angular 21** - Framework frontend
- **TypeScript** - Lenguaje de programación
- **Tailwind CSS 3** - Framework CSS utility-first
- **AOS** - Librería de animaciones con scroll
- **npm** - Gestor de paquetes

## 📦 Instalación

El proyecto ya está configurado y listo para usar. Si necesitas instalar dependencias nuevamente:

```bash
npm install
```

## 🏃 Ejecutar en Desarrollo

```bash
npm start
```

El servidor se iniciará en `http://localhost:4200/`

## 🔨 Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en `dist/portfolio/`

## 🌐 Publicar en GitHub Pages

Si tu repositorio se llama `Portfolio`, usa este comando para compilar con la ruta correcta:

```bash
npm run build:gh-pages
```

Esto genera la salida en `dist/portfolio/browser/` lista para publicar en GitHub Pages.

## 📚 Aprendiendo Angular

### Conceptos clave implementados:

1. **Componentes Standalone**
   - No necesitan NgModule
   - Importan directamente sus dependencias
   - Archivo: `src/app/components/*.component.ts`

2. **Signals (Reactividad)**
   - `signal()` - Estado reactivo
   - `signal.update()` - Actualizar estado
   - Usado en header, contact component

3. **Two-way Binding**
   - `[(ngModel)]` para formularios
   - Archivo: `src/app/components/contact.component.ts`

4. **Directivas Estructurales**
   - `*ngFor` - Iterar sobre arrays
   - `*ngIf` - Mostrar/ocultar elementos
   - `[ngClass]` - Clases dinámicas

5. **Lifecycle Hooks**
   - `OnInit` - Se ejecuta después de crear el componente
   - `AfterViewInit` - Después de inicializar vistas
   - Usado para cargar AOS

6. **Inputs & Outputs** (Próximo aprendizaje)
   - Comunicación entre componentes
   - `@Input()` - Recibir datos padre
   - `@Output()` - Emitir eventos

### Estructura del Proyecto

```
portfolio/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes del portafolio
│   │   │   ├── header.component.ts
│   │   │   ├── hero.component.ts
│   │   │   ├── about.component.ts
│   │   │   ├── projects.component.ts
│   │   │   ├── skills.component.ts
│   │   │   ├── contact.component.ts
│   │   │   └── footer.component.ts
│   │   ├── shared/              # Servicios y utilidades (futuro)
│   │   ├── app.ts              # Componente raíz
│   │   └── app.routes.ts       # Enrutamiento
│   ├── styles.css              # Estilos globales con Tailwind
│   └── index.html              # HTML principal
├── tailwind.config.js          # Configuración de Tailwind
├── postcss.config.js           # Configuración de PostCSS
└── angular.json                # Configuración de Angular CLI
```

## 🎓 Próximos Pasos para Aprender

1. **Agregar Enrutamiento**
   ```typescript
   // Crear rutas en app.routes.ts
   export const routes: Routes = [
     { path: 'about', component: AboutComponent },
     // ...
   ];
   ```

2. **Crear Servicios**
   ```bash
   ng generate service services/portfolio
   ```

3. **Conectar con API**
   - Usar HttpClientModule
   - Hacer peticiones REST
   - Manejar datos dinámicos

4. **Formularios Reactivos**
   - Reemplazar template-driven forms
   - FormBuilder, FormControl, Validators
   - Validación avanzada

5. **Estado Global (NgRx o Signals)**
   - Manejo centralizado de estado
   - Comunicación entre componentes complejos

6. **Testing**
   ```bash
   ng test
   ```
   - Unit tests con Jasmine
   - E2E tests con Cypress

## 🎨 Personalizando el Portafolio

### Cambiar Colores
Edita `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#TU-COLOR',
      accent: '#TU-COLOR',
    }
  }
}
```

### Agregar Proyectos
Edita `src/app/components/projects.component.ts`:
```typescript
projects: Project[] = [
  {
    id: 7,
    title: 'Mi Nuevo Proyecto',
    description: '...',
    tags: ['Angular', 'Tailwind'],
    link: '#',
    icon: '🎯'
  }
];
```

### Modificar Contenido
Simplemente edita los templates en cada componente dentro de `template: \`...\``.

## 📖 Recursos Útiles

- [Documentación Angular](https://angular.io)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [AOS Animate on Scroll](https://michalsnik.github.io/aos/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💡 Tips para Aprender

1. **Lee el código** - Cada componente está bien estructurado
2. **Experimenta** - Cambia valores, agrega componentes
3. **Usa DevTools** - Angular DevTools extension en Chrome
4. **Consulta docs** - Siempre hay respuestas en la documentación oficial
5. **Construye** - La mejor forma de aprender es haciendo

## 🤝 Contribuir

Este es tu proyecto de aprendizaje. ¡Siéntete libre de modificarlo, experimentar y mejorar!

---

**Happy coding! 🚀** Recuerda: Angular es poderoso, ¡usa esa potencia sabiamente!
