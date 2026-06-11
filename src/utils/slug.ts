// src/utils/slug.ts
export function categorySlug(value: string): string {
  return value
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
