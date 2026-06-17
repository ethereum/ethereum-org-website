---
title: Akıllı sözleşmelerin biçimsel doğrulaması
description: Ethereum akıllı sözleşmeleri için biçimsel doğrulamaya genel bir bakış
lang: tr
---

[Akıllı sözleşmeler](/developers/docs/smart-contracts/), yeni kullanım durumları sunan ve kullanıcılar için değer kilidini açan merkeziyetsiz, güven gerektirmeyen ve sağlam uygulamalar oluşturmayı mümkün kılıyor. Akıllı sözleşmeler büyük miktarda değeri idare ettiği için güvenlik, geliştiriciler için kritik bir husustur.

Biçimsel doğrulama, [akıllı sözleşme güvenliğini](/developers/docs/smart-contracts/security/) artırmak için önerilen tekniklerden biridir. Programları belirlemek, tasarlamak ve doğrulamak için [biçimsel yöntemler](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) kullanan biçimsel doğrulama, kritik donanım ve yazılım sistemlerinin doğruluğunu sağlamak için yıllardır kullanılmaktadır.

Akıllı sözleşmelerde uygulandığında biçimsel doğrulama, bir sözleşmenin iş mantığının önceden tanımlanmış bir spesifikasyonu karşıladığını kanıtlayabilir. Test etme gibi sözleşme kodunun doğruluğunu değerlendirmeye yönelik diğer yöntemlerle karşılaştırıldığında biçimsel doğrulama, bir akıllı sözleşmenin işlevsel olarak doğru olduğuna dair daha güçlü garantiler verir.

## Biçimsel doğrulama nedir? {#what-is-formal-verification}

Biçimsel doğrulama, bir sistemin doğruluğunu biçimsel bir spesifikasyona göre değerlendirme sürecini ifade eder. Daha basit bir ifadeyle biçimsel doğrulama, bir sistemin davranışının bazı gereksinimleri karşılayıp karşılamadığını (yani istediğimiz şeyi yapıp yapmadığını) kontrol etmemizi sağlar.

Sistemin (bu durumda bir akıllı sözleşmenin) beklenen davranışları biçimsel modelleme kullanılarak tanımlanırken, spesifikasyon dilleri biçimsel özelliklerin oluşturulmasını sağlar. Biçimsel doğrulama teknikleri daha sonra bir sözleşmenin uygulamasının spesifikasyonuna uygun olduğunu doğrulayabilir ve uygulamanın doğruluğunun matematiksel kanıtını türetebilir. Bir sözleşme spesifikasyonunu karşıladığında, "işlevsel olarak doğru", "tasarım gereği doğru" veya "yapı gereği doğru" olarak tanımlanır.

### Biçimsel model nedir? {#what-is-a-formal-model}

