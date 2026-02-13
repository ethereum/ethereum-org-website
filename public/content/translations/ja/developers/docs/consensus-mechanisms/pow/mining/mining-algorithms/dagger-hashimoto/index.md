---
title: "ダガーハシモト"
description: "ダガーハシモト・アルゴリズムの詳細"
lang: ja
---

ダガーハシモト(Dagger-Hashimoto)は、イーサリアムのマイニングアルゴリズムの最初の研究実装と仕様でした。 Dagger-Hashimotoは、[Ethash](#ethash)に取って代わられました。 2022年9月15日の[The Merge](/roadmap/merge/)で、マイニングは完全に停止されました。 それ以来、イーサリアムは代わりに[プルーフ・オブ・ステーク](/developers/docs/consensus-mechanisms/pos)のメカニズムを使用して安全性が確保されています。 このページについては過去の流れを理解する目的でご覧ください。この情報は、マージ後のイーサリアムには該当しません。

## 前提条件 {#prerequisites}

このページをより深く理解するには、まず[プルーフ・オブ・ワークのコンセンサス](/developers/docs/consensus-mechanisms/pow)、[マイニング](/developers/docs/consensus-mechanisms/pow/mining)、[マイニングアルゴリズム](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms)について読むことをお勧めします。

## Dagger-Hashimoto {#dagger-hashimoto}

ダガーハシモトは、次の2つの目的を達成することを目指しています。

1. **ASIC耐性**: アルゴリズム専用のハードウェアを作成することで得られるメリットを、可能な限り小さくすること。
2. **ライトクライアントの検証可能性**: ライトクライアントがブロックを効率的に検証できること。

追加の修正により、ご希望に応じて、3つ目の目標を達成する方法も記載しますが、複雑になります。

**フルチェーンストレージ**: マイニングには、完全なブロックチェーンの状態のストレージが必要であること（イーサリアムのステートツリーの不規則な構造のため、特に頻繁に使用される一部のコントラクトでは、ある程度のプルーニングが可能だと予想されますが、これを最小限に抑えたいと考えています）。

## DAGの生成 {#dag-generation}

Pythonを使って、このアルゴリズムのコードを以下に定義します。 まず、指定された精度の符号なし整数を文字列にマーシャリングするための `encode_int` を示します。 変換された値を戻す関数もまた用意します。

```python
NUM_BITS = 512

def encode_int(x):
    "ビッグエンディアン方式を使用して、整数xを64文字の文字列としてエンコードする"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "ビッグエンディアン方式を使用して、文字列から整数xをデコードする"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

次に、`sha3`が整数を受け取って整数を出力する関数であり、`dbl_sha3`が2重のsha3関数であると仮定します。このリファレンスコードを実装に変換する場合は、以下を使用してください。

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
SAFE_PRIME_512 = 2**512 - 38117     # 2**512未満の最大の安全素数

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # データセットのサイズ（4ギガバイト）、65536の倍数である必要があります
      "n_inc": 65536,                   # 期間ごとのnの値の増分、65536の倍数である必要があります
                                        # epochtime=20000の場合、年間882MB増加
      "cache_size": 2500,               # ライトクライアントのキャッシュのサイズ（ライトクライアントが選択可能、アルゴリズムの仕様には含まれない）
      "diff": 2**14,                    # 難易度（ブロック評価中に調整）
      "epochtime": 100000,              # ブロック単位でのエポックの長さ（データセットの更新頻度）
      "k": 1,                           # ノードの親の数
      "w": w,                          # 冪剰余ハッシュに使用
      "accesses": 200,                  # hashimoto中のデータセットアクセス数
      "P": SAFE_PRIME_512               # ハッシュおよび乱数生成用の安全素数
}
```

この場合、`P` は `log₂(P)` が512よりわずかに小さくなるように選ばれた素数であり、これは数値を表現するために使用している512ビットに対応します。 実際に格納される必要があるのは、DAGの後半部分です。事実上のRAM要件は、1GBから始まり毎年441MBずつ増加します。

### Daggerグラフの構築 {#dagger-graph-building}

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

本質的に、グラフは単一のノード `sha3(seed)` として開始され、そこからランダムな以前のノードに基づいて他のノードを順次追加し始めます。 新しいノードが作成されると、シードの冪剰余が計算され、`i` より小さいインデックスがいくつかランダムに選択されます（上記の `x % i` を使用）。それらのインデックスにあるノードの値が計算に使用されて`x`の新しい値が生成され、その値が小規模なプルーフ・オブ・ワーク関数（XORベース）に送られて、最終的にインデックス `i` のグラフの値を生成します。 この特有の設計の背後にある理論的根拠は、DAGのシーケンシャルアクセスを強制することです。アクセスされるDAGの次の値は、現在の値が判明するまで決定できません。 最後に、冪剰余で結果をさらにハッシュ化します。

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

基本的に、上記のアルゴリズムを単純に書き直し、DAG全体の値を計算するループが除かれ、以前のノード検索から、再帰呼び出しまたはキャッシュ検索に置き換えられています。 `k=1` の場合、キャッシュは不要ですが、さらなる最適化では、実際にはDAGの最初の数千の値を事前計算し、それを計算用の静的キャッシュとして保持することに注意してください。これに関するコード実装については、付録を参照してください。

## DAGのダブルバッファ {#double-buffer}

フルクライアントでは、上記の式で生成された2つのDAGの[_ダブルバッファ_](https://wikipedia.org/wiki/Multiple_buffering)が使用されます。 これは、上記のパラメータに従って、`epochtime`ブロック数ごとにDAGが生成されるという考え方です。 クライアントは、最新の生成されたDAGを使うのではなく、1つ前のDAGを使います。 この利点としては、マイナーが突然すべてのデータを再計算するステップを取り入れる必要がなく、DAGを時間の経過とともに置き換えられることです。 そうでなければ、チェーンを処理する一定間隔で突然一時的に遅くなり、集中化が劇的に増加する可能性があります。 これにより、すべてのデータが再計算される前の数分間以内に、51%攻撃のリスクが発生します。

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
        # バックバッファは作成できないため、フロントバッファのみを作成します
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

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

## 参考リンク {#further-reading}

_役に立つコミュニティリソースを知っていますか? Edit this page and add it!_

## 付録 {#appendix}

前述のように、DAGの生成で使われる乱数発生器(RNG)は、数論から得られた次の結果に依存しています。 まず、`picker` 変数の基礎となるレーマー乱数生成器が長い周期を持つことを保証します。 次に、`x ∈ [2,P-2]` で始まる場合、`pow(x,3,P)` が `x` を `1` または `P-1` にマッピングしないことを示します。 最後に、`pow(x,3,P)` がハッシュ関数として扱われた場合に、低い衝突率を持つことを示します。

### レーマー乱数生成器 {#lehmer-random-number}

`produce_dag` 関数は偏りのない乱数を生成する必要はありませんが、`seed**i % P` がごく少数の値しか取らないという潜在的な脅威があります。 このため、このパターンを認識しているマイナーは、そうでないマイナーに比べて有利になる可能性があります。

これを避けるために、数論による結果を使う必要があります。 [_安全素数_](https://en.wikipedia.org/wiki/Safe_prime)は、`(P-1)/2` もまた素数であるような素数 `P` として定義されます。 [乗法群](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` のメンバー `x` の_位数_は、<pre>xᵐ mod P ≡ 1</pre> となる最小の `m` として定義されます。
これらの定義を前提として、以下が成り立ちます。

> 見解1.  安全素数 `P` について、`x` を乗法群 `ℤ/Pℤ` の元とします。 `x mod P ≠ 1 mod P` かつ `x mod P ≠ P-1 mod P` の場合、`x` の位数は `P-1` または `(P-1)/2` のいずれかです。

_証明_。 `P` は安全素数であるため、[ラグランジュの定理][lagrange]により、`x` の位数は `1`、`2`、`(P-1)/2`、または `P-1` のいずれかになります。

フェルマーの小定理により次式が成り立つため、`x` の位数が `1` になることはありません。

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

したがって、`x` は `ℤ/nℤ` の乗法単位元でなければなりませんが、これは一意です。 前提として `x ≠ 1` と仮定しているため、これはありえません。

`x = P-1` でない限り、`x` の位数が `2` になることはありません。なぜなら、これは `P` が素数であることに反するためです。

上記の命題から、`(picker * init) % P` を繰り返すと、少なくとも `(P-1)/2` の周期長を持つことがわかります。 これは、`P` を2の大きなべき乗にほぼ等しい安全素数として選択し、`init` が区間 `[2,2**256+1]` にあるためです。 `P` の大きさを考えると、冪剰余からサイクルが生じることは予期すべきではありません。

DAGの最初のセル（`init`というラベルの変数）を割り当てる際、`pow(sha3(seed) + 2, 3, P)` を計算します。 一見したところ、これは結果が `1` でも `P-1` でもないことを保証するものではありません。 しかし、`P-1` は安全素数であるため、観察1の系である以下の追加の保証があります。

> 見解2.  安全素数 `P` について、`x` を乗法群 `ℤ/Pℤ` の元とし、`w` を自然数とします。 `x mod P ≠ 1 mod P` かつ `x mod P ≠ P-1 mod P`、そして `w mod P ≠ P-1 mod P` かつ `w mod P ≠ 0 mod P` の場合、`xʷ mod P ≠ 1 mod P` かつ `xʷ mod P ≠ P-1 mod P` となります。

### ハッシュ関数としての冪剰余 {#modular-exponentiation}

`P` と `w` の特定の値に対して、関数 `pow(x, w, P)` は多くの衝突を起こす可能性があります。 例えば、`pow(x,9,19)` は値 `{1,18}` のみを取ります。

`P` が素数である場合、冪剰余ハッシュ関数に対する適切な `w` は、次の結果を用いて選択できます。

> 見解3.  `P` を素数とします。`w` と `P-1` が互いに素であることは、`ℤ/Pℤ` 内のすべての `a` と `b` について、次の条件が成り立つことと同値です。<center>`aʷ mod P ≡ bʷ mod P` であることと `a mod P ≡ b mod P` であることは同値である</center>

したがって、`P` が素数であり、`w` が `P-1` と互いに素である場合、`|{pow(x, w, P) : x ∈ ℤ}| = P` となり、これはハッシュ関数が実現可能な最小の衝突率を持つことを意味します。

私たちが選択したように `P` が安全素数である特殊なケースでは、`P-1` は `1`、`2`、`(P-1)/2`、`P-1` のみを因数として持ちます。 `P` > 7 なので、3は `P-1` と互いに素であることがわかり、したがって `w=3` は上記の命題を満たします。

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
