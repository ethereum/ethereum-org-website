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

Une affirmation faite par une entité selon laquelle quelque chose est vrai. Dans le contexte d'Ethereum, les validateurs de consensus doivent déclarer ce qu'ils pensent être l'état de la chaîne. À des moments déterminés, chaque validateur est chargé de publier différentes attestations qui rendent officielle la vue de ce validateur sur la chaîne, y compris le dernier point de contrôle finalisé et la tête actuelle de la chaîne.

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

La chaîne phare a été la blockchain qui a introduit la [preuve d'enjeu](#pos) et [les validateurs](#validator) sur Ethereum. Elle a fonctionné parallèlement au réseau principal par preuve de travail Ethereum depuis décembre 2020 jusqu'à ce que les deux chaînes soient fusionnées en septembre 2022 pour former l'Ethereum d'aujourd'hui.

<DocLink to="/roadmap/beacon-chain/">
  Chaîne phare
</DocLink>

### Gros-boutiste {#big-endian}

Représentation de nombre positionnel où le chiffre le plus important est le premier en mémoire. Contraire du petit-boutisme (little-endian), où le chiffre le moins significatif arrive en premier.

### Bloc {#block}

Un bloc est une unité d'information groupée qui comprend une liste ordonnée de transactions et des informations liées au consensus. Les blocs sont proposés par les validateurs de preuves d'enjeu, après quoi ils sont partagés sur l'ensemble du réseau pair-à-pair, où ils peuvent facilement être vérifiés indépendamment par tous les autres nœuds. Les règles de consensus régissent le contenu d'un bloc considéré comme valide, et tout bloc invalide est ignoré par le réseau. L'ordre de ces blocs et les transactions qui s'y trouvent créent une chaîne d'événements déterministe dont la fin représente l'état actuel du réseau.

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

Validateur spécifique choisi pour créer un bloc dans un [créneau](#slot) particulier.

### Récompense du bloc {#block-reward}

C'est le total d'ether reversé au proposant ayant validé le bloc.

### Statut du bloc {#block-status}

Les états dans lesquels un bloc peut exister. Quelques états possibles sont :

- proposé : le bloc a été proposé par un validateur
- programmé : les validateurs soumettent actuellement des données
- manqué/ignoré : le proposant n'a pas proposé de bloc dans le laps de temps éligible.
- orphelin : le bloc a été réorganisé par l'[algorithme de choix de fourche](#fork-choice-algorithm)

### Durée de bloc {#block-time}

L'intervalle de temps entre les blocs ajoutés à la blockchain.

### Validation de bloc {#block-validation}

Processus consistant à vérifier qu'un nouveau bloc contient des transactions et signatures valides. Il s'appuie sur la chaîne historique la plus lourde et suit toutes les autres règles de consensus. Les blocs valides sont ajoutés à la fin de la chaîne et se propagent aux autres sur le réseau. Les blocs invalides sont ignorés.

### Blockchain {#blockchain}

Séquence de [blocs](#block), où chacun est relié à son prédécesseur jusqu'au [bloc d'origine](#genesis-block) en référençant le hachage du bloc précédent. L'intégrité de la blockchain est crypto-économiquement sécurisée à l'aide d'un mécanisme de consensus basé sur la preuve d'enjeu.

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Qu'est-ce qu'une blockchain ?
</DocLink>

### Nœud d'amorçage {#bootnode}

Nœuds qui peuvent être utilisés pour initier le processus Discovery lors de l'exécution d'un nœud. Les adresses de ces nœuds sont enregistrés dans le code source d'Ethereum.

### Bytecode {#bytecode}

Ensemble d'instructions abstraites conçues pour être exécutées efficacement par un interpréteur logiciel ou une machine virtuelle. Contrairement au code source lisible par l'homme, le bytecode est exprimé sous forme numérique.

### Fourche Byzantium {#byzantium-fork}

La première des deux [fourches majeures](#hard-fork) de la phase de développement [Metropolis](#metropolis). Elle comprend le report de la [bombe de difficulté](#difficulty-bomb) de Metropolis et la réduction des récompenses de bloc de l'EIP 649, l'[Ice Age](#ice-age) ayant été retardé de 1 an et la récompense de bloc réduite de 5 à 3 ethers.

<Divider />

## C {#section-c}

### Casper-FFG {#casper-ffg}

Casper-FFG est un protocole de consensus par preuve d'enjeu utilisé avec l'algorithme de choix de fourche [LMD-GHOST](#lmd-ghost) pour permettre à [des clients de consensus](#consensus-client) de s'entendre sur la tête de la chaîne phare.

### Point de contrôle {#checkpoint}

La [chaîne phare](#beacon-chain) est cadencée en créneaux (12 secondes) et en périodes (32 créneaux). Le premier créneau d'une période est un point de contrôle. Quand une [supermajorité](#supermajority) de validateurs atteste du lien entre deux points de contrôle, ils peuvent être [justifiés](#justification), puis, quand un autre point de contrôle est justifié en sus, ils peuvent être [finalisés](#finality).

### Compiler {#compiling}

Traduire du code écrit dans un langage de programmation de haut niveau (par exemple, [Solidity](#solidity)) en un langage de plus bas niveau (par exemple, le [bytecode](#bytecode) de l'EVM).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Compiler des contrats intelligents
</DocLink>

### Comité {#committee}

Groupe d’au moins 128 [validateurs](#validator) ayant la charge de valider des blocs dans chaque créneau. L'un des validateurs au sein du comité est l'agrégateur, responsable de l'agrégation des signatures de tous les autres validateurs au sein du comité qui s'accordent sur une attestation. A ne pas confondre avec le [comité de synchronisation](#sync-committee).

### Infaisabilité informatique {#computational-infeasibility}

Un processus est infaisable du point de vue informatique s'il exige de quiconque pourrait avoir un intérêt à le réaliser un temps trop long en pratique (par ex. des milliards d'années).

### Consensus {#consensus}

Lorsqu'une supermajorité de nœuds du réseau ont tous les mêmes blocs dans leur meilleure blockchain validée localement. À ne pas confondre avec les [règles de consensus](#consensus-rules).

### Client de consensus {#consensus-client}

Les clients de consensus (tels que Prysm, Teku, Nimbus, Lighthouse et Lodestar) exécutent l'algorithme de consensus de [preuve d'enjeu](#pos) d'Ethereum permettant au réseau de parvenir à un accord sur la tête de la chaîne phare. Les clients de consensus ne participent pas à la validation/diffusion des transactions ou à l'exécution des transitions d'état. Ce sont les [clients d'exécution](#execution-client) qui s'en chargent.

### Couche de consensus {#consensus-layer}

La couche de consensus d'Ethereum est le réseau des [clients de consensus](#consensus-client).

### Règles de consensus {#consensus-rules}

Règles de validation de bloc que les nœuds complets appliquent pour maintenir un consensus avec les autres nœuds. À ne pas confondre avec le [consensus](#consensus).

### Envisagé pour inclusion (CFI) {#cfi}

[EIP](#eip) de base qui n'est pas encore actif sur le réseau principal, les développeurs de clients étant généralement favorables à l'idée. En supposant qu'il réponde à toutes les exigences pour inclusion dans le réseau principal, il pourrait potentiellement être inclus dans une mise à jour du réseau (pas nécessairement la prochaine).

### Fourche Constantinople {#constantinople-fork}

Seconde partie de la phase [Metropolis](#metropolis), initialement prévue pour la mi-2018. Devait notamment inclure le passage à un algorithme de consensus hybride [preuve de travail](#pow)/[preuve d'enjeu](#pos).

### Compte de contrat {#contract-account}

Compte contenant du code qui s'exécute chaque fois qu'il reçoit une [transaction](#transaction) d'un autre [compte](#account) (qu'il s'agisse d'un [compte externe](#eoa) ou d'un [contrat](#contract-account)).

### Transaction de création de contrat {#contract-creation-transaction}

Une [transaction spéciale](#transaction) qui inclut le code d'initiation d'un contrat. Le destinataire est défini comme `null` et le contrat est déployé sur une adresse générée à partir de l'adresse de l'utilisateur et du `nonce`. qui est utilisé pour enregistrer un [contrat](#contract-account) et l'intégrer à la blockchain Ethereum.

### cryptoéconomies {#cryptoeconomics}

L'économie des cryptomonnaies.

## D {#section-d}

### Đ {#d-with-stroke}

Đ (D barré) est utilisé en ancien anglais, moyen anglais, en islandais et féroïen pour représenter la lettre majuscule « Eth ». On l'utilise dans des mots comme ĐEV ou Đapp (application décentralisée), où le Đ désigne la lettre nordique « eth ». L'eth majuscule (Ð) est aussi utilisé pour symboliser la cryptomonnaie Dogecoin. On la trouve souvent dans la littérature plus ancienne sur Ethereum mais elle est moins utilisée aujourd'hui.

### DAG {#dag}

DAG signifie Graphe Acyclique Orienté (Directed Acyclic Graph). Il s'agit d'une structure de données composées de nœuds et de liens entre eux. Avant la fusion, Ethereum utilisait un DAG dans son algorithme [de preuve de travail](#pow) , [Ethash](#ethash), mais celui-ci n'est plus utilisé avec la [preuve d'enjeu](#pos).

### DApp {#dapp}

Application décentralisée. Au minimum, il s'agit d'un [contrat intelligent](#smart-contract) et d'une interface utilisateur web. Plus généralement, une dApp est une application web qui est construite sur des services d'infrastructure de pair à pair, décentralisés et ouverts. Par ailleurs, de nombreuses applications décentralisées incluent un stockage décentralisé et/ou un protocole et une plateforme de messages.

<DocLink to="/developers/docs/dapps/">
  Introduction aux dApps
</DocLink>

### Disponibilité des données {#data-availability}

Propriété permettant à tout noeud connecté au réseau de télécharger n'importe quelle portion de l'état qu'il souhaite.

### Décentralisation {#decentralization}

Action de transférer le contrôle et l'exécution des processus en dehors d'une entité centrale.

### Organisation autonome décentralisée (DAO) {#dao}

Entreprise ou autre organisation fonctionnant sans gestion hiérarchique. DAO peut également faire référence à un contrat intitulé « The DAO » lancé le 30 avril 2016, qui a ensuite été piraté en juin 2016. Ceci a finalement motivé une [fourche majeure](#hard-fork) (nom de code DAO) au bloc 1 192 000, qui a inversé le contrat DAO piraté et a causé la division d'Ethereum et d'Ethereum Classic en deux systèmes concurrents.

<DocLink to="/dao/">
  Organisations autonomes décentralisées (DAO)
</DocLink>

### Plateforme d'échanges décentralisés (DEX) {#dex}

Type de [DApp](#dapp) qui vous permet d'échanger des jetons avec des pairs sur le réseau. Vous avez besoin d'[ethers](#ether) pour les utiliser (pour payer les [frais de transaction](#transaction-fee)). Elles ne sont soumises à aucune restriction géographique contrairement aux plateformes d'échanges centralisés et n'importe qui peut participer.

<DocLink to="/get-eth/#dex">
  Échanges décentralisés
</DocLink>

### Deed {#deed}

Voir [jeton non fongible (NFT)](#nft).

### Contrat de dépôt {#deposit-contract}

Passerelle de mise en jeu sur Ethereum. Le contrat de dépôt est un contrat intelligent sur Ethereum qui accepte les dépôts d'ETH et gère les soldes de validateur. Un validateur ne peut pas être activé sans le dépôt d'ETH dans ce contrat. Le contrat requiert des ETH et des données requises. Au nombre des données requises figurent la clé publique du validateur et la clé publique de retrait, signée par la clé privée du validateur. Ces données sont nécessaires pour qu'un validateur soit identifié et approuvé par le réseau de [preuve d'enjeu](#pos).

### DeFi {#defi}

Abréviation de « Decentralized Finance » (finance décentralisée), vaste catégorie d'[dApps](#dapp) visant à fournir des services financiers sur toute la blockchain, sans aucun intermédiaire et de sorte que toute personne ayant une connexion Internet puisse participer.

<DocLink to="/defi/">
  Finance décentralisée (DeFi)
</DocLink>

### Difficulté {#difficulty}

Paramétrage qui, dans les réseaux de [preuve de travail](#pow), contrôle, à l'échelle du réseau, le nombre de calculs moyens nécessaire pour trouver un nonce valide. La difficulté est représentée par le nombre de zéros de tête requis dans le hachage du bloc qui en résultat pour qu'il soit considéré comme valide. Ce concept est obsolète dans Ethereum depuis la transition vers la preuve d'enjeu.

### Bombe de difficulté {#difficulty-bomb}

Augmentation exponentielle planifiée du paramètre de [difficulté](#difficulty) de la [preuve de travail](#pow) qui a été conçue pour inciter à la transition vers la [preuve d'enjeu](#pos), réduisant les possibilités d'une [fourche](#hard-fork). La bombe de difficulté est devenue obsolète avec la [transition vers la preuve d'enjeu](/roadmap/merge).

### Signature numérique {#digital-signatures}

Courte chaîne de données qu'un utilisateur produit pour un document en utilisant une [clé privée](#private-key) afin que quiconque ayant la [clé publique](#public-key) correspondante, la signature et le document puisse vérifier (1) que le document a bien été « signé » par le propriétaire de cette clé privée particulière et (2) que le document n'a pas été modifié après sa signature.

<Divider />

### Découverte {#discovery}

Procédé au cours duquel un noeud du réseau Ethereum trouve d'autres nœuds auxquels se connecter.

### Table d'empreintes numériques distribuée (DHT) {#distributed-hash-table}

Structure de données contenant des pairs `(key, value)`, utilisée par les nœuds du réseau Ethereum afin d'identifier les pairs auxquels se connecter et déterminer les protocoles qui seront utilisés sur cette communication.

### Double dépense {#double-spend}

Fourche délibérée de la blockchain, où un utilisateur doté d'une quantité suffisamment importante de puissance de minage/mise envoie une transaction entraînant le déplacement d'une monnaie hors chaîne (par exemple, une sortie en monnaie fiduciaire ou un achat hors chaîne) puis réorganise la blockchain pour supprimer cette transaction. Une double dépense réussie laisse à l'attaquant ses actifs sur et hors chaîne.

## E {#section-e}

### Algorithme de signature numérique à courbe elliptique (ECDSA) {#ecdsa}

Algorithme cryptographique utilisé par Ethereum pour garantir que les fonds ne peuvent être dépensés que par leurs propriétaires. C'est la méthode privilégiée pour créer des clés publiques et privées. Pertinent pour la génération [d'adresse](#address) de compte et la vérification de la [transaction](#transaction).

### Cryptage {#encryption}

Le cryptage de données est la conversion électronique en une forme illisible exceptée par le détenteur de la clé correspondante de décryptage.

### Entropie {#entropy}

En cryptographie, l'entropie désigne le manque de prévisibilité ou le niveau d'aléa. Lorsqu'ils génèrent des informations secrètes, comme les [clés privées](#private-key), les algorithmes s'appuient généralement sur une source d'entropie élevée pour garantir un résultat imprévisible.

### Période {#epoch}

Période de 32 [créneaux](#slot), chaque créneau étant de 12 secondes, totalisant 6,4 minutes. Les [comités](#committee) de validateurs sont remaniés lors de chaque période pour des raisons de sécurité. Chaque période représente une opportunité de [finaliser](#finality) la chaîne. Chaque validateur se voit attribuer de nouvelles responsabilités au début de chaque période.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Preuve d'enjeu
</DocLink>

### Equivocation (Ambiguïté) {#equivocation}

Envoi par un validateur de deux messages contradictoires. Un exemple simple pourrait résider dans l'envoi de deux transactions différentes avec les mêmes références. Un autre exemple pourrait consister en la proposition de deux blocs pour le même emplacement (ou pour le même créneau).

### Eth1 {#eth1}

« Eth1 » est un terme qui faisait référence au réseau principal Ethereum, c'est-à-dire la blockchain actuelle basée sur la preuve de travail. Ce terme a depuis été abandonné au profit de « couche d'exécution ». [En savoir plus sur ce changement de nom](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/roadmap/">
  En savoir plus sur les mises à niveau d'Ethereum
</DocLink>

### Eth2 {#eth2}

« Eth2 » est un terme qui faisait référence à un ensemble de mises à niveau du protocole Ethereum, notamment la transition d'Ethereum vers la preuve d'enjeu. Ce terme a depuis été abandonné au profit de « couche de consensus ». [En savoir plus sur ce changement de nom](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/roadmap/">
  En savoir plus sur les mises à niveau d'Ethereum
</DocLink>

### Proposition d'amélioration d'Ethereum (EIP) {#eip}

Document de conception visant à informer la communauté Ethereum qui décrit une nouvelle fonctionnalité proposée, ses processus ou son environnement (voir [ERC](#erc)).

<DocLink to="/eips/">
  Introduction aux EIP
</DocLink>

### Service de Nom d'Ethereum (ENS) {#ens}

Le registre ENS est un [contrat](#smart-contract) central unique qui fournit une correspondance entre des noms de domaine et des propriétaires et des résolveurs, comme décrit dans l'[EIP](#eip) 137.

[Plus d'infos sur ens.domains](https://ens.domains)

### Client d'exécution {#execution-client}

Les clients d'exécution (auparavant appelés « clients Eth1 »), tels que Besu, Erigon, Go-Ethereum (Geth) ou Nethermind, sont chargés du traitement et de la diffusion des transactions, ainsi que de la gestion de l'état d'Ethereum. Ils exécutent les calculs pour chaque transaction en utilisant la [machine virtuelle Ethereum](#evm) pour s'assurer que les règles du protocole sont respectées.

### Couche d'exécution {#execution-layer}

La couche d'exécution d'Ethereum est le réseau des [clients d'exécution](#execution-client).

### Compte externe (EOA) {#eoa}

Les comptes externes (EOA) sont des [comptes](#account) contrôlés par les [clés privées](#private-key), généralement générées en utilisant une [phrase de récupération](#hd-wallet-seed). Contrairement aux contrats intelligents, les comptes externes sont des comptes ne disposant d'aucun code associé. Généralement, ces comptes sont gérés avec un [portefeuille](#wallet).

### Demande de commentaires Ethereum (ERC) {#erc}

Libellé donné à certaines [EIP](#eip) qui visent à définir une norme spécifique d'utilisation d'Ethereum.

<DocLink to="/eips/">
  Introduction aux EIP
</DocLink>

### Ethash {#ethash}

Algorithme de [preuve de travail](#pow) qui a été utilisé sur Ethereum avant de passer à [preuve d'enjeu](#pos).

[En savoir plus](/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethash)

### Ether {#ether}

Cryptomonnaie native utilisée par l'écosystème Ethereum, qui couvre les coûts de [gaz](#gas) lors de l'exécution des transactions. S'écrit également sous la forme ETH ou avec son symbole Ξ qui est le caractère grec Xi en majuscule.

<DocLink to="/eth/">
  La monnaie de notre avenir numérique
</DocLink>

### Événements {#events}

Permet d'utiliser les dispositifs de journalisation de l'[EVM](#evm). Les [DApp](#dapp) peuvent repérer les événements et les utiliser pour déclencher des rappels JavaScript dans l'interface utilisateur.

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

Service exécuté via un [contrat intelligent](#smart-contract), qui distribue des fonds sous la forme d'ethers de test gratuits pouvant être utilisés sur un réseau de test.

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

Algorithme utilisé pour identifier la tête de la blockchain. Sur la couche d'exécution, la tête de la chaîne est identifiée comme celle qui présente la plus grande difficulté totale. Cela signifie que la véritable tête de la chaîne est celle qui a nécessité le plus de travail pour être minée. Sur la couche de consensus, l'algorithme observe l'accumulation des attestations en provenance des validateurs ([LMD_GHOST](#lmd-ghost)).

### Preuve de fraude {#fraud-proof}

Modèle de sécurité pour certaines solutions de [couche 2](#layer-2) où, pour gagner en rapidité, les transactions sont regroupées en lots ([rollups](#rollups)) et soumises sur Ethereum en une seule transaction. Les transactions sont supposées être valides, mais peuvent être contestées si une fraude est suspectée. Une preuve de fraude exécutera alors la transaction pour vérifier l'existence d'une fraude. Cette méthode augmente le nombre de transactions possibles tout en maintenant le niveau de sécurité. Certains [rollups](#rollups) utilisent des [preuves de validité](#validity-proof).

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

Version abrégée de « Go Ethereum ». L'une des implémentations les plus importantes du protocole Ethereum, programmée en Go.

[Plus d'infos sur geth.ethereum.org](https://geth.ethereum.org/)

### Gwei {#gwei}

Abréviation de Gigawei, unité de l'[ether](#ether) couramment utilisée pour attribuer un prix au [gaz](#gas). 1 Gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> Gwei = 1 ether.

<Divider />

## H {#section-h}

### Fourche majeure {#hard-fork}

Divergence permanente dans la [blockchain](#blockchain), aussi appelée modification de fourche majeure. Elle se produit habituellement lorsque les nœuds non mis à niveau ne peuvent pas valider les blocs créés par les nœuds mis à niveau qui appliquent des [règles de consensus](#consensus-rules) plus récentes. À ne pas confondre avec une fourche, une fourche mineure, une fourche logicielle ou une fourche Git.

### Empreinte numérique {#hash}

Empreinte de longueur fixe d'intrants de taille variable, produite par une fonction de hachage. (Voir [Keccak-256](#keccak-256)).

### Puissance de hachage {#hash-rate}

Nombre de calculs par seconde réalisé par les ordinateurs minant sur le réseau.

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

Structure réseau destinée à optimiser la sollicitation d'informations à travers la [blockchain](#blockchain) en fournissant un chemin efficace vers sa source de stockage.

### Protocole d'échange d'adresses de clients (ICAP) {#icap}

Encodage d'adresse Ethereum partiellement compatible avec l'encodage du numéro de compte bancaire international (IBAN), offrant un encodage polyvalent, contrôlé et interopérable pour les adresses Ethereum. Les adresses ICAP utilisent un nouveau code de pseudo-pays IBAN - XE signifiant « eXtended Ethereum », comme utilisé dans les monnaies non juridictionnelles (par exemple, XBT, XRP, XCP).

### Ice Age {#ice-age}

[Fourche majeure](#hard-fork) d'Ethereum au bloc 200 000 visant à introduire une augmentation exponentielle de la [difficulté](#difficulty) (aussi appelée [bombe de difficulté](#difficulty-bomb)), motivant une transition vers la [preuve d'enjeu](#pos).

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

[Transaction](#transaction) envoyée depuis un [compte de contrat](#contract-account) vers un autre compte de contrat ou vers un [compte externe (EOA)](#eoa) (voir [message](#message)).

<Divider />

### Émission

Frappe de nouveaux ethers pour récompenser la proposition de bloc, l'attestation et la dénonciation.

## K {#section-k}

### Fonction de dérivation de clé (KDF) {#kdf}

Aussi appelée « algorithme d'étirement de mot de passe », elle est utilisée par les formats [keystore](#keystore-file) pour protéger des attaques par force brute, par dictionnaire et de table arc-en-ciel sur le chiffrement des phrases de sécurité, en hachant celles-ci de façon répétée.

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

Type spécial de [contrat](#smart-contract) qui n'a ni fonction de paiement, ni fonction de secours, ni stockage de données. Une bibliothèque ne peut donc ni recevoir ni détenir d'ethers, ni stocker des données. Elle sert de code déployé au préalable que d'autres contrats peuvent appeler pour obtenir un calcul en lecture seule.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Bibliothèques de contrats intelligents
</DocLink>

### Client léger {#light-client}

Client Ethereum qui ne stocke aucune copie locale de la [blockchain](#blockchain) ou qui ne valide aucun bloc ni aucune [transaction](#transaction). Il offre les fonctions d'un [portefeuille](#wallet), et peut créer et diffuser des transactions.

<Divider />

### LMD_GHOST {#lmd-ghost}

[L'algorithme de sélection de fourche](#fork-choice-algorithm) utilisé par les clients de consensus Ethereum pour identifier la tête de la chaîne. LMD-GHOST est l'acronyme de « dernier message produit - sous-arbre le plus lourd et gourmand observé » (Latest Message Driven Greediest Heaviest Observed SubTree), ce qui signifie que la tête de la chaîne est le bloc avec la plus grande accumulation d'[attestations](#attestation) de son histoire.

## M {#section-m}

### Réseau principal {#mainnet}

Appelé « mainnet » en anglais (pour « main network »), il s'agit de la [blockchain](#blockchain) principale du réseau public Ethereum. De vrais ETH, une véritable valeur et des conséquences réelles. Aussi connu sous le nom de « couche 1 » lors des discussions sur les solutions d'évolutivité de la [couche 2](#layer-2). (Voir aussi [réseau de test](#testnet)).

<DocLink to="/developers/docs/networks/">
  Réseaux Ethereum
</DocLink>

### Mémorivore {#memory-hard}

Les fonctions mémorivores sont des processus qui connaissent une diminution drastique de la vitesse ou de la faisabilité lorsque la quantité de mémoire disponible diminue même légèrement. L'algorithme de minage Ethereum [Ethash](#ethash) en est un exemple.

### Arbre de Merkle Patricia {#merkle-patricia-tree}

Structure des données utilisée dans Ethereum pour stocker efficacement les paires clés-valeurs.

### Message {#message}

[Transaction interne](#internal-transaction) qui n'est jamais sérialisée et qui est uniquement envoyée dans l'[EVM](#evm).

### Appel de message {#message-call}

Acte de transférer un [message](#message) d'un compte à un autre. Si le compte de destination est associé au code de l'[EVM](#evm), alors celle-ci sera démarrée avec l'état de cet objet et le message sera traité.

### Metropolis {#metropolis}

Troisième phase de développement d'Ethereum, lancée en octobre 2017.

### Minage {#mining}

Processus de hachage répétitif d'un en-tête de bloc lors de l'incrémentation d'un [nonce](#nonce) jusqu'à ce que le résultat contienne un nombre arbitraire de zéros binaires de tête. C'est le processus par lequel de nouveaux [blocs](#block) sont ajoutés à une [blockchain](#blockchain) de preuve de travail. Voilà comment Ethereum était sécurisé avant de passer à [la preuve d'enjeu](#pos).

### Mineur {#miner}

[Nœud](#node) du réseau qui trouve une [preuve de travail](#pow) valide pour de nouveaux blocs, par passes de hachage successives (voir [Ethash](#ethash)). Les mineurs ne font plus partie d'Ethereum - ils ont été remplacés par des validateurs lorsque Ethereum est passé à la [la preuve d'enjeu](#pos).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Minage
</DocLink>

### Frapper {#mint}

Le frappage est le processus de création de nouveaux jetons et de leur mise en circulation afin qu'ils puissent être utilisés. C'est un mécanisme décentralisé pour créer un nouveau jeton sans participation de l'autorité centrale.

<Divider />

## N {#section-n}

### Réseau {#network}

Lorsque le terme fait référence au réseau Ethereum, réseau P2P qui propage les transactions et les blocs à chaque nœud Ethereum (participant au réseau).

<DocLink to="/developers/docs/networks/">
  Réseaux
</DocLink>

### Puissance de hachage du réseau {#network-hashrate}

[Puissance de hachage](#hashrate) collective produite par un réseau entier de minage. Le minage sur Ethereum s'est terminé lorsque Ethereum est passé à la [preuve d'enjeu](#pos).

### Jeton non fongible (NFT) {#nft}

Également Norme de jetonconnu sous le nom d'« acte de propriété » ou « deed » , il s'agit d'une norme de jeton introduite par la proposition ERC-721. Les NFT peuvent être suivis et échangés, mais chaque jeton est unique et distinct. Ils ne sont pas interchangeables comme les [jetons ERC-20](#token-standard). Les NFT peuvent être des preuves de propriété d'actifs numériques ou physiques.

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

En cryptographie, valeur qui ne peut être utilisée qu'une seule fois. Le nonce d'un compte est un compteur de transactions propre à chaque compte, qui est utilisé pour prévenir les attaques par répétition.

<Divider />

## O {#section-o}

### bloc ommer (oncle) {#ommer}

Quand un [mineur](#miner) de preuve de travail trouve un [bloc](#block) valide, un autre mineur peut avoir publié un bloc concurrent, qui est ajouté en premier au sommet de la blockchain. Ce bloc valide, mais obsolète, peut être inclus par des blocs plus récents en tant que _bloc oncle_ et faire l'objet d'une récompense partielle. On utilise de préférence le terme « ommer », plus neutre, pour désigner le frère ou la sœur d'un bloc parent, mais on parle aussi parfois d'« oncle ». Ceci était pertinent pour Ethereum lorsqu'il était un réseau à [preuve de travail](pow), mais les blocs oncle ne sont pas une fonctionnalité de la [preuve d'enjeu](#pos) sur Ethereum, car un seul proposant de bloc est sélectionné à chaque créneau.

### Rollup optimiste {#optimistic-rollup}

[Rollup](#rollups) (ou regroupement) de transactions qui utilise les [preuves de fraude](#fraud-proof) pour permettre un débit de transactions plus élevé sur la [couche 2](#layer-2) tout en bénéficiant de la sécurité apportée par le [réseau principal](#mainnet) (couche 1). Contrairement à [Plasma](#plasma), solution similaire sur la couche 2, les rollups optimistes peuvent gérer des transactions plus complexes, à savoir tout ce qui est possible au sein de l'[EVM](#evm). Ils rencontrent des problèmes de latence par rapport aux [rollups ZK](#zk-rollups), car une transaction peut être contestée par l'intermédiaire de la preuve de fraude.

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Rollups optimistes
</DocLink>

### Oracle {#oracle}

Les oracles sont des ponts entre la [blockchain](#blockchain) et le monde réel. Ils agissent comme des [API](#api) sur la blockchain qui peuvent être interrogés pour obtenir des informations et utilisés dans des [contrats intelligents](#smart-contract).

<DocLink to="/developers/docs/oracles/">
  Oracle
</DocLink>

<Divider />

## P {#section-p}

### parity {#parity}

Une des implémentations interopérables les plus importantes du logiciel client Ethereum.

### pair {#peer}

Ordinateurs connectés exécutant le logiciel client Ethereum qui ont des copies identiques de la [blockchain](#blockchain).

### Réseau de pair-à-pair {#peer-to-peer-network}

Réseau d'ordinateurs ([pairs](#peer)) collectivement capables d'exécuter des fonctionnalités sans avoir besoin de services centralisés, basés sur un serveur.

### Plasma {#plasma}

Solution de mise à l'échelle hors chaîne qui utilise des [preuves de fraude](#fraud-proof), comme les [rollups optimistes](#optimistic-rollups). Plasma se limite aux transactions simples comme les échanges et transferts de jetons simples.

<DocLink to="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### Clé privée (clé secrète) {#private-key}

Nombre secret qui permet aux utilisateurs Ethereum de prouver la propriété d'un compte ou de contrats en produisant une signature numérique (voir [clé publique](#public-key), [adresse](#address), [ECDSA](#ecdsa)).

### Chaîne privée {#private-chain}

Une blockchain est dite privée si on y accède en y étant autorisé, par opposition à une blockchain publique.

### Preuve d'enjeu (PoS) {#pos}

Méthode par laquelle un protocole de blockchain de cryptomonnaie vise à atteindre un [consensus](#consensus) distribué. La PoS demande aux utilisateurs de prouver qu'ils sont propriétaires d'une certaine quantité de cryptomonnaie (leur « mise » sur le réseau) afin de pouvoir participer à la validation des transactions.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Preuve d'enjeu
</DocLink>

### Preuve de travail (PoW) {#pow}

Donnée (la preuve) qui nécessite des calculs significatifs pour être trouvée.

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  Preuve de travail
</DocLink>

### clé publique {#public-key}

Nombre dérivé d'une [clé privée](#private-key) via une fonction à sens unique, qui peut être partagé publiquement et utilisé par n'importe qui pour vérifier une signature numérique créée avec la clé privée correspondante.

<Divider />

## R {#section-r}

### Reçu {#receipt}

Données renvoyées par un client Ethereum pour représenter le résultat d'une [transaction](#transaction) particulière, y compris une [empreinte numérique](#hash) de la transaction, son numéro de [bloc](#block), la quantité de [gaz](#gas) utilisée et, en cas de déploiement d'un [contrat intelligent](#smart-contract), l'[adresse](#address) du contrat.

### Attaque par réentrance {#re-entrancy-attack}

Attaque qui consiste en un contrat d'attaquant qui appelle une fonction du contrat de la victime de telle façon que, pendant l'exécution, la victime rappelle le contrat de l'attaquant de façon récursive. Ce type d'attaque peut se traduire par un vol de fonds, en faisant par exemple en sorte de contourner des parties du contrat de la victime qui mettent à jour les soldes ou qui comptabilisent les montants retirés.

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  Réentrance
</DocLink>

### Récompense {#reward}

Quantité d'ethers inclus dans chaque nouveau bloc en tant que récompense du réseau au [mineur](#miner) qui a trouvé la solution de la [preuve de travail](#pow).

### Préfixe de longueur récursive (RLP) {#rlp}

Norme d'encodage conçue par les développeurs Ethereum pour encoder et sérialiser des objets (structure de données) de complexité et de longueur arbitraires.

### Rollups {#rollups}

Type de solution de mise à l'échelle de [couche 2](#layer-2) qui regroupe plusieurs transactions et les soumet à la [chaîne principale Ethereum](#mainnet) en une seule transaction. Cela permet de réduire les frais de [gaz](#gas) et d'augmenter le débit des [transactions](#transaction). Il existe des rollups optimistes et des rollups ZK qui utilisent différentes méthodes de sécurité pour offrir ces avantages en termes d'évolutivité.

<DocLink to="/developers/docs/scaling/#rollups">
  rollups
</DocLink>

<Divider />

### RPC {#rpc}

L'**appel de procédure à distance (RPC)** est un protocole qu'un programme peut utiliser pour solliciter un service auprès d'un programme situé sur un autre ordinateur d'un réseau dont il n'a pas besoin de connaître les détails

## S {#section-s}

### Algorithme de hachage sécurisé (SHA) {#sha}

Famille de fonctions de hachage cryptographique publiées par le National Institute of Standards and Technology (NIST) aux États-Unis.

### Serenity {#serenity}

Étape du développement d'Ethereum qui a initié un ensemble de mises à jour et de mises à l'échelle en termes de durabilité, précédemment appelées 'Ethereum 2.0', ou 'Eth2'.

<DocLink to="/roadmap/">
  Mises à niveau d'Ethereum
</DocLink>

### Sérialisation {#serialization}

Procédé de conversion d'une structure de données en une séquence d'octets.

### Fragment / chaîne de fragments {#shard}

Les chaînes de fragments sont des portions de la blockchain complète susceptibles de se trouver sous la responsabilité de sous-ensembles de validateurs. Les chaînes de fragments offriront un débit de transaction accru pour Ethereum et amélioreront la disponibilité des données pour les solutions de [couche 2](#layer-2) comme les [rollups optimistes](#optimistic-rollups) et les [rollups ZK](#zk-rollups).

<DocLink to="/roadmap/danksharding">
  Danksharding
</DocLink>

### Chaînes latérales {#sidechain}

Solution de mise à l'échelle qui utilise une chaîne séparée avec des [règles de consensus](#consensus-rules) différentes, souvent plus rapides. Un pont est nécessaire pour connecter ces chaînes latérales au [réseau principal](#mainnet). Les [rollups](#rollups) utilisent également les chaînes latérales, mais ils fonctionnent plutôt en collaboration avec le [réseau principal](#mainnet).

<DocLink to="/developers/docs/scaling/sidechains/">
  Chaines latérales
</DocLink>

### Signature {#signing}

Prouve cryptographiquement qu'une transaction a été approuvée par le détenteur d'une clé privée spécifique.

### Singleton {#singleton}

Terme de programmation informatique qui décrit un objet dont il ne peut exister qu'une seule instance.

### Délesteur {#slasher}

Un délesteur est une entité qui scanne les attestations à la recherche d'infractions passibles de sanctions. Les sanctions sont diffusées sur le réseau, et le proposant en consigne la preuve dans le prochain bloc. Le proposant reçoit alors une récompense pour avoir sanctionné le validateur malveillant.

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

Acronyme signifiant « argument de connaissance succinct et non interactif » (Succint Non-interactive Argument of Knowledge). Un SNARK est un type de [preuve de connaissance zéro](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollups ZK
</DocLink>

### Fourche mineure {#soft-fork}

Divergence dans une [blockchain](#blockchain) qui se produit lorsque les [règles de consensus](#consensus-rules) changent. Contrairement à une [fourche majeure](#hard-fork), une fourche mineure est rétro-compatible ; les nœuds mis à jour peuvent valider les blocs créés par des nœuds non mis à jour tant qu'ils suivent les nouvelles règles de consensus.

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

### groupe d'enjeux {#staking-pool}

Ensemble ETH de plus d'un validateur Ethereum utilisé pour atteindre les 32 ET nécessaires pour activer un ensemble de clés de validation. Un opérateur de nœud utilise ces clés pour participer au consensus et les [récompenses de bloc](#block-reward) sont réparties entre les validateurs participants. Les groupe d'enjeu ou la mise en jeu délégué ne sont pas natifs du protocole Ethereum, mais de nombreuses solutions ont été construites par la communauté.

<DocLink to="/staking/pools/">
  Mise en jeu mutualisée
</DocLink>

### STARK {#stark}

Acronyme qui signifie « argument de connaissance transparent et évolutif » (Scalable Transparent Argument of Knowledge). Un STARK est un type de [preuve de connaissance zéro](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollups ZK
</DocLink>

### État {#state}

Image instantanée de tous les soldes et métadonnées présents à un moment donné sur la blockchain, qui renvoie normalement à la condition d'un bloc particulier.

### Canaux d'état {#state-channels}

Solution de [couche 2](#layer-2) qui implique la mise en place d'un canal entre les participants pour qu'ils puissent effectuer des transactions librement et à moindre coût. Seule une [transaction](#transaction) est envoyée au [réseau principal](#mainnet) pour configurer et fermer le canal. Cela permet un débit de transactions très élevé, mais repose sur la connaissance du nombre de participants au départ et le blocage de fonds.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  canaux d'état
</DocLink>

### Supermajorité {#supermajority}

La supermajorité est un terme qui désigne un nombre supérieur à 2/3 (66 %) de l'ether total mis en jeu pour sécuriser Ethereum. Un vote à la supermajorité est nécessaire pour que les blocs soient [finalisés](#finality) sur la chaîne phare.

### synchronisation {#syncing}

Processus de téléchargement de la dernière version complète d'une blockchain sur un nœud.

### Comité de synchronisation {#sync-committee}

Un comité de synchronisation est un groupe de [validateurs](#validator) sélectionnés aléatoirement qui est actualisé toutes les 27 heures environ. Son rôle est d'ajouter leurs signatures à des en-têtes de blocs valides. Les comités de synchronisation permettent aux [clients légers](#light-client) de garder une trace de la tête de la blockchain sans avoir besoin d'accéder à l'ensemble des validateurs.

### Szabo {#szabo}

Unité de l'[ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

[Fourche majeure](#hard-fork) de la blockchain Ethereum, qui s'est produite au bloc 2 463 000 pour modifier le calcul du [gaz](#gas) pour certaines opérations inécessitant beaucoup d'E/S et pour effacer l'état accumulé suite à une attaque par déni de service, qui exploitait le faible coût en gaz de ces opérations.

### Difficulté Totale Terminale (TTD) {#terminal-total-difficulty}

La difficulté totale est la somme de la difficulté de minage Ethash pour tous les blocs jusqu'à un point spécifique de la blockchain. La difficulté totale terminale est une valeur spécifique de la difficulté totale qui était utilisée comme déclencheur pour les clients d'exécution afin d'éteindre leurs fonctions de minage et permettre au réseau de basculer vers la preuve d'enjeu.

### réseau de test {#testnet}

Aussi appelé « testnet » (de l'anglais « test network »), il s'agit d'un réseau utilisé pour simuler le comportement du réseau principal Ethereum (voir [réseau principal](#mainnet)).

<DocLink to="/developers/docs/networks/#ethereum-testnets">
  réseaux de test
</DocLink>

### jeton {#token}

Bien virtuel négociable défini dans les contrats intelligents sur la blockchain Ethereum.

### Norme de jeton {#token-standard}

Introduit par la proposition ERC-20, il fournit une structure normalisée de [contrat intelligent](#smart-contract) pour les jetons fongibles. D'autres standards ERC s'appliquent aux jetons non-fongibles ou [NFT](#nft).

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  Norme de jeton ERC-20
</DocLink>

### Transaction {#transaction}

Données enregistrées dans la blockchain Ethereum signées par un [compte](#account) émetteur, ciblant une [adresse](#address) spécifique. La transaction contient des métadonnées comme la [limite de gaz](#gas-limit).

<DocLink to="/developers/docs/transactions/">
  Transactions
</DocLink>

### Frais de transaction {#transaction-fee}

Frais dont il faut s'acquitter à chaque utilisation du réseau Ethereum, Exemple : envoi de fonds depuis votre [portefeuille](#wallet) ou interaction avec une [dApp](#dapp) (échange de jetons ou achat d'un objet de collection, etc.). Considérez-les comme des frais de service. Ils évolueront en fonction de l'occupation du réseau. Ceci est dû au fait que les [validateurs](#validator), les personnes chargées de traiter votre transaction, sont susceptibles de donner la priorité aux transactions dont les commissions sont plus élevées. La congestion du réseau fait grimper les prix.

Au niveau technique, vos frais de transaction se rapportent à la quantité de [gaz](#gas) que votre transaction requiert.

La réduction des frais de transaction est actuellement au coeur de l'actualité. Voir [couche 2](#layer-2).

### Absence de confiance {#trustlessness}

Capacité d'un réseau à effectuer des transactions sans qu'aucune des parties impliquées n'ait besoin de faire confiance à un tiers.

### Turing-complet {#turing-complete}

Concept nommé d'après le mathématicien et informaticien anglais Alan Turing. Un système de règles de traitement de données (instructions d'un ordinateur, langage de programmation ou automate cellulaire) est dit « Turing-complet » ou « universel sur le plan informatique » s'il a au moins le pouvoir des machines de Turing.

<Divider />

## V {#section-v}

### Validateur {#validator}

Dans un système de [preuve d'enjeu](#pos), [nœud](#node) chargé du stockage des données, du traitement des transactions et de l'ajout de nouveaux blocs à la blockchain. Pour activer le logiciel validateur, vous devez pouvoir [mettre en jeu](#staking) 32 ETH.

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Preuve d'enjeu
</DocLink>
<DocLink to="/staking/">
  Mise en jeu sur Ethereum
</DocLink>

### Cycle de vie du validateur {#validator-lifecycle}

Séquence des états dans lesquels un validateur peut exister. Elle comprend :

- déposé : Au moins 32 ETH ont été déposés sur le [contrat de dépôt](#deposit-contract) par le validateur
- en attente : le validateur est dans la file d'activation et attend d'être accepté dans le réseau par vote des validateurs existants
- actif : en train d'attester et de proposer des blocs
- dénoncé : le validateur s'est mal comporté et a été exclu
- sortant : le validateur a été marqué pour quitter le réseau, soit volontairement, soit parce qu'il a été éjecté.

### Preuve de validité {#validity-proof}

Modèle de sécurité pour certaines solutions de [couche 2](#layer-2) dans lequel, pour augmenter la vitesse, les transactions sont regroupées en lots ([rollups](/#rollups)) et soumises à Ethereum en une seule transaction. Le calcul des transactions se fait hors chaîne et est ensuite fourni à la chaîne principale avec une preuve de leur validité. Cette méthode augmente le nombre de transactions possibles tout en maintenant le niveau de sécurité. Certains [rollups](#rollups) utilisent des [preuves de fraude](#fraud-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Rollups ZK
</DocLink>

### Validium {#validium}

Solution hors chaîne qui utilise les [preuves de validité](#validity-proof) pour augmenter le débit des transactions. Contrairement à celles des [rollups ZK](#zk-rollup), les données de validium ne sont pas stockées sur la couche 1 du [réseau principal](#mainnet).

<DocLink to="/developers/docs/scaling/validium/">
  Validité
</DocLink>

### Vyper {#vyper}

Langage de programmation pointu dont la syntaxe est similaire à celle de Python. Conçu pour se rapprocher d'un langage purement fonctionnel. Créé par Vitalik Buterin.

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

Troisième version du web. Terme proposé pour la première fois par le Dr Gavin Wood, Web3 représente une nouvelle vision et une nouvelle orientation pour les applications web : passant d'applications gérées et détenues de façon centralisée à des applications construites sur des protocoles décentralisés (voir [dApp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 et Web3
</DocLink>

### Wei {#wei}

Plus petite unité de l'[ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### Adresse zéro {#zero-address}

Une adresse Ethereum, composée entièrement de zéros, qui est fréquemment utilisée comme adresse pour retirer des jetons de la circulation propriétaire. Une distinction est établie entre les jetons formellement supprimés de l'index d'un contrat intelligent via la méthode burn() et ceux envoyés à cette adresse.

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

_Fournis pour partie par [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) (Maîtriser Ethereum) par [Andreas M. Antonopoulos et Gavin Wood](https://ethereumbook.info), sous licence CC-BY-SA_

<Divider />

## Contribuer à cette page {#contribute-to-this-page}

Il manque quelque chose ? Vous avez remarqué quelque chose d'incorrect ? Aidez-nous à améliorer cette page en contribuant à ce glossaire sur GitHub !

[En savoir plus sur la façon de contribuer](/contributing/adding-glossary-terms)
