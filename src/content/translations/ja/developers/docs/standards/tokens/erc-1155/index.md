---
title: ERC-1155 マルチトークン規格
description:
lang: ja
---

## はじめに {#introduction}

さまざまな種類のトークンを管理するコントラクトにおける標準的なインターフェイスです。 デプロイされたひとつのコントラクトには、代替性トークン、非代替性トークン、あるいはその他の種類のトークン（例：半代替性トークン）を含めることができます。

**マルチトークン規格とは何か？**

この規格は、代替性か非代替性かを問わず、あらゆる種類のトークンを表現し、管理できるスマートコントラクトのインターフェイスを開発するというシンプルな発想に基づいて策定されたものです。 このため、ERC-1155 規格に基づくトークンは、[ERC-20](/developers/docs/standards/tokens/erc-20/)および[ERC-721](/developers/docs/standards/tokens/erc-721/)トークンと同一の機能を提供し、この両方を同時に提供することすら可能です。 このため、ERC-20 および ERC-721 の両規格における機能や効率性が向上し、明らかな実装エラーを訂正することができます。

ERC-1155 トークンの詳細な説明については、[EIP-1155](https://eips.ethereum.org/EIPS/eip-1155)を参照してください。

## 前提知識 {#prerequisites}

このページをよく理解するには、まず[トークン規格](/developers/docs/standards/tokens/)、[ERC-20](/developers/docs/standards/tokens/erc-20/)、[ERC-721](/developers/docs/standards/tokens/erc-721/)について理解しておく必要があります。

## ERC-1155 の機能と特長: {#body}

- [バッチ転送](#batch-transfers)：1 回の呼び出しで複数のアセットを転送します。
- [バッチ残高](#batch-balance)：1 回の呼び出しで、複数の資産の残高を取得します。
- [バッチ承認](#batch-approval)：ひとつのアドレスに対するすべてのトークンを承認します。
- [フック](#recieve-hook)：トークンのフックを受け取ります。
- [NFT に対応](#nft-support)：供給トークンの数が 1 の場合、NFT として扱います。
- [安全な転送ルール](#safe-transfer-rule)：セキュアな転送のためのルールセットです。

### バッチ転送 {#batch-transfers}

この規格におけるバッチ転送は、通常の ERC-20 の場合とほぼ同様です。 まず、通常の ERC-20 規格における`transferFrom`関数を確認しておきましょう:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

ERC-1155 における唯一の違いは、値を配列として渡し、さらに ID の配列も渡す点です。 例えば、`ids=[3, 6, 13]`、`values=[100, 200, 5]`と指定した場合、以下のような転送が実行されます。

1. id3 では、`_from`から`_to`に 100 トークンを転送。
2. id6 では、`_from`から`_to`に 200 トークンを転送。
3. id13 では、`_from`から`_to`に i5 トークンを転送。

ERC-1155 では、`transfer`は存在せず、`transferFrom`のみ利用できます。 通常の`transfer`のように使用するには、 関数を呼び出すアドレスを from address として設定すればよいです。

### バッチ残高 {#batch-balance}

同様に、ERC-20 における`balanceOf`の呼び出しも、バッチ処理に対応した機能が追加されています。 確認のために、まず ERC-20 の関数を見ておきましょう:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

残高の呼び出しがよりシンプルになり、1 回の呼び出しで複数の残高を取得できるようになりました。 所有者の配列と、その後にトークン ID の配列を指定すればよいです。

例えば、`_ids=[3, 6, 13]`と`_owners=[0xbeef..., 0x1337..., 0x111111...]`を与えると、戻り値は次のようになります:

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### バッチ承認 {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

承認プロセスは、ERC-20 とは若干異なります。 特定の金額を承認するのではなく、`setApprovalForAll`の関数を通じて承認／非承認を決定するオペレーターを指定します。

`isApprovedForAll`の関数を使って、現在の承認状態を読み込むことができます。 推測されたとおり、これは All or Nothing 型の操作です。 承認するトークンの数やトークンの種類を指定することはできません。

これは、シンプルさを実現するために敢えて採用された設計です。 ひとつのアドレスに対し、すべて承認することだけが可能です。

### 受信フック {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

ERC-1155 は、[EIP-165](https://eips.ethereum.org/EIPS/eip-165)に対応しているため、スマートコントラクトに対する受信フックのみ対応しています。 このフック関数は、合い言葉として事前に定義された bytes4 の値（以下の形式を持つ）を返す必要があります。

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

受信側のコントラクトがこの値を返すと、コントラクトがこの転送を受け入れ、ERC-1155 のトークンに対する処理方法を理解していると見なされます。 これにより、コントラクト内部で未処理のトークンが溜まっていくことがなくなります！

### NFT のサポート {#nft-support}

供給されるトークンの数が 1 である場合、このトークンは事実上非代替性トークン（NFT）だと言えます。 ERC-721 規格と同じように、メタデータの URL を定義することが可能です。 この URL は、クライアントによる読み取り／変更が可能です。[こちら](https://eips.ethereum.org/EIPS/eip-1155#metadata)をご覧ください。

### 安全転送ルール {#safe-transfer-rule}

すでに他の記事において、いくつかの安全転送ルールについて紹介しました。 ここでは、最も重要なルールについて確認しておきましょう:

1. 発信者は、`_from`のトークンを支払う行為に対して承認を受けているか、`_from`と同一でなければなりません。
2. 以下に該当する場合、転送の呼び出しは取り消されます:
   1. `_to`のアドレスが 0 である。
   2. `_ids`の長さが`_values`の長さと一致しない。
   3. `_ids`におけるトークン（複数可）の保有者（複数可）における残高（複数可）のいずれかが、受信者に送信された`_values`における当該の額（複数可）よりも少ない。
   4. その他のエラーが発生した。

_注記_：フックを含むすべてのバッチ関数は、バッチ処理ではない通常バージョンの関数としても存在します。 これは、実際にはひとつの資産のみを転送するケースが最も一般的になると予想されるために、ガスの効率性を考慮した設計上の選択です。 この記事では、安全転送ルールの場合も含めて、簡潔な説明のためにバッチ関数のみを取り上げました。 各関数の名称は、「Batch」を削除すれば同一です。

## 参考文献 {#further-reading}

- [ERC-1155：マルチトークン規格](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155：Openzeppelin のドキュメンテーション](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [ERC-1155：Github リポジトリ](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
