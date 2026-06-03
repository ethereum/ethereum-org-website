---
title: "Neden Ethereum üzerinde geliştirmeli"
description: "Merkeziyetsizlik, sansür direnci, izinsiz dağıtım ve birleştirilebilirlik ayrı satış noktaları değildir. Birbirlerini güçlendirirler. Geliştiricilerin neden Ethereum'u seçmesi gerektiğine dair pratik bir rehber."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "merkeziyetsizlik"
  - "sansür direnci"
  - "birleştirilebilirlik"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Neden Ethereum üzerinde geliştirmeli"
lang: tr
---

Geliştiriciler, altyapıyı uygulamalarının tutması gereken sözlere göre seçerler.

Çoğu yazılım taahhüdü bir operatöre bağlıdır. Bir bulut sağlayıcısı sunucuyu çalışır durumda tutar. Bir platform hesabı açık tutar. Bir ödeme işlemcisi satıcıyı etkin tutar. Bir API sağlayıcısı anahtarı geçerli tutar. Bu, birçok ürün için uygundur. Ancak ürünün değeri tarafsız erişime, paylaşılan duruma ve kullanıcıların ile diğer geliştiricilerin kendi başlarına doğrulayabilecekleri taahhütlere bağlı olduğunda bu yeterli değildir.

Ethereum, tarafsız erişimin ve doğrulanabilir taahhütlerin ürün olduğu bu ikinci durum için inşa edilmiştir. Kimseye ait değildir. Zincir birçok ülkede, birçok operatörde ve birden fazla bağımsız istemci uygulamasında çalışır ve hiçbir şirket, doğrulayıcı veya vakıf kuralları sessizce yeniden yazamaz. Bir geliştirici için bu, sadece kod barındırılacak bir yer olmadığı anlamına gelir. Burası halka açık taahhütlerde bulunulacak bir yerdir. Kimseye sormadan ürün çıkarabilirsiniz, kullanıcılar dağıttığınız şeye ulaşmaya devam edebilir, diğer geliştiriciler izniniz olmadan bunun üzerine inşa edebilir ve uygulamanız, siz dahil herhangi bir taraf işbirliğini bıraktığında bile çalışmaya devam edebilir.

## Merkeziyetsizlik {#decentralization}

Merkeziyetsizlik, bu özelliklerin üzerinde durduğu temeldir. Ethereum bunu, her biri zincirin bir kopyasını saklayan ve her işlemi kontrol eden düğümler adı verilen bir bilgisayar ağı aracılığıyla sağlar. Her düğüm istemci yazılımı çalıştırır. Doğrulayıcılar adı verilen bir düğüm alt kümesi, mutabakat adı verilen bir süreç aracılığıyla sırayla yeni bloklar teklif eder ve onaylar. Katılmak için doğrulayıcılar, kuralları çiğnemeleri halinde kaybedecekleri stake adı verilen teminat olarak ETH koyarlar. Nisan 2026'da Etherscan'in düğüm izleyicisinde Amerika Birleşik Devletleri, Almanya, Çin, Birleşik Krallık, Rusya, Japonya ve düzinelerce diğer ülkeye dağılmış yaklaşık 13.700 ila 14.000 düğüm izlenmiştir.

Merkeziyetsizlik aynı zamanda ekonomiktir. Arzın yaklaşık %27 ila %29'una denk gelen yaklaşık 32 ila 36 milyon ETH, doğrulayıcıların kanıtlanabilir şekilde kötü davrandığında protokolün kestiği teminat olarak stake edilmiştir. Bir saldırganın zinciri bozmak için bu stake'in anlamlı bir kısmını elde etmesi ve riske atması gerekir. Nisan 2026 ETH fiyatlarıyla bu, on milyarlarca doların risk altında olacağı anlamına gelir.

Diğer boyut ise yazılımın kendisidir. Her Ethereum düğümü yan yana iki yazılım çalıştırır. Bir yürütme istemcisi EVM'yi çalıştırır ve sözleşme durumunu izler. Bir fikir birliği istemcisi Hisse Kanıtı'nı (PoS) yönetir. Hangi doğrulayıcıların blok teklif ettiğini, ağın hangi blokları kabul ettiğini ve bir bloğun ne zaman kesinliğe ulaştığını izler. Sağlıklı bir merkeziyetsizlik, her birinin birden fazla bağımsız uygulamasına ihtiyaç duyar, böylece bir istemcideki bir hata otomatik olarak Ethereum'da bir hata haline gelmez.

