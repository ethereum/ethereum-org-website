---
title: "Merkeziyetsiz kullanıcı arayüzleri için IPFS"
description: "Bu eğitim, okuyucuya bir dapp'in kullanıcı arayüzünü depolamak için IPFS'nin nasıl kullanılacağını öğretir. Uygulamanın verileri ve iş mantığı merkeziyetsiz olsa da, sansüre dirençli bir kullanıcı arayüzü olmadan kullanıcılar uygulamaya erişimlerini yine de kaybedebilirler."
author: Ori Pomerantz
tags:
  - ipfs
  - dapps
  - ön yüz
skill: beginner
breadcrumb: "Dapp arayüzleri için IPFS"
lang: tr
published: 2024-06-29
---

İnanılmaz yeni bir merkeziyetsiz uygulama (dapp) yazdınız. Hatta bunun için bir [kullanıcı arayüzü](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) bile yazdınız. Ancak şimdi, buluttaki tek bir sunucudan ibaret olan kullanıcı arayüzünüzü çökerterek birinin onu sansürlemeye çalışacağından korkuyorsunuz. Bu eğitimde, ilgilenen herkesin gelecekte erişmek üzere bir sunucuya sabitleyebilmesi (pin) için kullanıcı arayüzünüzü **[gezegenler arası dosya sistemine (IPFS)](https://ipfs.tech/developers/)** koyarak sansürden nasıl kaçınacağınızı öğreneceksiniz.

Tüm işi yapması için [Fleek](https://resources.fleek.xyz/docs/) gibi üçüncü taraf bir hizmet kullanabilirsiniz. Bu eğitim, daha fazla iş gerektirse bile ne yaptıklarını anlayacak kadarını kendi yapmak isteyenler içindir.

## Yerel olarak başlama {#getting-started-locally}

Birden fazla [üçüncü taraf IPFS sağlayıcısı](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service) vardır, ancak test için IPFS'yi yerel olarak çalıştırarak başlamak en iyisidir.

1. [IPFS kullanıcı arayüzünü](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions) yükleyin.

2. Web sitenizi içeren bir dizin oluşturun. Eğer [Vite](https://vite.dev/) kullanıyorsanız, şu komutu kullanın:

   ```sh
   pnpm vite build
   ```

3. IPFS Desktop'ta **İçe Aktar > Klasör** (Import > Folder) seçeneğine tıklayın ve önceki adımda oluşturduğunuz dizini seçin.

4. Yeni yüklediğiniz klasörü seçin ve **Yeniden Adlandır**'a (Rename) tıklayın. Daha anlamlı bir isim verin.

5. Tekrar seçin ve **Bağlantıyı paylaş**'a (Share link) tıklayın. URL'yi panoya kopyalayın. Bağlantı `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ` benzeri bir şey olacaktır.

6. **Durum**'a (Status) tıklayın. Ağ geçidi adresini görmek için **Gelişmiş** (Advanced) sekmesini genişletin. Örneğin, benim sistemimde adres `http://127.0.0.1:8080` şeklindedir.

7. Adresinizi bulmak için bağlantı adımındaki yolu ağ geçidi adresiyle birleştirin. Örneğin, yukarıdaki örnek için URL `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ` şeklindedir. Sitenizi görmek için bu URL'yi bir tarayıcıda açın.

## Yükleme {#uploading}

Artık dosyaları yerel olarak sunmak için IPFS'yi kullanabilirsiniz, ki bu pek de heyecan verici değildir. Bir sonraki adım, siz çevrimdışıyken bunları dünyanın erişimine açmaktır.

Çok sayıda iyi bilinen [sabitleme (pinning) hizmeti](https://docs.ipfs.tech/concepts/persistence/#pinning-services) vardır. Bunlardan birini seçin. Hangi hizmeti kullanırsanız kullanın, bir hesap oluşturmanız ve IPFS masaüstünüzdeki **içerik tanımlayıcısını (CID)** bu hizmete sağlamanız gerekir.

Kişisel olarak, [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides)'i kullanması en kolay olanı olarak buldum. İşte bunun için talimatlar:

1. [Kontrol paneline](https://dashboard.4everland.org/overview) gidin ve cüzdanınızla giriş yapın.

2. Sol kenar çubuğunda **Storage > 4EVER Pin** seçeneğine tıklayın.

3. **Upload > Selected CID** seçeneğine tıklayın. İçeriğinize bir isim verin ve IPFS masaüstünden CID'yi sağlayın. Şu anda bir CID, `Qm` ile başlayan ve ardından `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ` gibi [base-58 kodlu](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524) bir hash'i temsil eden 44 harf ve rakamdan oluşan bir dizedir, ancak [bunun değişmesi muhtemeldir](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Başlangıç durumu **Queued** (Kuyrukta) şeklindedir. **Pinned** (Sabitlendi) olarak değişene kadar sayfayı yeniden yükleyin.

5. Bağlantıyı almak için CID'nize tıklayın. Uygulamamı [buradan](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/) görebilirsiniz.

6. Bir aydan daha uzun süre sabitlenmesi için hesabınızı etkinleştirmeniz gerekebilir. Hesap etkinleştirme maliyeti yaklaşık 1 dolardır. Eğer kapattıysanız, tekrar etkinleştirme sorulması için çıkış yapıp yeniden giriş yapın.

## IPFS'den kullanma {#using-from-ipfs}

Bu noktada, IPFS içeriğinizi sunan merkezi bir ağ geçidine giden bir bağlantınız var. Kısacası, kullanıcı arayüzünüz biraz daha güvenli olabilir ancak yine de sansüre dirençli değildir. Gerçek bir sansür direnci için kullanıcıların IPFS'yi [doğrudan bir tarayıcıdan](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites) kullanması gerekir.

Bunu yükledikten (ve masaüstü IPFS çalıştıktan) sonra, herhangi bir sitede [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) adresine gidebilirsiniz ve bu içeriği merkeziyetsiz bir şekilde sunulmuş olarak alırsınız.

## Dezavantajlar {#drawbacks}

IPFS dosyalarını güvenilir bir şekilde silemezsiniz, bu nedenle kullanıcı arayüzünüzü değiştirdiğiniz sürece, onu merkezi bırakmak veya IPFS üzerinde değiştirilebilirlik sağlayan bir sistem olan [gezegenler arası isim sistemini (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs) kullanmak muhtemelen en iyisidir. Elbette, değiştirilebilir olan her şey sansürlenebilir; IPNS durumunda bu, karşılık geldiği özel anahtara sahip kişiye baskı yapılarak gerçekleştirilebilir.

Ek olarak, bazı paketlerin IPFS ile sorunları vardır, bu nedenle web siteniz çok karmaşıksa bu iyi bir çözüm olmayabilir. Ve elbette, sunucu entegrasyonuna dayanan hiçbir şey sadece istemci tarafının IPFS üzerinde olmasıyla merkeziyetsiz hale getirilemez.

## ENS aracılığıyla keşfedilebilirlik {#discoverability}

Eğer bir ENS adını (vitalik.eth gibi) web sitenize yönlendirirseniz, bu tamamen merkeziyetsiz bir web sayfası olarak kabul edilecek ve [dweb3.wtf](https://dweb3.wtf) hizmeti tarafından otomatik olarak sabitlenecektir; ayrıca tıpkı DuckDuckGo, Brave Search veya Google'ın geleneksel web için yaptığı gibi [web3compass.net](https://web3compass.net) arama motoru üzerinden aranabilir hale getirilecektir.

## Sonuç {#conclusion}

Tıpkı Ethereum'un dapp'inizin veritabanı ve iş mantığı yönlerini merkeziyetsizleştirmenize izin vermesi gibi, IPFS de kullanıcı arayüzünü merkeziyetsizleştirmenize olanak tanır. Bu, dapp'inize yönelik bir saldırı vektörünü daha kapatmanızı sağlar.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).