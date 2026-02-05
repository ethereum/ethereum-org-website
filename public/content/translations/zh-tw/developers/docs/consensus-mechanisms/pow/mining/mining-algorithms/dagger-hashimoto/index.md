---
title: Dagger-Hashimoto
description: Dagger-Hashimoto 演算法詳細介紹。
lang: zh-tw
---

Dagger-Hashimoto 是以太坊挖礦演算法的原始研究實作和規範。 Dagger-Hashimoto 已被 [Ethash](#ethash) 取代。 在 2022 年 9 月 15 日的 [合併](/roadmap/merge/) 之後，挖礦已徹底關閉。 此後，以太坊改用 [權益證明](/developers/docs/consensus-mechanisms/pos) 機制來保障安全。 本頁面展示歷史相關內容，其中的資訊與合併後的以太坊不再相關。

## 先決條件 {#prerequisites}

為了更深入了解本頁內容，我們建議您先閱讀關於 [工作量證明共識](/developers/docs/consensus-mechanisms/pow)、[挖礦](/developers/docs/consensus-mechanisms/pow/mining) 以及 [挖礦演算法](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) 的資訊。

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto 旨在實現兩個目標：

1. **專用積體電路抗性**：為演算法打造專用硬體的益處應盡可能地小。
2. **輕量用戶端可驗證性**：區塊應能被輕量用戶端高效驗證。

在進一步修改後，我們還要具體說明如何在必要時實現第三個目標，但要以增加複雜性為代價：

**完整鏈儲存**：挖礦需要儲存完整的區塊鏈狀態（由於以太坊狀態樹的結構不規則，我們預計將有可能進行一些修剪，特別是一些經常用到的合約，但我們希望盡量減少這種情況）。

## DAG 產生 {#dag-generation}

以下演算法程式碼將以 Python 定義。 首先，我們定義了 `encode_int`，用於將指定精確度的無符號整數封送為字串。 同時也定義了它的逆函式：

```python
NUM_BITS = 512

def encode_int(x):
    "使用大端序法將整數 x 編碼為 64 個字元的字串"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "使用大端序法從字串解碼整數 x"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

接下來，我們假設 `sha3` 是一個需要輸入整數，然後輸出整數的函式，而 `dbl_sha3` 是一個 double-sha3 函式；如果將此參考程式碼轉換為實作，請使用以下程式碼：

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

### 參數 {#parameters}

演算法使用的參數如下：

```python
SAFE_PRIME_512 = 2**512 - 38117     # 小於 2**512 的最大安全質數

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # 資料集大小 (4 GB)；必須是 65536 的倍數
      "n_inc": 65536,                   # 每個週期 n 值的增量；必須是 65536 的倍數
                                        # 當 epochtime=20000 時，每年增長 882 MB
      "cache_size": 2500,               # 輕用戶端的快取大小 (可由輕用戶端選擇；
                                        # 非演算法規格的一部分)
      "diff": 2**14,                    # 難度 (在區塊評估期間調整)
      "epochtime": 100000,              # 以區塊為單位的時期長度 (資料集更新頻率)
      "k": 1,                           # 一個節點的父節點數量
      "w": w,                          # 用於模冪運算哈希
      "accesses": 200,                  # hashimoto 期間的資料集存取次數
      "P": SAFE_PRIME_512               # 用於哈希和隨機數產生的安全質數
}
```

`P` 在這種情況下為選定的素數，使得 `log₂(P)` 僅略小於 512，對應於我們用來表示數字的 512 位元。 請注意，實際上只需要儲存有向無環圖的後半部分，因此，實際隨機存取記憶體需求最初為 1 GB，且每年增長 441 MB。

### Dagger 圖形建構 {#dagger-graph-building}

Dagger 建圖基礎單元的定義如下：

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

基本上，建圖從單一節點 `sha3(seed)` 開始，然後根據隨機的先前節點按順序添加到其他節點上。 建立一個新節點後，計算種子的模冪，以隨機選擇一些小於 `i` 的索引（使用上述 `x % i`），並使用這些索引上的節點值進行計算，以產生新的 `x` 值，隨後該值被提供給一個較小的工作量證明函式（基於 XOR），最終產生索引 `i` 上的圖形值。 這種特殊設計背後的基本原理是，強制依序存取有向無環圖；如果目前值未知，則無法確定要存取的下一個有向無環圖的值。 最後，模冪運算會進一步對結果進行雜湊。

這種演算法依賴於數字理論的若干結果。 討論情況見下文附錄。

## 輕用戶端評估 {#light-client-evaluation}

上述構圖旨在實現只計算少量節點的子樹，並且僅需少量的輔助記憶體，便完成圖中每個節點的重構。 請注意，當 k=1 時，子樹只是一個上升到有向無環圖第一個元素的值鏈。

輕量用戶端中，有向無環圖的計算函式如下：

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

本質上，它只是對上述演算法的重寫，刪除了計算整個有向無環圖值的循環，並用遞歸呼叫或快取查找取代了早期的節點查找。 請注意，對於 `k=1` 的情況，快取是不必要的，但進一步的最佳化實際上預先計算了有向無環圖的前幾千個值，並將其作為靜態快取進行計算；有關程式碼實作，請參閱附錄。

## DAG 的雙緩衝區 {#double-buffer}

在完整用戶端中，會使用由上述公式產生的 2 個 DAG 的 [_雙緩衝區_](https://wikipedia.org/wiki/Multiple_buffering)。 其概念是，根據上述參數，每隔 `epochtime` 個區塊就會產生一個有向無環圖。 但用戶端使用的並非是最新產生的有向無環圖，而是前一個。 這樣做的好處是，有向無環圖可以隨著時間的推移而被替換掉，無需包含一個步驟，讓礦工必須突然重新計算所有資料。 否則，定期的鏈處理可能會突然暫時放緩，並大幅提高中心化程度。 因此，在重新計算所有資料之前的幾分鐘時間內，存在 51% 攻擊風險。

要產生用於計算區塊工作的有向無環圖集，演算法如下：

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
        # 沒有可用的後備緩衝區，僅建立前景緩衝區
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

初始 Hashimoto 旨在將區塊鏈用作資料集，執行從區塊鏈中選擇 N 個索引的計算，收集這些索引處的交易，對這些資料執行 XOR，並傳回結果雜湊值。 Thaddeus Dryja 的初始演算法（為了保持一致性，已轉換成 Python）具體如下：

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

遺憾的是，雖然 Hashimoto 被視為隨機存取記憶體密集型演算法，但它依靠的是 256 位元運算，計算開銷非常之大。 不過，Dagger-Hashimoto 在索引其資料集時，僅使用最低有效 64 位元來解決此問題。

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

使用雙重 SHA3 可以實現零資料、近乎即時的預驗證，僅驗證是否提供了正確的中間值。 此工作量證明的外層對專用積體電路高度友善且相當薄弱，但它的存在使分散式阻斷服務變得更加困難，因為必須完成少量工作才能產生不會立即被拒絕的區塊。 以下為輕量用戶端版本：

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## 挖礦與驗證 {#mining-and-verifying}

現在，將它們全部整合到挖礦演算法中：

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

以下為驗證演算法：

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

輕量用戶端的友善驗證：

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

另外，請注意 Dagger-Hashimoto 對區塊頭有額外的要求：

- 為了使雙層驗證起效，區塊頭必須同時具有隨機數和中間值 Pre-sha3
- 區塊頭必須在某處儲存目前種子集的 sha3

## 延伸閱讀 {#further-reading}

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_

## 附錄 {#appendix}

如前所述，用於產生有向無環圖的隨機數產生依賴於數論的一些結果。 首先，我們確保作為 `picker` 變數基礎的 Lehmer 隨機數產生器 (RNG) 具有很長的週期。 其次，只要一開始 `x ∈ [2,P-2]`，我們就能證明 `pow(x,3,P)` 不會將 `x` 對應到 `1` 或 `P-1`。 最後，我們證明 `pow(x,3,P)` 作為哈希函數時，具有較低的碰撞率。

### Lehmer 隨機數產生器 {#lehmer-random-number}

雖然 `produce_dag` 函數不需要產生無偏隨機數，但一個潛在的威脅是 `seed**i % P` 只會得到少數幾個值。 這可以為礦工識別模式提供優勢。

為了避免這種情況，可採用數論結果。 [_安全質數_](https://en.wikipedia.org/wiki/Safe_prime) 的定義是，一個質數 `P`，其 `(P-1)/2` 也是質數。 在[乘法群](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` 中一個成員 `x` 的_階_定義為最小的 `m`，使得 <pre>xᵐ mod P ≡ 1</pre>
基於這些定義，我們得到：

