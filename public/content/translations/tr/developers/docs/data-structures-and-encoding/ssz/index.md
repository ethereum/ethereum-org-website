---
title: Basit serileştirme
description: Ethereum'un SSZ biçiminin açıklaması.
lang: tr
sidebarDepth: 2
---

**Basit serileştirme (SSZ)**, İşaret Zincirinde kullanılan serileştirme yöntemidir. Bu, yürütüm katmanında kullanılan RLP serileştirmesini, eş keşif protokolü hariç fikir birliği katmanının tamamında değiştirir. SSZ, belirleyici ve aynı zamanda Merkle işlemini verimli bir şekilde gerçekleştirebilecek şekilde tasarlanmıştır. SSZ'nin iki bileşeni olduğu düşünülebilir: bir serileştirme şeması ve serileştirilmiş veri yapısıyla etkili bir şekilde çalışacak şekilde tasarlanmış bir Merkle işlemi şeması.

## SSZ nasıl çalışır? {#how-does-ssz-work}

### Serileştirme {#serialization}

SSZ, kendini tanımlamayan bir serileştirme şemasıdır; aksine önceden bilinmesi gereken bir şemaya dayanır. SSZ serileştirmesinin amacı, nesneleri keyfi karmaşıklıkta bayt dizeleri olarak temsil etmektir. Bu, "temel tipler" için oldukça basit bir süreçtir. Öğe, onaltılık baytlara dönüştürülür. Temel tipler şunlardır:

- işaretsiz tam sayılar
- Boole değerleri

Karmaşık "bileşik" tipler için serileştirme daha karmaşıktır çünkü bileşik tip, farklı türleri veya farklı boyutları olan birden çok öğeyi veya her ikisini birden içerebilir. Bu nesnelerin hepsi sabit uzunluklara sahipse (yani öğelerin boyutu her zaman gerçek değerlerine bakılmaksızın sabitse) serileştirme, bileşik tipteki her bir öğenin küçük uçlu bayt dizisine dönüştürülmesinden ibarettir. Bu bayt dizileri bir araya getirilir. Serileştirilmiş nesne, sabit uzunluktaki öğelerin bayt listesi temsilini, seri halden çıkarılan nesnede görünen sıra ile aynı düzende içerir.

Değişken uzunluğa sahip tipler için gerçek veri, serileştirilmiş nesnede o öğenin konumunda bir "kayma" değeri ile değiştirilir. Gerçek veri, serileştirilmiş nesnenin sonunda bir yığına eklenir. Kayma değeri, gerçek verinin yığındaki başlangıç noktasının indeksi olup ilgili baytları gösteren bir işaretçi olarak görev yapar.

Aşağıdaki örnek, hem sabit hem de değişken uzunluktaki öğelere sahip bir kapsayıcı için dengelemenin nasıl çalıştığını gösterir:

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

`serialized` aşağıdaki yapıya sahip olacaktır ( burada sadece 4 bite doldurulmuş, gerçekte 32 bite doldurulur, `int` gösterimi açıklık amacıyla tutulur):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset for    number 3    value for
                              vector                   vector

