---
title: "Ethereum için gizlilik yol haritası"
description: "Ethereum, işlem gizliliğini koruyan, kullanıcı veri erişimini güvence altına alan ve doğrulanabilir ancak gizli kimliğe olanak tanıyan güncellemeler aracılığıyla gizliliği ağın birinci sınıf bir özelliği haline getirmek için çalışıyor."
lang: tr
image: /images/roadmap/roadmap-security.png
alt: "Ethereum yol haritası"
template: roadmap
---

**Ethereum'da gizlilik, isteğe bağlı bir eklenti olmaktan çıkıp ağ düzeyinde bir varsayılan haline geliyor.** Ethereum'un önerilen gizlilik yol haritaları, günümüzde kullanıcı verilerinin sızabileceği belirli savunmasız bağlantı noktalarını hedefliyor. Ekosistem genelindeki araştırmalar, Ethereum'u gizliliğin isteğe bağlı olmaktan ziyade yapısal olduğu bir platform haline getirmeyi amaçlıyor.

Ethereum Vakfı'ndaki araştırmacılar, ekosistemin dağıtık araştırmalarından [üç temel yol haritası önceliğini bir araya getirdi](https://pse.dev/blog/pse-roadmap-2025):

- **Gizli okumalar** - bir kullanıcının hangi adreslere, sözleşmelere veya verilere eriştiğini ifşa etmeden Ethereum'u sorgulayın ve tarayın. Okumaları korumak, daha bir işlem imzalanmadan verilerin toplanmasını engeller.
- **Gizli yazmalar** - bellek havuzuna dahil edilmekten nihai uzlaşmaya kadar sansüre ve meta veri sızıntısına dirençli işlemler gönderin. Yazmaları korumak, gizli işlemlerin sansürlenmemesini veya kökenleriyle ilişkilendirilmemesini sağlar.
- **Gizli kanıtlama** - verimli sıfır bilgi ispatları kullanarak temel kişisel bilgileri ifşa etmeden kimliği, uygunluğu veya verileri doğrulayın. Gizli kanıtlama, kullanıcıların yalnızca gerekli olan asgari bilgiyi ifşa etmeyi seçerek (seçici ifşa) ağa katılmalarına olanak tanır.

Birlikte, bu üç alan uçtan uca bir gizlilik modeli oluşturur. Amaç, Ethereum'un bireylerin ve kurumların onaylanmamış veri toplama, gözetim veya merkezi sansür olmadan küresel olarak etkileşime girebileceği, koordine olabileceği ve işlem yapabileceği bir platform olmasını sağlayan **hesaplamalı egemenliktir**.

**Gizlilik neden önemlidir?** Gizlilik, çevrim içi gizliliğinizi nasıl koruyacağınız ve bugün Ethereum'da gizliliğinizi koruma hakkında bilgi edinin.

<ButtonLink variant="outline" href="/privacy/">Gizlilik hakkında daha fazlası</ButtonLink>

## Gizli okumalar kullanıcı sorgularını ve erişim verilerini korur {#private-reads}

Bir işlem imzalanmadan önce, kullanıcının blokzincirden veri okuması gerekir. Bir bakiyeyi kontrol etmek, gaz tahmini yapmak veya bir akıllı sözleşmenin durumunu doğrulamak için cüzdan yazılımı bir düğüm sağlayıcısına sorgular gönderir. Bu standart **Uzaktan Yordam Çağrısı (RPC)** sorguları muazzam miktarda meta veri açığa çıkarır.

Düğüm sağlayıcısı, kullanıcının IP adresini, cihaz parmak izini, sorgulanan belirli adresleri ve etkinliklerinin zamanlamasını ve sıklığını görebilir. Kullanıcı daha sonra gizli bir işlem gönderse bile, altyapı sağlayıcısı niyetlerinin ayrıntılı bir haritasına zaten erişime sahiptir.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

