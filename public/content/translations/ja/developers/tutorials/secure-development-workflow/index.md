---
title: スマートコントラクトのセキュリティ・チェックリスト
description: セキュアなスマートコントラクトを作成するための推奨ワークフロー
author: "Trailofbits"
tags:
  - "スマートコントラクト"
  - "セキュリティ"
  - "Solidity"
skill: intermediate
lang: ja
published: 2020-09-07
source: セキュアなコントラクトの開発
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## スマートコントラクトの開発チェックリスト {#smart-contract-development-checklist}

スマートコントラクトを作成する際には、以下に挙げる大まかなプロセスに従って行うことをお勧めします。

既知のセキュリティ関連の問題点について確認します：

- [Slither](https://github.com/crytic/slither)で、コントラクトをレビューする。 Slitherには、40種類以上のよくある脆弱性を対象とする検出機能が搭載されています。 新しいコードが追加されるたびにレビューを実行して、クリーンな報告になるようにします（特定の問題を無視する必要がある場合は、トリアージモードを使用します）。
- [Crytic](https://crytic.io/)で、コントラクトをレビューする。 Cryticでは、Slitherでは検出できな50種類の問題点を確認できます。 さらに、GitHubのプルリクエストに含まれるセキュリティ関連の問題点を簡単に発見できるので、チーム内の問題把握に役立ちます。

あなたのコントラクトに含まれる特別な機能について検討する：

- コントラクトがアップグレード可能かどうか： [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks)または[Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/)を使って、アップグレード可能性に関するコードに欠陥がないか確認します。 当チームでは、アップグレードの失敗につながる17のケースを文書化しています。
- コントラクトは、ERC準拠を謳っていますか？ [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)で確認してください。 このツールでは、6種類の一般的な仕様に準拠していない場合、ただちに指摘されます。
- Truffleの単体テストを活用していますか？ [`slither-prop`](https://github.com/crytic/slither/wiki/Property-generation)を使って、単体テストを含めてください。 あなたが作成したコードに基づき、ERC-20の各機能につき、セキュリティに関する一連の堅牢な属性を自動的に生成します。
- サードパーティのトークンと統合予定ですか？ 外部コントラクトを利用する事前に、この[トークン統合チェックリスト](/developers/tutorials/token-integration-checklist/)でレビューしてください。

コードにおける重要なセキュリティ関連の機能を、視覚的にチェックします。

- Slitherの[inheritance-graph ](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph)プリンターをレビューします。 不注意によるシャドーイングやC3 linearizationにまつわる問題を回避してください。
- Slitherで、[機能サマリー](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary)のプリンター（表示）をレビューします。 機能の可視性およびアクセス管理のレポートが作成されます。
- Slitherの[vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization)プリンタをレビューします。 状態変数に対するアクセス管理のレポートが作成されます。

セキュリティ関連の重要な属性を文書化し、自動化されたテスト生成機能を用いて評価します：

- [コードにおけるセキュリティ属性を文書化する](/developers/tutorials/guide-to-smart-contract-security-tools/)方法について学びます。 最初は大変ですが、最良の結果を得る上で最も重要な作業です。 また、このチュートリアルのより高度なテクニックを活用する上でも、必須の作業です。
- [Echidna](https://github.com/crytic/echidna)および[Manticore](https://manticore.readthedocs.io/en/latest/verifier.html)で使用するために、Solidityでセキュリティ関連の属性を定義します。 状態マシン、アクセス管理、算術演算、外部とのやりとり、および標準の遵守に焦点を当ててください。
- [SlitherのPython API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)で、セキュリティ関連のプロパティを定義します。 継承、変数の依存関係、アクセス管理、およびその他の構造上の問題に焦点を当ててください。
- [Crytic](https://crytic.io)を使用して、コミットごとにプロパティテストを実行します。 Cryticでは、セキュリティ属性に関するテストを実行、評価できるため、チーム全員がGitHubで合格したかどうか簡単に確認できます。 テストが不合格だった場合、コミットをブロックできます。

最後に、自動化ツールでは容易に特定できない以下のような問題についても注意してください：

- プライバシーの欠如：トランザクションがプールでキューに入った場合、すべてのユーザーがトランザクションを確認できなければなりません。
- トランザクションのフロントランニング
- 秘匿化された操作
- 外部DeFiコンポーネントとの危険なやりとり

## ヘルプを求めましょう {#ask-for-help}

毎週火曜日の午後に、[イーサリアム・オフィス・アワー](https://calendly.com/dan-trailofbits/ethereum-office-hours)が開かれています。 この1対1の1時間のセッションで、セキュリティに関する質問をしたり、ツールを使ってトラブルシューティングをしたり、現在のアプローチについて専門家からフィードバックを得ることができます。 私たちが、このガイドに基づいてサポートします。

ぜひ、私たちのスタックである[Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw)に参加してください。 質問があれば、いつでも#cryticチャンネルと#ethereumチャンネルにお問い合わせください。
