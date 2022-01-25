---
title: La chaîne phare
description: Découvrez la chaîne phare, première mise à niveau majeure - Eth2 d'Ethereum.
lang: fr
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/core.png
summaryPoint1: La chaîne phare ne change en rien l'Ethereum que nous utilisons aujourd'hui.
summaryPoint2: Elle coordonnera le réseau.
summaryPoint3: Elle introduit la preuve d'enjeu dans l'écosystème Ethereum.
summaryPoint4: On peut la voir comme la phase 0 de la feuille de route.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
  La chaîne phare a démarré le 1er décembre à midi UTC. Pour en savoir plus, <a href="https://beaconscan.com/">explorez les données</a>. Si vous voulez aider à valider la chaîne, vous pouvez <a href="/staking/">miser vos ETH</a>.
</UpgradeStatus>

## Que fait la chaîne phare ? {#what-does-the-beacon-chain-do}

La chaîne phare dirigera ou coordonnera le réseau étendu de [fragments](/upgrades/shard-chains/) et de [validateurs](/staking/). Mais ce ne sera pas comme le [réseau principal Ethereum](/glossary/#mainnet) d'aujourd'hui. Elle ne peut gérer ni les comptes ni les contrats intelligents.

Le rôle de la chaîne phare évoluera au fil du temps, mais restera un élément fondamental de l'[Ethereum sécurisé, durable et évolutif auquel nous travaillons](/upgrades/vision/).

## Fonctionnalités de la chaîne phare {#beacon-chain-features}

### Présentation de la mise en jeu {#introducing-staking}

La chaîne phare introduira la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/) dans Ethereum. C'est une nouvelle façon pour vous de contribuer à la sécurité d'Ethereum. Pensez-y comme un bien public qui rendra Ethereum plus sain et vous fera gagner plus d'ETH dans le processus. En pratique, vous devrez miser des ETH pour activer le logiciel de validation. En tant que validateur, vous traiterez les transactions et créerez de nouveaux blocs dans la chaîne.

Miser des ETH et devenir validateur est plus simple que de [miner](/developers/docs/mining/) (ce qui sécurise actuellement le réseau). Et nous espérons que cela contribuera à améliorer la sécurité d'Ethereum sur le long terme. Plus le nombre de participants sera élevé sur le réseau, plus celui-ci sera décentralisé et à l'abri des attaques.

<InfoBanner emoji=":money_bag:">
  Si vous souhaitez devenir validateur et aider à sécuriser la chaîne phare, <a href="/staking/">familiarisez-vous avec le concept de mise en jeu</a>.
</InfoBanner>

C'est également un changement important pour de prochaines mises à jours d'Eth2 : comme les [chaînes fragmentées](/upgrades/shard-chains/).

### Mise en place des chaînes fragment {#setting-up-for-shard-chains}

Après que le réseau principal ait fusionné avec la chaîne phare, la prochaine mise à jour introduira les chaînes fragmentées au réseau de preuve à enjeu. Ces "fragments" augmenteront la capacité du réseau et amélioreront la vitesse de transaction en étendant le réseau à une chaine de 64 blocks. La chaîne phare est une première étape importante dans l'introduction des chaînes fragment, car elles requièrent des enjeux pour fonctionner en toute sécurité.

Au final, la chaîne phare sera également responsable de l'assignation aléatoire des validateurs pour sécuriser les chaînes fragment. C'est la clé pour qu'il soit difficile pour les validateurs de s'entendre et de prendre le contrôle d'un fragment. En fait, cela signifie qu'ils ont [ moins d'une chance sur un milliard](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relations entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau d'Eth2 sont en quelque sorte liées. Récapitulons donc comment la chaîne phare affecte les autres mises à niveau.

### Mainnet et chaîne phare {#mainnet-and-beacon-chain}

La chaîne phare existera d'abord séparément du réseau principal Ethereum que nous utilisons aujourd'hui. Mais elles finiront par être connectées. Le plan est de « fusionner » le réseau principal dans le système de preuve à enjeu qui sera contrôlé et coordonné par la chaîne phare.

<ButtonLink to="/upgrades/merge/">
  Le fusionnement
</ButtonLink>

### Chaîne phare et chaîne de fragments {#shards-and-beacon-chain}

Les chaînes fragment ne peuvent s'ajouter en toute sécurité dans l'écosystème Ethereum que s'il existe un mécanisme de consensus sur la preuve d'enjeu. La chaîne phare introduira la mise en jeu, ouvrant la voie à la mise à niveau suivante : la chaîne de fragments.

<ButtonLink to="/upgrades/shard-chains/">
  Chaines de fragments
</ButtonLink>

<Divider />

## Interagir avec la chaîne phare {#interact-with-beacon-chain}

<BeaconChainActions />
