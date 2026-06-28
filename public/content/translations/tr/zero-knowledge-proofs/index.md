---
title: Sıfır bilgi ispatları nedir?
metaTitle: Sıfır bilgi ispatları
description: Yeni başlayanlar için sıfır bilgi ispatlarına teknik olmayan bir giriş.
lang: tr
---

Bir sıfır bilgi ispatı, bir ifadenin geçerliliğini, ifadenin kendisini açığa çıkarmadan kanıtlamanın bir yoludur. 'Kanıtlayıcı', bir talebi kanıtlamaya çalışan taraftır, 'doğrulayıcı' ise talebi doğrulamaktan sorumludur.

Sıfır bilgi ispatları ilk olarak 1985 tarihli, günümüzde yaygın olarak kullanılan sıfır bilgi ispatlarının bir tanımını sunan "[Etkileşimli ispat sistemlerinin bilgi karmaşıklığı](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)" adlı makalede ortaya çıkmıştır:

> Bir sıfır bilgi protokolü, bir tarafın (kanıtlayıcı) diğer tarafa (doğrulayıcı) **bir şeyin doğru olduğunu, bu belirli ifadenin doğru olduğu gerçeği dışında hiçbir bilgiyi açığa çıkarmadan kanıtlayabildiği** bir yöntemdir.

Sıfır bilgi ispatları yıllar içinde gelişti ve artık çeşitli gerçek dünya uygulamalarında kullanılıyor.

<VideoWatch slug="zero-knowledge-proofs-5-levels" />

## Neden sıfır bilgi ispatlarına ihtiyacımız var? {#why-zero-knowledge-proofs-are-important}

Sıfır bilgi ispatları, bireyler için bilgi güvenliğini artırmayı vaat ettikleri için uygulamalı kriptografide bir dönüm noktasını temsil ediyordu. Bir talebi (örneğin, "X ülkesinin vatandaşıyım") başka bir tarafa (örneğin, bir hizmet sağlayıcıya) nasıl kanıtlayabileceğinizi düşünün. Talebinizi desteklemek için ulusal pasaport veya sürücü belgesi gibi "kanıtlar" sunmanız gerekir.

Ancak bu yaklaşımın, başta gizlilik eksikliği olmak üzere sorunları vardır. Üçüncü taraf hizmetlerle paylaşılan Kişisel Tanımlanabilir Bilgiler (PII), bilgisayar korsanlığına karşı savunmasız olan merkezi veritabanlarında saklanır. Kimlik hırsızlığının kritik bir sorun haline gelmesiyle birlikte, hassas bilgileri paylaşmanın daha fazla gizlilik koruyan yolları için çağrılar yapılmaktadır.

Sıfır bilgi ispatları, **taleplerin geçerliliğini kanıtlamak için bilgileri açığa çıkarma ihtiyacını ortadan kaldırarak** bu sorunu çözer. Sıfır bilgi protokolü, geçerliliğinin kısa ve öz bir kanıtını oluşturmak için ifadeyi (bir 'tanık' olarak adlandırılır) girdi olarak kullanır. Bu kanıt, bir ifadenin doğru olduğuna dair, onu oluştururken kullanılan bilgileri ifşa etmeden güçlü garantiler sağlar.

Önceki örneğimize dönecek olursak, vatandaşlık talebinizi kanıtlamak için ihtiyacınız olan tek kanıt bir sıfır bilgi ispatıdır. Doğrulayıcının, temel ifadenin de doğru olduğuna ikna olması için yalnızca kanıtın belirli özelliklerinin doğru olup olmadığını kontrol etmesi gerekir.

## Sıfır bilgi ispatları için kullanım durumları {#use-cases-for-zero-knowledge-proofs}

### Anonim ödemeler {#anonymous-payments}

Kredi kartı ödemeleri genellikle ödeme sağlayıcısı, bankalar ve diğer ilgili taraflar (örneğin, devlet yetkilileri) dahil olmak üzere birden fazla tarafça görülebilir. Finansal gözetimin yasa dışı faaliyetleri tespit etmek için faydaları olsa da, sıradan vatandaşların gizliliğini de zedeler.

Kripto paralar, kullanıcıların özel, eşler arası işlemler gerçekleştirmesi için bir araç sağlamayı amaçlıyordu. Ancak çoğu kripto para işlemi, halka açık blokzincirlerde açıkça görülebilir. Kullanıcı kimlikleri genellikle takma adlara dayanır ve ya isteyerek gerçek dünya kimlikleriyle bağlantılıdır (örneğin, Twitter veya GitHub profillerine ETH adresleri ekleyerek) ya da temel zincir içi ve zincir dışı veri analizi kullanılarak gerçek dünya kimlikleriyle ilişkilendirilebilir.

