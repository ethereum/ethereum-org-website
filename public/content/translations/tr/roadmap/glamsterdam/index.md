---
title: Glamsterdam
description: Glamsterdam protokol yükseltmesi hakkında bilgi edinin
lang: tr
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam, 2026'nın ikinci yarısı için planlanan yaklaşan bir Ethereum yükseltmesidir
</AlertTitle>
<AlertDescription>
Glamsterdam yükseltmesi, Ethereum'un uzun vadeli gelişim hedeflerinde yalnızca tek bir adımdır. [Protokol yol haritası](/roadmap/) ve [önceki yükseltmeler](/ethereum-forks/) hakkında daha fazla bilgi edinin.
</AlertDescription>
</AlertContent>
</Alert>

[Ethereum'un](/) yaklaşan Glamsterdam yükseltmesi, yeni nesil ölçeklendirme için yolu açmak üzere tasarlanmıştır. Glamsterdam, "Amsterdam" (önceki bir Devconnect konumunun adını taşıyan yürütme katmanı yükseltmesi) ve "Gloas" (bir yıldızın adını taşıyan mutabakat katmanı yükseltmesi) kelimelerinin birleşiminden adını almıştır.

[Fusaka](/roadmap/fusaka/) yükseltmesinde kaydedilen ilerlemenin ardından Glamsterdam, ağın işlemleri nasıl işlediğini ve büyüyen veritabanını nasıl yönettiğini yeniden düzenleyerek katman 1'i (L1) ölçeklendirmeye odaklanır ve Ethereum'un blokları nasıl oluşturduğunu ve doğruladığını temelden günceller.

Fusaka temel iyileştirmelere odaklanırken, Glamsterdam farklı ağ katılımcıları arasındaki görev ayrımını protokole dahil ederek ve [durumu](/glossary/#state) yüksek işlem kapasiteli paralelleştirmeye hazırlamak için verileri işlemenin daha verimli yollarını sunarak "L1'i Ölçeklendir" ve "Blob'ları Ölçeklendir" hedeflerini ileriye taşır.

Bu iyileştirmeler, evde [düğüm](/glossary/#node) çalıştıran kişiler için donanım gereksinimlerini yönetilebilir tutarken, Ethereum'un daha fazla aktiviteyi idare ederken hızlı, uygun fiyatlı ve merkeziyetsiz kalmasını sağlar.

<VideoWatch slug="ethereum-evolution-glamsterdam" />

## Glamsterdam için düşünülen iyileştirmeler {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Not: Bu makale şu anda Glamsterdam'a dahil edilmesi düşünülen EIP'lerin bir seçkisini öne çıkarmaktadır. Geliştirici ağlarında (devnet) aktif olarak test edilen ek teklifler arasında EIP-7778, EIP-7843, EIP-7976, EIP-7981 ve EIP-8024 bulunmaktadır. En son durum güncellemeleri için [Forkcast'teki Glamsterdam yükseltmesini](https://forkcast.org/upgrade/glamsterdam) görüntüleyin.

Glamsterdam için değerlendirilen ancak henüz bu sayfaya eklenmemiş bir EIP eklemek istiyorsanız, [ethereum.org'a nasıl katkıda bulunacağınızı buradan öğrenin](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Glamsterdam yükseltmesi üç ana hedefe odaklanır:

- İşlemleri hızlandırma (paralelleştirme): Ağın veri bağımlılıklarını kaydetme şeklini yeniden düzenleyerek, yavaş ve tek tek bir sıra yerine birçok işlemi aynı anda güvenli bir şekilde işleyebilmesini sağlamak.
- Kapasiteyi genişletme: Blok oluşturma ve doğrulamanın ağır yükünü bölerek, ağa yavaşlamadan daha büyük miktarda veriyi yayması için daha fazla zaman tanımak.
- Veritabanı şişkinliğini önleme (sürdürülebilirlik): Ağ ücretlerini, yeni verileri depolamanın uzun vadeli donanım maliyetini doğru bir şekilde yansıtacak şekilde ayarlamak, donanım performansının düşmesini önlerken gelecekteki gaz limiti artışlarının önünü açmak.

Kısacası Glamsterdam, ağ kapasitesini artırırken sürdürülebilir kalmasını ve performansın yüksek kalmasını sağlamak için yapısal değişiklikler getirecektir.

## L1'i ölçeklendirme ve paralel işleme {#scale-l1}

Anlamlı bir katman 1 (L1) ölçeklendirmesi, protokol dışı güven varsayımlarından ve seri yürütme kısıtlamalarından uzaklaşmayı gerektirir. Glamsterdam, belirli blok oluşturma görevlerinin ayrımını protokole dahil ederek ve ağın paralel işlemeye hazırlanmasını sağlayan yeni veri yapıları sunarak bu sorunu çözer.

### Öne çıkan teklif: Protokole Dahil Edilmiş Teklifçi-Oluşturucu Ayrımı (ePBS) {#epbs}

- Protokol dışı güven varsayımlarını ve üçüncü taraf aktarıcılara (relay) olan bağımlılığı ortadan kaldırır
- Genişletilmiş yayılma pencereleri aracılığıyla çok daha büyük yürütme yüklerine izin vererek L1 ölçeklendirmesini destekler
- Güven gerektirmeyen oluşturucu ödemelerini doğrudan protokole dahil eder
- Güven gerektirmeyen izlemeyi sağlamak için staking havuzları için mimari güncellemeler gerektirir, ancak genel staking kullanıcı deneyimi, iyileştirilmiş bir oluşturucu seçim süreciyle geliştirilir

Şu anda blok teklif etme ve oluşturma süreci, blok teklif ediciler ve blok oluşturucular arasında bir devir teslim içerir. Teklif ediciler ve oluşturucular arasındaki ilişki çekirdek Ethereum protokolünün bir parçası değildir, bu nedenle güvenilir üçüncü taraf ara yazılımlara, yazılımlara (aktarıcılar) ve varlıklar arasındaki protokol dışı güvene dayanır.

Teklif ediciler ve oluşturucular arasındaki protokol dışı ilişki, blok doğrulama sırasında [doğrulayıcıları](/glossary/#validator) dar bir 2 saniyelik pencerede işlem yayınlama ve yürütme konusunda acele etmeye zorlayan bir "sıcak yol" (hot path) yaratır ve ağın ne kadar veriyi işleyebileceğini sınırlar.

**Protokole Dahil Edilmiş Teklifçi-Oluşturucu Ayrımı (ePBS veya EIP-7732)**, teklif edicinin (mutabakat bloğunu seçen) işini oluşturucudan (yürütme yükünü bir araya getiren) resmi olarak ayırır ve bu devir teslimi doğrudan protokole dahil eder. 

Bir blok yükünün ödeme karşılığında güven gerektirmeyen değişimini doğrudan protokole inşa etmek, üçüncü taraf ara yazılımlara (MEV-Boost gibi) olan ihtiyacı ortadan kaldırır. Ancak, oluşturucular ve teklif ediciler, henüz çekirdek protokolün bir parçası olmayan karmaşık özellikler için protokol dışı aktarıcıları veya ara yazılımları kullanmayı seçebilirler. 

"Sıcak yol" darboğazını ele almak için ePBS ayrıca Yük Zamanındalık Komitesi'ni (PTC) ve ikili son tarih mantığını sunarak, doğrulayıcıların işlem kapasitesini en üst düzeye çıkarmak için mutabakat bloğunu ve yürütme yükünün zamanındalığını ayrı ayrı onaylamasına olanak tanır.

<VideoWatch slug="proposer-builder-separation" />

Teklif edici ve oluşturucu rollerini protokol düzeyinde ayırmak, yayılma penceresini (veya verileri ağa yaymak için mevcut olan süreyi) 2 saniyeden yaklaşık 9 saniyeye çıkarır.

Protokol dışı ara yazılımları ve aktarıcıları protokol içi mekaniklerle değiştirerek ePBS, güven bağımlılıklarını azaltır ve Ethereum'un ağı zorlamadan çok daha büyük miktarda veriyi ([katman 2'ler](/glossary/#layer-2) için daha fazla blob gibi) güvenli bir şekilde işlemesine olanak tanır.

**Kaynaklar**: [EIP-7732 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7732)

### Öne çıkan teklif: Blok Düzeyinde Erişim Listeleri (BAL'ler) {#bals}

- Tüm işlem bağımlılıklarının önceden bir haritasını sunarak sıralı işleme darboğazlarını ortadan kaldırır ve doğrulayıcıların işlemleri tek tek yerine paralel olarak işlemesine zemin hazırlar
- Düğümlerin her işlemi yeniden oynatmaya gerek kalmadan (yürütmesiz eşzamanlama) nihai sonuçları okuyarak kayıtlarını güncellemesine olanak tanır, bu da bir düğümü ağ ile eşzamanlamayı çok daha hızlı hale getirir
- Tahmin yürütmeyi ortadan kaldırarak doğrulayıcıların gerekli tüm verileri adım adım keşfetmek yerine tek seferde önceden yüklemesine olanak tanır, bu da doğrulamayı çok daha hızlı hale getirir

Günümüzün Ethereum'u tek şeritli bir yol gibidir; ağ, bir işlem çalıştırılana kadar bir işlemin hangi verilere ihtiyaç duyacağını veya neleri değiştireceğini (bir işlemin hangi hesaplara dokunacağı gibi) bilmediğinden, doğrulayıcılar işlemleri katı, sıralı bir çizgide tek tek işlemelidir. Bu bağımlılıkları bilmeden işlemleri aynı anda işlemeye çalışırlarsa, iki işlem yanlışlıkla aynı veriyi aynı anda değiştirmeye çalışabilir ve bu da hatalara neden olabilir.

**Blok Düzeyinde Erişim Listeleri (BAL'ler veya EIP-7928)**, iş başlamadan önce veritabanının hangi bölümlerine erişileceğini detaylandırarak ağ için bir harita işlevi görür. Yürütme katmanı, işlemlerin dokunacağı her hesap değişikliği ve bu değişikliklerin nihai sonuçları (tüm durum erişimleri ve yürütme sonrası değerler) dahil olmak üzere tam Blok Erişim Listesini depolar. Blokları hafif tutmak için blok başlığı, bu listenin benzersiz bir dijital parmak izini (hash kaydı) içeren yeni bir alan içerir.

Hangi işlemlerin çakışmadığına dair anında görünürlük sağladıkları için BAL'ler, düğümlerin paralel disk okumaları gerçekleştirmesine ve birçok işlem için bilgileri aynı anda getirmesine olanak tanır. Ağ, birbiriyle ilişkisiz işlemleri güvenli bir şekilde gruplayabilir ve bunları paralel olarak işleyebilir.

BAL, işlemlerin nihai sonuçlarını (yürütme sonrası değerler) içerdiğinden, ağın düğümlerinin ağın mevcut durumuyla eşzamanlanması gerektiğinde, kayıtlarını güncellemek için bu nihai sonuçları kopyalayabilirler. Doğrulayıcıların ne olduğunu bilmek için artık tüm karmaşık işlemleri sıfırdan yeniden oynatması gerekmez, bu da yeni düğümlerin ağa katılmasını daha hızlı ve daha kolay hale getirir.

BAL'lerin sağladığı paralel disk okumaları, Ethereum'un aynı anda birçok işlemi işleyebileceği ve ağın hızını önemli ölçüde artırabileceği bir geleceğe doğru önemli bir adım olacaktır.

#### eth/71 Blok Erişim Listesi Değişimi {#bale}

Blok Erişim Listesi Değişimi (eth/71 veya EIP-8159), blok düzeyinde erişim listelerinin doğrudan ağ oluşturma tamamlayıcısıdır. BAL'ler paralel yürütmenin kilidini açarken, eth/71 eşler arası protokolü yükselterek düğümlerin bu listeleri ağ üzerinden fiilen paylaşmasına olanak tanır. Artık tüm yürütme katmanı istemcileri için gerekli olan blok erişim listesi değişimi, daha hızlı eşzamanlama sağlayacak ve düğümlerin yürütmesiz durum güncellemeleri gerçekleştirmesine olanak tanıyacaktır.

**Kaynaklar**:

- [EIP-7928 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8159 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-8159)

## Ağ sürdürülebilirliği {#network-sustainability}

Ethereum ağı daha hızlı büyüdükçe, onu kullanma maliyetinin Ethereum'u çalıştıran donanımdaki aşınma ve yıpranmayla eşleştiğinden emin olmak önemlidir. Ağın güvenli bir şekilde ölçeklenmesi ve daha fazla işlem yapabilmesi için genel kapasite sınırlarını artırması gerekir.

### Durum oluşturma gaz maliyeti artışı {#state-creation-gas-cost-increase}

- Yeni hesaplar veya akıllı sözleşmeler oluşturma ücretlerinin, Ethereum'un veritabanına yükledikleri uzun vadeli yükü doğru bir şekilde yansıtmasını sağlar
- Yılda 120 GiB'lik güvenli ve öngörülebilir bir büyüme oranını hedefleyen sabit bir **durum baytı başına maliyet (CPSB)** belirleyerek standart fiziksel donanımın ağı çalıştırmaya devam edebilmesini sağlar
- Bu belirli ücretlerin muhasebesini yeni bir havuza ayırarak eski işlem sınırlarını kaldırır ve geliştiricilerin daha büyük, daha karmaşık uygulamalar dağıtmasına olanak tanır

Yeni hesaplar, token'lar ve [akıllı sözleşmeler](/glossary/#smart-contract) eklemek, ağı çalıştıran her bilgisayarın süresiz olarak depolaması gereken kalıcı veriler ("durum" olarak bilinir) oluşturur. Bu verileri eklemek veya okumak için mevcut ücretler tutarsızdır ve ağın donanımına yükledikleri gerçek, uzun vadeli depolama yükünü tam olarak yansıtmaz.

Ethereum'da durum oluşturan yeni hesaplar oluşturmak veya büyük akıllı sözleşmeler dağıtmak gibi bazı eylemler, ağın düğümlerinde kapladıkları kalıcı depolama alanına kıyasla nispeten düşük maliyetli olmuştur; örneğin, sözleşme dağıtımı bayt başına depolama yuvaları oluşturmaktan önemli ölçüde daha ucuzdur.

Bir ayarlama yapılmazsa, ağ Glamsterdam'ın sağladığı 200M gaz limiti tabanına doğru ölçeklendikçe (geliştiriciler şu anda doğru durum fiyatlandırmasını elde etmek için 150M referans blok gaz limitinde test yapıyor) Ethereum'un durum büyümesi sürdürülemez hale gelecektir.

**Durum oluşturma gaz maliyeti artışı (veya EIP-8037)**, maliyetleri oluşturulan verilerin gerçek boyutuna bağlayarak uyumlu hale getirir ve ücretleri bir işlemin oluşturduğu veya eriştiği kalıcı veri miktarıyla orantılı olacak şekilde günceller.

EIP-8037 ayrıca bu maliyetleri daha öngörülebilir bir şekilde yönetmek için bir havuz modeli sunar; durum gazı ücretleri önce `state_gas_reservoir`'den çekilir ve `GAS` işlem kodu yalnızca `gas_left` döndürerek yürütme çerçevelerinin mevcut gazı yanlış hesaplamasını önler. Bunu desteklemek için, temel arka plan görevlerine doğrudan bu özel rezerve giden ekstra bir yakıt izni verilir ve kritik ağ operasyonlarının yalnızca kalıcı verileri depolamak daha fazla kaynak gerektirdiği için başarısız olmaması sağlanır.

EIP-8037'den önce, hem hesaplama işi (aktif işleme) hem de kalıcı veri depolama (akıllı sözleşmeyi ağın veritabanına kaydetme) aynı gaz limitini paylaşıyordu. Havuz modeli muhasebeyi ikiye ayırır: işlemin gerçek hesaplama işi (işleme) için gaz limiti ve uzun vadeli veri depolama (durum gazı) için gaz limiti. İkisini ayırmak, bir uygulamanın verilerinin salt boyutunun gaz limitini doldurmasını önlemeye yardımcı olur; geliştiriciler veri depolama havuzunu doldurmak için yeterli fon sağladığı sürece, çok daha büyük ve daha karmaşık akıllı sözleşmeler dağıtabilirler.

Veri depolamayı daha doğru ve öngörülebilir bir şekilde fiyatlandırmak, Ethereum'un veritabanını şişirmeden hızını ve kapasitesini güvenli bir şekilde artırmasına yardımcı olacaktır. Bu sürdürülebilirlik, düğüm operatörlerinin yıllarca (nispeten) uygun fiyatlı donanımlar kullanmaya devam etmesine olanak tanıyacak ve ağın merkeziyetsizliğini korumak için evde staking'i erişilebilir tutacaktır.

**Kaynaklar**: [EIP-8037 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-8037)

### Durum erişimi gaz maliyeti güncellemesi {#state-access-gas-cost-update}

- Uygulamalar Ethereum'da kalıcı olarak depolanan bilgileri okuduğunda veya güncellediğinde (durum erişimi işlem kodları), bu komutların gerektirdiği hesaplama işiyle doğru bir şekilde eşleşmesi için gaz maliyetlerini artırır
- Yapay olarak ucuz veri okuma işlemlerinden yararlanan hizmet reddi (denial-of-service) saldırılarını önleyerek ağ dayanıklılığını güçlendirir

Ethereum'un durumu büyüdükçe, eski verileri arama ve okuma eylemi ("durum erişimi") düğümlerin işlemesi için daha ağır ve daha yavaş hale geldi. Bilgi aramak (hesaplama gücü açısından) artık biraz daha pahalı olsa da, bu eylemlerin ücretleri aynı kaldı.

Sonuç olarak, bazı belirli komutlar şu anda bir düğümü yapmaya zorladıkları işe göre düşük fiyatlandırılmaktadır. Örneğin `EXTCODESIZE` ve `EXTCODECOPY` düşük fiyatlandırılmıştır, çünkü iki ayrı veritabanı okuması gerektirirler: biri hesap nesnesi için, ikincisi ise gerçek kod boyutu veya baytkod için.

**Durum erişimi gaz maliyeti güncellemesi (veya EIP-8038)**, hesap ve sözleşme verilerini aramak gibi durum erişimi işlem kodları için gaz sabitlerini modern donanım performansı ve durum boyutuyla uyumlu olacak şekilde artırır.

Durum erişiminin maliyetini uyumlu hale getirmek, Ethereum'u daha dayanıklı hale getirmeye de yardımcı olur. Bu ağır veri okuma eylemleri yapay olarak ucuz olduğundan, kötü niyetli bir saldırgan ağın ücret sınırına ulaşmadan önce tek bir blokta binlerce karmaşık veri isteğiyle ağı spam'leyebilir ve potansiyel olarak ağın durmasına veya çökmesine (hizmet reddi saldırısı) neden olabilir. Kötü niyet olmasa bile, ağ verilerini okumak çok ucuzsa geliştiriciler verimli uygulamalar oluşturmaya ekonomik olarak teşvik edilmezler.

Durum erişimi eylemlerini daha doğru fiyatlandırarak Ethereum, kazara veya kasıtlı yavaşlamalara karşı daha dayanıklı olabilirken, ağ maliyetlerini donanım yüküyle uyumlu hale getirmek gelecekteki gaz limiti artışları için daha sürdürülebilir bir temel sağlar.

**Kaynaklar**: [EIP-8038 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-8038)

## Ağ dayanıklılığı {#network-resilience}

Doğrulayıcı görevlerinde ve çıkış süreçlerinde yapılan iyileştirmeler, kitlesel kesinti (slashing) olayları sırasında ağ kararlılığını sağlar ve likiditeyi demokratikleştirir. Bu iyileştirmeler ağı daha istikrarlı hale getirir ve büyük veya küçük tüm katılımcılara adil davranılmasını sağlar.

### Kesintiye uğramış doğrulayıcıları teklif etmekten hariç tutma {#exclude-slashed-validators}

- Cezalandırılmış (kesintiye uğramış) doğrulayıcıların gelecekteki blokları teklif etmek üzere seçilmesini durdurarak, garantili kaçırılan slotları ortadan kaldırır
- Ethereum'un sorunsuz ve güvenilir bir şekilde çalışmasını sağlayarak, kitlesel bir kesinti olayı durumunda ciddi duraksamaları önler

Şu anda, bir doğrulayıcı kesintiye uğrasa (kuralları çiğnediği veya beklendiği gibi çalışmadığı için cezalandırılsa) bile, sistem gelecekteki teklif edici öngörülerini oluşturduğunda onları yakın gelecekte bir bloğa liderlik etmeleri için seçebilir.

Kesintiye uğramış teklif edicilerden gelen bloklar otomatik olarak geçersiz sayılarak reddedildiğinden, bu durum ağın slotları kaçırmasına neden olur ve kitlesel kesinti olayları sırasında ağın kurtarılmasını geciktirir.

**Kesintiye uğramış doğrulayıcıları teklif etmekten hariç tutma (veya EIP-8045)**, kesintiye uğramış doğrulayıcıların gelecekteki görevler için seçilmesini basitçe filtreler. Bu, yalnızca sağlıklı doğrulayıcıların blok teklif etmek üzere seçilmesini sağlayarak zincir dayanıklılığını artırır ve ağ kesintileri sırasında hizmet kalitesini korur.

**Kaynaklar**: [EIP-8045 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-8045)

### Çıkışların konsolidasyon kuyruğunu kullanmasına izin verme {#let-exits-use-the-consolidation-queue}

- Yüksek bakiyeli doğrulayıcıların konsolidasyon kuyruğu aracılığıyla ağdan daha küçük doğrulayıcılara göre daha hızlı çıkmasına olanak tanıyan bir boşluğu kapatır
- Düzenli çıkışların boş kapasitesi olduğunda bu ikinci kuyruğa taşmasına izin vererek, yüksek hacimli dönemlerde staking çekim sürelerini azaltır
- Ethereum'un temel güvenlik sınırlarını değiştirmekten veya ağı zayıflatmaktan kaçınmak için sıkı güvenliği korur

[Pectra yükseltmesi](/roadmap/pectra) Ethereum doğrulayıcıları için maksimum efektif bakiyeyi 32 ETH'den 2.048 ETH'ye çıkardığından beri, teknik bir boşluk yüksek bakiyeli doğrulayıcıların konsolidasyon kuyruğu aracılığıyla ağdan daha küçük doğrulayıcılara göre daha hızlı çıkmasına olanak tanır.

**Çıkışların konsolidasyon kuyruğunu kullanmasına izin verme (veya EIP-8080)**, konsolidasyon kuyruğunu tüm staking çıkışları için demokratikleştirerek herkes için tek ve adil bir sıra oluşturur.

Bunun bugün nasıl çalıştığını açıklamak gerekirse:

- Ethereum'un dalgalanma limiti, ağın güvenliğinin asla istikrarsızlaşmamasını sağlamak için doğrulayıcıların stake ettikleri ETH'leri ile girebilecekleri, çıkabilecekleri veya birleştirebilecekleri (konsolide edebilecekleri) oran üzerindeki bir güvenlik sınırıdır
- Bir doğrulayıcı konsolidasyonu, standart bir doğrulayıcı çıkışından daha fazla hareketli parçaya sahip daha ağır bir eylem olduğundan, bu güvenlik bütçesinin (dalgalanma limiti) daha büyük bir bölümünü tüketir
- Spesifik olarak protokol, bir standart çıkışın tam güvenlik maliyetinin bir konsolidasyon maliyetinin üçte ikisi (2/3) olduğunu dikte eder

Daha adil çıkış kuyrukları, standart çıkışların yüksek çıkış talebi dönemlerinde konsolidasyon kuyruğundan kullanılmayan alanı ödünç almasına olanak tanıyacak ve "2'ye 3" değişim oranı uygulayacaktır (kullanılmayan her 2 konsolidasyon noktası için ağ 3 standart çıkışı güvenli bir şekilde işleyebilir). Bu 3/2 dalgalanma faktörü, konsolidasyon ve çıkış kuyrukları arasındaki talebi dengeler.

Konsolidasyon kuyruğuna erişimi demokratikleştirmek, kullanıcıların yüksek talep dönemlerinde stake'lerinden çıkma hızını ağ güvenliğinden ödün vermeden 2,5 kata kadar artıracaktır.

**Kaynaklar**: [EIP-8080 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-8080)

## Kullanıcı ve geliştirici deneyimini iyileştirme {#improve-user-developer-experience}

Ethereum'un Glamsterdam yükseltmesi, kullanıcı deneyimini iyileştirmeyi, veri keşfedilebilirliğini artırmayı ve eşzamanlama hatalarını önlemek için artan mesaj boyutlarını idare etmeyi amaçlamaktadır. Bu, ağ ölçeklendikçe teknik aksaklıkları önlerken zincir içi neler olup bittiğini izlemeyi kolaylaştırır.

### İçsel işlem gaz maliyetlerini azaltma {#reduce-intrinsic-transaction-gas-costs}

- İşlemler için taban ücreti düşürerek basit bir yerel ETH ödemesinin genel maliyetini azaltır
- Daha küçük transferleri daha uygun fiyatlı hale getirerek Ethereum'un rutin bir değişim aracı olarak uygulanabilirliğini artırır

Bugün tüm Ethereum işlemleri, işlenmesinin ne kadar basit veya karmaşık olduğuna bakılmaksızın sabit bir taban gaz ücretine sahiptir. **İçsel işlem gazını azaltma (veya EIP-2780)**, mevcut hesaplar arasındaki standart bir ETH transferini **%71'e kadar daha ucuz** hale getirmek için bu taban ücreti düşürmeyi teklif eder.

İçsel işlem gazını azaltma, işlem ücretini yalnızca ağı çalıştıran bilgisayarların dijital imza doğrulamak ve bakiye güncellemek gibi fiilen yaptığı temel, zorunlu işi yansıtacak şekilde parçalara ayırarak çalışır. Temel bir ETH ödemesi karmaşık kod yürütmediğinden veya ekstra veri taşımadığından, bu teklif ücretini hafif ayak iziyle eşleşecek şekilde düşürecektir.

Teklif, düşük ücretlerin ağın durumunu bunaltmasını önlemek için yepyeni hesaplar oluşturmaya yönelik bir istisna getirir. Bir transfer boş, var olmayan bir adrese ETH gönderirse, ağ bunun için kalıcı yeni bir kayıt oluşturmalıdır. Uzun vadeli depolama yükünü karşılamaya yardımcı olmak için bu hesap oluşturma işlemine bir gaz ek ücreti eklenir.

EIP-2780, mevcut hesaplar arasındaki günlük transferleri daha uygun fiyatlı hale getirmeyi amaçlarken, gerçek durum büyümesini doğru bir şekilde fiyatlandırarak ağın veritabanı şişkinliğine karşı hala korunmasını sağlar.

**Kaynaklar**: [EIP-2780 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-2780)

### Deterministik Fabrika Ön Dağıtımı {#deterministic-factory-predeploy}

- Geliştiricilere uygulamaları ve akıllı sözleşme cüzdanlarını birden fazla zincirde tam olarak aynı adrese dağıtmak için yerel bir yol sunar
- Kullanıcıların birden fazla katman 2 (L2) ağında aynı akıllı cüzdan adresine sahip olmalarını sağlayarak bilişsel yükü azaltır, kafa karışıklığını azaltır ve fonların yanlışlıkla kaybedilmesi riskini azaltır
- Geliştiricilerin şu anda bu eşitliği sağlamak için kullandıkları geçici çözümlerin yerini alarak çok zincirli cüzdanlar ve uygulamalar oluşturmayı daha kolay ve daha güvenli hale getirir

Bugün bir kullanıcının birden fazla Ethereum Sanal Makinesi (EVM) uyumlu zincirde hesapları olan bir akıllı sözleşme cüzdanı varsa, genellikle farklı ağlarda tamamen farklı bir adresle karşılaşırlar. Bu sadece kafa karıştırıcı olmakla kalmaz, aynı zamanda fonların yanlışlıkla kaybedilmesine de yol açabilir.

**Deterministik Fabrika Ön Dağıtımı (veya EIP-7997)**, geliştiricilere merkeziyetsiz uygulamalarını ve akıllı sözleşme cüzdanlarını Ethereum Ana Ağı, katman 2 (L2) ağları ve daha fazlası dahil olmak üzere birden fazla EVM zincirinde tam olarak aynı adrese dağıtmaları için yerel, yerleşik bir yol sunar. Kabul edilirse, kullanıcının katılan her zincirde tam olarak aynı adrese sahip olmasına olanak tanıyacak, bilişsel yükü ve kullanıcı hatası potansiyelini önemli ölçüde azaltacaktır.

Deterministik Fabrika Ön Dağıtımı, katılan her EVM uyumlu zincirde aynı konuma (özellikle 0x12 adresine) kalıcı olarak minimal, özel bir fabrika programı yerleştirerek çalışır. Amacı, herhangi bir EVM uyumlu ağ tarafından benimsenebilecek evrensel, standart bir fabrika sözleşmesi sağlamaktır; bir EVM zinciri katıldığı ve bu standardı benimsediği sürece, geliştiriciler bunu akıllı sözleşmelerini o ağda tam olarak aynı adrese dağıtmak için kullanabileceklerdir.

Bu standardizasyon, geliştiriciler ve daha geniş ekosistem için zincirler arası uygulamalar oluşturmayı ve yönetmeyi basitleştirir. Geliştiricilerin artık yazılımlarını farklı ağlarda birbirine bağlamak için özel, zincire özgü kodlar oluşturması gerekmez, bunun yerine uygulamaları için her yerde tam olarak aynı adresi oluşturmak üzere bu evrensel fabrikayı kullanırlar. Buna ek olarak, blok gezginleri, izleme hizmetleri ve cüzdanlar bu uygulamaları ve hesapları çeşitli zincirlerde daha kolay tanımlayabilir ve bağlayabilir, böylece tüm Ethereum tabanlı katılımcılar için daha birleşik ve sorunsuz bir çok zincirli ortam yaratabilir.

**Kaynaklar**: [EIP-7997 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7997)

### ETH transferleri ve yakımları bir günlük yayar {#eth-transfers-and-burns-emit-a-log}

- ETH her transfer edildiğinde veya yakıldığında otomatik olarak kalıcı bir kayıt (günlük) oluşturur
- Uygulamaların, borsaların ve köprülerin geçici izleme araçları olmadan kullanıcı para yatırma işlemlerini güvenilir bir şekilde tespit etmesine olanak tanıyan tarihsel bir kör noktayı düzeltir

Token'ların (ERC-20'ler) aksine, akıllı sözleşmeler arasındaki düzenli ETH transferleri net bir makbuz (standart günlük) yaymaz, bu da borsaların ve uygulamaların bunları izlemesini zorlaştırır.

ETH transferleri ve yakımları bir günlük yayar (veya EIP-7708), sıfır olmayan miktarda ETH her taşındığında veya yakıldığında ağın standart bir günlük olayı yaymasını zorunlu kılar.

Bu, cüzdanların, borsaların ve köprü operatörlerinin özel araçlar olmadan para yatırma işlemlerini ve hareketleri doğru bir şekilde izlemesini çok daha kolay ve güvenilir hale getirecektir.

**Kaynaklar**: [EIP-7708 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 kısmi blok makbuz listeleri {#eth-70-partial-block-receipt-lists}

Ethereum'un yapabileceği iş miktarını artırdıkça, bu eylemlerin makbuz listeleri (bu işlemlerin veri kayıtları) o kadar büyüyor ki, verileri birbirleriyle eşzamanlamaya çalışırken ağın düğümlerinin potansiyel olarak başarısız olmasına neden olabilirler.

Artık tüm yürütme katmanı istemcileri için bir gereklilik olan eth/70 kısmi blok makbuz listeleri (veya EIP-7975), düğümlerin birbirleriyle konuşması için (eth/70) bu büyük listelerin daha küçük, daha yönetilebilir parçalara bölünmesine olanak tanıyan yeni bir yol sunar. eth/70, ağın iletişim protokolü için düğümlerin blok makbuz listelerini parçalamasına ve verileri daha küçük, daha yönetilebilir parçalar halinde güvenli bir şekilde talep etmesine olanak tanıyan bir sayfalama sistemi sunar.

Bu değişiklik, yoğun aktivite dönemlerinde ağ eşzamanlama hatalarını önleyecektir. Nihayetinde, Ethereum'un blok kapasitesini artırmasının ve gelecekte zinciri eşzamanlayan fiziksel donanımı bunaltmadan blok başına daha fazla işlem yapmasının yolunu açar.

**Kaynaklar**: [EIP-7975 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7975)

## Daha fazla okuma {#further-reading}

- [Ethereum yol haritası](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773)
- [2026 için Protokol Öncelikleri Güncellemesi blog duyurusu](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [The Daily Gwei Refuel podcast'i - Kuantum sonrası Ethereum, Glamsterdam geliyor](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## SSS {#faq}

### Glamsterdam sert çatallanmasından sonra ETH nasıl dönüştürülebilir? {#how-can-eth-be-converted-after-the-hardfork}

- **ETH'niz İçin Hiçbir İşlem Gerekmez**: Glamsterdam yükseltmesinin ardından ETH'nizi dönüştürmenize veya yükseltmenize gerek yoktur. Hesap bakiyeleriniz aynı kalacak ve şu anda elinizde bulunan ETH, sert çatallanmadan sonra mevcut haliyle erişilebilir kalacaktır.
- **Dolandırıcılıklara karşı dikkatli olun!** <Emoji text="⚠️" /> **size ETH'nizi "yükseltmenizi" söyleyen herkes sizi dolandırmaya çalışıyordur.** Bu yükseltmeyle ilgili yapmanız gereken hiçbir şey yoktur. Varlıklarınız tamamen etkilenmeden kalacaktır. Unutmayın, bilgili kalmak dolandırıcılıklara karşı en iyi savunmadır.

[Dolandırıcılıkları tanıma ve bunlardan kaçınma hakkında daha fazla bilgi](/security/)

### Glamsterdam yükseltmesi tüm Ethereum düğümlerini ve doğrulayıcılarını etkiler mi? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Evet, Glamsterdam yükseltmesi hem [yürütme istemcilerinde hem de mutabakat istemcilerinde](/developers/docs/nodes-and-clients/) güncellemeler gerektirir. Bu yükseltme Protokole Dahil Edilmiş Teklifçi-Oluşturucu Ayrımını (ePBS) sunduğundan, düğüm operatörlerinin istemcilerinin blokların ağ tarafından oluşturulma, doğrulanma ve onaylanma şeklindeki yeni yolları idare edecek şekilde güncellendiğinden emin olmaları gerekecektir.

Tüm ana Ethereum istemcileri, yüksek öncelikli olarak işaretlenmiş sert çatallanmayı destekleyen sürümler yayınlayacaktır. Bu sürümlerin ne zaman kullanıma sunulacağını istemci GitHub depolarından, [Discord kanallarından](https://ethstaker.org/support), [EthStaker Discord'undan](https://dsc.gg/ethstaker) veya protokol güncellemeleri için Ethereum bloguna abone olarak takip edebilirsiniz.

Yükseltme sonrası Ethereum ağıyla eşzamanlamayı sürdürmek için düğüm operatörleri desteklenen bir istemci sürümü çalıştırdıklarından emin olmalıdır. İstemci sürümleriyle ilgili bilgilerin zamana duyarlı olduğunu ve kullanıcıların en güncel ayrıntılar için en son güncellemelere başvurmaları gerektiğini unutmayın.

### Bir staker olarak Glamsterdam yükseltmesi için ne yapmam gerekiyor? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Her ağ yükseltmesinde olduğu gibi, istemcilerinizi Glamsterdam desteğiyle işaretlenmiş en son sürümlere güncellediğinizden emin olun. Sürümler hakkında bilgi almak için posta listesindeki güncellemeleri ve [EF Blogundaki Protokol Duyurularını](https://blog.ethereum.org/category/protocol) takip edin.

Glamsterdam Ana Ağda etkinleştirilmeden önce kurulumunuzu doğrulamak için test ağlarında bir doğrulayıcı çalıştırabilirsiniz. Test ağı çatallanmaları da posta listesinde ve blogda duyurulur.

### Glamsterdam, L1 ölçeklendirmesi için hangi iyileştirmeleri içerecek? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Öne çıkan özellik, ağ işlemlerini doğrulamanın ağır görevini mutabakata varma görevinden ayıran ePBS'dir (EIP-7732). Bu, veri yayılma penceresini 2 saniyeden yaklaşık 9 saniyeye çıkararak Ethereum'un çok daha yüksek işlem kapasitesini güvenli bir şekilde idare etme ve katman 2 ağları için daha fazla veri blob'unu barındırma yeteneğinin önünü açar.

### Glamsterdam Ethereum'daki (katman 1) ücretleri düşürecek mi? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Evet, Glamsterdam büyük olasılıkla günlük kullanıcılar için ücretleri düşürecektir! İçsel işlem gazını azaltma (veya EIP-2780), ETH göndermek için taban ücreti düşürerek ETH'yi günlük ödemeler için kullanmayı çok daha ucuz hale getirir.

Buna ek olarak, uzun vadeli sürdürülebilirlik için Glamsterdam, Blok Düzeyinde Erişim Listeleri (BAL'ler) sunar. Bu, paralel işlemeyi etkinleştirir ve L1'i gelecekte daha yüksek genel gaz limitlerini güvenli bir şekilde idare etmeye hazırlar, bu da kapasite büyüdükçe işlem başına gaz maliyetlerini muhtemelen azaltacaktır.

### Glamsterdam sonrasında mevcut akıllı sözleşmelerimde herhangi bir değişiklik olacak mı? {#will-my-smart-contracts-change}

Mevcut sözleşmeler Glamsterdam'dan sonra normal şekilde çalışmaya devam edecektir. Geliştiriciler muhtemelen birkaç yeni araç edinecek ve gaz kullanımlarını gözden geçirmelidir:

- Maksimum sözleşme boyutunu artırma (veya EIP-7954), geliştiricilerin daha büyük uygulamalar dağıtmasına olanak tanıyarak maksimum sözleşme boyutu sınırını yaklaşık 24KiB'den 32KiB'ye çıkarır.
- Deterministik fabrika ön dağıtımı (veya EIP-7997), evrensel, yerleşik bir fabrika sözleşmesi sunar. Geliştiricilerin uygulamalarını ve akıllı sözleşme cüzdanlarını katılan tüm EVM zincirlerinde tam olarak aynı adrese dağıtmalarına olanak tanır.
- Uygulamanız ETH transferlerini bulmak için karmaşık izlemeye dayanıyorsa, ETH transferleri ve yakımları bir günlük yayar (veya EIP-7708), daha basit ve güvenilir muhasebe için günlükleri kullanmaya geçmenize olanak tanır.
- Durum oluşturma gaz maliyeti artışı (veya EIP-8037) ve durum erişimi gaz maliyeti güncellemesi (veya EIP-8038), yeni hesaplar veya kalıcı depolama oluşturmak, oluşturulan verilerin boyutuna bağlı olarak yeni bir standartlaştırılmış sabit ücrete sahip olacağından, belirli sözleşme dağıtım maliyetlerini değiştirecek yeni sürdürülebilirlik modelleri sunar.

### Glamsterdam düğüm depolama ve donanım gereksinimlerini nasıl etkileyecek? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Glamsterdam için değerlendirilen birden fazla EIP, durum büyümesinin performans uçurumunu ele almaktadır:

- Durum oluşturma gaz maliyeti artışı (veya EIP-8037), yılda 120 GiB'lik bir durum veritabanı büyüme oranını hedeflemek için sabit maliyetli bir çerçeve (CPSB) sunarak standart fiziksel donanımın ağı verimli bir şekilde çalıştırmaya devam edebilmesini sağlar.
- eth/70 kısmi blok makbuz listeleri (veya EIP-7975), düğümlerin sayfalandırılmış blok makbuzları talep etmesine olanak tanır, bu da Ethereum ölçeklendikçe çökmeleri ve eşzamanlamaları önlemek için veri ağırlıklı blok makbuz listelerini daha küçük parçalara böler.