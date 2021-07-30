---
title: La Cadena de Balisa
description: Obtén informació sobre la Cadena de Balisa, la primera actualització d'Eth2 a Ethereum.
lang: ca
template: eth2
sidebar: true
image: ../../../../../assets/eth2/core.png
summaryPoints:
  [
    "La Cadena de Balisa no canvia res de l'Ethereum que fem servir a dia d'avui.",
    "Coordinarà la xarxa.",
    "Introduirà la prova de participació a l'escosistema d'Ethereum.",
    'Segurament la coneixeràs com a "Fase 0" de la planificació tècnica.',
  ]
---

<UpgradeStatus isShipped date="Shipped!">
    La Cadena de Balisa es va posar en marxa l'1 de desembre al migdia (UTC). Per saber-ne més <a href="https://beaconscan.com/">explora les dades</a>. Si vols ajudar a validar la cadena, pots <a href="/eth2/staking/">"apostar" els teus ETH</a>.
</UpgradeStatus>

## Què fa la Cadena de Balisa? {#what-does-the-beacon-chain-do}

La Cadena de Balisa dirigirà o coordinarà l'expansió de la xarxa de [fragments](/eth2/shard-chains/) i [participants](/eth2/staking/). Però no serà com la [xarxa principal d'Ethereum](/glossary/#mainnet) actual. No pot gestionar comptes o contractes intel·ligents.

El rol de la Cadena de Balisa canviarà amb el pas del temps, però és un element fonamental de [l'Ethereum segura, sostenible i escalable per a la que treballem](/eth2/vision/).

## Característiques de la Cadena de Balisa {#beacon-chain-features}

### Introducció de les "apostes" {#introducing-staking}

La Cadena de Balisa introduirà la [prova de participació ](/developers/docs/consensus-mechanisms/pos/) a Ethereum. És una manera nova d'ajudar a mantenir segura l'Ethereum. T'ho pots imaginar com un bé públic que farà Ethereum més saludable i et farà guanyar més ETH en el procés. A la pràctica, hauràs d'apostar ETH per tal d'activar el programari de validació. Com a validador, processaràs les transaccions i crearàs nous blocs a la cadena.

Apostar i convertir-se en validador és més senzill que [minar](/developers/docs/mining/) (la manera actual de mantenir la xarxa segura). I s'espera que això contribueixi a fer Ethereum més segura a llarg termini. Com més gent participi a la xarxa, més descentralitzada i segura serà davant dels atacs.

<InfoBanner emoji=":money_bag:">
Si estàs interessat en ser validador i contribuir a protegir la Cadena de Balisa, <a href="/eth2/staking/">aprèn més sobre les apostes</a>.
</InfoBanner>

També és un canvi important per a la segona millora d'Eth2: les [cadenes de fragments](/eth2/shard-chains/).

### Configuració de les cadenes de fragments {#setting-up-for-shard-chains}

Les cadenes de fragments seran la segona millora d'Eth2. Incrementaran la capacitat de la xarxa i milloraran la velocitat de transacció mitjançant l'extensió de la xarxa a 64 cadenes de blocs. La Cadena de Balisa és un primer pas important en la introducció de cadenes de fragments, ja que requereixen apostar per funcionar de manera segura.

Amb el temps, la Cadena de Balisa també serà l'encarregada d'assignar als apostadors la validació de les cadenes de fragments. Això és clau per dificultar que els apostadors puguin coordinar-se i prendre el control d'un fragment. Per tant, vol dir que tenen [menys d'una possibilitat entre un bilió](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relació entre les millores {#relationship-between-upgrades}

D'alguna manera, les millores d'Eth2 estan interrelacionades. Recapitulem com la Cadena de Balisa afecta altres millores.

### La xarxa principal i la Cadena de Balisa {#mainnet-and-beacon-chain}

Inicialment, la Cadena de Balisa estarà separada de la xarxa principal d'Ethereum que fem servir actualment. Però, en última instància, estaran connectades. El mètode és "acoblar" la xarxa principal en el sistema de prova de participació, que estarà controlat i coordinat per la Cadena de Balisa.

<ButtonLink to="/eth2/merge/">L'acoblament</ButtonLink>

### Fragments i la Cadena de Balisa {#shards-and-beacon-chain}

Les cadenes de fragments només poden entrar de forma segura a l'ecosistema Ethereum si existeix un mecanisme de consens de prova de participació. La Cadena de Balisa introduirà l'aposta i aplanarà el camí a la futura introducció de la cadena de fragments.

<ButtonLink to="/eth2/shard-chains/">Cadenes de fragments</ButtonLink>

<Divider />

## Interactuar amb la Cadena de Balisa {#interact-with-beacon-chain}

<Eth2BeaconChainActions />
