---
title: Ortak Staking
description: "Paydaşlık havuzları hakkında bilgi edinin"
lang: tr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: "Gergedan Leslie havuzda yüzüyor."
sidebarDepth: 2
summaryPoints:
  - Diğerleriyle güçlerinizi birleştirerek istediğiniz miktarda ETH ile hisse alın ve ödüller kazanın
  - Zor kısmı atlayıp doğrulayıcı görevini bir üçüncü tarafa bırakın
  - Hisseleme token'larınızı kendi cüzdanınızda tutun
---

## Paydaşlık havuzları nedir? {#what-are-staking-pools}

Paydaşlık havuzları, daha az miktarda ETH'ye sahip birçok kişinin bir dizi doğrulayıcı anahtarını etkinleştirmek için gereken 32 ETH'yi elde etmesine olanak tanıyan ortaklık temelli bir yaklaşımdır. Havuzlama işlevi protokol içinde yerel olarak desteklenmez, bu nedenle çözümler bu ihtiyacı karşılamak için ayrı olarak oluşturulmuştur.

Bazı havuzlar, fonların bir sözleşmeye yatırılabileceği, bahis tutarınızı güvenilir bir şekilde yöneten ve izleyen ve size bu değeri temsil eden bir token veren akıllı sözleşmeler kullanarak çalışır. Diğer havuzlar akıllı sözleşmeler içermeyebilir ve bunun yerine zincir dışında aracılık edilir.

## Neden bir havuz ile hisseleme? Neden bir havuz ile hisselemelisiniz? {#why-stake-with-a-pool}

[Hisselemeye giriş](/staking/) bölümümüzde belirttiğimiz faydalara ek olarak, bir havuzla hisselemek kendine özgü bir dizi faydayı da beraberinde getirir.

<CardGrid>
  <Card title="Düşük giriş engeli" emoji="🐟" description="Balina değil misiniz? Sorun değil. Tek başına staking 32 ETH gerektirirken, çoğu staking havuzu diğer staker'larla birleşerek neredeyse istediğiniz miktarda ETH stake etmenize olanak tanır." />
  <Card title="Bugün stake edin" emoji=":stopwatch:" description="Bir havuzla stake etmek, bir token takası kadar kolaydır. Donanım kurulumu ve düğüm bakımı konusunda endişelenmenize gerek yok. Havuzlar, ETH'nizi yatırmanıza olanak tanır, bu da düğüm operatörlerinin doğrulayıcıları çalıştırmasını sağlar. Ödüller, düğüm operasyonları ücreti düşüldükten sonra katkıda bulunanlara dağıtılır." />
  <Card title="Staking tokenleri" emoji=":droplet:" description="Birçok staking havuzu, stake ettiğiniz ETH'nizi ve oluşturduğu ödülleri temsil eden bir token sağlar. Bu, stake ettiğiniz ETH'nizi, örneğin DeFi uygulamalarında teminat olarak kullanmanıza olanak tanır." />
</CardGrid>

<StakingComparison page="pools" />

## Dikkat edilmesi gerekenler {#what-to-consider}

Havuzlanmış veya devredilmiş stake etme, Ethereum protokolü tarafından doğal olarak desteklenmez, ancak kullanıcıların 32 ETH'den daha az stake etme talebi göz önüne alındığında, bu talebi karşılamak için artan sayıda çözüm oluşturulmuştur.

Her havuz ve araçlar ya da akıllı sözleşmeler farklı ekiplerce oluşturulmuştur ve hepsinin faydaları ve riskleri vardır. Havuzlar, kullanıcıların ETH'lerini, hisselenmiş ETH'yi temsil eden bir token ile değişmelerini sağlar. Kullanıcılara herhangi bir miktarda ETH'yi; ETH Fikir birliği katmanında hisselenmiş olarak kalsa bile, merkeziyetsiz borsalardaki hisselenmiş ETH'ye uygulanan hisseleme ödüllerinden bir getiri sağlayan (ya da tam tersi) aynı miktarda getiriyi sağlayan bir token ile değişmelerini sağladığı için bu token yararlıdır. Bu da getiri sağlayan hisselenmiş ETH ile "asıl ETH" arasında iki yönlü takasın hızlı ve kolay olduğu ve yalnızca 32 ETH'nin katları halinde mevcut olmadığı anlamına gelir.

Ancak, bu kilitli ETH token'ları, büyük miktarda hisselenmiş ETH'nin birçok bağımsız bireyde dağılması yerine birkaç merkezi kuruluşun kontrolüne geçtiği kartel benzeri yapılar oluşturma eğilimindedir. Bu da sansür ya da faydalanma için gerekli koşulları oluşturur. Hisseleme için altın standart, mümkün olduğunca doğrulayıcıları kendi donanımlarında çalıştıran bireyler olmalıdır.

