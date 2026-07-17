---
title: Teklifçi-oluşturucu ayrımı
description: Ethereum doğrulayıcılarının blok oluşturma ve blok yayınlama sorumluluklarını nasıl ve neden ayıracaklarını öğrenin.
lang: tr
---

Günümüz [Ethereum](/) doğrulayıcıları blokları oluşturur _ve_ yayınlar. Dedikodu ağı (gossip network) aracılığıyla duydukları işlemleri bir araya getirir ve Ethereum ağındaki eşlere gönderilen bir blok halinde paketlerler. **Teklifçi-oluşturucu ayrımı (PBS)**, bu görevleri birden fazla doğrulayıcı arasında böler. Blok oluşturucular, blokları oluşturmaktan ve her bir slotta bunları blok teklifçisine sunmaktan sorumlu hale gelir. Blok teklifçisi bloğun içeriğini göremez, sadece en kârlı olanı seçer ve bloğu eşlerine göndermeden önce blok oluşturucudan bir ücret alır (veya oluşturucu teklifçiye bir teklif öder).

Bu, birkaç nedenden dolayı önemli bir yükseltmedir. İlk olarak, protokol düzeyinde işlem sansürünü önlemek için fırsatlar yaratır. İkinci olarak, hobi amaçlı doğrulayıcıların, blok oluşturma kârlılıklarını daha iyi optimize edebilen kurumsal oyuncular tarafından rekabette geride bırakılmasını önler. Üçüncü olarak, Danksharding yükseltmelerini etkinleştirerek Ethereum'un ölçeklenmesine yardımcı olur.

## PBS ve sansür direnci {#pbs-and-censorship-resistance}

Blok oluşturucuları ve blok teklifçilerini ayırmak, blok oluşturucuların işlemleri sansürlemesini çok daha zor hale getirir. Bunun nedeni, blok teklif edilmeden önce hiçbir sansürün gerçekleşmediğinden emin olmayı sağlayan nispeten karmaşık dahil etme kriterlerinin eklenebilmesidir. Blok teklifçisi, blok oluşturucudan ayrı bir varlık olduğu için, sansür uygulayan blok oluşturuculara karşı koruyucu rolünü üstlenebilir.

Örneğin, doğrulayıcılar işlemlerden haberdar olduklarında ancak bunların bloklara dahil edildiğini görmediklerinde, bunları bir sonraki blokta olmazsa olmazlar olarak dayatabilmeleri için dahil etme listeleri sunulabilir. Dahil etme listesi, blok teklifçisinin yerel bellek havuzundan (haberdar olduğu işlemlerin listesi) oluşturulur ve bir blok teklif edilmeden hemen önce eşlerine gönderilir. Dahil etme listesindeki işlemlerden herhangi biri eksikse, teklif edici bloğu reddedebilir, teklif etmeden önce eksik işlemleri ekleyebilir veya teklif edip diğer doğrulayıcılar tarafından alındığında reddedilmesine izin verebilir. Bu fikrin, oluşturucuların mevcut blok alanını tam olarak kullanması gerektiğini ve kullanmazlarsa işlemlerin teklif edicinin dahil etme listesinden ekleneceğini ileri süren potansiyel olarak daha verimli bir versiyonu da vardır. Bu hala aktif bir araştırma alanıdır ve dahil etme listeleri için en uygun yapılandırma henüz belirlenmemiştir.

[Şifrelenmiş bellek havuzları](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3), oluşturucuların ve teklif edicilerin bir bloğa hangi işlemleri dahil ettiklerini blok yayınlanana kadar bilmelerini imkansız hale getirebilir.

<ExpandableCard title="PBS ne tür sansürleri çözer?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Güçlü kuruluşlar, belirli adreslere giden veya bu adreslerden gelen işlemleri sansürlemeleri için doğrulayıcılara baskı yapabilir. Doğrulayıcılar, işlem havuzlarındaki kara listeye alınmış adresleri tespit edip teklif ettikleri bloklardan çıkararak bu baskıya boyun eğerler. PBS'den sonra bu artık mümkün olmayacaktır çünkü blok teklifçileri bloklarında hangi işlemleri yayınladıklarını bilmeyeceklerdir. Belirli bireylerin veya uygulamaların sansür kurallarına uyması önemli olabilir, örneğin kendi bölgelerinde yasalaştığında. Bu durumlarda uyumluluk uygulama düzeyinde gerçekleşirken, protokol izinsiz ve sansürsüz kalmaya devam eder.

</ExpandableCard>

## PBS ve MEV {#pbs-and-mev}

