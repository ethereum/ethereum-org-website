---
title: La cadena de baliza
description: 'Descubra todo lo relacionado con la Cadena de Baliza: la actualización que introdujo la prueba de participación en Ethereum.'
lang: es
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: La Cadena de Baliza introdujo la prueba de participación en el ecosistema de Ethereum.
summaryPoint2: Se fusionó con la cadena de prueba de trabajo original de Ethereum en septiembre de 2022.
summaryPoint3: La Cadena de Baliza introdujo la lógica de consenso y el protocolo de gossiping de bloques que ahora asegura Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La cadena de baliza enviada el 1 de diciembre de 2020 formalizó la prueba de participación como mecanismo de consenso de Ethereum con la actualización a La Fusión el 15 de septiembre de 2022.
</UpgradeStatus>

## ¿Qué es la cadena de baliza? {#what-is-the-beacon-chain}

La cadena de baliza es el nombre original de la cadena de bloques de la prueba de participación que fue lanzada en 2020. Fue creada para mostrar que la lógica de consenso de la prueba de participación era segura y sostenible, antes de habilitarla en la red principal de Ethereum. Por esta razón, estuvo funcionando paralelamente con la prueba de trabajo de Ethereum. La Cadena de Baliza fue una cadena de bloques 'vacios', pero al cambiar a prueba de trabajo y al cambiar a prueba de participación en Ethereum requiere instrucciones a la Cadena de Baliza para aceptar data de transacciones de clientes de ejecución, juntarlos en bloques y después organizarlos en la cadena de bloques usando un mecanismo de consenso usando una base prueba de participación. Al mismo tiempo, los clientes originales de Ethereum apagaron su minería, propagación de bloques y lógica de consenso, confiándolo todo a la cadena de baliza. A este evento se le denominó [La Fusión](/roadmap/merge/). Una vez producida La Fusión, ya no había dos cadenas de bloques. En lugar de ello, solo había una prueba de participación en Ethereum, que ahora requiere dos clientes diferentes por nodo. La cadena de baliza es ahora la capa de consenso, una red entre pares de clientes de consenso que maneja el bloque de intercambio de información y la lógica de consenso, mientras que los clientes originales forman la capa de ejecución, que es la responsable del intercambio de información y de la ejecución de transacciones, y de la gestión del estado de Ethereum. Las dos capas pueden comunicarse entre sí usando Engine API.

## ¿Qué hace la cadena de baliza? {#what-does-the-beacon-chain-do}

Cadena de baliza es el nombre que se le ha dado a un libro mayor de cuentas que dirigía y coordinaba la red de [participantes](/staking/) de Ethereum antes de que esos participantes comenzaran a validar bloques reales de Ethereum. No procesa transacciones ni maneja interacciones de contratos inteligentes, porque eso se esta haciendo a través de la capa de ejecución. La cadena de baliza es responsable de cosas como la gestión de bloques y certificaciones, de la ejecución del algoritmo de bifurcación y de la gestión de recompensas y penalizaciones. Lea más en nuestra [página de arquitectura de nodos](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## El impacto de la cadena de baliza {#beacon-chain-features}

### Introducción a la participación {#introducing-staking}

La cadena de baliza introdujo la [prueba de participación](/developers/docs/consensus-mechanisms/pos/) en Ethereum. Esta mantiene la seguridad de Ethereum y permite a los validadores obtener más ETH en el proceso. En la práctica, la participación supone comprometer ETH para poder activar el software de validación. Como participante, se encargará de ejecutar el software que crea y valida los nuevos bloques de la cadena.

El staking cumple un propósito similar al de la [minería](/developers/docs/consensus-mechanisms/pow/mining/), pero difiere en muchos aspectos. La minería requería de una inversión inicial significativa destinada a la adquisición de un productivo hardware y a cubrir los gastos de consumo energético, lo que derivó en economías de escala y en la promoción de la centralización. La minería tampoco requería la retención de activos colaterales, lo que limitaba los alcances del protocolo a castigar las acciones incorrectas solo tras un ataque.

La transición de Ethereum a la prueba de participación hace que la red sea significativamente más segura y descentralizada en comparación con la prueba de trabajo. Cuantas más personas participan en la red, más descentralizada y menos segura frente a ataques se vuelve.

Y usando la prueba de participación como un mecanismo de consenso es un componente fundamental para [la seguridad, respecto al medio ambiente y la escalabilidad de Ethereum que tenemos ahora](/roadmap/vision/).

<InfoBanner emoji=":money_bag:">
  Si le interesa convertirse en validador y contribuir con la seguridad de Ethereum, <a href="/staking/"> obtenga más información sobre la participación</a>.
</InfoBanner>

### Preparación para la fragmentación {#setting-up-for-sharding}

Al producirse la fusión entre la cadena de baliza y la red principal de Ethereum, la comunidad de Ethereum comenzó a interesarse por la escalabilidad de la red.

La prueba de participación ofrece las ventajas de contar con un registro de todos los productores de bloques aprobados en cualquier período de tiempo, todos ellos con ETH en participación. Este registro establece el escenario para la posibilidad de «dividir y vencer», pero determina de manera precisa la derivación de responsabilidades de la red.

Esta responsabilidad se diferencia de la responsabilidad de la prueba de trabajo, en donde los mineros no tenían obligaciones con la red, quienes podían detener la minería y desactivar el software del nodo permanentemente sin que esto tuviera repercusiones. Tampoco existía un registro de quién proponía los bloques, por lo que no había forma de dividir apropiadamente las responsabilidades de la red.

[Más sobre la fragmentación](/roadmap/danksharding/)

## Relación entre actualizaciones {#relationship-between-upgrades}

Las actualizaciones de Ethereum están interrelacionadas de alguna manera. Por tanto y a modo de recapitulación, veamos cómo la cadena de baliza influye en otras actualizaciones.

### La cadena de baliza y La Fusión {#merge-and-beacon-chain}

En sus comienzos, la cadena de baliza existía de manera independiente a la red principal de Ethereum, pero se fusionaron en 2022.

<ButtonLink href="/roadmap/merge/">
  La Fusión
</ButtonLink>

### Los fragmentos y la cadena de baliza {#shards-and-beacon-chain}

La fragmentación solo podría implementarse en el ecosistema de Ethereum de manera segura a través del mecanismo de consenso de la prueba de participación. La cadena de baliza introdujo apuestas, que se «fusionaron» con la red principal, allanando el camino para la fragmentación y así contribuir a una mayor escalabilidad de Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Cadenas de fragmentos
</ButtonLink>

## Más información

- [Más sobre las futuras actualizaciones de Ethereum](/roadmap/vision)
- [Más sobre arquitectura de nodos](/developers/docs/nodes-and-clients/node-architecture)
- [Más sobre la prueba de participación](/developers/docs/consensus-mechanisms/pos)
