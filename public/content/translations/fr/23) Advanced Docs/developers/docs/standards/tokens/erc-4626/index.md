---
title: Norme de coffre-fort avec les jetons ERC-4626
description: Une norme pour les coffres-forts à rendement.
lang: fr
---

## Introduction {#introduction}

ERC-4626 est une norme pour optimiser et standardiser les paramètres techniques des coffres à rendement. Elle fournit une API standard pour les coffres à rendement tokenisé qui représentent les actions d'un seul jeton ERC-20 sous-jacent. L'ERC-4626 soulignent également une extension facultative pour les coffres à jetons utilisant l'ERC-20, offrant ainsi des fonctionnalités de base pour les dépôts, les retraits de jetons et la lecture des soldes.

**Le rôle de l’ERC-4626 dans les coffres à rendement**

Les marchés de prêts, les agrégateurs et les jetons intrinsèquement porteurs d'intérêts aident les utilisateurs à trouver le meilleur rendement pour leurs jetons de cryptomonnaie en exécutant différentes stratégies. Ces stratégies s'opèrent avec de légères variations, qui pourraient être source d'erreurs ou de perte de ressources de développement.

Les coffres de rendement ERC-4626 réduiront l'effort d'intégration et ouvriront l'accès au rendement de diverses applications avec peu d'efforts spécialisés de la part des développeurs, en créant des modèles d'implémentation plus cohérents et plus robustes.

Le jeton ERC-4626 est décrit dans les détails dans [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

## Pré-requis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire celles concernant [les normes des jetons](/developers/docs/standards/tokens/) et [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Fonctions et fonctionnalités ERC-4626 : {#body}

### Méthodes {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Cette fonction retourne l'adresse du jeton sous-jacent utilisé pour le coffre pour la comptabilité, le dépôt, le retrait.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Cette fonction retourne le montant total des actifs sous-jacents détenus dans le coffre.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Cette fonction retourne le montant de `shares` qui seraient échangées par le coffre pour le montant d'`assets` fourni.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Cette fonction retourne le montant d'`assets` qui seraient échangés par le coffre pour le montant de `shares` fourni.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Cette fonction retourne le montant maximal des actifs sous-jacents qui peuvent être déposés en un seul appel de [`deposit`](#deposit) par le `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur dépôt sur le bloc actuel.

#### dépôt {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Cette fonction dépose les `assets` de jetons sous-jacents dans le coffre et accorde la propriété de `shares` au `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Cette fonction retourne le nombre maximum d'actions qui peuvent être produites en un seul appel [`mint`](#mint) par le `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur frappe sur le bloc actuel.

#### frapper {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Cette fonction produit exactement `shares` actions du coffre au `receiver` en déposant des `assets` de jetons sous-jacents.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Cette fonction retourne le montant maximal des actifs sous-jacents qui peuvent être retirés du solde de l'`owner` en un seul appel à la fonction [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur retrait sur le bloc actuel.

#### retrait {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Cette fonction détruit `shares` de l'`owner` et envoie exactement `assets` jeton depuis le coffre au `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Cette fonction retourne le montant maximum d'actions qui peuvent être rachetées du solde de l'`orner` par un appel à la fonction [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur rachat sur le bloc actuel.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Cette fonction rachète un nombre spécifique de `shares` de l'`owner` et envoie des `assets` de jeton sous-jacent du coffre au `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Renvoie le nombre total d'actions non rachetées en circulation.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Renvoie le nombre total d'actions détenues par l'`owner`.

### Plan de l'interface {#mapOfTheInterface}

![Plan de l'interface ERC-4626](./map-of-erc-4626.png)

### Évènements {#events}

#### Événement de dépôt

**DOIT** être déclenché lorsque des jetons sont déposés dans le coffre via les méthodes [`mint`](#mint) et [`deposit`](#deposit)

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Où `sender` est l'utilisateur qui a échangé `assets` contre `shares`, et a transféré ces `shares` à l'`owner`.

#### Évènement de retrait

**DOIT** être déclenché lorsque les actions sont retirées du coffre par un déposant via les méthodes [`redeem`](#redeem) ou [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Où `sender` est l'utilisateur qui a déclenché le retrait et échangé `shares`, détenues par `owner`, contre `assets`. `receiver` est l'utilisateur qui a reçu les `assets` retirés.

## Complément d'information {#further-reading}

- [EIP-4626 : Standard de coffre-fort tokenisé](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626 : Répertoire GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
