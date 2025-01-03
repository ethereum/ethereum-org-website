---
title: Akıllı sözleşmelerin resmi doğrulaması
description: Ethereum akıllı sözleşmelerinin resmi doğrulamasına genel bir bakış
lang: tr
---

[Akıllı sözleşmeler](/developers/docs/smart-contracts/), yeni kullanım durumları sunan ve kullanıcılar için değer kilidini açan merkeziyetsiz, güvensiz ve güçlü uygulamalar oluşturmayı mümkün kılıyor. Akıllı sözleşmeler büyük miktarlarda değer işlediğinden güvenlik, geliştiriciler için kritik bir husustur.

Resmi doğrulama, [akıllı sözleşme güvenliğini](/developers/docs/smart-contracts/security/) iyileştirme konusunda önerilen tekniklerden biridir. Programları belirlemek, tasarlamak ve doğrulamak için [resmi yöntemler](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) kullanan resmi doğrulama, kritik donanım ve yazılım sistemlerinin doğruluğunun sağlanması amacıyla yıllardır kullanılmaktadır.

Resmi doğrulama, akıllı sözleşmelerde uygulandığında bir sözleşmenin iş mantığının önceden tanımlanmış bir özelliği karşıladığını kanıtlayabilir. Resmi doğrulama, test etme gibi sözleşme kodunun doğruluğunu değerlendiren diğer yöntemlerle karşılaştırıldığında, bir akıllı sözleşmenin fonksiyonel olarak doğru olduğunu garanti etme noktasında daha güçlüdür.

## Resmi doğrulama nedir? {#what-is-formal-verification}

Resmi doğrulama, bir sistemin resmi spesifikasyonu ile ilgili olarak doğruluğunu değerlendirme sürecini ifade eder. Daha basit ifadelerle resmi doğrulama, bize sistem davranışının bazı gereksinimleri (örneğin istediklerimizi yapması) karşılayıp karşılamadığını bilme imkanı tanır.

Sistemin (bu durumda akıllı sözleşme) öngörülen davranışları, resmi modelleme kullanılarak açıklanırken spesifikasyon dilleri resmi özelliklerin yaratılmasına olanak tanır. Bunun ardından resmi modelleme teknikleri bir sözleşmenin uygulanmasının spefifikasyonuna uygun olduğunu ve bunun doğruluğunun matematiksel kanıtını ortaya koyduğunu doğrulayabilir. Bir sözleşme spesifikasyonunu karşılarsa ''fonksiyonel olarak doğru'', ''tasarım olarak doğru'' veya ''yapı olarak doğru'' biçimlerinde sınıflandırılır.

### Resmi model nedir? {#what-is-a-formal-model}

