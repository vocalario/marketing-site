# Vocalario Marketing Website - Requirements Specification

**Project**: Vocalario Marketing Website  
**Version**: 1.0  
**Last Updated**: November 9, 2025  
**Status**: Planning Phase

## Executive Summary

A minimal, fast-loading marketing website for Vocalario Chrome Extension. The site will showcase the extension's features, emphasize privacy-first approach, and drive installations through a clear call-to-action. Built with vanilla HTML/CSS/JS for maximum performance and simplicity.

---

## User Stories

### US-1: Visitor Understanding
**As a** potential user visiting the website  
**I want to** quickly understand what Vocalario does and its key benefits  
**So that** I can decide if it's useful for my language learning needs

**Acceptance Criteria:**
- Clear, compelling headline visible within first viewport
- 5 main features prominently displayed
- Privacy-first messaging is evident
- Total page load time < 1 second

### US-2: Extension Installation
**As a** visitor who wants to use Vocalario  
**I want to** easily install the Chrome extension  
**So that** I can start learning vocabulary from websites

**Acceptance Criteria:**
- Primary CTA button clearly visible in hero section
- CTA links directly to Chrome Web Store
- CTA repeated in final conversion section
- Button follows design system styling

### US-3: Understanding How It Works
**As a** potential user  
**I want to** understand how Vocalario works  
**So that** I can determine if it fits my workflow

**Acceptance Criteria:**
- "How It Works" section with 3-4 step process
- Brief, clear explanations
- Visual indicators or icons for each step

### US-4: Privacy Information
**As a** privacy-conscious user  
**I want to** access detailed privacy and terms information  
**So that** I can understand data handling practices

**Acceptance Criteria:**
- Dedicated Privacy Policy page
- Dedicated Terms of Service page
- Links accessible from footer
- Privacy-first approach highlighted on landing page

### US-5: Contact Information
**As a** visitor needing support or information  
**I want to** find contact details  
**So that** I can reach the Vocalario team

**Acceptance Criteria:**
- Email address (admin@vocalario.com) visible in footer
- Contact information on Privacy Policy and Terms pages

---

## Functional Requirements (EARS Notation)

### Content & Structure

**REQ-001: Landing Page Structure**  
WHEN a user visits the website, THE SYSTEM SHALL display a single-page layout with the following sections in order:
1. Hero section with headline, subheadline, and primary CTA
2. Features section with 5 feature cards
3. How It Works section with step-by-step process
4. Privacy & Security highlight section
5. Final CTA section
6. Footer with links and contact information

**REQ-002: Navigation**  
THE SYSTEM SHALL provide navigation links to:
- Privacy Policy page
- Terms of Service page
- Contact email address
- Chrome Web Store (external)

**REQ-003: Hero Section**  
THE SYSTEM SHALL display in the hero section:
- Primary headline introducing Vocalario
- Descriptive subheadline explaining the value proposition
- Primary CTA button linking to Chrome Web Store
- Hero image or visual element (placeholder if assets not ready)

**REQ-004: Features Section**  
THE SYSTEM SHALL display 5 feature cards with:
- Icon (from open-source Heroicons set)
- Feature title
- Brief description (1-2 sentences)

Features to display:
1. Extract and analyze vocabulary from any webpage
2. Support for multiple AI providers (OpenAI, Anthropic, Google Gemini)
3. Local-first storage (no account required)
4. BYOK (Bring Your Own Key) approach
5. Privacy-focused design

**REQ-005: How It Works Section**  
THE SYSTEM SHALL display a 3-4 step process explaining:
- How users install and configure the extension
- How vocabulary extraction works
- How users can review and learn vocabulary

**REQ-006: Privacy Section**  
THE SYSTEM SHALL highlight privacy features:
- Local-first storage explanation
- BYOK benefits for privacy
- No account requirement
- No tracking or analytics statement

**REQ-007: Call-to-Action Section**  
THE SYSTEM SHALL display a final conversion section with:
- Compelling call-to-action message
- Primary CTA button (duplicate from hero)
- Optional secondary link to GitHub repository

