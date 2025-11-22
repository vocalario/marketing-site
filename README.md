# Vocalario Marketing Site

Marketing website for Vocalario Chrome Extension - Learn vocabulary from websites you visit.

## 🚀 Quick Start

### Development

The source files are in the `src/` directory. Edit them directly:

```bash
src/
├── index.html          # Landing page
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── css/
│   ├── design-system.css  # CSS variables and design tokens
│   └── main.css           # Component styles
└── js/
    └── main.js         # JavaScript enhancements
```

### Local Testing

Start a local development server to test the built files:

```bash
# Build and start server
npm run build
npm run dev

# Or combine both
npm run build && npm run dev
```

Server will start at `http://localhost:3000` serving the `dist/` folder.

**Dev server features:**
- Serves files from `dist/` directory
- **Hot reload**: Automatically refreshes browser when files change
- Automatic MIME type detection
- Clean URLs (e.g., `/privacy` → `/privacy.html`)
- Directory traversal protection
- Custom port: `PORT=3001 npm run dev`

**Development workflow:**
1. Open `http://localhost:3000` in browser
2. Edit files in `src/`
3. Run `npm run build` in another terminal
4. Browser automatically reloads with changes

### Build for Production

Install dependencies and build:

```bash
npm install
npm run build
```

This will:
- Minify all HTML, CSS, and JavaScript files
- Copy processed files to `dist/` directory
- Copy `sitemap.xml` and `robots.txt` to `dist/`
- Display file size reductions

**Build scripts:**
- `npm run build` - Build production files to `dist/`
- `npm run clean` - Remove `dist/` directory
- `npm run prebuild` - Automatically runs clean before build

### Deployment

The `dist/` directory contains production-ready files. Deploy to Netlify:

**Option 1: Manual Deploy**
```bash
npm run build
# Upload contents of dist/ folder to Netlify
```

**Option 2: Netlify CLI**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**Option 3: Git Integration**
- Push to GitHub
- Connect repository to Netlify
- Build command: `npm run build`
- Publish directory: `dist`

## 📁 Project Structure

```
marketing-site/
├── src/                    # Source files (edit these)
│   ├── index.html
│   ├── privacy.html
│   ├── terms.html
│   ├── css/
│   │   ├── design-system.css
│   │   └── main.css
│   └── js/
│       └── main.js
├── dist/                   # Built files (generated, do not edit)
├── build.js                # Build script
├── package.json            # Dependencies and scripts
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Crawler instructions
└── README.md

```

## 🎨 Design System

The design system uses CSS custom properties defined in `src/css/design-system.css`:

- **Colors**: Primary (#00509d), Accent (#73c8d2), Highlight (#ff9013)
- **Typography**: System font stack with defined scales
- **Spacing**: 8px base unit system
- **Shadows**: 4 elevation levels
- **Breakpoints**: Mobile-first (480px, 768px, 1024px)

## 🔍 SEO Features

- **Meta Tags**: Comprehensive SEO, Open Graph, Twitter Cards
- **Structured Data**: SoftwareApplication, Organization, WebSite, BreadcrumbList schemas
- **Sitemap**: XML sitemap with all pages
- **Robots.txt**: Crawler configuration
- **Canonical URLs**: Proper page indexing

## ⚡ Performance

**Targets:**
- Total page size: < 100KB
- Load time: < 1 second
- Lighthouse scores: 95+ (all categories)

**Optimizations:**
- Minified HTML, CSS, JavaScript
- Flat directory structure for faster serving
- Asset path optimization during build
- No external dependencies
- Semantic HTML for fast parsing

**Build Output:**
```
dist/
├── index.html           # Minified landing page
├── privacy.html         # Minified privacy policy  
├── terms.html          # Minified terms of service
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Crawler config
├── css/
│   ├── design-system.css  # Minified
│   └── main.css           # Minified
└── js/
    └── main.js            # Minified
```

**Note**: Asset paths are automatically updated during build (`src/css/` → `css/`, `src/js/` → `js/`)

## 🧪 Testing

**Before deployment, test:**

1. **Functionality**: All links work, forms validate
2. **Cross-browser**: Chrome, Firefox, Safari, Edge
3. **Responsive**: Mobile (320px+), tablet, desktop
4. **Accessibility**: WCAG AA compliance, keyboard navigation
5. **SEO**: Lighthouse audit, meta tags validation

## 📝 License

MIT License - See LICENSE file for details

## 📧 Contact

- Email: admin@vocalario.com
- GitHub: [github.com/vocalario](https://github.com/vocalario)
