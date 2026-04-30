---
title: Hisseleme çekimleri
description: Hisseleme itme çekimlerinin ne olduğunu, nasıl çalıştıklarını ve hissedarların ödüllerini almak için ne yapmaları gerektiğini özetleyen sayfa
lang: tr
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Hisseleme ödülleriyle gergedan Leslie
sidebarDepth: 2
summaryPoints:
  - Doğrulayıcı operatörleri, çekimleri etkinleştirmek için bir çekim adresi sağlamalıdır
  - Eski doğrulayıcıların 32 ETH üzerindeki fazla bakiyesi birkaç günde bir otomatik olarak çekilir
  - Bileşik doğrulayıcılar, 2048 ETH'ye kadar olan tam bakiyeleri üzerinden ödül kazanırlar
  - Hisselemeden tamamen çıkan doğrulayıcılar kalan bakiyelerini alacaklardır
---

**Hisseleme çekimleri**, Ethereum'un mutabakat katmanındaki (İşaret Zinciri) bir doğrulayıcı hesabından, işlem yapılabileceği yürütme katmanına ETH transferlerini ifade eder.

Çekimlerin nasıl çalıştığı, doğrulayıcınızın çekim kimlik bilgisi türüne bağlıdır:

- **Eski doğrulayıcılar (Tip 1)**: 32 ETH'nin üzerindeki fazla bakiye, otomatik ve düzenli olarak doğrulayıcıya bağlı çekim adresine gönderilir. 32 ETH'nin üzerindeki ödüller, doğrulayıcının ağdaki ağırlığına katkıda bulunmaz.
- **Bileşik doğrulayıcılar (Tip 2)**: Ödüller, 2048 ETH'ye kadar doğrulayıcının efektif bakiyesine eklenerek bileşik hale gelir, doğrulayıcının ağırlığını artırır ve daha fazla ödül kazandırır. Yalnızca 2048 ETH'yi aşan bakiye otomatik olarak süpürülür.

Kullanıcılar ayrıca **hisselemeden tamamen çıkarak** tüm doğrulayıcı bakiyelerinin kilidini açabilirler.

## Hisseleme ödülleri {#staking-rewards}

Ödüllerin nasıl işlendiği, doğrulayıcının kimlik bilgisi türüne bağlıdır:

**Eski doğrulayıcıların (Tip 1)** efektif bakiyesi 32 ETH ile sınırlıdır. Ödüller yoluyla kazanılan 32 ETH'nin üzerindeki herhangi bir bakiye, anaparaya katkıda bulunmaz veya bu doğrulayıcının ağdaki ağırlığını artırmaz ve birkaç günde bir ödül ödemesi olarak otomatik olarak çekilir. Bir kereliğine bir çekim adresi sağlamanın dışında, bu ödüller doğrulayıcı operatöründen herhangi bir eylem gerektirmez. Bunların tümü mutabakat katmanında başlatılır, bu nedenle hiçbir adımda gaz (işlem ücreti) gerekmez.

**Bileşik doğrulayıcılar (Tip 2)**, 32 ile 2048 ETH arasında herhangi bir efektif bakiyeye sahip olabilir. Bu doğrulayıcılar tarafından kazanılan ödüller efektif bakiyelerine eklenerek bileşik hale gelir, doğrulayıcının ağırlığını ve gelecekteki ödüllerini artırır. Otomatik süpürmeler yalnızca 2048 ETH'yi aşan bakiye için gerçekleşir. 2048 ETH eşiğinin altındaki ödülleri çekmek için, bileşik doğrulayıcıların yürütme katmanından manuel olarak kısmi bir çekim tetiklemesi gerekir, bu da gaz gerektirir.

### Buraya nasıl geldik? {#how-did-we-get-here}

