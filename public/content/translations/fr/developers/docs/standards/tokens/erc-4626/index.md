---
title: "Norme de coffre-fort tokenisé ERC-4626"
description: "Une norme pour les coffres-forts générateurs de rendement."
lang: fr
---

## Introduction {#introduction}

L'ERC-4626 est une norme permettant d'optimiser et d'unifier les paramètres techniques des coffres-forts générateurs de rendement. Il fournit une API standard pour les coffres-forts tokenisés générateurs de rendement qui représentent des parts d'un seul jeton ERC-20 sous-jacent. L'ERC-4626 décrit également une extension facultative pour les coffres-forts tokenisés utilisant l'ERC-20, offrant des fonctionnalités de base pour le dépôt, le retrait de jetons et la lecture des soldes.

**Le rôle de l'ERC-4626 dans les coffres-forts générateurs de rendement**

Les marchés de prêt, les agrégateurs et les jetons intrinsèquement porteurs d'intérêts aident les utilisateurs à trouver le meilleur rendement sur leurs jetons crypto en exécutant différentes stratégies. Ces stratégies sont réalisées avec de légères variations, ce qui peut être source d'erreurs ou gaspiller des ressources de développement.

L'ERC-4626 dans les coffres-forts générateurs de rendement réduira l'effort d'intégration et débloquera l'accès au rendement dans diverses applications avec peu d'efforts spécialisés de la part des développeurs en créant des modèles d'implémentation plus cohérents et robustes.

Le jeton ERC-4626 est décrit en détail dans l'[EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Extension de coffre-fort asynchrone (ERC-7540)**

L'ERC-4626 est optimisé pour les dépôts et les rachats atomiques jusqu'à une certaine limite. Si la limite est atteinte, aucun nouveau dépôt ou rachat ne peut être soumis. Cette limitation ne fonctionne pas bien pour tout système de contrat intelligent avec des actions asynchrones ou des délais comme condition préalable à l'interface avec le coffre-fort (par exemple, les protocoles d'actifs du monde réel, les protocoles de prêt sous-collatéralisés, les protocoles de prêt inter-chaîne, les jetons de staking liquide (LST) ou les modules de sécurité d'assurance).

L'ERC-7540 étend l'utilité des coffres-forts ERC-4626 pour les cas d'utilisation asynchrones. L'interface existante du coffre-fort (`deposit`/`withdraw`/`mint`/`redeem`) est pleinement utilisée pour réclamer des requêtes asynchrones.

L'extension ERC-7540 est décrite en détail dans l'[ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Extension de coffre-fort multi-actifs (ERC-7575)**

Un cas d'utilisation manquant qui n'est pas pris en charge par l'ERC-4626 concerne les coffres-forts qui ont plusieurs actifs ou points d'entrée tels que les jetons de fournisseur de liquidité (LP). Ceux-ci sont généralement peu pratiques ou non conformes en raison de l'exigence de l'ERC-4626 d'être lui-même un ERC-20.

L'ERC-7575 ajoute la prise en charge des coffres-forts avec plusieurs actifs en externalisant l'implémentation du jeton ERC-20 de l'implémentation de l'ERC-4626.

L'extension ERC-7575 est décrite en détail dans l'[ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de lire d'abord les informations sur les [normes de jetons](/developers/docs/standards/tokens/) et l'[ERC-20](/developers/docs/standards/tokens/erc-20/).

## Fonctions et caractéristiques de l'ERC-4626 : {#body}

### Méthodes {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Cette fonction renvoie l'adresse du jeton sous-jacent utilisé pour le coffre-fort pour la comptabilité, le dépôt et le retrait.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Cette fonction renvoie le montant total des actifs sous-jacents détenus par le coffre-fort.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Cette fonction renvoie le montant de `shares` qui serait échangé par le coffre-fort pour le montant de `assets` fourni.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Cette fonction renvoie le montant de `assets` qui serait échangé par le coffre-fort pour le montant de `shares` fourni.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Cette fonction renvoie le montant maximum d'actifs sous-jacents qui peuvent être déposés en un seul appel [`deposit`](#deposit), avec les parts frappées pour le `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur dépôt au bloc actuel.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Cette fonction dépose `assets` de jetons sous-jacents dans le coffre-fort et accorde la propriété de `shares` à `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Cette fonction renvoie le montant maximum de parts qui peuvent être frappées en un seul appel [`mint`](#mint), avec les parts frappées pour le `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur frappe au bloc actuel.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Cette fonction frappe exactement `shares` parts de coffre-fort pour `receiver` en déposant `assets` de jetons sous-jacents.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Cette fonction renvoie le montant maximum d'actifs sous-jacents qui peuvent être retirés du solde `owner` avec un seul appel [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur retrait au bloc actuel.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Cette fonction brûle `shares` de `owner` et envoie exactement `assets` jeton du coffre-fort à `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Cette fonction renvoie le montant maximum de parts qui peuvent être rachetées du solde `owner` via un appel [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur rachat au bloc actuel.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Cette fonction rachète un nombre spécifique de `shares` de `owner` et envoie `assets` de jeton sous-jacent du coffre-fort à `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Renvoie le nombre total de parts de coffre-fort non rachetées en circulation.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Renvoie le montant total de parts de coffre-fort que le `owner` possède actuellement.

### Carte de l'interface {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Événements {#events}

#### Événement de dépôt {#deposit-event}

**DOIT** être émis lorsque des jetons sont déposés dans le coffre-fort via les méthodes [`mint`](#mint) et [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Où `sender` est l'utilisateur qui a échangé `assets` contre `shares`, et a transféré ces `shares` à `owner`.

#### Événement de retrait {#withdraw-event}

**DOIT** être émis lorsque des parts sont retirées du coffre-fort par un déposant dans les méthodes [`redeem`](#redeem) ou [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Où `sender` est l'utilisateur qui a déclenché le retrait et échangé `shares`, appartenant à `owner`, contre `assets`. `receiver` est l'utilisateur qui a reçu les `assets` retirés.

## Complément d'information {#further-reading}

- [EIP-4626 : Norme de coffre-fort tokenisé](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626 : Dépôt GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)