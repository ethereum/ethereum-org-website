---
title: "NFTミントチュートリアル"
description: "このチュートリアルでは、NFTミンターを構築し、メタマスクとWeb3ツールを使用してスマート・コントラクトをReactフロントエンドに接続することで、フルスタックの分散型アプリケーション (dapp) を作成する方法を学びます。"
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "スマート・コントラクト", "フロントエンド", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: "NFTミンターdapp"
lang: ja
published: 2021-10-06
---

Web2のバックグラウンドを持つ開発者にとって最大の課題の1つは、スマート・コントラクトをフロントエンドプロジェクトに接続し、それとやり取りする方法を理解することです。

デジタル資産へのリンク、タイトル、説明を入力できるシンプルなUIであるNFTミンターを構築することで、以下の方法を学びます。

- フロントエンドプロジェクトを介してメタマスクに接続する
- フロントエンドからスマート・コントラクトのメソッドを呼び出す
- メタマスクを使用してトランザクションに署名する

このチュートリアルでは、フロントエンドフレームワークとして[React](https://react.dev/)を使用します。このチュートリアルは主にWeb3開発に焦点を当てているため、Reactの基礎を解説することに多くの時間は費やしません。代わりに、プロジェクトに機能をもたらすことに焦点を当てます。

前提条件として、Reactの初心者レベルの理解（コンポーネント、props、useState/useEffect、および基本的な関数呼び出しの仕組み）が必要です。これらの用語を聞いたことがない場合は、この[React入門チュートリアル](https://react.dev/learn/tutorial-tic-tac-toe)を確認することをお勧めします。視覚的に学びたい方には、Net Ninjaによる素晴らしい[Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)ビデオシリーズを強くお勧めします。

また、まだお持ちでない場合は、このチュートリアルを完了し、ブロックチェーン上で何かを構築するために、Alchemyアカウントが絶対に必要になります。[こちら](https://alchemy.com/)から無料アカウントにサインアップしてください。

それでは、さっそく始めましょう！

## NFT作成の基礎 {#making-nfts-101}

コードを見始める前に、NFTの作成がどのように機能するかを理解することが重要です。これには2つのステップが含まれます。

### イーサリアムブロックチェーン上にNFTスマート・コントラクトを公開する {#publish-nft}

2つのNFTスマート・コントラクト標準の最大の違いは、ERC-1155がマルチトークン標準でありバッチ機能を含んでいるのに対し、ERC-721はシングルトークン標準であるため、一度に1つのトークンの転送しかサポートしていないことです。

### ミンティング関数を呼び出す {#minting-function}

通常、このミンティング関数では、パラメータとして2つの変数を渡す必要があります。1つ目は新しくミントされたNFTを受け取るアドレスを指定する`recipient`、2つ目はNFTのメタデータを記述したJSONドキュメントに解決される文字列であるNFTの`tokenURI`です。

NFTのメタデータは、名前、説明、画像（または別のデジタル資産）、その他の属性などのプロパティを持たせることで、NFTに命を吹き込むものです。NFTのメタデータを含む[tokenURIの例はこちら](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)です。

このチュートリアルでは、パート2である、React UIを使用して既存のNFTのスマート・コントラクトのミンティング関数を呼び出すことに焦点を当てます。

このチュートリアルで呼び出すERC-721 NFTスマート・コントラクトへの[リンクはこちら](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)です。その作成方法を学びたい場合は、別のチュートリアルである[「NFTの作成方法」](https://www.alchemy.com/docs/how-to-create-an-nft)を確認することを強くお勧めします。

素晴らしい！NFTの作成方法を理解したところで、スターターファイルをクローンしましょう！

## スターターファイルをクローンする {#clone-the-starter-files}

まず、[nft-minter-tutorialのGitHubリポジトリ](https://github.com/alchemyplatform/nft-minter-tutorial)にアクセスして、このプロジェクトのスターターファイルを取得します。このリポジトリをローカル環境にクローンしてください。

このクローンした`nft-minter-tutorial`リポジトリを開くと、`minter-starter-files`と`nft-minter`の2つのフォルダが含まれていることに気づくでしょう。

- `minter-starter-files`には、このプロジェクトのスターターファイル（基本的にはReact UI）が含まれています。このチュートリアルでは、このUIをイーサリアムウォレットとNFTスマート・コントラクトに接続して機能させる方法を学ぶため、**このディレクトリで作業します**。
- `nft-minter`には、完成したチュートリアル全体が含まれており、**行き詰まった場合の参考**として用意されています。

次に、コードエディタで`minter-starter-files`のコピーを開き、`src`フォルダに移動します。

記述するコードはすべて`src`フォルダ内に配置されます。`Minter.js`コンポーネントを編集し、プロジェクトにWeb3機能を追加するための追加のJavaScriptファイルを記述します。

## ステップ2: スターターファイルを確認する {#step-2-check-out-our-starter-files}

コーディングを始める前に、スターターファイルで既に提供されているものを確認することが重要です。

### Reactプロジェクトを実行する {#get-your-react-project-running}

ブラウザでReactプロジェクトを実行することから始めましょう。Reactの素晴らしい点は、プロジェクトをブラウザで実行すると、保存した変更がブラウザ上でリアルタイムに更新されることです。

プロジェクトを実行するには、`minter-starter-files`フォルダのルートディレクトリに移動し、ターミナルで`npm install`を実行してプロジェクトの依存関係をインストールします。

```bash
cd minter-starter-files
npm install
```

インストールが完了したら、ターミナルで`npm start`を実行します。

```bash
npm start
```

これにより、ブラウザで http://localhost:3000/ が開き、プロジェクトのフロントエンドが表示されるはずです。これは3つのフィールドで構成されています。NFTの資産へのリンクを入力する場所、NFTの名前を入力する場所、そして説明を提供する場所です。

「Connect Wallet」または「Mint NFT」ボタンをクリックしようとすると、機能しないことに気づくでしょう。これは、まだその機能をプログラミングする必要があるためです！ :\)

### Minter.jsコンポーネント {#minter-js}

**注:** `nft-minter`フォルダではなく、`minter-starter-files`フォルダにいることを確認してください！

エディタで`src`フォルダに戻り、`Minter.js`ファイルを開きましょう。これは私たちが作業する主要なReactコンポーネントであるため、このファイル内のすべてを理解することが非常に重要です。

このファイルの上部には、特定のイベント後に更新する状態（state）変数があります。

```javascript
//状態変数
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Reactの状態変数やステートフックについて聞いたことがありませんか？[こちら](https://legacy.reactjs.org/docs/hooks-state.html)のドキュメントを確認してください。

各変数が表すものは次のとおりです。

- `walletAddress` - ユーザーのウォレットアドレスを格納する文字列
- `status` - UIの下部に表示するメッセージを含む文字列
- `name` - NFTの名前を格納する文字列
- `description` - NFTの説明を格納する文字列
- `url` - NFTのデジタル資産へのリンクである文字列

状態変数の後には、未実装の3つの関数、`useEffect`、`connectWalletPressed`、および`onMintPressed`があります。これらの関数はすべて`async`であることに気づくでしょう。これは、その中で非同期API呼び出しを行うためです！それらの名前は、その機能にちなんで名付けられています。

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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - これは、コンポーネントがレンダリングされた後に呼び出されるReactフックです。空の配列`[]`プロパティが渡されているため（3行目を参照）、コンポーネントの_最初_のレンダリング時にのみ呼び出されます。ここでは、ウォレットリスナーと別のウォレット関数を呼び出して、ウォレットが既に接続されているかどうかを反映するようにUIを更新します。
- `connectWalletPressed` - この関数は、ユーザーのメタマスクウォレットを分散型アプリケーション (dapp) に接続するために呼び出されます。
- `onMintPressed` - この関数は、ユーザーのNFTをミントするために呼び出されます。

このファイルの終わり近くに、コンポーネントのUIがあります。このコードを注意深く見ると、対応するテキストフィールドの入力が変更されたときに、`url`、`name`、および`description`の状態変数を更新していることがわかります。

また、IDが`mintButton`と`walletButton`のボタンがそれぞれクリックされたときに、`connectWalletPressed`と`onMintPressed`が呼び出されることもわかります。

```javascript
//コンポーネントのUI
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
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
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

最後に、このMinterコンポーネントがどこに追加されるかについて説明します。

他のすべてのコンポーネントのコンテナとして機能するReactのメインコンポーネントである`App.js`ファイルに移動すると、Minterコンポーネントが7行目に挿入されていることがわかります。

**このチュートリアルでは、`Minter.js file`のみを編集し、`src`フォルダにファイルを追加します。**

作業内容を理解したところで、イーサリアムウォレットをセットアップしましょう！

## イーサリアムウォレットをセットアップする {#set-up-your-ethereum-wallet}

ユーザーがスマート・コントラクトとやり取りできるようにするには、イーサリアムウォレットをdappに接続する必要があります。

### メタマスクをダウンロードする {#download-metamask}

このチュートリアルでは、イーサリアムアカウントアドレスを管理するために使用されるブラウザ内の仮想ウォレットであるメタマスクを使用します。イーサリアム上のトランザクションの仕組みについて詳しく知りたい場合は、[こちらのページ](/developers/docs/transactions/)を確認してください。

[こちら](https://metamask.io/download)から無料でメタマスクアカウントをダウンロードして作成できます。アカウントを作成する際、または既にアカウントを持っている場合は、右上の「ロプステンテストネットワーク」に切り替えてください（実際の資金を扱わないようにするためです）。

### フォーセットからイーサを追加する {#add-ether-from-faucet}

NFTをミントする（またはイーサリアムブロックチェーン上でトランザクションに署名する）には、偽のETHが必要です。ETHを取得するには、[ロプステンフォーセット](https://faucet.ropsten.be/)にアクセスしてロプステンアカウントアドレスを入力し、「Send Ropsten Eth」をクリックします。すぐにメタマスクアカウントにETHが表示されるはずです！

### 残高を確認する {#check-your-balance}

残高があることを再確認するために、[Alchemyのコンポーザーツール](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)を使用して[eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)リクエストを行いましょう。これにより、ウォレット内のETHの量が返されます。メタマスクアカウントアドレスを入力して「Send Request」をクリックすると、次のような応答が表示されるはずです。

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注:** この結果はETHではなくWeiです。Weiはイーサの最小単位として使用されます。WeiからETHへの変換は、1 ETH = 10¹⁸ Weiです。したがって、0xde0b6b3a7640000を10進数に変換すると1\*10¹⁸となり、1 ETHに等しくなります。

ふう！偽のお金がすべて揃いました！ <Emoji text=":money_mouth_face:" size={1} />

## メタマスクをUIに接続する {#connect-metamask-to-your-ui}

メタマスクウォレットのセットアップが完了したので、dappをそれに接続しましょう！

[MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)パラダイムに従うため、dappのロジック、データ、ルールを管理する関数を含む別のファイルを作成し、それらの関数をフロントエンド（Minter.jsコンポーネント）に渡します。

### `connectWallet`関数 {#connect-wallet-function}

これを行うには、`src`ディレクトリに`utils`という新しいフォルダを作成し、その中に`interact.js`というファイルを追加します。このファイルには、ウォレットとスマート・コントラクトのやり取りに関するすべての関数が含まれます。

`interact.js`ファイルに`connectWallet`関数を記述し、それをインポートして`Minter.js`コンポーネントで呼び出します。

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
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
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

このコードが何を行うかを分解してみましょう。

まず、関数はブラウザで`window.ethereum`が有効になっているかどうかを確認します。

`window.ethereum`は、メタマスクやその他のウォレットプロバイダーによって挿入されるグローバルAPIであり、ウェブサイトがユーザーのイーサリアムアカウントを要求できるようにします。承認されると、ユーザーが接続しているブロックチェーンからデータを読み取り、ユーザーにメッセージやトランザクションへの署名を提案できます。詳細については、[メタマスクのドキュメント](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)を確認してください！

`window.ethereum`が存在_しない_場合、それはメタマスクがインストールされていないことを意味します。これによりJSONオブジェクトが返され、返される`address`は空の文字列になり、`status` JSXオブジェクトはユーザーがメタマスクをインストールする必要があることを伝えます。

**私たちが記述する関数のほとんどは、状態変数とUIを更新するために使用できるJSONオブジェクトを返します。**

さて、`window.ethereum`が存在_する_場合、ここからが面白くなります。

try/catchループを使用して、[`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)を呼び出すことでメタマスクへの接続を試みます。この関数を呼び出すと、ブラウザでメタマスクが開き、ユーザーはウォレットをdappに接続するように求められます。

- ユーザーが接続を選択した場合、`method: "eth_requestAccounts"`はdappに接続されているユーザーのすべてのアカウントアドレスを含む配列を返します。全体として、`connectWallet`関数は、この配列の_最初_の`address`（9行目を参照）と、ユーザーにスマート・コントラクトへのメッセージの書き込みを促す`status`メッセージを含むJSONオブジェクトを返します。
- ユーザーが接続を拒否した場合、JSONオブジェクトには返される`address`の空の文字列と、ユーザーが接続を拒否したことを反映する`status`メッセージが含まれます。

### Minter.js UIコンポーネントにconnectWallet関数を追加する {#add-connect-wallet}

この`connectWallet`関数を記述したので、それを`Minter.js.`コンポーネントに接続しましょう。

まず、`Minter.js`ファイルの上部に`import { connectWallet } from "./utils/interact.js";`を追加して、関数を`Minter.js`ファイルにインポートする必要があります。`Minter.js`の最初の11行は次のようになります。

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

次に、`connectWalletPressed`関数内で、インポートした`connectWallet`関数を次のように呼び出します。

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

機能のほとんどが`interact.js`ファイルから`Minter.js`コンポーネントから抽象化されていることに注目してください。これはM-V-Cパラダイムに準拠するためです！

`connectWalletPressed`では、インポートした`connectWallet`関数に対して単にawait呼び出しを行い、その応答を使用して、ステートフックを介して`status`および`walletAddress`変数を更新します。

それでは、`Minter.js`と`interact.js`の両方のファイルを保存し、これまでのUIをテストしてみましょう。

ブラウザで localhost:3000 を開き、ページの右上にある「Connect Wallet」ボタンを押します。

メタマスクがインストールされている場合は、ウォレットをdappに接続するように求められるはずです。接続の招待を承認します。

ウォレットボタンにアドレスが接続されていることが反映されるはずです。

次に、ページを更新してみてください...これは奇妙です。ウォレットボタンは、既に接続されているにもかかわらず、メタマスクを接続するように求めています...

でも心配しないでください！`getCurrentWalletConnected`という関数を実装することで、これを簡単に修正できます。この関数は、アドレスが既にdappに接続されているかどうかを確認し、それに応じてUIを更新します！

### getCurrentWalletConnected関数 {#get-current-wallet}

`interact.js`ファイルに、次の`getCurrentWalletConnected`関数を追加します。

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
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
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

このコードは、先ほど記述した`connectWallet`関数に_非常に_似ています。

主な違いは、ユーザーがウォレットを接続するためにメタマスクを開くメソッド`eth_requestAccounts`を呼び出す代わりに、ここでは現在dappに接続されているメタマスクアドレスを含む配列を単に返すメソッド`eth_accounts`を呼び出すことです。

この関数の動作を確認するために、`Minter.js`コンポーネントの`useEffect`関数で呼び出してみましょう。

`connectWallet`で行ったように、この関数を`interact.js`ファイルから`Minter.js`ファイルに次のようにインポートする必要があります。

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //ここにインポート
} from "./utils/interact.js"
```

これで、`useEffect`関数で単に呼び出すだけです。

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

`getCurrentWalletConnected`への呼び出しの応答を使用して、`walletAddress`および`status`状態変数を更新していることに注目してください。

このコードを追加したら、ブラウザウィンドウを更新してみてください。ボタンには接続されていることが表示され、更新後でも接続されているウォレットのアドレスのプレビューが表示されるはずです！

### addWalletListenerを実装する {#implement-add-wallet-listener}

dappウォレットのセットアップの最後のステップは、ユーザーがアカウントを切断したり切り替えたりしたときなど、ウォレットの状態が変化したときにUIが更新されるようにウォレットリスナーを実装することです。

`Minter.js`ファイルに、次のような関数`addWalletListener`を追加します。

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
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

ここで何が起こっているかを簡単に分解してみましょう。

- まず、関数は`window.ethereum`が有効になっているか（つまり、メタマスクがインストールされているか）を確認します。
  - 有効になっていない場合は、`status`状態変数を、ユーザーにメタマスクのインストールを促すJSX文字列に設定するだけです。
  - 有効になっている場合は、3行目にリスナー`window.ethereum.on("accountsChanged")`を設定します。これは、ユーザーが追加のアカウントをdappに接続したとき、アカウントを切り替えたとき、またはアカウントを切断したときなど、メタマスクウォレットの状態の変化をリッスンします。少なくとも1つのアカウントが接続されている場合、`walletAddress`状態変数は、リスナーによって返される`accounts`配列の最初のアカウントとして更新されます。それ以外の場合、`walletAddress`は空の文字列として設定されます。

最後に、これを`useEffect`関数で呼び出す必要があります。

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

これで完成です！ウォレット機能のすべてのプログラミングが完了しました！ウォレットのセットアップが完了したので、NFTをミントする方法を考えましょう！

## NFTメタデータの基礎 {#nft-metadata-101}

このチュートリアルのステップ0で話したNFTメタデータを覚えていますか。これはNFTに命を吹き込み、デジタル資産、名前、説明、その他の属性などのプロパティを持たせることを可能にします。

このメタデータをJSONオブジェクトとして構成して保存し、スマート・コントラクトの`mintNFT`関数を呼び出すときに`tokenURI`パラメータとして渡せるようにする必要があります。

「Link to Asset」、「Name」、「Description」フィールドのテキストは、NFTのメタデータのさまざまなプロパティを構成します。このメタデータをJSONオブジェクトとしてフォーマットしますが、このJSONオブジェクトを保存する場所にはいくつかのオプションがあります。

- イーサリアムブロックチェーン上に保存することもできますが、そうすると非常に費用がかかります。
- AWSやFirebaseのような中央集権型サーバーに保存することもできます。しかし、それでは分散化の精神に反してしまいます。
- 分散型ファイルシステムでデータを保存および共有するための分散型プロトコルおよびピア・ツー・ピアネットワークであるIPFSを使用できます。このプロトコルは分散型であり無料であるため、これが最良のオプションです！

メタデータをIPFSに保存するには、便利なIPFS APIおよびツールキットである[Pinata](https://pinata.cloud/)を使用します。次のステップで、その正確な方法を説明します！

## Pinataを使用してメタデータをIPFSにピン留めする {#use-pinata-to-pin-your-metadata-to-ipfs}

[Pinata](https://pinata.cloud/)アカウントをお持ちでない場合は、[こちら](https://app.pinata.cloud/auth/signup)から無料アカウントにサインアップし、メールアドレスとアカウントを確認する手順を完了してください。

### Pinata APIキーを作成する {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys)ページに移動し、上部の「New Key」ボタンを選択して、Adminウィジェットを有効に設定し、キーに名前を付けます。

その後、API情報を含むポップアップが表示されます。これを安全な場所に保管してください。

キーのセットアップが完了したので、プロジェクトに追加して使用できるようにしましょう。

### .envファイルを作成する {#create-a-env}

Pinataキーとシークレットは環境ファイルに安全に保存できます。プロジェクトディレクトリに[dotenvパッケージ](https://www.npmjs.com/package/dotenv)をインストールしましょう。

ターミナルで新しいタブを開き（ローカルホストを実行しているものとは別に）、`minter-starter-files`フォルダにいることを確認してから、ターミナルで次のコマンドを実行します。

```text
npm install dotenv --save
```

次に、コマンドラインに次のように入力して、`minter-starter-files`のルートディレクトリに`.env`ファイルを作成します。

```javascript
vim.env
```

これにより、vim（テキストエディタ）で`.env`ファイルが開きます。保存するには、キーボードで「esc」+「:」+「q」の順に押します。

次に、VSCodeで`.env`ファイルに移動し、次のようにPinata APIキーとAPIシークレットを追加します。

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

ファイルを保存すると、JSONメタデータをIPFSにアップロードする関数の記述を開始する準備が整います！

### pinJSONToIPFSを実装する {#pin-json-to-ipfs}

幸いなことに、Pinataには[JSONデータをIPFSにアップロードするための専用API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json)と、わずかな変更で使用できる便利なaxiosを使用したJavaScriptの例があります。

`utils`フォルダに、`pinata.js`という別のファイルを作成し、次のように.envファイルからPinataシークレットとキーをインポートしましょう。

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

次に、以下の追加コードを`pinata.js`ファイルに貼り付けます。心配しないでください、すべてが何を意味するかを分解して説明します！

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

では、このコードは正確に何を行うのでしょうか？

まず、ブラウザおよびNode.js用のプロミスベースのHTTPクライアントである[axios](https://www.npmjs.com/package/axios)をインポートします。これを使用してPinataにリクエストを行います。

次に、非同期関数`pinJSONToIPFS`があります。これは、入力として`JSONBody`を受け取り、ヘッダーにPinata APIキーとシークレットを受け取り、すべて`pinJSONToIPFS` APIへのPOSTリクエストを行うためのものです。

- このPOSTリクエストが成功した場合、関数は`success`ブール値をtrueとし、メタデータがピン留めされた`pinataUrl`を含むJSONオブジェクトを返します。返されたこの`pinataUrl`を、スマート・コントラクトのミント関数への`tokenURI`入力として使用します。
- このPOSTリクエストが失敗した場合、関数は`success`ブール値をfalseとし、エラーを伝える`message`文字列を含むJSONオブジェクトを返します。

`connectWallet`関数の戻り値の型と同様に、JSONオブジェクトを返しているため、そのパラメータを使用して状態変数とUIを更新できます。

## スマート・コントラクトをロードする {#load-your-smart-contract}

`pinJSONToIPFS`関数を介してNFTメタデータをIPFSにアップロードする方法ができたので、スマート・コントラクトの`mintNFT`関数を呼び出せるように、スマート・コントラクトのインスタンスをロードする方法が必要になります。

前述のように、このチュートリアルでは[この既存のNFTスマート・コントラクト](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)を使用します。ただし、その作成方法を学びたい場合、または自分で作成したい場合は、別のチュートリアルである[「NFTの作成方法」](https://www.alchemy.com/docs/how-to-create-an-nft)を確認することを強くお勧めします。

### コントラクトABI {#contract-abi}

ファイルを注意深く調べた場合、`src`ディレクトリに`contract-abi.json`ファイルがあることに気づいたでしょう。ABIは、コントラクトがどの関数を呼び出すかを指定し、関数が期待する形式でデータを返すことを保証するために必要です。

また、イーサリアムブロックチェーンに接続してスマート・コントラクトをロードするために、Alchemy APIキーとAlchemy Web3 APIも必要になります。

### Alchemy APIキーを作成する {#create-alchemy-api}

まだAlchemyアカウントをお持ちでない場合は、[こちらから無料でサインアップしてください。](https://alchemy.com/?a=eth-org-nft-minter)

Alchemyアカウントを作成したら、アプリを作成してAPIキーを生成できます。これにより、ロプステンテストネットワークにリクエストを行うことができます。

ナビゲーションバーの「Apps」にカーソルを合わせ、「Create App」をクリックして、Alchemyダッシュボードの「Create App」ページに移動します。

アプリに名前を付け（私たちは「My First NFT!」を選びました）、短い説明を提供し、アプリの簿記に使用する環境として「Staging」を選択し、ネットワークとして「Ropsten」を選択します。

「Create app」をクリックすれば完了です！アプリが下の表に表示されるはずです。

素晴らしい！HTTP Alchemy API URLを作成したので、クリップボードにコピーしてください...

…そして、それを`.env`ファイルに追加しましょう。全体として、.envファイルは次のようになります。

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

コントラクトABIとAlchemy APIキーが揃ったので、[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)を使用してスマート・コントラクトをロードする準備が整いました。

### Alchemy Web3エンドポイントとコントラクトをセットアップする {#setup-alchemy-endpoint}

まず、まだインストールしていない場合は、ターミナルでホームディレクトリ`nft-minter-tutorial`に移動して、[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)をインストールする必要があります。

```text
cd ..
npm install @alch/alchemy-web3
```

次に、`interact.js`ファイルに戻りましょう。ファイルの上部に次のコードを追加して、.envファイルからAlchemyキーをインポートし、Alchemy Web3エンドポイントをセットアップします。

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)は[Web3.js](https://docs.web3js.org/)のラッパーであり、強化されたAPIメソッドやその他の重要な利点を提供して、Web3開発者としての生活を楽にします。最小限の構成で済むように設計されているため、アプリですぐに使用を開始できます！

次に、コントラクトABIとコントラクトアドレスをファイルに追加しましょう。

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

これら両方が揃ったら、ミント関数のコーディングを開始する準備が整います！

## mintNFT関数を実装する {#implement-the-mintnft-function}

`interact.js`ファイル内で、その名の通りNFTをミントする関数`mintNFT`を定義しましょう。

多数の非同期呼び出し（メタデータをIPFSにピン留めするためのPinata、スマート・コントラクトをロードするためのAlchemy Web3、およびトランザクションに署名するためのメタマスク）を行うため、関数も非同期になります。

関数への3つの入力は、デジタル資産の`url`、`name`、および`description`になります。`connectWallet`関数の下に次の関数シグネチャを追加します。

```javascript
export const mintNFT = async (url, name, description) => {}
```

### 入力エラー処理 {#input-error-handling}

当然のことながら、関数の開始時に何らかの入力エラー処理を行うことは理にかなっているため、入力パラメータが正しくない場合はこの関数を終了します。関数内に次のコードを追加しましょう。

```javascript
export const mintNFT = async (url, name, description) => {
  //エラー処理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

基本的に、入力パラメータのいずれかが空の文字列である場合、`success`ブール値がfalseであり、`status`文字列がUIのすべてのフィールドに入力する必要があることを伝えるJSONオブジェクトを返します。

### メタデータをIPFSにアップロードする {#upload-metadata-to-ipfs}

メタデータが適切にフォーマットされていることがわかったら、次のステップはそれをJSONオブジェクトにラップし、記述した`pinJSONToIPFS`を介してIPFSにアップロードすることです！

これを行うには、まず`pinJSONToIPFS`関数を`interact.js`ファイルにインポートする必要があります。`interact.js`の一番上に次を追加しましょう。

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

`pinJSONToIPFS`はJSONボディを受け取ることを思い出してください。したがって、それを呼び出す前に、`url`、`name`、および`description`パラメータをJSONオブジェクトにフォーマットする必要があります。

コードを更新して`metadata`というJSONオブジェクトを作成し、この`metadata`パラメータを使用して`pinJSONToIPFS`を呼び出しましょう。

```javascript
export const mintNFT = async (url, name, description) => {
  //エラー処理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //メタデータを作成
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinataを呼び出す
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

`pinJSONToIPFS(metadata)`への呼び出しの応答を`pinataResponse`オブジェクトに保存していることに注目してください。次に、このオブジェクトを解析してエラーがないか確認します。

エラーがある場合は、`success`ブール値がfalseであり、`status`文字列が呼び出しに失敗したことを伝えるJSONオブジェクトを返します。それ以外の場合は、`pinataResponse`から`pinataURL`を抽出し、それを`tokenURI`変数として保存します。

これで、ファイルの上部で初期化したAlchemy Web3 APIを使用してスマート・コントラクトをロードする時間です。`mintNFT`関数の下部に次のコード行を追加して、コントラクトを`window.contract`グローバル変数に設定します。

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

`mintNFT`関数に追加する最後のものは、イーサリアムトランザクションです。

```javascript
//イーサリアムのトランザクションを設定する
const transactionParameters = {
  to: contractAddress, // コントラクトの公開時を除き必須。
  from: window.ethereum.selectedAddress, // ユーザーのアクティブなアドレスと一致する必要があります。
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFTスマート・コントラクトを呼び出す
}

//メタマスク経由でトランザクションに署名する
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

イーサリアムトランザクションに既に精通している場合は、構造がこれまで見たものと非常に似ていることに気づくでしょう。

- まず、トランザクションパラメータをセットアップします。
  - `to`は受信者アドレス（スマート・コントラクト）を指定します
  - `from`はトランザクションの署名者（メタマスクに接続されているユーザーのアドレス：`window.ethereum.selectedAddress`）を指定します
  - `data`には、スマート・コントラクトの`mintNFT`メソッドへの呼び出しが含まれており、入力として`tokenURI`とユーザーのウォレットアドレス`window.ethereum.selectedAddress`を受け取ります
- 次に、メタマスクにトランザクションへの署名を要求するawait呼び出し`window.ethereum.request,`を行います。このリクエストでは、ethメソッド（eth_SentTransaction）を指定し、`transactionParameters`を渡していることに注目してください。この時点で、ブラウザでメタマスクが開き、ユーザーにトランザクションへの署名または拒否を求めます。
  - トランザクションが成功した場合、関数はブール値`success`がtrueに設定され、`status`文字列がユーザーにトランザクションの詳細についてEtherscanを確認するように促すJSONオブジェクトを返します。
  - トランザクションが失敗した場合、関数は`success`ブール値がfalseに設定され、`status`文字列がエラーメッセージを伝えるJSONオブジェクトを返します。

全体として、`mintNFT`関数は次のようになります。

```javascript
export const mintNFT = async (url, name, description) => {
  //エラー処理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //メタデータを作成
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinataのpinリクエスト
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //スマート・コントラクトを読み込む
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //イーサリアムのトランザクションを設定する
  const transactionParameters = {
    to: contractAddress, // コントラクトの公開時を除き必須。
    from: window.ethereum.selectedAddress, // ユーザーのアクティブなアドレスと一致する必要があります。
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //NFTスマート・コントラクトを呼び出す
  }

  //メタマスク経由でトランザクションに署名する
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

これは巨大な関数ですね！あとは、`mintNFT`関数を`Minter.js`コンポーネントに接続するだけです...

## mintNFTをMinter.jsフロントエンドに接続する {#connect-our-frontend}

`Minter.js`ファイルを開き、上部の`import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";`行を次のように更新します。

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

最後に、`onMintPressed`関数を実装して、インポートした`mintNFT`関数へのawait呼び出しを行い、トランザクションが成功したか失敗したかを反映するように`status`状態変数を更新します。

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## ライブウェブサイトにNFTをデプロイする {#deploy-your-nft}

ユーザーがやり取りできるようにプロジェクトをライブにする準備はできましたか？ミンターをライブウェブサイトにデプロイするための[こちらのチュートリアル](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online)を確認してください。

最後のステップ...

## ブロックチェーンの世界に旋風を巻き起こす {#take-the-blockchain-world-by-storm}

冗談です、チュートリアルの最後までたどり着きましたね！

要約すると、NFTミンターを構築することで、以下の方法を無事に学びました。

- フロントエンドプロジェクトを介してメタマスクに接続する
- フロントエンドからスマート・コントラクトのメソッドを呼び出す
- メタマスクを使用してトランザクションに署名する

おそらく、dappを介してミントされたNFTをウォレットで披露したいと思うでしょう。そのため、クイックチュートリアル[「ウォレットでNFTを表示する方法」](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)を必ず確認してください！

そして、いつものように、質問がある場合は[Alchemyのディスコード](https://discord.gg/gWuC7zB)でお手伝いします。このチュートリアルの概念を将来のプロジェクトにどのように適用するかを見るのが待ちきれません！