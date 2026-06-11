---
title: "Añadir videos"
description: "La política para añadir videos a ethereum.org"
lang: es
---

# Añadir videos {#adding-videos}

La [galería de videos de ethereum.org](/videos/) presenta videos sobre Ethereum y el ecosistema de Ethereum de creadores de la comunidad y fuentes confiables. Cualquiera puede sugerir que se añada un video.

## Política de inclusión {#listing-policy}

Ethereum.org es un recurso educativo y neutral. La galería de videos está seleccionada para:

- **Educar** a los usuarios sobre la tecnología, el ecosistema y la comunidad de Ethereum
- **Mantener la precisión** en su contenido técnico
- **Seguir siendo relevante** para la comunidad de Ethereum

El sitio no incluye videos que promuevan principalmente un producto, token o servicio comercial específico.


## Criterios de inclusión {#criteria-for-inclusion}

### Requisitos indispensables {#must-haves}

- **Enfocado en Ethereum**: el video debe tratar principalmente sobre Ethereum, su tecnología, ecosistema o comunidad. Los videos sobre temas generales de la cadena de bloques solo son aceptables si respaldan o se relacionan sustancialmente con una página educativa del sitio, o si hacen referencia a Ethereum.
- **Valor educativo**: el video debe enseñar a los espectadores algo sobre Ethereum o celebrar a la comunidad global de Ethereum. No se aceptará contenido promocional o de marketing.
- **Información precisa**: el contenido técnico debe ser objetivamente correcto y estar actualizado. Los videos desactualizados sobre características obsoletas pueden ser eliminados.
- **Producción de calidad**: el video debe tener una calidad de audio y video razonablemente clara.
- **Disponibilidad pública**: el video debe estar alojado en un recurso abierto o en una plataforma accesible como YouTube, y ser de libre acceso sin un muro de pago o requisito de registro.

### Requisitos deseables {#nice-to-haves}

- **Tener una transcripción**: los videos con transcripciones mejoran la accesibilidad y el SEO. Si no tiene una, el equipo de ethereum.org puede ayudar a generarla.
- **Provenir de una fuente creíble**: el contenido de educadores, investigadores y fuentes establecidas recibe prioridad.
- **Oportuno y atemporal**: se prefiere el contenido que sigue siendo relevante a lo largo del tiempo sobre el material que depende del tiempo.


## Cómo añadir un video {#how-to-add-a-video}

### Opción 1: Abrir un problema (issue) {#open-an-issue}

Si desea sugerir un video pero no quiere crear los archivos usted mismo, abra un problema (issue) en GitHub con los detalles del video y un colaborador podrá ayudarle a añadirlo.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Sugerir un video
</ButtonLink>

### Opción 2: Abrir una solicitud de extracción (pull request) {#open-a-pull-request}

Si desea añadir el video usted mismo, siga estos pasos:

#### Paso 1: Crear el archivo de video {#step-1}

Cree un nuevo directorio y un archivo `index.md` en:

```
public/content/videos/{your-video-slug}/index.md
```

El slug debe ser seguro para URL, estar en minúsculas y usar guiones (por ejemplo, `blockchain-101-visual-demo`).

#### Paso 2: Añadir el frontmatter {#step-2}

Añada el siguiente frontmatter YAML a su `index.md`:

```yaml
---
title: "Your Video Title"
description: "A brief 1–3 sentence summary of the video."
lang: en
youtubeId: "dQw4w9WgXcQ"
uploadDate: 2025-01-15
duration: "12:30"
educationLevel: beginner
topic:
  - "your-topic"
  - "another-topic"
format: explainer
author: Channel Name
---
```

**Referencia de campos:**