> 觀察 1. 令 `x` 為安全質數 `P` 的乘法群 `ℤ/Pℤ` 的一個成員。 如果 `x mod P ≠ 1 mod P` 且 `x mod P ≠ P-1 mod P`，那麼 `x` 的階次為 `P-1` 或 `(P-1)/2`。

_證明_。 由於 `P` 是一個安全質數，根據[拉格朗日定理][lagrange]，`x` 的階為 `1`、`2`、`(P-1)/2` 或 `P-1`。

`x` 的階不可能是 `1`，因為根據費馬小定理：

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

因此 `x` 必須是 `ℤ/nℤ` 的唯一乘法單位。 由於我們已假設 `x ≠ 1`，因此這是不可能的。

除非 `x = P-1`，否則 `x` 的階不能是 `2`，因為這將違反 `P` 是質數的事實。

從上述命題中，我們可以得知迭代 `(picker * init) % P` 將具有至少 `(P-1)/2` 的循環長度。 這是因為我們選擇了 `P` 為約等於 2 的更高次冪的安全質數，且 `init` 處於 `[2,2**256+1]` 區間內。 考慮到 `P` 的大小，我們不應該預期模冪運算會產生循環。

當我們給有向無環圖 (DAG) 中的第一個單元 (標記為 `init` 的變數) 賦值時，我們計算 `pow(sha3(seed) + 2, 3, P)`。 乍看之下，這並不能保證結果既不是 `1` 也不是 `P-1`。 然而，既然 `P-1` 是一個安全質數，我們也提供以下額外保證，這是觀察 1 的必然結果：

