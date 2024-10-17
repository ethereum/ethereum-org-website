---
title: Chaines latérales
description: Une introduction aux chaînes latérales en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum.
lang: fr
sidebarDepth: 3
---

Une chaîne latérale est une blockchain séparée qui fonctionne indépendamment d'Ethereum et qui est connectée au réseau principal d'Ethereum par un pont bidirectionnel. Les chaînes latérales peuvent avoir des paramètres de bloc distincts et [des algorithmes de consensus](/developers/docs/consensus-mechanisms/), qui sont souvent conçus pour un traitement efficace des transactions. L'utilisation d'une chaîne latérale implique toutefois des compromis, car elle n'hérite pas des propriétés de sécurité d'Ethereum. Contrairement aux [solutions de mise à l'échelle de couche 2](/layer-2/), les chaînes latérales ne renvoient pas les changements d'état et les données de transaction au réseau principal Ethereum.

Les chaînes latérales compromettent également une partie de la décentralisation ou de la sécurité pour atteindre un débit élevé ([trilemme de l'évolutivité](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum s'engage toutefois à évoluer sans compromettre la décentralisation et la sécurité, comme indiqué dans sa [déclaration de vision](/roadmap/vision/) pour les mises à niveau.

## Comment fonctionnent les chaînes latérales ? {#how-do-sidechains-work}

Les chaines parallèles sont des blockchains indépendantes, avec des historiques, des feuilles de route de développement et des considérations de conception différents. Même si une chaîne latérale peut partager certaines similitudes en termes de surface avec Ethereum, elle possède plusieurs caractéristiques distinctives.

### Algorithmes de consensus {#consensus-algorithms}

L'un des points qui rend les chaînes latérales uniques (c'est-à-dire différentes d'Ethereum) est l'algorithme de consensus utilisé. Les chaines latérales ne comptent pas sur Ethereum pour obtenir un consensus et peuvent choisir des protocoles de consensus alternatifs qui répondent à leurs besoins. Quelques exemples d'algorithmes de consensus utilisés sur les chaînes latérales incluent :

- [Preuve d'autorité](/developers/docs/consensus-mechanisms/poa/)
- [Preuve d'enjeu déléguée](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Problème des généraux byzantins](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Tout comme Ethereum, les chaînes latérales ont des nœuds qui vérifient et traitent les transactions, produisent des blocs et stockent l'état de la blockchain. Les validateurs sont également responsables du maintien du consensus à travers le réseau et de sa sécurisation contre les attaques malveillantes.

#### Paramètres des blocs {#block-parameters}

Ethereum place des limites sur [le temps de bloc](/developers/docs/blocks/#block-time) (à savoir le temps qu'il faut pour produire de nouveaux blocs) et sur [la taille des blocs](/developers/docs/blocks/#block-size) (à savoir la quantité de données contenues par bloc libellé en gaz). Inversement, les chaînes latérales adoptent souvent des paramètres différents, tels que des temps de blocs plus rapides et des limites de gaz plus élevées, pour atteindre un débit élevé, des transactions rapides et de faibles frais.

Bien que cela présente certains avantages, cela a des implications critiques pour la décentralisation et la sécurité des réseaux. Les paramètres de blocs tels que la temporalité séparant chaque bloc ainsi que la taille de ces derniers peuvent accroître la difficulté d'exécuter un noeud complet, laissant quelques « supernoeuds » responsables de la sécurisation de la chaîne. Dans un tel scénario, la possibilité d'une collusion de validateurs ou d'une prise de contrôle malveillante de la chaîne augmente.

Pour que les blockchains s'échelonnent sans nuire à la décentralisation, exécuter un nœud doit être ouvert à tout le monde — pas nécessairement aux parties qui disposent de matériel spécialisé. C'est pourquoi des efforts sont en cours pour s'assurer que tout le monde peut [exécuter un nœud complet](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) sur le réseau Ethereum.

### Compatibilité EVM {#evm-compatibility}

Certaines chaînes latérales sont compatibles avec l'EVM et sont capables d'exécuter des contrats développés pour la [Machine virtuelle Ethereum (EVM)](/developers/docs/evm/). Les chaînes latérales compatibles avec l'EVM prennent en charge les contrats intelligents [écrits en Solidity](/developers/docs/smart-contracts/languages/), ainsi que d'autres langages de contrats intelligents EVM, ce qui signifie que les contrats intelligents écrits pour le réseau principal Ethereum fonctionneront également sur les chaînes latérales compatibles avec l'EVM.

Cela signifie que si vous voulez utiliser votre [dApp](/developers/docs/dapps/) sur une chaîne latérale, il suffit de déployer votre [contrat intelligent](/developers/docs/smart-contracts/) sur cette chaîne latérale. Cela ressemble en tout point à une interaction avec le réseau principal : vous écrivez vos contrats en Solidity et interagissez avec la chaîne via les RPC des chaînes latérales.

Comme les chaînes latérales sont compatibles avec l'EVM, elles sont considérées comme une [solution de mise à l'échelle](/developers/docs/scaling/) utile pour les dApps natives d'Ethereum. En utilisant une dApp sur une chaîne latérale, les utilisateurs peuvent bénéficier de frais de gaz moins élevés et de transactions plus rapides, surtout si le réseau principal est encombré.

Cependant, comme expliqué précédemment, l'utilisation d'une chaîne latérale implique des compromis importants. Chaque chaîne latérale est responsable de sa sécurité et n'hérite pas des propriétés de sécurité d'Ethereum. Cela augmente la possibilité de comportements malveillants qui peuvent affecter les utilisateurs ou mettre leurs fonds en péril.

### Mouvement des actifs {#asset-movement}

Afin qu'une blockchain séparée devienne une chaîne latérale vers le réseau principal Ethereum, elle a besoin de la capacité de faciliter le transfert des actifs depuis et vers le réseau principal Ethereum. Cette interopérabilité avec Ethereum est obtenue à l'aide d'un pont de connexion blockchain. [Les ponts](/bridges/) utilisent des contrats intelligents déployés sur le réseau principal Ethereum et une chaîne latérale pour contrôler la connexion des fonds entre eux.

Alors que les ponts aident les utilisateurs à déplacer les fonds entre Ethereum et la chaîne parallèle, les actifs ne sont pas déplacés physiquement entre les deux chaînes. Au lieu de cela, le transfert des actifs entre les chaînes est effectué en utilisant les mécanismes de création (mint) et de destruction (burn). En savoir plus sur [comment les ponts fonctionnent](/developers/docs/bridges/#how-do-bridges-work).

## Avantages et inconvénients des chaînes latérales {#pros-and-cons-of-sidechains}

| Avantages                                                                                                                                                              | Inconvénients                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| La technologie qui est derrière les chaînes latérales est bien établie et bénéficie de recherches approfondies et d'améliorations de conception.                       | Les chaînes latérales sacrifient un peu de décentralisation et de confiance pour de l'évolutivité.                                                                                           |
| Les chaînes latérales prennent en charge le calcul général et offrent une compatibilité avec l'EVM (et peuvent exécuter des dApps natives d'Ethereum).                 | Une chaîne latérale utilise un mécanisme de consensus distinct et ne bénéficie pas des garanties de sécurité d'Ethereum.                                                                     |
| Les chaines parallèles utilisent différents modèles de consensus pour traiter efficacement les transactions et réduire les frais de transaction pour les utilisateurs. | Les chaînes latérales nécessitent une confiance plus élevée quant à son fonctionnement (par exemple, un quorum de validateurs malveillants de la chaîne latérale peut commettre une fraude). |
| Les chaînes latérales compatibles avec l'EVM permettent aux dApps d'élargir leur écosystème.                                                                           |                                                                                                                                                                                              |

### Chaînes latérales que vous pouvez utiliser {#use-sidechains}

Plusieurs projets fournissent des implémentations de chaînes latérales que vous pouvez intégrer dans vos dApps :

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (anciennement xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Complément d'information {#further-reading}

- [Scaling Ethereum dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 février 2018, Georgios Konstantopoulos_

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
