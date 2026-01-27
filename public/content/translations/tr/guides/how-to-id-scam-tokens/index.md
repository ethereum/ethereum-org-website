---
title: Dolandırıcılık token'ları nasıl tespit edilir
description: Dolandırıcılık token'larını, kendilerini nasıl meşru gösterdiklerini ve bunlardan nasıl kaçınılacağını anlamak.
lang: tr
---

# Dolandırıcı jetonlar nasıl tespit edilir {#identify-scam-tokens}

Ethereum'un en yaygın kullanımlarından biri, bir grubun bir anlamda kendi para birimi olan ticareti yapılabilen bir token oluşturmasıdır. Bu jetonlar genellikle bir standart olan [ERC-20](/developers/docs/standards/tokens/erc-20/)'yi takip eder. Ancak, değer getiren meşru kullanım şekilleri bulunan her yerde, söz konusu değeri kendisi için çalmaya çalışan suçlular bulunur.

Sizi kandırmaları muhtemel olan iki yol vardır:

- **Size bir dolandırıcılık jetonu satmak**; bu jeton, satın almak istediğiniz meşru jetona benzeyebilir ancak dolandırıcılar tarafından çıkarılmıştır ve hiçbir değeri yoktur.
- **Sizi kötü niyetli işlemleri imzalamanız için kandırmak**; bunu genellikle sizi kendi kullanıcı arayüzlerine yönlendirerek yaparlar. Size kendi sözleşmelerine sizin ERC-20 token'larınız üzerinde izin verme, sizin varlıklarınıza erişim sağlayan hassas bilgileri ifşa etme ve benzeri şeyleri yaptırmaya çalışabilirler. Bu kullanıcı arayüzleri gerçek sitelerin mükemmele yakın kopyaları olabilir, ancak gizli hileler barındırırlar.

Dolandırıcı jetonların ne olduğunu ve nasıl tespit edildiklerini göstermek için bir örneğe göz atacağız: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Bu jeton, meşru [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) jetonuna benzemeye çalışır.

<ExpandableCard
title="What is ARB?"
contentPreview=''>

