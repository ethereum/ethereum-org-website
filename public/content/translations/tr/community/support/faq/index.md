---
title: Sıkça sorulan sorular
description: Cüzdanlar, işlemler, staking ve daha fazlası hakkında yaygın Ethereum soruları.
lang: tr
---

## Yanlış adrese kripto gönderdim {#wrong-wallet}

Ethereum üzerinde gönderilen bir işlem geri alınamaz. Ne yazık ki, yanlış cüzdana ETH veya token gönderdiyseniz, işlemi geri almanın bir yolu yoktur.

**Ne yapabilirsiniz:**

- **Adresin sahibini tanıyorsanız**, doğrudan onlarla iletişime geçin ve fonları iade etmelerini isteyin
- **Adres bir borsaya veya bilinen bir hizmete aitse**, yardımcı olabilecekleri için destek ekipleriyle iletişime geçin
- **Bir sözleşme adresine token gönderdiyseniz**, sözleşmenin bir çekim veya kurtarma işlevi olup olmadığını kontrol edin (bu nadir bir durumdur)

Çoğu durumda, fonları kurtarmanın bir yolu yoktur. Hiçbir merkezi kuruluş, kurum veya kişi Ethereum'un sahibi değildir, bu da kimsenin işlemleri geri alamayacağı anlamına gelir. Onaylamadan önce her zaman alıcı adresini iki kez kontrol edin.

## Cüzdanıma erişimimi kaybettim {#lost-wallet-access}

Kurtarma seçenekleriniz kullandığınız cüzdan türüne bağlıdır.

### Kurtarma ifadeniz varsa {#if-you-have-your-seed-phrase-recovery-phrase}

Kurtarma ifadenizi kullanarak cüzdanınızı uyumlu herhangi bir cüzdan uygulamasında geri yükleyebilirsiniz. Bu nedenle kurtarma ifadenizi çevrimdışı olarak güvenli bir şekilde saklamanız çok önemlidir. Geri yükleme talimatları için cüzdan sağlayıcınızın belgelerini kontrol edin.

### Kurtarma ifadenizi kaybettiyseniz {#if-you-have-lost-your-seed-phrase}

Kurtarma ifadeniz veya özel anahtarlarınız olmadan fonlarınız kurtarılamaz. ethereum.org dahil hiç kimse parolanızı sıfırlayamaz veya bir öz saklama cüzdanına erişimi geri yükleyemez.

### Hesabınız bir borsadaysa {#if-your-account-is-on-an-exchange}

Hesabınız Coinbase, Binance veya Kraken gibi merkezi bir borsadaysa, doğrudan borsanın destek ekibiyle iletişime geçin. Platformlarındaki hesapları onlar kontrol eder ve parola sıfırlama veya hesap kurtarma konusunda yardımcı olabilirler.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

Cüzdanınızı kurtarmanıza yardım edeceğini iddia eden **hiç kimseyle kurtarma ifadenizi asla paylaşmayın**. Bu, en yaygın dolandırıcılık taktiklerinden biridir. Hiçbir meşru hizmet sizden asla kurtarma ifadenizi istemez.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Bir cüzdan nasıl kullanılır
</DocLink>

## İşlemim takıldı veya bekliyor {#stuck-transaction}

Ethereum üzerindeki işlemler, belirlediğiniz gaz ücreti ağın o anda gerektirdiğinden daha düşük olduğunda takılabilir. Çoğu cüzdan bunu düzeltmenize olanak tanır:

- **Hızlandırma:** Aynı işlemi daha yüksek bir gaz ücreti ile yeniden gönderin
- **İptal etme:** Bekleyen işlem ile aynı nonce değerini kullanarak kendi adresinize 0 ETH'lik bir işlem gönderin

### Faydalı rehberler {#helpful-guides}

- [MetaMask'te bekleyen bir işlem nasıl hızlandırılır veya iptal edilir](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Bekleyen Ethereum işlemleri nasıl iptal edilir](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Ethereum çekilişimi nasıl talep edebilirim? {#giveaway-scam}

Ethereum çekilişleri, ETH'nizi çalmak için tasarlanmış dolandırıcılıklardır. Gerçek olamayacak kadar iyi görünen tekliflere aldanmayın. Bir çekiliş adresine ETH gönderirseniz, herhangi bir hediye alamazsınız ve fonlarınızı kurtaramazsınız.

[Dolandırıcılığı önleme hakkında daha fazlası](/security/#common-scams)

## Nasıl ETH stake edebilirim? {#how-to-stake}

Bir doğrulayıcı olmak için, Ethereum yatırma sözleşmesine 32 ETH stake etmeli ve bir doğrulayıcı düğüm kurmalısınız. Ayrıca staking havuzları aracılığıyla daha az ETH ile de katılabilirsiniz.

Daha fazla bilgi [staking sayfalarımızda](/staking/) ve [staking launchpad'inde](https://launchpad.ethereum.org/) mevcuttur.

## Nasıl Ethereum madenciliği yapabilirim? {#mining-ethereum}

Ethereum madenciliği artık mümkün değildir. Eylül 2022'deki [Birleşme](/roadmap/merge/) sırasında Ethereum [İş Kanıtı (PoW)](/glossary/#pow) sisteminden [Hisse Kanıtı (PoS)](/glossary/#pos) sistemine geçtiğinde madencilik kapatıldı. Artık madenciler yerine Ethereum'un doğrulayıcıları var. İsteyen herkes ETH [stake edebilir](/glossary/#staking) ve ağı güvence altına almak için doğrulayıcı yazılımı çalıştırarak staking ödülleri alabilir.