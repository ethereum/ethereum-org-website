---
title: Ethereum'da Gizlilik
description: Ethereum'da gizliliğinizi korumak için araçlar ve teknikler
lang: tr
---

# Ethereum'da Gizlilik {#introduction}

Gizlilik yalnızca kişisel güvenlik için gerekli olmakla kalmaz, aynı zamanda özgürlüğün temel taşı ve [merkeziyetsizliğin kilit bir garantörüdür](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Gizlilik insanlara kendilerini ifade etme, başkalarıyla işlem yapma ve toplulukları özgürce organize etme olanağı tanır. Ancak tüm blokzincirler gibi Ethereum'un halka açık defteri de gizliliği zorlaştırır.

Ethereum tasarım gereği şeffaftır. Zincir üstündeki her eylem, bakan herkese görünür. Ethereum, faaliyetlerinizi gerçek dünya kimliği yerine bir [açık anahtara](/decentralized-identity/#public-key-cryptography) bağlayarak takma ad kullanma olanağı sunsa da, hassas bilgileri ortaya çıkarmak ve kullanıcıları tanımlamak için faaliyet kalıpları analiz edilebilir.

Ethereum'a gizliliği koruyan araçlar oluşturmak, insanların, kuruluşların ve kurumların gereksiz ifşayı sınırlarken güvenli bir şekilde etkileşim kurmasına yardımcı olabilir. Bu, ekosistemi daha geniş bir kullanım senaryosu yelpazesi için daha güvenli ve pratik hale getirir.

## Yazımlar için gizlilik {#privacy-of-writes}

Varsayılan olarak, Ethereum'a yazılan her işlem halka açık ve kalıcıdır. Buna sadece ETH göndermek değil, aynı zamanda ENS adlarını kaydetmek, POAP'leri toplamak veya NFT ticareti yapmak da dahildir. Ödemeler, oylama veya kimlik doğrulama gibi günlük eylemler, bilgilerinizi istenmeyen taraflara ifşa edebilir. Bunları daha gizli hale getirmeye yardımcı olabilecek birkaç araç ve teknik vardır:

### Karıştırma protokolleri (veya "karıştırıcılar") {#mixing-protocols}

Karıştırıcılar, birçok kullanıcının işlemlerini paylaşılan bir "havuza" koyarak ve daha sonra insanların yeni bir adrese para çekmesine izin vererek göndericiler ve alıcılar arasındaki bağlantıyı koparır. Para yatırma ve çekme işlemleri birbirine karıştırıldığından, gözlemcilerin bunları birbirine bağlaması çok daha zordur.

_Örnekler: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Korumalı Havuzlar {#shielded-pools}

Korumalı havuzlar karıştırıcılara benzerdir ancak kullanıcıların havuzun içinde özel olarak fon tutmalarına ve transfer etmelerine olanak tanır. Sadece para yatırma ve çekme arasındaki bağlantıyı gizlemek yerine, korumalı havuzlar genellikle sıfır bilgi ispatlarıyla güvence altına alınan, devam eden özel bir durumu sürdürür. Bu, özel transferler, özel bakiyeler ve daha fazlasını oluşturmayı mümkün kılar.

_Örnekler: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Gizli adresler {#stealth-addresses}

Bir [gizli adres](https://vitalik.eth.limo/general/2023/01/20/stealth.html), her göndericiye benzersiz, tek seferlik bir posta kutusu vermek gibidir ve bunu sadece siz açabilirsiniz. Biri size her kripto gönderdiğinde, bu yeni bir adrese gider, böylece başka kimse tüm bu ödemelerin size ait olduğunu göremez. Bu, ödeme geçmişinizi gizli tutar ve izlenmesini zorlaştırır.

_Örnekler: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Diğer kullanım durumları {#other-use-cases}

Özel yazımları araştıran diğer projeler arasında [PlasmaFold](https://pse.dev/projects/plasma-fold) (özel ödemeler) ve [MACI](https://pse.dev/projects/maci) ve [Semaphore](https://pse.dev/projects/semaphore) (özel oylama) gibi sistemler bulunmaktadır.

Bu araçlar, Ethereum'a özel olarak yazma seçeneklerini genişletir, ancak her birinin kendine özgü ödünleri vardır. Bazı yaklaşımlar hâlâ deneyseldir, bazıları maliyetleri veya karmaşıklığı artırır ve karıştırıcılar gibi bazı araçlar nasıl kullanıldıklarına bağlı olarak yasal veya düzenleyici denetimlerle karşılaşabilir.

## Okumalar için gizlilik {#privacy-of-reads}

Ethereum'daki herhangi bir bilgiyi okumak veya kontrol etmek (örneğin cüzdan bakiyeniz) genellikle cüzdan sağlayıcınız, bir düğüm sağlayıcısı veya bir blok kaşifi gibi bir hizmet aracılığıyla gerçekleşir. Blokzinciri sizin için okumak üzere onlara güvendiğiniz için, IP adresiniz veya konumunuz gibi meta verilerle birlikte isteklerinizi de görebilirler. Sürekli aynı hesabı kontrol ederseniz, bu bilgiler kimliğinizi faaliyetlerinize bağlamak için bir araya getirilebilir.

Kendi Ethereum düğümünüzü çalıştırmak bunu önler, ancak tam blokzincirini depolamak ve senkronize etmek, özellikle mobil cihazlarda çoğu kullanıcı için maliyetli ve pratik değildir.

Özel okumaları araştıran bazı projeler şunları içerir: [Özel Bilgi Erişimi](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, ne aradığınızı ifşa etmeden veri getirme), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (sıfır bilgi ispatlarıyla özel kimlik kontrolleri), [vOPRF](https://pse.dev/projects/voprf) (Web3'te Web2 hesaplarını takma adla kullanma), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (şifrelenmiş veriler üzerinde hesaplama yapma) ve [MachinaIO](https://pse.dev/projects/machina-io) (işlevselliği korurken program ayrıntılarını gizleme).

## Kanıtlama için gizlilik {#privacy-of-proving}

Gizliliği koruyan kanıtlar, gereksiz ayrıntıları ifşa etmeden bir şeyin doğru olduğunu göstermek için Ethereum'da kullanabileceğiniz araçlardır. Örneğin, şunları yapabilirsiniz:

- Tüm doğum tarihinizi paylaşmadan 18 yaşından büyük olduğunuzu kanıtlama
- Tüm cüzdanınızı ifşa etmeden bir NFT veya jetonun sahipliğini kanıtlama
- Diğer kişisel verileri ifşa etmeden bir üyeliğe, ödüle veya oya uygun olduğunuzu kanıtlama

Bunlar için çoğu araç, sıfır bilgi ispatları gibi kriptografik tekniklere dayanır, ancak asıl zorluk onları günlük cihazlarda çalışacak kadar verimli, herhangi bir platforma taşınabilir ve güvenli hale getirmektir.

Kanıtlama için gizliliği araştıran bazı projeler şunları içerir: [İstemci Tarafı Kanıtlama](https://pse.dev/projects/client-side-proving) (ZK kanıtlama sistemleri), [TLSNotary](https://tlsnotary.org/), (web'deki herhangi bir verinin özgünlüğünün kanıtı), [Mopro](https://pse.dev/projects/mopro) (mobil istemci tarafı kanıtlama), [Özel Kanıt Yetkilendirmesi](https://pse.dev/projects/private-proof-delegation) (güven varsayımlarından kaçınan yetkilendirme çerçeveleri) ve [Noir](https://noir-lang.org/) (özel ve doğrulanabilir hesaplama dili).

## Gizlilik Sözlüğü {#privacy-glossary}

**Anonim**: Verilerinizdeki tüm tanımlayıcıların kalıcı olarak kaldırılmasıyla etkileşimde bulunarak, bilgilerin bir kişiye kadar izlenmesini imkansız kılmak

**Şifreleme**: Verileri yalnızca doğru anahtara sahip birinin okuyabileceği şekilde karıştıran bir süreç

**[Tamamen Homomorfik Şifreleme](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Şifrelenmiş verilerin şifresini hiç çözmeden doğrudan üzerinde hesaplamalar yapmanın bir yolu

**[Ayırt Edilemez Gizleme](https://pse.dev/projects/machina-io) (iO)**: Programları veya verileri kullanılabilir kalırken anlaşılmaz hale getiren gizlilik teknikleri

**[Çok Taraflı Hesaplama](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Birden çok tarafın özel girdilerini ifşa etmeden birlikte bir sonuç hesaplamasına olanak tanıyan yöntemler

**Programlanabilir Kriptografi**: Verilerin nasıl ve ne zaman paylaşıldığını, doğrulandığını veya ifşa edildiğini kontrol etmek için yazılımda özelleştirilebilen esnek, kural odaklı kriptografi

**Takma adlı**: Kişisel tanımlayıcılar yerine benzersiz kodlar veya numaralar (bir Ethereum adresi gibi) kullanma

**Seçici İfşa**: Yalnızca ihtiyaç duyulanı paylaşma yeteneği (örneğin, tüm cüzdan geçmişinizi ifşa etmeden bir NFT'ye sahip olduğunuzu kanıtlama)

**Bağlantısızlık**: Blokzincirindeki ayrı eylemlerin aynı adrese geri bağlanamamasını sağlamak

**Doğrulanabilirlik**: Başkalarının, Ethereum'daki bir işlemi veya kanıtı doğrulamak gibi bir iddianın doğru olduğunu teyit edebilmesini sağlamak

**Doğrulanabilir Yetkilendirme**: Başka bir tarafa bir görev atamak (örneğin, ağır kriptografi için bir sunucu kullanan bir mobil cüzdan gibi bir kanıt oluşturmak) ve aynı zamanda doğru yapıldığını doğrulayabilmek

**[Sıfır Bilgi İspatları](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP'ler)**: Birinin, temel verileri ifşa etmeden bilginin doğru olduğunu kanıtlamasına olanak tanıyan kriptografik protokoller

**ZK Toplaması**: İşlemleri zincir dışında gruplayan ve zincir üstünde bir geçerlilik kanıtı sunan bir ölçeklenebilirlik sistemi — varsayılan olarak özel değildir, ancak maliyetleri düşürerek (korumalı havuzlar gibi) verimli gizlilik sistemlerini etkinleştirirler

## Kaynaklar {#resources}

- [Ethereum'un Gizlilik Temsilcileri](https://pse.dev/) (PSE), ekosistem için gizliliğe odaklanmış bir Ethereum Foundation araştırma ve geliştirme laboratuvarı
- [Web3PrivacyNow](https://web3privacy.info/), çevrimiçi insan haklarını koruyan ve ilerleten insan, proje ve uyumlu kuruluşlardan oluşan bir ağ
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), cüzdanların kapsamlı bir listesini, işlevselliklerini, uygulamalarını ve belirli standartlara desteklerini sağlamayı amaçlayan bir Ethereum cüzdan derecelendirme sitesidir.
- [Zk-kit](https://zkkit.pse.dev/): Farklı projelerde ve sıfır bilgi protokollerinde yeniden kullanılabilen bir kütüphane seti (algoritmalar, yardımcı fonksiyonlar ve veri yapıları).
- [Gizlilik Uygulamaları](/apps/categories/privacy/) - Ethereum'da çalışan, özenle seçilmiş Gizlilik uygulamalarının bir listesini keşfedin.
