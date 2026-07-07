---
title: "Hizmet olarak düğümler"
description: "Düğüm hizmetlerine, artıları ve eksilerine ve popüler sağlayıcılara giriş seviyesinde bir genel bakış."
lang: tr
sidebarDepth: 2
---

## Giriş {#introduction}

Kendi [Ethereum düğümünüzü](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) çalıştırmak, özellikle yeni başlarken veya hızlı bir şekilde ölçeklenirken zorlayıcı olabilir. Sizin için optimize edilmiş düğüm altyapılarını çalıştıran [bir dizi hizmet](#popular-node-services) vardır, böylece bunun yerine uygulamanızı veya ürününüzü geliştirmeye odaklanabilirsiniz. Düğüm hizmetlerinin nasıl çalıştığını, bunları kullanmanın artılarını ve eksilerini açıklayacağız ve başlamak isterseniz sağlayıcıları listeleyeceğiz.

## Ön Koşullar {#prerequisites}

Düğümlerin ve istemcilerin ne olduğu hakkında henüz bir anlayışa sahip değilseniz, [Düğümler ve istemciler](/developers/docs/nodes-and-clients/) bölümüne göz atın.

## Stake edenler {#stakoooooooooooooors}

Bireysel olarak stake edenler, üçüncü taraf sağlayıcılara güvenmek yerine kendi altyapılarını çalıştırmalıdır. Bu, bir fikir birliği istemcisi ile eşleştirilmiş bir yürütme istemcisi çalıştırmak anlamına gelir. [Birleşme](/roadmap/merge)'den önce, yalnızca bir fikir birliği istemcisi çalıştırmak ve yürütme verileri için merkezi bir sağlayıcı kullanmak mümkündü; bu artık mümkün değil - bireysel olarak stake eden biri her iki istemciyi de çalıştırmalıdır. Ancak, bu süreci kolaylaştırmak için kullanılabilecek hizmetler mevcuttur.

[Bir düğüm çalıştırma hakkında daha fazla bilgi edinin](/developers/docs/nodes-and-clients/run-a-node/).

Bu sayfada açıklanan hizmetler, stake etmeyen düğümler içindir.

## Düğüm hizmetleri nasıl çalışır? {#how-do-node-services-work}

Düğüm hizmeti sağlayıcıları, sizin yerinize arka planda dağıtılmış düğüm istemcilerini çalıştırır, böylece sizin çalıştırmanıza gerek kalmaz.

Bu hizmetler genellikle blokzincire yazmak ve blokzincirden okumak için kullanabileceğiniz bir API anahtarı sağlar. Genellikle Ana Ağ'a ek olarak [Ethereum test ağlarına](/developers/docs/networks/#ethereum-testnets) erişimi de içerirler.

Bazı hizmetler size sizin için yönettikleri kendi özel düğümünüzü sunarken, diğerleri etkinliği düğümler arasında dağıtmak için yük dengeleyiciler kullanır.

Neredeyse tüm düğüm hizmetleriyle entegre olmak son derece kolaydır; kendi barındırdığınız düğümü değiştirmek veya hatta hizmetlerin kendileri arasında geçiş yapmak için kodunuzda tek satırlık değişiklikler yapmanız yeterlidir.

Çoğu zaman düğüm hizmetleri, çeşitli [düğüm istemcileri](/developers/docs/nodes-and-clients/#execution-clients) ve [türleri](/developers/docs/nodes-and-clients/#node-types) çalıştırarak, tek bir API'de istemciye özgü yöntemlere ek olarak tam ve arşiv düğümlerine erişmenize olanak tanır.

Düğüm hizmetlerinin özel anahtarlarınızı veya bilgilerinizi saklamadığını ve saklamaması gerektiğini unutmamak önemlidir.

## Bir düğüm hizmeti kullanmanın faydaları nelerdir? {#benefits-of-using-a-node-service}

Bir düğüm hizmeti kullanmanın temel faydası, düğümlerin bakımını yapmak ve yönetmek için mühendislik zamanı harcamak zorunda kalmamaktır. Bu, altyapı bakımı konusunda endişelenmek yerine ürününüzü oluşturmaya odaklanmanızı sağlar.

Kendi düğümlerinizi çalıştırmak, depolamadan bant genişliğine ve değerli mühendislik zamanına kadar çok pahalı olabilir. Ölçeklenirken daha fazla düğüm başlatmak, düğümleri en son sürümlere yükseltmek ve durum tutarlılığını sağlamak gibi şeyler, dikkatinizi dağıtabilir ve kaynaklarınızı istediğiniz Web3 ürününü oluşturmaktan alıkoyabilir.

## Bir Düğüm Hizmeti kullanmanın eksileri nelerdir? {#cons-of-using-a-node-service}

Bir düğüm hizmeti kullanarak ürününüzün altyapı yönünü merkezileştirmiş olursunuz. Bu nedenle, merkeziyetsizliğe en üst düzeyde önem veren projeler, 3. bir tarafa dış kaynak sağlamak yerine kendi düğümlerini barındırmayı tercih edebilir.

[Kendi düğümünüzü çalıştırmanın faydaları](/developers/docs/nodes-and-clients/#benefits-to-you) hakkında daha fazla bilgi edinin.

## Popüler düğüm hizmetleri {#popular-node-services}

İşte en popüler Ethereum düğüm sağlayıcılarından bazılarının bir listesi, eksik olanları eklemekten çekinmeyin! Her düğüm hizmeti, ücretsiz veya ücretli katmanlara ek olarak farklı avantajlar ve özellikler sunar; bir karar vermeden önce hangilerinin ihtiyaçlarınıza en uygun olduğunu araştırmalısınız.

- [**Alchemy**](https://alchemy.com/)
  - [Belgeler](https://www.alchemy.com/docs/)
  - Özellikler
    - Ayda 300 milyon işlem birimiyle (\~30 milyon getLatestBlock isteği) en büyük ücretsiz katman
    - Polygon, Starknet, Optimism, Arbitrum için çoklu zincir desteği
    - En büyük Ethereum dapp'lerinin ve DeFi işlem hacminin ~%70'ine güç sağlar
    - Alchemy Notify aracılığıyla gerçek zamanlı webhook uyarıları
    - Sınıfının en iyisi destek ve güvenilirlik / kararlılık
    - Alchemy'nin NFT API'si
    - İstek Gezgini, Bellek Havuzu İzleyicisi ve Oluşturucu içeren kontrol paneli
    - Entegre test ağı musluğu erişimi
    - 18 bin kullanıcılı aktif Discord oluşturucu topluluğu

- [**Allnodes**](https://www.allnodes.com/)
  - [Belgeler](https://docs.allnodes.com/)
  - Özellikler
    - Allnodes portföy sayfasında oluşturulan PublicNode token'ı ile hız sınırı yok.
    - [PublicNode](https://www.publicnode.com) üzerinde gizlilik odaklı ücretsiz RPC uç noktaları (100'den fazla blokzincir)
    - 90'dan fazla blokzincir için hız sınırı olmayan özel düğümler
    - 30'dan fazla blokzincir için özel arşiv düğümleri
    - 3 bölgede mevcuttur (ABD, AB, Asya)
    - [PublicNode](https://www.publicnode.com/snapshots) üzerinde 100'den fazla blokzincir için anlık görüntüler
    - %99,90-%99,98 çalışma süresi SLA'sı ile 7/24 teknik destek (plana bağlıdır).
    - Saat başı ödeme fiyatlandırması
    - Kredi Kartı, PayPal veya Kripto ile ödeme

- [**All That Node**](https://allthatnode.com/)
  - [Belgeler](https://docs.allthatnode.com/)
  - Özellikler
    - Ücretsiz katmanla günde 50.000 istek
    - 40'tan fazla protokol desteği
    - JSON-RPC (EVM, Tendermint), REST ve Websocket API'leri desteklenir
    - Arşiv verilerine sınırsız erişim
    - 7/24 teknik destek ve %99,9'un üzerinde çalışma süresi
    - Çoklu zincirlerde musluk mevcuttur
    - Sınırsız sayıda API anahtarıyla sınırsız uç nokta erişimi
    - Trace/Debug API desteklenir
    - Otomatik güncellemeler

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Belgeler](https://aws.amazon.com/managed-blockchain/resources/)
  - Özellikler
    - Tamamen yönetilen Ethereum düğümleri
    - Altı bölgede mevcuttur
    - HTTP ve güvenli WebSocket'ler üzerinden JSON-RPC
    - 3 zinciri destekler
    - SLA'lar, 7/24 AWS Desteği
    - Go-ethereum ve Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Belgeler](https://docs.ankr.com/)
  - Özellikler
    - Ankr Protokolü - 8'den fazla zincir için Genel RPC API uç noktalarına açık erişim
    - Mevcut en yakın düğüme hızlı ve güvenilir bir ağ geçidi için yük dengeleme ve düğüm sağlığı izleme
    - WSS uç noktasını ve sınırsız hız limitini etkinleştiren Premium katman
    - 40'tan fazla zincir için tek tıklamayla tam düğüm ve doğrulayıcı düğüm dağıtımı
    - Kullandıkça ölçeklendirin
    - Analitik araçları
    - Kontrol paneli
    - RPC, HTTPS ve WSS uç noktaları
    - Doğrudan destek

- [**Blast**](https://blastapi.io/)
  - [Belgeler](https://docs.blastapi.io/)
  - Özellikler
    - RPC ve WSS desteği
    - Çok bölgeli düğüm barındırma
    - Merkeziyetsiz altyapı
    - Genel API
    - Özel Ücretsiz Plan
    - Çoklu zincir desteği (17'den fazla blokzincir)
    - Arşiv Düğümleri
    - 7/24 Discord Desteği
    - 7/24 İzleme ve uyarılar
    - %99,9 genel SLA
    - Kripto ile ödeme

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Belgeler](https://ubiquity.docs.blockdaemon.com/)
  - Avantajlar
    - Kontrol paneli
    - Düğüm başına temel
    - Analitik

- [**BlockPI**](https://blockpi.io/)
  - [Belgeler](https://docs.blockpi.io/)
  - Özellikler
    - Sağlam ve dağıtılmış düğüm yapısı
    - 40'a kadar HTTPS ve WSS uç noktası
    - Ücretsiz kayıt paketi ve aylık paket
    - Trace yöntemi + Arşiv verisi desteği
    - 90 güne kadar geçerli paketler
    - Özel plan ve kullandıkça öde ödemesi
    - Kripto ile ödeme
    - Doğrudan destek ve Teknik destek

- [**Chainbase**](https://www.chainbase.com/)
  - [Belgeler](https://docs.chainbase.com)
  - Özellikler
    - Yüksek düzeyde kullanılabilir, hızlı ve ölçeklenebilir RPC hizmeti
    - Çoklu zincir desteği
    - Ücretsiz tarifeler
    - Kullanıcı dostu kontrol paneli
    - RPC'nin ötesinde blokzincir veri hizmetleri sağlar

- [**Chainstack**](https://chainstack.com/)
  - [Belgeler](https://docs.chainstack.com/)
  - Özellikler
    - Ücretsiz paylaşımlı düğümler
    - Paylaşımlı arşiv düğümleri
    - GraphQL desteği
    - RPC ve WSS uç noktaları
    - Özel tam ve arşiv düğümleri
    - Özel dağıtımlar için hızlı eşzamanlama süresi
    - Kendi bulutunuzu getirin
    - Saat başı ödeme fiyatlandırması
    - Doğrudan 7/24 destek

- [**dRPC**](https://drpc.org/)
  - [Belgeler](https://drpc.org/docs)
  - NodeCloud: 10$'dan (USD) başlayan tak-çalıştır RPC altyapısı—tam hız, sınır yok
  - NodeCloud özellikleri:
    - 185 ağ için API desteği
    - 40'tan fazla sağlayıcıdan oluşan dağıtılmış havuz
    - Dokuz (9) coğrafi kümeyle küresel kapsama alanı
    - Yapay zeka destekli yük dengeleme sistemi
    - Kullandıkça öde sabit fiyatlandırma—zam yok, süre sonu yok, kilitlenme yok
    - Sınırsız anahtar, ayrıntılı anahtar ayarları, ekip rolleri, ön uç koruması
    - Yöntem başına 20 işlem birimi (CU) sabit oranlı yöntemler
    - [Genel uç nokta zincir listesi](https://drpc.org/chainlist)
    - [Fiyatlandırma hesaplayıcı](https://drpc.org/pricing#calculator)
  - NodeCore: tam kontrol isteyen kuruluşlar için açık kaynaklı yığın

- [**GetBlock**](https://getblock.io/)
  - [Belgeler](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Özellikler
    - 40'tan fazla blokzincir düğümüne erişim
    - Günlük 40 bin ücretsiz istek
    - Sınırsız sayıda API anahtarı
    - 1 GB/sn'de yüksek bağlantı hızı
    - Trace+Arşiv
    - Gelişmiş analitik
    - Otomatik güncellemeler
    - Teknik destek

- [**InfStones**](https://infstones.com/)
  - Özellikler
    - Ücretsiz katman seçeneği
    - Kullandıkça ölçeklendirin
    - Analitik
    - Kontrol paneli
    - Benzersiz API uç noktaları
    - Özel tam düğümler
    - Özel dağıtımlar için hızlı eşzamanlama süresi
    - Doğrudan 7/24 destek
    - 50'den fazla blokzincir düğümüne erişim

- [**Infura**](https://infura.io/)
  - [Belgeler](https://infura.io/docs)
  - Özellikler
    - Ücretsiz katman seçeneği
    - Kullandıkça ölçeklendirin
    - Ücretli arşiv verileri
    - Doğrudan Destek
    - Kontrol paneli

- [**Kaleido**](https://kaleido.io/)
  - [Belgeler](https://docs.kaleido.io/)
  - Özellikler
    - Ücretsiz başlangıç katmanı
    - Tek tıklamayla Ethereum düğümü dağıtımı
    - Özelleştirilebilir istemciler ve algoritmalar (Geth, Quorum ve Besu || PoA, IBFT ve Raft)
    - 500'den fazla yönetim ve hizmet API'si
    - Ethereum işlem gönderimi için RESTful arayüzü (Apache Kafka destekli)
    - Olay teslimi için giden akışlar (Apache Kafka destekli)
    - Derin "zincir dışı" ve yardımcı hizmetler koleksiyonu (ör. iki taraflı şifreli mesajlaşma aktarımı)
    - Yönetişim ve rol tabanlı erişim kontrolü ile basit ağa sisteme katılım
    - Hem yöneticiler hem de son kullanıcılar için gelişmiş kullanıcı yönetimi
    - Yüksek düzeyde ölçeklenebilir, esnek, kurumsal düzeyde altyapı
    - Bulut HSM özel anahtar yönetimi
    - Ethereum Ana Ağı Bağlantısı
    - ISO 27k ve SOC 2, Tip 2 sertifikaları
    - Dinamik çalışma zamanı yapılandırması (ör. bulut entegrasyonları ekleme, düğüm girişlerini değiştirme vb.)
    - Çoklu bulut, çoklu bölge ve hibrit dağıtım orkestrasyonları için destek
    - Basit saatlik SaaS tabanlı fiyatlandırma
    - SLA'lar ve 7/24 destek

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Belgeler](https://docs.lavanet.xyz/)
  - Özellikler
    - Ücretsiz Test Ağı Kullanımı
    - Yüksek Çalışma Süresi için Merkeziyetsiz Yedeklilik
    - Açık kaynak
    - Tamamen Merkeziyetsiz SDK
    - Ethers.js Entegrasyonu
    - Sezgisel Proje Yönetimi Arayüzü
    - Mutabakat Tabanlı Veri Bütünlüğü
    - Çoklu zincir Desteği

- [**Moralis**](https://moralis.io/)
  - [Belgeler](https://docs.moralis.io/)
  - Özellikler
    - Ücretsiz paylaşımlı düğümler
    - Ücretsiz paylaşımlı arşiv düğümleri
    - Gizlilik odaklı (kayıt tutmama politikası)
    - Çapraz zincir desteği
    - Kullandıkça ölçeklendirin
    - Kontrol paneli
    - Benzersiz Ethereum SDK'sı
    - Benzersiz API uç noktaları
    - Doğrudan, teknik destek

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Belgeler](https://docs.nodereal.io/docs/introduction)
  - Özellikler
    - Güvenilir, hızlı ve ölçeklenebilir RPC API hizmetleri
    - Web3 geliştiricileri için geliştirilmiş API
    - Çoklu zincir desteği
    - Ücretsiz başlayın

- [**NodeFlare**](https://nodeflare.app/)
  - [Belgeler](https://nodeflare.app/docs/quick-start)
  - Özellikler
    - Ethereum, Base, Arbitrum One ve Optimism dahil 8 EVM zinciri
    - En yakın sağlıklı düğüme otomatik yük devretme ile 4 bölge (Avrupa, Asya, Kuzey Amerika)
    - Ücretsiz genel uç nokta (API anahtarı yok) + ayda 3 milyon işlem birimi içeren ücretsiz plan
    - İşlem Birimi faturalandırması — yalnızca kullandığınız kadar ödeyin, daha ağır çağrılar daha pahalıdır
    - Ücretli planlarda kısıtlama yok

- [**NOWNodes**](https://nownodes.io/)
  - Özellikler
    - 50'den fazla blokzincir düğümüne erişim
    - Ücretsiz API Anahtarı
    - Blok Gezginleri
    - API Yanıt Süresi ⩽ 1 sn
    - 7/24 Destek Ekibi
    - Kişisel Hesap Yöneticisi
    - Paylaşımlı, arşiv, yedekleme ve özel düğümler

- [**Pocket Network**](https://www.pokt.network/)
  - [Belgeler](https://docs.pokt.network/)
  - Özellikler
    - Merkeziyetsiz RPC Protokolü ve Pazaryeri
    - Günde 1 Milyon İstek Ücretsiz Katmanı (uç nokta başına, maks. 2)
    - Pre-Stake+ Programı (günde 1 milyon istekten fazlasına ihtiyacınız varsa)
    - 15'ten Fazla Blokzincir Desteklenir
    - Uygulamalara hizmet vererek POKT kazanan 6400'den fazla Düğüm
    - Arşiv Düğümü, İzlemeli Arşiv Düğümü ve Test Ağı Düğümü Desteği
    - Ethereum Ana Ağı Düğüm İstemci Çeşitliliği
    - Tek Hata Noktası Yok
    - Sıfır Kesinti Süresi
    - Uygun Maliyetli Sıfıra Yakın Tokenomik (ağ bant genişliği için bir kez POKT stake edin)
    - Aylık batık maliyet yok, altyapınızı bir varlığa dönüştürün
    - Protokole yerleşik Yük Dengeleme
    - Kullandıkça günlük istek sayısını ve saatlik düğüm sayısını sonsuz şekilde ölçeklendirin
    - En gizli, sansüre dayanıklı seçenek
    - Uygulamalı geliştirici desteği
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) kontrol paneli ve analitik

- [**QuickNode**](https://www.quicknode.com)
  - [Belgeler](https://www.quicknode.com/docs/)
  - Özellikler
    - 7/24 teknik destek ve geliştirici Discord topluluğu
    - Coğrafi olarak dengelenmiş, çoklu bulut/metal, düşük gecikmeli ağ
    - Çoklu zincir desteği (Optimism, Arbitrum, Polygon + 11 diğerleri)
    - Hız ve kararlılık için orta katmanlar (çağrı yönlendirme, önbellek, indeksleme)
    - Webhook'lar aracılığıyla Akıllı Sözleşme izleme
    - Sezgisel kontrol paneli, analitik paketi, RPC oluşturucu
    - Gelişmiş güvenlik özellikleri (JWT, maskeleme, beyaz listeye alma)
    - NFT veri ve analitik API'si
    - [SOC2 Sertifikalı](https://www.quicknode.com/security)
    - Geliştiricilerden İşletmelere kadar uygundur

- [**Rivet**](https://rivet.cloud/)
  - [Belgeler](https://rivet.readthedocs.io/en/latest/)
  - Özellikler
    - Ücretsiz katman seçeneği
    - Kullandıkça ölçeklendirin

- [**SenseiNode**](https://senseinode.com)
  - [Belgeler](https://docs.senseinode.com/)
  - Özellikler
    - Özel ve Paylaşımlı düğümler
    - Kontrol paneli
    - Latin Amerika'daki farklı konumlarda birden fazla barındırma sağlayıcısında AWS dışında barındırma
    - Prysm ve Lighthouse istemcileri

- [**SettleMint**](https://console.settlemint.com/)
  - [Belgeler](https://docs.settlemint.com/)
  - Özellikler
    - Ücretsiz deneme
    - Kullandıkça ölçeklendirin
    - GraphQL desteği
    - RPC ve WSS uç noktaları
    - Özel tam düğümler
    - Kendi bulutunuzu getirin
    - Analitik araçları
    - Kontrol paneli
    - Saat başı ödeme fiyatlandırması
    - Doğrudan destek

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Belgeler](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Özellikler
    - Ayda 25 milyon Tenderly Birimi içeren ücretsiz katman
    - Geçmiş verilere ücretsiz erişim
    - Okuma ağırlıklı iş yüklerinde 8 kata kadar daha hızlı
    - %100 tutarlı okuma erişimi
    - JSON-RPC uç noktaları
    - Kullanıcı arayüzü tabanlı RPC istek oluşturucu ve istek önizlemesi
    - Tenderly'nin geliştirme, hata ayıklama ve test araçlarıyla sıkı bir şekilde entegre edilmiştir
    - İşlem simülasyonları
    - Kullanım analitiği ve filtreleme
    - Kolay erişim anahtarı yönetimi
    - Sohbet, e-posta ve Discord aracılığıyla özel mühendislik desteği

- [**Tokenview**](https://services.tokenview.io/)
  - [Belgeler](https://services.tokenview.io/docs?type=nodeService)
  - Özellikler
    - 7/24 teknik destek ve Geliştirici Telegram topluluğu
    - Çoklu zincir desteği (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Hem RPC hem de WSS uç noktaları kullanıma açıktır
    - Arşiv verisi API'sine sınırsız erişim
    - İstek Gezgini ve Bellek Havuzu İzleyicisi içeren kontrol paneli
    - NFT veri API'si ve Webhook bildirimi
    - Kripto ile Ödeme
    - Ekstra davranış gereksinimleri için harici destek

- [**Watchdata**](https://watchdata.io/)
  - [Belgeler](https://docs.watchdata.io/)
  - Özellikler
    - Veri güvenilirliği
    - Kesinti süresi olmadan kesintisiz bağlantı
    - Süreç otomasyonu
    - Ücretsiz tarifeler
    - Her kullanıcıya uygun yüksek limitler
    - Çeşitli düğümler için destek
    - Kaynak ölçeklendirme
    - Yüksek işlem hızları

- [**ZMOK**](https://zmok.io/)
  - [Belgeler](https://docs.zmok.io/)
  - Özellikler
    - Hizmet olarak önden koşma
    - Arama/filtreleme yöntemleriyle küresel işlemler bellek havuzu
    - İşlem göndermek için sınırsız TX ücreti ve sonsuz Gaz
    - Yeni bloğun en hızlı şekilde alınması ve blokzincirin okunması
    - API çağrısı başına en iyi fiyat garantisi

- [**Zeeve**](https://www.zeeve.io/)
  - [Belgeler](https://www.zeeve.io/docs/)
  - Özellikler
    - Blokzincir düğümlerinin ve ağlarının dağıtımını, izlenmesini ve yönetimini sağlayan kurumsal düzeyde kodsuz otomasyon platformu
    - 30'dan Fazla Desteklenen Protokol ve Entegrasyon ve daha fazlası ekleniyor
    - Gerçek dünya kullanım durumları için merkeziyetsiz depolama, merkeziyetsiz kimlik ve Blokzincir Defteri veri API'leri gibi katma değerli Web3 altyapı hizmetleri
    - 7/24 destek ve proaktif izleme, düğümlerin sağlığını her zaman garanti eder.
    - RPC uç noktaları, API'lere kimliği doğrulanmış erişim, sezgisel kontrol paneli ve analitik ile sorunsuz yönetim sunar.
    - Aralarından seçim yapabileceğiniz hem yönetilen bulut hem de kendi bulutunuzu getirme seçenekleri sunar ve AWS, Azure, Google Cloud, Digital Ocean ve şirket içi gibi tüm büyük bulut sağlayıcılarını destekler.
    - Her seferinde kullanıcınıza en yakın düğüme ulaşmak için akıllı yönlendirme kullanıyoruz


## Daha fazla bilgi {#further-reading}

- [Ethereum düğüm hizmetleri listesi](https://ethereumnodes.com/)

## İlgili konular {#related-topics}

- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)

## İlgili eğitimler {#related-tutorials}

- [Alchemy kullanarak Ethereum geliştirmeye başlama](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Web3 ve Alchemy kullanarak işlem gönderme rehberi](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)