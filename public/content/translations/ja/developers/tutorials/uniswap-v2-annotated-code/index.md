---
title: "Uniswap-v2コントラクトの詳細解説"
description: "Uniswap-v2コントラクトはどのように機能するのか? なぜそのように記述されているのか?"
author: Ori Pomerantz
tags: [ "Solidity" ]
skill: intermediate
published: 2021-05-01
lang: ja
---

## はじめに {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf)は、任意の2つのERC-20トークン間で取引市場を作成できます。 この記事では、このプロトコルを実装するコントラクトのソースコードをレビューし、なぜこのように記述されているのかを見ていきます。

### Uniswapの機能 {#what-does-uniswap-do}

基本的に、流動性プロバイダーとトレーダーの2種類のユーザーが存在します。

_流動性プロバイダー_は、交換可能な2つのトークン(ここでは**Token0**と**Token1**と呼びます)をプールに提供します。 その見返りとして、_流動性トークン_と呼ばれるプールの一部所有権を表す第3のトークンを受け取ります。

_トレーダー_は、ある種類のトークンをプールに送り、流動性プロバイダーが提供するプールから他のトークン(例えば、**Token0**を送って**Token1**を受け取る)を受け取ります。 交換レートは、プールが保有する**Token0**と**Token1**の相対的な数で決定されます。 さらに、プールは流動性プールへの報酬として少額のパーセンテージを受け取ります。

流動性プロバイダーが資産を取り戻したい場合は、プールトークンをバーンして、報酬の分け前を含めた元のトークンを受け取ることができます。

[詳細な説明はこちら](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/)。

### なぜv2なのか? なぜv3ではないのか? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf)は、v2よりもはるかに複雑なアップグレードです。 まずv2を学んでからv3に進む方が簡単です。

### コアコントラクト vs ペリフェリーコントラクト {#contract-types}

Uniswap v2は、コアとペリフェリーの2つのコンポーネントに分かれています。 この分割により、資産を保有し、したがって安全でなければならないコアコントラクトを、よりシンプルで監査しやすくすることができます。 トレーダーが必要とするすべての追加機能は、ペリフェリーコントラクトによって提供されます。

## データと制御のフロー {#flows}

これは、Uniswapの3つの主要なアクションを実行するときに発生するデータと制御のフローです。

1. 異なるトークン間のスワップ
2. 市場に流動性を追加し、ペア取引所のERC-20流動性トークンで報酬を得る
3. ERC-20流動性トークンをバーンし、ペア取引所でトレーダーが交換できるERC-20トークンを取り戻す

### スワップ {#swap-flow}

これはトレーダーが使用する最も一般的なフローです:

#### 呼び出し元 {#caller}

1. スワップされる量のアローワンス(許容量)をペリフェリーアカウントに提供します。
2. ペリフェリーコントラクトの多数あるスワップ関数のうち1つを呼び出します(どの関数を呼び出すかは、ETHが関与しているか、トレーダーが入金するトークンの量や受け取るトークンの量を指定するかなどによって決まります)。
   すべてのスワップ関数は、経由する取引所の配列である`path`を受け入れます。

#### ペリフェリーコントラクト(UniswapV2Router02.sol)にて {#in-the-periphery-contract-uniswapv2router02-sol}

3. パスに沿って各取引所で取引する必要がある量を特定します。
4. パスを反復処理します。 経路上のすべての取引所について、入力トークンを送信し、取引所の`swap`関数を呼び出します。
   ほとんどの場合、トークンの宛先アドレスはパス上の次のペア取引所になります。 最後の取引所では、トレーダーが提供したアドレスになります。

#### コアコントラクト(UniswapV2Pair.sol)にて {#in-the-core-contract-uniswapv2pairsol-2}

5. コアコントラクトで不正が行われておらず、スワップ後も十分な流動性を維持できることを検証します。
6. 既知のリザーブに加えて、どれだけの追加トークンがあるかを確認します。 その量が、交換のために受け取った入力トークンの数です。
7. 出力トークンを宛先に送信します。
8. `_update`を呼び出してリザーブ量を更新します。

#### ペリフェリーコントラクト(UniswapV2Router02.sol)に戻る {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. 必要なクリーンアップを実行します(例: WETHトークンをバーンしてETHに戻し、トレーダーに送信する)。

### 流動性の追加 {#add-liquidity-flow}

#### 呼び出し元 {#caller-2}

1. 流動性プールに追加される量のアローワンス(許容量)をペリフェリーアカウントに提供します。
2. ペリフェリーコントラクトの`addLiquidity`関数の1つを呼び出します。

#### ペリフェリーコントラクト(UniswapV2Router02.sol)にて {#in-the-periphery-contract-uniswapv2router02sol-2}

3. 必要に応じて新しいペア取引所を作成します。
4. 既存のペア取引所がある場合は、追加するトークンの量を計算します。 これは両方のトークンで同じ値であることが想定されているため、新規トークンと既存トークンの比率は同じになるはずです。
5. 受け取り可能なトークンの量かどうか確認します(実行者は流動性の追加を希望しない最低量を指定することができます)。
6. コアコントラクトを呼び出します。

#### コアコントラクト(UniswapV2Pair.sol)にて {#in-the-core-contract-uniswapv2pairsol-2}

7. 流動性トークンをミントして、呼び出し元に送信します。
8. `_update`を呼び出してリザーブ量を更新します。

### 流動性の削除 {#remove-liquidity-flow}

#### 呼び出し元 {#caller-3}

1. ペリフェリーアカウントに、基礎となるトークンと引き換えにバーンされる流動性トークンのアローワンス(許容量)を提供します。
2. ペリフェリーコントラクトの`removeLiquidity`関数の内の1つを呼び出します。

#### ペリフェリーコントラクト(UniswapV2Router02.sol)にて {#in-the-periphery-contract-uniswapv2router02sol-3}

3. ペア取引所に流動性トークンを送ります。

#### コアコントラクト(UniswapV2Pair.sol)にて {#in-the-core-contract-uniswapv2pairsol-3}

4. バーンされたトークンの量に応じて、基礎となるトークンを宛先アドレスに送ります。 例えば、プールにAトークンが1000個、Bトークンが500個、流動性トークンが90個あるとします。流動性トークン9個を受け取ってバーンすると、流動性トークンの10％をバーンすることになり、ユーザーに100個のAトークンと50個のBトークンが返されることになります。
5. 流動性トークンをバーンします。
6. `_update`を呼び出してリザーブ量を更新します。

## コアコントラクト {#core-contracts}

これらは流動性を保持する安全なコントラクトです。

