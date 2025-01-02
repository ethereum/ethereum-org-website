---
title: Rekurzív hosszúságú prefix (RLP) sorosítás
description: Az RLP-kódolás bemutatása az Ethereum végrehajtási rétegen.
lang: hu
sidebarDepth: 2
---

A rekurzív hosszúságú prefixum (RLP) egy sorosítási módszer, melyet kiterjedten használnak az Ethereum végrehajtási rétegén. Az RLP a csomópontok közötti adatátvitelt szabványosítja helytakarékos formátumban. Az RLP célja a bináris adatok tetszőlegesen egymásba ágyazott tömbjeinek kódolása, és ez az elsődleges kódolási módszer, amelyet az Ethereum végrehajtási rétegén az objektumok sorosítására használnak. Az RLP fő célja a struktúra kódolása; a pozitív egész számok kivételével az RLP az egyes adattípusok (pl. karakterláncok, lebegőszámok) kódolását magasabb rendű protokollokra bízza. A pozitív egész számokat nagy endián bináris formában kell ábrázolni, vezető nullák nélkül (így az egész szám értéke nulla, ami üres bájttömbnek felel meg). A vezető nullákat tartalmazó, sorosított, pozitív egész számokat az RLP-t használó magasabb rendű protokolloknak érvénytelennek kell tekinteniük.

