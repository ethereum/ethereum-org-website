---
title: "Sıfır bilgili ispatlar"
description: "Yeni başlayanlar için sıfır bilgi ispatlarına teknik olmayan bir giriş."
lang: tr
---

# Sıfır bilgili ispatlar nelerdir? Sıfır bilgi ispatları nedir? {#what-are-zk-proofs}

Sıfır bilgili ispat, ifadenin kendisini açığa çıkarmadan bir ifadenin geçerliliğini kanıtlamanın bir yoludur. "Kanıtlayıcı", bir iddiayı kanıtlamaya çalışan taraftır, "doğrulayıcı" ise iddiayı doğrulamaktan sorumludur.

Sıfır bilgi ispatları ilk olarak 1985 yılında yayınlanan ve günümüzde sıfır bilgi ispatları için yaygın olarak kullanılan bir tanım sunan “[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)” adlı makalede ortaya çıkmıştır:

> Bir sıfır bilgi protokolü, bir tarafın (kanıtlayıcı) başka bir tarafa (doğrulayıcı), **belirli bir ifadenin doğru olduğu gerçeği dışında hiçbir bilgi açıklamadan bir şeyin doğru olduğunu kanıtlayabildiği** bir yöntemdir.

Yıllar geçtikçe gelişen sıfır bilgili ispat günümüzde birçok gerçek dünya uygulamasında kullanılmaktadır.

<YouTube id="fOGdb1CTu5c" />

## Neden sıfır bilgili ispatlara ihtiyacımız var? Sıfır bilgi ispatları neden önemlidir? {#why-zero-knowledge-proofs-are-important}

Sıfır bilgili ispatlar, bireyler özelinde bilgi güvenliğini taahhüt ettikleri için uygulamalı kriptografide gerçekleşen bir atılımı ifade eder. Bir iddiayı (ör. "Şu ülkenin vatandaşıyım") karşı tarafa (ör. hizmet sağlayıcı) kanıtlamanın yollarını düşünün. İddianızı destekleyecek pasaport ya da sürücü belgesi gibi bir "delil" sunmak durumundasınız.

Ancak bu yaklaşım, en önemlisi mahremiyet eksikliği olmak üzere bazı sorunları da beraberinde getirir. Üçüncü şahıslara ait hizmetlerle paylaşılan Kimliği Tanımlayabilecek Bilgiler (PII), bilgisayar saldırılarına karşı savunmasız olan merkezi veritabanlarında tutulur. Kimlik hırsızlıklarının kritik bir sorun haline gelmesiyle birlikte, hassas bilgilerin paylaşılabilmesi için daha fazla gizliliği koruyan araç ihtiyacı doğdu.

Sıfır bilgi ispatları bu sorunu, **iddiaların geçerliliğini kanıtlamak için bilgi ifşa etme ihtiyacını ortadan kaldırarak** çözer. Sıfır bilgi protokolü, doğruluğunun kısa ve öz bir kanıtını oluşturmak için girdi olarak ifadeyi ("tanık" olarak adlandırılır) kullanır. Bu kanıt; oluşturulurken kullanılan bilgileri ifşa etmeden, bir ifadenin doğru olduğuna dair güçlü garantiler sağlar.

Daha önceki örneğimize dönecek olursak, vatandaşlık iddianızı kanıtlamak için ihtiyacınız olan tek kanıt bir sıfır bilgi kanıtıdır. Doğrulayıcı, esas ifadenin de doğru olduğuna ikna olmak için yalnızca kanıtın belirli özelliklerinin doğru olup olmadığını kontrol etmelidir.

## Sıfır bilgi ispatlarının kullanım alanları {#use-cases-for-zero-knowledge-proofs}

### Anonim ödemeler {#anonymous-payments}

Kredi kartı ödemeleri, genellikle ödeme sağlayıcıları, bankalar ve ilgilenen diğer taraflar (ör. devlet yetkilileri) de dahil olmak üzere pek çok tarafça görüntülenebilir. Finansal gözlem, yasa dışı aktivite tespiti için fayda sağlasa da sıradan vatandaşların mahremiyetine zarar vermektedir.

Kripto paralar; kullanıcıların, özel ve eşler arası işlem gerçekleştirebilmesi için bir araç sağlamayı amaçlıyordu. Fakat kripto para birimlerinin pek çoğunda, işlemler, halka açık blok zincirlerde açıkça görüntülenebilir. Kullanıcı kimlikleri genellikle takma adlardan oluşur ve ya kasıtlı olarak gerçek dünya kimlikleriyle (ör. Twitter veya GitHub profillerine ETH adresleri ekleyerek) ilişkilendirilir ya da temel zincir üstü ve zincir dışı veri analizi kullanılarak gerçek dünya kimlikleriyle ilişkilendirilebilir.

