---
title: "Ethereum'u ölçeklendirmek"
description: "Toplamalar, işlemleri zincir dışında toplu hale getirerek kullanıcı için maliyetleri azaltır. Ancak, şu anda toplamaların verileri kullanma şekli çok pahalı ve bu da işlemlerin ne kadar ucuzlayabileceği konusunda sınırlama getiriyor. Proto-Danksharding bunu çözüyor."
lang: tr
image: /images/roadmap/roadmap-transactions.png
alt: "Ethereum yol haritası"
template: roadmap
---

Ethereum, işlemleri toplu hale getiren ve çıktıyı Ethereum'a gönderen [katman 2'ler](/layer-2/#rollups) (toplamalar olarak da bilinir) kullanılarak ölçeklendirilir. Toplamalar Ethereum Ana Ağı'ndan 8 kat daha ucuz olsa da, onları son kullanıcıların masraflarını azaltmak için optimize etmek mümkün. Toplamalar aynı zamanda, geliştiricilerin toplamalar olgunlaştıkça kaldırabilecekleri bazı merkezi bileşenlere dayanır.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  İşlem maliyetleri
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Günümüzde toplamalar, Ethereum katman 1'den <strong>~5-20 kat</strong> daha ucuz</li>
    <li>ZK toplamaları yakında ücretleri <strong>~40-100x</strong> düşürecek</li>
    <li>Ethereum'da yapılacak değişiklikler <strong>~100-1000x</strong> daha fazla ölçeklendirme sağlayacak</li>
    <li style={{ marginBottom: 0 }}>Kullanıcılar <strong> 0,001 dolardan daha az maliyetli</strong> işlemlerden yararlanmalıdır</li>
  </ul>
</AlertContent>
</Alert>

## Veriyi daha ucuz hale getirme {#making-data-cheaper}

Toplamalar, çok sayıda işlemi bir araya getirir, bunları gerçekleştirir ve sonuçlarını Ethereum'a iletir. Bu, herkesin kendi işlemlerini gerçekleştirebilmesi için ve toplama işlemcisinin dürüst olduğunu doğrulayabilmek için açıkça ulaşılabilir olması gereken birçok veri üretir. Eğer birisi bir uyuşmazlık bulursa, meydan okuyabilir.

### Proto-Danksharding {#proto-danksharding}

Toplama verileri tarihsel olarak Ethereum'da kalıcı olarak saklanmaktadır ve bu da pahalıdır. Toplamalarda kullanıcıların ödediği işlem ücretlerinin %90'ından fazlası bu veri depolamadan kaynaklıdır. İşlem ücretlerini azaltmak için depolama verilerini yeni bir geçici "bloka" taşıyabiliriz. Bloklar ucuzdur çünkü kalıcı değillerdir. Artık daha fazla ihtiyaç kalmadığında, Ethereum üzerinden silinirler. Toplama verilerinin uzun vadede depolanması; toplama operatörleri, borsalar, endeksleme hizmetleri vb. gibi bu verilere ihtiyaç duyan kişi/grupların sorumluluğundadır. Blob işlemlerini Ethereum'a eklemenin bir parçası olan yükseltmenin adı "Proto-Danksharding"dir.

Proto-Danksharding ile çok sayıda geçici bloğu Ethereum bloklarında depolamak mümkündür. Bu, Ethereum'un işlem hacminin önemli ölçüde (>100x) artmasını ve işlem maliyetlerinin düşmesini sağlar.

### Danksharding {#danksharding}

Blob verilerinin genişlemesinin ikinci aşaması karmaşıktır çünkü ağdaki toplama verisinin mevcudiyetini kontrol etmek için yeni metotlar gerektirir ve bu, [doğrulayıcıların](/glossary/#validator) [blok](/glossary/#block) oluşturma ve blok önerme sorumluluklarını ayırmalarına dayanır. Aynı zamanda, doğrulayıcıların blob verisinin küçük alt kümelerini doğruladıklarını kriptografik olarak kanıtlamak için bir yol gerekir.

Bu ikinci adım ["Danksharding"](/roadmap/danksharding/) olarak bilinir. Uygulama çalışmaları, [blok oluşturma ile blok önermeyi ayırma](/roadmap/pbs) gibi ön koşullarda ve [veri kullanılabilirliği örneklemesi (DAS)](/developers/docs/data-availability) olarak bilinen, ağın her seferinde birkaç kilobayt rastgele örnekleyerek verinin kullanılabilirliğini verimli bir şekilde doğrulamasını sağlayan yeni ağ tasarımlarında kaydedilen ilerlemeyle devam etmektedir.

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Danksharding hakkında daha fazlası</ButtonLink>

## Toplamaların merkeziyetsizleştirilmesi {#decentralizing-rollups}

[Toplamalar](/layer-2) halihazırda Ethereum'u ölçeklendiriyor. [Zengin bir toplama projesi ekosistemi](https://l2beat.com/scaling/tvs), bir dizi güvenlik garantisiyle kullanıcıların hızlı ve ucuza işlem yapmasını sağlar. Ancak toplamalar merkezi sıralayıcılar kulanılarak (Ethereum'a göndermeden önce işleme ve toplama işlemlerini gerçekleştiren bilgisayarlar) başlatıldı. Bu, sansüre karşı savunmasızdır çünkü sıralayıcı işlemlerine yaptırım uygulanabilir, rüşvet veya başka şekilde tehlikeye atılabilir. Aynı zamanda, [toplamalar](https://l2beat.com/scaling/summary) gelen verileri doğrulama biçimlerine göre farklılık gösterir. En iyi yol, "kanıtlayıcıların" [sahtecilik kanıtları](/glossary/#fraud-proof) veya doğruluk kanıtları sunmasıdır, ancak henüz tüm toplamalar bu aşamada değildir. Geçerlilik/sahtecilik kanıtları kullanan toplamalar bile bilinen küçük bir kanıt havuzu kullanır. Bu sebeple, Ethereum'u ölçeklendirme yolundaki bir sonraki kritik adım, sıralayıcıların ve kanıtlayıcıların çalıştırılma sorumluluğunu daha fazla insana dağıtmaktır.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Toplamalar hakkında daha fazlası</ButtonLink>

## Mevcut ilerleme {#current-progress}

Proto-Danksharding, Mart 2024'teki Cancun-Deneb ("Dencun") ağ yükseltmesinin bir parçası olarak başarıyla uygulandı. Uygulanmasından bu yana toplamaların blob depolamayı kullanmaya başlaması, kullanıcılar için daha düşük işlem maliyetleri ve blob'larda işlenen milyonlarca işlemle sonuçlanmıştır.

Tam Danksharding üzerindeki çalışmalar, PBS (Teklifçi-İnşaatçı Ayrımı) ve DAS (Veri Kullanılabilirliği Örneklemesi) gibi ön koşullarında kaydedilen ilerleme ile devam etmektedir. Toplama altyapısını merkeziyetsizleştirmek kademeli bir süreçtir; biraz farklı sistemler oluşturan birçok farklı toplama mevcuttur ve bunlar farklı oranlarda tamamen merkeziyetsizleşecektir.

[Dencun ağ yükseltmesi ve etkileri hakkında daha fazlası](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