Yürütme katmanının üretimde beş büyük istemcisi vardır. Geth yaklaşık %50, Nethermind yaklaşık %25, Besu yaklaşık %9, Reth yaklaşık %8 ve Erigon yaklaşık %7 oranında çalışır. Mutabakat katmanı Lighthouse, Prysm, Teku, Nimbus, Lodestar ve diğer istemciler üzerinde çalışır. Ethereum her iki katmanda da tek istemcili bir zincir değildir.

Geth'in %50'ye yakın payı asıl kırılganlıktır. Azınlık bir istemcideki bir hata operatörleri için acı vericidir, ancak ağın geri kalanı devam edebilir. Çoğunluk bir istemcideki ciddi bir hata daha tehlikelidir. Bu nedenle istemci çeşitliliği canlı bir operasyonel önceliktir.

Bu öncelik test edilmiştir. Ethereum, 30 Temmuz 2015'teki başlangıcından bu yana hiçbir zaman tam bir zincir durması yaşamadı. Büyük bir olaya en çok yaklaştığı an, İşaret zinciri adı verilen mutabakat katmanının yaklaşık 25 dakika ve daha sonra yaklaşık 64 dakika boyunca kesinliğe ulaşamadığı 11-12 Mayıs 2023 tarihleriydi. Nedeni bir Prysm istemci hatasıydı. Kesinlik, doğrulayıcıların üçte ikisinden fazlasının onaylamasını gerektirir ve Prysm'in o zamanki payı, sorununun ağı kısa süreliğine bu eşiğin altına çekecek kadar yüksekti.

Kesinlik duraklaması, zincir durmasıyla aynı şey değildir. Yeni bloklar üretilmeye devam etti, işlemler dahil edilmeye devam etti ve çoğu kullanıcı ile uygulama çalışmaya devam etti. Duraklayan şey Ethereum'un en güçlü uzlaşma garantisiydi. Normal mutabakat varsayımları altında, yaklaşık 13 dakikadan daha eski bir blok geri alınamaz. Mevduatları kredilendirmeden önce kesinlik bekleyen köprüler, borsalar ve diğer sistemler bu akışları duraklatırdı. Yeterli sayıda doğrulayıcı yetiştiğinde, zincirin kendisi manuel müdahale olmadan otomatik olarak toparlandı.

Geliştiriciler için bu geçmiş önemlidir. Eğer diğer insanlar sözleşmelerinizde varlık tutacak, pazarınız üzerinden emir yönlendirecek veya temel yapınızın üzerine inşa edecekse, altındaki temelin hatalar, istemci arızaları ve kurumsal baskılar boyunca çalışmaya devam etmesine ihtiyaçları vardır.

## Sansür direnci {#censorship-resistance}

Merkeziyetsizlik yapıdır. Sansür direnci ise bunun sağladığı pratik şeylerden biridir. Kullanıcıların sözleşmelerinize geçerli bir işlem göndermek için bir şirketten, hükümetten, aktarıcıdan, doğrulayıcıdan, RPC sağlayıcısından veya uygulama operatöründen izin almasına gerek olmamalıdır.

Bu, her işlemin bir sonraki bloğa gireceği anlamına gelmez. Hiçbir tekil tarafın geçerli bir işlemi sonsuza kadar zincir dışında tutamayacağı anlamına gelir. Her blok, onu bir araya getirmek için oluşturucular ve aktarıcılar adı verilen dış taraflarla birlikte çalışan farklı bir doğrulayıcı tarafından teklif edilir. Eğer bunlardan biri işleminizi filtrelerse, bir sonraki slot farklı bir gruba sahip olur ve sonunda içlerinden biri onu dahil eder. Sansürün, hayır diyen tek bir operatörden çok daha zor olan bu sürekli değişen kadronun tamamında devam etmesi gerekir. Tornado Cash sonrası dönem, bunun baskı altında nasıl göründüğünü gösterdi.