Tamamen anonim işlemler için tasarlanmış "güvenlik paraları" mevcuttur. Zcash ve Monero gibi gizlilik odaklı blok zincirler, gönderici/alıcı adresi, varlık türü, miktarı ve işlem zamanı gibi işlem bilgilerini gizli tutar.

Sıfır bilgi teknolojisini protokole yerleştirerek, gizlilik odaklı [blokzincir](/glossary/#blockchain) ağları, [düğümlerin](/glossary/#node) işlem verilerine erişmeye gerek kalmadan işlemleri doğrulamasına olanak tanır. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503), Ethereum blokzincirinde yerel özel değer transferlerini mümkün kılacak önerilen bir tasarım örneğidir. Ancak bu tür önerilerin uygulanması; güvenlik, mevzuat ve kullanıcı deneyimi (UX) endişelerinin bir karışımı nedeniyle zordur.

**Sıfır bilgili ispatlar, herkese açık blokzincirlerde işlemleri anonimleştirmek için de kullanılabilir**. Merkeziyetsiz ve gözetimsiz bir servis olan ve kullanıcıların Ethereum üzerinde gizli bir şekilde işlem yapmasına olanak sağlayan Tornado Cash buna bir örnektir. Tornado Cash sıfır bilgili ispatları kullanarak işlem detaylarını gizler ve kullanıcılara finansal gizlilik garantisi verir. Maalesef bunlar "kayıtlı" gizlilik araçları olduğundan yasa dışı aktiviteler ile bağdaştırılmaktadır. Bunun üstesinden gelmek için gizlilik, herkese açık blok zincirlerde olağan bir özellik olmalıdır. [Ethereum'da gizlilik](/privacy/) hakkında daha fazla bilgi edinin.

### Kimlik koruması {#identity-protection}

Günümüzdeki kimlik yönetimi sistemleri kişisel bilgileri riske atmaktadır. Sıfır bilgili ispatlar, kişilere ait hassas detayları koruyarak kişilerin kimliklerini kanıtlamasına olanak sağlar.

Sıfır bilgi ispatları, [merkeziyetsiz kimlik](/decentralized-identity/) bağlamında özellikle kullanışlıdır. Merkeziyetsiz kimlik (ya da kendine egemen kimlik), bireylerin kendi kimlik bilgilerine erişimleri kontrol edebilme yeteneği sağlar. Vergi numaranızı ya da pasaport detaylarınızı açıkça söylemeden vatandaşlığınızı kanıtlamak, sıfır bilgi teknolojisinin merkeziyetsiz kimliği nasıl mümkün kıldığına bir örnektir.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Kimlik uygulaması: Butan Ulusal Dijital Kimliği (NDI) Ethereum'da
    </AlertTitle>
    <AlertDescription>
      <p>
        ZKP'nin kimlik yönetim sistemleri için kullanıldığı gerçek dünya örneklerinden biri, Ethereum üzerine inşa edilmiş olan Butan Krallığı'nın Ulusal Dijital Kimlik (NDI) sistemidir. Butan'ın NDI'si, vatandaşların kimliklerindeki hassas kişisel verileri ifşa etmeden, “Ben bir vatandaşım” veya “18 yaşından büyüğüm” gibi kendileri hakkındaki gerçekleri kriptografik olarak kanıtlamalarına olanak sağlamak için ZKP'leri kullanır.
      </p>
      <p>
        <a href="/decentralized-identity/#national-and-government-id">Merkeziyetsiz Kimlik vaka incelemesinde</a> Butan NDI hakkında daha fazla bilgi edinin.
      </p>
</AlertDescription>
</AlertContent>
</Alert>

### İnsanlık Kanıtı {#proof-of-humanity}

Günümüzde fiilen kullanılan sıfır bilgi ispatlarının en yaygın örneklerinden biri, “yapay zeka çağı için küresel bir dijital pasaport” olarak düşünülebilecek olan [World ID protokolüdür](https://world.org/blog/world/world-id-faqs). İnsanların kişisel bilgilerini ifşa etmeden benzersiz bireyler olduklarını kanıtlamalarına olanak tanır. Bu, Orb adı verilen, bir kişinin irisini tarayan ve bir iris kodu üreten bir cihaz aracılığıyla gerçekleştirilir. İris kodu, kişinin biyolojik olarak benzersiz bir insan olduğunu doğrulamak için kontrol edilir ve doğrulanır. Doğrulamanın ardından, kullanıcının cihazında oluşturulan (ve biyometrik verilerle bağlantılı veya bunlardan türetilmemiş) bir kimlik taahhüdü, blokzincirdeki güvenli bir listeye eklenir. Daha sonra, kullanıcı doğrulanmış bir insan olduğunu kanıtlamak istediğinde (oturum açmak, oy kullanmak veya başka eylemler gerçekleştirmek için), listedeki üyeliğini onaylayan bir sıfır bilgi ispatı oluşturabilir. Sıfır bilgi ispatı kullanmanın güzelliği, yalnızca tek bir ifadenin ortaya çıkmasıdır: bu kişi benzersizdir. Diğer her şey gizli kalır.

World ID, Ethereum Foundation'daki [PSE ekibi](https://pse.dev/) tarafından geliştirilen [Semaphore protokolüne](https://docs.semaphore.pse.dev/) dayanır. Semaphore, sıfır bilgi ispatları oluşturmak ve doğrulamak için hafif ama güçlü bir yol olacak şekilde tasarlanmıştır. Kullanıcıların, grubun hangi üyesi olduklarını göstermeden bir grubun (bu durumda, doğrulanmış insanlar) parçası olduklarını kanıtlamalarını sağlar. Semaphore aynı zamanda son derece esnektir ve kimlik doğrulama, etkinliklere katılım veya kimlik bilgisi sahipliği gibi çok çeşitli kriterlere dayalı olarak gruplar oluşturulmasına olanak tanır.

### Kimlik Doğrulama {#authentication}

Çevrimiçi hizmetleri kullanmak için, kimliğinizi ve bu platformlara erişiminizi kanıtlamanız gerekir. Genellikle isminiz, e-posta adresiniz, doğum tarihiniz gibi kişisel bilgilerinizi paylaşmanız gerekir. Hatta uzun parolaları ezberlemeniz ve erişimi kaybetme riskini almanız gerekir.

Ancak sıfır bilgili ispatlar, kimlik doğrulama sürecini hem platformlar hem de kullanıcılar için kolaylaştırabilir. Sıfır bilgili ispatlar, herkese açık girdiler (kullanıcının platforma üyeliğini kanıtlayan veriler) ve gizli girdiler (kullanıcı bilgileri) kullanılarak oluşturulduktan sonra, kullanıcılar bu kanıtları kullanarak kimliklerini doğrulayabilir ve hizmetlere ulaşabilirler. Böylece kullanıcı deneyimi iyileşir ve kuruluşlar, yüksek miktarda kişisel bilgi depoloma ihtiyacından kurtulabilir.

### Doğrulanabilir hesaplama {#verifiable-computation}

Doğrulanabilir hesaplama, blok zincir tasarımlarını geliştirmek için sıfır bilgi teknolojisi kullanan başka bir uygulamadır. Doğrulanabilir hesaplama, doğrulanabilir sonuçları kendinde tutarken hesaplamaların başka bir varlık tarafından yapılmasına olanak verir. Hesaplamayı yapan varlık, programın doğru gerçekleştirildiğine dair bir kanıtla birlikte sonucu sunar.

Doğrulanabilir hesaplama, güvenliği azaltmadan **blokzincirlerdeki işlem hızlarını iyileştirmek için kritik öneme sahiptir**. Bunu anlamak için Ethereum'u ölçeklendirme adına önerilen çözümlerin farkı bilinmelidir.

[Zincir üstü ölçeklendirme çözümleri](/developers/docs/scaling/#onchain-scaling), parçalama gibi, blokzincirin temel katmanının kapsamlı bir şekilde değiştirilmesini gerektirir. Fakat bu bakış açısı fazlasıyla karmaşıktır ve uygulamadaki hatalar Ethereum'un güvenlik modeline zarar verebilir.

[Zincir dışı ölçeklendirme çözümleri](/developers/docs/scaling/#offchain-scaling), temel Ethereum protokolünün yeniden tasarlanmasını gerektirmez. Bunun yerine Ethereum'un temel katmanındaki verimi arttırmak için dış kaynaklı bir hesaplama modelini kullanır.

Bunun pratikte nasıl işleyeceği aşağıdadır:

- Ethereum, tüm işlemlerin işlemek yerine, yürütmeyi farklı bir zincire bırakır.

- Tüm işlemler işlendikten sonra diğer zincir, sonuçları Ethereum'un durumuna uygulanmak üzere geri gönderir.

Burdaki fayda, Ethereum'un hiçbir işlem yapmasına gerek kalmaması ve sadece dış kaynaklı hesaplama sonuçlarını kendi durumuna uygulaması gerekmesidir. Böylece ağ trafiği azalır ve işlem hızları artar (zincir dışı protokoller daha hızlı uygulanmak üzere optimize edilir).

Zincirin, zincir dışı işlemleri yeniden yürütmeden doğrulamasının bir yoluna ihtiyacı vardır, aksi takdirde zincir dışı yürütmenin değeri kaybolur.

Tam bu noktada doğrulanabilir hesaplamalar devreye girer. Bir düğüm, Ethereum dışında bir işlem yürüttüğünde, zincir dışı yürütmenin doğruluğunu kanıtlamak için bir sıfır bilgi ispatı sunar. Bu kanıt ([geçerlilik kanıtı](/glossary/#validity-proof) olarak adlandırılır), bir işlemin geçerli olduğunu garanti eder ve Ethereum'un sonucu, kimsenin itiraz etmesini beklemeden durumuna uygulamasına olanak tanır.

[Sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups) ve [validium'lar](/developers/docs/scaling/validium/), güvenli ölçeklenebilirlik sağlamak için geçerlilik kanıtları kullanan iki zincir dışı ölçeklendirme çözümüdür. Bu protokoller zincir dışında binlerce işlem gerçekleştirir ve Ethereum üzerinde doğrulama için kanıtlar sunar. Bu sonuçlar kanıt doğrulanır doğrulanmaz Ethereum üzerine uygulanır. Böylece temel katmanındaki hesaplamaları arttırmadan Ethereum'un daha fazla işlem gerçekleştirmesine olanak sağlar.

Katman 2 ölçeklendirmesinin ötesinde, sıfır bilgi ispatları Ethereum L1 blok yürütmesinin kendisini de doğrulayabilir. L1 doğrulaması için zkEVM, doğrulayıcıların tüm işlemleri yeniden yürütmek yerine bir ispatı kontrol ederek blokları doğrulamasına olanak tanır -- bu da doğrulayıcı donanım gereksinimlerini artırmadan daha yüksek gaz limitlerini mümkün kılar.

### Zincir üstündeki oylamalarda rüşvet ve gizli anlaşmaları azaltma {#secure-blockchain-voting}

Blok zincir oylama şemalarının pek çok olumlu özelliği vardır: tamamen denetlenebilirlik, saldırılara karşı güvenlik, sansüre dayanıklılık ve coğrafi koşullardan bağımsızlık. Ancak zincir üstü oylama şemaları bile **gizli anlaşma** sorununa karşı bağışık değildir.

"Başkalarını aldatarak, dolandırarak veya yanıltarak rekabeti sınırlamak için iş birliği yapmak" şeklinde tanımlanan gizli anlaşmalar, kötü niyetli aktörlerin rüşvet teklif ederek oylamayı etkilemesi şeklinde gerçekleşebilir. Örneğin, Alice `A seçeneğini` tercih etse bile Bob'dan bir oy pusulasında `B seçeneği` için oy kullanması karşılığında rüşvet alabilir.

Rüşvet ve gizli anlaşmalar, (özellikle kullanıcılar hangi oyu verdiklerini kanıtlayabildiğinde) oylamayı bir sinyal mekanizması olarak kullanan süreçlerin verimliliğini kısıtlar. Özellikle oyların sınırlı kaynak kullanımını etkilediği durumlarda, bu durum önemli sonuçlara yol açabilir.

Örneğin, [kareli fonlama mekanizmaları](https://www.radicalxchange.org/wiki/plural-funding/) farklı kamu yararı projeleri arasında belirli seçeneklere yönelik tercihi ölçmek için bağışlara dayanır. Her bağış, projeler için bir "oy" sayılır ve daha çok oy alan projeler eşleştirme havuzundan daha çok fon alır.

Zincir üstü oylama kullanmak, kareli fonlamayı gizli anlaşmalara karşı savunmasız hale getirir: blokzincir işlemleri halka açıktır, bu nedenle rüşvet verenler, rüşvet alan bir kişinin nasıl “oy kullandığını” görmek için zincir üstü etkinliğini inceleyebilir. Bu şekilde kuadratik fonlama, topluluğun tercihlerine dayalı fonların kullanımı için etkili bir yöntem olmaktan çıkar.

Neyse ki, MACI (Minimum Anti-Collusion Infrastructure) gibi daha yeni çözümler, zincir üstü oylamayı (ör. kareli fonlama mekanizmaları) rüşvet ve gizli anlaşmalara karşı dirençli hale getirmek için sıfır bilgi ispatlarını kullanıyor. MACI, merkezi bir yöneticinin (“koordinatör” olarak adlandırılır) her bir bireyin nasıl oy kullandığına dair ayrıntıları açıklamadan oyları toplamasına ve sonuçları çetelemesine olanak tanıyan bir akıllı sözleşme ve betik setidir. Buna rağmen oyların doğru sayıldığını doğrulamak veya bireylerin oylama turuna katıldığını onaylamak mümkündür.

#### MACI, sıfır bilgili ispat nasıl çalışır? MACI, ZK ispatları ile nasıl çalışır {#how-maci-works-with-zk-proofs}

İlk olarak koordinatör MACI sözleşmesini Ethereum'a dağıtır, sonrasında kullanıcılar (açık anahtarlarıyla akıllı sözleşmeye kayıt olarak) oylama için üye olabilir. Kullanıcılar akıllı sözleşmeye herkese açık anahtarlarıyla şifrelenen (diğer kriterlere ek, geçerli bir oy kullanıcının kimliği ile ilişkili olan en güncel herkese açık anahtarla imzalanmış olmalıdır) mesajlar göndererek oy verirler. Sonrasında, koordinatör oylama süresi bittiğinde tüm mesajları işler, oyların çetelesini tutar ve sonuçları zincir üstünde doğrular.

MACI'de sıfır bilgili ispatları koordinatörün hatalı biçimde oyları işlemesi ve sonuçların çetelesini tutmasını imkansızlaştırmak için hesaplamanın doğruluğundan emin olmak amaçlı sıfır bilgili ispatları kullanılır. Bunu başarmak koordinatörün a) tüm mesajların doğru işlendiğini b) sonucun tüm _geçerli_ oyların toplamına eşit olduğunu doğrulayan ZK-SNARK kanıtları oluşturmasını gerektirir.

Böylece, kullanıcı başına oy hakkında bir analiz paylaşmadan bile (normalde olduğu gibi), MACI çetele sürecinde hesaplanan sonuçların bütünlüğünü garantiler. Bu temel çakışma şemalarının etkisini düşürmek için kullanışlıdır. Bu ihtimali daha önceki Bob'un Alice'e bir seçeneğe oy vermesi için rüşvet vermesi örneğinden yola çıkarak keşfedebiliriz:

- Alice genel anahtarını akıllı sözleşmeye göndererek oy vermek üzere kaydolur.
- Alice, Bob'dan aldığı rüşvet karşılığında `B seçeneği` için oy vermeyi kabul eder.
- Alice `B seçeneğini` oylar.
- Alice gizlice, kimliğiyle eşleştirilmiş açık anahtarını değiştirmek için şifrelenmiş bir işlem gönderir.
- Alice, yeni açık anahtarı kullanarak `A seçeneği` için oy vermek üzere akıllı sözleşmeye başka bir (şifrelenmiş) mesaj gönderir.
- Alice, Bob'a `B seçeneğine` oy verdiğini gösteren bir işlem gösterir (bu işlem geçersizdir çünkü açık anahtar artık sistemde Alice'in kimliğiyle ilişkili değildir)
- Mesajları işlerken, koordinatör Alice'in `B seçeneği` için verdiği oyu atlar ve yalnızca `A seçeneği` için verdiği oyu sayar. Bu nedenle Bob'un Alice ile gizli bir anlaşma yapma ve zincir üstü oyları etkileme girişimi başarısız olur.

MACI kullanmak, koordinatörün rüşvetçilerle gizli anlaşma yapmayacağına veya seçmenlere rüşvet vermeye teşebbüs etmeyeceğine güvenmeyi _gerektirir_. Koordinatör kullanıcı mesajlarını deşifre edebilir (kanıtı oluşturmak için gereklidir), yani her kişinin nasıl oy verdiğini isabetli bir şekilde doğrulayabilir.

Ancak koordinatörün dürüst kaldığı durumlarda MACI, zincir üstü oylamanın dokunulmazlığını garanti altına almak için güçlü bir araçtır. Bu durum, her bir bireyin oy tercihinin bütünlüğüne büyük ölçüde dayanan kareli fonlama uygulamaları (ör. [clr.fund](https://clr.fund/#/about/maci)) arasındaki popülerliğini açıklar.

[MACI hakkında daha fazla bilgi edinin](https://maci.pse.dev/).

## Sıfır bilgili ispatlar nasıl çalışır? Sıfır bilgi ispatları nasıl çalışır? {#how-do-zero-knowledge-proofs-work}

Bir sıfır bilgili ispat, bir ifadenin doğruluğunu, ifadenin içeriğini veya doğruluğa nasıl ulaştığınızı açıklamadan kanıtlamanızı sağlar. Bunu mümkün kılmak için sıfır bilgi protokolleri, girdi olarak bazı verileri alan ve çıktı olarak "doğru" veya "yanlış" olarak döndüren algoritmalara dayanır.

Bir sıfır bilgi protokolü aşağıdaki kriterleri sağlamalıdır:

1. **Bütünlük**: Girdi geçerliyse, sıfır bilgi protokolü her zaman 'doğru' sonucunu döndürür. Dolayısıyla, esas ifade doğruysa, kanıtlayıcı ve doğrulayıcı dürüst davranırsa, kanıt kabul edilebilir.

2. **Sağlamlık**: Girdi geçersizse, sıfır bilgi protokolünü 'doğru' döndürmesi için kandırmak teorik olarak imkansızdır. Bu nedenle, yalan söyleyen bir kanıtlayıcı, dürüst bir doğrulayıcıyı geçersiz bir ifadenin geçerli olduğuna inandırmak için kandıramaz (küçük bir olasılık marjı dışında).

3. **Sıfır bilgi**: Doğrulayıcı, bir ifade hakkında geçerliliğinin veya yanlışlığının ötesinde hiçbir şey öğrenmez (ifade hakkında “sıfır bilgiye” sahiptirler). Bu gereklilik ayrıca doğrulayıcının kanıttan orijinal girdiyi (ifadenin içeriklerini) türetmesini engeller.

Temel biçimde, bir sıfır bilgi ispatı üç unsurdan oluşur: **tanık**, **meydan okuma** ve **yanıt**.

- **Tanık**: Bir sıfır bilgi ispatı ile kanıtlayıcı, bazı gizli bilgilere dair bilgisini kanıtlamak ister. Gizli bilgi, kanıtın "tanığıdır" ve kanıtlayıcının tanık hakkındaki varsayılan bilgisi, sadece bilgi sahibi olan bir tarafın yanıtlayabileceği bir dizi soru oluşturur. Bu yüzden kanıtlayıcı kanıtlama sürecine rastgele bir soru seçerek, cevabını hesaplayarak ve cevabı doğrulayıcıya göndererek başlar.

- **Meydan okuma**: Doğrulayıcı, setten rastgele başka bir soru seçer ve kanıtlayıcıdan bunu yanıtlamasını ister.

- **Yanıt**: Kanıtlayıcı soruyu kabul eder, yanıtı hesaplar ve doğrulayıcıya geri gönderir. Kanıtlayıcının cevabı sayesinde doğrulayıcı, kanıtlayıcının gerçekten tanığa erişiminin olup olmadığını kontrol edebilir. Doğrulayıcı, kanıtlayıcının rastgele tahminlerde bulunmadığından ve doğru cevapları şans eseri vermediğinden emin olmak için daha fazla soru sorar. Bu etkileşimin pek çok kez tekrarlanması ile kanıtlayıcının tanık bilgilerini taklit etme olasılığı doğrulayıcı emin olana kadar önemli oranda azalır.

Yukarıdaki bilgiler "etkileşimli sıfır bilgi kanıtlarının" yapısını açıklamaktadır. Başlarda sıfır bilgi protokolleri etkileşimli kanıtlamayı kullanırdı. Bu yöntem ifadenin gerçekliğinin doğrulanması için kanıtlayıcı ve doğrulayıcılar arasında çift taraflı haberleşme gerektirirdi.

Etkileşimli kanıtların nasıl çalıştığını gösteren iyi bir örnek Jean-Jacques Quisquater’in ünlü [Ali Baba mağara hikayesidir](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave). Bu hikâyede Peggy (kanıtlayıcı), Victor'a (doğrulayıcı) sihirli kapıyı açmak için gerekli gizli ifadeyi bildiğini bu kelimeyi söylemeden anlatmak ister.

### Etkileşimsiz sıfır bilgi ispatları {#non-interactive-zero-knowledge-proofs}

Devrim niteliğinde olsa da etkileşimli kanıtlama, iki tarafın da müsait olmasını ve tekrar tekrar etkileşime girmesini gerektirdiğinden sınırlı bir kullanışlılığa sahipti. Doğrulayıcı kanıtlayıcının dürüstlüğünden emin olsa bile kanıt, bağımsız doğrulama için erişilebilir değildi (yeni bir kanıtın üretilmesi kanıtlayıcı ve doğrulayıcı arasında yeni bir dizi mesaj gerektiriyordu).

Bu sorunu çözmek için Manuel Blum, Paul Feldman ve Silvio Micali, kanıtlayıcı ve doğrulayıcının paylaşılan bir anahtara sahip olduğu ilk [etkileşimsiz sıfır bilgi ispatlarını](https://dl.acm.org/doi/10.1145/62212.62222) önerdiler. Bu öneri, kanıtlayıcının, bilginin kendisini sağlamadan (örneğin tanık) bilgiye sahip olduğunu göstermesini sağlar.

Etkileşimli kanıtların tersine, etkileşimsiz kanıtlar, taraflar (yani kanıtlayıcı ve doğrulayıcı) arasında yalnızca bir tur etkileşim gerektirir. Kanıtlayıcı, gizli bilgiyi özel bir algoritmadan geçirerek sıfır bilgili ispatı oluşturur. Bu kanıt doğrulayıcıya gönderilir ve doğrulayıcı başka bir algoritma kullanarak kanıtlayıcının gizli bilgiyi bilip bilmediğini kontrol eder.

Etkileşimsiz kanıtlama kanıtlayıcı ve doğrulayıcı arasındaki haberleşmeyi azaltarak sıfır bilgili ispatları daha verimli hale getirir. Ayrıca, kanıtlar oluşturulduktan sonra (paylaşımlı anahtara ve doğrulama algoritmasına sahip olan) herkesin doğrulamak üzere erişimine açık olur.

Etkileşimsiz kanıtlar sıfır bilgi teknolojisi için bir devrim niteliğindedir ve günümüzde kullanılan kanıt sistemlerinin gelişimini teşvik etmiştir. Bu kanıt türleri aşağıda tartışılmaktadır:

### Sıfır bilgi ispatı türleri {#types-of-zero-knowledge-proofs}

#### ZK-SNARK'lar {#zk-snarks}

ZK-SNARK, **Sıfır Bilgili Özlü Etkileşimsiz Bilgi Argümanı**'nın kısaltmasıdır. ZK-SNARK protokolü aşağıdaki özelliklere sahiptir:

- **Sıfır bilgi**: Bir doğrulayıcı, ifade hakkında başka hiçbir şey bilmeden bir ifadenin bütünlüğünü doğrulayabilir. Onaylayıcının ifadeyle ilgili tek bilgisi ifadenin doğru veya yanlış olmasıdır.

- **Özlü**: Sıfır bilgi ispatı tanıktan daha küçüktür ve hızlı bir şekilde doğrulanabilir.

- **Etkileşimsiz**: Kanıt 'etkileşimsizdir' çünkü kanıtlayıcı ve doğrulayıcı, çoklu iletişim turları gerektiren etkileşimli kanıtların aksine yalnızca bir kez etkileşime girer.

- **Argüman**: Kanıt, 'sağlamlık' gereksinimini karşılar, bu nedenle hile yapmak son derece olası değildir.

- **(Bilgi)**: Sıfır bilgi ispatı, gizli bilgiye (tanığa) erişim olmadan oluşturulamaz. Tanığa sahip olmayan bir kanıtlayıcının geçerli bir sıfır bilgili ispat hesaplaması imkansız olmasa da zordur.

Daha önce de bahsedilen "paylaşımlı anahtar" kanıtlayıcının ve doğrulayıcının kanıtları oluşturmak ve doğrulamak için kullanmayı kabul ettiği genel parametreleri belirtir. Protokol güvenliğindeki önemden dolayı, genel parametrelerin (topluca Ortak Referans Dizisi (CRS) olarak bilinir) oluşturulması, hassas bir işlemdir. Eğer CRS'nin oluşturulmasında kullanılan entropi (rastgelelik) dürüst olmayan bir kanıtlayıcının eline geçerse, yanlış kanıtlar hesaplayabilir.

[Çok taraflı hesaplama (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation), genel parametrelerin oluşturulmasındaki riskleri azaltmanın bir yoludur. Birden fazla taraf, her bir kişinin CRS'yi oluşturmak için bazı rastgele değerlerle katkıda bulunduğu bir [güvenilir kurulum törenine](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) katılır. Bir dürüst taraf entropinin kendine düşenini yok ettiği sürece, ZK-SNARK protokolü hesaplama sağlamlığını kaybetmez.

Güvenilir kurulumlar, kullanıcıların parametre oluştumada katılımcılara güvenmesini gerektirir. Ancak, ZK-STARK'ların gelişmesi, güvenilir olmayan kurulum ile çalışan kanıtlama protokollerine olanak sağladı.

#### ZK-STARK'lar {#zk-starks}

ZK-STARK, **Sıfır Bilgili Ölçeklenebilir Şeffaf Bilgi Argümanı**'nın kısaltmasıdır. ZK-STARK'lar ZK-SNARK'lara benzerler, farkları ise şunlardır:

- **Ölçeklenebilir**: Tanık boyutu daha büyük olduğunda ZK-STARK, kanıt oluşturma ve doğrulama konusunda ZK-SNARK'tan daha hızlıdır. STARK kanıtlarıyla, kanıtlayıcı ve doğrulama süreleri tanık büyüdükçe birazcık artar (SNARK kanıtlayıcı ve doğrulayıcı süreleri tanık boyutuyla doğrusal olarak artar).

- **Şeffaf**: ZK-STARK, kanıtlama ve doğrulama için güvenilir bir kurulum yerine genel parametreler oluşturmak için halka açık olarak doğrulanabilir rastgeleliğe dayanır. Bu nedenle, ZK-SNARK'lara göre daha şeffaftırlar.

ZK-STARK'lar daha büyük kanıtlar ürettikleri için ZK-SNARK'lardan daha yüksek doğrulama ek yüklerine sahiptir. Ancak, ZK-STARK'lar bazı durumlarda (büyük veri kümelerinin kanıtlanması gibi) ZK-SNARK'lardan daha uygun maliyetli olabilir.

## Sıfır bilgi ispatlarını kullanmanın dezavantajları {#drawbacks-of-using-zero-knowledge-proofs}

### Donanım maliyetleri {#hardware-costs}

Sıfır bilgili ispatlar üretmek, özel makinelerde en iyi şekilde gerçekleştirilen çok karmaşık hesaplamaları gerektirir. Bu makineler pahalı olduklarından dolayı, genellikle normal bireylerin erişimine uzaktır. Ek olarak, sıfır bilgi teknolojisini kullanmak isteyen uygulamalar, donanım maliyetlerini de hesaba katmalıdır, ki bu da son kullanıcılar için maliyetleri artırabilir.

### Kanıt doğrulama maliyetleri {#proof-verification-costs}

Kanıtları doğrulamak ayrıca karışık hesaplamalar gerektirir ve uygulamalarda sıfır bilgi teknolojisinin uygulama maliyetlerini artırır. Bu maliyet, hesaplamanın kanıtlanması konusunda özellikle önemlidir. Örneğin, ZK toplamaları, Ethereum üzerinde yalnız bir ZK-SNARK kanıtını doğrulamak için ~ 500.000 gaz öder ve ZK-STARK'lar daha da yüksek ücretler gerektirir.

### Güven varsayımları {#trust-assumptions}

ZK-SNARK'ta, Ortak Referans Dizesi (genel parametreler) bir kere oluşturulur ve sıfır bilgi protokolüne katılmak isteyen taraflarca yeniden kullanılabilir. Genel parametreler, katılımcıların dürüst olduğunun varsayıldığı güvenilir bir kurulum töreni ile oluşturulurlar.

Ancak kullanıcıların, katılımcıların dürüstlüğünü değerlendirmesinin hiçbir yolu yoktur ve kullanıcılar, geliştiricilerin sözlerine güvenmek mecburiyetindedirler. ZK-STARK'lar, dizenin üretilmesinde kullanılan rastgeleliğin herkes tarafından doğrulanabilir olması sayesinde güven varsayımlarından muaftır. Bu arada, araştırmacılar kanıtlama mekanizmalarının güvenliğini artırmak amacıyla ZK-SNARK'lar için güvenilir olmayan kurulumlar üzerine çalışıyorlar.

### Kuantum bilişim tehditleri {#quantum-computing-threats}

ZK-SNARK, şifreleme için eliptik eğri kriptografisi kullanır. Eliptik eğri ayrık logaritma probleminin şimdilik çözülemez olduğu varsayılırken, kuantum bilgisayarların geliştirilmesi ile gelecekte bu güvenlik modeli kırılabilir.

Güvenliği konusunda sadece çarpışmaya dirençli karma işlevlerine güvendiğinden ZK-STARK'ın kuantum bilişim tehdidine karşı bağışık olduğu düşünülüyor. Eliptik eğri kriptografisinde kullanılan genel-özel anahtar çiftlerinin aksine, kuantum hesaplama algoritmaların kırılması için çarpışmaya dirençli karma oluşturmak daha zordur.

## Daha fazla kaynak {#further-reading}

- [Sıfır bilgi ispatlarının kullanım durumlarına genel bakış](https://pse.dev/projects) — _Privacy and Scaling Explorations Team_
- [SNARK'lar, STARK'lar ve Özyinelemeli SNARK'lar Karşılaştırması](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Sıfır Bilgi İspatı: Blokzincirde Gizliliği Geliştirme](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK'lar — Gerçekçi bir Sıfır Bilgi Örneği ve Derinlemesine İnceleme](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK'lar — Kuantum Bilgisayarlara Karşı Bile Doğrulanabilir Güven Yaratın](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [zk-SNARK'ların nasıl mümkün olduğuna dair yaklaşık bir giriş](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Sıfır Bilgi İspatları (ZKP'ler) Neden Bağımsız Kimlik için Oyunu Değiştiren Bir Gelişmedir](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [EIP-7503 Açıklaması: ZK İspatları ile Ethereum'da Özel Transferleri Etkinleştirme](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [ZK Kart Oyunu: ZK temellerini ve gerçek hayattaki kullanım alanlarını öğrenmek için bir oyun](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