Geçtiğimiz birkaç yıl içinde [Ethereum](/), eskiden olduğu gibi enerji yoğun madencilik yerine ETH'nin kendisi tarafından güvence altına alınan bir ağa geçiş yapan çeşitli ağ yükseltmelerinden geçti. Ethereum'da mutabakata katılmak artık "hisseleme" olarak biliniyor, çünkü katılımcılar ağa katılma yeteneği için ETH'yi gönüllü olarak kilitleyerek "riske atıyorlar". Kurallara uyan kullanıcılar ödüllendirilirken, hile yapma girişimleri cezalandırılabilir.

Kasım 2020'de hisseleme yatırma sözleşmesinin başlatılmasından bu yana, bazı cesur Ethereum öncüleri, ağ kurallarını izleyerek blokları resmi olarak onaylama ve önerme hakkına sahip özel hesaplar olan "doğrulayıcıları" etkinleştirmek için fonlarını gönüllü olarak kilitlediler.

Shanghai/Capella yükseltmesinden önce, hisselenen ETH'nizi kullanamaz veya bunlara erişemezdiniz. Ancak şimdi, ödüllerinizi seçtiğiniz bir hesaba otomatik olarak almayı tercih edebilir ve ayrıca hisselenen ETH'nizi istediğiniz zaman çekebilirsiniz.

### Nasıl hazırlanırım? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Önemli uyarılar {#important-notices}

Bir çekim adresi sağlamak, bakiyesinden ETH çekilmeye uygun hale gelmeden önce herhangi bir doğrulayıcı hesabı için gerekli bir adımdır.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Her doğrulayıcı hesabına yalnızca bir kez, tek bir çekim adresi atanabilir.** Bir adres seçilip mutabakat katmanına gönderildikten sonra, bu işlem geri alınamaz veya tekrar değiştirilemez. Göndermeden önce sağlanan adresin sahipliğini ve doğruluğunu iki kez kontrol edin.
</AlertDescription>
</AlertContent>
</Alert>

Anımsatıcı/güvenlik kelimelerinizin çevrimdışı olarak güvende kaldığını ve hiçbir şekilde tehlikeye atılmadığını varsayarsak, bunu sağlamadığınız için **bu süre zarfında fonlarınıza yönelik hiçbir tehdit yoktur**. Çekim kimlik bilgilerinin eklenmemesi, bir çekim adresi sağlanana kadar ETH'yi doğrulayıcı hesabında kilitli bırakacaktır.

## Bileşik doğrulayıcılar {#compounding-validators}

Doğrulayıcılar, çekim kimlik bilgilerini Tip 1'den Tip 2'ye dönüştürerek **bileşik** hale getirmeyi seçebilirler. Bu, maksimum efektif bakiyeyi 32 ETH'den **2048 ETH'ye** yükselterek, ödüllerin otomatik olarak süpürülmek yerine doğrulayıcının efektif bakiyesine eklenerek bileşik hale gelmesini sağlar.

Bileşikleştirme etkinleştirildiğinde:

- Ödüller, doğrulayıcının efektif bakiyesini 1 ETH'lik artışlarla yükseltir (küçük bir [histerezis tamponuna](https://www.attestant.io/posts/understanding-validator-effective-balance/) tabidir) ve zamanla daha fazla ödül kazandırır
- Otomatik süpürmeler yalnızca 2048 ETH'yi aşan bakiye için gerçekleşir
- 2048 ETH eşiğinin altındaki kısmi çekimler yürütme katmanından manuel olarak tetiklenmelidir (bu gaz maliyeti gerektirir)
- Birden fazla doğrulayıcı, tek bir bileşik doğrulayıcıda **birleştirilebilir**, bu da operasyonel yükü azaltır

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Tip 1'den Tip 2 çekim kimlik bilgilerine dönüştürme işlemi geri alınamaz.** Bu dönüştürme için resmi araç olarak [Staking Launchpad](https://launchpad.ethereum.org/validator-actions)'i kullanın. Dönüştürme süreci, riskler ve birleştirme hakkında daha fazla ayrıntı için [MaxEB derinlemesine incelemesine](/roadmap/pectra/maxeb/) bakın.
</AlertDescription>
</AlertContent>
</Alert>

