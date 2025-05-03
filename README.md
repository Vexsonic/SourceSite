# Script Library - GitHub Pages

A lightweight script repository for quickly finding and using JavaScript snippets. This repository is designed to be hosted on GitHub Pages.

## Features

- Collection of useful JavaScript utility scripts
- Syntax highlighting for code snippets
- Search functionality to filter scripts
- Copy to clipboard with a single click
- Responsive design that works on mobile and desktop

## How to Use with GitHub Pages

### Option 1: Using the `docs` folder method

1. Create a `docs` folder in your GitHub repository's root
2. Place all the files from this folder (`index.html`, `styles.css`, `scripts.js`) in the `docs` folder
3. Go to your repository settings on GitHub
4. Scroll down to the "GitHub Pages" section
5. Select "master branch /docs folder" as your source
6. Click Save

### Option 2: Using the default branch method

1. Create a new repository on GitHub (or use an existing one)
2. Upload all the files from this folder to the repository root
3. Go to your repository settings on GitHub
4. Scroll down to the "GitHub Pages" section
5. Select "master branch" (or "main branch") as your source
6. Click Save

## Customizing

### Adding New Scripts

To add new scripts, edit the `scripts.js` file and add new entries to the `scriptRepository` array:

```javascript
{
  id: 7, // Make sure to increment the ID
  title: "Your Script Title",
  description: "Description of what the script does.",
  language: "javascript", // or another language supported by highlight.js
  code: `// Your code here
function myNewFunction() {
  // Implementation
}`
}
```

### Changing Styles

Edit the `styles.css` file to customize the appearance of the site. The CSS uses variables for colors, making it easy to change the theme:

```css
:root {
  --primary: #1e88e5; /* Main color */
  --primary-hover: #1976d2;
  /* Other colors... */
}
```

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- [highlight.js](https://highlightjs.org/) for syntax highlighting
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
