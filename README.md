# Sabores Angelicales — Delivery Lunch

Sitio web de pedidos de almuerzo delivery para **Sabores Angelicales**.
Construido con **React + TypeScript + Vite**.

## Características

- 4 variedades de menú de pollo (Plancha, Horno, Apanado, Salsa del día)
- Elección de acompañamiento: **Papas fritas** o **Arroz**
- Cada menú incluye: Ensalada mixta (puede variar), Pan, Postre del día
- Formulario de pedido con validación:
  - Dirección (obligatoria)
  - Punto de referencia/delivery point (obligatorio)
  - WhatsApp del cliente (opcional) con normalización automática al formato `+56 9 XXXX XXXX`
- Botón "Pedir por WhatsApp" que genera un mensaje pre-armado y abre `wa.me`

---

## Desarrollo local

### Requisitos

- Node.js ≥ 18
- npm ≥ 9

### Pasos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:5173`.

### Build de producción

```bash
npm run build
```

Los archivos se generan en la carpeta `dist/`.

### Preview local del build

```bash
npm run preview
```

---

## Deploy en Heroku

El proyecto incluye un pequeño servidor Express (`server.js`) que sirve los archivos estáticos del build y maneja el fallback SPA (`index.html`) para todas las rutas.

### Pasos para Heroku

```bash
# 1. Instalar Heroku CLI si no lo tienes
# https://devcenter.heroku.com/articles/heroku-cli

# 2. Login
heroku login

# 3. Crear la app (solo la primera vez)
heroku create nombre-de-tu-app

# 4. Hacer push
git push heroku main
```

Heroku ejecutará automáticamente `npm run build` (via `heroku-postbuild`) y luego iniciará el servidor con `node server.js` (via `Procfile`).

### Variables de entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `PORT`   | Puerto del servidor | `3000` |

---

## Estructura del proyecto

```
src/
├── config/
│   └── restaurant.ts        # Metadata del restaurante (nombre, WhatsApp, etc.)
├── data/
│   └── menu.ts              # Definiciones del menú con tipos TypeScript
├── utils/
│   ├── formatCLP.ts         # Formatea precios en CLP
│   ├── normalizeChileWhatsApp.ts  # Normaliza números chilenos a +56 9 XXXX XXXX
│   └── buildWhatsAppMessage.ts   # Construye el mensaje de pedido para WhatsApp
├── components/
│   ├── OrderForm.tsx        # Formulario completo de pedido
│   └── WhatsAppOrderButton.tsx   # Botón que abre wa.me con el mensaje
├── App.tsx                  # Componente raíz
└── main.tsx                 # Entry point

server.js                    # Servidor Express para producción (Heroku)
Procfile                     # Instrucción de arranque para Heroku
```

---

## WhatsApp del restaurante

- **Número**: +56 9 8191 4285
- **Link**: [wa.me/56981914285](https://wa.me/56981914285)
