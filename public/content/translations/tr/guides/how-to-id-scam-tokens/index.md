---
title: Dolandırıcı token'lar nasıl tespit edilir
description: Dolandırıcı token'ları, kendilerini nasıl meşru gösterdiklerini ve onlardan nasıl kaçınılacağını anlamak.
lang: tr
---

Ethereum'un en yaygın kullanım alanlarından biri, bir grubun ticareti yapılabilir bir Token, bir anlamda kendi para birimini yaratmasıdır. Bu Token'lar genellikle bir standardı, [ERC-20](/developers/docs/standards/tokens/erc-20/)'yi takip eder. Ancak, değer getiren meşru kullanım durumlarının olduğu her yerde, bu değeri kendileri için çalmaya çalışan suçlular da vardır.

Sizi kandırmalarının muhtemel iki yolu vardır:

- Satın almak istediğiniz meşru Token'a benzeyebilen, ancak dolandırıcılar tarafından çıkarılan ve hiçbir değeri olmayan **size dolandırıcı bir Token satmak**.
- Genellikle sizi kendi kullanıcı arayüzlerine yönlendirerek **kötü niyetli işlemleri imzalamanız için sizi kandırmak**. Sözleşmelerine ERC-20 Token'larınız üzerinde bir harcama izni vermenizi sağlamaya, varlıklarınıza erişmelerini sağlayan hassas bilgileri ifşa etmenize vb. çalışabilirler. Bu kullanıcı arayüzleri, dürüst sitelerin neredeyse mükemmel klonları olabilir, ancak gizli hileler barındırır.

Dolandırıcı Token'ların ne olduğunu ve nasıl tespit edileceğini göstermek için bir örneğe bakacağız: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Bu Token, meşru [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) Token'ı gibi görünmeye çalışır.

<ExpandableCard
title="ARB nedir?"
contentPreview=''>

