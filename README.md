# Temoso — Portfolio Website

A personal portfolio website Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## Live Preview

> Deploy to Netlify, GitHub Pages, or any static host by uploading the project folder.

---

## Features

- **Editorial-minimal design** inspired by [nils.io](https://nils.io)
- **Custom animated cursor** with lag effect and hover states
- **Particle background** — antigravity capsule particles that react to mouse movement
- **Dark / Light mode** with system preference persistence via `localStorage`
- **Scroll reveal animations** on every section
- **Blog section** with modal post reader
- **Fully responsive** — mobile hamburger menu, stacked layouts on small screens
- **No dependencies** — pure HTML, CSS, JavaScript

---

## Project Structure

```
portfolio/
├── index.html          # Main HTML — all sections and content
├── style.css           # Core styles, variables, animations
├── mediaqueries.css    # Responsive breakpoints (tablet + mobile)
├── script.js           # Cursor, particles, theme, blog, scroll reveal
├── assets/
│   ├── profile-pic.png     # Hero profile image
│   ├── about-pic.png       # About section image
│   ├── project-1.png       # Project thumbnail
│   ├── project-2.png       # Project thumbnail
│   ├── project-3.png       # Project thumbnail
│   ├── checkmark.png       # Skills checkmark icon
│   ├── experience.png      # Experience icon
│   ├── education.png       # Education icon
│   ├── github.png          # GitHub icon
│   ├── email.png           # Email icon
│   ├── arrow.png           # Section arrow icon
│   └── resume-example.pdf  # CV / Resume file
└── README.md
```

---

## Getting Started

1. **Clone or download** the repository
2. **Replace assets** in the `assets/` folder with your own images and CV
3. Open `index.html` in any browser — no build step required

```bash
git clone https://github.com/Kalophain14/portfolio.git
cd portfolio
open index.html
```

---

## Customisation

### Personal Info

All personal content lives in `index.html`. Search and update:

- Your name, title, location
- About Me paragraph
- Skills and proficiency levels
- Project names and GitHub links
- Contact email and social links

### Adding a Blog Post

In `script.js`, add a new object to the `blogPosts` array:

```js
{
  tag: "Your Tag",
  date: "Month Year",
  title: "Your Post Title",
  body: `<p>Your content here.</p>`
}
```

Then add a corresponding row in the `#blog` section of `index.html`:

```html
<div class="blog-row reveal" onclick="openPost(3)">
  <div class="blog-row-left">
    <span class="blog-tag-inline">Your Tag</span>
    <h3 class="blog-row-title">Your Post Title</h3>
  </div>
  <div class="blog-row-right">
    <span class="blog-date-inline">Month Year</span>
    <span class="blog-arrow">→</span>
  </div>
</div>
```

### Theme Colours

Edit the CSS variables in `style.css`:

```css
:root {
  --bg: #f5f4f0; /* Light mode background */
  --text: #2a2926; /* Primary text */
  --text-muted: #7a7770; /* Secondary text */
}

body.dark-mode {
  --bg: #111110; /* Dark mode background */
  --text: #e8e6e1;
}
```

---

## Sections

| Section  | Description                                       |
| -------- | ------------------------------------------------- |
| Hero     | Name, title, location, CTA buttons, profile photo |
| About    | Bio, experience stats, location                   |
| Skills   | Frontend and backend skill lists with levels      |
| Projects | Row-based project list linking to GitHub          |
| Blog     | Journal entries with modal reader                 |
| Contact  | Email, GitHub, Instagram links                    |

---

## Tech Stack

- **HTML5**
- **CSS3** — Custom properties, Grid, Flexbox, IntersectionObserver
- **Vanilla JavaScript** — No libraries or frameworks
- **Google Fonts** — DM Serif Display + DM Sans

---

## Deployment

### GitHub Pages

1. Push the project to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your site will be live at `https://kalophain14.github.io/repo-name`

### Netlify

1. Drag and drop the project folder at [netlify.com/drop](https://app.netlify.com/drop)
2. Site goes live instantly with a shareable URL

---

## Contact

- **Email** — [Chueutemosho@gmail.com](mailto:Chueutemosho@gmail.com)
- **GitHub** — [@Kalophain14](https://github.com/Kalophain14)
- **Instagram** — [@kalophain14](https://www.instagram.com/kalophain14)

---

© 2026 Temoso. All Rights Reserved.
