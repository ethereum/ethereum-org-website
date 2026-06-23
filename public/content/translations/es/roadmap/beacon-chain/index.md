---
title: La cadena de balizas
description: "Aprende sobre la cadena de balizas, la actualización que introdujo la prueba de participación en Ethereum."
lang: es
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - "La cadena de balizas introdujo la prueba de participación en el ecosistema de Ethereum."
  - "Se fusionó con la cadena original de prueba de trabajo de Ethereum en septiembre de 2022."
  - "La cadena de balizas introdujo la lógica de consenso y el protocolo de propagación de bloques (gossip) que ahora protege a Ethereum."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La cadena de balizas se lanzó el 1 de diciembre de 2020 y formalizó la prueba de participación como el mecanismo de consenso de Ethereum con la actualización de La Fusión el 15 de septiembre de 2022.
</UpgradeStatus>

## ¿Qué es la cadena de balizas? {#what-is-the-beacon-chain}

La cadena de balizas es el nombre de la cadena de bloques original de prueba de participación (PoS) que se lanzó en 2020. Se creó para garantizar que la lógica de consenso de prueba de participación fuera sólida y sostenible antes de habilitarla en la red principal de [Ethereum](/) (Mainnet). Por lo tanto, se ejecutó junto con el Ethereum original de prueba de trabajo (PoW). La cadena de balizas era una cadena de bloques "vacíos", pero apagar la prueba de trabajo y encender la prueba de participación en Ethereum requería instruir a la cadena de balizas para que aceptara datos de transacciones de los clientes de ejecución, los agrupara en bloques y luego los organizara en una cadena de bloques utilizando un mecanismo de consenso basado en prueba de participación. En ese mismo momento, los clientes originales de Ethereum apagaron su minería, propagación de bloques y lógica de consenso, entregando todo eso a la cadena de balizas. Este evento se conoció como [La Fusión](/roadmap/merge/). Una vez que ocurrió La Fusión, ya no había dos cadenas de bloques. En su lugar, solo había un Ethereum de prueba de participación, que ahora requiere dos clientes diferentes por nodo. La cadena de balizas es ahora la capa de consenso, una red entre pares de clientes de consenso que maneja la propagación de bloques y la lógica de consenso, mientras que los clientes originales forman la capa de ejecución, que es responsable de propagar y ejecutar transacciones, y de gestionar el estado de Ethereum. Las dos capas pueden comunicarse entre sí utilizando la API Engine.

## ¿Qué hace la cadena de balizas? {#what-does-the-beacon-chain-do}

La cadena de balizas es el nombre dado a un libro mayor de cuentas que dirigió y coordinó la red de [participantes (stakers)](/staking/) de Ethereum antes de que esos participantes comenzaran a validar bloques reales de Ethereum. Sin embargo, no procesa transacciones ni maneja interacciones de contratos inteligentes porque eso se está haciendo en la capa de ejecución.
La cadena de balizas es responsable de cosas como el manejo de bloques y atestaciones, la ejecución del algoritmo de elección de bifurcación y la gestión de recompensas y penalizaciones.
Lee más en nuestra [página de arquitectura de nodos](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Impacto de la cadena de balizas {#beacon-chain-features}

### Introducción del staking {#introducing-staking}

La cadena de balizas introdujo la [prueba de participación](/developers/docs/consensus-mechanisms/pos/) en Ethereum. Esto mantiene a Ethereum seguro y hace que los validadores ganen más ETH en el proceso. En la práctica, el staking implica depositar ETH en garantía para activar el software del validador. Como participante (staker), ejecutas el software que crea y valida nuevos bloques en la cadena.

El staking tiene un propósito similar al que solía tener la [minería](/developers/docs/consensus-mechanisms/pow/mining/), pero es diferente en muchos aspectos. La minería requería grandes gastos iniciales en forma de hardware potente y consumo de energía, lo que resultaba en economías de escala y promovía la centralización. La minería tampoco venía con ningún requisito de bloquear activos como colateral, lo que limitaba la capacidad del protocolo para castigar a los malos actores después de un ataque.

La transición a la prueba de participación hizo que Ethereum fuera significativamente más seguro y descentralizado en comparación con la prueba de trabajo. Cuantas más personas participen en la red, más descentralizada y segura contra ataques se vuelve.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Si estás interesado en convertirte en validador y ayudar a proteger Ethereum, [aprende más sobre el staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Preparación para la fragmentación (sharding) {#setting-up-for-sharding}

Desde que la cadena de balizas se fusionó con la red principal de Ethereum original, la comunidad de Ethereum comenzó a buscar formas de escalar la red.

La prueba de participación tiene la ventaja de contar con un registro de todos los productores de bloques aprobados en un momento dado, cada uno con ETH en participación. Este registro prepara el escenario para la capacidad de "divide y vencerás", pero dividiendo de manera confiable las responsabilidades específicas de la red.

Esta responsabilidad contrasta con la prueba de trabajo, donde los mineros no tienen ninguna obligación con la red y podrían dejar de minar y apagar el software de su nodo permanentemente en un instante sin repercusiones. Tampoco hay un registro de proponentes de bloques conocidos ni una forma confiable de dividir las responsabilidades de la red de manera segura.

[Más sobre la fragmentación](/roadmap/danksharding/)

## Relación entre las actualizaciones {#relationship-between-upgrades}

Todas las actualizaciones de Ethereum están algo interrelacionadas. Así que recapitulemos cómo la cadena de balizas afecta a las otras actualizaciones.

### La cadena de balizas y La Fusión {#merge-and-beacon-chain}

Al principio, la cadena de balizas existía de forma separada de la red principal de Ethereum, pero se fusionaron en 2022.

<ButtonLink href="/roadmap/merge/">
  La Fusión
</ButtonLink>

### Fragmentos y la cadena de balizas {#shards-and-beacon-chain}

La fragmentación solo puede entrar de forma segura en el ecosistema de Ethereum con un mecanismo de consenso de prueba de participación en funcionamiento. La cadena de balizas introdujo el staking, que se "fusionó" con la red principal (Mainnet), allanando el camino para que la fragmentación ayude a escalar aún más a Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Cadenas de fragmentos
</ButtonLink>

## Lecturas adicionales {#further-reading}

- [Más sobre la arquitectura de nodos](/developers/docs/nodes-and-clients/node-architecture)
- [Más sobre la prueba de participación](/developers/docs/consensus-mechanisms/pos)