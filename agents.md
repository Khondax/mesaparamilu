# Reglas de Desarrollo para Astro

Este documento contiene las directrices, buenas prácticas y estándares de testing para el desarrollo en este proyecto Astro.

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables (.astro)
├── content/        # Colecciones de contenido (Markdown/MDX)
├── layouts/        # Layouts base para páginas
├── pages/          # Rutas del sitio (file-based routing)
├── styles/         # Estilos globales
└── types/          # Tipos TypeScript
public/             # Assets estáticos (fuentes, imágenes)
```

---

## Buenas Prácticas de Desarrollo

### 1. Componentes Astro

- **Separación de responsabilidades**: Mantén la lógica en el frontmatter (`---`) y el markup en el template.
- **Props tipadas**: Siempre define las props con TypeScript.

```astro
---
interface Props {
  title: string;
  description?: string;
  date: Date;
}

const { title, description, date } = Astro.props;
---

<article>
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</article>
```

- **Nombrado**: Usa PascalCase para componentes (`CardReview.astro`, `BaseHead.astro`).
- **Slots**: Utiliza slots para composición flexible.

```astro
---
// Layout.astro
---
<html>
  <body>
    <slot name="header" />
    <main>
      <slot />
    </main>
    <slot name="footer" />
  </body>
</html>
```

### 2. Content Collections

- **Schemas validados**: Define schemas con Zod en `content.config.ts` para validar el frontmatter.
- **Organización**: Agrupa contenido relacionado en colecciones separadas (`recipes/`, `reviews/`).
- **Frontmatter consistente**: Mantén estructura uniforme en todos los archivos de una colección.

```typescript
// content.config.ts
import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    rating: z.number().min(1).max(5),
    heroImage: z.string().optional(),
  }),
});
```

### 3. Páginas y Rutas

- **Rutas dinámicas**: Usa `[...slug].astro` para rutas con parámetros.
- **getStaticPaths**: Siempre retorna `params` y `props` para rutas dinámicas.

```astro
---
export async function getStaticPaths() {
  const posts = await getCollection('reviews');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}
---
```

- **Prefetch**: Usa `data-astro-prefetch` para mejorar la navegación.

### 4. Estilos

- **Scoped styles**: Los estilos en componentes Astro son scoped por defecto.
- **Variables CSS**: Define variables globales en `styles/global.css`.
- **Mobile-first**: Diseña primero para móvil, luego escala.

```astro
<style>
  /* Scoped al componente */
  .card {
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
  }
</style>
```

### 5. Performance

- **Imágenes optimizadas**: Usa el componente `<Image />` de `astro:assets`.
- **Carga diferida**: Aplica `loading="lazy"` a imágenes below-the-fold.
- **Islands Architecture**: Hidrata solo los componentes interactivos necesarios.

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image src={heroImage} alt="Hero" loading="eager" />
```

### 6. SEO y Accesibilidad

- **Meta tags**: Incluye siempre `title`, `description`, y Open Graph tags.
- **Semántica HTML**: Usa elementos semánticos (`<article>`, `<nav>`, `<main>`).
- **Alt text**: Todas las imágenes deben tener texto alternativo descriptivo.
- **Heading hierarchy**: Mantén jerarquía lógica de headings (h1 → h2 → h3).

### 7. TypeScript

- **Strict mode**: Mantén `strict: true` en `tsconfig.json`.
- **Tipos explícitos**: Define interfaces para props y datos.
- **Evita `any`**: Usa tipos específicos o `unknown` si es necesario.

```typescript
// types/review.ts
export interface Review {
  id: string;
  title: string;
  rating: number;
  content: string;
  publishedAt: Date;
}
```

---

## Testing

### Configuración de Vitest

Instala las dependencias necesarias:

```bash
npm install -D vitest @testing-library/dom happy-dom
```

Configura Vitest en `vitest.config.ts`:

```typescript
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'happy-dom',
  },
});
```

Añade el script en `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Tests Unitarios

Testea funciones de utilidad y lógica de negocio:

```typescript
// src/utils/formatDate.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formatea fecha correctamente', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('15 de enero de 2024');
  });

  it('maneja fechas inválidas', () => {
    expect(() => formatDate(null)).toThrow();
  });
});
```

### Tests de Content Collections

Valida que el contenido cumple con los schemas:

```typescript
// src/content/reviews.test.ts
import { describe, it, expect } from 'vitest';
import { getCollection } from 'astro:content';

describe('Reviews Collection', () => {
  it('todas las reviews tienen campos requeridos', async () => {
    const reviews = await getCollection('reviews');
    
    reviews.forEach((review) => {
      expect(review.data.title).toBeDefined();
      expect(review.data.pubDate).toBeInstanceOf(Date);
    });
  });

  it('ratings están en rango válido', async () => {
    const reviews = await getCollection('reviews');
    
    reviews.forEach((review) => {
      if (review.data.rating) {
        expect(review.data.rating).toBeGreaterThanOrEqual(1);
        expect(review.data.rating).toBeLessThanOrEqual(5);
      }
    });
  });
});
```

### Tests E2E con Playwright

Instala Playwright:

```bash
npm install -D @playwright/test
npx playwright install
```

Configura `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  webServer: {
    command: 'npm run preview',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4321',
  },
});
```

Ejemplo de test E2E:

```typescript
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navegación', () => {
  test('página principal carga correctamente', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Mesa para Milu/);
  });

  test('navega a reviews', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Reviews');
    await expect(page).toHaveURL('/reviews/');
  });

  test('review individual muestra contenido', async ({ page }) => {
    await page.goto('/reviews/');
    await page.click('article a >> nth=0');
    await expect(page.locator('article h1')).toBeVisible();
  });
});
```

### Tests de Accesibilidad

```typescript
// e2e/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accesibilidad', () => {
  test('página principal sin violaciones críticas', async ({ page }) => {
    await page.goto('/');
    
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    expect(results.violations).toEqual([]);
  });
});
```

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev           # Servidor de desarrollo
npm run build         # Build de producción
npm run preview       # Preview del build

# Testing
npm run test          # Tests en modo watch
npm run test:run      # Tests una sola vez
npm run test:coverage # Tests con cobertura

# Linting
npm run lint          # Ejecutar ESLint
npm run format        # Formatear con Prettier
```

---

## Checklist Pre-Commit

- [ ] Todos los tests pasan
- [ ] Sin errores de TypeScript
- [ ] Código formateado (Prettier)
- [ ] Sin warnings de ESLint
- [ ] Imágenes optimizadas
- [ ] Meta tags actualizados
- [ ] Accesibilidad verificada
- [ ] Responsive design probado

---

## Recursos

- [Documentación oficial de Astro](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
