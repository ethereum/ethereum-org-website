---
title: "Özyinelemeli uzunluk ön eki (RLP) serileştirmesi"
description: "Ethereum'un yürütüm katmanında rlp şifrelemesinin bir tanımı."
lang: tr
sidebarDepth: 2
---

Özyinelemeli Uzunluk Ön Eki (RLP), Ethereum'un yürütüm istemcilerinde yaygın şekilde kullanılan bir serileştirme yoludur. RLP, düğümler arasında veri transferini, alan açısından verimli bir biçimde standartlaştırır. RLP'nin amacı, rastgele iç içe geçmiş ikili veri dizilerini kodlamaktır. RLP, Ethereum'un yürütüm katmanında nesneleri serileştirmek için kullanılan temel kodlama yöntemidir. RLP'nin ana amacı yapıyı kodlamaktır; pozitif tam sayılar hariç olmak üzere RLP, belirli veri türlerinin (ör. dizeler, kayan noktalı sayılar) kodlanmasını daha üst düzey protokollere devreder. Pozitif tamsayılar, başlarında sıfır olmadan big-endian ikili biçiminde gösterilmelidir (böylece sıfır tamsayı değeri boş bayt dizisine eşdeğer olur). Başında sıfır bulunan seri duruma getirilmiş pozitif tamsayılar, RLP kullanan herhangi bir üst düzey protokol tarafından geçersiz olarak değerlendirilmelidir.

