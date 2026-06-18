---
title: Ether'e teknik giriş
description: Geliştiriciler için Ether kripto parasına giriş.
lang: tr
---

## Ön koşullar {#prerequisites}

Bu sayfayı daha iyi anlamanıza yardımcı olması için öncelikle [Ethereum'a Giriş](/developers/docs/intro-to-ethereum/) bölümünü okumanızı öneririz.

## Kripto para nedir? {#what-is-a-cryptocurrency}

Kripto para, blokzincir tabanlı bir defter ile güvence altına alınmış bir değişim aracıdır.

Değişim aracı, mal ve hizmetlerin ödemesi olarak yaygın şekilde kabul gören herhangi bir şeydir ve defter, işlemleri takip eden bir veri deposudur. Blokzincir teknolojisi, kullanıcıların defteri sürdürmek için güvenilir bir üçüncü tarafa güvenmeden defter üzerinde işlem yapmalarına olanak tanır.

İlk kripto para, Satoshi Nakamoto tarafından yaratılan Bitcoin'di. Bitcoin'in 2009'da piyasaya sürülmesinden bu yana insanlar, birçok farklı blokzincir üzerinde binlerce kripto para yarattı.

## Ether nedir? {#what-is-ether}

**Ether (ETH)**, Ethereum ağında birçok şey için kullanılan kripto paradır. Temel olarak, işlem ücretleri için kabul edilebilir tek ödeme şeklidir ve [Birleşme](/roadmap/merge)'den sonra, Ana Ağ üzerinde blokları doğrulamak ve teklif etmek için Ether gereklidir. Ether ayrıca [merkeziyetsiz finans (DeFi)](/defi) borç verme piyasalarında birincil teminat biçimi, NFT pazar yerlerinde bir hesap birimi, hizmet gerçekleştirme veya gerçek dünya malları satma karşılığında kazanılan ödeme ve daha fazlası olarak kullanılır.

Ethereum, geliştiricilerin tümü bir bilgi işlem gücü havuzunu paylaşan [**merkeziyetsiz uygulamalar (dapp'ler)**](/developers/docs/dapps) oluşturmasına olanak tanır. Bu paylaşılan havuz sonludur, bu nedenle Ethereum'un onu kimin kullanacağını belirlemek için bir mekanizmaya ihtiyacı vardır. Aksi takdirde, bir dapp yanlışlıkla veya kötü niyetli olarak tüm ağ kaynaklarını tüketebilir ve bu da diğerlerinin erişimini engelleyebilir.

Ether kripto parası, Ethereum'un bilgi işlem gücü için bir fiyatlandırma mekanizmasını destekler. Kullanıcılar bir işlem yapmak istediklerinde, işlemlerinin blokzincirde tanınması için Ether ödemek zorundadırlar. Bu kullanım maliyetleri [gaz ücretleri](/developers/docs/gas/) olarak bilinir ve gaz ücreti, işlemi yürütmek için gereken bilgi işlem gücü miktarına ve o andaki bilgi işlem gücüne yönelik ağ çapındaki talebe bağlıdır.

Bu nedenle, kötü niyetli bir dapp sonsuz bir döngü gönderse bile, işlemin sonunda Ether'i biter ve sonlanır, böylece ağın normale dönmesine izin verir.

Ethereum ve Ether'i [birbirine karıştırmak yaygındır](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) — insanlar "Ethereum'un fiyatı"ndan bahsettiklerinde, aslında Ether'in fiyatını tanımlamaktadırlar.

## Ether basımı {#minting-ether}

Basım, Ethereum defterinde yeni Ether'in yaratıldığı süreçtir. Altta yatan Ethereum protokolü yeni Ether'i yaratır ve bir kullanıcının Ether yaratması mümkün değildir.

Ether, teklif edilen her blok için bir ödül olarak ve mutabakata varmakla ilgili diğer doğrulayıcı faaliyetleri için her dönem kontrol noktasında basılır. İhraç edilen toplam miktar, doğrulayıcıların sayısına ve ne kadar Ether stake ettiklerine bağlıdır. Bu toplam ihraç, tüm doğrulayıcıların dürüst ve çevrimiçi olduğu ideal durumda doğrulayıcılar arasında eşit olarak bölünür, ancak gerçekte doğrulayıcı performansına göre değişir. Toplam ihracın yaklaşık 1/8'i blok teklifçisine gider; geri kalanı diğer doğrulayıcılara dağıtılır. Blok teklifçileri ayrıca işlem ücretlerinden ve MEV ile ilgili gelirlerden bahşiş alırlar, ancak bunlar yeni ihraçtan değil, geri dönüştürülmüş Ether'den gelir.

## Ether yakımı {#burning-ether}

Blok ödülleri aracılığıyla Ether yaratmanın yanı sıra, Ether 'yakım' adı verilen bir süreçle yok edilebilir. Ether yakıldığında, kalıcı olarak dolaşımdan kaldırılır.

Ether yakımı, Ethereum'daki her işlemde gerçekleşir. Kullanıcılar işlemleri için ödeme yaptıklarında, ağ tarafından işlem talebine göre belirlenen bir taban gaz ücreti yok edilir. Bu, değişken blok boyutları ve maksimum gaz ücreti ile birleştiğinde, Ethereum'da işlem ücreti tahminini basitleştirir. Ağ talebi yüksek olduğunda, [bloklar](https://eth.blockscout.com/block/22580057) bastıklarından daha fazla Ether yakabilir ve bu da Ether ihracını etkili bir şekilde dengeler.

Taban ücretin yakılması, bir blok üreticisinin işlemleri manipüle etme yeteneğini engeller. Örneğin, blok üreticileri taban ücreti alsaydı, kendi işlemlerini ücretsiz olarak dahil edebilir ve diğer herkes için taban ücreti artırabilirlerdi. Alternatif olarak, taban ücreti bazı kullanıcılara zincir dışı olarak iade edebilirlerdi, bu da daha şeffaf olmayan ve karmaşık bir işlem ücreti piyasasına yol açardı.

## Ether birimleri {#denominations}

Ethereum'daki birçok işlemin değeri küçük olduğundan, Ether'in daha küçük hesap birimleri olarak adlandırılabilecek birkaç alt birimi vardır. Bu birimlerden Wei ve Gwei özellikle önemlidir.

Wei, mümkün olan en küçük Ether miktarıdır ve sonuç olarak, [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf) gibi birçok teknik uygulama, tüm hesaplamaları Wei'ye dayandıracaktır.

Giga-wei'nin kısaltması olan Gwei, genellikle Ethereum'daki gaz maliyetlerini tanımlamak için kullanılır.

| Birim        | Ether cinsinden değeri | Yaygın Kullanım           |
| ------------ | ---------------------- | ------------------------- |
| Wei          | 10<sup>-18</sup>       | Teknik uygulamalar        |
| Gwei         | 10<sup>-9</sup>        | İnsan tarafından okunabilir gaz ücretleri |

## Ether transferi {#transferring-ether}

Ethereum'daki her işlem, göndericinin adresinden alıcının adresine gönderilecek Wei cinsinden Ether miktarını belirten bir `value` alanı içerir.

Alıcı adresi bir [akıllı sözleşme](/developers/docs/smart-contracts/) olduğunda, bu transfer edilen Ether, akıllı sözleşme kodunu yürüttüğünde gaz için ödeme yapmak üzere kullanılabilir.

[İşlemler hakkında daha fazlası](/developers/docs/transactions/)

## Ether sorgulama {#querying-ether}

Kullanıcılar, herhangi bir [hesabın](/developers/docs/accounts/) Wei cinsinden Ether varlıklarını gösteren `balance` alanını inceleyerek hesabın Ether bakiyesini sorgulayabilirler.

[Etherscan](https://etherscan.io) ve [Blockscout](https://eth.blockscout.com), web tabanlı uygulamalar aracılığıyla adres bakiyelerini incelemek için popüler araçlardır. Örneğin, [bu Blockscout sayfası](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) Ethereum Vakfı'nın bakiyesini gösterir. Hesap bakiyeleri ayrıca cüzdanlar kullanılarak veya doğrudan düğümlere istekte bulunularak da sorgulanabilir.

## Daha fazla bilgi {#further-reading}

- [Ether ve Ethereum'u Tanımlamak](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Ethereum Tanıtım Belgesi](/whitepaper/): Ethereum için orijinal teklif. Bu belge, Ether'in bir açıklamasını ve yaratılmasının arkasındaki motivasyonları içerir.
- [Gwei Hesaplayıcı](https://www.alchemy.com/gwei-calculator): Wei, Gwei ve Ether'i kolayca dönüştürmek için bu Gwei hesaplayıcısını kullanın. Herhangi bir miktarda Wei, Gwei veya ETH girin ve dönüşümü otomatik olarak hesaplayın.

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_