---
title: "Web3を使用したトランザクションの送信"
description: "これは、Web3を使用してイーサリアムのトランザクションを送信するための初心者向けガイドです。イーサリアムのブロックチェーンにトランザクションを送信するには、作成、署名、ブロードキャストの3つの主要なステップがあります。これら3つすべてについて説明します。"
author: "エラン・ハルパーン"
tags: ["トランザクション", "Web3.js", "Alchemy"]
skill: beginner
breadcrumb: "トランザクションの送信"
lang: ja
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

これは、Web3を使用してイーサリアムのトランザクションを送信するための初心者向けガイドです。イーサリアムのブロックチェーンにトランザクションを送信するには、作成、署名、ブロードキャストの3つの主要なステップがあります。これら3つすべてについて説明し、皆さんの疑問にお答えできればと思います。このチュートリアルでは、[Alchemy](https://www.alchemy.com/)を使用してイーサリアムのチェーンにトランザクションを送信します。[こちらから無料のAlchemyアカウントを作成](https://auth.alchemy.com/signup)できます。

**注:** このガイドは、アプリの_バックエンド_でトランザクションに署名するためのものです。フロントエンドでのトランザクション署名を統合したい場合は、[Web3とブラウザプロバイダーの統合](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider)を確認してください。

## 基本事項 {#the-basics}

初めてブロックチェーン開発を始めた多くの開発者と同様に、トランザクションの送信方法（本来は非常にシンプルなはずのこと）について調べた結果、それぞれ異なることを言っている大量のガイドに遭遇し、少し圧倒されて混乱したかもしれません。もしそうなら、心配しないでください。誰もが一度は通る道です！それでは、始める前にいくつか明確にしておきましょう。

### 1\. Alchemyは秘密鍵を保存しません {#alchemy-does-not-store-your-private-keys}

- これは、Alchemyがあなたに代わってトランザクションに署名し、送信することはできないことを意味します。その理由はセキュリティのためです。Alchemyが秘密鍵の共有を求めることは決してありませんし、ホストされたノード（または他の誰か）と秘密鍵を共有するべきではありません。
- AlchemyのコアAPIを使用してブロックチェーンから読み取ることはできますが、書き込むには、Alchemyを通じて送信する前に、別のものを使用してトランザクションに署名する必要があります（これは他の[ノードサービス](/developers/docs/nodes-and-clients/nodes-as-a-service/)でも同じです）。

### 2\. 「署名者（signer）」とは何ですか？
- 署名者は、あなたの秘密鍵を使用してあなたに代わってトランザクションに署名します。このチュートリアルでは、トランザクションに署名するために[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)を使用しますが、他のWeb3ライブラリを使用することもできます。
- フロントエンドにおける署名者の良い例は[メタマスク](https://metamask.io/)です。これはあなたに代わってトランザクションに署名し、送信します。
### 3\. なぜトランザクションに署名する必要があるのですか？ {#why-do-i-need-to-sign-my-transactions}

- イーサリアムのネットワークでトランザクションを送信したいすべてのユーザーは、トランザクションの送信元が主張する本人であることを検証するために、（秘密鍵を使用して）トランザクションに署名する必要があります。
- 秘密鍵にアクセスできると、イーサリアムのアカウントを完全に制御できるようになり、あなた（またはアクセスできる人）に代わってトランザクションを実行できるようになるため、この秘密鍵を保護することは非常に重要です。

### 4\. 秘密鍵を保護するにはどうすればよいですか？ {#how-do-i-protect-my-private-key}

- 秘密鍵を保護し、それを使用してトランザクションを送信する方法はたくさんあります。このチュートリアルでは、`.env`ファイルを使用します。ただし、秘密鍵を保存する別のプロバイダーを使用したり、キーストアファイルを使用したり、その他のオプションを使用することもできます。

### 5\. `eth_sendTransaction`と`eth_sendRawTransaction`の違いは何ですか？ {#difference-between-send-and-send-raw}

`eth_sendTransaction`と`eth_sendRawTransaction`はどちらも、将来のブロックに追加されるようにイーサリアムのネットワークにトランザクションをブロードキャストするイーサリアムのAPI関数です。これらは、トランザクションの署名の処理方法が異なります。

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction)は_未署名_のトランザクションを送信するために使用されます。つまり、送信先のノードが秘密鍵を管理し、チェーンにブロードキャストする前にトランザクションに署名できる必要があります。Alchemyはユーザーの秘密鍵を保持していないため、このメソッドはサポートしていません。
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction)は、すでに署名されているトランザクションをブロードキャストするために使用されます。つまり、最初に[`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction)を使用し、その結果を`eth_sendRawTransaction`に渡す必要があります。

Web3を使用する場合、`eth_sendRawTransaction`には[web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction)関数を呼び出すことでアクセスします。

このチュートリアルではこれを使用します。

### 6\. Web3ライブラリとは何ですか？ {#what-is-the-web3-library}

- Web3.jsは、イーサリアム開発で非常に一般的に使用される標準的なJSON-RPC呼び出しのラッパーライブラリです。
- さまざまな言語向けに多くのWeb3ライブラリがあります。このチュートリアルでは、JavaScriptで書かれた[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)を使用します。[Ethers.js](https://docs.ethers.org/v5/)などの他のオプションは[こちら](/developers/docs/apis/javascript/)で確認できます。

さて、いくつかの疑問が解消されたところで、チュートリアルに進みましょう。質問があれば、いつでもAlchemyの[ディスコード](https://discord.gg/gWuC7zB)で気軽に聞いてください！

### 7\. 安全でガスが最適化されたプライベートなトランザクションを送信するにはどうすればよいですか？
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

[AlchemyのSepoliaフォーセット](https://www.sepoliafaucet.com/)の指示に従ってETHを受け取ります。他のネットワークではなく、必ず**Sepolia**のイーサリアムのアドレス（メタマスクから）を含めるようにしてください。指示に従った後、ウォレットにETHを受け取ったことを再確認してください。

### 3\. 新しいプロジェクトディレクトリを作成し、そこに`cd`する {#create-a-new-project-direction}

コマンドライン（Macの場合はターミナル）から新しいプロジェクトディレクトリを作成し、そこに移動します。

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Alchemy Web3（または任意のWeb3ライブラリ）をインストールする {#install-alchemy-web3}

プロジェクトディレクトリで次のコマンドを実行して、[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)をインストールします。

Ethers.jsライブラリを使用したい場合は、[こちらの手順に従ってください](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum)。

```
npm install @alch/alchemy-web3
```

### 5\. dotenvをインストールする {#install-dotenv}

APIキーと秘密鍵を安全に保存するために、`.env`ファイルを使用します。

```
npm install dotenv --save
```

### 6\. `.env`ファイルを作成する {#create-the-dotenv-file}

プロジェクトディレクトリに`.env`ファイルを作成し、以下を追加します（「`your-api-url`」と「`your-private-key`」を置き換えます）。

- AlchemyのAPI URLを見つけるには、ダッシュボードで作成したばかりのアプリの詳細ページに移動し、右上隅の「View Key」をクリックして、HTTP URLを取得します。
- メタマスクを使用して秘密鍵を見つけるには、この[ガイド](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)を確認してください。

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code>をコミットしないでください！<code>.env</code>ファイルを誰かと共有したり公開したりすると、シークレットが漏洩することになるため、絶対にしないようにしてください。バージョン管理を使用している場合は、<code>.env</code>を<a href="https://git-scm.com/docs/gitignore">gitignore</a>ファイルに追加してください。
</AlertDescription>
</AlertContent>
</Alert>

### 7\. `sendTx.js`ファイルを作成する
素晴らしいです。機密データを`.env`ファイルで保護できたので、コーディングを始めましょう。トランザクション送信の例として、SepoliaフォーセットにETHを送金して返します。

`sendTx.js`ファイルを作成します。ここでサンプルのトランザクションを設定して送信します。ファイルに次のコード行を追加してください。

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: このアドレスをあなた自身のパブリックアドレスに置き換えてください

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // ナンスは0からカウントを開始します

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // ETHを返すフォーセットのアドレス
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // メッセージを送信したりスマート・コントラクトを実行したりするためのオプションのデータフィールド
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

**6行目**のアドレスを必ずあなた自身のパブリックアドレスに置き換えてください。

さて、このコードを実行する前に、ここにあるいくつかのコンポーネントについて説明しましょう。

- `nonce` : ナンスの指定は、あなたのアドレスから送信されたトランザクションの数を追跡するために使用されます。これはセキュリティ上の目的と、リプレイ攻撃を防ぐために必要です。あなたのアドレスから送信されたトランザクションの数を取得するには、[getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count)を使用します。
- `transaction`: トランザクションオブジェクトには、指定する必要があるいくつかの要素があります。
  - `to`: これはETHの送金先アドレスです。この場合、最初にリクエストした[Sepoliaフォーセット](https://sepoliafaucet.com/)にETHを送金して返します。
  - `value`: これは送金したい金額で、Weiで指定します。10^18 Wei = 1 ETHです。
  - `gas`: トランザクションに含める適切なガス量を決定する方法はたくさんあります。Alchemyは、オンチェーンのアクティビティについて通知できる[Webhook](https://www.alchemy.com/docs/reference/webhooks-overview)をサポートしています。メインネットのトランザクションの場合、現在のガスの状況を確認して、含める適切なガス量を決定することをお勧めします。21000はイーサリアムでの操作が使用する最小のガス量であるため、トランザクションが確実に実行されるように、ここでは30000を指定します。
  - `nonce`: 上記のナンスの定義を参照してください。ナンスは0からカウントを開始します。
  - [オプション] data: 送金と一緒に追加情報を送信したり、スマート・コントラクトを呼び出したりするために使用されます。残高の送金には必須ではありません。以下の注記を確認してください。
- `signedTx`: トランザクションオブジェクトに署名するには、`PRIVATE_KEY`とともに`signTransaction`メソッドを使用します。
- `sendSignedTransaction`: 署名されたトランザクションを取得したら、`sendSignedTransaction`を使用して、後続のブロックに含めるために送信できます。

**データに関する注記**
イーサリアムで送信できるトランザクションには、主に2つのタイプがあります。

- 残高の送金: あるアドレスから別のアドレスへETHを送金します。データフィールドは必要ありませんが、トランザクションと一緒に追加情報を送信したい場合は、このフィールドにHEX形式でその情報を含めることができます。
  - たとえば、IPFSドキュメントのハッシュをイーサリアムのチェーンに書き込んで、イミュータブルなタイムスタンプを付与したいとします。その場合、データフィールドは`data: web3.utils.toHex(‘IPFS hash‘)`のようになります。これにより、誰でもチェーンをクエリして、そのドキュメントがいつ追加されたかを確認できるようになります。
- スマート・コントラクトのトランザクション: チェーン上でスマート・コントラクトのコードを実行します。この場合、データフィールドには、実行したいスマート関数とパラメータを含める必要があります。
  - 実践的な例については、[Hello Worldスマート・コントラクトのチュートリアル](/developers/tutorials/hello-world-smart-contract/)を確認してください。
### 8\. `node sendTx.js`を使用してコードを実行する {#run-the-code-using-node-sendtx-js}

ターミナルまたはコマンドラインに戻り、次を実行します。

```
node sendTx.js
```

### 9\. メンプールでトランザクションを確認する
Alchemyダッシュボードの[メンプールページ](https://dashboard.alchemy.com/mempool)を開き、作成したアプリでフィルタリングしてトランザクションを見つけます。ここでは、トランザクションが保留中の状態から、マイニングされた状態（成功した場合）、またはドロップされた状態（失敗した場合）に移行するのを確認できます。「mined（マイニング済み）」、「pending（保留中）」、「dropped（ドロップ）」のトランザクションをすべてキャプチャできるように、必ず「All」のままにしておいてください。また、アドレス`0x31b98d14007bdee637298086988a0bbd31184523`に送信されたトランザクションを探すことで、トランザクションを検索することもできます。

トランザクションを見つけたら、txハッシュを選択して詳細を表示します。次のようなビューが表示されるはずです。

![メンプールウォッチャーのスクリーンショット](./mempool.png)

そこから、赤丸で囲まれたアイコンをクリックすると、Etherscanでトランザクションを表示できます！

**やりました！Alchemyを使用して初めてのイーサリアムのトランザクションを送信しました 🎉**

_このガイドに関するフィードバックや提案については、Alchemyの[ディスコード](https://discord.gg/A39JVCM)でElanにメッセージを送ってください！_

_元々はAlchemyによって公開されました。_
