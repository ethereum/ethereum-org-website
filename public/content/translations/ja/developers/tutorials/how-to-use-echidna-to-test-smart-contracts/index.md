---
title: スマートコントラクトのテストにEchidnaを使用する方法
description: Echidnaを使用して、スマートコントラクトを自動でテストする方法
author: "Trailofbits"
lang: ja
tags:
  - "Solidity"
  - "スマートコントラクト"
  - "セキュリティ"
  - "テスト"
  - "ファジング"
skill: advanced
published: 2020-04-10
source: セキュアなコントラクトの構築
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## インストール {#installation}

Echidna は、Docker またはコンパイル済みのバイナリを使用してインストールします。

### Docker から Echidna をインストールする {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最後のコマンドは、現在のディレクトリにアクセスできる docker で eth-security-toolbox を実行します。 ホストからファイルを変更し、docker からファイル上のツールを実行できます。_

docker で、以下を実行します：

```bash
solc-select 0.5.11
cd /home/training
```

### バイナリの入手先 {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## プロパティベースのファジングとは {#introduction-to-property-based-fuzzing}

Echidna は、プロパティベースのファザーです。これについては、以前のブログ投稿（[1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)、[2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)、[3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)）を参照してください。

### ファジング {#fuzzing}

[ファジング ](https://wikipedia.org/wiki/Fuzzing)は、セキュリティコミュニティでよく知られているテクニックです。 ファジングでは、ある程度ランダムな入力を生成してプログラムのバグを発見します。 通常のソフトウェアを対象とするファザー（[AFL](http://lcamtuf.coredump.cx/afl/)や[LibFuzzer](https://llvm.org/docs/LibFuzzer.html)など）は、効率的にバグを特定できるツールであると評価されています。

入力をまったくランダムに生成するだけでなく、適切な入力を生成するための多くのテクニックや戦略を活用できます：

- 各実行から取得したフィードバックに基づき、入力を生成する。 例えば、新しく生成された入力値が新しいパスの発見を導いている場合、それに近い新しい入力値を生成することは理にかなっています。
- 構造上の制約を考慮した入力を生成する。 例えば、入力にチェックサム付のヘッダーが含まれている場合、ファザーにチェックサムを検証する入力を生成させることも有益です。
- 既知の入力に基づいて新たな入力を生成する。大規模な有効な入力のデータセットにアクセスできる場合、まったくランダムに生成するのではなく、それらに基づいて新たな入力を生成することができます。 この場合、参照するデータを*シード*と呼びます。

### プロパティベースのファジング {#property-based-fuzzing}

Echidna は、プロパティに基づくファジングを実行するファザーであり、[QuickCheck](https://wikipedia.org/wiki/QuickCheck)の影響を強く受けたプログラムです。 クラッシュを監視する従来のファザーとは異なり、Echidna では、ユーザー定義の不変条件を壊そうとします。

スマートコントラクトにおける不変条件とは、コントラクトにおいて不適切または無効な状態が発生しうる Solidity の関数を意味します。具体的には、以下が挙げられます：

- 不適切なアクセス制御：攻撃者がコントラクトの所有者になる場合。
- 不適切な状態マシン：コントラクトの一次停止中に、トークンを送信できる。
- 不適切な計算: ユーザーは残高をアンダーフローし無制限に無料トークンを取得できる。

### Echidna を使って、プロパティをテストする {#testing-a-property-with-echidna}

それでは、Echidna を使ってスマートコントラクトをテストする方法を見てみましょう。 対象は、[ `token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)のスマートコントラクトです。

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

このトークンは、以下のプロパティを持つと想定します：

- ユーザーは、最大 1000 トークンを所持できる
- このトークン（ERC-20 トークンではない）は、送信不可である

### プロパティを記述する {#write-a-property}

Echidna のプロパティは、Solidity の関数です。 プロパティは、以下の条件を満たす必要があります：

- 引数を持たない
- 実行に成功した場合、 `true` を返す
- `echidna`で始まる名前を持つ

Echidna は、以下を実行します：

- このプロパティをテストするためのランダムなトランザクションを自動で生成する。
- プロパティが `false`またはエラーを返すすべてのトランザクションを報告する。
- プロパティの呼び出しに伴う副作用を無視する（つまり、プロパティが状態変数を変更した場合、テスト後にこの変更を破棄する）

以下のプロパティは、呼び出し元のユーザーが所持するトークンが 1000 以下であることを確認します。

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

継承を使って、コントラクトとプロパティを分離します。

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)は、プロパティを実装し、このトークンを継承します。

### コントラクトを開始する {#initiate-a-contract}

Echidna では、引数なしの[コンストラクタ](/developers/docs/smart-contracts/anatomy/#constructor-functions)が必要です。 コントラクトにおいて特定の初期化が必要な場合、コンストラクタ上で実行する必要があります。

Echidna には、いくつかの特定のアドレスが含まれます：

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`：コンストラクタを呼び出すアドレスです。
- `0x10000`、`0x20000`、`0x00a329C0648769a73afAC7F9381e08fb43DBEA70`：他の関数をランダムに呼び出すアドレスです。

このチュートリアルでは特定の初期化を実行する必要がないため、コンストラクタは空になります。

### Echidna を実行する {#run-echidna}

以下のコードで、Echidna を起動します：

```bash
$ echidna-test contract.sol
```

contract.sol に複数のコントラクトが含まれる場合、実行したいコントラクトを指定できます：

```bash
$ echidna-test contract.sol --contract MyContract
```

### プロパティテストのまとめ {#summary-testing-a-property}

以下は、このチュートリアルにおける Echidna の実行をまとめたものです。

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
$ echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna は、 `backdoor`が呼び出された場合、このプロパティが侵害されることを確認しました。

## ファジング中に呼び出す関数を絞り込む {#filtering-functions-to-call-during-a-fuzzing-campaign}

ファジングの対象となる関数を絞り込む方法を見ていきましょう。 以下のスマートコントラクトを対象とします：

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
    require(state2);
    require(x == 42);
    state3 = true;
  }

 function i() public {
    require(state3);
    state4 = true;
  }

  function reset1() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function reset2() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

この簡単な例は、状態変数を変更する特定のトランザクションのシーケンスを Echidna に見つけさせるものです。 これは、ファザーにとって容易ではありません（[Manticore](https://github.com/trailofbits/manticore)のようなシンボリック実行ツールを使用することをお勧めします）。 Echidna で、以下のように検証を実行します：

```bash
$ echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### 対象の関数を絞り込む {#filtering-functions}

2 つのリセット関数（`reset1`と`reset2`）がすべての状態変数を`false`に設定するため、Echidna はこのコントラクトをテストするための正しいシーケンスを見つけられません。 しかし Echidna では、リセット関数をブラックリストに含めるか、 `f`、`g`、 `h`、および `i`の関数のみをホワイトリストに含める特別の機能が利用できます。

関数をブラックリストに登録するには、設定ファイルを以下のように指定します：

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

関数を絞り込むもう一つの方法は、ホワイトリストに含まれる関数を列挙することです。 これには、設定ファイルを以下のように指定します：

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist`の初期値は`true`です。
- 絞り込みは、名前のみ（パラメータなし）で実行されます。 `f()`と`f(uint256)`の両方が含まれる場合、`"f"`で絞り込むと両方の関数がヒットします。

### Echidna を実行する {#run-echidna-1}

設定ファイル `blacklist.yaml` に従って Echidna を実行するには、以下のようにします：

```bash
$ echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna は、プロパティを false にするトランザクションのシーケンスを瞬時に特定します。

### 対象の関数を絞り込む作業のまとめ {#summary-filtering-functions}

Echidna では、ファジングで呼び出す機能を絞り込むために、ブラックリストあるいはホワイトリストの関数を使用します：

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
$ echidna-test contract.sol --config config.yaml
...
```

Echidna は、`filterBlacklist`のブール値に基づき、`f1`、`f2`、および `f3`の関数をブラックリストに含めるか、これらの関数のみを呼び出してファジングを実行します。

## Echidna で Solidity のアサーションをテストする方法 {#how-to-test-soliditys-assert-with-echidna}

次の短いチュートリアルでは、Echidna を使って、コントラクトに含まれるアサーションをテストします。 以下のようなコントラクトを想定します：

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### アサーションを記述する {#write-an-assertion}

引き算を実行した後に、`tmp`の値が`counter`の値以下であることを確認したいとします。 Echidna のプロパティで記述することもできますが、`tmp`値をどこかに格納する必要があります。 これには、以下のようなアサーションを用いることができます：

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Echidna を実行する {#run-echidna-2}

アサーションの失敗をテストできるようにするには、[Echidna の設定ファイル](https://github.com/crytic/echidna/wiki/Config)として `config.yaml` を作成します：

```yaml
checkAsserts: true
```

このコントラクトを Echidna で実行すると、次のような期待通りの結果が得られます：

```bash
$ echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

このように、Echidna では、アサーション違反の一部を`inc`関数で報告します。 1 つの関数に対し複数のアサーションを含めることは可能ですが、どのアサーションが失敗したのか区別できなくなります。

### アサーションをいつ、どのように使用すべきか {#when-and-how-use-assertions}

アサーションは、特にチェックしたい条件が`f`という特定の操作を適切に用いることと直接関係する場合に、プロパティを明示しない代替手段として用いることができます。 コードにアサーションを追加することで、このコードを実行した直後に強制的にチェックが実行されます。

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

反対に、Echidna のプロパティを明示的に使用する場合、トランザクションがランダムに実行されるため、チェックをどの時点で強制的に実行させるかを決定しにくくなります。 この場合、以下のような回避策を用いることもできます：

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

しかし、以下の問題点が残ります：

- `f`が`internal`あるいは`external`と宣言されている場合、違反になる。
- どの引数を使って`f`を呼び出すべきかが不明確である。
- `f`が元に戻された場合、このプロパティは違反になる。

全般的なアサーションの使用については、この[John Regehr の提案](https://blog.regehr.org/archives/1091)に従うことを推奨します：

- アサーションチェック中には、副作用を強制しない。 例：`assert(ChangeStateAndReturn() == 1)`
- 明らかなステートメントは、アサートしない。 例：`var`を`uint`と宣言している場合、`assert(var >= 0)`は必要ない。

最後に、`assert`の代わりに`require`を用いるのは**避けてください**。Echidna では require を検出できません。（ただしこの場合でも、コントラクトは元に戻されます）。

### アサーションチェックのまとめ {#summary-assertion-checking}

以下は、この例における Echidna の実行をまとめたものです：

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
$ echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna は、`inc`のアサーションにつき、この関数が大きな引数で複数回呼び出された場合に違反となりうることを発見しました。

## Echidna コーパスを収集、修正する {#collecting-and-modifying-an-echidna-corpus}

次に、Echidna を使ってトランザクションのコーパスを収集し、これを利用する方法について見ていきましょう。 対象は、[`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)のスマートコントラクトです。

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

以下の短いコードは、状態変数を変更する特定の値を Echidna に発見させます。 これは、ファザーにとって容易ではありません（[Manticore](https://github.com/trailofbits/manticore)のようなシンボリック実行ツールを使用することをお勧めします）。 Echidna で、以下のように検証を実行します：

```bash
$ echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

ただし Echidna では、ファジングの実行中もコーパスを収集することができます。

### コーパスを収集する {#collecting-a-corpus}

コーパスを収集するには、まずコーパスのディレクトリを作成します：

```bash
$ mkdir corpus-magic
```

さらに、[Echidna の設定ファイル](https://github.com/crytic/echidna/wiki/Config)である `config.yaml` を作成します：

```yaml
coverage: true
corpusDir: "corpus-magic"
```

これで、ツールを実行しながら収集したコーパスをチェックできるようになりました：

```bash
$ echidna-test magic.sol --config config.yaml
```

この段階では Echidna はまだ適切な magic 値を特定できませんが、収集したコーパスを確認することはできます。 例えば、以下のようなファイルが収集されました：

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

言うまでもなく、この入力はプロパティ違反をトリガーしません。 しかし、次のステップでこれを修正することができます。

### コーパスをシードする {#seeding-a-corpus}

Echidna を`magic`関数に対応するように設定する必要があります。 この入力が適切なパラメータを使用できるように、コピーし、変更します。

```bash
$ cp corpus/2712688662897926208.txt corpus/new.txt
```

`magic(42,129,333,0)`を呼び出せるように`new.txt`を変更します。 その上で、Echidna を再実行します：

```bash
$ echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

今回は、プロパティ違反がただちに検出されました。

## ガス消費量が多いトンラザクションを見つける {#finding-transactions-with-high-gas-consumption}

ガス消費量が多いトランザクションを特定するために、Echidna を使用する方法について見ていきましょう。 対象は、次のスマートコントラクトです：

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

ここでは、`expensive`でガス消費量が高くなる可能性があります。

この時点では、Echidna 上で常にテストすべきプロパティを設定する必要があり、`echidna_test`は常に`true`を返します。 Echidna を実行して、これを確認します：

```
$ echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### ガス消費量を測定する {#measuring-gas-consumption}

Ethidna でガスの消費量を確認できるようにするには、 `config.yaml`を以下のように設定します：

```yaml
estimateGas: true
```

この例では、結果を分かりやすくするために、次のようにトランザクションシーケンスのサイズを減らしています。

```yaml
seqLen: 2
estimateGas: true
```

### Echidna を実行する {#run-echidna-3}

設定が完了したら、次のように Echidna を実行します：

```bash
$ echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- 表示されたガス量は、[HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-)による見積もりです。

### ガス量を削減する呼び出しを対象外にする {#filtering-out-gas-reducing-calls}

**ファジング実行時に呼び出す関数を絞り込む方法**のチュートリアルでは、特定の関数をテストの対象外にする方法を示しました。  
この作業は、ガス量を正確に見積もる上で非常に重要です。 以下の例を検討してみましょう：

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Echidna がすべての関数を呼び出せる場合、ガス代が高いトランザクションを見つけることは困難になるでしょう。

```
$ echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

なぜかと言えば、ガス代は`addrs`のサイズに依存しており、ランダムに呼び出した場合は配列がほぼ空になるためです。 このような場合、 `pop`と`clear`をブラックリストに追加することで、より正確な結果を得ることができます。

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
$ echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### ガス消費量が高いトランザクションを見つける作業のまとめ {#summary-finding-transactions-with-high-gas-consumption}

Echidna では、`estimateGas`の設定オプションを使用してガス消費量の多いトランザクションを特定することができます：

```yaml
estimateGas: true
```

```bash
$ echidna-test contract.sol --config config.yaml
...
```

Echidna は、ファジングを実行した後、各関数ごとにガス消費量が最大となるシーケンスを報告します。
