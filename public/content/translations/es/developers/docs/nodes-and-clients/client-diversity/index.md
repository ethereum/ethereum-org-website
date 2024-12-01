---
title: Diversidad de clientes
description: Explicación detallada sobre la importancia de la diversidad de clientes en Ethereum.
lang: es
sidebarDepth: 2
---

El software ejecutado por el cliente, controla el comportamiento de un nodo de Ethereum. Hay diferentes niveles de producción de clientes de Ethereum, cada uno de ellos desarrollado y mantenido en varios idiomas por diferentes equipos. Los clientes han sido construidos con especificaciones similares que permiten la comunicación entre ellos, compartir rasgos comunes y ofrecer una experiencia al cliente similar. No obstante, en estos momentos, la distribución de clientes en los nodos no es del todo uniforme como para que el reforzamiento de la red opere a su máximo potencial. Idóneamente, los usuarios se dividen de manera uniforme a través de varios clientes para generar tanta diversidad de clientes como sea posible en la red.

## Prerrequisitos {#prerequisites}

Si aún quiere profundizar sobre qué son los nodos y clientes, acceda a la sección de [nodos y clientes](/developers/docs/nodes-and-clients/). Las capas de [ejecución](/glossary/#execution-layer) y [consenso](/glossary/#consensus-layer) se describen en el glosario.

## ¿Por qué existen múltiples clientes? {#why-multiple-clients}

La existencia de clientes múltiples, desarrollados y mantenidos de manera independiente se debe a que la diversidad de clientes permite que la red sea más resiliente frente a ataques o errores. Los clientes múltiples son una baza singular para Ethereum. Otras cadenas de bloques dependen de la infalibilidad de un solo cliente. Sin embargo, no es una tarea simple mantener múltiples clientes disponibles, ya que la comunidad debe adoptarlos y la cantidad de nodos disponibles deberá distribuirse lo más uniformemente posible entre ellos.

## ¿Por qué es tan importante la diversidad de clientes? {#client-diversity-importance}

Para garantizar el buen estado de una red descentralizada, es vital contar con varios clientes desarrollados y mantenidos de manera independiente. Entendamos por qué.

### Errores {#bugs}

Un error producido en un solo cliente es menos arriesgado para la red cuando se focaliza en una minoría de los nodos de Ethereum. Al haber una distribución equitativa de los nodos entre varios clientes, la probabilidad de que la mayoría de los clientes se vean afectados por una misma incidencia se reduce. Esto trae como resultado que la red sea más robusta.

### Resiliencia frente a los ataques {#resilience}

La diversidad de clientes también ofrece una mayor resiliencia frente a los ataques. Por ejemplo, si un ataque se dirige [a un cliente en particular](https://twitter.com/vdWijden/status/1437712249926393858) y a una ramificación específica de la cadena es poco probable que tenga éxito, ya que es muy improbable que otros clientes puedan verse afectados de la misma manera y que la cadena predilecta se mantenga incorrupta. La poca diversidad de clientes aumenta el riesgo de hackeos dirigidos al cliente dominante. Se ha probado que la diversidad de clientes es una forma de defensa de vital importancia ante ataques maliciosos contra la red. Por ejemplo, el ataque de servicios denegados de Shanghai de 2016 tuvo lugar debido a que los atacantes lograron forzar al cliente dominante (Geth), haciéndolo ejecutar una operación de disco ralentizado i/o decenas de miles de veces por bloque. Gracias a que clientes alternativos se encontraban en línea sin compartir los puntos débiles, Ethereum pudo resistir el ataque y continuar operando mientras se lograban reparar los fallos en Geth.

### Finalidad de la prueba de participación {#finality}

Un error en un cliente de consenso con más del 33 % de los nodos de Ethereum podría impedir que la capa de consenso finalizara, lo que significa que los usuarios no podrían confiar en que las transacciones no se revirtieran o cambiarían en algún momento. Esto podría ser bastante problemático para muchas de las aplicaciones contruidas en Ethereum, especialmente las DeFi.

<Emoji text="🚨" me="1rem" /> Peor aún, un error crítico en un cliente con dos tercios de mayoría haría que la cadena se <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">dividiera y finalizara de manera incorrecta</a>, haciendo que un gran número de validadores se vieran involucrados en una cadena inválida. Si los validadores quisieran reincorporarse a la cadena correcta, se verían afectados por recortes o por un lento y costoso proceso de retirada y reactivación voluntaria. La magnitud de los recortes aumenta en función del número de nodos culpables, con un máximo de dos tercios de la mayoría (32 ETH) recortados.

A pesar de que es poco probable que se den estas situaciones, el ecosistema de Ethereum puede mitigar dichos riesgos igualando la distribución de clientes a través de los nodos activos. Idóneamente, ningún cliente de consenso podría alcanzar una participación del 33 % del total de los nodos.

### Responsabilidad compartida {#responsibility}

La tenencia de clientes mayoritarios también conlleva un costo humano. Esto supondría una sobrecarga de estrés y responsabilidades a un equipo de desarrollo a pequeña escala. Mientras haya menos diversidad de clientes, mayor será la carga de responsabilidades adjudicadas a los desarrolladores a cargo del cliente mayoritario. Distribuir la responsabilidad entre múltiples equipos favorece el bienestar tanto de los nodos de la red de Ethereum como de las personas involucradas.

## Diversidad actual de clientes {#current-client-diversity}

![Gráfico que muestra la diversidad de clientes](./client-diversity.png) _Diagrama de datos de [ethernodes.org](https://ethernodes.org) y [clientdiversity.org](https://clientdiversity.org/)_

Los dos gráficos de la parte superior muestran capturas del estado actual de la diversidad de clientes para las capas de ejecución y consenso (en el momento de su redacción en enero de 2022). La capa de ejecución está abrumadoramente dominada por [Geth](https://geth.ethereum.org/), [Open Ethereum](https://openethereum.github.io/) en un lejano segundo lugar, [Erigon](https://github.com/ledgerwatch/erigon) en tercero y [Nethermind](https://nethermind.io/) en el cuarto, además de la participación de otros clientes cuya participación representa menos del 1 % en la red. En la capa de consenso, el cliente de usado con mayor frecuencia es [Prysm](https://prysmaticlabs.com/#projects). A pesar de no ser tan predominante como Geth, representa más del 60 % de la red. [Lighthouse](https://lighthouse.sigmaprime.io/) y [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) acaparan el 20 % y 14 % respectivamente, mientras que el uso del resto de los clientes es poco común.

Los datos de la capa de ejecución se obtuvieron de [Ethernodes](https://ethernodes.org) el 23 de enero de 2022. Los datos sobre la capa de consenso provienen de [Michael Sproul](https://github.com/sigp/blockprint). Los datos de clientes de consenso son más difíciles de obtener, porque los clientes de la capa de consenso no siempre tienen rastros inequívocos que se pueden utilizar para identificarlos. La información se ha creado gracias a un algoritmo de clasificación que en algunas ocasiones confunde a algunos de los clientes minoritarios (vea [aquí](https://twitter.com/sproulM_/status/1440512518242197516) para detalles adicionales). En el diagrama de la parte superior, estas clasificaciones ambiguas se indican con una etiqueta (p. ej.,: Nimbus/Teku). No obstante, es evidente que la mayoría de la red se ejecuta con Prysm. Los datos son una muestra de un determinado grupo de bloques (específicamente de los bloques baliza situados entre las ranuras 2048001 y 2164916) en los que el predominio de Prysm es relativamente mayor, sobrepasando el 68 %. A pesar de que solo son capturas, los valores presentes en el diagrama ofrecen una visión generalizada del estado actual de la diversidad de clientes.

Los datos actualizados de diversidad de clientes para la capa de consenso ahora están disponibles en [clientdiversity.org](https://clientdiversity.org/).

## Capa de ejecución {#execution-layer}

Hasta el momento, el foco de la discusión sobre la diversidad de clientes se centraba en la capa de consenso. Sin embargo, actualmente, el cliente de ejecución [Geth](https://geth.ethereum.org), se encuentra a cargo de cerca del 85 % del total de los nodos. Estos son porcentajes críticos, tanto para el cliente de consenso como para el de ejecución. Por ejemplo, un error en Geth que afecte el manejo de las transacciones o un error en la construcción de la carga útil de ejecución podría generar una finalización de transacciones problemática o con errores para los clientes de consenso. Así pues, Ethereum podría ser mucho más saludable con una distribución más equitativa de clientes de ejecución, en donde, idóneamente, no haya ningún cliente con más del 33 % de la participación en la red.

## Uso de clientes minoritarios {#use-minority-client}

Para abordar la diversidad de clientes y escoger un cliente minoritario no solo se necesitan usuarios individuales, sino también reservas de minería/validación e instituciones como grandes DApps e intercambios para intercambiar clientes también. A pesar de ello, todos los usuarios pueden participar en el proceso de reequilibrar las disparidades actuales y normalizar el uso de todo el software disponible de Ethereum. Tras La Fusión, todos los operadores de nodo deberán ejecutar un cliente de ejecución y un cliente de consenso. Escoger alguna de las combinaciones de clientes sugeridas a continuación, ayudará a aumentar la diversidad de clientes.

### Clientes de ejecución {#execution-clients}

[Besu](https://www.hyperledger.org/use/besu)

[Nethermind](https://downloads.nethermind.io/)

[Erigon](https://github.com/ledgerwatch/erigon)

[Go-Ethereum](https://geth.ethereum.org/)

### Clientes de consenso {#consensus-clients}

[Nimbus](https://nimbus.team/)

[Lighthouse](https://github.com/sigp/lighthouse)

[Teku](https://consensys.net/knowledge-base/ethereum-2/teku/)

[Lodestar](https://github.com/ChainSafe/lodestar)

[Prysm](https://docs.prylabs.network/docs/getting-started)

Los usuarios técnicos pueden acelerar este proceso con tutoriales y documentación relacionada a clientes minoritarios, invitando a otros operadores de nodos a migrar alejándose de los clientes dominantes. Las guías para migrar a un cliente de consenso minoritario están disponibles en [clientdiversity.org](https://clientdiversity.org/).

## Paneles de control de diversidad de clientes {#client-diversity-dashboards}

Hay varios paneles que ofrecen estadísticas en tiempo real sobre la diversidad de clientes en las capas de consenso y ejecución.

**Capa de consenso:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/) **/Capa de ejecución:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Más información {#further-reading}

- [Diversidad de clientes en la capa de consenso de Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Fusión de Ethereum: ejecute el cliente mayoritario bajo su propio riesgo!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html), _Dankrad Fiest, 24 de marzo de 2022_
- [La importancia de la diversidad de clientes](https://our.status.im/the-importance-of-client-diversity/)
- [Lista de servicios de nodos de Ethereum](https://ethereumnodes.com/)
- [Las cinco razones que explican el problema de la diversidad de clientes](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [La diversidad de Ethereum y cómo resolverla (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Temas relacionados {#related-topics}

- [Cómo ejecutar un nodo de Ethereum](/run-a-node/)
- [Nodos y clientes](/developers/docs/nodes-and-clients/)
