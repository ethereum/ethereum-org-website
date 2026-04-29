---
title: "Más allá del protocolo de Ethereum: separación proponente-constructor"
description: "Una presentación sobre la separación proponente-constructor (PBS), un patrón de diseño que separa los roles de construcción de bloques y propuesta de bloques en Ethereum."
lang: es
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "hoja de ruta"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "Explicación de PBS"
---

Esta presentación explica cómo la producción de bloques de Ethereum ha evolucionado de un modelo simple a una sofisticada cadena de suministro que involucra validadores, constructores, buscadores y retransmisores (relays). Barnabé Monnot de la Fundación Ethereum explica por qué existe la separación proponente-constructor (PBS), cómo los retransmisores de MEV-Boost median la relación entre proponentes y constructores, y qué soluciones dentro del protocolo se están explorando para reducir las dependencias de confianza y mejorar la resistencia a la censura, la distribución de MEV y la descentralización de los validadores.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=u8XvkTrjITs) publicada por CBER Forum. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:00) {#introduction-000}

Mi nombre es Barnabé Monnot. Voy a hablar un poco sobre lo que está sucediendo fuera del protocolo, y en particular sobre el concepto de separación proponente-constructor y cómo se opera con retransmisores y mucha infraestructura fuera de la cadena.

Me gusta pensar en el protocolo como un objeto abstracto que tiene ciertos poderes. Uno de los poderes que tiene el protocolo es que puede otorgar derechos a ciertos participantes. Hemos visto en la charla anterior que el protocolo faculta a los validadores para realizar tareas de consenso, pero no es lo único que hacen: también tenemos que empaquetar bloques con transacciones. A eso lo llamamos tareas de ejecución, y en eso quiero centrarme en esta charla.

#### Por qué los validadores usan constructores (0:46) {#why-validators-use-builders-046}

Lo interesante es que, aunque el protocolo es el que origina estos derechos y se los otorga a los validadores, lo que observamos en la práctica es que muchos validadores eligen no ejercer el derecho ellos mismos. Eligen ceder el derecho a otra persona para que lo ejerza en su nombre. Y a esa "otra persona" la conocemos en Ethereum como constructores.

Así que lo que observamos es que, aunque los validadores continúan realizando estas tareas de consenso por sí mismos, deciden pasar las tareas de ejecución a los constructores. En realidad, es un mercado bastante significativo. Hoy en día, alrededor del 90 % de los bloques son construidos por constructores externos, y ese ha sido el caso desde aproximadamente diciembre de 2022, tres meses después de La Fusión. La mediana del pago del constructor al validador es de unos 120 dólares por bloque. Se paga un millón de dólares diariamente, y cada 12 segundos existe la posibilidad de que este mercado llegue a algún tipo de acuerdo entre un proponente y un constructor.

Hoy quiero discutir por qué los validadores usan constructores, de dónde proviene esa relación (voy a introducir un poco sobre MEV y los buscadores en el camino), luego les contaré cómo se media esta relación, y hablaré sobre los retransmisores que existen hoy y las soluciones dentro del protocolo en las que estamos pensando. También quiero dar una perspectiva más amplia, porque es fácil ver estas imágenes y pensar "oh, esto es muy aterrador, ¿qué pasa con la descentralización?". Quiero darles la sensación de que estas son concesiones que se están haciendo, pero en mi opinión se hacen en la dirección correcta.

#### El modelo ingenuo y el MEV (3:04) {#the-naive-model-and-mev-304}

Se puede pensar en un modelo ingenuo de producción de bloques donde el validador es seleccionado de acuerdo con un proceso de selección de líder, y tiene que hacer un bloque que contenga una lista de transacciones de la mempool. En el modelo más ingenuo, en realidad solo hay dos partes: un validador que escucha la mempool, y cuando es su turno de hacer un bloque, extrae las transacciones que pagan más tarifas y las agrega, generalmente usando algoritmos de empaquetado no muy sofisticados.

Lo que se ha observado de manera bastante dramática en los últimos cinco años es que esto le da mucho poder al productor, en particular el poder de la última mirada. Ven lo que los usuarios quieren hacer, por ejemplo, ven que el usuario quiere hacer un intercambio de algo, y pueden usar esa información para extraer ganancias para sí mismos.

En el mejor de los casos, esta ganancia proviene de la función natural del mercado, como el arbitraje. En el peor de los casos, puede salir directamente del bolsillo del usuario, como en el caso de los ataques sándwich. Por ejemplo, un usuario hace una orden de intercambio para el token A por el token B en algún mercado como Uniswap. Esa transacción creará un desequilibrio de precios con otro mercado implementado en la misma cadena. El productor puede ver la transacción pendiente e insertar su propia transacción que hace un intercambio en la otra dirección en un mercado diferente, embolsándose el arbitraje en el proceso.

Esto realmente le da mucho poder al productor y hace que la posición de ser el productor de bloques sea extremadamente valiosa. Este privilegio del productor es algo que ahora llamamos **valor máximo extraíble (MEV)**.

#### El papel de los buscadores (5:43) {#the-role-of-searchers-543}

En la práctica, los productores pueden no saber dónde está el valor. Se pueden tener productores de bloques algo poco sofisticados: como se mencionó, cualquiera puede convertirse en validador siempre que tenga suficiente capital y sea capaz de ejecutar un nodo. En la práctica, puede que yo no sepa cómo hacer arbitraje ni nada sobre mercados financieros. Lo que querría es que alguien me dijera dónde están estas oportunidades: un mercado de personas compitiendo para decirme qué es lo mejor que puedo hacer como productor de bloques.

A estas entidades que son muy buenas encontrando oportunidades, las llamamos **buscadores**. Ellos sacan a la luz oportunidades para el productor de bloques. El buscador podría observar a un usuario haciendo un intercambio, ya sea a través de la mempool pública o a través de dark pools o canales privados, y luego comunicarle al validador: "Se está realizando un intercambio; si empaquetas este intercambio junto con este arbitraje en un paquete de transacciones atómicas e incluyes este paquete, entonces puedes ganar dinero con el arbitraje". Habrá muchos buscadores compitiendo para convencer al productor de bloques.

Este modelo funciona bien en la práctica si el buscador confía en que el productor mantendrá el paquete atómico. Es posible que hayan oído hablar recientemente de un ataque en Ethereum que costó 25 millones de dólares a un grupo de atacantes sándwich: la causa principal fue que el atacante logró romper la atomicidad de los paquetes, recibiendo los contenidos e intentando reorganizarlos y modificarlos. Esa es una propiedad muy importante que realmente solo se mantiene mientras se pueda confiar en que el productor no romperá esta atomicidad.

#### Por qué necesitamos constructores (8:16) {#why-we-need-builders-816}

¿Qué se hace si un productor no es de confianza? Después de La Fusión en Ethereum, tenemos participantes que hacen staking en solitario (alrededor del 6 % de la red) a quienes no conocemos. Los buscadores realmente no querrán enviar paquetes a estos proponentes de bloques porque es un poco demasiado peligroso.

Así que el diseño al que se llegó es: en lugar de que los buscadores comuniquen paquetes que el productor incluye en su bloque, simplemente haremos todo el bloque por ti. De esa manera, puedes simplemente firmar el bloque a ciegas: no necesitas saber qué hay allí, confías en que el constructor te está dando un buen bloque.

Ahora tienes esta cadena aún más profunda: el validador en un extremo, el usuario en el otro, y en el medio toda esta cadena de intermediarios que continúa volviéndose más densa con el tiempo. El constructor hace la parte de ejecución mientras que el validador hace el consenso.

#### Cómo funcionan los retransmisores de MEV-Boost (13:01) {#how-mev-boost-relays-work-1301}

Digamos que eres un proponente y quieres entrar en este mercado. Este servicio de producción de bloques es un problema clásico de intercambio justo: dos partes que intentan llegar a un acuerdo pero no confían la una en la otra. La literatura clásica te dice que no puedes hacer un intercambio justo sin un tercero de confianza.

Lo que usamos hoy como el tercero de confianza es lo que llamamos un **retransmisor** (relay): el retransmisor de MEV-Boost. MEV-Boost es el nombre del protocolo que media las interacciones entre constructores y validadores. El retransmisor se sitúa en el medio para asegurar que el acuerdo llegue a buen término por ambas partes.

El retransmisor tiene un par de roles. Primero, necesita validar la carga útil de un constructor: el retransmisor ve en claro el bloque que el constructor está haciendo y puede comprobar que es válido y puede ser propuesto a la red. Hay una variación llamada retransmisor optimista, donde el retransmisor no comprueba inmediatamente la validez, sino que pide al constructor un colateral en caso de que el bloque sea finalmente inválido.

Segundo, los constructores están haciendo ofertas intentando competir para convertirse en el constructor seleccionado por el validador. El retransmisor actúa como un reenviador de ofertas, enviando las ofertas al validador. Luego, en el último paso, una vez que el validador elige una de las ofertas del retransmisor (y el validador puede conectarse a tantos retransmisores como quiera), la firma, todavía sin saber cuáles son los contenidos del bloque, y envía de vuelta la oferta firmada al retransmisor. Dada esta oferta firmada, el retransmisor puede liberar el bloque a la red.

La economía de los retransmisores es complicada. Algunos son gratuitos, algo así como bienes públicos. Otros han desarrollado modelos de ingresos: el retransmisor Ultrasound, por ejemplo, tiene un "ajuste de oferta" donde toman la diferencia entre la mejor oferta y la segunda mejor como ingresos.

#### La confianza y el retransmisor (17:01) {#trust-and-the-relay-1701}

El retransmisor es el tercero de confianza en el sistema. Digamos que un retransmisor sirve un bloque inválido: la gente lo verá inmediatamente porque está firmado, y se desconectarán muy rápidamente de ese retransmisor. Incluso se puede difundir algún tipo de prueba de falla. En un plazo de cinco bloques, si el retransmisor no funciona bien, la gente dejará de confiar en él y simplemente se desconectará.

Así que se basa en la confianza, pero con la suposición de que puede ser reemplazado de manera algo rápida. Los retransmisores no son validadores: no necesariamente tienen una participación y no tienen que tener nada que ver con Ethereum. Podrían ser personas que conocemos y apreciamos hoy, pero mañana podría ser cualquiera.

#### Consagrar PBS en el protocolo (20:01) {#enshrining-pbs-in-the-protocol-2001}

Estamos intentando eliminar el estatus de tercero de confianza del retransmisor. Tenemos un tercero de confianza que nos gusta en Ethereum, y es el propio Ethereum. Se pueden diseñar soluciones dentro del protocolo que intenten esencialmente consagrar el rol del retransmisor y hacer que la dependencia de él sea opcional.

En este momento, el protocolo de Ethereum ve parte de lo que están haciendo los validadores, pero es completamente ciego a la red de constructores. Estamos intentando impulsarlo para que el protocolo de Ethereum se convierta en el tercero de confianza en la interacción entre el proponente y el constructor; en ese sentido, ya no necesitamos depender del retransmisor.

#### Restringir a los constructores, amplificar la descentralización (22:05) {#constraining-builders-amplifying-decentralization-2205}

La visión general es importante. En cada capa parece haber diferentes juegos en marcha y diferentes jugadores quitándose dinero unos a otros: ¿son estas las finanzas tradicionales de nuevo? Quiero argumentar que estas concesiones no provienen de un mal lugar. Intentan apoyarse en las propiedades de estos sistemas que creemos que son útiles para escalarlos y hacerlos más útiles.

Vitalik habló sobre una asimetría fundamental de los servicios que podría ofrecer una cadena de bloques. El consenso requiere un conjunto descentralizado muy grande de personas que mantengan el control. Pero algunos servicios realmente requieren que una persona haga bien el trabajo y que todos los demás verifiquen que el trabajo se hizo bien. Solo necesitamos un constructor para hacer un bloque, y luego todos pueden verificar que es válido.

Hoy en día hay claramente tres constructores dominantes: Beaver Build, Titan y rsync Builder. ¿Es ese un buen estado de las cosas? No realmente; podemos hacerlo mejor. Pero, ¿es realista imaginar que tendremos tantos constructores como validadores? Probablemente no.

Lo que realmente queremos es esta fina capa de validadores restringiendo y aprovechando el hecho de que hay partes de alto poder en el medio que pueden realizar tareas que no requieren suposiciones de mayoría honesta.

Algunas ideas para restringir a los constructores:

- **Listas de inclusión**: donde el validador le dice al constructor "tienes que incluir estas transacciones en tu bloque"
- **Construcción parcial de bloques**: dividir el bloque completo para que el constructor no tenga el monopolio sobre todo el espacio
- **Reducción de las dependencias de terceros**: consagrar el rol del retransmisor en el protocolo

Para amplificar la descentralización de los validadores:

- **Separación atestiguador-proponente**: en lugar de hacer que el validador sea el productor de bloques por defecto, elegir un conjunto diferente de personas para que se conviertan en productores de bloques y separar los roles
- **Mecanismos de staking mejorados**: el staking en Ethereum es un poco rudimentario hoy en día y puede mejorarse

#### Preguntas y cierre (27:03) {#questions-and-closing-2703}

Una pregunta de la audiencia: en el mundo de las finanzas tradicionales, el tiempo de liquidación se está reduciendo de dos días a un día. ¿Reducir el tiempo de liquidación de 12 segundos a un intervalo más corto solucionaría algunos de los problemas de front-running?

La gente está hablando de esto: lo llaman **preconfirmaciones**. La idea es que envías tu transacción y alguien te dice "estás dentro, a este precio, en ese estado". El problema es que no puedes liquidar más rápido de lo que se ejecuta el protocolo. No puedes obtener una liquidación de finalidad más rápida que 12 minutos. No puedes moverte más rápido que el tiempo de bloque.

Acortar el tiempo de bloque es difícil porque queremos mantener la capa de validadores lo más descentralizada posible, y acortarlo simplemente aumenta los requisitos de hardware.