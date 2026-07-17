---
title: "Akıllı sözleşmeleri isimlendirme"
description: "ENS ile Ethereum akıllı sözleşmelerini isimlendirmek için en iyi uygulamalar"
lang: tr
---

Akıllı sözleşmeler, otonom uygulamalara ve protokollere olanak tanıyan Ethereum'un merkeziyetsiz altyapısının temel taşıdır. Ancak sözleşme yetenekleri geliştikçe bile, kullanıcılar ve geliştiriciler bu sözleşmeleri tanımlamak ve bunlara referans vermek için hâlâ ham onaltılık (hexadecimal) adreslere güvenmektedir.

Akıllı sözleşmeleri [Ethereum Name Service (ENS)](https://ens.domains/) ile isimlendirmek, onaltılık sözleşme adreslerini ortadan kaldırarak kullanıcı deneyimini iyileştirir ve adres zehirlenmesi (address poisoning) ile kimlik sahtekarlığı (spoofing) gibi saldırı risklerini azaltır. Bu kılavuz, akıllı sözleşmeleri isimlendirmenin neden önemli olduğunu, nasıl uygulanabileceğini ve süreci basitleştirip geliştiricilerin bu uygulamayı benimsemesine yardımcı olmak için [Enscribe](https://www.enscribe.xyz) gibi mevcut araçları açıklamaktadır.

## Akıllı sözleşmeleri neden isimlendirmeliyiz? {#why-name-contracts}

### İnsan tarafından okunabilir tanımlayıcılar {#human-readable-identifiers}

Geliştiriciler ve kullanıcılar, `0x8f8e...f9e3` gibi anlaşılmaz sözleşme adresleriyle etkileşime girmek yerine `v2.myapp.eth` gibi insan tarafından okunabilir isimler kullanabilirler. Bu, akıllı sözleşme etkileşimlerini basitleştirir.

Bu, Ethereum adresleri için merkeziyetsiz bir isimlendirme hizmeti sunan [Ethereum Name Service](https://ens.domains/) sayesinde mümkün olmaktadır. Bu durum, Alan Adı Sistemi'nin (DNS) internet kullanıcılarının ağ adreslerine `104.18.176.152` gibi bir IP adresi yerine ethereum.org gibi bir isim kullanarak erişmesini sağlamasına benzer.

### Gelişmiş güvenlik ve güven {#improved-security-and-trust}

İsimlendirilmiş sözleşmeler, yanlış adrese yapılan kazara işlemleri azaltmaya yardımcı olur. Ayrıca kullanıcıların belirli uygulamalara veya markalara bağlı sözleşmeleri tanımlamasına da yardımcı olurlar. Bu, özellikle isimler `uniswap.eth` gibi iyi bilinen üst alan adlarına (parent domains) eklendiğinde bir itibar güveni katmanı ekler.

Ethereum adreslerinin 42 karakterlik uzunluğu nedeniyle, kullanıcıların adreslerdeki birkaç karakterin değiştirildiği küçük değişiklikleri fark etmesi çok zordur. Örneğin, `0x58068646C148E313CB414E85d2Fe89dDc3426870` gibi bir adres, cüzdanlar gibi kullanıcıya dönük uygulamalar tarafından normalde `0x580...870` şeklinde kısaltılır. Bir kullanıcının, birkaç karakterin değiştirildiği kötü niyetli bir adresi fark etmesi pek olası değildir.

Bu tür bir teknik, kullanıcıların doğru adresle etkileşime girdiklerine veya fon gönderdiklerine inandırıldığı, ancak aslında adresin sadece doğru adrese benzediği ve aynı olmadığı adres sahtekarlığı (spoofing) ve zehirlenmesi (poisoning) saldırılarında kullanılır.

Cüzdanlar ve sözleşmeler için ENS isimleri bu tür saldırılara karşı koruma sağlar. DNS sahtekarlığı saldırıları gibi, ENS sahtekarlığı saldırıları da barındırılabilir; ancak bir kullanıcının bir ENS ismindeki yazım hatasını fark etme olasılığı, onaltılık bir adresteki küçük bir değişikliği fark etme olasılığından daha yüksektir.

### Cüzdanlar ve tarayıcılar için daha iyi kullanıcı deneyimi (UX) {#better-ux}

Bir akıllı sözleşme bir ENS ismiyle yapılandırıldığında, cüzdanlar ve blokzincir tarayıcıları gibi uygulamaların akıllı sözleşmeler için onaltılık adresler yerine ENS isimlerini görüntülemesi mümkündür. Bu, kullanıcılar için önemli bir kullanıcı deneyimi (UX) artışı sağlar.

Örneğin, Uniswap gibi bir uygulamayla etkileşime girerken, kullanıcılar genellikle etkileşimde bulundukları uygulamanın `uniswap.org` web sitesinde barındırıldığını göreceklerdir, ancak Uniswap akıllı sözleşmelerini ENS ile isimlendirmemişse onlara onaltılık bir sözleşme adresi sunulacaktır. Sözleşme isimlendirilmişse, bunun yerine çok daha kullanışlı olan `v4.contracts.uniswap.eth` adresini görebilirler.

## Dağıtım sırasında ve dağıtım sonrasında isimlendirme {#when-to-name}

Akıllı sözleşmelerin isimlendirilebileceği iki nokta vardır:

- **Dağıtım sırasında**: sözleşmeye dağıtıldığı anda bir ENS ismi atamak.
- **Dağıtımdan sonra**: mevcut bir sözleşme adresini yeni bir ENS ismiyle eşleştirmek.

Her iki yaklaşım da ENS kayıtlarını oluşturabilmeleri ve ayarlayabilmeleri için bir ENS alan adına sahip veya yönetici erişimine dayanır.

## Sözleşmeler için ENS isimlendirmesi nasıl çalışır? {#how-ens-naming-works}

ENS isimleri zincir içi olarak saklanır ve ENS çözümleyicileri (resolvers) aracılığıyla Ethereum adreslerine çözümlenir. Bir akıllı sözleşmeyi isimlendirmek için:

1. Bir üst ENS alan adını kaydedin veya kontrol edin (örn. `myapp.eth`)
2. Bir alt alan adı (subdomain) oluşturun (örn. `v1.myapp.eth`)
3. Alt alan adının `address` kaydını sözleşme adresine ayarlayın
4. İsmin adresi aracılığıyla bulunabilmesi için sözleşmenin ters kaydını (reverse record) ENS'ye ayarlayın

ENS isimleri hiyerarşiktir ve sınırsız alt ismi destekler. Bu kayıtları ayarlamak genellikle ENS kayıt defteri (registry) ve genel çözümleyici (public resolver) sözleşmeleriyle etkileşime girmeyi içerir.

## Sözleşmeleri isimlendirmek için araçlar {#tools}

Akıllı sözleşmeleri isimlendirmek için iki yaklaşım vardır. Ya bazı manuel adımlarla [ENS App](https://app.ens.domains) kullanmak ya da [Enscribe](https://www.enscribe.xyz) kullanmak. Bunlar aşağıda özetlenmiştir.

### Manuel ENS kurulumu {#manual-ens-setup}

Geliştiriciler, [ENS App](https://app.ens.domains/) kullanarak manuel olarak alt isimler oluşturabilir ve ileri adres kayıtlarını (forward address records) ayarlayabilirler. Ancak, ENS uygulaması aracılığıyla isim için ters kaydı ayarlayarak bir akıllı sözleşme için birincil isim belirleyemezler. [ENS belgelerinde](https://docs.ens.domains/web/naming-contracts/) kapsanan manuel adımların atılması gerekir.

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz), ENS ile akıllı sözleşme isimlendirmesini basitleştirir ve kullanıcıların akıllı sözleşmelere olan güvenini artırır. Şunları sağlar:

- **Atomik dağıtım ve isimlendirme**: Yeni bir sözleşme dağıtırken bir ENS ismi atayın
- **Dağıtım sonrası isimlendirme**: Zaten dağıtılmış sözleşmelere isimler ekleyin
- **Çoklu zincir desteği**: ENS'nin desteklendiği Ethereum ve L2 ağlarında çalışır
- **Sözleşme doğrulama verileri**: Kullanıcılar için güveni artırmak amacıyla birden fazla kaynaktan çekilen sözleşme doğrulama verilerini içerir

Enscribe, kullanıcılar tarafından sağlanan ENS isimlerini veya kullanıcının bir ENS ismi yoksa kendi alan adlarını destekler.

Akıllı sözleşmeleri isimlendirmeye ve görüntülemeye başlamak için [Enscribe App](https://app.enscribe.xyz)'e erişebilirsiniz.

## En iyi uygulamalar {#best-practices}

- Sözleşme yükseltmelerini şeffaf hâle getirmek için `v1.myapp.eth` gibi **açık, sürümlendirilmiş isimler kullanın**
- Cüzdanlar ve blokzincir tarayıcıları gibi uygulamalarda görünürlük sağlamak amacıyla sözleşmeleri ENS isimlerine bağlamak için **ters kayıtları ayarlayın**.
- Sahiplikteki kazara değişiklikleri önlemek istiyorsanız **süre sonlarını yakından izleyin**
- Kullanıcıların isimlendirilmiş sözleşmenin beklendiği gibi davrandığına güvenebilmesi için **sözleşme kaynağını doğrulayın**

## Riskler {#risks}

Akıllı sözleşmeleri isimlendirmek Ethereum kullanıcıları için önemli faydalar sağlar, ancak ENS alan adı sahipleri bunların yönetimi konusunda dikkatli olmalıdır. Dikkate değer riskler şunları içerir:

- **Süre sonu**: Tıpkı DNS isimleri gibi, ENS isim kayıtları da sınırlı bir süreye sahiptir. Bu nedenle, sahiplerin alan adlarının son kullanma tarihlerini izlemeleri ve süreleri dolmadan çok önce yenilemeleri hayati önem taşır. Hem ENS App hem de Enscribe, süre sonu yaklaştığında alan adı sahipleri için görsel göstergeler sağlar.
- **Sahiplik değişikliği**: ENS kayıtları, belirli bir `.eth` alan adının sahibinin ilgili NFT'ye sahip olduğu Ethereum üzerinde NFT'ler olarak temsil edilir. Bu nedenle, farklı bir hesap bu NFT'nin sahipliğini alırsa, yeni sahip herhangi bir ENS kaydını uygun gördüğü şekilde değiştirebilir.

Bu tür riskleri azaltmak için, `.eth` 2. seviye alan adları (2LD) için sahip hesabı, sözleşme isimlendirmesini yönetmek üzere oluşturulan alt alan adlarıyla birlikte çoklu imzalı (multi-sig) bir cüzdan aracılığıyla güvence altına alınmalıdır. Bu şekilde, alt alan adı seviyesinde kazara veya kötü niyetli herhangi bir sahiplik değişikliği durumunda, bunlar 2LD sahibi tarafından geçersiz kılınabilir.

## Sözleşme isimlendirmenin geleceği {#future}

Sözleşme isimlendirme, tıpkı alan adlarının web'deki IP adreslerinin yerini almasına benzer şekilde, merkeziyetsiz uygulama (dapp) geliştirme için en iyi uygulama hâline gelmektedir. Cüzdanlar, tarayıcılar ve panolar gibi daha fazla altyapı sözleşmeler için ENS çözümlemesini entegre ettikçe, isimlendirilmiş sözleşmeler ekosistem genelinde güvenliği artıracak ve hataları azaltacaktır.

Akıllı sözleşmeleri tanımayı ve üzerinde düşünmeyi kolaylaştıran isimlendirme, Ethereum'daki kullanıcılar ve uygulamalar arasındaki boşluğu kapatmaya yardımcı olarak kullanıcılar için hem güvenliği hem de kullanıcı deneyimini (UX) iyileştirir.

## Daha fazla bilgi {#further-reading}

- [ENS ile Akıllı Sözleşmeleri İsimlendirme](https://docs.ens.domains/web/naming-contracts/)
- [Enscribe ile Akıllı Sözleşmeleri İsimlendirme](https://www.enscribe.xyz/docs).