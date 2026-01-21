---
title: "コールデータを最適化するための簡潔なABI"
description: オプティミスティック・ロールアップのためのスマートコントラクトの最適化
author: Ori Pomerantz
lang: ja
tags: [ "レイヤー2" ]
skill: intermediate
published: 2022-04-01
---

## はじめに {#introduction}

この記事では、[オプティミスティック・ロールアップ](/developers/docs/scaling/optimistic-rollups)やそのトランザクションコスト、そしてその異なるコスト構造が、Ethereumメインネットとは異なるものの最適化をどのように要求するかについて学びます。
また、この最適化を実装する方法についても学びます。

### 完全な情報開示 {#full-disclosure}

筆者は[Optimism](https://www.optimism.io/)のフルタイム従業員であるため、この記事の例はOptimismで実行されます。
ただし、ここで説明するテクニックは、他のロールアップでも同様に機能するはずです。

### 用語 {#terminology}

ロールアップについて議論する際、「レイヤー1」(L1) という用語は、本番のEthereumネットワークであるメインネットを指すために使用されます。
「レイヤー2」(L2) という用語は、ロールアップ、またはセキュリティをL1に依存しつつ、処理のほとんどをオフチェーンで行うその他のシステムに使用されます。

## L2トランザクションのコストをさらに削減するには {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[オプティミスティック・ロールアップ](/developers/docs/scaling/optimistic-rollups)は、誰もがそれらを参照して現在の状態が正しいことを検証できるように、すべての過去のトランザクションの記録を保存する必要があります。
Ethereumメインネットにデータを取り込む最も安価な方法は、コールデータとして書き込むことです。
このソリューションは、[Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-)と[Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups)の両方で採用されました。

### L2トランザクションのコスト {#cost-of-l2-transactions}

L2トランザクションのコストは、2つの要素で構成されています。

1. L2処理。通常は極めて安価です。
2. L1ストレージ。メインネットのガス代に連動します。

これを書いている時点では、OptimismでのL2のガス代は0.001 [Gwei](/developers/docs/gas/#pre-london)です。
一方、L1のガス代は、約40 gweiです。
[現在の価格はこちらで確認できます](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)。

コールデータの1バイトは、それがゼロの場合は4ガス、その他の値の場合は16ガスのコストがかかります。
EVMで最も高価な操作の1つは、ストレージへの書き込みです。
L2でストレージに32バイトのワードを書き込む最大コストは22100ガスです。 現在、これは22.1 gweiです。
したがって、コールデータのゼロ値のバイトを1つでも節約できれば、ストレージに約200バイトを書き込んでも、まだ利益が出ます。

### ABI {#the-abi}

大多数のトランザクションは、外部所有アカウントからコントラクトにアクセスします。
ほとんどのコントラクトはSolidityで書かれており、[アプリケーションバイナリインターフェース(ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding)に従ってデータフィールドを解釈します。

しかし、ABIはL1向けに設計されており、そこではコールデータの1バイトのコストが約4回の算術演算に相当しますが、L2では1バイトのコストが1000回以上の算術演算に相当します。
コールデータは次のように分割されます。

| セクション   | 長さ |   バイト | 浪費バイト | 浪費ガス | 必須バイト | 必須ガス |
| ------- | -: | ----: | ----: | ---: | ----: | ---: |
| 関数セレクタ  |  4 |   0-3 |     3 |   48 |     1 |   16 |
| ゼロ      | 12 |  4-15 |    12 |   48 |     0 |    0 |
| 送信先アドレス | 20 | 16-35 |     0 |    0 |    20 |  320 |
| 金額      | 32 | 36-67 |    17 |   64 |    15 |  240 |
| 合計      | 68 |       |       |  160 |       |  576 |

説明:

- **関数セレクタ**：このコントラクトには256未満の関数しかないため、1バイトで区別できます。
  これらのバイトは通常ゼロ以外であるため、[16ガスのコストがかかります](https://eips.ethereum.org/EIPS/eip-2028)。
- **ゼロ**：20バイトのアドレスを保持するのに32バイトのワードは必要ないため、これらのバイトは常にゼロです。
  ゼロを保持するバイトのコストは4ガスです([イエローペーパー](https://ethereum.github.io/yellowpaper/paper.pdf)の付録G、
  27ページの `G`<sub>`txdatazero`</sub> の値参照)。
- **金額**：このコントラクトで `decimals` が18 (通常値) であり、送金するトークンの最大量が10<sup>18</sup>であると仮定すると、最大量は10<sup>36</sup>になります。
  256<sup>15</sup> > 10<sup>36</sup>なので、15バイトで十分です。

L1上での160ガスの浪費は、通常は無視できます。 トランザクションには少なくとも[21,000ガス](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)がかかるため、0.8%の追加は問題になりません。
しかし、L2では事情が異なります。 トランザクションのコストのほぼ全体が、L1への書き込みによるものです。
トランザクションのコールデータに加えて、109バイトのトランザクションヘッダー (送信先アドレス、署名など) があります。
したがって、総コストは `109*16+576+160=2480` となり、その約6.5%を浪費していることになります。

## 送信先を制御できない場合のコスト削減 {#reducing-costs-when-you-dont-control-the-destination}

送信先コントラクトを制御できない場合でも、[こちら](https://github.com/qbzzt/ethereum.org-20220330-shortABI)のようなソリューションを利用できます。
関連ファイルを見ていきましょう。

### Token.sol {#token-sol}

[こちらが送信先コントラクトです](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)。
これは標準的なERC-20コントラクトですが、1つ機能が追加されています。
この `faucet` 関数により、どのユーザーも使用するためのトークンを取得できます。
これにより、本番のERC-20コントラクトは役に立たなくなりますが、ERC-20がテストを容易にするためだけに存在する場合、作業が楽になります。

```solidity
    /**
     * @dev 呼び出し元に試用のための1000トークンを与えます
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[これは、トランザクションがより短いコールデータで呼び出すことになっているコントラクトです](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)。
一行ずつ見ていきましょう。

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

それを呼び出す方法を知るには、トークン関数が必要です。

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

私たちがプロキシとなるトークンのアドレスです。

```solidity
    /**
     * @dev トークンアドレスを指定します
     * @param tokenAddr_ ERC-20コントラクトアドレス
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

指定が必要なパラメータは、トークンアドレスのみです。

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

コールデータから値を読み込みます。

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

単一の32バイト (256ビット) ワードをメモリにロードし、目的のフィールドの一部でないバイトを削除します。
このアルゴリズムは、32バイトより長い値には機能せず、もちろんコールデータの末尾を超えて読み取ることはできません。
L1ではガスを節約するためにこれらのテストをスキップする必要があるかもしれませんが、L2ではガスが非常に安いため、考えられるあらゆるサニティチェックが可能です。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

`fallback()`への呼び出しからデータをコピーすることもできましたが (下記参照)、EVMのアセンブリ言語である[Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)を使用する方が簡単です。

ここでは、[CALLDATALOADオペコード](https://www.evm.codes/#35)を使用して、`startByte`から`startByte+31`までのバイトをスタックに読み込みます。
一般に、Yulでのオペコードの構文は`<opcode name>(<first stack value, if any>,<second stack value, if any>...)`です。

```solidity

        _retVal = _retVal >> (256-length*8);
```

最上位の `length` バイトのみがフィールドの一部であるため、[右シフト](https://en.wikipedia.org/wiki/Logical_shift)して他の値を取り除きます。
これには、値をフィールドの右側に移動させるという追加の利点があり、値自体が256<sup>something</sup>を掛けたものではなく、値そのものになります。

```solidity

        return _retVal;
    }


    fallback() external {
```

Solidityコントラクトへの呼び出しがどの関数シグネチャとも一致しない場合、[`fallback()`関数](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)を呼び出します (存在する場合)。
`CalldataInterpreter`の場合、他の`external`や`public`関数がないため、_どんな_呼び出しもここに到達します。

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

コールデータの最初のバイトを読み取ります。これにより関数がわかります。
ここで関数が利用できない理由は2つあります。

1. `pure`または`view`の関数は状態を変更せず、ガス代もかかりません (オフチェーンで呼び出された場合)。
   これらのガス代を削減しようとしても意味がありません。
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)に依存する関数。
   `msg.sender`の値は、呼び出し元ではなく`CalldataInterpreter`のアドレスになります。

残念ながら、[ERC-20の仕様](https://eips.ethereum.org/EIPS/eip-20)を見ると、残っている関数は`transfer`のみです。
これにより、残る関数は`transfer` (`transferFrom`を呼び出せるため)と`faucet` (`transferFrom`を呼び出せるため)の2つだけになります。

```solidity

        // コールデータの情報を使用して
        // トークンの状態変更メソッドを呼び出します

        // faucet
        if (_func == 1) {
```

パラメータのない`faucet()`の呼び出しです。

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

`token.faucet()`を呼び出すと、トークンを取得します。 しかし、プロキシコントラクトとして、私たちはトークンを**必要**としません。
私たちを呼び出したEOA (外部所有アカウント) やコントラクトは、それを必要とします。
したがって、所有するすべてのトークンを、私たちを呼び出した誰にでも送金します。

```solidity
        // transfer (そのためのアローワンスがあると仮定します)
        if (_func == 2) {
```

トークンを送金するには、送信先アドレスと金額の2つのパラメータが必要です。

```solidity
            token.transferFrom(
                msg.sender,
```

呼び出し元が所有するトークンの送金のみを許可します

```solidity
                address(uint160(calldataVal(1, 20))),
```

送信先アドレスはバイト#1から始まります (バイト#0は関数です)。
アドレスとして、その長さは20バイトです。

```solidity
                calldataVal(21, 2)
```

この特定のコントラクトでは、誰もが送金したいと思うトークンの最大数は2バイト (65536未満) に収まると想定します。

```solidity
            );
        }
```

全体として、1回の送金には35バイトのコールデータが必要です。

| セクション   | 長さ |   バイト |
| ------- | -: | ----: |
| 関数セレクタ  |  1 |     0 |
| 送信先アドレス | 32 |  1-32 |
| 金額      |  2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[このJavaScriptユニットテスト](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js)は、このメカニズムの使用方法 (およびそれが正しく機能することを確認する方法) を示しています。
[chai](https://www.chaijs.com/)と[ethers](https://docs.ethers.io/v5/)を理解していることを前提とし、コントラクトに特に関連する部分のみを説明します。

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

まず、両方のコントラクトをデプロイします。

```javascript
    // 試用のためのトークンを取得
    const faucetTx = {
```

通常使用する高レベルの関数 (例： `token.faucet()`) は、ABIに従っていないため、トランザクションの作成には使用できません。
代わりに、自分でトランザクションを作成してから送信する必要があります。

```javascript
      to: cdi.address,
      data: "0x01"
```

トランザクションには、次の2つのパラメータが必要です。

1. `to`、送信先アドレスです。
   これは、コールデータのインタープリタコントラクトです。
2. `data`、送信するコールデータです。
   フォーセットを呼び出す場合、データは1バイトの`0x01`です。

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

送信先 (`faucetTx.to`) をすでに指定しており、トランザクションに署名が必要なため、[署名者の `sendTransaction` メソッド](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction)を呼び出します。

```javascript
// フォーセットがトークンを正しく提供することを確認
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

ここで残高を確認します。
`view`関数ではガスを節約する必要がないので、通常どおり実行します。

```javascript
// CDIにアローワンスを与える (承認はプロキシできません)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

コールデータのインタープリタに送金できるようにアローワンスを与えます。

```javascript
// トークンを送金
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

送金トランザクションを作成します。 最初のバイトは「0x02」で、次に送信先アドレス、最後に金額 (0x0100、10進数で256) が続きます。

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // 256トークン少なくなっていることを確認
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // そして、送信先がそれらを受け取ったことを確認
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## 送信先コントラクトを制御できる場合のコスト削減 {#reducing-the-cost-when-you-do-control-the-destination-contract}

送信先コントラクトを制御できる場合、コールデータのインタープリタを信頼するため、`msg.sender`チェックをバイパスする関数を作成できます。
[`control-contract`ブランチで、これがどのように機能するかの例をこちらで確認できます](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)。

コントラクトが外部トランザクションにのみ応答する場合、1つのコントラクトだけで済みます。
しかし、それでは[構成可能性](/developers/docs/smart-contracts/composability/)が損なわれます。
通常のERC-20の呼び出しに応答するコントラクトと、短いコールデータを持つトランザクションに応答する別のコントラクトを持つ方がはるかに優れています。

### Token.sol {#token-sol-2}

この例では、`Token.sol`を修正できます。
これにより、プロキシだけが呼び出せる多数の関数を持つことができます。
新しい部分は次のとおりです。

```solidity
    // CalldataInterpreterアドレスを指定できる唯一のアドレス
    address owner;

    // CalldataInterpreterアドレス
    address proxy = address(0);
```

ERC-20コントラクトは、承認されたプロキシのIDを知る必要があります。
しかし、まだ値がわからないため、コンストラクタでこの変数を設定することはできません。
このコントラクトは、プロキシがコンストラクタでトークンのアドレスを期待するため、最初にインスタンス化されます。

```solidity
    /**
     * @dev ERC20コンストラクタを呼び出します。
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

作成者 (「owner」と呼ばれる) のアドレスは、プロキシを設定できる唯一のアドレスであるため、ここに保存されます。

```solidity
    /**
     * @dev プロキシ (CalldataInterpreter) のアドレスを設定します。
     * オーナーが1回だけ呼び出し可能
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

プロキシはセキュリティチェックをバイパスできるため、特権アクセスを持ちます。
プロキシを信頼できることを確認するために、`owner`だけがこの関数を1回だけ呼び出せるようにします。
一度 `proxy` が実際の値 (ゼロではない) を持つと、その値は変更できないため、オーナーが悪意を持ったり、そのニーモニックが漏洩したりしても、安全です。

```solidity
    /**
     * @dev 一部の関数はプロキシによってのみ呼び出し可能です。
     */
    modifier onlyProxy {
```

これは[`modifier`関数](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)であり、他の関数の動作を変更します。

```solidity
      require(msg.sender == proxy);
```

まず、プロキシによって呼び出され、他の誰にも呼び出されていないことを確認します。
そうでなければ、`revert`します。

```solidity
      _;
    }
```

もしそうなら、修正する関数を実行します。

```solidity
   /* プロキシが実際にアカウントのプロキシとして機能できるようにする関数 */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

これらは通常、トークンを送金したり、アローワンスを承認したりするエンティティから直接メッセージが送信される必要がある3つの操作です。
ここでは、これらの操作のプロキシバージョンがあります。

1. `onlyProxy()`によって変更されているため、他の誰もそれらを制御することはできません。
2. 通常`msg.sender`であるアドレスを、追加パラメータとして取得します。

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

コールデータのインタープリタは、プロキシされた関数が`msg.sender`パラメータを受け取り、`transfer`にアローワンスが不要である点を除いて、上記のインタープリタとほぼ同じです。

```solidity
        // transfer (アローワンスは不要)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

以前のテストコードとこのコードにはいくつかの変更点があります。

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

ERC-20コントラクトに、どのプロキシを信頼するかを伝える必要があります。

```js
console.log("CalldataInterpreter addr:", cdi.address)

// アローワンスを確認するには2つの署名者が必要
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()`と`transferFrom()`を確認するには、2人目の署名者が必要です。
これは私たちのトークンを一切受け取らないため、`poorSigner`と呼びます (もちろん、ETHは持っている必要があります)。

```js
// トークンを送金
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

ERC-20コントラクトはプロキシ (`cdi`) を信頼するため、送金を中継するためのアローワンスは必要ありません。

```js
// 承認とtransferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// approve / transferFrom の組み合わせが正しく行われたことを確認
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

2つの新しい関数をテストします。
`transferFromTx`には、アローワンスの提供者と受領者の2つのアドレスパラメータが必要であることに注意してください。

## 結論 {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)と[Arbitrum](https://developer.offchainlabs.com/docs/special_features)はどちらも、L1に書き込まれるコールデータのサイズ、ひいてはトランザクションのコストを削減する方法を模索しています。
しかし、汎用的なソリューションを探しているインフラプロバイダーとして、私たちの能力には限界があります。
dapp開発者であるあなたは、アプリケーション固有の知識を持っているため、汎用的なソリューションよりもはるかに優れた方法でコールデータを最適化できます。
この記事が、あなたのニーズに合った理想的なソリューションを見つけるのに役立つことを願っています。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).

