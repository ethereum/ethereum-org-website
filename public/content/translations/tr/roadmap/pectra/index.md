---
title: Prague-Electra (Pectra)
description: Pectra protokol yükseltmesi hakkında bilgi edinin
lang: tr
---

# Pectra {#pectra}

Pectra ağ yükseltmesi, [Dencun](/roadmap/dencun/)'un ardından geldi ve Ethereum'un hem yürütme hem de mutabakat katmanında değişiklikler getirdi. Kısaltılmış Pectra adı, sırasıyla yürütme ve mutabakat katmanı spesifikasyon değişikliklerinin adları olan Prag ve Electra'nın birleşimidir. Bu değişiklikler hep birlikte Ethereum kullanıcılarına, geliştiricilerine ve doğrulayıcılarına bir dizi iyileştirme getiriyor.

Bu yükseltme, Ethereum ana ağında `364032` döneminde, **07-Mayıs-2025 saat 10:05'te (UTC)** başarıyla etkinleştirildi.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Pectra yükseltmesi, Ethereum'un uzun vadeli geliştirme hedeflerinde yalnızca tek bir adımdır. [Protokol yol haritası](/roadmap/) ve [önceki yükseltmeler](/ethereum-forks/) hakkında daha fazla bilgi edinin.
</AlertDescription>
</AlertContent>
</Alert>

## Pectra'daki iyileştirmeler {#new-improvements}

