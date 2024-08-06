---
title: Daha güvenli bir Ethereum
description: Ethereum, var olan en güvenli ve merkeziyetsiz akıllı sözleşme platformudur. Bununla birlikte, Ethereum'un gelecekte her türlü saldırıya karşı dayanıklı kalabilmesi için yapılabilecek iyileştirmeler hâlâ var.
lang: tr
image: /images/roadmap/roadmap-security.png
alt: "Ethereum yol haritası"
template: roadmap
---

Ethereum halihazırda çok güvenli, merkeziyetsiz bir akıllı sözleşme platformudur. Bununla birlikte, Ethereum'un gelecekte her türlü saldırıya karşı dayanıklı kalabilmesi için yapılabilecek iyileştirmeler hâlâ var. Bu iyileştirmeler, Ethereum istemcilerinin rakip bloklarla başa çıkma şeklindeki ince değişikliklere ek olarak, ağın blokların [kesinleştirilmiş](/developers/docs/consensus-mechanisms/pos/#finality) kabul ettiği hız arttırma sürecini de içerir (bu, blokların saldırgana aşırı ekonomik kayıplar vermeden değiştirilemeyeceği anlamına gelir).

Ayrıca, bir istemci sansür uyguladığında belirlenmesini sağlayan, blok önericilerini blokların gerçek içeriğine kör ederek işlemleri sansürlemeyi çok daha zor hale getiren yeni iyileştirmeler de var. Bu iyileştirmeler, hisse ispatı protokolünü yükseltecek, böylece kullanıcılar -bireylerden şirketlere- Ethereum'daki uygulama, veri ve varlıklarına anında güven duyacaklar.

## Hisseden ödeme alma {#staking-withdrawals}

İş ispatından hisse ispatına yükseltme, Ethereum öncülerinin ETH'lerini bir mevduat sözleşmesinde "hisselemeleri" ile başladı. Adı geçen ETH, ağı korumak için kullanılıyor ancak bu ETH'nin kilidi henüz açılamıyor ve kullanıcılara iade edilemiyor. Hisse ispatı yükseltmesinin en kritik parçası ETH'nin çekilmesine olanak sağlaması. ETH çekme işlemlerinin, işlevsel bir hisse ispatı protokolünün kritik bir parçası olmasına ek olarak, bu para çekme işlemleri paydaşların ETH ödüllerini hisseleme amaçları dışında kullanmalarına izin vererek Ethereum güvenliğine de katkı sağlıyor. Bu, likidite isteyen kullanıcıların, Ethereum üzerinde merkezileştirici bir gücü olabilecek likit hisseleme türevlerine (LSD'ler) bel bağlamak zorunda olmadıkları anlamına geliyor. Bu yükseltmenin 12 Nisan 2023'te tamamlanması planlanıyor.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Para çekme hakkındakileri okuyun</ButtonLink>

## Saldırılara karşı savunma {#defending-against-attacks}

ETH çekimine olanak sağlandığı halde, Ethereum'un [hisse ispatı](/developers/docs/consensus-mechanisms/pos/) protokolünde yapılabilecek iyileştirmeler hâlâ mevcut. Bi̇r tanesi [Görüntü Birleşimi](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) olarak bilinir- belli komplike atakları zorlaştıran daha güvenli bir çatal seçim algoritmasıdır.

Ethereum'un blokları kesinleştirmek için harcadığı süreyi azaltmak, daha iyi bir kullanıcı deneyimi sağlar ve saldırganların kar elde etmek veya belirli işlemleri sansürlemek amacıyla yeni blokları yeniden düzenlemeye çalıştığı karmaşık "reorg" saldırılarını engeller. [**Tek yuva kesinliği (SSF)**](/roadmap/single-slot-finality/) kesinleştirme gecikmesini en aza indirgemenin bir yoludur. Şu anda bir saldırganın teorik olarak diğer doğrulayıcıları yeniden yapılandırmaya ikna edebileceği 15 dakika değerinde bloklar var. Bu süre SSF ile birlikte sıfıra iniyor. Bireylerden uygulamalara ve borsalara kadar kullanıcılar, işlemlerinin iptal edilmeyeceğine dair hızlı güvenceden yararlanır, ağ ise bütün bir saldırı grubunu durdurarak fayda sağlar.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Tek yuva kesinliği hakkındakileri oku</ButtonLink>

