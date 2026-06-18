---
title: "ガスレスユーザーにトークンを保持させ、コントラクトを呼び出させる方法"
description: "アカウント抽象化を使用すると、特定のEOAによって送信された、またはそのEOAによって署名されたトランザクションを受け入れるスマート・コントラクトウォレットを作成できます。これらのスマート・コントラクトは、EOAの制御下にあるトークンを所有できます。"
author: "オリ・ポメランツ"
tags:
  - ガスレス
  - erc-20
  - アカウント抽象化
skill: intermediate
breadcrumb: "ガスレストークン"
lang: ja
published: 2026-04-01
---

## はじめに {#introduction}

[以前の記事](/developers/tutorials/gasless/)では、EIP-712署名を使用して独自のアプリケーションにガスレスでアクセスする方法について説明しましたが、これは独自のスマート・コントラクトに限定されていました。[アカウント抽象化](/roadmap/account-abstraction/)を使用すると、2種類のトランザクションを受け入れ、要求された宛先に中継するスマート・コントラクトウォレットを作成できます。

- 特定のEOAによって送信されたトランザクション（そのEOAがETHを持っている必要があります）
- どこからでも送信できるが、同じEOAによって署名されたトランザクション。

このようにして、アカウントが資産（トークンなど）を保持し、ガスを持つEOAができるすべての機能を実行するためのガスレスな方法を提供できます。

### なぜリクエストを単に中継できないのか？ {#why-no-tx-origin}

ERC-20および関連する標準では、アカウントの所有者は[`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties)、つまりトークンコントラクトを呼び出したアドレスであり、必ずしもトランザクションの送信元である[`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties)とは限りません。これは[セキュリティ上の理由](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin)から必要です。つまり、トークンの送金リクエストを中継すると、ユーザーが制御するアドレスからではなく、リレイヤーのアドレスからトークンを送金しようとします。