Tamamen anonim işlemler için tasarlanmış özel "gizlilik coinleri" vardır. Zcash ve Monero gibi gizlilik odaklı blokzincirler, gönderici/alıcı adresleri, varlık türü, miktar ve işlem zaman çizelgesi dahil olmak üzere işlem ayrıntılarını gizler.

Gizlilik odaklı [blokzincir](/glossary/#blockchain) ağları, sıfır bilgi teknolojisini protokole dahil ederek, [düğümlerin](/glossary/#node) işlem verilerine erişmeye gerek kalmadan işlemleri doğrulamasına olanak tanır. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503), [Ethereum](/) blokzincirinde yerel özel değer transferlerini mümkün kılacak önerilen bir tasarım örneğidir. Ancak bu tür önerilerin güvenlik, düzenleme ve kullanıcı deneyimi (UX) endişelerinin birleşimi nedeniyle uygulanması zordur.  

**Sıfır bilgi ispatları, halka açık blokzincirlerdeki işlemleri anonimleştirmek için de uygulanmaktadır**. Buna bir örnek, kullanıcıların Ethereum üzerinde özel işlemler gerçekleştirmesine olanak tanıyan merkeziyetsiz, gözetimsiz bir hizmet olan Tornado Cash'tir. Tornado Cash, işlem ayrıntılarını gizlemek ve finansal gizliliği garanti etmek için sıfır bilgi ispatlarını kullanır. Ne yazık ki, bunlar "isteğe bağlı" gizlilik araçları oldukları için yasa dışı faaliyetlerle ilişkilendirilmektedirler. Bunun üstesinden gelmek için, gizliliğin eninde sonunda halka açık blokzincirlerde varsayılan hale gelmesi gerekir. [Ethereum'da gizlilik](/privacy/) hakkında daha fazla bilgi edinin.

### Kimlik koruması {#identity-protection}

Mevcut kimlik yönetimi sistemleri kişisel bilgileri riske atmaktadır. Sıfır bilgi ispatları, bireylerin hassas ayrıntıları korurken kimliklerini doğrulamalarına yardımcı olabilir.

Sıfır bilgi ispatları, özellikle [merkeziyetsiz kimlik (DID)](/decentralized-identity/) bağlamında faydalıdır. Merkeziyetsiz kimlik (aynı zamanda 'kendi kendine egemen kimlik' olarak da tanımlanır), bireye kişisel tanımlayıcılara erişimi kontrol etme yeteneği verir. Vergi kimlik numaranızı veya pasaport bilgilerinizi ifşa etmeden vatandaşlığınızı kanıtlamak, sıfır bilgi teknolojisinin merkeziyetsiz kimliği nasıl mümkün kıldığına iyi bir örnektir.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      İş başında ZKP + Kimlik: Ethereum üzerinde Bhutan Ulusal Dijital Kimliği (NDI)
    </AlertTitle>
    <AlertDescription>
      <p>
        Kimlik yönetimi sistemleri için ZKP kullanımının gerçek dünyadaki bir örneği, Ethereum üzerine inşa edilen Bhutan Krallığı'nın Ulusal Dijital Kimlik (NDI) sistemidir. Bhutan'ın NDI'si, vatandaşların kimliklerindeki hassas kişisel verileri ifşa etmeden "Ben bir vatandaşım" veya "18 yaşından büyüğüm" gibi kendileri hakkındaki gerçekleri kriptografik olarak kanıtlamalarına olanak tanımak için ZKP'leri kullanır.
      </p>
      <p>
        <a href="/decentralized-identity/#national-and-government-id">Merkeziyetsiz Kimlik vaka çalışmasında</a> Bhutan NDI hakkında daha fazla bilgi edinin.
      </p>
    </AlertDescription>
  </AlertContent>
</Alert>

### İnsanlık Kanıtı {#proof-of-humanity}

