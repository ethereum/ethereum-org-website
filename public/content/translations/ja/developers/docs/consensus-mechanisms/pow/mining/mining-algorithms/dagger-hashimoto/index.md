---
title: Dagger-Hashimoto
description: Dagger-Hashimotoアルゴリズムの詳細。
lang: ja
---

Dagger-Hashimotoは、イーサリアムのマイニング・アルゴリズムの初期の研究実装および仕様でした。Dagger-Hashimotoは[イーサッシュ](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash)に取って代わられました。2022年9月15日の[マージ](/roadmap/merge/)により、マイニングは完全に停止されました。それ以降、イーサリアムは代わりに[プルーフ・オブ・ステーク (PoS)](/developers/docs/consensus-mechanisms/pos)メカニズムを使用して保護されています。このページは歴史的な関心のために残されており、ここにある情報はマージ後のイーサリアムにはもはや関連していません。

## 前提条件 {#prerequisites}

このページをよりよく理解するために、まずは[プルーフ・オブ・ワーク (PoW) コンセンサス](/developers/docs/consensus-mechanisms/pow)、[マイニング](/developers/docs/consensus-mechanisms/pow/mining)、および[マイニング・アルゴリズム](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms)について読むことをお勧めします。

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimotoは、次の2つの目標を満たすことを目指しています。

1.  **ASIC耐性**: アルゴリズムに特化したハードウェアを作成することによる利益を可能な限り小さくすること。
2.  **ライト・クライアントの検証可能性**: ブロックがライト・クライアントによって効率的に検証可能であること。

追加の変更を加えることで、必要に応じて3つ目の目標を達成する方法も指定しますが、複雑さが増すという代償が伴います。

**完全なチェーン・ストレージ**: マイニングには完全なブロックチェーンの状態の保存が必要であること (イーサリアムのステート・トライの不規則な構造のため、特によく使用される一部のコントラクトについてはある程度のプルーニングが可能であると予想されますが、これを最小限に抑えたいと考えています)。

## DAGの生成 {#dag-generation}

アルゴリズムのコードは、以下でPythonを使用して定義されます。まず、指定された精度の符号なし整数を文字列にマーシャリングするための`encode_int`を示します。その逆も示します。

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

次に、`sha3`は整数を受け取って整数を出力する関数であり、`dbl_sha3`はダブルSHA-3関数であると仮定します。このリファレンス・コードを実装に変換する場合は、次を使用します。

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

### パラメーター {#parameters}

アルゴリズムで使用されるパラメーターは次のとおりです。

```python
SAFE_PRIME_512 = 2**512 - 38117     # 2**512未満の最大の安全素数

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # データセットのサイズ（4ギガバイト）。65536の倍数でなければならない
      "n_inc": 65536,                   # 期間ごとのnの値の増分。65536の倍数でなければならない
                                        # epochtime=20000の場合、年間882MBの増加となる
      "cache_size": 2500,               # ライト・クライアントのキャッシュのサイズ（ライト・
                                        # クライアントが選択可能。アルゴリズム仕様の一部ではない）
      "diff": 2**14,                    # 難易度（ブロック評価中に調整される）
      "epochtime": 100000,              # ブロック単位でのエポックの長さ（データセットが更新される頻度）
      "k": 1,                           # ノードの親の数
      "w": w,                          # べき剰余のハッシュ化に使用される
      "accesses": 200,                  # hashimoto実行中のデータセットへのアクセス数
      "P": SAFE_PRIME_512               # ハッシュ化と乱数生成のための安全素数
}
```

この場合の`P`は、`log₂(P)`が512よりわずかに小さくなるように選ばれた素数であり、これは数値を表現するために使用してきた512ビットに対応します。実際に保存する必要があるのはDAGの後半部分のみであるため、事実上のRAM要件は1 GBから始まり、年間441 MBずつ増加することに注意してください。

### Daggerグラフの構築 {#dagger-graph-building}

Daggerグラフ構築のプリミティブは次のように定義されます。

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

基本的に、グラフは単一のノード`sha3(seed)`として開始され、そこからランダムな以前のノードに基づいて他のノードを順次追加し始めます。新しいノードが作成されると、シードのモジュラー累乗が計算され、`i`未満のいくつかのインデックスがランダムに選択されます (上記の`x % i`を使用)。そして、それらのインデックスにあるノードの値が計算に使用されて`x`の新しい値が生成され、それが小さなプルーフ・オブ・ワーク関数 (XORに基づく) に入力されて、最終的にインデックス`i`でのグラフの値が生成されます。この特定の設計の背後にある理論的根拠は、DAGへのシーケンシャル・アクセスを強制することです。アクセスされるDAGの次の値は、現在の値がわかるまで決定できません。最後に、モジュラーべき乗によって結果がさらにハッシュ化されます。