További információkat talál [az Ethereum Sárgakönyvben (B függelék)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Ahhoz, hogy az RLP-vel kódoljunk egy szótárt, a két javasolt kanonikus forma a következő:

- a `[[k1,v1],[k2,v2]...]` kódot használjuk olyan kulcsokkal, melyek lexikográfiai sorrendben vannak
- a magasabb szintű Patricia-fa kódolást használjuk, mint az Ethereum

## Definíció {#definition}

Az RLP-kódolási funkció egy elemet vesz fel. Az elem a következő lehet：

- egy sztring vagy karaktersorozat (bájttömb) az egy elem
- az elemek listája is egy elem
- egy pozitív egész szám egy tétel

Például a következők mindegyike elem:

- egy üres sztring;
- egy sztring, amely a „cat” (macska) szót tartalmazza;
- egy lista, melyben bármennyi sztring található;
- és az ennél bonyolultabb adatstruktúrák, mint `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- a szám `100`

Érdemes megjegyezni, hogy az oldal további részében a sztring kifejezés a „bináris adat bizonyos számú bájtját” jelenti; nem használunk speciális kódolást, és a sztringek tartalmát nem ismerjük (kivéve a nem minimális pozitív egész számok elleni eseteknél).

Az RPL kódolást a következő módon definiáljuk:

- Pozitív egész szám esetén a legrövidebb bájttömbre konvertáljuk, amelynek nagy endián értelmezése az egész szám, majd az alábbi szabályok szerint sztringként kódoljuk.
- Egy bájt, amelynek értéke a `[0x00, 0x7f]` (decimális `[0, 127]`) tartományban van, annak RLP-kódolása önmaga.
- Máskülönben, ha a sztring 0–55 bájt hosszú, az RLP-kódolás egyetlen **0x80** (decimál 128) értékű bájtból és a sztring hosszából áll, amelyet a sztring követ. Az első bájt tartománya tehát `[0x80, 0xb7]` (dec. `[128, 183]`).
- Ha a sztring több mint 55 bájt hosszú, az RLP-kódolás egyetlen bájtból áll, amelynek értéke **0xb7** (dec. 183), valamint a sztring hossza bájtokban kifejezve bináris formában, ezt követi a sztring hossza, majd a sztring. Például egy 1024 bájt hosszú sztring kódolása `\xb9\x04\x00` (dec. `185, 4, 0`), amelyet a sztring követ. Itt `0xb9` (183 + 2 = 185) az első bájt, majd az a 2 bájt `0x0400` (dec. 1024) jön, amely az aktuális sztring hosszát jelöli. Az első bájt tartománya tehát `[0xb8, 0xbf]` (dec. `[184, 191]`).
- Ha egy sztring 2^64 bájt vagy hosszabb, akkor nem kódolható.
- Ha egy lista teljes payload-ja (azaz az összes RLP-kódolt elemének együttes hossza) 0–55 bájt hosszú, az RLP-kódolás egyetlen **0xc0** értékű bájtból és a payload hosszából áll, amelyet az elemek RLP-kódolásainak összekapcsolása követ. Az első bájt tartománya tehát `[0xc0, 0xf7]` (dec. `[192, 247]`).
- Ha egy lista teljes payload-ja több mint 55 bájt hosszú, az RLP-kódolás egyetlen **0xf7** értékű bájtból, valamint a payload hosszának bájtban kifejezett hosszából áll bináris formában, amelyet a payload hossza követ, majd az elemek RLP-kódolásainak összekapcsolása. Az első bájt tartománya tehát `[0xf8, 0xff]` (dec. `[248, 255]`).

Ez kódban a következőképpen néz ki:

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

## Példák {#examples}

- a „dog” sztring = [ 0x83, 'd', 'o', 'g' ]
- a [ "cat", "dog" ] lista = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- az üres sztring ('null') = `[ 0x80 ]`
- az üres lista = `[ 0xc0 ]`
- az integer 0 = `[ 0x80 ]`
- a '\\x00' bájt = `[ 0x00 ]`
- a '\\x0f' bájt = `[ 0x0f ]`
- a '\\x04\\x00' bájt = `[ 0x82, 0x04, 0x00 ]`
- a háromnak a [halmazelméleti ábrázolása](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- a „Lorem ipsum dolor sit amet, consectetur adipisicing elit” sztring = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## RLP-dekódolás {#rlp-decoding}

Az RLP-kódolás szabályai és folyamata szerint az RLP-dekódolás bemenete bináris adatok tömbjének tekinthető. Az RLP-dekódolási folyamat a következő:

1.  a bemeneti adatok első bájtja (azaz előtagja) alapján dekódolja az adattípust, a tényleges adat hosszát és az eltolást;

2.  az adatok típusának és eltolásának megfelelően dekódolja az adatokat, tiszteletben tartva a pozitív egész számokra vonatkozó minimális kódolási szabályt;

3.  folytatja a bemenet többi részének dekódolását;

Ezek közül az adattípusok és az eltolás dekódolásának szabályai a következők:

1.  az adat egy sztring, ha az első bájt tartománya (az előtag) [0x00, 0x7f], és a sztring pontosan maga az első bájt;

2.  az adat egy sztring, ha az első bájt tartománya [0x80, 0xb7], és az első bájtot az a sztring követi, amelynek hossza egyenlő az első bájt mínusz 0x80;

3.  az adat egy sztring, ha az első bájt tartománya [0xb8, 0xbf], és a sztring hossza, amelynek hossza bájtokban egyenlő az első bájt mínusz 0xb7, követi az első bájtot, és a sztring követi a sztring hosszát;

4.  az adat egy lista, ha az első bájt tartománya [0xc0, 0xf7], és a lista minden olyan eleme RLP-kódolásának összekapcsolása, amelynek teljes payload-ja megegyezik az első bájttal mínusz 0xc0, az első bájtot követi;

5.  az adat egy lista, ha az első bájt tartománya [0xf8, 0xff], és a lista teljes payload-ja, amelynek hossza megegyezik az első bájttal mínusz 0xf7, követi az első bájtot, és a lista összes elemének RLP-kódolásának konkatenációja követi a lista teljes payload-ját;

Ez kódban a következőképpen néz ki:

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

## További olvasnivaló {#further-reading}

- [RLP az Ethereumon](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum háttérműködése: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum Rekurzív hosszúságú prefix (RLP) az ACL2-ben. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Kapcsolódó témák {#related-topics}

- [Patricia Merkle-fa](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
