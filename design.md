# Vocalario Marketing Website - Technical Design

**Project**: Vocalario Marketing Website  
**Version**: 1.0  
**Last Updated**: November 9, 2025  
**Status**: Planning Phase

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [File Structure](#file-structure)
4. [Component Design](#component-design)
5. [Page Layouts](#page-layouts)
6. [Data Flow](#data-flow)
7. [Performance Optimization](#performance-optimization)
8. [Accessibility Strategy](#accessibility-strategy)
9. [SEO Strategy](#seo-strategy)
10. [Deployment Strategy](#deployment-strategy)

---

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Static Hosting                       │
│              (Vercel / Netlify / GitHub Pages)           │
└─────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    CDN / Edge Network                    │
│                  (Automatic with hosting)                │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Static Site Files                      │
│  ┌──────────────┬──────────────┬────────────────────┐   │
│  │   HTML       │     CSS      │   JavaScript       │   │
│  │  (3 pages)   │  (2 files)   │   (minimal)        │   │
│  └──────────────┴──────────────┴────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Static Assets                        │   │
│  │   (images, icons, fonts - optional)              │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Simplicity First**: Vanilla HTML/CSS/JS - no framework overhead
2. **Performance**: < 100KB total size, < 1s load time
3. **Progressive Enhancement**: Works without JavaScript
4. **Mobile First**: Responsive design starting from mobile
5. **Accessibility**: WCAG AA compliance
6. **Maintainability**: Clear structure, well-documented code

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | Latest | Semantic markup, content structure |
| CSS3 | Latest | Styling using design system |
| JavaScript | ES6+ | Minimal interactions (optional) |
| Heroicons | 2.x | Open-source SVG icons |

### Development Tools

| Tool | Purpose |
|------|---------|
| VS Code | Code editor |
| Live Server | Local development server |
| Git | Version control |
| Browser DevTools | Debugging and performance testing |

### Deployment & Hosting

| Service | Purpose |
|---------|---------|
| Netlify (primary) | Static hosting, automatic SSL, CDN |
| Vercel (alternative) | Static hosting alternative |
| GitHub Pages (alternative) | Free static hosting |

### No Dependencies

- No npm packages required
- No build process needed (optional minification)
- No JavaScript frameworks
- No CSS preprocessors (pure CSS with variables)

---

## File Structure

```
marketing-site/
├── index.html                 # Landing page
├── privacy.html              # Privacy Policy page
├── terms.html                # Terms of Service page
│
├── css/
│   ├── design-system.css     # Design system (provided)
│   └── main.css              # Site-specific styles
│
├── js/
│   └── main.js               # Minimal interactions (optional)
│
├── images/
│   ├── logo.svg              # Vocalario logo
│   ├── hero-image.png        # Hero section image (optional)
│   ├── og-image.png          # Open Graph image for social sharing
│   └── features/             # Feature screenshots (to be added)
│       ├── feature-1.png
│       ├── feature-2.png
│       └── ...
│
├── icons/
│   └── heroicons/            # Heroicons SVG files (inline in HTML)
│
├── favicon.ico               # Browser favicon
├── favicon.svg               # Modern SVG favicon
├── apple-touch-icon.png      # iOS home screen icon
│
├── robots.txt                # Search engine directives
├── sitemap.xml               # XML sitemap
├── .gitignore                # Git ignore rules
├── README.md                 # Project documentation
└── requirements.md           # Requirements specification
```

---

## Component Design

### Design System Components

All components will use the existing design system CSS variables.

#### 1. Typography Components

```html
<!-- Headings -->
<h1 class="heading-hero">Primary Headline</h1>
<h2 class="heading-section">Section Title</h2>
<h3 class="heading-card">Card Title</h3>

<!-- Body Text -->
<p class="text-body">Regular paragraph text</p>
<p class="text-lead">Lead paragraph with emphasis</p>
<p class="text-small">Small supporting text</p>
```

**CSS Implementation:**
```css
.heading-hero {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--color-text);
  letter-spacing: var(--letter-tight);
}

.heading-section {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.text-lead {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}
```

#### 2. Button Component

```html
<!-- Primary CTA Button -->
<a href="[CHROME_WEB_STORE_URL]" 
   class="btn btn-primary" 
   target="_blank" 
   rel="noopener noreferrer">
  Install Extension
  <svg><!-- External link icon --></svg>
</a>

<!-- Secondary Button (if needed) -->
<a href="[GITHUB_URL]" 
   class="btn btn-secondary" 
   target="_blank" 
   rel="noopener noreferrer">
  View on GitHub
</a>
```

**CSS Implementation:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--button-size-md-padding);
  height: var(--button-size-md-height);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  text-decoration: none;
  transition: all var(--transition-base);
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}
```

#### 3. Feature Card Component

```html
<div class="feature-card">
  <div class="feature-icon">
    <svg><!-- Heroicon SVG --></svg>
  </div>
  <h3 class="feature-title">Feature Title</h3>
  <p class="feature-description">Brief description of the feature.</p>
</div>
```

**CSS Implementation:**
```css
.feature-card {
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
}

.feature-card:hover {
  box-shadow: var(--card-shadow-hover);
  border-color: var(--color-primary-light);
  transform: translateY(-4px);
}

.feature-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-light);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.feature-icon svg {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}
```

#### 4. Step Card Component (How It Works)

```html
<div class="step-card">
  <div class="step-number">1</div>
  <h3 class="step-title">Step Title</h3>
  <p class="step-description">Description of the step.</p>
</div>
```

**CSS Implementation:**
```css
.step-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-md);
}

.step-number {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent);
  color: white;
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  border-radius: var(--radius-full);
}
```

#### 5. Section Container

```html
<section class="section">
  <div class="container">
    <h2 class="section-title">Section Title</h2>
    <p class="section-subtitle">Optional subtitle</p>
    <!-- Section content -->
  </div>
</section>
```

**CSS Implementation:**
```css
.section {
  padding: var(--spacing-3xl) var(--spacing-md);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: var(--spacing-md);
}

.section-subtitle {
  text-align: center;
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
}
```

---

## Page Layouts

### 1. Landing Page (index.html)

```
┌─────────────────────────────────────────┐
│            Navigation/Header             │ (Optional, minimal)
├─────────────────────────────────────────┤
│                                          │
│              HERO SECTION                │
│  ┌────────────────────────────────────┐ │
│  │  Headline                          │ │
│  │  Subheadline                       │ │
│  │  [Install Extension CTA]           │ │
│  │  Hero Image/Visual                 │ │
│  └────────────────────────────────────┘ │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│            FEATURES SECTION              │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐│
│  │ F1 │  │ F2 │  │ F3 │  │ F4 │  │ F5 ││
│  └────┘  └────┘  └────┘  └────┘  └────┘│
│                                          │
├─────────────────────────────────────────┤
│                                          │
│          HOW IT WORKS SECTION            │
│  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐ │
│  │  1  │ → │  2  │ → │  3  │ → │  4  │ │
│  └─────┘   └─────┘   └─────┘   └─────┘ │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│        PRIVACY & SECURITY SECTION        │
│  ┌────────────────────────────────────┐ │
│  │  Privacy-First Messaging           │ │
│  │  - Local Storage                   │ │
│  │  - BYOK Benefits                   │ │
│  │  - No Account Required             │ │
│  └────────────────────────────────────┘ │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│          FINAL CTA SECTION               │
│  ┌────────────────────────────────────┐ │
│  │  Compelling message                │ │
│  │  [Install Extension CTA]           │ │
│  └────────────────────────────────────┘ │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│                FOOTER                    │
│  Links | Contact | Copyright             │
│                                          │
└─────────────────────────────────────────┘
```

#### Responsive Breakpoints

- **Desktop (1200px+)**: 
  - Features: 5 columns
  - How It Works: 4 columns horizontal
  - Max content width: 1200px

- **Tablet (768px - 1199px)**:
  - Features: 2-3 columns
  - How It Works: 2 columns
  - Padding adjustments

- **Mobile (320px - 767px)**:
  - Features: 1 column
  - How It Works: 1 column vertical
  - Stack all content
  - Full-width buttons

### 2. Privacy Policy Page (privacy.html)

```
┌─────────────────────────────────────────┐
│            Navigation/Header             │
├─────────────────────────────────────────┤
│                                          │
│           PAGE HEADER                    │
│  Privacy Policy                          │
│  Last Updated: [Date]                    │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│           CONTENT AREA                   │
│  ┌────────────────────────────────────┐ │
│  │  Table of Contents (optional)      │ │
│  ├────────────────────────────────────┤ │
│  │  Section 1: Introduction           │ │
│  │  Section 2: Data Collection        │ │
│  │  Section 3: Data Storage           │ │
│  │  Section 4: Third-Party Services   │ │
│  │  Section 5: User Rights            │ │
│  │  Section 6: Contact Information    │ │
│  └────────────────────────────────────┘ │
│                                          │
├─────────────────────────────────────────┤
│                FOOTER                    │
└─────────────────────────────────────────┘
```

### 3. Terms of Service Page (terms.html)

```
┌─────────────────────────────────────────┐
│            Navigation/Header             │
├─────────────────────────────────────────┤
│                                          │
│           PAGE HEADER                    │
│  Terms of Service                        │
│  Last Updated: [Date]                    │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│           CONTENT AREA                   │
│  ┌────────────────────────────────────┐ │
│  │  Table of Contents (optional)      │ │
│  ├────────────────────────────────────┤ │
│  │  Section 1: Acceptance of Terms    │ │
│  │  Section 2: Service Description    │ │
│  │  Section 3: User Responsibilities  │ │
│  │  Section 4: Intellectual Property  │ │
│  │  Section 5: Limitations            │ │
│  │  Section 6: Contact Information    │ │
│  └────────────────────────────────────┘ │
│                                          │
├─────────────────────────────────────────┤
│                FOOTER                    │
└─────────────────────────────────────────┘
```

---

## Data Flow

### Static Content Flow

```
┌─────────────────┐
│   User Request  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   CDN / Edge    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  HTML File      │ ─────┐
└─────────────────┘      │
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌────────────┐  ┌────────────┐  ┌────────────┐
│ CSS Files  │  │  JS Files  │  │   Images   │
└────────────┘  └────────────┘  └────────────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  Browser Render │
                └─────────────────┘
```

### No Server-Side Processing

- All content is static HTML
- No API calls from the website
- No dynamic content generation
- No user authentication or sessions
- External links only to Chrome Web Store

### External Resources

```
┌─────────────────────┐
│  Vocalario Website  │
└──────────┬──────────┘
           │
           │ (External Links)
           │
           ├───────────────────────────────┐
           │                               │
           ▼                               ▼
┌──────────────────────┐       ┌──────────────────────┐
│  Chrome Web Store    │       │  GitHub Repository   │
│  (Extension Install) │       │  (Optional)          │
└──────────────────────┘       └──────────────────────┘
```

---

## Performance Optimization

### Critical Rendering Path

1. **HTML**: First to load, minimal size
2. **Critical CSS**: Inline above-the-fold styles
3. **Non-critical CSS**: Defer or async load
4. **JavaScript**: Load at end of body, async/defer

### Asset Optimization Strategy

#### Images

```html
<!-- Hero Image with multiple formats -->
<picture>
  <source srcset="hero-image.webp" type="image/webp">
  <source srcset="hero-image.png" type="image/png">
  <img src="hero-image.png" 
       alt="Vocalario Chrome Extension Interface"
       loading="eager"
       width="800" 
       height="600">
</picture>

<!-- Feature images with lazy loading -->
<img src="feature-1.webp" 
     alt="Feature description"
     loading="lazy"
     width="400" 
     height="300">
```

**Image Optimization Checklist:**
- [ ] Compress images (TinyPNG, Squoosh)
- [ ] Use WebP format with PNG fallback
- [ ] Specify width/height to prevent layout shift
- [ ] Use `loading="lazy"` for below-fold images
- [ ] Use `loading="eager"` for hero image only

#### CSS Optimization

```html
<!-- Inline critical CSS for above-the-fold content -->
<style>
  /* Critical styles for hero section */
  /* Only styles needed for first paint */
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/main.css"></noscript>
```

**CSS Optimization Checklist:**
- [ ] Remove unused CSS rules
- [ ] Combine design-system.css and main.css
- [ ] Minify CSS for production
- [ ] Use CSS containment for performance
- [ ] Avoid expensive properties (box-shadow on scroll)

#### JavaScript Optimization

```html
<!-- Minimal JavaScript, loaded asynchronously -->
<script src="js/main.js" defer></script>
```

**JavaScript Optimization Checklist:**
- [ ] Keep JavaScript minimal (< 10KB)
- [ ] Use `defer` or `async` attribute
- [ ] Avoid blocking the main thread
- [ ] No external library dependencies
- [ ] Compress/minify for production

#### Font Loading Strategy

```css
/* Use system fonts - no web font loading */
body {
  font-family: var(--font-sans);
  /* Already defined as system font stack */
}
```

**Font Strategy:**
- ✅ Use system fonts (no download needed)
- ✅ Instant text rendering
- ✅ No FOIT (Flash of Invisible Text)
- ✅ No FOUT (Flash of Unstyled Text)

### Caching Strategy

```
# .htaccess or hosting configuration

# Cache static assets for 1 year
<filesMatch ".(css|jpg|jpeg|png|gif|webp|svg|ico|js)$">
  Header set Cache-Control "max-age=31536000, public"
</filesMatch>

# Cache HTML for 1 hour
<filesMatch ".(html)$">
  Header set Cache-Control "max-age=3600, public, must-revalidate"
</filesMatch>
```

### Performance Budget

| Metric | Target | Maximum |
|--------|--------|---------|
| Total Page Size | 80KB | 100KB |
| HTML Size | 15KB | 20KB |
| CSS Size | 10KB | 15KB |
| JavaScript Size | 5KB | 10KB |
| Images (compressed) | 50KB | 60KB |
| Time to First Byte | 200ms | 300ms |
| First Contentful Paint | 1.0s | 1.5s |
| Largest Contentful Paint | 2.0s | 2.5s |
| Time to Interactive | 2.5s | 3.5s |

---

## Accessibility Strategy

### Semantic HTML

```html
<!-- Use semantic elements -->
<header>
  <nav aria-label="Main navigation">
    <!-- Navigation links -->
  </nav>
</header>

<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading"><!-- Heading --></h1>
  </section>
  
  <section aria-labelledby="features-heading">
    <h2 id="features-heading">Features</h2>
  </section>
</main>

<footer>
  <!-- Footer content -->
</footer>
```

### ARIA Labels and Roles

```html
<!-- External link indication -->
<a href="[URL]" 
   target="_blank" 
   rel="noopener noreferrer"
   aria-label="Install Vocalario Extension (opens in new tab)">
  Install Extension
  <svg aria-hidden="true"><!-- Icon --></svg>
</a>

<!-- Skip to main content link -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

### Keyboard Navigation

```css
/* Visible focus indicators */
a:focus,
button:focus {
  outline: var(--focus-outline-width) var(--focus-outline-style) var(--focus-outline-color);
  outline-offset: var(--focus-outline-offset);
}

/* Skip link - visible on focus */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Color Contrast

All color combinations must meet WCAG AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text (18px+): 3:1 contrast ratio

**Testing:**
- Use browser DevTools contrast checker
- Validate with WebAIM Contrast Checker
- Test with colorblind simulation tools

### Screen Reader Testing

- Test with VoiceOver (macOS)
- Test with NVDA (Windows)
- Ensure all interactive elements are announced
- Verify heading hierarchy is logical

---

## SEO Strategy

### HTML Meta Tags

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>Vocalario - Learn Vocabulary from Websites You Visit</title>
  <meta name="title" content="Vocalario - Learn Vocabulary from Websites You Visit">
  <meta name="description" content="Privacy-focused Chrome extension that extracts and analyzes vocabulary from webpages. Support for multiple AI providers with local-first storage. No account required.">
  <meta name="keywords" content="vocabulary learning, chrome extension, language learning, AI vocabulary, privacy-focused">
  <meta name="author" content="Vocalario">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://vocalario.com/">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://vocalario.com/">
  <meta property="og:title" content="Vocalario - Learn Vocabulary from Websites You Visit">
  <meta property="og:description" content="Privacy-focused Chrome extension that extracts and analyzes vocabulary from webpages. Support for multiple AI providers with local-first storage.">
  <meta property="og:image" content="https://vocalario.com/images/og-image.png">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://vocalario.com/">
  <meta property="twitter:title" content="Vocalario - Learn Vocabulary from Websites You Visit">
  <meta property="twitter:description" content="Privacy-focused Chrome extension that extracts and analyzes vocabulary from webpages. Support for multiple AI providers with local-first storage.">
  <meta property="twitter:image" content="https://vocalario.com/images/og-image.png">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="css/design-system.css">
  <link rel="stylesheet" href="css/main.css">
</head>
```

### Structured Data (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Vocalario",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Chrome",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Privacy-focused Chrome extension that extracts and analyzes vocabulary from webpages",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "0"
  },
  "author": {
    "@type": "Organization",
    "name": "Vocalario",
    "email": "admin@vocalario.com"
  }
}
</script>
```

### Sitemap (sitemap.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vocalario.com/</loc>
    <lastmod>2025-11-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vocalario.com/privacy.html</loc>
    <lastmod>2025-11-09</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://vocalario.com/terms.html</loc>
    <lastmod>2025-11-09</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### Robots.txt

```
User-agent: *
Allow: /

