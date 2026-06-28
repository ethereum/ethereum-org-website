---
title: zkEVM pour la vérification de bloc de la couche 1 (l1)
description: Découvrez comment les preuves à divulgation nulle de connaissance peuvent vérifier l'exécution des blocs Ethereum, permettant un débit plus élevé et des exigences moindres pour les validateurs.
lang: fr
---

Le zkEVM est une technologie qui utilise des [preuves à divulgation nulle de connaissance](/zero-knowledge-proofs/) pour vérifier l'exécution des blocs Ethereum. Au lieu d'exiger que chaque [validateur](/glossary/#validator) réexécute toutes les transactions d'un bloc, un seul acteur spécialisé (appelé « prouveur ») exécute le bloc et génère une preuve cryptographique que l'exécution était correcte. N'importe quel nœud peut ensuite vérifier cette preuve, un processus qui est infiniment moins coûteux que de réexécuter toutes les transactions.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>À ne pas confondre avec les rollups zkEVM</AlertTitle>
<AlertDescription>
Cette page traite de l'utilisation du zkEVM pour vérifier l'exécution des blocs de la couche 1 (l1) d'Ethereum. Pour les rollups zkEVM qui utilisent des preuves à divulgation nulle de connaissance (ZK) pour mettre à l'échelle Ethereum en tant que solutions de couche 2 (l2), consultez les [rollups à divulgation nulle de connaissance](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Le problème de la réexécution {#reexecution-problem}

Aujourd'hui, Ethereum utilise un modèle de vérification « N-sur-N » : chaque validateur doit réexécuter indépendamment chaque transaction de chaque bloc pour vérifier que les changements d'état proposés sont corrects. Bien que cette approche soit au maximum sans tiers de confiance, elle crée un goulot d'étranglement fondamental.

Le problème est que le débit d'Ethereum est limité par ce que le validateur moyen peut traiter. Augmenter la [limite de gaz](/glossary/#gas-limit) permettrait d'avoir plus de transactions par bloc, mais cela augmenterait également les exigences matérielles pour les validateurs. Cela menace la décentralisation : si l'exécution d'un validateur nécessite un matériel coûteux, moins de personnes peuvent participer à la sécurisation du réseau.

Le zkEVM offre une issue à ce compromis. En passant de « tout le monde réexécute » à « un seul prouve, tout le monde vérifie », Ethereum peut augmenter la limite de gaz en toute sécurité sans augmenter les exigences matérielles des validateurs.

## Comment fonctionne la vérification zkEVM de la couche 1 (l1) {#how-it-works}

La vérification zkEVM transforme la validation de bloc en un modèle « 1-sur-N » :

1. **Exécution** : Un prouveur exécute toutes les transactions d'un bloc, en suivant chaque changement d'état
2. **Preuve** : Le prouveur génère une preuve cryptographique (un [SNARK ou STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)) qui atteste de l'exactitude de l'exécution
3. **Vérification** : Les validateurs vérifient la preuve au lieu de réexécuter les transactions, ce qui est considérablement moins cher qu'une réexécution complète

La garantie de sécurité reste la même : si l'exécution était incorrecte, aucune preuve valide ne peut être générée. Mais désormais, au lieu que chaque nœud effectue des calculs coûteux, seul le prouveur le fait, et la vérification est suffisamment bon marché pour ne pas contraindre la limite de gaz.

### zkEVM de Type 1 {#type-1-zkevm}

Les zkEVM sont classés en types en fonction de leur compatibilité avec Ethereum :

- **Type 1** : Totalement équivalent à Ethereum. Aucune modification de l'EVM, de sorte que n'importe quel bloc Ethereum peut être prouvé exactement tel quel
- **Types 2 à 4** : Font divers compromis, modifiant le comportement de l'EVM pour faciliter la génération de preuves

Pour la vérification de la couche 1 (l1), le Type 1 est essentiel. Le zkEVM doit être capable de prouver n'importe quel bloc Ethereum valide, y compris les cas particuliers et les blocs historiques. Tout écart par rapport au comportement exact d'Ethereum créerait des problèmes de consensus.

Les recherches de la Fondation Ethereum sur le zkEVM se concentrent sur les implémentations de Type 1 qui sont entièrement compatibles avec l'exécution Ethereum existante.

## Avantages pour Ethereum {#benefits}

### Débit plus élevé {#higher-throughput}

Lorsque la vérification est peu coûteuse, la limite de gaz peut augmenter en toute sécurité. Cela accroît la capacité du réseau et aide à stabiliser les frais pendant les périodes de forte demande. La limite de gaz actuelle est en partie contrainte par le matériel des validateurs ; le zkEVM supprime cette contrainte.

### Décentralisation renforcée {#stronger-decentralization}

Avec la vérification zkEVM, les validateurs n'ont besoin que de vérifier les preuves plutôt que d'exécuter les transactions. Cela réduit considérablement les exigences matérielles pour exécuter un validateur, permettant à plus de personnes de participer à la sécurisation du réseau. Une plus grande diversité de validateurs renforce la résistance à la censure et la résilience d'Ethereum.

Notez que la génération de preuves elle-même nécessite des ressources de calcul importantes, supérieures à celles du matériel actuel des validateurs. Cependant, contrairement à la validation, la génération de preuves n'a pas besoin d'être décentralisée de la même manière : une seule preuve correcte est nécessaire par bloc, et n'importe qui peut la vérifier rapidement. La recherche sur les marchés de prouveurs, l'agrégation de preuves et l'accélération matérielle vise à garantir que la génération de preuves reste compétitive et accessible plutôt que concentrée entre quelques grands opérateurs.

### Finalité prévisible {#predictable-finality}

La vérification des preuves s'opère en temps constant, quelle que soit la complexité du bloc. Cela rend le moment de l'attestation plus prévisible et réduit les attestations manquées qui peuvent survenir lorsque les validateurs peinent à traiter les blocs complexes à temps.

## Défis de la génération de preuves en temps réel {#realtime-proving}

Le principal défi de la vérification zkEVM de la couche 1 (l1) est la vitesse. Les blocs Ethereum sont produits toutes les 12 secondes, ce qui signifie que les preuves doivent être générées dans un délai similaire pour être utiles au consensus.

Les implémentations actuelles de zkEVM peuvent prendre des minutes, voire des heures, pour prouver un seul bloc. La recherche se concentre sur la réduction de cet écart grâce à :

- **Parallélisation** : Répartition du travail de génération de preuves sur plusieurs machines
- **Matériel spécialisé** : Conception de circuits et de matériel optimisés pour la génération de preuves à divulgation nulle de connaissance (ZK)
- **Améliorations algorithmiques** : Systèmes de preuves et conceptions de circuits plus efficaces
- **Génération de preuves incrémentale** : Génération de preuves au fur et à mesure de l'exécution des transactions, plutôt qu'après

## Recherches et implémentations actuelles {#current-research}

La Fondation Ethereum finance la recherche sur le zkEVM par l'intermédiaire de l'équipe [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). Les principaux axes de recherche comprennent :

- **Génération de preuves en temps réel** : Génération de preuves de blocs complets dans des créneaux de 12 secondes
- **Intégration client** : Standardisation des interfaces entre les clients d'exécution et les prouveurs
- **Incitations économiques** : Conception de marchés de prouveurs et de structures de frais durables

### État de l'implémentation {#implementations}

Plusieurs implémentations de zkVM sont en cours de développement et de test pour la génération de preuves de blocs Ethereum :

| Implémentation | Architecture |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Celles-ci utilisent des machines virtuelles basées sur RISC-V pour exécuter le bytecode EVM, puis génèrent des preuves ZK d'une exécution correcte. Les résultats des tests et les progrès à jour sont suivis sur le [suivi zkVM de la Fondation Ethereum](https://zkevm.ethereum.foundation/zkvm-tracker).

## Comment le zkEVM s'intègre aux autres mises à niveau {#related-upgrades}

La vérification zkEVM de la couche 1 (l1) est liée à plusieurs autres éléments de la feuille de route d'Ethereum :

- **[Arbres Verkle](/roadmap/verkle-trees/)** : Permettent des témoins plus petits pour une vérification sans état, réduisant ainsi les données avec lesquelles les prouveurs doivent travailler
- **[Absence d'état](/roadmap/statelessness/)** : Le zkEVM est un catalyseur clé ; avec les preuves d'exécution ZK, les nœuds n'ont pas besoin de l'état complet pour vérifier les blocs
- **[Séparation proposant-constructeur (PBS)](/roadmap/pbs/)** : Les constructeurs de blocs pourraient potentiellement intégrer la génération de preuves, ou un marché de prouveurs distinct pourrait émerger
- **[Finalité à slot unique](/roadmap/single-slot-finality/)** : Une génération de preuves plus rapide pourrait permettre une finalité à slot unique avec des garanties cryptographiques

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
La vérification zkEVM de la couche 1 (l1) fait l'objet de recherches actives et n'est pas encore intégrée dans les clients Ethereum en production.
</AlertDescription>
</AlertContent>
</Alert>

## Complément d'information {#further-reading}

- [Fondation zkEVM](https://zkevm.ethereum.foundation) - Centre de recherche officiel sur le zkEVM de la Fondation Ethereum
- [Ethproofs](https://ethproofs.org/) - Suivez la course pour prouver Ethereum en temps réel
- [zkevm.fyi](https://zkevm.fyi) - Livre technique sur le zkEVM pour la couche 1 (l1)
- [Spécifications zkEVM du PSE](https://github.com/privacy-scaling-explorations/zkevm-specs) - Spécifications techniques
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Aperçu de Vitalik sur les améliorations de la vérification
- [Blog zkEVM de l'EF](https://zkevm.ethereum.foundation/blog) - Analyse des performances par l'équipe de la Fondation Ethereum (EF)