Tornado Cash, para yatırma ve çekim arasındaki zincir içi bağlantıyı koparan bir gizlilik karıştırıcı sözleşmesidir. OFAC'ın Ağustos 2022'de yaptırım uygulamasının ardından, birkaç büyük MEV-Boost aktarıcısı yaptırım uygulanan adreslerden gelen işlemleri içeren blokları iletmeyi reddetti. Bu OFAC uyumlu aktarıcılar aracılığıyla oluşturulan blokların payı Kasım 2022'de %79'a yaklaşarak zirve yaptı. Diğer %21'lik kısım filtreleme yapmayan aktarıcılardan ve oluşturuculardan geldi, bu nedenle Tornado Cash işlemleri yine de gerçekleşti, sadece daha yavaştı. Beklenen bekleme süresi yaklaşık 12 saniyeden yaklaşık bir dakikaya çıktı.

Bu endişe verici görünüyordu ve öyleydi de. Sonra bu pay düştü. Ultra Sound ve Agnostic de dahil olmak üzere açıkça filtresiz yeni aktarıcılar başlatıldı ve teklif ediciler bunları MEV-Boost kurulumlarına eklemekte özgürdü. Hiç kimse her teklif ediciyi filtreleme yapan bir aktarıcıya zorlayamazdı, bu nedenle pay zirvede kalamadı. 2023'ün başlarında %50'nin altındaydı ve 2023'ün geri kalanı boyunca %27 ile %47 arasında değişti. OFAC, Mart 2025'te Tornado Cash'i yaptırım listesinden çıkardı. Bu olay, Ethereum'un en net sansür direnci stres testi olmaya devam ediyor.

Ethereum ayrıca bu garantinin daha fazlasını protokolün kendisine taşıyor. FOCIL (EIP-7805) adlı planlanan bir yükseltme, dahil etme listeleri ekler. Rastgele seçilen doğrulayıcılar, halka açık bellek havuzunda gördükleri işlemleri yayınlar ve bir sonraki bloğun bu listeleri karşılaması beklenir. Bir blok bunları görmezden gelirse, ağın geri kalanı onu reddedebilir. Böylece hiç kimse kullanıcılarınızın uygulamanızı kullanmasını engelleyemez.

## İzinsiz {#permissionless}

Sansür direnci, siz ürünü çıkardıktan sonra kullanıcıların uygulamanıza ulaşmaya devam edip edemeyeceği ile ilgilidir. İzinsizlik ise en başta ürünü çıkarıp çıkaramayacağınızla ilgilidir.

Ethereum üzerinde dağıtım yapmak bir ortaklık, hesap, listeleme onayı, uygulama mağazası incelemesi veya ticari anlaşma gerektirmez. Herkes kod dağıtabilir, bir sözleşme çağırabilir, bir düğüm çalıştırabilir, verileri endeksleyebilir, bir cüzdan oluşturabilir veya bir arayüz yayınlayabilir. Temel katman sizin bir girişim, bir banka, yalnız bir geliştirici, bir ajan, bir DAO veya hiç şirketi olmayan bir kullanıcı olup olmadığınızı bilmez.

Bu, geliştirici modelini değiştirir. Bir platformda, platform sahibi şartları değiştirebilir, anahtarları iptal edebilir, bölgeleri engelleyebilir, uygulamaları kaldırabilir veya erişimi bir iş ilişkisine bağlı hale getirebilir. Ethereum'da protokol, işlemleri herhangi bir çağırıcı için aynı genel kurallara göre değerlendirir. Bugün dağıtılan bir sözleşme, zincir çalışmaya devam ettiği sürece her adres için bu genel kurallara göre çalışır.

Bu, her bağımlılığı ortadan kaldırmaz. Çoğu kullanıcı sözleşmelerinize doğrudan ulaşmaz. Bir ön yüz, bir cüzdan ve bir RPC sağlayıcısı üzerinden geçerler ve bu katmanlardan herhangi biri bozulabilir veya filtreleme yapabilir. Ön yüzler kapatılabilir. Çoğu uygulama ve cüzdan isteğini zincire yönlendiren hizmetler olan RPC sağlayıcıları, işlemleri iletmeyi reddedebilir veya belirli bölgeleri ve adresleri engelleyebilir. Cüzdanlar ne göstereceklerini seçebilirler.

Temel yürütme ortamı altta açık kalır. Ön yüzünüz çökerse, bir kullanıcı sözleşmeyi doğrudan çağırabilir ve başka bir geliştirici yeni bir arayüz oluşturabilir. Bir cüzdan Token'ınızı desteklemeyi bırakırsa, sözleşme hala çalışır. Bir RPC sağlayıcısı filtreleme yaparsa, bir uygulama başka bir sağlayıcı üzerinden yönlendirme yapabilir veya ağa ulaşmak için kendi düğümünü çalıştırabilir.

