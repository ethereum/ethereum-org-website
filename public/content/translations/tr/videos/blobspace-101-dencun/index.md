---
title: "Bir sonraki Ethereum güncellemesi: blob alanına giriş 101"
description: "Domothy, Ethereum'un Dencun güncellemesiyle sunulan yeni veri kullanılabilirliği katmanı olan blob alanını açıklıyor; blob işlemlerinin nasıl çalıştığını, Ethereum ölçeklendirmesi için neden önemli olduklarını ve veri kullanılabilirliği için sırada ne olduğunu ele alıyor."
lang: tr
youtubeId: "dFjyUY3e53Q"
uploadDate: 2024-02-27
duration: "1:02:31"
educationLevel: intermediate
topic:
  - "scaling"
  - "blobs"
  - "dencun"
  - "upgrades"
format: interview
author: Bankless
breadcrumb: "Blob Alanı 101"
---

Bu röportaj, [EIP-4844 (Proto-Danksharding)](https://www.eip4844.com/) ile sunulan Ethereum'un blob alanı kaynağını ele alıyor. Ethereum araştırmacısı Domothy, Bankless podcast'inde David Hoffman ve Ryan Sean Adams'a katılarak Rollup odaklı yol haritasının tarihini, blob'ların teknik mekaniklerini ve blok alanı ile blob alanını ayırmanın ekonomik etkilerini açıklıyor.

*Bu döküm, Bankless tarafından yayımlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=dFjyUY3e53Q) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için ufak düzenlemeler yapılmıştır.*

#### Blob alanına giriş (0:00) {#introduction-to-blob-space-000}

**Ryan Sean Adams:** İnternet parasının ve internet finansının sınırlarını keşfettiğimiz Bankless'a hoş geldiniz. Bu, nasıl başlayacağınız, nasıl daha iyi olacağınız ve fırsatları nasıl önceden yakalayacağınızla ilgilidir. David Hoffman ile birlikte buradayım ve daha bankasız (bankless) olmanıza yardımcı olmak için buradayız. Blokzincirlerin blok sattığını söylediğimizi biliyorsunuz, değil mi? Yakında Ethereum sadece bloklardan daha fazlasını satacak; blob'lar da satacak.

**David Hoffman:** Doğru, blob'lar. Birleşme'den (The Merge) bu yana en büyük Ethereum sürümüne sadece birkaç ay kaldı ve bence kimse bunun etkilerini tam olarak haritalandırmadı, ancak bu çok büyük olacak. Ethereum satacak yeni bir ürün ediniyor. Buna blob alanı deniyor ve bu, blok alanına ek olarak geliyor. Katman 2'lerdeki (l2) işlemlerin maliyeti sıfıra doğru düşmek üzere. ETH Gazı ve yakım ekonomisi sonsuza dek değişmek üzere. Bu güncellemeyi blob alanı güncellemesi, EIP-4844, Proto-Danksharding olarak adlandırıyoruz. Blob alanı hakkında bilmeniz gereken her şeyi ele almak istiyoruz.

**Ryan Sean Adams:** Buradan çıkarılacak birkaç sonuç var. Birincisi, blob alanının ne olduğunu inceliyoruz. İkincisi, buraya nasıl geldiğimizin tarihini, yani bu Rollup odaklı yol haritasını inceliyoruz. Üçüncüsü, ekonomiyi inceliyoruz. Bu, Ethereum'un ekonomisi, ETH değer birikimi ve bir varlık olarak ETH için ne anlama geliyor? David, bu bölüm senin için neden önemliydi?

**David Hoffman:** Bence senin ve benim gerçekten sevdiğimiz bir sohbet alanı varsa, o da kriptografi ve ekonominin kesişimidir; sayılar ve ekonomik tezahürler gibi. Bu protokolleri oynamayı seviyorum.

**Ryan Sean Adams:** Evet, bu bizim aşk dilimiz.

