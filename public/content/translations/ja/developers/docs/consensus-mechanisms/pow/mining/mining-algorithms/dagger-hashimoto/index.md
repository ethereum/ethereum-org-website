---
title: ダガーハシモト
description: ダガーハシモト・アルゴリズムの詳細
lang: ja
---

ダガーハシモト(Dagger-Hashimoto)は、イーサリアムのマイニングアルゴリズムの最初の研究実装と仕様でした。 その後、ダガーハシモトから[Ethash](#ethash)に置き換えられました。 マイニングは、2022年9月15日の[マージ](/updates/merge)で完全に廃止されました。 それ以降、イーサリアムには [プルーフ・オブ・ステーク](/developers/docs/consensus-mechanisms/pos)のメカニズムが使われています。 このページについては過去の流れを理解する目的でご覧ください。この情報は、マージ後のイーサリアムには該当しません。

## 前提知識 {#prerequisites}

このページをより理解するために、まず[プルーフ・オブ・ワーク・コンセンサス](/developers/docs/consensus-mechanisms/pow)、[マイニング](/developers/docs/consensus-mechanisms/pow/mining)、[マイニングアルゴリズム](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms)を読むことをお勧めします。

## ダガーハシモト {#dagger-hashimoto}

ダガーハシモトは、次の2つの目的を達成することを目指しています。

1.  **ASIC耐性**: アルゴリズム専用ハードウェアの製作によって得られる利益を、最小限にすること。
2.  **ライトクライアントの検証可能性**: ライトクライアントがブロックを効率的に検証可能であること。

追加の修正により、ご希望に応じて、3つ目の目標を達成する方法も記載しますが、複雑になります。

**フルチェーンストレージ**: マイニングでは、完全なブロックチェーンの状態の保管を必要にすること(イーサリアムのステートツリーの不規則な構造により、特によく使われるいくつかのコントラクトは、ある程度のプルーニングが可能だと予想されます。しかし、これを最小限に抑えたいと考えています)。

## 有向非巡回グラフ(DAG)の生成 {#dag-generation}

Pythonを使って、このアルゴリズムのコードを以下に定義します。 最初に、指定された精度の符号なし整数型を、マーシャリングして文字列にするため `encode_int`を用意します。 変換された値を戻す関数もまた用意します。

```python
NUM_BITS = 512

def encode_int(x):
    "Encode an integer x as a string of 64 characters using a big-endian scheme"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Unencode an integer x from a string using a big-endian scheme"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

次に`sha3`は、整数を引数に取り、整数を出力する関数とします。`dbl_sha3`は、倍精度浮動小数点数型のsha3関数とします。このレファレンスのコードを、実装する場合は次のように使います。

```python
from pyethereum import utils
def sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(x))

def dbl_sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(utils.sha3(x)))
```

### パラメータ {#parameters}

アルゴリズムに使用されるパラメータは次のとおりです。

```python
SAFE_PRIME_512 = 2**512 - 38117     # Largest Safe Prime less than 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Size of the dataset (4 Gigabytes); MUST BE MULTIPLE OF 65536
      "n_inc": 65536,                   # Increment in value of n per period; MUST BE MULTIPLE OF 65536
                                        # with epochtime=20000 gives 882 MB growth per year
      "cache_size": 2500,               # Size of the light client's cache (can be chosen by light
                                        # client; not part of the algo spec)
      "diff": 2**14,                    # Difficulty (adjusted during block evaluation)
      "epochtime": 100000,              # Length of an epoch in blocks (how often the dataset is updated)
      "k": 1,                           # Number of parents of a node
      "w": w,                          # Used for modular exponentiation hashing
      "accesses": 200,                  # Number of dataset accesses during hashimoto
      "P": SAFE_PRIME_512               # Safe Prime for hashing and random number generation
}
```

この場合、`P`は、`log₂(P)`によって512よりわずかに小さくなるように選ばれた素数です。これは、数値を表すために使用している512ビットに対応します。 実際に格納される必要があるのは、DAGの後半部分です。事実上のRAM要件は、1GBから始まり毎年441MBずつ増加します。

### ダガーグラフの構築 {#dagger-graph-building}

原始的なダガーグラフの構築は、以下のように定義できます。

```python
def produce_dag(params, seed, length):
    P = params["P"]
    picker = init = pow(sha3(seed), params["w"], P)
    o = [init]
    for i in range(1, length):
        x = picker = (picker * init) % P
        for _ in range(params["k"]):
            x ^= o[x % i]
        o.append(pow(x, params["w"], P))
    return o
