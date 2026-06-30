---
title: Pectra
metaTitle: Prague-Electra (Pectra)
description: Découvrez la mise à jour du protocole Pectra
lang: fr
authors: ["Nixo", "Mario Havel"]
---

La mise à jour du réseau Pectra a suivi [Dencun](/roadmap/dencun/) et a apporté des modifications à la fois à la couche d'exécution et à la couche de consensus d'Ethereum. Le nom raccourci Pectra est une combinaison de Prague et d'Electra, qui sont les noms respectifs des modifications des spécifications de la couche d'exécution et de la couche de consensus. Ensemble, ces changements apportent un certain nombre d'améliorations aux utilisateurs, développeurs et validateurs d'[Ethereum](/).

Cette mise à jour a été activée avec succès sur le réseau principal Ethereum à l'époque `364032`, le **07 mai 2025 à 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
La mise à jour Pectra n'est qu'une étape parmi les objectifs de développement à long terme d'Ethereum. Apprenez-en plus sur [la feuille de route du protocole](/roadmap/) et [les mises à jour précédentes](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Améliorations dans Pectra {#new-improvements}

Pectra apporte le plus grand nombre d'[EIP](https://eips.ethereum.org/) de toutes les mises à jour précédentes ! Il y a de nombreux changements mineurs mais aussi de nouvelles fonctionnalités importantes. La liste complète des modifications et des détails techniques se trouve dans les EIP individuels inclus.

### Code de compte EOA {#7702}

L'[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) représente une étape majeure vers une [abstraction de compte](/roadmap/account-abstraction/) généralisée. Avec cette fonctionnalité, les utilisateurs peuvent configurer leur adresse ([EOA](/glossary/#eoa)) pour qu'elle soit étendue avec un contrat intelligent. L'EIP introduit un nouveau type de transaction avec une fonction spécifique : permettre aux propriétaires d'adresses de signer une autorisation qui configure leur adresse pour imiter un contrat intelligent choisi. 

Avec cet EIP, les utilisateurs peuvent opter pour des portefeuilles programmables qui permettent de nouvelles fonctionnalités telles que le regroupement de transactions, les transactions sans gaz et l'accès personnalisé aux actifs pour des schémas de récupération alternatifs. Cette approche hybride combine la simplicité des EOA avec la programmabilité des comptes basés sur des contrats. 

Lisez une analyse détaillée sur le 7702 [ici](/roadmap/pectra/7702/)

### Augmentation du solde effectif maximum {#7251}

Le solde effectif actuel du validateur est d'exactement 32 ETH. C'est le montant minimum nécessaire pour participer au consensus, mais en même temps le maximum qu'un seul validateur peut staker.

L'[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) augmente le solde effectif maximum possible à 2048 ETH, ce qui signifie qu'un seul validateur peut désormais staker entre 32 et 2048 ETH. Au lieu de multiples de 32, les stakers peuvent désormais choisir un montant arbitraire d'ETH à staker et recevoir des récompenses sur chaque 1 ETH au-dessus du minimum. Par exemple, si le solde d'un validateur augmente avec ses récompenses pour atteindre 33 ETH, le 1 ETH supplémentaire est également considéré comme faisant partie du solde effectif et reçoit des récompenses.

Mais l'avantage d'un meilleur système de récompense pour les validateurs n'est qu'une partie de cette amélioration. Les [stakers](/staking/) exécutant plusieurs validateurs peuvent désormais les agréger en un seul, ce qui facilite l'exploitation et réduit la surcharge du réseau. Étant donné que chaque validateur de la chaîne balise soumet une signature à chaque époque, les exigences en bande passante augmentent avec le nombre de validateurs et le grand nombre de signatures à propager. L'agrégation des validateurs allégera la charge du réseau et ouvrira de nouvelles options de mise à l'échelle tout en conservant la même sécurité économique.

Lisez une analyse détaillée sur le MaxEB [ici](/roadmap/pectra/maxeb/)

### Augmentation du débit des blobs {#7691}

Les blobs fournissent la [disponibilité des données](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) pour les L2. Ils ont été introduits lors de [la précédente mise à jour du réseau](/roadmap/dencun/). 

Actuellement, le réseau cible une moyenne de 3 blobs par bloc avec un maximum de 6 blobs. Avec l'[EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), le nombre moyen de blobs sera augmenté à 6, avec un maximum de 9 par bloc, ce qui entraînera une capacité accrue pour les rollups Ethereum. Cet EIP aide à faire le pont jusqu'à ce que [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) permette un nombre de blobs encore plus élevé.

