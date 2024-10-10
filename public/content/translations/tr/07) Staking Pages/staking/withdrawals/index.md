---
title: Hisseden ödeme alma
description: Hisseleme çekimlerinin ne olduğu, nasıl çalıştıkları ve ödüllerini almak içn paydaşların ne yapmaları gerektiğini özetleyen sayfa
lang: tr
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Hisseleme ödülleri ile gergedan Leslie
sidebarDepth: 2
summaryPoints:
  - Şangay/Capella yükseltmesi Ethereum'da hisseleme içerisindeki para çekme işlemlerini mümkün kıldı
  - Doğrulayıcı operatörler, etkinleştirmek için para çekme adresi sağlamalıdır
  - Ödüller birkaç günde bir otomatik olarak dağıtılır
  - Hisselemeden tamamen çıkan doğrulayıcılar kalan bakiyelerini geri alacaklardır
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
12 Nisan 2023'te gerçekleşen Şangay/Capella yükseltmesiyle birlikte hisseleme çekim işlemleri etkinleştirildi.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Şangay/Capella ile ilgili daha fazlası</a>
</UpgradeStatus>

**Hisseleme çekimleri** Ethereum fikir birliği katmanındaki (İşaret Zinciri) bir doğrulayıcı hesabından, beraber işletilebileceği yürütüm katmanına ETH transferlerine karşılık gelir.

32 ETH'den **fazla bakiyenin ödül ödemeleri** her bir doğrulayıcı ile ilişkilendirilmiş para çekme adresine, her kullanıcı tarafından sağlanır sağlanmaz otomatik ve düzenli olarak gönderilir. Kullanıcılar ayrıca tüm doğrulayıcı bakiyesinin kilidini açarak **hisselemeden toptan çıkabilir**.

## Hisseleme ödülleri {#staking-rewards}

Ödül ödemeleri, etkin bakiyeleri maksimum 32 ETH olan aktif doğrulayıcı hesaplar için otomatik olarak işlenir.

Ödüller yoluyla kazanılan 32 ETH'nin üzerindeki herhangi bir bakiye aslında esas paraya hiçbir katkıda bulunmaz veya bu doğrulayıcının ağ üzerindeki ağırlığını artırmaz. Bu nedenle birkaç günde bir ödül ödemesi olarak otomatik olarak çekilir. Bir seferlik para çekme adresi sağlamanın dışında bu ödüller doğrulayıcının başka bir işlem yapmasını gerektirmez. Tüm bunlar fikir birliği katmanında başlatılır, bu sayede herhangi bir adımda gaz (işlem ücreti) gerekmez.

### Buraya nasıl geldik? {#how-did-we-get-here}

Ethereum bir zamanlar olduğu gibi yoğun enerji tüketen madencilik yerine geçtiğimiz birkaç yıl boyunca geçirdiği ağ yükseltmeleri sayesinde ETH'nin kendisi tarafından güvence altına alınan bir ağ haline geldi. Ethereum mütabakatına katılım artık "hisseleme" olarak biliniyor, bu sistemde katılımcılar ağa katılım sağlayabilmek için ellerindeki ETH'yi kitleyip "kilitli" duruma getiriyorlar. Kurallara uyan kullanıcılar ödüllendirilecekken uymayanlar ve hile yapmaya çalışanlar ise cezalandırılabilirler.

Kasım 2020'deki hisseleme yatırım sözleşmesinin piyasaya sürülmesinden bu yana kimi cesur Ethereum öncüleri gönüllü olarak fonlarını ''doğrulayıcıları'', ağ kurallarını takip eden, resmi olarak blokları doğrulama ve önerme hakkına sahip özel hesapları aktif hale getirmek için kilitledi.

Shanghai/Capella yükseltmesinden önce hisselenmiş ETH'lerinizi kullanamaz veya onlara erişemezdiniz. Ancak şimdi, ödüllerinizi seçilmiş bir hesaba otomatik olarak aktarmak ve hisselenmiş ETH'lerinizi istediğiniz zaman çekmek için kaydolabilirsiniz.

