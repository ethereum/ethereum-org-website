---
title: スマートコントラクトのテスト
description: イーサリアムスマートコントラクトのテスト方法と考察の概要
lang: ja
---

イーサリアムなどのパブリックブロックチェーンは不変で、一度デプロイされたスマートコントラクトのコードを変更するのは困難です。 「バーチャルアップデート」を実行するための[スマートコントラクトアップグレードのパターン](/developers/docs/smart-contracts/upgrading/)が存在するものの、実装は困難で、かつ社会的コンセンサスも必要です。 さらに、アップグレードは、発見された_後に_エラーを修正できるものにすぎません。攻撃者が先に脆弱性を発見した場合、スマートコントラクトは悪用される可能性があります。

これらの理由から、メインネットに[デプロイする](/developers/docs/smart-contracts/deploying/)前にスマートコントラクトをテストすることは、 [セキュリティ](/developers/docs/smart-contracts/security/)の最小要件です。 テストでは、さまざまな技術を活用してコードの正確性を評価しますが、必要な機能や目的に合わせて選択しなければなりません。 それでも、さまざまなツールとアプローチを組み合わせたテストスイートを使えば、スマートコントラクトコード深刻度にかかわらず、セキュリティ欠陥を見つけることができます。

## 前提知識 {#prerequisites}

このページでは、イーサリアムネットワークにデプロイする前に、スマートコントラクトをテストする方法について説明します。 [スマートコントラクト](/developers/docs/smart-contracts/)の知識があることを前提としています。

## スマートコントラクトのテストとは {#what-is-smart-contract-testing}

スマートコントラクトのテストとは、スマートコントラクトのコードが意図したとおりに動作することを検証するプロセスです。 テストによって、スマートコントラクトの信頼性、使いやすさ、セキュリティ要件を満たしているかどうかを確認することができます。

