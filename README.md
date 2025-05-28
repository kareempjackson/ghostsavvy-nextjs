# Ghost Savvy Studios Website

A premium, AI-enhanced marketing site for Ghost Savvy Studios, a high-end digital product studio specializing in UI/UX design, mobile and web application development, and subscription-based design services.

## ✨ Recent Updates

- **🚀 Upgraded to Tailwind CSS v4.1.8** - Faster builds, modern CSS features, and improved performance
- **🎨 Enhanced Reskin System** - Easy color scheme customization with CSS variables
- **📁 Cleaned Project Structure** - Organized scripts and documentation
- **♿ Improved Accessibility** - Better focus states and touch targets
- **⚡ Performance Optimized** - 3.5x faster builds with Tailwind v4

## Tech Stack

- **Framework**: Next.js 15.2.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1.8 with CSS variables
- **Animations**: Framer Motion
- **Content Management**: Sanity CMS
- **AI Features**: OpenAI API integration (for smart forms & proposal generation)
- **Build Tool**: PostCSS with @tailwindcss/postcss

## Project Architecture

The project follows a modular, scalable architecture:

- `/src/app`: Route definitions (Next.js App Router)
- `/src/components`: Reusable UI components
  - `/src/components/ui`: Primitive components (buttons, inputs, etc.)
  - `/src/components/layout`: Layout-specific components (Header, Footer, etc.)
- `/src/sections`: Page-specific major sections
- `/src/lib`: Utility functions and shared logic
- `/src/sanity`: Sanity CMS configuration and schemas
- `/src/types`: TypeScript type definitions
- `/scripts`: Utility scripts and automation tools
- `/docs`: Documentation and brand guidelines
- `/public`: Static assets (images, videos, fonts)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/ghostsavvystudios.git

# Navigate to the project directory
cd ghostsavvystudios

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🎨 Reskin Guide

The project now supports easy reskinning through CSS variables. To customize the design:

### Quick Color Change

1. Open `src/app/globals.css`
2. Find the `@theme` block
3. Update the color variables:

```css
@theme {
  --color-brand-deep: #your-color;
  --color-brand-indigo: #your-color;
  --color-brand-lime: #your-color;
  --color-brand-ivory: #your-color;
  --color-brand-black: #your-color;
  --color-brand-white: #your-color;
}
```

### Pre-made Themes

Check `docs/reskin-template.css` for 8 pre-made color schemes:

- Ocean Breeze
- Sunset Glow
- Forest Depths
- Purple Haze
- Monochrome Elegance
- Rose Gold
- Tech Blue
- Warm Earth

### Advanced Customization

- **Typography**: Update font variables in the `@theme` block
- **Spacing**: Modify custom spacing variables
- **Animations**: Adjust animation timing and easing
- **Components**: Update utility components like buttons and cards

See `docs/brand-guide.md` for complete customization instructions.

## Build Configuration

The project includes special configuration for production builds:

- **ESLint**: ESLint errors are ignored during production builds in `next.config.js`
- **TypeScript**: TypeScript errors are ignored during production builds in `next.config.js`
- **Tailwind v4**: Optimized CSS generation with automatic content detection

This ensures the application can be deployed even with minor linting or type errors. For local development, it's still recommended to fix all errors.

To run a build check:

```bash
./scripts/pre-deploy-check.sh
```

## Deployment on Vercel

This project is configured for seamless deployment on Vercel. Follow these steps to deploy:

### Option 1: Using the Vercel CLI

```bash
# Install Vercel CLI globally if not already installed
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview environment
vercel

# Deploy to production
vercel --prod
```

### Option 2: Using the deployment script

We've included a convenient deployment script:

```bash
# Make the script executable (first time only)
chmod +x scripts/deploy.sh

# Run the deployment script
./scripts/deploy.sh
```

### Option 3: GitHub Integration

1. Push your code to GitHub
2. Import the project in the [Vercel Dashboard](https://vercel.com/import)
3. Connect your GitHub repository
4. Configure the deployment settings if needed
5. Deploy

### Environment Variables

Make sure to set up the following environment variables in your Vercel project:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Your Sanity dataset name
- `SANITY_API_TOKEN`: Secret API token for Sanity
- `NEXT_PUBLIC_SITE_URL`: Your production URL

## Key Pages

- **Home**: Full-screen hero with background video, services overview, selected work
- **Savvy Impact**: Showcase of work and services with case studies
- **Savvy Services**: Service offerings and capabilities
- **Savvy Lab**: Innovation and experimental projects
- **Savvy Hub**: Content hub for articles, podcasts and case studies
- **Savvy Ventures**: Tech partner for startups in exchange for equity
- **About**: Company information and manifesto
- **Contact**: Lead generation form with AI recommendations

## 🛠 Development Guidelines

### Design System

- Use the predefined utility components (`btn-primary`, `ghost-card`, etc.)
- Follow the typography hierarchy defined in the CSS
- Maintain consistent spacing using the custom spacing variables
- Use brand colors through CSS variables for easy theming

### Performance

- Leverage Tailwind v4's improved build performance
- Use dynamic utilities instead of arbitrary values when possible
- Optimize images and videos for performance
- Test on multiple devices and screen sizes

### Accessibility

- All interactive elements include proper focus states
- Touch targets meet minimum 44px requirement on mobile
- Use semantic HTML elements
- Include proper ARIA labels where needed

### Code Quality

- Use TypeScript for type safety
- Follow the established component architecture
- Keep components small and focused
- Write meaningful commit messages

## 📚 Documentation

- `docs/brand-guide.md` - Complete brand and design system guide
- `docs/reskin-template.css` - Pre-made color schemes for easy reskinning
- `scripts/README.md` - Information about utility scripts

## 🚀 Performance Benefits (Tailwind v4)

- **3.5x faster full builds**
- **8x faster incremental builds with new CSS**
- **100x+ faster incremental builds with no new CSS**
- **Smaller CSS output** - Only includes used styles
- **Modern CSS features** - Container queries, 3D transforms, advanced gradients

## License

This project is proprietary and confidential.

## Contact

For questions or inquiries, please contact info@ghostsavvystudios.com.
