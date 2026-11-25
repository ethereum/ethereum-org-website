---
title: "Staking çekim işlemleri"
description: "Staking push çekim işlemlerinin ne olduğunu, nasıl çalıştığını ve staker'ların ödüllerini almak için ne yapmaları gerektiğini özetleyen sayfa"
lang: tr
template: staking
image: /images/staking/leslie-withdrawal.png
sidebarDepth: 2
summaryPoints:
  - Doğrulayıcı operatörleri, çekim işlemlerini etkinleştirmek için bir çekim adresi sağlamalıdır
  - Eski doğrulayıcıların 32 ETH'yi aşan fazla bakiyeleri birkaç günde bir otomatik olarak çekilir
  - Bileşik doğrulayıcılar, 2048 ETH'ye kadar olan tüm bakiyeleri üzerinden ödül kazanır
  - Staking'den tamamen çıkış yapan doğrulayıcılar kalan bakiyelerini alacaktır
---

**Staking çekimleri**, ETH'nin [Ethereum](/)'un mutabakat katmanındaki (İşaret Zinciri) bir doğrulayıcı hesabından, işlem yapılabileceği yürütme katmanına transfer edilmesini ifade eder.

> Eğer bir [staking havuzu](/staking/pools/)nun parçasıysanız veya staking tokenleri tutuyorsanız, her hizmet farklı çalıştığı için staking çekim işlemlerinin nasıl ele alındığı hakkında daha fazla ayrıntı için sağlayıcınıza danışmalısınız.

Çekim işlemlerinin nasıl çalıştığı, doğrulayıcınızın çekim kimlik bilgileri türüne bağlıdır:

- **Eski doğrulayıcılar (Tip 1)**: 32 ETH'yi aşan fazla bakiye, otomatik ve düzenli olarak doğrulayıcıya bağlı çekim adresine gönderilir. 32 ETH'nin üzerindeki ödüller, doğrulayıcının ağdaki ağırlığına katkıda bulunmaz.
- **Bileşik doğrulayıcılar (Tip 2)**: Ödüller, doğrulayıcının etkin bakiyesine 2048 ETH'ye kadar eklenerek (bileşik getiri) doğrulayıcının ağırlığını artırır ve daha fazla ödül kazandırır. Yalnızca 2048 ETH'yi aşan bakiye otomatik olarak taranıp çekilir.

Kullanıcılar ayrıca **staking'den tamamen çıkış yapabilir**, çekim için bir işlem gönderebilir, (ağ talebine bağlı olarak) herhangi bir çekim kuyruğu süresini bekleyebilir ve tüm doğrulayıcı bakiyelerinin kilidini açabilirler.

## Staking ödülleri {#staking-rewards}

Ödüllerin nasıl ele alınacağı, doğrulayıcının kimlik bilgisi türüne bağlıdır:

**Eski doğrulayıcıların (Tip 1)** etkin bakiyesi 32 ETH ile sınırlıdır. Ağ ödülleri olarak alınan 32 ETH'nin üzerindeki herhangi bir bakiye, etkin bakiyeye katkıda bulunmaz veya bu doğrulayıcının ağdaki ağırlığını artırmaz ve bu ödüller birkaç günde bir otomatik olarak doğrulayıcının özel çekim adresine çekilir. Bir kereliğine bir çekim adresi sağlamanın dışında, bu ödülleri talep etmek doğrulayıcı operatöründen herhangi bir eylem gerektirmez. Tüm bunlar mutabakat katmanında başlatılır, bu nedenle hiçbir adımda gaz (işlem ücreti) gerekmez.

**Bileşik doğrulayıcılar (Tip 2)**, 32 ile 2048 ETH arasında herhangi bir etkin bakiyeye sahip olabilir. Bu doğrulayıcılar tarafından alınan ağ ödülleri, etkin bakiyelerine eklenerek doğrulayıcının ağırlığını ve gelecekteki ödülleri alma potansiyelini artırır. Otomatik taramalar yalnızca 2048 ETH'yi aşan bakiye için gerçekleşir. 2048 ETH eşiğinin altındaki ödülleri çekmek için, bileşik doğrulayıcıların yürütme katmanından manuel olarak kısmi bir çekim tetiklemesi gerekir ve bu işlem gaz gerektirir.

