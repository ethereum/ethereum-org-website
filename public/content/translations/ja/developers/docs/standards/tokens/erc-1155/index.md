---
title: ERC-1155 マルチトークン規格
description: 単一のコントラクトで、代替可能トークンと非代替性トークンを組み合わせるマルチトークン標準であるERC-1155について学びましょう。
lang: ja
---

## はじめに {#introduction}

さまざまな種類のトークンを管理するコントラクトにおける標準的なインターフェイスです。 デプロイされた単一のコントラクトには、代替可能トークン、非代替性トークン、またはその他の構成（例：半代替性トークン）の任意の組み合わせを含めることができます。

**マルチトークン標準とは？**

この規格は、代替性か非代替性かを問わず、あらゆる種類のトークンを表現し、管理できるスマートコントラクトのインターフェイスを開発するというシンプルな発想に基づいて策定されたものです。 このようにして、ERC-1155トークンは、[ERC-20](/developers/docs/standards/tokens/erc-20/)トークンおよび[ERC-721](/developers/docs/standards/tokens/erc-721/)トークンと同じ機能を、さらに両方を同時に実行することができます。 このため、ERC-20およびERC-721の両規格における機能や効率性が向上し、明らかな実装エラーを訂正することができます。

ERC-1155トークンは、[EIP-1155](https://eips.ethereum.org/EIPS/eip-1155)で詳しく説明されています。

## 前提条件{#prerequisites}

このページをよりよく理解するために、まず[トークン標準](/developers/docs/standards/tokens/)、[ERC-20](/developers/docs/standards/tokens/erc-20/)、および[ERC-721](/developers/docs/standards/tokens/erc-721/)についてお読みになることをお勧めします。

## ERC-1155の機能と特徴: {#body}

- [バッチ転送](#batch_transfers): 1回の呼び出しで複数のアセットを転送します。
- [バッチ残高](#batch_balance): 1回の呼び出しで複数のアセットの残高を取得します。
- [バッチ承認](#batch_approval): 1つのアドレスに対するすべてのトークンを承認します。
- [フック](#receive_hook): トークン受信フック。
- [NFTサポート](#nft_support): 供給量が1の場合、NFTとして扱います。
- [安全な転送ルール](#safe_transfer_rule): 安全な転送のためのルールセットです。

### バッチ転送 {#batch-transfers}

この規格におけるバッチ転送は、通常のERC-20の場合とほぼ同様です。 通常のERC-20 `transferFrom`関数を見てみましょう。

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

ERC-1155における唯一の違いは、値を配列として渡し、さらにIDの配列も渡す点です。 例えば、`ids=[3, 6, 13]`、`values=[100, 200, 5]`と指定した場合、以下のような転送が実行されます。

1. ID 3のトークン100個を`_from`から`_to`へ転送します。
2. ID 6のトークン200個を`_from`から`_to`へ転送します。
3. ID 13のトークン5個を`_from`から`_to`へ転送します。

ERC-1155では、`transfer`は存在せず、`transferFrom`のみ利用できます。 通常の`transfer`のように使用するには、fromアドレスを、関数を呼び出しているアドレスに設定します。

### バッチ残高 {#batch-balance}

同様に、ERC-20の`balanceOf`呼び出しにも、バッチ処理に対応する関数があります。 確認のために、まずERC-20の関数を見ておきましょう:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

残高の呼び出しがよりシンプルになり、1回の呼び出しで複数の残高を取得できるようになりました。 所有者の配列と、その後にトークンIDの配列を指定すればよいです。

例えば、`_ids=[3, 6, 13]`と`_owners=[0xbeef..., 0x1337..., 0x1111...]`が与えられた場合、戻り値は次のようになります。

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

承認プロセスは、ERC-20とは若干異なります。 特定の数量を承認するのではなく、`setApprovalForAll`を使って、オペレーターを承認済みまたは未承認に設定します。

現在の状態は`isApprovedForAll`を介して読み取ることができます。 推測されたとおり、これはAll or Nothing型の操作です。 承認するトークンの数やトークンの種類を指定することはできません。

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

[EIP-165](https://eips.ethereum.org/EIPS/eip-165)がサポートされているため、ERC-1155はスマートコントラクトの受信フックのみをサポートします。 このフック関数は、合い言葉として事前に定義されたbytes4の値（以下の形式を持つ）を返す必要があります。

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

受信側のコントラクトがこの値を返すと、コントラクトがこの転送を受け入れ、ERC-1155のトークンに対する処理方法を理解していると見なされます。 これにより、コントラクト内部で未処理のトークンが溜まっていくことがなくなります！

### NFTサポート {#nft-support}

供給されるトークンの数が1である場合、このトークンは事実上非代替性トークン（NFT）だと言えます。 ERC-721規格と同じように、メタデータのURLを定義することが可能です。 URLはクライアントによって読み取り、変更が可能です。詳細は[こちら](https://eips.ethereum.org/EIPS/eip-1155#metadata)をご覧ください。

### 安全な転送ルール {#safe-transfer-rule}

すでに他の記事において、いくつかの安全転送ルールについて紹介しました。 ここでは、最も重要なルールについて確認しておきましょう:

1. 呼び出し元は、`_from`アドレスのトークンを使用することが承認されているか、または`_from`と等しくなければなりません。
2. 以下に該当する場合、転送の呼び出しは取り消されます:
   1. `_to`アドレスが0であること。
   2. `_ids`の長さが`_values`の長さと一致しないこと。
   3. `_ids`内のいずれかのトークンの保有者の残高が、受信者に送られる`_values`内のそれぞれの量よりも少ないこと。
   4. その他のエラーが発生した。

_注_: フックを含むすべてのバッチ関数は、バッチではないバージョンとしても存在します。 これは、実際にはひとつの資産のみを転送するケースが最も一般的になると予想されるために、ガスの効率性を考慮した設計上の選択です。 この記事では、安全転送ルールの場合も含めて、簡潔な説明のためにバッチ関数のみを取り上げました。 各関数の名称は、「Batch」を削除すれば同一です。

## 参考リンク{#further-reading}

- [EIP-1155: マルチトークン標準](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: OpenZeppelinドキュメント](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: GitHubリポジトリ](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
