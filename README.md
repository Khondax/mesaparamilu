# Recursos empleados para agentes
## Habilidades:
### Rendimiento:
- `karpathy-guidelines` (multica-ai/andrej-karpathy-skills)
### Buenas prácticas y patrones de programación:
- `nodejs-backend-patterns` (wshobson/agents)
- `nodejs-best-practices` (sickn33/antigravity-awesome-skills)
- `tailwind-css-patterns` (giuseppe-trisciuoglio/developer-kit)
- `typescript-advanced-types` (wshobson/agents)
- `vitest` (antfu/skills)
- `seo` (addyosmani/web-quality-skills)
- `deploy-to-vercel` (vercel-labs/agent-skills)
### Diseño:
- `accessibility` (addyosmani/web-quality-skills)
- `astro` (astrolicious/agent-skills)
- `frontend-design` (anthropics/skills)

## MCPs:
- `Stitch` -> Para diseño del frontal

## Herramientas:
- `Codegraph` -> Para crear una base de conocimientos indexados y reducir el uso de tokens
- `Improve` -> Para elaborar planes de mejora (Shadcn/improve)

# Tareas pendientes ✅❌
1. ✅ Retocar la landing page, poner las 10 últimas reseñas destacadas.
2. ✅ Índice con buscador y mapa. Añadir parámetros a cada reseña.
3. ✅ Mejorar estilos y "sobre nosotros", añadir info sobre nosotros pero enlazar un perfil independiente (aunque se puedan alcanzar los nuestros).
4. ✅ Integración con redes sociales.
5. ✅ Despliegue automático en Vercel/otros.
6. ✅ Añadir métricas de uso/clicks.
7. ✅ Cambiar el nombre de MesaParaMilu? quizá algo más pegadizo?... algo más corto en general es mejor.... ¡¡ARS CULINARIA!! ("arte culinario" o "gastronomía") Variante: Ignis Culinaria ("el fuego de la cocina" o "fuego culinario")
8. ✅1/2 Crear una estructura de .md, tipo plantilla, con buenas prácticas y código insertable (para imágenes), sobre la que crear cada reseña de un restaurante. Sobre como rellenar los metadatos, introducción al restaurante, hablar del local, cada plato, servicio, etc etc.
9. ✅1/2 Currar en la interfaz (Stitch?), es un proyecto 100% frontend, no necesita lógica prácticamente, pero si cosas bonitas, transiciones...
10. ✅ Mejorar el filtrado de restaurantes y añadir más categorías (montar categorías dinámicas? así cada vez que se añade una al listado general los restaurantes que la contengan con referenciables).
11. ❌ IDEAS NUEVAS:
	- Firmar las reseñas por autor? (M, L o ArsCulinaria para firmar reseñas que hemos ido sin el otro, con amigos o familia, o en conjunto).
	- Enlace a NUESTRA publicación en Instagram.
	- Posible carrusel de fotos para las sobrantes de la reseña (fotos del local, vinos si no tienen mención especial, alguna nuestra, etc.)
	- Añadir una sección de futuras visitas? Recomendaciones que nos han hecho y queremos ir?
12. ❌ .
13. ❌ Poner ArsCulinaria en marcha.


FUTUROS PASOS:
Para desplegar:
Conecta el repo en vercel.com → Import Project
Cambia site: 'https://example.com' en astro.config.mjs por tu dominio real
(Opcional) Configura INSTAGRAM_ACCESS_TOKEN en Vercel → Settings → Environment Variables
(Opcional) Crea cuenta en Buttondown y verifica el username en Newsletter.astro

---

### Ideas ampliadas para la web

