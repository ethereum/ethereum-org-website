---
title: "ERC-7730を使用してプロトコルにクリア・サイニングを追加する"
description: "ユーザーが署名する前にウォレットに人間が読める詳細を表示できるように、ERC-7730記述子（ディスクリプタ）を記述する方法を学びます。"
author: "ヘスター・ブルイクマン"
lang: ja
tags: ["ERC-7730", "セキュリティ", "署名", "スマート・コントラクト", "ウォレット"]
skill: intermediate
breadcrumb: "クリア・サイニング"
published: 2026-05-11
---

ほとんどの主要なイーサリアム（Ethereum）の悪用には、同じ最終ステップがありました。それは、ユーザーが意味を理解できないトランザクションを承認することです。ハードウェア・ウォレットは生の16進数のコールデータを表示し、さらに悪いことにブラインド署名をオンにすることを強制します。ソフトウェア・ウォレットはデコードされたフィールドを表示しますが、それはコントラクトを認識した場合のみです。プロトコルが新しい、アプリが侵害されている、またはデバイスがオフラインであるなどの理由で認識できない場合、ユーザーはブラインド署名を行います。

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)は、コントラクトの関数呼び出しが「何を意味するか」を記述するための標準的なJSONフォーマットを定義しています。

ERC-7730をサポートするウォレットは、記述子を読み取り、次のように表示します。

> **スワップ**  
> 送信: 1,000 USDC  
> 最小受信: 0.42 WETH  
> プロトコル: ユニスワップ V3

または、人間とエージェントの両方が読めるように構築された1つの文として表示します。

> 1,000 USDCを少なくとも0.42 WETHにスワップする

関数セレクタと生の整数値のリストの代わりに、このように表示されます。

