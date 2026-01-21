---
title: "非代替性トークン(NFT)ミンターチュートリアル"
description: "このチュートリアルでは、非代替性トークン(NFT)ミンターを構築します。さらに、スマートコントラクトをMetaMaskやWeb3ツールを使用して、Reactフロントエンドへ接続することでフルスタック分散型アプリケーション(Dapp)を作成する方法を学びます。"
author: "smudgil"
tags:
  [
    "Solidity",
    "NFT",
    "Alchemy",
    "スマート契約",
    "フロントエンド",
    "Pinata"
  ]
skill: intermediate
lang: ja
published: 2021-10-06
---

Web2のバックグラウンドを持つデベロッパーの最大の課題の1つは、スマートコントラクトをフロントエンドのプロジェクトに接続し、やり取りを行う方法を理解することです。

ここでは、デジタル資産へのリンク、タイトル、説明を入力できるシンプルなUIを備えた非代替性トークン(NFT)ミンターを構築することで、次の方法を学びます。

- フロントエンドのプロジェクト経由でMetaMaskに接続する
- フロントエンドからスマートコントラクトメソッドを呼び出す
- MetaMaskを使用してトランザクションに署名する

このチュートリアルでは、[React](https://react.dev/)をフロントエンドフレームワークとして使用します。 このチュートリアルはWeb3開発に焦点を当てているので、Reactの基礎についての説明に多くの時間を費やせません。 代わりに、プロジェクトの機能性を高めることに注力します。

前提条件として、Reactに関する初級レベルの知識を有している必要があります。つまり、コンポーネント、プロパティ(props)、useStateおよびuseEffect、基本関数の呼び出しなどの仕組みを理解している必要があります。 これらの用語をこれまで聞いたことがない場合は、こちらの[React入門チュートリアル](https://react.dev/learn/tutorial-tic-tac-toe)をご覧ください。 視覚的な学習を好む方には、Net Ninjaによるこの素晴らしい[フルモダンReactチュートリアル](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)のビデオシリーズを強くお勧めします。

まだAlchemyアカウントをお持ちでない場合、このチュートリアルを完了したり、ブロックチェーンで何かを構築したりするために必ず必要になりますので、 [こちら](https://alchemy.com/)から無料アカウントにサインアップしてください。

それでは、さっそく始めましょう！

## NFT作成の基礎 {#making-nfts-101}

コードを見始める前に、非代替性トークン(NFT)作成の仕組みを理解することが重要です。 それには、次の2つのステップがあります。

### Ethereumブロックチェーン上にNFTスマートコントラクトを公開する {#publish-nft}

ERC-1155とERC-721の2つのスマートコントラクト規格の最大の違いは、ERC-1155はマルチトークン規格でありバッチ機能を備えているのに対し、ERC-721はシングルトークン規格であり一度に1つのトークンの送信しかサポートしていないことです。

### ミント関数を呼び出す {#minting-function}

通常、このミント関数では、パラメータとして2つの変数を渡す必要があります。1つ目は、新しくミントされたNFTを受け取るアドレスを指定する`recipient`で、2つ目は、NFTのメタデータを記述するJSONドキュメントに解決される文字列であるNFTの`tokenURI`です。

非代替性トークン(NFT)のメタデータは、非代替性トークン(NFT)に名前、説明、画像(または別のデジタル資産)、その他の属性などのプロパティを持たせ、非代替性トークン(NFT)を利用できるようにします。 NFTのメタデータを含む[tokenURIの例](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)はこちらです。

このチュートリアルでは、React UIを使用して既存の非代替性トークン(NFT)のスマートコントラクトのミント関数を呼び出すパート2(後半)の方に焦点を当てています。

このチュートリアルで呼び出すERC-721 NFTスマートコントラクトへの[リンクはこちら](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)です。 その作成方法を学びたい場合は、もう一つのチュートリアル["NFTの作成方法"](https://www.alchemy.com/docs/how-to-create-an-nft)をご覧になることを強くお勧めします。

非代替性トークン(NFT)作成の仕組みを理解したところで、スターターファイルをクローンしましょう。

## スターターファイルをクローンする {#clone-the-starter-files}

まず、[nft-minter-tutorialのGitHubリポジトリ](https://github.com/alchemyplatform/nft-minter-tutorial)にアクセスして、このプロジェクトのスターターファイルを入手します。 このリポジトリをローカル環境にクローンします。

このクローンされた`nft-minter-tutorial`リポジトリを開くと、`minter-starter-files`と`nft-minter`という2つのフォルダが含まれていることがわかります。

- `minter-starter-files`には、このプロジェクトのスターターファイル(本質的にはReactのUI)が含まれています。 このチュートリアルでは、EthereumウォレットとNFTスマートコントラクトに接続してこのUIを有効にする方法を学ぶため、**このディレクトリで作業します**。
- `nft-minter`には完成したチュートリアル全体が含まれており、行き詰まった場合に**参照**として利用できます。

次に、コードエディタで`minter-starter-files`のコピーを開き、`src`フォルダに移動します。

私たちが書くコードはすべて`src`フォルダの下に置かれます。 `Minter.js`コンポーネントを編集し、追加のjavascriptファイルを記述して、プロジェクトにWeb3機能を与えます。

## ステップ2: スターターファイルを確認する {#step-2-check-out-our-starter-files}

コーディングを始める前に、スターターファイルで既に提供されるものを確認することが重要です。

### Reactプロジェクトを実行する {#get-your-react-project-running}

まずは、ブラウザでReactプロジェクトを実行しましょう。 Reactの素晴らしいところは、一度ブラウザでプロジェクトを実行すると、保存した変更がブラウザでも同時に更新されることです。

プロジェクトを実行するには、`minter-starter-files`フォルダのルートディレクトリに移動し、ターミナルで`npm install`を実行してプロジェクトの依存関係をインストールします:

```bash
cd minter-starter-files
npm install
```

インストールが完了したら、ターミナルで`npm start`を実行します:

```bash
npm start
```

これにより、ブラウザでhttp://localhost:3000/が開き、プロジェクトのフロントエンドが表示されます。 フロントエンドは3つのフィールドで構成されており、それぞれ、非代替性トークン(NFT)資産へのリンク、非代替性トークン(NFT)の名前、非代替性トークン(NFT)の説明を入力する場所になっています。

「Connect Wallet」や「Mint NFT」ボタンをクリックしても、動作しません。これらの機能は、これからプログラムする必要があります。 :​)

### Minter.jsコンポーネント {#minter-js}

**注:** `nft-minter`フォルダではなく、`minter-starter-files`フォルダにいることを確認してください。

エディタで`src`フォルダに戻り、`Minter.js`ファイルを開きましょう。 このファイルには、これから作業を進めていく主要なReactコンポーネントが含まれています。すべての内容を理解することが非常に重要です。

このファイルの上部には、特定のイベントの後に更新される状態変数(State Variable)があります。

```javascript
//状態変数
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Reactの状態変数や状態フック(State Hook)を聞いたことがない場合は、 [こちらの](https://legacy.reactjs.org/docs/hooks-state.html)ドキュメントをご覧ください。

それぞれの変数は以下を示します。

- `walletAddress` - ユーザーのウォレットアドレスを格納する文字列
- `status` - UIの下部に表示するメッセージを含む文字列
- `name` - NFTの名前を格納する文字列
- `description` - NFTの説明を格納する文字列
- `url` - NFTのデジタル資産へのリンクである文字列

状態変数の後には、`useEffect`、`connectWalletPressed`、`onMintPressed`という3つの未実装の関数があります。 これらの関数はすべて`async`であることにお気づきでしょう。これは、これらの関数内で非同期API呼び出しを行うためです。 それぞれの関数の名前は、その機能を示しています。

```javascript
useEffect(async () => {
  //TODO: 実装
}, [])

const connectWalletPressed = async () => {
  //TODO: 実装
}

const onMintPressed = async () => {
  //TODO: 実装
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - コンポーネントがレンダリングされた後に呼び出されるReactフックです。 空の配列`[]`のpropが渡されるため(3行目を参照)、コンポーネントの_最初の_レンダリングでのみ呼び出されます。 ここでは、ウォレットリスナーと別のウォレット関数を呼び出し、ウォレットが接続されているかどうかに応じたUIの更新をします。
- `connectWalletPressed` - この関数は、ユーザーのMetaMaskウォレットをdappに接続するために呼び出されます。
- `onMintPressed` - この関数は、ユーザーのNFTをミントするために呼び出されます。

このファイルの終盤には、コンポーネントのUIがあります。 このコードを注意深く見ると、対応するテキストフィールドの入力が変更されたときに、`url`、`name`、`description`の状態変数が更新されることがわかります。

また、`mintButton`と`walletButton`のIDを持つボタンがクリックされると、それぞれ`connectWalletPressed`と`onMintPressed`が呼び出されることもわかります。

```javascript
//コンポーネントのUI
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "接続済み: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>ウォレットを接続</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFTミンター</h1>
    <p>
      アセットのリンク、名前、説明を追加し、「ミント」を押すだけです。
    </p>
    <form>
      <h2>🖼 アセットへのリンク: </h2>
      <input
        type="text"
        placeholder="例: https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 名前: </h2>
      <input
        type="text"
        placeholder="例: はじめてのNFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ 説明: </h2>
      <input
        type="text"
        placeholder="例: Cryptokittiesよりもクール ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      NFTをミント
    </button>
    <p id="status">{status}</p>
</div>
)
```

最後に、このミンター(Minter)コンポーネントがどこに加えられるかについて説明します。

Reactのメインコンポーネントであり、他のすべてのコンポーネントのコンテナとして機能する`App.js`ファイルを見ると、7行目にMinterコンポーネントが挿入されていることがわかります。

**このチュートリアルでは、`Minter.js`ファイルの編集と`src`フォルダへのファイルの追加のみを行います。**

これから取り組む内容を理解したところで、イーサリアムウォレットを設定しましょう。

## Ethereumウォレットを設定する {#set-up-your-ethereum-wallet}

ユーザーがスマートコントラクトとやり取りできるようにするには、自分のイーサリアムウォレットを分散型アプリケーション(Dapp)に接続する必要があります。

### MetaMaskをダウンロードする {#download-metamask}

このチュートリアルでは、イーサリアムアカウントアドレスを管理するためにブラウザの仮想ウォレットであるMetamaskを使用します。 Ethereumでのトランザクションの仕組みについて詳しく知りたい場合は、[こちらのページ](/developers/docs/transactions/)をご覧ください。

MetaMaskアカウントは、[こちら](https://metamask.io/download)から無料でダウンロードして作成できます。 アカウントを作成後、またはすでにアカウントをお持ちの場合は、(実際に支払いが発生しないように)右上の「Ropsten Test Network」に切り替えてください。

### フォーセットからEtherを追加する {#add-ether-from-faucet}

非代替性トークン(NFT)をミントする(または、イーサリアムのブロックチェーンのトランザクションに署名する)には、偽のETHが必要です。 Ethを取得するには、[Ropstenフォーセット](https://faucet.ropsten.be/)にアクセスしてRopstenのアカウントアドレスを入力し、「Send Ropsten Eth」をクリックします。 MetamaskアカウントにETHが表示されるはずです。

### 残高を確認する {#check-your-balance}

残高を確認するために、[Alchemyのcomposerツール](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)を使用して[eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)リクエストを行いましょう。 このリクエストをすると、ウォレット内のETHの額が返されます。 MetaMaskアカウントアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されます。

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注:** この結果はethではなくwei単位です。 weiはETHの最小単位として使われています。 weiからETHへ変換すると、1 eth = 10¹⁸ weiになります。 つまり、0xde0b6b3a7640000を10進数に変換すると、1\*10¹⁸となり、1 ETHに相当します。

ご安心ください。 これで、偽のお金を手に入れました。 <Emoji text=":money_mouth_face:" size={1} />

## MetaMaskをUIに接続する {#connect-metamask-to-your-UI}

MetaMaskウォレットが設定されたので、分散型アプリケーション(Dapp)を接続しましょう。

[MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)パラダイムに従うため、dappのロジック、データ、ルールを管理する関数を含む別のファイルを作成し、それらの関数をフロントエンド(Minter.jsコンポーネント)に渡します。

### `connectWallet`関数 {#connect-wallet-function}

そのためには、`src`ディレクトリに`utils`という新しいフォルダを作成し、その中に`interact.js`というファイルを追加します。このファイルには、ウォレットとスマートコントラクトのすべての対話関数が含まれます。

`interact.js`ファイルに`connectWallet`関数を記述し、それを`Minter.js`コンポーネントでインポートして呼び出します。

`interact.js`ファイルに以下を追加します

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 上のテキストフィールドにメッセージを書いてください。",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              ブラウザに仮想EthereumウォレットであるMetaMaskをインストールする必要があります。
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

このコードが何をしているのか見てみましょう。

まず、この関数はブラウザで`window.ethereum`が有効になっているかどうかをチェックします。

`window.ethereum`は、MetaMaskやその他のウォレットプロバイダーによって挿入されるグローバルAPIで、WebサイトがユーザーのEthereumアカウントを要求できるようにするものです。 承認されると、ユーザーが接続しているブロックチェーンからデータを読み取ったり、メッセージやトランザクションへの署名をユーザーに提案したりできるようになります。 詳細については[MetaMaskのドキュメント](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)をご覧ください。

`window.ethereum`が_存在しない_場合、それはMetaMaskがインストールされていないことを意味します。 これにより、返される`address`が空の文字列で、`status` JSXオブジェクトがユーザーにMetaMaskをインストールするよう促すJSONオブジェクトが返されます。

**私たちが書く関数のほとんどは、状態変数とUIを更新するために使用できるJSONオブジェクトを返します。**

さて、`window.ethereum`が_存在する_場合、ここからが面白くなります。

try/catchループを使用して、[`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)を呼び出してMetaMaskへの接続を試みます。 この関数を呼び出すと、ブラウザでMetaMaskが開き、ユーザーはウォレットを分散型アプリケーション(Dapp)に接続するように求められます。

- ユーザーが接続を選択した場合、`method: "eth_requestAccounts"`は、dappに接続されているすべてのユーザーのアカウントアドレスを含む配列を返します。 まとめると、`connectWallet`関数は、この配列の_最初の_`address`（9行目参照）と、ユーザーにスマートコントラクトへのメッセージを書き込むよう促す`status`メッセージを含むJSONオブジェクトを返します。
- ユーザーが接続を拒否した場合、JSONオブジェクトには返される`address`の空文字列と、ユーザーが接続を拒否したことを示す`status`メッセージが含まれます。

### connectWallet関数をMinter.js UIコンポーネントに追加する {#add-connect-wallet}

この`connectWallet`関数を書いたので、`Minter.js`コンポーネントに接続しましょう。

まず、`Minter.js`ファイルの先頭に`import { connectWallet } from "./utils/interact.js";`を追加して、この関数を`Minter.js`ファイルにインポートする必要があります。 `Minter.js`の最初の11行は次のようになります。

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //状態変数
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

次に、`connectWalletPressed`関数の中で、インポートした`connectWallet`関数を次のように呼び出します。

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

`interact.js`ファイルによって、機能の大部分が`Minter.js`コンポーネントからどのように抽象化されているかに注目してください。 これは、モデルビューコントローラ(M-V-C)パラダイムに準拠しているためです。

`connectWalletPressed`では、インポートした`connectWallet`関数をawaitで呼び出し、そのレスポンスを使って状態フックを介して`status`と`walletAddress`変数を更新します。

それでは、`Minter.js`と`interact.js`の両方のファイルを保存して、これまでのUIをテストしてみましょう。

localhost:3000でブラウザを開き、ページ右上にある「Connect Wallet」ボタンを押します。

MetaMaskがインストールされている場合は、ウォレットを分散型アプリケーション(Dapp)に接続するように求められます。 接続リクエストを承認します。

ウォレットボタンに、接続した自分のアドレスが表示されているはずです。

次に、ページを再読み込みしてみてください... これは奇妙です。 ウォレットボタンによって、すでに接続しているにもかかわらずMetaMaskに接続するよう求められます。

でも心配しないでください。 `getCurrentWalletConnected`という関数を実装することで、これを簡単に修正できます。この関数は、アドレスがすでにdappに接続されているかどうかを確認し、それに応じてUIを更新します。

### getCurrentWalletConnected関数 {#get-current-wallet}

`interact.js`ファイルに、以下の`getCurrentWalletConnected`関数を追加します。

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 上のテキストフィールドにメッセージを書いてください。",
        }
      } else {
        return {
          address: "",
          status: "🦊 右上のボタンを使ってMetaMaskに接続してください。",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              ブラウザに仮想EthereumウォレットであるMetaMaskをインストールする必要があります。
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

このコードは、先ほど書いた`connectWallet`関数と_非常によく似ています_。

主な違いは、ユーザーがウォレットを接続するためにMetaMaskを開く`eth_requestAccounts`メソッドを呼び出す代わりに、ここでは`eth_accounts`メソッドを呼び出している点です。これは、現在dappに接続されているMetaMaskのアドレスを含む配列を単に返すだけです。

この関数を動作させるため、`Minter.js`コンポーネントの`useEffect`関数で呼び出しましょう。

`connectWallet`で行ったのと同様に、この関数を`interact.js`ファイルから`Minter.js`ファイルへ次のようにインポートする必要があります。

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //ここでインポート
} from "./utils/interact.js"
```

ここでは、`useEffect`関数で次のように呼び出します。

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

`walletAddress`と`status`の状態変数を更新するのに、`getCurrentWalletConnected`の呼び出しのレスポンスを使用していることに注目してください。

このコードを追加したら、ブラウザウィンドウを更新してみてください。 リフレッシュ後も、ボタンには接続されていることが示されており、接続されたウォレットのアドレスのプレビューが表示されているはずです。

### addWalletListenerを実装する {#implement-add-wallet-listener}

分散型アプリケーション(Dapp)ウォレットの設定の最終ステップは、ウォレットリスナーを実装することです。これにより、ユーザーが接続を切断したり、アカウントを切り替えたりした場合など、ウォレットの状態が変更されたときにUIが更新されます。

`Minter.js`ファイルで、次のような`addWalletListener`関数を追加してください。

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 上のテキストフィールドにメッセージを書いてください。")
      } else {
        setWallet("")
        setStatus("🦊 右上のボタンを使ってMetaMaskに接続してください。")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          ブラウザに仮想EthereumウォレットであるMetaMaskをインストールする必要があります。
        </a>
      </p>
    )
  }
}
```

ここで何が起きているか、簡単に見ていきましょう。

- まず、この関数は`window.ethereum`が有効になっているか（つまり、MetaMaskがインストールされているか）をチェックします。
  - 有効でない場合、`status`状態変数を、ユーザーにMetaMaskのインストールを促すJSX文字列に設定するだけです。
  - 有効になっている場合、3行目のリスナー`window.ethereum.on("accountsChanged")`を設定します。これはMetaMaskウォレットの状態変更をリッスンします。これには、ユーザーがdappに追加のアカウントを接続した場合、アカウントを切り替えた場合、アカウントを切断した場合が含まれます。 少なくとも1つのアカウントが接続されていれば、`walletAddress`状態変数は、リスナーから返された`accounts`配列の最初のアカウントとして更新されます。 それ以外の場合、`walletAddress`には空の文字列が設定されます。

最後に、`useEffect`関数で次のように呼び出す必要があります。

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

これで完了です。 ウォレットのすべての機能をプログラミングしました。 ウォレットが設定されたので、非代替性トークン(NFT)をミントする方法を理解しましょう!

## NFTメタデータの基礎 {#nft-metadata-101}

このチュートリアルの最初の方で説明した非代替性トークン(NFT)のメタデータを思い出してください。非代替性トークン(NFT)メタデータは、非代替性トークン(NFT)にデジタル資産、名前、説明、その他の属性などのプロパティーを持たせ、非代替性トークン(NFT)を利用できるようにします。

このメタデータをJSONオブジェクトとして設定して保存し、スマートコントラクトの`mintNFT`関数を呼び出すときに`tokenURI`パラメータとして渡せるようにする必要があります。

「Link to Asset」、「Name」、「Description」フィールドのテキストは、非代替性トークン(NFT)のメタデータで別々のプロパティになります。 メタデータをJSONオブジェクトとしてフォーマットしますが、このJSONオブジェクトの格納には、以下のような複数のオプションがあります。

- イーサリアムブロックチェーンに格納することができますが、これは非常に高価です。
- AWSやFirebaseなどの中央集権型サーバーに保存できます。 しかし、これは分散化の信念に反するものです。
- 惑星間ファイルシステム(IPFS)という、分散型ファイルシステムでデータを保存、共有するための、分散型プロトコルおよびピアツーピア・ネットワークを使用できます。 このプロトコルは、分散化されており無料のため、最良のオプションです。

メタデータをIPFSに保存するには、便利なIPFS APIおよびツールキットである[Pinata](https://pinata.cloud/)を使用します。 次のステップでは、この方法を具体的に説明します。

## Pinataを使ってメタデータをIPFSにピン留めする {#use-pinata-to-pin-your-metadata-to-IPFS}

[Pinata](https://pinata.cloud/)アカウントをお持ちでない場合は、[こちら](https://app.pinata.cloud/auth/signup)から無料アカウントにサインアップし、メールアドレスとアカウントの認証手順を完了してください。

### Pinata APIキーを作成する {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys)ページに移動して、上部にある「New Key」ボタンを選択し、Adminウィジェットを有効に設定してからキーに名前を付けます。

API情報を含むポップアップが表示されます。 この情報は、必ず安全な場所に保存してください。

キーの設定が完了したので、プロジェクトに追加して使用できるようにしましょう。

### .envファイルを作成する {#create-a-env}

環境ファイルにPinataキーとシークレットを安全に保存できます。 プロジェクトディレクトリに[dotenvパッケージ](https://www.npmjs.com/package/dotenv)をインストールしましょう。

ターミナルで新しいタブを開き（ローカルホストを実行しているタブとは別のタブ）、`minter-starter-files`フォルダにいることを確認してから、ターミナルで次のコマンドを実行します。

```text
npm install dotenv --save
```

次に、コマンドラインで次のように入力し、`.env`ファイルを`minter-starter-files`のルートディレクトリに作成します。

```javascript
vim.env
```

これにより、vim（テキストエディタ）で`.env`ファイルが開きます。 保存するには、キーボードで「esc」+「:」+「q」をこの順序で押します。

次に、VSCodeで`.env`ファイルに移動し、次のようにしてPinata APIキーとAPIシークレットを追加します。

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

ファイルを保存します。これで、JSONメタデータを惑星間ファイルシステム(IPFS)にアップロードする関数を書き始める準備が整いました。

### pinJSONToIPFSを実装する {#pin-json-to-ipfs}

幸いにもPinataには、[JSONデータをIPFSにアップロードするための専用API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json)と、少しの変更で使えるaxiosを使った便利なJavaScriptのサンプルがあります。

`utils`フォルダーに`pinata.js`という別のファイルを作成し、.envファイルからPinataのシークレットとキーを次のようにインポートしましょう。

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

次に、pinata.jsファイルに以下の追加コードを貼り付けます。 コードの意味はこれから説明しますので、心配する必要はありません。

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //Pinataへのaxios POSTリクエストを作成 ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

では、このコードは何をしているのでしょうか?

最初に、ブラウザとnode.jsのためのPromiseベースのHTTPクライアントである[axios](https://www.npmjs.com/package/axios)をインポートしています。axiosは、Pinataへのリクエストで使用します。

その下に、`pinJSONToIPFS`非同期関数があります。この関数は、`JSONBody`を入力として取り、PinataのAPIキーとシークレットをヘッダーに入れて、`pinJSONToIPFS` APIへのPOSTリクエストを行います。

- このPOSTリクエストが成功した場合、この関数は、`success`ブール値がtrueで、メタデータがピン留めされた`pinataUrl`が入ったJSONオブジェクトを返します。 ここで返された`pinataUrl`は、スマートコントラクトのmint関数の`tokenURI`の入力として使用されます。
- このPOSTリクエストが失敗した場合、この関数は、`success`ブール値がfalseで、エラーを伝える`message`文字列が入ったJSONオブジェクトを返します。

`connectWallet`関数の戻り値の型と同様に、JSONオブジェクトが返されるので、そのパラメータを状態変数とUIの更新に使用できます。

## スマートコントラクトを読み込む {#load-your-smart-contract}

`pinJSONToIPFS`関数を介してNFTメタデータをIPFSにアップロードする手段を手に入れたので、次は`mintNFT`関数を呼び出せるように、スマートコントラクトのインスタンスを読み込む手段が必要です。

前述したように、このチュートリアルでは[こちらの既存のNFTスマートコントラクト](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)を使用します。しかし、その作成方法を学びたい、もしくは自分で作成したい場合は、もう一つのチュートリアル["NFTの作成方法"](https://www.alchemy.com/docs/how-to-create-an-nft)をご覧になることを強くお勧めします。

### コントラクトABI {#contract-abi}

ファイルを詳しく調べてみると、`src`ディレクトリに`contract-abi.json`ファイルがあることが分かります。 アプリケーションバイナリインターフェース(ABI)は、コントラクトが呼び出す関数を指定し、関数が確実に意図しているフォーマットでデータを返すようにするために必要です。

さらに、イーサリアムブロックチェーンに接続してスマートコントラクトをロードするための、Alchemy APIキーとAlchemy Web3 APIも必要になります。

### Alchemy APIキーを作成する {#create-alchemy-api}

まだAlchemyアカウントをお持ちでない場合は、[こちらから無料でサインアップしてください](https://alchemy.com/?a=eth-org-nft-minter)。

Alchemyのアカウントを作成した後、アプリを作成することでAPIキーを生成することができます。 これにより、Ropsten テストネットワークへのリクエストが可能になります。

ナビゲーションバーの「Apps」にマウスを合わせて、「Create App」をクリックし、Alchemyダッシュボードの「Create App」ページに移動してください。

アプリに名前を付け(私たちは「My First NFT!」にしました)、簡単な説明を記述し、環境に「Staging」を選択(アプリのブックキーピングに使用)し、ネットワークに「Ropsten」を選択します。

「Create app」をクリックします。 アプリが下の表に表示されます。

HTTP Alchemy API URLを作成したので、クリップボードにコピーします。

…そして、それを`.env`ファイルに追加しましょう。 これで.envファイル全体は、次のようになります。

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

コントラクトABIとAlchemy APIキーが用意できたので、[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)を使用してスマートコントラクトを読み込む準備ができました。

### Alchemy Web3エンドポイントとコントラクトを設定する {#setup-alchemy-endpoint}

まず、[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)がまだインストールされていない場合は、ターミナルでホームディレクトリ`nft-minter-tutorial`に移動してインストールする必要があります:

```text
cd ..
npm install @alch/alchemy-web3
```

次に、`interact.js`ファイルに戻りましょう。 .envファイルからAlchemyキーがインポートされ、Alchemy Web3エンドポイントが設定されるように、ファイルの上部に次のコードを追加します。

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)は[Web3.js](https://docs.web3js.org/)のラッパーであり、強化されたAPIメソッドやその他の重要なメリットを提供し、web3開発者としての作業を容易にします。 最小限の設定で使えるように設計されているので、アプリですぐに使用可能です。

次に、コントラクトアプリケーションバイナリインターフェース(ABI)とコントラクトアドレスをファイルに追加しましょう。

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

これで両方を追加できたので、mint関数のコーディングを始める準備ができました。

## mintNFT関数を実装する {#implement-the-mintnft-function}

`interact.js`ファイル内に、`mintNFT`関数を定義しましょう。この関数は、その名の通りNFTをミントします。

多数の非同期呼び出しを\(メタデータをIPFSにピン留めするためにPinataに対して、スマートコントラクトをロードするためにAlchemy Web3に対して、トランザクションに署名するためにMetaMaskに対して\)行うため、この関数もまた非同期になります。

この関数への3つの入力は、デジタル資産の`url`、`name`、`description`になります。 `connectWallet`関数の下に、次の関数シグネチャを追加してください。

```javascript
export const mintNFT = async (url, name, description) => {}
```

### 入力エラー処理 {#input-error-handling}

当然のこととして、関数の開始時に何らかの入力エラー処理を行うことは理にかなっています。入力パラメータが正しくない場合は、関数を終了するようにします。 関数の内部に次のコードを追加しましょう。

```javascript
export const mintNFT = async (url, name, description) => {
  //エラー処理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗ミントする前にすべてのフィールドに入力してください。",
    }
  }
}
```

基本的に、入力パラメータのいずれかが空の文字列である場合、`success`ブール値がfalseで、UIのすべてのフィールドに入力する必要があることを伝える`status`文字列が入ったJSONオブジェクトを返します。

### メタデータをIPFSにアップロードする {#upload-metadata-to-ipfs}

メタデータが適切にフォーマットされていることを確認したら、次のステップは、それをJSONオブジェクトにラップし、作成した`pinJSONToIPFS`を介してIPFSにアップロードすることです。

そのためにはまず、`pinJSONToIPFS`関数を`interact.js`ファイルにインポートする必要があります。 `interact.js`の最上部に、次の行を追加してください。

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

`pinJSONToIPFS`がJSON本体を入力として取ることを思い出してください。 そのため、呼び出す前に`url`、`name`、`description`パラメータをJSONオブジェクトにフォーマットする必要があります。

次のようにコードを更新して、`metadata`というJSONオブジェクトを作成し、この`metadata`パラメータを使用して`pinJSONToIPFS`を呼び出します。

```javascript
export const mintNFT = async (url, name, description) => {
  //エラー処理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗ミントする前にすべてのフィールドに入力してください。",
    }
  }

  //メタデータを作成
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata呼び出しを作成
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 tokenURIのアップロード中に問題が発生しました。",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

`pinJSONToIPFS(metadata)`の呼び出しのレスポンスを、`pinataResponse`オブジェクトに格納していることに注目してください。 次に、このオブジェクトにエラーがないか解析します。

エラーがある場合、`success`ブール値がfalseで、呼び出しが失敗したことを伝える`status`文字列が入ったJSONオブジェクトを返します。 それ以外の場合は、`pinataURL`を`pinataResponse`から抽出し、それを`tokenURI`変数として格納します。

では、ファイルの先頭で初期化したAlchemy Web3 APIを使用して、スマートコントラクトをロードしてみましょう。 `mintNFT`関数の下部に次のコードの行を追加して、`window.contract`グローバル変数にコントラクトを設定します。

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

`mintNFT`関数に最後に追加するのは、Ethereumのトランザクションです。

```javascript
//Ethereumトランザクションを設定
const transactionParameters = {
  to: contractAddress, // コントラクト公開時以外は必須
  from: window.ethereum.selectedAddress, // ユーザーのアクティブなアドレスと一致する必要あり
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFTスマートコントラクトを呼び出し
}

//MetaMask経由でトランザクションに署名
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Etherscanでトランザクションを確認: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 問題が発生しました: " + error.message,
  }
}
```

イーサリアムトランザクションをすでによくご存知ならば、構造が今まで見てきたものとかなり似ていることに気付くでしょう。

- まず、トランザクションパラメータを設定します。
  - `to`は受信者アドレス（スマートコントラクト）を指定します
  - `from`はトランザクションの署名者を指定します（ユーザーのMetaMaskに接続されたアドレス: `window.ethereum.selectedAddress`）
  - `data`には、スマートコントラクトの`mintNFT`メソッドへの呼び出しが含まれ、入力として`tokenURI`とユーザーのウォレットアドレス`window.ethereum.selectedAddress`を受け取ります
- 次に、`window.ethereum.request`をawaitで呼び出して、MetaMaskにトランザクションの署名を依頼します。 このリクエストで、ethメソッド（`eth_sendTransaction`）を指定し、`transactionParameters`を渡していることに注目してください。 この時点で、ブラウザでMetaMaskが開かれ、ユーザーにトランザクションの署名または拒否を求めます。
  - トランザクションが成功した場合、この関数は、ブール値`success`がtrueに設定され、`status`文字列がユーザーにトランザクションの詳細についてEtherscanを確認するよう促すJSONオブジェクトを返します。
  - トランザクションが失敗した場合、この関数は、`success`ブール値がfalseに設定され、`status`文字列がエラーメッセージを伝えるJSONオブジェクトを返します。

`mintNFT`関数全体は、次のようになります。

```javascript
export const mintNFT = async (url, name, description) => {
  //エラー処理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗ミントする前にすべてのフィールドに入力してください。",
    }
  }

  //メタデータを作成
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinataピン留めリクエスト
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 tokenURIのアップロード中に問題が発生しました。",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //スマートコントラクトを読み込む
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //Ethereumトランザクションを設定
  const transactionParameters = {
    to: contractAddress, // コントラクト公開時以外は必須
    from: window.ethereum.selectedAddress, // ユーザーのアクティブなアドレスと一致する必要あり
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //NFTスマートコントラクトを呼び出す
  }

  //MetaMask経由でトランザクションに署名
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Etherscanでトランザクションを確認: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 問題が発生しました: " + error.message,
    }
  }
}
```

巨大な関数でしたね! あとは、`mintNFT`関数を`Minter.js`コンポーネントに接続するだけです。

## mintNFTをMinter.jsフロントエンドに接続する {#connect-our-frontend}

`Minter.js`ファイルを開いて、上部の`import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";`の行を次のように更新してください。

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

最後に、`onMintPressed`関数を実装してインポートした`mintNFT`関数をawaitで呼び出し、`status`状態変数を更新してトランザクションが成功したか失敗したかを反映させます。

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## NFTを稼働中のWebサイトにデプロイする {#deploy-your-NFT}

プロジェクトを稼働させてユーザーが使える準備ができましたでしょうか？ ミンターを稼働中のWebサイトにデプロイする方法については、[こちらのチュートリアル](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online)をご覧ください。

次は最後のステップです。

## ブロックチェーンの世界に旋風を巻き起こす {#take-the-blockchain-world-by-storm}

これは冗談です。あなたは、このチュートリアルを最後までやりきりました!

要約すると、非代替性トークン(NFT)ミンターを構築することで次の方法を学ぶことが出来ました。

- フロントエンドのプロジェクト経由でMetaMaskに接続する
- フロントエンドからスマートコントラクトメソッドを呼び出す
- MetaMaskを使用してトランザクションに署名する

おそらく、dappを介してミントされたNFTをウォレットで披露したいと思うでしょうから、簡単なチュートリアル[ウォレットでNFTを表示する方法](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)をぜひご覧ください。

そして、いつものように、何か質問があれば、[Alchemy Discord](https://discord.gg/gWuC7zB)でお手伝いします。 このチュートリアルのコンセプトが、今後のプロジェクトでどのように応用されるのか楽しみでなりません。
