---
title: Pectra
metaTitle: Prague-Electra (Pectra)
description: Pectra protokol güncellemesi hakkında bilgi edinin
lang: tr
authors: ["Nixo", "Mario Havel"]
---

Pectra ağ güncellemesi, [Dencun](/roadmap/dencun/)'u takip etti ve Ethereum'un hem yürütme hem de mutabakat katmanına değişiklikler getirdi. Kısaltılmış Pectra adı, sırasıyla yürütme ve mutabakat katmanı spesifikasyon değişikliklerinin adları olan Prague ve Electra'nın birleşimidir. Bu değişiklikler birlikte, [Ethereum](/) kullanıcılarına, geliştiricilerine ve doğrulayıcılarına bir dizi iyileştirme getiriyor.

Bu güncelleme, **07 Mayıs 2025 saat 10:05'te (UTC)**, `364032` döneminde Ethereum Ana Ağı'nda başarıyla etkinleştirildi.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Pectra güncellemesi, Ethereum'un uzun vadeli geliştirme hedeflerinde yalnızca tek bir adımdır. [Protokol yol haritası](/roadmap/) ve [önceki güncellemeler](/ethereum-forks/) hakkında daha fazla bilgi edinin.
</AlertDescription>
</AlertContent>
</Alert>

## Pectra'daki İyileştirmeler {#new-improvements}