**David Hoffman:** EIP-4844 hakkında konuştuk, Proto-Danksharding hakkında konuştuk. Bunlar aynı şeyler. Bunu birkaç kez farklı kapasitelerde tanımladık. Ancak tavşan deliğine hiçbir zaman agresif bir şekilde balıklama dalıp diğer taraftan ekonomi tarafını yanıtlayarak çıkmadık. Yani teknik düzeyde veri kullanılabilirliğini teknik olarak ölçeklendirdik; bu bir Protokol geliştirmesidir. Peki bu, Ethereum'un piyasa tarafıyla nasıl bağlantı kuruyor? Tek bir pazar yeri artık ikiye bölünüyor: blok alanı ve blob alanı artık bir Ethereum bloğu içinde yer alan iki farklı bağımsız pazardır.

Bu Ether için ne anlama geliyor? Bu, bunların etrafında ortaya çıkan pazar yerleri için ne anlama geliyor? Her birinin arz ve talep dengesi birbirini nasıl iter ve çeker? Bu, katman 2 (l2) ölçeklenebilirliği için ne yapar? Bu, katman 2'lerin (l2) üzerindeki ekonomik kullanım durumları için ne yapar? Temel bilgilerle başlayacağız, ancak daha sonra tavşan deliğinin diğer ucundan bu konuşmanın ekonomik tarafına çıkacağız.

Konuğumuz Dom'u, diğer adıyla Domothy'yi davet edelim. Kendisi, EIP-4844 (bugünün konusu), tam danksharding ve MEV yakımı da dahil olmak üzere ufuktaki önemli Ethereum güncellemelerinin araştırma ve geliştirmesi üzerinde çalışan Ethereum Vakfı'nda bir araştırmacıdır.

#### Rollup odaklı yol haritasının tarihi (10:00) {#the-history-of-the-rollup-centric-roadmap-1000}

**Ryan Sean Adams:** Dom, blob alanına nasıl geldiğimizi tam olarak anlamak için, Ethereum yol haritasının bütünlüğünü anlamak adına hafıza şeridinde geriye gitmeye değer olduğunu düşünüyorum, çünkü blob'lar ve blob alanı çok mantıklı bir sonuca ulaştı. Bizi geçmişe götürebilir misin? Çünkü bir zamanlar Ethereum'un Rollup odaklı yol haritası diye bir şey yoktu. Aslında hiçbir zaman sahip olamadığımız yürütme parçalaması (execution sharding) denen bir şey vardı. Ethereum'un yol haritasının tarihinde, blob alanının tam bağlamını gerçekten anlamak için neresi uygundur?

**Domothy:** Elbette. Ethereum piyasaya sürülmeden önce bile, onu nasıl ölçeklendireceğimize dair düşünceler vardı çünkü o zamanlar bile herkes, her Düğümün her şeyi çalıştırdığı tek bir Blokzincirin yeterli olmayacağını biliyordu. Bu yüzden başlangıçta parçalama (sharding) için bir sürü farklı fikir vardı. Bunu gerçekten belirlemeye yönelik ilk girişim, temel olarak diyelim ki 64 farklı bağımsız Zincire sahip olduğunuz ve bunların çapraz iletişim kurmaya çalıştığı yürütme ile parçalamaydı. Bunun yapılması zor olduğu ortaya çıktı; işin içinde çok fazla karmaşıklık var.

Farklı aşamalara ayrılmıştı. İlk olarak, bir İşaret zinciri başlatacağız, ardından onu mevcut yürütme katmanı ile nasıl birleştireceğimizi bulacağız. Sonra sadece veri parçalama olan Birinci Aşamayı yapacağız; yani yürütme yok, sadece veri içeren daha küçük Blokzincirler. Ve sonra yürütme parçalamasının nasıl yapılacağını bulacağız. İlerledikçe birçok şeyi çözmemiz gerekiyordu, ancak daha sonra pişman olacağımız bir şey yapmamak ve tüm Blokzinciri bozmamak için bunu güvenli bir şekilde yapmalıydık, çünkü üzerinde çok fazla ekonomik faaliyet var.

