---
title: Durum Kanalları
description: Şu anda Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olarak durum kanallarına ve ödeme kanallarına giriş.
lang: tr
sidebarDepth: 3
---

Özel kanallar, Ethereum Ana Ağı ile etkileşimi minimumda tutarak katılımcıların zincir dışında güvenli bir şekilde işlem yapmasına olanak tanır. Kanal eşleri, kanalı aşıp kapatmak için zincir üstünde sadece iki tane işlem gönderirken, zincir dışında isteğe bağlı sayıda işlem yapabilirler. Bu, kullanıcılar için son derece yüksek işlem verimine izin verir ve daha düşük maliyetler ile sonuçlanır.

## Ön Koşullar {#prerequisites}

[Ethereum scaling](/developers/docs/scaling/) ve [katman 2](/layer-2/) hakkındaki sayfalarımızı okuyup anlamış olmalısınız.

## Kanallar nedir? {#what-are-channels}

Ethereum gibi halka açık blok zincirleri, dağılmış mimarilerinden dolayı ölçeklenebilirlik zorluklarıyla karşılaşır: zincir üstü işlemler tüm düğümler tarafından yürütülmelidir. Düğümler mütevazi bir donanım kullanarak bir bloktaki işlem hacmini işleyebilmeli ve ağın işlem hacmine bir sınır koyarak merkeziyetsizliğini korumalıdır. Blokzincir kanalları, nihai uzlaşma için hala ana zincirin güvenliğine dayanırken, kullanıcıların zincir dışında etkileşime girmesine izin vererek bu sorunu çözer.