### Buraya nasıl geldik? {#how-did-we-get-here}

Geçtiğimiz birkaç yıl içinde Ethereum, eskiden olduğu gibi enerji yoğun madencilik yerine ETH'nin kendisi tarafından güvence altına alınan bir ağa geçiş yapan çeşitli ağ yükseltmelerinden geçti. Ethereum'da mutabakata katılmak artık "staking" olarak biliniyor, çünkü katılımcılar ağa katılabilmek için ETH'yi gönüllü olarak kilitleyerek "riske atıyorlar" (stake ediyorlar). Kurallara uyan kullanıcılar ödüllendirilirken, hile yapma girişimleri cezalandırılabilir.

Kasım 2020'de staking depozitosu sözleşmesinin başlatılmasından bu yana, bazı cesur Ethereum öncüleri, ağ kurallarını izleyerek blokları resmi olarak onaylama ve teklif etme hakkına sahip özel hesaplar olan "doğrulayıcıları" etkinleştirmek için fonlarını gönüllü olarak kilitlediler.

Şanghay/Capella yükseltmesinden önce, stake ettiğiniz ETH'yi kullanamaz veya bunlara erişemezdiniz. Ancak artık, ödüllerinizi seçtiğiniz bir hesaba otomatik olarak almayı tercih edebilir ve ayrıca stake ettiğiniz ETH'yi istediğiniz zaman çekebilirsiniz.

### Nasıl hazırlanırım? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Önemli uyarılar {#important-notices}

Doğrulayıcı hesaplarının, tahakkuk eden ağ ödüllerine erişip bunları çekebilmeleri veya staking'den çıkış yaparken tam bir çekim işlemi gerçekleştirebilmeleri için bir çekim adresi sağlamaları gerekir.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
**Her doğrulayıcı hesabına yalnızca bir kez, tek bir çekim adresi atanabilir.** Bir adres seçilip mutabakat katmanına gönderildikten sonra, bu işlem geri alınamaz veya tekrar değiştirilemez. Göndermeden önce sağlanan adresin sahipliğini ve doğruluğunu iki kez kontrol edin.
</AlertDescription>
</AlertContent>
</Alert>

Doğrulayıcı hesabınız için henüz bir çekim adresi sağlamadıysanız, anımsatıcı/kurtarma ifadenizin çevrimdışı olarak güvende kaldığını ve hiçbir şekilde tehlikeye atılmadığını varsayarsak, **bu süre zarfında fonlarınız için herhangi bir tehdit yoktur**. Çekim kimlik bilgilerinin eklenmemesi, bir çekim adresi sağlanana kadar ETH'nin doğrulayıcı hesabında kilitli kalmasına neden olacaktır.

## Bileşik doğrulayıcılar {#compounding-validators}

Doğrulayıcılar, çekim kimlik bilgilerini Tip 1'den Tip 2'ye dönüştürerek **bileşik getiriye** (compounding) geçmeyi tercih edebilirler. Bu, maksimum etkin bakiyeyi 32 ETH'den **2048 ETH'ye** yükselterek, ödüllerin otomatik olarak taranıp çekilmesi yerine doğrulayıcının etkin bakiyesine eklenmesine olanak tanır.

Bileşik getiri etkinleştirildiğinde:

- Ödüller, doğrulayıcının etkin bakiyesini 1 ETH'lik artışlarla (küçük bir [histerezis tamponuna](https://www.attestant.io/posts/understanding-validator-effective-balance/) tabi olarak) artırır ve zamanla daha fazla ödül kazandırır
- Otomatik taramalar yalnızca 2048 ETH'yi aşan bakiye için gerçekleşir
- 2048 ETH eşiğinin altındaki kısmi çekimler yürütme katmanından manuel olarak tetiklenmelidir (bu işlem gaz gerektirir)
- Birden fazla doğrulayıcı, tek bir bileşik doğrulayıcıda **birleştirilebilir** (konsolide edilebilir), böylece operasyonel yük azaltılır

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
**Tip 1'den Tip 2 çekim kimlik bilgilerine dönüştürme işlemi geri alınamaz.** Bu dönüştürme işlemi için resmi araç olarak [Staking Launchpad](https://launchpad.ethereum.org/validator-actions)'i kullanın. Dönüştürme süreci, riskler ve birleştirme hakkında daha fazla ayrıntı için [MaxEB derinlemesine incelemesine](/roadmap/pectra/maxeb/) bakın.
</AlertDescription>
</AlertContent>
</Alert>

