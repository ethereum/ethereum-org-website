---
title: Explorateurs de blocs
description: Introduction aux explorateurs de blocs, votre portail vers le monde des données de la blockchain, où vous pouvez rechercher des informations sur les transactions, les comptes, les contrats et bien plus.
lang: fr
sidebarDepth: 3
---

Les explorateurs de blocs sont votre portail vers les données Ethereum. Vous pouvez les utiliser pour voir des données en temps réel sur les blocs, les transactions, les validateurs, les comptes et d'autres activités sur la chaîne.

## Prérequis {#prerequisites}

Pour que les données fournies par un explorateur de blocs aient du sens, vous devez avoir compris les concepts de base d'Ethereum. Commencez par lire la page [Introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Services {#services}

- [Etherscan](https://etherscan.io/) - _Également disponible en chinois, coréen, russe et japonais_
- [3xpl](https://3xpl.com/ethereum)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair](https://blockchair.com/ethereum) - _Également disponible en espagnol, français, italien, néerlandais, portugais, russe, chinois et Farsi_
- [Blockscout](https://eth.blockscout.com/)
- [Chainlens](https://www.chainlens.com/)
- [Explorateurs de bloc DexGuru](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Ethernow](https://www.ethernow.xyz/)
- [Ethplorer](https://ethplorer.io/) - _Aussi disponible en chinois, espagnol, français, turc, russe, coréen et vietnamien_
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)
- [Rantom](https://rantom.app/)
- [Ethseer](https://ethseer.io)

## Outils open source {#open-source-tools}

- [Otterscan](https://otterscan.io/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)

## Données {#data}

De part sa conception, Ethereum est transparent, tout est donc vérifiable. Les explorateurs de blocs fournissent l'interface pour obtenir les informations, à la fois pour le réseau principal Ethereum (mainnet) et pour les réseaux de test (testnets), si besoin est. Les données sont divisées en données d'exécution et de consensus. Les données d'exécution se réfèrent aux transactions qui ont été exécutées dans un bloc spécifique. Les données de consensus se réfèrent aux blocs eux-mêmes et aux validateurs qui les ont proposés.

Voici un résumé des types de données que vous pouvez obtenir d'un explorateur de blocs.

### Données d'exécution {#execution-data}

De nouveaux blocs sont ajoutés à Ethereum toutes les 12 secondes (à moins qu'un explorateur de bloc ne manque son tour), afin qu'un flux de données quasi constant soit ajouté aux explorateurs de blocs. Les blocs contiennent de nombreuses données importantes qui peuvent vous être utiles :

**Données standards**

- Block height (hauteur du bloc) - Le numéro de bloc et la longueur de la blockchain (en blocs) lors de la création du bloc actuel
- Timestamp (horodatage) - Le moment où un bloc a été proposé
- Transactions - Le nombre de transactions incluses dans le bloc
- Fee recipient (destinataire de frais) - L'adresse qui a reçu des conseils sur les frais de gaz lors des transactions
- Block Reward (récompense de bloc) - Le montant d'ETH attribué au validateur qui a proposé le bloc
- Size (taille) - La taille des données dans le bloc (mesurée en octets)
- Gas used (gaz utilisé) - L'unité de gaz totale utilisée par les transactions dans le bloc
- Gas limit (limite de gaz) - Les limites totales de gaz fixées par les transactions dans le bloc
- Base fee per gas (frais de base par gaz) - Le multiplicateur minimum requis pour qu'une transaction soit incluse dans un bloc
- Burnt fees (frais brûlés) - Combien d'ETH est brûlé dans le bloc
- Extra data - Toutes les données supplémentaires que le constructeur a incluses dans le bloc

**Données avancées**

- Hash (hash) - Le hachage cryptographique qui représente l'en-tête du bloc (l'identifiant unique du bloc)
- Parent hash (hash parent) - Le hachage du bloc qui est arrivé avant le bloc actuel
- StateRoot - Le hash racine de Merkle trie qui stocke l'état complet du système

### Gaz {#gas}

Non seulement les explorateurs de blocs fournissent des données relatives à l'utilisation du gaz dans les transactions et dans les blocs, mais certains vous donneront aussi des informations sur les prix actuels du gaz sur le réseau. Cela vous aidera à comprendre l'utilisation du réseau, à soumettre des transactions sûres et à ne pas trop dépenser en gaz. Recherchez les API qui peuvent vous aider à obtenir ces informations dans l'interface de votre produit. Les données concernant le gaz comprennent :

- Unités de gaz estimées nécessaires pour une transaction sûre mais lente (+ prix estimé et durée)
- Unités de gaz estimées nécessaires pour une transaction moyenne (+ prix estimé et durée)
- Unités de gaz estimées nécessaires pour une transaction rapide (+ prix estimé et durée)
- Temps de confirmation moyen basé sur le prix du gaz
- Contrats qui consomment du gaz - en d'autres termes, des produits populaires qui voient beaucoup d'utilisation sur le réseau
- Comptes qui dépensent du gaz - en d'autres termes, des utilisateurs fréquents du réseau

### Transactions {#transactions}

De plus en plus d'utilisateurs tirent parti des explorateurs de blocs pour suivre les progrès de leurs transactions. En effet, le niveau de détail qui peut être obtenu offre davantage de certitudes. Les données relatives aux transactions sont les suivantes :

**Données standards**

- Transaction hash (hachage de la transaction) - Un hachage généré lorsque la transaction est soumise
- Status (statut) - Une indication si la transaction est en attente, a échoué ou a réussi
- Block (bloc) - Le bloc dans lequel la transaction a été incluse
- Timestamp (Horodatage) - Le moment où une transaction a été incluse dans un bloc proposé par un validateur
- From (de) - L'adresse du compte qui a soumis la transaction
- To (à) - L'adresse du destinataire ou du contrat intelligent avec lequel la transaction interagit
- Tokens transferred (jetons transférés) - Une liste de jetons qui ont été transférés dans le cadre de la transaction
- Value (valeur) - La valeur ETH totale en cours de transfert
- Transaction fee (frais de transaction) - Le montant payé au validateur pour traiter la transaction (calculé par le prix du gaz\*gaz utilisé)

**Données avancées**

- Gas limit (limite de gaz) - Le nombre maximum d'unités de gaz que cette transaction peut consommer
- Gas used (gaz utilisé) - Le montant réel des unités de gaz consommées par la transaction
- Gas price (prix du gaz) - Le prix fixé par unité de gaz
- Nonce - Le numéro de transaction pour l'adresse `from` (gardez à l'esprit que cela commence à 0 donc un nonce de `100` serait en fait la 101e transaction soumise par ce compte
- Input data (données d'entrée) - Toutes les informations supplémentaires requises par la transaction

### Comptes {#accounts}

Il est possible d'accéder à de nombreuses données concernant un compte. C'est pourquoi il est souvent conseillé d'utiliser plusieurs comptes afin qu'il soit difficile de traquer vos capitaux et leur valeur. Plusieurs solutions sont aussi développées dans le but de rendre les transactions et l'activité d'un compte plus privée. Mais les données disponibles sur les comptes sont les suivantes :

**Comptes utilisateur**

- Account address (adresse du compte) - L'adresse publique que vous pouvez utiliser pour envoyer des fonds à
- ETH balance (solde ETH) - Le montant d'ETH associé à ce compte
- Valeur ETH totale (valeur ETH totale) - La valeur de l'ETH
- Tokens (jetons) - Les jetons associés au compte et à leur valeur
- Transaction history (historique des transactions) - Une liste de toutes les transactions où ce compte était soit l'expéditeur soit le destinataire

**Contrats intelligents**

Les comptes de contrats intelligents possèdent toutes les données d'un compte utilisateur, mais certains explorateurs de bloc afficheront aussi certaines informations liées au code. Par exemple :

- Contract creator (créateur de contrat) - L'adresse qui a déployé le contrat sur le réseau principal
- Creation transaction (transaction de création) - La transaction qui inclut le déploiement sur le réseau principal
- Source code (code source) - La solidité ou le code vyper du contrat intelligent
- Contract ABI (contrat IBA) - L'Interface Binaire d'Application du contrat - les appels effectués par le contrat et les données reçues
- Contract creation code (code de création de contrat) - Le bytecode compilé du contrat intelligent, créé lorsque vous compilez un contrat intelligent écrit en Solidity ou Vyper, etc.
- Contract events (événements du contrat) - Une histoire des méthodes appelées dans le contrat intelligent, essentiellement un moyen de voir comment le contrat est utilisé et combien de fois

### Jetons {#tokens}

Les jetons sont un type de contrat, donc ils auront des données similaires à un contrat intelligent. Mais comme ils ont une valeur et peuvent être échangés, ils comportent des données supplémentaires :

- Type - Qu'il s'agisse d'un ERC-20, d'un ERC-721 ou d'un autre standard de jeton
- Price (prix) - S'il s'agit d'un ERC-20, il aura une valeur de marché actuelle
- Market cap (capitalisation boursière) - S'il s'agit d'un ERC-20, il aura une limite de marché (calculée par le prix\*fourniture totale)
- Total supply (fourniture totale) - Le nombre de jetons en circulation
- Holders (titulaires) - Le nombre d'adresses qui contiennent le jeton
- Transfers (transferts) - Le nombre de fois où le jeton a été transféré entre les comptes
- Transaction history (historique des transactions) - Un historique de toutes les transactions y compris le jeton
- Contract address (adresse du contrat) - L'adresse du jeton qui a été déployé sur le réseau principal
- Decimals (décimales) - Les jetons ERC-20 sont divisibles et ont des décimales

### Réseau {#network}

Certaines données de bloc sont préoccupées par la santé d'Ethereum de manière plus globale.

- Total transactions (total des transactions) - Le nombre de transactions depuis la création d'Ethereum
- Transactions per second (transactions par seconde) - Le nombre de transactions pouvant être traitées en une seconde
- ETH price (prix de l'ETH) - Les évaluations actuelles de 1 ETH
- Total ETH supply (fourniture totale d'ETH) - Nombre d'ETH en circulation - souvenez-vous que de nouveaux ETH sont créés avec la création de chaque bloc sous la forme de récompenses de blocs
- Market cap (capitalisation boursière) - Calcul du prix\*approvisionnement

## Données de couche de consensus {#consensus-layer-data}

### Période {#epoch}

Pour des raisons de sécurité, des comités aléatoires de validateurs sont créés à la fin de chaque epoch (toutes les 6,4 minutes). Les données de l'epoch incluent les éléments suivants :

- Numéro d'epoch
- Finalized status (statut finalisé) - Si l'epoch a été finalisée (Oui/Non)
- Time (temps) - La date de la fin de l'epoch
- Attestations - Le nombre d'attestations dans l'epoch (votes pour les blocs à l'intérieur des créneaux)
- Deposits (dépôts) - Le nombre de dépôts ETH inclus à l'epoch (les validateurs doivent miser des ETH pour devenir valideurs)
- Slashings (taillades) - Nombre de pénalités accordées aux promoteurs de blocs ou d'attestations
- Voting participation (participation au vote) - Le montant d'ETH misé utilisé pour attester les blocs
- Validators (validateurs) - Nombre de validateurs actifs pour l'epoch
- Average Validator balance (solde Moyen du Validateur) - Solde moyen pour les validateurs actifs
- Slots (créneaux) - Nombre de créneaux inclus dans l'epoch (les créneaux incluent un bloc valide)

### Créneau {#slot}

Les créneaux sont des opportunités de création de blocs. Les données disponibles pour chaque créneau comprennent les éléments suivants :

- Epoch (époque) - L'époque dans laquelle le créneau est valide
- Numéro de créneau
- Status (statut) - Le statut du créneau (Proposé/Manqué)
- Time (temps) - L'horodatage du créneau
- Proposer (proposant) - Le validateur qui a proposé le bloc pour le créneau
- Block root (racine du bloc) - La racine du hash-tree du BeaconBlock
- Parent root (racine parente) - Le hachage du bloc qui vient avant
- State root (racine d'état) - La racine de hash-tree du BeaconState
- Signature
- Randao reveal
- Graffiti - Un bloc proposant peut inclure un message de 32 octets à sa proposition de bloc
- Données d'exécution
  - Hash du bloc
  - Nombre de dépôts
  - Dépôt racine
- Attestations - Nombre d'attestations pour le bloc dans ce créneau
- Deposits (dépôts) - Le nombre de dépôts pendant ce créneau
- Voluntary exits (sortie volontaire) - Le nombre de validateurs qui sont restés pendant le créneau
- Slashings (taillades) - Nombre de pénalités accordées aux promoteurs de blocs ou d'attestations
- Votes - Les validateurs qui ont voté pour le bloc de ce créneau

### Blocs {#blocks-1}

Le Proof-of-stake (la preuve de mise en jeu) divise le temps en créneaux et époques. Cela engendre donc de nouvelles données !

- Proposer (proposant) - Le validateur qui a été choisi par algorithme pour proposer le nouveau bloc
- Epoch (époque) - L'époque où le bloc a été proposé
- Slot (emplacement) - L'emplacement dans lequel le bloc a été proposé
- Attestations - Le nombre d'attestations incluses dans le créneau — les attestations sont comme des votes qui indiquent que le bloc est prêt à aller à la Beacon Chain (Chaîne phare)

### Validateurs {#validators}

Les validateurs doivent proposer des blocs et attester de leur conformité dans les créneaux.

- Validator number (numéro de validateur) - Nombre unique qui représente le validateur
- Current balance (solde actuel) - Le solde du validateur y compris les récompenses
- Effective balance (solde effectif) - Le solde du validateur qui est utilisé pour le staking
- Income (revenu) - Récompenses ou pénalités reçues par le validateur
- Status (statut) - Si le validateur est actuellement en ligne et actif ou non
- Attestation effectiveness (efficacité de l'attestation) - Le temps moyen nécessaire pour inclure les attestations du validateur dans la chaîne
- Eligibility for activation (admissibilité à l'activation) - Date (et epoch) quand le validateur est devenu disponible pour valider
- Active since (actif depuis) - Date (et epoch) quand le validateur est devenu actif
- Proposed blocks (blocs proposés) - Le bloc que le validateur a proposé
- Attestations - Les attestations que le validateur a fournies
- Deposits (dépôts) - L'adresse, le hachage de la transaction, le numéro de bloc, l'horodatage, le montant et le statut du dépôt de staking effectué par le validateur

### Attestations {#attestations}

Les attestations sont des votes positifs pour inclure les blocs dans la chaîne. Leurs données portent sur leur enregistrement et les validateurs qui les ont émises.

- Slot (créneau) - Le créneau dans lequel l'attestation a eu lieu
- Committee index (indice du comité) - L'indice du comité au créneau donné
- Aggregation bits (bits d'agrégation) - Représente l'attestation agrégée de tous les validateurs participants dans l'attestation
- Validators (validateurs) - Les validateurs qui ont fourni des attestations
- Beacon block root (racine du bloc de balises) - Points vers le bloc auquel les validateurs sont en train d'attester
- Source - Points de la dernière epoch justifiée
- Target (cible) - Points à la dernière frontière de l'epoch
- Signature

### Réseau {#network-1}

Les données de couches de consensus de haut niveau comprennent les éléments suivants :

- epoch actuelle
- Créneau actuel
- Active validators (validateurs actifs) - Nombre de validateurs actifs
- Pending validators (validateurs en attente) - Nombre de validateurs en attente d'être rendus actifs
- Staked ETH (ETH absorbé) - Quantité d'ETH misé dans le réseau
- Average balance (solde moyen) - Solde moyen ETH des validateurs

## Explorateurs de bloc {#block-explorers}

- [Etherscan](https://etherscan.io/) - un explorateur de blocs que vous pouvez utiliser pour récupérer des données pour le réseau principal Ethereum et le réseau de test Goerli
- [3xpl](https://3xpl.com/ethereum) - Un explorateur Ethereum open source sans publicité qui autorise le téléchargement de ses ensembles de données
- [Beaconcha.in](https://beaconcha.in/) - un explorateur de blocs open source pour le réseau principal Ethereum et le réseau de test Goerli
- [Blockchair](https://blockchair.com/ethereum) - L'explorateur Ethereum le plus privé. Egalement pour trier et filtrer des données (mempool).
- [Etherchain](https://www.etherchain.org/) - un explorateur de blocs pour le réseau principal Ethereum
- [Ethplorer](https://ethplorer.io/) - un explorateur de blocs avec une focalisation sur les jetons pour le réseau principal Ethereum et le réseau de test Kovan
- [Rantom](https://rantom.app/) - Un service crypto-friendly open-source, intégré à sa plateforme de finance décentralisée (DeFi) & Visualisation du volume de transactions des NFT pour une vision détaillée
- [Ethernow](https://www.ethernow.xyz/) - Un explorateur de transaction en temps réel qui vous permet de voir la couche pré-chaîne du réseau principal Ethereum

## En savoir plus {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Transactions](/developers/docs/transactions/)
- [Comptes](/developers/docs/accounts/)
- [Réseaux](/developers/docs/networks/)