## Hisselemeden tamamen çıkış {#exiting-staking-entirely}

Bir doğrulayıcı hesap bakiyesinden _herhangi bir_ fon transfer edilmeden önce bir çekim adresi sağlanması gerekir.

Hisselemeden tamamen çıkmak ve tüm bakiyesini geri çekmek isteyen kullanıcılar "gönüllü çıkış" başlatmalıdır. Bu iki şekilde yapılabilir:

- **Doğrulayıcı anahtarlarını kullanarak**: Doğrulayıcı istemcinizle mutabakat düğümünüze gönderilen gönüllü bir çıkış mesajı imzalayın ve yayınlayın. Bu gaz gerektirmez.
- **Çekim kimlik bilgilerini kullanarak**: Doğrulayıcı imzalama anahtarına erişime ihtiyaç duymadan çekim adresinizi kullanarak yürütme katmanından bir çıkış tetikleyin. Bu bir işlem gerektirir ve gaz maliyeti vardır.

Bir doğrulayıcının hisselemeden çıkma süreci, aynı anda kaç kişinin çıktığına bağlı olarak değişken miktarda zaman alır. Tamamlandığında, bu hesap artık doğrulayıcı ağ görevlerini yerine getirmekten sorumlu olmayacak, artık ödüller için uygun olmayacak ve artık ETH'si "riske atılmış" olmayacaktır. Bu sırada hesap tamamen "çekilebilir" olarak işaretlenecektir.

Bir hesap "çekilebilir" olarak işaretlendikten ve çekim kimlik bilgileri sağlandıktan sonra, kullanıcının beklemek dışında yapması gereken başka bir şey yoktur. Hesaplar, uygun çıkış yapmış fonlar için blok önericileri tarafından otomatik ve sürekli olarak süpürülür ve hesap bakiyeniz bir sonraki <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>süpürme</a> sırasında tam olarak (aynı zamanda "tam çekim" olarak da bilinir) transfer edilecektir.

## Hisseleme çekimleri ne zaman etkinleştirildi? {#when}

Çekim işlevi ilk olarak **12 Nisan 2023**'te Shanghai/Capella yükseltmesinin bir parçası olarak etkinleştirildi. [Pectra yükseltmesi](/roadmap/pectra/) (Mayıs 2025) daha sonra 2048 ETH'lik daha yüksek bir maksimum efektif bakiyeye sahip bileşik doğrulayıcıların yanı sıra yürütme katmanı tetiklemeli çıkışlar ve kısmi çekimleri tanıttı.

Shanghai/Capella yükseltmesi, daha önce hisselenen ETH'nin normal Ethereum hesaplarına geri alınmasını sağladı. Bu, hisseleme likiditesi döngüsünü kapattı ve Ethereum'u sürdürülebilir, ölçeklenebilir, güvenli ve merkeziyetsiz bir ekosistem oluşturma yolculuğunda bir adım daha yaklaştırdı.

- [Ethereum tarihi hakkında daha fazlası](/ethereum-forks/)
- [Ethereum yol haritası hakkında daha fazlası](/roadmap/)

## Çekim ödemeleri nasıl çalışır? {#how-do-withdrawals-work}

Belirli bir doğrulayıcının çekim için uygun olup olmadığı, doğrulayıcı hesabının kendi durumu tarafından belirlenir. Bir hesap için çekim işleminin başlatılıp başlatılmayacağını belirlemek için herhangi bir zamanda kullanıcı girdisine gerek yoktur; tüm süreç mutabakat katmanı tarafından sürekli bir döngüde otomatik olarak gerçekleştirilir.

### Görsel öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

Finematics'in Ethereum hisseleme çekimleri hakkındaki bu açıklamasına göz atın:

<YouTube id="RwwU3P9n3uo" />

### Doğrulayıcı "süpürmesi" {#validator-sweeping}

