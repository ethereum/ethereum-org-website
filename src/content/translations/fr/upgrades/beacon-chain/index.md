---
title: La chaîne phare
description: En savoir plus sur la chaîne phare - la mise à niveau qui a introduit la preuve d'enjeu d'Ethereum.
lang: fr
template: upgrade
image: ../../../../../assets/upgrades/core.png
summaryPoint1: La chaîne phare ne change rien à la manière actuelle d'utiliser Ethereum.
summaryPoint2: Elle assurera la coordination du réseau, en servant de couche de consensus.
summaryPoint3: Elle a introduit la preuve d'enjeu dans l'écosystème Ethereum.
summaryPoint4: Vous pouvez le connaître sous le nom de « Phase 0 » sur les feuilles de route techniques.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    La chaîne phare a démarré le 1er décembre à midi UTC. Pour en savoir plus, <a href="https://beaconscan.com/">explorez les données</a>. Si vous voulez aider à valider la chaîne, vous pouvez <a href="/staking/">miser vos ETH</a>.
</UpgradeStatus>

## Que fait la chaîne phare ? {#what-does-the-beacon-chain-do}

La chaîne phare dirigera ou coordonnera le réseau étendu de [fragments](/upgrades/sharding/) et de [validateurs](/staking/). Mais ce ne sera pas comme le [réseau principal Ethereum](/glossary/#mainnet) d'aujourd'hui. Elle ne peut gérer ni les comptes ni les contrats intelligents.

Le rôle de la chaîne phare évoluera au fil du temps, mais restera un élément fondamental de l'[Ethereum sécurisé, durable et évolutif auquel nous travaillons](/upgrades/vision/).

## Fonctionnalités de la chaîne phare {#beacon-chain-features}

### Présentation de la preuve d'enjeu {#introducing-staking}

La chaîne phare introduira la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/) dans Ethereum. C'est une nouvelle façon pour vous de contribuer à la sécurité d'Ethereum. Pensez-y comme un bien public qui rendra Ethereum plus sain et vous fera gagner plus d'ETH dans le processus. En pratique, vous devrez miser des ETH pour activer le logiciel de validation. En tant que validateur, vous traiterez les transactions et créerez de nouveaux blocs dans la chaîne.

Miser des ETH et devenir validateur est plus simple que de [miner](/developers/docs/mining/) (ce qui sécurise actuellement le réseau). Et nous espérons que cela contribuera à améliorer la sécurité d'Ethereum sur le long terme. Plus le nombre de participants sera élevé sur le réseau, plus celui-ci sera décentralisé et à l'abri des attaques.

<InfoBanner emoji=":money_bag:">
Si vous souhaitez devenir validateur et aider à sécuriser la chaîne phare, <a href="/staking/">familiarisez-vous avec le concept de mise en jeu</a>.
</InfoBanner>

Il s'agit également d'un changement important pour une autre mise à jour : [les chaînes de fragments](/upgrades/sharding/).

### Mise en place des chaînes de fragments {#setting-up-for-shard-chains}

Après que le réseau principal ait fusionné avec la chaîne phare, la prochaine mise à jour introduira les chaînes de fragments au réseau de preuve de mise à enjeu. Ces "fragments" augmenteront la capacité du réseau et amélioreront la vitesse de transaction en étendant le réseau à 64 blockchains. La chaîne phare est une première étape importante dans l'introduction des chaînes fragment, car elles requièrent des enjeux pour fonctionner en toute sécurité.

Au final, la chaîne phare sera également responsable de l'assignation aléatoire des validateurs pour sécuriser les chaînes fragment. Il s'agit d'un élément clé pour rendre difficile la collusion entre les acteurs et la prise de contrôle d'un fragment. Cela signifie qu'ils ont [ moins d'un milliard de chances](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relations entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau d'Ethereum sont plus ou moins interdépendantes. Récapitulons donc comment la chaîne phare affecte les autres mises à niveau.

### Réseau principal et chaîne phare {#mainnet-and-beacon-chain}

La chaîne phare existera d'abord séparément du réseau principal Ethereum que nous utilisons aujourd'hui. Mais elles finiront par être connectées. Le plan est de "fusionner" le réseau principal dans le système de preuve à enjeu qui sera contrôlé et coordonné par la chaîne phare.

<ButtonLink to="/upgrades/merge/">
    La fusion
</ButtonLink>

### Chaîne phare et chaîne de fragments {#shards-and-beacon-chain}

Les chaînes de fragments ne peuvent s'ajouter en toute sécurité dans l'écosystème Ethereum que s'il existe un mécanisme de consensus sur la preuve de mise à enjeu. La chaîne phare introduira la mise en jeu, ouvrant la voie à la mise à niveau suivante : la chaîne de fragments.

<ButtonLink to="/upgrades/sharding/">
    Chaînes de fragments
</ButtonLink>

<Divider />

## Interagir avec la chaîne phare {#interact-with-beacon-chain}

<BeaconChainActions />
