---
title: Bir cüzdan nasıl kullanılır
metaTitle: Ethereum Cüzdanları Nasıl Kullanılır | Adım Adım
description: Token göndermeyi, almayı ve web3 projelerine bağlanmayı açıklayan bir rehber.
lang: tr
---

Bir cüzdanın tüm temel işlevlerini nasıl kullanacağınızı öğrenin. Henüz bir cüzdanınız yoksa, [Nasıl Ethereum hesabı oluşturulur](/guides/how-to-create-an-ethereum-account/) rehberimize göz atın.

## Cüzdanınızı açın {#open-your-wallet}

Muhtemelen bakiyenizi gösteren ve token göndermek ile almak için düğmeler içeren bir kontrol paneli görmelisiniz.

## Kripto para alma {#receive-cryptocurrency}

Cüzdanınıza kripto almak istiyor musunuz?

Her Ethereum hesabının, benzersiz bir sayı ve harf dizisi olan kendi alıcı adresi vardır. Adres, bir banka hesap numarası gibi işlev görür. Ethereum adresleri her zaman "0x" ile başlar. Bu adresi herkesle paylaşabilirsiniz: bunu yapmak güvenlidir.

Adresiniz ev adresiniz gibidir: insanların sizi bulabilmesi için onlara ne olduğunu söylemeniz gerekir. Bunu yapmak güvenlidir, çünkü nerede yaşadığınızı bilseler bile kimsenin içeri girememesi için ön kapınızı yalnızca sizin kontrol ettiğiniz başka bir anahtarla kilitleyebilirsiniz.

Size para göndermek isteyen kişiye açık adresinizi vermeniz gerekir. Birçok cüzdan uygulaması, daha kolay kullanım için adresinizi kopyalamanıza veya taranacak bir QR kodu göstermenize olanak tanır. Herhangi bir Ethereum adresini manuel olarak yazmaktan kaçının. Bu, kolayca yazım hatalarına ve fon kaybına yol açabilir.

Farklı uygulamalar değişiklik gösterebilir veya farklı bir dil kullanabilir, ancak fon transferi yapmaya çalışıyorsanız sizi benzer bir süreçten geçirmelidirler.

1. Cüzdan uygulamanızı açın.
2. "Al" (veya benzer şekilde ifade edilen bir seçenek) üzerine tıklayın.
3. Ethereum adresinizi panoya kopyalayın.
4. Göndericiye alıcı Ethereum adresinizi verin.

## Kripto para gönderme {#send-cryptocurrency}

Başka bir cüzdana ETH göndermek ister misiniz?

1. Cüzdan uygulamanızı açın.
2. Alıcı adresini alın ve alıcıyla aynı ağa bağlı olduğunuzdan emin olun.
3. Adresi manuel olarak yazmak zorunda kalmamak için alıcı adresini girin veya kameranızla bir QR kodu tarayın.
4. Cüzdanınızdaki "Gönder" düğmesine (veya benzer şekilde ifade edilen bir alternatife) tıklayın.

![Send field for crypto address](./send.png)
<br/>

5. DAI veya USDC gibi birçok varlık birden fazla ağda bulunur. Kripto token'ları transfer ederken, bunlar birbirinin yerine kullanılamayacağından alıcının sizinle aynı ağı kullandığından emin olun.
6. Cüzdanınızda, ağ koşullarına bağlı olarak değişen işlem ücretini karşılayacak kadar ETH olduğundan emin olun. Çoğu cüzdan, önerilen ücreti otomatik olarak işleme ekler ve siz de bunu onaylayabilirsiniz.
7. İşleminiz işlendikten sonra, ilgili kripto miktarı alıcının hesabında görünecektir. Bu, ağın o anda ne kadar kullanıldığına bağlı olarak birkaç saniyeden birkaç dakikaya kadar sürebilir.

## Projelere bağlanma {#connecting-to-projects}

Adresiniz tüm Ethereum projelerinde aynı olacaktır. Herhangi bir projeye ayrı ayrı kaydolmanıza gerek yoktur. Bir cüzdanınız olduğunda, herhangi bir ek bilgi olmadan herhangi bir Ethereum projesine bağlanabilirsiniz. E-posta veya başka bir kişisel bilgi gerekmez.

1. Herhangi bir projenin web sitesini ziyaret edin.
2. Projenin açılış sayfası yalnızca projenin statik bir açıklamasıysa, menüde sizi asıl web uygulamasına yönlendirecek olan "Uygulamayı Aç" düğmesine tıklayabilmelisiniz.
3. Uygulamaya girdikten sonra "Bağlan"a tıklayın.

![Button allowing user to connect to the website with a wallet](./connect1.png)

4. Sunulan seçenekler listesinden cüzdanınızı seçin. Cüzdanınızı göremiyorsanız, "WalletConnect" seçeneğinin altına gizlenmiş olabilir.

![Selecting from a list of wallets to connect with](./connect2.png)

5. Bağlantıyı kurmak için cüzdanınızdaki imza isteğini onaylayın. **Bu mesajı imzalama herhangi bir ETH harcamayı gerektirmemelidir**.
6. İşte bu kadar! Uygulamayı kullanmaya başlayın. [merkeziyetsiz uygulamalar (dapp'ler) sayfamızda](/apps/#explore) bazı ilginç projeler bulabilirsiniz.
   <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Daha fazlasını öğrenmek ister misiniz?</div>
  <ButtonLink href="/guides/">
    Diğer rehberlerimize göz atın
  </ButtonLink>
</AlertContent>
</Alert>

## Sıkça sorulan sorular {#frequently-asked-questions}

### Bir ETH adresine sahipsem, diğer blokzincirlerde de aynı adrese sahip olur muyum? {#if-i-own-an-eth-address-do-i-own-the-same-address-on-other-blockchains}

Aynı adresi tüm EVM uyumlu blokzincirlerde kullanabilirsiniz (kurtarma ifadesi olan bir cüzdan türüne sahipseniz). Bu [liste](https://chainlist.org/) size aynı adresle hangi blokzincirleri kullanabileceğinizi gösterecektir. Bitcoin gibi bazı blokzincirler tamamen ayrı bir ağ kuralları seti uygular ve farklı bir formata sahip farklı bir adrese ihtiyacınız olacaktır. Bir akıllı sözleşme cüzdanınız varsa, hangi blokzincirlerin desteklendiği hakkında daha fazla bilgi için ürün web sitesini kontrol etmelisiniz.

### Aynı adresi birden fazla cihazda kullanabilir miyim? {#can-i-use-the-same-address-on-multiple-devices}

Evet, aynı adresi birden fazla cihazda kullanabilirsiniz. Cüzdanlar teknik olarak yalnızca bakiyenizi göstermek ve işlem yapmak için bir arayüzdür, hesabınız cüzdanın içinde değil, blokzincirde saklanır.

### Kriptoyu almadım, bir işlemin durumunu nereden kontrol edebilirim? {#i-have-not-received-the-crypto-where-can-i-check-the-status-of-a-transaction}

Herhangi bir işlemin durumunu gerçek zamanlı olarak görmek için [blok gezginlerini](/developers/docs/data-and-analytics/block-explorers/) kullanabilirsiniz. Tek yapmanız gereken cüzdan adresinizi veya işlemin kimliğini aramaktır.

### İşlemleri iptal edebilir veya iade edebilir miyim? {#can-i-cancel-or-return-transactions}

Hayır, bir işlem onaylandıktan sonra işlemi iptal edemezsiniz.