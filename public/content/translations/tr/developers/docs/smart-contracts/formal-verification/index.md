---
title: Akıllı sözleşmelerin resmi doğrulaması
description: Ethereum akıllı sözleşmelerinin resmi doğrulamasına genel bir bakış
lang: tr
---

[Akıllı sözleşmeler](/developers/docs/smart-contracts/), yeni kullanım durumları sunan ve kullanıcılar için değerin kilidini açan, merkeziyetsiz, güvene dayalı olmayan ve sağlam uygulamalar oluşturmayı mümkün kılıyor. Akıllı sözleşmeler büyük miktarlarda değer işlediğinden güvenlik, geliştiriciler için kritik bir husustur.

Resmi doğrulama, [akıllı sözleşme güvenliğini](/developers/docs/smart-contracts/security/) iyileştirmek için önerilen tekniklerden biridir. Programları belirtmek, tasarlamak ve doğrulamak için [resmi yöntemler](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) kullanan resmi doğrulama, kritik donanım ve yazılım sistemlerinin doğruluğunu sağlamak amacıyla yıllardır kullanılmaktadır.

Resmi doğrulama, akıllı sözleşmelerde uygulandığında bir sözleşmenin iş mantığının önceden tanımlanmış bir özelliği karşıladığını kanıtlayabilir. Resmi doğrulama, test etme gibi sözleşme kodunun doğruluğunu değerlendiren diğer yöntemlerle karşılaştırıldığında, bir akıllı sözleşmenin fonksiyonel olarak doğru olduğunu garanti etme noktasında daha güçlüdür.

## Resmi doğrulama nedir? {#what-is-formal-verification}

Resmi doğrulama, bir sistemin resmi spesifikasyonu ile ilgili olarak doğruluğunu değerlendirme sürecini ifade eder. Daha basit ifadelerle resmi doğrulama, bize sistem davranışının bazı gereksinimleri (örneğin istediklerimizi yapması) karşılayıp karşılamadığını bilme imkanı tanır.

Sistemin (bu durumda akıllı sözleşme) öngörülen davranışları, resmi modelleme kullanılarak açıklanırken spesifikasyon dilleri resmi özelliklerin yaratılmasına olanak tanır. Bunun ardından resmi modelleme teknikleri bir sözleşmenin uygulanmasının spefifikasyonuna uygun olduğunu ve bunun doğruluğunun matematiksel kanıtını ortaya koyduğunu doğrulayabilir. Bir sözleşme spesifikasyonunu karşılarsa ''fonksiyonel olarak doğru'', ''tasarım olarak doğru'' veya ''yapı olarak doğru'' biçimlerinde sınıflandırılır.

### Resmi model nedir? {#what-is-a-formal-model}

