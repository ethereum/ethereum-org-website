---
title: La chaîne phare
description: En savoir plus sur la chaîne phare - la mise à niveau qui a introduit la preuve d'enjeu d'Ethereum.
lang: fr
template: upgrade
image: /upgrades/core.png
alt: 
summaryPoint1: La Chaîne phare a introduit la preuve d'enjeu dans l'écosystème Ethereum.
summaryPoint2: Elle a été fusionnée avec la chaîne originale de preuve de travail Ethereum en septembre 2022.
summaryPoint3: La Chaîne phare a introduit la logique de consensus et le protocole de commutation de bloc qui sécurise désormais Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La Chaîne phare a été présentée le 1er décembre 2020 et a formalisé la preuve d'enjeu comme mécanisme de consensus d'Ethereum avec La Fusion du 15 septembre 2022.
</UpgradeStatus>

## Qu'est-ce que fut la Chaîne phare ? {#what-is-the-beacon-chain}

La Chaîne phare était le nom de la blockchain originale par preuve d'enjeu qui a été lancée en 2020. Elle a été créé pour s'assurer que la logique de consensus par preuve d'enjeu était saine et durable avant de l'activer sur le réseau principal Ethereum. Par conséquent, elle a fonctionné aux côtés de l'Ethereum original de preuve de travail. La désactivation de la preuve de travail au profit de la preuve d'enjeu sur Ethereum nécessite d'indiquer à la Chaîne phare d'accepter les transactions de la chaîne Ethereum d'origine, de les regrouper en blocs, puis les organiser en blockchain en utilisant un mécanisme de consensus basé sur la preuve d'enjeu. Au même moment, les clients originaux d'Ethereum ont arrêté leur minage, la propagation du bloc et la logique de consensus, regroupant tout ceci sur la Chaîne phare. Cet événement était connu sous le nom de [La Fusion](/roadmap/merge/). Une fois la Fusion réalisée, il n'y avait plus deux blockchains mais une chaîne unique Ethereum de preuve d'enjeu.

## Que fait la Chaîne phare ? {#what-does-the-beacon-chain-do}

La Chaîne phare était le nom donné à un registre de comptes qui a mené et coordonné le réseau des [validateurs Ethereum](/staking/) avant que ces mêmes validateurs ne commencent à valider de véritables transactions Ethereum. Elle ne traitait pas les transactions ou ne gérait pas les interactions entre les contrats intelligents.

Elle a introduit le moteur de consensus (ou « couche de consensus ») qui a pris la place du minage par preuve de travail sur Ethereum et a apporté de nombreuses améliorations significatives.

La Chaîne phare était un composant fondamental pour [la sécurisation, le respect environnemental et l'évolutivité d'Ethereum](/roadmap/vision/).

## Impact de la Chaîne phare {#beacon-chain-features}

### Présentation de la preuve d'enjeu {#introducing-staking}

La Chaîne phare introduit la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/) dans Ethereum. Cela permet de sécuriser Ethereum et pour les validateurs de gagner plus d'ETH au cours du processus. En pratique, le staking implique de miser des ETH pour activer le logiciel de validation. En tant que validateur, vous exécutez le logiciel qui créé et valide de nouveaux blocs dans la chaîne.

La mise en jeu a un objectif similaire au [minage](/developers/docs/mining/), mais diffère à plusieurs titres. Le minage nécessitait d’importantes dépenses initiales sous la forme d’une puissante consommation en matériel et énergie, entraînant des économies d’échelle et promouvant la centralisation. Le minage n'impliquait pas non plus l'obligation de bloquer les actifs en tant que garantie, ce qui limite la capacité du protocole à punir les mauvais acteurs après une attaque.

La transition vers la preuve d'enjeu rend Ethereum nettement plus sûr et décentralisé par comparaison. Plus le nombre de participants sera élevé sur le réseau, plus celui-ci sera décentralisé et à l'abri des attaques.

<InfoBanner emoji=":money_bag:">
  Si vous souhaitez devenir validateur et aider à sécuriser Ethereum, <a href="/staking/">familiarisez-vous avec le concept de mise en jeu</a>.
</InfoBanner>

### Mise en place de la fragmentation {#setting-up-for-sharding}

Depuis que la Chaîne phare a fusionné avec le réseau principal Ethereum d'origine, la communauté Ethereum a commencé à chercher à mettre le réseau à niveau.

La preuve d’enjeu présente l’avantage d’avoir un registre de tous les producteurs de blocs approuvés à un moment donné, chacun avec l’ETH en jeu. Ce registre ouvre la voie à la possibilité de diviser et de conquérir mais de manière fiable et de séparer les responsabilités spécifiques des réseaux.

Cette responsabilité contraste avec la preuve de travail, où les mineurs n'ont aucune obligation à l'égard du réseau et pourraient arrêter de miner et fermer définitivement leur logiciel de nœud en un instant et sans répercussion. Il n'y a pas non plus de registre des soumissionnaires de blocs connus et aucun moyen fiable de séparer en toute sécurité les responsabilités des réseaux.

[En savoir plus sur la fragmentation](/roadmap/danksharding/)

## Relation entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau Ethereum sont plus ou moins interdépendantes. Récapitulons donc comment la chaîne phare affecte les autres mises à niveau.

### La Chaîne phare et La Fusion {#merge-and-beacon-chain}

Au début, La Chaîne phare existait séparément du réseau principal Ethereum, mais ils ont été fusionnés en 2022.

<ButtonLink to="/roadmap/merge/">
  La Fusion
</ButtonLink>

### Fragments et chaîne phare {#shards-and-beacon-chain}

La fragmentation ne peut s'ajouter en toute sécurité dans l'écosystème Ethereum que s'il existe un mécanisme de consensus sur la preuve d'enjeu. La Chaîne phare a introduit la notion de mise en jeu qui a « fusionnée » avec le réseau principal et a ouvert la voie à la fragmentation pour favoriser une plus grande évolutivité d'Ethereum.

<ButtonLink to="/roadmap/danksharding/">
  Chaînes de fragments
</ButtonLink>

## Complément d'information

- [En savoir plus sur les futures mises à jour d'Ethereum](/roadmap/vision)
- [En savoir plus sur la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos)