Erişim katmanındaki meta veri sızıntısı, tüm blokzincir sistemlerindeki en kalıcı gizlilik sorunlarından biridir. Ethereum, meta veri sızıntısını köken gizliliği (kimin sorduğunu gizleme), içerik gizliliği (ne sorulduğunu gizleme) ve döndürülen bilginin doğruluğunu teyit etme yoluyla ele almayı amaçlamaktadır.

**Köken gizliliği**, veriyi talep eden varlığı gizlemek için [anonim RPC](https://privreads.ethereum.foundation/feed/anon-rpc/) ve anonim ağ çözümlerini kullanır, **içerik gizliliği**, sorgulanan veriyi gizlemek için gizli bilgi erişimi ve [farkında olmayan RAM (oblivious RAM)](https://en.wikipedia.org/wiki/Oblivious_RAM) gibi taktikler kullanırken, **doğruluk teyidi**, döndürülen verinin doğru olduğunu kanıtlamak için hafif istemcileri kullanır.

İçerik gizliliğinin arkasındaki kriptografik yapı taşı, bir istemcinin bir veritabanını sorgulamasına ve sunucuya hangi öğeye erişildiğini ifşa etmeden belirli bir bilgi parçasını almasına olanak tanıyan kriptografik bir teknik olan [**Gizli Bilgi Erişimi'dir (PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval). Sunucu talebi körü körüne işler ve yalnızca sorgulayan cüzdanın şifresini çözebileceği şifrelenmiş bir yanıt döndürür.

PIR, cüzdan yazılımı ile düğüm sağlayıcıları arasında yer alarak erişim katmanında çalışır. PIR uygulamaları olgunlaştıkça, cüzdan yazılım geliştirme kitlerine (SDK'lar) ve altyapı sağlayıcılarına entegre edilecek ve kullanıcıların etkinliklerini merkezi aracılara ifşa etmeden ağı sorgulamalarına olanak tanıyacaktır.

Gizli okumalar ayrıca önden koşma ve işlem sıralama saldırılarına maruz kalmayı da azaltır. Bir altyapı sağlayıcısı, bir kullanıcının hangi akıllı sözleşmeyi veya adresi sorguladığını göremezse, bu bilgiyi zincir içi etkinliği öngörerek kâr elde eden aktörlere satamaz.

## Gizli yazmalar sansürü ve işlem sızıntısını önler {#private-writes}

Bir işlem gönderildikten sonra, zincir içi kaydedilmeden önce onu gözlemleyebilecek veya engelleyebilecek ağ altyapısından geçer. Birçok gizlilik protokolünün pratikte başarısız olduğu yer burasıdır. Büyük, merkezi blok oluşturucular bellek havuzunu izler ve gizlilik araçlarından kaynaklanan işlemleri sessizce kenara itebilir veya sansürleyebilir. Temeldeki kriptografi sağlam olsa bile, bir bloka asla dahil edilmeyen bir işlem hiçbir koruma sağlamaz.

İki protokol düzeyindeki güncelleme bu sorunu birlikte ele almaktadır:

[**EIP-8141 (Çerçeve İşlemleri)**](https://eips.ethereum.org/EIPS/eip-8141), işlemleri imza doğrulaması ve ücret yetkilendirmesi ile asıl işlem talimatları için bölümlere ayıran yeni bir işlem türü sunar. Çerçeve işlemleri, [akıllı hesapların](/roadmap/account-abstraction/) kendi imza şemalarını tanımlamasına ve gaz ücretlerini karşılamak için harici sözleşmeler kullanmasına olanak tanır. Bellek havuzundaki katı korumalı alan (sandboxing) kuralları, bu işlemlerin ağı hizmet reddi (DoS) saldırılarına açmasını engeller.

Çerçeve işlemleri, yaklaşan [Glamsterdam güncellemesinden](/roadmap/glamsterdam/) sonraki ağ güncellemesi olan Ethereum'un [Hegotá güncellemesi](https://forkcast.org/upgrade/hegota/) için değerlendirilmektedir. Aynı güncelleme, tam kuantum sonrası ağ geçişi tamamlanmadan önce akıllı hesapların [kuantum güvenli imzaları](/roadmap/security/quantum-resistance/) benimsemesine de olanak tanıyacaktır.

<ExpandableCard title="Çerçeve işlemleri (EIP-8141) gizliliği nasıl sağlar?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

Çerçeve işlemleri, hesapların kendi imza doğrulama yöntemlerini seçmelerine olanak tanır. Gizlilik açısından bu, kullanıcıların büyük ölçekli, ağ çapında bir geçişi beklemeden gizliliği koruyan imza şemalarını benimseyebilecekleri anlamına gelir. Çerçeve işlemleri ayrıca gaz ücreti soyutlamasına da izin vererek, gizlilik araçlarının kullanıcı adreslerini zincir içi ifşa etmeden işlem maliyetlerini karşılamasına olanak tanır.

</ExpandableCard>

[**EIP-7805 (Çatallanma Seçimi Zorunlu Dahil Etme Listeleri veya FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805), gizli yazmalar için yaptırım mekanizması sağlar. Blok teklifçilerinin, mutabakat kuralları gereği, birden fazla kaynaktan işlem toplayan birleştirilmiş yerel dahil etme listelerindeki işlemleri bloklarına dahil etmeleri gerekir. Bir blok oluşturucu, dahil etme listelerinde görünen bir işlemi sansürlemeye çalışırsa, onaylayan düğümler önerilen bloku tamamen reddeder. FOCIL şu anda [Hegotá güncellemesi](https://forkcast.org/upgrade/hegota/) için değerlendirilmektedir.

Çerçeve işlemleri, kullanıcılara özel imza şemalarıyla gizliliği koruyan işlemler oluşturma esnekliği sağlarken, FOCIL bu işlemlerin bellek havuzuna girdikten sonra seçici olarak sansürlenememesini sağlar. Birlikte iki farklı başarısızlık noktasını ele alırlar: Biri gizli işlemlerin formatını mümkün kılar, diğeri ise bunların dahil edilmesini garanti eder. Hiçbir merkezi aktör geçerli bir gizli transferi engelleyemez.

<VideoWatch slug="eip-7805-focil-explained" />

Kullanıcı gizliliği için ikinci bir savunmasız nokta, Ethereum'un sıralı nonce sistemi olarak adlandırılan işlemlerin sırasını nasıl takip ettiğidir. Standart Ethereum hesap modelinde, her hesap tek ve doğrusal olarak artan bir sayaç kullanır. Bir gizli işlem bellek havuzunda gecikirse, o hesaptan gelen sonraki tüm işlemler onun arkasında takılı kalır. Nonce dizisi ayrıca ağ gözlemcilerinin birden fazla işlemi aynı kaynak hesapla ilişkilendirmesine izin vererek gizliliği zayıflatır.

Şu anda Hegotá için değerlendirilen [**EIP-8250 (Çerçeve İşlemleri için Anahtarlı Nonce'lar)**](https://eips.ethereum.org/EIPS/eip-8250), tek bir hesabın aynı anda birden fazla paralel işlem dizisini yönetmesine izin vererek bu sorunu çözer. Kullanıcılar aynı anda farklı bağlamlarda birçok gizli işlemi yürütebilir ve gözlemciler artık farklı etkinlikleri aynı ana hesapla güvenilir bir şekilde ilişkilendiremez.

### Gizli ödemeler ve değer transferi {#private-payments}

İşlem yönlendirme ve nonce yönetiminin ötesinde, yazmaları korumak, bir transfere dahil olan kimlikleri ve varlıkları gizlemeyi gerektirir. Bir kullanıcı gizli bir şekilde sorgulama yapsa ve bir işlemi sansürsüz olarak yayınlasa bile, zincir içi kaydedilen işlem verileri herkese açık olarak görünür kalır. Kimin kime ne kadar gönderdiğini herkes görebilir ve zincir analiz firmaları bu verileri süresiz olarak kalıcı olan aranabilir profillerde birleştirir.

Hegotá güncellemesi için önerilen [**EIP-8182 (Gizli ETH ve ERC-20 Transferleri)**](https://eips.ethereum.org/EIPS/eip-8182), ETH ve ERC-20 transferleri için doğrudan Ethereum protokolüne yerel, paylaşılan korumalı bir havuz sunar. Gizlilik havuzları, yatırma ve çekim arasındaki bağlantıyı koparmak için kriptografik karıştırma kullanır, ancak bugün yalnızca gizlilik uygulamaları, cüzdanlar ve katman 2 (l2) ağları aracılığıyla kullanılabilir.

Tarihsel olarak, uygulama düzeyindeki gizlilik çözümleri likiditeyi parçalamış ve düşük anonimlik kümelerinden muzdarip olmuştur. EIP-8182, korumalı transferleri protokol düzeyinde birleştirerek, kullanıcıların özel cüzdan mimarileri gerektirmeden veya parçalanmış, isteğe bağlı uygulamalarla etkileşime girmeden gizli teslimat anahtarları aracılığıyla fonları yönlendirmelerine olanak tanır.

İşlem gizliliği için geliştirilen diğer araştırma yaklaşımları, kullanıcıların gerçek değerleri ifşa etmeden işlem tutarlarının geçerli olduğunu göstermelerine olanak tanıyan ispatları (bulletproofs ve aralık ispatları gibi) içerir. **Gizli işlemler** üzerine yapılan araştırmalar, ağın hiçbir değerin yaratılmadığını veya yok edilmediğini doğrulamasına izin verirken tutarları gizlemeyi amaçlamaktadır.

Bu ödeme katmanı çözümleri, bu bölümün başlarında açıklanan altyapı üzerine inşa edilmiştir. PIR hazırlık aşamasını korur, çerçeve işlemleri ve FOCIL gizli ödemelerin sansürsüz bir şekilde bellek havuzuna ulaşmasını sağlar ve zkVM'ler ağ güvenlik garantilerini korurken değer gizleme için gereken karmaşık kriptografiyi mümkün kılar.

## Gizli kanıtlama ve kimlik koruması {#private-proving}

Gizlilik, tamamen saklanmakla ilgili değildir. Bu, **seçici ifşa** veya hangi bilgilerin, kime ve hangi şartlarda ifşa edileceğini seçmekle ilgilidir. Ethereum, bir tarafın temel verileri ifşa etmeden bir ifadenin doğru olduğunu kanıtlamasına olanak tanıyan [**sıfır bilgi ispatları (ZKP'ler)**](/zero-knowledge-proofs/) aracılığıyla seçici ifşayı destekler. Örneğin, pasaport ayrıntılarını ifşa etmeden vatandaşlığı kanıtlamak veya kesin bir doğum tarihi ifşa etmeden bir yaş sınırını kanıtlamak.

Gizli kanıtlama, protokol düzeyinde verileri açığa çıkarmadan doğrulanabilir kimliği mümkün kılarak gizlilik yol haritasına bağlanır. Gizli okumalar ve yazmalar işlem meta verilerini korurken, gizli kanıtlama, gerçek dünyadaki katılım için gereken kimlik ve uygunluk kontrollerinin kişisel verilerin merkezi doğrulama sistemlerine teslim edilmesini gerektirmemesini sağlar.

Ethereum'un gizlilik yol haritasında gizli kanıtlama, biri protokol düzeyinde gizli hesaplamayı mümkün kılmak için yürütme katmanında ve diğeri tüketici cihazlarında gizli hesaplamayı pratik hale getiren erişim katmanında olmak üzere tamamlayıcı altyapı yollarıyla desteklenir.

**Sıfır bilgi sanal makineleri (zkVM'ler)**, akıllı sözleşmelerin mantıklarını çalıştırmalarına ve işin doğru yapıldığına dair kriptografik bir ispat oluşturmalarına olanak tanır. Bu ispat gerçekten sıfır bilgi olduğunda, girdiler, ara durum veya çıktılar hakkında hiçbir şey ifşa etmez ve ağ düzeyinde gizli hesaplamanın kilidini açar.

"zkVM" adı bir nüans taşır; bugün zkVM olarak adlandırılan çoğu sistem sıfır bilgiden ziyade özdür (succinct). İspatları küçüktür ve doğrulanması hızlıdır, ancak bunları oluşturmak için kullanılan verileri gizlemeleri gerekmez. Bugün, yalnızca bir avuç kanıtlama sistemi gizlilik uygulamalarının dayandığı gizleme özelliğini sağlamaktadır. [İstemci Tarafı Kanıtlama kıyaslamaları](https://ethproofs.org/csp-benchmarks), hangi zkVM'lerin sistem özelliklerinde gerçek sıfır bilgi için analiz edildiğini izler. Bu boşluğu kapatmak, yol haritasının gizli kanıtlama çalışmasının bir parçasıdır.

Çerçeve işlemleri (EIP-8141) ayrıca zkVM'lerin uygulanmasıyla da bağlantılıdır. İspatla doğrulanmış durum geçişlerini sunmak için özel doğrulama şemaları kullanabilirler; bu da uygulamaların gizli yürütme ortamları sunmasına ve işlemin doğru yapıldığına dair kriptografik ispatı, işlem verilerinin kendisini ifşa etmeden halka açık Ethereum ağına sunmasına olanak tanır.

Sıfır bilgi ispatları, bireylerin verilerini gizli tutarken geçerli olduğunu kanıtlamalarına olanak tanımak için mükemmeldir, ancak birden fazla kullanıcının aynı anda paylaşılan bir gizli veri havuzuyla etkileşime girmesi gereken akıllı sözleşmeleri kolayca yönetemezler.

Bu boşluğu kapatmak için Ethereum'un yol haritası **Tam Homomorfik Şifreleme'yi (FHE)** içerir. FHE, akıllı sözleşmelerin temel bilgilerin şifresini çözmek veya ifşa etmek zorunda kalmadan doğrudan şifrelenmiş veriler üzerinde hesaplamalar yapmasına olanak tanır. FHE yapı taşlarını ve özel kriptografik yardımcı işlemcileri Ethereum'a entegre etmek, gizli otomatik piyasa yapıcılar (AMM'ler), gizli borç verme havuzları veya herkesin girdilerinin tamamen gizli kalırken etkileşime girmesi gereken kapalı zarf usulü müzayedeler gibi paylaşılan bir "gizli duruma" dayanan merkeziyetsiz uygulamalar için çok önemlidir.

**İstemci tarafı kanıtlama**, bu gizlilik ispatlarını oluşturmayı günlük cihazlarda pratik hale getirir. İstemci Tarafı Kanıtlama projesi, tüketici donanımındaki kanıtlama sistemlerini ve zkVM'leri karşılaştıran halka açık bir kıyaslama paketi tutar ve sonuçları [ethproofs.org](https://ethproofs.org) adresinde yayınlar. Teknik araştırma, doğrudan zincir içi doğrulama ile şeffaf, [kuantum sonrası](/roadmap/security/quantum-resistance/) ispatları hedefleyerek gizli hesaplamayı daha hızlı, doğrudan Ethereum ağında doğrulanmasını daha kolay ve mobil cihazlarda uygulanabilir hale getirmeyi amaçlamaktadır.

[**zkID girişimi**](https://pse.dev/projects/zk-id), Avrupa Dijital Kimlik (EUDI) cüzdanı da dahil olmak üzere küresel kimlik çerçeveleriyle uyumlu açık kaynaklı altyapı üretmiştir. Açık Anonim Kimlik Bilgileri (OpenAC) sistemi, verilen kimlik bilgileri için bağlantısızlık sağlayarak, aynı kullanıcı tarafından farklı platformlarda oluşturulan birden fazla ispatın tek bir profille ilişkilendirilememesini sağlar.

Yönetişim alanında, [**Minimal Gizli Anlaşma Önleme Altyapısı (MACI)**](https://maci.pse.dev/) protokolü **makbuzsuzluk** sağlayarak, bir hesabın nasıl oy kullandığını kanıtlamayı kriptografik olarak imkansız hale getirir. Seçmenler tercihlerini gösteren bir makbuz üretemedikleri için, oy satın alma ve baskı ekonomik teşvikini kaybeder. MACI, Ethereum kamusal malları için karesel fonlamada milyonlarca dolar dağıtan [clr.fund](https://clr.fund/) aracılığıyla 2020'den bu yana gerçek dünyadaki fonlama kararlarını güvence altına almıştır.

Gizliliği koruyan oylama, yüksek riskli ortamlarda gerçek seçmenleri halihazırda korumaktadır. [Rarimo'nun Özgürlük Aracı (Freedom Tool)](https://docs.rarimo.com/freedom-tool/), vatandaşların kim olduklarını ifşa etmeden oy kullanmaya uygun olduklarını kanıtlamalarına izin vermek için sıfır bilgi pasaport doğrulaması kullanır. Seçmen güvenliğinin kriptografik oy gizliliğine bağlı olduğu Rusya ([Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a) muhalefet oylaması), Gürcistan (United Space anket uygulaması) ve İran (Iranians Vote projesi) gibi ülkelerde anonim gölge seçimlere ve muhalefet anketlerine güç vermiştir.

Gizli kanıtlama ayrıca **uyumluluk bilincine sahip gizliliği** de mümkün kılar. Gizlilik havuzları gibi gizlilik çözümleri, yatırma işlemlerini serbestçe kabul eder, ancak kullanıcıların çekim yapmadan önce fonlarının bilinen kötü niyetli adreslerle kesişmediğine dair sıfır bilgi ispatları oluşturmalarını gerektirir. Programlanabilir uyumluluk modeli, işlemleri koruma eylemini mevzuata uygunluğu gösterme eyleminden ayırarak, günlük kullanıcıların kurumsal gereksinimleri karşılarken gizli bir şekilde işlem yapmalarına olanak tanır.

zkEVM'ler bu uyumluluk kontrollerini gizli bir şekilde yürütebilir, işlem ayrıntılarını veya kullanıcı kimliklerini ifşa etmeden düzenleyici durumu doğrulayabilir.

## Mevcut yol haritası ilerlemesi {#current-progress}

Ethereum'da gizlilik gelişiminin yönü, tek bir organizasyondan ziyade ekosistem çapında bir uyumla şekillenir. [strawmap.org](https://strawmap.org/) yol haritası, topluluğun nerede mutabakata vardığını izlemek ve önermek için ekosistem genelinden önerilen güncellemeleri toplar. Ethereum Vakfı'ndaki araştırmacılar, erişim katmanı gizlilik araçlarını, kimlik altyapısını ve uyumluluk bilincine sahip sistemleri ilerletmeye odaklanarak araştırma ekosistemi genelinde paralel bir araştırma ve geliştirme yol haritasının yönetilmesine yardımcı olur. Her iki örnek de Ethereum'da gizliliği isteğe bağlı olmaktan ziyade yapısal hale getirmeye yönelik aynı temel önceliği yansıtmaktadır.

Ethereum'da gizlilik üzerine araştırma ve geliştirme, ekosistem genelinde düzinelerce ekibi kapsar. Protokol güncellemeleri, erişim katmanı çözümleri, kimlik altyapısı ve uyumluluk bilincine sahip araçlar üzerinde çalışmalar ilerlemektedir.

**Protokol güncellemeleri**: EIP-8141 (Çerçeve İşlemleri), EIP-7805 (FOCIL), EIP-8250 (Anahtarlı Nonce'lar) ve EIP-8182 (Protokol Düzeyinde Korumalı Havuzlar) aktif olarak geliştirilmektedir ve [Glamsterdam'dan](/roadmap/glamsterdam/) sonraki ağ güncellemesi olan [Hegotá güncellemesi](https://forkcast.org/upgrade/hegota/) için değerlendirilmektedir. EIP-8025 (isteğe bağlı yürütme ispatları) ve Verkle Ağaçları da Hegotá için hedeflenmekte olup, Ethereum Ana Ağı'nda zkEVM tabanlı gizli hesaplama için temel sağlamaktadır. Buna paralel olarak, çok partili şifrelenmiş akıllı sözleşmeleri mümkün kılmak için FHE yardımcı işlemcileri etrafındaki araştırmalar olgunlaşmaktadır.

**Erişim katmanı**: PIR araştırması, altyapı ekipleri tarafından test edilen aktif uygulamalarla ilerlemektedir. Kohaku cüzdan SDK'sı, gizliliği koruyan cüzdanlar için açık kaynaklı bir referans olarak geliştirilmektedir.

**İstemci tarafı kanıtlama**: Ekipler, sıfır bilgi ispatlarının standart cihazlarda nasıl çalıştığını optimize etmek için kıyaslama odaklı test sonuçlarını aktif olarak kullanıyor. Spartan-WHIR gibi projeler, doğrudan Ethereum ağında kolayca doğrulanabilen güvenli, kuantum dirençli ispatları ilerletiyor. leanVM gibi araştırma girişimleri, birden fazla kriptografik imzayı bir araya getirmek için tasarlanmış hafif bir zkVM sağlayarak, alandan tasarruf etmek ve ağ maliyetlerini azaltmak için kuantum güvenli imzaların veri boyutunu 250 kat küçültür.

**Kimlik ve kanıtlama**: zkID girişimi, mobil cihazlar için optimize edilmiş kanıtlama şemaları üretiyor. MACI, karesel fonlama turlarını ve DAO yönetişimini güvence altına almaya devam ediyor, Rarimo'nun Özgürlük Aracı gibi araçlar sıfır bilgi oylamasını gerçek dünyadaki seçimlere taşıyor ve gizliliği koruyan kimlik standartları üzerine devam eden araştırmalar sürüyor.

Bu çalışmanın hiçbir kısmı bitmiş değildir. Zaman çizelgeleri garantiler değil hedeflerdir ve Ethereum'un [mutabakata dayalı yönetişim süreci](/governance/), araştırmalar ilerledikçe yol haritasının değişebileceği anlamına gelir. Ancak aktif geliştirmenin kapsamı ve gizlilik üzerinde çalışan ekiplerin sayısı, Ethereum'u varsayılan olarak çıkarıma dirençli (extraction-resistant) hale getirme konusunda net bir kararlılığı temsil etmektedir.

## Daha fazla bilgi {#further-reading}

- [Ethereum'da Gizlilik](/privacy/)
- [PSE Yol Haritası: 2025 ve Ötesi](https://pse.dev/blog/pse-roadmap-2025)
- [Ethereum Vakfı Yetkisi](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Sıfır bilgi ispatları](/zero-knowledge-proofs/)
- [Merkeziyetsiz kimlik](/decentralized-identity/)
- [Kohaku Yol Haritası](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [İstemci Tarafı Kanıtlama kıyaslamaları](https://ethproofs.org/csp-benchmarks)
- [Rakamlarla zkEVM](https://zkevm.ethereum.foundation/)