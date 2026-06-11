---
title: PeerDAS
description: Aprende sobre PeerDAS como parte de la actualización Fusaka del protocolo Ethereum
lang: es
authors: ["Nixo", "Mario Havel"]
---

El protocolo [Ethereum](/) está experimentando su actualización de escalabilidad más significativa desde la [introducción de las transacciones de blob con EIP-4844](/roadmap/danksharding/). Como parte de la [actualización Fusaka](/roadmap/fusaka/), PeerDAS introduce una nueva forma de manejar los datos de los blobs, ofreciendo aproximadamente un aumento de un orden de magnitud en la capacidad de **[disponibilidad de datos (DA)](/developers/docs/data-availability/)** para las capa 2 (l2).

[Más sobre la hoja de ruta de escalabilidad de blobs](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Escalabilidad {#scalability}

La visión de Ethereum es ser una plataforma neutral, segura y descentralizada disponible para todos en el mundo. A medida que crece el uso de la red, esto requiere equilibrar el trilema de la escala, la seguridad y la descentralización de la red. Si Ethereum simplemente aumentara los datos manejados por la red dentro de su diseño actual, correría el riesgo de sobrecargar los [nodos de los que Ethereum depende para su descentralización](/developers/docs/nodes-and-clients/). La escalabilidad requiere un diseño de mecanismos riguroso que minimice las concesiones.

Una de las estrategias para lograr este objetivo es permitir un ecosistema diverso de soluciones de escalabilidad de capa 2 en lugar de procesar todas las transacciones en la Red principal de [capa 1 (l1)](/glossary/#layer-1). Las [capa 2 (l2)](/glossary/#layer-2) o [rollup](/glossary#rollups) procesan transacciones en sus propias cadenas separadas y usan Ethereum para verificación y seguridad. Publicar solo los compromisos críticos para la seguridad y comprimir las cargas útiles permite a las l2 usar la capacidad de DA de Ethereum de manera más eficiente. A su vez, la l1 transporta menos datos sin comprometer las garantías de seguridad, mientras que las l2 incorporan a más usuarios a costos de gas más bajos. Inicialmente, las l2 publicaban datos como `calldata` en transacciones ordinarias, lo que competía con las transacciones de la l1 por el gas y era poco práctico para la disponibilidad de datos masivos.

## Proto-Danksharding {#proto-danksharding}

El primer gran paso hacia la escalabilidad de las l2 fue la actualización Dencun, que introdujo [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Esta actualización creó un nuevo tipo de datos especializado para los rollup llamado blobs. Los [blobs](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), u objetos binarios grandes, son piezas efímeras de datos arbitrarios que no necesitan ejecución de la EVM y que los nodos almacenan solo por un tiempo limitado. Este procesamiento más eficiente permitió a las l2 publicar más datos en Ethereum y escalar aún más. 

A pesar de tener ya grandes beneficios para la escalabilidad, el uso de blobs es solo una parte del objetivo final. En el protocolo actual, cada nodo de la red todavía necesita descargar cada blob. El cuello de botella se convierte en el ancho de banda requerido de los nodos individuales, y la cantidad de datos que deben descargarse aumenta directamente con un mayor número de blobs. 

Ethereum no compromete la descentralización, y el ancho de banda es uno de los ajustes más sensibles. Incluso con una computación potente ampliamente disponible para cualquiera que pueda pagarla, las [limitaciones de ancho de banda de subida](https://www.speedtest.net/global-index) incluso en ciudades altamente urbanizadas de naciones desarrolladas (como [Alemania](https://www.speedtest.net/global-index/germany), [Bélgica](https://www.speedtest.net/global-index/belgium), [Australia](https://www.speedtest.net/global-index/australia) o los [Estados Unidos](https://www.speedtest.net/global-index/united-states)) podrían restringir a los nodos a solo poder ejecutarse desde centros de datos si los requisitos de ancho de banda no se ajustan cuidadosamente.

Los operadores de nodos tienen requisitos de ancho de banda y espacio en disco cada vez mayores a medida que aumentan los blobs. El tamaño y la cantidad de blobs están limitados por estas restricciones. Cada blob puede transportar hasta 128 kb de datos con un promedio de 6 blobs por bloque. Este fue solo el primer paso hacia un diseño futuro que utiliza los blobs de una manera aún más eficiente.

## Muestreo de disponibilidad de datos {#das}

La [disponibilidad de datos](/developers/docs/data-availability/) es la garantía de que todos los datos necesarios para validar de forma independiente la cadena son accesibles para todos los participantes de la red. Asegura que los datos se han publicado completamente y se pueden utilizar para verificar sin confianza el nuevo estado de la cadena o las transacciones entrantes. 

Los blobs de Ethereum proporcionan una sólida garantía de disponibilidad de datos que asegura la seguridad de las l2. Para hacer esto, los nodos de Ethereum necesitan descargar y almacenar los blobs en su totalidad. Pero, ¿qué pasaría si pudiéramos distribuir los blobs en la red de manera más eficiente y evitar esta limitación? 

Un enfoque diferente para almacenar los datos y asegurar su disponibilidad es el **muestreo de disponibilidad de datos (DAS)**. En lugar de que cada computadora que ejecuta Ethereum almacene completamente cada blob, DAS introduce una división del trabajo descentralizada. Rompe la carga de procesar los datos distribuyendo tareas más pequeñas y manejables a través de toda la red de nodos. Los blobs se dividen en partes y cada nodo solo descarga unas pocas partes utilizando un mecanismo para una distribución aleatoria uniforme en todos los nodos. 

Esto introduce un nuevo problema: probar la disponibilidad y la integridad de los datos. ¿Cómo puede la red garantizar que los datos están disponibles y que todos son correctos cuando los nodos individuales solo tienen pequeñas partes? ¡Un nodo malicioso podría servir datos falsos y romper fácilmente las sólidas garantías de disponibilidad de datos! Aquí es donde la criptografía viene a ayudar. 

Para asegurar la integridad de los datos, EIP-4844 ya se implementó con compromisos KZG. Estas son pruebas criptográficas creadas cuando se agrega un nuevo blob a la red. Se incluye una pequeña prueba en cada bloque, y los nodos pueden verificar que los blobs recibidos corresponden al compromiso KZG del bloque.

DAS es un mecanismo que se basa en esto y asegura que los datos sean correctos y estén disponibles. El muestreo es un proceso en el que un nodo consulta solo una pequeña parte de los datos y la verifica contra el compromiso. KZG es un esquema de compromiso polinómico, lo que significa que cualquier punto individual en la curva polinómica puede ser verificado. Al verificar solo un par de puntos en el polinomio, el cliente que realiza el muestreo puede tener una fuerte garantía probabilística de que los datos están disponibles. 

## PeerDAS {#peer-das-2}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) es una propuesta específica que implementa el mecanismo DAS en Ethereum, marcando probablemente la mayor actualización desde La Fusión. PeerDAS está diseñado para extender los datos de los blobs, dividiéndolos en columnas y distribuyendo un subconjunto a los nodos.

Ethereum toma prestadas algunas matemáticas ingeniosas para lograr esto: aplica la codificación de borrado al estilo Reed-Solomon a los datos de los blobs. Los datos de los blobs se representan como un polinomio cuyos coeficientes codifican los datos, luego evalúan ese polinomio en puntos adicionales para crear un blob extendido, duplicando el número de evaluaciones. Esta redundancia añadida permite la recuperación de borrado: incluso si faltan algunas evaluaciones, el blob original se puede reconstruir siempre que al menos la mitad de los datos totales, incluidas las piezas extendidas, estén disponibles.

![Extended polynomial](./polynomial.png)

En realidad, este polinomio tiene miles de coeficientes. Los compromisos KZG son valores de unos pocos bytes, algo así como un hash, conocidos por todos los nodos. Cada nodo que tenga suficientes puntos de datos puede [reconstruir eficientemente un conjunto completo de datos de blobs](https://arxiv.org/abs/2207.11079). 

> Dato curioso: la misma técnica de codificación fue utilizada por los DVD. Si rayabas un DVD, el reproductor aún podía leerlo gracias a la codificación Reed-Solomon que agrega las piezas faltantes del polinomio. 

Históricamente, los datos en las cadenas de bloques, ya sean bloques o blobs, se transmitían a todos los nodos. Con el enfoque de división y muestreo de PeerDAS, ya no es necesario transmitir todo a todos. Después de Fusaka, la red de la capa de consenso se organiza en temas/subredes del protocolo gossip: las columnas de blobs se asignan a subredes específicas, y cada nodo se suscribe a subconjuntos predeterminados y custodia solo esas piezas.

Con PeerDAS, los datos extendidos de los blobs se dividen en 128 piezas llamadas columnas. Los datos se distribuyen a estos nodos a través de un protocolo gossip dedicado en subredes específicas a las que se suscriben. Cada nodo regular en la red participa en al menos 8 subredes de columnas elegidas al azar. Recibir datos de solo 8 de 128 subredes significa que este nodo predeterminado recibe solo 1/16 de todos los datos, pero debido a que los datos se extendieron, esto es 1/8 de los datos originales. 

Esto permite un nuevo límite teórico de escalabilidad de 8 veces el esquema actual de "todos descargan todo". Con los nodos suscribiéndose a diferentes subredes aleatorias que sirven columnas de blobs, la probabilidad es muy alta de que estén distribuidos uniformemente y, por lo tanto, cada pieza de datos exista en algún lugar de la red. A los nodos que ejecutan validadores se les requiere suscribirse a más subredes con cada validador que ejecutan.

> Cada nodo tiene un ID único generado aleatoriamente, que normalmente sirve como su identidad pública para las conexiones. En PeerDAS, este número se utiliza para determinar el conjunto aleatorio de subredes a las que tiene que suscribirse, lo que resulta en una distribución aleatoria uniforme de todos los datos de los blobs.

Una vez que un nodo reconstruye con éxito los datos originales, redistribuye las columnas recuperadas de vuelta a la red, curando activamente cualquier brecha de datos y mejorando la resiliencia general del sistema. Los nodos conectados a validadores con un saldo combinado ≥4096 ETH deben ser un supernodo y, por lo tanto, deben suscribirse a todas las subredes de columnas de datos y custodiar todas las columnas. Estos supernodos curarán continuamente las brechas de datos. La naturaleza probabilísticamente autocurativa del protocolo permite fuertes garantías de disponibilidad sin limitar a los operadores domésticos que solo tienen porciones de los datos. 

![Nodes subscribing to columns distributed via subnets](./subnets.png)

La disponibilidad de datos puede ser confirmada por cualquier nodo que tenga solo un pequeño subconjunto de los datos de los blobs gracias al mecanismo de muestreo descrito anteriormente. Esta disponibilidad se hace cumplir: los validadores deben seguir nuevas reglas de elección de bifurcación, lo que significa que solo aceptarán y votarán por bloques después de haber verificado la disponibilidad de los datos.

El impacto directo en los usuarios (particularmente los usuarios de l2) son tarifas más bajas. Con 8 veces más espacio para los datos de los rollup, las operaciones de los usuarios en su cadena se vuelven aún más baratas con el tiempo. Pero las tarifas más bajas después de Fusaka tomarán tiempo y dependerán de los BPO.

## Solo parámetros de blob (BPO) {#bpo}

La red teóricamente podrá procesar 8 veces más blobs, pero los aumentos de blobs son un cambio que debe probarse adecuadamente y ejecutarse de manera segura y gradual. Las redes de prueba proporcionan suficiente confianza para desplegar las características en la Red principal, pero necesitamos asegurar la estabilidad de la red p2p antes de habilitar un número significativamente mayor de blobs. 

Para aumentar gradualmente el número objetivo de blobs por bloque sin sobrecargar la red, Fusaka introduce las bifurcaciones de **[solo parámetros de blob (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. A diferencia de las bifurcaciones regulares que necesitan una amplia coordinación del ecosistema, acuerdos y actualizaciones de software, los [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) son actualizaciones preprogramadas que aumentan el número máximo de blobs con el tiempo sin intervención.

Esto significa que inmediatamente después de que Fusaka se active y PeerDAS entre en funcionamiento, el número de blobs permanecerá sin cambios. El número de blobs comenzará a duplicarse cada pocas semanas hasta alcanzar un máximo de 48, mientras los desarrolladores monitorean para asegurar que el mecanismo esté funcionando como se espera y no esté teniendo efectos adversos en los nodos que ejecutan la red.

## Direcciones futuras {#future-directions}

PeerDAS es solo un paso [hacia una mayor visión de escalabilidad de FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), o danksharding. Mientras que PeerDAS utiliza codificación de borrado 1D para cada blob individualmente, el danksharding completo utilizará un esquema de codificación de borrado 2D más completo en toda la matriz de datos de los blobs. Extender los datos en dos dimensiones crea propiedades de redundancia aún más fuertes y una reconstrucción y verificación más eficientes. La realización de FullDAS requerirá optimizaciones sustanciales de la red y del protocolo, junto con investigación adicional.

## Lecturas adicionales {#further-reading}

- [PeerDAS: Muestreo de disponibilidad de datos entre pares por Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Una documentación del PeerDAS de Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Probando la seguridad de PeerDAS sin el AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik sobre PeerDAS, su impacto y las pruebas de Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)