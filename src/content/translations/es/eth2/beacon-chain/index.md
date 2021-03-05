---
title: La Cadena de Baliza
description: Obtén más información sobre la Cadena de Baliza, la primera actualización de Eth2 a Ethereum.
lang: es
template: eth2
sidebar: true
image: ../../../../../assets/eth2/core.png
summaryPoints:
  [
    "La Cadena de Baliza no cambia nada sobre el Ethereum que usamos actualmente.",
    "Coordinará la red de Ethereum.",
    "Introducirá la prueba de participación al ecosistema de Ethereum.",
    'Quizá lo conozcas como la "Fase 0" en los mapas técnicos de la ruta.',
  ]
---

<UpgradeStatus isShipped date="¡Enviada!">
  La Cadena de Baliza se presentó el 1 de diciembre al mediodía (UTC). Para saber más, <a href="https://beaconscan.com/">explora los datos</a>. Si quieres ayudar a validar la cadena, puedes <a href="/eth2/staking/">apostar tu ETH</a>.
</UpgradeStatus>

## ¿Qué hace la Cadena de Baliza? {#what-does-the-beacon-chain-do}

La Cadena de Baliza conducirá o coordinará la expansión de la red a [fragmentos](/eth2/shard-chains/) y [apostadores](/eth2/staking/). Pero no será como [la red central de Ethereum](/glossary/#mainnet) de hoy en día. No puede manejar cuentas o contratos inteligentes.

El rol de la Cadena de Baliza cambiará con el tiempo, pero es un componente fundamental para un [ Ethereum seguro, sostenible y escalable en el que estamos trabajando](/eth2/vision/).

## Características de la Cadena de Baliza {#beacon-chain-features}

### Introducción a la apuesta (staking) {#introducing-staking}

La Cadena de Baliza introducirá una [prueba de participación](/developers/docs/consensus-mechanisms/pos/) a Ethereum. Esta es una nueva forma de ayudar a mantener Ethereum seguro. Piensa que se trata de un bien público que hará que Ethereum sea más saludable y te ganará más ETH en el proceso. En la práctica, esto implicará que apuestes ETH para activar el software de validación. Como validador, procesarás transacciones y crearás nuevos bloques en la cadena.

Apostar y convertirse en validador es más fácil que [minar](/developers/docs/mining/) (la forma actual en que Ethereum mantiene su red segura). Y se espera que esto ayude a hacer Ethereum más seguro a largo plazo. Cuanta más gente participe en la red, más descentralizada y resistente a ataques será.

<InfoBanner emoji=":money_bag:">
Si estás interesado en convertirte en validador y ayudar a proteger la Cadena de Baliza, <a href="/eth2/staking/">obtén más información acerca del "staking"</a>.
</InfoBanner>

Esto es además un cambio importante para la segunda actualización de Eth2: [las cadenas de fragmentos](/eth2/shard-chains/).

### Configuración para cadenas de fragmentos {#setting-up-for-shard-chains}

Las cadenas fragmentadas serán la segunda actualización de Eth2. Aumentarán la capacidad de la red y mejorarán la velocidad de las transacciones al extender la red a 64 blockchains. La Cadena de Baliza es un primer paso importante en la introducción de cadenas fragmentadas, dado que requieren apostar para trabajar de forma segura.

A la larga, la Cadena de Baliza también será responsable de asignar aleatoriamente participantes para validar las cadenas fragmentadas. Esta es la clave para dificultar que los apostadores conspiren y se hagan con un fragmento. Por tanto, esto significa que tienen [menos de un 1 trillón de opciones](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relación entre actualizaciones {#relationship-between-upgrades}

Las actualizaciones de Eth2 están de algún modo interrelacionadas. Así que, para recapitular, veamos cómo la Cadena de Baliza influye en las otras actualizaciones.

### Los fragmentos y la Cadena de Baliza {#shards-and-beacon-chain}

Las cadenas de fragmentos solo pueden ingresar en el ecosistema Ethereum de manera segura con un mecanismo de consenso de la prueba de participación establecido. La Cadena de Baliza introducirá la apuesta ("staking") y allanará el camino a la cadena de fragmentos actualizada que está por venir.<ButtonLink to="/eth2/shard-chains/">Cadenas de fragmentos</ButtonLink>

### La red principal y la Cadena de Baliza {#mainnet-and-beacon-chain}

La Cadena de Baliza, en principio, existirá aparte de la red principal de Ethereum que usamos hoy en día. Pero, en última instancia, estarán conectadas. El método es "acoplar" la red principal en el sistema de prueba de participación, que estará controlado y coordinado por la Cadena de Baliza.<ButtonLink to="/eth2/docking/">Acoplamiento</ButtonLink>

<Divider />

## Interactuar con la Cadena de Baliza {#interact-with-beacon-chain}

<Eth2BeaconChainActions />
