# Frontend — Temoso Portfolio

The frontend is built with vanilla HTML, CSS, and JavaScript. No frameworks or build tools required — open in a browser and it works.

---

## Tech Stack

- **HTML5** — structure and content
- **CSS3** — custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — cursor, particles, theme, scroll reveal, API calls
- **Google Fonts** — DM Serif Display + DM Sans

---

## File Structure

```
frontend/
├── index.html              # All sections and content
├── style.css               # Core styles, variables, animations
├── mediaqueries.css        # Responsive breakpoints (tablet + mobile)
├── script.js               # Cursor, particles, theme, blog, scroll reveal, API calls
└── assets/
    ├── profile-pic.png
    ├── about-pic.png
    ├── project-1.png
    ├── project-2.png
    ├── project-3.png
    ├── checkmark.png
    ├── experience.png
    ├── education.png
    ├── github.png
    ├── email.png
    ├── arrow.png
    └── resume-example.pdf
```

---

## Running Locally

Open `index.html` directly in a browser, or serve it with a local server:

```bash
cd frontend
npx serve .
```

Runs on `http://localhost:3000` (or whichever port `serve` assigns).

> Make sure the backend is running on `http://localhost:8080` before testing API-connected features.

---

## Connecting to the Backend

API calls in `script.js` use `fetch` to talk to the Spring Boot backend:

```js
// Submitting the contact form
async function submitContact(name, email, message) {
  const response = await fetch("http://localhost:8080/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
  const data = await response.json();
  return data;
}

// Loading blog posts
async function loadBlogPosts() {
  const response = await fetch("http://localhost:8080/api/blog");
  const posts = await response.json();
  // render posts to DOM
}
```

For production, replace `http://localhost:8080` with your deployed backend URL.

---

## Customisation

### Personal Info

All personal content lives in `index.html`. Search and update:

- Your name, title, and location
- About Me paragraph
- Skills and proficiency levels
- Contact email and social links

### Theme Colours

Edit CSS variables in `style.css`:

```css
:root {
  --bg: #f5f4f0;
  --text: #2a2926;
  --text-muted: #7a7770;
}

body.dark-mode {
  --bg: #111110;
  --text: #e8e6e1;
}
```

---

## Deployment

### Netlify

1. Drag and drop the `frontend/` folder at [netlify.com/drop](https://app.netlify.com/drop)
1. Update the API base URL in `script.js` to point to your deployed backend

### GitHub Pages

1. Push the `frontend/` folder contents to a `gh-pages` branch
1. Enable Pages in **Settings → Pages**
