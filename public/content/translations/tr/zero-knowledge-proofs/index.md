---
title: Sıfır bilgili ispatlar
description: Yeni başlayanlar için sıfır bilgili ispatlara teknik olmayan bir giriş.
lang: tr
---

# Sıfır bilgili ispatlar nelerdir? {#what-are-zk-proofs}

Sıfır bilgili ispat, ifadenin kendisini açığa çıkarmadan bir ifadenin geçerliliğini kanıtlamanın bir yoludur. "Kanıtlayıcı", bir iddiayı kanıtlamaya çalışan taraftır, "doğrulayıcı" ise iddiayı doğrulamaktan sorumludur.

Sıfır bilgili ispatlardan, yaygın güncel tanımıyla birlikte ilk kez 1985 yılında yayınlanan "[İnteraktif kanıt sistemlerinde bilgi karmaşıklığı](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)" başlıklı çalışmada bahsedilmiştir:

> Sıfır bilgi protokolü, bir tarafın (kanıtlayıcı) diğer bir tarafa (doğrulayıcı) bir şeyin **doğru olduğunu, bilginin doğruluğu dışında herhangi bir bilgi vermeden** **kanıtlayabildiği bir protokoldür**.

Yıllar geçtikçe gelişen sıfır bilgili ispat günümüzde birçok gerçek dünya uygulamasında kullanılmaktadır.

<YouTube id="fOGdb1CTu5c" />

## Neden sıfır bilgili ispatlara ihtiyacımız var? {#why-zero-knowledge-proofs-are-important}

Sıfır bilgili ispatlar, bireyler özelinde bilgi güvenliğini taahhüt ettikleri için uygulamalı kriptografide gerçekleşen bir atılımı ifade eder. Bir iddiayı (ör. "Şu ülkenin vatandaşıyım") karşı tarafa (ör. hizmet sağlayıcı) kanıtlamanın yollarını düşünün. İddianızı destekleyecek pasaport ya da sürücü belgesi gibi bir "delil" sunmak durumundasınız.

Ancak bu yaklaşım, en önemlisi mahremiyet eksikliği olmak üzere bazı sorunları da beraberinde getirir. Üçüncü şahıslara ait hizmetlerle paylaşılan Kimliği Tanımlayabilecek Bilgiler (PII), bilgisayar saldırılarına karşı savunmasız olan merkezi veritabanlarında tutulur. Kimlik hırsızlıklarının kritik bir sorun haline gelmesiyle birlikte, hassas bilgilerin paylaşılabilmesi için daha fazla gizliliği koruyan araç ihtiyacı doğdu.

Sıfır bilgili ispatlar, iddiaların geçerliliğini kanıtlamak için **bilgi açıklama ihtiyacını ortadan kaldırarak** bu sorunu çözer. Sıfır bilgi protokolü, doğruluğunun kısa ve öz bir kanıtını oluşturmak için girdi olarak ifadeyi ("tanık" olarak adlandırılır) kullanır. Bu kanıt; oluşturulurken kullanılan bilgileri ifşa etmeden, bir ifadenin doğru olduğuna dair güçlü garantiler sağlar.

Daha önceki örneğimize dönecek olursak, vatandaşlık iddianızı kanıtlamak için ihtiyacınız olan tek kanıt bir sıfır bilgi kanıtıdır. Doğrulayıcı, esas ifadenin de doğru olduğuna ikna olmak için yalnızca kanıtın belirli özelliklerinin doğru olup olmadığını kontrol etmelidir.

## Sıfır bilgili ispatlar için kullanım örnekleri {#use-cases-for-zero-knowledge-proofs}

### Anonim ödemeler {#anonymous-payments}

Kredi kartı ödemeleri, genellikle ödeme sağlayıcıları, bankalar ve ilgilenen diğer taraflar (ör. devlet yetkilileri) de dahil olmak üzere pek çok tarafça görüntülenebilir. Finansal gözlem, yasa dışı aktivite tespiti için fayda sağlasa da sıradan vatandaşların mahremiyetine zarar vermektedir.

