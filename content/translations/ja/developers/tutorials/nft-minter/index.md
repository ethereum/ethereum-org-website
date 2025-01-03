---
title: 非代替性トークン(NFT)ミンターチュートリアル
description: このチュートリアルでは、非代替性トークン(NFT)ミンターを構築します。さらに、スマートコントラクトをMetaMaskやWeb3ツールを使用して、Reactフロントエンドへ接続することでフルスタック分散型アプリケーション(Dapp)を作成する方法を学びます。
author: "smudgil"
tags:
  - "Solidity"
  - "NFT"
  - "alchemy"
  - "スマートコントラクト"
  - "フロントエンド"
  - "Pinata"
skill: intermediate
lang: ja
published: 2021-10-06
---

Web2のバックグラウンドを持つデベロッパーの最大の課題の1つは、スマートコントラクトをフロントエンドのプロジェクトに接続し、やり取りを行う方法を理解することです。

ここでは、デジタル資産へのリンク、タイトル、説明を入力できるシンプルなUIを備えた非代替性トークン(NFT)ミンターを構築することで、次の方法を学びます。

- フロントエンドのプロジェクト経由でMetaMaskに接続する
- フロントエンドからスマートコントラクトメソッドを呼び出す
- MetaMaskを使用してトランザクションに署名する

