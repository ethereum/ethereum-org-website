---
title: ERC-4626 トークン化ボールト規格
description: 利回りボールトを対象とする規格。
lang: ja
---

## はじめに {#introduction}

ERC-4626は、利回りボールトの技術的なパラメータを最適化し、統一するための規格です。 この規格は、ボールトに含まれる単一のERC-20トークンをどれだけ所有しているかを示すトークン化利回りボールトを作成するための標準APIを提供します。 ERC-4626はさらに、ERC-20に基づくトークン化ボールトのオプション拡張機能として、トークンの預入／引出および残高の読み取りといった基本的な機能を提供します。

**利回りボールトにおけるERC-4626の役割**

レンディング市場、アグリゲータ、および内部で利回りが得られるトークンは、ユーザーが様々な戦略を駆使して暗号資産トークンから最適な利回りを獲得する上で有益です。 これらの戦略はそれぞれがわずかな違いを持つため、エラーが発生しやすい場合や開発リソースを浪費してしまう場合があります。

利回りボールトのデベロッパーは、ERC-4626を活用することで、より一貫性が高く堅牢な実装パターンを実現できるため、アプリケーションとの統合にかかる作業を軽減し、様々なアプリケーションにおいて利回りを獲得できるようにするための別途の取り組みを削減することができます。

ERC-4626トークンの詳細については、[EIP-4626](https://eips.ethereum.org/EIPS/eip-4626)をご覧ください。

## 前提知識 {#prerequisites}

この記事をよく理解するには、まず[トークン規格](/developers/docs/standards/tokens/)および[ERC-20](/developers/docs/standards/tokens/erc-20/)に目を通すことをおすすめします。

## ERC-4626の機能と特長: {#body}

### メソッド {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

この関数は、会計処理、入金、および引出のために当該ボールトが使用される原資トークンのアドレスを返します。

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

この関数は、当該ボールトで所有される原資産の総額を返します。

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

この関数は、当該ボールトに提供された`assets`の量に対して交換される`shares`の量を返します。

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

この関数は、当該ボールトに提供された`shares`の量に対して交換される`assets`の量を返します。

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

この関数は、`receiver`が1回の[`deposit`](#deposit)呼び出しで入金できる原資産の上限を返します。

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

この関数は、入金が現在のブロックに対してどのような影響をもたらすかをシミュレーションします。

#### 入金 {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

この関数は、原資産トークンの`assets`をボールトに入金し、受信者に`shares`の所有権を付与します。

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

この関数は、`receiver`による1回の[`mint`](#mint)の呼び出しにより、ミント可能なシェア数の上限を返します。

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

この関数は、現在のブロックにおける当該ミントの影響をシミュレーションします。

#### mint(ミント) {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

この関数は、原資産トークンの`assets`を預け入れることで、`recevier`のボールトに対して特定の量の`shares`をミントします。

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

この関数は、1回の[`withdraw`](#withdraw)呼び出しにより、`owner`残高から引き出し可能な原資産アセットの上限を返します。

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

この関数は、当該引き出しが現在のブロックに与える影響をシミュレーションします。

#### 引き出し {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

この関数は、`owner`が所有する`shares`をバーンし、正確に一致した`assets`トークンをボールトから`receiver`に送信します。

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

この関数は、[`redeem`](#redeem)の呼び出しにより、`owner`の残高から受け取ることができるシェアの上限を返します。

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

この関数は、シェアの受け取りが現在のブロックに与える影響をシミュレーションします。

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

この関数は、一定量の`shares`を`owner`から回収し、原資トークンの`assets`をボールトから`receiver`に送信します。

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

ボールト内で流通している未償還のシェアの合計数を返します。

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner`が現在ボールトで所有しているシェアの総数を返します。

### インターフェースのマップ {#mapOfTheInterface}

![ERC-4626インターフェースのマップ](./map-of-erc-4626.png)

### イベント {#events}

#### 入金イベント

[`mint`](#mint)あるいは[`deposit`](#deposit)メソッドによりトークンをボールトに入金する際に、**必ず**発行しなければなりません。

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

このコードにおける`sender`とは、 `assets`を`shares`に交換して、`shares`を`owner`に転送するユーザーです。

#### 出金イベント

[`redeem`](#redeem) あるいは [`withdraw`](#withdraw)メソッドにより、預金者がボールトからシェアを引き出す際に、**必ず**発行しなければなりません。

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

このコードにおける`sender`とは、出金をトリガーし、`owner`が所有する`shares`を`assets`と交換するユーザーです。 `receiver`は、出金された`assets`を受け取ったユーザーです。

## 参考文献 {#further-reading}

- [EIP-4626: トークン化ボールト規格](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHubリポジトリ](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
