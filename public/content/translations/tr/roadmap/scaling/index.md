---
title: Ethereum'u Ölçeklendirmek
description: Toplamalar, işlemleri zincir dışında bir araya getirerek kullanıcı için maliyetleri düşürür. Ancak, toplamaların şu anda verileri kullanma şekli çok pahalıdır ve işlemlerin ne kadar ucuz olabileceğini sınırlar. Proto-Danksharding bunu düzeltir.
lang: tr
image: /images/roadmap/roadmap-transactions.png
alt: "Ethereum yol haritası"
template: roadmap
---

Ethereum, işlemleri bir araya getiren ve çıktıyı Ethereum'a gönderen [katman 2'ler](/layer-2/#rollups) (toplamalar olarak da bilinir) kullanılarak ölçeklendirilir. Toplamalar, Ethereum Ana Ağı'ndan sekiz kata kadar daha ucuz olsa da, son kullanıcılar için maliyetleri düşürmek amacıyla toplamaları daha da optimize etmek mümkündür. Toplamalar ayrıca, toplamalar olgunlaştıkça geliştiricilerin kaldırabileceği bazı merkezi bileşenlere dayanır.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  İşlem maliyetleri
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Günümüzün toplamaları, Ethereum katman 1'den <strong>~5-20 kat</strong> daha ucuzdur</li>
    <li>ZK-toplamaları yakında ücretleri <strong>~40-100 kat</strong> düşürecektir</li>
    <li>Ethereum'da yapılacak olan yaklaşan değişiklikler, <strong>~100-1000 kat</strong> daha fazla ölçeklendirme sağlayacaktır</li>
    <li style={{ marginBottom: 0 }}>Kullanıcılar, <strong>0,001 $'dan daha aza mal olan</strong> işlemlerden faydalanmalıdır</strong>
  </strong>
</AlertContent>
</Alert>

## Verileri daha ucuz hale getirmek {#making-data-cheaper}

Toplamalar çok sayıda işlemi toplar, bunları yürütür ve sonuçları Ethereum'a gönderir. Bu, herkesin işlemleri kendisi için yürütebilmesi ve Rollup operatörünün dürüst olduğunu doğrulayabilmesi için açıkça erişilebilir olması gereken çok fazla veri üretir. Birisi bir tutarsızlık bulursa, buna itiraz edebilir.

### Proto-Danksharding {#proto-danksharding}

Rollup verileri tarihsel olarak Ethereum'da kalıcı olarak depolanmıştır ve bu pahalıdır. Kullanıcıların toplamalar üzerinde ödediği işlem maliyetinin %90'ından fazlası bu veri depolamasından kaynaklanmaktadır. İşlem maliyetlerini düşürmek için verileri yeni ve geçici bir 'blob' depolamasına taşıyabiliriz. Blob'lar kalıcı olmadıkları için daha ucuzdur; artık ihtiyaç duyulmadıklarında Ethereum'dan silinirler. Rollup verilerini uzun vadeli olarak depolamak, Rollup operatörleri, borsalar, indeksleme hizmetleri vb. gibi buna ihtiyaç duyan kişilerin sorumluluğu haline gelir. Ethereum'a blob işlemlerini eklemek, "Proto-Danksharding" olarak bilinen bir güncellemenin parçasıdır.

Proto-Danksharding ile Ethereum bloklarına birçok blob eklemek mümkündür. Bu, Ethereum'un işlem kapasitesinde önemli bir (>100 kat) artış ve işlem maliyetlerinde düşüş sağlar.

### Danksharding {#danksharding}

Blob verilerini genişletmenin ikinci aşaması karmaşıktır çünkü Rollup verilerinin ağda mevcut olup olmadığını kontrol etmek için yeni yöntemler gerektirir ve [doğrulayıcıların](/glossary/#validator) [blok](/glossary/#block) oluşturma ve blok teklifi sorumluluklarını ayırmasına dayanır. Ayrıca, doğrulayıcıların blob verilerinin küçük alt kümelerini doğruladığını kriptografik olarak kanıtlamanın bir yolunu gerektirir.

Bu ikinci adım ["Danksharding"](/roadmap/danksharding/) olarak bilinir. [Blok oluşturma ve blok teklifini ayırma](/roadmap/pbs) gibi ön koşullar ve ağın bir seferde birkaç kilobaytlık rastgele örnekleme yaparak verilerin mevcut olduğunu verimli bir şekilde onaylamasını sağlayan ve [veri kullanılabilirliği örneklemesi (DAS)](/developers/docs/data-availability) olarak bilinen yeni ağ tasarımları üzerinde ilerleme kaydedilerek uygulama çalışmaları devam etmektedir.

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Danksharding hakkında daha fazlası</ButtonLink>

## Toplamaları merkeziyetsizleştirmek {#decentralizing-rollups}

[Toplamalar](/layer-2) halihazırda Ethereum'u ölçeklendiriyor. [Zengin bir Rollup projeleri ekosistemi](https://l2beat.com/scaling/tvs), kullanıcıların çeşitli güvenlik garantileriyle hızlı ve ucuz bir şekilde işlem yapmalarını sağlıyor. Ancak toplamalar, merkezi sıralayıcılar (işlemleri Ethereum'a göndermeden önce tüm işlemeyi ve birleştirmeyi yapan bilgisayarlar) kullanılarak başlatılmıştır. Bu durum sansüre karşı savunmasızdır, çünkü sıralayıcı operatörlerine yaptırım uygulanabilir, rüşvet verilebilir veya başka bir şekilde tehlikeye atılabilirler. Aynı zamanda, [toplamalar](https://l2beat.com/scaling/summary) gelen verileri doğrulama biçimlerinde farklılık gösterir. En iyi yol, "kanıtlayıcıların" [dolandırıcılık kanıtları](/glossary/#fraud-proof) veya geçerlilik kanıtları sunmasıdır, ancak henüz tüm toplamalar bu aşamada değildir. Geçerlilik/dolandırıcılık kanıtlarını kullanan toplamalar bile bilinen küçük bir kanıtlayıcı havuzu kullanır. Bu nedenle, Ethereum'u ölçeklendirmedeki bir sonraki kritik adım, sıralayıcıları ve kanıtlayıcıları çalıştırma sorumluluğunu daha fazla kişiye dağıtmaktır.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Toplamalar hakkında daha fazlası</ButtonLink>

## Mevcut ilerleme {#current-progress}

Proto-Danksharding, Mart 2024'teki Cancun-Deneb ("Dencun") ağ güncellemesinin bir parçası olarak başarıyla uygulandı. Uygulanmasından bu yana toplamalar, blob depolamasını kullanmaya başladı ve bu da kullanıcılar için işlem maliyetlerinin düşmesini ve blob'larda milyonlarca işlemin işlenmesini sağladı.

Tam Danksharding üzerindeki çalışmalar, PBS (Teklifçi-Oluşturucu Ayrımı) ve DAS (Veri Kullanılabilirliği Örneklemesi) gibi ön koşullarında kaydedilen ilerlemelerle devam etmektedir. Rollup altyapısını merkeziyetsizleştirmek kademeli bir süreçtir; biraz farklı sistemler inşa eden ve farklı hızlarda tamamen merkeziyetsizleşecek birçok farklı Rollup vardır.

[Dencun ağ güncellemesi ve etkisi hakkında daha fazlası](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />