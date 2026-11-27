---
title: "スマート・コントラクトのセキュリティ・チェックリスト"
description: "セキュアなスマート・コントラクトを記述するための推奨ワークフロー"
author: "Trailofbits"
tags: ["スマート・コントラクト", "セキュリティ", "Solidity"]
skill: intermediate
breadcrumb: "セキュリティ・チェックリスト"
lang: ja
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## スマート・コントラクト開発のチェックリスト {#smart-contract-development-checklist}

スマート・コントラクトを記述する際に推奨される、ハイレベルなプロセスを以下に示します。

既知のセキュリティ問題の確認:

- [スリザー](https://github.com/crytic/slither)を使用してコントラクトをレビューします。一般的な脆弱性に対する100以上の組み込みの検出機能があります。新しいコードをチェックインするたびに実行し、クリーンなレポートが得られることを確認します（または、トリアージモードを使用して特定の問題を非表示にします）。
- GitHubの[slither-action](https://github.com/crytic/slither-action)などを使用してCIでスリザーを実行し、プルリクエストでセキュリティ問題が表面化するようにします。

コントラクトの特別な機能の検討:

- コントラクトはアップグレード可能ですか？[`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks)を使用して、アップグレード可能性のコードに欠陥がないかレビューします。アップグレードが失敗する17のパターンを文書化しています。
- コントラクトはERCに準拠しているとされていますか？[`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)を使用して確認します。このツールは、6つの一般的な仕様からの逸脱を即座に特定します。
- サードパーティのトークンと統合しますか？外部のコントラクトに依存する前に、[トークン統合チェックリスト](/developers/tutorials/token-integration-checklist/)をレビューしてください。

コードの重要なセキュリティ機能の目視検査:

- スリザーの[inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph)プリンターをレビューします。意図しないシャドウイングやC3線形化の問題を回避します。
- スリザーの[function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary)プリンターをレビューします。関数の可視性とアクセス制御を報告します。
- スリザーの[vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization)プリンターをレビューします。状態変数に対するアクセス制御を報告します。

重要なセキュリティプロパティの文書化と、自動テストジェネレーターを使用した評価:

- [コードのセキュリティプロパティを文書化する](/developers/tutorials/guide-to-smart-contract-security-tools/)方法を学びます。最初は難しいですが、良い結果を得るための最も重要な活動です。また、このチュートリアルの高度なテクニックを使用するための前提条件でもあります。
- [エキドナ](https://github.com/crytic/echidna)や[Medusa](https://github.com/crytic/medusa)などのファザー、および[hevm](https://hevm.dev/)などのシンボリック実行ツールで使用するために、Solidityでセキュリティプロパティを定義します。状態マシン、アクセス制御、算術演算、外部との相互作用、および標準への準拠に焦点を当てます。
- [スリザーのPython API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)を使用してセキュリティプロパティを定義します。継承、変数の依存関係、アクセス制御、およびその他の構造的な問題に焦点を当てます。
- チームの全員がテストに合格したことを簡単に確認できるように、CI（GitHub Actionsなど）のすべてのコミットでプロパティテストを実行します。失敗したテストはマージをブロックできます。

最後に、自動化ツールでは簡単に見つけられない問題に注意してください:

- プライバシーの欠如: トランザクションがプールにキューイングされている間、他の全員がそれを見ることができます
- トランザクションのフロントランニング
- 暗号化操作
- 外部の分散型金融 (DeFi) コンポーネントとのリスクを伴う相互作用

## サポートを求める {#ask-for-help}

[イーサリアムのオフィスアワー](https://meetings.hubspot.com/trailofbits/office-hours)は、毎週火曜日の午後に開催されています。この1時間の1対1のセッションは、セキュリティに関する質問、私たちのツールを使用したトラブルシューティング、および現在のアプローチに関する専門家からのフィードバックを得る機会です。このガイドを進めるためのサポートを提供します。

Slackに参加してください: [Empire Hacking](https://slack.empirehacking.nyc/)。質問がある場合は、#cryticおよび#ethereumチャンネルでいつでも対応可能です。
