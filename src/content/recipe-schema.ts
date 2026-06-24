import { z } from 'astro/zod';

/**
 * Schema de recetas: recetas que hemos recopilado.
 */
export const recipeSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	image: z.string().optional(),
});

export type RecipeData = z.infer<typeof recipeSchema>;
