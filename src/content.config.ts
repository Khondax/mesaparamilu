import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { reviewSchema } from './content/review-schema';
import { suggestionSchema } from './content/suggestion-schema';
import { recipeSchema } from './content/recipe-schema';

/** Tipo inferido del schema para usar en componentes */
export type { ReviewData } from './content/review-schema';
export type { SuggestionData } from './content/suggestion-schema';
export type { RecipeData } from './content/recipe-schema';

const reviews = defineCollection({
	// Load Markdown and MDX files in the `src/content/reviews/` directory.
	loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
	schema: reviewSchema,
});

const suggestions = defineCollection({
	// Load Markdown and MDX files in the `src/content/suggestions/` directory.
	loader: glob({ base: './src/content/suggestions', pattern: '**/*.{md,mdx}' }),
	schema: suggestionSchema,
});

const recipes = defineCollection({
	// Load Markdown and MDX files in the `src/content/recipes/` directory.
	loader: glob({ base: './src/content/recipes', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: recipeSchema,
});

export const collections = { reviews, recipes, suggestions };