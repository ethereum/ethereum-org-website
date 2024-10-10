---
title: Blokzincir köprülerine giriş
description: Köprüler, kullanıcıların varlıklarını farklı blok zincirler üstünde taşımalarını sağlar
lang: tr
---

# Blokzincir köprüleri {#prerequisites}

_Web3 L1 blok zincirler ve L2 ölçeklendirme çözümlerinin her birinin benzersiz yetenek ve ödünlestirmelerle tasarlandığı bir ekosisteme evrilmiştir. Blokzincir protokollerinin sayısı arttıkça zincirler arasında varlık aktarma talebi de artar. Bu talebi karşılamak için köprülere ihtiyacımız var._

<Divider />

## Köprüler nedir? {#what-are-bridges}

Blok zincir köprüleri bildiğimiz fiziksel dünyadaki köprüler gibi çalışır. Fiziksel bir köprü nasıl iki ayrı fiziksel konumu bağlıyorsa, bir blok zincir köprüsü de iki blok zincir ekosistemini birbirine bağlar. **Köprüler, bilgi ve varlık transferi yaparak blokzincirler arasında iletişimi kolaylaştırır**.

Bir örneği ele alalım:

Siz Amerika'dasınız ve Avrupa'ya bir yolculuk planlıyorsunuz. Amerikan dolarınız var, ancak harcamak için avroya ihtiyaç duyuyorsunuz. Amerikan dolarınızı avroya çevirmek için küçük bir ücret karşılığında döviz değişimi işinize yarar.

