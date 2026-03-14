---
title: "Köprüler"
description: "Geliştiriciler için köprülemeye genel bir bakış"
lang: tr
---

L1 blokzincirlerinin ve L2 [ölçeklendirme](/developers/docs/scaling/) çözümlerinin yaygınlaşmasının yanı sıra, zincirler arası hale gelen merkeziyetsiz uygulamaların sayısının giderek artmasıyla birlikte, zincirler arası iletişim ve varlık taşıma ihtiyacı, ağ altyapısının önemli bir parçası haline gelmiştir. Bunu mümkün kılmak için farklı türde köprüler mevcuttur.

## Köprülere duyulan ihtiyaç {#need-for-bridges}

Köprüler, blokzincir ağlarını birbirine bağlamaya yarar. Blokzincirler arasında bağlantı ve birlikte çalışma olanağı sağlarlar.

Blokzincirler izole edilmiş ortamlarda var oldukları için blokzincirlerin diğer blokzincirlerle doğal bir şekilde ticaret yapması ve iletişim kurması mümkün değildir. Sonuç olarak, bir ekosistem içinde önemli faaliyet ve yenilikler olabilirken, diğer ekosistemlerle bağlantı ve birlikte çalışma eksikliği nedeniyle sınırlıdır.

Köprüler, izole edilmiş blokzincir ortamlarının birbirleriyle bağlantı kurmasını sağlar. Blokzincirler arasında, jetonların, mesajların, isteğe bağlı verilerin ve hatta [akıllı sözleşme](/developers/docs/smart-contracts/) çağrılarının bir zincirden diğerine aktarılabildiği bir ulaşım rotası oluştururlar.

## Köprülerin faydaları {#benefits-of-bridges}

Basitçe söylemek gerekirse, köprüler blokzincir ağlarının veri alışverişi yapmasını ve varlıkları birbirleri arasında taşımasını sağlayarak birçok kullanım durumunu mümkün kılar.

Blokzincirlerin kendilerine özgü güçlü ve zayıf yönleri ile uygulama geliştirme yaklaşımları (hız, işlem hacmi, maliyet vb. gibi) bulunur. Köprüler, blokzincirlerin birbirlerinin getirdiği yenilikleri kullanarak genel kripto ekosisteminin gelişimine katkıda bulunmalarını sağlar.

Köprüler, geliştiriciler için aşağıdakileri mümkün kılar:

- zincirler arasında her türlü veri, bilgi ve varlığın transferi.
- köprüler, protokollerin sunabilecekleri şeyler için tasarım alanını genişleterek, protokoller için yeni özellikler ve kullanım durumları ortaya koyar. Örneğin, başlangıçta Ethereum Ana Ağı'nda dağıtılan bir likidite madenciliği protokolü, tüm EVM uyumlu zincirler üzerinde likidite havuzları sunabilir.
- farklı blok zincirlerinin güçlü yönlerinden yararlanma fırsatı. Örneğin, geliştiriciler merkeziyetsiz uygulamalarını toplamalara dağıtarak farklı L2 çözümlerinin sunduğu düşük ücret avantajından faydalanabilir ve yan zincirler ile kullanıcılar bu zincirler arasında köprü kurabilir.
- farklı blokzincir ekosistemlerinden gelen geliştiricilerin yeni ürünler oluşturmak için iş birliği yapması.
- farklı ekosistemlerden kullanıcıları ve toplulukları merkeziyetsiz uygulamalarına çekme fırsatı.

## Köprüler nasıl çalışır? {#how-do-bridges-work}

[Birçok köprü tasarım türü](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/) olsa da, varlıkların zincirler arası transferini kolaylaştıran üç yöntem öne çıkmaktadır:

- **Kilitle ve bas –** Kaynak zincirdeki varlıkları kilitleyip hedef zincirde yeni varlıklar basmak.
- **Yak ve bas –** Kaynak zincirdeki varlıkları yakıp hedef zincirde yeni varlıklar basmak.
- **Atomik takaslar –** Kaynak zincirdeki varlıkları başka bir tarafla hedef zincirdeki varlıklarla takas etmek.

