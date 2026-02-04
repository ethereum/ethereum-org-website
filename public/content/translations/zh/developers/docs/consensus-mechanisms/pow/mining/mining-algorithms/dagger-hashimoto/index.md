---
title: Dagger-Hashimoto
description: "详细了解 Dagger-Hashimoto 算法。"
lang: zh
---

Dagger-Hashimoto 是以太坊挖矿算法的原始研究实现和规范。 Dagger-Hashimoto 已被 [Ethash](#ethash) 取代。 2022 年 9 月 15 日[合并](/roadmap/merge/)后，挖矿已完全停止。 此后，以太坊转而使用[权益证明](/developers/docs/consensus-mechanisms/pos)机制来保障安全。 本页面展示与历史有关的内容，其中的信息不再与合并后的以太坊相关。

## 前提条件 {#prerequisites}

为了更好地理解本页内容，我们建议您首先阅读有关[工作量证明共识](/developers/docs/consensus-mechanisms/pow)、[挖矿](/developers/docs/consensus-mechanisms/pow/mining)和[挖矿算法](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms)的资料。

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto 旨在实现两个目标：

1. **抗 ASIC 性**：为该算法创建专用硬件的好处应尽可能小
2. **轻客户端可验证性**：区块应能由轻客户端高效验证。

在作出进一步修改后，我们还要具体说明如何在必要时实现第三个目标，但要以增加复杂性为代价：

**全链存储**：挖矿应要求存储完整的区块链状态（由于以太坊状态树的结构不规则，我们预计可以进行一些修剪，特别是一些常用合约，但我们希望将其最小化）。

## DAG 生成 {#dag-generation}

以下算法代码将在 Python 中定义。 首先，我们给出 `encode_int`，用于将指定精度的无符号整数封送为字符串。 同时还定义了它的逆函数。

```python
NUM_BITS = 512

def encode_int(x):
    "使用大端方案将整数 x 编码为 64 个字符的字符串"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "使用大端方案从字符串中解码整数 x"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

接下来我们假设 `sha3` 是一个接收整数并输出整数的函数，而 `dbl_sha3` 是一个 double-sha3 函数；如果要将此参考代码转换为实现，请使用：

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
SAFE_PRIME_512 = 2**512 - 38117     # 小于 2**512 的最大安全素数

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # 数据集的大小（4 GB）；必须是 65536 的倍数
      "n_inc": 65536,                   # 每个时段的 n 值增量；必须是 65536 的倍数
                                        # epochtime=20000 时，每年增长 882 MB
      "cache_size": 2500,               # 轻客户端的缓存大小（可由轻客户端选择；
                                        # 不属于算法规范）
      "diff": 2**14,                    # 难度（在区块评估期间调整）
      "epochtime": 100000,              # 一个时段的区块长度（数据集的更新频率）
      "k": 1,                           # 节点的父节点数量
      "w": w,                           # 用于模幂哈希
      "accesses": 200,                  # hashimoto 期间的数据集访问次数
      "P": SAFE_PRIME_512               # 用于哈希和随机数生成的安全素数
}
```

在这种情况下，`P` 是一个质数，其选择要使 `log₂(P)` 略小于 512，这对应于我们一直用来表示数字的 512 位。 请注意，实际上只需要存储有向无环图的后半部分，因此，实际内存要求最初为 1 GB，每年增长 441 MB。

### Dagger 图构建 {#dagger-graph-building}

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

本质上，它以单个节点 `sha3(seed)` 启动一个图，然后从那里开始，根据随机的先前节点顺序添加其他节点。 当创建一个新节点时，会计算种子的模幂，以随机选择一些小于 `i` 的索引（使用上面的 `x % i`），然后使用这些索引处节点的值进行计算，以生成新的 `x` 值，该值再被送入一个小的（基于 XOR 的）工作量证明函数，最终生成索引为 `i` 的图值。 这种特殊设计背后的基本原理是强制按顺序访问有向无环图。如果当前值未知，则无法确定要访问的下一个有向无环图的值。 最后，模幂运算会使结果更加恶化。

这种算法依赖于数字理论的若干结果。 讨论情况见下文附录。

## 轻客户端评估 {#light-client-evaluation}

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

本质上，它只是对上述算法的重写，删除了计算整个有向无环图值的循环，并用递归调用或缓存查找替换了早期的节点查找。 请注意，对于 `k=1` 的情况，缓存是不必要的，尽管进一步的优化实际上预先计算了 DAG 的前几千个值，并将其作为静态缓存进行计算；有关此代码的实现，请参见附录。

## DAG 的双缓冲 {#double-buffer}

在全客户端中，会使用由上述公式生成的 2 个 DAG 的[_双缓冲_](https://wikipedia.org/wiki/Multiple_buffering)。 其思想是，根据上述参数，每隔 `epochtime` 个区块就会生成一个 DAG。 但客户端使用的并非是最新生成的有向无环图，而是前一个。 这样做的好处是，有向无环图可以随着时间的推移而被替换掉，无需包含矿工必须突然重新计算所有数据的步骤。 否则，定期的链处理可能会突然暂时放缓，并大幅提高中心化程度。 因此，在重新计算所有数据之前的几分钟时间内，存在 51% 的攻击风险。

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
        # 无法使用后向缓冲，仅创建前向缓冲
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

## 挖矿和验证 {#mining-and-verifying}

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

## 扩展阅读{#further-reading}

_你还知道哪些对你有帮助的社区资源？ 请编辑本页面并添加进来！_

## 附录 {#appendix}

如前所述，用于生成有向无环图的随机数生成依赖于数论的一些结果。 首先，我们保证作为 `picker` 变量基础的 Lehmer RNG 具有很长的周期。 其次，我们证明只要 `x ∈ [2,P-2]`，`pow(x,3,P)` 就不会将 `x` 映射到 `1` 或 `P-1`。 最后，我们证明当 `pow(x,3,P)` 被当作哈希函数时，其冲突率很低。

### Lehmer 随机数生成器 {#lehmer-random-number}

虽然 `produce_dag` 函数不需要生成无偏随机数，但一个潜在的威胁是 `seed**i % P` 只会取少数几个值。 这可以为矿工识别模式提供优势。

为了避免这种情况，可采用数论结果。 [_安全素数_](https://en.wikipedia.org/wiki/Safe_prime) 定义为素数 `P`，其中 `(P-1)/2` 也是素数。 [乘法群](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` 的成员 `x` 的_阶_定义为最小的 `m`，使得 <pre>xᵐ mod P ≡ 1</pre>
根据这些定义，我们有：

> 观察 1。 设 `x` 是乘法群 `ℤ/Pℤ` 的一个成员，其中 `P` 是一个安全素数。 如果 `x mod P ≠ 1 mod P` 且 `x mod P ≠ P-1 mod P`，那么 `x` 的阶是 `P-1` 或 `(P-1)/2`。

_证明_。 由于 `P` 是一个安全素数，那么根据[拉格朗日定理][lagrange]，我们可知 `x` 的阶是 `1`、`2`、`(P-1)/2` 或 `P-1`。

`x` 的阶不可能是 `1`，因为根据费马小定理，我们有：

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

因此，`x` 必须是 `ℤ/nℤ` 的乘法单位元，而乘法单位元是唯一的。 由于我们已经假设 `x ≠ 1`，所以这是不可能的。

`x` 的阶不可能是 `2`，除非 `x = P-1`，因为这将违背 `P` 是素数这一事实。

从以上命题中，我们可以认识到，迭代 `(picker * init) % P` 的循环长度至少为 `(P-1)/2`。 这是因为我们选择的 `P` 是一个安全素数，约等于 2 的一个较高次幂，并且 `init` 在区间 `[2,2**256+1]` 内。 考虑到 `P` 的数量级，我们不应该期望模幂运算会出现循环。

在分配 DAG 中的第一个单元格（标记为 `init` 的变量）时，我们计算 `pow(sha3(seed) + 2, 3, P)`。 乍一看，这并不能保证结果既不是 `1` 也不是 `P-1`。 然而，由于 `P-1` 是一个安全素数，我们有以下额外的保证，这是观察 1 的一个推论：

> 观察 2。 设 `x` 是乘法群 `ℤ/Pℤ` 的一个成员（其中 `P` 是一个安全素数），并设 `w` 是一个自然数。 如果 `x mod P ≠ 1 mod P` 且 `x mod P ≠ P-1 mod P`，并且 `w mod P ≠ P-1 mod P` 且 `w mod P ≠ 0 mod P`，那么 `xʷ mod P ≠ 1 mod P` 且 `xʷ mod P ≠ P-1 mod P`

### 作为哈希函数的模幂运算 {#modular-exponentiation}

对于 `P` 和 `w` 的某些值，函数 `pow(x, w, P)` 可能会有很多冲突。 例如，`pow(x,9,19)` 只取 `{1,18}` 这几个值。

鉴于 `P` 是素数，可以使用以下结果为模幂哈希函数选择一个合适的 `w`：

> 观察 3。 设 `P` 是一个素数；`w` 和 `P-1` 互素，当且仅当对于 `ℤ/Pℤ` 中的所有 `a` 和 `b`：<center>`aʷ mod P ≡ bʷ mod P` 当且仅当 `a mod P ≡ b mod P`</center>

因此，鉴于 `P` 是素数且 `w` 与 `P-1` 互素，我们有 `|{pow(x, w, P) : x ∈ ℤ}| = P`，这意味着该哈希函数具有最小的可能冲突率。

在我们所选的 `P` 是安全素数的特殊情况下，`P-1` 仅有因子 1、2、`(P-1)/2` 和 `P-1`。 由于 `P` > 7，我们知道 3 与 `P-1` 互素，因此 `w=3` 满足上述命题。

## 更高效的基于缓存的评估算法 {#cache-based-evaluation}

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
