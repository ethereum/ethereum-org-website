---
title: Explorateurs de bloc
description: Introduction aux explorateurs de blocs, votre portail vers le monde des données de la blockchain, où vous pouvez rechercher des informations sur les transactions, les comptes, les contrats et bien plus.
lang: fr
sidebarDepth: 3
---

Les explorateurs de blocs sont votre portail vers les données Ethereum. Vous pouvez les utiliser pour voir les données en temps réel sur les blocs, les transactions, les mineurs, les comptes et toute autre activité de la chaîne.

## Prérequis {#prerequisites}

Pour que les données fournies par un explorateur de blocs aient du sens, vous devez avoir compris les concepts de base d'Ethereum. Commencez par lire la page [Introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Services {#services}

- [Etherscan](https://etherscan.io/) - _Également disponible en chinois, en coréen, en japonais et en russe_
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) - _Également disponible en chinois, en espagnol, en français, en turc, en russe, en coréen et en vietnamien_
- [Blockchair](https://blockchair.com/ethereum) - _Également disponible en chinois, en espagnol, en farsi, en français, en italien, en néerlandais, en portugais et en russe_-
- [Blockscout](https://blockscout.com/)
- [OKLink](https://www.oklink.com/eth)

## Données {#data}

De part sa conception, Ethereum est transparent, tout est donc vérifiable. Les explorateurs de blocs fournissent l'interface pour obtenir les informations, à la fois pour le réseau principal Ethereum (mainnet) et pour les réseaux de test (testnets), si besoin est.

Voici un résumé des types de données que vous pouvez obtenir d'un explorateur de blocs.

### Blocs {#blocks}

De nouveaux blocs sont ajoutés à Ethereum environ toutes les 12 secondes (cela peut fluctuer). Un flux de données presque constant est donc ajouté aux explorateurs de blocs. Les blocs contiennent de nombreuses données importantes qui peuvent vous être utiles :

**Données standards**

- Hauteur du bloc : le numéro de bloc et la longueur de la blockchain (en blocs) lors de la création du bloc actuel.
- Horodatage : date et heure auxquelles un mineur a miné le bloc.
- Transactions : le nombre de transactions incluses dans le bloc.
- Mineur : l'adresse du mineur qui a miné le bloc.
- Récompense : le montant d'ETH attribué au mineur pour avoir ajouté le bloc (récompense standard de 2 ETH + frais de transaction des transactions incluses dans le bloc).
- Difficulté : la difficulté associée au minage du bloc.
- Taille : la taille des données du bloc (mesurée en octets).
- Gaz utilisé : nombre d'unités de gaz utilisées par les transactions du bloc.
- Limite de gaz : le total des limites de gaz fixées par les transactions du bloc.
- Données supplémentaires : toutes les données supplémentaires que le mineur a incluses dans le bloc.

**Données avancées**

- Hash : le hachage cryptographique qui représente l'en-tête du bloc (l'identifiant unique du bloc).
- Hash parent : le hachage de bloc obtenu avant le bloc actuel.
- Sha3Oncles : le hachage combiné de tous les oncles pour un parent donné.
- StateRoot : la racine de l'arbre de Merkle qui contient l'état complet du système.
- Nonce : une valeur utilisée pour démontrer la preuve de travail du mineur pour un bloc.

**Blocs oncles**

Des blocs oncles sont créés lorsque deux mineurs créent des blocs presque en même temps (un seul bloc pouvant être validé par les nœuds). Ils ne sont pas inclus mais génèrent quand même une récompense pour le travail.

Les explorateurs de blocs fournissent les informations suivantes sur les blocs oncles :

- Numéro du bloc oncle
- Date et heure de leur création
- Hauteur de bloc à laquelle ils ont été créés
- Nom du mineur
- Récompense en ETH

### Gaz {#gas}

Non seulement les explorateurs de blocs fournissent des données relatives aux blocs et à l'utilisation du gaz dans les transactions, mais certains vous donneront aussi des informations sur les prix actuels du gaz sur le réseau. Cela vous aidera à comprendre l'utilisation du réseau, à soumettre des transactions sûres et à ne pas trop dépenser en gaz. Recherchez les API qui peuvent vous aider à obtenir ces informations dans l'interface de votre produit. Les données concernant le gaz comprennent :

- une estimation du gaz nécessaire pour une transaction sécurisée, mais lente (+ une estimation du prix et de la durée de la transaction) ;
- une estimation du gaz nécessaire pour une transaction moyenne (+ une estimation du prix et de la durée de la transaction) ;
- une estimation du gaz nécessaire pour une transaction rapide (+ une estimation du prix et de la durée de la transaction) ;
- un délai moyen de confirmation basé sur le prix du gaz ;
- les contrats qui consomment du gaz (en d'autres termes, les produits populaires qui ont une forte utilisation sur le réseau) ;
- les comptes qui consomment du gaz (en d'autres termes, les utilisateurs fréquents du réseau).

### Transactions {#transactions}

De plus en plus d'utilisateurs tirent parti des explorateurs de blocs pour suivre les progrès de leurs transactions. En effet, le niveau de détail qui peut être obtenu offre davantage de certitudes. Les données relatives aux transactions sont les suivantes :

**Données standards**

- Hash de la transaction - Hash généré lorsque la transaction est soumise.
- Statut - Indique si la transaction est en cours, a échoué ou a réussi.
- Bloc - Bloc dans lequel la transaction a été incluse.
- Horodatage - Moment auquel un mineur a miné la transaction.
- De - Adresse du compte qui a soumis la transaction.
- À - Adresse du destinataire ou du contrat intelligent avec lequel la transaction interagit.
- Jetons transférés - Liste des jetons transférés dans le cadre de la transaction.
- Valeur - Valeur totale en ETH de ce qui a été transféré.
- Frais de transaction - Montant payé aux mineurs pour traiter la transaction (prix du gaz x gaz utilisé).

**Données avancées**

- Limite de gaz - Nombre maximum d'unités de gaz que la transaction peut consommer.
- Gaz consommé - Montant de gaz réellement consommé par la transaction.
- Prix du gaz - Prix fixé par unité de gaz.
- Nonce - Numéro de transaction de l'adresse `expéditeur` (rappelez-vous que cela commence à 0, donc une once de `100` équivaut en fait à la 101ième transaction soumise par ce compte).
- Données de saisie - Toute information supplémentaire requise par la transaction.

### Comptes {#accounts}

Il est possible d'accéder à de nombreuses données concernant un compte. C'est pourquoi il est souvent conseillé d'utiliser plusieurs comptes afin qu'il soit difficile de traquer vos capitaux et leur valeur. Plusieurs solutions sont aussi développées dans le but de rendre les transactions et l'activité d'un compte plus privée. Les données disponibles sur les comptes sont les suivantes :

**Comptes utilisateur**

- Adresse du compte - Adresse publique que vous pouvez utiliser pour envoyer des fonds.
- Solde ETH - Montant des ETH associés à ce compte.
- Valeur totale des ETH - Valeur des ETH.
- Jetons - Jetons associés au compte et leur valeur.
- Historique des transactions - Liste de toutes les transactions pour lesquelles le compte était soit l'expéditeur soit le destinataire.

**Contrats intelligents**

Les comptes de contrats intelligents possèdent toutes les données d'un compte utilisateur, mais certains explorateurs de bloc afficheront aussi certaines informations liées au code. Par exemple :

- Créateur du contrat - Adresse qui a déployé le contrat sur le réseau principal.
- Transaction de création - Transaction qui inclut le déployement sur le réseau principal.
- Code source - Code Solidity ou Vyper du contrat intelligent.
- ABI du contrat - L'interface binaire d'application du contrat (les appels effectués par le contrat et les données reçues).
- Code de création du contrat - Bytecode compilé du contrat intelligent, créé lorsque vous compilez un contrat intelligent écrit en Solidity, Vyper, etc.
- Événements du contrat - Historique des méthodes appelées dans le contrat intelligent. Il s'agit essentiellement d'un moyen de voir comment le contrat est utilisé et à quelle fréquence.

### Jetons {#tokens}

Les jetons sont un type de contrat et comporteront donc des données similaires à celles d'un contrat intelligent. Mais comme ils ont une valeur et peuvent être échangés, ils comportent des données supplémentaires :

- Type - Jeton ERC-20, ERC-721 ou une autre norme de jeton.
- Prix - S'il s'agit de jetons ERC-20, ils auront une valeur sur le marché actuel.
- Valorisation au prix du marché - S'il s'agit de jetons ERC-20, ils feront l'objet d'une valorisation au prix du marché (prix d'un jeton x nombre total de jetons en circulation).
- Offre totale - Le nombre total de jetons en circulation.
- Détenteurs - Nombre d'adresses détenant le jeton.
- Transferts : Nombre de transferts d'un jeton entre des comptes.
- Historique des transactions - Historique de toutes les transactions effectuées incluant le jeton.
- Adresse du contrat - Adresse du jeton qui a été déployé sur le réseau principal.
- Décimales - Les jetons ERC-20 sont divisibles et ont des décimales.

### Réseau {#network}

Bien sûr, certaines données parlent de la santé du réseau. Elle sont très spécifiques au mécanisme Ethereum de consensus par preuve de travail . Quand Ethereum effectuera la transition la Preuve d'enjeu certaines de ces données seront redondantes.

- Difficulté - Difficulté actuelle du minage.
- Taux de hachage - Estimation du nombre de hachages générés par les mineurs Ethereum qui essayent de résoudre le bloc Ethereum actuel ou n'importe quel bloc donné.
- Total des transactions - Nombre de transactions depuis qu'Ethereum existe.
- Transactions par seconde - Nombre de transactions pouvant être traitées en une seconde.
- Prix de l'ETH - Valeur actuelle d'un ETH.
- Offre totale d'ETH - Nombre d'ETH en circulation. Rappelez-vous que des ETH sont créés avec chaque nouveau bloc sous la forme de récompenses.
- Valorisation au prix du marché - Prix d'un ETH x l'offre totale.

## Données de couche de consensus {#consensus-layer-data}

Les mises à niveau d'évolutivité sont toujours en cours de développement, mais il est intéressant de parler des points de données que les explorateurs seront capables de vous fournir. En fait, toutes ces données sont déjà disponibles pour les réseaux de test.

Si vous n'êtes pas familiarisé avec la feuille de route, consultez [notre vue d'ensemble des mises à jour Ethereum](/upgrades/).

### Période {#epoch}

La chaîne phare va créer aléatoirement des comités de validateurs à la fin de chaque période (toutes les 6,4 minutes) pour des raisons de sécurité. Les données de la période incluent les éléments suivants :

- Numéro de la période.
- Statut de finalisation - Si la période a été finalisée (Oui/Non).
- Temps - Moment auquel la période s'est terminée.
- Attestations - Nombre d'attestations pendant la période (les votes pour les blocs au sein des créneaux).
- Dépôts - Nombre d'ETH déposés dans la période (les utilisateurs doivent miser des ETH pour devenir validateurs).
- Délestages - Nombre de pénalités infligées à ceux qui proposent ou valident les blocs.
- Participation aux votes - Montant des ETH misés pour valider les blocs.
- Validateurs - Nombre de validateurs actifs pour la période.
- Solde moyen des validateurs - Solde moyen des validateurs actifs.
- Créneaux - Nombre de créneaux inclus dans la période (les créneaux incluent un bloc valide).

### Créneau {#slot}

Les créneaux sont des opportunités de création de blocs. Les données disponibles pour chaque créneau comprennent les éléments suivants :

- Période - Période pendant laquelle le créneau est valide.
- Numéro de créneau.
- Statut - Statut de le créneau (Proposé/Manqué).
- Temps - Horodatage de le créneau.
- Proposant - Validateur qui a proposé le bloc pour le créneau.
- Block root - Le hash-tree-root de BeaconBlock.
- Racine parente - Le hachage du bloc précédent.
- Racine d'état - Le hash-tree-root de BeaconState.
- Signature.
- Randao reveal.
- Graffiti - Quiconque soumet un bloc peut intégrer un message de 32 octets à sa proposition de bloc.
- Données d'exécution.
  - Hash du bloc.
  - Nombre de dépôts.
  - Dépôt racine.
- Attestations - Nombre d'attestations pour le bloc dans cet créneau.
- Dépôts - Nombre de dépôts dans cet créneau.
- Sorties volontaires - Nombre de validateurs qui sont partis pendant ce créneau.
- Délestages - Nombre de pénalités infligées à ceux qui proposent ou valident les blocs.
- Votes - Les validateurs qui ont voté pour le bloc pendant ce créneau.

### Blocs {#blocks-1}

Les blocs de couches de consensus fonctionnent différemment car les mineurs sont remplacés par les validateurs, et la chaîne phare introduit les créneaux et les périodes dans Ethereum. Cela engendre donc de nouvelles données !

- Proposant - Validateur que l'algorithme a choisi pour proposer le nouveau bloc.
- Période - Période pendant laquelle le bloc a été proposé.
- Créneau - Le créneau dans lequel le bloc a été proposé.
- Attestations - Nombre d'attestation incluses dans le créneau. Les attestations sont comme des votes qui indiquent que le bloc est prêt à être intégré à la chaîne phare.

### Validateurs {#validators}

Les validateurs doivent proposer des blocs et attester de leur conformité dans les créneaux.

- Numéro de validateur - Numéro unique qui représente le validateur.
- Solde actuel - Solde du validateur qui inclut les récompenses.
- Solde effectif - Solde du validateur utilisé pour miser.
- Revenus - Récompenses ou pénalités reçues par le validateur.
- Statut - Détermine si le validateur est en ligne et actif ou non.
- Attestation d'efficacité - Délai moyen nécessaire pour que les attestations du validateurs soient incluses dans la chaîne.
- Admissibilité à l'activation - Date (et période) à laquelle le validateur est devenu disponible pour valider.
- Actif depuis - Date (et période) à laquelle le validateur est devenu actif.
- Blocs proposés - Blocs proposés par le validateur.
- Attestations - Attestations fournies par le validateur.
- Dépôts - Adresse de l'expéditeur, hash de la transaction, numéro de bloc, horodatage, montant et statut de la mise effectuée par le validateur.

### Attestations {#attestations}

Les attestations sont des votes positifs pour inclure les blocs dans la chaîne. Leurs données portent sur leur enregistrement et les validateurs qui les ont émises.

- Créneau - Créneau dans lequel l'attestation a eu lieu.
- Index du comité - Index du comité à un créneau donné.
- Bits d’agrégation – Représente l’attestation regroupant tous les validateurs ayant participé à l’attestation.
- Validateurs - Validateurs qui ont fournis les attestations.
- Racine du bloc phare - Pointe vers le bloc sur lequel les validateurs apposent leur attestation.
- Source - Pointe vers la dernière période validée.
- Cible - Indique la limite de période la plus récente.
- Signature.

### Réseau {#network-1}

Les données de couches de consensus de haut niveau comprennent les éléments suivants :

- Période actuelle.
- Créneau actuel.
- Validateurs actifs - Nombre de validateurs actifs.
- Validateurs en attente - Nombre de validateurs attendant d'être activés.
- ETH misés - Montant des ETH misés sur le réseau.
- Solde moyen - Solde moyen d'ETH des validateurs.

## Explorateurs de bloc {#block-explorers}

- [Etherscan](https://etherscan.io/) - Explorateur de blocs que vous pouvez utiliser pour récupérer des données sur le réseau principal Ethereum ainsi que sur les réseaux de test Ropsten, Kovan, Rinkeby et Goerli.
- [Blockscout](https://blockscout.com/) - Axé sur les réseaux suivants :
  - xDai - Combinaison intelligente du stablecoin DAI de MakerDao avec la chaîne latérale et la technologie tokenbridge de POA.
  - POA - Chaîne latérale et réseau autonome sécurisés par un groupe de validateurs de confiance. Tous les validateurs du réseau sont des notaires américains, et leurs informations sont publiquement disponibles.
  - Réseau de test POA Sokol.
  - ARTIS - Blockchain compatible avec Ethereum.
  - [LUKSO L14](https://blockscout.com/lukso/l14) - L14 fonctionne comme premier réseau de test pour permettre à la communauté LUKSO de construire et de tester une infrastructure commune.
  - qDai.
- [Etherchain](https://www.etherchain.org/) - Explorateur de blocs pour le réseau principal Ethereum.
- [Ethplorer](https://ethplorer.io/) - Explorateur de blocs qui se focalise sur les jetons du réseau principal Ethereum ainsi que sur le réseau de test Kovan.
- [Blockchair](https://blockchair.com/ethereum) - L'explorateur Ethereum le plus privé. Aussi pour le tri et le filtrage des données (mempool).

## Les explorateurs de blocs de la chaîne phare (couche de consensus) {#beacon-chain-block-explorers}

- [https://beaconcha.in/](https://beaconcha.in/)
- [https://beaconscan.com/](https://beaconscan.com/)
- [https://ethscan.org/](https://ethscan.org/) (fourche de beaconcha.in)

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Minage](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transactions](/developers/docs/transactions/)
- [Comptes](/developers/docs/accounts/)
- [Réseaux](/developers/docs/networks/)
