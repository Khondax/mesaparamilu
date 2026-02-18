/**
 * Tipos de Review derivados de la colección de contenido de Astro.
 * No mantener tipos manuales — usar siempre los inferidos del schema
 * o los proporcionados por CollectionEntry.
 */
import type { CollectionEntry } from 'astro:content';

/** Datos del frontmatter de una review (inferido de la colección) */
export type ReviewData = CollectionEntry<'reviews'>['data'];

/** Entry completa de una review (id, data, body, render, etc.) */
export type ReviewEntry = CollectionEntry<'reviews'>;
