---
title: Preguntas frecuentes acerca del Programa de traducción
lang: es
description: Preguntas frecuentes acerca del Programa de traducción de ethereum.org
---

# Guía de traducción para ethereum.org {#translating-ethereum-guide}

Si no conoce el Programa de traducción y se está planteando participar en él, he aquí algunas preguntas frecuentes que pueden ayudarle a comenzar. Use esta guía para encontrar respuestas a las preguntas más frecuentes.

## ¿Puedo obtener remuneración por traducir ethereum.org? {#compensation}

Ethereum.org es un sitio web de código abierto, lo que significa que cualquiera puede involucrarse y contribuir.

El Programa de traducción de ethereum.org va en esta línea y se basa en una filosofía similar.

El objetivo de dicho programa es posibilitar que el contenido de Ethereum sea accesible para todos, sea cual sea el idioma que hablen. También permite a cualquier persona con dominio de idiomas involucrarse con el ecosistema de Ethereum y colaborar de forma accesible.

Por esta razón, el Programa de traducción es abierto y voluntario, y su participación en él no está sujeta a remuneración. Si tuviéramos que compensar económicamente a los traductores por el número de palabras que traducen, solo podríamos invitar a aquellos con suficiente experiencia en traducción (traductores profesionales) a que se unieran al Programa de traducción. Esto haría del Programa de traducción fuera una iniciativa excluyente y nos impediría alcanzar los objetivos descritos, principalmente, el permitir que cualquiera pueda participar e involucrarse en el ecosistema.

