---
title: "Pectra 7702 kuralları"
description: "Pectra sürümündeki 7702 hakkında daha fazla bilgi edinin"
lang: tr
---

# Pectra 7702

## Özet {#abstract}

EIP 7702, bir EOA'ya kod eklemek için bir mekanizma tanımlar. Bu teklif, eski Ethereum hesapları olan EOA'ların kısa vadeli işlevsellik iyileştirmeleri almasına olanak tanıyarak uygulamaların kullanılabilirliğini artırır. Bu, yeni bir işlem türü olan 4 kullanılarak önceden dağıtılmış koda bir işaretçi ayarlanarak yapılır.

Bu yeni işlem türü bir yetkilendirme listesi sunar. Listedeki her yetkilendirme demeti şu şekilde tanımlanır:

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address**, delegasyondur (EOA tarafından kullanılacak, önceden dağıtılmış bayt kodu)
**chain_id**, yetkilendirmeyi belirli bir zincire (veya tüm zincirler için 0) kilitler
**nonce**, yetkilendirmeyi belirli bir hesap nonce'una kilitler
(**y_parity, r, s**), yetkilendirmenin uygulandığı EOA'nın (yetkili olarak da adlandırılır) özel anahtarı tarafından keccak(0x05 || rlp ([chain_id ,address, nonce])) olarak tanımlanan yetkilendirme demetinin imzasıdır.

Bir delegasyon, null adrese delege edilerek sıfırlanabilir.

EOA'nın özel anahtarı, delegasyondan sonra hesap üzerinde tam kontrolü elinde tutar. Örneğin, bir Safe'e delege etmek hesabı çoklu imza yapmaz çünkü herhangi bir imza politikasını atlayabilen tek bir anahtar hâlâ vardır. İleriye dönük olarak, geliştiriciler sistemdeki herhangi bir katılımcının bir akıllı sözleşme olabileceği varsayımıyla tasarım yapmalıdır. Akıllı sözleşme geliştiricileri için artık `tx.origin`'in bir EOA'ya atıfta bulunduğunu varsaymak güvenli değildir.

## En iyi uygulamalar {#best-practices}

**Hesap Soyutlama**: Bir delegasyon sözleşmesi, uyumluluğu en üst düzeye çıkarmak için Ethereum’un daha geniş hesap soyutlama (AA) standartlarıyla uyumlu olmalıdır. Özellikle, ideal olarak ERC-4337 uyumlu veya uyumlu olmalıdır.

