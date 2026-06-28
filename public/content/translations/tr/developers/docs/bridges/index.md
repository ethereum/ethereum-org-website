---
title: "Köprüler"
description: "Geliştiriciler için köprülemeye genel bir bakış"
lang: tr
---

Katman 1 (L1) blokzincirlerinin ve katman 2 (L2) [ölçeklendirme](/developers/docs/scaling/) çözümlerinin çoğalmasıyla ve zincirler arası çalışan merkeziyetsiz uygulamaların (dapp) sayısının giderek artmasıyla birlikte, zincirler arası iletişim ve varlık hareketi ihtiyacı ağ altyapısının temel bir parçası hâline gelmiştir. Bunu mümkün kılmaya yardımcı olmak için farklı köprü türleri mevcuttur.

## Köprülere duyulan ihtiyaç {#need-for-bridges}

Köprüler, blokzincir ağlarını birbirine bağlamak için vardır. Blokzincirler arasında bağlantı ve birlikte çalışabilirlik sağlarlar.

Blokzincirler yalıtılmış ortamlarda var olurlar, yani blokzincirlerin diğer blokzincirlerle doğal olarak ticaret yapmasının ve iletişim kurmasının bir yolu yoktur. Sonuç olarak, bir ekosistem içinde önemli bir faaliyet ve inovasyon olabilse de, diğer ekosistemlerle bağlantı ve birlikte çalışabilirlik eksikliği nedeniyle bu durum sınırlıdır.

Köprüler, izole edilmiş blokzincir ortamlarının birbirleriyle bağlantı kurması için bir yol sunar. Blokzincirler arasında token'ların, mesajların, rastgele verilerin ve hatta [akıllı sözleşme](/developers/docs/smart-contracts/) çağrılarının bir zincirden diğerine transfer edilebileceği bir taşıma rotası oluştururlar.

## Köprülerin faydaları {#benefits-of-bridges}

Basitçe ifade etmek gerekirse köprüler, blokzincir ağlarının kendi aralarında veri alışverişi yapmasına ve varlıkları taşımasına olanak tanıyarak çok sayıda kullanım durumunun kilidini açar.

Blokzincirlerin kendilerine özgü güçlü yönleri, zayıf yönleri ve uygulama geliştirmeye yönelik yaklaşımları (hız, işlem kapasitesi, maliyet vb.) vardır. Köprüler, blokzincirlerin birbirlerinin inovasyonlarından yararlanmasını sağlayarak genel kripto ekosisteminin gelişimine yardımcı olur.

Geliştiriciler için köprüler şunları sağlar:

- her türlü veri, bilgi ve varlığın zincirler arası transferi.
- köprüler protokollerin sunabilecekleri tasarım alanını genişlettiği için protokoller adına yeni özelliklerin ve kullanım durumlarının kilidinin açılması. Örneğin, başlangıçta [Ethereum](/) Ana Ağı üzerinde dağıtılan bir getiri çiftçiliği protokolü, tüm EVM uyumlu zincirlerde likidite havuzları sunabilir.
- farklı blokzincirlerin güçlü yönlerinden yararlanma fırsatı. Örneğin geliştiriciler, dapp'lerini toplamalar ve yan zincirler üzerinde dağıtarak farklı L2 çözümlerinin sunduğu daha düşük ücretlerden yararlanabilir ve kullanıcılar bunlar arasında köprü kurabilir.
- yeni ürünler oluşturmak için çeşitli blokzincir ekosistemlerindeki geliştiriciler arasında iş birliği.
- çeşitli ekosistemlerden kullanıcıları ve toplulukları kendi dapp'lerine çekmek.

## Köprüler nasıl çalışır? {#how-do-bridges-work}

Birçok [köprü tasarımı türü](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/) olsa da, varlıkların zincirler arası transferini kolaylaştırmanın üç yolu öne çıkmaktadır:

