---
title: 递归长度前缀 (RLP) 序列化
description: 以太坊执行层中递归长度前缀 (RLP) 编码的定义。
lang: zh
sidebarDepth: 2
---

递归长度前缀 (RLP) 序列化广泛用于以太坊的执行客户端。 数据在节点之间以节省空间的格式传输，而递归长度前缀可使这一过程标准化。 递归长度前缀的目的在于，对任意嵌套的二进制数据数组进行编码，而递归长度前缀是用于序列化以太坊执行层中对象的主要编码方法。 递归长度前缀的主要目的是对结构进行编码；除正整数外，递归长度前缀将特定数据类型（例如字符串、浮点数）的编码委托给更高阶协议。 正整数必须以不带前导零的大端二进制形式表示（从而使整数值零相当于空字节数组）。 任何使用递归长度前缀的高阶协议都必须将带前导零的反序列化正整数视为无效。

更多信息请见[以太坊黄皮书（附录 B）](https://ethereum.github.io/yellowpaper/paper.pdf#page=19)。

要使用递归长度前缀对字典进行编码，建议的两种规范形式为：

- 使用 `[[k1,v1],[k2,v2]...]` 加上按字典顺序排列的键
- 像以太坊一样使用更高级别的前缀树编码

## 定义 {#definition}

递归长度前缀编码函数接受一个项目。 该项目的定义如下：

- 一个字符串（即字节数组）是一个项目
- 项目列表也是一个项目
- 正整数是一个项目

例如，以下所有都是项目：

- 空字符串；
- 包含单词“cat”的字符串；
- 包含任意数量字符串的列表；
- 以及更复杂的数据结构，例如 `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`。
- 数字 `100`

请注意，在本页其余部分的上下文中，“字符串”表示“一定数量的二进制数据字节”；不使用特殊编码，并且不隐含任何有关字符串内容的知识（除非针对非最小正整数的规则要求如此）。

递归长度前缀编码的定义如下：

- 对于正整数，将其转换为最短字节数组，其大端解释为整数，然后根据以下规则编码为字符串。
- 对于值在 `[0x00, 0x7f]`（十进制 `[0, 127]`）范围内的单个字节，该字节即是它自己的递归长度前缀编码。
- 否则，如果字符串的长度为 0-55 个字节，则递归长度前缀编码包含一个值为 **0x80**（十进制 128）的单字节，加上该字符串之后字符串的长度。 因此，第一个字节的范围是 `[0x80, 0xb7]`（十进制 `[128, 183]`）。
- 如果字符串的长度超过 55 个字节，则递归长度前缀编码由一个值为 **0xb7**（十进制为 183）的单个字节，加上二进制字符串长度的以字节为单位的长度，后跟字符串的长度，然后是字符串。 例如，一个长 1024 字节的字符串将被编码为 `\xb9\x04\x00`（十进制 `185, 4, 0`）后跟该字符串。 在这里，`0xb9` (183 + 2 = 185) 为第一个字节，然后是表示实际字符串长度的 2 个字节 `0x0400`（十进制 1024）。 因此，第一个字节的范围是 `[0xb8, 0xbf]`（十进制 `[184, 191]`）。
- 如果字符串的长度为 2^64 字节或更长，则可能不会对其进行编码。
- 如果列表的总有效载荷长度（即其所有经过递归长度前缀编码的项目的组合长度）为 0-55 个字节，则递归长度前缀编码包含一个值为 **0xc0** 的单字节，加上有效载荷长度，后跟一串项目的递归长度前缀编码。 因此，第一个字节的范围是 `[0xc0, 0xf7]`（十进制 `[192, 247]`）。
- 如果列表的总有效载荷长度超过 55 个字节，则递归长度前缀编码包含一个值为 **0xf7** 的单字节，加上二进制格式的有效载荷长度的以字节为单位的长度，后跟有效载荷的长度，然后是项目递归长度前缀编码串。 因此，第一个字节的范围是 `[0xf8, 0xff]`（十进制 `[248, 255]`）。

对应的代码为：

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

- 字符串“dog”= [ 0x83, 'd', 'o', 'g' ]
- 列表 [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- 空字符串 ('null') = `[ 0x80 ]`
- 空列表 = `[ 0xc0 ]`
- 整数 0 = `[ 0x80 ]`
- 字节 '\\x00' = `[ 0x00 ]`
- 字节 '\\x0f' = `[ 0x0f ]`
- 字节 '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- 3 的[集合论表示](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers)，`[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- 字符串“Lorem ipsum dolor sit amet, consectetur adipisicing elit”= `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## 递归长度前缀解码 {#rlp-decoding}

根据递归长度前缀编码的规则和过程，递归长度前缀译码的输入被视为一个二进制数据数组。 递归长度前缀解码过程如下：

1.  根据输入数据的第一个字节（即前缀），解码数据类型、实际数据的长度和偏移量；

2.  根据数据的类型和偏移量，遵循正整数的最小编码规则，对数据进行相应的解码；

3.  继续解码输入的其余部分；

其中，解码数据类型和偏移量的规则如下：

1.  如果第一个字节（即前缀）的范围是 [0x00, 0x7f]，则数据为字符串，并且字符串本身就是第一个字节；

2.  如果第一个字节的范围是 [0x80, 0xb7]，则数据为字符串，并且第一个字节后跟长度等于第一个字节减去 0x80 的字符串；

3.  如果第一个字节的范围是 [0xb8, 0xbf]，则数据为字符串，第一个字节后跟长度等于第一字节减去 0xb7 的字符串长度，而字符串则跟在字符串长度后面

4.  如果第一个字节的范围是 [0xc0, 0xf7]，则数据为列表，第一字节后跟列表中所有项目的递归长度前缀编码串，而列表的总有效载荷等于第一字节减去 0xc0。

5.  如果第一个字节的范围是 [0xf8, 0xff]，则数据为列表，第一个字节后跟长度等于第一字节减去 0xf7 的总有效载荷，而列表所有项目的递归长度前缀编码串则跟在列表的总有效载荷之后；

对应的代码为：

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

- [以太坊中的递归长度前缀](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [底层以太坊：递归长度前缀](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020)。 以太坊 ACL2 中的递归长度前缀。 arXiv 预印本 arXiv:2009.13769。](https://arxiv.org/abs/2009.13769)

## 相关主题 {#related-topics}

- [默克尔前缀树](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
