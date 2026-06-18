---
title: Havuzlu staking
description: "Staking havuzları hakkında bilgi edinin"
lang: tr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: "Havuzda yüzen gergedan Leslie."
sidebarDepth: 2
summaryPoints:
  - Başkalarıyla güçlerinizi birleştirerek herhangi bir miktarda ETH ile stake edin ve ödüller kazanın
  - Zor kısmı atlayın ve doğrulayıcı operasyonunu üçüncü bir tarafa emanet edin
  - Staking token'larını kendi cüzdanınızda tutun
---

## Staking havuzları nedir? {#what-are-staking-pools}

Staking havuzları, daha küçük miktarlarda ETH'ye sahip birçok kişinin, bir dizi doğrulayıcı anahtarını etkinleştirmek için gereken 32 ETH'yi elde etmesine olanak tanıyan işbirlikçi bir yaklaşımdır. Havuzlama işlevi protokol içinde yerel olarak desteklenmez, bu nedenle bu ihtiyacı gidermek için çözümler ayrı olarak oluşturulmuştur.

Bazı havuzlar, fonların bir sözleşmeye yatırılabildiği akıllı sözleşmeler kullanarak çalışır; bu sözleşme, stake'inizi güvene dayalı olmayan bir şekilde yönetir ve izler ve size bu değeri temsil eden bir Token verir. Diğer havuzlar akıllı sözleşmeler içermeyebilir ve bunun yerine zincir dışı aracılık edilebilir.

## Neden bir havuzla stake etmelisiniz? {#why-stake-with-a-pool}

