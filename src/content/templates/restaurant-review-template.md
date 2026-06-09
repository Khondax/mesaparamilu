# Plantilla de reseña de restaurante

Usa esta plantilla como base para crear nuevas reseñas. La idea es copiar este archivo, pegarlo dentro de `src/content/reviews/` con un nombre de slug limpio, por ejemplo `nombre-del-restaurante.mdx`, y después completar cada bloque.

## Buenas prácticas rápidas

- Escribe el archivo final en `.mdx` si vas a insertar imágenes, embeds o bloques HTML/MDX.
- Mantén `title`, `description`, `address`, `locality` y `pubDate` siempre informados.
- Usa `visitDate` para reflejar cuándo fuiste realmente al restaurante.
- La `description` debe resumir el restaurante en una frase breve y útil para SEO.
- `image` debe apuntar a la imagen principal o hero de la reseña.
- `categoryArray` debe incluir etiquetas cortas y consistentes, por ejemplo `['brasa', 'producto', 'tradicional']`.
- Las puntuaciones en `rating` deben estar entre `1` y `10`.
- Añade imágenes con `alt` descriptivo, evitando textos genéricos como "foto 1".
- Organiza la reseña por secciones para facilitar la lectura.

## Estructura recomendada

```md
---
title: 'Nombre del restaurante'
description: 'Resumen breve del restaurante, su cocina y el motivo por el que merece la visita.'
address: 'Calle y número'
locality: 'Ciudad o zona'
pubDate: 'Jun 09 2026'
updatedDate: 'Jun 10 2026'
visitDate: 'Jun 01 2026'
image: '/images/reviews/nombre-restaurante/hero.jpg'
averagePrice: 55
categoryArray: ['autor', 'producto', 'degustación']
important: true
favorite: false
trending: false
rating:
  food: 5
  service: 4
  ambiance: 4
  value: 4
coordinates:
  lat: 28.1234
  lng: -15.1234
restaurantLinks:
  website: 'https://restaurante.com'
  reservations: 'https://restaurante.com/reservas'
  menu: 'https://restaurante.com/menu'
  instagram: 'https://instagram.com/restaurante'
  googleMaps: 'https://maps.google.com/?q=Nombre+del+Restaurante'
anecdote: 'Detalle corto, curioso o memorable que aporte personalidad a la reseña.'
---

## Primera impresión

[Explica por qué fuiste, con quién, en qué contexto y qué esperabas del restaurante. Este bloque debe situar al lector y marcar el tono de la reseña.]

## El local y el ambiente

[Describe el espacio: ubicación, decoración, iluminación, ruido, separación entre mesas, vistas, terraza, barra o cualquier rasgo que condicione la experiencia.]

### Imagen del local

![Sala principal del restaurante con mesas junto al ventanal](/images/reviews/nombre-restaurante/local.jpg)

_Opcional: añade una línea breve si la imagen necesita contexto._

## La propuesta gastronómica

[Resume el tipo de cocina, si trabajan carta o menú degustación, el enfoque del producto, la estacionalidad o la filosofía del restaurante.]

## Platos

### Aperitivo o bienvenida

[Cuenta cómo fue el arranque del menú, qué sensaciones dejó y si hubo algún detalle inesperado.]

![Copa de bienvenida y primer aperitivo del menú](/images/reviews/nombre-restaurante/aperitivo.jpg)

### Entrante 1: nombre del plato

[Describe el plato: producto, técnica, equilibrio, temperatura, textura, presentación y si repetirías o no.]

![Entrante de temporada emplatado](/images/reviews/nombre-restaurante/entrante-1.jpg)

### Entrante 2: nombre del plato

[Si no hubo muchos platos, puedes agrupar varios en una misma sección. Si hubo menú degustación largo, usa una subsección por plato o por bloque.]

![Segundo entrante del menú](/images/reviews/nombre-restaurante/entrante-2.jpg)

### Principal: nombre del plato

[Explica si fue el momento fuerte del menú, cómo estaba el punto de cocción, la intensidad de sabor y si estuvo a la altura de la expectativa creada.]

![Plato principal servido en mesa](/images/reviews/nombre-restaurante/principal.jpg)

### Postre

[Valora si el cierre estuvo bien integrado con el resto del menú, si resultó equilibrado o demasiado pesado y si dejó buen recuerdo.]

![Postre final del menú](/images/reviews/nombre-restaurante/postre.jpg)

## Servicio y atención

[Describe el ritmo entre platos, la explicación del menú, la amabilidad, la cercanía, el conocimiento del producto, la gestión del vino o cualquier detalle del servicio.]

## Relación calidad-precio

[Indica si el precio te pareció ajustado, alto o especialmente competitivo para lo que ofrece el restaurante. Aquí encaja bien mencionar suplementos, maridaje o extras.]

## Conclusión

[Cierra con una recomendación clara: para quién lo recomiendas, en qué ocasión encaja mejor y si volverías.]
```

## Bloques insertables para imágenes

### Opción simple con Markdown

```md
![Tartar de atún con aliño cítrico](/images/reviews/nombre-restaurante/tartar-atun.jpg)
```

### Opción con contexto antes y después

```md
El tartar fue uno de los platos más redondos de la comida, muy limpio en sabor y bien equilibrado en acidez.

![Tartar de atún con aliño cítrico](/images/reviews/nombre-restaurante/tartar-atun.jpg)

La ración no era grande, pero sí muy medida y coherente dentro del menú.
```

### Opción enriquecida en MDX con pie de foto

```mdx
<figure>
  <img
    src="/images/reviews/nombre-restaurante/tartar-atun.jpg"
    alt="Tartar de atún con aliño cítrico servido en plato hondo"
  />
  <figcaption>Uno de los platos más finos y equilibrados del menú.</figcaption>
</figure>
```

## Cómo rellenar los metadatos

- `title`: nombre exacto del restaurante.
- `description`: una frase de resumen, útil para portada, SEO y vistas previas.
- `address`: dirección visible para el lector.
- `locality`: ciudad, barrio o zona principal.
- `pubDate`: fecha de publicación de la reseña.
- `updatedDate`: úsala solo si has revisado la reseña después.
- `visitDate`: fecha real de la visita.
- `image`: imagen principal de la reseña.
- `averagePrice`: precio aproximado por persona sin símbolo de moneda.
- `categoryArray`: etiquetas breves y consistentes para clasificar el restaurante.
- `important`: marca reseñas destacadas.
- `favorite`: marca restaurantes especialmente recomendados.
- `trending`: reserva este campo para lugares con interés actual o recurrente.
- `rating`: valoración de comida, servicio, ambiente y valor entre `1` y `10`.
- `coordinates`: latitud y longitud si quieres geolocalización precisa.
- `restaurantLinks`: enlaces útiles del local.
- `anecdote`: detalle memorable que aporte una capa personal.

## Consejos de redacción

- Empieza con una introducción concreta, no genérica.
- Describe sensaciones y hechos, no solo adjetivos.
- Si un plato falla, explica por qué.
- Evita repetir que todo estaba "muy bueno"; concreta textura, temperatura, punto o equilibrio.
- Mantén un orden narrativo: llegada, espacio, comida, servicio y cierre.
- Si usas emojis, que sean pocos y funcionales.
