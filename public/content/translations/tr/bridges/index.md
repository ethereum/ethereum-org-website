---
title: Blokzincir köprüleri
metaTitle: Blokzincir köprülerine giriş
description: Köprüler, kullanıcıların fonlarını farklı blokzincirler arasında taşımasına olanak tanır
lang: tr
---

_Web3, her biri benzersiz yetenekler ve ödünleşimlerle tasarlanmış katman 1 (L1) blokzincirleri ve katman 2 (L2) ölçeklendirme çözümlerinden oluşan bir ekosisteme dönüştü. Blokzincir protokollerinin sayısı arttıkça, varlıkları zincirler arasında taşıma talebi de artıyor. Bu talebi karşılamak için köprülere ihtiyacımız var._

<Divider />

## Köprüler nedir? {#what-are-bridges}

Blokzincir köprüleri tıpkı fiziksel dünyada bildiğimiz köprüler gibi çalışır. Fiziksel bir köprünün iki fiziksel konumu birbirine bağlaması gibi, bir blokzincir köprüsü de iki blokzincir ekosistemini birbirine bağlar. **Köprüler, bilgi ve varlık transferi yoluyla blokzincirler arasındaki iletişimi kolaylaştırır**.

Bir örnek düşünelim:

ABD'densiniz ve Avrupa'ya bir seyahat planlıyorsunuz. Elinizde USD var, ancak harcamak için EUR'ya ihtiyacınız var. USD'nizi EUR ile değiştirmek için küçük bir ücret karşılığında bir döviz bürosu kullanabilirsiniz.

