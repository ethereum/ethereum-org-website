---
title: La chaîne phare
description: En savoir plus sur la chaîne phare - la mise à niveau qui a introduit la preuve d'enjeu d'Ethereum.
lang: fr
template: upgrade
image: /images/use-cases/defi.png
alt:
summaryPoint1: La Chaîne phare a introduit la preuve d'enjeu dans l'écosystème Ethereum.
summaryPoint2: Elle a été fusionnée avec la chaîne originale de preuve de travail Ethereum en septembre 2022.
summaryPoint3: La Chaîne phare a introduit la logique de consensus et le protocole de commutation de bloc qui sécurise désormais Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La Chaîne phare a été présentée le 1er décembre 2020 et a formalisé la preuve d'enjeu comme mécanisme de consensus d'Ethereum avec La Fusion du 15 septembre 2022.
</UpgradeStatus>

## Qu'est-ce que la chaîne phare Beacon ? {#what-is-the-beacon-chain}

La chaîne phare Beacon est le nom donné à la chaîne originelle à preuve d'enjeu, lancée en 2020. Elle a été crée pour s'assurer que la logique de consensus par preuve d'enjeu était saine et durable avant de l'activer sur le réseau principal Ethereum. Par conséquent, elle a fonctionné aux côtés de l'Ethereum original de preuve de travail. La chaîne Beacon était une chaîne de blocs « vides », mais désactiver la preuve de travail et activer la preuve d'enjeu sur Ethereum nécessitait de demander à la Beacon Chain d'accepter les données de transaction des clients d'exécution, de les regrouper en blocs, puis de les organiser dans une blockchain en utilisant un mécanisme de consensus basé sur la preuve d'enjeu. Au même moment, les clients originaux d'Ethereum ont arrêté leur minage, la propagation du bloc et la logique de consensus, regroupant tout ceci sur la Chaîne phare. Cet événement était connu sous le nom de [La Fusion](/roadmap/merge/). Une fois que La Fusion a eu lieu, il n’y avait plus deux blockchains. Au lieu de cela, il n’y avait qu’une seule preuve d'enjeu Ethereum, qui nécessite désormais deux clients différents par nœud. La chaîne Beacon est désormais la couche de consensus, un réseau de pair à pair de clients de consensus qui gère le gossip des blocs et la logique de consensus, tandis que les clients d'origine forment la couche d'exécution, qui est responsable de l'échange d'informations et de l'exécution des transactions, ainsi que de la gestion de l'état d'Ethereum. Les deux couches peuvent communiquer entre elles en utilisant l'API Engine.

## Que fait la chaîne Beacon ? {#what-does-the-beacon-chain-do}

La chaîne Beacon est le nom donné au registre de comptes utilisé pour la conduite et la coordination du réseau d'Ethereum de [validateurs](/staking/) avant que ces mêmes validateurs commencent réellement la validation des blocs Ethereum. Elle n'exécute pas les transactions ou gère les interactions des contrats intelligents puisque cela est assuré au niveau de la couche d'exécution. La chaîne Beacon est responsable des éléments comme la gestion des blocs et de leur attestation, en accord avec l'algorithme de choix de fourche, tout en gérant les récompenses et les pénalités. Pour en savoir plus, veuillez vous reporter à notre [page d'architecture des noeuds](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Impact de la Chaîne phare {#beacon-chain-features}

### Présentation de la preuve d'enjeu {#introducing-staking}

La Chaîne phare introduit la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/) dans Ethereum. Cela permet de sécuriser Ethereum et pour les validateurs de gagner plus d'ETH au cours du processus. En pratique, le staking implique de miser des ETH pour activer le logiciel de validation. En tant que validateur, vous exécutez le logiciel qui créé et valide de nouveaux blocs dans la chaîne.

La mise en jeu a un objectif similaire au [minage](/developers/docs/consensus-mechanisms/pow/mining/), mais diffère à plusieurs titres. Le minage nécessitait d’importantes dépenses initiales sous la forme d’une puissante consommation en matériel et énergie, entraînant des économies d’échelle et promouvant la centralisation. Le minage n'impliquait pas non plus l'obligation de bloquer les actifs en tant que garantie, ce qui limite la capacité du protocole à punir les mauvais acteurs après une attaque.

La transition vers la preuve d'enjeu a rendu Ethereum nettement plus sûr et décentralisé par comparaison avec la preuve de travail. Plus le nombre de participants sera élevé sur le réseau, plus celui-ci sera décentralisé et à l'abri des attaques.

De plus, l'utilisation de la preuve d'enjeu comme mécanisme de consensus est un composant fondamental pour un [Ethereum sécurisé, respectueux de l'environnement et évolutif tel que nous le connaissons maintenant](/roadmap/vision/).

<InfoBanner emoji=":money_bag:">
  Si vous souhaitez devenir validateur et aider à sécuriser Ethereum, <a href="/staking/">familiarisez-vous avec le concept de mise en jeu</a>.
</InfoBanner>

### Mise en place de la fragmentation {#setting-up-for-sharding}

Depuis que la Chaîne phare a fusionné avec le réseau principal Ethereum d'origine, la communauté Ethereum a commencé à chercher à mettre le réseau à niveau.

La preuve d’enjeu présente l’avantage d’avoir un registre de tous les producteurs de blocs approuvés à un moment donné, chacun avec l’ETH en jeu. Ce registre ouvre la voie à la possibilité de diviser et de conquérir mais de manière fiable et de séparer les responsabilités spécifiques des réseaux.

Cette responsabilité contraste avec la preuve de travail, où les mineurs n'ont aucune obligation à l'égard du réseau et pourraient arrêter de miner et fermer définitivement leur logiciel de nœud en un instant et sans répercussion. Il n'y a pas non plus de registre des soumissionnaires de blocs connus et aucun moyen fiable de séparer en toute sécurité les responsabilités des réseaux.

[En savoir plus sur la fragmentation](/roadmap/danksharding/)

## Relation entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau d'Ethereum sont plus ou moins interdépendantes. Récapitulons donc comment la chaîne phare affecte les autres mises à niveau.

### La Chaîne phare et La Fusion {#merge-and-beacon-chain}

Au début, la Chaîne phare existait séparément du réseau principal Ethereum, mais ils ont été fusionnés en 2022.

<ButtonLink href="/roadmap/merge/">
  La Fusion
</ButtonLink>

### Fragments et chaîne phare {#shards-and-beacon-chain}

La fragmentation ne peut s'ajouter en toute sécurité dans l'écosystème Ethereum que s'il existe un mécanisme de consensus sur la preuve d'enjeu. La Chaîne phare a introduit la mise en jeu qui a « fusionné » avec le réseau principal et a ouvert la voie à la fragmentation pour favoriser une plus grande évolutivité d'Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Chaînes de fragments
</ButtonLink>

## Complément d'information

- [En savoir plus sur les futures mises à jour d'Ethereum](/roadmap/vision)
- [En savoir plus sur l'architecture d'un noeud](/developers/docs/nodes-and-clients/node-architecture)
- [En savoir plus sur la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos)