Arbitrum, [iyimser toplamaları](/developers/docs/scaling/optimistic-rollups/) geliştiren ve yöneten bir kuruluştur. Başlangıçta, Arbitrum kâr amaçlı bir şirket olarak organize edilmiştir, ancak sonrasında merkeziyetsizleşme adımları atmıştır. Bu sürecin bir parçası olarak, takas edilebilir bir [yönetişim jetonu](/dao/#token-based-membership) çıkardılar.

</ExpandableCard>

<ExpandableCard
title="Why is the scam token called wARB?"
contentPreview=''>

Ethereum'da bir varlık ERC-20 uyumlu olmadığında "w" ile başlayan "sarılı" halinin oluşturulduğu bir kural vardır. Örnek olarak, bitcoin için wBTC ve <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">ether için wETH</a> bulunur.

Hali hazırda Ethereum üzerinde bulunan bir ERC-20 token'ının sarılı bir versiyonunu oluşturmak mantıklı değildir, ancak dolandırıcılar arkaplandaki gerçekliktense meşru bir görünüme dayanır.

</ExpandableCard>

## Dolandırıcılık token'ları nasıl çalışır? {#how-do-scam-tokens-work}

Ethereum'un tüm meselesi merkeziyetsizliktir. Bu varlıklarınıza el koyabilecek veya bir akıllı sözleşme yayımlamanızı engelleyecek bir merkezi otorite bulunmadığı anlamına gelir. Ancak, ayrıca dolandırıcıların da istedikleri herhangi bir akıllı sözleşmeyi yayımlayabilecekleri anlamına gelir.

<ExpandableCard
title="What are smart contracts?"
contentPreview=''>

[Akıllı sözleşmeler](/developers/docs/smart-contracts/), Ethereum blokzinciri üzerinde çalışan programlardır. Örnek olarak, her ERC-20 token'ı bir akıllı sözleşme olarak uygulanmıştır.

</ExpandableCard>

Özellikle Arbitrum, `ARB` sembolünü kullanan bir sözleşme dağıttı. Ancak bu diğer kişilerin benzer veya tam olarak aynı sembolü kullanan bir sözleşme yayımlamasını engellemez. Sözleşmeyi yazan kişi sözleşmenin ne yapacağına karar verir.

## Meşru görünme {#appearing-legitimate}

Meşru görünmek için dolandırıcılık token'ı oluşturanların kullandığı bazı hileler vardır.

- **Meşru isim ve sembol**. Önceden belirtildiği gibi, ERC-20 sözleşmeleri diğer ERC-20 sözleşmeleriyle aynı sembol ve isme sahip olabilir. Güvenlik için bu alanlara güvenemezsiniz.

- **Meşru sahipler**. Dolandırıcılık token'ları genelde gerçek token'ın meşru sahipleri olabilecek adreslere büyük bakiyeler gönderirler.

  Örneğin, `wARB`'ye tekrar bakalım. [Jetonların yaklaşık %16'sı](https://eth.blockscout.com/token/0xb047c8032b99841713b8E3872F06cF32beb27b82?tab=holders), genel etiketi [Arbitrum Vakfı: Dağıtıcı](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F) olan bir adres tarafından tutulmaktadır. Bu sahte bir adres _değildir_, bu gerçekten de [Ethereum ana ağında gerçek ARB sözleşmesini dağıtan](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670) adrestir.

  Bir adresin ERC-20 bakiyesi ERC-20 sözleşmesinin depolamasının bir parçası olduğu için, sözleşme tarafından sözleşme geliştiricisinin istediği şekilde belirlenebilir. Ayrıca bir sözleşmenin, meşru kullanıcıların bu dolandırıcılık token'larından kurtulmasını engellemek için transferleri yasaklaması da mümkündür.

- **Meşru transferler**. _Meşru sahipler bir dolandırıcılık jetonunu başkalarına aktarmak için para ödemezlerdi, bu yüzden eğer transferler varsa meşru olmalı, değil mi?_ **Yanlış**. `Transfer` olayları ERC-20 sözleşmesi tarafından üretilir. Bir dolandırıcı sözleşmeyi bu olayları kolayca oluşturacak biçimde yazabilir.

## Dolandırıcı web siteleri {#websites}

Dolandırıcılar ayrıca gayet ikna edici web siteleri, hatta bazen aynı kullanıcı arayüzlerine sahip, ancak göze çarpmayan hileler içeren gerçek sitelerin birebir sahtelerini bile oluşturabilirler. Bazı örnekleri meşru görünen dış bağlantıların kullanıcıları dış bir dolandırıcılık sitesine yollaması, kullanıcıyı anahtarlarını ifşa etmeye yönlendiren veya saldırganın hesabına fon gönderten yanlış yönergeler olabilir.

Bundan kaçınmak için en iyi yol ziyaret ettiğiniz sitelerin URL'sini dikkatlice kontrol etmeniz ve bilinen gerçek sitelerin adreslerini yer işaretlerinize kaydetmenizdir. Bunun sayesinde, yazım hataları yapmadan veya dış bağlantılara bağlı kalmadan yer işaretlerinizden gerçek siteye erişebilirsiniz.

## Kendinizi nasıl korursunuz? {#protect-yourself}

1. **Sözleşme adresini kontrol edin**. Meşru token'lar meşru organizasyonlardan gelir ve sözleşme adreslerini organizasyonun web sitesinden görebilirsiniz. Örneğin, [`ARB` için meşru adresleri burada görebilirsiniz](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Gerçek token'ların likiditesi vardır**. Başka bir seçenek de en yaygın jeton takas protokollerinden biri olan [Uniswap](https://uniswap.org/) üzerindeki likidite havuzu boyutuna bakmaktır. Bu protokol yatırımcıların takas ücretlerinden gelir elde etme umuduyla token'larını yatırdıkları likidite havuzlarını kullanarak çalışır.

Dolandırıcılık token'ları genelde küçük likidite havuzlarına sahiplerdir çünkü dolandırıcılar gerçek varlıklarını riske atmak istemez. Örneğin, `ARB`/`ETH` Uniswap havuzu yaklaşık bir milyon dolar tutar ([güncel değer için buraya bakın](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) ve küçük bir miktar alıp satmak fiyatı değiştirmeyecektir:

![Meşru bir jeton satın alma](./uniswap-real.png)

Ancak dolandırıcı `wARB` jetonunu satın almaya çalıştığınızda, küçücük bir alım bile fiyatı %90'dan fazla değiştirir:

![Bir dolandırıcılık jetonu satın alma](./uniswap-scam.png)

Bu, `wARB`'nin muhtemelen meşru bir jeton olmadığını gösteren başka bir kanıttır.

3. **Etherscan'a göz atın**. Birçok dolandırıcılık token'ı hali hazırda topluluk tarafından tespit edilmiş ve rapor edilmiştir. Bu tür jetonlar [Etherscan'de işaretlenir](https://info.etherscan.com/etherscan-token-reputation/). Etherscan otoriter bir doğruluk kaynağı olmasa bile (otoriter bir doğruluk kaynağı olmaması merkeziyetsiz ağların doğasındadır), Etherscan tarafından dolandırıcılık olarak tespit edilen token'lar muhtemelen dolandırıcılıktır.

   ![Etherscan'de dolandırıcılık jetonu](./etherscan-scam.png)

## Sonuç {#conclusion}

Dünya'da değer oldukça, bu değeri kendisi için çalmaya çalışan dolandırıcılar olacaktır ve merkeziyetsiz bir dünyada kendiniz hariç sizi koruyacak kimse yoktur. Umuyoruz ki, dolandırıcılıklar ile meşru token'ları ayrıştırmak için bu maddeleri hatırlarsınız:

- Dolandırıcılık token'ları meşru token'ları taklit eder, aynı isim, sembol ve benzeri şeyleri kullanırlar.
- Dolandırıcı jetonlar aynı sözleşme adresini _kullanamazlar_.
- Meşru token'ın adresi için en iyi kaynak, token'ın sahibi olan organizasyondur.
- Bu işe yaramazsa [Uniswap](https://app.uniswap.org/#/swap) ve [Blockscout](https://eth.blockscout.com/) gibi popüler, güvenilir uygulamaları kullanabilirsiniz.