Pectra, önceki tüm güncellemelerden daha fazla sayıda [EIP](https://eips.ethereum.org/) getiriyor! Birçok küçük değişikliğin yanı sıra bazı önemli yeni özellikler de var. Değişikliklerin tam listesi ve teknik detaylar, dahil edilen bireysel EIP'lerde bulunabilir.

### EOA hesap kodu {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702), yaygın [hesap soyutlama](/roadmap/account-abstraction/) yönünde büyük bir adımı temsil eder. Bu özellikle kullanıcılar, adreslerinin ([EOA](/glossary/#eoa)) bir akıllı sözleşme ile genişletilmesini ayarlayabilirler. EIP, belirli bir işleve sahip yeni bir işlem türü sunar: adres sahiplerinin, adreslerini seçilen bir akıllı sözleşmeyi taklit edecek şekilde ayarlayan bir yetkilendirmeyi imzalamalarına olanak tanımak. 

Bu EIP ile kullanıcılar, işlem paketleme, gazsız işlem yapma ve alternatif kurtarma şemaları için özel varlık erişimi gibi yeni özelliklere olanak tanıyan programlanabilir cüzdanları tercih edebilirler. Bu hibrit yaklaşım, EOA'ların basitliğini sözleşme tabanlı hesapların programlanabilirliği ile birleştirir. 

7702 hakkında daha derinlemesine bir incelemeyi [buradan](/roadmap/pectra/7702/) okuyun

### Maksimum etkin bakiyeyi artırma {#7251}

Doğrulayıcının mevcut etkin bakiyesi tam olarak 32 ETH'dir. Bu, mutabakata katılmak için gereken minimum miktar olmakla birlikte aynı zamanda tek bir doğrulayıcının stake edebileceği maksimum miktardır.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251), olası maksimum etkin bakiyeyi 2048 ETH'ye çıkarır, bu da tek bir doğrulayıcının artık 32 ile 2048 ETH arasında stake yapabileceği anlamına gelir. Stake edenler artık 32'nin katları yerine stake etmek için rastgele bir ETH miktarı seçebilir ve minimumun üzerindeki her 1 ETH için ödül alabilirler. Örneğin, bir doğrulayıcının bakiyesi ödülleriyle birlikte 33 ETH'ye çıkarsa, fazladan 1 ETH de etkin bakiyenin bir parçası olarak kabul edilir ve ödül alır.

Ancak doğrulayıcılar için daha iyi bir ödül sisteminin faydası, bu iyileştirmenin yalnızca bir parçasıdır. Birden fazla doğrulayıcı çalıştıran [stake edenler](/staking/), artık bunları tek bir doğrulayıcıda birleştirebilir; bu da daha kolay bir operasyon sağlar ve ağ yükünü azaltır. İşaret zincirindeki her doğrulayıcı her dönemde bir imza sunduğundan, daha fazla doğrulayıcı ve yayılması gereken çok sayıda imza ile bant genişliği gereksinimleri artar. Doğrulayıcıları birleştirmek, aynı ekonomik güvenliği korurken ağın yükünü hafifletecek ve yeni ölçeklendirme seçeneklerinin önünü açacaktır.

MaxEB hakkında daha derinlemesine bir incelemeyi [buradan](/roadmap/pectra/maxeb/) okuyun

### Blob işlem kapasitesi artışı {#7691}

Bloblar, L2'ler için [veri kullanılabilirliği](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) sağlar. Bunlar [önceki ağ güncellemesinde](/roadmap/dencun/) tanıtılmıştı. 

Şu anda ağ, blok başına ortalama 3 blob ve maksimum 6 blob hedeflemektedir. [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691) ile ortalama blob sayısı 6'ya, blok başına maksimum 9'a çıkarılacak ve bu da Ethereum toplamaları için artan bir kapasiteyle sonuçlanacaktır. Bu EIP, [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) daha da yüksek blob sayılarına olanak tanıyana kadar aradaki boşluğu kapatmaya yardımcı olur.

### Çağrı verisi maliyetini artırma {#7623}

[Dencun güncellemesinde blobların](/roadmap/danksharding) tanıtılmasından önce L2'ler, verilerini Ethereum'da depolamak için [çağrı verisi](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) kullanıyordu. Hem bloblar hem de çağrı verisi, Ethereum'un bant genişliği kullanımını etkiler. Çoğu blok yalnızca minimum miktarda çağrı verisi kullanırken, aynı zamanda birçok blob içeren veri ağırlıklı bloklar Ethereum'un p2p ağına zarar verebilir. 

Bunu ele almak için [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623), çağrı verisi fiyatlandırmasını artırır, ancak yalnızca veri ağırlıklı işlemler için. Bu, en kötü durumdaki blok boyutunu sınırlar, L2'lerin yalnızca blob kullanması için bir teşvik sağlar ve işlemlerin %99'undan fazlasını etkilenmeden bırakır.

### Yürütme katmanı tetiklenebilir çıkışları {#7002}

Şu anda, bir doğrulayıcıdan çıkış yapmak ve [stake edilmiş ETH'yi çekmek](/staking/withdrawals/), aktif bir doğrulayıcı anahtarı gerektiren bir mutabakat katmanı işlemidir; bu, doğrulayıcı tarafından onaylar gibi aktif görevleri yerine getirmek için kullanılan aynı BLS anahtarıdır. Çekim kimlik bilgileri, çıkış yapılan stake'i alan ancak çıkışı tetikleyemeyen ayrı bir soğuk anahtardır. Stake edenlerin çıkış yapmasının tek yolu, aktif doğrulayıcı anahtarı kullanılarak imzalanmış özel bir mesajı İşaret zinciri ağına göndermektir. Bu, çekim kimlik bilgileri ile doğrulayıcı anahtarının farklı varlıklar tarafından tutulduğu veya doğrulayıcı anahtarının kaybolduğu senaryolarda sınırlayıcıdır.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002), yürütme katmanı çekim kimlik bilgilerini kullanarak çıkışı tetiklemek için kullanılabilecek yeni bir sözleşme sunar. Stake edenler, doğrulayıcı imzalama anahtarlarına veya İşaret zincirine erişime hiç ihtiyaç duymadan bu özel sözleşmedeki bir işlevi çağırarak doğrulayıcılarından çıkış yapabilecekler. Önemli bir şekilde, doğrulayıcı çekim işlemlerini zincir içi olarak etkinleştirmek, düğüm operatörleri üzerinde azaltılmış güven varsayımlarına sahip staking protokollerine olanak tanır.

### Zincir içi doğrulayıcı yatırma işlemleri {#6110}

Doğrulayıcı yatırma işlemleri şu anda, İşaret zincirinde yürütme katmanından veri getiren bir işlev olan [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) tarafından işlenmektedir. Bu, İşaret zincirinin ayrı bir ağ olduğu ve İş Kanıtı (PoW) yeniden düzenlemeleriyle ilgilenmek zorunda kaldığı Birleşme öncesi zamanlardan kalma bir tür teknik borçtur. 

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110), yatırma işlemlerini yürütme katmanından mutabakat katmanına iletmenin yeni bir yoludur ve daha az uygulama karmaşıklığı ile anında işlemeye olanak tanır. Birleştirilmiş Ethereum'a özgü yatırma işlemlerini ele almanın daha güvenli bir yoludur. Ayrıca, geçmiş sonlanması için gerekli olan düğümü başlatmak için geçmiş yatırma işlemlerini gerektirmediğinden protokolü geleceğe hazırlamaya yardımcı olur.