Peki, farklı bir [blokzincir](/glossary/#blockchain) kullanmak için benzer bir değişim yapmak isterseniz ne yaparsınız? Diyelim ki [Ethereum](/) Ana Ağı üzerindeki [ETH](/glossary/#ether)'yi [Arbitrum](https://arbitrum.io/) üzerindeki ETH ile değiştirmek istiyorsunuz. EUR için yaptığımız döviz değişimi gibi, ETH'mizi Ethereum'dan Arbitrum'a taşımak için bir mekanizmaya ihtiyacımız var. Köprüler böyle bir işlemi mümkün kılar. Bu durumda, [Arbitrum'un Ana Ağ'dan Arbitrum'a ETH transfer edebilen yerel bir köprüsü vardır](https://portal.arbitrum.io/bridge).

## Neden köprülere ihtiyacımız var? {#why-do-we-need-bridges}

Tüm blokzincirlerin kendi sınırlamaları vardır. Ethereum'un ölçeklenmesi ve talebe ayak uydurabilmesi için [toplamalar](/glossary/#rollups) gerekmiştir. Alternatif olarak, Solana ve Avalanche gibi L1'ler, merkeziyetsizlik pahasına daha yüksek işlem kapasitesi sağlamak için farklı şekilde tasarlanmıştır.

Ancak, tüm blokzincirler izole ortamlarda geliştirilir ve farklı kurallara ve [mutabakat](/glossary/#consensus) mekanizmalarına sahiptir. Bu, yerel olarak iletişim kuramayacakları ve Token'ların blokzincirler arasında serbestçe hareket edemeyeceği anlamına gelir.

Köprüler, blokzincirleri birbirine bağlamak ve aralarında bilgi ve Token transferine izin vermek için vardır.

**Köprüler şunları sağlar**:

- varlıkların ve bilgilerin zincirler arası transferi.
- [merkeziyetsiz uygulamaların (dapp'ler)](/glossary/#dapp) çeşitli blokzincirlerin güçlü yönlerine erişmesi – böylece yeteneklerini geliştirmesi (protokoller artık inovasyon için daha fazla tasarım alanına sahip olduğundan).
- kullanıcıların yeni platformlara erişmesi ve farklı zincirlerin avantajlarından yararlanması.
- farklı blokzincir ekosistemlerinden geliştiricilerin iş birliği yapması ve kullanıcılar için yeni platformlar oluşturması.

[Token'lar katman 2'ye (L2) nasıl köprülenir](/guides/how-to-use-a-bridge/)

<Divider />

## Köprü kullanım durumları {#bridge-use-cases}

Aşağıdakiler, bir köprü kullanabileceğiniz bazı senaryolardır:

### Daha düşük işlem ücretleri {#transaction-fees}

Diyelim ki Ethereum Ana Ağı'nda ETH'niz var ancak farklı merkeziyetsiz uygulamaları (dapp'leri) keşfetmek için daha ucuz işlem ücretleri istiyorsunuz. ETH'nizi Ana Ağ'dan bir Ethereum L2 Rollup'ına köprüleyerek daha düşük işlem ücretlerinden yararlanabilirsiniz.

### Diğer blokzincirlerdeki merkeziyetsiz uygulamalar (dapp'ler) {#dapps-other-chains}

USDT sağlamak için Ethereum Ana Ağı'nda Aave kullanıyorsanız, ancak Polygon üzerinde Aave kullanarak USDT sağlamak için alabileceğiniz faiz oranı daha yüksekse.

### Blokzincir ekosistemlerini keşfedin {#explore-ecosystems}

Ethereum Ana Ağı'nda ETH'niz varsa ve yerel dapp'lerini denemek için alternatif bir L1'i keşfetmek istiyorsanız. ETH'nizi Ethereum Ana Ağı'ndan alternatif L1'e transfer etmek için bir köprü kullanabilirsiniz.

### Yerel kripto varlıklarına sahip olun {#own-native}

Diyelim ki yerel Bitcoin'e (BTC) sahip olmak istiyorsunuz, ancak yalnızca Ethereum Ana Ağı'nda fonunuz var. Ethereum üzerinde BTC'ye maruz kalmak için Wrapped Bitcoin (WBTC) satın alabilirsiniz. Ancak WBTC, Ethereum ağına özgü bir [ERC-20](/glossary/#erc-20) Token'ıdır, yani Bitcoin blokzincirindeki orijinal varlık değil, Bitcoin'in bir Ethereum versiyonudur. Yerel BTC'ye sahip olmak için, bir köprü kullanarak varlıklarınızı Ethereum'dan Bitcoin'e köprülemeniz gerekir. Bu, WBTC'nizi köprüleyecek ve onu yerel BTC'ye dönüştürecektir. Alternatif olarak, BTC'niz olabilir ve bunu Ethereum [merkeziyetsiz finans (DeFi)](/glossary/#defi) protokollerinde kullanmak isteyebilirsiniz. Bu, diğer yönde, BTC'den Ethereum'da bir varlık olarak kullanılabilecek WBTC'ye köprüleme yapmayı gerektirir.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Yukarıdakilerin tümünü bir [merkezi borsa](/get-eth) kullanarak da yapabilirsiniz. Ancak, fonlarınız zaten bir borsada değilse, bu birden fazla adımı içerecektir ve muhtemelen bir köprü kullanmanız sizin için daha iyi olacaktır.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Köprü türleri {#types-of-bridge}

Köprülerin birçok tasarım türü ve inceliği vardır. Genel olarak köprüler iki kategoriye ayrılır: güvene dayalı ve güven gerektirmeyen köprüler.

| Güvene Dayalı Köprüler                                                                                                                                         | Güven Gerektirmeyen Köprüler                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Güvene dayalı köprüler, operasyonları için merkezi bir varlığa veya sisteme güvenir.                                                                            | Güven gerektirmeyen köprüler, akıllı sözleşmeler ve algoritmalar kullanarak çalışır.                                        |
| Fonların saklanması ve köprünün güvenliği ile ilgili güven varsayımları vardır. Kullanıcılar çoğunlukla köprü operatörünün itibarına güvenir. | Güven gerektirmezler, yani köprünün güvenliği, temel blokzincirinkiyle aynıdır. |
| Kullanıcıların kripto varlıklarının kontrolünden vazgeçmeleri gerekir.                                                                                                   | [Akıllı sözleşmeler](/glossary/#smart-contract) aracılığıyla, güven gerektirmeyen köprüler kullanıcıların fonlarının kontrolünü ellerinde tutmalarını sağlar.           |

Özetle, güvene dayalı köprülerin güven varsayımları olduğunu, güven gerektirmeyen köprülerin ise güveni minimize edilmiş olduğunu ve temel alanların ötesinde yeni güven varsayımları oluşturmadığını söyleyebiliriz. Bu terimler şu şekilde açıklanabilir:

- **Güven gerektirmeyen**: temel alanlarla eşdeğer güvenliğe sahip olma. [Arjun Bhuptani'nin bu makalede](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17) açıkladığı gibi.
- **Güven varsayımları:** sisteme harici doğrulayıcılar ekleyerek temel alanların güvenliğinden uzaklaşmak ve böylece onu kripto-ekonomik olarak daha az güvenli hale getirmek.

İki yaklaşım arasındaki temel farkları daha iyi anlamak için bir örnek verelim:

Havalimanı güvenlik kontrol noktasında olduğunuzu hayal edin. İki tür kontrol noktası vardır:

1. Manuel Kontrol Noktaları — biniş kartını teslim etmeden önce biletinizin ve kimliğinizin tüm ayrıntılarını manuel olarak kontrol eden görevliler tarafından işletilir.
2. Kendi Kendine Check-In — uçuş bilgilerinizi girdiğiniz ve her şey yolundaysa biniş kartınızı aldığınız bir makine tarafından işletilir.

Manuel bir kontrol noktası, operasyonları için üçüncü bir tarafa, yani görevlilere bağlı olduğu için güvene dayalı bir modele benzer. Bir kullanıcı olarak, görevlilerin doğru kararları vereceğine ve özel bilgilerinizi doğru kullanacağına güvenirsiniz.

Kendi kendine check-in, operatörün rolünü ortadan kaldırdığı ve operasyonları için teknolojiyi kullandığı için güven gerektirmeyen bir modele benzer. Kullanıcılar her zaman verilerinin kontrolünü ellerinde tutarlar ve özel bilgileri konusunda üçüncü bir tarafa güvenmek zorunda kalmazlar.

Birçok köprüleme çözümü, değişen derecelerde güven gereksinimsizliği ile bu iki uç nokta arasındaki modelleri benimser.

<Divider />

## Köprüleri kullanın {#use-bridge}

Köprüleri kullanmak, varlıklarınızı farklı blokzincirler arasında taşımanıza olanak tanır. İşte köprüleri bulmanıza ve kullanmanıza yardımcı olabilecek bazı kaynaklar:

- **[L2BEAT Köprüler Özeti](https://l2beat.com/bridges/summary) ve [L2BEAT Köprüler Risk Analizi](https://l2beat.com/bridges/summary)**: Pazar payı, köprü türü ve hedef zincirler hakkındaki ayrıntılar dahil olmak üzere çeşitli köprülerin kapsamlı bir özeti. L2BEAT ayrıca köprüler için bir risk analizine sahiptir ve kullanıcıların bir köprü seçerken bilinçli kararlar almasına yardımcı olur.
- **[DefiLlama Köprü Özeti](https://defillama.com/bridges/Ethereum)**: Ethereum ağlarındaki köprü hacimlerinin bir özeti.

<Divider />

## Köprü kullanmanın riskleri {#bridge-risk}

Köprüler geliştirmenin erken aşamalarındadır. Optimum köprü tasarımının henüz keşfedilmemiş olması muhtemeldir. Herhangi bir köprü türüyle etkileşim kurmak risk taşır:

- **Akıllı Sözleşme Riski —** kodda kullanıcı fonlarının kaybolmasına neden olabilecek bir hata riski
- **Teknoloji Riski —** yazılım hatası, hatalı kod, insan hatası, spam ve kötü niyetli saldırılar kullanıcı işlemlerini muhtemelen kesintiye uğratabilir

Dahası, güvene dayalı köprüler güven varsayımları eklediğinden, aşağıdakiler gibi ek riskler taşırlar:

- **Sansür Riski —** köprü operatörleri teorik olarak kullanıcıların köprüyü kullanarak varlıklarını transfer etmelerini durdurabilir
- **Saklama Riski —** köprü operatörleri kullanıcıların fonlarını çalmak için gizli anlaşma yapabilir

Aşağıdaki durumlarda kullanıcının fonları risk altındadır:

- akıllı sözleşmede bir hata varsa
- kullanıcı bir hata yaparsa
- temel blokzincir hacklenirse
- güvene dayalı bir köprüde köprü operatörlerinin kötü niyeti varsa
- köprü hacklenirse

Yakın zamandaki bir hack olayı, [hack sırasında 120 bin wETH'nin (325 milyon USD) çalındığı](https://rekt.news/wormhole-rekt/) Solana'nın Wormhole köprüsüydü. [Blokzincirlerdeki en büyük hack olaylarının](https://rekt.news/leaderboard/) çoğu köprüleri içeriyordu.

Köprüler, kullanıcıların Ethereum L2'lerine sisteme katılımı ve hatta farklı ekosistemleri keşfetmek isteyen kullanıcılar için çok önemlidir. Ancak, köprülerle etkileşime girmenin içerdiği riskler göz önüne alındığında, kullanıcılar köprülerin yaptığı ödünleşimleri anlamalıdır. Bunlar [zincirler arası güvenlik için bazı stratejilerdir](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## İleri okuma {#further-reading}
- [EIP-5164: Zincirler Arası Yürütme](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 Haziran 2022 - Brendan Asselstine_
- [L2Bridge Risk Çerçevesi](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 Temmuz 2022 - Bartek Kiepuszewski_
- ["Gelecek neden çok zincirli olacak, ancak zincirler arası olmayacak."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 Ocak 2022 - Vitalik Buterin_
- [Güvenli Zincirler Arası Birlikte Çalışabilirlik İçin Paylaşılan Güvenlikten Yararlanma: Lagrange Durum Komiteleri ve Ötesi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 Haziran 2024 - Emmanuel Awosika_
- [Rollup Birlikte Çalışabilirlik Çözümlerinin Durumu](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 Haziran 2024 - Alex Hook_