---
title: Akıllı sözleşmeleri adlandırma
description: ENS ile Ethereum akıllı sözleşmelerini adlandırmak için en iyi uygulamalar
lang: tr
---

Akıllı sözleşmeler, Ethereum'un merkeziyetsiz altyapısının temel taşıdır ve otonom uygulamaları ve protokolleri mümkün kılar. Ancak sözleşme yetenekleri geliştikçe bile, kullanıcılar ve geliştiriciler bu sözleşmeleri tanımlamak ve referans göstermek için hâlâ ham onaltılık adreslere güvenmektedir.

[Ethereum İsim Servisi (ENS)](https://ens.domains/) ile akıllı sözleşmeleri adlandırmak, onaltılık sözleşme adreslerini ortadan kaldırarak kullanıcı deneyimini iyileştirir ve adres zehirlenmesi ve sahtekarlık saldırıları gibi saldırılardan kaynaklanan riski azaltır. Bu kılavuz, akıllı sözleşmeleri adlandırmanın neden önemli olduğunu, nasıl uygulanabileceğini ve süreci basitleştirmek ve geliştiricilerin bu uygulamayı benimsemesine yardımcı olmak için [Enscribe](https://www.enscribe.xyz) gibi mevcut araçları açıklamaktadır.

## Akıllı sözleşmeler neden adlandırılmalı? {#why-name-contracts}

### İnsan tarafından okunabilir tanımlayıcılar {#human-readable-identifiers}

Geliştiriciler ve kullanıcılar, `0x8f8e...f9e3` gibi anlaşılmaz sözleşme adresleriyle etkileşime girmek yerine, `v2.myapp.eth` gibi insanlar tarafından okunabilir isimleri kullanabilirler. Bu, akıllı sözleşme etkileşimlerini basitleştirir.

Bu, Ethereum adresleri için merkeziyetsiz bir adlandırma hizmeti sağlayan [Ethereum İsim Servisi](https://ens.domains/) tarafından mümkün kılınmıştır. Bu durum, Alan Adı Servisi'nin (DNS) internet kullanıcılarının `104.18.176.152` gibi bir IP adresi yerine ethereum.org gibi bir isim kullanarak ağ adreslerine erişmesini sağlamasına benzer.

### Geliştirilmiş güvenlik ve güven {#improved-security-and-trust}

Adlandırılmış sözleşmeler, yanlış adrese yapılan yanlış işlemleri azaltmaya yardımcı olur. Ayrıca kullanıcıların belirli uygulamalara veya markalara bağlı sözleşmeleri tanımlamasına yardımcı olurlar. Bu, özellikle isimler `uniswap.eth` gibi tanınmış üst alan adlarına eklendiğinde bir itibar güveni katmanı ekler.

Ethereum adreslerinin 42 karakter uzunluğunda olması nedeniyle, kullanıcıların adreslerdeki birkaç karakterin değiştirildiği küçük değişiklikleri fark etmeleri çok zordur. Örneğin `0x58068646C148E313CB414E85d2Fe89dDc3426870` gibi bir adres, cüzdanlar gibi kullanıcıya yönelik uygulamalar tarafından normalde `0x580...870` olarak kısaltılır. Bir kullanıcının birkaç karakterin değiştirildiği kötü niyetli bir adresi fark etmesi pek olası değildir.

Bu tür bir teknik, kullanıcıların doğru adresle etkileşime girdiklerine veya para gönderdiklerine inanmaya yönlendirildiği, ancak aslında adresin yalnızca doğru adrese benzediği, ancak aynı olmadığı adres sahtekarlığı ve zehirlenme saldırılarında kullanılır.

Cüzdanlar ve sözleşmeler için ENS adları bu tür saldırılara karşı koruma sağlar. DNS sahtekarlığı saldırıları gibi, ENS sahtekarlığı saldırıları da barındırılabilir, ancak bir kullanıcının onaltılık bir adresteki küçük bir değişikliği fark etmektense bir ENS adındaki yazım hatasını fark etmesi daha olasıdır.

### Cüzdanlar ve gezginler için daha iyi kullanıcı deneyimi {#better-ux}

Bir akıllı sözleşme bir ENS adı ile yapılandırıldığında, cüzdanlar ve blokzincir gezginleri gibi uygulamaların, onaltılık adresler yerine akıllı sözleşmeler için ENS adlarını görüntülemesi mümkündür. Bu, kullanıcılar için önemli bir kullanıcı deneyimi (UX) iyileştirmesi sağlar.

Örneğin, Uniswap gibi bir uygulama ile etkileşime girerken, kullanıcılar genellikle etkileşimde bulundukları uygulamanın `uniswap.org` web sitesinde barındırıldığını görürler, ancak Uniswap akıllı sözleşmelerini ENS ile adlandırmadıysa onlara onaltılık bir sözleşme adresi sunulur. Sözleşme adlandırılmışsa, bunun yerine çok daha kullanışlı olan `v4.contracts.uniswap.eth`'i görebilirler.

## Dağıtımda adlandırma ve dağıtım sonrası adlandırma {#when-to-name}

Akıllı sözleşmelerin adlandırılabileceği iki nokta vardır:

- **Dağıtım zamanında**: sözleşme dağıtılırken ona bir ENS adı atamak.
- **Dağıtımdan sonra**: mevcut bir sözleşme adresini yeni bir ENS adına eşlemek.

Her iki yaklaşım da ENS kayıtları oluşturabilmek ve ayarlayabilmek için bir ENS alan adına sahip veya yönetici erişimine sahip olmayı gerektirir.

## Sözleşmeler için ENS adlandırması nasıl çalışır? {#how-ens-naming-works}

ENS adları zincir üstünde saklanır ve ENS çözümleyicileri aracılığıyla Ethereum adreslerine çözümlenir. Bir akıllı sözleşmeyi adlandırmak için:

1. Bir üst ENS alan adını (ör. `myapp.eth`) kaydedin veya kontrol edin
2. Bir alt alan adı oluşturun (ör. `v1.myapp.eth`)
3. Alt alan adının `address` kaydını sözleşme adresine ayarlayın
4. Adın adresi aracılığıyla bulunabilmesi için sözleşmenin ters kaydını ENS'e ayarlayın

ENS adları hiyerarşiktir ve sınırsız sayıda alt adı destekler. Bu kayıtları ayarlamak genellikle ENS kayıt defteri ve genel çözümleyici sözleşmeleriyle etkileşime girmeyi içerir.

## Sözleşmeleri adlandırma araçları {#tools}

Akıllı sözleşmeleri adlandırmak için iki yaklaşım vardır. Ya bazı manuel adımlarla [ENS Uygulamasını](https://app.ens.domains) kullanmak ya da [Enscribe](https://www.enscribe.xyz) kullanmak. Bunlar aşağıda özetlenmiştir.

### Manuel ENS kurulumu {#manual-ens-setup}

[ENS Uygulamasını](https://app.ens.domains) kullanarak, geliştiriciler manuel olarak alt adlar oluşturabilir ve ileri adres kayıtlarını ayarlayabilirler. Ancak, ENS uygulaması aracılığıyla ad için ters kaydı ayarlayarak bir akıllı sözleşme için birincil bir ad ayarlayamazlar. [ENS belgelerinde](https://docs.ens.domains/web/naming-contracts/) yer alan manuel adımlar atılmalıdır.

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz), ENS ile akıllı sözleşme adlandırmayı basitleştirir ve kullanıcıların akıllı sözleşmelere olan güvenini artırır. Şunları sağlar:

- **Atomik dağıtım ve adlandırma**: Yeni bir sözleşme dağıtırken bir ENS adı atayın
- **Dağıtım sonrası adlandırma**: Önceden dağıtılmış sözleşmelere adlar ekleyin
- **Çoklu zincir desteği**: ENS'nin desteklendiği Ethereum ve L2 ağlarında çalışır
- **Sözleşme doğrulama verileri**: Kullanıcıların güvenini artırmak için birden çok kaynaktan çekilen sözleşme doğrulama verilerini içerir

Enscribe, kullanıcılar tarafından sağlanan ENS adlarını veya kullanıcının bir ENS adı yoksa kendi alan adlarını destekler.

Akıllı sözleşmeleri adlandırmaya ve görüntülemeye başlamak için [Enscribe Uygulamasına](https://app.enscribe.xyz) erişebilirsiniz.

## En iyi uygulamalar {#best-practices}

- Sözleşme yükseltmelerini şeffaf hale getirmek için `v1.myapp.eth` gibi **açık, sürümlenmiş adlar kullanın**
- Cüzdanlar ve blokzincir gezginleri gibi uygulamalarda görünürlük için sözleşmeleri ENS adlarına bağlamak amacıyla **ters kayıtları ayarlayın**.
- Sahiplikteki kazara değişiklikleri önlemek istiyorsanız **süre sonlarını yakından izleyin**
- Kullanıcıların, adlandırılmış sözleşmenin beklendiği gibi davrandığına güvenebilmesi için **sözleşme kaynağını doğrulayın**

## Riskler {#risks}

Akıllı sözleşmeleri adlandırmak, Ethereum kullanıcıları için önemli faydalar sağlar, ancak ENS alan adı sahipleri yönetimleri konusunda dikkatli olmalıdır. Önemli riskler şunları içerir:

- **Süre sonu**: Tıpkı DNS adları gibi, ENS adları kayıtları da sınırlı sürelidir. Bu nedenle, sahiplerin alan adlarının son kullanma tarihlerini izlemeleri ve süreleri dolmadan çok önce yenilemeleri hayati önem taşır. Hem ENS Uygulaması hem de Enscribe, son kullanma tarihi yaklaştığında alan adı sahipleri için görsel göstergeler sağlar.
- **Sahiplik değişikliği**: ENS kayıtları Ethereum'da değiştirilemez jetonlar olarak temsil edilir; burada belirli bir `.eth` alan adının sahibi, ilişkili değiştirilemez jetonu elinde bulundurur. Bu nedenle, farklı bir hesap bu değiştirilemez jetonun sahipliğini alırsa, yeni sahip uygun gördüğü şekilde herhangi bir ENS kaydını değiştirebilir.

Bu tür riskleri azaltmak için, `.eth` 2. seviye alan adlarının (2LD) sahip hesabı, sözleşme adlandırmasını yönetmek için oluşturulan alt alan adlarına sahip çoklu imzalı bir cüzdan aracılığıyla güvence altına alınmalıdır. Bu şekilde, alt alan adı düzeyinde sahiplikte herhangi bir kazara veya kötü niyetli değişiklik olması durumunda, bunlar 2LD sahibi tarafından geçersiz kılınabilir.

## Sözleşme adlandırmanın geleceği {#future}

Tıpkı alan adlarının web'de IP adreslerinin yerini alması gibi, sözleşme adlandırma da merkeziyetsiz uygulama geliştirme için en iyi uygulama haline geliyor. Cüzdanlar, gezginler ve gösterge panoları gibi daha fazla altyapı, sözleşmeler için ENS çözümlemesini entegre ettikçe, adlandırılmış sözleşmeler ekosistem genelinde güvenliği artıracak ve hataları azaltacaktır.

Akıllı sözleşmeleri tanımayı ve üzerinde mantık yürütmeyi kolaylaştırarak, adlandırma, Ethereum'daki kullanıcılar ve uygulamalar arasındaki boşluğu kapatmaya yardımcı olur, hem güvenliği hem de kullanıcılar için kullanıcı deneyimini iyileştirir.

## Daha fazla kaynak {#further-reading}

- [ENS ile Akıllı Sözleşmeleri Adlandırma](https://docs.ens.domains/web/naming-contracts/)
- [Enscribe ile Akıllı Sözleşmeleri Adlandırma](https://www.enscribe.xyz/docs).
