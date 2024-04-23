---
title: スマートコントラクト関連セキュリティツールのガイド
description: テストおよびプログラム分析に関する3種類のテクニックの概要
author: "Trailofbits"
lang: ja
tags:
  - "Solidity"
  - "スマートコントラクト"
  - "セキュリティ"
skill: intermediate
published: 2020-09-07
source: セキュアなコントラクトの開発
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

このチュートリアルでは、以下の3種類のテスト／プログラム分析テクニックを取り上げます：

- **[Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)を用いた静的解析**では、プログラムのすべてのパスにつき、様々なプログラム表示（例：制御フローグラフ）を通じて同時に近似値を求め、分析します。
- **[Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)を用いたファジング**では、疑似乱数に基づいて生成したトランザクションを用いてコードを実行します。 ファザーは、特定のプロパティに違反する一連のトランザクションを見つけようとします。
- **[Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)を用いたシンボリック実行**は、各実行パスを数式に変換した上で、制約条件をチェックできるフォーマルな検証テクニックです。

上記の手法はそれぞれの利点と欠点を持つため、[特定の用途](#determining-security-properties)に合わせて選択すべきです。

| 手法       | ツール       | 用途                       | 速度  | バグを見落とす可能性 | 偽陽性の可能性 |
| -------- | --------- | ------------------------ | --- | ---------- | ------- |
| 静的解析     | Slither   | CLI およびスクリプト             | 数秒  | 中程度        | 低い      |
| ファジング    | Echidna   | Solidityのプロパティ           | 数分間 | 低い         | なし      |
| シンボリック実行 | Manticore | Solidity のプロパティおよび スクリプト | 数時間 | なし*        | なし      |

* すべてのパスをタイムアウトなしで検証した場合

**Slither**は、コントラクトを数秒間で分析できますが、 静的解析は誤検知を伴う場合があり、複雑なチェック作業（例：算術演算の検査）にはあまり適していません。 Slitherは、APIを通じてプッシュボタンによりビルトインの検知器にアクセスするか、ユーザー定義のチェック作業用のAPIを通じて実行します。

**Echidna**では、検出に数分間を要しますが、偽陽性は検出しません。 Echidnaでは、Solidityで作成され、ユーザーが提供したセキュリティ属性をチェックします。 ただし、ランダムな検索に基づくため、すべてのバグを検出するとは限りません。

**Manticore**は、「最も徹底的な」分析を行います。 Echidnaの場合と同様に、ユーザーが提供した属性を検証します。 検出時間はさらに長くなりますが、特定のプロパティを検証でき、偽陽性を検出することもありません。

## 推奨するワークフロー {#suggested-workflow}

まず、Slitherに内蔵されている検出機能で開始し、現時点において単純なバグが存在せず、今後も紛れ込む可能性がないことを確認しましょう。 Slither を使って、継承、変数の依存関係、および構造的な問題についてチェックします。 コードベースの規模が拡大するのに伴い、Echidnaを使って、ステートマシンにおけるより複雑なプロパティをテストします。 また、上書きされる機能に対する保護などのSolidityでは提供されない保護については、Slitherを使ってカスタムチェックを作成してください。 最後にManticoreを使用して、セキュリティに関する最重要のプロパティ（例：算術演算）のみに対象を絞った検証を行います。

- SlitherのCLIを使って、よくある問題を検出する
- Echidnaを使って、スマートコントラクトにおける高度なセキュリティ関連プロパティをテストする
- Slitherを使って、カスタムの静的解析を作成する
- 最重要なセキュリティ属性について詳細な保証が必要になったら、Manticoreを使用する

**単体テストに関する注意事項**： 高品質のソフトウェア開発には、単体テストが必須です。 一方で、セキュリティ欠陥を検出する上で、単体テストは最善の方法とは言えません。 通常、単体テストはコードの望ましい動作を確認するため（つまり、通常の環境において予想通りに動作するかどうか）に用いられますが、セキュリティ上の欠陥は、デベロッパが見落としていた周縁的なケースで発生する場合が多いのです。 スマートコントラクトを対象とする数十件のセキュリティレビューを調査した結果、[単体テストのカバレッジは、クライアントのコード上で特定されたセキュリティ上の欠陥の数や重大性には影響を与えていないことが分かりました](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/)。

## 対象とするセキュリティ属性を決定する {#determining-security-properties}

コードを効果的にテスト、検証するには、まず、対象とすべき分野を特定する必要があります。 セキュリティのためのリソースには限りがありますから、コードベースにおける脆弱な部分や高価値の部分に注力して、この取り組みを最適化することが重要です。 これには、脅威モデリングの手法を用いるとよいでしょう。 以下の事項をレビューしてください：

- [迅速リスク評価](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html)（短時間に完了しなければならない場合に推奨するアプローチです）
- [データ中心システムにおける脅威モデル作成ガイド](https://csrc.nist.gov/publications/detail/sp/800-154/draft)（別名：NIST 800-154）
- [Shostackスレッド・モデリング](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_(security)) / [DREAD](https://wikipedia.org/wiki/DREAD_(risk_assessment_model))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [アサーションを活用する](https://blog.regehr.org/archives/1091)

### 構成要素 {#components}

どの事項をチェックしたいのかを把握しておくと、適切なツール選択に役立ちます。

スマートコントラクトにおいて問題となる可能性が高い分野としては、以下が挙げられます：

- **状態マシン** ほとんどのコントラクトは、状態マシンとして表示することが可能です。 ですから、（1）無効な状態に達していないか、（2）状態が有効かつ到達しうるか、および（3）コントラクトをトラップする状態が存在しないか、についてチェックするとよいでしょう。

  - 状態マシンの仕様をテストするのに適しているのは、EchidnaとManticoreです。

- **アクセス管理。** あなたのシステムに特権ユーザー（例：所有者、管理者など）が含まれる場合、（1）各ユーザーが、権限を持つアクションのみ実行可能であること、および（2）権限レベルがより上のユーザーによるアクションをブロックできる下位ユーザーが存在しないこと、を確認してください。

  - アクセス管理については、Slither、Echidna、およびManticoreのいずれも適切なチェックを実行できます。 例えばSlitherでは、ホワイトリストに登録された関数のうち、onlyOwner修飾子を持たない関数のみをチェックすることができます。 一方、EchidnaおよびManticoreは、コントラクトが特定のステートに達した場合のみに権限が付与される場合など、より複雑なアクセス管理を確認するのに適しています。

- **算術演算。** 算術演算が正しく実行されるかを確認することは、非常に重要です。 オーバーフロー／アンダーフローを防止するには、`SafeMath`を常に利用することを推奨しますが、同時に、端数処理に関する問題やコントラクトをトラップしてしまうような欠陥など、その他の演算上の欠陥についても確認する必要があります。

  - この分野では、Manticoreを使用するのがよいでしょう。 当該の算術演算がSMTソルバーの対象範囲外である場合は、Echidnaを選択してもよいです。

- **継承の正確性。** Solidityで作成したコントラクトは、複数の継承に大きく依存しています。 シャドーイング関数において`super`コールが含まれていない場合や、C3 linearizationの順序の誤解釈などのミスは、容易に発生する可能性があります。

  - これらの問題を検出するには、Slitherが最適です。

- **外部とのやりとり。** コントラクトは相互にやりとりを行いますが、外部のコントラクトの中には信用すべきでないものもあります。 例えば、あなたのコントラクトが外部オラクルに依存する場合、利用可能なオラクルの半分が汚染されていれば、あなたのコントラクトはセキュアであるとは言えないでしょう。

  - コントラクトにおける外部とのやりとりをテストするには、ManticoreおよびEchidnaが最適です。 Manticoreには、外部のコントラクトをスタブするためのメカニズムが内蔵されています。

- **規格適合性。** イーサリアムの標準（例：ERC-20）には、これまで様々な設計ミスが含まれていました。 ですから、作成するコントラクトの規格上の制約に十分注意してください。
  - Slither、Echidna、およびManticoreはいずれも、特定の規格に対する非遵守を検知するのに役立ちます。

### ツール選択の早見表 {#tool-selection-cheatsheet}

| 構成要素     | ツール                       | 具体例                                                                                                                                                                                                                                                   |
| -------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 状態マシン    | Echidna、Manticore         |                                                                                                                                                                                                                                                       |
| アクセス管理   | Slither、Echidna、Manticore | [Slither エクササイズ2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise2.md)、[Echidna エクササイズ2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-2.md)    |
| 算術演算     | Manticore、Echidna         | [Echidna エクササイズ1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-1.md)、[Manticore エクササイズ1～3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| 継承の正確さ   | Slither                   | [Slither エクササイズ1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise1.md)                                                                                                                              |
| 外部とのやりとり | Manticore、Echidna         |                                                                                                                                                                                                                                                       |
| 規格の遵守    | Slither、Echidna、Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                               |

コントラクトの目的に応じて他の分野についてもチェックする必要がありますが、あらゆるスマートコントラクトにおいて、上記の大まかな注力分野から確認することをお勧めします。

本サイトのパブリック監査には、検証／テスト済みのプロパティの具体例が含まれています。 実際のセキュリティ関連プロパティについてレビューしたい場合は、以下のレポートの`Automated Testing and Verification（自動テスト／検証）`セクションを参照してください。

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
