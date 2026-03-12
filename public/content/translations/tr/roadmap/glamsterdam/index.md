---
title: Glamsterdam
description: "Glamsterdam protokolü yükseltmesi hakkında bilgi edinin"
lang: tr
---
# Glamsterdam {#glamsterdam}

**Glamsterdam, 2026'nın ilk yarısı için planlanan bir Ethereum yükseltmesidir.**


<Alert variant="update">
<AlertContent>
<AlertDescription>
Glamsterdam yükseltmesi, Ethereum'un uzun vadeli geliştirme hedeflerinde yalnızca tek bir adımdır. [Protokol yol haritası](/roadmap/) ve [önceki yükseltmeler](/ethereum-forks/) hakkında daha fazla bilgi edinin.
</AlertDescription>
</AlertContent>
</Alert>

[Ethereum'un](/) yakında çıkacak olan Glamsterdam yükseltmesi, yeni nesil ölçeklendirme önünü açmak için tasarlandı. Glamsterdam, "Amsterdam" (önceki bir Devconnect konumunun adını taşıyan yürütme katmanı yükseltmesi) ve "Gloas" (bir yıldızın adını taşıyan mutabakat katmanı yükseltmesi) kelimelerinin birleşiminden oluşmaktadır.

[Fusaka](/roadmap/fusaka/) yükseltmesinde kaydedilen ilerlemenin ardından Glamsterdam, ağ işlemler nasıl işlediğini ve büyüyen veritabanını nasıl yönettiğini yeniden düzenleyerek L1'i ölçeklendirme odaklanıyor ve Ethereum'un bloklar nasıl oluşturup doğruladığını temelden güncelliyor.

Fusaka temel iyileştirmelere odaklanırken, Glamsterdam farklı ağ katılımcıları arasındaki görev ayrımını güvence altına alarak ve yüksek verimli paralelleştirmeye [hazırlanmak](/glossary/#state) için verileri işlemenin daha verimli yollarını tanıtarak "Scale L1" ve "Scale Blobs" hedeflerini ilerletiyor. 

Bu iyileştirmeler, Ethereum'un daha fazla aktiviteyi yönetirken hızlı, uygun fiyatlı ve merkeziyetsiz kalmasını sağlarken, evde [düğüm](/glossary/#node) çalıştıran kişiler için donanım gereksinimlerini yönetilebilir tutar.

<YouTube id="GgKveVMLnoo" />

## Glamsterdam için iyileştirmeler değerlendiriliyor {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Not: Bu makale şu anda Glamsterdam'a dahil edilmesi düşünülen bir dizi EIP'yi öne çıkarmaktadır. En son durum güncellemeleri için [Forkcast'taki Glamsterdam yükseltmesini](https://forkcast.org/upgrade/glamsterdam) görüntüleyin. 

Glamsterdam için değerlendirilmekte olan ancak henüz bu sayfaya eklenmemiş bir EIP eklemek isterseniz, [ethereum.org'a nasıl katkıda bulunacağınızı buradan öğrenin](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Glamsterdam yükseltmesi üç ana hedefe odaklanıyor:

- İşlemeyi hızlandırma (paralelleştirme): ağ veri bağımlılıklarını nasıl kaydettiğini yeniden düzenleyerek, yavaş ve tek tek bir sıra yerine aynı anda birçok işlemler güvenli bir şekilde işleyebilmesini sağlamak.
- Kapasiteyi genişletme: bloklar oluşturma ve doğrulama gibi ağır işleri bölerek ağ yavaşlamadan daha fazla veri yayması için daha fazla zaman tanır.
- Veritabanı şişkinliğini önleme (sürdürülebilirlik): Yeni verileri depolamanın uzun vadeli donanım maliyetini doğru bir şekilde yansıtacak şekilde ağ ücretlerini ayarlamak, donanım performansının düşmesini önlerken gelecekteki gaz limiti artışlarının önünü açmak.

Kısacası Glamsterdam, ağ kapasitesi arttıkça sürdürülebilirliğin korunmasını ve performansın yüksek kalmasını sağlamak için yapısal değişiklikler getirecek.

## L1 Ölçeklendirme ve Paralel İşleme {#scale-l1}

Anlamlı bir L1 ölçeklendirme, protokol dışı güven varsayımlarından ve seri yürütme kısıtlamalarından uzaklaşmayı gerektirir. Glamsterdam, belirli blok oluşturma görevlerinin ayrılmasını sağlayarak ve ağ paralel işlemeye hazırlanmasına olanak tanıyan yeni veri yapıları tanıtarak bu sorunu ele alır.

### Ana teklif: Kurumsallaşmış teklif sahibi-oluşturucu ayrımı (ePBS) {#epbs}

- Protokol dışı güven varsayımlarını ve kapalı kaynaklı aktarıcılara olan bağımlılığı ortadan kaldırır
- Genişletilmiş yayılma pencereleri aracılığıyla çok daha büyük yüklerin aktarılmasına olanak tanıyarak L1 ölçeklendirme mümkün kılar.
- Güven gerektirmeyen inşaatçı ödemelerini ve şifreli işlemler anonim inşaatçılara sunar

Şu anda bloklar önerme ve oluşturma süreci, blok önerenler ile blok oluşturucular arasında bir devir teslimi içerir. Önerenler ve oluşturucular arasındaki ilişki, temel Ethereum protokolünün bir parçası değildir, bu nedenle kapalı kaynaklı, üçüncü taraf yazılımlara (röleler) ve varlıklar arasındaki protokol dışı güvene dayanır. 

Teklif sahipleri ve oluşturucular arasındaki protokol dışı ilişki, blok doğrulama sırasında bir 'kısa yol' da oluşturur; bu da [doğrulayıcılar](/glossary/#validator) 2 saniyelik dar bir pencerede işlem yayınlama ve yürütme konusunda acele etmeye zorlayarak ağ işleyebileceği veri miktarını sınırlar.

**Kurumsallaştırılmış teklif-oluşturucu ayrımı (ePBS veya EIP-7732)**, teklif verenin ( blok seçen) işini oluşturucudan ( işlemler birleştiren) resmi olarak ayırarak bu süreci doğrudan Ethereum protokolüne 'kurumsallaştırır' ve böylece protokol dışı güveni ortadan kaldırır. Ayrıca, Yük Zamanındalık Komitesi'ni (PTC) ve ikili son teslim tarihi mantığını tanıtarak doğrulayıcılar verimini en üst düzeye çıkarmak için zamanındalık ve veri kullanılabilirliğine ayrı ayrı onay vermesini sağlar. 

<YouTube id="u8XvkTrjITs" />

Protokol düzeyinde önerici ve oluşturucu rollerini ayırmak, yayılma penceresini (veya verileri ağ genelinde yaymak için mevcut süreyi) 2 saniyeden yaklaşık 9 saniyeye çıkarır. 

ePBS, ek üçüncü taraf yazılımlara olan bağımlılığı azaltır ve Ethereum'un ağ zorlamadan çok daha büyük miktarda veriyi ( [katman 2'ler](/glossary/#layer-2) için daha fazla blob gibi) güvenli bir şekilde işlemesini sağlar.

**Kaynaklar**: [EIP-7732 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7732)

### Ana başlık önerisi: Blok düzeyinde erişim listeleri (BAL'ler) {#bals}

- Tüm işlem bağımlılıklarının önceden bir haritasını sağlayarak sıralı işlem darboğazlarını ortadan kaldırır ve doğrulayıcılar birçok işlemler tek tek yerine paralel olarak işlemesi için zemin hazırlar.
- Düğümlerin, her işlem yeniden oynatmak zorunda kalmadan (yürütmesiz senkronizasyon) nihai sonuçları okuyarak kayıtlarını güncellemelerine olanak tanır ve bir düğüm ağ edilmesini çok daha hızlı hale getirir. 
- Tahmin yürütmeyi ortadan kaldırarak doğrulayıcılar tüm gerekli verileri adım adım keşfetmek yerine bir kerede önceden yüklemesine olanak tanır, bu da doğrulamayı çok daha hızlı hale getirir 

Günümüzdeki Ethereum tek şeritli bir yola benzer; çünkü ağ, bir işlem çalıştırılana kadar bir işlem hangi verilere ihtiyaç duyacağını veya neyi değiştireceğini (örneğin bir işlem hangi hesaplara dokunacağını) bilmez, bu nedenle doğrulayıcılar işlemler katı, sıralı bir şekilde tek tek işlemek zorundadır. Bu bağımlılıkları bilmeden işlemler aynı anda işlemeye çalışırlarsa, iki işlemler yanlışlıkla aynı veriyi aynı anda değiştirmeye çalışabilir ve bu da hatalara neden olabilir.

**Blok düzeyinde erişim listeleri (BAL'ler veya EIP-7928)**, her blok yer alan ve ağ, çalışma başlamadan önce veritabanının hangi bölümlerine erişileceğini bildiren bir harita gibidir. BAL'ler, her blok, işlemler dokunacağı her hesap değişikliğinin karmasını ve bu değişikliklerin nihai sonuçlarını (tüm durum erişimlerinin ve yürütme sonrası değerlerin karma kaydını) içermesini gerektirir. 

BAL'lar, hangi işlemler çakışmadığına dair anında görünürlük sağladığından, düğümlerin paralel disk okumaları yapmasına ve birçok işlemler için bilgileri aynı anda getirmesine olanak tanır. ağ, birbiriyle ilişkili olmayan işlemler güvenli bir şekilde gruplandırabilir ve bunları paralel olarak işleyebilir. 

BAL, işlemler nihai sonuçlarını (işlem sonrası değerler) içerdiğinden, ağın düğümlerinin ağın mevcut durumuna senkronize olması gerektiğinde, bu nihai sonuçları kayıtlarını güncellemek için kopyalayabilirler. Doğrulayıcıların ne olduğunu bilmek için tüm karmaşık işlemler baştan sona tekrar oynatmasına gerek kalmaz, bu da yeni düğümlerin ağ katılmasını daha hızlı ve kolay hale getirir. 

BAL'ların sağladığı paralel disk okumaları, Ethereum'un aynı anda birçok işlemler gerçekleştirebileceği ve ağın hızını önemli ölçüde artıracağı bir geleceğe doğru önemli bir adım olacaktır.

#### eth/71 blok erişim listesi değişimi {#bale}

Blok erişim listesi değişimi (eth/71 veya EIP-8159), blok düzeyindeki erişim listelerinin doğrudan ağ arkadaşıdır. BAL'ler paralel yürütmenin önünü açarken, eth/71 eşler arası protokolü yükselterek düğümlerin bu listeleri ağ üzerinden gerçekten paylaşmasına olanak tanır. blok erişim listesi değişiminin uygulanması, daha hızlı senkronizasyon sağlayacak ve düğümlerin yürütmesiz durum güncellemeleri yapmasına olanak tanıyacaktır.

**Kaynaklar**: 
- [EIP-7928 teknik şartnamesi](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8159 teknik şartnamesi](https://eips.ethereum.org/EIPS/eip-8159)

## Ağ sürdürülebilirliği {#network-sustainability}

Ethereum ağ daha hızlı büyüdükçe, kullanım maliyetinin Ethereum'u çalıştıran donanımdaki yıpranma ve aşınmaya uygun olduğundan emin olmak önemlidir. ağ güvenli bir şekilde ölçeklenmesi ve daha fazla işlemler yapabilmesi için genel kapasite sınırlarını artırması gerekir. 

### Durum oluşturma gaz maliyetinde artış {#state-creation-gas-cost-increase}

- Yeni hesaplar veya akıllı sözleşmeler oluşturma ücretlerinin, Ethereum'un veritabanına yükledikleri uzun vadeli yükü doğru bir şekilde yansıtmasını sağlar.
- Bu veri oluşturma ücretlerini, ağın genel kapasitesine göre otomatik olarak ayarlar ve standart fiziksel donanımın ağ çalıştırmaya devam edebilmesi için güvenli ve öngörülebilir bir büyüme oranı hedefler.
- Bu özel ücretlerin muhasebesini yeni bir havuza ayırarak eski işlem limitlerini kaldırır ve geliştiricilerin daha büyük, daha karmaşık uygulamalar dağıtmasına olanak tanır.

Yeni hesaplar, token'lar ve [akıllı sözleşmeler](/glossary/#smart-contract) eklemek, ağ çalıştıran her bilgisayarın süresiz olarak saklaması gereken kalıcı veriler (durum olarak bilinir) oluşturur. Bu verileri ekleme veya okuma için mevcut ücretler tutarsızdır ve ağın donanımına getirdikleri gerçek, uzun vadeli depolama yükünü yansıtmaz.

Yeni hesaplar oluşturmak veya büyük akıllı sözleşmeler dağıtmak gibi Ethereum'da durum oluşturan bazı eylemler, ağın düğümlerinde kapladıkları kalıcı depolama alanına kıyasla nispeten düşük maliyetlidir; örneğin, sözleşme dağıtımı, depolama yuvaları oluşturmaktan bayt başına önemli ölçüde daha ucuzdur. 

Ayarlama yapılmazsa, ağ 100 milyon gaz limiti ölçeklenirse Ethereum'un durumu yılda yaklaşık 200 GiB büyüyebilir ve sonunda yaygın donanımı geride bırakabilir. 

**Durum oluşturma gaz maliyeti artışı (veya EIP-8037)**, maliyetleri oluşturulan verinin gerçek boyutuna bağlayarak uyumlu hale getirir ve ücretleri, bir işlemin oluşturduğu veya eriştiği kalıcı veri miktarıyla orantılı olacak şekilde günceller. 

EIP-8037 ayrıca bu maliyetleri daha öngörülebilir bir şekilde yönetmek için bir rezervuar modeli sunar; durum gaz ücretleri önce `state_gas_reservoir`dan çekilir ve `GAS` opkodu yalnızca `gas_left` döndürerek yürütme çerçevelerinin mevcut gaz yanlış hesaplamasını önler.

EIP-8037'den önce, hem hesaplama işi (aktif işleme) hem de kalıcı veri depolama ( akıllı sözleşme ağın veritabanına kaydetme) aynı gaz limiti paylaşıyordu. Rezervuar modeli, muhasebeyi ikiye ayırır: işlem gerçek hesaplama işi (işleme) için gaz limiti ve uzun süreli veri depolama (durum gaz) için gaz sınırı. İkisini ayırmak, bir uygulamanın verilerinin sırf büyüklüğünün gaz limiti aşmasını önlemeye yardımcı olur; geliştiriciler veri depolama için rezervuarı doldurmaya yetecek kadar fon sağladığı sürece, çok daha büyük ve daha karmaşık akıllı sözleşmeler dağıtabilirler. 

Veri depolama maliyetini daha doğru ve öngörülebilir bir şekilde belirlemek, Ethereum'un veritabanını şişirmeden hızını ve kapasitesini güvenli bir şekilde artırmasına yardımcı olacaktır. Bu sürdürülebilirlik, düğüm operatörlerinin önümüzdeki yıllarda (nispeten) uygun fiyatlı donanım kullanmaya devam etmelerini sağlayarak ağın merkeziyetsizliğini korumak için evde hisseleme erişilebilir kılacaktır.

**Kaynaklar**: [EIP-8037 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-8037)

### Durum erişim gaz maliyeti güncellemesi {#state-access-gas-cost-update}

- Uygulamaların Ethereum'da kalıcı olarak depolanan bilgileri okuduğu veya güncellediği durumlarda (durum erişim kodları) gaz maliyetlerini, bu komutların gerektirdiği hesaplama işiyle doğru bir şekilde eşleşecek şekilde artırır.
- Yapay olarak ucuz veri okuma işlemlerini istismar eden hizmet reddi saldırılarını önleyerek ağ dayanıklılığını güçlendirir

Ethereum'un durumu büyüdükçe, eski verileri arama ve okuma ("durum erişimi") işlemi, düğümlerin işlemesi için daha ağır ve daha yavaş hale geldi. Bilgileri aramak artık biraz daha pahalı olsa da (işlem gücü açısından) bu işlemlerin ücretleri aynı kaldı. 

Sonuç olarak, bazı özel komutlar, bir düğüm yapmasını gerektirdikleri işe kıyasla şu anda düşük fiyatlandırılmıştır. Örneğin, `EXTCODESIZE` ve `EXTCODECOPY` düşük fiyatlandırılmıştır çünkü iki ayrı veritabanı okuması gerektirirler: biri hesap nesnesi için, ikincisi ise gerçek kod boyutu veya bayt kodu için.

**Durum erişim gaz maliyeti güncellemesi (veya EIP-8038)**, modern donanım performansına ve durum boyutuna uyum sağlamak için hesap ve sözleşme verilerini aramak gibi durum erişim işlem kodları için gaz sabitlerini artırır. 

Durum erişim maliyetini ayarlamak, Ethereum'u daha esnek hale getirmeye de yardımcı olur. Bu yoğun veri okuma işlemleri yapay olarak ucuz olduğundan, kötü niyetli bir saldırgan, ağın ücret sınırına ulaşmadan önce tek bir blok binlerce karmaşık veri isteğiyle ağ spam'leyebilir ve potansiyel olarak ağ durmasına veya çökmesine neden olabilir (hizmet reddi saldırısı). Kötü niyet olmasa bile, ağ verilerini okumak çok ucuzsa geliştiriciler verimli uygulamalar oluşturmaya ekonomik olarak teşvik edilmezler.

Ethereum, durum erişim eylemlerini daha doğru fiyatlandırarak kazara veya kasıtlı yavaşlamalara karşı daha dirençli olabilirken, ağ maliyetlerini donanım yüküyle uyumlu hale getirmek gelecekteki gaz limiti artışları için daha sürdürülebilir bir temel oluşturur.

**Kaynaklar**: [EIP-8038 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-8038)

## Ağ dayanıklılığı 

doğrulayıcı görevlerine ve çıkış süreçlerine yapılan iyileştirmeler, toplu cezalandırma olayları sırasında ağ kararlılığını sağlar ve likiditeyi demokratikleştirir. Bu iyileştirmeler, ağ daha kararlı hale getirir ve büyük küçük tüm katılımcıların adil muamele görmesini sağlar.

### Cezalandırılan doğrulayıcılar teklif vermekten hariç tutun {#exclude-slashed-validators}

- Cezalandırılan (kesinti yapılan) doğrulayıcılar gelecekteki bloklar önermek üzere seçilmesini durdurarak garanti edilen kaçırılan blokları ortadan kaldırır.
- Ethereum'un sorunsuz ve güvenilir bir şekilde çalışmasını sağlar ve toplu bir slashing olayı durumunda ciddi aksaklıkları önler.

Şu anda, bir doğrulayıcı cezalandırılsa (kuralları çiğnediği veya beklendiği gibi çalışmadığı için) bile, sistem gelecekteki teklif sahibi önizlemelerini oluştururken yakın gelecekte bir blok oluşturması için onları seçebilir. 

Cezalandırılan doğrulayıcılardan gelen bloklar otomatik olarak geçersiz olarak reddedildiğinden, bu durum ağ zaman aralıklarını kaçırmasına ve toplu cezalandırma olayları sırasında ağ iyileşmesinin gecikmesine neden olur. 

**Kesilen doğrulayıcılar teklif vermekten hariç tutma (veya EIP-8045)**, kesilen doğrulayıcılar gelecekteki görevler için seçilmesini engeller. Bu, yalnızca sağlıklı doğrulayıcılar bloklar önermek üzere seçilmesini sağlayarak zincir direncini artırır ve ağ kesintileri sırasında hizmet kalitesini korur.

**Kaynaklar**: [EIP-8045 teknik şartnamesi](https://eips.ethereum.org/EIPS/eip-8045)

### Çıkışların konsolidasyon kuyruğunu kullanmasına izin verin {#let-exits-use-the-consolidation-queue}

- Yüksek bakiyeli doğrulayıcılar konsolidasyon kuyruğu aracılığıyla ağ daha küçük doğrulayıcılar daha hızlı çıkmasına olanak tanıyan bir güvenlik açığını kapatır. 
- Boş kapasitesi olduğunda düzenli çıkışların bu ikinci kuyruğa taşmasına olanak tanıyarak yüksek hacimli dönemlerde hisseleme çekme sürelerini azaltır.
- Ethereum'un temel güvenlik sınırlarının değiştirilmesini veya ağ zayıflatılmasını önlemek için sıkı güvenlik önlemleri alınır.

[Pectra yükseltmesi,](/roadmap/pectra) Ethereum doğrulayıcılar için maksimum etkin bakiyeyi 32 ETH'den 2.048 ETH'ye çıkardığından, teknik bir boşluk, yüksek bakiyeli doğrulayıcılar konsolidasyon kuyruğu aracılığıyla ağ daha küçük doğrulayıcılar daha hızlı çıkmasına olanak tanıyor.

**Çıkışların konsolidasyon kuyruğunu (veya EIP-8080) kullanmasına izin verin** ifadesi, tüm hisseleme çıkışları için konsolidasyon kuyruğunu demokratikleştirerek herkes için tek ve adil bir sıra oluşturur.  

Bunun bugün nasıl işlediğini açıklayalım:

- Ethereum'un değişim limiti, ağın güvenliğinin asla istikrarsızlaşmamasını sağlamak için doğrulayıcılar hisseli ETH'lerine girme, çıkma veya birleştirme (konsolide etme) oranına uygulanan bir güvenlik sınırıdır.
- Bir doğrulayıcı konsolidasyonu, standart bir doğrulayıcı çıkışından daha fazla hareketli parçaya sahip daha ağır bir eylem olduğundan, bu güvenlik bütçesinin (değişim sınırı) daha büyük bir kısmını tüketir. 
- Özellikle, protokol bir standart çıkışın kesin güvenlik maliyetinin bir konsolidasyon maliyetinin üçte ikisi (2/3) olduğunu belirtir.

Daha adil çıkış kuyrukları, yüksek çıkış talebi dönemlerinde standart çıkışların konsolidasyon kuyruğundan kullanılmayan alanı ödünç almasına olanak tanıyacak ve "3'e 2" takas oranı uygulayacaktır (kullanılmayan her 2 konsolidasyon noktası için ağ güvenli bir şekilde 3 standart çıkışı işleyebilir). Bu 3/2'lik değişim faktörü, konsolidasyon ve çıkış kuyruklarındaki talebi dengeler.

Konsolidasyon kuyruğuna erişimin demokratikleştirilmesi, ağ güvenliğinden ödün vermeden, yüksek talep dönemlerinde kullanıcıların hisselerini çıkış hızını 2,5 kata kadar artıracaktır.

**Kaynaklar**: [EIP-8080 teknik şartnamesi](https://eips.ethereum.org/EIPS/eip-8080)

## Kullanıcı ve geliştirici deneyimini iyileştirin {#improve-user-developer-experience}

Ethereum'un Glamsterdam yükseltmesi, kullanıcı deneyimini iyileştirmeyi, veri keşfedilebilirliğini artırmayı ve senkronizasyon hatalarını önlemek için artan mesaj boyutlarını yönetmeyi amaçlamaktadır. Bu, ağ ölçeklenirken teknik aksaklıkları önlerken zincir üzerinde neler olup bittiğini takip etmeyi kolaylaştırır.

### Dahili işlem gaz maliyetlerini azaltın {#reduce-intrinsic-transaction-gas-costs}

- işlemler için taban ücret düşürerek basit bir yerel ETH ödemesinin genel maliyetini azaltır. 
- Daha küçük transferleri daha uygun maliyetli hale getirerek Ethereum'un rutin bir değişim aracı olarak uygulanabilirliğini artırıyor.

Tüm Ethereum işlemler, işlenmesi ne kadar basit veya karmaşık olursa olsun, bugün sabit bir temel gaz ücreti vardır. **İçsel işlem gaz azaltma (veya EIP-2780)**, mevcut hesaplar arasında standart bir ETH transferini%71'e kadar daha ucuz hale getirmek için bu taban ücret azaltmayı öneriyor. 

işlem ücreti, yalnızca ağ çalıştıran bilgisayarların dijital imzayı doğrulamak ve bakiyeyi güncellemek gibi gerçekten yaptığı temel, esaslı işi yansıtacak şekilde parçalara ayırarak içsel işlem gaz işlerini azaltın. Temel bir ETH ödemesi karmaşık kod çalıştırmadığı veya ek veri taşımadığı için bu öneri, ücretini hafif ayak izine uyacak şekilde azaltacaktır. 

Bu öneri, düşük ücretlerin ağın durumunu bunaltmasını engellemek için yepyeni hesaplar oluşturmaya yönelik bir istisna getiriyor. Bir transfer, ETH'yi boş, var olmayan bir adres gönderirse, ağ bunun için kalıcı yeni bir kayıt oluşturmalıdır. Bu hesap oluşturma için, uzun vadeli depolama yükünü karşılamaya yardımcı olmak amacıyla bir gaz ek ücreti eklenir. 

EIP-2780, mevcut hesaplar arasındaki günlük transferleri daha uygun maliyetli hale getirirken, gerçek durum büyümesini doğru bir şekilde fiyatlandırarak ağ veritabanı şişkinliğine karşı korunmasını sağlamayı amaçlamaktadır.

**Kaynaklar**: [EIP-2780 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-2780)

### Deterministik fabrika ön dağıtımı {#deterministic-factory-predeploy}

- Geliştiricilere, uygulamaları ve akıllı sözleşme cüzdanlarını birden fazla zincirde tam olarak aynı adres dağıtmaları için yerel bir yol sunar.
- Kullanıcıların birden fazla katman 2 (L2) ağında aynı akıllı cüzdan adres sahip olmalarını sağlayarak bilişsel yükü, kafa karışıklığını ve yanlışlıkla fon kaybı riskini azaltır. 
- Geliştiricilerin bu eşitliği sağlamak için şu anda kullandığı geçici çözümlerin yerini alarak çok zincirli cüzdanlar ve uygulamalar oluşturmayı daha kolay ve daha güvenli hale getirir.

Bir kullanıcının bugün birden fazla Ethereum Sanal Makinesi (EVM) uyumlu zincirde hesapları olan bir akıllı sözleşme cüzdan varsa, genellikle farklı ağlarda tamamen farklı bir adres karşılaşır. Bu durum yalnızca kafa karıştırıcı olmakla kalmaz, aynı zamanda fonların yanlışlıkla kaybedilmesine de yol açabilir. 

**Deterministik fabrika ön dağıtımı (veya EIP-7997)**, geliştiricilere merkeziyetsiz uygulamalarını ve akıllı sözleşme cüzdanlarını Ethereum Ana Ağı, katman 2 (L2) ağları ve daha fazlası dahil olmak üzere birden çok EVM zincirinde tam olarak aynı adres dağıtmaları için yerel, yerleşik bir yol sunar. Benimsenirse, kullanıcının katılan her zincirde tam olarak aynı adres sahip olmasına olanak tanıyarak bilişsel yükü ve kullanıcı hatası olasılığını önemli ölçüde azaltacaktır.

Deterministik fabrika ön dağıtımı, her katılımcı EVM uyumlu zincirde aynı konuma (özellikle 0x12 adres ) kalıcı olarak minimal, özel bir fabrika programı yerleştirerek çalışır. Amacı, herhangi bir EVM uyumlu ağ tarafından benimsenen evrensel, standart bir fabrika sözleşmesi sağlamaktır; bir EVM zinciri katıldığı ve bu standardı benimsediği sürece, geliştiriciler akıllı sözleşmelerini o ağ aynı adres dağıtmak için kullanabileceklerdir. 

Bu standardizasyon, geliştiriciler ve daha geniş ekosistem için zincirler arası uygulamalar oluşturmayı ve yönetmeyi basitleştirir. Geliştiricilerin artık yazılımlarını farklı ağlar arasında birbirine bağlamak için özel, zincire özgü kodlar oluşturmasına gerek kalmaz; bunun yerine bu evrensel fabrika, uygulamaları için her yerde tamamen aynı adres oluşturmak için kullanılır. Ayrıca, blok gezginleri, izleme hizmetleri ve cüzdanlar, bu uygulamaları ve hesapları çeşitli zincirler arasında daha kolay tanımlayabilir ve bağlayabilir, böylece tüm Ethereum tabanlı katılımcılar için daha birleşik ve sorunsuz bir çoklu zincir ortamı oluşturulabilir. 

**Kaynaklar**: [EIP-7997 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7997)

### ETH transferleri ve yakımları bir günlük oluşturur {#eth-transfers-and-burns-emit-a-log}

- ETH her aktarıldığında veya yakıldığında otomatik olarak kalıcı bir kayıt (günlük) oluşturur
- Uygulamaların, borsaların ve köprülerin özel izleme araçları olmadan kullanıcı para yatırma işlemlerini güvenilir bir şekilde tespit etmesini sağlayan tarihsel bir kör noktayı düzeltir.

Tokenların (ERC-20'ler) aksine, akıllı sözleşmeler arasındaki normal ETH transferleri net bir makbuz (standart günlük) oluşturmaz, bu da borsaların ve uygulamaların bunları izlemesini zorlaştırır.

ETH transferleri ve yakımları bir log (veya EIP-7708) yayar, bu da sıfır olmayan bir miktarda ETH taşındığında veya yakıldığında ağ standart bir log olayı yaymasını zorunlu kılar.

Bu, cüzdanların, borsaların ve köprü operatörlerinin özel araçlara ihtiyaç duymadan para yatırma işlemlerini ve hareketleri doğru bir şekilde takip etmesini çok daha kolay ve güvenilir hale getirecektir.

**Kaynaklar**: [EIP-7708 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 kısmi blok makbuz listeleri {#eth-70-partial-block-receipt-lists}

Ethereum'un yapabileceği iş miktarını artırdıkça, bu eylemlerin makbuz listeleri (bu işlemler veri kayıtları) o kadar büyüyor ki, ağ düğümlerinin birbirleriyle veri senkronizasyonu yapmaya çalışırken arızalanmasına neden olabilir. 

eth/70 kısmi blok makbuz listeleri (veya EIP-7975), düğümlerin birbirleriyle konuşması için yeni bir yol sunar (eth/70) ve bu büyük listelerin daha küçük, daha yönetilebilir parçalara ayrılmasına olanak tanır. eth/70, ağın iletişim protokolü için bir sayfalama sistemi sunar ve bu sistem, düğümlerin blok makbuz listelerini bölmesine ve verileri daha küçük, daha yönetilebilir parçalar halinde güvenli bir şekilde talep etmesine olanak tanır.

Bu değişiklik, yoğun aktivite dönemlerinde ağ senkronizasyon hatalarını önleyecektir. Nihayetinde, Ethereum'un blok kapasitesini artırmasına ve gelecekte zinciri senkronize eden fiziksel donanımı bunaltmadan blok başına daha fazla işlemler gerçekleştirmesine olanak tanır.

**Kaynaklar**: [EIP-7975 teknik şartnamesi](https://eips.ethereum.org/EIPS/eip-7975)

## İleri okuma {#further-reading}

- [Ethereum yol haritası](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773) 
- [2026 Protokol Öncelikleri Güncellemesi blog duyurusu](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [The Daily Gwei Refuel podcast - Kuantum sonrası Ethereum, Glamsterdam geliyor](https://www.youtube.com/watch?v=qx9sd50uQjQ) 

## Sıkça Sorulan Sorular {#faq}

### Glamsterdam hard çatal sonra ETH nasıl dönüştürülebilir? {#how-can-eth-be-converted-after-the-hardfork}

- **ETH'niz için Eylem Gerekmiyor**: Glamsterdam yükseltmesinin ardından ETH'nizi dönüştürmenize veya yükseltmenize gerek yoktur. hesap bakiyeleriniz aynı kalacak ve şu anda sahip olduğunuz ETH, hard çatal sonra mevcut biçiminde erişilebilir olmaya devam edecektir.
- **Dolandırıcılıklara Dikkat!**<Emoji text="⚠️" /> **ETH'nizi "yükseltmeniz" için size talimat veren herkes sizi dolandırmaya çalışıyor.** Bu yükseltmeyle ilgili yapmanız gereken hiçbir şey yok. Varlıklarınız tamamen etkilenmeden kalacaktır. Unutmayın, bilgili kalmak dolandırıcılıklara karşı en iyi savunmadır.

[Dolandırıcılıkları tanıma ve bunlardan kaçınma hakkında daha fazla bilgi](/security/)

### Glamsterdam yükseltmesi tüm Ethereum düğümlerini ve doğrulayıcılar etkiler mi? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Evet, Glamsterdam yükseltmesi hem [yürütüm istemcileri hem de mutabakat istemcileri](/developers/docs/nodes-and-clients/) için güncellemeler gerektirir. Bu yükseltme, Enshrined Proposer-Builder Separation (ePBS) özelliğini tanıttığı için, düğüm operatörlerinin istemcilerinin, bloklar ağ tarafından oluşturulma, doğrulama ve onaylanma şekillerindeki yeni yöntemleri ele alacak şekilde güncellendiğinden emin olmaları gerekecektir. 

Tüm ana Ethereum istemcileri, yüksek öncelikli olarak işaretlenmiş hard çatal destekleyen sürümleri yayınlayacaktır. Bu sürümlerin ne zaman kullanıma sunulacağını istemci GitHub depolarından, [Discord kanallarından](https://ethstaker.org/support), [EthStaker Discord'dan](https://dsc.gg/ethstaker) veya protokol güncellemeleri için Ethereum bloguna abone olarak takip edebilirsiniz. 

Yükseltme sonrasında Ethereum ağ senkronizasyonu sürdürmek için düğüm operatörlerinin desteklenen bir istemci sürümünü çalıştırdıklarından emin olmaları gerekir. istemci sürümleriyle ilgili bilgilerin zamana duyarlı olduğunu ve kullanıcıların en güncel ayrıntılar için en son güncellemelere başvurması gerektiğini unutmayın.

### hissedar olarak Glamsterdam yükseltmesi için ne yapmam gerekiyor? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Her ağ yükseltmesinde olduğu gibi, istemcilerinizi Glamsterdam desteğiyle işaretlenmiş en son sürümlere güncellediğinizden emin olun. Sürümler hakkında bilgi almak için e-posta listesindeki güncellemeleri ve [EF Blog'daki Protokol Duyurularını](https://blog.ethereum.org/category/protocol) takip edin.

Glamsterdam Mainnet'te etkinleştirilmeden önce kurulumunuzu doğrulamak için test ağlarında bir doğrulayıcı çalıştırabilirsiniz. Test ağı çatalları da e-posta listesinde ve blogda duyurulur.

### Glamsterdam, L1 Ölçeklendirmesi için ne gibi iyileştirmeler içerecek? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Başlıca özellik, ağ işlemler doğrulama gibi ağır bir görevi mutabakat varma görevinden ayıran ePBS'dir (EIP-7732). Bu, veri yayılım penceresini 2 saniyeden yaklaşık 9 saniyeye çıkararak Ethereum'un çok daha yüksek işlem hacmini güvenli bir şekilde yönetme ve katman 2 ağları için daha fazla veri bloğu barındırma yeteneğinin önündeki engelleri kaldırır.

### Glamsterdam, Ethereum (Katman 1) üzerindeki ücretleri düşürecek mi? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Evet, Glamsterdam büyük olasılıkla günlük kullanıcılar için ücretleri düşürecek! İçsel işlem gaz (veya EIP-2780) azaltmak, ETH göndermek için taban ücret düşürerek ETH'yi günlük ödemeler için kullanmayı çok daha ucuz hale getirir.

Ayrıca, uzun vadeli sürdürülebilirlik için Glamsterdam, Blok Düzeyinde Erişim Listeleri (BAL'ler) sunar. Bu, paralel işlemeyi mümkün kılar ve L1'i gelecekte daha yüksek genel gaz limitlerini güvenli bir şekilde yönetmeye hazırlar, bu da kapasite arttıkça işlem başına gaz maliyetlerini muhtemelen azaltacaktır.

### Glamsterdam'dan sonra mevcut akıllı sözleşmelerimde herhangi bir değişiklik olacak mı? {#will-my-smart-contracts-change}

Mevcut sözleşmeler Glamsterdam'dan sonra normal şekilde çalışmaya devam edecektir. Geliştiriciler muhtemelen birkaç yeni araç edinecek ve gaz kullanımlarını gözden geçirmelidir:
- Maksimum sözleşme boyutunu artırma (veya EIP-7954), geliştiricilerin daha büyük uygulamalar dağıtmasına olanak tanıyarak maksimum sözleşme boyutu sınırını yaklaşık 24 KiB'den 32 KiB'ye yükseltir. 
- Deterministik fabrika ön dağıtımı (veya EIP-7997), evrensel, yerleşik bir fabrika sözleşmesi sunar. Geliştiricilerin uygulamalarını ve akıllı sözleşme cüzdanlarını katılan tüm EVM zincirlerinde tam olarak aynı adres dağıtmalarına olanak tanır.
- Uygulamanız ETH transferlerini bulmak için karmaşık izlemeye dayanıyorsa, ETH transferleri ve yakmaları bir günlük (veya EIP-7708) yayar, bu da daha basit ve güvenilir bir muhasebe için günlükleri kullanmaya geçmenizi sağlar.
- Durum oluşturma gaz maliyeti artışı (veya EIP-8037) ve durum erişim gaz maliyeti güncellemesi (veya EIP-8038), yeni hesaplar veya kalıcı depolama oluşturmak dinamik olarak ayarlanan bir ücrete sahip olacağından, belirli sözleşme dağıtım maliyetlerini değiştirecek yeni sürdürülebilirlik modelleri sunar. 

### Glamsterdam, düğüm depolama ve donanım gereksinimlerini nasıl etkileyecek? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Glamsterdam için değerlendirilen birden fazla EIP, eyalet büyümesinin performans açığını adres: 
- Durum oluşturma gaz maliyeti artışı (veya EIP-8037), yıllık 100 GiB'lik bir durum veritabanı büyüme oranını hedeflemek için dinamik bir fiyatlandırma modeli sunarak standart fiziksel donanımın ağ verimli bir şekilde çalıştırmaya devam etmesini sağlar. 
- eth/70 kısmi blok makbuz listeleri (veya EIP-7975), düğümlerin sayfalandırılmış blok makbuzları talep etmesine olanak tanır. Bu, Ethereum ölçeklendikçe çökmeleri ve senkronizasyonları önlemek için veri ağırlıklı blok makbuzu listelerini daha küçük parçalara ayırır.

