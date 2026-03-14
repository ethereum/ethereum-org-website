---
title: "ERC-4626 トークン化ボールト規格"
description: "利回りボールトを対象とする規格。"
lang: ja
---

## はじめに {#introduction}

ERC-4626は、利回りボールトの技術的なパラメータを最適化し、統一するための規格です。 この規格は、ボールトに含まれる単一のERC-20トークンをどれだけ所有しているかを示すトークン化利回りボールトを作成するための標準APIを提供します。 ERC-4626はさらに、ERC-20に基づくトークン化ボールトのオプション拡張機能として、トークンの預入／引出および残高の読み取りといった基本的な機能を提供します。

**利回りボールトにおけるERC-4626の役割**

レンディング市場、アグリゲータ、および内部で利回りが得られるトークンは、ユーザーが様々な戦略を駆使して暗号資産トークンから最適な利回りを獲得する上で有益です。 これらの戦略はそれぞれがわずかな違いを持つため、エラーが発生しやすい場合や開発リソースを浪費してしまう場合があります。

利回りボールトのデベロッパーは、ERC-4626を活用することで、より一貫性が高く堅牢な実装パターンを実現できるため、アプリケーションとの統合にかかる作業を軽減し、様々なアプリケーションにおいて利回りを獲得できるようにするための別途の取り組みを削減することができます。

ERC-4626トークンは、[EIP-4626](https://eips.ethereum.org/EIPS/eip-4626)で詳しく説明されています。

**非同期ボールト拡張(ERC-7540)**

ERC-4626は、上限までのアトミックな預け入れと償還に最適化されています。 上限に達した場合、新しい預け入れや償還は送信できません。 この制限は、ボールトとのインターフェースの前提条件として非同期アクションや遅延を伴うスマートコントラクトシステム(実世界資産プロトコル、担保不足貸付プロトコル、クロスチェーン貸付プロトコル、リキッドステーキングトークン、保険セーフティモジュールなど)ではうまく機能しません。

ERC-7540は、非同期ユースケース向けにERC-4626ボールトの有用性を拡張します。 既存のボールトインターフェース(`deposit`/`withdraw`/`mint`/`redeem`)は、非同期リクエストを要求するために完全に利用されます。

ERC-7540拡張は、[ERC-7540](https://eips.ethereum.org/EIPS/eip-7540)で詳しく説明されています。

**マルチアセットボールト拡張 (ERC-7575)**

ERC-4626でサポートされていないユースケースの1つは、流動性プロバイダー(LP)トークンなどの複数の資産またはエントリーポイントを持つボールトです。 これらは、ERC-4626自体がERC-20であるという要件のために、一般的に扱いにくかったり、非準拠であったりします。

ERC-7575は、ERC-20トークンの実装をERC-4626の実装から外部化することにより、複数の資産を持つボールトのサポートを追加します。

ERC-7575拡張は、[ERC-7575](https://eips.ethereum.org/EIPS/eip-7575)で詳しく説明されています。

## 前提条件 {#prerequisites}

このページをよりよく理解するために、まず[トークン標準](/developers/docs/standards/tokens/)と[ERC-20](/developers/docs/standards/tokens/erc-20/)について読むことをお勧めします。

## ERC-4626の関数と機能: {#body}

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

この関数は、提供された`assets`の量に対して、ボールトによって交換される`shares`の量を返します。

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

この関数は、提供された`shares`の量に対して、ボールトによって交換される`assets`の量を返します。

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

この関数は、`receiver`にシェアをミントする1回の[`deposit`](#deposit)呼び出しで預け入れできる、原資産の最大量を返します。

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

この関数は、入金が現在のブロックに対してどのような影響をもたらすかをシミュレーションします。

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

この関数は、`assets`量の原資産トークンをボールトに預け入れ、`receiver`に`shares`の所有権を付与します。

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

この関数は、`receiver`にシェアをミントする1回の[`mint`](#mint)呼び出しでミントできる、シェアの最大量を返します。

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

この関数は、現在のブロックにおける当該ミントの影響をシミュレーションします。

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

この関数は、`assets`量の原資産トークンを預け入れることによって、`receiver`に正確に`shares`量のボールトシェアをミントします。

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

この関数は、1回の[`withdraw`](#withdraw)呼び出しで`owner`の残高から引き出すことができる原資産の最大量を返します。

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

この関数は、当該引き出しが現在のブロックに与える影響をシミュレーションします。

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

この関数は、`owner`から`shares`をバーンし、ボールトから`receiver`へ正確に`assets`量のトークンを送信します。

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

この関数は、[`redeem`](#redeem)呼び出しを通じて`owner`の残高から償還できるシェアの最大量を返します。

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

この関数は、シェアの受け取りが現在のブロックに与える影響をシミュレーションします。

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

この関数は、`owner`から特定の`shares`量を償還し、ボールトから`receiver`に`assets`量の原資産トークンを送信します。

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

ボールト内で流通している未償還のシェアの合計数を返します。

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner`が現在保有しているボールトシェアの合計量を返します。

### インターフェースのマップ {#mapOfTheInterface}

![ERC-4626インターフェースのマップ](./map-of-erc-4626.png)

### イベント {#events}

#### 入金イベント

[`mint`](#mint)および[`deposit`](#deposit)メソッドを介してトークンがボールトに預け入れられる際に、**MUST**発行されなければなりません。

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

ここで`sender`は`assets`を`shares`に交換し、それらの`shares`を`owner`に転送したユーザーです。

#### 出金イベント

預金者が[`redeem`](#redeem)または[`withdraw`](#withdraw)メソッドでボールトからシェアを引き出す際に、**MUST**発行されなければなりません。

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

ここで`sender`は、引き出しをトリガーし、`owner`が所有する`shares`を`assets`と交換したユーザーです。 `receiver`は、引き出された`assets`を受け取ったユーザーです。

## 参考リンク {#further-reading}

- [EIP-4626: トークン化されたボールト標準](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHubリポジトリ](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
