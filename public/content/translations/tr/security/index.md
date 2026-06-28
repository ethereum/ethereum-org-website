---
title: Ethereum güvenliği ve dolandırıcılığı önleme
description: Ethereum'da güvende kalmak
lang: tr
---

Kripto paraya artan ilgi, dolandırıcılar ve bilgisayar korsanlarından kaynaklanan büyüyen riskleri de beraberinde getiriyor. Bu makale, bu riskleri azaltmak için bazı en iyi uygulamaları ortaya koymaktadır.

**Unutmayın: ethereum.org'dan hiç kimse sizinle asla iletişime geçmeyecektir. Resmi Ethereum destek ekibinden geldiğini iddia eden e-postalara yanıt vermeyin.**

<Divider />

## Kripto güvenliği 101 {#crypto-security}

### Bilginizi artırın {#level-up-your-knowledge}

Kriptonun nasıl çalıştığına dair yanlış anlamalar maliyetli hatalara yol açabilir. Örneğin, birisi özel anahtarlarınız karşılığında kaybolan ETH'yi iade edebilecek bir müşteri hizmetleri temsilcisi gibi davranıyorsa, [Ethereum](/)'un bu tür bir işlevsellikten yoksun merkeziyetsiz bir ağ olduğunu anlamayan insanları avlıyordur. Ethereum'un nasıl çalıştığı konusunda kendinizi eğitmek değerli bir yatırımdır.

<DocLink href="/what-is-ethereum/">
  Ethereum nedir?
</DocLink>

<DocLink href="/what-is-ether/">
  Ether nedir?
</DocLink>
<Divider />

## Cüzdan güvenliği {#wallet-security}

### Kurtarma ifadenizi asla paylaşmayın {#protect-private-keys}

**Hiçbir nedenle kurtarma ifadenizi veya özel anahtarlarınızı asla paylaşmayın!**

Kurtarma ifadeniz (gizli kurtarma ifadesi veya kurtarma ifadesi olarak da adlandırılır) cüzdanınızın ana anahtarıdır. Buna sahip olan herkes tüm hesaplarınıza erişebilir ve her varlığı boşaltabilir. Özel anahtarlar bireysel hesaplar için aynı şekilde çalışır. Hiçbir meşru hizmet, destek temsilcisi veya web sitesi bunları sizden asla istemez.

<DocLink href="/wallets/">
  Ethereum cüzdanı nedir?
</DocLink>

#### Kurtarma ifadelerinizin/özel anahtarlarınızın ekran görüntülerini almayın {#screenshot-private-keys}

Kurtarma ifadelerinizin veya özel anahtarlarınızın ekran görüntüsünü almak, onları bir bulut veri sağlayıcısıyla eşzamanlayabilir ve bu da onları bilgisayar korsanları için erişilebilir hale getirebilir. Buluttan özel anahtarlar elde etmek, bilgisayar korsanları için yaygın bir saldırı vektörüdür.

### Bir donanım cüzdanı kullanın {#use-hardware-wallet}

Bir donanım cüzdanı, özel anahtarlar için çevrimdışı depolama sağlar. Özel anahtarlarınızı saklamak için en güvenli cüzdan seçeneği olarak kabul edilirler: özel anahtarınız internete asla temas etmez ve cihazınızda tamamen yerel kalır.

Özel anahtarları çevrimdışı tutmak, bir bilgisayar korsanı bilgisayarınızın kontrolünü ele geçirse bile saldırıya uğrama riskini büyük ölçüde azaltır.

#### Bir donanım cüzdanı deneyin: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Göndermeden önce işlemleri iki kez kontrol edin {#double-check-transactions}

Yanlış cüzdan adresine yanlışlıkla kripto göndermek yaygın bir hatadır. **Ethereum'da gönderilen bir işlem geri alınamaz.** Adres sahibini tanımıyorsanız ve fonunuzu size geri göndermeye ikna edemezseniz, fonlarınızı geri alamazsınız.

Bir işlem göndermeden önce her zaman gönderdiğiniz adresin istenen alıcının adresiyle tam olarak eşleştiğinden emin olun.
Bir akıllı sözleşme ile etkileşime girerken imzalamadan önce işlem mesajını okumak iyi bir uygulamadır.

### Akıllı sözleşme harcama limitleri belirleyin {#spend-limits}