### Nasıl hazırlanırım? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Önemli bildiriler {#important-notices}

Herhangi bir doğrulayıcı hesabının kendi bakiyesinden ETH çekebilir durumuna erişmesi için bir çekim adresi belirtmesi, gerekli adımdır.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Her bir doğrulayıcı hesabı bir seferde yalnızca bir para çekme adresi atayabilir.</strong> Bir adres seçilip fikir birliği katmanına kaydedildiğinde bu, geri alınamaz veya tekrardan değiştirilemez. Kaydetmeden önce sahipliği ve bildirilen adresin doğruluğunu iki defa kontrol edin.
</InfoBanner>

Aksini belirtmediğiniz için güvenlik kelimelerinizin çevrimdışı ortamda güvende kaldığı ve herhangi bir yolla ele geçirilemeyeceği varsayıldığından <strong>aynı zamanda bakiyelerinize herhangi bir tehdit de bulunmamaktadır</strong>. Para çekme kimliği ekleme başarısızlığı, çekim adresi belirtilene kadar ETH'nizi basit bir biçimde doğrulayıcı hesabında kilitli halde bırakacaktır.

## Hisselemeden tamamen çıkış {#exiting-staking-entirely}

Doğrulayıcı hesap bakiyesinin dışına _herhangi bir_ fon gönderilebilmesi için çekim adresi belirtilmesi gerekir.

Hisselemeden tamamen çıkmak ve tüm bakiyelerini çekmek isteyen kullanıcılar, hisselemeden çıkış sürecini başlatacak ''gönüllü çıkış'' mesajını doğrulayıcı anahtarlarıyla birlikte imzalamak ve yayımlamak zorundadır. Bu, doğrulayıcı müşteriniz ile tamamlanır ve mutabakat düğümünüze kaydedilir, bundan ötürü herhangi bir gaz gerektirmez.

Bir doğrulayıcının hisselemeden çıkma süreci, kaç tane diğer doğrulayıcının da aynı zamanda çıktığına bağlı olarak değişken vakit alır. Bir kez tamamlandığında bu hesap artık doğrulayıcı hesap görevlerinden sorumlu olmayacak, ödül kazanma hakkı olmayacak ve ETH'leri daha fazla ''hisselemede'' kalmaycaktır. Bu sürede hesap, tamamen ''para çekilebilir'' olarak işaretlenecektir.

Bir hesap "para çekilebilir" olarak işaretlendikten ve de hesap para çekme bilgilerini sağladıktan sonra kullanıcın beklemekten başka yapması gereken bir şey yoktur. Hesaplar, uygun çıkış fonları için otomatik ve devamlı olarak blok teklif verenleri tarafından süpürülüyor ve hesap bakiyeniz bir sonraki <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>süpürülmede</a>tamamen süprülüyor (tam para çekme olarak da bilinir).

## Hisseleme çekim işlemleri ne zaman aktifleşir? {#when}

Hisseleme çekimleri aktif! Para çekebilme işlevi 12 Nisan 2023'te gerçekleşen Şangay/Capella yükseltmesinin bir kısmı sonucu aktifleştirildi.

Şangay/Capella yükseltmesi, daha önceden hisselenmiş ETH'lerin normal Ethereum hesaplarına geri alınabilmesini sağladı. Bu da likidite hisseleme döngüsünü kapattı; Ethereum'u daha sürdürülebilir, ölçeklenebilir ve de merkeziyetsiz ekosistem oluşturma yolculuğuna bir adım daha yaklaştırdı.

