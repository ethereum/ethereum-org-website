---
title: Sıkça Sorulan Sorular
description: Hisse kanıtı (PoS) Ethereum hakkında sıkça sorulan sorular.
lang: tr
---

## Hisse kanıtı (PoS) nedir? {#what-is-proof-of-stake}

Hisse kanıtı (PoS), dürüst olmayan şekilde davranan saldırganların değerli varlıklarını kaybetmelerini sağlayarak blokzincirlere güvenlik sağlayabilen bir algoritma sınıfıdır. Hisse kanıtı sistemleri, bir dizi doğrulayıcının, doğrulayıcının kanıtlanabilir şekilde dürüst olmayan bir davranışta bulunması durumunda yok edilebilecek bir varlığı erişilebilir kılmasını gerektirir. Ethereum, blokzinciri güvence altına almak için bir hisse kanıtı mekanizması kullanır.

## Hisse kanıtı (PoS) ile iş kanıtı (PoW) nasıl karşılaştırılır? {#comparison-to-proof-of-work}

Hem iş kanıtı (PoW) hem de hisse kanıtı (PoS), kötü niyetli aktörleri ağa spam göndermekten veya ağı dolandırmaktan ekonomik olarak caydıran mekanizmalardır. Her iki durumda da, mutabakata aktif olarak katılan düğümler, kötü davrandıklarında kaybedecekleri bir varlığı "ağa" koyarlar.

İş kanıtında bu varlık enerjidir. Madenci olarak bilinen düğüm, bir değeri diğer tüm düğümlerden daha hızlı hesaplamayı amaçlayan bir algoritma çalıştırır. En hızlı düğüm, zincire bir blok teklif etme hakkına sahip olur. Zincirin geçmişini değiştirmek veya blok teklifine hükmetmek için bir madencinin yarışı her zaman kazanacak kadar çok hesaplama gücüne sahip olması gerekir. Bu, aşırı derecede pahalı ve gerçekleştirilmesi zor bir işlemdir, bu da zinciri saldırılardan korur. İş kanıtı kullanarak "madencilik" yapmak için gereken enerji, madencilerin bedelini ödediği gerçek dünyadan bir varlıktır.

Hisse kanıtı, doğrulayıcı olarak bilinen düğümlerin bir akıllı sözleşmeye açıkça bir kripto varlık sunmasını gerektirir. Bir doğrulayıcı kötü davranırsa, varlıklarını enerji harcaması yoluyla dolaylı olarak değil, doğrudan zincire "stake ettikleri" için bu kripto yok edilebilir.

İş kanıtı çok daha fazla enerjiye açtır çünkü madencilik sürecinde elektrik yakılır. Hisse kanıtı ise yalnızca çok küçük bir miktar enerji gerektirir; Ethereum doğrulayıcıları Raspberry Pi gibi düşük güçlü bir cihazda bile çalışabilir. Ethereum'un hisse kanıtı mekanizmasının iş kanıtından daha güvenli olduğu düşünülmektedir çünkü saldırmanın maliyeti daha yüksektir ve bir saldırgan için sonuçları daha ağırdır.

