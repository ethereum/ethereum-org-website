---
title: Cómo traducir
lang: es
description: Instrucciones sobre cómo usar Crowdin para traducir ethereum.org
---

# Cómo traducir {#how-to-translate}

## Guía visual {#visual-guide}

Para quienes aprenden mejor observando, vean la guía paso a paso de Luka para comenzar en Crowdin. También podrán encontrar los mismos pasos por escrito en la siguiente sección.

<YouTube id="Ii7bYhanLs4" />

## Guía por escrito {#written-guide}

### Únase a nuestro proyecto en Crowdin {#join-project}

Deberá iniciar sesión en su cuenta de Crowdin o registrarse si aún no tiene una. Para registrarse solo necesita una cuenta de correo electrónico y una contraseña.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Únase al proyecto
</ButtonLink>

### Abra su idioma {#open-language}

Tras iniciar sesión en Crowdin, verá la descripción de un proyecto y la lista de todos los idiomas disponibles. Cada idioma contiene información sobre la cantidad total de palabras por traducir y un resumen de cuánto contenido se ha tanto traducido como aprobado en un idioma específico.

Abra el idioma al que quiera traducir para ver la lista de archivos disponibles para su traducción.

![Lista de idiomas en Crowdin](./list-of-languages.png)

### Encuentre un documento en el cual trabajar {#find-document}

El sitio web se divide en una serie de documentos y lotes de contenido. Puede ver el progreso de cada documento en la parte derecha. Si el progreso de una traducción está por debajo del 100 %, ¡ayúdenos a terminarla!

¿No ve su idioma en la lista de idiomas? [Abra una incidencia](https://github.com/ethereum/ethereum-org-website/issues/new/choose) o pregunte en nuestro [Discord](/discord/),

![Archivos traducidos y no traducidos en Crowdin](./crowdin-files.png)

Un apunte sobre las versiones de contenido: utilizamos "cubos de contenido" dentro de Crowdin para que el contenido de máxima prioridad se publique primero. Cuando seleccione un idioma (como el [filipino](https://crowdin.com/project/ethereum-org/fil#), por ejemplo) verá carpetas para cada versión del sitio («v2.1», «v2.», etc.). Homepage", "2. Essentials", "3. Exploring", etc.).

Le recomendamos que traduzca en el orden numérico (1 → 2 → 3 → R) para asegurar que las páginas de mayor impacto sean traducidas primero.

[Más información sobre los cubos de contenido ethereum.org](/contributing/translation-program/content-buckets/)

### Traduce {#translate}

Despues de que selecciones el archivo que tu quieres traducir, el se abrirá en el editor online. Si nunca antes ha usado Crowdin, puede leer esta pequeña guía para aprender lo básico.

![Editor en línea de Crowdin](./online-editor.png)

**_1 – Barra lateral izquierda_**

- Sin traducir (en rojo) – texto que aún no ha sido traducido. Estas son las frases que tiene que traducir.
- Traducido (en verde) – texto que ya ha sido traducido pero que aún no ha sido revisado. Le invitamos a sugerir traducciones alternativas o votar en las que ya existen usando los botones «+» y «-» que aparecen en el editor.
- Aprobado (marcado con un tic) – texto que ha sido revisado y se muestra actualmente en el sitio web.

También puede usar los botones de la parte superior para buscar cadenas específicas, filtrarlas por su estado o cambiar la vista.

**_2 – Área de edición_**

Área principal de traducción – el texto original se muestra arriba junto con contexto adicional y capturas de pantalla (si las hay). Para sugerir una nueva traducción debe escribirla en el campo «Enter translation here» y hacer clic en «Save».

También puede encontrar traducciones existentes del enunciado en otros idiomas en esta sección, así como coincidencias en la memoria de traducción y sugerencias del motor de traducción automática.

**_3 – Barra lateral derecha_**

Aquí es donde puede escribir comentarios, encontrar traducciones similares y buscar términos. La vista predeterminada muestra los comentarios y permite a los traductores comunicarse, plantear problemas o reportar traducciones incorrectas.

Los botones de la parte superior le permiten cambiar a la sección de coincidencias de traducciones, donde puede buscar traducciones existentes en la memoria de traducción, y al glosario, que contiene descripciones de las traducciones recomendadas de términos clave.

¿Quiere saber más? No dude en consultar la [documentación sobre el uso del editor en línea de Crowdin](https://support.crowdin.com/online-editor/)

### Proceso de revisión {#review-process}

Una vez que complete la traducción (es decir, cuando todos los archivos de un lote de contenido indiquen un 100%), nuestro servicio de traducción profesional revisará (y editará personalmente) el contenido. Cuando la revisión esté lista (cuando el progreso de la revisión sea 100 %), añadiremos la traducción al sitio web.

<InfoBanner shouldCenter emoji=":warning:">
  No utilice la traducción automática para traducir el proyecto. Todas las traducciones serán revisadas antes de ser añadidas al sitio web. Si sus traducciones resultan ser traducciones automáticas, serán rechazadas y los colaboradores que utilicen ltraducción automática posiblemente serán eliminados del proyecto.
</InfoBanner>

### Contáctenos {#get-in-touch}

¿Tiene alguna pregunta? ¿O quiere colaborar con nuestro equipo y otros traductores? Envíe un mensaje al canal #translations de nuestro servidor [Discord de ethereum.org](/discord/)

También puede contactarnos a través de nuestro correo electrónico translations@ethereum.org.

¡Gracias por participar en el programa de traducción de ethereum.org!
