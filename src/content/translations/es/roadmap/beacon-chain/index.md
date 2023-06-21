---
title: La cadena de baliza
description: "Descubra todo lo relacionado con la cadena de baliza: la actualización que introdujo la prueba de participación en Ethereum."
lang: es
template: upgrade
image: ../../../../../assets/upgrades/core.png
summaryPoint1: La cadena de baliza ha introducido la prueba de participación en el ecosistema de Ethereum.
summaryPoint2: Se fusionó con la cadena de prueba de trabajo original de Ethereum en septiembre de 2022.
summaryPoint3: La cadena de baliza introdujo la lógica de consenso y bloqueó el protocolo de cotilleo que ahora asegura Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
  La cadena de baliza enviada el 1 de diciembre de 2020 formalizó la prueba de participación como mecanismo de consenso de Ethereum con la actualización a La Fusión el 15 de septiembre de 2022.
</UpgradeStatus>

## ¿Qué era la cadena de baliza? {#what-is-the-beacon-chain}

La cadena de bloques fue el nombre de la cadena de bloques de prueba de participación original lanzada en 2020. Fue creada para mostrar que la lógica de consenso de la prueba de participación era segura y sostenible, antes de habilitarla en la red principal de Ethereum. Por esta razón, estuvo funcionando paralelamente con la prueba de trabajo de Ethereum. Al desconectar la prueba de trabajo y habilitar la prueba de participación en Ethereum, fue necesario instruir a la cadena de baliza a que aceptara las transacciones alojadas en la agrupación de cadena original de Ethereum. Luego, estas se agruparon en bloques y posteriormente se organizaron en la cadena de bloques usando un mecanismo de consenso basado en la prueba de participación. Al mismo tiempo, los clientes originales de Ethereum apagaron su minería, propagación de bloques y lógica de consenso, confiándolo todo a la cadena de baliza. A este evento se le denominó [La Fusión](/roadmap/merge/). Una vez completada La Fusión, dejó de haber dos cadenas de bloques, convirtiéndose en una única cadena de Ethereum con prueba de participación.

## ¿Qué hace la cadena de baliza? {#what-does-the-beacon-chain-do}

El nombre de la cadena de baliza era el nombre utilizado para referirse al libro mayor de cuentas encargado de orquestar y coordinar a los [participantes](/staking/) de la red de Ethereum mucho antes de que estos comenzaran a validar transacciones reales de Ethereum. No se encargaba de procesar transacciones ni de las interaccones con contratos inteligentes.

Dio paso al mecanismo de consenso (o «capa de consenso») que reemplazó el minado de la prueba de trabajo de Ethereum y trajo consigo mejoras significativas a la red.

La cadena de baliza es un elemento fundacional para el [Ethereum seguro, escalable y amigable al medioambiente que tenemos en la actualidad](/roadmap/vision/).

## El impacto de la cadena de baliza {#beacon-chain-features}

### Introducción a la participación {#introducing-staking}

La cadena de baliza introdujo la [prueba de participación](/developers/docs/consensus-mechanisms/pos/) en Ethereum. Esta mantiene la seguridad de Ethereum y permite a los validadores obtener más ETH en el proceso. En la práctica, la participación supone comprometer ETH para poder activar el software de validación. Como participador, será el encargado de ejecutar el software que crea y valida los nuevos bloques de la cadena.

La participación cumple un rol similar al que solía realizar el [minado](/developers/docs/mining/), pero con muchas diferencias entre ambos. El minado requería de una inversión inicial significativa destinada a la adquisición de un productivo hardware y a cubrir los gastos de consumo energético, lo que derivó en economías de escala y en la promoción de la centralización. El minado tampoco requería de la retención de activos colaterales, lo que limitaba los alcances del protocolo a castigar las acciones incorrectas solo tras un ataque.

La transición de Ethereum a la prueba de participación le hace significativamente más segura y descentralizada en comparación con la prueba de trabajo. La red se vuelve más descentralizada y menos propensa a ataques con el aumento de personas participando en ella.

<InfoBanner emoji=":money_bag:">
  Si le interesa convertirse en validador y contribuir con la seguridad de Ethereum, <a href="/staking/"> obtenga más información sobre la participación</a>.
</InfoBanner>

### Preparación para la fragmentación {#setting-up-for-sharding}

Al producirse la fusión entre la cadena de baliza y la red principal de Ethereum, la comunidad de Ethereum comenzó a interesarse por la escalabilidad de la red.

La prueba de participación ofrece las ventajas de contar con un registro de todos los productores de bloques aprobados de cualquier período de tiempo, todos ellos con ETH en participación. Este registro establece el escenario para la posibilidad de «dividir y vencer», pero establece de manera precisa la derivación de responsabilidades de la red.

Esta responsabilidad se diferencia de la responsabilidad de la prueba de trabajo, en donde los mineros no tenían obligaciones con la red, quienes podían detener el minado y desactivar el software del nodo permanentemente sin que esto tuviera repercusiones. Tampoco había un registro de quién proponía los bloques, por lo que no había forma de dividir apropiadamente las responsabilidades de la red.

[Más sobre la fragmentación](/roadmap/danksharding/)

## Relación entre actualizaciones {#relationship-between-upgrades}

Las actualizaciones de Ethereum están interrelacionadas de alguna manera. Por tanto y a modo de recapitulación, veamos cómo la cadena de baliza influye en otras actualizaciones.

### La cadena de baliza y La Fusión {#merge-and-beacon-chain}

En sus comienzos, la cadena de baliza existía de manera independiente a la red principal de Ethereum, pero se fusionaron en 2022.

<ButtonLink to="/roadmap/merge/">
  La Fusión
</ButtonLink>

### Los fragmentos y la cadena de baliza {#shards-and-beacon-chain}

La fragmentación solo podría ser implementada en el ecosistema de Ethereum de manera segura a través del mecanismo de consenso de la prueba de participación. La cadena de baliza introdujo apuestas, que se «fusionaron» con la red principal, allanando el camino para la fragmentación y así ayudar a una mayor escalabilidad de Ethereum.

<ButtonLink to="/roadmap/danksharding/">
  Cadenas de fragmentos
</ButtonLink>

## Más información

- [Más sobre las futuras actualizaciones de Ethereum](/roadmap/vision)
- [Más sobre la prueba de participación](/developers/docs/consensus-mechanisms/pos)