Akıllı sözleşmelerle etkileşime girerken sınırsız harcama limitlerine izin vermeyin. Sınırsız bir harcama, akıllı sözleşmenin cüzdanınızı boşaltmasına olanak tanıyabilir. Bunun yerine, harcama limitlerini yalnızca işlem için gerekli olan miktara ayarlayın.

Birçok Ethereum cüzdanı, hesapların boşaltılmasına karşı koruma sağlamak için limit koruması sunar.

[Kripto fonlarınıza akıllı sözleşme erişimi nasıl iptal edilir](/guides/how-to-revoke-token-access/)

<Divider />

## Yaygın dolandırıcılıklar {#common-scams}

Dolandırıcıları tamamen durdurmak imkansızdır, ancak en çok kullandıkları tekniklerin farkında olarak onları daha az etkili hale getirebiliriz. Bu dolandırıcılıkların birçok varyasyonu vardır, ancak genellikle aynı üst düzey kalıpları izlerler. Başka hiçbir şey olmasa bile şunları unutmayın:

- her zaman şüpheci olun
- kimse size ücretsiz veya indirimli ETH vermeyecek
- kimsenin özel anahtarlarınıza veya kişisel bilgilerinize erişmesine gerek yoktur

### Twitter reklam kimlik avı {#ad-phishing}

![Twitter link phishing](./twitterPhishingScam.png)

Kullanıcıları potansiyel olarak meşru bir web sitesini ziyaret ettiklerini düşünmeleri için kandırmak amacıyla Twitter'ın (X olarak da bilinir) bağlantı önizleme özelliğini (açma) taklit etmeye yönelik bir yöntem vardır. Bu teknik, Twitter'ın tweetlerde paylaşılan URL'lerin önizlemelerini oluşturma mekanizmasını istismar eder ve örneğin (yukarıda gösterildiği gibi) _ethereum.org'dan_ gösterir, oysa aslında kötü niyetli bir siteye yönlendiriliyorlardır.

Özellikle bir bağlantıya tıkladıktan sonra her zaman doğru alan adında olduğunuzu kontrol edin.

