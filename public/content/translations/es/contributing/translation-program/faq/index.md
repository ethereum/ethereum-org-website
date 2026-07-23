---
title: Guía de traducción de ethereum.org
metaTitle: Preguntas frecuentes (FAQ) del Programa de traducción
lang: es
description: Preguntas frecuentes sobre el Programa de traducción de ethereum.org
---

Si eres nuevo en el Programa de traducción y dudas en participar, aquí tienes algunas preguntas frecuentes que pueden ayudarte a empezar. Usa esta guía para encontrar respuestas a las consultas más comunes.

## ¿Puedo recibir una compensación por traducir ethereum.org? {#compensation}

Ethereum.org es un sitio web de código abierto, lo que significa que cualquiera puede involucrarse y contribuir.

El Programa de traducción de ethereum.org es una extensión de esto y está organizado con una filosofía similar en mente.

El objetivo del Programa de traducción es hacer que el contenido de Ethereum sea accesible para todos, independientemente de los idiomas que hablen. También permite que cualquier persona bilingüe se involucre en el ecosistema de Ethereum y contribuya de manera accesible.

Por esta razón, el Programa de traducción es abierto y voluntario, y la participación no está sujeta a compensación. Si compensáramos a los traductores por la cantidad de palabras que traducen, solo podríamos invitar a aquellos con suficiente experiencia en traducción (traductores profesionales) a unirse al Programa de traducción. Esto haría que el Programa de traducción fuera excluyente y nos impediría alcanzar los objetivos trazados, específicamente: permitir que todos participen y se involucren en el ecosistema.