Kanallar, iki tarafın birbirleri arasında birçok işlem yapmasına ve ardından sadece nihai sonuçları blokzincire göndermesine izin veren basit eşler arası protokollerdir. Kanal, ürettiği özet verilerin gerçekten geçerli bir dizi işlemin sonucu olduğunu kriptografi kullanarak gösterir. ["Çok imzalı"](/developers/docs/smart-contracts/#multisig) akıllı sözleşme, işlemlerin doğru taraflarca imzalanmasını sağlar.

Kanallar sayesinde, durum değişiklikleri ilgili taraflar tarafından yürütülür ve doğrulanır, bu da Ethereum'un yürütüm katmanındaki hesaplamayı en aza indirir. Bu, Ethereum'daki yoğunluğu azaltır ve aynı zamanda kullanıcılar için işlem sürecini hızlandırır.

Her bir kanal, Ethereum üzerinde çalıştırılan bir [çok imzalı akıllı sözleşme](/developers/docs/smart-contracts/#multisig) tarafından yönetilir. Bir kanal açmak için katılımcılar kanal sözleşmesini zincir üstünde dağıtır ve içine fon yatırır. Her iki taraf, kanalın durumunu başlatmak için bir durum güncellemesini toplu olarak imzalar ve daha sonra hızlı ve özgür bir şekilde zincir dışında işlem yapabilir.

Kanalı kapatmak için katılımcılar kanalın üzerinde son anlaşılan durumu zincir üstünde gönderir. Sonrasında akıllı sözleşme, kilitli olan fonları kanalın son durumundaki her katılımcısının bakiyesine göre dağıtır.

Eşler arası kanallar, önceden tanımlanan bazı katılımcıların, görünür bir ek yüke maruz kalmadan yüksek sıklıkta işlem yapmak isteyeceği durumlar için kullanışlıdır. Blokzincir kanalları iki kategoriye ayrılır: **ödeme kanalları** ve **özel kanallar**.

## Ödeme kanalları {#payment-channels}

Bir ödeme kanalı en iyi, iki kullanıcının birlikte tuttuğu "iki yönlü ledger" olarak tanımlanabilir. Ledger'in ilk bakiyesi, kanal açma aşamasında zincir üstü sözleşmeye kilitlenen mevduatın toplamıdır. Ödeme kanalı transferleri, zincirin kendisi dışında herhangi bir zincir katılımı olmadan anında gerçekleştirilebilir, sadece zincir üstünde tek sefere mahsus ilk oluşturma ve sonunda kanalı kapatma işlemlerini gerektirir.

Ledger'in bakiyesinde güncelleme yapılması (örn. ödeme kanalının durumu) için kanalda bulunan tüm tarafların onayı gerekir. Tüm katılımcıların imzaladığı bir kanal güncellemesi, tıpkı Ethereum'daki bir işlem gibi tamamlanmış olarak kabul edilir.

Ödeme kanalları, basit kullanıcı etkileşimlerinin (örn. ETH transferleri, atomik takaslar, mikro ödemeler) yüksek maliyetli zincir üstü faaliyetini en aza indirmek için tasarlanmış olan ilk ölçeklendirme çözümlerinden biri olmuştur. Kanalın katılımcıları, transferlerinin net toplamı yatırılmış jetonları aşmadığı takdirde birbirleri arasında sınırsız miktarda işlemi anında ve ücretsiz yapabilir.

## Durum kanalları {#state-channels}

Zincir dışı ödemeleri desteklemenin yanı sıra, ödeme kanallarının genel durum geçiş mantığını işlemede ödeme kanallarının kullanışlı olup olmadığı kanıtlanmamıştır. Özel kanallar, bu sorunu çözmek için ve kanalları genel amaçlı hesaplamayı ölçeklendirmek için kullanışlı hale getirmek amacıyla oluşturuldu.

Özel kanallar hala ödeme kanalları ile birçok ortak özelliğe sahiptir. Örnek olarak, kullanıcılar diğer kanalların katılımcılarının da imzalaması gereken imzalanmış kriptografik mesajları (işlemler) takas ederek etkileşim kurarlar. Önerilen bir durum güncellemesi tüm katılımcılar tarafından imzalanmazsa geçersiz olur.

Ancak kanal, kullanıcı bakiyelerini depolamanın yanında, sözleşmenin mevcut durumunu da takip eder (örn. sözleşme değişkenlerinin değerleri).

Bu, iki kullanıcı arasında zincir dışında bir akıllı sözleşme yürütmeyi mümkün hale getirir. Bu senaryoda, akıllı sözleşmenin dahili durumunda yapılmakta olan güncellemeler için sadece kanalı oluşturan eşlerin onayı gerekir.

Bu, daha önce açıklanmış olan ölçeklenebilirlik sorununu çözmüş olsa da güvenlik konusunda sonuçları vardır. Ethereum'da durum geçişlerinin geçerliliği, ağın mutabakat protokolü tarafından uygulanmaktadır. Bu, bir akıllı sözleşmenin durumuna geçerli olmayan bir güncelleme önermeyi ya da akıllı sözleşmenin yürütülmesini değiştirmeyi imkansız hale getirir.

Özel kanallar, aynı güvenlik garantilerine sahip değildir. Özel kanallar, bir ölçüde Ana Ağ'ın minyatür bir versiyonudur. Kuralları uygulayan katılımcı sayısının sınırlı olması, kötü niyetli davranış olasılığını (örn. geçersiz durum güncellemeleri önerme) artırır. Özel kanalların güvenliğinin temelini, [sahtecilik kanıtlarını](/glossary/#fraud-proof) temel alan bir uyuşmazlık hakemliği sistemi oluşturur.

## Özel kanallar nasıl çalışır? {#how-state-channels-work}

Temel olarak, bir özel kanaldaki faaliyet kullanıcıları ve blokzincir sistemini kapsayan bir etkileşim oturumudur. Kullanıcılar çoğunlukla birbirleriyle zincir dışında iletişime girer ve sadece kanalı açmak, kapatmak veya katılımcıların arasındaki potansiyel anlaşmazlıkları çözmek için ve sadece temeldeki blokzincir ile etkileşime girer.

Aşağıdaki bölüm, özel kanalın temel iş akışını ana hatlarıyla açıklar:

### Kanalı açma {#opening-the-channel}

Bir kanal açmak için katılımcıların Ana Ağ'da akıllı sözleşmeye fon girmesi gerekir. Fon yatırma aynı zamanda bir sanal sekme işlevi görür, böylece katılımcı aktörler ödemeleri acilen yapma ihtiyacı hissetmeden özgürce işlem yapabilir. Sadece kanal zincir üstünde sonlandığında, taraflar birbiriyle anlaşır ve sekmelerinden geriye kalanı çekerler.

Bu yatırma işlemi aynı zamanda, her bir katılımcının dürüst davranacağını garanti altına almak için bir teminattır. Depozito sahipleri, uyuşmazlığın çözümü aşamasında kötü niyetli eylemlerden suçlu bulunacak olursa sözleşme, yatırdıklarından kesinti yapar.

Kanal eşleri, tamamının kabul ettiği bir başlangıç durumunu imzalamak zorundadır. Bu, özel kanalın başlangıcı görevi görür ve sonrasında kullanıcılar işlem yapmaya başlayabilir.

### Kanalın kullanımı {#using-the-channel}

Eşler, kanalın durumunu başlattıktan sonra işlemleri imzalayarak ve birbirlerine göndererek onay için birbirleriyle etkileşime girerler. Katılımcılar bu işlemlerle durum yükseltmelerini başlatır ve diğerlerinin durum güncellemelerini imzalar. Her işlem aşağıdakilerden oluşur:

- İşlemler için eşsiz bir kimlik görevi gören ve tekrar saldırılarını önleyen bir **nonce**. Aynı zamanda, durum güncellemelerinin olduğu sırayı da tanımlar (bu durum, uyuşmazlık çözümü için önemlidir.)

- Kanalın eski durumu

- Kanalın yeni durumu

- Durum geçişini tetikleyen işlem (örn. Alice'in Bob'a 5 ETH göndermesi)

Kanaldaki durum güncellemeleri, normalde kullanıcıların Ana Ağ'da etkileşimde bulunduğu gibi, durum kanallarının zincir üzerindeki etkiyi minimuma indirme hedefiyle uyumlu şekilde zincir üzerinde yayınlanmaz. Katılımcılar durum yükseltmeleri konusunda aynı fikirde olduğu sürece, bu yükseltmeler Ethereum işlemleri kadar nihai niteliktedir. Katılımcılar sadece bir anlaşmazlık durumunda Ana Ağ'ın mutabakatına bağımlı olmak zorundadır.

### Kanalı kapatma {#closing-the-channel}

Bir durum kanalını kapatmak, kanalın fikir birliğine varılmış son durumunun zincir üstü akıllı sözleşmeye gönderilmesini gerektirir. Durum güncellemesinde referans alınan detaylar, her bir katılımcının hareketlerini ve onaylanmış işlemlerinin sayısının bir listesini içerir.

Durum güncellemesinin geçerli olduğu doğrulandıktan sonra (yani, tüm taraflarca imzalanmış olması) akıllı sözleşme, kanalı sonlandırır ve kilitli fonları kanalın sonucuna göre dağıtır. Zincir dışında yapılan ödemeler Ethereum'un durumuna uygulanır ve her katılımcı kilitli fonların kalan kısmını alır.

Yukarıda açıklanmış olan senaryo, olumlu durumda neler olduğunu gösterir. Bazen kullanıcılar bir anlaşmaya varamayabilir ve kanalı sonlandıramayabilir (olumsuz durum). Böyle bir durum hakkında aşağıdakilerden biri doğru olabilir:

- Katılımcılar çevrimdışı olur ve durum geçişleri öneremezler

- Katılımcılar geçerli durum güncellemelerini imzalamayı reddederler

- Katılımcılar zincir üstündeki sözleşmeye eski bir durum güncellemesi önererek kanalı sonlandırmaya çalışırlar

- Katılımcılar başkalarının imzalaması için geçersiz durum güncellemeleri önerirler

Bir kanalda katılımcı aktörlerin arasındaki mutabakat bozulduğu zaman son seçenek, kanalın son, geçerli durumunu uygulamak için Ana Ağ'ın mutabakatına güvenmektir. Bu durumda özel kanalın kapatılması, anlaşmazlıkların zincir üstünde çözülmesini gerektirir.

### Uyuşmazlıkları çözme {#settling-disputes}

Tipik olarak, bir kanaldaki taraflar önceden kanalı kapatmak konusunda fikir birliğine varır ve akıllı sözleşmeye gönderdikleri son durum geçişini birlikte imzalar. Güncelleme zincir üstünde onaylandığında, zincir dışı akıllı sözleşme yürütmesi biter ve katılımcılar paraları ile birlikte kanaldan çıkar.

Ancak, bir taraf akıllı sözleşmenin yürütülmesini bitirmek ve kanalı sonlandırmak için karşı tarafın onayını beklemeden zincir üstünde bir istek gönderebilir. Daha önce açıklanan herhangi bir mutabakat bozucu durum gerçekleşecek olursa, her iki taraf da kanalı kapatma ve fonları dağıtma için zincir üstünde anlaşmayı tetikleyebilir. Bu, **güven gerektirmezliği** ortaya çıkararak dürüst tarafların, herhangi bir noktada diğer tarafın aksiyonlarından bağımsız şekilde mevduatlarını çıkarabilmelerine olanak sağlar.

Kanaldan çıkma işlemini gerçekleştirmek için kullanıcı, uygulamanın son geçerli durum güncellemesini zincir üstü sözleşmeye göndermek zorundadır. Bunun yapıldığı doğrulanırsa (yani, tüm tarafların imzasını taşıyorsa), fonlar kendi lehlerine yeniden dağıtılır.

Ancak, tek kullanıcılı çıkma isteklerinin yürütülmesinde gecikme vardır. Eğer kanalı sonuçlandırma isteği oy birliği ile kabul edilmişse, zincir üstü çıkış işlemi hemen gerçekleştirilir.

Gecikme, sahtecilik eylemleri olasılığı sebebiyle tek kullanıcılı çıkışlarda devreye girer. Örneğin, bir kanal katılımcısı eski durum güncellemesini zincir üstünde önererek Ethereum üzerinde kanal sonlandırmayı deneyebilir.

Bir karşı önlem olarak özel kanallar, dürüst kullanıcıların zincirin en son geçerli durumlarını zincir üstü kanallara göndererek itiraz etmelerine olanak tanır. Özel kanallar, üzerinde fikir birliğine varılan durum güncellemelerinin eski durum güncellemelerinden baskın çıkacağı şekilde tasarlanmıştır.

Bir eş bir kere zincir üstü uyuşmazlık çözme sistemini harekete geçirdiğinde, diğer tarafın sınırlı bir sürede yanıt vermesi gereklidir (itiraz süresi olarak adlandırılır). Bu, özellikle diğer taraf eski bir güncelleme kullanıyorsa, kullanıcıların çıkış işlemine itiraz etmesine olanak tanır.

Bu durumda her ne olursa olsun, kanal kullanıcıları her zaman güçlü bir kesinlik garantisine sahiptir: eğer sahip oldukları durum geçişi tüm üyeler tarafından imzalanmışsa ve en son güncelleme ise, düzenli zincir üstü bir işlem ile eşit kesinliğe sahiptir. Hala zincir üstünde diğer tarafa itiraz etmek zorunda olsalar da, olası tek sonuç ellerindeki son geçerli durumu sonlandırmaktır.

### Özel kanallar Ethereum ile nasıl etkileşime girer? {#how-do-state-channels-interact-with-ethereum}

Özel kanallar, zincir dışı protokoller olarak var olmalarına rağmen, bir zincir üstü bileşene sahiptir: kanal açılırken Ethereum'da dağıtılan akıllı sözleşme. Bu sözleşme, kanala yatırılan varlıkları kontrol eder, durum güncellemelerini doğrular ve katılımcılar arasındaki uyuşmazlıklarda hakemlik yapar.

Özel kanallar, [katman 2](/layer-2/) ölçeklendirme çözümlerinin aksine işlem verilerini ya da durum taahhütlerini Ana Ağ'da yayımlamaz. Ancak, bunlar [yan zincirlere](/developers/docs/scaling/sidechains/) göre Ana Ağ'a daha bağlıdır ve bu onları daha güvenli kılar.

Özel kanallar, aşağıdakiler için ana Ethereum protokolüne güvenir:

#### 1. Canlılık {#liveness}

Kanalı açarken dağıtılan zincir üstü sözleşme, kanalın işlevselliğinden sorumludur. Eğer sözleşme Ethereum'da çalışıyorsa, kanal her zaman kullanıma hazır durumdadır. Buna karşılık bir yan zincir, Ana Ağ işlevsel durumda olsa dahi her zaman başarısız olabilir ve kullanıcı fonlarını riske atabilir.

#### 2. Güvenlik {#security}

Özel kanallar, güvenliği sağlamak ve kullanıcıları kötü niyetli eşlerden korumak için bir yere kadar Ethereum'a güvenir. Daha sonraki bölümlerde açıklanacağı üzere kanallar, kullanıcıların geçersiz veya eski bir güncelleme ile kanalı sonlandırmaya yönelik girişimlere itiraz etmesine olanak tanıyan bir sahtecilik kanıtı mekanizması kullanır.

Bu durumda dürüst taraf, en son geçerli kanal durumunu sahtecilik kanıtı olarak zincir üstü sözleşmeye sunarak doğrular. Sahtecilik kanıtı, güvensiz tarafların süreç içinde fonlarını riske atmadan karşılıklı şekilde zincir dışı işlemler yapmalarını sağlar.

#### 3. Nihayet {#finality}

Kanal kullanıcıarı tarafından topluca imzalanan durum güncellemeleri, zincir üstü işlemler kadar iyi kabul edilir. Ancak yine de, tüm kanal içi faaliyetler sadece kanal Ethereum'da kapatıldığında gerçek kesinliğe ulaşır.

İyimser senaryoda, iki taraf da işbirliği yapabilir ve son durum güncellemesini imzalar ve kanalı kapatmak için zincir üzerine gönderir, daha sonra fonlar kanalın son durumuna göre dağıtılır. Kötümser senaryoda, zincir üstünde yanlış durum güncellemesi yayınlayarak sahtekarlık yapmaya çalışılır ve itiraz süresi geçene kadar işlem sonlandırılmaz.

## Sanal özel kanallar {#virtual-state-channels}

Bir özel kanalın basit uygulaması, iki kullanıcının bir uygulamayı zincir dışı yürütmeyi dilediği durumlarda yeni bir sözleşmeyi uygulamaktır. Bu sadece mantıksız olmakla kalmayıp, bir de özel kanalların maliyet verimliliğini negatif yönde etkiler (zincir üstü işlem maliyetleri hızla artabilir).

Bu sorunu çözmek için "sanal kanallar" yaratılmıştır. Sanal kanallar, normal kanallardan farklı olarak zincir üstü işlemlerin açılmasını ve sonlandırılmasını gerektirmez ve ana zincirle etkileşime girmeden açılabilir, yürütülebilir ve sonlandırılabilir. Hatta bu yöntemle uyuşmazlıkları zincir dışında çözmek bile mümkündür.

Bu sistem, zincir üzerinde finanse edilmiş "ledger kanalları" olarak adlandırılan kanalların varlığına dayanır. İki taraf arasındaki sanal kanallar ledger kanalının sahiplerinin aracı olarak görevi gördüğü mevcut bir ledger defter kanalının üzerine kurulabilir.

Her sanal kanaldaki kullanıcılar, yeni bir sözleşme örneği aracılığıyla etkileşime girer ve ledger kanalı birden çok sözleşme örneğini destekleyebilir. Ledger kanalının durumu aynı zamanda birden fazla sözleşme depolama durumunu içerir ve bu sayede farklı kullanıcılar arasında zincir dışı uygulamaların paralel yürütülmesi mümkün olur.

Kullanıcılar, tıpkı normal kanallardaki gibi durum makinesini ilerletmek için durum güncellemelerini takas eder. Bir uyuşmazlık ortaya çıkmadığı takdirde, aracı ile sadece kanalı açarken ya da kapatırken iletişime girilmesi gerekir.

### Sanal ödeme kanalları {#virtual-payment-channels}

Sanal ödeme kanalları, sanal özel kanallar ile aynı fikir üzerine geliştirilmiştir: aynı ağa bağlı katılımcılar, katılımcılar zincir üstünde yeni bir kanal açmaya ihtiyaç duymadan mesajları iletebilir. Sanal ödeme kanallarında, değer transferleri bir veya daha fazla aracı ile yönlendirilir ve transfer edilen fonların yalnızca amaçlanan alıcı tarafından alınması garanti edilir.

## Özel kanalın uygulama alanları {#applications-of-state-channels}

### Ödemeler {#payments}

İlk zamanlardaki blokzincir kanalları, iki katılımcının Ana Ağ'da yüksek işlem ücretleri ödemek zorunda kalmadan zincir dışında hızlı, düşük ücretli transferler gerçekleştirmesine izin veren basit protokollerdi. Günümüzdeki ödeme kanalları, ether ve jeton takas etmek ve yatırmak için tasarlanmış uygulamalar için hala kullanışlıdır.

Kanal esaslı ödemelerde aşağıdaki avantajlar vardır:

1. **Verim**: Her bir kanal başına zincir dışı işlem miktarı, özellikle blok boyutu ve blok zamanı gibi çeşitli faktörlerden etkilenen Ethereum verimi ile bağlantılı değildir. İşlemleri zincir dışı yürüterek blokzincir kanalları daha büyük verim elde edebilir.

2. **Gizlilik**: Kanallar zincir dışında var olduğundan, katılımcılar arasındaki etkileşimlerin detayları Ethereum'un halka açık blokzincirinde kayıt altına alınmaz. Kanal kullanıcıları sadece kanallara fon dağıtırken ve kanalları kapatırken ya da anlaşmazlıkları çözerken zincir üstünde etkileşim kurmak zorundadır. Bu sebeple kanallar, daha gizli işlemler isteyen kişiler için kullanışlıdır.

3. **Gecikme**: Kanal katılımcıları arasında yürütülen zincir dışı işlemler, iki taraf da iş birliği yaptığı takdirde hemen çözüme kavuşturulabilir ve böylelikle gecikmeler azalır. Buna karşılık olarak Ana Ağ üzerinden işlem göndermek için düğümlerin işlemi tamamlamasının, işlemle yeni bir blok oluşturmasının ve mutabakata varılmasının beklenmesi gerekir. Kullanıcılar aynı zamanda, işlemi sonlandırılmış olarak kabul etmeden önce başka blok onaylarını beklemek zorunda kalabilir.

4. **Maliyet**: Özel kanallar, bir grup katılımcının uzun bir süre boyunca birçok durum güncellemesini takas edeceği durumlarda özellikle kullanışlıdır. Ortaya çıkan tek maliyet, özel kanal akıllı sözleşmesinin açılış ve kapanış maliyetidir; kanalın açılışı ve kapanışı arasındaki her durum değişikliği uzlaşma maliyeti ona göre dağıtıldığı için bir öncekinden daha ucuz olacaktır.

[Toplamalar](/developers/docs/scaling/#rollups) gibi katman 2 çözümlerinde özel kanalların kullanılması, bu kanalları ödemeler için daha çekici hale getirebilir. Kanallar ucuz ödemeler sunarken, Ana Ağ'da açılış aşamasında zincir üstü sözleşme kurulmasının maliyetleri, özellikle gaz fiyatları yükseldiğinde pahalıya gelebilir. Ethereum tabanlı toplamalar [düşük işlem ücretleri](https://l2fees.info/) sunar ve kurulum ücretlerini aşağı çekerek kanal katılımcılarının yükünü azaltabilir.

### Mikro işlemler {#microtransactions}

Mikro işlemler işletmelerin zarar etmeden işleyemediği düşük değerli ödemelerdir (örn. bir doların kesirli kısmından daha düşük). Bu varlıklar, müşteri ödemelerinin marjının kar elde edemeyecek kadar düşük olduğu durumlarda, ödeme hizmeti sağlayıcılarına ödeme yapmak zorundadır.

Ödeme kanalları, mikro işlemlerle ilgili yükü azaltarak bu problemi çözer. Örneğin, Bir İnternet Servis Sağlayıcısı (ISP) bir müşteriyle bir ödeme kanalı açabilir ve hizmeti her kullandığında küçük ödemeler yapmasına izin verir.

Kanalı açma ve kapatma maliyetinin ötesinde, katılımcılar mikro işlemlerde başka maliyetlere maruz kalmaz (gaz ücreti yoktur). Müşterilerin hizmetler için ne kadar ödeme yapacakları konusunda daha çok esnekliğe sahip olması ve işletmelerin karlı mikro işlemlerde kayıp yaşamaması sebebiyle bu bir kazan-kazan durumudur.

### Merkeziyetsiz uygulamalar {#decentralized-applications}

Tıpkı ödeme kanalları gibi özel kanallar da durum makinesinin son durumlarına göre koşullu ödemeler yapabilir. Özel kanallar aynı zamanda keyfi durum geçiş mantığını destekleyebilir, bu durum onları zincir dışı genel uygulamaları yürütmek için kullanışlı hale getirir.

Özel kanallar sıklıkla basit sıra tabanlı uygulamalarla sınırlıdır ve bu, zincir dışı sözleşmeye girilmiş fonların yönetilmesini kolaylaştırır. Aynı zamanda, belirli aralıklarla zincir dışı uygulamaların durumunu güncelleyen sınırlı sayıda taraf olduğundan dürüst olmayan davranışı cezalandırmak nispeten daha basittir.

Bir özel kanal uygulamasının verimliliği aynı zamanda onun tasarımına da bağlıdır. Örneğin, bir geliştirici uygulama kanalı sözleşmesini zincir üstünde bir kez dağıtabilir ve diğer oyuncuların zincir üstünde bulunmak zorunda olmadan uygulamayı yeniden kullanmalarına izin verebilir. Bu durumda ilk uygulama kanalı, her biri uygulamanın zincir dışı akıllı sözleşmesinin yeni bir örneğini yürüten birden fazla sanal kanalı destekleyen bir ledger kanalı olarak hizmet eder.

Özel kanal uygulamaları için potansiyel bir kullanım durumu, fonların oyunun sonucuna göre dağıtıldığı basit iki oyunculu oyunlardır. Buradaki fayda, oyuncuların birbirlerine güvenmek zorunda olmaması (güven gerektirmezlik) ve fonların tahsisini ve uyuşmazlıkların çözümünü (merkeziyetsizlik) oyuncuların değil, zincir üstü sözleşmenin kontrol etmesidir.

Özel kanal uygulamaları için diğer olası kullanım durumları, ENS isim sahipliğini, NFT ledger'lerini ve daha fazlasını içerir.

### Atomik transferler {#atomic-transfers}

Erken dönemlerdeki ödeme kanallarının işlevi, iki taraf arasındaki transferlerle kısıtlıydı ve dolayısıyla kullanılabilirlikleri sınırlıydı. Ancak sanal kanalların devreye alınması, kişilerin transferleri aracılar üzerinden (örn. birden çok p2p kanalı) zincir üstünde yeni kanal açmaya gerek kalmadan yönlendirmesine olanak tanıdı.

Genellikle "çok atlamalı transferler" olarak tanımlanan yönlendirilmiş ödemeler atomiktir (yani, ya işlemlerin tüm bölümleri başarılı olur ya da hep birlikte başarısız olur). Atomik transferler, ödemenin yalnızca belirli koşullar sağlandığı takdirde serbest bırakıldığından emin olmak ve böylece karşı tarafın riskini azaltmak için [Karma Zaman Kilidi Sözleşmelerini (HTLC'ler)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) kullanır.

## Özel kanalları kullanmanın dezavantajları {#drawbacks-of-state-channels}

### Canlılık varsayımları {#liveness-assumptions}

Özel kanallar, verimliliği sağlamak için kanal katılımcılarının anlaşmazlıklara cevap verme becerilerine zaman sınırlamaları koyar. Bu kural, eşlerin kanal aktivitesini izlemek ve tartışmalara itiraz etmek için her zaman çevrimiçi olacağını varsayar.

Gerçekte, kullanıcılar kendi kontrolleri dışındaki sebeplerden çevrimdışı kalabilirler (örn. zayıf internet bağlantısı, mekanik arızalar, vb.). Eğer dürüst bir kullanıcı çevrimdışı kalırsa kötü niyetli bir eş, eski ara durumları hakem sözleşmesine sunabilir ve taahhüt edilen fonları çalarak durumdan faydalanabilir.

Bazı kanallar, başkaları adına zincir üstü uyuşmazlık olaylarını izlemek ve ilgili tarafları uyarmak gibi gerekli aksiyonlardan sorumlu varlıklar olan "gözetleme kulelerini" kullanır. Ancak bu, özel kanal kullanmanın maliyetini arttırır.

### Veri erişilemezliği {#data-unavailability}

Daha önce açıklandığı üzere geçersiz bir uyuşmazlığa itiraz etmek, özel kanalın en son geçerli halini sunmayı gerektirir. Bu da, kullanıcıların kanalın en son durumuna eriştiği vasayımına dayanan bir diğer kuraldır.

Kanal kullanıcılarının zincir dışı uygulamaların durumunun kopyalarını depolamasını beklemek mantıklı olmasına rağmen, bu veriler hata ya da mekanik arıza sebebiyle kaybolabilir. Kullanıcı veriyi yedeklememişse yapabileceği tek şey, diğer tarafın kendi sahip olduğu eski durum geçişlerini kullanarak geçersiz bir çıkış talebini sonlandırmamasını ummaktır.

Ağ, veri kullanılabilirliği üzerine kuralları uyguladığı için Ethereum kullanıcılarının bu problemle baş etmesi gerekmez. İşlem verileri, tüm düğümler tarafından depolanıp yayımlanır ve gerekli olduğu takdirde kullanıcıların indirmesi için hazırdır.

### Likidite sorunları {#liquidity-issues}

Bir blokzincir kanalı kurmak için, katılımcılar kanalın yaşam döngüsü süresince fonları zincir üstü akıllı sözleşmeye kitlemeye ihtiyaç duyar. Bu, kanal kullanıcılarının likiditesini azaltır ve aynı zamanda kanalları, Ana Ağ'da fonları kilitli tutmaya gücü yetenlerle sınırlandırır.

Ancak, ledger kanalları (bir zincir dışı hizmet sağlayıcısı (OSP) tarafından işletilen), kullanıcılar için likidite sorunlarını azaltabilir. Ledger kanalına bağlı iki eş bir sanal kanal oluşturabilir, bu kanalı istedikleri herhangi bir zaman tamamen zincir dışında açabilir ve sonlandırabilir.

Zincir dışı hizmet sağlayıcılar aynı zamanda, ödemeleri yönlendirmeyi daha kullanışlı hale getirmek için birden çok eşle kanal açabilir. Elbette kullanıcılar, OSP'lere hizmetleri için ödeme yapmak zorundadır; bu, bazıları için istenmeyen bir durum olabilir.

### Griefing saldırıları {#griefing-attacks}

Griefing saldırıları, sahtecilik kanıtı tabanlı sistemlerin ortak bir özelliğidir. Bir griefing saldırısı salgırgana direkt olarak bir yarar sağlamaz ancak kurbanın grief'e maruz kalmasına (zarara uğramasına) sebep olur ve adı da buradan gelir.

Sahteciliğin kanıtlanması, griefing saldırılarına kolay edef olur; çünkü dürüst taraf her uyuşmazlığa, hatta geçersiz olanlara bile yanıt vermek zorundadır, aksi takdirde fonlarını kaybetme riskiyle karşı karşıyadır. Kötü niyetli bir katılımcı zincir üzerinde eski durum geçişlerini zincire tekrar tekrar göndermeye karar vererek dürüst tarafı geçerli durum ile yanıt vermeye zorlayabilir. Bu zincir üstü işlemlerin maliyeti süreçte hızla artabilir ve dürüst tarafların süreçte kaybetmesine sebep olabilir.

### Önceden tanımlanmış katılımcı kümeleri {#predefined-participant-sets}

Bir özel kanalı oluşturan katılımcı sayısı, tasarımı gereği kullanım ömrü boyunca sabittir. Bunun sebebi, katılımcı kümesinin güncellenmesinin, özellikle kanala fon sağlanırken ya da anlaşmazlıkları çözerken kanalın işleyişini zorlaştırmasıdır. Katılımcı eklemek ya da çıkarmak da ekstra zincir üstü faaliyet gerektirir ve bu, kullanıcıların yükünü arttırır.

Bu, özel kanallar hakkında fikir yürütmeyi kolaylaştırsa da kanal tasarımlarının uygulama geliştiricileri için kullanışlılığını sınırlar. Bu, özel kanalların neden toplamalar gibi diğer ölçeklendirme çözümlerine tercih edilmediğini kısmen açıklar.

### Paralel işlem süreci {#parallel-transaction-processing}

Özel kanaldaki katılımcılar, durum güncellemelerini sırayla gönderirler, bu sebeple en çok "sıra tabanlı uygulamalarda" (örn. iki kişilik bir satranç oyunu) işe yararlar. Bu, eş zamanlı durum güncellemelerini ele alma ihtiyacını ortadan kaldırır ve zincir üstü sözleşmelerin eski güncelleme göndericilerini cezalandırmak için yapması gereken işi azaltır. Ancak, bu tasarımın yan etkisi işlemlerin birbirlerine bağlı hale gelmesidir. Bu da gecikmeyi artırır ve genel kullanıcı deneyimini olumsuz etkiler.

Bazı özel kanallar bu problemi, zincir dışı durumu iki adet tek yönlü "tek yönlü" duruma dönüştüren ve eş zamanlı durum güncellemelerine izin veren "tam çift yönlü" tasarım kullanarak çözer. Bunun gibi tasarımlar zincir dışı verimi arttırır ve işlem gecikmelerini azaltır.

## Durum kanallarını kullanın {#use-state-channels}

Merkeziyetsiz uygulamalarınıza entegre edebileceğiniz özel kanallara ilişkin uygulamalar sağlayan birden çok proje mevcuttur:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Daha fazla okuma {#further-reading}

**Durum kanalları**

- [Ethereum'un Katman 2 Ölçeklendirme Çözümlerini Anlama: Özel Kanallar, Plazma ve Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 Şubat 2018_
- [Özel Kanallar - bir açıklama](https://www.jeffcoleman.ca/state-channels/) _6 Kasım 2015 - Jeff Coleman_
- [Özel Kanalların Temelleri](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Blokzincir Özel Kanalları: Son Teknoloji Ürünü](https://ieeexplore.ieee.org/document/9627997)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_