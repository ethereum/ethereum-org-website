---
title: IPFSを利用した分散型ユーザーインターフェース
description: このチュートリアルでは、dappのユーザーインターフェースを保存するためにIPFSを使用する方法を学びます。 アプリケーションのデータとビジネスロジックは分散化されていますが、検閲耐性のあるユーザーインターフェースがなければ、ユーザーはいずれにせよそれにアクセスできなくなる可能性があります。
author: Ori Pomerantz
tags: [ "ipfs" ]
skill: beginner
lang: ja
published: 2024-06-29
---

あなたは素晴らしい新しいdappを作成しました。 そのための[ユーザーインターフェース](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)も作成しました。 しかし、あなたのユーザーインターフェースはクラウド上の1つのサーバーにすぎず、誰かがそれを停止させて検閲しようとすることを恐れています。 このチュートリアルでは、ユーザーインターフェースを\*\*[Interplanetary File System (IPFS)](https://ipfs.tech/developers/)\*\*上に置くことで検閲を回避する方法を学びます。そうすれば、関心のある誰もが将来のアクセスのためにサーバーにそれをピン留めできるようになります。

[Fleek](https://resources.fleek.xyz/docs/)などのサードパーティサービスを使用して、すべての作業を行うこともできます。 このチュートリアルは、たとえ作業量が増えても、自分たちが何をしているのかを十分に理解したい人向けです。

## ローカルでの開始 {#getting-started-locally}

複数の[サードパーティIPFSプロバイダー](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service)がありますが、テストのためにローカルでIPFSを実行することから始めるのが最善です。

1. [IPFSユーザーインターフェース](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions)をインストールします。

2. Webサイトのディレクトリを作成します。 [Vite](https://vite.dev/)を使用している場合は、次のコマンドを使用します。

   ```sh
   pnpm vite build
   ```

3. IPFS Desktopで、**[インポート] > [フォルダー]** をクリックし、前の手順で作成したディレクトリを選択します。

4. アップロードしたばかりのフォルダを選択し、**[名前の変更]** をクリックします。 より意味のある名前を付けます。

5. もう一度選択し、**[リンクを共有]** をクリックします。 URLをクリップボードにコピーします。 `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ` のようなリンクになります。

6. **[ステータス]** をクリックします。 **[詳細設定]** タブを展開してゲートウェイアドレスを表示します。 例えば、私のシステムではアドレスは `http://127.0.0.1:8080` です。

7. リンク手順のパスとゲートウェイアドレスを組み合わせて、あなたのアドレスを見つけます。 例えば、上記の例では、URLは `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ` です。 そのURLをブラウザで開いて、あなたのサイトを表示します。

## アップロード {#uploading}

これでIPFSを使ってローカルでファイルを提供できるようになりましたが、これはあまりエキサイティングなことではありません。 次のステップは、あなたがオフラインのときに世界中から利用できるようにすることです。

よく知られている[ピニングサービス](https://docs.ipfs.tech/concepts/persistence/#pinning-services)がいくつかあります。 そのうちの1つを選びます。 どのサービスを使用するにしても、アカウントを作成し、IPFSデスクトップの**コンテンツ識別子 (CID)** を提供する必要があります。

個人的には、[4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) が最も使いやすいと思いました。 その手順は次のとおりです。

1. [ダッシュボード](https://dashboard.4everland.org/overview)にアクセスし、ウォレットでログインします。

2. 左のサイドバーで **[ストレージ] > [4EVER Pin]** をクリックします。

3. **[アップロード] > [Selected CID]** をクリックします。 コンテンツに名前を付け、IPFSデスクトップからCIDを提供します。 現在、CIDは`Qm`で始まり、`QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`のように[base-58でエンコード](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524)されたハッシュを表す44文字の英数字が続く文字列ですが、[これは変更される可能性](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1)があります。

4. 初期ステータスは**Queued**です。 **Pinned**に変わるまでリロードします。

5. CIDをクリックしてリンクを取得します。 私のアプリケーションは[こちら](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im/)でご覧いただけます。

6. 1か月以上ピン留めするには、アカウントを有効化する必要があるかもしれません。 アカウントの有効化には約1ドルかかります。 閉じてしまった場合は、ログアウトしてから再度ログインすると、再び有効化を求められます。

## IPFSからの使用 {#using-from-ipfs}

この時点で、あなたはIPFSコンテンツを提供する中央集権型のゲートウェイへのリンクを持っています。 要するに、あなたのユーザーインターフェースは少し安全になったかもしれませんが、まだ検閲耐性はありません。 真の検閲耐性を得るには、ユーザーはIPFSを[ブラウザから直接](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites)使用する必要があります。

それがインストールされ(そしてデスクトップIPFSが動作していれば)、任意のサイトで[/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im)にアクセスすると、そのコンテンツが分散型の方法で提供されます。

## 欠点 {#drawbacks}

IPFSファイルを確実に削除することはできないため、ユーザーインターフェースを変更している間は、中央集権型のままにするか、IPFS上で可変性を提供するシステムである[Interplanetary Name System (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs)を使用するのがおそらく最善です。 もちろん、可変なものは検閲される可能性があります。IPNSの場合は、それに対応する秘密鍵を持つ人物に圧力をかけることで検閲されます。

さらに、一部のパッケージはIPFSとの間に問題を抱えているため、あなたのWebサイトが非常に複雑な場合、これは良い解決策ではないかもしれません。 そしてもちろん、サーバーとの統合に依存するものは、クライアントサイドをIPFSに置くだけでは分散化できません。

## 結論 {#conclusion}

イーサリアムがdappのデータベースとビジネスロジックの側面を分散化できるように、IPFSはユーザーインターフェースを分散化できるようにします。 これにより、あなたのdappに対するもう一つの攻撃ベクトルを遮断できます。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).