Hacemos todo lo posible para que nuestros colaboradores tengan éxito en el ecosistema de Ethereum; existen muchos incentivos no monetarios, tales como: [ofrecer POAP](/contributing/translation-program/acknowledgements/#poap) y un [certificado de traductor](/contributing/translation-program/acknowledgements/#certificate), así como organizar las [Tablas de clasificación de traducción](/contributing/translation-program/acknowledgements/) y [listar a todos nuestros traductores en el sitio](/contributing/translation-program/contributors/).

## ¿Cómo traduzco cadenas con `<HTML tags>`? {#tags}

No todas las cadenas están escritas en formato de texto puro. Hay algunas cadenas que consisten en secuencias de comandos mixtas, como etiquetas HTML (`<0>`, `</0>`). Esto suele ser para hipervínculos o estilos alternativos en medio de una oración.

- Traduce el texto dentro de las etiquetas, pero no las etiquetas en sí. Cualquier cosa en `<` y `>` no debe traducirse ni eliminarse.
- Para mantener la cadena segura, te recomendamos que hagas clic en el botón "Copy Source" (Copiar origen) en la parte inferior izquierda. Esto copiará la cadena original y la pegará en el cuadro de texto. Esto te permite aclarar dónde están las etiquetas y te ayuda a evitar errores.

![Crowdin interface with copy source button highlighted](./html-tag-strings.png)

Puedes mover la posición de las etiquetas dentro de la cadena para que sea más natural en tu idioma; solo asegúrate de mover la etiqueta completa.

Para obtener información más detallada sobre cómo tratar las etiquetas y los fragmentos de código, consulta la [Guía de estilo de traducción de ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## ¿Dónde se encuentran las cadenas? {#strings}

A menudo, las cadenas de origen por sí solas pueden no ser suficientes para proporcionar una traducción precisa.

- Echa un vistazo a las "screenshots" (capturas de pantalla) y al "context" (contexto) para obtener más información. En la sección de la cadena de origen, verás la imagen de captura de pantalla adjunta que te mostrará cómo estamos usando la cadena en contexto.
- Si aún no estás seguro, indícalo en la "comment section" (sección de comentarios). [¿No estás seguro de cómo dejar un comentario?](#comment)

![Showing how context can be provided for a string with a screenshot](./source-string.png)

![An example screenshot added for context](./source-string-2.png)

## ¿Cómo puedo dejar comentarios o hacer preguntas? Me gustaría señalar un problema o errores tipográficos... {#comment}

Si deseas señalar una cadena en particular que necesita atención, no dudes en enviar un comentario.

- Haz clic en el segundo botón de la barra superior derecha. La pestaña oculta aparecerá a tu derecha. Deja un nuevo comentario y marca la casilla "Issue" (Problema) en la parte inferior. Puedes especificar el tipo de problema eligiendo una de las opciones del menú desplegable.
- Una vez enviado, se informará a nuestro equipo. Solucionaremos el problema y te lo haremos saber respondiendo a tu comentario y cerrando el problema.
- Si informas de una traducción incorrecta, la traducción y tu alternativa sugerida serán revisadas por un hablante nativo durante la próxima revisión.

![Showing how to make comments and issues](./comment-issue.png)

## ¿Qué es la Memoria de traducción (TM)? {#translation-memory}

La Memoria de traducción (TM, por sus siglas en inglés) es una función de Crowdin que almacena todas las cadenas traducidas previamente en ethereum.org. Cuando se traduce una cadena, se guarda automáticamente en la TM de nuestro proyecto. ¡Esta podría ser una herramienta útil para ayudarte a ahorrar tiempo!

- Mira la sección "TM and MT Suggestions" (Sugerencias de TM y MT) y verás cómo otros traductores tradujeron la misma cadena o una similar. Si encuentras una sugerencia con una alta tasa de coincidencia, no dudes en consultar la traducción haciendo clic en ella.
- Si no hay nada en la lista, puedes buscar en la TM traducciones hechas previamente y reutilizarlas para mantener la coherencia.

![A screenshot of the translation memory](./translation-memory.png)

## ¿Cómo uso el glosario de Crowdin? {#glossary}

La terminología de Ethereum es otra parte crucial de nuestro trabajo de traducción, ya que a menudo los nuevos términos tecnológicos aún no estarán localizados en muchos idiomas. Además, hay términos que tienen diferentes significados en diferentes contextos. [Más sobre la traducción de la terminología de Ethereum](#terminology)

El glosario de Crowdin es el mejor lugar para aclarar términos y definiciones. Hay dos formas de consultar el glosario.

- Primero, cuando encuentres un término subrayado en la cadena de origen, puedes pasar el ratón por encima y ver una breve definición del mismo.

![An example glossary definition](./glossary-definition.png)

- Segundo, si ves un término que no te resulta familiar pero que no está subrayado, puedes buscar en la pestaña del glosario (el tercer botón de la columna derecha). Encontrarás explicaciones de términos específicos y de los que se usan con frecuencia en el proyecto.

![A screenshot showing where to find the glossary tab in Crowdin](./glossary-tab.png)

- Si aún no puedes encontrarlo, ¡es tu oportunidad de agregar un nuevo término! Te animamos a buscarlo en un motor de búsqueda y agregar la descripción al glosario. Será de gran ayuda para que otros traductores entiendan mejor el término.

![A screenshot showing how to add a glossary term to Crowdin](./add-glossary-term.png)

### Política de traducción de terminología {#terminology}

_Para nombres (marcas, empresas, personas) y nuevos términos tecnológicos (cadena de balizas, cadenas de fragmentos, etc.)_

Ethereum presenta muchos términos nuevos que se han acuñado recientemente. Algunos términos variarán de un traductor a otro, ya que no hay una traducción oficial en su respectivo idioma. Tales inconsistencias pueden causar malentendidos y disminuir la legibilidad.

Debido a la diversidad lingüística y a las diferentes estandarizaciones en cada idioma, ha sido casi imposible idear una política de traducción de terminología unificada que pueda adaptarse a todos los idiomas admitidos.

Después de una cuidadosa consideración, hemos tomado la decisión de dejar la terminología de uso más frecuente en sus manos, los traductores.

Esto es lo que sugerimos cuando encuentres un término que no te resulte familiar:

- Consulta el [Glosario de términos](#glossary), es posible que encuentres cómo lo han traducido otros traductores anteriormente. Si crees que el término traducido anteriormente no es apropiado, no dudes en restaurar tu traducción agregando un nuevo término al glosario de Crowdin.
- Si no existe una traducción previa en el glosario, te animamos a buscarla en un motor de búsqueda o en un artículo de medios que muestre cómo se usa realmente el término en tu comunidad.
- Si no encuentras ninguna referencia en absoluto, ¡no dudes en confiar en tu intuición y sugerir una nueva traducción a tu idioma!
- Si te sientes menos seguro de hacerlo, deja el término sin traducir. A veces, los términos en inglés son más que adecuados para ofrecer definiciones precisas.

Te recomendamos que dejes los nombres de marcas, empresas y personal sin traducir, ya que una traducción podría causar confusión innecesaria y dificultades de SEO.

## ¿Cómo funciona el proceso de revisión? {#review-process}

Para garantizar un cierto nivel de calidad y coherencia en nuestras traducciones, trabajamos con [Acolad](https://www.acolad.com/), uno de los proveedores de servicios lingüísticos más grandes a nivel mundial. Acolad cuenta con 20.000 lingüistas profesionales, lo que significa que pueden proporcionar revisores profesionales para cada idioma y tipo de contenido que necesitemos.

El proceso de revisión es sencillo; una vez que un conjunto de contenido está traducido al 100 %, solicitamos una revisión para ese bloque de contenido. El proceso de revisión se lleva a cabo directamente en Crowdin. Una vez que se completa la revisión, actualizamos el sitio web con el contenido traducido.

## ¿Cómo agrego contenido en mi idioma? {#adding-foreign-language-content}

Actualmente, todo el contenido que no está en inglés se traduce directamente del contenido de origen en inglés, y cualquier contenido que no exista en inglés no se puede agregar a otros idiomas.

Para sugerir nuevo contenido para ethereum.org, puedes [crear un issue](https://github.com/ethereum/ethereum-org-website/issues) en GitHub. Si se agrega, el contenido se escribirá en inglés y se traducirá a otros idiomas usando Crowdin.

Planeamos agregar soporte para adiciones de contenido que no esté en inglés en un futuro cercano.

## Ponte en contacto {#contact}

Gracias por leer todo esto. Esperamos que te ayude a integrarte en nuestro programa. ¡No dudes en unirte a nuestro [canal de traducción de Discord](https://discord.gg/ethereum-org) para hacer preguntas y colaborar con otros traductores, o comunícate con nosotros en translations@ethereum.org!