---
title: "エキドナを使用してスマート・コントラクトをテストする方法"
description: "エキドナを使用してスマート・コントラクトを自動的にテストする方法"
author: "Trailofbits"
lang: ja
tags: ["Solidity", "スマート・コントラクト", "セキュリティ", "テスト", "ファジング"]
skill: advanced
breadcrumb: "エキドナ"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## インストール {#installation}

エキドナはDocker経由、またはコンパイル済みのバイナリを使用してインストールできます。

### Docker経由でのエキドナ {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最後のコマンドは、現在のディレクトリにアクセスできるDocker内でeth-security-toolboxを実行します。ホストからファイルを変更し、Dockerからそのファイルに対してツールを実行できます。_

Docker内で以下を実行します:

```bash
solc-select 0.5.11
cd /home/training
```

### バイナリ {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## プロパティベースのファジングの概要 {#introduction-to-property-based-fuzzing}

エキドナはプロパティベースのファザーであり、以前のブログ記事（[1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)、[2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)、[3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)）で説明しています。

### ファジング {#fuzzing}

[ファジング](https://wikipedia.org/wiki/Fuzzing)は、セキュリティコミュニティでよく知られている手法です。プログラム内のバグを見つけるために、多かれ少なかれランダムな入力を生成することで構成されます。従来のソフトウェア向けのファザー（[AFL](http://lcamtuf.coredump.cx/afl/)や[LibFuzzer](https://llvm.org/docs/LibFuzzer.html)など）は、バグを見つけるための効率的なツールとして知られています。

純粋にランダムな入力の生成を超えて、優れた入力を生成するための多くの手法や戦略があります。これには以下が含まれます:

- 各実行からフィードバックを取得し、それを使用して生成をガイドする。たとえば、新しく生成された入力が新しいパスのディスカバリーにつながる場合、それに近い新しい入力を生成することは理にかなっています。
- 構造的な制約を尊重して入力を生成する。たとえば、入力にチェックサム付きのヘッダーが含まれている場合、ファザーにチェックサムを検証する入力を生成させることは理にかなっています。
- 既知の入力を使用して新しい入力を生成する: 有効な入力の大規模なデータセットにアクセスできる場合、ファザーはゼロから生成を開始するのではなく、それらから新しい入力を生成できます。これらは通常、_シード_と呼ばれます。

### プロパティベースのファジング {#property-based-fuzzing}

エキドナは、[QuickCheck](https://wikipedia.org/wiki/QuickCheck)に強く影響を受けたプロパティベースのファジングという特定のファザーのファミリーに属しています。クラッシュを見つけようとする従来のファザーとは対照的に、エキドナはユーザー定義の不変条件を破ろうとします。

スマート・コントラクトにおいて、不変条件はSolidityの関数であり、コントラクトが到達する可能性のある不正確または無効な状態を表すことができます。これには以下が含まれます:

- 不正なアクセス制御: 攻撃者がコントラクトの所有者になった。
- 不正な状態マシン: コントラクトが一時停止されている間にトークンを転送できる。
- 不正な算術演算: ユーザーが残高をアンダーフローさせ、無制限に無料のトークンを取得できる。

### エキドナを使用したプロパティのテスト {#testing-a-property-with-echidna}

エキドナを使用してスマート・コントラクトをテストする方法を見ていきます。ターゲットは以下のスマート・コントラクト[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)です:

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

このトークンには以下のプロパティが必要であると仮定します:

- 誰でも最大1000トークンを持つことができる
- トークンは転送できない（ERC-20トークンではない）

### プロパティの記述 {#write-a-property}

エキドナのプロパティはSolidityの関数です。プロパティは以下の条件を満たす必要があります:

- 引数を持たない
- 成功した場合は`true`を返す
- 名前が`echidna`で始まる

エキドナは以下を行います:

- プロパティをテストするために任意のトランザクションを自動的に生成する。
- プロパティが`false`を返すか、エラーをスローする原因となるトランザクションを報告する。
- プロパティを呼び出す際の副作用を破棄する（つまり、プロパティが状態変数を変更した場合、テスト後に破棄されます）。

以下のプロパティは、呼び出し元が1000トークンを超えて持っていないことを確認します:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

継承を使用して、コントラクトをプロパティから分離します:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol)はプロパティを実装し、トークンを継承します。

### コントラクトの初期化 {#initiate-a-contract}

エキドナには引数のない[コンストラクタ](/developers/docs/smart-contracts/anatomy/#constructor-functions)が必要です。コントラクトに特定の初期化が必要な場合は、コンストラクタで実行する必要があります。

エキドナにはいくつかのアドレスが指定されています:

- コンストラクタを呼び出す`0x00a329c0648769A73afAc7F9381E08FB43dBEA72`。
- 他の関数をランダムに呼び出す`0x10000`、`0x20000`、および`0x00a329C0648769a73afAC7F9381e08fb43DBEA70`。

現在の例では特定の初期化は必要ないため、コンストラクタは空です。

### エキドナの実行 {#run-echidna}

エキドナは以下で起動します:

```bash
echidna-test contract.sol
```

contract.solに複数のコントラクトが含まれている場合は、ターゲットを指定できます:

```bash
echidna-test contract.sol --contract MyContract
```

### まとめ: プロパティのテスト {#summary-testing-a-property}

以下は、この例でのエキドナの実行のまとめです:

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

エキドナは、`backdoor`が呼び出されるとプロパティが違反されることを発見しました。

## ファジングキャンペーン中に呼び出す関数のフィルタリング {#filtering-functions-to-call-during-a-fuzzing-campaign}

ファジング対象の関数をフィルタリングする方法を見ていきます。
ターゲットは以下のスマート・コントラクトです:

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

この小さな例では、状態変数を変更するために特定のトランザクションのシーケンスを見つけることをエキドナに強制します。
これはファザーにとっては困難です（[マンティコア](https://github.com/trailofbits/manticore)のようなシンボリック実行ツールの使用が推奨されます）。
エキドナを実行してこれを確認できます:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### 関数のフィルタリング {#filtering-functions}

2つのリセット関数（`reset1`と`reset2`）がすべての状態変数を`false`に設定するため、エキドナはこのコントラクトをテストするための正しいシーケンスを見つけるのに苦労します。
しかし、エキドナの特別な機能を使用して、リセット関数をブラックリストに登録するか、`f`、`g`、
`h`、および`i`関数のみをホワイトリストに登録することができます。

関数をブラックリストに登録するには、この設定ファイルを使用できます:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

関数をフィルタリングする別のアプローチは、ホワイトリストに登録された関数をリストすることです。これを行うには、この設定ファイルを使用できます:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist`はデフォルトで`true`です。
- フィルタリングは名前のみ（パラメータなし）で実行されます。`f()`と`f(uint256)`がある場合、フィルター`"f"`は両方の関数に一致します。

### エキドナの実行 {#run-echidna-1}

設定ファイル`blacklist.yaml`を使用してエキドナを実行するには:

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

エキドナは、プロパティを反証するトランザクションのシーケンスをほぼ即座に見つけます。

### まとめ: 関数のフィルタリング {#summary-filtering-functions}

エキドナは、以下を使用してファジングキャンペーン中に呼び出す関数をブラックリストまたはホワイトリストに登録できます:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

エキドナは、`filterBlacklist`のブール値に応じて、`f1`、`f2`、および`f3`をブラックリストに登録するか、これらのみを呼び出してファジングキャンペーンを開始します。

## エキドナでSolidityのアサートをテストする方法 {#how-to-test-soliditys-assert-with-echidna}

この短いチュートリアルでは、エキドナを使用してコントラクト内のアサーションチェックをテストする方法を示します。次のようなコントラクトがあると仮定しましょう:

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

### アサーションの記述 {#write-an-assertion}

差分を返した後、`tmp`が`counter`以下であることを確認したいとします。エキドナのプロパティを記述することもできますが、`tmp`の値をどこかに保存する必要があります。代わりに、次のようなアサーションを使用できます:

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

### エキドナの実行 {#run-echidna-2}

アサーション失敗のテストを有効にするには、[エキドナの設定ファイル](https://github.com/crytic/echidna/wiki/Config) `config.yaml`を作成します:

```yaml
checkAsserts: true
```

このコントラクトをエキドナで実行すると、期待される結果が得られます:

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

ご覧のとおり、エキドナは`inc`関数でいくつかのアサーションの失敗を報告します。関数ごとに複数のアサーションを追加することは可能ですが、エキドナはどのアサーションが失敗したかを判別できません。

### アサーションを使用するタイミングと方法 {#when-and-how-use-assertions}

アサーションは、特にチェックする条件が特定の操作`f`の正しい使用に直接関連している場合、明示的なプロパティの代替として使用できます。コードの後にアサーションを追加すると、実行直後にチェックが行われることが強制されます:

```solidity
function f(..) public {
    // 複雑なコード
    ...
    assert (condition);
    ...
}

```

逆に、明示的なエキドナのプロパティを使用すると、トランザクションがランダムに実行され、いつチェックされるかを正確に強制する簡単な方法はありません。この回避策を実行することは依然として可能です:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

ただし、いくつかの問題があります:

- `f`が`internal`または`external`として宣言されていると失敗します。
- `f`を呼び出すためにどの引数を使用すべきかが不明確です。
- `f`がリバートすると、プロパティは失敗します。

一般的に、アサーションの使用方法については[John Regehrの推奨事項](https://blog.regehr.org/archives/1091)に従うことをお勧めします:

- アサーションのチェック中に副作用を強制しないでください。例: `assert(ChangeStateAndReturn() == 1)`
- 明らかなステートメントをアサートしないでください。たとえば、`var`が`uint`として宣言されている場合の`assert(var >= 0)`などです。

最後に、`assert`の代わりに`require`を**使用しないでください**。エキドナはそれを検出できません（ただし、コントラクトはいずれにせよリバートします）。

### まとめ: アサーションチェック {#summary-assertion-checking}

以下は、この例でのエキドナの実行のまとめです:

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

エキドナは、この関数が大きな引数で複数回呼び出された場合、`inc`のアサーションが失敗する可能性があることを発見しました。

## エキドナのコーパスの収集と変更 {#collecting-and-modifying-an-echidna-corpus}

エキドナを使用してトランザクションのコーパスを収集し、使用する方法を見ていきます。ターゲットは以下のスマート・コントラクト[`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol)です:

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

この小さな例では、状態変数を変更するために特定の値を見つけることをエキドナに強制します。これはファザーにとっては困難です
（[マンティコア](https://github.com/trailofbits/manticore)のようなシンボリック実行ツールの使用が推奨されます）。
エキドナを実行してこれを確認できます:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

ただし、このファジングキャンペーンを実行する際に、エキドナを使用してコーパスを収集することは依然として可能です。

### コーパスの収集 {#collecting-a-corpus}

コーパスの収集を有効にするには、コーパスディレクトリを作成します:

```bash
mkdir corpus-magic
```

そして、[エキドナの設定ファイル](https://github.com/crytic/echidna/wiki/Config) `config.yaml`を作成します:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

これでツールを実行し、収集されたコーパスを確認できます:

```bash
echidna-test magic.sol --config config.yaml
```

エキドナは依然として正しいマジックバリューを見つけることができませんが、収集されたコーパスを確認することはできます。
たとえば、これらのファイルの1つは次のとおりでした:

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

明らかに、この入力はプロパティの失敗を引き起こしません。しかし、次のステップでは、そのためにこれを変更する方法を見ていきます。

### コーパスのシード {#seeding-a-corpus}

エキドナが`magic`関数を処理するには、いくつかの助けが必要です。入力をコピーし、それに適したパラメータを使用するように変更します:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

`magic(42,129,333,0)`を呼び出すように`new.txt`を変更します。これで、エキドナを再実行できます:

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

今回は、プロパティが即座に違反されることを発見しました。

## ガス消費量の多いトランザクションの発見 {#finding-transactions-with-high-gas-consumption}

エキドナを使用してガス消費量の多いトランザクションを見つける方法を見ていきます。ターゲットは以下のスマート・コントラクトです:

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

ここで、`expensive`は大量のガスを消費する可能性があります。

現在、エキドナには常にテストするプロパティが必要です。ここでは`echidna_test`は常に`true`を返します。
エキドナを実行してこれを確認できます:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### ガス消費量の測定 {#measuring-gas-consumption}

エキドナでガス消費量の測定を有効にするには、設定ファイル`config.yaml`を作成します:

```yaml
estimateGas: true
```

この例では、結果を理解しやすくするために、トランザクションシーケンスのサイズも縮小します:

```yaml
seqLen: 2
estimateGas: true
```

### エキドナの実行 {#run-echidna-3}

設定ファイルを作成したら、次のようにエキドナを実行できます:

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

### ガスを削減する呼び出しのフィルタリング {#filtering-out-gas-reducing-calls}

上記の**ファジングキャンペーン中に呼び出す関数のフィルタリング**に関するチュートリアルでは、テストから一部の関数を削除する方法を示しています。  
これは、正確なガスの推定値を取得するために重要になる場合があります。
以下の例を考えてみましょう:

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

エキドナがすべての関数を呼び出せる場合、ガスコストの高いトランザクションを簡単に見つけることはできません:

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

これは、コストが`addrs`のサイズに依存し、ランダムな呼び出しでは配列がほぼ空のままになる傾向があるためです。
しかし、`pop`と`clear`をブラックリストに登録すると、はるかに良い結果が得られます:

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

### まとめ: ガス消費量の多いトランザクションの発見 {#summary-finding-transactions-with-high-gas-consumption}

エキドナは、`estimateGas`設定オプションを使用して、ガス消費量の多いトランザクションを見つけることができます:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

ファジングキャンペーンが終了すると、エキドナはすべての関数について最大ガス消費量のシーケンスを報告します。