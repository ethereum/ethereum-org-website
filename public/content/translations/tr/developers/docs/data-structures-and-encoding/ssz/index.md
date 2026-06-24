---
title: "Basit serileştirme"
description: "Ethereum'un SSZ formatının açıklaması."
lang: tr
sidebarDepth: 2
---

**Basit serileştirme (SSZ)**, İşaret zinciri üzerinde kullanılan serileştirme yöntemidir. Eş keşif protokolü hariç, mutabakat katmanının her yerinde yürütme katmanında kullanılan RLP serileştirmesinin yerini alır. RLP serileştirmesi hakkında daha fazla bilgi edinmek için bkz. [Özyinelemeli uzunluk öneki (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ, deterministik olacak ve aynı zamanda verimli bir şekilde Merkleize edilecek (Merkle ağacına dönüştürülecek) şekilde tasarlanmıştır. SSZ'nin iki bileşeni olduğu düşünülebilir: bir serileştirme şeması ve serileştirilmiş veri yapısıyla verimli bir şekilde çalışmak üzere tasarlanmış bir Merkleizasyon şeması.

## SSZ nasıl çalışır? {#how-does-ssz-work}

### Serileştirme {#serialization}

SSZ, kendi kendini tanımlamayan bir serileştirme şemasıdır; bunun yerine önceden bilinmesi gereken bir şemaya dayanır. SSZ serileştirmesinin amacı, rastgele karmaşıklıktaki nesneleri bayt dizileri olarak temsil etmektir. Bu, "temel türler" için çok basit bir işlemdir. Öğe basitçe onaltılık (hexadecimal) baytlara dönüştürülür. Temel türler şunları içerir:

- işaretsiz tam sayılar
- Boolean'lar (mantıksal değerler)

Karmaşık "bileşik" türler için serileştirme daha karmaşıktır çünkü bileşik tür, farklı türlere veya farklı boyutlara ya da her ikisine birden sahip olabilen birden fazla öğe içerir. Bu nesnelerin hepsinin sabit uzunluklara sahip olduğu durumlarda (yani, öğelerin boyutu gerçek değerlerinden bağımsız olarak her zaman sabit kalacaktır), serileştirme işlemi basitçe bileşik türdeki her bir öğenin little-endian (küçük sonlu) bayt dizilerine dönüştürülerek sıralanmasıdır. Bu bayt dizileri birbirine eklenir. Serileştirilmiş nesne, sabit uzunluklu öğelerin bayt listesi temsilini, serileştirmeden çıkarılmış (deserialized) nesnede göründükleri sırayla içerir.

Değişken uzunluklu türler için, serileştirilmiş nesnedeki o öğenin konumunda gerçek verilerin yerini bir "sapma" (offset) değeri alır. Gerçek veriler, serileştirilmiş nesnenin sonundaki bir yığına (heap) eklenir. Sapma değeri, yığındaki gerçek verilerin başlangıcı için bir endekstir ve ilgili baytlara bir işaretçi görevi görür.

Aşağıdaki örnek, hem sabit hem de değişken uzunluklu öğelere sahip bir kapsayıcı için sapma işleminin nasıl çalıştığını göstermektedir:

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

`serialized` aşağıdaki yapıya sahip olacaktır (burada yalnızca 4 bite doldurulmuştur, gerçekte 32 bite doldurulur ve netlik için `int` temsili korunmuştur):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
    sayı1         sayı2     vektör için    sayı 3    vektör için
                               sapma                    değer
```

netlik için satırlara bölünmüştür:

```
[
  37, 0, 0, 0,  # `number1` değerinin little-endian kodlaması.
  55, 0, 0, 0,  # `number2` değerinin little-endian kodlaması.
  16, 0, 0, 0,  # `vector` değerinin nerede başladığını gösteren "sapma" (little-endian 16).
  22, 0, 0, 0,  # `number3` değerinin little-endian kodlaması.
  1, 2, 3, 4,   # `vector` içindeki gerçek değerler.
]
```

Bu hala bir basitleştirmedir; yukarıdaki şemalardaki tam sayılar ve sıfırlar aslında şu şekilde bayt listeleri olarak saklanacaktır:

```
[
  10100101000000000000000000000000  # `number1` değerinin little-endian kodlaması
  10110111000000000000000000000000  # `number2` değerinin little-endian kodlaması.
  10010000000000000000000000000000  # `vector` değerinin nerede başladığını gösteren "sapma" (little-endian 16).
  10010110000000000000000000000000  # `number3` değerinin little-endian kodlaması.
  10000001100000101000001110000100   # `bytes` alanının gerçek değeri.
]
```

Yani değişken uzunluklu türlerin gerçek değerleri, serileştirilmiş nesnenin sonundaki bir yığında saklanırken, sapmaları sıralı alanlar listesindeki doğru konumlarında saklanır.

Serileştirme sırasında bir uzunluk sınırının eklenmesini ve serileştirmeden çıkarma sırasında kaldırılmasını gerektiren `BitList` türü gibi özel işlem gerektiren bazı özel durumlar da vardır. Tüm detaylar [SSZ spesifikasyonunda](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md) mevcuttur.

### Serileştirmeden Çıkarma {#deserialization}

Bu nesneyi serileştirmeden çıkarmak için <b>şema</b> gereklidir. Şema, serileştirilmiş verilerin kesin düzenini tanımlar, böylece her bir belirli öğe bir bayt blob'undan doğru türe, değere, boyuta ve konuma sahip öğelerle anlamlı bir nesneye dönüştürülebilir. Serileştirmeden çıkarıcıya hangi değerlerin gerçek değerler ve hangilerinin sapma olduğunu söyleyen şemadır. Bir nesne serileştirildiğinde tüm alan adları kaybolur, ancak şemaya göre serileştirmeden çıkarma sırasında yeniden oluşturulur.

Bu konuda etkileşimli bir açıklama için [ssz.dev](https://www.ssz.dev/overview) adresine bakın.

## Merkleizasyon {#merkleization}

Bu SSZ serileştirilmiş nesnesi daha sonra merkleize edilebilir; yani aynı verilerin bir Merkle ağacı temsiline dönüştürülebilir. İlk olarak, serileştirilmiş nesnedeki 32 baytlık parçaların sayısı belirlenir. Bunlar ağacın "yapraklarıdır". Yaprakların birlikte hashlenmesinin sonunda tek bir hash ağacı kökü (hash-tree-root) üretmesi için toplam yaprak sayısı 2'nin bir kuvveti olmalıdır. Eğer doğal olarak durum böyle değilse, 32 baytlık sıfırlar içeren ek yapraklar eklenir. Şematik olarak:

```
hash ağacı kökü
            /     \
           /       \
          /         \
         /           \
   yaprakların hashi  yaprakların hashi
        1 ve 2             3 ve 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 yaprak1   yaprak2 yaprak3   yaprak4
```

Ağacın yapraklarının yukarıdaki örnekte olduğu gibi doğal olarak eşit bir şekilde dağılmadığı durumlar da vardır. Örneğin, yaprak 4, Merkle ağacına ek "derinlik" eklenmesini gerektiren ve düzensiz bir ağaç oluşturan birden fazla öğeye sahip bir kapsayıcı olabilir.

Bu ağaç öğelerine yaprak X, düğüm X vb. olarak atıfta bulunmak yerine, kök = 1'den başlayarak ve her seviye boyunca soldan sağa doğru sayarak onlara genelleştirilmiş endeksler verebiliriz. Yukarıda açıklanan genelleştirilmiş endeks budur. Serileştirilmiş listedeki her öğe, `2**depth + idx` değerine eşit genelleştirilmiş bir endekse sahiptir; burada idx, serileştirilmiş nesnedeki sıfır endeksli konumudur ve derinlik, öğe (yaprak) sayısının iki tabanına göre logaritması olarak belirlenebilen Merkle ağacındaki seviye sayısıdır.

## Genelleştirilmiş endeksler {#generalized-indices}

Genelleştirilmiş bir endeks, her düğümün `2 ** depth + index in row` genelleştirilmiş endeksine sahip olduğu ikili bir Merkle ağacındaki bir düğümü temsil eden bir tam sayıdır.

```
1           --derinlik = 0  2**0 + 0 = 1
    2       3       --derinlik = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --derinlik = 2  2**2 + 0 = 4, 2**2 + 1 = 5...
```

Bu temsil, Merkle ağacındaki her bir veri parçası için bir düğüm endeksi verir.

## Çoklu kanıtlar (Multiproofs) {#multiproofs}

Belirli bir öğeyi temsil eden genelleştirilmiş endekslerin listesini sağlamak, onu hash ağacı köküne karşı doğrulamamıza olanak tanır. Bu kök, bizim kabul ettiğimiz gerçeklik versiyonudur. Bize sağlanan herhangi bir veri, Merkle ağacında doğru yere (genelleştirilmiş endeksi tarafından belirlenir) yerleştirilerek ve kökün sabit kaldığı gözlemlenerek bu gerçekliğe karşı doğrulanabilir. Spesifikasyonda [burada](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs), belirli bir genelleştirilmiş endeks kümesinin içeriğini doğrulamak için gereken minimum düğüm kümesinin nasıl hesaplanacağını gösteren işlevler bulunmaktadır.

Örneğin, aşağıdaki ağaçta 9. endeksteki verileri doğrulamak için 8, 9, 5, 3, 1 endekslerindeki verilerin hash'ine ihtiyacımız var.
(8,9)'un hash'i, 2'yi üretmek için 5 ile hashlenen ve ağaç kökü 1'i üretmek için 3 ile hashlenen hash (4)'e eşit olmalıdır. 9 için yanlış veri sağlanmış olsaydı, kök değişirdi; bunu tespit ederdik ve dalı doğrulayamazdık.

```
* = kanıt oluşturmak için gereken veri

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15
```

## Daha fazla bilgi {#further-reading}

- [Ethereum'u Yükseltmek: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Ethereum'u Yükseltmek: Merkleizasyon](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [SSZ uygulamaları](https://github.com/ethereum/consensus-specs/issues/2138)
- [SSZ hesaplayıcısı](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)