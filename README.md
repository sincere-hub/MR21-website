# MR21 Funerals & Insurance Website

Premium static redesign for MR21 Funerals & Insurance, focused on trust, dignity, fast comprehension and conversion.

## UX Strategy

Primary users are South African families comparing funeral cover, existing members needing claims support, and visitors who need emergency contact details quickly. The experience prioritizes:

- Immediate trust through licensing cues, direct contact details and clear plan information.
- Less than three clicks to apply, get a quote, compare plans, submit a claim or contact MR21.
- Mobile-first navigation with quick emergency, WhatsApp and application actions.
- Plain-language product comparison for older and younger family decision-makers.

## Information Architecture

Primary pages:

- `index.html`: home page with brand introduction and clear page routing.
- `plans.html`: Funeral Cover page with Basic, Executive, Royalty and Kingship plans.
- `gallery.html`: Funeral Gallery page.
- `overview.html`: Company Overview page.
- `faq.html`: FAQ page with search.
- `contact.html`: Contact Us page.
- `claim.html`: Submit Your Claim page.
- `rewards.html`: Rewards page.
- `apply.html`: Apply Now Online page.

## Design System

Colors:

- Whole-site Background: `#050505`
- Deep Royal Blue: `#0B347F`
- Dark Blue: `#061B43`
- Luxury Gold: `#D7B65A`
- Gold Accent: `#C7A13A`
- White: `#FFFFFF`
- Dark Panel: `#101114`
- Dark Charcoal: `#050505`

Typography:

- Primary font: Inter
- Large confident headings
- Readable body copy
- No negative letter spacing

Components:

- Screenshot-inspired gold social strip, black contact bar and blue menu navigation
- Mobile slide-out menu
- Funeral Cover dropdown
- Primary, outline and glass buttons
- Product cards
- Comparison table
- Quote calculator
- Application form with progress
- FAQ search
- Branch/map panel
- Floating WhatsApp, emergency and back-to-top actions

## Development Blueprint

Current implementation is a static HTML/CSS/JS site:

- `index.html`: multi-page entry and routing page.
- `plans.html`: Funeral Cover comparison and plan detail page.
- `gallery.html`, `overview.html`, `faq.html`, `contact.html`, `claim.html`, `rewards.html`, `apply.html`: individual destination pages.
- `css/styles.css`: responsive design system and page styling.
- `js/app.js`: navigation, reveal animations, calculator, FAQ filtering, form validation and progress.

Recommended future enhancements:

- Connect forms to a secure backend or CRM.
- Replace placeholder external imagery with licensed MR21 photography.
- Add real Google Maps embed or Maps API branch locator.
- Add online payment provider integration.
- Add member portal authentication.
- Add real AI assistant/live chat provider.
- Generate compressed local WebP/AVIF image assets.

## Accessibility Checklist

- Semantic landmarks and heading structure.
- Skip link.
- Keyboard-focus states.
- ARIA labels for icon-only controls.
- High-contrast blue/gold/white palette.
- Reduced-motion support.
- Large mobile touch targets.
- Form validation messaging and live regions.

## SEO Strategy

- Local insurance and funeral service metadata.
- Open Graph metadata.
- `InsuranceAgency` schema on the homepage.
- Keyword coverage for funeral insurance, funeral cover, claims, burial society and Thohoyandou/Limpopo services.
- Clear internal linking between homepage sections and plans.

## Performance Plan

- Static pages with minimal JavaScript.
- Lazy future image strategy recommended for local assets.
- No framework dependency.
- External fonts and icons should be self-hosted in production for maximum Lighthouse score.
