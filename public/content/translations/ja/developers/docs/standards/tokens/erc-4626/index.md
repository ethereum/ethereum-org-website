---
title: "ERC-4626 トークン化ヴォールト標準"
description: "利回り付きヴォールトの標準。"
lang: ja
---

## はじめに

ERC-4626は、利回り付きヴォールトの技術的パラメータを最適化し、統一するための標準です。単一の原資産となるERC-20トークンのシェアを表す、トークン化された利回り付きヴォールトのための標準APIを提供します。また、ERC-4626は、ERC-20を利用するトークン化されたヴォールトのオプションの拡張機能の概要も示しており、トークンの入金、引き出し、残高の読み取りといった基本的な機能を提供します。

**利回り付きヴォールトにおけるERC-4626の役割**

レンディング市場、アグリゲーター、および本質的に利息を生むトークンは、さまざまな戦略を実行することで、ユーザーが暗号資産トークンで最高の利回りを見つけるのに役立ちます。これらの戦略はわずかな違いを伴って実行されるため、エラーが発生しやすかったり、開発リソースを無駄にしたりする可能性があります。

利回り付きヴォールトにERC-4626を導入することで、より一貫性のある堅牢な実装パターンが作成され、統合の労力が軽減されます。これにより、開発者が特別な労力をほとんどかけずに、さまざまなアプリケーションで利回りにアクセスできるようになります。

ERC-4626トークンの詳細については、[EIP-4626](https://eips.ethereum.org/EIPS/eip-4626)で説明されています。

**非同期ヴォールト拡張機能 (ERC-7540)**

ERC-4626は、上限までのアトミックな入金と償還に最適化されています。上限に達した場合、新たな入金や償還を送信することはできません。この制限は、ヴォールトとインターフェースをとるための前提条件として非同期アクションや遅延を伴うスマート・コントラクト・システム（例：現実資産プロトコル、無担保レンディングプロトコル、クロスチェーンのレンディングプロトコル、リキッド・ステーキング・トークン、または保険のセーフティモジュールなど）ではうまく機能しません。

ERC-7540は、非同期のユースケース向けにERC-4626ヴォールトの有用性を拡張します。既存のヴォールトインターフェース（`deposit`/`withdraw`/`mint`/`redeem`）は、非同期リクエストを請求するために完全に活用されます。

[ERC-7540 非同期トークン化ヴォールト](/developers/docs/standards/tokens/erc-7540/)の詳細をご覧ください。

**マルチアセットヴォールト拡張機能 (ERC-7575)**

ERC-4626でサポートされていないユースケースの1つに、流動性プロバイダー（LP）トークンのような複数の資産やエントリポイントを持つヴォールトがあります。これらは、ERC-4626自体がERC-20である必要があるため、一般的に扱いにくいか、準拠していません。

ERC-7575は、ERC-20トークンの実装をERC-4626の実装から外部化することで、複数の資産を持つヴォールトのサポートを追加します。

ERC-7575拡張機能の詳細については、[ERC-7575](https://eips.ethereum.org/EIPS/eip-7575)で説明されています。
## 前提条件 {#prerequisites}

このページをよりよく理解するために、まず[トークン標準](/developers/docs/standards/tokens/)と[ERC-20](/developers/docs/standards/tokens/erc-20/)について読むことをお勧めします。

## ERC-4626の機能と特徴: {#body}

### メソッド {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

この関数は、会計、入金、引き出しのためにヴォールトで使用される原資産トークンのアドレスを返します。

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

この関数は、ヴォールトが保有する原資産の総量を返します。

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

この関数は、提供された`assets`の量に対して、ヴォールトが交換する`shares`の量を返します。

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

この関数は、提供された`shares`の量に対して、ヴォールトが交換する`assets`の量を返します。

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

この関数は、1回の[`deposit`](#deposit)呼び出しで入金できる原資産の最大量を返します。この際、シェアは`receiver`のためにミントされます。

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

この関数を使用すると、ユーザーは現在のブロックでの入金の影響をシミュレートできます。

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

この関数は、`assets`の原資産トークンをヴォールトに入金し、`shares`の所有権を`receiver`に付与します。

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

この関数は、1回の[`mint`](#mint)呼び出しでミントできるシェアの最大量を返します。この際、シェアは`receiver`のためにミントされます。

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

この関数を使用すると、ユーザーは現在のブロックでのミントの影響をシミュレートできます。

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

この関数は、`assets`の原資産トークンを入金することで、正確に`shares`のヴォールトシェアを`receiver`にミントします。

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

この関数は、1回の[`withdraw`](#withdraw)呼び出しで`owner`の残高から引き出し可能な原資産の最大量を返します。

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

この関数を使用すると、ユーザーは現在のブロックでの引き出しの影響をシミュレートできます。

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

この関数は、`owner`から`shares`をバーンし、正確に`assets`のトークンをヴォールトから`receiver`に送信します。

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

この関数は、[`redeem`](#redeem)呼び出しを通じて`owner`の残高から償還できるシェアの最大量を返します。

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

この関数を使用すると、ユーザーは現在のブロックでの償還の影響をシミュレートできます。

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

この関数は、`owner`から特定の数の`shares`を償還し、`assets`の原資産トークンをヴォールトから`receiver`に送信します。

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

流通している未償還のヴォールトシェアの総数を返します。

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner`が現在保有しているヴォールトシェアの総量を返します。

### インターフェースのマップ {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### イベント {#events}

#### Depositイベント {#deposit-event}

[`mint`](#mint)および[`deposit`](#deposit)メソッドを介してトークンがヴォールトに入金されたときに発行されなければ**なりません**。

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

ここで、`sender`は`assets`を`shares`に交換し、その`shares`を`owner`に転送したユーザーです。

#### Withdrawイベント {#withdraw-event}

[`redeem`](#redeem)または[`withdraw`](#withdraw)メソッドで入金者によってヴォールトからシェアが引き出されたときに発行されなければ**なりません**。

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

ここで、`sender`は引き出しをトリガーし、`owner`が所有する`shares`を`assets`に交換したユーザーです。`receiver`は、引き出された`assets`を受け取ったユーザーです。

## 参考文献 {#further-reading}

- [EIP-4626: トークン化ヴォールト標準](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHubリポジトリ](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