**David Hoffman:** Yürütme parçalaması hakkında ayrıntı vermek gerekirse; bu, doğrulayıcıların Blokzincirin farklı parçaları arasında rastgele karıştırılmasıdır ve her bir parça aslında İşaret zincirine paralel olarak çalışan kendi mini Blokzinciridir. Bugün toplamalar ile sahip olduğumuz şeye biraz benziyor, ancak buradaki fark, Ethereum parçalarının aslında katman 1 (l1) Protokolünün bir parçası olmasıdır. Katman 1 (l1) Protokolü parçaların ne olduğunu belirlerken, toplamalar birbirinden ayrıdır. Başlangıçta, Ethereum katman 1 (l1) Protokolü tarafından işletilen, yönetilen ve üretilen bu parçalardan 64 tane olacaktı. Bunu doğru ifade ediyor muyum?

**Domothy:** Kesinlikle. Yürütme ölçeklendirmesini bu şekilde elde etmek, toplamalar ve veri parçalama ile daha dolaylıdır, ancak araştırma perspektifinden bir tür hile kodu gibidir çünkü Ethereum katman 1'in (l1) yapması ve endişelenmesi gereken çok daha az şey vardır. Geri kalanı toplamalara devredilir, ki bu benim görüşüme göre orijinal plandan daha iyidir. Durum destekli parçaların orijinal planında her şey aynıdır; aynı Blokzincir, aynı EVM, aynı ödünleşimler. Şimdi bunun yerine, en iyi ortamı ve ödünleşimleri elde etmek için birbirleriyle rekabet eden toplamalarınız olabilir. Süper güvenlik yerine süper hızı tercih ederseniz, farklı bir Rollup'a geçebilirsiniz. Katman 2'de (l2) seçenekleriniz, inovasyonunuz ve rekabetiniz var.

**Ryan Sean Adams:** Ethereum'un içinde bulunduğu modüler dünyaya değinelim. Mutabakat katmanı, veri kullanılabilirliği katmanı ve yürütme katmanı var. Mutabakat katmanı neyin doğru olduğunu, yani blokların sırasını tanımlar. Veri kullanılabilirliği katmanı ne olduğudur; yani veri katmanıdır. Dış katman, şu anda faaliyetin gerçekleştiği yer olan yürütmedir. Başlangıçta Ethereum, bu üçünü de ana Zincirde birleştirmişti.

Şimdi Rollup odaklı yol haritasıyla yaptığımız şey, yürütmeyi ana Zincirden bu toplamalara parçalamaktır. Ancak toplamaların Ethereum Ana Ağı ile benzer garantilerle tam olarak güvence altına alınabilmesi için, verilerini Ethereum Ana Ağına geri göndermeleri gerekir. Bunu yaptıklarında, şu anda blok alanına mal oluyor ve çok paraya mal oluyor. Proto-Danksharding'in (EIP-4844) nedeni, ekonominin toplamalar lehine çok olumlu bir şekilde değişmesidir. Dom, buraya ekleyeceğin bir şey var mı?

**Domothy:** Şu anda veri kullanılabilirliğinin daha örtük olduğunu ve bunun güven gerektirmeyen doğrulamaya dayandığını ekleyebilirim. Herkesin Zinciri kendi başına doğrulayabilmesini ve ortada "bana güven kardeşim" diyen üçüncü bir tarafa ihtiyaç duymamasını istiyoruz. Darboğaz budur. Her şeyi doğrulayabilmeniz gerekir, bu da örtük olarak durum geçişlerini kontrol etmek için verilerin kullanımınıza sunulması gerektiği anlamına gelir.

