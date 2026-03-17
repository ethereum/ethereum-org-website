---
title: "Stake çekimleri"
description: "Hisseleme çekimlerinin ne olduğu, nasıl çalıştıkları ve ödüllerini almak içn paydaşların ne yapmaları gerektiğini özetleyen sayfa"
lang: tr
template: staking
image: /images/staking/leslie-withdrawal.png
alt: "Hisseleme ödülleri ile gergedan Leslie"
sidebarDepth: 2
summaryPoints:
  - Şangay/Capella yükseltmesi Ethereum'da hisseleme içerisindeki para çekme işlemlerini mümkün kıldı
  - Doğrulayıcı operatörler, etkinleştirmek için para çekme adresi sağlamalıdır
  - Ödüller birkaç günde bir otomatik olarak dağıtılır
  - Hisselemeden tamamen çıkan doğrulayıcılar kalan bakiyelerini geri alacaklardır
---

**Hisseleme para çekme işlemleri**, ETH'nin Ethereum'un mutabakat katmanındaki (İşaret Zinciri) bir doğrulayıcı hesabından, işlem yapılabileceği yürütme katmanına aktarılması anlamına gelir.

Kullanıcı tarafından bir para çekme adresi sağlandıktan sonra, 32 ETH'yi aşan **ödül bakiyesi ödemeleri**, her bir doğrulayıcıya bağlı olan bu adrese otomatik ve düzenli olarak gönderilir. Kullanıcılar ayrıca tüm doğrulayıcı bakiyelerinin kilidini açarak **hisselemeden tamamen çıkabilirler**.

## Hisseleme ödülleri {#staking-rewards}

Ödül ödemeleri, etkin bakiyeleri maksimum 32 ETH olan aktif doğrulayıcı hesaplar için otomatik olarak işlenir.

Ödüller yoluyla kazanılan 32 ETH'nin üzerindeki herhangi bir bakiye aslında esas paraya hiçbir katkıda bulunmaz veya bu doğrulayıcının ağ üzerindeki ağırlığını artırmaz. Bu nedenle birkaç günde bir ödül ödemesi olarak otomatik olarak çekilir. Bir seferlik para çekme adresi sağlamanın dışında bu ödüller doğrulayıcının başka bir işlem yapmasını gerektirmez. Tüm bunlar fikir birliği katmanında başlatılır, bu sayede herhangi bir adımda gaz (işlem ücreti) gerekmez.

### Buraya nasıl geldik? {#how-did-we-get-here}

Ethereum bir zamanlar olduğu gibi yoğun enerji tüketen madencilik yerine geçtiğimiz birkaç yıl boyunca geçirdiği ağ yükseltmeleri sayesinde ETH'nin kendisi tarafından güvence altına alınan bir ağ haline geldi. Ethereum mütabakatına katılım artık "hisseleme" olarak biliniyor, bu sistemde katılımcılar ağa katılım sağlayabilmek için ellerindeki ETH'yi kitleyip "kilitli" duruma getiriyorlar. Kurallara uyan kullanıcılar ödüllendirilecekken uymayanlar ve hile yapmaya çalışanlar ise cezalandırılabilirler.

Kasım 2020'deki hisseleme yatırım sözleşmesinin piyasaya sürülmesinden bu yana kimi cesur Ethereum öncüleri gönüllü olarak fonlarını ''doğrulayıcıları'', ağ kurallarını takip eden, resmi olarak blokları doğrulama ve önerme hakkına sahip özel hesapları aktif hale getirmek için kilitledi.

Shanghai/Capella yükseltmesinden önce hisselenmiş ETH'lerinizi kullanamaz veya onlara erişemezdiniz. Ancak şimdi, ödüllerinizi seçilmiş bir hesaba otomatik olarak aktarmak ve hisselenmiş ETH'lerinizi istediğiniz zaman çekmek için kaydolabilirsiniz.

### Nasıl hazırlanırım? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Önemli uyarılar {#important-notices}

