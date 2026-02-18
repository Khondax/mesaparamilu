import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

/** Sub-schema: ratings por dimensión (1-5) */
const ratingSchema = z.object({
	food: z.number().min(1).max(5),
	service: z.number().min(1).max(5),
	ambiance: z.number().min(1).max(5),
	value: z.number().min(1).max(5),
}).optional();

/** Sub-schema: enlaces del restaurante */
const restaurantLinksSchema = z.object({
	website: z.string().url().optional(),
	reservations: z.string().url().optional(),
	menu: z.string().url().optional(),
	instagram: z.string().url().optional(),
	googleMaps: z.string().url().optional(),
}).optional();

/** Sub-schema: coordenadas geográficas */
const coordinatesSchema = z.object({
	lat: z.number(),
	lng: z.number(),
}).optional();

/** Schema principal de reviews */
const reviewSchema = z.object({
	title: z.string(),
	description: z.string(),
	address: z.string(),
	locality: z.string(),
	// Transform string to Date object
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	visitDate: z.coerce.date().optional(),
	image: z.string().optional(),
	averagePrice: z.number().optional(),
	categoryArray: z.array(z.string()).optional(),
	important: z.boolean().optional(),
	// Nuevos campos — Fase 0
	favorite: z.boolean().default(false),
	trending: z.boolean().default(false),
	instagramPostId: z.string().optional(),
	rating: ratingSchema,
	restaurantLinks: restaurantLinksSchema,
	coordinates: coordinatesSchema,
	anecdote: z.string().optional(),
});

/** Tipo inferido del schema para usar en componentes */
export type ReviewData = z.infer<typeof reviewSchema>;

const reviews = defineCollection({
	// Load Markdown and MDX files in the `src/content/reviews/` directory.
	loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
	schema: reviewSchema,
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