---
title: Explorateurs de blocs
description: Une introduction aux explorateurs de blocs, votre portail vers le monde des données de la chaîne de blocs, où vous pouvez interroger des informations sur les transactions, les comptes, les contrats, et plus encore.
lang: fr
sidebarDepth: 3
---

Les explorateurs de blocs sont votre portail vers les données d'Ethereum. Vous pouvez les utiliser pour voir des données en temps réel sur les blocs, les transactions, les validateurs, les comptes et d'autres activités onchain.

## Prérequis {#prerequisites}

Vous devriez comprendre les concepts de base d'Ethereum afin de pouvoir donner un sens aux données qu'un explorateur de blocs vous fournit. Commencez par [une introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Outils open source {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) - Un explorateur Ethereum sans publicité qui permet de télécharger ses ensembles de données (open-core : les modules de base sont open source)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Services {#services}

- [Blockchair](https://blockchair.com/ethereum) - Explorateur Ethereum privé. Également pour trier et filtrer les données (mempool). Disponible en espagnol, français, italien, néerlandais, portugais, russe, chinois et farsi
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) - Également disponible en chinois, coréen, russe et japonais
- [Ethplorer](https://ethplorer.io/) - Un explorateur de blocs axé sur les jetons. Également disponible en chinois, espagnol, français, turc, russe, coréen et vietnamien
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Données {#data}

Ethereum est transparent par conception, donc tout est vérifiable. Les explorateurs de blocs fournissent une interface pour obtenir ces informations. Et ce, tant pour le Réseau principal Ethereum que pour les réseaux de test, si vous avez besoin de ces données. Les données sont divisées en données d'exécution et données de consensus. Les données d'exécution se réfèrent aux transactions qui ont été exécutées dans un bloc spécifique. Les données de consensus se réfèrent aux blocs eux-mêmes et aux validateurs qui les ont proposés.

Voici un résumé des types de données que vous pouvez obtenir d'un explorateur de blocs.

### Données d'exécution {#execution-data}

De nouveaux blocs sont ajoutés à Ethereum toutes les 12 secondes (à moins qu'un proposeur de bloc ne manque son tour), de sorte qu'un flux quasi constant de données est ajouté aux explorateurs de blocs. Les blocs contiennent de nombreuses données importantes que vous pourriez trouver utiles :

**Données standards**

- Hauteur de bloc - Le numéro du bloc et la longueur de la chaîne de blocs (en blocs) lors de la création du bloc actuel
- Horodatage - L'heure à laquelle un bloc a été proposé
- Transactions - Le nombre de transactions incluses dans le bloc
- Bénéficiaire des frais - L'adresse qui a reçu les pourboires des frais de gaz des transactions
- Récompense de bloc - Le montant d'ETH attribué au validateur qui a proposé le bloc
- Taille - La taille des données dans le bloc (mesurée en octets)
- Gaz utilisé - Le nombre total d'unités de gaz utilisées par les transactions dans le bloc
- Limite de gaz - Le total des limites de gaz définies par les transactions dans le bloc
- Frais de base par gaz - Le multiplicateur minimum requis pour qu'une transaction soit incluse dans un bloc
- Frais brûlés - La quantité d'ETH brûlée dans le bloc
- Données supplémentaires - Toutes les données supplémentaires que le constructeur a incluses dans le bloc

**Données avancées**

- Hash - Le hash cryptographique qui représente l'en-tête de bloc (l'identifiant unique du bloc)
- Hash parent - Le hash du bloc qui a précédé le bloc actuel
- StateRoot - Le hash racine de l'arbre de Merkle qui stocke l'état complet du système

### Gaz {#gas}

Non seulement les explorateurs de blocs vous donneront des données sur l'utilisation du gaz dans les transactions et les blocs, mais certains vous donneront des informations sur les prix du gaz actuels du réseau. Cela vous aidera à comprendre l'utilisation du réseau, à soumettre des transactions sûres et à ne pas dépenser trop en gaz. Recherchez des API qui peuvent vous aider à intégrer ces informations dans l'interface de votre produit. Les données spécifiques au gaz couvrent :

- Unités de gaz estimées nécessaires pour une transaction sûre mais lente (+ prix et durée estimés)
- Unités de gaz estimées nécessaires pour une transaction moyenne (+ prix et durée estimés)
- Unités de gaz estimées nécessaires pour une transaction rapide (+ prix et durée estimés)
- Temps de confirmation moyen basé sur le prix du gaz
- Contrats qui consomment du gaz - en d'autres termes, les produits populaires qui sont très utilisés sur le réseau
- Comptes qui dépensent du gaz - en d'autres termes, les utilisateurs fréquents du réseau

### Transactions {#transactions}

Les explorateurs de blocs sont devenus un endroit courant pour suivre la progression de ses transactions. C'est parce que le niveau de détail que vous pouvez obtenir offre une certitude supplémentaire. Les données de transaction incluent :

**Données standards**

- Hachage de transaction - Un hash généré lors de la soumission de la transaction
- Statut - Une indication indiquant si la transaction est en attente, a échoué ou a réussi
- Bloc - Le bloc dans lequel la transaction a été incluse
- Horodatage - L'heure à laquelle une transaction a été incluse dans un bloc proposé par un validateur
- De (From) - L'adresse du compte qui a soumis la transaction
- À (To) - L'adresse du destinataire ou du contrat intelligent avec lequel la transaction interagit
- Jetons transférés - Une liste de jetons qui ont été transférés dans le cadre de la transaction
- Valeur - La valeur totale en ETH transférée
- Frais de transaction - Le montant payé au validateur pour traiter la transaction (calculé par prix du gaz \* gaz utilisé)

**Données avancées**

- Limite de gaz - Le nombre maximum d'unités de gaz que cette transaction peut consommer
- Gaz utilisé - La quantité réelle d'unités de gaz que la transaction a consommée
- Prix du gaz - Le prix fixé par unité de gaz
- Nonce - Le numéro de transaction pour l'adresse `from` (gardez à l'esprit que cela commence à 0, donc un nonce de `100` serait en fait la 101e transaction soumise par ce compte)
- Données d'entrée - Toute information supplémentaire requise par la transaction

### Comptes {#accounts}

Il y a beaucoup de données auxquelles vous pouvez accéder concernant un compte. C'est pourquoi il est souvent recommandé d'utiliser plusieurs comptes afin que vos actifs et votre valeur ne puissent pas être facilement suivis. Il existe également des solutions en cours de développement pour rendre les transactions et l'activité des comptes plus privées. Mais voici les données disponibles pour les comptes :

**Comptes utilisateurs**

- Adresse du compte - L'adresse publique que vous pouvez utiliser pour envoyer des fonds
- Solde en ETH - Le montant d'ETH associé à ce compte
- Valeur totale en ETH - La valeur de l'ETH
- Jetons - Les jetons associés au compte et leur valeur
- Historique des transactions - Une liste de toutes les transactions où ce compte était soit l'expéditeur, soit le destinataire

**Contrats intelligents**

Les comptes de contrats intelligents ont toutes les données qu'un compte utilisateur aura, mais certains explorateurs de blocs afficheront même des informations sur le code. Les exemples incluent :

- Créateur du contrat - L'adresse qui a déployé le contrat sur le Réseau principal
- Transaction de création - La transaction qui a inclus le déploiement sur le Réseau principal
- Code source - Le code Solidity ou Vyper du contrat intelligent
- ABI du contrat - L'interface binaire d'application (ABI) du contrat — les appels que le contrat effectue et les données reçues
- Code de création du contrat - Le bytecode compilé du contrat intelligent — créé lorsque vous compilez un contrat intelligent écrit en Solidity ou Vyper, etc.
- Événements du contrat - Un historique des méthodes appelées dans le contrat intelligent — essentiellement un moyen de voir comment le contrat est utilisé et à quelle fréquence

### Jetons {#tokens}

Les jetons sont un type de contrat, ils auront donc des données similaires à celles d'un contrat intelligent. Mais parce qu'ils ont de la valeur et peuvent être échangés, ils ont des points de données supplémentaires :

- Type - S'il s'agit d'un ERC-20, d'un ERC-721 ou d'une autre norme de jeton
- Prix - S'il s'agit d'un ERC-20, ils auront une valeur marchande actuelle
- Capitalisation boursière - S'il s'agit d'un ERC-20, ils auront une capitalisation boursière (calculée par prix \* offre totale)
- Offre totale - Le nombre de jetons en circulation
- Détenteurs - Le nombre d'adresses qui détiennent le jeton
- Transferts - Le nombre de fois que le jeton a été transféré entre des comptes
- Historique des transactions - Un historique de toutes les transactions incluant le jeton
- Adresse du contrat - L'adresse du jeton qui a été déployé sur le Réseau principal
- Décimales - Les jetons ERC-20 sont divisibles et ont des décimales

### Réseau {#network}

Certaines données de bloc concernent la santé d'Ethereum de manière plus globale.

- Total des transactions - Le nombre de transactions depuis la création d'Ethereum
- Transactions par seconde - Le nombre de transactions traitables en une seconde
- Prix de l'ETH - La valorisation actuelle de 1 ETH
- Offre totale d'ETH - Nombre d'ETH en circulation — n'oubliez pas que de nouveaux ETH sont créés avec la création de chaque bloc sous forme de récompenses de bloc
- Capitalisation boursière - Calcul du prix \* offre

## Données de la couche de consensus {#consensus-layer-data}

### Époque {#epoch}

Pour des raisons de sécurité, des comités aléatoires de validateurs sont créés à la fin de chaque époque (toutes les 6,4 minutes). Les données d'époque incluent :

- Numéro d'époque
- Statut finalisé - Si l'époque a été finalisée (Oui/Non)
- Heure - L'heure à laquelle l'époque s'est terminée
- Attestations - Le nombre d'attestations dans l'époque (votes pour les blocs dans les créneaux)
- Dépôts - Le nombre de dépôts d'ETH inclus dans l'époque (les validateurs doivent staker des ETH pour devenir validateurs)
- Pénalités (Slashings) - Nombre de pénalités infligées aux proposants de blocs ou aux attestateurs
- Participation au vote - Le montant d'ETH staké utilisé pour attester les blocs
- Validateurs - Nombre de validateurs actifs pour l'époque
- Solde moyen des validateurs - Solde moyen des validateurs actifs
- Créneaux - Nombre de créneaux inclus dans l'époque (les créneaux incluent un bloc valide)

### Créneau {#slot}

Les créneaux sont des opportunités de création de blocs, les données disponibles pour chaque créneau incluent :

- Époque - L'époque dans laquelle le créneau est valide
- Numéro de créneau
- Statut - Le statut du créneau (Proposé/Manqué)
- Heure - L'horodatage du créneau
- Proposant - Le validateur qui a proposé le bloc pour le créneau
- Racine du bloc - La racine de l'arbre de hachage (hash-tree-root) du bloc phare (BeaconBlock)
- Racine parente - Le hash du bloc qui a précédé
- Racine d'état - La racine de l'arbre de hachage du BeaconState
- Signature
- Révélation RANDAO
- Graffiti - Un proposeur de bloc peut inclure un message de 32 octets à sa proposition de bloc
- Données d'exécution
  - Hash du bloc
  - Nombre de dépôts
  - Racine des dépôts
- Attestations - Nombre d'attestations pour le bloc dans ce créneau
- Dépôts - Le nombre de dépôts pendant ce créneau
- Sorties volontaires - Le nombre de validateurs qui sont partis pendant le créneau
- Pénalités (Slashings) - Nombre de pénalités infligées aux proposants de blocs ou aux attestateurs
- Votes - Les validateurs qui ont voté pour le bloc dans ce créneau

### Blocs {#blocks-1}

La preuve d'enjeu (PoS) divise le temps en créneaux et en époques. Cela signifie donc de nouvelles données !

- Proposant - Le validateur qui a été choisi algorithmiquement pour proposer le nouveau bloc
- Époque - L'époque dans laquelle le bloc a été proposé
- Créneau - Le créneau dans lequel le bloc a été proposé
- Attestations - Le nombre d'attestations incluses dans le créneau — les attestations sont comme des votes qui indiquent que le bloc est prêt à aller sur la chaîne balise

### Validateurs {#validators}

Les validateurs sont responsables de proposer des blocs et de les attester dans les créneaux.

- Numéro de validateur - Numéro unique qui représente le validateur
- Solde actuel - Le solde du validateur incluant les récompenses
- Solde effectif - Le solde du validateur qui est utilisé pour le staking
- Revenu - Les récompenses ou pénalités reçues par le validateur
- Statut - Si le validateur est actuellement en ligne et actif ou non
- Efficacité de l'attestation - Le temps moyen qu'il faut pour que les attestations du validateur soient incluses dans la chaîne
- Éligibilité à l'activation - Date (et époque) à laquelle le validateur est devenu disponible pour valider
- Actif depuis - Date (et époque) à laquelle le validateur est devenu actif
- Blocs proposés - Le bloc que le validateur a proposé
- Attestations - Les attestations que le validateur a fournies
- Dépôts - L'adresse d'origine, le hachage de transaction, le numéro de bloc, l'horodatage, le montant et le statut du dépôt de staking effectué par le validateur

### Attestations {#attestations}

Les attestations sont des votes « oui » pour inclure des blocs dans la chaîne. Leurs données se rapportent à un enregistrement de l'attestation et aux validateurs qui ont attesté.

- Créneau - Le créneau dans lequel l'attestation a eu lieu
- Indice du comité - L'indice du comité au créneau donné
- Bits d'agrégation - Représente l'attestation agrégée de tous les validateurs participants à l'attestation
- Validateurs - Les validateurs qui ont fourni des attestations
- Racine du bloc phare - Pointe vers le bloc que les validateurs attestent
- Source - Pointe vers la dernière époque justifiée
- Cible - Pointe vers la dernière limite d'époque
- Signature

### Réseau {#network-1}

Les données de haut niveau de la couche de consensus incluent les éléments suivants :

- Époque actuelle
- Créneau actuel
- Validateurs actifs - Nombre de validateurs actifs
- Validateurs en attente - Nombre de validateurs attendant d'être rendus actifs
- ETH staké - Montant d'ETH staké sur le réseau
- Solde moyen - Solde moyen en ETH des validateurs

## Pour aller plus loin {#further-reading}

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Transactions](/developers/docs/transactions/)
- [Comptes](/developers/docs/accounts/)
- [Réseaux](/developers/docs/networks/)