---
title: "Ethereum Enerji Tüketimi"
description: "Ethereum'un enerji tüketimini anlamak için ihtiyacınız olan temel bilgiler."
lang: tr
---

# Ethereum'un enerji harcaması {#proof-of-stake-energy}

Ethereum çevre dostu bir blok zincirdir. Ethereum'un [hisse ispatı](/developers/docs/consensus-mechanisms/pos) mutabakat mekanizması, [ağı güvence altına almak için enerji](/developers/docs/consensus-mechanisms/pow) yerine ETH kullanır. Ethereum'un enerji tüketimi, tüm küresel ağda yaklaşık olarak [~0,0026 TWh/yıl](https://carbon-ratings.com/eth-report-2022) kadardır.

Ethereum için enerji tüketim tahmini, bir [CCRI (Kripto Karbon Derecelendirme Enstitüsü)](https://carbon-ratings.com) çalışmasından gelmektedir. Ethereum ağının elektrik tüketimi ve karbon ayak izine ilişkin aşağıdan yukarıya tahminler ürettiler ([rapora bakın](https://carbon-ratings.com/eth-report-2022)). Farklı düğümlerin elektrik harcamalarını çeşitli biligisayar donanım ve yazılım yapılandırmalarıyla test ettiler. Ağın yıllık elektrik tüketimi için tahmini **2.601 MWh** (0,0026 TWh), bölgeye özgü karbon yoğunluğu faktörleri uygulandığında yıllık **870 ton CO2e** karbon emisyonuna karşılık gelmektedir. Bu değer, düğümler ağa girip çıktıkça değişir; [Cambridge Blokzincir Ağı Sürdürülebilirlik Endeksi](https://ccaf.io/cbnsi/ethereum) tarafından sağlanan 7 günlük hareketli ortalama tahminini kullanarak bunu takip edebilirsiniz (tahminleri için biraz farklı bir yöntem kullandıklarını unutmayın - ayrıntılar sitelerinde mevcuttur).

Ethereum'un enerji tüketimini bir bağlama oturtmak için, diğer ürünler ve endüstriler için yıllık yapılan tahminleri karşılaştırabiliriz. Bu, bize Ethereum için tahminin düşük ya da yüksek olduğunu daha iyi anlamamıza yardım ediyor.

<EnergyConsumptionChart />

Yukarıdaki tablo, diğer ürün ve endüstrilere kıyasla Ethereum için tahmini yıllık enerji tüketimini TWh/yıl cinsinden göstermektedir. Sunulan tahminler Temmuz 2023'te herkese açık bilgilerden alınmıştır, kaynak bağlantıları aşağıdaki tabloda mevcuttur.

|                         | Yıllık enerji tüketimi (TWh) | PoS Ethereum ile karşılaştırma |                                                                                       Kaynak                                                                                      |
| :---------------------- | :---------------------------------------------: | :----------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Küresel veri merkezleri |                       190                       |             73,000x            |                                    [kaynak](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                 |                       149                       |             53,000x            |                                                                 [kaynak](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Altın madenciliği       |                       131                       |     50.000x    |                                                                 [kaynak](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| ABD'de oyun\*           |                        34                       |     13.000x    |                 [kaynak](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum            |                        21                       |             8,100x             |                                                                     [kaynak](https://ccaf.io/cbnsi/ethereum/1)                                                                    |
| Google                  |                        19                       |             7,300x             |                                           [kaynak](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                 |                      0,457                      |              176x              | [kaynak](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                  |                       0,26                      |              100x              |                                  [kaynak](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-\(1\).pdf)                                 |
| AirBnB                  |                       0,02                      |               8x               |                              [kaynak](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-\(Final\).pdf)                              |
| **PoS Ethereum**        |                    **0,0026**                   |             **1x**             |                                                                [kaynak](https://carbon-ratings.com/eth-report-2022)                                                               |

\*PC'ler, dizüstü bilgisayarlar ve oyun konsolları gibi son kullanıcı cihazlarını içerir.

Enerji tüketimine ilişkin doğru tahminler almak karmaşıktır; özellikle de ölçülen şeyin karmaşık bir tedarik zinciri veya verimliliğini etkileyen dağıtım ayrıntıları olduğu durumlarda. Örneğin, Netflix ve Google için enerji tüketimi tahminleri, yalnızca sistemlerinin bakımını yapmak ve kullanıcılara içerik sunmak için kullanılan enerjiyi (_doğrudan harcama_) mi yoksa içerik üretmek, şirket ofislerini işletmek, reklam yapmak vb. için gereken harcamaları (_dolaylı harcama_) mı içerdiklerine bağlı olarak değişir. Dolaylı harcama, aynı zamanda içerik tüketimi için son kullanıcı cihazlarında, örneğin televizyonlar, bilgisayarlar ve mobil cihazlar gibi, enerji tüketimini de içerebilir.

Yukarıdaki tahminler mükemmel karşılaştırmalar değildir. Hesaba katılan dolaylı harcama miktarı kaynağa göre değişir ve nadiren son kullanıcı cihazlarından gelen enerjiyi içerir. Her temel kaynak, neyin ölçüldüğüne dair daha fazla ayrıntı içerir.

Yukarıdaki tablo ve grafik ayrıca Bitcoin ve iş kanıtlı Ethereum ile ilgili karşılaştırmalar içermektedir. Önemli bir nokta şudur ki, proof-of-work ağlarının enerji tüketimi sabit değildir ve gün geçtikçe değişebilir. Tahminler ayrıca kaynaklar arasında geniş bir şekilde değişebilir. Konu, yalnızca tüketilen enerji miktarı hakkında değil, aynı zamanda bu enerjinin kaynakları ve ilgili etikler hakkında da incelikli bir [tartışmayı](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) beraberinde getiriyor. Enerji tüketimi, çeşitli projelerin farklı enerji kaynaklarını, yenilenebilir enerjinin daha az veya daha fazla oranını içerebileceği için çevresel etkiyle tam olarak örtüşmeyebilir. Örneğin, [Cambridge Bitcoin Elektrik Tüketim Endeksi](https://ccaf.io/cbnsi/cbeci/comparisons), Bitcoin ağ talebinin teorik olarak gaz yakma veya başka türlü iletim ve dağıtımda kaybolacak olan elektrikle karşılanabileceğini göstermektedir. Ethereum'un sürdürülebiliğe yolu ağın enerjiye aç kısmını yeşil bir alternatifle değiştirmekti.

Birçok endüstri için enerji tüketimi ve karbon emisyonu tahminlerine [Cambridge Blokzincir Ağı Sürdürülebilirlik Endeksi sitesinden](https://ccaf.io/cbnsi/ethereum) göz atabilirsiniz.

## İşlem başına tahminler {#per-transaction-estimates}

Birçok makale, blok zincirler için "işlem başına" enerji harcamasını öngörüyor. Ancak bu yanıltabilir çünkü bir bloku öne sürmek ve doğrulamak için gereken enerji blokun içindeki işlemlerin sayısından bağımsızdır. İşlem başına enerji harcaması biriminden yola çıkarak, daha az işlemin daha küçük bir enerji harcamasına ve tam tersine daha fazla işlemin daha büyük bir enerji harcamasına neden olacağı düşünülebilir, ancak bu her zaman geçerli değildir. Ayrıca, işlem başına tahminler bir blok zincirin işlem girdisinin nasıl tanımlandığına karşı çok hassasstır ve bu
tanımlamanın değişimi ile oynanarak değer olduğundan daha büyük veya küçük gösterilebilir.

Örneğin Ethereum'da işlem hacmi yalnızca temel katmanınki değil, aynı zamanda tüm "[katman 2](/layer-2/)" rollup'larının işlem hacimlerinin toplamıdır. Katman 2'ler genelde hesaplamalara katılmazlar, ancak sıralayıcılar tarafından harcanan ek enerji (az) ve onların tamamladığı işlem sayısının (çok) göz önüne alınması işlem başına tahminleri büyük oranda düşürürdü. Bu, platformlar arasında işlem başına enerji tüketimi karşılaştırmalarının yanıltıcı olabileceği nedenlerden biridir.

## Ethereum'un karbon borcu {#carbon-debt}

Ethereum'un enerji tüketimi gayet düşüktür, ancak bu durum hep böyle olmamıştır. Ethereum aslen mevcut hisse ispatı mekanizmasından çok daha büyük bir çevresel maliyeti olan iş ispatını kullanıyordu.

En başından beri, Ethereum hisse ispatı temelli bir fikir birliği mekanizması uygulamayı planlamıştı, ancak bunun güvenlik ve merkeziyetsizlikten taviz verilmeden yapılması yıllarca odaklı biçimde araştırma ve geliştirme gerektirdi. Sonuç olarak, ağı başlatmak için bir iş ispatı mekanizması kullanıldı. İş ispatı madencilerin donanımlarını süreç esnasında enerji tüketerek değer hesaplamak için kullanmasını gerektirir.

![Birleşim öncesi ve sonrası Ethereum enerji tüketiminin karşılaştırması: Solda, Birleşim öncesi yüksek enerji tüketimini simgeleyen Eyfel Kulesi (330 metre boyunda) ve sağda, Birleşim sonrası enerji kullanımındaki büyük düşüşü temsil eden 4 cm'lik küçük bir Lego figürü yer alıyor](energy_consumption_pre_post_merge.png)

CCRI'nin tahminine göre, Birleşim, Ethereum'un yıllık elektrik tüketimini **%99,988**'den fazla azalttı. Benzer şekilde, Ethereum'un karbon ayak izi de yaklaşık **%99,992** oranında azalarak 11.016.000 tondan 870 ton CO2e'ye düştü. Bunu daha iyi anlatabilmek için, yukarıdaki figürde gösterildiği gibi, emisyonlardaki düşüş tıpkı Eyfel Kulesi'nin yüksekliğinden bir küçük plastik oyuncak figürün boyuna inmek gibiydi. Sonuç olarak, ağın korunmasının çevresel maliyeti büyük oranda düştü. Aynı zamanda, ağın güvenliğinin geliştiği düşünülüyor.

## Yeşil bir uygulama katmanı {#green-applications}

Ethereum'un enerji tüketimi çok düşük olsa da, Ethereum üzerinde inşa yapan önemli, büyüyen ve son derece aktif bir [**rejeneratif finans (ReFi)**](/refi/) topluluğu da bulunmaktadır. ReFi uygulamaları, çevreye fayda sağlayan pozitif dışsallıklara sahip finansal uygulamalar oluşturmak için DeFi bileşenlerini kullanır. ReFi, Ethereum ile yakından bağlantılı olan ve teknolojik ilerlemeyi çevresel sorumlulukla birleştirmeyi amaçlayan daha geniş bir ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) hareketinin bir parçasıdır. Ethereum'un merkezi olmayan, izinsiz ve şekillendirilebilir doğası, onu ReFi ve solarpunk toplulukları için ideal temel katman yapar.

[Gitcoin](https://gitcoin.co) gibi Web3'e özgü kamu malları fonlama platformları, Ethereum'un uygulama katmanında çevreye duyarlı inşayı teşvik etmek için iklim turları düzenlemektedir. Bu girişimlerin (ve [DeSci](/desci/) gibi diğerlerinin) geliştirilmesiyle Ethereum, çevresel ve sosyal açıdan net pozitif bir teknoloji haline gelmektedir.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Eğer bu sayfanın daha isabetli olabileceğini düşünüyorsanız, lütfen bir konu veya PR açın. Bu sayfadaki istatistikler herkese açık veriye dayalı tahminlerdir - ethereum.org takımından veya Ethereum Foundation'dan resmi bir açıklama veya sözü temsil etmezler.
</AlertDescription>
</AlertContent>
</Alert>

## Daha fazla kaynak {#further-reading}

- [Cambridge Blokzincir Ağı Sürdürülebilirlik Endeksi](https://ccaf.io/cbnsi/ethereum)
- [İş ispatı blokzincirleri üzerine Beyaz Saray raporu](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum Emisyonları: Aşağıdan Yukarıya Bir Tahmin](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Ethereum Enerji Tüketim Endeksi](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Birleşim - Ethereum Ağının Elektrik Tüketimi ve Karbon Ayak İzi Üzerindeki Etkileri](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Ethereum'un enerji tüketimi](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Alakalı başlıklar {#related-topics}

- [İşaret Zinciri](/roadmap/beacon-chain)
- [Birleşim](/roadmap/merge/)
