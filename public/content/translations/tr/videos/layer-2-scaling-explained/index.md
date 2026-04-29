---
title: "Ethereum katman 2 ölçeklendirmesi açıklandı"
description: "Toplamalar, Plasma, durum kanalları ve yan zincirler dahil olmak üzere Ethereum için katman 2 ölçeklendirme çözümlerine genel bir bakış."
lang: tr
youtubeId: "BgCgauWVTs0"
uploadDate: 2021-02-03
duration: "0:14:28"
educationLevel: intermediate
topic:
  - "ölçeklendirme"
  - "katman-2"
format: explainer
author: Finematics
breadcrumb: "Katman 2 Ölçeklendirme"
---

**Finematics** tarafından hazırlanan, kanallar, Plasma, yan zincirler ve toplamalar dahil olmak üzere Ethereum için katman 2 ölçeklendirme çözümlerini ve toplamaların neden baskın ölçeklendirme stratejisi olarak ortaya çıktığını kapsayan bir açıklayıcı. Bu teknolojilerin Ethereum'un güvenliğini devralırken maliyetleri nasıl düşürdüğünü ve işlem kapasitesini nasıl artırdığını öğrenin.

*Bu transkript, Finematics tarafından yayınlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=BgCgauWVTs0) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için hafifçe düzenlenmiştir.*

#### Ethereum ölçeklendirmesi (0:31) {#ethereum-scaling-031}

Ethereum ölçeklendirmesi, ağ başlatıldığından beri neredeyse en çok tartışılan konulardan biri olmuştur. Ölçeklendirme tartışması, büyük bir ağ tıkanıklığı döneminden sonra her zaman alevlenir.

Bunun gibi ilk dönemlerden biri, kötü şöhretli CryptoKitties'in ICO'larla birlikte tüm Ethereum ağını tıkayarak Gaz ücretlerinde büyük bir artışa neden olduğu 2017 kripto boğa piyasasıydı. Bu yıl ağ tıkanıklığı, bu kez merkeziyetsiz finans (DeFi) ve getiri çiftçiliğinin popülaritesinin neden olduğu daha da güçlü bir şekilde geri döndü. 500+ Gwei kadar yüksek Gaz ücretlerinin bile işleminizin bir süre doğrulanmasını sağlamadığı dönemler oldu.

#### Blokzincirleri ölçeklendirme (1:20) {#scaling-blockchains-120}

Ethereum'u veya genel olarak Blokzincirleri ölçeklendirmeye gelince, bunu yapmanın iki ana yolu vardır: temel katmanın kendisini — katman 1 (l1) — ölçeklendirmek veya işin bir kısmını başka bir katmana — katman 2 (l2) — devrederek ağı ölçeklendirmek.

Katman 1, şu anda neredeyse tüm işlemlerin sonuçlandırıldığı standart temel mutabakat katmanıdır. Katmanlar kavramı Ethereum'a özgü bir kavram değildir; Bitcoin veya Zcash gibi diğer Blokzincirler de bunu yaygın olarak kullanır.

Katman 2, katman 1'in üzerine inşa edilmiş başka bir katmandır. Burada birkaç önemli nokta var: katman 2, katman 1'de herhangi bir değişiklik gerektirmez — akıllı Sözleşmeler gibi mevcut unsurları kullanılarak katman 1'in üzerine inşa edilebilir. Katman 2 ayrıca durumunu katman 1'e sabitleyerek katman 1'in güvenliğinden yararlanır.

Ethereum şu anda temel katmanında saniyede yaklaşık 15 işlem gerçekleştirebilmektedir. Katman 2 ölçeklendirmesi, çözüme bağlı olarak saniyede 2.000 ila 4.000 işlem gerçekleştirerek işlem sayısını önemli ölçüde artırabilir.

#### Ethereum 2.0 (2:39) {#ethereum-20-239}

Peki ya Ethereum 2.0? Onun Ethereum'u ölçeklendirmesi gerekmiyor muydu? Evet — Ethereum 2.0, temel katmandaki işlem kapasitesini önemli ölçüde artıracak olan Hisse Kanıtı (PoS) ve parça zinciri kavramlarını sunar.