**REQ-008: Footer**  
THE SYSTEM SHALL display footer with:
- Copyright notice
- Link to Privacy Policy
- Link to Terms of Service
- Contact email: admin@vocalario.com
- Optional: GitHub repository link

**REQ-009: Privacy Policy Page**  
THE SYSTEM SHALL provide a dedicated Privacy Policy page with:
- Data collection practices (minimal/none)
- Data storage information (local-first)
- Third-party services (AI providers with user keys)
- User rights and choices
- Contact information

**REQ-010: Terms of Service Page**  
THE SYSTEM SHALL provide a dedicated Terms of Service page with:
- Service description
- User responsibilities
- Liability limitations
- Modification rights
- Contact information

### Visual Design & Branding

**REQ-011: Design System**  
THE SYSTEM SHALL use the provided design system CSS file with:
- Color palette (primary: #00509d, accent: #73c8d2, highlight: #ff9013)
- Typography system (system font stack)
- Spacing system (8px base)
- Shadow and transition definitions

**REQ-012: Logo**  
THE SYSTEM SHALL display a simple text-based or minimal SVG logo:
- Wordmark: "Vocalario"
- Styling consistent with design system colors
- Visible in header/navigation area

**REQ-013: Icons**  
THE SYSTEM SHALL use Heroicons (open-source) for:
- Feature icons
- How It Works step indicators
- Navigation elements (if needed)

**REQ-014: Responsive Design**  
THE SYSTEM SHALL provide responsive layouts for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

### Performance Requirements

**REQ-015: Page Load Performance**  
THE SYSTEM SHALL achieve:
- Initial page load < 1 second on 3G connection
- Total page size < 100KB (excluding images)
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s

**REQ-016: Lighthouse Scores**  
THE SYSTEM SHALL achieve minimum Lighthouse scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

**REQ-017: Asset Optimization**  
THE SYSTEM SHALL optimize assets:
- Images compressed and served in modern formats (WebP with fallback)
- CSS minified for production
- Minimal to no JavaScript required
- Inline critical CSS

### Technical Requirements

**REQ-018: Technology Stack**  
THE SYSTEM SHALL be built using:
- HTML5 with semantic markup
- CSS3 with CSS custom properties (already defined)
- Vanilla JavaScript (minimal, only for interactions)
- No build process or minimal tooling

**REQ-019: Browser Compatibility**  
THE SYSTEM SHALL support:
- Chrome (latest 2 versions) - primary target
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

**REQ-020: Accessibility**  
THE SYSTEM SHALL implement:
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)
- Alt text for all images
- Focus indicators for interactive elements

**REQ-021: SEO**  
THE SYSTEM SHALL include:
- Descriptive page titles and meta descriptions
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URL
- Structured data (JSON-LD) for organization/product

### Privacy & Compliance

**REQ-022: No Tracking**  
THE SYSTEM SHALL NOT include:
- Analytics scripts (Google Analytics, etc.)
- Tracking pixels
- Third-party cookies
- Fingerprinting techniques

**REQ-023: External Links**  
WHEN a user clicks external links, THE SYSTEM SHALL:
- Open in new tab with `target="_blank"`
- Include `rel="noopener noreferrer"` for security

**REQ-024: Contact Privacy**  
THE SYSTEM SHALL protect email addresses from spam:
- Use email obfuscation or contact form
- Or accept plain text if spam risk is acceptable

### Content Requirements

**REQ-025: Copywriting Tone**  
THE SYSTEM SHALL use copywriting that is:
- Clear and concise
- Professional but approachable
- Privacy-focused and trustworthy
- Benefit-oriented (not feature-focused)

**REQ-026: Content Accuracy**  
THE SYSTEM SHALL ensure all content:
- Accurately represents extension features
- Includes no false or misleading claims
- Uses proper grammar and spelling
- Is easily scannable with headings and bullet points

---

## Non-Functional Requirements

### Maintainability

**REQ-027: Code Quality**  
THE SYSTEM SHALL maintain:
- Clean, readable HTML structure
- Organized CSS following design system
- Commented code for complex sections
- Consistent naming conventions

