---
title: "Viemを使用したトランザクションの送信"
description: "これは、Viemライブラリを使用してイーサリアムのトランザクションを送信するための初心者向けガイドです。イーサリアムのブロックチェーンにトランザクションを送信するには、作成、署名、ブロードキャストの3つの主要なステップがあります。これら3つすべてについて説明します。"
author: "エラン・ハルパーン"
tags: ["トランザクション", "Viem", "Alchemy"]
skill: beginner
breadcrumb: "トランザクションの送信"
lang: ja
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

これは、[Viem](https://viem.sh/)ライブラリを使用してイーサリアムのトランザクションを送信するための初心者向けガイドです。イーサリアムのブロックチェーンにトランザクションを送信するには、作成、署名、ブロードキャストの3つの主要なステップがあります。これら3つすべてについて説明し、皆さんの疑問にお答えします！このチュートリアルでは、[Alchemy](https://www.alchemy.com/)を使用してイーサリアムのチェーンにトランザクションを送信します。[こちらから無料のAlchemyアカウントを作成](https://auth.alchemy.com/signup)できます。

**注:** このガイドは、アプリの_バックエンド_でトランザクションに署名するためのものです。フロントエンドでトランザクションの署名を統合したい場合は、[メタマスクのプロバイダーAPI](https://docs.metamask.io/wallet/reference/provider-api/)を確認してください。

## 基本事項 {#the-basics}

初めてブロックチェーン開発を始めた多くの開発者と同様に、トランザクションの送信方法（本来は非常にシンプルなはずのこと）について調べた結果、それぞれ異なることを言っている大量のガイドに遭遇し、少し圧倒されて混乱したかもしれません。もしそうなら、心配しないでください。誰もが一度は通る道です！それでは、始める前にいくつか明確にしておきましょう。

### 1\. Alchemyは秘密鍵を保存しません {#alchemy-does-not-store-your-private-keys}

- これは、Alchemyがあなたに代わってトランザクションに署名し、送信することはできないことを意味します。その理由はセキュリティのためです。Alchemyが秘密鍵の共有を求めることは決してありませんし、ホストされたノード（または他の誰か）と秘密鍵を共有するべきではありません。
- AlchemyのコアAPIを使用してブロックチェーンから読み取ることはできますが、書き込むには、Alchemyを通じて送信する前に、別のものを使用してトランザクションに署名する必要があります（これは他の[ノードサービス](/developers/docs/nodes-and-clients/nodes-as-a-service/)でも同じです）。

### 2\. 「署名者（Signer）」とは何ですか？ {#what-is-a-signer}

- 署名者は、秘密鍵を使用してあなたに代わってトランザクションに署名します。このチュートリアルでは、トランザクションの署名に[Viem](https://viem.sh/)を使用しますが、他のWeb3ライブラリを使用することもできます。
- フロントエンドにおける署名者の良い例は[メタマスク](https://metamask.io/)です。これは、あなたに代わってトランザクションに署名し、送信します。

### 3\. なぜトランザクションに署名する必要があるのですか？ {#why-do-i-need-to-sign-my-transactions}

- イーサリアムのネットワークでトランザクションを送信したいすべてのユーザーは、トランザクションの送信元が主張する本人であることを検証するために、（秘密鍵を使用して）トランザクションに署名する必要があります。
- 秘密鍵にアクセスできると、イーサリアムのアカウントを完全に制御できるようになり、あなた（またはアクセスできる人）に代わってトランザクションを実行できるようになるため、この秘密鍵を保護することは非常に重要です。

### 4\. 秘密鍵を保護するにはどうすればよいですか？ {#how-do-i-protect-my-private-key}

- 秘密鍵を保護し、それを使用してトランザクションを送信する方法はたくさんあります。このチュートリアルでは、`.env`ファイルを使用します。ただし、秘密鍵を保存する別のプロバイダーを使用したり、キーストアファイルを使用したり、その他のオプションを使用することもできます。

### 5\. `eth_sendTransaction`と`eth_sendRawTransaction`の違いは何ですか？ {#difference-between-send-and-send-raw}

`eth_sendTransaction`と`eth_sendRawTransaction`はどちらも、将来のブロックに追加されるようにイーサリアムのネットワークにトランザクションをブロードキャストするイーサリアムのAPI関数です。これらは、トランザクションの署名の処理方法が異なります。

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction)は_未署名_のトランザクションを送信するために使用されます。つまり、送信先のノードが秘密鍵を管理し、チェーンにブロードキャストする前にトランザクションに署名できる必要があります。Alchemyはユーザーの秘密鍵を保持しないため、このメソッドをサポートしていません。
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction)は、すでに署名されているトランザクションをブロードキャストするために使用されます。つまり、最初に秘密鍵を使用してトランザクションに署名し（Viemでは、[ローカルアカウント](https://viem.sh/docs/accounts/local/privateKeyToAccount)で[`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction)を使用します）、その結果を`eth_sendRawTransaction`に渡す必要があります。

Viemを使用する場合、`eth_sendRawTransaction`には[`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction)関数を呼び出すことでアクセスします。

このチュートリアルではこれを使用します。

### 6\. Web3ライブラリとは何ですか？ {#what-is-the-web3-library}

- Web3ライブラリは、イーサリアム開発で非常に一般的に使用される標準的な[JSON-RPC](/developers/docs/apis/json-rpc/)呼び出しのラッパーです。
- さまざまな言語向けに多くのWeb3ライブラリがあります。このチュートリアルでは、TypeScriptで記述され、任意のJavaScriptプロジェクトで動作する[Viem](https://viem.sh/)を使用します。[Ethers.js](https://docs.ethers.org/v6/)などの他のオプションは[こちら](/developers/docs/apis/javascript/)で確認できます。

さて、いくつかの疑問が解消されたところで、チュートリアルに進みましょう。質問があれば、いつでもAlchemyの[ディスコード](https://discord.gg/gWuC7zB)で気軽に聞いてください！

### 7\. 安全でガスが最適化されたプライベートなトランザクションを送信するにはどうすればよいですか？ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemyにはトランザクションに関する一連のリソースがあります](https://www.alchemy.com/docs/sending-transactions)。これらを使用して、トランザクションの送信、実行前のトランザクションのシミュレーション、プライベートなトランザクションの送信、およびガスが最適化されたトランザクションの送信を行うことができます。
- また、[AlchemyのWebhook](https://www.alchemy.com/docs/reference/webhooks-overview)を使用すると、トランザクションがメンプールから取り出されてチェーンに追加されたときにアラートを受け取ることができます。

**注:** このガイドでは、Alchemyアカウント、イーサリアムのアドレスまたはメタマスクのウォレット、Node.js、およびnpmがインストールされている必要があります。インストールされていない場合は、次の手順に従ってください。

1.  [無料のAlchemyアカウントを作成する](https://auth.alchemy.com/signup)
2.  [メタマスクのアカウントを作成する](https://metamask.io/)（またはイーサリアムのアドレスを取得する）
3.  [Node.jsとnpmをインストールする](https://nodejs.org/en/download/)
## トランザクションを送信する手順 {#steps-to-sending-your-transaction}

### 1\. SepoliaテストネットでAlchemyアプリを作成する {#create-an-alchemy-app-on-the-sepolia-testnet}

[Alchemyダッシュボード](https://dashboard.alchemy.com/)に移動し、ネットワークとしてSepolia（または他のテストネット）を選択して新しいアプリを作成します。

### 2\. SepoliaフォーセットからETHをリクエストする {#request-eth-from-sepolia-faucet}

[AlchemyのSepoliaフォーセット](https://www.alchemy.com/faucets/ethereum-sepolia)の指示に従ってETHを受け取るか、他の[Sepoliaフォーセット](/developers/docs/networks/#sepolia)のいずれかを使用します。フォーセットは少額（Alchemyのフォーセットは1日あたり0.1 ETH）を提供しますが、このチュートリアルには十分です。他のネットワークではなく、必ず**Sepolia**のイーサリアムのアドレス（メタマスクから）を含めるようにしてください。指示に従った後、ウォレットにETHを受け取ったことを再確認してください。

### 3\. 新しいプロジェクトディレクトリを作成し、そこに`cd`する {#create-a-new-project-direction}

コマンドライン（Macの場合はターミナル）から新しいプロジェクトディレクトリを作成し、そこに移動します。

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Viem（または任意のWeb3ライブラリ）をインストールする {#install-alchemy-web3}

プロジェクトディレクトリで次のコマンドを実行して、[Viem](https://viem.sh/)をインストールします。

Ethers.jsライブラリを使用したい場合は、[こちらの指示に従ってください](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum)。

```sh
npm init -y
npm install viem
```

### 5\. dotenvをインストールする {#install-dotenv}

APIキーと秘密鍵を安全に保存するために、`.env`ファイルを使用します。

```
npm install dotenv --save
```

### 6\. `.env`ファイルを作成する {#create-the-dotenv-file}

プロジェクトディレクトリに`.env`ファイルを作成し、次を追加します（「`your-api-url`」と「`your-private-key`」を置き換えます）。

- AlchemyのAPI URLを見つけるには、ダッシュボードで作成したばかりのアプリの詳細ページに移動し、右上隅の「View Key」をクリックして、HTTP URLを取得します。
- メタマスクを使用して秘密鍵を見つけるには、この[ガイド](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)を確認してください。テストネットのETHのみを保持するアカウントを使用してください。

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code>をコミットしないでください！<code>.env</code>ファイルを誰かと共有したり公開したりすると、シークレットが漏洩することになるため、絶対にしないでください。バージョン管理を使用している場合は、<code>.env</code>を<a href="https://git-scm.com/docs/gitignore">gitignore</a>ファイルに追加してください。
</AlertDescription>
</AlertContent>
</Alert>

### 7\. `sendTx.js`ファイルを作成する {#create-sendtx-js}

素晴らしいです。機密データが`.env`ファイルで保護されたので、コーディングを始めましょう。トランザクション送信の例として、メタマスクの2つ目のアカウントなど、あなたが管理する別のアドレスに0.001 ETHを送金します。

`sendTx.js`ファイルを作成します。ここでサンプルトランザクションを設定して送信します。次のコード行を追加してください。

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // ナンスは0からカウントされます

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: ETHを送金したいアドレスに置き換えてください
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // メッセージを送信したりスマート・コントラクトを実行するための任意のデータフィールド
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

`0xYourSecondAddress`を、ETHを送金したいアドレスに必ず置き換えてください。スクリプトは`PRIVATE_KEY`からあなた自身の（送信元の）アドレスを導出するため、入力する必要はありません。

さて、このコードを実行する前に、ここにあるいくつかのコンポーネントについて説明しましょう。

- `account`: [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount)を使用して秘密鍵から作成されたローカルアカウントです。署名はあなたのマシン上で行われ、秘密鍵がAlchemyに送信されることは決してありません。
- `publicClient`と`walletClient`: AlchemyのURLにJSON-RPCリクエストを送信するViemクライアントです。パブリッククライアントはチェーンから読み取りを行い、ウォレットクライアントはアカウントのトランザクションを準備して署名します。
- `nonce`: ナンスの指定は、あなたのアドレスから送信されたトランザクションの数を追跡するために使用されます。これはセキュリティ上の目的と、リプレイ攻撃を防ぐために必要です。あなたのアドレスから送信されたトランザクションの数を取得するには、[getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count)を使用します。Viemもこれを自動的に入力してくれますが、ここではそれがどこから来るのかを示すために明示的に取得しています。
- `transaction`: トランザクションオブジェクトには、指定する必要があるいくつかの側面があります。[`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest)は、現在のネットワーク状況に基づいて、`chainId`や[EIP-1559](/developers/docs/gas/)の手数料フィールドである`maxFeePerGas`および`maxPriorityFeePerGas`など、残りの部分を自動的に入力してくれます。
  - `to`: これはETHを送金したいアドレスです。
  - `value`: これは送金したい金額で、10^18 Wei = 1 ETHとなるWeiで指定します。[`parseEther`](https://viem.sh/docs/utilities/parseEther)は、ETHの金額をWeiに変換してくれます。アカウントはガスの支払いも行うため、これより少し多くの残高が必要です。
  - `gas`: トランザクションに含める適切なガス量を決定する方法はたくさんあります。Alchemyは、オンチェーンのアクティビティについて通知できる[Webhook](https://www.alchemy.com/docs/reference/webhooks-overview)をサポートしています。メインネットのトランザクションの場合、現在のガス状況を確認して、含める適切なガス量を決定することをお勧めします。通常のアドレスへの単純なETHの送金は常に正確に21000ガスを使用し、これがすべてのトランザクションの最小値であるため、ここでは21000を指定します。`gas`を省略すると、Viemが自動的に見積もってくれます。
  - `nonce`: 上記のナンスの定義を参照してください。ナンスはゼロからカウントを開始します。
  - [オプション] data: 送金とともに追加情報を送信したり、スマート・コントラクトを呼び出したりするために使用されます。残高の送金には必須ではありません。以下の注記を確認してください。
- `signedTx`: トランザクションオブジェクトに署名するには、`signTransaction`メソッドを使用します。これは、`PRIVATE_KEY`から作成されたアカウントを使用してローカルで署名します。
- `sendRawTransaction`: 署名されたトランザクションができたら、`eth_sendRawTransaction`を呼び出す`sendRawTransaction`を使用して、後続のブロックに含めるために送信できます。
- `waitForTransactionReceipt`: トランザクションがブロックに含まれるまで待機し、そのレシートを返します。

**データに関する注記**
イーサリアムで送信できるトランザクションには、主に2つのタイプがあります。

- 残高の送金: あるアドレスから別のアドレスへETHを送金します。データフィールドは必要ありませんが、トランザクションとともに追加情報を送信したい場合は、このフィールドにHEX形式でその情報を含めることができます。
  - たとえば、イミュータブルなタイムスタンプを付与するために、IPFSドキュメントのハッシュをイーサリアムのチェーンに書き込みたいとします。その場合、データフィールドはViemの[`toHex`](https://viem.sh/docs/utilities/toHex)を使用して、`data: toHex("IPFS hash")`のようになります。これにより、誰でもチェーンをクエリして、そのドキュメントがいつ追加されたかを確認できるようになります。
- スマート・コントラクトのトランザクション: チェーン上でスマート・コントラクトのコードを実行します。この場合、データフィールドには、実行したいスマート関数とパラメータを含める必要があります。
  - 実践的な例については、[Hello Worldスマート・コントラクトのチュートリアル](/developers/tutorials/hello-world-smart-contract/)を確認してください。

### 8\. `node sendTx.js`を使用してコードを実行する {#run-the-code-using-node-sendtx-js}

ターミナルまたはコマンドラインに戻り、次を実行します。

```
node sendTx.js
```

### 9\. ブロック・エクスプローラーでトランザクションを確認する {#see-your-transaction-in-the-mempool}

スクリプトは、ノードがトランザクションを受け入れるとすぐにトランザクション・ハッシュを出力し、ブロックに含まれるまで（通常は数秒以内）待機して結果を出力します。詳細を確認するには、[Sepolia Etherscan](https://sepolia.etherscan.io/)や[Blockscout](https://eth-sepolia.blockscout.com/)などのSepoliaのブロック・エクスプローラーにハッシュを貼り付けます。そこで、トランザクションが保留中から含まれるまでの過程を観察し、金額、手数料、およびそれが着地したブロックを確認できます。

代わりに`insufficient funds`エラーが表示された場合、アカウントには送金額とガスをカバーするのに十分なSepoliaのETHがありません。ステップ2に戻り、フォーセットからさらにリクエストしてください。

**やったー！Alchemyを使用して初めてのイーサリアムのトランザクションを送信しました 🎉**

_このガイドに関するフィードバックや提案については、Alchemyの[ディスコード](https://discord.gg/gWuC7zB)でElanにメッセージを送ってください！_

_元々はAlchemyによって公開されました。_