2020'nin sonlarında insanlar, toplamaların inanılmaz derecede iyi ve popüler olmaya başladığını ve yürütme parçalamasına ihtiyaç duymadan yürütme ölçeklendirme sorunumuzu çözdüklerini fark ettiler. Bir tür katman 1 (l1) maksimalisti olmaya çalışmak yerine bir toplamalar ekosistemiyle ilerleyerek, toplamalar kendi ödünleşimlerini yapabilir, kendi Blokzincirlerini oluşturabilir ve yeni şeyler deneyebilirler. Ethereum doğrulamayı halleder; bir Blokzincirin özü budur.

#### Blob alanı nedir? (30:00) {#what-is-blob-space-3000}

**Ryan Sean Adams:** Şimdi bizi mevcut duruma götür, Dom. Ethereum katman 1 (l1) blok alanını kullanan, herkesin doğrulayabilmesi için durum verilerini göndermek adına yüksek Gaz ücretleri ödeyen birçok toplamamız var. Peki, Dom, blob nedir?

**Domothy:** Bir blob sadece bir veri parçasıdır; özellikle de temelde büyük, ham bir sayı dizisidir. Şu anda Ethereum'daki bir blob, yaklaşık 128 kilobaytlık sabit bir boyuttadır. Bu, katman 1'e (l1) gönderdiğiniz, blob taşıyan işlem olarak bilinen bir işleme eklenmiş ham veridir.

Buradaki en önemli tasarım kısıtlaması, Ethereum katman 1 (l1) EVM'sinin (Ethereum Sanal Makinesi) — yani yürütme motorunun — blob içindeki verilere erişiminin olmamasıdır. Standart bloklarda, çağrı verisi gibi veriler, sistemin hangi işlevlerin çağrıldığına, hangi paranın taşındığına bakmasını ve durum değişikliklerini doğrulamasını içerir. EVM tüm bunlara erişir. Ancak katman 2 (l2) ölçeklendirmesi, *zincir dışı* bir doğrulayıcının hesaplamayı yapabilmesi için toplamaların verilerini tam olarak göndermeyi içeriyorsa, o zaman Ethereum *katman 1'in* (l1) işlevsel olarak buna gerçekten bakmasına ve onu yürütmesine gerek yoktur.

Bu aslında mühürlü bir pakettir. Katman 1 (l1) onu alır, fiziksel olarak indirmek isterlerse herkesin içine bakma erişimine sahip olduğunu garanti eder, ancak ana Ethereum işleme yürütme katmanının kendisi verileri aktif olarak okumaz ve hesaplamaz. EVM'deki verileri okumadığı ve hesaplamadığı için, Düğümlerden radikal olarak daha az işleme kaynağı gerektirir. Bu yüzden çok daha ucuzdur.

**David Hoffman:** Özetlemek gerekirse: Blok alanı hesaplama, durum yürütme ve mantığın depolanmasıyla ilgilenir. Blob alanı ise yalnızca veri kullanılabilirliği ile ilgilenir. Katman 1 (l1), bu blob'larda kimin ne yayınladığıyla ilgilenmez; tek ilgilendiği bu blob'ları almak ve belirlenen kullanılabilirlik penceresi boyunca tutmaktır, böylece ilgili taraflar (Rollup sıralayıcıları ve kullanıcılar gibi) bunları çekebilir, verilerin kötü niyetli olarak saklanmadığını doğrulayabilir ve yollarına devam edebilirler.

**Domothy:** Kesinlikle. Blob'ların bir diğer kritik özelliği de belirli bir süre sonra — şu anda yaklaşık 18 gün — otomatik olarak budanmalarıdır. Budanmalarının nedeni, güven gerektirmeyen doğrulamayı garanti etmek için, bireylerin yalnızca belirli bir itiraz penceresi içinde Rollup durumu üzerinde kesinlik ve mutabakat kanıtlamak için bu verilere ihtiyaç duymasıdır. Bugünkü işleminizi doğrulamak için iki yıl önceki blob'ları tutan bin Düğüme ihtiyacınız yok. Pencere süresi dolduğunda, onu artık bir Ethereum Düğümünden alamazsınız; geçmiş sağlayıcılarından, indeksleyicilerden veya Rollup'ın yerel blok gezginlerinden alırsınız. Ethereum'da depolama sonsuza dek inanılmaz derecede pahalıdır. Depolama gereksinimini ortadan kaldırmak, Düğüm operatörlerinin sabit disklerini yok etmeden blob işlem kapasitesini ölçeklendirmemize olanak tanır.

