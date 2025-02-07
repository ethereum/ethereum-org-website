---
title: Guía para traductores
lang: es
description: Instrucciones y consejos para traductores de ethereum.org
---

# Guía de estilo de traducción de ethereum.org {#style-guide}

La guía de estilo de traducción de ethereum.org reúne algunas de las pautas, instrucciones y consejos más importantes para que los traductores ayuden a localizar la página web.

Este documento sirve de guía general y no es específico de ningún idioma.

Si tiene alguna pregunta, sugerencia o comentario, no dude en contactarnos en translations@ethereum.org, enviar un mensaje a @ethdotorg en Crowdin o [unirse a nuestro chat de Discord](https://discord.gg/ethereum-org), donde puede enviarnos mensajes en el canal #translations o contactar con cualquiera de los miembros del equipo.

## Cómo utilizar Crowdin {#using-crowdin}

Puede encontrar instrucciones básicas sobre cómo unirse al proyecto en Crowdin y cómo utilizar el editor en línea de Crowdin en la página [Programa de traducción](/contributing/translation-program/#how-to-translate).

Si quiere saber más sobre Crowdin y usar alguna de sus funciones avanzadas, [la base de conocimientos de Crowdin](https://support.crowdin.com/online-editor/) contiene muchas guías detalladas y descripciones generales de todas las funciones de Crowdin.

## Capturar la esencia del mensaje {#capturing-the-essence}

Al traducir contenido de ethereum.org, evite las traducciones literales.

Es importante que las traducciones capten la esencia del mensaje. Esto podría significar parafrasear ciertas oraciones, o recurrir a una traducción más descriptiva en lugar de traducir el contenido literalmente.

Cada idioma tiene sus reglas gramáticas, usos y orden de palabras particulares. Al traducir, tenga en cuenta la estructura de las frases en el idioma de destino y evite traducir literalmente del inglés, ya que esto puede dar como resultado un texto mal estructurado que no se entiende bien.

En lugar de traducir el texto original palabra por palabra, se recomienda leer la frase entera y adaptarla a los usos del idioma de destino.

## ¿Estilo formal o informal? {#formal-vs-informal}

Utilizamos el estilo formal (usted), ya que siempre resulta más educado y apropiado para dirigirse a todos los visitantes.

El uso del estilo formal da un carácter más serio y menos ofensivo, y es apto para todo tipo de edad y género del visitante.

La mayoría de los idiomas indoeuropeos y afro-asiáticos utilizan pronombres personales de segunda persona específicos para el género, que distinguen entre hombres y mujeres. Al dirigirnos al usuario o usar pronombres posesivos, podemos evitar el asumir el género del visitante, ya que el estilo formal suele siempre ser oportuno y coherente, independientemente de cómo se identifiquen.

## Vocabulario y significado sencillos y claros {#simple-vocabulary}

Nuestro objetivo es hacer que el contenido de la página web sea comprensible para el mayor número de personas posible.

En la mayoría de los casos, esto se puede lograr fácilmente utilizando palabras breves y sencillas que se entiendan fácilmente. Si hay varias traducciones acertadas para una determinada palabra en el idioma local con el mismo significado, la mejor opción es la palabra más corta que refleja claramente el significado.

## Sistema de escritura {#writing-system}

Ethereum.org está disponible en varios idiomas, utilizando sistemas alternativos de escritura (o escribiendo scripts) al latín.

Todo el contenido debe traducirse utilizando el sistema de escritura correcto para su idioma, y no debe incluir ninguna palabra, escrita usando caracteres latinos.

Al traducir el contenido, debe asegurarse de que las traducciones sean consistentes y no incluyan ningún carácter latino.

Una idea errónea común es que Ethereum debe estar siempre escrito en latín. Esto es incorrecto en la mayoría de los casos, por favor use la ortografía de Ethereum, nativa de su idioma (por ejemplo, en chino, اريوم en árabe, etc.).

**Lo anterior no se aplica a los idiomas, donde los nombres propios no se traducen, por regla general.**

## Traducción de metadatos de la página {#translating-metadata}

Algunas páginas contienen metadatos en la página, como 'title', 'lang', 'description', 'sidebar', etc.

Ocultamos el contenido que los traductores nunca deberían traducir al subir nuevas páginas a Crowdin, por lo que todos los metadatos visibles para los traductores en Crowdin deberán traducirse.

Por favor, tenga especial cuidado cuando traduzca cadenas cuyo texto origen sea 'en'. Esto representa el idoma en el que la página está disponible y deberá traducirse al [código ISO de idioma para su idioma](https://www.andiamo.co.uk/resources/iso-language-codes/). Estas cadenas de texto siempre deben traducirse usando caracteres latinos, y no el alfabeto nativo al idioma de destino.

Si no está seguro que código de idioma usar, puede revisar la memoria de traducción en Crowdin, o buscar el código de idoma para su idioma en la URL de la página en el editor en línea de Crowdin.

He aquí algunos ejemplos de códigos de idioma para los idiomas más hablados:

- Árabe: ar
- Chino simplificado: zh
- Francés: fr
- Hindi: hi
- Español: es

## Títulos de artículos externos {#external-articles}

Algunas cadenas de texto contienen títulos de artículos externos. La mayoría de nuestras páginas de documentación para desarrolladores contienen enlaces a artículos externos para leer más. Las cadenas de texto que contienen títulos de artículos necesitan traducirse, al margen del idioma del artículo, para asegurar una experiencia de usuario más consistente a los visitantes que lean la página en su idioma nativo.

Puede encontrar a continuación algunos ejemplos de estas cadenas de texto para traducción y cómo identificarlas (los enlaces a artículos se pueden encontrar en la parte inferior de estas páginas, en la sección de «Leer más»):

![Títulos de artículos en sidebar.png](./article-titles-in-sidebar.png) ![Títulos de artículos en editor.png](./article-titles-in-editor.png)

## Advertencias de Crowdin {#crowdin-warnings}

Crowdin tiene una función incorporada que advierte a los traductores cuando están a punto de cometer un error. Crowdin le avisará automáticamente del error antes de guardar la traducción si ha cometido errores, como olvidarse de incluir una etiqueta del texto original; traducir elementos que no deberían traducirse; añadir varios espacios en blanco consecutivos; olvidar marcas de puntuación final; etc. Si ve una advertencia como esta, por favor retroceda y compruebe por segunda vez la traducción sugerida.

**Nunca ignore estas advertencias, porque usualmente significan que algo está mal, o que en la traducción falta una parte del texto original.**

Un ejemplo de una advertencia de Crowdin cuando olvida añadir una etiqueta a su traducción: ![Ejemplo de una advertencia de Crowdin](./crowdin-warning-example.png)

## Cómo abordar las etiquetas y los fragmentos de código {#dealing-with-tags}

Gran parte del contenido en inglés contiene etiquetas y variables, que se destacan en amarillo en el editor de Crowdin. Estas funciones tienen diferentes funciones y deben abordarse correctamente.

**Ajustes de Crowdin**

Para facilitar la gestión de etiquetas y copiarlas directamente desde el inglés, le recomendamos cambiar su configuración en el editor de Crowdin.

1. Abrir ajustes ![Cómo abrir los ajustes en el editor](./editor-settings.png)

2. Desplácese hacia abajo hasta la sección «Mostrar etiquetas HTML».

3. Seleccione «Ocultar». ![Seleccione «Ocultar».](./hide-tags.png)

4. Haga clic en «Guardar».

Al seleccionar esta opción, el texto completo de la etiqueta ya no se mostrará y se reemplazará por un número. Al hacer clic en esta etiqueta durante la traducción, se copiará automáticamente la etiqueta exacta en el campo de traducción.

**Enlaces**

Observará que hay enlaces completos a páginas de ethereum.org u otros sitios web.

Estos deben ser idénticos a los enlaces de la versión original en inglés y no deben modificarse ni traducirse. Si traduce un enlace o lo modifica, aunque solo sea eliminando una parte del mismo, como un barra oblicua (/), inutilizará el enlace.

La mejor manera de conservar los enlaces intactos es copiarlos directamente desde el texto original, ya sea haciendo clic en ellos o usando el botón «Copiar texto» (Alt+C).

![Ejemplo de link.png](./example-of-link.png)

Los enlaces también aparecen en el texto de origen en forma de etiquetas (es decir, <0> </0>). Si pasa el cursor sobre la etiqueta, el editor mostrará su contenido completo (a veces estas etiquetas representan enlaces).

Es muy importante copiar los enlaces del texto original y no cambiar su orden.

Si se cambia el orden de las etiquetas, el enlace que representan se inutilizará.

![Ejemplo de enlaces dentro de tags.png](./example-of-links-inside-tags.png)

**Etiquetas y variables**

El texto original contiene muchos tipos diferentes de etiquetas, que siempre deben copiarse del texto original y no modificarse bajo ninguna circunstancia. Del mismo modo, el orden de estas etiquetas en la traducción también debería seguir siendo el mismo que en la versión original.

Las etiquetas siempre contienen una etiqueta de apertura y otra de cierre. En la mayoría de los casos, el texto entre etiquetas de apertura y cierre debe traducirse.

Ejemplo: `<strong x-id="1">`Decentralized`</strong>`

`<strong x-id="1">`: _Etiqueta de apertura que hace que el texto resalte en negrita_

Descentralizado: _texto traducible_

`</strong>`: _Etiqueta de cierre_

![Ejemplo de «strong» tags.png](./example-of-strong-tags.png)

Los fragmentos de código deben abordarse de forma ligeramente diferente a las demás etiquetas, ya que contienen código que no se debe traducir.

Ejemplo: `<code>`nonce`</code>`

`<code>`: _Etiqueta de apertura, que contiene un fragmento de código_

nonce - _Texto no traducible_

`</code>`: _etiqueta de cierre_

![Ejemplo de código snippets.png](./example-of-code-snippets.png)

El texto original también contiene etiquetas acortadas, que solo contienen números, lo que significa que su función no es inmediatamente obvia. Puede pasar el cursor sobre estas etiquetas para ver qué función tienen exactamente.

En el ejemplo de abajo, al pasar el cursor por la <0> etiqueta se muestra lo que representa `<code>` y contiene un fragmento de código, por lo tanto el contenido dentro de estas etiquetas no debe traducirse.

![Ejemplo de tags.png ambiguo](./example-of-ambiguous-tags.png)

## Abreviaturas/siglas vs. formas completas {#short-vs-full-forms}

En el sitio web, se utilizan muchas siglas, como por ejemplo, dapps, NFT, DAO, DeFi, etc. Estas siglas se utilizan comúnmente en inglés y la mayoría de los visitantes del sitio web están familiarizados con ellas.

Dado que no suelen tener una traducción oficial a otros idiomas, la mejor manera de traducir estos y otros términos similares es proporcionar una descripción completa y añadir la sigla en inglés entre paréntesis.

No traduzca estas siglas o abreviaturas a su idioma nativo, ya que la mayoría de la gente no estaría familiarizada con ellas, y las versiones localizadas no tendrían mucho sentido para la mayoría de los visitantes.

Ejemplo de cómo traducir dApps:

- Aplicaciones descentralizadas (dApps) → _Traducida completa (abreviatura en inglés entre paréntesis)_

## Términos sin traducción establecida {#terms-without-established-translations}

Puede que algunos términos aún no tengan una traducción establecida en otros idiomas y se conozcan ampliamente por su denominación en inglés. Tales términos incluyen principalmente conceptos más nuevos, como proof-of-work (prueba de trabajo), proof-of-stake (prueba de participación), beacon chain (cadena de baliza), staking (participación), etc.

Si bien la traducción de estos términos puede sonar antinatural, ya que la versión en inglés también se utiliza en otros idiomas, es altamente recomendable que se traduzcan.

Al traducirlos, sea creativo con toda libertad, use traducciones descriptivas o simplemente tradúzcalos literalmente.

**La razón por la que la mayoría de estos términos se deberían traducir, en lugar de dejar algunos en inglés, es el hecho de que esta nueva terminología se extenderá en el futuro, a medida que más personas empiecen a utilizar Ethereum y tecnologías relacionadas. Si queremos llegar a más personas de todo el mundo con este espacio, tenemos que proporcionar una terminología comprensible en tantos idiomas como sea posible, aunque necesitemos acuñar los términos nosotros mismos.**

## Botones y CTA {#buttons-and-ctas}

El sitio web contiene numerosos botones, que deben traducirse de forma diferente a otros contenidos.

El texto del botón se puede identificar viendo las capturas de pantalla de contexto, conectadas con la mayoría de las cadenas, o buscando el contexto en el editor, que incluye la frase «botón».

Las traducciones para los botones deben ser lo más cortas posible, para evitar errores de formato. Asimismo, la traducción de los botones debe tener un sentido imperioso, es decir, dar una order o solicitar algo.

![Cómo encontrar un button.png](./how-to-find-a-button.png)

## Traducir de forma inclusiva {#translating-for-inclusivity}

Los visitantes de ethereum.org vienen de todo el mundo y tienen diferentes orígenes. Por lo tanto, el lenguaje en el sitio web debería ser neutral, dar la bienvenida a todos y no excluir a nadie.

Un aspecto importante a colación es la neutralidad entre hombres y mujeres. Esto puede lograrse fácilmente utilizando un estilo formal y evitando en las traducciones palabras específicas de género.

Otra forma de inclusividad es intentar traducir para un público global, que no sea específico a ningún país, raza o región.

Por último, las expresiones deben ser adecuadas a todos los públicos y edades.

## Traducciones específicas del idioma {#language-specific-translations}

Al traducir, es importante seguir las reglas gramaticales, usos y formatos utilizados en su idioma, en lugar de copiarlos de la versión original. El texto original sigue las normas y usos gramaticales del inglés, que no es aplicable a muchos otros idiomas.

Debe conocer las reglas de su idioma y traducir aplicándolas. Si necesita ayuda, comuníquese con nosotros y le ayudaremos a encontrar algunos recursos de ayuda para utilizar estos elementos en su idioma.

He aquí algunos ejemplos de aspectos especialmente importantes:

### Puntuación y formato {#punctuation-and-formatting}

**Uso de mayúsculas**

- Hay grandes diferencias en el uso de mayúsculas en diferentes idiomas.
- En inglés, se escriben con mayúscula inicial todas las palabras en títulos y nombres, meses y días, nombres de idiomas, vacaciones, etc. En muchos otros idiomas, esto es gramaticalmente incorrecto, ya que tienen diferentes reglas de uso de mayúsculas.
- Algunos idiomas también tienen reglas sobre el uso de mayúsculas de pronombres personales, sustantivos y ciertos adjetivos, que no están se escriben con inicial en mayúscula en inglés.

**Espaciado**

- Las reglas de ortografía definen el uso de espacios en cada idioma. Dado que todos los idiomas se escriben con espacios, estas reglas son algunas de las más características y los espacios son algunos de los elementos que se suelen traducir mal.
- He aquí algunas diferencias comunes en el espaciado entre inglés y otros idiomas:
  - Espacio antes de unidades de medición y divisas (por ejemplo, USD, EUR, kB, MB)
  - Espacio antes de los signos de grado (por ejemplo, °C, °F)
  - Espacio antes de algunos signos de puntuación, especialmente el paréntesis (…)
  - Espacio antes y después de las barras (/)

**Listas**

- Cada idioma tiene un conjunto diverso y complejo de reglas para escribir listas. Pueden ser significativamente diferentes al inglés.
- En algunos idiomas, la primera palabra de cada nueva línea se escribe en mayúscula, mientras que en otros, las nuevas líneas deben comenzar en minúscula. Muchos idiomas también tienen reglas diferentes sobre el uso de mayúsculas en las listas, en función de la longitud de cada línea.
- Lo mismo se aplica a la puntuación de los elementos de línea. La puntuación final en las listas puede ser un punto (**.**), una coma (**,**) o un punto y coma (**;**), dependiendo del idioma.

**Comillas**

- Los idiomas utilizan muchas comillas diferentes. Utilizar las comillas inglesas no es correcto en muchos idiomas.
- He aquí algunos de los tipos de comillas más comunes:
  - „texto de ejemplo“
  - ‚texto de ejemplo’
  - »texto de ejemplo«
  - “texto de ejemplo”
  - ‘texto de ejemplo’
  - «texto de ejemplo»

**Guiones**

- En inglés, un guión corto (-) se utiliza para unir palabras o diferentes partes de una palabra, mientras un guión medio (–) se utiliza para indicar una explicación o hacer una pausa.
- Muchos idiomas siguen unas reglas de uso de los guiones diferentes, por lo tanto, deben cumplirse.

### Formatos {#formats}

**Números**

- La principal diferencia en la escritura de números en diferentes idiomas es el separador utilizado para decimales y millares. Los millares se pueden expresar por punto, coma o espacio. Del mismo modo, algunos idiomas utilizan un punto decimal, mientras que otros usan una coma decimal.
  - Algunos ejemplos de cifras de más de tres dígitos:
    - En inglés: **1,000.50**
    - En español: **1.000,50**
    - En francés: **1000,50**
- Otra consideración importante a la hora de traducir números es el signo de porcentaje. Puede escribirse de diferentes maneras: **100%**, **100 %** o **%100**.
- Finalmente, los números negativos pueden mostrarse diferentemente, dependiendo del idioma: -100, 100-, (100) o [100].

**Fechas**

- A la hora de traducir las fechas, hay una serie de consideraciones y diferencias basadas en el idioma. Estos incluyen el formato de fecha, separador, el uso de mayúsculas y los ceros al inicio. También hay diferencias entre las fechas completas y las numéricas.
  - He aquí agunos ejemplos de diferentes formatos de fecha:
    - Inglés británico (dd/mm/aaaa): 1st January, 2022
    - Inglés estadounidense (mm/dd/aaaa): January 1st, 2022
    - Chino (aaa-mm-dd): 2022 年 1 月 1 日
    - Francés (dd/mm/aaaa): 1er janvier 2022
    - Italian (dd/mm/yyyy): 1o gennaio 2022
    - Alemán (dd/mm/aaaa): 1. Januar 2022

**Divisas**

- Traducir divisas puede ser un desafío, debido a los diferentes formatos, convenciones y conversiones. Como regla general, mantenga las mismas divisas que se mencionan en el texto original. Puede añadir su divisa local y poner su conversión entre paréntesis, para ayudar a su comprensión.
- Las principales diferencias en la escritura de divisas en diferentes idiomas incluyen la colocación de símbolos, comas decimales frente a puntos decimales, espacio, y siglas frente a descripciones completas.
  - Colocación de símbolos: $100 o 100 $
  - Comas decimales o puntos decimales: 100,50 $ o 100.50$
  - Espacio: 100$ o 100 $
  - Abreviaturas, siglas o símbolos: 100 $ o 100 USD

**Unidades de medición**

- Como regla general, mantenga las mismas unidades de medición que se mencionan en el texto original. Si su país utiliza un sistema diferente, puede incluir la conversión entre corchetes.
- Aparte de la conversión de unidades de medición, también es importante señalar las diferencias en la forma en que los idiomas abordan estas unidades. La diferencia principal es el espacio entre el número y la unidad, que puede ser diferente, en función del idioma. Como por ejemplo, 100kB o 100 kB, 50 ºF o

## Conclusión {#conclusion}

Traducir ethereum.org representa una gran oportunidad para aprender sobre los diferentes aspectos de Ethereum.

No traduzca con prisas y a lo loco. ¡No se complique la vida y diviértase!

Gracias por participar en el Programa de Traducción y ayudarnos a hacer que el sitio web sea accesible a un público más amplio. La comunidad Ethereum es global, y estamos contentos de que forme parte de ella.
