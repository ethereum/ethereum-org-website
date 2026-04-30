---
title: "Función hash — ETH.BUILD"
description: "Una demostración de las funciones hash criptográficas utilizando la herramienta educativa ETH.BUILD. Aprenda cómo funcionan las funciones hash y por qué son fundamentales para el modelo de integridad de datos y cuentas de Ethereum."
lang: es
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Funciones hash (ETH.BUILD)"
---

Un tutorial de **Austin Griffith** que demuestra cómo funcionan las funciones hash criptográficas utilizando la herramienta de programación visual ETH.BUILD, cubriendo el determinismo, la salida de longitud fija, las propiedades unidireccionales y los árboles de Merkle.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=QJ010l-pBpE) publicada por Austin Griffith. Ha sido ligeramente editada para facilitar su lectura.*

### Introducción a las funciones hash (0:00) {#introduction-to-hash-functions-000}

Este es el primer video de una serie llamada ETH.BUILD. Puede ir a eth.build para usar esta herramienta, pero es solo para jugar y tener una idea de cómo funcionan las cosas al construir en Ethereum.

El primer módulo que vamos a ver es una función hash. ¿Qué diablos es una función hash? Bueno, es algo así como una huella dactilar. Tienes una entrada (puede ser cualquier cosa), pero por ahora solo usaremos el texto "hello world". En el otro lado vas a tener una salida, y esa salida es una cadena hexadecimal de 64 caracteres. Dice 66 caracteres debido al prefijo "0x", pero en realidad es una cadena hexadecimal de 64 caracteres.

### Visualización de hashes como colores (0:50) {#visualizing-hashes-as-colors-050}

Si observas el formato hexadecimal, se parece un poco a un color, y podría ser más fácil describir lo que estamos viendo aquí si simplemente lo convertimos en un color. Así que lo que vamos a hacer es tomar los primeros seis caracteres de cualquier cadena y mostrarla como un color. Si miramos eso, vemos que es un bonito color púrpura.

Veamos de qué color es mi nombre: ahí lo tenemos, un bonito verde bosque. Ahora volvamos a "hello world": es ese púrpura de nuevo.

### Determinismo y salida de longitud fija (1:38) {#determinism-and-fixed-length-output-138}

Lo que acabamos de descubrir es que es determinista. Básicamente, sea lo que sea que pongamos como entrada, siempre vamos a obtener lo mismo en el otro lado.

La segunda propiedad es que podrías introducir cualquier cosa de cualquier tamaño arbitrario. Puedo aporrear el teclado y ver cómo cambia el color, pero esa cadena se mantiene en esa longitud de 66 caracteres. No importa lo que pongas aquí, incluso un archivo, podría soltar este archivo de Leo, mi hijo, y ponerlo como un hash y obtener un bonito color naranja. Luego podría soltar un documento de texto con una lista de palabras BIP y es de este bonito azul claro. Si traigo a Leo de vuelta, ¿adivina de qué color va a ser? Sabemos que va a ser ese naranja. Obtienes esta huella dactilar determinista de la cosa que introdujiste.

### Propiedad unidireccional (2:37) {#one-directional-property-237}

La siguiente propiedad más importante es que es unidireccional. Si vuelvo a poner "hello world", vamos a obtener este hash "4717". Si tomamos ese hash y se lo enviamos a alguien y le decimos "aquí está el hash de mi secreto; si puedes adivinar mi secreto, te daré cien dólares", no van a poder ni acercarse.

Digamos que el hash comienza con "4717" y empiezan a indagar tratando de encontrar una coincidencia. No puedes simplemente cambiar pequeños caracteres y acercarte: o lo consigues o no. Básicamente tienes que adivinarlo por fuerza bruta. Si por casualidad adivinan "hello world", obtendrán la respuesta, pero si no lo adivinan, nunca lo van a conseguir. No hay forma de saber si te estás acercando.

Descubrirás con la criptografía que a veces es frustrante como desarrollador porque o funciona o no funciona: no obtienes ninguna pista sobre si te estás acercando. Pero eso es algo bueno. Esa es la propiedad que queremos de una función hash.

### Resumen de las propiedades de la función hash (3:43) {#summary-of-hash-function-properties-343}

Así que tenemos: cualquier cosa de cualquier tamaño puede introducirse en una función hash, y va a escupir una huella dactilar hexadecimal exacta de 64 caracteres de lo que son esos datos. Es determinista. Es unidireccional: no puedes volver en la otra dirección. Es muy fácil hacer un hash, pero muy difícil adivinar el secreto del hash.

### Árboles de Merkle y combinación de hashes (4:06) {#merkle-trees-and-combining-hashes-406}

Lo que podemos hacer con esto son cosas realmente geniales, como un árbol de Merkle. Tenemos nuestras tres entradas y podríamos unirlas. Podemos combinar todos esos hashes y luego aplicar un hash a la combinación.

Este color de aquí, ese púrpura, representa el hash de todos estos hashes. Si cambio "hello world" a "hello world one", ese púrpura va a cambiar. Cualquier pequeño cambio en cualquiera de estas entradas hará que el hash final cambie. Puedes introducir todo tipo de datos de muchas formas diferentes (incluso tener un árbol de hashes, un árbol de Merkle, o tener un montón de bloques en fila), y este hash final se basará en todas estas cosas. Si cualquier pequeña cosa cambia en algún punto del camino, el hash final va a cambiar.

### Conclusión clave (5:53) {#key-takeaway-553}

La conclusión clave es que una función hash es básicamente como una huella dactilar. Si escribo algo, me va a dar de forma determinista la salida que espero. Eso es una función hash: bienvenido a ETH.BUILD. Hagamos cosas geniales y aprendamos mucho en el camino.