---
title: "Toplamalar: nihai Ethereum ölçeklendirme stratejisi mi?"
description: "Ethereum'un birincil ölçeklendirme stratejisi olarak toplamalara derinlemesine bir bakış. Bu video, iyimser rollupların (Arbitrum, Optimism) ve sıfır bilgi rolluplarının nasıl çalıştığını açıklamaktadır."
lang: tr
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "scaling"
  - "rollups"
  - "optimistic-rollups"
  - "zk-rollups"
format: explainer
author: Finematics
breadcrumb: "Toplamalar"
---

**Finematics** tarafından hazırlanan ve Ethereum'un birincil ölçeklendirme stratejisi olarak toplamaları ele alan bir açıklayıcı video. Video, iyimser rollupları (Arbitrum, Optimism) ZK rollupları ile karşılaştırıyor ve toplamaların Ethereum'u ölçeklendirmek için neden baskın yöntem haline geldiğini inceliyor.

*Bu transkript, Finematics tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=7pWxCklcNsU) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Katman 2 (1:17) {#layer-2-117}

Ethereum ölçeklendirmesi, kripto dünyasında en çok tartışılan konulardan biri olmuştur. Ölçeklendirme tartışması genellikle 2017'deki CryptoKitties çılgınlığı, 2020'nin merkeziyetsiz finans (DeFi) Yazı veya 2021'in başındaki kripto boğa piyasası gibi yüksek ağ etkinliği dönemlerinde alevlenir. Bu dönemlerde, Ethereum ağına yönelik eşi benzeri görülmemiş talep, son derece yüksek gaz ücretlerine yol açarak günlük kullanıcıların işlemlerini ödemesini pahalı hale getirdi.

Bu sorunun üstesinden gelmek için nihai ölçeklendirme çözümünü arayışı, birçok ekip ve bir bütün olarak Ethereum topluluğu için en önemli önceliklerden biri olmuştur.

Genel olarak, Ethereum'u —veya aslında diğer çoğu blokzinciri— ölçeklendirmenin üç ana yolu vardır: blokzincirin kendisini ölçeklendirmek (katman 1 ölçeklendirmesi), katman 1'in üzerine inşa etmek (katman 2 ölçeklendirmesi) ve katman 1'in yanına inşa etmek (yan zincirler).

#### Katman 1'in dışında (1:58) {#outside-of-layer-1-158}

Katman 1 söz konusu olduğunda, Eth2, Ethereum blokzincirini ölçeklendirmek için seçilen çözümdür. Eth2; Hisse Kanıtı (PoS) sistemine geçiş, İş Kanıtı (PoW) blokzincirinin durumunu yeni Hisse Kanıtı zinciriyle birleştirme ve parça zinciri oluşturma gibi birbirine bağlı bir dizi değişikliği ifade eder. Özellikle parça zinciri oluşturma, bilhassa toplamalarla birleştirildiğinde Ethereum ağının işlem kapasitesini önemli ölçüde artırabilir.

Katman 1'in dışında ölçeklendirme söz konusu olduğunda, karışık sonuçlar veren birden fazla farklı ölçeklendirme çözümü denenmiştir. Bir yanda, tamamen Ethereum tarafından güvence altına alınan ancak yalnızca belirli bir uygulama kümesi için iyi çalışan kanallar gibi katman 2 çözümlerimiz var. Öte yandan yan zincirler, genellikle EVM uyumludur ve genel amaçlı uygulamaları ölçeklendirebilir. Ana dezavantajları, Ethereum'un güvenliğine dayanmamaları ve bunun yerine kendi mutabakat modellerine sahip olmaları nedeniyle katman 2 çözümlerinden daha az güvenli olmalarıdır.

Çoğu Rollup, genel amaçlı bir ölçeklendirme çözümü oluştururken aynı zamanda tamamen Ethereum'un güvenliğine dayanarak bu iki dünyanın en iyisini elde etmeyi amaçlar. Bu, ölçeklendirmenin kutsal kasesidir, çünkü Ethereum'da bulunan mevcut tüm akıllı sözleşmelerin güvenlikten ödün vermeden çok az değişiklikle veya hiç değişiklik yapılmadan bir Rollup'a dağıtılmasına olanak tanır. Toplamaların muhtemelen tüm ölçeklendirme çözümleri arasında en çok beklenen çözüm olmasına şaşmamak gerek.

Bir Rollup, işlemleri katman 1'in dışında yürüterek ancak işlem verilerini katman 1'de yayınlayarak çalışan bir tür ölçeklendirme çözümüdür. Bu, Rollup'ın ağı ölçeklendirmesine ve güvenliğini yine de Ethereum mutabakatından almasına olanak tanır. Hesaplamayı zincir dışına taşımak, Rollup işlemlerinin verilerinin yalnızca bir kısmının Ethereum bloklarına sığması gerektiğinden, temelde toplamda daha fazla işlemin işlenmesine olanak tanır.

Bunu başarmak için Rollup işlemleri, EVM'nin Rollup'a özgü bir sürümünü bile çalıştırabilen ayrı bir zincirde yürütülür. Bir Rollup üzerinde işlemleri yürüttükten sonraki adım, bunları bir araya getirmek ve ana Ethereum zincirinde yayınlamaktır. Tüm süreç temelde işlemleri yürütür, verileri alır, sıkıştırır ve tek bir parti halinde ana zincire toplar (İngilizce "roll up") — "Rollup" adı da buradan gelir.

Her Rollup, katman 1'de para yatırma ve çekme işlemlerini işlemekten ve kanıtları doğrulamaktan sorumlu bir dizi akıllı sözleşme dağıtır. Kanıtlar aynı zamanda farklı Rollup türleri arasındaki temel ayrımın devreye girdiği yerdir. İyimser rolluplar sahtekarlık kanıtlarını kullanırken, ZK rollupları geçerlilik kanıtlarını kullanır.

#### İyimser rolluplar (4:26) {#optimistic-rollups-426}

İyimser rolluplar verileri katman 1'de yayınlar ve doğru olduğunu varsayar — "iyimser" adı da buradan gelir. Yayınlanan veriler geçerliyse, mutlu yoldayız demektir ve başka hiçbir şey yapılmasına gerek yoktur. İyimser rollup, iyimser senaryoda herhangi bir ek iş yapmak zorunda kalmamanın avantajını yaşar.

Geçersiz bir işlem durumunda, sistemin bunu tanımlayabilmesi, doğru durumu kurtarabilmesi ve böyle bir işlemi gönderen tarafı cezalandırabilmesi gerekir. Bunu başarmak için iyimser rolluplar; sahtekarlık kanıtlarını doğrulayabilen, hileli işlemleri tespit edebilen ve kötü niyetli aktörleri diğer geçersiz işlemleri veya yanlış sahtekarlık kanıtlarını göndermekten caydırabilen bir uyuşmazlık çözüm sistemi uygular.

Çoğu iyimser rollup uygulamasında, katman 1'e işlem partileri gönderebilen tarafın genellikle ETH şeklinde bir teminat sağlaması gerekir. Diğer herhangi bir ağ katılımcısı, yanlış bir işlem tespit ederse bir sahtekarlık kanıtı sunabilir. Bir sahtekarlık kanıtı sunulduktan sonra sistem uyuşmazlık çözüm moduna girer. Bu modda, şüpheli işlem tekrar yürütülür — bu kez ana Ethereum zincirinde. Yürütme, işlemin gerçekten hileli olduğunu kanıtlarsa, bu işlemi gönderen taraf genellikle teminat olarak yatırdığı ETH'de ceza kesintisi yapılarak cezalandırılır.

Kötü niyetli aktörlerin ağı yanlış sahtekarlık kanıtlarıyla spamlemesini önlemek için, sahtekarlık kanıtı sunmak isteyen tarafların genellikle ceza kesintisine tabi olabilecek bir teminat sağlaması da gerekir.

Katman 1'de bir Rollup işlemini yürütebilmek için iyimser rollupların, işlem başlangıçta Rollup üzerinde yürütüldüğünde mevcut olan tam durumla bir işlemi yeniden oynatabilen bir sistem uygulaması gerekir. Bu, iyimser rollupların karmaşık kısımlarından biridir ve genellikle belirli işlev çağrılarını Rollup'tan gelen bir durumla değiştiren ayrı bir yönetici sözleşmesi oluşturularak elde edilir.

Sistem beklendiği gibi çalışabilir ve Rollup'ın durumunu izleyen ve gerekirse sahtekarlık kanıtları sunan yalnızca bir dürüst taraf olsa bile sahtekarlığı tespit edebilir. Rollup sistemi içindeki doğru teşvikler nedeniyle, uyuşmazlık çözüm sürecine girmek istisnai bir durum olmalı ve her zaman olan bir şey olmamalıdır.

ZK rollupları söz konusu olduğunda, hiçbir uyuşmazlık çözümü yoktur. Bu, sıfır bilgi kanıtları adı verilen zekice bir kriptografi parçasından yararlanılarak mümkündür — ZK rollupları adı da buradan gelir. Bu modelde, katman 1'de yayınlanan her parti, ZK-SNARK adı verilen kriptografik bir kanıt içerir. Kanıt, işlem partisi gönderildiğinde katman 1 sözleşmesi tarafından hızlı bir şekilde doğrulanabilir ve geçersiz partiler anında reddedilebilir.

#### Diğer farklılıklar (7:28) {#other-differences-728}

Uyuşmazlık çözüm sürecinin doğası gereği, iyimser rolluplar, katman 1'de bir işlemi kesinleştirmeden önce tüm ağ katılımcılarına sahtekarlık kanıtları sunmaları için yeterli zaman vermelidir. Bu süre genellikle oldukça uzundur — en kötü senaryoda bile hileli işlemlere itiraz edilebileceğinden emin olmak için. Bu, kullanıcıların fonlarını katman 1'e geri çekebilmek için bir veya iki hafta kadar beklemeleri gerektiğinden, iyimser rolluplardan para çekme işlemlerinin oldukça uzun sürmesine neden olur.

Neyse ki, hızlı "likidite çıkışları" sağlayarak bu durumu iyileştirmeye çalışan birkaç proje var. Bu projeler katman 1'e, başka bir katman 2'ye veya hatta bir yan zincire neredeyse anında para çekme imkanı sunar ve bu kolaylık için küçük bir ücret talep eder. Hop Protocol ve Connext incelenmesi gereken projelerdir.

ZK rolluplarında uzun para çekme sorunu yoktur, çünkü fonlar, Rollup partisi bir geçerlilik kanıtı ile birlikte katman 1'e gönderilir gönderilmez para çekme işlemleri için kullanılabilir hale gelir.

Ancak, ZK rollupları kendi dezavantajlarıyla birlikte gelir. Teknolojinin karmaşıklığı nedeniyle, EVM uyumlu bir ZK rollup oluşturmak çok daha zordur, bu da uygulama mantığını yeniden yazmak zorunda kalmadan genel amaçlı uygulamaları ölçeklendirmeyi zorlaştırır. Bununla birlikte, zkSync bu alanda önemli ilerlemeler kaydediyor ve oldukça yakında EVM uyumlu bir ZK rollup başlatabilirler.

İyimser rolluplar EVM uyumluluğu konusunda biraz daha rahattır. Yine de birkaç değişiklikle EVM'nin kendi sürümlerini çalıştırmaları gerekir, ancak sözleşmelerin %99'u herhangi bir değişiklik yapılmadan taşınabilir. ZK rollupları ayrıca iyimser rolluplardan çok daha fazla hesaplama ağırlıklıdır, bu da ZK kanıtlarını hesaplayan düğümlerin yüksek özellikli makineler olması gerektiği anlamına gelir ve diğer kullanıcıların bunları çalıştırmasını zorlaştırır.

#### Ölçeklendirme iyileştirmeleri (9:32) {#scaling-improvements-932}

Ölçeklendirme iyileştirmeleri söz konusu olduğunda, her iki Rollup türü de Ethereum'u saniyede yaklaşık 15–45 işlemden (işlem türüne bağlı olarak) saniyede 1.000–4.000 işleme kadar ölçeklendirebilmelidir. Katman 1'de Rollup partileri için daha fazla alan sunarak saniyede daha da fazla işlem gerçekleştirmenin mümkün olduğunu belirtmekte fayda var.

Eth2'nin toplamalarla devasa bir sinerji yaratabilmesinin nedeni de budur, çünkü her biri önemli miktarda veri depolayabilen birden fazla parça zinciri oluşturarak olası veri kullanılabilirliği alanını artırır. Eth2 ve toplamaların birleşimi, Ethereum'un işlem hızını saniyede 100.000 işleme kadar çıkarabilir.

İyimser rolluplar söz konusu olduğunda Optimism ve Arbitrum şu anda en popüler seçeneklerdir. Optimism, tam lansmandan önce teknolojinin beklendiği gibi çalıştığından emin olmak için Synthetix ve Uniswap gibi sınırlı bir ortak kümesiyle Ethereum Ana Ağına kısmen sunuldu. Arbitrum kendi sürümünü Ana Ağa çoktan dağıttı ve farklı projelerin ekosistemine sisteme katılımını sağlamaya başladı.

Arbitrum'da başlatılan en dikkate değer projelerden bazıları Uniswap, Sushi, Bancor, Augur, Chainlink, Aave ve çok daha fazlasını içerir. Arbitrum ayrıca, ödül sistemlerini ölçeklendirmek için ayrı bir Rollup zinciri başlatmaya odaklanarak Reddit ile ortaklığını duyurdu. Optimism, Optimism Dai Köprüsünü oluşturmak ve DAI ile diğer tokenlerin katman 1'e hızlı bir şekilde çekilmesini sağlamak için MakerDAO ile ortaklık kuruyor.

Hem Arbitrum hem de Optimism aynı hedefe —EVM uyumlu iyimser rollup çözümleri oluşturmaya— ulaşmaya çalışsa da, tasarımlarında birkaç fark vardır. Arbitrum'un farklı bir uyuşmazlık çözüm modeli vardır. Sahtekarlık kanıtının geçerli olup olmadığını doğrulamak için tüm bir işlemi katman 1'de yeniden çalıştırmak yerine, uyuşmazlığın kapsamını daraltmaya ve şüpheli bir işlemin geçerli olup olmadığını kontrol etmek için katman 1'de potansiyel olarak yalnızca birkaç talimatı yürütmeye olanak tanıyan etkileşimli çok turlu bir model buldular.

Bir diğer önemli fark, işlem sıralamasını ve MEV'yi ele alma yaklaşımıdır. Arbitrum başlangıçta işlemleri sıralamaktan sorumlu bir sıralayıcı çalıştıracak, ancak uzun vadede bunu merkeziyetsizleştirmek istiyorlar. Optimism, işlemlerin sıralanmasının —ve dolayısıyla MEV'nin— belirli bir süre için diğer taraflara açık artırmayla satılabileceği başka bir yaklaşımı tercih ediyor.

#### ZK rollupları (13:10) {#zk-rollups-1310}

Ethereum topluluğu çoğunlukla iyimser rolluplara odaklanıyor gibi görünse de —en azından kısa vadede— ZK rollupları üzerinde çalışan projeler de son derece hızlı ilerliyor.

Loopring, borsa ve ödeme protokolünü ölçeklendirmek için ZK rollup teknolojisini kullanıyor. Hermez ve ZKTube, ZK rolluplarını kullanarak ödemeleri ölçeklendirmek üzerinde çalışıyor ve Hermez ayrıca EVM uyumlu bir ZK rollup inşa ediyor. Aztec, ZK rollup teknolojilerine gizlilik özellikleri getirmeye odaklanıyor.

StarkWare tabanlı rolluplar halihazırda DeversiFi, Immutable X ve dYdX gibi projeler tarafından yaygın olarak kullanılmaktadır. Daha önce de belirtildiği gibi zkSync, Solidity ile yazılmış herhangi bir rastgele akıllı sözleşmeyi tam olarak destekleyebilecek EVM uyumlu bir sanal makine üzerinde çalışıyor.

#### DeFi (14:02) {#defi-1402}

Toplamaların DeFi üzerinde de büyük bir etkisi olmalıdır. Daha önce yüksek işlem ücretleri nedeniyle Ethereum'da işlem yapamayan kullanıcılar, ağ etkinliği bir sonraki sefer yüksek olduğunda ekosistemde kalabilecekler. Toplamalar ayrıca, tamamen Ethereum mutabakatı tarafından güvence altına alınırken daha ucuz işlemler ve daha hızlı onay süresi gerektiren yeni bir uygulama türüne de olanak tanıyacaktır. Görünüşe göre toplamalar, DeFi için başka bir yüksek büyüme dönemini tetikleyebilir.

#### Zorluklar (14:29) {#challenges-1429}

Ancak, toplamalar söz konusu olduğunda birkaç zorluk vardır. Birleştirilebilirlik bunlardan biridir — birden fazla protokol kullanan bir işlem oluşturmak için, hepsinin aynı Rollup üzerinde dağıtılması gerekir.

Bir diğer zorluk ise parçalanmış likiditedir. Bir bütün olarak Ethereum ekosistemine yeni para girmeden, Uniswap veya Aave gibi protokollerde katman 1'de bulunan mevcut likidite, katman 1 ile birden fazla Rollup uygulaması arasında paylaşılacaktır. Daha düşük likidite genellikle daha yüksek fiyat kayması ve daha kötü ticaret yürütmesi anlamına gelir.

Bu aynı zamanda doğal olarak kazananlar ve kaybedenler olacağı anlamına da gelir. Şu anda mevcut Ethereum ekosistemi, tüm ölçeklendirme çözümlerinden yararlanacak kadar büyük değil. Bu uzun vadede değişebilir —ve muhtemelen değişecektir— ancak kısa vadede bazı rollupların ve diğer ölçeklendirme çözümlerinin hayalet kasabalara dönüştüğünü görebiliriz. Gelecekte, kullanıcıların tamamen tek bir Rollup ekosistemi içinde yaşadığını ve uzun süreler boyunca ana Ethereum zinciri ve diğer ölçeklendirme çözümleriyle etkileşime girmediğini de görebiliriz.

#### Yan zincirlere yönelik tehdit (15:44) {#threat-to-sidechains-1544}

Toplamaları tartışırken çok sık gündeme gelen bir soru, bunların yan zincirler için bir tehdit olup olmadığıdır. Yan zincirlerin Ethereum ekosisteminde hala bir yeri olacaktır. Katman 2'deki işlem maliyeti katman 1'dekinden çok daha düşük olsa da, büyük olasılıkla oyunlar ve diğer yüksek hacimli uygulamalar gibi belirli uygulama türlerini fiyatlandıracak kadar yüksek olmaya devam edecektir. Bu durum Ethereum parça zinciri oluşturmayı tanıttığında değişebilir, ancak o zamana kadar yan zincirler uzun vadede hayatta kalmak için yeterli ağ etkisi yaratabilir.

Ayrıca, her Rollup partisi hala Ethereum blok alanı için ödeme yapmak zorunda olduğundan, rolluplardaki ücretler yan zincirlerden daha yüksektir. Ethereum topluluğu, Ethereum ölçeklendirme stratejisinde —en azından kısa ve orta vadede ve potansiyel olarak daha da uzun süre— toplamalara büyük bir odaklanma koymaktadır.