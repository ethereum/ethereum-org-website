---
title: Ethereum'u geleceğe dirençli hale getirmek
description: Bu yükseltmeler, ileride ne olursa olsun Ethereum'u gelecek için esnek, merkeziyetsiz temel katman olarak sağlamlaştırıyor.
lang: tr
image: /images/roadmap/roadmap-future.png
alt: "Ethereum yol haritası"
template: roadmap
---

Yol haritasının bazı bölümleri Ethereum'u yakın vadede ölçeklendirmek veya güvence altına almak için gerekli değildir, ancak Ethereum'u geleceğe yönelik istikrar ve güvenilirlik için ayarlar.

## Kuantum direnci {#quantum-resistance}

Günümüzde Ethereum'unu güvence altında tutan [kriptografinin](/glossary/#cryptography) bir kısmı, kuantum bilişimin gerçeğe dönüşmesiyle tehlikeye girecektir. Kuantum bilgisayarlarının modern kriptografiye gerçek anlamda bir tehdit oluşturması muhtemelen onlarca yıl uzakta olsa da, Ethereum gelecek yüz yıllar boyunca güvende olacak şekilde inşa ediliyor. Bunun anlamı; mümkün olan en kısa sürede [ Ethereum'u kuantum dirençli](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) hale getirmektir.

Ethereum geliştiricilerinin karşılaştığı zorluk, mevcut [hisse ispatı](/glossary/#pos) protokolünün geçerli [bloklar](/glossary/#block) üzerindeki oyları toplamak için BLS olarak bilinen çok efektif bir imza şemasına dayanmasıdır. Bu imza şeması kuantum bilgisayarlar tarafından kırılabilir, ancak kuantum dirençli alternatifleri de o kadar verimli değildir.

Ethereum'da kriptografik sırlar oluşturmak için çeşitli yerlerde kullanılan ["KZG" taahhüt şemaları](/roadmap/danksharding/#what-is-kzg)nın kuantum açısından savunmasız olduğu bilinmektedir. Şu anda, bu durum "güvenilir kurulumlar" kullanılarak önlenmektedir, burada birçok kullanıcı kuantum bilgisayar tarafından tersine mühendislik yapılamayan rastgelelik oluşturur. Ancak ideal çözüm, sadece kuantum güvenli kriptografiyi entegre etmek olacaktır. BLS şemasının yerine verimli bir şekilde geçebilecek iki önde gelen yaklaşım bulunmaktadır: [STARK tabanlı](https://hackmd.io/@vbuterin/stark_aggregation) ve [kafes tabanlı](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) imzalama. **Bu yöntemler hâlâ araştırılıyor ve prototip haline getiriliyor**.

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> KZG ve güvenilir kurulumlar hakkındakileri okuyun</ButtonLink>

## Daha basit ve daha verimli Ethereum {#simpler-more-efficient-ethereum}

Karmaşıklık, "hatalar" ve saldırganlar tarafından kötüye kullanılabilecek kırılganlıkların önünü açar. Bu yüzden, yol haritası Ethereum'u basitleştirir ve birçok yükseltmeden orada kalmış olan, ancak artık ihtiyaç duyulmayan kodu siler. Daha sade ve daha basit bir kod tabanı geliştiricilerin işlerini sürdürebilmesini ve anlayabilmesini kolaylaştırır.

Her şeyi daha tutarlı ve basit hale getirmek için [Ethereum Sanal Makinesi'ne (EVM)](/developers/docs/evm) gelecek birkaç güncelleme olacak. Bu güncellemeler[SELFDESTRUCT adındaki işlem kodunu](https://hackmd.io/@vbuterin/selfdestruct) silmeyi de kapsayacak. SELFDESTRUCT, artık ihtiyaç duyulmayan ve nadiren kullanılan, hatta eğer Ethereum'un depolama modeliyle kombine edilir ya da yükseltmelerden herhangi birine katılırsa tehlikeli hale bile gelebilecek bir işlem kodudur. [Ethereum istemcileri](/glossary/#consensus-client), günümüzde tamamen kaldırılan bazı eski işlem tiplerini de halen destekliyor. [Gaz](/glossary/#gas)'ın hesaplanma şekli de halen geliştirilebilir ve bazı kriptografik işlemlerin temelini oluşturan aritmetik için daha efektif yöntemler getirilebilir.

Benzer olarak, Ethereum istemcilerinin günümüzdeki diğer kısımlarına yapılabilecek güncellemeler de var. Şu anda bunun için farklı bir veri sıkıştırma yöntemi kullanan fikir birliği istemcilerini bir örnek olarak verebiliriz. Sıkıştırma şeması bütün ağ ile birleştirildiğinde istemciler arası veri paylaşmak çok daha kolay ve içgüdüsel bir hal alacak.

## Güncel ilerleme {#current-progress}

Ethereum'u geleceğe hazır hale getirmek için gereken birçok güncelleme **halen araştırma sürecinde ve hayata geçirilmeleri için birkaç yıl daha gerekiyor**. SELFDESTRUCT'ın kaldırılması, yürütüm ve fikir birliği istemcilerinde kullanılan sıkıştırma şemasının uyumlu hale getirilmesi gibi yükseltmelerin kuantum dirençli kriptografiden erken gerçekleşmesi daha muhtemeldir.

**Daha fazla bilgi**

- [Gaz](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Veri yapıları](/developers/docs/data-structures-and-encoding)
