---
title: Düğümler ve istemciler
description: Ethereum düğümlerine ve istemci yazılımına genel bakış, ayrıca bir düğümün nasıl kurulacağı ve bunu neden yapmanız gerektiğine dair bilgi.
lang: tr
sidebarDepth: 2
---

Ethereum, blokları ve işlem verilerini doğrulayabilen yazılım (düğümler olarak bilinir) çalıştıran dağıtılmış bir bilgisayar ağıdır. Bir düğümü "çalıştırmak" için bilgisayarınızda istemci olarak bilinen bir uygulamaya ihtiyacınız var.

## Ön koşullar {#prerequisites}

Daha derine dalmadan ve kendi Ethereum istemci örneğinizi çalıştırmadan önce, eşler arası ağ kavramını ve [EVM'nin temellerini](/developers/docs/evm/) anlamalısınız. [Ethereum'a giriş](/developers/docs/intro-to-ethereum/) yazımıza bir göz atın.

Eğer düğümler konusunda acemiyseniz, ilk olarak [bir Ethereum düğümü çalıştırmak üzerine](/run-a-node) kullanıcı dostu öğreticimize göz atmanızı öneririz.

## Düğümler ve istemciler nedir? {#what-are-nodes-and-clients}

"Düğüm", çalışan bir istemci yazılımı parçasını ifade eder. İstemci, her bloktaki tüm işlemleri doğrulayan, ağı güvenli ve verileri doğru tutan bir Ethereum uygulamasıdır.

