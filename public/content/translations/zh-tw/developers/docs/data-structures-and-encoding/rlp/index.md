---
title: 遞迴長度前置詞 (RLP) 序列化
description: 以太坊執行層中的遞迴長度前置詞編碼的定義
lang: zh-tw
sidebarDepth: 2
---

遞迴長度前置詞 (RLP) 序列化在以太坊執行層用戶端中廣泛使用。 遞迴長度前置詞以節省空間的格式標準化資料在節點之間的傳送。 遞迴長度前置詞的目的在於，對任意嵌套的二進位資料陣列進行編碼，而遞迴長度前置詞是用於序列化以太坊執行層中物件的主要編碼方法。 遞迴長度前置詞的主要目的是對結構進行解碼；除了正整數外，遞迴長度前置詞將特定資料類型（例如字串、浮點數）的編碼委托給更高階的協定。 正整數必須以沒有前導零的大端二進位形式表示（因而使整數值零相當於空位元組陣列）。 任何使用遞迴長度前置詞的高階協定都必須將具有前導零的反序列化正整數視爲無效。

更多資訊請參閱[以太坊黃皮書（附錄 B）](https://ethereum.github.io/yellowpaper/paper.pdf#page=19)。

要使用遞迴長度前置詞對字典進行編碼，建議的兩種規範形式為：

- 配合按字典順序排序的鍵使用 `[[k1,v1],[k2,v2]...]`
- 像以太坊一樣使用更高階的帕特里夏樹編碼

## 定義 {#definition}

遞迴長度前置詞編碼函式接受一個項目。 該項目的定義如下：

- 一個字串（即位元組陣列）是一個項目
- 一個項目清單是一個項目
- 一個正整數是一個項目

例如，下列所述都是項目：

- 空字串；
- 包含單詞「cat」的字串；
- 包含任意數量字串的清單；
- 以及更複雜的資料結構，例如 `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`。
- 數字 `100`

請注意，在本頁剩餘部分的情境下，「字串」表示「一定數量的二進位資料位元組」；不使用特殊編碼，並且不隱含有關字串内容的知識（除非針對非最小正整數的規則有要求）。

遞迴長度前置詞編碼的定義如下：

- 對於正整數，將其轉換爲最短位元組陣列，其大端解釋為整數，然後根據下面的規則編碼為字串。
- 對於值在 `[0x00, 0x7f]`（十進位 `[0, 127]`）範圍内的單一位元組，該位元組就是它自己的遞迴長度前置詞編碼。
- 否則，如果字串的長度為 0-55 位元組，則遞迴長度前置詞編碼包含一個值為 **0x80**（十進位 128）的單一位元組，加上該字串后字串的長度。 因此，第一個位元組的範圍是 `[0x80, 0xb7]`（十進位 `[128, 183]`）。
- 如果字串的長度超過 55 位元組，則遞迴長度前置詞編碼的組成為：一個值為 **0xb7**（十進位 183）的單一位元組，加上二進位形式的字串長度之長度（以位元組為單位），后跟字串的長度，然後是字串。 例如，一個 1024 位元組長的字串將被編碼為 `\xb9\x04\x00`（十進位 `185, 4, 0`），後跟該字串。 在這裏，`0xb9` (183 + 2 = 185) 為第一個位元組，然後是表示實際字串長度的 2 個位元組 `0x0400`（十進位 1024）。 因此，第一個位元組的範圍是 `[0xb8, 0xbf]`（十進位 `[184, 191]`）。
- 如果字串長度為 2^64 位元組或者更長，則可能不會對其進行編碼。
- 如果清單的縂承載長度（即其所有經過遞迴長度前置詞編碼的項目的組合長度）為 0-55 位元組，則遞迴長度前置詞編碼包含一個值為 **0xc0** 的單一位元組，加上承載長度，後跟項目遞迴長度前置詞編碼的串聯。 因此，第一個字節位元組的範圍是 `[0xc0, 0xf7]`（十進位 `[192, 247]`）。
- 如果清單的縂承載長度超過 55 位元組，則遞迴長度前置詞編碼包含一個值為 **0xf7** 的單一位元組，加上二進位形式的承載長度（以位元組為單位），後跟承載的長度，後跟項目遞迴長度前置詞編碼的串聯。 因此，第一個字節位元組的範圍是 `[0xf8, 0xff]`（十進位 `[248, 255]`）。

對應的程式碼為：

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

## 範例 {#examples}

- 字串 "dog" = [ 0x83, 'd', 'o', 'g' ]
- 清單 [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- 空字串 ('null') = `[ 0x80 ]`
- 空清單 = `[ 0xc0 ]`
- 整數 0 = `[ 0x80 ]`
- 位元組 '\\x00' = `[ 0x00 ]`
- 位元組 '\\x0f' = `[ 0x0f ]`
- 位元組 '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- 3 的[集合理論表示](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers)，`[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- 字串 "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## 遞迴長度前置詞解碼 {#rlp-decoding}

根據遞迴長度前置詞編碼的規則和過程，遞迴長度前置詞解碼的輸入被視爲一個二進位資料陣列。 遞迴長度前置詞解碼過程如下：

1.  根據輸入資料的第一個位元組（即前置詞），解碼資料類型、實際資料長度和位移；

2.  根據資料的類型和位移，對資料進行相應的解碼，遵循正整數的最小編碼規則；

3.  繼續解碼輸入的剩餘部分；

其中，解碼資料類型和位移的規則如下：

1.  如果第一個位元組（即前置詞）的範圍是 [0x00, 0x7f]，則資料為字串，并且字串本身就是第一個位元組；

2.  如果第一個位元組的範圍是 [0x80, 0xb7]，則資料為字串，并且第一個位元組后跟長度等於第一個位元組減去 0x80 的字串；

3.  如果第一個位元組的範圍是 [0xb8, 0xbf]，則資料為字串，第一個位元組后跟長度等於第一個位元組減去 0xb7 的字串長度，后跟該字串；

4.  如果第一個位元組的範圍是 [0xc0, 0xf7]，則資料為清單，第一個位元組後跟清單中所有項目的遞迴長度前置詞編碼串聯，而清單的縂承載等於第一個位元組減去 0xc0；

5.  如果第一個位元組的範圍是 [0xf8, 0xff]，則資料為清單，第一個位元組后跟長度等於第一個位元組減去 0xf7 的縂承載，而清單所有項目的遞迴長度前置詞編碼串聯則跟在清單的縂承載之後；

對應的程式碼為：

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

## 衍生閱讀 {#further-reading}

- [以太坊中的遞迴長度前置詞](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [深入瞭解以太坊：遞迴長度前置詞](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020)。 ACL2 中的以太坊遞迴長度前置詞。 arXiv 預印本 arXiv:2009.13769。](https://arxiv.org/abs/2009.13769)

## 相關主題 {#related-topics}

- [帕特里夏默克爾樹](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