### BLS12-381 için ön derleme {#2537}

Ön derlemeler, doğrudan Ethereum Sanal Makinesi'ne ([EVM](/developers/docs/evm/)) yerleşik özel bir akıllı sözleşme setidir. Normal sözleşmelerin aksine, ön derlemeler kullanıcılar tarafından dağıtılmaz, ancak kendi yerel dilinde (örneğin Solidity değil, Go, Java vb.) yazılmış istemci uygulamasının bir parçasıdır. Ön derlemeler, kriptografik işlemler gibi yaygın olarak kullanılan ve standartlaştırılmış işlevlere hizmet eder. Akıllı sözleşme geliştiricileri, ön derlemeleri normal bir sözleşme gibi ancak daha fazla güvenlik ve verimlilikle çağırabilirler.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537), [BLS12-381](https://hackmd.io/@benjaminion/bls12-381) üzerindeki eğri işlemleri için yeni ön derlemeler ekler. Bu eliptik eğri, pratik özellikleri sayesinde kripto para ekosistemlerinde yaygın olarak kullanılmaya başlandı. Daha spesifik olarak, doğrulayıcılar tarafından kullanıldığı Ethereum'un mutabakat katmanı tarafından benimsenmiştir.

Yeni ön derleme, her geliştiriciye bu eğriyi kullanarak kriptografik işlemleri (örneğin imzaları doğrulamak) kolay, verimli ve güvenli bir şekilde gerçekleştirme yeteneği ekler. Bu eğriye bağlı olan zincir içi uygulamalar, özel bir sözleşme yerine bir ön derlemeye güvenerek gaz açısından daha verimli ve güvenli hale gelebilir. Bu temel olarak EVM içindeki doğrulayıcılar hakkında mantık yürütmek isteyen uygulamalar için geçerlidir; örneğin staking havuzları, [yeniden staking](/restaking/), hafif istemciler, köprüler ve aynı zamanda sıfır bilgi.

### Geçmiş blok hash'lerini durumdan sunma {#2935}

EVM şu anda, sözleşme geliştiricilerinin bir bloğun hash'ini doğrudan yürütme katmanında almasını sağlayan `BLOCKHASH` işlem kodunu sağlamaktadır. Ancak bu, yalnızca son 256 blokla sınırlıdır ve gelecekte durumsuz istemciler için sorunlu hale gelebilir.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935), son 8192 blok hash'ini depolama yuvaları olarak sunabilen yeni bir sistem sözleşmesi oluşturur. Bu, protokolü durumsuz yürütme için geleceğe hazırlamaya yardımcı olur ve verkle ağaçları (verkle tries) benimsendiğinde daha verimli hale gelir. Ancak bunun dışında, sözleşmeyi daha uzun bir geçmiş penceresiyle doğrudan sorgulayabildikleri için toplamalar bundan hemen faydalanabilir.

### Komite endeksini Onay dışına taşıma {#7549}