```

açıklık sağlamak için çizgilere bölünmüştür:

```
[
  37, 0, 0, 0,  # little-endian encoding of `number1`.
  55, 0, 0, 0,  # little-endian encoding of `number2`.
  16, 0, 0, 0,  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  22, 0, 0, 0,  # little-endian encoding of `number3`.
  1, 2, 3, 4,   # The actual values in `vector`.
]
```

Bu hala bir basitleştirmedir; yukarıdaki şemaladaki tam sayılar ve sıfırlar aslında aşağıdaki gibi bayt listeleri olarak depolanır:

```
[
  10100101000000000000000000000000  # little-endian encoding of `number1`
  10110111000000000000000000000000  # little-endian encoding of `number2`.
  10010000000000000000000000000000  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  10010110000000000000000000000000  # little-endian encoding of `number3`.
  10000001100000101000001110000100   # The actual value of the `bytes` field.
]
```

Bu nedenle, değişken uzunluktaki tiplerin gerçek değerleri, serileştirilmiş nesnenin sonunda bir yığında saklanır ve kaymaları, sıralı alan listesinde doğru pozisyonlarında depolanır.

Ayrıca, `BitList` türü gibi özel muamele gerektiren bazı durumlar da bulunur. Bu durumlar, serileştirmede uzunluk sınırlamasının eklenmesini ve seri halden çıkarma sırasında kaldırılmasını gerektirir. Detaylı bilgiler [SSZ spesifikasyonunda](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md) mevcuttur.

### Seri durumdan çıkarma {#deserialization}

Bu nesneyi seri durumdan çıkarmak için <b>şema</b> gereklidir. Şema, serileştirilmiş verinin kesin düzenini tanımlar, böylece her bir özel öğe, bayt grubundan anlamlı bir nesneye, öğelerin doğru türüne, değerine, boyutuna ve konumuna sahip şekilde seri halden çıkarılabilir. Şema, hangi değerlerin gerçek değerler olduğunu ve hangi değerlerin kayma olduğunu seri durumdan çıkarıcıya bildiren unsurdur. Bir nesne serileştirildiğinde tüm alan adları kaybolur ancak bunlar, seri halden çıkarma sırasında şemaya göre tekrar oluşturulur.

Bu konuyla ilgili interaktif bir açıklamayı [ssz.dev](https://www.ssz.dev/overview) adresinde bulabilirsiniz.

## Merkle işlemini gerçekleştirme {#merkleization}

Bu SSZ serileştirilmiş nesnesi, daha sonra aynı verinin bir Merkle ağacı gösterimine dönüştürülebilir. İlk olarak, serileştirilmiş nesnedeki 32 baytlık parçaların sayısı belirlenir. Bunlar, ağacın "yaprakları"dır. Toplam yaprak sayısı, yaprakları karma hale getirerek sonunda tek bir karma ağaç kökü üretmek için 2'nin bir katı olmalıdır. Eğer bu doğal olarak böyle değilse, 32 baytlık sıfırlar içeren ekstra yapraklar eklenir. Diyagram olarak ifade etmek gerekirse:

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

Ağacın yapraklarının, yukarıdaki örnekte olduğu gibi doğal olarak eşit şekilde dağılmadığı durumlar da vardır. Örneğin yaprak 4, Merkle ağacına ilave "derinlik" eklenmesini gerektiren ve dolayısıyla eşit olmayan bir ağaç oluşmasına yol açan birden fazla öğeye sahip bir kapsayıcı olabilir.

Bu ağaç öğelerine yaprak X, düğüm X gibi isimler yerine genelleştirilmiş indeksler verebiliriz. Bu, kök = 1 ile başlayan ve her seviyede soldan sağa sayılan genelleştirilmiş indekslerle yapılır. Bu, yukarıda açıklanan genelleştirilmiş indekstir. Serileştirilmiş listedeki her öğenin, `2**depth + idx`'e eşit bir genelleştirilmiş dizini vardır; burada idx, serileştirilmiş nesnedeki sıfır dizinli konumudur ve derinlik, Merkle ağacındaki düzey sayısıdır ve öğe (yaprak) sayısının iki tabanındaki logaritması olarak belirlenebilir.

## Genelleştirilmiş indeksler {#generalized-indices}

Bir genelleştirilmiş indeks, her düğümün bir genelleştirilmiş indeksi temsil ettiği ikili bir Merkle ağacındaki bir düğümü temsil eden tam sayıdır, burada her düğümün genelleştirilmiş indeksi `2 ** depth + index in row` şeklindedir.

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Bu gösterim, Merkle ağacındaki her bir veri parçası için bir düğüm oluşturur.

## Çoklu kanıtlar {#multiproofs}

Belirli bir öğeyi temsil eden genelleştirilmiş endekslerin listesini sağlamak, onu karma ağaç kökü ile karşılaştırarak doğrulamamıza olanak tanır. Bu kök, gerçekliğin kabul edilmiş versiyonudur. Sağladığımız herhangi bir veri, Merkle ağacında (genelleştirilmiş indeksi tarafından belirlenir) doğru yere yerleştirilerek ve kökün sabit kaldığı gözlemlenerek bu gerçekliğe karşı doğrulanabilir. Belirli bir genelleştirilmiş indeks kümesinin içeriğini doğrulamak için gereken en küçük düğüm kümesini hesaplamak için [burada](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) spesifikasyon içinde özel fonksiyonlar bulunmaktadır.

Örneğin, aşağıdaki ağaçta indeks 9'daki verileri doğrulamak için 8, 9, 5, 3, 1 indekslerindeki verilerin özetine ihtiyacımız vardır. (8,9) karmasının karma (4) ile eşit olması gerekir, bu, 5 ile karma hale getirilerek 2 elde edilir ve bu da 3 ile karma hale getirilerek ağaç kökü 1 elde edilir. 9 için yanlış veri sağlanırsa, kök de değişir; bunu tespit eder ve dalı doğrulayamayız.

```
* = data required to generate proof

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Daha fazla okuma {#further-reading}

- [Ethereum'u Yükseltme: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Ethereum'u Yükseltme: Merkle İşlemi](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [SSZ uygulamaları](https://github.com/ethereum/consensus-specs/issues/2138)
- [SSZ hesaplayıcısı](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
