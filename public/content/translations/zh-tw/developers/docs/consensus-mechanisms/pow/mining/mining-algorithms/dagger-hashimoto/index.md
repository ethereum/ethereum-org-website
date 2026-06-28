---
title: Dagger-Hashimoto
description: "深入了解 Dagger-Hashimoto 演算法。"
lang: zh-tw
---

Dagger-Hashimoto 是以太坊挖礦演算法的最初研究實作與規範。Dagger-Hashimoto 後來被 [Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash) 取代。挖礦已於 2022 年 9 月 15 日的[合併](/roadmap/merge/)中完全關閉。從那時起，以太坊改由[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos)機制來保障安全。本頁面僅供歷史參考——此處的資訊已不再適用於合併後的以太坊。

## 先決條件 {#prerequisites}

為了更了解本頁面，我們建議您先閱讀[工作量證明 (PoW) 共識](/developers/docs/consensus-mechanisms/pow)、[挖礦](/developers/docs/consensus-mechanisms/pow/mining)以及[挖礦演算法](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms)。

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto 旨在滿足兩個目標：

1.  **抗 ASIC**：為該演算法建立專用硬體所帶來的效益應盡可能小。
2.  **輕客戶端可驗證性**：區塊應能由輕客戶端有效率地驗證。

透過額外的修改，我們也說明了如何在需要時達成第三個目標，但代價是增加複雜性：

**完整鏈儲存**：挖礦應要求儲存完整的區塊鏈狀態（由於以太坊狀態樹的不規則結構，我們預期可以進行一些修剪，特別是某些常用的合約，但我們希望將此降至最低）。

## DAG 產生 {#dag-generation}

該演算法的程式碼將在下方以 Python 定義。首先，我們提供 `encode_int` 以將指定精度的無號整數編組為字串。同時也提供其反向操作：

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

接下來我們假設 `sha3` 是一個接受整數並輸出整數的函數，而 `dbl_sha3` 是一個雙重 SHA-3 函數；如果將此參考程式碼轉換為實作，請使用：

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

演算法使用的參數為：

```python
SAFE_PRIME_512 = 2**512 - 38117     # 小於 2**512 的最大安全質數

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # 資料集的大小（4 GB）；必須是 65536 的倍數
      "n_inc": 65536,                   # 每個週期 n 值的增量；必須是 65536 的倍數
                                        # 當 epochtime=20000 時，每年增長 882 MB
      "cache_size": 2500,               # 輕客戶端的快取大小（可由輕
                                        # 客戶端選擇；不屬於演算法規範的一部分）
      "diff": 2**14,                    # 難度（在區塊評估期間調整）
      "epochtime": 100000,              # 一個 epoch 的區塊長度（資料集更新的頻率）
      "k": 1,                           # 一個節點的父節點數量
      "w": w,                          # 用於模冪雜湊運算
      "accesses": 200,                  # hashimoto 期間的資料集存取次數
      "P": SAFE_PRIME_512               # 用於雜湊運算和隨機數生成的安全質數
}
```

在此情況下，`P` 是一個被選定的質數，使得 `log₂(P)` 略小於 512，這對應於我們一直用來表示數字的 512 位元。請注意，實際上只需要儲存 DAG 的後半部，因此實際的 RAM 需求從 1 GB 開始，並以每年 441 MB 的速度增長。

### Dagger 圖形建構 {#dagger-graph-building}

Dagger 圖形建構原語定義如下：

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

基本上，它從一個單一節點 `sha3(seed)` 開始建立圖形，然後根據隨機的先前節點依序加入其他節點。建立新節點時，會計算種子的模冪以隨機選擇一些小於 `i` 的索引（使用上方的 `x % i`），並將這些索引處的節點值用於計算以產生 `x` 的新值，然後將其輸入到一個小型的（基於 XOR 的）工作量證明函數中，最終產生圖形在索引 `i` 處的值。這種特定設計背後的原理是強制循序存取 DAG；在知道目前值之前，無法確定將要存取的下一個 DAG 值。最後，模冪運算會進一步對結果進行雜湊運算。