Ancak, farklı bir [blokzincir](/glossary/#blockchain)i kullanmak için benzer bir değiş tokuş yapmak isterseniz ne yaparsınız? Diyelim ki [Arbitrum](https://arbitrum.io/)'da ETH kullanmak üzere Ethereum Ana Ağındaki [ETH](/glossary/#ether)'yi takas etmek istiyorsunuz. EUR için yaptığımız döviz değişimi gibi, ETH'mizi Ethereum'dan Arbitrum'a taşımak için bir mekanizmaya ihtiyacımız var. Köprüler bunun gibi bir işlemi mümkün kılar. Bu durumda Arbitrum, ETH'yi Ana Ağdan Arbitrum'a aktarabilecek [yerel bir köprüye](https://bridge.arbitrum.io/) sahiptir.

## Neden köprülere ihtiyacımız var? {#why-do-we-need-bridges}

Bütün blok zincirlerin kendi sınırları vardır. Ethereum'un ölçeklendirme yapabilmesi ve talebe ayak uydurabilmesi için [toplamalara](/glossary/#rollups) ihtiyaç duyulmuştur. Alternatif olarak, Solana ve Avalanche gibi L1'ler daha yüksek iş hacmi için merkeziyetsizleşme maliyeti karşılığında farklı şekilde tasarlanmışlardır.

Buna karşın tüm blokzincirler izole edilmiş çevrelerde geliştirilir, farklı kuralları ve [mutabakat](/glossary/#consensus) mekanizmaları vardır. Bu onların yerel olarak iletişim kuramayacakları ve token'ların rahatlıkla blok zincirler arasında hareket edemeyecekleri anlamına gelir.

Köprüler blok zincirleri birbirine bağlamak, aralarında bilgi ve token'ların iletimini sağlamak için vardır.

**Köprüler şunlara olanak sağlar**:

- bilgi ve varlıkların zincirler arası transferi.
- [Merkeziyetsiz uygulamalar](/glossary/#dapp), çeşitli blokzincirlerin güçlü yanlarına erişebilir ve böylece kapasitelerini geliştirebilir (protokoller artık yenilik için daha fazla tasarım alanına sahip olduğu için).
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

Diyelim ki yerel zincirde Bitcoin'e (BTC) sahip olmak istiyorsunuz ama sadece Ethereum Ana Ağı'nda varlıklarınız var. Ethereum'da BTC sahibi olmak için Wrapped Bitcoin (WBTC) satın alabilirsiniz. Ancak WBTC bir Ethereum ağına özgü bir [ERC-20](/glossary/#erc-20) jetonudur. Bu da Bitcoin blokzincirindeki orijinal varlık değil, Bitcoin'in Ethereum versiyonu olduğu anlamına gelir. Yerel BTC'ye sahip olmak için varlıklarınızı Ethereum'dan Bitcoin'e bir köprü aracılığı ile aktarmanız gerekir. Bu WBTC'nizi köprüleyecek ve yerel BTC'ye dönüştürecektir. Alternatif olarak, BTC'ye sahip olabilir ve onu Ethereum [DeFi](/glossary/#defi) protokollerinde kullanmak isteyebilirsiniz. Bu da tersi yönünde, BTC'yi WBTC'ye köprülemeyi gerektirir. Bu şekide Ethereum'da bir varlık olarak kullanılabilir.

<InfoBanner shouldCenter emoji=":bulb:">
  Ayrıca yukarıdaki her şeyi bir <a href="/get-eth/">merkezi borsa</a> aracılığıyla da yapabilirsiniz. Ancak varlıklarınız hali hazırda borsada değilse, birden çok adım gerektirecektir ve köprü kullanmanız daha iyi olacaktır.
</InfoBanner>

<Divider />

## Köprü Türleri {#types-of-bridge}

Köprülerin çeşitli tasarım türü ve karmaşıklıkları vardır. Genel olarak köprüler iki kategoriye ayrılır: güvenilir ve güvenilir olmayan köprüler.

| Güvenilir Köprüler                                                                                                                                 | Güvenilir Olmayan Köprüler                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Güvenilir köprüler, operasyonları için merkezi bir varlığa veya sisteme bağlıdır.                                                                  | Güvenilir olmayan köprüler akıllı sözleşmeler ve algoritmalar kullanarak çalışır.                                                                                    |
| Fonların muhafazası ve köprünün güvenliğine ilişkin güven varsayımları vardır. Kullanıcılar çoğunlukla köprü operatörünün itibarına güvenmektedir. | Güvenilir değildirler, yani köprünün güvenliği altta yatan blok zincirin güvenliği ile aynıdır.                                                                      |
| Kullanıcıların kripto varlıklarının kontrolünü bırakmaları gerekir.                                                                                | Güvene dayalı olmayan köprüler, [akıllı sözleşmeler](/glossary/#smart-contract) aracılığıyla kullanıcıların kendi fonlarının kontrolüne sahip olmasına olanak tanır. |

Kısaca, güvenilir köprüler güven varsayımlarına sahipken, güvenilir olmayan köprüler güven minimize edilmiştir ve temel etki alanlarının ötesinde yeni güven varsayımları yapmazlar. Bu terimler şu şekilde tanımlanabilir:

- **Güvenilir Olmayan**: Temel etki alanlarına eş değer güvenliğe sahip olması. [Arjun Bhuptani tarafından bu makalede](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17) açıklandığı gibi.
- **Güven varsayımları:** Sisteme harici doğrulayıcılar ekleyerek temel etki alanlarının güvenliğinden uzaklaşmak, böylece onu kripto-ekonomik olarak daha az güvenli hale getirmek.

İki yaklaşım arasındaki temel farkları daha iyi anlamak için bir örnek verelim:

Havaalanı güvenlik kontrol noktasında olduğunuzu düşünün. İki tür kontrol noktası vardır:

1. Manuel Kontrol Noktaları - biniş kartınızı vermeden önce biletinizin ve kimliğinizin tüm ayrıntılarını manuel olarak inceleyen görevliler tarafından işletilir.
2. Self Check-In - uçuş bilgilerinizi girdiğiniz ve her şey tamamsa biniş kartınızı aldığınız bir makine tarafından işletilir.

Manuel kontrol noktası, işlemleri için üçüncü bir tarafa yani yetkililere bağlı olduğundan güvenilir bir modele benzerlik gösterir. Yetkililerin doğru kararlar alacağına ve özel bilgilerinizi doğru şekilde kullanacağına güveniyorsunuz.

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
