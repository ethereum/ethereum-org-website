---
title: Özyinelemeli uzunluk ön eki (RLP) serileştirmesi
description: Ethereum'un yürütme katmanındaki rlp kodlamasının bir tanımı.
lang: tr
sidebarDepth: 2
---

Özyinelemeli Uzunluk Ön Eki (RLP) serileştirmesi, Ethereum'un yürütme istemcilerinde yaygın olarak kullanılır. RLP, düğümler arasındaki veri transferini alan açısından verimli bir formatta standartlaştırır. RLP'nin amacı, rastgele iç içe geçmiş ikili veri dizilerini kodlamaktır ve RLP, Ethereum'un yürütme katmanındaki nesneleri serileştirmek için kullanılan birincil kodlama yöntemidir. RLP'nin temel amacı yapıyı kodlamaktır; pozitif tam sayılar hariç olmak üzere RLP, belirli veri türlerinin (ör. dizeler, kayan noktalı sayılar) kodlanmasını daha yüksek dereceli Protokollere devreder. Pozitif tam sayılar, başında sıfır olmadan büyük uçlu ikili formda temsil edilmelidir (böylece sıfır tam sayı değeri boş bayt dizisine eşdeğer hâle gelir). Başında sıfır bulunan serileştirmeden çıkarılmış pozitif tam sayılar, RLP kullanan herhangi bir daha yüksek dereceli Protokol tarafından geçersiz olarak kabul edilmelidir.

