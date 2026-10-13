---
title: Norme de coffre-fort tokenisé asynchrone ERC-7540
description: Une extension de l'ERC-4626 qui ajoute des flux de dépôt et de rachat asynchrones pour les coffres-forts tokenisés.
lang: fr
---

## Introduction {#introduction}

L'ERC-7540 étend la [norme de coffre-fort tokenisé ERC-4626](/developers/docs/standards/tokens/erc-4626/) en ajoutant la prise en charge des flux de dépôt et de rachat asynchrones. Il introduit un modèle de demande-puis-réclamation : les utilisateurs soumettent d'abord une demande (verrouillant leurs actifs ou leurs parts), puis réclament le résultat une fois que le coffre-fort l'a traité.

Cela est nécessaire lorsqu'un coffre-fort ne peut pas effectuer de règlement instantanément en une seule transaction, par exemple :

- Les protocoles d'actifs du monde réel (RWA) tels que les bons du Trésor tokenisés, le crédit privé et d'autres actifs avec des cycles de règlement à J+1 ou J+2
- Le prêt sous-collatéralisé où les évaluations de crédit se font hors chaîne
- Les stratégies de coffre-fort inter-chaîne où l'utilisation de ponts introduit des délais
- Les jetons de staking liquide (LST) avec des périodes de déblocage

Les coffres-forts peuvent choisir d'être asynchrones uniquement sur les dépôts, uniquement sur les rachats, ou les deux. Cette flexibilité permet aux développeurs de coffres-forts d'ajouter des flux asynchrones uniquement là où la stratégie sous-jacente l'exige, tout en gardant l'autre côté synchrone.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de lire d'abord les informations sur les [normes de jeton](/developers/docs/standards/tokens/), l'[ERC-20](/developers/docs/standards/tokens/erc-20/) et l'[ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 vs ERC-7540 {#comparison}

Dans l'ERC-4626, un dépôt se règle de manière atomique : l'investisseur envoie des actifs et reçoit des parts en retour lors d'une seule transaction.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

L'ERC-7540 divise cela en deux étapes. L'investisseur appelle d'abord `requestDeposit()` pour verrouiller les actifs, puis attend que le gestionnaire du coffre-fort traite la demande. Une fois satisfaite, l'investisseur appelle `deposit()` pour réclamer ses parts. Les taux de change sont déterminés au moment de la réalisation, et non au moment de la demande.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

Le flux de rachat fonctionne de la même manière : `requestRedeem()` verrouille les parts, et une fois la demande satisfaite, l'investisseur appelle `redeem()` pour réclamer les actifs.

## Fonctions et caractéristiques de l'ERC-7540 {#body}

L'ERC-7540 hérite de l'interface complète de l'ERC-4626 mais réutilise `deposit`/`mint`/`withdraw`/`redeem` comme fonctions de réclamation. Les nouvelles fonctions `requestDeposit` et `requestRedeem` gèrent l'étape de demande initiale.

Chaque demande passe par trois états : en attente (soumise, en attente de traitement), réclamable (satisfaite et valorisée), et réclamée (l'investisseur a récupéré ses parts ou ses actifs).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### Flux de demande de dépôt {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Transfère `assets` depuis `owner` vers le coffre-fort et soumet une demande de dépôt. L'adresse `controller` reçoit le contrôle de la demande. Renvoie un `requestId` identifiant le lot de demandes.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Renvoie le montant de `assets` dans une demande de dépôt en attente (pas encore réclamable) pour le `controller` et le `requestId` donnés.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Renvoie le montant de `assets` dans une demande de dépôt réclamable (satisfaite mais pas encore réclamée) pour le `controller` et le `requestId` donnés.

#### Réclamer des dépôts {#claiming-deposits}

Une fois qu'une demande de dépôt devient réclamable, l'utilisateur appelle la fonction standard ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) ou [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) pour réclamer ses parts. Dans l'ERC-7540, ces fonctions ne transfèrent plus d'actifs (cela s'est déjà produit au moment de la demande). Elles se contentent de frapper des parts pour le destinataire.

### Flux de demande de rachat {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Verrouille `shares` depuis `owner` et soumet une demande de rachat. L'adresse `controller` reçoit le contrôle de la demande.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Renvoie le montant de `shares` dans une demande de rachat en attente pour le `controller` et le `requestId` donnés.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Renvoie le montant de `shares` dans une demande de rachat réclamable pour le `controller` et le `requestId` donnés.

#### Réclamer des rachats {#claiming-redemptions}

Une fois qu'une demande de rachat devient réclamable, l'utilisateur appelle la fonction standard ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) ou [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) pour réclamer ses actifs.

### Gestion des opérateurs {#operator-management}

L'ERC-7540 inclut un modèle d'opérateur (issu de l'[ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)) qui permet à des tiers de gérer les demandes au nom d'un utilisateur.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Approuve ou révoque `operator` pour agir au nom de `msg.sender` pour les demandes de dépôt/rachat et les réclamations.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Renvoie si `operator` est approuvé pour agir au nom de `controller`.

### ID de demande {#request-ids}

Les ID de demande différencient les différents lots de demandes. Toutes les demandes partageant le même `requestId` sont fongibles : elles transitent entre les états ensemble et reçoivent le même taux de change.

Lorsqu'un coffre-fort renvoie `requestId = 0` pour toutes les demandes, seule l'adresse `controller` différencie l'état de la demande. Plusieurs demandes provenant du même contrôleur sont agrégées.

### Événements {#events}

#### Événement DepositRequest {#depositrequest-event}

DOIT être émis lorsqu'une demande de dépôt est soumise via [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### Événement RedeemRequest {#redeemrequest-event}

DOIT être émis lorsqu'une demande de rachat est soumise via [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### Événement OperatorSet {#operatorset-event}

DOIT être émis lorsqu'un opérateur est approuvé ou révoqué via [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Fonctions d'aperçu {#preview-functions}

Les fonctions d'aperçu doivent annuler uniquement pour les flux qui sont asynchrones, car le taux de change n'est pas connu tant que la demande n'est pas satisfaite. Dans un coffre-fort à dépôt asynchrone, `previewDeposit` et `previewMint` DOIVENT annuler, tandis que `previewRedeem` et `previewWithdraw` continuent de fonctionner comme dans l'ERC-4626 (et vice versa pour un coffre-fort à rachat asynchrone). Il s'agit d'une différence de comportement clé par rapport à l'ERC-4626.

## Complément d'information {#further-reading}

- [EIP-7540 : Coffres-forts tokenisés ERC-4626 asynchrones](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626 : Norme de coffre-fort tokenisé](https://eips.ethereum.org/EIPS/eip-4626)
- [Implémentation de l'ERC-7540 par OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)