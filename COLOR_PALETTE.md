# Terminus DAO Color Palette

## Design Tokens

### Light Mode

| Token | Name | Hex Code | Usage |
|-------|------|----------|-------|
| `--bg` | Beige-Paper | `#F7EFE7` | Main background - warm, modern |
| `--ink` | Charcoal | `#1F2224` | Primary text color |
| `--brand` | Rail Rose | `#C84B4B` | Primary brand color - buttons, accents |
| `--accent` | Brass | `#D1A65A` | Highlights and secondary accents (use sparingly) |
| `--muted` | Rail Steel | `#75797D` | Secondary text, muted elements |
| `--panel` | Porcelain | `#FFF9F3` | Cards, panels, navigation background |
| `--success` | Leaf | `#2FA36B` | Success states and messages |
| `--warning` | Amber | `#E9A23B` | Warning states and messages |

### Dark Mode

| Token | Name | Hex Code | Usage |
|-------|------|----------|-------|
| `--bg` | Iron | `#0F1113` | Main dark background |
| `--ink` | Mist | `#EAECEE` | Light text on dark background |
| `--panel` | Dark Panel | `#1A1D1F` | Cards and panels in dark mode |
| `--brand` | Light Rail Rose | `#D65555` | Adjusted brand color for dark mode |
| `--accent` | Brass | `#D1A65A` | Same brass accent (works in both modes) |

## Color Application

### Backgrounds
- **Primary Background**: Beige-Paper `#F7EFE7` (light) / Iron `#0F1113` (dark)
- **Cards & Panels**: Porcelain `#FFF9F3` (light) / `#1A1D1F` (dark)
- **Hero Section**: Rail Rose gradient

### Text
- **Primary Text**: Charcoal `#1F2224` (light) / Mist `#EAECEE` (dark)
- **Secondary Text**: Rail Steel `#75797D` (light) / lighter gray (dark)
- **Gradients**: Rail Rose → Brass (used in headings)

### Interactive Elements
- **Primary Buttons**: Rail Rose background with Porcelain text
- **Secondary Buttons**: Transparent with Rail Rose border
- **Links**: Rail Rose that darkens on hover
- **Accent Highlights**: Brass `#D1A65A` (use sparingly)

### Borders & Shadows
- **Borders**: Subtle Rail Steel with opacity
- **Shadows**: Charcoal-based with low opacity

## Usage Guidelines

1. **Brand Color (Rail Rose)**: Use for primary actions, key headings, and brand elements
2. **Accent (Brass)**: Use sparingly for highlights, secondary gradients, and special emphasis
3. **Muted (Rail Steel)**: Use for less important text, placeholders, and subtle UI elements
4. **Success/Warning**: Use only for status messages and alerts

## Accessibility

All color combinations have been selected to meet WCAG 2.1 contrast requirements:
- Light mode text on background: High contrast
- Dark mode text on background: High contrast
- Button text on brand color: Sufficient contrast

## Customization

To change colors, edit the CSS variables in `styles.css` at the top of the file:

```css
:root {
    --bg: #F7EFE7;
    --ink: #1F2224;
    --brand: #C84B4B;
    /* ... etc */
}
```

All color usage throughout the site automatically updates when you change these tokens.
