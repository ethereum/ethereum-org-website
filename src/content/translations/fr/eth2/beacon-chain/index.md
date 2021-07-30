---
title: La chaîne phare
description: "Découvrez la chaîne phare, première mise à niveau majeure Eth2 d'Ethereum."
lang: fr
template: eth2
sidebar: true
image: ../../../../../assets/eth2/core.png
summaryPoints:
  [
    "La chaîne phare ne change en rien l'Ethereum que nous utilisons aujourd'hui.",
    "Elle coordonnera le réseau.",
    "Elle introduit la preuve d'enjeu dans l'écosystème Ethereum.",
    "On peut la voir comme la phase 0 de la feuille de route.",
  ]
---

<UpgradeStatus isShipped date="Shipped!">
    La chaîne phare a démarré le 1er décembre à midi UTC. Pour en savoir plus, <a href="https://beaconscan.com/">explorez les données</a>. Si vous voulez aider à valider la chaîne, vous pouvez <a href="/eth2/staking/">miser vos ETH</a>.
</UpgradeStatus>

## Que fait la chaîne phare ? {#what-does-the-beacon-chain-do}

La chaîne phare dirigera ou coordonnera le réseau étendu de [fragments](/eth2/shard-chains/) et de [validateurs](/eth2/staking/). Mais ce ne sera pas comme [le réseau principal d'Ethereum](/glossary/#mainnet) d'aujourd'hui. Elle ne peut gérer ni les comptes ni les contrats intelligents.

Le rôle de la chaîne phare évoluera au fil du temps, mais restera un élément fondamental de l'[Ethereum sécurisé, durable et évolutif auquel nous travaillons](/eth2/vision/).

## Fonctionnalités de la chaîne phare {#beacon-chain-features}

### Présentation de la mise en jeu {#introducing-staking}

La chaîne phare introduira la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/) dans Ethereum. C'est une nouvelle façon pour vous de contribuer à la sécurité d'Ethereum. Pensez-y comme un bien public qui rendra Ethereum plus sain et vous fera gagner plus d'ETH dans le processus. En pratique, vous devrez miser des ETH pour activer le logiciel de validation. En tant que validateur, vous traiterez les transactions et créerez de nouveaux blocs dans la chaîne.

Miser des ETH et devenir validateur est plus simple que de [miner](/developers/docs/mining/) (ce qui sécurise actuellement le réseau). Et nous espérons que cela contribuera à améliorer la sécurité d'Ethereum sur le long terme. Plus le nombre de participants sera élevé sur le réseau, plus celui-ci sera décentralisé et à l'abri des attaques.

<InfoBanner emoji=":money_bag:">
Si vous souhaitez devenir validateur et aider à sécuriser la chaîne phare, <a href="/eth2/staking/">familiarisez-vous avec le concept de mise en jeu</a>.
</InfoBanner>

C'est également un changement important pour la deuxième mise à niveau d'Eth2 : [les chaînes fragment](/eth2/shard-chains/).

### Mise en place des chaînes fragment {#setting-up-for-shard-chains}

Les chaînes fragment constitueront la deuxième mise à niveau d'Eth2. Ils augmenteront la capacité du réseau et amélioreront la vitesse des transactions en étendant le réseau à 64 blockchains. La chaîne phare est une première étape importante dans l'introduction des chaînes fragment, car elles requièrent des enjeux pour fonctionner en toute sécurité.

Au final, la chaîne phare sera également responsable de l'assignation aléatoire des validateurs pour sécuriser les chaînes fragment. Il s'agit d'un élément clé pour compliquer toute tentative de collusion entre les validateurs qui essaieraient de prendre le contrôle d'un fragment. En fait, ça réduit leur chance de réussite à [ moins d'une chance sur un trillion](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relations entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau d'Eth2 sont en quelque sorte liées. Récapitulons donc comment la chaîne phare affecte les autres mises à niveau.

### Mainnet et chaîne phare {#mainnet-and-beacon-chain}

La chaîne phare, dans un premier temps, existera séparément du réseau principal Ethereum que nous utilisons aujourd'hui. Mais elles finiront par être connectées. Le but est "d'arrimer" le réseau principal au système de preuve d'enjeu qui est contrôlé et coordonné par la chaîne phare.

<ButtonLink to="/eth2/merge/">L'arrimage</ButtonLink>

### Chaîne phare et chaîne de fragments {#shards-and-beacon-chain}

Les chaînes fragment ne peuvent pénétrer en toute sécurité dans l'écosystème Ethereum que s'il existe un mécanisme de consensus sur la preuve d'enjeu. La chaîne phare introduira la mise en jeu, ouvrant la voie à la mise à niveau suivante : la chaîne de fragments.

<ButtonLink to="/eth2/shard-chains/">Chaînes fragment</ButtonLink>

<Divider />

## Interagir avec la chaîne phare {#interact-with-beacon-chain}

<Eth2BeaconChainActions />