Bir doğrulayıcının bir sonraki bloğu önermesi planlandığında, 16'ya kadar uygun çekimden oluşan bir çekim kuyruğu oluşturması gerekir. Bu, başlangıçta 0 numaralı doğrulayıcı dizininden başlayarak, protokol kurallarına göre bu hesap için uygun bir çekim olup olmadığını belirleyerek ve varsa kuyruğa ekleyerek yapılır. Bir sonraki bloğu önerecek olan doğrulayıcı, bir öncekinin kaldığı yerden devam edecek ve süresiz olarak sırayla ilerleyecektir.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Analog bir saat düşünün. Saatin akrebi saati gösterir, tek bir yönde ilerler, hiçbir saati atlamaz ve son sayıya ulaşıldığında sonunda tekrar başa döner.

Şimdi 1'den 12'ye kadar olmak yerine, saatin 0'dan N'ye kadar olduğunu hayal edin _(mutabakat katmanına şimdiye kadar kaydedilmiş toplam doğrulayıcı hesabı sayısı, Ocak 2023 itibarıyla 500.000'in üzerindedir)._

Saatin akrebi, uygun çekimler için kontrol edilmesi gereken bir sonraki doğrulayıcıyı gösterir. 0'dan başlar ve hiçbir hesabı atlamadan sonuna kadar ilerler. Son doğrulayıcıya ulaşıldığında, döngü tekrar baştan devam eder.
</AlertDescription>
</AlertContent>
</Alert>

#### Çekimler için bir hesabı kontrol etme {#checking-an-account-for-withdrawals}

Bir önerici olası çekimler için doğrulayıcıları süpürürken, kontrol edilen her doğrulayıcı, bir çekimin tetiklenip tetiklenmeyeceğini ve eğer öyleyse ne kadar ETH çekilmesi gerektiğini belirlemek için kısa bir dizi soruya göre değerlendirilir.

1. **Bir çekim adresi sağlandı mı?** Herhangi bir çekim adresi sağlanmadıysa, hesap atlanır ve hiçbir çekim başlatılmaz.
2. **Doğrulayıcı çıkış yaptı mı ve çekilebilir durumda mı?** Doğrulayıcı tamamen çıkış yaptıysa ve hesabının "çekilebilir" olarak kabul edildiği döneme ulaştıysak, tam bir çekim işlenecektir. Bu, kalan tüm bakiyeyi çekim adresine aktaracaktır.
3. **Bakiye maksimum efektif bakiyeyi aşıyor mu?** Eski (Tip 1) doğrulayıcılar için bu eşik 32 ETH'dir. Bileşik (Tip 2) doğrulayıcılar için bu eşik 2048 ETH'dir. Hesabın çekim kimlik bilgileri varsa, tamamen çıkış yapmamışsa ve eşiğinin üzerinde bakiyesi varsa, yalnızca fazlalığı kullanıcının çekim adresine aktaran kısmi bir çekim işlenecektir.

Bir doğrulayıcının yaşam döngüsü boyunca doğrulayıcı operatörleri tarafından alınan ve bu akışı doğrudan etkileyen yalnızca iki eylem vardır:

- Herhangi bir çekim biçimini etkinleştirmek için çekim kimlik bilgilerini sağlamak
- Tam bir çekimi tetikleyecek olan ağdan çıkış yapmak

### Gazsız {#gas-free}

Otomatik çekim süpürmeleri, hissedarların manuel olarak bir işlem göndermesini gerektirmez. Bu, otomatik süpürmeler için **hiçbir gaz (işlem ücreti) gerekmediği** ve mevcut yürütme katmanı blok alanı için rekabet etmedikleri anlamına gelir.

2048 ETH eşiğinin altında kısmi bir çekim tetiklemek isteyen [bileşik doğrulayıcıların](#compounding-validators) bunu yürütme katmanından manuel olarak yapması gerektiğini ve bunun gaz gerektirdiğini unutmayın.

### Hisseleme ödüllerimi ne sıklıkla alacağım? {#how-soon}

Tek bir blokta en fazla 16 çekim işlenebilir. Bu hızda, günde 115.200 doğrulayıcı çekimi işlenebilir (hiçbir yuvanın kaçırılmadığı varsayılarak). Yukarıda belirtildiği gibi, uygun çekimleri olmayan doğrulayıcılar atlanacak ve bu da süpürmeyi bitirme süresini azaltacaktır.

Bu hesaplamayı genişleterek, belirli sayıda çekimi işlemek için geçecek süreyi tahmin edebiliriz:

<TableContainer>

| Çekim sayısı | Tamamlanma süresi |
| :-------------------: | :--------------: |
|        400.000        |     3,5 gün     |
|        500.000        |     4,3 gün     |
|        600.000        |     5,2 gün     |
|        700.000        |     6,1 gün     |
|        800.000        |     7,0 gün     |

</TableContainer>

Gördüğünüz gibi, ağda daha fazla doğrulayıcı oldukça bu yavaşlar. Kaçırılan yuvalardaki bir artış bunu orantılı olarak yavaşlatabilir, ancak bu genellikle olası sonuçların daha yavaş tarafını temsil edecektir.

## Sıkça sorulan sorular {#faq}

<ExpandableCard
title="Bir çekim adresi sağladıktan sonra, bunu alternatif bir çekim adresiyle değiştirebilir miyim?"
eventCategory="FAQ"
eventAction="Bir çekim adresi sağladıktan sonra, bunu alternatif bir çekim adresiyle değiştirebilir miyim?"
eventName="read more">
Hayır, çekim kimlik bilgilerini sağlama süreci tek seferlik bir süreçtir ve gönderildikten sonra değiştirilemez.
</ExpandableCard>

<ExpandableCard
title="Bir çekim adresi neden yalnızca bir kez ayarlanabilir?"
eventCategory="FAQ"
eventAction="Bir çekim adresi neden yalnızca bir kez ayarlanabilir?"
eventName="read more">
Bir yürütme katmanı çekim adresi ayarlayarak, o doğrulayıcı için çekim kimlik bilgileri kalıcı olarak değiştirilmiş olur. Bu, eski kimlik bilgilerinin artık çalışmayacağı ve yeni kimlik bilgilerinin bir yürütme katmanı hesabına yönlendirileceği anlamına gelir.

Çekim adresleri bir akıllı sözleşme (kodu tarafından kontrol edilen) veya harici olarak sahip olunan bir hesap (EOA, özel anahtarı tarafından kontrol edilen) olabilir. Şu anda bu hesapların mutabakat katmanına doğrulayıcı kimlik bilgilerinde bir değişiklik sinyali verecek bir mesaj iletmesinin hiçbir yolu yoktur ve bu işlevi eklemek protokole gereksiz karmaşıklık katacaktır.

Belirli bir doğrulayıcı için çekim adresini değiştirmeye alternatif olarak kullanıcılar, Safe gibi anahtar döndürmeyi idare edebilecek bir akıllı sözleşmeyi çekim adresleri olarak ayarlamayı seçebilirler. Fonlarını kendi EOA'larına ayarlayan kullanıcılar, hisselenen tüm fonlarını çekmek için tam bir çıkış gerçekleştirebilir ve ardından yeni kimlik bilgilerini kullanarak yeniden hisseleyebilirler.
</ExpandableCard>

<ExpandableCard
title="Hisseleme jetonlarına veya havuzlu hisselemeye katılırsam ne olur?"
eventCategory="FAQ"
eventAction="Hisseleme jetonlarına veya havuzlu hisselemeye katılırsam ne olur?"
eventName="read more">

Bir [hisseleme havuzunun](/staking/pools/) parçasıysanız veya hisseleme jetonları tutuyorsanız, her hizmet farklı çalıştığından hisseleme çekimlerinin nasıl işlendiği hakkında daha fazla ayrıntı için sağlayıcınıza danışmalısınız.

Genel olarak kullanıcılar, temel hisselenen ETH'lerini geri almakta veya hangi hisseleme sağlayıcısını kullandıklarını değiştirmekte özgür olmalıdır. Belirli bir havuz çok büyüyorsa, fonlar çıkarılabilir, itfa edilebilir ve [daha küçük bir sağlayıcı](https://rated.network/) ile yeniden hisselenebilir. Veya yeterince ETH biriktirdiyseniz [evden hisseleyebilirsiniz](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Ödül ödemeleri (kısmi çekimler) otomatik olarak mı gerçekleşir?"
eventCategory="FAQ"
eventAction="Ödül ödemeleri (kısmi çekimler) otomatik olarak mı gerçekleşir?"
eventName="read more">
**Eski (Tip 1) doğrulayıcılar** için evet — doğrulayıcınız bir çekim adresi sağladığı sürece. Herhangi bir çekimi başlangıçta etkinleştirmek için bu bir kez sağlanmalıdır, ardından ödül ödemeleri her doğrulayıcı süpürmesiyle birkaç günde bir otomatik olarak tetiklenecektir.

**Bileşik (Tip 2) doğrulayıcılar** için ödüller süpürülmek yerine efektif bakiyeye eklenerek bileşik hale gelir. Otomatik süpürmeler yalnızca 2048 ETH'yi aşan bakiye için gerçekleşir. Bu eşiğin altındaki ödülleri çekmek için, yürütme katmanından manuel olarak kısmi bir çekim tetiklemeniz gerekir.
</ExpandableCard>

<ExpandableCard
title="Tam çekimler otomatik olarak mı gerçekleşir?"
eventCategory="FAQ"
eventAction="Tam çekimler otomatik olarak mı gerçekleşir?"
eventName="read more">

Hayır, doğrulayıcınız ağda hala aktifse, tam bir çekim otomatik olarak gerçekleşmeyecektir. Bu, manuel olarak gönüllü bir çıkış başlatmayı gerektirir.

Bir doğrulayıcı çıkış sürecini tamamladığında ve hesabın çekim kimlik bilgilerine sahip olduğu varsayıldığında, kalan bakiye _daha sonra_ bir sonraki <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "FAQ happen automatically (sweep)", eventName: "click" }}>doğrulayıcı süpürmesi</a> sırasında çekilecektir.

