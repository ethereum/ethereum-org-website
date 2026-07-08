---
title: Guía de estilo de traducción de ethereum.org
metaTitle: Guía para traductores
lang: es
description: Instrucciones y consejos para los traductores de ethereum.org
---

La guía de estilo de traducción de ethereum.org contiene algunas de las pautas, instrucciones y consejos más importantes para los traductores, ayudándonos a localizar el sitio web.

Este documento sirve como guía general y no es específico para ningún idioma en particular.

Si tienes alguna pregunta, sugerencia o comentario, no dudes en contactarnos en translations@ethereum.org, enviar un mensaje a @ethdotorg en Crowdin, o [unirte a nuestro Discord](https://discord.gg/ethereum-org), donde puedes enviarnos un mensaje en el canal #translations o comunicarte con cualquiera de los miembros del equipo.

## Uso de Crowdin {#using-crowdin}

Puedes encontrar instrucciones básicas sobre cómo unirte al proyecto en Crowdin y cómo usar el editor en línea de Crowdin en la [página del Programa de traducción](/contributing/translation-program/#how-to-translate).

Si deseas obtener más información sobre Crowdin y el uso de algunas de sus funciones avanzadas, la [base de conocimientos de Crowdin](https://support.crowdin.com/online-editor/) contiene muchas guías detalladas y descripciones generales de toda la funcionalidad de Crowdin.

## Capturar la esencia del mensaje {#capturing-the-essence}

Al traducir el contenido de ethereum.org, evita las traducciones literales.

Es importante que las traducciones capturen la esencia del mensaje. Esto podría significar reformular ciertas frases o usar traducciones descriptivas en lugar de traducir el contenido palabra por palabra.

Los diferentes idiomas tienen diferentes reglas gramaticales, convenciones y orden de las palabras. Al traducir, ten en cuenta cómo se estructuran las oraciones en los idiomas de destino y evita traducir literalmente el texto original en inglés, ya que esto puede dar lugar a una estructura de oraciones y legibilidad deficientes.

En lugar de traducir el texto original palabra por palabra, se recomienda leer la oración completa y adaptarla para que se ajuste a las convenciones del idioma de destino.

## Formal frente a informal {#formal-vs-informal}

Utilizamos el trato formal, que siempre es educado y apropiado para todos los visitantes.

El uso del trato formal nos permite evitar sonar poco oficiales u ofensivos, y funciona independientemente de la edad y el género del visitante.

La mayoría de los idiomas indoeuropeos y afroasiáticos utilizan pronombres personales de segunda persona específicos de género, que distinguen entre masculino y femenino. Al dirigirnos al usuario o usar pronombres posesivos, podemos evitar asumir el género del visitante, ya que el trato formal es generalmente aplicable y coherente, independientemente de cómo se identifiquen.

## Vocabulario y significado simples y claros {#simple-vocabulary}

Nuestro objetivo es hacer que el contenido del sitio web sea comprensible para la mayor cantidad de personas posible.

En la mayoría de los casos, esto se puede lograr fácilmente utilizando palabras cortas y sencillas que sean fáciles de entender. Si hay varias traducciones posibles para una determinada palabra en tu idioma con el mismo significado, la mejor opción suele ser la palabra más corta que refleje claramente el significado.

## Sistema de escritura {#writing-system}

Ethereum.org está disponible en varios idiomas, utilizando sistemas de escritura (o alfabetos) alternativos al latino.

Todo el contenido debe traducirse utilizando el sistema de escritura correcto para tu idioma y no debe incluir ninguna palabra escrita con caracteres latinos.

Al traducir el contenido, debes asegurarte de que las traducciones sean coherentes y no incluyan caracteres latinos.

Un error común es pensar que Ethereum siempre debe escribirse en caracteres latinos. Esto es en su mayoría incorrecto, utiliza la ortografía de Ethereum nativa de tu idioma (por ejemplo, 以太坊 en chino, إيثيريوم en árabe, etc.).

**Lo anterior no se aplica a los idiomas en los que los nombres propios no deben traducirse por regla general.**

## Traducción de los metadatos de la página {#translating-metadata}

Algunas páginas contienen metadatos en la página, como 'title', 'lang', 'description', 'sidebar', etc.

Ocultamos el contenido que los traductores nunca deben traducir al subir nuevas páginas a Crowdin, lo que significa que todos los metadatos visibles para los traductores en Crowdin deben traducirse.

Ten especial cuidado al traducir cualquier cadena donde el texto original sea 'en'. Esto representa el idioma en el que está disponible la página y debe traducirse al [código de idioma ISO para tu idioma](https://www.andiamo.co.uk/resources/iso-language-codes/). Estas cadenas siempre deben traducirse utilizando caracteres latinos, no el sistema de escritura nativo del idioma de destino.

Si no estás seguro de qué código de idioma usar, puedes consultar la memoria de traducción en Crowdin o encontrar el código de idioma para tu idioma en la URL de la página en el editor en línea de Crowdin.

Algunos ejemplos de códigos de idioma para los idiomas más hablados:

- Árabe - ar
- Chino simplificado - zh
- Francés - fr
- Hindi - hi
- Español - es

## Títulos de artículos externos {#external-articles}

Algunas cadenas contienen títulos de artículos externos. La mayoría de nuestras páginas de documentación para desarrolladores contienen enlaces a artículos externos para obtener más información. Las cadenas que contienen títulos de artículos deben traducirse, independientemente del idioma del artículo, para garantizar una experiencia de usuario más coherente para los visitantes que ven la página en su idioma.

A continuación, puedes encontrar algunos ejemplos de cómo se ven estas cadenas para los traductores y cómo identificarlas (los enlaces a los artículos se pueden encontrar principalmente en la parte inferior de estas páginas, en la sección 'Más información'):

![Article titles in sidebar.png](./article-titles-in-sidebar.png)
![Article titles in editor.png](./article-titles-in-editor.png)

## Advertencias de Crowdin {#crowdin-warnings}

Crowdin tiene una función incorporada que advierte a los traductores cuando están a punto de cometer un error. Crowdin te advertirá automáticamente de esto antes de guardar tu traducción si olvidas incluir una etiqueta del texto original, traduces elementos que no deben traducirse, agregas varios espacios consecutivos, olvidas la puntuación final, etc.
Si ves una advertencia como esta, vuelve atrás y revisa la traducción sugerida.

**Nunca ignores estas advertencias, ya que generalmente significan que algo anda mal o que a la traducción le falta una parte clave del texto original.**

Un ejemplo de una advertencia de Crowdin cuando olvidas agregar una etiqueta a tu traducción:
![Example of a Crowdin warning](./crowdin-warning-example.png)

## Manejo de etiquetas y fragmentos de código {#dealing-with-tags}

Gran parte del contenido original contiene etiquetas y variables, que están resaltadas en amarillo en el editor de Crowdin. Estas cumplen diferentes funciones y deben abordarse correctamente.

**Configuración de Crowdin**

Para facilitar la gestión de etiquetas y copiarlas directamente desde el texto original, recomendamos cambiar tu configuración en el editor de Crowdin.

1. Abre la configuración
   ![How to open settings in the editor](./editor-settings.png)

2. Desplázate hacia abajo hasta la sección 'Visualización de etiquetas HTML' (HTML tags displaying)

3. Selecciona 'Ocultar' (Hide)
   ![Please select 'Hide'](./hide-tags.png)

4. Haz clic en 'Guardar' (Save)

Al seleccionar esta opción, ya no se mostrará el texto completo de la etiqueta y será reemplazado por un número.
Al traducir, hacer clic en esta etiqueta copiará automáticamente la etiqueta exacta al campo de traducción.

**Enlaces**

Es posible que notes enlaces completos a páginas en ethereum.org u otros sitios web.

Estos deben ser idénticos al original y no deben cambiarse ni traducirse. Si traduces un enlace o lo cambias de alguna manera, incluso si solo eliminas una parte, como una barra diagonal (/), esto provocará enlaces rotos e inutilizables.

La mejor manera de manejar los enlaces es copiarlos directamente del texto original, ya sea haciendo clic en ellos o usando el botón 'Copiar origen' (`Alt+C`).

![Example of link.png](./example-of-link.png)

Los enlaces también aparecen en el texto original en forma de etiquetas (es decir, `<0>` `</0>`). Si pasas el cursor sobre la etiqueta, el editor mostrará su contenido completo; a veces, estas etiquetas representarán enlaces.

Es muy importante copiar los enlaces del texto original y no cambiar su orden.

Si se cambia el orden de las etiquetas, el enlace que representan se romperá.

![Example of links inside tags.png](./example-of-links-inside-tags.png)

**Etiquetas y variables**

El texto original contiene muchos tipos diferentes de etiquetas, que siempre deben copiarse del original y nunca cambiarse. De manera similar a lo anterior, el orden de estas etiquetas en la traducción también debe seguir siendo el mismo que en el original.

Las etiquetas siempre contienen una etiqueta de apertura y una de cierre. En la mayoría de los casos, el texto entre las etiquetas de apertura y cierre debe traducirse.

Ejemplo: `<strong x-id="1">`Descentralizado`</strong>`

`<strong x-id="1">` - _Etiqueta de apertura que pone el texto en negrita_

Descentralizado - _Texto traducible_

`</strong>` - _Etiqueta de cierre_

![Example of 'strong' tags.png](./example-of-strong-tags.png)

Los fragmentos de código deben abordarse de manera ligeramente diferente a las otras etiquetas, ya que contienen código que no debe traducirse.

Ejemplo: `<code>`nonce`</code>`

`<code>` - _Etiqueta de apertura, que contiene un fragmento de código_

nonce - _Texto no traducible_

`</code>` - _Etiqueta de cierre_

![Example of code snippets.png](./example-of-code-snippets.png)

El texto original también contiene etiquetas acortadas, que solo contienen números, lo que significa que su función no es inmediatamente obvia. Puedes pasar el cursor sobre estas etiquetas para ver exactamente qué función cumplen.

En el siguiente ejemplo, puedes ver que al pasar el cursor sobre la etiqueta `<0>` se muestra que representa `<code>` y contiene un fragmento de código, por lo tanto, el contenido dentro de estas etiquetas no debe traducirse.

![Example of ambiguous tags.png](./example-of-ambiguous-tags.png)

## Formas cortas frente a formas completas/abreviaturas {#short-vs-full-forms}

Hay muchas abreviaturas que se utilizan en el sitio web, por ejemplo, dapps, NFT, DAO, DeFi, etc. Estas abreviaturas se utilizan comúnmente en inglés y la mayoría de los visitantes del sitio web están familiarizados con ellas.

Dado que por lo general no tienen traducciones establecidas en otros idiomas, la mejor manera de abordar estos y otros términos similares es proporcionar una traducción descriptiva de la forma completa y agregar la abreviatura en inglés entre paréntesis.

No traduzcas estas abreviaturas, ya que la mayoría de las personas no estarían familiarizadas con ellas y las versiones localizadas no tendrían mucho sentido para la mayoría de los visitantes.

Ejemplo de cómo traducir dapps:

- Aplicaciones descentralizadas (dapps) → _Forma completa traducida (abreviatura en inglés entre paréntesis)_

## Términos sin traducciones establecidas {#terms-without-established-translations}

Es posible que algunos términos no tengan traducciones establecidas en otros idiomas y sean ampliamente conocidos por el término original en inglés. Dichos términos incluyen principalmente conceptos más nuevos, como prueba de trabajo, prueba de participación, cadena de balizas, staking, etc.

Si bien la traducción de estos términos puede sonar poco natural, ya que la versión en inglés también se usa comúnmente en otros idiomas, se recomienda encarecidamente que se traduzcan.

Al traducirlos, siéntete libre de ser creativo, usar traducciones descriptivas o simplemente traducirlos literalmente.

**La razón por la que la mayoría de los términos deben traducirse, en lugar de dejar algunos en inglés, es el hecho de que esta nueva terminología se generalizará en el futuro, a medida que más personas comiencen a usar Ethereum y tecnologías relacionadas. Si queremos incorporar a más personas de todo el mundo a este espacio, debemos proporcionar una terminología comprensible en la mayor cantidad de idiomas posible, incluso si tenemos que crearla nosotros mismos.**

## Botones y llamadas a la acción (CTA) {#buttons-and-ctas}

El sitio web contiene numerosos botones, que deben traducirse de manera diferente a otros contenidos.

El texto del botón se puede identificar viendo las capturas de pantalla de contexto, conectadas con la mayoría de las cadenas, o verificando el contexto en el editor, que incluye la palabra ''button''.

Las traducciones de los botones deben ser lo más breves posible para evitar desajustes de formato. Además, las traducciones de los botones deben ser imperativas, es decir, presentar una orden o solicitud.

![How to find a button.png](./how-to-find-a-button.png)

## Traducción para la inclusión {#translating-for-inclusivity}

Los visitantes de ethereum.org provienen de todo el mundo y de diferentes orígenes. Por lo tanto, el lenguaje en el sitio web debe ser neutral, acogedor para todos y no excluyente.

Un aspecto importante de esto es la neutralidad de género. Esto se puede lograr fácilmente utilizando el trato formal y evitando cualquier palabra específica de género en las traducciones.

Otra forma de inclusión es tratar de traducir para una audiencia global, no específica de ningún país, raza o región.

Por último, el lenguaje debe ser adecuado para todos los públicos y edades.

## Traducciones específicas del idioma {#language-specific-translations}

Al traducir, es importante seguir las reglas gramaticales, las convenciones y el formato que se utilizan en tu idioma, en lugar de copiar del texto original. El texto original sigue las reglas y convenciones gramaticales del inglés, lo que no es aplicable a muchos otros idiomas.

Debes conocer las reglas de tu idioma y traducir en consecuencia. Si necesitas ayuda, comunícate con nosotros y te ayudaremos a encontrar algunos recursos sobre cómo se deben usar estos elementos en tu idioma.

Algunos ejemplos de lo que debes tener especialmente en cuenta:

### Puntuación, formato {#punctuation-and-formatting}

**Uso de mayúsculas**

- Existen grandes diferencias en el uso de mayúsculas en los diferentes idiomas.
- En inglés, es común escribir con mayúscula todas las palabras en títulos y nombres, meses y días, nombres de idiomas, días festivos, etc. En muchos otros idiomas, esto es gramaticalmente incorrecto, ya que tienen diferentes reglas de uso de mayúsculas.
- Algunos idiomas también tienen reglas sobre el uso de mayúsculas en pronombres personales, sustantivos y ciertos adjetivos, que no se escriben con mayúscula en inglés.

**Espaciado**

- Las reglas de ortografía definen el uso de espacios para cada idioma. Debido a que los espacios se usan en todas partes, estas reglas son algunas de las más distintas, y los espacios son algunos de los elementos peor traducidos.
- Algunas diferencias comunes en el espaciado entre el inglés y otros idiomas:
  - Espacio antes de las unidades de medida y monedas (por ejemplo, USD, EUR, kB, MB)
  - Espacio antes de los signos de grado (por ejemplo, °C, ℉)
  - Espacio antes de algunos signos de puntuación, especialmente los puntos suspensivos (…)
  - Espacio antes y después de las barras diagonales (/)

**Listas**

- Cada idioma tiene un conjunto diverso y complejo de reglas para escribir listas. Estas pueden ser significativamente diferentes al inglés.
- En algunos idiomas, la primera palabra de cada nueva línea debe escribirse con mayúscula, mientras que en otros, las nuevas líneas deben comenzar con letras minúsculas. Muchos idiomas también tienen diferentes reglas sobre el uso de mayúsculas en las listas, dependiendo de la longitud de cada línea.
- Lo mismo se aplica a la puntuación de los elementos de la línea. La puntuación final en las listas puede ser un punto (**.**), una coma (**,**) o un punto y coma (**;**), según el idioma.

**Comillas**

- Los idiomas utilizan muchas comillas diferentes. Simplemente copiar las comillas inglesas del texto original a menudo es incorrecto.
- Algunos de los tipos más comunes de comillas incluyen:
  - „texto de ejemplo“
  - ‚texto de ejemplo’
  - »texto de ejemplo«
  - “texto de ejemplo”
  - ‘texto de ejemplo’
  - «texto de ejemplo»

**Guiones y rayas**

- En inglés, se usa un guion (-) para unir palabras o diferentes partes de una palabra, mientras que una raya (–) se usa para indicar un rango o una pausa.
- Muchos idiomas tienen diferentes reglas para el uso de guiones y rayas que deben observarse.

### Formatos {#formats}

**Números**

- La principal diferencia al escribir números en diferentes idiomas es el separador que se utiliza para los decimales y los miles. Para los miles, puede ser un punto, una coma o un espacio. Del mismo modo, algunos idiomas utilizan un punto decimal, mientras que otros utilizan una coma decimal.
  - Algunos ejemplos de números grandes:
    - Inglés – **1,000.50**
    - Español – **1.000,50**
    - Francés – **1 000,50**
- Otra consideración importante al traducir números es el signo de porcentaje. Se puede escribir de diferentes maneras: **100%**, **100 %** o **%100**.
- Por último, los números negativos se pueden mostrar de forma diferente, según el idioma: -100, 100-, (100) o [100].

**Fechas**

- Al traducir fechas, hay una serie de consideraciones y diferencias según el idioma. Estas incluyen el formato de fecha, el separador, el uso de mayúsculas y los ceros a la izquierda. También hay diferencias entre las fechas completas y las numéricas.
  - Algunos ejemplos de diferentes formatos de fecha:
    - Inglés del Reino Unido (dd/mm/aaaa) – 1st January, 2022
    - Inglés de EE. UU. (mm/dd/aaaa) – January 1st, 2022
    - Chino (aaaa-mm-dd) – 2022 年 1 月 1 日
    - Francés (dd/mm/aaaa) – 1er janvier 2022
    - Italiano (dd/mm/aaaa) – 1º gennaio 2022
    - Alemán (dd/mm/aaaa) – 1. Januar 2022

**Monedas**

- Traducir monedas puede ser un desafío debido a los diferentes formatos, convenciones y conversiones. Como regla general, mantén las monedas igual que en el texto original. Puedes agregar tu moneda local y la conversión entre paréntesis, para beneficio del lector.
- Las principales diferencias al escribir monedas en diferentes idiomas incluyen la ubicación del símbolo, comas decimales frente a puntos decimales, espaciado y abreviaturas frente a símbolos.
  - Ubicación del símbolo: $100 o 100$
  - Comas decimales frente a puntos decimales: 100,50$ o 100.50$
  - Espaciado: 100$ o 100 $
  - Abreviaturas frente a símbolos: 100 $ o 100 USD

**Unidades de medida**

- Como regla general, mantén las unidades de medida según el texto original. Si tu país utiliza un sistema diferente, puedes incluir la conversión entre paréntesis.
- Aparte de la localización de las unidades de medida, también es importante tener en cuenta las diferencias en cómo los idiomas abordan estas unidades. La principal diferencia es el espaciado entre el número y la unidad, que puede ser diferente según el idioma. Ejemplos de esto incluyen 100kB frente a 100 kB o 50ºF frente a 50 ºF.

## Conclusión {#conclusion}

Traducir ethereum.org es una gran oportunidad para aprender sobre los diferentes aspectos de Ethereum.

Al traducir, trata de no apresurarte. ¡Tómatelo con calma y diviértete!

Gracias por participar en el Programa de traducción y ayudarnos a hacer que el sitio web sea accesible para un público más amplio. La comunidad de Ethereum es global y ¡estamos felices de que seas parte de ella!