> 觀察 2. 令 `x` 為安全質數 `P` 的乘法群 `ℤ/Pℤ` 的一個成員，並令 `w` 為一個自然數。 如果 `x mod P ≠ 1 mod P`、`x mod P ≠ P-1 mod P`，且 `w mod P ≠ P-1 mod P`、`w mod P ≠ 0 mod P`，則 `xʷ mod P ≠ 1 mod P` 且 `xʷ mod P ≠ P-1 mod P`

### 模冪運算用作哈希函數 {#modular-exponentiation}

對於 `P` 和 `w` 的某些值，`pow(x, w, P)` 函數可能會有很多衝突。 例如，`pow(x,9,19)` 的值只能是 `{1,18}`。

假定 `P` 是質數，那麼可以利用以下結果為模冪運算哈希函數選擇一個合適的 `w`：

> 觀察 3. 令 `P` 為一個質數；`w` 和 `P-1` 互質，若且唯若對於 `ℤ/Pℤ` 中所有的 `a` 和 `b`：<center>`aʷ mod P ≡ bʷ mod P` 若且唯若 `a mod P ≡ b mod P`</center>

因此，假定 `P` 是質數且 `w` 與 `P-1` 互質，則我們有 `|{pow(x, w, P) : x ∈ ℤ}| = P`，這意味著該哈希函數具有最小的可能碰撞率。

在我們所選的 `P` 是安全質數的特殊情況下，`P-1` 的因數只有 1、2、`(P-1)/2` 和 `P-1`。 由於 `P` > 7，我們知道 3 與 `P-1` 互質，因此 `w=3` 滿足上述命題。

## 更高效的快取型評估演算法 {#cache-based-evaluation}

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
