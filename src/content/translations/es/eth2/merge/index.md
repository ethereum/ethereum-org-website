---
title: Acoplamiento de la red principal con Eth2
description: "Obtén más información sobre el acoplamiento: cuando la red principal de Ethereum se une al sistema coordinado de prueba de participación de la Cadena de Baliza."
lang: es
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    'Eventualmente, la red principal de Ethereum actual se "acoplará" con el resto de las actualizaciones de Eth2.',
    'El acoplamiento fusionará la red principal de "Eth1" con la Cadena de Baliza de Eth2 y el sistema de fragmentación.',
    "Esto marcará el final de la prueba de trabajo para Ethereum y la transición completa a la prueba de participación.",
    'Es posible que conozcas esto como "Fase 1.5" en hojas de ruta técnicas.',
  ]
---

<UpgradeStatus date="~2021/22">
  Esta actualización seguirá a la llegada de las cadenas de fragmentos. Pero es el momento en el que <a href="/eth2/vision/">la visión de Eth2</a> se hace realidad por completo: más escalabilidad, seguridad y sostenibilidad con el apoyo de la participación a toda la red.
</UpgradeStatus>

## ¿Qué es el acoplamiento? {#what-is-the-docking}

Es importante recordar que, inicialmente, las otras actualizaciones de Eth2 se envían por separado de la [red principal](/glossary/#mainnet), la cadena que usamos hoy. La red principal de Ethereum seguirá estando protegida por la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/), incluso mientras [la Cadena de Baliza](/eth2/beacon-chain/) y sus [cadenas de fragmentos](/eth2/shard-chains/) se ejecutan en paralelo mediante la [prueba de participación](/developers/docs/consensus-mechanisms/pos/). El acoplamiento consiste en la fusión de estos dos sistemas.

Imagine que Ethereum es una nave espacial que no está lista para un viaje interestelar. Con la Cadena de Baliza y las cadenas de fragmentos, la comunidad ha construido un nuevo motor y un casco endurecido. Cuando sea el momento, la nave actual se acoplará con este nuevo sistema para convertirse en una sola nave, lista para viajar a años luz y enfrentarse al universo.

## Acoplamiento de la red principal {#docking-mainnet}

Cuando esté lista, la red principal de Ethereum se "acoplará" a la Cadena de Baliza y se convertirá en su propio fragmento, que utiliza la prueba de participación en lugar de la [ prueba de trabajo](/developers/docs/consensus-mechanisms/pow/).

La red principal aportará la capacidad de ejecutar contratos inteligentes en el sistema de prueba de participación, además del historial completo y el estado actual de Ethereum, para garantizar que la transición sea fluida para todos los titulares y usuarios de ETH.

<!-- ### Improving Mainnet

Before Mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## Después del acoplamiento {#after-the-docking}

Esto marcará el fin de la prueba de trabajo para Ethereum e iniciará la era de un Ethereum más sostenible y respetuoso con el medio ambiente. En este punto, Ethereum tendrá la escala, la seguridad y la sostenibilidad descritas en la [visión de Eth2](/eth2/vision/).

## Relación entre actualizaciones {#relationship-between-upgrades}

Las actualizaciones de Eth2 están de algún modo interrelacionadas. Así que recapitulemos sobre cómo se relaciona el acoplamiento con las otras actualizaciones.

### El acoplamiento y la Cadena de Baliza {#docking-and-beacon-chain}

Una vez que se produzca el acoplamiento, se asignarán participantes para validar la red principal de Ethereum. Al igual que con las cadenas de fragmentos. [La minería](/developers/docs/consensus-mechanisms/pow/mining/) ya no será necesaria, por lo que es probable que los mineros inviertan sus ganancias en participar en el nuevo sistema de prueba de participación.<ButtonLink to="/eth2/beacon-chain/">La Cadena de Baliza</ButtonLink>

### Acoplamiento y cadenas de fragmentos {#docking-and-shard-chains}

Con la red principal convirtiéndose en un fragmento, la implementación exitosa de las cadenas de fragmentos es fundamental para esta actualización. Es probable que la transición desempeñe un papel importante para ayudar a la comunidad a decidir si implementa una segunda actualización a la fragmentación. Esta actualización hará que los otros fragmentos sean como la red principal: podrán manejar transacciones y contratos inteligentes y no solo proporcionar más datos.<ButtonLink to="/eth2/shard-chains/">Cadenas de fragmentos</ButtonLink>
