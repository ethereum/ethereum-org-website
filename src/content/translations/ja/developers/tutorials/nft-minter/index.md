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

Web2 のバックグラウンドを持つデベロッパーの最大の課題の 1 つは、スマートコントラクトをフロントエンドのプロジェクトに接続し、やり取りを行う方法を理解することです。

ここでは、デジタル資産へのリンク、タイトル、説明を入力できるシンプルな UI を備えた非代替性トークン(NFT)ミンターを構築することで、次の方法を学びます。

- フロントエンドのプロジェクト経由で MetaMask に接続する
- フロントエンドからスマートコントラクトメソッドを呼び出す
- MetaMask を使用してトランザクションに署名する

このチュートリアルでは、[React](https://reactjs.org/)をフロントエンドフレームワークとして使用します。 このチュートリアルは Web3 開発に焦点を当てているので、React の基礎についての説明に多くの時間を費やせません。 代わりに、プロジェクトの機能性を高めることに注力します。

前提条件として、React に関する初級レベルの知識を有している必要があります。つまり、コンポーネント、プロパティ(props)、useState および useEffect、基本関数の呼び出しなどの仕組みを理解している必要があります。 これらの中に初めて耳にする用語がある場合は、[React の入門チュートリアル](https://reactjs.org/tutorial/tutorial.html)をご覧ください。 より視覚的な学習を好む方には、Net Ninja による素晴らしい[フルモダン React チュートリアル](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)のビデオシリーズをお勧めします。

まだ Alchemy アカウントをお持ちでない場合、このチュートリアルを完了したり、ブロックチェーンで何かを構築したりするために必ず必要になりますので、 [こちらから](https://alchemy.com/)無料アカウントに登録してください。

それでは、さっそく始めましょう！

## 非代替性トークン(NFT)作成入門 {#making-nfts-101}

コードを見始める前に、非代替性トークン(NFT)作成の仕組みを理解することが重要です。 それには、次の 2 つのステップがあります。

### イーサリアムブロックチェーン上で非代替性トークン(NFT)スマートコントラクトを公開 {#publish-nft}

ERC-1155 と ERC-721 の 2 つのスマートコントラクト規格の最大の違いは、ERC-1155 はマルチトークン規格でありバッチ機能を備えているのに対し、ERC-721 はシングルトークン規格であり一度に 1 つのトークンの送信しかサポートしていないことです。

### ミント関数の呼び出し {#minting-function}

通常、このミント関数は、パラメータとして 2 つの変数を渡す必要があります。1 つ目は、新しくミントされた非代替性トークン(NFT)を受け取るアドレスを指定する`recipient`です。2 つ目は、非代替性トークン(NFT)のメタデータを記述する JSON ドキュメントに解決される文字列である非代替性トークン(NFT)の`tokenURI`です。

非代替性トークン(NFT)のメタデータは、非代替性トークン(NFT)に名前、説明、画像(または別のデジタル資産)、その他の属性などのプロパティを持たせ、非代替性トークン(NFT)を利用できるようにします。 非代替性トークン(NFT)のメタデータが含まれている[tokenURI の例](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)をご覧ください。

このチュートリアルでは、React UI を使用して既存の非代替性トークン(NFT)のスマートコントラクトのミント関数を呼び出すパート 2(後半)の方に焦点を当てています。

このチュートリアルで呼び出す ERC-721 非代替性トークン(NFT)スマートコントラクトへのリンクは、[こちら](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)です。 この作成方法について知りたい場合は、[非代替性トークン(NFT)の作り方](https://docs.alchemyapi.io/alchemy/tutorials/how-to-create-an-nft)という別のチュートリアルを確認することを強くお勧めします。

非代替性トークン(NFT)作成の仕組みを理解したところで、スターターファイルをクローンしましょう。

## スターターファイルのクローン {#clone-the-starter-files}

最初に、[非代替性トークン(NFT)ミンターチュートリアル(nft-minter-tutorial)の GitHub リポジトリ](https://github.com/alchemyplatform/nft-minter-tutorial)にアクセスし、このプロジェクトのスターターファイルを取得します。 リポジトリをローカル環境にクローンします。

クローンされた`nft-minter-tutorial`リポジトリを開くと、`minter-starter-files`と`nft-minter`という 2 つのフォルダが含まれています。

- `minter-starter-files`には、このプロジェクトのスターターファイル(基本的には React UI)が含まれています。 このチュートリアルでは、イーサリアムウォレットと非代替性トークン(NFT)スマートコントラクトに接続することで、この UI を利用できるようにする方法を学ぶ際に、**こちらのディレクトリで作業します**。
- `nft-minter`には、完成したチュートリアル全体が含まれており、**困ったときに\*\***リファレンス\*\*として利用できます。

次に、コードエディタで`minter-starter-files`のコピーを開き、`src`フォルダに移動します。

これから作成するすべてのコードは、`src`フォルダに保存されます。 後ほど`Minter.js`コンポーネントを編集し、追加の javascript ファイルを書くことで、このプロジェクトに Web3 機能を追加します。

## ステップ 2: スターターファイルの確認 {#step-2-check-out-our-starter-files}

コーディングを始める前に、スターターファイルで既に提供されるものを確認することが重要です。

### React プロジェクトの実行 {#get-your-react-project-running}

まずは、ブラウザで React プロジェクトを実行しましょう。 React の素晴らしいところは、一度ブラウザでプロジェクトを実行すると、保存した変更がブラウザでも同時に更新されることです。

プロジェクトを実行するには、次のようにターミナルで`minter-starter-files`フォルダのルートディレクトリに移動し、`npm install`を実行してプロジェクトの依存関係をインストールします。

```bash
cd minter-starter-files
npm install
```

インストールが完了したら、ターミナルで`npm start`を実行します。

```bash
npm start
```

これにより、ブラウザで http://localhost:3000/が開き、プロジェクトのフロントエンドが表示されます。 フロントエンドは 3 つのフィールドで構成されており、それぞれ、非代替性トークン(NFT)資産へのリンク、非代替性トークン(NFT)の名前、非代替性トークン(NFT)の説明を入力する場所になっています。

「Connect Wallet」や「Mint NFT」ボタンをクリックしても、動作しません。これらの機能は、これからプログラムする必要があります。 :\)

### Minter.js コンポーネント {#minter-js}

**注:** `minter-starter-files`フォルダにいることを確認してください。`nft-minter`フォルダではないことを確認します。

エディタの`src`フォルダに戻り、`Minter.js`ファイルを開きましょう。 このファイルには、これから作業を進めていく主要な React コンポーネントが含まれています。すべての内容を理解することが非常に重要です。

このファイルの上部には、特定のイベントの後に更新される状態変数(State Variable)があります。

```javascript
//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React の状態変数や状態フック(State Hook)を聞いたことがない場合は、 [こちらの](https://reactjs.org/docs/hooks-state.html)ドキュメントをご覧ください。

それぞれの変数は以下を示します。

- `walletAddress` - ユーザーのウォレットアドレスを格納する文字列
- `status` - UI の下部に表示するメッセージを含む文字列
- `name` - 非代替性トークン(NFT)の名前を格納する文字列
- `description` - 非代替性トークン(NFT)の説明を格納する文字列
- `url` - 非代替性トークン(NFT)のデジタル資産へのリンクを含んだ文字列

状態変数(State Variable)の後に、`useEffect`、`connectWalletPressed`、`onMintPressed`という 3 つの未実装の関数があります。 これらの関数は、すべて`async`になっています。これは、それぞれの関数で非同期 API 呼び出しを行うためです。 それぞれの関数の名前は、その機能を示しています。

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

- [`useEffect`](https://reactjs.org/docs/hooks-effect.html) - コンポーネントがレンダリングされた後に呼び出される React フックです。 空の配列`[]`の prop が渡される(3 行目を参照)ため、コンポーネントの*最初*のレンダリングでのみ呼び出されます。 ここでは、ウォレットリスナーと別のウォレット関数を呼び出し、ウォレットが接続されているかどうかに応じた UI の更新をします。
- `connectWalletPressed` - この関数は、ユーザーの MataMask ウォレットを分散型アプリケーション(Dapp)に接続するために呼び出されます。
- `onMintPressed` - この関数は、ユーザーの非代替性トークン(NFT)をミントするために呼び出されます。

このファイルの終盤には、コンポーネントの UI があります。 このコードを注意深く読んでいくと、状態変数の`url`、`name`、`description`に対応するテキストフィールドの入力が変更された場合、これらの変数を更新していることが分かります。

さらに、`walletButton`または`mintButton`という ID を持つボタンがクリックされると、それぞれ`connectWalletPressed`または`onMintPressed`が呼び出されることも分かります。

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

他のすべてのコンポーネントのコンテナとして機能する、React のメインコンポーネントである`App.js`ファイルを表示すると、ミンター(Minter)コンポーネントが 7 行目に挿入されていることが分かります。

**このチュートリアルでは、`Minter.js`ファイルの編集と、`src`フォルダへのファイルの追加のみを行います。**

これから取り組む内容を理解したところで、イーサリアムウォレットを設定しましょう。

## : イーサリアムウォレットの設定{#set-up-your-ethereum-wallet}

ユーザーがスマートコントラクトとやり取りできるようにするには、自分のイーサリアムウォレットを分散型アプリケーション(Dapp)に接続する必要があります。

### MetaMask をダウンロード {#download-metamask}

このチュートリアルでは、イーサリアムアカウントアドレスを管理するためにブラウザの仮想ウォレットである Metamask を使用します。 イーサリアムのトランザクションの仕組みの詳細については、[こちらのページ](/developers/docs/transactions/)をご覧ください。

Metamask のアカウントは[こちら](https://metamask.io/download.html)から無料でダウンロード、作成できます。 アカウントを作成後、またはすでにアカウントをお持ちの場合は、(実際に支払いが発生しないように)右上の「Ropsten Test Network」に切り替えてください。

### フォーセットからイーサ(ETH)を追加 {#add-ether-from-faucet}

非代替性トークン(NFT)をミントする(または、イーサリアムのブロックチェーンのトランザクションに署名する)には、偽の ETH が必要です。 ETH を取得するには、[Ropsten フォーセット](https://faucet.ropsten.be/)にアクセスして、Ropsten アカウントアドレスを入力し、「Send Ropsten ETH」をクリックします。 Metamask アカウントに ETH が表示されるはずです。

### 残高の確認 {#check-your-balance}

残高を再確認するために、[Alchemy のコンポーザーツール](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)を使用して[eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)をリクエストしてみましょう。 このリクエストをすると、ウォレット内の ETH の額が返されます。 MetaMask アカウントアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されます。

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注:** この結果の単位は、ETH ではなく wei です。 wei は ETH の最小単位として使われています。 wei から ETH へ変換すると、1 eth = 10¹⁸ wei になります。 つまり、0xde0b6b3a7640000 を 10 進数に変換すると、1\*10¹⁸ となり、1 ETH に相当します。

ふう! これで、偽のお金を手に入れました。 <Emoji text=":money_mouth_face:" size={1} />

## MetaMask を UI に接続 {#connect-metamask-to-your-UI}

MetaMask ウォレットが設定されたので、分散型アプリケーション(Dapp)を接続しましょう。

[モデルビューコントローラ(MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)パラダイムを実践したいので、別のファイルを作成し、分散型アプリケーション(Dapp)のロジック、データ、ルールを管理する関数を含めます。次に、それらの関数をフロントエンド(Minter.js コンポーネント)に渡します。

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

`window.ethereum`は、MetaMask および他のウォレットプロバイダーによって挿入されるグローバル API であり、ウェブサイトがユーザーのイーサリアムアカウントを要求できるようにするものです。 承認されると、ユーザーが接続しているブロックチェーンからデータを読み取ったり、メッセージやトランザクションへの署名をユーザーに提案したりできるようになります。 詳細については、[MetaMask のドキュメント](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)を参照してください。

`window.ethereum`が*存在しない*場合は、MeTaMask がインストールされていないことを意味します。 その結果、空の文字列に設定された、返される`address`と、ユーザーが MetaMask をインストールする必要があることを伝える`status`JSX オブジェクトが入った JSON オブジェクトが返されます。

**これから記述するほとんどの関数は、状態変数(State Variable)と UI の更新に使用できる JSON オブジェクトを返します。**

`window.ethereum`が*存在*する場合、興味深いことが起こります。

try/catch ループを使用して、`[window.ethereum.request({ method: "eth_requestAccounts" });](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)`を呼び出すことで、MetaMask への接続を試みます。 この関数を呼び出すと、ブラウザで MetaMask が開き、ユーザーはウォレットを分散型アプリケーション(Dapp)に接続するように求められます。

- ユーザーが接続を選んだ場合、`method: "eth_requestAccounts"`は、分散型アプリケーション(Dapp)に接続されているすべてのユーザーのアカウントアドレスを含む配列を返します。 `connectWallet`関数は、配列内の*最初の*`address`と\(9 行目参照\)、ユーザーにスマートコントラクトにメッセージを書き込むように促す`status`メッセージが入った JSON オブジェクトを返します。
- ユーザーが接続を拒否した場合、JSON オブジェクトには、返される`address`に入る空の文字列と、ユーザーが接続を拒否したことを示す`status`メッセージが入ることになります。

### Minter.js UI コンポーネントに connectWallet 関数を追加 {#add-connect-wallet}

`connectWallet`関数を記述したので、 `Minter.js`コンポーネントに接続しましょう。

まず、`Minter.js`ファイルの上部に`import { connectWallet } from "./utils/interact.js";`を追加して、`Minter.js`ファイルに関数をインポートする必要があります。 `Minter.js`の最初の 11 行は、次のようになります。

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

`connectWalletPressed`では、単にインポートされた`connectWallet`関数の await 呼び出しを行っています。さらに、そのレスポンスを使用し、`status`と`walletAddress`変数を状態フックを介して更新しています。

それでは、 `Minter.js`と `interact.js`の両方のファイルを保存して、これまでの UI をテストしてみましょう。

localhost:3000 でブラウザを開き、ページ右上にある「Connect Wallet」ボタンを押します。

MetaMask がインストールされている場合は、ウォレットを分散型アプリケーション(Dapp)に接続するように求められます。 接続リクエストを承認します。

ウォレットボタンに、接続した自分のアドレスが表示されているはずです。

次に、ページを更新してみてください。変ですね。 ウォレットボタンによって、すでに接続しているにもかかわらず MetaMask に接続するよう求められます。

でも心配しないでください。 `getCurrentWalletConnected`という関数を実装することで、簡単にこれを修正できます。この関数は、アドレスが分散型アプリケーション(Dapp)にすでに接続されているかどうかを確認し、それに応じて UI を更新します。

### getCurrentWalletConnected 関数 {#get-current-wallet}

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

このコードは、*非常に*前述の`connectWallet`関数に似ています。

主な違いとしては、ユーザーがウォレットに接続するために MetaMask を開く`eth_requestAccounts`メソッドを呼び出す代わりに、 ここでは`eth_accounts`メソッドを呼び出しています。これは、現在、分散型アプリケーション(Dapp)に接続されている MetaMask のアドレスを含む配列を単に返すだけです。

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

### addWalletListener の実装 {#implement-add-wallet-listener}

分散型アプリケーション(Dapp)ウォレットの設定の最終ステップは、ウォレットリスナーを実装することです。これにより、ユーザーが接続を切断したり、アカウントを切り替えたりした場合など、ウォレットの状態が変更されたときに UI が更新されます。

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

- まず、ブラウザで`window.ethereum`が有効になっているか\(すなわち MetaMask がインストールされているか\)を関数がチェックしています。
  - 有効になっていない場合、ユーザーに MetaMask のインストールを求める JSX 文字列を`status`状態変数に設定します。
  - 有効になっている場合、MetaMask ウォレットの状態変更をリッスンしている 3 行目の`window.ethereum.on("accountsChanged")`リスナーを設定します。この状態変更には、ユーザーが追加のアカウントを分散型アプリケーション(Dapp)に接続した場合、アカウントを切り替えた場合、アカウントを切断した場合が含まれます。 少なくとも 1 つのアカウントが接続されていれば、`accounts`配列の最初のアカウントがリスナーから返されたときに、`walletAddress`状態変数が更新されます。 それ以外の場合は、`walletAddress`に空の文字列が設定されます。

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

JSON オブジェクトとしてメタデータを設定し、保存する必要があります。これで、スマートコントラクトの`mintNFT`関数呼び出すときに`tokenURI`パラメータとして渡すことができます。

「Link to Asset」、「Name」、「Description」フィールドのテキストは、非代替性トークン(NFT)のメタデータで別々のプロパティになります。 メタデータを JSON オブジェクトとしてフォーマットしますが、この JSON オブジェクトの格納には、以下のような複数のオプションがあります。

- イーサリアムブロックチェーンに格納することができますが、これは非常に高価です。
- AWS や Firebase などの中央集権型サーバーに保存できます。 しかし、これは分散化の信念に反するものです。
- 惑星間ファイルシステム(IPFS)という、分散型ファイルシステムでデータを保存、共有するための、分散型プロトコルおよびピアツーピア・ネットワークを使用できます。 このプロトコルは、分散化されており無料のため、最良のオプションです。

惑星間ファイルシステム(IPFS)にメタデータを保存するには、[Pinata](https://pinata.cloud/)という便利な惑星間ファイルシステム(IPFS) API とツールキットを使用します。 次のステップでは、この方法を具体的に説明します。

## メタデータを惑星間ファイルシステム(IPFS)にピン留めする Pintata の使用 {#use-pinata-to-pin-your-metadata-to-IPFS}

[Pinata](https://pinata.cloud/)アカウントをお持ちでない場合は、[こちら](https://pinata.cloud/signup)から無料のアカウントにサインアップし、メールアドレスとアカウントの認証手順を完了してください。

### Pinata API キーの作成 {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys)ページに移動して、上部にある「New Key」ボタンを選択し、Admin ウィジェットを有効(Enabled)に設定してからキーに名前を付けます。

API 情報を含むポップアップが表示されます。 この情報は、必ず安全な場所に保存してください。

キーの設定が完了したので、プロジェクトに追加して使用できるようにしましょう。

### .env ファイルの作成 {#create-a-env}

環境ファイルに Pinata キーとシークレットを安全に保存できます。 [dotenv パッケージ](https://www.npmjs.com/package/dotenv)をプロジェクトディレクトリにインストールしましょう。

ターミナルで\(ローカルホストを実行しているタブとは別の\)新しいタブを開き、`minter-starter-files`フォルダにいることを確認してください。次に、ターミナルで以下のコマンドを実行します。

```text
npm install dotenv --save
```

次に、コマンドラインで次のように入力し、`.env`ファイルを`minter-starter-files`のルートディレクトリに作成します。

```javascript
vim.env
```

vim\(テキストエディタ\)で `.env`ファイルが開きます。 保存するには、キーボードで「esc」+「:」+「q」をこの順序で押します。

次に、VSCode で`.env`ファイルに移動し、次のようにして Pinata API キーと API シークレットを追加します。

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

ファイルを保存します。これで、JSON メタデータを惑星間ファイルシステム(IPFS)にアップロードする関数を書き始める準備が整いました。

### pinJSONToIPFS の実装 {#pin-json-to-ipfs}

幸いにも Pinata では、[惑星間ファイルシステム(IPFS)への JSON データのアップロードに特化した API](https://pinata.cloud/documentation#PinJSONToIPFS)と、少しの変更を加えるだけで使用できる axios のサンプルを備えた便利な JavaScript を使用できます。

`utils`フォルダーに`pinata.js`という別のファイルを作成し、.env ファイルから Pinata のシークレットとキーをインポートしましょう。

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

最初に、ブラウザと node.js のための Promise ベースの HTTP クライアントである[axios](https://www.npmjs.com/package/axios)をインポートしています。axios は、Pinata へのリクエストで使用します。

その下に、`pinJSONToIPFS`非同期関数があります。この関数は、`pinJSONToIPFS` API への POST リクエストを行うために、`JSONBody`を入力として取り、Pinata の API キーとシークレットをヘッダーに入れます。

- POST リクエストが成功した場合、この関数は、true に設定された`success`ブール値と、メタデータがピン留めされた`pinataUrl`が入った JSON オブジェクトを返します。 ここで返された`pinataUrl`は、スマートコントラクトの mint 関数の`tokenURI`の入力として使用されます。
- POST リクエストが失敗した場合、この関数は、false に設定された`success`ブール値と、エラーを伝える`message`文字列が入った JSON オブジェクトを返します。

`connectWallet`関数の戻り値の型と同様に、JSON オブジェクトが返されるので、そのパラメータを状態変数と UI の更新に使用できます。

## スマートコントラクトのロード {#load-your-smart-contract}

これで、`pinJSONToIPFS`関数を介して非代替性トークン(NFT)メタデータを惑星間ファイルシステム(IPFS)にアップロードする手段を手に入れました。次は、`mintNFT`関数を呼び出せるように、スマートコントラクトのインスタンスをロードする手段が必要です。

前述したように、このチュートリアルでは、[こちらの既存の非代替性トークン(NFT)スマートコントラクト](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)を使用します。ただし、この作成方法を学びたい、もしくは自分で作成したい場合は、[「非代替性トークン(NFT)の作り方」](https://docs.alchemyapi.io/alchemy/tutorials/how-to-create-an-nft)という別のチュートリアルを確認することを強くお勧めします。

### コントラクトアプリケーションバイナリインターフェース(ABI) {#contract-abi}

ファイルを詳しく調べてみると、`src`ディレクトリに`contract-abi.json`ファイルがあることが分かります。 アプリケーションバイナリインターフェース(ABI)は、コントラクトが呼び出す関数を指定し、関数が確実に意図しているフォーマットでデータを返すようにするために必要です。

さらに、イーサリアムブロックチェーンに接続してスマートコントラクトをロードするための、Alchemy API キーと Alchemy Web3 API も必要になります。

### Alchemy API キーの作成 {#create-alchemy-api}

Alchemy のアカウントをお持ちでない場合は、[こちら](https://alchemy.com/?a=eth-org-nft-minter)から無料で登録できます。

Alchemy のアカウントを作成した後、アプリを作成することで API キーを生成することができます。 これにより、Ropsten テストネットワークへのリクエストが可能になります。

ナビゲーションバーの「Apps」にマウスを合わせて、「Create App」をクリックし、Alchemy ダッシュボードの「Create App」ページに移動してください。

アプリに名前を付け(私たちは「My First NFT!」にしました)、簡単な説明を記述し、環境に「Staging」を選択(アプリのブックキーピングに使用)し、ネットワークに「Ropsten」を選択します。

「Create app」をクリックします。 アプリが下の表に表示されます。

HTTP Alchemy API URL を作成したので、クリップボードにコピーします。

それを`.env`ファイルに追加してみましょう。 これで.env ファイル全体は、次のようになります。

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

コントラクトアプリケーションバイナリインターフェース(ABI)と Alchemy API キーが用意できたので、[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)を使用してスマートコントラクトをロードする準備ができました。

### Alchemy Web3 エンドポイントとコントラクトの設定 {#setup-alchemy-endpoint}

まず、[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)がインストールされていない場合は、ターミナルで次のようにホームディレクトリである`nft-minter-tutorial`に移動してインストールする必要があります。

```text
cd ..
npm install @alch/alchemy-web3
```

次に、`interact.js`ファイルに戻りましょう。 .env ファイルから Alchemy キーがインポートされ、Alchemy Web3 エンドポイントが設定されるように、ファイルの上部に次のコードを追加します。

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)は、[Web3.js](https://web3js.readthedocs.io/en/v1.2.9/)のラッパーであり、強化された API メソッドや重要なメリットを提供し、Web3 デベロッパーの負担を軽減します。 最小限の設定で使えるように設計されているので、アプリですぐに使用可能です。

次に、コントラクトアプリケーションバイナリインターフェース(ABI)とコントラクトアドレスをファイルに追加しましょう。

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

これで両方を追加できたので、mint 関数のコーディングを始める準備ができました。

## mintNFT 関数の実装 {#implement-the-mintnft-function}

`interact.js`ファイル内に、`mintNFT`関数を定義しましょう。この関数は、名前が示すとおりに非代替性トークン(NFT)をミントします。

多数の非同期呼び出しを\(メタデータを IPFS にピン留めするために Pinata に対して、スマートコントラクトをロードするために Alchemy Web3 に対して、トランザクションに署名するために MetaMask に対して\)行うため、この関数もまた非同期になります。

この関数への 3 つの入力は、デジタル資産の`url`、`name`、`description`になります。 `connectWallet`関数の下に、次の関数シグネチャを追加してください。

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

基本的に、入力パラメーターのいずれかが空の文字列である場合、false に設定された`success`ブール値と、UI のすべてのフィールドに入力する必要があることを伝える`status`文字列が入った JSON オブジェクトを返します。

### IPFS にメタデータをアップロード {#upload-metadata-to-ipfs}

メタデータが適切にフォーマットされていることを確認したら、次のステップは、それを JSON オブジェクトにラップし、作成した`pinJSONToIPFS`を介して惑星間ファイルシステム(IPFS)にアップロードすることです。

そのためにはまず、`pinJSONToIPFS`関数を`interact.js`ファイルにインポートする必要があります。 `interact.js`の最上部に、次の行を追加してください。

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

`pinJSONToIPFS`が、JSON 本体を取ることを思い出してください。 そのため、呼び出す前に`url`、`name`、`description`パラメータを JSON オブジェクトにフォーマットする必要があります。

次のようにコードを更新して、`metadata`という JSON オブジェクトを作成し、この`metadata`パラメータを使用して`pinJSONToIPFS`を呼び出します。

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

エラーがある場合、false に設定された`success`ブール値と、呼び出しが失敗したことを伝える`status`文字列が入った JSON オブジェクトを返します。 それ以外の場合は、`pinataURL`を`pinataResponse`から抽出し、それを`tokenURI`変数として格納します。

では、ファイルの先頭で初期化した Alchemy Web3 API を使用して、スマートコントラクトをロードしてみましょう。 `mintNFT`関数の下部に次のコードの行を追加して、`window.contract`グローバル変数にコントラクトを設定します。

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
  - `from`にトランザクションの署名者\(MetaMask に接続されているユーザーのアドレス: `window.ethereum.selectedAddress`\)を指定します。
  - `data`には、スマートコントラクトの`mintNFT`メソッド呼び出しが含まれ、`tokenURI`とユーザーのウォレットのアドレス`window.ethereum.selectedAddress`を入力として受け取ります。
- 次に、`window.ethereum.request`を await で呼び出して、MetaMask にトランザクションの署名を依頼します。 このリクエストで、eth メソッド\(eth_sendTransaction\)を指定し、`transactionParameters`を渡していることに注目してください。 この時点で、ブラウザで MetaMask が開かれ、ユーザーにトランザクションの署名または拒否を求めます。
  - トランザクションが成功した場合、この関数は、true に設定された`success`ブール値と、Etherscan でトランザクションについての詳細を確認するようユーザーに求める`status`文字列が入った JSON オブジェクトを返します。
  - トランザクションが失敗した場合、この関数は、false に設定された`success`ブール値と、エラーメッセージを伝える`status`文字列が入った JSON オブジェクトを返します。

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

## mintNFT を Minter.js フロントエンドに接続 {#connect-our-frontend}

`Minter.js`ファイルを開いて、上部の`import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";`の行を次のように更新してください。

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

最後に、次のように`onMintPressed`関数を実装し、インポートした`mintNFT`関数を await で呼び出します。さらに、`status`状態変数を更新し、トランザクションが成功したか失敗したかを反映させるようにします。

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## 稼働中のウェブサイトに非代替性トークン(NFT)をデプロイ {#deploy-your-NFT}

プロジェクトを稼働させてユーザーが使える準備ができましたでしょうか？ 稼働しているウェブサイトへ Minter をデプロイする[チュートリアル](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online)をご覧ください。

次は最後のステップです。

## ブロックチェーンの世界を席巻しよう! {#take-the-blockchain-world-by-storm}

これは冗談です。あなたは、このチュートリアルを最後までやりきりました!

要約すると、非代替性トークン(NFT)ミンターを構築することで次の方法を学ぶことが出来ました。

- フロントエンドのプロジェクト経由で MetaMask へアクセス
- フロントエンドからスマートコントラクトメソッドの呼び出し
- MetaMask を使ったトランザクションの署名

ウォレットに分散型アプリケーション(Dapp)を介してミントされた非代替性トークン(NFT)を表示する方法については、[ウォレットに非代替性トークン(NFT)を表示する方法](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract/how-to-view-your-nft-in-your-wallet)という簡単なチュートリアルをご覧ください。

ご不明な点がありましたら、いつでも[Alchemy Discord](https://discord.gg/gWuC7zB)でお問い合わせください。 このチュートリアルのコンセプトが、今後のプロジェクトでどのように応用されるのか楽しみでなりません。
