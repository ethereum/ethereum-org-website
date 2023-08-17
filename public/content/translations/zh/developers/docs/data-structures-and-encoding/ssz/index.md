---
title: 简单序列化
description: 以太坊简单序列化 (SSZ) 格式的说明。
lang: zh
sidebarDepth: 2
---

**简单序列化 (SSZ)** 是信标链上使用的序列化方法。 这种方法取代了除对等点发现协议以外的共识层各处执行层上所用的递归长度前缀序列化。 简单序列化设计具有确定性，也可以有效地进行默克尔化。 可以认为，简单序列化有两个组成部分：序列化方案和默克尔化方案，后者设计用于有效地处理序列化数据结构。

## 简单序列化的工作原理 {#how-does-ssz-work}

### 序列化 {#serialization}

简单序列化是一种非自描述性序列化方案，依赖于必须提前知晓的方案。 简单序列化的目标是将任意复杂度的对象用字节串表示。 对于“基本类型”来说，这是一个非常简单的过程， 只需将元素转换为十六进制字节。 基本类型包括：

- 无符号整数
- 布尔值

对于复杂的“复合”类型，序列化更加复杂，因为复合类型包含多个可能具有不同类型或不同大小或两者兼有的元素。 在这些对象都具有固定长度的情况下(即元素的大小将始终保持不变，而与它们的实际值无关)，序列化只是将复合类型中的每个元素转换为小端字节串。 这些字节串会连接在一起。 序列化对象用字节列表表示，列表中的元素具有固定长度，它们的排列顺序与在反序列化对象中的顺序相同。

对于具有可变长度的类型，实际数据将被序列化对象中该元素位置的“偏移”值替换。 实际数据会添加到序列化对象末尾的堆中。 偏移值是堆中实际数据开始的索引，充当指向相关字节的指针。

下面的示例说明了偏移如何用于具有固定和可变长度元素的容器：

```Rust

    struct Dummy {

        number1: u64,
        number2: u64,
        vector: Vec<u8>,
        number3: u64
    }

    dummy = Dummy{

        number1: 37,
        number2: 55,
        vector: vec![1,2,3,4],
        number3: 22,
    }

    serialized = ssz.serialize(dummy)

```

`serialized` 将具有以下结构（此处仅填充到 4 位，实际上填充到 32 位，并保留 `int` 表示，以确保清晰明确）：

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset for    number 3    value for
                              vector                   vector

```

为了清楚起见，分成几行：

```
[
  37, 0, 0, 0,  # little-endian encoding of `number1`.
  55, 0, 0, 0,  # little-endian encoding of `number2`.
  16, 0, 0, 0,  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  22, 0, 0, 0,  # little-endian encoding of `number3`.
  1, 2, 3, 4,   # The actual values in `vector`.
]
```

这仍然是简化版，上图中的整数和零实际上将存储在字节列表中，如下所示：

```
[
  10100101000000000000000000000000  # little-endian encoding of `number1`
  10110111000000000000000000000000  # little-endian encoding of `number2`.
  10010000000000000000000000000000  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  10010110000000000000000000000000  # little-endian encoding of `number3`.
  10000001100000101000001110000100   # The actual value of the `bytes` field.
]
```

因此，可变长度类型的实际值存储在序列化对象末尾的堆中，它们的偏移量则存储在有序字段列表中的正确位置。

还有一些特殊情况需要特殊处理，比如 `BitList` 类型需要在序列化过程中添加长度上限，并在反序列化过程中移除该上限。 [简单序列化规范](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md)中提供了完整的详细信息。

### 反序列化 {#deserialization}

反序列化此对象需要一个<b>方案</b>。 方案需定义序列化数据的精确布局，以便每个特定元素都可以从一组字节反序列化为一些有意义的对象，其中元素具有正确的类型、值、大小和位置。 正是方案告诉反序列化程序哪些值是实际值，哪些是偏移值。 当对象被序列化时，所有字段名称都会消失，但会根据方案在反序列化时重新实例化。

请参阅 [ssz.dev](https://www.ssz.dev/overview) 了解有关此主题的交互式说明。

## 默克尔化 {#merkleization}

之后可以对这个简单序列化对象进行默克尔化，即转而用默克尔树表示相同的数据。 首先，确定序列化对象中 32 字节块的数量， 这些是树的“叶子”。 叶子总数必须是 2 的幂，以便将叶子散列在一起，最终生成一个哈希树根。 如果情况并非如此，则会增加包含 32 字节零的额外叶子。 如图所示：

```
        hash tree root
            /     \
           /       \
          /         \
         /           \
   hash of leaves  hash of leaves
     1 and 2         3 and 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 leaf1     leaf2  leaf3     leaf4
```

在某些情况下，树的叶子不会像上面示例中那样自然均匀地分布。 例如，叶子 4 可能是一个包含多个元素的容器，需要向默克尔树添加额外的“深度”，从而形成不均匀的树。

与其将这些树元素称为叶子 X、节点 X 等，我们可以给它们赋予广义索引，从根 = 1 开始，沿着每个级别从左到右计数。 这即是前述广义索引。 序列化列表中的每个元素都有一个等于 `2**depth + idx` 的广义索引，其中 idx 是其在序列化对象中的零索引位置，深度是默克尔树中的层数，可以确定为元素（叶子）数量的平方根。

## 广义索引 {#generalized-indices}

广义索引是一个整数，表示二元默克尔树中的一个节点，其中每个节点都有一个广义索引 `2 ** depth + index in row`。

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

这种表示为默克尔树中的每条数据生成一个节点索引。

## 多值证明 {#multiproofs}

提供表示特定元素的广义索引列表使我们可以对照哈希树根来对其进行验证。 这个根是我们接受的现实版本， 我们提供的任何数据都可以对照现实进行验证，方法是将其插入默克尔树中的正确位置（由其广义索引确定），然后观察根是否保持不变。 请参阅[此处](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs)的规范，其中一些函数展示了如何计算验证一组特定广义索引的内容所需的最小节点集。

例如，要验证下面树中索引 9 中的数据，我们需要索引 8、9、5、3、1 处数据的哈希值。 (8,9) 的哈希值应该等于哈希值 (4)，它与 5 进行哈希计算可生成 2，与 3 进行哈希计算可生成树根 1。 如果为 9 提供了不正确的数据，根会发生改变，我们会检测到这一问题，从而无法验证分支。

```
* = 生成证明所需的数据

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## 延伸阅读 {#further-reading}

- [升级以太坊：简单序列化](https://eth2book.info/altair/part2/building_blocks/ssz)
- [升级以太坊：默克尔化](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [简单序列化实现](https://github.com/ethereum/consensus-specs/issues/2138)
- [简单序列化计算器](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
