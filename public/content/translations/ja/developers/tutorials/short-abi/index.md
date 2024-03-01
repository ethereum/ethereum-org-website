---
title: "コールデータを最適化するための簡潔なABI"
description: オプティミスティック・ロールアップのためのスマートコントラクトの最適化
author: Ori Pomerantz
lang: ja
tags:
  - "レイヤー2"
  - "Optimism"
skill: intermediate
published: 2022-04-01
---

## はじめに {#introduction}

この記事では、[オプティミスティック・ロールアップ](/developers/docs/scaling/optimistic-rollups)とは何か、オプティミスティック・ロールアップにおけるトランザクションコスト、および、様々なコスト構造に応じてイーサリアム・メインネット上の様々な事項をいかに最適化すべきかについて学びます。 さらに、この最適化の実装方法についても紹介します。

### 開示情報 {#full-disclosure}

筆者は、[Optimism](https://www.optimism.io/)のフルタイム従業員であり、この記事に含まれる実例はすべて Optimism で実行されます。 ただし、紹介するテクニックは他のロールアップでも問題なく実行できます。

### 用語 {#terminology}

ロールアップの議論において、「レイヤー 1」は、イーサリアムネットワークの本番環境であるメインネットを指します。 「レイヤー 2」(L2)という用語は、ロールアップまたはセキュリティのために L1 に依存しているが、そのほとんどをオフチェーンで処理する他のシステムに使用されます。

## L2 上のトランザクションコストをさらに引き下げる方法 {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[オプティミスティック・ロールアップ](/developers/docs/scaling/optimistic-rollups)では、すべてのユーザーが過去のトランザクションを参照し、現在の状態が正しいことを検証できるように、過去のすべてのトランザクション記録を保存する必要があります。 イーサリアムメインネットにデータを書き込む最も安価な方法は、コールデータとして書き込む方法です。 [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-)と[Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups)はいずれも、コールデータのソリューションを採用しています。

### L2 トランザクションのコスト {#cost-of-l2-transactions}

L2 トランザクションのコストは、以下の 2 つの要素で構成されます：

1. L2 上の処理コスト。通常、非常に安価です。
2. L1 上のストレージコスト。これは、メインネットのガス代と連動します。

この記事の執筆時点の Optimism で、L2 ガス代は、0.001Gwei です。 一方、L1 のガス代は約 40Gwei です。 リアルタイムの価格は[こちら](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)で確認できます。

1 バイトのコールデータのコストは、4 ガス (0 バイトの場合) または 16 ガス (それ以外) のいずれかです。 EVM で最も費用が高い操作のひとつは、ストレージへの書き込みです。 L2 上で 32 バイトのワードを書き込む場合、最大コストは 22100 ガスです。 現在のレートでは、22.1 gwei になります。 したがって、1 つのコールデータをゼロバイトに節約できれば、約 200 バイトをストレージに書き込むことができ、まだお釣りが来ます。

### ABI {#the-abi}

大多数のトランザクションは、外部所有アカウントからコントラクトにアクセスします。 ほとんどのコントラクトは Solidity で書かれており、データフィールドは[アプリケーション・バイナリ・インターフェイス（ABI） ](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding)で解釈されます。

ただし ABI は、1 バイトのコールデータがほぼ 4 回の算術演算のコストと同じになる L1 を念頭に置いて設計されていますが、L2 では、1 バイトのコールデータのコストで算術演算を 1000 回以上実行することができます。 例えば、[この ERC-20 の送信トランザクション](https://kovan-optimistic.etherscan.io/tx/0x7ce4c144ebfce157b4de99d8ad53a352ae91b57b3fa06d8a1c79439df6bfa998)を見てみましょう。 コールデータは、以下のように分割されます：

| セクション     | 長さ |   バイト | 浪費バイト | 浪費ガス | 必須バイト | 必須ガス |
| -------------- | ---: | -------: | ---------: | -------: | ---------: | -------: |
| 関数セレクタ   |    4 |   0 ～ 3 |          3 |       48 |          1 |       16 |
| ゼロ値         |   12 |  4 ～ 15 |         12 |       48 |          0 |        0 |
| 送信先アドレス |   20 | 16 ～ 35 |          0 |        0 |         20 |      320 |
| 金額           |   32 | 36 ～ 67 |         17 |       64 |         15 |      240 |
| 合計           |   68 |          |            |      160 |            |      576 |

説明：

- **関数セレクター**: このコントラクトに含まれる関数は 256 未満であるため、1 バイトで区別できます。 これらのバイトは通常 0 バイトではないので、[16 ガス](https://eips.ethereum.org/EIPS/eip-2028)がかかります。
- **0 バイト **：これらのバイトは常にゼロです。と言うのも、20 バイトのアドレスを保持するためには 32 バイトのワードを必要としないからです。 0 バイトのコストは、4 ガスです（[イエローペーパー](https://ethereum.github.io/yellowpaper/paper.pdf)の 27 ページにある Appendix G で、`G`<sub>`txdatazero`</sub>の値について確認してください）。
- **金額**：このコントラクトの`decimals`が 18（通常値）であり、送信できるトークンの上限が 10<sup>18</sup>だとすると、金額の上限は 10<sup>36</sup>になります。 256<sup>15</sup> &gt; 10<sup>36</sup>のため、必要なバイト数は 15 になります。

通常、L1 上で 160 ガスを浪費するのは無視できる範囲です。 1 件のトランザクションには最低でも[21,000 ガス](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)が必要であるため、追加の 0.8%はほとんど問題になりません。 しかし、L2 では問題になります。 L2 におけるほぼすべてのコストは、L1 への書き込みで発生します。 トランザクションのコールデータに加えて、トランザクションのヘッダー（送信先アドレス、署名など）で 109 バイトが必要になります。 従って、L2 おける総コストは`109*16+576+160=2480`となり、浪費分が全体の 6.5%に達するのです。

## 送信先を限定しない場合のコスト削減方法 {#reducing-costs-when-you-dont-control-the-destination}

送信先のコントラクトを制御できない場合でも、[こちら](https://github.com/qbzzt/ethereum.org-20220330-shortABI)のようなソリューションを活用できます。 関連するファイルを確認しておきましょう。

### Token.sol {#token.sol}

[これ](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)は、送信先のコントラクトです。 標準的な ERC-20 コントラクトですが、機能が 1 つ追加されています。 `faucet`関数により、すべてのユーザーがトークンを取得できるようになっています。 本番環境の ERC-20 コントラクトでは使えませんが、テスト環境では有益でしょう。

```solidity
    /**
     * @dev Gives the caller 1000 tokens to play with
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

[こちら](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8)で、このコントラクトのデプロイ実例を確認できます。

### CalldataInterpreter.sol {#calldatainterpreter.sol}

[これ](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)は、より短いコールデータでトランザクションを呼び出すことが想定されているコントラクトです。 一行ずつ見ていきましょう。

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

呼び出し方法を知るには、トークン関数が必要です。

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

私たちがプロキシとなるトークンのアドレスです。

```solidity

    /**
     * @dev Specify the token address
     * @param tokenAddr_ ERC-20 contract address
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

32 バイト（256 ビット）を持つ 1 つのワードをメモリにロードして、必要なフィールドに含まれない部分のバイトを削除します。 このアルゴリズムは、32 バイト以上の値に対しては機能せず、コールデータの末尾を越えたデータを読むこともできません。 L1 では、ガスを節約するためにこれらのテストを省略すべきかもしれませんが、L2 のガス代はとても安価なので、あらゆるサニティチェックを実行することができます。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

`fallback()`への呼び出しからデータをコピーしてもよいのですが（以下を参照） 、EVM のアセンブリ言語である[Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)を使用する方が楽でしょう。

ここでは、[CALLDATALOAD のオペコード](https://www.evm.codes/#35)を使用して、`startByte`から `startByte+31`までのバイトをスタックへ読み込みます。 一般に、Yul のオペコードの構文は`<opcode name>(<first stack value, if any>,<second stack value, if any>...`となります。

```solidity

        _retVal = _retVal >> (256-length*8);
```

このフィールドに含まれるのは最も重要な`length`のバイトだけなので、[右シフトクリック](https://en.wikipedia.org/wiki/Logical_shift)で他の値を削除します。 この方法は、値をフィールドの右側に移動するという追加の利点があるので、256<sup>x</sup>を掛けた値ではなく、値そのものになります。

```solidity

        return _retVal;
    }


    fallback() external {
```

Solidity コントラクトへの呼び出しがどの関数の署名とも一致しない場合、 [`fallback()`関数](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)を呼び出します（存在する場合）。 `CalldataInterpreter`の場合、他の`external`または`public`の関数がないため、すべての呼び出しがここに到達します。

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

この関数を返すコールデータの最初の 1 バイトを読み取ります。 ここで関数が取得できないのには、2 つの理由があります：

1. `pure`または`view`の関数の場合。これらの関数は状態を変更しないため、ガスが発生しません（オフチェーンで呼び出す場合）。 ですから、ガス代を節約する必要がありません。
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)に依存した関数。 `msg.sender`の値は、呼び出し元のアドレスではなく、`CalldataInterpreter`のアドレスになります。

残念ながら、[ERC-20 の仕様](https://eips.ethereum.org/EIPS/eip-20)を確認すると、残りの関数は`transfer`のみです。 つまり、呼び出し可能な関数は、`transfer` （`transferFrom`を呼び出す）と、`faucet` （呼び出し元のアドレスにトークンを送信する）になります。

```solidity

        // Call the state changing methods of token using
        // information from the calldata

        // faucet
        if (_func == 1) {
```

次は、パラメータを持たない`faucet()`を呼び出すコードです。

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

`token.faucet()`を呼び出すと、トークンを取得します。 しかし、プロキシのコントラクトにおいてトークンは**必要ありません**。 トークンが必要なのは、外部所有アカウント（EOA）あるいは呼び出し元のコントラクトです。 ですから、所有するトークンをすべて呼び出し元アドレスに送信します。

```solidity
        // transfer (assume we have an allowance for it)
        if (_func == 2) {
```

トークンを送信する場合、送信先アドレスと金額という 2 つのパラメータが必要です。

```solidity
            token.transferFrom(
                msg.sender,
```

送信できるトークンは、呼び出し元が所有するトークンのみです。

```solidity
                address(uint160(calldataVal(1, 20))),
```

送信先アドレスは、#1 のバイトから始まります（#0 のバイトは、関数が使用します）。 アドレスの長さは、20 バイトです。

```solidity
                calldataVal(21, 2)
```

このコントラクトでは、送信可能なトークンの最大数が 2 バイト以内（65536 未満）に収まると想定します。

```solidity
            );
        }
```

1 件の送信につき、35 バイトのコールデータが発生します。

| セクション     | 長さ |   バイト |
| -------------- | ---: | -------: |
| 関数セレクタ   |    1 |        0 |
| 送信先アドレス |   32 |  1 ～ 32 |
| 金額           |    2 | 33 ～ 34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test.js}

[この JavaScript による単体テスト](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js)では、このメカニズムを使用する方法（および、メカニズムが適切に動作していることをを確認する方法）を示します。 ここでは、[Chai](https://www.chaijs.com/)および[Ethers](https://docs.ethers.io/v5/)についてよく理解しているという前提に基づき、特にコントラクトに関連する部分のみを説明します。

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
    // Get tokens to play with
    const faucetTx = {
```

ここでは ABI を使用しないため、トランザクションを作成するために通常用いる高度な関数（`token.faucet()`など）を使用できません。 その代わりに、トランザクションをマニュアルで作成し、送信する必要があります。

```javascript
      to: cdi.address,
      data: "0x01"
```

トランザクションには、次の 2 つのパラメータが必要です：

1. `to`：送信先のアドレスです。 これは、コールデータのインタープリタのアドレスです。
2. `data`：送信するコールデータです。 フォーセットを呼び出す場合、データは 1 バイト（`0x01`）です。

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

すでに送信先（`faucetTx.to`）を指定しており、トランザクションに対して署名を得る必要があるため、[署名者の`sendTransaction`メソッド](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction)を呼び出します。

```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

ここでは、残高を確認します。 `view`関数ではガスを節約する必要がないので、単純に実行します。

```javascript
// Give the CDI an allowance (approvals cannot be proxied)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

コールデータのインタープリタが送信できるように、アローワンスを設定します。

```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

送信トランザクションを作成します。 最初のバイトは「0x02」で、次に送信先アドレスを置き、最後に金額（10 進法で 256 である 0x0100）を置きます。

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

### 例 {#example}

これらのファイルにつき、自ら実行せず、どのように動作するのか確認したい場合は、以下のリンクにアクセスしてください：

1. アドレス[`0x950c753c0edbde44a74d3793db738a318e9c8ce8`](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8)に対する[ `OrisUselessToken`](https://kovan-optimistic.etherscan.io/tx/1410744)のデプロイメント。
2. アドレス[`0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55`](https://kovan-optimistic.etherscan.io/address/0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55)に対する[`CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1410745)のデプロイメント。
3. [`faucet()`](https://kovan-optimistic.etherscan.io/tx/1410746)の呼び出し。
4. [`OrisUselessToken.approve()`](https://kovan-optimistic.etherscan.io/tx/1410747)の呼び出し。 処理が`msg.sender`に依存しているため、この呼び出しは、直接トークンコントラクトで行う必要があります。
5. [`transfer()`](https://kovan-optimistic.etherscan.io/tx/1410748)の呼び出し。

## 送信先コントラクトを制限する場合にコストを削減する方法 {#reducing-the-cost-when-you-do-control-the-destination-contract}

送信先コントラクトを制限できる場合、コールデータのインタープリタが信頼されるため、`msg.sender`チェックを省略する関数を作成することができます。 [`control-contract`のブランチから、動作例を確認できます](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)。

コントラクトが外部のトランザクションのみに応答する場合、1 つのコントラクトのみで対応することができます。 しかし、この方法では[コンポーザビリティ](/developers/docs/smart-contracts/composability/)が失われます。 通常の ERC-20 の呼び出しに応答するコントラクトと、短いコールデータを持つトランザクションに応答するコントラクトを共に用意する方が優れた方法だと言えます。

### Token.sol {#token.sol-2}

この例では、`Token.sol`を修正します。 これにより、このプロキシだけが呼び出せる一連の関数を設定することができます。 以下は、追加の関数です：

```solidity
    // The only address allowed to specify the CalldataInterpreter address
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```

ERC-20 コントラクトは、許可されたプロキシの身元を知る必要があります。 しかし、この時点では値が不明なため、コンストラクタで変数を設定できません。 プロキシは、コンストラクタにおいてトークンのアドレスを要求するため、まずこのコントラクトのインスタンスが実行されます。

```solidity
    /**
     * @dev Calls the ERC20 constructor.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

作成者（`オーナー`と呼ぶ）のアドレスは、プロキシを設定することが許可された唯一のアドレスであるため、ここに保存されます。

```solidity
    /**
     * @dev set the address for the proxy (the CalldataInterpreter).
     * Can only be called once by the owner
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

プロキシは特権アクセスを持つため、セキュリティチェックが省略されます。 このプロキシが信頼できることを確認するには、`オーナー`に対し、1 回のみこの関数を呼び出すことを許可します。 `proxy`が （ゼロではない）実際の値を持つと同時に、この値は変更不可となるため、オーナーが悪意のユーザーになった場合やそのニーモニックが明らかになった場合でも、安全性が維持されます。

```solidity
    /**
     * @dev Some functions may only be called by the proxy.
     */
    modifier onlyProxy {
```

これは、他の関数の動作を修正する[`modifier`関数](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)です。

```solidity
      require(msg.sender == proxy);
```

まず、呼び出し元がプロキシであり、その他のユーザーではないことを確認します。 プロキシ以外から呼び出された場合は、 `revert`します。

```solidity
      _;
    }
```

プロキシからの呼び出しであれば、修正する関数を実行します。

```solidity
   /* Functions that allow the proxy to actually proxy for accounts */

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

以下は、トークンを送信する／アローワンスを承認するエンティティから直接メッセージを受信する際に通常必要となる 3 つの操作です。 ここでは、以下の特徴を持つプロキシバージョンを使います：

1. `onlyProxy()`で修正されており、他のユーザーが管理権限を持たない。
2. 追加のパラメータとして、通常`msg.sender`であるアドレスを取得する。

### CalldataInterpreter.sol {#calldatainterpreter.sol-2}

コールデータのインタープリタは、送信先を限定しない場合とほぼ同一ですが、プロキシの関数では`msg.sender`パラメータを受け取るため、`transfer`のアローワンスが必要ない点が異なります。

```solidity
        // transfer (no need for allowance)
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

### Test.js {#test.js-2}

送信先を限定しない場合とは、いくつかの点が異なります。

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

ERC-20 コントラクトに対し、どのプロキシを信頼するかを伝える必要があります。

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Need two signers to verify allowances
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()`と`transferFrom()`を確認するには、第 2 の署名者が必要です。 第 2 の署名者は、トークンを受け取らないため（もちろん、ETH を所有する必要はあります）に`poorSigner`と呼びます。

```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

ERC-20 コントラクトは、プロキシ (`cdi`) を信頼するため、送信をリレーするためのアローワンスは必要ありません。

```js
// approval and transferFrom
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

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)

No key
Text
XPath: /pre[38]/code
```

新たに追加した 2 つの関数をテストします。 `transferFromTx`のアドレスには、アローワンスの提供元と受領者という 2 つパラメータが要求される点に注意してください。

### 実例 {#example-2}

これらのファイルにつき、自ら実行せず、どのように動作するのか確認したい場合は、以下のリンクにアクセスしてください：

1. [`0xb47c1f550d8af70b339970c673bbdb2594011696`](https://kovan-optimistic.etherscan.io/address/0xb47c1f550d8af70b339970c673bbdb2594011696)のアドレスに対する[`OrisUselessToken-2`のデプロイメント](https://kovan-optimistic.etherscan.io/tx/1475397)。
2. [`0x0dccfd03e3aaba2f8c4ea4008487fd0380815892`](https://kovan-optimistic.etherscan.io/address/0x0dccfd03e3aaba2f8c4ea4008487fd0380815892)のアドレスに対する[ `CalldataInterpreter`のデプロイメント](https://kovan-optimistic.etherscan.io/tx/1475400)。
3. [`setProxy()`の呼び出し](https://kovan-optimistic.etherscan.io/tx/1475402)。
4. [`faucet()`の呼び出し](https://kovan-optimistic.etherscan.io/tx/1475409)。
5. [`transferProxy()`の呼び出し](https://kovan-optimistic.etherscan.io/tx/1475416)。
6. [`approveProxy()`の呼び出し](https://kovan-optimistic.etherscan.io/tx/1475419)。
7. [`transferFromProxy()`の呼び出し](https://kovan-optimistic.etherscan.io/tx/1475421)。 この呼び出しは、他のアドレスとは異なるアドレスからのものであることに注意してください (`signer`の代わりに`poorSigner`) 。

## まとめ {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)と[Arbitrum](https://developer.offchainlabs.com/docs/special_features)はどちらも、L1 に書き込まれるコールデータのサイズを削減し、トランザクションコストを抑える方法を提供することを目指しています。 インフラプロバイダーが汎用性が高いソリューションを追求する一方で、デベロッパの能力には限界があります。 Dapp のデベロッパーは、開発するアプリケーションについて具体的な知識を持つため、汎用性のソリューションよりも効率的にコールデータの最適化を実現できるのです。 この記事が、皆さんのニーズに合わせた理想的なソリューションを見出す上で役立つことを願っています。