</ExpandableCard>

<ExpandableCard title="Özel bir miktar çekebilir miyim?"
eventCategory="FAQ"
eventAction="Özel bir miktar çekebilir miyim?"
eventName="read more">
**Eski (Tip 1) doğrulayıcılar** için çekimler otomatik olarak itilir ve hisseye aktif olarak katkıda bulunmayan herhangi bir ETH transfer edilir. Buna çıkış sürecini tamamlamış hesaplar için tam bakiyeler de dahildir. Tip 1 doğrulayıcılar için belirli miktarlarda ETH'nin çekilmesini manuel olarak talep etmek mümkün değildir.

**Bileşik (Tip 2) doğrulayıcılar**, kalan bakiye 32 ETH veya üzerinde kaldığı sürece yürütme katmanından belirli bir miktarın kısmi çekimlerini tetikleyebilir. Bu bir işlem gerektirir ve gaz maliyeti vardır.
</ExpandableCard>

<ExpandableCard
title="Bir doğrulayıcı işletiyorum. Çekimleri etkinleştirme hakkında daha fazla bilgiyi nerede bulabilirim?"
eventCategory="FAQ"
eventAction="Bir doğrulayıcı işletiyorum. Çekimleri etkinleştirme hakkında daha fazla bilgiyi nerede bulabilirim?"
eventName="read more">

