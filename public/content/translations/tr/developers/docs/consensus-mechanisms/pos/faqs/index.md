---
title: Sıkça Sorulan Sorular
description: Ethereum'da hisse ispatı üzerine sıkça sorulan sorular.
lang: tr
---

## Hisse ispatı nedir {#what-is-proof-of-stake}

Hisse ispatı, değerli varlıkların dürüst olmayan şekilde hareket eden saldırganlar tarafından kaybedilmesini sağlayarak blok zincirlere güvenlik sağlayabilen bir algoritma çeşitidir. Hisse ispatı sistemleri, bazı varlıkların mevcut olmasını gerektirir ve eğer doğrulayıcı, kanıtlanabilir şekilde sahtekarlık içeren bir davranışa katılırsa bu varlıklar yok edilebilir. Ethereum, blok zinciri güvence altına almak için hisse ispatı mekanizması kullanır.

## Hisse ispatı ile iş ispatı farkları nedir? {#comparison-to-proof-of-work}

Hem iş ispatı hem de hisse ispatı, kötü niyetli aktörleri ağa taciz veya dolandırıcılık yapmaktan ekonomik olarak caydıran mekanizmalardır. Her iki durumda da, mutabakata aktif olarak katılan düğümler, eğer yanlış davranırlarsa kaybedecekleri bir varlığı ağa "yerleştirir".

Hisse ispatında bu varlık enerjidir. Madenci olarak bilinen düğüm, diğer herhangi bir düğümden daha hızlı bir değeri hesaplamayı amaçlayan bir algoritmayı çalıştırır. En hızlı düğüm zincirdeki yeni bloku önerme hakkına sahiptir. Zincirin geçmişini değiştirmek veya blok teklifini domine etmek için bir madencinin her zaman yarışı kazanan kadar büyük bir hesaplama gücüne sahip olması gerekecektir. Bu, engellenemez derecede pahalı ve zor bir işlemdir ve zinciri saldırılardan korur. İş ispatı kullanarak "madencilik" yapmak için gereken enerji, madencilerin ödediği gerçek dünya varlığıdır.

Hisse ispatı, doğrulayıcılar olarak bilinen düğümlerin, açıkça bir kripto varlığını bir akıllı sözleşmeye göndermelerini gerektirir. Bir doğrulayıcı yanlış davranırsa, bu kripto varlık yok edilebilir çünkü doğrulayıcılar varlıklarını enerji harcaması yoluyla dolaylı olarak değil, doğrudan zincire "hisseler".

İş ispatı, madencilik sürecinde elektrik tüketildiği için çok daha fazla enerji tüketimine neden olur. Öte yandan, hisse ispatı ise sadece çok az bir enerji miktarı gerektirir - Ethereum doğrulayıcıları, hatta Raspberry Pi gibi düşük güçlü cihazlarda bile çalışabilir. Ethereum'un hisse ispatı mekanizması, iş ispatına göre daha güvenli olarak düşünülmektedir çünkü saldırmak için gerekli maliyet daha yüksektir ve saldırganın karşılaşacağı sonuçlar daha ciddidir.