[EIP-7702](https://eip7702.io/)を介してEOAアドレスを使用できる解決策はありますが、潜在的に危険な委任に署名する必要があるため、ウォレットプロバイダーが承認するスマート・コントラクトにデリゲートする場合にのみ使用できます。このチュートリアルでは、ユーザーのプロキシとしてスマート・コントラクトを作成するという、はるかに簡単な方法を好みます。

## 実際の動作を見る {#in-action}

1. [Node](https://nodejs.org/en/download)と[Foundry](https://www.getfoundry.sh/introduction/installation)の両方がインストールされていることを確認します。

2. アプリケーションをクローンし、必要なソフトウェアをインストールします。

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. `.env`を編集して、`SEPOLIA_PRIVATE_KEY`をSepolia上にETHを持つウォレットに設定します。Sepolia ETHが必要な場合は、[フォーセットを使用して](/developers/docs/networks/#sepolia)取得してください。理想的には、この秘密鍵はブラウザのウォレットにあるものとは異なるものにする必要があります。

4. サーバーを起動します。

   ```sh
   npm run dev
   ```

5. URL [`http://localhost:5173`](http://localhost:5173) でアプリケーションにアクセスします。

6. <strong>Connect with Injected</strong>をクリックしてウォレットに接続します。ウォレットで承認し、必要に応じてSepoliaへの変更を承認します。

7. 下にスクロールして、**Deploy UserProxy (slow process)**をクリックします。

8. <strong>UserProxy access</strong>の横にアドレスが表示されるため、ユーザープロキシがいつデプロイされたかがわかります。24秒（2ブロック）待ってもまだ表示されない場合は、変更の検出に問題がある可能性があります。

   その場合は、[Sepolia Explorer](https://eth-sepolia.blockscout.com/)にアクセスし、サーバー出力の`npm run dev`に表示されているデプロイメントのトランザクション・ハッシュを入力します。作成されたコントラクトをクリックしてそのアドレスを表示し、コピーします。_Or enter existing proxy address_フィールドにアドレスを貼り付け、**Set proxy address**をクリックします。

9. <strong>Request more tokens for proxy</strong>をクリックして、ERC-20コントラクトの[`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd)関数への呼び出しを送信し、トークンを取得します。ウォレットで署名を**確認**します。もちろん、トークンはユーザーのアドレスではなく、プロキシのアドレスに届きます。

10. 下にスクロールして、_Last transaction:_の下にあるリンクをクリックします。これによりブラウザが開き、`faucet`トランザクションが表示されます。

11. <em>amount to transfer</em>に、1から1000までの数字を入力します。**Transfer**をクリックして、トークンを自分のアドレスに送金します。リクエストの**Confirm**をクリックする前に、署名されるデータが不透明であることを確認してください。ユーザーは自分が何に署名しているのかを理解するのに苦労するでしょう。これについては[後述](#vulnerabilities)することを覚えておいてください。

12. トランザクションが確認された後、_your balance_と_proxy balance_の両方の変更が表示されるのを待ちます。Sepoliaのブロックタイムは12秒であるため、これにも少し時間がかかることに注意してください。

## 仕組み {#how-work}

ガスレスな体験を提供するには、ユーザー向けのユーザーインターフェース、ユーザーインターフェースからチェーンにメッセージをルーティングするサーバー、そしてそれらを受信して検証するスマート・コントラクトが必要です。

### ウォレットのスマート・コントラクト {#wallet-smart-contract}

これが[スマート・コントラクト](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol)です。その目的は、リクエストに使用されたチャネルに関係なく、実際の所有者がリクエストしたことを何でも実行し、それ以外はすべて無視することです。これを行うために、その関数は呼び出すターゲットアドレスと、それを呼び出すために使用するデータを受け取ります。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

所有者の身元と、メッセージの繰り返しを防ぐための[ナンス](https://en.wikipedia.org/wiki/Cryptographic_nonce)です。ナンスは`public`変数であるため、Solidityコンパイラは、オフチェーンのコードがその値を読み取れるようにするビュー関数[`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0)も作成します。

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

[EIP-712署名](https://eips.ethereum.org/EIPS/eip-712)を検証するために必要な情報です。

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

`UserProxy`は単一の所有者アドレスに結び付けられています。これは、資産（ERC-20トークン、NFTなど）を所有できるため必要です。異なる所有者に属する資産を混在させたくありません。

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[ドメインセパレーター](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)です。チェーンIDとコントラクトアドレスに依存するため、コンパイル時に計算することはできません。これにより、UserProxyが別のプロキシ用に準備されたメッセージに騙されることは不可能になります。

```solidity
    event CallResult(address target, bytes returnData);
```

呼び出しの結果をログに記録します。

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

この関数は、所有者が直接呼び出すことができます。リレイヤーが利用できない場合でも、所有者はブロックチェーン上の資産に直接アクセスできます（ユーザーがETHを持っている場合）。

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

所有者から_直接_呼び出された場合は、提供されたコールデータを使用してターゲットを呼び出します。

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

これが`UserProxy`のメイン関数です。`target`と`data`、および署名を取得します。

```solidity
    external returns (bytes memory) {
        // EIP-712ダイジェストを計算する
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

ダイジェストにはナンスも含まれますが、トランザクションから受け取る必要はありません。正しい値はすでにわかっています。間違ったナンスを持つ署名は拒否されます。

```solidity

    // 署名者を復元する
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

署名が無効な場合、`ecrecover`は通常異なるアドレスを返し、受け入れられません。

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

ユーザーが呼び出すように指示したコントラクトを呼び出し、成功しなかった場合はリバートします。

```solidity
    emit CallResult(target, returnData);

    nonce++; // リプレイを防ぐためにナンスをインクリメントする

    return returnData;
}
```

成功した場合は、ログイベントを発行し、ナンスをインクリメントします。

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

これらはほぼ同一のバリアントであり、コントラクトからETHを送金することもできます。

### リレイヤー {#relayer}

リレイヤーは[サーバーコンポーネント](/developers/tutorials/server-components/)です。JavaScriptで書かれています。ソースコードは[こちら](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js)で確認できます。

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

必要なライブラリです。これは[Express](https://expressjs.com/)サーバーであり、[Vite](https://vite.dev/)を使用してユーザーインターフェースのコードを提供します。ブロックチェーンとの通信には[Viem](https://viem.sh/)を使用し、トランザクションを送信するアドレスの秘密鍵を読み取るために[dotenv](https://www.dotenv.org/)を使用します。

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

これはコンパイルされた`UserProxy`を読み取る簡単な方法です。`UserProxy`を呼び出せるようにするためにABIが必要であり、ユーザーのためにデプロイできるようにするためにコンパイルされたコードが必要です。

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

`.env`ファイルを読み取り、アドレスを抽出してコンソールに出力します。

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

ブロックチェーンと通信するViemクライアントです。

```js
const start = async () => {
  const app = express()
```

Expressサーバーを実行します。

```js
  app.use(express.json())
```

リクエストボディを読み取り、JSONであればパースするようにExpressに指示します。

```js
  app.post("/server/deploy", async (req, res) => {
```

これはプロキシをデプロイするリクエストを処理するコードです。攻撃者が私たちのETHが枯渇するまでプロキシのデプロイリクエストをスパム送信できるため、ここでは[サービス拒否（DoS）](https://en.wikipedia.org/wiki/Denial-of-service_attack)攻撃に対して脆弱であることに注意してください。本番システムでは、おそらくプロキシのデプロイリクエストが署名されていること、および署名者が既存の顧客であることを要求するでしょう。

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

リクエストから所有者のアドレスを取得します。

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[コントラクトをデプロイ](https://viem.sh/docs/contract/deployContract#deploycontract)し、[デプロイされるまで待ちます](https://viem.sh/docs/actions/public/waitForTransactionReceipt)。

```js
      res.json({ contractAddress: receipt.contractAddress })
```

すべて問題なければ、プロキシアドレスをユーザーインターフェースに返します。

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

問題がある場合は報告します。

```js
  app.post("/server/message", async (req, res) => {
```

これは`UserProxy`コントラクトのユーザーメッセージを処理するコードです。これもサービス拒否攻撃に対して脆弱なポイントです。

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

リクエストデータを取得し、それを使用してプロキシ上の`signedAccess`を呼び出します。

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

トランザクション・ハッシュを報告します。これにより、UIはユーザーがトランザクションを確認するためのURLを表示できます。

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

繰り返しになりますが、問題がある場合は報告します。

```js
  // 残りはすべてViteに処理させる
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

それ以外の場合は、ユーザーインターフェースの提供を処理するViteを使用します。

### ユーザーインターフェース {#user-interface}

[これがユーザーインターフェースのコードです](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src)。コードの大部分は、[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx)を除いて、[この記事](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through)で文書化されているものとほぼ同じです。

[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx)の一部は、[この記事](/developers/tutorials/gasless/#ui-changes)の[`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx)に似ています。以下は新しい部分です。

```js
import {
   encodeFunctionData
       } from 'viem'
```

[この関数](https://viem.sh/docs/contract/encodeFunctionData)は、EVM関数呼び出しのコールデータを作成します。これは、ユーザーがコールデータに署名できるようにするために必要です。

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

上記で説明した`UserProxy`です。

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[このコントラクト](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract)は、1つの重要な関数`faucet()`が追加されていることを除けば、ほとんど通常のERC-20コントラクトです。この関数は、テスト目的で要求した人にトークンを付与します。

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

`FaucetToken`のアドレスです。

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

このコンポーネントは、ブロック・エクスプローラー上のコントラクトへのリンクを含むアドレスを出力します。

```js
const Token = () => {
    ...
```

これがほとんどの作業を行うメインコンポーネントです。

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

ユーザーアドレスのトークン残高です。

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

ユーザーが所有するプロキシのアドレスです。

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

プロキシのトークン残高です。

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

このフィールドは、ユーザーが手動でプロキシアドレスを設定する場合に使用されます。プロキシアドレスを手動で設定できることで、ユーザーは毎回新しいプロキシをデプロイする（そして古いプロキシが所有するすべてのトークンを失う）代わりに、既存のプロキシを使用できます。

```js
  const [ txHash, setTxHash ] = useState(null)
```

最後のトランザクションのハッシュです。ユーザーがそのトランザクションを確認できるように、エクスプローラーへのリンクを表示するために使用されます。

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

これらのフィールドはすべて、ERC-20コントラクトにトークン送金コマンドを送信するために使用されます。これは`FaucetToken`である可能性がありますが、そうである必要はありません。[`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens)関数はERC-20標準の一部です。

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

関心のある2つのトークン残高、つまりユーザーがどれだけ所有しているか、プロキシがどれだけ所有しているかを読み取ります。

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

リプレイ攻撃（たとえば、売り手がお金を受け取るトランザクションをリプレイするなど）を防ぐために、[ナンス](https://en.wikipedia.org/wiki/Cryptographic_nonce)を使用します。署名するデータに追加するために、現在の値を知る必要があります。

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

ブロックチェーンから読み取った情報が変更されたときにユーザーに表示される残高を更新するには、[`useEffect`](https://react.dev/reference/react/useEffect)を使用します。

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

デフォルトでは、`FaucetToken`トークンをユーザー自身のアカウントに送金します。ここでは、Viemから受け取ったときにこれらの値を設定します。

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

テキストフィールドが変更されたときのイベントハンドラーです。

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

このユーザーのためにプロキシをデプロイするようにサーバーに要求します。

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

オンチェーンの`UserProxy`に送信するためにサーバーに送信する前に、メッセージに署名します。これについては[こちら](/developers/tutorials/gasless/#ui-changes)で説明されています。ターゲットアドレス（呼び出しているトークンのアドレス）と送信するコールデータの両方を含むメッセージに署名する必要があります。

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

署名されたメッセージを`UserProxy`に送信します。これにより署名が検証され、`target`に送信されます。

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // 両方のアドレス
          data,           // ターゲットに送信するコールデータ
          v, r, s         // 署名
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

サーバーにリクエストを送信し、レスポンスを受け取ったらトランザクション・ハッシュを取得します。

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

`faucet`関数の呼び出しをシミュレートします。これが成功した場合にのみ、フォーセットボタンを有効にします。

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

サーバーと`UserProxy`を介して関数を呼び出すには、次の3つの手順に従います。

1. [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData)を使用して、署名して送信するコールデータを作成します。

2. メッセージ（ターゲットアドレス、コールデータ、およびナンス）に署名します。

3. メッセージをサーバーに送信します。

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

コンポーネントのこの部分では、ブラウザから直接`FaucetToken`を使用できます。その主な目的はデバッグを容易にすることです。

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

ユーザーに新しい`UserProxy`をデプロイさせます。

```js
         <br /><br />
         <input type="text" placeholder="または既存のプロキシアドレスを入力" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

正当なアドレスを入力した場合にのみ、ユーザーが**Set proxy address**をクリックできるようにします。これにより、問題のアドレスが実際に`UserProxy`コントラクトであることが保証されるわけではないことに注意してください。そのようなチェックを追加することは可能ですが、はるかに遅くなり（ユーザーエクスペリエンスが悪化し）、セキュリティは向上しません（攻撃者は常にユーザーインターフェースに独自のコードを使用できます）。

```js
         <br /><br />
         { proxyAddr && (
```

正当なプロキシアドレスがある場合に_のみ_、残りを表示します。

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

ユーザーはナンスを知る必要はありません。これは単なるデバッグ目的です。

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

プロキシを介した`faucet()`への呼び出しをシミュレートすることはできません。ただし、少なくともプロキシがあり、プロキシがナンスを報告したことは確認できます。

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

ユーザーにERC-20の送金トランザクションを発行させます。

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

最後のトランザクション・ハッシュがある場合は、ユーザーがブロック・エクスプローラーで表示できるようにリンクを表示します。

```js
 
</div>
    </>
  )
}

export {Token}
```

これは単なるReactのボイラープレートです。

## 脆弱性 {#vulnerabilities}

私たちのサーバーはサービス拒否攻撃に対して脆弱です。この攻撃については、[シリーズの前の記事](/developers/tutorials/gasless/#dos-on-server)で説明されています。

さらに、私たちはユーザーの悪い行動を助長しています。これがユーザーに署名を求めているものです。

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

<em>私たち</em>は、これがユーザーが送金したいトークン、金額、および宛先アドレスに対する正当なERC-20の送金であることを知っています。しかし、ほとんどのユーザーはコールデータの解釈方法を知らず、自分が何に署名しているのかまったくわかりません。これは2つの理由から悪い設計です。

- 署名するように指示されたデータを信頼できないため、私たちを使用しないユーザーもいます。
- 他のユーザーは私たちを_信頼し_、それが何であるかを理解せずにコールデータに署名するだけでよいと学習します。つまり、攻撃者のアダムが彼らを自分のウェブサイトにリダイレクトすることに成功した場合、ユーザーが所有するすべてのUSDC（またはDAI、その他のERC-20）を彼に付与するトランザクションに署名させることができます。

解決策は、送金などの一般的に使用される関数用に、`UserProxy`に個別の関数を用意することです。そうすれば、ユーザーは自分が理解できるものに署名できます。

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**注:** ユーザーは好きなウォレットを使用できますが、EIP-712を使用するアプリケーションでは、[署名データ全体を表示する](https://rabby.io/)ウォレットを使用することを強くお勧めします。一部のウォレットはアドレスを切り詰めますが、これは安全ではありません。攻撃者は、最初と最後の文字が同じで、真ん中が異なるアドレスを作成できます。

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## 結論 {#conclusion}

上記の脆弱性に加えて、このチュートリアルの解決策には、イーサリアムが対処するのに役立ついくつかの欠点があります。

- _検閲耐性_。現在、ユーザーはあなたのサーバー、他の誰かが設定した競合するサーバーを使用するか、イーサリアムに直接接続することができますが、これにはガスコストがかかります。[ERC-4337](https://docs.erc4337.io/#what-is-erc-4337)を使用すると、ユーザーはトランザクションをサーバーの大規模なプールに提供できるため、トランザクションが検閲される可能性が低くなります。
- _EOAが所有する資産_。上記のように、[EIP-7702](https://eip7702.io/)を使用して、EOAアドレスがすでに所有している資産を管理できます。これには困難が伴いますが、必要な場合もあります。

近い将来、これらの機能の追加に関するチュートリアルを公開したいと考えています。

[私の他の作品についてはこちらをご覧ください](https://cryptodocguy.pro/)。