---
title: Ethereum güvenliği ve dolandırıcılık önleme
description: Ethereum'da güvende kalmak
lang: tr
---

# Ethereum güvenliği ve dolandırıcılık önleme {#introduction}

Kripto paralara olan ilginin artması, dolandırıcı ve bilgisayar korsanları kaynaklı artan bir riski de beraberinde getiriyor. Bu makale, bu riskleri en düşük seviyeye indirmeye yönelik bazı en iyi pratikleri açıklıyor.

<Divider />

## Kripto güvenliği 101 {#crypto-security}

### Bilginizi yükseltin {#level-up-your-knowledge}

Kriptonun nasıl çalıştığını yanlış anlamak, maliyetli hatalara sebebiyet verebilir. Örneğin, birisi özel anahtarınız karşılığında kayıp ETH'yi iade edebilecek bir müşteri hizmetleri temsilcisi gibi davranıyorsa, Ethereum'un bu tür bir işlevsellikten yoksun merkeziyetsiz bir ağ olduğunu anlamayan insanları avlıyor demektir. Kendinizi Ethereum'un nasıl çalıştığı konusunda eğitmek değerli bir yatırımdır.

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

Cüzdanınızın özel anahtarı, Ethereum cüzdanınızın şifresidir. Cüzdan adresinizi bilen birinin hesabınızın tüm varlıklarını ele geçirmesini engelleyen tek şey budur!

<DocLink href="/wallets/">
  Ethereum cüzdanı nedir?
</DocLink>

#### Güvenlik kelimelerinizin/özel anahtarlarınızın ekran görüntülerini almayın {#screenshot-private-keys}

Güvenlik kelimeleriniz ya da özel anahtarınız, ekran görüntülerini aldığınız zaman bulut depolama sağlayıcısına aktarılabilir. Bu da onları saldırganlar tarafından erişilebilir hale getirir. Buluttan özel anahtarlar almak, bilgisayar korsanları için yaygın bir saldırı vektörüdür.

### Donanım cüzdanı kullanın {#use-hardware-wallet}

Bir donanım cüzdanı, özel anahtarlar için çevrimdışı depolama sağlar. Gizli anahtarlarınızı saklamak için en güvenli cüzdan seçeneği olarak görülürler: gizli anahtarınız asla internete dokunmaz ve tamamen yerel olarak cihazınızda kalır.

Özel anahtarlarınızı çevrimdışı yapmak, hacker bilgisayarınızın kontrolünü ele geçirse bile saldıraya uğrama riskinizi büyük ölçüde azaltır.

#### Bir donanım cüzdanını deneyin: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### İşlemleri göndermeden önce iki kez kontrol edin {#double-check-transactions}

Yanlışlıkla yanlış cüzdan adresine kripto göndermek yaygın bir hatadır. **Ethereum üzerinden gönderilen bir işlem geri döndürülemez.** Adresin sahibini tanımıyor ve paranızı size geri göndermeye ikna edemiyorsanız paranızı geri alamazsınız.

Bir işlem göndermeden önce, gönderdiğiniz adresin istediğiniz alıcının adresiyle tam olarak eşleştiğinden daima emin olun. Bir akıllı sözleşme ile etkileşime girerken gelen mesajı imzalamadan önce okumak iyi bir pratiktir.

### Akıllı sözleşme harcama limitleri belirleyin {#spend-limits}

Akıllı sözleşmelerle etkileşim kurarken sınırsız harcama limitlerine izin vermeyin. Sınırsız bir harcama, akıllı sözleşmenin cüzdanınızı boşaltmasını sağlayabilir. Bunun yerine, harcama limitlerini yalnızca işlem için gerekli olan miktara ayarlayın.

Birçok Ethereum cüzdanı, boşaltılan hesaplara karşı koruma sağlamak için limit koruması sunar.

[Kripto fonlarınızın akıllı sözleşme erişimini nasıl iptal edebilirsiniz?](/guides/how-to-revoke-token-access/)

<Divider />

## Yaygın dolandırıcılıklar {#common-scams}

