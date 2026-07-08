---
title: "Recursive-length prefix (RLP) シリアライゼーション"
description: "イーサリアムの実行レイヤーにおける RLP エンコーディングの定義。"
lang: ja
sidebarDepth: 2
---

Recursive Length Prefix (RLP) シリアライゼーションは、イーサリアムの実行クライアントで広く使用されています。RLP は、ノード間のデータの転送を、スペース効率の良いフォーマットで標準化します。RLP の目的は、任意にネストされたバイナリデータの配列をエンコードすることであり、イーサリアムの実行レイヤーでオブジェクトをシリアライズするために使用される主要なエンコーディング手法です。RLP の主な目的は構造をエンコードすることです。正の整数を除き、RLP は特定のデータ型 (文字列、浮動小数点数など) のエンコーディングを上位のプロトコルに委譲します。正の整数は、先行ゼロのないビッグ・エンディアンのバイナリ形式で表現する必要があります (したがって、整数値のゼロは空のバイト配列と同等になります)。先行ゼロを持つデシリアライズされた正の整数は、RLP を使用するすべての上位プロトコルによって無効として扱われなければなりません。

詳細は[イーサリアムのイエロー・ペーパー (付録 B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19)をご覧ください。

辞書をエンコードするために RLP を使用する場合、推奨される 2 つの標準形式は以下の通りです。

- キーを辞書順にした `[[k1,v1],[k2,v2]...]` を使用する
- [イーサリアム](/)のように、上位レベルのパトリシアツリー (Patricia Tree) エンコーディングを使用する

## 定義 {#definition}

RLP エンコーディング関数はアイテムを受け取ります。アイテムは次のように定義されます。

- 文字列 (つまり、バイト配列) はアイテムである
- アイテムのリストはアイテムである
- 正の整数はアイテムである

例えば、以下はすべてアイテムです。

- 空の文字列
- "cat" という単語を含む文字列
- 任意の数の文字列を含むリスト
- `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]` のような、より複雑なデータ構造
- 数値 `100`

このページの以降のコンテキストにおいて、「文字列」とは「特定のバイト数のバイナリデータ」を意味することに注意してください。特別なエンコーディングは使用されず、文字列の内容に関する知識も暗示されません (最小ではない正の整数に対する規則によって要求される場合を除きます)。

RLP エンコーディングは次のように定義されます。

- 正の整数の場合、ビッグ・エンディアン解釈がその整数となる最短のバイト配列に変換され、以下の規則に従って文字列としてエンコードされます。
- 値が `[0x00, 0x7f]` (10 進数で `[0, 127]`) の範囲にある単一バイトの場合、そのバイト自体が RLP エンコーディングになります。
- それ以外の場合で、文字列の長さが 0〜55 バイトのとき、RLP エンコーディングは、値 **0x80** (10 進数で 128) に文字列の長さを加えた単一バイトと、それに続く文字列で構成されます。したがって、最初のバイトの範囲は `[0x80, 0xb7]` (10 進数で `[128, 183]`) になります。
- 文字列の長さが 55 バイトを超える場合、RLP エンコーディングは、値 **0xb7** (10 進数で 183) にバイナリ形式での文字列の長さのバイト数を加えた単一バイト、文字列の長さ、そして文字列の順で構成されます。例えば、長さ 1024 バイトの文字列は、`\xb9\x04\x00` (10 進数で `185, 4, 0`) の後に文字列が続く形でエンコードされます。ここで、最初のバイトは `0xb9` (183 + 2 = 185) であり、その後に実際の文字列の長さを表す 2 バイトの `0x0400` (10 進数で 1024) が続きます。したがって、最初のバイトの範囲は `[0xb8, 0xbf]` (10 進数で `[184, 191]`) になります。
- 文字列の長さが 2^64 バイト以上の場合、エンコードできないことがあります。
- リストの合計ペイロード (つまり、RLP エンコードされるすべてのアイテムの合計長) が 0〜55 バイトの場合、RLP エンコーディングは、値 **0xc0** にペイロードの長さを加えた単一バイトと、それに続くアイテムの RLP エンコーディングの連結で構成されます。したがって、最初のバイトの範囲は `[0xc0, 0xf7]` (10 進数で `[192, 247]`) になります。
- リストの合計ペイロードが 55 バイトを超える場合、RLP エンコーディングは、値 **0xf7** にバイナリ形式でのペイロードの長さのバイト数を加えた単一バイト、ペイロードの長さ、そしてアイテムの RLP エンコーディングの連結の順で構成されます。したがって、最初のバイトの範囲は `[0xf8, 0xff]` (10 進数で `[248, 255]`) になります。

簡潔にまとめると以下のようになります。

| 範囲       | バイト 1     | バイト 2     | ...        | バイト 9                | バイト 10    | 意味                                   |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | 単一バイトの文字列                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | 短い文字列 (0〜55 バイト)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | 長い文字列、長さを示す N+1 バイトの後にペイロード |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | 短いリスト (0〜55 バイト)                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | 長いリスト、長さを示す N+1 バイトの後にペイロード |

- `p` = ペイロード
- `n` = 長さ (ペイロードのバイト数)
- `N` = 長さの長さのオフセット (N+1 バイトの `n` が続く)

コードで表すと以下のようになります。

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

## 例 {#examples}

- 文字列 "dog" = [ 0x83, 'd', 'o', 'g' ]
- リスト [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- 空の文字列 ('null') = `[ 0x80 ]`
- 空のリスト = `[ 0xc0 ]`
- 整数 0 = `[ 0x80 ]`
- バイト '\x00' = `[ 0x00 ]`
- バイト '\x0f' = `[ 0x0f ]`
- バイト '\x04\x00' = `[ 0x82, 0x04, 0x00 ]`
- 3 の[集合論的表現](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers)、`[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- 文字列 "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## RLP デコーディング {#rlp-decoding}

RLP エンコーディングの規則とプロセスに従い、RLP デコードの入力はバイナリデータの配列と見なされます。RLP デコーディングのプロセスは以下の通りです。

1.  入力データの最初のバイト (つまりプレフィックス) に従ってデータ型をデコードし、実際のデータの長さとオフセットを決定します。

2.  データの型とオフセットに従ってデータを対応するようにデコードし、正の整数の最小エンコーディング規則を遵守します。

3.  入力の残りの部分のデコードを続行します。

このうち、データ型とオフセットをデコードする規則は以下の通りです。

1.  最初のバイト (つまりプレフィックス) の範囲が [0x00, 0x7f] の場合、データは文字列であり、その文字列は最初のバイトそのものになります。

2.  最初のバイトの範囲が [0x80, 0xb7] の場合、データは文字列であり、最初のバイトから 0x80 を引いた値に等しい長さの文字列が最初のバイトの後に続きます。

3.  最初のバイトの範囲が [0xb8, 0xbf] の場合、データは文字列であり、最初のバイトから 0xb7 を引いた値に等しいバイト数の「文字列の長さ」が最初のバイトの後に続き、その後に文字列が続きます。

4.  最初のバイトの範囲が [0xc0, 0xf7] の場合、データはリストであり、最初のバイトから 0xc0 を引いた値に等しい合計ペイロードを持つ、リストの全アイテムの RLP エンコーディングの連結が最初のバイトの後に続きます。

5.  最初のバイトの範囲が [0xf8, 0xff] の場合、データはリストであり、最初のバイトから 0xf7 を引いた値に等しい長さの「リストの合計ペイロード」が最初のバイトの後に続き、その後にリストの全アイテムの RLP エンコーディングの連結が続きます。

コードで表すと以下のようになります。

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

## 参考文献 {#further-reading}

- [イーサリアムにおける RLP](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [イーサリアムの内部構造: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## 関連トピック {#related-topics}

- [パトリシア・マークル・トライ](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)