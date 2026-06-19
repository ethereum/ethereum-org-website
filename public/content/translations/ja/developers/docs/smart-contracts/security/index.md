---
title: "スマート・コントラクトのセキュリティ"
description: "安全なイーサリアムのスマート・コントラクトを構築するためのガイドラインの概要"
lang: ja
---

スマート・コントラクトは非常に柔軟であり、ブロックチェーン上にデプロイされたコードに基づくイミュータブルなロジックを実行しながら、大量の価値やデータを制御することができます。これにより、従来のシステムよりも多くの利点を提供する、トラストレスな分散型アプリケーション (dapp) の活気あるエコシステムが生まれました。同時に、スマート・コントラクトの脆弱性を悪用して利益を得ようとする攻撃者にとっても、機会を提供することになります。

[イーサリアム](/)のようなパブリック・ブロックチェーンは、スマート・コントラクトのセキュリティ確保の問題をさらに複雑にします。デプロイされたコントラクトのコードは、セキュリティの欠陥にパッチを当てるために変更することが_通常は_できません。また、スマート・コントラクトから盗まれた資産は追跡が非常に困難であり、不変性のためほとんど回収不可能です。

数字は様々ですが、スマート・コントラクトのセキュリティ上の欠陥によって盗まれたり失われたりした価値の総額は、軽く10億ドルを超えると推定されています。これには、[DAOハッキング](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)（360万ETHが盗まれ、現在の価格で10億ドル以上の価値）、[Parityマルチシグ・ウォレットのハッキング](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach)（ハッカーにより3,000万ドルが失われた）、および[Parityの凍結ウォレット問題](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)（3億ドル以上のETHが永久にロックされた）などの注目を集めた事件が含まれます。

前述の問題により、開発者は安全で堅牢、かつ回復力のあるスマート・コントラクトの構築に労力を投資することが不可欠となっています。スマート・コントラクトのセキュリティは重大な問題であり、すべての開発者が学ぶべきものです。このガイドでは、イーサリアム開発者向けのセキュリティ上の考慮事項について説明し、スマート・コントラクトのセキュリティを向上させるためのリソースを探ります。

## 前提条件 {#prerequisites}

セキュリティについて学ぶ前に、[スマート・コントラクト開発の基礎](/developers/docs/smart-contracts/)を理解しておいてください。

## 安全なイーサリアムのスマート・コントラクトを構築するためのガイドライン {#smart-contract-security-guidelines}

### 1. 適切なアクセス制御の設計 {#design-proper-access-controls}

スマート・コントラクトにおいて、`public` または `external` とマークされた関数は、任意の外部所有アカウント (EOA) またはコントラクト・アカウントから呼び出すことができます。他のユーザーがコントラクトとやり取りできるようにするには、関数の可視性を public に指定する必要があります。しかし、`private` とマークされた関数は、スマート・コントラクト内の関数からのみ呼び出すことができ、外部アカウントからは呼び出せません。すべてのネットワーク参加者にコントラクト関数へのアクセスを許可すると、特に誰でも機密性の高い操作 (新しいトークンのミンティングなど) を実行できる場合、問題を引き起こす可能性があります。

スマート・コントラクト関数の不正使用を防ぐには、安全なアクセス制御を実装する必要があります。アクセス制御メカニズムは、スマート・コントラクト内の特定の関数を使用する権限を、コントラクトの管理を担当するアカウントなどの承認されたエンティティに制限します。**Ownableパターン**と**ロールベースの制御**は、スマート・コントラクトにアクセス制御を実装するのに役立つ2つのパターンです。

#### Ownableパターン {#ownable-pattern}

Ownableパターンでは、コントラクトの作成プロセス中に、あるアドレスがコントラクトの「オーナー」として設定されます。保護された関数には `OnlyOwner` 修飾子が割り当てられ、関数を実行する前にコントラクトが呼び出し元アドレスの身元を確実に認証します。コントラクトのオーナー以外のアドレスから保護された関数を呼び出すと常にリバートされ、望ましくないアクセスを防ぎます。

#### ロールベースのアクセス制御 {#role-based-access-control}

スマート・コントラクトに単一のアドレスを `Owner` として登録すると、中央集権化のリスクが生じ、単一障害点となります。オーナーのアカウントキーが侵害された場合、攻撃者は所有されているコントラクトを攻撃できます。そのため、複数の管理アカウントを持つロールベースのアクセス制御パターンを使用する方が、より良い選択肢となる場合があります。

ロールベースのアクセス制御では、機密性の高い関数へのアクセスは、信頼できる参加者のグループ間で分散されます。たとえば、あるアカウントがトークンのミンティングを担当し、別のアカウントがアップグレードやコントラクトの一時停止を実行する場合があります。このようにアクセス制御を分散型にすることで、単一障害点が排除され、ユーザーのトラスト前提が軽減されます。

##### マルチシグネチャ・ウォレットの使用 {#}