Hacemos todo lo posible para que nuestros colaboradores tengan éxito en el ecosistema de Ethereum. Hay muchos incentivos no monetarios como: [ofrecer POAP](/contributing/translation-program/acknowledgements/#poap) y un [certificado de traductor](/contributing/translation-program/acknowledgements/#certificate), además de organizar las [Tablas de clasificación de traductores](/contributing/translation-program/acknowledgements/) y [mencionar un listado de todos nuestros traductores en la página](/contributing/translation-program/contributors/).

## ¿Cómo debo traducir las cadenas con `<etiquetas HTML>`? {#tags}

No todas las cadenas están escritas en forma de «texto puro». Algunas cadenas consisten en scripts mixtos como etiquetas HTML (`<0>`, `</0>`). Se suelen usar para los hipervínculos, o para incluir un formato estilístico diferente en mitad de una frase.

- Traduzca el texto dentro de las etiquetas pero no las etiquetas en sí. Cualquier palabra que aparezca en `<` y `>` no debe traducirse ni eliminarse.
- Para mantener la cadena segura, recomendamos que haga clic en el botón «Copiar texto original» en la parte inferior izquierda. De esta forma se copiará la cadena original y se pegará en el cuadro de texto. Así sabrá dónde están las etiquetas y podrá evitar errores.

![Interfaz de Crowdin con el botón de copiar fuente resaltado](./html-tag-strings.png)

Puede mover la posición de las etiquetas dentro de la cadena para hacerla más natural en su idioma. Para ello, asegúrese simplemente de mover toda la etiqueta.

Si desea más información sobre cómo tratar con etiquetas y fragmentos de código, consulte la [Guía de estilo de traducción](/contributing/translation-program/translators-guide/#dealing-with-tags) de ethereum.org.

## ¿Dónde se encuentran las cadenas? {#strings}

Las cadenas de origen no suelen ser suficientes por sí mismas para proporcionar una traducción precisa.

- Eche un vistazo a las «capturas de pantalla» y «contexto» para más información. En la sección de la cadena de origen, verá la captura de pantalla adjunta que le mostrará cómo usamos la cadena dentro de su contexto.
- Si aún tiene dudas, coméntelo en la «sección de comentarios». [¿No sabe cómo dejar un comentario?](#comment)

![Mostrar cómo se puede proporcionar contexto para una cadena con una captura de pantalla](./source-string.png)

![Una captura de pantalla de ejemplo añadida para ofrecer contexto](./source-string-2.png)

## ¿Cómo puedo dejar comentarios o hacer preguntas? Me gustaría señalar un problema o error tipográfico... {#comment}

Si quiere señalar que una cadena en particular necesita revisión, puede añadir un comentario.

- Pulse el segundo botón de la barra que se encuentra arriba a la derecha. La pestaña aparecerá a la derecha. Escriba un nuevo comentario y marque la casilla de «Issue» (problema) que se encuentra abajo. Puede especificar el tipo de problema eligiendo una de las opciones del menú desplegable.
- Una vez añadido el comentario, este se enviará a nuestro equipo técnico. Solucionaremos el problema, responderemos al comentario y cerraremos este informe.
- Si reporta una traducción incorrecta, la traducción y la alternativa sugerida serán revisadas por un hablante nativo durante la próxima revisión.

![Mostrar cómo hacer comentarios e informar de problemas](./comment-issue.png)

## ¿Qué es una memoria de traducción? {#translation-memory}

La memoria de traducción (TM, por sus siglas en inglés) es una función de Crowdin que almacena todas las cadenas de traducciones previas de [ethereum.org](http://ethereum.org/). Cuando se traduce una cadena, automáticamente se guarda en la memoria de traducción de nuestro proyecto. ¡Esta puede ser una herramienta muy útil para ayudarle a ahorrar tiempo!

- Entre en la sección de sugerencias y podrá ver cómo han traducido otros traductores la misma cadena o una similar. Si encuentra una sugerencia con una alta tasa de coincidencia, puede asignarla pulsando sobre ella.
- Si no hay nada en la lista, puede buscar en la TM traducciones realizadas previamente y reutilizarlas para mantener coherencia.

![Una captura de pantalla de la memoria de traducción](./translation-memory.png)

## ¿Cómo uso el glosario de Crowdin? {#glossary}

La terminología de Ethereum es otra parte esencial de nuestro trabajo de traducción, ya que a menudo los nuevos términos tecnológicos todavía no están acuñados en muchos idiomas. También hay términos que tienen diferentes significados en diferentes contextos. [Más sobre la traducción de la terminología de Ethereum](#terminology)

El glosario de Crowdin es el mejor lugar para aclarar términos y definiciones. Existen dos formas de acceder al glosario.

- En primer lugar, cuando se encuentra un término subrayado en la cadena de origen, puede pasar el ratón por encima y ver una breve definición.

![Un ejemplo de una definición del glosario](./glossary-definition.png)

- En segundo lugar, si ve un término que no le es familiar, pero no está subrayado, puede buscar en la pestaña del glosario (el tercer botón de la columna derecha). Encontrará explicaciones de términos específicos y de los que se utilizan frecuentemente en el proyecto.

![Una captura de pantalla que muestra dónde encontrar el glosario en Crowdin](./glossary-tab.png)

- Si aun así no lo encuentra, ¡es su oportunidad de añadir un término nuevo! Le animamos a buscarlo en un motor de búsqueda y añadir la descripción al glosario. Será de gran ayuda para que otros traductores entiendan mejor dicho término.

![Una captura de pantalla que muestra cómo añadir un término al glosario en Crowdin](./add-glossary-term.png)

### Política de traducción de la terminología {#terminology}

_Para nombres (marcas, empresas o personas) y nuevos términos relativos a la tecnología (Eth2, cadenas de baliza, etc.)_

Ethereum presenta muchos términos nuevos que han sido acuñados recientemente. Algunos de ellos varían de un traductor a otro, ya que no hay traducción oficial en su respectivo idioma. Tales inconsistencias pueden causar malentendidos y disminuir la comprensión.

Debido a la diversidad lingüística y a diferentes usos normativos en cada idioma, ha sido casi imposible elaborar una política unificada de la traducción de la terminología que se pueda adaptar a todos los idiomas incluidos.

Tras una cuidadosa reflexión, hemos optado por dejar la decisión sobre la terminología más utilizada a ustedes, los traductores.

Le aconsejamos que proceda de la siguiente manera cuando encuentre un término que no le sea familiar:

- Consulte el [Glosario de términos](#glossary); allí puede encontrar cómo lo han traducido previamente otros traductores. Si cree que el término traducido anteriormente no es apropiado, no dude en restaurar su traducción añadiendo un nuevo término al glosario de Crowdin.
- Si la traducción anterior no existe en el Glosario, le animamos a buscarlo en un motor de búsqueda o artículo que muestre cómo se utiliza realmente el término en su comunidad.
- Si no encuentra ninguna referencia, no dude en confiar en su intuición y sugerir una nueva traducción en su idioma.
- Si no se siente tan seguro, deje el término sin traducir. A veces, los términos ingleses son más que adecuados para ofrecer definiciones precisas.

Le aconsejamos que no traduzca los nombres de las marcas, compañías y del personal, ya que traducirlos podría causar una confusión innecesaria y dificultar la optimización de motores de búsqueda (o SEO, por sus siglas en inglés).

## ¿Cómo funciona el proceso de revisión? {#review-process}

Para garantizar un cierto nivel de calidad y consistencia en nuestras traducciones, trabajamos con [Acolad](https://www.acolad.com/), una de las mayores empresas que ofrecen servicios de idiomas a escala mundial. Acolad cuenta con 20.000 profesionales de la lengua, lo que significa que puede proporcionar correctores profesionales para cada idioma y tipo de contenido que necesitamos.

Este proceso de corrección no tiene ningún secreto: una vez que un [bloque de contenido](/contributing/translation-program/content-buckets) se traduce por completo, nosotros les pedimos a Acolad que revise ese bloque de contenido. La corrección se hace directamente en Crowdin. Una vez corregida la traducción, actualizamos el sitio web del contenido traducido.

## ¿Cómo puedo añadir contenido en mi idioma? {#adding-foreign-language-content}

El contenido del sitio en otros idiomas se traduce directamente del inglés. No se puede añadir contenido en otros idiomas si no existe primero en inglés.

Si desea sugerir nuevo contenido para ethereum.org, puede [crear una incidencia](https://github.com/ethereum/ethereum-org-website/issues) en GitHub. Si se agrega, el contenido se escribirá en inglés y se traducirá a otros idiomas usando Crowdin.

Tenemos previsto ampliar la funcionalidad próximamente para añadir contenido en otros idiomas aunque no exista en inglés.

## Contáctenos {#contact}

Gracias por leer esta explicación. Esperemos que le sea de ayuda para colaborar con nuestro programa. ¡Siéntase libre de unirse a nuestro [canal de traducción de Discord](https://discord.gg/ethereum-org) para hacer preguntas y colaborar con otros traductores, o escríbanos a translations@ethereum.org!