Günümüzde iş başındaki sıfır bilgi ispatlarının en yaygın kullanılan örneklerinden biri, "Yapay zeka çağı için küresel bir dijital pasaport" olarak düşünülebilecek [World ID protokolüdür](https://world.org/blog/world/world-id-faqs). İnsanların kişisel bilgilerini ifşa etmeden benzersiz bireyler olduklarını kanıtlamalarına olanak tanır. Bu, bir kişinin irisini tarayan ve bir iris kodu oluşturan Orb adlı bir cihaz aracılığıyla gerçekleştirilir. İris kodu, kişinin biyolojik olarak benzersiz bir insan olduğunu doğrulamak için kontrol edilir ve onaylanır. Doğrulamadan sonra, kullanıcının cihazında oluşturulan (ve biyometrik verilere bağlı olmayan veya bunlardan türetilmeyen) bir kimlik taahhüdü blokzincirdeki güvenli bir listeye eklenir. Ardından, kullanıcı doğrulanmış bir insan olduğunu kanıtlamak istediğinde (ister oturum açmak, ister oy kullanmak veya başka eylemlerde bulunmak için olsun), listedeki üyeliğini onaylayan bir sıfır bilgi ispatı oluşturabilir. Sıfır bilgi ispatı kullanmanın güzelliği, yalnızca tek bir ifadenin ortaya çıkmasıdır: bu kişi benzersizdir. Diğer her şey gizli kalır.

World ID, Ethereum Vakfı'ndaki [PSE ekibi](https://pse.dev/) tarafından geliştirilen [Semaphore protokolüne](https://docs.semaphore.pse.dev/) dayanır. Semaphore, sıfır bilgi ispatları oluşturmak ve doğrulamak için hafif ancak güçlü bir yol olacak şekilde tasarlanmıştır. Kullanıcıların, grubun hangi üyesi olduklarını göstermeden bir grubun (bu durumda doğrulanmış insanlar) parçası olduklarını kanıtlamalarına olanak tanır. Semaphore ayrıca son derece esnektir ve kimlik doğrulama, olaylara katılım veya kimlik bilgilerinin sahipliği gibi çok çeşitli kriterlere dayalı olarak grupların oluşturulmasına olanak tanır.

### Kimlik doğrulama {#authentication}

Çevrim içi hizmetleri kullanmak, kimliğinizi ve bu platformlara erişim hakkınızı kanıtlamanızı gerektirir. Bu genellikle isimler, e-posta adresleri, doğum tarihleri vb. gibi kişisel bilgilerin sağlanmasını gerektirir. Ayrıca uzun şifreleri ezberlemeniz veya erişimi kaybetme riskini almanız gerekebilir.

Ancak sıfır bilgi ispatları, hem platformlar hem de kullanıcılar için kimlik doğrulamayı basitleştirebilir. Açık girdiler (örneğin, kullanıcının platforma üyeliğini kanıtlayan veriler) ve özel girdiler (örneğin, kullanıcının ayrıntıları) kullanılarak bir ZK ispatı oluşturulduktan sonra, kullanıcı hizmete erişmesi gerektiğinde kimliğini doğrulamak için bunu kolayca sunabilir. Bu, kullanıcılar için deneyimi iyileştirir ve kuruluşları büyük miktarda kullanıcı bilgisini depolama ihtiyacından kurtarır.

### Doğrulanabilir hesaplama {#verifiable-computation}

Doğrulanabilir hesaplama, blokzincir tasarımlarını iyileştirmek için sıfır bilgi teknolojisinin bir başka uygulamasıdır. Doğrulanabilir hesaplama, doğrulanabilir sonuçları korurken hesaplamayı başka bir varlığa dış kaynak olarak vermemize olanak tanır. Varlık, programın doğru bir şekilde yürütüldüğünü doğrulayan bir kanıtla birlikte sonucu sunar.

Doğrulanabilir hesaplama, güvenliği azaltmadan **blokzincirlerdeki işlem hızlarını artırmak için kritik öneme sahiptir**. Bunu anlamak, Ethereum'u ölçeklendirmek için önerilen çözümlerdeki farklılıkları bilmeyi gerektirir.

Parça zinciri (sharding) gibi [zincir içi ölçeklendirme çözümleri](/developers/docs/scaling/#onchain-scaling), blokzincirin temel katmanında kapsamlı değişiklikler gerektirir. Ancak bu yaklaşım oldukça karmaşıktır ve uygulamadaki hatalar Ethereum'un güvenlik modelini zayıflatabilir.

[Zincir dışı ölçeklendirme çözümleri](/developers/docs/scaling/#offchain-scaling), çekirdek Ethereum protokolünün yeniden tasarlanmasını gerektirmez. Bunun yerine, Ethereum'un temel katmanındaki işlem kapasitesini artırmak için dış kaynaklı bir hesaplama modeline güvenirler.

Pratikte şu şekilde çalışır:

- Ethereum, her işlemi işlemek yerine yürütmeyi ayrı bir zincire devreder.

- İşlemleri işledikten sonra diğer zincir, Ethereum'un durumuna uygulanacak sonuçları döndürür.

Buradaki fayda, Ethereum'un herhangi bir yürütme yapmasına gerek kalmaması ve yalnızca dış kaynaklı hesaplamadan elde edilen sonuçları kendi durumuna uygulaması gerekmesidir. Bu, ağ tıkanıklığını azaltır ve ayrıca işlem hızlarını artırır (zincir dışı protokoller daha hızlı yürütme için optimize edilmiştir).

Zincirin, zincir dışı işlemleri yeniden yürütmeden doğrulamanın bir yoluna ihtiyacı vardır, aksi takdirde zincir dışı yürütmenin değeri kaybolur.

İşte burada doğrulanabilir hesaplama devreye girer. Bir düğüm Ethereum dışında bir işlem yürüttüğünde, zincir dışı yürütmenin doğruluğunu kanıtlamak için bir sıfır bilgi ispatı sunar. Bu kanıt (bir [geçerlilik kanıtı](/glossary/#validity-proof) olarak adlandırılır), bir işlemin geçerli olduğunu garanti ederek Ethereum'un sonucu kendi durumuna uygulamasına olanak tanır; kimsenin buna itiraz etmesini beklemeden.

[Sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups) ve [validium'lar](/developers/docs/scaling/validium/), güvenli ölçeklenebilirlik sağlamak için geçerlilik kanıtlarını kullanan iki zincir dışı ölçeklendirme çözümüdür. Bu protokoller binlerce işlemi zincir dışı yürütür ve Ethereum'da doğrulama için kanıtlar sunar. Bu sonuçlar, kanıt doğrulandıktan hemen sonra uygulanabilir ve Ethereum'un temel katmandaki hesaplamayı artırmadan daha fazla işlemi işlemesine olanak tanır.

Katman 2 (L2) ölçeklendirmesinin ötesinde, sıfır bilgi ispatları Ethereum katman 1 (L1) blok yürütmesinin kendisini de doğrulayabilir. [L1 doğrulaması için zkEVM](/roadmap/zkevm/), doğrulayıcıların tüm işlemleri yeniden yürütmek yerine bir kanıtı kontrol ederek blokları doğrulamasına olanak tanır; bu da doğrulayıcı donanım gereksinimlerini artırmadan daha yüksek gaz limitlerine olanak tanır.

### Zincir içi oylamada rüşvet ve gizli anlaşmaların azaltılması {#secure-blockchain-voting}

Blokzincir oylama şemalarının birçok olumlu özelliği vardır: tamamen denetlenebilirler, saldırılara karşı güvenlidirler, sansüre karşı dirençlidirler ve coğrafi kısıtlamalardan muaftırlar. Ancak zincir içi oylama şemaları bile **gizli anlaşma** sorununa karşı bağışık değildir.

"Başkalarını aldatarak, dolandırarak ve yanıltarak açık rekabeti sınırlamak için koordine olmak" olarak tanımlanan gizli anlaşma, kötü niyetli bir aktörün rüşvet teklif ederek oylamayı etkilemesi şeklini alabilir. Örneğin Alice, `option A` seçeneğini tercih etse bile bir oylamada `option B` için oy kullanması karşılığında Bob'dan rüşvet alabilir.

Rüşvet ve gizli anlaşma, oylamayı bir sinyal mekanizması olarak kullanan herhangi bir sürecin etkinliğini sınırlar (özellikle kullanıcıların nasıl oy kullandıklarını kanıtlayabildikleri durumlarda). Bunun, özellikle oyların kıt kaynakların tahsis edilmesinden sorumlu olduğu durumlarda önemli sonuçları olabilir.

Örneğin, [karesel fonlama mekanizmaları](https://www.radicalxchange.org/wiki/plural-funding/), farklı kamu malı projeleri arasında belirli seçeneklere yönelik tercihi ölçmek için bağışlara güvenir. Her bağış, belirli bir proje için bir "oy" sayılır ve daha fazla oy alan projeler eşleştirme havuzundan daha fazla fon alır.

Zincir içi oylama kullanmak, karesel fonlamayı gizli anlaşmalara karşı duyarlı hale getirir: blokzincir işlemleri halka açıktır, bu nedenle rüşvet verenler, rüşvet alanın nasıl "oy kullandığını" görmek için zincir içi etkinliklerini inceleyebilir. Bu şekilde karesel fonlama, topluluğun toplu tercihlerine dayalı olarak fon tahsis etmek için etkili bir araç olmaktan çıkar.

Neyse ki, MACI (Minimum Anti-Collusion Infrastructure - Minimum Gizli Anlaşma Karşıtı Altyapı) gibi daha yeni çözümler, zincir içi oylamayı (örneğin, karesel fonlama mekanizmaları) rüşvet ve gizli anlaşmalara karşı dirençli hale getirmek için sıfır bilgi ispatlarını kullanıyor. MACI, merkezi bir yöneticinin ("koordinatör" olarak adlandırılır) her bir bireyin nasıl oy kullandığına dair ayrıntıları ifşa _etmeden_ oyları toplamasına ve sonuçları saymasına olanak tanıyan bir dizi akıllı sözleşme ve komut dosyasıdır. Buna rağmen, oyların düzgün bir şekilde sayıldığını doğrulamak veya belirli bir bireyin oylama turuna katıldığını onaylamak hala mümkündür.

#### MACI sıfır bilgi ispatlarıyla nasıl çalışır? {#how-maci-works-with-zk-proofs}

Başlangıçta koordinatör, MACI sözleşmesini Ethereum üzerinde dağıtır, ardından kullanıcılar (açık anahtarlarını akıllı sözleşmeye kaydederek) oylama için kaydolabilirler. Kullanıcılar, açık anahtarlarıyla şifrelenmiş mesajları akıllı sözleşmeye göndererek oy kullanırlar (geçerli bir oy, diğer kriterlerin yanı sıra kullanıcının kimliğiyle ilişkili en son açık anahtarla imzalanmalıdır). Daha sonra koordinatör, oylama süresi sona erdiğinde tüm mesajları işler, oyları sayar ve sonuçları zincir içi doğrular.

MACI'de sıfır bilgi ispatları, koordinatörün oyları yanlış işlemesini ve sonuçları saymasını imkansız hale getirerek hesaplamanın doğruluğunu sağlamak için kullanılır. Bu, koordinatörün a) tüm mesajların doğru işlendiğini b) nihai sonucun tüm _geçerli_ oyların toplamına karşılık geldiğini doğrulayan ZK-SNARK ispatları oluşturmasını gerektirerek elde edilir.

Böylece, kullanıcı başına oyların bir dökümünü paylaşmadan bile (genellikle olduğu gibi), MACI sayım işlemi sırasında hesaplanan sonuçların bütünlüğünü garanti eder. Bu özellik, temel gizli anlaşma şemalarının etkinliğini azaltmada faydalıdır. Bob'un bir seçeneğe oy vermesi için Alice'e rüşvet verdiği önceki örneği kullanarak bu olasılığı inceleyebiliriz:

- Alice, açık anahtarını bir akıllı sözleşmeye göndererek oy kullanmak için kaydolur.
- Alice, Bob'dan alacağı rüşvet karşılığında `option B` için oy kullanmayı kabul eder.
- Alice `option B` için oy kullanır.
- Alice, kimliğiyle ilişkili açık anahtarı değiştirmek için gizlice şifrelenmiş bir işlem gönderir.
- Alice, yeni açık anahtarı kullanarak `option A` için oy kullanan başka bir (şifrelenmiş) mesajı akıllı sözleşmeye gönderir.
- Alice, Bob'a `option B` için oy kullandığını gösteren bir işlem gösterir (açık anahtar artık sistemde Alice'in kimliğiyle ilişkili olmadığı için bu geçersizdir)
- Mesajları işlerken koordinatör, Alice'in `option B` için verdiği oyu atlar ve yalnızca `option A` için verilen oyu sayar. Böylece, Bob'un Alice ile gizli anlaşma yapma ve zincir içi oylamayı manipüle etme girişimi başarısız olur.

MACI kullanmak, koordinatörün rüşvet verenlerle gizli anlaşma yapmayacağına veya seçmenlere rüşvet vermeye çalışmayacağına güvenmeyi _gerektirir_. Koordinatör, kullanıcı mesajlarının şifresini çözebilir (kanıtı oluşturmak için gereklidir), böylece her kişinin nasıl oy kullandığını doğru bir şekilde doğrulayabilir.

Ancak koordinatörün dürüst kaldığı durumlarda MACI, zincir içi oylamanın kutsallığını garanti altına almak için güçlü bir aracı temsil eder. Bu, her bir bireyin oylama seçimlerinin bütünlüğüne büyük ölçüde dayanan karesel fonlama uygulamaları (örneğin, [clr.fund](https://clr.fund/#/about/maci)) arasındaki popülerliğini açıklamaktadır.

[MACI hakkında daha fazla bilgi edinin](https://maci.pse.dev/).

## Sıfır bilgi ispatları nasıl çalışır? {#how-do-zero-knowledge-proofs-work}

Bir sıfır bilgi ispatı, ifadenin içeriğini paylaşmadan veya gerçeği nasıl keşfettiğinizi açıklamadan bir ifadenin doğruluğunu kanıtlamanıza olanak tanır. Bunu mümkün kılmak için sıfır bilgi protokolleri, bazı verileri girdi olarak alan ve çıktı olarak 'doğru' veya 'yanlış' döndüren algoritmalara güvenir.

Bir sıfır bilgi protokolü aşağıdaki kriterleri karşılamalıdır:

1. **Eksiksizlik**: Girdi geçerliyse, sıfır bilgi protokolü her zaman 'doğru' döndürür. Dolayısıyla, temel ifade doğruysa ve kanıtlayıcı ile doğrulayıcı dürüst davranırsa, kanıt kabul edilebilir.

2. **Sağlamlık**: Girdi geçersizse, sıfır bilgi protokolünü 'doğru' döndürmesi için kandırmak teorik olarak imkansızdır. Dolayısıyla, yalan söyleyen bir kanıtlayıcı, dürüst bir doğrulayıcıyı geçersiz bir ifadenin geçerli olduğuna inandıramaz (çok küçük bir olasılık payı hariç).

3. **Sıfır bilgi**: Doğrulayıcı, bir ifade hakkında geçerliliği veya yanlışlığı dışında hiçbir şey öğrenmez (ifade hakkında "sıfır bilgiye" sahiptir). Bu gereklilik aynı zamanda doğrulayıcının orijinal girdiyi (ifadenin içeriğini) kanıttan türetmesini de engeller.

Temel biçimde, bir sıfır bilgi ispatı üç unsurdan oluşur: **tanık**, **meydan okuma** ve **yanıt**.

- **Tanık**: Bir sıfır bilgi ispatı ile kanıtlayıcı, bazı gizli bilgilerin bilgisini kanıtlamak ister. Gizli bilgi, kanıtın "tanığıdır" ve kanıtlayıcının tanık hakkındaki varsayılan bilgisi, yalnızca bilgiye sahip bir tarafça yanıtlanabilecek bir dizi soru oluşturur. Böylece kanıtlayıcı, rastgele bir soru seçerek, cevabı hesaplayarak ve doğrulayıcıya göndererek kanıtlama sürecini başlatır.

- **Meydan okuma**: Doğrulayıcı, setten rastgele başka bir soru seçer ve kanıtlayıcıdan bunu yanıtlamasını ister.

- **Yanıt**: Kanıtlayıcı soruyu kabul eder, cevabı hesaplar ve doğrulayıcıya döndürür. Kanıtlayıcının yanıtı, doğrulayıcının ilkinin gerçekten tanığa erişimi olup olmadığını kontrol etmesini sağlar. Kanıtlayıcının körü körüne tahmin etmediğinden ve doğru cevapları tesadüfen almadığından emin olmak için doğrulayıcı sorulacak daha fazla soru seçer. Bu etkileşimi birçok kez tekrarlayarak, kanıtlayıcının tanık bilgisini taklit etme olasılığı, doğrulayıcı tatmin olana kadar önemli ölçüde düşer.

Yukarıdakiler, 'etkileşimli bir sıfır bilgi ispatının' yapısını açıklamaktadır. Erken dönem sıfır bilgi protokolleri, bir ifadenin geçerliliğini doğrulamanın kanıtlayıcılar ve doğrulayıcılar arasında karşılıklı iletişim gerektirdiği etkileşimli kanıtlamayı kullanıyordu.

Etkileşimli ispatların nasıl çalıştığını gösteren iyi bir örnek, Jean-Jacques Quisquater'in ünlü [Ali Baba'nın mağarası hikayesidir](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave). Hikayede Peggy (kanıtlayıcı), Victor'a (doğrulayıcı) sihirli bir kapıyı açacak gizli ifadeyi bildiğini, ifadeyi açığa çıkarmadan kanıtlamak ister.

### Etkileşimsiz sıfır bilgi ispatları {#non-interactive-zero-knowledge-proofs}

Devrim niteliğinde olsa da, etkileşimli kanıtlama, iki tarafın da müsait olmasını ve tekrar tekrar etkileşime girmesini gerektirdiğinden sınırlı bir kullanışlılığa sahipti. Bir doğrulayıcı, bir kanıtlayıcının dürüstlüğüne ikna olsa bile, kanıt bağımsız doğrulama için kullanılamazdı (yeni bir kanıt hesaplamak, kanıtlayıcı ve doğrulayıcı arasında yeni bir mesaj seti gerekiyordu).

Bu sorunu çözmek için Manuel Blum, Paul Feldman ve Silvio Micali, kanıtlayıcı ve doğrulayıcının paylaşılan bir anahtara sahip olduğu ilk [etkileşimsiz sıfır bilgi ispatlarını](https://dl.acm.org/doi/10.1145/62212.62222) önerdiler. Bu, kanıtlayıcının bazı bilgiler (yani tanık) hakkındaki bilgisini, bilginin kendisini sağlamadan göstermesine olanak tanır.

Etkileşimli ispatların aksine, etkileşimsiz ispatlar katılımcılar (kanıtlayıcı ve doğrulayıcı) arasında yalnızca bir tur iletişim gerektiriyordu. Kanıtlayıcı, bir sıfır bilgi ispatı hesaplamak için gizli bilgiyi özel bir algoritmaya aktarır. Bu kanıt, başka bir algoritma kullanarak kanıtlayıcının gizli bilgiyi bildiğini kontrol eden doğrulayıcıya gönderilir.

Etkileşimsiz kanıtlama, kanıtlayıcı ve doğrulayıcı arasındaki iletişimi azaltarak ZK ispatlarını daha verimli hale getirir. Dahası, bir kanıt oluşturulduktan sonra, (paylaşılan anahtara ve doğrulama algoritmasına erişimi olan) herkesin doğrulaması için kullanılabilir.

Etkileşimsiz ispatlar, sıfır bilgi teknolojisi için bir dönüm noktasını temsil etti ve günümüzde kullanılan kanıtlama sistemlerinin gelişimini teşvik etti. Bu kanıt türlerini aşağıda tartışıyoruz:

### Sıfır bilgi ispatı türleri {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK, **Sıfır Bilgi Özlü Etkileşimsiz Bilgi Argümanı (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge)** kelimelerinin kısaltmasıdır. ZK-SNARK protokolü aşağıdaki niteliklere sahiptir:

- **Sıfır bilgi**: Bir doğrulayıcı, ifade hakkında başka hiçbir şey bilmeden bir ifadenin bütünlüğünü doğrulayabilir. Doğrulayıcının ifade hakkında sahip olduğu tek bilgi, doğru mu yoksa yanlış mı olduğudur.

- **Özlü**: Sıfır bilgi ispatı tanıktan daha küçüktür ve hızlı bir şekilde doğrulanabilir.

- **Etkileşimsiz**: Kanıt 'etkileşimsizdir' çünkü kanıtlayıcı ve doğrulayıcı, birden fazla iletişim turu gerektiren etkileşimli ispatların aksine yalnızca bir kez etkileşime girer.

- **Argüman**: Kanıt 'sağlamlık' gereksinimini karşılar, bu nedenle hile yapmak son derece olası değildir.

- **Bilgi**: Sıfır bilgi ispatı, gizli bilgiye (tanık) erişim olmadan oluşturulamaz. Tanığa sahip olmayan bir kanıtlayıcının geçerli bir sıfır bilgi ispatı hesaplaması imkansız olmasa da zordur.

Daha önce bahsedilen 'paylaşılan anahtar', kanıtlayıcı ve doğrulayıcının kanıt oluşturma ve doğrulamada kullanmayı kabul ettiği açık parametreleri ifade eder. Açık parametrelerin (topluca Ortak Referans Dizisi (CRS) olarak bilinir) oluşturulması, protokolün güvenliğindeki önemi nedeniyle hassas bir işlemdir. CRS'yi oluştururken kullanılan entropi (rastgelelik) dürüst olmayan bir kanıtlayıcının eline geçerse, sahte kanıtlar hesaplayabilirler.

[Çok taraflı hesaplama (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation), açık parametreler oluşturmadaki riskleri azaltmanın bir yoludur. Birden fazla taraf, her kişinin CRS'yi oluşturmak için bazı rastgele değerlere katkıda bulunduğu bir [güvenilir kurulum törenine](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) katılır. Dürüst bir taraf entropideki kendi payını yok ettiği sürece, ZK-SNARK protokolü hesaplama sağlamlığını korur.

Güvenilir kurulumlar, kullanıcıların parametre oluşturmadaki katılımcılara güvenmesini gerektirir. Ancak ZK-STARK'ların geliştirilmesi, güvenilir olmayan bir kurulumla çalışan kanıtlama protokollerini mümkün kılmıştır.

#### ZK-STARKs {#zk-starks}

ZK-STARK, **Sıfır Bilgi Ölçeklenebilir Şeffaf Bilgi Argümanı (Zero-Knowledge Scalable Transparent Argument of Knowledge)** kelimelerinin kısaltmasıdır. ZK-STARK'lar, aşağıdakiler dışında ZK-SNARK'lara benzer:

- **Ölçeklenebilir**: ZK-STARK, tanığın boyutu daha büyük olduğunda kanıt oluşturma ve doğrulamada ZK-SNARK'tan daha hızlıdır. STARK ispatları ile, tanık büyüdükçe kanıtlayıcı ve doğrulama süreleri yalnızca biraz artar (SNARK kanıtlayıcı ve doğrulayıcı süreleri tanık boyutuyla doğrusal olarak artar).

- **Şeffaf**: ZK-STARK, güvenilir bir kurulum yerine kanıtlama ve doğrulama için açık parametreler oluşturmak üzere halka açık olarak doğrulanabilir rastgeleliğe güvenir. Bu nedenle, ZK-SNARK'lara kıyasla daha şeffaftırlar.

ZK-STARK'lar ZK-SNARK'lardan daha büyük kanıtlar üretir, bu da genellikle daha yüksek doğrulama ek yüklerine sahip oldukları anlamına gelir. Ancak, ZK-STARK'ların ZK-SNARK'lardan daha uygun maliyetli olabileceği durumlar (büyük veri kümelerini kanıtlamak gibi) vardır.

## Sıfır bilgi ispatlarını kullanmanın dezavantajları {#drawbacks-of-using-zero-knowledge-proofs}

### Donanım maliyetleri {#hardware-costs}

Sıfır bilgi ispatları oluşturmak, en iyi özel makinelerde gerçekleştirilen çok karmaşık hesaplamaları içerir. Bu makineler pahalı olduğundan, genellikle sıradan bireylerin ulaşamayacağı yerlerdedir. Ek olarak, sıfır bilgi teknolojisini kullanmak isteyen uygulamalar, son kullanıcılar için maliyetleri artırabilecek donanım maliyetlerini hesaba katmalıdır.

### Kanıt doğrulama maliyetleri {#proof-verification-costs}

Kanıtları doğrulamak da karmaşık hesaplamalar gerektirir ve uygulamalarda sıfır bilgi teknolojisini uygulamanın maliyetlerini artırır. Bu maliyet, özellikle hesaplamayı kanıtlama bağlamında geçerlidir. Örneğin, ZK toplamaları Ethereum'da tek bir ZK-SNARK ispatını doğrulamak için ~ 500.000 gaz öderken, ZK-STARK'lar daha da yüksek ücretler gerektirir.

### Güven varsayımları {#trust-assumptions}

ZK-SNARK'ta Ortak Referans Dizisi (açık parametreler) bir kez oluşturulur ve sıfır bilgi protokolüne katılmak isteyen tarafların yeniden kullanımı için mevcuttur. Açık parametreler, katılımcıların dürüst olduğunun varsayıldığı güvenilir bir kurulum töreni aracılığıyla oluşturulur.

Ancak kullanıcıların katılımcıların dürüstlüğünü değerlendirmesinin gerçekten bir yolu yoktur ve kullanıcılar geliştiricilerin sözüne güvenmek zorundadır. ZK-STARK'lar, diziyi oluştururken kullanılan rastgelelik halka açık olarak doğrulanabildiği için güven varsayımlarından muaftır. Bu arada araştırmacılar, kanıtlama mekanizmalarının güvenliğini artırmak için ZK-SNARK'lar için güvenilir olmayan kurulumlar üzerinde çalışıyorlar.

### Kuantum hesaplama tehditleri {#quantum-computing-threats}

ZK-SNARK, şifreleme için eliptik eğri kriptografisini kullanır. Eliptik eğri ayrık logaritma probleminin şimdilik çözülemez olduğu varsayılsa da, kuantum bilgisayarların gelişimi gelecekte bu güvenlik modelini kırabilir.

ZK-STARK, güvenliği için yalnızca çarpışmaya dayanıklı hash fonksiyonlarına dayandığından kuantum hesaplama tehdidine karşı bağışık kabul edilir. Eliptik eğri kriptografisinde kullanılan açık-özel anahtar eşleşmelerinin aksine, çarpışmaya dayanıklı hashlemenin kuantum hesaplama algoritmaları tarafından kırılması daha zordur.

## Daha fazla bilgi {#further-reading}

- [Sıfır bilgi ispatları için kullanım durumlarına genel bakış](https://pse.dev/projects) — _Gizlilik ve Ölçeklendirme Keşifleri Ekibi_
- [SNARK'lar, STARK'lar ve Özyineli SNARK'lar](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Bir Sıfır Bilgi İspatı: Bir Blokzincirde Gizliliği İyileştirmek](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK'lar — Gerçekçi Bir Sıfır Bilgi Örneği ve Derinlemesine İnceleme](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK'lar — Kuantum Bilgisayarlara Karşı Bile Doğrulanabilir Güven Yaratın](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [zk-SNARK'ların nasıl mümkün olduğuna dair yaklaşık bir giriş](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Sıfır Bilgi İspatları (ZKP'ler) Kendi Kendine Egemen Kimlik İçin Neden Oyun Değiştiricidir?](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [EIP-7503 Açıklandı: ZK İspatları ile Ethereum'da Özel Transferleri Etkinleştirmek](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [ZK Kart Oyunu: ZK temellerini ve gerçek hayattaki kullanım durumlarını öğrenmek için oyun](https://github.com/ZK-card/zk-cards) - _ZK-Cards_