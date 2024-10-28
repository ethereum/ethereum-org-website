---
title: Hizmet olarak düğümler
description: Düğüm hizmetleri, bunların artıları ve eksileri ve popüler sağlayıcılara giriş düzeyinde bir genel bakış.
lang: tr
sidebarDepth: 2
---

## Giriş {#Introduction}

Kendi [Ethereum düğümünüzü](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) çalıştırmak, özellikle başlarken veya hızlı ölçeklendirme yaparken zor olabilir. Sizin için optimize edilmiş düğüm altyapılarını çalıştıran [bir dizi hizmet](#popular-node-services) vardır, böylece bunun yerine uygulamanızı veya ürününüzü geliştirmeye odaklanabilirsiniz. Düğüm hizmetlerinin nasıl çalıştığını, bunları kullanmanın artılarını ve eksilerini açıklayacağız ve başlamakla ilgileniyorsanız sağlayıcıları listeleyeceğiz.

## Ön Koşullar {#prerequisites}

Düğümlerin ve istemcilerin ne olduğu konusunda henüz bir fikriniz yoksa, [Düğümler ve istemciler](/developers/docs/nodes-and-clients/) kısmına göz atın.

## Hissedarlar {#stakoooooooooooooors}

Solo paydaşlar üçüncü taraf sağlayıcıları kullanmak yerine kendi altyapı sistemlerini çalıştırmalıdır. Yani bunun anlamı yürütüm istemcisi ile birleştirilmiş fikir birliği istemcisini çalıştırmaktır. [Birleşim'den](/roadmap/merge) önce sadece mutabakat istemcisini çalıştırıp merkezi bir sağlayıcı kullanarak yürütüm istemcisi kullanmak mümkündü. Ancak artık bu mümkün değil, solo paydaş iki istemciyi birlikte çalıştırmak zorundadır. Yalnız bu süreci kolaylaştırmak için bazı hizmetler var.

[Çalışan bir düğüm hakkında daha fazlasını okuyun](/developers/docs/nodes-and-clients/run-a-node/).

Aşağıda açıklanan servisler hisselenmeyen düğümler içindir.

## Düğüm hizmetleri nasıl çalışır? {#how-do-node-services-work}

Düğüm hizmeti sağlayıcıları, siz uğraşmayın diye sahne arkasında sizin için dağıtılmış düğüm istemcileri çalıştırır.

Bu hizmetler tipik olarak blok zincire yazmak ve blok zincirden okumak için kullanabileceğiniz bir API anahtarı sağlar. Bunlar genellikle Ana Ağa ek olarak [Ethereum test ağlarına](/developers/docs/networks/#ethereum-testnets) erişim içerir.

Bazı hizmetler, sizin için yönettikleri kendi özel düğümünüzü sunarken, diğerleri etkinliği düğümler arasında dağıtmak için yük dengeleyicileri kullanır.

Neredeyse tüm düğüm hizmetlerini entegre etmek aşırı derecede kolaydır: Kendi kendine barındırılan düğümünüzü değiştirmek veya hizmetler arasında geçiş yapmak için tek satırlık kod değişiklikleri yeterli olabilir.

Çoğu zaman düğüm hizmetleri çeşitli [düğüm istemcileri](/developers/docs/nodes-and-clients/#execution-clients) ve [düğüm türleri](/developers/docs/nodes-and-clients/#node-types) çalıştırarak tek bir API'da istemciye özel yöntemlere ek olarak tam düğümlere ve arşiv düğümlerine erişmenize olanak tanır.

Düğüm hizmetlerinin özel anahtarlarınızı veya bilgilerinizi saklamadığını ve saklamaması gerektiğini unutmamak önemlidir.

## Bir düğüm hizmeti kullanmanın faydaları nelerdir? {#benefits-of-using-a-node-service}

Bir düğüm hizmeti kullanmanın asıl faydası, düğümlere bakım yapmak ve yönetmek için mühendislik zamanı harcamanın gerekmemesidir. Bu, altyapı bakımı konusunda endişelenmek yerine ürününüzü oluşturmaya odaklanmanıza olanak tanır.

Kendi düğümlerinizi çalıştırmak, depolamadan bant genişliğine ve mühendisliğe harcanan değerli zamana kadar çok pahalıya mal olabilir. Ölçeklendirirken daha fazla düğüm başlatmak, düğümleri en son sürümlere yükseltmek ve durum tutarlılığını sağlamak gibi şeyler, istediğiniz web3 ürününde kaynak oluşturma ve harcama konusundan sizi uzaklaştırabilir.

## Bir Düğüm Hizmeti kullanmanın eksileri nelerdir? {#cons-of-using-a-node-service}

Bir düğüm hizmeti kullanarak, ürününüzün altyapı yönünü merkezileştirirsiniz. Bu nedenle, merkeziyetsizliğe son derecede önem veren projeler, üçüncü bir tarafa dış kaynak sağlamak yerine kendi kendini barındıran düğümleri tercih edebilir.

[Kendi düğümünüzü çalıştırmanın faydaları](/developers/docs/nodes-and-clients/#benefits-to-you) hakkında daha fazlasını okuyun.

## Popüler düğüm hizmetleri {#popular-node-services}

İşte en popüler Ethereum düğüm sağlayıcılarından bazılarının bir listesi, eksik olanları eklemekten çekinmeyin! Her düğüm hizmeti, ücretsiz veya ücretli katmanlara ek olarak farklı avantajlar ve özellikler sunar, bir karar vermeden önce hangisinin ihtiyaçlarınıza en uygun olduğunu araştırmalısınız.

- [**Alchemy**](https://alchemy.com/)
  - [Belgeler](https://docs.alchemyapi.io/)
  - Özellikler
    - Aylık 300 milyon işlem birimiyle en büyük ücretsiz katman (~30 milyon getLatestBlock isteği)
    - Polygon, Starknet, Optimism, Arbitrum için çoklu zincir desteği
    - En büyük Ethereum merkeziyetsiz uygulamalarına ve DeFi işlem hacminin ~%70'ine güç sağlıyor
    - Alchemy Notify aracılığıyla gerçek zamanlı web kancası uyarıları
    - Sınıfının en iyisi destek ve güvenilirlik/kararlılık
    - Alchemy'nin NFT API'sı
    - İstek Gezgini, Mempool İzleyicisi ve Composer ile Gösterge Tablosu
    - Entegre test ağı musluk erişimi
    - 18 bin kullanıcılı aktif Discord kurucu topluluğu

- [**Düğüm ile İlgili Her Şey**](https://allthatnode.com/)
  - [Belgeler](https://docs.allthatnode.com/)
  - Özellikler
    - Ücretsiz katman ile günde 50.000 istek
    - 40'tan fazla protokol desteği
    - JSON-RPC (Ethereum Sanal Makinesi, Tendermint), REST ve Websocket API'leri desteklenir
    - Arşiv verilerine sınırsız erişim
    - 7/24 teknik destek ve %99,9'un üzerinde çalışma süresi
    - Çoklu zincirlerde musluk erişilebilirliği
    - Sınırsız sayıda API anahtarı ile sınırsız uç nokta erişimi
    - İzleme/Hata Ayıklama API'si desteklenir
    - Otomatik güncellemeler

- [**Amazon Yönetimli Blokzincir**](https://aws.amazon.com/managed-blockchain/)
  - [Belgeler](https://aws.amazon.com/managed-blockchain/resources/)
  - Özellikler
    - Tamamen yönetilen Ethereum düğümleri
    - Altı bölgede mevcut
    - HTTP üzerinden JSON-RPC ve güvenli WebSockets
    - 3 zinciri destekler
    - SLA'lar, 7/24 AWS desteği
    - Go-ethereum ve Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Belgeler](https://docs.ankr.com/)
  - Özellikler
    - Ankr Protokolü - sekizden fazla zincirin Genel RPC API uç noktalarına açık erişim
    - En yakındaki kullanılabilir düğüme hızlı ve güvenli bir geçit oluşturmak için yük dengeleme ve düğüm sağlığı takibi
    - WSS uç noktası ve sınırsız oran limitleri sağlayan Premium katman
    - Kırktan fazla zincir için tek tıkla tam düğüm ve doğrulayıcı düğüm kurulumu
    - Kullandıkça ölçeklendirin
    - Analitik araçları
    - Gösterge paneli
    - RPC, HTTPS ve WSS uç noktaları
    - Doğrudan destek

- [**Blast**](https://blastapi.io/)
  - [Belgeler](https://docs.blastapi.io/)
  - Özellikler
    - RPC ve WSS desteği
    - Çoklu bölge düğüm sunucu
    - Merkeziyetsiz altyapı
    - Genel API
    - Özel Ücretsiz Plan
    - Çoklu zincir desteği (17'den fazla blok zincir)
    - Arşiv Düğümleri
    - 7/24 Discord Desteği
    - 7/24 İzleme ve uyarılar
    - %99,9'luk genel SLA
    - Kripto ile ödeme

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Belgeler](https://ubiquity.docs.blockdaemon.com/)
  - Faydalar
    - Gösterge Paneli
    - Düğüm bazında
    - Analitik

- [**BlockPI**](https://blockpi.io/)
  - [Belgeler](https://docs.blockpi.io/)
  - Özellikler
    - Güçlü ve dağıtılmış düğüm yapısı
    - 40 HTTPS ve WSS uç noktasına kadar
    - Ücretsiz kayıt paketi ve aylık paket
    - İzleme yöntemi + Arşiv veri desteği
    - 90 güne kadar geçerli paketler
    - Özellleştirilmiş plan ve kullandıkça ödeme
    - Kripto ile ödeme
    - Doğrudan destek ve Teknik destek

- [**Chainbase**](https://www.chainbase.com/)
  - [Belgeler](https://docs.chainbase.com)
  - Özellikler
    - Çoğunlukla erişilebilir, hızlı ve ölçeklenebilir RPC servisi
    - Çoklu zincir desteği
    - Ücretsiz tarifeler
    - Kullanıcı dostu kontrol paneli
    - RPC'nin ötesinde blok zincir veri servisi sağlar

- [**Chainstack**](https://chainstack.com/)
  - [Belgeler](https://docs.chainstack.com/)
  - Özellikler
    - Ücretsiz paylaşılan düğümler
    - Paylaşılan arşiv düğümleri
    - GraphQL desteği
    - RPC ve WSS uç noktaları
    - Özel tam düğümler ve arşiv düğümleri
    - Özel dağıtımlar için hızlı eşitleme süresi
    - Bulutunuzu getirin
    - Saat başına ödeme fiyatlandırması
    - Doğrudan 7/24 destek

- [**DataHub**](https://datahub.figment.io)
  - [Belgeler](https://docs.figment.io/)
  - Özellikler
    - 3.000.000 istek/ay ile ücretsiz katman seçeneği
    - RPC ve WSS uç noktaları
    - Özel tam düğümler ve arşiv düğümleri
    - Otomatik Ölçeklendirme (Hacim İndirimleri)
    - Ücretsiz arşiv verileri
    - Servis Analizi
    - Gösterge Paneli
    - Doğrudan 24/7 Destek
    - Kripto ile Ödeme (İşletme)

- [**DRPC**](https://drpc.org/)
  - [Belgeler](https://docs.drpc.org/)
  - Özellikler
    - Merkeziyetsiz RPC düğümleri
    - 15'ten fazla Düğüm sağlayıcısı
    - Düğüm dengeleme
    - Ücretsiz katmanda aylık sınırsız işlem birimi
    - Veri doğrulama
    - Özel uç noktalar
    - HTTP ve WSS uç noktaları
    - Sınırsız anahtarlar (ücretsiz ve ücretli kademe)
    - Esnek geri atım seçenekleri
    - [Genel Uç Nokta](https://eth.drpc.org)
    - Ücretsiz paylaşımlı arşiv düğümleri

- [**GetBlock**](https://getblock.io/)
  - [Belgeler](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Özellikler
    - 40'tan fazla blok zincir düğümüne erişim
    - 40 bin ücretsiz günlük istek
    - Sınırsız sayıda API anahtarı
    - 1 GB/sn ile yüksek bağlantı hızı
    - İzleme+Arşiv
    - Gelişmiş analizler
    - Otomatik güncellemeler
    - Teknik destek

- [**InfStones**](https://infstones.com/)
  - Özellikler
    - Ücretsiz katman seçeneği
    - Kullandıkça ölçeklendirin
    - Analitik
    - Gösterge paneli
    - Benzersiz API uç noktaları
    - Özel tam düğümler
    - Özel dağıtımlar için hızlı eşitleme süresi
    - Doğrudan 7/24 destek
    - 50'den fazla blok zincir düğümüne erişim

- [**Infura**](https://infura.io/)
  - [Belgeler](https://infura.io/docs)
  - Özellikler
    - Ücretsiz katman seçeneği
    - Kullandıkça ölçeklendirin
    - Ücretli arşiv verileri
    - Doğrudan Destek
    - Gösterge paneli

- [**Kaleido**](https://kaleido.io/)
  - [Belgeler](https://docs.kaleido.io/)
  - Özellikler
    - Ücretsiz başlangıç ​​katmanı
    - Tek tıklamayla Ethereum düğümü dağıtımı
    - Özelleştirilebilir istemciler ve algoritmalar (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - 500'den fazla yönetimsel ve servis API'sı
    - Ethereum işlem arzı için RESTful arayüzü (Apache Kafka destekli)
    - Olay gönderimi için dışa yayınlar (Apache Kafka destekli)
    - Yan ve "zincir dışındaki" servislerin derin koleksiyonu (ör. iki taraflı şifrelenmiş mesaj iletimi)
    - Yönetişim ve rol tabanlı erişim kontrolü ile kolay ağ katılımı
    - Hem yöneticiler hem uç kullanıcılar için çok yönlü kullanıcı yönetimi
    - Yüksek derecede ölçeklenebilir, esnek, işletme sınıfı altyapı
    - Bulut HSM özel anahtar yönetimi
    - Ethereum Ana Ağ Bağlama
    - ISO 27k ve SOC 2, Tip 2 sertifikasyonları
    - Dinamik çalışma zamanı yapılandırması (ör. bulut entegrasyonları ekleme, düğüm girdilerini değiştirme vb.)
    - Çoklu bulut, çoklu bölge ve hibrit dağıtım düzenlemeleri için destek
    - Basit saatlik SaaS tabanlı ücretlendirme
    - SLA'lar ve 7/24 destek

- [**Lava Ağı**](https://www.lavanet.xyz/)
  - [Belgeler](https://docs.lavanet.xyz/)
  - Özellikler
    - Ücretsiz Test Ağı Kullanımı
    - Yüksek Çalışma Süresi için Merkeziyetsiz Fazlalık
    - Açık kaynak
    - Tamamen Merkeziyetsiz SDK
    - Ethers.js Entegrasyonu
    - Sezgisel Proje Yönetim Arayüzü
    - Mutabakat Tabanlı Veri Bütünlüğü
    - Çoklu Zincir Desteği

- [**Moralis**](https://moralis.io/)
  - [Belgeler](https://docs.moralis.io/)
  - Özellikler
    - Ücretsiz paylaşılan düğümler
    - Ücretsiz paylaşımlı arşiv düğümleri
    - Gizlilik odaklı (kayıt politikası yok)
    - Çapraz zincir desteği
    - Kullandıkça ölçeklendirin
    - Gösterge paneli
    - Benzersiz Ethereum SDK'si
    - Benzersiz API uç noktaları
    - Doğrudan teknik destek

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Belgeler](https://docs.nodereal.io/nodereal/meganode/introduction)
  - Özellikler
    - Güvenilir, hızlı ve ölçeklenebilir RPC API servisleri
    - Web3 geliştiricileri için gelişmiş API
    - Çoklu zincir desteği
    - Ücretsiz başlayın

- [**NOWNode'lar**](https://nownodes.io/)
  - [Belgeler](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Özellikler
    - 50'den fazla blok zincir düğümüne erişim
    - Ücretsiz API Anahtarı
    - Blok Arayıcıları
    - API Yanıt Süresi ⩽ 1 sn
    - 7/24 Destek Ekibi
    - Kişisel Hesap Yöneticisi
    - Paylaşılan, arşivlenen, yedeklenen ve özel düğümler

- [**Pocket Ağı**](https://www.pokt.network/)
  - [Belgeler](https://docs.pokt.network/home/)
  - Özellikler
    - Merkeziyetsiz RPC Protokolü ve Pazar
    - Günlük 1 Milyon Talep Bulunan Ücretsiz Katman (uç nokta başına maks. 2)
    - [Genel Uç Noktalar](https://docs.pokt.network/developers/public-endpoints)
    - Pre-Stake+ Programı (günde 1 milyondan fazla talebe ihtiyacınız varsa)
    - 15'ten Fazla Blok Zinciri Desteklenir
    - Uygulamalara hizmet ederek POKT kazanan 6400'den fazla Düğüm
    - Arşiv Düğümü, İzlemeli Arşiv Düğümü ve Test Ağı Düğümü Desteği
    - Ethereum Ana Ağ Düğümü İstemci Çeşitliliği
    - Tek Başarısızlık Noktası Yok
    - Sıfır Kesinti Süresi
    - Uygun Maliyetli Sıfıra Yakın Tokenomik (ağ bant genişliği için bir kez POKT hisseleyin)
    - Aylık batık maliyet yok, altyapınızı bir varlığa dönüştürün
    - Protokolde yerleşik olarak bulunan Yük Dengeleme
    - Gün başına istek sayısını ve saat başına düğüm sayısını, sonsuz olarak ölçeklendirin
    - En özel, sansüre dirençli seçenek
    - Uygulamalı geliştirici desteği
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) gösterge paneli ve analizleri

- [**QuickNode**](https://www.quicknode.com)
  - [Belgeler](https://www.quicknode.com/docs/)
  - Özellikler
    - 7/24 teknik destek ve Discord topluluğu
    - Coğrafi dengeli, çoklu bulut/metal, düşük gecikmeli ağ
    - Çoklu zincir desteği (Optimism, Arbitrum, Polygon ve diğer 11)
    - Hız ve kararlılık için orta katmanlar (çağrı yönlendirme, önbellek, endeksleme)
    - Web kancaları aracılığıyla akıllı sözleşme izleme
    - Sezgisel gösterge paneli, analiz paketi, RPC oluşturucu
    - Gelişmiş güvenlik özellikleri (JWT, maskeleme, beyaz liste)
    - NFT veri ve analiz API'sı
    - [SOC2 Sertifikalı](https://www.quicknode.com/security)
    - Geliştiricilerden İşletmelere Uygun

- [**Rivet**](https://rivet.cloud/)
  - [Belgeler](https://rivet.readthedocs.io/en/latest/)
  - Özellikler
    - Ücretsiz katman seçeneği
    - Kullandıkça ölçeklendirin

- [**SenseiNode**](https://senseinode.com)
  - [Belgeler](https://docs.senseinode.com/)
  - Özellikler
    - Özel ve Paylaşım düğümleri
    - Gösterge paneli
    - Latin Amerika'daki farklı konumlarda birden fazla barındırma sağlayıcısında AWS'yi barındırma
    - Prysm ve Lighthouse istemcileri

- [**SettleMint**](https://console.settlemint.com/)
  - [Belgeler](https://docs.settlemint.com/)
  - Özellikler
    - Ücretsiz deneme
    - Kullandıkça ölçeklendirin
    - GraphQL desteği
    - RPC ve WSS uç noktaları
    - Özel tam düğümler
    - Bulutunuzu getirin
    - Analitik araçları
    - Gösterge paneli
    - Saat başına ödeme fiyatlandırması
    - Doğrudan destek

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Belgeler](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Özellikler
    - Aylık 25 milyon Tenderly Biriminin dahil olduğu ücretsiz katman
    - Geçmiş verilere ücretsiz erişim
    - 8 kata kadar daha hızlı okuma ağırlıklı iş yükü
    - %100 istikrarlı okuma erişimi
    - JSON-RPC uç noktaları
    - UI temelli RPC istek inşacısı ve istek ön izlemesi
    - Tenderly'nin geliştirme, hata ayıklama ve test araçlarıyla sıkı şekilde entegre
    - İşlem simülasyonları
    - Kullanım analizleri ve filtreleme
    - Kolay erişim anahtarı yönetimi
    - Sohbet, e-posta ve Discord aracılığıyla özel mühendislik desteği

- [**Tokenview**](https://services.tokenview.io/)
  - [Belgeler](https://services.tokenview.io/docs?type=nodeService)
  - Özellikler
    - 7/24 teknik destek ve Telegram geliştiriciler topluluğu
    - Çoklu zincir desteği (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Hem RPC hem WSS uç noktaları kullanıma açıktır
    - Arşiv veri API'sına sınırsız erişim
    - İstek Gezgini ve Bellek Havuzu İzleyicili Gösterge Tablosu
    - NFT veri API'sı ve Web kancası bildirimi
    - Kripto ile Ödeme
    - Ekstra davranış gereksinimleri için harici destek

- [**Watchdata**](https://watchdata.io/)
  - [Belgeler](https://docs.watchdata.io/)
  - Özellikler
    - Veri güvenilirliği
    - Sıfır kesintili kopmayan bağlantı
    - Süreç otomasyonu
    - Ücretsiz tarifeler
    - Tüm kullanıcılara uygun yüksek limitler
    - Çeşitli düğümler için destek
    - Kaynak ölçeklendirme
    - Yüksek işlem hızları

- [**ZMOK**](https://zmok.io/)
  - [Belgeler](https://docs.zmok.io/)
  - Özellikler
    - Hizmet olarak öne çıkan
    - Arama/filtreleme yöntemleriyle küresel işlem bellek havuzu
    - İşlem göndermek için sınırsız TX ücreti ve sonsuz Gaz
    - Yeni blokun en hızlı şekilde alınması ve blok zincirin okunması
    - API çağrısı başına en iyi fiyat garantisi

- [**Zeeve**](https://www.zeeve.io/)
  - [Belgeler](https://www.zeeve.io/docs/)
  - Özellikler
    - Blok zincir ağları ve düğümleri için dağıtım, izleme ve yönetim sağlayan kuruluş seviyesi kod gerektirmeyen bir otomasyon platformu
    - 30'dan fazla Desteklenen Protokol, Entegreasyon ve daha fazlasını eklemek
    - Merkeziyetsiz depolama, merkeziyetsiz kimlik ve Blok Zincir Cüzdanı veri API'ları gibi gerçek hayatta kullanım alanları olan değer atfedilmiş web3 altyapı servisleri
    - 7/24 destek sunarak ve proaktif izleme yaparak düğümlerin iyi durumundan sürekli emin olma.
    - RPC uç noktaları API'lere kimlik doğrulamalı erişim, sezgisel gösterge paneli ve analizlerle zahmetsiz bir yönetim sunar.
    - Hem yönetilen bulut servisi sağlarken hem de kendi bulut servisinizi seçme şansı tanır; bunun için AWS, Azure, Google Cloud ve Digital Ocean gibi bütün büyük bulut sağlayıcılarını destekler.
    - Kullanıcınıza en yakın düğümü sürekli hedef alabilmek için her seferinde akıllı yönlendirmeyi kullanıyoruz


## Daha fazla okuma {#further-reading}

- [Ethereum düğüm hizmetleri listesi](https://ethereumnodes.com/)

## İlgili konular {#related-topics}

- [ Düğümler ve İstemciler](/developers/docs/nodes-and-clients/)

## İlgili öğreticiler {#related-tutorials}

- [Alchemy kullanarak Ethereum geliştirmeye başlangıç](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Web3 ve Alchemy kullanarak işlem gönderme kılavuzu](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
