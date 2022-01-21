---
title: Le fusionnement
description: En apprendre plus à propos du fusionnement - lorsque le réseau principal d'Ethereum rejoint la chaîne phare coordonnée par le système de mise à enjeu.
lang: fr
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: Au final, le réseau principal Ethereum actuel "s''arrimera" au reste des mises à niveau d''Eth2.
summaryPoint2: L''arrimage fusionnera le réseau principal "Eth1" avec la chaîne phare Eth2 et le système de fragments.
summaryPoint3: Cela marquera la fin de la preuve de travail pour Ethereum, et la transition complète vers la preuve d'enjeu.
summaryPoint4: Vous en avez peut-être entendu parler comme étant la "Phase 1.5 " sur les feuilles de route techniques.
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Cette mise à jour représente le passage officiel au consensus de preuve de mise à enjeu. Cela élimine le besoin de minage à haute intensité énergétique et sécurise le réseau à l'aide de l'éther mise en jeu. Une étape vraiment excitante dans la réalisation de la <a href="/upgrades/vision/">vision d'Eth2</a> - plus d'évolutivité, de sécurité et de durabilité.
</UpgradeStatus>

## Qu'est ce que le fusionnement ? {#what-is-the-docking}

Il est important de se rappeler que, dans un premier temps, la [chaîne phare](/upgrades/beacon-chain/) sortira séparément du [Réseau principal](/glossary/#mainnet) - la chaîne que nous utilisons aujourd'hui. Le réseau principal Ethereum continuera d'être sécurisé par [la preuve de travail](/developers/docs/consensus-mechanisms/pow/), même lorsque la chaîne phare fonctionnera en parallèle en utilisant [la preuve de mise à enjeu](/developers/docs/consensus-mechanisms/pos/). Le fusionnement sera le moment où ces deux systèmes se réuniront enfin.

Imaginez qu'Ethereum est un vaisseau spatial qui n’est pas tout à fait prêt pour un voyage interstellaire. Avec la chaîne phare, la communauté a construit un nouveau moteur et une coque renforcée. Quand il sera temps, le vaisseau actuel s'arrimera à ce nouveau système, fusionnant en un seul vaisseau, prêt à parcourir des années lumières et prendre le pas sur l'univers.

## Fusionner avec le réseau principal {#docking-mainnet}

Lorsqu'il sera prêt, le réseau principal Ethereum "fusionnera" à la chaîne phare, devenant son propre fragment qui utilise la preuve d'enjeu au lieu de la [preuve de travail](/developers/docs/consensus-mechanisms/pow/).

Mainnet apportera la possibilité d'exécuter des contrats intelligents dans le système de preuve d'enjeu, ainsi que l'historique complet et l'état actuel d'Ethereum, afin de garantir que la transition se déroule en douceur pour tous les détenteurs et utilisateurs d'ETH.

## Après la fusion {#after-the-merge}

Ce sera la fin de la preuve de travail pour Ethereum, et commencera alors l'ère d'un Ethereum plus durable et plus écologique. À ce stade, Ethereum aura l'échelle, la sécurité et la durabilité décrites dans sa [vision d'Eth2](/upgrades/vision/).

Il est important de noter qu'un objectif d'implémentation du fusionnement est simplement dans le but afin d'accélérer la transition de la preuve de travail à la preuve d'enjeu. Les développeurs concentrent leurs efforts sur cette transition et minimisent les fonctionnalités supplémentaires qui pourraient retarder cet objectif.

**Cela signifie quelques fonctionnalités, telles que la possibilité de retirer l'ETH staker, devront attendre la fin du fusionnement.** Les plans incluent une mise à jour après le fusionnement appelé "nettoyage" pour répondre à ces fonctionnalités, ce qui devrait arriver rapidement après la fin du fusionnement.

## Relation entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau d'Eth2 sont en quelque sorte liées. Alors résumons comment le fusionnement est lié aux autres mises à jours.

### Le fusionnement et la chaîne phare {#docking-and-beacon-chain}

Une fois que le fusionnement aura eu lieu, les stakers deviendront des validateurs du réseau principal Ethereum. [Miner](/developers/docs/consensus-mechanisms/pow/mining/) ne sera plus nécessaire, de sorte que les mineurs investiront probablement leurs gains dans la mise en jeu dans le nouveau système de preuve d'enjeu.

<ButtonLink to="/upgrades/beacon-chain/">
  La chaîne phare
</ButtonLink>

### Le fusionnement et le nettoyage post-fusion {#merge-and-post-merge-cleanup}

Immédiatement après la fusion, certaines fonctionnalités comme le retrait de l'ETH staker, ne seront pas encore prises en charge. Celles-ci sont prévus pour une mise à jour séparée qui suivra peu après le fusionnement.

Restez à jour avec le [Blog de Recherche et Développement EF](https://blog.ethereum.org/category/research-and-development/). Pour ceux qui sont curieux, apprenez-en plus sur [ce qui se passe après le fusionnement](https://youtu.be/7ggwLccuN5s?t=101), grâce à la présentation par Vitalik lors de l'événement ETHGlobal d'avril 2021.

<ButtonLink to="/upgrades/beacon-chain/">La chaîne phare</ButtonLink>

### Le fusionnement et les chaînes fragmentées {#docking-and-shard-chains}

À l'origine, le plan était de travailler sur des chaînes de fragments avant le fusionnement – pour aborder l'évolutivité. Cependant, avec ll'explosion des solutions de mise à l'échelle de la [couche 2](/developers/docs/scaling/#layer-2-scaling), la priorité s'est déplacée vers le changement de preuves de travail à la preuve de mise à enjeu grâce au fusionnement.

Il s'agira d'une évaluation continue de la part de la communauté quant à la potentielle nécessité de plusieurs séries de chaînes fragmentées afin de permettre une évolutivité sans fin.

<ButtonLink to="/upgrades/shard-chains/">Chaines de fragments</ButtonLink>