Dolandırıcıları tamamen durdurmak imkansızdır ancak en çok kullanıldıkları teknikleri öğrenerek onları daha etkisiz hâle getirebiliriz. Bu dolandırıcılıkların birçok çeşidi vardır, ancak genellikle aynı üst düzey kalıpları izlerler. Ne olursa olsun, unutmayın:

- her zaman şüpheci olun
- kimse size ücretsiz veya indirimli ETH vermeyecek
- kimsenin özel anahtarlarınıza veya kişisel bilgilerinize erişmesine gerek yok

### X reklam yemlemesi {#ad-phishing}

![X bağlantı yemlemesi](./twitterPhishingScam.png)

Twitter'ın (X olarak da bilinir) bağlantı önizleme özelliğini (unfurling) taklit ederek kullanıcıların yasal bir web sitesini ziyaret ettiklerine inanmasını sağlayan bir yöntem mevcuttur. Bu teknik, Twitter'ın tweetlerde paylaşılan URL'lerin önizlemelerini oluşturma mekanizmasını istismar eder ve örneğin _ethereum.org'dan_ (yukarıda gösterilmiştir) şeklinde bir ifade gösterse de aslında kötü amaçlı bir siteye yönlendirir.

Özellikle bir bağlantıya tıkladıktan sonra doğru etki alanında olup olmadığınızı her zaman kontrol edin.

