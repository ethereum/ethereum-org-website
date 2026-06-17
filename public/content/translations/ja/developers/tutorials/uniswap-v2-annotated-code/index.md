---
title: "ユニスワップ v2 コントラクトのウォークスルー"
description: "ユニスワップ v2 のコントラクトはどのように機能するのでしょうか？なぜそのように書かれているのでしょうか？"
author: "オリ・ポメランツ"
tags: ["Solidity", "dapps"]
skill: intermediate
breadcrumb: "ユニスワップ v2 ウォークスルー"
published: 2021-05-01
lang: ja
---
## はじめに {#introduction}

[ユニスワップ v2](https://app.uniswap.org/whitepaper.pdf)は、任意の2つのERC-20トークン間の交換市場を作成できます。この記事では、このプロトコルを実装するコントラクトのソースコードを確認し、なぜそのように書かれているのかを見ていきます。

### ユニスワップは何をするのか？ {#what-does-uniswap-do}

基本的に、ユーザーには流動性プロバイダーとトレーダーの2種類がいます。

<em>流動性プロバイダー</em>は、交換可能な2つのトークン（ここでは**Token0**と**Token1**と呼びます）をプールに提供します。その見返りとして、プールの部分的な所有権を表す_流動性トークン_と呼ばれる3つ目のトークンを受け取ります。

<em>トレーダー</em>は、1種類のトークンをプールに送信し、流動性プロバイダーが提供したプールからもう1種類のトークンを受け取ります（例えば、**Token0**を送信して**Token1**を受け取ります）。交換レートは、プールが持つ**Token0**と**Token1**の相対的な数量によって決定されます。さらに、プールは流動性プールへの報酬としてわずかな割合を手数料として徴収します。

流動性プロバイダーが資産を返してほしい場合、プールトークンをバーンして、報酬の取り分を含めた自分のトークンを受け取ることができます。

[詳細な説明についてはこちらをクリックしてください](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/)。

### なぜv3ではなくv2なのか？ {#why-v2}

[ユニスワップ v3](https://app.uniswap.org/whitepaper-v3.pdf)は、v2よりもはるかに複雑なアップグレードです。まずはv2を学んでからv3に進む方が簡単です。

### コアコントラクトと周辺（Periphery）コントラクト {#contract-types}

ユニスワップ v2は、コア（Core）と周辺（Periphery）の2つのコンポーネントに分かれています。この分割により、資産を保持するため安全で_なければならない_コアコントラクトを、よりシンプルで監査しやすくすることができます。トレーダーが必要とするすべての追加機能は、周辺コントラクトによって提供されます。

## データと制御のフロー {#flows}

ユニスワップの3つの主要なアクションを実行する際に発生するデータと制御のフローは以下の通りです。

1. 異なるトークン間のスワップ
2. 市場に流動性を追加し、報酬としてペア交換のERC-20流動性トークンを受け取る
3. ERC-20流動性トークンをバーンし、ペア交換がトレーダーに交換を許可しているERC-20トークンを取り戻す

### スワップ {#swap-flow}

これはトレーダーによって使用される最も一般的なフローです。

#### 呼び出し元 {#caller}

1. スワップする金額分のアローワンスを周辺アカウントに提供します。
2. 周辺コントラクトの多数のスワップ関数のいずれかを呼び出します（どれを呼び出すかは、ETHが関与するかどうか、トレーダーが預け入れるトークンの量を指定するか、受け取るトークンの量を指定するかなどによって異なります）。
   すべてのスワップ関数は、経由する交換所の配列である`path`を受け取ります。

#### 周辺コントラクト内 (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. パスに沿った各交換所で取引する必要がある金額を特定します。
4. パスを反復処理します。途中のすべての交換所に対して入力トークンを送信し、交換所の`swap`関数を呼び出します。
   ほとんどの場合、トークンの宛先アドレスはパス内の次のペア交換所です。最後の交換所では、トレーダーが提供したアドレスになります。

#### コアコントラクト内 (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. コアコントラクトが不正操作されておらず、スワップ後も十分な流動性を維持できることを検証します。
6. 既知の準備金に加えて、どれだけの余分なトークンがあるかを確認します。その量が、交換のために受け取った入力トークンの数です。
7. 出力トークンを宛先に送信します。
8. `_update`を呼び出して準備金の額を更新します。

#### 再び周辺コントラクト内 (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. 必要なクリーンアップを実行します（たとえば、WETHトークンをバーンしてETHを取り戻し、トレーダーに送信するなど）。

### 流動性の追加 {#add-liquidity-flow}

#### 呼び出し元 {#caller-2}

1. 流動性プールに追加する金額分のアローワンスを周辺アカウントに提供します。
2. 周辺コントラクトの`addLiquidity`関数のいずれかを呼び出します。

#### 周辺コントラクト内 (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. 必要に応じて新しいペア交換所を作成します。
4. 既存のペア交換所がある場合は、追加するトークンの量を計算します。これは両方のトークンで同じ価値になるはずなので、既存のトークンに対する新しいトークンの比率は同じになります。
5. 金額が許容範囲内かどうかを確認します（呼び出し元は、それ以下であれば流動性を追加したくないという最小額を指定できます）。
6. コアコントラクトを呼び出します。

#### コアコントラクト内 (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2-2}

7. 流動性トークンをミントし、呼び出し元に送信します。
8. `_update`を呼び出して準備金の額を更新します。

### 流動性の削除 {#remove-liquidity-flow}

#### 呼び出し元 {#caller-3}

1. 原資産トークンと交換にバーンされる流動性トークンのアローワンスを周辺アカウントに提供します。
2. 周辺コントラクトの`removeLiquidity`関数のいずれかを呼び出します。

#### 周辺コントラクト内 (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. 流動性トークンをペア交換所に送信します。

#### コアコントラクト内 (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. バーンされたトークンに比例して、原資産トークンを宛先アドレスに送信します。たとえば、プールに1000個のAトークン、500個のBトークン、90個の流動性トークンがあり、バーンするために9個のトークンを受け取った場合、流動性トークンの10%をバーンすることになるため、ユーザーには100個のAトークンと50個のBトークンを送り返します。
5. 流動性トークンをバーンします。
6. `_update`を呼び出して準備金の額を更新します。

## コアコントラクト {#core-contracts}

これらは流動性を保持する安全なコントラクトです。

### UniswapV2Pair.sol {#uniswapv2pair}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol)は、トークンを交換する実際のプールを実装しています。これはユニスワップのコア機能です。

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

これらは、コントラクトが実装しているため（`IUniswapV2Pair`および`UniswapV2ERC20`）、またはそれらを実装するコントラクトを呼び出すために、コントラクトが知っておく必要があるすべてのインターフェースです。

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

このコントラクトは`UniswapV2ERC20`を継承しており、流動性トークンのためのERC-20機能を提供します。

```solidity
    using SafeMath  for uint;
```

オーバーフローとアンダーフローを避けるために、[SafeMathライブラリ](https://docs.openzeppelin.com/contracts/2.x/api/math)が使用されています。これは重要です。なぜなら、そうしないと値が`-1`になるべきところで、代わりに`2^256-1`になってしまう状況に陥る可能性があるからです。

```solidity
    using UQ112x112 for uint224;
```

プールコントラクトでの多くの計算には分数が含まれます。しかし、分数はEVMではサポートされていません。
ユニスワップが見つけた解決策は、224ビットの値を使用し、整数部分に112ビット、分数部分に112ビットを割り当てることです。したがって、`1.0`は`2^112`として表され、`1.5`は`2^112 + 2^111`として表されます。

このライブラリの詳細については、[このドキュメントの後半](#fixedpoint)で説明します。

#### 変数 {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

ゼロ除算のケースを避けるために、常に存在する（ただしアカウントゼロが所有する）流動性トークンの最小数があります。その数は**MINIMUM_LIQUIDITY**で、1,000です。

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

これはERC-20の送金関数のためのABIセレクタです。2つのトークンアカウントでERC-20トークンを送金するために使用されます。

```solidity
    address public factory;
```

これはこのプールを作成したファクトリーコントラクトです。すべてのプールは2つのERC-20トークン間の交換所であり、ファクトリーはこれらすべてのプールを接続する中心点です。

```solidity
    address public token0;
    address public token1;
```

このプールで交換できる2種類のERC-20トークンのコントラクトのアドレスがあります。

```solidity
    uint112 private reserve0;           // 単一のストレージスロットを使用し、getReservesを介してアクセス可能
    uint112 private reserve1;           // 単一のストレージスロットを使用し、getReservesを介してアクセス可能
```

プールが各トークンタイプに対して持っている準備金です。2つは同じ価値の量を表していると仮定し、したがって各token0はreserve1/reserve0のtoken1の価値があります。

```solidity
    uint32  private blockTimestampLast; // 単一のストレージスロットを使用し、getReservesを介してアクセス可能
```

交換が発生した最後のブロックのタイムスタンプで、時間経過に伴う為替レートを追跡するために使用されます。

イーサリアムコントラクトの最大のガス費用の1つはストレージであり、これはコントラクトの1回の呼び出しから次の呼び出しまで持続します。各ストレージセルは256ビット長です。そのため、`reserve0`、`reserve1`、および`blockTimestampLast`の3つの変数は、単一のストレージ値がそれらすべてを含めることができるように割り当てられます（112+112+32=256）。

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

これらの変数は、各トークンの累積コスト（それぞれ他方のトークンで表したもの）を保持します。これらは、一定期間の平均為替レートを計算するために使用できます。

```solidity
    uint public kLast; // 直近の流動性イベント直後のreserve0 * reserve1
```

ペア交換所がtoken0とtoken1の間の為替レートを決定する方法は、取引中に2つの準備金の倍数を一定に保つことです。`kLast`はこの値です。これは流動性プロバイダーがトークンを預け入れたり引き出したりするときに変化し、0.3%の市場手数料のためにわずかに増加します。

簡単な例を以下に示します。簡単にするために、表には小数点以下3桁しかなく、0.3%の取引手数料を無視しているため、数値は正確ではないことに注意してください。

| イベント | reserve0 | reserve1 | reserve0 \* reserve1 | 平均為替レート (token1 / token0) |
| ------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| 初期設定 | 1,000.000 | 1,000.000 | 1,000,000 | |
| トレーダーAが50 token0を47.619 token1にスワップ | 1,050.000 | 952.381 | 1,000,000 | 0.952 |
| トレーダーBが10 token0を8.984 token1にスワップ | 1,060.000 | 943.396 | 1,000,000 | 0.898 |
| トレーダーCが40 token0を34.305 token1にスワップ | 1,100.000 | 909.090 | 1,000,000 | 0.858 |
| トレーダーDが100 token1を109.01 token0にスワップ | 990.990 | 1,009.090 | 1,000,000 | 0.917 |
| トレーダーEが10 token0を10.079 token1にスワップ | 1,000.990 | 999.010 | 1,000,000 | 1.008 |

トレーダーがより多くのtoken0を提供するにつれて、需要と供給に基づいてtoken1の相対的な価値が上昇し、その逆も同様です。

#### ロック {#pair-lock}

```solidity
    uint private unlocked = 1;
```

[リエントランシーの悪用](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14)に基づくセキュリティ脆弱性のクラスがあります。ユニスワップは任意のERC-20トークンを送金する必要があり、これは、それらを呼び出すユニスワップ市場を悪用しようとする可能性のあるERC-20コントラクトを呼び出すことを意味します。
コントラクトの一部として`unlocked`変数を持つことで、関数が実行中（同じトランザクション内）に呼び出されるのを防ぐことができます。

```solidity
    modifier lock() {
```

この関数は[修飾子](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers)であり、通常の関数をラップしてその動作を何らかの方法で変更する関数です。

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

`unlocked`が1に等しい場合は、0に設定します。すでに0の場合は、呼び出しをリバートし、失敗させます。

```solidity
        _;
```

修飾子において、`_;`は元の関数呼び出し（すべてのパラメータを含む）です。ここでは、関数呼び出しは、呼び出されたときに`unlocked`が1であった場合にのみ発生し、実行中の`unlocked`の値は0であることを意味します。

```solidity
        unlocked = 1;
    }
```

メイン関数が戻った後、ロックを解除します。

#### その他の関数 {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

この関数は、呼び出し元に交換所の現在の状態を提供します。Solidityの関数は[複数の値を返すことができる](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values)ことに注意してください。

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

この内部関数は、交換所から他の誰かに一定量のERC20トークンを送金します。`SELECTOR`は、呼び出している関数が`transfer(address,uint)`であることを指定します（上記の定義を参照）。

トークン関数のインターフェースをインポートするのを避けるために、[ABI関数](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions)の1つを使用して「手動で」呼び出しを作成します。

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

ERC-20の送金呼び出しが失敗を報告する方法は2つあります。

1. リバート。外部コントラクトへの呼び出しがリバートした場合、ブール型の戻り値は`false`になります。
2. 正常に終了するが失敗を報告する。その場合、戻り値のバッファはゼロ以外の長さを持ち、ブール値としてデコードされると`false`になります。

これらの条件のいずれかが発生した場合は、リバートします。

#### イベント {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

これら2つのイベントは、流動性プロバイダーが流動性を預け入れる（`Mint`）か、引き出す（`Burn`）ときに発行されます。どちらの場合も、預け入れられた、または引き出されたtoken0とtoken1の量は、私たちを呼び出したアカウントのID（`sender`）とともにイベントの一部になります。引き出しの場合、イベントにはトークンを受け取ったターゲット（`to`）も含まれますが、これは送信者と同じではない場合があります。

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

このイベントは、トレーダーがあるトークンを別のトークンにスワップしたときに発行されます。ここでも、送信者と宛先が同じではない場合があります。
各トークンは、交換所に送信されるか、交換所から受信されるかのいずれかです。

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

最後に、理由に関係なくトークンが追加または引き出されるたびに`Sync`が発行され、最新の準備金情報（したがって為替レート）が提供されます。

#### セットアップ関数 {#pair-setup}

これらの関数は、新しいペア交換所が設定されたときに1回呼び出されることになっています。

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

コンストラクタは、ペアを作成したファクトリーのアドレスを確実に追跡するようにします。この情報は、`initialize`およびファクトリー手数料（存在する場合）に必要です。

```solidity
    // デプロイ時にファクトリによって一度だけ呼び出される
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // 十分なチェック
        token0 = _token0;
        token1 = _token1;
    }
```

この関数により、ファクトリー（およびファクトリーのみ）は、このペアが交換する2つのERC-20トークンを指定できます。

#### 内部更新関数 {#pair-update-internal}

##### \_update {#}

```solidity
    // リザーブを更新し、ブロックごとの最初の呼び出しで価格アキュムレータを更新する
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

この関数は、トークンが預け入れられたり引き出されたりするたびに呼び出されます。

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

balance0またはbalance1（uint256）のいずれかがuint112(-1)（=2^112-1）よりも大きい場合（したがって、uint112に変換されたときにオーバーフローして0に戻る場合）、オーバーフローを防ぐために\_updateの続行を拒否します。10^18単位に細分化できる通常のトークンの場合、これは各交換所が各トークンの約5.1\*10^15に制限されることを意味します。これまでのところ、それは問題になっていません。

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // オーバーフローが意図されている
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

経過時間がゼロでない場合、それは私たちがこのブロックでの最初の交換トランザクションであることを意味します。その場合、コストアキュムレータを更新する必要があります。

```solidity
            // * は決してオーバーフローせず、+ のオーバーフローは意図されている
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

各コストアキュムレータは、最新のコスト（他のトークンの準備金/このトークンの準備金）に経過時間（秒）を掛けたもので更新されます。平均価格を取得するには、2つの時点での累積価格を読み取り、それらの間の時間差で割ります。たとえば、次の一連のイベントを想定します。

| イベント | reserve0 | reserve1 | タイムスタンプ | 限界為替レート (reserve1 / reserve0) | price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | --------- | -------------------------------------------: | -------------------------: |
| 初期設定 | 1,000.000 | 1,000.000 | 5,000 | 1.000 | 0 |
| トレーダーAが50 token0を預け入れ、47.619 token1を受け取る | 1,050.000 | 952.381 | 5,020 | 0.907 | 20 |
| トレーダーBが10 token0を預け入れ、8.984 token1を受け取る | 1,060.000 | 943.396 | 5,030 | 0.890 | 20+10\*0.907 = 29.07 |
| トレーダーCが40 token0を預け入れ、34.305 token1を受け取る | 1,100.000 | 909.090 | 5,100 | 0.826 | 29.07+70\*0.890 = 91.37 |
| トレーダーDが100 token1を預け入れ、109.01 token0を受け取る | 990.990 | 1,009.090 | 5,110 | 1.018 | 91.37+10\*0.826 = 99.63 |
| トレーダーEが10 token0を預け入れ、10.079 token1を受け取る | 1,000.990 | 999.010 | 5,150 | 0.998 | 99.63+40\*1.1018 = 143.702 |

タイムスタンプ5,030と5,150の間の**Token0**の平均価格を計算したいとします。`price0Cumulative`の値の差は143.702-29.07=114.632です。これは2分間（120秒）の平均です。したがって、平均価格は114.632/120 = 0.955になります。

この価格計算が、古い準備金のサイズを知る必要がある理由です。

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

最後に、グローバル変数を更新し、`Sync`イベントを発行します。

##### \_mintFee {#}

```solidity
    // 手数料がオンの場合、sqrt(k)の増加分の1/6に相当する流動性をミントする
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

ユニスワップ 2.0では、トレーダーは市場を利用するために0.30%の手数料を支払います。その手数料の大部分（取引の0.25%）は常に流動性プロバイダーに支払われます。残りの0.05%は、流動性プロバイダーに支払われるか、またはファクトリーによってプロトコル手数料として指定されたアドレスに支払われ、ユニスワップの開発努力に対する報酬となります。

計算（およびそれに伴うガス費用）を減らすために、この手数料は各トランザクションごとではなく、プールに流動性が追加または削除されたときにのみ計算されます。

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

ファクトリーの手数料の宛先を読み取ります。それがゼロの場合、プロトコル手数料はなく、その手数料を計算する必要はありません。

```solidity
        uint _kLast = kLast; // ガスの節約
```

`kLast`状態変数はストレージに配置されているため、コントラクトへの異なる呼び出し間で値を保持します。
ストレージへのアクセスは、コントラクトへの関数呼び出しが終了したときに解放される揮発性メモリへのアクセスよりもはるかに高価であるため、ガスを節約するために内部変数を使用します。

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

流動性プロバイダーは、流動性トークンの価値上昇によって単に彼らの取り分を得ます。しかし、プロトコル手数料は、新しい流動性トークンがミントされ、`feeTo`アドレスに提供されることを必要とします。

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

プロトコル手数料を徴収するための新しい流動性がある場合。平方根関数については、[この記事の後半](#math)で確認できます。

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

この複雑な手数料の計算は、[ホワイトペーパー](https://app.uniswap.org/whitepaper.pdf)の5ページで説明されています。`kLast`が計算された時点から現在までの間に流動性が追加または削除されていないことがわかっているため（流動性が追加または削除されるたびに、実際に変更される前にこの計算を実行するため）、`reserve0 * reserve1`の変更はトランザクション手数料から生じたものでなければなりません（それがなければ`reserve0 * reserve1`は一定に保たれます）。

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

`UniswapV2ERC20._mint`関数を使用して、実際に追加の流動性トークンを作成し、それらを`feeTo`に割り当てます。

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

手数料が設定されていない場合は、`kLast`をゼロに設定します（まだゼロでない場合）。このコントラクトが書かれたときには、不要なストレージをゼロにすることでイーサリアムの状態の全体的なサイズを縮小することをコントラクトに奨励する[ガス払い戻し機能](https://eips.ethereum.org/EIPS/eip-3298)がありました。
このコードは、可能な場合にその払い戻しを受け取ります。

#### 外部からアクセス可能な関数 {#pair-external}

任意のトランザクションやコントラクトがこれらの関数を呼び出すことは_可能_ですが、これらは周辺コントラクトから呼び出されるように設計されていることに注意してください。これらを直接呼び出してもペア交換所を騙すことはできませんが、間違いによって価値を失う可能性があります。

##### mint {#}

```solidity
    // この低レベル関数は、重要な安全性チェックを実行するコントラクトから呼び出されるべきである
    function mint(address to) external lock returns (uint liquidity) {
```

この関数は、流動性プロバイダーがプールに流動性を追加したときに呼び出されます。報酬として追加の流動性トークンをミントします。これは、同じトランザクションで流動性を追加した後にそれを呼び出す[周辺コントラクト](#uniswapv2router02)から呼び出されるべきです（これにより、正当な所有者の前に新しい流動性を要求するトランザクションを他の誰も送信できなくなります）。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // ガスの節約
```

これは、複数の値を返すSolidity関数の結果を読み取る方法です。最後に返された値であるブロックのタイムスタンプは不要なため破棄します。

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

現在の残高を取得し、各トークンタイプがどれだけ追加されたかを確認します。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

徴収するプロトコル手数料がある場合はそれを計算し、それに応じて流動性トークンをミントします。`_mintFee`へのパラメータは古い準備金の値であるため、手数料は手数料によるプールの変更のみに基づいて正確に計算されます。

```solidity
        uint _totalSupply = totalSupply; // ガスの節約。totalSupplyは_mintFeeで更新される可能性があるため、ここで定義する必要がある
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // 最初のMINIMUM_LIQUIDITYトークンを永久にロックする
```

これが最初の預け入れである場合、`MINIMUM_LIQUIDITY`トークンを作成し、それらをアドレスゼロに送信してロックします。これらは決して償還できないため、プールが完全に空になることはありません（これにより、一部の場所でのゼロ除算から救われます）。`MINIMUM_LIQUIDITY`の値は1,000であり、ETHがWeiに分割されるように、ほとんどのERC-20がトークンの10^-18の単位に細分化されることを考慮すると、単一のトークンの価値に対して10^-15になります。高いコストではありません。

最初の預け入れの時点では、2つのトークンの相対的な価値がわからないため、預け入れが両方のトークンで等しい価値を提供すると仮定して、単に量を掛けて平方根を取ります。

アービトラージによって価値を失うのを避けるために、等しい価値を提供することが預金者の利益になるため、これを信頼できます。
2つのトークンの価値が同一であるとしますが、預金者が**Token0**の4倍の**Token1**を預け入れたとします。トレーダーは、ペア交換所が**Token0**の方が価値があると考えているという事実を利用して、そこから価値を抽出することができます。

| イベント | reserve0 | reserve1 | reserve0 \* reserve1 | プールの価値 (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------: |
| 初期設定 | 8 | 32 | 256 | 40 |
| トレーダーが8つの**Token0**トークンを預け入れ、16の**Token1**を受け取る | 16 | 16 | 256 | 32 |

ご覧のとおり、トレーダーは追加の8トークンを獲得しましたが、これはプールの価値の減少から生じており、それを所有する預金者に損害を与えています。

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

その後のすべての預け入れにおいて、私たちはすでに2つの資産間の為替レートを知っており、流動性プロバイダーが両方で等しい価値を提供することを期待しています。そうでない場合、罰として、彼らが提供したより少ない価値に基づいて流動性トークンを与えます。

最初の預け入れであろうとその後の預け入れであろうと、私たちが提供する流動性トークンの数は`reserve0*reserve1`の変更の平方根に等しく、流動性トークンの価値は変わりません（両方のタイプの等しい価値を持たない預け入れを受け取らない限り。その場合、「罰金」が分配されます）。以下は、同じ価値を持つ2つのトークンを使用した別の例で、3つの良い預け入れと1つの悪い預け入れ（1つのトークンタイプのみの預け入れであるため、流動性トークンは生成されません）があります。

| イベント | reserve0 | reserve1 | reserve0 \* reserve1 | プールの価値 (reserve0 + reserve1) | この預け入れのためにミントされた流動性トークン | 合計流動性トークン | 各流動性トークンの価値 |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| 初期設定 | 8.000 | 8.000 | 64 | 16.000 | 8 | 8 | 2.000 |
| 各タイプを4つ預け入れ | 12.000 | 12.000 | 144 | 24.000 | 4 | 12 | 2.000 |
| 各タイプを2つ預け入れ | 14.000 | 14.000 | 196 | 28.000 | 2 | 14 | 2.000 |
| 不等価の預け入れ | 18.000 | 14.000 | 252 | 32.000 | 0 | 14 | ~2.286 |
| アービトラージ後 | ~15.874 | ~15.874 | 252 | ~31.748 | 0 | 14 | ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

`UniswapV2ERC20._mint`関数を使用して、実際に追加の流動性トークンを作成し、それらを正しいアカウントに与えます。

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0とreserve1は最新である
        emit Mint(msg.sender, amount0, amount1);
    }
```

状態変数（`reserve0`、`reserve1`、および必要に応じて`kLast`）を更新し、適切なイベントを発行します。

##### burn {#}

```solidity
    // この低レベル関数は、重要な安全性チェックを実行するコントラクトから呼び出されるべきである
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

この関数は、流動性が引き出され、適切な流動性トークンをバーンする必要があるときに呼び出されます。
これも[周辺アカウントから](#uniswapv2router02)呼び出されるべきです。

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // ガスの節約
        address _token0 = token0;                                // ガスの節約
        address _token1 = token1;                                // ガスの節約
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

周辺コントラクトは、呼び出しの前にバーンされる流動性をこのコントラクトに送金しました。そうすることで、どれだけの流動性をバーンするかがわかり、それが確実にバーンされるようにすることができます。

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // ガスの節約。totalSupplyは_mintFeeで更新される可能性があるため、ここで定義する必要がある
        amount0 = liquidity.mul(balance0) / _totalSupply; // 残高を使用することで比例配分が保証される
        amount1 = liquidity.mul(balance1) / _totalSupply; // 残高を使用することで比例配分が保証される
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

流動性プロバイダーは、両方のトークンの等しい価値を受け取ります。このようにして、為替レートを変更しません。

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0とreserve1は最新である
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

`burn`関数の残りの部分は、上記の`mint`関数の鏡像です。

##### swap {#}

```solidity
    // この低レベル関数は、重要な安全性チェックを実行するコントラクトから呼び出されるべきである
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

この関数も[周辺コントラクト](#uniswapv2router02)から呼び出されることになっています。

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // ガスの節約
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // _token{0,1}のスコープ。stack too deepエラーを回避する
```

ローカル変数は、メモリに保存するか、数が多すぎない場合はスタックに直接保存できます。
数を制限してスタックを使用できるようにすれば、使用するガスが少なくなります。詳細については、[イエロー・ペーパー、イーサリアムの正式な仕様](https://ethereum.github.io/yellowpaper/paper.pdf)の26ページ、式298を参照してください。

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // 楽観的にトークンを送金する
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // 楽観的にトークンを送金する
```

この送金は楽観的です。なぜなら、すべての条件が満たされていると確信する前に送金するからです。イーサリアムではこれで問題ありません。なぜなら、呼び出しの後半で条件が満たされない場合、そこからリバートし、それが作成したすべての変更を元に戻すからです。

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

要求された場合は、受信者にスワップについて通知します。

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

現在の残高を取得します。周辺コントラクトは、スワップのために私たちを呼び出す前にトークンを送信します。これにより、コントラクトが騙されていないことを簡単に確認できます。この確認は、コアコントラクトで_行われなければなりません_（周辺コントラクト以外のエンティティから呼び出される可能性があるため）。

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // reserve{0,1}Adjustedのスコープ。stack too deepエラーを回避する
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

これは、スワップによって損失が出ないことを確認するための健全性チェックです。スワップによって`reserve0*reserve1`が減少する状況はあり得ません。これはまた、スワップで0.3%の手数料が送信されていることを確認する場所でもあります。Kの値を健全性チェックする前に、両方の残高に1000を掛け、量に3を掛けたものを引きます。これは、Kの値を現在の準備金のKの値と比較する前に、残高から0.3%（3/1000 = 0.003 = 0.3%）が差し引かれていることを意味します。

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

`reserve0`と`reserve1`を更新し、必要に応じて価格アキュムレータとタイムスタンプを更新し、イベントを発行します。

##### 同期またはスキム {#}

実際の残高が、ペア交換所が持っていると考えている準備金と同期しなくなる可能性があります。
コントラクトの同意なしにトークンを引き出す方法はありませんが、預け入れは別の問題です。アカウントは、`mint`または`swap`のいずれかを呼び出すことなく、交換所にトークンを送金できます。

その場合、2つの解決策があります。

- `sync`、準備金を現在の残高に更新する
- `skim`、余分な量を引き出す。誰がトークンを預け入れたかわからないため、どのアカウントでも`skim`を呼び出すことが許可されていることに注意してください。この情報はイベントで発行されますが、イベントはブロックチェーンからアクセスできません。

```solidity
    // 残高をリザーブに強制的に一致させる
    function skim(address to) external lock {
        address _token0 = token0; // ガスの節約
        address _token1 = token1; // ガスの節約
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // リザーブを残高に強制的に一致させる
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#uniswapv2factory}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol)はペア交換所を作成します。

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

これらの状態変数は、プロトコル手数料を実装するために必要です（[ホワイトペーパー](https://app.uniswap.org/whitepaper.pdf)の5ページを参照）。
`feeTo`アドレスはプロトコル手数料のための流動性トークンを蓄積し、`feeToSetter`は`feeTo`を別のアドレスに変更することが許可されているアドレスです。

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

これらの変数は、ペア、つまり2つのトークンタイプ間の交換所を追跡します。

最初の`getPair`は、交換する2つのERC-20トークンに基づいてペア交換コントラクトを識別するマッピングです。ERC-20トークンはそれらを実装するコントラクトのアドレスによって識別されるため、キーと値はすべてアドレスです。`tokenA`から`tokenB`に変換できるペア交換所のアドレスを取得するには、`getPair[<tokenA address>][<tokenB address>]`を使用します（またはその逆）。

2番目の変数`allPairs`は、このファクトリーによって作成されたペア交換所のすべてのアドレスを含む配列です。イーサリアムでは、マッピングのコンテンツを反復処理したり、すべてのキーのリストを取得したりすることはできないため、この変数はこのファクトリーが管理する交換所を知る唯一の方法です。

注：マッピングのすべてのキーを反復処理できない理由は、コントラクトのデータストレージが_高価_であるため、使用する量が少ないほど良く、変更する頻度が少ないほど良いからです。[反復をサポートするマッピング](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)を作成することはできますが、キーのリストのための追加のストレージが必要です。ほとんどのアプリケーションではそれは必要ありません。

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

このイベントは、新しいペア交換所が作成されたときに発行されます。これには、トークンのアドレス、ペア交換所のアドレス、およびファクトリーによって管理される交換所の総数が含まれます。

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

コンストラクタが行う唯一のことは、`feeToSetter`を指定することです。ファクトリーは手数料なしで開始され、`feeSetter`のみがそれを変更できます。

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

この関数は交換ペアの数を返します。

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

これはファクトリーのメイン関数であり、2つのERC-20トークン間のペア交換所を作成します。誰でもこの関数を呼び出すことができることに注意してください。新しいペア交換所を作成するためにユニスワップからの許可は必要ありません。

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

新しい交換所のアドレスを決定論的にして、オフチェーンで事前に計算できるようにしたいと考えています（これは[レイヤー2 (L2) トランザクション](/developers/docs/scaling/)に役立ちます）。
これを行うには、トークンアドレスを受け取った順序に関係なく、一貫した順序にする必要があるため、ここでそれらをソートします。

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // 単一のチェックで十分である
```

大規模な流動性プールは、価格がより安定しているため、小規模なものよりも優れています。トークンのペアごとに複数の流動性プールを持ちたくありません。すでに交換所がある場合、同じペアのために別の交換所を作成する必要はありません。

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

新しいコントラクトを作成するには、それを作成するコード（コンストラクタ関数と、実際のコントラクトのEVMバイトコードをメモリに書き込むコードの両方）が必要です。通常、Solidityでは単に`addr = new <name of contract>(<constructor parameters>)`を使用し、コンパイラがすべてを処理してくれますが、決定論的なコントラクトアドレスを持つためには[CREATE2オペコード](https://eips.ethereum.org/EIPS/eip-1014)を使用する必要があります。
このコードが書かれたとき、そのオペコードはまだSolidityでサポートされていなかったため、手動でコードを取得する必要がありました。現在では[SolidityがCREATE2をサポートしている](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2)ため、これはもはや問題ではありません。

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

オペコードがまだSolidityでサポートされていない場合は、[インラインアセンブリ](https://docs.soliditylang.org/en/v0.8.3/assembly.html)を使用して呼び出すことができます。

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

`initialize`関数を呼び出して、新しい交換所にどの2つのトークンを交換するかを伝えます。

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // 逆方向のマッピングを生成する
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

新しいペア情報を状態変数に保存し、新しいペア交換所を世界に知らせるためにイベントを発行します。

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

これら2つの関数により、`feeSetter`は手数料の受取人（存在する場合）を制御し、`feeSetter`を新しいアドレスに変更できます。

### UniswapV2ERC20.sol {#uniswapv2erc20}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol)はERC-20流動性トークンを実装しています。これは[オープンツェッペリンのERC-20コントラクト](/developers/tutorials/erc20-annotated-code)に似ているため、異なる部分である`permit`機能についてのみ説明します。

イーサリアム上のトランザクションには、現実のお金に相当するイーサ（ETH）がかかります。ERC-20トークンを持っていてもETHを持っていない場合、トランザクションを送信できないため、それらを使って何もすることができません。この問題を回避するための1つの解決策は[メタトランザクション](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions)です。
トークンの所有者は、他の誰かがオフチェーンでトークンを引き出すことを許可するトランザクションに署名し、インターネットを使用してそれを受信者に送信します。ETHを持っている受信者は、所有者に代わって許可を提出します。

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

このハッシュは[トランザクションタイプの識別子](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash)です。ここでサポートしているのは、これらのパラメータを持つ`Permit`のみです。

```solidity
    mapping(address => uint) public nonces;
```

受信者がデジタル署名を偽造することは不可能です。しかし、同じトランザクションを2回送信することは簡単です（これは[リプレイ攻撃](https://wikipedia.org/wiki/Replay_attack)の一形態です）。これを防ぐために、[ナンス](https://wikipedia.org/wiki/Cryptographic_nonce)を使用します。新しい`Permit`のナンスが最後に使用されたものより1つ多くない場合、それは無効であると見なします。

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

これは[チェーン識別子](https://chainid.network/)を取得するためのコードです。これは[Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html)と呼ばれるEVMアセンブリの方言を使用します。現在のバージョンのYulでは、`chainid`ではなく`chainid()`を使用する必要があることに注意してください。

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

これは権限を実装する関数です。関連するフィールドと、[署名](https://yos.io/2018/11/16/ethereum-signatures/)のための3つのスカラー値（v、r、およびs）をパラメータとして受け取ります。

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

期限後のトランザクションは受け付けません。

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)`は私たちが取得することを期待しているメッセージです。ナンスがどうあるべきかはわかっているので、パラメータとして取得する必要はありません。

イーサリアムの署名アルゴリズムは署名するために256ビットを取得することを期待しているため、`keccak256`ハッシュ関数を使用します。

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

ダイジェストと署名から、[ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/)を使用して署名したアドレスを取得できます。

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

すべてがOKであれば、これを[ERC-20の承認](https://eips.ethereum.org/EIPS/eip-20#approve)として扱います。

```yaml
---
title: "ユニスワップ v2 注釈付きコード - ペリフェリ・コントラクト"
description: "ユニスワップ v2 ペリフェリ・コントラクトの詳細な解説"
author: "qbzzt"
tags:
  - "スマートコントラクト"
skill: advanced
lang: ja
published: 2021-05-18
source: Uniswap
sourceUrl: https://uniswap.org/docs/v2/smart-contracts/router02/
---
```

## ペリフェリ・コントラクト {#periphery-contracts}

ペリフェリ・コントラクトは、ユニスワップのAPI（アプリケーション・プログラミング・インターフェース）です。これらは、他のコントラクトや分散型アプリケーション (dapp) からの外部呼び出しに利用できます。コア・コントラクトを直接呼び出すこともできますが、それはより複雑であり、間違えると価値を失う可能性があります。コア・コントラクトには、自身が不正されないことを確認するためのテストのみが含まれており、他の誰かのための健全性チェックは含まれていません。それらはペリフェリにあるため、必要に応じて更新できます。

### UniswapV2Router01.sol {#uniswapv2router01}

[このコントラクト](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol)には問題があり、[もはや使用すべきではありません](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01)。幸いなことに、ペリフェリ・コントラクトはステートレスであり、資産を保持していないため、非推奨にして、代わりに代替の`UniswapV2Router02`を使用するよう人々に提案するのは簡単です。

### UniswapV2Router02.sol {#uniswapv2router02}

ほとんどの場合、[このコントラクト](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol)を通じてユニスワップを使用します。
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

これらのほとんどは、以前に遭遇したものか、かなり明白なものです。唯一の例外は`IWETH.sol`です。ユニスワップ v2は、任意のERC-20トークンのペアの交換を許可しますが、イーサ (ETH) 自体はERC-20トークンではありません。それは標準よりも前に存在し、独自のメカニズムによって送金されます。ERC-20トークンに適用されるコントラクトでETHを使用できるようにするために、人々は[ラップド・イーサ (WETH)](https://weth.tkn.eth.limo/)コントラクトを考案しました。このコントラクトにETHを送金すると、同量のWETHがミントされます。または、WETHをバーンして、ETHを取り戻すこともできます。

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

ルーターは、どのファクトリーを使用するか、そしてWETHを必要とするトランザクションのためにどのWETHコントラクトを使用するかを知る必要があります。これらの値は[イミュータブル](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables)であり、コンストラクタでのみ設定できることを意味します。これにより、誰もそれらを変更して不正なコントラクトを指すようにできないという確信をユーザーに与えます。

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

この修飾子は、時間制限のあるトランザクション（「可能であれば時間Yの前にXを行う」）が制限時間後に発生しないようにします。

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

コンストラクタは、イミュータブルな状態変数を設定するだけです。

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // WETHコントラクトからのフォールバック経由でのみETHを受け入れる
    }
```

この関数は、WETHコントラクトからトークンをETHに引き換えるときに呼び出されます。私たちが使用するWETHコントラクトのみがそれを行う権限を持っています。

#### 流動性の追加 {#add-liquidity}

これらの関数は、ペア交換にトークンを追加し、流動性プールを増加させます。

```solidity

    // **** 流動性の追加 ****
    function _addLiquidity(
```

この関数は、ペア交換に預け入れるべきAおよびBトークンの量を計算するために使用されます。

```solidity
        address tokenA,
        address tokenB,
```

これらはERC-20トークンコントラクトのアドレスです。

```solidity
        uint amountADesired,
        uint amountBDesired,
```

これらは、流動性プロバイダーが預け入れたい量です。これらはまた、預け入れられるAおよびBの最大量でもあります。

```solidity
        uint amountAMin,
        uint amountBMin
```

これらは、預け入れ可能な最小量です。これらの量以上でトランザクションを実行できない場合は、リバートします。この機能が不要な場合は、単にゼロを指定します。

流動性プロバイダーが最小値を指定するのは、通常、トランザクションを現在の為替レートに近いものに制限したいからです。為替レートが大きく変動する場合、それは基礎となる価値を変えるニュースを意味する可能性があり、彼らは手動でどうするかを決定したいと考えます。

例えば、為替レートが1対1で、流動性プロバイダーが以下の値を指定した場合を想像してください。

| Parameter      | Value |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

為替レートが0.9から1.25の間にとどまる限り、トランザクションは実行されます。為替レートがその範囲から外れた場合、トランザクションはキャンセルされます。

この予防措置の理由は、トランザクションが即時ではないためです。トランザクションを送信すると、最終的にバリデータがそれをブロックに含めます（ガス価格が非常に低い場合を除き、その場合は同じナンスとより高いガス価格で別のトランザクションを送信して上書きする必要があります）。送信から含まれるまでの間に何が起こるかを制御することはできません。

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

この関数は、準備金間の現在の比率と等しい比率にするために、流動性プロバイダーが預け入れるべき量を返します。

```solidity
        // ペアがまだ存在しない場合は作成する
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

このトークンペアの交換がまだ存在しない場合は、作成します。

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

ペアの現在の準備金を取得します。

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

現在の準備金が空の場合、これは新しいペア交換です。預け入れる量は、流動性プロバイダーが提供したい量と完全に同じであるべきです。

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

量がどうなるかを確認する必要がある場合、[この関数](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35)を使用して最適な量を取得します。現在の準備金と同じ比率を求めます。

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

もし`amountBOptimal`が流動性プロバイダーが預け入れたい量よりも小さい場合、それはトークンBが現在、流動性預け入れ者が考えているよりも価値があることを意味するため、より少ない量が必要になります。

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

最適なBの量が希望するBの量よりも多い場合、それはBトークンが現在、流動性預け入れ者が考えているよりも価値が低いことを意味するため、より多くの量が必要になります。しかし、希望する量は最大値であるため、それを行うことはできません。代わりに、希望するBトークンの量に対する最適なAトークンの数を計算します。

これらをすべてまとめると、このグラフになります。1000個のAトークン（青い線）と1000個のBトークン（赤い線）を預け入れようとしていると仮定します。x軸は為替レート、A/Bです。x=1の場合、それらは価値が等しく、それぞれ1000個ずつ預け入れます。x=2の場合、AはBの2倍の価値がある（Aトークン1つにつきBトークン2つを得る）ため、1000個のBトークンを預け入れますが、Aトークンは500個だけです。x=0.5の場合、状況は逆転し、1000個のAトークンと500個のBトークンになります。

![Graph](liquidityProviderDeposit.png)

コア・コントラクトに直接流動性を預け入れることもできます（[UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)を使用）が、コア・コントラクトは自身が不正されていないことしか確認しないため、トランザクションを送信してから実行されるまでの間に為替レートが変動した場合、価値を失うリスクがあります。ペリフェリ・コントラクトを使用すると、預け入れるべき量を計算し、即座に預け入れるため、為替レートは変わらず、何も失うことはありません。

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

この関数は、流動性を預け入れるためのトランザクションによって呼び出すことができます。ほとんどのパラメータは上記の`_addLiquidity`と同じですが、2つの例外があります。

. `to` は、流動性プロバイダーのプールの割合を示すためにミントされた新しい流動性トークンを受け取るアドレスです。
. `deadline` はトランザクションの制限時間です。

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

実際に預け入れる量を計算し、流動性プールのアドレスを見つけます。ガスを節約するために、ファクトリーに尋ねるのではなく、ライブラリ関数`pairFor`を使用してこれを行います（以下のライブラリを参照）。

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

ユーザーからペア交換へ正しい量のトークンを送金します。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

その見返りとして、プールの部分的な所有権を示す流動性トークンを`to`アドレスに与えます。コア・コントラクトの`mint`関数は、（前回流動性が変更されたときと比較して）どれだけの余分なトークンがあるかを確認し、それに応じて流動性をミントします。

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

流動性プロバイダーがトークン/ETHペア交換に流動性を提供したい場合、いくつかの違いがあります。コントラクトは、流動性プロバイダーのためにETHのラッピングを処理します。ユーザーはトランザクションと一緒にETHを送信するだけなので（量は`msg.value`で利用可能）、ユーザーが預け入れたいETHの量を指定する必要はありません。

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

ETHを預け入れるために、コントラクトはまずそれをWETHにラップし、次にWETHをペアに送金します。送金が`assert`でラップされていることに注意してください。これは、送金が失敗した場合、このコントラクト呼び出しも失敗し、したがってラッピングは実際には行われないことを意味します。

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // ダストETHがあれば返金する
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

ユーザーはすでにETHを送信しているため、余分なものが残っている場合（他のトークンがユーザーが考えていたよりも価値が低いため）、払い戻しを発行する必要があります。

#### 流動性の削除 {#remove-liquidity}

これらの関数は流動性を削除し、流動性プロバイダーに払い戻します。

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

流動性を削除する最も単純なケースです。流動性プロバイダーが受け入れることに同意する各トークンの最小量があり、それは期限前に発生する必要があります。

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // ペアに流動性を送金する
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

コア・コントラクトの`burn`関数は、ユーザーにトークンを払い戻す処理を行います。

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

関数が複数の値を返すが、そのうちのいくつかにしか興味がない場合、このようにしてそれらの値のみを取得します。値を読み取って一度も使用しないよりも、ガスの観点からはいくらか安価です。

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

コア・コントラクトが返す方法（下位アドレスのトークンが先）から、ユーザーが期待する方法（`tokenA`および`tokenB`に対応）に量を変換します。

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

最初に送金を行い、その後でそれが正当であるかを確認しても問題ありません。なぜなら、正当でない場合はすべての状態変更をリバートするからです。

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

ETHの流動性の削除はほぼ同じですが、WETHトークンを受け取り、それをETHに引き換えて流動性プロバイダーに返す点が異なります。

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

これらの関数はメタトランザクションを中継し、イーサを持たないユーザーが[permitメカニズム](#uniswapv2erc20)を使用してプールから引き出せるようにします。

```solidity

    // **** 流動性の削除（送金時手数料トークンをサポート） ****
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

この関数は、送金手数料やストレージ手数料があるトークンに使用できます。トークンにそのような手数料がある場合、`removeLiquidity`関数に依存してどれだけのトークンが戻ってくるかを知ることはできないため、最初に引き出しを行ってから残高を取得する必要があります。

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

最後の関数は、ストレージ手数料とメタトランザクションを組み合わせたものです。

#### トレード {#trade}

```solidity
    // **** スワップ ****
    // 初期金額がすでに最初のペアに送金されている必要がある
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

この関数は、トレーダーに公開されている関数に必要な内部処理を実行します。

```solidity
        for (uint i; i < path.length - 1; i++) {
```

これを書いている時点で、[388,160個のERC-20トークン](https://eth.blockscout.com/tokens)が存在します。各トークンペアにペア交換があった場合、1500億以上のペア交換になります。現在、チェーン全体には[その数の0.1%のアカウントしかありません](https://eth.blockscout.com/stats/accountsGrowth)。代わりに、スワップ関数はパスの概念をサポートしています。トレーダーはAをBに、BをCに、CをDに交換できるため、直接的なA-Dペア交換は必要ありません。

これらの市場の価格は同期する傾向があります。なぜなら、同期が取れていない場合、アービトラージの機会が生まれるからです。例えば、A、B、Cの3つのトークンを想像してください。各ペアに1つずつ、合計3つのペア交換があります。

1. 初期状況
2. トレーダーが24.695個のAトークンを売り、25.305個のBトークンを得る。
3. トレーダーが24.695個のBトークンを25.305個のCトークンで売り、約0.61個のBトークンを利益として保持する。
4. その後、トレーダーが24.695個のCトークンを25.305個のAトークンで売り、約0.61個のCトークンを利益として保持する。トレーダーはまた、0.61個の余分なAトークン（最終的に得た25.305から元の投資額24.695を引いたもの）を持っている。

| Step | A-B Exchange                | B-C Exchange                | A-C Exchange                |
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

現在処理しているペアを取得し、ソートして（ペアで使用するため）、期待される出力額を取得します。

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

ペア交換が期待する方法でソートされた、期待される出力額を取得します。

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

これが最後の交換ですか？もしそうなら、トレードで受け取ったトークンを宛先に送金します。そうでない場合は、次のペア交換に送金します。

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

実際にペア交換を呼び出してトークンをスワップします。交換について通知されるコールバックは必要ないため、そのフィールドにはバイトを送信しません。

```solidity
    function swapExactTokensForTokens(
```

この関数は、トレーダーが1つのトークンを別のトークンにスワップするために直接使用されます。

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

このパラメータには、ERC-20コントラクトのアドレスが含まれています。上記で説明したように、持っている資産から欲しい資産を得るために複数のペア交換を経由する必要があるかもしれないため、これは配列になっています。

Solidityの関数パラメータは、`memory`または`calldata`のいずれかに保存できます。関数がコントラクトのエントリポイントであり、ユーザーから直接（トランザクションを使用して）または別のコントラクトから呼び出される場合、パラメータの値はコールデータから直接取得できます。関数が上記の`_swap`のように内部的に呼び出される場合、パラメータは`memory`に保存される必要があります。呼び出されたコントラクトの観点からは、`calldata`は読み取り専用です。

`uint`や`address`のようなスカラー型の場合、コンパイラがストレージの選択を処理してくれますが、より長く高価な配列の場合は、使用するストレージのタイプを指定します。

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

戻り値は常にメモリで返されます。

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

各スワップで購入される量を計算します。結果がトレーダーが受け入れる最小値を下回る場合、トランザクションをリバートします。

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

最後に、最初のERC-20トークンを最初のペア交換のアカウントに送金し、`_swap`を呼び出します。これはすべて同じトランザクション内で発生しているため、ペア交換は予期しないトークンがこの送金の一部であることを知っています。

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

前の関数`swapTokensForTokens`は、トレーダーが提供してもよい入力トークンの正確な数と、その見返りとして受け取ってもよい出力トークンの最小数を指定できるようにします。この関数は逆のスワップを行い、トレーダーが欲しい出力トークンの数と、そのために支払ってもよい入力トークンの最大数を指定できるようにします。

どちらの場合も、トレーダーはまずこのペリフェリ・コントラクトにアローワンスを与え、送金できるようにする必要があります。

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
        // ダストETHがあれば返金する
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

これら4つのバリアントはすべて、ETHとトークン間のトレードを含みます。唯一の違いは、トレーダーからETHを受け取ってWETHをミントするために使用するか、パスの最後の交換からWETHを受け取ってそれをバーンし、結果として得られたETHをトレーダーに送り返すかです。

```solidity
    // **** スワップ（送金時手数料トークンをサポート） ****
    // 初期金額がすでに最初のペアに送金されている必要がある
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

これは、送金手数料やストレージ手数料があるトークンをスワップして（[この問題](https://github.com/Uniswap/uniswap-interface/issues/835)）を解決するための内部関数です。

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // stack too deepエラーを回避するためのスコープ
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

送金手数料のため、各送金からどれだけ得られるかを知るために`getAmountsOut`関数に依存することはできません（元の`_swap`を呼び出す前に行う方法）。代わりに、最初に送金を行い、その後でどれだけのトークンが戻ってきたかを確認する必要があります。

注：理論的には、`_swap`の代わりにこの関数を使用することもできますが、特定のケース（例えば、最後に必要な最小値を満たすのに十分な量がないために送金がリバートされる場合など）では、結果的により多くのガスがかかることになります。送金手数料トークンはかなりまれであるため、それらに対応する必要はありますが、すべてのスワップが少なくとも1つの送金手数料トークンを経由すると想定する必要はありません。

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

これらは通常のトークンに使用されるのと同じバリアントですが、代わりに`_swapSupportingFeeOnTransferTokens`を呼び出します。

```solidity
    // **** ライブラリ関数 ****
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

これらの関数は、[UniswapV2Library関数](#uniswapv2library)を呼び出す単なるプロキシです。

### UniswapV2Migrator.sol {#uniswapv2migrator}

このコントラクトは、古いv1からv2へ交換を移行するために使用されました。移行が完了した現在、これはもはや関連性がありません。

## ライブラリ {#libraries}

[SafeMathライブラリ](https://docs.openzeppelin.com/contracts/2.x/api/math)は十分に文書化されているため、ここで解説する必要はありません。

### Math {#math}

このライブラリには、通常のSolidityコードでは必要とされないため、言語の一部として組み込まれていない数学関数が含まれています。

```solidity
pragma solidity =0.5.16;

// さまざまな数学演算を実行するためのライブラリ

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // バビロニアの平方根計算法 (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

平方根よりも大きい推定値としてxから始めます（これが1〜3を特別なケースとして扱う必要がある理由です）。

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

より近い推定値、つまり前の推定値と、平方根を求めようとしている数を前の推定値で割った値との平均を取得します。新しい推定値が既存の推定値を下回らなくなるまで繰り返します。詳細については、[こちらをご覧ください](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)。

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

ゼロの平方根が必要になることはありません。1、2、3の平方根はほぼ1です（整数を使用するため、小数は無視します）。

```solidity
        }
    }
}
```

### 固定小数点分数 (UQ112x112) {#fixedpoint}

このライブラリは、通常イーサリアムの算術演算には含まれない分数を処理します。これは、数値 _x_ を _x\*2^112_ としてエンコードすることで実現されます。これにより、元の加算および減算のオペコードを変更せずに使用できます。

```solidity
pragma solidity =0.5.16;

// 2進固定小数点数を処理するためのライブラリ (https://wikipedia.org/wiki/Q_(number_format))

// 範囲: [0, 2**112 - 1]
// 解像度: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` は1のエンコーディングです。

```solidity
    // uint112をUQ112x112としてエンコードする
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // 決してオーバーフローしない
    }
```

yは `uint112` であるため、最大値は2^112-1になります。この数値は依然として `UQ112x112` としてエンコードできます。

```solidity
    // UQ112x112をuint112で除算し、UQ112x112を返す
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

2つの `UQ112x112` の値を除算すると、結果は2^112が乗算された状態ではなくなります。そのため、代わりに分母として整数を取ります。乗算を行う場合も同様の工夫が必要になりますが、`UQ112x112` の値の乗算を行う必要はありません。

### UniswapV2Library {#uniswapv2library}

このライブラリは周辺（periphery）コントラクトでのみ使用されます。

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // ソートされたトークンのアドレスを返す。この順序でソートされたペアからの戻り値を処理するために使用される
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

2つのトークンをアドレスでソートし、それらのペア取引所のアドレスを取得できるようにします。これが必要な理由は、そうしないとパラメータA,BとパラメータB,Aの2つの可能性が生じ、1つではなく2つの取引所ができてしまうためです。

```solidity
    // 外部呼び出しを行わずにペアのCREATE2アドレスを計算する
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // 初期化コードハッシュ
            ))));
    }
```

この関数は、2つのトークンのペア取引所のアドレスを計算します。このコントラクトは [CREATE2オペコード](https://eips.ethereum.org/EIPS/eip-1014) を使用して作成されるため、使用されるパラメータがわかれば、同じアルゴリズムを使用してアドレスを計算できます。これはファクトリーに問い合わせるよりもはるかに安価であり、

```solidity
    // ペアのリザーブを取得してソートする
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

この関数は、ペア取引所が持つ2つのトークンの準備金（リザーブ）を返します。トークンはどちらの順序でも受け取ることができ、内部で使用するためにソートされることに注意してください。

```solidity
    // ある資産の量とペアのリザーブが与えられた場合、もう一方の資産の等価量を返す
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

この関数は、手数料が関与しない場合に、トークンAの代わりに受け取るトークンBの量を提供します。この計算では、送金によって為替レートが変化することが考慮されています。

```solidity
    // ある資産の入力量とペアのリザーブが与えられた場合、もう一方の資産の最大出力量を返す
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

上記の `quote` 関数は、ペア取引所の利用に手数料がかからない場合にはうまく機能します。しかし、0.3%の取引手数料がある場合、実際に受け取る金額は少なくなります。この関数は、取引手数料を差し引いた後の金額を計算します。

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidityはネイティブで分数を処理しないため、単に金額に0.997を掛けることはできません。代わりに、分子に997を掛け、分母に1000を掛けることで、同じ効果を得ます。

```solidity
    // ある資産の出力量とペアのリザーブが与えられた場合、もう一方の資産の必要な入力量を返す
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

この関数はほぼ同じことを行いますが、出力額を取得して入力額を提供します。

```solidity

    // 任意の数のペアに対して連鎖的なgetAmountOut計算を実行する
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // 任意の数のペアに対して連鎖的なgetAmountIn計算を実行する
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

これら2つの関数は、複数のペア取引所を経由する必要がある場合に、値を特定する処理を行います。

### Transfer Helper {#transfer-helper}

[このライブラリ](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol)は、ERC-20およびイーサリアムの送金に関する成功チェックを追加し、リバートと `false` 値の戻り値を同じように扱います。

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// 一貫してtrue/falseを返さないERC-20トークンとの対話およびETHの送金のためのヘルパーメソッド
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

別のコントラクトを呼び出すには、次の2つの方法のいずれかを使用します。

- インターフェース定義を使用して関数呼び出しを作成する
- [アプリケーション・バイナリ・インターフェース (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) を「手動」で使用して呼び出しを作成する。これが、コードの作成者が選択した方法です。

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

ERC-20標準より前に作成されたトークンとの下位互換性を保つため、ERC-20の呼び出しは、リバートする（この場合 `success` は `false` になります）か、成功して `false` 値を返す（この場合、出力データが存在し、それをブール値としてデコードすると `false` になります）かのいずれかで失敗する可能性があります。

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

この関数は、[ERC-20のtransfer機能](https://eips.ethereum.org/EIPS/eip-20#transfer)を実装しています。これにより、アカウントは別のアカウントから提供されたアローワンスを消費することができます。

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

この関数は、[ERC-20のtransferFrom機能](https://eips.ethereum.org/EIPS/eip-20#transferfrom)を実装しています。これにより、アカウントは別のアカウントから提供されたアローワンスを消費することができます。

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

この関数は、アカウントにイーサを送金します。別のコントラクトへの呼び出しはすべて、イーサの送信を試みることができます。実際に関数を呼び出す必要はないため、呼び出しと一緒にデータを送信することはありません。

## 結論 {#conclusion}

これは約50ページにわたる長い記事です。ここまでたどり着いた方、おめでとうございます！短いサンプルプログラムとは異なり、実際のアプリケーションを作成する際の考慮事項を理解し、ご自身のユースケースに合わせてコントラクトをよりうまく書けるようになっていることを願っています。

さあ、何か役立つものを作成して、私たちを驚かせてください。

[私の他の作品はこちらをご覧ください](https://cryptodocguy.pro/)。