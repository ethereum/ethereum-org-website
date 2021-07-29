---
title: Acoblament de la xarxa principal amb Eth2
description: "Obtén informació sobre l'acoblament: quan la xarxa principal d'Ethereum s'uneix al sistema coordinat de prova de participació de la Cadena de Balisa."
lang: ca
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    "Al final, l'actual xarxa principal d'Ehtereum s'acoblarà amb la resta de les millores d'Eth2.",
    'L''acoblament fusionarà la xarxa principal "Eth1" amb el sistema de fragmentació i la Cadena de Balisa d''Eth2.',
    "Això marcarà el final de la prova de treball per a Ethereum i la transició completa a la prova de participació.",
    'Es coneix també com a "Phase1.5" a la planificació tècnica.',
  ]
---

<UpgradeStatus date="~2021/22">
    Aquesta millora seguirà l'arribada de cadenes de fragments. Però és el moment en el qual la <a href="/eth2/vision/">visió d'Eth2</a> es veurà completament acomplida: més escalabilitat, seguretat i sostenibilitat amb la participació i validació de tota la xarxa.
</UpgradeStatus>

## Què és l'acoblament? {#what-is-the-docking}

És important recordar que inicialment les altres actualitzacions d'Eth2 estan essent enviades de forma separada des de la [xarxa principal](/glossary/#mainnet), la cadena que utilitzem avui en dia. La xarxa principal d'Ethereum seguirà estant protegida mitjançant la [prova de treball](/developers/docs/consensus-mechanisms/pow/), fins i tot quan [ la Cadena de Balisa ](/eth2/beacon-chain/)i les seves [ cadenes de fragments ](/eth2/shard-chains/) s'executin en paral·lel utilitzant [ prova de participació](/developers/docs/consensus-mechanisms/pos/). L'acoblament és quan aquests dos sistemes es fusionen.

Imagina que Ethereum és una nau espacial que no està del tot preparada per a un viatge interestel·lar. Amb la Cadena de Balisa i les cadenes de fragments, la comunitat ha creat un nou motor i un habitacle més reforçat. Quan sigui el moment, la nau actual s'acoblarà a aquest nou sistema per convertir-se en una única nau, preparada per viatjar a anys llum i conquerir l'univers.

## Acoblament de la xarxa principal {#docking-mainnet}

Quan estigui preparada, la xarxa principal d'Ethereum s'acoblarà a la Cadena de Balisa transformant-se en un fragment propi que utilitzi la prova de participació en lloc de [ la prova de treball](/developers/docs/consensus-mechanisms/pow/).

La xarxa principal aportarà la capacitat d'executar contractes intel·ligents en el sistema de prova de participació, a més de l'historial complet i l'estat actual d'Ethereum, per garantir que la transició sigui fluida per a tots els titulars i usuaris d'ETH.

<!-- ### Improving mainnet

Before mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/en/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## Després de l'acoblament {#after-the-docking}

Això marcarà el final de la prova de treball per Ethereum i el principi d'una nova era més sostenible i respectuosa amb el medi ambient. Arribats a aquest punt, Ethereum tindrà la mida, la seguretat i la sostenibilitat descrites a la [ visió d'Eth2](/eth2/vision/).

## Relació entre les millores {#relationship-between-upgrades}

D'alguna manera les millores de Eth2 estan interrelacionades. Per tant, anem a veure com l'acoblament es relaciona amb les altres actualitzacions.

### L'acoblament i la Cadena de Balisa {#docking-and-beacon-chain}

Un cop succeeix l'acoblament, s'assignaran els participants per validar la xarxa principal d'Ethereum. Igual que amb les cadenes de fragments. [La mineria](/developers/docs/consensus-mechanisms/pow/mining/) ja no farà falta, per tant, el miners probablement invertiran els seus guanys en participacions en el nou sistema de prova de participació.<ButtonLink to="/eth2/beacon-chain/">La Cadena de Balisa</ButtonLink>

### L'acoblament i les cadenes de fragments {#docking-and-shard-chains}

Amb la xarxa principal esdevenint un fragment, la implementació exitosa de les cadenes de fragments resulta crítica per aquesta actualització. És probable que la transició jugui un important paper a l'hora d'ajudar la comunitat a decidir si desenvolupar una segona actualització per tal de fragmentar. Aquesta actualització transformarà els altres fragments en xarxa principal: seran capaços de fer transaccions i contractes intel·ligents i no tan sols proveir més dades.<ButtonLink to="/eth2/shard-chains/">Cadenes de fragments</ButtonLink>
