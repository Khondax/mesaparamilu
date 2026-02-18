/**
 * API endpoint: /api/instagram-views
 *
 * Queries the Instagram Graph API for a post's impressions/views.
 * Returns { impressions, isTrending } for client-side consumption.
 *
 * Required env vars (set in Vercel dashboard):
 *   INSTAGRAM_ACCESS_TOKEN — Long-lived Instagram Graph API token
 *   INSTAGRAM_TRENDING_THRESHOLD — (optional) impressions threshold, default 1000
 *
 * Usage:
 *   GET /api/instagram-views?postId=12345678901234567
 *
 * When INSTAGRAM_ACCESS_TOKEN is not set, returns a graceful fallback
 * so the site works without Instagram integration.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms
const cache = new Map<string, { impressions: number; timestamp: number }>();

export const GET: APIRoute = async ({ url }) => {
	const postId = url.searchParams.get('postId');

	if (!postId) {
		return new Response(
			JSON.stringify({ error: 'Missing postId parameter' }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } },
		);
	}

	const token = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
	const threshold = Number(import.meta.env.INSTAGRAM_TRENDING_THRESHOLD) || 1000;

	// Graceful fallback when Instagram is not configured
	if (!token) {
		return new Response(
			JSON.stringify({
				impressions: 0,
				isTrending: false,
				configured: false,
				message: 'Instagram API not configured. Set INSTAGRAM_ACCESS_TOKEN env var.',
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'public, max-age=3600',
				},
			},
		);
	}

	// Check in-memory cache
	const cached = cache.get(postId);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return new Response(
			JSON.stringify({
				impressions: cached.impressions,
				isTrending: cached.impressions >= threshold,
				configured: true,
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'public, max-age=3600',
				},
			},
		);
	}

	try {
		// Instagram Graph API — get media insights
		// https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-media/insights
		const apiUrl = `https://graph.instagram.com/${postId}/insights?metric=impressions&access_token=${token}`;
		const response = await fetch(apiUrl);

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			console.error('[instagram-views] API error:', response.status, errorData);

			return new Response(
				JSON.stringify({
					impressions: 0,
					isTrending: false,
					configured: true,
					error: `Instagram API returned ${response.status}`,
				}),
				{
					status: 200, // Return 200 to avoid breaking the frontend
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}

		const data = await response.json();
		const impressions = data?.data?.[0]?.values?.[0]?.value ?? 0;

		// Update cache
		cache.set(postId, { impressions, timestamp: Date.now() });

		return new Response(
			JSON.stringify({
				impressions,
				isTrending: impressions >= threshold,
				configured: true,
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'public, max-age=3600',
				},
			},
		);
	} catch (err) {
		console.error('[instagram-views] Fetch error:', err);
		return new Response(
			JSON.stringify({
				impressions: 0,
				isTrending: false,
				configured: true,
				error: 'Failed to fetch Instagram data',
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}
};
