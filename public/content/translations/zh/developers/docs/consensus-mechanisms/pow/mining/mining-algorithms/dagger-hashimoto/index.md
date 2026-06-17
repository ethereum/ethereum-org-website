---
title: Dagger-Hashimoto
description: "深入了解 Dagger-Hashimoto 算法。"
lang: zh
---

Dagger-Hashimoto 是以太坊挖矿算法的最初研究实现和规范。Dagger-Hashimoto 被 [Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash) 取代。2022 年 9 月 15 日，在[合并](/roadmap/merge/)时，挖矿被完全关闭。从那时起，以太坊转而使用[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos)机制来保障安全。本页面仅供历史参考——此处的信息不再适用于合并后的以太坊。

## 先决条件 {#prerequisites}

为了更好地理解本页面，我们建议您首先阅读[工作量证明 (PoW) 共识](/developers/docs/consensus-mechanisms/pow)、[挖矿](/developers/docs/consensus-mechanisms/pow/mining)以及[挖矿算法](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms)。

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto 旨在实现两个目标：

1.  **抗 ASIC**：为该算法创建专用硬件所带来的收益应尽可能小
2.  **轻客户端可验证性**：轻客户端应能高效地验证区块。

通过额外的修改，我们还说明了如何在需要时实现第三个目标，但这会增加额外的复杂性：

**全链存储**：挖矿应要求存储完整的区块链状态（由于以太坊状态树的不规则结构，我们预计可以进行一些修剪，特别是针对一些常用合约，但我们希望尽量减少这种情况）。

## DAG 生成 {#dag-generation}

该算法的代码将在下面用 Python 定义。首先，我们提供 `encode_int`，用于将指定精度的无符号整数编组为字符串。同时也给出了它的逆运算：

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

接下来，我们假设 `sha3` 是一个接受整数并输出整数的函数，而 `dbl_sha3` 是一个双重 SHA-3 函数；如果将此参考代码转换为实现，请使用：

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

该算法使用的参数如下：

```python
SAFE_PRIME_512 = 2**512 - 38117     # 小于 2**512 的最大安全素数

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # 数据集的大小（4 GB）；必须是 65536 的倍数
      "n_inc": 65536,                   # 每个周期 n 值的增量；必须是 65536 的倍数
                                        # 当 epochtime=20000 时，每年增长 882 MB
      "cache_size": 2500,               # 轻客户端缓存的大小（可由轻
                                        # 客户端选择；不属于算法规范的一部分）
      "diff": 2**14,                    # 难度（在区块评估期间调整）
      "epochtime": 100000,              # 以区块为单位的 epoch 长度（数据集更新的频率）
      "k": 1,                           # 一个节点的父节点数量
      "w": w,                          # 用于模幂哈希处理
      "accesses": 200,                  # hashimoto 期间的数据集访问次数
      "P": SAFE_PRIME_512               # 用于哈希处理和随机数生成的安全素数
}
```

在这种情况下，`P` 是一个被选定的素数，使得 `log₂(P)` 略小于 512，这对应于我们一直用来表示数字的 512 位。请注意，实际上只需要存储 DAG 的后半部分，因此实际的 RAM 需求从 1 GB 开始，并以每年 441 MB 的速度增长。

### Dagger 图构建 {#dagger-graph-building}

Dagger 图构建原语定义如下：

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

本质上，它从一个单节点 `sha3(seed)` 开始构建图，然后基于随机的先前节点依次添加其他节点。创建新节点时，会计算种子的模幂，以随机选择一些小于 `i` 的索引（使用上面的 `x % i`），并将这些索引处的节点值用于计算，从而为 `x` 生成一个新值，然后将其输入到一个小型工作量证明函数（基于 XOR）中，最终生成图在索引 `i` 处的值。这种特定设计背后的基本原理是强制对 DAG 进行顺序访问；在知道当前值之前，无法确定将要访问的 DAG 的下一个值。最后，模幂运算对结果进行进一步的哈希处理。

该算法依赖于数论中的几个结果。有关讨论，请参见下面的附录。

## 轻客户端评估 {#light-client-evaluation}

上述图构建旨在允许通过仅计算少量节点的子树并仅需要少量辅助内存来重建图中的每个节点。请注意，当 k=1 时，子树只是一个向上延伸到 DAG 中第一个元素的值链。

DAG 的轻客户端计算函数工作原理如下：

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

本质上，它只是上述算法的重写，删除了计算整个 DAG 值的循环，并将早期的节点查找替换为递归调用或缓存查找。请注意，对于 `k=1`，缓存是不必要的，尽管进一步的优化实际上预先计算了 DAG 的前几千个值，并将其作为计算的静态缓存保留；有关此代码实现，请参见附录。

## DAG 的双缓冲 {#double-buffer}