İşaret zinciri mutabakatı, doğrulayıcıların en son blok ve kesinleşmiş dönem için oylarını kullanmasına dayanır. Onay 3 unsur içerir; bunlardan 2'si oydur ve üçüncüsü komite endeksi değeridir.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549), bu endeksi imzalı onay mesajının dışına taşır, bu da mutabakat oylarını doğrulamayı ve birleştirmeyi kolaylaştırır. Bu, her fikir birliği istemcisinde daha fazla verimlilik sağlayacak ve Ethereum mutabakatını kanıtlamak için sıfır bilgi devrelerine önemli performans iyileştirmeleri getirebilecektir.

### EL yapılandırma dosyalarına blob programı ekleme {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840), yürütme katmanı istemci yapılandırmasına yeni bir alan ekleyen basit bir değişikliktir. Blok sayısını yapılandırarak, blok başına hedef ve maksimum blob sayılarının yanı sıra blob ücreti ayarlaması için dinamik ayar yapılmasını sağlar. Doğrudan tanımlanmış yapılandırma ile istemciler, bu bilgileri Engine API aracılığıyla değiştirme karmaşıklığından kaçınabilirler.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Pectra'nın bir Ethereum kullanıcısı, geliştiricisi veya doğrulayıcısı olarak sizi özel olarak nasıl etkilediği hakkında daha fazla bilgi edinmek için <a href="https://epf.wiki/#/wiki/pectra-faq">Pectra SSS</a> bölümüne göz atın.
</AlertDescription>
</AlertContent>
</Alert>

## Bu güncelleme tüm Ethereum düğümlerini ve doğrulayıcılarını etkiliyor mu? {#client-impact}

Evet, Pectra güncellemesi hem [yürütme istemcilerinde hem de fikir birliği istemcilerinde](/developers/docs/nodes-and-clients/) güncellemeler gerektirir. Tüm ana Ethereum istemcileri, yüksek öncelikli olarak işaretlenmiş sert çatallanmayı destekleyen sürümler yayınlayacaktır. Güncelleme sonrasında Ethereum ağıyla senkronizasyonu sürdürmek için düğüm operatörleri, desteklenen bir istemci sürümünü çalıştırdıklarından emin olmalıdır. İstemci sürümleriyle ilgili bilgilerin zamana duyarlı olduğunu ve kullanıcıların en güncel ayrıntılar için en son güncellemelere başvurmaları gerektiğini unutmayın.

## Sert çatallanmadan sonra ETH nasıl dönüştürülebilir? {#scam-alert}

- **ETH'niz İçin Herhangi Bir İşlem Gerekmez**: Ethereum Pectra güncellemesinin ardından ETH'nizi dönüştürmenize veya yükseltmenize gerek yoktur. Hesap bakiyeleriniz aynı kalacak ve şu anda elinizde bulunan ETH, sert çatallanmadan sonra mevcut haliyle erişilebilir olmaya devam edecektir.
- **Dolandırıcılıklara Karşı Dikkatli Olun!** <Emoji text="⚠️" /> **size ETH'nizi "yükseltmenizi" söyleyen herkes sizi dolandırmaya çalışıyordur.** Bu güncellemeyle ilgili yapmanız gereken hiçbir şey yoktur. Varlıklarınız tamamen etkilenmeden kalacaktır. Unutmayın, bilgili kalmak dolandırıcılıklara karşı en iyi savunmadır.

[Dolandırıcılıkları tanıma ve bunlardan kaçınma hakkında daha fazla bilgi](/security/)

## Görsel öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<VideoWatch slug="pectra-upgrade-overview" />

_Pectra Güncellemesinde Neler Var? - Christine Kim_

<VideoWatch slug="pectra-what-stakers-need-to-know" />

_Ethereum Pectra Güncellemesi: Stake Edenlerin Bilmesi Gerekenler — Blockdaemon_

## Daha fazla okuma {#further-reading}

- [Ethereum yol haritası](/roadmap/)
- [Pectra SSS](https://epf.wiki/#/wiki/pectra-faq)
- [Pectra.wtf bilgi sayfası](https://pectra.wtf)
- [Pectra, stake edenlerin deneyimini nasıl geliştiriyor?](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [EIP7702 bilgi sayfası](https://eip7702.io/)
- [Pectra geliştirici ağları (devnets)](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)