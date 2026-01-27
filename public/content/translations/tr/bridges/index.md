---
title: "Blokzincir köprülerine giriş"
description: "Köprüler, kullanıcıların varlıklarını farklı blok zincirler üstünde taşımalarını sağlar"
lang: tr
---

# Blokzincir köprüleri {#prerequisites}

_Web3 L1 blok zincirler ve L2 ölçeklendirme çözümlerinin her birinin benzersiz yetenek ve ödünlestirmelerle tasarlandığı bir ekosisteme evrilmiştir. Blokzincir protokollerinin sayısı arttıkça zincirler arasında varlık aktarma talebi de artar.Bu talebi karşılamak için köprülere ihtiyacımız var._

<Divider />

## Köprüler nedir? {#what-are-bridges}

Blok zincir köprüleri bildiğimiz fiziksel dünyadaki köprüler gibi çalışır. Fiziksel bir köprü nasıl iki ayrı fiziksel konumu bağlıyorsa, bir blok zincir köprüsü de iki blok zincir ekosistemini birbirine bağlar. **Köprüler, bilgi ve varlık transferi yaparak blokzincirler arasında iletişimi kolaylaştırır**.

Bir örneği ele alalım:

Siz Amerika'dasınız ve Avrupa'ya bir yolculuk planlıyorsunuz. Amerikan dolarınız var, ancak harcamak için avroya ihtiyaç duyuyorsunuz. Amerikan dolarınızı avroya çevirmek için küçük bir ücret karşılığında döviz değişimi işinize yarar.

