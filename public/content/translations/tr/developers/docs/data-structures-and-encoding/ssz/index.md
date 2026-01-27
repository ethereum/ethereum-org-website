---
title: "Basit serileştirme"
description: "Ethereum'un SSZ biçiminin açıklaması."
lang: tr
sidebarDepth: 2
---

**Basit serileştirme (SSZ)**, İşaret Zinciri'nde kullanılan serileştirme yöntemidir. Bu, yürütüm katmanında kullanılan RLP serileştirmesini, eş keşif protokolü hariç fikir birliği katmanının tamamında değiştirir. RLP serileştirmesi hakkında daha fazla bilgi edinmek için [Özyinelemeli uzunluk ön eki (RLP)](/developers/docs/data-structures-and-encoding/rlp/) konusuna bakın. SSZ, belirleyici ve aynı zamanda Merkle işlemini verimli bir şekilde gerçekleştirebilecek şekilde tasarlanmıştır. SSZ'nin iki bileşeni olduğu düşünülebilir: bir serileştirme şeması ve serileştirilmiş veri yapısıyla etkili bir şekilde çalışacak şekilde tasarlanmış bir Merkle işlemi şeması.

## SSZ nasıl çalışır? {#how-does-ssz-work}

### Serileştirme {#serialization}

SSZ, kendini tanımlamayan bir serileştirme şemasıdır; aksine önceden bilinmesi gereken bir şemaya dayanır. SSZ serileştirmesinin amacı, nesneleri keyfi karmaşıklıkta bayt dizeleri olarak temsil etmektir. Bu, "temel tipler" için oldukça basit bir süreçtir. Öğe, onaltılık baytlara dönüştürülür. Temel tipler şunlardır:

- işaretsiz tam sayılar
- Boole değerleri

Karmaşık "bileşik" tipler için serileştirme daha karmaşıktır çünkü bileşik tip, farklı türleri veya farklı boyutları olan birden çok öğeyi veya her ikisini birden içerebilir. Bu nesnelerin tümünün sabit uzunluklara sahip olduğu durumlarda (yani, öğelerin boyutu gerçek değerlerinden bağımsız olarak her zaman sabitse), serileştirme, bileşik türdeki her bir öğenin sıralı olarak little-endian bayt dizelerine dönüştürülmesinden ibarettir. Bu bayt dizileri bir araya getirilir. Serileştirilmiş nesne, sabit uzunluktaki öğelerin bayt listesi temsilini, seri halden çıkarılan nesnede görünen sıra ile aynı düzende içerir.

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

`serialized` aşağıdaki yapıya sahip olacaktır (burada sadece 4 bite doldurulmuş, gerçekte 32 bite doldurulur ve `int` gösterimi açıklık amacıyla tutulur):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    vektör için   number3     vektör için
                               ofset                     değer

