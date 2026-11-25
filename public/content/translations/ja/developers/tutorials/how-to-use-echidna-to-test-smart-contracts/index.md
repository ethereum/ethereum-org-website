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

エキドナは、Docker、Homebrew、またはコンパイル済みのバイナリを使用してインストールできます。このチュートリアルの例は、エキドナ 2.3.3 および solc 0.8.37 でテストされています。

### Docker経由でのエキドナ {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_最後のコマンドは、現在のディレクトリにアクセスできるDocker内でエキドナのイメージを実行します。ホストからファイルを変更し、Dockerからそのファイルに対してツールを実行できます。このイメージには、[スリザー](https://github.com/crytic/slither)、[crytic-compile](https://github.com/crytic/crytic-compile)、および[solc-select](https://github.com/crytic/solc-select)も同梱されています。_

Docker内で以下を実行します:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### バイナリ {#binary}

[https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest) から、お使いのプラットフォーム向けの最新リリースをダウンロードしてください。macOSまたはLinuxでは、`brew install echidna` を実行することもできます。これにより、スリザーとcrytic-compileも一緒にインストールされます。

リリースバイナリを使用する場合は、[スリザー](https://github.com/crytic/slither)と[solc-select](https://github.com/crytic/solc-select)を自分でインストールし (たとえば、Python仮想環境で `pip3 install slither-analyzer solc-select` を実行)、コンパイラのバージョンを選択します:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

エキドナはスリザーなしでも動作しますが、スリザーは `require` ステートメントで使用されるマジックナンバーなどの定数を抽出します。以下のいくつかの例では、バグをすばやく見つけるためにスリザーに依存しています。

## プロパティベースのファジングの概要 {#introduction-to-property-based-fuzzing}

エキドナはプロパティベースのファザーであり、以前のブログ記事 ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)、[2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)、[3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)) で説明しました。

### ファジング {#fuzzing}

