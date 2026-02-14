# Backend - API de Lista de Películas

Backend Node.js con Express para gestionar una lista de películas.

## Requisitos

- Node.js 14+
- npm

## Instalación

```bash
npm install
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto:

```
PORT=5000
NODE_ENV=development
```

## Desarrollo

```bash
npm install
npm run dev
```

El servidor estará disponible en [http://localhost:5000](http://localhost:5000)

## Producción

```bash
npm install
npm start
```

## Endpoints de la API

### GET - Obtener todas las películas
```
GET /api/movies
```

### GET - Obtener una película por ID
```
GET /api/movies/:id
```

### POST - Crear una nueva película
```
POST /api/movies
Content-Type: application/json

{
  "title": "Nombre de la película",
  "year": 2023,
  "director": "Nombre del director",
  "rating": 8.5,
  "description": "Descripción de la película",
  "poster": "URL de la imagen"
}
```

### PUT - Actualizar una película
```
PUT /api/movies/:id
Content-Type: application/json

{
  "title": "Nuevo nombre",
  "year": 2023,
  ...
}
```

### DELETE - Eliminar una película
```
DELETE /api/movies/:id
```

### GET - Health Check
```
GET /health
```

## Docker

Se proporciona un Dockerfile para ejecutar la aplicación en un contenedor.

```bash
docker build -t movie-list-backend .
docker run -p 5000:5000 movie-list-backend
```

## Estructura del Proyecto

```
micro-back/
├── server.js          # Archivo principal del servidor
├── package.json       # Dependencias del proyecto
├── .env               # Variables de entorno
├── Dockerfile         # Configuración de Docker
└── README.md          # Este archivo
```