1. Filtros avanzados: buscar por tipo de cocina, rango de precio, ubicación o ambiente.
2. Mapa interactivo: mostrar todos los restaurantes reseñados con pins y acceso directo a cada reseña.
3. Sección de “Favoritos” (designados manualmente) y “Más visitados/Tendencia”:
	 - Favoritos: campo `favorite: true` en el frontmatter del MDX.
	 - Tendencia: se puede marcar manualmente (`trending: true`) o automáticamente si el post de Instagram asociado supera 1000 visualizaciones.
	 - Para automatización, cada reseña puede tener un campo `instagramPostId` en el frontmatter.
	 - Ejemplo de frontmatter:
		 ```mdx
		 ---
		 title: "Restaurante Ejemplo"
		 favorite: true
		 instagramPostId: "12345678901234567"
		 ---
		 ```
	 - En la web, una función serverless consulta la API de Instagram y muestra la insignia “Tendencia” si corresponde.
	 - Ejemplo de integración en Astro:
		 ```astro
		 ---
		 // CardReview.astro
		 const { instagramPostId } = Astro.props;
		 const [views, setViews] = Astro.useState(0);
		 const [isTrending, setIsTrending] = Astro.useState(false);

		 Astro.useEffect(async () => {
			 if (instagramPostId) {
				 const res = await fetch(`/api/instagram-views?postId=${instagramPostId}`);
				 const data = await res.json();
				 setViews(data.impressions);
				 setIsTrending(data.impressions > 1000);
			 }
		 }, []);
		 ---
		 <article>
			 {/* ...otros datos... */}
			 {isTrending && <span class="badge">Tendencia</span>}
			 <p>Visualizaciones en Instagram: {views}</p>
		 </article>
		 ```
4. Valoraciones visuales: iconos o gráficos para comida, servicio, ambiente y calidad-precio.
5. Reseñas solo del autor: todas las reseñas se crean en MDX, no se permite envío de reseñas por lectores.
6. Integración con Instagram Stories: embeber historias o reels destacados.
7. Enlaces rápidos: acceso a web, reservas, carta online o redes sociales del restaurante.
8. Sugerencias aleatorias: botón “sorpréndeme” que muestra una reseña al azar.
		- El botón permite primero elegir una localidad (por ejemplo, mediante un select con todas las localidades disponibles extraídas de los MDX).
		- Al seleccionar una localidad, se filtran las reseñas por el campo `locality` y se elige una al azar entre las de esa zona.
		- Ejemplo de flujo:
			1. El usuario pulsa “sorpréndeme”.
			2. Se muestra un desplegable con las localidades disponibles.
			3. Al elegir una, se selecciona aleatoriamente una reseña de esa localidad y se muestra o redirige a su página.
		- Ejemplo de código (Astro + JS):
			```astro
			---
			import { getCollection } from 'astro:content';
			const reviews = await getCollection('reviews');
			const localidades = [...new Set(reviews.map(r => r.data.locality))];
			---
			<select id="locality-select">
				<option value="">Elige una localidad</option>
				{localidades.map(loc => <option value={loc}>{loc}</option>)}
			</select>
			<button id="sorprendeme">Sorpréndeme</button>
			<script type="module">
				const reviews = JSON.parse('{JSON.stringify(reviews)}');
				document.getElementById('sorprendeme').onclick = () => {
					const loc = document.getElementById('locality-select').value;
					if (!loc) return alert('Selecciona una localidad');
					const filtradas = reviews.filter(r => r.data.locality === loc);
					if (!filtradas.length) return alert('No hay reseñas en esa localidad');
					const random = filtradas[Math.floor(Math.random() * filtradas.length)];
					window.location.href = `/reviews/${random.slug}/`;
				};
			</script>
			```
		- Así el usuario puede descubrir restaurantes cercanos de forma divertida y personalizada.