[Daha fazla bilgiye buradan ulaşabilirsiniz](https://harrydenley.com/faking-twitter-unfurling).

### Çekiliş dolandırıcılığı {#giveaway}

Kripto para birimindeki en yaygın dolandırıcılıklardan biri, çekiliş dolandırıcılığıdır. Çekiliş dolandırıcılığı birçok şekilde olabilir, ancak genelde verilen cüzdan adresine ETH göndermeniz halinde ETH'nizin iki katını geri alacağınız vaat edilir. *Bu sebepten dolayı, 1 alana 1 bedava dolandırıcılığı olarak da bilinir.*

Bu dolandırıcılıklar genellikle aciliyet hissi yaratarak ödülü talep etmek için sınırlı bir zaman aralığı belirler.

### Sosyal medya hack'leri {#social-media-hacks}

Bunun üst düzey bir versiyonu Temmuz 2020'de önde gelen ünlülerin ve organizasyonların Twitter hesapları çalındığında gerçekleşti. Hacker eş zamanlı olarak çalınan hesaplarda bir Bitcoin çekilişi paylaştı. Aldatıcı tweetler hızlıca fark edilmiş ve silinmiş olsa da saldırganlar 11 Bitcoin koparmayı başardı (Eylül 2021 itibarıyla 500.000 ABD Doları).

![Twitter'daki dolandırıcılık](./appleTwitterScam.png)

### Ünlü çekilişleri {#celebrity-giveaway}

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

Dolandırıcı kripto ticaret komisyoncuları, paranızı almayı ve sizin adınıza yatırım yapmayı teklif edecek uzman kripto para komisyoncuları olduklarını iddia ederler. Dolandırıcı paranızı aldıktan sonra, daha fazla yatırım kazancını kaybetmemek için daha çok para göndermenizi isteyerek sizi kandırmaya devam edebilir veya tamamen ortadan kaybolabilir.

Bu dolandırıcılar, kurbanlarını genelde Youtube'da sahte hesaplar açarak ve doğal görünümlü komisyonculuk sohbetleri başlatarak bulurlar. Bu sohbetler genelde gerçekliğini arttırmak için yüksek miktarda oy alır, ancak oyların hepsi bot hesaplardandır.

**İnternetteki yabancılara sizin yerinize yatırım yapmaları için güvenmeyin. Krito paranızı kaybedersiniz.**

![YouTube'da bir ticaret simsarı dolandırıcılığı](./brokerScam.png)

### Kripto madencilik havuzu dolandırıcılıkları {#mining-pool-scams}

Eylül 2022'den itibaren Ethereum'da madencilik yapmak artık mümkün değil. Ancak, madencilik havuzu dolandırıcılığı hâlâ var. Madencilik havuzu dolandırıcılığı, istenmeyen kişilerin sizinle iletişim kurmasını ve bir Ethereum madencilik havuzuna katılarak büyük getiriler elde edebileceğinizi iddia etmesini içerir. Dolandırıcılar vaatlerde bulunurlar ve sizinle olabildiği kadar iletişimde kalırlar. Esasında, dolandırıcı sizi bir Ethereum madencilik havuzuna katıldığınızda kripto paralarınızın ETH üretmek için kullanılacağına ve ETH şeklinde kâr edeceğinize ikna etmeye çalışır. Sonrasında kripto paranızın küçük getiriler sağladığını görürsünüz. Bu sadece sizi daha çok yatırmanız için aldatmayı amaçlar. Sonunda, tüm paranız bilinmeyen bir adrese gönderilecek ve dolandırıcı ya ortadan kaybolacak ya da bazı durumlarda yakın zamanda olduğu gibi iletişim halinde kalmaya devam edecek.

Sonuç olarak; sosyal medya üzerinden sizinle iletişime geçip bir madencilik havuzuna girmenizi teklif eden kişilere karşı dikkatli olun. Kriptonuzu bir kez kaybettiğinizde, geri dönüşü yoktur.

Hatırlanacak birkaç şey:

- Kriptonuzdan para kazanma yolları hakkında size ulaşan herhangi biri hakkında dikkatli olun
- Kilitleme, likidite havuzları ve kriptonuzla yatırım yapmanın diğer yolları ile ilgili araştırmanızı yapın
- Bu tür projeler nadiren gerçektir. Eğer gerçek olsalardı, muhtemelen çok ünlü olurlardı ve onları duymuş olurdunuz.

[Bir kullanıcı madencilik havuzu dolandırıcılığında 200.000 ABD doları kaybetti](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Airdrop dolandırıcılığı {#airdrop-scams}

Airdrop dolandırıcılığı, bir varlığı (NFT, jeton) cüzdanınıza Airdrop ile gelen ve sizi Airdrop'la gönderilen varlığı almanız için bir dolandırıcılık web sitesine yönlendiren bir dolandırıcılık projesini içerir. Almaya çalışırken Ethereum cüzdanınızla oturum açmanız ve bir işlemi "onaylamanız" istenecektir. Bu işlem, açık ve özel anahtarlarınızı dolandırıcıya göndererek hesabınızı tehlikeye atar. Bu dolandırıcılığın alternatif bir biçimi, dolandırıcının hesabına para gönderen bir işlemi onaylamanızı isteyebilir.

[Airdrop dolandırıcılığı hakkında daha fazla bilgi](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Web güvenliği 101 {#web-security}

### Güçlü şifre kullanın {#use-strong-passwords}

[Hesap hack'lerinin %80'inden fazlası, zayıf veya çalınmış şifrelerin bir sonucudur](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Karakterler, sayılar ve sembollerden oluşan uzun bir kombinasyon hesaplarınızı güvende tutar.

Sık yapılan hatalardan biri, bilinen ve alakalı olan birkaç kelimeden oluşan bir kombinasyon kullanmaktır. Bu tür parolalar, sözlük saldırısı adı verilen bir saldırı tekniğine maruz kalma riski doğurdukları için güvenli değildir.

```md
Zayıf şifre örneği: TatlıTüylüKedicikler!

Güçlü şifre örneği: ymv\*azu.EAC8eyp8umf
```

Bir diğer yaygın hata da [sosyal mühendislik](https://wikipedia.org/wiki/Social_engineering_(security)) ile kolayca tahmin edilebilecek ya da bulunabilecek bir şifre kullanmaktır. Parolanızda annenizin kızlık soyadını, çocuklarınızın veya evcil hayvanlarınızın adlarını veya doğum tarihlerini kullanırsanız, saldırıya uğrama riskiniz artar.

#### Şifre belirlemek için iyi yöntemler: {#good-password-practices}

- Şifre üreticinizin veya doldurduğunuz formun izin verdiği kadar uzun şifreler oluşturun
- Büyük harf, küçük harf, sayı ve sembollerin bir karışımını kullanın
- Şifrenizde aile adları gibi kişisel bilgileri kullanmayın
- Yaygın kelimelerden kaçının

[Güçlü şifreler oluşturma hakkında daha fazla bilgi](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Her şey için farklı şifreler kullanın {#use-unique-passwords}

Bir veri sızıntısında açığa çıkmış olan güçlü bir parola, artık güçlü bir parola değildir. [Have I Been Pwned](https://haveibeenpwned.com) web sitesi, hesaplarınızın daha önce bir veri sızıntısına dahil olup olmadığını görmenizi sağlar. Eğer dahil olmuşlarsa **o parolaları hemen değiştirin**. Her hesap için benzersiz bir parola kullanmak, bilgisayar korsanlarının bir hesabın parolasının açığa çıkmasıyla her hesabınıza erişebilme riskini azaltır.

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

Bazen sizden kimliğinizi benzersiz kanıtlarla doğrulamanız istenebilir. Bunlar, **faktörler** olarak bilinir. 3 önemli faktör şunlardır:

- Bildiğiniz bir şey (şifre veya güvenlik sorusu gibi)
- Olduğunuz bir şey (parmak izi veya göz/yüz tarayıcısı gibi)
- Sahip olduğunuz bir şey (telefonunuzda bir güvenlik anahtarı veya kimlik doğrulama uygulaması)

**İki Faktörlü Doğrulama (2FA)** kullanmak, çevrimiçi hesaplarınıza ekstra bir *güvenlik faktörü* eklemenizi sağlar. 2FA, sadece bir parolaya sahip olmanın bir hesaba girmek için yeterli olmamasını sağlar. En yaygın olarak, ikinci faktör **zaman esaslı tek seferlik şifre (TOTP)** olarak bilinen, Google Authenticator veya Authy gibi bir doğrulayıcı uygulamadan ulaşabileceğiniz rastgele seçilmiş 6 haneli bir koddur. Bunlar "senin sahip olduğun bir şey" faktörü ile çalışırlar çünkü zamanlı kodu oluşturan tohum, sizin aygıtınızda depolanır.

<InfoBanner emoji=":lock:">
  <div>
    Not: SMS tabanlı 2FA kullanımı, <a href="https://www.vice.com/tr/makale/3kx4ej/sim-jacking-mobile-phone-fraud">SIM hırsızlığı</a> tehlikesine karşı açıktır ve güvenli değildir. En iyi güvenlik için <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> ya da <a href="https://authy.com/">Authy</a> gibi bir hizmet kullanın.
  </div>
</InfoBanner>

#### Güvenlik anahtarları {#security-keys}

Güvenlik anahtarı, 2FA'nın daha gelişmiş ve güvenli bir türüdür. Güvenlik anahtarları, kimlik doğrulama uygulamaları gibi çalışan fiziksel donanımlı kimlik doğrulama cihazlarıdır. Bir güvenlik anahtarı kullanmak 2FA'daki en güvenli yoldur. Bu anahtarların birçoğu FIDO Evrensel İkinci Faktör (U2F) standartından yararlanır. [FIDO U2F hakkında daha fazlasını öğrenin](https://www.yubico.com/authentication-standards/fido-u2f/).

2FA hakkında daha fazlasını izleyin:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Tarayıcı uzantılarını kaldırın {#uninstall-browser-extensions}

Chrome uzantıları ve Firefox Eklentileri gibi tarayıcı uzantıları, tarayıcı işlevselliğini artırabilir fakat beraberinde riskler de getirir. Varsayılan olarak, çoğu tarayıcı uzantısı "site verilerini okuma ve değiştirme" erişimi ister ve verilerinizle hemen hemen her şeyi yapmalarına izin verir. Chrome uzantıları her zaman otomatik olarak güncellenir, bu nedenle önceden güvenli bir uzantı daha sonra kötü amaçlı kod içerecek şekilde güncellenebilir. Çoğu tarayıcı uzantısı verilerinizi çalmaya çalışmaz, ancak yapabileceklerinin farkında olmalısınız.

#### Bu yollarla güvende kalabilirsiniz: {#browser-extension-safety}

- Sadece güvenilir kaynaklardan tarayıcı eklentileri indirin
- Kullanılmayan tarayıcı eklentilerini silin
- Otomatik güncellemeyi durdurmak için yerel olarak Chrome eklentilerini silin (Gelişmiş)

[Tarayıcı uzantılarının riskleri hakkında daha fazla bilgi](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

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
