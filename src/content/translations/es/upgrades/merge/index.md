---
title: La fusión
description: "Descubra más cosas sobre la fusión: cuando la red principal de Ethereum se une al sistema de prueba de participación coordinador de cadena de baliza."
lang: es
template: upgrade
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: La red principal Ethereum acabará por «fusionarse» con el sistema de prueba de participación de la cadena de baliza.
summaryPoint2: Esto marcará el fin de la «prueba de trabajo» de Ethereum y la transición completa a la prueba de participación.
summaryPoint3: Según lo previsto, este será el paso previo al despliegue de las cadenas de fragmentos.
summaryPoint4: A las que anteriormente denominábamos «docking» o acoplamiento.
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Esta actualización representa el cambio oficial al consenso de prueba de participación. Se elimina la necesidad de una minería con alto consumo de energía y, en su lugar, se asegura la red utilizando ether apostado. Es un paso realmente emocionante en la materialización de <a href="/upgrades/vision/">la visión de Ethereum</a>: mayor escalabilidad, seguridad y sostenibilidad.
</UpgradeStatus>

## ¿Qué es la fusión? {#what-is-the-docking}

Es importante recordar que, inicialmente, [la cadena de baliza](/upgrades/beacon-chain/) se iba a lanzar por separado de la [red principal](/glossary/#mainnet), es decir, la cadena que se usa hoy. La red principal de Ethereum sigue estando protegida por la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/), incluso mientras la cadena de baliza se ejecuta en paralelo mediante la [prueba de participación](/developers/docs/consensus-mechanisms/pos/). La fusión se produce cuando estos dos sistemas finalmente se unen.

Imagine que Ethereum es una nave espacial que no está lista para un viaje interestelar. Con la cadena de baliza y las cadenas de fragmentos, la comunidad ha construido un motor nuevo y un casco más duro. Cuando llegue el momento, la nave inicial se acoplará con este nuevo sistema para convertirse en una sola nave, lista para viajar muchos años luz y enfrentarse al universo.

## Acoplamiento con la red principal {#docking-mainnet}

Cuando esté lista, la red principal de Ethereum se «fusionará» con la cadena de baliza y se convertirá en su propio fragmento, que usa la prueba de participación en lugar de la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/).

La red principal aportará la capacidad de ejecutar contratos inteligentes en el sistema de prueba de participación, además del historial completo y el estado actual de Ethereum, para garantizar que la transición sea fluida para todos los titulares y usuarios de ETH.

## Después de la fusión {#after-the-merge}

Esto marcará el final de la prueba de trabajo para Ethereum y el comienzo de la era de un Ethereum más sostenible y ecológico. En este punto, Ethereum estará un paso mas cerca de lograr la escala completa, seguridad y sostenibilidad plasmadas en la [visión Ethereum](/upgrades/vision/).

Es importante señalar que un objetivo de implementación de la fusión es la facilidad para acelerar la transición de la prueba de trabajo a la prueba de participación. Los desarrolladores están centrando sus esfuerzos en esta transición y minimizando características adicionales que podrían retrasar este objetivo.

**Esto supone que algunas características, como la capacidad de retirar ETH apostados, tendrán que esperar un poco más después de que la fusión esté completa.**Se tiene previsto realizar una actualización de «limpieza» posfusión para abordar estas cuestiones —lo que se espera suceda muy pronto— una vez que la fusión se haya completado.

## Relación entre actualizaciones {#relationship-between-upgrades}

Las actualizaciones de Ethereum están en cierto modo interrelacionadas. Recapitulemos, pues, sobre cómo se relaciona la fusión con otras actualizaciones.

### La fusión y la cadena de baliza {#docking-and-beacon-chain}

Cuando se produzca la fusión, se asignarán participantes para validar la red principal de Ethereum. La [minería](/developers/docs/consensus-mechanisms/pow/mining/) ya no será necesaria y, probablemente, los mineros invertirán sus ganancias en apuestas en el nuevo sistema de prueba de participación.

<ButtonLink to="/upgrades/beacon-chain/">
  La cadena de baliza
</ButtonLink>

### La fusión y la limpieza posfusión {#merge-and-post-merge-cleanup}

Inmediatamente después de la fusión, algunas características como la retirada de ETH, todavía no estarán disponibles. Se prevé abordarlas en una actualización por separado, una vez concluida la fusión.

Consulte el [blog de investigación y desarrollo de EF](https://blog.ethereum.org/category/research-and-development/) para enterarse de todas las novedades. Aquellos que quieran saber más, pueden ver la charla [Lo que ocurrirá después de la fusión](https://youtu.be/7ggwLccuN5s?t=101), que dio Vitalik, en el evento ETHGlobal en abril de 2021.

### La fusión y las cadenas de fragmentos {#docking-and-shard-chains}

El plan inicial consistía en trabajar en cadenas de fragmentos antes de la fusión para abordar la escalabilidad. Sin embargo, con el auge de [soluciones de escalabilidad de capa 2](/developers/docs/scaling/#layer-2-scaling), la prioridad se desplazó a pasar de la prueba de trabajo a la prueba de participación a través de la fusión.

La necesidad de múltiples rondas de cadenas de fragmentos para permitir una escalabilidad infinita será objeto de evaluación continua por parte de la comunidad.

<ButtonLink to="/upgrades/sharding/">
  Cadenas de fragmentos
</ButtonLink>

## Más información {#read-more}

<MergeArticleList />
