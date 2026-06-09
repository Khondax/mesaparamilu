import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';
import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';

/**
 * Schema validation tests — validate that review frontmatter
 * conforms to the expected Zod schema WITHOUT needing astro:content.
 *
 * Uses gray-matter to parse YAML frontmatter from files.
 */

// Replicate the review schema (mirrors content.config.ts)
const ratingSchema = z.object({
	food: z.number().min(1).max(10),
	service: z.number().min(1).max(10),
	ambiance: z.number().min(1).max(10),
	value: z.number().min(1).max(10),
});

const coordinatesSchema = z.object({
	lat: z.number().min(-90).max(90),
	lng: z.number().min(-180).max(180),
});

const reviewSchema = z.object({
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
	restaurantLinks: z.object({
		website: z.string().url().optional(),
		reservations: z.string().url().optional(),
		menu: z.string().url().optional(),
		instagram: z.string().url().optional(),
		googleMaps: z.string().url().optional(),
	}).optional(),
	coordinates: coordinatesSchema.optional(),
	anecdote: z.string().optional(),
});

// Load all review files
const reviewsDir = path.resolve(__dirname, 'reviews');
const reviewFiles = fs.readdirSync(reviewsDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

describe('Reviews Collection Schema', () => {
	it('hay archivos de review', () => {
		expect(reviewFiles.length).toBeGreaterThan(0);
	});

	for (const file of reviewFiles) {
		describe(file, () => {
			const content = fs.readFileSync(path.join(reviewsDir, file), 'utf-8');
			const { data: frontmatter } = matter(content);

			it('tiene campos requeridos válidos', () => {
				expect(frontmatter.title).toBeDefined();
				expect(typeof frontmatter.title).toBe('string');
				expect(frontmatter.description).toBeDefined();
				expect(frontmatter.address).toBeDefined();
				expect(frontmatter.locality).toBeDefined();
				expect(frontmatter.pubDate).toBeDefined();
			});

			it('pasa validación de schema Zod', () => {
				const result = reviewSchema.safeParse(frontmatter);
				if (!result.success) {
					const errors = result.error.issues.map(
						(i) => `${i.path.join('.')}: ${i.message}`
					);
					expect.fail(`Schema validation failed:\n${errors.join('\n')}`);
				}
			});

			it('rating tiene valores en rango 1-10 si existe', () => {
				if (frontmatter.rating && typeof frontmatter.rating === 'object') {
					const rating = frontmatter.rating as Record<string, number>;
					for (const [key, val] of Object.entries(rating)) {
						expect(val, `rating.${key}`).toBeGreaterThanOrEqual(1);
						expect(val, `rating.${key}`).toBeLessThanOrEqual(10);
					}
				}
			});

			it('coordinates tiene lat/lng válidos si existe', () => {
				if (frontmatter.coordinates && typeof frontmatter.coordinates === 'object') {
					const coords = frontmatter.coordinates as { lat: number; lng: number };
					expect(coords.lat).toBeGreaterThanOrEqual(-90);
					expect(coords.lat).toBeLessThanOrEqual(90);
					expect(coords.lng).toBeGreaterThanOrEqual(-180);
					expect(coords.lng).toBeLessThanOrEqual(180);
				}
			});
		});
	}
});
