---
title: スマートコントラクトのセキュリティガイドライン
description: dappを構築する際に考慮すべきセキュリティガイドラインのチェックリスト
author: "Trailofbits"
tags: ["solidity", "スマートコントラクト", "セキュリティ"]
skill: intermediate
breadcrumb: セキュリティガイドライン
lang: ja
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

より安全なスマートコントラクトを構築するために、これらの高レベルな推奨事項に従ってください。

## 設計ガイドライン {#design-guidelines}

コントラクトの設計は、コードを1行も書く前に、あらかじめ議論しておく必要があります。

### ドキュメントと仕様 {#documentation-and-specifications}

ドキュメントはさまざまなレベルで記述でき、コントラクトの実装中に更新する必要があります。

- **システムの平易な説明**: コントラクトが何を行うか、およびコードベースに関する前提条件を説明します。
- **スキーマとアーキテクチャ図**: コントラクトの相互作用やシステムの状態マシンを含みます。[スリザーのプリンター](https://github.com/crytic/slither/wiki/Printer-documentation)は、これらのスキーマの生成に役立ちます。
- **徹底したコードドキュメント**: Solidityには[NatSpecフォーマット](https://docs.soliditylang.org/en/develop/natspec-format.html)を使用できます。

### オンチェーンとオフチェーンの計算 {#onchain-vs-offchain-computation}

- **可能な限り多くのコードをオフチェーンに保つ。** オンチェーンのレイヤーは小さく保ちます。オンチェーンでの検証が簡単になるように、オフチェーンのコードでデータを前処理します。順序付けられたリストが必要ですか？リストをオフチェーンでソートし、オンチェーンではその順序のみを確認します。

### アップグレード可能性 {#upgradeability}

[私たちのブログ記事](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)で、さまざまなアップグレード可能性のソリューションについて議論しました。コードを書く前に、アップグレード可能性をサポートするかどうかを慎重に選択してください。この決定は、コードの構造に影響を与えます。一般的に、以下のことを推奨します。

- **アップグレード可能性よりも[コントラクトの移行](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)を優先する。** 移行システムには、アップグレード可能なシステムと同じ利点が多くありますが、その欠点はありません。
- **delegatecallproxyパターンよりもデータ分離パターンを使用する。** プロジェクトに明確な抽象化の分離がある場合、データ分離を使用したアップグレード可能性はわずかな調整しか必要としません。delegatecallproxyはEVMの専門知識を必要とし、非常にエラーが発生しやすいです。
- **デプロイ前に移行/アップグレード手順を文書化する。** ガイドラインなしでストレス下で対応しなければならない場合、間違いを犯すことになります。従うべき手順を事前に書いておいてください。これには以下を含める必要があります。
  - 新しいコントラクトを開始する呼び出し
  - キーが保存されている場所とアクセス方法
  - デプロイの確認方法！デプロイ後のスクリプトを開発し、テストします。

## 実装ガイドライン {#implementation-guidelines}

**シンプルさを追求する。** 常に目的に合った最もシンプルなソリューションを使用してください。チームのどのメンバーもあなたのソリューションを理解できる必要があります。

### 関数の構成 {#function-composition}

コードベースのアーキテクチャは、コードのレビューを容易にする必要があります。その正確性について推論する能力を低下させるようなアーキテクチャの選択は避けてください。

- **システムのロジックを分割する。** 複数のコントラクトを使用するか、類似した関数をグループ化する（例：認証、算術など）ことによって行います。
- **明確な目的を持つ小さな関数を書く。** これにより、レビューが容易になり、個々のコンポーネントのテストが可能になります。

### 継承 {#inheritance}

- **継承を管理しやすく保つ。** 継承はロジックを分割するために使用されるべきですが、プロジェクトは継承ツリーの深さと幅を最小限に抑えることを目指すべきです。
- **スリザーの[継承プリンター](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph)を使用して、コントラクトの階層を確認する。** 継承プリンターは、階層のサイズをレビューするのに役立ちます。

### イベント {#events}

- **すべての重要な操作をログに記録する。** イベントは、開発中のコントラクトのデバッグや、デプロイ後の監視に役立ちます。

### 既知の落とし穴を避ける {#avoid-known-pitfalls}

- **最も一般的なセキュリティ問題に注意する。** [Ethernaut CTF](https://ethernaut.openzeppelin.com/)、[Capture the Ether](https://capturetheether.com/)、[Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/)など、一般的な問題について学ぶためのオンラインリソースが多数あります。
- **[Solidityドキュメント](https://docs.soliditylang.org/en/latest/)の警告セクションに注意する。** 警告セクションは、言語の自明ではない動作について知らせてくれます。

### 依存関係 {#dependencies}

- **十分にテストされたライブラリを使用する。** 十分にテストされたライブラリからコードをインポートすることで、バグのあるコードを書く可能性が低くなります。ERC-20コントラクトを書きたい場合は、[オープンツェッペリン](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)を使用してください。
- **依存関係マネージャーを使用し、コードのコピー＆ペーストを避ける。** 外部ソースに依存する場合は、元のソースに合わせて最新の状態に保つ必要があります。

### テストと検証 {#testing-and-verification}

- **徹底した単体テストを書く。** 高品質なソフトウェアを構築するには、広範なテストスイートが不可欠です。
- **[スリザー](https://github.com/crytic/slither)、[エキドナ](https://github.com/crytic/echidna)、[マンティコア](https://github.com/trailofbits/manticore)のカスタムチェックとプロパティを書く。** 自動化ツールは、コントラクトが安全であることを保証するのに役立ちます。効率的なチェックとプロパティの書き方を学ぶには、このガイドの残りの部分を確認してください。
- **[crytic.io](https://crytic.io/)を使用する。** CryticはGitHubと統合されており、プライベートなスリザーの検出器へのアクセスを提供し、エキドナからのカスタムプロパティチェックを実行します。

### Solidity {#solidity}

- **0.4や0.6よりもSolidity 0.5を優先する。** 私たちの意見では、Solidity 0.5は0.4よりも安全であり、より優れた組み込みのプラクティスを備えています。Solidity 0.6は本番環境には不安定すぎることが判明しており、成熟する時間が必要です。
- **コンパイルには安定版リリースを使用し、警告の確認には最新リリースを使用する。** 最新のコンパイラバージョンでコードに問題が報告されていないことを確認してください。ただし、Solidityはリリースサイクルが早く、コンパイラのバグの歴史があるため、デプロイに最新バージョンを使用することはお勧めしません（スリザーの[solcバージョンの推奨事項](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)を参照）。
- **インラインアセンブリを使用しない。** アセンブリにはEVMの専門知識が必要です。イエロー・ペーパーを_完全に理解_していない場合は、EVMコードを書かないでください。

## デプロイガイドライン {#deployment-guidelines}

コントラクトが開発され、デプロイされたら：

- **コントラクトを監視する。** ログを監視し、コントラクトやウォレットが侵害された場合に対応できるように準備しておきます。
- **[blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)に連絡先情報を追加する。** このリストは、セキュリティの欠陥が発見された場合に第三者があなたに連絡するのに役立ちます。
- **特権ユーザーのウォレットを保護する。** ハードウェアウォレットにキーを保存する場合は、私たちの[ベストプラクティス](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/)に従ってください。
- **インシデント対応計画を用意する。** スマートコントラクトが侵害される可能性があることを考慮してください。コントラクトにバグがなくても、攻撃者がコントラクト所有者のキーを制御する可能性があります。