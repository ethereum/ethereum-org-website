---
title: Ethereum à l’épreuve du temps
description: Ces mises à niveau consolident Ethereum en tant que couche de base résiliente et décentralisée pour l’avenir, quoi qu’elle réserve.
lang: fr
image: /images/roadmap/roadmap-future.png
alt: "Feuille de route d'Ethereum"
template: roadmap
---

Certaines parties de la feuille de route ne sont pas nécessairement requises pour faire évoluer ou sécuriser Ethereum à court terme, mais permettent à Ethereum d’assurer sa stabilité et sa fiabilité à long terme.

## Résistance quantique {#quantum-resistance}

Une partie de la sécurisation de la [cryptographie](/glossary/#cryptography) actuelle d'Ethereum sera compromise lorsque le calcul quantique deviendra une réalité. Bien que les ordinateurs quantiques soient probablement à des décennies de constituer une véritable menace pour la cryptographie moderne, Ethereum est construit pour être sécurisé pour les siècles à venir. Cela signifie rendre [Ethereum quantique résistant](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) dès que possible.

Le défi auquel sont confrontés les développeurs d'Ethereum est que le protocole actuel de [preuve d'enjeu](/glossary/#pos)repose sur un système de signature très efficace connu sous le nom de BLS pour regrouper les votes sur les [blocs](/glossary/#block) valides. Ce schéma de signature est rompu par les ordinateurs quantiques, mais les alternatives de résistance quantique ne sont pas aussi efficaces.

Les [schémas d'engagement « KZG»](/roadmap/danksharding/#what-is-kzg) utilisés à plusieurs endroits à travers Ethereum pour générer des secrets cryptographiques sont connus pour être vulnérables. Actuellement, cela est contourné en utilisant des « configurations de confiance » où de nombreux utilisateurs génèrent un aléa qui ne peut pas être inversé par un ordinateur quantique. Cependant, la solution idéale serait simplement d'intégrer la cryptographie quantique sûre. Il y a deux approches principales qui pourraient devenir des remplacements efficaces pour le schéma BLS : la signature [basée sur le STARK](https://hackmd.io/@vbuterin/stark_aggregation) et la signature [basée sur le treillis](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Ils sont encore en cours de recherche et de prototype**.

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> En savoir plus sur KZG et les configurations fiables</ButtonLink>

## Ethereum plus simple et plus efficace {#simpler-more-efficient-ethereum}

La complexité crée des opportunités pour les bogues ou les vulnérabilités que des assaillants peuvent exploiter. Par conséquent, une partie de la feuille de route simplifie Ethereum et supprime le code qui a été mis à jour par diverses mises à jour, mais qui n'est plus nécessaire ou peut maintenant être amélioré. Une base de code plus souple et plus simple est plus facile à maintenir et à raisonner pour les développeurs.

Il y a plusieurs mises à jour qui seront faites sur la [machine virtuelle Ethereum (EVM)](/developers/docs/evm) pour la rendre plus simple et plus efficace. Celles-ci incluent [la suppression de l'opcode SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct) - une commande rarement utilisée qui n'est plus nécessaire et dans certaines circonstances peut être dangereuse à utiliser, surtout lorsqu’elle est combinée à d’autres mises à jour futures vers le modèle de stockage Ethereum. Les [clients Ethereum](/glossary/#consensus-client) supportent également certains vieux types de transactions qui peuvent maintenant être complètement supprimés. La façon dont le [gaz](/glossary/#gas) est calculé peut également être amélioré et des méthodes plus efficaces pour l'arithmétique qui sous-tendent certaines opérations cryptographiques peuvent être introduites.

De même, il y a des mises à jour qui peuvent être faites à d'autres parties des clients actuels d'Ethereum. Un exemple est que l'exécution courante et les clients de consensus utilisent un autre type de compression de données. Il sera beaucoup plus facile et plus intuitif de partager des données entre les clients lorsque le système de compression sera unifié sur l'ensemble du réseau.

## Progrès actuels {#current-progress}

La plupart des mises à jour requises pour la pérennité d'Ethereum sont **toujours en phase de recherche et peuvent prendre plusieurs années** avant d'être mises en œuvre. Les mises à niveau telles que la suppression de SELFDESTRUCT et l'harmonisation du système de compression utilisé dans l'exécution et les clients de consensus sont susceptibles d'advenir plus tôt que la cryptographie résistante au quantique.

**Complément d'information**

- [Gaz](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Structures des données](/developers/docs/data-structures-and-encoding)
