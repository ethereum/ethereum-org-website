---
title: "スマート・コントラクトのテスト"
description: "イーサリアムのスマート・コントラクトをテストするための手法と考慮事項の概要。"
lang: ja
---

イーサリアムのようなパブリック・ブロックチェーンはイミュータブルであるため、デプロイ後にスマート・コントラクトのコードを変更することは困難です。「仮想的なアップグレード」を実行するための[コントラクトのアップグレードパターン](/developers/docs/smart-contracts/upgrading/)は存在しますが、これらを実装するのは難しく、社会的コンセンサスを必要とします。さらに、アップグレードはエラーが発見された_後_にのみ修正できます。攻撃者が先に脆弱性を発見した場合、スマート・コントラクトはエクスプロイトの危険にさらされます。

これらの理由から、メインネットに[デプロイ](/developers/docs/smart-contracts/deploying/)する前にスマート・コントラクトをテストすることは、[セキュリティ](/developers/docs/smart-contracts/security/)の最低条件です。コントラクトをテストし、コードの正確性を評価するための手法は多数あり、どれを選択するかはニーズによって異なります。それでも、さまざまなツールやアプローチで構成されたテストスイートは、コントラクトコードの軽微なセキュリティ上の欠陥と重大なセキュリティ上の欠陥の両方を検出するのに理想的です。

## 前提条件 {#prerequisites}

このページでは、イーサリアム・ネットワークにデプロイする前にスマート・コントラクトをテストする方法について説明します。[スマート・コントラクト](/developers/docs/smart-contracts/)に精通していることを前提としています。

## スマート・コントラクトのテストとは？ {#what-is-smart-contract-testing}

スマート・コントラクトのテストとは、スマート・コントラクトのコードが期待通りに機能することを検証するプロセスです。テストは、特定のスマート・コントラクトが信頼性、ユーザビリティ、セキュリティの要件を満たしているかを確認するのに役立ちます。

