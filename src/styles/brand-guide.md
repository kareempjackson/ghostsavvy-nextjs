# Ghost Savvy Studios - Brand Guide

## Color Palette

### Primary Colors

- **Brand Forest**: `#1A3C34` - Main brand color for text and key elements
- **Brand Sage**: `#739E82` - Accent color for interactive elements and highlights
- **Brand Black**: `#141414` - Used for dark backgrounds and contrast elements
- **Brand White**: `#FAFAFA` - Used for light backgrounds and text on dark surfaces
- **Brand Ivory**: `#F5F3EF` - Subtle background alternative to white for softer sections

### Opacity Variants

- Use opacity to create hierarchical depth:
  - Primary text: 100% opacity
  - Secondary text: 70% opacity
  - Tertiary/disabled text: 50% opacity
  - Subtle background elements: 10% opacity
  - Dividers: 10% opacity of brand-deep

## Typography

### Font Family

- **Aloevera Display**: Our exclusive brand font used throughout the entire site
  - Regular (400) - For body text and general content
  - Medium (500) - For subheadings and emphasis
  - SemiBold (600) - For important UI elements
  - Bold (700) - For primary headings and CTAs
  - Light (300) - For captions and subtle elements
  - Italic variants - For quotes and emphasis

### Text Sizes

- **Display/Hero**: 5xl-6xl (3rem - 3.75rem)
- **Section Headings**: 4xl-5xl (2.25rem - 3rem)
- **Subsection Headings**: 2xl-3xl (1.5rem - 1.875rem)
- **Card Headings**: xl-2xl (1.25rem - 1.5rem)
- **Body Text**: base-lg (1rem - 1.125rem)
- **Small Text**: sm (0.875rem)

### Text Tracking & Leading

- **Headings**: `tracking-[-0.5px]` for tighter, more elegant spacing
- **Body Text**: Default tracking
- **Heading Leading**: `leading-[1.1]` to `leading-[1.2]` for headings
- **Body Leading**: `leading-normal` for maximum readability

## Spacing System

### Section Spacing

- **Vertical Section Padding**: py-16 to py-24 (4rem - 6rem)
- **Between Major Sections**: my-16 to my-24 (4rem - 6rem)
- **Between Related Elements**: my-12 (3rem)
- **Between Cards**: gap-6 to gap-8 (1.5rem - 2rem)

### Component Spacing

- **Card Padding**: p-5 to p-8 (1.25rem - 2rem)
- **Button Padding**: px-6 py-3 (horizontal: 1.5rem, vertical: 0.75rem)
- **Input Padding**: px-4 py-2 (horizontal: 1rem, vertical: 0.5rem)

## Borders & Shadows

### Rounded Corners

- **Buttons & Inputs**: rounded-[4px] - Subtle rounding
- **Cards & Containers**: rounded-[4px] - Consistent with inputs/buttons
- **Accent Elements**: rounded-full - Used sparingly for emphasis

### Shadows

- Use shadows minimally for a clean, premium feel
- **Subtle Shadows**: shadow-xs - For cards and interactive elements
- **Focus Shadows**: For interactive elements on hover/focus

## Animation & Transitions

### Timing

- **Standard Transitions**: 300ms - For hover states and UI interactions
- **Page Transitions**: 500-700ms - For larger content blocks

### Easing Functions

- **Standard Easing**: `cubic-bezier(0.25, 0.1, 0.25, 1)` - [0.25, 0.1, 0.25, 1]
- **Entry Easing**: `cubic-bezier(0.0, 0.0, 0.2, 1)` - [0.0, 0.0, 0.2, 1]
- **Exit Easing**: `cubic-bezier(0.4, 0.0, 1, 1)` - [0.4, 0.0, 1, 1]

## Component Guidelines

### Buttons

- **Primary**: bg-brand-lime text-brand-white
- **Secondary**: bg-brand-white border border-brand-deep/10 text-brand-deep
- **Tertiary**: bg-transparent text-brand-deep underline
- **Hover States**: Subtle opacity or scale changes

### Cards

- Clean, minimal design with consistent spacing
- Optional subtle border or shadow
- Clear typographic hierarchy
- Interactive cards use subtle hover effects (scale or shadow)

### Navigation

- Clear, minimal, with adequate spacing
- Active states clearly indicated
- Mobile-friendly with appropriate touch targets

### Form Elements

- Clean, accessible design with clear labels
- Consistent padding and border-radius
- Clear focus states
- Validation feedback inline with inputs

## Responsive Design

### Breakpoints

- **sm**: 640px - Small devices like phones
- **md**: 768px - Medium devices like tablets
- **lg**: 1024px - Large devices like laptops
- **xl**: 1280px - Extra large devices like desktops
- **2xl**: 1536px - Ultra wide devices

### Grid System

- Use CSS Grid and Flexbox for layouts
- Prefer percentage-based widths or fraction-based grids
- Mobile-first approach with base styles for mobile and overrides for larger screens

## Accessibility Guidelines

- Color contrast ratios meeting WCAG AA standards (4.5:1 for normal text)
- Proper semantic HTML structure
- Focus styles clearly visible
- Text size minimum 16px for body text
- Interactive elements have appropriate hover/focus states

## Code Principles

- Use Tailwind utility classes
- Component-based architecture
- Consistent class naming convention
- Responsive design approach
- Accessibility-first mindset
