---
title: Diversidad de clientes
description: "Explicación detallada sobre la importancia de la diversidad de clientes en Ethereum."
lang: es
sidebarDepth: 2
---

El software ejecutado por el cliente, controla el comportamiento de un nodo de Ethereum. Hay diferentes niveles de producción de clientes de Ethereum, cada uno de ellos desarrollado y mantenido en varios idiomas por diferentes equipos. Los clientes han sido construidos con especificaciones similares que permiten la comunicación entre ellos, compartir rasgos comunes y ofrecer una experiencia al cliente similar. No obstante, en estos momentos, la distribución de clientes en los nodos no es del todo uniforme como para que el reforzamiento de la red opere a su máximo potencial. Idóneamente, los usuarios se dividen de manera uniforme a través de varios clientes para generar tanta diversidad de clientes como sea posible en la red.

## Requisitos previos {#prerequisites}

Si aún no entiende qué son los nodos y los clientes, consulte [nodos y clientes](/developers/docs/nodes-and-clients/). Las capas de [ejecución](/glossary/#execution-layer) y [consenso](/glossary/#consensus-layer) se definen en el glosario.

## ¿Por qué existen múltiples clientes? {#why-multiple-clients}

La existencia de clientes múltiples, desarrollados y mantenidos de manera independiente se debe a que la diversidad de clientes permite que la red sea más resiliente frente a ataques o errores. Los clientes múltiples son una baza singular para Ethereum. Otras cadenas de bloques dependen de la infalibilidad de un solo cliente. Sin embargo, no basta con tener múltiples clientes disponibles; tienen que ser adoptados por la comunidad y el total de nodos activos debe distribuirse de forma relativamente equitativa entre ellos.

## ¿Por qué es tan importante la diversidad de clientes? {#client-diversity-importance}

Para garantizar el buen estado de una red descentralizada, es vital contar con varios clientes desarrollados y mantenidos de manera independiente. Entendamos por qué.

### Errores {#bugs}

Un error producido en un solo cliente es menos arriesgado para la red cuando se focaliza en una minoría de los nodos de Ethereum. Al haber una distribución equitativa de los nodos entre varios clientes, la probabilidad de que la mayoría de los clientes se vean afectados por una misma incidencia se reduce. Esto trae como resultado que la red sea más robusta.

### Resiliencia frente a los ataques {#resilience}

La diversidad de clientes también ofrece una mayor resiliencia frente a los ataques. Por ejemplo, es poco probable que un ataque que [engañe a un cliente particular](https://twitter.com/vdWijden/status/1437712249926393858) para que siga una rama particular de la cadena tenga éxito, porque es poco probable que otros clientes sean explotables de la misma manera y la cadena canónica permanezca intacta. La poca diversidad de clientes aumenta el riesgo de hackeos dirigidos al cliente dominante. Se ha probado que la diversidad de clientes es una forma de defensa de vital importancia ante ataques maliciosos contra la red. Por ejemplo, el ataque de servicios denegados de Shanghai de 2016 tuvo lugar debido a que los atacantes lograron forzar al cliente dominante (Geth), haciéndolo ejecutar una operación de disco ralentizado i/o decenas de miles de veces por bloque. Gracias a que clientes alternativos se encontraban en línea sin compartir los puntos débiles, Ethereum pudo resistir el ataque y continuar operando mientras se lograban reparar los fallos en Geth.

### Finalidad de la prueba de participación {#finality}

Un error en un cliente de consenso con más del 33 % de los nodos de Ethereum podría impedir que la capa de consenso finalizara, lo que significa que los usuarios no podrían confiar en que las transacciones no se revirtieran o cambiarían en algún momento. Esto podría ser bastante problemático para muchas de las aplicaciones contruidas en Ethereum, especialmente las DeFi.

<Emoji text="🚨" className="me-4" /> Peor aún, un error crítico en un cliente con una mayoría de dos tercios podría hacer que la cadena <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">se divida y finalice incorrectamente</a>, lo que llevaría a que un gran conjunto de validadores se quedara atascado en una cadena no válida. Si los validadores quisieran reincorporarse a la cadena correcta, se verían afectados por recortes o por un lento y costoso proceso de retirada y reactivación voluntaria. La magnitud de los recortes aumenta en función del número de nodos culpables, con un máximo de dos tercios de la mayoría (32 ETH) recortados.

A pesar de que es poco probable que se den estas situaciones, el ecosistema de Ethereum puede mitigar dichos riesgos igualando la distribución de clientes a través de los nodos activos. Idóneamente, ningún cliente de consenso podría alcanzar una participación del 33 % del total de los nodos.

### Responsabilidad compartida {#responsibility}

La tenencia de clientes mayoritarios también conlleva un costo humano. Esto supondría una sobrecarga de estrés y responsabilidades a un equipo de desarrollo a pequeña escala. Mientras haya menos diversidad de clientes, mayor será la carga de responsabilidades adjudicadas a los desarrolladores a cargo del cliente mayoritario. Distribuir la responsabilidad entre múltiples equipos favorece el bienestar tanto de los nodos de la red de Ethereum como de las personas involucradas.

## Diversidad de clientes actual {#current-client-diversity}

### Clientes de ejecución {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Clientes de consenso {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Otros", value: 0.07 }
]}
/>

