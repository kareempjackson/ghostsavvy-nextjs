# Mock Data Implementation

This project has been migrated from using Sanity CMS to using local mock data for faster development and prototype testing.

## Structure

- `src/data/` - Contains mock data files
  - `projectData.ts` - Mock project data for the Impact section
  - `hubContentData.ts` - Mock hub content data
- `src/lib/` - Contains utility functions
  - `mockClient.ts` - Provides a mock implementation of the Sanity client
  - `mockEnv.ts` - Mock environment variables

## How to Use Mock Data

1. Import the mock client instead of the Sanity client:

```typescript
import { client, formatDate } from "@/lib/mockClient";
```

2. Use the client to fetch data using the same query format as Sanity:

```typescript
const data = await client.fetch(`*[_type == "project"]`);
```

3. Access image URLs directly as strings (no need for urlFor transformations):

```typescript
<Image
  src={project.image}
  alt={project.title}
  fill
  className="object-cover"
/>
```

## Adding More Mock Data

To add more mock data, simply update the arrays in:

- `src/data/projectData.ts` for projects
- `src/data/hubContentData.ts` for content

Example format for a project:

```typescript
{
  id: "unique-id",
  title: "Project Title",
  hook: "Short tagline",
  description: "Longer description of the project",
  tags: ["Tag1", "Tag2", "Tag3"],
  image: "/images/projects/project-image.jpg",
  link: "/projects/unique-id"
}
```

## Migrating Back to Sanity

If you want to reinstate Sanity:

1. Reinstall Sanity dependencies:

```
npm install @sanity/client @sanity/image-url next-sanity sanity
```

2. Update import statements to use the actual Sanity client:

```typescript
import { client, urlFor, formatDate } from "@/sanity/lib/client";
```

3. Update the image references to use urlFor:

```typescript
<Image
  src={urlFor(project.image).url()}
  alt={project.title}
  fill
  className="object-cover"
/>
```
