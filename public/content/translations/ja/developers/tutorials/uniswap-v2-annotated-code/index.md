---
title: "Uniswap-v2コントラクトの手順"
description: Uniswap-v2コントラクトの仕組み、 コントラクトの書き方について
author: Ori Pomerantz
tags:
  - "Solidity"
skill: intermediate
published: 2021-05-01
lang: ja
---

## はじめに {#introduction}

[Uniswap v2](https://uniswap.org/whitepaper.pdf)では、任意の2つのERC-20トークン同士の取引が可能になります。 本記事では、このプロトコルを実装したコントラクトのソースコードをチェックして、このように書かれている理由を理解していきます。

### Uniswapの役割 {#what-does-uniswap-do}

基本的には、流動性プロバイダーとトレーダーの2種類のユーザーが存在します。

_liquidity providers_(流動性プロバイダー)は、交換可能な2つのトークン(ここでは**Token0**と**Token1**と呼びます)をプールに提供します。 その見返りとして、_liquidity token_(流動性トークン)と呼ばれるプールの一部所有権を表す第3のトークンを受け取ります。

_Traders_(トレーダー)は、あるトークンをプールに送り、流動性プロバイダーが提供するプールから他のトークン(例えば、**Token0**を送って**Token1**を受け取る)を受け取ります。 交換レートは、プールが持つ**Token0**と**Token1**の相対的な数で決定されます。 加えて、流動性プールの報酬としてプールに数パーセントのフィーを取られます。

流動性プロバイダーが元のトークンを取り戻したい場合は、プールトークンをバーンして、報酬を含めた元のトークンを受け取ることができます。

詳しい説明は[こちら](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/)をご覧ください。

### なぜv2? v3じゃないの? {#why-v2}

[Uniswap v3](https://uniswap.org/whitepaper-v3.pdf)はv2を非常に複雑化したアップグレード版です。 まずv2を学んでからv3に進む方が簡単です。

### コアコントラクト vs ペリフェリーコントラクト {#contract-types}

Uniswap v2は、コアコントラクトとペリフェリーコントラクトの2つのコンポーネントに分かれています。 コアコントラクトはアセットを_保有する_ため安全性の保証が重要となりますが、この分割によって監査を簡略化することができます。 ペリフェリーコントラクトはトレーダーが必要とするすべての機能を提供しています。

## データおよび制御フロー {#flows}

Uniswapの3大アクションを実行したときに発生するデータフローと制御フローは以下のとおりです。

1. 異なるトークン間でスワップを実行する
2. 市場に流動性を与え、ERC-20流動性トークンのペア取引で報酬を得る
3. ERC-20流動性トークンをバーンし、ペア取引によってトレーダーが取引できるERC-20トークンを取り戻す

### スワップ {#swap-flow}

トレーダーが使用する最も一般的なフローです。

#### 呼び出し元 {#caller}

1. スワップされた量のアローワンスをペリフェリーアカウントへ提供します。
2. ペリフェリーコントラクトには多数のスワップ関数がありますが、そのうち1つを呼び出します(ETHが関係しているかどうか、入金するトークンの量や取り戻すトークンの量をトレーダーが指定するかどうかなどによって、呼び出す関数は異なります)。 どのスワップ関数も`path`、つまり経由する取引所の配列を受け取ります。

#### ペリフェリーコントラクト内の処理 (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. パスに沿って、各取引所で取引する量を特定します。
4. パスを繰り返し処理します。 経路にある各取引所に入力トークンを送信し、取引所の`スワップ`関数を呼び出します。 通常、トークンの送信先アドレスはパス上にある次のペア取引所です。 最後の取引は、トレーダーが提供したアドレスとなります。

#### コアコントラクト内の処理(UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. コアコントラクトで不正がされていないこと、スワップ後も十分な流動性を維持できることを検証します。
6. 既存のリザーブ量と追加のトークン数を確認します。 追加のトークン量は、交換用に受け取った入力トークンの数です。
7. 出力トークンを送信先に送ります。
8. `_update`を呼び出し、リザーブ量をアップデートします。

#### ペリフェリーコントラクト(UniswapV2Router02.sol)に戻る {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. 必要なクリーンアップを行います(例えば、WETHトークンをバーンしてETHへ戻し、トレーダーに送るなど)。

### 流動性の追加 {#add-liquidity-flow}

#### 呼び出し元 {#caller-2}

1. 流動性プールに追加される量のアローワンスをペリフェリーアカウントに提供します。
2. ペリフェリーコントラクトの`addLiquidity`関数の1つを呼び出します。

#### ペリフェリーコントラクト内の処理(UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. 必要に応じて新しいペア取引所を作成します。
4. 既存のペア取引所がある場合は、追加するトークンの量を計算します。 両方のトークンは同じ値であることが想定されるため、新規トークンと既存トークンの比率は同じになるはずです。
5. 受け取り可能なトークンの量かどうか確認します(実行者は流動性の追加を希望しない最低量を指定することができます) 。
6. コアコントラクトを呼び出します。

#### コアコントラクト内の処理(UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. 流動性トークンをミントして、呼び出し元に送信します。
8. `_update`を呼び出し、リザーブ量をアップデートします。

### 流動性の削除 {#remove-liquidity-flow}

#### 呼び出し元 {#caller-3}

1. ペリフェリーアカウントに、基礎トークンと引き換えにバーンされた流動性トークンのアローワンスを提供します。
2. ペリフェリーコントラクトの`removeLiquidity`関数の内の1つを呼び出します。

#### ペリフェリーコントラクト内の処理(UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. ペア取引所に流動性トークンを送ります。

#### コアコントラクト(UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. バーンされたトークンの量に応じて、基礎トークンを送信先アドレスに送ります。 例えば、プールにAトークンが1000個、Bトークンが500個、流動性トークンが90個あるとします。流動性トークン9個を受け取ってバーンすると、流動性トークンの10％をバーンすることになり、ユーザーに100個のAトークンと50個のBトークンが返されることになります。
5. 流動性トークンをバーンします。
6. `_update`を呼び出し、リザーブ量をアップデートします。

## コアコントラクト {#core-contracts}

流動性を保持する安全なコントラクトです。

### UniswapV2Pair.sol {#UniswapV2Pair}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol)は、トークンを交換する実際のプールを実装しています。 これはUniswapの中核機能です。

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

コントラクトは、これら(`IUniswapV2Pair`や`UniswapV2ERC20`)を実装していたり、これらを実装したコントラクトを呼び出すため、上記すべてのインターフェイスを認識する必要があります。

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

このコントラクトは、流動性トークンのERC-20関数を提供する`UniswapV2ERC20`を継承しています。

```solidity
    using SafeMath  for uint;
```

この[SafeMathライブラリ](https://docs.openzeppelin.com/contracts/2.x/api/math)は、オーバーフローとアンダーフローを回避するために使用されます。 このライブラリがないと、`-1`であるべき値が`2^256-1`になってしまうことがあるため重要な役割を担っています。

```solidity
    using UQ112x112 for uint224;
```

通常、プールコントラクトの計算では小数を使いますが、 EVMで小数はサポートされていません。 そこで、Uniswapが考えた解決策は、224ビット値を使用することです。整数部分に112 ビット、小数部分に112ビットを使います つまり、`1.0`は`2^112`、`1.5`は`2^112 + 2^111`のように表します。

このライブラリの詳細は、[後述するドキュメント](#FixedPoint)に掲載されています。

#### 変数 {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

ゼロ除算のケースを回避するため、流動性トークンには常に最小数が存在します(ただし、ゼロアカウントが所有しています。) その数は**MINIMUM_LIQUIDITY**であり、1000です。

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

これは、ERC-20送金関数のABIセレクターです。 2つのトークンアカウント間でERC-20トークンを送金するために使用されます。

```solidity
    address public factory;
```

これは、このプールを作成したファクトリコントラクトです。 すべてのプールは2つのERC-20トークン間の取引所であり、ファクトリーはこれらすべてのプールをつなぐ中心点です。

```solidity
    address public token0;
    address public token1;
```

このプールで交換可能な2種類のERC-20トークンのコントラクトアドレスがあります。

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

プールが保有する各種トークンのリザーブです。 2つが同じ値であると仮定すると、各token0はreserve1/reserve0 token1に相当します。

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

交換が行われた最後のブロックのタイムスタンプで、時間の経過とともに交換レートを追跡する際に使用されます。

イーサリアムのコントラクトで最も高額なガス代の1つはストレージで、コントラクトコールから次のコールまで持続します。 各ストレージセルは256ビットとなっているため、 3つの変数`reserve0`、`reserve1`、`blockTimestampLast`すべて(112+112+32=256)を1つのストレージ値に含めるように割り当てます。

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

これらの変数は、各トークンの累積コストを(お互いの価値で)保有し、 一定期間の平均交換レートを算出する際に使用できます。

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

token0とtoken1の交換レートは、取引時の両リザーブの倍数を一定に維持するようペア取引所が決定します。 `kLast`がその値です。 流動性プロバイダーがトークンを入出金するとこのレートは変化し、マーケット手数料0.3％によって若干増えます。

下記にシンプルな例をご紹介します。 ただし、簡略化のため表は小数点以下3桁までとし、0.3%のマーケット手数料も考慮していないので正確な数字ではありません。

| イベント                                 |  reserve0 |  reserve1 | reserve0 \* reserve1 | 平均交換レート(token1/token0) |
| ------------------------------------ | ---------:| ---------:| ----------------------:| ---------------------- |
| 初期設定                                 | 1,000.000 | 1,000.000 |              1,000,000 |                        |
| トレーダーAが50のtoken0を47.619のtoken1とスワップ  | 1,050.000 |   952.381 |              1,000,000 | 0.952                  |
| トレーダーBが10のtoken0を8.984のtoken1と スワップ  | 1,060.000 |   943.396 |              1,000,000 | 0.898                  |
| トレーダーCが40のtoken0を34.305のtoken1とスワップ  | 1,100.000 |   909.090 |              1,000,000 | 0.858                  |
| トレーダーDが100のtoken1を109.01のtoken0とスワップ |   990.990 | 1,009.090 |              1,000,000 | 0.917                  |
| トレーダーEが10のtoken0を10.079のtoken1とスワップ  | 1,000.990 |   999.010 |              1,000,000 | 1.008                  |

トレーダーが提供するtoken0の量が増えるほど、需要と供給によりtoken1の相対的価値も上がり、逆の場合も同じことが言えます。

#### ロック {#pair-lock}

```solidity
    uint private unlocked = 1;
```

[再入可能の悪用](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14)によるセキュリティ脆弱性の一種があります。 Uniswapは、任意のERC-20トークンを転送することになっているため、Uniswapマーケットを悪用しようとするERC-20コントラクトを呼び出す可能性があります。 コントラクトの一部に`unlocked`変数を使うことで、(同じトランザクション内で)実行中に関数が呼び出されるのを防ぐことができます。

```solidity
    modifier lock() {
```

この関数は[modifier](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers)で、通常の関数をラップして何らかの方法で挙動を変更する関数です。

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

`unlocked`が1の場合は0に設定します。 すでに0の場合は呼び出しを元に戻して、失敗させます。

```solidity
        _;
```

modifierの`_;`は、(すべてのパラメータを含む)元の関数呼び出しです。 これは、関数が呼び出されたときに`unlocked`が1であり、実行中に`unlocked`の値が0になった場合のみ、関数呼び出しが発生することを意味します。

```solidity
        unlocked = 1;
    }
```

main関数に戻った後、ロックを解除します。

#### その他の 関数 {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

この関数が呼び出されると、取引所の現在の状態を返します。 Solidityの関数は、[複数の値を返せることに](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values)注意してください。

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

この内部関数は、ERC20トークン量を取引所から第三者に転送します。 `SELECTOR`は、呼び出している関数が`transfer(address,uint)`(上記の定義を参照)であることを指定しています。

トークン関数のインターフェイスのインポートを回避するため、いずれかの[ABI関数](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions)を使い、「手動」で呼び出しを作成します。

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

ERC-20転送コールが失敗を報告する例を下記に2つご紹介します。

1. 元に戻す。 外部コントラクトへのコールを元に戻すと、ブール値は`false`を返します。
2. 正常に終了したが、失敗を報告する。 この場合、戻り値のバッファの長さがゼロ以外で、ブール値としてデコードすると`false`になります。

いずれかの状態が発生した場合は、元に戻します。

#### イベント {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

この２つのイベントは、流動性プロバイダーが流動性を入金 (`Mint`)または、引き出した(`Burn`)場合に発行されます。 いずれの場合も、預け入れまたは引き出されたtoken0とtoken1の量と、呼び出したアカウントのアイデンティティ(`sender`) は、イベントに含まれます。 引き出しの場合、イベントにはトークンを受け取るターゲット(`to`)も含みますが、送信者と同じとは限りません。

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

このイベントは、トレーダーがあるトークンを他のトレーダーとスワップしたときに発行されます。 ここでも、送信者と送信先が同じとは限りません。 各トークンは、取引所に送信されるか、取引所から受信します。

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

最後に、`Sync`は、トークンが追加または引き出されるたびに発行され、その理由に関係なく、最新のリザーブ情報(交換レート)を提供します。

#### setup関数 {#pair-setup}

これらの関数は、新しいペア取引所がセットアップされたときに1度だけ呼び出されます。

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

コンストラクタは、ペアを作成したファクトリのアドレスを確実に追跡できるようにします。 この情報は、`initialize`と(ファクトリが存在する場合は)ファクトリフィーに必要となります。

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

この関数では、ファクトリー(のみ)が、このペアが交換する2つのERC-20トークンを指定できます。

#### 内部のupdate関数 {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

この関数は、トークンの入金や引き出しのたびに呼び出されます。

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

balance0またはbalance1(uint256)が、uint112(-1) (=2^112-1)よりも大きい場合、(uint112に変換された場合、オーバーフローで0に戻ってしまうため)オーバーフローを防止するために\_updateの続行が拒否されます。 通常のトークンは10^18単位に分割できるため、各取引所で各トークンが約5.1*10^15に制限されます。 今のところ、問題は発生していません。

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

経過時間がゼロとなっていない場合は、このブロックで最初の交換トランザクションとなります。 その場合、コストアキュムレータをアップデートする必要があります。

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

各コストアキュムレータは、最新のコスト(他のトークンのリザーブまたはこのトークンのリザーブ)に経過時間(秒)を掛けてアップデートされます。 平均価格を求めるには、2つの時点の累積価格を読み、その時間差で割ります。 例えば、次の一連のイベントを想定してください。

| イベント                                 |  reserve0 |  reserve1 | タイムスタンプ | 限界交換率(reserve1/reserve0) |         price0CumulativeLast |
| ------------------------------------ | ---------:| ---------:| ------- | ------------------------:| ----------------------------:|
| 初期設定                                 | 1,000.000 | 1,000.000 | 5,000   |                    1.000 |                            0 |
| トレーダーAがtoken0を50入金し、token1を47.619戻す  | 1,050.000 |   952.381 | 5,020   |                    0.907 |                           20 |
| トレーダーBがtoken0を10入金し、token1を8.984戻す   | 1,060.000 |   943.396 | 5,030   |                    0.890 |       20+10\*0.907 = 29.07 |
| トレーダーCがtoken0を40入金し、token1を34.305戻す  | 1,100.000 |   909.090 | 5,100   |                    0.826 |    29.07+70\*0.890 = 91.37 |
| トレーダーDがtoken1を100入金し、token0を109.01戻す |   990.990 | 1,009.090 | 5,110   |                    1.018 |    91.37+10\*0.826 = 99.63 |
| トレーダーEがtoken0を10入金し、token1を10.079戻す  | 1,000.990 |   999.010 | 5,150   |                    0.998 | 99.63+40\*1.1018 = 143.702 |

タイムスタンプ5,030から5,150の間の**Token0**の平均価格を計算してみましょう。  `price0Cumulative`の値の差は、143.702-29.07=114.632です。 これは2分間(120秒)の平均値です。 つまり、平均価格は114.632/120 = 0.955となります。

古いリザーブサイズを把握しておく必要があるのは、この価格計算のためです。

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

最後に、グローバル変数をアップデートし、`Sync`イベントを発行します。

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Uniswap 2.0で、トレーダーは、マーケットの利用料として0.30%のフィーを払います。 フィーの大半は、流動性プロバイダーに支払われます(取引の0.25%)。 残りの0.05%は、流動性プロバイダーまたは、プロトコルフィーとしてファクトリで指定されたアドレスへ送られます。プロトコルフィーは、Uniswapの開発のために支払われます。

計算量(それに伴うガス代)を削減するため、このフィーは、トランザクションごとではなく、プールから流動性が追加または削除されるときだけ計算されます。

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

上記コードのファクトリーのフィー送信先を読んでみましょう。 ゼロの場合、プロトコルフィーはかからず、フィーを計算する必要もありません。

```solidity
        uint _kLast = kLast; // gas savings
```

`kLast`状態変数はストレージに位置しているため、コントラクトへの異なる呼び出し間で値を持つことになります。 ストレージへのアクセスは、コントラクトへの関数呼び出しが終了したときにリリースされる揮発メモリへのアクセスよりも非常に高価となるため、内部変数を使ってガス代を節約します。

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

流動性プロバイダーは、流動性トークンの価値が上昇するだけで取り分をもらえます。 一方、プロトコルフィーは、新しい流動性トークンをミントし、`feeTo`アドレスに提供する必要があります。

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

プロトコルフィーを徴収する新しい流動性がある場合の 平方根関数については、この[記事の後半](#Math)で解説します。

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

このフィーの複雑な計算方法については、[ホワイトペーパー](https://uniswap.org/whitepaper.pdf)の5ページ目で説明されています。 (流動性が実際に変化する前に、流動性が追加または削除されるたびにこの計算を実行するため、)`kLast`が計算された時間から現在までの間に流動性が追加または削除されていないことがわかります。そのため、`reserve0 * reserve1`の変更は、トランザクションフィーに起因する必要があります。 (流動性の追加または削除がなければ、`reserve0 * reserve1`を一定に保ちます)。

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

`UniswapV2ERC20._mint`関数を利用して、追加の流動性トークンを作成し、`feeTo`に割り当てます。

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

フィーがない場合、`kLast`がゼロでなければゼロに設定します。 このコントラクトが書かれたとき、[ガス払い戻し機能](https://eips.ethereum.org/EIPS/eip-3298)がありました。この機能は、コントラクトによって必要のないストレージをゼロにすることで、イーサリアム全体のサイズを縮小するよう促したものです。 この機能により、可能な場合はコードは払い戻しを受けます。

#### 外部アクセス可能な関数 {#pair-external}

どのトランザクションまたはコントラクトでも、これらの関数を呼び出すことは_できます_が、ペリフェリーコントラクトから呼び出されるように設計されていることに注意してください。 直接呼び出すと、ペア取引所で不正行為はできませんが、誤って価値を失ってしまう可能性があります。

##### mint

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

この関数は、流動性プロバイダーが流動性をプールへ追加するときに呼び出されます。 報酬として追加の流動性トークンをミントします。 同じトランザクションで流動性を追加した後に呼び出す[ペリフェリーコントラクト](#UniswapV2Router02)から呼び出されます。(そうすることで、誰もが正当な所有者より前に、新しい流動性を要求するトランザクションの送信ができなくなります。)

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
```

これは、Solidity関数が返す複数の戻り値を読み取る方法です。 最後に返された値のブロックのタイムスタンプは必要ないため、破棄します。

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

現在の残高を取得し、各トークンタイプで追加された値を確認します。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

プロトコルフィーを計算して収集し、それに応じて流動性トークンをミントします。 `_mintFee`のパラメータは古いリザーブ値であるため、フィーによるプールの変更にのみ基づいてフィーは正確に計算されます

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
```

これが最初の入金の場合は、`MINIMUM_LIQUIDITY`トークンを作成し、それらをロックするためにゼロアドレスに送信します。 このトークンは引き換えることができないため、プールが完全に空になることはありません(これによりゼロ除算を防ぎます) 。 `MINIMUM_LIQUIDITY`の値は、1000です。これは、ETHがwei単位に分割されるように、ほとんどのERC-20がトークンの10の18乗の単位に分割されることを考慮して、単一トークンの値の10^-15となっており、 高コストではありません。

最初の入金の時点では、2つのトークンの相対的価値はわからないため、金額を掛けて平方根をとります。入金によって両方のトークンの価値が等しくなったと仮定します。

裁定取引で価値の喪失を防ぎ、同等の価値を提供することが入金者の利益になるため、信頼することができます。 例えば、2つのトークンの価値が同等であるものの、入金者が**Token0**の4倍の**Token1**を入金したとします。 トレーダーは、価値を抽出するために、ペア取引所が**Token0**の価値の方が高いと考えている事実を利用することができます。

| イベント                                      | reserve0 | reserve1 | reserve0 \* reserve1 | プールの値(reserve0 + reserve1) |
| ----------------------------------------- | --------:| --------:| ----------------------:| --------------------------:|
| 初期設定                                      |        8 |       32 |                    256 |                         40 |
| トレーダーは**Token0**トークンを8入金し、**Token1**を16戻す |       16 |       16 |                    256 |                         32 |

上記のように、トレーダーは、プールの価値の減少から追加の8トークンを獲得し、それを所有する入金者に損害を与えました。

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

その後の入金では、2つのアセットの交換レートがすでにわかっており、流動性プロバイダーが両方のアセットで同等の価値を提供することが期待できます。 そうしなかった場合、罰として、提供された流動性より低い価値の流動性トークンが与えられます。

初回の入金であれ、その後の入金であれ、提供する流動性トークンの数は、 `reserve0*reserve1`の変化の平方根に等しくなり、(「罰金」の対象となる両方のトークンの種類で同等の価値ではない入金をしないかぎり) 流動性トークンの価値は変化しません。 もう1つ、同等の価値を持つ2つのトークンの例をご紹介します。3つが良い入金で、1つが(1種類のトークンのみを入金するため、流動性トークンは生成されない)悪い入金です。

| イベント      | reserve0 | reserve1 | reserve0 \* reserve1 | プール値(reserve0 + reserve1) | この入金でミントされた流動性トークン | 流動性トークンの合計 | 各流動性トークンの価値 |
| --------- | --------:| --------:| ----------------------:| -------------------------:| ------------------:| ----------:| -----------:|
| 初期設定      |    8.000 |    8.000 |                     64 |                    16.000 |                  8 |          8 |       2.000 |
| 各種4つずつ入金  |   12.000 |   12.000 |                    144 |                    24.000 |                  4 |         12 |       2.000 |
| 各種2つずつ入金  |   14.000 |   14.000 |                    196 |                    28.000 |                  2 |         14 |       2.000 |
| 等しくない値を入金 |   18.000 |   14.000 |                    252 |                    32.000 |                  0 |         14 |      ~2.286 |
| 裁定取引後     |  ~15.874 |  ~15.874 |                    252 |                   ~31.748 |                  0 |         14 |      ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

`UniswapV2ERC20._mint`関数を使用して、追加の流動性トークンを実際に作成し、正しいアカウントに付与します。

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

状態変数(`reserve0`、`reserve1`、必要に応じて`kLast`)をアップデートし、必要であれば適切なイベントを発行します。

##### burn

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

この関数は、流動性が引き出され、適切な流動性トークンをバーンする必要がある場合に呼び出されます。 また、[ペリフェリーコントラクトから](#UniswapV2Router02)も呼び出されるようになっています。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

ペリフェリーコントラクトは、呼び出し前に、このコントラクトにバーンされる流動性を送信します。 これにより、バーンされる流動性の量を把握でき、確実にバーンすることができます。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

流動性プロバイダーは、両方のトークンで同等の価値を受け取り、 交換レートを変更することもありません。

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

`burn`関数の残りの部分は、`mint`関数が逆(ミラーイメージ)になったものです。

##### swap

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

この関数は、 [ペリフェリーコントラクト](#UniswapV2Router02)からも呼び出されることになっています。

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

ローカル変数は、メモリに保存するか、少ない場合は直接スタック上に保存できます。 数を制限できれば、ガスの使用量が少ないスタックを使用することができます。 詳細については、[正式なイーサリアム仕様であるイエロー ペーパー](https://ethereum.github.io/yellowpaper/paper.pdf)の26ページ目に記載されている等式298をご覧ください。

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
```

この送金は、すべての条件が満たされていることを確認する前に行っているため、楽観的です。 これはイーサリアムでは、問題ありません。呼び出しの後半で、条件を満たしていなければ、作成されたすべての変更が戻されるからです。

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

リクエストされた場合、受信者にスワップについて通知します。

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

現在の残高を取得します。 ペリフェリーコントラクトは、スワップを呼び出す前にトークンを送信するため、 コントラクトで不正行為がされていないことを簡単に確認できるようになります。このチェックは、ペリフェリーコントラクト以外のエンティティから呼び出される可能性があるため、コアコントラクトで_実行しなければなりません_。

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

これは、スワップによる損失を確実に防ぐサニティチェックです。 スワップによって`reserve0*reserve1`が減少することはありません。 これは、スワップで0.3%のフィーが送信されることを保証する場所でもあります。K値のサニティチェックをする前に、両方の残高に1000を掛け、3を掛けた金額を引きます。これは現在のリザーブのK値と比較する前に、残高から0.3%(3/1000 = 0.003 = 0.3%)が差し引かれることを意味します。

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

`reserve0`と`reserve1`をアップデートし、必要に応じて価格アキュムレータとタイムスタンプもアップデートして、イベントを発行します。

##### syncまたはskim

実際の残高とペア取引所が持っているとされるリザーブとが一致しない可能性があります。 コントラクトの同意なしにトークンを引き出すことはできませんが、入金は可能です。 アカウントは、 `mint`または`swap`どちらかを呼び出すことなくトークンを取引所に送信することができます。

このケースでは次の2つの解決策があります。

- `sync`でリザーブを現在の残高にアップデートします。
- `skim`で余分な金額を引き出します。 誰がトークンを入金したか分からないため、どのアカウントでも`skim`の呼び出しが許可されていることに注意してください。 この情報はイベント内で発行されますが、イベントはブロックチェーンからはアクセスできません。

```solidity
    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol)では、ペア取引所を作ります。

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

これらの状態変数はプロトコルフィーを実装するために必要です。詳細は、[ホワイトペーパー](https://uniswap.org/whitepaper.pdf)の5ページ目をご覧ください。 `feeTo`は、プロトコルフィーのための流動性トークンを蓄積するアドレスで、`feeToSetter`は、`feeTo`を別のアドレスに変更できるアドレスです。

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

これらの変数は、ペアと2種類のトークン間の取引を追跡します。

最初の`getPair`は、交換する2つのERC-20トークンに基づいてペア取引所コントラクトを識別するマッピングです。 ERC-20トークンは、それらを実装するコントラクトのアドレスによって特定されるため、キーと値はすべてアドレスです。  `tokenA`から`tokenB`に交換するペア取引所のアドレスを取得するために、 `getPair[<tokenA address>][<tokenB address>]`を使います(逆の場合も同様) 。

2つ目の変数`allPairs`は、このファクトリーによって作られたすべてのペア取引所のアドレスを含む配列です。 イーサリアムでは、マッピング内容のイテレートやすべてのキーのリストを取得することはできないので、この変数が、ファクトリーが管理する取引所を知る唯一の方法となります。

注: マッピングのすべてのキーをイテレートできない理由は、コントラクトのデータストレージが_高額_であるため、使用量が少ないほど良く、変更頻度が少ないほど良いからです。 [イテレーションをサポートするマッピング](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)の作成もできますが、キーのリストのために追加のストレージが必要です。 通常、ほとんどのアプリケーションで必要ありません。

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

このイベントは、新しいペア取引所が作成されたときに発行されます。 トークンのアドレス、ペア取引所のアドレス、ファクトリーによって管理されている全取引所の数が含まれます。

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

コンストラクタが行う唯一のことは、`feeToSetter`を指定することです。 ファクトリーはフィーなしで開始し、変更できるのは`feeSetter`のみとなります。

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

この関数は、取引ペアの数を返します。

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

これはファクトリーのメイン関数で、ERC-20トークン間のペア取引所を作成します。 誰でもこの関数を呼び出せることに注意してください。 新しいペア取引所を作成するのにUniswapからの許可は必要ありません。

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

新しい取引所のアドレスを決定的にできるよう、事前にオフチェーンで計算できるようになっており (これは[レイヤー2トランザクション](/developers/docs/layer-2-scaling/)で役立ちます) 、 そうするためには、受け取った順序に関わらずトークンアドレスの順序に一貫性を持たせる必要があります。並べ替えているのは、こうした理由からです。

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

大きな流動性プールは価格がより安定するため、小さなものよりも優れています。 トークンのペアに対して流動性プールを1つ以上持たないようにします。 すでに取引所が存在する場合、同じペアに対して別の取引所を作る必要がないからです。

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

新しいコントラクトを作成するには、作成するコードが必要です(コンストラクタ関数と、実際のコントラクトのEVMバイトコードをメモリに書き込むコードの両方) 。 通常、Solidityで`addr = new <name of contract>(<constructor parameters>)`を使うだけで、コンパイラは全ての処理を実行しますが、決定的なコントラクトアドレスを取得するには、[CREATE2オペコード](https://eips.ethereum.org/EIPS/eip-1014)を使用する必要があります。 このコードが書かれた時点では、このオペコードはSolidityではサポートされていなかったため、コードを手動で実行する必要がありましたが、  [現在SolidityはCREATE2をサポートしている](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2)ため、問題ありません。

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

オペコードがSolidityによってサポートされていなかった時は、 [インラインアセンブリ](https://docs.soliditylang.org/en/v0.8.3/assembly.html)を使って呼び出していました。

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

`initialize`関数を呼び出して、新しい取引所に交換する2つのトークンの種類を伝えます。

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

状態変数に新しいペアの情報を保存し、イベントを発行することで、新しいペア取引所を全世界に周知します。

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

これらの2つの関数は、 `feeSetter`にフィーの受取人を(必要に応じて)制御し、 `feeSetter`を新しいアドレスに変更できます。

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol)は、ERC-20流動性トークンを実装しています。 [OpenZeppelin ERC-20コントラクト](/developers/tutorials/erc20-annotated-code)と類似しているので、異なる箇所である`permit`の機能についてのみ説明します。

イーサリアムでのトランザクションでは、現実のお金に相当するイーサ(ETH)のコストがかかります。 ETHではないERC-20トークンを持っていても、トランザクションを送信することができないため役に立ちません。 この問題を回避する解決策の1つが、[メタトランザクション](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions)です。 トークンの所有者がトランザクションに署名することで、第三者がチェーンからトークンを引き出したり、インターネットを使って受信者へ送信したりすることができます。 ETHを持っている受信者が、所有者の代わりに許可を送信します 。

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

このハッシュは、 [トランザクションタイプのための識別子](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash)です。 ここでサポートされているのは、これらのパラメータを持った`Permit`だけです。

```solidity
    mapping(address => uint) public nonces;
```

受信者が電子署名を偽造することはできませんが、 同じトランザクションを2回送信することは簡単にできてしまいます(これは[リプレイ攻撃](https://wikipedia.org/wiki/Replay_attack)の形です)。 これを防ぐために、[ノンス](https://wikipedia.org/wiki/Cryptographic_nonce)を使います。 新しい`Permit`のノンスが、最後に使用されたノンスに1を足した数でない場合は無効と見なします。

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

これは[チェーン識別子](https://chainid.network/)を取得するためのコードで、 [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html)と呼ばれるEVMアセンブリ方言を使用します。 Yulの現在のバージョンでは、`chainid`ではなく`chainid()`を使用する必要があることに注意してください。

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

EIP-712の[ドメインセパレータ](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator)を計算します。

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

これは、パーミッション(permission)を実装する関数です。 パラメータとして関連するフィールドと[署名](https://yos.io/2018/11/16/ethereum-signatures/)のために3つのスカラー値 (v、r、s) を受け取ります。

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

期限が過ぎると、トランザクションは受け付けません。

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)`は、受信を予定しているメッセージです。 私たちはノンスが何であるべきかを認識しているので、パラメータとして取得する必要はありません。

イーサリアム署名アルゴリズムは、256ビットで署名することになっているため、 `keccak256`ハッシュ関数を使用します。

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

ダイジェストと署名から、[ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/)を使用して署名したアドレスを取得できます。

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

すべて問題なければ、これを[ERC-20承認](https://eips.ethereum.org/EIPS/eip-20#approve)として処理します。

## ペリフェリーコントラクト {#periphery-contracts}

ペリフェリーコントラクトは、UniswapのAPI(アプリケーションプログラムインターフェイス) です。 他のコントラクトや分散型アプリケーションから、外部呼び出しで利用可能です。 コアコントラクトは直接呼び出すことができますが、より複雑で間違えると価値を失ってしまう可能性があります。 コアコントラクトには、他者に対する不正行為がないことを確認するためのテストのみが含まれており、サニティチェックは含まれていません。 ペリフェリーコントラクトには含まれており、必要に応じてアップデートすることができます。

### UniswapV2Router01.sol {#UniswapV2Router01}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol)には問題があるため、[使用してはいけません](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01)。 幸いなことに、ペリフェリーコントラクトはステートレスでアセットを保有していないため、非推奨にするのは簡単です。代わりに、`UniswapV2Router02`を使用するよう提案します。

### UniswapV2Router02.sol {#UniswapV2Router02}

通常は[このコントラクト](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol)を通してUniswapを使用します。 [こちら](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02)で使用方法を確認できます。

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

これらの大半はすでに目にしていると思います。そうでなくても、非常にわかりやすいものです。 唯一の例外は、`IWETH.sol`です。 Uniswap v2は、どのERC-20トークンのペアでも交換可能ですが、イーサ(ETH)自体はERC-20トークンではありません。 ETHは、標準より前から存在しており、独自のメカニズムによって送金されます。 ERC-20トークンが適用されるコントラクトでETHを利用できるようにするため、[ラップドイーサ(WETH)](https://weth.tkn.eth.limo/)が考案されました。 このコントラクトにETHを送ると、同じ量のWETHがミントされます。 WETHをバーンすると、ETHを取り戻すことができます。

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

ルーターは、どのファクトリーを使用するか、WETHを必要とするトランザクションについてはどのWETHコントラクトを使用するかを認識する必要があります。 これらの値は、[不変](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables)であり、コンストラクタでのみ設定できます。 これにより、ユーザーは、不正なコントラクトに変更されることはないという確信を得ることができます。

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

この修飾子は、時間制限のあるトランザクション(「可能なときY時の前にXを実行」) が、時間制限後に発生しないようにするものです。

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

このコンストラクタは、不変な状態変数を設定しています。

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }
```

この関数は、トークンをWETHコントラクトからETHに引き換える際に呼び出されます。 私たちが使用しているWETHコントラクトだけが、これを行うことを許可されています。

#### 流動性の追加 {#add-liquidity}

これらの関数は、ペア取引所にトークンを追加し、流動性プールを増加させます。

```solidity

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
```

この関数は、ペア取引所に入金するAトークンとBトークンの量を計算するために使用されます。

```solidity
        address tokenA,
        address tokenB,
```

これらは、ERC-20トークンコントラクトのアドレスです。

```solidity
        uint amountADesired,
        uint amountBDesired,
```

これらは流動性プロバイダーが入金を希望する量であり、 AとBが入金できる最大量でもあります。

```solidity
        uint amountAMin,
        uint amountBMin
```

これらは受け入れ可能な最低入金量です。 この量以上でトランザクションを実行できない場合は、元に戻します。 この機能を使用しない場合は、ゼロを指定してください。

流動性プロバイダーは通常、トランザクションを現在の交換レートに近いレートに制限したいため、最小値を指定します。 交換レートの変動が大きすぎると、本来の価値を変更するニュースを意味する可能性があり、こうした状況下では、流動性プロバイダーは手動で対応方法を決定したいと考えます。

例えば、交換レートが1対1で、流動性プロバイダーが次の値を指定するケースを想像してください。

| パラメータ          |    値 |
| -------------- | ----:|
| amountADesired | 1000 |
| amountBDesired | 1000 |
| amountAMin     |  900 |
| amountBMin     |  800 |

交換レートが0.9から1.25の間である限り、トランザクションは行われます。 交換レートがこの範囲から外れると、トランザクションはキャンセルされます。

この予防措置の理由は、トランザクションが即時ではなく、送信すると最終的にバリデータがそれらをブロックに含めるためです (ガス価格が非常に低い場合を除きます。その場合は、同じノンスでより高いガス価格で別のトランザクションを送信して上書きする必要があります) 。 送信およびトランザクションを含める処理の間で何が起こるかを制御することはできません。

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

この関数は、リザーブ間の現在の比率と同等の比率を持てるよう、流動性プロバイダーが入金すべき量を返します。

```solidity
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

このトークンペアの取引所がまだない場合は、作成します。

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

ペアの現在のリザーブを取得します。

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

現在のリザーブが空の場合、新しいペア取引所であることがわかります。 流動性プロバイダーが提供したい量とまったく同じ量を入金しなければなりません。

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

量を予想する必要がある場合は、[この関数](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35)を使って最適量を取得します。 現在のリザーブと同じ比率が必要です。

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

`amountBOptimal`が、流動性プロバイダーが希望する入金の量より小さい場合、つまり現在のトークンBの価値が流動性プロバイダーが考えているものよりも高くなるため、量を減らす必要があります。

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Bの最適量がBの希望量よりも大きい場合、現在のBトークンは流動性入金者が考えるよりも価値が低いということになり、量を増やす必要がありますが、 希望量は最大値となっているため、これはできません。 代わりに、Bトークンの希望量に対するAトークンの最適数を計算します。

まとめると、このようなグラフになります。 Aトークンを1000(青線)とBトークンを1000(赤線)を入金しようとしたとします。 X軸は交換レート、A/Bです。 x=1の場合、両者は同じ価値であり、それぞれ1000ずつ入金しています。 x=2の場合、AはBの2倍の価値があるので(Aトークン1つにつき、Bトークン2つが得られる) 、Bトークン1000を入金しても、Aトークンは500にしかなりません。 x=0.5の場合は逆に、Aトークンが1000、Bトークンが500となります。

![グラフ](liquidityProviderDeposit.png)

([UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)を使用して、)直接コアコントラクトへ流動性を入金することもできますが、コアコントラクトはそれ自体に不正がないかだけを確認するものであるため、トランザクションの送信から実行までの間に交換レートが変わった場合、価値を喪失するリスクがあります。 ペリフェリーコントラクトを使った場合、即時に入金すべき量を計算し入金します。これにより、交換レートは変わらず何も失うことはありません。

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

この関数は、流動性を入金するトランザクションによって呼び出されます。 ほとんどのパラメータは上記の`_addLiquidity`と同じですが、下記に2つの例外をご紹介します。

。 `to`はミントされた新しい流動性トークンを取得するアドレスで、流動性プロバイダーのプールの取り分を示します。 `deadline`は、トランザクションの制限時間です。

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

実際に入金する量を計算し、流動性プールのアドレスを見つけます。 ガスを節約するために、ファクトリーに依頼するのではなく、ライブラリ関数`pairFor`を使います (ライブラリ内の下記を参照) 。

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

適正量のトークンをユーザーからペア取引所に送信します。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

代わりに、プールの部分的な所有権のために流動性トークンを`to`アドレスに提供します。 コアコントラクトの`mint`関数は、(最後に流動性が変更されたときと比較して)追加のトークンがいくつあるかを確認し、それに応じて流動性をミントします。

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

流動性プロバイダーが、トークン/ETHのペア取引所に流動性を提供したい場合は、いくつかの相違点があります。 コントラクトは、ラッピングされたETHで流動性プロバイダーを扱います。 ユーザーはトランザクション時にETHを送金するだけで良いため(量は `msg.value`で確認可能)、入金したいETHの数を指定する必要はありません。

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

ETHを入金するには、コントラクトはまずそれをWETHにラップし、次にWETHをペアに送金します。 送金が`assert`でラップされていることに注意してください。 つまり、送金が失敗すると、コントラクトの呼び出しも失敗するので、ラッピングが実際に発生しないということです。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

ユーザーは、ETHをすでに送金しているので、(一方のトークンがユーザーが考えるより価値が低いため) 余りが出てしまう場合は、払い戻しを行う必要があります。

#### 流動性の削除 {#remove-liquidity}

これらの関数は流動性を削除し、流動性プロバイダーに返却します。

```solidity
    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

これは、流動性を削除する最もシンプルなケースです。 各トークンには、流動性プロバイダーが受け入れに同意する最低量があり、期限までに行う必要があります。

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

コアコントラクトの`burn`関数は、ユーザーへトークンを返却する処理をします。

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

関数が複数の値を返した時、私たちが必要なのはその一部なので、必要な値のみを取得する方法はこうなります。 値を読み取ってそれをまったく使用しないよりも、ガス代を抑えることができます。

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

コアコントラクトが返す量(下位アドレスのトークンが最初)から (`tokenA`と`tokenB`に応じて)ユーザが期待する量に置き換えます。

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

最初に送金して、その正当性を確認することは問題ありません。正当でなければ、すべての状態変更は元に戻されるからです。

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

WETHトークンを受け取り、ETHと交換して流動性プロバイダーに戻す点を除いて、ETHの流動性を削除する方法はほぼ同じです。

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

これらの関数はメタトランザクションをリレーし、[許可メカニズム](#UniswapV2ERC20)を使用して、イーサ(ETH)を持たないユーザーがプールから引き出せるようにします。

```solidity

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

この関数は、送金フィーまたはストレージフィーを持つトークンに使用できます。 トークンに当該フィーがある場合、 `removeLiquidity`関数では、返金されるトークンの量を把握することができないため、最初に引き出してから残高を取得する必要があります。

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

最後の関数は、ストレージフィーとメタトランザクションを結び付けています。

#### 取引 {#trade}

```solidity
    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

この関数は、トレーダーへ公開される関数で必要な内部処理を実行します。

```solidity
        for (uint i; i < path.length - 1; i++) {
```

この記事を執筆している時点で、[388,160種のERC-20トークン](https://etherscan.io/tokens)が存在しています。 各トークンのペアごとにペア取引所がある場合、1500億を超えるペア取引所が存在することになります。 現時点では、チェーン全体で、[ERC-20トークンのアカウント数の0.1%しか存在していません](https://etherscan.io/chart/address)。 代わりに、スワップ関数はパスの概念をサポートしています。 トレーダーは、AをBに、BをCに、CをDに交換できるため、A-Dペアを直接交換する必要はありません。

これらのマーケットの価格は同期する傾向にあります。同期していないと、裁定取引の機会が生じてしまうからです。 例えば、3つのトークンA、B、Cで、各ペアに1つずつ合計3つのペア取引所があるとします。

1. 初期状態
2. トレーダーは、Aトークンを24.695売り、Bトークンを25.305得ます。
3. そのトレーダーは、Bトークンを24.695売り、Cトークンを25.305得ます。Bトークン約0.61を利益として保持します。
4. そして、そのトレーダーは、Cトークンを24.695売って、Aトークンを25.305得ます。Cトークンの約0.61を利益として保持します。 そのトレーダーはまた、余分にAトークンを0.61持っています(トレーダーが最終的に得た25.305から、元の投資の24.695を差し引いたもの) 。

| ステップ | A-B取引所                      | B-C取引所                      | A-C取引所                      |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2    | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

現在扱っているペアを取得し、(ペアで使用するために)ソートし、期待される出力量を取得します。

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

期待される出力量を取得し、ペア取引所が期待する方法でソートされます。

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

最後の交換である場合、 交換するために受け取ったトークンを送信先に送ります。 そうでない場合は、次のペア取引所に送ります。

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

実際に、ペア取引所を呼び出してトークンをスワップします。 取引所について伝えるコールバックは必要ないため、フィールドにバイトは送信しません。

```solidity
    function swapExactTokensForTokens(
```

この関数は、トークンを別のトークンにスワップする際にトレーダーが直接使用します。

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

このパラメータには、ERC-20コントラクトのアドレスが含まれています。 上記で説明したように、所有しているアセットから希望するアセットを得るために、いくつかのペア取引所を経由しなければならないため、配列になっています。

Solidityの関数パラメータは、`memory`または`calldata`のいずれかに格納できます。 関数がコントラクトへのエントリポイントである場合、ユーザーによって(トランザクションを使用して)直接別のコントラクトから呼び出されます。 その後、calldataから直接パラメータの値を取ることができます。 上記`_swap`のように、関数が内部で呼び出されている場合、パラメータは`memory`に保存する必要があります。 呼び出されたコントラクトの観点から、 `calldata`は読み取り専用です。

`uint`や`address`などのスカラー型では、コンパイラがストレージの選択をしますが、より長くてより高価な配列では、使用するストレージタイプを指定します。

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

返り値は、常にメモリ内で返されます。

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

各スワップで購入される量を計算します。 結果的にトレーダーが受け入れる最小値を下回った場合は、トランザクションを取り消します。

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

最後に、開始時のERC-20トークンを最初のペア取引所のアカウントに送金し、`_swap`を呼び出します。 これは、すべて同じトランザクション内で発生しているため、ペア取引所は予期しないトークンがこの送金の一部にあることを認識しています。

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

前にある関数`swapTokensForTokens`では、トレーダーが与える入力トークンの正確な数と、トレーダーが受け取りたい出力トークンの最小数を指定することができます。 この関数では、リバーススワップを行います。トレーダーが希望する出力トークンの数と、支払いを希望する入力トークンの最大数を指定できます。

どちらの場合も、トレーダーは最初に、このペリフェリーコントラクトに送金できるようにアローワンスを与えなければなりません。

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

これらの4つの変数はすべて、ETHとトークン間の取引に関連しています。 唯一の違いは、トレーダーからETHを受け取りWETHをミントするために使うか、パスの最終取引所からWETHを受け取り、それをバーンして残ったETHをトレーダーに送り返すかです。

```solidity
    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

これは、送金フィーやストレージフィーがあるトークンをスワップするための内部関数です(詳細は、[問題点(issue)](https://github.com/Uniswap/uniswap-interface/issues/835)をご覧ください) 。

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // scope to avoid stack too deep errors
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

送金フィーがあるため、 各送金で得られるトークン量を知らせてくれる`getAmountsOut`関数に依存することができません(元の`_swap`を呼び出す前に行う方法) 。 代わりに、最初に送金し、戻ったトークンの数を確認する必要があります。

注: 理論的には、`_swap`の代わりにこの関数を使うことができますが、特定のケースにおいては、ガス代が高くつくことになります(例えば、 必要最低量に満たないため、最終的に送金処理が元に戻された場合) 。 送金フィートークンは極めてレアなため、受け入れる必要はありますが、少なくとも1つのスワップを経由すると仮定した場合、すべてのスワップで受け入れる必要はありません。

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

これらは通常のトークンに使用されるものと類似した変数ですが、代わりに `_swapSupportingFeeOnTransferTokens`を呼び出します。

```solidity
    // **** LIBRARY FUNCTIONS ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

これらの関数は、[UniswapV2ライブラリ関数](#uniswapV2library)を呼び出すプロキシにすぎません。

### UniswapV2Migrator.sol {#UniswapV2Migrator}

このコントラクトは、取引所を以前のv1からv2へ移行するために使用されました。 現在は、移行済みのため使われません。

## ライブラリ {#libraries}

[SafeMathライブラリ](https://docs.openzeppelin.com/contracts/2.x/api/math)は、十分にドキュメント化されているため、ここでドキュメント化する必要はありません。

### 数学 {#Math}

このライブラリには、Solidityコードで通常は必要としない、言語に含まれていない数学関数があります。

```solidity
pragma solidity =0.5.16;

// a library for performing various math operations

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylonian method (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

平方根よりも高い推定値であるxから始めます(これが、1～3を特殊なケースとして扱う必要がある理由です)。

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

前回の推定値とその平方根を求めようとしている数の平均値を、前回の推定値で割って、より正確な推定値を求めます。 新しい推定値が既存の推定値より低くなくなるまで繰り返します。 詳細については、[こちら](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)をご覧ください。

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

ゼロの平方根は必要ありません。 1、2、3 の平方根はおおよそ1です(整数を使用するため、小数部分は無視します) 。

```solidity
        }
    }
}
```

### 固定点小数(UQ112x112) {#FixedPoint}

このライブラリは、通常イーサリアムの算術の一部ではない小数を処理します。 数字_x_を_x\*2^112_としてコード化して実行することで、 元の加算および減算オペコードをそのまま使用できます。

```solidity
pragma solidity =0.5.16;

// a library for handling binary fixed point numbers (https://wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1]
// resolution: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112`は、コード化の1つです。

```solidity
    // encode a uint112 as a UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows
    }
```

yは、`uint112`であるため、大体の値は2^112-1です。 この数字は、`UQ112x112`としてコード化することができます。

```solidity
    // divide a UQ112x112 by a uint112, returning a UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

2つの`UQ112x112`の値を割ると、結果は2^112で乗算されなくなります。 そのため、代わりに分母に整数を使用します。 乗算を行うには同様のトリックを使用する必要がありますが、`UQ112x112`の値の乗算を行う必要はありません。

### UniswapV2ライブラリ {#uniswapV2library}

このライブラリは、ペリフェリーコントラクトにのみ使用されます。

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

2つのトークンをアドレス順に並び替えて、それらのペア取引所のアドレスを取得できるようにします。 これをしないと、パラメーターA、Bの場合とパラメーターB、Aの場合の2つの可能性が生じ、1つではなく、2つの交換になってしまうため、必ず行ってください。

```solidity
    // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash
            ))));
    }
```

この関数は、2つのトークンのペア取引所のアドレスを計算します。 このコントラクトは、[CREATE2オペコード](https://eips.ethereum.org/EIPS/eip-1014)を使用して作成されるため、使用するパラメータがわかっていれば同じアルゴリズムを使用してアドレスを計算できます。 これはファクトリーよりも大幅に安くなります。

```solidity
    // fetches and sorts the reserves for a pair
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

この関数は、ペア取引所が持っている2つのトークンのリザーブを返します。 どちらの順序でもトークンを受け取る可能性があり、内部使用のためにソートすることに注意してください。

```solidity
    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

この関数は、フィーがかからない場合に、トークンAと引き換えに得られるトークンBの量を示します。 この計算では、送金によって交換レートが変わることが考慮されています。

```solidity
    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

上記の`quote`関数は、ペア交換フィーがかからない場合に最適です。 ただし、0.3%の交換フィーがかかる場合、実際に得られる量は少なくなります。 この関数は、交換フィーを差し引いた量を計算します。

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidityは小数をネイティブに扱うことができないため、単に0.997を掛けることはできません。 代わりに、分子に997を、分母に1000を掛けて同じ結果を得ます。

```solidity
    // given an output amount of an asset and pair reserves, returns a required input amount of the other asset
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

この関数はほぼ同じことを行いますが、出力量を取得して入力を提供します。

```solidity

    // performs chained getAmountOut calculations on any number of pairs
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // performs chained getAmountIn calculations on any number of pairs
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

これらの2つの関数は、複数のペア取引所を経由する必要がある場合に、値を特定します。

### 送金ヘルパー {#transfer-helper}

この[ライブラリ](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol)は、元の状態に戻せるよう、ERC-20およびイーサリアム送金関連の成功チェックを追加し、同様の方法で`false`値も返します。

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

次の2つの方法のいずれかで異なるコントラクトを呼び出すことができます。

- インターフェイス定義を使い、関数呼び出しを作成。
- [アプリケーションバイナリインターフェース (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html)を使って「手動」で呼び出しを作成。 これは、コードの作成者が行います。

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

ERC-20標準以前に作成されたトークンとの後方互換性の便宜上、ERC-20の呼び出しは次のいずれかによって失敗することがあります。1つ目は、(`success`が`false`である場合) 元に戻すことによる失敗、2つ目は、(出力データがあり、それをブール値としてデコードすると`false`になる場合) 成功したうえで`false`値を返すことによる失敗です。

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

この関数は、[ERC-20の送金機能](https://eips.ethereum.org/EIPS/eip-20#transfer)を実装しており、あるアカウントが別のアカウントから提供されたアローワンスを使うことができます。

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

この関数は、[ERC-20のtransferFrom機能](https://eips.ethereum.org/EIPS/eip-20#transferfrom)を実装しており、あるアカウントが別のアカウントから提供されたアローワンスを使うことができます。

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

この関数は、アカウントにイーサ(ETH)を送金します。 異なるコントラクトへのすべての呼び出しで、イーサ(ETH)の送信ができます。 実際には関数を呼び出す必要がないため、この呼び出しでデータを送信することはありません。

## まとめ {#conclusion}

この記事は、約50ページにおよびます。 ここまで読んでいただきありがとうございました。 (短いサンプルプログラムとは対照的に)実際のアプリケーションを作成する際の考慮事項を理解し、独自のユースケースにおいてコントラクトを作成できるようになったことを願っています。

ぜひ有用なコードを書いていただき、私たちを驚かせてください。
