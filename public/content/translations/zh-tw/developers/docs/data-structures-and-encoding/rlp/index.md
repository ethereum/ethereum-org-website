---
title: "遞迴長度前綴 (RLP) 序列化"
description: "以太坊執行層中 RLP 編碼的定義。"
lang: zh-tw
sidebarDepth: 2
---

遞迴長度前綴 (RLP) 序列化廣泛用於以太坊的執行用戶端中。RLP 以節省空間的格式標準化了節點之間的資料傳輸。RLP 的目的是對任意嵌套的二進位資料陣列進行編碼，且 RLP 是以太坊執行層中用於序列化物件的主要編碼方法。RLP 的主要目的是對結構進行編碼；除了正整數之外，RLP 將特定資料類型（例如字串、浮點數）的編碼委託給高階協定。正整數必須以沒有前導零的大端序二進位形式表示（因此使整數值零等同於空位元組陣列）。任何使用 RLP 的高階協定都必須將帶有前導零的反序列化正整數視為無效。

更多資訊請見[以太坊黃皮書（附錄 B）](https://ethereum.github.io/yellowpaper/paper.pdf#page=19)。

若要使用 RLP 對字典進行編碼，建議的兩種規範形式為：

- 使用 `[[k1,v1],[k2,v2]...]` 並按字典順序排列鍵值
- 像[以太坊](/)一樣使用更高階的帕特里夏樹 (Patricia Tree) 編碼

## 定義 {#definition}

RLP 編碼函式接收一個項目 (item)。項目的定義如下：

- 字串（即位元組陣列）是一個項目
- 項目列表是一個項目
- 正整數是一個項目

例如，以下所有都是項目：

- 空字串；
- 包含單字 "cat" 的字串；
- 包含任意數量字串的列表；
- 以及更複雜的資料結構，例如 `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`。
- 數字 `100`

請注意，在本頁其餘部分的上下文中，「字串」指的是「一定數量的二進位資料位元組」；不使用任何特殊編碼，也不暗示對字串內容有任何了解（除非反對非最小正整數的規則有所要求）。

RLP 編碼定義如下：

- 對於正整數，它會被轉換為大端序解釋為該整數的最短位元組陣列，然後根據以下規則編碼為字串。
- 對於值在 `[0x00, 0x7f]`（十進位 `[0, 127]`）範圍內的單一位元組，該位元組就是其本身的 RLP 編碼。
- 否則，如果字串長度為 0-55 個位元組，則 RLP 編碼由一個值為 **0x80**（十進位 128）加上字串長度的單一位元組組成，後面接著該字串。因此，第一個位元組的範圍是 `[0x80, 0xb7]`（十進位 `[128, 183]`）。
- 如果字串長度超過 55 個位元組，則 RLP 編碼由一個值為 **0xb7**（十進位 183）加上字串長度的二進位形式的位元組長度的單一位元組組成，後面接著字串的長度，再接著該字串。例如，一個 1024 位元組長的字串將被編碼為 `\xb9\x04\x00`（十進位 `185, 4, 0`），後面接著該字串。這裡，`0xb9` (183 + 2 = 185) 作為第一個位元組，後面接著表示實際字串長度的 2 個位元組 `0x0400`（十進位 1024）。因此，第一個位元組的範圍是 `[0xb8, 0xbf]`（十進位 `[184, 191]`）。
- 如果字串長度為 2^64 個位元組或更長，則可能無法進行編碼。
- 如果列表的總有效負載（即其所有被 RLP 編碼的項目的組合長度）為 0-55 個位元組長，則 RLP 編碼由一個值為 **0xc0** 加上有效負載長度的單一位元組組成，後面接著項目 RLP 編碼的串聯。因此，第一個位元組的範圍是 `[0xc0, 0xf7]`（十進位 `[192, 247]`）。
- 如果列表的總有效負載長度超過 55 個位元組，則 RLP 編碼由一個值為 **0xf7** 加上有效負載長度的二進位形式的位元組長度的單一位元組組成，後面接著有效負載的長度，再接著項目 RLP 編碼的串聯。因此，第一個位元組的範圍是 `[0xf8, 0xff]`（十進位 `[248, 255]`）。

簡而言之：

| 範圍       | 位元組 1     | 位元組 2     | ...        | 位元組 9                | 位元組 10    | 意義                                   |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | 單一位元組字串                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | 短字串 (0-55 位元組)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | 長字串，N+1 個位元組表示長度，然後是有效負載 |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | 短列表 (0-55 位元組)                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | 長列表，N+1 個位元組表示長度，然後是有效負載 |

- `p` = 有效負載
- `n` = 長度（有效負載位元組數）
- `N` = 長度的長度偏移量（後面跟著 N+1 個 `n` 位元組）

在程式碼中，這表示為：

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
- 列表 [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- 空字串 ('null') = `[ 0x80 ]`
- 空列表 = `[ 0xc0 ]`
- 整數 0 = `[ 0x80 ]`
- 位元組 '\x00' = `[ 0x00 ]`
- 位元組 '\x0f' = `[ 0x0f ]`
- 位元組 '\x04\x00' = `[ 0x82, 0x04, 0x00 ]`
- 數字 3 的[集合論表示法](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers)，`[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- 字串 "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## RLP 解碼 {#rlp-decoding}

根據 RLP 編碼的規則和過程，RLP 解碼的輸入被視為二進位資料陣列。RLP 解碼過程如下：

1.  根據輸入資料的第一個位元組（即前綴）並解碼資料類型、實際資料的長度和偏移量；

2.  根據資料的類型和偏移量，相應地解碼資料，並遵守正整數的最小編碼規則；

3.  繼續解碼輸入的其餘部分；

其中，解碼資料類型和偏移量的規則如下：

1.  如果第一個位元組（即前綴）的範圍是 [0x00, 0x7f]，則資料為字串，且該字串正是第一個位元組本身；

2.  如果第一個位元組的範圍是 [0x80, 0xb7]，則資料為字串，且長度等於第一個位元組減去 0x80 的字串緊跟在第一個位元組之後；

3.  如果第一個位元組的範圍是 [0xb8, 0xbf]，則資料為字串，且以位元組為單位的長度等於第一個位元組減去 0xb7 的字串長度緊跟在第一個位元組之後，而字串緊跟在字串長度之後；

4.  如果第一個位元組的範圍是 [0xc0, 0xf7]，則資料為列表，且總有效負載等於第一個位元組減去 0xc0 的列表所有項目 RLP 編碼的串聯緊跟在第一個位元組之後；

5.  如果第一個位元組的範圍是 [0xf8, 0xff]，則資料為列表，且長度等於第一個位元組減去 0xf7 的列表總有效負載緊跟在第一個位元組之後，而列表所有項目 RLP 編碼的串聯緊跟在列表的總有效負載之後；

在程式碼中，這表示為：

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

## 延伸閱讀 {#further-reading}

- [以太坊中的 RLP](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [以太坊底層技術：RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## 相關主題 {#related-topics}

- [帕特里夏默克爾前綴樹 (Patricia merkle trie)](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)