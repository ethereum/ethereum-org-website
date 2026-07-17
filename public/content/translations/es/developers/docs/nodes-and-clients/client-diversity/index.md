---
title: Diversidad de clientes
description: "Una explicación de alto nivel sobre la importancia de la diversidad de clientes de Ethereum."
lang: es
sidebarDepth: 2
---

El comportamiento de un nodo de [Ethereum](/) está controlado por el software de cliente que ejecuta. Existen varios clientes de Ethereum a nivel de producción, cada uno desarrollado y mantenido en diferentes lenguajes por equipos separados. Los clientes se construyen según una especificación común que garantiza que se comuniquen entre sí sin problemas, tengan la misma funcionalidad y proporcionen una experiencia de usuario equivalente. Sin embargo, en este momento la distribución de clientes entre los nodos no es lo suficientemente equitativa como para aprovechar al máximo el potencial de esta fortificación de la red. Idealmente, los usuarios se dividen de manera más o menos equitativa entre los distintos clientes para aportar la mayor diversidad de clientes posible a la red.

## Requisitos previos {#prerequisites}

Si aún no comprende qué son los nodos y los clientes, consulte [nodos y clientes](/developers/docs/nodes-and-clients/). Las capas de [ejecución](/glossary/#execution-layer) y [consenso](/glossary/#consensus-layer) se definen en el glosario.

## ¿Por qué hay múltiples clientes? {#why-multiple-clients}

Existen múltiples clientes desarrollados y mantenidos de forma independiente porque la diversidad de clientes hace que la red sea más resistente a ataques y errores. Tener múltiples clientes es una fortaleza exclusiva de Ethereum; otras cadenas de bloques dependen de la infalibilidad de un solo cliente. Sin embargo, no basta con tener múltiples clientes disponibles, la comunidad debe adoptarlos y los nodos activos totales deben distribuirse de manera relativamente uniforme entre ellos.

## ¿Por qué es importante la diversidad de clientes? {#client-diversity-importance}

Tener muchos clientes desarrollados y mantenidos de forma independiente es vital para la salud de una red descentralizada. Exploremos las razones.

### Errores {#bugs}

Un error en un cliente individual representa un riesgo menor para la red cuando este representa a una minoría de los nodos de Ethereum. Con una distribución de nodos más o menos uniforme entre muchos clientes, la probabilidad de que la mayoría de los clientes sufran un problema compartido es pequeña y, como resultado, la red es más robusta.

### Resistencia a los ataques {#resilience}

La diversidad de clientes también ofrece resistencia a los ataques. Por ejemplo, es poco probable que un ataque que [engañe a un cliente en particular](https://twitter.com/vdWijden/status/1437712249926393858) para que siga una rama específica de la cadena tenga éxito, porque es poco probable que otros clientes sean explotables de la misma manera y la cadena canónica permanece incorrupta. La baja diversidad de clientes aumenta el riesgo asociado con un hackeo al cliente dominante. La diversidad de clientes ya ha demostrado ser una defensa importante contra ataques maliciosos en la red; por ejemplo, el ataque de denegación de servicio de Shanghái en 2016 fue posible porque los atacantes lograron engañar al cliente dominante (Geth) para que ejecutara una operación lenta de entrada/salida de disco decenas de miles de veces por bloque. Debido a que también había clientes alternativos en línea que no compartían la vulnerabilidad, Ethereum pudo resistir el ataque y continuar operando mientras se solucionaba la vulnerabilidad en Geth.

### Finalidad de la prueba de participación (PoS) {#finality}

Un error en un cliente de consenso con más del 33% de los nodos de Ethereum podría impedir que la capa de consenso alcance la finalidad, lo que significa que los usuarios no podrían confiar en que las transacciones no se revertirían o cambiarían en algún momento. Esto sería muy problemático para muchas de las aplicaciones construidas sobre Ethereum, particularmente para las finanzas descentralizadas (DeFi).

<Emoji text="🚨" className="me-4" /> Peor aún, un error crítico en un cliente con una mayoría de dos tercios podría causar que la cadena se <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">divida y finalice incorrectamente</a>, lo que llevaría a un gran conjunto de validadores a quedarse atascados en una cadena no válida. Si desean volver a unirse a la cadena correcta, estos validadores se enfrentan a un recorte o a un retiro voluntario y reactivación lentos y costosos. La magnitud de un recorte aumenta proporcionalmente con el número de nodos culpables, siendo penalizada al máximo (32 ETH) una mayoría de dos tercios.

Aunque estos son escenarios poco probables, el ecosistema de Ethereum puede mitigar su riesgo equilibrando la distribución de clientes entre los nodos activos. Idealmente, ningún cliente de consenso alcanzaría jamás una participación del 33% del total de nodos.

### Responsabilidad compartida {#responsibility}

También hay un costo humano al tener clientes mayoritarios. Pone una tensión y responsabilidad excesivas sobre un pequeño equipo de desarrollo. Cuanto menor sea la diversidad de clientes, mayor será la carga de responsabilidad para los desarrolladores que mantienen el cliente mayoritario. Distribuir esta responsabilidad entre múltiples equipos es bueno tanto para la salud de la red de nodos de Ethereum como para su red de personas.

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
{ name: "Other", value: 0.07 }
]}
/>