Bilgisayar bilimlerinde [resmi model](https://en.wikipedia.org/wiki/Model_of_computation) bilgi işleme sürecin matematiksel açıklamasıdır. Programlar, matematiksel işlevler (denklemler) halinde soyutlanırken model, bir girdi verildiğinde fonksiyonlara verilen çıktıların nasıl işlendiğini açıklar.

Resmi modeller, bir programın davranış analizinin nasıl değerlendirilebileceğine ilişkin soyutlama düzeyini sunar. Resmi modellerin varlığı, ilgili modelin arzulanan niteliklerini açıklayan _resmi spesifikasyonun_ oluşturulmasına olanak sağlar.

Akıllı sözleşmelerin resmi doğrulama modellemelerinde farklı teknikler kullanılmaktadır. Örneğin, bazı modeller bir akıllı sözleşmenin yüksek düzey davranışını anlamak için kullanılır. Bu modelleme teknikleri akıllı sözleşmelere, onları girdileri kabul eden ve bu girdilere dayanan hesaplamaları yürüten sistemler olarak gören kara kutu görünümü uygular.

Yüksek düzey modeller, akıllı sözleşmeler ile dışarıdan sahip olunan hesaplar (EOA'lar), sözleşme hesapları ve blokzincir çevresi gibi dış aracılar arasındaki ilişkiye odaklanır. Bunun gibi modeller, belirli kullanıcı etkileşimlerine cevaben bir sözleşmenin nasıl davranacağını belirleyen özellikleri tanımlamak açısından kullanışlıdır.

Diğer resmi modeller, bunun aksine bir akıllı sözleşmenin düşük düzey davranışına odaklanır. Üst düzey modeller bir sözleşmenin işlevselliği hakkında akıl yürütmeye yardımcı olabilirken, uygulamanın iç işleyişi ile ilgili ayrıntıları yakalamakta bazen başarısız olabilirler. Düşük düzeyli modeller, program analizine beyaz kutu bakışı uygular ve sözleşmenin yürütülmesiyle ilgili özellikleri anlamak için program izleri ve [kontrol akım grafikleri](https://en.wikipedia.org/wiki/Control-flow_graph) gibi akıllı sözleşme uygulamalarının daha düşük düzeyli gösterimlerine dayanır.

Düşük düzeyli modeller, bir akıllı sözleşmenin Ethereum'un yürütme ortamındaki (örneğin [EVM](/developers/docs/evm/)) fiili yürütülmesini temsil ettiğinden ideal olarak kabul edilir. Düşük düzeyli modelleme teknikleri, özellikle akıllı sözleşmelerde kritik güvenlik özelliklerini tesis ederken ve olası güvenlik açıklarını tespit ederken kullanışlıdır.

### Resmi spesifikasyon nedir? {#what-is-a-formal-specification}

Spesifikasyon, basitçe anlatmak gerekirse belirli bir sistemin karşılaması gereken bir teknik gerekliliktir. Spesifikasyon, programlamada bir programın yürütülmesi hakkındaki genel fikirleri (örneğin programın ne yapması gerektiği) temsil eder.

Akıllı sözleşmeler bağlamında resmi spesifikasyonlar, _özellikleri_ (bir sözleşmenin karşılaması gereken gerekliliklerin resmi açıklamaları) ifade eder. Bu gibi özellikler ''değişmezler'' olarak nitelendirilir ve bir sözleşmenin hiçbir istisna olmadan her olası koşul altında doğru kalmak zorunda olan yürütülmesi hakkındaki mantıklı savları temsil eder.

Böylelikle resmi spesifikasyonu, akıllı sözleşmenin amaçlanan yürütmesini açıklayan resmi bir dilde yazılmış ifadeler toplamı olarak düşünebiliriz. Spesifikasyonlar, bir sözleşmenin özelliklerini ele alır ve sözleşmenin farklı koşullar altında nasıl davranması gerektiğini tanımlar. Resmi doğrulamanın amacı, akıllı sözleşmenin bu özellikleri (değişmezleri) taşıyıp taşımadığına ve bu özelliklerin yürütme esnasında ihlal edilip edilmediğine karar vermektir.

Resmi spesifikasyonlar, akıllı sözleşmelerin güvenli uygulamalarını geliştirirken hayati önem taşır. Değişmezleri uygulayamayan veya yürütme sırasında özellikleri ihlal edilen sözleşmeler, işlevselliğini zedeleyecek veya kötü niyetli istismara yol açabilecek güvenlik açıklarına yatkındır.

## Akıllı sözleşmeler için resmi spesifikasyon türleri {#formal-specifications-for-smart-contracts}

Resmi spesifikasyonlar, program yürütülmesinin doğruluğu hakkında matematiksel gerekçelendirmeyi mümkün kılar. Resmi modellerde olduğu gibi resmi spesifikasyonlar da sözleşme uygulamasının ya yüksek düzey özelliklerini ya da düşük düzey davranışını yakalar.

Resmi spesifikasyonlar, bir programın özellikleri hakkında resmi gerekçelendirmeye olanak tanıyan [program mantığı](https://en.wikipedia.org/wiki/Logic_programming) öğeleri kullanılarak türetilir. Program mantığı, bir programın beklenen davranışını açıklayan (matematik dilinde) resmi kurallara sahiptir. [Ulaşılabilirlik mantığı](https://en.wikipedia.org/wiki/Reachability_problem), [zamansal mantık](https://en.wikipedia.org/wiki/Temporal_logic) ve [Hoare mantığı](https://en.wikipedia.org/wiki/Hoare_logic) dahil olmak üzere resmi spesifikasyonlar oluştururken çeşitli program mantıkları kullanılır.

Akıllı sözleşmelere yönelik resmi spesifikasyonlar, geniş bağlamda **yüksek düzeyli** veya **düşük düzeyli** spesifikasyonlar olarak sınıflandırılabilir. Spesifikasyon hangi kategoriye ait olursa olsun analiz edilen sistemin özelliğini yeterli ve açık biçimde tarif etmelidir.

### Yüksek düzeyli spesifikasyonlar {#high-level-specifications}

İsminden de anlaşılacağı gibi, yüksek düzeyli bir spesifikasyon ("model yönelimli spesifikasyon" olarak da adlandırılır), bir programın üst düzey davranışını tanımlar. Yüksek düzeyli spesifikasyonlar, bir akıllı sözleşmeyi, FSM modeli için resmi özellikleri tanımlamak amacıyla kullanılan zamansal mantıkla işlemler gerçekleştirerek durumlar arasında geçiş yapabilen bir [sonlu durum makinesi](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM) olarak modeller.

[Zamansal mantıklar](https://en.wikipedia.org/wiki/Temporal_logic), "zaman açısından nitelendirilen önermeler hakkında akıl yürütme kurallarıdır (ör: "Ben _her zaman_ açım" veya "Ben _sonunda_ acıkacağım")." Resmi doğrulama uygulandığında, zamansal mantıklar, durum makineleri olarak modellenen sistemlerin doğru davranışı hakkındaki savları belirtmek için kullanılır. Spesifik olarak bir zamansal mantık, bir akıllı sözleşmenin gelecekte olabileceği durumları ve durumlar arasında nasıl geçiş yaptığını açıklar.

Yüksek düzeyli spesifikasyonlar genellikle akıllı sözleşmeler için iki kritik geçici özelliği yakalar: **güvenlik** ve **canlılık**. Güvenlik özellikleri, “asla kötü bir şey olmaz” düşüncesini temsil eder ve genellikle değişmezliği ifade eder. Bir güvenlik özelliği [kördüğümden](https://www.techtarget.com/whatis/definition/deadlock) kurtuluş gibi genel yazılım gereksinimleri belirleyebilir veya sözleşmeler için alana özel özellikleri ifade edebilir (örneğin fonksiyonlar için erişim kontrolünde değişmezler, durum değişkenlerinin geçerli değerleri veya jeton transferleri için koşullar).

ERC-20 jeton sözleşmelerinde `transfer()` veya `transferFrom()` fonksiyonlarının kullanım koşullarını kapsayan bu güvenlik gereksinimini örnek olarak alabilirsiniz: _"Göndericinin bakiyesi asla gönderilmek istenen jeton miktarından az olamaz."_. Bir sözleşme değişmezinin doğal dille yapılan bu açıklaması, resmi (matematiksel) bir spesifikasyona çevrilebilir ve bunun geçerliliği de sonrasında katı bir biçimde kontrol edilebilir.

Canlılık özellikleri "iyi bir şeyin nihayetinde gerçekleştiğini" ileri sürer ve bir sözleşmenin farklı durumlardan geçme kabiliyeti ile ilgilidir. Canlılık özelliğine örnek olarak, bir sözleşmenin kullanıcılarına isteğe bağlı olarak bakiyelerini transfer etme kabiliyeti anlamına gelen "likidite" verilebilir. Bu özelliğin ihlal edilmesi durumunda kullanıcılar tıpkı [Parity cüzdanı olayında](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html) olduğu gibi sözleşmede saklanan varlıklarını çekemezler.

### Düşük düzeyli spesifikasyonlar {#low-level-specifications}

Yüksek düzeyli spesifikasyonlar, sonlu durum sözleşme modelini bir başlangıç noktası olarak alır ve bu modelin arzulanan özelliklerini açıklar. Tam tersi şekilde düşük düzeyli spesifikasyonlar (''özellik odaklı spesifikasyonlar'' da denir) sıklıkla programları (akıllı sözleşmeler) matematiksel fonksiyonlardan oluşan bir koleksiyon içeren sistemler olarak modeller ve bu sistemlerin doğru davranışlarını açıklar.

Basitleştirmek gerekirse, düşük düzeyli spesifikasyonlar _program izlerini_ analiz eder ve bu izlerin üzerinden akıllı sözleşme özelliklerini tanımlamaya çabalar. İzler, bir akıllı sözleşmenin durumunu değiştiren fonksiyon yürütme dizilerini ifade eder ve dolayısıyla düşük düzeyli spesifikasyonlar, bir sözleşmenin dahili yürütme gerekliliklerinin belirtilmesine yardımcı olur.

Düşük düzeyli resmi spesifikasyonlar Hoare tarzı özellikler veya yürütme yolundaki değişmezler olarak verilebilir.

### Hoare tarzı özellikler {#hoare-style-properties}

[Hoare Mantığı](https://en.wikipedia.org/wiki/Hoare_logic), akıllı sözleşmeleri de kapsayan programların doğruluğu hakkında resmi bir gerekçelendirme kural sınıfı sağlar. Hoare-tarzı bir özellik, Hoare üçlüsü tarafından temsil edilir {_P_}_c_{_Q_}, burada _c_ bir programdır ve _P_ ile _Q_ da _c_ (yani program) durumuna yönelik ifadelerdir, resmi olarak sırayla _ön koşullar_ ve _art koşullar_ olarak tanımlanmışlardır.

Bir ön koşul, bir fonksiyonun doğru yürütülmesi için gerekli koşulları açıklayan bir ifadedir; bu sözleşmeyi çağıran kullanıcılar bu gerekliliği karşılamak zorundadır. Bir art koşul ise doğru biçimde yürütülmesi şartıyla bir fonksiyonun tesis ettiği koşulu açıklayan bir ifadedir; kullanıcılar, fonksiyona çağrı sonrası bu koşulun doğru olmasını bekler. Hoare mantığındaki bir _değişmez_, fonksiyonun yürütülmesi ile korunan bir ifadedir (örneğin, değişmez).

Hoare-tarzı spesifikasyonlar, _kısmi doğruluğu_ ya da _tam doğruluğu_ garanti eder. Ön koşulun fonksiyon yürütülmeden önce doğru olması durumunda sözleşme fonksiyonunun uygulaması "kısmen doğrudur", yürütmenin sonlanması durumunda ise art koşul da doğrudur. Bir ön koşulun fonksiyonun yürütülmesi öncesinde doğru olması halinde tam doğruluk kanıtı elde edilmiş olur, yürütmenin sonlandırılması garantidir ve sonlandığında art koşul da doğru olur.

Tam doğruluk kanıtı elde etmek, bazı yürütmelerin sonlanmadan önce gecikebileceği ya da hiç sonlanmayabileceği için zordur. Bununla birlikte, yürütmenin sona erip ermediği sorusu tartışmalı bir nokta olabilir, çünkü Ethereum'un gaz mekanizması sonsuz program döngülerini önler (yürütme ya başarılı bir şekilde ya da "gaz yeterli değil" hatası nedeniyle sona erer).

Hoare mantığı kullanılarak oluşturulan akıllı sözleşme spesifikasyonları, bir sözleşmedeki fonksiyonların ve döngülerin yürütülmesi için tanımlanmış ön koşullara, art koşullara ve değişmezlere sahiptir. Ön koşullar sıklıkla fonksiyona hatalı girdi yapılması olasılığını beraberinde getirirken art koşullar da bu girdilere yönelik istenen yanıtları açıklar (örneğin, belirli bir istisna atılması). Bu sebepten, Hoare tarzı özellikler sözleşme uygulamalarının doğruluğunu sağlama konusunda etkilidir.

Çoğu resmi doğrulama taslağı, fonksiyonların anlamsal doğruluğunu kanıtlamak için Hoare tarzı spesifikasyonlar kullanır. Hoare tarzı özelliklerin (savlar olarak) Solidity'deki `require` ve `assert` ifadeleri kullanılarak sözleşme koduna doğrudan eklenmesi mümkündür.

`assert` güvenlik için gerekli art koşulu belirlerken `require` ifadeleri ise bir ön koşulu veya değişmezi açıklar ve sıklıkla kullanıcı girdilerini doğrulamak amacıyla kullanılır. Örneğin; fonksiyonlar için düzgün erişim kontrolü (bir güvenlik özelliği örneği), `require` ifadesinin çağıran hesabın kimliği üzerinde bir ön koşul kontrolü olarak kullanılmasıyla elde edilebilir. Benzer biçimde sözleşmedeki durum değişkenlerinin izin verilen değişmezleri (örneğin dolaşımdaki toplam jeton sayısı), fonksiyon yürütmesinin ardından sözleşme durumunu onaylamak için `assert` ifadesi kullanılarak ihlalden korunabilir.

### İz düzeyinde özellikler {#trace-level-properties}

İz tabanlı spesifikasyonlar, bir sözleşmeye farklı durumlar arasında geçiş yaptıran işlemleri ve bu işlemler arasındaki ilişkileri açıklar. Daha önce açıklandığı üzere izler, sözleşmenin durumunu belirli bir şekilde değiştiren işlem dizileridir.

Bu yaklaşım, akıllı sözleşmeleri, durum geçiş sistemleri modeli olarak ele alır ve bazı önceden tanımlanmış durumlarla (durum değişkenleri ile tanımlanan) birlikte önceden tanımlanmış geçişler kümesiyle (sözleşme işlevleri ile tanımlanan) birlikte çalışır. Ayrıca, bir sözleşmenin işlemsel anlamını açıklamak için bir programın yürütme akışının grafiksel bir gösterimi olan [kontrol akış grafiği (CFG)](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) sıkça kullanılır. Burada her iz, kontrol akış grafiğinde bir yol olarak gösterilir.

İz düzeyinde spesifikasyonlar, öncelikli olarak akıllı sözleşmelerde dahili yürütme desenlerini anlamak için kullanılır. İz düzeyinde spesifikasyonlar oluşturarak bir akıllı sözleşme için kabul edilebilir yürütme yollarını (örneğin durum geçişleri) ileri süreriz. Sembolik yürütme gibi teknikler kullanarak yürütmenin, resmi modelde tanımlanmamış hiçbir yolu asla takip etmeyeceğini resmi olarak doğrulayabiliriz.

İz düzeyinde özellikleri açıklamak için bazı herkese açık işlevlere sahip [DAO](/dao/) sözleşmeleri örneğini kullanalım. Burada, DAO sözleşmesinin kullanıcıların şu işlemleri gerçekleştirmesine izin verdiğini varsayıyoruz:

- Fon yatırma

- Fon yatırdıktan sonra bir teklife oy verme

- Bir teklife oy vermezlerse geri ödeme talebinde bulunma

İz düzeyinde özelliklere örnek olarak _"fon yatırmamış kullanıcıların bir teklife oy verememesi"_ ya da _"bir teklife oy vermemiş kullanıcıların her zaman para iadesi talep edebilmesi"_ verilebilir. Her iki özellik de tercih edilen yürütme sıralamalarını belirtir (oy verme, fon yatırma işleminden _önce_ ve bir iade talebi, bir teklife oy verdikten _sonra_ gerçekleşemez).

## Akıllı sözleşmelerin resmi doğrulamasına yönelik teknikler {#formal-verification-techniques}

### Model kontrolü {#model-checking}

Model kontrolü, bir algoritmanın resmi bir akıllı sözleşme modelini spesifikasyonu ile karşılaştırarak kontrol ettiği bir resmi doğrulama tekniğidir. Model kontrolünde, izin verilen sözleşme durumlarındaki özellikler zamansal mantık kullanılarak açıklanırken akıllı sözleşmeler sıklıkla durum geçiş sistemleri olarak gösterilir.

Model kontrolü, bir sistemin soyut matematiksel gösteriminin (örneğin bir sözleşme) oluşturulmasını ve bu sistemin özelliklerinin [önermeli mantığı](https://www.baeldung.com/cs/propositional-logic) temel alan formülleri kullanarak ifade edilmesini gerektirir. Bu, başka bir deyişle matematiksel bir modelin belirli bir formülü karşıladığını kanıtlamak adına model kontrol algoritmasının görevini basitleştirir.

Resmi doğrulamada model kontrolü, öncelikli olarak bir sözleşmenin zaman içindeki davranışını açıklayan zamansal mantığı değerlendirmek için kullanılır. Akıllı sözleşmelerin zamansal özellikleri arasında daha önce açıkladığımız _güvenlik_ ve _canlılık_ yer alır.

Örneğin, erişim kontrolüne ilişkin bir güvenlik özelliği (_Yalnızca sözleşme sahibinin `selfdestruct` çağrısı yapabilmesi gibi_) resmi mantıkla yazılabilir. Bunun ardından model kontrol algoritması, sözleşmenin bu resmi spesifikasyonu karşıladığını doğrulayabilir.

Model kontrolü, bir akıllı sözleşmenin tüm olası durumlarını oluşturmayı ve özellik ihlali ile sonuçlanan ulaşılabilir durumları bulmaya çalışmayı içeren durum alan keşfini kullanır. Ancak bu, durum sayısının sonsuz olmasına (''durum patlama sorunu'' olarak da bilinir) yol açabilir ve dolayısıyla model kontrolü yapanlar, akıllı sözleşmelerin etkili analizini yapmayı mümkün kılan soyutlama tekniklerine güvenirler.

### Varsayım kanıtlama {#theorem-proving}

Varsayım kanıtlama, akıllı sözleşmeleri de içeren programların doğruluğunu matematiksel olarak gerekçelendirmeye yönelik bir yöntemdir. Bir sözleşmenin sistem modelini ve spesifikasyonlarını matematiksel formüllere (mantık ifadeleri) dönüştürmeyi içerir.

Varsayım kanıtlamanın amacı, bu ifadeler arasındaki mantıksal eşdeğerliği doğrulamaktır. "Mantıksal eşdeğerlik" ("mantıksal iki yönlü bağıntı" olarak da adlandırılır), ilk ifadenin _yalnızca ve yalnızca_ ikinci ifade doğru ise doğru olduğu iki durum arasındaki bir ilişki türüdür.

Sözleşmenin modeli ve özelliği hakkındaki ifadeler arasında bulunması gereken ilişki (mantıksal eşdeğerlik), kanıtlanabilir bir ifade (varsayım olarak anılır) olarak formüle edilir. Otomatikleştirilmiş varsayım kanıtlayıcısı, resmi bir çıkarım sistemi kullanarak varsayımın doğruluğunu kanıtlayabilir. Bir başka deyişle varsayım kanıtlayıcısı, akıllı sözleşme modelinin spesifikasyonlarıyla bire bir uyumlu olduğunu kesin olarak kanıtlayabilir.

Model kontrolü, sözleşmeleri sonlu duruma sahip geçiş sistemleri olarak modellerken, varsayım kanıtlama sonsuz durumlu sistemlerin analizini yapabilir. Ancak bu, otomatikleştirilmiş varsayım kanıtlayıcısının mantıksal bir problemin her zaman ''kararlaştırılabilir'' olup olmadığını bilememesi anlamına gelir.

Bunun bir sonucu olarak, varsayım kanıtlayıcısına doğruluk kanıtlarına erişirken rehberlik etmesi için sıklıkla insan desteği gereklidir. İnsan çabasının varsayım kanıtlamada kullanımı, tamamen otomatikleştirilmiş olan model denetimine kıyasla onu daha pahalı hale getirmektedir.

### Sembolik yürütme {#symbolic-execution}

Sembolik yürütme, fonksiyonların _somut değerler_ (örneğin, `x == 5`) yerine _sembolik değerler_ (örneğin `x > 5`) kullanarak bir yürütüldüğü akıllı sözleşme analiz yöntemidir. Bir resmi doğrulama tekniği olarak sembolik yürütme, sözleşme kodunda bulunan iz düzeyinde özellikleri anlamak amacıyla kullanılır.

Sembolik yürütme, bir yürütme izini sembolik girdi değerleri üzerinde matematiksel bir formül olarak gösterir ve buna aynı zamanda _yol belirteci_ de denir. Bir yol belirtecinin "karşılanabilir" olup olmadığını (yani, formülü karşılayabilecek bir değer olup olmadığını) kontrol etmek için [SMT çözücüsü](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) kullanılır. Güvenlik açığı bulunan bir yol karşılanabilir nitelikteyse, SMT çözücüsü yürütmeyi tetikleyerek o yola doğru yönlendiren somut bir değer üretecektir.

Bir akıllı sözleşmenin fonksiyonunun bir `uint` değerini (`x`) girdi olarak aldığını ve `x` değeri `5`'ten büyük ve aynı zamanda `10`'dan küçük olduğunda eski haline döndürdüğünü düşünün. Normal bir test prosedürü kullanarak hatayı tetikleyen bir `x` değeri bulmak için gerçekten hata tetikleyen bir girdiyi bulma garantisi olmadan onlarca (veya daha fazla) test durumu çalıştırmak gerekebilir.

Bunun aksine, sembolik bir yürütme aracı ile fonksiyon şu sembolik değerle yürütülürdü: `X > 5 ∧ X < 10` (yani, `x` 5'ten büyük VE `x` 10'dan küçük). Daha sonra ilişkili yol ifadesi `x = X > 5 ∧ X < 10` bir SMT çözücüsüne çözmesi için verilirdi. Belirli bir değerin `x = X > 5 ∧ X < 10` formülünü karşılaması halinde, SMT çözücüsü bunu hesaplar; örneğin çözücü, `x` için bir değer olarak `7` verebilir.

Bu, sembolik yürütmenin bir programın girdilerine dayanması ve ulaşılabilir tüm durumları keşfetmek için araştırılacak girdi kümesinin potansiyel olarak sonsuz olması nedeniyle hala bir tür test yöntemidir. Ancak örnekte gösterildiği gibi sembolik yürütme, özellik ihlallerini tetikleyen girdileri bulmaya yönelik düzenli testlere kıyasla daha verimlidir.

Ayrıca sembolik yürütme, bir fonksiyon için rastgele girdiler üreten diğer özellik tabanlı teknikler (örneğin, bulandırma) ile karşılaştırıldığında daha az yalancı pozitif üretir. Sembolik yürütme sırasında bir hata durumu tetiklenmesi halinde hatayı tetikleyen somut bir değer üreterek sorunu tekrarlamak mümkündür.

Sembolik yürütme aynı zamanda belirli bir düzeyde matematiksel doğruluk kanıtı da sağlayabilir. Taşma korumasına sahip bir sözleşme fonksiyonu örneğini aşağıda inceleyebilirsiniz:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
```

Tamsayı taşması ile sonuçlanan bir yürütme izinin şu formülü sağlaması gerekir: `z = x + y VE (z >= x) VE (z >= y) VE (z < x VEYA z < y)`. Böyle bir formülün çözülmesi pek olası değildir, bu nedenle `safe_add` fonksiyonunun asla taşmadığına dair bir matematiksel kanıt görevi görür.

### Akıllı sözleşmeler için neden resmi doğrulama kullanılmalı? {#benefits-of-formal-verification}

#### Güvenilirlik gereksinimi {#need-for-reliability}

Hata yapması sonucunda ölüm, yaralanma veya maddi yıkım gibi tahrip edici sonuçlara sebep olabilecek hayati öneme sahip sistemlerin doğruluğunun değerlendirmesinde resmi doğrulama kullanılır. Akıllı sözleşmeler, basit hataların [kullanıcılar için geri döndürülemez kayıplara yol açacağı](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/), çok büyük miktarda değeri kontrol eden yüksek değerli uygulamalardır. Ancak bir sözleşmeyi dağıtımdan önce resmi olarak doğrulamak, blok zincir üzerinde çalıştığında arzu edildiği gibi işlem göreceğine yönelik garantiyi güçlendirecektir.

Güvenilirlik, her bir akıllı sözleşmede, özellikle de kodu değiştirilemez olarak dağıtılmış Ethereum Sanal Makinesi'nde (EVM) yüksek düzeyde arzu edilen bir niteliktir. Şu anda erişilemeyen piyasaya sürülme sonrası yükseltmelerle sözleşmelerin güvenilirliğini garanti etme ihtiyacı, resmi doğrulamayı gerekli kılar. Resmi doğrulama, denetimciler ve test edenlerin gözünden kaçabilecek tamsayı taşma ve yetersizliği, yeniden giriş ve düşük gaz optimizasyonları gibi dolambaçlı sorunları algılayabilir.

#### Fonksiyonel doğruluğun kanıtlanması {#prove-functional-correctness}

Program test etme, bir akıllı sözleşmenin bazı gereklilikleri karşıladığını kanıtlamanın en yaygın yöntemidir. Bu süreç, işlemesi beklenen bir veri örneği ile sözleşmenin yürütülmesini ve davranışının incelenmesini içerir. Sözleşmenin örnek veri için beklenen sonuçları vermesi durumunda geliştiriciler, doğruluğuna ilişkin nesnel kanıta sahip olmuş olur.

Ancak bu yaklaşım, örneğin içinde yer almayan girdi değerleri için doğru yürütmeyi kanıtlayamaz. Bundan dolayı bir sözleşmeyi test etmek hataları (örneğin yürütme sırasında bazı kod yollarının arzu edilen sonuçları vermemesi) algılamaya yardımcı olabilir ancak **kesin olarak hatasız olduğunu kanıtlayamaz**.

Bunun aksine resmi doğrulama, sözleşme _hiç_ yürütülmeden akıllı sözleşmenin sınırlı bir yürütme aralığı için gereklilikleri karşıladığını resmi olarak kanıtlayabilir. Bunun için doğru sözleşme davranışlarını net olarak açıklayan resmi bir spesifikasyon oluşturulmasına ve sözleşme sistemi için resmi bir (matematiksel) model geliştirilmesine ihtiyaç vardır. Sonrasında, sözleşme modeli ve spesifikasyonu arasındaki tutarlılığı denetlemek için resmi kanıt prosedürünü izleyebiliriz.

Resmi doğrulama sayesinde bir sözleşmenin iş mantığının gereklilikleri karşılayıp karşılamadığını doğrulama sorusu, kanıtlanabilen veya aksi ispatlanabilen matematiksel bir önerme niteliği kazanır. Bir önermeyi resmi olarak kanıtlayarak sınırsız sayıda test durumunu sınırlı sayıda adımla doğrulayabiliriz. Bu bağlamda resmi doğrulamanın bir sözleşmenin bir spesifikasyona göre işlevsel olarak doğruluğunu kanıtlama konusunda başarılı olma olasılığı daha yüksektir.

#### İdeal doğrulama hedefleri {#ideal-verification-targets}

Bir doğrulama hedefi, resmi olarak doğrulanacak sistemi açıklar. Resmi doğrulama en iyi ''gömülü sistemlerde'' (daha büyük bir sistemin bir parçasını teşkil eden küçük, basit yazılım parçaları) sonuç verir. Ayrıca, alan adına özgü özellikleri doğrulamaya yarayan araçları düzenlemeyi kolaylaştırdığı için daha az kurala sahip özel alan adları için de idealdirler.

Akıllı sözleşmeler, (en azından, belirli bir ölçüde) her iki gerekliliği de karşılar. Örneğin, Ethereum sözleşmelerinin boyutunun küçük olması, bu sözleşmeleri resmi doğrulama açısından daha uygun kılar. Benzer şekilde, Ethereum Sanal Makinesi de basit kuralları uygular ve bu durum, Ethereum Sanal Makinesi'nde çalışan programlar için anlamsal özellikleri belirtme ve doğrulamayı kolaylaştırır.

### Daha hızlı geliştirme döngüsü {#faster-development-cycle}

Model kontrolü ve sembolik yürütme gibi resmi doğrulama teknikleri, genellikle akıllı sözleşme kodunun sıradan analizinden (test etme ve denetim sırasında uygulanan) daha etkilidir. Bunun nedeni, resmi doğrulamanın savları test etmek için somut değer kullanmanın aksine ("ya kullanıcı 5 ether çekmek isterse?") sembolik değerlere ("ya kullanıcı _n_ sayıda ether çekmek isterse?") bağlı olmasıdır.

Sembolik girdi değişkenleri somut değerlerin birçok sınıfını içerebileceğinden resmi doğrulama yaklaşımları daha kısa zaman dilimlerinde daha fazla kod kapsamı vaat eder. Resmi doğrulama, etkin biçimde kullanıldığında geliştiriciler için geliştirme döngüsünü hızlandırabilir.

Resmi doğrulama ayrıca, masraflı tasarım hatalarını azaltarak merkeziyetsiz uygulamaların (daaps) geliştirilme sürecini de hızlandırır. Güvenlik açıklarını düzeltmek amacıyla sözleşmeleri yükseltmek (mümkün olduğu durumlarda) için kod tabanlarının kapsamlı şekilde yeniden yazılması ve geliştirmeye daha fazla çaba harcanması gerekir. Resmi doğrulama, sözleşme uygulamalarında test edenlerin ve denetimcilerin gözünden kaçabilecek birçok hatayı saptayabilir ve sözleşmeyi dağıtmadan önce bu hataların düzeltilmesi için çok sayıda fırsat sunar.

## Resmi doğrulamanın dezavantajları {#drawbacks-of-formal-verification}

### El emeği maliyeti {#cost-of-manual-labor}

Resmi doğrulama, özellikle doğruluk kanıtlarını elde etmede insanın kanıtlayıcıya rehberlik ettiği yarı otomatik doğrulama ciddi miktarda el emeği gerektirir. Daha da ötesi, resmi spesifikasyon oluşturmak yüksek düzey beceri gerektiren karmaşık bir faaliyettir.

Bu faktörler (çaba ve beceri), test etme ve denetleme gibi sıradan sözleşme doğruluğu belirleme yöntemlerine kıyasla resmi doğrulamayı daha zorlayıcı ve masraflı hale getirir. Yine de akıllı sözleşme uygulamalarında yapılan hataların maliyeti göz önüne alındığında tam doğrulama denetiminin maliyetini ödemek daha makuldür.

### Yalancı negatifler {#false-negatives}

Resmi doğrulama, yalnızca akıllı sözleşmenin yürütmesinin resmi spesifikasyon ile eşleşip eşleşmediğini denetleyebilir. Bu bakımdan, spesifikasyonun akıllı sözleşmenin beklenen davranışlarını doğru şekilde açıkladığından emin olmak önemlidir.

Spesifikasyonlar kötü yazılmışsa, özellik ihlalleri (güvenlik açığı bulunan yürütmelere işaret eden) resmi doğrulama denetimi yoluyla saptanamaz. Bu durumda, bir geliştirici yanlışlıkla sözleşmenin hatasız olduğunu varsayabilir.

### Performans sorunları {#performance-issues}

Resmi doğrulamada bir dizi performans sorunu ile karşılaşılır. Örneğin, model kontrolü ve sembolik kontrol sırasında karşılaşılan, sırasıyla durum ve yol patlama sorunları doğrulama prosedürlerini etkileyebilir. Ayrıca resmi doğrulama araçları, alt katmanlarında sıklıkla SMT çözücülerini ve diğer kısıtlama çözücülerini kullanır ve bu çözücüler işlemsel açıdan yoğun süreçlere dayalıdır.

Buna ek olarak, program asla sonlanmayabileceğinden program doğrulayıcılarının bir özelliğin (mantıksal formül olarak belirtilen) karşılanabilip karşılanamayacağını ("[karar verilebilirlik sorunu](https://en.wikipedia.org/wiki/Decision_problem)") belirlemesi her zaman mümkün değildir. Bundan ötürü iyi belirtilmiş olsa bile bir sözleşme için bazı özellikleri kanıtlamak imkânsız olabilir.

## Ethereum akıllı sözleşmeleri için resmi doğrulama araçları {#formal-verification-tools}

### Resmi spesifikasyonlar oluşturmaya yönelik spesifikasyon dilleri {#specification-languages}

**Eylem**: _*Eylem, depolama spesifikasyonlarının, ön/art koşulların ve sözleşme değişmezlerinin spesifikasyonuna olanak tanır. Ayrıca, araç takımı Coq, SMT çözücüleri veya hevm üzerinden birçok özelliği kanıtlayabilen kanıt arka uçlarına sahiptir.**

- [GitHub](https://github.com/ethereum/act)
- [Belgeler](https://ethereum.github.io/act/)

**Scribble** - _*Scribble, Scribble spesifikasyon dili içindeki kod açıklamalarını spesifikasyonu kontrol eden somut savlara dönüştürür.**

- [Belgeler](https://docs.scribble.codes/)

**Dafny** - _*Dafny, kodun doğruluğunu gerekçelendirme ve kanıtlama konusunda yüksek düzeyli açıklamalara dayanan, doğrulama için hazır bir programlama dilidir.**

- [GitHub](https://github.com/dafny-lang/dafny)

### Doğruluk kontrolü için program doğrulayıcıları {#program-verifiers}

**Certora Prover** - _Certora Prover, akıllı sözleşmelerde kod doğruluğunu kontrol etmeye yarayan otomatik bir resmi doğrulama aracıdır. Spesifikasyonlar, özellik ihlallerinin tespit edilmesi için statik analiz ve kısıt çözümleme kombinasyonu kullanılarak CVL (Certora Doğrulama Dili) dilinde yazılır._

- [Web sitesi](https://www.certora.com/)
- [Belgeler](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*Solidity'nin SMTChecker'ı, SMT (Karşılanabilirlik Modüler Teorileri) ve Horn çözümlemesine dayalı yerleşik bir model denetleyicisidir. Derleme sırasında bir sözleşmenin kaynak kodunun spesifikasyonlarla uyumlu olduğunu onaylar ve güvenlik özelliklerinin ihlallerini statik olarak kontrol eder.**

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify, Solidity derleyicisinin açıklamaları ve modüler program doğrulamasını kullanarak Solidity kodu üzerinde otomatik resmi doğrulama yapabilen genişletilmiş bir sürümüdür.**

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM, Ethereum Sanal Makinesi'nin (EVM) K çerçevesinde yazılmış resmi bir semantiğidir. KEVM, yürütülebilir özelliktedir ve ulaşılabilirlik mantığını kullanarak özellikle ilgili belirli savları kanıtlayabilir.**

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Belgeler](https://jellopaper.org/)

### Varsayım kanıtlama için mantıksal çerçeveler {#theorem-provers}

**Isabelle** - _Isabelle/HOL, matematik formüllerinin resmi bir dilde ifade edilmesine olanak tanıyan ve bu formülleri kanıtlamaya yarayan araçlar sağlayan bir kanıt asistanıdır. Ana uygulama, matematiksel kanıtların ve özellikle bilgisayar donanımının veya yazılımının doğruluğunu ve bilgisayar dilleri ve protokollerinin özelliklerini kanıtlamayı içeren resmi doğrulamanın resmileştirilmesidir._

- [GitHub](https://github.com/isabelle-prover)
- [Belgeler](https://isabelle.in.tum.de/documentation.html)

**Coq** - _Coq, varsayımları kullanarak programları tanımlamanıza ve doğruluğun makine denetimli kanıtlarını interaktif şekilde oluşturmanıza olanak tanıyan bir interaktif varsayım kanıtlayıcısıdır._

- [GitHub](https://github.com/coq/coq)
- [Belgeler](https://coq.github.io/doc/v8.13/refman/index.html)

### Akıllı sözleşmelerdeki güvenlik açığı modellerinin tespit edilmesine yarayan sembolik yürütme tabanlı araçlar {#symbolic-execution-tools}

**Manticore** - _*EVM bit kodu analizi için sembolik yürütmeye dayalı bir analiz aracıdır*.*

- [GitHub](https://github.com/trailofbits/manticore)
- [Belgeler](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm, EVM bit kodu için bir sembolik yürütme motoru ve eşdeğerlik denetimcisidir.**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Ethereum akıllı sözleşmelerindeki güvenlik açıklarını tespit etmeye yarayan birsembolik yürütme aracıdır._

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Belgeler](https://mythril-classic.readthedocs.io/en/develop/)

## Daha fazla bilgi {#further-reading}

- [Akıllı Sözleşmelerin Resmi Doğrulaması Nasıl Çalışır?](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Resmi Doğrulama, Akıllı Sözleşmelerin Kusursuz Olmasını Nasıl Sağlar?](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Ethereum Ekosistemindeki Resmi Doğrulama Projelerine Genel Bakış](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Ethereum 2.0 Para Yatırma Akıllı Sözleşmesinin Uçtan Uca Resmi Doğrulaması](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Dünyanın En Popüler Akıllı Sözleşmesinin Resmi Olarak Doğrulanması](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker ve Resmi Doğrulama](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