テストにはさまざまなアプローチがありますが、一般的には、処理することが予想されるデータの小さなサンプルを用いてスマートコントラクトを実行する必要があります。 コントラクトがサンプルデータに対して正しい結果を生成する場合、コントラクトは適切に機能していると判断できます。 テストツールのほとんどは、コントラクトの実行が期待通りであるかどうかを検証するための[テストケース](https://en.m.wikipedia.org/wiki/Test_case)を作成したり実行したりするためのリソースを提供しています。

### スマートコントラクトのテストの重要性 {#importance-of-testing-smart-contracts}

スマートコントラクトでは、高価値の金融資産を管理することが多いため、小さなプログラミングの間違いが[ユーザーに大損失](https://rekt.news/leaderboard/)を与える可能性があります。実際に、そのような事例は度々発生しています。 ただし、厳密なテストを行うことで、スマートコントラクトのコードの欠陥と問題点を早期に発見し、メインネットにリリースする前に修正することができます。

バグが発見された場合、コントラクトをアップグレードすることは可能ですが、アップグレードは複雑で、誤った処理をすると[エラー](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)が発生する可能性があります。 また、アップグレードによって、コントラクトの不変性の原則が損なわれ、ユーザーにさらなる信頼が求められることになります。 一方で、統合的なテスト計画を立てることで、スマートコントラクトのセキュリティリスクを軽減し、デプロイ後に複雑なロジックのアップグレードを実行する必要性を減らすことができます。

## スマートコントラクトのテスト方法 {#methods-for-testing-smart-contracts}

イーサリアムのスマートコントラクトのテスト方法は、大きく分けて**自動テスト**と**手動テスト**の2つがあります。 自動テストと手動テストには、それぞれに長所と短所があります。両方を組み合わせることで、コントラクトを解析するための堅牢な計画を立てることができます。

### 自動テスト {#automated-testing}

自動テストでは、スマートコントラクトのコードを実行して、エラーがないか自動的にチェックするツールを使用します。 自動テストの利点は、[スクリプト](https://www.techtarget.com/whatis/definition/script?amp=1)を使用してコントラクトの機能を評価できることです。 スクリプト化されたテストは、人間の介入を最小限に抑え、繰り返し実行するようにスケジュールできるので、手動によるテストよりも効率的です。

自動テストは、テストが反復的で時間がかかる、手動で実行するのが難しい、人的ミスの影響を受けやすい、重要なコントラクト関数の評価を伴う、などの場合に特に役立ちます。 ただし、自動テストツールには、欠点もあります。例えば、特定のバグを検出できなかったり、多くの[誤検知](https://www.contrastsecurity.com/glossary/false-positive)をしてしまうことがあります。 そのため、スマートコントラクトのテストには、自動テストと手動テストを組み合わせることが望ましいと言えます。

### 手動テスト {#manual-testing}

手動テストは、人が直接操作して行うテストです。スマートコントラクトの正確性を解析する際には、テストスイートの各テストケースを順番に実行します。 これは、コントラクト上で複数の個別のテストを同時に実行し、失敗したテストと合格したすべてのテストを表示したレポートを取得できる自動テストとは異なります。

手動テストは、さまざまなテストシナリオを網羅するように作成されたテスト計画書に従って、個人が実行します。 また、手動テストの一環として、複数の個人やグループが一定期間にわたってスマートコントラクトを操作することもあります。 テスターは、コントラクトの実際の動作と期待される動作を比較して、違いがあればバグとしてフラグを立てます。

効果的な手動テストには、スキル、時間、資金、労力などの多くのリソースが必要になります。また、テストの実行中に人的ミスにより、特定のエラーを見逃すことがあります。 しかし、手動テストにもメリットがあります。例えば、人間のテスト担当者(監査人など)は、自動テストツールでは検出が難しいエッジケースを直感的に見つけることができます。

## スマートコントラクトの自動テスト {#automated-testing-for-smart-contracts}

### 単体テスト {#unit-testing-for-smart-contracts}

単体テストでは、コントラクトの関数を個別に評価し、各コンポーネントが正しく動作するかを確認します。 優れた単体テストとは、シンプルで短時間で実行でき、テストが失敗した場合に、その原因を明確に示せるものです。

単体テストは、期待する値が返されるかどうかと、関数の実行後にコントラクトのストレージが適切に更新されるかどうかを確認するのに効果的です。 また、コントラクトのコードベースに変更を加えた後に単体テストを実行し、新しいロジックの追加によってエラーが発生しないことを確認します。 以下は、効果的な単体テストを実行するためのガイドラインです。

#### スマートコントラクト単体テストのガイドライン {#unit-testing-guidelines}

##### 1. コントラクトのビジネスロジックとワークフローを理解する

スマートコントラクトが提供する機能を理解し、ユーザーがどのように関数にアクセスして使用しているかを把握しておくと、単体テストを作成しやすくなります。 [ハッピーパステスト](https://en.m.wikipedia.org/wiki/Happy_path)を実行する場合に特に有用です。これは、 コントラクト内の関数が有効なユーザーの入力に対して正しい出力を返すかどうかを判断します。 [オークションコントラクト](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)の(要約された)例を用いて、このコンセプトを説明します。

```
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

このオークションコントラクトは、入札期間中に入札を受け付けるシンプルなものです。 `highestBid`が増えた場合は、以前の最高入札者に入札金が支払われます。また、入札期間が終了すると、`beneficiary`はコントラクトを呼び出して入札金を受け取ります。

このようなコントラクトの単体テストでは、コントラクトとやり取りする際にユーザーが呼び出す可能性のあるさまざまな関数をテストします。 例として、オークションが進行中にユーザーが入札できるかどうかを確認するユニットテスト (つまり、`bid()`の呼び出しが成功するかどうか) や、ユーザーが現在の`highestBid`よりも高い入札を行えるかどうかを確認するテストが挙げられます。

コントラクトの操作上のワークフローを理解しておくと、実行内容が要件を満たしているかどうかを確認する単体テストの作成にも役立ちます。 例えば、オークションコントラクトでは、オークションが終了したとき(つまり、`auctionEndTime`が`block.timestamp`よりも小さいとき)は、ユーザーが入札できないようになっています。 この場合、デベロッパーは、オークション終了時(つまり、`auctionEndTime` > `block.timestamp`の場合)に`bid()`関数の呼び出しが成功するか失敗するかをチェックする単体テストを実行するとよいでしょう。

##### 2. コントラクトの実行に関するすべての前提条件を評価する

コントラクトの実行に関する前提を文書化し、それらの前提の妥当性を検証する単体テストを作成することが重要です。 アサーションテストを行うことで、予期しない実行を防ぐことができます。また、スマートコントラクトのセキュリティモデルを破る可能性のある操作について検討する際にも役立ちます。 有用な方法としては、「ユーザーにとって満足のいくテスト」を超えて、間違った入力に対して関数が失敗するかどうかをチェックするネガティブテストを作成することです。

多くの単体テストフレームワークでは、アサーションの作成ができます。アサーションでは、コントラクトで可能・不可能なことを記述する単純なステートメントを作成します。テストを実行すると、それらのアサーションが維持されているかどうかが確認されます。 上記のオークションコントラクトを開発しているデベロッパーは、ネガティブテストを実行する前に、その挙動について次のようなアサーションを作成できます。

- オークションが終了しているか、まだ開始されていない場合、ユーザーは入札することができないこと。

- 入札額が許容しきい値を下回った場合、オークションコントラクトを取り消す(リバートする)こと。

- 落札に失敗したユーザーの資金が確実に戻ること。

**注**: 前提をテストする別の方法としては、特に`require`、`assert`、`if…else`ステートメントなど、コントラクト内の[関数修飾子](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers)をトリガーするテストを作成することです。

##### 3. コードカバレッジを計測する

[コードカバレッジ](https://en.m.wikipedia.org/wiki/Code_coverage)は、テストで実行されたコード内の分岐、行、ステートメントの数を追跡する指標です。 テストには、適切なコードカバレッジが必要です。コードカバレッジが不十分だと、「偽陰性」を引き起こす可能性があります。つまり、コントラクトがすべてのテストに合格しても、依然としてコードに脆弱性が存在する可能性が残ってしまいます。 しかし、高いコードカバレッジを記録していれば、スマートコントラクト内のすべてのステートメントや関数が正確であることを十分に検証することができます。

##### 4. 完成度の高いテストフレームワークを使用する

スマートコントラクトの単体テストを実行するツールの品質は、非常に重要です。 理想的なテストフレームワークは、定期的にメンテナンスされ、便利な機能(ログ機能やレポート機能など)を備えているものです。そして、多くのデベロッパーに広く使用され、よく精査されていることも重要です。

Solidityスマートコントラクト用の単体テストフレームワークは、さまざまな言語(主にJavaScript、Python、Rust)で提供されています。 単体テストの実行を始めるには、以下のさまざまなテストフレームワークのガイドを参照してください。

- **[Brownieを使った単体テストの実行](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Foundryを使った単体テストの実行](https://book.getfoundry.sh/forge/writing-tests)**
- **[Waffleを使った単体テストの実行](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Remixを使った単体テストの実行](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Apeを使った単体テストの実行](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Hardhatを使った単体テストの実行](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Wakeを使った単体テストの実行](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### 統合テスト {#integration-testing-for-smart-contracts}

単体テストでは、コントラクトの関数を個別にデバッグしましたが、統合テストでは、スマートコントラクトのコンポーネント全体を評価します。 統合テストでは、スマートコントラクト間の呼び出しで発生する問題や、同じスマートコントラクト内の異なる関数間のやり取りで発生する問題を検出できます。 例えば、[継承](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance)や依存性注入などの機能が正しく動作するかどうかを確認するのに役立ちます。

統合テストは、コントラクトがモジュラー型アーキテクチャを採用していたり、実行中に他のオンチェーンコントラクトと接続する場合に有用です。 統合テストを実行する方法の1つは、([Forge](https://book.getfoundry.sh/forge/fork-testing)や[Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)などのツールを使用して)ブロックチェーンの特定のブロックの高さで[フォーク](/glossary/#fork)することです。そして、デプロイされたコントラクトと作成したコントラクトのやり取りをシミュレートします。

フォークされたブロックチェーンは、メインネットと同様の仕組みで動作し、アカウントに状態と残高が関連付けられています。 しかし、サンドボックス化されたローカル開発環境としてのみ機能します。例えば、トランザクションに実際のETHは必要なく、変更しても実際のイーサリアムプロトコルに影響することはありません。

### プロパティベースのテスト {#property-based-testing-for-smart-contracts}

プロパティベースのテストは、スマートコントラクトが定義されたプロパティを満たしていることを確認するプロセスです。 プロパティは、コントラクトの行動に関する事実をアサーションします。この事実は、さまざまなシナリオにおいて真であることが期待されるものです。スマートコントラクトプロパティの例としては、「コントラクト内の算術演算は、オーバーフローもアンダーフローもしない」などがあります。

プロパティベースのテストを実行する方法には、**静的分析**と**動的分析**の2つの一般的な手法があります。どちらの手法でも、 プログラムのコード(この場合は、スマートコントラクト)が、事前に定義されたプロパティを満たしていることを検証できます。 プロパティベースのテストツールには、予期されるコントラクトプロパティに対する事前定義されたルールが備えてあり、コードがそれらのルールに違反しているかチェックするものや、スマートコントラクトのカスタムプロパティを作成できるものがあります。

#### 静的解析 {#static-analysis}

静的アナライザーは、スマートコントラクトのソースコードを受け取って解析し、コントラクトがプロパティを満たしているかどうかを判断します。 動的解析とは異なり、静的解析では、コントラクトを実行して正確性の解析を行うことはありません。 静的解析は、スマートコントラクトが実行中にたどる可能性のあるすべてのパスを推論します。つまり、ソースコードの構造を調べて、コントラクトの操作がランタイムで何を意味するかを決定します。

コントラクトで静的解析を実行する一般的な手法として、[リンティング](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important)と[静的テスト](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis)があります。 どちらの手法も、コンパイラによって出力された[抽象構文木](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree)や[制御フローグラフ](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/)など、コントラクト実行における低レベル表現の解析が必要です。

静的解析は、安全でない構造の使用や構文エラー、コントラクトコード内のコーディング規約違反などの安全性の問題を検出するには有効です。 しかし、より深い脆弱性の検出が不得意であることが知られており、過剰な誤検出が生じる可能性があります。

#### 動的解析 {#dynamic-analysis}

動的解析では、シンボリックな入力(例: [シンボリック実行](https://en.m.wikipedia.org/wiki/Symbolic_execution))または具体的な入力(例: [ファジング](https://owasp.org/www-community/Fuzzing))をスマートコントラクトの関数に生成して、実行トレースが特定のプロパティに違反していないかどうかを確認します。 この方式によるプロパティベースのテストでは、単体テストとは異なり、複数のシナリオのテストケースをカバーし、プログラムがテストケースを生成します。

[ファジング](https://halborn.com/what-is-fuzz-testing-fuzzing/)は、動的解析手法の例の1つでスマートコントラクトの任意のプロパティを検証します。 ファザー(fuzzer)は、定義されたランダムまたは不正なバリエーションの入力値で、ターゲットコントラクト内の関数を呼び出します。 スマートコントラクトがエラー状態 (例: アサーションが失敗した状態など) になると、問題に対してフラグが立てられ、実行によって脆弱なパスに向かう入力がレポートに作成されます。

ファジングは、スマートコントラクトの入力検証メカニズムを評価するのに効果的です。なぜなら、予期しない入力を適切に処理しないと、意図しない動作が発生し、悪影響が生じる可能性があるからです。 この方式によるプロパティベースのテストは、以下のような理由から理想的です。

1. **さまざまなシナリオをカバーするテストケースを書くことは難しい**。 プロパティテストでは、振る舞いとその振る舞いをテストするためのデータ範囲を定義するだけです。プログラムは、定義されたプロパティに基づいてテストケースを自動的に生成します。

2. **テストスイートがプログラム内のすべての実行パスを十分にカバーしていないことがある。**100%のカバレッジであっても、エッジケースを見逃す可能性があります。

3. **単体テストでは、コントラクトがサンプルデータに対して正しく実行されることを証明できるが、サンプル外の入力に対して正しく実行されるかどうかは未確認のままである。**プロパティテストでは、ターゲットコントラクトを複数のバリエーションで実行します。 指定された入力値を使用して、アサーションの失敗を引き起こす実行トレースを見つけます。 そのため、プロパティテストでは、広範なクラスの入力データに対してコントラクトが正しく実行されることを、より確実に保証することができます。

### スマートコントラクトでプロパティベースのテストを実行する際のガイドライン {#running-property-based-tests}

プロパティベースのテストの実行では通常、プロパティの定義(例: [整数オーバーフロー](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)がないこと)、またはスマートコントラクト検証を行う必要のあるプロパティのコレクションを定義することから始めます。 プロパティテストを作成するときに、プログラムがトランザクションの入力データを生成するために、その値の範囲の定義が必要になることもあります。

プロパティテストツールは、適切に構成することで、ランダムに生成された入力値を使ってスマートコントラクトの関数を実行することができます。 アサーション違反が発生した場合、評価対象のプロパティに違反する具体的な入力データがレポートに含まれます。 プロパティベースのテストを実行するには、以下のさまざまなツールのガイドを参照してください。

- **[Slitherを使ったスマートコントラクト静的解析](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither#slither)**
- **[Wakeを使ったスマートコントラクト静的解析](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Brownieを使ったプロパティベースのテスト](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Foundryを使ったコントラクトのファジング](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Echidnaを使ったコントラクトのファジング](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Wakeを使ったコントラクトのファジング](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Manticoreを使ったスマートコントラクトのシンボリック実行](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Mythrilを使ったスマートコントラクトのシンボリック実行](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## スマートコントラクトの手動テスト {#manual-testing-for-smart-contracts}

スマートコントラクトの手動テストは、通常、自動テストを行った後の開発サイクルの後半で行われます。 この手動テストでは、スマートコントラクトを完全に統合された1つの製品として評価し、技術要件で指定されたとおりの性能を発揮するかどうかを確認します。

### ローカルブロックチェーンでのコントラクトのテスト {#testing-on-local-blockchain}

ローカルの開発環境で実行される自動テストは、有用なデバッグ情報を提供しますが、実際の環境でスマートコントラクトがどのように動作するかを確認したい場合もあります。 しかし、実際のイーサリアムチェーンにデプロイするとガス代が発生します。また、スマートコントラクトにバグがある場合、ユーザーが実際にお金を失う可能性があることは言うまでもありません。

メインネットでテストする代わりに、ローカルのブロックチェーン([開発ネットワーク](/developers/docs/development-networks/)とも呼ばれます)でコントラクトをテストすることをお勧めします。 ローカルブロックチェーンは、イーサリアムブロックチェーンのコピーで、自分のコンピュータのローカル環境で実行できるものです。これにより、イーサリアムの実行レイヤーの動作をシミュレートすることができます。 そのため、トランザクションをプログラムしてコントラクトとやり取りする際に、多額のコストが発生することはありません。

ローカルのブロックチェーン上でコントラクトを実行するのは、手動で統合テストを行うのに効果的な方法です。 [スマートコントラクトは、柔軟に構成できるようになっています](/developers/docs/smart-contracts/composability/)。これにより、既存のプロトコルと統合できるようになりましたが、複雑なオンチェーンでの相互作用が正しい結果を生み出すかどうかについては、依然として確認する必要があります。

[開発用ネットワークの詳細](/developers/docs/development-networks/)

### テストネットでのスマートコントラクトのテスト {#testing-contracts-on-testnets}

テストネットワークすなわちテストネットは、イーサリアムメインネットとまったく同じ仕様で動作するネットワークです。ただし、テストネットで使用されるイーサ(ETH)は、現実世界で価値がありません。 コントラクトを[テストネット](/developers/docs/networks/#ethereum-testnets)にデプロイすると、資金を失うリスクはありません。また、Dappのフロントエンドなどを介して、誰でもコントラクトとやり取りできるようになります。

この方式の手動テストでは、ユーザーの視点からアプリケーションのエンドツーエンドのフローを評価することができます。 テストネットでは、ベータテスターが試験運用を行い、コントラクトのビジネスロジックや全体的な機能に関する問題を報告することもできます。

テストネットの方がイーサリアム仮想マシンの動作に近いため、ローカルブロックチェーンでテストした後にテストネットにデプロイすることが理想です。 そのため、多くのイーサリアムを使うプロジェクトでは、テストネットにDappをデプロイし、現実世界の条件下でスマートコントラクトの操作を評価するのが一般的です。

[イーサリアムテストネットの詳細](/developers/docs/development-networks/#public-beacon-testchains)

## テストと形式検証の比較 {#testing-vs-formal-verification}

テストは、あるデータの入力に対して、コントラクトが期待通りの結果を返すことを確認するのに役立ちますが、テストで使用されていない入力に対して、同じことを確実に証明できるわけではありません。 したがって、スマートコントラクトのテストでは、「機能的な正しさ」を保証できません。つまり、入力値の_すべての_セットに対して、プログラムが要求通りに動作することを保証することはできません。

形式検証は、プログラムの形式モデルが形式仕様と一致するかどうかを確認することでソフトウェアの正確さを評価するアプローチです。 プログラムを抽象的かつ数学的に表現したものが形式モデルで、プログラムのプロパティ(つまり、プログラムの実行に関する論理的アサーション)を定義したものが形式仕様です。

プロパティは、数学用語で記述されるため、システムの形式(数学)モデルが仕様を満たしていることを、論理的な推論規則を使用して検証することができます。 したがって、形式検証ツールは、システムの正確さを「数学的に証明」できると言われています。

テストとは異なり、形式検証は、サンプルデータを使わずにスマートコントラクトが_どのような_実行においても、形式仕様を満たしていること(バグがないこと)を検証できます。 これにより、数十の単体テストの実行時間が短縮され、背後にある脆弱性をより効率的に発見できるようになります。 ただし、形式検証手法では、実装の難易度や有用性が多岐に渡ります。

[スマートコントラクトの形式検証の詳細](/developers/docs/smart-contracts/formal-verification)

## テストと監査およびバグ報奨金の比較 {#testing-vs-audits-bug-bounties}

上記のように、厳密なテストをしても、コントラクトにバグがないとは言い切れません。 形式検証によるアプローチは、正確性をより強力に保証できますが、現時点では使用が難しく、かなりのコストがかかります。

第三者によるコードレビューを受ければ、コントラクトの脆弱性を発見できる可能性が高くなります。 第三者にコントラクトを分析してもらうには、[スマートコントラクトの監査](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/)および[バグ報奨金](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)のいずれかの方法があります。

監査は、スマートコントラクトのセキュリティ上の欠陥や不健全な開発プラクティスを探し出す経験豊かな監査人が行います。 監査では、コードベース全体の手動レビューだけでなく、テストや形式検証も行われるのが一般的です。

一方で、バグ報奨金プログラムでは通常、スマートコントラクトの脆弱性を発見してデベロッパーへ公開する([ホワイトハットハッカー](https://en.wikipedia.org/wiki/White_hat_(computer_security))と呼ばれる)個人に対して、金銭的な報酬が支払われます。 バグ報奨金は、スマートコントラクトの不具合の発見を他の人に依頼するもので、監査に似ています。

主な違いとしては、バグ報奨金プログラムは、より広範なデベロッパーやハッカーコミュニティを対象としているため、ユニークなスキルや経験を持つ幅広いクラスの倫理的なハッカーや独立したセキュリティ専門家を引きつけることができます。 これは、限られた専門知識を持つチームに依存するスマートコントラクト監査では得られない利点と言えるでしょう。

## テストツールとライブラリ {#testing-tools-and-libraries}

### 単体テストツール {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Solidityで書かれたスマートコントラクトのコードカバレッジツール_

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _高度なスマートコントラクトの開発とテストのためのフレームワーク(ethers.jsベース)_

- **[Remixテスト](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Solidityスマートコントラクトのテストツール。 Remix IDEの「Solidity Unit Testing」プラグインで動作します。このプラグインは、コントラクトのテストケースの作成と実行に使用します。_

- **[OpenZeppelinテストヘルパー](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _イーサリアムスマートコントラクトのテストに使用できるアサーションライブラリ。 コントラクトが期待通りに動作していることを確認してください。_

- **[Brownieユニットテストフレームワーク](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _最小限のコードで小さなテストを作成可能。また、大規模なプロジェクトにも対応するスケーラビリティも持ち合わせており、機能豊富なテストフレームワークであるPytestを利用しています。_

- **[Foundryテスト](https://github.com/foundry-rs/foundry/tree/master/forge)** - _Foundry社は、シンプルな単体テスト、ガス最適化チェック、コントラクトファジングを実行でき、高速で柔軟なイーサリアムテストフレームワークであるForgeを提供しています。_

- **[Hardhatテスト](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _ethers.js、Mocha、Chaiをベースとしたスマートコントラクトテストにおけるフレームワーク_。

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _イーサリアム仮想マシン用のスマートコントラクトでPythonベースの開発およびテストのためのフレームワーク_。

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Pythonベースの単体テストとファジングのフレームワークで、強力なデバック機能とクロスチェーンテストをサポートしており、pytestおよびAnvilを生かした最高のユーザーエクスペリエンスとパフォーマンスを実現。_

### プロパティベースのテストツール {#property-based-testing-tools}

#### 静的解析ツール {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _PythonベースのSolidity静的解析フレームワークで、脆弱性の発見、コード理解の強化、スマートコントラクトのカスタム解析の記述で使用_。

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _スマートコントラクトのプログラミング言語であるSolidityのスタイルとセキュリティのベストプラクティスを適用するためのリンター_。

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Rustベースの静的解析ツールで、特にWeb3スマートコントラクトのセキュリティと開発のために設計されています。_

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Pythonベースの静的解析フレームワークで、脆弱性とコード品質の検出器、コードから有用な情報を抽出するプリンター、カスタムサブモジュールの作成をサポート。_

#### 動的解析ツール {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _プロパティベースのテストによりスマートコントラクトの脆弱性を検出する高速なコントラクトファザー_。

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _スマートコントラクトのコードのプロパティ違反を検出するのに便利な自動ファジングツール_。

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _EVMバイトコード解析のための動的シンボリック実行フレームワーク_。

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Taint解析、Concolic解析、制御フローチェックを用いてコントラクトの脆弱性を検出するEVMバイトコード評価ツール_。

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribbleは、仕様記述言語およびランタイム検証ツールでスマートコントラクトのプロパティにアノテーションを付けることができます。これにより、Diligence FuzzingやMythXなどのツールを使用してコントラクトを自動的にテストできます。_

## 関連チュートリアル {#related-tutorials}

- [さまざまな製品テストの概要と比較](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [スマートコントラクトのテストにEchidnaを使用する方法](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Manticoreを使用してスマートコントラクトのバグを見つける方法](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Slitherを使用してスマートコントラクトのバグを見つける方法](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Solidityコントラクトのテスト用モックの作成方法](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Foundryを使ったSolidityの単体テストの実行方法](https://www.rareskills.io/post/foundry-testing-solidity)

## 参考文献 {#further-reading}

- [イーサリアムスマートコントラクトのテストに関する詳細ガイド](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [イーサリアムスマートコントラクトのテスト方法](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [デベロッパー向けMolochDAOのユニットテストガイド](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [ロックスターのようにスマートコントラクトをテストする方法](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