Pectra, önceki tüm yükseltmelerden daha fazla sayıda [EIP](https://eips.ethereum.org/) getiriyor! Pek çok küçük değişikliğin yanı sıra bazı önemli yeni özellikler de var. Değişikliklerin tam listesi ve teknik ayrıntılar, dâhil edilen EIP'lerin her birinde bulunabilir.

### EOA hesap kodu {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702), yaygın [hesap soyutlamasına](/roadmap/account-abstraction/) yönelik önemli bir adımı temsil ediyor. Bu özellikle kullanıcılar, adreslerini ([EOA](/glossary/#eoa)) bir akıllı sözleşmeyle genişletilecek şekilde ayarlayabilirler. EIP, belirli bir işleve sahip yeni bir işlem türü sunar: adres sahiplerinin, adreslerini seçilen bir akıllı sözleşmeyi taklit edecek şekilde ayarlayan bir yetkilendirmeyi imzalamasına olanak tanır.

Bu EIP ile kullanıcılar, işlem gruplama, gazsız işlem yapma ve alternatif kurtarma şemaları için özel varlık erişimi gibi yeni özelliklere olanak tanıyan programlanabilir cüzdanları tercih edebilirler. Bu hibrit yaklaşım, EOA'ların basitliğini sözleşme tabanlı hesapların programlanabilirliği ile birleştirir.

7702 hakkında daha derin bir incelemeyi [buradan](/roadmap/pectra/7702/) okuyun

### Maksimum efektif bakiyeyi artırma {#7251}

Doğrulayıcının mevcut efektif bakiyesi tam olarak 32 ETH'dir. Bu, mutabakata katılmak için gerekli minimum tutardır, ancak aynı zamanda tek bir doğrulayıcının kilitleyebileceği maksimum tutardır.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251), mümkün olan maksimum efektif bakiyeyi 2048 ETH'ye çıkarır; bu, tek bir doğrulayıcının artık 32 ila 2048 ETH arasında stake edebileceği anlamına gelir. 32'nin katları yerine, paydaşlar artık stake etmek için rastgele bir miktarda ETH seçebilir ve minimumun üzerindeki her 1 ETH için ödül alabilirler. Örneğin, bir doğrulayıcının bakiyesi ödülleriyle birlikte 33 ETH'ye çıkarsa, fazladan 1 ETH de efektif bakiyenin bir parçası olarak kabul edilir ve ödül alır.

Ancak doğrulayıcılar için daha iyi bir ödül sisteminin faydası, bu iyileştirmenin yalnızca bir parçasıdır. Birden fazla doğrulayıcı çalıştıran [Paydaşlar](/staking/) artık bunları tek bir doğrulayıcıda birleştirebilir, bu da daha kolay çalışmayı sağlar ve ağ yükünü azaltır. İşaret Zinciri'ndeki her doğrulayıcı her dönemde bir imza gönderdiğinden, daha fazla doğrulayıcı ve yayılacak çok sayıda imza ile bant genişliği gereksinimleri artar. Doğrulayıcıları birleştirmek, ağın yükünü azaltacak ve aynı ekonomik güvenliği korurken yeni ölçeklendirme seçenekleri sunacaktır.

maxEB hakkında daha derin bir incelemeyi [buradan](/roadmap/pectra/maxeb/) okuyun

### Blob verim artışı {#7691}

Blob'lar, L2'ler için [veri kullanılabilirliği](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) sağlar. [Önceki ağ yükseltmesinde](/roadmap/dencun/) tanıtıldılar.

Şu anda ağ, blok başına ortalama 3 blob ve en fazla 6 blob hedefleniyor. [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691) ile ortalama blob sayısı 6'ya, blok başına maksimum 9'a çıkarılarak Ethereum toplamaları için kapasite artırılacak. Bu EIP, [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) daha da yüksek blob sayılarına olanak tanıyana kadar aradaki boşluğu doldurmaya yardımcı olur.

### Calldata maliyetini artırma {#7623}

[Dencun yükseltmesindeki blob'ların](/roadmap/danksharding) tanıtılmasından önce, L2'ler verilerini Ethereum'da depolamak için [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) kullanıyordu. Hem blob'lar hem de calldata, Ethereum'un bant genişliği kullanımını etkiler. Çoğu blok yalnızca minimum miktarda calldata kullanırken, aynı zamanda çok sayıda blob içeren veri ağırlıklı bloklar Ethereum'un p2p ağı için zararlı olabilir.

Bunu ele almak için [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623), calldata fiyatlandırmasını artırır, ancak yalnızca veri ağırlıklı işlemler için. Bu, en kötü durumdaki blok boyutunu sınırlar, L2'lerin yalnızca blob kullanması için bir teşvik sağlar ve işlemlerin %99'undan fazlasını etkilenmeden bırakır.

### Yürütme katmanından tetiklenebilir çıkışlar {#7002}

Şu anda, bir doğrulayıcıdan çıkmak ve [kilitlenmiş ETH'yi çekmek](/staking/withdrawals/) için, doğrulayıcının tasdikler gibi aktif görevleri yerine getirmek için kullandığı BLS anahtarıyla aynı olan aktif bir doğrulayıcı anahtarı gerektiren bir mutabakat katmanı işlemidir. Para çekme kimlik bilgileri, çıkış yapılan hisseyi alan ancak çıkışı tetikleyemeyen ayrı bir soğuk anahtardır. Paydaşların çıkmasının tek yolu, aktif doğrulayıcı anahtarı kullanılarak imzalanmış özel bir mesajı İşaret Zinciri ağına göndermektir. Bu, para çekme kimlik bilgilerinin ve doğrulayıcı anahtarının farklı varlıklar tarafından tutulduğu veya doğrulayıcı anahtarının kaybolduğu senaryolarda sınırlayıcıdır.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002), yürütme katmanı para çekme kimlik bilgileri kullanılarak çıkışı tetiklemek için kullanılabilecek yeni bir sözleşme sunar. Paydaşlar, doğrulayıcı imzalama anahtarına veya İşaret Zinciri'ne erişmeye gerek kalmadan bu özel sözleşmedeki bir işlevi çağırarak doğrulayıcılarından çıkabilecekler. Daha da önemlisi, doğrulayıcı para çekme işlemlerinin zincir üstünde etkinleştirilmesi, düğüm operatörleri üzerindeki güven varsayımlarını azaltan stake protokollerine olanak tanır.

### Zincirdeki doğrulayıcı mevduatları {#6110}

Doğrulayıcı mevduatları şu anda yürütme katmanından veri alan İşaret Zinciri üzerindeki bir işlev olan [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) tarafından işlenmektedir. Bu, Birleşim'den önceki zamanlardan kalma, İşaret Zinciri'nin ayrı bir ağ olduğu ve iş ispatı yeniden düzenlemeleriyle ilgilenmek zorunda olduğu bir tür teknik borçtur.

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110), yürütme katmanından mutabakat katmanına mevduat teslim etmenin yeni bir yoludur ve daha az uygulama karmaşıklığı ile anında işlemeye olanak tanır. Birleştirilmiş Ethereum'a özgü mevduatları işlemenin daha güvenli bir yoludur. Ayrıca, geçmişin sona ermesi için gerekli olan düğümü önyüklemek için geçmiş mevduatları gerektirmediğinden, protokolün geleceğe hazır olmasına da yardımcı olur.

### BLS12-381 için ön derleme {#2537}

Ön derlemeler, doğrudan ethereum sanal makinesi'ne ([EVM](/developers/docs/evm/)) yerleştirilmiş özel bir akıllı sözleşme setidir. Normal sözleşmelerden farklı olarak, ön derlemeler kullanıcılar tarafından dağıtılmaz, istemci uygulamasının bir parçasıdır ve kendi ana dilinde (örneğin Solidity değil, Go, Java vb.) yazılır. Ön derlemeler, kriptografik işlemler gibi yaygın olarak kullanılan ve standartlaştırılmış işlevlere hizmet eder. Akıllı sözleşme geliştiricileri, ön derlemeleri normal bir sözleşme gibi ancak daha fazla güvenlik ve verimlilikle çağırabilir.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537), [BLS12-381](https://hackmd.io/@benjaminion/bls12-381) üzerindeki eğri işlemleri için yeni ön derlemeler ekler. Bu eliptik eğri, pratik özellikleri sayesinde kripto para ekosistemlerinde yaygın olarak kullanılmaya başlandı. Daha spesifik olarak, doğrulayıcılar tarafından kullanıldığı Ethereum'un mutabakat katmanı tarafından benimsenmiştir.

Yeni ön derleme, her geliştiricinin bu eğriyi kullanarak, örneğin imzaları doğrulamak gibi kriptografik işlemleri kolayca, verimli ve güvenli bir şekilde gerçekleştirme yeteneği ekler. Bu eğriye bağlı olan zincir üstü uygulamalar, özel bir sözleşme yerine bir ön derlemeye dayanarak daha gaz verimli ve güvenli hale gelebilir. Bu, temel olarak EVM içindeki doğrulayıcılar hakkında mantık yürütmek isteyen uygulamalar için geçerlidir; örneğin, stake havuzları, [yeniden stake etme](/restaking/), hafif istemciler, köprüler ve ayrıca sıfır bilgi.

### Durumdan geçmiş blok karmalarını sunma {#2935}

EVM şu anda, sözleşme geliştiricilerinin bir bloğun karmasını doğrudan yürütme katmanından almalarını sağlayan `BLOCKHASH` işlem kodunu sağlar. Ancak, bu yalnızca son 256 blokla sınırlıdır ve gelecekte durum bilgisiz istemciler için sorunlu hale gelebilir.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935), son 8192 blok karmasını depolama yuvaları olarak sunabilen yeni bir sistem sözleşmesi oluşturur. Bu, protokolün durum bilgisiz yürütme için geleceğe hazır olmasına yardımcı olur ve verkle denemeleri benimsendiğinde daha verimli hale gelir. Ancak, bunun dışında, toplamalar daha uzun bir geçmiş penceresiyle sözleşmeyi doğrudan sorgulayabildikleri için bundan hemen yararlanabilirler.

### Komite dizinini Tasdik'in dışına taşıma {#7549}

İşaret Zinciri mutabakatı, doğrulayıcıların en son blok ve sonuçlandırılmış dönem için oy kullanmasına dayanır. Tasdik, 2'si oy ve üçüncüsü komite dizin değeri olan 3 unsur içerir.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549), bu dizini imzalı tasdik mesajının dışına taşır, bu da mutabakat oylarını doğrulamayı ve birleştirmeyi kolaylaştırır. Bu, her mutabakat istemcisinde daha fazla verimlilik sağlayacak ve Ethereum mutabakatını kanıtlamak için sıfır bilgi devrelerine önemli performans iyileştirmeleri getirebilecektir.

### EL yapılandırma dosyalarına blob zamanlaması ekleme {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840), yürütme katmanı istemci yapılandırmasına yeni bir alan ekleyen basit bir değişikliktir. Blok sayısını yapılandırarak blok başına hedef ve maksimum blob sayıları için dinamik ayarın yanı sıra blob ücreti ayarlamasına olanak tanır. Doğrudan tanımlanmış yapılandırma ile istemciler, bu bilgiyi Motor API'si aracılığıyla değiştirmenin karmaşıklığından kaçınabilir.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Pectra'nın sizi bir Ethereum kullanıcısı, geliştiricisi veya doğrulayıcısı olarak özel olarak nasıl etkilediği hakkında daha fazla bilgi edinmek için <a href="https://epf.wiki/#/wiki/pectra-faq">Pectra SSS</a>'ye göz atın.
</AlertDescription>
</AlertContent>
</Alert>

## Bu yükseltme tüm Ethereum düğümlerini ve doğrulayıcılarını etkiliyor mu? {#client-impact}

Evet, Pectra yükseltmesi hem [yürütme istemcilerinin hem de mutabakat istemcilerinin](/developers/docs/nodes-and-clients/) güncellenmesini gerektirir. Tüm ana Ethereum istemcileri, yüksek öncelikli olarak işaretlenmiş sert çatallanmayı destekleyen sürümler yayınlayacaktır. Yükseltme sonrasında Ethereum ağı ile senkronizasyonu sürdürmek için düğüm operatörlerinin desteklenen bir istemci sürümü çalıştırdıklarından emin olmaları gerekir. İstemci sürümleri hakkındaki bilgilerin zamana duyarlı olduğunu ve kullanıcıların en güncel ayrıntılar için en son güncellemelere başvurmaları gerektiğini unutmayın.

## Sert çatallanma sonrasında ETH nasıl dönüştürülebilir? {#scam-alert}

- **ETH'niz İçin İşlem Gerekmez**: Ethereum Pectra yükseltmesinin ardından ETH'nizi dönüştürmeniz veya yükseltmeniz gerekmez. Hesap bakiyeleriniz aynı kalacak ve sert çatallanmanın ardından şu an sahip olduğunuz ETH mevcut biçiminde erişilebilir olacaktır.
- **Dolandırıcılıklara Karşı Dikkatli Olun!** <Emoji text="⚠️" /> **ETH'nizi "yükseltmenizi" söyleyen kişiler sizi dolandırmaya çalışıyor.** Bu yükseltmeyle ilgili yapmanız gereken hiçbir şey yok. Varlıklarınız hiçbir şekilde etkilenmeyecek. Unutmayın, bilgi sahibi olmak dolandırıcılıklardan korunmanın en iyi yoludur.

[Dolandırıcılığı tanıma ve dolandırıcılıktan kaçınma hakkında daha fazla bilgi](/güvenlik/)

## Görerek öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Pectra Yükseltmesine Neler Dahil? - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Ethereum Pectra Yükseltmesi: Paydaşların Bilmesi Gerekenler — Blockdaemon_

## Daha fazla kaynak {#further-reading}

- [Ethereum yol haritası](/roadmap/)
- [Pectra SSS](https://epf.wiki/#/wiki/pectra-faq)
- [Pectra.wtf bilgi sayfası](https://pectra.wtf)
- [Pectra paydaş deneyimini nasıl geliştiriyor](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [EIP7702 bilgi sayfası](https://eip7702.io/)
- [Pectra devnet'leri](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
