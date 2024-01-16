---
title: Blok zincir köprülerine giriş
description: Köprüler, kullanıcıların varlıklarını farklı blok zincirler üstünde taşımalarını sağlar
lang: tr
---

# Blokzincir köprüleri {#prerequisites}

_Web3 L1 blok zincirler ve L2 ölçeklendirme çözümlerinin her birinin benzersiz yetenek ve ödünlestirmelerle tasarlandığı bir ekosisteme evrilmiştir. Blok zincir protokol sayısı arttıkça, [varlıkları zincirler arasında aktarma talebi](<https://dune.xyz/eliasimos/Bridge-Away-(from-Ethereum)>) de artmıştır. Bu talebi karşılamak için köprülere ihtiyacımız var._

<Divider />

## Köprüler nedir? {#what-are-bridges}

Blok zincir köprüleri bildiğimiz fiziksel dünyadaki köprüler gibi çalışır. Fiziksel bir köprü nasıl iki ayrı fiziksel konumu bağlıyorsa, bir blok zincir köprüsü de iki blok zincir ekosistemini birbirine bağlar. Köprüler blok zincirler arası iletişimi bilgi ve varlıkların iletimi ile sağlarlar.

Bir örneği ele alalım:

Siz Amerika'dasınız ve Avrupa'ya bir yolculuk planlıyorsunuz. Amerikan dolarınız var, ancak harcamak için avroya ihtiyaç duyuyorsunuz. Amerikan dolarınızı avroya çevirmek için küçük bir ücret karşılığında döviz değişimi işinize yarar.

Ancak başka bir blok zincir kullanmak için benzer bir değişim yapmak isteseniz ne yaparsınız? Diyelim ki [Arbitrium'da](https://arbitrum.io/) ETH kullanmak için Ethereum Ana Ağı'ndaki ETH'yi değiştirmek istiyorsunuz. EUR için yaptığımız döviz değişimi gibi, ETH'mizi Ethereum'dan Arbitrum'a taşımak için bir mekanizmaya ihtiyacımız var. Köprüler bunun gibi bir işlemi mümkün kılar. Bu durumda Arbitrum, ETH'yi Ana Ağdan Arbitrum'a aktarabilecek [yerel bir köprüye](https://bridge.arbitrum.io/) sahiptir.

## Neden köprülere ihtiyacımız var? {#why-do-we-need-bridges}

Bütün blok zincirlerin kendi sınırları vardır. Ethereumun ölçeklenmesi ve talebe ayak uydurması için toplamalara ihtiyacı olmuştur. Alternatif olarak, Solana ve Avalanche gibi L1'ler daha yüksek iş hacmi için merkeziyetsizleşme maliyeti karşılığında farklı şekilde tasarlanmışlardır.

Yine de, bütün blok zincirler izole ortamlarda geliştirilirler ve farklı kurallar ve mutabakat mekanizmalarına sahiptirler. Bu onların yerel olarak iletişim kuramayacakları ve token'ların rahatlıkla blok zincirler arasında hareket edemeyecekleri anlamına gelir.

Köprüler blok zincirleri birbirine bağlamak, aralarında bilgi ve token'ların iletimini sağlamak için vardır.

Köprüler şunu etkinleştirir:

- bilgi ve varlıkların zincirler arasında iletimini
- dApp'ların birden çok blok zincirin güçlü yanını kullanmalarını - (protokoller şimdi inovasyon için daha fazla tasarım alanına sahipler) böylece kabiliyetlerini geliştirmelerini.
- kullanıcıların yeni platformlara erişmelerini ve farklı zincirlerin faydalarını kullanmalarını.
- farklı blok zincir ekosistemlerinden geliştiricilerin iş birliği yapmasını ve kullanıcılar için yeni platformlar inşa etmelerini sağlar.

[Token'lar 2. Katman'a nasıl köprülenir?](/guides/how-to-use-a-bridge/)

<Divider />

## Köprülerin kullanım alanları {#bridge-use-cases}

Aşağıda bir köprüyü nerede kullanabileceğinizle ilgili bazı senaryolar verilmiştir:

### İşlem ücretlerini azaltma {#transaction-fees}

Diyelim ki Ethereum Ana Ağı'nda ETH'niz var ama farklı merkeziyetsiz uygulamalar için daha ucuz işlem ücreti istiyorsunuz. Ana Ağdaki ETH'nizi Ethereum L2 toplamasına köprüleyerek daha düşük işlem ücretinin tadını çıkarabilirsiniz.

### Diğer blok zincirlerdeki merkeziyetsiz uygulamalar {#dapps-other-chains}

Ethereum Ana Ağı'nda Aave'yi kullanarak USDT borç veriyorsanız ama Polygon'da Aave'yi kullanarak USDT borç vermenin faiz oranı daha yüksekse.

### Diğer blok zincir ekosistemlerini keşfetme {#explore-ecosystems}

Ethereum Ana Ağı'nda ETH'niz varsa ve diğer bir L1'i keşfedip yerel merkeziyetsiz uygulamalarını denemek istiyorsanız. Ethereum Ana Ağı'ndaki ETH'inizi diğer L1'e iletmek için bir köprü kullanabilirsiniz.

### Yerel kripto varlıklarına sahip olma {#own-native}

Diyelim ki yerel zincirde Bitcoin'e (BTC) sahip olmak istiyorsunuz ama sadece Ethereum Ana Ağı'nda varlıklarınız var. Ethereum'da BTC sahibi olmak için Wrapped Bitcoin (WBTC) satın alabilirsiniz. Ancak WBTC, bir Ethereum ağına özgü bir ERC-20 token'ıdır. Bu da Bitcoin blok zincirindeki orijinal varlık değil, Bitcoin'in Ethereum versiyonu olduğu anlamına gelir. Yerel BTC'ye sahip olmak için varlıklarınızı Ethereum'dan Bitcoin'e bir köprü aracılığı ile aktarmanız gerekir. Bu WBTC'nizi köprüleyecek ve yerel BTC'ye dönüştürecektir. Alternatif olarak, BTC sahibi olabilir ve Ethereum DeFi protokolleinde kullanmak istiyor olabilirsiniz. Bu da tersi yönünde, BTC'yi WBTC'ye köprülemeyi gerektirir. Bu şekide Ethereum'da bir varlık olarak kullanılabilir.

<InfoBanner shouldCenter emoji=":bulb:">
  Ayrıca yukarıdaki her şeyi bir <a href="/get-eth/">merkezi borsa</a> aracılığıyla da yapabilirsiniz. Ancak varlıklarınız hali hazırda borsada değilse, birden çok adım gerektirecektir ve köprü kullanmanız daha iyi olacaktır.
</InfoBanner>

<Divider />

## Köprü Türleri {#types-of-bridge}

Köprülerin çeşitli tasarım türü ve karmaşıklıkları vardır. Genel olarak köprüler iki kategoriye ayrılır: güvenilir ve güvenilir olmayan köprüler.

| Güvenilir Köprüler                                                                                                                                 | Güvenilir Olmayan Köprüler                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Güvenilir köprüler, operasyonları için merkezi bir varlığa veya sisteme bağlıdır.                                                                  | Güvenilir olmayan köprüler akıllı sözleşmeler ve algoritmalar kullanarak çalışır.                                              |
| Fonların muhafazası ve köprünün güvenliğine ilişkin güven varsayımları vardır. Kullanıcılar çoğunlukla köprü operatörünün itibarına güvenmektedir. | Güvenilir değildirler, yani köprünün güvenliği altta yatan blok zincirin güvenliği ile aynıdır.                                |
| Kullanıcıların kripto varlıklarının kontrolünü bırakmaları gerekir.                                                                                | Akıllı sözleşmeler aracılığıyla, güvenilir olmayan köprüler kullanıcıların fonlarının kontrolünü ellerinde tutmalarını sağlar. |

Kısaca, güvenilir köprüler güven varsayımlarına sahipken, güvenilir olmayan köprüler güven minimize edilmiştir ve temel etki alanlarının ötesinde yeni güven varsayımları yapmazlar. Bu terimler şu şekilde tanımlanabilir:

- **Güvenilir Olmayan**: Temel etki alanlarına eş değer güvenliğe sahip olması. [Arjun Bhuptani tarafından bu makalede](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17) açıklandığı gibi.
- **Güven varsayımları:** Sisteme harici doğrulayıcılar ekleyerek temel etki alanlarının güvenliğinden uzaklaşmak, böylece onu kripto-ekonomik olarak daha az güvenli hale getirmek.

İki yaklaşım arasındaki temel farkları daha iyi anlamak için bir örnek verelim:

Havaalanı güvenlik kontrol noktasında olduğunuzu düşünün. İki tür kontrol noktası vardır:

1. Manuel Kontrol Noktaları - biniş kartınızı vermeden önce biletinizin ve kimliğinizin tüm ayrıntılarını manuel olarak inceleyen görevliler tarafından işletilir.
2. Self Check-In - uçuş bilgilerinizi girdiğiniz ve her şey tamamsa biniş kartınızı aldığınız bir makine tarafından işletilir.

Manuel kontrol noktaları, işlemleri için üçüncü bir tarafa, yani yetkililere bağlı olduğundan güvenli modele benzer. Yetkililerin doğru kararlar alacağına ve özel bilgilerinizi doğru şekilde kullanacağına güveniyorsunuz.

Self check-in, operatörün rolünü ortadan kaldırdığı ve teknolojiyi kullandığı için güvenli olmayan bir modele benzer. Kullanıcılar verilerinin kontrolünü her zaman ellerinde tutarlar ve özel bilgileri konusunda üçüncü bir tarafa güvenmek zorunda kalmazlar.

Pek çok köprüleme çözümü, bu iki uç arasında değişen derecelerde güvensizlik içeren modeller benimsemektedir.

<Divider />

## Köprüleri kullanmanın riskleri {#bridge-risk}

Köprüler geliştirmenin ilk aşamalarındalar. Büyük olasılıkla hâlâ optimal bir köprü tasarımı keşfedilmedi. Her türlü köprü ile etkileşim risk taşır:

- **Akıllı Sözleşme Riski —** programlamada bir hata riski kullanıcının varlıklarının kaybolmasına neden olabilir.
- **Teknoloji Riski —** Yazılım arızası, hatalı programlama, insan hatası, spam ve art niyetli saldırılar kullanıcı işlemlerini aksatabilir

Ayrıca, güvenilir köprüler güven varsayımları eklediğinden, aşağıdaki gibi ek riskler taşır:

- **Sansür Riski -** köprü operatörleri teorik olarak kullanıcıların varlıklarını aktarmasını ve köprüyü kullanmalarını durdurabilir
- **Emanet Riski -** köprü operatörleri kullanıcıların varlıklarını çalmak için anlaşabilir

Kullanıcının varlıkları:

- akıllı sözleşmede hata varsa
- kullanıcı hata yaparsa
- altında yatak blockchain hacklenirse
- köprü operatörlerinin güvenilir bir köprüde kötü niyetli olması
- köprü hacklenirse risk altındadır

[Yakın zamanda Solana'nın Wormhole köprüsüne yapılan bir saldırıda 120 bin wETH (325 Milyon Dolar) çalındı.](https://rekt.news/wormhole-rekt/). [En büyük blok zincir hacklerinin](https://rekt.news/leaderboard/) çoğunda köprüler kullanıldı.

Köprüler, Ethereum L2'lere kullanıcıları alımda ve hatta diğer ekosistemleri keşfetmek isteyen kullanıcılar için çok önemlidir. Ancak köprüler ile etkileşimde olabilecek riskler göz önüne alındığında, kullanıcılar köprülerin ödünleşmelerini anlamalıdır. Bunlar [zincirler arası güvenlik için bazı stratejilerdir](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Daha fazla okuma {#further-reading}

- [EIP-5164: Zincirler Arası Yürütme](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _18 Haziran 2022 - Brendan Asselstine_
- [L2Bridge Risk Çerçevesi](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _5 Temmuz 2022 - Bartek Kiepuszewski_
- ["Neden gelecek zincirlerarası değil de çoklu zincir olacak."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _8 Ocak 2022 - Vitalik Buterin_
- [Blok Zincir Köprüleri Nedir ve Bunları Nasıl Sınıflandırabiliriz?](https://blog.li.finance/what-are-blockchain-bridges-and-how-can-we-classify-them-560dc6ec05fa) _18 Şubat 2021 - Arjun Chand_
- [Zincirler Arası Köprüler Nelerdir?](https://www.alchemy.com/overviews/cross-chain-bridges) _10 Mayıs 2022 - Alchemy_
- [Blok Zincir Köprüleri: Kripto Ağların İnşası](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) _8 Eylül 2021 - Dmitriy Berenzon_
- [Kripto Alanındaki Köprüler](https://medium.com/chainsafe-systems/bridges-in-crypto-space-12e158f5fd1e) _23 Ağustos 2021 - Ben Adar Hyman_
- [İş Birliği Üçlü Çelişkisi](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17) _1 Ekim 2021 - Arjun Bhuptani_
- [Köprüyü Güvence Altına Alın: Zincirler Arası İletişim Doğru Yapıldı](https://medium.com/dragonfly-research/secure-the-bridge-cross-chain-communication-done-right-part-i-993f76ffed5d) _23 Ağustos 2021 - Celia Wan_