Bilgisayar biliminde [biçimsel model](https://en.wikipedia.org/wiki/Model_of_computation), hesaplamalı bir sürecin matematiksel bir açıklamasıdır. Programlar matematiksel fonksiyonlara (denklemlere) soyutlanır ve model, bir girdi verildiğinde fonksiyonların çıktılarının nasıl hesaplandığını açıklar.

Biçimsel modeller, bir programın davranışının analizinin değerlendirilebileceği bir soyutlama düzeyi sağlar. Biçimsel modellerin varlığı, söz konusu modelin istenen özelliklerini tanımlayan bir _biçimsel spesifikasyon_ oluşturulmasına olanak tanır.

Biçimsel doğrulama için akıllı sözleşmeleri modellemede farklı teknikler kullanılır. Örneğin, bazı modeller bir akıllı sözleşmenin üst düzey davranışı hakkında akıl yürütmek için kullanılır. Bu modelleme teknikleri, akıllı sözleşmelere kara kutu görünümü uygular ve onları girdileri kabul eden ve bu girdilere dayalı olarak hesaplama yürüten sistemler olarak görür.

Üst düzey modeller, akıllı sözleşmeler ile harici olarak sahip olunan hesaplar (EOA'lar), sözleşme hesapları ve blokzincir ortamı gibi harici aracılar arasındaki ilişkiye odaklanır. Bu tür modeller, bir sözleşmenin belirli kullanıcı etkileşimlerine yanıt olarak nasıl davranması gerektiğini belirten özellikleri tanımlamak için kullanışlıdır.

Buna karşılık, diğer biçimsel modeller bir akıllı sözleşmenin alt düzey davranışına odaklanır. Üst düzey modeller bir sözleşmenin işlevselliği hakkında akıl yürütmeye yardımcı olabilse de, uygulamanın iç işleyişi hakkındaki ayrıntıları yakalamada başarısız olabilirler. Alt düzey modeller, program analizine beyaz kutu görünümü uygular ve bir sözleşmenin yürütülmesiyle ilgili özellikler hakkında akıl yürütmek için program izleri ve [kontrol akış grafikleri](https://en.wikipedia.org/wiki/Control-flow_graph) gibi akıllı sözleşme uygulamalarının daha alt düzey temsillerine güvenir.

Alt düzey modeller, bir akıllı sözleşmenin Ethereum'un yürütme ortamındaki (yani [EVM](/developers/docs/evm/)) gerçek yürütülmesini temsil ettikleri için ideal kabul edilir. Alt düzey modelleme teknikleri, özellikle akıllı sözleşmelerde kritik güvenlik özelliklerini oluşturmada ve potansiyel güvenlik açıklarını tespit etmede kullanışlıdır.

### Biçimsel spesifikasyon nedir? {#what-is-a-formal-specification}

Bir spesifikasyon, basitçe belirli bir sistemin karşılaması gereken teknik bir gereksinimdir. Programlamada spesifikasyonlar, bir programın yürütülmesi hakkındaki genel fikirleri (yani programın ne yapması gerektiğini) temsil eder.

Akıllı sözleşmeler bağlamında biçimsel spesifikasyonlar, bir sözleşmenin karşılaması gereken gereksinimlerin biçimsel açıklamaları olan _özellikleri_ ifade eder. Bu tür özellikler "değişmezler" olarak tanımlanır ve bir sözleşmenin yürütülmesi hakkında, hiçbir istisna olmaksızın her olası koşul altında doğru kalması gereken mantıksal doğrulamaları temsil eder.

Bu nedenle, biçimsel bir spesifikasyonu, bir akıllı sözleşmenin amaçlanan yürütülmesini açıklayan biçimsel bir dilde yazılmış ifadeler koleksiyonu olarak düşünebiliriz. Spesifikasyonlar bir sözleşmenin özelliklerini kapsar ve sözleşmenin farklı durumlarda nasıl davranması gerektiğini tanımlar. Biçimsel doğrulamanın amacı, bir akıllı sözleşmenin bu özelliklere (değişmezlere) sahip olup olmadığını ve bu özelliklerin yürütme sırasında ihlal edilip edilmediğini belirlemektir.

Biçimsel spesifikasyonlar, akıllı sözleşmelerin güvenli uygulamalarını geliştirmede kritiktir. Değişmezleri uygulayamayan veya yürütme sırasında özellikleri ihlal edilen sözleşmeler, işlevselliğe zarar verebilecek veya kötü niyetli istismarlara neden olabilecek güvenlik açıklarına eğilimlidir.

## Akıllı sözleşmeler için biçimsel spesifikasyon türleri {#formal-specifications-for-smart-contracts}

Biçimsel spesifikasyonlar, program yürütülmesinin doğruluğu hakkında matematiksel akıl yürütmeyi sağlar. Biçimsel modellerde olduğu gibi, biçimsel spesifikasyonlar da bir sözleşme uygulamasının üst düzey özelliklerini veya alt düzey davranışını yakalayabilir.

Biçimsel spesifikasyonlar, bir programın özellikleri hakkında biçimsel akıl yürütmeye olanak tanıyan [program mantığı](https://en.wikipedia.org/wiki/Logic_programming) unsurları kullanılarak türetilir. Bir program mantığı, bir programın beklenen davranışını (matematiksel dilde) ifade eden biçimsel kurallara sahiptir. Biçimsel spesifikasyonlar oluşturulurken [ulaşılabilirlik mantığı](https://en.wikipedia.org/wiki/Reachability_problem), [zamansal mantık](https://en.wikipedia.org/wiki/Temporal_logic) ve [Hoare mantığı](https://en.wikipedia.org/wiki/Hoare_logic) dahil olmak üzere çeşitli program mantıkları kullanılır.

Akıllı sözleşmeler için biçimsel spesifikasyonlar genel olarak **üst düzey** veya **alt düzey** spesifikasyonlar olarak sınıflandırılabilir. Bir spesifikasyon hangi kategoriye ait olursa olsun, analiz edilen sistemin özelliğini yeterli ve açık bir şekilde tanımlamalıdır.

### Üst düzey spesifikasyonlar {#high-level-specifications}

Adından da anlaşılacağı gibi, üst düzey bir spesifikasyon (aynı zamanda "model odaklı spesifikasyon" olarak da adlandırılır) bir programın üst düzey davranışını açıklar. Üst düzey spesifikasyonlar, bir akıllı sözleşmeyi, FSM modeli için biçimsel özellikleri tanımlamak üzere kullanılan zamansal mantıkla birlikte, işlemler gerçekleştirerek durumlar arasında geçiş yapabilen bir [sonlu durum makinesi](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM) olarak modeller.

[Zamansal mantıklar](https://en.wikipedia.org/wiki/Temporal_logic), "zaman açısından nitelendirilmiş önermeler hakkında akıl yürütme kurallarıdır (örneğin, "_her zaman_ açım" veya "_eninde sonunda_ aç olacağım")." Biçimsel doğrulamaya uygulandığında zamansal mantıklar, durum makineleri olarak modellenen sistemlerin doğru davranışı hakkında doğrulamalar belirtmek için kullanılır. Spesifik olarak, zamansal bir mantık, bir akıllı sözleşmenin içinde bulunabileceği gelecekteki durumları ve durumlar arasında nasıl geçiş yaptığını açıklar.

Üst düzey spesifikasyonlar genellikle akıllı sözleşmeler için iki kritik zamansal özelliği yakalar: **güvenlik** ve **canlılık**. Güvenlik özellikleri "hiçbir zaman kötü bir şey olmaz" fikrini temsil eder ve genellikle değişmezliği ifade eder. Bir güvenlik özelliği, [kilitlenmeden](https://www.techtarget.com/whatis/definition/deadlock) (deadlock) arınmış olma gibi genel yazılım gereksinimlerini tanımlayabilir veya sözleşmeler için alana özgü özellikleri ifade edebilir (örneğin, fonksiyonlar için erişim kontrolü üzerindeki değişmezler, durum değişkenlerinin kabul edilebilir değerleri veya token transferleri için koşullar).

Örneğin, ERC-20 token sözleşmelerinde `transfer()` veya `transferFrom()` kullanım koşullarını kapsayan şu güvenlik gereksinimini ele alalım: _"Bir göndericinin bakiyesi, gönderilmesi istenen token miktarından asla daha düşük olamaz."_. Bir sözleşme değişmezinin bu doğal dil açıklaması, daha sonra geçerliliği titizlikle kontrol edilebilen biçimsel (matematiksel) bir spesifikasyona çevrilebilir.

Canlılık özellikleri "eninde sonunda iyi bir şeyin olacağını" ileri sürer ve bir sözleşmenin farklı durumlar boyunca ilerleme yeteneğiyle ilgilidir. Bir canlılık özelliğine örnek olarak, bir sözleşmenin bakiyelerini talep üzerine kullanıcılara transfer etme yeteneğini ifade eden "likidite" verilebilir. Bu özellik ihlal edilirse, [Parity cüzdanı olayında](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html) olduğu gibi kullanıcılar sözleşmede depolanan varlıkları çekemezler.

### Alt düzey spesifikasyonlar {#low-level-specifications}

Üst düzey spesifikasyonlar, bir sözleşmenin sonlu durum modelini başlangıç noktası olarak alır ve bu modelin istenen özelliklerini tanımlar. Buna karşılık, alt düzey spesifikasyonlar (aynı zamanda "özellik odaklı spesifikasyonlar" olarak da adlandırılır) genellikle programları (akıllı sözleşmeleri) matematiksel fonksiyonlar koleksiyonundan oluşan sistemler olarak modeller ve bu tür sistemlerin doğru davranışını açıklar.

Daha basit bir ifadeyle, alt düzey spesifikasyonlar _program izlerini_ analiz eder ve bu izler üzerinden bir akıllı sözleşmenin özelliklerini tanımlamaya çalışır. İzler, bir akıllı sözleşmenin durumunu değiştiren fonksiyon yürütme dizilerini ifade eder; bu nedenle, alt düzey spesifikasyonlar bir sözleşmenin iç yürütülmesi için gereksinimleri belirlemeye yardımcı olur.

Alt düzey biçimsel spesifikasyonlar, Hoare tarzı özellikler veya yürütme yolları üzerindeki değişmezler olarak verilebilir.

### Hoare tarzı özellikler {#hoare-style-properties}

[Hoare Mantığı](https://en.wikipedia.org/wiki/Hoare_logic), akıllı sözleşmeler de dahil olmak üzere programların doğruluğu hakkında akıl yürütmek için bir dizi biçimsel kural sağlar. Hoare tarzı bir özellik, `c`'nin bir program olduğu ve `P` ile `Q`'nun sırasıyla _ön koşullar_ ve _son koşullar_ olarak biçimsel olarak tanımlanan `c`'nin (yani programın) durumu üzerindeki yüklemler olduğu bir Hoare üçlüsü `{P}c{Q}` ile temsil edilir.

Bir ön koşul, bir fonksiyonun doğru yürütülmesi için gereken koşulları açıklayan bir yüklemdir; sözleşmeyi çağıran kullanıcılar bu gereksinimi karşılamalıdır. Bir son koşul, doğru yürütüldüğü takdirde bir fonksiyonun oluşturduğu koşulu açıklayan bir yüklemdir; kullanıcılar fonksiyona çağrı yaptıktan sonra bu koşulun doğru olmasını bekleyebilirler. Hoare mantığındaki bir _değişmez_, bir fonksiyonun yürütülmesiyle korunan (yani değişmeyen) bir yüklemdir.

Hoare tarzı spesifikasyonlar _kısmi doğruluğu_ veya _tam doğruluğu_ garanti edebilir. Bir sözleşme fonksiyonunun uygulaması, fonksiyon yürütülmeden önce ön koşul doğruysa ve yürütme sonlanırsa son koşul da doğruysa "kısmen doğrudur". Fonksiyon yürütülmeden önce bir ön koşul doğruysa, yürütmenin sonlanması garanti ediliyorsa ve sonlandığında son koşul doğru kalıyorsa tam doğruluk kanıtı elde edilir.

Bazı yürütmeler sonlanmadan önce gecikebileceğinden veya hiç sonlanmayabileceğinden tam doğruluk kanıtı elde etmek zordur. Bununla birlikte, Ethereum'un gaz mekanizması sonsuz program döngülerini engellediği için (yürütme ya başarıyla sonlanır ya da 'gaz bitti' hatası nedeniyle biter) yürütmenin sonlanıp sonlanmadığı sorusu tartışmalı bir konudur.

Hoare mantığı kullanılarak oluşturulan akıllı sözleşme spesifikasyonları, bir sözleşmedeki fonksiyonların ve döngülerin yürütülmesi için tanımlanmış ön koşullara, son koşullara ve değişmezlere sahip olacaktır. Ön koşullar genellikle bir fonksiyona hatalı girdi olasılığını içerirken, son koşullar bu tür girdilere beklenen yanıtı (örneğin, belirli bir istisna fırlatmak) açıklar. Bu şekilde Hoare tarzı özellikler, sözleşme uygulamalarının doğruluğunu sağlamada etkilidir.

Birçok biçimsel doğrulama çerçevesi, fonksiyonların anlamsal doğruluğunu kanıtlamak için Hoare tarzı spesifikasyonlar kullanır. Solidity'deki `require` ve `assert` ifadelerini kullanarak Hoare tarzı özellikleri (doğrulamalar olarak) doğrudan sözleşme koduna eklemek de mümkündür.

`require` ifadeleri bir ön koşulu veya değişmezi ifade eder ve genellikle kullanıcı girdilerini doğrulamak için kullanılırken, `assert` güvenlik için gerekli bir son koşulu yakalar. Örneğin, fonksiyonlar için uygun erişim kontrolü (bir güvenlik özelliği örneği), çağıran hesabın kimliği üzerinde bir ön koşul kontrolü olarak `require` kullanılarak sağlanabilir. Benzer şekilde, bir sözleşmedeki durum değişkenlerinin izin verilen değerleri üzerindeki bir değişmez (örneğin, dolaşımdaki toplam token sayısı), fonksiyon yürütüldükten sonra sözleşmenin durumunu onaylamak için `assert` kullanılarak ihlalden korunabilir.

### İz düzeyi özellikleri {#trace-level-properties}

İz tabanlı spesifikasyonlar, bir sözleşmeyi farklı durumlar arasında geçiren işlemleri ve bu işlemler arasındaki ilişkileri açıklar. Daha önce açıklandığı gibi izler, bir sözleşmenin durumunu belirli bir şekilde değiştiren işlem dizileridir.

Bu yaklaşım, akıllı sözleşmelerin önceden tanımlanmış bazı durumlarla (durum değişkenleriyle açıklanan) birlikte önceden tanımlanmış bir dizi geçişe (sözleşme fonksiyonlarıyla açıklanan) sahip durum geçiş sistemleri olarak modellenmesine dayanır. Ayrıca, bir programın yürütme akışının grafiksel bir temsili olan bir [kontrol akış grafiği](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), genellikle bir sözleşmenin operasyonel anlambilimini açıklamak için kullanılır. Burada her iz, kontrol akış grafiğinde bir yol olarak temsil edilir.

Öncelikle, iz düzeyi spesifikasyonları akıllı sözleşmelerdeki iç yürütme kalıpları hakkında akıl yürütmek için kullanılır. İz düzeyi spesifikasyonları oluşturarak, bir akıllı sözleşme için kabul edilebilir yürütme yollarını (yani durum geçişlerini) ileri süreriz. Sembolik yürütme gibi teknikleri kullanarak, yürütmenin biçimsel modelde tanımlanmayan bir yolu asla izlemediğini biçimsel olarak doğrulayabiliriz.

İz düzeyi özelliklerini açıklamak için herkese açık bazı fonksiyonlara sahip bir [DAO](/dao/) sözleşmesi örneğini kullanalım. Burada, DAO sözleşmesinin kullanıcıların aşağıdaki işlemleri gerçekleştirmesine izin verdiğini varsayıyoruz:

- Fon yatırma

- Fon yatırdıktan sonra bir teklif için oy kullanma

- Bir teklif için oy kullanmazlarsa para iadesi talep etme

Örnek iz düzeyi özellikleri _"fon yatırmayan kullanıcılar bir teklif için oy kullanamaz"_ veya _"bir teklif için oy kullanmayan kullanıcılar her zaman para iadesi talep edebilmelidir"_ olabilir. Her iki özellik de tercih edilen yürütme dizilerini ileri sürer (oy kullanma, fon yatırmadan _önce_ gerçekleşemez ve para iadesi talep etme, bir teklif için oy kullandıktan _sonra_ gerçekleşemez).

## Akıllı sözleşmelerin biçimsel doğrulaması için teknikler {#formal-verification-techniques}

### Model kontrolü {#model-checking}

Model kontrolü, bir algoritmanın bir akıllı sözleşmenin biçimsel modelini spesifikasyonuna karşı kontrol ettiği bir biçimsel doğrulama tekniğidir. Model kontrolünde akıllı sözleşmeler genellikle durum geçiş sistemleri olarak temsil edilirken, izin verilen sözleşme durumları üzerindeki özellikler zamansal mantık kullanılarak tanımlanır.

Model kontrolü, bir sistemin (yani bir sözleşmenin) soyut bir matematiksel temsilinin oluşturulmasını ve bu sistemin özelliklerinin [önermesel mantığa](https://www.baeldung.com/cs/propositional-logic) dayanan formüller kullanılarak ifade edilmesini gerektirir. Bu, model kontrol algoritmasının görevini, yani matematiksel bir modelin belirli bir mantıksal formülü karşıladığını kanıtlama görevini basitleştirir.

Biçimsel doğrulamada model kontrolü, öncelikle bir sözleşmenin zaman içindeki davranışını açıklayan zamansal özellikleri değerlendirmek için kullanılır. Akıllı sözleşmeler için zamansal özellikler, daha önce açıkladığımız _güvenlik_ ve _canlılık_ özelliklerini içerir.

Örneğin, erişim kontrolüyle ilgili bir güvenlik özelliği (örneğin, _`selfdestruct` fonksiyonunu yalnızca sözleşmenin sahibi çağırabilir_) biçimsel mantıkta yazılabilir. Daha sonra model kontrol algoritması, sözleşmenin bu biçimsel spesifikasyonu karşılayıp karşılamadığını doğrulayabilir.

Model kontrolü, bir akıllı sözleşmenin olası tüm durumlarını oluşturmayı ve özellik ihlallerine yol açan ulaşılabilir durumları bulmaya çalışmayı içeren durum uzayı keşfini kullanır. Ancak bu, sonsuz sayıda duruma ("durum patlaması sorunu" olarak bilinir) yol açabilir, bu nedenle model denetleyicileri akıllı sözleşmelerin verimli analizini mümkün kılmak için soyutlama tekniklerine güvenir.

### Teorem kanıtlama {#theorem-proving}

Teorem kanıtlama, akıllı sözleşmeler de dahil olmak üzere programların doğruluğu hakkında matematiksel olarak akıl yürütme yöntemidir. Bir sözleşme sisteminin modelini ve spesifikasyonlarını matematiksel formüllere (mantık ifadelerine) dönüştürmeyi içerir.

Teorem kanıtlamanın amacı, bu ifadeler arasındaki mantıksal eşdeğerliği doğrulamaktır. "Mantıksal eşdeğerlik" (aynı zamanda "mantıksal çift gerektirme" olarak da adlandırılır), birinci ifadenin _ancak ve ancak_ ikinci ifade doğruysa doğru olduğu iki ifade arasındaki bir ilişki türüdür.

Bir sözleşmenin modeli ve özelliği hakkındaki ifadeler arasındaki gerekli ilişki (mantıksal eşdeğerlik), kanıtlanabilir bir ifade (teorem olarak adlandırılır) olarak formüle edilir. Otomatik teorem kanıtlayıcı, biçimsel bir çıkarım sistemi kullanarak teoremin geçerliliğini doğrulayabilir. Başka bir deyişle, bir teorem kanıtlayıcı, bir akıllı sözleşmenin modelinin spesifikasyonlarıyla tam olarak eşleştiğini kesin olarak kanıtlayabilir.

Model kontrolü sözleşmeleri sonlu durumlara sahip geçiş sistemleri olarak modellerken, teorem kanıtlama sonsuz durumlu sistemlerin analizini gerçekleştirebilir. Ancak bu, otomatik bir teorem kanıtlayıcının bir mantık probleminin "karar verilebilir" olup olmadığını her zaman bilemeyeceği anlamına gelir.

Sonuç olarak, teorem kanıtlayıcıya doğruluk kanıtları türetmede rehberlik etmek için genellikle insan yardımına ihtiyaç duyulur. Teorem kanıtlamada insan çabasının kullanılması, onu tamamen otomatik olan model kontrolünden daha pahalı hale getirir.

### Sembolik yürütme {#symbolic-execution}

Sembolik yürütme, _somut değerler_ (örneğin, `x == 5`) yerine _sembolik değerler_ (örneğin, `x > 5`) kullanarak fonksiyonları yürüterek bir akıllı sözleşmeyi analiz etme yöntemidir. Biçimsel bir doğrulama tekniği olarak sembolik yürütme, bir sözleşmenin kodundaki iz düzeyi özellikleri hakkında biçimsel olarak akıl yürütmek için kullanılır.

Sembolik yürütme, bir yürütme izini sembolik girdi değerleri üzerinde matematiksel bir formül olarak temsil eder, buna _yol yüklemi_ de denir. Bir yol yükleminin "karşılanabilir" olup olmadığını (yani formülü karşılayabilecek bir değerin var olup olmadığını) kontrol etmek için bir [SMT çözücü](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) kullanılır. Savunmasız bir yol karşılanabilirse, SMT çözücü yürütmeyi o yola yönlendiren somut bir değer üretecektir.

Bir akıllı sözleşmenin fonksiyonunun girdi olarak bir `uint` değeri (`x`) aldığını ve `x` değeri `5`'ten büyük ve aynı zamanda `10`'dan küçük olduğunda geri döndüğünü varsayalım. Normal bir test prosedürü kullanarak hatayı tetikleyen `x` için bir değer bulmak, hatayı tetikleyen bir girdiyi gerçekten bulma güvencesi olmadan düzinelerce (veya daha fazla) test senaryosunu çalıştırmayı gerektirir.

Buna karşılık, sembolik bir yürütme aracı fonksiyonu sembolik değerle yürütür: `X > 5 ∧ X < 10` (yani `x` 5'ten büyüktür VE `x` 10'dan küçüktür). İlgili yol yüklemi `x = X > 5 ∧ X < 10` daha sonra çözülmesi için bir SMT çözücüye verilir. Belirli bir değer `x = X > 5 ∧ X < 10` formülünü karşılarsa, SMT çözücü bunu hesaplayacaktır; örneğin, çözücü `x` için bir değer olarak `7` üretebilir.

Sembolik yürütme bir programa yapılan girdilere dayandığından ve ulaşılabilir tüm durumları keşfetmek için gereken girdi kümesi potansiyel olarak sonsuz olduğundan, bu hala bir test biçimididir. Ancak örnekte gösterildiği gibi sembolik yürütme, özellik ihlallerini tetikleyen girdileri bulmada normal testlerden daha verimlidir.

Dahası, sembolik yürütme, bir fonksiyona rastgele girdiler üreten diğer özellik tabanlı tekniklerden (örneğin, bulanıklaştırma) daha az yanlış pozitif üretir. Sembolik yürütme sırasında bir hata durumu tetiklenirse, hatayı tetikleyen somut bir değer üretmek ve sorunu yeniden oluşturmak mümkündür.

Sembolik yürütme ayrıca bir dereceye kadar matematiksel doğruluk kanıtı sağlayabilir. Taşma korumasına sahip bir sözleşme fonksiyonunun aşağıdaki örneğini düşünün:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Bir tamsayı taşmasıyla sonuçlanan bir yürütme izinin şu formülü karşılaması gerekir: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Böyle bir formülün çözülmesi pek olası değildir, bu nedenle `safe_add` fonksiyonunun asla taşmadığına dair matematiksel bir kanıt görevi görür.

### Akıllı sözleşmeler için neden biçimsel doğrulama kullanılmalı? {#benefits-of-formal-verification}

#### Güvenilirlik ihtiyacı {#need-for-reliability}

Biçimsel doğrulama, arızalanması ölüm, yaralanma veya finansal çöküş gibi yıkıcı sonuçlara yol açabilecek güvenlik açısından kritik sistemlerin doğruluğunu değerlendirmek için kullanılır. Akıllı sözleşmeler, muazzam miktarda değeri kontrol eden yüksek değerli uygulamalardır ve tasarımdaki basit hatalar [kullanıcılar için geri döndürülemez kayıplara](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/) yol açabilir. Ancak bir sözleşmeyi dağıtımdan önce biçimsel olarak doğrulamak, blokzincir üzerinde çalışmaya başladığında beklendiği gibi performans göstereceğine dair garantileri artırabilir.

Güvenilirlik, özellikle [Ethereum](/) Sanal Makinesinde (EVM) dağıtılan kod genellikle değişmez olduğu için herhangi bir akıllı sözleşmede oldukça arzu edilen bir niteliktir. Lansman sonrası yükseltmelere kolayca erişilememesi nedeniyle, sözleşmelerin güvenilirliğini garanti etme ihtiyacı biçimsel doğrulamayı gerekli kılar. Biçimsel doğrulama, denetçilerin ve test uzmanlarının gözünden kaçabilecek tamsayı yetersizlikleri ve taşma, yeniden giriş (re-entrancy) ve zayıf gaz optimizasyonları gibi zorlu sorunları tespit edebilir.

#### İşlevsel doğruluğu kanıtlama {#prove-functional-correctness}

Program testi, bir akıllı sözleşmenin bazı gereksinimleri karşıladığını kanıtlamanın en yaygın yöntemidir. Bu, bir sözleşmeyi işlemesi beklenen verilerin bir örneğiyle yürütmeyi ve davranışını analiz etmeyi içerir. Sözleşme örnek veriler için beklenen sonuçları döndürürse, geliştiriciler doğruluğunun nesnel kanıtına sahip olurlar.

Ancak bu yaklaşım, örneğin parçası olmayan girdi değerleri için doğru yürütmeyi kanıtlayamaz. Bu nedenle, bir sözleşmeyi test etmek hataları tespit etmeye yardımcı olabilir (yani, bazı kod yolları yürütme sırasında istenen sonuçları döndüremezse), ancak **hataların olmadığını kesin olarak kanıtlayamaz**.

Buna karşılık biçimsel doğrulama, bir akıllı sözleşmenin sözleşmeyi hiç çalıştırmadan _sonsuz_ bir yürütme aralığı için gereksinimleri karşıladığını biçimsel olarak kanıtlayabilir. Bu, doğru sözleşme davranışlarını kesin olarak açıklayan biçimsel bir spesifikasyon oluşturmayı ve sözleşme sisteminin biçimsel (matematiksel) bir modelini geliştirmeyi gerektirir. Ardından, sözleşmenin modeli ile spesifikasyonu arasındaki tutarlılığı kontrol etmek için biçimsel bir kanıt prosedürünü izleyebiliriz.

Biçimsel doğrulama ile, bir sözleşmenin iş mantığının gereksinimleri karşılayıp karşılamadığını doğrulama sorusu, kanıtlanabilen veya çürütülebilen matematiksel bir önermedir. Bir önermeyi biçimsel olarak kanıtlayarak, sonlu sayıda adımla sonsuz sayıda test senaryosunu doğrulayabiliriz. Bu şekilde biçimsel doğrulama, bir sözleşmenin bir spesifikasyona göre işlevsel olarak doğru olduğunu kanıtlama konusunda daha iyi beklentilere sahiptir.

#### İdeal doğrulama hedefleri {#ideal-verification-targets}

Bir doğrulama hedefi, biçimsel olarak doğrulanacak sistemi açıklar. Biçimsel doğrulama en iyi "gömülü sistemlerde" (daha büyük bir sistemin parçasını oluşturan küçük, basit yazılım parçaları) kullanılır. Ayrıca, alana özgü özellikleri doğrulamak için araçları değiştirmeyi kolaylaştırdığından, az kurala sahip uzmanlaşmış alanlar için de idealdirler.

Akıllı sözleşmeler, en azından bir dereceye kadar, her iki gereksinimi de karşılar. Örneğin, Ethereum sözleşmelerinin küçük boyutu onları biçimsel doğrulamaya uygun hale getirir. Benzer şekilde EVM, EVM'de çalışan programlar için anlamsal özellikleri belirlemeyi ve doğrulamayı kolaylaştıran basit kuralları izler.

### Daha hızlı geliştirme döngüsü {#faster-development-cycle}

Model kontrolü ve sembolik yürütme gibi biçimsel doğrulama teknikleri, genellikle akıllı sözleşme kodunun (test veya denetim sırasında gerçekleştirilen) normal analizinden daha verimlidir. Bunun nedeni, biçimsel doğrulamanın somut değerler kullanan testlerin ("bir kullanıcı 5 ether çekmeye çalışırsa ne olur?") aksine doğrulamaları test etmek için sembolik değerlere ("bir kullanıcı _n_ ether çekmeye çalışırsa ne olur?") dayanmasıdır.

Sembolik girdi değişkenleri birden fazla somut değer sınıfını kapsayabilir, bu nedenle biçimsel doğrulama yaklaşımları daha kısa bir zaman diliminde daha fazla kod kapsamı vaat eder. Etkili kullanıldığında biçimsel doğrulama, geliştiriciler için geliştirme döngüsünü hızlandırabilir.

Biçimsel doğrulama ayrıca maliyetli tasarım hatalarını azaltarak merkeziyetsiz uygulamalar (dapp'ler) oluşturma sürecini iyileştirir. Güvenlik açıklarını düzeltmek için sözleşmeleri yükseltmek (mümkün olan yerlerde), kod tabanlarının kapsamlı bir şekilde yeniden yazılmasını ve geliştirmeye daha fazla çaba harcanmasını gerektirir. Biçimsel doğrulama, sözleşme uygulamalarında test uzmanlarının ve denetçilerin gözünden kaçabilecek birçok hatayı tespit edebilir ve bir sözleşmeyi dağıtmadan önce bu sorunları düzeltmek için geniş bir fırsat sunar.

## Biçimsel doğrulamanın dezavantajları {#drawbacks-of-formal-verification}

### Manuel işgücü maliyeti {#cost-of-manual-labor}

Biçimsel doğrulama, özellikle bir insanın doğruluk kanıtları türetmek için kanıtlayıcıya rehberlik ettiği yarı otomatik doğrulama, önemli ölçüde manuel işgücü gerektirir. Dahası, biçimsel spesifikasyon oluşturmak yüksek düzeyde beceri gerektiren karmaşık bir faaliyettir.

Bu faktörler (çaba ve beceri), biçimsel doğrulamayı test etme ve denetimler gibi sözleşmelerdeki doğruluğu değerlendirmenin olağan yöntemlerine kıyasla daha zorlu ve pahalı hale getirir. Yine de, akıllı sözleşme uygulamalarındaki hataların maliyeti göz önüne alındığında, tam bir doğrulama denetiminin maliyetini ödemek pratiktir.

### Yanlış negatifler {#false-negatives}

Biçimsel doğrulama yalnızca akıllı sözleşmenin yürütülmesinin biçimsel spesifikasyonla eşleşip eşleşmediğini kontrol edebilir. Bu nedenle, spesifikasyonun bir akıllı sözleşmenin beklenen davranışlarını doğru bir şekilde tanımladığından emin olmak önemlidir.

Spesifikasyonlar kötü yazılmışsa, savunmasız yürütmelere işaret eden özellik ihlalleri biçimsel doğrulama denetimi tarafından tespit edilemez. Bu durumda bir geliştirici, sözleşmenin hatasız olduğunu hatalı bir şekilde varsayabilir.

### Performans sorunları {#performance-issues}

Biçimsel doğrulama bir dizi performans sorunuyla karşılaşır. Örneğin, sırasıyla model kontrolü ve sembolik kontrol sırasında karşılaşılan durum ve yol patlaması sorunları doğrulama prosedürlerini etkileyebilir. Ayrıca, biçimsel doğrulama araçları genellikle temel katmanlarında SMT çözücüleri ve diğer kısıtlama çözücüleri kullanır ve bu çözücüler hesaplama açısından yoğun prosedürlere dayanır.

Ayrıca, bir programın asla sonlanmayabileceği için program doğrulayıcılarının (mantıksal bir formül olarak tanımlanan) bir özelliğin karşılanıp karşılanamayacağını belirlemesi her zaman mümkün değildir ("[karar verilebilirlik sorunu](https://en.wikipedia.org/wiki/Decision_problem)"). Bu nedenle, iyi belirtilmiş olsa bile bir sözleşme için bazı özellikleri kanıtlamak imkansız olabilir.

## Ethereum akıllı sözleşmeleri için biçimsel doğrulama araçları {#formal-verification-tools}

### Biçimsel spesifikasyonlar oluşturmak için spesifikasyon dilleri {#specification-languages}

**Act**: _*Act, depolama güncellemelerinin, ön/son koşulların ve sözleşme değişmezlerinin belirtilmesine olanak tanır. Araç paketi ayrıca Coq, SMT çözücüleri veya hevm aracılığıyla birçok özelliği kanıtlayabilen kanıt arka uçlarına sahiptir.*_

- [GitHub](https://github.com/ethereum/act)
- [Belgeler](https://github.com/argotorg/act)

**Scribble** - _*Scribble, Scribble spesifikasyon dilindeki kod ek açıklamalarını spesifikasyonu kontrol eden somut doğrulamalara dönüştürür.*_

- [Belgeler](https://docs.scribble.codes/)

**Dafny** - _*Dafny, kodun doğruluğu hakkında akıl yürütmek ve kanıtlamak için üst düzey ek açıklamalara dayanan, doğrulamaya hazır bir programlama dilidir.*_

- [GitHub](https://github.com/dafny-lang/dafny)

### Doğruluğu kontrol etmek için program doğrulayıcıları {#program-verifiers}

**Certora Prover** - _Certora Prover, akıllı sözleşmelerdeki kod doğruluğunu kontrol etmek için otomatik bir biçimsel doğrulama aracıdır. Spesifikasyonlar CVL (Certora Verification Language) ile yazılır ve özellik ihlalleri statik analiz ve kısıtlama çözme kombinasyonu kullanılarak tespit edilir._

- [Web sitesi](https://www.certora.com/)
- [Belgeler](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*Solidity'nin SMTChecker'ı, SMT (Satisfiability Modulo Theories) ve Horn çözümüne dayalı yerleşik bir model denetleyicisidir. Derleme sırasında bir sözleşmenin kaynak kodunun spesifikasyonlarla eşleşip eşleşmediğini onaylar ve güvenlik özelliklerinin ihlallerini statik olarak kontrol eder.*_

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify, ek açıklamalar ve modüler program doğrulaması kullanarak Solidity kodu üzerinde otomatik biçimsel doğrulama gerçekleştirebilen Solidity derleyicisinin genişletilmiş bir sürümüdür.*_

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM, K çerçevesinde yazılmış Ethereum Sanal Makinesinin (EVM) biçimsel bir anlambilimidir. KEVM yürütülebilirdir ve ulaşılabilirlik mantığını kullanarak belirli özellikle ilgili doğrulamaları kanıtlayabilir.*_

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Belgeler](https://jellopaper.org/)

### Teorem kanıtlama için mantıksal çerçeveler {#theorem-provers}

**Isabelle** - _Isabelle/HOL, matematiksel formüllerin biçimsel bir dilde ifade edilmesini sağlayan ve bu formülleri kanıtlamak için araçlar sağlayan bir kanıt asistanıdır. Ana uygulama, matematiksel kanıtların biçimselleştirilmesi ve özellikle bilgisayar donanımı veya yazılımının doğruluğunu kanıtlamayı ve bilgisayar dillerinin ve protokollerinin özelliklerini kanıtlamayı içeren biçimsel doğrulamadır._

- [GitHub](https://github.com/isabelle-prover)
- [Belgeler](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq, teoremleri kullanarak programlar tanımlamanıza ve etkileşimli olarak makine kontrollü doğruluk kanıtları oluşturmanıza olanak tanıyan etkileşimli bir teorem kanıtlayıcıdır._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Belgeler](https://rocq-prover.org/docs)

### Akıllı sözleşmelerdeki savunmasız kalıpları tespit etmek için sembolik yürütme tabanlı araçlar {#symbolic-execution-tools}

**Manticore** - _*Sembolik yürütmeye dayalı EVM baytkod analiz aracı*._

- [GitHub](https://github.com/trailofbits/manticore)
- [Belgeler](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm, EVM baytkodu için sembolik bir yürütme motoru ve eşdeğerlik denetleyicisidir.*_

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Ethereum akıllı sözleşmelerindeki güvenlik açıklarını tespit etmek için sembolik bir yürütme aracı_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Belgeler](https://mythril-classic.readthedocs.io/en/develop/)

## Daha fazla bilgi {#further-reading}

- [Akıllı Sözleşmelerin Biçimsel Doğrulaması Nasıl Çalışır?](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Ethereum Ekosistemindeki Biçimsel Doğrulama Projelerine Genel Bakış](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Ethereum 2.0 Para Yatırma Akıllı Sözleşmesinin Uçtan Uca Biçimsel Doğrulaması](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Dünyanın En Popüler Akıllı Sözleşmesini Biçimsel Olarak Doğrulamak](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker ve Biçimsel Doğrulama](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)