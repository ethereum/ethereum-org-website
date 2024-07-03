---
title: 再帰的な長さのプレフィックス(RLP)シリアライゼーション
description: イーサリアムの実行レイヤーのRLPエンコーディングの定義。
lang: ja
sidebarDepth: 2
---

再帰的な長さのプレフィックス(RLP)シリアライゼーションは、イーサリアムの実行クライアントで広く使われています。 RLPはスペース効率に優れたフォーマットで、ノード間のデータ転送を標準化します。 RLPの目的は、任意のネストされたバイナリデータの配列をエンコード(符号化)することです。また、RLPはイーサリアムの実行レイヤーのオブジェクトのシリアライズに用いられる主要なエンコーディング方式です。 RLPの主な目的は、構造をエンコードすることです。正の整数を除いて、RLPは特定のデータ型(例: 文字列、浮動小数点など)のエンコードを上位のプロトコルに任せます。 正の整数は、先頭にゼロのないビックエンディアンのバイナリ形式で表現する必要があります(そのため、整数値のゼロは空のバイト配列と等価です)。 RLPを使う上位のプロトコルは、デシリアライズ化された先頭がゼロの正の整数を無効として扱わなければなりません。

詳細については、[イーサリアムイエローペーパー (付録B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19)を参照してください。

RLPを使用して辞書をエンコードするのに、次の2つの正規の方法があります。

- `[[k1,v1],[k2,v2]...]`のように辞書順にキーを並べて使用する
- イーサリアムのように上位レベルのパトリシア・ツリー・エンコーディングを使用する

## 定義 {#definition}

RLPエンコーディング関数は、アイテムを取ります。 アイテムは次のように定義されます。

- 文字列型(すなわちバイト配列) はアイテム
- アイテムのリストはアイテム
- 正の整数はアイテム

例えば、次はすべてアイテムです。

- 空文字列
- 「cat」という単語を含む文字列
- 任意の数の文字列を含むリスト
- 次のような、より複雑なデータ構造 `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`
- 数字の`100`

本ページのこれ以降では、「文字列」は「あるバイト数のバイナリデータ」を意味することに注意してください。特別なエンコーディングは使用されておらず、文字列が何を指すのかの知識は必要ありません(最小でない正の整数に対する規則で要求されていない場合を除く)。

RLPエンコーディングは以下のように定義されます。

- 正の整数では、ビックエンディアンを整数として解釈した最短のバイト配列に変換されます。そして、次に以下の規則に従って文字列としてエンコードします。
- `[0x00, 0x7f]`(10進数`[0, 127]`)の範囲にある1バイトは、そのバイト自体がRLPエンコーディングとなる。
- その他、文字列が0～55バイトの場合、RLPエンコーディングは値が**0x80**(10進数128)に、文字列の長さを足した1バイト、続いて文字列で構成される。 したがって、最初の1バイトの範囲は`[0x80, 0xb7]`(10進数`[128, 183]`)となる。
- 文字列の長さが55バイトを超える場合、RLPエンコーディングは、**0xb7**(10進数 183)にバイナリ形式の文字列長をバイト数を加えた1バイト、続けて文字列の長さ、次に文字列で構成される。 例えば、1024バイトの長さの文字列は、`\xb9\x04\x00` (10進数`185, 4, 0`)にエンコードされ、その後文字列となる。 ここでは、最初の1バイトとして`0xb9` (183 + 2 = 185)、次に実際の文字列の長さを示す2バイトの`0x0400` (10進数1024)が続く。 したがって、最初の1バイトの範囲は、`[0xb8, 0xbf]` (10進数`[184, 191]`)となる。
- 文字列が2^64バイト長以上の場合、エンコードされない可能性があります。
- リストの全ペイロード(例えば、RLPエンコードされるすべてのアイテムを合わせた長さ)が0～55バイトである場合、RLPエンコーディングは、**0xc0**にペイロードの長さを加えた1バイト、続けてアイテムをRLPエンコーディングして続けたもので構成される。 したがって、最初のバイトの範囲は`[0xc0, 0xf7]` (10進数`[192, 247]`)となる。
- リストの全ペイロードが、55バイトを超える場合、RLPエンコーディングは、**0xf7**にバイナリ形式のペイロードの長さのバイト数を加えた1バイト、次にペイロードの長さ、アイテムのRLPエンコーディングしたものを続けたもので構成される。 したがって、最初のバイトの範囲は、`[0xf8, 0xff]` (10進数`[248, 255]`)となる 。

コードでは、これは次のようになります。

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

## いくつかの例 {#examples}

- 文字列「dog」= [ 0x83, 'd', 'o', 'g' ]
- リスト [ "cat", "dog" ]  = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- 空文字列 ('null') = `[ 0x80 ]`
- 空リスト = `[ 0xc0 ]`
- 整数0 = `[ 0x80 ]`
- バイト '\\x00' = `[ 0x00 ]`
- バイト '\\x0f' = `[ 0x0f ]`
- バイト '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- 3の[集合論的表現](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- 文字列「Lorem ipsum dolor sit amet, consectetur adipisicing elit」= `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## RLPデコーディング {#rlp-decoding}

RLPエンコーディング規則とプロセスに従って、RLPデコードの入力は、バイナリデータ配列とみなされます。 RLPのデコーディングプロセスは、次のようになります。

1.  入力データの最初のバイト(プレフィックス) とデコーディングするデータ型に従った実際のデータ長とオフセット

2.  データのタイプおよびオフセットに応じて、正の整数に関する最小エンコード規則に従って、対応するデータをデコードします。

3.  残りの入力のデコードを続行

その中で、データ型とオフセットのデコード規則は次のようになります。

1.  最初の1バイト(プレフィックス)の範囲が [0x00, 0x7f]の場合は、データは文字列型で、文字列はそのバイトそのもの。

2.  最初の1バイトの範囲が[0x80, 0xb7]の場合、データは文字列型。最初の1バイト、続いて最初の1バイトから 0x80 を引いた長さの文字列となる。

3.  最初の1バイトの範囲が[0xb8, 0xbf]の場合は、データは文字列型。最初の1バイト、続いて最初の1バイトから0xb7を引いた文字列長(バイトで表す)、最後に文字列となる。

4.  最初の1バイトの範囲が[0xc0, 0xf7]の場合は、データはリスト型。最初の1バイト、続いて全ペイロードが最初のバイトから0xc0を引いたものに等しい、リストの全アイテムをRLPエンコーディングして続けたものとなる。

5.  最初の1バイトの範囲が[0xf8, 0xff]の場合は、データはリスト型。最初の1バイト、続いてリストの長さが最初の1バイトから0xf7を引いたリストの全ペイロード、最後にリストのすべてのアイテムをRLPエンコーディングして続けたものとなる。

コードでは、これは次のようになります。

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

- [イーサリアムのRLP](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [イーサリアムの内部: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). ACL2のイーサリアムの再帰的な長さのプレフィックス arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## 関連トピック {#related-topics}

- [パトリシア・マークル・ツリー](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