Kripto paralar; kullanıcıların, özel ve eşler arası işlem gerçekleştirebilmesi için bir araç sağlamayı amaçlıyordu. Fakat kripto para birimlerinin pek çoğunda, işlemler, halka açık blok zincirlerde açıkça görüntülenebilir. Kullanıcı kimlikleri genellikle takma isimlerden oluşur ve kullanıcıların isteği dahilinde gerçek kimlikleriyle bağlantılıdır (ör. Twitter veya GitHub profilindeki ETH adresleri) ya da bu takma isimler, zincir dışı veri analizi ile gerçek kimliklerle bağdaştırılabilir.

Tamamen anonim işlemler için tasarlanmış "güvenlik paraları" mevcuttur. Zcash ve Monero gibi gizlilik odaklı blok zincirler, gönderici/alıcı adresi, varlık türü, miktarı ve işlem zamanı gibi işlem bilgilerini gizli tutar.

Gizlilik odaklı [blokzincir](/glossary/#blockchain) ağları, protokollerine sıfır bilgi teknolojisini ekleyerek [düğümlerin](/glossary/#node) işlem verilerine erişmesine gerek kalmadan işlemleri doğrulamasına olanak tanır.

**Sıfır bilgili ispatlar, herkese açık blokzincirlerde işlemleri anonimleştirmek için de kullanılabilir**. Merkeziyetsiz ve gözetimsiz bir servis olan ve kullanıcıların Ethereum üzerinde gizli bir şekilde işlem yapmasına olanak sağlayan Tornado Cash buna bir örnektir. Tornado Cash sıfır bilgili ispatları kullanarak işlem detaylarını gizler ve kullanıcılara finansal gizlilik garantisi verir. Maalesef bunlar "kayıtlı" gizlilik araçları olduğundan yasa dışı aktiviteler ile bağdaştırılmaktadır. Bunun üstesinden gelmek için gizlilik, herkese açık blok zincirlerde olağan bir özellik olmalıdır.

### Kimlik koruması {#identity-protection}

Günümüzdeki kimlik yönetimi sistemleri kişisel bilgileri riske atmaktadır. Sıfır bilgili ispatlar, kişilere ait hassas detayları koruyarak kişilerin kimliklerini kanıtlamasına olanak sağlar.

Sıfır bilgili ispatlar özellikle [merkeziyetsiz kimlik](/decentralized-identity/) bağlamında çok kullanışlıdır. Merkeziyetsiz kimlik (ya da kendine egemen kimlik), bireylerin kendi kimlik bilgilerine erişimleri kontrol edebilme yeteneği sağlar. Vergi numaranızı ya da pasaport detaylarınızı açıkça söylemeden vatandaşlığınızı kanıtlamak, sıfır bilgi teknolojisinin merkeziyetsiz kimliği nasıl mümkün kıldığına bir örnektir.

### Kimlik doğrulama {#authentication}

Çevrimiçi hizmetleri kullanmak için, kimliğinizi ve bu platformlara erişiminizi kanıtlamanız gerekir. Genellikle isminiz, e-posta adresiniz, doğum tarihiniz gibi kişisel bilgilerinizi paylaşmanız gerekir. Hatta uzun parolaları ezberlemeniz ve erişimi kaybetme riskini almanız gerekir.

Ancak sıfır bilgili ispatlar, kimlik doğrulama sürecini hem platformlar hem de kullanıcılar için kolaylaştırabilir. Sıfır bilgili ispatlar, herkese açık girdiler (kullanıcının platforma üyeliğini kanıtlayan veriler) ve gizli girdiler (kullanıcı bilgileri) kullanılarak oluşturulduktan sonra, kullanıcılar bu kanıtları kullanarak kimliklerini doğrulayabilir ve hizmetlere ulaşabilirler. Böylece kullanıcı deneyimi iyileşir ve kuruluşlar, yüksek miktarda kişisel bilgi depoloma ihtiyacından kurtulabilir.

### Doğrulanabilir hesaplama {#verifiable-computation}

Doğrulanabilir hesaplama, blok zincir tasarımlarını geliştirmek için sıfır bilgi teknolojisi kullanan başka bir uygulamadır. Doğrulanabilir hesaplama, doğrulanabilir sonuçları kendinde tutarken hesaplamaların başka bir varlık tarafından yapılmasına olanak verir. Hesaplamayı yapan varlık, programın doğru gerçekleştirildiğine dair bir kanıtla birlikte sonucu sunar.

Doğrulanabilir hesaplama, blokzincirlerde güvenlikten ödün vermeden **süreci hızlandırmaya yarayan kritik bir iyileştirmedir**. Bunu anlamak için Ethereum'u ölçeklendirme adına önerilen çözümlerin farkı bilinmelidir.

[Zincir üstü ölçeklendirme çözümleri](/developers/docs/scaling/#on-chain-scaling) (parçalama gibi), blok zincirin temel katmanında kapsamlı değişiklik gerektirir. Fakat bu bakış açısı fazlasıyla karmaşıktır ve uygulamadaki hatalar Ethereum'un güvenlik modeline zarar verebilir.

[Zincir dışı ölçeklendirme çözümleri](/developers/docs/scaling/#off-chain-scaling) temel Ethereum protokolünün yeniden tasarlanmasını gerektirmez. Bunun yerine Ethereum'un temel katmanındaki verimi arttırmak için dış kaynaklı bir hesaplama modelini kullanır.

Bunun pratikte nasıl işleyeceği aşağıdadır:

- Ethereum, tüm işlemlerin işlemek yerine, yürütmeyi farklı bir zincire bırakır.

- Tüm işlemler işlendikten sonra diğer zincir, sonuçları Ethereum'un durumuna uygulanmak üzere geri gönderir.

Burdaki fayda, Ethereum'un hiçbir işlem yapmasına gerek kalmaması ve sadece dış kaynaklı hesaplama sonuçlarını kendi durumuna uygulaması gerekmesidir. Böylece ağ trafiği azalır ve işlem hızları artar (zincir dışı protokoller daha hızlı uygulanmak üzere optimize edilir).

Zincir dışı işlemlerin, zincir tarafından doğrulanması için işlemi tekrar yürütmek dışında bir çözüm gereklidir. Aksi takdirde zincir dışı hesaplamalar değersiz olur.

Tam bu noktada doğrulanabilir hesaplamalar devreye girer. Bir düğüm, Ethereum dışında bir işlem gerçekleştirdiğine, bu zincir dışı işlemin doğruluğunu kanıtlayan bir sıfır bilgili ispat sunar. [Doğruluk kanıtı](/glossary/#validity-proof) adı verilen bu kanıt işlemin geçerli olduğunu garanti eder ve kimsenin itiraz etmesini beklemeden sonucun Ethereum durumuna uygulanmasına izin verir.

[Sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups) ve [Validium'lar](/developers/docs/scaling/validium/), doğruluk kanıtı kullanarak güvenli ölçeklendirme sağlayan iki zincir dışı ölçeklendirme çözümüdür. Bu protokoller zincir dışında binlerce işlem gerçekleştirir ve Ethereum üzerinde doğrulama için kanıtlar sunar. Bu sonuçlar kanıt doğrulanır doğrulanmaz Ethereum üzerine uygulanır. Böylece temel katmanındaki hesaplamaları arttırmadan Ethereum'un daha fazla işlem gerçekleştirmesine olanak sağlar.

### Zincir üstündeki oylamalarda rüşvet ve gizli anlaşmaları azaltma {#secure-blockchain-voting}

Blok zincir oylama şemalarının pek çok olumlu özelliği vardır: tamamen denetlenebilirlik, saldırılara karşı güvenlik, sansüre dayanıklılık ve coğrafi koşullardan bağımsızlık. Fakat zincir üstündeki çözümler bile **gizli anlaşma** sorununa karşı dirençli değildir.

"Başkalarını aldatarak, dolandırarak veya yanıltarak rekabeti sınırlamak için iş birliği yapmak" şeklinde tanımlanan gizli anlaşmalar, kötü niyetli aktörlerin rüşvet teklif ederek oylamayı etkilemesi şeklinde gerçekleşebilir. Örneğin Alice `A seçeneğini` tercih ettiği halde Bob'un, `B seçeneğini` tercih etmesi için Alice'e rüşvet verebilir.

Rüşvet ve gizli anlaşmalar, (özellikle kullanıcılar hangi oyu verdiklerini kanıtlayabildiğinde) oylamayı bir sinyal mekanizması olarak kullanan süreçlerin verimliliğini kısıtlar. Özellikle oyların sınırlı kaynak kullanımını etkilediği durumlarda, bu durum önemli sonuçlara yol açabilir.

Örneğin, [kuadratik fonlama mekanizmaları](https://www.radicalxchange.org/concepts/plural-funding/) farklı kamu projeleri arasında tercihleri belirlemek üzere bağışları kullanır.  Her bağış, projeler için bir "oy" sayılır ve daha çok oy alan projeler eşleştirme havuzundan daha çok fon alır.

Zincir üstü oylama kullanmak, kuadratik fonlamayı gizli anlaşmalara açık hale getirir: Blok zincir işlemleri herkese açıktır, yani rüşvet verenler zincir üstü aktiviteleri inceleyebilir ve rüşvet alanların "oylarını" görebilir. Bu şekilde kuadratik fonlama, topluluğun tercihlerine dayalı fonların kullanımı için etkili bir yöntem olmaktan çıkar.

Neyse ki MACI (Minimum Gizli Anlaşma Önleme Altyapısı) gibi yeni çözümler, sıfır bilgili ispatları kullanarak rüşvet ve gizli anlaşmalara dirençli zincir üstü oylama sağlayabilirler (ör. kuadratik fonlama mekanizması). MACI, (koordinatör adı verilen) merkezi bir yöneticinin oyları toplamasına ve kişilerin nasıl oyladığından _bağımsız_ bir şekilde sonuçları saymasına olanak sağlayan akıllı sözleşmeler ve kodlar bütünüdür. Buna rağmen oyların doğru sayıldığını doğrulamak veya bireylerin oylama turuna katıldığını onaylamak mümkündür.

#### MACI, sıfır bilgili ispat nasıl çalışır? {#how-maci-works-with-zk-proofs}

İlk olarak koordinatör MACI sözleşmesini Ethereum'a dağıtır, sonrasında kullanıcılar (açık anahtarlarıyla akıllı sözleşmeye kayıt olarak) oylama için üye olabilir. Kullanıcılar akıllı sözleşmeye herkese açık anahtarlarıyla şifrelenen (diğer kriterlere ek, geçerli bir oy kullanıcının kimliği ile ilişkili olan en güncel herkese açık anahtarla imzalanmış olmalıdır) mesajlar göndererek oy verirler. Sonrasında, koordinatör oylama süreci bittiğinde tüm mesajları işler, oyların çetelesini tutar ve sonuçları zincir üzerinde doğrular.

MACI'de sıfır bilgili ispatları koordinatörün hatalı biçimde oyları işlemesi ve sonuçların çetelesini tutmasını imkansızlaştırmak için hesaplamanın doğruluğundan emin olmak amaçlı sıfır bilgili ispatları kullanılır. Bunu başarmak koordinatörün a) tüm mesajların doğru işlendiğini b) sonucun tüm _geçerli_ oyların toplamına eşit olduğunu doğrulayan ZK-SNARK kanıtları oluşturmasını gerektirir.

Böylece, kullanıcı başına oy hakkında bir analiz paylaşmadan bile (normalde olduğu gibi), MACI çetele sürecinde hesaplanan sonuçların bütünlüğünü garantiler. Bu temel çakışma şemalarının etkisini düşürmek için kullanışlıdır. Bu ihtimali daha önceki Bob'un Alice'e bir seçeneğe oy vermesi için rüşvet vermesi örneğinden yola çıkarak keşfedebiliriz:

- Alice genel anahtarını akıllı sözleşmeye göndererek oy vermek üzere kaydolur.
- Alice, Bob'dan aldığı rüşvet karşılığında `B seçeneğini` oylamayı kabul eder.
- Alice `B seçeneğini` oylar.
- Alice gizlice, kimliğiyle eşleştirilmiş açık anahtarını değiştirmek için şifrelenmiş bir işlem gönderir.
- Alice akıllı sözleşmeye başka bir (şifrelenmiş) mesaj gönderir ve yeni açık anahtarını kullanarak ` A seçeneğini` oylar.
- Alice, Bob'a `seçenek B` için oyladığı işlemi gösterir (bu işlem Alice'in eski açık anahtarı artık Alice'le eşleşmediği için geçersizdir)
- Mesajları işleyen koordinatör Alice'in `B seçeneği` oyunu geçer ve `A seçeneği` oyunu hesaba katar. Bu nedenle Bob'un Alice ile gizli bir anlaşma yapma ve zincir üstü oyları etkileme girişimi başarısız olur.

MACI kullanmak koordinatöre rüşvetçilerle tezgah çevirmemesi veya oy veren kimselere rüşvet vermemesi için güven _gerektirir_. Koordinatör kullanıcı mesajlarını deşifre edebilir (kanıtı oluşturmak için gereklidir), yani her kişinin nasıl oy verdiğini isabetli bir şekilde doğrulayabilir.

Ancak koordinatörün dürüst olduğu durumlarda, MACI zincir üzerinde oylamaların doğruluğunu garantilemek için güçlü bir aracı temsil eder. Bu onun büyük miktarda her bir kişinin oy seçimlerinin bütünlüğüne dayanan ikinci dereceden finansman uygulamalar (ör. [clr.fund](https://clr.fund/#/about/maci)) arasındaki popülerliğini açıklar.

[MACI hakkında daha fazla bilgi edinin](https://privacy-scaling-explorations.github.io/maci/).

## Sıfır bilgili ispatlar nasıl çalışır? {#how-do-zero-knowledge-proofs-work}

Bir sıfır bilgili ispat, bir ifadenin doğruluğunu, ifadenin içeriğini veya doğruluğa nasıl ulaştığınızı açıklamadan kanıtlamanızı sağlar. Bunu mümkün kılmak için sıfır bilgi protokolleri, girdi olarak bazı verileri alan ve çıktı olarak "doğru" veya "yanlış" olarak döndüren algoritmalara dayanır.

Bir sıfır bilgi protokolü aşağıdaki kriterleri sağlamalıdır:

1. **Bütünlük**: Eğer girdi geçerliyse, sıfır bilgi protokolü daima "doğru" çıktısını döndürür. Dolayısıyla, esas ifade doğruysa, kanıtlayıcı ve doğrulayıcı dürüst davranırsa, kanıt kabul edilebilir.

2. **Sağlamlık**: Eğer girdi geçersizse, sıfır bilgi protokolünü "doğru" döndürmek için kandırmak teorik olarak imkansızdır. Bu nedenle, yalan söyleyen bir kanıtlayıcı, dürüst bir doğrulayıcıyı geçersiz bir ifadenin geçerli olduğuna inandırmak için kandıramaz (küçük bir olasılık marjı dışında).

3. **Sıfır-Bilgi**: Doğrulayıcı bir ifadenin geçerliliği ya da yanlışlığı ötesinde hiçbir şey öğrenmez (ifade hakkında "sıfır bilgiye" sahiptirler). Bu gereklilik ayrıca doğrulayıcının kanıttan orijinal girdiyi (ifadenin içeriklerini) türetmesini engeller.

Temel halde, bir sıfır bilgili ispat üç elementten oluşur: **tanık**, **zorluk** ve **yanıt**.

- **Tanık**: Bir sıfır bilgili ispat ile, kanıtlayıcı bazı gizli bilgiler hakkındaki bilgisini kanıtlamak ister. Gizli bilgi, kanıtın "tanığıdır" ve kanıtlayıcının tanık hakkındaki varsayılan bilgisi, sadece bilgi sahibi olan bir tarafın yanıtlayabileceği bir dizi soru oluşturur. Bu yüzden kanıtlayıcı kanıtlama sürecine rastgele bir soru seçerek, cevabını hesaplayarak ve cevabı doğrulayıcıya göndererek başlar.

- **Problem**: Doğrulayıcı kümeden rastgele başka bir soru seçer ve cevabı kanıtlayıcıya sorar.

- **Cevap**: Kanıtlayıcı soruyu kabul eder, cevabı hesaplar ve cevabı doğrulayıcıya geri gönderir. Kanıtlayıcının cevabı sayesinde doğrulayıcı, kanıtlayıcının gerçekten tanığa erişiminin olup olmadığını kontrol edebilir. Doğrulayıcı, kanıtlayıcının rastgele tahminlerde bulunmadığından ve doğru cevapları şans eseri vermediğinden emin olmak için daha fazla soru sorar. Bu etkileşimin pek çok kez tekrarlanması ile kanıtlayıcının tanık bilgilerini taklit etme olasılığı doğrulayıcı emin olana kadar önemli oranda azalır.

Yukarıdaki bilgiler "etkileşimli sıfır bilgi kanıtlarının" yapısını açıklamaktadır. Başlarda sıfır bilgi protokolleri etkileşimli kanıtlamayı kullanırdı. Bu yöntem ifadenin gerçekliğinin doğrulanması için kanıtlayıcı ve doğrulayıcılar arasında çift taraflı haberleşme gerektirirdi.

Etkileşimli kanıtların çalışma mantığını anlamak için Jacques Quisquater’ın ünlü [Ali Baba mağara hikâyesi](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) iyi bir örnektir. Bu hikâyede Peggy (kanıtlayıcı), Victor'a (doğrulayıcı) sihirli kapıyı açmak için gerekli gizli ifadeyi bildiğini bu kelimeyi söylemeden anlatmak ister.

### Etkileşimsiz sıfır bilgili ispatlar {#non-interactive-zero-knowledge-proofs}

Devrim niteliğinde olsa da etkileşimli kanıtlama, iki tarafın da müsait olmasını ve tekrar tekrar etkileşime girmesini gerektirdiğinden sınırlı bir kullanışlılığa sahipti. Doğrulayıcı kanıtlayıcının dürüstlüğünden emin olsa bile kanıt, bağımsız doğrulama için erişilebilir değildi (yeni bir kanıtın üretilmesi kanıtlayıcı ve doğrulayıcı arasında yeni bir dizi mesaj gerektiriyordu).

Bu problemi çözmek için Manuel Blum, Paul Feldman, ve Silvio Micali; kanıtlayıcı ve doğrulayıcının paylaşımlı bir anahtara sahip olduğu ilk [etkileşimli olmayan sıfır bilgili ispatlarını](https://dl.acm.org/doi/10.1145/62212.62222) önerdi. Bu öneri, kanıtlayıcının, bilginin kendisini sağlamadan (örneğin tanık) bilgiye sahip olduğunu göstermesini sağlar.

Etkileşimli kanıtların tersine, etkileşimsiz kanıtlar, taraflar (yani kanıtlayıcı ve doğrulayıcı) arasında yalnızca bir tur etkileşim gerektirir. Kanıtlayıcı, gizli bilgiyi özel bir algoritmadan geçirerek sıfır bilgili ispatı oluşturur. Bu kanıt doğrulayıcıya gönderilir ve doğrulayıcı başka bir algoritma kullanarak kanıtlayıcının gizli bilgiyi bilip bilmediğini kontrol eder.

Etkileşimsiz kanıtlama kanıtlayıcı ve doğrulayıcı arasındaki haberleşmeyi azaltarak sıfır bilgili ispatları daha verimli hale getirir. Ayrıca, kanıtlar oluşturulduktan sonra (paylaşımlı anahtara ve doğrulama algoritmasına sahip olan) herkesin doğrulamak üzere erişimine açık olur.

Etkileşimsiz kanıtlar sıfır bilgi teknolojisi için bir devrim niteliğindedir ve günümüzde kullanılan kanıt sistemlerinin gelişimini teşvik etmiştir. Bu kanıt türleri aşağıda tartışılmaktadır:

### Sıfır bilgili ispat türleri {#types-of-zero-knowledge-proofs}

#### SB-SNARK'ları {#zk-snarks}

ZK-SNARK, **Sıfır Bilgi Kısa ve Etkileşimsiz Bilgi Argümanları** için bir kısaltmadır. ZK-SNARK protokolü aşağıdaki özelliklere sahiptir:

- **Sıfır Bilgi**: Verilen ifadeyle ilgili hiçbir şeyi bilinmemesine rağmen ifadenin bütünlüğünü ilgili doğrulayabilmek veya onaylayabilmek. Onaylayıcının ifadeyle ilgili tek bilgisi ifadenin doğru veya yanlış olmasıdır.

- **Kısa ve Öz**: Sıfır bilgili ispat tanığa göre daha küçüktür ve hızlıca onaylanabilir.

- **Etkileşimsiz**: Kanıt "etkileşimsizdir" çünkü kanıtlayıcı ve doğrulayıcı, birden fazla kez iletişim gerektiren etkileşimli kanıtların aksine yalnızca bir kez etkileşime girer.

- **Argüman**: Kanıt "sağlamlık" şartını karşılamaktadır, bu nedenle hile yapılması son derece düşük bir ihtimaldir.

- **Bilgi**: Gizli bilgiye (tanık) erişim olmadan sıfır bilgili ispat oluşturulamaz. Tanığa sahip olmayan bir kanıtlayıcının geçerli bir sıfır bilgili ispat hesaplaması imkansız olmasa da zordur.

Daha önce de bahsedilen "paylaşımlı anahtar" kanıtlayıcının ve doğrulayıcının kanıtları oluşturmak ve doğrulamak için kullanmayı kabul ettiği genel parametreleri belirtir. Protokol güvenliğindeki önemden dolayı, genel parametrelerin (topluca Ortak Referans Dizisi (CRS) olarak bilinir) oluşturulması, hassas bir işlemdir. Eğer CRS'nin oluşturulmasında kullanılan entropi (rastgelelik) dürüst olmayan bir kanıtlayıcının eline geçerse, yanlış kanıtlar hesaplayabilir.

[Çok taraflı hesaplama (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) genel parametrelerin oluşturulmasındaki riskleri azaltmanın bir yoludur. Birden fazla taraf, CRS'yi oluşturmak için herkesin bazı rastgele değerlerde katkıda bulunduğu [güvenilir bir kurulum törenine](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) katılır. Bir dürüst taraf entropinin kendine düşenini yok ettiği sürece, ZK-SNARK protokolü hesaplama sağlamlığını kaybetmez.

Güvenilir kurulumlar, kullanıcıların parametre oluştumada katılımcılara güvenmesini gerektirir. Ancak, ZK-STARK'ların gelişmesi, güvenilir olmayan kurulum ile çalışan kanıtlama protokollerine olanak sağladı.

#### SB-STARK'ları {#zk-starks}

ZK-SNARK, **Sıfır Bilgi Ölçeklenebilir Şeffaf Bilgi Argümanları** için bir kısaltmadır. ZK-STARK'lar ZK-SNARK'lara benzerler, farkları ise şunlardır:

- **Ölçeklenebilir**: ZK-STARK, tanık boyutu büyüdüğünde kanıt üretme ve kanıt doğrulama konusunda ZK-SNARK'tan daha hızlıdır. STARK kanıtlarıyla, kanıtlayıcı ve doğrulama süreleri tanık büyüdükçe birazcık artar (SNARK kanıtlayıcı ve doğrulayıcı süreleri tanık boyutuyla doğrusal olarak artar).

- **Şeffaf**: ZK-STARK kanıtlama ve doğrulama için güvenilir kurulum yerine genel parametreler oluşturmak için herkes tarafından doğrulanabilir rastgeleliğe dayanır. Bu nedenle, ZK-SNARK'lara göre daha şeffaftırlar.

ZK-STARK'lar daha büyük kanıtlar ürettikleri için ZK-SNARK'lardan daha yüksek doğrulama ek yüklerine sahiptir. Ancak, ZK-STARK'lar bazı durumlarda (büyük veri kümelerinin kanıtlanması gibi) ZK-SNARK'lardan daha uygun maliyetli olabilir.

## Sıfır bilgili ispatları kullanmanın dezavantajları {#drawbacks-of-using-zero-knowledge-proofs}

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

## Daha fazla bilgi {#further-reading}

- [Sıfır bilgili ispatların kullanım alanlarına genel bakış](https://pse.dev/projects) — _Gizlilik ve Ölçeklendirme Keşif Ekibi_
- [SNARK'lar STARK'lar ve Tekrarlamalı SNARK'lar](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Genel Bakış_
- [Bir Sıfır Bilgili İspat: Blok Zincirde Gizliliği İyileştirmek](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK'lar - Gerçekçi Bir Sıfır Bilgi Örneği ve Derinlemesine İnceleme](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK'lar - Kuantum Bilgisayarlara Bile Karşı Doğrulanabilir Güven Oluşturmak](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) —_Adam Luciano_
- [zk-SNARK'ların nasıl mümkün olduğuna ilişkin yaklaşık bir giriş](https://vitalik.eth.limo/general/2021/01/26/snarks.html) - _Vitalik Buterin_
- [Sıfır Bilgili İspatlar (ZKP) Merkeziyetsiz Kimlikler Açısından Neden Çığır Açıcıdır?](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_

