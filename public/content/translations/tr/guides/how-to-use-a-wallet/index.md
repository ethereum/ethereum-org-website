---
title: Bir cüzdan nasıl kullanılır
description: Nasıl token gönderiliip alındığını ve web3 projelerine nasıl bağlanıldığını anlatan bir rehber.
lang: tr
---

# Bir cüzdan nasıl kullanılır

Bir cüzdanın temel fonksiyonlarının nasıl kullanılacağını öğrenin. Eğer halen bir hesabınız yoksa, [Nasıl Ethereum hesabı açılır](/guides/how-to-create-an-ethereum-account/) yazımızı inceleyebilirsiniz.

## Cüzdanınızı açın

Bakiyenizi gösteren ve token gönderip almak için butonlar içeren bir panel görmelisiniz.

## Kripto para alma

Cüzdanınıza kripto almak mı istiyorsunuz?

Her Ethereum hesabının eşsiz bir sayı ve harf dizisinden oluşan alıcı adresi vardır. Bu adres bir banka hesap numarası gibi işlev görür. Ethereum adresleri hep "0x" ile başlar. Bu adresi herhangi biriyle paylaşabilirsiniz: Bu, güvenlidir.

Adresiniz ev adresiniz gibidir: İnsanların sizi bulabilmeleri için söylemeniz gerekir. Bunu yapmak güvenlidir çünkü ön kapınızı sadece sizin kontrol ettiğiniz bir anahtarla kilitleyebilirsiniz, böylece nerede yaşadığınızı bilse bile kimse içeri giremez.

Size para göndermek isteyen herhangi birine herkese açık adresinizi vermelisiniz. Birçok cüzdan uygulaması kolay kullanım için adresinizi kopyalamanıza veya bir QR kodu göstermenize olanak verir. Herhangi bir Ethereum adresini manuel olarak girmekten kaçının. Bu kolayca yazımsal hatalara ve kayıp fonlara yol açabilir.

Farklı uygulamalar değişkenlik gösterebilir veya farklı diller kullanabilir, ancak fon aktarmak istiyorsanız sizi benzer bir süreçten geçirmeleri gerekir.

1. Cüzdan uygulamanızı açın.
2. "Al" (veya benzeri bir seçenek) tuşuna basın.
3. Ethereum adresinizi panoya kopyalayın.
4. Alıcı Ethereum adresinizi göndericiye verin.

## Kripto para gönderme

Başka bir cüzdana ETH göndermek ister miydiniz?

1. Cüzdan uygulamanızı açın.
2. Alıcı adresi alın ve alıcı ile aynı ağa bağlandığınızdan emin olun.
3. Alıcı adresi girin veya kameranız ile QR code okutun ki, adresi manuel olarak girmek zorunda kalmayasınız.
4. Cüzdanınızdaki "Gönder" (veya benzeri bir seçenek) butonuna basın.

![Kripto adres için gönderim alanı](./send.png)
<br/>

5. DAI veya USDC gibi birçok varlık, farklı ağlarda bulunur. Kripto token'ları aktarırken, bunlar değiştirilebilir olmadığı için alıcının sizinle aynı ağı kullandığından emin olun.
6. Ağ durumuna göre değişen işlem ücretini karşılamak için cüzdanınızda yeterince ETH olduğundan emin olun. Çoğu cüzdan daha sonra onaylayabileceğiniz işleme önerilen ücreti otomatikmen ekleyecektir.
7. İşleminiz gerçekleştirildiğinde, karşılık kripto miktarı alıcının hesabında görünecektir. Bu, ağın mevcut kullanımına göre birkaç saniye ila birkaç dakika arasında değişebilir.

## Projelere bağlanmak

Adresiniz tüm Ethereum projelerinde aynı olacaktır. Hiçbir projeye tek tek kaydolmanız gerekmez. Bir cüzdana sahip olduktan sonra, ek bir bilgi olmadan herhangi bir Ethereum projesine bağlanabilirsiniz. E-posta veya başka bir kişisel bilgi gerekmez.

1. Herhangi bir projenin web sitesine girin.
2. Eğer projenin giriş sayfası sadece projenin statik bir açıklamasıysa, menüde olan ve sizi asıl web uygulamasına yönlendirecek "Uygulamayı Aç" butonuna basabiliyor olmalısınız.
3. Uygulamaya girdiğinizde "Bağlan" düğmesine tıklayın.

![Kullanıcının cüzdan ile web sitesine bağlanmasını sağlayan buton](./connect1.png)

4. Verilen seçenekler listesinden cüzdanınızı seçin. Cüzdanınızı göremiyorsanız, "WalletConnect" seçeneğinin altında gizli olabilir.

![Bağlanmak için cüzdan listesinden seçim yapma](./connect2.png)

5. Bağlantıyı kurmak için cüzdanınızdaki imza isteğini kabul edin. **Bu mesajı imzalamak ETH harcamayı gerektirmez**.
6. Bu kadar! Uygulamayı kullanmaya başlayın. [Merkeziyetsiz uygulamalar sayfamızda](/dapps/#explore) bazı ilgi çekici projeleri bulabilirsiniz. <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Daha fazlasını mı öğrenmek istiyorsunuz?</div>
  <ButtonLink href="/guides/">
    Diğer rehberlerimizi inceleyin
  </ButtonLink>
</InfoBanner>

## Sıkça sorulan sorular

### Bir ETH adresi sahibiysem, aynı adrese diğer blok zincirlerde de sahip miyim?

Tüm EVM uyumlu blok zincirlerde aynı adresi kullanabilirsiniz (Kurtarma ifadesi içeren bir cüzdan tipine sahipseniz). Bu [liste](https://chainlist.org/) size hangi blok zincirlerde aynı adresi kullanabileceğinizi gösterecektir. Bitcoin gibi bazı blok zincirlerde tamamen farklı ağ kuralları uygulanır ve farklı bir biçimde farklı bir adrese ihtiyaç duyacaksınız. Bir akıllı sözleşme cüzdanına sahipseniz, hangi blok zincirlerin desteklendiği hakkında bilgi almak için ürünün web sitesine bakmalısınız.

### Aynı adresi birden fazla cihazda kullanabilir miyim?

Evet, aynı adresi birden fazla cihazda kullanabilirsiniz. Cüzdanlar teknik olarak sadece size bakiyenizi göstermek ve işlemler yapmanız için bir arayüzdür, hesabınız cüzdanda değil, blok zincirde depolanır.

### Kriptoyu almadım, bir işlemin durumunu nerede kontrol edebilirim?

[Blok tarayıcılarını](/developers/docs/data-and-analytics/block-explorers/) herhangi bir işlemin durumunu gerçek zamanda takip etmek için kullanabilirsiniz. Tüm yapmanız gereken cüzdan adresinizi veya işlemin kimliğini aramaktır.

### İşlemleri iptal veya iade edebilir miyim?

Hayır, bir işlem onaylandığında, işlemi iptal edemezsiniz.