#### Ekonomi ve tam danksharding (55:00) {#economics-and-full-danksharding-5500}

**Ryan Sean Adams:** 4844'ün ilk adım olduğunu biliyoruz; buna Proto-Danksharding diyoruz. Blob formatını ve izole edilmiş ücret piyasasını kurar, ancak blok başına hedeflenen gerçek blob sayısı başlangıçta oldukça güvenli olması için kısıtlanmıştır. Tam danksharding'e doğru ölçeklendirme nasıl görünüyor?

**Domothy:** Şu anda EIP-4844 kapsamında, blok başına temel olarak 3 blob hedefliyoruz ve kesin maksimum sınır 6'dır. Bu, özelliğin sürekli üretimde nasıl çalıştığını görürken herhangi bir ağ stresini önlemek için güncellemenin hemen ardından katman 1'deki (l1) mutlak maksimum veri işlem kapasitesini sınırlar.

Tam danksharding bunu dramatik bir şekilde ölçeklendirir. Veri kullanılabilirliği örneklemesine (DAS) doğru ilerler. DAS ile tam Düğümlerin, verilerin kullanıma sunulduğunu doğrulamak için artık her bir blob'u tek tek indirmesine gerek kalmaz. Blob verilerinin küçük parçalarını istatistiksel olarak örnekleyebilirler. İstatistiksel örneklem mevcut olduğunu kanıtlarsa, bir saldırganın veri saklama matematiksel olasılığı fiilen sıfıra yaklaşır (milyarda bir ihtimal gibi). Tüm blob'un tam olarak indirilmesini gerektirmediğinizde, blob kapasitesini blok başına çift hanelere veya daha yükseğe ölçeklendirebilirsiniz.

**David Hoffman:** Bu, bir Ethereum bloğu içinde bölünmüş bir ücret piyasası yaratır. Şu anda bir katman 2 (l2) Rollup'ı, bir Ethereum bloğundaki aynı blok alanı kaynakları için Uniswap ve OpenSea yatırımcılarıyla rekabet etmek zorundadır. Ancak bunlar temelde farklı kullanım modelleridir. Ethereum L1'de çılgınca basılan bir NFT varsa, Gaz fırlar ve veri durumlarını göndermeye çalışan katman 2 (l2) toplamaları, sadece gerekli güvenlik görevlerini yerine getirmek için aniden hızla artan işletme giderleriyle karşı karşıya kalır.

İki boyutlu bir ücret piyasasıyla — aslında blob'ların üzerinde sürmesi için ayrı, izole edilmiş bir yol — Ethereum L1'deki o NFT basımı yürütme Gazını aynı şekilde fırlatır, ancak hiçbir blob alanı kullanmaz. Blob'lar tamamen sıkışıksız kalır ve fiilen kuruşlara mal olur. Ana Zincirdeki milyonlarca dolarlık bir NFT basımının, Arbitrum veya Optimism'deki işlemleri kesinleştirmenin ekonomik maliyeti üzerinde sıfır etkisi vardır.

**Domothy:** Evet, tamamen bağlantısızlar. Ve tam tersi de geçerlidir. Katman 2 (l2) işlem kapasitesi muazzam bir şekilde artarsa ve binlerce Rollup çalışıp blob alanını sıkıştırırsa, blob taban ücretlerinde ortaya çıkan artış, Ethereum Ana Ağında basit bir işlem yapmanın maliyetini etkilemeyecektir. Blob taban ücreti tam olarak EIP-1559 taban ücreti gibi çalışır, ancak kendi boyutunda. Ve yakım ile ilgili önceki sorunuza gelince; evet, blob ücreti, blok alanı taban ücreti yakımından tamamen ayrı olarak, blob alanı veri dahil etme maliyetini ödemek için yakılan ETH üretir.

