# Terminus DAO Website v0

A modern, responsive website for Terminus DAO - Atlanta's Decentralized Web3 Community.

## Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Light/Dark Mode** - Toggle between themes with automatic system preference detection
- **Dynamic Content** - Easily update events and sponsors without touching the main code
- **Smooth Navigation** - Single-page design with smooth scrolling to sections
- **Modern UI** - Clean, professional design with gradient accents

## File Structure

```
terminus_dao/
├── index.html          # Main HTML structure
├── styles.css          # All styling including light/dark mode
├── script.js           # Theme toggle, navigation, and interactions
├── events.js           # Events data and rendering logic
├── sponsors.js         # Sponsors data and rendering logic
└── README.md           # This file
```

## Getting Started

1. **Open the website**: Simply open `index.html` in a web browser
2. **No build process needed**: This is a static website that works out of the box

## Updating Content

### Updating Events

Edit the `events.js` file and modify the `events` array:

```javascript
const events = [
    {
        title: "Event Name",
        date: "Date @ Time",
        location: "Venue Name",
        description: "Brief description of the event",
        link: "https://link-to-event-page.com"
    },
    // Add more events...
];
```

**Tips:**
- Events appear in the order they're listed in the array
- All fields except `title` and `date` are optional
- Remove old events by deleting their entries
- The page automatically re-renders when you save the file

### Updating Sponsors

Edit the `sponsors.js` file and modify the `sponsors` array:

```javascript
const sponsors = [
    {
        name: "Sponsor Name",
        tier: "Platinum",  // Options: Platinum, Gold, Silver
        website: "https://sponsor-website.com",
        description: "Brief description"
    },
    // Add more sponsors...
];
```

**Tips:**
- Sponsors are automatically grouped by tier (Platinum → Gold → Silver)
- All fields are required for best display
- Add new tiers by updating the `tierConfig` object in `sponsors.js`

### Updating Mission Statement

Edit `index.html` and find the section with `id="mission"`:

```html
<section id="mission" class="section">
    <!-- Update the content here -->
</section>
```

### Updating Site Branding

1. **Site Name**: Edit the `<h1>` in the navigation (search for "Terminus DAO")
2. **Page Title**: Edit the `<title>` tag in the `<head>` section
3. **Hero Section**: Edit the hero title and subtitle in the hero section

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --accent-primary: #667eea;    /* Primary accent color */
    --accent-secondary: #764ba2;  /* Secondary accent color */
    /* ... other colors */
}
```

### Adding a Logo

Replace the text in the `.nav-brand` section with an image:

```html
<div class="nav-brand">
    <img src="path/to/logo.png" alt="Terminus DAO" height="40">
</div>
```

### Adding New Sections

1. Add the section in `index.html`:
```html
<section id="new-section" class="section">
    <div class="container">
        <h2 class="section-title">New Section</h2>
        <!-- Your content -->
    </div>
</section>
```

2. Add a navigation link:
```html
<li><a href="#new-section">New Section</a></li>
```

## Theme Toggle

The theme toggle automatically:
- Saves user preference to localStorage
- Detects system theme preference on first visit
- Responds to system theme changes (if no saved preference)

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

This static website can be deployed to:
- **GitHub Pages**: Push to a repository and enable GitHub Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your Git repository
- **Any web host**: Upload files via FTP

## Future Enhancements

Potential improvements for future versions:
- Automatic event fetching from Atlanta Blockchain Center API
- Contact form integration
- Newsletter signup
- Member portal/login
- Calendar integration (Google Calendar, ICS feeds)
- Blog/news section
- Photo gallery from past events

## Support

For issues or questions:
- Check the Atlanta Blockchain Center documentation
- Review the code comments in each file
- Ensure JavaScript is enabled in the browser

## License

© 2025 Terminus DAO. Part of the Atlanta Blockchain Center.