[Staking'e giriş](/staking/) bölümümüzde özetlediğimiz faydalara ek olarak, bir havuzla stake etmenin bir dizi farklı avantajı vardır.

<Grid>
  <Card title="Düşük giriş engeli" emoji="🐟" description="Balina değil misiniz? Sorun değil. Çoğu staking havuzu, 32 ETH gerektiren tek başına staking'in aksine, staking yapan diğer kişilerle güçlerinizi birleştirerek neredeyse her miktarda ETH'yi stake etmenize olanak tanır." />
  <Card title="Bugün stake edin" emoji=":stopwatch:" description="Bir havuzla staking yapmak, bir Token takası kadar kolaydır. Donanım kurulumu ve düğüm bakımı konusunda endişelenmenize gerek yoktur. Havuzlar, düğüm operatörlerinin doğrulayıcıları çalıştırmasını sağlayan ETH'nizi yatırmanıza olanak tanır. Ödüller daha sonra düğüm operasyonları için bir ücret düşülerek katkıda bulunanlara dağıtılır." />
  <Card title="Staking Token'ları" emoji=":droplet:" description="Birçok staking havuzu, stake ettiğiniz ETH'niz ve onun ürettiği ödüller üzerinde hak iddia etmenizi temsil eden bir Token sağlar. Bu, stake ettiğiniz ETH'yi örneğin DeFi uygulamalarında teminat olarak kullanmanıza olanak tanır." />
</Grid>

<StakingComparison page="pools" />

## Dikkate alınması gerekenler {#what-to-consider}

Havuzlu veya devredilmiş staking, [Ethereum](/) protokolü tarafından yerel olarak desteklenmez, ancak kullanıcıların 32 ETH'den daha az stake etme talebi göz önüne alındığında, bu talebe hizmet etmek için giderek artan sayıda çözüm oluşturulmuştur.

Her havuz ve kullandıkları araçlar veya akıllı sözleşmeler farklı ekipler tarafından oluşturulmuştur ve her birinin faydaları ve riskleri vardır. Havuzlar, kullanıcıların ETH'lerini stake edilmiş ETH'yi temsil eden bir Token ile takas etmelerini sağlar. Token faydalıdır çünkü gerçek ETH mutabakat katmanında stake edilmiş olarak kalsa bile, kullanıcıların herhangi bir miktarda ETH'yi, merkeziyetsiz borsalarda temel stake edilmiş ETH'ye uygulanan staking ödüllerinden getiri sağlayan eşdeğer miktarda getiri sağlayan bir Token ile (ve tersi) takas etmelerine olanak tanır. Bu, getiri sağlayan stake edilmiş ETH ürünü ile "ham ETH" arasındaki gidiş geliş takaslarının hızlı, kolay olduğu ve yalnızca 32 ETH'nin katları şeklinde mevcut olmadığı anlamına gelir.

Bununla birlikte, bu stake edilmiş ETH token'ları, büyük miktarda stake edilmiş ETH'nin birçok bağımsız bireye yayılmak yerine birkaç merkezi kuruluşun kontrolü altına girdiği kartel benzeri davranışlar yaratma eğilimindedir. Bu, sansür veya değer çıkarımı için koşullar yaratır. Staking için altın standart, mümkün olduğunda her zaman kendi donanımlarında doğrulayıcı çalıştıran bireyler olmalıdır.

[Staking token'larının riskleri hakkında daha fazla bilgi](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Aşağıda, listelenen bir staking havuzunun sahip olabileceği dikkate değer güçlü veya zayıf yönleri belirtmek için özellik göstergeleri kullanılmıştır. Katılmak için bir havuz seçerken bu özellikleri nasıl tanımladığımıza dair bir referans olarak bu bölümü kullanın.

<StakingConsiderations page="pools" />

## Staking havuzlarını keşfedin {#explore-staking-pools}

Kurulumunuzda size yardımcı olacak çeşitli seçenekler mevcuttur. Aşağıdaki araçlarda size rehberlik etmesi için yukarıdaki göstergeleri kullanın.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Ağın güvenliğini artırdığı ve riskinizi sınırladığı için [istemci çeşitliliğini](/developers/docs/nodes-and-clients/client-diversity/) ciddiye alan bir hizmet seçmenin önemini lütfen unutmayın. Çoğunluk istemci kullanımını sınırladığına dair kanıtı olan hizmetler <em style={{ textTransform: "uppercase" }}>"yürütme istemcisi çeşitliliği"</em> ve <em style={{ textTransform: "uppercase" }}>"fikir birliği istemcisi çeşitliliği"</em> ile belirtilmiştir.

Gözden kaçırdığımız bir staking aracı için öneriniz mi var? Uygun olup olmadığını görmek ve incelemeye göndermek için [ürün listeleme politikamıza](/contributing/adding-staking-products/) göz atın.

## Sıkça sorulan sorular {#faq}

<ExpandableCard title="Nasıl ödül kazanırım?">
Tipik olarak ERC-20 staking token'ları staker'lara verilir ve stake ettikleri ETH'nin değeri artı ödülleri temsil eder. Farklı havuzların staking ödüllerini kullanıcılarına biraz farklı yöntemlerle dağıtacağını unutmayın, ancak ortak tema budur.
</ExpandableCard>

<ExpandableCard title="Stake'imi ne zaman çekebilirim?">
Hemen şimdi! Şanghay/Capella ağ yükseltmesi Nisan 2023'te gerçekleşti ve staking çekim işlemlerini tanıttı. Staking havuzlarını destekleyen doğrulayıcı hesapları artık çıkış yapma ve belirlenen çekim adreslerine ETH çekme yeteneğine sahip. Bu, stake payınızı temel ETH için kullanma yeteneğini etkinleştirir. Bu işlevi nasıl desteklediklerini görmek için sağlayıcınıza danışın.

Alternatif olarak, bir ERC-20 staking Token'ı kullanan havuzlar, kullanıcıların bu Token'ı açık piyasada alıp satmasına olanak tanıyarak staking pozisyonunuzu satmanıza ve staking sözleşmesinden fiilen ETH çıkarmadan etkili bir şekilde "çekim" yapmanıza olanak tanır.

<ButtonLink href="/staking/withdrawals/">Staking çekim işlemleri hakkında daha fazla bilgi</ButtonLink>
</ButtonLink>

<ExpandableCard title="Bu, borsamla staking yapmaktan farklı mı?">
Bu havuzlu staking seçenekleri ile merkezi borsalar arasında, küçük miktarlarda ETH'yi stake etme ve doğrulayıcıları etkinleştirmek için bunları bir araya getirme yeteneği gibi birçok benzerlik vardır.

Merkezi borsaların aksine, diğer birçok havuzlu staking seçeneği, genellikle kendi cüzdanınızda tutulabilen ve tıpkı diğer Token'lar gibi alınıp satılabilen ERC-20 token'ları olan akıllı sözleşmeleri ve/veya staking token'larını kullanır. Bu, token'larınız üzerinde size kontrol sağlayarak bir egemenlik ve güvenlik katmanı sunar, ancak yine de arka planda sizin adınıza onay veren doğrulayıcı istemcisi üzerinde size doğrudan kontrol sağlamaz.

Bazı havuzlama seçenekleri, onları destekleyen düğümler söz konusu olduğunda diğerlerinden daha merkeziyetsizdir. Ağın sağlığını ve merkeziyetsizliğini teşvik etmek için, staker'lar her zaman izinsiz, merkeziyetsiz bir düğüm operatörleri kümesine olanak tanıyan bir havuzlama hizmeti seçmeye teşvik edilir.
</ExpandableCard>

## Daha fazla okuma {#further-reading}

- [Ethereum Staking Dizini](https://www.staking.directory/) - _Eridian ve Spacesider_
- [Rocket Pool ile Staking - Staking'e Genel Bakış](https://docs.rocketpool.net/guides/staking/overview.html) - _Rocket Pool belgeleri_
- [Lido ile Ethereum Staking](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido yardım belgeleri_