### Augmentation du coût des données d'appel (calldata) {#7623}

Avant l'introduction des [blobs dans la mise à jour Dencun](/roadmap/danksharding), les L2 utilisaient les [données d'appel](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) pour stocker leurs données sur Ethereum. Les blobs et les données d'appel affectent tous deux l'utilisation de la bande passante d'Ethereum. Bien que la plupart des blocs n'utilisent qu'une quantité minimale de données d'appel, les blocs lourds en données qui contiennent également de nombreux blobs peuvent être nuisibles au réseau p2p d'Ethereum. 

Pour y remédier, l'[EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) augmente la tarification des données d'appel, mais uniquement pour les transactions lourdes en données. Cela limite la taille des blocs dans le pire des cas, incite les L2 à n'utiliser que des blobs et laisse plus de 99 % des transactions inchangées.

### Sorties déclenchables par la couche d'exécution {#7002}

Actuellement, la sortie d'un validateur et le [retrait des ETH stakés](/staking/withdrawals/) est une opération de la couche de consensus qui nécessite une clé de validateur active, la même clé BLS utilisée par le validateur pour effectuer des tâches actives comme les attestations. Les identifiants de retrait constituent une clé froide distincte qui reçoit la mise retirée mais ne peut pas déclencher la sortie. La seule façon pour les stakers de sortir est d'envoyer un message spécial au réseau de la chaîne balise signé à l'aide de la clé de validateur active. Cela est limitant dans les scénarios où les identifiants de retrait et la clé du validateur sont détenus par des entités différentes ou lorsque la clé du validateur est perdue.

L'[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) introduit un nouveau contrat qui peut être utilisé pour déclencher la sortie à l'aide des identifiants de retrait de la couche d'exécution. Les stakers pourront sortir de leur validateur en appelant une fonction dans ce contrat spécial sans avoir besoin de leur clé de signature de validateur ni d'aucun accès à la chaîne balise. Fait important, l'activation des retraits de validateurs onchain permet des protocoles de staking avec des hypothèses de confiance réduites envers les opérateurs de nœuds.

### Dépôts de validateurs onchain {#6110}

Les dépôts de validateurs sont actuellement traités par [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), qui est une fonction sur la chaîne balise qui récupère les données de la couche d'exécution. C'est une sorte de dette technique datant d'avant La Fusion, lorsque la chaîne balise était un réseau distinct et devait se soucier des réorganisations de la preuve de travail (PoW). 

L'[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) est une nouvelle façon de transmettre les dépôts de la couche d'exécution à la couche de consensus, ce qui permet un traitement instantané avec une complexité d'implémentation moindre. C'est une façon plus sécurisée de gérer les dépôts, native à l'Ethereum fusionné. Cela aide également à pérenniser le protocole car il ne nécessite pas de dépôts historiques pour amorcer le nœud, ce qui est nécessaire pour l'expiration de l'historique.

### Précompilé pour BLS12-381 {#2537}

Les précompilés sont un ensemble spécial de contrats intelligents intégrés directement dans la machine virtuelle Ethereum ([EVM](/developers/docs/evm/)). Contrairement aux contrats réguliers, les précompilés ne sont pas déployés par les utilisateurs mais font partie de l'implémentation du client elle-même, écrits dans son langage natif (par exemple, Go, Java, etc., et non Solidity). Les précompilés servent à des fonctions largement utilisées et standardisées comme les opérations cryptographiques. Les développeurs de contrats intelligents peuvent appeler les précompilés comme un contrat régulier mais avec plus de sécurité et d'efficacité.

L'[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) ajoute de nouveaux précompilés pour les opérations de courbe sur [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Cette courbe elliptique est devenue largement utilisée dans les écosystèmes de cryptomonnaie grâce à ses propriétés pratiques. Plus spécifiquement, elle a été adoptée par la couche de consensus d'Ethereum, où elle est utilisée par les validateurs.

Le nouveau précompilé ajoute la capacité pour chaque développeur d'effectuer facilement, efficacement et en toute sécurité des opérations cryptographiques en utilisant cette courbe, par exemple, la vérification de signatures. Les applications onchain qui dépendent de cette courbe peuvent devenir plus efficaces en gaz et plus sécurisées en s'appuyant sur un précompilé au lieu d'un contrat personnalisé. Cela s'applique principalement aux applications qui souhaitent interagir avec les validateurs à l'intérieur de l'EVM, par exemple, les pools de staking, le [restaking](/restaking/), les clients légers, les ponts mais aussi les preuves à divulgation nulle de connaissance.