İş ispatı ile hisse ispatı arasındaki farklılıklar tartışmalı bir konudur. [Vitalik Buterin'in blogu](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) ve Justin Drake ile Lyn Alden arasındaki tartışma, argümanların iyi bir özetini sunmaktadır.

<YouTube id="1m12zgJ42dI" />

## Hisse ispatı enerji açısından verimli mi? {#is-pos-energy-efficient}

Evet. Hisse ispatı ağındaki düğümler çok az bir enerji kullanır. Üçüncü taraf bir çalışma, tüm Ethereum hisse ispatı ağının yılda yaklaşık 0,0026 TWh enerji tükettiğini sonuçlandırdı - yalnızca ABD'deki oyun sektöründen yaklaşık 13.000 kat daha az.

[Ethereum'un enerji tüketimi hakkında dahası](/energy-consumption/).

## Hisse ispatı güvenli mi? {#is-pos-secure}

Ethereum'un hisse ispatı oldukça güvenlidir. Bu mekanizma, kullanıma geçmeden önce sekiz yıl boyunca titizlikle araştırıldı, geliştirildi ve test edildi. Güvenlik garantileri iş ispatı blok zincirlerinden farklıdır. Hisse ispatında, kötü niyetli doğrulayıcılar aktif olarak cezalandırılabilir ("slashed") ve doğrulayıcı kümesinden çıkarılabilir, bu da önemli miktarda ETH'ye mal olabilir. İş ispatı altında, bir saldırgan yeterli karma gücüne sahip oldukça saldırılarını tekrarlayabilir. Aynı ölçekte saldırıları iş ispatındaki Ethereum'a karşı düzenlemek de hisse ispatındaki gibi daha maliyetlidir. Zincirin canlılığını etkilemek için, ağdaki toplam hisselenmiş etherin en az %33'ü gereklidir (çok sofistike saldırılar ve başarı olasılığı son derece düşük durumlar hariç). Gelecekteki blok içeriğini kontrol etmek için en az %51 toplam hisselenmiş ETH gereklidir ve geçmişi yeniden yazmak için hisselenen toplam token'ın %66'sından fazlasına ihtiyaç vardır. Ethereum protokolü, %33 veya %51 saldırı senaryolarında bu varlıkları yok ederken, %66 saldırı senaryosunda ise sosyal mutabakat yoluyla bu varlıkları yok edebilir.

- [Ethereum'un hisse ispatının saldırganlardan koruma hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Hisse ispatı tasarımı hakkında daha fazlası](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Hisse ispatı Ethereum'u daha ucuz hale getirir mi? {#does-pos-make-ethereum-cheaper}

Hayır. Bir işlem göndermenin maliyeti (gaz ücreti), daha fazla ağ talebiyle artan dinamik bir ücret piyasası tarafından belirlenir. Mutabakat mekanizması bunu doğrudan etkilemez.

[Gaz ](/developers/docs/gas)hakkında daha fazlası.

## Düğümler, istemciler ve doğrulayıcılar nedir? {#what-are-nodes-clients-and-validators}

Düğümler, Ethereum ağına bağlı bilgisayarlardır. İstemciler, bilgisayarı bir düğüm haline getirirken çalıştırdıkları yazılımdır. İki tür istemci vardır: yürütüm istemcileri ve fikir birliği istemcileri. Hem yürütüm istemcileri hem de fikir birliği istemcileri bir düğüm oluşturmak için gereklidir. Bir doğrulayıcı, bir fikir birliği istemcisine isteğe bağlı olarak eklenen ve düğümün hisse ispatı uzlaşısına katılmasını sağlayan bir eklentidir. Bu, seçildiklerinde bloklar oluşturup teklif etmeyi ve ağda duydukları blokları onaylamayı içerir. Bir doğrulayıcı çalıştırmak için düğüm işletmecisinin 32 ETH'yi mevduat sözleşmesine yatırması gerekmektedir.

- [Düğümler ve istemciler hakkında daha fazlası](/developers/docs/nodes-and-clients)
- [Stake etme hakkında daha fazla bilgi](/staking)

## Hisse ispatı yeni bir fikir midir? {#is-pos-new}

Hayır. Bir kullanıcı, BitcoinTalk [forumunda 2011 yılında Bitcoin'e bir yükseltme olarak hisse ispatının](https://bitcointalk.org/index.php?topic=27787.0) temel fikrini önerdi. Bu, Ethereum Ana Ağı'na yerleştirmeye hazır olmasından 11 yıl önceydi. Bazı diğer zincirler hisse ispatını Ethereum'dan önce yerleştirdi ancak Ethereum'un özgül mekanizmasını (Gasper olarak bilinen) yerleştiremedi.

## Ethereum'un hisse ispatıyla ilgili özel olan nedir? {#why-is-ethereum-pos-special}

Ethereum'un hisse ispatı mekanizması kendi tasarımına özgüdür. Tasarlanan ve yerleştirilen ilk hisse ispatı mekanizması bu değildi, ancak en güçlüsüdür. Hisse ispatı mekanizması ''Casper'' olarak bilinir. Casper, doğrulayıcıların blok önermek için nasıl seçildiğini, tasdiklenmenin nasıl ve ne zaman yapıldığını, tasdiklemelerin nasıl sayıldığını, doğrulayıcılara verilen ödülleri ve cezaları, cezalandırma koşullarını, hareketsizlik gibi güvenlik mekanizmalarını ve "kesinlik" koşullarını tanımlar. Kesinlik; bir blokun gerçekçi zincirin sürekli parçası olarak algılanmasını sağlayan duurmdur, hisselenmiş ETH'lerin en az %66'sı tarafından oylanmış olması gerekir. Geliştiriciler Casper'i özellikle Ethereum için oluşturdu ve Ethereum da Casper'in işletildiği ilk ve tek blok zincirdir.

Casper'a ek olarak, Ethereum'un hisse ispatı LMD-GHOST adlı bir çatal seçim algoritması kullanır. Bu, aynı yuva için iki blok var olduğunda ortaya çıkan bir durumda gereklidir. Bu, blok zincirin iki ayrı çatalını oluşturur. LMD-GHOST, en fazla "yoğunluğa" sahip olanı seçer. Yoğunluk, doğrulayıcıların etkin bakiyesiyle ağırlıklı olarak hesaplanan tasdiklerin sayısıdır. LMD-GHOST, Ethereum'a özgüdür.

Casper ve LMD-GHOST'un kombinasyonuna Gasper denir.

[Gasper hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/gasper/)

## Cezalandırma nedir? {#what-is-slashing}

Cezalandırma, bir doğrulayıcının bazı kilitli token'larının yok edilmesi ve doğrulayıcının ağdan çıkarılması işlemine verilen terimdir. Cezalandırma işlemi sonucu kaybedilen ETH miktarı, uzaklaştırılan doğrulayıcı sayısıyla ölçeklenir - bu, iş birliği yapan doğrulayıcıların bireylere kıyasla daha ağır şekilde cezalandırılmasına neden olur.

[Cezalandırma hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Neden doğrulayıcılar 32 ETH'ye ihtiyaç duyar? {#why-32-eth}

Doğrulayıcılar eğer kötü davranırlarsa kaybedecek bir şeyleri olsun diye 32 ETH hisselemek zorundalar. Neden özellikle 32 ETH hisselemek zorunda olduklarının sebebiyse düğümlerin en uygun yazılımal yürümesine imkân sağlamaktır. Eğer doğrulayıcı başına asgari ETH tutarı daha az olsaydı doğrulayıcı sayısı ve dolayısıyla her bir yuvada işlenmesi gereken mesaj miktarı artacaktı ki, bu da düğümlerin yürütülmesi için daha güçlü donanımlara ihtiyaç duyulacağı demektir.

## Doğrulayıcılar nasıl seçilir? {#how-are-validators-selected}

Her yuva için tek bir doğrulayıcı, her blok önerisini rastgele seçmek üzere RANDAO adlı bir algoritma kullanarak seçilir. Bu algoritma, blok önerisinde bulunan bir karma ile her blokta güncellenen bir tohumun karıştırılmasıyla çalışır. Bu değer, toplam doğrulayıcı kümesinden belirli bir doğrulayıcıyı seçmek için kullanılır. Doğrulayıcı seçimi, iki dönem öncesinden belirlenir.

[Doğrulayıcı seçimi hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Kilit öğütme nedir? {#what-is-stake-grinding}

Kilit öğütme, saldırganın kendi doğrulayıcılarını lehine seçici algoritmayı yönlendirmeye çalıştığı bir hisse ispatı ağ saldırısı türüdür. RanDAO'ya yönelik yapılan kilit öğütme saldırıları için hisselenen toplam ETH'nin yaklaşık yarısı gereklidir.

[Kilit öğütme hakkında daha fazlası](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Sosyal cezalandırma nedir? {#what-is-social-slashing}

Sosyal cezalandırma, topluluğun bir saldırıya yanıt olarak blok zincirin bir çatalını yönetme yeteneğidir. Bu, topluluğun, bir saldırının dürüst olmayan bir zinciri kesinleştirmesinin ardından kurtulmasını sağlar. Sosyal cezalandırma, sansür saldırılarına karşı da kullanılabilir.

- [Sosyal cezalandırma hakkında daha fazlası](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin'in sosyal cezalandırma hakkındaki görüşleri](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Cezalandırılacak mıyım? {#will-i-get-slashed}

Bir doğrulayıcı olarak, kasıtlı olarak kötü niyetli davranışlarda bulunmadıkça cezalandırılmak oldukça zordur. Cezalandırma, doğrulayıcıların aynı yuva için birden fazla blok önerdiği veya tasdiklemeleriyle çeliştiği çok belirli senaryolarda uygulanır - bunların kazara meydana gelme olasılığı çok düşüktür.

[Cezalandırma koşulları hakkında daha fazlası](https://eth2book.info/altair/part2/incentives/slashing)

## Riske atmama sorunu nedir? {#what-is-nothing-at-stake-problem}

Riske atmama sorunu, bazı hisse ispatı mekanizmalarında yalnızca ödüllerin ve cezaların olmadığı bir kavramsal sorundur. Eğer hiçbir şey riske atılmamışsa, faydacı bir doğrulayıcı, ödüllerini artırdığı için herhangi bir blok zincir çatalına veya hatta birden çok çatala tanıklık etmekten eşit derecede memnun olur. Ethereum, tek bir kanonik zinciri sağlamak için kesinlik koşullarını ve cezalandırmayı kullanarak bunu aşar.

[Riske atmama hakkında daha fazlası](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Çatal seçim algoritması nedir? {#what-is-a-fork-choice-algorithm}

Bir çatal seçim algoritması hangi zincirin gerçekçi zincir olacağına karar veren kuralları işler. En uygun koşullar altında herhangi bir çatal seçim kuralına gerek yoktur çünkü yuva başına bir blok önerici ve seçilen bir blok vardır. Ancak kimi zaman aynı yuva için birden fazla blok veya geç gelen bilgi, başa yakın blokların nasıl düzenleneceği konusunda birden fazla seçeneğe yol açabilir. Bu durumlarda tüm müşteriler, hepsinin aynı blok sekanslarını seçtiğinden emin olmak adına bazı kuralları işlemelidir. Çatal seçim algoritması bu kuralları kodlar.

Ethereum'un çatal seçim algoritmasına LMD-GHOST denir. Bu; en çok tasdik ağırlığına sahip yani en fazla hisselenmiş ETH'nin oy verdiği çatalı seçer.

[LMD-GHOST hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Hisse ispatı içinde kesinlik ne demektir? {#what-is-finality}

Hisse ispatı içinde kesinlik; belirli bir blokun gerçekçi zincirin sürekli bir parçası olduğunu garanti altına alır ve eğer saldırganın toplam hisselenmiş etherin %33'ünü yaktığı bir mutabakat hatası olmazsa geri çevrilemez. Bu, ''ihtimali kesinlik'' de denen kripto-ekonomik kesinlik, iş ispatı blok zincirleriyle alakalıdır. İhtimali kesinlikte, bloklar için açıkça kesinleşmiş/kesinleşmemiş durumlar yoktur - blok yaşlandıkça, blokun zincirden kaldırılma olasılığı giderek azalır ve kullanıcılar kendileri için bir blokun ne zaman yeterince "güvenli" olduğuna karar verir. Kripto-ekonomik kesinlik ile birlikte kontrol noktası blok çiftleri, hisselenmiş etherin %66'sı tarafından oylanmak zorundadır. Eğer bu şart sağlanırsa bu kontrol noktaları arasındaki bloklar açık bir şekilde ''kesinleştirilir''.

[Kesinlik hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/#finality)

## ''Zayıf öznellik'' nedir? {#what-is-weak-subjectivity}

Zayıf öznellik; blok zincirin mevcut durumunu doğrulamak için sosyal bilginin kullanıldığı, hisse ispatı ağlarının bir özelliğidir. Yeni düğümlere veya uzun bir çevrimdışı sürenin ardından ağa tekrar katılan düğümlere, düğümün doğru zincirde olup olmadığını hemen görebilecekleri şu anlık durum verilebilir. Bu durumlar "zayıf öznellik kontrol noktaları" olarak bilinir ve bunlar, diğer düğüm operatörlerinden dışta veya blok gezginlerinden ya da çeşitli genel uç noktalardan elde edilebilir.

[Zayıf öznellik hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Hisse ispatı sansüre dirençli midir? {#is-pos-censorship-resistant}

Sansür direncini kanıtlamak şu anda zordur. Ancak iş ispatının aksine hisse ispatı, sansür uygulayan doğrulayıcıların iptallerinin koordine edilme seçeneğini sunar. Protokole; blok inşacıları blok önericilerden ayıracak ve inşacıların her bir blokta dahil etmesi gereken yürütme listesini işletecek olan gelecek değişiklikler vardır. Bu öneri, önerici-inşacı ayrımı olarak bilinir ve doğrulayıcıların yürütmelere sansür uygulmasını engellemeye yardım eder.

[Önerici-inşacı ayrımı hakkında daha fazlası](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Ethereum hisse ispatı sistemi %51 saldırılabilir mi? {#pos-51-attack}

Evet. Hisse ispatları, tıpkı iş ispatlarının olduğu gibi %51 saldırılarına karşı hassastır. Saldırganın ağın karma gücünün %51'ini gerektirmesinden ziyade saldırgan, toplam hisselenmiş ETH'lerin %51'ine ihtiyaç duyar. Toplam hisselemenin %51'ini biriktiren bir saldırgan çatal seçim algoritmasının kontrolünü ele alır. Bu, saldırganın belirli işlemleri sansürlemesine, kısaca yeniden düzenlemeler yapmasına ve blokları kendi lehine yeniden sıralayarak MEV (Maksimum Çıkarılabilir Değer) çıkarmasına imkân tanır.

[Hisse ispatına saldırılar hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Sosyal koordinasyon nedir, buna neden ihtiyaç duyulur? {#what-is-social-coordination}

Sosyal koordinasyon, dürüst blokların kesinleşmiş olanları düzeltmek amacıyla bir saldırıdan kurtulunması ve Ethereum için son savunma hattı olarak kullanılır. Bu durumda, Ethereum topluluğu "dışta" koordine olup dürüst bir azınlık çatalını kullanmayı kabul etmek zorunda kalır ve bu süreçte saldırganın doğrulayıcılarını cezalandırır. Bu, uygulamaların ve borsaların dürüst çatalı tanımasını gerektirir.

[Sosyal koordinasyon hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Hisse ispatında daha zengin olabilir miyim? {#do-rich-get-richer}

Birinin hisselemesi gereken ETH miktarı ne kadar yüksekse, o kadar fazla doğrulayıcı çalıştırabilir ve o kadar çok ödül birikebilir. Ödüller hisselenen ETH miktarıyla doğrusal olarak ölçeklendirilir ve herkes aynı yüzde oranında getiri elde eder. Hisse ispatı aksine, iş ispatı zenginleri daha fazla zenginleştirir çünkü ölçeklendirilen donanım satın alan daha zengin madenciler, ölçeklendirme ekonomisinden faydalanır ve bu da servet ile ödül arasındaki ilişkinin doğrusal olmayan bir şekilde artmasına neden olur.

## Hisse ispatı iş ispatından daha merkezi midir? {#is-pos-decentralized}

Hayır, iş ispatı, madencilik maliyetleri arttıkça bireyleri, ardından küçük şirketleri dışlayarak merkezileşmeye doğru eğilim gösterir. Hisse ispatının mevcut sorunu, likit hisseleme türevlerinin (LSD'ler) etkisidir. Bunlar, gerçek ETH'nin çıkartılmadan herkesin ikincil piyasalarda takas edebileceği bir sağlayıcı tarafından hisselenen ETH'yi temsil eden token'lardır. LSD'ler, kullanıcıların 32 ETH'den az bir miktarla hisselemesine olanak tanır, ancak aynı zamanda birkaç büyük organizasyonun çoğunluğu hisseleme miktarını kontrol etme riski yaratır. Bu nedenle, Ethereum için [solo hisseleme](/staking/solo) en iyi seçenektir.

[LSD'lerde hisse merkezileşmesi konusunda daha fazlası](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Neden sadece ETH hisseleyebilirim? {#why-can-i-only-stake-eth}

ETH, Ethereum'un doğal para birimidir. Tüm hisselerin etkili dengelemelerini hesaplamak ve oy ağırlıklarını belirlemek için tek bir para birimine ihtiyaç vardır; aynı zamanda güvenlik açısından da önemlidir. ETH, bir akıllı sözleşme değil, Ethereum'un temel bir bileşenidir. Başka para birimlerini dahil etmek, hisselemenin karmaşıklığını önemli ölçüde artırır ve güvenliği azaltır.

## Ethereum, hisse ispatı kullanılan tek blok zincir mi? {#is-ethereum-the-only-pos-blockchain}

Hayır, birkaç tane hisse ispatı blok zinciri bulunmaktadır. Hiçbiri Ethereum'a tam olarak benzemez, Ethereum'un hisse ispatı mekanizması benzersizdir.

## Birleşim nedir? {#what-is-the-merge}

Birleşim, Ethereum'un iş ispatı tabanlı mutabakat mekanizmasını kapattığı ve hisse ispatı tabanlı mutabakat mekanizmasını devreye aldığı an olarak adlandırılır. Birleşim, 15 Eylül 2022'de gerçekleşti.

[Birleştirme hakkında ek bilgi](/roadmap/merge)

## Cansızlık ve güvenlilik nedir? {#what-are-liveness-and-safety}

Cansızlık ve güvenlik, bir blok zincir için temel güvenlik endişeleridir. Cansızlık, bir zincirin kesinleştirilebilir olma durumunu ifade eder. Zincir kesinleştirmeyi durdurursa veya kullanıcılar buna kolayca erişemezse, bunlar cansızlık hataları olarak kabul edilir. Erişim maliyetinin aşırı derecede yüksek olması da bir cansızlık hatası olarak değerlendirilebilir. Güvenlik, zincire saldırıların ne kadar zor olduğunu ifade eder - yani çelişen kontrol noktalarını kesinleştirmektir.

[Casper kağıdı hakkında daha fazlası](https://arxiv.org/pdf/1710.09437.pdf)