İş kanıtı ile hisse kanıtı karşılaştırması tartışmalı bir konudur. [Vitalik Buterin'in blogu](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) ile Justin Drake ve Lyn Alden arasındaki tartışma, argümanların iyi bir özetini sunmaktadır.

<VideoWatch slug="pow-vs-pos" />

## Hisse kanıtı (PoS) enerji açısından verimli midir? {#is-pos-energy-efficient}

Evet. Bir hisse kanıtı ağındaki düğümler çok az miktarda enerji kullanır. Üçüncü taraf bir çalışma, tüm hisse kanıtı Ethereum ağının yılda yaklaşık 0,0026 TWh tükettiği sonucuna varmıştır; bu, yalnızca ABD'deki oyun sektöründen yaklaşık 13.000 kat daha azdır.

[Ethereum'un enerji tüketimi hakkında daha fazla bilgi](/energy-consumption/).

## Hisse kanıtı (PoS) güvenli midir? {#is-pos-secure}

Ethereum'un hisse kanıtı çok güvenlidir. Mekanizma, yayına girmeden önce sekiz yıl boyunca titizlikle araştırılmış, geliştirilmiş ve test edilmiştir. Güvenlik garantileri, iş kanıtı blokzincirlerinden farklıdır. Hisse kanıtında, kötü niyetli doğrulayıcılar aktif olarak cezalandırılabilir ("ceza kesintisi" uygulanabilir) ve doğrulayıcı setinden çıkarılabilir, bu da onlara önemli miktarda ETH'ye mal olur. İş kanıtı altında, bir saldırgan yeterli hash gücüne sahip olduğu sürece saldırısını tekrarlamaya devam edebilir. Hisse kanıtı Ethereum'da eşdeğer saldırılar düzenlemek, iş kanıtı altındakinden daha maliyetlidir. Zincirin canlılığını etkilemek için, ağda stake edilen toplam Ether'in en az %33'ü gereklidir (başarı olasılığı son derece düşük olan çok karmaşık saldırı durumları hariç). Gelecekteki blokların içeriğini kontrol etmek için toplam stake edilen ETH'nin en az %51'i, geçmişi yeniden yazmak için ise toplam stake'in %66'sından fazlası gereklidir. Ethereum protokolü, %33 veya %51 saldırısı senaryolarında bu varlıkları yok eder ve %66 saldırısı senaryosunda ise sosyal mutabakat yoluyla bunu gerçekleştirir.

- [Ethereum hisse kanıtını saldırganlardan korumak hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Hisse kanıtı tasarımı hakkında daha fazla bilgi](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Hisse kanıtı (PoS) Ethereum'u daha ucuz hale getirir mi? {#does-pos-make-ethereum-cheaper}

Hayır. Bir işlem göndermenin maliyeti (gaz ücreti), daha fazla ağ talebiyle artan dinamik bir ücret piyasası tarafından belirlenir. Mutabakat mekanizması bunu doğrudan etkilemez.

[Gaz hakkında daha fazla bilgi](/developers/docs/gas).

## Düğümler, istemciler ve doğrulayıcılar nelerdir? {#what-are-nodes-clients-and-validators}

Düğümler, Ethereum ağına bağlı bilgisayarlardır. İstemciler, bilgisayarı bir düğüme dönüştürmek için çalıştırdıkları yazılımlardır. İki tür istemci vardır: yürütme istemcileri ve fikir birliği istemcileri. Bir düğüm oluşturmak için her ikisine de ihtiyaç vardır. Bir doğrulayıcı, düğümün hisse kanıtı mutabakatına katılmasını sağlayan, fikir birliği istemcisine isteğe bağlı bir eklentidir. Bu, seçildiğinde bloklar oluşturmak ve teklif etmek ile ağda duydukları blokları onaylamak anlamına gelir. Bir doğrulayıcı çalıştırmak için düğüm operatörünün yatırma sözleşmesine 32 ETH yatırması gerekir.

- [Düğümler ve istemciler hakkında daha fazla bilgi](/developers/docs/nodes-and-clients)
- [Staking hakkında daha fazla bilgi](/staking)

## Hisse kanıtı (PoS) yeni bir fikir mi? {#is-pos-new}

Hayır. BitcoinTalk'taki bir kullanıcı 2011 yılında Bitcoin için bir yükseltme olarak [hisse kanıtının temel fikrini teklif etti](https://bitcointalk.org/index.php?topic=27787.0). Ethereum Ana Ağı üzerinde uygulanmaya hazır hale gelmesi on bir yıl sürdü. Diğer bazı zincirler hisse kanıtını Ethereum'dan daha önce uyguladı, ancak Ethereum'un (Gasper olarak bilinen) özel mekanizmasını değil.

## Ethereum'un hisse kanıtının (PoS) özelliği nedir? {#why-is-ethereum-pos-special}

Ethereum'un hisse kanıtı mekanizması tasarımı itibarıyla benzersizdir. Tasarlanan ve uygulanan ilk hisse kanıtı mekanizması değildi, ancak en sağlam olanıdır. Hisse kanıtı mekanizması "Casper" olarak bilinir. Casper; doğrulayıcıların blok teklif etmek için nasıl seçildiğini, onayların nasıl ve ne zaman yapıldığını, onayların nasıl sayıldığını, doğrulayıcılara verilen ödülleri ve cezaları, ceza kesintisi koşullarını, hareketsizlik sızıntısı gibi arıza emniyeti mekanizmalarını ve "kesinlik" koşullarını tanımlar. Kesinlik, bir bloğun kurallı zincirin kalıcı bir parçası olarak kabul edilebilmesi için ağda stake edilen toplam ETH'nin en az %66'sı tarafından oylanmış olması koşuludur. Araştırmacılar Casper'ı özel olarak Ethereum için geliştirdiler ve Ethereum bunu uygulayan ilk ve tek blokzincirdir.

Casper'a ek olarak, Ethereum'un hisse kanıtı LMD-GHOST adı verilen bir çatallanma seçimi algoritması kullanır. Bu, aynı slot için iki bloğun var olduğu bir durumun ortaya çıkması halinde gereklidir. Bu, blokzincirin iki çatallanmasını yaratır. LMD-GHOST, onayların en büyük "ağırlığına" sahip olanı seçer. Ağırlık, doğrulayıcıların etkin bakiyesi ile ağırlıklandırılmış onay sayısıdır. LMD-GHOST Ethereum'a özgüdür.

Casper ve LMD-GHOST kombinasyonu Gasper olarak bilinir.

[Gasper hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pos/gasper/)

## Ceza kesintisi (slashing) nedir? {#what-is-slashing}

Ceza kesintisi, bir doğrulayıcının stake'inin bir kısmının yok edilmesine ve doğrulayıcının ağdan atılmasına verilen terimdir. Bir ceza kesintisinde kaybedilen ETH miktarı, ceza kesintisine uğrayan doğrulayıcıların sayısıyla orantılıdır; bu, gizli anlaşma yapan doğrulayıcıların bireylerden daha ağır şekilde cezalandırıldığı anlamına gelir.

[Ceza kesintisi hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Doğrulayıcıların neden 32 ETH'ye ihtiyacı var? {#why-32-eth}

Doğrulayıcıların, kötü davrandıklarında kaybedecekleri bir şeyleri olması için ETH stake etmeleri gerekir. Özellikle 32 ETH stake etmelerinin gerekmesinin nedeni, düğümlerin mütevazı donanımlarda çalışmasını sağlamaktır. Doğrulayıcı başına minimum ETH daha düşük olsaydı, doğrulayıcı sayısı ve dolayısıyla her slotta işlenmesi gereken mesaj sayısı artardı, bu da bir düğümü çalıştırmak için daha güçlü bir donanımın gerekeceği anlamına gelirdi.

## Doğrulayıcılar nasıl seçilir? {#how-are-validators-selected}

Her slotta bir blok teklif etmek üzere, blok teklifçisinden gelen bir hash'i her blokta güncellenen bir tohumla karıştıran RANDAO adlı bir algoritma kullanılarak sözde rastgele tek bir doğrulayıcı seçilir. Bu değer, toplam doğrulayıcı setinden belirli bir doğrulayıcıyı seçmek için kullanılır. Doğrulayıcı seçimi iki dönem (epoch) önceden sabitlenir.

[Doğrulayıcı seçimi hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Stake öğütme nedir? {#what-is-stake-grinding}

Stake öğütme, saldırganın doğrulayıcı seçimi algoritmasını kendi doğrulayıcıları lehine yönlendirmeye çalıştığı, hisse kanıtı ağlarına yönelik bir saldırı kategorisidir. RANDAO üzerindeki stake öğütme saldırıları, toplam stake edilen ETH'nin yaklaşık yarısını gerektirir.

[Stake öğütme hakkında daha fazla bilgi](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Sosyal kesinti nedir? {#what-is-social-slashing}

Sosyal kesinti, topluluğun bir saldırıya yanıt olarak blokzincirin bir çatallanmasını koordine etme yeteneğidir. Topluluğun, dürüst olmayan bir zinciri kesinleştiren bir saldırgandan kurtulmasını sağlar. Sosyal kesinti, sansür saldırılarına karşı da kullanılabilir.

- [Sosyal kesinti hakkında daha fazla bilgi](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin'in sosyal kesinti hakkındaki görüşleri](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Ceza kesintisine uğrayacak mıyım? {#will-i-get-slashed}

Bir doğrulayıcı olarak, kasıtlı olarak kötü niyetli bir davranışta bulunmadığınız sürece ceza kesintisine uğramanız çok zordur. Ceza kesintisi yalnızca doğrulayıcıların aynı slot için birden fazla blok teklif ettiği veya onaylarıyla kendileriyle çeliştiği çok özel senaryolarda uygulanır; bunların kazara ortaya çıkması pek olası değildir.

[Ceza kesintisi koşulları hakkında daha fazla bilgi](https://eth2book.info/altair/part2/incentives/slashing)

## Kaybedecek bir şey yok problemi nedir? {#what-is-nothing-at-stake-problem}

Kaybedecek bir şey yok problemi, yalnızca ödüllerin olduğu ve cezaların olmadığı bazı hisse kanıtı mekanizmalarındaki kavramsal bir sorundur. Eğer kaybedecek bir şey yoksa, pragmatik bir doğrulayıcı blokzincirin herhangi bir çatallanmasını, hatta birden fazla çatallanmasını onaylamaktan eşit derecede mutlu olur, çünkü bu onların ödüllerini artırır. Ethereum, tek bir kurallı zincir sağlamak için kesinlik koşullarını ve ceza kesintisini kullanarak bu sorunu aşar.

[Kaybedecek bir şey yok problemi hakkında daha fazla bilgi](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Çatallanma seçimi algoritması nedir? {#what-is-a-fork-choice-algorithm}

Bir çatallanma seçimi algoritması, hangi zincirin kurallı zincir olduğunu belirleyen kuralları uygular. Optimum koşullar altında, slot başına yalnızca bir blok teklifçisi ve aralarından seçim yapılabilecek tek bir blok olduğu için bir çatallanma seçimi kuralına gerek yoktur. Ancak bazen, aynı slot için birden fazla blok veya geç gelen bilgiler, zincirin başındaki blokların nasıl organize edileceğine dair birden fazla seçeneğe yol açar. Bu durumlarda, tüm istemcilerin doğru blok dizisini seçtiklerinden emin olmak için bazı kuralları aynı şekilde uygulaması gerekir. Çatallanma seçimi algoritması bu kuralları kodlar.

Ethereum'un çatallanma seçimi algoritması LMD-GHOST olarak adlandırılır. En büyük onay ağırlığına sahip olan çatallanmayı, yani en çok stake edilen ETH'nin oy verdiği çatallanmayı seçer.

[LMD-GHOST hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Hisse kanıtında (PoS) kesinlik nedir? {#what-is-finality}

Hisse kanıtında kesinlik, belirli bir bloğun kurallı zincirin kalıcı bir parçası olduğunun ve bir saldırganın toplam stake edilen Ether'in %33'ünü yaktığı bir mutabakat hatası olmadığı sürece geri alınamayacağının garantisidir. Bu, iş kanıtı blokzincirleriyle ilgili olan "olasılıksal kesinlik" kavramının aksine "kripto-ekonomik" kesinliktir. Olasılıksal kesinlikte, bloklar için açıkça kesinleşmiş/kesinleşmemiş durumlar yoktur; bir bloğun eskidikçe zincirden çıkarılma olasılığı giderek azalır ve kullanıcılar bir bloğun "güvenli" olduğundan ne zaman yeterince emin olduklarına kendileri karar verirler. Kripto-ekonomik kesinlikte, kontrol noktası blok çiftlerinin stake edilen Ether'in %66'sı tarafından oylanması gerekir. Bu koşul sağlanırsa, bu kontrol noktaları arasındaki bloklar açıkça "kesinleşmiş" olur.

[Kesinlik hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pos/#finality)

## "Zayıf öznellik" nedir? {#what-is-weak-subjectivity}

Zayıf öznellik, blokzincirin mevcut durumunu doğrulamak için sosyal bilgilerin kullanıldığı hisse kanıtı ağlarının bir özelliğidir. Yeni düğümlere veya uzun süre çevrimdışı kaldıktan sonra ağa yeniden katılan düğümlere, düğümün doğru zincirde olup olmadığını hemen görebilmesi için yakın zamana ait bir durum verilebilir. Bu durumlar "zayıf öznellik kontrol noktaları" olarak bilinir ve diğer düğüm operatörlerinden bant dışı olarak, blok gezginlerinden veya çeşitli halka açık uç noktalardan elde edilebilirler.

[Zayıf öznellik hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Hisse kanıtı (PoS) sansüre dirençli midir? {#is-pos-censorship-resistant}

Sansüre dirençli olmayı şu anda kanıtlamak zordur. Ancak iş kanıtından farklı olarak hisse kanıtı, sansür uygulayan doğrulayıcıları cezalandırmak için ceza kesintilerini koordine etme seçeneği sunar. Protokolde, blok inşacılarını blok teklifçilerinden ayıran ve inşacıların her bloğa dahil etmesi gereken işlem listelerini uygulayan yaklaşan değişiklikler vardır. Bu teklif, teklifçi-oluşturucu ayrımı (PBS) olarak bilinir ve doğrulayıcıların işlemleri sansürlemesini önlemeye yardımcı olur.

[Teklifçi-oluşturucu ayrımı (PBS) hakkında daha fazla bilgi](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Ethereum'un hisse kanıtı (PoS) sistemine %51 saldırısı yapılabilir mi? {#pos-51-attack}

Evet. Hisse kanıtı, tıpkı iş kanıtı gibi %51 saldırılarına karşı savunmasızdır. Saldırganın ağın hash gücünün %51'ine ihtiyaç duyması yerine, toplam stake edilen ETH'nin %51'ine ihtiyacı vardır. Toplam stake'in %51'ini biriktiren bir saldırgan, çatallanma seçimi algoritmasını kontrol etme hakkı kazanır. Bu, saldırganın belirli işlemleri sansürlemesine, kısa menzilli yeniden düzenlemeler yapmasına ve blokları kendi lehine yeniden sıralayarak MEV elde etmesine olanak tanır.

[Hisse kanıtı saldırıları hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Sosyal koordinasyon nedir ve neden gereklidir? {#what-is-social-coordination}

Sosyal koordinasyon, dürüst olmayan blokları kesinleştiren bir saldırıdan dürüst bir zincirin kurtarılmasına olanak tanıyan, Ethereum için son bir savunma hattıdır. Bu durumda, Ethereum topluluğunun "bant dışı" koordine olması ve bu süreçte saldırganın doğrulayıcılarına ceza kesintisi uygulayarak dürüst bir azınlık çatallanmasını kullanmayı kabul etmesi gerekir. Bu, uygulamaların ve borsaların da dürüst çatallanmayı tanımasını gerektirir.

[Sosyal koordinasyon hakkında daha fazla bilgi edinin](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Hisse kanıtında (PoS) zenginler daha mı zengin olur? {#do-rich-get-richer}

Birinin stake edecek ne kadar çok ETH'si varsa, o kadar çok doğrulayıcı çalıştırabilir ve o kadar çok ödül biriktirebilir. Ödüller, stake edilen ETH miktarıyla doğrusal olarak ölçeklenir ve herkes aynı oranda getiri elde eder. İş kanıtı, zenginleri hisse kanıtından daha fazla zenginleştirir çünkü büyük ölçekte donanım satın alan daha zengin madenciler ölçek ekonomilerinden yararlanır, bu da zenginlik ile ödül arasındaki ilişkinin doğrusal olmadığı anlamına gelir.

## Hisse kanıtı (PoS) iş kanıtından (PoW) daha mı merkezidir? {#is-pos-decentralized}

Hayır, iş kanıtı merkezileşmeye eğilimlidir çünkü madencilik maliyetleri artar ve önce bireyleri, ardından küçük şirketleri ve benzerlerini piyasanın dışına iter. Hisse kanıtı ile ilgili mevcut sorun, likit staking türevlerinin (LSD'ler) etkisidir. Bunlar, gerçek ETH'nin stake'i kaldırılmadan herkesin ikincil piyasalarda takas edebileceği, bir sağlayıcı tarafından stake edilen ETH'yi temsil eden tokenlardır. LSD'ler, kullanıcıların 32 ETH'den daha az bir miktarla stake yapmasına olanak tanır, ancak aynı zamanda birkaç büyük kuruluşun stake'in büyük bir kısmını kontrol etmesiyle sonuçlanabilecek bir merkezileşme riski de yaratır. Bu nedenle [bireysel staking](/staking/solo) Ethereum için en iyi seçenektir.

[LSD'lerde stake merkezileşmesi hakkında daha fazla bilgi](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Neden sadece ETH stake edebilirim? {#why-can-i-only-stake-eth}

ETH, Ethereum'un yerel para birimidir. Hem oyları ağırlıklandırmak için etkin bakiyelerin muhasebeleştirilmesi hem de güvenlik açısından tüm stake'lerin cinsinden ifade edildiği tek bir para birimine sahip olmak esastır. ETH'nin kendisi bir akıllı sözleşmeden ziyade Ethereum'un temel bir bileşenidir. Diğer para birimlerini dahil etmek, karmaşıklığı önemli ölçüde artıracak ve staking güvenliğini azaltacaktır.

## Ethereum tek hisse kanıtı (PoS) blokzinciri midir? {#is-ethereum-the-only-pos-blockchain}

Hayır, birkaç hisse kanıtı blokzinciri vardır. Hiçbiri Ethereum ile aynı değildir; Ethereum'un hisse kanıtı mekanizması benzersizdir.

## Birleşme (The Merge) nedir? {#what-is-the-merge}

Birleşme, Ethereum'un iş kanıtı tabanlı mutabakat mekanizmasını kapatıp hisse kanıtı tabanlı mutabakat mekanizmasını açtığı andı. Birleşme 15 Eylül 2022'de gerçekleşti.

[Birleşme hakkında daha fazla bilgi](/roadmap/merge)

## Canlılık ve güvenlik nedir? {#what-are-liveness-and-safety}

Canlılık ve güvenlik, bir blokzincir için iki temel güvenlik endişesidir. Canlılık, kesinleşen bir zincirin kullanılabilirliğidir. Zincir kesinleşmeyi durdurursa veya kullanıcılar zincire kolayca erişemezse, bunlar canlılık hatalarıdır. Son derece yüksek erişim maliyeti de bir canlılık hatası olarak kabul edilebilir. Güvenlik, zincire saldırmanın (yani çelişen kontrol noktalarını kesinleştirmenin) ne kadar zor olduğunu ifade eder.

[Casper makalesinde daha fazla bilgi edinin](https://arxiv.org/pdf/1710.09437.pdf)