Bu [düğüm haritasına](https://etherscan.io/nodetracker) bakarak Ethereum ağının gerçek zamanlı görünümünü görebilirsiniz.

Go, Rust, JavaScript, Typescript, Python, C# .NET, Nim ve Java gibi çeşitli programlama dillerinde birçok [Ethereum istemcisi](/developers/docs/nodes-and-clients/#execution-clients) mevcuttur. Bu uygulamaların ortak noktası, hepsinin resmi bir şartnameyi takip etmesidir (başlangıçta [Ethereum Sarı Kağıdı](https://ethereum.github.io/yellowpaper/paper.pdf)). Bu şartname, Ethereum ağının ve blok zincirinin nasıl çalıştığını belirler.

![Yürütüm istemcisi](./client-diagram.png) Ethereum istemcisinin özelliklerinin basitleştirilmiş diyagramı.

## Düğüm türleri {#node-types}

[Kendi düğümünüzü çalıştırmak](/developers/docs/nodes-and-clients/run-a-node/) istiyorsanız, farklı şekilde veri tüketen farklı düğüm türleri olduğunu bilmeniz gerekir. İstemciler aslında 3 farklı düğüm türü çalıştırabilir: hafif, tam ve arşiv. Daha hızlı senkronizasyon süresi sağlayan farklı senkronizasyon stratejileri seçenekleri de vardır. Senkronizasyon, Ethereum'un durumu hakkında en güncel bilgileri ne kadar hızlı alabileceğini ifade eder.

### Tam düğüm {#full-node}

- Tam blok zinciri verilerini depolar.
- Blok doğrulamaya katılır, tüm blokları ve durumları doğrular.
- Tüm durumlar tam bir düğümden türetilebilir.
- Ağa hizmet eder ve talep üzerine veri sağlar.

### Hafif düğüm {#light-node}

- Başlık zincirini saklar ve diğer her şeyi talep eder.
- Blok başlıklarındaki durum köklerine karşı verilerin geçerliliğini doğrulayabilir.
- Gigabaytlarca blok zinciri verisini depolamaya gücü yetmeyen gömülü cihazlar veya cep telefonları gibi düşük kapasiteli cihazlar için kullanışlıdır.

### Arşiv düğümü {#archive-node}

- Tam düğümde tutulan her şeyi depolar ve tarihsel durumların bir arşivini oluşturur. 4.000.000 numaralı bloktaki bir hesap bakiyesi gibi bir şeyi sorgulamak [veya OpenEthereum kullanarak madencilik yapmadan kendi işlem kümenizi basit ve güvenilir bir şekilde test etmek istiyorsanız gereklidir.](https://openethereum.github.io/JSONRPC-trace-module#trace_callmany).
- Bu veriler, arşiv düğümlerini ortalama kullanıcılar için daha az çekici hâle getiren ancak blok arayıcısı, cüzdan satıcıları ve zincir analizi gibi hizmetler için kullanışlı olabilen terabayt birimlerini temsil eder.

İstemcileri arşiv dışındaki herhangi bir modda senkronize etmek, budanmış blok zinciri verileriyle sonuçlanacaktır. Bu, tüm tarihsel durumların bir arşivinin olmadığı ancak tam düğümün talep üzerine bunları oluşturabileceği anlamına gelir.

## Neden bir Ethereum düğümü çalıştırmalıyım? {#why-should-i-run-an-ethereum-node}

Bir düğüm çalıştırmak, ekosistemi desteklerken Ethereum'u kimseye güvenmek zorunda kalmadan ve özel olarak kullanmanıza olanak tanır.

### Size faydaları {#benefits-to-you}

Kendi düğümünüzü çalıştırmak, Ethereum'u gerçekten özel, kendi kendine yeterli ve kimseye güvenmeniz gerekmeyen bir şekilde kullanmanızı sağlar. Verileri istemcinizle kendiniz doğrulayabileceğiniz için ağa güvenmeniz gerekmez. "Güvenme, doğrula." popüler bir blok zinciri deyimidir.

- Düğümünüz, tüm işlemleri ve blokları mutabakat kurallarına karşı kendi başına doğrular. Yani ağdaki diğer düğümlere bağlı olmanız veya onlara tamamen güvenmeniz gerekmez.
- Adreslerinizi ve bakiyelerinizi rastgele düğümlere sızdırmak zorunda kalmayacaksınız. Her şey kendi istemcinizle kontrol edilebilir.
- Kendi düğümünüzü kullanırsanız dapp'niz daha güvenli ve özel olabilir. [MetaMask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) ve diğer bazı cüzdanlar kolayca kendi yerel düğümünüze yönlendirilebilir.
- Kendi özel RPC uç noktalarınızı programlayabilirsiniz.
- **Süreçler Arası İletişim (IPC)** kullanarak düğümünüze bağlanabilir veya programınızı bir eklenti olarak yüklemek için düğümü yeniden yazabilirsiniz. Bu, işlemlerinizi olabildiğince hızlı bir şekilde değiştirmek için gereken düşük gecikme süresi sağlar (yani ön çalıştırma).

![Uygulamanız ve düğümleriniz aracılığıyla Ethereum'a erişim](./nodes.png)

### Ağ avantajları {#network-benefits}

Ethereum'un sağlığı, güvenliği ve operasyonel esnekliği için çeşitli düğümler bulunması önemlidir.

- Buna bağlı hafif istemciler için blok zinciri verilerine erişim sağlarlar. Yüksek kullanım zirvelerinde, hafif düğümlerin senkronize olmasına yardımcı olmak için yeterli sayıda tam düğüm olması gerekir. Hafif düğümler tüm blok zincirini saklamazlar, bunun yerine verileri [blok başlıklarındaki durum kökleri](/developers/docs/blocks/#block-anatomy) aracılığıyla doğrularlar. İhtiyaç duymaları hâlinde bloklardan daha fazla bilgi talep edebilirler.
- Tam düğümler, iş ispatı mutabakat kurallarını uygular, böylece onları takip etmeyen blokları kabul etmeleri için kandırılamazlar. Bu, ağda ekstra güvenlik sağlar: Tüm düğümler tam doğrulama yapmayan hafif düğümler olsaydı, madenciler ağa saldırabilir ve örneğin daha yüksek ödüllü bloklar oluşturabilirlerdi.

Tam bir düğüm çalıştırırsanız, tüm Ethereum ağı bundan yararlanır.

## Kendi düğümünüzü çalıştırma {#running-your-own-node}

Kendi Ethereum istemcinizi çalıştırmayı mı düşünüyorsunuz?

Daha acemi dostu bir giriş istiyorsanız, daha fazlasını öğrenmek için [bir düğüm çalıştır](/run-a-node) sayfamızı ziyaret edin.

Eğer daha teknik bir kullanıcıysanız, komut satırı ile nasıl [kendi düğümünüzü çalıştıracağınızı](/developers/docs/nodes-and-clients/run-a-node/) öğrenin!

### Projeler {#projects}

[**Bir istemci seçin ve talimatları takip edin**](#clients)

**ethnode -** **_Yerel geliştirme için bir Ethereum düğümü (Geth veya OpenEthereum) çalıştırın._**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode -** **_Ethereum ve işaret zinciri dahil, Web3 düğümlerini özel bir makinede çalıştırmak için bir işletim sistemi grafiksel kullanıcı arayüzü._**

- [dappnode.io](https://dappnode.io)

### Kaynaklar {#resources}

- [Ethereum Tam Düğümlerini Çalıştırma: Eksiksiz Bir Kılavuz](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _7 Kasım 2019 - Justin Leroux_
- [Düğüm Yapılandırması Kopya Kağıdı](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _5 Ocak 2019 - Afri Schoeden_
- [Bir Geth Düğümü Nasıl Kurulur ve Çalıştırılır](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _4 Ekim 2020 - Sahil Sen_
- [Bir OpenEthereum (eski adıyla Parity) Düğümü Nasıl Kurulur ve Çalıştırılır](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _22 Eylül 2020 - Sahil Sen_

## Alternatifler {#alternatives}

Kendi düğümünüzü çalıştırmak zor olabilir ve her zaman kendinizinkini çalıştırmanız gerekmez. Bu durumda [Infura](https://infura.io), [Alchemy](https://alchemyapi.io) veya [QuikNode](https://www.quiknode.io) gibi bir üçüncü taraf API sağlayıcısı kullanabilirsiniz. Alternatif olarak [ArchiveNode](https://archivenode.io/), Ethereum blok zincirindeki arşiv verilerini, başka türlü karşılayamayacak olan bağımsız geliştiricilere ulaştırmayı uman, topluluk tarafından finanse edilen bir Arşiv düğümüdür. Bu hizmetlerin kullanımına ilişkin bir genel bakış için [hizmet olarak düğümler](/developers/docs/nodes-and-clients/nodes-as-a-service/) makalesine bakın.

Birisi topluluğunuzda açık bir API'ye sahip bir Ethereum düğümü çalıştırırsa, [Özel RPC aracılığıyla](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) hafif cüzdanlarınızı (MetaMask gibi) bir topluluk düğümüne yönlendirebilirsiniz ve bazı rastgele güvenilir üçüncü taraflara kıyasla daha fazla gizlilik elde edersiniz.

Öte yandan, bir istemci çalıştırırsanız bu istemciyi, ihtiyacı olabilecek arkadaşlarınızla paylaşabilirsiniz.

## Yürütüm istemcileri (eskiden "Eth1 istemcileri") {#execution-clients}

Ethereum topluluğu, farklı programlama dilleri kullanan farklı ekipler tarafından geliştirilen birden çok açık kaynaklı yürütüm istemcisini (eskiden "Eth1 istemcileri" veya yalnızca "Ethereum istemcileri" olarak biliniyordu) yürütür. Bu, ağı daha güçlü ve daha çeşitli hâle getirir. İdeal hedef, herhangi bir istemcinin çoğunluk sağlamadığı bir çeşitlilik elde ederek tüm tek başarısızlık noktalarını azaltmaktır.

Bu tablo, farklı istemcileri özetlemektedir. Hepsi [istemci testlerini](https://github.com/ethereum/tests) başarıyla geçer ve ağ yükseltmeleriyle güncel kalmak için aktif olarak bakıma tabi tutulur.

| İstemci                                                                               | Dil      | İşletim sistemleri    | Ağlar                                      | Senkronizasyon stratejileri | Durum budaması  |
| ------------------------------------------------------------------------------------- | -------- | --------------------- | ------------------------------------------ | --------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)                                                    | Go       | Linux, Windows, macOS | Mainnet, Görli, Rinkeby, Ropsten           | Snap, Full                  | Archive, Pruned |
| [Nethermind](http://nethermind.io/)                                                   | C#, .NET | Linux, Windows, macOS | Mainnet, Görli, Ropsten, Rinkeby ve dahası | Fast, Beam, Archive         | Archive, Pruned |
| [Besu](https://besu.hyperledger.org/en/stable/)                                       | Java     | Linux, Windows, macOS | Mainnet, Rinkeby, Ropsten, Görli ve dahası | Fast, Full                  | Archive, Pruned |
| [Erigon](https://github.com/ledgerwatch/erigon)                                       | Go       | Linux, Windows, macOS | Mainnet, Görli, Rinkeby, Ropsten           | Full                        | Archive, Pruned |
| [OpenEthereum (Kullanımdan kaldırıldı)](https://github.com/openethereum/openethereum) | Rust     | Linux, Windows, macOS | Mainnet, Kovan, Ropsten ve dahası          | Warp, Full                  | Archive, Pruned |

**OpenEthereum'un [kullanımdan kaldırıldığını](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ve artık bakıma tabi olmadığını unutmayın.** Dikkatli kullanın ve tercihen başka bir istemci uygulamasına geçin.

Desteklenen ağlar hakkında daha fazla bilgi için [Ethereum ağları](/developers/docs/networks/) hakkında bilgi edinin.

### Farklı uygulamaların avantajları {#advantages-of-different-implementations}

Her istemcinin benzersiz kullanım durumları ve avantajları vardır, bu nedenle kendi tercihlerinize göre birini seçmelisiniz. Çeşitlilik, uygulamaların farklı özelliklere ve kullanıcı kitlelerine odaklanmasına olanak tanır. Özelliklere, desteğe, programlama diline veya lisanslara göre bir istemci seçmek isteyebilirsiniz.

#### Go Ethereum {#geth}

Go Ethereum (kısaca Geth), Ethereum protokolünün orijinal uygulamalarından biridir. Şu anda, kullanıcılar ve geliştiriciler için en büyük kullanıcı tabanına ve en çeşitli araçlara sahip en yaygın istemcidir. Go ile yazılmıştır, tamamen açık kaynak kodludur ve GNU LGPL v3 altında lisanslanmıştır.

#### OpenEthereum {#openethereum}

OpenEthereum hızlı, zengin özelliklere sahip ve gelişmiş bir CLI tabanlı Ethereum istemcisidir. Hızlı senkronizasyon ve maksimum çalışma süresi gerektiren hızlı ve güvenilir hizmetler için gerekli altyapıyı sağlamak üzere inşa edilmiştir. OpenEthereum'un hedefi en hızlı, en hafif ve en güvenli Ethereum istemcisi olmaktır. Aşağıdakiler için temiz ve modüler bir kod tabanı sağlar:

- kolay özelleştirme.
- hizmetlere veya ürünlere hafif entegrasyon.
- minimum bellek ve depolama alanı.

OpenEthereum, son teknoloji Rust programlama dili kullanılarak geliştirilmiştir ve GPLv3 kapsamında lisanslanmıştır.

**OpenEthereum'un [kullanımdan kaldırıldığını](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ve artık bakıma tabi olmadığını unutmayın.** Dikkatli kullanın ve tercihen başka bir istemci uygulamasına geçin.

#### Nethermind {#nethermind}

Nethermind, ARM dahil tüm büyük platformlarda çalışan C# .NET teknoloji yığınıyla oluşturulmuş bir Ethereum uygulamasıdır. Aşağıdakilerle harika performans sunar:

- optimize edilmiş bir sanal makine
- durum erişimi
- prometheus/Grafana gösterge panelleri, sıralı kurumsal kayıt desteği, JSON RPC izleme ve analiz eklentileri gibi ağ iletişimi ve zengin özellikler.

Nethermind ayrıca premium kullanıcılar için [ayrıntılı belgeler](https://docs.nethermind.io), güçlü geliştirici desteği, çevrimiçi bir topluluk ve 7/24 desteğe sahiptir.

#### Besu {#besu}

Hyperledger Besu, genel ve izin verilen ağlar için kurumsal düzeyde bir Ethereum istemcisidir. Kapsamlı izleme özelliğinden GraphQL'yi takip etmeye kadar tüm Ethereum Mainnet özelliklerini çalıştırır, ve hem açık topluluk kanallarında hem de işletmeler için ticari SLA'lar aracılığıyla ConsenSys tarafından desteklenir. Java ile yazılmıştır ve Apache 2.0 lisanslıdır.

#### Erigon {#erigon}

Eskiden Erigon olarak bilinen Erigon, hız ve disk alanı verimliliğine yönelik bir Go Ethereum çatalıdır. Erigon, şu anda Go'da yazılmış, ancak diğer dillerde uygulanması planlanan Ethereum'un tamamen yeniden tasarlanmış bir uygulamasıdır. Erigon'un amacı, Ethereum'un daha hızlı, daha modüler ve daha optimize edilmiş bir uygulamasını sağlamaktır. 3 günden kısa bir sürede 2 Tb'den daha az disk alanı kullanarak tam bir arşiv düğümü senkronizasyonu gerçekleştirebilir

### Senkronizasyon modları {#sync-modes}

Ağdaki mevcut verileri takip etmek ve doğrulamak için Ethereum istemcisinin en son ağ durumuyla senkronize olması gerekir. Bu, eşlerden veri indirerek, bütünlüklerini kriptografik olarak doğrulayarak ve yerel bir blok zinciri veri tabanı oluşturarak yapılır.

Senkronizasyon modları, çeşitli değiş tokuşlarla bu sürece farklı yaklaşımları temsil eder. İstemciler, eşitleme algoritmalarının uygulanmasında da farklılık gösterir. Uygulamaya ilişkin ayrıntılar için her zaman seçtiğiniz istemcinin resmi belgelerine bakın.

#### Stratejilere genel bakış {#overview-of-strategies}

Mainnet'e hazır istemcilerde kullanılan senkronizasyon yaklaşımlarına genel bakış:

##### Full senkronizasyon {#full-sync}

Full senkronizasyon, tüm blokları (başlıklar, işlemler ve makbuzlar dahil) indirir ve her bloğu başlangıçtan yürüterek aşamalı olarak blok zincirinin durumunu oluşturur.

- Her işlemi doğrulayarak güven ihtiyacını en aza indirir ve en yüksek güvenliği sunar.
- Artan sayıda işlemle, tüm işlemlerin işlenmesi günler ila haftalar alabilir.

##### Fast senkronizasyon

Fast senkronizasyon, tüm blokları (başlıklar, işlemler ve makbuzlar dahil) indirir, tüm başlıkları doğrular, durumu indirir ve başlıklara göre doğrular.

- Mutabakat mekanizmasının güvenliğine dayanır.
- Senkronizasyon yalnızca birkaç saat sürer.

##### Light senkronizasyon

Light istemci modu, tüm blok başlıklarını indirir, verileri bloklar ve bazılarını rastgele doğrular. Zincirin yalnızca ucunu güvenilen kontrol noktasından eşitler.

- Geliştiricilere ve mutabakat mekanizmasına güvenerek yalnızca en son durumu alır.
- İstemci birkaç dakika içinde mevcut ağ durumuyla kullanıma hazır.

[Light istemciler hakkında daha fazlası](https://www.parity.io/blog/what-is-a-light-client/)

##### Snap senkronizasyonu

Geth tarafından uygulandı. Eşler tarafından sunulan dinamik anlık görüntüleri kullanarak, ara ağaç düğümlerini indirmeden tüm hesap ve depolama verilerini alır ve ardından Merkle ağacını yerel olarak yeniden yapılandırır.

- Geth tarafından geliştirilen en hızlı senkronizasyon stratejisi, şu anda varsayılandır
- Güvenlikten ödün vermeden çok fazla disk kullanımı ve ağ bant genişliği tasarrufu sağlar.

[Snap hakkında daha fazla bilgi](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

##### Warp senkronizasyonu

OpenEthereum tarafından uygulanmaktadır. Düğümler düzenli olarak mutabakat açısından kritik bir durum anlık görüntüsü oluşturur ve herhangi bir eş bu anlık görüntüleri ağ üzerinden alabilir ve bu noktadan itibaren hızlı bir senkronizasyon sağlar.

- OpenEthereum'un en hızlı ve varsayılan senkronizasyon modu, eşler tarafından sunulan statik anlık görüntülere dayanır.
- Belirli güvenlik avantajları olmayan "anlık senkronizasyon" (snap sync) ile benzer bir strateji.

[Warp hakkında daha fazla bilgi](https://openethereum.github.io/Beginner-Introduction#warping---no-warp)

##### Beam senkronizasyonu

Nethermind ve Trinity tarafından uygulandı. Hızlı senkronizasyon gibi çalışır, ancak aynı zamanda en son blokları yürütmek için gereken verileri indirerek, zinciri başlattıktan sonraki ilk birkaç dakika içinde sorgulamanıza olanak tanır.

- Önce durumu eşitler ve RPC'yi birkaç dakika içinde sorgulamanıza olanak tanır.
- Hâlâ geliştirme aşamasında ve tam olarak güvenilir değil, arka planda senkronizasyon yavaşlar ve RPC yanıtları başarısız olabilir.

[Beam hakkında daha fazla bilgi](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)

#### İstemcide kurulum {#client-setup}

İstemciler, ihtiyaçlarınıza uygun zengin yapılandırma seçenekleri sunar. Güvenlik düzeyine, mevcut verilere ve maliyete göre size en uygun olanı seçin. Senkronizasyon algoritmasının yanı sıra, farklı türdeki eski verilerin budanmasını da ayarlayabilirsiniz. Budama, örneğin son bloklardan erişilemeyen durum ağaç düğümlerini kaldırma gibi eski verilerin silinmesini sağlar.

Hangi senkronizasyon modunun varsayılan olduğunu öğrenmek için istemcinin belgelerine veya yardım sayfasına dikkat edin. Kurulum sırasında tercih ettiğiniz senkronizasyon türünü şu şekilde tanımlayabilirsiniz:

**[GETH](https://geth.ethereum.org/) veya [ERIGON](https://github.com/ledgerwatch/erigon)'da light senkronizasyonunu ayarlama**

`geth --syncmode "light"`

Daha fazla ayrıntı için [Geth light düğümünü çalıştırma](/developers/tutorials/run-light-node-geth/) hakkındaki öğreticiye bakın.

**[Besu](https://besu.hyperledger.org/)'da arşivle full senkronizasyonu ayarlama**

`besu --sync-mode=FULL`

Diğer tüm yapılandırmalar gibi, başlangıç bayrağıyla veya yapılandırma dosyasında tanımlanabilir. Başka bir örnek, ilk başlatma sırasında bir yapılandırma seçmenizi isteyen ve bir yapılandırma dosyası oluşturan [Nethermind](https://docs.nethermind.io/nethermind/)'dır.

## Mutabakat istemcileri (eski adıyla "Eth2" istemcileri) {#consensus-clients}

[Mutabakat yükseltmelerini](/upgrades/beacon-chain/) desteklemek için birden fazla mutabakat istemcisi (eskiden "Eth2" istemcisi olarak biliniyordu) vardır. İşaret Zincirini çalıştırırlar ve [Birleştirmeden](/upgrades/merge/) sonra yürütüm istemcilerine hisse ispatı mutabakat mekanizması sağlayacaklar.

[Mutabakat istemcilerini görüntüle](/upgrades/get-involved/#clients).

| İstemci                                                     | Dil        | İşletim sistemleri    | Ağlar                                   |
| ----------------------------------------------------------- | ---------- | --------------------- | --------------------------------------- |
| [Teku](https://pegasys.tech/teku)                           | Java       | Linux, Windows, macOS | İşaret Zinciri, Prater                  |
| [Nimbus](https://nimbus.team/)                              | Nim        | Linux, Windows, macOS | İşaret Zinciri, Prater                  |
| [Lighthouse](https://lighthouse-book.sigmaprime.io/)        | Rust       | Linux, Windows, macOS | İşaret Zinciri, Prater, Pyrmont         |
| [Lodestar](https://lodestar.chainsafe.io/)                  | TypeScript | Linux, Windows, macOS | İşaret Zinciri, Prater                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/) | Go         | Linux, Windows, macOS | İşaret Zinciri, Gnosis, Prater, Pyrmont |

## Donanım {#hardware}

Donanım gereksinimleri istemciye göre farklılık gösterir, ancak düğümün yalnızca senkronize kalması gerektiğinden bu gereksinimler genellikle pek yüksek değildir. Çok daha fazla bilgi işlem gücü gerektiren madencilikle karıştırmayın. Bununla birlikte, senkronizasyon süresi ve performansı, daha güçlü donanımlarla iyileşir. İhtiyaçlarınıza ve isteklerinize bağlı olarak; Ethereum bilgisayarınızda, ev sunucunuzda, tek kartlı bilgisayarlarda veya buluttaki sanal özel sunucularda çalıştırılabilir.

Kendi düğümünüzü çalıştırmanın kolay bir yolu, [DAppNode](https://dappnode.io/) gibi "tak ve çalıştır" kutularını kullanmaktır. Basit bir kullanıcı arayüzü ile istemcileri ve bunlara bağlı uygulamaları çalıştırmak için donanım sağlar.

### Gereksinimler {#requirements}

Herhangi bir istemciyi kurmadan önce, lütfen bilgisayarınızın onu çalıştırmak için yeterli kaynaklara sahip olduğundan emin olun. Minimum ve önerilen gereksinimler aşağıda bulunabilir, ancak en önemli kısım disk alanıdır. Ethereum blok zincirini senkronize etmek yoğun girdi/çıktı kullanır. Katı hâl sürücüsü (SSD) kullanmak en iyisidir. HDD'de bir Ethereum istemcisi çalıştırmak için önbellek olarak kullanmak üzere en az 8 GB RAM'e ihtiyacınız olacaktır.

#### Minimum gereksinimler {#recommended-specifications}

- 2+ çekirdekli CPU
- SSD ile minimum 4 GB RAM, HDD'niz varsa 8 GB+
- 8 MBit/sn bant genişliği

#### Tavsiye edilen özellikler {#recommended-specifications}

- 4+ çekirdekli hızlı CPU
- 16 GB+ RAM
- En az 500 GB boş alana sahip hızlı SSD
- 25+ MBit/sn bant genişliği

Seçtiğiniz senkronizasyon modu, alan gereksinimlerini etkileyecektir ancak aşağıda her istemci için ihtiyaç duyacağınız disk alanına dair tahminler sunduk.

| İstemci      | Disk alanı (fast senkronizasyon) | Disk boyutu (full archive) |
| ------------ | -------------------------------- | -------------------------- |
| Geth         | 400 GB+                          | 6 TB+                      |
| OpenEthereum | 280 GB+                          | 6 TB+                      |
| Nethermind   | 200 GB+                          | 5 TB+                      |
| Besu         | 750 GB+                          | 5 TB+                      |
| Erigon       | Yok                              | 1 TB+                      |

- Not: Erigon Fast Senkronizasyon yapmaz, ancak Full Pruning mümkündür (yaklaşık 500 GB)

![Full senkronizasyon için gereken GB miktarının artışta olduğunu gösteren bir grafik](./full-sync.png)

![Archive senkronizasyonu için gereken GB miktarının artışta olduğunu gösteren bir grafik](./archive-sync.png)

Bu grafikler, depolama gereksinimlerinin sürekli değişimlerini gösterir. Geth ve OpenEthereum hakkında en güncel veriler için [full senkronizasyon verilerine](https://etherscan.io/chartsync/chaindefault) ve [archive senkronizasyon verilerine](https://etherscan.io/chartsync/chainarchive) göz atın.

### Tek kartlı bir bilgisayarda Ethereum {#ethereum-on-a-single-board-computer}

Ethereum düğümünü çalıştırmanın en uygun ve ucuz yolu, Raspberry Pi gibi ARM mimarisine sahip tek kartlı bir bilgisayar kullanmaktır. [ARM üzerinde Ethereum](https://twitter.com/EthereumOnARM); Geth, OpenEthereum, Nethermind ve Besu istemcilerinin görüntülerini sağlar. İşte [bir ARM istemcisinin nasıl oluşturulacağı ve kurulacağı](/developers/tutorials/run-node-raspberry-pi/) hakkında basit bir eğitim.

Bunun gibi küçük, uygun fiyatlı ve verimli cihazlar, evde bir düğüm çalıştırmak için idealdir.

## Daha fazla bilgi {#further-reading}

İnternette Ethereum istemcileri hakkında birçok bilgi var. İşte size yardımcı olabilecek birkaç kaynak.

- [Ethereum 101 - 2. Bölüm - Düğümleri Anlamak](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 Şubat 2019_
- [Ethereum Tam Düğümlerini Çalıştırmak: Pek Motivasyonu Olmayanlar İçin Bir Kılavuz](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Kasım 2019_
- [Bir Ethereum Düğümü Çalıştırma](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, sık sık güncellenir_
- [Tam doğrulanmış bir Ethereum düğümü olmak için gereken donanımın analizi](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 Eylül 2018_
- [Ethereum Mainnet'te Hyperledger Besu Düğümü Çalıştırma: Faydaları, Gereksinimleri ve Kurulum](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Mayıs 2020_

## İlgili konular {#related-topics}

- [Bloklar](/developers/docs/blocks/)
- [Ağlar](/developers/docs/networks/)

## İlgili öğreticiler {#related-tutorials}

- [Geth ile Düğüm Çalıştırma](/developers/tutorials/run-light-node-geth/) _– Geth nasıl indirilir, kurulur ve çalıştırılır. Senkronizasyon modlarını, JavaScript konsolunu ve daha fazlasını kapsar._
- [Raspberry Pi 4'ünüzü, sadece MicroSD kartı flaşlayarak doğrulayıcı düğüme dönüştürün – Kurulum kılavuzu](/developers/tutorials/run-node-raspberry-pi/) _– Raspberry Pi 4'ünüzü flaşlayın, bir ethernet kablosu takın, SSD diskini bağlayın ve Raspberry Pi 4'ü yürütüm katmanını (Mainnet) ve/veya mutabakat katmanını (İşaret zinciri / doğrulayıcı) çalıştıran tam bir Ethereum düğümüne dönüştürmek için cihazı çalıştırın._