Herhangi bir doğrulayıcı hesabının kendi bakiyesinden ETH çekebilir durumuna erişmesi için bir çekim adresi belirtmesi, gerekli adımdır.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
<strong>Her doğrulayıcı hesabına yalnızca bir kez, tek bir para çekme adresi atanabilir.</strong> Bir adres seçilip mutabakat katmanına gönderildikten sonra bu işlem geri alınamaz veya tekrar değiştirilemez. Göndermeden önce sağlanan adresin sahipliğini ve doğruluğunu iki kez kontrol edin.
</AlertDescription>
</AlertContent>
</Alert>

Aksini belirtmediğiniz için güvenlik kelimelerinizin çevrimdışı ortamda güvende kaldığı ve herhangi bir yolla ele geçirilemeyeceği varsayıldığından <strong>aynı zamanda bakiyelerinize herhangi bir tehdit de bulunmamaktadır</strong>. Para çekme kimliği ekleme başarısızlığı, çekim adresi belirtilene kadar ETH'nizi basit bir biçimde doğrulayıcı hesabında kilitli halde bırakacaktır.

## Hisselemeden tamamen çıkma {#exiting-staking-entirely}

Bir doğrulayıcı hesabı bakiyesinden _herhangi_ bir fonun transfer edilebilmesi için bir para çekme adresi sağlanması gerekir.

Hisselemeden tamamen çıkmak ve tüm bakiyelerini çekmek isteyen kullanıcılar, hisselemeden çıkış sürecini başlatacak ''gönüllü çıkış'' mesajını doğrulayıcı anahtarlarıyla birlikte imzalamak ve yayımlamak zorundadır. Bu, doğrulayıcı müşteriniz ile tamamlanır ve mutabakat düğümünüze kaydedilir, bundan ötürü herhangi bir gaz gerektirmez.

Bir doğrulayıcının hisselemeden çıkma süreci, kaç tane diğer doğrulayıcının da aynı zamanda çıktığına bağlı olarak değişken vakit alır. Bir kez tamamlandığında bu hesap artık doğrulayıcı hesap görevlerinden sorumlu olmayacak, ödül kazanma hakkı olmayacak ve ETH'leri daha fazla ''hisselemede'' kalmaycaktır. Bu sürede hesap, tamamen ''para çekilebilir'' olarak işaretlenecektir.

Bir hesap "para çekilebilir" olarak işaretlendikten ve de hesap para çekme bilgilerini sağladıktan sonra kullanıcın beklemekten başka yapması gereken bir şey yoktur. Hesaplar, uygun çıkış yapmış fonlar için blok önericileri tarafından otomatik ve sürekli olarak taranır ve hesap bakiyenizin tamamı ("tam para çekme" olarak da bilinir) bir sonraki <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>tarama</a> sırasında transfer edilir.

## Hisseleme para çekme işlemleri ne zaman etkinleştirildi? {#when}

Para çekme işlevi, **12 Nisan 2023**'te gerçekleşen Shanghai/Capella yükseltmesinin bir parçası olarak etkinleştirilmiştir.

Şangay/Capella yükseltmesi, daha önceden hisselenmiş ETH'lerin normal Ethereum hesaplarına geri alınabilmesini sağladı. Bu da likidite hisseleme döngüsünü kapattı; Ethereum'u daha sürdürülebilir, ölçeklenebilir ve de merkeziyetsiz ekosistem oluşturma yolculuğuna bir adım daha yaklaştırdı.

