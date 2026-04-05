---
title: "トークン規格の理解"
description: "イーサリアムで最も一般的なトークン規格とその仕組みに関するガイド。"
image: /images/tokens/token-standards-hero.png
alt: "トークン規格の図"
template: tutorial
lang: ja
skill: intermediate
published: 2025-08-15
---

# トークン規格の理解 {#understanding-token-standards}

トークン規格は、イーサリアム・ネットワーク上でデジタル資産がどのように振る舞うかを定義します。これらは、ウォレット、取引所、アプリケーションがトークンと予測可能な形でやり取りするために依存できる共通のインターフェースを提供します。

## トークン規格とは？ {#what-are-token-standards}

トークン規格とは、トークンの作成、送金、管理方法を定義する[スマート・コントラクト](/glossary/#smart-contract)として実装されたルールの集合です。最も広く採用されている規格は[ERC-20](/developers/docs/standards/tokens/erc-20/)であり、イーサリアム上の代替可能（ファンジブル）トークンの大部分を支えています。

_規格がなければ_、すべてのトークンにカスタムの統合コードが必要になります。たとえば、`approve`関数と`transferFrom`関数を使用すると、ユーザーが許可を与えた後、分散型取引所がユーザーに代わってトークンを送金できるようになります。

トークンのコントラクトを<a href="https://eth.blockscout.com/tokens">Etherscan</a>で確認し、どの規格が実装されているかを検証できます。

![Token approval flow](/images/tokens/approval-flow.png)

## 一般的な規格 {#common-standards}

### ERC-20: 代替可能トークン {#erc-20}

ERC-20は、**代替可能（ファンジブル）トークン**の標準インターフェースを定義します。1ドル紙幣が他の1ドル紙幣と同じであるように、すべての単位は同一であり、互換性があります。

```solidity
// 受取人にトークンを送金する
function transfer(address to, uint256 amount) public returns (bool) {
    require(balanceOf(msg.sender) >= amount, "Insufficient balance");
    _balances[msg.sender] -= amount;
    _balances[to] += amount;
    return true;
}
```

ERC-20トークンの総供給量は、通常、デプロイ時に固定されます。たとえば、あるプロジェクトが18桁の小数部を持つ1,000,000トークンを作成した場合、最小単位は`0.000000000000000001`トークンになります。上記の`translate`関数において、送信者が100トークンを持っており、10トークンの送金をリクエストした場合、送信者の残高は90（100 - 10 = 90）になり、受信者の残高は10増えます。

[Sepolia](https://sepolia.dev/)上の[Remix](https://remix.ethereum.org/)を使用してトークンをデプロイし、[Blockscout](https://eth.blockscout.com/)でソースコードを検証できます。

### ERC-721: 非代替可能トークン {#erc-721}

ERC-20とは異なり、各ERC-721トークンは固有のものです。これらは一般にNFTとして知られており、デジタルアートワーク、ドメイン名、ゲーム内資産などの個別のアイテムの所有権を表すために使用されます。

```md
NFTのメタデータの例:
- Name: CryptoKitty #42
- Description: 希少なデジタルコレクティブル
- Image: ipfs://QmXyz...
```

## ガスコスト {#gas-costs}

トークンの送金には、Gwei建てのガス代が必要です。標準的なERC-20の送金には約21,000ガス単位かかりますが、ERC-721の送金にはコントラクトの実装に応じて通常50,000〜100,000ガス単位が必要になります。

基本料金はネットワークの需要に基づいて変動します。ネットワークが混雑している場合、手数料はブロックごとに最大12.5%増加する可能性があります。

<ExpandableCard title="NFTの送金はなぜ高くなるの？" eventCategory="/test-drift" eventName="clicked Why do NFT transfers cost more?">

NFTの送金には、より複雑なストレージ操作が伴います。各トークンには個別に追跡する必要がある固有のIDがあり、コントラクトは送金を許可する前に所有権を検証する必要があります。この追加の計算にはより多くのガスが必要になります。

詳細な説明については、[イーサリアムのガスに関するドキュメント](/developers/docs/gas/)を参照してください。

</ExpandableCard>

<ExpandableCard title="ガス代を節約する方法" eventCategory="/test-drift" eventName="clicked How to reduce gas costs">

トランザクションコストを大幅に削減するために、<a href="https://optimism.io">Optimism</a>や[Arbitrum](/developers/docs/scaling/optimistic-rollups/)などのレイヤー2 (L2)ソリューションの使用を検討してください。これらのロールアップは、複数のトランザクションをまとめてバッチ処理し、単一のトランザクションとしてイーサリアム・メインネットに送信します。

</ExpandableCard>

## ツールとリソース {#tools-and-resources}

<InfoBanner emoji=":books:">
  <a href="https://docs.openzeppelin.com/contracts">オープンツェッペリンのコントラクト・ライブラリ</a>は、すべての主要なトークン規格の監査済み実装を提供しています。
</InfoBanner>

- Ethereum Improvement Proposalsサイトの[ERC-20仕様](https://eips.ethereum.org/EIPS/eip-20)
- [オープンツェッペリンのERC-20ガイド](https://docs.openzeppelin.com/contracts/erc20)
- [Blockscout](https://eth.blockscout.com/tokens)のトークンエクスプローラー

<YouTube id="dQw4w9WgXcQ" />

## テスト用の空セクション {#empty-section}

## 参考文献 {#further-reading}

_図は[Token Standards Illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)から引用・改変_

_図は[Token Standards Illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)から引用・改変_

| 規格 | 種類 | ガスコスト | ユースケース |
|----------|------|----------|----------|
| [ERC-20](/developers/docs/standards/tokens/erc-20/) | 代替可能 | ~21,000 | 通貨、ユーティリティトークン |
| [ERC-721](/developers/docs/standards/tokens/erc-721/) | 非代替可能 | ~65,000 | デジタルアート、コレクティブル |
| [ERC-1155](/developers/docs/standards/tokens/erc-1155/) | マルチトークン | ~35,000 | ゲームアイテム、複合資産 |