## Staking'den tamamen çıkış yapma {#exiting-staking-entirely}

Bir doğrulayıcı hesap bakiyesinden _herhangi bir_ fonun transfer edilebilmesi için önce bir çekim adresi sağlanması gerekir.

Staking'den tamamen çıkış yapmak ve tüm bakiyesini geri çekmek isteyen kullanıcılar "gönüllü çıkış" başlatmalıdır. Bu iki şekilde yapılabilir:

- **Doğrulayıcı anahtarlarını kullanarak**: Doğrulayıcı istemcinizle gönüllü bir çıkış mesajı imzalayın ve yayınlayın, ardından mutabakat düğümünüze gönderin. Bu işlem gaz gerektirmez.
- **Çekim kimlik bilgilerini kullanarak**: Doğrulayıcı imzalama anahtarına erişime ihtiyaç duymadan, çekim adresinizi kullanarak yürütme katmanından bir çıkış tetikleyin. Bu bir işlem gerektirir ve gaz maliyeti vardır.

Bir doğrulayıcının staking'den çıkış süreci, aynı anda kaç kişinin çıkış yaptığına bağlı olarak değişken miktarda zaman alır. Tamamlandığında, bu hesap artık doğrulayıcı ağ görevlerini yerine getirmekten sorumlu olmayacak, artık ödüller için uygun olmayacak ve artık ETH'si "stake edilmiş" durumda olmayacaktır. Bu sırada hesap tamamen "çekilebilir" olarak işaretlenecektir.

Bir hesap "çekilebilir" olarak işaretlendikten ve çekim kimlik bilgileri sağlandıktan sonra, kullanıcının beklemek dışında yapması gereken başka bir şey yoktur. Hesaplar, uygun çıkış yapmış fonlar için blok teklifçileri tarafından otomatik ve sürekli olarak taranır ve hesap bakiyeniz bir sonraki <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>tarama</a> sırasında tam olarak transfer edilir (bu aynı zamanda "tam çekim" olarak da bilinir).

## Otomatik ödüller nasıl çalışır (Tip 1 doğrulayıcı)? {#how-do-withdrawals-work}

Belirli bir doğrulayıcının çekim için uygun olup olmadığı, doğrulayıcı hesabının kendi durumu tarafından belirlenir. Bir hesap için çekim işleminin başlatılıp başlatılmayacağını belirlemek için herhangi bir zamanda kullanıcı girdisine gerek yoktur; tüm süreç mutabakat katmanı tarafından sürekli bir döngüde otomatik olarak gerçekleştirilir.

### Görsel öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

Finematics'in Ethereum staking çekim işlemleri hakkındaki bu açıklamasına göz atın:

<VideoWatch slug="ethereum-staking-withdrawals" />

### Doğrulayıcı "taraması" {#validator-sweeping}

Bir doğrulayıcının bir sonraki bloğu teklif etmesi planlandığında, 16'ya kadar uygun çekim işleminden oluşan bir çekim kuyruğu oluşturması gerekir. Bu, başlangıçta 0 numaralı doğrulayıcı endeksi ile başlayarak, protokol kurallarına göre bu hesap için uygun bir çekim olup olmadığını belirleyerek ve varsa bunu kuyruğa ekleyerek yapılır. Bir sonraki bloğu teklif edecek olan doğrulayıcı, bir öncekinin kaldığı yerden devam ederek süresiz olarak sırayla ilerleyecektir.

