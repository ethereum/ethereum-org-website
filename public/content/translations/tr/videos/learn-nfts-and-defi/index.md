---
title: "NFT'ler nedir ve merkeziyetsiz finansta nasıl kullanılabilirler?"
description: "Ethereum üzerindeki misli olmayan token'ların (NFT'ler) mekaniklerini ve merkeziyetsiz finans (DeFi) uygulamalarında nasıl kullanıldıklarını anlayın."
lang: tr
youtubeId: "Xdkkux6OxfM"
uploadDate: 2020-09-29
duration: "0:11:13"
educationLevel: beginner
topic:
  - "nfts"
  - "defi"
  - "erc-721"
  - "erc-1155"
  - "borç verme"
format: explainer
author: Finematics
breadcrumb: "NFT'ler ve DeFi"
---

**Finematics** tarafından hazırlanan, Ethereum üzerindeki misli olmayan token'ların (NFT'ler) mekaniklerini ve token standartları, kullanım durumları ve NFT teminatlı borç verme dahil olmak üzere merkeziyetsiz finans (DeFi) ile nasıl kesiştiklerini kapsayan bir açıklayıcı.

*Bu transkript, Finematics tarafından yayınlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=Xdkkux6OxfM) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için hafifçe düzenlenmiştir.*

#### Misli ve misli olmayan (0:00) {#fungible-vs-non-fungible-000}

"Misli" (fungible) kelimesiyle başlayalım. Misli, bir varlığın bireysel birimlerinin birbirinin yerine geçebileceği ve birbirinden ayırt edilemeyeceği anlamına gelir. Misli bir varlığa iyi bir örnek para birimidir. Beş dolarlık bir banknot, değer olarak her zaman başka bir beş dolarlık banknota eşittir. Hangi beş dolarlık banknotu aldığınızı pek umursamazsınız çünkü hepsinin değeri aynıdır.

Ancak konu misli olmayan varlıklara geldiğinde, her birim benzersizdir ve doğrudan bir başkasıyla değiştirilemez. Buna iyi bir örnek uçak biletidir. Uçak biletleri birbirine benzese de her biri farklı bir yolcu adı, varış noktası, kalkış saati ve koltuk numarası taşır. Bir uçak biletini diğeriyle takas etmeye çalışmak bazı ciddi sorunlara yol açabilir.

Başka bir örnek de oyun kartlarıdır. Birbirlerine benzeseler de her kartın farklı özellikleri vardır. Üretim yılı veya kartın nasıl korunduğu gibi faktörler fark yaratabilir. Misli olmayan bir şeye uç bir örnek bir sanat eseridir — örneğin bir tablo, genellikle yalnızca tek bir orijinal kopya olarak yaratılır.

#### NFT'lerin özellikleri (2:13) {#properties-of-nfts-213}

Artık "misli olmayan"ın ne anlama geldiğini bildiğimize göre, NFT'lerin en yaygın özelliklerine bakalım.

- **Benzersiz** — her NFT, genellikle Token'ın meta verilerinde saklanan farklı özelliklere sahiptir
- **Kanıtlanabilir şekilde kıt** — genellikle sınırlı sayıda NFT vardır, uç bir örnek olarak yalnızca bir kopyaya sahip olmak verilebilir; Token sayısı Blokzincir üzerinde doğrulanabilir
- **Bölünemez** — çoğu NFT daha küçük birimlere bölünemez, bu nedenle NFT'nizin bir kısmını satın alamaz veya transfer edemezsiniz

Standart Token'lara benzer şekilde, NFT'ler de varlığın sahipliğini garanti eder, kolayca transfer edilebilir ve dolandırıcılığa karşı korumalıdır.

#### Token standartları: ERC-20, ERC-721 ve ERC-1155 (3:17) {#token-standards-erc-20-erc-721-and-erc-1155-317}

NFT'ler akıllı sözleşme programlamayı destekleyen herhangi bir Blokzincir üzerinde uygulanabilse de, en dikkate değer standartlar Ethereum üzerindeki ERC-721 ve ERC-1155'tir. NFT standartlarına dalmadan önce, karşılaştırma için yararlı olacağından ERC-20'yi hızlıca özetleyelim.

**ERC-20**, Ethereum Blokzinciri üzerinde Token oluşturmak için iyi bilinen bir standarttır. Örnekler arasında USDT veya DAI gibi sabit coin'ler ve LEND, YFI, SNX ve UNI gibi DeFi Token'ları bulunur. ERC-20, misli token'lar oluşturmaya olanak tanır — bu standart altında oluşturulan tüm Token'lar tamamen ayırt edilemezdir. Bir arkadaştan veya bir borsadan USDT almanız fark etmez; her Token'ın değeri aynıdır.

**ERC-721**, misli olmayan token'lar oluşturmak için kullanılan standarttır. Farklı özelliklere sahip ayırt edilebilir Token'lar üreten sözleşmeler oluşturmaya olanak tanır. Yaygın bir örnek, sanal kedi yavrularını toplamaya ve yetiştirmeye olanak tanıyan bir oyun olan ünlü CryptoKitties'tir.

**ERC-1155**, misli olmayan token oluşturmada bir sonraki adımdır. Bu standart, hem misli hem de misli olmayan token'ları destekleyen sözleşmeler oluşturmaya olanak tanır. Blokzincir tabanlı oyunlara odaklanan bir proje olan Enjin tarafından yaratılmıştır. World of Warcraft gibi birçok oyunda, bir oyuncu hem misli olmayan eşyaları (kılıçlar, kalkanlar, zırhlar) hem de altın veya ok gibi misli eşyaları elinde tutabilir. ERC-1155, geliştiricilerin hem misli hem de misli olmayan token'ları tanımlamasına ve her birinden kaç tane olması gerektiğine karar vermesine olanak tanır.