これが[クリア・サイニング](https://clearsigning.org/)、つまり「見たものが署名するもの（What You See Is What You Sign）」です。このチュートリアルでは、独自のコントラクト用の記述子を作成し、公式のCLIツールで検証し、オープンなレジストリに送信する手順を説明します。

## 前提条件 {#prerequisites}

- Solidityおよびスマート・コントラクトのABIに関する知識
- 検証済みのABIを持つデプロイされたスマート・コントラクト（記述子がレジストリに受け入れられるには、[Sourcify](https://sourcify.dev)での検証が必要です）
- 検証CLI用のPython 3.12以上
- JSONの基本的な知識

## ERC-7730記述子とは？ {#what-is-an-erc-7730-descriptor}

記述子は、3つのセクションを持つ単一のJSONファイルです。

| セクション | 目的 |
| :---- | :---- |
| `context` | チェーンIDとアドレスによって、記述子を特定のコントラクトのデプロイにバインドします |
| `metadata` | プロジェクトに名前を付け、再利用可能な定数を定義します |
| `display` | 各関数シグネチャを、人間が読めるラベルとフィールドフォーマットにマッピングします |

記述子はコントラクト自体とは分離されているため、再デプロイすることなく、既存のプロトコルにクリア・サイニングのサポートを追加できます。ウォレットはレジストリから記述子を取得し、署名時に使用します。

## ステップ1: ファイルのスケルトンを作成する {#step-1-create-the-file-skeleton}

`calldata-<contractname>-<descriptorversion>.json`という名前のファイルを作成します。`calldata-`というプレフィックスは、型付きデータメッセージ用の`eip712-`とは対照的に、この記述子がコントラクトの関数呼び出しをカバーしていることをレジストリに伝えます。`descriptorversion`は、記述子ファイルのバージョンをレジストリに伝えます。バージョンが提供されていない場合はデフォルトで0になります。


```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {},
  "metadata": {},
  "display": {
    "formats": {}
  }
}
```

## ステップ2: コンテキストセクションを記述する {#step-2-write-the-context-section}

`context`セクションは、記述子を1つ以上のコントラクトのデプロイにバインドします。ウォレットはこれを使用して、受信したトランザクションを正しい記述子と照合します。

```json
"context": {
  "$id": "uniswap-v3-router-mainnet",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### コンテキストフィールド {#context-fields}

- `context.$id` — この記述子ドキュメントまたはデプロイ構成の一意の識別子。
- `contract.deployments` — この記述子が適用されるデプロイのセット。
- `deployments[].chainId` — デプロイのEVMチェーンID。コントラクトがデプロイされているすべてのチェーンを含めます。
- `deployments[].address` — ウォレットがこの記述子に関連付けるべきコントラクトのアドレス。実行ロジックを保持する実装アドレスを使用します。

## ステップ3: メタデータセクションを記述する {#step-3-write-the-metadata-section}

メタデータセクションは、このファイルで記述されているプロジェクトとコントラクトに関する人間が読める情報を提供します。ウォレットは、署名中にプロトコル名、リンク、その他のコンテキストの詳細を表示するためにこの情報を使用する場合があります。

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### メタデータフィールド {#metadata-fields}

- `owner` — この記述子を担当するプロジェクト、プロトコル、組織、またはメンテナー。
- `info.url` — ウォレットが追加のコンテキストとしてユーザーに表示する可能性のある、正規のプロジェクトまたはドキュメントのURL。
- `contractName` — このファイルで記述されているコントラクトまたは実装の名前。通常は、検証済みのソースコードまたはABIと一致します。

ERC-7730ファイルがERC-20コントラクトを記述している場合は、トークンオブジェクトも追加する必要があります。

## ステップ4: 表示フォーマットセクションを記述する {#step-4-write-the-displayformats-section}

`display.formats`オブジェクトは、関数シグネチャを人間が読める署名指示にマッピングします。これにより、ユーザーがトランザクションを承認する前に、ウォレットが関数をユーザーに表示する方法が決まります。

各キーは、人間が読めるABIフラグメントです。つまり、パラメータ名とパラメータタイプの両方を含む関数シグネチャであり、ABIに表示されるとおりに正確に記述されます。


### 例: トークンスワップの記述 {#eg-describing-token-swap}

```json
"display": {
  "formats": {
    "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
      "intent": "Swap",
      "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
      "fields": [
        {
          "path": "#.amountIn",
          "label": "Send",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[1]"
          }
        },
        {
          "path": "#.to",
          "label": "Recipient",
          "format": "addressName",
          "params": {
            "types": ["eoa", "contract"],
            "sources": ["local", "ens"]
          }
        },
        {
          "path": "#.deadline",
          "label": "Expires",
          "format": "date",
          "params": {
            "encoding": "timestamp"
          }
        }
      ]
    }
  }
}

```

### 表示フィールド {#display-fields}

- **`intent`** — **(必須)** 「スワップ」など、アクションの短くてユーザーフレンドリーな説明。
- **`interpolatedIntent`** — **(推奨)** `"Swap {amountIn} for at least {amountOutMin}"`のように、フォーマットされたフィールド値を埋め込む、よりリッチな文のテンプレート。`intent`と一緒にこれを含めることで、表示上の制約がある場合でもウォレットが選択して表示できる、さらにユーザーフレンドリーな記述子を提供できます。
- **`fields`** — **(必須)** ウォレットがユーザーに表示すべきトランザクションフィールドの順序付きリスト。
  - **`path`** — **(必須)** トランザクションデータへの参照。`#.fieldName`は、ABI内の名前によってデコードされたコールデータパラメータを指します。`@.value`は、トランザクションで送信されたETHの値を指します。
  - **`label`** — **(必須)** 値の横に表示される、人間が読めるラベル。
  - **`format`** — **(推奨)** 値のレンダリング方法を制御します。一般的なフォーマットは次のとおりです。
    - `tokenAmount`
    - `addressName`
    - `date`

    追加のフォーマットが必要ない場合は、`raw`を使用します。一部のフォーマットは、追加の**`params`**構成を受け入れます。例：

    - `tokenAmount`は、`tokenPath`を使用して、どのトークンアドレスが小数点以下の桁数とティッカーのメタデータを提供するかを識別できます。
    - `date`は、`encoding`を使用して、タイムスタンプがどのようにエンコードされているかを記述できます。

    選択したフォーマットに追加情報が必要ない場合は、`params`を省略します。

