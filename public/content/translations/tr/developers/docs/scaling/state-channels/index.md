---
title: "Durum Kanalları"
description: "Ethereum topluluğu tarafından şu anda kullanılan bir ölçeklendirme çözümü olarak durum kanallarına ve ödeme kanallarına giriş."
lang: tr
sidebarDepth: 3
---

Durum kanalları, katılımcıların [Ethereum](/) Ana Ağı ile etkileşimi minimumda tutarken güvenli bir şekilde zincir dışı işlem yapmalarına olanak tanır. Kanal eşleri, kanalı açmak ve kapatmak için yalnızca iki zincir içi işlem gönderirken, istedikleri sayıda zincir dışı işlem gerçekleştirebilirler. Bu, son derece yüksek işlem kapasitesine olanak tanır ve kullanıcılar için daha düşük maliyetlerle sonuçlanır.

## Ön Koşullar {#prerequisites}

[Ethereum ölçeklendirme](/developers/docs/scaling/) ve [katman 2 (l2)](/layer-2/) hakkındaki sayfalarımızı okumuş ve anlamış olmalısınız.

## Kanallar nedir? {#what-are-channels}

Ethereum gibi halka açık blokzincirler, dağıtık mimarileri nedeniyle ölçeklenebilirlik zorluklarıyla karşılaşır: zincir içi işlemler tüm düğümler tarafından yürütülmelidir. Düğümler, ağı merkeziyetsiz tutmak için işlem kapasitesine bir sınır koyarak, mütevazı donanımlar kullanarak bir bloktaki işlem hacmini idare edebilmelidir. Blokzincir kanalları, kullanıcıların nihai uzlaşma için ana zincirin güvenliğine güvenmeye devam ederken zincir dışı etkileşime girmelerine izin vererek bu sorunu çözer.