このアルゴリズムは、数論のいくつかの結果に依存しています。詳細については、以下の付録を参照してください。

## ライト・クライアントの評価 {#light-client-evaluation}

上記のグラフ構築は、少数のノードのサブツリーのみを計算し、少量の補助メモリのみを必要とすることで、グラフ内の各ノードを再構築できるようにすることを意図しています。k=1の場合、サブツリーはDAGの最初の要素まで遡る値のチェーンにすぎないことに注意してください。

DAGのライト・クライアント計算関数は次のように機能します。

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

基本的に、これは上記のアルゴリズムを書き直したものであり、DAG全体の値を計算するループを削除し、以前のノードのルックアップを再帰呼び出しまたはキャッシュ・ルックアップに置き換えただけです。`k=1`の場合、キャッシュは不要であることに注意してください。ただし、さらなる最適化として、実際にはDAGの最初の数千の値を事前計算し、それを計算用の静的キャッシュとして保持します。これのコード実装については付録を参照してください。

## DAGのダブル・バッファ {#double-buffer}

フル・クライアントでは、上記の式によって生成された2つのDAGの[_ダブル・バッファ_](https://wikipedia.org/wiki/Multiple_buffering)が使用されます。その考え方は、上記のパラメーターに従って、`epochtime`ブロックごとにDAGが生成されるというものです。クライアントは生成された最新のDAGを使用するのではなく、1つ前のDAGを使用します。これの利点は、マイナーが突然すべてのデータを再計算しなければならないステップを組み込むことなく、時間の経過とともにDAGを置き換えることができることです。そうしないと、一定の間隔でチェーン処理が突然一時的に遅くなり、中央集権化が劇的に進む可能性があります。したがって、すべてのデータが再計算されるまでの数分間に51%攻撃のリスクが生じます。

ブロックの作業を計算するために使用されるDAGのセットを生成するアルゴリズムは次のとおりです。

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
        # バックバッファは不可能であり、フロントバッファのみを作成する
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

元のHashimotoの背後にある考え方は、ブロックチェーンをデータセットとして使用し、ブロックチェーンからN個のインデックスを選択し、それらのインデックスにあるトランザクションを収集し、このデータのXORを実行して、結果のハッシュを返す計算を実行することです。Thaddeus Dryjaの元のアルゴリズムを、一貫性のためにPythonに翻訳したものは次のとおりです。

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

残念ながら、HashimotoはRAMハードであると考えられていますが、256ビットの演算に依存しているため、かなりの計算オーバーヘッドがあります。ただし、Dagger-Hashimotoは、この問題に対処するために、データセットのインデックスを作成する際に最下位の64ビットのみを使用します。

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

ダブルSHA-3を使用することで、正しい中間値が提供されたことのみを検証する、ゼロデータでほぼ瞬時の事前検証の形式が可能になります。このプルーフ・オブ・ワークの外側のレイヤーは、非常にASICフレンドリーでかなり弱いですが、すぐに拒否されないブロックを生成するためにはその少量の作業を行う必要があるため、DDoS攻撃をさらに困難にするために存在します。ライト・クライアント版は次のとおりです。

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## マイニングと検証 {#mining-and-verifying}

では、これらすべてをマイニング・アルゴリズムにまとめてみましょう。

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

検証アルゴリズムは次のとおりです。

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

ライト・クライアント向けの検証:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

また、Dagger-Hashimotoはブロック・ヘッダーに追加の要件を課すことに注意してください。

- 2層の検証が機能するためには、ブロック・ヘッダーにナンスとSHA-3適用前の中間値の両方が含まれている必要があります。
- ブロック・ヘッダーのどこかに、現在のシードセットのSHA-3を保存する必要があります。

## 参考文献 {#further-reading}

_役に立ったコミュニティ・リソースをご存知ですか？このページを編集して追加してください！_

## 付録 {#appendix}

上記のように、DAGの生成に使用されるRNG (乱数生成器) は、数論のいくつかの結果に依存しています。まず、`picker`変数の基礎となるLehmer RNGが広い周期を持つことを保証します。次に、開始時に`x ∈ [2,P-2]`が与えられた場合、`pow(x,3,P)`が`x`を`1`または`P-1`にマッピングしないことを示します。最後に、`pow(x,3,P)`をハッシュ関数として扱った場合、衝突率が低いことを示します。

### Lehmer乱数生成器 {#lehmer-random-number}

`produce_dag`関数は偏りのない乱数を生成する必要はありませんが、潜在的な脅威として、`seed**i % P`がごくわずかな値しか取らないことが挙げられます。これにより、パターンを認識しているマイナーが、そうでないマイナーよりも有利になる可能性があります。

これを回避するために、数論の結果を利用します。[_安全素数 (Safe Prime)_](https://en.wikipedia.org/wiki/Safe_prime)は、`(P-1)/2`も素数となるような素数`P`として定義されます。[乗法群](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n)`ℤ/nℤ`の要素`x`の_位数 (order)_ は、次を満たす最小の`m`として定義されます。<pre>xᵐ mod P ≡ 1</pre>
これらの定義に基づき、次のことが成り立ちます。

> 観察1. `x`を安全素数`P`の乗法群`ℤ/Pℤ`の要素とします。`x mod P ≠ 1 mod P`かつ`x mod P ≠ P-1 mod P`である場合、`x`の位数は`P-1`または`(P-1)/2`のいずれかになります。

_証明_。`P`は安全素数であるため、[ラグランジュの定理][lagrange]により、`x`の位数は`1`、`2`、`(P-1)/2`、または`P-1`のいずれかになります。

フェルマーの小定理により次が成り立つため、`x`の位数は`1`にはなり得ません。

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

したがって、`x`は`ℤ/nℤ`の乗法単位元でなければならず、これは一意です。仮定により`x ≠ 1`としているため、これは不可能です。

`x = P-1`でない限り、`x`の位数は`2`にはなり得ません。そうでないと、`P`が素数であることに反するからです。

上記の命題から、`(picker * init) % P`を反復すると、少なくとも`(P-1)/2`のサイクル長を持つことがわかります。これは、`P`を2のより高い累乗にほぼ等しい安全素数として選択し、`init`が区間`[2,2**256+1]`にあるためです。`P`の大きさを考慮すると、モジュラーべき乗によるサイクルは決して予想されません。

DAGの最初のセル (`init`というラベルの変数) を割り当てる際、`pow(sha3(seed) + 2, 3, P)`を計算します。一見すると、これは結果が`1`でも`P-1`でもないことを保証するものではありません。しかし、`P-1`は安全素数であるため、観察1の系として、次の追加の保証が得られます。

> 観察2. `x`を安全素数`P`の乗法群`ℤ/Pℤ`の要素とし、`w`を自然数とします。`x mod P ≠ 1 mod P`かつ`x mod P ≠ P-1 mod P`であり、さらに`w mod P ≠ P-1 mod P`かつ`w mod P ≠ 0 mod P`である場合、`xʷ mod P ≠ 1 mod P`かつ`xʷ mod P ≠ P-1 mod P`となります。

### ハッシュ関数としてのモジュラーべき乗 {#modular-exponentiation}

`P`と`w`の特定の値に対して、関数`pow(x, w, P)`は多くの衝突を持つ可能性があります。たとえば、`pow(x,9,19)`は`{1,18}`の値のみを取ります。

`P`が素数であるとすると、モジュラーべき乗ハッシュ関数に適切な`w`は、次の結果を使用して選択できます。

> 観察3. `P`を素数とします。`w`と`P-1`が互いに素であるのは、`ℤ/Pℤ`内のすべての`a`および`b`に対して次が成り立つ場合であり、かつその場合に限ります。<center>`aʷ mod P ≡ bʷ mod P`であるのは、`a mod P ≡ b mod P`である場合であり、かつその場合に限ります。</center>

したがって、`P`が素数であり、`w`が`P-1`と互いに素であるとすると、`|{pow(x, w, P) : x ∈ ℤ}| = P`となり、ハッシュ関数が可能な限り最小の衝突率を持つことを意味します。

選択したように`P`が安全素数である特別なケースでは、`P-1`は1、2、`(P-1)/2`、および`P-1`のみを因数として持ちます。`P` > 7であるため、3は`P-1`と互いに素であることがわかります。したがって、`w=3`は上記の命題を満たします。

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