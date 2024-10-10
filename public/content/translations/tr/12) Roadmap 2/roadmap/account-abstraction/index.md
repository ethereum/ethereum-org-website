---
title: Hesap soyutlama
description: Ethereum'un kullanıcı hesaplarını daha basit ve daha güvenli hale getirme planlarına genel bir bakış
lang: tr
summaryPoints:
  - Hesap soyutlama, akıllı sözleşme cüzdanları oluşturmayı kolaylaştırır
  - Akıllı sözleşme cüzdanları, Ethereum hesaplarına erişimi yönetmeyi kolaylaştırır
  - Kaybolmuş ve ifşa olmuş anahtarlar, birden çok yedekleme yolu kullanılarak kurtarılabilir
---

# Hesap soyutlama {#account-abstraction}

Kullanıcılar, **[harici olarak sahiplenilmiş cüzdanlar (EOA'lar)](/glossary/#eoa)** kullanarak Ethereum ile etkileşime geçebilirler. Bir işlem başlatmanın veya bir akıllı sözleşme yürütmenin tek yolu budur. Bu durum, kullanıcıların Ethereum ile etkileşime girmesini sınırlamaktadır. Toplu halde işlem yapmanın zorlaşması ve kullanıcıların gaz ücretini karşılamak için her zaman bir miktar ETH bulundurmak zorunda olması, bu zorluklara örnek olarak gösterilebilir.

Hesap soyutlama, kullanıcıların hesaplarına esnek bir şekilde daha fazla güvenlik ve daha iyi kullanıcı deneyimi planlamasına olanak tanıyarak bu sorunları çözmeyi amaçlayan bir yoldur. Bu, akıllı sözleşmeler tarafından kontrol edilebilmeleri için [EOA'ları yükselterek](https://eips.ethereum.org/EIPS/eip-3074) veya işlemleri başlatabilmeleri için [akıllı sözleşmeleri yükselterek](https://eips.ethereum.org/EIPS/eip-2938) olabilir. Bu seçeneklerin her ikisi de Ethereum protokolünde değişiklik yapılmasını gerektirmektedir. Mevcut protokole paralel olarak çalışacak [ ikincil ayrı bir işlem sistemi](https://eips.ethereum.org/EIPS/eip-4337) eklemeyi içeren üçüncü bir yol da mevcuttur. Seçilen yol her ne olursa olsun sonuç, Ethereum'a akıllı sözleşme cüzdanları aracılığıyla erişmektir. Bu, ya mevcut protokolün bir parçası olarak yerel olarak desteklenir ya da bir eklenti işlem ağı vasıtasıyla gerçekleşir.

Akıllı sözleşme cüzdanları, kullanıcı için aşağıdakiler de dahil olmak üzere pek çok avantajın kilidini açar:

- kendi esnek güvenlik kurallarınızı tanımlamak
- cüzdan şifrelerinizi/anahtarlarınızı kaybederseniz hesabınızı kurtarabilmek
- hesap güvenliğinizi güvenilir cihazlar veya kişiler arasında paylaşmak
- başkalarının işlem ücretlerini ödemek veya başkasının sizin işlem ücretlerinizi ödemesini sağlamak
- işlemleri toplu halde tek seferde yapabilmek (onay ve yürütme işlemini tek seferde onaylamak gibi)
- merkeziyetsiz uygulamalar ve cüzdan geliştiricileri için kullanıcı deneyimlerinde yenilik yapma konusunda daha pek çok fırsat

İşlemleri yalnızca haricen sahiplenilen cüzdanlar ([EOA'lar](/glossary/#eoa)) başlatabildiğinden, bu avantajlar bugün Ethereum üzerinde yerel olarak desteklenmemektedir. EOA'lar basitçe genel-özel anahtar çiftlerinden oluşur. Şu şekilde çalışmaktadırlar:

- eğer gizli anahtara sahipseniz, Ethereum Sanal Makinesi (EVM) üzerinde _her şeyi_ yapabilirsiniz
- eğer gizli anahtara sahip değilseniz, _hiçbir şey_ yapamazsınız.

Anahtarlarınızı kaybederseniz, hesaplar kurtarılamazlar. Çalınan anahtarlar, hırsızların bir hesaptaki tüm paraya anında erişmesini sağlar.

Akıllı sözleşme cüzdanları bu sorunların çözümüdür, ancak bugün programlamaları/tasarlamaları zordur çünkü sonunda uyguladıkları herhangi bir mantığın, Ethereum tarafından işlenmeden önce bir dizi EOA işlemine dönüştürülmesi gerekmektedir. Hesap soyutlama, akıllı sözleşmelerin işlemleri kendilerinin başlatabilmesini. sağlar. Böylece kullanıcının uygulamak istediği herhangi bir mantık, akıllı sözleşme cüzdanının kendisi üzerine kodlanabilir ve Ethereum üzerinde yürütülebilir.

Sonuç olarak hesap soyutlama, akıllı sözleşme cüzdanlarına yönelik desteği geliştirerek, bunların oluşturulmasını kolaylaştırır ve kullanımını daha güvenli hale getirir. Hesap soyutlama ile birlikte kullanıcılar, altta yatan teknolojinin ne olduğunu bilmeden veya hiç umursamadan Ethereum'un tüm avantajlarından yararlanabilirler.

## Güvenlik kelimelerinin ötesinde {#beyond-seed-phrases}

Bugün mevcut olan hesaplar, güvenlik kelimelerinden hesaplanan özel anahtarlar kullanılarak güvence altına alınmıştır. Güvenlik kelimelerine erişimi olan herhangi bir kişi, bir hesabı koruyan özel anahtarı kolayca keşfedebilir ve koruduğu tüm varlıklara erişim sağlayabilir. Bir özel anahtar ve güvenlik kelimeleri kaybolursa, asla kurtarılamazlar ve kontrol ettikleri varlıklar sonsuza kadar Ethereum'un derinliklerinde kalır. Güvenlik kelimelerinin güvenliğini sağlamak, deneyimli kullanıcılar için bile gariptir. kimlik avı saldırıları, kullanıcıların dolandırıldığı en yaygın yolların başında gelir.

Hesap soyutlama, sahip olunan varlıkları saklamak ve yapılacak işlemleri yetkilendirmek için bir akıllı sözleşme kullanarak bu sorunu çözecektir. Bu akıllı sözleşmeler, daha sonra onları olabildiğince güvenli ve kullanıcıya göre uyarlanmış hale getirmek için istenilen şekilde dizayn edilebilir. Sonuç olarak, hesabınıza erişimi kontrol etmek için özel anahtarları kullanmaya devam edebilirsiniz. Ancak bunları yönetmeyi daha kolay ve daha güvenli hale getiren imkânlar vardır.

Mesela bir cüzdana yedek anahtarlar eklenebilir. Böylece hesabın ana anahtarlarınızı kaybederseniz veya yanlışlıkla ifşa ederseniz, yedek anahtarlar sayesinde yeni ve güvenli bir anahtarla değiştirebilirsiniz. Bu anahtarların her birini farklı bir şekilde güvence altına alabilir veya bunları güvenilir kişiler arasında paylaştırabilirsiniz. Bu, bir hırsızın varlıklarınız üzerinde tam kontrol sahibi olmasını oldukça zorlaştırır. Benzer şekilde, ana anahtarınız tehlikeye girerse etkiyi azaltmak için cüzdanınıza kurallar ekleyebilirsiniz. Örneğin, düşük değerli işlemlerin tek bir imzayla doğrulanmasına izin verirken, yüksek değerli işlemlerin birden fazla kimliği doğrulanmış imzacıdan onay alınmasını şart koşabilirsiniz. Akıllı sözleşme cüzdanlarının hırsızları engellemenize yardımcı olabileceği başka yollar da vardır. Örneğin, güvenilir bir adrese yapılmadığı veya önceden onaylanmış anahtarlarınızdan birkaçı tarafından doğrulanmadığı sürece her işlemi engellemek için bir izin listesi kullanılabilir.

### Bir akıllı sözleşme cüzdanına uygulanabilecek güvenlik mekanizması örnekleri:

- **Çoklu imza yetkisi**: Yetkilendirmeyi birden fazla güvenilir kişi veya cihaz arasında paylaşabilirsiniz. Sonrasında sözleşme, belirlenmiş bir değerin üzerindeki işlemlerin güvendiğiniz tarafların belirli bir oranının (ör. 3/5) yetkisini gerektirecek şekilde yapılandırılabilir. Örneğin, yüksek değerli işlemler, hem mobil cihazdan hem de donanım cüzdanından onay veya güvenilir aile üyelerine dağıtılan hesaplardan imza gerektirebilir.
- **Hesap dondurma**: Bir cihaz kaybolursa veya güvenliği ihlal edilirse, hesap başka bir yetkili cihazdan kilitlenerek kullanıcının varlıkları korunabilir.
- **Hesap kurtarma**: Bir cihazınızı kaybettiniz ya da bir şifrenizi mi unuttunuz? Mevcut şartlar altında bu, varlıklarınıza olan erişiminizin sonsuza kadar kaybolması anlamına gelir. Akıllı sözleşme cüzdanı ile yeni cihazları yetkilendirebilen ve erişimi sıfırlayabilen bir izinli hesaplar listesi oluşturabilirsiniz.
- **İşlem sınırı belirleme**: Hesap içerisinden bir gün, hafta veya ay içinde ne kadar varlık transfer edilebileceğine ilişkin günlük sınırlar belirleyebilirsiniz. Bu, bir saldırgan hesabınıza erişim elde ederse tüm varlıkları tek seferde çalamayacağı ve hırsızın erişimini engelleme ve sıfırlama fırsatınız olduğu anlamına gelir.
- **İzin listeleri oluşturma**: Sadece güvenli olduğunu bildiğiniz belirli adreslere yapılan işlemlere izin verin. Bu, şu anlama gelir: Özel anahtarınız çalınmış _olsa bile_, saldırgan sadece listenizdeki hedef hesaplara varlık aktarabilir. Bu izin listelerini değiştirmek için birden fazla imza gerekir. Bu sayede bir saldırgan, birkaç yedek anahtarınıza erişimi olmadığı sürece kendi adresini listeye ekleyemez.

## Daha iyi kullanıcı deneyimi {#better-user-experience}

Hesap soyutlama, protokol düzeyinde akıllı sözleşme cüzdanları için destekte bulunduğundan, **daha iyi bir kullanıcı deneyiminin** yanı sıra **gelişmiş güvenlik** de sağlamaktadır. Bunun en önemli nedeni, akıllı sözleşmeler, cüzdanlar ve uygulama geliştiricilerine, kullanıcı deneyimi üzerinde henüz tahmin bile edemeyeceğimiz şekillerde yenilik yapmak için çok daha fazla özgürlük sağlayacak olmasıdır. Hesap soyutlamayla birlikte ortaya çıkacak bazı belirgin iyileştirmeler, işlemlerin hız ve verimlilik için bir araya getirilmesini içermektedir. Örnek olarak, basit bir takasın mantıken tek tıklamayla gerçekleştirilebilecek bir işlem olması gerekir. Ancak bugün, takas yürütülmeden önce jetonların harcanmasını onaylamak için birden fazla işlemin imzalanması gerekmektedir. Hesap soyutlama, işlemlerin gruplanmasına izin vererek bu sorunu ortadan kaldırmaktadır. Ayrıca gruplandırılmış işlemler, her işlem için gereken tokenlerin doğru değerini tam olarak onaylayabilir ve işlem tamamlandıktan sonra onayları iptal ederek ek güvenlik sağlayabilir.

Gaz ücretlerinin yönetimi de hesap soyutlama ile daha çok iyileştirildi. Uygulamalar kullanıcılarının gaz ücretlerini ödemeyi teklif etmekle kalmaz, aynı zamanda gaz ücretleri ETH dışındaki token'larla da ödenebilir. Bu da kullanıcıların yapacağı işlemler için bir ETH bakiyesi tutma zorunluluğunu ortadan kaldırmaktadır. Bu, kullanıcının token'larını sözleşme içerisinde ETH ile değiştirerek çalışır ve ardından ETH'yi gaz için ödemek üzere kullanır.

<ExpandableCard title="Hesap soyutlama gaz konusunda nasıl yardımcı olabilir?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

Gaz yönetimi, Ethereum kullanıcıları için birincil zorluklardan biridir çünkü ETH, işlemler için ödeme yapmak üzere kullanılabilecek tek varlıktır. USDC bakiyesi olan, ancak ETH'si olmayan bir cüzdanınız olduğunu hayal edin. Gaz ücretini ödeyemediğiniz için bu USDC token'larını hareket ettiremez veya takas edemezsiniz. USDC'yi ETH ile de değiştiremezsiniz çünkü bu kendi içinde bir gaz ücretine mal olacaktır. Sorunu çözmek için hesabınıza bir borsadan veya başka bir adresten daha fazla ETH göndermeniz gerekir. Akıllı sözleşme cüzdanlarıyla birlikte, hesabınızı gaz ücreti konusunda serbest bırakarak bunun yerine USDC ile gaz ücretini ödeyebilirsiniz. Artık tüm hesaplarınızda ETH bakiyesi bulundurmanıza gerek yok.

Hesap soyutlama, merkeziyetsiz uygulama geliştiricilerinin gaz yönetimi konusunda yaratıcı olmalarına da olanak tanımaktadır. Örneğin, en sevdiğiniz DEX'e sınırsız işlem için her ay sabit bir ücret ödemeye başlayabilirsiniz. Merkeziyetsiz uygulamalar, platformlarını kullandığınız için bir ödül olarak veya bir katılım teklifi olarak sizin adınıza tüm gaz ücretlerinizi ödemeyi teklif edebilir. Akıllı sözleşme cüzdanları protokol düzeyinde desteklenmeye başlandığı zaman, geliştiricilerin gaz konusunda yenilik yapması çok daha kolay olacaktır.

</ExpandableCard>

Güvenilir oturumlar, özellikle kısa süre içerisinde çok sayıda küçük işlemin onaylanması gerekebilecek oyun gibi uygulamalar için kullanıcı deneyimleri açısından da potansiyel olarak dönüştürücüdür. Her işlemi tek tek onaylamak oyun deneyimini bozar ve sürekli onay vermek güvenli değildir. Bir akıllı sözleşme cüzdanı; belirli bir süre için, belirli bir değere kadar veya sadece belirli adreslere bazı işlemleri onaylayabilir.

Hesap soyutlama ile satın alma sistemlerinin nasıl değişebileceğini düşünmek de ilgi çekicidir. Bugün her işlemin, yeterli miktarda doğru token ile önceden finanse edilmiş bir cüzdandan onaylanması ve yürütülmesi gerekmektedir. Hesap soyutlamayla birlikte alışveriş deneyimi, bir kullanıcının bir "sepet"i öğelerle doldurabildiği ve tüm mantığın kullanıcı tarafından değil, sözleşme tarafından ele alınmasıyla, tümünü tek seferde satın almak için bir kez tıklayabildiği alışıldık bir çevrimiçi alışverişe daha çok benzeyebilir.

Bunlar, hesap soyutlama sayesinde kullanıcı deneyimlerinin nasıl ölçeklendirilebileceğine dair yalnızca birkaç örnektir. Ancak henüz hayal edemediğimiz çok daha fazla özellik de olacaktır. Hesap soyutlama, geliştiricileri günümüzün EOA'larının kısıtlamalarından kurtarır. Web2'nin iyi yönlerini kişisel gözetimden ödün vermeden web3'e getirmelerine ve yaratıcı yeni kullanıcı deneyimlerinde yaratıcı bir şekilde uygulamalarına olanak tanır.

## Hesap soyutlama uygulamaya nasıl geçecek? {#how-will-aa-be-implemented}

Akıllı sözleşme cüzdanları bugün mevcut durumdadır. Ancak EVM onları desteklemediği için uygulanması bir hayli zordur. Bunun yerine, standart Ethereum işlemlerinin etrafına nispeten daha karmaşık kodlar eklemeye güvenmektedirler. Ethereum, akıllı sözleşmelerin işlem başlatmasına izin vererek, zincir dışı yerine Ethereum akıllı sözleşmelerinde gerekli mantığı ele alarak bunu değiştirebilir. Akıllı sözleşmelere bir "mantık" eklemek, cüzdan geliştiricileri tarafından yönetilen "aktarıcıların" kullanıcı tarafından imzalanan mesajları normal Ethereum işlemlerine çevirme ihtiyacını ortadan kaldırdığı için Ethereum'un merkeziyetsizliğini de arttırmaktadır.

<ExpandableCard title="EIP-2771: meta işlemleri kullanarak hesap soyutlama" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

EIP-2771, Ethereum protokolünde değişiklik yapmadan üçüncü tarafların bir kullanıcının gaz ücretini ödemesine izin veren "meta işlemler" kavramını tanıtmaktadır. Fikir, bir kullanıcı tarafından imzalanan işlemlerin bir "Yönlendirici" sözleşmesine gönderilmesi üzerine kuruludur. Yönlendirici, işlemlerin geçerli olduğunu doğrulayan ve bunları bir gaz rölesine göndermeden önce denetleyen güvenilir bir varlıktır. Bu, gaz ödeme ihtiyacını ortadan kaldırarak zincir dışı olarak gerçekleştirilir. Gaz rölesi, işlemi Ethereum'da çalıştırılabilir kılmak için gerekli gazı ödeyerek bir "Alıcı" sözleşmesine iletir. "Yönlendirici", "Alıcı" tarafından biliniyor ve güveniliyorsa işlem gerçekleştirilir. Bu model, geliştiricilere kullanıcılar için gazsız işlemleri uygulamayı kolaylaştırır.

</ExpandableCard>

<ExpandableCard title="EIP-4337: Ethereum protokolünü değiştirmeden hesap soyutlama" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

EIP-4337, yerli akıllı sözleşme cüzdanını merkeziyetsiz bir şekilde desteklemenin ilk adımıdır<em> ve Ethereum Protokol'ünde herhangi bir değişikliğe ihtiyaç duymaz</em>. Fikir Birliği katmanını akıllı sözleşmeyi desteklemek için modifiye etmek yerine, normal işlem dedikodu protokolüne ayrıştırılmış yeni bir sistem eklenir. Bu daha yüksek seviyeli sistem <code>UserOperation</code> adındaki yeni bir nesne etrafında kurulur ve aksiyonlar için alakalı imzalara sahip kullanıcıdan komutlar alır. Bu <code>UserOperation</code> nesneleri, sonra paket işleminde toplanabilecek şekilde kararlaştırılmış bir bellek havuzu üzerinden yorumlanır. Bu paket işlemi bir çok <code>UserOperations</code> sekansını temsil eder ve Ethereum bloklarına normal bir işlemmiş gibi dahil edilebilirler ve doğrulayıcılar tarafından benzer ücret maksimize etme modeliyle seçilirler.

Cüzdanların çalışma şekli de EIP-4337'de değişir. Her cüzdanın yeniden yaygın fakat karmaşık güvenlik mantığını uygulaması yerine, söz konusu fonksiyonlar evrensel bir cüzdan sözleşmesinde, &quot;giriş noktası&quot; olarak da bilinir, toplanır. Bu, ücretleri ödemeyi ve Ethereum Sanal Makinesi kodunu çalıştırmayı kapsar ve bu sayede cüzdan geliştiricileri mükemmel bir kullanıcı deneyimi sunmaya odaklanabilirler.

EIP-4337'nin giriş noktası sözleşmesinin Ethereum Ana Ağı'nda ilk kez 1 Mart 2023'de dağıtıldığını <strong>aklınızda bulundurun</strong>. Sözleşmeyi <a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscan'de</a> görüntüleyebilirsiniz.

</ExpandableCard>

<ExpandableCard title="EIP-2938: Ethereum Protokolünü hesap soyutlamayı desteklemek için değiştirmek" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-2938">EIP-2938</a>, Ehereum protokolünü 3 farklı alana sahip yeni bir işlem tipiyle<code>AA_TX_TYPE</code>, güncellemeyi düşünüyor: <code>nonce</code>, <code>target</code> ve <code>data</code>, sıralamasında <code>nonce</code> bir işlem sayıcı,<code>target</code> sözleşme adresinin giriş bölgesi ve <code>data</code> ise Ethereum Sanal Makinesi'nin bayt kodudur. Bu işlemleri uygulamak için, Ethereum Sanal Makinesi'ne iki yeni talimat (işlem kodu olarak da bilinir) eklenmelidir: <code>NONCE</code> ve <code>PAYGAS</code>. <code>NONCE</code> işlem kodu islem sekansını takip eder ve <code>PAYGAS</code> ise para çekme işlemlerini ve işlemin sözleşme dengesi&#39; ile uygulanabilmesi için gerekli gaz ücretlerini hesaplar. Bu yeni özellikler Ethereum'un akıllı sözleşme cüzdanlarını yerel olarak, altyapı zaten Ethereum&#39;'un protokolünde oluşturuldu, desteklemesine izin verir.

EIP-2938'in güncel olarak aktif olmadığını göz önünde bulundurun. Topluluk şu anda herhangi bir protokol değişikliğine gerek duymadığı için EIP-4337'ye sıcak bakıyor.

</ExpandableCard>

<ExpandableCard title="EIP-3074: Harici olarak sahiplenilmiş hesapları hesap soyutlama için yükseltmek" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> ise Ethereum&#39;'u harici olarak sahiplenilmiş hesapların akıllı sözleşmeleri temsilen kontrol edebilmesine izni vererek güncellemeyi hedefliyor. Bu, anlamı akıllı sözleşme mantığının EOA kökenli işlemleri kabul edebileceği anlamına geliyor. Bu, gaz sponsorluğu ya da toplu işlemler gibi özelliklere olanak verir. Bunun çalışabilmesi için, Ethereum Sanal Makinesi'ne iki yeni işlem eklenmesi gerekiyor:<code>AUTH</code> ve <code>AUTHCALL</code>. EIP-3074 ile birlikte akıllı sözleşme cüzdanlarının bazı avantajları ulaşılabilir hale geliyor,<em> hem de sözleşmeye ihtiyaç duymadan</em>, bunun yerine ifadesiz, güvenilmez ve geliştirilemez bir sözleşme, "çağırıcı (invoker)" olarak da bilinir, işlemleri hallediyor.

EIP-3074'in güncel olarak aktif olmadığını göz önünde bulundurun. Topluluk şu anda herhangi bir protokol değişikliğine gerek duymadığı için EIP-4337'ye sıcak bakıyor.

</ExpandableCard>

## Güncel ilerleme {#current-progress}

Akıllı sözleşme cüzdanları çoktan beri mevcut, ancak bu cüzdanları olabildiğinde merkeziyetsiz ve izinsiz hale getirmek için daha fazla yükseltme gerekiyor. EIP-4337, Ethereum protokolünde hiçbir değişikliğe gerek duymayan olgun bir tekliftir, yani hızlıca uygulanması olasıdır. Ancak, Ethereum protokolünde değişen bazı yükseltmeler artık aktif geliştirme sürecinde değil, yani bu değişimlerin gelmesi uzun zaman alabilir. Hesap soyutlamaya da EIP-4337 gibi protokolde bir değişikliğe gerek duymayan bir madde tarafından ulaşılması olası.

## Daha fazla bilgi {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Hesap soyutlama paneli tartışması, Devcon Bogota](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- ["Hesap soyutlama neden merkeziyetsiz uygulamalar için ezber bozan bir şey?", Devcon Bogota](https://www.youtube.com/watch?v=OwppworJGzs)
- ["Hesap soyutlama ELI5", Devcon Bogota](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Vitalik'in "Hesap Soyutlamaya Doğru" notları](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitalik'in sosyal toparlanma cüzdanları hakkındaki blog gönderisi](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [EIP-2938 notları](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [EIP-2938 belgeleri](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 notları](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [EIP-4337 belgeleri](https://eips.ethereum.org/EIPS/eip-4337)
- [EIP-2771 belgeleri](https://eips.ethereum.org/EIPS/eip-2771)
- ["Hesap Soyutlama Hakkında Temel Bilgiler" - Hesap Soyutlama Nedir Bölüm 1](https://www.alchemy.com/blog/account-abstraction)