### UniswapV2Pair.sol {#UniswapV2Pair}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol)は、トークンを交換する実際のプールを実装します。 これはUniswapの中核機能です。

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

これらはすべて、コントラクトが認識する必要のあるインターフェースです。コントラクトがそれらを実装しているか(`IUniswapV2Pair`と`UniswapV2ERC20`)、あるいはそれらを実装したコントラクトを呼び出しているためです。

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

このコントラクトは、流動性トークンのERC-20関数を提供する`UniswapV2ERC20`を継承しています。

```solidity
    using SafeMath  for uint;
```

[SafeMathライブラリ](https://docs.openzeppelin.com/contracts/2.x/api/math)は、オーバーフローやアンダーフローを回避するために使用されます。 このライブラリがないと、-1であるべき値が2^256-1になってしまうことがあるため、これは重要です。

```solidity
    using UQ112x112 for uint224;
```

プールコントラクトの計算の多くは小数を必要とします。 しかし、小数はEVMでサポートされていません。
Uniswapが考えた解決策は、224ビット値を使用することです。整数部分に112ビット、小数部分に112ビットを使います。 つまり、`1.0`は`2^112`、`1.5`は`2^112 + 2^111`のように表します。

このライブラリの詳細については、[このドキュメントの後半](#FixedPoint)で説明します。

#### 変数 {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

ゼロ除算のケースを回避するため、流動性トークンには常に最小数が存在します(ただし、ゼロアカウントが所有しています)。 その数は**MINIMUM_LIQUIDITY**であり、1000です。

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

これらは、このプールで交換可能な2種類のERC-20トークンのコントラクトアドレスです。

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

プールが保有する各種トークンのリザーブです。 2つが同じ値であると仮定すると、各token0はreserve1/reserve0個のtoken1に相当します。

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

交換が行われた最後のブロックのタイムスタンプで、時間の経過とともに交換レートを追跡する際に使用されます。

イーサリアムのコントラクトで最もガス代が高くなるものの1つはストレージで、これはコントラクトの呼び出しから次の呼び出しまで持続します。 各ストレージセルは256ビット長です。 そのため、3つの変数`reserve0`、`reserve1`、`blockTimestampLast`は、1つのストレージ値に3つすべてを含めることができるように割り当てられています(112+112+32=256)。

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

これらの変数は、各トークンの累積コストを(お互いの価値で)保有します。 これらは一定期間の平均交換レートを算出する際に使用できます。

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

ペア取引所がtoken0とtoken1の間の交換レートを決定する方法は、取引中に2つのリザーブの積を一定に保つことです。 `kLast`がその値です。 流動性プロバイダーがトークンを入出金するとこの値は変化し、0.3%の市場手数料によって若干増加します。

以下に簡単な例をご紹介します。 ただし、簡潔化のため、表は小数点以下3桁までとし、0.3%の取引手数料は無視しているため、数値は正確ではありません。

| イベント                                                 |                  reserve0 |                  reserve1 | reserve0 \* reserve1 | 平均交換レート(token1 / token0) |
| ---------------------------------------------------- | ------------------------: | ------------------------: | -------------------: | ------------------------------------------- |
| 初期設定                                                 | 1,000.000 | 1,000.000 |            1,000,000 |                                             |
| トレーダーAが50 token0を47.619 token1とスワップ  | 1,050.000 |   952.381 |            1,000,000 | 0.952                       |
| トレーダーBが10 token0を8.984 token1とスワップ   | 1,060.000 |   943.396 |            1,000,000 | 0.898                       |
| トレーダーCが40 token0を34.305 token1とスワップ  | 1,100.000 |   909.090 |            1,000,000 | 0.858                       |
| トレーダーDが100 token1を109.01 token0とスワップ |   990.990 | 1,009.090 |            1,000,000 | 0.917                       |
| トレーダーEが10 token0を10.079 token1とスワップ  | 1,000.990 |   999.010 |            1,000,000 | 1.008                       |

トレーダーが提供するtoken0の量が増えるほど、需要と供給によりtoken1の相対的価値も上がり、その逆もまた同様です。

#### ロック {#pair-lock}

```solidity
    uint private unlocked = 1;
```

[リエントランシー攻撃](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14)に基づくセキュリティ脆弱性の一種があります。 Uniswapは任意のERC-20トークンを転送する必要があるため、それらを呼び出すUniswap市場を悪用しようとするERC-20コントラクトを呼び出す可能性があります。
コントラクトの一部に`unlocked`変数を含めることで、(同じトランザクション内で)実行中に関数が呼び出されるのを防ぐことができます。

```solidity
    modifier lock() {
```

この関数は[修飾子(modifier)](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers)であり、通常の関数をラップしてその動作を何らかの形で変更する関数です。

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

`unlocked`が1の場合は0に設定します。 すでに0の場合は呼び出しを元に戻し、失敗させます。

```solidity
        _;
```

修飾子において、`_;`は(すべてのパラメータを含む)元の関数呼び出しです。 これは、関数が呼び出されたときに`unlocked`が1であり、実行中に`unlocked`の値が0になった場合のみ、関数呼び出しが発生することを意味します。

```solidity
        unlocked = 1;
    }
```

メイン関数が戻った後、ロックを解除します。

#### その他 の関数 {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

この関数は、呼び出し元に取引所の現在の状態を提供します。 Solidityの関数は[複数の値を返す](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values)ことができることに注意してください。

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

この内部関数は、ある量のERC20トークンを取引所から第三者に転送します。 `SELECTOR`は、呼び出している関数が`transfer(address,uint)`(上記の定義を参照)であることを指定しています。

トークン関数のインターフェースをインポートする必要がないように、[ABI関数](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions)の1つを使用して「手動で」呼び出しを作成します。

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

ERC-20転送コールが失敗を報告するには、2つの方法があります。

1. リバート。 外部コントラクトへの呼び出しがリバートされると、ブール値の戻り値は`false`になります。
2. 正常に終了するが、失敗を報告する。 その場合、戻り値バッファの長さはゼロ以外になり、ブール値としてデコードすると`false`になります。

これらの条件のいずれかが発生した場合は、リバートします。

#### イベント {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

これら2つのイベントは、流動性プロバイダーが流動性を入金(`Mint`)または引き出した(`Burn`)場合に発行されます。 いずれの場合も、預け入れまたは引き出されたtoken0とtoken1の量と、呼び出したアカウントのアイデンティティ(`sender`)は、イベントに含まれます。 引き出しの場合、イベントにはトークンを受け取るターゲット(`to`)も含まれますが、これは送信者と同じとは限りません。

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

このイベントは、トレーダーがあるトークンを別のトークンとスワップしたときに発行されます。 ここでも、送信者と宛先が同じとは限りません。
各トークンは、取引所に送信されるか、取引所から受信されます。

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

最後に、`Sync`は、理由に関係なくトークンが追加または引き出されるたびに発行され、最新のリザーブ情報(したがって交換レート)を提供します。

#### セットアップ関数 {#pair-setup}

これらの関数は、新しいペア取引所がセットアップされたときに1度だけ呼び出されることになっています。

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

コンストラクタは、ペアを作成したファクトリのアドレスを確実に追跡できるようにします。 この情報は、`initialize`と(存在する場合)ファクトリー手数料に必要です。

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

この関数では、ファクトリー(のみ)が、このペアが交換する2つのERC-20トークンを指定できます。

#### 内部更新関数 {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

この関数は、トークンの入金や引き出しのたびに呼び出されます。

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

balance0またはbalance1(uint256)のいずれかがuint112(-1) (=2^112-1)よりも大きい場合(つまり、uint112に変換されるとオーバーフローして0に戻る場合)、オーバーフローを防ぐために\_updateの続行を拒否します。 10^18単位に分割できる通常のトークンでは、これは各取引所が各トークン約5.1\*10^15に制限されることを意味します。 これまでのところ、問題は発生していません。

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

経過時間がゼロでない場合は、このブロックで最初の交換トランザクションであることを意味します。 その場合、コストアキュムレータを更新する必要があります。

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

各コストアキュムレータは、最新のコスト(他のトークンのリザーブ/このトークンのリザーブ)に経過時間(秒)を掛けて更新されます。 平均価格を求めるには、2つの時点の累積価格を読み、その時間差で割ります。 例えば、次の一連のイベントを想定してください。

| イベント                                                   |                  reserve0 |                  reserve1 | タイムスタンプ | 限界交換率(reserve1 / reserve0) |                                                       price0CumulativeLast |
| ------------------------------------------------------ | ------------------------: | ------------------------: | ------- | --------------------------------------------: | -------------------------------------------------------------------------: |
| 初期設定                                                   | 1,000.000 | 1,000.000 | 5,000   |                         1.000 |                                                                          0 |
| トレーダーAがtoken0を50入金し、token1を47.619受け取る  | 1,050.000 |   952.381 | 5,020   |                         0.907 |                                                                         20 |
| トレーダーBがtoken0を10入金し、token1を8.984受け取る   | 1,060.000 |   943.396 | 5,030   |                         0.890 |                       20+10\*0.907 = 29.07 |
| トレーダーCがtoken0を40入金し、token1を34.305受け取る  | 1,100.000 |   909.090 | 5,100   |                         0.826 |    29.07+70\*0.890 = 91.37 |
| トレーダーDがtoken1を100入金し、token0を109.01受け取る |   990.990 | 1,009.090 | 5,110   |                         1.018 |    91.37+10\*0.826 = 99.63 |
| トレーダーEがtoken0を10入金し、token1を10.079受け取る  | 1,000.990 |   999.010 | 5,150   |                         0.998 | 99.63+40\*1.1018 = 143.702 |

タイムスタンプ5,030から5,150の間の**Token0**の平均価格を計算してみましょう。 `price0Cumulative`の値の差は、143.702-29.07=114.632です。 これは2分間(120秒)の平均値です。 つまり、平均価格は114.632/120 = 0.955となります。

古いリザーブサイズを把握しておく必要があるのは、この価格計算のためです。

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

最後に、グローバル変数を更新し、`Sync`イベントを発行します。

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Uniswap 2.0では、トレーダーは市場の利用料として0.30%の手数料を支払います。 その手数料のほとんど(取引の0.25%)は、常に流動性プロバイダーに支払われます。 残りの0.05%は、流動性プロバイダーまたは、プロトコル手数料としてファクトリで指定されたアドレスへ送られます。このプロトコル手数料は、Uniswapの開発努力に対して支払われます。

計算量(およびそれに伴うガス代)を削減するため、この手数料は、トランザクションごとではなく、プールから流動性が追加または削除されるときだけ計算されます。

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

ファクトリーの手数料送信先を読み取ります。 ゼロの場合、プロトコル手数料はかからず、その手数料を計算する必要もありません。

```solidity
        uint _kLast = kLast; // gas savings
```

`kLast`状態変数はストレージに格納されているため、コントラクトへの異なる呼び出し間で値を持ちます。
ストレージへのアクセスは、コントラクトへの関数呼び出しが終了したときに解放される揮発性メモリへのアクセスよりもはるかに高価なため、内部変数を使ってガス代を節約します。

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

流動性プロバイダーは、流動性トークンの価値が上昇するだけで取り分を得られます。 しかし、プロトコル手数料には、新しい流動性トークンをミントし、`feeTo`アドレスに提供する必要があります。

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

プロトコル手数料を徴収する新しい流動性がある場合です。 平方根関数については、[この記事の後半](#Math)で説明します。

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

この複雑な手数料の計算方法については、[ホワイトペーパー](https://app.uniswap.org/whitepaper.pdf)の5ページ目で説明されています。 `kLast`が計算された時から現在までの間に流動性が追加または削除されていないことがわかります (なぜなら、流動性が実際に変化する前に、流動性が追加または削除されるたびにこの計算を実行するため)。そのため、`reserve0 * reserve1`の変更は、トランザクション手数料に起因する必要があります (それがなければ、`reserve0 * reserve1`は一定に保たれます)。

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

手数料がない場合、`kLast`がゼロでなければゼロに設定します。 このコントラクトが書かれたとき、[ガス払い戻し機能](https://eips.ethereum.org/EIPS/eip-3298)がありました。この機能は、コントラクトが不要なストレージをゼロにすることで、イーサリアム全体のステートサイズを縮小するよう促すものでした。
このコードは、可能な場合にその払い戻しを受けます。

#### 外部からアクセス可能な関数 {#pair-external}

どのトランザクションまたはコントラクトでもこれらの関数を呼び出すことはできますが、ペリフェリーコントラクトから呼び出されるように設計されていることに注意してください。 直接呼び出すと、ペア取引所で不正行為はできませんが、誤って価値を失ってしまう可能性があります。

##### ミント

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

この関数は、流動性プロバイダーが流動性をプールへ追加するときに呼び出されます。 報酬として追加の流動性トークンをミントします。 同じトランザクションで流動性を追加した後にそれを呼び出す[ペリフェリーコントラクト](#UniswapV2Router02)から呼び出されるべきです(そうすることで、他の誰もが正当な所有者より前に、新しい流動性を要求するトランザクションを送信できなくなります)。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
```

これは、複数の値を返すSolidity関数の結果を読み取る方法です。 最後に返された値であるブロックのタイムスタンプは必要ないため、破棄します。

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

現在の残高を取得し、各トークンタイプでいくら追加されたかを確認します。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

収集すべきプロトコルフィーがあれば計算し、それに応じて流動性トークンをミントします。 `_mintFee`のパラメータは古いリザーブ値であるため、フィーは、フィーによるプールの変更のみに基づいて正確に計算されます。

```solidity
        uint _totalSupply = totalSupply; // ガス代節約のため、totalSupplyは_mintFeeで更新される可能性があるため、ここで定義する必要があります
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // 最初のMINIMUM_LIQUIDITYトークンを永久にロックします
```

これが最初の入金である場合は、`MINIMUM_LIQUIDITY`トークンを作成し、それらをロックするためにゼロアドレスに送信します。 それらは償還できないため、プールが完全に空になることはありません(これにより、いくつかの箇所でゼロによる除算を回避できます)。 `MINIMUM_LIQUIDITY`の値は1000です。ETHがweiに分割されるように、ほとんどのERC-20はトークンの10^-18乗の単位に細分化されることを考えると、これは単一トークンの価値の10^-15に相当します。 高コストではありません。

最初の入金時点では、2つのトークンの相対的価値が不明なため、金額を掛けて平方根を求めます。入金によって両方のトークンに同等の価値が提供されると仮定します。

裁定取引で価値を失うのを避け、同等の価値を提供することが預金者の利益になるため、これは信頼できます。
2つのトークンの価値が同一であると仮定しますが、預金者は**Token0**の4倍の**Token1**を預け入れました。 トレーダーは、ペア取引所が**Token0**の方が価値が高いと考えている事実を利用して、そこから価値を引き出すことができます。

| イベント                                            | reserve0 | reserve1 | reserve0 \* reserve1 | プールの値(reserve0 + reserve1) |
| ----------------------------------------------- | -------: | -------: | -------------------: | --------------------------------------------: |
| 初期設定                                            |        8 |       32 |                  256 |                                            40 |
| トレーダーは8つの**Token0**トークンを預け入れ、16の**Token1**を返します |       16 |       16 |                  256 |                                            32 |

ご覧のように、トレーダーは追加で8トークンを獲得しましたが、これはプールの価値の減少によるもので、それを所有する預金者に損害を与えました。

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

その後のすべての預金で、2つの資産間の為替レートはすでに分かっており、流動性プロバイダーが両方で同等の価値を提供することを期待しています。 そうしない場合は、罰として、提供された価値よりも低い流動性トークンを与えます。

初回入金であろうと、その後の入金であろうと、私たちが提供する流動性トークンの数は、`reserve0*reserve1`の変化の平方根に等しく、流動性トークンの価値は変わりません(両方のタイプで同等の価値を持たない入金があった場合を除き、その場合は「罰金」が分配されます)。 ここにもう1つ、同じ価値を持つ2つのトークンの例を示します。3つが良い入金で、1つが悪い入金です(1種類のトークンのみの入金なので、流動性トークンは生成されません)。

| イベント      |                reserve0 |                reserve1 | reserve0 \* reserve1 | プール値(reserve0 + reserve1) | この入金でミントされた流動性トークン | 流動性トークン合計 |            各流動性トークンの価値 |
| --------- | ----------------------: | ----------------------: | -------------------: | -------------------------------------------: | -----------------: | --------: | ---------------------: |
| 初期設定      |   8.000 |   8.000 |                   64 |                       16.000 |                  8 |         8 |  2.000 |
| 各種4つずつ入金  |  12.000 |  12.000 |                  144 |                       24.000 |                  4 |        12 |  2.000 |
| 各種2つずつ入金  |  14.000 |  14.000 |                  196 |                       28.000 |                  2 |        14 |  2.000 |
| 等しくない値を入金 |  18.000 |  14.000 |                  252 |                       32.000 |                  0 |        14 | 〜2.286 |
| 裁定取引後     | 〜15.874 | 〜15.874 |                  252 |                      〜31.748 |                  0 |        14 | 〜2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

`UniswapV2ERC20._mint`関数を使用して、追加の流動性トークンを実際に作成し、正しいアカウントに付与します。

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0とreserve1は最新の状態です
        emit Mint(msg.sender, amount0, amount1);
    }
```

状態変数(`reserve0`、`reserve1`、必要に応じて`kLast`)を更新し、適切なイベントを発行します。

##### burn

```solidity
    // この低レベル関数は、重要な安全確認を行うコントラクトから呼び出す必要があります
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

この関数は、流動性が引き出され、適切な流動性トークンをバーンする必要がある場合に呼び出されます。
また、[ペリフェリーアカウント](#UniswapV2Router02)からも呼び出される必要があります。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // ガス節約
        address _token0 = token0;                                // ガス節約
        address _token1 = token1;                                // ガス節約
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

ペリフェリーコントラクトは、呼び出しの前に、このコントラクトにバーンされる流動性を転送します。 これにより、バーンする流動性の量を把握し、確実にバーンされることを確認できます。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // ガス節約のため、totalSupplyは_mintFeeで更新される可能性があるため、ここで定義する必要があります
        amount0 = liquidity.mul(balance0) / _totalSupply; // 残高を使用することで比例配分を保証します
        amount1 = liquidity.mul(balance1) / _totalSupply; // 残高を使用することで比例配分を保証します
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

流動性プロバイダーは、両方のトークンの同等の価値を受け取ります。 これにより、交換レートを変更しません。

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0とreserve1は最新です
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

`burn`関数の残りの部分は、上記の`mint`関数と鏡写しの関係にあります。

##### swap

```solidity
    // この低レベル関数は、重要な安全確認を行うコントラクトから呼び出す必要があります
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

この関数も[ペリフェリーコントラクト](#UniswapV2Router02)から呼び出されることになっています。

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // ガス節約
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // _token{0,1}のスコープ、スタックが深すぎるエラーを回避
```

ローカル変数はメモリに保存するか、数が多すぎない場合は直接スタックに保存できます。
スタックを使用できるように数を制限すれば、ガスの使用量を削減できます。 詳細については、[正式なイーサリアムの仕様であるイエローペーパー](https://ethereum.github.io/yellowpaper/paper.pdf)の26ページ、式298を参照してください。

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // 楽観的にトークンを転送
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // 楽観的にトークンを転送
```

この転送は、すべての条件が満たされていることを確認する前に転送するため、楽観的です。 これはイーサリアムでは問題ありません。なぜなら、呼び出しの後半で条件が満たされない場合、そこから元に戻され、作成された変更もすべて元に戻されるからです。

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

リクエストされた場合、受信者にスワップについて通知します。

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

現在の残高を取得します。 ペリフェリーコントラクトは、スワップを呼び出す前にトークンを送信します。 これにより、コントラクトは不正行為がないことを簡単に確認できます。このチェックは、コアコントラクトで行う_必要_があります(なぜなら、ペリフェリーコントラクト以外のエンティティからも呼び出される可能性があるため)。

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // reserve{0,1}Adjustedのスコープ、スタックが深すぎるエラーを回避
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

これは、スワップによる損失がないことを確認するためのサニティチェックです。 いかなる状況でも、スワップによって`reserve0*reserve1`が減少することはありません。 これは、スワップで0.3%の手数料が送信されることを保証する場所でもあります。K値のサニティチェックをする前に、両方の残高に1000を掛け、3を掛けた金額を引きます。これは、現在のリザーブのK値と比較する前に、残高から0.3%(3/1000 = 0.003 = 0.3%)が差し引かれることを意味します。

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

`reserve0`と`reserve1`を更新し、必要に応じて価格アキュムレータとタイムスタンプも更新して、イベントを発行します。

##### SyncまたはSkim

実際の残高が、ペア取引所が持っていると考えるリザーブと同期しなくなる可能性があります。
コントラクトの同意なしにトークンを引き出す方法はありませんが、入金は別の問題です。 アカウントは、`mint`または`swap`のいずれかを呼び出すことなくトークンを取引所に転送できます。

その場合、2つの解決策があります。

- `sync`、リザーブを現在の残高に更新します。
- `skim`、余分な金額を引き出します。 誰がトークンを入金したか不明なため、どのアカウントでも`skim`を呼び出せることに注意してください。 この情報はイベント内で発行されますが、イベントはブロックチェーンからはアクセスできません。

```solidity
    // 残高をリザーブに一致させる
    function skim(address to) external lock {
        address _token0 = token0; // ガス節約
        address _token1 = token1; // ガス節約
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // リザーブを残高に一致させる
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol)はペア取引所を作成します。

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

これらの状態変数は、プロトコルフィーを実装するために必要です([ホワイトペーパー](https://app.uniswap.org/whitepaper.pdf)の5ページ参照)。
`feeTo`アドレスはプロトコルフィーのための流動性トークンを蓄積し、`feeToSetter`は`feeTo`を別のアドレスに変更できるアドレスです。

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

これらの変数は、ペア、つまり2種類のトークン間の交換を追跡します。

1つ目の`getPair`は、交換する2つのERC-20トークンに基づいてペア取引所コントラクトを識別するマッピングです。 ERC-20トークンは、それらを実装するコントラクトのアドレスによって識別されるため、キーと値はすべてアドレスです。 `tokenA`から`tokenB`に変換できるペア取引所のアドレスを取得するには、`getPair[<tokenA address>][<tokenB address>]`を使用します(またはその逆)。

2つ目の変数`allPairs`は、このファクトリーによって作成されたすべてのペア取引所のアドレスを含む配列です。 イーサリアムでは、マッピングのコンテンツを反復処理したり、すべてのキーのリストを取得したりすることはできないため、この変数が、このファクトリーがどの取引所を管理しているかを知る唯一の方法となります。

注: マッピングのすべてのキーを反復処理できない理由は、コントラクトのデータストレージが高価であるため、使用量が少ないほど良く、変更頻度が少ないほど良いからです。 [反復をサポートするマッピング](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)を作成することもできますが、キーのリストのために追加のストレージが必要です。 ほとんどのアプリケーションでは、それは必要ありません。

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

このイベントは、新しいペア取引所が作成されたときに発行されます。 これには、トークンのアドレス、ペア取引所のアドレス、およびファクトリーによって管理される取引所の総数が含まれます。

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

コンストラクタが行う唯一のことは、`feeToSetter`を指定することです。 ファクトリーは手数料なしで開始し、`feeSetter`のみがそれを変更できます。

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

この関数は、交換ペアの数を返します。

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

これはファクトリーの主な機能で、2つのERC-20トークン間のペア取引所を作成します。 誰でもこの関数を呼び出せることに注意してください。 新しいペア取引所を作成するのにUniswapからの許可は必要ありません。

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

新しい取引所のアドレスは決定論的である必要があるため、オフチェーンで事前に計算できます(これは[レイヤー2トランザクション](/developers/docs/scaling/)に役立ちます)。
これを行うには、トークンアドレスの順序が受け取った順序に関わらず一貫している必要があるため、ここで並べ替えます。

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // 1回のチェックで十分です
```

大きな流動性プールは価格がより安定するため、小さなものよりも優れています。 トークンのペアごとに複数の流動性プールを持つことは望ましくありません。 すでに取引所が存在する場合、同じペアに対して別の取引所を作成する必要はありません。

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

新しいコントラクトを作成するには、それを作成するコードが必要です(コンストラクタ関数と、実際のコントラクトのEVMバイトコードをメモリに書き込むコードの両方)。 通常、Solidityでは`addr = new <コントラクト名>(<コンストラクタのパラメータ>)`を使用するだけで、コンパイラがすべてを処理してくれます。しかし、決定的なコントラクトアドレスを持つためには、[CREATE2オペコード](https://eips.ethereum.org/EIPS/eip-1014)を使用する必要があります。
このコードが書かれた時点では、このオペコードはまだSolidityでサポートされていなかったため、コードを手動で取得する必要がありました。 これはもはや問題ではありません。なぜなら、[Solidityは現在CREATE2をサポートしている](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2)からです。

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

オペコードがまだSolidityでサポートされていない場合、[インラインアセンブリ](https://docs.soliditylang.org/en/v0.8.3/assembly.html)を使用して呼び出すことができます。

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

`initialize`関数を呼び出して、新しい取引所にどの2つのトークンを交換するかを伝えます。

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // 逆方向のマッピングを設定
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
```

新しいペア情報を状態変数に保存し、イベントを発行して世界に新しいペア取引所を知らせます。

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

これら2つの関数により、`feeSetter`は手数料の受取人(もしあれば)を制御し、`feeSetter`を新しいアドレスに変更できます。

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol)は、ERC-20流動性トークンを実装します。 [OpenZeppelin ERC-20コントラクト](/developers/tutorials/erc20-annotated-code)と類似しているので、異なる部分である`permit`機能についてのみ説明します。

イーサリアムでのトランザクションには、現実のお金に相当するイーサ(ETH)のコストがかかります。 ERC-20トークンを持っていてもETHを持っていない場合、トランザクションを送信できないため、何もできません。 この問題を回避するための1つの解決策が[メタトランザクション](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions)です。
トークンの所有者は、他の誰かがオフチェーンでトークンを引き出すことを許可するトランザクションに署名し、インターネットを使用して受信者に送信します。 ETHを持っている受信者が、所有者の代わりに許可を送信します。

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

このハッシュは、[トランザクションタイプの識別子](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash)です。 ここでサポートされているのは、これらのパラメータを持つ`Permit`だけです。

```solidity
    mapping(address => uint) public nonces;
```

受信者がデジタル署名を偽造することは現実的ではありません。 しかし、同じトランザクションを2回送信することは簡単です(これは[リプレイ攻撃](https://wikipedia.org/wiki/Replay_attack)の一種です)。 これを防ぐために、[ノンス](https://wikipedia.org/wiki/Cryptographic_nonce)を使用します。 新しい`Permit`のノンスが、最後に使用されたものより1つ大きくない場合、無効とみなします。

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

これは、[チェーン識別子](https://chainid.network/)を取得するためのコードです。 [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html)と呼ばれるEVMアセンブリ方言を使用します。 現在のバージョンのYulでは、`chainid`ではなく`chainid()`を使用する必要があることに注意してください。

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
```

EIP-712の[ドメインセパレータ](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator)を計算します。

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

これは、権限を実装する関数です。 パラメータとして関連するフィールドと、[署名](https://yos.io/2018/11/16/ethereum-signatures/)のための3つのスカラー値(v、r、s)を受け取ります。

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

期限切れのトランザクションは受け付けません。

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)`は、受信を期待するメッセージです。 ノンスが何であるべきかを私たちは知っているので、パラメータとして取得する必要はありません。

イーサリアムの署名アルゴリズムは署名するのに256ビットを期待しているため、`keccak256`ハッシュ関数を使用します。

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

ダイジェストと署名から、[ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/)を使用して署名したアドレスを取得できます。

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

すべてがOKであれば、これを[ERC-20のapprove](https://eips.ethereum.org/EIPS/eip-20#approve)として扱います。

## ペリフェリーコントラクト {#periphery-contracts}

ペリフェリーコントラクトはUniswapのAPI(アプリケーションプログラムインターフェイス)です。 他のコントラクトや分散型アプリケーションからの外部呼び出しで利用可能です。 コアコントラクトを直接呼び出すこともできますが、それはより複雑で、間違いを犯すと価値を失う可能性があります。 コアコントラクトには、自身が不正に操作されていないことを確認するためのテストのみが含まれており、他の誰かのためのサニティチェックは含まれていません。 それらはペリフェリーにあり、必要に応じて更新できます。

### UniswapV2Router01.sol {#UniswapV2Router01}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol)には問題があり、[もはや使用すべきではありません](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01)。 幸いなことに、ペリフェリーコントラクトはステートレスで資産を保有していないため、非推奨にし、代わりに後継の`UniswapV2Router02`を使用するよう人々に提案するのは簡単です。

### UniswapV2Router02.sol {#UniswapV2Router02}

ほとんどの場合、[このコントラクト](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol)を通じてUniswapを使用します。
その使用方法は[こちら](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02)で確認できます。

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

これらのほとんどは、以前に遭遇したものか、かなり明白なものです。 唯一の例外は`IWETH.sol`です。 Uniswap v2は、どのERC-20トークンのペアでも交換可能ですが、イーサ(ETH)自体はERC-20トークンではありません。 ETHは標準より前から存在しており、独自のメカニズムによって転送されます。 ERC-20トークンに適用されるコントラクトでETHを利用できるようにするため、[ラップされたイーサ(WETH)](https://weth.tkn.eth.limo/)コントラクトが考案されました。 このコントラクトにETHを送ると、同等の量のWETHがミントされます。 または、WETHをバーンしてETHを取り戻すこともできます。

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

ルーターは、どのファクトリーを使用するか、そしてWETHを必要とするトランザクションについてはどのWETHコントラクトを使用するかを知る必要があります。 これらの値は[不変](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables)であり、コンストラクタでのみ設定できます。 これにより、ユーザーは誰もがそれらを変更して、より信頼性の低いコントラクトを指すことができないという確信を得ることができます。

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

この修飾子は、時間制限のあるトランザクション(「もしできればY時より前にXを実行する」)が、その時間制限後に発生しないようにします。

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

コンストラクタは、不変な状態変数を設定するだけです。

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // WETHコントラクトからのフォールバック経由でのみETHを受け入れる
    }
```

この関数は、WETHコントラクトからトークンをETHに引き換える際に呼び出されます。 私たちが使用しているWETHコントラクトだけが、これを行うことを許可されています。

#### 流動性の追加 {#add-liquidity}

これらの関数は、ペア取引所にトークンを追加し、流動性プールを増加させます。

```solidity

    // **** 流動性の追加 ****
    function _addLiquidity(
```

この関数は、ペア取引所に入金すべきAトークンとBトークンの量を計算するために使用されます。

```solidity
        address tokenA,
        address tokenB,
```

これらはERC-20トークンコントラクトのアドレスです。

```solidity
        uint amountADesired,
        uint amountBDesired,
```

これらは、流動性プロバイダーが預け入れたい金額です。 これらはまた、預け入れられるAとBの最大量でもあります。

```solidity
        uint amountAMin,
        uint amountBMin
```

これらは、預け入れが許容される最小量です。 トランザクションがこれらの量以上で行われない場合、元に戻されます。 この機能が不要な場合は、ゼロを指定してください。

流動性プロバイダーは通常、トランザクションを現在の交換レートに近いレートに制限したいため、最小値を指定します。 為替レートが大きく変動すると、基礎となる価値を変えるニュースを意味する可能性があり、彼らは手動でどうするかを決定したいと考えます。

例えば、為替レートが1対1で、流動性プロバイダーがこれらの値を指定するケースを想像してください。

| パラメータ          |    値 |
| -------------- | ---: |
| amountADesired | 1000 |
| amountBDesired | 1000 |
| amountAMin     |  900 |
| amountBMin     |  800 |

交換レートが0.9から1.25の間である限り、トランザクションは行われます。 交換レートがこの範囲から外れると、トランザクションはキャンセルされます。

この予防措置の理由は、トランザクションが即時ではなく、送信すると最終的にバリデータがそれらをブロックに含めるためです(ガス価格が非常に低い場合を除きます。その場合は、同じノンスでより高いガス価格の別のトランザクションを送信して上書きする必要があります)。 送信とトランザクションを含める処理の間で何が起こるかを制御することはできません。

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

この関数は、流動性プロバイダーが現在の準備金間の比率に等しい比率を持つために預け入れるべき金額を返します。

```solidity
        // まだ存在しない場合はペアを作成します
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

現在のリザーブが空の場合、これは新しいペア取引所です。 預け入れる金額は、流動性プロバイダーが提供したい金額とまったく同じである必要があります。

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

どのくらいの量になるかを確認する必要がある場合は、[この関数](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35)を使用して最適な量を取得します。 現在のリザーブと同じ比率が必要です。

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

`amountBOptimal`が流動性プロバイダーが預け入れたい金額より小さい場合、それはトークンBが現在、流動性預金者が考えるよりも価値があることを意味し、より少ない金額が必要になります。

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Bの最適量が希望のB量よりも多い場合、それはBトークンが現在、流動性預金者が考えるよりも価値が低いことを意味し、より多くの量が必要になります。 しかし、希望量は最大値であるため、それはできません。 代わりに、希望のBトークンの量に対するAトークンの最適数を計算します。

まとめると、このグラフになります。 1000のAトークン(青線)と1000のBトークン(赤線)を預け入れようとしていると仮定します。 x軸は交換レートA/Bです。 x=1の場合、それらは同価値であり、それぞれ1000ずつ預け入れます。 x=2の場合、AはBの2倍の価値があるので(各Aトークンに対して2つのBトークンが得られる)、1000のBトークンを預け入れますが、Aトークンは500のみです。 x=0.5の場合、状況は逆になり、1000のAトークンと500のBトークンになります。

![グラフ](liquidityProviderDeposit.png)

([UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)を使用して)コアコントラクトに直接流動性を預け入れることもできますが、コアコントラクトは自身が不正に操作されていないかを確認するだけなので、トランザクションを送信してから実行されるまでの間に交換レートが変動すると、価値を失うリスクがあります。 ペリフェリーコントラクトを使用する場合、預け入れるべき金額を計算して即座に預け入れるため、交換レートは変わらず、何も失うことはありません。

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

この関数は、流動性を預け入れるトランザクションによって呼び出すことができます。 ほとんどのパラメータは上記の`_addLiquidity`と同じですが、2つの例外があります。

。 `to`は、流動性プロバイダーのプールの取り分を示すためにミントされた新しい流動性トークンを取得するアドレスです
。 `deadline`はトランザクションの期限です

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

実際に預け入れる金額を計算し、流動性プールのアドレスを見つけます。 ガスを節約するために、ファクトリーに問い合わせるのではなく、ライブラリ関数`pairFor`を使用します(以下のライブラリを参照)。

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

正しい量のトークンをユーザーからペア取引所に転送します。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

見返りとして、プールの部分的所有権のために流動性トークンを`to`アドレスに与えます。 コアコントラクトの`mint`関数は、(最後に流動性が変更されたときと比較して)追加のトークンがいくつあるかを確認し、それに応じて流動性をミントします。

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

流動性プロバイダーがトークン/ETHペア取引所に流動性を提供したい場合、いくつかの違いがあります。 コントラクトは、流動性プロバイダーのためにETHのラップを処理します。 ユーザーが預け入れたいETHの量を指定する必要はありません。なぜなら、ユーザーはトランザクションでそれを送るだけであり(金額は`msg.value`で利用可能)、

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

ETHを入金するために、コントラクトはまずそれをWETHにラップし、次にWETHをペアに転送します。 転送が`assert`でラップされていることに注意してください。 これは、転送が失敗した場合、このコントラクト呼び出しも失敗し、したがってラップは実際には行われないことを意味します。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // もしあれば、ダストethを返金します
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

ユーザーはすでにETHを送信しているので、余分なETHが残っている場合(他のトークンがユーザーが考えたよりも価値が低いため)、返金を発行する必要があります。

#### 流動性の削除 {#remove-liquidity}

これらの関数は流動性を削除し、流動性プロバイダーに返金します。

```solidity
    // **** 流動性の削除 ****
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

流動性を削除する最も単純なケースです。 各トークンには、流動性プロバイダーが受け入れに同意する最低量があり、それは期限までに行う必要があります。

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // 流動性をペアに送る
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

コアコントラクトの`burn`関数は、ユーザーにトークンを返却する処理をします。

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

関数が複数の値を返すが、そのうちのいくつかだけに興味がある場合、このようにしてそれらの値だけを取得します。 値を読み取ってまったく使用しないよりも、ガス代の面で多少安くなります。

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

金額をコアコントラクトが返す方法(アドレスの小さいトークンが先)から、ユーザーが期待する方法(`tokenA`と`tokenB`に対応)に変換します。

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

最初に転送してから正当性を検証することは問題ありません。なぜなら、正当でなければ、すべての状態変更は元に戻されるからです。

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

ETHの流動性を削除する方法はほぼ同じですが、WETHトークンを受け取り、それをETHに換金して流動性プロバイダーに返す点が異なります。

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

これらの関数はメタトランザクションを中継し、イーサを持たないユーザーが[許可メカニズム](#UniswapV2ERC20)を使用してプールから引き出すことを可能にします。

```solidity

    // **** 流動性の削除(送金手数料付きトークンをサポート) ****
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

この関数は、送金手数料やストレージ手数料を持つトークンに使用できます。 トークンにそのような手数料がある場合、`removeLiquidity`関数に頼って返金されるトークンの量を把握することはできないため、最初に引き出してから残高を取得する必要があります。

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

これを書いている時点では、[388,160のERC-20トークン](https://eth.blockscout.com/tokens)があります。 各トークンのペアごとにペア取引所がある場合、1500億を超えるペア取引所が存在することになります。 チェーン全体では、現時点で[その数のアカウントの0.1%しかありません](https://eth.blockscout.com/stats/accountsGrowth)。 代わりに、スワップ関数はパスの概念をサポートしています。 トレーダーは、AをBに、BをCに、CをDに交換できるため、A-Dペアを直接交換する必要はありません。

これらのマーケットの価格は同期する傾向にあります。同期していないと、裁定取引の機会が生じてしまうからです。 例えば、3つのトークンA、B、Cで、各ペアに1つずつ合計3つのペア取引所があるとします。

1. 初期状態
2. トレーダーは、Aトークンを24.695売り、Bトークンを25.305得ます。
3. そのトレーダーは、Bトークンを24.695売り、Cトークンを25.305得ます。Bトークン約0.61を利益として保持します。
4. そして、そのトレーダーは、Cトークンを24.695売って、Aトークンを25.305得ます。Cトークンの約0.61を利益として保持します。 そのトレーダーはまた、余分にAトークンを0.61持っています(トレーダーが最終的に得た25.305から、元の投資の24.695を差し引いたもの) 。

| ステップ | A-B取引所                                                                                      | B-C取引所                                                                                      | A-C取引所                                                                                      |
| ---- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1    | A:1000 B:1050 A/B=1.05                      | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 2    | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 3    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05                      |
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

Solidityの関数パラメータは、memoryまたはcalldataのいずれかに格納できます。 関数がコントラクトへのエントリポイントである場合、ユーザーによって(トランザクションを使用して)直接別のコントラクトから呼び出されます。その後、calldataから直接パラメータの値を取ることができます。 上記_swapのように、関数が内部で呼び出されている場合、パラメータはmemoryに保存する必要があります。 呼び出されたコントラクトの観点から、 calldataは読み取り専用です。

uintやaddressなどのスカラー型では、コンパイラがストレージの選択をしますが、より長くてより高価な配列では、使用するストレージタイプを指定します。

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

最後に、開始時のERC-20トークンを最初のペア取引所のアカウントに送金し、_swapを呼び出します。 これは、すべて同じトランザクション内で発生しているため、ペア取引所は予期しないトークンがこの送金の一部にあることを認識しています。

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

前の関数`swapTokensForTokens`では、トレーダーは渡す入力トークンの正確な数と、見返りに受け取りたい出力トークンの最小数を指定できます。 この関数では、リバーススワップを行います。トレーダーが希望する出力トークンの数と、支払いを希望する入力トークンの最大数を指定できます。

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

これは、送金フィーやストレージフィーがあるトークンをスワップするための内部関数です(<a href="https://github.com/Uniswap/uniswap-interface/issues/835">問題点(issue)</a>をご覧ください) 。

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

送金フィーがあるため、`getAmountsOut`関数に依存して各送金で得られるトークン量を知ることはできません(元の`_swap`を呼び出す前に行う方法)。 代わりに、最初に送金し、戻ったトークンの数を確認する必要があります。

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

これらの関数は、[UniswapV2Library関数](#uniswapV2library)を呼び出す単なるプロキシです。

### UniswapV2Migrator.sol {#UniswapV2Migrator}

このコントラクトは、取引所を以前のv1からv2へ移行するために使用されました。 現在は、移行済みのため使われません。

## ライブラリ {#libraries}

[SafeMathライブラリ](https://docs.openzeppelin.com/contracts/2.x/api/math)は十分に文書化されているため、ここで文書化する必要はありません。

### Math {#Math}

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

前回の推定値とその平方根を求めようとしている数の平均値を、前回の推定値で割って、より正確な推定値を求めます。 新しい推定値が既存の推定値より低くなくなるまで繰り返します。 詳細については、[こちら](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)を参照してください。

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

このライブラリは、通常イーサリアムの算術の一部ではない小数を処理します。 これは、数値 _x_ を _x\*2^112_ としてエンコードすることで行います。 元の加算および減算オペコードをそのまま使用できます。

```solidity
pragma solidity =0.5.16;

// a library for handling binary fixed point numbers (https://wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1]
// resolution: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` は1のエンコーディングです。

```solidity
    // encode a uint112 as a UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows
    }
```

yは`uint112`であるため、最大値は2^112-1です。 その数値は、依然として`UQ112x112`としてエンコードできます。

```solidity
    // divide a UQ112x112 by a uint112, returning a UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

2つの`UQ112x112`の値を割ると、結果は2^112で乗算されなくなります。 そのため、代わりに分母に整数を使用します。 乗算を行うには同様のトリックを使用する必要がありますが、`UQ112x112`の値の乗算を行う必要はありません。

### UniswapV2Library {#uniswapV2library}

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

2つのトークンをアドレス順に並び替えて、それらのペア取引所のアドレスを取得できるようにします。 これが必要なのは、そうでなければパラメータA、Bの場合とパラメータB、Aの場合の2つの可能性が生じ、1つの取引所ではなく2つの取引所になってしまうからです。

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

この関数は、2つのトークンのペア取引所のアドレスを計算します。 このコントラクトは、<a href="https://eips.ethereum.org/EIPS/eip-1014">CREATE2オペコード</a>を使用して作成されるため、使用するパラメータがわかっていれば同じアルゴリズムを使用してアドレスを計算できます。 これはファクトリーに問い合わせるよりもはるかに安価であり、

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

### Transfer Helper {#transfer-helper}

[このライブラリ](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol)は、ERC-20およびイーサリアムの送金に成功チェックを追加し、リバートと`false`値の戻りを同じように扱います。

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
- [アプリケーションバイナリインターフェイス(ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html)を「手動で」使用して呼び出しを作成します。 これは、コードの作成者が行います。

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

ERC-20標準以前に作成されたトークンとの後方互換性の便宜上、ERC-20の呼び出しは次のいずれかによって失敗することがあります。1つ目は、(`success`が`false`である場合)元に戻すことによる失敗、2つ目は、(出力データがあり、それをブール値としてデコードすると`false`になる場合)成功したうえで`false`値を返すことによる失敗です。

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

この関数は、<a href="https://eips.ethereum.org/EIPS/eip-20#transfer">ERC-20の送金機能</a>を実装しており、あるアカウントが別のアカウントから提供されたアローワンスを使うことができます。

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

この関数は、<a href="https://eips.ethereum.org/EIPS/eip-20#transferfrom">ERC-20のtransferFrom機能</a>を実装しており、あるアカウントが別のアカウントから提供されたアローワンスを使うことができます。

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

この関数は、アカウントにイーサ(ETH)を送金します。 異なるコントラクトへのすべての呼び出しで、イーサ(ETH)の送信ができます。 実際には関数を呼び出す必要がないため、この呼び出しでデータを送信することはありません。

## 結論 {#conclusion}

この記事は、約50ページにおよびます。 ここまで読んでいただきありがとうございました。 (短いサンプルプログラムとは対照的に)実際のアプリケーションを作成する際の考慮事項を理解し、独自のユースケースにおいてコントラクトを作成できるようになったことを願っています。

ぜひ有用なコードを書いていただき、私たちを驚かせてください。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).
