---
title: 递归长度前缀 (RLP) 序列化
description: 以太坊执行层中 RLP 编码的定义。
lang: zh
sidebarDepth: 2
---

递归长度前缀 (RLP) 序列化在以太坊执行客户端中被广泛使用。RLP 以一种节省空间的格式标准化了节点之间的数据传输。RLP 的目的是对任意嵌套的二进制数据数组进行编码，并且 RLP 是以太坊执行层中用于序列化对象的主要编码方法。RLP 的主要目的是对结构进行编码；除了正整数之外，RLP 将特定数据类型（例如字符串、浮点数）的编码委托给高阶协议。正整数必须以没有前导零的大端序二进制形式表示（因此使整数值零等同于空字节数组）。任何使用 RLP 的高阶协议都必须将带有前导零的反序列化正整数视为无效。

更多信息请参见[以太坊黄皮书（附录 B）](https://ethereum.github.io/yellowpaper/paper.pdf#page=19)。

要使用 RLP 对字典进行编码，建议的两种规范形式是：

- 使用 `[[k1,v1],[k2,v2]...]`，键按字典序排列
- 像[以太坊](/)那样使用更高层级的帕特里夏树 (Patricia Tree) 编码

## 定义 {#definition}

RLP 编码函数接受一个项目 (item)。项目的定义如下：

- 字符串（即字节数组）是一个项目
- 项目列表是一个项目
- 正整数是一个项目

例如，以下所有都是项目：

- 空字符串；
- 包含单词 "cat" 的字符串；
- 包含任意数量字符串的列表；
- 以及更复杂的数据结构，如 `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`。
- 数字 `100`

请注意，在本页其余部分的上下文中，“字符串”指的是“一定数量字节的二进制数据”；不使用特殊的编码，也不暗示关于字符串内容的任何知识（除非反对非最小正整数的规则有要求）。

RLP 编码定义如下：

- 对于正整数，它被转换为大端序解释为该整数的最短字节数组，然后根据以下规则编码为字符串。
- 对于值在 `[0x00, 0x7f]`（十进制 `[0, 127]`）范围内的单字节，该字节本身就是其 RLP 编码。
- 否则，如果字符串长度为 0-55 字节，则 RLP 编码由一个值为 **0x80**（十进制 128）加上字符串长度的单字节，后跟字符串本身组成。因此，第一个字节的范围是 `[0x80, 0xb7]`（十进制 `[128, 183]`）。
- 如果字符串长度超过 55 字节，则 RLP 编码由一个值为 **0xb7**（十进制 183）加上字符串长度的二进制形式的字节长度的单字节，后跟字符串的长度，再后跟字符串本身组成。例如，一个 1024 字节长的字符串将被编码为 `\xb9\x04\x00`（十进制 `185, 4, 0`）后跟该字符串。这里，`0xb9`（183 + 2 = 185）作为第一个字节，后跟表示实际字符串长度的 2 个字节 `0x0400`（十进制 1024）。因此，第一个字节的范围是 `[0xb8, 0xbf]`（十进制 `[184, 191]`）。
- 如果字符串长度为 2^64 字节或更长，则可能无法对其进行编码。
- 如果列表的总有效载荷（即其所有项目进行 RLP 编码后的组合长度）为 0-55 字节长，则 RLP 编码由一个值为 **0xc0** 加上有效载荷长度的单字节，后跟项目 RLP 编码的拼接组成。因此，第一个字节的范围是 `[0xc0, 0xf7]`（十进制 `[192, 247]`）。
- 如果列表的总有效载荷长度超过 55 字节，则 RLP 编码由一个值为 **0xf7** 加上有效载荷长度的二进制形式的字节长度的单字节，后跟有效载荷的长度，再后跟项目 RLP 编码的拼接组成。因此，第一个字节的范围是 `[0xf8, 0xff]`（十进制 `[248, 255]`）。

简而言之：

| 范围 | 字节 1 | 字节 2 | ... | 字节 9 | 字节 10 | 含义 |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | 单字节字符串                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | 短字符串（0-55 字节）                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | 长字符串，N+1 字节表示长度，然后是有效载荷 |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | 短列表（0-55 字节）                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | 长列表，N+1 字节表示长度，然后是有效载荷 |

- `p` = 有效载荷
- `n` = 长度（有效载荷字节数）
- `N` = 长度的长度偏移量（后跟 N+1 个 `n` 字节）

在代码中，这表示为：

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## 示例 {#examples}

- 字符串 "dog" = [ 0x83, 'd', 'o', 'g' ]
- 列表 [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- 空字符串 ('null') = `[ 0x80 ]`
- 空列表 = `[ 0xc0 ]`
- 整数 0 = `[ 0x80 ]`
- 字节 '\x00' = `[ 0x00 ]`
- 字节 '\x0f' = `[ 0x0f ]`
- 字节 '\x04\x00' = `[ 0x82, 0x04, 0x00 ]`
- 数字 3 的[集合论表示](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers)，`[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- 字符串 "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## RLP 解码 {#rlp-decoding}

根据 RLP 编码的规则和过程，RLP 解码的输入被视为二进制数据数组。RLP 解码过程如下：

1.  根据输入数据的第一个字节（即前缀）并解码数据类型、实际数据的长度和偏移量；

2.  根据数据的类型和偏移量，对数据进行相应的解码，并遵守正整数的最小编码规则；

3.  继续解码输入的其余部分；

其中，解码数据类型和偏移量的规则如下：

1.  如果第一个字节（即前缀）的范围是 [0x00, 0x7f]，则数据是一个字符串，并且该字符串正是第一个字节本身；

2.  如果第一个字节的范围是 [0x80, 0xb7]，则数据是一个字符串，并且长度等于第一个字节减去 0x80 的字符串紧跟在第一个字节之后；

3.  如果第一个字节的范围是 [0xb8, 0xbf]，则数据是一个字符串，并且其字节长度等于第一个字节减去 0xb7 的字符串长度紧跟在第一个字节之后，而字符串本身紧跟在字符串长度之后；

4.  如果第一个字节的范围是 [0xc0, 0xf7]，则数据是一个列表，并且总有效载荷等于第一个字节减去 0xc0 的列表所有项目的 RLP 编码拼接紧跟在第一个字节之后；

5.  如果第一个字节的范围是 [0xf8, 0xff]，则数据是一个列表，并且长度等于第一个字节减去 0xf7 的列表总有效载荷紧跟在第一个字节之后，而列表所有项目的 RLP 编码拼接紧跟在列表的总有效载荷之后；

在代码中，这表示为：

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## 延伸阅读 {#further-reading}

- [以太坊中的 RLP](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [以太坊内部机制：RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## 相关主题 {#related-topics}

- [帕特里夏默克尔前缀树 (Patricia merkle trie)](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)