[Buradan daha fazla bilgi edinebilirsiniz](https://harrydenley.com/faking-twitter-unfurling).

### Çekiliş dolandırıcılığı {#giveaway}

Kripto paradaki en yaygın dolandırıcılıklardan biri çekiliş dolandırıcılığıdır. Çekiliş dolandırıcılığı birçok biçimde olabilir, ancak genel fikir, sağlanan cüzdan adresine ETH gönderirseniz, ETH'nizi iki katına çıkmış olarak geri alacağınızdır. *Bu nedenle, 1'e 2 dolandırıcılığı olarak da bilinir.*

Bu dolandırıcılıklar genellikle sahte bir aciliyet hissi yaratmak için çekilişi talep etmek üzere sınırlı bir fırsat süresi şart koşar.

### Sosyal medya hackleri {#social-media-hacks}

Bunun yüksek profilli bir versiyonu, Temmuz 2020'de önde gelen ünlülerin ve kuruluşların Twitter hesaplarının hacklenmesiyle meydana geldi. Bilgisayar korsanı, hacklenen hesaplarda eşzamanlı olarak bir Bitcoin çekilişi yayınladı. Aldatıcı tweetler hızla fark edilip silinmesine rağmen, bilgisayar korsanları yine de 11 bitcoin (veya Eylül 2021 itibarıyla 500.000 $) ile kaçmayı başardılar.

![A scam on Twitter](./appleTwitterScam.png)

### Ünlü çekilişi {#celebrity-giveaway}

Ünlü çekilişi, çekiliş dolandırıcılığının aldığı bir diğer yaygın biçimdir. Dolandırıcılar, bir ünlü tarafından verilen kaydedilmiş bir video röportajını veya konferans konuşmasını alıp YouTube'da canlı yayınlayarak, sanki ünlü kişi bir kripto para çekilişini destekleyen canlı bir video röportajı veriyormuş gibi görünmesini sağlarlar.

Vitalik Buterin bu dolandırıcılıkta en sık kullanılan kişidir, ancak kripto ile ilgilenen diğer birçok önde gelen kişi de kullanılır (örneğin, Elon Musk veya Charles Hoskinson). Tanınmış bir kişiyi dahil etmek, dolandırıcıların canlı yayınına bir meşruiyet hissi verir (bu şüpheli görünüyor, ancak Vitalik işin içinde, bu yüzden sorun olmamalı!).

**Çekilişler her zaman dolandırıcılıktır. Fonlarınızı bu hesaplara gönderirseniz, onları sonsuza dek kaybedersiniz.**

![A scam on YouTube](./youtubeScam.png)

### Destek dolandırıcılıkları {#support-scams}

Kripto para nispeten genç ve yanlış anlaşılan bir teknolojidir. Bundan yararlanan yaygın bir dolandırıcılık, dolandırıcıların popüler cüzdanlar, borsalar veya blokzincirleri için destek personeli kılığına girdiği destek dolandırıcılığıdır.

Ethereum hakkındaki tartışmaların çoğu Discord'da gerçekleşir. Destek dolandırıcıları genellikle herkese açık discord kanallarında destek soruları arayarak ve ardından soruyu soran kişiye destek sunan özel bir mesaj göndererek hedeflerini bulurlar. Güven inşa ederek, destek dolandırıcıları sizi özel anahtarlarınızı ifşa etmeniz veya fonlarınızı cüzdanlarına göndermeniz için kandırmaya çalışırlar.

![A support scam on Discord](./discordScam.png)

Genel bir kural olarak, personel sizinle asla özel, resmi olmayan kanallar aracılığıyla iletişim kurmaz. Destek ile ilgilenirken akılda tutulması gereken bazı basit şeyler:

- Özel anahtarlarınızı, kurtarma ifadelerinizi veya şifrelerinizi asla paylaşmayın
- Bilgisayarınıza hiç kimsenin uzaktan erişimine asla izin vermeyin
- Bir kuruluşun belirlenmiş kanalları dışında asla iletişim kurmayın

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Dikkat: Destek tarzı dolandırıcılıklar genellikle Discord'da gerçekleşse de, e-posta dahil olmak üzere kripto tartışmalarının gerçekleştiği herhangi bir sohbet uygulamasında da yaygın olabilir.
</AlertDescription>
</AlertContent>
</Alert>

### 'Eth2' token dolandırıcılığı {#eth2-token-scam}

[Birleşme](/roadmap/merge/) öncesinde dolandırıcılar, kullanıcıların ETH'lerini bir 'ETH2' token'ı ile değiştirmelerini sağlamaya çalışmak için 'Eth2' terimi etrafındaki kafa karışıklığından yararlandılar. 'ETH2' diye bir şey yoktur ve Birleşme ile başka hiçbir meşru token tanıtılmamıştır. Birleşme'den önce sahip olduğunuz ETH, şu anki ETH ile aynıdır. **İş Kanıtı (PoW) sisteminden Hisse Kanıtı (PoS) sistemine geçişi hesaba katmak için ETH'nizle ilgili herhangi bir işlem yapmanıza gerek yoktur**.

Dolandırıcılar "destek" olarak görünebilir ve ETH'nizi yatırırsanız karşılığında 'ETH2' alacağınızı söyleyebilirler. [Resmi bir Ethereum desteği](/community/support/) yoktur ve yeni bir token yoktur. Cüzdan kurtarma ifadenizi asla kimseyle paylaşmayın.

_Not: Stake edilmiş ETH'yi temsil edebilecek türev token'lar/kısaltmalar vardır (örneğin, Rocket Pool'dan rETH, Lido'dan stETH, Coinbase'den ETH2), ancak bunlar "geçiş yapmanız" gereken bir şey değildir._

### Kimlik avı dolandırıcılıkları {#phishing-scams}

Kimlik avı dolandırıcılıkları, dolandırıcıların cüzdanınızın fonlarını çalmaya çalışmak için kullanacağı giderek yaygınlaşan bir başka yöntemdir.

Bazı kimlik avı e-postaları, kullanıcılardan onları taklit web sitelerine yönlendirecek bağlantılara tıklamalarını isteyerek kurtarma ifadelerini girmelerini, şifrelerini sıfırlamalarını veya ETH göndermelerini ister. Diğerleri, bilgisayarınıza virüs bulaştırmak ve dolandırıcılara bilgisayarınızın dosyalarına erişim sağlamak için bilmeden kötü amaçlı yazılım yüklemenizi isteyebilir.

Bilinmeyen bir göndericiden e-posta alırsanız şunları unutmayın:

- Tanımadığınız e-posta adreslerinden gelen bir bağlantıyı veya eki asla açmayın
- Kişisel bilgilerinizi veya şifrelerinizi asla kimseye ifşa etmeyin
- Bilinmeyen göndericilerden gelen e-postaları silin

[Kimlik avı dolandırıcılıklarından kaçınma hakkında daha fazla bilgi](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Kripto alım satım komisyoncusu dolandırıcılıkları {#broker-scams}

Dolandırıcı kripto alım satım komisyoncuları, paranızı alıp sizin adınıza yatırım yapmayı teklif edecek uzman kripto para komisyoncuları olduklarını iddia ederler. Dolandırıcı fonlarınızı aldıktan sonra, daha fazla yatırım kazancını kaçırmamanız için daha fazla fon göndermenizi isteyerek sizi oyalayabilir veya tamamen ortadan kaybolabilirler.

Bu dolandırıcılar genellikle YouTube'da sahte hesaplar kullanarak 'komisyoncu' hakkında görünüşte doğal konuşmalar başlatarak hedefler bulurlar. Bu konuşmalar genellikle meşruiyeti artırmak için çok sayıda olumlu oy alır, ancak olumlu oyların tümü bot hesaplarındandır.

**Sizin adınıza yatırım yapmaları için internetteki yabancılara güvenmeyin. Kriptonuzu kaybedersiniz.**

![A trading broker scam on YouTube](./brokerScam.png)

### Kripto madencilik havuzu dolandırıcılıkları {#mining-pool-scams}

Eylül 2022 itibarıyla Ethereum'da madencilik yapmak artık mümkün değildir. Ancak madencilik havuzu dolandırıcılıkları hala mevcuttur. Madencilik havuzu dolandırıcılıkları, insanların sizinle istenmeyen bir şekilde iletişime geçmesini ve bir Ethereum madencilik havuzuna katılarak büyük getiriler elde edebileceğinizi iddia etmesini içerir. Dolandırıcı iddialarda bulunacak ve ne kadar sürerse sürsün sizinle iletişim halinde kalacaktır. Temel olarak dolandırıcı, bir Ethereum madencilik havuzuna katıldığınızda kripto paranızın ETH oluşturmak için kullanılacağına ve size ETH temettüleri ödeneceğine sizi ikna etmeye çalışacaktır. Daha sonra kripto paranızın küçük getiriler sağladığını göreceksiniz. Bu sadece sizi daha fazla yatırım yapmaya teşvik etmek içindir. Sonunda tüm fonlarınız bilinmeyen bir adrese gönderilecek ve dolandırıcı ya ortadan kaybolacak ya da yakın zamandaki bir vakada olduğu gibi bazı durumlarda iletişimde kalmaya devam edecektir.

Özetle: sosyal medyada sizinle iletişime geçerek bir madencilik havuzunun parçası olmanızı isteyen kişilere karşı dikkatli olun. Kriptonuzu bir kez kaybettiğinizde, geri dönüşü yoktur.

Unutulmaması gereken bazı şeyler:

- Kriptonuzdan para kazanma yolları hakkında sizinle iletişime geçen herkese karşı dikkatli olun
- Staking, likidite havuzları veya kriptonuza yatırım yapmanın diğer yolları hakkında araştırmanızı yapın
- Bu tür planlar nadiren meşrudur. Öyle olsalardı, muhtemelen ana akım olurlardı ve onları duymuş olurdunuz.

[Bir adam madencilik havuzu dolandırıcılığında 200 bin dolar kaybetti](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Airdrop dolandırıcılıkları {#airdrop-scams}

Airdrop dolandırıcılıkları, dolandırıcı bir projenin cüzdanınıza bir varlık (NFT, token) airdrop yapmasını ve airdrop yapılan varlığı talep etmeniz için sizi dolandırıcı bir web sitesine göndermesini içerir. Talep etmeye çalışırken Ethereum cüzdanınızla oturum açmanız ve bir işlemi "onaylamanız" istenecektir. Bu işlem, genel ve özel anahtarlarınızı dolandırıcıya göndererek hesabınızı tehlikeye atar. Bu dolandırıcılığın alternatif bir biçimi, dolandırıcının hesabına fon gönderen bir işlemi onaylamanızı sağlayabilir.

[Airdrop dolandırıcılıkları hakkında daha fazla bilgi](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Web güvenliği 101 {#web-security}

### Güçlü şifreler kullanın {#use-strong-passwords}

[Hesap hacklenmelerinin %80'inden fazlası zayıf veya çalınmış şifrelerin bir sonucudur](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Karakterlerin, sayıların ve sembollerin uzun bir kombinasyonu, hesaplarınızı güvende tutmanıza yardımcı olacaktır.

Yaygın bir hata, birkaç yaygın, birbiriyle ilişkili kelimenin bir kombinasyonunu kullanmaktır. Bu tür şifreler güvensizdir çünkü sözlük saldırısı adı verilen bir hackleme tekniğine eğilimlidirler.

```md
Zayıf bir şifre örneği: SevimliTuyluKedicikler!

Güçlü bir şifre örneği: ymv\*azu.EAC8eyp8umf
```

Bir diğer yaygın hata, kolayca tahmin edilebilen veya [sosyal mühendislik](<https://wikipedia.org/wiki/Social_engineering_(security)>). yoluyla keşfedilebilen şifreler kullanmaktır. Şifrenize annenizin kızlık soyadını, çocuklarınızın veya evcil hayvanlarınızın isimlerini veya doğum tarihlerini dahil etmek, hacklenme riskini artıracaktır.

#### İyi şifre uygulamaları: {#good-password-practices}

- Şifreleri, şifre oluşturucunuzun veya doldurduğunuz formun izin verdiği kadar uzun yapın
- Büyük harf, küçük harf, sayı ve sembollerin bir karışımını kullanın
- Şifrenizde soyadları gibi kişisel ayrıntıları kullanmayın
- Yaygın kelimelerden kaçının

[Güçlü şifreler oluşturma hakkında daha fazla bilgi](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Her şey için benzersiz şifreler kullanın {#use-unique-passwords}

Bir veri ihlalinde ortaya çıkan güçlü bir şifre artık güçlü bir şifre değildir. [Have I Been Pwned](https://haveibeenpwned.com) web sitesi, hesaplarınızın herhangi bir halka açık veri ihlaline karışıp karışmadığını kontrol etmenizi sağlar. Karışmışlarsa, **bu şifreleri derhal değiştirin**. Her hesap için benzersiz şifreler kullanmak, şifrelerinizden birinin ele geçirilmesi durumunda bilgisayar korsanlarının tüm hesaplarınıza erişme riskini azaltır.

### Bir şifre yöneticisi kullanın {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    Bir şifre yöneticisi kullanmak, güçlü, benzersiz şifreler oluşturmayı ve bunları hatırlamayı halleder! Bir tane kullanmanızı <strong>şiddetle</strong> tavsiye ediyoruz ve çoğu ücretsizdir!
</AlertDescription>
</AlertContent>
</Alert>

Sahip olduğunuz her hesap için güçlü, benzersiz şifreleri hatırlamak ideal değildir. Bir şifre yöneticisi, tek bir güçlü ana şifre aracılığıyla erişebileceğiniz tüm şifreleriniz için güvenli, şifrelenmiş bir depo sunar. Ayrıca yeni bir hizmete kaydolurken güçlü şifreler önerirler, böylece kendi şifrenizi oluşturmak zorunda kalmazsınız. Birçok şifre yöneticisi, bir veri ihlaline karışıp karışmadığınızı da size bildirerek herhangi bir kötü niyetli saldırıdan önce şifreleri değiştirmenize olanak tanır.

![Example of using a password manager](./passwordManager.png)

#### Bir şifre yöneticisi deneyin: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Veya diğer [önerilen şifre yöneticilerine](https://www.privacytools.io/secure-password-manager) göz atın

### İki Faktörlü Kimlik Doğrulama Kullanın {#two-factor-authentication}

Bazen kimliğinizi benzersiz kanıtlar aracılığıyla doğrulamanız istenebilir. Bunlar **faktörler** olarak bilinir. Üç ana faktör şunlardır:

- Bildiğiniz bir şey (şifre veya güvenlik sorusu gibi)
- Olduğunuz bir şey (parmak izi veya iris/yüz tarayıcı gibi)
- Sahip olduğunuz bir şey (telefonunuzdaki bir güvenlik anahtarı veya kimlik doğrulama uygulaması)

**İki Faktörlü Kimlik Doğrulama (2FA)** kullanmak, çevrimiçi hesaplarınız için ek bir *güvenlik faktörü* sağlar. 2FA, bir hesaba erişmek için yalnızca şifrenize sahip olmanın yeterli olmamasını sağlar. En yaygın olarak, ikinci faktör, Google Authenticator veya Authy gibi bir kimlik doğrulayıcı uygulaması aracılığıyla erişebileceğiniz, **zamana dayalı tek kullanımlık şifre (TOTP)** olarak bilinen rastgele 6 haneli bir koddur. Bunlar "sahip olduğunuz bir şey" faktörü olarak çalışır çünkü zamanlanmış kodu oluşturan tohum cihazınızda saklanır.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Not: SMS tabanlı 2FA kullanmak <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM ele geçirme (SIM jacking)</a> saldırılarına karşı hassastır ve güvenli değildir. En iyi güvenlik için <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> veya <a href="https://authy.com/">Authy</a> gibi bir hizmet kullanın.
</AlertDescription>
</AlertContent>
</Alert>

#### Güvenlik anahtarları {#security-keys}

Güvenlik anahtarı, 2FA'nın daha gelişmiş ve güvenli bir türüdür. Güvenlik anahtarları, kimlik doğrulayıcı uygulamaları gibi çalışan fiziksel donanım kimlik doğrulama cihazlarıdır. Bir güvenlik anahtarı kullanmak, 2FA'nın en güvenli yoludur. Bu anahtarların birçoğu FIDO Evrensel 2. Faktör (U2F) standardını kullanır. [FIDO U2F hakkında daha fazla bilgi edinin](https://www.yubico.com/resources/glossary/fido-u2f/).

2FA hakkında daha fazlasını izleyin:

<VideoWatch slug="crypto-security-passwords" startTime="3479" />

### Tarayıcı uzantılarını kaldırın {#uninstall-browser-extensions}

Chrome uzantıları veya Firefox eklentileri gibi tarayıcı uzantıları, tarayıcı işlevselliğini artırabilir ancak aynı zamanda riskleri de beraberinde getirir. Varsayılan olarak, çoğu tarayıcı uzantısı 'site verilerini okuma ve değiştirme' erişimi isteyerek verilerinizle neredeyse her şeyi yapmalarına olanak tanır. Chrome uzantıları her zaman otomatik olarak güncellenir, bu nedenle daha önce güvenli olan bir uzantı daha sonra kötü amaçlı kod içerecek şekilde güncellenebilir. Çoğu tarayıcı uzantısı verilerinizi çalmaya çalışmaz, ancak bunu yapabileceklerinin farkında olmalısınız.

#### Şunları yaparak güvende kalın: {#browser-extension-safety}

- Tarayıcı uzantılarını yalnızca güvenilir kaynaklardan yükleyin
- Kullanılmayan tarayıcı uzantılarını kaldırın
- Otomatik güncellemeyi durdurmak için Chrome uzantılarını yerel olarak yükleyin (Gelişmiş)

[Tarayıcı uzantılarının riskleri hakkında daha fazla bilgi](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Daha fazla okuma {#further-reading}

### Web güvenliği {#reading-web-security}

- [Kötü amaçlı yazılım içeren Chrome ve Edge eklentileri tarafından 3 milyona kadar cihaza virüs bulaştı](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Unutmayacağınız Güçlü Bir Şifre Nasıl Oluşturulur](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Güvenlik anahtarı nedir?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Kripto güvenliği {#reading-crypto-security}

- [Kendinizi ve Fonlarınızı Korumak](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Yaygın kripto iletişim yazılımlarındaki güvenlik sorunları](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Aptallar ve Akıllı İnsanlar İçin Güvenlik Rehberi](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Kripto Güvenliği: Şifreler ve Kimlik Doğrulama](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Dolandırıcılık eğitimi {#reading-scam-education}

- [Rehber: Dolandırıcı token'lar nasıl belirlenir](/guides/how-to-id-scam-tokens/)
- [Güvende Kalmak: Yaygın Dolandırıcılıklar](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Dolandırıcılıklardan Kaçınmak](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Yaygın kripto kimlik avı e-postaları ve mesajları hakkında Twitter dizisi](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />