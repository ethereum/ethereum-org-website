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

Günümüz Ethereum'unu güvence altına alan [kriptografinin](/glossary/#cryptography) bir kısmı, kuantum hesaplama gerçeğe dönüştüğünde tehlikeye girecektir. Kuantum bilgisayarlarının modern kriptografiye gerçek anlamda bir tehdit oluşturması muhtemelen onlarca yıl uzakta olsa da, Ethereum gelecek yüz yıllar boyunca güvende olacak şekilde inşa ediliyor. Bu, mümkün olan en kısa sürede [Ethereum'u kuantum dirençli hale getirmek](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) anlamına gelir.

Ethereum geliştiricilerinin karşılaştığı zorluk, mevcut [hisse ispatı](/glossary/#pos) protokolünün geçerli [bloklardaki](/glossary/#block) oyları bir araya getirmek için BLS olarak bilinen çok verimli bir imza şemasına dayanmasıdır. Bu imza şeması kuantum bilgisayarlar tarafından kırılabilir, ancak kuantum dirençli alternatifleri de o kadar verimli değildir.

Ethereum'da kriptografik sırlar oluşturmak için çeşitli yerlerde kullanılan ["KZG" taahhüt şemalarının](/roadmap/danksharding/#what-is-kzg) kuantuma karşı savunmasız olduğu bilinmektedir. Şu anda bu, birçok kullanıcının bir kuantum bilgisayar tarafından tersine mühendislik yapılamayan rastgelelik ürettiği "güvenilir kurulumlar" (ana kurulum seremonisi 2023'te başarıyla tamamlanmıştır) kullanılarak aşılmaktadır. Ancak ideal uzun vadeli çözüm, bunun yerine kuantum güvenli kriptografiyi dahil etmek olacaktır. BLS şeması için verimli bir alternatif olabilecek iki öncü yaklaşım vardır: [STARK tabanlı](https://hackmd.io/@vbuterin/stark_aggregation) ve [kafes tabanlı](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) imzalama. **Bunlar hâlâ aktif olarak araştırılıyor ve prototipleniyor**.

[KZG ve güvenilir kurulumlar hakkında bilgi edinin](/roadmap/danksharding#what-is-kzg)

## Daha basit ve daha verimli Ethereum {#simpler-more-efficient-ethereum}

Karmaşıklık, "hatalar" ve saldırganlar tarafından kötüye kullanılabilecek kırılganlıkların önünü açar. Bu nedenle yol haritasının bir parçası; Ethereum'u basitleştirmek ve çeşitli yükseltmelerden sonra geride kalan, artık ihtiyaç duyulmayan veya iyileştirilebilecek kodları kaldırmak ya da değiştirmektir. Daha sade ve daha basit bir kod tabanı geliştiricilerin işlerini sürdürebilmesini ve anlayabilmesini kolaylaştırır.

[Ethereum Sanal Makinesi'ni (EVM)](/developers/docs/evm) daha basit ve daha verimli hale getirmek için sürekli olarak iyileştirmeler araştırılmakta ve uygulanmaktadır. Bu, hem eski bileşenleri ele almayı hem de optimizasyonlar getirmeyi içerir.

**Uygulanan Son Değişiklikler:**

- **Gaz Hesaplamasının Gözden Geçirilmesi:** [Gaz](/glossary/#gas) hesaplama şekli, daha öngörülebilir işlem fiyatlandırması için bir taban ücret ve yakım mekanizması getiren **EIP-1559 (2021 Londra yükseltmesinde uygulandı)** ile önemli ölçüde iyileştirildi.
- **`SELFDESTRUCT` Kısıtlaması:** `SELFDESTRUCT` işlem kodu, nadiren kullanılsa da potansiyel riskler taşıyordu. İşlevselliği, özellikle durum yönetimiyle ilgili tehlikeleri azaltmak amacıyla **EIP-6780 aracılığıyla Dencun yükseltmesinde (Mart 2024) büyük ölçüde kısıtlandı**.
- **Modernize Edilmiş İşlem Türleri:** Eski türlere göre verimliliği artırmak ve yeni özellikleri desteklemek için yeni işlem formatları (örneğin, Dencun yükseltmesindeki bloblar için **EIP-2718** ve **EIP-4844** aracılığıyla) kullanıma sunulmuştur.

**Devam Eden ve Gelecekteki Hedefler:**

- **`SELFDESTRUCT` İçin İleri Adımlar:** Kısıtlanmış olmasına rağmen, EVM durumunu daha da basitleştirmek için `SELFDESTRUCT` işlem kodunun **potansiyel olarak tamamen kaldırılması**, gelecekteki yükseltmeler için hâlâ değerlendirilmektedir. ([SELFDESTRUCT sorunları hakkında daha fazla bağlam](https://hackmd.io/@vbuterin/selfdestruct)).
- **Eski İşlemlerin Aşamalı Olarak Kaldırılması:** [Ethereum istemcileri](/glossary/#consensus-client) geriye dönük uyumluluk için eski işlem türlerini hâlâ desteklese de, amaç daha yeni türlere geçişi teşvik etmek ve gelecekte **en eski formatlara yönelik desteği potansiyel olarak sonlandırmak veya tamamen kaldırmaktır**.
- **Gaz Verimliliği Araştırmalarının Sürdürülmesi:** Kaynak kullanımını daha iyi yansıtmak için potansiyel olarak çok boyutlu gaz gibi kavramları da içeren **gaz hesaplamasına yönelik daha fazla iyileştirme** arayışı devam etmektedir.
- **Optimize Edilmiş Kriptografik İşlemler:** EVM içinde kullanılan kriptografik işlemlerin temelini oluşturan **aritmetik için daha verimli yöntemler getirme** çabaları devam etmektedir.

Benzer olarak, Ethereum istemcilerinin günümüzdeki diğer kısımlarına yapılabilecek güncellemeler de var. Şu anda bunun için farklı bir veri sıkıştırma yöntemi kullanan fikir birliği istemcilerini bir örnek olarak verebiliriz. Sıkıştırma şeması bütün ağ ile birleştirildiğinde istemciler arası veri paylaşmak çok daha kolay ve içgüdüsel bir hal alacak. Bu, bir keşif alanı olmaya devam etmektedir.

## Mevcut ilerleme {#current-progress}

Uzun vadeli geleceğe hazırlık yükseltmelerinin birçoğu, özellikle de **çekirdek protokoller için tam kuantum direnci, hâlâ araştırma aşamasındadır ve uygulanmaları birkaç yıl sürebilir**.

Ancak, **basitleştirme çabalarında şimdiden önemli ilerleme kaydedilmiştir.** Örneğin, **`SELFDESTRUCT` kısıtlaması (EIP-6780)** ve **blob taşıyan işlemlerin (EIP-4844)** tanıtılması gibi önemli değişiklikler **Dencun yükseltmesinde (Mart 2024)** uygulandı. İstemci sıkıştırma şemalarını uyumlu hale getirme ve diğer verimlilik iyileştirmelerine yönelik çalışmalar da devam etmektedir.

**Daha fazla okuma**

- [Gaz](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Veri yapıları](/developers/docs/data-structures-and-encoding)