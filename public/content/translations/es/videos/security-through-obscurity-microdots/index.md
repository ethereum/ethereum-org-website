---
title: "Seguridad por oscuridad: uso de micropuntos para almacenar secretos"
description: "Presentación de un enfoque poco convencional para la custodia de claves utilizando tecnología física de micropuntos, ofuscando frases semilla en imágenes impresas invisibles a simple vista."
lang: es
youtubeId: "k9Dfg19JPEw"
uploadDate: 2024-11-15
duration: "0:09:55"
educationLevel: intermediate
topic:
  - "privacidad-y-seguridad"
  - "privacidad"
  - "autenticación"
format: presentation
author: Ethereum Foundation
breadcrumb: "Seguridad con micropuntos"
---

Una charla relámpago de **jseam** en la Devcon SEA que explora un enfoque poco convencional para la custodia de claves utilizando tecnología física de micropuntos, históricamente utilizada en el espionaje para ofuscar frases semilla en imágenes impresas que son prácticamente invisibles a simple vista.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=k9Dfg19JPEw) publicada por la Fundación Ethereum. Ha sido ligeramente editada para facilitar su lectura.*

#### ¿Por qué micropuntos? (0:00) {#why-microdots-000}

Hola a todos, bienvenidos a Tailandia. En mi charla, voy a hablar sobre los micropuntos: qué son exactamente, por qué los querrían y cómo pueden hacerlos en realidad. Tengo algunas muestras, así que después de la charla pueden echarles un vistazo.

Hay muchas preguntas sobre la seguridad operativa (OpSec) y cómo se pueden ocultar las frases semilla. Muchos de los procesos existentes son totalmente digitales. Pero, ¿y si existieran procesos físicos? ¿Y si se pudieran ofuscar las cosas? La custodia de claves sigue siendo un gran problema. Tenemos el intercambio de secretos, la recuperación social... pero sé que muchas personas del mundo cripto son un poco asociales, por lo que la recuperación social podría ser difícil.

Miren este gráfico: ahora mismo estamos viviendo la epidemia de la soledad. Así que la custodia de claves y la recuperación social van a ser problemas enormes. ¿Y si existieran enfoques físicos para ofuscar la información?

#### La historia de la esteganografía con micropuntos (2:00) {#the-history-of-microdot-steganography-200}

Esta es una técnica de esteganografía llamada micropuntos. La razón por la que muestro esto hoy es porque históricamente se ha utilizado en el espionaje. El objetivo es, esencialmente, ocultar mensajes a simple vista.

Toda la documentación al respecto es muy limitada. Probablemente le pregunten a Claude y les diga: "Lo siento, no hay información para ti". Yo mismo estuve aplicando ingeniería inversa a esta información. Las diapositivas lo documentan todo. No podré cubrir cada detalle, pero repasaré las partes interesantes. También he creado un repositorio en GitHub que documenta los procesos.

#### Fotografía analógica para la seguridad (3:30) {#analog-photography-for-security-330}

Vamos a revivir la fotografía analógica para este caso de uso. ¿Por qué analógica? Básicamente, no hay ninguna posibilidad de que alguien piratee una cámara analógica a menos que se la roben físicamente.

Uno de los principales problemas de la fotografía analógica es el ISO. En una cámara digital, esto no es un gran problema: se puede ajustar. Pero con la película, el ISO es una función de los granos de la película. Esto se convierte en un problema cuando se quiere miniaturizar la imagen. Cuanto menor sea el ISO, más pequeños serán los granos en general.

Hay dos fases. Primero, se toma una foto, se revela y se fija. La segunda fase es donde, en lugar de ampliar la imagen, hacemos lo contrario: la reducimos a escala microscópica.

#### El proceso británico (5:00) {#the-british-process-500}

Así es como se hace. Escriben su frase semilla. Normalmente, un tutorial de MetaMask les pide que escriban la frase semilla, pero luego, ¿dónde la guardan? Esta es una forma: toman una foto de la frase semilla, enrollan la película y la revelan. Lo interesante es que todos estos son metales pesados, metales de plata. No deberían tirarlos por el inodoro. Yo tiré un poco por accidente en mi inodoro, así que puede que haya cometido algún delito medioambiental. En el peor de los casos, probablemente corroerá mis tuberías.

Vuelven a tomar la foto y, tachán, tienen este puntito diminuto. Esto se llama el proceso británico.

#### El proceso dicromatado (7:00) {#the-dichromated-process-700}

El siguiente proceso, aún más extremo, es el proceso dicromatado. Así es como se pueden conseguir aumentos microscópicos de 1000x. El objetivo es encontrar un sustrato químico para esto, y aquí es donde entra lo que yo llamo el "jugo de naranja prohibido": el dicromato de amonio. Es muy tóxico. Derramé un poco y casi me muero al inhalar el polvo. Probablemente tenga que hacerme pruebas de detección de cáncer después de esto.

Proyectan la imagen y obtienen estos puntitos diminutos en un trozo de papel. Los puntos son tan pequeños que definitivamente necesitan un microscopio. El que usa el proceso británico se puede ver a simple vista, pero el proceso dicromatado produce algo realmente diminuto; ni siquiera estoy seguro de si es una imagen real sin un microscopio.

#### Preguntas y respuestas (8:00) {#qa-800}

¿Qué tan pequeños son los micropuntos? Se puede ver el que se hace con el proceso británico a simple vista, pero el proceso dicromatado produce algo realmente diminuto: definitivamente se necesita un microscopio. Es difícil saber si siquiera es una imagen real sin uno.

**Pregunta:** ¿Cuánto tiempo dura? ¿Tiene una vida media?

**jseam:** No es radiactivo. Lo descubriremos en 20 años.

**Pregunta:** ¿Has invertido el proceso (codificado y luego decodificado) para ver si puedes recuperarlo?

**jseam:** Creo que se podría. Probablemente necesitarías algún tipo de configuración de proyección óptica.

Muchas gracias. Si quieren ver las muestras, estaré por aquí. Gracias por su tiempo, chicos.