**Maksimum çıkarılabilir değer (MEV)**, doğrulayıcıların işlemleri lehlerine sıralayarak kârlılıklarını en üst düzeye çıkarmalarını ifade eder. Yaygın örnekler arasında merkeziyetsiz borsalardaki takasların arbitrajı (örneğin, büyük bir satış veya satın alımın önüne geçmek) veya merkeziyetsiz finans (DeFi) pozisyonlarını tasfiye etme fırsatlarını belirlemek yer alır. MEV'i en üst düzeye çıkarmak, gelişmiş teknik bilgi birikimi ve normal doğrulayıcılara eklenen özel yazılımlar gerektirir; bu da kurumsal operatörlerin MEV çıkarımında bireylerden ve hobi amaçlı doğrulayıcılardan daha iyi performans gösterme olasılığını çok daha yüksek hale getirir. Bu, staking getirilerinin merkezi operatörlerde daha yüksek olmasının muhtemel olduğu anlamına gelir ve evde staking yapmayı caydıran merkezileştirici bir güç yaratır.

PBS, MEV'in ekonomisini yeniden yapılandırarak bu sorunu çözer. Blok teklifçisi kendi MEV aramasını yapmak yerine, blok oluşturucular tarafından kendisine sunulan birçok blok arasından birini seçer. Blok oluşturucular karmaşık MEV çıkarımı yapmış olabilir, ancak bunun ödülü blok teklifçisine gider. Bu, uzmanlaşmış blok oluşturuculardan oluşan küçük bir havuz MEV çıkarımına hakim olsa bile, bunun ödülünün bireysel ev staker'ları da dahil olmak üzere ağdaki herhangi bir doğrulayıcıya gidebileceği anlamına gelir.

<ExpandableCard title="Blok oluşturmayı merkezileştirmek neden sorun değildir?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Bireyler, karmaşık MEV stratejilerinin sunduğu artırılmış ödüller nedeniyle kendi başlarına değil, havuzlarla stake etmeye teşvik edilebilir. Blok oluşturmayı blok teklifinden ayırmak, çıkarılan MEV'in en etkili MEV arayıcısı ile merkezileşmek yerine daha fazla doğrulayıcıya dağıtılacağı anlamına gelir. Aynı zamanda, uzmanlaşmış blok oluşturucuların var olmasına izin vermek, blok oluşturma yükünü bireylerden alır ve ayrıca bireylerin MEV'i kendileri için çalmasını önlerken, blokların dürüst olduğunu kontrol edebilen bireysel, bağımsız doğrulayıcıların sayısını en üst düzeye çıkarır. Önemli kavram, blokların dürüst olduğunu kanıtlayabilen sağlam ve maksimum düzeyde merkeziyetsiz bir doğrulayıcı ağı olduğu sürece merkezi blok üretiminin sorun olmadığı fikrini ifade eden "kanıtlayıcı-doğrulayıcı asimetrisi"dir. Merkeziyetsizlik bir araçtır, nihai bir hedef değildir - istediğimiz şey dürüst bloklardır.
</ExpandableCard>

## PBS ve Danksharding {#pbs-and-danksharding}

Danksharding, Ethereum'un saniyede 100.000'den fazla işleme ölçeklenmesinin ve Rollup kullanıcıları için ücretleri en aza indirmesinin yoludur. PBS'ye dayanır çünkü 1 saniyeden daha kısa bir sürede 64 MB'a kadar Rollup verisi için kanıtları hesaplamak zorunda kalacak olan blok oluşturucuların iş yükünü artırır. Bu muhtemelen göreve oldukça önemli donanımlar ayırabilen uzmanlaşmış oluşturucular gerektirecektir. Ancak mevcut durumda, MEV çıkarımı nedeniyle blok oluşturma zaten daha karmaşık ve güçlü operatörler etrafında giderek daha fazla merkezileşebilir. Teklifçi-oluşturucu ayrımı, bu gerçeği benimsemenin ve blok doğrulama (önemli kısım) veya staking ödüllerinin dağıtımı üzerinde merkezileştirici bir güç uygulamasını önlemenin bir yoludur. Harika bir yan fayda, uzmanlaşmış blok oluşturucuların Danksharding için gerekli veri kanıtlarını hesaplamaya da istekli ve yetenekli olmalarıdır.

## Mevcut ilerleme {#current-progress}

PBS ileri bir araştırma aşamasındadır, ancak Ethereum istemcilerinde prototiplenmeden önce çözülmesi gereken bazı önemli tasarım soruları hala mevcuttur. Henüz kesinleşmiş bir spesifikasyon yoktur. Bu, PBS'nin muhtemelen bir yıl veya daha fazla uzakta olduğu anlamına gelir. Araştırmanın en son [durumunu](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance) kontrol edin.

## Daha Fazla Okuma {#further-reading}

- [Araştırmanın durumu: PBS altında sansür direnci](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [PBS dostu ücret piyasası tasarımları](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS ve sansür direnci](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Dahil etme listeleri](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)