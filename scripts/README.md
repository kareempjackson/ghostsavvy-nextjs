# Ghost Savvy Studios Scripts

This directory contains utility scripts for the Ghost Savvy Studios website.

## Sanity CMS Seeding Script

The `seed-sanity.js` script allows you to programmatically seed your Sanity CMS with initial content for development and testing purposes.

### Prerequisites

- Node.js 16.x or higher
- `@sanity/client` package (already included in project dependencies)
- A Sanity API token with write permissions

### Getting a Sanity Token

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage) and select your project
2. Navigate to API > Tokens
3. Click "Add API token"
4. Give it a descriptive name (e.g., "Content Seeding")
5. Select "Editor" or "Write" permissions
6. Set an appropriate token expiration based on your needs
7. Copy the generated token

### Usage

1. Set the Sanity token as an environment variable:

```bash
# For Unix/Linux/macOS
export SANITY_TOKEN=your_token_here

# For Windows (Command Prompt)
set SANITY_TOKEN=your_token_here

# For Windows (PowerShell)
$env:SANITY_TOKEN="your_token_here"
```

2. Run the seeding script:

```bash
npm run seed-sanity
```

### What Gets Created

The script will create sample content for:

- Team Members (3 profiles)
- Blog Posts (2 articles)
- Podcast Episodes (2 episodes)
- Case Studies (1 case study)
- Events (1 upcoming webinar)
- Hub Content (2 pieces of content)

### Customization

You can modify the `seed-sanity.js` script to adjust the sample content or add more content types as needed:

- Edit the generator functions (e.g., `generateTeamMembers()`) to change the sample data
- Create new generator functions for additional content types
- Modify the `seedSanity()` function to control which content types get seeded

### Handling Images

The current implementation uses a placeholder reference for images. In a production environment, you would want to:

1. Upload actual image assets first
2. Reference those uploaded assets in your content

### Warning

Be careful running this script on production datasets as it will create real content. It's recommended to use a development or test dataset.