Bu, Ethereum 2.0 piyasaya sürüldüğünde katman 2 ölçeklendirmesine ihtiyacımız olmadığı anlamına mı geliyor? Pek sayılmaz — parça zinciri ile bile, Ethereum'un gelecekte saniyede yüz binlerce veya hatta milyonlarca işlemi gerçekleştirebilmesi için hala katman 2 ölçeklendirmesine ihtiyacı olacaktır.

#### Ölçeklenebilirlik üçlemi (3:15) {#scalability-trilemma-315}

Ünlü ölçeklenebilirlik üçleminin devreye girdiği yer de burasıdır. Teorik olarak, katman 2'yi tamamen atlayabilir ve bunun yerine temel katmanı ölçeklendirmeye odaklanabilirdik. Bu, artan iş yükünü idare etmek için son derece uzmanlaşmış düğümler gerektirir, bu da daha yüksek merkezileşmeye yol açar ve dolayısıyla ağın güvenliğini ve sansüre dirençli özelliklerini azaltır.

Ölçeklenebilirliğin asla güvenlik ve merkeziyetsizlik pahasına olmaması gerektiği gerçeğine bağlı kalarak, geleceğe doğru ilerlerken katman 1 ve katman 2 ölçeklendirmesinin bir kombinasyonuyla baş başa kalıyoruz.

#### Katman 2 ölçeklendirmesi (3:52) {#layer-2-scaling-352}

Katman 2 ölçeklendirmesi, işlemleri zincir dışı gerçekleştirerek katman 1'in yeteneklerini artırmaya yardımcı olan çözümler için ortak bir terimdir. Geliştirilebilecek iki ana yetenek işlem hızı ve işlem kapasitesidir. Bunun da ötesinde, katman 2 çözümleri Gaz ücretlerini büyük ölçüde azaltabilir.

Gerçek ölçeklendirme çözümlerine gelince, birden fazla seçenek mevcuttur. Seçeneklerden bazıları şu anda mevcuttur ve yakın ila orta vadede Ethereum ağının işlem kapasitesini artırabilirken, diğerleri orta ila uzun vadeli bir zaman ufkunu hedeflemektedir. Bazı çözümler uygulamaya özeldir — örneğin, ödeme kanalları — iyimser toplamalar gibi diğerleri ise herhangi bir rastgele Sözleşme yürütmesi için kullanılabilir.

#### Kanallar (5:03) {#channels-503}

Kanallar, yaygın olarak tartışılan ilk ölçeklendirme çözümlerinden biridir. Katılımcıların temel katmana yalnızca iki işlem gönderirken işlemlerini defalarca değiştirmelerine olanak tanır. En popüler kanal türleri durum kanalları ve bunların alt türü olan ödeme kanallarıdır.

Kanallar saniyede binlerce işlemi kolayca gerçekleştirme potansiyeline sahip olsalar da, birkaç dezavantajla birlikte gelirler. Açık katılım sunmazlar — katılımcıların önceden bilinmesi gerekir ve kullanıcıların fonlarını çoklu imza Sözleşmesine kilitlemeleri gerekir. Bunun da ötesinde, bu ölçeklendirme çözümü uygulamaya özeldir ve genel amaçlı akıllı Sözleşmeleri ölçeklendirmek için kullanılamaz.

Ethereum'da durum kanallarının gücünden yararlanan ana proje Raiden'dır. Ödeme kanalları kavramı, Bitcoin'in Lightning Network'ü tarafından da yaygın olarak kullanılmaktadır.

#### Plasma (6:04) {#plasma-604}

Plasma, ilk olarak Joseph Poon ve Vitalik Buterin tarafından önerilen bir katman 2 ölçeklendirme çözümüdür. Ethereum üzerinde ölçeklenebilir uygulamalar oluşturmak için bir çerçevedir.

Plasma, sınırsız sayıda alt Zincir — ana Ethereum Blokzincirinin kopyaları — oluşturulmasını sağlamak için akıllı Sözleşmelerin ve Merkle ağaçlarının kullanımından yararlanır. İşlemlerin ana Zincirden alt Zincirlere devredilmesi, hızlı ve ucuz işlemlere olanak tanır.

