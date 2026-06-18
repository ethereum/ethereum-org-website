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

便宜上、すべてのスリザーの[ユーティリティ](https://github.com/crytic/slither#tools)は、以下のようにトークンのアドレス上で直接実行できます。

[スリザーの使用に関するチュートリアル](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

このチェックリストに従うには、トークンに対するスリザーからの以下の出力が必要になります。

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # 設定、およびエキドナとマンティコアの使用が必要です
```

## 一般的な考慮事項 {#general-considerations}

- **コントラクトがセキュリティレビューを受けている。** セキュリティレビューを受けていないコントラクトとのやり取りは避けてください。評価の期間（別名「労力レベル」）、セキュリティ企業の評判、および発見された問題の数と深刻度を確認してください。
- **開発者に連絡を取っている。** インシデントが発生した際、彼らのチームに警告する必要があるかもしれません。[blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)で適切な連絡先を探してください。
- **重要な発表のためのセキュリティメーリングリストがある。** チームは、重大な問題が発見された場合やアップグレードが行われる場合に、ユーザー（あなたのような！）に通知するべきです。

## ERCへの準拠 {#erc-conformity}

スリザーには、トークンが多くの関連するERC標準に準拠しているかを確認するユーティリティ、[slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)が含まれています。slither-check-ercを使用して以下を確認してください。

- **transferおよびtransferFromがブール値を返す。** いくつかのトークンは、これらの関数でブール値を返しません。その結果、コントラクト内での呼び出しが失敗する可能性があります。
- **name、decimals、およびsymbol関数が使用されている場合、それらが存在する。** これらの関数はERC-20標準ではオプションであり、存在しない可能性があります。
- **decimalsがuint8を返す。** いくつかのトークンは誤ってuint256を返します。この場合、返される値が255未満であることを確認してください。
- **トークンが既知の[ERC-20の競合状態](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)を軽減している。** ERC-20標準には既知のERC-20の競合状態があり、攻撃者によるトークンの盗難を防ぐためにこれを軽減する必要があります。
- **トークンがERC-777トークンではなく、transferおよびtransferFromに外部関数呼び出しがない。** transfer関数内の外部呼び出しは、リエントランシー（再入）攻撃につながる可能性があります。

スリザーには、多くの一般的なERCの欠陥を発見できる単体テストとセキュリティプロパティを生成するユーティリティ、[slither-prop](https://github.com/crytic/slither/wiki/Property-generation)が含まれています。slither-propを使用して以下を確認してください。

- **コントラクトがslither-propのすべての単体テストとセキュリティプロパティに合格する。** 生成された単体テストを実行し、[エキドナ](https://github.com/crytic/echidna)と[マンティコア](https://manticore.readthedocs.io/en/latest/verifier.html)を使用してプロパティを確認してください。

最後に、自動的に特定するのが難しい特定の特性があります。これらの条件については手動で確認してください。

- **transferおよびtransferFromが手数料を取らない。** デフレトークンは予期しない動作を引き起こす可能性があります。
- **トークンから得られる潜在的な利息が考慮されている。** 一部のトークンはトークン保有者に利息を分配します。これが考慮されていない場合、利息がコントラクト内に閉じ込められる可能性があります。

## コントラクトの構成 {#contract-composition}

- **コントラクトが不要な複雑さを避けている。** トークンはシンプルなコントラクトであるべきです。複雑なコードを持つトークンは、より高い基準のレビューを必要とします。スリザーの[human-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)を使用して、複雑なコードを特定してください。
- **コントラクトがSafeMathを使用している。** SafeMathを使用していないコントラクトは、より高い基準のレビューを必要とします。SafeMathの使用状況について、コントラクトを手動で検査してください。
- **コントラクトにトークンに関連しない関数がほとんどない。** トークンに関連しない関数は、コントラクトに問題が発生する可能性を高めます。スリザーの[contract-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)を使用して、コントラクトで使用されているコードを広く確認してください。
- **トークンが1つのアドレスしか持たない。** 残高更新のための複数のエントリポイントを持つトークンは、アドレスに基づく内部の帳簿管理を壊す可能性があります（例：`balances[token_address][msg.sender]`が実際の残高を反映しない場合があります）。

## 所有者の権限 {#owner-privileges}

- **トークンがアップグレード可能ではない。** アップグレード可能なコントラクトは、時間の経過とともにルールが変更される可能性があります。スリザーの[human-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)を使用して、コントラクトがアップグレード可能かどうかを判断してください。
- **所有者のミンティング機能が制限されている。** 悪意のある、または侵害された所有者は、ミンティング機能を悪用する可能性があります。スリザーの[human-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)を使用してミンティング機能を確認し、コードを手動でレビューすることを検討してください。
- **トークンが一時停止可能ではない。** 悪意のある、または侵害された所有者は、一時停止可能なトークンに依存するコントラクトを罠にかける可能性があります。一時停止可能なコードを手動で特定してください。
- **所有者がコントラクトをブラックリストに登録できない。** 悪意のある、または侵害された所有者は、ブラックリストを持つトークンに依存するコントラクトを罠にかける可能性があります。ブラックリスト機能を手動で特定してください。
- **トークンの背後にいるチームが知られており、悪用に対して責任を問うことができる。** 匿名の開発チームによるコントラクト、または法的な隠れ蓑に存在するコントラクトは、より高い基準のレビューを必要とするべきです。

## トークンの希少性 {#token-scarcity}

トークンの希少性の問題に関するレビューには、手動での確認が必要です。以下の条件を確認してください。

- **どのユーザーも供給の大部分を所有していない。** 少数のユーザーがトークンの大部分を所有している場合、トークンの分配に基づいて操作に影響を与えることができます。
- **総供給量が十分である。** 総供給量が少ないトークンは簡単に操作される可能性があります。
- **トークンが複数の取引所に配置されている。** すべてのトークンが1つの取引所にある場合、その取引所が侵害されると、トークンに依存するコントラクトも侵害される可能性があります。
- **ユーザーが多額の資金やフラッシュローンに関連するリスクを理解している。** トークンの残高に依存するコントラクトは、多額の資金を持つ攻撃者やフラッシュローンを通じた攻撃を慎重に考慮する必要があります。
- **トークンがフラッシュミンティングを許可していない。** フラッシュミンティングは残高と総供給量の大幅な変動を引き起こす可能性があり、トークンの操作において厳密かつ包括的なオーバーフローのチェックが必要になります。