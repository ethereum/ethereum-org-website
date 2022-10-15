---
title: La fusion
description: En apprendre plus à propos de la fusion - lorsque le réseau principal d'Ethereum rejoint la chaîne phare coordonnée par le système de mise à enjeu.
lang: fr
template: upgrade
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: Prochainement, le réseau principal actuel « fusionnera » avec le système de preuve d'enjeux de la chaîne phare.
summaryPoint2: Cette évènement marquera la transition complète vers la preuve de mise à enjeu et la fin de la preuve de travail pour Ethereum.
summaryPoint3: Ceci est prévu pour précéder le déploiement de chaînes de fragment.
summaryPoint4: Précédemment, cette étape était appelée « le docking ».
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Cette mise à jour représente le passage officiel au consensus de preuve de mise à enjeu. Cela élimine le besoin de mines à forte intensité énergétique et sécurise le réseau à l'aide de l'éther staker. Une étape vraiment excitante dans la réalisation de la <a href="/upgrades/vision/">vision d'Ethereum</a> – plus évolutif, plus sécurisé et plus durable.
</UpgradeStatus>

## Qu'est-ce que la fusion ? {#what-is-the-docking}

Il est important de se rappeler que, dans un premier temps, la [chaîne phare](/upgrades/beacon-chain/) sortira séparément du [réseau principal](/glossary/#mainnet) - la chaîne que nous utilisons aujourd'hui. Le réseau principal Ethereum continuera d'être sécurisé par [la preuve de travail](/developers/docs/consensus-mechanisms/pow/), même lorsque la chaîne phare fonctionnera en parallèle en utilisant [la preuve de mise à enjeu](/developers/docs/consensus-mechanisms/pos/). La fusion se fera au moment où ces deux systèmes se réuniront enfin.

Imaginez qu'Ethereum est un vaisseau spatial qui n’est pas tout à fait prêt pour un voyage interstellaire. Avec la chaîne phare, la communauté a construit un nouveau moteur et une coque renforcée. Quand il sera temps, le vaisseau actuel s'arrimera à ce nouveau système, fusionnant en un seul vaisseau, prêt à parcourir des années lumières et à s'emparer de l'univers.

## Fusionner avec le réseau principal {#docking-mainnet}

Lorsqu'il sera prêt, le réseau principal Ethereum "fusionnera" à la chaîne phare, devenant son propre fragment qui utilise la preuve d'enjeu au lieu de la [preuve de travail](/developers/docs/consensus-mechanisms/pow/).

Mainnet apportera la possibilité d'exécuter des contrats intelligents dans le système de preuve d'enjeu, ainsi que l'historique complet et l'état actuel d'Ethereum, afin de garantir que la transition se déroule en douceur pour tous les détenteurs et utilisateurs d'ETH.

## Après la fusion {#after-the-merge}

Cela marquera la fin de la preuve de travail pour Ethereum, et ouvrira l'ère d'un Ethereum plus durable et plus respectueux de l’environnement. À ce moment, Ethereum fera un pas de plus vers les aspects évolutif, sécurisé et durable décrits dans sa [vision d'Ethereum](/upgrades/vision/).

Il est important de noter qu'un objectif d'implémentation de la fusion a pour simple objectif d'accélérer la transition de la preuve de travail vers la preuve d'enjeu. Les développeurs concentrent leurs efforts sur cette transition et minimisent les fonctionnalités supplémentaires qui pourraient retarder cet objectif.

**Cela signifie que certaines fonctionnalités comme la possibilité de retirer l'ETH misé, devront attendre la fin de la fusion.** Les plans intègrent une mise à jour après la fusion appelée « nettoyage » pour répondre aux nécessités de ces fonctionnalités, ce qui devrait se produire rapidement après la fin de la fusion.

## Relation entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau d'Ethereum sont plus ou moins interdépendantes. Alors résumons comment la fusion est liée aux autres mises à niveau.

### La fusion et la chaîne phare {#docking-and-beacon-chain}

Une fois la fusion réalisée, les validateurs auront en charge la validation du réseau principal Ethereum. [Miner](/developers/docs/consensus-mechanisms/pow/mining/) ne sera plus nécessaire, de sorte que les mineurs investiront probablement leurs gains dans le nouveau système de preuve d'enjeu.

<ButtonLink to="/upgrades/beacon-chain/">
  La chaîne phare
</ButtonLink>

### La fusion et le nettoyage post-fusion {#merge-and-post-merge-cleanup}

Immédiatement après la fusion, certaines fonctionnalités comme le retrait de l'ETH misé ne seront pas encore prises en charge. Celles-ci sont prévues dans le cadre d'une mise à jour séparée qui suivra peu après la fusion.

Restez à jour avec le [Blog de Recherche et Développement EF](https://blog.ethereum.org/category/research-and-development/). Pour ceux qui sont curieux, apprenez-en plus sur [Ce qui se passe après la fusion](https://youtu.be/7ggwLccuN5s?t=101), une présentation par Vitalik lors de l'événement ETHGlobal d'avril 2021.

### La fusion et les chaînes de fragments {#docking-and-shard-chains}

À l'origine, le plan était de travailler sur des chaînes de fragments avant la fusion – pour aborder l'évolutivité. Cependant, avec l'explosion [des solutions de mise à l'échelle par la couche 2](/developers/docs/scaling/#layer-2-scaling), la priorité s'est déplacée vers le passage de la preuve de travail vers la preuve d'enjeu au travers de La fusion.

Il s'agira d'une évaluation continue de la part de la communauté quant à la potentielle nécessité de plusieurs séries de chaînes fragmentées afin de permettre une évolutivité sans fin.

<ButtonLink to="/upgrades/sharding/">
  Chaines de fragments
</ButtonLink>

## En savoir plus {#read-more}

<MergeArticleList />
