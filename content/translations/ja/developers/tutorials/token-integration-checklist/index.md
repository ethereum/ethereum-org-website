---
title: トークンを統合する際のチェックリスト
description: トークンとやり取りをする際の考慮事項のチェックリスト
author: "Trailofbits"
lang: ja
tags:
  - "Solidity"
  - "スマートコントラクト"
  - "セキュリティ"
  - "トークン"
skill: intermediate
published: 2020-08-13
source: セキュアなコントラクトの構築
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

任意のトークンとやり取りするときは、このチェックリストに従ってください。 各アイテムに関連したリスクを確実に理解し、ルールを遵守しない場合はその根拠を明確にしてください。

幸いなことに、Slitherのすべての[ユーティリティ](https://github.com/crytic/slither#tools)は、トークンアドレス上で直接実行可能です：

[Slitherのチュートリアルを利用する](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

このチェックリストを利用する際には、Slitherを使って、当該トークンから以下を出力しておくとよいでしょう：

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # requires configuration, and use of Echidna and Manticore
```

## 全般的な考慮事項 {#general-considerations}

- **セキュリティレビューを実行済みのコントラクトであること**。セキュリティレビューを経ていないコントラクトとは、やりとりしないでください。 セキュリティレビューでは、アセスメント期間（「Level of Effort」と呼ぶ場合もある） 、セキュリティ企業の評判、発見された件数および深刻度を確認してください。
- **デベロッパに問い合わせられること**。インシデントが発生した場合、開発チームにアラートを提供する必要があるかもしれません。 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)で、適切な問合せ先を確認してください。
- **重要なアナウンスを行うセキュリティ関連のメーリングリストがあること**。重大な問題の発生時やアップグレード時に、あなたのようなユーザーに助言が提供される体制が整っているかを確認してください。

## ERC適合性 {#erc-conformity}

Slitherに含まれる[slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)ユーティリティで、関連する多くのERC標準に対するトークンの遵守度をレビューできます。 slither-check-ercを次の内容の評価に使用してください。

- **TransferとtransferFromがブール値を返すこと**。トークンによっては、これらの関数でブール値を返さない場合があります。 その結果、コントラクトの呼び出しが実行できない場合があります。
- **name、decimals、symbol関数を使用する場合、それらの関数が存在すること。**ERC-20標準ではこれらの関数はオプションであるため、コントラクトに含まれない場合があります。
- **Decimalsがuint8値を返すこと**。トークンによっては、不適切であるunit256値を返す場合があります。 この場合は、戻り値が255未満になるように変更します。
- **トークンが、既知の[ERC-20競合状態](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)を軽減すること**。ERC-20標準には既知のERC-20競合状態が存在するため、攻撃者がトークンを盗むのを防ぐためにこれを軽減する必要があります。
- **トークンがERC-777トークンではなく、transferやtransferFromによる外部からの関数呼び出しを含まないこと**。transfer関数を使った外部からの呼び出しは、リエントランシー攻撃につながりかねません。

Slitherには[slither-prop](https://github.com/crytic/slither/wiki/Property-generation)というユーティリティが含まれており、ERCで頻繁に発生する欠陥の多くを発見するための単体テストとセキュリティ関連のプロパティを生成することができます。 slither-propを次の内容の評価に使用してください。

- **コントラクトがslither-propのすべての単体テストとセキュリティプロパティに合格すること**。 生成された単体テストを実行し、[Echidna](https://github.com/crytic/echidna)と[Manticore](https://manticore.readthedocs.io/en/latest/verifier.html)でプロパティを確認します。

最後に、自動による特定が困難な一部の特徴について検討します。 以下の条件が発生していないか、マニュアルで確認してください：

- **TransferおよびtransferFromがフィーを取らないこと**。デフレトークンは、予期せぬ動作を引き起こす可能性があります。
- **トークンから得られる潜在的な利子収入が考慮されていること**。一部のトークンは、トークン保有者に利子を分配します。 この点を考慮しない場合、利子がコントラクト内でトラップされる可能性があります。

## コントラクトの構成 {#contract-composition}

- **コントラクトが必要以上に複雑になっていないか**。 トークンは、シンプルなコントラクトでなければなりません。コードが複雑になればなるほど、よりレビューが煩雑になります。 複雑なコードを特定するには、Slitherの[human-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)を使用してください。
- **コントラクトがSafeMathを使用しているか**。SafeMathを使用していないコントラクトは、より厳格なレビュー基準が必要になります。 コントラクトでSafeMathが使用されているかどうか、マニュアルで確認してください。
- **トークンに関連しない関数の数が、最低限に抑えられているか**。 トークンに関連しない関数は、コントラクトにおいて問題が発生する可能性を高めてしまいます。 Slitherの [contract-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)を使用して、コントラクトのコード全体をレビューしてください。
- **トークンのアドレスが複数存在しないか**。残高更新のために複数のエントリーポイントを持つトークンは、当該アドレスに基づく内部の帳簿管理を毀損する可能性があります（例：`balances[token_address][msg.sender]`が実際の残高を反映しない場合）。

## 所有者の特権 {#owner-privileges}

- **トークンがアップグレード不可能であるか**。アップグレード可能なコントラクトは、時間の経過と共にルールが変更される可能性があります。 Slitherの[human-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)を使用して、コントラクトがアップグレード可能かどうかを決定します。
- **所有者のミント能力が制限されているか**。 悪意の所有者やセキュリティが侵害された所有者は、ミント能力を悪用する可能性があります。 Slitherの[human-summaryプリンター](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)を使用して、ミント能力を評価し、マニュアルでコードをレビューする必要があるかを決定してください。
- **トークンが、一時停止可能であるか**。 悪意の所有者やセキュリティを侵害された所有者は、一次停止が可能なトークンを利用してコントラクトをトラップすることが可能です。 マニュアルで、一時停止可能なコードを特定してください。
- **所有者がコントラクトをブラックリストに登録できるようになっていないか**。 悪意の所有者やセキュリティが侵害された所有者は、ブラックリストに登録されたトークンを使用して、コントラクトをトラップすることが可能です。 マニュアルで、ブラックリスト機能を特定してください。
- **トークン開発チームの身元がはっきりしており、不正使用の責任を負える組織であるか/strong>。匿名の開発チームが開発したコントラクトや、または法的シェルターの対象に含まれるコントラクトに対しては、より厳格なレビューが必要になります。

## トークンの枯渇 {#token-scarcity}

トークンの枯渇に関わる問題については、マニュアルでレビューする必要があります。 以下の条件を確認してください：

- **特定のユーザーが、トークン供給量の大部分を所有していないか**。少数のユーザーが大部分のトークンを所有する場合、トークンの再分配に基づき価格操作の可能性が発生します。
- **総供給量は十分であるか**。総供給量が少ないトークンは、価格操作が容易になります。
- **トークンが、複数の取引所に所在しているか**。 すべてのトークンが1カ所の取引所のみに存在する場合、この取引所のセキュリティが侵害されると、このトークンに依存するコントラクトが侵害される可能性があります。
- **ユーザーは、多額の資金やフラッシュローンに関するリスクについて理解しているか**。トークン残高に依存するコントラクトは、多額の資金を持つ攻撃者やフラッシュローンを通じた攻撃について慎重に考慮する必要があります。
- **トークンは、フラッシュミントが不可能であるか**。 フラッシュミンティングは、残高や総供給量を大幅に変更しうるため、トークンの運用において厳格かつ包括的なオーバーフローチェックが必要になります。