このチュートリアルでは、[React](https://reactjs.org/)をフロントエンドフレームワークとして使用します。 このチュートリアルはWeb3開発に焦点を当てているので、Reactの基礎についての説明に多くの時間を費やせません。 代わりに、プロジェクトの機能性を高めることに注力します。

前提条件として、Reactに関する初級レベルの知識を有している必要があります。つまり、コンポーネント、プロパティ(props)、useStateおよびuseEffect、基本関数の呼び出しなどの仕組みを理解している必要があります。 これらの中に初めて耳にする用語がある場合は、[Reactの入門チュートリアル](https://reactjs.org/tutorial/tutorial.html)をご覧ください。 より視覚的な学習を好む方には、Net Ninjaによる素晴らしい[フルモダンReactチュートリアル](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)のビデオシリーズをお勧めします。

まだAlchemyアカウントをお持ちでない場合、このチュートリアルを完了したり、ブロックチェーンで何かを構築したりするために必ず必要になりますので、 [こちらから](https://alchemy.com/)無料アカウントに登録してください。

それでは、さっそく始めましょう！

## 非代替性トークン(NFT)作成入門 {#making-nfts-101}

コードを見始める前に、非代替性トークン(NFT)作成の仕組みを理解することが重要です。 それには、次の2つのステップがあります。

### イーサリアムブロックチェーン上で非代替性トークン(NFT)スマートコントラクトを公開 {#publish-nft}

ERC-1155とERC-721の2つのスマートコントラクト規格の最大の違いは、ERC-1155はマルチトークン規格でありバッチ機能を備えているのに対し、ERC-721はシングルトークン規格であり一度に1つのトークンの送信しかサポートしていないことです。

### ミント関数の呼び出し {#minting-function}

通常、このミント関数は、パラメータとして2つの変数を渡す必要があります。1つ目は、新しくミントされた非代替性トークン(NFT)を受け取るアドレスを指定する`recipient`です。2つ目は、非代替性トークン(NFT)のメタデータを記述するJSONドキュメントに解決される文字列である非代替性トークン(NFT)の`tokenURI`です。

非代替性トークン(NFT)のメタデータは、非代替性トークン(NFT)に名前、説明、画像(または別のデジタル資産)、その他の属性などのプロパティを持たせ、非代替性トークン(NFT)を利用できるようにします。 非代替性トークン(NFT)のメタデータが含まれている[tokenURIの例](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)をご覧ください。

このチュートリアルでは、React UIを使用して既存の非代替性トークン(NFT)のスマートコントラクトのミント関数を呼び出すパート2(後半)の方に焦点を当てています。

このチュートリアルで呼び出すERC-721非代替性トークン(NFT)スマートコントラクトへのリンクは、[こちら](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)です。 この作成方法について知りたい場合は、[非代替性トークン(NFT)の作り方](https://docs.alchemyapi.io/alchemy/tutorials/how-to-create-an-nft)という別のチュートリアルを確認することを強くお勧めします。

非代替性トークン(NFT)作成の仕組みを理解したところで、スターターファイルをクローンしましょう。

## スターターファイルのクローン {#clone-the-starter-files}

最初に、[非代替性トークン(NFT)ミンターチュートリアル(nft-minter-tutorial)のGitHubリポジトリ](https://github.com/alchemyplatform/nft-minter-tutorial)にアクセスし、このプロジェクトのスターターファイルを取得します。 リポジトリをローカル環境にクローンします。

クローンされた`nft-minter-tutorial`リポジトリを開くと、`minter-starter-files`と`nft-minter`という2つのフォルダが含まれています。

- `minter-starter-files`には、このプロジェクトのスターターファイル(基本的にはReact UI)が含まれています。 このチュートリアルでは、イーサリアムウォレットと非代替性トークン(NFT)スマートコントラクトに接続することで、このUIを利用できるようにする方法を学ぶ際に、**こちらのディレクトリで作業します**。
- `nft-minter`には、完成したチュートリアル全体が含まれており、**困ったときに****リファレンス**として利用できます。

次に、コードエディタで`minter-starter-files`のコピーを開き、`src`フォルダに移動します。

これから作成するすべてのコードは、`src`フォルダに保存されます。 後ほど`Minter.js`コンポーネントを編集し、追加のjavascriptファイルを書くことで、このプロジェクトにWeb3機能を追加します。

## ステップ2: スターターファイルの確認 {#step-2-check-out-our-starter-files}

コーディングを始める前に、スターターファイルで既に提供されるものを確認することが重要です。

### Reactプロジェクトの実行 {#get-your-react-project-running}

まずは、ブラウザでReactプロジェクトを実行しましょう。 Reactの素晴らしいところは、一度ブラウザでプロジェクトを実行すると、保存した変更がブラウザでも同時に更新されることです。

プロジェクトを実行するには、次のようにターミナルで`minter-starter-files`フォルダのルートディレクトリに移動し、`npm install`を実行してプロジェクトの依存関係をインストールします。

```bash
cd minter-starter-files
npm install
```

インストールが完了したら、ターミナルで`npm start`を実行します。

```bash
npm start
```

これにより、ブラウザでhttp://localhost:3000/が開き、プロジェクトのフロントエンドが表示されます。 フロントエンドは3つのフィールドで構成されており、それぞれ、非代替性トークン(NFT)資産へのリンク、非代替性トークン(NFT)の名前、非代替性トークン(NFT)の説明を入力する場所になっています。

「Connect Wallet」や「Mint NFT」ボタンをクリックしても、動作しません。これらの機能は、これからプログラムする必要があります。 :\)

### Minter.jsコンポーネント {#minter-js}

**注:** `minter-starter-files`フォルダにいることを確認してください。`nft-minter`フォルダではないことを確認します。

エディタの`src`フォルダに戻り、`Minter.js`ファイルを開きましょう。 このファイルには、これから作業を進めていく主要なReactコンポーネントが含まれています。すべての内容を理解することが非常に重要です。

このファイルの上部には、特定のイベントの後に更新される状態変数(State Variable)があります。

```javascript
//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Reactの状態変数や状態フック(State Hook)を聞いたことがない場合は、 [こちらの](https://reactjs.org/docs/hooks-state.html)ドキュメントをご覧ください。

それぞれの変数は以下を示します。

- `walletAddress` - ユーザーのウォレットアドレスを格納する文字列
- `status` - UIの下部に表示するメッセージを含む文字列
- `name` - 非代替性トークン(NFT)の名前を格納する文字列
- `description` - 非代替性トークン(NFT)の説明を格納する文字列
- `url` - 非代替性トークン(NFT)のデジタル資産へのリンクを含んだ文字列

状態変数(State Variable)の後に、`useEffect`、`connectWalletPressed`、`onMintPressed`という3つの未実装の関数があります。 これらの関数は、すべて`async`になっています。これは、それぞれの関数で非同期API呼び出しを行うためです。 それぞれの関数の名前は、その機能を示しています。

```javascript
useEffect(async () => {
  //TODO: implement
}, [])

const connectWalletPressed = async () => {
  //TODO: implement
}

const onMintPressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://reactjs.org/docs/hooks-effect.html) - コンポーネントがレンダリングされた後に呼び出されるReactフックです。 空の配列`[]`のpropが渡される(3行目を参照)ため、コンポーネントの_最初_のレンダリングでのみ呼び出されます。 ここでは、ウォレットリスナーと別のウォレット関数を呼び出し、ウォレットが接続されているかどうかに応じたUIの更新をします。
- `connectWalletPressed` - この関数は、ユーザーのMataMaskウォレットを分散型アプリケーション(Dapp)に接続するために呼び出されます。
- `onMintPressed` - この関数は、ユーザーの非代替性トークン(NFT)をミントするために呼び出されます。

このファイルの終盤には、コンポーネントのUIがあります。 このコードを注意深く読んでいくと、状態変数の`url`、`name`、`description`に対応するテキストフィールドの入力が変更された場合、これらの変数を更新していることが分かります。

さらに、`walletButton`または`mintButton`というIDを持つボタンがクリックされると、それぞれ`connectWalletPressed`または`onMintPressed`が呼び出されることも分かります。

```javascript
//the UI of our component
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g. My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g. Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
  </div>
)
```

最後に、このミンター(Minter)コンポーネントがどこに加えられるかについて説明します。

他のすべてのコンポーネントのコンテナとして機能する、Reactのメインコンポーネントである`App.js`ファイルを表示すると、ミンター(Minter)コンポーネントが7行目に挿入されていることが分かります。

**このチュートリアルでは、`Minter.js`ファイルの編集と、`src`フォルダへのファイルの追加のみを行います。**

これから取り組む内容を理解したところで、イーサリアムウォレットを設定しましょう。

## イーサリアムウォレットの設定 {#set-up-your-ethereum-wallet}

ユーザーがスマートコントラクトとやり取りできるようにするには、自分のイーサリアムウォレットを分散型アプリケーション(Dapp)に接続する必要があります。

### MetaMaskをダウンロード {#download-metamask}

このチュートリアルでは、イーサリアムアカウントアドレスを管理するためにブラウザの仮想ウォレットであるMetamaskを使用します。 イーサリアムのトランザクションの仕組みの詳細については、[こちらのページ](/developers/docs/transactions/)をご覧ください。

Metamaskのアカウントは[こちら](https://metamask.io/download.html)から無料でダウンロード、作成できます。 アカウントを作成後、またはすでにアカウントをお持ちの場合は、(実際に支払いが発生しないように)右上の「Ropsten Test Network」に切り替えてください。

### フォーセットからイーサ(ETH)を追加 {#add-ether-from-faucet}

非代替性トークン(NFT)をミントする(または、イーサリアムのブロックチェーンのトランザクションに署名する)には、偽のETHが必要です。 ETHを取得するには、[Ropstenフォーセット](https://faucet.ropsten.be/)にアクセスして、Ropstenアカウントアドレスを入力し、「Send Ropsten ETH」をクリックします。 MetamaskアカウントにETHが表示されるはずです。

### 残高の確認 {#check-your-balance}

残高を再確認するために、[Alchemyのコンポーザーツール](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)を使用して[eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)をリクエストしてみましょう。 このリクエストをすると、ウォレット内のETHの額が返されます。 MetaMaskアカウントアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されます。

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注:** この結果の単位は、ETHではなくweiです。 weiはETHの最小単位として使われています。 weiからETHへ変換すると、1 eth = 10¹⁸ weiになります。 つまり、0xde0b6b3a7640000を10進数に変換すると、1\*10¹⁸となり、1 ETHに相当します。

ふう! これで、偽のお金を手に入れました。 <Emoji text=":money_mouth_face:" size={1} />

## MetaMaskをUIに接続 {#connect-metamask-to-your-UI}

MetaMaskウォレットが設定されたので、分散型アプリケーション(Dapp)を接続しましょう。

[モデルビューコントローラ(MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)パラダイムを実践したいので、別のファイルを作成し、分散型アプリケーション(Dapp)のロジック、データ、ルールを管理する関数を含めます。次に、それらの関数をフロントエンド(Minter.jsコンポーネント)に渡します。

### `connectWallet`関数 {#connect-wallet-function}

これを行うには、`src`ディレクトリに`utils`という新しいフォルダを作成して、そこに`interact.js`というファイルを追加します。このファイルには、ウォレットとスマートコントラクトがやり取りする関数がすべて含まれます。

`interact.js`ファイルに`connectWallet`関数を記述し、この関数を`Minter.js`コンポーネントにインポートして呼び出します。

`interact.js`ファイルに以下を追加します。

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
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
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

このコードが何をしているのか見てみましょう。

まず、ブラウザで`window.ethereum`が有効になっているかどうかを関数がチェックしています。

`window.ethereum`は、MetaMaskおよび他のウォレットプロバイダーによって挿入されるグローバルAPIであり、ウェブサイトがユーザーのイーサリアムアカウントを要求できるようにするものです。 承認されると、ユーザーが接続しているブロックチェーンからデータを読み取ったり、メッセージやトランザクションへの署名をユーザーに提案したりできるようになります。 詳細については、[MetaMaskのドキュメント](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)を参照してください。

`window.ethereum`が_存在しない_場合は、MeTaMaskがインストールされていないことを意味します。 その結果、空の文字列に設定された、返される`address`と、ユーザーがMetaMaskをインストールする必要があることを伝える`status`JSXオブジェクトが入ったJSONオブジェクトが返されます。

**これから記述するほとんどの関数は、状態変数(State Variable)とUIの更新に使用できるJSONオブジェクトを返します。**

`window.ethereum`が_存在_する場合、興味深いことが起こります。

try/catchループを使用して、`[window.ethereum.request({ method: "eth_requestAccounts" });](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)`を呼び出すことで、MetaMaskへの接続を試みます。 この関数を呼び出すと、ブラウザでMetaMaskが開き、ユーザーはウォレットを分散型アプリケーション(Dapp)に接続するように求められます。

- ユーザーが接続を選んだ場合、`method: "eth_requestAccounts"`は、分散型アプリケーション(Dapp)に接続されているすべてのユーザーのアカウントアドレスを含む配列を返します。 `connectWallet`関数は、配列内の_最初の_`address`と\(9 行目参照\)、ユーザーにスマートコントラクトにメッセージを書き込むように促す`status`メッセージが入ったJSONオブジェクトを返します。
- ユーザーが接続を拒否した場合、JSONオブジェクトには、返される`address`に入る空の文字列と、ユーザーが接続を拒否したことを示す`status`メッセージが入ることになります。

### Minter.js UIコンポーネントにconnectWallet関数を追加 {#add-connect-wallet}

`connectWallet`関数を記述したので、 `Minter.js`コンポーネントに接続しましょう。

まず、`Minter.js`ファイルの上部に`import { connectWallet } from "./utils/interact.js";`を追加して、`Minter.js`ファイルに関数をインポートする必要があります。 `Minter.js`の最初の11行は、次のようになります。

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

次に、`connectWalletPressed`関数の中で、インポートされた`connectWallet`関数を、以下のように呼び出します。

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

`interact.js`ファイルによって、機能の大部分が`Minter.js`コンポーネントからどのように抽象化されているかに注目してください。 これは、モデルビューコントローラ(M-V-C)パラダイムに準拠しているためです。

`connectWalletPressed`では、単にインポートされた`connectWallet`関数のawait呼び出しを行っています。さらに、そのレスポンスを使用し、`status`と`walletAddress`変数を状態フックを介して更新しています。

それでは、 `Minter.js`と `interact.js`の両方のファイルを保存して、これまでのUIをテストしてみましょう。

localhost:3000でブラウザを開き、ページ右上にある「Connect Wallet」ボタンを押します。

MetaMaskがインストールされている場合は、ウォレットを分散型アプリケーション(Dapp)に接続するように求められます。 接続リクエストを承認します。

ウォレットボタンに、接続した自分のアドレスが表示されているはずです。

次に、ページを更新してみてください。変ですね。 ウォレットボタンによって、すでに接続しているにもかかわらずMetaMaskに接続するよう求められます。

でも心配しないでください。 `getCurrentWalletConnected`という関数を実装することで、簡単にこれを修正できます。この関数は、アドレスが分散型アプリケーション(Dapp)にすでに接続されているかどうかを確認し、それに応じてUIを更新します。

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
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
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
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

このコードは、_非常に_前述の`connectWallet`関数に似ています。

主な違いとしては、ユーザーがウォレットに接続するためにMetaMaskを開く`eth_requestAccounts`メソッドを呼び出す代わりに、 ここでは`eth_accounts`メソッドを呼び出しています。これは、現在、分散型アプリケーション(Dapp)に接続されているMetaMaskのアドレスを含む配列を単に返すだけです。

この関数を動作させるため、`Minter.js`コンポーネントの`useEffect`関数で呼び出しましょう。

`connectWallet`で行ったのと同様に、この関数を`interact.js`ファイルから `Minter.js`ファイルへ次のようにインポートする必要があります。

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //import here
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

`walletAddress`状態変数と`status`状態変数を更新するのに、呼び出した`getCurrentWalletConnected`のレスポンスを使用していることに注目してください。

このコードを追加したら、ブラウザウィンドウを更新してみてください。 リフレッシュ後も、ボタンには接続されていることが示されており、接続されたウォレットのアドレスのプレビューが表示されているはずです。

### addWalletListenerの実装 {#implement-add-wallet-listener}

分散型アプリケーション(Dapp)ウォレットの設定の最終ステップは、ウォレットリスナーを実装することです。これにより、ユーザーが接続を切断したり、アカウントを切り替えたりした場合など、ウォレットの状態が変更されたときにUIが更新されます。

`Minter.js`ファイルで、次のような`addWalletListener`関数を追加してください。

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

ここで何が起きているか、簡単に見ていきましょう。

- まず、ブラウザで`window.ethereum`が有効になっているか\(すなわち MetaMaskがインストールされているか\)を関数がチェックしています。
  - 有効になっていない場合、ユーザーにMetaMaskのインストールを求めるJSX文字列を`status`状態変数に設定します。
  - 有効になっている場合、MetaMaskウォレットの状態変更をリッスンしている3行目の`window.ethereum.on("accountsChanged")`リスナーを設定します。この状態変更には、ユーザーが追加のアカウントを分散型アプリケーション(Dapp)に接続した場合、アカウントを切り替えた場合、アカウントを切断した場合が含まれます。 少なくとも1つのアカウントが接続されていれば、`accounts`配列の最初のアカウントがリスナーから返されたときに、`walletAddress`状態変数が更新されます。 それ以外の場合は、`walletAddress`に空の文字列が設定されます。

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

## 非代替性トークン(NFT)メタデータ入門 {#nft-metadata-101}

このチュートリアルの最初の方で説明した非代替性トークン(NFT)のメタデータを思い出してください。非代替性トークン(NFT)メタデータは、非代替性トークン(NFT)にデジタル資産、名前、説明、その他の属性などのプロパティーを持たせ、非代替性トークン(NFT)を利用できるようにします。

JSONオブジェクトとしてメタデータを設定し、保存する必要があります。これで、スマートコントラクトの`mintNFT`関数呼び出すときに`tokenURI`パラメータとして渡すことができます。

「Link to Asset」、「Name」、「Description」フィールドのテキストは、非代替性トークン(NFT)のメタデータで別々のプロパティになります。 メタデータをJSONオブジェクトとしてフォーマットしますが、このJSONオブジェクトの格納には、以下のような複数のオプションがあります。

- イーサリアムブロックチェーンに格納することができますが、これは非常に高価です。
- AWSやFirebaseなどの中央集権型サーバーに保存できます。 しかし、これは分散化の信念に反するものです。
- 惑星間ファイルシステム(IPFS)という、分散型ファイルシステムでデータを保存、共有するための、分散型プロトコルおよびピアツーピア・ネットワークを使用できます。 このプロトコルは、分散化されており無料のため、最良のオプションです。

惑星間ファイルシステム(IPFS)にメタデータを保存するには、[Pinata](https://pinata.cloud/)という便利な惑星間ファイルシステム(IPFS) APIとツールキットを使用します。 次のステップでは、この方法を具体的に説明します。

## Pinataを使用してメタデータをIPFSに固定化 {#use-pinata-to-pin-your-metadata-to-IPFS}

[Pinata](https://pinata.cloud/)アカウントをお持ちでない場合は、[こちら](https://pinata.cloud/signup)から無料のアカウントにサインアップし、メールアドレスとアカウントの認証手順を完了してください。

### Pinata APIキーの作成 {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys)ページに移動して、上部にある「New Key」ボタンを選択し、Adminウィジェットを有効(Enabled)に設定してからキーに名前を付けます。

API情報を含むポップアップが表示されます。 この情報は、必ず安全な場所に保存してください。

キーの設定が完了したので、プロジェクトに追加して使用できるようにしましょう。

### .envファイルの作成 {#create-a-env}

環境ファイルにPinataキーとシークレットを安全に保存できます。 [dotenvパッケージ](https://www.npmjs.com/package/dotenv)をプロジェクトディレクトリにインストールしましょう。

ターミナルで\(ローカルホストを実行しているタブとは別の\)新しいタブを開き、`minter-starter-files`フォルダにいることを確認してください。次に、ターミナルで以下のコマンドを実行します。

```text
npm install dotenv --save
```

次に、コマンドラインで次のように入力し、`.env`ファイルを`minter-starter-files`のルートディレクトリに作成します。

```javascript
vim.env
```

vim\(テキストエディタ\)で `.env`ファイルが開きます。 保存するには、キーボードで「esc」+「:」+「q」をこの順序で押します。

次に、VSCodeで`.env`ファイルに移動し、次のようにしてPinata APIキーとAPIシークレットを追加します。

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

ファイルを保存します。これで、JSONメタデータを惑星間ファイルシステム(IPFS)にアップロードする関数を書き始める準備が整いました。

### pinJSONToIPFSの実装 {#pin-json-to-ipfs}

幸いにもPinataでは、[惑星間ファイルシステム(IPFS)へのJSONデータのアップロードに特化したAPI](https://pinata.cloud/documentation#PinJSONToIPFS)と、少しの変更を加えるだけで使用できるaxiosのサンプルを備えた便利なJavaScriptを使用できます。

`utils`フォルダーに`pinata.js`という別のファイルを作成し、.envファイルからPinataのシークレットとキーをインポートしましょう。

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

次に、`pinata.js`ファイルに以下の追加コードを貼り付けます。 コードの意味はこれから説明しますので、心配する必要はありません。

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //making axios POST request to Pinata ⬇️
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

その下に、`pinJSONToIPFS`非同期関数があります。この関数は、`pinJSONToIPFS` APIへのPOSTリクエストを行うために、`JSONBody`を入力として取り、PinataのAPIキーとシークレットをヘッダーに入れます。

- POSTリクエストが成功した場合、この関数は、trueに設定された`success`ブール値と、メタデータがピン留めされた`pinataUrl`が入ったJSONオブジェクトを返します。 ここで返された`pinataUrl`は、スマートコントラクトのmint関数の`tokenURI`の入力として使用されます。
- POSTリクエストが失敗した場合、この関数は、falseに設定された`success`ブール値と、エラーを伝える`message`文字列が入ったJSONオブジェクトを返します。

`connectWallet`関数の戻り値の型と同様に、JSONオブジェクトが返されるので、そのパラメータを状態変数とUIの更新に使用できます。

## スマートコントラクトのロード {#load-your-smart-contract}

これで、`pinJSONToIPFS`関数を介して非代替性トークン(NFT)メタデータを惑星間ファイルシステム(IPFS)にアップロードする手段を手に入れました。次は、`mintNFT`関数を呼び出せるように、スマートコントラクトのインスタンスをロードする手段が必要です。

前述したように、このチュートリアルでは、[こちらの既存の非代替性トークン(NFT)スマートコントラクト](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)を使用します。ただし、この作成方法を学びたい、もしくは自分で作成したい場合は、[「非代替性トークン(NFT)の作り方」](https://docs.alchemyapi.io/alchemy/tutorials/how-to-create-an-nft)という別のチュートリアルを確認することを強くお勧めします。

### コントラクトアプリケーションバイナリインターフェース(ABI) {#contract-abi}

ファイルを詳しく調べてみると、`src`ディレクトリに`contract-abi.json`ファイルがあることが分かります。 アプリケーションバイナリインターフェース(ABI)は、コントラクトが呼び出す関数を指定し、関数が確実に意図しているフォーマットでデータを返すようにするために必要です。

さらに、イーサリアムブロックチェーンに接続してスマートコントラクトをロードするための、Alchemy APIキーとAlchemy Web3 APIも必要になります。

### Alchemy APIキーの作成 {#create-alchemy-api}

Alchemyのアカウントをお持ちでない場合は、[こちら](https://alchemy.com/?a=eth-org-nft-minter)から無料で登録できます。

Alchemyのアカウントを作成した後、アプリを作成することでAPIキーを生成することができます。 これにより、Ropstenテストネットワークへのリクエストが可能になります。

ナビゲーションバーの「Apps」にマウスを合わせて、「Create App」をクリックし、Alchemyダッシュボードの「Create App」ページに移動してください。

アプリに名前を付け(私たちは「My First NFT!」にしました)、簡単な説明を記述し、環境に「Staging」を選択(アプリのブックキーピングに使用)し、ネットワークに「Ropsten」を選択します。

「Create app」をクリックします。 アプリが下の表に表示されます。

HTTP Alchemy API URLを作成したので、クリップボードにコピーします。

それを`.env`ファイルに追加してみましょう。 これで.envファイル全体は、次のようになります。

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

コントラクトアプリケーションバイナリインターフェース(ABI)とAlchemy APIキーが用意できたので、[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)を使用してスマートコントラクトをロードする準備ができました。

### Alchemy Web3エンドポイントとコントラクトの設定 {#setup-alchemy-endpoint}

まず、[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)がインストールされていない場合は、ターミナルで次のようにホームディレクトリである`nft-minter-tutorial`に移動してインストールする必要があります。

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

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)は、[Web3.js](https://docs.web3js.org/)のラッパーであり、強化されたAPIメソッドや重要なメリットを提供し、Web3デベロッパーの負担を軽減します。 最小限の設定で使えるように設計されているので、アプリですぐに使用可能です。

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

## mintNFT関数の実装 {#implement-the-mintnft-function}

`interact.js`ファイル内に、`mintNFT`関数を定義しましょう。この関数は、名前が示すとおりに非代替性トークン(NFT)をミントします。

多数の非同期呼び出しを\(メタデータをIPFSにピン留めするためにPinataに対して、スマートコントラクトをロードするためにAlchemy Web3に対して、トランザクションに署名するためにMetaMaskに対して\)行うため、この関数もまた非同期になります。

この関数への3つの入力は、デジタル資産の`url`、`name`、`description`になります。 `connectWallet`関数の下に、次の関数シグネチャを追加してください。

```javascript
export const mintNFT = async (url, name, description) => {}
```

### 入力エラー処理 {#input-error-handling}

当然のこととして、関数の開始時に何らかの入力エラー処理を行うことは理にかなっています。入力パラメータが正しくない場合は、関数を終了するようにします。 関数の内部に次のコードを追加しましょう。

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

基本的に、入力パラメーターのいずれかが空の文字列である場合、falseに設定された`success`ブール値と、UIのすべてのフィールドに入力する必要があることを伝える`status`文字列が入ったJSONオブジェクトを返します。

### IPFSにメタデータをアップロード {#upload-metadata-to-ipfs}

メタデータが適切にフォーマットされていることを確認したら、次のステップは、それをJSONオブジェクトにラップし、作成した`pinJSONToIPFS`を介して惑星間ファイルシステム(IPFS)にアップロードすることです。

そのためにはまず、`pinJSONToIPFS`関数を`interact.js`ファイルにインポートする必要があります。 `interact.js`の最上部に、次の行を追加してください。

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

`pinJSONToIPFS`が、JSON本体を取ることを思い出してください。 そのため、呼び出す前に`url`、`name`、`description`パラメータをJSONオブジェクトにフォーマットする必要があります。

次のようにコードを更新して、`metadata`というJSONオブジェクトを作成し、この`metadata`パラメータを使用して`pinJSONToIPFS`を呼び出します。

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //make pinata call
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

`pinJSONToIPFS(metadata)`の呼び出しのレスポンスを、`pinataResponse`オブジェクトに格納していることに注目してください。 次に、このオブジェクトにエラーがないか解析します。

エラーがある場合、falseに設定された`success`ブール値と、呼び出しが失敗したことを伝える`status`文字列が入ったJSONオブジェクトを返します。 それ以外の場合は、`pinataURL`を`pinataResponse`から抽出し、それを`tokenURI`変数として格納します。

では、ファイルの先頭で初期化したAlchemy Web3 APIを使用して、スマートコントラクトをロードしてみましょう。 `mintNFT`関数の下部に次のコードの行を追加して、`window.contract`グローバル変数にコントラクトを設定します。

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

`mintNFT`関数に最後に追加するのは、イーサリアムのトランザクションです。

```javascript
//set up your Ethereum transaction
const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: window.ethereum.selectedAddress, // must match user's active address.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //make call to NFT smart contract
}

//sign the transaction via MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

イーサリアムトランザクションをすでによくご存知ならば、構造が今まで見てきたものとかなり似ていることに気付くでしょう。

- まず、トランザクションパラメータを設定します。
  - `to`に受取人のアドレス\(スマートコントラクト\)を設定します 。
  - `from`にトランザクションの署名者\(MetaMaskに接続されているユーザーのアドレス: `window.ethereum.selectedAddress`\)を指定します。
  - `data`には、スマートコントラクトの`mintNFT`メソッド呼び出しが含まれ、`tokenURI`とユーザーのウォレットのアドレス`window.ethereum.selectedAddress`を入力として受け取ります。
- 次に、`window.ethereum.request`をawaitで呼び出して、MetaMaskにトランザクションの署名を依頼します。 このリクエストで、ethメソッド\(eth_sendTransaction\)を指定し、`transactionParameters`を渡していることに注目してください。 この時点で、ブラウザでMetaMaskが開かれ、ユーザーにトランザクションの署名または拒否を求めます。
  - トランザクションが成功した場合、この関数は、trueに設定された`success`ブール値と、Etherscanでトランザクションについての詳細を確認するようユーザーに求める`status`文字列が入ったJSONオブジェクトを返します。
  - トランザクションが失敗した場合、この関数は、falseに設定された`success`ブール値と、エラーメッセージを伝える`status`文字列が入ったJSONオブジェクトを返します。

`mintNFT`関数全体は、次のようになります。

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata pin request
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //make call to NFT smart contract
  }

  //sign transaction via MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

巨大な関数でしたね! あとは、`mintNFT`関数を`Minter.js`コンポーネントに接続するだけです。

## mintNFTをMinter.jsフロントエンドに接続 {#connect-our-frontend}

`Minter.js`ファイルを開いて、上部の`import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";`の行を次のように更新してください。

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

最後に、次のように`onMintPressed`関数を実装し、インポートした`mintNFT`関数をawaitで呼び出します。さらに、`status`状態変数を更新し、トランザクションが成功したか失敗したかを反映させるようにします。

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## 稼働中のウェブサイトに非代替性トークン(NFT)をデプロイ {#deploy-your-NFT}

プロジェクトを稼働させてユーザーが使える準備ができましたでしょうか？ 稼働しているウェブサイトへMinterをデプロイする[チュートリアル](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online)をご覧ください。

次は最後のステップです。

## ブロックチェーンの世界を席巻しよう! {#take-the-blockchain-world-by-storm}

これは冗談です。あなたは、このチュートリアルを最後までやりきりました!

要約すると、非代替性トークン(NFT)ミンターを構築することで次の方法を学ぶことが出来ました。

- フロントエンドのプロジェクト経由でMetaMaskへアクセス
- フロントエンドからスマートコントラクトメソッドの呼び出し
- MetaMaskを使ったトランザクションの署名

ウォレットに分散型アプリケーション(Dapp)を介してミントされた非代替性トークン(NFT)を表示する方法については、[ウォレットに非代替性トークン(NFT)を表示する方法](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract/how-to-view-your-nft-in-your-wallet)という簡単なチュートリアルをご覧ください。

ご不明な点がありましたら、いつでも[Alchemy Discord](https://discord.gg/gWuC7zB)でお問い合わせください。 このチュートリアルのコンセプトが、今後のプロジェクトでどのように応用されるのか楽しみでなりません。
