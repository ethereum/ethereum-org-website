---
title: Ethereum'u ölçeklendirmek
description: Toplamalar işlemleri zincir dışında topluca gerçekleştiriyor, böylece kullanıcı için maliyetleri azaltıyor. Ancak, şu anda toplamaların verileri kullanma şekli çok pahalı ve bu da işlemlerin ne kadar ucuzlayabileceği konusunda sınırlama getiriyor. Proto-Danksharding bunu çözüyor.
lang: tr
image: /images/roadmap/roadmap-transactions.png
alt: "Ethereum yol haritası"
template: roadmap
---

Ethereum, birlikte toplu işlemler yapan ve çıktıyı Ethereum'a gönderen [katman 2'ler](/layer-2/#rollups) (toplamalar olarak da bilinir) kullanılarak ölçeklendirilir. Toplamalar Ethereum Ana Ağı'ndan 8 kat daha ucuz olsa da, onları son kullanıcıların masraflarını azaltmak için optimize etmek mümkün. Toplamalar aynı zamanda, geliştiricilerin toplamalar olgunlaştıkça kaldırabilecekleri bazı merkezi bileşenlere dayanır.

<InfoBanner mb={8} title="İşlem maliyetleri">
  <ul style={{ marginBottom: 0 }}>
    <li>Günümüzde toplamalar, Ethereum katman 1'den <strong>~5-20 kat</strong> daha ucuz</li>
    <li>ZK toplamaları yakında ücretleri <strong>~40-100x</strong> düşürecek</li>
    <li>Ethereum'da yapılacak değişiklikler <strong>~100-1000x</strong> daha fazla ölçeklendirme sağlayacak</li>
    <li style={{ marginBottom: 0 }}>Kullanıcılar <strong> 0,001 dolardan daha az maliyetli</strong> işlemlerden yararlanmalıdır</li>
  </ul>
</InfoBanner>

## Veriyi ucuzlatmak {#making-data-cheaper}

Toplamalar, çok sayıda işlemi bir araya getirir, bunları gerçekleştirir ve sonuçlarını Ethereum'a iletir. Bu, herkesin kendi işlemlerini gerçekleştirebilmesi için ve toplama işlemcisinin dürüst olduğunu doğrulayabilmek için açıkça ulaşılabilir olması gereken birçok veri üretir. Eğer birisi bir uyuşmazlık bulursa, meydan okuyabilir.

### Proto-Danksharding {#proto-danksharding}

Toplama verileri tarihsel olarak Ethereum'da kalıcı olarak saklanmaktadır ve bu da pahalıdır. Toplamalarda kullanıcıların ödediği işlem ücretlerinin %90'ından fazlası bu veri depolamadan kaynaklıdır. İşlem ücretlerini azaltmak için depolama verilerini yeni bir geçici "bloka" taşıyabiliriz. Bloklar ucuzdur çünkü kalıcı değillerdir. Artık daha fazla ihtiyaç kalmadığında, Ethereum üzerinden silinirler. Toplama verilerinin uzun vadede depolanması; toplama operatörleri, borsalar, endeksleme hizmetleri vb. gibi bu verilere ihtiyaç duyan kişi/grupların sorumluluğundadır. Blob işlemlerini Ethereum'a eklemenin bir parçası olan yükseltmenin adı "Proto-Danksharding"dir.

Proto-Danksharding ile çok sayıda geçici bloğu Ethereum bloklarında depolamak mümkündür. Bu, Ethereum'un işlem hacminin önemli ölçüde (>100 kat) artmasını ve işlem maliyetlerinin azalmasını sağlamaktadır.

### Danksharding {#danksharding}

Geçici blok verilerini ilerletmenin ikinci aşaması karmaşıktır çünkü toplamaların verilerinin ağ üzerinde erişilebilir olup olmadığını kontrol eden yeni yöntemlere ve [doğrulayıcıların](/glossary/#validator) [blok](/glossary/#block) üretimi ile blok teklifi sorumluluklarını ayrıştırmalarına gerek duyar. Aynı zamanda, doğrulayıcıların blob verisinin küçük alt kümelerini doğruladıklarını kriptografik olarak kanıtlamak için bir yol gerekir.

İkinci adım [“Danksharding”](/roadmap/danksharding/) olarak bilinir. Tamamen uygulanması için **daha en az birkaç yıl** vardır. Danksharding [blok oluşturma ve blok önermenin yanında,](/roadmap/pbs) [veri kullanılabilirliği örneklendirmesi (DAS)](/developers/docs/data-availability) şeklinde adlandırılan, her seferinde rastgele birkaç kilobayt örneklendirme ile verilerin kullanılabildiği ve kullanılabilirliği verimli bir şekilde doğrulayan yeni ağ tasarımlarına dayanır.

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Danksharding hakkında daha fazlası</ButtonLink>

## Toplamaları merkeziyetsizleştirmek {#decentralizing-rollups}

[Toplamalar](/layer-2) halihazırda Ethereum'u ölçeklendiriyor. [rToplama projelerinden oluşan zengin bir ekosistem](https://l2beat.com/scaling/tvl), bir dizi güvenlik garantisi ile kullanıcıların hızlı ve ucuz bir şekilde işlem yapmasını sağlıyor. Ancak toplamalar merkezi sıralayıcılar kulanılarak (Ethereum'a göndermeden önce işleme ve toplama işlemlerini gerçekleştiren bilgisayarlar) başlatıldı. Bu, sansüre karşı savunmasızdır çünkü sıralayıcı işlemlerine yaptırım uygulanabilir, rüşvet veya başka şekilde tehlikeye atılabilir. Aynı zamanda [toplamalar](https://l2beat.com), gelen veriyi doğrulama şekillerine göre de değişiklik gösterir. "Kanıtlayıcıların" [sahtecilik kanıtlarını](/glossary/#fraud-proof) ya da doğruluk kanıtlarını iletmeleri en iyi çözümdür ancak tüm toplamalar henüz o seviyede değildir. Geçerlilik/sahtecilik kanıtları kullanan toplamalar bile bilinen küçük bir kanıt havuzu kullanır. Bu sebeple, Ethereum'u ölçeklendirme yolundaki bir sonraki kritik adım, sıralayıcıların ve kanıtlayıcıların çalıştırılma sorumluluğunu daha fazla insana dağıtmaktır.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Toplama hakkında daha fazlası</ButtonLink>

## Güncel ilerleme {#current-progress}

Proto-Danksharding, 2024 yılının Mart ayında Cancun-Deneb ("Dencun") ağ yükseltmesi ile uygulanmaya alınacak olan bu yol haritasının ilk parçasıdır. **Tam Danksharding** ise yol haritasındaki diğer parçaların tamamlanmasına ihtiyaç duyduğundan <0>birkaç yıl daha uzaktadır</0>. Toplama altyapısını merkeziyetsiz hale getirme işlemi muhtemelen kademeli bir süreç olacak, farklı toplamalar farklı işlemler inşa ediyor. Bu nedenle farklı hızlarda merkeziyetsizleşme gerçekleşecektir.

[Dencun ağ yükseltmesine dair daha fazla bilgi](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
