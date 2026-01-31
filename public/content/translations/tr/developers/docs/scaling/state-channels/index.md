---
title: "Durum Kanalları"
description: "Şu anda Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olarak durum kanallarına ve ödeme kanallarına giriş."
lang: tr
sidebarDepth: 3
---

Özel kanallar, katılımcıların Ethereum Mainnet ile etkileşimini en aza indirirken zincir dışında güvenli bir şekilde işlem yapmalarını sağlar. Kanal eşleri, kanalı açmak ve kapatmak için yalnızca iki zincir üstü işlem gönderirken, zincir dışında isteğe bağlı sayıda işlem gerçekleştirebilir. Bu, kullanıcılar için son derece yüksek işlem verimine izin verir ve daha düşük maliyetler ile sonuçlanır.

## Ön Koşullar {#prerequisites}

[Ethereum ölçeklendirme](/developers/docs/scaling/) ve [katman 2](/layer-2/) sayfalarımızı okumuş ve anlamış olmalısınız.

## Kanallar nedir? {#what-are-channels}

Ethereum gibi halka açık blokzincirler, dağıtık mimarileri nedeniyle ölçeklenebilirlik zorluklarıyla karşılaşır: zincir üstü işlemlerin tüm düğümler tarafından yürütülmesi gerekir. Düğümler mütevazi bir donanım kullanarak bir bloktaki işlem hacmini işleyebilmeli ve ağın işlem hacmine bir sınır koyarak merkeziyetsizliğini korumalıdır. Blokzincir kanalları, nihai uzlaşma için ana zincirin güvenliğine dayanırken kullanıcıların zincir dışında etkileşim kurmasına olanak tanıyarak bu sorunu çözer.

