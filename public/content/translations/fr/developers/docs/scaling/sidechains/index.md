---
title: Chaînes latérales
description: Une introduction aux chaînes latérales en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum.
lang: fr
sidebarDepth: 3
---

Une chaîne latérale est une chaîne de blocs distincte qui fonctionne indépendamment d'[Ethereum](/) et qui est connectée au réseau principal Ethereum par un pont bidirectionnel. Les chaînes latérales peuvent avoir des paramètres de bloc et des [algorithmes de consensus](/developers/docs/consensus-mechanisms/) distincts, qui sont souvent conçus pour un traitement efficace des transactions. L'utilisation d'une chaîne latérale implique cependant des compromis, car elles n'héritent pas des propriétés de sécurité d'Ethereum. Contrairement aux [solutions de mise à l'échelle de couche 2 (l2)](/layer-2/), les chaînes latérales ne renvoient pas les changements d'état et les données de transaction au réseau principal Ethereum.

Les chaînes latérales sacrifient également une certaine mesure de décentralisation ou de sécurité pour atteindre un débit élevé ([trilemme de la mise à l'échelle](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum s'engage cependant à se mettre à l'échelle sans compromettre la décentralisation et la sécurité.

## Comment fonctionnent les chaînes latérales ? {#how-do-sidechains-work}

Les chaînes latérales sont des chaînes de blocs indépendantes, avec des historiques, des feuilles de route de développement et des considérations de conception différents. Bien qu'une chaîne latérale puisse partager certaines similitudes superficielles avec Ethereum, elle possède plusieurs caractéristiques distinctives.

### Algorithmes de consensus {#consensus-algorithms}

L'une des qualités qui rendent les chaînes latérales uniques (c'est-à-dire différentes d'Ethereum) est l'algorithme de consensus utilisé. Les chaînes latérales ne dépendent pas d'Ethereum pour le consensus et peuvent choisir des protocoles de consensus alternatifs qui répondent à leurs besoins. Voici quelques exemples d'algorithmes de consensus utilisés sur les chaînes latérales :

- [Preuve d'autorité (PoA)](/developers/docs/consensus-mechanisms/poa/)
- [Preuve d'enjeu déléguée](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Tolérance aux pannes byzantines](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Comme Ethereum, les chaînes latérales ont des nœuds de validation qui vérifient et traitent les transactions, produisent des blocs et stockent l'état de la chaîne de blocs. Les validateurs sont également responsables du maintien du consensus sur le réseau et de sa sécurisation contre les attaques malveillantes.

#### Paramètres de bloc {#block-parameters}

Ethereum impose des limites sur les [temps de bloc](/developers/docs/blocks/#block-time) (c'est-à-dire le temps nécessaire pour produire de nouveaux blocs) et les [tailles de bloc](/developers/docs/blocks/#block-size) (c'est-à-dire la quantité de données contenues par bloc, libellée en gaz). À l'inverse, les chaînes latérales adoptent souvent des paramètres différents, tels que des temps de bloc plus rapides et des limites de gaz plus élevées, pour atteindre un débit élevé, des transactions rapides et des frais réduits.

Bien que cela présente certains avantages, cela a des implications critiques pour la décentralisation et la sécurité du réseau. Les paramètres de bloc, comme des temps de bloc rapides et de grandes tailles de bloc, augmentent la difficulté d'exécuter un nœud complet, laissant quelques « supernœuds » responsables de la sécurisation de la chaîne. Dans un tel scénario, la possibilité de collusion entre validateurs ou d'une prise de contrôle malveillante de la chaîne augmente.

Pour que les chaînes de blocs se mettent à l'échelle sans nuire à la décentralisation, l'exécution d'un nœud doit être ouverte à tous, et pas nécessairement aux parties disposant de matériel spécialisé. C'est pourquoi des efforts sont en cours pour s'assurer que tout le monde puisse [exécuter un nœud complet](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) sur le réseau Ethereum.

### Compatibilité EVM {#evm-compatibility}

Certaines chaînes latérales sont compatibles avec l'EVM et sont capables d'exécuter des contrats développés pour la [Machine Virtuelle Ethereum (EVM)](/developers/docs/evm/). Les chaînes latérales compatibles avec l'EVM prennent en charge les contrats intelligents [écrits en Solidity](/developers/docs/smart-contracts/languages/), ainsi que d'autres langages de contrats intelligents EVM, ce qui signifie que les contrats intelligents écrits pour le réseau principal Ethereum fonctionneront également sur les chaînes latérales compatibles avec l'EVM.

Cela signifie que si vous souhaitez utiliser votre [application décentralisée (dapp)](/developers/docs/dapps/) sur une chaîne latérale, il vous suffit de déployer votre [contrat intelligent](/developers/docs/smart-contracts/) sur cette chaîne latérale. Elle ressemble, se ressent et agit exactement comme le Réseau principal : vous écrivez des contrats en Solidity et interagissez avec la chaîne via le RPC de la chaîne latérale.

Parce que les chaînes latérales sont compatibles avec l'EVM, elles sont considérées comme une [solution de mise à l'échelle](/developers/docs/scaling/) utile pour les dapps natives d'Ethereum. Avec votre dapp sur une chaîne latérale, les utilisateurs peuvent profiter de frais de gaz réduits et de transactions plus rapides, en particulier si le Réseau principal est congestionné.

Cependant, comme expliqué précédemment, l'utilisation d'une chaîne latérale implique des compromis importants. Chaque chaîne latérale est responsable de sa sécurité et n'hérite pas des propriétés de sécurité d'Ethereum. Cela augmente la possibilité de comportements malveillants qui peuvent affecter vos utilisateurs ou mettre leurs fonds en danger.

### Mouvement des actifs {#asset-movement}

Pour qu'une chaîne de blocs distincte devienne une chaîne latérale du réseau principal Ethereum, elle doit avoir la capacité de faciliter le transfert d'actifs depuis et vers le réseau principal Ethereum. Cette interopérabilité avec Ethereum est obtenue à l'aide d'un pont de chaîne de blocs. Les [ponts](/bridges/) utilisent des contrats intelligents déployés sur le réseau principal Ethereum et une chaîne latérale pour contrôler le transfert de fonds entre eux.

Bien que les ponts aident les utilisateurs à déplacer des fonds entre Ethereum et la chaîne latérale, les actifs ne sont pas physiquement déplacés entre les deux chaînes. Au lieu de cela, des mécanismes qui impliquent généralement la frappe et le burn sont utilisés pour transférer de la valeur entre les chaînes. En savoir plus sur [le fonctionnement des ponts](/developers/docs/bridges/#how-do-bridges-work).

## Avantages et inconvénients des chaînes latérales {#pros-and-cons-of-sidechains}

| Avantages                                                                                                                   | Inconvénients                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| La technologie qui sous-tend les chaînes latérales est bien établie et bénéficie de recherches approfondies et d'améliorations de conception. | Les chaînes latérales sacrifient une certaine mesure de décentralisation et d'absence de confiance requise au profit de la mise à l'échelle.                          |
| Les chaînes latérales prennent en charge le calcul général et offrent une compatibilité EVM (elles peuvent exécuter des dapps natives d'Ethereum).                    | Une chaîne latérale utilise un mécanisme de consensus distinct et ne bénéficie pas des garanties de sécurité d'Ethereum.         |
| Les chaînes latérales utilisent différents modèles de consensus pour traiter efficacement les transactions et réduire les frais de transaction pour les utilisateurs.         | Les chaînes latérales nécessitent des hypothèses de confiance plus élevées (par exemple, un quorum de validateurs de chaîne latérale malveillants peut commettre une fraude). |
| Les chaînes latérales compatibles avec l'EVM permettent aux dapps d'étendre leur écosystème.                                                            |                                                                                                                  |

### Utiliser les chaînes latérales {#use-sidechains}

Plusieurs projets fournissent des implémentations de chaînes latérales que vous pouvez intégrer dans vos dapps :

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (anciennement xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Complément d'information {#further-reading}

- [Mise à l'échelle des dapps Ethereum via les chaînes latérales](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 fév. 2018 - Georgios Konstantopoulos_

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_