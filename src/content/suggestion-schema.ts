import { z } from 'astro/zod';
import { restaurantLinksSchema, coordinatesSchema } from './review-schema';

/**
 * Schema de sugerencias: restaurantes que nos han recomendado y todavía
 * no hemos visitado. Comparte sub-schemas con las reviews (enlaces y
 * coordenadas) pero omite todo lo que depende de haber ido (rating,
 * visitDate, precio real...).
 */
export const suggestionSchema = z.object({
	title: z.string(),
	description: z.string(),
	address: z.string(),
	locality: z.string(),
	pubDate: z.coerce.date().optional(),
	image: z.string().optional(),
	categoryArray: z.array(z.string()).optional(),
	recommendedBy: z.string().optional(),
	priority: z.boolean().default(false),
	restaurantLinks: restaurantLinksSchema.optional(),
	coordinates: coordinatesSchema.optional(),
});

export type SuggestionData = z.infer<typeof suggestionSchema>;
