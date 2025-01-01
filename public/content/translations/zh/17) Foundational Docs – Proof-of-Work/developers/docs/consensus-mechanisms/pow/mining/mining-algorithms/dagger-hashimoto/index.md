---
title: Dagger-Hashimoto
description: 详细了解 Dagger-Hashimoto 算法。
lang: zh
---

Dagger-Hashimoto 是以太坊挖矿算法的原始研究实现和规范。 但是，Dagger-Hashimoto 已被 [Ethash](#ethash) 取代。 在 2022 年 9 月 15 日实施[合并](/roadmap/merge/)后，挖矿完全关闭。 此后，以太坊采用[权益证明](/developers/docs/consensus-mechanisms/pos)机制保护安全。 本页面展示与历史有关的内容，其中的信息不再与合并后的以太坊相关。

## 前提条件 {#prerequisites}

为了更好地了解此页面，建议提前阅读[工作量证明共识](/developers/docs/consensus-mechanisms/pow)、[挖矿](/developers/docs/consensus-mechanisms/pow/mining)和[挖矿算法](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms)。

## Dagger-Hashimoto 算法 {#dagger-hashimoto}

Dagger-Hashimoto 旨在实现两个目标：

1.  **ASIC 抗性**：为算法打造专用硬件的益处应尽可能小。
2.  **轻量级客户端可验证性**：区块应能被轻量级客户端高效验证。

在作出进一步修改后，我们还要具体说明如何在必要时实现第三个目标，但要以增加复杂性为代价：

**完整链存储**：挖矿需要存储完整的区块链状态（因为以太坊状态子树的不规则结构，我们预计将有可能进行一些修改，特别是一些经常用到的合约，但我们希望尽量减少这种情况）。

## 有向无环图世代 {#dag-generation}

以下算法代码将在 Python 中定义。 首先，我们定义了 `encode_int`，用于将指定精度的无符号整数封送为字符串。 同时还定义了它的逆函数。

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

接下来我们假设 `sha3` 是一个需要输入整数，然后输出整数的函数，而 `dbl_sha3` 是一个 double-sha3 函数；如果将此引用代码转换为实现，使用以下代码：

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

### 参数 {#parameters}

该算法使用的参数有：

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

`P` 在这种情况下为优先选择，因此 `log₂(P)` 仅略小于 512。512 对应于我们用来代表我们数目的 512 字节。 请注意，实际上只需要存储有向无环图的后半部分，因此，实际内存要求最初为 1 GB，每年增长 441 MB。

### Dagger 建图 {#dagger-graph-building}

Dagger 建图基本式的定义如下：

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

基本上，建图从单个节点 `sha3(seed)` 开始，然后根据随机的先前节点按顺序添加到其他节点上。 创建一个新的节点后，将计算种子的模块化能力，以随机选择一些小于 `i` 的索引（使用上述 `x % i`），并且使用这些索引上的节点值进行计算，以产生新的 `x` 值，随后该值被提供给一个小的工作量证明函数（基于 XOR），最终在索引 `i` 生成图值。 这种特殊设计背后的基本原理是强制按顺序访问有向无环图。如果当前值未知，则无法确定要访问的下一个有向无环图的值。 最后，模幂运算会使结果更加恶化。

这种算法依赖于数字理论的若干结果。 讨论情况见下文附录。

## 轻量级客户端评估 {#light-client-evaluation}

上述构图旨在实现图中每个节点的重构，只计算少量节点的子树，并且仅需少量的辅助内存。 请注意，当 k=1 时，子树只是一个上升到有向无环图第一个元素的值链。

轻量级客户端中，有向无环图的计算函数如下：

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

本质上，它只是对上述算法的重写，删除了计算整个有向无环图值的循环，并用递归调用或缓存查找替换了早期的节点查找。 请注意，对于 `k=1` 的情况，缓存是不必要的，尽管进一步的优化实际上预先计算了有向无环图的前几千个值，并将其作为静态缓存进行计算；有关此代码实现，请参见附录。

## 有向无环图的双倍缓冲 {#double-buffer}

在完整客户端中，使用了上述公式生成的 2 个有向无环图的[_双倍缓冲_](https://wikipedia.org/wiki/Multiple_buffering)。 具体概念是，根据上述参数，每个 `epochtime` 生成一个有向无环图。 但客户端使用的并非是最新生成的有向无环图，而是前一个。 这样做的好处是，有向无环图可以随着时间的推移而被替换掉，无需包含矿工必须突然重新计算所有数据的步骤。 否则，定期的链处理可能会突然暂时放缓，并大幅提高中心化程度。 因此，在重新计算所有数据之前的几分钟时间内，存在 51% 的攻击风险。

要生成用于块工作计算的有向无环图集，算法如下：

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

## Hashimoto {#hashimoto}

初始 Hashimoto 旨在将区块链用作数据集，执行从区块链中选择 N 个索引的计算，收集这些索引处的交易，对这些数据执行 XOR，并返回结果哈希值。 Thaddeus Dryja 的初始算法（为了保持一致性，被转化成 Python），具体如下：

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

不幸的是，虽然 Hashimoto 被视为内存硬件，但它依靠的是 256 位计算，计算量非常之大。 然而，Dagger-Hashimoto 在索引其数据集时仅使用最低有效 64 位来解决此问题。

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

使用双 SHA3 可以实现零数据、近乎即时的预验证，仅验证是否提供了正确的中间值。 此工作量证明的外层对专用集成电路高度友好且相当薄弱，但它的存在使分布式拒绝服务变得更加困难，因为必须完成少量工作才能生成不会立即被拒绝的区块。 以下为轻量级客户端版本：

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## 挖矿与验证 {#mining-and-verifying}

现在，将它们全部整合到挖矿算法中：

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

以下为验证算法：

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

轻量级客户端的友好验证：

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

另外，请注意 Dagger-Hashimoto 对区块头有着额外的要求：

- 为了使双层验证起效，区块头必须同时具有随机数和中间值 pre-sha3
- 在某处，区块头必须存储当前种子集的 sha3

## 延伸阅读 {#further-reading}

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_

## 附录 {#appendix}

如前所述，用于生成有向无环图的随机数生成依赖于数论的一些结果。 Lehmer 随机数生成程序是 `picker` 变量的基础，因此我们首先确保它具有很宽的周期。 其次，只要一开始 `x ∈ [2,P-2]`，我们便能证明 `pow(x,3,P)` 不会将 `x` 映射到 `1` 或 `P-1`。 最后，我们证明 `pow(x,3,P)` 在被视为散列函数时具有较低的冲突率。

### Lehmer 随机数生成程序 {#lehmer-random-number}

虽然 `produce_dag` 函数不需要生成无偏随机数，但潜在的威胁是 `seed**i % P` 只取少数几个值。 这可以为矿工识别模式提供优势。

为了避免这种情况，可采用数论结果。 [_安全素数_](https://en.wikipedia.org/wiki/Safe_prime)定义为素数 `P`，从而 `(P-1)/2` 也是素数。 [乘数组](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n)中 `x` 的_顺序_ （乘数组 `ℤ/nℤ`）定义为最小 `m`，以使 <pre>xᵐ mod P ≡ 1</pre>
鉴于这些定义，我们得到：

> 观察 1。 令 `x` 成为乘法组 `ℤ/Pℤ` 的一员，以获得安全素数 `P`。 如果 `x mod P ≠ 1 mod P` 和 `x mod P ≠ P-1 mod P`，那么 `x` 的顺序是 ` P-1` 或 `(P-1)/2`。

_证明_。 由于 `P` 是一个安全素数，那么根据 \[Lagrange's Theorem\]\[lagrange\]，我们得到 `x` 的顺序为 `1`、`2`、`(P-1)/2` 或 `P-1`。

`x` 的顺序不能是 `1`，因为根据费马小定理，我们得出：

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

因此，`x` 必须是 `ℤ/nℤ` 的乘法单位，并且是唯一的乘法单位。 由于我们假设 `x ≠ 1`，所以这是不可能的。

`x` 的顺序不能是 `2`，除非 `x = P-1`，因为这将违反 `P` 是素数的事实。

从以上命题中，我们可以知道，迭代 `(picker * init) % P` 的循环长度至少为 `(P-1)/2`。 这是因为我们选择 `P` 作为安全素数，强度几乎翻倍，且 `init` 处于 `[2,2**256+1]` 区间内。 考虑到 `P` 的量级，我们不应期待模幂运算具有周期性。

在有向无环图中分配第一个单元时（变量标签为 `init`），我们会计算 `pow(sha3(seed) + 2, 3, P)`。 初看起来，这并不能保证结果既不是 `1` 也不是 `P-1`。 然而，既然 `P-1` 是一个安全素数，我们还提供以下额外保证，这是观察 1 的必然结果：

> 观察 2。 令 `x` 成为乘法组 `ℤ/Pℤ` 的一员，以获得安全素数 `P`，并让 `w` 成为自然数。 如果 `x mod P ≠ 1 mod P`、`x mod P ≠ P-1 mod P`，且 `w mod P ≠ P-1 mod P`、`w mod P ≠ 0 mod P`，那么 `xʷ mod P ≠ 1 mod P` 且 `xʷ mod P ≠ P-1 mod P`

### 模幂运算用作散列函数 {#modular-exponentiation}

对于特定的 `P` 值和 `w` 值，函数 `pow(x, w, P)` 可能存在许多冲突。 例如，`pow(x,9,19)` 的值只能接受 `{1,18}`。

鉴于 `P` 为素数，可以使用以下结果，选择一个用于模幂运算哈希函数的适当 `w` 值：

> 观察 3。 令 `P` 为素数；当且仅当用于 `ℤ/Pℤ` 中所有 `a` 和 `b` 满足以下条件时，`w` 和 `P-1` 才能为互素。
> 
> <center>
>   `aʷ mod P ≡ bʷ mod P`，当且仅当 `a mod P ≡ b mod P`
> </center>

因此，鉴于 `P` 为素数，且 `w` 与 `P-1` 为互素，我们得出 `|{pow(x, w, P) : x ∈ ℤ}| = P`，表示散列函数具有尽可能小的冲突率。

在特殊情况下，`P` 是我们选择的安全素数，那么 `P-1` 仅有系数 1、2、`(P-1)/2` 和 `P-1`。 由于 `P` > 7，我们知道 3 与 `P-1` 互素，因此 `w=3` 满足上述命题。

## 更有效的缓存评估算法 {#cache-based-evaluation}

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
