---
title: Likit ve havuzlu staking
description: Ethereum'da likit ve havuzlu staking'e genel bir bakış
lang: tr
template: staking
image: /images/staking/leslie-pool.png
sidebarDepth: 2
summaryPoints:
  - Başkalarıyla güçlerinizi birleştirerek herhangi bir miktarda ETH ile stake edin ve ödüller kazanın
  - Zor kısmı atlayın ve doğrulayıcı operasyonunu üçüncü bir tarafa emanet edin
  - Likit staking tokenlerini kendi cüzdanınızda tutun
---

## Staking havuzları nedir? {#what-are-staking-pools}

Staking havuzları, daha küçük miktarlarda ETH'ye sahip birçok kişinin [Ethereum](/) üzerinde bir doğrulayıcıyı etkinleştirmek için gereken minimum 32 ETH'yi elde etmesine olanak tanıyan işbirlikçi bir yaklaşımdır. Havuzlama işlevi protokol içinde yerel olarak desteklenmez, bu nedenle daha küçük miktarlarla katılma ihtiyacını karşılamak için çözümler ayrı olarak oluşturulmuştur.

Bazı staking havuzları, fonların stake'inizi yöneten ve izleyen bir sözleşmeye yatırıldığı ve size bu değeri temsil eden bir makbuz tokeni (likit staking tokeni) verdiği akıllı sözleşmeler kullanarak çalışır. Diğer havuzlar akıllı sözleşmeler içermeyebilir ve bunun yerine zincir dışı aracılık edilebilir.

Havuzlu seçenekler, onlar hakkında ne kadar doğrulama yapabileceğiniz konusunda büyük farklılıklar gösterir. Şeffaf, protokol tarafından yönetilen havuzlar, Ethereum üzerinde mevduatları tutan, düğüm operatörü setlerini yayınlayan ve itfa edilebilir bir token ihraç eden açık kaynaklı akıllı sözleşmelerdir; pozisyonunuzu destekleyen her şey zincir içi olarak görülebilir. Bazı merkezi borsa getiri programları gibi şeffaf olmayan havuzlu ürünler, ETH'nizi gözetim altına alır ve sizin adınıza neyin stake edildiğini (eğer edildiyse) bağımsız olarak doğrulayamazsınız. Bu sayfanın çoğu ilk türü kapsar; aradaki farkı nasıl anlayacağınızı görmek için [şeffaf olmayan havuzlu ürünler](#opaque-pooled-products) bölümüne bakın.

Her havuzlu seçenek, 32 ETH'den daha azıyla veya donanım çalıştırmadan staking yapmanın gerçek erişim sorununu çözer. Ancak her biri aynı zamanda staker ile çekirdek Ethereum protokolü arasına bir aracı koyar. Yalnızca [bireysel staking](/staking/solo/) size Ethereum ile doğrudan, aracısız bir ilişki sağlar.

## Neden bir havuzla stake etmelisiniz? {#why-stake-with-a-pool}

