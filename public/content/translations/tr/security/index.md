---
title: Ethereum güvenliği ve dolandırıcılık önleme
description: Ethereum'da güvende kalmak
lang: tr
---

# Ethereum güvenliği ve dolandırıcılık önleme {#introduction}

Kripto paralara olan ilgi arttıkça, kripto para kullanmanın en iyi yöntemlerini öğrenmek çok önemlidir. Kripto eğlenceli ve heyecan verici olabilir, ancak ciddi riskleri de vardır. Eğer bu küçük ön çalışmayı uygulamaya koyarsanız, bu riskleri azaltabilirsiniz.

<Divider />

## Web güvenliği 101 {#web-security}

### Güçlü şifre kullanın {#use-strong-passwords}

[Hesap hack'lerinin %80'inden fazlası, zayıf veya çalınmış şifrelerin bir sonucudur](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Hesaplarınızı güvende tutmak için uzun bir karakter, sayı ve sembol kombinasyonu en iyisidir.

Bireylerin yaptığı yaygın bir hata: İki ila üç yaygın ve birbiriyle alakalı kelimelerden oluşan bir kombinasyon kullanmaktır. Bunun gibi şifreler güvensizdir çünkü [sözlük saldırısı](https://wikipedia.org/wiki/Dictionary_attack) olarak bilinen basit bir hack'leme tekniğine karşı yetersizdirler.

```md
Zayıf şifre örneği: TatlıTüylüKedicikler!

Güçlü şifre örneği: ymv\*azu.EAC8eyp8umf
```

Bir başka yaygın hata da, [sosyal mühendislik](https://wikipedia.org/wiki/Social_engineering_(security)) aracılığıyla kolayca tahmin edilebilen veya bulunabilen şifreler kullanmaktır. Şifrenizde annenizin kızlık soyadı, çocuklarınızın veya evcil hayvanlarınızın adları veya doğum tarihlerinin bulunması güvenli değildir ve şifrenizin ele geçirilme riskini artırır.

#### Şifre belirlemek için iyi yöntemler: {#good-password-practices}

- Şifre üreticinizin veya doldurduğunuz formun izin verdiği kadar uzun şifreler oluşturun
- Büyük harf, küçük harf, sayı ve sembollerin bir karışımını kullanın
- Şifrenizde aile adları gibi kişisel bilgileri kullanmayın
- Yaygın sözlük kelimelerinden kaçının

[Güçlü şifreler oluşturma hakkında daha fazla bilgi](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Her şey için farklı şifreler kullanın {#use-unique-passwords}

Güçlü bir şifre, bir veri ihlali sırasında parolanın açığa çıkması durumunda çok fazla koruma sağlamaz. [Have I Been Pwned](https://haveibeenpwned.com) web sitesi, hesaplarınızın veritabanlarında depolanan herhangi bir veri ihlaline karışıp karışmadığını kontrol etmenize olanak tanır. Varsa **sitede bulunan şifreleri hemen değiştirmelisiniz**. Her hesap için benzersiz şifreler kullanmak, şifrelerinizden biri ele geçirildiğinde hacker'ların tüm hesaplarınıza erişme riskini azaltır.

### Bir şifre yöneticisi kullanın {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Bir şifre yöneticisi kullanmak; güçlü, benzersiz şifreler oluşturmak ve bunları hatırlama işini sizin için çözer! Bunlardan birini kullanmanızı <strong>şiddetle</strong> öneririz ve çoğu ücretsizdir!
  </div>
</InfoBanner>

Sahip olduğunuz her hesap için güçlü, benzersiz şifreleri ezberlemeye çalışmak pek kolay değildir. Bir şifre yöneticisi, tek bir güçlü ana şifre aracılığıyla erişebileceğiniz tüm şifreleriniz için güvenli, şifrelenmiş bir depo sunar. Ayrıca, yeni bir hizmete kaydolurken güçlü şifreler önerirler, böylece kendinizinkini oluşturmak zorunda kalmazsınız. Birçok şifre yöneticisi, herhangi bir kötü niyetli saldırıdan önce şifreleri değiştirmenize izin vererek, bir veri ihlaline karışıp karışmadığınızı da size söyler.

![Bir şifre yöneticisi kullanım örneği](./passwordManager.png)

#### Bir şifre yöneticisi deneyin: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Yahut diğer [önerilen şifre yöneticilerine](https://www.privacytools.io/secure-password-manager) göz atın

### İki Faktörlü Kimlik Doğrulamayı Kullanın {#two-factor-authentication}

Gerçekten siz olduğunuzu kanıtlamak için, kimlik doğrulama için kullanılabilecek farklı benzersiz ispatlar vardır. Bunlar **faktörler** olarak bilinir ve üç ana faktör şunlardır:

- Bildiğiniz bir şey (şifre veya güvenlik sorusu gibi)
- Olduğunuz bir şey (parmak izi veya göz/yüz tarayıcısı gibi)
- Sahip olduğunuz bir şey (telefonunuzda bir güvenlik anahtarı veya kimlik doğrulama uygulaması)

**İki Faktörlü Doğrulama (2FA)** kullanmak çevrimiçi hesaplarınız için ek bir *güvenlik faktörü* sağlar; böylece sadece şifrenizi bilmek (bildiğiniz bir şey) bir hesaba erişmek için yeterli değildir. En yaygın olarak, ikinci faktör **zaman esaslı tek seferlik şifre (TOTP)** olarak bilinen, Google Authenticator veya Authy gibi bir doğrulayıcı uygulamadan ulaşabileceğiniz rastgele seçilmiş 6 haneli bir koddur. Bunlar "senin sahip olduğun bir şey" faktörü ile çalışırlar çünkü zamanlı kodu oluşturan tohum, sizin aygıtınızda depolanır.

<InfoBanner emoji=":lock:">
  <div>
    Not: SMS tabanlı 2FA'nın kullanılması 
    <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">
      SIM dolandırıcılığı
    </a>na karşı zayıftır
     ve güvenli değildir. En iyi güvenlik için, bunun gibi hizmetleri kullanın{" "}
    <a href="https://mashable.com/article/how-to-set-up-google-authenticator">
      Google Kimlik Doğrulayıcı
    </a>
     yada <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Güvenlik anahtarları {#security-keys}

2FA'da sonraki adımı atmak isteyenler, bir güvenlik anahtar kullanmayı düşünebilir. Güvenlik anahtarları doğrulayıcı uygulamalarla aynı şekilde çalışan fiziksel donanım doğrulama aygıtlarıdır. Bir güvenlik anahtarı kullanmak 2FA'daki en güvenli yoldur. Bu anahtarların birçoğu FIDO Evrensel İkinci Faktör (U2F) standartından yararlanır. [FIDO U2F hakkında daha fazlasını öğrenin](https://www.yubico.com/authentication-standards/fido-u2f/).

2FA hakkında daha fazlasını izleyin:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Tarayıcı uzantılarını kaldırın {#uninstall-browser-extensions}

Chrome uzantıları veya Firefox Eklentileri gibi tarayıcı uzantıları, kullanışlı tarayıcı işlevselliğini artırabilir ve kullanıcı deneyimini iyileştirebilir, ancak bunun riskleri de vardır. Varsayılan olarak, çoğu tarayıcı uzantısı "site verilerini okuma ve değiştirme" erişimi ister ve verilerinizle hemen hemen her şeyi yapmalarına izin verir. Chrome uzantıları her zaman otomatik olarak güncellenir, bu nedenle önceden güvenli bir uzantı daha sonra kötü amaçlı kod içerecek şekilde güncellenebilir. Çoğu tarayıcı uzantısı verilerinizi çalmaya çalışmaz, ancak yapabileceklerinin farkında olmalısınız.

#### Bu yollarla güvende kalabilirsiniz: {#browser-extension-safety}

- Sadece güvenilir kaynaklardan tarayıcı eklentileri indirin
- Kullanılmayan tarayıcı eklentilerini silin
- Otomatik güncellemeyi durdurmak için yerel olarak Chrome eklentilerini silin (Gelişmiş)

[Tarayıcı uzantılarının riskleri hakkında daha fazla bilgi](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Kripto güvenliği 101 {#crypto-security}

### Bilginizi yükseltin {#level-up-your-knowledge}

İnsanların kriptoda dolandırılmalarının en büyük nedenlerinden biri genellikle anlayış eksikliğidir. Örneğin, Ethereum ağının merkezi olmadığını ve kimseye ait olmadığını anlamıyorsanız, özel anahtarlarınız karşılığında kayıp ETH'nizi geri vermeyi vaat eden bir müşteri hizmetleri temsilcisi gibi davranan biri tarafından avlanmak kolaydır. Kendinizi Ethereum'un nasıl çalıştığı konusunda eğitmek değerli bir yatırımdır.

<DocLink href="/what-is-ethereum/">
  Ethereum nedir?
</DocLink>

<DocLink href="/eth/">
  Ether nedir?
</DocLink>
<Divider />

## Cüzdan güvenliği {#wallet-security}

### Özel anahtarlarınızı paylaşmayın {#protect-private-keys}

**Hiçbir nedenle, özel anahtarlarınızı asla paylaşmayın!**

Cüzdanınızın özel anahtarı, Ethereum cüzdanınız için bir şifre görevi görür. Cüzdan adresinizi bilen birinin hesabınızın tüm varlıklarını ele geçirmesini engelleyen tek şey budur!

<DocLink href="/wallets/">
  Ethereum cüzdanı nedir?
</DocLink>

#### Güvenlik kelimelerinizin/özel anahtarlarınızın ekran görüntülerini almayın {#screenshot-private-keys}

Güvenlik kelimelerinizin veya özel anahtarlarınızın ekran görüntüsünü alarak, bunları bulutla senkronize etme ve potansiyel olarak hacker'lar tarafından erişilebilir hâle getirme riskini alırsınız. Buluttan özel anahtarlar elde etmek, hacker'lar için yaygın bir saldırı vektörüdür.

### Donanım cüzdanı kullanın {#use-hardware-wallet}

Bir donanım cüzdanı, özel anahtarlar için çevrimdışı depolama sağlar. Gizli anahtarlarınızı saklamak için en güvenli cüzdan seçeneği olarak görülürler: gizli anahtarınız asla internete dokunmaz ve tamamen yerel olarak cihazınızda kalır.

Özel anahtarlarınızı çevrimdışı yapmak, hacker bilgisayarınızın kontrolünü ele geçirse bile saldıraya uğrama riskinizi büyük ölçüde azaltır.

#### Bir donanım cüzdanını deneyin: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### İşlemleri göndermeden önce iki kez kontrol edin {#double-check-transactions}

Yanlışlıkla yanlış cüzdan adresine kripto göndermek yaygın bir hatadır. **Ethereum'da gönderilen bir işlem geri alınamaz.** Adres sahibini tanımıyorsanız ve onu fonunuzu size geri göndermeye ikna edemezseniz paranızı geri almanın bir yolu olmayacaktır.

Bir işlem göndermeden önce, gönderdiğiniz adresin istediğiniz alıcının adresiyle tam olarak eşleştiğinden daima emin olun. Akıllı bir sözleşmeyle etkileşim kurarken, imzalamadan önce işlem mesajını okumak da önerilir.

### Akıllı sözleşme harcama limitleri belirleyin {#spend-limits}

Akıllı sözleşmelerle etkileşim kurarken sınırsız harcama limitlerine izin vermeyin. Sınırsız bir harcama, akıllı sözleşmenin cüzdanınızı boşaltmasını sağlayabilir. Bunun yerine, harcama limitlerini yalnızca işlem için gerekli olan miktara ayarlayın.

Birçok Ethereum cüzdanı, boşaltılan hesaplara karşı koruma sağlamak için limit koruması sunar.

[Kripto fonlarınızın akıllı sözleşme erişimini nasıl iptal edebilirsiniz?](/guides/how-to-revoke-token-access/)

<Divider />

## Yaygın dolandırıcılıklar {#common-scams}

Dolandırıcılar her zaman paranızı almanın yollarını ararlar. Dolandırıcıları tamamen durdurmak imkansızdır, ancak kullanılan çoğu tekniğin farkında olarak onları daha etkisiz hâle getirebiliriz. Bu dolandırıcılıkların birçok çeşidi vardır, ancak genellikle aynı üst düzey kalıpları izlerler. Ne olursa olsun, unutmayın:

- her zaman şüpheci olun
- kimse size ücretsiz veya indirimli ETH vermeyecek
- kimsenin özel anahtarlarınıza veya kişisel bilgilerinize erişmesine gerek yok

### Çekiliş dolandırıcılığı {#giveaway}

Kripto para birimindeki en yaygın dolandırıcılıklardan biri, çekiliş dolandırıcılığıdır. Çekiliş dolandırıcılığı birçok şekilde olabilir, ancak genelde verilen cüzdan adresine ETH gönderirseniz, ETH'nizin iki katını geri alacağınız vaat edilir. *Bu sebepten dolayı, 1 alana 1 bedava dolandırıcılığı olarak da bilinir.*

Bu dolandırıcılıklar genellikle yanlış kararlar vermeye yönlendirmek ve sahte bir aciliyet hissi yaratmak amacıyla hediyeyi talep etmek için sınırlı bir fırsat süresi şart koşar.

#### Sosyal medya hack'leri {#social-media-hacks}

Bunun üst düzey bir versiyonu Temmuz 2020'de önde gelen ünlülerin ve organizasyonların Twitter hesapları çalındığında gerçekleşti. Hacker eş zamanlı olarak çalınan hesaplarda bir Bitcoin çekilişi paylaştı. Aldatıcı tweetler hızlıca fark edilmiş ve silinmiş olsa da saldırganlar 11 Bitcoin koparmayı başardı (Eylül 2021 itibarıyla 500.000 ABD Doları).

![Twitter'daki dolandırıcılık](./appleTwitterScam.png)

#### Ünlü çekilişleri {#celebrity-giveaway}

Ünlü çekilişi, çekiliş dolandırıcılığı teşebbüslerinin yaygın başka bir türüdür. Dolandırıcılar bir ünlü tarafından verilen kaydedilmiş bir röportaj veya konferans videosunu alırlar ve YouTube'da canlı yayın olarak yayınlarlar: Bir kripto para çekilişini destekleyen canlı bir video röportajı veriyormuş gibi gösterirler.

Bu dolandırıcılıkta en sık Vitalik Buterin kullanılsa da kriptoyla ilgili diğer birçok önde gelen kişi de kullanılır (ör. Elon Musk veya Charles Hoskinson). Tanınmış birini dahil etmek dolandırıcıların canlı yayınlarına bir meşruiyet hissi verir ("Bu biraz garip görünüyor ama Vitalik olduğuna göre güvenilirdir herhalde!").

**Çekilişler her zaman dolandırıcılıktır. Paranızı bu hesaplara gönderirseniz, paranızı sonsuza kadar kaybedersiniz.**

![YouTube'daki dolandırıcılık](./youtubeScam.png)

### Destek dolandırıcılıkları {#support-scams}

Kripto paralar nispeten yeni ve yanlış anlaşılan bir teknolojidir. Bundan yararlanan yaygın bir dolandırıcılık ise dolandırıcıların popüler cüzdanların, borsaların veya blok zincirlerin destek personellerini taklit ettikleri destek dolandırıcılığıdır.

Ethereum hakkındaki tartışmaların çoğu Discord'da gerçekleşir. Destek dolandırıcıları, genellikle herkese açık anlaşmazlık kanallarında destek soruları arayarak ve ardından talepte bulunan kişiye destek sunan özel bir mesaj göndererek hedeflerini bulurlar. Destek dolandırıcıları, güven oluşturarak özel anahtarlarınızı ifşa etmeniz veya paranızı cüzdanlarına göndermeniz için sizi kandırmaya çalışır.

![Discord'daki destek dolandırıcılığı](./discordScam.png)

Genel bir kural olarak, ekip sizinle asla özel ve resmi olmayan kanallar aracılığıyla iletişim kurmaz. Destekle muhatap olurken akılda tutulması gereken bazı basit şeyler:

- Özel anahtarlarınızı, güvenlik kelimelerinizi veya şifrelerinizi asla paylaşmayın
- Asla kimsenin bilgisayarınıza uzaktan erişmesine izin vermeyin
- Asla bir kuruluşun belirlenmiş kanalları dışında iletişim kurmayın

<InfoBanner emoji=":lock:">
  <div>
    Dikkat: Destek tarzı dolandırıcılıklar genellikle Discord'da gerçekleşse de, e-posta da dahil olmak üzere kripto tartışmalarının gerçekleştiği herhangi bir sohbet uygulamasında da yaygın olabilir.
  </div>
</InfoBanner>

### "Eth2" token dolandırıcılığı {#eth2-token-scam}

[Birleştirme](/roadmap/merge/) öncesinde dolandırıcılar, kullanıcıların ETH'lerini bir "ETH2" token'ı için kullanmalarını sağlamak için "Eth2" terimi etrafındaki karışıklıktan yararlandı. "ETH2" yoktu ve Birleşme ile ilgili başka hiçbir meşru token sunulmadı. Birleşmeden önce sahip olduğunuz ETH, şimdi aynı ETH'dir. **İş kanıtından hisse kanıtına geçişi hesaba katmak için ETH'nizle ilgili herhangi bir işlem yapmanıza gerek yoktur**.

Dolandırıcılar "destek" olarak görünebilir ve size ETH'nizi yatırırsanız "ETH2"yi geri alacağınızı söylerler. [Ne resmi bir Ethereum destek ekibi](/community/support/) ne de yeni bir token yoktur. Cüzdan güvenlik kelimelerini asla kimseyle paylaşmayın.

_Not: Hisselenmiş ETH'yi temsil edebilecek türev token'lar/kayıtlar vardır (ör. Rocket Pool'dan rETH, Lido'dan stETH, Coinbase'den ETH2), ancak bunlar kriptonuzu "taşımanız" gereken şeyler değildir_

### Kimlik avı dolandırıcılıkları {#phishing-scams}

Kimlik avı dolandırıcılıkları, dolandırıcıların cüzdanınızdaki fonları çalmaya çalışmak için kullandığı gittikçe yaygınlaşan başka bir yoldur.

Bazı kimlik avı e-postaları kullanıcıların onları sahte web sayfalarına yönlendirecek bağlantılara tıklamalarını, güvenlik kelimesini girmelerini, şifrelerini sıfırlamalarını veya ETH göndermelerini isterler. Başkaları sizden bilgisayarınıza virüs bulaştırmanız ve dolandırıcılara bilgisiyarınızdaki dosyaların erişimi vermeniz için farkında olmadan kötü amaçlı yazılımlar kurmanızı isteyebilir.

Eğer bilinmeyen bir göndericiden bir e-posta alırsanız, hatırlayın:

- Asla tanımadığınız e-posta adreslerinden gelen bir linki veya ek dosyayı açmayın
- Asla kimseye özel bilgilerinizi veya şifrelerinizi söylemeyin
- Bilinmeyen göndericilerden gelen e-postaları silin

[Kimlik avı dolandırıcılıklarından kaçınmak üzerine dahası](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Kripto ticaret simsarı dolandırıcılıkları {#broker-scams}

Dolandırıcı kripto ticaret simsarları sizin paranızı almayı ve sizin adınıza yatırım yapmayı teklif ederler ve uzman kripto para simsarı olduklarını iddia ederler. Genellikle bu teklife gerçeklikten uzak kazanç vaatleri eşlik eder. Dolandırıcı paranızı aldıktan sonra, daha fazla yatırım kazancını kaybetmemek için daha çok para göndermenizi isteyerek sizi kandırmaya devam edebilir veya tamamen ortadan kaybolabilir.

Bu sahtekâr simsarlar, simsar hakkında görünüşte doğal sohbetler başlatmak için YouTube'da sahte hesaplar kullanarak hedeflerini bulurlar. Bu sohbetler genelde gerçekliğini arttırmak için yüksek miktarda oy alır, ancak oyların hepsi bot hesaplardandır.

**İnternetteki yabancılara sizin yerinize yatırım yapmaları için güvenmeyin. Krito paranızı kaybedersiniz.**

![YouTube'da bir ticaret simsarı dolandırıcılığı](./brokerScam.png)

### Kripto madencilik havuzu dolandırıcılıkları {#mining-pool-scams}

Eylül 2022'den itibaren Ethereum'da madencilik yapmak artık mümkün değil. Ancak, madencilik havuzu dolandırıcılığı hâlâ var. Madencilik havuzu dolandırıcılığı, istenmeyen kişilerin sizinle iletişim kurmasını ve bir Ethereum madencilik havuzuna katılarak büyük getiriler elde edebileceğinizi iddia etmesini içerir. Dolandırıcılar vaatlerde bulunurlar ve sizinle olabildiği kadar iletişimde kalırlar. Temel olarak, dolandırıcı sizi bir Ethereum madencilik havuzuna katıldığınızda kripto paranızın ETH yaratmak için kullanılacağına ve ETH şeklinde kâr payı ödemesi alacağınıza ikna etmeye çalışır. Aslında gerçekleşecek olan, kripto paranızın küçük kazançlar yarattığını fark etmenizdir. Bu sadece sizi daha çok yatırmanız için aldatmayı amaçlar. Sonunda, tüm paranız bilinmeyen bir adrese gönderilecek ve dolandırıcı ya ortadan kaybolacak ya da bazı durumlarda yakın zamanda olduğu gibi iletişim halinde kalmaya devam edecek.

Sonuç olarak, bir madencilik havuzunun parçası olmanızı isteyen sosyal medyada sizinle iletişime geçen kişilere karşı dikkatli olun. Kriptonuzu bir kez kaybettiğinizde, geri dönüşü yoktur.

Hatırlanacak birkaç şey:

- Kriptonuzdan para kazanma yolları hakkında size ulaşan herhangi biri hakkında dikkatli olun
- Kilitleme, likidite havuzları ve kriptonuzla yatırım yapmanın diğer yolları ile ilgili araştırmanızı yapın
- Bu tür projeler nadiren gerçektir. Eğer gerçek olsalardı, muhtemelen çok ünlü olurlardı ve onları duymuş olurdunuz.

[Bir kullanıcı madencilik havuzu dolandırıcılığında 200.000 ABD doları kaybetti](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Airdrop dolandırıcılığı {#airdrop-scams}

Airdrop dolandırıcılığı, bir varlığı (NFT, token) cüzdanınıza Airdrop ile gelen ve sizi Airdrop'la gönderilen varlığı almanız için bir dolandırıcılık web sitesine yönlendiren bir dolandırıcılık projesini içerir. Almaya çalışırken Ethereum cüzdanınızla oturum açmanız ve bir işlemi "onaylamanız" istenecektir. Bu işlem, açık ve özel anahtarlarınızı dolandırıcıya göndererek hesabınızı tehlikeye atar. Bu dolandırıcılığın alternatif bir biçimi, dolandırıcının hesabına para gönderen bir işlemi onaylamanızı isteyebilir.

[Airdrop dolandırıcılığı hakkında daha fazla bilgi](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Daha fazla bilgi {#further-reading}

### Web güvenliği {#reading-web-security}

- [3 milyona yakın aygıt kötü amaçlı yazılım işlenmiş Chrome ve Edge eklentileri tarafından enfekte edildi](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Asla Unutmayacağınız Güçlü Bir Şifre Nasıl Oluşturulur](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Güvenlik anahtarı nedir?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Kripto güvenliği {#reading-crypto-security}

- [Kendinizi ve Fonlarınızı Koruma](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Yaygın kripto iletişim yazılımlarındaki güvenlik sorunları](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Acemiler ve Zeki İnsanlar için Güvenlik Rehberi](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Kripto Güvenliği: Şifreler ve Doğrulama](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Dolandırıcılık farkındalığı {#reading-scam-education}

- [Rehber: Dolandırıcılık token'ları nasıl tespit edilir](/guides/how-to-id-scam-tokens/)
- [Güvende Kalmak: Yaygın Dolandırıcılıklar](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Dolandırıcılıklardan Kaçınmak](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Yaygın kripto kimlik avı e-postaları ve mesajları hakkında Twitter ileti dizisi](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