## Köprü türleri {#bridge-types}

Köprüler genellikle aşağıdaki kategorilerden birine girer:

- **Yerel köprüler –** Bu köprüler genellikle belirli bir blokzincirde likiditeyi başlatmak için inşa edilir ve kullanıcıların fonları ekosisteme taşımasını kolaylaştırır. Örneğin, [Arbitrum Bridge](https://bridge.arbitrum.io/), kullanıcıların Ethereum Ana Ağı'ndan Arbitrum'a köprü kurmasını kolaylaştırmak için oluşturulmuştur. Diğer bu tür köprüler arasında Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge) vb. yer alır.
- **Doğrulayıcı veya oracle tabanlı köprüler –** Bu tür köprüler, zincirler arası transferleri doğrulamak için harici bir doğrulayıcı setine veya oracle'lara dayanır. Örnekler: Multichain ve Across.
- **Genelleştirilmiş mesaj iletim köprüleri –** Bu köprüler, varlıkları, mesajları ve isteğe bağlı verileri zincirler arasında transfer edebilir. Örnekler: Axelar, LayerZero ve Nomad.
- **Likidite ağları –** Bu köprüler, ağırlıklı olarak atomik takaslar aracılığıyla bir zincirden diğerine varlık transferine odaklanır. Genellikle zincirler arası mesaj iletimini desteklemezler. Örnekler: Connext ve Hop.

## Dikkate alınması gereken ödünleşmeler {#trade-offs}

Köprüler söz konusu olduğunda mükemmel çözüm diye bir şey yoktur. Bunun yerine, bir amacı yerine getirmek için yapılan ödünleşmeler vardır. Geliştiriciler ve kullanıcılar, köprüleri aşağıdaki faktörlere dayalı olarak değerlendirebilir:

- **Güvenlik –** Sistemi kim doğruluyor? Harici doğrulayıcılar tarafından güvence altına alınan köprüler, genellikle blokzincirin kendi doğrulayıcıları tarafından yerel olarak veya doğal olarak güvence altına alınan köprülere göre daha az güvenlidir.
- **Kolaylık –** Bir işlemin tamamlanması ne kadar sürüyor ve bir kullanıcının kaç işlemi imzalaması gerekiyor? Bir geliştirici için bir köprüyü entegre etmek ne kadar sürüyor ve süreç ne kadar karmaşık?
- **Bağlanabilirlik –** Bir köprünün bağlanabileceği farklı hedef zincirler (ör. toplamalar, yan zincirler, diğer katman 1 blokzincirleri vb.) nelerdir ve yeni bir blokzinciri entegre etmek ne kadar zordur?
- **Daha karmaşık verileri iletme yeteneği –** Bir köprü, mesajların ve daha karmaşık isteğe bağlı verilerin zincirler arasında transferini sağlayabilir mi, yoksa yalnızca zincirler arası varlık transferlerini mi destekler?
- **Maliyet etkinliği –** Bir köprü aracılığıyla zincirler arası varlık aktarmanın maliyeti nedir? Genellikle köprüler için belirli rotaların gaz maliyetlerine ve likiditesine bağlı olarak sabit veya değişken ücretler talep edilir. Ayrıca, bir köprünün güvenliğini sağlamak için gereken sermayeye dayalı olarak maliyet-etkinliği de değerlendirilmesi gereken önemli bir unsurdur.

Yüksek düzeyde, köprüler güvenilir ve güven gerektirmez şeklinde kategorilere ayrılabilir.

- **Güvenilir –** Güvenilir köprüler harici olarak doğrulanır. Zincirler arası veri aktarımı için harici bir doğrulayıcı kümesi kullanırlar (çoklu imza ile federasyonlar, çok taraflı bilgi işlem sistemleri, kâhin ağı). Sonuç olarak, geniş bağlantı olanakları sağlayabilir ve zincirler arası tamamen genelleştirilmiş mesaj iletimini mümkün kılabilirler. Aynı zamanda hız ve maliyet etkinlik konusunda da iyi performans gösterme eğilimindedirler. Bunun bedeli, kullanıcıların köprünün güvenliğine inanmak zorunda kalmasıdır.
- **Güven gerektirmeyen –** Bu köprüler, mesaj ve jeton transferi konusunda bağlandıkları blokzincire ve doğrulayıcılarına dayalıdır. Yeni güven varsayımları eklemedikleri için (blokzincirlere ek olarak) "güven gerektirmez" niteliktedirler. Sonuç olarak güven gerektirmez köprüler, güvenilir köprülere göre daha güvenli kabul edilir.

Güven gerektirmez köprüleri diğer faktörlere göre değerlendirmek için bunları genelleştirilmiş mesaj iletim köprüleri ve likidite ağları olarak ayırmamız gerekir.

- **Genelleştirilmiş mesaj iletim köprüleri –** Bu köprüler güvenlik ve zincirler arası daha karmaşık veri aktarma yeteneği ile öne çıkar. Genellikle maliyet-etkinlik konusunda da iyidirler. Ancak, bu güçlükler genellikle hafif istemci köprüleri için bağlantı (örneğin IBC) ve sahtecilik kanıtları kullanan iyimser köprüler (örneğin Nomad) için hız dezavantajları maliyetiyle gelir.
- **Likidite ağları –** Bu köprüler, varlık transferi için atomik takas kullanır ve yerel olarak doğrulanan sistemlerdir (yani altındaki blokzincirin doğrulayıcılarını işlemleri doğrulamak için kullanırlar). Sonuç olarak, güvenlik ve hız konusunda uzmandırlar. Ayrıca nispeten maliyet-etkin kabul edilirler ve iyi bir bağlantı sunarlar. Bununla birlikte ana ödünleştirme, zincirler arası mesaj iletimini desteklememeleri nedeniyle daha karmaşık veri iletimini sağlayamamalarıdır.

## Köprülerle ilgili riskler {#risk-with-bridges}

Köprüler, [DeFi'deki en büyük üç hack olayının](https://rekt.news/leaderboard/) sorumlusudur ve hâlâ geliştirilme aşamasının başlarındadır. Herhangi bir köprü kullanmanın aşağıdaki riskleri taşıdığını unutmayın:

- **Akıllı sözleşme riski –** Birçok köprü denetimleri başarıyla geçmiş olsa da, varlıkların hack'lenmeye açık hale gelmesi için akıllı sözleşmedeki tek bir kusur yeterlidir (ör: [Solana'nın Wormhole Köprüsü](https://rekt.news/wormhole-rekt/)).
- **Sistemik finansal riskler –** Birçok köprü, yeni bir zincirde orijinal varlığın standart sürümlerini oluşturmak için sarılmış varlıklar kullanır. Bu, sarılmış jeton sürümlerinin istismar edildiğini gördüğümüz için ekosistemi sistemik risklere maruz bırakır.
- **Karşı taraf riski –** Bazı köprüler, kullanıcıların doğrulayıcıların kullanıcı fonlarını çalmak için işbirliği yapmayacağı varsayımına güvenmeleri gereken güvenilir bir tasarım kullanır. Kullanıcıların bu üçüncü taraf aktörlere güvenmeleri gerekliliği, onları likidite havuzu boşaltma, sansür ve diğer kötü niyetli faaliyetler gibi risklere maruz bırakır.
- **Açık sorunlar –** Köprülerin geliştirme aşamalarının henüz başlangıcında olduğu göz önüne alındığında, örneğin ağ sıkışıklığı dönemleri ve ağ düzeyinde saldırılar veya durum geri alımları gibi beklenmeyen olaylar sırasında karşılaşılabilecek farklı piyasa koşullarında köprülerin nasıl performans göstereceğiyle ilgili birçok cevapsız soru bulunmaktadır. Bu belirsizlik, henüz tam olarak bilinmeyen belirli riskleri taşır.

## Merkeziyetsiz uygulamalar köprüleri nasıl kullanır? Merkeziyetsiz uygulamalar köprüleri nasıl kullanabilir? {#how-can-dapps-use-bridges}

Geliştiricilerin merkeziyetsiz uygulamalarını köprülerle çapraz zincire taşıma konusunda göz önünde bulundurabileceği bazı pratik uygulamalar şunlardır:

### Köprüleri entegre etme {#integrating-bridges}

Geliştiriciler için köprüleri destek eklemenin birçok yolu bulunmaktadır:

1. **Kendi köprünüzü oluşturma –** Güvenli ve güvenilir bir köprü oluşturmak, özellikle de güveni en aza indiren bir yolu seçerseniz, kolay değildir. Ayrıca, ölçeklenebilirlik ve birlikte çalışabilirlik çalışmalarıyla ilgili yıllar süren deneyim ve teknik uzmanlığı gerektirir. Ek olarak, bir köprüyü sürdürmek ve bunu mümkün kılmak için yeterli likidite çekmek için işin başında duracak bir ekibe ihtiyaç duyulur.

2. **Kullanıcılara birden fazla köprü seçeneği sunma –** Birçok [merkeziyetsiz uygulama](/developers/docs/dapps/), kullanıcıların onlarla etkileşim kurmak için kendi yerel token'larına sahip olmalarını gerektirir. Kullanıcıların jetonlara erişim sağlamaları için web sitelerinde farklı köprü seçenekleri sunarlar. Ancak, bu yöntem kullanıcıyı merkeziyetsiz uygulamanın arayüzünden uzaklaştırır ve diğer merkeziyetsiz uygulamalar ve köprülerle etkileşimde bulunmalarını gerekliliğini ortadan kaldırmaz. Bu, hataların artma olasılığı olan zahmetli bir kullanıcı deneyimini beraberinde getirir.

3. **Bir köprüyü entegre etme –** Bu çözüm, merkeziyetsiz uygulamanın kullanıcıları harici köprü ve merkeziyetsiz borsa arayüzlerine yönlendirmesini gerektirmez. Merkeziyetsiz uygulamaların kullanıcının alışma deneyimini geliştirmelerine olanak tanır. Ancak, bu yaklaşımın sınırlamaları bulunmaktadır:

   - Köprülerin değerlendirilmesi ve sürdürülmesi zor ve zaman alıcıdır.
   - Bir köprü seçmek, tek hata noktası ve bağımlılık oluşturur.
   - Merkeziyetsiz uygulamalar, köprülerin yetenekleriyle kısıtlıdır.
   - Sadece köprüler yeterli olmayabilir. Merkeziyetsiz uygulamalar, zincirler arası takaslar gibi daha fazla işlevsellik sunmak için merkeziyetsiz borsalardan faydalanabilir.

4. **Birden fazla köprüyü entegre etme –** Bu çözüm, tek bir köprüyü entegre etmenin getirdiği birçok sorunu çözer. Ancak, birden fazla köprüyü entegre etmek kaynak tüketen bir süreç olduğundan ve geliştiriciler için kripto alanının en nadir kaynağı olan teknik açıdan ve iletişim bağlamında yük oluşturduğundan kısıtlamalara tabidir.

5. **Bir köprü birleştirici entegre etme –** Merkeziyetsiz uygulamalar için başka bir seçenek, birden fazla köprüye erişim olanağı sağlayan bir köprü birleştirme çözümünü entegre etmektir. Köprü birleştirmeleri, tüm köprülerin güçlü yönlerini devralır ve bu nedenle herhangi bir tek bir köprünün yetenekleriyle sınırlı değildir. Özellikle, köprü birleştiricileri genellikle köprü entegrasyonlarını sürdürür, bu da merkeziyetsiz uygulamanın köprü entegrasyonunun teknik ve operasyonel yönlerini takip etme zorunluluğundan kurtarır.

Ancak, köprü birleştiricileri de kısıtlamalara tabidir. Örneğin, daha fazla köprü seçeneği sunabilirken, genellikle birleştiricinin platformunda sunulanların dışında piyasada daha fazla köprü mevcuttur. Dahası, köprü birleştiricileri da köprüler gibi akıllı sözleşme ve teknoloji risklerine maruz kalırlar (daha fazla akıllı sözleşme = daha fazla risk).

Bir merkeziyetsiz uygulama, bir köprü veya birleştirici entegrasyonu yolunu seçerse, entegrasyonun ne kadar derin olması gerektiğine bağlı olarak farklı seçenekler bulunmaktadır. Örneğin, sadece kullanıcı giriş deneyimini iyileştirmek için ön uç entegrasyonu yapılıyorsa, bir merkeziyetsiz uygulama aracı entegre eder. Ancak entegrasyon, hisseleme, likidite madenciliği vb. gibi daha derin çaplı zincirler arası stratejileri keşfetmek amacını taşıyorsa, merkeziyetsiz uygulama SDK veya API'yi entegre eder.

### Bir merkeziyetsiz uygulamayı birden çok zincirde dağıtma {#deploying-a-dapp-on-multiple-chains}

Bir merkeziyetsiz uygulamayı birden çok zincire dağıtmak için geliştiriciler [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/) gibi geliştirme platformlarını kullanabilirler. Genellikle bu platformlar, merkeziyetsiz uygulamaların zincirler arası işlem yapmasını sağlayabilecek birleştirilebilir eklentilere sahiptir. Örneğin, geliştiriciler [hardhat-deploy eklentisi](https://github.com/wighawag/hardhat-deploy) tarafından sunulan deterministik bir dağıtım proxy'si kullanabilirler.

#### Örnekler:

- [Zincirler arası merkeziyetsiz uygulamalar nasıl oluşturulur](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Zincirler Arası bir NFT Pazar Yeri Oluşturma](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Zincirler arası NFT merkeziyetsiz uygulamaları oluşturma](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Zincirler arasında sözleşme etkinliğini izleme {#monitoring-contract-activity-across-chains}

Geliştiriciler, akıllı sözleşmelerin zincirler arasındaki etkinliğini izlemek için alt grafikleri ve Tenderly gibi geliştirici platformlarını kullanabilir. Bu tür platformlar, [sözleşmeler tarafından yayımlanan olayları](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events) kontrol etmek gibi zincirler arası faaliyetler için daha büyük veri izleme işlevselliği sunan araçlara da sahiptir.

#### Araçlar

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Daha fazla kaynak {#further-reading}

- [Blokzincir Köprüleri](/bridges/) – ethereum.org
- [L2Beat Köprü Riski Çerçevesi](https://l2beat.com/bridges/summary)
- [Blokzincir Köprüleri: Kripto Ağlarının Ağlarını Oluşturma](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 Eyl 2021 – Dmitriy Berenzon
- [Birlikte Çalışabilirlik Üçlemesi](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 Eki 2021 – Arjun Bhuptani
- [Kümeler: Güvenilir ve Güveni En Aza İndirilmiş Köprüler Çok Zincirli Ortamı Nasıl Şekillendiriyor](https://blog.celestia.org/clusters/) - 4 Eki 2021 – Mustafa Al-Bassam
- [LI.FI: Köprülerde Güven Bir Yelpazedir](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 Nis 2022 – Arjun Chand
- [Toplama Birlikte Çalışabilirlik Çözümlerinin Durumu](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 Haz 2024 – Alex Hook
- [Güvenli Zincirler Arası Birlikte Çalışabilirlik için Paylaşılan Güvenlikten Yararlanma: Lagrange Durum Komiteleri ve Ötesi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 Haz 2024 – Emmanuel Awosika

Ayrıca, [James Prestwich](https://twitter.com/_prestwich) tarafından yapılan ve köprüler hakkında daha derin bir anlayış geliştirmenize yardımcı olabilecek bazı aydınlatıcı sunumlar aşağıda verilmiştir:

- [Duvarlı Bahçeler Değil, Köprüler İnşa Etmek](https://youtu.be/ZQJWMiX4hT0)
- [Köprüleri Ayrıntılı İnceleme](https://youtu.be/b0mC-ZqN8Oo)
- [Köprüler Neden Yanıyor?](https://youtu.be/c7cm2kd20j8)