[Ethereum sarı bülteninde (Ek B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19) daha fazla bilgi bulabilirsiniz.

Bir sözlüğü kodlamak için RLP kullanmanın iki kabul edilmiş yolu:

- sözlüksel sırada anahtarlarla `[[k1,v1],[k2,v2]...]` kullanın
- Ethereum'un yaptığı gibi kodlama için üst düzey Patricia Ağacını kullanmak

## Tanım {#definition}

RLP kodlama fonksiyonu bir öğeyi içine alır. Bir öğe aşağıdaki gibi tanımlanır:

- bir dize (yani bayt dizisi) bir öğedir
- öğelerin listesi, bir öğedir
- bir pozitif tamsayı bir öğedir

Örneğin, aşağıdakilerin tümü öğelerdir:

- boş dize;
- "cat" kelimesini içeren dize;
- herhangi bir sayıda dize içeren bir liste;
- ve `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]` gibi daha karmaşık veri yapıları.
- `100` sayısı

Bu sayfanın geri kalanı bağlamında "dize", "belirli sayıda ikili veri baytı" anlamına gelir; hiçbir özel kodlama kullanılmaz ve dizelerin içeriği hakkında hiçbir bilgiye sahip olunduğu ima edilmez (minimum olmayan pozitif tamsayılara karşın kuralın gerektirdiği durumlar hariç).

RLP kodlaması şu şekilde tanımlanır:

- Pozitif bir tamsayı için big-endian yorumu tam sayı olan en kısa bayt dizisine dönüştürülür ve ardından aşağıdaki kurallar uyarınca bir dize olarak kodlanır.
- Değeri `[0x00, 0x7f]` (ondalık `[0, 127]`) aralığında olan tek bir bayt için bu bayt kendi RLP kodlamasıdır.
- Aksi takdirde, bir dize 0-55 bayt uzunluğundaysa, RLP kodlaması **0x80** (onl. 128) değerindeki tek bir bayt artı dizenin uzunluğu ve ardından dizenin kendisinden oluşur. Böylece ilk baytın aralığı `[0x80, 0xb7]` (onl. `[128, 183]`) olur.
- Bir dize 55 bayttan uzunsa, RLP kodlaması şunlardan oluşur: **0xb7** (onl. 183) değerinde tek bir bayt, artı ikili biçimdeki dizenin uzunluğunun bayt cinsinden uzunluğu, ardından dizenin uzunluğu ve son olarak dizenin kendisi. Örneğin, 1024 bayt uzunluğunda bir dize, `\xb9\x04\x00` (onl. `185, 4, 0`) olarak kodlanır ve ardından dize gelir. Burada, ilk bayt olarak `0xb9` (183 + 2 = 185), ardından gerçek dizenin uzunluğunu belirten 2 baytlık `0x0400` (onl. 1024) gelir. Böylece ilk baytın aralığı `[0xb8, 0xbf]` (onl. `[184, 191]`) olur.
- Bir dize 2^64 bayt uzunluğunda veya daha uzunsa kodlanamayabilir.
- Bir listenin toplam yükü (yani RLP kodlu tüm öğelerinin birleşik uzunluğu) 0-55 bayt uzunluğundaysa, RLP kodlaması, değeri **0xc0** olan tek bir bayt artı yükün uzunluğu ve ardından öğelerin RLP kodlamalarının birleşiminden oluşur. Böylece ilk baytın aralığı `[0xc0, 0xf7]` (onl. `[192, 247]`) olur.
- Bir listenin toplam yükü 55 bayttan uzunsa RLP kodlaması; **0xf7** değerinde tek bir bayt, artı ikili formdaki yük uzunluğunun bayt cinsinden uzunluğu, ardından yükün uzunluğu ve son olarak da öğelerin RLP kodlamalarının birleşiminden oluşur. Böylece ilk baytın aralığı `[0xf8, 0xff]` (onl. `[248, 255]`) olur.

Kodda, bu:

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
    raise Exception("girdi çok uzun")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## Örnekler {#examples}

- "dog" dizesi = = [ 0x83, 'd', 'o', 'g' ]
- `[ "cat", "dog" ]` listesi = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- boş dize ('null') = `[ 0x80 ]`
- boş liste = `[ 0xc0 ]`
- 0 tamsayısı = `[ 0x80 ]`
- `\x00` baytı = `[ 0x00 ]`
- `\x0f` baytı = `[ 0x0f ]`
- `\x04\x00` baytları = `[ 0x82, 0x04, 0x00 ]`
- üçün [küme kuramsal temsili](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers), `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- `"Lorem ipsum dolor sit amet, consectetur adipisicing elit"` dizesi = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ...` , 'e', 'l', 'i', 't' ]`

## RLP kod çözme {#rlp-decoding}

RLP'nin kodlaması kurallarına ve sürecine göre RLP kod çözme girdisi, bir ikili veri dizisi olarak kabul edilir. RLP kod çözme süreci aşağıdaki gibidir:

1. girdi verisinin ilk baytına (yani önekine) göre veri türü, gerçek veri uzunluğu ve ofsetin kodunu çözme;

2. verilerin türüne ve kaymasına göre, pozitif tamsayılar için minimum kodlama kuralına uyarak, verilerin kodunu uygun şekilde çözün;

3. girdinin geri kalanını çözmeye devam edin;

Bunların yanında veri tiplerini ve kaymaları kodlamanın kuralları şu şekildedir:

1. ilk baytın (yani önekin) aralığı [0x00, 0x7f] ise, veri bir dizedir ve dize doğrudan ilk baytın kendisidir;

2. i̇lk baytın aralığı [0x80, 0xb7] ise veri bir dizedir ve dizenin uzunluğu ilk bayttan 0x80 çıkarıldığında elde edilen değere eşit uzunluktadır;

3. veri, ilk baytın aralığı [0xf8, 0xff] ise ve uzunluğu ilk bayt eksi 0xf7'ye eşit olan listenin toplam yükü ilk baytı takip ediyorsa ve hepsini kodlamalarının birleşimi bir listedir. listenin öğeleri, listenin toplam yükünü takip eder;

4. ilk bayt aralığı [0xc0, 0xf7] ise veriler bir listedir ve toplam yükün ilk bayta eşit olduğu listenin tüm öğelerinin RLP kodlamalarının sıralanması eksi 0xc0 ilk baytı takip eder;

5. ilk baytın aralığı [0xf8, 0xff] ise veri bir listedir ve uzunluğu ilk bayt eksi 0xf7'ye eşit olan listenin toplam yükü ilk baytı takip eder ve tümünün RLP kodlamalarının birleşimi listenin öğeleri listenin toplam yükünü takip eder;

Kodda, bu:

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
        raise Exception("girdi boş")
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
    raise Exception("girdi RLP kodlama biçimine uymuyor")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("girdi boş")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## Daha fazla kaynak {#further-reading}

- [Ethereum'da RLP](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Perde arkasında Ethereum: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum ACL2'deki Özyinelemeli Uzunluk Ön Eki. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Alakalı başlıklar {#related-topics}

- [Patricia merkle trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
