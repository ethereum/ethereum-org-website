---
title: "スマートコントラクトセキュリティツールのガイド"
description: "3つの異なるテストおよびプログラム分析手法の概要"
author: "Trailofbits"
lang: ja
tags: [ "Solidity", "スマート契約", "セキュリティ" ]
skill: intermediate
published: 2020-09-07
source: "セキュアなコントラクトの開発"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

ここでは、3つの特徴的なテストおよびプログラム分析の手法を使用します。

- **[Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)による静的解析。** プログラムのすべてのパスが、異なるプログラム表示(例：制御フローグラフ)を通じて、同時に近似、分析されます。
- **[Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)によるファジング。** コードは、トランザクションの疑似ランダム生成によって実行されます。 ファザーは、特定のプロパティに違反する一連のトランザクションを見つけようとします。
- **[Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)によるシンボリック実行。** 各実行パスを数式に変換し、その上で制約をチェックできる形式的検証テクニックです。

各テクニックには長所と短所があり、[特定のケース](#determining-security-properties)で役立ちます：

| テクニック    | ツール       | 使用法                  | 速度  | 見逃されるバグ | 誤検知 |
| -------- | --------- | -------------------- | --- | ------- | --- |
| 静的解析     | Slither   | CLIとスクリプト            | 数秒  | 中       | 低   |
| ファジング    | Echidna   | Solidityのプロパティ       | 数分間 | 低       | なし  |
| シンボリック実行 | Manticore | Solidityのプロパティとスクリプト | 数時間 | なし\*    | なし  |

- すべてのパスがタイムアウトなしで探索された場合

**Slither**は数秒でコントラクトを分析しますが、静的解析は誤検知につながる可能性があり、複雑なチェック(算術チェックなど)にはあまり適していません。 Slitherは、API経由で実行し、組み込みの検出器にプッシュボタンでアクセスするか、ユーザー定義のチェックを行います。

**Echidna**は、実行に数分を要しますが、生成するのは真陽性のみです。 Echidnaは、ユーザーが提供した、Solidityで記述されたセキュリティプロパティをチェックします。 ランダムな探索に基づいているため、バグを見逃す可能性があります。

**Manticore**は、"最もヘビー級"の分析を実行します。 Echidnaと同様に、Manticoreはユーザーが提供したプロパティを検証します。 実行にはより時間がかかりますが、プロパティの有効性を証明でき、誤検知を報告しません。

## 推奨ワークフロー {#suggested-workflow}

まずSlitherの組み込み検出器から始めて、単純なバグが現在存在しないこと、そして後で入り込まないことを確認します。 Slitherを使用して、継承、変数の依存関係、構造上の問題に関連するプロパティをチェックします。 コードベースが大きくなるにつれて、Echidnaを使用してステートマシンのより複雑なプロパティをテストします。 Solidityでは利用できない保護(関数のオーバーライドに対する保護など)のために、Slitherを再検討してカスタムチェックを開発します。 最後に、Manticoreを使用して、重要なセキュリティプロパティ(算術演算など)の的を絞った検証を実行します。

- SlitherのCLIを使用して、一般的な問題を検出する
- Echidnaを使用して、コントラクトの高レベルのセキュリティプロパティをテストする
- Slitherを使用して、カスタムの静的チェックを作成する
- 重要なセキュリティプロパティの詳細な保証が必要になったら、Manticoreを使用する

**単体テストに関する注記**。 高品質のソフトウェアを構築するには、単体テストが必要です。 しかし、これらのテクニックはセキュリティ上の欠陥を見つけるのに最適というわけではありません。 単体テストは通常、コードの正常な動作(つまり、通常のコンテキストで期待どおりにコードが機能すること)をテストするために使用されますが、セキュリティ上の欠陥は、開発者が考慮しなかったエッジケースに存在する傾向があります。 数十件のスマートコントラクトのセキュリティレビューに関する我々の調査では、クライアントのコードで発見されたセキュリティ上の欠陥の数や重大度に対して、[単体テストのカバレッジは影響を与えませんでした](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/)。

## セキュリティプロパティの決定 {#determining-security-properties}

コードを効果的にテストおよび検証するには、注意が必要な領域を特定する必要があります。 セキュリティに費やすリソースは限られているため、労力を最適化するには、コードベースの脆弱な部分や価値の高い部分を特定することが重要です。 脅威モデリングが役立ちます。 以下をレビューすることを検討してください：

- [迅速なリスク評価](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (時間がない場合に推奨されるアプローチ)
- [データ中心システム脅威モデリングガイド](https://csrc.nist.gov/pubs/sp/800/154/ipd)(別名NIST 800-154)
- [Shostack脅威モデリング](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [アサーションの使用](https://blog.regehr.org/archives/1091)

### コンポーネント {#components}

何をチェックしたいかを知ることも、適切なツールを選ぶのに役立ちます。

スマートコントラクトに頻繁に関連する幅広い分野には、以下が含まれます：

- **ステートマシン。** ほとんどのコントラクトはステートマシンとして表現できます。 (1) 無効なステートに到達できないこと、(2) ステートが有効である場合に到達可能であること、(3) コントラクトをトラップするステートがないこと、を確認することを検討してください。

  - EchidnaとManticoreは、ステートマシンの仕様をテストするのに適したツールです。

- **アクセス制御。** システムに特権ユーザー(例：オーナー、コントローラーなど)がいる場合 (1) 各ユーザーが許可されたアクションのみを実行できること、(2) より特権的なユーザーからのアクションをブロックできるユーザーがいないこと、を保証する必要があります。

  - Slither、Echidna、Manticoreは、正しいアクセス制御をチェックできます。 例えばSlitherは、`onlyOwner`修飾子を欠く関数がホワイトリスト登録済みのものだけであることをチェックできます。 EchidnaとManticoreは、コントラクトが特定のステートに達した場合にのみ許可が与えられるなど、より複雑なアクセス制御に役立ちます。

- **算術演算。** 算術演算の健全性をチェックすることは非常に重要です。 あらゆる場所で`SafeMath`を使用することは、オーバーフロー/アンダーフローを防ぐための良い一歩ですが、丸め誤差の問題やコントラクトをトラップする欠陥など、他の算術的な欠陥も考慮する必要があります。

  - ここではManticoreが最良の選択です。 算術がSMTソルバーの範囲外である場合は、Echidnaを使用できます。

- **継承の正確性。** Solidityコントラクトは多重継承に大きく依存しています。 `super`呼び出しを欠いたシャドウイング関数や、誤って解釈されたC3線形化の順序などの間違いは、簡単に発生し得ます。

  - Slitherは、これらの問題を確実に検出するためのツールです。

- **外部とのやりとり。** コントラクトは相互にやりとりしますが、一部の外部コントラクトは信頼すべきではありません。 例えば、コントラクトが外部のオラクルに依存している場合、利用可能なオラクルの半分が侵害されても、そのコントラクトは安全なままでしょうか？

  - ManticoreとEchidnaは、コントラクトと外部とのやりとりをテストするための最良の選択です。 Manticoreには、外部コントラクトをスタブするための組み込みメカニズムがあります。

- **標準準拠。** イーサリアムの標準(例：ERC20)には、その設計に欠陥があった歴史があります。 構築の基盤となる標準の制限に注意してください。
  - Slither、Echidna、Manticoreは、特定の標準からの逸脱を検出するのに役立ちます。

### ツール選択のチートシート {#tool-selection-cheatsheet}

| コンポーネント  | ツール                       | 実例：                                                                                                                                                                                                                                                              |
| -------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ステートマシン  | Echidna、Manticore         |                                                                                                                                                                                                                                                                  |
| アクセス制御   | Slither、Echidna、Manticore | [Slither 演習 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md)、[Echidna 演習 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| 算術演算     | Manticore、Echidna         | [Echidna 演習 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md)、[Manticore 演習 1～3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)        |
| 継承の正確性   | Slither                   | [Slither 演習 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                  |
| 外部とのやりとり | Manticore、Echidna         |                                                                                                                                                                                                                                                                  |
| 標準準拠     | Slither、Echidna、Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                          |

目標によっては他の領域もチェックする必要がありますが、これらの大まかな重点領域は、あらゆるスマートコントラクトシステムにとって良い出発点となります。

我々の公開監査には、検証またはテストされたプロパティの例が含まれています。 実際のセキュリティプロパティをレビューするには、以下のレポートの`Automated Testing and Verification`のセクションを読むことを検討してください：

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
