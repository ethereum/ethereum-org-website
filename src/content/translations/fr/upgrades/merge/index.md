---
title: Arrimage du réseau principal avec Eth2
description: "En savoir plus sur l'arrimage - lorsque le réseau principal Ethereum rejoint le système coordonné de preuve d'enjeu par chaîne phare."
lang: fr
template: upgrade
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoint1: Au final, le réseau principal Ethereum actuel "s''arrimera" au reste des mises à niveau d''Eth2.
summaryPoint2: L''arrimage fusionnera le réseau principal "Eth1" avec la chaîne phare Eth2 et le système de fragments.
summaryPoint3: Cela marquera la fin de la preuve de travail pour Ethereum, et la transition complète vers la preuve d'enjeu.
summaryPoint4: Vous en avez peut-être entendu parler comme étant la "Phase 1.5 " sur les feuilles de route techniques.
---

<UpgradeStatus date="~Q1/Q2 2022">
    Cette mise à niveau suivra l'arrivée des chaînes de fragments. Mais c’est le moment où la <a href="/eth2/vision/">vision Eth2</a> devient réalité : plus d’évolutivité, de sécurité et de durabilité avec la mise en jeu, qui soutient l’ensemble du réseau.
</UpgradeStatus>

## Qu'est-ce que l'arrimage ? {#what-is-the-docking}

Il est important de se rappeler qu'au départ, les autres mises à niveau Eth2 sont expédiées séparément du [réseau principal](/glossary/#mainnet) - la chaîne que nous utilisons aujourd'hui. Le réseau principal Ethereum continuera d'être sécurisé par [preuve de travail](/developers/docs/consensus-mechanisms/pow/), même pendant que [la chaîne phare](/upgrades/beacon-chain/) et ses [chaînes de fragments](/eth2/shard-chains/) seront exécutées en parallèle en utilisant la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/). L'arrimage, ou docking, c'est quand ces deux systèmes sont fusionnés.

Imaginez qu'Ethereum est un vaisseau spatial qui n’est pas tout à fait prêt pour un voyage interstellaire. Avec la chaîne phare et les chaînes de fragments, la communauté a construit un nouveau moteur et une coque endurcie. Le moment venu, le vaisseau actuel viendra s'arrimer à ce nouveau système pour fusionner avec, afin de passer à la vitesse de la lumière et d'arpenter tout l’univers.

## Arrimage au réseau principal {#docking-mainnet}

Lorsqu'il sera prêt, le réseau principal Ethereum "s'arrimera" à la chaîne phare, devenant son propre fragment qui utilise la preuve d'enjeu au lieu de la [preuve de travail](/developers/docs/consensus-mechanisms/pow/).

Mainnet apportera la possibilité d'exécuter des contrats intelligents dans le système de preuve d'enjeu, ainsi que l'historique complet et l'état actuel d'Ethereum, afin de garantir que la transition se déroule en douceur pour tous les détenteurs et utilisateurs d'ETH.

## Après l'arrimage {#after-the-docking}

Ce sera la fin de la preuve de travail pour Ethereum, et commencera alors l'ère d'un Ethereum plus durable et plus écologique. À ce stade, Ethereum aura l'échelle, la sécurité et la durabilité décrites dans sa [vision Eth2](/eth2/vision/).

## Relation entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau de l'Eth2 sont en quelque sorte liées. Récapitulons donc le lien entre l'arrimage et les autres mises à niveau.

### Arrimage et chaîne phare {#docking-and-beacon-chain}

Une fois l'arrimage effectué, les validateurs seront affectés à la validation du Mainnet Ethereum. Tout comme avec les chaînes de fragments. [Miner](/developers/docs/consensus-mechanisms/pow/mining/) ne sera plus nécessaire, de sorte que les mineurs investiront probablement leurs gains dans la mise en jeu dans le nouveau système de preuve d'enjeu.

<ButtonLink to="/upgrades/beacon-chain/">La chaîne phare</ButtonLink>

### Arrimage et chaînes de fragments {#docking-and-shard-chains}

Le réseau principal étant appelé à devenir un fragment, l'implémentation réussie des chaînes de fragments est essentielle pour cette mise à niveau. Il est probable que la transition jouera un rôle important en aidant la communauté à décider si elle doit déployer une deuxième mise à niveau vers la fragmentation. Cette mise à niveau rendra les autres fragments identiques au réseau principal : ils seront en mesure de gérer les transactions et les contrats intelligents et pas seulement de fournir plus de données.

<ButtonLink to="/eth2/shard-chains/">Chaines de fragments</ButtonLink>
