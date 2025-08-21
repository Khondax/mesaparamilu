# Tareas pendientes ✅❌
- ✅❌ Retocar la landing page, poner las 10 últimas reseñas destacadas?
- ❌ Índice con buscador y mapa? Añadir parámetros a cada reseña
- ❌ Mejorar estilos y "sobre nosotros", añadir info sobre nosotros pero yo no se si quiero mi perfil
      en redes (aunque se pueda alcanzar)
- ❌ Integración con redes sociales?
- ❌ Despliegue automático en vercel/otros? con github actions
- ❌ Añadir métricas de uso/clicks


## 🚀 Estructura del proyecto

Dentro del proyecto de Astro se encuentran las siguientes carpetas y ficheros:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
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
| `npm run astro ...`       | Ejecuta comandos de Astro como `astro add...`, `astro check` |
| `npm run astro -- --help` | Obtiene ayuda de los comandos de Astro                       |


## Créditos

De momento esta web se basa parcialmente en el tema por defecto de Astro, [Bear Blog](https://github.com/HermanMartinus/bearblog/). En posteriores revisiones modificaremos el estilo para hacerlo propio.