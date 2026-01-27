---
title: "Daha güvenli bir Ethereum"
description: "Ethereum, var olan en güvenli ve merkeziyetsiz akıllı sözleşme platformudur. Bununla birlikte, Ethereum'un gelecekte her türlü saldırıya karşı dayanıklı kalabilmesi için yapılabilecek iyileştirmeler hâlâ var."
lang: tr
image: /images/roadmap/roadmap-security.png
alt: "Ethereum yol haritası"
template: roadmap
---

**Ethereum halihazırda çok güvenli**, merkeziyetsiz bir [akıllı sözleşme](/glossary/#smart-contract) platformudur. Bununla birlikte, Ethereum'un gelecekte her türlü saldırıya karşı dayanıklı kalabilmesi için yapılabilecek iyileştirmeler hâlâ var. Bunlar, [Ethereum istemcilerinin](/glossary/#consensus-client) rakip [bloklarla](/glossary/#block) başa çıkma biçimindeki ince değişiklikleri, ayrıca ağın blokları ["kesinleşmiş"](/developers/docs/consensus-mechanisms/pos/#finality) olarak kabul etme hızını artırmayı içerir (bu, bir saldırgan için aşırı ekonomik kayıplar olmadan değiştirilemeyecekleri anlamına gelir).

Ayrıca, bir istemci sansür uyguladığında belirlenmesini sağlayan, blok önericilerini blokların gerçek içeriğine kör ederek işlemleri sansürlemeyi çok daha zor hale getiren yeni iyileştirmeler de var. Birlikte bu iyileştirmeler, [hisse ispatı](/glossary/#pos) protokolünü yükseltecek, böylece bireylerden şirketlere kadar kullanıcılar Ethereum'daki uygulamalarına, verilerine ve varlıklarına anında güven duyabilecekler.

## Hisseleme çekimleri {#staking-withdrawals}

[İş ispatından](/glossary/#pow) hisse ispatına yükseltme, Ethereum öncülerinin ETH'lerini bir mevduat sözleşmesinde "hisselemesiyle" başladı. Adı geçen ETH, ağı korumak için kullanılıyor 12 Nisan 2023'te doğrulayıcıların hisselenmiş ETH'lerini çekmelerine olanak tanıyan ikinci bir güncelleme yapıldı. O zamandan beri, doğrulayıcılar özgürce ETH kilitleyebiliyor ya da geri çekebiliyorlar.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Çekimler hakkında bilgi edinin</ButtonLink>

## Saldırılara karşı savunma {#defending-against-attacks}

Ethereum'un hisse ispatı protokolünde yapılabilecek iyileştirmeler de vardır. Bunlardan biri, belirli karmaşık saldırı türlerini daha da zorlaştıran daha güvenli bir [çatal](/glossary/#fork) seçimi algoritması olan [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) olarak bilinir.

Ethereum'un blokları [kesinleştirmesi](/glossary/#finality) için gereken süreyi kısaltmak, daha iyi bir kullanıcı deneyimi sağlar ve saldırganların kâr elde etmek veya belirli işlemleri sansürlemek amacıyla çok yeni blokları yeniden düzenlemeye çalıştığı gelişmiş "reorg" saldırılarını önler. [**Tek yuva kesinliği (SSF)**](/roadmap/single-slot-finality/), **kesinleşme gecikmesini en aza indirmenin bir yoludur**. Şu anda bir saldırganın teorik olarak diğer doğrulayıcıları yeniden yapılandırmaya ikna edebileceği 15 dakika değerinde bloklar var. Bu süre SSF ile birlikte sıfıra iniyor. Bireylerden uygulamalara ve borsalara kadar kullanıcılar, işlemlerinin iptal edilmeyeceğine dair hızlı güvenceden yararlanır, ağ ise bütün bir saldırı grubunu durdurarak fayda sağlar.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Tek yuva kesinliği hakkında bilgi edinin</ButtonLink>

## Sansüre karşı savunma {#defending-against-censorship}

Merkeziyetsizlik, bireylerin veya küçük [doğrulayıcı](/glossary/#validator) gruplarının çok etkili hale gelmesini önler. Yeni hisseleme teknolojileri, Ethereum doğrulayıcılarının mümkün olduğunca merkeziyetsiz kalmalarına yardımcı olurken aynı zamanda onları donanım, yazılım ve ağ hatalarına karşı da korur. Bu, doğrulayıcı sorumluluklarını birden çok [düğüm](/glossary/#node) arasında paylaşan yazılımları içerir. Bu, **dağıtılmış doğrulayıcı teknolojisi (DVT)** olarak bilinir. [Hisseleme havuzları](/glossary/#staking-pool), birden fazla bilgisayarın doğrulamaya toplu olarak katılmasına izin vererek artıklık ve hata toleransı eklediği için DVT kullanmaya teşvik edilir. Aynı zamanda, birden fazla doğrulayıcıyı çalıştıran tek bir operatöre sahip olmak yerine, doğrulayıcı anahtarlarını birkaç sisteme de böler. Bu, sahtekar operatörlerin Ethereum'a karşı saldırı koordine etmesini daha zor hale getirir. Genel olarak fikir, doğrulayıcıları bireyler yerine _topluluklar_ olarak çalıştırarak güvenlik avantajları elde etmektir.

<ButtonLink variant="outline-color" href="/staking/dvt/">Dağıtılmış doğrulayıcı teknolojisi hakkında bilgi edinin</ButtonLink>

**Önerici-inşa edici ayrımının (PBS)** uygulanması, Ethereum'un sansüre karşı yerleşik savunmalarını büyük ölçüde geliştirecektir. PBS, bir doğrulayıcının bir blok oluşturmasına ve diğerinin bunu Ethereum ağında yayınlamasına olanak verir. Bu, profesyonel kâr maksimizasyonu sağlayan blok oluşturma algoritmalarından elde edilen kazançların ağ genelinde daha adil bir şekilde paylaşılmasını sağlar ve zamanla en iyi performans gösteren kurumsal staker'larda **hissenin yoğunlaşmasını önler**. Blok önerici, bir blok oluşturucu pazarı tarafından kendilerine sunulan en kazançlı bloku seçer. Sansürlemek için bir blok önericisinin genellikle daha az kârlı bir blok seçmesi gerekir; bu durum ağdaki diğer doğrulayıcılar için **ekonomik olarak mantıksız ve aynı zamanda bariz** olacaktır.

Ethereum'un sansüre dayanıklılığını daha da arttırabilecek şifrelenmiş işlemler ve dahil etme listeleri gibi potansiyel PBS eklentileri vardır. Bunlar, blok inşa edenlerin ve önerenlerin bloklarına dahil olan asıl işlemleri görmelerini engeller.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Önerici-inşa edici ayrımı hakkında bilgi edinin</ButtonLink>

## Doğrulayıcıları koruma {#protecting-validators}

Gelişmiş bir saldırganın, gelecek doğrulayıcıları tespit edip blok önermelerini engellemek için onlara spam göndermesi mümkündür; bu, bir **hizmet reddi (DoS)** saldırısı olarak bilinir. [**Gizli lider seçiminin (SLE)**](/roadmap/secret-leader-election) uygulanması, blok önericilerinin önceden bilinebilir olmasını engelleyerek bu tür saldırılara karşı koruma sağlayacaktır. Bu, aday blok önericilerini temsil eden bir dizi kriptografik taahütün sürekli olarak karıştırılarak ve bunların sırasını kullanarak çalışır. Bu şekilde, sadece doğrulayıcıların kendi sıralarını önceden bileceği şekilde hangi doğrulayıcının seçildiği belirlenir.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Gizli lider seçimi hakkında bilgi edinin</ButtonLink>

## Mevcut ilerleme {#current-progress}

**Yol haritasındaki güvenlik yükseltmeleri araştırmanın ileri aşamalarındadır**, ancak bir süre daha uygulanmaları beklenmemektedir. view-merge, PBS, SSF ve SLE için sonraki adımlar, bir spesifikasyonu kesinleştirmek ve prototip oluşturmaya başlamaktır.
