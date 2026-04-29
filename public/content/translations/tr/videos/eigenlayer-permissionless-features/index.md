---
title: "EigenLayer: Ethereum'a izinsiz özellik ekleme"
description: "Sreeram Kannan, EigenLayer'ın Ethereum'a izinsiz özellik ekleme yaklaşımını sunuyor."
lang: tr
youtubeId: "-V-fG4J1N_M"
uploadDate: 2023-02-10
duration: "0:24:11"
educationLevel: advanced
topic:
  - "restaking"
  - "eigenlayer"
  - "security"
format: presentation
author: a16z crypto
breadcrumb: "EigenLayer"
---

**Sreeram Kannan** (Washington Üniversitesi / EigenLayer) tarafından bir a16z kripto araştırma etkinliğinde yapılan ve EigenLayer'ın, staker'ların kâhinler, köprüler, veri kullanılabilirliği katmanları ve alternatif yürütme ortamları gibi yeni hizmetler sunma karşılığında aynı stake edilmiş sermayeyi ek kesinti koşullarına adamalarına izin vererek Ethereum üzerinde izinsiz inovasyonu nasıl sağlamayı amaçladığını açıklayan bir araştırma konuşması.

*Bu transkript, a16z kripto tarafından yayınlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=-V-fG4J1N_M) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için hafifçe düzenlenmiştir.*

#### Giriş (0:00) {#introduction-000}

Bugün, inşa ettiğimiz ürünlerden biri olan ve aynı zamanda EigenLayer adında bir fikir olan konudan bahsedeceğim. EigenLayer'ı yeniden staking kolektifi olarak adlandırıyoruz, ancak yaptığı şey herkesin Ethereum'a yeni özellikler eklemesini sağlamaktır.

Tim'in tanıttığı gibi, Seattle'daki Washington Üniversitesi'nde doçentim ve burada son dört buçuk yıldır blokzincirler, mutabakat ve diğer alanlar üzerinde çalışıyoruz. Geçtiğimiz yıl boyunca EigenLayer Labs adlı girişimi kuruyordum. Mutabakat protokolleri üzerine çok çalıştık — İş Kanıtı (PoW), Hisse Kanıtı (PoS) ve alan kanıtı (proof of space) en uzun zincir tipi protokollerin hangi koşullar altında güvenli olduğunu analiz eden "Everything is a Race" (Her Şey Bir Yarıştır) adlı bir makalemiz vardı. Bu anlayışın bir kısmı üzerine inşa ettik — örneğin, çok düşük gecikme süresine sahip bir İş Kanıtı (PoW) protokolü olan Prism adlı bir makale. Ayrıca, protokolünüzün değişken katılım altında çalışmaya devam ettiği, dinamik olarak kullanılabilir bir Hisse Kanıtı (PoS) protokolünün nasıl oluşturulacağı üzerine PoSAT adlı bir çalışma da yaptık.

#### Blokzincirler ne zaman hesap verebilirdir (1:31) {#when-are-blockchains-accountable-131}

Ayrıca blokzincirlerin ne zaman hesap verebilir olduğunu da araştırdık. Bir buluşsal yönteme göre, yeter sayılara ve imzalara sahip olduğunuzda, bir grup stake eden bir blok üzerinde çifte imza atarsa, bu blokzincirler hesap verebilirdir. Ancak bazı incelikler var — örneğin, yine yeter sayıları kullanan Algorand gibi bir protokol hesap verebilir değildir çünkü hiçbir şey söylemeyerek güvenlik ihlalleri yaratabileceğiniz zamanlama varsayımlarına dayanır.

#### Çoklu kaynak mutabakatı (2:11) {#multi-resource-consensus-211}

En son iki çalışma çoklu kaynak mutabakatı üzerinedir — diyelim ki Hisse Kanıtı (PoS), alan kanıtı ve İş Kanıtı (PoW) yöntemlerinin hepsini tek bir protokolde birleştiren bir protokol oluşturmak istiyorsunuz. Hisse Kanıtı (PoS) madencilerinin çok küçük bir kısmı dürüst olduğu sürece, İş Kanıtı (PoW) madencilerinin çoğunluğu kötü niyetli olsa bile bunun çalışmasını istersiniz. Birden fazla kaynak arasındaki ödünleşim (trade-off) bölgelerini karakterize ettik.

