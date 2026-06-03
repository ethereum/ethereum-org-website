---
title: "2026'da Ethereum Üzerinde Geliştirme Yapmak: Neler Değişti"
description: "2023'ten bu yana gerçekleşen üç protokol yükseltmesi, oluşturucuların önemsediği iki şeyi değiştirdi: L1 kullanım maliyeti ve normal cüzdanların yapabilecekleri. 2026'da Ethereum üzerinde geliştirme yapmak için pratik bir rehber."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "gaz ücretleri"
  - "hesap soyutlama"
  - "protokol yükseltmeleri"
published: 2026-05-07
image: /images/developers/blog/latest-post-header-3.png
breadcrumb: "2026'da Ethereum Üzerinde Geliştirme Yapmak"
lang: tr
---

Ethereum hakkındaki zihinsel modeliniz 2021 ile 2023 yılları arasında oluştuysa, artık güncel değildir. O zamandan beri gerçekleşen üç protokol yükseltmesi (Mart 2024'te [Dencun](/roadmap/dencun/), Mayıs 2025'te [Pectra](/roadmap/pectra/) ve Aralık 2025'te [Fusaka](/roadmap/fusaka/)), oluşturucuların önemsediği iki şeyi değiştirdi: katman 1 (L1) kullanım maliyeti ve normal cüzdanların yapabilecekleri.

## Ana Ağ yeniden ucuz {#mainnet-is-cheap-again}

2021'den 2023'e kadar olan ücret rejimi artık güvenli bir varsayılan kabul değildir.

5 Mayıs 2026 itibarıyla Etherscan'in gaz izleyicisi, standart gazı 0,15 Gwei civarında gösteriyor ve Nisan ayı boyunca günlük ortalamalar 0,5 Gwei'ye yakındı. Temel bir ETH transferi bu seviyede bir sentin altındadır ve son günlerdeki tipik maliyetler düşük tek haneli sentlere inmiştir. Son yükseltmelerin her birinde düşüş eğilimi görüldü ve bir sonraki yükseltme olan [Glamsterdam](/roadmap/glamsterdam/)'ın ücretleri daha da aşağı çekmesi bekleniyor. Bu durum, "Ethereum Ana Ağı çoğu uygulama için çok pahalı" argümanını geçersiz bir başlangıç noktası hâline getiriyor.

Basit bir pratik kural istiyorsanız, eski efsaneler yerine gaz matematiğini kullanın. Nisan ayındaki son ortalama olan 0,5 Gwei ve yaklaşık 2.350 $ seviyesindeki ETH ile örnek maliyetler şu şekildedir.

| İşlem | Kullanılan Gaz | Örnek Maliyet |
| :-------------- | :---------- | :---------------- |
| ETH transferi | 21.000 | **$0,025** |
| ERC-20 transferi | \~65.000 | **$0,076** |
| ERC-20 onaylama | \~46.000 | **$0,054** |
| Takas | \~180.000 | **$0,21** |
| ERC-20 dağıtımı | \~1.200.000 | **$1,41** |

Bunlar garantiler değil, örneklerdir. Maliyetler ETH fiyatı, gas fiyatı ve sözleşme karmaşıklığı ile birlikte değişir. Gwei okumaları normal bir ay içinde büyük dalgalanmalar gösterebilirken dolar maliyeti neredeyse hiç değişmez; çünkü toplamalar artık Ethereum işlemlerinin yaklaşık yüzde 95'ini taşıyor ve L1 tipik olarak blok hedefinin oldukça altında çalışıyor. Ana Ağ ücretleri artık birçok uygulamanın Ana Ağ üzerinde mantıklı bir şekilde çalışabileceği kadar düşüktür.

### Maliyetler neden düştü? {#why-costs-fell}

İşin çoğunu üç yükseltme yaptı.

Dencun (Mart 2024), EIP-4844'ü tanıttı ve ayrı bir ücret piyasası ile bloblar aracılığıyla toplamalara kendi veri şeritlerini verdi. Toplamalar, aynı blok alanında sıradan yürütme trafiğiyle rekabet etmeyi bıraktı.

Pectra, 7 Mayıs 2025'te etkinleştirildi. EIP-7691, blob işlem kapasitesini blok başına 3 hedef / 6 maksimum blob'dan 6 hedef / 9 maksimuma çıkardı; bu da toplamaların kullandığı ucuz veri şeridini genişletti ve katman 2 (L2) ücretlerini daha da aşağı çekti.

Fusaka, 3 Aralık 2025'te etkinleştirildi. Öne çıkan kapasite değişikliği, doğrulayıcıların her bir blob'u tamamen indirmek yerine blob verilerini örneklemesine olanak tanıyan PeerDAS idi ve bu örnekleme, ağ katmanında daha yüksek blob sayılarının güvenli olmasını sağlayan şeydir. Buna paralel olarak topluluk, 2025 yılı boyunca L1 gaz limitini 30 milyondan 60 milyona çıkardı ve Fusaka'nın EIP-7935'i 60 milyonu yeni varsayılan olarak standartlaştırdı. EIP-7825, herhangi bir tekil işlemi \~16,78 milyon gaz ile sınırlar; çoğu uygulama bunu asla fark etmeyecektir ancak çok büyük dağıtımlar ve monolitik çoklu çağrılar (multicall) artık bu sınıra uymak zorundadır. EIP-7951 ayrıca Ana Ağ'a yerel secp256r1 (P-256) doğrulaması ekledi; bu da hesap akışlarında geçiş anahtarı ve WebAuthn imzalarını doğrulamayı çok daha ucuz hâle getiriyor.

Bunun net etkisi, Ana Ağ'ın artık kalıcı olarak sıkışık bir zincir gibi fiyatlandırılmamasıdır.

## EIP-7702 hesap modelini nasıl değiştiriyor? {#how-eip-7702-changes-the-account-model}

Pectra ayrıca, kullanıcıyı yeni bir hesaba geçmeye zorlamadan normal cüzdanlara toplu işleme, gaz sponsorluğu, oturum anahtarları, kurtarma akışları ve geçiş anahtarı dostu kullanıcı deneyimi (UX) gibi akıllı hesap davranışlarına erişim sağlayan EIP-7702'yi de sundu.

Bu, bir EOA'nın (Harici Sahipli Hesap) hâlihazırda dağıtılmış sözleşme koduna bir işaretçi ayarlamasına olanak tanıyan yeni bir işlem türü (tür `0x04`, `SetCode`) ekleyerek çalışır. Kullanıcı aynı adresi korur, orijinal EOA anahtarı hesap üzerindeki nihai kontrolü elinde tutar ve yetki devri daha sonra değiştirilebilir veya boş (null) adrese sıfırlanabilir.

Uygulama oluşturucuları için pratik değişiklik, düşük seviyeli EIP-7702 kurulumu yerine cüzdandan sonucu istemektir. Bir kullanıcının tek bir akışta onaylaması ve takas yapması gerekiyorsa, ERC-5792 `wallet_sendCalls` aracılığıyla bir toplu işleme talep edin. Cüzdan; EIP-7702, ERC-4337 veya başka bir hesap sistemi kullanıp kullanmayacağına karar verebilir.

Yetki devredilen kod bir güvenlik sınırıdır. Bir cüzdan bir EOA'yı hatalı veya kötü amaçlı bir koda yönlendirirse, bu kod kullanıcı adına token onayları, transferler ve uygulama etkileşimleri dâhil olmak üzere çağrılar yapabilir. Oluşturucular, yetki devri hedeflerine cüzdan altyapısı gibi davranmalı, cüzdan tarafından incelenmiş uygulamalara güvenmeli ve kullanıcılardan uygulama kontrollü koda gelişigüzel yetki devretmelerini istememelidir.

## Bu durum geliştirme yöntemlerini nasıl değiştiriyor? {#what-this-changes-about-how-to-build}

Varsayılan oluşturucu sorusu eskiden "hangi L2 yeterince ucuz?" şeklindeydi. Bu sorunun hâlâ cevapları var ancak tek soru bu değil. Normal yük altında işlem başına sent aralığındaki L1 ücretleri ve EIP-7702'nin herhangi bir cüzdanın adresleri taşımadan akıllı hesap kullanıcı deneyimi sunmasına izin vermesiyle, daha yararlı varsayılan soru uygulamanın Ana Ağ'da yaşayıp yaşamayacağı veya belirli bir L2'nin L1'in sağlayamayacağı gerçek bir dağıtım, likidite veya kullanıcı deneyimi avantajı sağlayıp sağlamadığıdır.

Hesap varsayımı da değişiyor. Yeni uygulamaları, sanki her kullanıcı hesabı yararlı bir şey yapmadan önce ETH tutması gereken düz bir ECDSA EOA'sıymış gibi tasarlamayın. ERC-5792 `wallet_sendCalls` gibi cüzdan düzeyinde toplu işleme arayüzlerini tercih edin, gaz sponsorluğunun ve oturum anahtarlarının normal cüzdan özellikleri hâline geleceğini varsayın ve geçiş anahtarları ile kurtarma akışlarını ayrı sisteme katılım hileleri yerine hesap kullanıcı deneyimi yüzeyinin bir parçası olarak ele alın.

## Sırada ne var? {#whats-next}

Ethereum'un bir sonraki isimlendirilmiş yükseltmesi, öne çıkan maddeler olarak Blok Düzeyinde Erişim Listeleri (BAL'ler) ve yerleşik teklifçi-oluşturucu ayrımı (ePBS) ile Glamsterdam'dır. Bunlar birlikte, blok gaz limitini bugünkü 60 milyondan yaklaşık 200 milyona çıkarmayı güvenli hâle getirerek oluşturucuların çalışması için daha fazla L1 kapasitesi bırakıyor. Etkinleştirmenin 2026'nın ikinci yarısında gerçekleşmesi bekleniyor. Glamsterdam'dan sonra, öne çıkan özelliği olarak Çatallanma Seçimi Zorunlu Dahil Etme Listeleri (FOCIL) seçilen [Hegotá](https://forkcast.org/upgrade/hegota/)'nın gelmesi planlanıyor.

