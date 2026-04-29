---
title: "¿Qué es la prueba de trabajo?"
description: "Una explicación para principiantes del mecanismo de consenso de prueba de trabajo (PoW), que incluye cómo los mineros resuelven acertijos criptográficos para validar transacciones y asegurar la red de la cadena de bloques."
lang: es
youtubeId: "3EUAcxhuoU4"
uploadDate: 2019-02-22
duration: "0:05:31"
educationLevel: beginner
topic:
  - "consenso"
  - "pow"
format: explainer
author: Binance Academy
breadcrumb: "Prueba de trabajo"
---

Una explicación de **Binance Academy** que cubre el mecanismo de consenso de prueba de trabajo (PoW), incluyendo sus orígenes, cómo los mineros compiten para resolver acertijos criptográficos y cómo asegura la red de la cadena de bloques.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=3EUAcxhuoU4) publicada por Binance Academy. Ha sido ligeramente editada para facilitar su lectura.*

#### Orígenes de la prueba de trabajo (0:00) {#origins-of-proof-of-work-000}

Originalmente datado en 1993, el concepto de prueba de trabajo se desarrolló para prevenir ataques de denegación de servicio y otros abusos de servicio como el spam en una red, al requerir algo de trabajo por parte del usuario del servicio, lo que generalmente significa tiempo de procesamiento por parte de una computadora.

En 2009, Bitcoin introdujo una forma innovadora de usar la prueba de trabajo como algoritmo de consenso para validar transacciones y transmitir nuevos bloques a la cadena de bloques. Desde entonces, se ha extendido hasta convertirse en un algoritmo de consenso ampliamente utilizado en muchas criptomonedas.

#### Cómo funciona la prueba de trabajo (0:33) {#how-proof-of-work-works-033}

En resumen, los mineros en una red compiten entre sí para resolver acertijos computacionales complejos. Estos acertijos son difíciles de resolver pero fáciles de verificar una vez que alguien encuentra la solución correcta.

Una vez que un minero ha encontrado la solución al acertijo, puede transmitir el bloque a la red, donde todos los demás mineros verificarán que la solución sea correcta.

#### Ejemplo de minería de Bitcoin (0:56) {#bitcoin-mining-example-056}

Bitcoin es un sistema basado en una cadena de bloques mantenido por el trabajo colectivo de nodos descentralizados. Algunos de estos nodos se conocen como mineros y son responsables de agregar nuevos bloques a la cadena de bloques.

Para hacerlo, los mineros deben intentar adivinar un número pseudoaleatorio conocido como nonce. Este número, cuando se combina con los datos proporcionados en el bloque y se pasa a través de una función hash, debe producir un resultado que coincida con ciertas condiciones dadas; por ejemplo, un hash que comience con cuatro ceros.

Cuando se encuentra un resultado coincidente, los otros nodos verifican la validez del resultado, y el nodo minero es recompensado con la recompensa de bloque. Por lo tanto, es imposible agregar un nuevo bloque a la cadena principal sin encontrar primero un nonce válido, lo que a su vez genera la solución para ese bloque específico, llamado hash del bloque.

#### Por qué se llama "prueba de trabajo" (1:46) {#why-its-called-proof-of-work-146}

Cada bloque validado contiene un hash de bloque que representa el trabajo realizado por el minero. Es por esto que se llama prueba de trabajo.

#### Beneficios de seguridad (1:54) {#security-benefits-154}

La prueba de trabajo ayuda a proteger la red contra numerosos ataques diferentes. Un ataque exitoso requeriría mucha potencia computacional y mucho tiempo para hacer los cálculos. Por lo tanto, sería ineficiente ya que el costo incurrido sería mayor que las posibles recompensas por atacar la red.

#### Limitaciones (2:10) {#limitations-210}

Un problema con la prueba de trabajo es que la minería requiere hardware informático costoso que consume una gran cantidad de energía. Si bien los complicados cálculos del algoritmo garantizan la seguridad de la red, estos cálculos no se pueden utilizar más allá de eso.

#### Mirando hacia el futuro (2:25) {#looking-ahead-225}

Si bien la prueba de trabajo puede no ser la solución más eficiente, sigue siendo uno de los métodos más populares para alcanzar el consenso en las cadenas de bloques. Ya existen métodos y enfoques alternativos que intentan resolver estos problemas, pero solo el tiempo dirá qué método será el sucesor de la prueba de trabajo.