アプローチはさまざまですが、ほとんどのテスト手法では、処理が想定されるデータの小さなサンプルを使用してスマート・コントラクトを実行する必要があります。コントラクトがサンプルデータに対して正しい結果を生成する場合、適切に機能していると見なされます。ほとんどのテストツールは、コントラクトの実行が期待される結果と一致するかどうかを確認するための[テストケース](https://en.m.wikipedia.org/wiki/Test_case)を作成および実行するためのリソースを提供しています。

### スマート・コントラクトをテストすることが重要な理由 {#importance-of-testing-smart-contracts}

スマート・コントラクトは高価値の金融資産を管理することが多いため、軽微なプログラミングエラーが[ユーザーに多大な損失](https://rekt.news/leaderboard/)をもたらす可能性があり、実際にそうなることがよくあります。しかし、厳密なテストを行うことで、スマート・コントラクトのコードの欠陥や問題を早期に発見し、メインネットでローンチする前に修正することができます。

バグが発見された場合にコントラクトをアップグレードすることは可能ですが、アップグレードは複雑であり、不適切に処理されると[エラーを引き起こす](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)可能性があります。さらに、コントラクトのアップグレードは不変性の原則を否定し、ユーザーに追加のトラスト前提を負担させます。逆に、コントラクトをテストするための包括的な計画は、スマート・コントラクトのセキュリティリスクを軽減し、デプロイ後に複雑なロジックのアップグレードを実行する必要性を減らします。

## スマート・コントラクトのテスト手法 {#methods-for-testing-smart-contracts}

イーサリアムのスマート・コントラクトをテストする手法は、大きく分けて**自動テスト**と**手動テスト**の2つのカテゴリに分類されます。自動テストと手動テストにはそれぞれ独自の利点とトレードオフがありますが、両方を組み合わせることで、コントラクトを分析するための堅牢な計画を作成できます。

### 自動テスト {#automated-testing}

自動テストでは、スマート・コントラクトのコードに実行時のエラーがないかを自動的にチェックするツールを使用します。自動テストの利点は、[スクリプト](https://www.techtarget.com/whatis/definition/script?amp=1)を使用してコントラクトの機能の評価をガイドできることです。スクリプト化されたテストは、人間の介入を最小限に抑えて繰り返し実行するようにスケジュールできるため、自動テストは手動のテストアプローチよりも効率的です。

自動テストは、テストが反復的で時間がかかる場合、手動で実行するのが難しい場合、人為的エラーが発生しやすい場合、または重要なコントラクト機能の評価を伴う場合に特に役立ちます。しかし、自動テストツールには欠点もあります。特定のバグを見逃したり、多くの[誤検知](https://www.contrastsecurity.com/glossary/false-positive)を生成したりする可能性があります。したがって、スマート・コントラクトの自動テストと手動テストを組み合わせるのが理想的です。

### 手動テスト {#manual-testing}

手動テストは人間の支援によるものであり、スマート・コントラクトの正確性を分析する際に、テストスイート内の各テストケースを次々と実行します。これは、コントラクトに対して複数の独立したテストを同時に実行し、失敗したテストと合格したテストをすべて示すレポートを取得できる自動テストとは異なります。

手動テストは、さまざまなテストシナリオを網羅した書面によるテスト計画に従って、1人の個人が実行できます。また、手動テストの一環として、複数の個人またはグループが指定された期間にわたってスマート・コントラクトとやり取りすることもできます。テスターは、コントラクトの実際の動作と期待される動作を比較し、違いがあればバグとしてフラグを立てます。

効果的な手動テストにはかなりのリソース(スキル、時間、資金、労力)が必要であり、人為的エラーにより、テストの実行中に特定のエラーを見逃す可能性があります。しかし、手動テストには利点もあります。たとえば、人間のテスター(監査人など)は直感を使用して、自動テストツールが見逃すようなエッジケースを検出できる場合があります。

## スマート・コントラクトの自動テスト {#automated-testing-for-smart-contracts}

### 単体テスト {#unit-testing-for-smart-contracts}

単体テストは、コントラクトの機能を個別に評価し、各コンポーネントが正しく機能することを確認します。優れた単体テストは、シンプルで実行が速く、テストが失敗した場合に何が問題だったのかを明確に示す必要があります。

単体テストは、関数が期待される値を返すこと、および関数の実行後にコントラクトのストレージが適切に更新されることを確認するのに役立ちます。さらに、コントラクトのコードベースに変更を加えた後に単体テストを実行することで、新しいロジックを追加してもエラーが発生しないことを確認できます。効果的な単体テストを実行するためのガイドラインを以下に示します。

#### スマート・コントラクトの単体テストのガイドライン {#unit-testing-guidelines}

##### 1. コントラクトのビジネスロジックとワークフローを理解する

単体テストを作成する前に、スマート・コントラクトが提供する機能と、ユーザーがそれらの機能にアクセスして使用する方法を知っておくと役立ちます。これは、コントラクト内の関数が有効なユーザー入力に対して正しい出力を返すかどうかを判断する[ハッピーパステスト](https://en.m.wikipedia.org/wiki/Happy_path)を実行する場合に特に役立ちます。この概念について、[オークションコントラクト](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)の(簡略化された)例を使用して説明します。

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

これは、入札期間中に入札を受け付けるように設計されたシンプルなオークションコントラクトです。`highestBid`が増加すると、以前の最高入札者は資金を受け取ります。入札期間が終了すると、`beneficiary`はコントラクトを呼び出して資金を受け取ります。

このようなコントラクトの単体テストでは、ユーザーがコントラクトとやり取りする際に呼び出す可能性のあるさまざまな関数をカバーします。例としては、オークションの進行中にユーザーが入札できるかどうか(つまり、`bid()`の呼び出しが成功するかどうか)を確認する単体テストや、ユーザーが現在の`highestBid`よりも高い入札を行えるかどうかを確認する単体テストなどがあります。

コントラクトの運用ワークフローを理解することは、実行が要件を満たしているかどうかを確認する単体テストを作成するのにも役立ちます。たとえば、オークションコントラクトでは、オークションが終了したとき(つまり、`auctionEndTime`が`block.timestamp`より低いとき)にユーザーが入札できないように指定されています。したがって、開発者は、オークションが終了したとき(つまり、`auctionEndTime` > `block.timestamp`のとき)に`bid()`関数の呼び出しが成功するか失敗するかを確認する単体テストを実行する場合があります。

##### 2. コントラクトの実行に関連するすべての前提条件を評価する

コントラクトの実行に関する前提条件を文書化し、それらの前提条件の妥当性を検証するための単体テストを作成することが重要です。予期しない実行に対する保護を提供するだけでなく、アサーションをテストすることで、スマート・コントラクトのセキュリティモデルを破壊する可能性のある操作について考えるようになります。役立つヒントは、「ハッピーユーザーテスト」を超えて、間違った入力に対して関数が失敗するかどうかを確認するネガティブテストを作成することです。

多くの単体テストフレームワークでは、アサーション(コントラクトができることとできないことを示す単純なステートメント)を作成し、テストを実行して、実行時にそれらのアサーションが成立するかどうかを確認できます。前述のオークションコントラクトに取り組んでいる開発者は、ネガティブテストを実行する前に、その動作について次のようなアサーションを行うことができます。

- オークションが終了している場合、または開始されていない場合、ユーザーは入札できません。

- 入札が許容されるしきい値を下回る場合、オークションコントラクトはリバートします。

- 落札できなかったユーザーには資金が返還されます。

**注**: 前提条件をテストする別の方法は、コントラクト内の[関数修飾子](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers)、特に`require`、`assert`、および`if…else`ステートメントをトリガーするテストを作成することです。

##### 3. コードカバレッジを測定する

[コードカバレッジ](https://en.m.wikipedia.org/wiki/Code_coverage)は、テスト中に実行されたコード内のブランチ、行、およびステートメントの数を追跡するテスト指標です。テストされていない脆弱性のリスクを最小限に抑えるために、テストは優れたコードカバレッジを持つ必要があります。十分なカバレッジがないと、すべてのテストに合格したためコントラクトは安全であると誤って想定してしまう可能性がありますが、テストされていないコードパスには依然として脆弱性が存在します。ただし、高いコードカバレッジを記録することで、スマート・コントラクト内のすべてのステートメント/関数が正確性について十分にテストされたという保証が得られます。

##### 4. 十分に開発されたテストフレームワークを使用する

スマート・コントラクトの単体テストの実行に使用されるツールの品質は非常に重要です。理想的なテストフレームワークとは、定期的にメンテナンスされており、便利な機能(ログ記録やレポート機能など)を提供し、他の開発者によって広く使用され、精査されているものです。

Solidityスマート・コントラクトの単体テストフレームワークは、さまざまな言語(主にJavaScript、Python、Rust)で提供されています。さまざまなテストフレームワークを使用して単体テストの実行を開始する方法については、以下のガイドのいくつかを参照してください。

- **[Brownieを使用した単体テストの実行](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Foundryを使用した単体テストの実行](https://book.getfoundry.sh/forge/writing-tests)**
- **[Waffleを使用した単体テストの実行](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Remixを使用した単体テストの実行](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Apeを使用した単体テストの実行](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Hardhatを使用した単体テストの実行](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Wakeを使用した単体テストの実行](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### 統合テスト {#integration-testing-for-smart-contracts}

単体テストはコントラクトの関数を個別にデバッグしますが、統合テストはスマート・コントラクトのコンポーネントを全体として評価します。統合テストでは、クロスコントラクト呼び出しや、同じスマート・コントラクト内の異なる関数間の相互作用から生じる問題を検出できます。たとえば、統合テストは、[継承](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance)や依存性の注入などが適切に機能するかどうかを確認するのに役立ちます。

統合テストは、コントラクトがモジュール式アーキテクチャを採用している場合や、実行時に他のオンチェーンのコントラクトとインターフェースをとる場合に役立ちます。統合テストを実行する1つの方法は、特定の高さで[ブロックチェーンをフォーク](/glossary/#fork)し([Forge](https://book.getfoundry.sh/forge/fork-testing)や[Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)などのツールを使用)、コントラクトとデプロイされたコントラクト間の相互作用をシミュレートすることです。

フォークされたブロックチェーンはメインネットと同様に動作し、関連する状態と残高を持つアカウントを持ちます。しかし、これはサンドボックス化されたローカル開発環境としてのみ機能するため、たとえばトランザクションに実際のETHは必要なく、変更が実際のイーサリアム・プロトコルに影響を与えることもありません。

### プロパティベーステスト {#property-based-testing-for-smart-contracts}

プロパティベーステストは、スマート・コントラクトが定義されたプロパティを満たしていることを確認するプロセスです。プロパティは、さまざまなシナリオで真であり続けると予想されるコントラクトの動作に関する事実をアサートします。スマート・コントラクトのプロパティの例としては、「コントラクト内の算術演算は決してオーバーフローまたはアンダーフローしない」などが挙げられます。

<strong>静的分析</strong>と**動的分析**は、プロパティベーステストを実行するための2つの一般的な手法であり、どちらもプログラム(この場合はスマート・コントラクト)のコードが事前定義されたプロパティを満たしていることを検証できます。一部のプロパティベーステストツールには、期待されるコントラクトのプロパティに関する事前定義されたルールが付属しており、それらのルールに照らしてコードをチェックします。一方、スマート・コントラクトのカスタムプロパティを作成できるツールもあります。

#### 静的分析 {#static-analysis}

静的アナライザーは、スマート・コントラクトのソースコードを入力として受け取り、コントラクトがプロパティを満たしているかどうかを宣言する結果を出力します。動的分析とは異なり、静的分析ではコントラクトを実行して正確性を分析することはありません。代わりに、静的分析は、スマート・コントラクトが実行時にたどる可能性のあるすべてのパスについて推論します(つまり、ソースコードの構造を調べて、実行時のコントラクトの操作にとってそれが何を意味するかを判断します)。

[リンティング](https://www.perforce.com/blog/qac/what-is-linting)と[静的テスト](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis)は、コントラクトで静的分析を実行するための一般的な方法です。どちらも、コンパイラによって出力される[抽象構文木](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree)や[制御フローグラフ](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/)など、コントラクトの実行の低レベルの表現を分析する必要があります。

ほとんどの場合、静的分析は、安全でない構造の使用、構文エラー、コントラクトコードのコーディング標準違反などの安全上の問題を検出するのに役立ちます。ただし、静的アナライザーは一般に、より深い脆弱性の検出には不完全であることが知られており、過剰な誤検知を生成する可能性があります。

#### 動的分析 {#dynamic-analysis}

動的分析は、スマート・コントラクトの関数に対してシンボリック入力(例: [シンボリック実行](https://en.m.wikipedia.org/wiki/Symbolic_execution))または具体的な入力(例: [ファジング](https://owasp.org/www-community/Fuzzing))を生成し、実行トレースが特定のプロパティに違反していないかを確認します。この形式のプロパティベーステストは、テストケースが複数のシナリオをカバーし、プログラムがテストケースの生成を処理するという点で単体テストとは異なります。

[ファジング](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing)は、スマート・コントラクトの任意のプロパティを検証するための動的分析手法の例です。ファザーは、定義された入力値のランダムなバリエーションまたは不正なバリエーションを使用して、ターゲットコントラクトの関数を呼び出します。スマート・コントラクトがエラー状態(アサーションが失敗する状態など)に入ると、問題にフラグが立てられ、実行を脆弱なパスに導く入力がレポートに生成されます。

予期しない入力の不適切な処理は、意図しない実行を引き起こし、危険な影響をもたらす可能性があるため、ファジングはスマート・コントラクトの入力検証メカニズムを評価するのに役立ちます。この形式のプロパティベーステストは、多くの理由から理想的です。

1. **多くのシナリオをカバーするテストケースを作成するのは困難です。** プロパティテストでは、動作と、その動作をテストするためのデータの範囲を定義するだけで済みます。プログラムは、定義されたプロパティに基づいてテストケースを自動的に生成します。

2. **テストスイートがプログラム内のすべての可能なパスを十分にカバーしていない可能性があります。** 100%のカバレッジであっても、エッジケースを見逃す可能性があります。

3. **単体テストは、コントラクトがサンプルデータに対して正しく実行されることを証明しますが、サンプル外の入力に対してコントラクトが正しく実行されるかどうかは不明のままです。** プロパティテストは、指定された入力値の複数のバリエーションを使用してターゲットコントラクトを実行し、アサーションの失敗を引き起こす実行トレースを見つけます。したがって、プロパティテストは、コントラクトが幅広いクラスの入力データに対して正しく実行されるというより多くの保証を提供します。

### スマート・コントラクトのプロパティベーステストを実行するためのガイドライン {#running-property-based-tests}

プロパティベーステストの実行は通常、スマート・コントラクトで検証したいプロパティ(例: [整数オーバーフロー](https://github.com/ConsenSysDiligence/mythril/wiki/Integer-Overflow)がないこと)またはプロパティのコレクションを定義することから始まります。また、プロパティテストを作成する際に、プログラムがトランザクション入力用のデータを生成できる値の範囲を定義する必要がある場合もあります。

適切に構成されると、プロパティテストツールはランダムに生成された入力を使用してスマート・コントラクトの関数を実行します。アサーション違反がある場合は、評価中のプロパティに違反する具体的な入力データを含むレポートを取得できるはずです。さまざまなツールを使用してプロパティベーステストの実行を開始するには、以下のガイドのいくつかを参照してください。

- **[スリザーを使用したスマート・コントラクトの静的分析](https://github.com/crytic/slither)**
- **[Wakeを使用したスマート・コントラクトの静的分析](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Brownieを使用したプロパティベーステスト](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Foundryを使用したコントラクトのファジング](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[エキドナを使用したコントラクトのファジング](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Wakeを使用したコントラクトのファジング](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[マンティコアを使用したスマート・コントラクトのシンボリック実行](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Mythrilを使用したスマート・コントラクトのシンボリック実行](https://github.com/ConsenSysDiligence/mythril/blob/develop/docs/source/tutorial.rst)**

## スマート・コントラクトの手動テスト {#manual-testing-for-smart-contracts}

スマート・コントラクトの手動テストは、多くの場合、自動テストを実行した後の開発サイクルの後半に行われます。この形式のテストでは、スマート・コントラクトを1つの完全に統合された製品として評価し、技術要件で指定されたとおりに機能するかどうかを確認します。

### ローカルブロックチェーンでのコントラクトのテスト {#testing-on-local-blockchain}

ローカル開発環境で実行される自動テストは有用なデバッグ情報を提供できますが、本番環境でスマート・コントラクトがどのように動作するかを知りたいと思うでしょう。しかし、メインのイーサリアムチェーンへのデプロイにはガス代がかかります。スマート・コントラクトにまだバグがある場合、あなたやユーザーが実際の資金を失う可能性があることは言うまでもありません。

ローカルブロックチェーン([開発ネットワーク](/developers/docs/development-networks/)とも呼ばれます)でコントラクトをテストすることは、メインネットでのテストに代わる推奨される方法です。ローカルブロックチェーンは、コンピューター上でローカルに実行されるイーサリアム・ブロックチェーンのコピーであり、イーサリアムの実行レイヤーの動作をシミュレートします。そのため、大きなオーバーヘッドを発生させることなく、コントラクトとやり取りするトランザクションをプログラムできます。

ローカルブロックチェーンでコントラクトを実行することは、手動の統合テストの形式として役立つ場合があります。[スマート・コントラクトは非常にコンポーザブル](/developers/docs/smart-contracts/composability/)であり、既存のプロトコルと統合できますが、そのような複雑なオンチェーンの相互作用が正しい結果を生み出すことを確認する必要があります。

[開発ネットワークの詳細。](/developers/docs/development-networks/)

### テストネットでのコントラクトのテスト {#testing-contracts-on-testnets}

テストネットワークまたはテストネットは、現実世界での価値を持たないイーサ(ETH)を使用することを除いて、イーサリアム・メインネットとまったく同じように機能します。[テストネット](/developers/docs/networks/#ethereum-testnets)にコントラクトをデプロイすると、資金を危険にさらすことなく、誰でも(分散型アプリケーション(dapp)のフロントエンドなどを介して)コントラクトとやり取りできるようになります。

この形式の手動テストは、ユーザーの視点からアプリケーションのエンドツーエンドのフローを評価するのに役立ちます。ここでは、ベータテスターが試運転を実行し、コントラクトのビジネスロジックや全体的な機能に関する問題を報告することもできます。

ローカルブロックチェーンでテストした後にテストネットにデプロイするのが理想的です。前者はイーサリアム仮想マシンの動作に近いからです。したがって、多くのイーサリアムネイティブプロジェクトでは、現実世界の条件下でスマート・コントラクトの動作を評価するために、テストネットにdappをデプロイするのが一般的です。

[イーサリアムのテストネットの詳細。](/developers/docs/development-networks/#public-beacon-testchains)

## テストと形式的検証の比較 {#testing-vs-formal-verification}

テストは、コントラクトが一部のデータ入力に対して期待される結果を返すことを確認するのに役立ちますが、テスト中に使用されなかった入力に対して同じことを決定的に証明することはできません。したがって、スマート・コントラクトのテストでは、「機能の正確性」を保証することはできません(つまり、プログラムが_すべて_の入力値のセットに対して必要に応じて動作することを示すことはできません)。

形式的検証は、プログラムの形式モデルが形式仕様と一致するかどうかを確認することで、ソフトウェアの正確性を評価するアプローチです。形式モデルはプログラムの抽象的な数学的表現であり、形式仕様はプログラムのプロパティ(つまり、プログラムの実行に関する論理的アサーション)を定義します。

プロパティは数学的な用語で記述されるため、論理的な推論規則を使用して、システムの形式的(数学的)モデルが仕様を満たしていることを検証することが可能になります。したがって、形式的検証ツールは、システムの正確性の「数学的証明」を生成すると言われています。

テストとは異なり、形式的検証を使用すると、サンプルデータを使用して実行することなく、スマート・コントラクトの実行が_すべて_の実行に対して形式仕様を満たしていること(つまり、バグがないこと)を検証できます。これにより、数十の単体テストの実行に費やす時間が短縮されるだけでなく、隠れた脆弱性を発見するのにも効果的です。とはいえ、形式的検証手法は、実装の難易度と有用性に応じてスペクトル上にあります。

[スマート・コントラクトの形式的検証の詳細。](/developers/docs/smart-contracts/formal-verification)

## テストと監査およびバグバウンティの比較 {#testing-vs-audits-bug-bounties}

前述のように、厳密なテストを行ってもコントラクトにバグがないことを保証できることはめったにありません。形式的検証アプローチは正確性のより強力な保証を提供できますが、現在は使用が難しく、かなりのコストがかかります。

それでも、独立したコードレビューを受けることで、コントラクトの脆弱性を発見する可能性をさらに高めることができます。[スマート・コントラクトの監査](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/)と[バグバウンティ](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)は、他の人にコントラクトを分析してもらうための2つの方法です。

監査は、スマート・コントラクトのセキュリティ上の欠陥や不適切な開発手法の事例を見つける経験が豊富な監査人によって実行されます。監査には通常、テスト(および場合によっては形式的検証)と、コードベース全体の手動レビューが含まれます。

逆に、バグバウンティプログラムでは通常、スマート・コントラクトの脆弱性を発見して開発者に開示した個人(一般に[ホワイトハットハッカー](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>))と呼ばれます)に金銭的な報酬を提供します。バグバウンティは、スマート・コントラクトの欠陥を見つけるために他の人に協力を求めるという点で監査に似ています。

主な違いは、バグバウンティプログラムはより広範な開発者/ハッカーコミュニティに開かれており、独自のスキルと経験を持つ幅広いクラスの倫理的ハッカーや独立したセキュリティ専門家を惹きつけることです。これは、限られた、または狭い専門知識しか持たない可能性のあるチームに主に依存するスマート・コントラクトの監査に対する利点となる可能性があります。

## テストツールとライブラリ {#testing-tools-and-libraries}

### 単体テストツール {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Solidityで記述されたスマート・コントラクト用のコードカバレッジツール。_

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _高度なスマート・コントラクト開発およびテスト用のフレームワーク(Ethers.jsベース)。_

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Solidityスマート・コントラクトをテストするためのツール。コントラクトのテストケースを作成して実行するために使用されるRemix IDEの「Solidity Unit Testing」プラグインの下で機能します。_

- **[オープンツェッペリン Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _イーサリアムのスマート・コントラクトテスト用のアサーションライブラリ。コントラクトが期待通りに動作することを確認します！_

- **[Brownie単体テストフレームワーク](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownieは、最小限のコードで小さなテストを作成でき、大規模なプロジェクトにも適切にスケーリングし、拡張性が高い機能豊富なテストフレームワークであるPytestを利用しています。_

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundryは、シンプルな単体テスト、ガス最適化チェック、コントラクトのファジングを実行できる、高速で柔軟なイーサリアムテストフレームワークであるForgeを提供します。_

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Ethers.js、Mocha、Chaiに基づくスマート・コントラクトをテストするためのフレームワーク。_

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _イーサリアム仮想マシンをターゲットとするスマート・コントラクト用のPythonベースの開発およびテストフレームワーク。_

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _強力なデバッグ機能とクロスチェーンテストのサポートを備えた、単体テストとファジング用のPythonベースのフレームワーク。最高のユーザーエクスペリエンスとパフォーマンスを実現するためにpytestとAnvilを利用しています。_

### プロパティベーステストツール {#property-based-testing-tools}

#### 静的分析ツール {#static-analysis-tools}

- **[スリザー](https://github.com/crytic/slither)** - _脆弱性の発見、コード理解の向上、スマート・コントラクトのカスタム分析の作成のためのPythonベースのSolidity静的分析フレームワーク。_

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Solidityスマート・コントラクトプログラミング言語のスタイルとセキュリティのベストプラクティスを適用するためのリンター。_

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Web3スマート・コントラクトのセキュリティと開発のために特別に設計されたRustベースの静的アナライザー。_

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _脆弱性およびコード品質の検出器、コードから有用な情報を抽出するためのプリンター、カスタムサブモジュールの作成のサポートを備えたPythonベースの静的分析フレームワーク。_

- **[Slippy](https://github.com/fvictorio/slippy)** - _Solidity用のシンプルで強力なリンター。_

#### 動的分析ツール {#dynamic-analysis-tools}

- **[エキドナ](https://github.com/crytic/echidna/)** - _プロパティベーステストを通じてスマート・コントラクトの脆弱性を検出するための高速なコントラクトファザー。_

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _スマート・コントラクトコードのプロパティ違反を検出するのに役立つ自動ファジングツール。_

- **[マンティコア](https://manticore.readthedocs.io/en/latest/index.html)** - _EVMバイトコードを分析するための動的シンボリック実行フレームワーク。_

- **[Mythril](https://github.com/ConsenSysDiligence/mythril)** - _テイント分析、コンコリック分析、および制御フローチェックを使用してコントラクトの脆弱性を検出するためのEVMバイトコード評価ツール。_

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribbleは、Diligence FuzzingやMythXなどのツールを使用してコントラクトを自動的にテストできるようにするプロパティでスマート・コントラクトに注釈を付けることができる仕様言語およびランタイム検証ツールです。_

## 関連チュートリアル {#related-tutorials}

- [さまざまなテスト製品の概要と機能比較](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [エキドナを使用してスマート・コントラクトをテストする方法](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [マンティコアを使用してスマート・コントラクトのバグを見つける方法](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [スリザーを使用してスマート・コントラクトのバグを見つける方法](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [テスト用にSolidityコントラクトをモックする方法](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Foundryを使用してSolidityで単体テストを実行する方法](https://www.rareskills.io/post/foundry-testing-solidity)

## 参考文献 {#further-reading}

- [イーサリアムのスマート・コントラクトのテストに関する詳細なガイド](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [イーサリアムのスマート・コントラクトをテストする方法](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [開発者向けのMolochDAOの単体テストガイド](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [ロックスターのようにスマート・コントラクトをテストする方法](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## チュートリアル: イーサリアムでのスマート・コントラクトのテスト {#tutorials}

- [ローカルのマルチクライアントテストネットでdAppを開発およびテストする方法](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– ローカルテストネットへのスマート・コントラクトのデプロイとテストの実行のウォークスルー。_
- [テスト用にSolidityスマート・コントラクトをモックする方法](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– モックデータの使用方法と単体テストの実装方法に関する中級チュートリアル。_
- [エキドナを使用してスマート・コントラクトをテストする方法](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– ファジングとスマート・コントラクトのテストに対する高度なアプローチ。_