Oluşturucular için takip etmeye değer öğeler; daha fazla L1 kapasitesi (BAL'ler), daha güvenilir işlem dâhil etme (FOCIL) ve yerel hesap soyutlamaya giden yoldur. Diğer Glamsterdam başlığı olan ePBS, çoğunlukla L1 işlem dâhil etme altındaki bir güven bağımlılığını ortadan kaldıran bir altyapı değişikliğidir. Doğrudan uygulama düzeyindeki yüzey değişikliği küçüktür.

BAL'ler, kullanım arttıkça L1'i ucuz tutmakla ilgilidir. Basit bir ifadeyle, bir blok, dokunduğu hesapların ve depolamanın bir haritasıyla birlikte gelir. İstemciler bu haritayı verileri önceden getirmek ve bağımsız işlemleri paralel olarak yürütmek için kullanabilir; bu da blokları doğrulamak için çok yavaş hâle getirmeden L1 gaz limitini yükseltmeyi daha güvenli kılar. Oluşturucular için pratik etkisi, 2021'den 2023'e kadar olan gaz rejimini otomatik olarak yeniden yaratmadan daha fazla etkinliğin Ana Ağ'a geri dönebilmesidir.

FOCIL, bir blok üreticisi onları dışarıda bırakmayı tercih etse bile geçerli işlemlerin bloklara dâhil edilmesiyle ilgilidir. Bugün, bir bloğu oluşturan taraf bir işlemi görmezden gelirse, protokolün geri kalanının onu zorlamak için sınırlı yolları vardır. EIP-7805 ile birkaç doğrulayıcı aslında "bu geçerli işlemlerin halka açık bellek havuzunda beklediğini gördük" diyecektir. Bir sonraki blok daha sonra bunları dâhil etmek zorundadır, aksi takdirde doğrulayıcılar o bloğu desteklemeyi reddedebilir. Oluşturucular için bu durum; gizlilik araçları, denetime tabi itibari para geçişleri (onramps) veya bazı altyapı sağlayıcıları tarafından filtrelenebilecek kullanıcılara hizmet veren uygulamalar dâhil olmak üzere L1'e güvenilir erişimin ürünün bir parçası olduğu durumlarda önemlidir.

Uygulama oluşturucuları için en yakından izlenmesi gereken Hegotá öğesi hesap soyutlamadır. EIP-8141, Çerçeve İşlemleri (Frame Transactions), doğrulama, yürütme ve gaz ödemesinin çerçevelere bölündüğü bir işlem türü ekleyecektir. Uygulamada bu, akıllı bir hesabın ERC-4337 EntryPoint'e, paketleyicilere (bundlers) veya uygulama tarafından çalıştırılan aktarıcılara (relayers) bağlı kalmadan bir işlemi kendisinin doğrulayabileceği, kendi imza kurallarını tanımlayabileceği, gazı kimin ödeyeceğini onaylayabileceği ve bir veya daha fazla eylemi yürütebileceği anlamına gelir.

Bu, ürün varsayımlarını değiştirir. Gaz sponsorluğu, her uygulamanın ayrı ayrı düzenlemesi gereken bir altyapı yerine yerel bir hesap modeli hâline gelir. Bugün geçiş anahtarları ve kuantum sonrası geçiş gerekirse ECDSA'dan uzaklaşan bir yol dâhil olmak üzere alternatif imza şemalarını desteklemek kolaylaşır. EIP-8141 veya benzer bir yerel hesap soyutlama tasarımı hayata geçerse, oluşturucu modeli "bir EOA bir işlemi imzalar"dan "bir hesap bir işlemi nasıl doğrulayacağını, ödeyeceğini ve yürüteceğini tanımlar"a kayar.

Bu bir yöndür, bir söz değil. EIP-8141 Taslak aşamasındadır ve Mayıs 2026 itibarıyla Hegotá'ya yalnızca "dâhil edilmesi düşünülmektedir", yani istemci ekipleri bunu tartışıyor ancak o yükseltmede sunmayı taahhüt etmemiştir. Hesap kullanıcı deneyimi için pratik 2026 geliştirme yolu hâlâ EIP-7702 artı ERC-4337 cüzdan akışlarıdır, ancak oluşturucular programlanabilir hesaplar varsayılan hesap modeli hâline geliyormuş gibi tasarım yapmalıdır.

## Şimdi neleri farklı geliştirmeli? {#what-to-build-differently-now}

Eski ücret varsayımlarını yeniden kontrol ederek başlayın. Dağıtım stratejiniz Ethereum Ana Ağı'nı varsayılan olarak 10 ila 30 Gwei'lik bir ortam olarak ele alıyorsa, muhtemelen çok fazla işi L1'den uzaklaştırıyordur. Uygulamanız paylaşılan likiditeye, mevcut protokollerle birleştirilebilirliğe, tarafsızlığa veya Ethereum'un güvenliğinin ve sosyal mutabakatının en güçlü olduğu yerde yaşaması gereken yüksek değerli duruma bağlı olduğunda, Ana Ağ ilk olarak dikkate alınmaya değerdir.

Dağıtım, çok yüksek işlem hacmi, uygulamaya özel ekosistemler veya sıfıra olabildiğince yakın olması gereken eylem başına maliyetler dâhil olmak üzere hâlâ önemli olan nedenler için L2'leri kullanın. Mesele "her şey için Ana Ağ" değildir. Mesele, "Ana Ağ çok pahalı" argümanının artık ilk filtre olmaması gerektiğidir.

Hesap tarafında, ham EOA'lar yerine cüzdan yeteneklerine göre geliştirme yapın. Ön yüzünüz (frontend); toplu çağrılar, sponsorlu gaz, oturum anahtarları, geçiş anahtarları ve cüzdanlar aracılığıyla gelecek kurtarma akışları için hazır olmalıdır. EIP-7702 ve ERC-4337 günümüzdeki pratik araçlardır. Yerel hesap soyutlama, bir sonraki takip edilecek yöndür.

Ethereum Ana Ağı'nı yalnızca en sonunda dokunduğunuz pahalı bir uzlaşma katmanı olarak görmeyi bırakın ve kullanıcı hesaplarına herhangi bir şey yapmadan önce ETH tutması gereken statik ECDSA anahtarları gibi davranmaktan vazgeçin. 2026'da Ethereum, daha ucuz L1 yürütmesine ve programlanabilir hesaplara doğru ilerliyor. O dünya için geliştirme yapın.

## Daha fazla okuma {#further-reading}

- [Pectra Ana Ağ Duyurusu](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)
- [Fusaka Ana Ağ Duyurusu](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)
- [2026 İçin Protokol Öncelikleri Güncellemesi](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Kontrol Noktası #9 (Nisan 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [ethereum.org üzerinde Pectra 7702 yönergeleri](https://ethereum.org/en/roadmap/pectra/7702/)
- [EIP-7702 EOA'lar İçin Kod Ayarlama](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-7928 Blok Düzeyinde Erişim Listeleri](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-7805 Çatallanma Seçimi Zorunlu Dahil Etme Listeleri (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141 Çerçeve İşlemi](https://eips.ethereum.org/EIPS/eip-8141)
- [Forkcast Hegotá Yükseltmesi](https://forkcast.org/upgrade/hegota/)
- [Etherscan Gaz İzleyicisi](https://etherscan.io/gastracker)
- [EIP-7773 Glamsterdam Sert Çatallanma Metası](https://eips.ethereum.org/EIPS/eip-7773)
- [ethereum.org üzerinde Glamsterdam yol haritası](https://ethereum.org/roadmap/glamsterdam/)