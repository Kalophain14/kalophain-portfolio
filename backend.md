# Backend Developer Handover — Temoso Portfolio

## Files Included

| File               | Purpose                                             |
| ------------------ | --------------------------------------------------- |
| `index.html`       | Main portfolio page                                 |
| `contact.html`     | Contact form page                                   |
| `style.css`        | All styles and CSS variables                        |
| `script.js`        | Theme toggle, particles, animations, blog modals    |
| `mediaqueries.css` | Responsive breakpoints                              |
| `assets/`          | Images — profile pic, about pic, project thumbnails |

---

## Tech Stack (Frontend)

- **Pure HTML / CSS / JavaScript** — no framework, no bundler, no build step
- No npm, no node_modules, no compilation needed
- Just open `index.html` in a browser and it works

---

## How to Get the Files

### Option A — GitHub (recommended)

1. You'll be added as a collaborator on the repo
2. Accept the invite via email or GitHub notifications
3. Clone the repo:
   ```bash
   git clone https://github.com/Kalophain14/kalophain-portfolio.git
   ```
4. new branch created for your backend work: feat/backend
5. Push changes and open a Pull Request for review

### Option B — ZIP

- Files will be sent as a `.zip` via email or file share
- Extract and open `index.html` to view locally

---

## Key Things to Know

### Dark Mode is the Default

- Dark mode requires **no class** on the body
- Light mode adds `body.light-mode` via JavaScript
- CSS variables live in `:root` (dark) and `body.light-mode` (light)
- Do not change this logic — it will break the theme toggle

### Contact Form (`contact.html`)

This is the most important integration point. Currently the form uses a `mailto:` fallback:

```javascript
// Located at the bottom of contact.html in a <script> tag
var mailtoLink =
  "mailto:Chueutemosho@gmail.com" +
  "?subject=" +
  encodeURIComponent(subject + " — " + name) +
  "&body=" +
  encodeURIComponent(message + "\n\nFrom: " + name + " <" + email + ">");
window.location.href = mailtoLink;
```

**This should be replaced with a proper backend API call**, for example:

```javascript
// Replace the mailto block with a fetch call to your endpoint
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, subject, budget, timeline, message }),
});

if (response.ok) {
  form.style.display = "none";
  success.classList.add("visible");
}
```

### Form Fields (contact.html)

| Field ID      | Type     | Required |
| ------------- | -------- | -------- |
| `cp-name`     | text     | Yes      |
| `cp-email`    | email    | Yes      |
| `cp-subject`  | select   | Yes      |
| `cp-budget`   | select   | No       |
| `cp-timeline` | select   | No       |
| `cp-message`  | textarea | Yes      |

## Contact

**Temoso**

- GitHub: [github.com/Kalophain14](https://github.com/Kalophain14)
- X: [@kalophain](https://x.com/kalophain?s=21)
