---
title: Echidnaを使用してスマートコントラクトをテストする方法
description: Echidnaを使用してスマートコントラクトを自動テストする方法
author: "Trailofbits"
lang: ja
tags: [ "Solidity", "スマート契約", "セキュリティ", "テスト", "ファジング" ]
skill: advanced
published: 2020-04-10
source: セキュアなコントラクトの開発
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## インストール {#installation}

Echidnaは、Dockerまたはコンパイル済みのバイナリを使用してインストールします。

### DockerによるEchidna {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最後のコマンドは、現在のディレクトリにアクセスできるDockerでeth-security-toolboxを実行します。 ホストからファイルを変更し、Dockerからファイル上のツールを実行できます。_

Docker内で次を実行します：

```bash
solc-select 0.5.11
cd /home/training
```

### バイナリ {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## プロパティベースファジング入門 {#introduction-to-property-based-fuzzing}

Echidnaはプロパティベースのファザーであり、以前のブログ投稿([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)、[2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)、[3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/))で説明しています。

### ファジング {#fuzzing}

[ファジング](https://wikipedia.org/wiki/Fuzzing)は、セキュリティコミュニティでよく知られているテクニックです。 プログラム内のバグを見つけるために、ある程度ランダムな入力を生成するものです。 従来のソフトウェア用のファザー（[AFL](http://lcamtuf.coredump.cx/afl/)や[LibFuzzer](https://llvm.org/docs/LibFuzzer.html)など）は、バグを見つけるための効率的なツールとして知られています。

純粋にランダムな入力生成以外に、適切な入力を生成するための多くのテクニックや戦略があります。以下に例を挙げます。

- 各実行からフィードバックを取得し、それを使用して生成をガイドします。 例えば、新しく生成された入力が新しいパスの発見につながる場合、それに近い新しい入力を生成することは理にかなっています。
- 構造的制約を尊重して入力を生成する。 例えば、入力にチェックサム付きのヘッダーが含まれている場合、ファザーにチェックサムを検証する入力を生成させるのは理にかなっています。
- 既知の入力を使用して新しい入力を生成する：有効な入力の大規模なデータセットにアクセスできる場合、ファザーはゼロから生成を開始するのではなく、それらから新しい入力を生成できます。 これらは通常、_シード_と呼ばれます。

### プロパティベースファジング {#property-based-fuzzing}

Echidnaは、[QuickCheck](https://wikipedia.org/wiki/QuickCheck)に強くインスパイアされたプロパティベースファジングという、ファザーの特定の種類に属します。 クラッシュを見つけようとする従来のファザーとは対照的に、Echidnaはユーザー定義の不変条件を破ろうとします。

スマートコントラクトにおける不変条件とは、コントラクトが到達しうる不正または無効な状態を表すSolidity関数であり、次のようなものが含まれます。

- 不正なアクセス制御：攻撃者がコントラクトの所有者になる。
- 不正な状態マシン：コントラクトが一時停止している間にトークンを転送できる。
- 不正な算術演算：ユーザーが残高をアンダーフローさせ、無制限の無料トークンを取得できる。

### Echidnaでプロパティをテストする {#testing-a-property-with-echidna}

Echidnaを使ってスマートコントラクトをテストする方法を見ていきましょう。 対象は、次のスマートコントラクト[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)です。

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

このトークンは、以下のプロパティを持つと想定します。

- 誰でも最大1000トークンを保有できます
- このトークンは転送できません（ERC20トークンではありません）

### プロパティを記述する {#write-a-property}

Echidnaのプロパティは、Solidityの関数です。 プロパティは、以下の条件を満たす必要があります。

- 引数を持たない
- 成功した場合に`true`を返す
- 名前が`echidna`で始まる

Echidnaは、以下を実行します。

- プロパティをテストするために、任意のトランザクションを自動的に生成します。
- プロパティが`false`を返すか、エラーをスローするトランザクションを報告します。
- プロパティ呼び出し時の副作用を破棄する（つまり、プロパティが状態変数を変更した場合、テスト後にその変更は破棄されます）

以下のプロパティは、呼び出し元が1000トークンを超えて保有していないことをチェックします。

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

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)はプロパティを実装し、トークンを継承します。

### コントラクトの初期化 {#initiate-a-contract}

Echidnaには、引数のない[コンストラクタ](/developers/docs/smart-contracts/anatomy/#constructor-functions)が必要です。 コントラクトに特定の初期化が必要な場合、コンストラクタで行う必要があります。

Echidnaには、いくつかの特定のアドレスが含まれます。

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`はコンストラクタを呼び出します。
- `0x10000`、`0x20000`、および`0x00a329C0648769a73afAC7F9381e08fb43DBEA70`は、他の関数をランダムに呼び出します。

この例では特定の初期化は必要ないため、コンストラクタは空になります。

### Echidnaの実行 {#run-echidna}

Echidnaは次のように起動します。

```bash
echidna-test contract.sol
```

contract.solに複数のコントラクトが含まれる場合、対象を指定できます。

```bash
echidna-test contract.sol --contract MyContract
```

### まとめ：プロパティのテスト {#summary-testing-a-property}

以下は、この例におけるEchidnaの実行をまとめたものです。

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidnaは、`backdoor`が呼び出された場合にプロパティが違反することを発見しました。

## ファジングキャンペーン中に呼び出す関数をフィルタリングする {#filtering-functions-to-call-during-a-fuzzing-campaign}

ファジング対象となる関数をフィルタリングする方法を見ていきましょう。
対象は、次のスマートコントラクトです。

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

この簡単な例は、状態変数を変更する特定のトランザクションのシーケンスをEchidnaに見つけさせるものです。
これはファザーにとって困難です（[Manticore](https://github.com/trailofbits/manticore)のようなシンボリック実行ツールの使用が推奨されます）。
Echidnaを実行して、これを確認できます。

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### 関数のフィルタリング {#filtering-functions}

2つのリセット関数（`reset1`と`reset2`）がすべての状態変数を`false`に設定するため、Echidnaがこのコントラクトをテストするための正しいシーケンスを見つけるのは困難です。
しかし、Echidnaの特別な機能を使用して、リセット関数をブラックリストに登録するか、`f`、`g`、
`h`、`i`関数のみをホワイトリストに登録することができます。

関数をブラックリストに登録するには、この設定ファイルを使用します。

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

関数をフィルタリングするもう1つのアプローチは、ホワイトリストに登録された関数をリストアップすることです。 そのためには、この設定ファイルを使用します。

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist`のデフォルト値は`true`です。
- フィルタリングは、名前のみ（パラメータなし）で実行されます。 `f()`と`f(uint256)`の両方がある場合、フィルタ`"f"`は両方の関数にマッチします。

### Echidnaの実行 {#run-echidna-1}

Echidnaを構成ファイル`blacklist.yaml`で実行するには、次のようにします。

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidnaは、プロパティを偽にするトランザクションのシーケンスをほぼ瞬時に見つけます。

### まとめ：関数のフィルタリング {#summary-filtering-functions}

Echidnaは、ファジングキャンペーン中に呼び出す関数を、以下を使用してブラックリストまたはホワイトリストに登録できます。

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidnaは、`filterBlacklist`ブール値の値に応じて、`f1`、`f2`、`f3`をブラックリストに登録するか、これらのみを呼び出すファジングキャンペーンを開始します。

## EchidnaでSolidityのアサーションをテストする方法 {#how-to-test-soliditys-assert-with-echidna}

この短いチュートリアルでは、Echidnaを使用してコントラクトのアサーションチェックをテストする方法を説明します。 以下のようなコントラクトを想定します。

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

その差を返した後に、`tmp`が`counter`以下であることを確認したいと思います。 Echidnaのプロパティを記述することもできますが、`tmp`の値をどこかに保存する必要があります。 代わりに、このようなアサーションを使用できます。

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

### Echidnaの実行 {#run-echidna-2}

アサーション失敗テストを有効にするには、[Echidna設定ファイル](https://github.com/crytic/echidna/wiki/Config) `config.yaml`を作成します。

```yaml
checkAsserts: true
```

このコントラクトをEchidnaで実行すると、期待通りの結果が得られます。

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

ご覧のとおり、Echidnaは`inc`関数でのアサーションの失敗を報告します。 1つの関数に複数のアサーションを追加することは可能ですが、Echidnaはどのアサーションが失敗したかを特定できません。

### アサーションを使用する状況とその方法 {#when-and-how-use-assertions}

アサーションは、特にチェック対象の条件が何らかの操作`f`の正しい使用に直接関連する場合、明示的なプロパティの代替として使用できます。 コードの後にアサーションを追加すると、そのコードが実行された直後にチェックが強制的に行われます。

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

対照的に、明示的なEchidnaプロパティを使用すると、トランザクションがランダムに実行され、いつチェックされるかを正確に強制する簡単な方法はありません。 この回避策を行うことは依然として可能です。

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

しかし、いくつかの問題があります。

- `f`が`internal`または`external`として宣言されている場合は失敗します。
- `f`を呼び出すのにどの引数を使用すべきかが不明確です。
- `f`がリバートされると、プロパティは失敗します。

一般に、アサーションの使用方法については、[John Regehr氏の推奨事項](https://blog.regehr.org/archives/1091)に従うことをお勧めします。

- アサーションチェック中に副作用を強制しないでください。 例：`assert(ChangeStateAndReturn() == 1)`
- 明らかなステートメントをアサートしないでください。 例えば、`var`が`uint`として宣言されている場合の`assert(var >= 0)`などです。

最後に、`assert`の代わりに`require`を**使用しないでください**。Echidnaはそれを検出できません（ただし、コントラクトはいずれにしてもリバートします）。

### まとめ：アサーションチェック {#summary-assertion-checking}

以下は、この例におけるEchidnaの実行をまとめたものです。

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
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidnaは、`inc`のアサーションが、この関数が大きな引数で複数回呼び出された場合に失敗する可能性があることを見つけました。

## Echidnaコーパスの収集と変更 {#collecting-and-modifying-an-echidna-corpus}

Echidnaを使ってトランザクションのコーパスを収集し、利用する方法について見ていきましょう。 対象は、次のスマートコントラクト[`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)です。

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

この簡単な例では、状態変数を変更するために、Echidnaに特定の値を探索させます。 これはファザーにとって困難です
（[Manticore](https://github.com/trailofbits/manticore)のようなシンボリック実行ツールの使用が推奨されます）。
Echidnaを実行して、これを確認できます。

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

しかし、このファジングキャンペーンの実行中にEchidnaを使用してコーパスを収集することは依然として可能です。

### コーパスの収集 {#collecting-a-corpus}

コーパス収集を有効にするには、コーパスディレクトリを作成します。

```bash
mkdir corpus-magic
```

そして、[Echidna設定ファイル](https://github.com/crytic/echidna/wiki/Config)である`config.yaml`を作成します。

```yaml
coverage: true
corpusDir: "corpus-magic"
```

これでツールを実行し、収集したコーパスを確認できます。

```bash
echidna-test magic.sol --config config.yaml
```

Echidnaはまだ正しいマジック値を見つけることができませんが、収集したコーパスを見ることができます。
例えば、これらのファイルの1つは次のとおりでした。

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

明らかに、この入力はプロパティの失敗をトリガーしません。 しかし、次のステップでは、そのためにこれを変更する方法を見ていきます。

### コーパスのシーディング {#seeding-a-corpus}

`magic`関数を扱うために、Echidnaには少し助けが必要です。 入力をコピーして変更し、適切な
パラメータを使用するようにします。

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

`new.txt`を`magic(42,129,333,0)`を呼び出すように変更します。 これでEchidnaを再実行できます。

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

今回は、プロパティが即座に違反していることがわかりました。

## ガス消費量の多いトランザクションの発見 {#finding-transactions-with-high-gas-consumption}

Echidnaを使用してガス消費量が多いトランザクションを見つける方法を見ていきましょう。 対象は、次のスマートコントラクトです。

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

ここで`expensive`は大きなガス消費量を持つ可能性があります。

現在、Echidnaは常にテスト対象のプロパティを必要とします。ここでは`echidna_test`が常に`true`を返します。
Echidnaを実行して、これを確認できます。

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### ガス消費量の測定 {#measuring-gas-consumption}

Echidnaでガス消費を有効にするには、設定ファイル`config.yaml`を作成します。

```yaml
estimateGas: true
```

この例では、結果を理解しやすくするために、トランザクションシーケンスのサイズも小さくします。

```yaml
seqLen: 2
estimateGas: true
```

### Echidnaの実行 {#run-echidna-3}

設定ファイルが作成されたら、次のようにEchidnaを実行できます。

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- 表示されるガスは、[HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-)によって提供される推定値です。

### ガスを削減する呼び出しの除外 {#filtering-out-gas-reducing-calls}

上記の「**ファジングキャンペーン中に呼び出す関数のフィルタリング**」のチュートリアルでは、テストからいくつかの関数を削除する方法を示しています。  
これは、正確なガス見積もりを得るために重要となる場合があります。
次の例を考えてみましょう。

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

Echidnaがすべての関数を呼び出せる場合、ガス代が高いトランザクションを簡単に見つけることはできません。

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

これは、コストが`addrs`のサイズに依存し、ランダムな呼び出しでは配列がほとんど空のままになる傾向があるためです。
しかし、`pop`と`clear`をブラックリストに登録すると、はるかに良い結果が得られます。

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### まとめ：ガス消費量の多いトランザクションの発見 {#summary-finding-transactions-with-high-gas-consumption}

Echidnaは、`estimateGas`設定オプションを使用して、ガス消費量の多いトランザクションを見つけることができます。

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

ファジングキャンペーンが終了すると、Echidnaは各関数の最大ガス消費量を持つシーケンスを報告します。
