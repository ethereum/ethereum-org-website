---
title: Prague-Electra (Pectra)
description: En savoir plus sur la mise à niveau du protocole Pectra
lang: fr
---

# Pectra {#pectra}

La mise à niveau du réseau Pectra a suivi [Dencun](/roadmap/dencun/) et a apporté des changements à la fois à la couche d’exécution et à la couche de consensus d’Ethereum. Le nom abrégé Pectra est une combinaison de Prague et Electra, qui sont les noms respectifs des changements de spécifications des couches d’exécution et de consensus. Ensemble, ces changements apportent un certain nombre d’améliorations aux utilisateurs, développeurs et validateurs d’Ethereum.

Cette mise à niveau a été activée avec succès sur le réseau principal d’Ethereum à l’époque `364032`, le **07 mai 2025 à 10:05 (UTC)**.

<InfoBanner>
La mise à niveau Pectra n’est qu’une étape dans les objectifs de développement à long terme d’Ethereum. Apprenez-en plus sur [la feuille de route du protocole](/roadmap/) et les [mises à niveau précédentes](/history/).
</InfoBanner>

## Améliorations dans Pectra {#new-improvements}

Pectra apporte le plus grand nombre de [EIP](https://eips.ethereum.org/) jamais inclus dans une mise à niveau précédente ! Il y a de nombreux changements mineurs mais aussi quelques nouvelles fonctionnalités importantes. La liste complète des changements et les détails techniques se trouvent dans les EIP individuels inclus.

### Code du compte EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) représente une étape majeure vers une [abstraction de compte](/roadmap/account-abstraction/) généralisée. Avec cette fonctionnalité, les utilisateurs peuvent définir leur adresse ([EOA](/glossary/#eoa)) pour qu'elle soit étendue avec un contrat intelligent. L’EIP introduit un nouveau type de transaction avec une fonction spécifique : permettre aux propriétaires d’adresse de signer une autorisation qui configure leur adresse pour imiter un contrat intelligent choisi.

Avec cet EIP, les utilisateurs peuvent opter pour des portefeuilles programmables qui permettent de nouvelles fonctionnalités telles que le regroupement de transactions, les transactions sans frais de gaz et l’accès personnalisé aux actifs pour des schémas de récupération alternatifs. Cette approche hybride combine la simplicité des Comptes détenus en externe (EOA) avec la programmabilité des comptes basés sur des contrats.

Lisez une analyse approfondie de 7702 [ici](/roadmap/pectra/7702/)

### Augmentation du solde effectif maximal {#7251}

Le solde effectif actuel du validateur est exactement de 32 ETH. C’est le montant minimum nécessaire pour participer au consensus, mais aussi le maximum qu’un seul validateur peut miser.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) augmente le solde effectif maximal possible à 2048 ETH, ce qui signifie qu’un seul validateur peut désormais miser entre 32 et 2048 ETH. Au lieu de multiples de 32, les stakers peuvent désormais choisir un montant arbitraire d’ETH à miser et recevoir des récompenses pour chaque ETH au-dessus du minimum. Par exemple, si le solde d’un validateur augmente avec ses récompenses jusqu’à 33 ETH, l’ETH supplémentaire est également considéré comme faisant partie du solde effectif et reçoit des récompenses.

Mais l’avantage d’un meilleur système de récompense pour les validateurs n’est qu’une partie de cette amélioration. Les [stakers](/staking/) exécutant plusieurs validateurs peuvent désormais les regrouper en un seul, ce qui permet une exploitation plus simple et réduit la surcharge du réseau. Comme chaque validateur dans la Beacon Chain soumet une signature à chaque époque, les besoins en bande passante augmentent avec le nombre de validateurs et le grand volume de signatures à propager. Regrouper les validateurs allègera la charge du réseau et ouvrira de nouvelles possibilités de mise à l’échelle tout en maintenant la même sécurité économique.

Lisez une analyse approfondie sur maxEB [ici](/roadmap/pectra/maxeb/)

### Augmentation du débit des blobs {#7691}

Les blobs assurent la [disponibilité des données](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) pour les L2. Ils ont été introduits lors de [la mise à niveau précédente du réseau](/roadmap/dencun/).

Actuellement, le réseau vise une moyenne de 3 blobs par bloc avec un maximum de 6 blobs. Avec [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), le nombre moyen de blobs sera porté à 6, avec un maximum de 9 par bloc, ce qui augmentera la capacité pour les rollups Ethereum. Cet EIP aide à combler l’écart jusqu’à ce que [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) permette un nombre de blobs encore plus élevé.

