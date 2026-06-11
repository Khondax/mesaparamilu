import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';
import { reviewSchema } from './review-schema';

/**
 * Schema validation tests — validate that review frontmatter
 * conforms to the expected Zod schema WITHOUT needing astro:content.
 *
 * Uses gray-matter to parse YAML frontmatter from files.
 * The schema is the shared single source of truth (review-schema.ts).
 */

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
