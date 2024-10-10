---
title: Verkle ağaçları
description: Verkle ağaçlarının ve bunların, Ethereum'u yükseltmek için nasıl kullanılacağının yüksek seviyeli bir açıklaması
lang: tr
summaryPoints:
  - Verkle ağaçlarının ne olduğunu keşfedin
  - Verkle ağaçlarının Ethereum'un geliştirilmesinde neden kullanışlı olduğunu hakkındakileri okuyun
---

# Verkle ağaçları {#verkle-trees}

Verkle ağaçları ("Vektör taahhüdü" ve "Merkle Ağaçları"nın bir birleşimi), blokları doğrulama yeteneğini kaybetmeden büyük miktarda durum verisini depolamayı durdurabilmeleri için Ethereum düğümlerini yükseltmek adına kullanılabilecek bir veri yapısıdır.

## Durumsuzluk {#statelessness}

Verkle ağaçları, durumsuz Ethereum istemcilerine giden yolda kritik bir adım oluşturur. Durumsuz istemciler, gelen blokları doğrulamak için tüm durum veritabanını depolamak zorunda olmayan istemcilerdir. Daha ziyade, blokları doğrulamak için Ethereum durumunun kendi yerel kopyalarını kullanmak yerine, durumsuz istemciler, blokla birlikte gelen durum verilerine bir "tanık" kullanır. Tanık, belirli bir dizi işlemi gerçekleştirmek için gerekli olan durum verilerinin ayrı parçalarının bir koleksiyonudur ve tanığın gerçekten tüm verilerin bir parçası olduğunun kriptografik bir kanıtıdır. Tanık, durum veritabanının _yerine_ kullanılır. Bunun işe yaraması için, tanıkların çok küçük olması gerekir, böylece doğrulayıcıların bunları 12 saniyelik bir aralık içinde işlemesi için ağ üzerinden güvenli bir şekilde zamanında yayınlanabilirler. Tanıklar çok büyük olduğu için mevcut durum veri yapısı uygun değildir. Verkle ağaçları, durumsuz istemcilerin önündeki ana engellerden birini kaldırarak küçük tanıklar sağlayarak bu sorunu çözer.

<ExpandableCard title="Neden durumsuz istemciler istiyoruz?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Ethereum istemcileri şu anda durum verilerini depolamak için Patricia Merkle Ağaçları olarak bilinen bir veri yapısı kullanıyor. Bireysel hesaplarla ilgili bilgiler, trie'de yaprak olarak saklanır ve yaprak çiftleri, yalnızca tek bir karma kalana kadar tekrar tekrar karma haline getirilir. Bu son karma "kök" olarak bilinir. Blokları doğrulamak için, Ethereum istemcileri bir bloktaki tüm işlemleri yürütür ve yerel durum trie'lerini günceller. Yerel ağacın kökü, blok önerici tarafından sağlananla aynıysa blok geçerli kabul edilir çünkü blok önerici ile doğrulama düğümü tarafından yapılan hesaplamalardaki herhangi bir farklılık, kök karma değerinin tamamen farklı olmasına neden olur. Bununla ilgili sorun, blok zincirin doğrulanmasının her müşterinin ana blok ve birkaç geçmiş blok için tüm durum trie'sini saklamasını gerektirmesidir (Geth'teki varsayılan durum, başın arkasında 128 blok için durum verilerini tutmaktır). Bu, istemcilerin büyük miktarda disk alanına erişmesini gerektirir; bu da ucuz, düşük güçlü donanımlarda tam düğümleri çalıştırmanın önünde bir engeldir. Bunun bir çözümü, durum trie'sini, tam durum verileri yerine paylaşılabilecek verilere küçük bir "tanık" kullanılarak özetlenebilen daha verimli bir yapıya (Verkle ağacı) güncellemektir. Durum verilerinin bir Verkle ağacına yeniden biçimlendirilmesi, durumu olmayan istemcilere geçiş için bir basamaktır.

</ExpandableCard>

## Tanık nedir ve neden onlara ihtiyaç duyuyoruz? {#what-is-a-witness}

Bir bloku doğrulamak, blokta yer alan işlemleri yeniden yürütmek, değişiklikleri Ethereum'un durum trie'sine uygulamak ve yeni kök karmasını hesaplamak anlamına gelir. Doğrulanmış bir blok, hesaplanan durum kök karması, blokla birlikte sağlananla aynı olan bloktur (çünkü bu, blok önericinin gerçekten yaptığını söylediği hesaplamayı yaptığı anlamına gelir). Günümüzün Ethereum istemcilerinde, durumu güncellemek, yerel olarak depolanması gereken büyük bir veri yapısı olan tüm durum trie'sine erişim gerektirir. Tanık, yalnızca bloktaki işlemleri yürütmek için gerekli olan durum verilerinin parçalarını içerir. Bir doğrulayıcı, blok öneren kişinin blok işlemlerini yürüttüğünü ve durumu doğru bir şekilde güncellediğini doğrulamak için yalnızca bu parçaları kullanabilir. Bununla birlikte bu, tanığın Ethereum ağındaki eşler arasında, 12 saniyelik bir yuva içinde her bir düğüm tarafından güvenli bir şekilde alınması ve işlenmesi için yeterince hızlı aktarılması gerektiği anlamına gelir. Tanık çok büyükse, bazı düğümlerin onu indirmesi ve zincire ayak uydurması çok uzun sürebilir. Bu, merkezileştirici bir güçtür çünkü yalnızca hızlı internet bağlantılarına sahip düğümlerin doğrulama bloklarına katılabileceği anlamına gelir. Verkle ağaçları ile durumun sabit sürücünüzde saklanmasına gerek yoktur; bir bloku doğrulamak için ihtiyacınız olan _her şey_, blokun içinde yer alır. Ne yazık ki, Merkle ağaçlarında üretilebilen tanıklar, vatansız müvekkilleri desteklemek için çok fazla.

