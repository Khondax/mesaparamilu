import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
	// Load Markdown and MDX files in the `src/content/reviews/` directory.
	loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		visitDate: z.coerce.date().optional(),
		image: z.string().optional(),
		averagePrice: z.number().optional(),
		categoryArray: z.array(z.string()).optional(),
		important: z.boolean().optional(),
	}),
});

const recipes = defineCollection({
	// Load Markdown and MDX files in the `src/content/recipes/` directory.
	loader: glob({ base: './src/content/recipes', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		image: z.string().optional(),
	}),
});

export const collections = { reviews, recipes };