Kanallar, iki tarafın kendi aralarında birçok işlem yapmasına ve ardından yalnızca nihai sonuçları blokzincire göndermesine olanak tanıyan basit eşler arası protokollerdir. Kanal, ürettikleri özet verilerin gerçekten geçerli bir ara işlemler dizisinin sonucu olduğunu göstermek için kriptografi kullanır. Bir ["çoklu imza"](/developers/docs/smart-contracts/#multisig) akıllı sözleşmesi, işlemlerin doğru taraflarca imzalanmasını sağlar.

Kanallarla, durum değişiklikleri ilgili taraflarca yürütülür ve doğrulanır, bu da Ethereum'un yürütme katmanındaki hesaplamayı en aza indirir. Bu, Ethereum'daki tıkanıklığı azaltır ve ayrıca kullanıcılar için işlem işleme hızlarını artırır.

Her kanal, Ethereum üzerinde çalışan bir [çoklu imza akıllı sözleşmesi](/developers/docs/smart-contracts/#multisig) tarafından yönetilir. Bir kanal açmak için katılımcılar, kanal sözleşmesini zincir içi dağıtır ve içine fon yatırır. Her iki taraf da kanalın durumunu başlatmak için toplu olarak bir durum güncellemesi imzalar, ardından zincir dışı hızlı ve özgürce işlem yapabilirler.

Kanalı kapatmak için katılımcılar, kanalın üzerinde anlaşılan son durumunu zincir içi gönderirler. Daha sonra akıllı sözleşme, kilitli fonları kanalın son durumundaki her katılımcının bakiyesine göre dağıtır.

Eşler arası kanallar, önceden tanımlanmış bazı katılımcıların görünür bir ek yük oluşturmadan yüksek frekansta işlem yapmak istedikleri durumlar için özellikle yararlıdır. Blokzincir kanalları iki kategoriye ayrılır: **ödeme kanalları** ve **durum kanalları**.

## Ödeme kanalları {#payment-channels}

Bir ödeme kanalı en iyi, iki kullanıcı tarafından toplu olarak sürdürülen "iki yönlü bir defter" olarak tanımlanır. Defterin başlangıç bakiyesi, kanal açılış aşamasında zincir içi sözleşmeye kilitlenen mevduatların toplamıdır. Ödeme kanalı transferleri, ilk tek seferlik zincir içi oluşturma ve kanalın nihai kapanışı dışında, gerçek blokzincirin kendisi dahil olmadan anında gerçekleştirilebilir.

Defterin bakiyesindeki (yani ödeme kanalının durumundaki) güncellemeler, kanaldaki tüm tarafların onayını gerektirir. Tüm kanal katılımcıları tarafından imzalanan bir kanal güncellemesi, tıpkı Ethereum'daki bir işlem gibi kesinleşmiş kabul edilir.

Ödeme kanalları, basit kullanıcı etkileşimlerinin (örneğin, ETH transferleri, atomik takaslar, mikro ödemeler) pahalı zincir içi etkinliğini en aza indirmek için tasarlanmış en eski ölçeklendirme çözümleri arasındaydı. Kanal katılımcıları, transferlerinin net toplamı yatırılan token'ları aşmadığı sürece kendi aralarında sınırsız miktarda anında, ücretsiz işlem gerçekleştirebilirler.

## Durum kanalları {#state-channels}

Zincir dışı ödemeleri desteklemenin yanı sıra, ödeme kanallarının genel durum geçiş mantığını ele almak için yararlı olduğu kanıtlanmamıştır. Durum kanalları bu sorunu çözmek ve kanalları genel amaçlı hesaplamayı ölçeklendirmek için yararlı hale getirmek amacıyla oluşturulmuştur.

Durum kanallarının ödeme kanallarıyla hala pek çok ortak noktası vardır. Örneğin kullanıcılar, diğer kanal katılımcılarının da imzalaması gereken kriptografik olarak imzalanmış mesajları (işlemleri) değiştirerek etkileşime girerler. Önerilen bir durum güncellemesi tüm katılımcılar tarafından imzalanmazsa geçersiz sayılır.

Ancak kanal, kullanıcının bakiyelerini tutmanın yanı sıra, sözleşmenin depolamasının mevcut durumunu da (yani sözleşme değişkenlerinin değerlerini) izler.

Bu, iki kullanıcı arasında zincir dışı bir akıllı sözleşme yürütmeyi mümkün kılar. Bu senaryoda, akıllı sözleşmenin iç durumundaki güncellemeler yalnızca kanalı oluşturan eşlerin onayını gerektirir.

Bu, daha önce açıklanan ölçeklenebilirlik sorununu çözse de, güvenlik açısından sonuçları vardır. Ethereum'da, durum geçişlerinin geçerliliği ağın mutabakat protokolü tarafından uygulanır. Bu, bir akıllı sözleşmenin durumuna geçersiz bir güncelleme önermeyi veya akıllı sözleşme yürütmesini değiştirmeyi imkansız hale getirir.

Durum kanalları aynı güvenlik garantilerine sahip değildir. Bir dereceye kadar, bir durum kanalı Ana Ağ'ın minyatür bir versiyonudur. Kuralları uygulayan sınırlı bir katılımcı kümesiyle, kötü niyetli davranış olasılığı (örneğin, geçersiz durum güncellemeleri önermek) artar. Durum kanalları güvenliklerini [sahtekarlık kanıtlarına](/glossary/#fraud-proof) dayalı bir anlaşmazlık tahkim sisteminden alır.

## Durum kanalları nasıl çalışır {#how-state-channels-work}

Temel olarak, bir durum kanalındaki etkinlik, kullanıcıları ve bir blokzincir sistemini içeren bir etkileşim oturumudur. Kullanıcılar çoğunlukla birbirleriyle zincir dışı iletişim kurar ve altta yatan blokzincirle yalnızca kanalı açmak, kanalı kapatmak veya katılımcılar arasındaki olası anlaşmazlıkları çözmek için etkileşime girerler.

Aşağıdaki bölüm, bir durum kanalının temel iş akışını özetlemektedir:

### Kanalı açmak {#opening-the-channel}

Bir kanal açmak, katılımcıların Ana Ağ'daki bir akıllı sözleşmeye fon taahhüt etmelerini gerektirir. Mevduat aynı zamanda sanal bir hesap işlevi görür, böylece katılımcı aktörler ödemeleri hemen uzlaştırmaya gerek kalmadan özgürce işlem yapabilirler. Yalnızca kanal zincir içi kesinleştiğinde taraflar birbirleriyle uzlaşır ve hesaplarında kalanı çekerler.

Bu mevduat aynı zamanda her katılımcının dürüst davranışını garanti altına almak için bir teminat görevi görür. Eğer mevduat sahipleri anlaşmazlık çözümü aşamasında kötü niyetli eylemlerden suçlu bulunursa, sözleşme mevduatlarını keser.

Kanal eşleri, hepsinin üzerinde anlaştığı bir başlangıç durumunu imzalamalıdır. Bu, durum kanalının başlangıcı olarak hizmet eder, bundan sonra kullanıcılar işlem yapmaya başlayabilir.

### Kanalı kullanmak {#using-the-channel}

Kanalın durumunu başlattıktan sonra eşler, işlemleri imzalayarak ve onay için birbirlerine göndererek etkileşime girerler. Katılımcılar bu işlemlerle durum güncellemelerini başlatır ve diğerlerinden gelen durum güncellemelerini imzalarlar. Her işlem aşağıdakilerden oluşur:

- İşlemler için benzersiz bir kimlik görevi gören ve tekrarlama saldırılarını önleyen bir **nonce**. Ayrıca durum güncellemelerinin hangi sırayla gerçekleştiğini de tanımlar (bu, anlaşmazlık çözümü için önemlidir)

- Kanalın eski durumu

- Kanalın yeni durumu

- Durum geçişini tetikleyen işlem (örneğin, Alice Bob'a 5 ETH gönderir)

Kanaldaki durum güncellemeleri, kullanıcılar Ana Ağ'da etkileşime girdiğinde normalde olduğu gibi zincir içi yayınlanmaz, bu da durum kanallarının zincir içi ayak izini en aza indirme hedefiyle uyumludur. Katılımcılar durum güncellemeleri üzerinde anlaştıkları sürece, bunlar bir Ethereum işlemi kadar kesindir. Katılımcıların yalnızca bir anlaşmazlık ortaya çıkarsa Ana Ağ'ın mutabakatına güvenmeleri gerekir.

### Kanalı kapatmak {#closing-the-channel}

Bir durum kanalını kapatmak, kanalın üzerinde anlaşılan son durumunu zincir içi akıllı sözleşmeye göndermeyi gerektirir. Durum güncellemesinde atıfta bulunulan ayrıntılar, her katılımcının hamle sayısını ve onaylanmış işlemlerin bir listesini içerir.

Durum güncellemesinin geçerli olduğunu (yani tüm taraflarca imzalandığını) doğruladıktan sonra akıllı sözleşme kanalı kesinleştirir ve kilitli fonları kanalın sonucuna göre dağıtır. Zincir dışı yapılan ödemeler Ethereum'un durumuna uygulanır ve her katılımcı kilitli fonların kalan kısmını alır.

Yukarıda açıklanan senaryo, işlerin yolunda gittiği durumda ne olacağını temsil eder. Bazen kullanıcılar bir anlaşmaya varamayabilir ve kanalı kesinleştiremeyebilir (kötü durum). Durum için aşağıdakilerden herhangi biri geçerli olabilir:

- Katılımcılar çevrimdışı olur ve durum geçişleri öneremezler

- Katılımcılar geçerli durum güncellemelerini birlikte imzalamayı reddederler

- Katılımcılar, zincir içi sözleşmeye eski bir durum güncellemesi önererek kanalı kesinleştirmeye çalışırlar

- Katılımcılar, başkalarının imzalaması için geçersiz durum geçişleri önerirler

Bir kanaldaki katılımcı aktörler arasında mutabakat bozulduğunda, son seçenek kanalın nihai, geçerli durumunu uygulamak için Ana Ağ'ın mutabakatına güvenmektir. Bu durumda, durum kanalını kapatmak anlaşmazlıkları zincir içi çözmeyi gerektirir.

### Anlaşmazlıkları çözmek {#settling-disputes}

Tipik olarak, bir kanaldaki taraflar kanalı önceden kapatma konusunda anlaşırlar ve akıllı sözleşmeye sundukları son durum geçişini birlikte imzalarlar. Güncelleme zincir içi onaylandıktan sonra, zincir dışı akıllı sözleşmenin yürütülmesi sona erer ve katılımcılar paralarıyla kanaldan çıkış yaparlar.

Ancak bir taraf, karşı tarafın onayını beklemeden akıllı sözleşmenin yürütülmesini sonlandırmak ve kanalı kesinleştirmek için zincir içi bir talep gönderebilir. Daha önce açıklanan mutabakatı bozan durumlardan herhangi biri meydana gelirse, her iki taraf da kanalı kapatmak ve fonları dağıtmak için zincir içi sözleşmeyi tetikleyebilir. Bu, **güven gereksinimsizliği** sağlayarak, dürüst tarafların diğer tarafın eylemlerinden bağımsız olarak herhangi bir noktada mevduatlarıyla çıkış yapabilmelerini sağlar.

Kanal çıkışını işlemek için kullanıcının uygulamanın son geçerli durum güncellemesini zincir içi sözleşmeye göndermesi gerekir. Eğer bu doğrulanırsa (yani tüm tarafların imzasını taşıyorsa), fonlar onların lehine yeniden dağıtılır.

Ancak, tek kullanıcılı çıkış taleplerinin yürütülmesinde bir gecikme vardır. Kanalı sonlandırma talebi oybirliğiyle onaylandıysa, zincir içi çıkış işlemi derhal yürütülür.

Gecikme, sahtekarlık eylemleri olasılığı nedeniyle tek kullanıcılı çıkışlarda devreye girer. Örneğin, bir kanal katılımcısı zincir içi daha eski bir durum güncellemesi göndererek kanalı Ethereum'da kesinleştirmeye çalışabilir.

Bir karşı önlem olarak durum kanalları, dürüst kullanıcıların kanalın en son, geçerli durumunu zincir içi göndererek geçersiz durum güncellemelerine itiraz etmelerine olanak tanır. Durum kanalları, üzerinde anlaşılan daha yeni durum güncellemelerinin eski durum güncellemelerini geçersiz kılacağı şekilde tasarlanmıştır.

Bir eş zincir içi anlaşmazlık çözüm sistemini tetiklediğinde, diğer tarafın bir zaman sınırı (itiraz penceresi olarak adlandırılır) içinde yanıt vermesi gerekir. Bu, özellikle diğer taraf eski bir güncellemeyi uyguluyorsa, kullanıcıların çıkış işlemine itiraz etmelerine olanak tanır.

Durum ne olursa olsun, kanal kullanıcıları her zaman güçlü kesinlik garantilerine sahiptir: ellerindeki durum geçişi tüm üyeler tarafından imzalanmışsa ve en son güncellemeyse, o zaman normal bir zincir içi işlemle eşit kesinliğe sahiptir. Yine de diğer tarafa zincir içi itiraz etmeleri gerekir, ancak olası tek sonuç, ellerinde tuttukları son geçerli durumun kesinleşmesidir.

### Durum kanalları Ethereum ile nasıl etkileşime girer? {#how-do-state-channels-interact-with-ethereum}

Zincir dışı protokoller olarak var olmalarına rağmen, durum kanallarının zincir içi bir bileşeni vardır: kanalı açarken Ethereum'da dağıtılan akıllı sözleşme. Bu sözleşme, kanala yatırılan varlıkları kontrol eder, durum güncellemelerini doğrular ve katılımcılar arasındaki anlaşmazlıklarda hakemlik yapar.

Durum kanalları, [katman 2 (l2)](/layer-2/) ölçeklendirme çözümlerinin aksine, işlem verilerini veya durum taahhütlerini Ana Ağ'da yayınlamaz. Bununla birlikte, Ana Ağ'a örneğin [yan zincirlerden](/developers/docs/scaling/sidechains/) daha fazla bağlıdırlar, bu da onları bir nebze daha güvenli kılar.

Durum kanalları aşağıdakiler için ana Ethereum protokolüne güvenir:

#### 1. Liveness {#liveness}

Kanalı açarken dağıtılan zincir içi sözleşme, kanalın işlevselliğinden sorumludur. Sözleşme Ethereum üzerinde çalışıyorsa, kanal her zaman kullanıma hazırdır. Buna karşılık, Ana Ağ çalışır durumda olsa bile bir yan zincir her zaman çökebilir ve kullanıcı fonlarını riske atabilir.

#### 2. Security {#security}

Bir dereceye kadar durum kanalları, güvenlik sağlamak ve kullanıcıları kötü niyetli eşlerden korumak için Ethereum'a güvenir. İlerleyen bölümlerde tartışıldığı gibi kanallar, kullanıcıların kanalı geçersiz veya eski bir güncellemeyle kesinleştirme girişimlerine itiraz etmelerini sağlayan bir sahtekarlık kanıtı mekanizması kullanır.

Bu durumda dürüst taraf, doğrulama için zincir içi sözleşmeye bir sahtekarlık kanıtı olarak kanalın en son geçerli durumunu sağlar. Sahtekarlık kanıtları, karşılıklı olarak birbirine güvenmeyen tarafların bu süreçte fonlarını riske atmadan zincir dışı işlemler yürütmelerini sağlar.

#### 3. Finality {#finality}

Kanal kullanıcıları tarafından toplu olarak imzalanan durum güncellemeleri, zincir içi işlemler kadar iyi kabul edilir. Yine de, kanal içi tüm etkinlikler yalnızca kanal Ethereum'da kapatıldığında gerçek kesinliğe ulaşır.

İyimser durumda, her iki taraf da işbirliği yapabilir ve son durum güncellemesini imzalayıp kanalı kapatmak için zincir içi gönderebilir, ardından fonlar kanalın son durumuna göre dağıtılır. Birinin zincir içi yanlış bir durum güncellemesi yayınlayarak hile yapmaya çalıştığı kötümser durumda, itiraz penceresi dolana kadar işlemleri kesinleşmez.

## Sanal durum kanalları {#virtual-state-channels}

Bir durum kanalının basit uygulaması, iki kullanıcı bir uygulamayı zincir dışı yürütmek istediğinde yeni bir sözleşme dağıtmak olacaktır. Bu sadece uygulanamaz olmakla kalmaz, aynı zamanda durum kanallarının maliyet etkinliğini de ortadan kaldırır (zincir içi işlem maliyetleri hızla artabilir).

Bu sorunu çözmek için "sanal kanallar" oluşturuldu. Açmak ve sonlandırmak için zincir içi işlemler gerektiren normal kanalların aksine, sanal bir kanal ana zincirle etkileşime girmeden açılabilir, yürütülebilir ve kesinleştirilebilir. Bu yöntemi kullanarak anlaşmazlıkları zincir dışı çözmek bile mümkündür.

Bu sistem, zincir içi finanse edilen "defter kanalları" olarak adlandırılan kanalların varlığına dayanır. İki taraf arasındaki sanal kanallar, defter kanalının sahibi/sahipleri aracı olarak hizmet vererek mevcut bir defter kanalının üzerine inşa edilebilir.

Her sanal kanaldaki kullanıcılar, birden fazla sözleşme örneğini destekleyebilen defter kanalıyla yeni bir sözleşme örneği aracılığıyla etkileşime girer. Defter kanalının durumu ayrıca birden fazla sözleşme depolama durumu içerir ve bu da uygulamaların farklı kullanıcılar arasında zincir dışı paralel yürütülmesine olanak tanır.

Tıpkı normal kanallarda olduğu gibi kullanıcılar, durum makinesini ilerletmek için durum güncellemelerini değiştirirler. Bir anlaşmazlık ortaya çıkmadıkça, aracıyla yalnızca kanalı açarken veya sonlandırırken iletişime geçilmesi gerekir.

### Sanal ödeme kanalları {#virtual-payment-channels}

Sanal ödeme kanalları, sanal durum kanallarıyla aynı fikir üzerinden çalışır: aynı ağa bağlı katılımcılar, zincir içi yeni bir kanal açmaya gerek kalmadan mesaj iletebilirler. Sanal ödeme kanallarında değer transferleri, yalnızca hedeflenen alıcının transfer edilen fonları alabileceği garantisiyle bir veya daha fazla aracı üzerinden yönlendirilir.

## Durum kanallarının uygulamaları {#applications-of-state-channels}

### Ödemeler {#payments}

Erken dönem blokzincir kanalları, iki katılımcının Ana Ağ'da yüksek işlem ücretleri ödemek zorunda kalmadan zincir dışı hızlı, düşük ücretli transferler gerçekleştirmesine olanak tanıyan basit protokollerdi. Günümüzde ödeme kanalları, ether ve token'ların değişimi ve yatırılması için tasarlanmış uygulamalar için hala yararlıdır.

Kanal tabanlı ödemelerin aşağıdaki avantajları vardır:

1. **İşlem kapasitesi**: Kanal başına zincir dışı işlem miktarı, özellikle blok boyutu ve blok süresi olmak üzere çeşitli faktörlerden etkilenen Ethereum'un işlem kapasitesinden bağımsızdır. Blokzincir kanalları, işlemleri zincir dışı yürüterek daha yüksek işlem kapasitesine ulaşabilir.

2. **Gizlilik**: Kanallar zincir dışı var olduğundan, katılımcılar arasındaki etkileşimlerin ayrıntıları Ethereum'un halka açık blokzincirine kaydedilmez. Kanal kullanıcıları yalnızca kanalları finanse ederken ve kapatırken veya anlaşmazlıkları çözerken zincir içi etkileşime girmek zorundadır. Bu nedenle kanallar, daha gizli işlemler arzulayan bireyler için yararlıdır.

3. **Gecikme**: Kanal katılımcıları arasında yürütülen zincir dışı işlemler, her iki taraf da işbirliği yaparsa anında uzlaştırılabilir ve gecikmeleri azaltır. Buna karşılık, Ana Ağ'da bir işlem göndermek, düğümlerin işlemi işlemesini, işlemle yeni bir blok üretmesini ve mutabakata varmasını beklemeyi gerektirir. Kullanıcıların ayrıca bir işlemi kesinleşmiş saymadan önce daha fazla blok onayı beklemesi gerekebilir.

4. **Maliyet**: Durum kanalları, özellikle bir grup katılımcının uzun bir süre boyunca birçok durum güncellemesi alışverişinde bulunacağı durumlarda yararlıdır. Ortaya çıkan tek maliyet, durum kanalı akıllı sözleşmesinin açılması ve kapatılmasıdır; kanalı açma ve kapatma arasındaki her durum değişikliği, uzlaşma maliyeti buna göre dağıtıldığından bir öncekinden daha ucuz olacaktır.

Durum kanallarını [toplamalar](/developers/docs/scaling/#rollups) gibi katman 2 (l2) çözümlerinde uygulamak, onları ödemeler için daha da cazip hale getirebilir. Kanallar ucuz ödemeler sunarken, açılış aşamasında Ana Ağ'da zincir içi sözleşmeyi kurmanın maliyetleri, özellikle gaz ücretleri fırladığında pahalı hale gelebilir. Ethereum tabanlı toplamalar [daha düşük işlem ücretleri](https://l2fees.info/) sunar ve kurulum ücretlerini düşürerek kanal katılımcıları için ek yükü azaltabilir.

### Mikro işlemler {#microtransactions}

Mikro işlemler, işletmelerin zarara uğramadan işleyemeyeceği düşük değerli ödemelerdir (örneğin, bir doların çok küçük bir kısmından daha düşük). Bu kuruluşlar ödeme hizmeti sağlayıcılarına ödeme yapmalıdır, ancak müşteri ödemelerindeki marj kar elde etmek için çok düşükse bunu yapamazlar.

Ödeme kanalları, mikro işlemlerle ilişkili ek yükü azaltarak bu sorunu çözer. Örneğin, bir İnternet Servis Sağlayıcısı (İSS) bir müşteriyle bir ödeme kanalı açarak, hizmeti her kullandıklarında küçük ödemeler akıtmalarına olanak tanıyabilir.

Kanalı açma ve kapatma maliyetinin ötesinde, katılımcılar mikro işlemlerde daha fazla maliyete katlanmazlar (gaz ücreti yoktur). Müşteriler hizmetler için ne kadar ödeyecekleri konusunda daha fazla esnekliğe sahip olduklarından ve işletmeler karlı mikro işlemleri kaybetmediklerinden bu bir kazan-kazan durumudur.

### Merkeziyetsiz uygulamalar {#decentralized-applications}

Ödeme kanalları gibi, durum kanalları da durum makinesinin son durumlarına göre koşullu ödemeler yapabilir. Durum kanalları ayrıca rastgele durum geçiş mantığını da destekleyebilir, bu da onları genel uygulamaları zincir dışı yürütmek için yararlı kılar.

Durum kanalları genellikle basit sıra tabanlı uygulamalarla sınırlıdır, çünkü bu, zincir içi sözleşmeye taahhüt edilen fonları yönetmeyi kolaylaştırır. Ayrıca, zincir dışı uygulamanın durumunu aralıklarla güncelleyen sınırlı sayıda tarafla, dürüst olmayan davranışları cezalandırmak nispeten basittir.

Bir durum kanalı uygulamasının verimliliği aynı zamanda tasarımına da bağlıdır. Örneğin, bir geliştirici uygulama kanalı sözleşmesini zincir içi bir kez dağıtabilir ve diğer oyuncuların zincir içi gitmek zorunda kalmadan uygulamayı yeniden kullanmalarına izin verebilir. Bu durumda, ilk uygulama kanalı, her biri uygulamanın akıllı sözleşmesinin yeni bir örneğini zincir dışı çalıştıran birden fazla sanal kanalı destekleyen bir defter kanalı olarak hizmet eder.

Durum kanalı uygulamaları için potansiyel bir kullanım durumu, fonların oyunun sonucuna göre dağıtıldığı basit iki oyunculu oyunlardır. Buradaki fayda, oyuncuların birbirlerine güvenmek zorunda olmamaları (güven gereksinimsizliği) ve fonların tahsisini ve anlaşmazlıkların çözümünü oyuncuların değil zincir içi sözleşmenin kontrol etmesidir (merkeziyetsizlik).

Durum kanalı uygulamaları için diğer olası kullanım durumları arasında ENS isim sahipliği, NFT defterleri ve çok daha fazlası bulunur.

### Atomik transferler {#atomic-transfers}

Erken dönem ödeme kanalları iki taraf arasındaki transferlerle sınırlıydı ve bu da kullanılabilirliklerini kısıtlıyordu. Ancak sanal kanalların tanıtılması, bireylerin zincir içi yeni bir kanal açmak zorunda kalmadan transferleri aracılar (yani birden fazla eşler arası kanal) üzerinden yönlendirmelerine olanak tanıdı.

Genellikle "çok sekmeli transferler" olarak tanımlanan yönlendirilmiş ödemeler atomiktir (yani işlemin tüm parçaları ya başarılı olur ya da tamamen başarısız olur). Atomik transferler, ödemenin yalnızca belirli koşullar karşılandığında serbest bırakılmasını sağlamak için [Özet Zaman Kilitli Sözleşmeler (HTLC'ler)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) kullanır ve böylece karşı taraf riskini azaltır.

## Durum kanalları kullanmanın dezavantajları {#drawbacks-of-state-channels}

### Liveness varsayımları {#liveness-assumptions}

Verimliliği sağlamak için durum kanalları, kanal katılımcılarının anlaşmazlıklara yanıt verme yeteneğine zaman sınırları koyar. Bu kural, eşlerin kanal etkinliğini izlemek ve gerektiğinde itirazlara karşı çıkmak için her zaman çevrimiçi olacağını varsayar.

Gerçekte kullanıcılar, kontrolleri dışındaki nedenlerle (örneğin, zayıf internet bağlantısı, mekanik arıza vb.) çevrimdışı olabilirler. Dürüst bir kullanıcı çevrimdışı olursa, kötü niyetli bir eş, hakem sözleşmesine eski ara durumları sunarak ve taahhüt edilen fonları çalarak durumu istismar edebilir.

Bazı kanallar "gözetleme kuleleri" kullanır; bunlar başkaları adına zincir içi anlaşmazlık olaylarını izlemekten ve ilgili tarafları uyarmak gibi gerekli eylemleri yapmaktan sorumlu varlıklardır. Ancak bu, bir durum kanalı kullanmanın maliyetlerini artırabilir.

### Veri kullanılamazlığı {#data-unavailability}

Daha önce açıklandığı gibi, geçersiz bir anlaşmazlığa itiraz etmek, durum kanalının en son, geçerli durumunu sunmayı gerektirir. Bu, kullanıcıların kanalın en son durumuna erişimi olduğu varsayımına dayanan başka bir kuraldır.

Kanal kullanıcılarının zincir dışı uygulama durumunun kopyalarını saklamasını beklemek makul olsa da, bu veriler hata veya mekanik arıza nedeniyle kaybolabilir. Kullanıcının verileri yedeklenmemişse, yalnızca diğer tarafın ellerindeki eski durum geçişlerini kullanarak geçersiz bir çıkış talebini kesinleştirmemesini umabilirler.

Ağ, veri kullanılabilirliği konusunda kurallar uyguladığından Ethereum kullanıcıları bu sorunla uğraşmak zorunda kalmazlar. İşlem verileri tüm düğümler tarafından saklanır ve yayılır ve gerektiğinde kullanıcıların indirmesi için mevcuttur.

### Likidite sorunları {#liquidity-issues}

Bir blokzincir kanalı kurmak için katılımcıların, kanalın yaşam döngüsü boyunca zincir içi bir akıllı sözleşmeye fon kilitlemeleri gerekir. Bu, kanal kullanıcılarının likiditesini azaltır ve ayrıca kanalları Ana Ağ'da fonları kilitli tutmayı karşılayabilenlerle sınırlar.

Bununla birlikte, bir zincir dışı hizmet sağlayıcısı (OSP) tarafından işletilen defter kanalları, kullanıcılar için likidite sorunlarını azaltabilir. Bir defter kanalına bağlı iki eş, istedikleri zaman tamamen zincir dışı açıp kesinleştirebilecekleri sanal bir kanal oluşturabilir.

Zincir dışı hizmet sağlayıcıları ayrıca birden fazla eşle kanallar açarak onları ödemeleri yönlendirmek için yararlı hale getirebilir. Elbette kullanıcılar, hizmetleri için OSP'lere ücret ödemelidir, bu da bazıları için istenmeyen bir durum olabilir.

### Griefing saldırıları {#griefing-attacks}

Griefing (zarar verme) saldırıları, sahtekarlık kanıtı tabanlı sistemlerin yaygın bir özelliidir. Bir griefing saldırısı saldırgana doğrudan fayda sağlamaz, ancak kurbana zarar verir, adı da buradan gelir.

Sahtekarlık kanıtlama, griefing saldırılarına karşı hassastır çünkü dürüst taraf, geçersiz olanlar da dahil olmak üzere her anlaşmazlığa yanıt vermelidir, aksi takdirde fonlarını kaybetme riskiyle karşı karşıya kalır. Kötü niyetli bir katılımcı, zincir içi tekrar tekrar eski durum geçişleri yayınlamaya karar vererek dürüst tarafı geçerli durumla yanıt vermeye zorlayabilir. Bu zincir içi işlemlerin maliyeti hızla artabilir ve dürüst tarafların bu süreçte zarara uğramasına neden olabilir.

### Önceden tanımlanmış katılımcı kümeleri {#predefined-participant-sets}

Tasarım gereği, bir durum kanalını oluşturan katılımcı sayısı, ömrü boyunca sabit kalır. Bunun nedeni, katılımcı kümesini güncellemenin, özellikle kanalı finanse ederken veya anlaşmazlıkları çözerken kanalın işleyişini karmaşıklaştırmasıdır. Katılımcı eklemek veya çıkarmak ayrıca ek zincir içi etkinlik gerektirecektir, bu da kullanıcılar için ek yükü artırır.

Bu, durum kanalları hakkında akıl yürütmeyi kolaylaştırsa da, kanal tasarımlarının uygulama geliştiricileri için kullanışlılığını sınırlar. Bu, durum kanallarının neden toplamalar gibi diğer ölçeklendirme çözümleri lehine terk edildiğini kısmen açıklamaktadır.

### Paralel işlem işleme {#parallel-transaction-processing}

Durum kanalındaki katılımcılar durum güncellemelerini sırayla gönderirler, bu nedenle "sıra tabanlı uygulamalar" (örneğin, iki oyunculu bir satranç oyunu) için en iyi şekilde çalışırlar. Bu, eşzamanlı durum güncellemelerini ele alma ihtiyacını ortadan kaldırır ve eski güncellemeleri yayınlayanları cezalandırmak için zincir içi sözleşmenin yapması gereken işi azaltır. Ancak bu tasarımın bir yan etkisi, işlemlerin birbirine bağımlı olması, gecikmeyi artırması ve genel kullanıcı deneyimini azaltmasıdır.

Bazı durum kanalları, zincir dışı durumu iki tek yönlü "simpleks" duruma ayıran ve eşzamanlı durum güncellemelerine olanak tanıyan "tam çift yönlü" bir tasarım kullanarak bu sorunu çözer. Bu tür tasarımlar zincir dışı işlem kapasitesini artırır ve işlem gecikmelerini azaltır.

## Durum kanallarını kullanın {#use-state-channels}

Birden fazla proje, merkeziyetsiz uygulamalarınıza entegre edebileceğiniz durum kanalı uygulamaları sağlar:

- [Connext](https://connext.network/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Daha fazla okuma {#further-reading}

**Durum kanalları**

- [Ethereum'un Katman 2 Ölçeklendirme Çözümlerini Anlamak: Durum Kanalları, Plasma ve Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 Şubat 2018_
- [Durum Kanalları - bir açıklama](https://www.jeffcoleman.ca/state-channels/) _6 Kasım 2015 - Jeff Coleman_
- [Durum Kanallarının Temelleri](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Blokzincir Durum Kanalları: Son Teknoloji](https://ieeexplore.ieee.org/document/9627997)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_