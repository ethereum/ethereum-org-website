---
title: "Ether'e teknik giriş"
description: "Ether kripto parasına yönelik bir geliştirici tanıtımı."
lang: tr
---

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamanıza yardımcı olmak için öncelikle [Ethereum'a Giriş](/developers/docs/intro-to-ethereum/) sayfasını okumanızı öneririz.

## Kripto para nedir? {#what-is-a-cryptocurrency}

Bir kripto para, blok zinciri tabanlı bir kayıt defteri tarafından güvence altına alınan bir takas aracıdır.

Bir takas aracı, mallar ve hizmetler için ödeme olarak yaygın olarak kabul edilen bir şeydir ve bir kayıt defteri, işlemleri takip eden bir veri deposudur. Blok zinciri teknolojisi kullanıcıların, kayıt defterini korumak için güvenilir bir üçüncü tarafa bağımlı kalmadan kayıt defteri üzerinde işlem yapmalarını sağlar.

İlk kripto para, Satoshi Nakamoto tarafından oluşturulan Bitcoin'di. Bitcoin'in 2009'da piyasaya sürülmesiyle beraber, insanlar birçok farklı blok zincirinde binlerce kripto para yarattı.

## Ether nedir? {#what-is-ether}

**Ether (ETH)**, Ethereum ağında birçok şey için kullanılan kripto paradır. Temel olarak, işlem ücretleri için kabul edilen tek ödeme şeklidir ve [Birleşim](/roadmap/merge) sonrasında Ana Ağ'da blokları doğrulamak ve önermek için ether gereklidir. Ether ayrıca [DeFi](/defi) borç verme piyasalarında birincil teminat şekli olarak, NFT pazar yerlerinde bir hesap birimi olarak, hizmetler gerçekleştirmek veya gerçek dünya mallarını satmak için kazanılan ödeme olarak ve daha fazlası için kullanılır.

Ethereum, geliştiricilerin tümünün bir bilgi işlem gücü havuzunu paylaştığı [**merkeziyetsiz uygulamalar (dapp'ler)**](/developers/docs/dapps) oluşturmasına olanak tanır. Bu paylaşılan havuz sınırlı olduğu için Ethereum'un onu kimin kullanacağını belirlemek için bir mekanizmaya ihtiyacı vardır. Aksi takdirde, bir dapp yanlışlıkla veya kötü niyetli olarak tüm ağ kaynaklarını tüketebilir ve bu da başkalarının ona erişmesini engelleyebilir.

Ether kripto parası, Ethereum'un bilgi işlem gücü için bir fiyatlandırma mekanizmasını destekler. Kullanıcılar bir işlem yapmak istediklerinde, işlemlerinin blok zincirinde tanınması için ether ödemeleri gerekir. Bu kullanım maliyetleri [gaz ücretleri](/developers/docs/gas/) olarak bilinir ve gaz ücreti, işlemi yürütmek için gereken bilgi işlem gücü miktarına ve o andaki ağ genelindeki bilgi işlem gücü talebine bağlıdır.

Bu nedenle, kötü niyetli bir dapp sonsuz bir döngü gönderse bile, işlemin sonunda kullanacak ether'ı kalmaz ve işlem sona ererek ağın normale dönmesine izin verir.

Ethereum ve ether'i birbirine [karıştırmak yaygındır](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) — insanlar "Ethereum'un fiyatından" bahsettiğinde, aslında ether'in fiyatını tarif etmektedirler.

## Ether basma {#minting-ether}

Basmak, Ethereum defterinde yeni ether'ın oluşturulduğu süreçtir. Temeldeki Ethereum protokolü yeni ether'ı oluşturur ve bir kullanıcının ether oluşturması mümkün değildir.

Ether önerilen her bir blok için ve mutabakata ulaşmaya bağlı diğer doğrulayıcı aktivileri için her dönem kontrol noktasında ödül olarak basılır. Basılan toplam miktar doğrulayıcı sayısına ve ne kadar ether kilitlediklerine bağlıdır. Toplam basım tüm doğrulayıcıların dürüst ve çevrimiçi olduğu ideal duruma göre doğrulayıcılar arasında eşit biçimde pay edilir, ancak gerçekte, doğrulayıcı performansına göre değişiklik gösterir. Toplam basımın 1/8'i blok önericisine gider; kalanı diğer doğrulayıcılar arasında dağıtılır. Blok önericileri aynı zamanda işlem ücretlerinden bahşişler ve MEV bağlantılı gelir elde ederler, ancak bunlar yeni basımdan değil, geri dönüştürülmüş etherden gelir.

## Ether yakma {#burning-ether}

Blok ödülleri yoluyla yaratılmasının yanı sıra ether, "yakma" adı verilen bir süreçle yok edilebilir. Ether, yakıldığında dolaşımdan kalıcı olarak çıkarılır.

Ethereum üzerindeki her işlemde ether yakılır. Kullanıcılar işlemler için ödeme yaptığında, ağ tarafından işlem talebine göre belirlenen bir temel gaz ücreti yok edilir. Bu, değişken blok büyüklüğü ve maksimum gaz ücreti ile birleştirildiğinde, Ethereum'da işlem ücreti tahminini basitleştirir. Ağ talebi yüksek olduğunda, [bloklar](https://eth.blockscout.com/block/22580057) bastıklarından daha fazla ether yakabilir ve bu da ether ihracını etkili bir şekilde dengeler.

Taban ücreti yakmak, bir blok üreticisinin işlemleri manipüle etme kabiliyetini engeller. Örneğin, blok üreticileri ana ücreti alırlarsa, kendi işlemlerini ücretsiz olarak dahil edebilir ve diğer herkes için ana ücreti yükseltebilirler. Alternatif olarak, bazı kullanıcılara taban ücreti zincir dışı iade edebilirler, bu da daha opak ve karmaşık bir işlem ücreti piyasasına yol açar.

## Ether birimleri {#denominations}

Ethereum'daki birçok işlemin değeri küçük olduğundan, ether'in daha küçük hesap birimleri için referans alınabilecek birkaç birimi vardır. Bu birimlerden olan Wei ve gwei, özellikle önemlidir.

Wei, mümkün olan en küçük ether miktarıdır ve sonuç olarak, [Ethereum Sarı Sayfaları](https://ethereum.github.io/yellowpaper/paper.pdf) gibi birçok teknik uygulama, tüm hesaplamaları Wei cinsinden yapar.

Giga-wei'nin kısaltması olan Gwei, genellikle Ethereum'daki gaz maliyetlerini tanımlamak için kullanılır.

| Birim | Ether bazında değeri | Genel Kullanımı                              |
| ----- | -------------------- | -------------------------------------------- |
| Wei   | 10<sup>-18</sup>     | Teknik uygulamaları                          |
| Gwei  | 10<sup>-9</sup>      | İnsanlar tarafından okunabilir gaz ücretleri |

## Ether transfer etme {#transferring-ether}

Ethereum'daki her işlem, göndericinin adresinden alıcı adresine gönderilecek olan, wei cinsinden belirtilen transfer edilecek ether miktarını belirten bir `value` alanı içerir.

Alıcı adresi bir [akıllı sözleşme](/developers/docs/smart-contracts/) olduğunda, bu transfer edilen ether, akıllı sözleşme kodunu yürüttüğünde gaz ücretini ödemek için kullanılabilir.

[İşlemler hakkında daha fazla bilgi](/developers/docs/transactions/)

## Ether sorgulama {#querying-ether}

Kullanıcılar, wei cinsinden tutulan ether'i gösteren hesabın `balance` alanını inceleyerek herhangi bir [hesabın](/developers/docs/accounts/) ether bakiyesini sorgulayabilir.

[Etherscan](https://etherscan.io) ve [Blockscout](https://eth.blockscout.com), web tabanlı uygulamalar aracılığıyla adres bakiyelerini incelemek için kullanılan popüler araçlardır. Örneğin, [bu Blockscout sayfası](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) Ethereum Vakfı'nın bakiyesini gösterir. Hesap bakiyeleri cüzdanlar kullanılarak veya doğrudan düğümlere istekte bulunarak da sorgulanabilir.

## Daha fazla kaynak {#further-reading}

- [Ether ve Ethereum'u Tanımlamak](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Ethereum Teknik Raporu](/whitepaper/): Ethereum için orijinal teklif. Bu belge, ether'ın tanımını ve yaratılmasının amaçlarını içerir.
- [Gwei Hesaplayıcı](https://www.alchemy.com/gwei-calculator): Wei, gwei ve ether'i kolayca dönüştürmek için bu gwei hesaplayıcısını kullanın. İstediğiniz miktarda wei, gwei veya ETH girmeniz yeterlidir ve dönüşüm otomatik olarak hesaplanır.

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
