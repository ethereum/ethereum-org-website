---
title: "Ethereum gizlilik yığını: özel okumalar, ağ oluşturma ve gizli sızıntı"
description: "Andy Guzman, cüzdanlar Ethereum'dan veri okuduğunda meta verilerin nasıl sızdığını ve gizlilik yol haritasındaki özel okumalar ile ağ araştırmalarının erişim katmanı sızıntısını nasıl kapattığını açıklıyor."
lang: tr
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Ethereum Gizlilik Yığını"
---

Ethereum Vakfı'ndaki Privacy Stewards of Ethereum (PSE) ekibinin lideri **Andy Guzman**'ın EthBoulder 2026'daki konuşması. Ethereum gizliliğindeki büyük bir kör noktayı ortaya çıkarıyor: Hiçbir işlemi imzalamayan kullanıcılar bile günlük sorgular aracılığıyla ayrıntılı davranışsal veriler sızdırıyor. Özel okumaları (PIR), trafik gizliliğini (soğan yönlendirme ve karma ağlar) ve birleşik ikili ağaçlar ile ZK ile doğrulanabilir durum gibi performans çalışmalarını kapsayan Ethereum gizlilik yığınını tanıtıyor.

*Bu döküm, EthBoulder tarafından yayımlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=tvAqDJXCBaA) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Kurgusal RPC sağlayıcısı mektubu (0:12) {#the-fictional-rpc-provider-letter-012}

Herkese merhaba, ben Andy. Ethereum ekosisteminde pek tartışılmayan ama son derece önemli olan bir konuyu tanıtmak istedim. Slayttan ve girişten de fark etmiş olabileceğiniz gibi, bu konu gizlilikle ve farkında bile olmadan nasıl yetersiz korunduğumuzla ilgili.

Birinin size yazdığı bir mektupla başlayayım.

"Değerli kullanıcımız, bu ay yaptığınız 847 sorgu için teşekkür ederiz. Sizi tanımaktan gerçekten keyif aldık. Üç farklı cüzdanda ETH tuttuğunuzu biliyoruz. Geçen salı günü ETH fiyatını 94 kez kontrol ettiğinizi biliyoruz. Herkes için çok zor bir gündü, bu yüzden sizi yargılamıyoruz. Ayrıca BTC fiyatını da kontrol ettiniz, ki bu ilginç, çünkü hiç Bitcoin tutmuyorsunuz. Çeşitlendirme yapmayı mı düşünüyorsunuz? Bu aramızda kalacak, tabii ki analitik ortaklarımızla birlikte. Ayrıca iki Uniswap havuzunu çok yakından izliyorsunuz ve geçen hafta Aave sağlık faktörünüzü 14 kez kontrol ettiniz. Biraz rahatlamak veya sadece biraz teminat eklemek isteyebilirsiniz. Perşembe günü 12 dakika içinde üç kez kontrol ettiniz ve çok endişeliydiniz. Dört farklı ENS ismine baktınız, yani ya yeni bir projeye başlıyorsunuz ya da bir kimlik krizi yaşıyorsunuz. Ve Dağ Zaman Dilimi'ne göre akşam 11 ile sabah 7 arasında her zaman sessizleşiyorsunuz."

#### İşlemleri imzalamadan nasıl veri sızdırırsınız (1:34) {#how-you-leak-data-without-signing-transactions-134}

"Yani Boulder'da veya yakınında yaşadığınızdan oldukça eminiz. Bizim aracılığımızla tek bir işlem bile imzalamadınız. Buna hiç gerek kalmadı. Merakınız bize her şeyi anlattı. Sevgilerle, RPC sağlayıcınız."

Elbette bu kurgusal bir mektup, ancak her gün gerçekten sızdırdığımız bir şeyi anlatıyor. Tek bir işlem veya herhangi bir zincir içi eylem yapmasanız bile, temelde bu verileri ve davranışlarınızı ele geçirmek isteyen herhangi bir analitik şirketine her şeyi anlatıyorsunuz.

#### Özel yazmalara karşı özel okumalar (2:07) {#private-writes-vs-private-reads-207}

Peki şu anda gizlilik dünyasında gerçekten neler oluyor? Zincir içi gizliliğe veya PSE'de bizim özel yazmalar dediğimiz şeye, yani zincir içi yaptığınız tüm eylemlere çok fazla vurgu yaptığımızı görüyorum. Ve bu mantıklı, değil mi? Bu eylemler sonsuza dek kaydedilir ve tüm dünyaya iletilir, bu nedenle belirli bir eylemle adresinizi sızdırmamak mantıklıdır. Ayrıca araçlara da çok fazla vurgu yapıyoruz: geliştiricilere zincir içi daha fazla gizliliğe sahip daha güçlü uygulamalar ifade etmeleri ve oluşturmaları için daha fazla araç sağlamak amacıyla kullanabileceğimiz veri kaynakları, kanıtlar, DSL'ler ve diller.

Ancak bu sunumda, diğer alanlara yeterince dikkat ve çaba göstermediğimizi savunmak istiyorum: özel okumalar dediğimiz şey, çünkü bir blokzincirden veri sorguladığınızda çok fazla bilgi sızdırıyorsunuz ve özel ağ oluşturma, çünkü herhangi bir şey zincir içi ulaşmadan önce bile tüm trafiğiniz sızıyor.

Biraz daha teknik olmak gerekirse: eth_getBalance, eth_call ve eth_getLogs gibi tüm RPC çağrıları, RPC sağlayıcılarına giden ve IP'nizle ilişkilendirilen düz metin halindeki isteklerdir.

#### Daha fazla aktivite neden profilleme riskini artırır (3:20) {#why-more-activity-increases-profiling-risk-320}

Bu bilgilerle insanları profillemek, onları segmentlere ayırmak ve davranışları modellemek çok kolay hale geliyor. Ve bu size karşı kullanılabilir. Tahmin edebileceğiniz gibi, bilgi güçtür ve insanların sizin ve davranışlarınız hakkında ne kadar çok bilgisi varsa, sizin üzerinizde o kadar çok güce sahip olurlar.

Çoğu insan bunun farkında değil. Çoğu insan, tamam, pek önemli değil çünkü bu kritik bir bilgi değil diyecektir. Veya şöyle düşünebilirler: ne kadar çok aktivite olursa, o kadar çok korunurum. Bu tamamen yanlıştır ve sezgilere aykırıdır. Zincir içi eylemler için, anonimlik kümelerinin olduğu her yerde bu yardımcı olur: ne kadar çok kullanıcı olursa, o kadar çok gizlilik olur ve araya karışmak o kadar kolaylaşır. Ancak okumalarda durum tam tersidir, çünkü sorgular birbirinin yerine geçemez. Ne kadar çok aktivite iletirseniz, ne kadar çok eylem yaparsanız, korelasyon yüzeyi o kadar zenginleşir ve eylemlerinizin bir profilini oluşturmak o kadar kolaylaşır.

Bu yüzden ne zaman bir DeFi çılgınlığı veya NFT furyası olsa, insanlar daha dikkatsiz hale geliyor. Operasyonel güvenlik (OpSec) elbette bir kenara atılıyor ve çoğu insanın içine düştüğü aktivite kalıplarına dayanarak insanların anonimliğini kaldırmak çok ama çok daha kolay hale geliyor.

#### Ethereum gizlilik yığınını tanıtıyoruz (4:43) {#introducing-the-ethereum-privacy-stack-443}

Genel manzarayla başlamak istiyorum: nereye saldırmalıyız, neye ihtiyaç var ve kim ne üzerinde çalışıyor. Bu konuşma biraz daha teknik konulara ve biraz daha üst düzey kavramsal konulara girecek, böylece herkes bundan bir değer çıkarabilir.

Ethereum gizlilik yığını veya Ethereum gizlilik yığınının katmanları dediğim şeyi sunmak istiyorum ve bence bu üzerinde düşünmek için yararlı. Gerçekten gizlilik istiyorsak, sadece zincir içi gizliliğe ihtiyacımız yok; bir işlemin yaşam döngüsüne veya OSI modeli ve teknoloji katmanlarına benzer şekilde, yığının tüm bu katmanlarında da gizliliğe ihtiyacımız var. Bu katmanların var olduğuna dair bir standart veya ekosistem çapında bir tür kabul oluşturabileceğimizi savunuyorum. Belki bu nihai hali değil, ama bence şimdiden tartışmasız bir şekilde faydalı.

#### Katman katman: nerede sızdırıyorsunuz (5:41) {#layer-by-layer-where-you-leak-541}

En üstte uygulama katmanı var. Bir web sitesini ziyaret ettiğinizde, elbette neyi ziyaret ettiğinizi sızdırıyorsunuz ve insanlar profillemeye başlayabilir: hiçbir şey yapmasanız bile anonimlik kümeleri, kimlik bilgileri, IP'nizi ziyaret ettiğiniz şeyle ilişkilendirme.

Bir sonraki cüzdan katmanıdır. Bir eylemde bulunduğunuzda, sadece uygulama katmanına değil, aynı zamanda ağ geçitlerine de bilgi sızdırırsınız. Cüzdanlar şu anda çok karmaşık, diğer birçok sistem ve hizmetle entegre oluyorlar ve hayal ettiğinizden çok daha fazla bilgi sızdırıyorsunuz. Sadece cüzdanınızı açsanız ve ETH fiyatını veya bakiyenizi sorgulasa bile her şeyi sızdırıyorsunuz.

Sonra ağ geçitleri var: RPC'ler, proxy'ler, aktarıcılar. Yine daha fazla meta veri sızdırıyorsunuz. Sonra insanların zincir içi unsur olarak hayal edeceği şey, yani durum veya yürütme kalıpları gibi şeylerin EVM'de sorgulandığı zamanlar. Örneğin, bir şeyin bakiyesini veya bir akıllı sözleşmenin durumunu sorgulamak. Ve son olarak, tüm doğrulayıcıların bulunduğu mutabakat. Zincir içi yazıp yazmadığınıza veya zincir içi okuyup okumadığınıza bağlı olarak, bellek havuzuna da dokunabilirsiniz.

Ve ağ oluşturma dediğimiz, tüm bu katmanları kesen enine bir dikey daha var. Örneğin: şu anda bir web sitesini ziyaret ediyorsunuz ve sunucu IP'nizi biliyor. Peki ya o web sitesini Tor veya başka bir anonim ağ üzerinden ziyaret etseydiniz? Web sitesinin IP adresini bilirdiniz, ancak onlar sizinkini bilmezdi. Peki ya o web sitesi yakın zamanda tüm kripto şeylerini sansürlemeye başlayan bir ülkede barındırılıyorsa? O web sitesi ve şirket de IP'lerini gizlemek ve alan adlarını bir soğan (onion) alan adının arkasına saklamak isteyecektir.

Bunlar mantıklı olan şeylerdir: her şeyi sansürlemek isteyen çok yıkıcı bir saldırganın merceğinden analiz ederek, her şeyi sağlamlaştırarak katman katman gitmemiz gerekiyor. Bunu yapmasak ve yeterince iyi bir durumda yaşadığımızı söylesek bile, bu bilgiler şu anda kaydediliyor ve verilerinizi satmaya başlayan şirketler, hatta tanımadığınız birçok kişi tarafından sonsuza kadar barındırılacak. Sonunda, beş yıl içinde birisi kriptoyu yasaklayabilir ve "son beş yılda Uniswap kullanan herkes, ben IRS'im (ABD Milli Gelirler İdaresi), kapınızı çalmaya ve sizi hapse atmaya başlayacağım" veya buna benzer bir şey diyebilir. Bu distopik senaryolar şu anda dünyanın farklı ülkelerinde yaşanıyor.

#### Özel okumalar ve özel ağ oluşturma (8:24) {#private-reads-and-private-networking-824}

Tamam, elimizde Ethereum gizlilik yığını var. Nereye odaklanmalıyız? Bu sunumda bu iki alandan bahsetmek istiyorum. Özel okumalar: zincir içi durum verisine her eriştiğinizde, uygulamadan (diyelim ki ETH fiyatını sorgulamak istiyorum), cüzdana, ağ geçitlerine, Ethereum ve EVM çalıştıran bir düğüme ve ardından geriye kadar tüm bu katmanlara dokunursunuz. Temelde bir RPC sağlayıcısı veya bir endeksleyici. Ve ağ katmanında gerçekleşen tüm eylemler olan özel ağ oluşturma. Sağlamlaştırmak istediğimiz şey budur.

#### Üç temel direk: veri, trafik, performans (9:05) {#three-pillars-data-traffic-performance-905}

Bunu başarmamız için kritik olduğunu düşündüğüm üç temel direk var. Verinin kendisini gizlemek ve özel hale getirmek istiyoruz. Trafiğin kendisini gizlemek ve özel hale getirmek istiyoruz. Ve sonra onu performanslı, kullanışlı, pratik ve ucuz hale getirmek istiyoruz. Bu, ekosistemde olup bitenler hakkında pek çok bilgiyi özetliyor, ancak genel durumu resmetmek ve hızlanabileceğimiz kaldıraç noktalarını belirlemek için yararlı olduğunu düşünüyorum.

#### Verileri gizleme: proxy'lerden PIR'a (9:39) {#hiding-data-from-proxies-to-pir-939}

Yani, veri. Korumak istediğimiz şey nedir? Bu sunuculardan hangi bilgileri istediğinizi gizlemek istiyoruz ve bu verilere nasıl eriştiğinizin kalıplarını gizlemek istiyoruz. Sadece içeriği değil, aynı zamanda kalıpları da.

Farklı teknik seviyeleri vardır. Birincisi hiçbir şeydir: sadece her şeyi sızdırırsınız. Cüzdanınızı her bağladığınızda, IP adresinizi sorguladığınız sözleşmeye, belirli bir adres için belirli bir eth_getBalance'a bağlarsınız ve hepsi bu kadar. Bir gizlilik protokolü, diyelim ki Tornado Cash kullanıyor olsanız ve Merkle ağacının durumunu sorgulamak isteseniz bile, ya çok performanslı olmayan tüm ağacı indirmek zorundasınız ya da hangi yolu ve yaprakları sorguladığınızı sızdırarak anonimlik kümenizi küçültürsünüz. Bu nedenle, ağınızı ve veri erişim kalıplarınızı korumazsanız Tornado Cash gibi güçlü bir gizlilik protokolü kullanmak bile yeterli değildir.

Bir sonraki seviye bir tür proxy'ler veya aktarıcılardır: isteğin nereden geldiğini bilmeyen ve sonunda verileri alan birçok makine. Bu çok pratik değil ve pek de güven gerektirmeyen bir yapı sunmuyor.

Sonra ileriye doğru bir adım olan TEE'ler (Güvenilir Yürütme Ortamları) var ve burası bazı ekiplerin ve şirketlerin hizmet sunduğu yerdir. Bence bu ileriye doğru atılmış iyi bir adım ama yeterli değil, çünkü TEE'lere saldırmanın ve onları bozmanın maliyeti çok düşüyor. Belirli kritik kullanım durumları için bu yeterli değildir; birçok günlük kullanım için olabilir.

OMAP'ler (farkında olmayan harita erişim kalıpları) ve ORAM (Farkında Olmayan RAM) üzerinde çalışan başka ekipler de var. Bunlar, veri kümesinin hangi bölümlerine erişmeye çalıştığınızı gizlemeye çalışan benzer tekniklerdir. "Bu ETH adresinden bakiyeyi istiyorum" demek yerine, rastgele farklı şeylere erişiyorsunuz, böylece sunucu bunu bilmiyor.

Ve bunların son aşamasının PIR, yani özel bilgi alımı olacağını savunuyorum; bu, sunucunun neyi sorguladığınızı bilmediği ve bunun hakkında hiçbir şey öğrenmediği anlamına gelir.

#### Özel Bilgi Alımı açıklandı (12:03) {#private-information-retrieval-explained-1203}

Özel bilgi alımı, kriptografide süper güçlü bir tekniktir ve çok kullanılacaktır. İki çeşidi vardır: bir endeks altında yapılandırılmış verileriniz varsa kullanabileceğiniz endeks PIR ve adından da anlaşılacağı gibi anahtar kelime başına sorgulama yaptığınız anahtar kelime PIR. Her şey için işe yarayan tek bir şemaya sahip olmak çok zordur.

Ethereum durumu devasa ve çok çeşitlidir. Dün öğrendiğim kadarıyla günlükler (logs) yalnızca eklenebilir (append-only) yapıdadır, ancak hesap modeli farklıdır: bazı durumlar çok sık güncellenirken bazıları güncellenmez. Onu nasıl dilimleyip böldüğünüze bağlı olarak, çok farklı erişim kalıplarına sahip megabaytlarca, gigabaytlarca veya terabaytlarca veriye sahip olabilirsiniz.

#### Çok etmenli bir PIR mimarisi (12:48) {#a-multi-agent-pir-architecture-1248}

PSE içinde üzerinde çalıştığımız teklif (ve burada kavramsal olarak konuşacağım, ardından PSE'de yaptığımız belirli projelerden ve ekosistemde gördüğüm diğer şeylerden bahsedeceğim) çok etmenli bir mimaridir. Tüm Ethereum durumu için mükemmel olan tek bir şema yoktur. Ancak Ethereum durumunu türe veya erişim kalıbına göre dilimleyebilirsek, her biri için çok iyi şemalar bulabiliriz.

Ya bu çok etmenli mimariyi çalıştıran ve sorguların türüne ve Ethereum durumunda nerede bulunabileceklerine bağlı olarak bir şemayı veya diğerini çalıştıran bir hizmetimiz olursa? Bu bizi zaten uygulanabilir, üretime hazır ve ekosisteme sunulabilir bir şeye çok yaklaştırıyor. Bu, cüzdanların, endeksleyicilerin, kullanıcıların ve merkeziyetsiz uygulama (dapp) geliştiricilerinin hangi şemanın kullanıldığı ve nasıl çağrılacağı konusunda endişelenmelerine gerek kalmaması için birleşik bir API gibi bir şey gerektirecektir. Sadece standart API'ye sahip olursunuz ve uygulama ayrıntıları hakkında başka biri endişelenir.

Bunu zaten yapıyoruz ve iki farklı şema uyguluyoruz. Hibeler açacağız ve bunların bazılarıyla başa çıkmak ve Ethereum için en çok hangilerine ihtiyaç duyulduğunu görmek için ekosistemdeki daha fazla insanı koordine etmeye çalışıyoruz.

İşte farklı PIR şemaları hakkında birkaç rakam: verimler, iletişim yükü vb. Bu zor, çünkü farklı uygulamaların farklı erişim kalıpları var. Bazıları çok sayıda makbuza erişiyor, bazıları Rotki gibi durumun daha fazlasına erişmek istiyor ve bazıları Helios gibi daha fazla işleme erişiyor. Sihirli bir değnek yok ve büyük olasılıkla karma bir mimari yardımcı olacaktır. Ayrıca bir bilgi sistematiği yapıyoruz, bu yüzden bu ilginizi çekerse paylaşabiliriz. Ve işte bu alanlarda çalışan ekiplerden sadece birkaçı. Bir ekibin parçasıysanız ve sizi dahil etmediysem beni affedin; birisi kaydı görürse ve eksikse, lütfen bana bildirin, sizi eklemeye başlayabilirim.

#### Trafiği gizleme: soğan yönlendirme ve Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

Verileri ele aldık. Diğer büyük kova ise trafiktir. Trafiği nasıl gizleriz ve neyi gizlemek istiyoruz? Çok basit bir ifadeyle, istemcinin ve sunucunun IP'lerini birbirinden ve trafiği gözetliyor olabilecek dünyanın geri kalanından gizlemek istiyoruz. Farklı tekniklerimiz var: soğan hizmetleri, karma ağlar (mixnets), VPN'ler, DC-ağları ve başka sınıflandırmalar da olabilir. Ben sadece ilk ikisinden bahsedeceğim.

Soğan yönlendirme teknikleri katmanlar halinde şifreler ve trafik de katmanlar halinde şifresi çözülür. Aradaki insanlar asla kaynağı bilemez, bazıları asla varış noktasını bilemez ve bazıları asla hiçbir şey öğrenemez; sadece yönlendirici olarak hareket ederler.

Özetle: ya tüm Ethereum ekosistemi trafiği tabiri caizse Tor ağı üzerinden yönlendirilebilseydi? Başka seçenekler de var. Gönderenin IP'sini korumaya yardımcı olurduk: işlemler gönderirken veya bilgi talep ederken telefonunuz veya dizüstü bilgisayarınız sızdırılmazdı. Ve elbette alıcıyı, yani sunucuyu da korurduk. İran, Çin, Kuzey Kore veya Venezuela'da birinin bir DeFi protokolü veya hizmeti barındırmaya çalıştığını ve bunun ülkesi tarafından sansürlendiğini hayal edin. Bu, hayatlarını koruyabilecek bir seçenektir. Sansürü atlar ve ayrıca trafiği, hepimizin bildiği gibi her şeyi gözetleyen istihbarat teşkilatları tarafından dinlenen İSS'lerden, yani internet servis sağlayıcılarından gizler.

Amaç, doğrudan kullanılabilecek bir alternatif (drop-in replacement) elde etmektir: cüzdanların, dapp geliştiricilerinin ve altyapı sağlayıcılarının uygulama ayrıntıları hakkında endişelenmelerine gerek kalmaması için bir SDK. Sadece bu SDK'yı kullanırlarsa trafiğin soğanlaştırıldığını, şifrelendiğini ve sağlamlaştırıldığını bilirler.

Teşekkür etmek istediğim bir ekip var, web için açık kaynaklı bir Tor uygulaması olan Echalote'u başlatan Brume Cüzdan ekibi. Bu şu anda mevcut: Tor istemcileri var, ancak C ile yazılmışlar ve özel bir tarayıcıda çalışmaları gerekiyor. Peki ya bunu MetaMask'a veya Kohaku cüzdanına veya Ambire, Rabby ve diğerlerine eklemek istersem? JavaScript SDK'larına ihtiyacımız var ve Echalote'un başlattığı şey de bu.

Ardından, Tor Projesi'nin geliştirmekte olduğu, istemcilerinin yeni nesli olan Arti adlı yeni bir uygulaması var. Ancak gömülü bir Arti'ye ihtiyacımız var. Arti Rust tabanlıdır ve tarayıcınızda çalışabilmesi için WASM'ye derlenmesi gerekir, böylece onu gerçekten kolayca içe aktarabilirsiniz. Temelde Tor ekibiyle bir işbirliğimiz var: her hafta görüşmeler ve birlikte bazı projeler ile ortaklıklar.

#### Ethereum için karma ağlar (Mixnets) (18:16) {#mixnets-for-ethereum-1816}

Karma ağ (mixnet) tarafında, buna yaklaşan birkaç ekibe teşekkür etmek istiyorum: Nym ekibi; aynı zamanda ilklerden biri olan HOPR; Gnosis VPN gibi VPN'ler; ve Anyone Protocol gibi benim için yeni olan birkaç tane daha ve sanırım o ekipten birileri burada Denver'da olmalı, artı bazı diğer yeniler. Karma ağlar, VPN'ler ve diğer yaklaşımlar üzerinde çalışan birçok ekip var.

Şunu görmek istiyoruz: ya Ethereum için RPC trafiğini yönlendirebileceğimiz amaca yönelik bir karma ağ oluşturursak? Karma ağların güçlü garantileri vardır, ancak çok fazla gecikme eklerler. Bazı kullanım durumları için bu sorun değildir: gizliliğiniz olduğu sürece biraz daha uzun sürmesi önemli değildir. Ancak DeFi ve ticaret gibi şeyler için, gecikme eklerlerse bunların benimsenmesi son derece düşüktür. Peki, en yüksek gizlilik garantileriyle çalıştırabileceğimiz en hızlı şey nedir? Yine, bu ekiplerden bazılarına teşekkürler ve eğer birisi bu alanlarda çalışıyorsa ve sizi eklemediysem, sohbet etmeyi çok isterim.

#### Performans: birleşik ikili ağaçlar ve GPU hızlandırması (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

Bahsetmek istediğim son şey, bunu gerçeğe dönüştürmenin üçüncü temel direği performanstır. Bunların hızlı ve ucuz çalışmasını istiyoruz. Benim bir prensibim var: maliyet faydadan yüksekse bu şeyler benimsenmeyecektir. Maliyet, kullanıcı için kullanıcı deneyimi, zaman ve çaba anlamına gelir, ancak aynı zamanda geliştiriciler ve altyapı için de maliyet anlamına gelir: bunu çalıştırmak çok mu pahalı? Maliyeti olabildiğince düşürmemiz gerekiyor ve bahsedebileceğim iki üst düzey girişim var.

Biri UBT'dir (Birleşik İkili Ağaç). Protokol EIP'lerine ne kadar dahil olduğunuza bağlı olarak bunu duymuş olabilirsiniz. Şu anda yararlı olan ancak ZK ve diğer kriptografi türleri için pek yararlı olmayan Merkle Patricia Ağacı'na sahibiz. Verkle Ağaçları'na değil, birleşik ikili ağaçlara geçişi öngören EIP-7864 adlı bir teklif var. Bu, durumu sorgulamak ve ardından üzerinde ZK gibi kriptografik işlemler yapmak için çok daha verimlidir.

Doğrulanabilir bir UBT yapan bir projemiz var: herhangi bir Ethereum istemcisine bir yan araba (sidecar) eklersiniz, bu MPT veritabanı çalıştırmak yerine bir UBT durum veritabanına sahiptir ve ardından bir zkVM kullanarak MPT'den UBT'ye bu dönüşümün geçerli olduğunu kanıtlarsınız. Bu zaten çok güçlü. Bunu başardığımızda, hafif istemciler performanslarını artırmak için bunu kullanabilir ve PIR gibi şeyler çok daha hızlı çalışabilir.

Diğer bir yönü ise GPU hızlandırmasıdır. Yığının daha düşük seviyelerini optimize edersek bunları çok daha hızlı çalıştırabiliriz: GPU bunlardan biridir veya CPU hızlandırması da olabilir. Bunlar muhtemelen telefonlarda değil sunucularda çalışacak, bu nedenle çok daha hızlı çalışması için bu alt düzey kütüphaneleri nasıl oluşturabileceğimizi keşfetmeye başlamak da çok değerlidir.

Şimdiye kadar bir özet yapacak olursak: bu beş katmanımız var ve bu kullanım durumlarını kapsamak istiyoruz. Üç temel direk var: veri, trafik ve performans. Veri için proxy'lerimiz, TEE'lerimiz, ORAM'lerimiz, OMAP'lerimiz ve PIR'ımız var. Trafik için karma ağlarımız, soğan yönlendirmemiz ve diğerleri var. Performans için UBT ve GPU hızlandırmamız var. Daha fazlasını, en azından PSE'nin yaptığı katkılar hakkında okumak isterseniz pse.dev/research adresine gidebilirsiniz.

#### Başarıyı ölçmek (22:15) {#measuring-success-2215}

Peki başarı nedir ve onu nasıl ölçebiliriz? Bu katmanlara geri dönersek: Ethereum'un en gizli zincir olduğunu iddia edebilmek istiyorsam, son aşama nedir? Tüm bu katmanların son derece sağlamlaştırıldığından emin olmam gerekir. Bunu nasıl ölçerdim? Daha fazla web sitesinin ve dapp ön yüzünün soğan alan adlarının arkasında barındırılmasını beklerdim. Cüzdanların yerel olarak anonim yönlendirmeyi kullanmasını ve ağ geçitlerinin, RPC sağlayıcılarının ve endeksleyicilerin de bunu yapmasını çok isterdim. Ve bir yüzde ölçerdim.

Soru şu: mevcut Ethereum ekosistemi ön yüzlerinden kaç tanesi bir soğan alan adının arkasında barındırılıyor? Son derece az, varsa bile %1 derdim. Kendimi iyi hissetmem ve başardık diyebilmem için, muhtemelen tüm bu katmanlarda %80'den fazlasına ihtiyacımız olacak. Şu anda kaç cüzdan trafiği anonim yönlendirme teknikleri aracılığıyla yönlendiriyor? Çok, çok az. RPC sağlayıcıları için de aynısı geçerli: bu sağlayıcılar PIR sunuyor mu? Hayır. Yani benim için başarıyı iddia etmek, tüm bu katmanlardaki aktörlerin bu tür teknolojileri benimsemesi, ekiplerin, trafiğin veya sorguların en az %80'inin bunu yapması anlamına geliyor.

#### Bitcoin'in soğan düğümü karşılaştırması (23:39) {#bitcoins-onion-node-comparison-2339}

Bu, Bitcoin'i kıskanabileceğimiz bir şey. Aldıkları tüm eleştirilere rağmen, bu geçen yılın Kasım ayından bir tablo: ulaşılabilir tam düğümlerinin %64'ü soğan alan adlarının arkasında gizli.

Bunu kendimiz yapabilir miyiz? Bu daha düşük seviyeli, mutabakat seviyesinde bir gizliliktir, ancak tam düğümlerimizin ve doğrulayıcı düğümlerimizin bir soğan ağı veya karma ağların arkasında olduğunu söyleyebilir miyiz? Kesinlikle yapmamız gerektiğini düşünüyorum ve muhtemelen %1'den daha azındayız. Onların sahip olmadığı başka zorluklarımız var: çok daha hızlı çalışıyoruz ve mutabakatımız farklı. Ancak bunun gibi gösterge panellerine sahip olmayı ve cüzdanların %80'inden fazlasının bu tür teknolojileri benimsediğini ve RPC sağlayıcılarının, gezginlerin, ön yüzlerin, yük dengeleyicilerin ve SDK'ların da benimsediğini söylemeyi çok isterim. Bu listenin büyümesini çok isterim.

#### Ethereum'u Monero ve Zcash ile karşılaştırmak (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

Dün gece ve ondan önceki gece, bu katmanlar merceğinden Ethereum ekosisteminin Solana, Bitcoin, Zcash ve Monero gibi şeylerle nasıl karşılaştırıldığını görmeye başlama özgürlüğünü kullandım. Sarı renkteki şeyler isteğe bağlı (opt-in) tekniklerdir ve bence bu konuda çok iyiyiz. Mavi renkteki şeyler tekliflerdir, bazıları protokol teklifleridir. Yeşil renkteki şeyler ise protokol katmanında zorunlu kılınmıştır.

Halka açık bir zincir olma konusundaki 10 yıllık geçmişimiz nedeniyle, gizliliği yerel hale getirme konusunda Monero ve Zcash'i yakalamanın zor olacağını düşünüyorum. Ancak isteğe bağlı benimsemeyi sağlama ve ekipleri ile kullanıcıları bu tekniklerden daha fazlasını benimsemeleri için kültürel ve sosyal olarak etkileme konusunda gerçekten iyi bir iş çıkarabileceğimizi düşünüyorum. Bitcoin ve Solana'nın kendi zorlukları var ve en azından bu gizlilik konularında daha geride kalacaklarını düşünüyorum.

#### Zorluk: en gizli programlanabilir ekosistem (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

Benim hedefim ve sizin de aklınıza koymak istediğim hedef, Ethereum'un dünyadaki en gizli, izinsiz, güven gerektirmeyen ve programlanabilir ekosistem haline gelmesidir. Başka özel ödeme zincirlerimiz var ve bu harika, çok iyiler, ancak programlanabilir hale gelme ve bizim yarattığımız ekosistemi yaratma konusunda çok daha zor bir işleri olacağını düşünüyorum.

Size ve elbette bana ve ekibime meydan okumam, programlanabilir ekosistemler arasında en izinsiz, güven gerektirmeyen ve gizli olanı haline gelmektir. Sadece zincir içi unsurlara odaklanamayız. Tüm bu katmanlara odaklanmamız gerekiyor.

Bu yüzden özel okumalar, ağ oluşturma, PIR uygulamaları, GPU hızlandırması, veri yapıları, UBT, altyapı veya doğrulayıcılar üzerinde çalışıyorsanız, sonrasında sizinle sohbet etmeyi çok isterim. Çok teşekkür ederim. Ethereum gizlilik içindir.