## 完全な記述子 {#the-complete-descriptor}

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "uniswap-v3-router-mainnet",
    "contract": {
      "deployments": [
        {
          "chainId": 1,
          "address": "0xYourContractAddressOnMainnet"
        },
        {
          "chainId": 137,
          "address": "0xYourContractAddressOnPolygon"
        }
      ]
    }
  },
  "metadata": {
    "owner": "Example Swap Protocol",
    "info": {
      "url": "https://example.xyz"
    },
    "contractName": "SwapRouter"
  },
  "display": {
    "formats": {
      "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
        "intent": "Swap",
        "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
        "fields": [
          {
            "path": "#.amountIn",
            "label": "Send",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[1]"
            }
          },
          {
            "path": "#.to",
            "label": "Recipient",
            "format": "addressName",
            "params": {
              "types": ["eoa", "contract"],
              "sources": ["local", "ens"]
            }
          },
          {
            "path": "#.deadline",
            "label": "Expires",
            "format": "date",
            "params": {
              "encoding": "timestamp"
            }
          }
        ]
      }
    }
  }
}
```

## ステップ5: レジストリに送信する {#step-5-submit-to-the-registry}

[ERC-7730レジストリ](https://github.com/ethereum/clear-signing-erc7730-registry)は、中立的なスチュワードとして[イーサリアム財団](/foundation/)がホストするオープンなリポジトリです。誰でも自由にクローンしてセルフホストできます。ウォレットは、どのレジストリインスタンスを信頼するかを独自に決定します。

1. GitHubでリポジトリをフォークする  
2. `registry/<your-project-name>/`にフォルダを作成する  
3. その中にファイルを配置する: `registry/myproject/calldata-mycontract-0_0.json`  
4. `$schema`フィールドを、リポジトリ内で使用される相対パスに更新する: `"../../specs/erc7730-v2.schema.json"`  
5. プルリクエストを開く

PRを開くと、CIが自動的にスキーマ検証を実行し、関数シグネチャが有効なセレクタを生成するかどうかを確認し、コントラクトのアドレスがSourcifyで検証されていることを確認し、ABIの不整合をフラグ付けします。チェック結果はPRにインラインで表示されます。レジストリのメンテナーは、不正な形式や悪意のある可能性のある記述子の送信を審査します。レジストリへの登録は、監査や推奨を意味するものではありません。

<Alert variant="info">
<AlertContent>
<AlertDescription>
**注:** PRが受け入れられるには、コントラクトが<a href="https://repo.sourcify.dev">Sourcify</a>で検証されている必要があります。まだ検証されていない場合は、先に<a href="https://verify.sourcify.dev/">検証を送信</a>してください。
</AlertDescription>
</AlertContent>
</Alert>

## マージ後はどうなりますか？ {#what-happens-after-merging}

レジストリ内のすべての記述子は、監査人に公開されています。PRがマージされた後、任意の監査人が記述子をレビューし、その正確性を確認する暗号化アテステーション（[ERC-8176](https://github.com/ethereum/ERCs/pull/1576)に基づく）を公開できます。 

これらのアテステーションのシグナルにより、ウォレットは独自の信頼ポリシーを適用できます。複数の独立したアテステーションを持つ記述子は、そうでないものよりも重要視されます。監査人コミュニティには、[clearsigning.org](https://clearsigning.org)を通じて連絡を取ることができます。

ウォレットは、サポートするレジストリを選択します。記述子がレジストリに登録されると、ERC-7730をサポートするウォレットは、それが自身のレジストリにある場合に取得を開始し、ユーザーがコントラクトと対話する際に人間が読めるデータを表示します。

## 参考文献 {#further-reading}

- [ERC-7730仕様](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730レジストリ](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — ツール、エコシステムのステータス、およびガバナンス  
- [Sourcifyコントラクト検証](https://sourcify.dev)  
- [Trillion Dollar Securityイニシアチブ](https://trilliondollarsecurity.org)