**REQ-028: Version Control**  
THE SYSTEM SHALL use Git for:
- Tracking all changes
- Meaningful commit messages
- Branch strategy (main for production)

### Deployment

**REQ-029: Static Hosting**  
THE SYSTEM SHALL be deployable to:
- Vercel (recommended)
- Netlify (alternative)
- GitHub Pages (alternative)
- Any static hosting provider

**REQ-030: Domain**  
THE SYSTEM SHALL support custom domain configuration:
- Primary domain setup
- SSL/TLS certificate (automatic with hosting)

---

## Constraints & Assumptions

### Constraints

1. **No Backend**: Pure static site, no server-side processing
2. **No User Accounts**: Marketing site only, no user registration
3. **No Database**: All content in HTML files
4. **Minimal JavaScript**: Only for minor interactions (smooth scroll, mobile menu if needed)
5. **No Tracking**: Privacy-first approach means no analytics

### Assumptions

1. Chrome Web Store listing will be available before launch
2. Screenshots/demo images will be provided before implementation
3. Domain name will be determined (e.g., vocalario.com)
4. Content/copy will be written during or before implementation
5. Logo design will be created as simple text-based or minimal SVG

### Dependencies

1. **External**: Chrome Web Store (for extension link)
2. **Internal**: Design system CSS file
3. **Assets**: 
   - Logo (to be created)
   - Screenshots (to be provided)
   - Icons from Heroicons (open-source)

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Browser compatibility issues | Medium | Test on all major browsers, use standard CSS |
| Performance degradation with large images | High | Optimize images, use WebP, implement lazy loading |
| SEO issues without framework | Low | Use semantic HTML, proper meta tags, structured data |
| Accessibility oversights | Medium | Follow WCAG guidelines, test with screen readers |
| Content updates difficulty | Low | Use clear HTML structure, document content areas |

---

## Success Criteria

The Vocalario marketing website will be considered successful when:

1. ✅ All functional requirements (REQ-001 through REQ-030) are implemented
2. ✅ Page load time is consistently < 1 second
3. ✅ Lighthouse scores meet minimum thresholds (95+)
4. ✅ Site is fully responsive on mobile, tablet, and desktop
5. ✅ Accessibility audit passes with WCAG AA compliance
6. ✅ All browser compatibility tests pass
7. ✅ Privacy Policy and Terms of Service pages are complete
8. ✅ Site is deployed and accessible via custom domain
9. ✅ CTA button successfully links to Chrome Web Store
10. ✅ No console errors or warnings in any supported browser

---

## Future Enhancements (Out of Scope for v1.0)

- Blog or documentation section
- Multi-language support
- User testimonials section
- Video demo/tutorial
- FAQ section
- Newsletter signup
- GitHub stars/contributor counter
- Interactive demo
- Comparison with competitors
- Pricing page (if premium version planned)

---

## Appendix

### Target Audience

**Primary Persona**: Language learners who browse foreign language content
- Tech-savvy enough to install Chrome extensions
- Privacy-conscious
- Prefer self-hosted or BYOK solutions
- Active internet users who consume content in target language

**Secondary Persona**: Power users/developers
- Appreciate open-source and privacy-first tools
- Comfortable with API keys and configuration
- May contribute to or fork the project

### Key Messaging

**Primary Message**: Learn vocabulary naturally from websites you already visit  
**Secondary Messages**:
- Privacy-first: Your data stays on your device
- Bring Your Own Key: No vendor lock-in, use your preferred AI provider
- No account required: Start learning immediately
- Flexible: Works with OpenAI, Anthropic, Google Gemini

### Competitor Differentiation

- **vs. Vocabulary apps**: Contextual learning from real content, not flashcard apps
- **vs. Browser extensions**: Privacy-first, local-first, no account required
- **vs. AI tools**: BYOK approach, user controls their data and costs

---

**Document Status**: ✅ Complete - Ready for Design Phase  
**Next Steps**: Create `design.md` with technical architecture and component specifications
