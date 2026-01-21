---
title: "トークン統合チェックリスト"
description: "トークンとやり取りをする際の考慮事項のチェックリスト"
author: "Trailofbits"
lang: ja
tags: [ "Solidity", "スマート契約", "セキュリティ", "トークン" ]
skill: intermediate
published: 2020-08-13
source: "セキュアなコントラクトの開発"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

任意のトークンとやり取りするときは、このチェックリストに従ってください。 各アイテムに関連したリスクを確実に理解し、ルールを遵守しない場合はその根拠を明確にしてください。

便利なことに、Slitherのすべての[ユーティリティ](https://github.com/crytic/slither#tools)は、トークンアドレス上で直接実行できます。例えば:

[Slitherの使い方チュートリアル](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

このチェックリストに従うには、対象トークンについてSlitherから以下の出力を取得しておくと便利です:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # 設定と、EchidnaおよびManticoreの使用が必要
```

## 一般的な考慮事項 {#general-considerations}

- \*\*コントラクトがセキュリティレビューを受けていること。\*\*セキュリティレビューを受けていないコントラクトとのやり取りは避けてください。 評価の期間（「level of effort」とも呼ばれます）、セキュリティ企業の評判、検出事項の数と深刻度を確認してください。
- \*\*開発者に連絡が取れること。\*\*インシデント発生時に、開発チームに警告する必要が生じる場合があります。 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)で適切な連絡先を探してください。
- \*\*重要な発表のためのセキュリティメーリングリストがあること。\*\*開発チームは(あなたのような！)ユーザーに対して、 重大な問題が発見された場合やアップグレードが行われる際に、助言を行うべきです。

## ERCへの準拠 {#erc-conformity}

Slitherには、関連する多くのERC標準に対するトークンの準拠性をレビューする[slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)というユーティリティが含まれています。 slither-check-ercを使用して、以下を確認してください:

- \*\*TransferおよびtransferFromがブール値を返すこと。\*\*一部のトークンは、これらの関数でブール値を返しません。 その結果、コントラクト内でのこれらの関数の呼び出しが失敗する可能性があります。
- \*\*name、decimals、symbol関数が使用される場合、それらが存在すること。\*\*これらの関数はERC20標準では任意であり、存在しない場合があります。
- \*\*decimalsがuint8を返すこと。\*\*一部のトークンは誤ってuint256を返します。 その場合は、返される値が255未満であることを確認してください。
- \*\*トークンが既知の[ERC20競合状態](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)を軽減していること。\*\*ERC20標準には既知のERC20競合状態があり、攻撃者によるトークンの盗難を防ぐために軽減する必要があります。
- \*\*トークンがERC777トークンではなく、transferおよびtransferFromに外部関数呼び出しがないこと。\*\*transfer関数内の外部呼び出しは、リエントランシーにつながる可能性があります。

Slitherには、多くの一般的なERCの欠陥を発見できる単体テストやセキュリティプロパティを生成するユーティリティ、[slither-prop](https://github.com/crytic/slither/wiki/Property-generation)が含まれています。 slither-propを使用して、以下を確認してください:

- \*\*コントラクトがslither-propのすべての単体テストとセキュリティプロパティに合格すること。\*\*生成された単体テストを実行し、[Echidna](https://github.com/crytic/echidna)と[Manticore](https://manticore.readthedocs.io/en/latest/verifier.html)でプロパティをチェックしてください。

最後に、自動的に特定することが困難な特性がいくつかあります。 以下の条件を手動でレビューしてください:

- \*\*TransferおよびtransferFromで手数料が取られないこと。\*\*デフレトークンは、予期せぬ動作につながる可能性があります。
- \*\*トークンから得られる潜在的な利子が考慮されていること。\*\*一部のトークンは、トークン保有者に利子を分配します。 考慮されていない場合、この利子がコントラクト内にトラップされてしまう可能性があります。

## コントラクトの構成 {#contract-composition}

- \*\*コントラクトが不要な複雑性を避けていること。\*\*トークンはシンプルなコントラクトであるべきです。複雑なコードを持つトークンは、より高い水準のレビューを必要とします。 Slitherの[human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)を使用して、複雑なコードを特定してください。
- \*\*コントラクトがSafeMathを使用していること。\*\*SafeMathを使用していないコントラクトは、より高い水準のレビューを必要とします。 SafeMathが使用されているか、コントラクトを手動で検査してください。
- \*\*コントラクトにトークン関連以外の関数がほとんどないこと。\*\*トークン関連以外の関数は、コントラクトで問題が発生する可能性を高めます。 Slitherの[contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)を使用して、コントラクトで使用されているコードを大まかにレビューしてください。
- \*\*トークンがアドレスを1つしか持たないこと。\*\*残高更新のために複数のエントリーポイントを持つトークンは、アドレスに基づく内部の帳簿管理を壊す可能性があります(例: `balances[token_address][msg.sender]`が実際の残高を反映しなくなる)。

## 所有者の権限 {#owner-privileges}

- \*\*トークンがアップグレード不可能であること。\*\*アップグレード可能なコントラクトは、時間とともにルールが変更される可能性があります。 Slitherの[human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)を使用して、コントラクトがアップグレード可能かどうかを判断してください。
- \*\*所有者のミント能力が制限されていること。\*\*悪意のある、またはセキュリティを侵害された所有者は、ミント能力を悪用する可能性があります。 Slitherの[human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)を使用してミント能力をレビューし、コードを手動でレビューすることも検討してください。
- \*\*トークンが一時停止不可能であること。\*\*悪意のある、またはセキュリティを侵害された所有者は、一時停止可能なトークンに依存するコントラクトをトラップする可能性があります。 一時停止可能なコードを手動で特定してください。
- \*\*所有者がコントラクトをブラックリストに登録できないこと。\*\*悪意のある、またはセキュリティを侵害された所有者は、ブラックリストを持つトークンに依存するコントラクトをトラップする可能性があります。 ブラックリスト機能を手動で特定してください。
- \*\*トークンの背後にいるチームが既知であり、不正利用の責任を問えること。\*\*匿名の開発チームによるコントラクトや、法的保護区域にあるコントラクトは、より高い水準のレビューを必要とします。

## トークンの希少性 {#token-scarcity}

トークンの希少性に関する問題のレビューには、手動でのレビューが必要です。 以下の条件を確認してください:

- \*\*供給量の大部分を所有するユーザーがいないこと。\*\*少数のユーザーがトークンの大部分を所有している場合、トークンの再分配に基づいて操作に影響を与える可能性があります。
- \*\*総供給量が十分であること。\*\*総供給量が少ないトークンは、簡単に操作される可能性があります。
- \*\*トークンが複数の取引所に存在すること。\*\*すべてのトークンが1つの取引所にしかない場合、その取引所が侵害されると、トークンに依存するコントラクトも侵害される可能性があります。
- \*\*多額の資金やフラッシュローンに伴うリスクをユーザーが理解していること。\*\*トークン残高に依存するコントラクトは、多額の資金を持つ攻撃者やフラッシュローンによる攻撃を慎重に考慮する必要があります。
- **トークンがフラッシュミンティングを許可しないこと**。 フラッシュミンティングは残高と総供給量の大幅な変動につながる可能性があり、そのためトークンの運用において厳格かつ包括的なオーバーフローチェックが必要になります。