Este diagrama puede estar desactualizado; visite [ethernodes.org](https://ethernodes.org) y [clientdiversity.org](https://clientdiversity.org) para obtener información actualizada.

Los dos gráficos circulares anteriores muestran instantáneas de la diversidad de clientes actual para las capas de ejecución y consenso (al momento de escribir este artículo en octubre de 2025). La diversidad de clientes ha mejorado a lo largo de los años, y la capa de ejecución ha visto una reducción en el dominio de [Geth](https://geth.ethereum.org/), con [Nethermind](https://www.nethermind.io/nethermind-client) en un cercano segundo lugar, [Besu](https://besu.hyperledger.org/) en tercero y [Erigon](https://github.com/ledgerwatch/erigon) en cuarto, con otros clientes que comprenden menos del 3% de la red. El cliente más utilizado en la capa de consenso, [Lighthouse](https://lighthouse.sigmaprime.io/), está bastante cerca del segundo más utilizado. [Prysm](https://prysmaticlabs.com/#projects) y [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) representan ~31% y ~14% respectivamente, y otros clientes rara vez se utilizan.

Los datos de la capa de ejecución se obtuvieron de [supermajority.info](https://supermajority.info/) el 26 de octubre de 2025. Los datos de los clientes de consenso se obtuvieron de [Michael Sproul](https://github.com/sigp/blockprint). Los datos de los clientes de consenso son más difíciles de obtener porque los clientes de la capa de consenso no siempre tienen rastros inequívocos que puedan usarse para identificarlos. Los datos se generaron utilizando un algoritmo de clasificación que a veces confunde a algunos de los clientes minoritarios (consulte [aquí](https://twitter.com/sproulM_/status/1440512518242197516) para obtener más detalles). En el diagrama anterior, estas clasificaciones ambiguas se tratan con una etiqueta de uno u otro (por ejemplo, Nimbus/Teku). Sin embargo, está claro que la mayoría de la red está ejecutando Prysm. A pesar de ser solo instantáneas, los valores en el diagrama proporcionan una buena idea general del estado actual de la diversidad de clientes.

Los datos actualizados de diversidad de clientes para la capa de consenso ahora están disponibles en [clientdiversity.org](https://clientdiversity.org/).

## Capa de ejecución {#execution-layer}

Hasta ahora, la conversación sobre la diversidad de clientes se ha centrado principalmente en la capa de consenso. Sin embargo, el cliente de ejecución [Geth](https://geth.ethereum.org) representa actualmente alrededor del 85% de todos los nodos. Este porcentaje es problemático por las mismas razones que para los clientes de consenso. Por ejemplo, un error en Geth que afecte el manejo de transacciones o la construcción de cargas útiles de ejecución podría llevar a que los clientes de consenso finalicen transacciones problemáticas o con errores. Por lo tanto, Ethereum sería más saludable con una distribución más uniforme de clientes de ejecución, idealmente sin que ningún cliente represente más del 33% de la red.

## Use un cliente minoritario {#use-minority-client}

Abordar la diversidad de clientes requiere más que usuarios individuales eligiendo clientes minoritarios: requiere que los grupos de validadores e instituciones como las principales aplicaciones descentralizadas (dapps) y los intercambios también cambien de clientes. Sin embargo, todos los usuarios pueden hacer su parte para corregir el desequilibrio actual y normalizar el uso de todo el software de Ethereum disponible. Después de La Fusión, todos los operadores de nodos deberán ejecutar un cliente de ejecución y un cliente de consenso. Elegir combinaciones de los clientes sugeridos a continuación ayudará a aumentar la diversidad de clientes.

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

Los usuarios técnicos pueden ayudar a acelerar este proceso escribiendo más tutoriales y documentación para clientes minoritarios y animando a sus compañeros operadores de nodos a migrar lejos de los clientes dominantes. Las guías para cambiar a un cliente de consenso minoritario están disponibles en [clientdiversity.org](https://clientdiversity.org/).

## Paneles de diversidad de clientes {#client-diversity-dashboards}

Varios paneles ofrecen estadísticas de diversidad de clientes en tiempo real para la capa de ejecución y de consenso.

**Capa de consenso:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Capa de ejecución:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Lecturas adicionales {#further-reading}

- [Diversidad de clientes en la capa de consenso de Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [La Fusión de Ethereum: ¡Ejecute el cliente mayoritario bajo su propio riesgo!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 de marzo de 2022_
- [Importancia de la diversidad de clientes](https://our.status.im/the-importance-of-client-diversity/)
- [Lista de servicios de nodos de Ethereum](https://ethereumnodes.com/)
- [Los "Cinco porqués" del problema de la diversidad de clientes](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Diversidad de Ethereum y cómo resolverla (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Temas relacionados {#related-topics}

- [Ejecutar un nodo de Ethereum](/run-a-node/)
- [Nodos y clientes](/developers/docs/nodes-and-clients/)
