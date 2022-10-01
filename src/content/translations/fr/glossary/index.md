---
title: Glossaire Ethereum
description: Glossaire non-exhaustif des termes (techniques ou non) liés à Ethereum
lang: fr
sidebarDepth: 2
---

# Glossaire {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### Attaque des 51 % {#51-attack}

Type d'attaque mené sur un [réseau](#network) décentralisé où un groupe prend le contrôle de la majorité des [nœuds](#node). Cela permettrait de frauder la blockchain en inversant des [transactions](#transaction) et en doublant les dépenses d'[Ether](#ether) et d'autres jetons.

## A {#section-a}

### Compte {#account}

Objet contenant une [adresse](#address), un solde, un [nonce](#nonce), ainsi qu'un stockage et un code facultatifs. Il peut s'agir d'un [compte de contrat](#contract-account) ou d'un [compte externe (EOA)](#eoa).

<DocLink to="/developers/docs/accounts">
  comptes Ethereum
</DocLink>

### Adresse {#address}

De manière générale, il s'agit d'un [compte externe (EOA)](#eoa) ou d'un [compte de contrat](#contract-accouint) qui peut recevoir (adresse de destination) ou envoyer (adresse source) des [transactions](#transaction) sur la blockchain. Plus spécifiquement, il s'agit des 160 bits de droite de l'[empreinte numérique Keccak](#keccak-256) d'une [clé publique](#public-key) [ECDSA](#ecdsa).

### Interface binaire d'application (ABI) {#abi}

Façon standardisée d'interagir avec les [contrats](#contract-account) dans l'écosystème Ethereum, que ce soit depuis l'extérieur de la blockchain ou pour les interactions de contrat à contrat.

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### Interface de programmation d'application {#api}

Une interface de programmation d'application (API) est un ensemble de définitions permettant d'utiliser un logiciel. Une API se situe entre une application et un serveur web et facilite le transfert de données entre eux.

### Assert {#assert}

En [Solidity](#solidity), `assert(false)` est compilé en `0xfe`, un code d'opération (opcode) non valide qui utilise tout le [gaz](#gas) restant et annule toutes les modifications. Lorsqu'une déclaration `assert()` échoue, quelque chose ne fonctionne pas du tout comme prévu, et vous devez corriger votre code. Il est conseillé d'utiliser `assert()` pour éviter les conditions qui ne doivent jamais se produire.

<DocLink to="/developers/docs/smart-contracts/security/">
  Sécurité des contrats intelligents
</DocLink>

### Attestation {#attestation}

Il s'agit du vote d'un validateur pour un bloc de la [chaîne phare](#beacon-chain) ou un [bloc](#block) [de fragments](#shard). Les validateurs doivent attester de la conformité des blocs, signalant qu'ils sont d'accord avec l'état proposé par le bloc.

<Divider />

## B {#section-b}

### Frais de base {#base-fee}

Chaque [bloc](#block) a un prix de réserve connu sous le nom de « frais de base ». Il s'agit des frais minimum de [gaz](#gas) qu'un utilisateur doit payer pour inclure une transaction dans le bloc suivant.

<DocLink to="/developers/docs/gas/">
  Gaz et frais
</DocLink>

### Chaîne phare {#beacon-chain}

Une mise à niveau du réseau qui a introduit une nouvelle couche de consensus, ayant vocation à coordonner tout le réseau Ethereum. Elle introduit la [preuve d'enjeu](#pos) et [les validateurs](#validator) sur Ethereum. Elle sera ensuite fusionnée avec le [réseau principal](#mainnet).

<DocLink to="/upgrades/beacon-chain/">
  Chaîne phare
</DocLink>

### Big-endian {#big-endian}

Représentation de nombre positionnel où le chiffre le plus important est le premier en mémoire. Contraire du petit-boutisme (little-endian), où le chiffre le moins significatif arrive en premier.

### Bloc {#block}

Collection d'informations requises (en-tête de bloc) concernant les [transactions](#transaction) incluses, et ensemble d'autres en-têtes de blocs appelés « [oncles](#ommer) » (ou « ommers »). Les blocs sont ajoutés au réseau Ethereum par les [mineurs](#miner).

<DocLink to="/developers/docs/blocks/">
  Blocs
</DocLink>

### Blockchain {#blockchain}

Dans Ethereum, il s'agit d'une suite de [blocs](#block) validée par le système de [preuve de travail](#pow), chaque bloc étant relié à son prédécesseur jusqu'au [bloc d'origine](#genesis-block). Il n'existe pas de limite de taille de bloc. La blockchain utilise à la place différentes [limites de gaz](#gas-limit).

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Qu'est-ce qu'une blockchain ?
</DocLink>

### Bytecode {#bytecode}

Un ensemble d'instructions abstraites conçues pour être exécutées efficacement par un interpréteur logiciel ou une machine virtuelle. Contrairement au code source lisible par l'homme, le bytecode est exprimé sous forme numérique.

### Fourche Byzantium {#byzantium-fork}

La première des deux [fourches majeures](#hard-fork) de la phase de développement [Metropolis](#metropolis). Elle comprend le report de la [bombe de difficulté](#difficulty-bomb) de Metropolis et la réduction des récompenses de bloc de l'EIP 649, l'[Ice Age](#ice-age) ayant été retardé de 1 an et la récompense de bloc réduite de 5 à 3 ethers.

<Divider />

## C {#section-c}

### Point de contrôle {#checkpoint}

La [chaîne phare](#beacon-chain) est cadencée en créneaux (12 secondes) et en périodes (32 créneaux). Le premier créneau d'une période est un point de contrôle. Quand une [supermajorité](#supermajority) de validateurs atteste du lien entre deux points de contrôle, ils peuvent être [justifiés](#justification), puis, quand un autre point de contrôle est justifié pardessus, ils peuvent être [finalisés](#finality).

### Compiler {#compiling}

Traduire du code écrit dans un langage de programmation de haut niveau (par exemple, [Solidity](#solidity)) en un langage de plus bas niveau (par exemple, le [bytecode](#bytecode) de l'EVM).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Compiler des contrats intelligents
</DocLink>

### Comité {#committee}

Groupe d'au moins 128 [validateurs](#validator) assignés de façon aléatoire par la [chaîne phare](#beacon-chain) à ses blocs et à des blocs de fragments.

### Consensus {#consensus}

Lorsque de nombreux nœuds (généralement, la plupart des nœuds du réseau) ont tous les mêmes blocs dans leur meilleure blockchain validée localement. À ne pas confondre avec les [règles de consensus](#consensus-rules).

### Client de consensus {#consensus-client}

Les clients de consensus (tels que Prysm, Teku, Nimbus, Lighthouse et Lodestar) exécutent l'algorithme de consensus de [preuve d'enjeu](#pos) d'Ethereum permettant au réseau de parvenir à un accord sur la tête de la chaîne phare. Les clients de consensus ne participent pas à la validation/diffusion des transactions ou à l'exécution des transitions d'état. Ce sont les [clients d'exécution](#execution-client) qui s'en chargent.

### Couche de consensus {#consensus-layer}

La couche de consensus d'Ethereum est le réseau des [clients de consensus](#consensus-client).

### Règles de consensus {#consensus-rules}

Règles de validation de bloc que les nœuds complets appliquent pour maintenir un consensus avec les autres nœuds. À ne pas confondre avec le [consensus](#consensus).

### Fourche Constantinople {#constantinople-fork}

Seconde partie de la phase de développement [Metropolis](#metropolis), initialement prévue pour la mi-2018. Devait inclure le passage à un algorithme de consensus hybride [preuve de travail](#pow)/[preuve d'enjeu](#pos), entre autres.

### Compte de contrat {#contract-account}

Compte contenant du code qui s'exécute chaque fois qu'il reçoit une [transaction](#transaction) d'un autre [compte](#account) (qu'il s'agisse d'un [compte externe](#eoa) ou de [contrat](#contract-account)).

### Transaction de création de contrat {#contract-creation-transaction}

[Transaction](#transaction) spéciale, avec l'[adresse zéro](#zero-address) comme destinataire, utilisée pour enregistrer un [contrat](#contract-account) et le publier sur la blockchain Ethereum.

### Lien croisé {#crosslink}

Un lien croisé fournit un résumé de l'état d'un fragment. Il s'agit de la façon dont les chaînes de [fragments](#shard) communiqueront les unes avec les autres via la [chaîne phare](#beacon-chain) dans le système de [preuve d'enjeu](#proof-of-stake) fragmenté.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Preuve d'enjeu
</DocLink>

<Divider />

## D {#section-d}

### Organisation autonome décentralisée (DAO) {#dao}

Entreprise ou autre organisation fonctionnant sans gestion hiérarchique. DAO peut également faire référence à un contrat intitulé « The DAO » lancé le 30 avril 2016, qui a ensuite été piraté en juin 2016. Ceci a finalement motivé une [fourche majeure](#hard-fork) (nom de code DAO) au bloc 1 192 000, qui a inversé le contrat DAO piraté et a causé la division d'Ethereum et d'Ethereum Classic en deux systèmes concurrents.

<DocLink to="/dao/">
  Organisation autonome décentralisée (DAO)
</DocLink>

### DApp {#dapp}

Application décentralisée. Au minimum, il s'agit d'un [contrat intelligent](#smart-contract) et d'une interface utilisateur web. Plus généralement, une dApp est une application web construite sur des services d'infrastructure ouverts, décentralisés et en pair à pair (P2P). Par ailleurs, de nombreuses DApps incluent un stockage décentralisé, une plateforme et/ou un protocole de message.

<DocLink to="/developers/docs/dapps/">
  Introduction aux DApps
</DocLink>

### Plateforme d'échanges décentralisés (DEX) {#dex}

Type de [DApp](#dapp) qui vous permet d'échanger des jetons avec des pairs sur le réseau. Vous avez besoin d'[ethers](#ether) pour en utiliser une (pour payer les [frais de transaction](#transaction-fee)), mais elles ne sont soumises à aucune restriction géographique comme le sont les plateformes d'échanges centralisés ; n'importe qui peut participer.

<DocLink to="/get-eth/#dex">
  Échanges décentralisés
</DocLink>

### Deed {#deed}

Voir [jeton non fongible (NFT)](#nft)

### DeFi {#defi}

Abréviation de « Decentralized Finance » (finance décentralisée), une vaste catégorie de [dApps](#dapp) visant à fournir des services financiers à travers la blockchain, sans aucun intermédiaire et de sorte que toute personne avec une connexion Internet puisse participer.

<DocLink to="/defi/">
  Finance décentralisée (DeFi)
</DocLink>

### Difficulté {#difficulty}

Paramètre à l'échelle du réseau qui contrôle la quantité de calcul requise pour produire une [preuve de travail](#pow).

### Bombe de difficulté {#difficulty-bomb}

Augmentation exponentielle planifiée du paramètre de [difficulté](#difficulty) de la [preuve de travail](#pow). Elle a été conçue pour inciter à la transition vers la [preuve d'enjeu](#pos), réduisant les possibilités d'une [fourche](#hard-fork).

### Signature numérique {#digital-signatures}

Courte chaîne de données qu'un utilisateur produit pour un document en utilisant une [clé privée](#private-key) afin que quiconque ayant la [clé publique](#public-key) correspondante, la signature et le document puisse vérifier (1) que le document a bien été « signé » par le propriétaire de cette clé privée particulière et (2) que le document n'a pas été modifié après sa signature.

<Divider />

## E {#section-e}

### Algorithme de signature numérique à courbe elliptique (ECDSA) {#ecdsa}

Algorithme cryptographique utilisé par Ethereum pour garantir que les fonds ne peuvent être dépensés que par leurs propriétaires. C'est la méthode privilégiée pour créer des clés publiques et privées. Pertinent pour la génération des [adresses](#address) de compte et la vérification des [transactions](#transaction).

### Période {#epoch}

Intervalle de 32 [créneaux](#slot) (6,4 minutes) dans le système coordonné de la [chaîne phare](#beacon-chain). Les [comités](#committee) de [validateurs](#validator) sont remaniés lors de chaque période pour des raisons de sécurité. Chaque période représente une opportunité de [finaliser](#finality) la chaîne.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Preuve d'enjeu
</DocLink>

### Eth1 {#eth1}

« Eth1 » est un terme qui faisait référence au réseau principal Ethereum, c'est-à-dire la blockchain actuelle basée sur la preuve de travail. Ce terme a depuis été abandonné au profit de « couche d'exécution ». [En savoir plus sur ce changement de nom](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  En savoir plus sur les mises à niveau d'Ethereum
</DocLink>

### Eth2 {#eth2}

« Eth2 » est un terme qui faisait référence à un ensemble de mises à niveau du protocole Ethereum, notamment la transition d'Ethereum vers la preuve d'enjeu. Ce terme a depuis été abandonné au profit de « couche de consensus ». [En savoir plus sur ce changement de nom](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  En savoir plus sur les mises à niveau d'Ethereum
</DocLink>

### Proposition d'amélioration d'Ethereum (EIP) {#eip}

Document de conception visant à informer la communauté Ethereum qui décrit une nouvelle fonctionnalité proposée, ses processus ou son environnement (voir [ERC](#erc)).

<DocLink to="/eips/">
  Introduction aux EIP
</DocLink>

### Ethereum Name Service (ENS) {#ens}

Le registre ENS est un [contrat](#smart-contract) central unique qui fournit une correspondance entre des noms de domaine et des propriétaires et des résolveurs, comme décrit dans l'[EIP](#eip) 137.

[Plus d'infos sur ens.domains](https://ens.domains)

### Entropie {#entropy}

En cryptographie, l'entropie désigne le manque de prévisibilité ou le niveau d'aléa. Lorsqu'ils génèrent des informations secrètes, comme les [clés privées](#private-key), les algorithmes s'appuient généralement sur une source d'entropie élevée pour garantir un résultat imprévisible.

### Client d'exécution {#execution-client}

Les clients d'exécution (alias « clients Eth1 »), tels que Besu, Erigon, go-ethereum ou Nethermind, sont chargés du traitement et de la diffusion des transactions, ainsi que de la gestion de l'état d'Ethereum. Ils exécutent les calculs pour chaque transaction dans la [machine virtuelle Ethereum](#evm) pour s'assurer que les règles du protocole sont respectées. Aujourd'hui, ils gèrent également le consensus par [preuve de travail](#pow). Après la transition vers la [preuve d'enjeu](#pos), ils le délégueront aux clients de consensus.

### Couche d'exécution {#execution-layer}

La couche d'exécution d'Ethereum est le réseau des [clients d'exécution](#execution-client).

### Compte externe (EOA) {#eoa}

Un EOA (de l'anglais « externally owned account ») est un [compte](#account) créé par ou pour des utilisateurs humains du réseau Ethereum.

### Demande de commentaires Ethereum (ERC) {#erc}

Libellé donné à certaines [EIP](#eip) qui visent à définir une norme précise d'utilisation d'Ethereum.

<DocLink to="/eips/">
  Introduction aux EIP
</DocLink>

### Ethash {#ethash}

Algorithme de [preuve de travail](#pow) pour Ethereum 1.0.

[Plus d'infos sur eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### Ether {#ether}

Cryptomonnaie native utilisée par l'écosystème Ethereum, qui couvre les coûts de [gaz](#gas) lors de l'exécution des transactions. S'écrit également sous la forme ETH ou avec son symbole Ξ qui est le caractère grec Xi en majuscule.

<DocLink to="/eth/">
  La monnaie de notre avenir numérique
</DocLink>

### Événements {#events}

Permet d'utiliser les dispositifs de journalisation de l'[EVM](#evm). Les [dApps](#dapp) peuvent être à l'écoute des éventuels événements et les utiliser pour déclencher des rappels JavaScript dans l'interface utilisateur.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Événements et journaux
</DocLink>

### Machine virtuelle Ethereum (EVM) {#evm}

Machine virtuelle basée sur une pile, qui exécute du [bytecode](#bytecode). Dans Ethereum, le modèle d'exécution spécifie comment l'état du système est modifié en fonction d'une série d'instructions bytecode et d'un petit tuple de données environnementales. Ceci est spécifié via un modèle formel de machine d'état virtuelle.

<DocLink to="/developers/docs/evm/">
  Machine virtuelle Ethereum (EVM)
</DocLink>

### Langage d'assemblage de l'EVM {#evm-assembly-language}

Forme lisible par l'homme du [bytecode](#bytecode) de l'EVM.

<Divider />

## F {#section-f}

### Fonction de secours {#fallback-function}

Fonction par défaut appelée en l'absence de données ou d'un nom de fonction déclaré.

### Robinet {#faucet}

Service effectué via un [contrat intelligent](#smart-contract), qui distribue des fonds sous la forme d'ethers de test gratuits pouvant être utilisés sur un réseau de test.

<DocLink to="/developers/docs/networks/#testnet-faucets">
  Robinets de réseau de test
</DocLink>

### Finalisation {#finality}

La finalisation garantit qu'un ensemble de transactions réalisées avant un instant donné ne changera pas et ne pourra pas être annulé.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality">
  Finalité de la preuve de travail
</DocLink>
<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Finalisation de la preuve d'enjeu
</DocLink>

### Finney {#finney}

Unité de l'[ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### Fourche {#fork}

Changement de protocole causant la création d'une chaîne alternative ou divergence temporelle dans deux chemins de blocs potentiels pendant le minage.

### Algorithme de sélection de fourche {#fork-choice-algorithm}

L'algorithme utilisé pour identifier la tête de la chaîne phare. Sur la couche d'exécution, la tête de la chaîne est identifiée comme celle qui présente la plus grande difficulté totale. Cela signifie que la véritable tête de la chaîne est celle qui a nécessité le plus de travail pour être minée. Sur la couche de consensus, l'algorithme observe l'accumulation des attestations en provenance des validateurs ([LMD_GHOST](#lmd-ghost)).

### Preuve de fraude {#fraud-proof}

Un modèle de sécurité pour certaines solutions de [couche 2](#layer-2) où, pour gagner en rapidité, les transactions sont regroupées en lots ([rollups](#rollups)) et soumises sur Ethereum en une seule transaction. Les transactions sont supposées être valides, mais peuvent être contestées si un cas de fraude est suspecté. Une preuve de fraude exécutera alors la transaction pour vérifier l'existence d'une fraude. Cette méthode augmente le nombre de transactions possibles tout en maintenant le niveau de sécurité. Certains [rollups](#rollups) utilisent des [preuves de validité](#validity-proof).

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Rollups optimistes
</DocLink>

### Frontier {#frontier}

Phase initiale de développement à des fins de test d'Ethereum, qui a duré de juillet 2015 à mars 2016.

<Divider />

## G {#section-g}

### Gaz {#gas}

Carburant virtuel utilisé dans Ethereum pour exécuter les contrats intelligents. L'[EVM](#evm) utilise un mécanisme de comptabilité pour mesurer la consommation de gaz et limiter la consommation de ressources informatiques (voir [Turing complet](#turing-complete)).

<DocLink to="/developers/docs/gas/">
  Gaz et frais
</DocLink>

### Limite de gaz {#gas-limit}

Montant maximum de [gaz](#gas) qu'une transaction [](#transaction) ou qu'un [bloc](#block) peut consommer.

### Bloc d'origine {#genesis-block}

Premier bloc d'une [blockchain](#blockchain), utilisé pour initialiser un certain réseau et sa cryptomonnaie.

### Geth {#geth}

Version abrégée de « Go Ethereum ». L'une des implémentations les plus importantes du protocole Ethereum, programmée en Go.

[Plus d'infos sur geth.ethereum.org](https://geth.ethereum.org/)

### Gwei {#gwei}

Abréviation de Gigawei, une unité de l'[ether](#ether) couramment utilisée pour attribuer un prix au [gaz](#gas). 1 Gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> Gwei = 1 ether.

<Divider />

## H {#section-h}

### Fourche majeure {#hard-fork}

Divergence permanente dans la [blockchain](#blockchain), aussi appelée modification de fourche majeure. Cela se produit habituellement lorsque les nœuds non mis à niveau ne peuvent pas valider les blocs créés par les nœuds mis à niveau qui appliquent des [règles de consensus](#consensus-rules) plus récentes. À ne pas confondre avec une fourche, une fourche mineure, une fourche logicielle ou une fourche Git.

### Empreinte numérique {#hash}

Empreinte de longueur fixe d'entrées de taille variable, produite par une fonction de hachage. (Voir [keccak-256](#keccak-256))

### Portefeuille HD {#hd-wallet}

[Portefeuille](#wallet) utilisant le protocole de création et de transfert de clés déterministe hiérarchique (HD).

[Plus d'infos sur github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### Graine de portefeuille HD {#hd-wallet-seed}

Valeur utilisée pour générer la [clé privée](#private-key) maîtresse et le code de chaîne maître pour un [portefeuille](#wallet) HD. Il est possible de représenter la graine de portefeuille par des mots mnémoniques, ce qui facilite la copie, la sauvegarde et la restauration des clés privées pour les utilisateurs.

### Homestead {#homestead}

Deuxième phase de développement d'Ethereum, lancée en mars 2016 au bloc 1 150 000.

<Divider />

## I {#section-i}

### Index {#index}

Une structure réseau destinée à optimiser le requêtage d'informations à travers la [blockchain](#blockchain) en fournissant un chemin efficace vers sa source de stockage.

### Protocole d'échange d'adresses de clients (ICAP) {#icap}

Encodage d'adresse Ethereum partiellement compatible avec l'encodage du numéro de compte bancaire international (IBAN), offrant un encodage polyvalent, contrôlé et interopérable pour les adresses Ethereum. Les adresses ICAP utilisent un nouveau code de pseudo-pays IBAN - XE, ce qui signifie « eXtended Ethereum », comme utilisé dans les monnaies non juridictionnelles (par exemple, XBT, XRP, XCP).

### Ice Age {#ice-age}

[Fourche majeure](#hard-fork) d'Ethereum au bloc 200 000 pour introduire une augmentation exponentielle de la [difficulté](#difficulty) (aussi appelée [bombe de difficulté](#difficulty-bomb)), motivant une transition vers la [preuve d'enjeu](#pos).

### Environnement de développement intégré (IDE) {#ide}

Interface utilisateur qui combine généralement un éditeur de code, un compilateur, un environnement d'exécution et un débogueur.

<DocLink to="/developers/docs/ides/">
  Environnement de développement intégré (IDE)
</DocLink>

### Problème de code déployé immuable {#immutable-deployed-code-problem}

Une fois que le code d'un [contrat](#smart-contract) (ou celui d'une [bibliothèque](#library)) est déployé, il devient immuable. Les pratiques de développement de logiciels standard reposent sur la possibilité de corriger d'éventuels bogues et d'ajouter de nouvelles fonctionnalités. Cela représente donc un problème pour le développement de contrats intelligents.

<DocLink to="/developers/docs/smart-contracts/deploying/">
  Déployer des contrats intelligents
</DocLink>

### Transaction interne {#internal-transaction}

[Transaction](#transaction) envoyée depuis un [compte de contrat](#contract-account) vers un autre ou vers un [compte externe (EOA)](#eoa) (voir [message](#message)).

<Divider />

## K {#section-k}

### Fonction de dérivation de clé (KDF) {#kdf}

Aussi appelée « algorithme d'étirement de mot de passe », elle est utilisée par les formats [keystore](#keystore-file) pour protéger contre les attaques par force brute, par dictionnaire et de table arc-en-ciel sur le chiffrement des phrases de sécurité, en hachant celles-ci de façon répétée.

<DocLink to="/developers/docs/smart-contracts/security/">
  Sécurité des contrats intelligents
</DocLink>

### Keccak-256 {#keccak-256}

Fonction de hachage cryptographique ([empreinte numérique](#hash)) utilisée dans Ethereum. Keccak-256 a été standardisée comme [SHA](#sha)-3.

### Fichier keystore {#keystore-file}

Fichier encodé en JSON qui contient une seule [clé privée](#private-key) (générée aléatoirement), chiffré par une phrase secrète pour plus de sécurité.

<Divider />

## L {#section-l}

### Couche 2 {#layer-2}

Domaine de développement axé sur des améliorations de couches se situant au-dessus du protocole Ethereum. Ces améliorations sont liées aux vitesses de [transaction](#transaction), à la réduction des [frais de transaction](#transaction-fee) et à la confidentialité des transactions.

<DocLink to="/developers/docs/scaling/#layer-2-scaling">
  Couche 2
</DocLink>

### LevelDB {#level-db}

Système open source de stockage de clé-valeur sur disque, implémenté en tant que [bibliothèque](#library) légère dédiée, disponible sur de nombreuses plateformes.

### Bibliothèque {#library}

Type spécial de [contrat](#smart-contract) qui n'a ni fonction de paiement, ni fonction de secours, ni stockage de données. Par conséquent, une bibliothèque ne peut ni recevoir ni détenir d'ethers, ni stocker des données. Elle sert de code déployé au préalable que d'autres contrats peuvent appeler pour obtenir un calcul en lecture seule.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Bibliothèques de contrats intelligents
</DocLink>

### Client léger {#lightweight-client}

Client Ethereum qui ne stocke aucune copie locale de la [blockchain](#blockchain) ou qui ne valide aucun bloc ni aucune [transaction](#transaction). Il offre les fonctions d'un [portefeuille](#wallet), et peut créer et diffuser des transactions.

<Divider />

### LMD_GHOST {#lmd-ghost}

[L'algorithme de sélection de fourche](#fork-choice-algorithm) utilisé par les clients de consensus Ethereum pour identifier la tête de la chaîne. LMD-GHOST est le sigle de « dernier message produit - sous-arbre le plus lourd et gourmand observé » (Latest Message Driven Greediest Heaviest Observed SubTree), ce qui signifie que la tête de la chaîne est le bloc avec la plus grande accumulation d'[attestations](#attestation) dans son histoire.

## M {#section-m}

### Réseau principal {#mainnet}

Appelé « mainnet » en anglais (pour « main network »), il s'agit de la [blockchain](#blockchain) principale du réseau public Ethereum. De vrais ETH, une véritable valeur et des conséquences réelles. Également nommé « couche 1 » lors des discussions sur les solutions de mise à l'échelle de [couche 2](#layer-2). (Voir aussi [réseau de test](#testnet))

### L'arbre de Merkle Patricia {#merkle-patricia-tree}

Structure de données utilisée dans Ethereum pour stocker efficacement les paires clés-valeurs.

### Message {#message}

[Transaction interne](#internal-transaction) qui n'est jamais sérialisée et qui est uniquement envoyée dans l'[EVM](#evm).

### Appel de message {#message-call}

L'acte de passer un [message](#message) d'un compte à un autre. Si le compte de destination est associé au code de l'[EVM](#evm), alors celle-ci sera démarrée avec l'état de cet objet et le message sera traité.

### Metropolis {#metropolis}

La troisième phase de développement d'Ethereum, lancée en octobre 2017.

### Mineur {#miner}

[Nœud](#node) du réseau qui trouve une [preuve de travail](#pow) valide pour de nouveaux blocs, par passes de hachage successives (voir [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Minage
</DocLink>

### Frapper {#mint}

Le frappage est le processus de création de nouveaux jetons et de leur mise en circulation afin qu'ils puissent être utilisés. C'est un mécanisme décentralisé pour créer un nouveau jeton sans participation de l'autorité centrale.

<Divider />

## N {#section-n}

### Réseau {#network}

Lorsque cela fait référence au réseau Ethereum, réseau P2P qui propage les transactions et les blocs à chaque nœud Ethereum (participant au réseau).

<DocLink to="/developers/docs/networks/">
  Réseaux
</DocLink>

### Jeton non fongible (NFT) {#nft}

Aussi connu sous le nom de « deed », il s'agit d'une norme de jeton introduite par la proposition ERC-721. Les NFT peuvent être suivis et échangés, mais chaque jeton est unique et distinct. Ils ne sont pas interchangeables comme les [jetons ERC-20](#token-standard). Les NFT peuvent représenter la propriété des actifs numériques ou physiques.

<DocLink to="/nft/">
  Jeton non fongible (NFT)
</DocLink>
<DocLink to="/developers/docs/standards/tokens/erc-721/">
  Norme de jeton non fongible ERC-721
</DocLink>

### Nœud {#node}

Client logiciel qui participe au réseau.

<DocLink to="/developers/docs/nodes-and-clients/">
  Nœuds et clients
</DocLink>

### Nonce {#nonce}

En cryptographie, valeur qui ne peut être utilisée qu'une seule fois. Il existe deux types de nonces dans Ethereum : le nonce de compte est un compteur de transactions présent dans chaque compte, qui est utilisé pour prévenir les attaques par rejeu ; et le nonce de [preuve de travail](#pow) est la valeur aléatoire utilisée dans un bloc pour satisfaire la [preuve de travail](#pow).

<Divider />

## O {#section-o}

### Bloc oncle (ommer) {#ommer}

Quand un [mineur](#miner) trouve un [bloc](#block) valide, un autre mineur peut avoir publié un bloc concurrent, qui est ajouté en premier au sommet de la blockchain. Ce bloc valide, mais obsolète, peut être inclus par des blocs plus récents en tant que _bloc oncle_ et recevoir une récompense partielle. On utilise parfois le terme « ommer », plus neutre, pour parler de fraternité d'un bloc parent.

### Rollup optimiste {#optimistic-rollup}

Un [rollup](#rollups) (ou regroupement) de transactions qui utilise les [preuves de fraude](#fraud-proof) pour permettre un débit de transactions plus élevé sur la [couche 2](#layer-2) tout en bénéficiant de la sécurité apportée par le [réseau principal](#mainnet) (couche 1). Contrairement à [Plasma](#plasma), une solution similaire sur la couche 2, les rollups optimistes peuvent gérer des transactions plus complexes, en fait tout ce qui est possible au sein de l'[EVM](#evm). Ils rencontrent des problèmes de latence par rapport aux [rollups ZK](#zk-rollups), car une transaction peut être contestée par l'intermédiaire de la preuve de fraude.

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Rollups optimistes
</DocLink>

### Oracle {#oracle}

Les oracles sont des ponts entre la [blockchain](#blockchain) et le monde réel. Ils agissent comme des [API](#api) sur la blockchain qui peuvent être interrogés pour des informations et utilisés dans des [contrats intelligents](#smart-contract).

<DocLink to="/developers/docs/oracles/">
  Oracles
</DocLink>

<Divider />

## P {#section-p}

### Parity {#parity}

Une des implémentations interopérables les plus importantes du logiciel client Ethereum.

### Plasma {#plasma}

Une solution de mise à l'échelle hors chaîne qui se sert de [preuves de fraude](#fraud-proof), comme des [rollups optimistes](#optimistic-rollups). Plasma se limite aux transactions simples comme les échanges et transferts de jetons de base.

<DocLink to="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### Clé privée (clé secrète) {#private-key}

Nombre secret qui permet aux utilisateurs Ethereum de prouver la propriété d'un compte ou de contrats en produisant une signature numérique (voir [clé publique](#public-key), [adresse](#address), [ECDSA](#ecdsa)).

### Preuve d'enjeu (PoS) {#pos}

Méthode par laquelle un protocole de blockchain de cryptomonnaie vise à atteindre un [consensus](#consensus) distribué. La PoS demande aux utilisateurs de prouver qu'ils sont propriétaires d'une certaine quantité de cryptomonnaie (leur « mise » sur le réseau) afin de pouvoir participer à la validation des transactions.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Preuve d'enjeu
</DocLink>

### Preuve de travail (PoW) {#pow}

Portion de données (la preuve) qui nécessite des calculs significatifs pour être trouvée. Dans Ethereum, les [mineurs](#miner) doivent trouver une solution numérique à l'algorithme [Ethash](#ethash), qui répond à un objectif de [difficulté](#difficulty) à l'échelle du réseau.

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  Preuve de travail
</DocLink>

### Clé publique {#public-key}

Nombre dérivé depuis une [clé privée](#private-key) via une fonction à sens unique, qui peut être partagé publiquement et utilisé par n'importe qui pour vérifier une signature numérique créée avec la clé privée correspondante.

<Divider />

## R {#section-r}

### Reçu {#receipt}

Données renvoyées par un client Ethereum pour représenter le résultat d'une [transaction](#transaction) particulière, y compris une [empreinte numérique](#hash) de la transaction, son numéro de [bloc](#block), la quantité de [gaz](#gas) utilisée et, en cas de déploiement d'un [contrat intelligent](#smart-contract), l'[adresse](#address) du contrat.

### Attaque par réentrance {#re-entrancy-attack}

Attaque qui consiste en un contrat d'attaquant qui appelle une fonction du contrat de la victime de telle façon que, pendant l'exécution, la victime rappelle le contrat de l'attaquant de façon récursive. Par exemple, en ignorant certaines parties du contrat de la victime qui mettent à jour les soldes ou comptabilisent les montants de retrait, cela peut aboutir à un vol de fonds.

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  Réentrance
</DocLink>

### Récompense {#reward}

Quantité d'ethers inclus dans chaque nouveau bloc comme récompense du réseau au [mineur](#miner) qui a trouvé la solution de la [preuve de travail](#pow).

### Préfixe de longueur récursive (RLP) {#rlp}

Une norme d'encodage conçue par les développeurs Ethereum pour encoder et sérialiser des objets (structure de données) de complexité et de longueur arbitraires.

### Rollups {#rollups}

Type de solution d'évolutivité de [couche 2](#layer-2) qui regroupe plusieurs transactions et les soumet à la [chaîne principale Ethereum](#mainnet) en une seule transaction. Cela permet de réduire les frais de [gaz](#gas) et d'augmenter le débit des [transactions](#transaction). Il existe des rollups optimistes et des rollups ZK qui utilisent différentes méthodes de sécurité pour offrir ces avantages d'évolutivité.

<DocLink to="/developers/docs/scaling/#rollups">
  Rollups
</DocLink>

<Divider />

## S {#section-s}

### Serenity {#serenity}

L'étape du développement d'Ethereum qui a initié un ensemble de mises à l'échelle et de mises à jour de durabilité, précédemment appelée « Ethereum 2.0 », ou « Eth2 ».

<DocLink to="/upgrades/">
  Mises à niveau d'Ethereum
</DocLink>

### Algorithme de hachage sécurisé (SHA) {#sha}

Famille de fonctions de hachage cryptographique publiées par le National Institute of Standards and Technology (NIST) aux États-Unis.

### Fragment/chaîne de fragments {#shard}

Une chaîne par [preuve d'enjeu](#pos) coordonnée par la [chaîne phare](#beacon-chain) et sécurisée par les [validateurs](#validator). 64 ajouts au réseau seront réalisés dans le cadre de la mise à niveau des chaînes de fragments. Les chaînes de fragments offriront un débit de transaction accru pour Ethereum en fournissant des données supplémentaires aux solutions de [couche 2](#layer-2) comme les [rollups optimistes](#optimistic-rollups) et les [rollups ZK](#zk-rollups).

<DocLink to="/upgrades/sharding">
  Chaînes de fragments
</DocLink>

### Chaînes latérales {#sidechain}

Solution d'évolutivité qui utilise une chaîne séparée avec des [règles de consensus](#consensus-rules) différentes et souvent plus rapides. Un pont est nécessaire pour connecter ces chaînes latérales au [réseau principal](#mainnet). Les [rollups](#rollups) utilisent également les chaînes latérales, mais ils fonctionnent en collaboration avec le [réseau principal](#mainnet) à la place.

<DocLink to="/developers/docs/scaling/sidechains/">
  Chaînes latérales
</DocLink>

### Singleton {#singleton}

Terme de programmation informatique qui décrit un objet dont il ne peut exister qu'une seule instance.

### Créneau {#slot}

Période de temps (12 secondes) pour laquelle un nouveau bloc de [chaîne phare](#beacon-chain) et de [chaîne de fragments](#shard) peuvent être proposés par un [validateur](#validator) dans le système de [preuve d'enjeu](#pos). Un créneau peut être vide. 32 créneaux forment une [période](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Preuve d'enjeu
</DocLink>

### Contrat intelligent {#smart-contract}

Programme qui s'exécute sur l'infrastructure de calcul Ethereum.

<DocLink to="/developers/docs/smart-contracts/">
  Introduction aux contrats intelligents
</DocLink>

### SNARK {#snark}

Acronyme pour « argument de connaissance succinct et non interactif » (Succint Non-interactive ARgument of Knowledge), un SNARK est un type de [preuve de connaissance zéro](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollups ZK
</DocLink>

### Solidity {#solidity}

Langage de programmation procédural (impératif) dont la syntaxe est similaire à JavaScript, C++ ou Java. Il s'agit du langage le plus populaire et le plus fréquemment utilisé pour les [contrats intelligents](#smart-contract) Ethereum. Il a été créé par Dr Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Assemblage en ligne Solidity {#solidity-inline-assembly}

Langage d'assemblage de l'[EVM](#evm) dans un programme [Solidity](#solidity). La prise en charge de Solidity pour l'assemblage en ligne facilite l'écriture de certaines opérations.

### Spurious Dragon {#spurious-dragon}

[Fourche majeure](#hard-fork) de la blockchain Ethereum, qui s'est produite au bloc 2 675 000 pour traiter plus de vecteurs d'attaque par déni de service et pour effacer l'état (voir [Tangerine Whistle](#tangerine-whistle)). Également un mécanisme de protection contre les attaques par rejeu (voir [nonce](#nonce)).

### Stablecoin {#stablecoin}

[Jeton ERC-20](#token-standard) dont la valeur est liée à celle d'un autre actif. Il existe des stablecoins liés à des monnaies fiduciaires comme le dollar, des métaux précieux comme l'or et d'autres cryptomonnaies comme le Bitcoin.

<DocLink to="/eth/#tokens">
  ETH n'est pas la seule crypto sur Ethereum
</DocLink>

### Mettre en jeu {#staking}

Déposer une quantité d'[ethers](#ether) (votre mise) pour devenir validateur et sécuriser le [réseau](#network). Un validateur vérifie les [transactions](#transaction) et propose des [blocs](#block) sous un modèle de consensus de [preuve d'enjeu](#pos). La mise en jeu vous incite économiquement à agir dans le meilleur intérêt du réseau. Vous obtiendrez des récompenses pour avoir mené à bien vos tâches de [validateur](#validator), mais perdrez diverses quantités d'ETH dans le cas contraire.

<DocLink to="/staking/">
  Mettez en jeu votre ETH pour devenir un validateur Ethereum
</DocLink>

### STARK {#stark}

Acronyme de « argument de connaissance transparent et évolutif » (Scalable Transparent Argument of Knowledge), un STARK est un type de [preuve de connaissance zéro](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollups ZK
</DocLink>

### Canaux d'état {#state-channels}

Solution de [couche 2](#layer-2) qui implique la mise en place d'un canal entre les participants pour qu'ils puissent effectuer des transactions librement et à moindre coût. Seule une [transaction](#transaction) est envoyée au [réseau principal](#mainnet) pour configurer et fermer le canal. Cela permet un débit de transaction très élevé, mais repose sur la connaissance du nombre de participants au départ et le blocage de fonds.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  Canaux d'état
</DocLink>

### Supermajorité {#supermajority}

La supermajorité est le terme désignant une quantité supérieure à 2/3 (66 %) de l'ether total mis en jeu sur la [chaîne phare](#beacon-chain). Un vote de la supermajorité est nécessaire pour que les blocs soient [finalisés](#finality) sur la chaîne phare.

### Comité de synchronisation {#sync-committee}

Un comité de synchronisation est un groupe de [validateurs](#validator) sélectionnés de manière aléatoire sur la [chaîne phare](#beacon-chain) et qui est actualisé toutes les 27 heures environ. Leur rôle est d'ajouter leurs signatures à des en-têtes de blocs valides. Les comités de synchronisation permettent aux [clients légers](#lightweight-client) de garder une trace de la tête de la blockchain sans avoir à accéder à l'ensemble des validateurs.

### Szabo {#szabo}

Unité de l'[ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

[Fourche majeure](#hard-fork) de la blockchain Ethereum, qui s'est produite au bloc 2 463 000 pour modifier le calcul du [gaz](#gas) pour certaines opérations intensives en E/S et pour effacer l'état accumulé d'une attaque par déni de service, qui exploitait le faible coût en gaz de ces opérations.

### Réseau de test {#testnet}

Aussi appelé « testnet » (de l'anglais « test network »), il s'agit d'un réseau utilisé pour simuler le comportement du réseau principal Ethereum (voir [réseau principal](#mainnet)).

<DocLink to="/developers/docs/networks/#testnets">
  Réseaux de test
</DocLink>

### Norme de jeton {#token-standard}

Introduite par la proposition ERC-20, elle fournit une structure de [contrat intelligent](#smart-contract) standardisée pour les jetons fongibles. Les jetons d'un même contrat peuvent être suivis, négociés, et sont interchangeables, contrairement aux [NFT](#nft).

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  Norme de jeton ERC-20
</DocLink>

### Transaction {#transaction}

Données enregistrées dans la blockchain Ethereum signées par un [compte](#account) émetteur, ciblant une [adresse](#address) spécifique. La transaction contient des métadonnées comme sa [limite de gaz](#gas-limit).

<DocLink to="/developers/docs/transactions/">
  Transactions
</DocLink>

### Frais de transaction {#transaction-fee}

Frais dont il faut s'acquitter à chaque utilisation du réseau Ethereum, comme l'envoi de fonds depuis votre [portefeuille](#wallet) ou l'interaction avec une [DApp](#dapp) (échange de jetons ou achat d'un objet de collection, par ex.). Considérez-les comme des frais de service. Ils évolueront en fonction de l'occupation du réseau. Ceci est dû au fait que les [mineurs](#miner) (les utilisateurs responsables du traitement de votre transaction) sont susceptibles de donner la priorité aux transactions dont les frais sont plus élevés. La congestion du réseau force donc la hausse des prix.

Au niveau technique, vos frais de transaction se rapportent à la quantité de [gaz](#gas) requise par votre transaction.

La réduction des frais de transaction est actuellement un sujet qui suscite un vif intérêt. Voir [couche 2](#layer-2)

### Turing-complet {#turing-complete}

Concept nommé d'après le mathématicien et informaticien anglais Alan Turing. Un système de règles de manipulation de données (comme l'ensemble d'instructions d'un ordinateur, un langage de programmation ou un automate cellulaire) est « Turing-complet » ou « universel sur le plan informatique » s'il peut être utilisé pour simuler n'importe quelle machine Turing.

<Divider />

## V {#section-v}

### Validateur {#validator}

Dans un système de [preuve d'enjeu](#pos), [nœud](#node) responsable du stockage des données, du traitement des transactions et de l'ajout de nouveaux blocs à la blockchain. Pour activer le logiciel validateur, vous devez pouvoir [mettre en jeu](#staking) 32 ETH.

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  preuve d'enjeu
</DocLink>
<DocLink to="/staking/">
  Mise en jeu sur Ethereum
</DocLink>

### Preuve de validité {#validity-proof}

Modèle de sécurité pour certaines solutions de [couche 2](#layer-2) dans lequel, pour augmenter la vitesse, les transactions sont regroupées en lots ([rollups](/#rollups)) et soumises à Ethereum en une seule transaction. Le calcul des transactions se fait hors chaîne et est ensuite fourni à la chaîne principale avec une preuve de leur validité. Cette méthode augmente le nombre de transactions possibles tout en maintenant le niveau de sécurité. Certains [rollups](#rollups) utilisent des [preuves de fraude](#fraud-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollups ZK
</DocLink>

### Validium {#validium}

Une solution hors chaîne qui utilise les [preuves de validité](#validity-proof) pour augmenter le débit des transactions. Contrairement à celles des [rollups ZK](#zk-rollup), les données de Validium ne sont pas stockées sur la couche 1 du [réseau principal](#mainnet).

<DocLink to="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Langage de programmation de haut niveau dont la syntaxe est similaire à celle de Python. Conçu pour se rapprocher d'un langage purement fonctionnel. Créé par Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### Portefeuille {#wallet}

Logiciel qui conserve des [clés privées](#private-key). Il est utilisé pour accéder aux [comptes](#account) Ethereum et les contrôler, et pour interagir avec les [contrats intelligents](#smart-contract). Les clés ne doivent pas nécessairement être stockées dans un portefeuille. Elles peuvent être récupérées depuis un stockage hors ligne (une carte mémoire ou une feuille papier) pour plus de sécurité. Malgré leur nom, les portefeuilles ne stockent jamais la monnaie ni les jetons en eux-mêmes.

<DocLink to="/wallets/">
  Portefeuilles Ethereum
</DocLink>

### Web3 {#web3}

Troisième version du web. D'abord proposé par le Dr Gavin Wood, Web3 représente une nouvelle vision et une nouvelle orientation pour les applications web : des applications gérées et possédées de façon centralisée aux applications construites sur des protocoles décentralisés (voir [dApp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 vs Web3
</DocLink>

### Wei {#wei}

Plus petite unité de l'[ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### Adresse zéro {#zero-address}

Adresse Ethereum spéciale, composée entièrement de zéros et spécifiée comme adresse de destination d'une [transaction de création de contrat](#contract-creation-transaction).

### Preuve de connaissance zéro {#zk-proof}

Une preuve de connaissance zéro (zero-knowledge proof) est une méthode cryptographique qui permet à un individu de prouver qu'une déclaration est vraie sans transmettre aucune information supplémentaire.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollups ZK
</DocLink>

### Rollup ZK {#zk-rollup}

[Rollup](#rollups) (ou regroupement) de transactions utilisant des [preuves de validité](#validity-proof) pour permettre un débit plus élevé de transactions sur la [couche 2](#layer-2), tout en bénéficiant de la sécurité offerte par le [réseau principal](#mainnet) (couche 1). Bien qu'ils ne puissent pas prendre en charge des types de transactions complexes comme le font les [rollups optimistes](#optimistic-rollups), les rollups ZK n'ont pas de problème de latence dans la mesure où les transactions sont prouvées valides à la soumission.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollups ZK
</DocLink>

<Divider />

## Sources {#sources}

_Issu en partie de [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) (Maîtriser Ethereum) par [Andreas M. Antonopoulos et Gavin Wood](https://ethereumbook.info), sous licence CC-BY-SA_

<Divider />

## Contribuer à cette page {#contribute-to-this-page}

Quelque chose manque ? Vous avez vu quelque chose d'incorrect ? Aidez-nous à améliorer cette page en contribuant à ce glossaire sur GitHub !

[En savoir plus sur la façon de contribuer](/contributing/adding-glossary-terms)