```

基本的には、単一ノードである`sha3(seed)`として、グラフをスタートします。そこから、ランダムな前のノードに基づいて、他のノードを順次追加し始めます。 新しいノードが作成されると、シードの冪剰余が計算され、`i`より小さいいくつかのインデックスがランダムに選択されます (上記の`x % i`を使用) 。それらのインデックスのノードの値は、計算で使用され、`x`の新しい値を生成します。この値は、 (排他的論理和に基づいた) 小さなプルール・オブ・ワーク関数に送られ、最終的にはインデックス`i`のブラフの値を生成します。 この特有の設計の背後にある理論的根拠は、DAGのシーケンシャルアクセスを強制することです。アクセスされるDAGの次の値は、現在の値が判明するまで決定できません。 最後に、冪剰余で結果をさらにハッシュ化します。

このアルゴリズムは、数論から得られたいくつかの結果に依存しています。 考察については、ページ下部にある付録を参照してください。

## ライトクライアントの評価 {#light-client-evaluation}

上記のグラフ構造は、少数のノードのみのサブツリーを計算してグラフの各ノードを再構築できるようすることを目的にしています。また、少量の補助メモリのみを必要とします。 k=1の場合、サブツリーは、DAGの最初の要素までのチェーンの値にすぎないことに注意してください。

ライトクライアントのDAG計算関数は、次のように動作します。

```python
def quick_calc(params, seed, p):
    w, P = params["w"], params["P"]
    cache = {}

    def quick_calc_cached(p):
        if p in cache:
            pass
        elif p == 0:
            cache[p] = pow(sha3(seed), w, P)
        else:
            x = pow(sha3(seed), (p + 1) * w, P)
            for _ in range(params["k"]):
                x ^= quick_calc_cached(x % p)
            cache[p] = pow(x, w, P)
        return cache[p]

    return quick_calc_cached(p)
```

基本的に、上記のアルゴリズムを単純に書き直し、DAG全体の値を計算するループが除かれ、以前のノード検索から、再帰呼び出しまたはキャッシュ検索に置き換えられています。 `k=1`の場合、キャッシュは不要となることに注意してください。しかし、さらなる最適化において、DAGの最初の数千の値が事前に計算され、計算用の静的キャッシュとして保持されます。これのコード実装は、付録を参照してください。

## 有向非巡回グラフ(DAG)のダブルバッファ {#double-buffer}

フルクライアントでは、上記の式で生成した2つのDAGの[_ダブルバッファ_](https://wikipedia.org/wiki/Multiple_buffering)が使われます。 このアイデアは、DAGが上記のパラメータに従い、ブロックの`epochtime`数ごとに生成されるというものです。 クライアントは、最新の生成されたDAGを使うのではなく、1つ前のDAGを使います。 この利点としては、マイナーが突然すべてのデータを再計算するステップを取り入れる必要がなく、DAGを時間の経過とともに置き換えられることです。 そうでなければ、チェーンを処理する一定間隔で突然一時的に遅くなり、集中化が劇的に増加する可能性があります。 これにより、すべてのデータが再計算される前の数分間以内に、51%攻撃のリスクが発生します。

ブロックのワークを計算するために使われるDAGセットを生成するために使用するアルゴリズムは、次のようになります。

```python
def get_prevhash(n):
    from pyethereum.blocks import GENESIS_PREVHASH
    from pyethereum import chain_manager
    if n <= 0:
        return hash_to_int(GENESIS_PREVHASH)
    else:
        prevhash = chain_manager.index.get_block_by_number(n - 1)
        return decode_int(prevhash)

def get_seedset(params, block):
    seedset = {}
    seedset["back_number"] = block.number - (block.number % params["epochtime"])
    seedset["back_hash"] = get_prevhash(seedset["back_number"])
    seedset["front_number"] = max(seedset["back_number"] - params["epochtime"], 0)
    seedset["front_hash"] = get_prevhash(seedset["front_number"])
    return seedset