在全节点客户端中，使用了由上述公式生成的 2 个 DAG 的[双缓冲 (double buffer)](https://wikipedia.org/wiki/Multiple_buffering)。其理念是，根据上述参数，每隔 `epochtime` 个区块生成一次 DAG。客户端不使用最新生成的 DAG，而是使用前一个 DAG。这样做的好处是，它允许随着时间的推移替换 DAG，而无需引入矿工必须突然重新计算所有数据的步骤。否则，可能会在固定时间间隔内出现链处理突然暂时变慢的情况，并急剧增加中心化程度。从而在重新计算所有数据之前的几分钟内带来 51%攻击风险。

用于生成计算区块工作量所需 DAG 集合的算法如下：

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
        # 不可能有后备缓冲区，只需创建前置缓冲区
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

最初 Hashimoto 算法背后的理念是将区块链用作数据集，执行一项计算：从区块链中选择 N 个索引，收集这些索引处的交易，对这些数据执行 XOR 运算，并返回结果的哈希。Thaddeus Dryja 的原始算法（为保持一致性已转换为 Python）如下：

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

不幸的是，虽然 Hashimoto 被认为是内存困难 (RAM hard) 的，但它依赖于 256 位算术，这具有相当大的计算开销。然而，Dagger-Hashimoto 在索引其数据集时仅使用最低有效 64 位来解决此问题。

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

双重 SHA-3 的使用允许一种零数据、近乎即时的预验证形式，仅验证是否提供了正确的中间值。这一外层工作量证明非常适合 ASIC 且相当薄弱，但它的存在是为了使 DDoS 攻击变得更加困难，因为必须完成少量工作才能生成不会被立即拒绝的区块。以下是轻客户端版本：

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## 挖矿与验证 {#mining-and-verifying}

现在，让我们将所有内容整合到挖矿算法中：

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

以下是验证算法：

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

对轻客户端友好的验证：

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

此外，请注意 Dagger-Hashimoto 对区块头施加了额外要求：

- 为了使双层验证起作用，区块头必须同时具有随机数和 SHA-3 之前的中间值
- 区块头必须在某处存储当前种子集的 SHA-3 哈希

## 延伸阅读 {#further-reading}

_知道对您有帮助的社区资源吗？编辑本页面并添加它！_

## 附录 {#appendix}

如上所述，用于 DAG 生成的随机数生成器 (RNG) 依赖于数论中的一些结果。首先，我们保证作为 `picker` 变量基础的 Lehmer RNG 具有很长的周期。其次，我们证明，如果以 `x ∈ [2,P-2]` 开始，`pow(x,3,P)` 不会将 `x` 映射到 `1` 或 `P-1`。最后，我们证明当 `pow(x,3,P)` 被视为哈希函数时，其碰撞率很低。

### Lehmer 随机数生成器 {#lehmer-random-number}

虽然 `produce_dag` 函数不需要生成无偏随机数，但一个潜在的威胁是 `seed**i % P` 只能取少数几个值。这可能会给识别出该模式的矿工带来优势，而未识别出的矿工则处于劣势。

为了避免这种情况，我们求助于数论中的一个结果。[_安全素数 (Safe Prime)_](https://en.wikipedia.org/wiki/Safe_prime) 定义为一个素数 `P`，使得 `(P-1)/2` 也是素数。[乘法群](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` 的成员 `x` 的_阶 (order)_ 定义为满足以下条件的最小 `m`：<pre>xᵐ mod P ≡ 1</pre>
基于这些定义，我们得出：

> 观察 1。设 `x` 为安全素数 `P` 的乘法群 `ℤ/Pℤ` 的成员。如果 `x mod P ≠ 1 mod P` 且 `x mod P ≠ P-1 mod P`，则 `x` 的阶要么是 `P-1`，要么是 `(P-1)/2`。

_证明_。由于 `P` 是安全素数，根据[拉格朗日定理][lagrange]，我们得出 `x` 的阶要么是 `1`、`2`、`(P-1)/2`，要么是 `P-1`。

`x` 的阶不能是 `1`，因为根据费马小定理，我们有：

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

因此 `x` 必须是 `ℤ/nℤ` 的乘法单位元，这是唯一的。由于我们假设 `x ≠ 1`，这是不可能的。

除非 `x = P-1`，否则 `x` 的阶不能是 `2`，因为这会违反 `P` 是素数的前提。

从上述命题中，我们可以认识到迭代 `(picker * init) % P` 的循环长度至少为 `(P-1)/2`。这是因为我们选择 `P` 作为一个近似等于 2 的较高次幂的安全素数，并且 `init` 在区间 `[2,2**256+1]` 内。考虑到 `P` 的量级，我们绝不应期望模幂运算会出现循环。

当我们分配 DAG 中的第一个单元格（标记为 `init` 的变量）时，我们计算 `pow(sha3(seed) + 2, 3, P)`。乍一看，这并不能保证结果既不是 `1` 也不是 `P-1`。然而，由于 `P-1` 是安全素数，我们有以下额外保证，这是观察 1 的推论：

> 观察 2。设 `x` 为安全素数 `P` 的乘法群 `ℤ/Pℤ` 的成员，并设 `w` 为自然数。如果 `x mod P ≠ 1 mod P` 且 `x mod P ≠ P-1 mod P`，以及 `w mod P ≠ P-1 mod P` 且 `w mod P ≠ 0 mod P`，则 `xʷ mod P ≠ 1 mod P` 且 `xʷ mod P ≠ P-1 mod P`

### 模幂运算作为哈希函数 {#modular-exponentiation}

对于 `P` 和 `w` 的某些值，函数 `pow(x, w, P)` 可能会有许多碰撞。例如，`pow(x,9,19)` 只能取值 `{1,18}`。

鉴于 `P` 是素数，可以使用以下结果为模幂哈希函数选择合适的 `w`：

> 观察 3。设 `P` 为素数；`w` 和 `P-1` 互素，当且仅当对于 `ℤ/Pℤ` 中的所有 `a` 和 `b`：<center>`aʷ mod P ≡ bʷ mod P` 当且仅当 `a mod P ≡ b mod P`</center>

因此，鉴于 `P` 是素数且 `w` 与 `P-1` 互素，我们得出 `|{pow(x, w, P) : x ∈ ℤ}| = P`，这意味着该哈希函数具有尽可能低的碰撞率。

在我们选择的 `P` 为安全素数的特殊情况下，`P-1` 只有因子 1、2、`(P-1)/2` 和 `P-1`。由于 `P` > 7，我们知道 3 与 `P-1` 互素，因此 `w=3` 满足上述命题。

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