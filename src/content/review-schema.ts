import { z } from 'astro/zod';

/** Sub-schema: ratings por dimensión (1-10) */
export const ratingSchema = z.object({
	food: z.number().min(1).max(10),
	service: z.number().min(1).max(10),
	ambiance: z.number().min(1).max(10),
	value: z.number().min(1).max(10),
});

/** Sub-schema: enlaces del restaurante */
export const restaurantLinksSchema = z.object({
	website: z.string().url().optional(),
	reservations: z.string().url().optional(),
	menu: z.string().url().optional(),
	instagram: z.string().url().optional(),
	googleMaps: z.string().url().optional(),
});

/** Sub-schema: coordenadas geográficas */
export const coordinatesSchema = z.object({
	lat: z.number().min(-90).max(90),
	lng: z.number().min(-180).max(180),
});

/** Schema principal de reviews */
export const reviewSchema = z.object({
	title: z.string(),
	description: z.string(),
	address: z.string(),
	locality: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	visitDate: z.coerce.date().optional(),
	image: z.string().optional(),
	averagePrice: z.number().positive().optional(),
	categoryArray: z.array(z.string()).optional(),
	important: z.boolean().optional(),
	favorite: z.boolean().default(false),
	trending: z.boolean().default(false),
	instagramPostId: z.string().optional(),
	rating: ratingSchema.optional(),
	restaurantLinks: restaurantLinksSchema.optional(),
	coordinates: coordinatesSchema.optional(),
	anecdote: z.string().optional(),
});

export type ReviewData = z.infer<typeof reviewSchema>;
