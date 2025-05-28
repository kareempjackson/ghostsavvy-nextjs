# GHOST SAVVY STUDIOS

## Brand Guide

---

### CORE POSITIONING

**Mission**  
We build exceptional digital products that solve real problems while pushing creative boundaries.

**Vision**  
To become the premier remote product studio known for launching category-defining SaaS and media ventures that impact how people work, create, and connect.

**Brand Values**

- **Craftsmanship**: Meticulous attention to detail in everything we create
- **Impact**: Building solutions that matter, not novelties
- **Clarity**: Simplifying complexity through thoughtful design
- **Innovation**: Pushing boundaries without sacrificing usability

**Voice**

- Calm, confident, precise
- Straightforward with subtle intrigue
- Technical when needed, always accessible
- Avoids hype, focuses on substance
- Slightly mysterious—ghostly presence

---

### VISUAL IDENTITY

**Color System**

Primary Brand Colors:

- **Black** (#000000): Headlines, hero backgrounds, focal UI elements
- **White** (#FFFFFF): Content backgrounds, negative space, type on dark
- **Forest** (#233531): Primary text, structured UI elements, footers
- **Lime** (#CFF39E): Accent color, cards, tags, highlights
- **LimeBold** (#BBE950): CTAs, hover states, active elements

Secondary Colors:

- **Indigo** (#3F4697): Links, secondary CTAs, accent elements
- **Ivory** (#F4EBE0): Alternative backgrounds, subtle card patterns

**Typography**

- **AleoVera**: Our sole typeface for all applications
  - Headings: AleoVera Medium, -0.5px letter-spacing, 1.1 line-height
  - Body: AleoVera Regular, 0px letter-spacing, 1.5 line-height
  - Captions: AleoVera Light, +0.5px letter-spacing, 1.3 line-height

Typographic Scale:

- Display: 64px/72px
- H1: 48px/56px
- H2: 36px/44px
- H3: 24px/32px
- Body: 16px/24px
- Small: 14px/20px
- Caption: 12px/16px

**Design System Principles**

- Flat surfaces only—no drop shadows or Material Design
- Use negative space for hierarchy and focus
- Create depth through layering and motion, not artificial elevation
- Grid-based layouts with intentional asymmetry for tension
- Distinctive elements should be large and bold
- Details should be refined but minimal

**Interface Elements**

- Buttons: Rectangular with subtle rounded corners (4px)
- Links: Underlined on hover, color shift from Forest to Indigo
- Cards: Flat containers with thin borders (1px)
- Form elements: Minimal styling, focus states use Lime
- Hover states: Color shifts, scale transforms (1.02-1.05), opacity changes

---

### LOGO GUIDELINES

**Primary Mark**

- Full logotype for primary applications
- Minimum width: 120px digital, 1.5" print
- Clear space: Height of "G" on all sides

**Monogram**

- Ghost icon for favicons, avatars, and constrained spaces
- Minimum size: 32px digital, 0.5" print

**Color Applications**

- Primary: White on Black/Forest or Black on White/Lime
- Reversed: White on any dark background
- Monochrome: 100% Black or White only when necessary

**Placement**

- Centered or left-aligned depending on application
- Never distort, rotate, or add effects
- Do not place on busy backgrounds or photos without overlay

---

### BRAND APPLICATIONS

**Product UI**

- Clean, minimal interfaces with ample white space
- Lime accents for interactive elements
- Typography-driven information hierarchy
- Consistent component styling across platforms

**Marketing Pages**

- Bold headlines in AleoVera
- Strategic use of Black backgrounds for impact sections
- Lime highlights for key value propositions
- Generous white space between sections

**Case Studies**

- Editorial layout with clear visual hierarchy
- Large imagery with minimal captions
- Pull quotes in larger type with Lime accents
- Metrics displayed in clear, graphical format

**Social Assets**

- Consistent brand colors across platforms
- Typography-forward design with minimal decoration
- Square format optimized for 1:1 ratio
- Ghost monogram as profile icon

**Content**

- Savvy Hub: Editorial style with focus on readability
- Podcast covers: Minimal design with typography focus
- Video thumbnails: Strong typography with Forest background
- Newsletters: Clean layout with focused hierarchy

---

### MOTION GUIDELINES

**Core Principles**

- Motion supports hierarchy and storytelling
- All animation feels intentional and refined
- No decorative or gratuitous movement

**Timing & Easing**

- Default transition: 300ms
- Micro-interactions: 150-200ms
- Page transitions: 500-700ms
- Standard easing: cubic-bezier(0.25, 0.1, 0.25, 1)
- Entry easing: cubic-bezier(0.0, 0.0, 0.2, 1)
- Exit easing: cubic-bezier(0.4, 0.0, 1, 1)

**Key Motions**

- Scroll: Smooth with subtle parallax on heroes
- Fade-ins: Subtle opacity shifts with slight y-axis movement
- Hover feedback: Scale transforms (1.02-1.05) with color shifts
- Page transitions: Fade combined with subtle directional movement
- Cursor glow: Subtle light radius following pointer on dark backgrounds

**Implementation**

- Use CSS transitions for simple interactions
- Use Framer Motion for complex sequences
- Reduce motion for accessibility when user preferences indicate

---

### IMPLEMENTATION

This guide serves as the foundation for all Ghost Savvy Studios products and communications. It is designed to be practical and actionable, providing clear direction while allowing room for the creative innovation that defines our work.

The goal is consistency, not limitation—when in doubt, choose the cleaner, more refined approach that feels confidently minimal rather than decorative.

# Ghost Savvy Studios - Brand Guide & Design System

## 🎨 Brand Colors (Tailwind v4)

Our brand colors are now defined as CSS variables in `src/app/globals.css` for easy customization:

### Primary Brand Colors

```css
--color-brand-deep: #233531; /* Deep Green/Charcoal */
--color-brand-indigo: #3f4697; /* Indigo/Blue */
--color-brand-lime: #cff39e; /* Lime/Sage */
--color-brand-ivory: #f4ebe0; /* Ivory/Light */
--color-brand-black: #141414; /* Rich Black */
--color-brand-white: #fafafa; /* Off White */
```

### Usage in Components

```jsx
// Use Tailwind utilities
<div className="bg-brand-indigo text-brand-ivory">
  <h1 className="text-brand-lime">Ghost Savvy</h1>
</div>

// Or use CSS variables directly
<div style={{ backgroundColor: 'var(--color-brand-indigo)' }}>
  Content
</div>
```

## 🔤 Typography

### Font Stack

- **Display Font**: Aloevera (custom)
- **Body Font**: Aloevera (custom)
- **Mono Font**: Aloevera (custom)

### Typography Scale

```css
h1: text-3xl sm:text-4xl md:text-5xl lg:text-6xl
h2: text-2xl sm:text-3xl md:text-4xl
h3: text-xl sm:text-2xl md:text-3xl
h4: text-lg sm:text-xl md:text-2xl
h5: text-base sm:text-lg md:text-xl
h6: text-sm sm:text-base md:text-lg
p:  text-sm sm:text-base md:text-lg
```

## 🧩 Component System

### Button Components

```jsx
// Primary Button
<button className="btn-primary">Primary Action</button>

// Secondary Button
<button className="btn-secondary">Secondary Action</button>

// Accent Button
<button className="btn-accent">Accent Action</button>
```

### Layout Components

```jsx
// Container
<div className="container-custom">Content</div>

// Section
<section className="section">Content</section>

// Card
<div className="ghost-card">Card Content</div>
```

## 🎭 Animation System

### Available Animations

- `fade-in`: Fade in animation
- `slide-up`: Slide up from bottom
- `slide-down`: Slide down from top
- `slide-left`: Slide in from right
- `slide-right`: Slide in from left
- `wave`: Wave animation
- `spin-slow`: Slow spin animation

### Usage

```jsx
<div className="fade-in">Animated content</div>
<div className="slide-up">Slides up on load</div>
```

## 🎨 Reskin Guide

### Quick Color Change

To reskin the entire application, simply update the CSS variables in `src/app/globals.css`:

```css
@theme {
  /* Update these colors for instant reskin */
  --color-brand-deep: #your-color;
  --color-brand-indigo: #your-color;
  --color-brand-lime: #your-color;
  --color-brand-ivory: #your-color;
  --color-brand-black: #your-color;
  --color-brand-white: #your-color;
}
```

### Advanced Customization

1. **Typography**: Update font variables in the `@theme` block
2. **Spacing**: Modify custom spacing variables
3. **Animations**: Adjust animation timing and easing
4. **Components**: Update utility components like buttons and cards

## 📱 Responsive Design

### Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach

All components are designed mobile-first with progressive enhancement:

```jsx
<div className='text-sm sm:text-base md:text-lg lg:text-xl'>
  Responsive text
</div>
```

## ♿ Accessibility

### Focus States

All interactive elements include proper focus states:

- `focus:outline-hidden focus:ring-3 focus:ring-brand-indigo/50`

### Touch Targets

Mobile touch targets meet minimum 44px requirement:

```css
@media (max-width: 640px) {
  button,
  a,
  [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}
```

## 🛠 Development Guidelines

### CSS Organization

1. **Theme Variables**: Define in `@theme` block
2. **Base Styles**: Use `@layer base` for global styles
3. **Components**: Use `@utility` for reusable components
4. **Utilities**: Use standard Tailwind classes

### Best Practices

1. Use CSS variables for dynamic theming
2. Prefer utility classes over custom CSS
3. Use semantic HTML elements
4. Include proper ARIA labels
5. Test on multiple devices and screen readers

## 🚀 Performance

### Tailwind v4 Benefits

- **Faster builds**: 3.5x faster full builds
- **Smaller CSS**: Only includes used styles
- **Better caching**: Improved incremental builds
- **Modern CSS**: Uses latest CSS features

### Optimization Tips

1. Use dynamic utilities instead of arbitrary values
2. Leverage CSS variables for runtime theming
3. Minimize custom CSS in favor of utilities
4. Use the Vite plugin for best performance

## 🎯 Brand Voice & Tone

### Voice Characteristics

- **Professional**: Expert knowledge and capability
- **Approachable**: Friendly and accessible
- **Innovative**: Cutting-edge solutions
- **Reliable**: Trustworthy and dependable

### Tone Guidelines

- Use active voice
- Be concise and clear
- Avoid jargon when possible
- Maintain confidence without arrogance

## 📋 Component Checklist

When creating new components:

- [ ] Uses brand colors from CSS variables
- [ ] Includes proper focus states
- [ ] Responsive design implemented
- [ ] Accessibility considerations met
- [ ] Animation states defined
- [ ] Touch-friendly on mobile
- [ ] Consistent with design system

## 🔄 Migration from v3 to v4

### Completed Changes

- ✅ Updated to Tailwind CSS v4.1.8
- ✅ Migrated configuration to CSS variables
- ✅ Updated PostCSS configuration
- ✅ Converted theme to `@theme` block
- ✅ Added utility components with `@utility`
- ✅ Improved accessibility features
- ✅ Optimized for performance

### Breaking Changes Handled

- ✅ Removed deprecated utilities
- ✅ Updated gradient classes
- ✅ Fixed border color defaults
- ✅ Updated focus states to use `outline-hidden`
- ✅ Improved ring utilities

---

_Last updated: January 2025_
_Tailwind CSS Version: 4.1.8_