- [Ethereum'un geçmişi hakkında daha fazlası](/ethereum-forks/)
- [Ethereum yol haritası hakkında daha fazlası](/roadmap/)

## Para çekme ödemeleri nasıl çalışır? Para çekme işlemleri nasıl çalışır? {#how-do-withdrawals-work}

Belirli bir doğrulayıcının para çekmek için uygun olup olmadığı, söz konusu doğrulayıcının hesabının durumuna göre belirlenir. Bir hesabın para çekme işleminin başlatılıp başlatılamayacağına karar verebilmek için herhangi bir kullanıcı girdisine ihtiyaç yoktur; tüm süre otomatik bir fikir birliği katmanı üzerinden yürütülür.

### Görerek öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

Finematics tarafından sağlanmış Ethereum hisseleme çekim işlemleri açıklamasına buradan göz atabilirsiniz:

<YouTube id="RwwU3P9n3uo" />

### Doğrulayıcı "taraması" {#validator-sweeping}

Doğrulayıcının bir sonraki bloku önerebilmesi için 16 adede kadar uygun para çekme işleminden oluşan bir para çekme kuyruğu oluşturması gerekir. Bu başlangıçta doğrulayıcı indeksinin 0 ile başlayarak, bu hesabın protokolün kuralları gereğince para çekmeye uygun olup olmadığını belirleyerek ve uygunsa kuyruğa ekleyerek yapılır. Aşağıdaki bloku önermek için ayarlanan doğrulayıcı son blokun kaldığı yerden devam edecek ve sonsuza kadar bu sırayla ilerleyecek.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Analog bir saat düşünün. Saatin yelkovanı saati gösterir, tek yönde ilerler, hiçbir saati atlamaz ve son sayıya ulaşıldıktan sonra sonunda tekrar başa döner.<br/><br/>
Şimdi 1'den 12'ye kadar yerine, saatin 0'dan N'ye kadar olduğunu hayal edin <em>(Ocak 2023 itibarıyla 500.000'in üzerinde olan, mutabakat katmanına şimdiye kadar kaydedilmiş toplam doğrulayıcı hesap sayısı).</em><br/><br/>
Saatin yelkovanı, uygun para çekme işlemleri için kontrol edilmesi gereken bir sonraki doğrulayıcıyı gösterir. 0'dan başlar ve hiçbir hesabı atlamadan tüm çemberi dolaşır. Son doğrulayıcıya ulaşıldığında, döngü baştan devam eder.
</AlertDescription>
</AlertContent>
</Alert>

#### Para çekme işlemleri için bir hesabı kontrol etme {#checking-an-account-for-withdrawals}

Bir önerici muhtemel para çekme işlemleri için doğrulayıcıları süpürürken, kontrol edilen her bir doğrulayıcı bir para çekme işlemi gerçekleşip gerçekleşmediğini ve gerçekleşiyorsa ne kadar ETH'nin çekilmesi gerektiğini belirlemek için kısa bir soru serisi ile değerlendirilir.

1. **Bir para çekme adresi sağlandı mı?** Para çekme adresi sağlanmadıysa, hesap atlanır ve para çekme işlemi başlatılmaz.
2. **Doğrulayıcıdan çıkış yapıldı ve para çekilebilir durumda mı?** Doğrulayıcıdan tamamen çıkış yapıldıysa ve hesabının "çekilebilir" olarak kabul edildiği döneme ulaşıldıysa, tam para çekme işlemi gerçekleştirilir. Bu, kalan tüm bakiyeyi para çekme adresine transfer eder.
3. **Etkin bakiye 32'de en üst seviyeye ulaştı mı?** Hesabın para çekme kimlik bilgileri varsa, tamamen çıkış yapılmamışsa ve 32'nin üzerinde bekleyen ödülleri varsa, yalnızca 32'nin üzerindeki ödülleri kullanıcının para çekme adresine aktaran kısmi bir para çekme işlemi gerçekleştirilir.

Bir doğrulayıcının hayat döngüsü boyunca doğrulayıcı operatörleri tarafından alınan ve bu akımı etkileyen yalnızca iki eylem vardır:

- Herhangi bir para çekme formunu etkinleştirmek için para çekme kimliği sağlayın
- Tam para çekme sağlayan işlem olan ağdan çıkın

### Gas ücretsiz {#gas-free}

Hisseleme çekimlerine bu yaklaşım, belirli miktarda ETH'nin çekilmesi istenen bir işlemin manuel olarak paydaşlar için gerekmesinden kaçınır. Bu, **gas (işlem ücreti) gerekmediği** anlamına gelir ve para çekme işlemleri mevcut yürütme katmanı blok alanı için de rekabet etmez.

### Hisseleme ödüllerimi ne sıklıkla alacağım? Ne kadar sürede? {#how-soon}

Tek bir blokta en fazla 16 para çekme işlemi gerçekleştirilebilir. Bu hızda, her gün 115.200 doğrulayıcı para çekme işlemi (herhangi bir kayıp yuva olmadığını varsayarsak) işlenebilir. Yukarıda da belirtildiği üzere, para çekmeye uygun olmayan doğrulayıcılar süpürme süresini azaltarak atlanır.

Bu hesaplamayı genişleterek belirli sayıda para çekme işlemi için ne kadar süre gerektiğini tahmin edebiliriz:

<TableContainer>

| Para çekme işlemi sayısı | Tamamlanma süresi |
| :----------------------: | :---------------: |
|  400.000 |      3,5 gün      |
|  500.000 |      4,3 gün      |
|  600.000 |      5,2 gün      |
|  700.000 |      6,1 gün      |
|  800.000 |      7,0 gün      |

</TableContainer>

Gördüğünüz üzere bu, ağda daha fazla doğrulayıcı varlığında yavaşlar. Kayıp yuvalarda artış oransal olarak bunu yavaşlatır ancak bu, genellikle olası sonuçların daha yavaş kısmını temsil eder.

## Sıkça sorulan sorular {#faq}

<ExpandableCard
title="Bir para çekme adresi sağladıktan sonra bunu alternatif bir para çekme adresiyle değiştirebilir miyim?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Hayır, para çekme kimlik bilgilerini sağlama işlemi tek seferliktir ve gönderildikten sonra değiştirilemez.
</ExpandableCard>

<ExpandableCard
title="Para çekme adresi neden yalnızca bir kez ayarlanabilir?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Bir yürütme katmanı para çekme adresi ayarlayarak o doğrulayıcının para çekme kimlik bilgileri kalıcı olarak değiştirilmiş olur. Bunun anlamı da eski kimlik bilgilerinin artık çalışmayacağı ve yeni kimlik bilgilerinin doğrudan bir yürütme katmanı hesabına yönlendirileceğidir.

Para çekme adresleri ya akıllı sözleşme (kendi kodu ile kontrol edilen) ya da harici sahip olunan hesap (EOA, kendi özel anahtrarıyla kontrol edilen) olabilir. Şu anda bu hesapların doğrulayıcı kimlik bilgilerinde bir değişikliği işaret edecek bir fikir birliği katmanına geri iletme yolu yoktur ve bu işlevin eklenmesi de protokole gereksiz bir karmaşıklık katacaktır.

Belirli bir doğrulayıcı için para çekmeadresini değiştirmeye alternatif olarak, kullanıcılar anahtar döngüsünü yönetebilen, Safe gibi bir akıllı sözleşmeyi para çekme adresi olarak kullanmayı seçebilirler. Fonlarını kendi EOA'larına göre ayarlayan kullanıcılar, tüm hisselenmiş fonlarını çekebilmek için tam bir çıkış gerçekleştirebilir ve ardından yeni kimlik bilgilerini sunarak yeniden hisseleyebilirler.
</ExpandableCard>

<ExpandableCard
title="Stake tokenlerine veya havuzlu stake'e katılırsam ne olur?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Bir [hisseleme havuzunun](/staking/pools/) parçasıysanız veya staking token'ları tutuyorsanız, her hizmet farklı çalıştığından, hisseleme para çekme işlemlerinin nasıl ele alındığı hakkında daha fazla ayrıntı için sağlayıcınıza danışmalısınız.

Genel olarak kullanıcılar, temelde hisselenmiş ETH'lerini geri almakta veya kullandıkları hisseleme sağlayıcısını değiştirmekte özgürdür. Eğer spesifik bir havuz çok büyük hale geliyorsa fonlar çıkartılabilir, alınabilir ve <a href="https://rated.network/">daha küçük bir sağlayıcı</a> ile yeniden hisselenebilir. Veya yeterince ETH biriktirdiyseniz, [evden hisseleme yapabilirsiniz](/staking/solo/).
</ExpandableCard>

<ExpandableCard
title="Ödül ödemeleri (kısmi para çekme) otomatik olarak mı gerçekleşir?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Evet, doğrulayıcınız bir para çekme adresi sağladığı sürece. Bu herhangi bir para çekme işlemini etkinleştirmek için bir defa sağlanmalıdır, sonrasında ödül ödemeleri otomatik olarak birkaç günde bir her doğrulayıcı süpürmesinde çalışacaktır.
</ExpandableCard>

<ExpandableCard
title="Tam para çekme işlemleri otomatik olarak mı gerçekleşir?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Hayır eğer doğrulayıcınız hâlâ ağda aktif ise otomatik olarak tam bir para çekme gerçekleşmeyecektir. Bu, gönüllü çıkışı manuel olarak başlatmayı gerektirir.

Bir doğrulayıcı çıkış sürecini tamamladığında ve hesabın para çekme kredilerinin olduğunu varsayarsak kalan bakiye, <em>sonrasında</em> sıradaki <a href="#validator-sweeping">doğrulayıcı süpürmesinde</a> çekilecektir.
</ExpandableCard>

<ExpandableCard title="Özel bir tutar çekebilir miyim?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Para çekme işlemleri, kilide aktif olarak katkıda bulunmayan ETH'leri aktararak otomatik olarak yapılacak şekilde tasarlanmıştır. Bu, çıkış sürecini tamamlamış olan hesaplar için tüm bakiyeleri de kapsar.

Belirli miktarlarda ETH'nin çekilmesini manuel olarak talep etmek mümkün değildir.
</ExpandableCard>

<ExpandableCard
title="Bir doğrulayıcı işletiyorum. Para çekme işlemlerini etkinleştirme hakkında daha fazla bilgiyi nerede bulabilirim?"
eventCategory="FAQ"
eventAction="I operate a validator. Para çekme işlemlerini etkinleştirme hakkında daha fazla bilgiyi nerede bulabilirim?"
eventName="read more">

Doğrulayıcı operatörlerin <a href="https://launchpad.ethereum.org/withdrawals/">Hisseleme Başlama Noktası Para Çekme İşlemleri</a> sayfasını ziyaret etmesi önerilir. Burada doğrulayıcınızı para çekme işlemleri için nasıl hazılayacağınız, olayların zamanlanması ve para çekme işlemlerinin nasıl işlediği hakkında daha fazla ayrıntı bulabilirsiniz.

Kurulumunuzu önce bir test ağında denemek için, başlamak üzere <a href="https://hoodi.launchpad.ethereum.org">Hoodi Testnet Hisseleme Launchpad</a>'i ziyaret edin.
</ExpandableCard>

<ExpandableCard
title="Daha fazla ETH yatırarak çıkış yaptıktan sonra doğrulayıcımı yeniden etkinleştirebilir miyim?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Hayır. Bir doğrulayıcı çıktıktan ve tüm bakiyesi çekildikten sonra, bu doğrulayıcıya yatırılan tüm ek fonlar, bir sonraki doğrulayıcı süpürmesi sırasında otomatik olarak para çekme adresine aktarılacaktır. ETH'yi tekrar hisselemek için yeni bir doğrulayıcı aktive olmalıdır.
</ExpandableCard>

## Daha fazla kaynak {#further-reading}

- [Hisseleme Launchpad Para Çekme İşlemleri](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: İşlem olarak İşaret Zinciri zorunlu para çekme işlemleri](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Hisselenmiş ETH Çekme (Test Etme), Potuz ve Hsiao-Wei Wang ile](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: İşlem olarak İşaret Zinciri zorunlu para çekme işlemleri, Alex Stokes ile](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Doğrulayıcı Etkin Bakiyesini Anlama](https://www.attestant.io/posts/understanding-validator-effective-balance/)
