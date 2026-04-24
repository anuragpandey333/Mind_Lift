# MindLift - Unified Color Theme Documentation

## Color Scheme Applied Across Entire Website

### Color Variables (Consistent Across All Pages)
```javascript
const bg = isToggled ? '#0f1117' : '#F8FAFC'           // Main background
const sidebar = isToggled ? '#1a1d27' : '#F8FAFC'      // Cards/sidebar (same as bg)
const border = isToggled ? '#2a2d3a' : '#BCCCDC'       // All borders
const text = isToggled ? '#e2e8f0' : '#1a202c'         // Primary text
const subtext = isToggled ? '#94a3b8' : '#9AA6B2'      // Secondary text
const hover = isToggled ? '#252836' : '#D9EAFD'        // Hover states
const activeColor = isToggled ? '#3b82f6' : '#BCCCDC'  // Active/accent color
```

### Light Theme Colors
- **#F8FAFC** - Main background & cards (unified look)
- **#BCCCDC** - Borders & active states
- **#D9EAFD** - Hover states & highlights
- **#9AA6B2** - Secondary text & labels
- **#1a202c** - Primary text

### Usage Pattern (Dashboard Style)
All pages now use inline `style={{}}` instead of conditional className:

```jsx
// Main container
<div className="min-h-screen" style={{ background: bg, color: text }}>

// Cards/Sections
<div className="rounded-2xl p-6" style={{ background: sidebar, borderColor: border }}>

// Headings
<h1 style={{ color: text }}>Title</h1>

// Subtext/Labels
<p style={{ color: subtext }}>Description</p>

// Hover elements
<button style={{ background: hover }}>Button</button>

// Active/Accent elements
<button style={{ background: activeColor }}>Active</button>
```

## Updated Components

### ✅ Core Pages
- Dashboard.jsx
- Layout.jsx (Sidebar)

### ✅ Feature Pages
- MoodTracker.jsx
- FitnessTracker.jsx
- DietPlanner.jsx
- Scheduler.jsx
- Mentorship.jsx
- Ai.jsx (Chatbot)

### ✅ Auth & Public Pages
- Landing.jsx
- NewLogin.jsx
- NewSignup.jsx
- Profile.jsx
- About.jsx
- Contact.jsx
- Features.jsx

### ✅ Navigation
- Navbar.jsx
- Footer.jsx

## Key Benefits

1. **Unified Design** - Same color scheme across all pages
2. **Consistent Pattern** - All pages use Dashboard's inline style approach
3. **Easy Maintenance** - Change colors in one place (color variables)
4. **Professional Look** - Clean, modern light blue/gray theme
5. **Dark Mode Ready** - All pages support theme toggle

## Theme Philosophy

- **Minimalist** - Clean, uncluttered design
- **Accessible** - Good contrast ratios for readability
- **Calming** - Soft blue/gray tones for mental wellness focus
- **Professional** - Suitable for student wellness platform
