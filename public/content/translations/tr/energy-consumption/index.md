---
title: Ethereum'un enerji harcaması
metaTitle: Ethereum Enerji Tüketimi
description: Ethereum'un enerji tüketimini anlamak için ihtiyacınız olan temel bilgiler.
lang: tr
---

[Ethereum](/) yeşil bir Blokzincirdir. Ethereum'un [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos) mutabakat mekanizması, [ağı güvence altına almak için enerji](/developers/docs/consensus-mechanisms/pow) yerine ETH kullanır. Ethereum'un enerji tüketimi, tüm küresel ağ genelinde yaklaşık [~0,0026 TWh/yıl](https://carbon-ratings.com/eth-report-2022)'dır.

Ethereum için enerji tüketimi tahmini, bir [CCRI (Kripto Karbon Derecelendirme Enstitüsü)](https://carbon-ratings.com) çalışmasından gelmektedir. Ethereum ağının elektrik tüketimi ve karbon ayak izi hakkında aşağıdan yukarıya tahminler ürettiler ([rapora bakın](https://carbon-ratings.com/eth-report-2022)). Çeşitli donanım ve istemci yazılımı yapılandırmalarına sahip farklı düğümlerin elektrik tüketimini ölçtüler. Ağın yıllık elektrik tüketimi için tahmin edilen **2.601 MWh** (0,0026 TWh), bölgeye özgü karbon yoğunluğu faktörleri uygulandığında yıllık **870 ton CO2e** karbon emisyonuna karşılık gelmektedir. Bu değer, düğümler ağa girip çıktıkça değişir; [Cambridge Blokzincir Ağı Sürdürülebilirlik Endeksi](https://ccaf.io/cbnsi/ethereum) tarafından sağlanan 7 günlük hareketli ortalama tahminini kullanarak bunu takip edebilirsiniz (tahminleri için biraz farklı bir yöntem kullandıklarını unutmayın - ayrıntılar sitelerinde mevcuttur).

Ethereum'un enerji tüketimini bağlamsallaştırmak için, diğer bazı ürünler ve endüstriler için yıllıklandırılmış tahminleri karşılaştırabiliriz. Bu, Ethereum için tahminin yüksek mi yoksa düşük mü olduğunu daha iyi anlamamıza yardımcı olur.

<EnergyConsumptionChart />

Yukarıdaki grafik, diğer bazı ürünler ve endüstrilerle karşılaştırıldığında Ethereum için TWh/yıl cinsinden tahmini enerji tüketimini göstermektedir. Sağlanan tahminler, Temmuz 2023'te erişilen halka açık bilgilerden kaynaklanmaktadır ve kaynakların bağlantıları aşağıdaki tabloda mevcuttur.

|                     | Yıllıklandırılmış enerji tüketimi (TWh) | PoS Ethereum ile Karşılaştırma |                                                                                      Kaynak                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Küresel veri merkezleri |                 190                 |          73.000x           |                                    [kaynak](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin             |                 149                 |          53.000x           |                                                                 [kaynak](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Altın madenciliği         |                 131                 |          50.000x           |                                                                 [kaynak](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| ABD'de oyun\*     |                 34                  |          13.000x           |                 [kaynak](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum        |                 21                  |           8.100x           |                                                                    [kaynak](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7.300x           |                                           [kaynak](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix             |                0,457                |            176x            | [kaynak](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0,26                 |            100x            |                                 [kaynak](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0,02                 |             8x             |                              [kaynak](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **PoS Ethereum**    |             **0,0026**              |           **1x**           |                                                               [kaynak](https://carbon-ratings.com/eth-report-2022)                                                                |

\*PC'ler, dizüstü bilgisayarlar ve oyun konsolları gibi son kullanıcı cihazlarını içerir.

Enerji tüketimi için doğru tahminler elde etmek, özellikle ölçülen şeyin karmaşık bir tedarik zinciri veya verimliliğini etkileyen dağıtım ayrıntıları olduğunda karmaşıktır. Örneğin, Netflix ve Google için enerji tüketimi tahminleri, yalnızca sistemlerini sürdürmek ve kullanıcılara içerik sunmak için kullanılan enerjiyi (_doğrudan harcama_) içerip içermediklerine veya içerik üretmek, kurumsal ofisleri yönetmek, reklam vermek vb. için gereken harcamaları (_dolaylı harcama_) içerip içermediklerine bağlı olarak değişir. Dolaylı harcama, TV'ler, bilgisayarlar ve cep telefonları gibi son kullanıcı cihazlarında içerik tüketmek için gereken enerjiyi de içerebilir.

Yukarıdaki tahminler mükemmel karşılaştırmalar değildir. Hesaba katılan dolaylı harcama miktarı kaynağa göre değişir ve nadiren son kullanıcı cihazlarından gelen enerjiyi içerir. Altta yatan her kaynak, neyin ölçüldüğüne dair daha fazla ayrıntı içerir.

Yukarıdaki tablo ve grafik ayrıca Bitcoin ve İş Kanıtı (PoW) Ethereum ile karşılaştırmaları da içermektedir. İş Kanıtı (PoW) ağlarının enerji tüketiminin statik olmadığını ve günden güne değiştiğini belirtmek önemlidir. Tahminler ayrıca kaynaklar arasında büyük farklılıklar gösterebilir. Konu, yalnızca tüketilen enerji miktarı hakkında değil, aynı zamanda bu enerjinin kaynakları ve ilgili etik kurallar hakkında da incelikli [tartışmaları](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) kendine çekmektedir. Farklı projeler, daha az veya daha fazla oranda yenilenebilir enerji de dahil olmak üzere farklı enerji kaynakları kullanabileceğinden, enerji tüketimi çevresel ayak iziyle tam olarak eşleşmeyebilir. Örneğin, [Cambridge Bitcoin Elektrik Tüketimi Endeksi](https://ccaf.io/cbnsi/cbeci/comparisons), Bitcoin ağ talebinin teorik olarak gaz yakma veya aksi takdirde iletim ve dağıtımda kaybolacak elektrikle karşılanabileceğini göstermektedir. Ethereum'un sürdürülebilirliğe giden yolu, ağın enerjiye aç kısmını yeşil bir alternatifle değiştirmekti.

Birçok endüstri için enerji tüketimi ve karbon emisyonu tahminlerine [Cambridge Blokzincir Ağı Sürdürülebilirlik Endeksi sitesinden](https://ccaf.io/cbnsi/ethereum) göz atabilirsiniz.

## İşlem başına tahminler {#per-transaction-estimates}

Birçok makale, Blokzincirler için "işlem başına" enerji harcamasını tahmin etmektedir. Bu yanıltıcı olabilir çünkü bir Blok önermek ve doğrulamak için gereken enerji, içindeki işlem sayısından bağımsızdır. İşlem başına bir enerji harcaması birimi, daha az işlemin daha az enerji harcamasına yol açacağını ve bunun tersini ima eder, ki durum böyle değildir. Ayrıca, işlem başına tahminler, bir Blokzincirin işlem kapasitesinin nasıl tanımlandığına karşı çok hassastır ve bu tanımda ince ayar yapmak, değerin daha büyük veya daha küçük görünmesini sağlamak için manipüle edilebilir.

Örneğin Ethereum'da işlem kapasitesi yalnızca temel katmanınki değildir; aynı zamanda tüm "[katman 2 (l2)](/layer-2/)" toplamalarının işlem kapasitesinin toplamıdır. Katman 2'ler genellikle hesaplamalara dahil edilmez, ancak sıralayıcılar tarafından tüketilen ek enerjiyi (küçük) ve işledikleri işlem sayısını (büyük) hesaba katmak, işlem başına tahminleri muhtemelen büyük ölçüde azaltacaktır. Platformlar arası işlem başına enerji tüketimi karşılaştırmalarının yanıltıcı olabilmesinin bir nedeni budur.

## Ethereum'un karbon borcu {#carbon-debt}

Ethereum'un enerji harcaması çok düşüktür, ancak bu her zaman böyle olmamıştır. Ethereum başlangıçta, mevcut Hisse Kanıtı (PoS) mekanizmasından çok daha büyük bir çevresel maliyeti olan İş Kanıtı (PoW) kullanıyordu.

En başından beri Ethereum, Hisse Kanıtı (PoS) tabanlı bir mutabakat mekanizması uygulamayı planladı, ancak bunu güvenlikten ve merkeziyetsizlikten ödün vermeden yapmak yıllarca süren odaklanmış araştırma ve geliştirme gerektirdi. Bu nedenle, ağı başlatmak için bir İş Kanıtı (PoW) mekanizması kullanıldı. İş Kanıtı (PoW), madencilerin bir değeri hesaplamak için bilgi işlem donanımlarını kullanmalarını ve bu süreçte enerji harcamalarını gerektirir.

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

CCRI, Birleşme'nin Ethereum'un yıllıklandırılmış elektrik tüketimini **%99,988**'den fazla azalttığını tahmin etmektedir. Benzer şekilde, Ethereum'un karbon ayak izi yaklaşık **%99,992** oranında (11.016.000'den 870 ton CO2e'ye) azaltıldı. Bunu bir perspektife oturtmak gerekirse, emisyonlardaki azalma, yukarıdaki şekilde gösterildiği gibi Eyfel Kulesi'nin yüksekliğinden küçük bir plastik oyuncak figürüne inmek gibidir. Sonuç olarak, ağı güvence altına almanın çevresel maliyeti büyük ölçüde azalmıştır. Aynı zamanda, ağın güvenliğinin arttığına inanılmaktadır.

## Yeşil bir uygulama katmanı {#green-applications}

Ethereum'un enerji tüketimi çok düşük olmakla birlikte, Ethereum üzerinde inşa edilen önemli, büyüyen ve oldukça aktif bir [**onarıcı finans (refi)**](/refi/) topluluğu da bulunmaktadır. Onarıcı finans (refi) uygulamaları, çevreye fayda sağlayan pozitif dışsallıklara sahip finansal uygulamalar oluşturmak için merkeziyetsiz finans (DeFi) bileşenlerini kullanır. Onarıcı finans (refi), Ethereum ile yakından uyumlu olan ve teknolojik ilerleme ile çevre yönetimini birleştirmeyi amaçlayan daha geniş bir ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) hareketinin parçasıdır. Ethereum'un merkeziyetsiz, izinsiz ve birleştirilebilir doğası, onu onarıcı finans (refi) ve solarpunk toplulukları için ideal temel katman haline getirir.

[Gitcoin](https://gitcoin.co) gibi Web3 yerel kamusal mallar fonlama platformları, Ethereum'un uygulama katmanında çevreye duyarlı inşayı teşvik etmek için iklim turları düzenler. Bu girişimlerin (ve diğerlerinin, örn. [merkeziyetsiz bilim (DeSci)](/desci/)) geliştirilmesi yoluyla Ethereum, çevresel ve sosyal açıdan net pozitif bir teknoloji haline gelmektedir.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Bu sayfanın daha doğru hale getirilebileceğini düşünüyorsanız, lütfen bir sorun (issue) veya PR (çekme isteği) oluşturun. Bu sayfadaki istatistikler, halka açık verilere dayanan tahminlerdir; ethereum.org ekibinden veya Ethereum Vakfı'ndan resmi bir açıklama veya söz teşkil etmezler.
</AlertDescription>
</AlertContent>
</Alert>

## Daha fazla bilgi {#further-reading}

- [Cambridge Blokzincir Ağı Sürdürülebilirlik Endeksi](https://ccaf.io/cbnsi/ethereum)
- [İş Kanıtı (PoW) Blokzincirleri hakkında Beyaz Saray raporu](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum Emisyonları: Aşağıdan Yukarıya Bir Tahmin](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Ethereum Enerji Tüketimi Endeksi](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Birleşme - Ethereum Ağının Elektrik Tüketimi ve Karbon Ayak İzi Üzerindeki Etkileri](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Ethereum'un enerji tüketimi](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## İlgili konular {#related-topics}

- [İşaret zinciri](/roadmap/beacon-chain)
- [Birleşme](/roadmap/merge/)