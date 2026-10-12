# Campus Bites — Canteen Food Ordering

A beginner-friendly full-stack mini project for ordering food from a college canteen.

## Tech stack
- **Frontend:** React, Vite, HTML, CSS, JavaScript
- **Backend:** Java 17+, Spring Boot 3, Spring Web
- **Storage:** In-memory demo data (menu resets when backend restarts; orders are held in memory)

## Features
- Attractive, responsive canteen menu
- Search food by name/category
- Filter by category
- Add/remove items and change quantities in a cart
- Place an order with student name and pickup time
- Order confirmation with order number
- REST API for menu and orders

## Requirements
- Java 17 or newer
- Maven 3.8+ (or use an IDE with Maven support)
- Node.js 18+ and npm

## Run the backend
Open a terminal in `backend`:

```bash
mvn spring-boot:run
```

Backend API: `http://localhost:8080/api/menu` (or port 8081 if port 8080 is already in use).

## Run the frontend
Open a second terminal in `frontend`:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

To connect the frontend to a backend on a different URL, set `VITE_API_URL` to the backend base URL (without `/api`) before starting or building the frontend. For example, use `http://localhost:8081` if the backend runs on port 8081.

## Deploy

### Backend on Render

1. In Render, create a **Blueprint** from this GitHub repository and select `render.yaml`.
2. Set `CORS_ALLOWED_ORIGINS` to the exact Vercel production URL, such as `https://your-project.vercel.app` (comma-separate additional trusted origins if needed).
3. Deploy the `campus-bites-api` web service. Its API is available at `https://<your-render-service>.onrender.com/api`.

The backend uses `PORT` provided by Render and Docker builds the Spring Boot application with Java 17.

### Frontend on Vercel

1. Import this GitHub repository into Vercel and set **Root Directory** to `frontend`.
2. Set the `VITE_API_URL` environment variable to your Render service base URL, without `/api`, for example `https://<your-render-service>.onrender.com`.
3. Deploy the project. The Vercel URL must also be listed in the Render service's `CORS_ALLOWED_ORIGINS`; redeploy the backend after changing it.

The `VITE_API_URL` value is embedded at build time, so redeploy the frontend after changing it. Free Render services may spin down while idle and take a little time to respond to the first request.

## API endpoints
- `GET /api/menu` — list all food items
- `GET /api/orders` — list orders created during this backend session
- `POST /api/orders` — create an order

Example order request:
```json
{
  "studentName": "Asha",
  "pickupTime": "12:45 PM",
  "items": [
    {"menuItemId": 1, "quantity": 2},
    {"menuItemId": 4, "quantity": 1}
  ]
}
```

## Project structure
```text
campus-bites/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/campusbites/
│       ├── CampusBitesApplication.java
│       ├── config/CorsConfig.java
│       ├── controller/MenuController.java
│       ├── controller/OrderController.java
│       ├── model/MenuItem.java
│       ├── model/OrderRequest.java
│       ├── model/OrderResponse.java
│       └── service/OrderService.java
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── styles.css
```

## Notes for a college demo
This is a simple learning project, not a production ordering system. Orders are stored in memory, so they disappear when the backend restarts. Before real deployment, add a database, authentication, payment handling, input validation, and proper error handling. Menu prices and items are sample data; replace them with your canteen's actual menu.