- **Kilitle ve bas –** Kaynak zincirdeki varlıkları kilitleyin ve hedef zincirde varlıklar basın.
- **Yak ve bas –** Kaynak zincirdeki varlıkları yakın ve hedef zincirde varlıklar basın.
- **Atomik takaslar –** Kaynak zincirdeki varlıkları, başka bir tarafla hedef zincirdeki varlıklarla takas edin.

## Köprü türleri {#bridge-types}

Köprüler genellikle aşağıdaki kategorilerden birinde sınıflandırılabilir:

- **Yerel köprüler –** Bu köprüler genellikle belirli bir blokzincirde likiditeyi başlatmak için inşa edilir ve kullanıcıların ekosisteme fon taşımasını kolaylaştırır. Örneğin, [Arbitrum Bridge](https://bridge.arbitrum.io/), kullanıcıların Ethereum Ana Ağı'ndan Arbitrum'a köprü kurmasını kolaylaştırmak için inşa edilmiştir. Bu tür diğer köprüler arasında Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge) vb. bulunur.
- **Doğrulayıcı veya kâhin tabanlı köprüler –** Bu köprüler, zincirler arası transferleri doğrulamak için harici bir doğrulayıcı setine veya kâhinlere dayanır. Örnekler: Multichain ve Across.
- **Genelleştirilmiş mesaj iletme köprüleri –** Bu köprüler, mesajlar ve rastgele verilerle birlikte varlıkları zincirler arası transfer edebilir. Örnekler: Axelar, LayerZero ve Nomad.
- **Likidite ağları –** Bu köprüler öncelikle atomik takaslar yoluyla varlıkları bir zincirden diğerine transfer etmeye odaklanır. Genellikle zincirler arası mesaj iletimini desteklemezler. Örnekler: Connext ve Hop.

## Dikkate alınması gereken ödünleşimler {#trade-offs}

Köprülerde mükemmel çözümler yoktur. Aksine, yalnızca bir amacı yerine getirmek için yapılan ödünleşimler vardır. Geliştiriciler ve kullanıcılar köprüleri aşağıdaki faktörlere göre değerlendirebilir:

- **Güvenlik –** Sistemi kim doğruluyor? Harici doğrulayıcılar tarafından güvence altına alınan köprüler, genellikle blokzincirin doğrulayıcıları tarafından yerel veya doğal olarak güvence altına alınan köprülerden daha az güvenlidir.
- **Kolaylık –** Bir işlemi tamamlamak ne kadar sürer ve bir kullanıcının kaç işlemi imzalaması gerekir? Bir geliştirici için bir köprüyü entegre etmek ne kadar sürer ve süreç ne kadar karmaşıktır?
- **Bağlanabilirlik –** Bir köprünün bağlanabileceği farklı hedef zincirler (yani toplamalar, yan zincirler, diğer katman 1 blokzincirleri vb.) nelerdir ve yeni bir blokzinciri entegre etmek ne kadar zordur?
- **Daha karmaşık verileri iletme yeteneği –** Bir köprü, mesajların ve daha karmaşık rastgele verilerin zincirler arası transferini sağlayabilir mi, yoksa yalnızca zincirler arası varlık transferlerini mi destekler?
- **Maliyet etkinliği –** Bir köprü aracılığıyla varlıkları zincirler arası transfer etmenin maliyeti nedir? Genellikle köprüler, gaz maliyetlerine ve belirli rotaların likiditesine bağlı olarak sabit veya değişken bir ücret alır. Bir köprünün maliyet etkinliğini, güvenliğini sağlamak için gereken sermayeye göre değerlendirmek de kritik önem taşır.

Üst düzeyde köprüler, güvenilir ve güven gerektirmeyen olarak kategorize edilebilir.

- **Güvenilir –** Güvenilir köprüler harici olarak doğrulanır. Verileri zincirler arası göndermek için harici bir doğrulayıcı seti (Çoklu imzalı federasyonlar, çok partili hesaplama sistemleri, kâhin ağı) kullanırlar. Sonuç olarak, harika bir bağlanabilirlik sunabilir ve zincirler arası tamamen genelleştirilmiş mesaj iletimini sağlayabilirler. Ayrıca hız ve maliyet etkinliği açısından da iyi performans gösterme eğilimindedirler. Kullanıcılar köprünün güvenliğine güvenmek zorunda olduğundan, bu durum güvenlik pahasına gerçekleşir.
- **Güven gerektirmeyen –** Bu köprüler, mesajları ve token'ları transfer etmek için bağlandıkları blokzincirlere ve onların doğrulayıcılarına dayanır. (Blokzincirlere ek olarak) yeni güven varsayımları eklemedikleri için 'güven gerektirmeyen' olarak adlandırılırlar. Sonuç olarak, güven gerektirmeyen köprülerin güvenilir köprülerden daha güvenli olduğu kabul edilir.

Güven gerektirmeyen köprüleri diğer faktörlere göre değerlendirmek için, onları genelleştirilmiş mesaj iletme köprüleri ve likidite ağları olarak ayırmalıyız.

- **Genelleştirilmiş mesaj iletme köprüleri –** Bu köprüler, güvenlik ve daha karmaşık verileri zincirler arası transfer etme yeteneği ile öne çıkar. Genellikle maliyet etkinliği açısından da iyidirler. Ancak bu güçlü yönler genellikle hafif istemci köprüleri (örn: IBC) için bağlanabilirlik pahasına ve sahtekarlık kanıtları kullanan iyimser köprüler (örn: Nomad) için hız dezavantajları ile birlikte gelir.
- **Likidite ağları –** Bu köprüler varlıkları transfer etmek için atomik takaslar kullanır ve yerel olarak doğrulanan sistemlerdir (yani işlemleri doğrulamak için temel blokzincirlerin doğrulayıcılarını kullanırlar). Sonuç olarak, güvenlik ve hız konusunda mükemmeldirler. Dahası, nispeten uygun maliyetli kabul edilirler ve iyi bir bağlanabilirlik sunarlar. Ancak en büyük ödünleşimleri, zincirler arası mesaj iletimini desteklemedikleri için daha karmaşık verileri iletememeleridir.

## Köprülerle ilgili riskler {#risk-with-bridges}

Köprüler, [merkeziyetsiz finansta (DeFi) yaşanan en büyük üç hack olayının](https://rekt.news/leaderboard/) sorumlusudur ve hâlâ gelişimin erken aşamalarındadır. Herhangi bir köprüyü kullanmak aşağıdaki riskleri taşır:

- **Akıllı sözleşme riski –** Birçok köprü denetimlerden başarıyla geçmiş olsa da, varlıkların hack'lenmeye maruz kalması için akıllı sözleşmedeki tek bir kusur yeterlidir (örn: [Solana'nın Wormhole Köprüsü](https://rekt.news/wormhole-rekt/)).
- **Sistemik finansal riskler** – Birçok köprü, orijinal varlığın kurallı (canonical) sürümlerini yeni bir zincirde basmak için sarılmış (wrapped) varlıklar kullanır. Token'ların sarılmış sürümlerinin istismar edildiğini gördüğümüz için bu durum ekosistemi sistemik riske maruz bırakır.
- **Karşı taraf riski –** Bazı köprüler, kullanıcıların doğrulayıcıların kullanıcı fonlarını çalmak için gizli anlaşma yapmayacağı varsayımına güvenmelerini gerektiren güvenilir bir tasarım kullanır. Kullanıcıların bu üçüncü taraf aktörlere güvenme ihtiyacı, onları rug pull (halı çekme), sansür ve diğer kötü niyetli faaliyetler gibi risklere maruz bırakır.
- **Açık sorunlar –** Köprülerin henüz gelişim aşamasında olduğu göz önüne alındığında, ağ tıkanıklığı zamanları ve ağ düzeyinde saldırılar veya durum geri almaları gibi öngörülemeyen olaylar sırasında köprülerin farklı piyasa koşullarında nasıl performans göstereceğiyle ilgili birçok yanıtsız soru vardır. Bu belirsizlik, derecesi henüz bilinmeyen belirli riskler oluşturmaktadır.

## Dapp'ler köprüleri nasıl kullanabilir? {#how-can-dapps-use-bridges}

Geliştiricilerin köprüler ve dapp'lerini zincirler arası hâle getirme konusunda değerlendirebilecekleri bazı pratik uygulamalar şunlardır:

### Köprüleri entegre etme {#integrating-bridges}

Geliştiriciler için köprülere destek eklemenin birçok yolu vardır:

1. **Kendi köprünüzü inşa etmek –** Özellikle güveni minimize edilmiş bir yol izlerseniz, güvenli ve güvenilir bir köprü inşa etmek kolay değildir. Dahası, ölçeklenebilirlik ve birlikte çalışabilirlik çalışmalarıyla ilgili yılların deneyimini ve teknik uzmanlığını gerektirir. Ek olarak, bir köprüyü sürdürmek ve onu uygulanabilir kılmak için yeterli likiditeyi çekmek adına aktif çalışan bir ekip gerektirecektir.

2. **Kullanıcılara birden fazla köprü seçeneği sunmak –** Birçok [merkeziyetsiz uygulama (dapp)](/developers/docs/dapps/), kullanıcıların onlarla etkileşime girmesi için kendi yerel token'larına sahip olmalarını gerektirir. Kullanıcıların token'larına erişmesini sağlamak için web sitelerinde farklı köprü seçenekleri sunarlar. Ancak bu yöntem, kullanıcıyı dapp arayüzünden uzaklaştırdığı ve yine de diğer dapp'ler ve köprülerle etkileşime girmelerini gerektirdiği için soruna hızlı bir çözümdür. Bu, hata yapma kapsamının arttığı hantal bir sisteme katılım deneyimidir.

3. **Bir köprüyü entegre etmek –** Bu çözüm, dapp'in kullanıcıları harici köprü ve DEX arayüzlerine göndermesini gerektirmez. Dapp'lerin kullanıcıların sisteme katılım deneyimini iyileştirmesine olanak tanır. Ancak bu yaklaşımın sınırlamaları vardır:

   - Köprülerin değerlendirilmesi ve bakımı zor ve zaman alıcıdır.
   - Tek bir köprü seçmek, tek bir hata noktası ve bağımlılık yaratır.
   - Dapp, köprünün yetenekleriyle sınırlıdır.
   - Köprüler tek başına yeterli olmayabilir. Dapp'lerin zincirler arası takaslar gibi daha fazla işlevsellik sunmak için DEX'lere ihtiyacı olabilir.

4. **Birden fazla köprüyü entegre etmek –** Bu çözüm, tek bir köprüyü entegre etmekle ilişkili birçok sorunu çözer. Ancak, birden fazla köprüyü entegre etmek kaynak tükettiği ve kriptodaki en kıt kaynak olan geliştiriciler için teknik ve iletişimsel ek yükler yarattığı için bunun da sınırlamaları vardır.

5. **Bir köprü toplayıcısını entegre etmek –** Dapp'ler için bir diğer seçenek, onlara birden fazla köprüye erişim sağlayan bir köprü toplama çözümünü entegre etmektir. Köprü toplayıcıları, tüm köprülerin güçlü yönlerini devralır ve bu nedenle tek bir köprünün yetenekleriyle sınırlı değildir. Özellikle, köprü toplayıcıları genellikle köprü entegrasyonlarını sürdürür, bu da dapp'i bir köprü entegrasyonunun teknik ve operasyonel yönlerini takip etme zahmetinden kurtarır.

Bununla birlikte, köprü toplayıcılarının da sınırlamaları vardır. Örneğin, daha fazla köprü seçeneği sunabilseler de, piyasada genellikle toplayıcının platformunda sunulanlardan çok daha fazla köprü mevcuttur. Dahası, tıpkı köprüler gibi, köprü toplayıcıları da akıllı sözleşme ve teknoloji risklerine maruz kalır (daha fazla akıllı sözleşme = daha fazla risk).

Bir dapp bir köprüyü veya toplayıcıyı entegre etme yoluna giderse, entegrasyonun ne kadar derin olması gerektiğine bağlı olarak farklı seçenekler vardır. Örneğin, yalnızca kullanıcıların sisteme katılım deneyimini iyileştirmek için bir ön uç entegrasyonuysa, bir dapp widget'ı entegre eder. Ancak entegrasyon staking, getiri çiftçiliği vb. gibi daha derin zincirler arası stratejileri keşfetmek içinse, dapp SDK veya API'yi entegre eder.

### Bir dapp'i birden fazla zincirde dağıtmak {#deploying-a-dapp-on-multiple-chains}

Bir dapp'i birden fazla zincirde dağıtmak için geliştiriciler [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/) vb. geliştirme platformlarını kullanabilirler. Genellikle bu platformlar, dapp'lerin zincirler arası çalışmasını sağlayabilen birleştirilebilir eklentilerle birlikte gelir. Örneğin geliştiriciler, [hardhat-deploy eklentisi](https://github.com/wighawag/hardhat-deploy) tarafından sunulan deterministik bir dağıtım vekili (proxy) kullanabilirler.

#### Örnekler: {#examples}

- [Zincirler arası dapp'ler nasıl oluşturulur](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Zincirler Arası Bir NFT Pazar Yeri Oluşturmak](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Zincirler arası NFT dapp'leri oluşturmak](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Zincirler arası sözleşme faaliyetlerini izleme {#monitoring-contract-activity-across-chains}

Zincirler arası sözleşme faaliyetlerini izlemek için geliştiriciler, akıllı sözleşmeleri gerçek zamanlı olarak gözlemlemek adına alt grafları (subgraphs) ve Tenderly gibi geliştirici platformlarını kullanabilirler. Bu tür platformlar ayrıca, [sözleşmeler tarafından yayımlanan olayları](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events) kontrol etmek vb. gibi zincirler arası faaliyetler için daha fazla veri izleme işlevselliği sunan araçlara da sahiptir.

#### Araçlar {#tools}

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Daha fazla bilgi {#further-reading}

- [Blokzincir Köprüleri](/bridges/) – ethereum.org
- [L2BEAT Köprü Risk Çerçevesi](https://l2beat.com/bridges/summary)
- [Blokzincir Köprüleri: Kripto Ağlarının Ağlarını Kurmak](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 Eyl 2021 – Dmitriy Berenzon
- [Birlikte Çalışabilirlik Açmazı (Trilemma)](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 Eki 2021 – Arjun Bhuptani
- [Kümeler: Güvenilir ve Güveni Minimize Edilmiş Köprüler Çoklu Zincir Ortamını Nasıl Şekillendiriyor](https://blog.celestia.org/clusters/) - 4 Eki 2021 – Mustafa Al-Bassam
- [LI.FI: Köprülerde Güven Bir Spektrumdur](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 Nis 2022 – Arjun Chand
- [Rollup Birlikte Çalışabilirlik Çözümlerinin Durumu](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 Haz 2024 – Alex Hook
- [Güvenli Zincirler Arası Birlikte Çalışabilirlik İçin Paylaşılan Güvenlikten Yararlanma: Lagrange Durum Komiteleri ve Ötesi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 Haz 2024 – Emmanuel Awosika

Ek olarak, köprüler hakkında daha derin bir anlayış geliştirmeye yardımcı olabilecek [James Prestwich](https://twitter.com/_prestwich) tarafından yapılan bazı ufuk açıcı sunumlar şunlardır:

- [Duvarlarla Çevrili Bahçeler Değil, Köprüler İnşa Etmek](https://youtu.be/ZQJWMiX4hT0)
- [Köprüleri Çözümlemek](https://youtu.be/b0mC-ZqN8Oo)
- [Köprüler Neden Yanıyor](https://youtu.be/c7cm2kd20j8)