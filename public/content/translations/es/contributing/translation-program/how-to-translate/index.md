---
title: Cómo traducir
lang: es
description: Instrucciones para usar Crowdin para traducir ethereum.org
---

## Guía visual {#visual-guide}

Para aquellos que aprenden mejor de forma visual, vean a Luka explicar cómo configurarse con Crowdin. Alternativamente, pueden encontrar los mismos pasos en formato escrito en la siguiente sección.

<VideoWatch slug="crowdin-translation-guide" />

## Guía escrita {#written-guide}

### Únete a nuestro proyecto en Crowdin {#join-project}

Deberás iniciar sesión en tu cuenta de Crowdin o registrarte si aún no tienes una. Todo lo que se requiere para registrarse es una cuenta de correo electrónico y una contraseña.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Unirse al proyecto
</ButtonLink>

### Abre tu idioma {#open-language}

Después de iniciar sesión en Crowdin, verás una descripción del proyecto y una lista de todos los idiomas disponibles.
Cada idioma también contiene información sobre la cantidad total de palabras traducibles y una descripción general de cuánto contenido se ha traducido y aprobado en un idioma específico.

Abre el idioma al que deseas traducir para ver la lista de archivos disponibles para su traducción.

![List of languages in Crowdin](./list-of-languages.png)

### Encuentra un documento en el que trabajar {#find-document}

El contenido del sitio web se divide en varios documentos y grupos de contenido. Puedes comprobar el progreso de cada documento a la derecha; si el progreso de la traducción es inferior al 100 %, ¡por favor, contribuye!

¿No ves tu idioma en la lista? [Abre un problema (issue)](https://github.com/ethereum/ethereum-org-website/issues/new/choose) o pregunta en nuestro [Discord](https://discord.gg/ethereum-org)

![Translated and untranslated files in Crowdin](./crowdin-files.png)

Una nota sobre los grupos de contenido: utilizamos «grupos de contenido» dentro de Crowdin para publicar primero el contenido de mayor prioridad. Cuando revises un idioma, por ejemplo, el [filipino](https://crowdin.com/project/ethereum-org/fil#), verás carpetas para el grupo de contenido («1. Homepage», «2. Essentials», «3. Exploring», etc.).

Te animamos a traducir en este orden numérico (1 → 2 → 3 → ⋯) para garantizar que las páginas de mayor impacto se traduzcan primero.

### Traducir {#translate}

Después de seleccionar el archivo que deseas traducir, se abrirá en el editor en línea. Si nunca antes has usado Crowdin, puedes usar esta guía rápida para repasar los conceptos básicos.

![Crowdin online editor](./online-editor.png)

**_1 – Barra lateral izquierda_**

- Sin traducir (rojo): texto en el que aún no se ha trabajado. Estas son las cadenas que deberías estar traduciendo.
- Traducido (verde): texto que ya ha sido traducido, pero que aún no ha sido revisado. Te invitamos a sugerir traducciones alternativas o a votar por las existentes utilizando los botones «+» y «-» en el editor.
- Aprobado (marca de verificación): texto que ya ha sido revisado y que actualmente está publicado en el sitio web.

También puedes usar los botones de la parte superior para buscar cadenas específicas, filtrarlas por estado o cambiar la vista.

**_2 – Área del editor_**

El área principal de traducción: el texto de origen se muestra en la parte superior, con contexto adicional y capturas de pantalla, si están disponibles.
Para sugerir una nueva traducción, ingresa tu traducción en el campo «Enter translation here» (Ingresar traducción aquí) y haz clic en Guardar.

En esta sección también puedes encontrar traducciones existentes de la cadena y traducciones a otros idiomas, así como coincidencias de la memoria de traducción y sugerencias de traducción automática.

**_3 – Barra lateral derecha_**

Aquí es donde puedes encontrar comentarios, entradas de la memoria de traducción y entradas del glosario. La vista predeterminada muestra los comentarios y permite a los traductores comunicarse, plantear problemas o informar sobre traducciones incorrectas.

Al usar los botones de la parte superior, también puedes cambiar a la Memoria de traducción, donde puedes buscar traducciones existentes, o al Glosario, que contiene descripciones y traducciones estándar de términos clave.

¿Quieres saber más? No dudes en consultar la [documentación sobre el uso del editor en línea de Crowdin](https://support.crowdin.com/online-editor/)

### Proceso de revisión {#review-process}

Una vez que hayas completado la traducción (es decir, todos los archivos de un grupo de contenido muestran el 100 %), nuestro servicio de traducción profesional revisará (y potencialmente editará) el contenido. Una vez que se complete la revisión (es decir, el progreso de la revisión sea del 100 %), lo agregaremos al sitio web.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Por favor, no utilices traducción automática para traducir el proyecto. Todas las traducciones serán revisadas antes de agregarse al sitio web. Si se descubre que tus traducciones sugeridas están traducidas automáticamente, serán descartadas y los colaboradores que utilicen la traducción automática con frecuencia serán eliminados del proyecto.
</AlertContent>
</Alert>

### Ponte en contacto {#get-in-touch}

¿Tienes alguna pregunta? ¿O quieres colaborar con nuestro equipo y otros traductores? Por favor, publica en el canal #translations de nuestro [servidor de Discord de ethereum.org](https://discord.gg/ethereum-org)

También puedes comunicarte con nosotros en translations@ethereum.org

¡Gracias por tu participación en el Programa de traducción de ethereum.org!