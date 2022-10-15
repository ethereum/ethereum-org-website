---
title: Havuzlanmış Staking
description: Ortak ETH hisselemeye nasıl başlanacağına dair genel bir bakış
lang: tr
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-pool.png
alt: Gergedan Leslie havuzda yüzüyor.
sidebarDepth: 2
summaryPoints:
  - Elinizdeki ETH miktarı farketmeksizin istediğiniz hisselemeye katılın ve ödüller kazanın
  - Zor kısmı geçip, doğrulayıcı görevini bir üçüncü partiye bırakın
  - Cüzdanınızda likidite tokenleri tutun
---

## Paydaşlık havuzları nedir? {#what-are-staking-pools}

Stake havuzları, daha az miktarda ETH'ye sahip birçok kişinin bir dizi doğrulayıcı anahtarını etkinleştirmek için gereken 32 ETH'yi elde etmesine olanak tanıyan ortaklık temelli bir yaklaşımdır. Havuzlama işlevi protokol içinde yerel olarak desteklenmez, bu nedenle çözümler bu ihtiyacı karşılamak için ayrı olarak oluşturulmuştur.

Bazı havuzlar, fonların bir sözleşmeye yatırılabileceği, bahis tutarınızı güvenilir bir şekilde yöneten ve izleyen ve size bu değeri temsil eden bir token veren akıllı sözleşmeler kullanarak çalışır. Başka havuzlar ise akıllı sözleşmelere dahil olmayabilirler, onun yerine zincir dışı çalışırlar.

## Neden bir havuz ile hisseleme? {#why-stake-with-a-pool}

[Staking'e giriş](/staking/) kısmında altını çizdiğimiz faydalara ek olarak havuz ile birlikte getiri elde etmek çok sayıda farklı yarar sağlar.

<CardGrid>
  <Card title="Düşük giriş engeli" emoji="🐟">
    Balina değil misiniz? Sorun değil. Çoğu stake havuzu, 32 ETH gerektiren solo stake etmenin aksine, diğer stakerlarla güçlerinizi birleştirerek hemen hemen her miktarda ETH stake etmenize izin verir.
  </Card>
  <Card title="Hemen hisseleyin" emoji=":stopwatch:">
    Bir havuzla bahis yapmak, token takası kadar kolaydır. Donanım kurulumu ve düğüm bakımı konusunda endişelenmenize gerek yok. Pools allow you to deposit your ETH which enables node operators to run validators. Ödüller daha sonra katkıda bulunanlara, düğüm işlemleri için ödenen ücret düşülerek dağıtılır.
  </Card>
  <Card title="Likidite tokenler" emoji=":droplet:">
    Birçok stake havuzu, stake edilen ETH'niz ve bunun ürettiği ödüller üzerindeki bir talebi temsil eden bir token sağlar. Bu, stake edilen ETH'nizi kullanmanızı sağlar, ör. DeFi uygulamalarında teminat olarak.
  </Card>
</CardGrid>

<StakingComparison page="pools" />

## Ne dikkate alınmalı {#what-to-consider}

Havuzlanmış veya devredilmiş stake etme, Ethereum protokolü tarafından doğal olarak desteklenmez, ancak kullanıcıların 32 ETH'den daha az stake etme talebi göz önüne alındığında, bu talebi karşılamak için artan sayıda çözüm oluşturulmuştur.

Her havuz ve kullandıkları araçlar veya akıllı sözleşmeler farklı ekipler tarafından oluşturulmuştur ve her biri kendi riskleri ve faydaları ile birlikte gelir.

Nitelik göstergeleri, listelenen bir stake havuzunun sahip olabileceği dikkate değer güçlü veya zayıf yönleri belirtmek için aşağıda kullanılmaktadır. Katılmak için bir havuz seçerken bu öznitelikleri nasıl tanımladığımız konusunda bu bölümü referans olarak kullanın.

<StakingConsiderations page="pools" />

## Staking havuzlarını keşfet {#explore-staking-pools}

Kurulumunuzda size yardımcı olacak çeşitli seçenekler mevcuttur. Aşağıdaki araçlarda size rehberlik etmesi için yukarıdaki göstergeleri kullanın.

<InfoBanner emoji="⚠️" isWarning>
Ağ güvenliğini iyileştirdiği ve riskinizi sınırladığı için <a href="/developers/docs/nodes-and-clients/client-diversity/">istemci çeşitliliğini</a> ciddiye alan bir hizmet seçmenin önemini lütfen unutmayın. Çoğunluk istemci kullanımını sınırladığına dair kanıta sahip hizmetler, <em style="text-transform: büyük harf;">"çeşitli istemciler"</em> olarak işaretlenir
</InfoBanner>

<StakingProductsCardGrid category="pools" />

Kaçırdığımız bir stake etme aracı için öneriniz mi var mı? Uygun olup olmadığını görmek ve incelemeye göndermek için [ürün listeleme politikamıza](/contributing/adding-staking-products/) göz atın.

## SSS {#faq}

<ExpandableCard title="Nasıl ödül kazanabilirim?">
Tipik olarak ERC-20 likidite tokenleri, stake edilen ETH artı ödüllerinin değerini temsil eden stakerlara verilir. Farklı havuzların, kullanıcılarına biraz farklı yöntemlerle hisseleme ödüllerini dağıtacağını aklınızda tutun, ancak bu ortak temadır.
</ExpandableCard>

<ExpandableCard title="Stake ettiğim tutarı ne zaman geri çekebilirim?">

Şu anda, bir Ethereum doğrulayıcısından para çekmek mümkün değildir, bu da fikir birliği katmanında kilitli ETH ödülleri için likidite token'ınızı gerçekten _kullanma_ yeteneğini sınırlar.

Alternatif olarak, bir ERC-20 likidite token'ı kullanan havuzlar, kullanıcıların bu token'ın açık pazarda ticaretini yapmalarına izin vererek hisseleme pozisyonunuzu satmanıza, ETH'yi hisseleme sözleşmesinden fiilen çıkarmadan etkin bir şekilde "çekmenize" olanak tanır.
</ExpandableCard>

<ExpandableCard title="Bu benim borsamla stake yapmaktan farklı mı?">
Bu havuzlanmış stake seçenekleri ile merkezi borsalar arasında, küçük miktarlarda ETH stake etme ve doğrulayıcıları etkinleştirmek için bir araya getirme gibi birçok benzerlik vardır.

Merkezi borsalardan farklı olarak, diğer birçok havuzlanmış stake seçeneği, genellikle kendi cüzdanınızda tutulabilen ve tıpkı diğer herhangi bir token gibi alınıp satılan ERC-20 tokenleri olan akıllı sözleşmeleri ve/veya likidite tokenleri kullanır. Bu, size tokenleriniz üzerinde kontrol sağlayarak bir egemenlik ve güvenlik katmanı sunar, ancak yine de arka planda sizin adınıza onaylayan doğrulayıcı istemci üzerinde doğrudan kontrol sağlamaz.

Arkalarındaki düğümler söz konusu olduğunda bazı havuzlar diğerlerinden daha merkeziyetsizdir. Ağın sağlığını ve merkeziyetsizliğini teşvik etmek için, pay sahipleri her zaman izinsiz merkeziyetsiz bir dizi düğüm operatörü sağlayan bir havuz hizmeti seçmeye teşvik edilir.
</ExpandableCard>

## Daha fazla bilgi {#further-reading}

- [Roket Havuzuyla Staking - Staking'e Genel Bakış](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool belgeleri_
- [Lido ile Ethereum stake et](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido yardımcı dökümanları_
