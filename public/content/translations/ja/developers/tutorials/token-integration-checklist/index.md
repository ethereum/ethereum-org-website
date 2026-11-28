---
title: "トークン統合チェックリスト"
description: "トークンとやり取りする際に考慮すべき事項のチェックリスト"
author: "Trailofbits"
lang: ja
tags:
  - solidity
  - スマートコントラクト
  - セキュリティ
  - トークン
skill: intermediate
breadcrumb: "トークン統合"
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

任意のトークンとやり取りする際は、このチェックリストに従ってください。各項目に関連するリスクを理解し、これらのルールに対する例外を正当化できるようにしてください。

便宜上、すべてのSlitherの[ユーティリティ](https://github.com/crytic/slither#tools)は、次のようにトークンのアドレスに対して直接実行できます。

[Slitherの使用に関するチュートリアル](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

Etherscanから検証済みのソースコードを取得するには、[Etherscan APIキー](https://docs.etherscan.io/set-up-your-api-key)が必要です（無料のキーで機能します）。`--etherscan-apikey`で渡すか、Slitherも読み取る`ETHERSCAN_API_KEY`環境変数を設定します。

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

キーがない場合、コマンドは`Invalid etherscan API Key`エラーで失敗します。

このチェックリストに従うには、トークンに対するSlitherからの以下の出力が必要です。

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # 設定とEchidnaの使用をリクワイア (Code contexts must retain 'require' as it is a Solidity keyword.)する
```

## 一般的な考慮事項 {#general-considerations}

- **コントラクトがセキュリティレビューを受けている。** セキュリティレビューを受けていないコントラクトとのやり取りは避けてください。評価の期間（別名「労力レベル」）、セキュリティ企業の評判、および発見された問題の数と深刻度を確認してください。
- **開発者に連絡を取っている。** インシデントが発生した際、彼らのチームに警告する必要があるかもしれません。[blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)で適切な連絡先を探してください。
- **重要な発表のためのセキュリティメーリングリストがある。** チームは、重大な問題が発見された場合やアップグレードが行われる場合に、ユーザー（あなたのような！）に通知するべきです。

## ERCへの準拠 {#erc-conformity}

Slitherには、トークンが関連する多くのERC標準に準拠しているかレビューするユーティリティである[slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)が含まれています。slither-check-ercを使用して、以下をレビューしてください。

- **transferおよびtransferFromがブール値を返す。** いくつかのトークンは、これらの関数でブール値を返しません。その結果、コントラクト内での呼び出しが失敗する可能性があります。
- **name、decimals、およびsymbol関数が使用されている場合、それらが存在する。** これらの関数はERC-20標準ではオプションであり、存在しない場合があります。
- **decimalsがuint8を返す。** いくつかのトークンは誤ってuint256を返します。この場合、返される値が255未満であることを確認してください。
- **トークンが既知の[ERC-20の競合状態](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)を軽減している。** ERC-20標準には既知のERC-20の競合状態があり、攻撃者によるトークンの盗難を防ぐために軽減する必要があります。
- **トークンがERC-777トークンではなく、transferおよびtransferFromに外部関数呼び出しがない。** transfer関数での外部呼び出しは、リエントランシー（再入）につながる可能性があります。

Slitherには、多くの一般的なERCの欠陥を発見できる単体テストとセキュリティプロパティを生成するユーティリティである[slither-prop](https://github.com/crytic/slither/wiki/Property-generation)が含まれています。slither-propを使用して、以下をレビューしてください。

- **コントラクトがslither-propからのすべての単体テストとセキュリティプロパティに合格する。** 生成された単体テストを実行し、[Echidna](https://github.com/crytic/echidna)でプロパティを確認します。

最後に、自動的に特定するのが難しい特定の特性があります。これらの条件については手動でレビューしてください。

- **transferおよびtransferFromが手数料を徴収しない。** デフレトークンは予期しない動作を引き起こす可能性があります。
- **トークンから得られる潜在的な利息が考慮されている。** 一部のトークンはトークン保有者に利息を分配します。この利息が考慮されていない場合、コントラクト内に閉じ込められる可能性があります。

## コントラクトの構成 {#contract-composition}

- **コントラクトが不必要な複雑さを避けている。** トークンはシンプルなコントラクトであるべきです。複雑なコードを持つトークンは、より高い基準のレビューを必要とします。Slitherの[human-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)を使用して、複雑なコードを特定してください。
- **コントラクトがチェック付きの算術演算を使用している。** Solidity 0.8以降では、デフォルトでオーバーフローおよびアンダーフロー時にリバートします。古いコントラクトでは、同じ保護のためにSafeMathが必要です。SafeMathなしで古いバージョンでコンパイルされたコントラクト、または`unchecked`ブロックを使用するコントラクトは、より高い基準のレビューを必要とします。特に`unchecked`ブロックやインラインアセンブリ内の算術演算を手動で検査してください。
- **コントラクトにトークンに関連しない関数が少ししかない。** トークンに関連しない関数は、コントラクト内で問題が発生する可能性を高めます。Slitherの[contract-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)を使用して、コントラクトで使用されているコードを広くレビューしてください。
- **トークンが1つのアドレスしか持たない。** 残高更新のための複数のエントリポイントを持つトークンは、アドレスに基づく内部の帳簿管理を壊す可能性があります（例：`balances[token_address][msg.sender]`が実際の残高を反映しない場合があります）。

## 所有者の権限 {#owner-privileges}

- **トークンがアップグレード可能ではない。** アップグレード可能なコントラクトは、時間の経過とともにルールが変更される可能性があります。Slitherの[human-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)を使用して、コントラクトがアップグレード可能かどうかを判断してください。
- **所有者のミンティング機能が制限されている。** 悪意のある、または侵害された所有者は、ミンティング機能を悪用する可能性があります。Slitherの[human-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)を使用してミンティング機能を確認し、コードを手動でレビューすることを検討してください。
- **トークンが一時停止可能ではない。** 悪意のある、または侵害された所有者は、一時停止可能なトークンに依存するコントラクトを罠にかける可能性があります。一時停止可能なコードを手動で特定してください。
- **所有者がコントラクトをブラックリストに登録できない。** 悪意のある、または侵害された所有者は、ブラックリストを持つトークンに依存するコントラクトを罠にかける可能性があります。ブラックリスト機能を手動で特定してください。
- **トークンの背後にいるチームが知られており、悪用に対して責任を問うことができる。** 匿名の開発チームによるコントラクト、または法的な隠れ蓑に存在するコントラクトは、より高い基準のレビューを必要とするべきです。

## トークンの希少性 {#token-scarcity}

トークンの希少性の問題に関するレビューには、手動でのレビューが必要です。以下の条件を確認してください。

- **どのユーザーも供給量の大半を所有していない。** 少数のユーザーがトークンの大半を所有している場合、トークンの分配に基づいて操作に影響を与えることができます。
- **総供給量が十分である。** 総供給量が少ないトークンは、簡単に操作される可能性があります。
- **トークンが複数の取引所に配置されている。** すべてのトークンが1つの取引所にある場合、その取引所が侵害されると、トークンに依存するコントラクトも侵害される可能性があります。
- **ユーザーが多額の資金やフラッシュローンの関連リスクを理解している。** トークン残高に依存するコントラクトは、多額の資金を持つ攻撃者やフラッシュローンを通じた攻撃を慎重に考慮する必要があります。
- **トークンがフラッシュミンティングを許可していない。** フラッシュミンティングは、残高と総供給量の大幅な変動を引き起こす可能性があり、トークンの操作において厳格かつ包括的なオーバーフローチェックが必要になります。
## 既知の非標準ERC-20トークン {#known-non-standard-erc20-tokens}

任意のトークンとの統合を許可するプロトコルは、特定のよく知られた非標準ERC-20トークンを適切に処理するように注意する必要があります。追加のリスクを伴うよく知られたトークンについては、[非標準トークンリスト](https://secure-contracts.com/development-guidelines/non-standard-tokens.html)を参照してください。

## ERC-721トークン {#erc721-tokens}

### ERC-721への準拠チェック {#erc721-conformity-checks}

特定のコントラクトの動作は、元のERC仕様と異なる場合があります。以下の条件を手動でレビューしてください。

- **0x0アドレスへのトークンの送金がリバートする。** 一部のトークンは0x0への送金を許可し、そのアドレスに送信されたトークンはバーンされたと見なします。しかし、ERC-721標準では、そのような送金はリバートすることが求められています。
- **`safeTransferFrom`関数が正しい署名で実装されている。** 一部のトークンコントラクトはこれらの関数を実装していません。それらのコントラクトのいずれかにNFTを送金すると、資産の損失につながる可能性があります。
- **`name`、`decimals`、および`symbol`関数が使用されている場合、それらが存在する。** これらの関数はERC-721標準ではオプションであり、存在しない場合があります。
- **使用されている場合、`decimals`が`uint8(0)`を返す。** その他の値は無効です。
- **`name`および`symbol`関数が空の文字列を返すことができる。** この動作は標準で許可されています。
- **`tokenId`が無効であるか、すでにバーンされたトークンを参照している場合、`ownerOf`関数がリバートする。** この関数は0x0を返すことはできません。この動作は標準で求められていますが、常に正しく実装されているとは限りません。
- **NFTの送金により、その承認がクリアされる。** これは標準で求められています。
- **NFTのトークンIDは、その存続期間中に変更できない。** これは標準で求められています。

### ERC-721標準の一般的なリスク {#common-risks-of-the-erc721-standard}

以下の条件を手動でレビューすることにより、ERC-721コントラクトに関連するリスクを軽減してください。

- **`onERC721Received`コールバックが考慮されている。** transfer関数での外部呼び出しは、特にコールバックが明示的でない場合（例：[`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code)呼び出しなど）、リエントランシーにつながる可能性があります。
- **NFTがミンティングされる際、スマート・コントラクトに安全に送金される。** ミンティング関数が存在する場合、それは`safeTransferFrom`と同様に動作し、スマート・コントラクトへの新しいトークンのミンティングを適切に処理して、資産の損失を防ぐ必要があります。
- **トークンをバーンすると、その承認がクリアされる。** バーン関数が存在する場合、それはトークンの以前の承認をクリアする必要があります。