Ayrıca eşler arası topoloji tasarımı üzerinde de çalıştık — bir blokzincirin eşler arası ağında, mutabakat protokolünün mesajların sıralamasına saygı duyduğundan nasıl emin olursunuz? Blokzincirlerde yaygın olarak gerçekleşen şeylerden biri önden koşmadır. Hedeflenmemiş önden koşmayı — sadece fiyat avantajınız olduğu için herkesin önüne geçmek istediğiniz durumu — önlemek için, blokzincire yerel bir ilk giren ilk çıkar özelliği kazandıran Themis adlı bir makalemiz var.

Mutabakatın yanı sıra, parçalama (sharding) gibi ölçeklendirme çözümleri de vardır. Bu konuda Coded Merkle Tree ve Free2Shard adlı birkaç makalemiz oldu.

Blokzincirde büyük bir sürtünme olarak bulduğumuz şeylerden biri, çekirdek katmanlardaki — mutabakat, parçalama veya eşler arası — inovasyon hızının, uygulama katmanındaki inovasyon hızından çok daha düşük olmasıdır. Uygulamalar izinsiz olarak dağıtılabilir — herkes Ethereum gibi mevcut bir blokzincir üzerinde bir uygulama dağıtabilir. Oysa çekirdek protokol yükseltmeleri çok derin bir anlamda izinlidir. Bu durum alanımızı oldukça yavaşlattı.

#### Güven ve inovasyonu birbirinden ayırmak (8:30) {#decoupling-trust-and-innovation-830}

Hikayeyi 2008–2009'a geri götürürsek: Bitcoin, İş Kanıtı (PoW) madenciliği aracılığıyla merkeziyetsiz güvene öncülük etti. Madenciliğin üzerinde, geçerli zincire karar veren bir mutabakat protokolü — en uzun zincir veya en ağır zincir — bulunur. Bunun da üzerinde, Bitcoin Script yürütme anlambilimini belirler. Yani tabanda bir güven katmanı, onun üzerinde bir mutabakat katmanı ve en üstte bir yürütme katmanı var.

Ancak Bitcoin aynı zamanda uygulamaya özel bir blokzincirdi — tek bir uygulama için tasarlanmıştı: istemciler arasında Bitcoin değişimi. 2011'e dönecek olursak, bir blokzincir üzerinde inşa edilmesi gereken herhangi bir yeni uygulamanın kendi güven ağına ihtiyacı vardı. Örneğin, birisi Namecoin adında merkeziyetsiz bir alan adı sistemi kurmak istedi. Bitcoin'in betik katmanı size yeterli programlanabilirlik sağlamıyordu, bu yüzden yeni bir betik katmanı ve yeni bir güven ağı oluşturmanız gerekiyordu. Namecoin ve Bitcoin arasında güveni paylaşmanın bir yolu yoktu.