Sitemap: https://vocalario.com/sitemap.xml
```

---

## Deployment Strategy

### Hosting Platform: Netlify (Primary Choice)

**Why Netlify:**
- Zero configuration for static sites
- Automatic SSL/TLS certificates
- Global CDN included (Netlify Edge)
- Automatic deployments from Git
- Excellent performance and reliability
- Free tier sufficient for marketing site
- Built-in form handling (if needed later)
- Branch previews for testing
- One-click rollbacks

### Deployment Process

```bash
# 1. Initialize Git repository (if not already)
git init
git add .
git commit -m "Initial commit"

# 2. Push to GitHub
git remote add origin [GITHUB_REPO_URL]
git push -u origin main

# 3. Connect to Netlify
# - Sign up at netlify.com
# - Click "Add new site" → "Import an existing project"
# - Connect to GitHub and select repository
# - Configure build settings:
#   - Build command: (leave empty - no build needed)
#   - Publish directory: . (root directory)
#   - Click "Deploy site"

# 4. Automatic Deployment
# - Every push to main branch triggers automatic deployment
# - Branch previews created for pull requests
```

### Custom Domain Configuration

```
# Netlify Domain Settings:
1. Go to Site Settings → Domain management
2. Add custom domain: vocalario.com
3. Configure DNS records (Netlify provides instructions)
4. SSL certificate automatically provisioned

