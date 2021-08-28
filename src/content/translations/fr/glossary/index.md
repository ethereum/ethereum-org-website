---
title: Glossaire Ethereum
description: Glossaire non-exhaustif des termes (techniques ou non) liés à Ethereum
lang: fr
sidebar: true
sidebarDepth: 2
---

# Glossaire {#ethereum-glossary}

<Divider />

## # {#section-numbers}

### attaque de 51 % {#51-attack}

Type d'attaque mené sur un [réseau](#network) décentralisé au cours de laquelle un groupe prend le contrôle de la majorité des [nœuds](#node). Cela permettrait de frauder la blockchain en inversant des [transactions](#transaction) et en doublant les dépenses d'[Ether](#ether) et d'autres jetons.

## A {#section-a}

### compte {#account}

Objet contenant une [adresse](#address), un solde, un [nonce](#nonce), ainsi qu'un stockage et un code facultatifs. Il peut s'agir d'un [compte de contrat](#contract-account) ou d'un [compte externe (EOA)](#eoa).

<DocLink to="/developers/docs/accounts" title="comptes Ethereum" />

### adresse {#address}

Plus généralement, il s'agit d'un [EOA](#eoa) ou d'un [compte de contrat](#contract-accouint) qui peut recevoir (adresse de destination) ou envoyer (adresse source) des [transactions](#transaction) sur la blockchain. Plus spécifiquement, il s'agit des 160 bits de droite d'un [hash Keccak](#keccak-256) d'une [clé publique](#public-key) [ECDSA](#ecdsa).

### assert {#assert}

Dans [Solidity](#solidity), `assert(false)` compile en `0xfe`, un code d'opération (opcode) non valide, qui utilise tout le [carburant](#gas) restant et annule toutes les modifications. Lorsqu'une déclaration `assert()` échoue, quelque chose ne fonctionne pas du tout comme prévu, et vous devez corriger votre code. Il est conseillé d'utiliser `assert()` pour éviter les conditions qui ne doivent jamais se produire.

<DocLink to="/developers/docs/security/" title="sécurité" />

### attestation {#attestation}

Il s'agit du vote d'un validateur pour un bloc de la [chaîne phare](#beacon-chain) ou un [bloc](#block)[ de fragments](#shard). Les validateurs doivent attester de la conformité des blocs, signalant qu'ils sont d'accord avec l'état proposé par le bloc.

<Divider />

## B {#section-b}

### chaîne phare {#beacon-chain}

Une mise à niveau Eth2 qui deviendra la coordinatrice du réseau Ethereum. Elle introduit la [preuve d'enjeu](#proof-of-stake) et [les validateurs](#validator) sur Ethereum. Elle finira par être fusionnée avec le [réseau principal](#mainnet).

<DocLink to="/eth2/beacon-chain/" title="Chaîne phare" />

### gros-boutiste {#big-endian}

Représentation de nombre positionnel où le chiffre le plus important est le premier en mémoire, contrairement au petit-boutiste, où le chiffre le moins significatif est le premier.

### bloc {#block}

Collection d'informations requises (en-tête de bloc) concernant les [transactions](#transaction) incluses, et ensemble d'autres en-têtes de blocs appelés [ommers](#ommer). Les blocs sont ajoutés au réseau Ethereum par les [mineurs](#miner).

<DocLink to="/developers/docs/blocks/" title="blocs" />

### blockchain {#blockchain}

Dans Ethereum, il s'agit d'une suite de [blocs](#block) validée par le système de [preuve de travail](#pow), chaque bloc étant relié à son prédécesseur jusqu'au [bloc d'origine](#genesis-block). Il n'existe pas de limite de taille de bloc. La blockchain utilise à la place différentes [limites de carburant](#gas-limit).

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain" title="Qu'est-ce qu'une blockchain ?" />

### bytecode {#bytecode}

Ensemble d'instructions abstraites conçu pour une exécution efficace par un interpréteur logiciel ou une machine virtuelle. Contrairement au code source lisible par l'homme, le bytecode est exprimé au format numérique.

### fourche Byzantium {#byzantium-fork}

La première des deux [fourches majeures](#hard-fork) (scissions) de l'étape de développement [Metropolis](#metropolis). Elle comprend la [bombe de difficulté](#difficulty-bomb) de l'EIP-649 Metropolis et la réduction des récompenses de bloc, où [Ice Age](#ice-age) a été retardé de 1 an et la récompense de bloc réduite de 5 à 3 Ether.

<Divider />

## C {#section-c}

### compiler {#compiling}

Traduire du code écrit dans un langage de programmation de haut niveau (par exemple, [Solidity](#solidity)) en un langage de niveau inférieur (par exemple, le [bytecode](#bytecode) de l'EVM).

<DocLink to="/developers/docs/smart-contracts/compiling/" title="Compiler des contrats intelligents" />

### comité {#committee}

Groupe d'au moins 128 [validateurs](#validator) assignés de façon aléatoire par la [chaîne phare](#beacon-chain) à ses blocs et à des blocs de fragments.

### consensus {#consensus}

Lorsque de nombreux nœuds (généralement, la plupart de ceux du réseau) ont tous les mêmes blocs dans leur meilleure blockchain localement validée. À ne pas confondre avec les [règles de consensus](#consensus-rules).

### règles de consensus {#consensus-rules}

Règles de validation de bloc que les nœuds complets suivent pour maintenir un consensus entre les nœuds. À ne pas confondre avec le [consensus](#consensus).

### fourche Constantinople {#constantinople-fork}

Seconde partie de l'étape de développement [Metropolis](#metropolis) , initialement prévue pour la mi-2018. Devrait inclure le passage à un algorithme de consensus hybride [preuve de travail](#pow)/[preuve d'enjeu](#pos) , entre autres.

### compte de contrat {#contract-account}

Compte contenant du code qui s'exécute chaque fois qu'il reçoit une [transaction](#transaction) d'un autre [compte](#account) (qu'il s'agisse d'un [compte externe](#eoa) ou de [contrat](#contract-account)).

### transaction de création de contrat {#contract-creation-transaction}

Transaction [spéciale](#transaction), avec [adresse zéro](#zero-address) comme destinataire, utilisée pour enregistrer un [contrat](#contract-account) et le publier sur la blockchain Ethereum.

### liens croisés {#crosslink}

Un lien croisé fournit un résumé de l'état d'un fragment. Il s'agit de la façon dont les [fragments](#shard) communiqueront les uns avec les autres via la [chaîne phare](#beacon-chain) dans le système de [preuve d'enjeu](#proof-of-stake) fragmenté.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="preuve d'enjeu" />

<Divider />

## D {#section-d}

### organisation autonome décentralisée (DAO) {#dao}

Entreprise ou autre organisation fonctionnant sans gestion hiérarchique. DAO peut également faire référence à un contrat intitulé "The DAO" lancé le 30 avril 2016, qui a ensuite été piraté en juin 2016. Ceci a finalement motivé une [fourche majeure](#hard-fork) (nom de code DAO) au bloc 1 192 000, qui a inversé le contrat DAO piraté et a causé la division d'Ethereum et d'Ethereum Classic en deux systèmes concurrents.

<DocLink to="/community/#decentralized-autonomous-organizations-daos" title="organisation autonome décentralisée (DAO)" />

### DApp {#dapp}

Application décentralisée. Au minimum, il s'agit d'un [contrat intelligent](#smart-contract) et d'une interface utilisateur Web. Plus généralement, une DApp est une application Web construite sur des services d'infrastructure ouverts, décentralisés et P2P. Par ailleurs, de nombreuses DApps incluent un stockage décentralisé, une plateforme et/ou un protocole de message.

<DocLink to="/developers/docs/dapps/" title="Introduction aux DApps" />

### échange décentralisé (DEX) {#dex}

Type de [DApp](#dapp) qui vous permet d'échanger des jetons avec des pairs sur le réseau. Vous avez besoin d'[Ether](#ether) pour en utiliser un (pour payer les [frais de transaction](#transaction-fee)), mais ils ne sont soumis à aucune restriction géographique comme les échanges centralisés. N'importe qui peut participer.

<DocLink to="/get-eth/#dex" title="échanges décentralisés (DEX)" />

### deed {#deed}

Voir [jeton non fongible (NFT)](#nft)

### DeFi {#defi}

Abréviation de "Decentralized Finance" (finance décentralisée), une large catégorie de [DApps](#dapp) visant à fournir des services financiers portés par la blockchain, sans aucun intermédiaire, de sorte que toute personne avec une connexion Internet peut participer.

<DocLink to="/dapps/#explore" title="DApps DeFi " />

### difficulté {#difficulty}

Paramètre à l'échelle du réseau qui contrôle la quantité de calcul requise pour produire une [preuve de travail](#pow).

### bombe de difficulté {#difficulty-bomb}

Augmentation exponentielle planifiée de la [difficulté](#difficulty) de la [preuve de travail](#pow). Ce paramètre est conçu pour motiver la transition vers la [preuve d'enjeu](#pos), réduisant les modifications apportées à une [fourche](#hard-fork)

### signature numérique {#digital-signatures}

Courte chaîne de données qu'un utilisateur produit pour un document en utilisant une [clé privée](#private-key) de sorte que quiconque ayant la [clé publique](#public-key) correspondante, la signature et le document peut vérifier que (1) le document a bien été "signé" par le propriétaire de cette clé privée particulière, et (2) le document n'a pas été modifié après sa signature.

<Divider />

## E {#section-e}

### algorithme de signature numérique à courbe elliptique (ECDSA) {#ecdsa}

Algorithme cryptographique utilisé par Ethereum pour garantir que les fonds ne peuvent être dépensés que par leurs propriétaires.

### période {#epoch}

Période de 32 [créneaux](#slot) (6,4 minutes) dans le système coordonné de la [chaîne phare](#beacon-chain). Les [comités](#committee) de [validateurs](#validator) sont remaniés lors de chaque période pour des raisons de sécurité. Chaque période représente une opportunité de [finaliser](#finality) la chaîne.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="preuve d'enjeu" />

### proposition d'amélioration d'Ethereum (EIP) {#eip}

Document de conception qui fournit des informations à la communauté Ethereum, décrivant une nouvelle fonctionnalité proposée, ses processus ou environnements (voir [ERC](#erc)).

<DocLink to="/eips/" title="Introduction aux EIP" />

### Ethereum Name Service (ENS) {#ens}

Le registre ENS est un [contrat](#smart-contract) unique qui fournit un mappage des noms de domaine aux propriétaires et aux résolveurs, comme décrit dans l'[EIP](#eip) 137.

[Plus d'infos sur github.com](https://github.com/ethereum/ens)

### entropie {#entropy}

En cryptographie, désigne le manque de prévisibilité ou le niveau d’aléatoire. Lorsqu'ils génèrent des informations secrètes, comme les [clés privées](#private-key), les algorithmes s'appuient généralement sur une source d'entropie élevée pour garantir que le résultat est imprévisible.

### compte externe (EOA) {#eoa}

Également appelé "compte externe", il s'agit d'un [compte](#account) créé par ou pour des utilisateurs humains du réseau Ethereum.

### demande de commentaires Ethereum (ERC) {#erc}

Libellé donné à certaines [EIP](#eip) qui visent à définir un standard spécifique d'utilisation d'Ethereum.

<DocLink to="/eips/" title="Introduction aux EIP" />

### Ethash {#ethash}

Algorithme de [preuve de travail](#pow) pour Ethereum 1.0.

[Plus d'infos sur eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

Cryptomonnaie native utilisée par l'écosystème Ethereum, qui couvre les coûts de [carburant](#gas) lors de l'exécution des transactions. S'écrit également sous la forme ETH ou avec son symbole Ξ, qui est le caractère grec Xi en majuscule.

<DocLink to="/eth/" title="Monnaie de notre avenir numérique" />

### événements {#events}

Permet d'utiliser les dispositifs de journalisation de l'[EVM](#evm). Les [DApps](#dapp) peuvent écouter les événements et les utiliser pour déclencher des rappels JavaScript dans l'interface utilisateur.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs" title="Événements et journaux" />

### machine virtuelle Ethereum (EVM) {#evm}

Machine virtuelle basée sur une pile, qui exécute du [bytecode](#bytecode). Dans Ethereum, le modèle d'exécution spécifie comment l'état du système est modifié, en fonction d'une série d'instructions en bytecode et d'un petit tuple de données environnementales. Ceci est spécifié via un modèle formel de machine d'état virtuelle.

<DocLink to="/developers/docs/evm/" title="Machine virtuelle Ethereum" />

### langage d'assemblage de l'EVM {#evm-assembly-language}

Forme lisible par l'homme du [bytecode de l'EVM](#bytecode).

<Divider />

## F {#section-f}

### fonction de secours {#fallback-function}

Fonction par défaut appelée en l'absence de données ou d'un nom de fonction déclaré.

### robinet {#faucet}

Service effectué via un [contrat intelligent](#smart-contract), qui distribue des fonds sous la forme d'ethers de test gratuits peuvant être utilisés sur un réseau de test.

<DocLink to="/developers/docs/networks/#testnet-faucets" title="robinets de réseau de test" />

### finalisation {#finality}

La finalisation est la garantie qu'avant une heure donnée, un ensemble de transactions ne changera pas et ne pourra pas être annulé.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality" title="Finalité de la preuve de travail" /> <DocLink to="/developers/docs/consensus-mechanisms/pos/#finality" title="Finalité de la preuve d'enjeu" />

### finney {#finney}

Autre dénomination de l'[Ether](#ether). 1 Finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> Finney = 1 Ether.

### fourche {#fork}

Changement de protocole causant la création d'une chaîne alternative, ou divergence temporelle dans deux chemins de blocs potentiels pendant le minage.

### preuve de fraude {#fraud-proof}

Modèle de sécurité pour certaines solutions de [couche 2](#layer-2) où, pour augmenter la vitesse, les transactions sont [regroupées](#rollups) en lots et soumises sur Ethereum en une seule transaction. Elles sont supposées être valides, mais peuvent être contestées si un cas de fraude est suspecté. Une preuve de fraude exécutera alors la transaction pour vérifier l'existence d'une fraude. Cette méthode augmente le nombre de transactions possibles tout en maintenant le niveau de sécurité. Certains [rollups](#rollups) utilisent des [preuves de validité](#validity-proof).

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups" title="rollups optimisés" />

### Frontier {#frontier}

Phase initiale de développement des tests Ethereum, qui a duré de juillet 2015 à mars 2016.

<Divider />

## G {#section-g}

### carburant {#gas}

Carburant virtuel utilisé dans Ethereum pour exécuter les contrats intelligents. L'[EVM](#evm) utilise un mécanisme de comptabilité pour mesurer la consommation de carburant et limiter la consommation de ressources informatiques (voir [Turing complet](#turing-complete)).

<DocLink to="/developers/docs/gas/" title="carburant et frais" />

### limite de carburant {#gas-limit}

Montant maximum de [carburant](#gas) qu'une transaction [](#transaction) ou qu'un [bloc](#block) peut consommer.

### bloc d'origine {#genesis-block}

Premier bloc d'une [blockchain](#blockchain), utilisé pour initialiser un réseau particulier et sa cryptomonnaie.

### Geth {#geth}

Go Ethereum. L'une des implémentations les plus importantes du protocole Ethereum, rédigée en Go.

[Plus d'infos sur geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Abréviation de Gigawei, une dénomination de l'[Ether](#ether), couramment utilisée pour attribuer un prix au [carburant](#gas). 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 Ether.

<Divider />

## H {#section-h}

### fourche majeure {#hard-fork}

Divergence permanente dans la [blockchain](#blockchain), aussi appelée modification de fourche majeure. Cela se produit habituellement lorsque les nœuds non mis à niveau ne peuvent pas valider les blocs créés par ceux mis à niveau, qui suivent des [règles de consensus](#consensus-rules) plus récentes. À ne pas confondre avec une fourche, une fourche mineure, une fourche logicielle ou une fourche Git.

### hash (ou hachage) {#hash}

Empreinte de longueur fixe d'entrées de taille variable, produite par une fonction de hachage. (Voir [keccak-256](#keccak-256))

### portefeuille HD {#hd-wallet}

[Portefeuille](#wallet) utilisant la création de clé déterministe hiérarchique (HD) et le protocole de transfert associé.

[Plus d'infos sur github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### graine de portefeuille HD {#hd-wallet-seed}

Valeur utilisée pour générer la [clé privée](#private-key) maîtresse et le code de chaîne maître pour un [portefeuille](#wallet) HD. Il est possible de représenter la graine de portefeuille par des mots mnémoniques, ce qui facilite la copie, la sauvegarde et la restauration des clés privées pour les utilisateurs.

### Homestead {#homestead}

Deuxième phase de développement d'Ethereum, lancée en mars 2016 au bloc 1 150 000.

<Divider />

## I {#section-i}

### protocole d'échange d'adresses de clients (ICAP) {#icap}

Encodage d'adresse Ethereum partiellement compatible avec l'encodage du numéro de compte bancaire international (IBAN), offrant un encodage polyvalent, contrôlé et interopérable pour les adresses Ethereum. Les adresses ICAP utilisent un nouveau code de pseudo-pays IBAN - XE, ce qui signifie "eXtended Ethereum", comme utilisé dans les monnaies non juridictionnelles (par exemple, XBT, XRP, XCP).

### Ice Age {#ice-age}

[Fourche majeure](#hard-fork) d'Ethereum au bloc 200 000 pour introduire une augmentation exponentielle de la [difficulté](#difficulty) (aussi appelée [bombe de difficulté](#difficulty-bomb)), motivant une transition vers la [preuve d'enjeu](#pos).

### environnement de développement intégré (EDI) {#ide}

Interface utilisateur qui combine généralement un éditeur de code, un compilateur, un environnement d'exécution et un débogueur.

<DocLink to="/developers/docs/ides/" title="environnement de développement intégrés (IDE)" />

### problème du code déployé immuable {#immutable-deployed-code-problem}

Une fois que le code d'un [contrat](#smart-contract) (ou celui d'une [bibliothèque](#library)) est déployé, il devient immuable. Les pratiques de développement de logiciels standard reposent sur la possibilité de corriger d'éventuels bogues et d'ajouter de nouvelles fonctionnalités. Cela représente donc un problème pour le développement de contrats intelligents.

<DocLink to="/developers/docs/smart-contracts/deploying/" title="Déployer des contrats intelligents" />

### transaction interne {#internal-transaction}

[Transaction](#transaction) envoyée depuis un [compte de contrat](#contract-account) vers un autre ou vers un [compte externe (EOA)](#eoa) (voir [message](#message)).

<Divider />

## K {#section-k}

### fonction de dérivation de clé (KDF) {#kdf}

Aussi appelé "algorithme d'étirement de mot de passe", elle est utilisée par les formats de [keystore](#keystore-file) pour protéger contre les attaques de force brute, de dictionnaire et de table arc-en-ciel sur le chiffrement des phrases de sécurité, en hachant celles-ci de façon répétée.

<DocLink to="/developers/docs/security/" title="Sécurité" />

### keccak-256 {#keccak-256}

Fonction de [hachage](#hash) cryptographique utilisée dans Ethereum. Keccak-256 a été standardisée en tant que [SHA](#sha)-3.

### fichier keystore {#keystore-file}

Fichier encodé en JSON qui contient une seule [clé privée](#private-key) (générée aléatoirement), chiffré par une phrase secrète pour plus de sécurité.

<Divider />

## L {#section-l}

### couche 2 {#layer-2}

Domaine de développement axé sur les améliorations par couche sur le protocole Ethereum. Ces améliorations sont liées aux vitesses de [transaction](#transaction), à la réduction des [frais de transaction](#transaction-fee) et à la confidentialité des transactions.

<DocLink to="/developers/docs/layer-2-scaling/" title="Couche 2" />

### LevelDB {#level-db}

Système open source de stockage de clé-valeur sur disque, implémenté en tant que [bibliothèque](#library) légère à usage unique, avec des liaisons vers de nombreuses plateformes.

### bibliothèque {#library}

Type spécial de [contrat](#smart-contract) qui n'a ni fonction de paiement, ni fonction de secours, ni stockage de données. Par conséquent, une bibliothèque ne peut ni recevoir ni détenir l'Ether, ni stocker des données. Elle sert de code précédemment déployé que d'autres contrats peuvent appeler pour obtenir un calcul en lecture seule.

<DocLink to="/developers/docs/smart-contracts/libraries/" title="Bibliothèques de contrats intelligents" />

### client léger {#lightweight-client}

Client Ethereum qui ne stocke aucune copie locale de la [blockchain](#blockchain), ou qui ne valide aucun bloc ni aucune [transaction](#transaction). Il offre les fonctions d'un [portefeuille](#wallet), et peut créer et diffuser des transactions.

<Divider />

## M {#section-m}

### réseau principal {#mainnet}

Également appelé "mainnet" (pour "main network"), il s'agit de la [blockchain](#blockchain) principale du réseau public Ethereum. De vrais ETH, une valeur et des conséquences réelles. Aussi connu sous le nom de "Couche 1" lors des discussions sur les solutions d'évolutivité de la [couche 2](#layer-2). (Voir aussi [réseau de test](#testnet))

### arbre de Merkle {#merkle-patricia-tree}

Structure de données utilisée dans Ethereum pour stocker efficacement les paires clés-valeurs.

### message {#message}

[Transaction interne](#internal-transaction) qui n'est jamais sérialisée et qui est uniquement envoyée dans l'[EVM](#evm).

### appel de message {#message-call}

L'acte de passer un [message](#message) d'un compte à un autre. Si le compte de destination est associé au code de l'[EVM](#evm), alors celle-ci sera démarrée avec l'état de cet objet et le message sera traité.

### Metropolis {#metropolis}

La troisième phase de développement d'Ethereum, lancée en octobre 2017.

### mineur {#miner}

[Nœud](#node) du réseau qui trouve une [preuve de travail](#pow) valide pour de nouveaux blocs, par hachage de passes répétées (voir [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/" title="Minage" />

<Divider />

## N {#section-n}

### réseau {#network}

Se référant à Ethereum, réseau P2P qui propage les transactions et les blocs à chaque nœud Ethereum (participant au réseau).

<DocLink to="/developers/docs/networks/" title="Réseaux" />

### jeton non fongible (NFT) {#nft}

Aussi connu sous le nom de "deed", il s'agit d'une norme de jeton introduite par la proposition ERC-721. Les NFT peuvent être suivis et échangés, mais chaque jeton est unique et distinct. Ils ne sont pas interchangeables comme les jetons ERC-20. Les NFT peuvent représenter la propriété des actifs numériques ou physiques.

<DocLink to="/developers/docs/standards/tokens/erc-721/" title="Norme de jeton non fongible ERC-721" />

### nœud {#node}

Client logiciel qui participe au réseau.

<DocLink to="/developers/docs/nodes-and-clients/" title="Nœuds et clients" />

<DocLink to="/developers/docs/nodes-and-clients/" title="Nœuds et clients" />

### nonce {#nonce}

En cryptographie, valeur qui ne peut être utilisée qu'une seule fois. Il existe deux types de nonces dans Ethereum : le nonce de compte est un compteur de transactions présent dans chaque compte, qui est utilisé pour prévenir les attaques par rejeu ; et le nonce de [preuve de travail](#pow) est la valeur aléatoire utilisée dans un bloc pour satisfaire la [preuve de travail](#pow).

<Divider />

## O {#section-o}

### bloc oncle {#ommer}

Quand un [mineur](#miner) trouve un [bloc](#block) valide, un autre mineur peut avoir publié un bloc concurrent, qui est ajouté en premier au sommet de la blockchain. Ce bloc valide, mais obsolète, peut être inclus par des blocs plus récents en tant que _bloc oncle_ et recevoir une récompense partielle. On utilise parfois le terme "ommer", plus neutre, pour parler de fraternité d'un bloc parent.

### rollup optimisé {#optimistic-rollup}

Un [rollup](#rollups) (ou regroupement) de transactions qui utilise les [preuves de fraude](#fraud-proof) pour permettre un débit de transactions plus élevé sur la [couche 2](#layer-2) tout en bénéficiant de la sécurité apportée par le [réseau principal](#mainnet) (couche 1). Contrairement à [Plasma](#plasma), une solution similaire sur la couche 2, les Optimistic rollups peuvent gérer des transactions plus complexes, en fait tout ce qui est possible au sein de l'[EVM](#evm). Ils ont des problèmes de latence par rapport aux [rollups ZK](#zk-rollups), car une transaction peut être contestée par l'intermédiaire de la preuve de fraude.

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups" title="rollups optimisés" />

<Divider />

## P {#section-p}

### Parity {#parity}

Une des implémentations interopérables les plus importantes du logiciel Ethereum Client.

### Plasma {#plasma}

Une solution d'évolutivité de [couche 2](#layer-2) qui utilise les [preuves de fraude](#fraud-proof), comme les [rollups optimisés](#optimistic-rollups). Plasma se limite aux transactions simples comme les échanges et transferts de jetons de base.

<DocLink to="/developers/docs/layer-2-scaling/#Plasma" title="Plasma" />

### clé privée (clé secrète) {#private-key}

Nombre secret qui permet aux utilisateurs Ethereum de prouver la propriété d'un compte ou de contrats, en produisant une signature numérique (voir [clé publique](#public-key), [adresse](#address), [ECDSA](#ecdsa)).

### preuve d'enjeu (PoS) {#pos}

Méthode par laquelle un protocole de blockchain de cryptomonnaie vise à atteindre un [consensus](#consensus) distribué. La PoS demande aux utilisateurs de prouver qu'ils sont propriétaires d'une certaine quantité de cryptomonnaie (leur "mise" sur le réseau) afin de pouvoir participer à la validation des transactions.

<DocLink to="/developers/docs/consensus-mechanisms/pos/" title="preuve d'enjeu" />

### preuve de travail (PoW) {#pow}

Portion de données (la preuve) qui nécessite des calculs significatifs pour être trouvée. Dans Ethereum, les [mineurs](#miner) doivent trouver une solution numérique à l'algorithme [Ethash](#ethash), qui répond à un objectif de [difficulté](#difficulty) à l'échelle du réseau.

<DocLink to="/developers/docs/consensus-mechanisms/pow/" title="Preuve de travail" />

### clé publique {#public-key}

Nombre dérivé depuis une [clé privée](#private-key) via une fonction à sens unique, qui peut être partagé publiquement et utilisé par n'importe qui pour vérifier une signature numérique créée avec la clé privée correspondante.

<Divider />

## R {#section-r}

### reçu {#receipt}

Données renvoyées par un client Ethereum pour représenter le résultat d'une [transaction](#transaction) particulière, y compris un hash [](#hash) de la transaction, son numéro de [bloc](#block), la quantité de [carburant](#gas) utilisée et, en cas de déploiement d'un [contrat intelligent](#smart-contract), l'[adresse](#address) du contrat.

### attaque par réentrance {#re-entrancy-attack}

Attaque qui consiste en un contrat attaquant qui appelle une fonction du contrat de la victime de telle façon que, pendant l'exécution, la victime rappelle le contrat de l'attaquant de façon récursive. Par exemple, en ignorant certaines parties du contrat de la victime qui mettent à jour les soldes ou comptabilisent les montants de retrait, cela peut aboutir à un vol de fonds.

<DocLink to="/developers/docs/security/#re-entrancy" title="réentrance" />

### récompense {#reward}

Montant d'ether inclus dans chaque nouveau bloc comme récompense du réseau au [mineur](#miner) qui a trouvé la solution de la [preuve de travail](#pow).

### préfixe de longueur récursive (RLP) {#rlp}

Un standard d'encodage conçu par les développeurs Ethereum pour encoder et sérialiser des objets (structure de données) de complexité et de longueur arbitraires.

### rollups {#rollups}

Type de solution d'évolutivité de [couche 2](#layer-2) qui regroupe plusieurs transactions et les soumet à la [chaîne principale Ethereum](#mainnet) en une seule transaction. Cela permet de réduire les frais de [carburant](#gas) et d'augmenter le débit des [transactions](#transaction). Il existe des rollups optimisés et des rollups ZK qui utilisent différentes méthodes de sécurité pour offrir ces avantages d'évolutivité.

<DocLink to="/developers/docs/layer-2-scaling/#rollups" title="rollups" />

<Divider />

## S {#section-s}

### Serenity {#serenity}

Quatrième et dernière phase de développement d'Ethereum.

<DocLink to="/eth2/" title="Ethereum 2.0 (Eth2)" />

### algorithme de hachage sécurisé (SHA) {#sha}

Famille de fonctions de hachage cryptographique publiées par le National Institute of Standards and Technology (NIST).

### fragment/chaîne de fragments {#shard}

Chaîne de [preuve d'enjeu](#proof-of-stake) coordonnée par la [chaîne phare](#beacon-chain) et sécurisée par les [validateurs](#validator). 64 seront ajoutés au réseau dans le cadre de la mise à niveau de la chaîne de fragments Eth2. Les chaînes de fragments offriront un débit de transaction accru pour Ethereum en fournissant des données supplémentaires aux solutions de la [couche 2](#layer-2) comme les [rollups optimisés](#optimistic-rollups) et les [rollups ZK](#zk-rollups).

<DocLink to="/eth2/shard-chains" title="chaînes de fragments" />

### chaînes latérales {#sidechain}

Solution d'évolutivité qui utilise une chaîne séparée avec des [règles de consensus]{#consensus-rules} différentes, souvent plus rapides. Un pont est nécessaire pour connecter ces chaînes latérales au [réseau principal](#mainnet). Les [rollups](#rollups) utilisent également les chaînes latérales, mais ils fonctionnent en collaboration avec le [réseau principal](#mainnet) à la place.

<DocLink to="/developers/docs/layer-2-scaling/#sidechains" title="chaînes latérales" />

### singleton {#singleton}

Terme de programmation informatique qui décrit un objet dont il ne peut exister qu'une seule instance.

### créneau {#slot}

Période de temps (12 secondes) dans laquelle un nouveau bloc de [chaîne phare](#beacon-chain) et de [chaîne de fragments](#shard) peut être proposé par un [validateur](#validator) dans le système de [preuve d'enjeu](#proof-of-stake). Un créneau peut être vide. 32 créneaux forment une [période](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="preuve d'enjeu" />

### contrat intelligent {#smart-contract}

Programme qui s'exécute sur l'infrastructure de calcul Ethereum.

<DocLink to="/developers/docs/smart-contracts/" title="Introduction aux contrats intelligents" />

### Solidity {#solidity}

Langage de programmation procédural (impératif) dont la syntaxe est similaire à JavaScript, C++ ou Java. Il s'agit du langage le plus populaire et le plus fréquemment utilisé pour les [contrats intelligents](#smart-contract) Ethereum. Créé par Dr. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity" title="Solidity" />

### assemblage en ligne Solidity {#solidity-inline-assembly}

Langage d'assemblage de l'[EVM](#evm) dans un programme [Solidity](#solidity). La prise en charge de Solidity pour l'assemblage en ligne facilite l'écriture de certaines opérations.

### Spurious Dragon {#spurious-dragon}

[Fourche majeure](#hard-fork) de la blockchain Ethereum, qui s'est produit au bloc 2 675 000 pour traiter plus de vecteurs d'attaque par déni de service et d'états clairs (voir [Tangerine Whistle](#tangerine-whistle)). Également un mécanisme de protection contre les attaques par rejeu (voir [nonce](#nonce)).

### stablecoin {#stablecoin}

[jeton ERC-20](#token-standard) dont la valeur est liée à celle d'un autre actif. Il existe des stablecoins liés à des monnaies fiduciaires comme le dollar, des métaux précieux comme l'or, et d'autres cryptomonnaies comme le Bitcoin.

<DocLink to="/eth/#tokens" title="L'ETH n'est pas la seule crypto sur Ethereum" />

### miser {#staking}

Déposer une quantité d'[ether](#ether) (votre mise) pour devenir validateur et sécuriser le [réseau](#network). Un validateur vérifie les [transactions](#transaction) et propose des [blocs](#block) sous un modèle de consensus de [preuve d'enjeu](#pos). Miser vous incite économiquement à agir dans le meilleur intérêt du réseau. Vous obtiendrez des récompenses pour effectuer vos tâches de [validateur](#validator) , mais perdrez diverses quantités d'ETH dans le cas contraire.

<DocLink to="/eth2/staking/" title="Misez votre ETH pour devenir un validateur Ethereum" />

### canaux d'état {#state-channels}

Solution de la [couche 2](#layer-2) où un canal est mis en place entre les participants pour qu'ils puissent effectuer des transactions librement et à moindre coût. Une seule [transaction ](#transaction) est envoyée au [réseau principal](#mainnet) pour configurer et fermer le canal. Cela permet un débit de transaction très élevé, mais repose sur la connaissance du nombre de participants au départ et le blocage de fonds.

<DocLink to="/developers/docs/layer-2-scaling/#state-channels" title="canaux d'état" />

### szabo {#szabo}

Dénomination de l'[ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

[Fourche majeure](#hard-fork) de la blockchain Ethereum, qui s'est produit au bloc 2 463 000 pour changer le calcul du [carburant](#gas) pour certaines opérations intensives en E/S et pour effacer l'état accumulé d'une attaque par déni de service, qui a exploité le faible coût de ces opérations.

### réseau de test {#testnet}

Réseau utilisé pour simuler le comportement du réseau principal Ethereum (voir [réseau principal](#mainnet)).

<DocLink to="/developers/docs/networks/#testnets" title="réseaux de test" />

### norme de jeton {#token-standard}

Introduite par la proposition ERC-20, elle fournit une structure de [contrat intelligent](#smart-contract) standardisée pour les jetons fongibles. Les jetons du même contrat peuvent être suivis, négociés, et sont interchangeables, contrairement aux [NFT](#nft).

<DocLink to="/developers/docs/standards/tokens/erc-20/" title="norme de jeton ERC-20" />

### transaction {#transaction}

Données enregistrées dans la blockchain Ethereum signées par un [compte](#account) émetteur, ciblant une [adresse](#address) spécifique. La transaction contient des métadonnées comme sa [limite de carburant](#gas-limit).

<DocLink to="/developers/docs/transactions/" title="Transactions" />

### frais de transaction {#transaction-fee}

Frais dont il faut s'acquitter à chaque utilisation du réseau Ethereum, comme l'envoi de fonds depuis votre [portefeuille](#wallet) ou l'interaction avec une [DApp](#dapp) (échange de jetons ou achat d'un objet de collection, par ex.). Considérez-les comme des frais de service. Ils évolueront en fonction de l'occupation du réseau. Ceci est dû au fait que les [mineurs](#miner), les utilisateurs responsables du traitement de votre transaction, sont susceptibles de donner la priorité aux transactions dont les frais sont plus élevés. La congestion du réseau force donc la hausse des prix.

Au niveau technique, vos frais de transaction se rapportent à la quantité de [carburant](#gas) requise par votre transaction.

La réduction des frais de transaction est actuellement un sujet qui suscite un vif intérêt. Voir [Couche 2](#layer-2)

### Turing-complet {#turing-complete}

Concept nommé d'après le mathématicien et informaticien anglais Alan Turing. Un système de règles de manipulation de données (comme le jeu d'instructions d'un ordinateur, un langage de programmation ou un automate cellulaire) est "Turing-complet" ou "universel sur le plan informatique" s'il peut être utilisé pour simuler n'importe quelle machine Turing.

<Divider />

## V {#section-v}

### validateur {#validator}

Dans un système de [preuve d'enjeu](#proof-of-stake), [nœud](#node) responsable du stockage des données, du traitement des transactions, et de l'ajout de nouveaux blocs à la blockchain. Pour activer le logiciel validateur, vous devez pouvoir [miser](#staking) 32 ETH.

<DocLink to="/developers/docs/consenus-mechanisms/pos" title="preuve d'enjeu" /> <DocLink to="/eth2/staking/" title="Miser sur Ethereum" />

### preuve de validité {#validity-proof}

Modèle de sécurité pour certaines solutions de la [couche 2](#layer-2) où, pour augmenter la vitesse, les transactions sont [regroupées](/#rollups) en lots et soumises à Ethereum en une seule transaction. Le calcul des transactions se fait hors chaîne et est ensuite fourni à la chaîne principale avec une preuve de leur validité. Cette méthode augmente le nombre de transactions possibles tout en maintenant le niveau de sécurité. Certains [rollups](#rollups) utilisent des [preuves de fraude](#fraud-proof).

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups" title="rollups ZK" />

### Validium {#validium}

Solution de la [couche 2](#layer-2) utilisant les [preuves de validité](#validity-proof) pour améliorer le débit de transactions. Contrairement à celles des [rollups ZK](#zk-rollup), les données Validium ne sont pas stockées sur la couche 1 du [réseau principal](#mainnet).

<DocLink to="/developers/docs/layer-2-scaling/#validium" title="Validité" />

### Vyper {#vyper}

Langage de programmation de haut niveau dont la syntaxe est similaire à celle de Python. Conçu pour se rapprocher d'un langage purement fonctionnel. Créé par Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper" title="Vyper" />

<Divider />

## W {#section-w}

### portefeuille {#wallets}

Logiciel qui conserve des [clés privées](#private-key). Utilisé pour accéder aux [comptes](#account) Ethereum et les contrôler, et interagir avec les [contrats intelligents](#smart-contract). Les clés ne doivent pas nécessairement être stockées dans un portefeuille, et peuvent être récupérées depuis un stockage hors ligne (une carte mémoire ou une feuille papier), pour plus de sécurité. Malgré leur nom, les portefeuilles ne stockent jamais la monnaie ni les jetons en eux-mêmes.

<DocLink to="/wallets/" title="Portefeuilles Ethereum" />

### Web3 {#web3}

Troisième version du Web. D'abord proposé par le Dr. Gavin Wood, Web3 représente une nouvelle vision et une nouvelle orientation pour les applications Web, des applications gérées et possédées de façon centralisée aux applications construites sur des protocoles décentralisés (voir [DApp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/" title="Web2 et Web3" />

### wei {#wei}

Plus petite dénomination de l'[ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### adresse zéro {#zero-address}

Adresse Ethereum spéciale, composée entièrement de zéros et spécifiée comme adresse de destination d'une [transaction de création de contrat](#contract-creation-transaction).

### rollup ZK {#zk-rollup}

Un [rollup](#rollups) (ou regroupement) de transactions utilisant les [preuves de validité](#validity-proof) pour permettre un débit plus élevé de transactions sur la [couche 2](#layer-2) tout en bénéficiant de la sécurité offerte par le [réseau principal](#mainnet) (couche 1). Bien qu'ils ne puissent pas prendre en charge des types de transactions complexes comme le font les [rollups optimisés](#optimistic-rollups), les rollups ZK n'ont pas de problème de latence dans la mesure où les transactions sont prouvées valides à la soumission.

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups" title="Rollups ZK" />

<Divider />

## Sources {#sources}

_Fourni en partie par [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) par [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) sous licence CC-BY-SA_

<Divider />

## Contribuer à cette page {#contribute-to-this-page}

Quelque chose manque ? Vous avez vu quelque chose d'incorrect ? Aidez-nous à améliorer cette page en contribuant à ce glossaire sur GitHub !

[En savoir plus sur la façon de contribuer](/en/contributing/adding-glossary-terms)