def get_dagsize(params, block):
    return params["n"] + (block.number // params["epochtime"]) * params["n_inc"]

def get_daggerset(params, block):
    dagsz = get_dagsize(params, block)
    seedset = get_seedset(params, block)
    if seedset["front_hash"] <= 0:
        # No back buffer is possible, just make front buffer
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## ハシモト {#hashimoto}

オリジナルのハシモトの背景にあるアイデアは、ブロックチェーンをデータセットとして使用することです。ブロックチェーンからN個のインデックスを選択して計算を実行し、これらのインデックスでトランザクションを収集し、このデータの排他的論理和(XOR)を実行して、結果のハッシュ値を返します。 Thaddeus Dryjaのオリジナルのアルゴリズムは、次のように一貫性のためにPythonでも書かれています。

```python
def orig_hashimoto(prev_hash, merkle_root, list_of_transactions, nonce):
    hash_output_A = sha256(prev_hash + merkle_root + nonce)
    txid_mix = 0
    for i in range(64):
        shifted_A = hash_output_A >> i
        transaction = shifted_A % len(list_of_transactions)
        txid_mix ^= list_of_transactions[transaction] << i
    return txid_mix ^ (nonce << 192)
```

残念ながら、ハシモトはRAMの消費が多いとみなされています。256ビット演算に依存しており、計算にかなりのオーバーヘッドがあります。 しかし、ダガーハシモトでは、この問題に対処するため、最下位64ビットのみを使用してデータセットのインデックスを作成します。

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

倍精度浮動小数点数型(double) SHA3を使用して、ゼロデータ形式、ほぼ即時の事前検証、提供された正しい中間値のみの検証などが可能です。 このプルーフ・オブ・ワークの外側のレイヤーは、ASICと相性が非常に良く、かなり脆弱になってます。しかし、すぐに拒否されないブロックを生成するには、少量のワークをしなければならないため、DDoS攻撃をさらに困難にします。 以下は、ライトクライアントのバージョンです。

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## マイニングと検証 {#mining-and-verifying}

それでは、すべてをマイニングアルゴリズムにまとめてみましょう。

```python
def mine(daggerset, params, block):
    from random import randint
    nonce = randint(0, 2**64)
    while 1:
        result = hashimoto(daggerset, get_dagsize(params, block),
                           params, decode_int(block.prevhash), nonce)
        if result * params["diff"] < 2**256:
            break
        nonce += 1
        if nonce >= 2**64:
            nonce = 0
    return nonce
```

以下は、検証アルゴリズムです。

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

以下は、ライトクライアントフレンドリーな検証です。

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

また、ダガーハシモトは、ブロックヘッダに次の追加の要件を課していることに注意してください。

- 2層検証が機能するためには、ブロックヘッダーに、ノンス (nonce)と、前にsha3だった中間値の両方が含まれている必要がある。
- ブロックヘッダーのどこかに、現在のシードセットのsha3が格納されている必要がある。

## 参考文献 {#further-reading}

_役に立つコミュニティリソースをご存知の場合は、 このページを編集して追加してください。_

## 付録 {#appendix}

前述のように、DAGの生成で使われる乱数発生器(RNG)は、数論から得られた次の結果に依存しています。 最初に`picker`変数のもととなるレーマー乱数発生器の周期が広いことを断言しておきます。 次に、`pow(x,3,P)`は、 `x ∈ [2,P-2]`を開始条件として、`x`を`1`または`P-1`にマップしないことを示します。 最後に、 `pow(x,3,P)`を、ハッシュ関数として扱うと、衝突率が低くなることを示します。

### レーマー 乱数発生器 {#lehmer-random-number}

`produce_dag`関数は、無作為の乱数を生成する必要がない一方で、潜在的な脅威として`seed**i % P`が一握りの値しか取れません。 このため、このパターンを認識しているマイナーは、そうでないマイナーに比べて有利になる可能性があります。

これを避けるために、数論による結果を使う必要があります。 [_安全素数_](https://en.wikipedia.org/wiki/Safe_prime)とは、 `(P-1)/2`も素数であるような素数`P`と定義されています。 [乗法群](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n)のメンバー `x`の_次数_ `ℤ/nℤ`は、次の公式にある小さい字の`m`で定義されています。 <pre>xᵐ mod P ≡ 1</pre>
これらの定義から、次のようになります。

> 見解1.  `x`を安全素数`P`の乗法群`ℤ/Pℤ`のメンバーとします。 `x mod P ≠ 1 mod P`かつ`x mod P ≠ P-1 mod P`の場合は、`x`の次数は、`P-1`または`(P-1)/2`となります。

_証明_.  `P`は安全素数なので、\[ラグランジュの定理\]\[lagrange\]により、`x`の次数は`1`、`2`、`(P-1)/2`、または`P-1`のいずれかになります。

`x`の次数は`1`になることはできません。フェルマーの小定理により、次を満たすためです。

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

したがって、`x`は`ℤ/nℤ`の乗法的単位元でなければならず、一意です。 前提で`x≠1`としたので、これはありえません。

`x = P-1`でない限り、`x`の次数を`2`にすることはできません。これは、`P`が素数であることに違反するためです。

上記の命題から、`(picker * init) % P`の繰り返しは、少なくとも`(P-1)/2`の周期になることがわかります。 これは、`P`を2以上の累乗にほぼ等しい安全素数として選択し、`init`が`[2,2**256+1]`の間隔にあるためです。 `P`の大きさを考えると、冪剰余から周期を予想することはできません。

DAGの最初のセルを割り当てるとき (`init`というラベルの付いた変数) 、`pow(sha3(seed) + 2, 3, P)`を計算します。 一見すると、これは結果が`1`でも`P-1`でもないことを保証しません。 しかし、`P-1`は、安全素数であるため、見解1の帰結となる次の追加の保証があります。

> 見解2.  `x`を安全素数`P`の乗法群`ℤ/Pℤ`のメンバーとし、`w`を自然数とします。 `x mod P ≠ 1 mod P`かつ`x mod P ≠ P-1 mod P`および`w mod P ≠ P-1 mod P`かつ`w mod P ≠ 0 mod P`の場合、`xʷ mod P ≠ 1 mod P`かつ`xʷ mod P ≠ P-1 mod P`

### ハッシュ関数としての冪乗余 {#modular-exponentiation}

`P`と`w`の特定の値に対して、関数`pow(x,w,P)`は、多くの衝突を起こす可能性があります。 たとえば、`pow(x,9,19) `は値`{1,18}`のみを取ります。

`P`が素数であるとすると、累積余剰ハッシュ関数の適切な`w`は、次の結果を使用して選択できます。

> 見解3.  `P`を素数とし、`ℤ/Pℤ`のすべての`a`かつ`b`において、そのときに限り`w`かつ`P-1`が互いに素であることが成り立ち、これは次のようになります。
> 
> <center>
>   `a mod P ≡ b mod P` のとき、そのときに限り `aʷ mod P ≡ bʷ mod P`
> </center>

したがって、`P`が素数でかつ`w`が`P-1`に対して互いに素であるとすると、`|{pow(x, w, P) : x ∈ ℤ}|  = P `が得られます。考えられるハッシュ関数の衝突率が最小であることを意味します。

選択したように`P`が安全素数であるという特殊なケースでは、`P-1`が1、2、`(P-1)/2`、および`P-1`の因数のみを持ちます。 `P`>7であるため、3は、`P-1`に対して互いに素であることがわかります。したがって、`w=3`は、上記の命題を満たします。

## より効率的なキャッシュベースの評価アルゴリズム {#cache-based-evaluation}

```python
def quick_calc(params, seed, p):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_calc_cached(cache, params, p)

def quick_calc_cached(cache, params, p):
    P = params["P"]
    if p < len(cache):
        return cache[p]
    else:
        x = pow(cache[0], p + 1, P)
        for _ in range(params["k"]):
            x ^= quick_calc_cached(cache, params, x % p)
        return pow(x, params["w"], P)

def quick_hashimoto(seed, dagsize, params, header, nonce):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_hashimoto_cached(cache, dagsize, params, header, nonce)

def quick_hashimoto_cached(cache, dagsize, params, header, nonce):
    m = dagsize // 2
    mask = 2**64 - 1
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc_cached(cache, params, m + (mix & mask) % m)
    return dbl_sha3(mix)
```
