---
title: Ether'a giriş
description: Ether kripto parasına yönelik bir geliştirici tanıtımı.
lang: tr
---

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamanıza yardımcı olmak için önce [ Ethereum'a Giriş](/developers/docs/intro-to-ethereum/)'i okumanızı öneririz.

## Kripto para nedir? {#what-is-a-cryptocurrency}

Bir kripto para, blok zinciri tabanlı bir kayıt defteri tarafından güvence altına alınan bir takas aracıdır.

Bir takas aracı, mallar ve hizmetler için ödeme olarak yaygın olarak kabul edilen bir şeydir ve bir kayıt defteri, işlemleri takip eden bir veri deposudur. Blok zinciri teknolojisi kullanıcıların, kayıt defterini korumak için güvenilir bir üçüncü tarafa bağımlı kalmadan kayıt defteri üzerinde işlem yapmalarını sağlar.

İlk kripto para, Satoshi Nakamoto tarafından oluşturulan Bitcoin'di. Bitcoin'in 2009'da piyasaya sürülmesiyle beraber, insanlar birçok farklı blok zincirinde binlerce kripto para yarattı.

## Ether nedir? {#what-is-ether}

**Ether (ETH)** Ethereum ağındaki birçok şey için kullanılan bir kripto paradır. Esasen, işlem ücretleri için kabul edilen tek ödeme yoludur ve [Birleşim](/roadmap/merge) sonrasında ether Ana Ağ'da blok doğrulamak ve önermek için gereklidir. Ether ayrıca, [DeFi](/defi) kredi piyasalarında birincil teminat biçimi olarak, NFT piyasalarında bir hesap birimi olarak, hizmetlerin gerçekleştirilmesi veya gerçek dünya mallarının satılması için kazanılan ödeme ve daha fazlası olarak kullanılır.

Ethereum, geliştiricilerin tümü bir bilgi işlem gücü havuzunu paylaşan [**merkeziyetsiz uygulamalar (dapp'ler)**](/developers/docs/dapps) oluşturmasına olanak tanır. Bu paylaşılan havuz sınırlı olduğu için Ethereum'un onu kimin kullanacağını belirlemek için bir mekanizmaya ihtiyacı vardır. Aksi takdirde, bir dapp yanlışlıkla veya kötü niyetli olarak tüm ağ kaynaklarını tüketebilir ve bu da başkalarının ona erişmesini engelleyebilir.

Ether kripto parası, Ethereum'un bilgi işlem gücü için bir fiyatlandırma mekanizmasını destekler. Kullanıcılar bir işlem yapmak istediklerinde, işlemlerinin blok zincirinde tanınması için ether ödemeleri gerekir. Bu kullanım maliyetleri, [gaz ücretleri](/developers/docs/gas/) olarak bilinir ve gaz ücreti, işlemi gerçekleştirmek için gereken bilgi işlem gücü miktarına ve ağ genelindeki zamandaki bilgi işlem gücü talebine bağlıdır.

Bu nedenle, kötü niyetli bir dapp sonsuz bir döngü gönderse bile, işlemin sonunda kullanacak ether'ı kalmaz ve işlem sona ererek ağın normale dönmesine izin verir.

Ethereum ve ether'dan [yaygın](https://www.reuters.com/article/us-crypto-currencies-lending-insight-idUSKBN25M0GP#:~:text=price%20of%20ethereum) [olarak](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845#:~:text=cryptocurrencies%20including%20ethereum) [aynı şeylermiş gibi bahsedilir](https://www.cnn.com/2021/03/14/tech/nft-art-buying/index.html#:~:text=price%20of%20ethereum): İnsanlar "Ethereum fiyatından" bahsederken, ether'ın fiyatını kastederler.

## Ether basma {#minting-ether}

Basmak, Ethereum defterinde yeni ether'ın oluşturulduğu süreçtir. Temeldeki Ethereum protokolü yeni ether'ı oluşturur ve bir kullanıcının ether oluşturması mümkün değildir.

Ether önerilen her bir blok için ve mutabakata ulaşmaya bağlı diğer doğrulayıcı aktivileri için her dönem kontrol noktasında ödül olarak basılır. Basılan toplam miktar doğrulayıcı sayısına ve ne kadar ether kilitlediklerine bağlıdır. Toplam basım tüm doğrulayıcıların dürüst ve çevrimiçi olduğu ideal duruma göre doğrulayıcılar arasında eşit biçimde pay edilir, ancak gerçekte, doğrulayıcı performansına göre değişiklik gösterir. Toplam basımın 1/8'i blok önericisine gider; kalanı diğer doğrulayıcılar arasında dağıtılır. Blok önericileri aynı zamanda işlem ücretlerinden bahşişler ve MEV bağlantılı gelir elde ederler, ancak bunlar yeni basımdan değil, geri dönüştürülmüş etherden gelir.

## Ether yakma {#burning-ether}

Blok ödülleri yoluyla yaratılmasının yanı sıra ether, "yakma" adı verilen bir süreçle yok edilebilir. Ether, yakıldığında dolaşımdan kalıcı olarak çıkarılır.

Ethereum üzerindeki her işlemde ether yakılır. Kullanıcılar işlemler için ödeme yaptığında, ağ tarafından işlem talebine göre belirlenen bir temel gaz ücreti yok edilir. Bu, değişken blok büyüklüğü ve maksimum gaz ücreti ile birleştirildiğinde, Ethereum'da işlem ücreti tahminini basitleştirir. [Bloklar](https://etherscan.io/block/12965263), ağ talebi yüksek olduğunda bastıklarından daha fazla ether yakarak ether ihtiyacını etkili bir şekilde dengeler.

Ana ücreti yakmak blok üreticilerinin işlemleri manipüle etme kabiliyetine engel olur. Örneğin, blok üreticileri ana ücreti alırlarsa, kendi işlemlerini ücretsiz olarak dahil edebilir ve diğer herkes için ana ücreti yükseltebilirler. Alternatif olarak, bazı kullanıcılara zincir dışı temel ücreti iade edebilirler ve bu da daha opak ve karmaşık bir işlem ücreti piyasasına yol açar.

## Ether'ın birimleri {#denominations}

Ethereum'daki birçok işlemin değeri küçük olduğundan, ether'in daha küçük hesap birimleri için referans alınabilecek birkaç birimi vardır. Bu birimlerden olan Wei ve gwei, özellikle önemlidir.

Wei, mümkün olan en küçük ether miktarıdır ve sonuç olarak, [Ethereum Sarı Kağıdı (Ethereum Yellowpaper)](https://ethereum.github.io/yellowpaper/paper.pdf) gibi birçok teknik uygulama, tüm hesaplamalarında Wei'yi temel alır.

Giga-wei'nin kısaltması olan Gwei, genellikle Ethereum'daki gaz maliyetlerini tanımlamak için kullanılır.

| Birim | Ether bazında değeri | Genel Kullanımı                              |
| ----- | -------------------- | -------------------------------------------- |
| Wei   | 10<sup>-18</sup>     | Teknik uygulamaları                          |
| Gwei  | 10<sup>-9</sup>      | İnsanlar tarafından okunabilir gaz ücretleri |

## Etheri transfer yapmak {#transferring-ether}

Ethereum'daki her işlem, göndericinin adresinden alıcı adresine gönderilecek, wei cinsinden ifade edilen, aktarılacak ether miktarını belirten bir `value` alanı içerir.

Alıcı adresi bir [akıllı sözleşme](/developers/docs/smart-contracts/) olduğunda bu aktarılan ether, akıllı sözleşme kodunu yürüttüğünde gazın ödenmesi için kullanılabilir.

[İşlemler hakkında daha fazla bilgi](/developers/docs/transactions/)

## Ether sorgulama {#querying-ether}

Kullanıcılar, herhangi bir [hesabın](/developers/docs/accounts/) ether bakiyesini, hesabın wei cinsinden ether varlıklarını gösteren `balance` alanını inceleyerek sorgulayabilir.

[Etherscan](https://etherscan.io), web tabanlı bir uygulama aracılığıyla adres bakiyelerini denetlemek için popüler bir araçtır. Örneğin, [bu Etherscan sayfası](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae), Ethereum Vakfı'nın bakiyesini gösterir. Hesap bakiyeleri cüzdanlar kullanılarak veya doğrudan düğümlere istekte bulunarak da sorgulanabilir.

## Daha fazla bilgi {#further-reading}

- [Ether'in ve Ethereum'un Tanımı](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) - _CME Grubu_
- [Ethereum Teknik Raporu](/whitepaper/): Ethereum'a dair ilk teklif. Bu belge, ether'ın tanımını ve yaratılmasının amaçlarını içerir.
- [Gwei Hesaplayıcı](https://www.alchemy.com/gwei-calculator): Wei, gwei ve eter kolayca dönüştürmek için bu gwei hesap makinesini kullanın. İstediğiniz miktarda wei, gwei veya ETH girmeniz yeterlidir ve dönüşüm otomatik olarak hesaplanır.

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
