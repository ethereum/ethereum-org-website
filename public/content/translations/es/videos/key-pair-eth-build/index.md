---
title: "Par de claves — ETH.BUILD"
description: "Una demostración de los pares de claves pública-privada utilizando la herramienta educativa ETH.BUILD. Comprenda cómo los pares de claves criptográficas aseguran las cuentas de Ethereum y permiten la firma de transacciones."
lang: es
youtubeId: "9LtBDy67Tho"
uploadDate: 2021-01-14
duration: "0:04:05"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Pares de claves (ETH.BUILD)"
---

Un tutorial de **Austin Griffith** que demuestra cómo funcionan los pares de claves pública-privada utilizando la herramienta de programación visual ETH.BUILD, cubriendo la generación de la clave privada, la derivación de la clave pública, la firma de mensajes y la recuperación de firmas.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=9LtBDy67Tho) publicada por Austin Griffith. Ha sido ligeramente editada para facilitar su lectura.*

### La clave privada (0:00) {#the-private-key-000}

En el primer video usamos un hash, y los hashes serán importantes en el futuro. Pero la siguiente pieza más importante es un par de claves. La pieza más importante de un par de claves es la clave privada. Vamos a generar una: es básicamente una cadena hexadecimal aleatoria de 64 caracteres, del mismo tamaño que el hash con el que acabamos de trabajar.

Comienzas con eso como tu clave privada, y luego, usando criptografía de curva elíptica (puedes buscarlo en Wikipedia como misión secundaria), derivamos una clave pública. Así que ahora tenemos una clave privada y una clave pública. Acabamos de generar una clave privada de la nada, y la clave pública nos da una dirección. Aquí es donde la gente realmente podría enviar dinero. Cuando alguien dice "envía a mi dirección de Ethereum", se refiere a esto.

Si quisiera crear una cuenta en Wells Fargo, tendría que conducir hasta el banco y darles un montón de información. Tomaría un tiempo. Pero para generar una cuenta dentro de un sistema criptográfico como este, donde puedo enviar y recibir dinero, simplemente genero esta clave privada. Esta clave privada hexadecimal de 64 caracteres deriva todo lo demás.

### Firma y recuperación de mensajes (1:54) {#signing-and-recovering-messages-154}

Hay una propiedad realmente interesante sobre este par de claves que deberíamos explorar, y es la firma y recuperación de mensajes. Básicamente, tomas tu clave privada y la usas para firmar algún tipo de mensaje. Escribamos un mensaje: "el oso está pegajoso con miel".

Introducimos eso como nuestro mensaje, y con la firma automática habilitada nos devuelve una firma. Al igual que el hash, nuestra firma consiste básicamente en tomar el mensaje y nuestra clave privada y firmar algo. Lo que obtenemos de eso es una firma.

Puedo enviar esto al mundo (podría enviarlo públicamente a todos): esta cadena de firma junto con el mensaje. Lo que cualquiera puede hacer con matemáticas es verificar que fui yo específicamente quien lo firmó.

### Recuperación de la dirección del firmante (3:17) {#recovering-the-signers-address-317}

Déjame mostrarte cómo funciona eso. Usamos un método de "recuperación" (recover). Necesitamos dos entradas: el mensaje ("el oso está pegajoso con miel") y la firma. Lo que sale de eso es la dirección que se usó para firmarlo. Podemos ver visualmente que la cuenta firmó ese mensaje usando los identicones de Blockie.

No hay forma de alterar esto. Si alguien cambia incluso una sola palabra (como cambiar "oso" por "tejón"), todo cambia. Incluso con la misma firma, un mensaje diferente arroja una dirección diferente, no la correcta.

Este mensaje no puede ser alterado. Podríamos incluir una marca de tiempo allí: podríamos decir "en este día predigo que algo sucederá", firmarlo, publicar la firma y el mensaje, y cualquiera por el resto del tiempo puede probar matemáticamente que firmaste ese mensaje en ese momento.

### La propiedad clave de un par de claves (4:58) {#the-key-property-of-a-key-pair-458}

Esta es la propiedad clave de un par de claves. Un par de claves generado a partir de nada más que una cadena aleatoria hexadecimal de 64 caracteres se puede usar para firmar un mensaje, y luego ese mensaje se puede recuperar.

- Clave privada + mensaje = firma
- Firma + mensaje = dirección pública

Podemos firmar datos con nuestra clave privada, y la gente puede probar que fuimos nosotros quienes los firmamos. Esa será una pieza importante para el siguiente paso.