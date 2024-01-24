---
title: Ethereum Enerji Tüketimi
description: Ethereum'un enerji tüketimini anlamak için ihtiyacınız olan temel bilgiler.
lang: tr
---

# Ethereum'un enerji tüketimi {#proof-of-stake-energy}

Ethereum çevre dostu bir blok zincirdir. Ethereum'un [hisse ispatı mekanizması](/developers/docs/consensus-mechanisms/pos), [ağın güvenliğini sağlamak için](/developers/docs/consensus-mechanisms/pow) enerji yerine ETH kullanır. Tüm Ethereum ağının, yılda tükettiği enerji yaklaşık olarak [~0.0026 TWh](https://carbon-ratings.com/eth-report-2022)'dir.

Ethereum için enerji tüketim tahmini [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com) çalışmasından geliyor. Ethereum Ağı'nın karbon ayak izi ve elektrik harcamaları hakkında aşağı yukarı tahminlerde bulundular. ([rapora bakabilirsiniz](https://carbon-ratings.com/eth-report-2022)). Farklı düğümlerin elektrik harcamalarını çeşitli biligisayar donanım ve yazılım yapılandırmalarıyla test ettiler. Ağın yıllık tahmin edilen elektrik tüketimi olan **2.601 MWh** (0.0026 TWh) bölgeye özel karbon yoğunluğu faktörleri uygulandığında yıllık **870 tonluk CO2e** karbon emisyonuna denk gelmektedir. Bu değer düğümler ağa girdikçe ve çıktıkça değişir - bunun takibini [Cambridge Blok Zincir Ağ Sürdürülebilirlik Endeksinden](https://ccaf.io/cbnsi/ethereum) yuvarlanan 7 günlük ortalama tahmini kullanarak yapabilirsiniz (tahminleri için biraz farklı bir metot kullandıklarını aklınızda tutun - detaylar sitede mevcuttur).

Ethereum'un enerji tüketimini bağlama oturtmak için, diğer bazı endüstriler için yıllık tahminleri karşılaştırabiliriz. Bu, bize Ethereum için tahminin düşük ya da yüksek olduğunu daha iyi anlamamıza yardım ediyor.

<EnergyConsumptionChart />

Yukarıdaki tablo, diğer bazı endüstrilere kıyasla Ethereum için tahmini yıllık enerji tüketimini TWh/yıl cinsinden göstermektedir. Sunulan tahminler Mayıs 2023'te herkese açık bilgilerden alınmıştır, kaynak bağlantıları aşağıdaki tabloda mevcuttur:

