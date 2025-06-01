# React TypeScript Base plataform

![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)
![PrimeReact](https://img.shields.io/badge/PrimeReact-10.x-blue)

Una aplicación web moderna y responsiva construida con React, TypeScript y PrimeReact. Diseñada para ofrecer una experiencia de usuario excepcional en la gestión.

## Características

- **Interfaz Amigable**: Diseño elegante y responsivo usando PrimeReact y PrimeFlex
- **TypeScript**: Desarrollo robusto con tipado estático
- **Gestión de Estado**: Sistema eficiente de manejo de estado
- **Autenticación**: Sistema completo de autenticación con JWT
- **Temas Personalizables**: Soporte para modo claro/oscuro
- **Componentes Reutilizables**: Arquitectura modular y componentes reusables
- **Optimización**: Carga rápida y optimización de recursos

## Requisitos previos

- Node.js (v18.x o superior)
- npm o yarn
- Conexión a Internet (para CDN y recursos externos)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/lcchaverra/Prime-Front
   cd Prime-Front
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar las variables de entorno:
   - Renombrar `.env.example` a `.env`
   - Actualizar las variables con tus valores

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Compila el proyecto para producción
- `npm run preview`: Vista previa de la versión de producción
- `npm run lint`: Ejecuta el linter para verificar el código

## Tecnologías Principales

- **React**: Biblioteca principal para la interfaz de usuario
- **TypeScript**: Superset de JavaScript con tipado estático
- **Vite**: Herramienta de construcción moderna y rápida
- **PrimeReact**: Biblioteca de componentes UI
- **PrimeFlex**: Sistema de diseño flexible y responsivo
- **React Router**: Enrutamiento del lado del cliente
- **Chart.js**: Visualización de datos y estadísticas

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── contexts/      # Contextos de React
├── hooks/         # Hooks personalizados
├── layouts/       # Layouts de la aplicación
├── pages/         # Componentes de página
├── utils/         # Utilidades y helpers
└── App.tsx        # Componente principal
```

## Convenciones de Commits

Este repositorio utiliza las siguientes convenciones para los mensajes de commits:

- **feat**: Nueva funcionalidad
- **fix**: Corrección de errores
- **docs**: Cambios en documentación
- **style**: Cambios que no afectan el código (formato, espacios, etc.)
- **refactor**: Refactorización del código
- **test**: Adición o modificación de tests
- **chore**: Cambios en el proceso de build o herramientas auxiliares

## Contribución

1. Fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request