<Alert variant="update">
<AlertIcon size="xl"><Clock /></AlertIcon>
<AlertContent>
<AlertDescription>
Analog bir saati düşünün. Saatin akrebi saati gösterir, tek bir yönde ilerler, hiçbir saati atlamaz ve son sayıya ulaşıldığında sonunda tekrar başa döner.

Şimdi 1'den 12'ye kadar olmak yerine, saatin 0'dan N'ye kadar olduğunu hayal edin _(N, mutabakat katmanında şimdiye kadar kaydedilmiş toplam doğrulayıcı hesabı sayısıdır, Nisan 2026 itibarıyla 1,2 milyondan fazladır)._

Saatin ibresi, uygun çekimler için kontrol edilmesi gereken bir sonraki doğrulayıcıyı gösterir. 0'dan başlar ve hiçbir hesabı atlamadan sonuna kadar ilerler. Son doğrulayıcıya ulaşıldığında, döngü tekrar baştan devam eder.
</AlertDescription>
</AlertContent>
</Alert>

#### Çekim işlemleri için bir hesabı kontrol etme {#checking-an-account-for-withdrawals}

Bir teklif edici olası çekimler için doğrulayıcıları tararken, kontrol edilen her doğrulayıcı, bir çekimin tetiklenip tetiklenmeyeceğini ve eğer öyleyse ne kadar ETH çekilmesi gerektiğini belirlemek için kısa bir dizi soruya göre değerlendirilir.

1. **Bir çekim adresi sağlandı mı?** Herhangi bir çekim adresi sağlanmadıysa, hesap atlanır ve hiçbir çekim başlatılmaz.
2. **Doğrulayıcı çıkış yaptı mı ve çekilebilir durumda mı?** Doğrulayıcı tamamen çıkış yaptıysa ve hesabının "çekilebilir" olarak kabul edildiği döneme ulaştıysak, tam bir çekim işlemi gerçekleştirilecektir. Bu, kalan tüm bakiyeyi çekim adresine transfer edecektir.
3. **Bakiye, maksimum etkin bakiyesini aşıyor mu?** Eski (Tip 1) doğrulayıcılar için bu eşik 32 ETH'dir. Bileşik (Tip 2) doğrulayıcılar için bu eşik 2048 ETH'dir. Hesabın çekim kimlik bilgileri varsa, tamamen çıkış yapmamışsa, maksimum düzeyde bir etkin bakiyeye sahipse ve bu eşiğin üzerinde bakiyesi varsa, yalnızca fazla kısmı kullanıcının çekim adresine transfer eden kısmi bir çekim işlemi gerçekleştirilecektir.

Bir doğrulayıcının yaşam döngüsü boyunca doğrulayıcı operatörleri tarafından gerçekleştirilen ve bu akışı doğrudan etkileyen yalnızca iki eylem vardır:

- Herhangi bir çekim biçimini etkinleştirmek için çekim kimlik bilgileri sağlamak
- Tam bir çekimi tetikleyecek olan ağdan çıkış yapmak

### Gazsız (Ücretsiz) {#gas-free}

Otomatik çekim taramaları, staker'ların manuel olarak bir işlem göndermesini gerektirmez. Bu, otomatik taramalar için **hiçbir gaz (işlem ücreti) gerekmediği** ve mevcut yürütme katmanı blok alanı için rekabet etmedikleri anlamına gelir.