### Augmentation du coût des calldata {#7623}

Avant l’introduction des [blobs dans la mise à niveau Dencun](/roadmap/danksharding), les L2 utilisaient les [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) pour stocker leurs données sur Ethereum. Les blobs et les calldata influencent tous deux l’utilisation de la bande passante d’Ethereum. Bien que la plupart des blocs n’utilisent qu’une quantité minimale de calldata, les blocs riches en données contenant également de nombreux blobs peuvent nuire au réseau p2p d’Ethereum.

Pour remédier à cela, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) augmente le coût des calldata, mais uniquement pour les transactions avec un grand nombre de données. Cela limite la taille maximale des blocs dans le pire des cas, incite les L2 à utiliser uniquement des blobs et laisse plus de 99 % des transactions inchangées.

### Sorties déclenchables depuis la couche d'exécution {#7002}

Actuellement, quitter un validateur et [retirer de l’ETH mis en jeu](/staking/withdrawals/) est une opération de la couche de consensus qui nécessite une clé de validateur active, c’est-à-dire la même clé BLS utilisée par le validateur pour effectuer des tâches actives comme les attestations. Les identifiants de retrait constituent une clé froide distincte qui reçoit les fonds retirés, mais ne peut pas déclencher la sortie. La seule manière pour les validateurs de sortir est d’envoyer un message spécial au réseau de la Beacon Chain, signé avec la clé active du validateur. Cela est limitant dans les scénarios où les identifiants de retrait et la clé du validateur sont détenus par des entités différentes ou lorsque la clé du validateur est perdue.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) introduit un nouveau contrat qui peut être utilisé pour déclencher la sortie en utilisant les identifiants de retrait de la couche d'exécution. Les stakers pourront quitter leur validateur en appelant une fonction dans ce contrat spécial, sans avoir besoin de leur clé de signature du validateur ni d’un accès à la Beacon Chain. Il est important de noter que permettre les retraits des validateurs en chaîne ouvre la voie à des protocoles de mise en jeu avec des hypothèses de confiance réduites envers les opérateurs de nœuds.

### Dépôts des validateurs en chaîne {#6110}

Les dépôts du validateur sont actuellement traités par [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) qui est une fonction de la chaîne Beacon qui récupère les données de la couche d'exécution. C’est en quelque sorte une dette technique datant d’avant la Fusion, lorsque la chaîne Beacon était un réseau séparé et devait se préoccuper des réorganisations liées à la preuve de travail.

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) est une nouvelle méthode de transmission des dépôts de la couche d’exécution à la couche de consensus, permettant un traitement instantané avec une complexité de mise en œuvre réduite. C’est une méthode plus sécurisée de gestion des dépôts, propre à Ethereum après la fusion. Elle contribue également à pérenniser le protocole, car elle ne nécessite pas de dépôts historiques pour amorcer un nœud, ce qui est essentiel pour l’expiration de l’historique.

### Précompilé pour BLS12-381 {#2537}

Les précompilés sont un ensemble spécial de contrats intelligents intégrés directement dans la machine virtuelle Ethereum ([EVM](/developers/docs/evm/)). Contrairement aux contrats classiques, les précompilés ne sont pas déployés par les utilisateurs mais font partie intégrante de l’implémentation du client, écrits dans son langage natif (par exemple Go, Java, etc., et non en Solidity). Les précompilés servent à exécuter des fonctions largement utilisées et standardisées, comme les opérations cryptographiques. Les développeurs de contrats intelligents peuvent appeler les précompilés comme un contrat classique, mais avec plus de sécurité et d’efficacité.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) ajoute de nouveaux précompilés pour les opérations sur courbes utilisant [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Cette courbe elliptique est devenue largement utilisée dans les écosystèmes de cryptomonnaies grâce à ses propriétés pratiques. Plus précisément, elle a été adoptée par la couche de consensus d’Ethereum, où elle est utilisée par les validateurs.

Le nouveau précompilé permet à chaque développeur d’effectuer facilement, efficacement et en toute sécurité des opérations cryptographiques avec cette courbe, par exemple pour vérifier des signatures. Les applications sur la blockchain qui dépendent de cette courbe peuvent devenir plus économes en gaz et plus sécurisées en s’appuyant sur un précompilé plutôt que sur un contrat personnalisé. Cela s’applique principalement aux applications qui souhaitent raisonner sur les validateurs au sein de l’EVM, par exemple les groupes de mise en jeu, la remise en jeu, les clients légers, les ponts, mais aussi la preuve à divulgation nulle de connaissance.

### Fournir les hachages de blocs historiques depuis l'état {#2935}

L’EVM fournit actuellement l’opcode `BLOCKHASH`, qui permet aux développeurs de contrats de récupérer le hachage d’un bloc directement dans la couche d’exécution. Cependant, cela se limite uniquement aux 256 derniers blocs et pourrait poser problème aux clients sans état à l’avenir.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) crée un nouveau contrat système qui peut fournir les hachages des 8192 derniers blocs sous forme d’emplacements de stockage. Cela contribue à pérenniser le protocole pour l’exécution sans état et devient plus efficace avec l’adoption des arbres de Verkle. Cependant, en dehors de cela, les rollups peuvent en bénéficier immédiatement, car ils peuvent interroger directement le contrat avec une fenêtre historique plus large.

