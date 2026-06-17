---
title: スマート・コントラクトのセキュリティ・チェックリスト
description: セキュアなスマート・コントラクトを記述するための推奨ワークフロー
author: "Trailofbits"
tags: ["スマート・コントラクト", "セキュリティ", "solidity"]
skill: intermediate
breadcrumb: セキュリティ・チェックリスト
lang: ja
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## スマート・コントラクト開発のチェックリスト {#smart-contract-development-checklist}

スマート・コントラクトを記述する際に推奨される、大まかなプロセスは以下の通りです。

既知のセキュリティ問題の確認:

- [スリザー](https://github.com/crytic/slither)を使用してコントラクトをレビューします。一般的な脆弱性に対する40以上の検出機能が組み込まれています。新しいコードをチェックインするたびに実行し、クリーンなレポートが得られることを確認します（または、トリアージモードを使用して特定の問題を非表示にします）。
- [Crytic](https://crytic.io/)を使用してコントラクトをレビューします。スリザーでは検出できない50の問題をチェックします。また、CryticはGitHubのプルリクエストでセキュリティ問題を簡単に表面化させるため、チームメンバーが互いの状況を把握するのにも役立ちます。

コントラクトの特別な機能の検討:

- コントラクトはアップグレード可能ですか？[`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks)または[Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/)を使用して、アップグレード機能のコードに欠陥がないかレビューします。アップグレードが失敗する17のパターンを文書化しています。
- コントラクトはERCに準拠することを意図していますか？[`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)を使用してチェックします。このツールは、6つの一般的な仕様からの逸脱を即座に特定します。
- サードパーティのトークンと統合しますか？外部のコントラクトに依存する前に、[トークン統合チェックリスト](/developers/tutorials/token-integration-checklist/)をレビューしてください。

コードの重要なセキュリティ機能の目視検査:

- スリザーの[inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph)プリンターをレビューします。意図しないシャドウイングやC3線形化の問題を回避します。
- スリザーの[function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary)プリンターをレビューします。関数の可視性とアクセス制御を報告します。
- スリザーの[vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization)プリンターをレビューします。状態変数に対するアクセス制御を報告します。

重要なセキュリティ特性の文書化と、自動テストジェネレーターを使用した評価:

- [コードのセキュリティ特性を文書化する](/developers/tutorials/guide-to-smart-contract-security-tools/)方法を学びます。最初は難しいかもしれませんが、良い結果を得るために最も重要な活動です。また、このチュートリアルの高度なテクニックを使用するための前提条件でもあります。
- [エキドナ](https://github.com/crytic/echidna)および[マンティコア](https://manticore.readthedocs.io/en/latest/verifier.html)で使用するために、Solidityでセキュリティ特性を定義します。状態マシン、アクセス制御、算術演算、外部との相互作用、および標準への準拠に焦点を当てます。
- [スリザーのPython API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)を使用してセキュリティ特性を定義します。継承、変数の依存関係、アクセス制御、およびその他の構造的な問題に焦点を当てます。
- [Crytic](https://crytic.io)を使用して、コミットごとにプロパティテストを実行します。Cryticはセキュリティプロパティテストを読み込んで評価できるため、チームの全員がGitHub上でテストに合格したことを簡単に確認できます。失敗したテストはコミットをブロックできます。

最後に、自動化ツールでは簡単に見つけられない問題に注意してください:

- プライバシーの欠如: トランザクションがプールで待機している間、他の全員がそれを見ることができます
- トランザクションのフロントランニング
- 暗号化操作
- 外部の分散型金融 (DeFi) コンポーネントとのリスクを伴う相互作用

## サポートを求める {#ask-for-help}

[イーサリアムのオフィスアワー](https://calendly.com/dan-trailofbits/office-hours)は、毎週火曜日の午後に開催されています。この1時間の1対1のセッションは、セキュリティに関する質問、私たちのツールを使用したトラブルシューティング、および現在のアプローチに関する専門家からのフィードバックを得る機会です。このガイドを進めるためのサポートを提供します。

Slackに参加してください: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw)。質問がある場合は、#cryticおよび#ethereumチャンネルでいつでも対応可能です。