## Birleştirilebilirlik {#composability}

İzinsizlik, kodunuzu zincire taşır. Oraya ulaştığında, hiç kimse onu kaldıramaz, böylece diğer geliştiriciler sözleşmelerinizin üzerine inşa edebilir ve siz de onlarınkilerin üzerine inşa edebilirsiniz.

WETH bunun en temiz örneğidir. ETH'yi diğer sözleşmelerde standart bir Token gibi kullanılabilecek şekilde saran bir sözleşmedir. Sabit bir Ethereum adresinde bulunur, Mayıs 2026 itibarıyla yaklaşık 1,8 milyon WETH tutar, kabaca 3,25 milyon sahibine sahiptir ve DEX'ler, borç verme piyasaları, kasalar ve köprüler arasında ortak bir birim olarak işlev görür. Binlerce başka sözleşme ve uygulamanın doğrudan kullanabileceği bir koddur.

Bu model ekosistem genelinde tekrarlanır. Başlangıçtan 2025'in başlarına kadar Ethereum, Zellic'in sayımına göre on milyonlarca sözleşme dağıtımı ve kabaca 2,5 milyon benzersiz bayt kodu gördü. Değiştirilebilir Token'lar için ERC-20 ve değiştirilemez Token'lar (NFT'ler) için ERC-721 gibi standartlar koordinasyon katmanları haline geldi. Sözleşmenizin çıkardığı bir Token bir DEX'te alınıp satılabilir, bir para piyasasında karşılığında borç alınabilir, analiz araçları tarafından endekslenebilir, cüzdanlarda görüntülenebilir ve her ekibin özel bir anlaşma müzakere etmesine gerek kalmadan diğer sistemler tarafından köprülenebilir veya sarılabilir.

Mayıs 2026 itibarıyla, Ethereum'daki merkeziyetsiz finansta (DeFi) yaklaşık 46 milyar dolar bulunuyordu. Bu para varlıklar, piyasalar, oracle'lar, cüzdanlar, hesap sistemleri, yönetişim sözleşmeleri, köprüler, analizler ve geliştirici araçları dahil olmak üzere binlerce çalışan protokolün içinde kilitlidir. Bunların hepsi, sıfırdan inşa etmek veya ortaklıklar beklemek yerine ilk günden doğrudan çağırabileceğiniz kodlardır.

## Ajan ekonomisi {#the-agent-economy}

Altlarında merkeziyetsizlik bulunan izinsiz erişim ve sansür direnci, Ethereum'a giren bir sonraki kullanıcı dalgası için daha da önemlidir. Yapay zeka ajanları bu dalgadır ve döngüde bir insan olmadan hizmetler için ödeme yapar, sermaye tutar ve işlemler ile sözleşme çağrıları aracılığıyla diğer ajanlarla uzlaşırlar. Bir ajanın ücretlendirilecek bir kartı, askıya alınacak bir platform hesabı ve bir aktarıcı bir işlemi iletmeyi reddettiğinde arayacak bir insanı yoktur. Bu nedenle her ikisi de bu tür yazılımlar için isteğe bağlı olmaktan çıkar ve Ethereum'un özellikleri bir ajanın gerçekte ihtiyaç duyduğu şeyle doğrudan eşleşir. Ethereum, bu ekonominin gerçekleşmesinin beklendiği yerdir ve bu, kullanıcı tabanını muazzam ölçüde büyütebilir.

İster ajanı çıkarın, ister ajanın çağırdığı sözleşmeleri çıkarın, aynı sorunlar ortaya çıkar. Tipik bir barındırılan yığında, ajanın kimliği iptal edilebilen bir platform hesabından kiralanır. Ödemeleri bir insanın kartına veya API anahtarına bağlıdır. Kuralları, bir operatörün kontrol ettiği bir sunucuda çalışır. Sürekliliği, ortadan kaybolabilecek bir barındırıcıya bağlıdır. Bu bağımlılıkların her biri, Ethereum'un temel katmanının ortadan kaldırmak için tasarlandığı şeylerdir.

Ethereum'da bunların hiçbiri bir operatöre bağlı değildir. Ajanın anahtarları kendisine aittir ve imzaladığı kurallar tek taraflı olarak yeniden yazılamaz. İşlemleri, diğer herhangi bir adresi hedeflenen engellemeden koruyan aynı sürekli değişen doğrulayıcılar, oluşturucular ve aktarıcılar kadrosundan geçer. Durum geçişleri halka açık olarak gerçekleşir, bu nedenle çağrının diğer tarafındaki sözleşmelerin ne olduğunu bildirmesi için bir operatöre güvenmesi gerekmez.

Raylar zaten yerinde. Akıllı sözleşmeler, sabit coin'ler ve hesap soyutlama, otonom bir aktöre bugün çalışan bir adres, çalışan bir bakiye ve programlanabilir harcama limitleri sağlar. Ajan kimliği ve makineye özgü ödemeler için standartlar arayı kapatıyor. ERC-8004, ajan kimliği, itibarı ve doğrulaması için zincir içi kayıtları tanımlar. x402, ajanlar da dahil olmak üzere istemcilerin API'lere ve dijital hizmetlere geleneksel hesaplar olmadan sabit coin'lerle ödeme yapmasına izin vermek için HTTP 402 durum kodunu kullanır. Benimseme erken aşamada ancak ilerliyor ve entegrasyon yüzeyi küçük. Uç noktalarınızda x402 ödemelerini kabul edin, ERC-8004 aracılığıyla kimlik kaydedin veya kontrol edin ve sözleşmelerinizde ajan adreslerine birinci sınıf kullanıcılar olarak davranın.

Ürün çıkarmak için bir zincir seçen herhangi bir geliştirici için ajanlar, oluşan bir sonraki kullanıcı sınıfıdır ve raylar zaten yayındadır. Bugün dağıttığınız sözleşmeler, gelecekteki bir protokolü beklemeden yarın onlara hizmet edebilir.

## Sonuç {#conclusion}

Merkeziyetsizlik, sansür direnci, izinsiz dağıtım ve birleştirilebilirlik ayrı satış noktaları değildir. Birbirlerini güçlendirirler. Merkeziyetsizlik, sansür direncini inandırıcı kılar ve kullanıcıların piyasaya sürülenlere ulaşmaya devam etmesini sağlar. İzinsiz dağıtım, geliştiricilerin ürün çıkarmasına olanak tanır. Birleştirilebilirlik, bu uygulamaları paylaşılan altyapıya dönüştürür. Otonom ajanlar bunun üzerinden işlem yapabilir ve kimse onları durduramaz. Çıkardığınız şey halka açık bir taahhüttür. Siz olmadan da çalışmaya devam eder.

## Daha fazla bilgi {#further-reading}

- [Ethereum Vakfı Kontrol Noktası #9 (Nisan 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [clientdiversity.org](https://clientdiversity.org/)
- [Etherscan Düğüm İzleyici](https://etherscan.io/nodetracker)
- [beaconcha.in doğrulayıcıları](https://beaconcha.in/charts/validators)
- [Değerlendirme (Post-mortem): Mayıs 2023 Ana Ağ kesinliği](https://medium.com/offchainlabs/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2)
- [mevwatch.info](https://www.mevwatch.info/)
- [The Block: OFAC uyumlu bloklar %27'ye düştü](https://www.theblock.co/post/230179/ethereums-ofac-compliant-blocks-fall-to-27-marking-a-drop-in-protocol-level-censorship)
- [Hegotá Headliner Teklifi: FOCIL (EIP-7805)](https://ethereum-magicians.org/t/hegota-headliner-proposal-focil-eip-7805/27604)
- [EIP-7805: Çatallanma seçimi zorunlu Dahil Etme Listeleri (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8004: Zincir İçi Ajan Kimliği](https://eips.ethereum.org/EIPS/eip-8004)
- [coinbase/x402 GitHub](https://github.com/coinbase/x402)
- [CoinDesk: x402 talebi gerçekleşmedi](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)
- [Etherscan'de WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Zellic: Tüm Ethereum sözleşmeleri](https://www.zellic.io/blog/all-ethereum-contracts/)
- [DefiLlama: Ethereum zinciri](https://defillama.com/chain/ethereum)
- [OpenZeppelin: Blokzincir Ağlarında Teknik Risk Değerlendirmesi (Nisan 2026)](https://openzeppelin.com/hubfs/OpenZeppelin%20%7C%20Technical%20Risk%20Assessment%20on%20Blockchain%20Networks.pdf)