#### NFT kullanım durumları (5:28) {#nft-use-cases-528}

CryptoKitties'in yanı sıra, Gods Unchained ve Decentraland gibi NFT'lerden yararlanan başka popüler oyunlar da vardır. Decentraland ilginç bir örnektir çünkü oyuncular daha sonra yeniden satılabilecek veya hatta oyun içinde reklam alanı olarak kullanılabilecek dijital arazi parselleri satın alabilirler.

Diğer örnekler arasında Rarible ve SuperRare gibi dijital sanat pazar yerleri ve hatta OpenSea gibi pazar yeri toplayıcıları bulunur. NFT'ler olarak temsil edilebilecek kıt bir şeye başka bir örnek de alan adlarıdır — örneğin, .eth uzantılı Ethereum Name Service ve .crypto uzantılı Unstoppable Domains.

Bazı NFT'ler son derece pahalı olabilir. En pahalı CryptoKitty olan Dragon, 2017'nin sonunda 600 ETH'ye satıldı — o zamanlar yaklaşık yüz yetmiş bin dolar değerindeydi. exchange.eth gibi kıt alan adlarının değeri beş yüz bin doların üzerinde olabilir.

#### DeFi'de teminat olarak NFT'ler (6:48) {#nfts-as-collateral-in-defi-648}

Konu DeFi olduğunda, NFT'ler merkeziyetsiz finans (DeFi) için daha da fazla potansiyelin kilidini açabilir. Şu anda, DeFi borç verme protokollerinin büyük çoğunluğu teminatlıdır. En ilginç fikirlerden biri NFT'leri teminat olarak kullanmaktır. Bu, bir sanat eserini, dijital araziyi veya hatta tokenize edilmiş gayrimenkulü temsil eden bir NFT'yi teminat olarak sunabileceğiniz ve buna karşılık borç alabileceğiniz anlamına gelir.

Bu umut verici görünüyor, ancak bir sorun var. Compound veya Aave gibi standart DeFi borç verme ve borç alma platformlarında, sağlanan teminatın değeri fiyat oracle'ları entegre edilerek kolayca ölçülebilir. Bunlar, merkezi ve merkeziyetsiz borsalar gibi birden fazla likit kaynaktan gelen fiyatları bir araya getirir. Konu NFT'ler olduğunda, belirli Token'ların piyasaları genellikle likit değildir, bu da fiyat keşif sürecini zorlaştırır.

Bu sorunu daha iyi anlamak için, birinin 10 ETH'ye nadir bir CryptoKitty satın aldığını hayal edin. Bu NFT daha sonra teminat olarak kullanılır ve borç alan kişi 1.700 DAI çeker — 10 ETH'nin 3.500 dolar değerinde olduğu ve bu belirli NFT'nin %50 kredi-değer oranına sahip olduğu varsayımıyla. Bundan sonra, başka hiç kimse bu belirli CryptoKitty'yi satın almaya istekli değilse, bu NFT'nin piyasası likit değildir veya hatta mevcut değildir. Tek varsayım, NFT'nin hala son satıldığı miktarla aynı değerde olduğudur — ki bu güvenli bir varsayım değildir, çünkü NFT'lerin değeri oldukça dramatik bir şekilde değişebilir.

Bu nedenle NFT teminatlı krediler sunan bazı projeler biraz farklı bir model kullanır: eşler arası krediler. Bu pazar yeri modelinde, borç alanlar NFT'lerini teminat olarak sunabilir ve borç verenler bir krediyi başlatmadan önce hangi NFT'yi kabul etmeye istekli olduklarını seçebilirler. Teminat olarak kullanılan NFT bir emanet sözleşmesinde tutulur ve borç alan kişi ödünç aldığı tutarı ve faizini zamanında geri ödemeyerek temerrüde düşerse, NFT borç verene transfer edilir. Bu alan yenidir, ancak bu modeli kullanan şirketlerden biri NFTfi'dir.

#### Finansal ürünler olarak NFT'ler (9:32) {#nfts-as-financial-products-932}

Teminat olarak kullanılmasının yanı sıra NFT'ler, sigorta, tahvil veya opsiyon gibi daha karmaşık finansal ürünleri de temsil edebilir. Yearn Finance'ten Yinsure, sigorta alanındaki NFT kullanımına iyi bir örnektir. Yinsure'da her sigorta sözleşmesi, Rarible gibi ikincil bir piyasada da alınıp satılabilen bir NFT olarak temsil edilir.

Son zamanlarda likidite madenciliği gibi DeFi'ye özgü kavramların NFT projeleri tarafından kullanıldığını da görmeye başladık. Örneğin Rarible, platformlarında NFT oluşturdukları, satın aldıkları ve sattıkları için kullanıcılarını RARI yönetişim token'ları ile ödüllendirmeye başladı.

#### Büyüyen NFT piyasası (10:30) {#the-growing-nft-market-1030}

İşlem gören 100 milyon doların üzerinde NFT ve yalnızca son ayda 6 milyon dolar ile NFT alanı, kriptodaki en hızlı büyüyen nişlerden biridir. Dijital kedi yavrularından karmaşık finansal ürünlere kadar uzanan devasa bir potansiyele sahiptir.