```

açıklık sağlamak için çizgilere bölünmüştür:

```
[
  37, 0, 0, 0,  # `number1`'in little-endian kodlaması.
  55, 0, 0, 0,  # `number2`'nin little-endian kodlaması.
  16, 0, 0, 0,  # `vector` değerinin nerede başladığını gösteren "ofset" (little-endian 16).
  22, 0, 0, 0,  # `number3`'ün little-endian kodlaması.
  1, 2, 3, 4,   # `vector` içindeki gerçek değerler.
]
```

Bu hala bir basitleştirmedir; yukarıdaki şemaladaki tam sayılar ve sıfırlar aslında aşağıdaki gibi bayt listeleri olarak depolanır:

```
[
  10100101000000000000000000000000  # `number1`'in little-endian kodlaması
  10110111000000000000000000000000  # `number2`'nin little-endian kodlaması.
  10010000000000000000000000000000  # `vector` değerinin nerede başladığını gösteren "ofset" (little-endian 16).
  10010110000000000000000000000000  # `number3`'ün little-endian kodlaması.
  10000001100000101000001110000100   # `bytes` alanının gerçek değeri.
]
```

Bu nedenle, değişken uzunluktaki tiplerin gerçek değerleri, serileştirilmiş nesnenin sonunda bir yığında saklanır ve kaymaları, sıralı alan listesinde doğru pozisyonlarında depolanır.

Ayrıca, serileştirme sırasında bir uzunluk sınırı eklenmesini ve seri halden çıkarma sırasında kaldırılmasını gerektiren `BitList` türü gibi özel işlem gerektiren bazı durumlar da bulunur. Tüm ayrıntılar [SSZ belirtiminde](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md) mevcuttur.

### Seriden Çıkarma {#deserialization}

Bu nesneyi seri durumdan çıkarmak için <b>şema</b> gereklidir. Şema, serileştirilmiş verinin kesin düzenini tanımlar, böylece her bir özel öğe, bayt grubundan anlamlı bir nesneye, öğelerin doğru türüne, değerine, boyutuna ve konumuna sahip şekilde seri halden çıkarılabilir. Şema, hangi değerlerin gerçek değerler olduğunu ve hangi değerlerin kayma olduğunu seri durumdan çıkarıcıya bildiren unsurdur. Bir nesne serileştirildiğinde tüm alan adları kaybolur ancak bunlar, seri halden çıkarma sırasında şemaya göre tekrar oluşturulur.

Bu konuyla ilgili etkileşimli bir açıklama için [ssz.dev](https://www.ssz.dev/overview) adresine bakın.

## Merkle'laştırma {#merkleization}

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

Bu ağaç öğelerine yaprak X, düğüm X gibi isimler yerine genelleştirilmiş indeksler verebiliriz. Bu, kök = 1 ile başlayan ve her seviyede soldan sağa sayılan genelleştirilmiş indekslerle yapılır. Bu, yukarıda açıklanan genelleştirilmiş indekstir. Serileştirilmiş listedeki her öğenin `2**depth + idx`'e eşit bir genelleştirilmiş dizini vardır. Burada `idx`, serileştirilmiş nesnedeki sıfır dizinli konumunu, `depth` ise Merkle ağacındaki seviye sayısını belirtir. Derinlik, öğe (yaprak) sayısının iki tabanlı logaritması olarak belirlenebilir.

## Genelleştirilmiş dizinler {#generalized-indices}

Genelleştirilmiş dizin, ikili bir Merkle ağacındaki bir düğümü temsil eden bir tam sayıdır; bu ağaçta her düğümün `2 ** depth + sıradaki dizin` şeklinde bir genelleştirilmiş dizini vardır.

```
        1           --derinlik = 0  2**0 + 0 = 1
    2       3       --derinlik = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --derinlik = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Bu gösterim, Merkle ağacındaki her bir veri parçası için bir düğüm oluşturur.

## Çoklu kanıtlar {#multiproofs}

Belirli bir öğeyi temsil eden genelleştirilmiş endekslerin listesini sağlamak, onu karma ağaç kökü ile karşılaştırarak doğrulamamıza olanak tanır. Bu kök, gerçekliğin kabul edilmiş versiyonudur. Sağladığımız herhangi bir veri, Merkle ağacında (genelleştirilmiş indeksi tarafından belirlenir) doğru yere yerleştirilerek ve kökün sabit kaldığı gözlemlenerek bu gerçekliğe karşı doğrulanabilir. Belirtimde [burada](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs), belirli bir genelleştirilmiş dizinler kümesinin içeriğini doğrulamak için gereken en küçük düğüm kümesinin nasıl hesaplanacağını gösteren işlevler bulunmaktadır.

Örneğin, aşağıdaki ağaçta indeks 9'daki verileri doğrulamak için 8, 9, 5, 3, 1 indekslerindeki verilerin özetine ihtiyacımız vardır.
(8,9) karmasının karma (4) ile eşit olması gerekir, bu, 5 ile karma hale getirilerek 2 elde edilir ve bu da 3 ile karma hale getirilerek ağaç kökü 1 elde edilir. 9 için yanlış veri sağlanırsa, kök de değişir; bunu tespit eder ve dalı doğrulayamayız.

```
* = kanıt oluşturmak için gereken veriler

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Daha fazla kaynak {#further-reading}

- [Ethereum'u Yükseltme: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Ethereum'u Yükseltme: Merkle'laştırma](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [SSZ uygulamaları](https://github.com/ethereum/consensus-specs/issues/2138)
- [SSZ hesaplayıcı](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