Arbitrum, [iyimser toplamalar (optimistic rollups)](/developers/docs/scaling/optimistic-rollups/) geliştiren ve yöneten bir organizasyondur. Başlangıçta Arbitrum kâr amacı güden bir şirket olarak organize edilmişti, ancak daha sonra merkeziyetsiz olmak için adımlar attı. Bu sürecin bir parçası olarak, ticareti yapılabilir bir [yönetişim token'ı](/dao/#token-based-membership) çıkardılar.

</ExpandableCard>

<ExpandableCard
title="Dolandırıcılık token'ı neden wARB olarak adlandırılıyor?"
contentPreview=''>

Ethereum'da, bir varlık ERC-20 uyumlu olmadığında, adının "w" ile başladığı "sarılmış" (wrapped) bir versiyonunu oluşturduğumuz bir gelenek vardır. Örneğin, Bitcoin için wBTC ve <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">Ether için wETH</a> vardır.

Zaten Ethereum'da bulunan bir ERC-20 Token'ının sarılmış bir versiyonunu oluşturmak mantıklı değildir, ancak dolandırıcılar altta yatan gerçeklikten ziyade meşruiyet görünümüne güvenirler.

</ExpandableCard>

## Dolandırıcı token'lar nasıl çalışır? {#how-do-scam-tokens-work}

Ethereum'un tüm amacı merkeziyetsizliktir. Bu, varlıklarınıza el koyabilecek veya bir akıllı sözleşme dağıtmanızı engelleyebilecek merkezi bir otorite olmadığı anlamına gelir. Ancak bu aynı zamanda dolandırıcıların diledikleri herhangi bir akıllı sözleşmeyi dağıtabilecekleri anlamına da gelir.

<ExpandableCard
title="Akıllı sözleşmeler nedir?"
contentPreview=''>

[Akıllı sözleşmeler](/developers/docs/smart-contracts/), Ethereum Blokzinciri üzerinde çalışan programlardır. Örneğin her ERC-20 Token'ı, bir akıllı sözleşme olarak uygulanır.

</ExpandableCard>

Özellikle Arbitrum, `ARB` sembolünü kullanan bir Sözleşme dağıttı. Ancak bu, diğer insanların da tamamen aynı veya benzer bir sembolü kullanan bir Sözleşme dağıtmasını engellemez. Sözleşmeyi kim yazarsa, Sözleşmenin ne yapacağını o belirler.

## Meşru görünmek {#appearing-legitimate}

Dolandırıcı Token yaratıcılarının meşru görünmek için yaptıkları birkaç hile vardır.

- **Meşru isim ve sembol**. Daha önce de belirtildiği gibi, ERC-20 sözleşmeleri diğer ERC-20 sözleşmeleriyle aynı sembole ve isme sahip olabilir. Güvenlik için bu alanlara güvenemezsiniz.

- **Meşru sahipler**. Dolandırıcı Token'lar genellikle, gerçek Token'ın meşru sahipleri olması beklenen Adreslere önemli bakiyeler airdrop yapar.

  Örneğin, tekrar `wARB`'ye bakalım. [Token'ların yaklaşık %16'sı](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders), herkese açık etiketi [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F) olan bir Adres tarafından tutulmaktadır. Bu sahte bir Adres _değildir_, gerçekten de [Ethereum Ana Ağı üzerinde gerçek ARB sözleşmesini dağıtan](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670) Adrestir.

  Bir Adresin ERC-20 bakiyesi, ERC-20 sözleşmesinin depolama alanının bir parçası olduğundan, Sözleşme tarafından Sözleşme geliştiricisinin istediği herhangi bir şey olarak belirlenebilir. Ayrıca, meşru kullanıcıların bu dolandırıcı Token'lardan kurtulamaması için bir Sözleşmenin transferleri yasaklaması da mümkündür.

- **Meşru transferler**. _Meşru sahipler dolandırıcı bir Token'ı başkalarına transfer etmek için ödeme yapmazlar, bu yüzden eğer transferler varsa meşru olmalıdır, değil mi?_ **Yanlış**. `Transfer` olayları ERC-20 sözleşmesi tarafından üretilir. Bir dolandırıcı, Sözleşmeyi kolayca bu eylemleri üretecek şekilde yazabilir.

## Dolandırıcı web siteleri {#websites}

Dolandırıcılar ayrıca çok ikna edici web siteleri, bazen aynı kullanıcı arayüzlerine sahip ancak ince hileler barındıran orijinal sitelerin tam klonlarını bile üretebilirler. Meşru görünen ancak kullanıcıyı aslında harici bir dolandırıcılık sitesine gönderen harici bağlantılar veya kullanıcıyı anahtarlarını ifşa etmeye veya bir saldırganın Adresine fon göndermeye yönlendiren yanlış talimatlar bunlara örnek olabilir.

Bundan kaçınmak için en iyi uygulama, ziyaret ettiğiniz sitelerin URL'sini dikkatlice kontrol etmek ve bilinen orijinal sitelerin adreslerini yer imlerinize kaydetmektir. Böylece, yanlışlıkla yazım hataları yapmadan veya harici bağlantılara güvenmeden yer imleriniz aracılığıyla gerçek siteye erişebilirsiniz.

## Kendinizi nasıl koruyabilirsiniz? {#protect-yourself}

1. **Sözleşme adresini kontrol edin**. Meşru Token'lar meşru organizasyonlardan gelir ve Sözleşme adreslerini organizasyonun web sitesinde görebilirsiniz. Örneğin, [`ARB` için meşru adresleri burada görebilirsiniz](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Gerçek token'ların likiditesi vardır**. Başka bir seçenek de, en yaygın Token takas Protokollerinden biri olan [Uniswap](https://uniswap.org/) üzerindeki likidite havuzu boyutuna bakmaktır. Bu Protokol, yatırımcıların işlem ücretlerinden getiri elde etme umuduyla Token'larını yatırdıkları likidite havuzlarını kullanarak çalışır.

Dolandırıcı Token'ların genellikle çok küçük likidite havuzları vardır (eğer varsa), çünkü dolandırıcılar gerçek varlıkları riske atmak istemezler. Örneğin, `ARB`/`ETH` Uniswap havuzu yaklaşık bir milyon dolar tutar ([güncel değer için buraya bakın](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) ve küçük bir miktar almak veya satmak fiyatı değiştirmeyecektir:

![Buying a legitimate token](./uniswap-real.png)

Ancak dolandırıcı Token `wARB`'yi satın almaya çalıştığınızda, çok küçük bir satın alma işlemi bile fiyatı %90'ın üzerinde değiştirecektir:

![Buying a scam token](./uniswap-scam.png)

Bu, `wARB`'nin meşru bir Token olma ihtimalinin düşük olduğunu bize gösteren başka bir kanıttır.

3. **Etherscan'e bakın**. Birçok dolandırıcı Token topluluk tarafından halihazırda tespit edilmiş ve bildirilmiştir. Bu tür Token'lar [Etherscan'de işaretlenmiştir](https://info.etherscan.com/etherscan-token-reputation/). Etherscan yetkili bir doğruluk kaynağı olmasa da (meşruiyet için yetkili bir kaynak olamaması merkeziyetsiz ağların doğasıdır), Etherscan tarafından dolandırıcılık olarak tanımlanan Token'ların dolandırıcı olma ihtimali yüksektir.

   ![Scam token in Etherscan](./etherscan-scam.png)

## Sonuç {#conclusion}

Dünyada değer olduğu sürece, onu kendileri için çalmaya çalışan dolandırıcılar olacaktır ve merkeziyetsiz bir dünyada sizi kendinizden başka koruyacak kimse yoktur. Umarım, meşru Token'ları dolandırıcılıklardan ayırmaya yardımcı olması için bu noktaları hatırlarsınız:

- Dolandırıcı Token'lar meşru Token'ları taklit eder, aynı ismi, sembolü vb. kullanabilirler.
- Dolandırıcı Token'lar aynı Sözleşme adresini _kullanamazlar_.
- Meşru Token'ın adresi için en iyi kaynak, Token'ın ait olduğu organizasyondur.
- Bunun mümkün olmadığı durumlarda, [Uniswap](https://app.uniswap.org/#/swap) ve [Blockscout](https://eth.blockscout.com/) gibi popüler, güvenilir uygulamaları kullanabilirsiniz.