Plasma'nın dezavantajlarından biri, fonlarını katman 2'den çekmek isteyen kullanıcılar için uzun bir bekleme süresidir. Plasma, kanallara benzer şekilde, genel amaçlı akıllı Sözleşmeleri ölçeklendirmek için kullanılamaz. OMG Network, More Viable Plasma adı verilen kendi Plasma uygulamaları üzerine inşa edilmiştir. Matic Network, Plasma çerçevesinin uyarlanmış bir sürümünü kullanan bir platformun başka bir örneğidir.

#### Yan zincirler (7:08) {#sidechains-708}

Yan zincirler, kendi mutabakat modellerine ve Blok parametrelerine sahip, Ethereum uyumlu bağımsız Blokzincirlerdir. Ethereum ile birlikte çalışabilirlik, aynı Ethereum Sanal Makinesi kullanılarak mümkün kılınır, böylece Ethereum temel katmanına dağıtılan Sözleşmeler doğrudan yan zincire dağıtılabilir.

xDai, böyle bir yan zincirin bir örneğidir.

#### ZK toplamaları (8:11) {#zk-rollups-811}

Toplamalar, yan zincir işlemlerini tek bir işlemde birleştirerek — veya "toplayarak" — ve SNARK (Kısa ve Öz Etkileşimsiz Bilgi Argümanı) olarak da bilinen kriptografik bir kanıt oluşturarak ölçeklendirme sağlar. Temel katmana yalnızca bu kanıt sunulur. Toplamalar ile tüm işlem durumu ve yürütme yan zincirlerde gerçekleştirilir; ana Ethereum Zinciri yalnızca işlem verilerini depolar.

İki tür Rollup vardır: ZK toplamaları ve iyimser toplamalar.

ZK toplamaları, iyimser toplamalardan daha hızlı ve daha verimli olmalarına rağmen, mevcut akıllı Sözleşmelerin katman 2'ye geçmesi için kolay bir yol sağlamaz.

İyimser toplamalar, Ethereum'da yürütülebilen aynı akıllı Sözleşmelerin yürütülmesine olanak tanıyan OVM (İyimser Sanal Makine) adı verilen EVM uyumlu bir sanal makine çalıştırır. Bu, mevcut akıllı Sözleşmelerin birleştirilebilirlik özelliklerini korumasını kolaylaştırdığı için gerçekten önemlidir, ki bu tüm büyük akıllı Sözleşmelerin zaten savaş testinden geçtiği merkeziyetsiz finans (DeFi) alanında son derece geçerlidir.

İyimser toplamalar üzerinde çalışan ana projelerden biri, Ana Ağ lansmanına giderek yaklaşan Optimism'dir. ZK toplamalarına gelince, Loopring ve DeversiFi, katman 2 üzerine inşa edilmiş merkeziyetsiz borsaların iyi örnekleridir. Bunun da ötesinde, ölçeklenebilir kripto ödemelerini mümkün kılan zkSync'e sahibiz.

#### Toplama merkezli bir yol haritası (9:18) {#a-rollup-centric-roadmap-918}

Rollup ölçeklenebilirliği Ethereum 2.0 ile de büyütülebilir. Aslında, toplamaların yalnızca veri katmanının ölçeklendirilmesine ihtiyacı olduğundan, verilerin parça zincirlerine ayrılmasıyla ilgili olan Ethereum 2.0 Aşama 1'de şimdiden muazzam bir artış elde edebilirler.

Mevcut bir dizi katman 2 ölçeklendirme çözümüne rağmen, Ethereum topluluğu temel olarak toplamalar ve Ethereum 2.0 Aşama 1 veri parça zinciri aracılığıyla ölçeklendirme yaklaşımında birleşiyor gibi görünüyor. Bu yaklaşım, Vitalik Buterin'in yakın tarihli "Toplama Merkezli Bir Ethereum Yol Haritası" adlı gönderisinde de doğrulandı.

Gelecekteki videolarda, Ethereum 2.0 ile temel katman ölçeklendirmesini ve hem katman 1 hem de katman 2 ölçeklendirmesinin merkeziyetsiz finansı herkes için daha erişilebilir hale getirmeye nasıl yardımcı olabileceğini keşfedeceğiz.