### Fournir les hashs de blocs historiques à partir de l'état {#2935}

L'EVM fournit actuellement le code d'opération `BLOCKHASH` qui permet aux développeurs de contrats de récupérer le hash d'un bloc directement dans la couche d'exécution. Cependant, cela est limité uniquement aux 256 derniers blocs et pourrait devenir problématique pour les clients sans état à l'avenir.

L'[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) crée un nouveau contrat système qui peut fournir les 8192 derniers hashs de blocs en tant qu'emplacements de stockage. Cela aide à pérenniser le protocole pour une exécution sans état et devient plus efficace lorsque les arbres de Verkle sont adoptés. Cependant, en dehors de cela, les rollups peuvent en bénéficier immédiatement, car ils peuvent interroger le contrat directement avec une fenêtre historique plus longue.

### Déplacer l'indice du comité en dehors de l'attestation {#7549}

Le consensus de la chaîne balise est basé sur les validateurs qui votent pour le dernier bloc et l'époque finalisée. L'attestation comprend 3 éléments, dont 2 sont des votes et le troisième est la valeur de l'indice du comité.

L'[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) déplace cet indice en dehors du message d'attestation signé, ce qui facilite la vérification et l'agrégation des votes de consensus. Cela permettra plus d'efficacité dans chaque client de consensus et peut apporter des améliorations de performances significatives aux circuits à divulgation nulle de connaissance pour prouver le consensus d'Ethereum.

### Ajouter la planification des blobs aux fichiers de configuration de la couche d'exécution {#7840}

L'[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) est un changement simple qui ajoute un nouveau champ à la configuration du client de la couche d'exécution. Il configure le nombre de blocs, permettant un réglage dynamique pour les nombres cibles et maximums de blobs par bloc ainsi que l'ajustement des frais de blob. Avec une configuration directement définie, les clients peuvent éviter la complexité de l'échange de ces informations via l'API Engine.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Pour en savoir plus sur la façon dont Pectra vous affecte spécifiquement en tant qu'utilisateur, développeur ou validateur d'Ethereum, consultez la <a href="https://epf.wiki/#/wiki/pectra-faq">FAQ Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Cette mise à jour affecte-t-elle tous les nœuds et validateurs d'Ethereum ? {#client-impact}

Oui, la mise à jour Pectra nécessite des mises à jour à la fois des [clients d'exécution et des clients de consensus](/developers/docs/nodes-and-clients/). Tous les principaux clients Ethereum publieront des versions prenant en charge le hard fork marquées comme hautement prioritaires. Pour maintenir la synchronisation avec le réseau Ethereum après la mise à jour, les opérateurs de nœuds doivent s'assurer qu'ils exécutent une version de client prise en charge. Notez que les informations sur les versions des clients sont sensibles au temps, et les utilisateurs doivent se référer aux dernières mises à jour pour obtenir les détails les plus récents.

## Comment les ETH peuvent-ils être convertis après le hard fork ? {#scam-alert}

- **Aucune action requise pour vos ETH** : Suite à la mise à jour Pectra d'Ethereum, il n'est pas nécessaire de convertir ou de mettre à niveau vos ETH. Les soldes de vos comptes resteront les mêmes, et les ETH que vous détenez actuellement resteront accessibles dans leur forme existante après le hard fork.
- **Méfiez-vous des arnaques !** <Emoji text="⚠️" /> **toute personne vous demandant de « mettre à niveau » vos ETH essaie de vous arnaquer.** Vous n'avez rien à faire en relation avec cette mise à jour. Vos actifs resteront totalement inchangés. N'oubliez pas que rester informé est la meilleure défense contre les arnaques.

[En savoir plus sur la reconnaissance et l'évitement des arnaques](/security/)

## Vous préférez un support visuel ? {#visual-learner}

<VideoWatch slug="pectra-upgrade-overview" />

_Que contient la mise à jour Pectra ? - Christine Kim_

<VideoWatch slug="pectra-what-stakers-need-to-know" />

_Mise à jour Ethereum Pectra : Ce que les stakers doivent savoir — Blockdaemon_

## Pour aller plus loin
- [Feuille de route d'Ethereum](/roadmap/)
- [FAQ Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Comment Pectra améliore l'expérience des stakers](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Page d'information sur l'EIP-7702](https://eip7702.io/)
- [Devnets de Pectra](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)
