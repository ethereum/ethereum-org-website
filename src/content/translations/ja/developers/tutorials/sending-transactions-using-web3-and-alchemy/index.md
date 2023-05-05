---
title: Web3を使用してトランザクションを送信する
description: "この初心者向けガイドでは、Web3を使用してイーサリアムトランザクションを送信する方法を説明します。 イーサリアムブロックチェーンにトランザクションを送信するには、作成、署名、およびブロードキャストの3つの主な手順があります。 これら3つをすべて確認します。"
author: "Elan Halpern"
tags:
  - "トランザクション"
  - "web3.js"
  - "Alchemy"
skill: beginner
lang: ja
published: 2020-11-04
source: Alchemy ドキュメント
sourceUrl: https://docs.alchemy.com/alchemy/tutorials/sending-txs
---

このガイドでは、初心者向けに、Web3 を使ってイーサリアムのトランザクションを送信する方法を学びます。 イーサリアムのブロックチェーンでは、作成、署名、およびブロードキャストという主に 3 つのステップを通じてトランザクションを送信します。 これら 3 つのステップを説明することで、皆さんの疑問が氷解することを願っています！ 以下のチュートリアルでは、 [Alchemy](https://www.alchemy.com/)を使って、イーサリアムチェーンにトランザクションを送信します。 [こちらで、Alchemy の無料アカウントを作成してください](https://auth.alchemyapi.io/signup) 。

**注意：** このガイドでは、アプリの _バックエンド_ におけるトランザクションの署名について扱っています。 フロントエンドでトランザクションの署名を統合したい場合は、 [Web3 とブラウザプロバイダ](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider)の連携を確認してください。

## 基本事項 {#the-basics}

ブロックチェーンの開発を始めたばかりの皆さんは、トランザクションの送信（ごくシンプルな操作であるはずです）についてリサーチをした結果、ありとあらゆるガイドに遭遇し、それぞれが違うことを述べているために、圧倒され、混乱してしまったかもしれません。 今のあなたがそうだとしても、心配は要りません。誰しもその経験があるのです！ それではまず、いくつかの基本的な事項を確認しておきましょう：

### 1. Alchemy は、あなたの秘密鍵を保存しません {#alchemy-does-not-store-your-private-keys}

- 言い換えれば、Alchemy はあなたの代理として署名やトランザクションの送信を実行できません。 これは、セキュリティ保護のための仕様です。 Alchemy があなたの秘密鍵を入力するように要求することはありませんので、ホスティングされたノード（あるいは、あらゆる他人）に対して、あなたの秘密鍵を教えないでください。
- Alchemy のコア API を使ってブロックチェーンから読み込むことは可能ですが、ブロックチェーンに書き出すためには、Alchemy を通じてトランザクションを送信する事前に、他のユーザーがあなたのトランザクションに署名する必要があります（これは、その他すべての[ノード向けサービス](/developers/docs/nodes-and-clients/nodes-as-a-service/)の場合も同様です）。

### 2. 「署名者」とは何か {#what-is-a-signer}

- 署名者とは、あなたの秘密鍵を用いて、あなたのためにトランザクションに署名するユーザーです。 このチュートリアルでは、トランザクションの署名に [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)を使用しますが、他の web3 ライブラリも使用できます。
- フロントエンドにおける署名者の例としては、[MetaMask](https://metamask.io/)が挙げられます。MetaMask は、あなたの代理としてトランザクションに署名して送信します。

### 3. 私のトランザクションに署名が必要なのはなぜですか？ {#why-do-i-need-to-sign-my-transactions}

- イーサリアムのネットワーク上でトランザクションを送信したいユーザーは、トランザクションの送信元が本人であることを証明するために、常に（秘密鍵を用いて）トランザクションに署名する必要があります。
- この秘密鍵は、あなたのイーサリアムアカウントに対する完全な管理権限を与え、あなた（あるいはアクセス権限を持つすべてのユーザー）に対して、あなたの代理としてトランザクションを実行することを許可するものですから、厳重に保護することが非常に重要です。

### 4. 秘密鍵を保護するには、どうすればよいですか？ {#how-do-i-protect-my-private-key}

- 秘密鍵の保護や、トランザクションの送信のために秘密鍵を使用するには、多くの方法があります。 このチュートリアルでは、 `.env` ファイルを使用します。 この他にも、秘密鍵を保存するために別のプロバイダーを利用したり、キーストア・ファイルを活用するなど、様々なオプションがあります。

### 5. `eth_sendTransaction` と `eth_sendRawTransaction` の違いは何ですか？ {#difference-between-send-and-send-raw}

`eth_sendTransaction`と `eth_sendRawTransaction`はどちらも、トランザクションをイーサリアムのネットワークにブロードキャストし、将来のブロックに追加するためのイーサリアム API の関数です。 ただし、トランザクションの署名については、以下のような違いがあります：

- [`eth_sendTransaction`](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#eth-sendtransaction)は、 *未署名*のトランザクションを送信するために使用します。 つまり、送信先のノードがあなたの秘密鍵を管理し、チェーンに対してブロードキャストする前にトランザクションに署名する必要があります。 Alchemy はユーザーの秘密鍵を保持しないため、このメソッドはサポートしていません。
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction)はすでに署名済みのトランザクションをブロードキャストするために使用されます。 これは最初に [`signTransaction(tx, private_key)`](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#signtransaction)を使用し、 `eth_sendRawTransaction` に結果を渡すことを意味します。

Web3 を使用する場合、 `eth_sendRawTransaction`は [web3.eth.sendSignedTransaction](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#sendsignedtransaction)の関数を呼び出すことでアクセスできます。

このチュートリアルでは、これを使用します。

### 6. Web3 ライブラリとは? {#what-is-the-web3-library}

- Web3.js は、イーサリアム開発で非常に一般的に使用される、標準的な JSON-RPC 呼び出しのラッパーライブラリです。
- さまざまな言語に対応した数多くの web3 ライブラリが提供されています。 このチュートリアルでは、JavaScript で書かれた[Alchemy Web3](https://docs.alchemy.com/reference/api-overview)を使用します。 他の選択肢については、[こちら](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)をご覧ください。

さて、これらの疑問が解消できたところで、さっそくチュートリアルを始めましょう。 疑問があれば、Alchemy [discord](https://discord.gg/gWuC7zB)で気軽に質問してください。

**注意：**このチュートリアルには、Alchemy アカウント、イーサリアムアドレスまたは MetaMask ウォレット、NodeJs、および npm のインストールが必要です。 インストールが完了していない場合は、以下の手順で行ってください：

1.  [無料の Alchemy アカウントを作成する](https://auth.alchemyapi.io/signup)
2.  [MetaMask アカウントを作成する](https://metamask.io/)（またはイーサリアムアドレスを取得する）
3.  [次の手順に従って、Node.js と npm をインストールする](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## トランザクションを送信する手順 {#steps-to-sending-your-transaction}

### 1. Rinkeby テストネットで Alchemy アプリを作成する {#create-an-alchemy-app-on-the-rinkeby-testnet}

[Alchemy ダッシュボード](https://dashboard.alchemyapi.io/)に移動し、新規のアプリを作成し、ネットワークには Rinkeby（または他のテストネット）を選択します。

### 2. Rinkeby フォーセットに対し、ETH をリクエストする {#request-eth-from-rinkeby-faucet}

[Alchemy Rinkby フォーセット](https://www.rinkebyfaucet.com/)の指示に従って、ETH を受け取ってください。 リクエストには、他のネットワークのアドレスではなく、必ず **Rinkby**のイーサリアムアドレス（MetaMask から）を含めてください。 指示を実行した後、ウォレットに ETH が届いていることを再確認してください。

### 3. 新規のプロジェクトディレクトリを作成し、`cd`でディレクトリに移動します。 {#create-a-new-project-direction}

コマンドライン（Mac の場合はターミナル）で新規のプロジェクトディレクトリを作成し、このディレクトリに移動します：

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Alchemy Web3（または任意の web3 ライブラリ）をインストールする {#install-alchemy-web3}

プロジェクトディレクトリで次のコマンドを実行し、 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)をインストールします。

```
npm install @alch/alchemy-web3
```

### 5. dotenv をインストールする {#install-dotenv}

API キーと秘密鍵を安全に保存するために、`.env`ファイルを使用します。

```
npm install dotenv --save
```

### 6. `.env` ファイルを作成する {#create-the-dotenv-file}

プロジェクトディレクトリに`.env`ファイルを作成し、以下を追加します（"`your-api-url`" と "`your-private-key`"を置き換える）。

- Alchemy の API URL を見つけるには、ダッシュボードで作成したアプリの詳細ページに移動します。 右上隅の「VIEW KEY」をクリックし、HTTP URL を選択します。
- MetaMask を使って秘密鍵を見つけるには、こちらの[ガイド](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)をご覧ください。

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<InfoBanner isWarning={true}>
<code>.env</code>はコミットしないでください！ <code>.env</code>は決して他人と共有したり、公開したりしないように注意してください。共有することで、あなたのアカウント情報が漏洩する可能性があります。 バージョンを管理する場合は、<code>.env</code>を<a href="https://git-scm.com/docs/gitignore">gitignore</a>ファイルに追加してください。
</InfoBanner>

### 7. `sendTx.js` ファイルを作成する {#create-sendtx-js}

機密データが `.env`ファイルで保護されたので、さっそくコード作成を始めましょう。 送信トランザクションの例として、ETH を Rinkeby フォーセットに送り返します。

トランザクションの設定と送信を行う`sendTx.js`ファイルを作成し、その中に以下のコードを追加してください。

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: replace this address with your own public address

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // faucet address to return eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
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

**6 行目**のアドレスは、あなたの公開アドレスに置き換えてください。

さて、このコードを実行する前に、ここでいくつかのコンポーネントについて説明しましょう。

- `nonce` : ノンス仕様は、あなたのアドレスから送信されたトランザクション数を追跡するために使用されます。 これは、セキュリティ保護ならびに[リプレイ攻撃](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)の防止に必要です。 あなたのアドレスから送信されたトランザクションの数を取得するには、 [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)を使用します。
- `transaction`: トランザクションオブジェクトには指定する必要があるいくつかの側面があります
  - `to`: ETH の送信先アドレスです。 この場合、最初にリクエストした[Rinkeby フォーセット](https://faucet.rinkeby.io/)に ETH を送り返します。
  - `value`: Wei（10^18 Wei = 1 ETH）で指定した送金額です。
  - `gas`: トランザクションに含まれる適切なガス量を決定する方法はたくさんあります。 Alchemy には [ガス価格ウェブフック](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) が含まれているので、ガス価格が一定のしきい値に達すると、警告が送信されます。 メインネット上のトランザクションの場合、[ETH ガスステーション](https://ethgasstation.info/)などのガス推定値をチェックして、トランザクションに含める適切なガス量を決定することをお勧めします。 イーサリアムの操作に必要なガスの最小量は 21000 なので、トランザクションが確実に実行されるように、ここでは 30000 としておきます。
  - `nonce`: 上記のノンスの定義を参照してください。 ノンスは、0 から開始されます。
  - [OPTIONAL] data: 送金やスマートコントラクトの呼び出しにおいて追加情報を送信するために使用します。残高を送信する場合は必要ありません。以下の注記を確認してください。
- `signedTx`: トランザクションオブジェクトへの署名には、 `PRIVATE_KEY`を伴う`signTransaction`メソッドを使用します。
- `sendSignedTransaction`: トランザクションの署名を取得したら、`sendSignedTransaction`を使って、次のブロックに含まれるように送信できるようになります。

**data に関するメモ**： イーサリアムで送信できるトランザクションは主に 2 種類あります。

- 残高転送：あるアドレスから別のアドレスに ETH を送信します。 data フィールドは必要ありませんが、トランザクションと一緒に追加の情報を送信したい場合はこのフィールドに HEX 形式で入力してください。
  - 例えば、 不変のタイムスタンプを与えるために、IPFS 文書のハッシュをイーサリアムチェーンに記録したい場合を考えてみましょう。 data フィールドは、data: `web3.utils.toHex(‘IPFSハッシュ‘)` のようになります。 これにより、誰でもチェーンをクエリして、このドキュメントがいつ追加されたかを確認できるようになります。
- スマートコントラクトのトランザクション：チェーン上でスマートコントラクトコードを実行します。 この場合、data フィールドは、パラメータとと共に実行したいスマート関数を含む必要があります。
  - 実例については、[Hello World Tutorial](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction)のステップ 8 を参照してください。

### 8. `node sendTx.js`を使用してコードを実行する {#run-the-code-using-node-sendtx-js}

ターミナルまたはコマンドラインに戻り、以下を実行します。

```
node sendTx.js
```

### 9. 取引プールでトランザクションを確認する {#see-your-transaction-in-the-mempool}

Alchemy ダッシュボードの[取引プールのページ](https://dashboard.alchemyapi.io/mempool) を開き、作成したアプリで絞り込み、取引を検索します。 ここでは、トランザクション処理が保留中の状態からマイニングされた状態（成功した場合）あるいはドロップした状態（失敗した場合）に遷移するのを確認できます。 「All」の設定を変更せず、「マイニング済み」、「保留中」、および「ドロップ」のトランザクションをすべて捕捉できるようにしておきます。 また、アドレス `0x31b98d14007bdee637298086988a0bbd31184523`に送信されたトランザクションを確認する方法でもあなたのトランザクションを検索できます。

あなたのトランザクションを見つけたら、当該の tx ハッシュを選択してトランザクションの詳細を確認します。以下のようなビューが表示されるはずです：

![Mempool watcherのスクリーンショット](./mempool.png)

赤い丸印で囲まれたアイコンをクリックすると、Etherscan 上でトランザクションを確認できます！

**やりましたね！ Alchemy を使用して、最初のイーサリアムトランザクションの送信に成功しました 🎉**

_このガイドに対するフィードバックや提案については、Alchemy の[Discord](https://discord.gg/A39JVCM)から Elan にメッセージを送ってください！_

_原文は、 [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)で公開されています。_