## Verkle ağaçları neden daha küçük tanıklara olanak sağlıyor? {#why-do-verkle-trees-enable-smaller-witnesses}

Bir Merkle Ağacı'nın yapısı tanık boyutlarını çok büyük yapar - 12 saniyelik bir aralık içinde eşler arasında güvenli bir şekilde yayın yapmak için çok büyük. Bunun nedeni, tanığın yapraklarda tutulan verileri kök karmaya bağlayan bir yol olmasıdır. Verileri doğrulamak için, yalnızca her yaprağı köke bağlayan tüm ara karmalara değil, aynı zamanda tüm "kardeş" düğümlere de sahip olmak gerekir. Kanıttaki her düğüm, trie'deki bir sonraki karmayı oluşturmak için karma hale getirilen bir kardeşe sahiptir. Bu çok fazla veri demektir. Verkle ağaçları, ağacın yaprakları ile kökü arasındaki mesafeyi kısaltarak ve ayrıca kök karmasını doğrulamak için kardeş düğümler sağlama ihtiyacını ortadan kaldırarak tanık boyutunu azaltır. Karma tarzı vektör taahhüdü yerine güçlü bir polinomik taahhüt şeması kullanılarak daha da fazla alan verimliliği elde edilecektir. Polinomik taahhüt, kanıtladığı yaprak sayısından bağımsız olarak tanığın sabit bir boyuta sahip olmasını sağlar.

Polinomik taahhüt şeması altında tanıklar, eşler arası ağda kolayca aktarılabilen yönetilebilir boyutlara sahiptir. Bu, istemcilerin her bloktaki durum değişikliklerini minimum miktarda veri ile doğrulamasına olanak tanır.

<ExpandableCard title="Verkle ağaçları tanık boyutunu ne kadar azaltabilir?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Tanık boyutu, içerdiği yaprak sayısına göre değişir. Tanığın 1000 yaprak kapsadığını varsayarsak, bir Merkle trie için bir tanık yaklaşık 3,5 MB olur (tablonun 7 seviye olduğu varsayılır). Bir Verkle ağacında (ağaçta 4 seviye olduğu varsayılarak) aynı veri için bir tanık yaklaşık 150 kB olacaktır - **yaklaşık 23 kat daha küçük**. Tanık boyutundaki bu azalma, vatansız müvekkil tanıklarının kabul edilebilir ölçüde küçük olmasını sağlayacaktır. Polinomik tanıklar, hangi özel polinom taahhüdünün kullanıldığına bağlı olarak 0,128 -1 kB arasındadır.

</ExpandableCard>

## Verkle ağacının yapısı nedir? {#what-is-the-structure-of-a-verkle-tree}

Verkle ağaçları `(anahtar,değer)` çiftleridir; burada anahtarlar, 31 baytlık bir _gövde_ ve tek baytlık bir _son ek_ içeren 32 baytlık öğelerdir. Bu anahtarlar, _uzantı_ düğümleri ve _iç_ düğümler halinde düzenlenmiştir. Uzatma düğümleri, farklı eklere sahip 256 tohum için tek bir kökü temsil eder. İç düğümlerin de 256 tohumu vardır, ancak bunlar diğer uzantı düğümleri olabilir. Verkle ağacı ile Merkle ağacı yapısı arasındaki temel fark, Verkle ağacının çok daha düz olmasıdır, yani bir yaprağı köke bağlayan daha az ara düğüm vardır ve bu nedenle kanıt oluşturmak için daha az veri gerekir.

![](./verkle.png)

[Verkle ağaçlarının yapısı hakkında daha fazlasını okuyun](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Güncel ilerleme {#current-progress}

Verkle ağacı test ağları zaten aktif ve çalışıyor, ancak Verkle ağaçlarını desteklemek için gerekli olan istemciler için önemli güncellemeler hâlâ var. Test ağlarında sözleşme dağıtarak veya test ağı istemcilerini yürüterek gelişimin hızlanmasına yardımcı olabilirsiniz.

[Verkle Gen Devnet 2 test ağını keşfedin](https://verkle-gen-devnet-2.ethpandaops.io/)

[Guillaume Ballet'yi Condrieu Verkle test ağını açıklarken izleyin](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (Condrieu test ağının iş ispatı olduğunu ve artık yerini Verkle Gen Devnet 2 test ağının aldığını unutmayın).

## Daha fazla bilgi {#further-reading}

- [Durumsuzluk için Verkle Ağaçları](https://verkle.info/)
- [Dankrad Feist PEEPanEIP'de Verkle ağaçlarını açıklıyor](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet ETHGlobal'de Verkle ağaçlarını açıklıyor](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Verkle ağaçları Ethereum'u nasıl yalın ve anlamlı kılar", Devcon 6'da Guillaume Ballet](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Durumsuz müşteriler, ETHDenver 2020'den Piper Merriam](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest, Sıfır Bilgi podcast'inde Verkle ağaçlarını ve durumsuzluğu açıklıyor](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Verkle ağaçları, Vitalik Buterin](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Verkle ağaçları, Dankrad Feist](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Verkle ağacı EIP Belgeleri](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
