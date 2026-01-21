---
title: Web3を使用してトランザクションを送信する
description: "この初心者向けガイドでは、Web3を使用してイーサリアムトランザクションを送信する方法を説明します。 イーサリアムのブロックチェーンでは、作成、署名、およびブロードキャストという主に3つのステップを通じてトランザクションを送信します。 これら3つをすべて確認します。"
author: "Elan Halpern"
tags: [ "トランザクション", "web3.js", "Alchemy" ]
skill: beginner
lang: ja
published: 2020-11-04
source: Alchemy ドキュメント
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

この初心者向けガイドでは、Web3を使用してイーサリアムトランザクションを送信する方法を説明します。 イーサリアムのブロックチェーンでは、作成、署名、およびブロードキャストという主に3つのステップを通じてトランザクションを送信します。 これら3つのステップを説明することで、皆さんの疑問が氷解することを願っています！ このチュートリアルでは、[Alchemy](https://www.alchemy.com/)を使用して、イーサリアムチェーンにトランザクションを送信します。 [こちら](https://auth.alchemyapi.io/signup)で無料のAlchemyアカウントを作成できます。

\*\*注意：\*\*このガイドは、アプリの_バックエンド_でトランザクションに署名するためのものです。 フロントエンドでトランザクションの署名を統合したい場合は、[Web3とブラウザプロバイダの連携](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider)をご確認ください。

## 基本 {#the-basics}

ブロックチェーンの開発を始めたばかりの皆さんは、トランザクションの送信（ごくシンプルな操作であるはずです）についてリサーチをした結果、ありとあらゆるガイドに遭遇し、それぞれが違うことを述べているために、圧倒され、混乱してしまったかもしれません。 今のあなたがそうだとしても、心配は要りません。誰しもその経験があるのです！ それではまず、いくつかの基本的な事項を確認しておきましょう：

### 1. Alchemyはあなたの秘密鍵を保存しません {#alchemy-does-not-store-your-private-keys}

- 言い換えれば、Alchemyはあなたの代理として署名やトランザクションの送信を実行できません。 これは、セキュリティ保護のための仕様です。 Alchemyがあなたの秘密鍵を入力するように要求することはありませんので、ホスティングされたノード（あるいは、あらゆる他人）に対して、あなたの秘密鍵を教えないでください。
- AlchemyのコアAPIを使ってブロックチェーンから読み込むことは可能ですが、ブロックチェーンに書き込むためには、Alchemyを通じてトランザクションを送信する前に、何か別のものを使ってトランザクションに署名する必要があります（これは、その他すべての[ノードサービス](/developers/docs/nodes-and-clients/nodes-as-a-service/)の場合も同様です）。

### 2. 「署名者」とは何か {#what-is-a-signer}

- 署名者とは、あなたの秘密鍵を用いて、あなたのためにトランザクションに署名するユーザーです。 このチュートリアルでは、トランザクションの署名に[Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)を使用しますが、他のweb3ライブラリも使用できます。
- フロントエンドにおける署名者の良い例は[MetaMask](https://metamask.io/)です。これはあなたの代理としてトランザクションに署名し、送信します。

### 3. 私のトランザクションに署名が必要なのはなぜですか？ {#why-do-i-need-to-sign-my-transactions}

- イーサリアムのネットワーク上でトランザクションを送信したいユーザーは、トランザクションの送信元が本人であることを証明するために、常に（秘密鍵を用いて）トランザクションに署名する必要があります。
- この秘密鍵は、あなたのイーサリアムアカウントに対する完全な管理権限を与え、あなた（あるいはアクセス権限を持つすべてのユーザー）に対して、あなたの代理としてトランザクションを実行することを許可するものですから、厳重に保護することが非常に重要です。

### 4. 秘密鍵を保護するには、どうすればよいですか？ {#how-do-i-protect-my-private-key}

- 秘密鍵の保護や、トランザクションの送信のために秘密鍵を使用するには、多くの方法があります。 このチュートリアルでは、`.env`ファイルを使用します。 この他にも、秘密鍵を保存するために別のプロバイダーを利用したり、キーストア・ファイルを活用するなど、様々なオプションがあります。

### 5. `eth_sendTransaction`と`eth_sendRawTransaction`の違いは何ですか？ {#difference-between-send-and-send-raw}

`eth_sendTransaction`と`eth_sendRawTransaction`はどちらも、トランザクションをイーサリアムのネットワークにブロードキャストし、将来のブロックに追加するためのイーサリアムAPIの関数です。 ただし、トランザクションの署名については、以下のような違いがあります：

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction)は、_未署名_のトランザクションを送信するために使用します。これは、送信先のノードがあなたの秘密鍵を管理し、チェーンにブロードキャストする前にトランザクションに署名する必要があることを意味します。 Alchemyはユーザーの秘密鍵を保持しないため、このメソッドはサポートしていません。
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction)は、すでに署名されたトランザクションをブロードキャストするために使用されます。 これは、最初に[`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction)を使用し、その結果を`eth_sendRawTransaction`に渡す必要があることを意味します。

web3を使用する場合、`eth_sendRawTransaction`には[web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction)関数を呼び出すことでアクセスします。

このチュートリアルでは、これを使用します。

### 6. Web3ライブラリとは？ {#what-is-the-web3-library}

- Web3.jsは、イーサリアム開発で非常に一般的に使用される、標準的なJSON-RPC呼び出しのラッパーライブラリです。
- さまざまな言語に対応した数多くのweb3ライブラリが提供されています。 このチュートリアルでは、JavaScriptで書かれた[Alchemy Web3](https://docs.alchemy.com/reference/api-overview)を使用します。 [ethers.js](https://docs.ethers.org/v5/)のような他の選択肢については[こちら](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)を確認できます。

さて、これらの疑問が解消できたところで、さっそくチュートリアルを始めましょう。 Alchemyの[discord](https://discord.gg/gWuC7zB)でいつでも気軽に質問してください！

### 7. 安全でガス最適化されたプライベートなトランザクションを送信する方法は？ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [AlchemyにはTransact APIスイートがあります](https://docs.alchemy.com/reference/transact-api-quickstart)。 これにより、強化されたトランザクションの送信、トランザクションが発生する前のシミュレーション、プライベートなトランザクションの送信、ガス最適化されたトランザクションの送信が可能です。
- また、[Notify API](https://docs.alchemy.com/docs/alchemy-notify)を使用して、トランザクションがメンプールから取得されチェーンに追加されたときにアラートを受け取ることもできます。

\*\*注意：\*\*このガイドには、Alchemyアカウント、イーサリアムアドレスまたはMetaMaskウォレット、NodeJs、およびnpmのインストールが必要です。 インストールが完了していない場合は、以下の手順で行ってください：

1. [無料のAlchemyアカウントを作成](https://auth.alchemyapi.io/signup)
2. [MetaMaskアカウントを作成する](https://metamask.io/)（またはイーサリアムアドレスを取得する）
3. [こちらの手順に従ってNodeJsとNPMをインストールしてください](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## トランザクションを送信する手順 {#steps-to-sending-your-transaction}

### 1. SepoliaテストネットでAlchemyアプリを作成する {#create-an-alchemy-app-on-the-sepolia-testnet}

[Alchemyダッシュボード](https://dashboard.alchemyapi.io/)に移動し、新規アプリを作成します。ネットワークにはSepolia（または他のテストネット）を選択してください。

### 2. SepoliaフォーセットからETHをリクエストする {#request-eth-from-sepolia-faucet}

[Alchemy Sepoliaフォーセット](https://www.sepoliafaucet.com/)の指示に従って、ETHを受け取ってください。 リクエストには、他のネットワークのアドレスではなく、必ず**Sepolia**のイーサリアムアドレス（MetaMaskから）を含めてください。 指示を実行した後、ウォレットにETHが届いていることを再確認してください。

### 3. 新規プロジェクトディレクトリを作成し、`cd`で移動する {#create-a-new-project-direction}

コマンドライン（Macの場合はターミナル）で新規のプロジェクトディレクトリを作成し、このディレクトリに移動します：

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Alchemy Web3（または任意のweb3ライブラリ）をインストールする {#install-alchemy-web3}

プロジェクトディレクトリで以下のコマンドを実行し、[Alchemy Web3](https://docs.alchemy.com/reference/api-overview)をインストールしてください：

注：ethers.jsライブラリを使用したい場合は、[こちらの指示に従ってください](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum)。

```
npm install @alch/alchemy-web3
```

### 5. dotenvをインストールする {#install-dotenv}

APIキーと秘密鍵を安全に保存するために、.envファイルを使用します。

```
npm install dotenv --save
```

### 6. `.env`ファイルを作成する {#create-the-dotenv-file}

プロジェクトディレクトリに`.env`ファイルを作成し、以下を追加してください（“`your-api-url`”と“`your-private-key`”を置き換えます）

- AlchemyのAPI URLを見つけるには、ダッシュボードで作成したアプリの詳細ページに移動します。右上隅の「View Key」をクリックし、HTTP URLを選択します。
- MetaMaskを使用して秘密鍵を見つけるには、この[ガイド](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)をご覧ください。

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code>はコミットしないでください！ <code>.env</code>は決して他人と共有したり、公開したりしないように注意してください。共有することで、あなたのアカウント情報が漏洩する可能性があります。 バージョンを管理する場合は、<code>.env</code>を<a href="https://git-scm.com/docs/gitignore">gitignore</a>ファイルに追加してください。
</AlertDescription>
</AlertContent>
</Alert>

### 7. `sendTx.js`ファイルを作成する {#create-sendtx-js}

機密データが.envファイルで保護されたので、さっそくコード作成を始めましょう。 送信トランザクションの例として、ETHをSepoliaフォーセットに送り返します。

トランザクションの設定と送信を行う`sendTx.js`ファイルを作成し、その中に以下のコードを追加してください。

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: このアドレスをあなた自身の公開アドレスに置き換えてください

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonceは0からカウントを始めます

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // ETHを返却するフォーセットのアドレス
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // メッセージの送信やスマートコントラクトを実行するためのオプションのデータフィールド
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 トランザクションのハッシュは次の通りです: ", hash, "\n AlchemyのMempoolでトランザクションのステータスを確認してください！");
    } else {
      console.log("❗トランザクションの送信中に問題が発生しました:", error)
    }
   });
}

main();
```

**6行目**のアドレスは、あなたの公開アドレスに置き換えてください。

さて、このコードを実行する前に、ここでいくつかのコンポーネントについて説明しましょう。

- `nonce`: ノンス仕様は、あなたのアドレスから送信されたトランザクション数を追跡するために使用されます。 これはセキュリティ目的、および[リプレイ攻撃](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)を防ぐために必要です。 アドレスから送信されたトランザクション数を取得するには、[getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)を使用します。
- `transaction`: トランザクションオブジェクトには指定する必要があるいくつかの側面があります
  - `to`: ETHの送信先アドレスです。 この場合、最初にリクエストした[Sepoliaフォーセット](https://sepoliafaucet.com/)にETHを送り返します。
  - `value`: Wei（10^18 Wei = 1 ETH）で指定した送金額です。
  - `gas`: トランザクションに含まれる適切なガス量を決定する方法はたくさんあります。 Alchemyには、ガス価格が特定のしきい値内に下がったときに通知する[ガス価格ウェブフック](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1)さえあります。 メインネット上のトランザクションの場合、[ETH Gas Station](https://ethgasstation.info/)などのガス推定ツールをチェックして、含めるべき適切なガス量を決定することをお勧めします。 イーサリアムの操作に必要なガスの最小量は21000なので、トランザクションが確実に実行されるように、ここでは30000としておきます。
  - `nonce`: 上記のノンスの定義を参照してください。 ノンスは、0から開始されます。
  - [任意] data: 送金やスマートコントラクトの呼び出しにおいて追加情報を送信するために使用します。残高転送の場合は必要ありません。以下の注記を確認してください。
- `signedTx`: トランザクションオブジェクトへの署名には、`PRIVATE_KEY`を伴う`signTransaction`メソッドを使用します。
- `sendSignedTransaction`: トランザクションの署名を取得したら、`sendSignedTransaction`を使って、次のブロックに含まれるように送信できるようになります。

**dataに関するメモ**
イーサリアムで送信できるトランザクションは主に2種類あります。

- 残高転送：あるアドレスから別のアドレスにETHを送信します。 dataフィールドは必要ありませんが、トランザクションと一緒に追加の情報を送信したい場合はこのフィールドにHEX形式で入力してください。
  - 例えば、不変のタイムスタンプを与えるために、IPFS文書のハッシュをイーサリアムチェーンに記録したい場合を考えてみましょう。 その場合、dataフィールドはdata: `web3.utils.toHex(‘IPFS hash‘)`のようになります。 これにより、誰でもチェーンをクエリして、このドキュメントがいつ追加されたかを確認できるようになります。
- スマートコントラクトのトランザクション：チェーン上でスマートコントラクトコードを実行します。 この場合、dataフィールドは、パラメータと共に実行したいスマート関数を含む必要があります。
  - 実践的な例については、この[Hello Worldチュートリアル](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction)のステップ8をご覧ください。

### 8. `node sendTx.js`を使用してコードを実行する {#run-the-code-using-node-sendtx-js}

ターミナルまたはコマンドラインに戻り、以下を実行します。

```
node sendTx.js
```

### 9. メンプールでトランザクションを確認する {#see-your-transaction-in-the-mempool}

Alchemyダッシュボードの[メンプールページ](https://dashboard.alchemyapi.io/mempool)を開き、作成したアプリでフィルタリングしてトランザクションを見つけます。 ここでは、トランザクション処理が保留中の状態からマイニングされた状態（成功した場合）あるいはドロップした状態（失敗した場合）に遷移するのを確認できます。 「All」の設定を変更せず、「マイニング済み」、「保留中」、および「ドロップ」のトランザクションをすべて捕捉できるようにしておきます。 また、アドレス`0x31b98d14007bdee637298086988a0bbd31184523`に送信されたトランザクションを確認する方法でもあなたのトランザクションを検索できます。

あなたのトランザクションを見つけたら、当該のtxハッシュを選択してトランザクションの詳細を確認します。以下のようなビューが表示されるはずです：

![メンプールウォッチャーのスクリーンショット](./mempool.png)

赤い丸印で囲まれたアイコンをクリックすると、Etherscan上でトランザクションを確認できます！

**やりましたね！** **Alchemyを使用して、最初のイーサリアムトランザクションの送信に成功しました🎉**

_このガイドに関するフィードバックやご提案は、Alchemyの[Discord](https://discord.gg/A39JVCM)でElanにメッセージをお送りください！_

_初出: [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
