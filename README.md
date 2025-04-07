# Ghost Savvy Studios Website

A premium, AI-enhanced marketing site for Ghost Savvy Studios, a high-end digital product studio specializing in UI/UX design, mobile and web application development, and subscription-based design services.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom theme
- **Animations**: Framer Motion
- **AI Features**: OpenAI API integration (for smart forms & proposal generation)
- **Content**: Sanity CMS (planned)

## Project Architecture

The project follows a modular, scalable architecture:

- `/app`: Route definitions (Next.js App Router)
- `/components`: Reusable UI components
  - `/components/ui`: Primitive components (buttons, inputs, etc.)
  - `/components/layout`: Layout-specific components (Header, Footer, etc.)
- `/sections`: Page-specific major sections
- `/lib`: Utility functions and shared logic
- `/styles`: Global styles and Tailwind configuration
- `/public`: Static assets (images, videos, fonts)
- `/types`: TypeScript type definitions

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

## Build Configuration

The project includes special configuration for production builds:

- **ESLint**: ESLint errors are ignored during production builds in `next.config.js`.
- **TypeScript**: TypeScript errors are ignored during production builds in `next.config.js`.

This ensures the application can be deployed even with minor linting or type errors. For local development, it's still recommended to fix all errors.

To run a build check:

```bash
./pre-deploy-check.sh
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
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
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
- **Sway**: Subscription design service information
- **Reach**: B2B marketing service information
- **Savvy Hub**: Content hub for articles, podcasts and case studies
- **About**: Company information and manifesto
- **Contact**: Lead generation form with AI recommendations
- **Savvy Ventures**: Tech partner for startups in exchange for equity

## Development Guidelines

- Maintain minimalist, premium aesthetic throughout the site
- Use subtle animations that enhance UX without being distracting
- Keep the AI features helpful but unobtrusive
- Ensure responsive design across all device sizes
- Optimize images and videos for performance

## License

This project is proprietary and confidential.

## Contact

For questions or inquiries, please contact info@ghostsavvystudios.com.
