---
title: "ERC-1155 マルチトークン規格"
description: "代替可能トークンと非代替性トークンを単一のコントラクトで組み合わせるマルチトークン規格、ERC-1155について学びます。"
lang: ja
---

## はじめに {#introduction}

複数のトークンタイプを管理するコントラクトの標準インターフェースです。デプロイされた単一のコントラクトには、代替可能トークン、非代替性トークン (NFT)、またはその他の構成 (半代替可能トークンなど) の任意の組み合わせを含めることができます。

**マルチトークン規格とは何ですか？**

そのアイデアはシンプルで、任意の数の代替可能トークンおよび非代替性トークンのタイプを表現し、制御できるスマート・コントラクトのインターフェースを作成することを目指しています。これにより、ERC-1155トークンは[ERC-20](/developers/docs/standards/tokens/erc-20/)および[ERC-721](/developers/docs/standards/tokens/erc-721/)トークンと同じ機能を果たすことができ、さらに両方を同時に機能させることも可能です。ERC-20およびERC-721規格の両方の機能を向上させ、より効率的にし、明らかな実装エラーを修正します。

ERC-1155トークンの詳細は、[EIP-1155](https://eips.ethereum.org/EIPS/eip-1155)で完全に説明されています。

## 前提条件 {#prerequisites}

このページをよりよく理解するために、まずは[トークン規格](/developers/docs/standards/tokens/)、[ERC-20](/developers/docs/standards/tokens/erc-20/)、および[ERC-721](/developers/docs/standards/tokens/erc-721/)について読むことをお勧めします。

## ERC-1155の機能と特徴: {#body}

- [一括送金 (Batch Transfer)](#batch-transfers): 1回の呼び出しで複数の資産を送金します。
- [一括残高照会 (Batch Balance)](#batch-balance): 1回の呼び出しで複数の資産の残高を取得します。
- [一括承認 (Batch Approval)](#batch-approval): あるアドレスに対してすべてのトークンを承認します。
- [フック (Hooks)](#receive-hook): トークン受信時のフックです。
- [NFTサポート](#nft-support): 供給量が1の場合、NFTとして扱います。
- [安全な送金ルール (Safe Transfer Rules)](#safe-transfer-rule): 安全な送金のためのルールセットです。

### 一括送金 {#batch-transfers}

一括送金は、通常のERC-20の送金と非常によく似た働きをします。通常のERC-20の`transferFrom`関数を見てみましょう。

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

ERC-1155における唯一の違いは、値を配列として渡し、さらにIDの配列も渡すことです。たとえば、`ids=[3, 6, 13]`および`values=[100, 200, 5]`が与えられた場合、結果として以下の送金が行われます。

1. `_from`から`_to`へ、IDが3のトークンを100個送金する。
2. `_from`から`_to`へ、IDが6のトークンを200個送金する。
3. `_from`から`_to`へ、IDが13のトークンを5個送金する。

ERC-1155には`transferFrom`のみが存在し、`transfer`はありません。通常の`transfer`のように使用するには、fromアドレスを関数を呼び出しているアドレスに設定するだけです。

### 一括残高照会 {#batch-balance}

対応するERC-20の`balanceOf`呼び出しにも同様に、一括処理をサポートするパートナー関数があります。参考までに、以下はERC-20のバージョンです。

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

残高照会はさらにシンプルで、1回の呼び出しで複数の残高を取得できます。所有者の配列を渡し、その後にトークンIDの配列を渡します。

たとえば、`_ids=[3, 6, 13]`および`_owners=[0xbeef..., 0x1337..., 0x1111...]`が与えられた場合、戻り値は以下のようになります。

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### 一括承認 {#batch-approval}

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

承認はERC-20とは少し異なります。特定の金額を承認するのではなく、`setApprovalForAll`を介してオペレーターを承認済みまたは未承認に設定します。

現在のステータスの読み取りは、`isApprovedForAll`を介して行うことができます。お分かりのように、これは「すべてかゼロか」の操作です。承認するトークンの数や、どのトークンクラスを承認するかを定義することはできません。

これはシンプルさを念頭に置いて意図的に設計されています。1つのアドレスに対してすべてを承認することしかできません。

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

[EIP-165](https://eips.ethereum.org/EIPS/eip-165)のサポートにより、ERC-1155はスマート・コントラクトに対してのみ受信フックをサポートします。フック関数は、以下のように事前に定義されたマジックbytes4値を返す必要があります。

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

受信側のコントラクトがこの値を返した場合、そのコントラクトは送金を受け入れ、ERC-1155トークンの処理方法を知っていると見なされます。これで、コントラクト内にトークンが閉じ込められることはなくなります！

### NFTサポート {#nft-support}

供給量が1つだけの場合、そのトークンは実質的に非代替性トークン (NFT) となります。そして、ERC-721の標準と同様に、メタデータのURLを定義できます。このURLはクライアントによって読み取りおよび変更が可能です。詳細は[こちら](https://eips.ethereum.org/EIPS/eip-1155#metadata)をご覧ください。

### 安全な送金ルール {#safe-transfer-rule}

これまでの説明で、すでにいくつかの安全な送金ルールに触れてきました。しかし、その中で最も重要なルールを見てみましょう。

1. 呼び出し元は、`_from`アドレスのトークンを使用することを承認されているか、呼び出し元が`_from`と等しくなければなりません。
2. 以下の場合、送金の呼び出しはリバートしなければなりません。
   1. `_to`アドレスが0である。
   2. `_ids`の長さが`_values`の長さと同じではない。
   3. `_ids`内のトークンの保有者の残高のいずれかが、受信者に送られる`_values`内のそれぞれの金額よりも少ない。
   4. その他のエラーが発生した。

_注_: フックを含むすべての一括処理関数には、一括処理を行わないバージョンも存在します。これは、1つの資産のみを送金することが依然として最も一般的に使用される方法である可能性が高いことを考慮し、ガス効率を高めるために行われています。安全な送金ルールを含め、説明をシンプルにするためにこれらは省略しています。名前は同一で、「Batch」を削除するだけです。

## 参考文献 {#further-reading}

- [EIP-1155: マルチトークン規格](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: オープンツェッペリンのドキュメント](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: GitHubリポジトリ](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)