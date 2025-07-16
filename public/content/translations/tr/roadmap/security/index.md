---
title: Daha güvenli bir Ethereum
description: Ethereum, var olan en güvenli ve merkeziyetsiz akıllı sözleşme platformudur. Bununla birlikte, Ethereum'un gelecekte her türlü saldırıya karşı dayanıklı kalabilmesi için yapılabilecek iyileştirmeler hâlâ var.
lang: tr
image: /images/roadmap/roadmap-security.png
alt: "Ethereum yol haritası"
template: roadmap
---

**Ethereum halihazırda çok güvenli**, merkeziyetsiz bir [akıllı sözleşme](/glossary/#smart-contract) platformudur. Bununla birlikte, Ethereum'un gelecekte her türlü saldırıya karşı dayanıklı kalabilmesi için yapılabilecek iyileştirmeler hâlâ var. Bunlar arasında [Ethereum istemcilerinin](/glossary/#consensus-client) rakip [bloklarla](/glossary/#block) başa çıkma yönteminde yapılan incelikli değişiklilerin yanı sıra ağın blokları ["kesinleşmiş"](/developers/docs/consensus-mechanisms/pos/#finality) olarak kabul etme hızının arttırılması (yani bir saldırgan için aşırı ekonomik kayıplar olmadan değiştirilememeleri) yer alıyor.

Ayrıca, bir istemci sansür uyguladığında belirlenmesini sağlayan, blok önericilerini blokların gerçek içeriğine kör ederek işlemleri sansürlemeyi çok daha zor hale getiren yeni iyileştirmeler de var. Bu iyileştirmelerle birlikte [hisse ispatı](/glossary/#pos) protokolü yükseltilecek ve böylece - bireylerden şirketlere kadar - kullanıcılar, Ethereum'daki uygulamalarına, verilerine ve varlıklarına doğrudan güvenebilecektir.

## Hisseden ödeme alma {#staking-withdrawals}

[İş ispatı](/glossary/#pow)ndan hisse ispatına geçiş, Ethereum'daki öncülerin ETH'lerini bir depozito sözleşmesine "hisselemesi" ile başladı. Adı geçen ETH, ağı korumak için kullanılıyor 12 Nisan 2023'te hisselenen ETH'nin çekilebilmesine olanak sağlayan ikinci bir güncelleme yapıldı. O zamandan beri, doğrulayıcılar özgürce ETH kilitleyebiliyor ya da geri çekebiliyorlar.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Para çekme hakkındakileri okuyun</ButtonLink>

## Saldırılara karşı savunma {#defending-against-attacks}

Ethereum'un hisse ispatı protokolünde yapılabilecek iyileştirmeler de vardır. Bunlardan biri, [görünüm birleştirme](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) olarak bilinen ve belirli karmaşık saldırı türlerini daha zor hale getiren daha güvenli bir [çatallanma](/glossary/#fork) seçim algoritmasıdır.

Ethereum'da blokların [sonlandırılma](/glossary/#finality) süresini azaltmak daha iyi bir kullanıcı deneyimi sağlayabilir ve saldıranların yakın zamandaki blokları yeniden karıştırarak kâr elde etmeleri ya da belirli işlemleri sansürlemelerini içeren karmaşık "yeniden örgütlenme" saldırılarını önleyebilir. [**Tek yuva kesinliği (SSF)**](/roadmap/single-slot-finality/)**, sonlandırma gecikmesini küçültecek yollardan biridir**. Şu anda bir saldırganın teorik olarak diğer doğrulayıcıları yeniden yapılandırmaya ikna edebileceği 15 dakika değerinde bloklar var. Bu süre SSF ile birlikte sıfıra iniyor. Bireylerden uygulamalara ve borsalara kadar kullanıcılar, işlemlerinin iptal edilmeyeceğine dair hızlı güvenceden yararlanır, ağ ise bütün bir saldırı grubunu durdurarak fayda sağlar.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Tek yuva kesinliği hakkındakileri oku</ButtonLink>

## Sansüre karşı savunma {#defending-against-censorship}

Merkeziyetsizlik, bireylerin ya da [doğrulayıcılar](/glossary/#validator)dan oluşan küçük grupların çok nüfuzlu olmasını engeller. Yeni hisseleme teknolojileri, Ethereum doğrulayıcılarının mümkün olduğunca merkeziyetsiz kalmalarına yardımcı olurken aynı zamanda onları donanım, yazılım ve ağ hatalarına karşı da korur. Bu, doğrulayıcıların sorumluluğunu birçok [düğüm](/glossary/#node) arasında paylaştıracak bir yazılımı içerir. Bu, **dağıtılmış doğrulayıcı teknolojisi (DVT)** olarak bilinir. [Hisseleme havuzları](/glossary/#staking-pool) için DVT kullanımı teşvik edilir çünkü birden fazla bilgisayarın doğrulama sürecine toplu olarak katılmasına olanak tanıyarak yedekleme ve hata toleransı ekler. Aynı zamanda, birden fazla doğrulayıcıyı çalıştıran tek bir operatöre sahip olmak yerine, doğrulayıcı anahtarlarını birkaç sisteme de böler. Bu, sahtekar operatörlerin Ethereum'a karşı saldırı koordine etmesini daha zor hale getirir. Genel olarak fikir, doğrulayıcıları bireyler yerine _topluluklar_ olarak çalıştırarak güvenlik avantajı elde etmektir.

<ButtonLink variant="outline-color" href="/staking/dvt/">Dağıtılmış doğrulayıcı teknolojisi hakkındakileri oku</ButtonLink>

**Önerici-inşa edici ayrımının (PBS)** uygulanması, Ethereum'un sansüre karşı dahili savunmalarını büyük ölçüde geliştirecektir. PBS, bir doğrulayıcının bir blok oluşturmasına ve diğerinin bunu Ethereum ağında yayınlamasına olanak verir. Bu, profesyonel kâr maksimizasyonu sağlayan ve blok inşa eden algoritmalardan elde edilen kazançların adil bir şekilde dağıtılmasını sağlayarak, zaman içinde en iyi performans gösteren kurumsal paydaşların **hisselemelerinin yoğunlaşmasını engeller**. Blok önerici, bir blok oluşturucu pazarı tarafından kendilerine sunulan en kazançlı bloku seçer. Sansürleme için bir blok önericinin çoğunlukla daha az kazançlı bir blok seçmesi gerekir. Bu **ekonomik açıdan mantıksız ve ağdaki diğer doğrulayıcılar için de aşikardır**.

Ethereum'un sansüre dayanıklılığını daha da arttırabilecek şifrelenmiş işlemler ve dahil etme listeleri gibi potansiyel PBS eklentileri vardır. Bunlar, blok inşa edenlerin ve önerenlerin bloklarına dahil olan asıl işlemleri görmelerini engeller.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Önerici-inşa edici ayrımı hakkındakileri okuyun</ButtonLink>

## Doğrulayıcıları koruma {#protecting-validators}

Tecrübeli bir saldırganın, yaklaşan doğrulayıcıları saptayıp, blok önermelerini engellemek için onları spamlaması mümkündür ve buna **hizmet reddi (DoS)** saldırısı denir. [**Gizli lider seçiminin (SLE)**](/roadmap/secret-leader-election) uygulanması, blok önericilerin önceden bilinmesini önleyerek bu tür saldırılara karşı koruma sağlayacaktır. Bu, aday blok önericilerini temsil eden bir dizi kriptografik taahütün sürekli olarak karıştırılarak ve bunların sırasını kullanarak çalışır. Bu şekilde, sadece doğrulayıcıların kendi sıralarını önceden bileceği şekilde hangi doğrulayıcının seçildiği belirlenir.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Gizli lider seçimi hakkındakileri okuyun</ButtonLink>

## Güncel ilerleme {#current-progress}

**Yol haritasındaki güvenlik yükseltmeleri, araştırmanın ileri aşamalarındadır** ancak bir süre daha uygulanmaya eklenmesi beklenmemektedir. Görüntü birleşiminin sonraki adımları ise PBS, SSF ve SLE'dir, özellikleri kesinleştirip prototip inşa etmeye başlamak içindir.