Bilgisayar biliminde [resmi bir model](https://en.wikipedia.org/wiki/Model_of_computation), bir hesaplama sürecinin matematiksel bir açıklamasıdır. Programlar, matematiksel işlevler (denklemler) halinde soyutlanırken model, bir girdi verildiğinde fonksiyonlara verilen çıktıların nasıl işlendiğini açıklar.

Resmi modeller, bir programın davranış analizinin nasıl değerlendirilebileceğine ilişkin soyutlama düzeyini sunar. Resmi modellerin varlığı, söz konusu modelin istenen özelliklerini tanımlayan bir _resmi spesifikasyonun_ oluşturulmasına olanak tanır.

Akıllı sözleşmelerin resmi doğrulama modellemelerinde farklı teknikler kullanılmaktadır. Örneğin, bazı modeller bir akıllı sözleşmenin yüksek düzey davranışını anlamak için kullanılır. Bu modelleme teknikleri akıllı sözleşmelere, onları girdileri kabul eden ve bu girdilere dayanan hesaplamaları yürüten sistemler olarak gören kara kutu görünümü uygular.

Yüksek düzey modeller, akıllı sözleşmeler ile dışarıdan sahip olunan hesaplar (EOA'lar), sözleşme hesapları ve blokzincir çevresi gibi dış aracılar arasındaki ilişkiye odaklanır. Bunun gibi modeller, belirli kullanıcı etkileşimlerine cevaben bir sözleşmenin nasıl davranacağını belirleyen özellikleri tanımlamak açısından kullanışlıdır.

Diğer resmi modeller, bunun aksine bir akıllı sözleşmenin düşük düzey davranışına odaklanır. Üst düzey modeller bir sözleşmenin işlevselliği hakkında akıl yürütmeye yardımcı olabilirken, uygulamanın iç işleyişi ile ilgili ayrıntıları yakalamakta bazen başarısız olabilirler. Düşük seviyeli modeller, program analizine bir beyaz kutu görünümü uygular ve bir sözleşmenin yürütülmesiyle ilgili özellikler hakkında akıl yürütmek için program izleri ve [kontrol akış grafileri](https://en.wikipedia.org/wiki/Control-flow_graph) gibi akıllı sözleşme uygulamalarının daha düşük seviyeli temsillerine dayanır.

Düşük seviyeli modeller, bir akıllı sözleşmenin Ethereum'un yürütme ortamındaki (yani [EVM](/developers/docs/evm/)) gerçek yürütülmesini temsil ettikleri için ideal kabul edilirler. Düşük düzeyli modelleme teknikleri, özellikle akıllı sözleşmelerde kritik güvenlik özelliklerini tesis ederken ve olası güvenlik açıklarını tespit ederken kullanışlıdır.

### Resmi spesifikasyon nedir? {#what-is-a-formal-specification}

Spesifikasyon, basitçe anlatmak gerekirse belirli bir sistemin karşılaması gereken bir teknik gerekliliktir. Spesifikasyon, programlamada bir programın yürütülmesi hakkındaki genel fikirleri (örneğin programın ne yapması gerektiği) temsil eder.

Akıllı sözleşmeler bağlamında, resmi spesifikasyonlar _özelliklere_ atıfta bulunur — bir sözleşmenin karşılaması gereken gereksinimlerin resmi açıklamaları. Bu gibi özellikler ''değişmezler'' olarak nitelendirilir ve bir sözleşmenin hiçbir istisna olmadan her olası koşul altında doğru kalmak zorunda olan yürütülmesi hakkındaki mantıklı savları temsil eder.

Böylelikle resmi spesifikasyonu, akıllı sözleşmenin amaçlanan yürütmesini açıklayan resmi bir dilde yazılmış ifadeler toplamı olarak düşünebiliriz. Spesifikasyonlar, bir sözleşmenin özelliklerini ele alır ve sözleşmenin farklı koşullar altında nasıl davranması gerektiğini tanımlar. Resmi doğrulamanın amacı, akıllı sözleşmenin bu özellikleri (değişmezleri) taşıyıp taşımadığına ve bu özelliklerin yürütme esnasında ihlal edilip edilmediğine karar vermektir.

Resmi spesifikasyonlar, akıllı sözleşmelerin güvenli uygulamalarını geliştirirken hayati önem taşır. Değişmezleri uygulayamayan veya yürütme sırasında özellikleri ihlal edilen sözleşmeler, işlevselliğini zedeleyecek veya kötü niyetli istismara yol açabilecek güvenlik açıklarına yatkındır.

## Akıllı sözleşmeler için resmi spesifikasyon türleri {#formal-specifications-for-smart-contracts}

Resmi spesifikasyonlar, program yürütülmesinin doğruluğu hakkında matematiksel gerekçelendirmeyi mümkün kılar. Resmi modellerde olduğu gibi resmi spesifikasyonlar da sözleşme uygulamasının ya yüksek düzey özelliklerini ya da düşük düzey davranışını yakalar.

Resmi spesifikasyonlar, bir programın özellikleri hakkında resmi akıl yürütmeye olanak tanıyan [program mantığı](https://en.wikipedia.org/wiki/Logic_programming) öğeleri kullanılarak türetilir. Program mantığı, bir programın beklenen davranışını açıklayan (matematik dilinde) resmi kurallara sahiptir. Resmi spesifikasyonlar oluşturulurken, [erişilebilirlik mantığı](https://en.wikipedia.org/wiki/Reachability_problem), [zamansal mantık](https://en.wikipedia.org/wiki/Temporal_logic) ve [Hoare mantığı](https://en.wikipedia.org/wiki/Hoare_logic) da dahil olmak üzere çeşitli program mantıkları kullanılır.

Akıllı sözleşmeler için resmi spesifikasyonlar genel olarak **yüksek seviyeli** veya **düşük seviyeli** spesifikasyonlar olarak sınıflandırılabilir. Spesifikasyon hangi kategoriye ait olursa olsun analiz edilen sistemin özelliğini yeterli ve açık biçimde tarif etmelidir.

### Yüksek seviyeli spesifikasyonlar {#high-level-specifications}

İsminden de anlaşılacağı gibi, yüksek düzeyli bir spesifikasyon ("model yönelimli spesifikasyon" olarak da adlandırılır), bir programın üst düzey davranışını tanımlar. Yüksek seviyeli spesifikasyonlar bir akıllı sözleşmeyi [sonlu durum makinesi](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM) olarak modeller. Bu makine, FSM modeli için resmi özellikleri tanımlamak amacıyla zamansal mantık kullanılarak yapılan işlemler aracılığıyla durumlar arasında geçiş yapabilir.

[Zamansal mantıklar](https://en.wikipedia.org/wiki/Temporal_logic), "zaman açısından nitelendirilen önermeler hakkında akıl yürütme kurallarıdır (örneğin, "Ben _her zaman_ açım" veya "Ben _eninde sonunda_ acıkacağım")." Resmi doğrulama uygulandığında, zamansal mantıklar, durum makineleri olarak modellenen sistemlerin doğru davranışı hakkındaki savları belirtmek için kullanılır. Spesifik olarak bir zamansal mantık, bir akıllı sözleşmenin gelecekte olabileceği durumları ve durumlar arasında nasıl geçiş yaptığını açıklar.

Yüksek seviyeli spesifikasyonlar, akıllı sözleşmeler için genellikle iki kritik zamansal özelliği yakalar: **güvenlik** ve **canlılık**. Güvenlik özellikleri, “asla kötü bir şey olmaz” düşüncesini temsil eder ve genellikle değişmezliği ifade eder. Bir güvenlik özelliği, [kilitlenmeden](https://www.techtarget.com/whatis/definition/deadlock) arınmışlık gibi genel yazılım gereksinimlerini tanımlayabilir veya sözleşmeler için alana özgü özellikleri ifade edebilir (ör. işlevler için erişim denetimindeki değişmezler, durum değişkenlerinin kabul edilebilir değerleri veya token transferleri için koşullar).

Örneğin, ERC-20 token sözleşmelerinde `transfer()` veya `transferFrom()` kullanım koşullarını kapsayan şu güvenlik gereksinimini ele alalım: _“Bir göndericinin bakiyesi, gönderilmesi talep edilen token miktarından asla daha düşük olamaz.”_. Bir sözleşme değişmezinin doğal dille yapılan bu açıklaması, resmi (matematiksel) bir spesifikasyona çevrilebilir ve bunun geçerliliği de sonrasında katı bir biçimde kontrol edilebilir.

Canlılık özellikleri "iyi bir şeyin nihayetinde gerçekleştiğini" ileri sürer ve bir sözleşmenin farklı durumlardan geçme kabiliyeti ile ilgilidir. Canlılık özelliğine örnek olarak, bir sözleşmenin kullanıcılarına isteğe bağlı olarak bakiyelerini transfer etme kabiliyeti anlamına gelen "likidite" verilebilir. Bu özellik ihlal edilirse, [Parity cüzdan olayında](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html) olduğu gibi, kullanıcılar sözleşmede saklanan varlıkları çekemez hale gelir.

### Düşük seviyeli spesifikasyonlar {#low-level-specifications}

Yüksek düzeyli spesifikasyonlar, sonlu durum sözleşme modelini bir başlangıç noktası olarak alır ve bu modelin arzulanan özelliklerini açıklar. Tam tersi şekilde düşük düzeyli spesifikasyonlar (''özellik odaklı spesifikasyonlar'' da denir) sıklıkla programları (akıllı sözleşmeler) matematiksel fonksiyonlardan oluşan bir koleksiyon içeren sistemler olarak modeller ve bu sistemlerin doğru davranışlarını açıklar.

Daha basit bir ifadeyle, düşük seviyeli spesifikasyonlar _program izlerini_ analiz eder ve bu izler üzerinden bir akıllı sözleşmenin özelliklerini tanımlamaya çalışır. İzler, bir akıllı sözleşmenin durumunu değiştiren fonksiyon yürütme dizilerini ifade eder ve dolayısıyla düşük düzeyli spesifikasyonlar, bir sözleşmenin dahili yürütme gerekliliklerinin belirtilmesine yardımcı olur.

Düşük düzeyli resmi spesifikasyonlar Hoare tarzı özellikler veya yürütme yolundaki değişmezler olarak verilebilir.

### Hoare tarzı özellikler {#hoare-style-properties}

[Hoare Mantığı](https://en.wikipedia.org/wiki/Hoare_logic), akıllı sözleşmeler de dahil olmak üzere programların doğruluğu hakkında akıl yürütmek için bir dizi resmi kural sağlar. Bir Hoare tarzı özellik, bir Hoare üçlüsü olan `{P}c{Q}` ile temsil edilir. Burada `c` bir programdır, `P` ve `Q` ise `c`'nin (yani programın) durumu üzerindeki yüklemlerdir ve sırasıyla _ön koşullar_ ve _son koşullar_ olarak resmi şekilde tanımlanırlar.

Bir ön koşul, bir fonksiyonun doğru yürütülmesi için gerekli koşulları açıklayan bir ifadedir; bu sözleşmeyi çağıran kullanıcılar bu gerekliliği karşılamak zorundadır. Bir art koşul ise doğru biçimde yürütülmesi şartıyla bir fonksiyonun tesis ettiği koşulu açıklayan bir ifadedir; kullanıcılar, fonksiyona çağrı sonrası bu koşulun doğru olmasını bekler. Hoare mantığında bir _değişmez_, bir işlevin yürütülmesiyle korunan bir yüklemdir (yani değişmez).

Hoare tarzı spesifikasyonlar, _kısmi doğruluğu_ veya _tam doğruluğu_ garanti edebilir. Ön koşulun fonksiyon yürütülmeden önce doğru olması durumunda sözleşme fonksiyonunun uygulaması "kısmen doğrudur", yürütmenin sonlanması durumunda ise art koşul da doğrudur. Bir ön koşulun fonksiyonun yürütülmesi öncesinde doğru olması halinde tam doğruluk kanıtı elde edilmiş olur, yürütmenin sonlandırılması garantidir ve sonlandığında art koşul da doğru olur.

Tam doğruluk kanıtı elde etmek, bazı yürütmelerin sonlanmadan önce gecikebileceği ya da hiç sonlanmayabileceği için zordur. Bununla birlikte, yürütmenin sona erip ermediği sorusu tartışmalı bir nokta olabilir, çünkü Ethereum'un gaz mekanizması sonsuz program döngülerini önler (yürütme ya başarılı bir şekilde ya da "gaz yeterli değil" hatası nedeniyle sona erer).

Hoare mantığı kullanılarak oluşturulan akıllı sözleşme spesifikasyonları, bir sözleşmedeki fonksiyonların ve döngülerin yürütülmesi için tanımlanmış ön koşullara, art koşullara ve değişmezlere sahiptir. Ön koşullar sıklıkla fonksiyona hatalı girdi yapılması olasılığını beraberinde getirirken art koşullar da bu girdilere yönelik istenen yanıtları açıklar (örneğin, belirli bir istisna atılması). Bu sebepten, Hoare tarzı özellikler sözleşme uygulamalarının doğruluğunu sağlama konusunda etkilidir.

Çoğu resmi doğrulama taslağı, fonksiyonların anlamsal doğruluğunu kanıtlamak için Hoare tarzı spesifikasyonlar kullanır. Hoare tarzı özelliklerin (savlar olarak) Solidity'deki `require` ve `assert` ifadeleri kullanılarak doğrudan sözleşme koduna eklenmesi de mümkündür.

`require` ifadeleri bir ön koşulu veya değişmezi ifade eder ve genellikle kullanıcı girdilerini doğrulamak için kullanılırken, `assert` güvenlik için gerekli bir son koşulu yakalar. Örneğin, işlevler için uygun erişim kontrolü (bir güvenlik özelliği örneği), çağıran hesabın kimliği üzerinde bir ön koşul denetimi olarak `require` kullanılarak sağlanabilir. Benzer şekilde, bir sözleşmedeki durum değişkenlerinin izin verilen değerleri üzerindeki bir değişmez (örneğin, dolaşımdaki toplam token sayısı), işlevin yürütülmesinden sonra sözleşmenin durumunu doğrulamak için `assert` kullanılarak ihlal edilmekten korunabilir.

### İzleme seviyesi özellikleri {#trace-level-properties}

İz tabanlı spesifikasyonlar, bir sözleşmeye farklı durumlar arasında geçiş yaptıran işlemleri ve bu işlemler arasındaki ilişkileri açıklar. Daha önce açıklandığı üzere izler, sözleşmenin durumunu belirli bir şekilde değiştiren işlem dizileridir.

Bu yaklaşım, akıllı sözleşmeleri, durum geçiş sistemleri modeli olarak ele alır ve bazı önceden tanımlanmış durumlarla (durum değişkenleri ile tanımlanan) birlikte önceden tanımlanmış geçişler kümesiyle (sözleşme işlevleri ile tanımlanan) birlikte çalışır. Ayrıca, bir programın yürütme akışının grafiksel bir temsili olan [kontrol akış grafiği](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), bir sözleşmenin operasyonel semantiğini tanımlamak için sıklıkla kullanılır. Burada her iz, kontrol akış grafiğinde bir yol olarak gösterilir.

İz düzeyinde spesifikasyonlar, öncelikli olarak akıllı sözleşmelerde dahili yürütme desenlerini anlamak için kullanılır. İz düzeyinde spesifikasyonlar oluşturarak bir akıllı sözleşme için kabul edilebilir yürütme yollarını (örneğin durum geçişleri) ileri süreriz. Sembolik yürütme gibi teknikler kullanarak yürütmenin, resmi modelde tanımlanmamış hiçbir yolu asla takip etmeyeceğini resmi olarak doğrulayabiliriz.

İzleme seviyesi özelliklerini tanımlamak için, halka açık bazı işlevlere sahip bir [DAO](/dao/) sözleşmesi örneğini kullanalım. Burada, DAO sözleşmesinin kullanıcıların şu işlemleri gerçekleştirmesine izin verdiğini varsayıyoruz:

- Fon yatırma

- Fon yatırdıktan sonra bir teklife oy verme

- Bir teklife oy vermezlerse geri ödeme talebinde bulunma

Örnek izleme seviyesi özellikleri şunlar olabilir: _"fon yatırmayan kullanıcılar bir teklifte oy kullanamaz"_ veya _"bir teklifte oy kullanmayan kullanıcılar her zaman geri ödeme talep edebilmelidir"_. Her iki özellik de tercih edilen yürütme sıralamalarını belirtir (oylama fon yatırmadan _önce_ gerçekleşemez ve geri ödeme talebi bir teklife oy verdikten _sonra_ gerçekleşemez).

## Akıllı sözleşmelerin resmi doğrulaması için teknikler {#formal-verification-techniques}

### Model denetimi {#model-checking}

Model kontrolü, bir algoritmanın resmi bir akıllı sözleşme modelini spesifikasyonu ile karşılaştırarak kontrol ettiği bir resmi doğrulama tekniğidir. Model kontrolünde, izin verilen sözleşme durumlarındaki özellikler zamansal mantık kullanılarak açıklanırken akıllı sözleşmeler sıklıkla durum geçiş sistemleri olarak gösterilir.

Model denetimi, bir sistemin (yani bir sözleşmenin) soyut bir matematiksel temsilini oluşturmayı ve bu sistemin özelliklerini [önermeler mantığına](https://www.baeldung.com/cs/propositional-logic) dayanan formüller kullanarak ifade etmeyi gerektirir. Bu, başka bir deyişle matematiksel bir modelin belirli bir formülü karşıladığını kanıtlamak adına model kontrol algoritmasının görevini basitleştirir.

Resmi doğrulamada model kontrolü, öncelikli olarak bir sözleşmenin zaman içindeki davranışını açıklayan zamansal mantığı değerlendirmek için kullanılır. Akıllı sözleşmelerin zamansal özellikleri, daha önce açıkladığımız _güvenlik_ ve _canlılığı_ içerir.

Örneğin, erişim kontrolüyle ilgili bir güvenlik özelliği (ör. _Sadece sözleşmenin sahibi `selfdestruct` işlevini çağırabilir_) resmi mantıkla yazılabilir. Bunun ardından model kontrol algoritması, sözleşmenin bu resmi spesifikasyonu karşıladığını doğrulayabilir.

Model kontrolü, bir akıllı sözleşmenin tüm olası durumlarını oluşturmayı ve özellik ihlali ile sonuçlanan ulaşılabilir durumları bulmaya çalışmayı içeren durum alan keşfini kullanır. Ancak bu, durum sayısının sonsuz olmasına (''durum patlama sorunu'' olarak da bilinir) yol açabilir ve dolayısıyla model kontrolü yapanlar, akıllı sözleşmelerin etkili analizini yapmayı mümkün kılan soyutlama tekniklerine güvenirler.

### Teorem kanıtlama {#theorem-proving}

Varsayım kanıtlama, akıllı sözleşmeleri de içeren programların doğruluğunu matematiksel olarak gerekçelendirmeye yönelik bir yöntemdir. Bir sözleşmenin sistem modelini ve spesifikasyonlarını matematiksel formüllere (mantık ifadeleri) dönüştürmeyi içerir.

Varsayım kanıtlamanın amacı, bu ifadeler arasındaki mantıksal eşdeğerliği doğrulamaktır. “Mantıksal denklik” (aynı zamanda “mantıksal iki yönlü gerektirme” olarak da adlandırılır), iki ifade arasında, ilk ifadenin _ancak ve ancak_ ikinci ifade doğruysa doğru olduğu bir ilişki türüdür.

Sözleşmenin modeli ve özelliği hakkındaki ifadeler arasında bulunması gereken ilişki (mantıksal eşdeğerlik), kanıtlanabilir bir ifade (varsayım olarak anılır) olarak formüle edilir. Otomatikleştirilmiş varsayım kanıtlayıcısı, resmi bir çıkarım sistemi kullanarak varsayımın doğruluğunu kanıtlayabilir. Bir başka deyişle varsayım kanıtlayıcısı, akıllı sözleşme modelinin spesifikasyonlarıyla bire bir uyumlu olduğunu kesin olarak kanıtlayabilir.

Model kontrolü, sözleşmeleri sonlu duruma sahip geçiş sistemleri olarak modellerken, varsayım kanıtlama sonsuz durumlu sistemlerin analizini yapabilir. Ancak bu, otomatikleştirilmiş varsayım kanıtlayıcısının mantıksal bir problemin her zaman ''kararlaştırılabilir'' olup olmadığını bilememesi anlamına gelir.

Bunun bir sonucu olarak, varsayım kanıtlayıcısına doğruluk kanıtlarına erişirken rehberlik etmesi için sıklıkla insan desteği gereklidir. İnsan çabasının varsayım kanıtlamada kullanımı, tamamen otomatikleştirilmiş olan model denetimine kıyasla onu daha pahalı hale getirmektedir.

### Sembolik yürütme {#symbolic-execution}

Sembolik yürütme, bir akıllı sözleşmeyi _somut değerler_ (ör. `x == 5`) yerine _sembolik değerler_ (ör. `x > 5`) kullanarak işlevleri yürüterek analiz etme yöntemidir. Bir resmi doğrulama tekniği olarak sembolik yürütme, sözleşme kodunda bulunan iz düzeyinde özellikleri anlamak amacıyla kullanılır.

Sembolik yürütme, bir yürütme izini sembolik girdi değerleri üzerinde matematiksel bir formül olarak temsil eder, buna başka bir deyişle _yol yüklemi_ denir. Bir [SMT çözücü](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories), bir yol yükleminin "karşılanabilir" olup olmadığını (yani, formülü karşılayabilecek bir değer olup olmadığını) kontrol etmek için kullanılır. Güvenlik açığı bulunan bir yol karşılanabilir nitelikteyse, SMT çözücüsü yürütmeyi tetikleyerek o yola doğru yönlendiren somut bir değer üretecektir.

Bir akıllı sözleşmenin işlevinin girdi olarak bir `uint` değeri (`x`) aldığını ve `x` `5`'ten büyük ve aynı zamanda `10`'dan küçük olduğunda işlemi geri aldığını varsayalım. Normal bir test prosedürü kullanarak hatayı tetikleyen bir `x` değeri bulmak, hata tetikleyen bir girdiyi gerçekten bulma güvencesi olmadan düzinelerce (veya daha fazla) test senaryosunu çalıştırmayı gerektirir.

Tersine, sembolik bir yürütme aracı, işlevi şu sembolik değerle yürütür: `X > 5 ∧ X < 10` (yani, `x`, 5'ten büyük VE `x`, 10'dan küçük). İlişkili yol yüklemi olan `x = X > 5 ∧ X < 10` daha sonra çözülmesi için bir SMT çözücüsüne verilir. Belirli bir değer `x = X > 5 ∧ X < 10` formülünü karşılarsa, SMT çözücü bunu hesaplar—örneğin, çözücü `x` için bir değer olarak `7` üretebilir.

Bu, sembolik yürütmenin bir programın girdilerine dayanması ve ulaşılabilir tüm durumları keşfetmek için araştırılacak girdi kümesinin potansiyel olarak sonsuz olması nedeniyle hala bir tür test yöntemidir. Ancak örnekte gösterildiği gibi sembolik yürütme, özellik ihlallerini tetikleyen girdileri bulmaya yönelik düzenli testlere kıyasla daha verimlidir.

Ayrıca sembolik yürütme, bir fonksiyon için rastgele girdiler üreten diğer özellik tabanlı teknikler (örneğin, bulandırma) ile karşılaştırıldığında daha az yalancı pozitif üretir. Sembolik yürütme sırasında bir hata durumu tetiklenmesi halinde hatayı tetikleyen somut bir değer üreterek sorunu tekrarlamak mümkündür.

Sembolik yürütme aynı zamanda belirli bir düzeyde matematiksel doğruluk kanıtı da sağlayabilir. Taşma korumasına sahip bir sözleşme fonksiyonu örneğini aşağıda inceleyebilirsiniz:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Bir tamsayı taşmasıyla sonuçlanan bir yürütme izinin şu formülü sağlaması gerekir: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Böyle bir formülün çözülmesi olası değildir, bu nedenle `safe_add` işlevinin asla taşmayacağına dair matematiksel bir kanıt görevi görür.

### Akıllı sözleşmeler için neden resmi doğrulama kullanılmalı? Resmi doğrulamanın faydaları {#benefits-of-formal-verification}

#### Güvenilirlik ihtiyacı {#need-for-reliability}

Hata yapması sonucunda ölüm, yaralanma veya maddi yıkım gibi tahrip edici sonuçlara sebep olabilecek hayati öneme sahip sistemlerin doğruluğunun değerlendirmesinde resmi doğrulama kullanılır. Akıllı sözleşmeler, çok büyük miktarda değeri kontrol eden yüksek değerli uygulamalardır ve tasarımdaki basit hatalar [kullanıcılar için geri döndürülemez kayıplara](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/) yol açabilir. Ancak bir sözleşmeyi dağıtımdan önce resmi olarak doğrulamak, blok zincir üzerinde çalıştığında arzu edildiği gibi işlem göreceğine yönelik garantiyi güçlendirecektir.

Güvenilirlik, her bir akıllı sözleşmede, özellikle de kodu değiştirilemez olarak dağıtılmış Ethereum Sanal Makinesi'nde (EVM) yüksek düzeyde arzu edilen bir niteliktir. Şu anda erişilemeyen piyasaya sürülme sonrası yükseltmelerle sözleşmelerin güvenilirliğini garanti etme ihtiyacı, resmi doğrulamayı gerekli kılar. Resmi doğrulama, denetimciler ve test edenlerin gözünden kaçabilecek tamsayı taşma ve yetersizliği, yeniden giriş ve düşük gaz optimizasyonları gibi dolambaçlı sorunları algılayabilir.

#### İşlevsel doğruluğu kanıtlama {#prove-functional-correctness}

Program test etme, bir akıllı sözleşmenin bazı gereklilikleri karşıladığını kanıtlamanın en yaygın yöntemidir. Bu süreç, işlemesi beklenen bir veri örneği ile sözleşmenin yürütülmesini ve davranışının incelenmesini içerir. Sözleşmenin örnek veri için beklenen sonuçları vermesi durumunda geliştiriciler, doğruluğuna ilişkin nesnel kanıta sahip olmuş olur.

Ancak bu yaklaşım, örneğin içinde yer almayan girdi değerleri için doğru yürütmeyi kanıtlayamaz. Bu nedenle, bir sözleşmeyi test etmek hataları tespit etmeye yardımcı olabilir (yani, bazı kod yolları yürütme sırasında istenen sonuçları döndürmezse), ancak **hataların olmadığını kesin olarak kanıtlayamaz**.

Tersine, resmi doğrulama, bir akıllı sözleşmenin, sözleşmeyi hiç çalıştırmadan _sonsuz_ bir yürütme aralığı için gereksinimleri karşıladığını resmi olarak kanıtlayabilir. Bunun için doğru sözleşme davranışlarını net olarak açıklayan resmi bir spesifikasyon oluşturulmasına ve sözleşme sistemi için resmi bir (matematiksel) model geliştirilmesine ihtiyaç vardır. Sonrasında, sözleşme modeli ve spesifikasyonu arasındaki tutarlılığı denetlemek için resmi kanıt prosedürünü izleyebiliriz.

Resmi doğrulama sayesinde bir sözleşmenin iş mantığının gereklilikleri karşılayıp karşılamadığını doğrulama sorusu, kanıtlanabilen veya aksi ispatlanabilen matematiksel bir önerme niteliği kazanır. Bir önermeyi resmi olarak kanıtlayarak sınırsız sayıda test durumunu sınırlı sayıda adımla doğrulayabiliriz. Bu bağlamda resmi doğrulamanın bir sözleşmenin bir spesifikasyona göre işlevsel olarak doğruluğunu kanıtlama konusunda başarılı olma olasılığı daha yüksektir.

#### İdeal doğrulama hedefleri {#ideal-verification-targets}

Bir doğrulama hedefi, resmi olarak doğrulanacak sistemi açıklar. Resmi doğrulama en iyi ''gömülü sistemlerde'' (daha büyük bir sistemin bir parçasını teşkil eden küçük, basit yazılım parçaları) sonuç verir. Ayrıca, alan adına özgü özellikleri doğrulamaya yarayan araçları düzenlemeyi kolaylaştırdığı için daha az kurala sahip özel alan adları için de idealdirler.

Akıllı sözleşmeler, (en azından, belirli bir ölçüde) her iki gerekliliği de karşılar. Örneğin, Ethereum sözleşmelerinin boyutunun küçük olması, bu sözleşmeleri resmi doğrulama açısından daha uygun kılar. Benzer şekilde, Ethereum Sanal Makinesi de basit kuralları uygular ve bu durum, Ethereum Sanal Makinesi'nde çalışan programlar için anlamsal özellikleri belirtme ve doğrulamayı kolaylaştırır.

### Daha hızlı geliştirme döngüsü {#faster-development-cycle}

Model kontrolü ve sembolik yürütme gibi resmi doğrulama teknikleri, genellikle akıllı sözleşme kodunun sıradan analizinden (test etme ve denetim sırasında uygulanan) daha etkilidir. Bunun nedeni, resmi doğrulamanın savları test etmek için sembolik değerlere dayanmasıdır ("ya bir kullanıcı _n_ ether çekmeye çalışırsa?") bağlı olmasıdır.

Sembolik girdi değişkenleri somut değerlerin birçok sınıfını içerebileceğinden resmi doğrulama yaklaşımları daha kısa zaman dilimlerinde daha fazla kod kapsamı vaat eder. Resmi doğrulama, etkin biçimde kullanıldığında geliştiriciler için geliştirme döngüsünü hızlandırabilir.

Resmi doğrulama ayrıca, masraflı tasarım hatalarını azaltarak merkeziyetsiz uygulamaların (daaps) geliştirilme sürecini de hızlandırır. Güvenlik açıklarını düzeltmek amacıyla sözleşmeleri yükseltmek (mümkün olduğu durumlarda) için kod tabanlarının kapsamlı şekilde yeniden yazılması ve geliştirmeye daha fazla çaba harcanması gerekir. Resmi doğrulama, sözleşme uygulamalarında test edenlerin ve denetimcilerin gözünden kaçabilecek birçok hatayı saptayabilir ve sözleşmeyi dağıtmadan önce bu hataların düzeltilmesi için çok sayıda fırsat sunar.

## Resmi doğrulamanın dezavantajları {#drawbacks-of-formal-verification}

### Manuel işçilik maliyeti {#cost-of-manual-labor}

Resmi doğrulama, özellikle doğruluk kanıtlarını elde etmede insanın kanıtlayıcıya rehberlik ettiği yarı otomatik doğrulama ciddi miktarda el emeği gerektirir. Daha da ötesi, resmi spesifikasyon oluşturmak yüksek düzey beceri gerektiren karmaşık bir faaliyettir.

Bu faktörler (çaba ve beceri), test etme ve denetleme gibi sıradan sözleşme doğruluğu belirleme yöntemlerine kıyasla resmi doğrulamayı daha zorlayıcı ve masraflı hale getirir. Yine de akıllı sözleşme uygulamalarında yapılan hataların maliyeti göz önüne alındığında tam doğrulama denetiminin maliyetini ödemek daha makuldür.

### Yanlış negatifler {#false-negatives}

Resmi doğrulama, yalnızca akıllı sözleşmenin yürütmesinin resmi spesifikasyon ile eşleşip eşleşmediğini denetleyebilir. Bu bakımdan, spesifikasyonun akıllı sözleşmenin beklenen davranışlarını doğru şekilde açıkladığından emin olmak önemlidir.

Spesifikasyonlar kötü yazılmışsa, özellik ihlalleri (güvenlik açığı bulunan yürütmelere işaret eden) resmi doğrulama denetimi yoluyla saptanamaz. Bu durumda, bir geliştirici yanlışlıkla sözleşmenin hatasız olduğunu varsayabilir.

### Performans sorunları {#performance-issues}

Resmi doğrulamada bir dizi performans sorunu ile karşılaşılır. Örneğin, model kontrolü ve sembolik kontrol sırasında karşılaşılan, sırasıyla durum ve yol patlama sorunları doğrulama prosedürlerini etkileyebilir. Ayrıca resmi doğrulama araçları, alt katmanlarında sıklıkla SMT çözücülerini ve diğer kısıtlama çözücülerini kullanır ve bu çözücüler işlemsel açıdan yoğun süreçlere dayalıdır.

Ayrıca, bir program asla sonlanmayabileceğinden, program doğrulayıcılarının bir özelliğin (mantıksal bir formül olarak tanımlanan) karşılanıp karşılanamayacağını belirlemesi her zaman mümkün değildir ("[karar verilebilirlik sorunu](https://en.wikipedia.org/wiki/Decision_problem)"). Bundan ötürü iyi belirtilmiş olsa bile bir sözleşme için bazı özellikleri kanıtlamak imkânsız olabilir.

## Ethereum akıllı sözleşmeleri için resmi doğrulama araçları {#formal-verification-tools}

### Resmi spesifikasyonlar oluşturmak için spesifikasyon dilleri {#specification-languages}

**Act**: __Act; depolama güncellemelerinin, ön/son koşulların ve sözleşme değişmezlerinin spesifikasyonuna olanak tanır. Ayrıca, araç takımı Coq, SMT çözücüleri veya hevm üzerinden birçok özelliği kanıtlayabilen kanıt arka uçlarına sahiptir.__

- [GitHub](https://github.com/ethereum/act)
- [Belgeler](https://github.com/argotorg/act)

**Scribble** - __Scribble, Scribble spesifikasyon dilindeki kod ek açıklamalarını, spesifikasyonu kontrol eden somut savlara dönüştürür.__

- [Belgeler](https://docs.scribble.codes/)

**Dafny** - __Dafny, kodun doğruluğu hakkında akıl yürütmek ve kanıtlamak için üst düzey ek açıklamalara dayanan, doğrulamaya hazır bir programlama dilidir.__

- [GitHub](https://github.com/dafny-lang/dafny)

### Doğruluğu kontrol etmek için program doğrulayıcıları {#program-verifiers}

**Certora Prover** - _Certora Prover, akıllı sözleşmelerde kod doğruluğunu kontrol etmek için kullanılan otomatik bir resmi doğrulama aracıdır. Spesifikasyonlar, özellik ihlallerinin statik analiz ve kısıt çözme kombinasyonu kullanılarak tespit edildiği CVL (Certora Doğrulama Dili) ile yazılır._

- [Web sitesi](https://www.certora.com/)
- [Belgeler](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - __Solidity’nin SMTChecker'ı, SMT (Teorilere Göre Karşılanabilirlik) ve Horn çözümlemesine dayalı yerleşik bir model denetleyicisidir. Derleme sırasında bir sözleşmenin kaynak kodunun spesifikasyonlarla uyumlu olduğunu onaylar ve güvenlik özelliklerinin ihlallerini statik olarak kontrol eder.__

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - __solc-verify, ek açıklamaları ve modüler program doğrulamasını kullanarak Solidity kodu üzerinde otomatik resmi doğrulama gerçekleştirebilen Solidity derleyicisinin genişletilmiş bir sürümüdür.__

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - __KEVM, K çerçevesinde yazılmış Ethereum Sanal Makinesi'nin (EVM) resmi bir semantiğidir. KEVM, yürütülebilir özelliktedir ve ulaşılabilirlik mantığını kullanarak özellikle ilgili belirli savları kanıtlayabilir.__

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Belgeler](https://jellopaper.org/)

### Teorem kanıtlama için mantıksal çerçeveler {#theorem-provers}

**Isabelle** - _Isabelle/HOL, matematiksel formüllerin resmi bir dilde ifade edilmesini sağlayan ve bu formülleri kanıtlamak için araçlar sunan bir kanıt yardımcısıdır. Ana uygulama, matematiksel kanıtların ve özellikle bilgisayar donanımının veya yazılımının doğruluğunu ve bilgisayar dilleri ve protokollerinin özelliklerini kanıtlamayı içeren resmi doğrulamanın resmileştirilmesidir._

- [GitHub](https://github.com/isabelle-prover)
- [Belgeler](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq, teoremleri kullanarak programları tanımlamanıza ve doğruluğun makine tarafından kontrol edilen kanıtlarını etkileşimli olarak oluşturmanıza olanak tanıyan etkileşimli bir teorem kanıtlayıcısıdır._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Belgeler](https://rocq-prover.org/docs)

### Akıllı sözleşmelerde savunmasız kalıpları tespit etmek için sembolik yürütme tabanlı araçlar {#symbolic-execution-tools}

**Manticore** - __Sembolik yürütmeye dayalı bir EVM bayt kodu analiz aracıdır.__

- [GitHub](https://github.com/trailofbits/manticore)
- [Belgeler](https://github.com/trailofbits/manticore/wiki)

**hevm** - __hevm, EVM bayt kodu için bir sembolik yürütme motoru ve denklik denetleyicisidir.__

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Ethereum akıllı sözleşmelerindeki güvenlik açıklarını tespit etmek için sembolik bir yürütme aracıdır_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Belgeler](https://mythril-classic.readthedocs.io/en/develop/)

## Daha fazla kaynak {#further-reading}

- [Akıllı Sözleşmelerin Resmi Doğrulaması Nasıl Çalışır?](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Resmi Doğrulama Kusursuz Akıllı Sözleşmeleri Nasıl Sağlayabilir?](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Ethereum Ekosistemindeki Resmi Doğrulama Projelerine Genel Bir Bakış](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Ethereum 2.0 Para Yatırma Akıllı Sözleşmesinin Uçtan Uca Resmi Doğrulaması](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Dünyanın En Popüler Akıllı Sözleşmesini Resmi Olarak Doğrulama](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker ve Resmi Doğrulama](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
