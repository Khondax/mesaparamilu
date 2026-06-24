# Plantilla de restaurante por visitar (sugerencia)

Usa esta plantilla como base para añadir restaurantes que nos han recomendado y todavía no hemos visitado. Copia este archivo, pégalo dentro de `src/content/suggestions/` con un nombre de slug limpio, por ejemplo `nombre-del-restaurante.md`, y completa el frontmatter.

A diferencia de una reseña, una sugerencia **no incluye puntuaciones ni fecha de visita**: solo los datos del local y de quién nos lo recomendó. Toda la información se muestra directamente en la tarjeta del índice `Por Visitar`, así que el cuerpo del archivo es opcional.

## Buenas prácticas rápidas

- Mantén `title`, `description`, `address` y `locality` siempre informados.
- La `description` debe resumir el restaurante en una frase breve y útil (es lo que se ve en la tarjeta).
- `image` debe apuntar a la imagen principal del restaurante (foto del local o de un plato).
- `categoryArray` recoge los **estilos culinarios** con etiquetas cortas y consistentes, por ejemplo `['japonés', 'fusión', 'omakase']`.
- Usa `recommendedBy` para indicar quién o de dónde viene la recomendación.
- Marca `priority: true` si es un sitio al que tenemos muchas ganas de ir (sale primero en el listado).
- Rellena `restaurantLinks` con lo que tengas: web, Instagram, carta, reservas o Google Maps. Cada enlace aparece como un botón en la tarjeta.

## Estructura recomendada

```md
---
title: 'Nombre del restaurante'
description: 'Resumen breve del restaurante, su cocina y por qué nos apetece visitarlo.'
address: 'Calle y número'
locality: 'Ciudad o zona'
pubDate: 'Jun 22 2026'
image: '/images/suggestions/nombre-restaurante/hero.jpg'
categoryArray: ['estilo 1', 'estilo 2', 'estilo 3']
recommendedBy: 'Quién nos lo recomendó (un amigo, una guía, redes...)'
priority: false
coordinates:
  lat: 28.1234
  lng: -15.1234
restaurantLinks:
  website: 'https://restaurante.com'
  menu: 'https://restaurante.com/carta'
  reservations: 'https://restaurante.com/reservas'
  instagram: 'https://instagram.com/restaurante'
  googleMaps: 'https://maps.google.com/?q=Nombre+del+Restaurante'
---

[Opcional: notas internas sobre la recomendación, qué platos nos han dicho que pidamos,
mejor momento para ir, etc. Este cuerpo no se muestra en la tarjeta del índice.]
```

## Cómo rellenar los metadatos

- `title`: nombre exacto del restaurante.
- `description`: una frase de resumen; es el texto visible en la tarjeta.
- `address`: dirección o ubicación visible para el lector.
- `locality`: ciudad, barrio o zona principal.
- `pubDate`: fecha en la que añadimos la sugerencia (sirve para ordenar el listado). Opcional.
- `image`: imagen principal del restaurante.
- `categoryArray`: estilos culinarios, breves y consistentes.
- `recommendedBy`: quién o qué nos lo recomendó. Opcional.
- `priority`: `true` para destacarlo arriba del todo; por defecto `false`.
- `coordinates`: latitud y longitud si quieres geolocalización precisa. Opcional.
- `restaurantLinks`: enlaces útiles (web, carta, reservas, Instagram, Google Maps). Todos opcionales.

## Consejos

- Cuando finalmente visitéis el restaurante, mueve el contenido a una reseña completa en `src/content/reviews/` usando `restaurant-review-template.md` y elimina el archivo de `suggestions/`.
- Reutiliza el mismo slug en ambas carpetas para mantener la coherencia.