### Déplacement de l’index du comité en dehors d’Attestation {#7549}

Le consensus de la chaîne Beacon repose sur le fait que les validateurs votent pour le dernier bloc et l’époque finalisée. L’attestation comprend 3 éléments, dont 2 sont des votes, et le troisième est la valeur de l’index du comité.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) déplace cet index en dehors du message d’attestation signé, ce qui facilite la vérification et l’agrégation des votes de consensus. Cela permettra une plus grande efficacité dans chaque client de consensus et pourra apporter des améliorations significatives de performance aux circuits de preuve à divulgation nulle de connaissance pour prouver le consensus d’Ethereum.

### Ajout du calendrier des blobs aux fichiers de configuration de la couche d'exécution {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) est une modification simple qui ajoute un nouveau champ à la configuration des clients de la couche d’exécution. Il configure le nombre de blocs, permettant un réglage dynamique du nombre cible et maximal de blobs par bloc ainsi que l’ajustement des frais de blobs. Avec une configuration définie directement, les clients peuvent éviter la complexité liée à l’échange de ces informations via l’API Engine.

<InfoBanner>
Pour en savoir plus sur la façon dont Pectra vous affecte spécifiquement en tant qu’utilisateur, développeur ou validateur Ethereum, consultez le <a href="https://epf.wiki/#/wiki/pectra-faq">FAQ Pectra</a>.
</InfoBanner>

## Cette mise à niveau affecte-t-elle tous les nœuds et validateurs Ethereum ? {#client-impact}

Oui, la mise à niveau Pectra nécessite des mises à jour à la fois des [clients d'exécution et des clients de consensus](/developers/docs/nodes-and-clients/). Tous les principaux clients Ethereum publieront des versions prenant en charge la hard fork, marquées comme hautement prioritaires. Pour maintenir la synchronisation avec le réseau Ethereum après la mise à jour, les opérateurs de nœuds doivent s'assurer qu'ils utilisent une version de client prise en charge. Notez que les informations concernant les versions des clients sont tributaires du temps, et les utilisateurs doivent se référer aux dernières mises à jour pour obtenir les derniers détails.

## Comment ETH peut-il être converti après la fourche majeure ? {#scam-alert}

- **Aucune action requise pour vos ETH** : Suite à la mise à niveau Pectra d'Ethereum, il n'est pas nécessaire de convertir ou de mettre à niveau vos ETH. Vos soldes de compte resteront inchangés, et les ETH que vous détenez actuellement resteront accessibles sous leur forme actuelle après la fourche majeure.
- **Attention aux arnaques !** <Emoji text="⚠️" />**quiconque vous demandant de "mettre àniveau" vos ETH essaie de vous arnaquer.** Vous n'avez rien à faire en relation avec cette mise à niveau. Vos actifs resteront totalement inchangés. N'oubliez pas, rester informé est la meilleure défense contre les arnaques.

[En savoir plus sur comment reconnaitre et éviter les arnaques](/security/)

## Davantage qu'un apprenant visuel ? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Qu’est-ce qui entre dans la mise à niveau Pectra ? - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Mise à jour Pectra d'Ethereum : ce que les stakers doivent savoir — Blockdaemon_

## En savoir plus {#further-reading}

- [Feuille de route d'Ethereum](/roadmap/)
- [FAQ de Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Page d'information Pectra.wtf](https://pectra.wtf)
- [Comment Pectra améliore l'expérience des stakers](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Page d'information EIP7702](https://eip7702.io/)
- [devnets Pectra](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