|                           | Yıllık enerji tüketimi (TWh) | PoS Ethereum ile karşılaştırma | Kaynak                                                                                                                                                                            |
| :------------------------ | :--------------------------: | :----------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Küresel veri merkezleri   |             200              |            77.000x             | [kaynak](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                                                       |
| Altın madenciliği         |             131              |            50.000x             | [kaynak](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| Bitcoin                   |             131              |            50.000x             | [kaynak](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| PoW Ethereum              |              78              |            30.000x             | [kaynak](https://digiconomist.net/ethereum-energy-consumption)                                                                                                                    |
| Youtube (sadece doğrudan) |              12              |             4600x              | [kaynak](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf)                                                                                     |
| ABD'de oyun               |              34              |            13.000x             | [kaynak](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                                 |
| Netflix                   |            0,451             |              173x              | [kaynak](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                    |             0,26             |              100x              | [kaynak](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                                                       |
| AirBnB                    |             0,02             |               8x               | [kaynak](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                                                           |
| PoS Ethereum              |            0,0026            |               1x               | [kaynak](https://carbon-ratings.com/eth-report-2022)                                                                                                                              |

Enerji tüketimine dair isabetli tahminler yapmak karmaşıktır, özellikle söz konusu kalemin tedarik zinciri veya dağıtım detayları, kalemin verimliliğini etkileyecek kadar karmaşıksa. Örneğin Netflix veya YouTube'u düşünün. Onların enerji kullanımıyla ilgili tahminler sadece sistemlerini yönetecek ve kullanıcılara içerik iletecek enerjiyi mi (_doğrudan maliyet_) yoksa içerik üretimi, şirket ofislerinin yönetimi, reklam ve benzeri için gereken maliyeti (_dolaylı maliyet_) ekleyip eklememelerine göre değişir. Dolaylı kullanıma ayrıca TV'ler, bilgisayarlar ve mobiller gibi son kullanıcı cihazlarında hangi cihazların kullanıldığına bağlı olarak içerik tüketimi için gereken enerji de dahil olabilir.

Bu sorun hakkında bir tartışma [Carbon Brief'de](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix) bulunmaktadır. Yukarıdaki tabloda, Netflix için bildirilmiş değer kendi bildirdikleri _doğrudan_ ve _dolaylı_ kullanımı içermektedir. Youtube sadece kendi _direkt_ enerji tüketiminin tahminini sağlamaktadır, bu da [12 TWh/yıl](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf) civarındadır.

Yukarıdaki tablo ve grafik ayrıca Bitcoin ve iş kanıtlı Ethereum ile ilgili karşılaştırmalar içermektedir. Şu akılda tutulmalıdır ki iş ispatı ağlarının enerji tüketimi sabit değildir - günden güne değişir. İş ispatlı Ethereum için kullanılan değer hisse ispatına [Birleşim'den](/roadmap/merge/) öncedir, tıpkı [Digiconomist](https://digiconomist.net/ethereum-energy-consumption) tarafından tahmin edildiği gibi. [Cambridge Blok Zincir Ağ Sürdürülebilirlik Endeksi](https://ccaf.io/cbnsi/ethereum/1) gibi diğer kaynaklar ise enerji tüketimini daha düşük (20 TWh/yıl civarı) tahmin etmektedir. Bitcoin'in enerji tüketimi ile ilgili tahminler kaynaklar arası geniş farklılıklar gösterir ve sadece tüketilen enerji değil, ayrıca o enerji ve onunla ilgili ahlaki değerler ile alakalı incelikli [tartışmaları](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) cezbeden bir konudur. Enerji tüketimi muhakkak çevresel ayak iziyle eşleşmez çünkü farklı projeler farklı enerji kaynakları kullanabilir, örnek olarak daha az ya da fazla oranda yenilenebilir enerji gibi. Örneğin, [Cambridge Bitcoin Elektrik Tüketim Endeksi](https://ccaf.io/cbnsi/cbeci/comparisons) teorik olarak Bitcoin ağ talebinin gaz yakımı veya başka durumda aktarım ve dağıtımda kaybedilecek elektrik ile güçlendirebileceğini belirtir. Ethereum'un sürdürülebiliğe yolu ağın enerjiye aç kısmını yeşil bir alternatifle değiştirmekti.

Birçok endüstri için enerji tüketimi ve karbon emisyonu tahminlerine [Cambridge Blok Zincir Ağ Sürdürülebilirlik Endeksi sitesinden](https://ccaf.io/cbnsi/ethereum) göz atabilirsiniz.

## İşlem başına tahminler {#per-transaction-estimates}

Birçok makale, blok zincirler için "işlem başına" enerji harcamasını öngörüyor. Ancak bu yanıltabilir çünkü bir bloku öne sürmek ve doğrulamak için gereken enerji blokun içindeki işlemlerin sayısından bağımsızdır. İşlem başına enerji harcaması birimi, daha az işlemin daha küçük enerji harcamasına yol açacağı anlamına gelir ve bunun tersi de geçerlidir. Ayrıca, işlem başına tahminler bir blok zincirin işlem girdisinin nasıl tanımlandığına karşı çok hassasstır ve bu tanımlamanın değişimi ile oynanarak değer olduğundan daha büyük veya küçük gösterilebilir.

Örneğin, Ethereum'da işlem verimi yalnızca temel katmanınki değildir - aynı zamanda tüm "[katman 2](/layer-2/)" toplamaların işlem veriminin toplamıdır. Katman 2'ler genelde hesaplamalara katılmazlar, ancak sıralayıcılar tarafından harcanan ek enerji (az) ve onların tamamladığı işlem sayısının (çok) göz önüne alınması işlem başına tahminleri büyük oranda düşürürdü. Bu platformlar arasında işlem başına enerji tüketimi karşılaştırmalarının yanıltıcı olmasının sebeplerinden biridir.

## Ethereum'un karbon borcu {#carbon-debt}

Ethereum'un enerji tüketimi gayet düşüktür, ancak bu durum hep böyle olmamıştır. Ethereum aslen mevcut hisse ispatı mekanizmasından çok daha büyük bir çevresel maliyeti olan iş ispatını kullanıyordu.

En başından beri, Ethereum hisse ispatı temelli bir fikir birliği mekanizması uygulamayı planlamıştı, ancak bunun güvenlik ve merkeziyetsizlikten taviz verilmeden yapılması yıllarca odaklı biçimde araştırma ve geliştirme gerektirdi. Sonuç olarak, ağı başlatmak için bir iş ispatı mekanizması kullanıldı. İş ispatı madencilerin donanımlarını süreç esnasında enerji tüketerek değer hesaplamak için kullanmasını gerektirir.

![Soldaki Eyfel Kulesi'ni (330 metre uzunluğunda) Birleşim öncesi yüksek enerji tüketimini sembolize etmek için, 4 cm uzunluğunda bir Lego figürünü ise Birleşim sonrası enerji tüketiminden dramatik düşüşü temsil etmek için kullanarak Ethereum'un Birleşim öncesi ve sonrası enerji tüketiminin karşılaştırılması](energy_consumption_pre_post_merge.png)

CCRI Birleşim'in Ethereum'un yıllık enerji tüketimini **%99.988** veya daha fazla düşündüğünü tahmin ediyor. Aynı şekilde, Ethereum'un karbon ayak izi de yaklaşık **%99.992** (11.016.000 ila 870 ton arası CO2e) düştü. Bunu daha iyi anlatabilmek için, yukarıdaki figürde gösterildiği gibi, emisyonlardaki düşüş tıpkı Eyfel Kulesi'nin yüksekliğinden bir küçük plastik oyuncak figürün boyuna inmek gibiydi. Sonuç olarak, ağın korunmasının çevresel maliyeti büyük oranda düştü. Aynı zamanda, ağın güvenliğinin geliştiği düşünülüyor.

## Çevre dostu uygulama katmanı {#green-applications}

Ethereum'un enerji tüketiminin aşırı düşük olduğu esnada, aynı zamanda önemli, büyüyen ve yüksek oranda aktif bir [**rejeneratif finans (ReFi)**](/refi/) topluluğu Ethereum üzerinde inşa etmekte. ReFi uygulamaları, çevreye fayda sağlayan pozitif dışsallıklara sahip finansal uygulamalar oluşturmak için DeFi bileşenlerini kullanır. ReFi daha geniş bir ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) hareketinin Ethereum ile yakın çalışan bir parçasıdır ve teknolojik gelişme ile çevresel koruyuculuğu eşleştirmeyi hedefler. Ethereum'un merkezi olmayan, izinsiz ve şekillendirilebilir doğası, onu ReFi ve solarpunk toplulukları için ideal temel katman yapar.

[Gitcoin](https://gitcoin.co) gibi Web3'ye ait kamu malı fonlama platformları Ethereum'un uygulama katmanı üzerinde çevresel olarak bilinçli inşayı teşvik etmek için iklim rauntları oluştururlar. Bu inisiyatiflerin gelişimi aracılığıyla (ve [DeSci](/desci/) gibi diğerleri) Ethereum, çevresel ve sosyal bir net pozitif teknoloji haline geliyor.

<InfoBanner emoji=":evergreen_tree:">
  Eğer bu sayfanın daha isabetli olabileceğini düşünüyorsanız, lütfen bir konu veya PR açın. Bu sayfadaki istatistikler herkese açık veriye dayalı tahminlerdir - ethereum.org takımından veya Ethereum Foundation'dan resmi bir açıklama veya sözü temsil etmezler.
</InfoBanner>

## Daha fazla bilgi {#further-reading}

- [Cambridge Blok Zincir Ağ Sürdürülebilirlik Endeksi](https://ccaf.io/cbnsi/ethereum)
- [İş ispatı blok zincirleri hakkında Beyaz Saray raporu](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum Emisyonları: Baştan Sona Bir Tahmin](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Ethereum Enerji Tüketim Endeksi](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Birleşim - Ethereum Ağının Elektrik Tüketimi ve Karbon Ayak İzi Üzerindeki Sonuçları](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Ethereum'un enerji tüketimi](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## İlgili konular {#related-topics}

- [Ethereum'un vizyonu](/roadmap/vision/)
- [İşaret Zinciri](/roadmap/beacon-chain)
- [Birleştirme](/roadmap/merge/)
