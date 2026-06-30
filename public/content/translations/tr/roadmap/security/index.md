---
title: "Daha güvenli bir Ethereum"
description: "Ethereum, var olan en güvenli ve merkeziyetsiz akıllı sözleşme platformudur. Ancak, Ethereum'un gelecekte de her türlü saldırıya karşı dirençli kalabilmesi için yapılabilecek iyileştirmeler hâlâ mevcuttur."
lang: tr
image: /images/roadmap/roadmap-security.png
alt: "Ethereum yol haritası"
template: roadmap
---

**Ethereum halihazırda çok güvenli**, merkeziyetsiz bir [akıllı sözleşme](/glossary/#smart-contract) platformudur. Ancak, Ethereum'un gelecekte de her türlü saldırıya karşı dirençli kalabilmesi için yapılabilecek iyileştirmeler hâlâ mevcuttur. Bunlar arasında [Ethereum istemcilerinin](/glossary/#consensus-client) rekabet eden [bloklarla](/glossary/#block) başa çıkma biçimindeki ince değişikliklerin yanı sıra, ağın blokları ["kesinleşmiş"](/developers/docs/consensus-mechanisms/pos/#finality) (yani bir saldırgan için aşırı ekonomik kayıplar olmadan değiştirilemeyecekleri anlamına gelir) olarak kabul etme hızının artırılması yer alır.

Ayrıca, blok teklifçilerini bloklarının gerçek içeriklerine karşı kör hale getirerek işlemleri sansürlemeyi çok daha zorlaştıran iyileştirmeler ve bir istemcinin ne zaman sansür uyguladığını belirlemenin yeni yolları da vardır. Birlikte bu iyileştirmeler, [Hisse Kanıtı (PoS)](/glossary/#pos) protokolünü güncelleyerek bireylerden şirketlere kadar tüm kullanıcıların Ethereum üzerindeki uygulamalarına, verilerine ve varlıklarına anında güven duymalarını sağlayacaktır.

## Staking çekim işlemleri {#staking-withdrawals}

[İş Kanıtı (PoW)](/glossary/#pow) sisteminden Hisse Kanıtı (PoS) sistemine geçiş, Ethereum öncülerinin ETH'lerini bir yatırma sözleşmesinde "stake etmesiyle" başladı. Bu ETH, ağı korumak için kullanılır. 12 Nisan 2023'te doğrulayıcıların stake edilen ETH'leri çekmesine olanak tanıyan ikinci bir güncelleme yapıldı. O zamandan beri doğrulayıcılar serbestçe ETH stake edebilir veya çekebilirler.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Çekim işlemleri hakkında bilgi edinin</ButtonLink>

## Saldırılara karşı savunma {#defending-against-attacks}

Ethereum'un Hisse Kanıtı (PoS) protokolünde yapılabilecek iyileştirmeler vardır. Bunlardan biri, belirli karmaşık saldırı türlerini daha zor hale getiren daha güvenli bir [çatallanma](/glossary/#fork) seçimi algoritması olan [görünüm birleştirme (view-merge)](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) olarak bilinir.

Ethereum'un blokları [kesinleştirmesi](/glossary/#finality) için geçen süreyi azaltmak, daha iyi bir kullanıcı deneyimi sağlayacak ve saldırganların kâr elde etmek veya belirli işlemleri sansürlemek için çok yeni blokları yeniden sıralamaya çalıştığı karmaşık "yeniden düzenleme (re-org)" saldırılarını önleyecektir. [**Tek slot kesinliği (SSF)**](/roadmap/single-slot-finality/), **kesinleşme gecikmesini en aza indirmenin bir yoludur**. Şu anda, bir saldırganın teorik olarak diğer doğrulayıcıları yeniden yapılandırmaya ikna edebileceği 15 dakikalık bloklar bulunmaktadır. SSF ile bu süre 0'dır. Bireylerden uygulamalara ve borsalara kadar tüm kullanıcılar, işlemlerinin geri alınmayacağına dair hızlı güvenceden faydalanır ve ağ, bütün bir saldırı sınıfını kapatarak bundan yarar sağlar.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Tek slot kesinliği hakkında bilgi edinin</ButtonLink>

## Sansüre karşı savunma {#defending-against-censorship}

Merkeziyetsizlik, bireylerin veya küçük [doğrulayıcı](/glossary/#validator) gruplarının çok etkili olmasını engeller. Yeni staking teknolojileri, Ethereum'un doğrulayıcılarının mümkün olduğunca merkeziyetsiz kalmasını sağlarken aynı zamanda onları donanım, yazılım ve ağ arızalarına karşı savunmaya yardımcı olabilir. Buna, doğrulayıcı sorumluluklarını birden fazla [düğüm](/glossary/#node) arasında paylaştıran yazılımlar da dahildir. Bu, **dağıtık doğrulayıcı teknolojisi (DVT)** olarak bilinir. [Staking havuzları](/glossary/#staking-pool), birden fazla bilgisayarın doğrulamaya toplu olarak katılmasına izin vererek yedeklilik ve hata toleransı eklediği için DVT'yi kullanmaya teşvik edilir. Ayrıca, tek bir operatörün birden fazla doğrulayıcı çalıştırması yerine doğrulayıcı anahtarlarını birkaç sistem arasında böler. Bu, dürüst olmayan operatörlerin Ethereum'a yönelik saldırıları koordine etmesini zorlaştırır. Genel olarak fikir, doğrulayıcıları bireyler yerine _topluluklar_ olarak çalıştırarak güvenlik avantajları elde etmektir.

<ButtonLink variant="outline-color" href="/staking/dvt/">Dağıtık doğrulayıcı teknolojisi hakkında bilgi edinin</ButtonLink>

**Teklifçi-oluşturucu ayrımının (PBS)** uygulanması, Ethereum'un sansüre karşı yerleşik savunmalarını büyük ölçüde iyileştirecektir. PBS, bir doğrulayıcının bir blok oluşturmasına ve diğerinin bunu Ethereum ağında yayınlamasına olanak tanır. Bu, kârı maksimize eden profesyonel blok oluşturma algoritmalarından elde edilen kazançların ağ genelinde daha adil bir şekilde paylaşılmasını sağlayarak, zaman içinde **stake'in en iyi performans gösteren kurumsal staker'larda yoğunlaşmasını önler**. Blok teklifçisi, blok oluşturuculardan oluşan bir piyasa tarafından kendisine sunulan en kârlı bloğu seçme hakkına sahip olur. Sansür uygulamak için, bir blok teklifçisinin genellikle daha az kârlı bir bloğu seçmesi gerekir; bu da **ekonomik olarak mantıksız olacak ve aynı zamanda ağdaki diğer doğrulayıcılar için bariz olacaktır**.

PBS'ye, Ethereum'un sansür direncini daha da artırabilecek şifrelenmiş işlemler ve dahil etme listeleri gibi potansiyel eklentiler vardır. Bunlar, blok oluşturucuyu ve teklif ediciyi bloklarına dahil edilen gerçek işlemlere karşı kör hale getirir.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Teklifçi-oluşturucu ayrımı hakkında bilgi edinin</ButtonLink>

## Doğrulayıcıları koruma {#protecting-validators}

Karmaşık bir saldırganın yaklaşan doğrulayıcıları tespit etmesi ve blok teklif etmelerini önlemek için onlara spam göndermesi mümkündür; bu, **hizmet reddi (DoS)** saldırısı olarak bilinir. [**Gizli lider seçiminin (SLE)**](/roadmap/secret-leader-election) uygulanması, blok teklifçilerinin önceden bilinmesini engelleyerek bu tür saldırılara karşı koruma sağlayacaktır. Bu, aday blok teklifçilerini temsil eden bir dizi kriptografik taahhüdü sürekli olarak karıştırarak ve hangi doğrulayıcının seçileceğini belirlemek için sıralarını kullanarak çalışır; öyle ki yalnızca doğrulayıcıların kendileri sıralamalarını önceden bilir.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Gizli lider seçimi hakkında bilgi edinin</ButtonLink>

## Mevcut ilerleme {#current-progress}

**Yol haritasındaki güvenlik yükseltmeleri ileri araştırma aşamalarındadır**, ancak bir süre daha uygulanmaları beklenmemektedir. Görünüm birleştirme (view-merge), PBS, SSF ve SLE için sonraki adımlar, bir spesifikasyonu kesinleştirmek ve prototipler oluşturmaya başlamaktır.
