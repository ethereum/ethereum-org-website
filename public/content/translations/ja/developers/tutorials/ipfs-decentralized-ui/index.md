---
title: 分散型ユーザーインターフェースのためのIPFS
description: このチュートリアルでは、IPFSを使用してdappのユーザーインターフェースを保存する方法を説明します。アプリケーションのデータとビジネスロジックが分散化されていても、検閲耐性のあるユーザーインターフェースがなければ、ユーザーはアクセスを失う可能性があります。
author: オリ・ポメランツ
tags: ["ipfs", "dapps", "フロントエンド"]
skill: beginner
breadcrumb: dapp UIのためのIPFS
lang: ja
published: 2024-06-29
---

あなたは素晴らしい新しい分散型アプリケーション (dapp) を作成しました。そのための[ユーザーインターフェース](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)も作成しました。しかし今、クラウド上の1つのサーバーにすぎないユーザーインターフェースをダウンさせることで、誰かがそれを検閲しようとするのではないかと心配しています。このチュートリアルでは、ユーザーインターフェースを**[IPFS (InterPlanetary File System)](https://ipfs.tech/developers/)**に配置して検閲を回避し、興味のある人が将来のアクセスのためにサーバーにピン留めできるようにする方法を学びます。

[Fleek](https://resources.fleek.xyz/docs/)などのサードパーティサービスを使用して、すべての作業を行うこともできます。このチュートリアルは、手間がかかっても、自分が何をしているのかを理解できる程度に自分で作業したい人向けです。

## ローカルでの開始 {#getting-started-locally}

複数の[サードパーティのIPFSプロバイダー](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service)がありますが、テストのためにローカルでIPFSを実行することから始めるのが最善です。

1. [IPFSユーザーインターフェース](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions)をインストールします。

2. ウェブサイトのディレクトリを作成します。[Vite](https://vite.dev/)を使用している場合は、次のコマンドを使用します。

   ```sh
   pnpm vite build
   ```

3. IPFS Desktopで、**Import > Folder**をクリックし、前の手順で作成したディレクトリを選択します。

4. アップロードしたフォルダを選択し、**Rename**をクリックします。より意味のある名前を付けます。

5. もう一度選択し、**Share link**をクリックします。URLをクリップボードにコピーします。リンクは`https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`のようになります。

6. **Status**をクリックします。**Advanced**タブを展開して、ゲートウェイアドレスを確認します。たとえば、私のシステムではアドレスは`http://127.0.0.1:8080`です。

7. リンクの手順で取得したパスとゲートウェイアドレスを組み合わせて、自分のアドレスを見つけます。たとえば、上記の例の場合、URLは`http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`になります。ブラウザでそのURLを開いて、サイトを確認します。

## アップロード {#uploading}

これでIPFSを使用してローカルでファイルを提供できるようになりましたが、これだけではあまり面白くありません。次のステップは、オフラインのときでも世界中からアクセスできるようにすることです。

よく知られている[ピン留めサービス](https://docs.ipfs.tech/concepts/persistence/#pinning-services)がいくつかあります。そのうちの1つを選択してください。どのサービスを使用する場合でも、アカウントを作成し、IPFS Desktopにある**コンテンツ識別子 (CID)**を提供する必要があります。

個人的には、[4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides)が最も使いやすいと感じました。手順は次のとおりです。

1. [ダッシュボード](https://dashboard.4everland.org/overview)にアクセスし、ウォレットでログインします。

2. 左側のサイドバーで**Storage > 4EVER Pin**をクリックします。

3. **Upload > Selected CID**をクリックします。コンテンツに名前を付け、IPFS DesktopからCIDを提供します。現在、CIDは`Qm`で始まり、その後に`QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`のような[Base58エンコード](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524)されたハッシュを表す44文字の英数字が続く文字列ですが、[これは変更される可能性があります](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1)。

4. 初期ステータスは**Queued**です。**Pinned**に変わるまでリロードします。

5. CIDをクリックしてリンクを取得します。私のアプリケーションは[こちら](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/)で確認できます。

6. 1か月以上ピン留めするには、アカウントの有効化が必要になる場合があります。アカウントの有効化には約1ドルかかります。閉じてしまった場合は、ログアウトして再度ログインすると、再度有効化を求められます。

## IPFSからの使用 {#using-from-ipfs}

この時点で、IPFSコンテンツを提供する中央集権型ゲートウェイへのリンクが取得できました。つまり、ユーザーインターフェースは少し安全になったかもしれませんが、まだ検閲耐性はありません。真の検閲耐性を実現するには、ユーザーが[ブラウザから直接](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites)IPFSを使用する必要があります。

それをインストールし（そしてデスクトップ版IPFSが機能していれば）、任意のサイトで[/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im)にアクセスすると、分散型の方法で提供されるそのコンテンツを取得できます。

## 欠点 {#drawbacks}

IPFSファイルを確実に削除することはできないため、ユーザーインターフェースを変更している間は、中央集権型のままにしておくか、IPFS上で可変性を提供するシステムである[IPNS (InterPlanetary Name System)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs)を使用するのがおそらく最善です。もちろん、変更可能なものはすべて検閲される可能性があり、IPNSの場合は、対応する秘密鍵を持つ人に圧力をかけることで検閲される可能性があります。

さらに、一部のパッケージはIPFSで問題が発生するため、ウェブサイトが非常に複雑な場合、これは良い解決策ではないかもしれません。そしてもちろん、サーバー統合に依存するものは、クライアント側をIPFSに置くだけでは分散化できません。

## ENSによる発見可能性 {#discoverability}

ENS名（vitalik.ethなど）をウェブサイトに向けると、完全に分散化されたウェブページと見なされ、[dweb3.wtf](https://dweb3.wtf)サービスによって自動的にピン留めされます。また、従来のウェブにおけるDuckDuckGo、Brave Search、Googleのように、[web3compass.net](https://web3compass.net)検索エンジンを通じて検索可能になります。

## まとめ {#conclusion}

イーサリアムがdappのデータベースとビジネスロジックの側面を分散化できるようにするのと同様に、IPFSはユーザーインターフェースを分散化できるようにします。これにより、dappに対する攻撃ベクトルをもう1つ遮断できます。

[私の他の作品はこちらをご覧ください](https://cryptodocguy.pro/)。