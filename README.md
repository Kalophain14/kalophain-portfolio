# Temoso — Portfolio Website

A personal portfolio website with a vanilla HTML/CSS/JS frontend and a Java Spring Boot backend connected via REST API.

---

## Architecture

```
Frontend (HTML / CSS / JS)
        ↕ REST API (JSON)
Backend (Java + Spring Boot)
```

---

## Tech Stack

| Layer         | Technologies                                          |
| ------------- | ----------------------------------------------------- |
| Frontend      | HTML5, CSS3, Vanilla JavaScript, Google Fonts         |
| Backend       | Java, Spring Boot, Spring Web, Spring Data JPA, Maven |
| Communication | REST API (JSON over HTTP)                             |

---

## Project Structure

```
temoso-portfolio/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── mediaqueries.css
│   ├── script.js
│   └── assets/
│
└── backend/
    └── src/main/java/com/temoso/portfolio/
        ├── PortfolioApplication.java
        ├── controller/
        ├── model/
        ├── service/
        └── config/
```

See [`frontend/README.md`](frontend/README.md) and [`backend/README.md`](backend/README.md) for detailed setup instructions.

---

## Quick Start

### Prerequisites

- Java 17+
- Maven 3.8+
- Any modern browser

### 1. Clone the repository

```bash
git clone https://github.com/Kalophain14/portfolio.git
cd temoso-portfolio
```

### 2. Run the backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

### 3. Open the frontend

```bash
cd frontend
npx serve .
```

Frontend runs on `http://localhost:3000`

---

## Sections

| Section  | Description                                                     |
| -------- | --------------------------------------------------------------- |
| Hero     | Name, title, location, CTA buttons, profile photo               |
| About    | Bio, experience stats, location                                 |
| Skills   | Frontend and backend skill lists with levels                    |
| Projects | Row-based project list — data from `/api/projects`              |
| Blog     | Journal entries with modal reader — data from `/api/blog`       |
| Contact  | Form submits to `/api/contact` — email, GitHub, Instagram links |

---

## Deployment

| Part     | Platform                              |
| -------- | ------------------------------------- |
| Frontend | Netlify (drag & drop) or GitHub Pages |
| Backend  | Render, Railway, or Fly.io            |

---

## Contact

- **Email** — [Chueutemosho@gmail.com](mailto:Chueutemosho@gmail.com)
- **GitHub** — [@Kalophain14](https://github.com/Kalophain14)
- **Instagram** — [@kalophain14](https://www.instagram.com/kalophain14)

---

© 2026 Temoso. All Rights Reserved.