此演算法依賴於數論中的幾個結果。請參閱下方的附錄以了解相關討論。

## 輕客戶端評估 {#light-client-evaluation}

上述的圖形建構旨在允許透過僅計算少量節點的子樹並僅需要少量輔助記憶體來重建圖形中的每個節點。請注意，當 k=1 時，子樹只是一條向上延伸至 DAG 中第一個元素的值鏈。

DAG 的輕客戶端計算函數運作如下：

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

基本上，它只是上述演算法的重寫，移除了計算整個 DAG 值的迴圈，並將先前的節點查找替換為遞迴呼叫或快取查找。請注意，對於 `k=1`，快取是不必要的，儘管進一步的最佳化實際上會預先計算 DAG 的前幾千個值，並將其保留為計算的靜態快取；有關此程式碼實作，請參閱附錄。

## DAG 的雙重緩衝區 {#double-buffer}

在完整客戶端中，會使用由上述公式產生的 2 個 DAG 的[_雙重緩衝區 (double buffer)_](https://wikipedia.org/wiki/Multiple_buffering)。其概念是根據上述參數，每隔 `epochtime` 個區塊產生一次 DAG。客戶端不使用最新產生的 DAG，而是使用前一個。這樣做的好處是允許 DAG 隨著時間推移被替換，而不需要加入一個讓礦工必須突然重新計算所有資料的步驟。否則，可能會在固定間隔出現鏈處理突然暫時變慢的情況，並大幅增加中心化程度。從而在重新計算所有資料之前的幾分鐘內產生 51% 攻擊的風險。

用於產生計算區塊工作量所需 DAG 集合的演算法如下：

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
        # 不可能有後備緩衝區，只需建立前置緩衝區
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

原始 Hashimoto 背後的概念是將區塊鏈作為資料集，執行一項計算，從區塊鏈中選擇 N 個索引，收集這些索引處的交易，對這些資料執行 XOR 運算，並回傳結果的雜湊值。Thaddeus Dryja 的原始演算法（為了保持一致性已轉換為 Python）如下：

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

不幸的是，雖然 Hashimoto 被認為是記憶體密集型 (RAM hard)，但它依賴於 256 位元算術，這具有相當大的計算開銷。然而，Dagger-Hashimoto 在索引其資料集時僅使用最低有效 64 位元來解決此問題。

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

使用雙重 SHA-3 允許一種零資料、近乎即時的預先驗證形式，僅驗證是否提供了正確的中間值。這層外層的工作量證明對 ASIC 非常友善且相當薄弱，但它的存在是為了讓 DDoS 攻擊變得更加困難，因為必須完成這少量的工作才能產生不會被立即拒絕的區塊。以下是輕客戶端版本：

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## 挖礦與驗證 {#mining-and-verifying}

現在，讓我們將所有內容整合到挖礦演算法中：

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

以下是驗證演算法：

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

對輕客戶端友善的驗證：

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

此外，請注意 Dagger-Hashimoto 對區塊頭施加了額外的要求：

- 為了讓雙層驗證發揮作用，區塊頭必須同時具有隨機數和 SHA-3 運算前的中間值
- 區塊頭必須在某處儲存目前種子集的 SHA-3 雜湊值

## 延伸閱讀 {#further-reading}

_知道有幫助過您的社群資源嗎？編輯此頁面並加入它！_

## 附錄 {#appendix}

如上所述，用於產生 DAG 的隨機數產生器 (RNG) 依賴於數論中的一些結果。首先，我們保證作為 `picker` 變數基礎的 Lehmer RNG 具有很長的週期。其次，我們證明如果以 `x ∈ [2,P-2]` 開始，`pow(x,3,P)` 不會將 `x` 映射到 `1` 或 `P-1`。最後，我們證明當 `pow(x,3,P)` 被視為雜湊函數時，具有較低的碰撞率。

### Lehmer 隨機數產生器 {#lehmer-random-number}

雖然 `produce_dag` 函數不需要產生無偏差的隨機數，但潛在的威脅是 `seed**i % P` 僅採用少數幾個值。這可能會為識別出該模式的礦工提供優於未識別出該模式的礦工的優勢。

為了避免這種情況，我們引用了數論中的一個結果。[_安全質數 (Safe Prime)_](https://en.wikipedia.org/wiki/Safe_prime) 定義為一個質數 `P`，使得 `(P-1)/2` 也是質數。[乘法群](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` 的成員 `x` 的_階 (order)_ 定義為最小的 `m`，使得 <pre>xᵐ mod P ≡ 1</pre>
根據這些定義，我們得出：

> 觀察 1。令 `x` 為安全質數 `P` 的乘法群 `ℤ/Pℤ` 的成員。如果 `x mod P ≠ 1 mod P` 且 `x mod P ≠ P-1 mod P`，則 `x` 的階為 `P-1` 或 `(P-1)/2`。

_證明_。由於 `P` 是安全質數，根據 [拉格朗日定理 (Lagrange's Theorem)][lagrange]，我們得出 `x` 的階為 `1`、`2`、`(P-1)/2` 或 `P-1`。

`x` 的階不能為 `1`，因為根據費馬小定理 (Fermat's Little Theorem)，我們得出：

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

因此 `x` 必須是 `ℤ/nℤ` 的乘法單位元素，這是唯一的。由於我們假設 `x ≠ 1`，這是不可能的。

`x` 的階不能為 `2`，除非 `x = P-1`，因為這會違反 `P` 是質數的條件。

從上述命題中，我們可以認識到迭代 `(picker * init) % P` 的週期長度至少為 `(P-1)/2`。這是因為我們選擇了 `P` 作為一個大約等於 2 的較高次方的安全質數，且 `init` 位於區間 `[2,2**256+1]` 內。考慮到 `P` 的量級，我們永遠不應預期模冪運算會產生循環。

當我們分配 DAG 中的第一個單元格（標記為 `init` 的變數）時，我們計算 `pow(sha3(seed) + 2, 3, P)`。乍看之下，這並不能保證結果既不是 `1` 也不是 `P-1`。然而，由於 `P-1` 是安全質數，我們有以下額外的保證，這是觀察 1 的推論：

> 觀察 2。令 `x` 為安全質數 `P` 的乘法群 `ℤ/Pℤ` 的成員，並令 `w` 為自然數。如果 `x mod P ≠ 1 mod P` 且 `x mod P ≠ P-1 mod P`，以及 `w mod P ≠ P-1 mod P` 且 `w mod P ≠ 0 mod P`，則 `xʷ mod P ≠ 1 mod P` 且 `xʷ mod P ≠ P-1 mod P`

### 模冪運算作為雜湊函數 {#modular-exponentiation}

對於 `P` 和 `w` 的某些值，函數 `pow(x, w, P)` 可能會有許多碰撞。例如，`pow(x,9,19)` 僅採用值 `{1,18}`。

鑑於 `P` 是質數，則可以使用以下結果為模冪雜湊函數選擇適當的 `w`：

> 觀察 3。令 `P` 為質數；`w` 和 `P-1` 互質，若且唯若對於 `ℤ/Pℤ` 中的所有 `a` 和 `b`：<center>`aʷ mod P ≡ bʷ mod P` 若且唯若 `a mod P ≡ b mod P`</center>

因此，鑑於 `P` 是質數且 `w` 與 `P-1` 互質，我們得出 `|{pow(x, w, P) : x ∈ ℤ}| = P`，這意味著雜湊函數具有盡可能低的碰撞率。

在我們選擇的 `P` 為安全質數的特殊情況下，`P-1` 僅具有因數 1、2、`(P-1)/2` 和 `P-1`。由於 `P` > 7，我們知道 3 與 `P-1` 互質，因此 `w=3` 滿足上述命題。

## 更有效率的基於快取的評估演算法 {#cache-based-evaluation}

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