Kanallar, iki tarafın birbirleri arasında birçok işlem yapmasına ve ardından sadece nihai sonuçları blokzincire göndermesine izin veren basit eşler arası protokollerdir. Kanal, ürettiği özet verilerin gerçekten geçerli bir dizi işlemin sonucu olduğunu kriptografi kullanarak gösterir. Bir ["çoklu imzalı"](/developers/docs/smart-contracts/#multisig) akıllı sözleşme, işlemlerin doğru taraflarca imzalanmasını sağlar.

Kanallar sayesinde, durum değişiklikleri ilgili taraflar tarafından yürütülür ve doğrulanır, bu da Ethereum'un yürütüm katmanındaki hesaplamayı en aza indirir. Bu, Ethereum'daki yoğunluğu azaltır ve aynı zamanda kullanıcılar için işlem sürecini hızlandırır.

Her kanal, Ethereum üzerinde çalışan bir [çoklu imzalı akıllı sözleşme](/developers/docs/smart-contracts/#multisig) tarafından yönetilir. Bir kanal açmak için, katılımcılar kanal sözleşmesini zincir üstünde dağıtır ve içine fon yatırır. Her iki taraf da kanalın durumunu başlatmak için bir durum güncellemesini toplu olarak imzalar, ardından zincir dışında hızlı ve serbestçe işlem yapabilirler.

Kanalı kapatmak için katılımcılar, kanalın üzerinde anlaşılan son durumunu zincir üstünde gönderir. Sonrasında akıllı sözleşme, kilitli olan fonları kanalın son durumundaki her katılımcısının bakiyesine göre dağıtır.

Eşler arası kanallar, önceden tanımlanan bazı katılımcıların, görünür bir ek yüke maruz kalmadan yüksek sıklıkta işlem yapmak isteyeceği durumlar için kullanışlıdır. Blokzincir kanalları iki kategoriye ayrılır: **ödeme kanalları** ve **özel kanallar**.

## Ödeme kanalları {#payment-channels}

Bir ödeme kanalı en iyi, iki kullanıcının birlikte tuttuğu "iki yönlü ledger" olarak tanımlanabilir. Defterin ilk bakiyesi, kanal açılış aşamasında zincir üstü sözleşmeye kilitlenen mevduatların toplamıdır. Ödeme kanalı transferleri, ilk tek seferlik zincir üstü oluşturma ve nihai kanal kapatma işlemi haricinde, asıl blokzincirin katılımı olmadan anında gerçekleştirilebilir.

Ledger'in bakiyesinde güncelleme yapılması (örn. ödeme kanalının durumu) için kanalda bulunan tüm tarafların onayı gerekir. Tüm katılımcıların imzaladığı bir kanal güncellemesi, tıpkı Ethereum'daki bir işlem gibi tamamlanmış olarak kabul edilir.

Ödeme kanalları, basit kullanıcı etkileşimlerinin (ör. ETH transferleri, atomik takaslar, mikro ödemeler) maliyetli zincir üstü faaliyetlerini en aza indirmek için tasarlanan ilk ölçeklendirme çözümleri arasındaydı. Kanalın katılımcıları, transferlerinin net toplamı yatırılmış jetonları aşmadığı takdirde birbirleri arasında sınırsız miktarda işlemi anında ve ücretsiz yapabilir.

## Özel kanallar {#state-channels}

Zincir dışı ödemeleri desteklemenin yanı sıra, ödeme kanallarının genel durum geçiş mantığını yönetmek için kullanışlı olduğu kanıtlanmamıştır. Özel kanallar, bu sorunu çözmek için ve kanalları genel amaçlı hesaplamayı ölçeklendirmek için kullanışlı hale getirmek amacıyla oluşturuldu.

Özel kanallar hala ödeme kanalları ile birçok ortak özelliğe sahiptir. Örnek olarak, kullanıcılar diğer kanalların katılımcılarının da imzalaması gereken imzalanmış kriptografik mesajları (işlemler) takas ederek etkileşim kurarlar. Önerilen bir durum güncellemesi tüm katılımcılar tarafından imzalanmazsa geçersiz olur.

Ancak kanal, kullanıcı bakiyelerini depolamanın yanında, sözleşmenin mevcut durumunu da takip eder (örn. sözleşme değişkenlerinin değerleri).

Bu, iki kullanıcı arasında zincir dışında bir akıllı sözleşme yürütmeyi mümkün kılar. Bu senaryoda, akıllı sözleşmenin dahili durumunda yapılmakta olan güncellemeler için sadece kanalı oluşturan eşlerin onayı gerekir.

Bu, daha önce açıklanmış olan ölçeklenebilirlik sorununu çözmüş olsa da güvenlik konusunda sonuçları vardır. Ethereum'da durum geçişlerinin geçerliliği, ağın mutabakat protokolü tarafından zorunlu kılınır. Bu, bir akıllı sözleşmenin durumuna geçerli olmayan bir güncelleme önermeyi ya da akıllı sözleşmenin yürütülmesini değiştirmeyi imkansız hale getirir.

Özel kanallar, aynı güvenlik garantilerine sahip değildir. Özel kanallar, bir ölçüde Ana Ağ'ın minyatür bir versiyonudur. Kuralları uygulayan katılımcı sayısının sınırlı olması, kötü niyetli davranış olasılığını (örn. geçersiz durum güncellemeleri önerme) artırır. Özel kanallar, güvenliklerini [sahtekarlık kanıtlarına](/glossary/#fraud-proof) dayalı bir uyuşmazlık tahkim sisteminden alırlar.

## Özel kanallar nasıl çalışır? {#how-state-channels-work}

Temel olarak, bir özel kanaldaki faaliyet kullanıcıları ve blokzincir sistemini kapsayan bir etkileşim oturumudur. Kullanıcılar çoğunlukla birbirleriyle zincir dışında iletişim kurar ve yalnızca kanalı açmak, kapatmak veya katılımcılar arasındaki potansiyel anlaşmazlıkları çözmek için temel blokzincir ile etkileşime girer.

Aşağıdaki bölüm, özel kanalın temel iş akışını ana hatlarıyla açıklar:

### Kanalı açma {#opening-the-channel}

Bir kanal açmak için katılımcıların Ana Ağ'da akıllı sözleşmeye fon girmesi gerekir. Fon yatırma aynı zamanda bir sanal sekme işlevi görür, böylece katılımcı aktörler ödemeleri acilen yapma ihtiyacı hissetmeden özgürce işlem yapabilir. Taraflar, yalnızca kanal zincir üstünde kesinleştiğinde birbirleriyle uzlaşır ve hesaplarından kalanı çeker.

Bu yatırma işlemi aynı zamanda, her bir katılımcının dürüst davranacağını garanti altına almak için bir teminattır. Depozito sahipleri, uyuşmazlığın çözümü aşamasında kötü niyetli eylemlerden suçlu bulunacak olursa sözleşme, yatırdıklarından kesinti yapar.

Kanal eşleri, tamamının kabul ettiği bir başlangıç durumunu imzalamak zorundadır. Bu, özel kanalın başlangıcı görevi görür ve sonrasında kullanıcılar işlem yapmaya başlayabilir.

### Kanalı kullanma {#using-the-channel}

Eşler, kanalın durumunu başlattıktan sonra işlemleri imzalayarak ve birbirlerine göndererek onay için birbirleriyle etkileşime girerler. Katılımcılar bu işlemlerle durum yükseltmelerini başlatır ve diğerlerinin durum güncellemelerini imzalar. Her işlem aşağıdakilerden oluşur:

- İşlemler için benzersiz bir kimlik görevi gören ve tekrar saldırılarını önleyen bir **nonce**. Aynı zamanda, durum güncellemelerinin olduğu sırayı da tanımlar (bu durum, uyuşmazlık çözümü için önemlidir.)

- Kanalın eski durumu

- Kanalın yeni durumu

- Durum geçişini tetikleyen işlem (örn. Alice'in Bob'a 5 ETH göndermesi)

Kanaldaki durum güncellemeleri, kullanıcıların Mainnet'te etkileşime girmesinin aksine, zincir üstünde yayınlanmaz. Bu, özel kanalların zincir üstü ayak izini en aza indirme hedefiyle uyumludur. Katılımcılar durum yükseltmeleri konusunda aynı fikirde olduğu sürece, bu yükseltmeler Ethereum işlemleri kadar nihai niteliktedir. Katılımcılar sadece bir anlaşmazlık durumunda Ana Ağ'ın mutabakatına bağımlı olmak zorundadır.

### Kanalı kapatma {#closing-the-channel}

Bir özel kanalı kapatmak, kanalın üzerinde anlaşmaya varılmış son durumunu zincir üstü akıllı sözleşmeye göndermeyi gerektirir. Durum güncellemesinde referans alınan detaylar, her bir katılımcının hareketlerini ve onaylanmış işlemlerinin sayısının bir listesini içerir.

Durum güncellemesinin geçerli olduğu doğrulandıktan sonra (yani, tüm taraflarca imzalanmış olması) akıllı sözleşme, kanalı sonlandırır ve kilitli fonları kanalın sonucuna göre dağıtır. Zincir dışında yapılan ödemeler Ethereum'un durumuna uygulanır ve her katılımcı kilitli fonların kalan kısmını alır.

Yukarıda açıklanmış olan senaryo, olumlu durumda neler olduğunu gösterir. Bazen kullanıcılar bir anlaşmaya varamayabilir ve kanalı sonlandıramayabilir (olumsuz durum). Böyle bir durum hakkında aşağıdakilerden biri doğru olabilir:

- Katılımcılar çevrimdışı olur ve durum geçişleri öneremezler

- Katılımcılar geçerli durum güncellemelerini imzalamayı reddederler

- Katılımcılar, zincir üstü sözleşmeye eski bir durum güncellemesi önererek kanalı kesinleştirmeye çalışırlar

- Katılımcılar başkalarının imzalaması için geçersiz durum güncellemeleri önerirler

Bir kanalda katılımcı aktörlerin arasındaki mutabakat bozulduğu zaman son seçenek, kanalın son, geçerli durumunu uygulamak için Ana Ağ'ın mutabakatına güvenmektir. Bu durumda özel kanalın kapatılması, anlaşmazlıkların zincir üstünde çözülmesini gerektirir.

### Anlaşmazlıkları çözme {#settling-disputes}

Tipik olarak, bir kanaldaki taraflar önceden kanalı kapatmak konusunda fikir birliğine varır ve akıllı sözleşmeye gönderdikleri son durum geçişini birlikte imzalar. Güncelleme zincir üstünde onaylandığında, zincir dışı akıllı sözleşmenin yürütülmesi sona erer ve katılımcılar paralarıyla kanaldan çıkarlar.

Ancak taraflardan biri, karşı tarafın onayını beklemeden akıllı sözleşmenin yürütülmesini sonlandırmak ve kanalı kesinleştirmek için zincir üstü bir talep gönderebilir. Daha önce açıklanan mutabakatı bozan durumlardan herhangi biri meydana gelirse, taraflardan herhangi biri kanalı kapatmak ve fonları dağıtmak için zincir üstü sözleşmeyi tetikleyebilir. Bu, dürüst tarafların diğer tarafın eylemlerinden bağımsız olarak herhangi bir noktada mevduatlarını çekebilmelerini sağlayan **güven gerektirmezlik** ortamı sunar.

Kanaldan çıkma işlemini gerçekleştirmek için kullanıcı, uygulamanın son geçerli durum güncellemesini zincir üstü sözleşmeye göndermek zorundadır. Bunun yapıldığı doğrulanırsa (yani, tüm tarafların imzasını taşıyorsa), fonlar kendi lehlerine yeniden dağıtılır.

Ancak, tek kullanıcılı çıkma isteklerinin yürütülmesinde gecikme vardır. Kanalı sonlandırma talebi oybirliğiyle onaylanırsa, zincir üstü çıkış işlemi derhal yürütülür.

Gecikme, sahtecilik eylemleri olasılığı sebebiyle tek kullanıcılı çıkışlarda devreye girer. Örneğin, bir kanal katılımcısı eski bir durum güncellemesini zincir üstünde göndererek kanalı Ethereum'da kesinleştirmeye çalışabilir.

Bir karşı önlem olarak özel kanallar, dürüst kullanıcıların kanalın en son geçerli durumunu zincir üstünde göndererek geçersiz durum güncellemelerine itiraz etmelerine olanak tanır. Özel kanallar, üzerinde fikir birliğine varılan durum güncellemelerinin eski durum güncellemelerinden baskın çıkacağı şekilde tasarlanmıştır.

Bir eş, zincir üstü anlaşmazlık çözüm sistemini tetiklediğinde, diğer tarafın belirli bir zaman sınırı içinde (meydan okuma penceresi olarak adlandırılır) yanıt vermesi gerekir. Bu, özellikle diğer taraf eski bir güncelleme kullanıyorsa, kullanıcıların çıkış işlemine itiraz etmesine olanak tanır.

Durum ne olursa olsun, kanal kullanıcıları her zaman güçlü kesinlik garantilerine sahiptir: eğer ellerindeki durum geçişi tüm üyeler tarafından imzalanmışsa ve en son güncellemeyse, o zaman normal bir zincir üstü işlemle eşit kesinliğe sahiptir. Yine de diğer tarafa zincir üstünde itiraz etmek zorundadırlar, ancak olası tek sonuç ellerinde tuttukları son geçerli durumu kesinleştirmektir.

### Özel kanallar Ethereum ile nasıl etkileşime girer? {#how-do-state-channels-interact-with-ethereum}
Özel kanallar, zincir dışı protokoller olarak var olmalarına rağmen, zincir üstü bir bileşene sahiptirler: kanal açılırken Ethereum'da dağıtılan akıllı sözleşme. Bu sözleşme, kanala yatırılan varlıkları kontrol eder, durum güncellemelerini doğrular ve katılımcılar arasındaki uyuşmazlıklarda hakemlik yapar.

Özel kanallar, [katman 2](/layer-2/) ölçeklendirme çözümlerinin aksine, işlem verilerini veya durum taahhütlerini Mainnet'te yayımlamaz. Ancak [yan zincirlere](/developers/docs/scaling/sidechains/) kıyasla Mainnet'e daha bağlıdırlar, bu da onları bir nebze daha güvenli kılar.

Özel kanallar, aşağıdakiler için ana Ethereum protokolüne güvenir:

#### 1. Canlılık {#liveness}

Kanalı açarken dağıtılan zincir üstü sözleşme, kanalın işlevselliğinden sorumludur. Eğer sözleşme Ethereum'da çalışıyorsa, kanal her zaman kullanıma hazır durumdadır. Buna karşılık bir yan zincir, Ana Ağ işlevsel durumda olsa dahi her zaman başarısız olabilir ve kullanıcı fonlarını riske atabilir.

#### 2. Güvenlik {#security}

Özel kanallar, güvenliği sağlamak ve kullanıcıları kötü niyetli eşlerden korumak için bir yere kadar Ethereum'a güvenir. Daha sonraki bölümlerde açıklanacağı üzere kanallar, kullanıcıların geçersiz veya eski bir güncelleme ile kanalı sonlandırmaya yönelik girişimlere itiraz etmesine olanak tanıyan bir sahtecilik kanıtı mekanizması kullanır.

Bu durumda dürüst taraf, doğrulama için kanalın en son geçerli durumunu bir sahtekarlık kanıtı olarak zincir üstü sözleşmeye sunar. Sahtekarlık kanıtları, birbirine güvenmeyen tarafların süreçte fonlarını riske atmadan zincir dışı işlemler yapmalarını sağlar.

#### 3. Kesinlik {#finality}

Kanal kullanıcıları tarafından toplu olarak imzalanan durum güncellemeleri, zincir üstü işlemler kadar iyi kabul edilir. Ancak yine de, tüm kanal içi faaliyetler sadece kanal Ethereum'da kapatıldığında gerçek kesinliğe ulaşır.

İyimser durumda, her iki taraf da işbirliği yapabilir ve son durum güncellemesini imzalayıp kanalı kapatmak için zincir üstünde gönderebilir, ardından fonlar kanalın son durumuna göre dağıtılır. Kötümser durumda, birisi zincir üstünde yanlış bir durum güncellemesi yayınlayarak hile yapmaya çalıştığında, meydan okuma penceresi dolana kadar işlemi kesinleştirilmez.

## Sanal özel kanallar {#virtual-state-channels}

Bir özel kanalın basit uygulaması, iki kullanıcının bir uygulamayı zincir dışı yürütmek istediğinde yeni bir sözleşme dağıtmasıdır. Bu sadece olanaksız olmakla kalmaz, aynı zamanda özel kanalların maliyet etkinliğini de ortadan kaldırır (zincir üstü işlem maliyetleri hızla artabilir).

Bu sorunu çözmek için "sanal kanallar" yaratılmıştır. Açmak ve sonlandırmak için zincir üstü işlemler gerektiren normal kanalların aksine, sanal bir kanal ana zincirle etkileşime girmeden açılabilir, yürütülebilir ve kesinleştirilebilir. Bu yöntemle anlaşmazlıkları zincir dışında çözmek bile mümkündür.

Bu sistem, zincir üstünde finanse edilmiş olan "defter kanalları" (ledger channels) olarak adlandırılan kanalların varlığına dayanır. İki taraf arasındaki sanal kanallar ledger kanalının sahiplerinin aracı olarak görevi gördüğü mevcut bir ledger defter kanalının üzerine kurulabilir.

Her sanal kanaldaki kullanıcılar, yeni bir sözleşme örneği aracılığıyla etkileşime girer ve ledger kanalı birden çok sözleşme örneğini destekleyebilir. Defter kanalının durumu ayrıca birden fazla sözleşme depolama durumu içerir, bu da farklı kullanıcılar arasında uygulamaların zincir dışında paralel olarak yürütülmesine olanak tanır.

Kullanıcılar, tıpkı normal kanallardaki gibi durum makinesini ilerletmek için durum güncellemelerini takas eder. Bir anlaşmazlık ortaya çıkmadığı sürece, aracıyla yalnızca kanalı açarken veya sonlandırırken iletişime geçilmesi gerekir.

### Sanal ödeme kanalları {#virtual-payment-channels}

Sanal ödeme kanalları, sanal özel kanallarla aynı fikirde çalışır: aynı ağa bağlı katılımcılar, zincir üstünde yeni bir kanal açmaya gerek duymadan mesajlaşabilir. Sanal ödeme kanallarında, değer transferleri bir veya daha fazla aracı ile yönlendirilir ve transfer edilen fonların yalnızca amaçlanan alıcı tarafından alınması garanti edilir.

## Özel kanalların uygulamaları {#applications-of-state-channels}

### Ödemeler {#payments}

İlk blokzincir kanalları, iki katılımcının Mainnet'te yüksek işlem ücretleri ödemek zorunda kalmadan zincir dışında hızlı, düşük ücretli transferler yapmasına olanak tanıyan basit protokollerdi. Günümüzdeki ödeme kanalları, ether ve jeton takas etmek ve yatırmak için tasarlanmış uygulamalar için hala kullanışlıdır.

Kanal esaslı ödemelerde aşağıdaki avantajlar vardır:

1. **Verim**: Kanal başına düşen zincir dışı işlem sayısı, özellikle blok boyutu ve blok süresi gibi çeşitli faktörlerden etkilenen Ethereum'un veriminden bağımsızdır. Blokzincir kanalları, işlemleri zincir dışında yürüterek daha yüksek verim elde edebilir.

2. **Gizlilik**: Kanallar zincir dışında var olduğu için, katılımcılar arasındaki etkileşimlerin ayrıntıları Ethereum'un halka açık blokzincirine kaydedilmez. Kanal kullanıcılarının yalnızca kanalları finanse ederken, kapatırken veya anlaşmazlıkları çözerken zincir üstünde etkileşimde bulunmaları gerekir. Bu sebeple kanallar, daha gizli işlemler isteyen kişiler için kullanışlıdır.

3. **Gecikme**: Kanal katılımcıları arasında yürütülen zincir dışı işlemler, her iki taraf da işbirliği yaparsa anında sonuçlandırılarak gecikmeleri azaltabilir. Buna karşılık olarak Ana Ağ üzerinden işlem göndermek için düğümlerin işlemi tamamlamasının, işlemle yeni bir blok oluşturmasının ve mutabakata varılmasının beklenmesi gerekir. Kullanıcılar aynı zamanda, işlemi sonlandırılmış olarak kabul etmeden önce başka blok onaylarını beklemek zorunda kalabilir.

4. **Maliyet**: Özel kanallar, bir grup katılımcının uzun bir süre boyunca çok sayıda durum güncellemesi yapacağı durumlarda özellikle kullanışlıdır. Ortaya çıkan tek maliyet, özel kanal akıllı sözleşmesinin açılış ve kapanış maliyetidir; kanalın açılışı ve kapanışı arasındaki her durum değişikliği uzlaşma maliyeti ona göre dağıtıldığı için bir öncekinden daha ucuz olacaktır.

Özel kanalları [toplamalar](/developers/docs/scaling/#rollups) gibi katman 2 çözümlerinde uygulamak, onları ödemeler için daha da çekici hale getirebilir. Kanallar ucuz ödemeler sunsa da, açılış aşamasında Mainnet üzerinde zincir üstü sözleşme kurma maliyetleri, özellikle gas ücretleri aniden yükseldiğinde pahalı olabilir. Ethereum tabanlı toplamalar [daha düşük işlem ücretleri](https://l2fees.info/) sunar ve kurulum ücretlerini düşürerek kanal katılımcıları için ek yükü azaltabilir.

### Mikro işlemler {#microtransactions}

Mikro işlemler işletmelerin zarar etmeden işleyemediği düşük değerli ödemelerdir (örn. bir doların kesirli kısmından daha düşük). Bu varlıklar, müşteri ödemelerinin marjının kar elde edemeyecek kadar düşük olduğu durumlarda, ödeme hizmeti sağlayıcılarına ödeme yapmak zorundadır.

Ödeme kanalları, mikro işlemlerle ilgili yükü azaltarak bu problemi çözer. Örneğin, Bir İnternet Servis Sağlayıcısı (ISP) bir müşteriyle bir ödeme kanalı açabilir ve hizmeti her kullandığında küçük ödemeler yapmasına izin verir.

Kanalı açma ve kapatma maliyetinin ötesinde, katılımcılar mikro işlemlerde başka maliyetlere maruz kalmaz (gaz ücreti yoktur). Müşterilerin hizmetler için ne kadar ödeme yapacakları konusunda daha çok esnekliğe sahip olması ve işletmelerin karlı mikro işlemlerde kayıp yaşamaması sebebiyle bu bir kazan-kazan durumudur.

### Merkeziyetsiz uygulamalar {#decentralized-applications}

Tıpkı ödeme kanalları gibi özel kanallar da durum makinesinin son durumlarına göre koşullu ödemeler yapabilir. Özel kanallar ayrıca isteğe bağlı durum geçiş mantığını da destekleyebilir, bu da onları genel uygulamaları zincir dışında çalıştırmak için kullanışlı hale getirir.

Özel kanallar genellikle basit, sıra tabanlı uygulamalarla sınırlıdır, çünkü bu, zincir üstü sözleşmeye taahhüt edilen fonların yönetimini kolaylaştırır. Ayrıca, zincir dışı uygulamanın durumunu belirli aralıklarla güncelleyen sınırlı sayıda taraf varken, dürüst olmayan davranışları cezalandırmak nispeten basittir.

Bir özel kanal uygulamasının verimliliği aynı zamanda onun tasarımına da bağlıdır. Örneğin, bir geliştirici, uygulama kanalı sözleşmesini bir kez zincir üstünde dağıtabilir ve diğer oyuncuların zincir üstüne çıkmak zorunda kalmadan uygulamayı yeniden kullanmalarına izin verebilir. Bu durumda, ilk uygulama kanalı, her biri uygulamanın akıllı sözleşmesinin yeni bir örneğini zincir dışında çalıştıran birden çok sanal kanalı destekleyen bir defter kanalı (ledger channel) görevi görür.

Özel kanal uygulamaları için potansiyel bir kullanım durumu, fonların oyunun sonucuna göre dağıtıldığı basit iki oyunculu oyunlardır. Buradaki fayda, oyuncuların birbirine güvenmek zorunda olmaması (güven gerektirmezlik) ve fonların tahsisini ve anlaşmazlıkların çözümünü (merkeziyetsizlik) oyuncuların değil, zincir üstü sözleşmenin kontrol etmesidir.

Özel kanal uygulamaları için diğer olası kullanım durumları, ENS isim sahipliğini, NFT ledger'lerini ve daha fazlasını içerir.

### Atomik transferler {#atomic-transfers}

Erken dönemlerdeki ödeme kanallarının işlevi, iki taraf arasındaki transferlerle kısıtlıydı ve dolayısıyla kullanılabilirlikleri sınırlıydı. Ancak sanal kanalların kullanıma sunulması, bireylerin yeni bir kanalı zincir üstünde açmaya gerek kalmadan aracılar (yani birden çok P2P kanalı) aracılığıyla transferleri yönlendirmesine olanak tanıdı.

Genellikle "çok atlamalı transferler" olarak tanımlanan yönlendirilmiş ödemeler atomiktir (yani, ya işlemlerin tüm bölümleri başarılı olur ya da hep birlikte başarısız olur). Atomik transferler, ödemenin yalnızca belirli koşullar karşılandığında serbest bırakılmasını sağlamak için [Karma Zaman Kilitli Sözleşmeler (HTLC'ler)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) kullanır, böylece karşı taraf riskini azaltır.

## Özel kanalları kullanmanın dezavantajları {#drawbacks-of-state-channels}

### Canlılık varsayımları {#liveness-assumptions}

Özel kanallar, verimliliği sağlamak için kanal katılımcılarının anlaşmazlıklara cevap verme becerilerine zaman sınırlamaları koyar. Bu kural, eşlerin kanal aktivitesini izlemek ve tartışmalara itiraz etmek için her zaman çevrimiçi olacağını varsayar.

Gerçekte, kullanıcılar kendi kontrolleri dışındaki sebeplerden çevrimdışı kalabilirler (örn. zayıf internet bağlantısı, mekanik arızalar, vb.). Eğer dürüst bir kullanıcı çevrimdışı kalırsa kötü niyetli bir eş, eski ara durumları hakem sözleşmesine sunabilir ve taahhüt edilen fonları çalarak durumdan faydalanabilir.

Bazı kanallar, başkaları adına zincir üstü anlaşmazlık olaylarını izlemekten ve ilgili tarafları uyarmak gibi gerekli eylemleri yapmaktan sorumlu olan "gözetleme kuleleri" (watchtowers) kullanır. Ancak bu, özel kanal kullanmanın maliyetini arttırır.

### Veri kullanılamazlığı {#data-unavailability}

Daha önce açıklandığı üzere geçersiz bir uyuşmazlığa itiraz etmek, özel kanalın en son geçerli halini sunmayı gerektirir. Bu da, kullanıcıların kanalın en son durumuna eriştiği vasayımına dayanan bir diğer kuraldır.

Kanal kullanıcılarından zincir dışı uygulama durumunun kopyalarını saklamalarını beklemek makul olsa da, bu veriler hata veya mekanik arıza nedeniyle kaybolabilir. Kullanıcı veriyi yedeklememişse yapabileceği tek şey, diğer tarafın kendi sahip olduğu eski durum geçişlerini kullanarak geçersiz bir çıkış talebini sonlandırmamasını ummaktır.

Ağ, veri kullanılabilirliği üzerine kuralları uyguladığı için Ethereum kullanıcılarının bu problemle baş etmesi gerekmez. İşlem verileri, tüm düğümler tarafından depolanıp yayımlanır ve gerekli olduğu takdirde kullanıcıların indirmesi için hazırdır.

### Likidite sorunları {#liquidity-issues}

Bir blokzincir kanalı oluşturmak için, katılımcıların kanalın yaşam döngüsü boyunca bir zincir üstü akıllı sözleşmeye fon kilitlemeleri gerekir. Bu, kanal kullanıcılarının likiditesini azaltır ve aynı zamanda kanalları, Ana Ağ'da fonları kilitli tutmaya gücü yetenlerle sınırlandırır.

Ancak, bir zincir dışı hizmet sağlayıcısı (OSP) tarafından işletilen defter kanalları (ledger channels), kullanıcılar için likidite sorunlarını azaltabilir. Bir defter kanalına bağlı iki eş, istedikleri zaman tamamen zincir dışında açıp kesinleştirebilecekleri bir sanal kanal oluşturabilir.

Zincir dışı hizmet sağlayıcıları, ödemeleri yönlendirmek için kullanışlı hale getirmek amacıyla birden fazla eşle de kanallar açabilir. Elbette kullanıcılar, OSP'lere hizmetleri için ödeme yapmak zorundadır; bu, bazıları için istenmeyen bir durum olabilir.

### Tasa saldırıları {#griefing-attacks}

Griefing saldırıları, sahtecilik kanıtı tabanlı sistemlerin ortak bir özelliğidir. Bir griefing saldırısı salgırgana direkt olarak bir yarar sağlamaz ancak kurbanın grief'e maruz kalmasına (zarara uğramasına) sebep olur ve adı da buradan gelir.

Sahteciliğin kanıtlanması, griefing saldırılarına kolay edef olur; çünkü dürüst taraf her uyuşmazlığa, hatta geçersiz olanlara bile yanıt vermek zorundadır, aksi takdirde fonlarını kaybetme riskiyle karşı karşıyadır. Kötü niyetli bir katılımcı, dürüst tarafı geçerli durumla yanıt vermeye zorlayarak, eski durum geçişlerini zincir üstünde tekrar tekrar yayınlamaya karar verebilir. Bu zincir üstü işlemlerin maliyeti hızla artabilir ve bu da dürüst tarafların süreçte kayba uğramasına neden olabilir.

### Önceden tanımlanmış katılımcı setleri {#predefined-participant-sets}

Bir özel kanalı oluşturan katılımcı sayısı, tasarımı gereği kullanım ömrü boyunca sabittir. Bunun sebebi, katılımcı kümesinin güncellenmesinin, özellikle kanala fon sağlanırken ya da anlaşmazlıkları çözerken kanalın işleyişini zorlaştırmasıdır. Katılımcı eklemek veya kaldırmak ek zincir üstü etkinlik gerektirir, bu da kullanıcılar için ek yükü artırır.

Bu, özel kanallar hakkında fikir yürütmeyi kolaylaştırsa da kanal tasarımlarının uygulama geliştiricileri için kullanışlılığını sınırlar. Bu, özel kanalların neden toplamalar gibi diğer ölçeklendirme çözümlerine tercih edilmediğini kısmen açıklar.

### Paralel işlem işleme {#parallel-transaction-processing}

Özel kanaldaki katılımcılar, durum güncellemelerini sırayla gönderirler, bu sebeple en çok "sıra tabanlı uygulamalarda" (örn. iki kişilik bir satranç oyunu) işe yararlar. Bu, eş zamanlı durum güncellemelerini ele alma ihtiyacını ortadan kaldırır ve zincir üstü sözleşmenin eski güncelleme gönderenleri cezalandırmak için yapması gereken işi azaltır. Ancak, bu tasarımın yan etkisi işlemlerin birbirlerine bağlı hale gelmesidir. Bu da gecikmeyi artırır ve genel kullanıcı deneyimini olumsuz etkiler.

Bazı özel kanallar bu sorunu, zincir dışı durumu iki tek yönlü "simpleks" duruma ayıran ve eş zamanlı durum güncellemelerine izin veren "tam çift yönlü" (full-duplex) bir tasarım kullanarak çözer. Bu tür tasarımlar zincir dışı verimi artırır ve işlem gecikmelerini azaltır.

## Özel kanalları kullanma {#use-state-channels}

Merkeziyetsiz uygulamalarınıza entegre edebileceğiniz özel kanallara ilişkin uygulamalar sağlayan birden çok proje mevcuttur:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Daha fazla kaynak {#further-reading}

**Özel kanallar**

- [Ethereum’un Katman 2 Ölçeklendirme Çözümlerini Anlamak: Özel Kanallar, Plazma ve Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 Şubat 2018_
- [Özel Kanallar - bir açıklama](https://www.jeffcoleman.ca/state-channels/) _6 Kas 2015 - Jeff Coleman_
- [Özel Kanalların Temelleri](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Blokzincir Özel Kanalları: Son Teknoloji](https://ieeexplore.ieee.org/document/9627997)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