- [Ethereum'un tarihçesi hakkında daha fazla bilgi](/history/)
- [Ethereum'un yol haritası hakkında daha fazla bilgi](/roadmap/)

## Para çekme ödemeleri nasıl çalışır? {#how-do-withdrawals-work}

Belirli bir doğrulayıcının para çekmek için uygun olup olmadığı, söz konusu doğrulayıcının hesabının durumuna göre belirlenir. Bir hesabın para çekme işleminin başlatılıp başlatılamayacağına karar verebilmek için herhangi bir kullanıcı girdisine ihtiyaç yoktur; tüm süre otomatik bir fikir birliği katmanı üzerinden yürütülür.

### Görsel olarak öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

Finematics tarafından sağlanmış Ethereum hisseleme çekim işlemleri açıklamasına buradan göz atabilirsiniz:

<YouTube id="RwwU3P9n3uo" />

### Doğrulayıcı "süpürülmesi" {#validator-sweeping}

Doğrulayıcının bir sonraki bloku önerebilmesi için 16 adede kadar uygun para çekme işleminden oluşan bir para çekme kuyruğu oluşturması gerekir. Bu başlangıçta doğrulayıcı indeksinin 0 ile başlayarak, bu hesabın protokolün kuralları gereğince para çekmeye uygun olup olmadığını belirleyerek ve uygunsa kuyruğa ekleyerek yapılır. Aşağıdaki bloku önermek için ayarlanan doğrulayıcı son blokun kaldığı yerden devam edecek ve sonsuza kadar bu sırayla ilerleyecek.

<InfoBanner emoji="🕛">
Analog bir saat düşünün. Saatteki akrep saate işaret eder, bir yönde ilerler, herhangi bir saati atlamaz ve eninde sonunda son sayıya ulaşıldıktan sonra tekrardan başa sarar.<br/><br/>
Şimdi 1 ile 12 arası yerine, saatin 0 ile N <em>(fikir birliği katmanına şimdiye kadar kayıt olmuş tüm doğrulayıcı hesaplarının sayısı, Ocak 2023 itibariyle 500.000) arasına sahip olduğunu düşünün.</em><br/><br/>
Saatin akrebi para çekme uygunluğu için kontrol edilmesi gereken sıradaki doğrulayıcıya işaret edecektir. 0 ile başlar ve hiçbir sayıyı atlamadan tüm yol boyunca devam eder. Son doğrulayıcıya ulaşıldığında döngü baştan başlayarak devam eder.
</InfoBanner>

#### Para çekme işlemleri için hesabı kontrol etme {#checking-an-account-for-withdrawals}

Bir önerici muhtemel para çekme işlemleri için doğrulayıcıları süpürürken, kontrol edilen her bir doğrulayıcı bir para çekme işlemi gerçekleşip gerçekleşmediğini ve gerçekleşiyorsa ne kadar ETH'nin çekilmesi gerektiğini belirlemek için kısa bir soru serisi ile değerlendirilir.

1. **Bir para çekme adresi sağlandı mı?** Eğer herhangi bir para çekme adresi sağlanmadıysa hesap atlanır ve hiçbir para çekme işlemi başlatılmaz.
2. **Doğrulayıcı çıktı mı ve para çekilebilir mi?** Eğer doğrulayıcı tamamen çıkmış ve hesabın ''para çekilebilir'' olarak değerlendirildiği döneme ulaşmışsak tam para çekimi işletilir. Bu, kalan tüm bakiyeyi para çekme adresine transfer eder.
3. **İşlevsel bakiye 32'de azamiye ulaştı mı?** Eğer hesap para çekme kriterlerine ulaşmış, tamamen çıkmamış ve 32'den fazla ödüle sahipse yalnızca 32'nin üzerindeki ödülleri kullanıcıların para çekme adreslerine transfer edecek kısmi bir para çekme işlemi sürdürülür.

Bir doğrulayıcının hayat döngüsü boyunca doğrulayıcı operatörleri tarafından alınan ve bu akımı etkileyen yalnızca iki eylem vardır:

- Herhangi bir para çekme formunu etkinleştirmek için para çekme kimliği sağlayın
- Tam para çekme sağlayan işlem olan ağdan çıkın

### Gazsız {#gas-free}

Hisseleme çekimlerine bu yaklaşım, belirli miktarda ETH'nin çekilmesi istenen bir işlemin manuel olarak paydaşlar için gerekmesinden kaçınır. Bu, **herhangi bir gaz (işlem ücreti) gerektirmez** ve ayrıca para çekme işlemleri, var olan yürütüm katmanı blok hacmi için yarışmaz.

### Hisseleme ödüllerimi ne sıklıkla alacağım? {#how-soon}

Tek bir blokta en fazla 16 para çekme işlemi gerçekleştirilebilir. Bu hızda, her gün 115.200 doğrulayıcı para çekme işlemi (herhangi bir kayıp yuva olmadığını varsayarsak) işlenebilir. Yukarıda da belirtildiği üzere, para çekmeye uygun olmayan doğrulayıcılar süpürme süresini azaltarak atlanır.

Bu hesaplamayı genişleterek belirli sayıda para çekme işlemi için ne kadar süre gerektiğini tahmin edebiliriz:

<TableContainer>

| Para çekme sayısı | Tamamlanma zamanı |
| :-------------------: | :--------------: |
| 400.000 | 3,5 gün |
| 500.000 | 4,3 gün |
| 600.000 | 5,2 gün |
| 700.000 | 6,1 gün |
| 800.000 | 7,0 gün |

</TableContainer>

Gördüğünüz üzere bu, ağda daha fazla doğrulayıcı varlığında yavaşlar. Kayıp yuvalarda artış oransal olarak bunu yavaşlatır ancak bu, genellikle olası sonuçların daha yavaş kısmını temsil eder.

## Sıkça sorulan sorular {#faq}

<ExpandableCard
title="Bir para çekme adresi sağladıktan sonra bunu yeni alternatif bir para çekme adresi ile değiştirebilir miyim?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Hayır, çünkü para çekme kimlik bilgilerini sağlama süreci tek seferlik bir süreçtir bu yüzden gönderildikten sonra değiştirilemez.
</ExpandableCard>

<ExpandableCard
title="Para çekme adresi neden yalnızda bir sefer belirlenebilir?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Bir yürütme katmanı para çekme adresi belirleyerek söz konusu doğrulayıcı için para çekme kimlik bilgileri kalıcı olarak değiştirilmiştir. Bunun anlamı da eski kimlik bilgilerinin artık çalışmayacağı ve yeni kimlik bilgilerinin doğrudan bir yürütme katmanı hesabına yönlendirileceğidir.

Para çekme adresleri ya akıllı sözleşme (kendi kodu ile kontrol edilen) ya da harici sahip olunan hesap (EOA, kendi özel anahtrarıyla kontrol edilen) olabilir. Şu anda bu hesapların doğrulayıcı kimlik bilgilerinde bir değişikliği işaret edecek bir fikir birliği katmanına geri iletme yolu yoktur ve bu işlevin eklenmesi de protokole gereksiz bir karmaşıklık katacaktır.

Belirli bir doğrulayıcı için para çekmeadresini değiştirmeye alternatif olarak, kullanıcılar anahtar döngüsünü yönetebilen, Safe gibi bir akıllı sözleşmeyi para çekme adresi olarak kullanmayı seçebilirler. Fonlarını kendi EOA'larına göre ayarlayan kullanıcılar, tüm hisselenmiş fonlarını çekebilmek için tam bir çıkış gerçekleştirebilir ve ardından yeni kimlik bilgilerini sunarak yeniden hisseleyebilirler.
</ExpandableCard>

<ExpandableCard
title="Hisseleme token'larında ya da havuzlanmış hisselemede yer alırsam"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Eğer bir <a href="/staking/pools/">paydaşlık havuzunun</a> parçasıysanız veya hisseleme token'ları tutuyorsanız, her bir servis farklı çalıştığı için hisseleme çekimlerinin nasıl yapıldığıyla ilgili daha fazla detay için sağlayıcınıza danışın.

Genel olarak kullanıcılar, temelde hisselenmiş ETH'lerini geri almakta veya kullandıkları hisseleme sağlayıcısını değiştirmekte özgürdür. Eğer spesifik bir havuz çok büyük hale geliyorsa fonlar çıkartılabilir, alınabilir ve <a href="https://rated.network/">daha küçük bir sağlayıcı</a> ile yeniden hisselenebilir. Ya da yeterince ETH biriktirdiyseniz <a href="/staking/solo/">evden hisseleyebilirsiniz</a>.

</ExpandableCard>

<ExpandableCard
title="Ödül ödemeleri (kısmi para çekme işlemleri) otomatik olarak gerçekleşir mi?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Evet, doğrulayıcınız bir para çekme adresi sağladığı sürece. Bu herhangi bir para çekme işlemini etkinleştirmek için bir defa sağlanmalıdır, sonrasında ödül ödemeleri otomatik olarak birkaç günde bir her doğrulayıcı süpürmesinde çalışacaktır.
</ExpandableCard>

<ExpandableCard
title="Tam para çekme işlemleri otomatik olarak gerçekleşir mi?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Hayır eğer doğrulayıcınız hâlâ ağda aktif ise otomatik olarak tam bir para çekme gerçekleşmeyecektir. Bu, gönüllü çıkışı manuel olarak başlatmayı gerektirir.

Bir doğrulayıcı çıkış sürecini tamamladığında ve hesabın para çekme kredilerinin olduğunu varsayarsak kalan bakiye, <em>sonrasında</em> sıradaki <a href="#validator-sweeping">doğrulayıcı süpürmesinde</a> çekilecektir.

</ExpandableCard>

<ExpandableCard title="Özel bir tutarı çekebilir miyim?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Para çekme işlemleri otomatik olarak kilitlemeye katkısı olmayan herhangi bir ETH'yi atmaya yönelik düzenlenmiştir. Bu, çıkış sürecini tamamlamış olan hesaplar için tüm bakiyeleri de kapsar.

Belirli miktarlarda ETH'nin çekilmesini manuel olarak talep etmek mümkün değildir.
</ExpandableCard>

<ExpandableCard
title="Doğrulayıcı yürütüyorum. Para çekme işlemlerini etkinleştirmek için daha fazla bilgiye nereden ulaşabilirim?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Doğrulayıcı operatörlerin <a href="https://launchpad.ethereum.org/withdrawals/">Hisseleme Başlama Noktası Para Çekme İşlemleri</a> sayfasını ziyaret etmesi önerilir. Burada doğrulayıcınızı para çekme işlemleri için nasıl hazılayacağınız, olayların zamanlanması ve para çekme işlemlerinin nasıl işlediği hakkında daha fazla ayrıntı bulabilirsiniz.

Sisteminizi ilk olarak bir test ağında denemek için öncelikle <a href="https://holesky.launchpad.ethereum.org">Holesky Test Ağı Hisseleme Başlama Noktası</a>'nı ziyaret edin.

</ExpandableCard>

<ExpandableCard
title="Daha fazla ETH yatırarak çıktıktan sonra kendi doğrulayıcımı tekrar aktive debilir miyim?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Hayır. Bir doğrulayıcı çıktıktan ve tüm bakiyesi çekildikten sonra, bu doğrulayıcıya yatırılan tüm ek fonlar, bir sonraki doğrulayıcı süpürmesi sırasında otomatik olarak para çekme adresine aktarılacaktır. ETH'yi tekrar hisselemek için yeni bir doğrulayıcı aktive olmalıdır.
</ExpandableCard>

## Daha fazla bilgi {#further-reading}

- [Hisseleme Başlama Noktası Para Çekme İşlemleri](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: İşlem olarak işaret zinciri para çekme işlemleri](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Kedi Çobanları - Şangay](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Potuz ve Hsiao-Wei Wang ile Kilitli ETH Çekimi (Test)](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Operasyon olarak Alex Stokes ile işaret zincirinde zorla para çekme işlemleri](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Doğrulayıcının Geçerli Bakiyesini Anlamak](https://www.attestant.io/posts/understanding-validator-effective-balance/)
