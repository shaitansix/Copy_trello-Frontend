# Mi Trello

Sistema de gestión de tareas basado en metodología Kanban, diseñado bajo arquitectura desacoplada React-Express con modelado relacional en PostgreSQL y exposición de API REST para administración estructurada de espacios de trabajo, tableros, tarjetas y tareas.

---

## Proyecto Completo

Este repositorio corresponde únicamente al `frontend` del sistema.

La aplicación consume una API REST desarrollada en Express para la gestión de espacios de trabajo, tableros, tarjetas y tareas.

Video demostración: [Mi Trello - Video](https://www.youtube.com/watch?v=it5sgFNkJ3w)  
Repositorio Backend: [Mi Trello - Backend](https://github.com/shaitansix/Copy_trello-Backend)  
Repositorio Frontend: [Mi Trello - Frontend](https://github.com/shaitansix/Copy_trello-Frontend)  
Demo en producción: [Mi Trello](https://copy-trello-frontend.vercel.app)

---

## Arquitectura del Sistema

Descripción general de la arquitectura del proyecto:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express (API REST)
- **Base de datos:** PostgreSQL
- **DevOps / Herramientas:** Docker, Git, GitHub

### Descripción adicional

El sistema sigue una arquitectura desacoplada cliente–servidor donde el frontend desarrollado en React consume los endpoints expuestos por el backend mediante solicitudes HTTP.

La información se modela en una base de datos relacional (PostgreSQL), donde cada entidad del sistema (espacio de trabajo, tablero, tarjeta y tarea) corresponde a una tabla con relaciones estructuradas.

El frontend gestiona el estado de la interfaz y renderiza dinámicamente los datos obtenidos desde la API, manteniendo separación clara de responsabilidades entre capa de presentación y lógica de negocio.

---

## Funcionalidades Principales

- Gestión estructurada de espacios de trabajo (CRUD completo).
- Administración de tableros asociados a cada espacio de trabajo.
- Creación y organización de tarjetas dentro de cada tablero.
- Gestión de tareas vinculadas a tarjetas específicas.
- Persistencia relacional de entidades con asociaciones 1:N (Workspace → Board → Card → Task).
- Comunicación frontend–backend mediante consumo de API REST.
- Renderizado dinámico del estado de la aplicación basado en respuestas del servidor.

---

## Aspectos Técnicos Destacados

- Diseño de arquitectura desacoplada con separación clara entre capa de presentación y lógica de negocio.
- Modelado relacional estructurado con asociaciones 1:N entre entidades principales (Workspace, Board, Card, Task).
- Implementación de API REST segmentada por recursos con organización modular por dominio.
- Gestión de estado en el frontend para sincronización consistente entre interfaz y datos persistidos.
- Estructuración del proyecto backend por capas (rutas, controladores, modelos).
- Persistencia de datos en PostgreSQL con correspondencia directa entre modelos y tablas.
- Integración frontend–backend mediante solicitudes HTTP asincrónicas.
- Contenerización del frontend para despliegue aislado y reproducible.

---

<!--
## Opciones de Despliegue

### Usando Docker

```bash
```

### Usando git clone

```bash
```
**>
