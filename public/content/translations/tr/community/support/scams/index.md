---
title: Dolandırıldım veya fonlarımı kaybettim
metaTitle: Dolandırıcılık yardımı ve bildirme
description: Dolandırıldıysanız ne yapmalısınız, kalan varlıklarınızı nasıl güvence altına alırsınız ve dolandırıcılığı nereye bildirebilirsiniz.
lang: tr
---

Kripto para dolandırıcılıkları, finans ve teknoloji profesyonelleri de dahil olmak üzere her deneyim seviyesinden insanı hedef alır. Yalnız değilsiniz ve burada olmanız doğru bir ilk adımdır.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Hiç kimse blokzincir işlemlerini geri alamaz.** Birisi sizinle iletişime geçip bir ücret karşılığında fonlarınızı kurtarabileceğini iddia ederse, bu neredeyse kesinlikle ikinci bir dolandırıcılıktır. Aşağıdaki [kurtarma dolandırıcılıkları](#scam-types) bölümüne bakın.

</AlertDescription>
</AlertContent>
</Alert>

## Kalan varlıklarınızı güvence altına alın {#secure-assets}

Bir dolandırıcıyla etkileşime girdiyseniz veya cüzdanınızın ele geçirildiğinden şüpheleniyorsanız, derhal şu adımları atın:

1. **Kalan fonları**, dolandırıcının erişimi olmayan yeni ve güvenli bir cüzdana taşıyın
2. **Token onaylarını iptal edin.** Dolandırıcılar genellikle sizi sınırsız token harcamasını onaylamanız için kandırır. Bu izinleri iptal etmek, cüzdanınızın daha fazla boşaltılmasını önler
3. Bağlantılı olabilecek tüm borsa hesaplarındaki **şifreleri değiştirin**
4. Kripto ile ilgili tüm hesaplarda **iki faktörlü kimlik doğrulamayı (2FA) etkinleştirin**

### Token onayları nasıl iptal edilir {#revoke-approvals}

Bir merkeziyetsiz uygulama (dapp) veya akıllı sözleşme ile etkileşime girdiğinizde, ona token'larınızı harcama izni vermiş olabilirsiniz. Bir dolandırıcı sizi kötü niyetli bir sözleşmeyi onaylamanız için kandırdıysa, ilk dolandırıcılıktan sonra bile token'larınızı boşaltmaya devam edebilir.

Onayları kontrol etmek ve iptal etmek için şu araçları kullanın:

- [Revoke.cash](https://revoke.cash/): tüm aktif onayları görmek ve iptal etmek için cüzdanınızı bağlayın
- [Revokescout](https://revoke.blockscout.com/): Blockscout aracılığıyla onayları kontrol edin ve iptal edin
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): Etherscan aracılığıyla onayları kontrol edin ve iptal edin

<DocLink href="/guides/how-to-revoke-token-access/">
  Adım adım rehber: Token erişimi nasıl iptal edilir
</DocLink>

## Dolandırıcı adreslerini ve web sitelerini bildirin {#report}

Bildirimde bulunmak diğer kullanıcıları uyarmaya yardımcı olur ve kolluk kuvvetlerinin soruşturmalarına destek olabilir. Her şeyi belgeleyin: işlem hash'leri, cüzdan adresleri, ekran görüntüleri ve dolandırıcıyla olan her türlü iletişim.

### Bir dolandırıcı adresini bildirin {#report-address}

- [Chainabuse](https://www.chainabuse.com/): topluluk odaklı dolandırıcılık ve sahtekarlık bildirim veritabanı. Raporlar gönderin ve bilinen dolandırıcı adreslerini arayın
- [Etherscan report](https://info.etherscan.com/report-address/): en çok kullanılan Ethereum blok gezgini üzerinde bir adresi işaretleyin
- [CryptoScamDB](https://cryptoscamdb.org/): kripto para dolandırıcılıklarını izleyen açık kaynaklı veritabanı

### Bir dolandırıcı web sitesini veya sosyal medya hesabını bildirin {#report-website}

- [PhishTank](https://phishtank.org/): kimlik avı (phishing) URL'lerini gönderin ve doğrulayın
- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_phish/): kimlik avı sitelerini Chrome ve diğer tarayıcılarda engellenmeleri için Google'a bildirin
- [Netcraft](https://report.netcraft.com/report/mistake): kötü niyetli ve dolandırıcı web sitelerini bildirin
- Doğrudan dolandırıcılığın gerçekleştiği sosyal medya platformunda bildirin (Twitter/X, Discord, Telegram'ın hepsinde bildirme özellikleri vardır)

### Kolluk kuvvetlerine bildirin {#report-law-enforcement}

- **Amerika Birleşik Devletleri:** [FBI İnternet Suçları Şikayet Merkezi (IC3)](https://www.ic3.gov/)
- **Birleşik Krallık:** [Action Fraud](https://www.actionfraud.police.uk/)
- **Avrupa Birliği:** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Diğer ülkeler:** yerel polisinize şikayette bulunun. Kripto para dolandırıcılığı çoğu yargı bölgesinde bir suçtur

## Ne olduğunu analiz edin {#analyze}

Fonlarınızın nereye gittiğini anlamak raporlamaya yardımcı olabilir ve fonlar merkezi bir borsaya ulaşırsa kurtarma çabalarını destekleyebilir.

- [Blockscout](https://eth.blockscout.com/): fonların nereye gönderildiğini görmek için herhangi bir işlem hash'ini veya cüzdan adresini arayabileceğiniz açık kaynaklı blok gezgini
- [Etherscan](https://etherscan.io/): fonların nereye gönderildiğini görmek için herhangi bir işlem hash'ini veya cüzdan adresini arayın
- [Chainabuse araması](https://www.chainabuse.com/): bir adresin daha önce başka mağdurlar tarafından bildirilip bildirilmediğini kontrol edin
- BlockSec tarafından sunulan [MetaSleuth](https://metasleuth.io/): fon akışlarını haritalandıran görsel işlem izleme aracı

**Fonlar merkezi bir borsaya (Coinbase, Binance, Kraken gibi) gönderildiyse**, işlem detaylarıyla birlikte derhal destek ekipleriyle iletişime geçin. Borsalar bazen dolandırıcılık şüphesiyle işaretlenmiş hesapları dondurabilir.

## Acı gerçek {#hard-truth}

Ethereum merkeziyetsiz olduğu için hiçbir merkezi otorite işlemleri geri alamaz veya çalınan fonları kurtaramaz. Bir işlem blokzincir üzerinde onaylandıktan sonra kesindir.

Bildirimde bulunmak yine de değerlidir. Raporlar, kolluk kuvvetlerinin organize dolandırıcılık şebekelerini izlemesine yardımcı olur ve Chainabuse ile Etherscan'de adresleri işaretlemek gelecekteki potansiyel mağdurları uyarır.

## Dikkat edilmesi gereken dolandırıcılık türleri {#scam-types}

<ExpandableCard
title="Giveaway and airdrop scams"
contentPreview="No one is giving away free ETH. These offers are always scams."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

Dolandırıcılar, ETH'nizi katlamayı veya size ücretsiz token vermeyi vaat eden sahte çekilişler oluşturur. Genellikle Vitalik Buterin gibi tanınmış kişileri taklit ederler. Bir "çekiliş" adresine ETH gönderirseniz, karşılığında hiçbir şey alamazsınız.

**Unutmayın:** Vitalik ve diğer önde gelen isimler sizden asla onlara ETH göndermenizi istemez.

[Yaygın dolandırıcılıklar hakkında daha fazlası](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="Impersonation and fake support"
contentPreview="No one from Ethereum or ethereum.org will ever contact you first."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

Dolandırıcılar Discord, Telegram ve sosyal medyada Ethereum ekip üyelerini, moderatörleri veya destek temsilcilerini taklit ederler. Size yardım teklif eden veya hesabınızda bir sorun olduğunu iddia eden doğrudan mesajlar gönderebilirler.

**Unutmayın:**

- Bir "Ethereum destek ekibi" yoktur
- Gerçek moderatörler size asla ilk mesajı (DM) atmaz
- Kurtarma ifadenizi veya özel anahtarlarınızı hiçbir nedenle kimseyle paylaşmayın
- İstenmeyen mesajlarda gönderilen bağlantılara asla tıklamayın

</ExpandableCard>

<ExpandableCard
title="Recovery scams"
contentPreview="After being scammed, watch out for fake 'crypto recovery experts.'"
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

Kurtarma dolandırıcılıkları özellikle halihazırda fonlarını kaybetmiş kişileri hedef alır. Dolandırıcılar, dolandırıldığından bahseden kişiler için sosyal medyayı izler, ardından "blokzincir araştırmacıları" veya "kripto kurtarma uzmanları" kılığına girerek onlara ulaşır.

Peşin bir ücret karşılığında çalınan kriptonuzu izlemeyi ve kurtarmayı vaat ederler. Siz ödeme yaptıktan sonra ortadan kaybolurlar.

**Hiçbir meşru hizmet blokzincir işlemlerini geri alamaz.** Bunu vaat eden herkes yalan söylüyordur. Bu, en yaygın devam niteliğindeki dolandırıcılıklardan biridir.

</ExpandableCard>

<ExpandableCard
title="Phishing websites and fake apps"
contentPreview="Scam sites mimic real wallets and exchanges to steal your credentials."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

Kimlik avı siteleri gerçek cüzdan uygulamalarına, borsalara veya merkeziyetsiz finans (DeFi) platformlarına birebir benzer. Sizi kurtarma ifadenizi girmeye veya cüzdanınızı bağlamaya kandırır, ardından fonlarınızı boşaltırlar.

**Kendinizi koruyun:**

- Cüzdanınızı bağlamadan önce her zaman URL'yi doğrulayın
- Düzenli olarak kullandığınız resmi siteleri yer imlerine ekleyin
- Kurtarma ifadenizi hiçbir web sitesine girmeyin. Meşru uygulamalar bunu asla istemez
- Şüpheli URL'leri kontrol etmek için [PhishTank](https://phishtank.org/) kullanın

<DocLink href="/guides/how-to-id-scam-tokens/">
  Dolandırıcı token'lar nasıl tespit edilir
</DocLink>

</ExpandableCard>

<DocLink href="/security/">
  Ethereum güvenliği ve dolandırıcılığı önleme için tam rehber
</DocLink>