Daha fazla bilgi [Ethereum Sarı Bülteni'nde (Ek B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19) bulunabilir.

Bir sözlüğü kodlamak için RLP kullanırken önerilen iki kurallı form şunlardır:

- anahtarların sözlükbilimsel sırada olduğu `[[k1,v1],[k2,v2]...]` kullanmak
- [Ethereum](/)'un yaptığı gibi daha üst düzey Patricia Ağacı kodlamasını kullanmak

## Tanım {#definition}

RLP kodlama işlevi bir öge alır. Bir öge şu şekilde tanımlanır:

- bir dize (yani bayt dizisi) bir ögedir
- bir ögeler listesi bir ögedir
- pozitif bir tam sayı bir ögedir

Örneğin, aşağıdakilerin tümü birer ögedir:

- boş bir dize;
- "cat" kelimesini içeren dize;
- herhangi bir sayıda dize içeren bir liste;
- ve `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]` gibi daha karmaşık veri yapıları.
- `100` sayısı

Bu sayfanın geri kalanının bağlamında 'dize'nin "belirli sayıda ikili veri baytı" anlamına geldiğini unutmayın; hiçbir özel kodlama kullanılmaz ve dizelerin içeriği hakkında hiçbir bilgi ima edilmez (minimal olmayan pozitif tam sayılara karşı kuralın gerektirdiği durumlar hariç).

RLP kodlaması şu şekilde tanımlanır:

- Pozitif bir tam sayı için, büyük uçlu yorumu tam sayı olan en kısa bayt dizisine dönüştürülür ve ardından aşağıdaki kurallara göre bir dize olarak kodlanır.
- Değeri `[0x00, 0x7f]` (ondalık `[0, 127]`) aralığında olan tek bir bayt için, o bayt kendi RLP kodlamasıdır.
- Aksi takdirde, bir dize 0-55 bayt uzunluğundaysa, RLP kodlaması **0x80** (ondalık 128) değerine sahip tek bir bayt artı dizenin uzunluğu ve ardından dizenin kendisinden oluşur. Böylece ilk baytın aralığı `[0x80, 0xb7]` (ondalık `[128, 183]`) olur.
- Bir dize 55 bayttan uzunsa, RLP kodlaması **0xb7** (ondalık 183) değerine sahip tek bir bayt artı dizenin uzunluğunun ikili formdaki bayt cinsinden uzunluğu, ardından dizenin uzunluğu ve ardından dizenin kendisinden oluşur. Örneğin, 1024 bayt uzunluğundaki bir dize `\xb9\x04\x00` (ondalık `185, 4, 0`) ve ardından dize olarak kodlanır. Burada, ilk bayt olarak `0xb9` (183 + 2 = 185), ardından gerçek dizenin uzunluğunu belirten 2 baytlık `0x0400` (ondalık 1024) gelir. Böylece ilk baytın aralığı `[0xb8, 0xbf]` (ondalık `[184, 191]`) olur.
- Bir dize 2^64 bayt veya daha uzunsa kodlanamayabilir.
- Bir listenin toplam yükü (yani, RLP ile kodlanan tüm ögelerinin birleşik uzunluğu) 0-55 bayt uzunluğundaysa, RLP kodlaması **0xc0** değerine sahip tek bir bayt artı yükün uzunluğu ve ardından ögelerin RLP kodlamalarının birleştirilmesinden oluşur. Böylece ilk baytın aralığı `[0xc0, 0xf7]` (ondalık `[192, 247]`) olur.
- Bir listenin toplam yükü 55 bayttan uzunsa, RLP kodlaması **0xf7** değerine sahip tek bir bayt artı yükün uzunluğunun ikili formdaki bayt cinsinden uzunluğu, ardından yükün uzunluğu ve ardından ögelerin RLP kodlamalarının birleştirilmesinden oluşur. Böylece ilk baytın aralığı `[0xf8, 0xff]` (ondalık `[248, 255]`) olur.

Kısa formda:

| Aralık      | Bayt 1     | Bayt 2     | ...        | Bayt 9                | Bayt 10    | Anlamı                                    |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | tek baytlık dize                          |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | kısa dize (0-55 bayt)                     |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | uzun dize, uzunluk için N+1 bayt, ardından yük |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | kısa liste (0-55 bayt)                    |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | uzun liste, uzunluk için N+1 bayt, ardından yük |

- `p` = yük
- `n` = uzunluk (yük baytlarının sayısı)
- `N` = uzunluğun uzunluğu ofseti (N+1 `n` bayt takip eder)

Kodda bu şu şekildedir:

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

## Örnekler {#examples}

- "dog" dizesi = [ 0x83, 'd', 'o', 'g' ]
- [ "cat", "dog" ] listesi = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- boş dize ('null') = `[ 0x80 ]`
- boş liste = `[ 0xc0 ]`
- 0 tam sayısı = `[ 0x80 ]`
- '\x00' baytı = `[ 0x00 ]`
- '\x0f' baytı = `[ 0x0f ]`
- '\x04\x00' baytları = `[ 0x82, 0x04, 0x00 ]`
- üçün [küme teorik gösterimi](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers), `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- "Lorem ipsum dolor sit amet, consectetur adipisicing elit" dizesi = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## RLP kod çözme {#rlp-decoding}

RLP kodlama kurallarına ve sürecine göre, RLP kod çözme girdisi bir ikili veri dizisi olarak kabul edilir. RLP kod çözme süreci şu şekildedir:

1.  girdi verisinin ilk baytına (yani ön ekine) göre veri türünün, gerçek verinin uzunluğunun ve ofsetin kodunun çözülmesi;

2.  verinin türüne ve ofsetine göre, pozitif tam sayılar için minimal kodlama kuralına uyarak verinin kodunun buna uygun şekilde çözülmesi;

3.  girdinin geri kalanının kodunun çözülmeye devam edilmesi;

Bunlar arasında, veri türlerinin ve ofsetin kodunu çözme kuralları şu şekildedir:

1.  ilk baytın (yani ön ekin) aralığı [0x00, 0x7f] ise veri bir dizedir ve dize tam olarak ilk baytın kendisidir;

2.  ilk baytın aralığı [0x80, 0xb7] ise veri bir dizedir ve uzunluğu ilk bayt eksi 0x80'e eşit olan dize ilk baytı takip eder;

3.  ilk baytın aralığı [0xb8, 0xbf] ise veri bir dizedir ve bayt cinsinden uzunluğu ilk bayt eksi 0xb7'ye eşit olan dizenin uzunluğu ilk baytı takip eder ve dize de dizenin uzunluğunu takip eder;

4.  ilk baytın aralığı [0xc0, 0xf7] ise veri bir listedir ve toplam yükü ilk bayt eksi 0xc0'a eşit olan listenin tüm ögelerinin RLP kodlamalarının birleşimi ilk baytı takip eder;

5.  ilk baytın aralığı [0xf8, 0xff] ise veri bir listedir ve uzunluğu ilk bayt eksi 0xf7'ye eşit olan listenin toplam yükü ilk baytı takip eder ve listenin tüm ögelerinin RLP kodlamalarının birleşimi listenin toplam yükünü takip eder;

Kodda bu şu şekildedir:

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

## Daha fazla bilgi {#further-reading}

- [Ethereum'da RLP](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Arka planda Ethereum: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). ACL2'de Ethereum'un Özyinelemeli Uzunluk Ön Eki. arXiv ön baskısı arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## İlgili konular {#related-topics}

- [Patricia merkle ağacı](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)