安全なアクセス制御を実装するもう1つのアプローチは、コントラクトの管理に[マルチシグネチャ・アカウント](/developers/docs/smart-contracts/#multisig)を使用することです。通常のEOAとは異なり、マルチシグネチャ・アカウントは複数のエンティティによって所有され、トランザクションを実行するには最小限の数のアカウント (たとえば5つ中3つ) からの署名が必要です。

アクセス制御にマルチシグを使用すると、ターゲット・コントラクトでのアクションに複数の当事者の同意が必要になるため、セキュリティの層が追加されます。これは、Ownableパターンを使用する必要がある場合に特に役立ちます。攻撃者や悪意のある内部関係者が、悪意のある目的で機密性の高いコントラクト関数を操作することがより困難になるためです。

### 2. require()、assert()、revert() ステートメントを使用してコントラクトの操作を保護する {#use-require-assert-revert}

前述のように、スマート・コントラクトがブロックチェーンにデプロイされると、誰でもそのパブリック関数を呼び出すことができます。外部アカウントがコントラクトとどのようにやり取りするかを事前に知ることはできないため、デプロイする前に問題のある操作に対する内部の保護手段を実装することが理想的です。`require()`、`assert()`、および `revert()` ステートメントを使用して、実行が特定の要件を満たさない場合に例外をトリガーし、状態の変更をリバートすることで、スマート・コントラクトの正しい動作を強制できます。

**`require()`**: `require` は関数の先頭で定義され、呼び出された関数が実行される前に、事前定義された条件が満たされていることを確認します。`require` ステートメントを使用すると、関数の処理を進める前に、ユーザー入力の検証、状態変数の確認、または呼び出し元アカウントの身元の認証を行うことができます。

**`assert()`**: `assert()` は、内部エラーを検出し、コード内の「不変条件 (インバリアント)」の違反を確認するために使用されます。不変条件とは、すべての関数実行において真であるべき、コントラクトの状態に関する論理的なアサートです。不変条件の例としては、トークン・コントラクトの最大総供給量や残高などがあります。`assert()` を使用すると、コントラクトが脆弱な状態に陥ることはなくなり、万が一陥った場合でも、状態変数へのすべての変更がロールバックされます。

**`revert()`**: `revert()` は、必要な条件が満たされない場合に例外をトリガーする if-else ステートメントで使用できます。以下のサンプル・コントラクトでは、関数の実行を保護するために `revert()` を使用しています。

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // 購入を実行する。
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. スマート・コントラクトのテストとコードの正確性の検証 {#test-smart-contracts-and-verify-code-correctness}

[イーサリアム仮想マシン (EVM)](/developers/docs/evm/) で実行されるコードの不変性は、スマート・コントラクトが開発フェーズにおいてより高いレベルの品質評価を要求することを意味します。コントラクトを広範囲にテストし、予期しない結果が生じないか観察することで、セキュリティが大幅に向上し、長期的にはユーザーを保護することになります。

通常の方法は、コントラクトがユーザーから受け取ると予想されるモックデータを使用して、小さな単体テストを作成することです。[単体テスト](/developers/docs/smart-contracts/testing/#unit-testing)は、特定の関数の機能をテストし、スマート・コントラクトが期待どおりに機能することを確認するのに適しています。

残念ながら、単体テストを単独で使用した場合、スマート・コントラクトのセキュリティ向上に対する効果は最小限にとどまります。単体テストは、モックデータに対して関数が適切に実行されることを証明するかもしれませんが、単体テストの効果は記述されたテストの範囲に依存します。そのため、スマート・コントラクトの安全性を損なう可能性のある、見落とされたエッジケースや脆弱性を検出することが困難になります。

より優れたアプローチは、単体テストと、[静的および動的解析](/developers/docs/smart-contracts/testing/#static-dynamic-analysis)を使用して実行されるプロパティベースのテストを組み合わせることです。静的解析は、[制御フローグラフ](https://en.wikipedia.org/wiki/Control-flow_graph)や[抽象構文木](https://deepsource.io/glossary/ast/)などの低レベルの表現に依存して、到達可能なプログラムの状態と実行パスを分析します。一方、[スマート・コントラクトのファジング](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry)などの動的解析手法では、ランダムな入力値を使用してコントラクトのコードを実行し、セキュリティ・プロパティに違反する操作を検出します。

[形式的検証](/developers/docs/smart-contracts/formal-verification)は、スマート・コントラクトのセキュリティ・プロパティを検証するためのもう1つの手法です。通常のテストとは異なり、形式的検証はスマート・コントラクトにエラーがないことを決定的に証明できます。これは、目的のセキュリティ・プロパティを捉えた形式仕様を作成し、コントラクトの形式モデルがこの仕様に準拠していることを証明することによって実現されます。

### 4. コードの独立したレビューを依頼する {#get-independent-code-reviews}

コントラクトをテストした後、セキュリティ上の問題がないか他の人にソースコードをチェックしてもらうことをお勧めします。テストによってスマート・コントラクトのすべての欠陥が明らかになるわけではありませんが、独立したレビューを受けることで、脆弱性を発見できる可能性が高まります。

#### 監査 {#audits}

スマート・コントラクトの監査を依頼することは、独立したコードレビューを実施する1つの方法です。監査人は、スマート・コントラクトが安全であり、品質上の欠陥や設計エラーがないことを保証する上で重要な役割を果たします。

とはいえ、監査を特効薬として扱うことは避けるべきです。スマート・コントラクトの監査はすべてのバグを捕捉するわけではなく、主に追加のレビューの機会を提供することを目的としており、初期の開発やテスト中に開発者が見落とした問題を検出するのに役立ちます。また、スマート・コントラクト監査のメリットを最大化するために、コードを適切に文書化したり、インラインコメントを追加したりするなど、監査人と協力するためのベストプラクティスに従う必要があります。

- [スマート・コントラクト監査のヒントとコツ](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [監査を最大限に活用する](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### バグバウンティ {#bug-bounties}

バグバウンティ・プログラムの設定は、外部コードレビューを実装するためのもう1つのアプローチです。バグバウンティとは、アプリケーションの脆弱性を発見した個人 (通常はホワイトハット・ハッカー) に与えられる金銭的な報酬です。

適切に使用すれば、バグバウンティはハッカー・コミュニティのメンバーに、コードの重大な欠陥を検査するインセンティブを与えます。実際の例として、イーサリアム上で稼働する[レイヤー2 (L2)](/layer-2/)プロトコルである[オプティミズム](https://www.optimism.io/)で、攻撃者が無制限にイーサを作成できた可能性のある「無限マネーバグ」があります。幸いなことに、ホワイトハット・ハッカーが[この欠陥を発見](https://www.saurik.com/optimism.html)してチームに通知し、[その過程で多額の報酬を獲得しました](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/)。

有用な戦略は、バグバウンティ・プログラムの報酬を、危険にさらされている資金の額に比例して設定することです。「[スケーリング・バグバウンティ](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)」と呼ばれるこのアプローチは、個人が脆弱性を悪用するのではなく、責任を持って開示するための金銭的なインセンティブを提供します。

### 5. スマート・コントラクト開発中のベストプラクティスに従う {#follow-smart-contract-development-best-practices}

監査やバグバウンティが存在するからといって、高品質のコードを記述する責任が免除されるわけではありません。優れたスマート・コントラクトのセキュリティは、適切な設計および開発プロセスに従うことから始まります。

- gitなどのバージョン管理システムにすべてのコードを保存する

- すべてのコード変更をプルリクエスト経由で行う

- プルリクエストには少なくとも1人の独立したレビュアーを確保する。プロジェクトに単独で取り組んでいる場合は、他の開発者を見つけてコードレビューを交換することを検討する

- スマート・コントラクトのテスト、コンパイル、デプロイには[開発環境](/developers/docs/frameworks/)を使用する

- [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn)、Mythril、スリザーなどの基本的なコード解析ツールでコードを実行する。理想的には、各プルリクエストがマージされる前にこれを行い、出力の違いを比較する

- コードがエラーなしでコンパイルされ、Solidityコンパイラが警告を出さないことを確認する

- ([NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)を使用して) コードを適切に文書化し、コントラクトのアーキテクチャの詳細をわかりやすい言葉で説明する。これにより、他の人がコードを監査およびレビューしやすくなります。

### 6. 堅牢なディザスタリカバリ計画を実装する {#implement-disaster-recovery-plans}

安全なアクセス制御の設計、関数修飾子の実装、およびその他の提案により、スマート・コントラクトのセキュリティを向上させることはできますが、悪意のあるエクスプロイトの可能性を完全に排除することはできません。安全なスマート・コントラクトを構築するには、「障害に備える」ことと、攻撃に効果的に対応するためのフォールバック計画を用意することが必要です。適切なディザスタリカバリ計画には、以下のコンポーネントの一部またはすべてが組み込まれます。

#### コントラクトのアップグレード {#contract-upgrades}

イーサリアムのスマート・コントラクトはデフォルトでイミュータブルですが、アップグレード・パターンを使用することで、ある程度の可変性を実現することが可能です。重大な欠陥によって古いコントラクトが使用できなくなり、新しいロジックをデプロイすることが最も実現可能な選択肢である場合には、コントラクトのアップグレードが必要になります。

コントラクトのアップグレード・メカニズムの仕組みは異なりますが、「プロキシ・パターン」はスマート・コントラクトをアップグレードするためのより一般的なアプローチの1つです。[プロキシ・パターン](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern)は、アプリケーションの状態とロジックを_2つ_のコントラクトに分割します。最初のコントラクト (「プロキシ・コントラクト」と呼ばれます) は状態変数 (ユーザーの残高など) を保存し、2番目のコントラクト (「ロジック・コントラクト」と呼ばれます) はコントラクト関数を実行するためのコードを保持します。

アカウントはプロキシ・コントラクトとやり取りし、プロキシ・コントラクトは [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) 低レベル呼び出しを使用して、すべての関数呼び出しをロジック・コントラクトにディスパッチします。通常のメッセージ・コールとは異なり、`delegatecall()` は、ロジック・コントラクトのアドレスで実行されるコードが、呼び出し元のコントラクトのコンテキストで実行されることを保証します。これは、ロジック・コントラクトが (自身のストレージではなく) 常にプロキシのストレージに書き込み、`msg.sender` と `msg.value` の元の値が保持されることを意味します。

ロジック・コントラクトへの呼び出しを委譲するには、そのアドレスをプロキシ・コントラクトのストレージに保存する必要があります。したがって、コントラクトのロジックをアップグレードするには、別のロジック・コントラクトをデプロイし、新しいアドレスをプロキシ・コントラクトに保存するだけで済みます。プロキシ・コントラクトへの後続の呼び出しは自動的に新しいロジック・コントラクトにルーティングされるため、実際にコードを変更することなくコントラクトを「アップグレード」したことになります。

[コントラクトのアップグレードの詳細](/developers/docs/smart-contracts/upgrading/)。

#### 緊急停止 {#emergency-stops}

前述のように、広範な監査やテストを行っても、スマート・コントラクトのすべてのバグを発見できるわけではありません。デプロイ後にコードに脆弱性が見つかった場合、コントラクト・アドレスで実行されているコードを変更することはできないため、パッチを当てることは不可能です。また、アップグレード・メカニズム (プロキシ・パターンなど) の実装には時間がかかる場合があり (多くの場合、さまざまな当事者からの承認が必要です)、攻撃者により多くの損害を与える時間を与えるだけになります。

最終手段は、コントラクト内の脆弱な関数への呼び出しをブロックする「緊急停止」機能を実装することです。緊急停止は通常、以下のコンポーネントで構成されます。

1. スマート・コントラクトが停止状態にあるかどうかを示すグローバルなブール変数。この変数はコントラクトのセットアップ時に `false` に設定されますが、コントラクトが停止されると `true` に戻ります。

2. 実行時にブール変数を参照する関数。このような関数は、スマート・コントラクトが停止していないときにアクセス可能であり、緊急停止機能がトリガーされるとアクセスできなくなります。

3. 緊急停止関数にアクセスできるエンティティ。この関数はブール変数を `true` に設定します。悪意のあるアクションを防ぐために、この関数への呼び出しは信頼できるアドレス (コントラクトのオーナーなど) に制限できます。

コントラクトが緊急停止をアクティブにすると、特定の関数は呼び出せなくなります。これは、選択した関数をグローバル変数を参照する修飾子でラップすることによって実現されます。以下は、コントラクトにおけるこのパターンの実装を説明する[例](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol)です。

```solidity
// このコードは専門的な監査を受けておらず、安全性や正確性についていかなる保証も行いません。自己責任でご使用ください。

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // ここで msg.sender の認可を確認します
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // ここで預け入れロジックが実行されます
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // ここで緊急引き出しが実行されます
    }
}
```

この例は、緊急停止の基本的な機能を示しています。

- `isStopped` は、最初は `false` と評価され、コントラクトが緊急モードに入ると `true` と評価されるブール値です。

- 関数修飾子 `onlyWhenStopped` と `stoppedInEmergency` は、`isStopped` 変数をチェックします。`stoppedInEmergency` は、コントラクトが脆弱なときにアクセスできないようにすべき関数 (例: `deposit()`) を制御するために使用されます。これらの関数への呼び出しは単にリバートされます。

`onlyWhenStopped` は、緊急時に呼び出し可能であるべき関数 (例: `emergencyWithdraw()`) に使用されます。このような関数は状況の解決に役立つ可能性があるため、「制限された関数」のリストから除外されます。

緊急停止機能を使用すると、スマート・コントラクトの深刻な脆弱性に対処するための効果的な一時しのぎとなります。ただし、開発者が利己的な理由でそれをアクティブにしないことをユーザーが信頼する必要性が高まります。この目的のために、オンチェーンの投票メカニズム、タイムロック、またはマルチシグ・ウォレットからの承認の対象にすることで、緊急停止の制御を分散型にすることが可能な解決策となります。

#### イベントの監視 {#event-monitoring}

[イベント](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events)を使用すると、スマート・コントラクト関数への呼び出しを追跡し、状態変数の変更を監視できます。誰かが安全上重要なアクション (資金の引き出しなど) を実行するたびにイベントを発行するように、スマート・コントラクトをプログラムすることが理想的です。

イベントをログに記録し、オフチェーンで監視することで、コントラクトの操作に関する洞察が得られ、悪意のあるアクションのより迅速な発見に役立ちます。これにより、チームはハッキングに迅速に対応し、関数の一時停止やアップグレードの実行など、ユーザーへの影響を軽減するためのアクションを実行できます。

また、誰かがコントラクトとやり取りするたびにアラートを自動的に転送する、市販の監視ツールを選択することもできます。これらのツールを使用すると、トランザクション量、関数呼び出しの頻度、または関連する特定の関数など、さまざまなトリガーに基づいてカスタムアラートを作成できます。たとえば、1回のトランザクションで引き出された金額が特定のしきい値を超えたときに通知されるアラートをプログラムできます。

### 7. 安全なガバナンス・システムの設計 {#design-secure-governance-systems}

コアとなるスマート・コントラクトの制御をコミュニティ・メンバーに引き渡すことで、アプリケーションを分散型にしたいと考えるかもしれません。この場合、スマート・コントラクト・システムにはガバナンス・モジュールが含まれます。これは、コミュニティ・メンバーがオンチェーンのガバナンス・システムを介して管理アクションを承認できるようにするメカニズムです。たとえば、プロキシ・コントラクトを新しい実装にアップグレードするという提案は、トークン保有者によって投票される場合があります。

分散型ガバナンスは、特に開発者とエンドユーザーの利益を一致させるため、有益な場合があります。それにもかかわらず、スマート・コントラクトのガバナンス・メカニズムは、誤って実装されると新たなリスクをもたらす可能性があります。考えられるシナリオとしては、攻撃者が[フラッシュ・ローン](/defi/#flash-loans)を利用して (保有するトークン数で測定される) 莫大な投票力を獲得し、悪意のある提案を押し通す場合です。

オンチェーン・ガバナンスに関連する問題を防ぐ1つの方法は、[タイムロックを使用する](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/)ことです。タイムロックは、特定の時間が経過するまでスマート・コントラクトが特定のアクションを実行するのを防ぎます。その他の戦略としては、トークンがロックアップされている期間に基づいて各トークンに「投票の重み」を割り当てたり、現在のブロックではなく過去の期間 (たとえば、2〜3ブロック前) のアドレスの投票力を測定したりすることが挙げられます。どちらの方法も、オンチェーンの投票を左右するために投票力を急速に蓄積する可能性を減らします。

[安全なガバナンス・システムの設計](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/)、[DAOにおけるさまざまな投票メカニズム](https://hackernoon.com/governance-is-the-holy-grail-for-daos)、および[DeFiを活用した一般的なDAOの攻撃ベクトル](https://dacian.me/dao-governance-defi-attacks)の詳細については、共有リンクを参照してください。

### 8. コードの複雑さを最小限に抑える {#reduce-code-complexity}

従来のソフトウェア開発者は、ソフトウェア設計に不必要な複雑さを導入しないようにアドバイスするKISS (「Keep It Simple, Stupid: シンプルにしておけ、愚か者」) の原則に精通しています。これは、「複雑なシステムは複雑な方法で失敗する」ため、コストのかかるエラーの影響を受けやすいという長年の考えに基づいています。

スマート・コントラクトが潜在的に大量の価値を制御していることを考慮すると、スマート・コントラクトを記述する際には物事をシンプルに保つことが特に重要です。スマート・コントラクトを記述する際にシンプルさを実現するためのヒントは、可能な限り [オープンツェッペリン・コントラクト](https://docs.openzeppelin.com/contracts/5.x/) などの既存のライブラリを再利用することです。これらのライブラリは開発者によって広範に監査およびテストされているため、これらを使用することで、新しい機能をゼロから記述してバグを導入する可能性を減らすことができます。

もう1つの一般的なアドバイスは、小さな関数を記述し、ビジネスロジックを複数のコントラクトに分割することで、コントラクトをモジュール化しておくことです。よりシンプルなコードを記述することは、スマート・コントラクトの攻撃対象領域を減らすだけでなく、システム全体の正確性を推論し、考えられる設計エラーを早期に検出することを容易にします。

### 9. 一般的なスマート・コントラクトの脆弱性から防御する {#mitigate-common-smart-contract-vulnerabilities}

#### リエントランシー {#reentrancy}

EVMは並行処理を許可していません。つまり、メッセージ・コールに関与する2つのコントラクトを同時に実行することはできません。外部呼び出しは、呼び出しが戻るまで呼び出し元のコントラクトの実行とメモリを一時停止し、戻った時点で実行が正常に進行します。このプロセスは、正式には別のコントラクトへの[制御フロー](https://www.computerhope.com/jargon/c/contflow.htm)の転送として説明できます。

ほとんどの場合は無害ですが、信頼できないコントラクトに制御フローを転送すると、リエントランシーなどの問題が発生する可能性があります。リエントランシー攻撃は、元の関数の呼び出しが完了する前に、悪意のあるコントラクトが脆弱なコントラクトをコールバックしたときに発生します。このタイプの攻撃は、例を用いて説明するのが最適です。

誰でもイーサを入金および引き出しできるシンプルなスマート・コントラクト (「Victim」) を考えてみましょう。

```solidity
// このコントラクトは脆弱です。本番環境では使用しないでください。

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

このコントラクトは、ユーザーが以前にコントラクトに入金したETHを引き出せるように、`withdraw()` 関数を公開しています。引き出しを処理する際、コントラクトは以下の操作を実行します。

1. ユーザーのETH残高を確認する
2. 呼び出し元アドレスに資金を送信する
3. 残高を0にリセットし、ユーザーからの追加の引き出しを防ぐ

`Victim` コントラクトの `withdraw()` 関数は、「checks-interactions-effects (チェック・相互作用・効果)」パターンに従っています。実行に必要な条件が満たされているか (つまり、ユーザーのETH残高がプラスであるか) を_チェック (checks)_ し、トランザクションの_効果 (effects)_ を適用する (つまり、ユーザーの残高を減らす) 前に、呼び出し元のアドレスにETHを送信することで_相互作用 (interaction)_ を実行します。

もし `withdraw()` が外部所有アカウント (EOA) から呼び出された場合、関数は期待どおりに実行されます。`msg.sender.call.value()` は呼び出し元にETHを送信します。しかし、`msg.sender` がスマート・コントラクト・アカウントであり、`withdraw()` を呼び出した場合、`msg.sender.call.value()` を使用して資金を送信すると、そのアドレスに保存されているコードの実行もトリガーされます。

コントラクト・アドレスにデプロイされているコードが以下のようなものであると想像してください。

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

このコントラクトは、以下の3つのことを行うように設計されています。

1. 別のアカウント (おそらく攻撃者のEOA) からの入金を受け入れる
2. Victimコントラクトに1 ETHを入金する
3. スマート・コントラクトに保存されている1 ETHを引き出す

ここには何も問題はありませんが、`Attacker` には、受信した `msg.sender.call.value` から残っているガスが40,000を超える場合に、`Victim` の `withdraw()` を再度呼び出す別の関数がある点が異なります。これにより、`Attacker` は `Victim` に再入し、`withdraw` の最初の呼び出しが完了する_前_に、さらに資金を引き出すことができます。このサイクルは以下のようになります。

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

要約すると、関数の実行が完了するまで呼び出し元の残高は0に設定されないため、後続の呼び出しは成功し、呼び出し元は残高を複数回引き出すことができます。この種の攻撃は、[2016年のDAOハッキング](https://www.coindesk.com/learn/understanding-the-dao-attack)で起こったように、スマート・コントラクトから資金を流出させるために使用される可能性があります。[リエントランシー・エクスプロイトの公開リスト](https://github.com/pcaversaccio/reentrancy-attacks)が示すように、リエントランシー攻撃は今日でもスマート・コントラクトにとって重大な問題です。

##### リエントランシー攻撃を防ぐ方法 {#}

リエントランシーに対処するアプローチの1つは、[checks-effects-interactions (チェック・効果・相互作用) パターン](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern)に従うことです。このパターンでは、実行を進める前に必要なチェックを実行するコードが最初に来て、次にコントラクトの状態を操作するコードが続き、他のコントラクトやEOAと相互作用するコードが最後に来るように、関数の実行順序を決定します。

checks-effects-interactionsパターンは、以下に示す `Victim` コントラクトの改訂版で使用されています。

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

このコントラクトは、ユーザーの残高の_チェック (check)_ を実行し、(ユーザーの残高を0にリセットすることで) `withdraw()` 関数の_効果 (effects)_ を適用し、_相互作用 (interaction)_ (ユーザーのアドレスへのETHの送信) の実行に進みます。これにより、コントラクトは外部呼び出しの前にストレージを確実に更新し、最初の攻撃を可能にしたリエントランシーの条件を排除します。`Attacker` コントラクトは依然として `NoLongerAVictim` にコールバックできますが、`balances[msg.sender]` は0に設定されているため、追加の引き出しはエラーをスローします。

もう1つのオプションは、関数の呼び出しが完了するまでコントラクトの状態の一部をロックする、相互排他ロック (一般に「ミューテックス」と呼ばれます) を使用することです。これは、関数の実行前に `true` に設定され、呼び出しが完了した後に `false` に戻るブール変数を使用して実装されます。以下の例に見られるように、ミューテックスを使用すると、元の呼び出しがまだ処理されている間の再帰的な呼び出しから関数が保護され、リエントランシーが効果的に停止されます。

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // この関数はミューテックスで保護されているため、`msg.sender.call` 内からのリエントラントな呼び出しが再び `withdraw` を呼び出すことはできません。
    //  `return` 文は `true` と評価されますが、モディファイア内の `locked = false` 文は引き続き評価されます。
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

また、アカウントに資金を送信する「プッシュ・ペイメント」システムの代わりに、ユーザーがスマート・コントラクトから資金を引き出す必要がある[プル・ペイメント](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment)システムを使用することもできます。これにより、未知のアドレスで誤ってコードをトリガーする可能性が排除されます (また、特定のサービス拒否攻撃を防ぐこともできます)。

#### 整数アンダーフローとオーバーフロー {#integer-underflows-and-overflows}

整数オーバーフローは、算術演算の結果が許容される値の範囲外になり、表現可能な最小値に「ロールオーバー」したときに発生します。たとえば、`uint8` は 2^8-1=255 までの値しか保存できません。`255` より大きい値になる算術演算はオーバーフローし、車のオドメーターが最大走行距離 (999999) に達すると0にリセットされるのと同じように、`uint` を `0` にリセットします。

整数アンダーフローも同様の理由で発生します。算術演算の結果が許容範囲を下回った場合です。`uint8` で `0` をデクリメントしようとしたとすると、結果は単に表現可能な最大値 (`255`) にロールオーバーします。

整数オーバーフローとアンダーフローはどちらも、コントラクトの状態変数に予期しない変更をもたらし、計画外の実行につながる可能性があります。以下は、攻撃者がスマート・コントラクトの算術オーバーフローを悪用して無効な操作を実行する方法を示す例です。

```
pragma solidity ^0.7.6;

// このコントラクトは、タイムボールトとして機能するように設計されています。
// ユーザーはこのコントラクトに入金できますが、少なくとも1週間は引き出すことができません。
// ユーザーは待機時間を1週間の待機期間を超えて延長することもできます。

/*
1. TimeLockをデプロイする
2. TimeLockのアドレスを使用してAttackをデプロイする
3. 1 etherを送信してAttack.attackを呼び出す。すぐにetherを引き出すことができるようになります。

何が起こったのか？
AttackはTimeLock.lockTimeをオーバーフローさせ、1週間の待機期間の前に引き出すことができました。
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        t = 現在のロック時間である場合、次のようなxを見つける必要があります。
        x + t = 2**256 = 0
        したがって x = -t
        2**256 = type(uint).max + 1
        したがって x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### 整数アンダーフローとオーバーフローを防ぐ方法 {#}

バージョン0.8.0以降、Solidityコンパイラは整数アンダーフローおよびオーバーフローを引き起こすコードを拒否します。ただし、より低いコンパイラ・バージョンでコンパイルされたコントラクトは、算術演算を含む関数でチェックを実行するか、アンダーフロー/オーバーフローをチェックするライブラリ (例: [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) を使用する必要があります。

#### オラクルの操作 {#oracle-manipulation}

[オラクル](/developers/docs/oracles/)はオフチェーンの情報を取得し、スマート・コントラクトが使用できるようにオンチェーンに送信します。オラクルを使用すると、資本市場などのオフチェーン・システムと相互運用するスマート・コントラクトを設計でき、その用途が大幅に広がります。

しかし、オラクルが破損して誤った情報をオンチェーンに送信した場合、スマート・コントラクトは誤った入力に基づいて実行され、問題を引き起こす可能性があります。これが「オラクル問題」の基礎であり、ブロックチェーン・オラクルからの情報が正確で、最新であり、タイムリーであることを保証するタスクに関係しています。

関連するセキュリティ上の懸念事項は、分散型取引所などのオンチェーン・オラクルを使用して資産のスポット価格を取得することです。[分散型金融 (DeFi)](/defi/)業界のレンディング・プラットフォームは、ユーザーの担保の価値を決定して、いくら借りることができるかを決定するために、これを頻繁に行います。

DEXの価格は多くの場合正確ですが、これは主にアービトラージャーが市場のパリティを回復しているためです。しかし、特にオンチェーン・オラクルが (通常そうであるように) 過去の取引パターンに基づいて資産価格を計算する場合、それらは操作される可能性があります。

たとえば、攻撃者はレンディング・コントラクトとやり取りする直前にフラッシュ・ローンを利用することで、資産のスポット価格を人為的に吊り上げる可能性があります。DEXに資産の価格を照会すると、(攻撃者の大規模な「買い注文」が資産の需要を歪めるため) 通常よりも高い値が返され、本来よりも多く借り入れることが可能になります。このような「フラッシュ・ローン攻撃」は、DeFiアプリケーション間の価格オラクルへの依存を悪用するために使用されており、プロトコルに数百万ドルの資金損失をもたらしています。

##### オラクルの操作を防ぐ方法 {#}

[オラクルの操作を回避する](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples)ための最小要件は、単一障害点を回避するために複数のソースから情報を照会する分散型オラクル・ネットワークを使用することです。ほとんどの場合、分散型オラクルには、オラクル・ノードが正しい情報を報告することを奨励する暗号経済的インセンティブが組み込まれており、中央集権型オラクルよりも安全です。

資産価格についてオンチェーン・オラクルに照会する予定がある場合は、時間加重平均価格 (TWAP) メカニズムを実装しているオラクルの使用を検討してください。[TWAPオラクル](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles)は、(変更可能な) 2つの異なる時点での資産の価格を照会し、得られた平均に基づいてスポット価格を計算します。より長い期間を選択すると、最近実行された大量の注文が資産価格に影響を与えることができないため、価格操作からプロトコルが保護されます。

## 開発者向けスマート・コントラクト・セキュリティ・リソース {#smart-contract-security-resources-for-developers}

### スマート・コントラクトの分析とコードの正確性を検証するためのツール {#code-analysis-tools}

- **[テストツールとライブラリ](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _スマート・コントラクトのユニットテスト、静的解析、動的解析を実行するための業界標準のツールとライブラリのコレクション。_

- **[形式的検証ツール](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _スマート・コントラクトの機能的な正確性を検証し、不変条件をチェックするためのツール。_

- **[スマート・コントラクト監査サービス](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _イーサリアム開発プロジェクト向けにスマート・コントラクトの監査サービスを提供する組織のリスト。_

- **[バグバウンティ・プラットフォーム](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _バグバウンティを調整し、スマート・コントラクトの重大な脆弱性の責任ある開示に報酬を与えるためのプラットフォーム。_

- **[Fork Checker](https://forkchecker.hashex.org/)** - _フォークされたコントラクトに関する利用可能なすべての情報を確認するための無料オンラインツール。_

- **[ABI Encoder](https://abi.hashex.org/)** - _Solidityコントラクトの関数とコンストラクタの引数をエンコードするための無料オンラインサービス。_

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _抽象構文木 (AST) をトラバースして疑わしい脆弱性を特定し、わかりやすいマークダウン形式で問題を出力するSolidity静的解析ツール。_

### スマート・コントラクトを監視するためのツール {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _スマート・コントラクトやウォレットで異常または予期しないイベントが発生したときに、リアルタイムで通知を受け取るためのツール。_

### スマート・コントラクトの安全な管理のためのツール {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _トランザクションを実行する前に、最小限の人数による承認を必要とする (M-of-N)、イーサリアム上で稼働するスマート・コントラクト・ウォレット。_

- **[オープンツェッペリン・コントラクト](https://docs.openzeppelin.com/contracts/5.x/)** - _コントラクトの所有権、アップグレード、アクセス制御、ガバナンス、一時停止機能などの管理機能を実装するためのコントラクト・ライブラリ。_

### スマート・コントラクト監査サービス {#smart-contract-auditing-services}

- **[コンセンシス・ディリジェンス](https://diligence.consensys.io/)** - _ブロックチェーン・エコシステム全体のプロジェクトが、プロトコルのローンチ準備を整え、ユーザーを保護するように構築されていることを確認するのを支援するスマート・コントラクト監査サービス。_

- **[CertiK](https://www.certik.com/)** - _スマート・コントラクトやブロックチェーン・ネットワークにおいて、最先端の形式的検証技術の利用を先駆けて行うブロックチェーン・セキュリティ企業。_

- **[Trail of Bits](https://www.trailofbits.com/)** - _セキュリティ研究と攻撃者の視点を組み合わせて、リスクを軽減しコードを強化するサイバーセキュリティ企業。_

- **[PeckShield](https://peckshield.com/)** - _ブロックチェーン・エコシステム全体のセキュリティ、プライバシー、ユーザビリティのための製品とサービスを提供するブロックチェーン・セキュリティ企業。_

- **[QuantStamp](https://quantstamp.com/)** - _セキュリティおよびリスク評価サービスを通じて、ブロックチェーン技術のメインストリームへの普及を促進する監査サービス。_

- **[オープンツェッペリン](https://www.openzeppelin.com/security-audits)** - _分散型システム向けのセキュリティ監査を提供するスマート・コントラクト・セキュリティ企業。_

- **[Runtime Verification](https://runtimeverification.com/)** - _スマート・コントラクトの形式的モデリングと検証を専門とするセキュリティ企業。_

- **[Hacken](https://hacken.io)** - _ブロックチェーン・セキュリティに360度のアプローチをもたらすWeb3サイバーセキュリティ監査機関。_

- **[ネザーマインド](https://www.nethermind.io/smart-contract-audits)** - _イーサリアムおよびスタークネット全体でスマート・コントラクトの完全性とユーザーの安全性を確保する、SolidityおよびCairoの監査サービス。_

- **[HashEx](https://hashex.org/)** - _HashExは、暗号資産のセキュリティを確保するためのブロックチェーンおよびスマート・コントラクトの監査に注力しており、スマート・コントラクト開発、ペネトレーションテスト、ブロックチェーン・コンサルティングなどのサービスを提供しています。_

- **[Code4rena](https://code4rena.com/)** - _スマート・コントラクトのセキュリティ専門家に脆弱性の発見を促し、Web3をより安全にするための競争型監査プラットフォーム。_

- **[CodeHawks](https://codehawks.com/)** - _セキュリティ研究者向けにスマート・コントラクト監査コンペティションを主催する競争型監査プラットフォーム。_

- **[Cyfrin](https://cyfrin.io)** - _製品やスマート・コントラクト監査サービスを通じて暗号資産のセキュリティを育成する、Web3セキュリティの有力企業。_

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _経験豊富な監査チームとクラス最高のツールを通じて、ブロックチェーン・システムのセキュリティ監査を提供するWeb3セキュリティ企業。_

- **[Oxorio](https://oxor.io/)** - _暗号資産企業やDeFiプロジェクト向けに、EVM、Solidity、ZK、クロスチェーン技術の専門知識を備えたスマート・コントラクト監査およびブロックチェーン・セキュリティ・サービス。_

- **[Inference](https://inference.ag/)** - _EVMベースのブロックチェーン向けスマート・コントラクト監査を専門とするセキュリティ監査企業。専門の監査人により、潜在的な問題を特定し、デプロイ前に修正するための実行可能な解決策を提案します。_

### バグバウンティ・プラットフォーム {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _スマート・コントラクトおよびDeFiプロジェクト向けのバグバウンティ・プラットフォーム。セキュリティ研究者がコードをレビューし、脆弱性を開示して報酬を得ることで、暗号資産をより安全にします。_

- **[HackerOne](https://www.hackerone.com/)** - _企業とペネトレーションテスターやサイバーセキュリティ研究者を結びつける、脆弱性調整およびバグバウンティ・プラットフォーム。_

- **[HackenProof](https://hackenproof.com/)** - _暗号資産プロジェクト (DeFi、スマート・コントラクト、ウォレット、CEXなど) 向けの専門的なバグバウンティ・プラットフォーム。セキュリティ専門家がトリアージサービスを提供し、研究者は関連性が確認されたバグレポートに対して報酬を受け取ります。_

-  **[Sherlock](https://www.sherlock.xyz/)** - _スマート・コントラクト・セキュリティのためのWeb3の引受機関。関連するバグに対して公正に報酬が支払われるよう、監査人への支払いはスマート・コントラクトを通じて管理されます。_

-  **[CodeHawks](https://www.codehawks.com/)** - _監査人がセキュリティコンテストやチャレンジに参加し、(将来的には) 独自のプライベート監査にも参加できる競争型バグバウンティ・プラットフォーム。_

### 既知のスマート・コントラクトの脆弱性とエクスプロイトに関する出版物 {#common-smart-contract-vulnerabilities-and-exploits}

- **[コンセンシス: スマート・コントラクトの既知の攻撃](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _最も重大なコントラクトの脆弱性に関する初心者向けの説明。ほとんどのケースでサンプルコードが用意されています。_

- **[SWC Registry](https://swcregistry.io/)** - _イーサリアムのスマート・コントラクトに適用される共通脆弱性タイプ一覧 (CWE) 項目の厳選リスト。_

- **[Rekt](https://rekt.news/)** - _注目を集める暗号資産のハッキングやエクスプロイトに関する定期的に更新される出版物。詳細な事後レポートも掲載されています。_

### スマート・コントラクト・セキュリティを学ぶためのチャレンジ {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _ブロックチェーン・セキュリティのウォーゲーム、チャレンジ、[Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/)コンペティション、および解決策の解説の厳選リスト。_

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _DeFiスマート・コントラクトのオフェンシブ・セキュリティを学び、バグハンティングやセキュリティ監査のスキルを構築するためのウォーゲーム。_

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _各レベルが「ハッキング」される必要のあるスマート・コントラクトになっている、Web3/Solidityベースのウォーゲーム。_

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _ファンタジー・アドベンチャーを舞台にしたスマート・コントラクトのハッキングチャレンジ。チャレンジを無事に完了すると、プライベートなバグバウンティ・プログラムへのアクセス権も得られます。_

### スマート・コントラクトを保護するためのベストプラクティス {#smart-contract-security-best-practices}

- **[コンセンシス: イーサリアム・スマート・コントラクト・セキュリティのベストプラクティス](https://consensys.github.io/smart-contract-best-practices/)** - _イーサリアムのスマート・コントラクトを保護するための包括的なガイドラインのリスト。_

- **[Nascent: シンプル・セキュリティ・ツールキット](https://github.com/nascentxyz/simple-security-toolkit)** - _スマート・コントラクト開発のための、実践的でセキュリティに焦点を当てたガイドとチェックリストのコレクション。_

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _スマート・コントラクト・プログラミング言語Solidityの安全なパターンとベストプラクティスの役立つまとめ。_

- **[Solidityドキュメント: セキュリティの考慮事項](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Solidityで安全なスマート・コントラクトを記述するためのガイドライン。_

- **[スマート・コントラクト・セキュリティ検証標準](https://github.com/securing/SCSVS)** - _開発者、アーキテクト、セキュリティレビュアー、ベンダー向けにスマート・コントラクトのセキュリティを標準化するために作成された14部構成のチェックリスト。_

- **[スマート・コントラクトのセキュリティと監査を学ぶ](https://updraft.cyfrin.io/courses/security)** - _セキュリティのベストプラクティスをレベルアップし、セキュリティ研究者を目指すスマート・コントラクト開発者のために作成された、究極のスマート・コントラクト・セキュリティおよび監査コース。_

### スマート・コントラクト・セキュリティに関するチュートリアル {#tutorials-on-smart-contract-security}

- [安全なスマート・コントラクトの書き方](/developers/tutorials/secure-development-workflow/)

- [スリザーを使用してスマート・コントラクトのバグを見つける方法](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [マンティコアを使用してスマート・コントラクトのバグを見つける方法](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [スマート・コントラクト・セキュリティ・ガイドライン](/developers/tutorials/smart-contract-security-guidelines/)

- [トークン・コントラクトを任意のトークンと安全に統合する方法](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - スマート・コントラクトのセキュリティと監査のフルコース](https://updraft.cyfrin.io/courses/security)