#### Ethereum ölçeklenebilirliğinin geleceği (75:00) {#the-future-of-ethereum-scalability-7500}

**Ryan Sean Adams:** Özellikle 4844'ün piyasaya sürülmesinde ne olacağına değinmek istiyorum. Başlangıçta, blob kapasitesi aniden açıldığında, o tam mikrosaniyede onu tamamen dolduracak kadar Rollup talebi olmayacağına dair açıkça çok yüksek bir beklenti var. Blob alanı lansmanda neredeyse komik derecede ucuz olacak. Ancak uyarılmış talep yasası yok mu? İnanılmaz derecede ucuz kaynaklarınız varsa, bu kaynakları tüketen uygulamaların hacmi patlar.

**Domothy:** İlk geçiş, katman 2 (l2) ücretlerini temel olarak sıfıra yaklaştıracaktır, çünkü şu anda pahalı blok alanı için rekabet eden mevcut tüm toplamalar, neredeyse boş olan devasa bir blob alanı havuzuna sorunsuz bir şekilde geçiş yapacaktır. Bu, katman 2 (l2) ağları için devasa ve anlık bir marj genişlemesidir ve yeni kanıtlama mantıklarını 4844 ile entegre ettikleri anda doğrudan kullanıcılara yansıtılacaktır.

Ancak haklısınız; ucuz blok alanı, yüksek hızlı uygulama tasarımını yönlendirir. Veri kalıcılığı yükü ortadan kalktığı için bir kuruşun çok küçük bir kısmına milyonlarca mikro durum geçişi üreten zincir içi bir oyunu aniden inşa edebildiğinizde, standart kısıtlamalar altında ekonomik olarak uygun olmayan tamamen yeni uygulama sınıflandırmaları uygulanabilir hale gelir.

Bu, ETH'nin nasıl değer kazandığı konusunda ilginç bir ekonomik dinamik oluşturur. Neredeyse ücretsiz veri kullanılabilirliği üzerinde çalışan yeni olası uygulamalar nedeniyle katman 2 (l2) işlemleri 10 kat veya 100 kat patlarsa, toplanan hacim sonunda blob alanı için rekabet etmeye başlayacaktır. Daha sonra EIP-1559 blob taban ücreti, piyasa dengeye ulaşana kadar doğal olarak yükselir ve katman 2 (l2) faydasını genişletirken ETH yakımının bileşik ve sürekli bir döngüsünü yaratır.

**David Hoffman:** Bu, Rollup odaklı yol haritasının başarısını ve olgunlaşmasını temsil eder. Monolitik yürütme ortamı olan Ethereum, işlem kapasitesini doğrusal olarak ölçeklendirmenin merkeziyetsizlik görevini yok ettiği bir duvara çarptı. Toplamalar, yürütme darboğazını aşmanın bir yolunu sağladı ancak yine de katman 1 (l1) veri darboğazına bağlıydı. Blob alanı, toplamaların yürütme darboğazını açtığı gibi veri darboğazını da açar. Bu güncelleme yayınlandığında Ethereum, tekil işlemleri işlemekten doğrulanmış yürütme ağlarını işlemeye tam olarak geçiş yapar.

**Ryan Sean Adams:** Zaman çizelgesini özetlemek gerekirse, EIP-4844 iyimser bir tahminle yıl sonuna veya gelecek yılın başlarına doğru geliyor ve tam danksharding sonraki geliştirme döngüsünde onu takip ediyor. Bu gerçekten de Ethereum'un gezegeni bünyesine katması için gereken altyapı iskelesidir ve gerçek dünyada çalışmasına çok yakınız. Dom, ağ için bu devasa kilidi açma sürecini bize anlattığın için teşekkür ederiz.

**Domothy:** Beni ağırladığınız için teşekkür ederim.