2048 ETH eşiğinin altında kısmi bir çekim tetiklemek isteyen [bileşik doğrulayıcıların](#compounding-validators) bunu yürütme katmanından manuel olarak yapması gerektiğini ve bunun gaz gerektirdiğini unutmayın.

### Staking ödüllerimin kilidi ne sıklıkla açılacak ve cüzdanımda kullanıma sunulacak? {#how-soon}

Tek bir blokta en fazla 16 çekim işlemi gerçekleştirilebilir. Bu hızda, günde 115.200 doğrulayıcı çekimi işlenebilir (hiçbir yuvanın kaçırılmadığı varsayılarak). Yukarıda belirtildiği gibi, uygun çekimi olmayan doğrulayıcılar atlanacak ve bu da taramayı bitirme süresini azaltacaktır.

Bu hesaplamayı genişleterek, belirli sayıda çekim işlemini gerçekleştirmenin ne kadar süreceğini tahmin edebiliriz:

<TableContainer>

| Çekim sayısı | Tamamlanma süresi |
| :-------------------: | :--------------: |
|        400.000        |     3,5 gün     |
|        500.000        |     4,3 gün     |
|        600.000        |     5,2 gün     |
|        700.000        |     6,1 gün     |
|        800.000        |     7,0 gün     |

</TableContainer>

Gördüğünüz gibi, ağda daha fazla doğrulayıcı oldukça bu durum yavaşlar. Kaçırılan yuvalardaki bir artış bunu orantılı olarak yavaşlatabilir, ancak bu genellikle olası sonuçların daha yavaş tarafını temsil edecektir.

## Sıkça sorulan sorular {#faq}

<ExpandableCard
title="Bir çekim adresi sağladıktan sonra, bunu alternatif bir çekim adresiyle değiştirebilir miyim?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Hayır, çekim kimlik bilgilerini sağlama süreci tek seferlik bir süreçtir ve gönderildikten sonra değiştirilemez.
</ExpandableCard>

<ExpandableCard
title="Bir doğrulayıcının çekim adresi neden yalnızca bir kez ayarlanabilir?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
Bir doğrulayıcının yürütme katmanı çekim adresini ayarlamak, doğrulayıcının mutabakat katmanındaki kimlik bilgilerinde kalıcı bir değişikliktir. Mutabakat katmanı kimlik bilgileri kaydedildikten sonra bunları güncellemenin bir yolu yoktur.

Bir doğrulayıcının çekim adresi kimlik bilgileri, bir akıllı sözleşmeyi (kodu tarafından kontrol edilen) veya harici olarak sahip olunan bir hesabı (EOA, özel anahtarı tarafından kontrol edilen) işaret edecek şekilde ayarlanabilir. Yürütme katmanı tetiklemeli çekimler ([EIP-7002](https://eips.ethereum.org/EIPS/eip-7002)) artık çekim adresinin çıkışları ve kısmi çekimleri tetiklemesine izin verse de, bir çekim adresi kaydedildikten sonra onu değiştirmek için bir protokol işlemi yoktur ve bu işlevselliği eklemek protokole gereksiz karmaşıklık katacaktır.

Esnek çekim yönetimi arayan kullanıcılar, doğrulayıcının çekim adresi olarak anahtar rotasyonu yapabilen bir akıllı sözleşme cüzdanı (örneğin bir [Safe](https://safe.global/)) ayarlayabilir ve böylece nihai alıcı EOA'nın güncellenmesine etkili bir şekilde izin verebilir. Bir kullanıcı çekim kimlik bilgisi olarak zaten bir EOA ayarlamışsa, stake ettiği ETH'yi kurtarmak için tam bir çıkış başlatmalı ve ardından bu fonları farklı kimlik bilgilerine sahip yeni bir doğrulayıcıyı etkinleştirmek için kullanmalıdır.
</ExpandableCard>

<ExpandableCard
title="Bir sağlayıcı veya staking havuzu aracılığıyla stake ediyorsam ya da likit staking tokenleri ile katılıyorsam staking'den nasıl çekim yapabilirim?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
Bir [staking havuzu](/staking/pools/) kullanıyorsanız veya likit staking tokenleri tutuyorsanız, protokolün çekim mekanizmasıyla doğrudan etkileşime girmezsiniz; havuzun akıllı sözleşmeleri ve düğüm operatörleri doğrulayıcıları kontrol eder ve çekim kimlik bilgileri genellikle size değil, havuzun sözleşmelerine işaret eder. Bunun yerine, genellikle tokenlerinizi sağlayıcı aracılığıyla (itfa kuyruğuna ve mevcut likiditeye tabi olarak) geri alırsınız veya açık piyasada satarsınız. Süreçler hizmete göre değiştiğinden, çekim işlemlerini nasıl ele aldıklarını öğrenmek için sağlayıcınızla iletişime geçin.

Genel olarak, bir sağlayıcı veya havuz aracılığıyla stake yaparken, temel stake edilmiş ETH'nizi geri almakta veya çekim yapıp kullandığınız staking sağlayıcısını değiştirmekte özgür olmalısınız. Belirli bir havuz çok büyüyorsa, stake edilen ETH'den çıkış yapılabilir, geri alınabilir ve [daha küçük bir sağlayıcı](https://rated.network/) ile tekrar stake edilebilir. Veya yeterince ETH biriktirdiyseniz, [evden stake](/staking/solo/) edebilirsiniz.
</ExpandableCard>

<ExpandableCard
title="Ağ ödüllerini talep etmek (kısmi çekimler) otomatik olarak mı gerçekleşir?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
**Eski (Tip 1) doğrulayıcılar** için evet; doğrulayıcınız bir çekim adresi sağladığı sürece. Herhangi bir çekim işlemini etkinleştirmek için bu bir kez sağlanmalıdır, ardından çekim adresine ağ ödülü dağıtımı, her doğrulayıcı taramasıyla birkaç günde bir otomatik olarak tetiklenecektir.

**Bileşik (Tip 2) doğrulayıcılar** için ödüller, çekim adresine taranmak yerine doğrulayıcının etkin bakiyesine (2048 ETH'ye kadar) eklenir. Otomatik taramalar yalnızca 2048 ETH'yi aşan bakiyeler için gerçekleşir. Bu eşiğin altındaki ödülleri çekmek için, yürütme katmanından manuel olarak kısmi bir çekim tetiklemeniz gerekir.
</ExpandableCard>

<ExpandableCard title="Özel bir miktar çekebilir miyim?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
**Eski (Tip 1) doğrulayıcılar** için, doğrulayıcının 32 ETH etkin bakiyesi üzerinde tahakkuk eden tüm ETH ağ ödülleri otomatik olarak çekim adresine gönderilir. Tam bir çekim işlemi gönderen ve staking çıkış sürecini tamamlayan Tip 1 doğrulayıcıların tüm ETH bakiyeleri çekim adreslerine çekilir. Bir Tip 1 doğrulayıcının manuel olarak belirli miktarlarda ETH çekilmesini talep etmesi mümkün değildir.

**Bileşik (Tip 2) doğrulayıcılar**, doğrulayıcının kalan bakiyesi 32 ETH veya üzerinde kaldığı sürece, yürütme katmanından belirli bir miktarın kısmi çekimlerini tetikleyebilir. Bu, kısmi bir çekim işlemi göndermeyi gerektirir ve gaz maliyeti vardır.
</ExpandableCard>

<ExpandableCard
title="Bir doğrulayıcı işletiyorum. Çekim sürecini yönetmek hakkında daha fazla bilgiyi nerede bulabilirim?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

Doğrulayıcı operatörlerinin, doğrulayıcınızı çekim işlemlerine nasıl hazırlayacağınız, olayların zamanlaması ve çekim işlemlerinin nasıl çalıştığı hakkında daha fazla ayrıntı bulabileceğiniz [Staking Launchpad Çekim İşlemleri](https://launchpad.ethereum.org/withdrawals/) sayfasını ziyaret etmeleri önerilir.

Kurulumunuzu önce bir test ağında denemek için başlamak üzere [Hoodi Test Ağı Staking Launchpad](https://hoodi.launchpad.ethereum.org)'i ziyaret edin.

</ExpandableCard>

<ExpandableCard
title="Çıkış yaptıktan sonra daha fazla ETH yatırarak doğrulayıcımı yeniden etkinleştirebilir miyim?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Hayır. Bir doğrulayıcı çıkış yaptıktan ve tüm bakiyesi çekildikten sonra, o doğrulayıcıya yatırılan herhangi bir ek ETH, bir sonraki doğrulayıcı taraması sırasında otomatik olarak çekim adresine transfer edilecektir. Bu ETH'yi kullanarak tekrar staking'e başlamak için yeni bir doğrulayıcıyı etkinleştirmelisiniz.
</ExpandableCard>

<ExpandableCard
title="Eski ve bileşik doğrulayıcılar arasındaki fark nedir?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Eski doğrulayıcılar **Tip 1** çekim kimlik bilgilerini kullanır (çekim kimlik bilgisi adresi 0x01 ile başlar) ve etkin bakiyeleri 32 ETH ile sınırlıdır. Ağ ödülleri olarak alınan fazla ETH, birkaç günde bir otomatik olarak çekim adresine taranır.

Bileşik doğrulayıcılar **Tip 2** çekim kimlik bilgilerini kullanır (çekim kimlik bilgisi adresi 0x02 ile başlar) ve 2048 ETH'ye kadar etkin bakiyeye sahip olabilirler. Ödüller, doğrulayıcının etkin bakiyesine eklenerek doğrulayıcının ağdaki ağırlığını ve gelecekteki ödülleri alma potansiyelini artırır. Otomatik taramalar yalnızca 2048 ETH'yi aşan bakiye için gerçekleşir. Bu eşiğin altındaki ETH'yi çekmek için yürütme katmanından manuel bir kısmi çekim tetiklenmelidir.

Daha fazla ayrıntı için [MaxEB derinlemesine incelemesine](/roadmap/pectra/maxeb/) bakın.
</ExpandableCard>

<ExpandableCard
title="Bileşik bir doğrulayıcıya nasıl geçiş yapabilirim?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
[Staking Launchpad](https://launchpad.ethereum.org/validator-actions)'i kullanarak Tip 1'den Tip 2 çekim kimlik bilgilerine dönüştürebilirsiniz. Bu işlem **geri alınamaz**; bir kez dönüştürdüğünüzde Tip 1 kimlik bilgilerine geri dönemezsiniz.

Dönüştürdükten sonra, birden fazla doğrulayıcıyı tek bir doğrulayıcıda **birleştirebilir** (konsolide edebilir) ve bakiyelerini tek bir bileşik doğrulayıcıda toplayabilirsiniz. Dönüştürme süreci, riskler ve birleştirme araçlarının tam bir açıklaması için [MaxEB derinlemesine incelemesine](/roadmap/pectra/maxeb/) bakın.
</ExpandableCard>

<ExpandableCard
title="Staking çekimleri ne zaman etkinleştirildi?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
Çekim işlevselliği ilk olarak **12 Nisan 2023**'te Şanghay/Capella yükseltmesinin bir parçası olarak etkinleştirildi. [Pectra yükseltmesi](/roadmap/pectra/) (Mayıs 2025) daha sonra 2048 ETH'lik daha yüksek bir maksimum etkin bakiyeye sahip bileşik doğrulayıcıların yanı sıra yürütme katmanı tetiklemeli çıkışları ve kısmi çekimleri tanıttı.

Şanghay/Capella yükseltmesi, daha önce stake edilmiş ETH'nin normal Ethereum hesaplarına geri alınmasını sağladı. Bu, staking likiditesi döngüsünü kapattı ve Ethereum'u sürdürülebilir, ölçeklenebilir, güvenli ve merkeziyetsiz bir ekosistem oluşturma yolculuğunda bir adım daha yaklaştırdı.

- [Ethereum tarihi hakkında daha fazlası](/ethereum-forks/)
- [Ethereum yol haritası hakkında daha fazlası](/roadmap/)
</ExpandableCard>

## Daha fazla bilgi {#further-reading}

- [Staking Launchpad Çekim İşlemleri](https://launchpad.ethereum.org/withdrawals)
- [Staking Launchpad Doğrulayıcı Eylemleri](https://launchpad.ethereum.org/validator-actions)
- [MaxEB derinlemesine incelemesi: bileşik getiri ve birleştirme](/roadmap/pectra/maxeb/)
- [EIP-4895: İşlem olarak işaret zinciri push çekimleri](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Potuz ve Hsiao-Wei Wang ile Stake Edilmiş ETH Çekimi (Test)](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Alex Stokes ile işlem olarak işaret zinciri push çekimleri](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Doğrulayıcı Etkin Bakiyesini Anlamak](https://www.attestant.io/posts/understanding-validator-effective-balance/)

<StakingCommunityCallout className="my-16" />