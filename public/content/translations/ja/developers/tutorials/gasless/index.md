---
title: "ガス代のスポンサー: ユーザーのトランザクションコストを負担する方法"
description: "秘密鍵とアドレスを作成するのは簡単です。適切なソフトウェアを実行するだけです。しかし、世界にはトランザクションを送信するためのETHを入手するのがはるかに難しい場所がたくさんあります。このチュートリアルでは、ユーザーが署名したオフチェーンの構造化データをスマート・コントラクトで実行するためのオンチェーンのガスコストを負担する方法を学びます。ユーザーにトランザクション情報を含む構造体に署名してもらい、オフチェーンのコードがそれをトランザクションとしてブロックチェーンに送信します。"
author: "オリ・ポメランツ"
tags:
  - ガスレス
  - Solidity
  - EIP-712
  - メタトランザクション
skill: intermediate
breadcrumb: "ガスのスポンサー"
lang: ja
published: 2026-02-27
---

## はじめに {#introduction}

イーサリアムが[さらに10億人の人々](https://blog.ethereum.org/category/next-billion)に利用されるようにするには、摩擦を取り除き、可能な限り使いやすくする必要があります。この摩擦の原因の1つは、ガス代を支払うためにETHが必要になることです。

ユーザーから収益を得る分散型アプリケーション (dapp) がある場合、ユーザーにサーバー経由でトランザクションを送信させ、トランザクション手数料を自分で支払うのが理にかなっているかもしれません。ユーザーは依然としてウォレットで[EIP-712承認メッセージ](https://eips.ethereum.org/EIPS/eip-712)に署名するため、イーサリアムの完全性の保証は維持されます。可用性はトランザクションを中継するサーバーに依存するため、より制限されます。ただし、ユーザーが (ETHを入手した場合に) スマート・コントラクトに直接アクセスできるように設定したり、他の人がトランザクションのスポンサーになりたい場合に独自のサーバーを設定できるようにしたりすることも可能です。

このチュートリアルの手法は、スマート・コントラクトを制御している場合にのみ機能します。他のスマート・コントラクトへのトランザクションをスポンサーできる[アカウント抽象化](https://eips.ethereum.org/EIPS/eip-4337)などの他の手法もありますが、これについては将来のチュートリアルで取り上げたいと思います。

注意: これは本番レベルのコードでは_ありません_。重大な攻撃に対して脆弱であり、主要な機能が欠けています。詳細については、[このガイドの脆弱性セクション](#vulnerabilities)をご覧ください。

### 前提条件 {#prerequisites}

このチュートリアルを理解するには、以下の知識が必要です。

- Solidity
- JavaScript
- ReactとWAGMI。これらのユーザーインターフェースツールに慣れていない場合は、[そのためのチュートリアルがあります](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。

## サンプルアプリケーション {#sample-app}

ここでのサンプルアプリケーションは、Hardhatの`Greeter`コントラクトの変種です。[GitHubで](https://github.com/qbzzt/260301-gasless)確認できます。スマート・コントラクトはすでに[Sepolia](https://sepolia.dev/)のアドレス[`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA)にデプロイされています。

実際の動作を確認するには、以下の手順に従ってください。

1. リポジトリをクローンし、必要なソフトウェアをインストールします。

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. `.env`を編集して、`PRIVATE_KEY`をSepoliaにETHを持つウォレットに設定します。SepoliaのETHが必要な場合は、[フォーセットを使用してください](/developers/docs/networks/#sepolia)。理想的には、この秘密鍵はブラウザのウォレットにあるものとは異なるものにする必要があります。

3. サーバーを起動します。

   ```sh
   npm run dev
   ```

4. URL [`http://localhost:5173`](http://localhost:5173) でアプリケーションにアクセスします。

5. <strong>Connect with Injected</strong>をクリックしてウォレットに接続します。ウォレットで承認し、必要に応じてSepoliaへの変更を承認します。

6. 新しい挨拶を書き込み、**Update greeting via sponsor**をクリックします。

7. メッセージに署名します。

8. 約12秒 (Sepoliaのブロックタイム) 待ちます。待っている間、サーバーのコンソールにあるURLを見てトランザクションを確認できます。

9. 挨拶が変更され、最後に更新したアドレスの値がブラウザのウォレットのアドレスになっていることを確認します。

これがどのように機能するかを理解するには、ユーザーインターフェースでメッセージがどのように作成され、サーバーによってどのように中継され、スマート・コントラクトがそれをどのように処理するかを見る必要があります。

### ユーザーインターフェース {#ui-changes}

ユーザーインターフェースは[WAGMI](https://wagmi.sh/)に基づいています。詳細については[このチュートリアル](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)で読むことができます。

メッセージに署名する方法は次のとおりです。

```js
const signGreeting = useCallback(
```

Reactフックの[`useCallback`](https://react.dev/reference/react/useCallback)を使用すると、コンポーネントが再描画されるときに同じ関数を再利用することでパフォーマンスを向上させることができます。

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

アカウントがない場合は、エラーを発生させます。この場合、`signGreeting`を呼び出すプロセスを開始するUIボタンが無効になっているため、これは決して起こらないはずです。ただし、将来のプログラマーがその安全装置を削除する可能性があるため、ここでもこの条件を確認することをお勧めします。

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

[ドメインセパレータ](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)のパラメータです。この値は定数であるため、より最適化された実装では、関数が呼び出されるたびに再計算するのではなく、1回だけ計算するかもしれません。

- `name`は、署名を生成しているdappの名前など、ユーザーが読める名前です。
- `version`はバージョンです。異なるバージョンには互換性がありません。
- `chainId`は、[WAGMIによって](https://wagmi.sh/react/api/hooks/useChainId)提供される、使用しているチェーンです。
- `verifyingContract`は、この署名を検証するコントラクトのアドレスです。複数の`Greeter`コントラクトがあり、それぞれに異なる挨拶を持たせたい場合に備えて、同じ署名が複数のコントラクトに適用されないようにします。

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

署名するデータ型です。ここでは単一のパラメータ`greeting`がありますが、実際のシステムでは通常もっと多くなります。

```js
        const message = { greeting }
```

署名して送信したい実際のメッセージです。`greeting`はフィールド名であり、それを埋める変数の名前でもあります。

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

実際に署名を取得します。ユーザーがデータに署名するのには (コンピュータの観点から) 長い時間がかかるため、この関数は非同期です。

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

この関数は単一の16進数値を返します。ここではそれをフィールドに分割します。

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

これらの変数のいずれかが変更された場合は、関数の新しいインスタンスを作成します。`account`と`chainId`のパラメータは、ユーザーがウォレットで変更できます。`contractAddr`はチェーンIDの関数です。`signTypedDataAsync`は変更されないはずですが、[フックから](https://wagmi.sh/react/api/hooks/useSignTypedData)インポートしているため確実ではなく、ここに追加するのが最善です。

新しい挨拶に署名したので、それをサーバーに送信する必要があります。

```js
  const sponsoredGreeting = async () => {
    try {
```

この関数は署名を受け取り、サーバーに送信します。

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

アクセス元のサーバーのパス`/server/sponsor`に送信します。

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

`POST`を使用して、情報をJSONエンコードして送信します。

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

レスポンスを出力します。本番システムでは、ユーザーにもレスポンスを表示します。

### サーバー {#server}

私はフロントエンドとして[Vite](https://vite.dev/)を使用するのが好きです。Reactライブラリを自動的に提供し、フロントエンドのコードが変更されるとブラウザを更新します。ただし、Viteにはバックエンドのツールは含まれていません。

解決策は[`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js)にあります。

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // その他のすべてはViteに任せる
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

まず、自分たちで処理するリクエスト (`/server/sponsor`への`POST`) のハンドラーを登録します。次に、Viteサーバーを作成して使用し、他のすべてのURLを処理します。

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

これは単なる標準的な[viem](https://viem.sh/)のブロックチェーン呼び出しです。

### スマート・コントラクト {#smart-contract}

最後に、[`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol)は署名を検証する必要があります。

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

コンストラクタは、上記のユーザーインターフェースのコードと同様に、[ドメインセパレータ](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)を作成します。ブロックチェーンの実行ははるかにコストがかかるため、1回だけ計算します。

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

これが署名される構造体です。ここではフィールドが1つだけあります。

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

これは[構造体識別子](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct)です。ユーザーインターフェースで毎回計算されます。

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

この関数は署名されたリクエストを受け取り、挨拶を更新します。

```solidity
        // EIP-712ダイジェストを計算する
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

[EIP-712](https://eips.ethereum.org/EIPS/eip-712)に従ってダイジェストを作成します。

```solidity
        // 署名者を復元する
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

[`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01)を使用して署名者のアドレスを取得します。不正な署名でも有効なアドレス (ただしランダムなもの) が得られる可能性があることに注意してください。

```solidity
        // 署名者が呼び出したかのようにgreetingを適用する
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

挨拶を更新します。

## 脆弱性 {#vulnerabilities}

これは本番レベルのコードでは_ありません_。重大な攻撃に対して脆弱であり、主要な機能が欠けています。ここではそのいくつかを紹介し、解決方法を説明します。

これらの攻撃のいくつかを確認するには、_Attacks_見出しの下にあるボタンをクリックして何が起こるかを確認してください。**Invalid signature**ボタンについては、サーバーコンソールをチェックしてトランザクションのレスポンスを確認してください。

### サーバーでのサービス拒否 {#dos-on-server}

最も簡単な攻撃は、サーバーに対する[サービス拒否 (DoS)](https://en.wikipedia.org/wiki/Denial-of-service_attack)攻撃です。サーバーはインターネット上のどこからでもリクエストを受け取り、それらのリクエストに基づいてトランザクションを送信します。攻撃者が有効か無効かを問わず、大量の署名を発行するのを防ぐものは何もありません。それぞれがトランザクションを引き起こします。最終的に、サーバーはガス代を支払うためのETHを使い果たします。

この問題の1つの解決策は、レートを1ブロックあたり1トランザクションに制限することです。目的が[外部所有アカウント](/developers/docs/accounts/#key-differences)に挨拶を表示することである場合、ブロックの途中で挨拶が何であるかはとにかく重要ではありません。

別の解決策は、アドレスを追跡し、有効な顧客からの署名のみを許可することです。

### 誤った挨拶の署名 {#wrong-greeting-sigs}

<strong>Signature for wrong greeting</strong>をクリックすると、特定のアドレス (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) と挨拶 (`Hello`) に対する有効な署名を送信します。しかし、それは異なる挨拶で送信されます。これにより`ecrecover`が混乱し、挨拶は変更されますが、アドレスが間違ったものになります。

この問題を解決するには、[署名された構造体](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124)にアドレスを追加します。このようにすれば、`ecrecover`のランダムなアドレスは署名内のアドレスと一致せず、スマート・コントラクトはメッセージを拒否します。

### リプレイ攻撃 {#replay-attack}

<strong>Replay attack</strong>をクリックすると、「私は0xaA92c5d426430D4769c9E878C1333BDe3d689b3eで、挨拶を`Hello`にしたい」という同じ署名を、正しい挨拶とともに送信します。その結果、スマート・コントラクトは、そのアドレス (あなたのものではない) が挨拶を`Hello`に戻したと信じ込みます。これを行うための情報は、[トランザクション情報](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1)で公開されています。

これが問題になる場合、1つの解決策は[ナンス](https://en.wikipedia.org/wiki/Cryptographic_nonce)を追加することです。アドレスと数値の間の[マッピング](https://docs.soliditylang.org/en/latest/types.html#mapping-types)を用意し、署名にナンスフィールドを追加します。ナンスフィールドがアドレスのマッピングと一致する場合は、署名を受け入れ、次回のマッピングをインクリメントします。一致しない場合は、トランザクションを拒否します。

別の解決策は、署名されたデータにタイムスタンプを追加し、そのタイムスタンプから数秒間だけ署名を有効として受け入れることです。これはよりシンプルで安価ですが、時間枠内でのリプレイ攻撃のリスクや、時間枠を超えた場合の正当なトランザクションの失敗のリスクがあります。

## その他の不足している機能 {#other-missing-features}

本番環境で追加する機能は他にもあります。

### 他のサーバーからのアクセス {#other-servers}

現在、任意のアドレスが`sponsorSetGreeting`を送信できるようにしています。分散化の観点からは、これがまさに私たちが望むことかもしれません。あるいは、スポンサー付きのトランザクションが_私たちの_サーバーを経由することを確実にしたいかもしれません。その場合は、スマート・コントラクトで`msg.sender`をチェックします。

いずれにせよ、これは意識的な設計上の決定であるべきであり、単に問題について考えていなかった結果であってはなりません。

### エラー処理 {#error-handling}

ユーザーが挨拶を送信します。次のブロックで更新されるかもしれませんし、されないかもしれません。エラーは目に見えません。本番システムでは、ユーザーは以下のケースを区別できる必要があります。

- 新しい挨拶はまだ送信されていません
- 新しい挨拶は送信され、処理中です
- 新しい挨拶は拒否されました

## まとめ

現時点では、ある程度の中央集権化を犠牲にして、分散型アプリケーション (dapp) のユーザーにガスレスな体験を提供できるようになっているはずです。

ただし、これはERC-712をサポートするスマート・コントラクトでのみ機能します。たとえば、ERC-20トークンを送金するには、単なるメッセージではなく、所有者によってトランザクションが署名されている必要があります。最も簡単な解決策は、資産をEOAアドレスではなく、別のコントラクトに所有させることです（[アカウント抽象化](/roadmap/account-abstraction/)のシンプルな形式）。詳細については、[続編のチュートリアル](/developers/tutorials/gasless-token)で読むことができます。

[私の他の記事はこちらをご覧ください](https://cryptodocguy.pro/)。