Ethereum tarafından inşa edilen temel fikir, güven ve inovasyonun birbirinden ayrılmasıydı. Bitcoin betik katmanını aldılar ve onu genel amaçlı, Turing tam bir programlama katmanı olan Ethereum Sanal Makinesi ile değiştirdiler. Bu temel anlamda küçük bir teknik yükseltmeydi, ancak yarattığı şey güvenin modülerliğiydi. Artık herkes gelip sistemin üzerinde merkeziyetsiz uygulamalar (dapp'ler) inşa edebilir. ENS'yi kuran kişinin güven ağıyla hiçbir ilgisi yoktu. Ethereum ağının güveni, herhangi bir dağıtık uygulamaya sağlanabilen bir modül haline geldi.

#### Açık inovasyon (10:23) {#open-innovation-1023}

Bu, takma adlı ekonominin muazzam bir şekilde hızlanmasına yol açtı. Bu uygulamaları yaratan herkes — kendilerine güvenilmiyor, sadece inovasyon getiriyorlar. Bir fikirle ortaya çıkarsınız, hiç kimse olabilirsiniz, size güvenilmesine gerek yoktur, sadece kodunuzu yazar, Ethereum'a koyarsınız ve herkes Ethereum'un belirtilen koşulları yürütmeye devam edeceğine güvenir.

Bunu modellemenin bir yolu şudur: temel katmanlar — güven ağı, mutabakat ve sanal makine — güven üreten bir güven ağında birleştirilir. Ethereum blokzinciri bir güven üreticisidir. Dağıtık uygulamalar ise güven tüketicileridir. Değer değişimi şöyledir: merkeziyetsiz uygulamalar (dapp'ler) Ethereum'dan güven alır ve karşılığında ücret öderler. Tıpkı risk sermayesinin sermaye ve inovasyonu birbirinden ayırması gibi, Ethereum da güven ve inovasyonu birbirinden ayırdı.

Ancak açık inovasyonun önündeki engeller varlığını sürdürmeye devam ediyor. Ethereum mutabakat protokolünün nasıl yükseltileceğine dair bir fikrim varsa — diyelim ki yıl 2019 ve Avalanche mutabakat protokolünü buldum — bunu Ethereum üzerinde dağıtmanın hiçbir yolu yoktur. Peki ne yaparım? Gidip kendi dünyamı yaratırım. Bu, alternatif katman 1 (l1) blokzincirleri çağıdır — her biri farklı mutabakat protokollerine, farklı sanal makinelere sahip, ancak her biri kendi güven ağlarını kurmak zorunda olan.

Bu tablo tam olarak Bitcoin ve Namecoin'in 2011'deki tablosuna benziyor. Dapp seviyesindeki inovasyonlar basitçe Ethereum üzerine inşa edilebilir, ancak daha derine inen ve yığının kalbine dokunan inovasyonlar parçalanmış güven ekosistemleri yaratmak zorundadır.

Dahası, Ethereum dapp'lere yalnızca blok yapımı — işlem sıralaması ve işlem yürütmesi — için güven sağlar. Hepsi bu kadar. Dapp'ler başka herhangi bir konuda — internetten veri okumak, başka bir blokzincirden veri okumak, farklı bir yürütme motoru çalıştırmak, bir oyun motoru çalıştırmak, bir kimlik doğrulama sistemi çalıştırmak — güven isteselerdi, kendi güven ağlarını oluşturmak zorunda kalırlardı. Chainlink harika bir örnektir: internetten blokzincire veri getirmeye yardımcı olan bir kâhin protokolüdür, ancak Chainlink'in kendi güven ağı vardır. Güveni Ethereum stake edenlerinden ödünç alınmamıştır.

#### Mikroekonomik sorun (16:28) {#microeconomic-problem-1628}

Mikroekonomik sorun: bir ara yazılım — diyelim ki bir veri depolama sistemi — çalıştırıyorsanız, kendi staking mekanizmanızı oluşturmanız gerekir. Yüksek ekonomik güvenliğe ihtiyacınız vardır, bu da çok fazla sermayenin stake edilmesi anlamına gelir ve ardından sermayenin fırsat maliyetiyle karşılaşırsınız. Örneğin, veri depolama katmanınızda 10 milyar doların stake edilmesini istiyorsunuz. Spekülatif olmayan bir dünyada bu sermaye üzerinden yıllık %5 veya %10 oranında ödeme yapmanız gerekir. Baskın maliyet, veri depolamanın operasyonel maliyeti değildir — devasa bir ekonomik sermaye tabanını beslemenin maliyetidir.

Herhangi bir Hisse Kanıtı (PoS) ekosistemine baktığınızda: ödüllerin %94'ü sermayeyi elinde tutan kişiye gider ve sadece %6'sı operasyonları fiilen yapan kişiye gider. Dolayısıyla, operasyonel maliyetleri 10 kat azaltmak için çığır açan bir fikirle gelseniz bile, %94'lük kısım değişmeden kalır. Maliyet yapınız sermaye maliyeti ile sınırlıdır.

Eğer bir merkeziyetsiz uygulama (dapp) iseniz, mikroekonomik sorun, Ethereum gibi büyük bir güven ağına çok yüksek bir ücret ödüyor olmanızdır, ancak bağlı olduğunuz en zayıf güven ile sınırlısınızdır. O kadar güvenilmeyen bir kâhin veya köprüye sahipseniz, orada istismar edilebilirsiniz. Güvenliğiniz her zaman en küçük ortak paydadır.

#### Ekonomik sorun (19:52) {#economic-problem-1952}

Çekirdek blokzincir için, eğer temel değer önerisi merkeziyetsiz güven sağlamak ve bundan gelir elde etmekse, Ethereum yalnızca blok yapımı konusunda merkeziyetsiz güven sağlayabilir — merkeziyetsiz bir hizmeti yürütmek için gereken diğer tüm konularda değil. Diğer ara yazılımlar tarafından merkeziyetsiz güven adaları yaratılıyor ve gelirin hizalanıp devasa bir güven ağı oluşturması yerine, gelir daha küçük adalara bölünüyor.

#### EigenLayer (20:44) {#eigenlayer-2044}

Aslında tüm bu sorunları aynı anda çözen gülünç derecede basit bir fikir.

EigenLayer, mevcut bir güven ağından, yapılması amaçlanmayan başka şeyleri yapmak için yararlanmaya yönelik bir mekanizmadır. Ethereum, sıralama ve yürütme konusunda güven sağlar. EigenLayer, Ethereum üzerinde bir dizi akıllı sözleşmedir ve buradaki temel işlevsel kelime yeniden staking'dir.

Yeniden staking nedir? Hisse Kanıtı (PoS) Ethereum'da, İşaret zincirinde halihazırda on milyarlarca dolar stake edilmiştir. EigenLayer, stake edenlerin yeniden staking yaptığı — aynı sermayeyi ek riske attıkları — bir mekanizmadır. Stake'lerini Ethereum'a kilitlerler ve aynı stake ek kesinti koşullarına adanır. Kesinti, stake'inizin elinizden alınabileceği bir mekanizmadır, ancak şimdi EigenLayer akıllı sözleşmelerinin üzerinde cezalandırılabileceğiniz ek nedenler eklersiniz.

İstediğimiz özellik: aynı stake'in ek risk almasıdır. Ne konusunda ek risk? EigenLayer üzerine inşa edilmiş herhangi bir yeni hizmeti sağlama konusunda — birisi bir kâhin, bir köprü, bir veri kullanılabilirliği katmanı, yeni bir mutabakat protokolü oluşturmak isteyebilir. Bunların herhangi biri EigenLayer üzerine inşa edilebilir. Eğer katılım sağlayan bir staker iseniz, aynı zamanda hangi hizmet alt kümesine katıldığınızı da belirtirsiniz — ve böylece ek kesinti riski alırken aynı zamanda gelir elde edersiniz.

#### EigenLayer ekosistemi nasıl hizalar (23:50) {#how-eigenlayer-aligns-the-ecosystem-2350}

Ara yazılımlar için: Ethereum'da halihazırda stake etmiş olan bir staker, bir kâhin üzerinde de hizmet sağlamayı seçerse, ek bir sermaye maliyetine sahip olmaz. Zaten Ethereum'da stake etmişlerdir ve APR kazanmaktadırlar. EigenLayer'a katılarak, marjinal sermaye maliyeti ya çok küçüktür ya da teorik olarak sıfırdır. Dürüst bir düğüm olarak asla kesintiye uğramayacağınızı biliyorsanız, risk en aza indirilir. Denklem şu hale gelir: operasyonel maliyet gelirle gerekçelendirilmiş midir? Ara yazılımın maliyet yapısı aniden sermaye sınırlı olmaktan çıkıp operasyonel maliyet sınırlı hale dönüşür.

Merkeziyetsiz uygulamalar (dapp'ler) için: özellikle birçok staker'ın katıldığı popüler hizmetler, Ethereum'un kendisiyle aynı güveni sağlar. Tüm staker'lar potansiyel olarak katılırsa, yerel olarak Ethereum'a inşa edilmemiş hizmetlerde çekirdek Ethereum güvenini elde edebilirsiniz.

Ayrıca çekirdek ekosistemle de değer açısından hizalanmıştır. Ethereum'da stake eden staker'lar blok ödülleri ve işlem ücretleri alırlar, ancak aynı zamanda kâhin ücretleri, veri kullanılabilirliği ücretleri, sıralama ücretleri de alabilirler — daha önce mevcut olmayan her şey. ETH stake etmek için ek gelir kaynaklarının olması, token'ın kendi değerini artırır.

EigenLayer iki taraflı bir pazar yeridir. Bir tarafı katılım sağlayan staker'lardır. Diğer tarafı ise bu staker'ları kullanmayı seçen, EigenLayer üzerine inşa edilmiş ara yazılımlar ve hizmetlerdir.

#### Aşırı kaldıraç ve risk yönetimi (33:00) {#over-leveraging-and-risk-management-3300}

**İzleyici sorusu:** Ya stake aşırı kaldıraçlandırılıyorsa?

Diyelim ki kendi zincirlerini çalıştıran on farklı merkeziyetsiz uygulama (dapp) var, her biri 1 milyon dolar değerinde ve aynı 2 milyon dolarlık staker yeter sayısına dayanıyor — bu stake aşırı kaldıraçlı hale gelir. EigenLayer aynı zamanda risk yönetim katmanıdır. Bunu bir grafik problemi olarak modelliyoruz: her staker bir düğümdür, her hizmet bir grup staker'a bağlıdır ve her hizmet için yolsuzluktan elde edilen bir kâr vardır. Ardından, sistemin asla aşırı kaldıraçlı olmamasını sağlamak için bu grafik üzerinde kesintiler hesaplarsınız.

Sistem aşırı kaldıraçlı hale gelirse, ücretler artar, daha fazla kişi katılır ve sistem yeniden düşük kaldıraçlı hale gelir. Daha fazla hizmet başladıkça, getiri fırsatları artar ve daha fazla sermaye kilitlenir — ETH'nin %5'inin stake edilmesi yerine %50'sine sahip olabilirsiniz.

#### Blok alanı ekonomisi (43:58) {#block-space-economics-4358}

Blok alanı, blok limiti — bir bloğun barındırabileceği maksimum boyut — tarafından belirlenir. Tüm blokzincir sistemleri, blok boyutunuz blok limitine yaklaştıkça fiyatların patlamaya başladığı kendi kendini ayarlayan bir ekonomiye sahiptir.

Blok limiti en zayıf düğümün altyapısı tarafından belirlenir. Ethereum'un felsefesi, Venezuela'daki bir ev doğrulayıcısını — saniyede belki 1 megabayt — kabul etmektir. Blok limiti işte böyle belirlenir. Ancak Amazon Web Services üzerinde çalışan tüm staker'lar 10 gigabit bağlantılara sahiptir — en zayıf düğümden 10.000 kat fark.

EigenLayer, bu staker'ların ek blok alanlarını diğer hizmetler için ödünç verebilecekleri serbest bir piyasa yaratarak bunu otomatik olarak çözer. Birisi blok başına 15 milyon gaz yerine 15 giga-gaz ile başka bir zincir kurabilir. Ethereum'un güvenliğinin %60'ı gibi bir şey elde edersiniz — ve bu zaten yeterince iyidir.

#### Staker heterojenliği (48:57) {#staker-heterogeneity-4857}

Staker heterojenliği hesaplama yeteneklerinin ötesine uzanır. Staker'lar risk ve ödül tercihleri konusunda oldukça heterojendir. Siz ve ben, bir Coinbase API çıktısından farklı olursak kesintiye uğrayacağımız konusunda hemfikir olabiliriz, ancak başka biri için bu tamamen kabul edilemezdir. Bu asla bir çekirdek protokole normalize edilemez, ancak isteğe bağlı bir katmana dışsallaştırılabilir.

Staker'lar ödül tercihleri konusunda da heterojendir. Ethereum'da blok alanı renksiz bir niceliktir — tüm işlemler eşittir ve onları ayırt etmenin tek sinyali fiyattır. Ethereum üzerinde bir sosyal ağ kurmak çok zordur çünkü her sosyal ağ işlemi, işlem bazında çok daha kârlı olan bir merkeziyetsiz finans (DeFi) işlemiyle rekabet eder. Çözümümüz: staker'lar, farklı ödül tercihlerine sahip oldukları farklı alt zincirlere katılırlar.

#### Demokratik ve çevik inovasyon (51:01) {#democratic-and-agile-innovation-5101}

EigenLayer, inovasyon konusunda hem demokratik hem de çevik bir blokzincirin nasıl tasarlanacağı sorununu çözer. Ethereum çok demokratik bir şekilde yönetilir ancak aynı zamanda yanıt vermede çok yavaştır. Bugün tüm protokoller çeviklik ve demokratik yönetişim arasında bir ödünleşim (trade-off) yapar. Ethereum artı EigenLayer her iki dünyanın da en iyisini elde eder: demokratik olan ve yavaş güncellenen bir temel katman ve bunun üzerinde EigenLayer, insanların piyasa taleplerine tamamen izinsiz bir şekilde hızlı yanıt veren inovasyonlar inşa etmesine olanak tanır.

#### EigenDA ve kapanış (52:56) {#eigenda-and-closing-5256}

EigenLayer üzerinde köprüler, olay odaklı otomasyon, adil sıralama hizmetleri, yan zincirler ve MEV entegrasyonu oluşturmayı araştırıyoruz. EigenLayer halihazırda dahili test ağlarında yayındadır. İlk kullanım senaryosunu zaten oluşturduk: Ethereum için EigenDA adında hiper ölçekli bir veri kullanılabilirliği katmanı. Silme kodlaması ve polinom taahhütlerindeki en iyi fikirleri bir araya getiren bir veri kullanılabilirliği katmanıdır. Test ağımızda veri yazabilme hızınız saniyede 12,4 megabayttır — Ethereum 2.0'ın sunması planlanandan 10 kat daha büyük.

Temel içgörü şudur ki, silme kodlaması ile bir dosyayı depolamanın toplam maliyeti, katılan düğümlerin sayısına bağlı değildir. Ancak talep edebileceğiniz fiyat düğüm sayısına bağlıdır çünkü daha fazla ekonomik güvenlik sağlıyorsunuz. Operasyonel maliyeti artırmadan bir güvenlik primi talep edebilecekleri için giderek daha fazla düğümün katılacağı kendi kendini ölçeklendiren bir ekonomi vardır. Silme kodlaması, ölçeklenebilirlik ve merkeziyetsizlik arasındaki ödünleşimi bozar — aynı anda tam merkeziyetsizlik ve tam ölçeklenebilirlik elde edersiniz.

#### Soru-Cevap öne çıkanlar (58:00) {#qa-highlights-5800}

**Ara yazılım denetimleri üzerine:** Tıpkı bir akıllı sözleşme denetim ekosistemi olduğu gibi, ara yazılım denetim ekosistemlerine de ihtiyacımız var. Akıllı sözleşme denetimi, hiçbir şey bilmediği varsayılan kullanıcılara hizmet eder. Ara yazılım denetimi, bir şeyler bildiği varsayılan staker'lara hizmet eder. Ara yazılım denetimlerinin çalışmasını sağlayamazsak, akıllı sözleşme denetimlerine de gerçekten güvenmemeliyiz.

**Risk üzerine:** Uç bir örnek — tüm stake, kötü bir şey yapmadan bile kesintiye uğrayabileceğiniz bir EigenLayer sistemine katıldı ve ardından kesintiye uğradınız ve tüm protokol risk altında. Bu mümkündür. Ancak paralarını kaybedenler staker'lardır, bu yüzden katılırken daha dikkatli olmalıdırlar. Dikkatli olmalarını kolaylaştırmak odaklandığımız şeydir.

**Katman 1 (l1) blok alanı ve yan zincirler üzerine:** Ethereum'un güven ağı üzerinde — Solana VM gibi — çok farklı bir sistem çalıştırabilirsiniz. Kesinti koşulu basittir: aynı derinlikte bir bloğu iki kez imzalarsanız, bu zincir içi doğrulanabilir bir koşuldur ve kesintiye uğrarsınız. Maliyet yapısı işe yarar çünkü yeniden staking yapanların ek bir sermaye maliyeti yoktur ve bir EigenLayer yan zinciri ile kendi zincirinize sahip olmak arasındaki fark, yeni bir değer token'ına ihtiyaç duymamanız ve bu token'ın sermaye maliyetini korumak için ödeme yapmanıza gerek olmamasıdır.