---
title: La cadena de baliza
description: "Descubra todo lo relacionado con la cadena de baliza: la actualización que introdujo la prueba de participación en Ethereum."
lang: es
template: upgrade
image: ../../../../../assets/upgrades/core.png
summaryPoint1: La cadena de baliza no cambia del Ethereum que usamos hoy.
summaryPoint2: Coordinará la red, sirviendo como la capa de consenso.
summaryPoint3: Ha introducido la prueba de participación en el ecosistema Ethereum.
summaryPoint4: Puede que se describa como «Fase 0» en las hojas de ruta técnicas.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    La cadena de baliza se presentó el 1 de diciembre de 2020 al mediodía, hora UTC. Si desea más información, <a href="https://beaconscan.com/">explore los datos</a>. Si quiere ayudar a validar la cadena, puede <a href="/staking/">apostar sus ETH</a>.
</UpgradeStatus>

## ¿Qué hace la cadena de baliza? {#what-does-the-beacon-chain-do}

La cadena de baliza conducirá o coordinará la expansión de la red de [fragmentos](/upgrades/sharding/) y [participantes](/staking/). Pero no será como la [red principal de Ethereum](/glossary/#mainnet) de hoy en día: no puede manejar cuentas o contratos inteligentes.

La función de la cadena de baliza cambiará con el tiempo, pero es un componente fundamental para lograr el [ Ethereum seguro, sostenible y escalable en el que estamos trabajando](/upgrades/vision/).

## Características de la cadena de baliza {#beacon-chain-features}

### Introducción a la apuesta (staking) {#introducing-staking}

La cadena de baliza introducirá una [prueba de participación](/developers/docs/consensus-mechanisms/pos/) en Ethereum. Esta es una nueva forma de ayudarle a mantener Ethereum seguro. Piense que se trata de un bien público que hará que Ethereum sea más saludable y que gane más ETH en el proceso. En la práctica, esto implicará que apueste ETH para activar el software de validación. Como validador, procesará transacciones y creará nuevos bloques en la cadena.

Apostar y convertirse en validador es más fácil que [minar](/developers/docs/mining/) (la forma actual en que Ethereum mantiene su red segura). Y se espera que esto ayude a hacer Ethereum sea más seguro a largo plazo. Cuanta más gente participe en la red, más descentralizada y resistente a ataques será.

<InfoBanner emoji=":money_bag:">
Si le interesa convertirse en validador y ayudar a proteger la cadena de baliza, <a href="/staking/">obtenga más información acerca de las apuestas</a>.
</InfoBanner>

Este es también un cambio importante para otra actualización: cadenas de fragmentos.

### Configuración de cadenas de fragmentos {#setting-up-for-shard-chains}

Después de que la red principal se fusione con la cadena de baliza, la siguiente actualización introducirá cadenas de fragmentos en la red de prueba de participación. Estos «fragmentos» aumentarán la capacidad de la red y mejorarán la velocidad de las transacciones al ampliar la red a 64 cadenas de bloques. La cadena de baliza es un primer paso importante en la introducción de cadenas de fragmento, dado que requieren apostar para trabajar de forma segura.

A la larga, la cadena de baliza también será responsable de asignar aleatoriamente participantes para validar las cadenas de fragmentos. Esta es la clave para impedir que los participantes conspiren y se hagan con un fragmento. Por tanto, esto significa que tienen [menos de una posibilidad entre mil millones](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relación entre actualizaciones {#relationship-between-upgrades}

Las mejoras de Ethereum están interrelacionadas de alguna manera. Por tanto y a modo de recapitulación, veamos cómo la cadena de baliza influye en las otras actualizaciones.

### La red principal y la cadena de baliza {#mainnet-and-beacon-chain}

La cadena de baliza al principio existirá con independencia de la red principal de Ethereum que usamos hoy en día. Pero, en última instancia, se conectarán. El plan es «fusionar» la red principal con el sistema de prueba de participación controlado y coordinado por la cadena de baliza.

<ButtonLink to="/upgrades/merge/">
    La fusión
</ButtonLink>

### Los fragmentos y la cadena de baliza {#shards-and-beacon-chain}

Las cadenas de fragmentos solo pueden introducirse en el ecosistema Ethereum de manera segura con un mecanismo de consenso de la prueba de participación establecido. La cadena de baliza introducirá la apuesta y allanará el camino a la cadena de fragmentos actualizada que se implementará posteriormente.

<ButtonLink to="/upgrades/sharding/">
    Cadenas de fragmentos
</ButtonLink>

<Divider />

## Interacción con la cadena de baliza {#interact-with-beacon-chain}

<BeaconChainActions />
