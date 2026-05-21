# Backend — Temoso Portfolio

The backend is a Java Spring Boot REST API that serves dynamic data for the portfolio — projects, blog posts, and contact form submissions.

---

## Tech Stack

- **Java** — core language
- **Spring Boot** — REST API framework
- **Spring Web** — HTTP request handling
- **Spring Data JPA** _(optional)_ — database persistence
- **Maven** — dependency management

---

## Prerequisites

- Java 17+
- Maven 3.8+

---

## File Structure

```
backend/
└── src/main/java/com/temoso/portfolio/
    ├── PortfolioApplication.java       # Spring Boot entry point
    ├── controller/
    │   ├── ContactController.java      # POST /api/contact
    │   ├── BlogController.java         # GET /api/blog
    │   └── ProjectController.java      # GET /api/projects
    ├── model/
    │   ├── ContactMessage.java         # Contact form data
    │   ├── BlogPost.java               # Blog post data
    │   └── Project.java                # Project data
    ├── service/
    │   ├── ContactService.java         # Contact form logic
    │   ├── BlogService.java            # Blog post logic
    │   └── ProjectService.java         # Project logic
    └── config/
        └── CorsConfig.java             # Allow frontend → backend requests
```

---

## Running Locally

```bash
cd backend
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`.

---

## REST API Endpoints

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| `POST` | `/api/contact`   | Submit a contact form message |
| `GET`  | `/api/blog`      | Fetch all blog posts          |
| `GET`  | `/api/blog/{id}` | Fetch a single blog post      |
| `GET`  | `/api/projects`  | Fetch all projects            |

All responses return JSON.

---

## CORS Configuration

The backend allows requests from the frontend origin via `CorsConfig.java`:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "https://your-deployed-frontend.com")
                .allowedMethods("GET", "POST");
    }
}
```

Update `allowedOrigins` with your deployed frontend URL before going to production.

---

## Adding Content

### New Project

Add a new `Project` object in `ProjectService.java` (or your database). It will be returned automatically by `GET /api/projects`.

### New Blog Post

Add a new `BlogPost` object in `BlogService.java` (or your database). It will appear automatically via `GET /api/blog`.

---

## Deployment

Build a JAR and deploy to Render, Railway, or Fly.io:

```bash
mvn clean package
java -jar target/portfolio-0.0.1-SNAPSHOT.jar
```

Or connect your GitHub repo directly and set the start command to `mvn spring-boot:run`.