9. Sección de anécdotas: curiosidades o experiencias divertidas en los restaurantes.
10. Newsletter: opción para recibir novedades o mejores reseñas por email.
	 - Puedes implementar un formulario simple para que los usuarios dejen su email (por ejemplo, usando un servicio externo como Mailchimp, Buttondown, Brevo, TinyLetter, etc.).
	 - El formulario solo necesita enviar el email a la plataforma elegida, sin almacenar datos en tu web.
	 - Ejemplo de integración con Mailchimp (HTML):
		 ```html
		 <form action="https://tulista.usX.list-manage.com/subscribe/post?u=XXXX&amp;id=YYYY" method="post" target="_blank" novalidate>
			 <input type="email" name="EMAIL" placeholder="Tu email" required />
			 <button type="submit">Suscribirse</button>
		 </form>
		 ```
	 - Puedes personalizar el diseño y el mensaje de confirmación.
	 - Ventajas: no necesitas backend propio, cumples RGPD y puedes gestionar campañas fácilmente desde la plataforma elegida.
11. Accesibilidad: contraste, textos alternativos, navegación sencilla.
12. Modo oscuro/claro: cambio de tema visual según preferencia del usuario.


## 🚀 Estructura del proyecto

Dentro del proyecto de Astro se encuentran las siguientes carpetas y ficheros:

```text
├── public/
│   └── fonts/
├── src/
│   ├── components/       # BaseHead, Header, Footer, CardReview, Newsletter, ShareButtons, ThemeToggle, InstagramEmbed…
│   ├── content/
│   │   ├── recipes/      # Colección de recetas (Markdown)
│   │   └── reviews/      # Colección de reseñas (MDX)
│   ├── layouts/          # ReviewPost.astro
│   ├── pages/
│   │   ├── api/          # Endpoints serverless (Instagram views)
│   │   ├── recipes/      # Listado + detalle de recetas
│   │   ├── reviews/      # Listado + detalle de reseñas
│   │   ├── buscar.astro  # Buscador con filtros + mapa + sorpréndeme
│   │   └── index.astro   # Landing page
│   ├── styles/           # global.css (temas claro/oscuro)
│   └── types/            # Tipos TypeScript
├── .env.example          # Variables de entorno documentadas
├── .github/workflows/    # CI (build + test + type-check)
├── astro.config.mjs
├── vitest.config.ts
├── package.json
└── tsconfig.json
```

Astro busca los ficheros `.astro` o `.md` en `src/pages/`. Cada página se expone como una ruta en función de su nombre de fichero.

En la carpeta `src/components/` se cargarán los diferentes componentes como `header`, `footer` o las tarjetas (de Astro) como `CardReview`, pero admite cualquier componente de Astro/React/Vue/Svelte/Preact.

El directorio `src/content/` contiene "colecciones" de documentos Markdown y MDX. Usa `getCollection()` para obtener los posts de `src/content/reviews/`. Recuerda verificar el esquema y lo ideal es usar un tipado fuerte. Aquí la documentación [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/).

Cualquier asset estático, como imágenes, puede guardarse en el directorio `public/`.


## 🧞 Comandos

Todos los comandos se ejecutan desde la raiz del proyecto, en una terminal indica:
All commands are run from the root of the project, from a terminal:

| Command                   | Action                                                       |
| :------------------------ | :----------------------------------------------------------- |
| `npm install`             | Instala dependencias                                         |
| `npm run dev`             | Inicia el servidor local de desarrollo en `localhost:4321`   |
| `npm run build`           | Compila la versión de producción en `./dist/`                |
| `npm run preview`         | Vista previa de tu build, antes del despliegue               |
| `npm run test`            | Ejecuta tests en modo watch (Vitest)                         |
| `npm run test:run`        | Ejecuta tests una sola vez                                   |
| `npm run test:coverage`   | Tests con reporte de cobertura                               |
| `npm run check`           | Type-check con `astro check`                                 |
| `npm run astro ...`       | Ejecuta comandos de Astro como `astro add...`, `astro check` |


## Créditos

De momento esta web se basa parcialmente en el tema por defecto de Astro, [Bear Blog](https://github.com/HermanMartinus/bearblog/). En posteriores revisiones modificaremos el estilo para hacerlo propio.