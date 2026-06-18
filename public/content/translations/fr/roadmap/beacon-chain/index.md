---
title: La chaîne balise
description: Découvrez la chaîne balise, la mise à jour qui a introduit la preuve d'enjeu sur Ethereum.
lang: fr
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - La chaîne balise a introduit la preuve d'enjeu dans l'écosystème Ethereum.
  - Elle a été fusionnée avec la chaîne de preuve de travail originale d'Ethereum en septembre 2022.
  - La chaîne balise a introduit la logique de consensus et le protocole de diffusion des blocs qui sécurisent désormais Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La chaîne balise a été déployée le 1er décembre 2020 et a officialisé la preuve d'enjeu comme mécanisme de consensus d'Ethereum avec la mise à jour de La Fusion le 15 septembre 2022.
</UpgradeStatus>

## Qu'est-ce que la chaîne balise ? {#what-is-the-beacon-chain}

La chaîne balise est le nom de la chaîne de blocs à preuve d'enjeu originale qui a été lancée en 2020. Elle a été créée pour s'assurer que la logique de consensus de la preuve d'enjeu était solide et durable avant de l'activer sur le réseau principal [Ethereum](/). Par conséquent, elle a fonctionné en parallèle de l'Ethereum original à preuve de travail. La chaîne balise était une chaîne de blocs « vides », mais désactiver la preuve de travail et activer la preuve d'enjeu sur Ethereum nécessitait de donner l'instruction à la chaîne balise d'accepter les données de transaction des clients d'exécution, de les regrouper en blocs, puis de les organiser en une chaîne de blocs à l'aide d'un mécanisme de consensus basé sur la preuve d'enjeu. Au même moment, les clients Ethereum originaux ont désactivé leur minage, leur propagation des blocs et leur logique de consensus, transférant tout cela à la chaîne balise. Cet événement a été connu sous le nom de [La Fusion](/roadmap/merge/). Une fois La Fusion réalisée, il n'y avait plus deux chaînes de blocs. À la place, il n'y avait plus qu'un seul Ethereum à preuve d'enjeu, qui nécessite désormais deux clients différents par nœud. La chaîne balise est désormais la couche de consensus, un réseau pair à pair de clients de consensus qui gère la diffusion des blocs et la logique de consensus, tandis que les clients originaux forment la couche d'exécution, qui est responsable de la diffusion et de l'exécution des transactions, ainsi que de la gestion de l'état d'Ethereum. Les deux couches peuvent communiquer entre elles à l'aide de l'API Engine.

## Que fait la chaîne balise ? {#what-does-the-beacon-chain-do}

La chaîne balise est le nom donné à un registre de comptes qui a dirigé et coordonné le réseau de [stakers](/staking/) Ethereum avant que ces stakers ne commencent à valider de vrais blocs Ethereum. Cependant, elle ne traite pas les transactions ni ne gère les interactions avec les contrats intelligents, car cela est effectué dans la couche d'exécution.
La chaîne balise est responsable de tâches telles que la gestion des blocs et des attestations, l'exécution de l'algorithme de choix de fourche, et la gestion des récompenses et des pénalités.
Pour en savoir plus, consultez notre [page sur l'architecture des nœuds](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Impact de la chaîne balise {#beacon-chain-features}

### Introduction du staking {#introducing-staking}

La chaîne balise a introduit la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/) sur Ethereum. Cela permet de maintenir la sécurité d'Ethereum et de faire gagner plus d'ETH aux validateurs au passage. En pratique, le staking implique de staker des ETH afin d'activer le logiciel de validateur. En tant que staker, vous exécutez le logiciel qui crée et valide de nouveaux blocs dans la chaîne.

Le staking remplit un objectif similaire à celui que le [minage](/developers/docs/consensus-mechanisms/pow/mining/) remplissait auparavant, mais il est différent à bien des égards. Le minage nécessitait d'importantes dépenses initiales sous la forme de matériel puissant et de consommation d'énergie, ce qui entraînait des économies d'échelle et favorisait la centralisation. Le minage n'imposait pas non plus de verrouiller des actifs en tant que collatéral, ce qui limitait la capacité du protocole à punir les acteurs malveillants après une attaque.

La transition vers la preuve d'enjeu a rendu Ethereum considérablement plus sécurisé et décentralisé par rapport à la preuve de travail. Plus il y a de personnes qui participent au réseau, plus il devient décentralisé et à l'abri des attaques.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Si vous souhaitez devenir validateur et aider à sécuriser Ethereum, [apprenez-en plus sur le staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Préparation pour la fragmentation {#setting-up-for-sharding}

Depuis que la chaîne balise a fusionné avec le réseau principal Ethereum original, la communauté Ethereum a commencé à chercher à mettre le réseau à l'échelle.

La preuve d'enjeu présente l'avantage de disposer d'un registre de tous les producteurs de blocs approuvés à tout moment, chacun ayant des ETH mis en jeu. Ce registre prépare le terrain pour la capacité de diviser pour mieux régner, mais de répartir de manière fiable les responsabilités spécifiques du réseau.

Cette responsabilité contraste avec la preuve de travail, où les mineurs n'ont aucune obligation envers le réseau et pourraient arrêter de miner et éteindre définitivement leur logiciel de nœud en un instant sans répercussion. Il n'y a pas non plus de registre des proposeurs de blocs connus ni de moyen fiable de répartir les responsabilités du réseau en toute sécurité.

[En savoir plus sur la fragmentation](/roadmap/danksharding/)

## Relation entre les mises à jour {#relationship-between-upgrades}

Les mises à jour d'Ethereum sont toutes plus ou moins liées entre elles. Récapitulons donc comment la chaîne balise affecte les autres mises à jour.

### La chaîne balise et La Fusion {#merge-and-beacon-chain}

Au début, la chaîne balise existait séparément du réseau principal Ethereum, mais elles ont été fusionnées en 2022.

<ButtonLink href="/roadmap/merge/">
  La Fusion
</ButtonLink>

### Les fragments et la chaîne balise {#shards-and-beacon-chain}

La fragmentation ne peut entrer en toute sécurité dans l'écosystème Ethereum qu'avec un mécanisme de consensus de preuve d'enjeu en place. La chaîne balise a introduit le staking, qui a « fusionné » avec le réseau principal, ouvrant la voie à la fragmentation pour aider à mettre davantage Ethereum à l'échelle.

<ButtonLink href="/roadmap/danksharding/">
  Chaînes de fragments
</ButtonLink>

## Complément d'information {#further-reading}

- [En savoir plus sur l'architecture des nœuds](/developers/docs/nodes-and-clients/node-architecture)
- [En savoir plus sur la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos)