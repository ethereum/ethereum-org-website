---
title: Pectra 7702
metaTitle: Pectra 7702 yönergeleri
description: Pectra sürümündeki 7702 hakkında daha fazla bilgi edinin
lang: tr
---

## Özet {#abstract}

EIP-7702, bir EOA'ya kod eklemek için bir mekanizma tanımlar. Bu teklif, eski Ethereum hesapları olan EOA'ların kısa vadeli işlevsellik iyileştirmeleri almasına olanak tanıyarak uygulamaların kullanılabilirliğini artırır. Bu, yeni bir işlem türü olan 4 kullanılarak halihazırda dağıtılmış koda bir işaretçi ayarlanarak yapılır.

Bu yeni işlem türü bir yetkilendirme listesi sunar. Listedeki her bir yetkilendirme demeti (tuple) şu şekilde tanımlanır:

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address**, yetki devridir (EOA tarafından kullanılacak olan, halihazırda dağıtılmış baytkod)
**chain_id**, yetkilendirmeyi belirli bir zincire kilitler (veya tüm zincirler için 0)
**nonce**, yetkilendirmeyi belirli bir hesap nonce'una kilitler
(**y_parity, r, s**), yetkilendirme demetinin imzasıdır ve yetkilendirmenin uygulandığı EOA'nın (yetkili olarak da adlandırılır) özel anahtarı tarafından keccak(0x05 || rlp ([chain_id ,address, nonce])) olarak tanımlanır.

Bir yetki devri, boş (null) adrese yetki devredilerek sıfırlanabilir.

EOA'nın özel anahtarı, yetki devrinden sonra hesap üzerindeki tam kontrolünü korur. Örneğin, bir Safe'e yetki devretmek hesabı bir çoklu imza (multisig) yapmaz çünkü herhangi bir imzalama politikasını atlayabilecek tek bir anahtar hala mevcuttur. İleriye dönük olarak geliştiriciler, sistemdeki herhangi bir katılımcının bir akıllı sözleşme olabileceği varsayımıyla tasarım yapmalıdır. Akıllı sözleşme geliştiricileri için, `tx.origin` öğesinin bir EOA'yı ifade ettiğini varsaymak artık güvenli değildir.

## En iyi uygulamalar {#best-practices}

**Hesap Soyutlama**: Bir yetki devri sözleşmesi, uyumluluğu en üst düzeye çıkarmak için Ethereum'un daha geniş hesap soyutlama (AA) standartlarıyla uyumlu olmalıdır. Özellikle, ideal olarak ERC-4337 ile uyumlu veya bağdaşır olmalıdır.

**İzinsiz ve Sansüre Dirençli Tasarım**: Ethereum izinsiz katılıma değer verir. Bir yetki devri sözleşmesi, tek bir "güvenilir" aktarıcıyı (relayer) veya hizmeti koda gömmemeli (hard-code) veya buna güvenmemelidir. Bu, aktarıcı çevrimdışı olursa hesabı kullanılamaz hale getirir (brick). Toplu işleme (örneğin, approve+transferFrom) gibi özellikler, bir aktarıcı olmadan EOA'nın kendisi tarafından kullanılabilir. 7702'nin sağladığı gelişmiş özellikleri (Gaz Soyutlama, Gizliliği Koruyan Para Çekme İşlemleri) kullanmak isteyen uygulama geliştiricileri için bir aktarıcıya ihtiyacınız olacaktır. Farklı aktarıcı mimarileri olsa da, önerimiz en azından [giriş noktası 0.8'i (entry point 0.8)](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) işaret eden [4337 paketleyicilerini](https://www.erc4337.io/bundlers) kullanmanızdır çünkü:

- Aktarım için standartlaştırılmış arayüzler sağlarlar
- Yerleşik ödemeci sistemleri içerirler
- İleriye dönük uyumluluk sağlarlar
- Bir [genel bellek havuzu](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool) aracılığıyla sansür direncini destekleyebilirler
- init işlevinin yalnızca [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) üzerinden çağrılmasını gerektirebilirler

Başka bir deyişle, hesaptan gerekli geçerli imzayı veya Kullanıcı İşlemini (UserOperation) sağladıkları sürece herkes işlem sponsoru/aktarıcısı olarak hareket edebilmelidir. Bu, sansür direncini sağlar: özel bir altyapı gerekmiyorsa, bir kullanıcının işlemleri geçit tutan (gatekeeping) bir aktarıcı tarafından keyfi olarak engellenemez. Örneğin, [MetaMask'ın Yetki Devri Araç Kiti (Delegation Toolkit)](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0), MetaMask'a özel bir sunucu gerektirmek yerine, herhangi bir zincirdeki herhangi bir ERC-4337 paketleyicisi veya ödemecisi ile açıkça çalışır.

**Cüzdan Arayüzleri Aracılığıyla Merkeziyetsiz Uygulama (dapp) Entegrasyonu**:

Cüzdanların EIP-7702 için belirli yetki devri sözleşmelerini beyaz listeye alacağı göz önüne alındığında, dapp'ler doğrudan 7702 yetkilendirmeleri talep etmeyi beklememelidir. Bunun yerine entegrasyon, standartlaştırılmış cüzdan arayüzleri aracılığıyla gerçekleşmelidir:

- **ERC-5792 (`wallet_sendCalls`)**: Dapp'lerin cüzdanlardan toplu çağrılar yürütmesini talep etmesini sağlayarak işlem toplu işleme ve gaz soyutlama gibi işlevleri kolaylaştırır.

- **ERC-6900**: Dapp'lerin, cüzdan tarafından yönetilen modüller aracılığıyla oturum anahtarları ve hesap kurtarma gibi modüler akıllı hesap yeteneklerinden yararlanmasına olanak tanır.

Dapp'ler bu arayüzleri kullanarak, yetki devirlerini doğrudan yönetmeden EIP-7702 tarafından sağlanan akıllı hesap işlevlerine erişebilir ve farklı cüzdan uygulamaları arasında uyumluluk ve güvenlik sağlayabilir.

> Not: Dapp'lerin doğrudan 7702 yetkilendirme imzaları talep etmesi için standartlaştırılmış bir yöntem yoktur. Dapp'ler, EIP-7702 özelliklerinden yararlanmak için ERC-6900 gibi belirli cüzdan arayüzlerine güvenmelidir.

Daha fazla bilgi için:

- [ERC-5792 spesifikasyonu](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [ERC-6900 spesifikasyonu](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Satıcı Bağımlılığından (Vendor Lock-In) Kaçınma**: Yukarıdakilerle uyumlu olarak, iyi bir uygulama satıcıdan bağımsızdır ve birlikte çalışabilirdir. Bu genellikle akıllı hesaplar için ortaya çıkan standartlara bağlı kalmak anlamına gelir. Örneğin, [Alchemy'nin Modüler Hesabı](https://github.com/alchemyplatform/modular-account), modüler akıllı hesaplar için ERC-6900 standardını kullanır ve "izinsiz birlikte çalışabilir kullanım" göz önünde bulundurularak tasarlanmıştır.

**Gizliliğin Korunması**: Zincir içi gizlilik sınırlı olsa da, bir yetki devri sözleşmesi veri ifşasını ve bağlantılanabilirliği en aza indirmeye çalışmalıdır. Bu, ERC-20 token'larında gaz ödemeleri (böylece kullanıcıların genel bir ETH bakiyesi tutmasına gerek kalmaz, bu da gizliliği ve kullanıcı deneyimini iyileştirir) ve tek seferlik oturum anahtarları (tek bir uzun vadeli anahtara olan bağımlılığı azaltır) gibi özellikleri destekleyerek elde edilebilir. Örneğin, EIP-7702, sponsorlu işlemler aracılığıyla gazın token'larla ödenmesini sağlar ve iyi bir uygulama, bu tür ödemecileri gereğinden fazla bilgi sızdırmadan entegre etmeyi kolaylaştıracaktır. Ek olarak, belirli onayların zincir dışı yetki devri (zincir içi doğrulanan imzalar kullanılarak), kullanıcının birincil anahtarıyla daha az zincir içi işlem yapılması anlamına gelir ve bu da gizliliğe yardımcı olur. Bir aktarıcı kullanmayı gerektiren hesaplar, kullanıcıları IP adreslerini ifşa etmeye zorlar. Genel bellek havuzları (PublicMempools) bunu iyileştirir; bir işlem/Kullanıcı İşlemi (UserOp) bellek havuzunda yayıldığında, onu gönderen IP'den mi kaynaklandığını yoksa p2p protokolü aracılığıyla sadece üzerinden mi aktarıldığını anlayamazsınız.

**Genişletilebilirlik ve Modüler Güvenlik**: Hesap uygulamaları, yeni özellikler ve güvenlik iyileştirmeleriyle gelişebilmeleri için genişletilebilir olmalıdır. Yükseltilebilirlik, EIP-7702 ile doğası gereği mümkündür (çünkü bir EOA, mantığını yükseltmek için gelecekte her zaman yeni bir sözleşmeye yetki devredebilir). Yükseltilebilirliğin ötesinde, iyi bir tasarım, tamamen yeniden dağıtmaya gerek kalmadan modülerliğe (örneğin, farklı imza şemaları veya harcama politikaları için eklenti modülleri) olanak tanır. Alchemy'nin Account Kit'i, geliştiricilerin doğrulama modülleri (ECDSA, BLS vb. gibi farklı imza türleri için) ve özel mantık için yürütme modülleri yüklemesine olanak tanıyan harika bir örnektir. EIP-7702 özellikli hesaplarda daha fazla esneklik ve güvenlik elde etmek için geliştiricilerin doğrudan belirli bir uygulamaya değil, bir vekil kontrata yetki devretmeleri teşvik edilir. Bu yaklaşım, her değişiklik için ek EIP-7702 yetkilendirmeleri gerektirmeden sorunsuz yükseltmelere ve modülerliğe olanak tanır.

Vekil (Proxy) Modelinin Faydaları:

- **Yükseltilebilirlik**: Vekili yeni bir uygulama sözleşmesine yönlendirerek sözleşme mantığını güncelleyin.

- **Özel Başlatma Mantığı**: Gerekli durum değişkenlerini güvenli bir şekilde ayarlamak için başlatma işlevlerini vekilin içine dahil edin.

Örneğin, [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe), EIP-7702 uyumlu hesaplarda yetki devirlerini güvenli bir şekilde başlatmak ve yönetmek için bir vekilin nasıl kullanılabileceğini gösterir.

Vekil Modelinin Eksileri:

- **Dış aktörlere bağımlılık**: Güvenli olmayan bir sözleşmeye yükseltme yapmamaları konusunda harici bir ekibe güvenmek zorundasınız.

## Güvenlik Hususları {#security-considerations}

**Yeniden giriş koruması**: EIP-7702 yetki devrinin kullanıma sunulmasıyla, bir kullanıcının hesabı Harici Sahipli Hesap (EOA) ile Akıllı Sözleşme (SC) arasında dinamik olarak geçiş yapabilir. Bu esneklik, hesabın hem işlemleri başlatmasını hem de çağrıların hedefi olmasını sağlar. Sonuç olarak, bir hesabın kendini çağırdığı ve harici çağrılar yaptığı senaryolarda `msg.sender`, `tx.origin` değerine eşit olacaktır; bu da daha önce `tx.origin` değerinin her zaman bir EOA olmasına dayanan belirli güvenlik varsayımlarını zayıflatır.

Akıllı sözleşme geliştiricileri için, `tx.origin` öğesinin bir EOA'yı ifade ettiğini varsaymak artık güvenli değildir. Benzer şekilde, yeniden giriş saldırılarına karşı bir önlem olarak `msg.sender == tx.origin` kullanmak artık güvenilir bir strateji değildir.

İleriye dönük olarak geliştiriciler, sistemdeki herhangi bir katılımcının bir akıllı sözleşme olabileceği varsayımıyla tasarım yapmalıdır. Alternatif olarak, `nonReentrant` değiştirici (modifier) modellerine sahip yeniden giriş korumaları kullanarak açık bir yeniden giriş koruması uygulayabilirler. Denetlenmiş bir değiştiriciyi, örneğin [Open Zeppelin'in Yeniden Giriş Korumasını (Reentrancy Guard)](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol) izlemenizi öneririz. Ayrıca bir [geçici durum değişkeni (transient storage variable)](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html) de kullanabilirler.

**Başlatma Güvenliği Hususları**

EIP-7702 yetki devri sözleşmelerinin uygulanması, özellikle başlatma süreciyle ilgili belirli güvenlik zorlukları ortaya çıkarır. Başlatma işlevi (`init`) yetki devri süreciyle atomik olarak birleştirildiğinde kritik bir güvenlik açığı ortaya çıkar. Bu tür durumlarda, bir önden koşan (frontrunner) yetki devri imzasını ele geçirebilir ve `init` işlevini değiştirilmiş parametrelerle yürüterek potansiyel olarak hesabın kontrolünü ele geçirebilir.

Bu risk, mevcut Akıllı Sözleşme Hesabı (SCA) uygulamalarını başlatma mekanizmalarını değiştirmeden EIP-7702 ile kullanmaya çalışırken özellikle geçerlidir.

**Başlatma Güvenlik Açıklarını Azaltmaya Yönelik Çözümler**

- `initWithSig` uygulayın  
  Standart `init` işlevini, kullanıcının başlatma parametrelerini imzalamasını gerektiren bir `initWithSig` işleviyle değiştirin. Bu yaklaşım, başlatmanın yalnızca açık kullanıcı izniyle ilerleyebilmesini sağlar ve böylece yetkisiz başlatma risklerini azaltır.

- ERC-4337'nin EntryPoint'ini kullanın  
  Başlatma işlevinin yalnızca ERC-4337 EntryPoint sözleşmesinden çağrılmasını gerektirin. Bu yöntem, ERC-4337 tarafından sağlanan standartlaştırılmış doğrulama ve yürütme çerçevesinden yararlanarak başlatma sürecine ek bir güvenlik katmanı ekler.  
  _(Bkz: [Safe Belgeleri](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Geliştiriciler bu çözümleri benimseyerek EIP-7702 yetki devri sözleşmelerinin güvenliğini artırabilir ve başlatma aşamasındaki olası önden koşma (frontrunning) saldırılarına karşı koruma sağlayabilir.

**Depolama Çakışmaları** Kodun yetkisini devretmek mevcut depolamayı temizlemez. Bir yetki devri sözleşmesinden diğerine geçerken, önceki sözleşmeden kalan artık veriler kalır. Yeni sözleşme aynı depolama slotlarını kullanıyor ancak bunları farklı yorumluyorsa, bu istenmeyen davranışlara neden olabilir. Örneğin, ilk yetki devri bir depolama slotunun `bool` temsil ettiği bir sözleşmeye yapılmışsa ve sonraki yetki devri aynı slotun `uint` temsil ettiği bir sözleşmeye yapılmışsa, bu uyumsuzluk öngörülemeyen sonuçlara yol açabilir.

**Kimlik avı riskleri** EIP-7702 yetki devrinin uygulanmasıyla, bir kullanıcının hesabındaki varlıklar tamamen akıllı sözleşmeler tarafından kontrol edilebilir. Bir kullanıcı bilmeden hesabının yetkisini kötü niyetli bir sözleşmeye devrederse, bir saldırgan kolayca kontrolü ele geçirebilir ve fonları çalabilir. `chain_id=0` kullanıldığında yetki devri tüm zincir kimliklerine (chain id) uygulanır. Yalnızca değişmez bir sözleşmeye yetki devredin (asla bir vekile yetki devretmeyin) ve yalnızca CREATE2 kullanılarak dağıtılmış sözleşmelere (standart initcode ile - metamorfik sözleşmeler olmadan) yetki devredin, böylece dağıtıcı başka bir yerde aynı adrese farklı bir şey dağıtamaz. Aksi takdirde yetki devriniz, hesabınızı diğer tüm EVM zincirlerinde riske atar.

Kullanıcılar yetki devredilmiş imzalar gerçekleştirdiğinde, kimlik avı risklerini azaltmaya yardımcı olmak için yetki devrini alan hedef sözleşme açık ve belirgin bir şekilde görüntülenmelidir.

**Minimum Güvenilir Yüzey ve Güvenlik**: Bir yetki devri sözleşmesi esneklik sunarken, temel mantığını minimum düzeyde ve denetlenebilir tutmalıdır. Sözleşme fiilen kullanıcının EOA'sının bir uzantısıdır, bu nedenle herhangi bir kusur felaket olabilir. Uygulamalar, akıllı sözleşme güvenlik topluluğunun en iyi uygulamalarını izlemelidir. Örneğin, kurucu (constructor) veya başlatıcı (initializer) işlevleri dikkatlice güvence altına alınmalıdır; Alchemy tarafından vurgulandığı gibi, 7702 altında bir vekil modeli kullanılıyorsa, korumasız bir başlatıcı bir saldırganın hesabı ele geçirmesine izin verebilir. Ekipler zincir içi kodu basit tutmayı hedeflemelidir: Ambire'nin 7702 sözleşmesi yalnızca ~200 satır Solidity'dir ve hataları azaltmak için karmaşıklığı kasıtlı olarak en aza indirir. Özellik açısından zengin mantık ile denetimi kolaylaştıran basitlik arasında bir denge kurulmalıdır.

### Bilinen uygulamalar {#known-implementations}

EIP-7702'nin doğası gereği, cüzdanların kullanıcıların 3. taraf bir sözleşmeye yetki devretmesine yardımcı olurken dikkatli olmaları önerilir. Aşağıda, denetlenmiş bilinen uygulamaların bir koleksiyonu listelenmiştir:

| Sözleşme adresi                           | Kaynak                                                                                                                                     | Denetimler                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [denetimler](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [denetimler](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [denetimler](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [denetimler](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Ethereum Vakfı AA ekibi](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [denetimler](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [denetimler](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Donanım cüzdanı yönergeleri {#hardware-wallet-guidelines}

Donanım cüzdanları keyfi yetki devrini ifşa etmemelidir. Donanım cüzdanı alanındaki mutabakat, güvenilir yetki devreden sözleşmelerin bir listesini kullanmaktır. Yukarıda listelenen bilinen uygulamalara izin vermenizi ve diğerlerini duruma göre değerlendirmenizi öneririz. EOA'nızın yetkisini bir sözleşmeye devretmek tüm varlıklar üzerinde kontrol sağladığından, donanım cüzdanları 7702'yi uygulama biçimlerinde dikkatli olmalıdır.

### Eşlik eden uygulamalar için entegrasyon senaryoları {#integration-scenarios-for-companion-apps}

#### Tembel {#lazy}

EOA hala her zamanki gibi çalıştığı için yapılacak bir şey yoktur.

Not: ERC-1155 NFT'leri gibi bazı varlıklar yetki devri kodu tarafından otomatik olarak reddedilebilir ve destek ekibi bunun farkında olmalıdır.

#### Farkında {#aware}

Kodunu kontrol ederek EOA için bir yetki devrinin yürürlükte olduğunu kullanıcıya bildirin ve isteğe bağlı olarak yetki devrini kaldırmayı teklif edin.

#### Ortak yetki devri {#common-delegation}

Donanım sağlayıcısı, bilinen yetki devri sözleşmelerini beyaz listeye alır ve bunların desteğini eşlik eden yazılımda uygular. Tam ERC-4337 desteğine sahip bir sözleşme seçilmesi önerilir.

Farklı bir sözleşmeye yetki devreden EOA'lar standart EOA'lar olarak ele alınacaktır.

#### Özel yetki devri {#custom-delegation}

Donanım sağlayıcısı kendi yetki devri sözleşmesini uygular ve bunu listelere ekleyerek eşlik eden yazılımda desteğini uygular. Tam ERC-4337 desteğine sahip bir sözleşme oluşturulması önerilir.

Farklı bir sözleşmeye yetki devreden EOA'lar standart EOA'lar olarak ele alınacaktır.