Doğrulayıcı operatörlerinin, doğrulayıcınızı çekimlere nasıl hazırlayacağınız, olayların zamanlaması ve çekimlerin nasıl işlediği hakkında daha fazla ayrıntı bulabileceğiniz [Staking Launchpad Çekimleri](https://launchpad.ethereum.org/withdrawals/) sayfasını ziyaret etmeleri önerilir.

Kurulumunuzu önce bir test ağında denemek için başlamak üzere [Hoodi Test Ağı Staking Launchpad](https://hoodi.launchpad.ethereum.org) adresini ziyaret edin.

</ExpandableCard>

<ExpandableCard
title="Çıktıktan sonra daha fazla ETH yatırarak doğrulayıcımı yeniden etkinleştirebilir miyim?"
eventCategory="FAQ"
eventAction="Çıktıktan sonra daha fazla ETH yatırarak doğrulayıcımı yeniden etkinleştirebilir miyim?"
eventName="read more">
Hayır. Bir doğrulayıcı çıkış yaptıktan ve tüm bakiyesi çekildikten sonra, o doğrulayıcıya yatırılan herhangi bir ek fon, bir sonraki doğrulayıcı süpürmesi sırasında otomatik olarak çekim adresine aktarılacaktır. ETH'yi yeniden hisselemek için yeni bir doğrulayıcı etkinleştirilmelidir.
</ExpandableCard>

<ExpandableCard
title="Eski ve bileşik doğrulayıcılar arasındaki fark nedir?"
eventCategory="FAQ"
eventAction="Eski ve bileşik doğrulayıcılar arasındaki fark nedir?"
eventName="read more">
Eski doğrulayıcılar **Tip 1** çekim kimlik bilgilerini kullanır ve 32 ETH ile sınırlı bir efektif bakiyeye sahiptir. Herhangi bir fazlalık birkaç günde bir otomatik olarak çekim adresine süpürülür.

Bileşik doğrulayıcılar **Tip 2** çekim kimlik bilgilerini kullanır ve 2048 ETH'ye kadar efektif bakiyeye sahip olabilir. Ödüller efektif bakiyelerine eklenerek bileşik hale gelir, doğrulayıcının ağdaki ağırlığını ve gelecekteki ödüllerini artırır. Otomatik süpürmeler yalnızca 2048 ETH'yi aşan bakiye için gerçekleşir. Bu eşiğin altında çekim yapmak için yürütme katmanından manuel bir kısmi çekim tetiklenmelidir.

Daha fazla ayrıntı için [MaxEB derinlemesine incelemesine](/roadmap/pectra/maxeb/) bakın.
</ExpandableCard>

<ExpandableCard
title="Bileşik bir doğrulayıcıya nasıl dönüşürüm?"
eventCategory="FAQ"
eventAction="Bileşik bir doğrulayıcıya nasıl dönüşürüm?"
eventName="read more">
[Staking Launchpad](https://launchpad.ethereum.org/validator-actions) kullanarak Tip 1'den Tip 2 çekim kimlik bilgilerine dönüştürebilirsiniz. Bu işlem **geri alınamaz** — dönüştürdükten sonra Tip 1 kimlik bilgilerine geri dönemezsiniz.

Dönüştürdükten sonra, birden fazla doğrulayıcıyı tek bir doğrulayıcıda **birleştirebilir**, bakiyelerini tek bir bileşik doğrulayıcıda toplayabilirsiniz. Dönüştürme süreci, riskler ve birleştirme araçlarının tam bir incelemesi için [MaxEB derinlemesine incelemesine](/roadmap/pectra/maxeb/) bakın.
</ExpandableCard>

## Daha fazla bilgi {#further-reading}

- [Staking Launchpad Çekimleri](https://launchpad.ethereum.org/withdrawals)
- [Staking Launchpad Doğrulayıcı Eylemleri](https://launchpad.ethereum.org/validator-actions)
- [MaxEB derinlemesine incelemesi: bileşikleştirme ve birleştirme](/roadmap/pectra/maxeb/)
- [EIP-4895: İşlem olarak İşaret zinciri itme çekimleri](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Potuz ve Hsiao-Wei Wang ile Hisselenen ETH Çekimi (Test)](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Alex Stokes ile işlem olarak İşaret zinciri itme çekimleri](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Doğrulayıcı Efektif Bakiyesini Anlamak](https://www.attestant.io/posts/understanding-validator-effective-balance/)