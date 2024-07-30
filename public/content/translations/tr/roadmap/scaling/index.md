---
title: Ethereum'u ölçeklendirmek
description: Toplamalar işlemleri zincir dışında topluca gerçekleştiriyor, böylece kullanıcı için maliyetleri azaltıyor. Ancak, toplamaların şu andaki veri kullanımı çok pahalı ve bu durum, işlemlerin ucuz olabilme yolunu sınırlıyor. Proto-Danksharding bunu çözüyor.
lang: tr
image: /images/roadmap/roadmap-transactions.png
alt: "Ethereum yol haritası"
template: roadmap
---

Ethereum, birlikte toplu işlemler yapan ve çıktıyı Ethereum'a gönderen [katman 2'ler](/layer-2/#rollups) (toplamalar olarak da bilinir) kullanılarak ölçeklendirilir. Toplamalar Ethereum Ana Ağı'ndan 8 kat daha ucuz olsa da, onları son kullanıcıların masraflarını azaltmak için optimize etmek mümkün. Toplamalar aynı zamanda, geliştiricilerin toplamalar olgunlaştıkça kaldırabilecekleri bazı merkezi bileşenlere dayanır.

<InfoBanner mb={8} title="İşlem maliyetleri">
  <ul style={{ marginBottom: 0 }}>
    <li>Günümüzün toplamaları Ethereum katman 1'den <strong>~3-8x</strong> daha ucuz</li>
    <li>ZK toplamaları yakında ücretleri <strong>~40-100x</strong> düşürecek</li>
    <li>Ethereum'da yapılacak değişiklikler <strong>~100-1000x</strong> daha fazla ölçeklendirme sağlayacak</li>
    <li style={{ marginBottom: 0 }}>Kullanıcılar <strong> 0,001 dolardan daha az maliyetli</strong> işlemlerden yararlanmalıdır</li>
  </ul>
</InfoBanner>

## Veriyi ucuzlatmak {#making-data-cheaper}

Toplamalar, çok sayıda işlemi bir araya getirir, bunları gerçekleştirir ve sonuçlarını Ethereum'a iletir. Bu, herkesin kendi işlemlerini gerçekleştirebilmesi için ve toplama işlemcisinin dürüst olduğunu doğrulayabilmek için açıkça ulaşılabilir olması gereken birçok veri üretir. Eğer birisi bir uyuşmazlık bulursa, meydan okuyabilir.

### Proto-Danksharding {#proto-danksharding}

Toplama verileri Ethereum üzerinde kalıcı olarak depolanır ve bu maliyetlidir. Toplamalarda kullanıcıların ödediği işlem ücretlerinin %90'ından fazlası bu veri depolamadan kaynaklıdır. İşlem ücretlerini azaltmak için depolama verilerini yeni bir geçici "bloka" taşıyabiliriz. Bloklar ucuzdur çünkü kalıcı değillerdir. Artık daha fazla ihtiyaç kalmadığında, Ethereum üzerinden silinirler. Toplama verilerinin uzun süreli depolanması, toplama işletmecileri, borsalar, indeksleme hizmetleri vb. gibi ihtiyaç duyan insanların sorumululuğudur. Blob işlemlerini Ethereum'a eklemenin bir parçası olan yükseltmenin adı "Proto-Danksharding"dir. Muhtemelen yakında, 2023'ün sonlarına doğru kullanıma sunulacak.

Proto-Danksharding sayesinde, blob işlemlerinin Ethereum'un bir parçası olmasından sonra, Ethereum bloklarına birçok blob eklemek mümkün olacak. Bu Ethereum'un işlem kapasitesinde (>100x) artış ve işlem maliyetlerinde düşüş sağlayacak önemli bir ölçeklendirme olacak.

### Danksharding {#danksharding}

Blob verilerinin genişlemesinin ikinci aşaması karmaşıktır çünkü ağdaki toplama verisinin mevcudiyetini kontrol etmek için yeni metotlar gerektirir ve bu, doğrulayıcıların blok oluşturma ve blok önerme sorumluluklarını ayırmalarına dayanır. Aynı zamanda, doğrulayıcıların blob verisinin küçük alt kümelerini doğruladıklarını kriptografik olarak kanıtlamak için bir yol gerekir.

İkinci adım [“Danksharding”](/roadmap/danksharding/) olarak bilinir. Tam olarak uygulanmasına muhtemelen birkaç yıl var. Danksharding [blok oluşturma ve blok önermenin yanında,](/roadmap/pbs) [veri kullanılabilirliği örneklendirmesi (DAS)](/developers/docs/data-availability) şeklinde adlandırılan, her seferinde rastgele birkaç kilobayt örneklendirme ile verilerin kullanılabildiği ve kullanılabilirliği verimli bir şekilde doğrulayan yeni ağ tasarımlarına dayanır.

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Danksharding hakkında daha fazlası</ButtonLink>

## Toplamaları merkeziyetsizleştirmek {#decentralizing-rollups}

[Toplamalar](/layer-2) halihazırda Ethereum'u ölçeklendiriyor. [rToplama projelerinden oluşan zengin bir ekosistem](https://l2beat.com/scaling/tvl), bir dizi güvenlik garantisi ile kullanıcıların hızlı ve ucuz bir şekilde işlem yapmasını sağlıyor. Ancak toplamalar merkezi sıralayıcılar kulanılarak (Ethereum'a göndermeden önce işleme ve toplama işlemlerini gerçekleştiren bilgisayarlar) başlatıldı. Bu, sansüre karşı savunmasızdır çünkü sıralayıcı işlemlerine yaptırım uygulanabilir, rüşvet veya başka şekilde tehlikeye atılabilir. Aynı zamanda [toplamalar](https://l2beat.com), gelen veriyi doğrulama şekillerine göre de değişiklik gösterir. "Kanıtlayıcılar" için en iyi yol geçerlilik ve dolandırıcılık kanıtları sunmasını sağlmakatır, ancak bu henüz tüm toplamalar için mümkün değil. Geçerlilik/sahtecilik kanıtları kullanan toplamalar bile bilinen küçük bir kanıt havuzu kullanır. Bu sebeple, Ethereum'u ölçeklendirme yolundaki bir sonraki kritik adım, sıralayıcıların ve kanıtlayıcıların çalıştırılma sorumluluğunu daha fazla insana dağıtmaktır.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Toplama hakkında daha fazlası</ButtonLink>

## Güncel ilerleme {#current-progress}

Muhtemelen Proto-Danksharding uygulanacak erken yol haritası öğelerinden biri olacak. Kurulum için merkeziyetsiz hesaplama adımları halihazırda devam ediyor ve birkaç istemci veri damlalarını işlemek için prototipler uyguladı. Tam Danksharding için muhtemelen birkaç yıl var çünkü öncesinde tamamlanması gereken başka birkaç yol haritası var. Toplama altyapısını merkeziyetsiz hale getirme işlemi muhtemelen kademeli bir süreç olacak, farklı toplamalar farklı işlemler inşa ediyor. Bu nedenle farklı hızlarda merkeziyetsizleşme gerçekleşecektir.
