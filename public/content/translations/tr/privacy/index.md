---
title: Ethereum'da Gizlilik
description: Ethereum'da gizliliğinizi korumak için araçlar ve teknikler
lang: tr
---

Gizlilik sadece kişisel güvenlik için gerekli değildir, aynı zamanda özgürlüğün temel taşı ve [merkeziyetsizlik için kilit bir güvencedir](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Gizlilik, insanlara kendilerini ifade etme, başkalarıyla işlem yapma ve toplulukları özgürce organize etme yeteneği verir. Ancak tüm blokzincirler gibi, Ethereum'un halka açık defteri de gizliliği zorlaştırır.

Ethereum tasarımı gereği şeffaftır. Her zincir içi eylem, bakan herkes tarafından görülebilir. Ethereum, etkinliğinizi gerçek dünyadaki bir kimlik yerine bir [açık anahtara](/decentralized-identity/#public-key-cryptography) bağlayarak takma ad kullanımı sunsa da, etkinlik kalıpları hassas bilgileri ortaya çıkarmak ve kullanıcıları tanımlamak için analiz edilebilir.

Ethereum'a gizliliği koruyan araçlar inşa etmek, insanların, kuruluşların ve kurumların gereksiz ifşayı sınırlarken güvenli bir şekilde etkileşimde bulunmasına yardımcı olabilir. Bu, ekosistemi daha geniş bir kullanım senaryosu yelpazesi için daha güvenli ve daha pratik hale getirir.

<VideoWatch slug="privacy-is-existential" />

## Yazma işlemleri için gizlilik {#privacy-of-writes}

Varsayılan olarak, Ethereum'da yazılan her işlem herkese açık ve kalıcıdır. Bu sadece ETH göndermeyi değil, aynı zamanda ENS isimlerini kaydetmeyi, POAP'leri toplamayı veya NFT ticareti yapmayı da içerir. Ödemeler, oy verme veya kimlik doğrulama gibi günlük eylemler, bilgilerinizi istenmeyen taraflara ifşa edebilir. Bunları daha gizli hale getirmeye yardımcı olabilecek çeşitli araçlar ve teknikler vardır:

### Karıştırma protokolleri (veya "mikserler") {#mixing-protocols}

Mikserler, birçok kullanıcının işlemlerini ortak bir "havuza" koyarak ve ardından insanların daha sonra yeni bir adrese çekim yapmasına izin vererek göndericiler ve alıcılar arasındaki bağlantıyı koparır. Yatırma ve çekim işlemleri birbirine karıştığı için, gözlemcilerin bunları birbirine bağlaması çok daha zordur.

_Örnekler: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Korumalı Havuzlar {#shielded-pools}

Korumalı havuzlar mikserlere benzer, ancak kullanıcıların fonları havuzun kendi içinde gizli bir şekilde tutmasına ve transfer etmesine olanak tanır. Korumalı havuzlar, sadece yatırma ve çekim arasındaki bağlantıyı gizlemek yerine, genellikle sıfır bilgi ispatları ile güvence altına alınan devam eden gizli bir durum sürdürür. Bu, gizli transferler, gizli bakiyeler ve daha fazlasını oluşturmayı mümkün kılar.

_Örnekler: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Gizli adresler {#stealth-addresses}

Bir [gizli adres](https://vitalik.eth.limo/general/2023/01/20/stealth.html), her göndericiye yalnızca sizin açabileceğiniz benzersiz, tek seferlik bir posta kutusu vermek gibidir. Birisi size her kripto gönderdiğinde, bu yeni bir adrese gider, böylece başka hiç kimse tüm bu ödemelerin size ait olduğunu göremez. Bu, ödeme geçmişinizi gizli tutar ve izlenmesini zorlaştırır.

_Örnekler: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Diğer kullanım senaryoları {#other-use-cases}

Gizli yazma işlemlerini araştıran diğer projeler arasında [PlasmaFold](https://pse.dev/projects/plasma-fold) (gizli ödemeler) ile [MACI](https://pse.dev/projects/maci) ve [Semaphore](https://pse.dev/projects/semaphore) (gizli oy verme) gibi sistemler bulunur.

Bu araçlar Ethereum'da gizli bir şekilde yazma seçeneklerini genişletir, ancak her birinin ödünleşimleri vardır. Bazı yaklaşımlar hala deneyseldir, bazıları maliyetleri veya karmaşıklığı artırır ve mikserler gibi bazı araçlar nasıl kullanıldıklarına bağlı olarak yasal veya düzenleyici incelemelerle karşı karşıya kalabilir.

## Okuma işlemleri için gizlilik {#privacy-of-reads}

Ethereum'daki herhangi bir bilgiyi (örneğin cüzdan bakiyenizi) okumak veya kontrol etmek genellikle cüzdan sağlayıcınız, bir düğüm sağlayıcısı veya bir blok gezgini gibi bir hizmet aracılığıyla gerçekleşir. Blokzinciri sizin için okumaları konusunda onlara güvendiğiniz için, IP adresiniz veya konumunuz gibi meta verilerle birlikte isteklerinizi de görebilirler. Aynı hesabı kontrol etmeye devam ederseniz, bu bilgiler kimliğinizi etkinliğinizle ilişkilendirmek için bir araya getirilebilir.

Kendi Ethereum düğümünüzü çalıştırmak bunu önleyecektir, ancak tüm blokzinciri depolamak ve eşzamanlamak çoğu kullanıcı için, özellikle de mobil cihazlarda, maliyetli ve pratik olmayan bir durum olmaya devam etmektedir.

Gizli okuma işlemlerini araştıran bazı projeler arasında [Gizli Bilgi Erişimi](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, ne aradığınızı ifşa etmeden veri getirme), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (sıfır bilgi ispatları ile gizli kimlik kontrolleri), [vOPRF](https://pse.dev/projects/voprf) (Web2 hesaplarını Web3'te takma adla kullanma), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (şifrelenmiş veriler üzerinde hesaplama yapma) ve [MachinaIO](https://pse.dev/projects/machina-io) (işlevselliği korurken program ayrıntılarını gizleme) bulunur.

## İspatlama için gizlilik {#privacy-of-proving}

Gizliliği koruyan ispatlar, Ethereum'da gereksiz ayrıntıları ifşa etmeden bir şeyin doğru olduğunu göstermek için kullanabileceğiniz araçlardır. Örneğin, şunları yapabilirsiniz:

- Tam doğum tarihinizi paylaşmadan 18 yaşından büyük olduğunuzu ispatlamak
- Tüm cüzdanınızı ifşa etmeden bir NFT veya Token sahipliğini ispatlamak
- Diğer kişisel verilerinizi açığa çıkarmadan bir üyelik, ödül veya oy için uygunluğunuzu ispatlamak

Bunlar için çoğu araç, sıfır bilgi ispatları gibi kriptografik tekniklere dayanır, ancak asıl zorluk bunları günlük cihazlarda çalışacak kadar verimli, herhangi bir platforma taşınabilir ve güvenli hale getirmektir.

İspatlama için gizliliği araştıran bazı projeler arasında [İstemci Tarafı İspatlama](https://pse.dev/projects/client-side-proving) (ZK ispatlama sistemleri), [TLSNotary](https://tlsnotary.org/) (web'deki herhangi bir veri için özgünlük ispatları), [Mopro](https://pse.dev/projects/mopro) (mobil istemci tarafı ispatlama), [Gizli İspat Yetki Devri](https://pse.dev/projects/private-proof-delegation) (güven varsayımlarından kaçınan yetki devri çerçeveleri) ve [Noir](https://noir-lang.org/) (gizli ve doğrulanabilir hesaplama dili) bulunur.

## Gizlilik Sözlüğü {#privacy-glossary}

**Anonim**: Verilerinizden tüm tanımlayıcıların kalıcı olarak kaldırılarak etkileşimde bulunulması, bilgilerin bir bireye kadar izlenmesini imkansız hale getirir

**Şifreleme**: Verileri yalnızca doğru anahtara sahip birinin okuyabileceği şekilde karıştıran bir işlem

**[Tam Homomorfik Şifreleme](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Şifrelenmiş veriler üzerinde, şifreyi hiç çözmeden doğrudan hesaplama yapmanın bir yolu

**[Ayırt Edilemez Karartma](https://pse.dev/projects/machina-io) (iO)**: Programları veya verileri hala kullanılabilir durumdayken anlaşılmaz hale getiren gizlilik teknikleri

**[Çok Taraflı Hesaplama](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Birden fazla tarafın gizli girdilerini açığa çıkarmadan bir sonucu birlikte hesaplamasına olanak tanıyan yöntemler

**Programlanabilir Kriptografi**: Verilerin nasıl ve ne zaman paylaşılacağını, doğrulanacağını veya ifşa edileceğini kontrol etmek için yazılımda özelleştirilebilen esnek, kural odaklı kriptografi

**Takma Adlı (Pseudonymous)**: Kişisel tanımlayıcıların yerine benzersiz kodlar veya numaralar (bir Ethereum adresi gibi) kullanmak

**Seçici İfşa**: Yalnızca gerekeni paylaşma yeteneği (örneğin, tüm cüzdan geçmişinizi ifşa etmeden bir NFT'ye sahip olduğunuzu ispatlamak)

**Bağlantısızlık**: Blokzincirdeki ayrı eylemlerin aynı adrese bağlanamayacağından emin olmak

**Doğrulanabilirlik**: Başkalarının, Ethereum'daki bir işlemi veya ispatı doğrulamak gibi bir talebin doğru olduğunu onaylayabilmesini sağlamak

**Doğrulanabilir Yetki Devri**: Bir görevi (örneğin bir ispat oluşturmak) başka bir tarafa (örneğin ağır kriptografi için bir sunucu kullanan bir mobil cüzdan) atarken, aynı zamanda doğru yapıldığını doğrulayabilmek

**[Sıfır Bilgi İspatları](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP'ler)**: Birinin temel verileri ifşa etmeden bilginin doğru olduğunu ispatlamasına izin veren kriptografik protokoller

**ZK Rollup**: İşlemleri zincir dışı gruplayan ve zincir içi bir geçerlilik kanıtı sunan bir ölçeklenebilirlik sistemi; varsayılan olarak gizli değildir, ancak maliyetleri düşürerek verimli gizlilik sistemlerini (korumalı havuzlar gibi) mümkün kılarlar

## Kaynaklar {#resources}

- [Ethereum Gizlilik Temsilcileri](https://pse.dev/) (PSE), ekosistem için gizliliğe odaklanan bir Ethereum Vakfı araştırma ve geliştirme laboratuvarı
- [Web3PrivacyNow](https://web3privacy.info/), çevrimiçi insan haklarını koruyan ve geliştiren insanlardan, projelerden ve uyumlu kuruluşlardan oluşan bir ağ
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), cüzdanların, işlevlerinin, uygulamalarının ve belirli standartlara yönelik desteklerinin kapsamlı bir listesini sunmayı amaçlayan bir Ethereum cüzdan derecelendirme sitesi.
- [Zk-kit](https://zkkit.pse.dev/): Farklı projelerde ve sıfır bilgi protokollerinde yeniden kullanılabilecek bir dizi kütüphane (algoritmalar, yardımcı işlevler ve veri yapıları).
- [Gizlilik Uygulamaları](/apps/categories/privacy/) - Ethereum üzerinde çalışan özenle seçilmiş Gizlilik uygulamalarının bir listesini keşfedin.