**İzinsiz ve Sansüre Dayanıklı Tasarım**: Ethereum izinsiz katılıma değer verir. Bir delegasyon sözleşmesi, tek bir "güvenilir" aktarıcıya veya hizmete sabit kodlanmamalı veya bunlara güvenmemelidir. Bu, aktarıcı çevrimdışı olursa hesabı işlemez hâle getirir. Toplu işleme (ör. approve+transferFrom) gibi özellikler, EOA'nın kendisi tarafından bir aktarıcı olmadan kullanılabilir. 7702 tarafından etkinleştirilen gelişmiş özellikleri (Gaz Soyutlaması, Gizliliği Koruyan Para Çekme) kullanmak isteyen uygulama geliştiricileri için bir aktarıcıya ihtiyacınız olacaktır. Farklı aktarıcı mimarileri olsa da, önerimiz en az [giriş noktası 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)'e işaret eden [4337 paketleyicileri](https://www.erc4337.io/bundlers) kullanmaktır çünkü:

- Aktarım için standartlaştırılmış arayüzler sağlarlar
- Dahili ödeme yöneticisi sistemleri içerirler
- İleriye dönük uyumluluk sağlarlar
- [Genel bir bellek havuzu](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool) aracılığıyla sansüre karşı direnci destekleyebilirler
- Init fonksiyonunun yalnızca [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)'dan çağrılmasını gerektirebilirler

Başka bir deyişle, hesaptan gerekli geçerli imzayı veya UserOperation'ı sağladıkları sürece herkes işlem sponsoru/aktarıcısı olarak hareket edebilmelidir. Bu, sansüre karşı direnç sağlar: özel bir altyapı gerekmiyorsa, bir kullanıcının işlemleri, bir denetleyici aktarıcı tarafından keyfi olarak engellenemez. Örneğin, [MetaMask’in Delegasyon Araç Seti](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0), MetaMask'a özel bir sunucu gerektirmek yerine, herhangi bir zincirdeki herhangi bir ERC-4337 paketleyici veya ödeme yöneticisi ile açıkça çalışır.

**Cüzdan Arayüzleri Üzerinden Merkeziyetsiz Uygulama Entegrasyonu**:

Cüzdanların EIP-7702 için belirli delegasyon sözleşmelerini beyaz listeye alacağı göz önüne alındığında, merkeziyetsiz uygulamalar doğrudan 7702 yetkilendirmesi talep etmeyi beklememelidir. Bunun yerine, entegrasyon standartlaştırılmış cüzdan arayüzleri aracılığıyla gerçekleştirilmelidir:

- **ERC-5792 (`wallet_sendCalls`)**: Merkeziyetsiz uygulamaların, cüzdanlardan toplu çağrıları yürütmelerini istemelerini sağlayarak işlem toplama ve gaz soyutlaması gibi işlevleri kolaylaştırır.

- **ERC-6900**: Merkeziyetsiz uygulamaların, cüzdan tarafından yönetilen modüller aracılığıyla oturum anahtarları ve hesap kurtarma gibi modüler akıllı hesap yeteneklerinden yararlanmasına olanak tanır.

Bu arayüzleri kullanarak, merkeziyetsiz uygulamalar EIP-7702 tarafından sağlanan akıllı hesap işlevlerine doğrudan delegasyonları yönetmeden erişebilir, bu da farklı cüzdan uygulamalarında uyumluluk ve güvenlik sağlar.

> Not: Merkeziyetsiz uygulamaların doğrudan 7702 yetkilendirme imzaları talep etmesi için standartlaştırılmış bir yöntem yoktur. Merkeziyetsiz uygulamalar, EIP-7702 özelliklerinden yararlanmak için ERC-6900 gibi belirli cüzdan arayüzlerine güvenmelidir.

Daha fazla bilgi için:

- [ERC-5792 spesifikasyonu](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [ERC-6900 spesifikasyonu](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Satıcıya Bağımlılıktan Kaçınma**: Yukarıdakilerle uyumlu olarak, iyi bir uygulama satıcıdan bağımsız ve birlikte çalışabilirdir. Bu genellikle akıllı hesaplar için ortaya çıkan standartlara uymak anlamına gelir. Örneğin, [Alchemy’nin Modüler Hesabı](https://github.com/alchemyplatform/modular-account), modüler akıllı hesaplar için ERC-6900 standardını kullanır ve "izinsiz birlikte çalışabilir kullanım" göz önünde bulundurularak tasarlanmıştır.

**Gizliliğin Korunması**: Zincir üstü gizlilik sınırlı olsa da, bir delegasyon sözleşmesi veri maruziyetini ve ilişkilendirilebilirliği en aza indirmeye çalışmalıdır. Bu, ERC-20 jetonlarıyla gaz ödemeleri (böylece kullanıcıların gizliliği ve kullanıcı deneyimini iyileştiren halka açık bir ETH bakiyesi tutmasına gerek kalmaz) ve tek seferlik oturum anahtarları (tek bir uzun vadeli anahtara olan bağımlılığı azaltır) gibi özellikleri destekleyerek başarılabilir. Örneğin, EIP-7702, sponsorlu işlemler aracılığıyla jetonlarla gaz ödemeyi mümkün kılar ve iyi bir uygulama, bu tür ödeme yöneticilerini gereğinden fazla bilgi sızdırmadan entegre etmeyi kolaylaştıracaktır. Ayrıca, belirli onayların zincir dışı delegasyonu (zincir üstünde doğrulanan imzalar kullanarak), kullanıcının birincil anahtarıyla daha az zincir üstü işlem anlamına gelir ve bu da gizliliğe yardımcı olur. Aktarıcı kullanmayı gerektiren hesaplar, kullanıcıları IP adreslerini açıklamaya zorlar. PublicMempools bunu geliştirir; bir işlem/UserOp bellek havuzu aracılığıyla yayıldığında, bunun gönderen IP'den mi kaynaklandığını yoksa sadece p2p protokolü aracılığıyla mı aktarıldığını anlayamazsınız.

**Genişletilebilirlik ve Modüler Güvenlik**: Hesap uygulamaları, yeni özellikler ve güvenlik iyileştirmeleriyle gelişebilmeleri için genişletilebilir olmalıdır. Yükseltilebilirlik, EIP-7702 ile doğal olarak mümkündür (çünkü bir EOA, mantığını yükseltmek için gelecekte her zaman yeni bir sözleşmeye delege edebilir). Yükseltilebilirliğin ötesinde, iyi bir tasarım, tamamen yeniden dağıtım gerektirmeden modülerliğe, örneğin farklı imza şemaları veya harcama politikaları için eklenti modüllerine olanak tanır. Alchemy'nin Hesap Seti, geliştiricilerin doğrulama modüllerini (ECDSA, BLS vb. gibi farklı imza türleri için) yüklemesine olanak tanıyan başlıca bir örnektir. ve özel mantık için yürütme modülleri. EIP-7702 özellikli hesaplarda daha fazla esneklik ve güvenlik elde etmek için, geliştiricilerin doğrudan belirli bir uygulamaya değil, bir vekil sözleşmesine delege etmeleri teşvik edilir. Bu yaklaşım, her değişiklik için ek EIP-7702 yetkilendirmeleri gerektirmeden sorunsuz yükseltmelere ve modülerliğe olanak tanır.

Vekil Modelinin Faydaları:

- **Yükseltilebilirlik**: Vekili yeni bir uygulama sözleşmesine yönlendirerek sözleşme mantığını güncelleyin.

- **Özel Başlatma Mantığı**: Gerekli durum değişkenlerini güvenli bir şekilde ayarlamak için başlatma işlevlerini vekile dahil edin.

Örneğin, [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe), EIP-7702 uyumlu hesaplarda delegasyonları güvenli bir şekilde başlatmak ve yönetmek için bir vekilin nasıl kullanılabileceğini gösterir.

Vekil Modelinin Eksileri:

- **Dış aktörlere güvenme**: Güvensiz bir sözleşmeye yükseltme yapmamaları için harici bir ekibe güvenmek zorundasınız.

## Güvenlik Hususları {#security-considerations}

**Yeniden giriş koruması**: EIP-7702 delegasyonunun getirilmesiyle, bir kullanıcının hesabı dinamik olarak bir Dışarıdan Sahip Olunan Hesap (EOA) ile bir Akıllı Sözleşme (SC) arasında geçiş yapabilir. Bu esneklik, hesabın hem işlemleri başlatmasını hem de çağrıların hedefi olmasını sağlar. Sonuç olarak, bir hesabın kendisini çağırdığı ve harici çağrılar yaptığı senaryolarda `msg.sender`, `tx.origin`'e eşit olacaktır; bu, daha önce `tx.origin`'in her zaman bir EOA olduğu varsayımına dayanan belirli güvenlik varsayımlarını zayıflatır.

Akıllı sözleşme geliştiricileri için, `tx.origin`'in bir EOA'ya atıfta bulunduğunu varsaymak artık güvenli değildir. Benzer şekilde, `msg.sender == tx.origin`'i yeniden giriş saldırılarına karşı bir koruma olarak kullanmak artık güvenilir bir strateji değildir.

İleriye dönük olarak, geliştiriciler sistemdeki herhangi bir katılımcının bir akıllı sözleşme olabileceği varsayımıyla tasarım yapmalıdır. Alternatif olarak, `nonReentrant` değiştirici kalıplarıyla yeniden giriş korumalarını kullanarak açık bir yeniden giriş koruması uygulayabilirler. Örneğin [Open Zeppelin'in Yeniden Giriş Koruması](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol) gibi denetlenmiş bir değiştiriciyi takip etmenizi öneririz. Ayrıca [geçici bir depolama değişkeni](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html) de kullanabilirler.

**Başlatma Güvenlik Hususları**

EIP-7702 delegasyon sözleşmelerini uygulamak, özellikle başlatma süreciyle ilgili belirli güvenlik zorluklarını da beraberinde getirir. Başlatma işlevi (`init`) delegasyon süreciyle atomik olarak birleştiğinde kritik bir güvenlik açığı ortaya çıkar. Bu gibi durumlarda, bir öncü (frontrunner) delegasyon imzasını ele geçirebilir ve `init` işlevini değiştirilmiş parametrelerle yürüterek potansiyel olarak hesabın kontrolünü ele geçirebilir.

Bu risk, özellikle mevcut Akıllı Sözleşme Hesabı (SCA) uygulamalarını başlatma mekanizmalarını değiştirmeden EIP-7702 ile kullanmaya çalışırken geçerlidir.

**Başlatma Güvenlik Açıklarını Azaltmaya Yönelik Çözümler**

- `initWithSig` uygulayın  
  Standart `init` işlevini, kullanıcının başlatma parametrelerini imzalamasını gerektiren bir `initWithSig` işleviyle değiştirin. Bu yaklaşım, başlatmanın yalnızca açık kullanıcı onayı ile devam edebilmesini sağlayarak yetkisiz başlatma risklerini azaltır.

- ERC-4337'nin EntryPoint'ini kullanın  
  Başlatma işlevinin yalnızca ERC-4337 EntryPoint sözleşmesinden çağrılmasını zorunlu kılın. Bu yöntem, ERC-4337 tarafından sağlanan standartlaştırılmış doğrulama ve yürütme çerçevesinden yararlanarak başlatma sürecine ek bir güvenlik katmanı ekler.  
  _(Bkz: [Safe Belgeleri](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Bu çözümleri benimseyerek, geliştiriciler EIP-7702 delegasyon sözleşmelerinin güvenliğini artırabilir ve başlatma aşamasında potansiyel öncülük (frontrunning) saldırılarına karşı koruma sağlayabilir.

**Depolama Çakışmaları** Kod delege etmek mevcut depolamayı temizlemez. Bir delegasyon sözleşmesinden diğerine geçiş yaparken, önceki sözleşmeden kalan artık veriler kalır. Yeni sözleşme aynı depolama yuvalarını kullanır ancak bunları farklı yorumlarsa, istenmeyen davranışlara neden olabilir. Örneğin, ilk delegasyon bir depolama yuvasının bir `bool` değerini temsil ettiği bir sözleşmeye yapıldıysa ve sonraki delegasyon aynı yuvanın bir `uint` değerini temsil ettiği bir sözleşmeye yapıldıysa, bu uyumsuzluk öngörülemeyen sonuçlara yol açabilir.

**Kimlik avı riskleri** EIP-7702 delegasyonunun uygulanmasıyla, bir kullanıcının hesabındaki varlıklar tamamen akıllı sözleşmeler tarafından kontrol edilebilir. Bir kullanıcı bilmeden hesabını kötü niyetli bir sözleşmeye delege ederse, bir saldırgan kolayca kontrolü ele geçirip fonları çalabilir. `chain_id=0` kullanıldığında, delegasyon tüm zincir kimliklerine uygulanır. Yalnızca değiştirilemez bir sözleşmeye delege edin (asla bir vekile delege etmeyin) ve yalnızca CREATE2 kullanılarak dağıtılan sözleşmelere delege edin (standart initcode ile - metamorfik sözleşmeler olmadan), böylece dağıtıcı başka bir yerde aynı adrese farklı bir şey dağıtamaz. Aksi takdirde delegasyonunuz, diğer tüm EVM zincirlerinde hesabınızı riske atar.

Kullanıcılar delege edilmiş imzalar gerçekleştirdiğinde, delegasyonu alan hedef sözleşme, kimlik avı risklerini azaltmaya yardımcı olmak için açıkça ve belirgin bir şekilde görüntülenmelidir.

**Minimum Güvenilir Yüzey ve Güvenlik**: Esneklik sunarken, bir delegasyon sözleşmesi temel mantığını minimal ve denetlenebilir tutmalıdır. Sözleşme, etkin bir şekilde kullanıcının EOA'sının bir uzantısıdır, bu nedenle herhangi bir kusur felaketle sonuçlanabilir. Uygulamalar, akıllı sözleşme güvenlik topluluğunun en iyi uygulamalarını takip etmelidir. Örneğin, kurucu veya başlatıcı işlevleri dikkatli bir şekilde güvence altına alınmalıdır - Alchemy tarafından vurgulandığı gibi, 7702 altında bir vekil modeli kullanılıyorsa, korumasız bir başlatıcı bir saldırganın hesabı ele geçirmesine izin verebilir. Ekipler zincir üstü kodu basit tutmayı hedeflemelidir: Ambire’nin 7702 sözleşmesi, hataları azaltmak için karmaşıklığı kasıtlı olarak en aza indiren yalnızca ~200 satır Solidity kodundan oluşur. Özellik açısından zengin mantık ile denetimi kolaylaştıran basitlik arasında bir denge kurulmalıdır.

### Bilinen uygulamalar {#known-implementations}

EIP 7702'nin doğası gereği, cüzdanların kullanıcılara 3. taraf bir sözleşmeye delege etmelerine yardımcı olurken dikkatli olmaları önerilir. Aşağıda denetlenmiş bilinen uygulamaların bir koleksiyonu listelenmiştir:

| Sözleşme adresi                            | Kaynak                                                                                                                                 | Denetimler                                                                                                                                                        |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                  | [denetimler](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                  | [denetimler](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)          | [denetimler](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                      | [denetimler](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Ethereum Vakfı AA ekibi](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [denetimler](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                  | [denetimler](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Donanım cüzdanı yönergeleri {#hardware-wallet-guidelines}

Donanım cüzdanları keyfi delegasyona izin vermemelidir. Donanım cüzdanı alanındaki mutabakat, güvenilir delege sözleşmelerinin bir listesini kullanmaktır. Yukarıda listelenen bilinen uygulamalara izin vermenizi ve diğerlerini duruma göre değerlendirmenizi öneririz. EOA'nızı bir sözleşmeye delege etmek tüm varlıklar üzerinde kontrol sağladığından, donanım cüzdanları 7702'yi uygulama biçimlerinde dikkatli olmalıdır.

### Yardımcı uygulamalar için entegrasyon senaryoları {#integration-scenarios-for-companion-apps}

#### Tembel {#lazy}

EOA hâlâ normal şekilde çalıştığından, yapacak bir şey yoktur.

Not: ERC 1155 NFT'leri gibi bazı varlıklar delegasyon kodu tarafından otomatik olarak reddedilebilir ve destek bunun farkında olmalıdır.

#### Farkında {#aware}

Kodunu kontrol ederek kullanıcıya EOA için bir delegasyon olduğunu bildirin ve isteğe bağlı olarak delegasyonu kaldırmayı teklif edin.

#### Ortak delegasyon {#common-delegation}

Donanım sağlayıcı, bilinen delegasyon sözleşmelerini beyaz listeye alır ve yazılım yardımcısında bunların desteğini uygular. Tam ERC 4337 desteğine sahip bir sözleşme seçmeniz önerilir.

Farklı birine delege edilen EOA'lar, standart EOA'lar olarak ele alınacaktır.

#### Özel delegasyon {#custom-delegation}

Donanım sağlayıcısı kendi delegasyon sözleşmesini uygular ve yazılım yardımcısında desteğini uygulayan listelere ekler. Tam ERC 4337 desteğine sahip bir sözleşme oluşturmanız önerilir.

Farklı birine delege edilen EOA'lar, standart EOA'lar olarak ele alınacaktır.