[Jeton hisselemenin riskleri hakkında daha fazlası](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Nitelik göstergeleri, listelenen bir stake havuzunun sahip olabileceği dikkate değer güçlü veya zayıf yönleri belirtmek için aşağıda kullanılmaktadır. Katılmak için bir havuz seçerken bu öznitelikleri nasıl tanımladığımız konusunda bu bölümü referans olarak kullanın.

<StakingConsiderations page="pools" />

## Paydaşlık havuzlarını keşfedin {#explore-staking-pools}

Kurulumunuzda size yardımcı olacak çeşitli seçenekler mevcuttur. Aşağıdaki araçlarda size rehberlik etmesi için yukarıdaki göstergeleri kullanın.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Ağ güvenliğini iyileştirdiği ve riskinizi sınırladığı için [istemci çeşitliliğini](/developers/docs/nodes-and-clients/client-diversity/) ciddiye alan bir hizmet seçmenin önemini lütfen unutmayın. Çoğunluk istemcisi kullanımı sınırladığına dair kanıtları olan hizmetler;<em style={{ textTransform: "uppercase" }}>"yürütme istemcisi çeşitliliği"</em> ve <em style={{ textTransform: "uppercase" }}>"fikir birliği istemcisi çeşitliliği" ile belirtilir.</em>

Kaçırdığımız bir hisseleme aracı için öneriniz mi var mı? Uygun olup olmadığını görmek ve incelemeye göndermek için [ürün listeleme politikamıza](/contributing/adding-staking-products/) göz atın.

## Sıkça sorulan sorular {#faq}

<ExpandableCard title="Nasıl ödül kazanırım?">
ERC-20 hisseleme jetonları, genel olarak paydaşlara verilir ve bu kişilerin hisselenen ETH ve ödüllerinin değerini temsil eder. Farklı havuzların, kullanıcılarına biraz farklı yöntemlerle hisseleme ödüllerini dağıtacağını aklınızda tutun, ancak bu ortak temadır.
</ExpandableCard>

<ExpandableCard title="Stake'imi ne zaman çekebilirim?">
Hemen şimdi! Şangay/Capella ağ yükseltmesi Nisan 2023'te gerçekleşti, hisseleme para çekme işlemlerini başlattı. Hisseleme havuzlarını destekleyen doğrulayıcı hesaplar artık çıkış ve ayarladıkları çekim adresine ETH çekme yeteneğine sahipler. Bu hisse miktarını arkaplandaki ETH için kullanma yeteneğini aktif eder. Bu işlevselliği ne şekilde desteklediklerini görmek için sağlayıcınıza danışın.

Alternatif olarak, bir ERC-20 likidite token'ı kullanan havuzlar, kullanıcıların bu token'ın açık pazarda ticaretini yapmalarına izin vererek hisseleme pozisyonunuzu satmanıza, ETH'yi hisseleme sözleşmesinden fiilen çıkarmadan etkin bir şekilde "çekmenize" olanak tanır.

<ButtonLink href="/staking/withdrawals/">Hisseleme çekimleri hakkında daha fazla bilgi</ButtonLink>\n
</ExpandableCard>

<ExpandableCard title="Bu, borsada stake etmekten farklı mı?">
\nBu havuzlanmış hisseleme seçenekleri ile merkezi borsalar arasında, küçük miktarlarda ETH hisseleme ve doğrulayıcıları etkinleştirmek için bir araya getirme gibi birçok benzerlik vardır.

Merkezi borsalardan farklı olarak, diğer birçok havuzlanmış hisseleme seçeneği, genellikle kendi cüzdanınızda tutulabilen ve tıpkı diğer herhangi bir token gibi alınıp satılan ERC-20 token'ları olan akıllı sözleşmeleri ve/veya hisseleme token'larını kullanır. Bu, size tokenleriniz üzerinde kontrol sağlayarak bir egemenlik ve güvenlik katmanı sunar, ancak yine de arka planda sizin adınıza onaylayan doğrulayıcı istemci üzerinde doğrudan kontrol sağlamaz.

Arkalarındaki düğümler söz konusu olduğunda bazı havuzlar diğerlerinden daha merkeziyetsizdir. Ağın sağlığını ve merkeziyetsizliğini teşvik etmek için, pay sahipleri her zaman izinsiz merkeziyetsiz bir dizi düğüm operatörü sağlayan bir havuz hizmeti seçmeye teşvik edilir.
</ExpandableCard>

## Daha fazla kaynak {#further-reading}

- [Ethereum Hisseleme Dizini](https://www.staking.directory/) - _Eridian ve Spacesider_
- [Rocket Pool ile Hisseleme - Hisselemeye Genel Bakış](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool belgeleri_
- [Lido ile Ethereum Hisseleme](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido yardım belgeleri_
