---
title: Norme de coffre-fort avec les jetons ERC-4626
description: "Une norme pour les coffres-forts à rendement."
lang: fr
---

## Introduction {#introduction}

ERC-4626 est une norme pour optimiser et standardiser les paramètres techniques des coffres à rendement. Elle fournit une API standard pour les coffres à rendement tokenisé qui représentent les actions d'un seul jeton ERC-20 sous-jacent. L'ERC-4626 soulignent également une extension facultative pour les coffres à jetons utilisant l'ERC-20, offrant ainsi des fonctionnalités de base pour les dépôts, les retraits de jetons et la lecture des soldes.

**Le rôle de l’ERC-4626 dans les coffres à rendement**

Les marchés de prêts, les agrégateurs et les jetons intrinsèquement porteurs d'intérêts aident les utilisateurs à trouver le meilleur rendement pour leurs jetons de cryptomonnaie en exécutant différentes stratégies. Ces stratégies s'opèrent avec de légères variations, qui pourraient être source d'erreurs ou de perte de ressources de développement.

Les coffres de rendement ERC-4626 réduiront l'effort d'intégration et ouvriront l'accès au rendement de diverses applications avec peu d'efforts spécialisés de la part des développeurs, en créant des modèles d'implémentation plus cohérents et plus robustes.

Le jeton ERC-4626 est entièrement décrit dans [l'EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Extension de coffre-fort asynchrone (ERC-7540)**

L'ERC-4626 est optimisé pour les dépôts et les rachats atomiques jusqu'à une certaine limite. Si la limite est atteinte, aucun nouveau dépôt ni rachat ne peut être soumis. Cette limitation ne fonctionne pas correctement pour les systèmes de contrats intelligents dont les actions asynchrones ou les retards sont une condition préalable à l'interface avec le coffre-fort (par exemple, les protocoles d'actifs du monde réel, les protocoles de prêts sous-collatéralisés, les protocoles de prêts entre chaînes, les jetons de mise en jeu liquides, ou les modules de sécurité d'assurance).

L'ERC-7540 étend l'utilité des coffre-forts ERC-4626 pour les cas d'utilisation asynchrones. L'interface de coffre-fort existante (`deposit`/`withdraw`/`mint`/`redeem`) est pleinement utilisée pour réclamer les demandes asynchrones.

L'extension ERC-7540 est entièrement décrite dans [l'ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Extension du coffre-fort multi-actifs (ERC-75757)**

Parmi les cas d'utilisation qui ne sont pas pris en charge par l'ERC-4626, on trouve les coffres-forts qui possèdent plusieurs actifs ou points d'entrée, tels que les jetons de fournisseurs de liquidités (LP). Ces derniers sont généralement difficiles à manipuler ou non conformes en raison de l'exigence de l'ERC-4626 d'être lui-même un ERC-20.

L'ERC-7575 ajoute la prise en charge des coffre-forts comportant plusieurs actifs en externalisant l'implémentation du jeton ERC-20 à partir de l'implémentation de l'ERC-4626.

L'extension ERC-7575 est entièrement décrite dans [l'ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par vous informer sur les [normes de jetons](/developers/docs/standards/tokens/) et l'[ERC-20](/developers/docs/standards/tokens/erc-20/).

## Fonctions et fonctionnalités ERC-4626 : {#body}

### Méthodes {#methods}

#### actif {#asset}

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

Cette fonction renvoie le montant de `parts` qui seraient échangées par le coffre-fort contre le montant d' `actifs` fournis.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Cette fonction renvoie le montant d' `actifs` qui seraient échangés par le coffre-fort contre le montant de `parts` fournies.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Cette fonction renvoie le montant maximal d'actifs sous-jacents qui peuvent être déposés en un seul appel [`deposit`](#deposit), les parts étant frappées pour le `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur dépôt sur le bloc actuel.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Cette fonction dépose des `actifs` de jetons sous-jacents dans le coffre-fort et accorde la propriété de `parts` au `destinataire`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Cette fonction renvoie le montant maximal de parts qui peuvent être frappées en un seul appel [`mint`](#mint), les parts étant frappées pour le `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur frappe sur le bloc actuel.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Cette fonction frappe exactement un nombre de `parts` du coffre-fort pour le `destinataire` en déposant des `actifs` de jetons sous-jacents.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Cette fonction renvoie le montant maximal d'actifs sous-jacents qui peuvent être retirés du solde du `propriétaire` avec un seul appel [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur retrait sur le bloc actuel.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Cette fonction brûle les `parts` du `propriétaire` et envoie exactement les `actifs` de jetons du coffre-fort au `destinataire`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Cette fonction renvoie le montant maximal de parts qui peuvent être rachetées sur le solde du `propriétaire` par le biais d'un appel [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Cette fonction permet aux utilisateurs de simuler les effets de leur rachat sur le bloc actuel.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Cette fonction rachète un nombre spécifique de `parts` auprès du `propriétaire` et envoie des `actifs` du jeton sous-jacent du coffre-fort au `destinataire`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Renvoie le nombre total d'actions non rachetées en circulation.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Renvoie le montant total de parts de coffre-fort que le `propriétaire` détient actuellement.

### Carte de l'interface {#mapOfTheInterface}

![Carte de l'interface ERC-4626](./map-of-erc-4626.png)

### Événements {#events}

#### Événement de dépôt

**DOIT** être émis lorsque des jetons sont déposés dans le coffre-fort via les méthodes [`mint`](#mint) et [`deposit`](#deposit).

```solidity
event Deposit(\n    address indexed sender,\n    address indexed owner,\n    uint256 assets,\n    uint256 shares\n)
```

Où `sender` est l'utilisateur qui a échangé des `assets` contre des `shares`, et a transféré ces `shares` à `owner`.

#### Évènement de retrait

**DOIT** être émis lorsque des parts sont retirées du coffre-fort par un déposant dans les méthodes [`redeem`](#redeem) ou [`withdraw`](#withdraw).

```solidity
event Withdraw(\n    address indexed sender,\n    address indexed receiver,\n    address indexed owner,\n    uint256 assets,\n    uint256 shares\n)
```

Où `sender` est l'utilisateur qui a déclenché le retrait et échangé des `shares`, détenues par le `propriétaire`, contre des `assets`. `receiver` est l'utilisateur qui a reçu les `assets` retirés.

## En savoir plus {#further-reading}

- [EIP-4626 : Norme de coffre-fort tokenisé](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626 : Dépôt GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