## Sansüre karşı savunma {#defending-against-censorship}

Merkeziyetsizlik, kişilerin ya da küçük doğrulayıcı gruplarının fazla etkili olmalarını engeller. Yeni hisseleme teknolojileri, Ethereum doğrulayıcılarının mümkün olduğunca merkeziyetsiz kalmalarına yardımcı olurken aynı zamanda onları donanım, yazılım ve ağ hatalarına karşı da korur. Bu teknolojilerden biri doğrulayıcı sorumluluklarını birden fazla düğüm arasında paylaşan bir yazılımdır Bu, **dağıtılmış doğrulayıcı teknolojisi (DVT)** olarak bilinir. Hisseleme havuzları, DVT kullanımına teşvik edilir çünkü bu, birden fazla bilgisayarın toplu olarak doğrulamaya katılarak fazlalık katıp hata toleransını arttırır. Aynı zamanda, birden fazla doğrulayıcıyı çalıştıran tek bir operatöre sahip olmak yerine, doğrulayıcı anahtarlarını birkaç sisteme de böler. Bu, sahtekar operatörlerin Ethereum'a karşı saldırı koordine etmesini daha zor hale getirir. Genel olarak fikir, doğrulayıcıları bireyler yerine _topluluklar_ olarak çalıştırarak güvenlik avantajı elde etmektir.

<ButtonLink variant="outline-color" href="/staking/dvt/">Dağıtılmış doğrulayıcı teknolojisi hakkındakileri oku</ButtonLink>

**Önerici-inşa edici ayrımının (PBS)** uygulanması, Ethereum'un sansüre karşı dahili savunmalarını büyük ölçüde geliştirecektir. PBS, bir doğrulayıcının bir blok oluşturmasına ve diğerinin bunu Ethereum ağında yayınlamasına olanak verir. Bu, profesyonel kâr maksimizasyonu sağlayan ve blok inşa eden algoritmalardan elde edilen kazançların adil bir şekilde dağıtılmasını sağlayarak, zaman içinde en iyi performans gösteren kurumsal paydaşların **hisselemelerinin yoğunlaşmasını engeller**. Blok önerici, bir blok oluşturucu pazarı tarafından kendilerine sunulan en kazançlı bloku seçer. Sansürleme için bir blok önericinin çoğunlukla daha az kazançlı bir blok seçmesi gerekir. Bu **ekonomik açıdan mantıksız ve ağdaki diğer doğrulayıcılar için de aşikardır**.

Ethereum'un sansüre dayanıklılığını daha da arttırabilecek şifrelenmiş işlemler ve dahil etme listeleri gibi potansiyel PBS eklentileri vardır. Bunlar, blok inşa edenlerin ve önerenlerin bloklarına dahil olan asıl işlemleri görmelerini engeller.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Önerici-inşa edici ayrımı hakkındakileri okuyun</ButtonLink>

## Doğrulayıcıları koruma {#protecting-validators}

Tecrübeli bir saldırganın, yaklaşan doğrulayıcıları saptayıp, blok önermelerini engellemek için onları spamlaması mümkündür ve buna **hizmet reddi (DoS)** saldırısı denir. [**Gizli lider seçiminin (SLE)**](/roadmap/secret-leader-election) uygulanması, blok önericilerin önceden bilinmesini önleyerek bu tür saldırılara karşı koruma sağlayacaktır. Bu, aday blok önericilerini temsil eden bir dizi kriptografik taahütün sürekli olarak karıştırılarak ve bunların sırasını kullanarak çalışır. Bu şekilde, sadece doğrulayıcıların kendi sıralarını önceden bileceği şekilde hangi doğrulayıcının seçildiği belirlenir.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Gizli lider seçimi hakkındakileri okuyun</ButtonLink>

## Güncel ilerleme {#current-progress}

Yol haritasındaki güvenlik yükseltmeleri, araştırmanın ileri seviyelerinde olsa da, bir süre daha uygulanmaları beklenmiyor. Görüntü birleşiminin sonraki adımları ise PBS, SSF ve SLE'dir, özellikleri kesinleştirip prototip inşa etmeye başlamak içindir.