[ファジング](https://wikipedia.org/wiki/Fuzzing)は、セキュリティコミュニティでよく知られている手法です。プログラム内のバグを見つけるために、多かれ少なかれランダムな入力を生成することで構成されます。従来のソフトウェア向けのファザー ([AFL](http://lcamtuf.coredump.cx/afl/) や [LibFuzzer](https://llvm.org/docs/LibFuzzer.html) など) は、バグを見つけるための効率的なツールとして知られています。

純粋にランダムな入力の生成を超えて、優れた入力を生成するための多くの手法や戦略があります。これには以下が含まれます:

- 各実行からフィードバックを取得し、それを使用して生成をガイドする。たとえば、新しく生成された入力が新しいパスのディスカバリーにつながる場合、それに近い新しい入力を生成することは理にかなっています。
- 構造的な制約を尊重して入力を生成する。たとえば、入力にチェックサム付きのヘッダーが含まれている場合、ファザーにチェックサムを検証する入力を生成させることは理にかなっています。
- 既知の入力を使用して新しい入力を生成する: 有効な入力の大規模なデータセットにアクセスできる場合、ファザーはゼロから生成を開始するのではなく、それらから新しい入力を生成できます。これらは通常、_シード_ と呼ばれます。

### プロパティベースのファジング {#property-based-fuzzing}

エキドナは、特定のファザーのファミリーに属しています。それは、[QuickCheck](https://wikipedia.org/wiki/QuickCheck) に強く影響を受けたプロパティベースのファジングです。クラッシュを見つけようとする従来のファザーとは対照的に、エキドナはユーザー定義の不変条件を破ろうとします。

スマート・コントラクトにおいて、不変条件はSolidityの関数であり、コントラクトが到達する可能性のある不正確または無効な状態を表すことができます。これには以下が含まれます:

- 不正なアクセス制御: 攻撃者がコントラクトの所有者になった。
- 不正な状態マシン: コントラクトが一時停止されている間にトークンを転送できる。
- 不正な算術演算: ユーザーが残高をアンダーフローさせ、無制限の無料トークンを取得できる。

### エキドナを使用したプロパティのテスト {#testing-a-property-with-echidna}

エキドナを使用してスマート・コントラクトをテストする方法を見ていきます。ターゲットは次のスマート・コントラクト [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) です:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

このトークンには次のプロパティが必要であると仮定します:

- 誰でも最大1000トークンを持つことができる
- トークンは転送できない (ERC-20トークンではない)

### プロパティの記述 {#write-a-property}

エキドナのプロパティはSolidityの関数です。プロパティは次の条件を満たす必要があります:

- 引数を持たない
- 成功した場合は `true` を返す
- 名前が `echidna` で始まる

エキドナは次のことを行います:

- プロパティをテストするための任意のトランザクションを自動的に生成する。
- プロパティが `false` を返すか、エラーをスローする原因となるトランザクションを報告する。
- プロパティを呼び出す際の副作用を破棄する (つまり、プロパティが状態変数を変更した場合、テスト後に破棄される)。

次のプロパティは、呼び出し元が1000トークンを超えて持っていないことを確認します:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

継承を使用して、コントラクトをプロパティから分離します:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) はプロパティを実装し、トークンを継承します。

### コントラクトの初期化 {#initiate-a-contract}

エキドナには、引数のない[コンストラクタ](/developers/docs/smart-contracts/anatomy/#constructor-functions)が必要です。コントラクトに特定の初期化が必要な場合は、コンストラクタで実行する必要があります。

エキドナにはいくつかのアドレスが指定されています:

- コンストラクタを呼び出す `0x30000`。
- 他の関数をランダムに呼び出す `0x10000`、`0x20000`、および `0x30000`。
- テスト対象のコントラクトがデプロイされる `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`。

現在の例では特定の初期化は必要ないため、コンストラクタは空です。

### エキドナの実行 {#run-echidna}

エキドナは次のように起動します:

```sh
echidna contract.sol
```

contract.sol に複数のコントラクトが含まれている場合は、ターゲットを指定できます:

```sh
echidna contract.sol --contract MyContract
```

ターミナルで実行すると、エキドナはインタラクティブなUIを表示します。以下の例のようなプレーンテキストの出力を得るには、`--format text` を追加します。

### まとめ: プロパティのテスト {#summary-testing-a-property}

以下は、この例でのエキドナの実行のまとめです:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

エキドナは、`backdoor` が呼び出された場合にプロパティが違反されることを発見しました。

## ファジングキャンペーン中に呼び出す関数のフィルタリング {#filtering-functions-to-call-during-a-fuzzing-campaign}

ファジング対象の関数をフィルタリングする方法を見ていきます。
ターゲットは次のスマート・コントラクトです:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
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

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

この小さな例では、状態変数を変更するために特定のトランザクションのシーケンスを見つけることをエキドナに強制します。
これはファザーにとって困難です。
エキドナを実行してこれを確認できます:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### 関数のフィルタリング {#filtering-functions}

2つのリセット関数 (`reset1` と `reset2`) がすべての状態変数を `false` に設定するため、エキドナはこのコントラクトをテストするための正しいシーケンスを見つけるのに苦労します。
ただし、エキドナの特別な機能を使用して、リセット関数をブラックリストに登録するか、`f`、`g`、`h`、および `i` 関数のみをホワイトリストに登録することができます。

関数をブラックリストに登録するには、次の設定ファイルを使用できます:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

関数をフィルタリングする別のアプローチは、ホワイトリストに登録された関数をリストすることです。これを行うには、次の設定ファイルを使用できます:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` はデフォルトで `true` です。
- フィルタリングは、コントラクト名、`.`、およびアプリケーション・バイナリ・インターフェース (ABI) 署名 (たとえば `C.f(uint256)`) を含む完全な関数名に対して実行されます。`f()` と `f(uint256)` がある場合、どちらをフィルタリングするかを正確に選択できます。`"reset1"` のような単なる名前は何も一致しません。

### エキドナの実行 {#run-echidna-1}

設定ファイル `blacklist.yaml` を使用してエキドナを実行するには:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

エキドナは、プロパティを反証するトランザクションのシーケンスをほぼ即座に見つけます。

### まとめ: 関数のフィルタリング {#summary-filtering-functions}

エキドナは、以下を使用して、ファジングキャンペーン中に呼び出す関数をブラックリストまたはホワイトリストに登録できます:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

エキドナは、`filterBlacklist` ブール値の値に応じて、`C.f1()`、`C.f2()`、および `C.f3()` をブラックリストに登録するか、これらのみを呼び出してファジングキャンペーンを開始します。

## エキドナでSolidityのアサートをテストする方法 {#how-to-test-soliditys-assert-with-echidna}

この短いチュートリアルでは、エキドナを使用してコントラクト内のアサーションチェックをテストする方法を示します。次のようなコントラクトがあると仮定しましょう:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Solidity 0.8以降、算術オーバーフローはデフォルトでリバートされます。`unchecked` ブロックはラップ動作を復元するため、`counter` がオーバーフローする可能性があります。これがエキドナに見つけてほしいバグです。

### アサーションの記述 {#write-an-assertion}

差分を返した後、`tmp` が `counter` 以下であることを確認したいとします。エキドナのプロパティを記述することもできますが、`tmp` の値をどこかに保存する必要があります。代わりに、次のようなアサーションを使用できます:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### エキドナの実行 {#run-echidna-2}

アサーション失敗のテストを有効にするには、コマンドラインで `--test-mode assertion` を渡すか、[エキドナ設定ファイル](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml` を作成します:

```yaml
testMode: assertion
```

このコントラクトをエキドナで実行すると、期待される結果が得られます:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

ご覧のとおり、エキドナは `inc` 関数でいくつかのアサーションの失敗を報告します。関数ごとに複数のアサーションを追加することは可能ですが、エキドナはどのアサーションが失敗したかを区別できません。

### アサーションを使用するタイミングと方法 {#when-and-how-use-assertions}

アサーションは、特にチェックする条件が特定の操作 `f` の正しい使用に直接関連している場合、明示的なプロパティの代替として使用できます。コードの後にアサーションを追加すると、実行直後にチェックが行われることが強制されます:

```solidity
function f(..) public {
    // 複雑なコード
    ...
    assert (condition);
    ...
}

```

対照的に、明示的なエキドナのプロパティを使用すると、トランザクションがランダムに実行され、いつチェックされるかを正確に強制する簡単な方法はありません。この回避策を実行することは依然として可能です:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

ただし、いくつかの問題があります:

- `f` が `internal` または `external` として宣言されている場合、失敗します。
- `f` を呼び出すためにどの引数を使用すべきかが不明確です。
- `f` がリバートされた場合、プロパティは失敗します。

一般に、アサーションの使用方法については、[John Regehrの推奨事項](https://blog.regehr.org/archives/1091)に従うことをお勧めします:

- アサーションのチェック中に副作用を強制しないでください。例: `assert(ChangeStateAndReturn() == 1)`
- 明らかなステートメントをアサートしないでください。たとえば、`var` が `uint` として宣言されている場合の `assert(var >= 0)` などです。

最後に、`assert` の代わりに `require` を**使用しないでください**。エキドナはそれを検出できません (ただし、コントラクトはいずれにせよリバートされます)。

### まとめ: アサーションチェック {#summary-assertion-checking}

以下は、この例でのエキドナの実行のまとめです:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

エキドナは、この関数が大きな引数で複数回呼び出された場合、`inc` のアサーションが失敗する可能性があることを発見しました。

## エキドナのコーパスの収集と変更 {#collecting-and-modifying-an-echidna-corpus}

エキドナを使用してトランザクションのコーパスを収集し、使用する方法を見ていきます。ターゲットは次のスマート・コントラクト [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol) です:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

この小さな例では、状態変数を変更するために特定の値を見つけることをエキドナに強制します。これはファザーにとって困難です。
エキドナを実行してこれを確認できます:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

ただし、このファジングキャンペーンを実行する際に、エキドナを使用してコーパスを収集することは依然として可能です。

### コーパスの収集 {#collecting-a-corpus}

コーパスの収集を有効にするには、コーパスディレクトリを作成します:

```sh
mkdir corpus-magic
```

そして、[エキドナ設定ファイル](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml` を作成します:

```yaml
corpusDir: "corpus-magic"
```

これでツールを実行し、収集されたコーパスを確認できます:

```sh
echidna magic.sol --config config.yaml
```

エキドナは依然として正しいマジックバリューを見つけることができません。どこで行き詰まっているかを確認するには、`corpus-magic/covered.*.txt` カバレッジレポートを確認します:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

`r` ラベルは、エキドナがその行に到達したものの、そこで実行がリバートされ、最後の `require` 以降の行が実行されなかったことを意味します。

エキドナが収集したトランザクションシーケンスは、`corpus-magic/coverage/` にJSONファイルとして保存されます。たとえば、これらのファイルの1つの最初のトランザクションは次のとおりでした:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

明らかに、この入力はプロパティの失敗を引き起こしません。ただし、次のステップでは、そのためにこれを変更する方法を見ていきます。

### コーパスのシード {#seeding-a-corpus}

エキドナが `magic` 関数を処理するには、いくつかの助けが必要です。入力をコピーして変更し、それに適したパラメータを使用するようにします (ファイル名はランダムであるため、独自の `corpus-magic/coverage/` ディレクトリから1つ使用してください):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

`magic(42,129,333,0)` を呼び出す単一のトランザクションが含まれるように `new.txt` を変更します。これで、エキドナを再実行できます:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

今回は、プロパティが即座に違反されることを発見しました。

## ガス消費量の多いトランザクションの検索 {#finding-transactions-with-high-gas-consumption}

エキドナを使用してガス消費量の多いトランザクションを見つける方法を見ていきます。古いバージョンのエキドナにはこのための `estimateGas` オプションがありましたが、エキドナ 2.3.0 で削除されました。代わりに、`gasleft()` でガスを測定し、エキドナの[最適化モード](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html)でそれを最大化させます。ターゲットは次のスマート・コントラクトです:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

ここで、`expensive` は大量のガスを消費する可能性があります。

### ガス消費量の測定 {#measuring-gas-consumption}

最適化モードでは、エキドナは引数を取らずに `int256` を返す `echidna_` で始まる関数を探し、戻り値を最大化するトランザクションのシーケンスを見つけようとします。`f` を呼び出し、使用したガスを記録し、最大値を公開するテストコントラクトを追加します (両方のコントラクトを `gas.sol` に保存します):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

最適化モードを有効にするには、設定ファイル `config.yaml` を作成します。この例では、結果を理解しやすくするために、トランザクションシーケンスのサイズも縮小します:

```yaml
testMode: optimization
seqLen: 2
```

### エキドナの実行 {#run-echidna-3}

設定ファイルを作成したら、次のようにエキドナを実行できます:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- 表示されるガスは、エキドナが実行されるイーサリアム仮想マシン (EVM) 実装である [hevm](https://github.com/argotorg/hevm) によって測定され、`measureF` からの内部呼び出しのオーバーヘッドが含まれます。
- 最大値は一意ではありません。各キャンペーンはランダムであり、より長いキャンペーン (たとえば `--test-limit 200000`) はより大きな値を見つける傾向があります。

### ガスを削減する呼び出しのフィルタリング {#filtering-out-gas-reducing-calls}

上記の**ファジングキャンペーン中に呼び出す関数のフィルタリング**に関するチュートリアルでは、テストから一部の関数を削除する方法を示しています。  
これは、正確なガスの見積もりを得るために重要になる場合があります。
次の例を考えてみましょう:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` は `check` を呼び出し、そのガスコストを返します。すべてのエキドナのテスト関数と同様に、その状態の変更は後で破棄されます。

エキドナがすべての関数を呼び出せる場合、ガスコストの高いトランザクションを簡単に見つけることはできません:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

これは、コストが `addrs` のサイズに依存し、ランダムな呼び出しでは配列がほぼ空のままになる傾向があるためです。
ただし、`pop` と `clear` をブラックリストに登録すると、はるかに良い結果が得られます:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

すべてのリプレイでコストの高い `check` 関数が呼び出されるため、この結果の呼び出しシーケンスを縮小するには数分かかります。

### まとめ: ガス消費量の多いトランザクションの検索 {#summary-finding-transactions-with-high-gas-consumption}

エキドナは、`int256` を返す `echidna_` 関数内で `gasleft()` を使用してガスを測定し、最適化モードで実行することで、ガス消費量の多いトランザクションを見つけることができます:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

ファジングキャンペーンが終了すると、エキドナは見つかった最大値とそれを生成したトランザクションのシーケンスを報告します。