Este diagrama puede estar desactualizado. Visite [ethernodes.org](https://ethernodes.org) y [clientdiversity.org](https://clientdiversity.org) para obtener información actualizada.

Los dos gráficos circulares de arriba muestran instantáneas de la diversidad de clientes actual para las capas de ejecución y de consenso (en el momento de la redacción, en octubre de 2025). La diversidad de clientes ha mejorado con los años, y la capa de ejecución ha visto una reducción en el dominio de [Geth](https://geth.ethereum.org/), con [Nethermind](https://www.nethermind.io/nethermind-client) en un cercano segundo lugar, [Besu](https://besu.hyperledger.org/) en tercero y [Erigon](https://github.com/ledgerwatch/erigon) en cuarto, mientras que otros clientes comprenden menos del 3 % de la red. El cliente más utilizado en la capa de consenso, [Lighthouse](https://lighthouse.sigmaprime.io/), está bastante cerca del segundo más utilizado. [Prysm](https://prysmaticlabs.com/#projects) y [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) representan ~31 % y ~14 % respectivamente, y otros clientes se usan con poca frecuencia.

Los datos de la capa de ejecución se obtuvieron de [supermajority.info](https://supermajority.info/) el 26 de octubre de 2025. Los datos de los clientes de consenso se obtuvieron de [Michael Sproul](https://github.com/sigp/blockprint). Los datos de clientes de consenso son más difíciles de obtener, porque los clientes de la capa de consenso no siempre tienen rastros inequívocos que se pueden utilizar para identificarlos. Los datos se generaron utilizando un algoritmo de clasificación que a veces confunde a algunos de los clientes minoritarios (consulte [aquí](https://twitter.com/sproulM_/status/1440512518242197516) para obtener más detalles). En el diagrama anterior, estas clasificaciones ambiguas se tratan con una etiqueta de «uno u otro» (p. ej., Nimbus/Teku). No obstante, es evidente que la mayoría de la red se ejecuta con Prysm. A pesar de que solo son capturas, los valores presentes en el diagrama ofrecen una visión generalizada del estado actual de la diversidad de clientes.

Los datos actualizados sobre la diversidad de clientes para la capa de consenso ya están disponibles en [clientdiversity.org](https://clientdiversity.org/).

## Capa de ejecución {#execution-layer}

Hasta el momento, el foco de la discusión sobre la diversidad de clientes se centraba en la capa de consenso. Sin embargo, el cliente de ejecución [Geth](https://geth.ethereum.org) representa actualmente alrededor del 85 % de todos los nodos. Estos son porcentajes críticos, tanto para el cliente de consenso como para el de ejecución. Por ejemplo, un error en Geth que afecte el manejo de las transacciones o un error en la construcción de la carga útil de ejecución podría generar una finalización de transacciones problemática o con errores para los clientes de consenso. Así pues, Ethereum podría ser mucho más saludable con una distribución más equitativa de clientes de ejecución, en donde, idóneamente, no haya ningún cliente con más del 33 % de la participación en la red.

## Usar un cliente minoritario {#use-minority-client}

Abordar la diversidad de clientes requiere algo más que la elección de clientes minoritarios por parte de usuarios individuales: requiere que los grupos de validadores y las instituciones, como las principales dapps y plataformas de intercambio, también cambien de clientes. A pesar de ello, todos los usuarios pueden participar en el proceso de reequilibrar las disparidades actuales y normalizar el uso de todo el software disponible de Ethereum. Tras La Fusión, todos los operadores de nodo deberán ejecutar un cliente de ejecución y un cliente de consenso. Escoger alguna de las combinaciones de clientes sugeridas a continuación, ayudará a aumentar la diversidad de clientes.

### Clientes de ejecución {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Clientes de consenso {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Los usuarios técnicos pueden acelerar este proceso con tutoriales y documentación relacionada a clientes minoritarios, invitando a otros operadores de nodos a migrar alejándose de los clientes dominantes. Hay guías disponibles para cambiar a un cliente de consenso minoritario en [clientdiversity.org](https://clientdiversity.org/).

## Paneles de diversidad de clientes {#client-diversity-dashboards}

Hay varios paneles que ofrecen estadísticas en tiempo real sobre la diversidad de clientes en las capas de consenso y ejecución.

**Capa de consenso:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Capa de ejecución:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Lecturas adicionales {#further-reading}

- [Diversidad de clientes en la capa de consenso de Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [La Fusión de Ethereum: ¡Use el cliente mayoritario bajo su propio riesgo!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 de marzo de 2022_
- [La importancia de la diversidad de clientes](https://our.status.im/the-importance-of-client-diversity/)
- [Lista de servicios de nodos de Ethereum](https://ethereumnodes.com/)
- [Los «cinco porqués» del problema de la diversidad de clientes](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Diversidad en Ethereum y cómo resolverla (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Temas relacionados {#related-topics}

- [Ejecutar un nodo de Ethereum](/run-a-node/)
- [Nodos y clientes](/developers/docs/nodes-and-clients/)
