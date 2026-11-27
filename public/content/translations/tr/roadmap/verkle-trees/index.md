---
title: "Verkle Ağaçları"
description: "Verkle Ağaçlarının üst düzey bir açıklaması ve Ethereum'un durum ağacı planlarının neden ikili bir ağaca geçtiği"
lang: tr
template: roadmap
summaryPoints:
  - Verkle Ağaçlarının ne olduğunu keşfedin
  - Verkle Ağaçlarının neden ikili bir ağaç lehine bir kenara bırakıldığını okuyun
---

Verkle Ağaçları ("Vektör taahhüdü" (Vector commitment) ve "Merkle Ağaçları"nın (Merkle Trees) birleşimi), [Ethereum](/) düğümlerini blokları doğrulama yeteneklerini kaybetmeden büyük miktarda durum verisi depolamayı bırakabilmeleri için yükseltmek amacıyla kullanılabilecek bir veri yapısıdır.

Verkle Ağaçları, [EIP-6800](https://eips.ethereum.org/EIPS/eip-6800) içinde Ethereum'un bir sonraki durum ağacı olarak teklif edildi, ancak bu teklif şu anda durgun ve birleşik bir ikili ağaç ([EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)) lehine bir kenara bırakıldı. İkili ağaç, durumsuz istemciler için küçük tanıklar sağlama şeklindeki aynı hedefi takip eder. Bu sayfa, Verkle Ağaçlarının nasıl çalıştığını ve araştırmanın neden ikili bir ağaca kaydığını açıklamaktadır.

## Durumsuzluk {#statelessness}

Verkle Ağaçları, durumsuz Ethereum istemcilerine giden yolda bir adım olarak tasarlandı. Durumsuz istemciler, gelen blokları doğrulamak için tüm durum veritabanını depolamak zorunda olmayan istemcilerdir. Durumsuz istemciler, blokları doğrulamak için Ethereum'un durumunun kendi yerel kopyalarını kullanmak yerine, blokla birlikte gelen durum verilerine ait bir "tanık" kullanırlar. Bir tanık, belirli bir işlem kümesini yürütmek için gereken durum verilerinin tek tek parçalarının bir koleksiyonu ve tanığın gerçekten tam verinin bir parçası olduğuna dair kriptografik bir kanıttır. Tanık, durum veritabanı _yerine_ kullanılır. Bunun çalışması için, tanıkların çok küçük olması gerekir, böylece doğrulayıcıların onları 12 saniyelik bir slot içinde işleyebilmesi için ağ üzerinden zamanında güvenli bir şekilde yayınlanabilirler. Mevcut durum veri yapısı uygun değildir çünkü tanıklar çok büyüktür. Verkle Ağaçları, küçük tanıklara olanak tanıyarak bu sorunu çözer ve durumsuz istemcilerin önündeki ana engellerden birini ortadan kaldırır.

<ExpandableCard title="Neden durumsuz istemciler istiyoruz?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Ethereum istemcileri şu anda durum verilerini depolamak için Patricia Merkle Ağacı (Patricia Merkle Trie) olarak bilinen bir veri yapısı kullanmaktadır. Bireysel hesaplar hakkındaki bilgiler ağaçtaki yapraklarda saklanır ve 16'ya kadar alt öğesi olabilen her bir dal düğümü, yalnızca tek bir hash kalana kadar seviye seviye alt öğelerinin hash'leriyle birlikte hash'lenir. Bu son hash "kök" olarak bilinir. Blokları doğrulamak için Ethereum istemcileri bir bloktaki tüm işlemleri yürütür ve yerel durum ağaçlarını günceller. Yerel ağacın kökü, blok teklifçisi tarafından sağlananla aynıysa blok geçerli kabul edilir, çünkü blok teklifçisi ve doğrulayan düğüm tarafından yapılan hesaplamadaki herhangi bir farklılık kök hash'inin tamamen farklı olmasına neden olur. Bununla ilgili sorun, Blokzinciri doğrulamanın her istemcinin baş blok ve birkaç geçmiş blok için tüm durum ağacını depolamasını gerektirmesidir (Geth'teki varsayılan, durum verilerini başın 128 blok gerisine kadar tutmaktır). Bu, istemcilerin büyük miktarda disk alanına erişiminin olmasını gerektirir ve bu da ucuz, düşük güçlü donanımlarda tam düğümleri çalıştırmanın önünde bir engeldir. Buna bir çözüm, durum ağacını tam durum verisi yerine paylaşılabilecek verilere ait küçük bir "tanık" kullanılarak özetlenebilen daha verimli bir yapıya (Verkle ağacı veya ikili ağaç gibi) güncellemektir. Durum verilerini yeni bir ağaç yapısında yeniden biçimlendirmek, durumsuz istemcilere geçiş için bir basamaktır.

</ExpandableCard>

## Tanık nedir ve onlara neden ihtiyacımız var? {#what-is-a-witness}

Bir bloğu doğrulamak, blokta yer alan işlemleri yeniden yürütmek, değişiklikleri Ethereum'un durum ağacına uygulamak ve yeni kök hash'ini hesaplamak anlamına gelir. Doğrulanmış bir blok, hesaplanan durum kök hash'i blokla birlikte sağlananla aynı olan bloktur (çünkü bu, blok teklifçisinin gerçekten yaptığını söylediği hesaplamayı yaptığı anlamına gelir). Günümüzün Ethereum istemcilerinde durumu güncellemek, yerel olarak depolanması gereken büyük bir veri yapısı olan tüm durum ağacına erişim gerektirir. Bir tanık, yalnızca bloktaki işlemleri yürütmek için gereken durum verilerinin parçalarını içerir. Bir doğrulayıcı daha sonra blok teklifçisinin blok işlemlerini yürüttüğünü ve durumu doğru bir şekilde güncellediğini doğrulamak için yalnızca bu parçaları kullanabilir. Ancak bu, tanığın Ethereum ağındaki eşler arasında, her bir düğüm tarafından 12 saniyelik bir slot içinde güvenli bir şekilde alınıp işlenebilecek kadar hızlı aktarılması gerektiği anlamına gelir. Tanık çok büyükse, bazı düğümlerin onu indirmesi ve Zincire ayak uydurması çok uzun sürebilir. Bu merkezileştirici bir güçtür çünkü yalnızca hızlı internet bağlantısı olan düğümlerin blokları doğrulamaya katılabileceği anlamına gelir. Verkle Ağaçları ile durumun sabit diskinizde depolanmasına gerek yoktur; bir bloğu doğrulamak için ihtiyacınız olan _her şey_ bloğun kendi içinde yer alır. Ne yazık ki, Merkle ağaçlarından üretilebilen tanıklar durumsuz istemcileri desteklemek için çok büyüktür.

## Verkle Ağaçları neden daha küçük tanıklara olanak tanır? {#why-do-verkle-trees-enable-smaller-witnesses}

Bir Merkle Ağacının yapısı, tanık boyutlarını çok büyük yapar - 12 saniyelik bir slot içinde eşler arasında güvenli bir şekilde yayınlanamayacak kadar büyük. Bunun nedeni, tanığın yapraklarda tutulan verileri kök hash'ine bağlayan bir yol olmasıdır. Verileri doğrulamak için yalnızca her bir yaprağı köke bağlayan tüm ara hash'lere değil, aynı zamanda tüm "kardeş" düğümlere de sahip olmak gerekir. Kanıttaki her düğümün, ağaçta bir sonraki hash'i oluşturmak için birlikte hash'lendiği bir kardeşi vardır. Bu çok fazla veri demektir. Verkle Ağaçları, ağacın yaprakları ile kökü arasındaki mesafeyi kısaltarak ve ayrıca kök hash'ini doğrulamak için kardeş düğümler sağlama ihtiyacını ortadan kaldırarak tanık boyutunu azaltır. Hash tarzı vektör taahhüdü yerine güçlü bir polinom taahhüdü şeması kullanılarak daha da fazla alan verimliliği elde edilecektir. Polinom taahhüdü, kanıtladığı yaprak sayısından bağımsız olarak tanığın sabit bir boyuta sahip olmasını sağlar.

Polinom taahhüdü şeması altında tanıklar, eşler arası ağda kolayca aktarılabilecek yönetilebilir boyutlara sahiptir. Bu, istemcilerin her bloktaki durum değişikliklerini minimum miktarda veriyle doğrulamasını sağlar.

<ExpandableCard title="Verkle Ağaçları tanık boyutunu tam olarak ne kadar azaltabilir?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Tanık boyutu, içerdiği yaprak sayısına bağlı olarak değişir. Tanığın 1000 yaprağı kapsadığını varsayarsak, bir Merkle ağacı için bir tanık yaklaşık 3,5 MB olacaktır (ağacın 7 seviyeli olduğu varsayılarak). Bir Verkle Ağacındaki aynı veri için bir tanık (ağacın 4 seviyeli olduğu varsayılarak) yaklaşık 150 kB olacaktır - **yaklaşık 23 kat daha küçük**. Tanık boyutundaki bu azalma, durumsuz istemci tanıklarının kabul edilebilir derecede küçük olmasını sağlayacaktır. Polinom tanıkları, hangi spesifik polinom taahhüdünün kullanıldığına bağlı olarak 0,128 - 1 kB arasındadır.

</ExpandableCard>

## Bir Verkle ağacının yapısı nasıldır? {#what-is-the-structure-of-a-verkle-tree}

Verkle Ağaçları, anahtarların 31 baytlık bir _gövde_ ve tek baytlık bir _sonek_ten oluşan 32 baytlık öğeler olduğu `(key,value)` çiftleridir. Bu anahtarlar _uzantı_ düğümleri ve _iç_ düğümler olarak düzenlenir. Uzantı düğümleri, farklı soneklere sahip 256 alt öğe için tek bir gövdeyi temsil eder. İç düğümlerin de 256 alt öğesi vardır, ancak bunlar başka uzantı düğümleri olabilir. Verkle ağacı ile Merkle ağacı yapısı arasındaki temel fark, Verkle ağacının çok daha düz olmasıdır; yani bir yaprağı köke bağlayan daha az ara düğüm vardır ve bu nedenle bir kanıt oluşturmak için daha az veri gerekir.

<VerkleTreeDiagram />

[Verkle Ağaçlarının yapısı hakkında daha fazla bilgi edinin](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Mevcut ilerleme {#current-progress}

Ethereum'un durumunu birleşik bir Verkle ağacına taşıma teklifi olan [EIP-6800](https://eips.ethereum.org/EIPS/eip-6800) şu anda durgun. Araştırmalar, bunun yerine birleşik bir ikili ağaç öneren [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)'e kaydı. EIP-7864 bir taslaktır ve bunun için herhangi bir ağ yükseltmesi planlanmamıştır.

EIP-7864, bu değişiklik için iki ana neden sunar. Verkle Ağaçları, kuantum bilgisayarlara karşı güvenli olmayan eliptik eğri kriptografisine dayanır, bu nedenle eninde sonunda değiştirilmeleri gerekecektir; oysa ikili bir ağaç yalnızca hash fonksiyonlarına dayanır. Kanıtlama sistemlerindeki ilerleme, Verkle Ağaçlarının ana avantajı olan küçük, hızlı üretilen kanıtlara olan ihtiyacı da azaltır. İkili bir ağaçtaki her düğümün yalnızca iki alt öğesi olduğundan, kanıtları günümüzün on altılı (hexary) ağacından elde edilen kanıtlardan çok daha küçüktür.

## Daha fazla bilgi {#further-reading}

- [Durumsuzluk için Verkle Ağaçları](https://verkle.info/)
- [Dankrad Feist, PEEPanEIP'de Verkle Ağaçlarını açıklıyor](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Geri Kalanımız İçin Verkle Ağaçları](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Bir Verkle Kanıtının Anatomisi](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet, ETHGlobal'da Verkle Ağaçlarını açıklıyor](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [Devcon 6'da Guillaume Ballet'den "Verkle Ağaçları Ethereum'u nasıl yalın ve güçlü kılıyor"](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [ETHDenver 2020'den Piper Merriam durumsuz istemciler üzerine](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist, Zero Knowledge podcast'inde Verkle Ağaçlarını ve durumsuzluğu açıklıyor](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin Verkle Ağaçları üzerine](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist Verkle Ağaçları üzerine](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Verkle ağacı EIP belgeleri](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
- [EIP-6800: Birleşik bir verkle ağacı kullanan Ethereum durumu](https://eips.ethereum.org/EIPS/eip-6800)
- [EIP-7864: Birleşik bir ikili ağaç kullanan Ethereum durumu](https://eips.ethereum.org/EIPS/eip-7864)