Ancak, farklı bir [blokzincir](/glossary/#blockchain) kullanmak üzere benzer bir takas yapmak isterseniz ne yaparsınız? Diyelim ki Ethereum Ana Ağı'ndaki [ETH](/glossary/#ether) ile [Arbitrum](https://arbitrum.io/) üzerindeki ETH'yi takas etmek istiyorsunuz. EUR için yaptığımız döviz değişimi gibi, ETH'mizi Ethereum'dan Arbitrum'a taşımak için bir mekanizmaya ihtiyacımız var. Köprüler bunun gibi bir işlemi mümkün kılar. Bu durumda, [Arbitrum, Ana Ağ'dan Arbitrum'a ETH aktarabilen yerel bir köprüye sahiptir](https://portal.arbitrum.io/bridge).

## Neden köprülere ihtiyacımız var? {#why-do-we-need-bridges}

Bütün blok zincirlerin kendi sınırları vardır. Ethereum'un ölçeklenmesi ve talebe ayak uydurabilmesi için [toplamalara](/glossary/#rollups) ihtiyaç duyulmuştur. Alternatif olarak, Solana ve Avalanche gibi L1'ler daha yüksek iş hacmi için merkeziyetsizleşme maliyeti karşılığında farklı şekilde tasarlanmışlardır.

Ancak tüm blokzincirler yalıtılmış ortamlarda geliştirilir ve farklı kurallara ve [mutabakat](/glossary/#consensus) mekanizmalarına sahiptir. Bu onların yerel olarak iletişim kuramayacakları ve token'ların rahatlıkla blok zincirler arasında hareket edemeyecekleri anlamına gelir.

Köprüler blok zincirleri birbirine bağlamak, aralarında bilgi ve token'ların iletimini sağlamak için vardır.

**Köprüler şunlara olanak sağlar**:

- bilgi ve varlıkların zincirler arası transferi.
- [merkeziyetsiz uygulamaların](/glossary/#dapp) çeşitli blokzincirlerin güçlü yönlerine erişerek yeteneklerini geliştirmesi (protokoller artık inovasyon için daha fazla tasarım alanına sahip olduğundan).
- kullanıcıların yeni platformlara erişmelerini ve farklı zincirlerin faydalarını kullanmalarını.
- farklı blok zincir ekosistemlerinden geliştiricilerin iş birliği yapmasını ve kullanıcılar için yeni platformlar inşa etmelerini sağlar.

[Jetonlar katman 2'ye nasıl köprülenir?](/guides/how-to-use-a-bridge/)

<Divider />

## Köprü kullanım senaryoları {#bridge-use-cases}

Aşağıda bir köprüyü nerede kullanabileceğinizle ilgili bazı senaryolar verilmiştir:

### Daha düşük işlem ücretleri {#transaction-fees}

Diyelim ki Ethereum Ana Ağı'nda ETH'niz var ama farklı merkeziyetsiz uygulamalar için daha ucuz işlem ücreti istiyorsunuz. Ana Ağdaki ETH'nizi Ethereum L2 toplamasına köprüleyerek daha düşük işlem ücretinin tadını çıkarabilirsiniz.

### Diğer blokzincirlerdeki merkeziyetsiz uygulamalar {#dapps-other-chains}

Ethereum Ana Ağı'nda USDT sağlamak için Aave kullanıyorsanız ancak Polygon'da Aave kullanarak USDT sağladığınızda alabileceğiniz faiz oranı daha yüksekse.

### Blokzincir ekosistemlerini keşfedin {#explore-ecosystems}

Ethereum Ana Ağı'nda ETH'niz varsa ve diğer bir L1'i keşfedip yerel merkeziyetsiz uygulamalarını denemek istiyorsanız. Ethereum Ana Ağı'ndaki ETH'inizi diğer L1'e iletmek için bir köprü kullanabilirsiniz.

### Yerel kripto varlıklarına sahip olmak {#own-native}

Diyelim ki yerel zincirde Bitcoin'e (BTC) sahip olmak istiyorsunuz ama sadece Ethereum Ana Ağı'nda varlıklarınız var. Ethereum'da BTC sahibi olmak için Wrapped Bitcoin (WBTC) satın alabilirsiniz. Ancak WBTC, Ethereum ağına özgü bir [ERC-20](/glossary/#erc-20) jetonudur; bu da onun Bitcoin blokzincirindeki orijinal varlık değil, Bitcoin'in bir Ethereum versiyonu olduğu anlamına gelir. Yerel BTC'ye sahip olmak için varlıklarınızı Ethereum'dan Bitcoin'e bir köprü aracılığı ile aktarmanız gerekir. Bu WBTC'nizi köprüleyecek ve yerel BTC'ye dönüştürecektir. Alternatif olarak, BTC sahibi olabilir ve onu Ethereum [DeFi](/glossary/#defi) protokollerinde kullanmak isteyebilirsiniz. Bu da tersi yönünde, BTC'yi WBTC'ye köprülemeyi gerektirir. Bu şekide Ethereum'da bir varlık olarak kullanılabilir.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Yukarıdakilerin tümünü bir [merkezi borsa](/get-eth) kullanarak da yapabilirsiniz. Ancak varlıklarınız hali hazırda borsada değilse, birden çok adım gerektirecektir ve köprü kullanmanız daha iyi olacaktır.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Köprü türleri {#types-of-bridge}

Köprülerin çeşitli tasarım türü ve karmaşıklıkları vardır. Genel olarak köprüler iki kategoriye ayrılır: güvenilir ve güvenilir olmayan köprüler.

| Güvenilir Köprüler                                                                                                                                                                 | Güvenilir Olmayan Köprüler                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Güvenilir köprüler, operasyonları için merkezi bir varlığa veya sisteme bağlıdır.                                                                                  | Güvenilir olmayan köprüler akıllı sözleşmeler ve algoritmalar kullanarak çalışır.                                                                         |
| Fonların muhafazası ve köprünün güvenliğine ilişkin güven varsayımları vardır. Kullanıcılar çoğunlukla köprü operatörünün itibarına güvenmektedir. | Güvenilir değildirler, yani köprünün güvenliği altta yatan blok zincirin güvenliği ile aynıdır.                                                           |
| Kullanıcıların kripto varlıklarının kontrolünü bırakmaları gerekir.                                                                                                | [Akıllı sözleşmeler](/glossary/#smart-contract) aracılığıyla, güven gerektirmeyen köprüler, kullanıcıların fonlarının kontrolünü elinde tutmasını sağlar. |

Kısaca, güvenilir köprüler güven varsayımlarına sahipken, güvenilir olmayan köprüler güven minimize edilmiştir ve temel etki alanlarının ötesinde yeni güven varsayımları yapmazlar. Bu terimler şu şekilde tanımlanabilir:

- **Güven Gerektirmeyen**: Dayanak alınan alanlarla eş değer güvenliğe sahip olmak. [Arjun Bhuptani'nin bu makalede](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17) açıkladığı gibi.
- **Güven varsayımları:** Sisteme harici doğrulayıcılar ekleyerek temel alanların güvenliğinden uzaklaşmak ve böylece sistemi kripto-ekonomik olarak daha az güvenli hale getirmek.

İki yaklaşım arasındaki temel farkları daha iyi anlamak için bir örnek verelim:

Havaalanı güvenlik kontrol noktasında olduğunuzu düşünün. İki tür kontrol noktası vardır:

1. Manuel Kontrol Noktaları - biniş kartınızı vermeden önce biletinizin ve kimliğinizin tüm ayrıntılarını manuel olarak inceleyen görevliler tarafından işletilir.
2. Self Check-In - uçuş bilgilerinizi girdiğiniz ve her şey tamamsa biniş kartınızı aldığınız bir makine tarafından işletilir.

Manuel kontrol noktası, işlemleri için üçüncü bir tarafa yani yetkililere bağlı olduğundan güvenilir bir modele benzerlik gösterir. Yetkililerin doğru kararlar alacağına ve özel bilgilerinizi doğru şekilde kullanacağına güveniyorsunuz.

Self check-in, operatörün rolünü ortadan kaldırdığı ve teknolojiyi kullandığı için güvenli olmayan bir modele benzer. Kullanıcılar verilerinin kontrolünü her zaman ellerinde tutarlar ve özel bilgileri konusunda üçüncü bir tarafa güvenmek zorunda kalmazlar.

Pek çok köprüleme çözümü, bu iki uç arasında değişen derecelerde güvensizlik içeren modeller benimsemektedir.

<Divider />

## Köprüleri kullanma {#use-bridge}

Köprü kullanmak, varlıklarınızı farklı blokzincirler arası hareket ettirmenizi sağlar. İşte köprüleri bulmanıza ve kullanmanıza yardımcı olacak birkaç kaynak:

- **[L2BEAT Köprüler Özeti](https://l2beat.com/bridges/summary) ve [L2BEAT Köprüler Risk Analizi](https://l2beat.com/bridges/summary)**: Pazar payı, köprü türü ve hedef zincirler hakkındaki ayrıntılar da dâhil olmak üzere çeşitli köprülerin kapsamlı bir özeti. Ayrıca L2BEAT köprüler için bir risk analizine sahiptir, bir köprü seçerken bilgilendirilmiş kararlar vermelerinde kullanıcılara yardımcı olur.
- **[DefiLlama Köprü Özeti](https://defillama.com/bridges/Ethereum)**: Ethereum ağlarındaki köprü hacimlerinin bir özeti.

<Divider />

## Köprü kullanmanın riskleri {#bridge-risk}

Köprüler geliştirmenin ilk aşamalarındalar. Büyük olasılıkla hâlâ optimal bir köprü tasarımı keşfedilmedi. Her türlü köprü ile etkileşim risk taşır:

- **Akıllı Sözleşme Riski —** koddaki bir hatanın kullanıcı fonlarının kaybolmasına neden olma riski
- **Teknoloji Riski —** yazılım hatası, hatalı kod, insan hatası, spam ve kötü niyetli saldırılar kullanıcı işlemlerini kesintiye uğratabilir

Ayrıca, güvenilir köprüler güven varsayımları eklediğinden, aşağıdaki gibi ek riskler taşır:

- **Sansür Riski —** köprü operatörleri, teorik olarak kullanıcıların köprüyü kullanarak varlıklarını aktarmalarını durdurabilir
- **Emanet Riski —** köprü operatörleri, kullanıcıların fonlarını çalmak için gizlice anlaşabilir

Kullanıcının varlıkları:

- akıllı sözleşmede hata varsa
- kullanıcı hata yaparsa
- altında yatak blockchain hacklenirse
- köprü operatörlerinin güvenilir bir köprüde kötü niyetli olması
- köprü hacklenirse risk altındadır

Yakın zamandaki bir saldırı, Solana'nın Wormhole köprüsüne yönelikti; [bu saldırı sırasında 120 bin wETH (325 milyon ABD doları) çalındı](https://rekt.news/wormhole-rekt/). [Blokzincirlerdeki en büyük saldırıların birçoğunda köprüler yer alıyordu](https://rekt.news/leaderboard/).

Köprüler, Ethereum L2'lere kullanıcıları alımda ve hatta diğer ekosistemleri keşfetmek isteyen kullanıcılar için çok önemlidir. Ancak köprüler ile etkileşimde olabilecek riskler göz önüne alındığında, kullanıcılar köprülerin ödünleşmelerini anlamalıdır. Bunlar, [zincirler arası güvenlik için bazı stratejilerdir](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Daha fazla kaynak {#further-reading}

- [EIP-5164: Zincirler Arası Yürütme](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 Haziran 2022 - Brendan Asselstine_
- [K2 Köprü Risk Çerçevesi](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 Temmuz 2022 - Bartek Kiepuszewski_
- ["Gelecek neden çok zincirli olacak ama zincirler arası olmayacak."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 Ocak 2022 - Vitalik Buterin_
- [Güvenli Zincirler Arası Birlikte Çalışabilirlik için Paylaşılan Güvenlikten Yararlanma: Lagrange Durum Komiteleri ve Ötesi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 Haziran 2024 - Emmanuel Awosika_
- [Toplama Birlikte Çalışabilirlik Çözümlerinin Durumu](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 Haziran 2024 - Alex Hook_