| Campo | Requerido | Descripción |
|---|---|---|
| `title` | Sí | Título del video |
| `description` | Sí | Resumen de 1 a 3 oraciones |
| `lang` | Sí | Siempre `en` por ahora |
| `youtubeId` | Sí | El ID del video de YouTube (de la URL después de `v=`) |
| `uploadDate` | Sí | Fecha de subida original en formato `YYYY-MM-DD` |
| `duration` | Sí | Duración del video como `H:MM:SS` o `M:SS` |
| `educationLevel` | Sí | `beginner`, `intermediate` o `advanced` |
| `topic` | Sí | Matriz de etiquetas de temas para filtrar la galería |
| `format` | Sí | `explainer`, `presentation`, `interview`, `tutorial` o `panel` |
| `author` | Sí | Nombre del creador o del canal |
| `breadcrumb` | No | Etiqueta corta personalizada para la navegación de migas de pan |
| `customThumbnailUrl` | No | URL de miniatura personalizada (por defecto es la miniatura de YouTube) |

#### Paso 3: Añadir una transcripción (recomendado) {#step-3}

Debajo del frontmatter `---`, añada la transcripción del video en formato markdown:

```markdown
---
title: "..."
# ... resto del frontmatter
---

Una breve introducción al contenido del video.

### Título de la sección (0:00)

Texto de la transcripción para esta sección...

### Siguiente sección (5:30)

Más texto de la transcripción...
```

Use encabezados `###` con marcas de tiempo para señalar las secciones principales. Esto hace que la transcripción sea fácil de escanear y mejora el SEO.

Si no tiene una transcripción, puede dejar el cuerpo vacío y el equipo generará una.

#### Paso 4: Elegir etiquetas de temas {#step-4}

Elija etiquetas de temas que coincidan con las categorías existentes utilizadas en la galería. Las categorías actuales y sus etiquetas incluyen:

- **Cómo funciona Ethereum**: `how-ethereum-works`, `consensus`, `blockchain`, `cryptography`, `accounts`, `ethereum`, `intro`, `transactions`, `pos`, `smart-contracts`
- **Actualizaciones de la red**: `network-upgrades`, `upgrades`, `pectra`, `dencun`, `eip-4844`, `blobs`, `fusaka`
- **Hoja de ruta y prioridades**: `roadmap-and-priorities`, `pbs`, `mev`
- **Escalabilidad y capa 2 (l2)**: `scaling-and-layer-2`, `scaling`, `layer-2`, `rollups`, `optimistic-rollups`, `zk-rollups`
- **Casos de uso**: `use-cases`, `defi`, `finance`, `nfts`, `erc-721`, `erc-1155`, `lending`, `dapps`, `restaking`, `eigenlayer`, `dao`, `identity`, `desci`, `refi`
- **Privacidad y seguridad**: `privacy-and-security`, `privacy`, `authentication`
- **Historias de la comunidad**: `community-stories`, `contributing`, `translations`, `community`

Para asegurarse de que su video aparezca en una sección de categoría de la galería, incluya al menos una etiqueta clave de categoría (el nombre en negrita en formato kebab-case, por ejemplo, `use-cases` o `scaling-and-layer-2`). Los videos sin una etiqueta de categoría reconocida solo aparecerán en la vista "Todos" y en los resultados de búsqueda.

También puede usar etiquetas nuevas; estarán disponibles para futuras agrupaciones de categorías.

#### Paso 5: Enviar su PR {#step-5}

Abra una solicitud de extracción (pull request) con sus cambios a la rama `dev`. El equipo revisará su envío y le proporcionará comentarios.


## Mantenimiento {#maintenance}

Los videos incluidos se revisan de forma rutinaria para garantizar que:

- Sigan cumpliendo con los criterios de inclusión
- Contengan información precisa y actualizada
- Tengan enlaces de alojamiento/YouTube que funcionen

Si nota algún problema con un video incluido, [cree un problema (issue)](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) o envíe un correo electrónico a [website@ethereum.org](mailto:website@ethereum.org).


## Términos de uso {#terms-of-use}

Consulte los [términos de uso](/terms-of-use/) de ethereum.org. La información en ethereum.org se proporciona únicamente con fines de información general.
