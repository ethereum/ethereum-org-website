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
  Comptes Ethereum
</DocLink>

### Adresse {#address}

De manière générale, il s'agit d'un [compte externe (EOA)](#eoa) ou d'un [compte de contrat](#contract-account) qui peut recevoir (adresse de destination) ou envoyer (adresse source) des [transactions](#transaction) sur la blockchain. Plus spécifiquement, il s'agit des 160 bits de droite de l'[empreinte numérique Keccak](#keccak-256) d'une [clé publique](#public-key) [ECDSA](#ecdsa).

### Interface binaire d'application (ABI) {#abi}

Façon standardisée d'interagir avec les [contrats](#contract-account) dans l'écosystème Ethereum, que ce soit depuis l'extérieur de la blockchain ou pour les interactions de contrat à contrat.

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### Interface de programmation d'application {#api}

Une interface de programmation d'application (API) est un ensemble de définitions permettant d'utiliser un logiciel. Une API se situe entre une application et un serveur web et facilite le transfert de données entre eux.

### ASIC {#asic}

Circuit intégré spécifique à l’application. Ceci fait généralement référence à un circuit intégré, personnalisé pour le minage de cryptomonnaie.

### Assert {#assert}

Dans [Solidity](#solidity), `assert(false)` compile en `0xfe`, un code d'opération (opcode) non valide, qui utilise tout le [carburant](#gas) restant et annule toutes les modifications. Lorsqu'une déclaration `assert()` échoue, quelque chose ne fonctionne pas du tout comme prévu, et vous devez corriger votre code. Il est conseillé d'utiliser `assert()` pour éviter les conditions qui ne doivent jamais se produire.

<DocLink to="/developers/docs/smart-contracts/security/">
  Sécurité des contrats intelligents
</DocLink>

### Attestation {#attestation}

Un validateur vote pour un [bloc](#block). Les validateurs doivent attester de la conformité des blocs, signalant qu'ils sont d'accord avec l'état proposé par le bloc.

<DocLink to="/developers/docs/consensus-mechanisms/pos/attestations/">
  Attestations
</DocLink>

<Divider />

## B {#section-b}

### Frais de base {#base-fee}

Chaque [bloc](#block) a un prix de réserve connu sous le nom de « frais de base ». Il s'agit des frais minimum de [gaz](#gas) qu'un utilisateur doit payer pour inclure une transaction dans le bloc suivant.

<DocLink to="/developers/docs/gas/">
  Gaz et frais
</DocLink>

### Chaîne phare {#beacon-chain}

La chaîne phare a été la blockchain qui a introduit la [preuve d'enjeu](#pos) et [les validateurs](#validator) sur Ethereum. Elle fonctionnait en parallèle du réseau principal par preuve de travail Ethereum depuis novembre 2020 jusqu'à ce que les deux chaînes soient fusionnées en septembre 2022 pour former l'Ethereum d'aujourd'hui.

<DocLink to="/upgrades/beacon-chain/">
  Chaîne phare
</DocLink>

### Gros-boutiste {#big-endian}

Représentation de nombre positionnel où le chiffre le plus important est le premier en mémoire. Contraire du petit-boutisme (little-endian), où le chiffre le moins significatif arrive en premier.

### Bloc {#block}

Un bloc est une unité d'information créée par un déposant de bloc [](#block-proposer) et envoyée à d'autres nœuds sur le réseau peer-to-peer. Les blocs incluent des listes de transactions à exécuter et une information liée au consensus qui permettent aux [validateurs](#validator) de vérifier si l'information contenue dans le bloc est valide. Cela permet aux nœuds de mettre à jour leur vue de l'état d'Ethereum.

<DocLink to="/developers/docs/blocks/">
  Les blocs
</DocLink>

### Explorateur de bloc {#block-explorer}

Une interface qui permet à un utilisateur de rechercher des informations depuis et à propos d'une blockchain. Cela inclut la récupération des transactions individuelles, l'activité associée à des adresses spécifiques et des informations sur le réseau.

### En-têtes de bloc {#block-header}

L'en-tête de bloc est une collection de métadonnées à propos d'un bloc et un résumé des transactions incluses dans le bloc d'exécution.

### Propagation de bloc {#block-propagation}

Le procédé de transmission de la confirmation d'un bloc à tous les autres nœuds au sein du réseau.

### Proposant de bloc {#block-proposer}

Le validateur spécifique choisi pour créer un bloc dans un [créneau](#slot) particulier.

### Récompense du bloc {#block-reward}

C'est le total d'ether reversé au mineur ayant validé le bloc.

### Statut du bloc {#block-status}

Les états dans lesquels un bloc peut exister. Quelques états possibles sont :

- proposé : le bloc a été proposé par un validateur
- programmé : les validateurs soumettent actuellement des données
- manqué/ignoré : le proposant n'a pas proposé de bloc dans le laps de temps éligible.
- orphelin : le bloc a été réorganisé par le mécanisme de choix de fourche

### Durée de bloc {#block-time}

L'intervalle de temps entre les blocs ajoutés à la blockchain.

### Validation de bloc {#block-validation}

Le processus de vérification qu'un nouveau bloc contient des transactions valides et qu'il s'appuie sur la chaîne historique la plus lourde.

### Blockchain {#blockchain}

Une séquence de [blocs](#block), où chacun est relié à son prédécesseur jusqu'au [bloc d'origine](#genesis-block). L'intégrité de la blockchain est crypto-économiquement sécurisée à l'aide d'un mécanisme de consensus basé sur la preuve d'enjeu.

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Qu'est-ce qu'une blockchain ?
</DocLink>

### Nœud d'amorçage {#bootnode}

Les nœuds qui peuvent être utilisés pour initier le processus Discovery lors de l'exécution d'un nœud. Les adresses de ces nœuds sont enregistrés dans le code source d'Ethereum.

### Bytecode {#bytecode}

Un ensemble d'instructions abstraites conçues pour être exécutées efficacement par un interpréteur logiciel ou une machine virtuelle. Contrairement au code source lisible par l'homme, le bytecode est exprimé sous forme numérique.

### Fourche Byzantium {#byzantium-fork}

La première des deux [fourches majeures](#hard-fork) de la phase de développement [Metropolis](#metropolis). Elle comprend le report de la [bombe de difficulté](#difficulty-bomb) de Metropolis et la réduction des récompenses de bloc de l'EIP 649, l'[Ice Age](#ice-age) ayant été retardé de 1 an et la récompense de bloc réduite de 5 à 3 ethers.

<Divider />

## C {#section-c}

### Casper-FFG {#casper-ffg}

Casper-FFG est un protocole de consensus par preuve d'enjeu utilisé en conjonction avec l'algorithme de choix de fourche [LMD-GHOST](#lmd-ghost) pour permettre à [des clients de consensus](#consensus-client) de s'entendre sur la tête de la chaîne phare.

### Point de contrôle {#checkpoint}

La [chaîne phare](#beacon-chain) est cadencée en créneaux (12 secondes) et en périodes (32 créneaux). Le premier créneau d'une période est un point de contrôle. Quand une [supermajorité](#supermajority) de validateurs atteste du lien entre deux points de contrôle, ils peuvent être [justifiés](#justification), puis, quand un autre point de contrôle est justifié en sus, ils peuvent être [finalisés](#finality).

### Compiler {#compiling}

Traduire du code écrit dans un langage de programmation de haut niveau (par exemple, [Solidity](#solidity)) en un langage de plus bas niveau (par exemple, le [bytecode](#bytecode) de l'EVM).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Compiler des contrats intelligents
</DocLink>

### Comité {#committee}

Un groupe d’au moins 128 [validateurs](#validator) ayant la charge de valider des blocs dans chaque créneau. L'un des validateurs au sein du comité est l'agrégateur, responsable de l'agrégation des signatures de tous les autres validateurs au sein du comité qui s'accordent sur une attestation.

### Infaisabilité informatique {#computational-infeasibility}

Un processus est infaisable du point de vue informatique s'il faut un temps trop long en pratique (par ex. des milliards d'années) à le faire pour quiconque pourrait avoir un intérêt à le réaliser.

### Consensus {#consensus}

Lorsqu'une supermajorité de nœuds du réseau ont tous les mêmes blocs dans leur meilleure blockchain validée localement. À ne pas confondre avec les [règles de consensus](#consensus-rules).

### Client de consensus {#consensus-client}

Les clients de consensus (tels que Prysm, Teku, Nimbus, Lighthouse et Lodestar) exécutent l'algorithme de consensus de [preuve d'enjeu](#pos) d'Ethereum permettant au réseau de parvenir à un accord sur la tête de la chaîne phare. Les clients de consensus ne participent pas à la validation/diffusion des transactions ou à l'exécution des transitions d'état. Ce sont les [clients d'exécution](#execution-client) qui s'en chargent.

### Couche de consensus {#consensus-layer}

La couche de consensus d'Ethereum est le réseau des [clients de consensus](#consensus-client).

### Règles de consensus {#consensus-rules}

Règles de validation de bloc que les nœuds complets appliquent pour maintenir un consensus avec les autres nœuds. À ne pas confondre avec le [consensus](#consensus).

### Fourche Constantinople {#constantinople-fork}

Seconde partie de la phase [Metropolis](#metropolis), initialement prévue pour la mi-2018. Devait inclure le passage à un algorithme de consensus hybride [preuve de travail](#pow)/[preuve d'enjeu](#pos), entre autres.

### Compte de contrat {#contract-account}

Compte contenant du code qui s'exécute chaque fois qu'il reçoit une [transaction](#transaction) d'un autre [compte](#account) (qu'il s'agisse d'un [compte externe](#eoa) ou d'un [contrat](#contract-account)).

### Transaction de création de contrat {#contract-creation-transaction}

Une [Transaction](#transaction) spéciale, avec l'[adresse zéro](#zero-address) comme destinataire, utilisée pour enregistrer un [contrat](#contract-account) et le publier sur la blockchain Ethereum.

### cryptoéconomies {#cryptoeconomics}

L'économie des cryptomonnaies.

## D {#section-d}

### Đ {#D-with-stroke}

Đ (D barré) est utilisé en ancien anglais, anglais moyen, en islandais et féroïen pour représenter la lettre majuscule « Eth ». Il est utilisé dans les mots comme ĐEV ou Đapp (application décentralisée), où le Đ est la lettre nordique « eth ». L'eth majuscule (Ð) est aussi utilisé pour symboliser la cryptomonnaie Dogecoin. On la trouve souvent dans la littérature plus ancienne sur Ethereum mais elle est moins utilisée aujourd'hui.

### DAG {#DAG}

DAG signifie Graphe Acyclique Dirigé (Directed Acyclic Graph). Il s'agit d'une structure de données composées de nœuds et de liens entre eux. Ethereum utilise un DAG dans son algorithme de [preuve de travail](#proof-of-work), [Ethash](#ethash).

### DApp {#dapp}

Application décentralisée. Au minimum, il s'agit d'un [contrat intelligent](#smart-contract) et d'une interface utilisateur Web. Plus généralement, une dApp est une application web qui est construite sur des services d'infrastructure de pair à pair, décentralisés et ouverts. Par ailleurs, de nombreuses dApps incluent un stockage décentralisé et/ou un protocole et une plateforme de messages.

<DocLink to="/developers/docs/dapps/">
  Introduction aux dApps
</DocLink>

### Disponibilité des données {#data-availability}

Propriété permettant à tout noeud connecté au réseau de télécharger n'importe quelle portion de l'état qu'il souhaite.

### Décentralisation {#decentralization}

Concept visant à déplacer le contrôle et l'exécution des processus en dehors d'une entité centrale.

### Organisation autonome décentralisée (DAO) {#dao}

Entreprise ou autre organisation fonctionnant sans gestion hiérarchique. DAO peut également faire référence à un contrat intitulé « The DAO » lancé le 30 avril 2016, qui a ensuite été piraté en juin 2016. Ceci a finalement motivé une [fourche majeure](#hard-fork) (nom de code DAO) au bloc 1 192 000, qui a inversé le contrat DAO piraté et a causé la division d'Ethereum et d'Ethereum Classic en deux systèmes concurrents.

<DocLink to="/dao/">
  Organisations autonomes décentralisées (DAO)
</DocLink>

### Plateforme d'échanges décentralisés (DEX) {#dex}

Type de [DApp](#dapp) qui vous permet d'échanger des jetons avec des pairs sur le réseau. Vous avez besoin d'[Ether](#ether) pour en utiliser un (pour payer les [frais de transaction](#transaction-fee)), mais ils ne sont soumis à aucune restriction géographique comme les échanges centralisés. N'importe qui peut participer.

<DocLink to="/get-eth/#dex">
  Échanges décentralisés
</DocLink>

### Deed {#deed}

Voir [jeton non fongible (NFT)](#nft)

### Contrat de dépôt {#deposit-contract}

La passerelle pour la mise en jeu sur Ethereum. Le contrat de dépôt est un contrat intelligent sur Ethereum qui accepte les dépôts d'ETH et gère les soldes de validateur. Un validateur ne peut pas être activé sans le dépôt d'ETH dans ce contrat. Le contrat requiert des ETH et des données sur les intrants. Ces données d'entrée incluent la clé publique du validateur et la clé publique de retrait, signée par la clé privée du validateur. Ces données sont nécessaires pour qu'un validateur soit identifié et approuvé par le réseau de [preuve d'enjeu](#pos).

### DeFi {#defi}

Abréviation de « Decentralized Finance » (finance décentralisée), une vaste catégorie de [dApps](#dapp) visant à fournir des services financiers à travers la blockchain, sans aucun intermédiaire et de sorte que toute personne ayant une connexion Internet puisse participer.

<DocLink to="/defi/">
  Finance décentralisée (DeFi)
</DocLink>

### Difficulté {#difficulty}

Paramètre à l'échelle du réseau qui contrôle la quantité de calcul requise pour produire un nonce valide dans les réseaux à [preuve de travail](#pow).

### Bombe de difficulté {#difficulty-bomb}

Augmentation exponentielle planifiée du paramètre de [difficulté](#difficulty) de la [preuve de travail](#pow) qui a été conçue pour inciter à la transition vers la [preuve d'enjeu](#pos), réduisant les possibilités d'une [fourche](#hard-fork). La bombe de difficulté a été retirée à [La Fusion](/upgrades/merge/).

### Signature numérique {#digital-signatures}

Courte chaîne de données qu'un utilisateur produit pour un document en utilisant une [clé privée](#private-key) afin que quiconque ayant la [clé publique](#public-key) correspondante, la signature et le document puisse vérifier (1) que le document a bien été « signé » par le propriétaire de cette clé privée particulière et (2) que le document n'a pas été modifié après sa signature.

<Divider />

### Discovery {#discovery}

Le procédé au cours duquel un noeud du réseau Ethereum trouve d'autres nœuds auxquels se connecter.

### Table d'empreintes numériques distribuée (DHT) {#distributed-hash-table}

C'est une structure de données contenant des pairs `(key, value)`, utilisée par les nœuds du réseau Ethereum afin d'identifier les pairs auxquels se connecter et déterminer les protocoles qui seront utilisés sur cette communication.

### Double dépense {#double-spend}

Une fourche délibérée de la blockchain, où un utilisateur avec une quantité suffisamment importante de puissance de minage/mise envoie une transaction déplaçant une monnaie hors chaîne (ex. en le convertissant en argent fiduciaire ou en faisant un achat hors chaîne) puis réorganise la blockchain pour supprimer cette transaction. Une double dépense réussie laisse à l'attaquant ses actifs sur et hors chaîne.

## E {#section-e}

### Algorithme de signature numérique à courbe elliptique (ECDSA) {#ecdsa}

Algorithme cryptographique utilisé par Ethereum pour garantir que les fonds ne peuvent être dépensés que par leurs propriétaires. C'est la méthode privilégiée pour créer des clés publiques et privées. Pertinent pour la génération [d'adresse](#address) de compte et la vérification de la [transaction](#transaction).

### Cryptage {#encryption}

Le cryptage de données est la conversion électronique en une forme illisible exceptée par le détenteur de la clé correspondante de décryptage.

### Entropie {#entropy}

En cryptographie, l'entropie désigne le manque de prévisibilité ou le niveau d'aléa. Lorsqu'ils génèrent des informations secrètes, comme les [clés privées](#private-key), les algorithmes s'appuient généralement sur une source d'entropie élevée pour garantir un résultat imprévisible.

### Période {#epoch}

Une période de 32 [créneaux](#slot) (6,4 minutes). Les [comités](#committee) de [validateurs](#validator) sont remaniés lors de chaque période pour des raisons de sécurité. Chaque période représente une opportunité de [finaliser](#finality) la chaîne.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Preuve d'enjeu
</DocLink>

### Equivocation (Ambiguïté) {#equivocation}

L'envoi par un validateur de deux messages contradictoires. Un exemple simple pourrait résider dans l'envoi de deux transactions différentes avec les mêmes références. Un autre exemple pourrait consister en la proposition de deux blocs pour le même emplacement (ou pour le même créneau).

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

Document de conception qui fournit des informations à la communauté Ethereum, décrivant une nouvelle fonctionnalité proposée, ses processus ou environnements (voir [ERC](#erc)).

<DocLink to="/eips/">
  Introduction aux EIP
</DocLink>

### Ethereum Name Service (ENS) {#ens}

Le registre ENS est un [contrat](#smart-contract) unique qui fournit un mappage des noms de domaine aux propriétaires et aux résolveurs, comme décrit dans l'[EIP](#eip) 137.

[Plus d'infos sur ens.domains](https://ens.domains)

### Client d'exécution {#execution-client}

Les clients d'exécution (auparavant appelés « clients Eth1 »), tels que Besu, Erigon, go-ethereum ou Nethermind, sont chargés du traitement et de la diffusion des transactions, ainsi que de la gestion de l'état d'Ethereum. Ils exécutent les calculs pour chaque transaction dans la [machine virtuelle Ethereum](#evm) pour s'assurer que les règles du protocole sont respectées.

### Couche d'exécution {#execution-layer}

La couche d'exécution d'Ethereum est le réseau des [clients d'exécution](#execution-client).

### Compte externe (EOA) {#eoa}

Les comptes externes (EOA) sont des [comptes](#account) contrôlés par les utilisateurs qui contrôlent les [clés privées](#private-key) d'un compte, typiquement générées en utilisant une [phrase de récupération](#hd-wallet-seed). Les comptes externes sont des comptes sans aucun code associé. Généralement, ces comptes sont utilisés avec [un portefeuille](#wallet).

### Demande de commentaires Ethereum (ERC) {#erc}

Libellé donné à certaines [EIP](#eip) qui visent à définir une norme spécifique d'utilisation d'Ethereum.

<DocLink to="/eips/">
  Introduction aux EIP
</DocLink>

### Ethash {#ethash}

Un algorithme de [preuve de travail](#pow) qui a été utilisé sur Ethereum avant de passer à [preuve d'enjeu](#pos).

[En savoir plus](/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethash)

### Ether {#ether}

Cryptomonnaie native utilisée par l'écosystème Ethereum, qui couvre les coûts de [gaz](#gas) lors de l'exécution des transactions. S'écrit également sous la forme ETH ou avec son symbole Ξ qui est le caractère grec Xi en majuscule.

<DocLink to="/eth/">
  La monnaie de notre avenir numérique
</DocLink>

### Événements {#events}

Permet d'utiliser les dispositifs de journalisation de l'[EVM](#evm). Les [DApps](#dapp) peuvent écouter les événements et les utiliser pour déclencher des rappels JavaScript dans l'interface utilisateur.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Événements et journaux
</DocLink>

### Machine Virtuelle Ethereum (EVM) {#evm}

Machine virtuelle basée sur une pile, qui exécute du [bytecode](#bytecode). Dans Ethereum, le modèle d'exécution spécifie comment l'état du système est modifié, en fonction d'une série d'instructions en bytecode et d'un petit tuple de données environnementales. Ceci est spécifié via un modèle formel de machine d'état virtuelle.

<DocLink to="/developers/docs/evm/">
  Machine virtuelle Ethereum (EVM)
</DocLink>

### Langage d'assemblage de l'EVM {#evm-assembly-language}

Forme lisible par l'homme du [bytecode de l'EVM](#bytecode).

<Divider />

## F {#section-f}

### Fonction de secours {#fallback-function}

Fonction par défaut appelée en l'absence de données ou d'un nom de fonction déclaré.

### Robinet {#faucet}

Service effectué via un [contrat intelligent](#smart-contract), qui distribue des fonds sous la forme d'ethers de test gratuits peuvant être utilisés sur un réseau de test.

<DocLink to="/developers/docs/networks/#testnet-faucets">
  Robinets de réseau de test
</DocLink>

### Finalité {#finality}

La finalité est la garantie qu'avant une heure donnée, un ensemble de transactions ne changera pas et ne pourra pas être annulé.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Finalité de la preuve d'enjeu
</DocLink>

### Finney {#finney}

Unité de l'[ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### Fourche {#fork}

Changement de protocole causant la création d'une chaîne alternative ou divergence temporelle en deux chemins de blocs potentiels.

### Algorithme de sélection de fourche {#fork-choice-algorithm}

L'algorithme utilisé pour identifier la tête de la blockchain. Sur la couche d'exécution, la tête de la chaîne est identifiée comme celle qui présente la plus grande difficulté totale. Cela signifie que la véritable tête de la chaîne est celle qui a nécessité le plus de travail pour être minée. Sur la couche de consensus, l'algorithme observe l'accumulation des attestations en provenance des validateurs ([LMD_GHOST](#lmd-ghost)).

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

### Prix du gaz {#gas-price}

Prix en éther d'une unité de gaz spécifiée dans une transaction.

### Bloc d'origine {#genesis-block}

Premier bloc d'une [blockchain](#blockchain), utilisé pour initialiser un certain réseau et sa cryptomonnaie.

### Geth {#geth}

Go Ethereum. L'une des implémentations les plus importantes du protocole Ethereum, programmée en Go.

[Plus d'infos sur geth.ethereum.org](https://geth.ethereum.org/)

### Gwei {#gwei}

Abréviation de Gigawei, une unité de l'[ether](#ether) couramment utilisée pour attribuer un prix au [gaz](#gas). 1 Gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> Gwei = 1 ether.

<Divider />

## H {#section-h}

### Fourche majeure {#hard-fork}

Divergence permanente dans la [blockchain](#blockchain), aussi appelée modification de fourche majeure. Cela se produit habituellement lorsque les nœuds non mis à niveau ne peuvent pas valider les blocs créés par les nœuds mis à niveau qui appliquent des [règles de consensus](#consensus-rules) plus récentes. À ne pas confondre avec une fourche, une fourche mineure, une fourche logicielle ou une fourche Git.

### Empreinte numérique {#hash}

Empreinte de longueur fixe d'entrées de taille variable, produite par une fonction d'empreinte numérique. (Voir [Keccak-256](#keccak-256)).

### Puissance de hachage {#hash-rate}

C'est le nombre d'empreintes numériques par seconde calculées par les ordinateurs minant sur le réseau.

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

Une structure réseau destinée à optimiser la requête d'informations à travers la [blockchain](#blockchain) en fournissant un chemin efficace vers sa source de stockage.

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

### Émission

La frappe de nouveaux ethers pour récompenser la proposition de bloc, l'attestation et la dénonciation.

## K {#section-k}

### Fonction de dérivation de clé (KDF) {#kdf}

Aussi appelée « algorithme d'étirement de mot de passe », elle est utilisée par les formats [keystore](#keystore-file) pour protéger contre les attaques par force brute, par dictionnaire et de table arc-en-ciel sur le chiffrement des phrases de sécurité, en hachant celles-ci de façon répétée.

<DocLink to="/developers/docs/smart-contracts/security/">
  Sécurité de contrat intelligent
</DocLink>

### Keystore {#keyfile}

La paire clé/adresse privée de chaque compte existe en tant que fichier clé unique dans un client Ethereum. Ce sont des fichiers texte JSON qui contiennent la clé privée chiffrée du compte, qui ne peut être déchiffrée qu'avec le mot de passe entré lors de la création du compte.

### Keccak-256 {#keccak-256}

Fonction de hachage cryptographique ([empreinte numérique](#hash)) utilisée dans Ethereum. Keccak-256 a été standardisée comme [SHA](#sha)-3.

<Divider />

## L {#section-l}

### Couche 2 {#layer-2}

Domaine de développement axé sur des améliorations de couches se situant au-dessus du protocole Ethereum. Ces améliorations sont liées aux vitesses de [transaction](#transaction), à la réduction des [frais de transaction](#transaction-fee) et à la confidentialité des transactions.

<DocLink to="/layer-2/">
  Couche 2
</DocLink>

### LevelDB {#level-db}

Système open source de stockage de clé-valeur sur disque, implémenté en tant que [bibliothèque](#library) légère dédiée, disponible sur de nombreuses plateformes.

### Bibliothèque {#library}

Type spécial de [contrat](#smart-contract) qui n'a ni fonction de paiement, ni fonction de secours, ni stockage de données. Par conséquent, une bibliothèque ne peut ni recevoir ni détenir d'ethers, ni stocker des données. Elle sert de code déployé au préalable que d'autres contrats peuvent appeler pour obtenir un calcul en lecture seule.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Bibliothèques de contrats intelligents
</DocLink>

### Client léger {#light-client}

Client Ethereum qui ne stocke aucune copie locale de la [blockchain](#blockchain) ou qui ne valide aucun bloc ni aucune [transaction](#transaction). Il offre les fonctions d'un [portefeuille](#wallet), et peut créer et diffuser des transactions.

<Divider />

### LMD_GHOST {#lmd-ghost}

[L'algorithme de sélection de fourche](#fork-choice-algorithm) utilisé par les clients de consensus Ethereum pour identifier la tête de la chaîne. LMD-GHOST est le sigle de « dernier message produit - sous-arbre le plus lourd et gourmand observé » (Latest Message Driven Greediest Heaviest Observed SubTree), ce qui signifie que la tête de la chaîne est le bloc avec la plus grande accumulation d'[attestations](#attestation) dans son histoire.

## M {#section-m}

### Réseau principal {#mainnet}

Appelé « mainnet » en anglais (pour « main network »), il s'agit de la [blockchain](#blockchain) principale du réseau public Ethereum. De vrais ETH, une véritable valeur et des conséquences réelles. Aussi connu sous le nom de « couche 1 » lors des discussions sur les solutions de misse à l'échelle de [couche 2](#layer-2). (Voir aussi [réseau de test](#testnet))

<DocLink to="/developers/docs/networks/">
  Réseaux Ethereum
</DocLink>

### Mémorivore {#memory-hard}

Les fonctions mémorivores sont des processus qui connaissent une diminution drastique de la vitesse ou de la faisabilité lorsque la quantité de mémoire disponible diminue même légèrement. Un exemple est l'algorithme de minage Ethereum [Ethash](#ethash).

### L'arbre de Merkle Patricia {#merkle-patricia-tree}

Structure des données utilisée dans Ethereum pour stocker efficacement les paires clés-valeurs.

### Message {#message}

[Transaction interne](#internal-transaction) qui n'est jamais sérialisée et qui est uniquement envoyée dans l'[EVM](#evm).

### Appel de message {#message-call}

L'acte de passer un [message](#message) d'un compte à un autre. Si le compte de destination est associé au code de l'[EVM](#evm), alors celle-ci sera démarrée avec l'état de cet objet et le message sera traité.

### Metropolis {#metropolis}

La troisième phase de développement d'Ethereum, lancée en octobre 2017.

### Minage {#mining}

C'est le procédé de vérification des transactions et de l'exécution du contrat sur la blockchain Ethereum en échange d'une récompense en ether avec le minage de chaque bloc. C'est ainsi qu'Ethereum était sécurisé avant de passer à [la preuve d'enjeu](#pos).

### Ferme de minage {#mining-pool}

La mise en commun de ressources par les mineurs de la [preuve de travail](#pow) qui partagent leur puissance de calcul et se partagent les [récompenses de blocs](#block-reward).

### Mineur {#miner}

[Nœud](#node) du réseau qui trouve une [preuve de travail](#pow) valide pour de nouveaux blocs, par passes de hachage successives (voir [Ethash](#ethash)). Les mineurs ne font plus partie de Ethereum - ils ont été remplacés par des validateurs lorsque Ethereum est passé à la [la preuve d'enjeu](#pos).

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

### Puissance de hachage du réseau {#network-hashrate}

La [puissance de hachage](#hashrate) collective produite par un réseau entier de minage. Le minage sur Ethereum s'est terminé lorsque Ethereum est passé à la [preuve d'enjeu](#pos).

### Jeton non fongible (NFT) {#nft}

Aussi connu sous le nom de « deed », il s'agit d'une norme de jeton introduite par la proposition ERC-721. Les NFT peuvent être suivis et échangés, mais chaque jeton est unique et distinct. Ils ne sont pas interchangeables comme les [jetons ERC-20](#token-standard). Les NFT peuvent représenter la propriété des actifs numériques ou physiques.

<DocLink to="/nft/">
  Jetons non fongibles (NFT)
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

En cryptographie, valeur qui ne peut être utilisée qu'une seule fois. Un nonce d'un compte est un compteur de transactions propre à chaque compte, qui est utilisé pour prévenir les attaques par répétition.

<Divider />

## O {#section-o}

### bloc ommer (oncle) {#ommer}

Quand un [mineur](#miner) de preuve de travail trouve un [bloc](#block) valide, un autre mineur peut avoir publié un bloc concurrent, qui est ajouté en premier au sommet de la blockchain. Ce bloc valide, mais obsolète, peut être inclus par des blocs plus récents en tant que _bloc oncle_ et recevoir une récompense partielle. On utilise parfois le terme « ommer », plus neutre, pour parler de fraternité d'un bloc parent. Ceci était pertinent pour Ethereum lorsqu'il était un réseau à [preuve de travail](pow), mais les blocs oncle ne sont pas une fonctionnalité de la [preuve d'enjeu](#pos) sur Ethereum, car un seul proposant de bloc est sélectionné à chaque créneau.

### Rollup optimiste {#optimistic-rollup}

Un [rollup](#rollups) (ou regroupement) de transactions qui utilise les [preuves de fraude](#fraud-proof) pour permettre un débit de transactions plus élevé sur la [couche 2](#layer-2) tout en bénéficiant de la sécurité apportée par le [réseau principal](#mainnet) (couche 1). Contrairement à [Plasma](#plasma), une solution similaire sur la couche 2, les rollups optimistes peuvent gérer des transactions plus complexes, en fait tout ce qui est possible au sein de l'[EVM](#evm). Ils rencontrent des problèmes de latence par rapport aux [rollups ZK](#zk-rollups), car une transaction peut être contestée par l'intermédiaire de la preuve de fraude.

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Rollups optimistes
</DocLink>

### Oracle {#oracle}

Les oracles sont des ponts entre la [blockchain](#blockchain) et le monde réel. Ils agissent comme des [API](#api) sur la blockchain qui peuvent être interrogés pour des informations et utilisés dans des [contrats intelligents](#smart-contract).

<DocLink to="/developers/docs/oracles/">
  Oracle
</DocLink>

<Divider />

## P {#section-p}

### parity {#parity}

Une des implémentations interopérables les plus importantes du logiciel client Ethereum.

### pair {#peer}

Ordinateurs connectés exécutant le logiciel client Ethereum qui ont des copies identiques de la [blockchain](#blockchain).

### Réseau pair-à-pair {#peer-to-peer-network}

Un réseau d'ordinateurs ([pairs](#peer)) collectivement capables de fonctionner sans s'appuyer sur des services centralisés s'appuyant sur des serveurs.

### Plasma {#plasma}

Une solution de mise à l'échelle hors chaîne qui utilise des [preuves de fraude](#fraud-proof), comme les [rollups optimistes](#optimistic-rollups). Plasma se limite aux transactions simples comme les échanges et transferts de jetons simples.

<DocLink to="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### Clé privée (clé secrète) {#private-key}

Nombre secret qui permet aux utilisateurs Ethereum de prouver la propriété d'un compte ou de contrats en produisant une signature numérique (voir [clé publique](#public-key), [adresse](#address), [ECDSA](#ecdsa)).

### Chaîne privée {#private-chain}

Une blockchain est dite privée si on y accède via une permission, par opposition à une blockchain publique. C'est par exemple le cas de blockchain interne à une institution.

### Preuve d'enjeu (PoS) {#pos}

Méthode par laquelle un protocole de blockchain de cryptomonnaie vise à atteindre un [consensus](#consensus) distribué. La PoS demande aux utilisateurs de prouver qu'ils sont propriétaires d'une certaine quantité de cryptomonnaie (leur « mise » sur le réseau) afin de pouvoir participer à la validation des transactions.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Preuve d'enjeu
</DocLink>

### Preuve de travail (PoW) {#pow}

Un bout de données (la preuve) qui nécessite des calculs significatifs pour être trouvée.

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  Preuve de travail
</DocLink>

### clé publique {#public-key}

Nombre dérivé depuis une [clé privée](#private-key) via une fonction à sens unique, qui peut être partagé publiquement et utilisé par n'importe qui pour vérifier une signature numérique créée avec la clé privée correspondante.

<Divider />

## R {#section-r}

### Reçu {#receipt}

Données renvoyées par un client Ethereum pour représenter le résultat d'une [transaction](#transaction) particulière, y compris une [empreinte numérique](#hash) de la transaction, son numéro de [bloc](#block), la quantité de [gaz](#gas) utilisée et, en cas de déploiement d'un [contrat intelligent](#smart-contract), l'[adresse](#address) du contrat.

### Attaque par réentrance {#re-entrancy-attack}

Attaque qui consiste en un contrat d'attaquant qui appelle une fonction du contrat de la victime de telle façon que, pendant l'exécution, la victime rappelle le contrat de l'attaquant de façon récursive. Cela peut aboutir à voler des fonds, par exemple en faisant en sorte de contourner des parties du contrat de la victime qui mettent à jour les soldes ou qui comptabilisent les montants retirés.

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  Réentrance
</DocLink>

### Récompense {#reward}

Quantité d'ethers inclus dans chaque nouveau bloc comme récompense du réseau au [mineur](#miner) qui a trouvé la solution de la [preuve de travail](#pow).

### Préfixe de longueur récursive (RLP) {#rlp}

Une norme d'encodage conçue par les développeurs Ethereum pour encoder et sérialiser des objets (structure de données) de complexité et de longueur arbitraires.

### Rollups {#rollups}

Type de solution de mise à l'échelle de [couche 2](#layer-2) qui regroupe plusieurs transactions et les soumet à la [chaîne principale Ethereum](#mainnet) en une seule transaction. Cela permet de réduire les frais de [gaz](#gas) et d'augmenter le débit des [transactions](#transaction). Il existe des rollups optimistes et des rollups ZK qui utilisent différentes méthodes de sécurité pour offrir ces avantages d'évolutivité.

<DocLink to="/developers/docs/scaling/#rollups">
  rollups
</DocLink>

<Divider />

### RPC {#rpc}

**Appel de procédure à distance (RPC)** est un protocole qu'un programme utilise pour demander un service à un programme situé sur un autre ordinateur dans un réseau sans avoir à comprendre les détails du réseau.

## S {#section-s}

### Algorithme de hachage sécurisé (SHA) {#sha}

Famille de fonctions de hachage cryptographique publiées par le National Institute of Standards and Technology (NIST) aux États-Unis.

### Serenity {#serenity}

L'étape du développement d'Ethereum qui a initié un ensemble de mises à jour de mise à l'échelle et de durabilité, précédemment appelées 'Ethereum 2.0', ou 'Eth2'.

<DocLink to="/upgrades/">
  Mises à niveau d'Ethereum
</DocLink>

### Sérialisation {#serialization}

Procédé de conversion d'une structure de données en une séquence d'octets.

### Fragment / chaîne de fragments {#shard}

Les chaînes de fragments sont des portions de la blockchain complète qui peuvent être sous la responsabilité de sous-ensembles de validateurs. Les chaînes de fragments offriront un débit de transaction accru pour Ethereum et amélioreront la disponibilité des données pour les solutions de [couche 2](#layer-2) comme les [rollups optimistes](#optimistic-rollups) et les [rollups ZK](#zk-rollups).

<DocLink to="/upgrades/shard-chains">
  Chaines de fragments
</DocLink>

### Chaînes latérales {#sidechain}

Solution de mise à l'échelle qui utilise une chaîne séparée avec des [règles de consensus](#consensus-rules) différentes, souvent plus rapides. Un pont est nécessaire pour connecter ces chaînes latérales au [réseau principal](#mainnet). Les [rollups](#rollups) utilisent également les chaînes latérales, mais ils fonctionnent plutôt en collaboration avec le [réseau principal](#mainnet).

<DocLink to="/developers/docs/scaling/sidechains/">
  Chaines latérales
</DocLink>

### Signature {#signing}

Démontrer cryptographiquement qu'une transaction a été approuvée par le détenteur d'une clé privée spécifique.

### Singleton {#singleton}

Terme de programmation informatique qui décrit un objet dont il ne peut exister qu'une seule instance.

### Délesteur {#slasher}

Un délesteur est une entité qui scanne les attestations à la recherche d'offenses sanctionnables. Les sanctions sont diffusées sur le réseau, et le proposant en consigne la preuve dans le prochain bloc. Le proposant reçoit alors une récompense pour avoir sanctionné le validateur malveillant.

### Créneau {#slot}

Une période de temps (12 secondes) durant laquelle de nouveaux blocs peuvent être proposés par un [validateur](#validator) dans le système de [preuve d'enjeu](#pos). Un créneau peut être vide. 32 créneaux forment une [période](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Preuve d'enjeu
</DocLink>

### Contrat intelligent {#smart-contract}

Programme qui s'exécute sur l'infrastructure de calcul Ethereum.

<DocLink to="/developers/docs/smart-contracts/">
  Introduction aux contrats intelligents
</DocLink>

### SNARK {#snark}

Acronyme pour « argument de connaissance succinct et non interactif » (Succint Non-interactive Argument of Knowledge), un SNARK est un type de [preuve de connaissance zéro](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollups ZK
</DocLink>

### Fourche mineure {#soft-fork}

Une divergence dans une [blockchain](#blockchain) qui se produit lorsque les [règles de consensus](#consensus-rules) deviennent changeantes. Contrairement à une [fourche majeure](#hard-fork), une fourche mineure est rétro-compatible ; les nœuds mis à jour peuvent valider les blocs créés par des nœuds non mis à jour tant qu'ils suivent les nouvelles règles de consensus.

### Solidity {#solidity}

Langage de programmation procédural (impératif) dont la syntaxe est similaire à JavaScript, C++ ou Java. Il s'agit du langage le plus populaire et le plus fréquemment utilisé pour les [contrats intelligents](#smart-contract) sur Ethereum. Il a été créé par Dr Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Assemblage en ligne Solidity {#solidity-inline-assembly}

Langage d'assemblage de l'[EVM](#evm) que l'on peut utiliser au sein d'un programme [Solidity](#solidity). Cette prise en charge par Solidity de l'assembleur facilite l'écriture de certaines opérations.

### Spurious Dragon {#spurious-dragon}

[Fourche majeure](#hard-fork) de la blockchain Ethereum, qui s'est produite au bloc 2 675 000 pour traiter plus de vecteurs d'attaque par déni de service et pour effacer l'état (voir [Tangerine Whistle](#tangerine-whistle)). C'est également un mécanisme de protection contre les attaques par rejeu (voir [nonce](#nonce)).

### Stablecoin {#stablecoin}

[Jeton ERC-20](#token-standard) dont la valeur est liée à celle d'un autre actif. Il existe des stablecoins liés à des monnaies fiduciaires comme le dollar, des métaux précieux comme l'or et d'autres cryptomonnaies comme le Bitcoin.

<DocLink to="/eth/#tokens">
  L'ETH n'est pas la seule crypto sur Ethereum
</DocLink>

### Mettre en jeu {#staking}

Déposer une quantité d'[ethers](#ether) (votre mise) pour devenir validateur et sécuriser le [réseau](#network). Un validateur vérifie les [transactions](#transaction) et propose des [blocs](#block) sous un modèle de consensus par [preuve d'enjeu](#pos). La mise en jeu vous incite économiquement à agir dans le meilleur intérêt du réseau. Vous obtiendrez des récompenses pour avoir mené à bien vos tâches de [validateur](#validator), mais perdrez diverses quantités d'ETH dans le cas contraire.

<DocLink to="/staking/">
  Misez votre ETH pour devenir un validateur Ethereum
</DocLink>

### STARK {#stark}

Acronyme de « argument de connaissance transparent et évolutif » (Scalable Transparent Argument of Knowledge), un STARK est un type de [preuve de connaissance zéro](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollups ZK
</DocLink>

### État {#state}

Une image instantanée de tous les soldes et métadonnées présents à un moment donné sur la blockchain, qui renvoie normalement aux conditions au niveau d'un bloc particulier.

### Canaux d'état {#state-channels}

Solution de [couche 2](#layer-2) qui implique la mise en place d'un canal entre les participants pour qu'ils puissent effectuer des transactions librement et à moindre coût. Seule une [transaction](#transaction) est envoyée au [réseau principal](#mainnet) pour configurer et fermer le canal. Cela permet un débit de transaction très élevé, mais repose sur la connaissance du nombre de participants au départ et le blocage de fonds.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  Canaux d'état
</DocLink>

### Supermajorité {#supermajority}

La supermajorité est le terme désignant une quantité supérieure à 2/3 (66 %) de l'ether total mis en jeu pour sécuriser Ethereum. Un vote de la supermajorité est nécessaire pour que les blocs soient [finalisés](#finality) sur la chaîne phare.

### synchronisation {#syncing}

Ce procédé correspond à la transmission à un noeud du réseau de la blockchain, de l'entière et plus actuelle version de la blockchain.

### Comité de synchronisation {#sync-committee}

Un comité de synchronisation est un groupe de validateurs sélectionnés aléatoirement qui est actualisé toutes les 27 heures environ. Leur rôle est d'ajouter leurs signatures à des en-têtes de blocs valides. Les comités de synchronisation permettent aux [clients légers](#light-client) de garder une trace de la tête de la blockchain sans nécessiter l'accès à l'ensemble des validateurs.

### Szabo {#szabo}

Unité de l'[ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

[Fourche majeure](#hard-fork) de la blockchain Ethereum, qui s'est produite au bloc 2 463 000 pour modifier le calcul du [gaz](#gas) pour certaines opérations intensives en E/S et pour effacer l'état accumulé d'une attaque par déni de service, qui exploitait le faible coût en gaz de ces opérations.

### Difficulté Totale Terminale (TTD) {#terminal-total-difficulty}

La difficulté totale est la somme de la difficulté de minage Ethash pour tous les blocs jusqu'à un point spécifique de la blockchain. La difficulté totale terminale est une valeur spécifique pour la difficulté totale qui a été utilisée comme déclencheur pour les clients d'exécution afin d'éteindre leurs fonctions de minage et permettre au réseau de basculer à la preuve d'enjeu.

### Réseau de test {#testnet}

Aussi appelé « testnet » (de l'anglais « test network »), il s'agit d'un réseau utilisé pour simuler le comportement du réseau principal Ethereum (voir [réseau principal](#mainnet)).

<DocLink to="/developers/docs/networks/#ethereum-testnets">
  Réseaux de test
</DocLink>

### jeton {#token}

Un bien virtuel négociable défini dans les contrats intelligents sur la blockchain Ethereum.

### mise aux normes des jetons {#token-standard}

Introduite par la proposition ERC-20, elle fournit une structure de [contrat intelligent](#smart-contract) standardisée pour les jetons fongibles. D'autres standards ERC s'appliquent aux jetons non-fongibles ou [NFT](#nft).

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  Norme de jeton ERC-20
</DocLink>

### Transaction {#transaction}

Données enregistrées dans la blockchain Ethereum signées par un [compte](#account) émetteur, ciblant une [adresse](#address) spécifique. La transaction contient des métadonnées comme sa [limite de gaz](#gas-limit).

<DocLink to="/developers/docs/transactions/">
  Transactions
</DocLink>

### Frais de transaction {#transaction-fee}

Frais dont il faut s'acquitter à chaque utilisation du réseau Ethereum. Par exemple, l'envoi de fonds depuis votre [portefeuille](#wallet) ou l'interaction avec une [dApp](#dapp), comme l'échange de jetons ou l'achat d'un objet de collection. Vous pouvez les voir comme des frais de service. Ils évoluent en fonction de l'occupation du réseau. Ceci est dû au fait que les validateurs, les personnes responsables du traitement de votre transaction, sont susceptibles de donner la priorité aux transactions dont les commissions sont plus élevées. La congestion du réseau pousse donc les prix vers le haut.

Au niveau technique, vos frais de transaction se rapportent à la quantité de [gaz](#gas) requise par votre transaction.

La réduction des frais de transaction est actuellement un sujet qui suscite un vif intérêt. Voir [couche 2](#layer-2)

### Sans confiance {#trustlessness}

La capacité d'un réseau à effectuer des transactions sans qu'aucune des parties impliquées n'ait besoin de faire confiance à un tiers

### Turing-complet {#turing-complete}

Concept nommé d'après le mathématicien et informaticien anglais Alan Turing. Un système de règles de manipulation de données (comme l'ensemble d'instructions d'un ordinateur, un langage de programmation ou un automate cellulaire) est « Turing-complet » ou « universel sur le plan informatique » s'il peut être utilisé pour simuler n'importe quelle machine Turing.

<Divider />

## V {#section-v}

### Validateur {#validator}

Dans un système de [preuve d'enjeu](#pos), [nœud](#node) responsable du stockage des données, du traitement des transactions et de l'ajout de nouveaux blocs à la blockchain. Pour activer le logiciel validateur, vous devez pouvoir [mettre en jeu](#staking) 32 ETH.

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Preuve d'enjeu
</DocLink>
<DocLink to="/staking/">
  Mise en jeu sur Ethereum
</DocLink>

### Cycle de vie du validateur {#validator-lifecycle}

La séquence des états dans lesquels un validateur peut exister. Elle comprend :

- déposé : Au moins 32 ETH a été déposé sur le [contrat de dépôt](#deposit-contract) par le validateur
- en attente : le validateur est dans la file d'activation en attente d'être accepté dans le réseau par vote des validateurs existants
- actif : en train d'attester et de proposer des blocs
- dénoncé : le validateur s'est mal comporté et a été exclu
- sortant : le validateur a été marqué pour quitter le réseau, soit volontairement, soit parce qu'il a été éjecté.

### Preuve de validité {#validity-proof}

Modèle de sécurité pour certaines solutions de [couche 2](#layer-2) dans lequel, pour augmenter la vitesse, les transactions sont regroupées en lots ([rollups](/#rollups)) et soumises à Ethereum en une seule transaction. Le calcul des transactions se fait hors chaîne avant d'être transmis à la chaîne principale avec une preuve de leur validité. Cette méthode augmente le nombre de transactions possibles tout en maintenant le niveau de sécurité. Certains [rollups](#rollups) utilisent plutôt des [preuves de fraude](#fraud-proof).

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

Troisième version du web. Terme proposé au départ par le Dr Gavin Wood, Web3 représente une nouvelle vision et une nouvelle orientation pour les applications web : passant d'applications gérées et détenues de façon centralisée à des applications construites sur des protocoles décentralisés (voir [dApp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 et Web3
</DocLink>

### Wei {#wei}

Plus petite unité de l'[ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### Adresse zéro {#zero-address}

Adresse Ethereum spéciale, composée entièrement de zéros et spécifiée comme adresse de destination d'une [transaction de création de contrat](#contract-creation-transaction).

### preuve de connaissance zéro {#zk-proof}

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