[Staking'e katılmanın](/staking/) faydalarına ek olarak, bir havuzla stake etmek bir dizi benzersiz avantajla birlikte gelir.

<Grid>
  <Card title="Düşük giriş engeli" icon={<Fish />} description="Balina değil misiniz? Sorun değil. Çoğu staking havuzu, 32 ETH gerektiren bireysel staking'in aksine, diğer staker'larla güçlerinizi birleştirerek neredeyse her miktarda ETH'yi stake etmenize olanak tanır." />
  <Card title="Bugün stake edin" icon={<Clock />} description="Bir havuzla stake etmek, bir token takası kadar kolaydır. Donanım kurulumu ve düğüm bakımı konusunda endişelenmenize gerek yoktur. Havuzlar, düğüm operatörlerinin doğrulayıcıları çalıştırmasını sağlayan ETH'nizi yatırmanıza olanak tanır. Ödüller daha sonra düğüm operasyonları için bir ücret düşüldükten sonra katkıda bulunanlara dağıtılır." />
  <Card title="Likit staking tokenleri" icon={<Droplets />} description="Birçok staking havuzu, stake ettiğiniz ETH ve ürettiği ödüller üzerinde bir talebi temsil eden bir token sağlar. Bu, stake ettiğiniz ETH'yi örneğin merkeziyetsiz finans (DeFi) uygulamalarında teminat olarak kullanmanıza olanak tanır." />
</Grid>

## Staking seçeneklerinin karşılaştırması {#comparison-of-staking-options}

<StakingComparison page="pools" />

## Likit staking tokenleri {#liquid-staking-tokens}

Çoğu şeffaf staking havuzu, stake edilen ETH ve kazandığı ödüller üzerinde bir talebi temsil eden bir ERC-20 tokeni olan bir **likit staking tokeni (LST)** ihraç eder. ETH yatırdığınızda, protokol bunu düğüm operatörleriyle stake eder ve cüzdanınıza bir makbuz tokeni (LST) basar. Tokeni kendiniz tutabilir veya üçüncü taraf bir sağlayıcıda saklayabilir ve tokeni istediğiniz zaman transfer edebilir veya satabilirsiniz. Dayanak ETH, mutabakat katmanında stake edilmiş olarak kalır. Likit staking protokolleri, stake edilen tüm ETH'lerin yaklaşık üçte birini oluşturur ve bu da LST'leri günümüzde stake etmenin en yaygın yollarından biri haline getirir.

### Ödüller tokende nasıl görünür {#how-rewards-show-up-in-the-token}

LST'ler staking ödüllerini iki yoldan biriyle yansıtır:

- **Yeniden temellendirme (rebasing) tokenleri** (Lido'nun stETH'si gibi): ödüller tahakkuk ettikçe token bakiyeniz artar, böylece bir token kabaca bir ETH'ye eşit değerde kalır.
- **Döviz kuru tokenleri** (Rocket Pool'un rETH'si gibi): token bakiyeniz aynı kalır, ancak her bir token zamanla artan miktarda ETH için itfa edilebilir hale gelir.

Her iki tasarım da ödülleri staking protokolünün ücretinden net olarak sunar. Hiçbiri doğası gereği daha iyi değildir, ancak cüzdanlarda ve merkeziyetsiz finans (DeFi) uygulamalarında farklı davranırlar ve bazı yargı bölgelerinde vergi amaçları için farklı muamele görürler. Yeniden temellendirme tokenleri, [DeFi](/glossary/#defi) uygulamalarıyla uyumluluk için genellikle "sarılmış" (wrapped) yeniden temellendirme yapmayan sürümlere sahiptir.

### İtfa etme ve alım satım {#redeeming-and-trading}

Bir LST pozisyonundan çıkış yapmanın iki yolu vardır:

- Dayanak ETH için **protokol aracılığıyla itfa edin**. İtfa işlemi, protokolün mevcut likiditeye sahip olmasına bağlıdır; bu, stake edilmemiş ETH'den oluşan bir tampon veya mutabakat katmanı çıkış kuyruğu aracılığıyla çıkan doğrulayıcılar olabilir ve bu zaman alabilir.
- İstediğiniz zaman **ikincil piyasalarda satın**. Token serbestçe işlem gördüğünden, piyasa fiyatı, özellikle piyasa stresi dönemlerinde, onu destekleyen ETH'nin değerinden sapabilir.

Pectra yükseltmesinden bu yana, [yürütme katmanı tetiklemeli çekim işlemleri (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002), doğrulayıcı çıkışlarının doğrudan yürütme katmanından çekim adresi sahibi tarafından tetiklenmesine olanak tanır. Staking protokolleri, doğrulayıcılarının düğüm operatörlerinin işbirliğine güvenmeden çıkış yapabilmesini sağlamak için bu özelliği kullanabilir, böylece itfalar düğüm operatörlerine güvenmeye eskisinden daha az dayanır.

### Bir LST tutmak staking ile aynı şey değildir {#holding-an-lst-is-not-the-same-as-staking}

Ethereum protokolü ödülleri doğrulayıcılara öder; tokeninizin var olduğunu bilmez. Bir LST tuttuğunuzda, protokolün bakış açısına göre bir staker değilsiniz. Bunun yerine, sizin adınıza stake eden bir hizmet veya akıllı sözleşme üzerinde bir talep tutarsınız. Bu normal koşullarda iyi çalışır, ancak ek güven bağımlılıklarıyla birlikte gelir. Stake ettiğiniz ETH, yalnızca Ethereum'un kendisine değil, havuzun sözleşmelerinin, yönetişiminin ve operatörlerinin doğru çalışmasına bağlıdır.

## Likit staking tokenlerinin riskleri {#risks-of-liquid-staking-tokens}

LST'ler, staking'in temel risklerini (havuzun doğrulayıcılarındaki ceza kesintisi ve kesinti süresi cezaları gibi) devralır ve kendi katmanlarını ekler:

- **Akıllı sözleşme riski** - ETH'niz, hatalar içerebilecek veya istismar edilebilecek sözleşmeler tarafından tutulur. Açık kaynaklı, denetlenmiş, savaşta test edilmiş koda sahip protokolleri tercih edin.
- **Piyasa ve likidite riski** - tokenin ikincil piyasa fiyatı, onu destekleyen ETH'nin değerinin altına düşebilir ("sabitliğin bozulması"). Çıkmak istediğinizde protokol itfaları yavaş veya sıkışıksa, indirimli satmak tek hızlı çıkışınız olabilir.
- **Yönetişim ve yükseltme riski** - ücretler, düğüm operatörü setleri ve hatta tokenin nasıl çalıştığı, protokolün yönetişimi ve sözleşme yükseltmeleri aracılığıyla değiştirilebilir. Bir token sahibi olarak genellikle bu yönetişimde oy hakkınız yoktur.
- **Operatör seti merkezileşmesi** - bazı havuzlar stake'i seçtikleri düğüm operatörleriyle yoğunlaştırır. Birkaç kuruluşun kontrolü altındaki büyük miktarlarda stake edilmiş ETH, sansür, değer çıkarımı ve tek hata noktaları için koşullar yaratır. İzinsiz, dağıtık operatör setlerine sahip havuzları tercih edin.
- **Ceza kesintisi yansıması** - havuzun doğrulayıcıları ceza kesintisine uğrar veya cezalandırılırsa, kayıp genellikle protokolün kurallarına göre tüm token sahipleri arasında sosyalleştirilir.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
Birçok havuz, bir doğrulayıcının anahtarını birden fazla makine ve operatör arasında bölen ve böylece hiçbir tekil arıza veya ele geçirilmenin doğrulayıcıyı çökertmemesini sağlayan bir ara yazılım olan **dağıtık doğrulayıcı teknolojisi (DVT)** kullanarak operatör riskini azaltır. [Dağıtık doğrulayıcı teknolojisi hakkında daha fazlası](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Şeffaf olmayan havuzlu ürünler {#opaque-pooled-products}

"Staking" olarak pazarlanan her şey protokol staking'i değildir. Merkezi borsa "kazan" veya "ödül" programları ve staking tokenleri üzerine inşa edilen bazı getiri ürünleri, müşteri ETH'sini inceleyemeyeceğiniz şekillerde havuzlar:

- **Gözetimli** - sağlayıcı çekim anahtarlarını ve ETH'yi elinde tutar.
- **Şartlar değişebilir** - oranlar, kilitlenmeler ve uygunluk şirket politikası tarafından belirlenir ve zincir içi sözleşmeler tarafından uygulanan kuralların aksine herhangi bir zamanda revize edilebilir.
- **Hiç staking olmayabilir** - teknik olarak, getiri doğrulayıcılar yerine borç verme, alım satım veya diğer faaliyetlerden gelebilir. Genellikle doğrulamanın bir yolu yoktur.
- **Karşı taraf riski** - sağlayıcı iflas ederse veya çekim işlemlerini dondurursa, itfa edebileceğiniz zincir içi hiçbir şey yoktur.

Şeffaf bir havuzu şeffaf olmayan bir üründen ayırmak için şunları sorun:

1. ETH'nizin nereye gittiğini açık kaynaklı, denetlenmiş sözleşmelerde zincir içi olarak doğrulayabiliyor musunuz?
2. Düğüm operatörü seti yayınlanmış mı?
3. Kendi cüzdanınızda tutulan ve dayanak ETH için itfa edilebilir bir token alıyor musunuz?
4. Kurallar akıllı sözleşmeler ve kamu yönetişimi tarafından mı yoksa bir şirketin hizmet şartları tarafından mı uygulanıyor?

Bir sağlayıcı bu sorulardan ne kadar çoğuna yalnızca "bize güvenin" yanıtını verebiliyorsa, ürün o kadar şeffaf değildir.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
Bazı ürünler, staking'i, stake edilmiş ETH'yi ek ceza kesintisi koşulları altında ek protokolleri güvence altına almayı taahhüt eden LST'ler için bir kullanım durumu olan **yeniden staking** ile birleştirerek "gelişmiş" veya "artırılmış" getiri reklamı yapar. Yeniden staking, doğrudan staking katılımının bir biçimi değil, LST'lerin üzerine inşa edilmiş ayrı bir risk kategorisi ve yeni bir uygulamadır. Bir getiri rakamı çekirdek ağ staking oranından anlamlı ölçüde yüksekse, ekstra getirinin tam olarak nereden geldiğini sormalısınız. [Yeniden staking nedir?](/restaking/)
</AlertDescription>
</AlertContent>
</Alert>

## Bir havuz için düğüm çalıştırın {#run-a-node-for-a-pool}

Bir staking havuzu için teminatlı bir düğüm operatörü olmak, bir token tutmak ile bireysel staking arasında bir orta yoldur. Bazı staking protokolleri, bireylerin diğer kullanıcılardan gelen havuzlu ETH'yi kullanarak doğrulayıcıları çalıştırmasına izin verir. Kendi ETH'nizi teminat olarak yatırır, donanımı ve anahtarları çalıştırır ve sizinle eşleşen stake üzerinden bir komisyon kazanırsınız.

Örneğin, Rocket Pool megapool doğrulayıcıları, doğrulayıcı başına 4 ETH teminat gerektirir ve Lido'nun Topluluk Staking Modülü, ilk doğrulayıcı anahtarı için yaklaşık 2,4 ETH (Tanımlanmış Topluluk Staker'ları için 1,5 ETH) gerektirir. Bu, 32 ETH'den daha azına sahip kişilere, havuzun kurallarını, performans gereksinimlerini ve ceza koşullarını kabul ederken kendi donanımlarını çalıştırmaları ve ağın operatör setini güçlendirmeleri için bir yol sunar.

## Dikkate alınması gerekenler {#what-to-consider}

Her havuz ve kullandıkları araçlar veya akıllı sözleşmeler farklı ekipler tarafından oluşturulmuştur ve her biri faydalar ve risklerle birlikte gelir. Havuzlu veya yetkilendirilmiş staking, Ethereum protokolü tarafından yerel olarak desteklenmez ve staking için altın standart, mümkün olduğunda her zaman kendi donanımlarında doğrulayıcıları çalıştıran bireyler olmalıdır.

Özellik göstergeleri, listelenen bir staking havuzunun sahip olabileceği dikkate değer güçlü veya zayıf yönleri belirtmek için aşağıda kullanılmıştır. Katılmak için bir havuz seçerken bu özellikleri nasıl tanımladığımıza dair bir referans olarak bu bölümü kullanın.

<StakingConsiderations page="pools" />

## Staking havuzlarını keşfedin {#explore-staking-pools}

Kurulumunuzda size yardımcı olacak çeşitli seçenekler mevcuttur. Aşağıdaki araçlarda size rehberlik etmesi için yukarıdaki göstergeleri kullanın.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Ağın güvenliğini artırdığı ve riskinizi sınırladığı için [istemci çeşitliliğini](/developers/docs/nodes-and-clients/client-diversity/) ciddiye alan bir hizmet seçmenin önemini lütfen unutmayın. Çoğunluk istemci kullanımını sınırladığına dair kanıtı olan hizmetler <em style={{ textTransform: "uppercase" }}>"yürütme istemcisi çeşitliliği"</em> ve <em style={{ textTransform: "uppercase" }}>"fikir birliği istemcisi çeşitliliği"</em> ile belirtilmiştir.

Gözden kaçırdığımız bir staking aracı için öneriniz mi var? Uygun olup olmayacağını görmek ve inceleme için göndermek üzere [ürün listeleme politikamıza](/contributing/adding-staking-products/) göz atın.

<StakingCommunityCallout className="my-16" />

## Sıkça sorulan sorular {#faq}

<ExpandableCard title="Nasıl ödül kazanırım?">
Genellikle ERC-20 likit staking tokenleri staker'lara ihraç edilir ve stake ettikleri ETH'nin değeri artı ödülleri temsil eder. Ödüller, token tasarımına bağlı olarak size iki yoldan biriyle ulaşır: yeniden temellendirme tokenleri ödüller tahakkuk ettikçe token bakiyenizi artırırken, döviz kuru tokenleri bakiyenizi sabit tutar ve zamanla daha fazla ETH için itfa edilebilir hale gelir. Her iki durumda da ödüller, havuzun ücretinden net olarak dağıtılır.
</ExpandableCard>

<ExpandableCard title="Stake'imi ne zaman çekebilirim?">
Staking çekim işlemleri, Nisan 2023'teki Şanghay/Capella yükseltmesinden bu yana etkinleştirilmiştir. Staking havuzlarını destekleyen doğrulayıcı hesapları çıkış yapabilir ve belirlenen çekim adreslerine ETH çekebilir, bu da stake'inizin kendi payınıza düşen kısmını dayanak ETH için itfa etmenizi sağlar. İtfa hızı, havuzunuzun mevcut likiditesine ve mutabakat katmanı çıkış kuyruğuna bağlıdır. Bu işlevi nasıl desteklediklerini görmek için sağlayıcınıza danışın.

Pectra yükseltmesinden bu yana havuzlar, düğüm operatörlerinin imzalama anahtarlarına güvenmeden doğrulayıcıları doğrudan çekim adresinden çıkarmak için yürütme katmanı tetiklemeli çekim işlemlerini (EIP-7002) de kullanabilir ve bu da itfaların yerine getirilmesi için gereken güveni azaltır.

Alternatif olarak, bir ERC-20 likit staking tokeni kullanan havuzlar, kullanıcıların bu tokeni açık piyasada alıp satmasına olanak tanıyarak, staking pozisyonunuzu satmanıza ve ETH'yi staking sözleşmesinden fiilen çıkarmadan etkili bir şekilde "çekim yapmanıza" olanak tanır. Piyasa fiyatının tokenin itfa değerinden farklı olabileceğini unutmayın.

<ButtonLink href="/staking/withdrawals/">Staking çekim işlemleri hakkında daha fazlası</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Bu, borsamda staking yapmaktan farklı mı?">
Bu havuzlu staking seçenekleri ile merkezi borsalar arasında, küçük miktarlarda ETH'yi stake etme ve doğrulayıcıları etkinleştirmek için bunların bir araya getirilmesi gibi birçok benzerlik vardır.

Merkezi borsaların aksine, diğer birçok havuzlu staking seçeneği, genellikle kendi cüzdanınızda tutulabilen ve tıpkı diğer tokenler gibi alınıp satılabilen ERC-20 tokenleri olan akıllı sözleşmeler ve/veya likit staking tokenleri kullanır. Bu, tokenleriniz üzerinde size kontrol sağlayarak bir egemenlik ve güvenlik katmanı sunar, ancak yine de arka planda sizin adınıza onay veren doğrulayıcı istemcisi üzerinde size doğrudan kontrol sağlamaz.

Borsa "kazan" programları da gözetimlidir ve zincir içi kurallar yerine şirket şartları tarafından yönetilir ve getirileri protokol staking'inden hiç gelmeyebilir. Aradaki farkı nasıl anlayacağınızı görmek için [şeffaf olmayan havuzlu ürünler](#opaque-pooled-products) bölümüne bakın.

Bazı havuzlama seçenekleri, onları destekleyen düğümler söz konusu olduğunda diğerlerinden daha merkeziyetsizdir. Ağın sağlığını ve merkeziyetsizliğini teşvik etmek için, staker'lar her zaman izinsiz, merkeziyetsiz bir düğüm operatörü seti sağlayan bir havuzlama hizmeti seçmeye teşvik edilir.
</ExpandableCard>

## Daha fazla bilgi {#further-reading}

- [Ethereum Staking Dizini](https://www.staking.directory/) - _Eridian ve Spacesider_
- [Likit staking türevlerinin riskleri](https://notes.ethereum.org/@djrtwo/risks-of-lsd) - _Danny Ryan_
- [Likit Staking Nedir?](https://chain.link/education-hub/liquid-staking) - _Chainlink_
- [EIP-7002: Yürütme katmanı tetiklenebilir çekim işlemleri](https://eips.ethereum.org/EIPS/eip-7002) - _Ethereum İyileştirme Önerileri_
- [Ethereum Staking Havuzu Derecelendirmeleri](https://explorer.rated.network/) - _Rated Network Explorer_
- [Likit yeniden staking tokeni (LRT) ile likit staking tokeni (LST) arasındaki fark nedir?](https://liquidcollective.io/lst-vs-lrt/) - _Liquid Collective_