---
title: Merkeziyetsiz kullanıcı arayüzleri için IPFS
description: Bu öğretici, okuyucuya bir merkeziyetsiz uygulama için kullanıcı arayüzünü saklamak üzere IPFS'in nasıl kullanılacağını öğretir. Uygulamanın verileri ve iş mantığı merkeziyetsiz olsa da sansüre dayanıklı bir kullanıcı arayüzü olmadan kullanıcılar yine de ona erişimini kaybedebilir.
author: Ori Pomerantz
tags: [ "ipfs" ]
skill: beginner
lang: tr
published: 29/06/2024
---

İnanılmaz yeni bir merkeziyetsiz uygulama yazdınız. Hatta onun için bir [kullanıcı arayüzü](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) bile yazdınız. Ama şimdi birisinin, bulutta bulunan tek bir sunucu olan kullanıcı arayüzünüzü çökertmek suretiyle onu sansürlemeye çalışacağından korkuyorsunuz. Bu öğreticide, kullanıcı arayüzünüzü **[gezegenler arası dosya sistemine (IPFS)](https://ipfs.tech/developers/)** koyarak sansürden nasıl kaçınacağınızı öğreneceksiniz, böylece ilgilenen herkes gelecekteki erişim için onu bir sunucuya sabitleyebilecek.

Tüm işi yapmak için [Fleek](https://resources.fleek.xyz/docs/) gibi üçüncü taraf bir hizmeti kullanabilirsiniz. Bu öğretici, daha fazla iş olsa bile ne yaptıklarını anlayacak kadarını yapmak isteyen kişiler içindir.

## Yerel olarak başlarken {#getting-started-locally}

Birden fazla [üçüncü taraf IPFS sağlayıcısı](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service) vardır, ancak test için IPFS'i yerel olarak çalıştırarak başlamak en iyisidir.

1. [IPFS kullanıcı arayüzünü](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions) kurun.

2. Web sitenizle bir dizin oluşturun. [Vite](https://vite.dev/) kullanıyorsanız bu komutu kullanın:

   ```sh
   pnpm vite build
   ```

3. IPFS Desktop'ta, **İçe Aktar > Klasör**'e tıklayın ve önceki adımda oluşturduğunuz dizini seçin.

4. Az önce yüklediğiniz klasörü seçin ve **Yeniden Adlandır**'a tıklayın. Ona daha anlamlı bir isim verin.

5. Tekrar seçin ve **Bağlantıyı paylaş**'a tıklayın. URL'yi panoya kopyalayın. Bağlantı, `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ` gibi olacaktır.

6. **Durum**'a tıklayın. Ağ geçidi adresini görmek için **Gelişmiş** sekmesini genişletin. Örneğin, benim sistemimde adres `http://127.0.0.1:8080` şeklindedir.

7. Adresinizi bulmak için bağlantı adımındaki yolu ağ geçidi adresiyle birleştirin. Örneğin, yukarıdaki örnek için URL `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ` şeklindedir. Sitenizi görmek için bu URL'yi bir tarayıcıda açın.

## Yükleme {#uploading}

Artık dosyaları yerel olarak sunmak için IPFS kullanabilirsiniz ki bu pek heyecan verici değil. Sonraki adım, çevrimdışıyken onları dünyaya sunmaktır.

Çok sayıda iyi bilinen [sabitleme hizmetleri](https://docs.ipfs.tech/concepts/persistence/#pinning-services) vardır. Onlardan birini seçin. Hangi hizmeti kullanırsanız kullanın, bir hesap oluşturmanız ve IPFS masaüstünüzdeki **içerik tanımlayıcısını (CID)** ona sağlamanız gerekir.

Şahsen, [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) uygulamasını kullanımının en kolay olduğunu gördüm. Bunun için talimatlar şunlardır:

1. [Kontrol paneline](https://dashboard.4everland.org/overview) gidin ve cüzdanınızla giriş yapın.

2. Sol kenar çubuğunda **Depolama > 4EVER Pin**'e tıklayın.

3. **Yükle > Seçilen CID**'ye tıklayın. İçeriğinize bir ad verin ve IPFS masaüstünden CID'yi sağlayın. Şu anda bir CID, `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ` gibi [base-58 kodlu](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524) bir karmayı temsil eden, `Qm` ile başlayıp 44 harf ve rakamla devam eden bir dizedir, ancak [bunun değişmesi muhtemeldir](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. İlk durum **Sırada**'dır. **Sabitlendi** olarak değişene kadar yeniden yükleyin.

5. Bağlantıyı almak için CID'nize tıklayın. Uygulamamı [burada](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/) görebilirsiniz.

6. Bir aydan uzun bir süre boyunca sabitlenmesi için hesabınızı etkinleştirmeniz gerekebilir. Hesap etkinleştirme maliyeti yaklaşık 1 dolardır. Kapattıysanız, tekrar etkinleştirme istenmesi için çıkış yapın ve tekrar giriş yapın.

## IPFS'den kullanma {#using-from-ipfs}

Bu noktada, IPFS içeriğinizi sunan merkezi bir ağ geçidine bir bağlantınız var. Kısacası, kullanıcı arayüzünüz biraz daha güvenli olabilir ancak hâlâ sansüre dayanıklı değil. Gerçek sansür direnci için, kullanıcıların IPFS'i [doğrudan bir tarayıcıdan](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites) kullanmaları gerekir.

Bunu kurduktan sonra (ve masaüstü IPFS çalışırken), herhangi bir sitede [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) adresine gidebilirsiniz ve bu içeriği merkeziyetsiz bir şekilde sunulmuş olarak alırsınız.

## Dezavantajlar {#drawbacks}

IPFS dosyalarını güvenilir bir şekilde silemezsiniz, bu nedenle kullanıcı arayüzünüzü değiştirdiğiniz sürece, onu ya merkezi bırakmak ya da IPFS'nin üzerinde değişkenlik sağlayan bir sistem olan [gezegenler arası isim sistemini (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs) kullanmak muhtemelen en iyisidir. Elbette, değişken olan her şey, IPNS durumunda karşılık geldiği özel anahtara sahip kişiye baskı yaparak sansürlenebilir.

Ek olarak, bazı paketlerin IPFS ile sorunu vardır, bu nedenle web siteniz çok karmaşıksa bu iyi bir çözüm olmayabilir. Ve tabii ki, sunucu entegrasyonuna dayanan herhangi bir şey, sadece istemci tarafını IPFS üzerinde bulundurarak merkeziyetsiz hale getirilemez.

## Sonuç {#conclusion}

Ethereum'un, merkeziyetsiz uygulamanızın veritabanı ve iş mantığı yönlerini merkeziyetsizleştirmenize olanak tanıdığı gibi, IPFS de kullanıcı arayüzünü merkeziyetsizleştirmenize olanak tanır. Bu, merkeziyetsiz uygulamanıza karşı bir saldırı vektörünü daha kapatmanıza olanak tanır.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).