# DNS Configuration (at your domain registrar):
# Option A: Netlify DNS (Recommended)
- Point nameservers to Netlify DNS servers

# Option B: Custom DNS
A Record: @ → [Netlify Load Balancer IP]
CNAME: www → [your-site].netlify.app
```

### Netlify Configuration File (Optional)

Create a `netlify.toml` file in the root for advanced configuration:

```toml
# netlify.toml

[build]
  publish = "."
  
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    
[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/*.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/*.webp"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "https://www.vocalario.com/*"
  to = "https://vocalario.com/:splat"
  status = 301
  force = true
```

### Continuous Deployment Workflow

```
Developer commits → GitHub → Netlify (auto-deploy)
                             ↓
                      Preview deployment
                             ↓
                      Automatic checks
                             ↓
                  Deploy to production (main branch)
                             ↓
                      Available at: vocalario.netlify.app
                      (or custom domain)
```

### Branch Deploy Previews

Netlify automatically creates preview deployments for:
- Pull requests (review changes before merging)
- Feature branches (test in isolation)
- Each commit gets unique URL for testing

### Deployment Checklist

- [ ] All HTML files validated (W3C Validator)
- [ ] All CSS files minified
- [ ] All images optimized and compressed
- [ ] All external links tested
- [ ] Lighthouse audit score 95+
- [ ] Accessibility audit passed
- [ ] Mobile responsiveness tested
- [ ] Cross-browser testing completed
- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] Sitemap submitted to Google Search Console
- [ ] robots.txt configured
- [ ] 404 page created (optional)

---

## Testing Strategy

### Manual Testing Checklist

#### Functionality Testing
- [ ] All internal links work correctly
- [ ] All external links open in new tabs
- [ ] CTA buttons link to correct destinations
- [ ] Form submissions work (if contact form added)
- [ ] Email links are functional

#### Responsive Testing
- [ ] Desktop (1920x1080, 1366x768)
- [ ] Tablet (768x1024, 834x1194)
- [ ] Mobile (375x667, 414x896, 360x640)
- [ ] Test orientation changes (portrait/landscape)

#### Browser Compatibility
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)

#### Performance Testing
- [ ] Lighthouse audit (Performance, Accessibility, SEO, Best Practices)
- [ ] WebPageTest.org analysis
- [ ] GTmetrix analysis
- [ ] Test on 3G network simulation

#### Accessibility Testing
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Color contrast validation
- [ ] Focus indicators visible
- [ ] ARIA labels correct

#### SEO Testing
- [ ] Meta tags present and correct
- [ ] Structured data validates (Google Rich Results Test)
- [ ] Sitemap accessible
- [ ] Robots.txt accessible
- [ ] Open Graph tags validate (Facebook Debugger)
- [ ] Twitter Card tags validate (Twitter Card Validator)

### Automated Testing (Optional)

```bash
# HTML Validation
npx html-validate index.html

# CSS Validation
npx stylelint "css/**/*.css"

# Link Checking
npx broken-link-checker https://vocalario.com

# Lighthouse CI
npx lighthouse https://vocalario.com --view
```

---

## Logo Design Specification

### Simple Text-Based Logo (SVG)

Since you don't have a logo yet, here's a specification for a minimal SVG logo:

```html
<!-- Simple text-based logo with icon -->
<svg width="200" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
  <!-- Icon: Book with speech bubble -->
  <rect x="2" y="10" width="20" height="20" rx="2" fill="var(--color-primary)"/>
  <path d="M 12 10 L 12 22" stroke="white" stroke-width="2"/>
  <circle cx="26" cy="18" r="6" fill="var(--color-accent)"/>
  
  <!-- Text: Vocalario -->
  <text x="40" y="27" 
        font-family="var(--font-sans)" 
        font-size="24" 
        font-weight="700" 
        fill="var(--color-text)">
    Vocalario
  </text>
</svg>
```

**Logo Specifications:**
- **Wordmark**: "Vocalario" in bold system font
- **Icon**: Simple book + speech bubble combination
- **Colors**: Primary blue (#00509d) and accent teal (#73c8d2)
- **Format**: SVG for scalability
- **Variants**: 
  - Full logo (icon + text)
  - Icon only (for favicon)
  - Text only (for small sizes)

**Alternative: Text-Only Logo**
If you prefer even simpler, just use styled text:
```html
<h1 class="logo">Vocalario</h1>
```

```css
.logo {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  letter-spacing: var(--letter-tight);
}
```

---

## Security Considerations

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:; 
               script-src 'self';">
```

### External Link Safety

```html
<!-- Always include rel="noopener noreferrer" for external links -->
<a href="[EXTERNAL_URL]" 
   target="_blank" 
   rel="noopener noreferrer">
  Link Text
</a>
```

### Email Obfuscation (Optional)

```html
<!-- Simple obfuscation to reduce spam -->
<a href="mailto:admin&#64;vocalario&#46;com">
  admin&#64;vocalario&#46;com
</a>
```

Or JavaScript-based (if JS is used):
```javascript
// Decode email on page load
document.addEventListener('DOMContentLoaded', () => {
  const email = 'admin' + '@' + 'vocalario.com';
  document.getElementById('contact-email').href = 'mailto:' + email;
  document.getElementById('contact-email').textContent = email;
});
```

---

## Error Handling

### 404 Page (Optional)

Create a custom 404 page for better user experience:

```html
<!-- 404.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>404 - Page Not Found | Vocalario</title>
  <link rel="stylesheet" href="css/design-system.css">
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <main class="error-page">
    <h1>404</h1>
    <p>Page not found</p>
    <a href="/" class="btn btn-primary">Go Home</a>
  </main>
</body>
</html>
```

---

## Maintenance Plan

### Content Updates

**Update Frequency:**
- Marketing copy: As needed
- Feature list: When extension updates
- Privacy Policy: When practices change
- Terms of Service: When terms change

**Update Process:**
1. Update HTML files locally
2. Test changes in browser
3. Commit to Git
4. Push to GitHub
5. Automatic deployment via Vercel

### Performance Monitoring

**Monthly Checks:**
- [ ] Run Lighthouse audit
- [ ] Check page load times
- [ ] Verify all links still work
- [ ] Check Chrome Web Store link
- [ ] Monitor domain expiration

### Security Updates

**Quarterly Reviews:**
- [ ] Update dependencies (if any)
- [ ] Review security headers
- [ ] Check SSL certificate status
- [ ] Review access logs (if available)

---

## Documentation Requirements

### Code Documentation

```html
<!-- Section: Hero -->
<!-- Purpose: Main landing section with headline and CTA -->
<section id="hero" class="section section-hero">
  <!-- Content -->
</section>
```

```css
/* Component: Feature Card
 * Usage: Display individual feature with icon and description
 * Responsive: Stacks on mobile, grid on desktop
 */
.feature-card { }
```

### Project README

Include in README.md:
- Project overview
- Development setup
- File structure
- Deployment instructions
- Contribution guidelines (if open source)

---

## Success Metrics

### Launch Criteria

- [ ] All pages load in < 1 second
- [ ] Lighthouse scores: 95+ across all categories
- [ ] No console errors or warnings
- [ ] All links functional
- [ ] Responsive on all device sizes
- [ ] Accessibility audit passed
- [ ] SEO meta tags complete
- [ ] Custom domain configured
- [ ] SSL certificate active

### Post-Launch Monitoring

**Week 1:**
- Monitor for any user-reported issues
- Check page load performance
- Verify Chrome Web Store clicks

**Month 1:**
- Review any feedback
- Consider adding FAQ if questions arise
- Update screenshots if extension UI changes

---

## Technical Debt & Future Considerations

### Potential Future Enhancements

1. **Blog Section**: Add markdown-based blog for SEO
2. **Documentation Site**: Separate docs subdomain
3. **Multi-language Support**: i18n for international users
4. **Dark Mode**: Toggle between light/dark themes
5. **Interactive Demo**: Embedded demo or video walkthrough
6. **Newsletter**: Email signup for updates
7. **Analytics**: Privacy-friendly analytics (Plausible, Fathom)

### Technical Improvements

1. **Build Process**: Add basic minification/optimization
2. **Testing**: Automated visual regression testing
3. **CI/CD**: More sophisticated deployment pipeline
4. **Monitoring**: Uptime monitoring and alerting
5. **A/B Testing**: Test different copy/layouts

---

## Appendix: Icon Selection (Heroicons)

Recommended Heroicons for each feature:

1. **Extract and analyze vocabulary**: 
   - `document-text` or `language`

2. **Multiple AI providers**: 
   - `cpu-chip` or `puzzle-piece`

3. **Local-first storage**: 
   - `server-stack` or `archive-box`

4. **BYOK approach**: 
   - `key` or `shield-check`

5. **Privacy-focused design**: 
   - `lock-closed` or `shield-exclamation`

How It Works steps:
- **Step 1 (Install)**: `arrow-down-tray`
- **Step 2 (Configure)**: `cog-6-tooth`
- **Step 3 (Browse)**: `globe-alt`
- **Step 4 (Learn)**: `academic-cap`

---

**Document Status**: ✅ Complete - Ready for Implementation Planning  
**Next Steps**: Create `tasks.md` with detailed implementation plan
