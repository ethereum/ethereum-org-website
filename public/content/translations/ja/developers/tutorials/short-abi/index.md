---
title: "コールデータ最適化のための短いABI"
description: オプティミスティック・ロールアップ向けのスマートコントラクトの最適化
author: オリ・ポメランツ
lang: ja
tags: ["レイヤー2"]
skill: intermediate
breadcrumb: 短いABI
published: 2022-04-01
---

## はじめに {#introduction}

この記事では、[オプティミスティック・ロールアップ](/developers/docs/scaling/optimistic-rollups)、そこでのトランザクションのコスト、そしてその異なるコスト構造がイーサリアム・メインネットとは異なる最適化をどのように要求するかについて学びます。
また、この最適化を実装する方法についても学びます。

### 情報開示 {#full-disclosure}

私は[オプティミズム](https://www.optimism.io/)のフルタイム従業員であるため、この記事の例はオプティミズム上で実行されます。
しかし、ここで説明する手法は他のロールアップでも同様に機能するはずです。

### 用語 {#terminology}

ロールアップについて議論する際、「レイヤー1 (L1)」という用語は、本番のイーサリアム・ネットワークであるメインネットを指すために使用されます。
「レイヤー2 (L2)」という用語は、セキュリティをL1に依存しつつ、処理の大部分をオフチェーンで行うロールアップやその他のシステムを指すために使用されます。

## L2トランザクションのコストをさらに削減するにはどうすればよいか？ {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[オプティミスティック・ロールアップ](/developers/docs/scaling/optimistic-rollups)は、誰でも履歴を確認して現在の状態が正しいことを検証できるように、すべての過去のトランザクションの記録を保存する必要があります。
イーサリアム・メインネットにデータを取り込む最も安価な方法は、それをコールデータとして書き込むことです。
この解決策は、[オプティミズム](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-)と[アービトラム](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups)の両方で採用されています。

### L2トランザクションのコスト {#cost-of-l2-transactions}

L2トランザクションのコストは、次の2つの要素で構成されています。

1. L2の処理（通常は非常に安価）
2. L1のストレージ（メインネットのガスコストに連動）

この記事を書いている時点では、オプティミズムでのL2ガスのコストは0.001[Gwei](/developers/docs/gas/#pre-london)です。
一方、L1ガスのコストは約40 Gweiです。
[現在の価格はこちらで確認できます](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)。

コールデータの1バイトのコストは、4ガス（ゼロの場合）または16ガス（それ以外の値の場合）です。
EVMで最も高価な操作の1つは、ストレージへの書き込みです。
L2で32バイトのワードをストレージに書き込む最大コストは22100ガスです。現在、これは22.1 Gweiに相当します。
したがって、コールデータのゼロバイトを1つ節約できれば、約200バイトをストレージに書き込んでもまだ得をすることになります。

### ABI {#the-abi}

トランザクションの大部分は、外部所有アカウントからコントラクトにアクセスします。
ほとんどのコントラクトはSolidityで書かれており、[アプリケーション・バイナリ・インターフェース (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding)に従ってデータフィールドを解釈します。

しかし、ABIは、コールデータの1バイトが算術演算4回分とほぼ同じコストであるL1向けに設計されたものであり、コールデータの1バイトが算術演算1000回分以上のコストとなるL2向けではありません。
コールデータは次のように分割されます。

| セクション | 長さ | バイト | 無駄なバイト | 無駄なガス | 必要なバイト | 必要なガス |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| 関数セレクタ |      4 |   0-3 |            3 |         48 |               1 |            16 |
| ゼロ |     12 |  4-15 |           12 |         48 |               0 |             0 |
| 宛先アドレス |     20 | 16-35 |            0 |          0 |              20 |           320 |
| 金額 |     32 | 36-67 |           17 |         64 |              15 |           240 |
| 合計 |     68 |       |              |        160 |                 |           576 |

説明：

- **関数セレクタ**: コントラクトの関数は256個未満であるため、1バイトで区別できます。
  これらのバイトは通常ゼロではないため、[16ガスのコストがかかります](https://eips.ethereum.org/EIPS/eip-2028)。
- **ゼロ**: 20バイトのアドレスを保持するのに32バイトのワードは必要ないため、これらのバイトは常にゼロになります。
  ゼロを保持するバイトは4ガスのコストがかかります（[イエロー・ペーパー](https://ethereum.github.io/yellowpaper/paper.pdf)の付録G、27ページ、`G`<sub>`txdatazero`</sub>の値を参照）。
- **金額**: このコントラクトで`decimals`が18（通常の値）であり、送金するトークンの最大量が10<sup>18</sup>であると仮定すると、最大量は10<sup>36</sup>になります。
  256<sup>15</sup> &gt; 10<sup>36</sup>であるため、15バイトで十分です。

L1での160ガスの無駄は通常無視できるレベルです。トランザクションには少なくとも[21,000ガス](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)かかるため、追加の0.8%は問題になりません。
しかし、L2では状況が異なります。トランザクションのコストのほぼすべては、L1への書き込みによるものです。
トランザクションのコールデータに加えて、109バイトのトランザクションヘッダー（宛先アドレス、署名など）があります。
したがって、合計コストは`109*16+576+160=2480`となり、そのうち約6.5%を無駄にしていることになります。

## 宛先を制御できない場合のコスト削減 {#reducing-costs-when-you-dont-control-the-destination}

宛先コントラクトを制御できないと仮定しても、[これ](https://github.com/qbzzt/ethereum.org-20220330-shortABI)に似た解決策を使用できます。
関連するファイルを見ていきましょう。

### Token.sol {#token-sol}

[これが宛先コントラクトです](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)。
これは標準的なERC-20コントラクトであり、1つの追加機能があります。
この`faucet`関数を使用すると、どのユーザーでも使用するためのトークンを取得できます。
本番環境のERC-20コントラクトでは使い物にならなくなりますが、テストを容易にするためだけにERC-20が存在する場合は便利です。

```solidity
    /**
     * @dev 呼び出し元に遊ぶための1000トークンを与えます
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[これは、トランザクションが短いコールデータで呼び出すことを想定しているコントラクトです](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)。
1行ずつ見ていきましょう。

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

呼び出し方を知るために、トークン関数が必要です。

```solidity
コントラクト CalldataInterpreter {

    OrisUselessToken public immutable token;
```

プロキシとして機能するトークンのアドレスです。

```solidity

    /**
     * @dev トークンのアドレスを指定します
     * @param tokenAddr_ ERC-20コントラクトのアドレス
     */
    コンストラクタ(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

トークンアドレスは、指定する必要がある唯一のパラメータです。

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

コールデータから値を読み取ります。

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

1つの32バイト（256ビット）ワードをメモリにロードし、目的のフィールドの一部ではないバイトを削除します。
このアルゴリズムは32バイトより長い値には機能せず、もちろんコールデータの末尾を超えて読み取ることはできません。
L1ではガスを節約するためにこれらのテストをスキップする必要があるかもしれませんが、L2ではガスが非常に安価であるため、考えられるあらゆる健全性チェックを有効にすることができます。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

呼び出しから`fallback()`にデータをコピーすることもできましたが（下記参照）、EVMのアセンブリ言語である[Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)を使用する方が簡単です。

ここでは、[CALLDATALOADオペコード](https://www.evm.codes/#35)を使用して、バイト`startByte`から`startByte+31`をスタックに読み込みます。
一般に、Yulでのオペコードの構文は`<opcode name>(<first stack value, if any>,<second stack value, if any>...)`です。

```solidity

        _retVal = _retVal >> (256-length*8);
```

最上位の`length`バイトのみがフィールドの一部であるため、[右シフト](https://en.wikipedia.org/wiki/Logical_shift)して他の値を取り除きます。
これには、値をフィールドの右側に移動させるという追加の利点があるため、値に256<sup>何か</sup>を掛けたものではなく、値そのものになります。

```solidity

        return _retVal;
    }


    fallback() external {
```

Solidityコントラクトへの呼び出しがどの関数シグネチャとも一致しない場合、[`fallback()`関数](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)が呼び出されます（存在すると仮定して）。
`CalldataInterpreter`の場合、他の`external`や`public`関数がないため、_すべての_呼び出しがここに到達します。

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

コールデータの最初のバイトを読み取ります。これにより、関数がわかります。
ここで関数が利用できない理由は2つあります。

1. `pure`または`view`である関数は、状態を変更せず、（オフチェーンで呼び出された場合）ガスを消費しません。
   それらのガスコストを削減しようとすることは無意味です。
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)に依存する関数。
   `msg.sender`の値は、呼び出し元ではなく`CalldataInterpreter`のアドレスになります。

残念ながら、[ERC-20の仕様を見ると](https://eips.ethereum.org/EIPS/eip-20)、残る関数は`transfer`の1つだけです。
これにより、残る関数は2つだけになります。`transfer`（`transferFrom`を呼び出せるため）と`faucet`（呼び出し元にトークンを送金し直すことができるため）です。

```solidity

        // 以下を使用してトークンの状態を変更するメソッドを呼び出します
        // コールデータからの情報

        // faucet
        if (_func == 1) {
```

パラメータを持たない`faucet()`への呼び出し。

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

`token.faucet()`を呼び出した後、トークンを取得します。しかし、プロキシ・コントラクトとして、私たちはトークンを**必要**としません。
私たちを呼び出したEOA（外部所有アカウント）またはコントラクトが必要としています。
そのため、すべてのトークンを呼び出し元に送金します。

```solidity
        // 送金（そのためのアローワンスがあると仮定します）
        if (_func == 2) {
```

トークンの送金には、宛先アドレスと金額の2つのパラメータが必要です。

```solidity
            token.transferFrom(
                msg.sender,
```

呼び出し元が所有するトークンのみを送金できるようにします。

```solidity
                address(uint160(calldataVal(1, 20))),
```

宛先アドレスはバイト#1から始まります（バイト#0は関数です）。
アドレスとして、長さは20バイトです。

```solidity
                calldataVal(21, 2)
```

この特定のコントラクトでは、誰かが送金したいと思うトークンの最大数が2バイト（65536未満）に収まると仮定します。

```solidity
            );
        }
```

全体として、送金には35バイトのコールデータが必要です。

| セクション | 長さ | バイト |
| ------------------- | -----: | ----: |
| 関数セレクタ |      1 |     0 |
| 宛先アドレス |     32 |  1-32 |
| 金額 |      2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[このJavaScriptの単体テスト](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js)は、このメカニズムの使用方法（および正しく機能することの検証方法）を示しています。
[chai](https://www.chaijs.com/)と[ethers](https://docs.ethers.io/v5/)を理解していると仮定し、コントラクトに特に関連する部分のみを説明します。

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

両方のコントラクトをデプロイすることから始めます。

```javascript
    // 遊ぶためのトークンを取得します
    const faucetTx = {
```

ABIに従っていないため、トランザクションを作成するために通常使用する高レベルの関数（`token.faucet()`など）を使用することはできません。
代わりに、自分でトランザクションを構築して送信する必要があります。

```javascript
      to: cdi.address,
      data: "0x01"
```

トランザクションに提供する必要があるパラメータは2つあります。

1. `to`、宛先アドレス。
   これはコールデータ・インタープリター・コントラクトです。
2. `data`、送信するコールデータ。
   フォーセット呼び出しの場合、データは1バイトの`0x01`です。

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

すでに宛先（`faucetTx.to`）を指定しており、トランザクションに署名する必要があるため、[署名者の`sendTransaction`メソッド](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction)を呼び出します。

```javascript
// faucetがトークンを正しく提供するか確認します
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

ここで残高を検証します。
`view`関数でガスを節約する必要はないため、通常通り実行します。

```javascript
// CDIにアローワンスを与えます（承認はプロキシできません）
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

送金できるように、コールデータ・インタープリターにアローワンスを与えます。

```javascript
// トークンを送金します
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

送金トランザクションを作成します。最初のバイトは「0x02」で、その後に宛先アドレス、最後に金額（0x0100、10進数で256）が続きます。

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // トークンが256個減っていることを確認します
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // そして宛先がそれらを受け取ったことを確認します
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## 宛先コントラクトを制御できる場合のコスト削減 {#reducing-the-cost-when-you-do-control-the-destination-contract}

宛先コントラクトを制御できる場合は、コールデータ・インタープリターを信頼しているため、`msg.sender`のチェックをバイパスする関数を作成できます。
[これがどのように機能するかの例は、こちらの`control-contract`ブランチで確認できます](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)。

コントラクトが外部トランザクションにのみ応答する場合、コントラクトを1つ持つだけで済みます。
しかし、それでは[コンポーザビリティ](/developers/docs/smart-contracts/composability/)が損なわれます。
通常のERC-20呼び出しに応答するコントラクトと、短いコールデータを持つトランザクションに応答する別のコントラクトを持つ方がはるかに優れています。

### Token.sol {#token-sol-2}

この例では、`Token.sol`を変更できます。
これにより、プロキシのみが呼び出すことができるいくつかの関数を持つことができます。
新しい部分は次のとおりです。

```solidity
    // CalldataInterpreterのアドレスを指定できる唯一のアドレス
    address owner;

    // CalldataInterpreterのアドレス
    address proxy = address(0);
```

ERC-20コントラクトは、承認されたプロキシのIDを知る必要があります。
しかし、まだ値がわからないため、コンストラクタでこの変数を設定することはできません。
プロキシはコンストラクタでトークンのアドレスを期待するため、このコントラクトが最初にインスタンス化されます。

```solidity
    /**
     * @dev ERC-20のコンストラクタを呼び出します。
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

作成者のアドレス（`owner`と呼ばれる）は、プロキシを設定できる唯一のアドレスであるため、ここに保存されます。

```solidity
    /**
     * @dev プロキシ（CalldataInterpreter）のアドレスを設定します。
     * オーナーによって1回だけ呼び出すことができます
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

プロキシはセキュリティチェックをバイパスできるため、特権アクセスを持ちます。
プロキシを信頼できるようにするために、`owner`のみがこの関数を呼び出せるようにし、しかも1回だけにします。
`proxy`が実際の値（ゼロではない）を持つと、その値は変更できないため、所有者が悪意を持ったり、ニーモニックが漏洩したりしても、安全です。

```solidity
    /**
     * @dev 一部の関数はプロキシによってのみ呼び出すことができます。
     */
    modifier onlyProxy {
```

これは[`modifier`関数](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)であり、他の関数の動作を変更します。

```solidity
      require(msg.sender == proxy);
```

まず、プロキシから呼び出されたこと、そして他の誰からも呼び出されていないことを検証します。
そうでない場合は、`revert`します。

```solidity
      _;
    }
```

そうであれば、変更する関数を実行します。

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

これらは、通常、トークンを送金したりアローワンスを承認したりするエンティティから直接メッセージが来ることを必要とする3つの操作です。
ここでは、これらの操作のプロキシバージョンを用意しています。これは次のことを行います。

1. `onlyProxy()`によって変更され、他の誰もそれらを制御できないようにします。
2. 通常は`msg.sender`となるアドレスを、追加のパラメータとして取得します。

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

コールデータ・インタープリターは、プロキシされた関数が`msg.sender`パラメータを受け取り、`transfer`のアローワンスが不要であることを除いて、上記のものとほぼ同じです。

```solidity
        // 送金（アローワンスは不要です）
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

以前のテストコードと今回のテストコードの間には、いくつかの変更点があります。

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

どのプロキシを信頼するかをERC-20コントラクトに伝える必要があります。

```js
console.log("CalldataInterpreter addr:", cdi.address)

// アローワンスを検証するために2つの署名者が必要です
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()`と`transferFrom()`をチェックするには、2番目の署名者が必要です。
トークンを一切受け取らないため、これを`poorSigner`と呼びます（もちろん、ETHを持っている必要はあります）。

```js
// トークンを送金します
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

ERC-20コントラクトはプロキシ（`cdi`）を信頼しているため、送金を中継するためのアローワンスは必要ありません。

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

// approve / transferFrom の組み合わせが正しく行われたか確認します
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

2つの新しい関数をテストします。
`transferFromTx`には、アローワンスの付与者と受信者の2つのアドレスパラメータが必要であることに注意してください。

## おわりに {#conclusion}

[オプティミズム](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)と[アービトラム](https://developer.offchainlabs.com/docs/special_features)はどちらも、L1に書き込まれるコールデータのサイズを縮小し、それによってトランザクションのコストを削減する方法を模索しています。
しかし、汎用的な解決策を模索するインフラストラクチャ・プロバイダーとして、私たちの能力には限界があります。
dapp開発者であるあなたは、アプリケーション固有の知識を持っているため、私たちが汎用的な解決策で行うよりもはるかにうまくコールデータを最適化できます。
この記事が、あなたのニーズに合った理想的な解決策を見つけるのに役立つことを願っています。

[私の他の記事はこちらをご覧ください](https://cryptodocguy.pro/)。