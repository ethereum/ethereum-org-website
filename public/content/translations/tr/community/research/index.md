---
title: Ethereum araştırmasının aktif alanları
description: Açık araştırmanın farklı alanlarını keşfedin ve nasıl katkı vereceğinizi öğrenin.
lang: tr
---

# Ethereum araştırmalarının aktif olduğu alanlar {#active-areas-of-ethereum-research}

Ethereum'un en önemli güçlerinden biri, aktif bir araştırma ve mühendislik topluluğunun onu sürekli geliştirmesidir. Dünya çapında birçok hevesli ve yetenekli insan Ethereum'daki öne çıkan sorunlara kendilerini adamak ister ancak bu sorunların ne olduğunu bulmak her zaman kolay değildir. Bu sayfa, Ethereum'un kullandığı en son teknolojilere ilişkin kabataslak bir rehberdir ve başlıca aktif araştırma alanlarını ana hatlarıyla açıklar.

## Ethereum araştırmaları nasıl işler? {#how-ethereum-research-works}

Ethereum araştırması genellikle [Merkeziyetsiz Bilimin (DeSci)] prensiplerini destekler şekilde açık ve şeffaftır (https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Kültürü; örneğin çalıştırılabilir defterler aracılığıyla araştırma araçlarını ve çıktılarını mümkün olduğunca açık ve interaktif hale getimeyi hedefler. Ethereum araştırmaları, yeni fikirlerin geleneksel yayınlarda olduğu gibi tekrar tekrar yapılan incelemelerden sonra toplulukla paylaşılmasından ziyade [ethresear.ch] (https://ethresear.ch/) gibi forumlarda açık olarak tartışılmasıyla hızlı bir şekilde ilerler.

## Genel araştırma kaynakları {#general-research-resources}

Spesifik konudan bağımsız olarak, [ethresear.ch](https://ethresear.ch) ve [Eth R&D discord kanalında](https://discord.gg/qGpsxSA) Ethereum araştırmalarıyla ilgili pek çok bilgi mevcuttur. Bunlar, Ethereum araştırmacılarının en güncel fikirleri ve geliştirme fırsatlarını tartıştığı birincil platformlardır.

[DelphiDigital] tarafından Mayıs 2022'de yayınlanan bu rapor (https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) Ethereum yol haritasıyla ilgili iyi bir özet sunuyor.

## Fon Kaynakları {#sources-of-funding}

Ethereum araştırmalarında yer alabilir ve bundan gelir elde edebilirsiniz! Mesela [Ethereum Foundation](/foundation/) yakın zamanda bir [Akademik Hibe Fonlama turu] başlattı. (https://esp.ethereum.foundation/academic-grants). [Ethereum hibeleri sayfasında] (/community/grants/) aktif ve yakında ortaya çıkacak fonlama fırsatlarıyla ilgili bilgiler bulabilirsiniz.

## Protokol araştırması {#protocol-research}

Protokol araştırması, Ethereum'un ana katmanı ile ilgilidir - bunlar düğümlerin nasıl bağlandığı, iletişim kurduğu, takas ettiği, Ethereum verisini depoladığı ve blok zincirin durumu hakkında mutabakata vardığını belirleyen birtakım kurallardır. Protokol araştırması iki üst kategoriye bölünür: mutabakat ve yürütme.

### Mutabakat {#consensus}

Mutabakat araştırması, [Ethereum'un hisse ispatı mekanizması](/developers/docs/consensus-mechanisms/pos/) ile ilgilidir. Bazı örnek mutabakat araştırması konuları şunlardır:

- açıkları tespit etmek ve kapatmak;
- kriptoekonomik güvenliği nicelik açısından belirlemek;
- istemci uygulamalarının güvenliğini veya performansını artırmak;
- ve hafif istemciler geliştirmek.

İleriye dönük araştırmayla birlikte, Ethereum'da önemli gelişmelerin önünü açmak için protokole yuva kesinliği gibi bazı esaslı yeniden tasarım uygulamaları da araştırılıyor. Dahası, fikir birliği istemcileri arasındaki eşler arası ağ oluşumunun verimliliği, güvenliği ve gözlemlenmesi konuları da önemli araştırma konularıdır.

#### Arka plan okuması {#background-reading}

- [Hisse ispatına giriş](/developers/docs/consensus-mechanisms/pos/)
- [Casper-FFG makalesi](https://arxiv.org/abs/1710.09437)
- [Casper-FFG açıklayıcısı](https://arxiv.org/abs/1710.09437)
- [Gasper makalesi](https://arxiv.org/abs/2003.03052)

#### Yakın geçmişteki araştırmalar {#recent-research}

- [Ethresear.ch Mutabakatı](https://ethresear.ch/c/consensus/29)
- [Kullanılabilirlik/Kesinlik ikilemi](https://arxiv.org/abs/2009.04987)
- [Tek yuva kesinliği](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Önerici-inşacı ayrımı](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Yürütme {#execution}

Yürütüm katmanı işlemleri yürütmeyle, [Ethereum sanal makinesini (EVM)](/developers/docs/evm/) çalıştırmakla ve yürütme yüklerinin oluşturulup fikir birliği katmanına iletilmesiyle ilgilenir. Konu ile ilgili aşağıdakiler dahil birçok aktif araştırma alanı vardır:

- hafif-istemci desteğini geliştirmek;
- gaz limiti araştırmaları;
- yeni veri yapılarını sisteme dahil etmek (ör. Verkle Ağaçları).

#### Arka plan okuması {#background-reading-1}

- [EVM'ye Giriş](/developers/docs/evm)
- [Ethresear.ch yürütüm katmanı](https://ethresear.ch/c/execution-layer-research/37)

#### Yakın geçmişteki araştırmalar {#recent-research-1}

- [Veritabanı optimizasyonları](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Durum sonlanımı](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Durum sonlanımına giden yollar](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Verkle and durum sonlanımı önerisi](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Geçmiş yönetimi](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle Ağaçları](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Veri kullanılabilirlik örneklendirmesi](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## İstemci Geliştirme {#client-development}

Ethereum istemcileri Ethereum protokolünün uygulamalarıdır. İstemci geliştirme süreci, protokol araştırmalarından elde edilen çıktıları istemcilere entegre ederek hayata geçirir. İstemci geliştirme, spesifik uygulamaları inşa etmekle birlikte istemci özelliklerini de kapsar.

İki yazılımı çalıştırmak için bir Ethereum düğümüne ihtiyaç vardır:

1. dedikodu bloklarının, mutabakat mantığının ve blokzincirin başının kaydını tutan bir fikir birliği istemcisi
2. Ethereum Sanal Makinesi'ni destekleyen ve akıllı sözleşmeler ile işlemleri yürürlüğe sokan bir yürütüm işlemcisi

Düğümler ve istemciler hakkında daha detaylı bilgi ve güncel istemcilerin bir listesi için buraya [düğümler ve istemciler sayfası](/developers/docs/nodes-and-clients/) göz atın. Ayrıca bütün Ethereum güncellemelerinin tarihçesini [tarihçe sayfasında](/history/) bulabilirsiniz.

### Yürütüm İstemcileri {#execution-clients}

- [Yürütüm istemcisi spesifikasyonu](https://github.com/ethereum/execution-specs)
- [Yürütüm API'si spesifikasyonu](https://github.com/ethereum/execution-apis)

### Fikir Birliği İstemcileri {#consensus-clients}

- [Fikir birliği istemcisi spesifikasyonu](https://github.com/ethereum/consensus-specs)
- [İşaret API'si spesifikasyonu](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Ölçeklendirme ve performans {#scaling-and-performance}

Ethereum'un ölçeklendirilmesi, Ethereum araştırmacılarının odaklandığı önemli bir noktadır. Şu andaki yaklaşımlar, işlemlerinin yükünü toplamalara bindirme ve onları veri blob'ları kullanarak olabildiğince masrafsız hale getirmeyi kapsıyor. Ethereum'un ölçeklendirilmesine dair başlangıç seviyesinde bilgileri [ölçeklendirme sayfamızda](/developers/docs/scaling) bulabilirsiniz.

### Katman 2 {#layer-2}

Şu anda Ethereum'u ölçeklendiren ve toplu işlemleri Ethereum katman 1'de güvence altına almak için farklı teknikler kullanan birkaç Katman 2 protokolü mevcuttur. Bu, yoğun araştırma ve geliştirme süreçleriyle hızla büyüyen bir konudur.

#### Arka plan okuması {#background-reading-2}

- [Katman 2'ye giriş](/layer-2/)
- [Polynya: Toplamalar, Veri Erişilebilirliği ve modüler zincirler](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Yakın geçmişteki araştırmalar {#recent-research-2}

- [Arbitrum'un sıralayıcılar için adil sıralaması](https://eprint.iacr.org/2021/1465)
- [ethresear.ch Katman 2](https://ethresear.ch/c/layer-2/32)
- [Toplama merkezli yol haritası](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Köprüler{#bridges}

Katman 2'nin daha çok araştırma ve geliştirme gerektiren spesifik alanlarından biri, güvenli ve performanslı köprülerdir. Buna, farklı Katman 2'ler ve Katman 1 ile Katman 2 arası köprüler dahildir. Bu, köprülerin bilgisayar korsanlarının sıklıkla hedef aldığı yerler olması nedeniyle özellikle önemli bir araştırma alanıdır.

#### Arka plan okuması {#background-reading-3}

- [Blokzincir köprülerine giriş](/bridges/)
- [Vitalik'in köprülerle ilgili görüşleri](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Blokzincir köprüleriyle ilgili makale](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Köprülerde kilitli değer](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Yakın geçmişteki araştırmalar {#recent-research-3}

- [Köprüleri doğrulama](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Parçalama {#sharding}

Ethereum blokzincirinin parçalanması, gelişim yol haritasının uzun süredir bir parçası olmuştur. Ancak, "Danksharding" gibi yeni ölçeklendirme çözümleri şu anda ön plandadır.

Tam Danksharding'in öncüsü olan ve Proto-Danksharding olarak da bilinen güncelleme, Cancun-Deneb ("Dencun") ağ yükseltmesi ile kullanıma alındı.

[Dencun yükseltmesiyle ilgili daha fazla bilgi](/roadmap/dencun/)

#### Arka plan okuması {#background-reading-4}

- [Proto-Danksharding notları](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless'ın Danksharding videosu](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Ethereum Parçalama Araştırma Özeti](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Yakın geçmişteki araştırmalar {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Parçalama ve veri erişilebilirliği örneklemesine dair Vitalik'in yazısı](https://hackmd.io/@vbuterin/sharding_proposal)

### Donanım {#hardware}

Orta düzeyde bir donanımda [düğüm çalıştırmak](/developers/docs/nodes-and-clients/run-a-node/), Ethereum'un merkeziyetsiz kalabilmesi açısından önemlidir. Bundan dolayı, düğüm çalıştırmak için gereken donanım gerekliliklerini minimize etmeye yönelik aktif araştırmalar önemli bir araştırma alanıdır.

#### Arka plan okuması {#background-reading-5}

- [ARM'de Ethereum](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Yakın geçmişteki araştırmalar {#recent-research-5}

- [FPGA'ler üzerinde ecdsa](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Güvenlik {#security}

Güvenlik; dolandırıcılık/taciz koruması, cüzdan koruması, donanım koruması, kripto-ekonomik koruması, hata tespiti, uygulama testleri, istemci yazılımcıları ve anahtar yönetimi gibi konuları kapsayan çok geniş bir konudur. Bu alanlardaki bilgilere katkıda bulunmak, ana akım tarafından benimsenmeye yardımcı olur.

### Kriptografi ve ZKP {#cryptography--zkp}

Sıfır bilgili ispatlar (ZKP) ve kriptografi, Ethereum ve uygulamalarına gizlilik ve güvenlik kazandırmak adına kritik öneme sahiptir. Sıfır bilgi, birçok açık araştırma ve geliştirme imkânına sahip, oldukça genç ama hızlı ilerleyen bir alandır. Bazı olasılıklar arasında, [Keccak karma algoritmasının](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview) daha verimli uygulamalarının geliştirilmesi, şu anda mevcut olandan daha iyi polinom taahhütlerinin bulunması veya ecdsa açık anahtar üretimi ve imza doğrulama devrelerinin maliyetinin düşürülmesi yer alır.

#### Arka plan okuması {#background-reading-6}

- [0xparc bloğu](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Zero Knowledge podcast'i](https://zeroknowledge.fm/)

#### Yakın geçmişteki araştırmalar {#recent-research-6}

- [Eliptik eğri kriptografisinde son ilerlemeler](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Cüzdanlar {#wallets}

Ethereum cüzdanları; tarayıcı eklentileri, masaüstü ve mobil uygulamalar veya Ethereum üzerindeki akıllı sözleşmeler olabilir. Tekil kullanıcı anahtar yönetimi ile ilgili risklerin bir kısmını azaltmaya yönelik sosyal kurtarma cüzdanlarına yönelik aktif araştırmalar bulunmaktadır. Cüzdanların gelişimiyle birlikte yeni ortaya çıkan önemli bir araştırma alanı olan alternatif hesap soyutlama biçimleri üzerindeki araştırmalar da sürmektedir.

#### Arka plan okuması {#background-reading-7}

- [Cüzdanlara giriş](/wallets/)
- [Cüzdan güvenliğine giriş](/security/)
- [ethresear.ch Güvenlik](https://ethresear.ch/tag/security)
- [EIP-2938 Hesap Soyutlama](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Hesap Soyutlama](https://eips.ethereum.org/EIPS/eip-4337)

#### Yakın geçmişteki araştırmalar {#recent-research-7}

- [Doğrulama odaklı akıllı sözleşme cüzdanları](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Hesapların geleceği](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH ve AUTHCALL İşlem Kodları](https://eips.ethereum.org/EIPS/eip-3074)
- [Bir EOA adresinde kod yayımlama](https://eips.ethereum.org/EIPS/eip-5003)

## Topluluk, eğitim ve sosyal yardım {#community-education-and-outreach}

Ethereum'a yeni kullanıcılar çekmek için yeni eğitim kaynakları ve topluma ulaşma yöntemleri gerekir. Buna blog gönderileri ve makaleler, kitaplar, podcast'ler, meme'ler, eğitim kaynakları, etkinlikler ve topluluk inşa eden, yeni gelenleri hoş karşılayan ve insanları Ethereum ile ilgili bilgilendiren her şey dahil olabilir.

### UX/UI {#uxui}

Daha çok kişiyi Ethereum'a başlatmak için ekosistem, UX/UI'yi geliştirmelidir. Bu tasarımcıların ve ürün uzmanlarının, cüzdanların ve uygulamaların tasarımlarını yeniden incelemesini gerektirecektir.

#### Arkaplan okuması {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Yakın geçmişteki araştırmalar {#recent-research-8}

- [Web3 Tasarım Discord'u](https://discord.gg/FsCFPMTSm9)
- [Web3 Tasarım İlkeleri](https://www.web3designprinciples.com/)
- [Ethereum Magicians UX tartışması](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Ekonomi {#economics}

Ethereum'da ekonomi araştırmaları genel olarak iki yaklaşımı kullanır: ekonomik teşviklere dayanan mekanizmaların güvenliğini doğrulamak ("mikroekonomi") ve protokoller, uygulamalar ve kullanıcılar arası değer akışını analiz etmek ("makroekonomi"). Ethereum'un kendi varlığına (ether) ve üzerinde inşa edilmiş jetonlara (örneğin, NFT'ler ve ERC20 jetonları) bağlı olan kompleks kriptoekonomik faktörler bulunmaktadır.

#### Arka plan okuması {#background-reading-9}

- [Robust Incentives Group](https://ethereum.github.io/rig/)
- [Devconnect'te ETHconomics çalıştayı](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Yakın geçmişteki araştırmalar {#recent-research-9}

- [EIP1559'un ampirik analizi](https://arxiv.org/abs/2201.05574)
- [Dolaşımdaki arz dengesi](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [MEV'yi nicelik açısından belirleme: Orman ne kadar karanlık?](https://arxiv.org/abs/2101.05511)

### Blok alanı ve ağ ücreti piyasaları {#blockspace-fee-markets}

Blok alanı piyasaları, son kullanıcı işlemlerinin doğrudan Ethereum (Katman 1) veya köprülenmiş ağlar (örneğin, toplamalar) üzerinden dahil edilmesini düzenler. Ethereum üzerinde, işlemler protokolde EIP-1559 olarak yayınlanmış bulunan ücret piyasasına gönderilirler, bu da zinciri spamdan ve fiyat tıkanıklıklarından korur. İki katmanda da, işlemler Maksimum Çıkarılabilir Değer (MEV) olarak bilinen dışsallıklar ortaya çıkarabilir, bu da bu dışsallıkların elde edilmesi veya yönetilmesi için yeni piyasa yapılarını teşvik eder.

#### Arka plan okuması {#background-reading-10}

- [Ethereum Blokzinciri için İşlem Ücreti Mekanizması Tasarımı: EIP-1559'a dair bir Ekonomik Analiz] (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559'un Simülasyonları (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Başlangıç prensiplerinden başlayarak toplama ekonomisi](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Merkeziyetsiz Borsalarda Önden Koşma Saldırısı, İşlemleri Yeniden Sıralama ve Mutabakat İstikrarsızlığı](https://arxiv.org/abs/1904.05234)

#### Yakın geçmişteki araştırmalar {#recent-research-10}

- [Çok boyutlu EIP-1559 video sunumu](https://youtu.be/QbR4MTgnCko)
- [Alanlar arası MEV](http://arxiv.org/abs/2112.01472)
- [MEV mezatları](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Hisse ispatı teşvikleri {#proof-of-stake-incentives}

Doğrulayıcılar Ethereum'un kendi varlığını (ether) aldatıcı davranışlara karşı teminat olarak kullanırlar. Bunun kriptoekonomik kısmı, ağın ne kadar güvenli olduğunu belirler. İleri düzey doğrulayıcılar, teşvik katmanının inceliklerini kötüye kullanarak açık saldırılar gerçekleştirebilir.

#### Arka plan okuması {#background-reading-11}

- [Ethereum ekonomisinde uzmanlaşma dersi ve ekonomik model](https://github.com/CADLabs/ethereum-economic-model)
- [PoS teşviklerinin simülasyonları (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Yakın geçmişteki araştırmalar {#recent-research-11}

- [Teklif sahibi/oluşturucu ayrımı (PBS) kapsamındaki işlemlerin sansür direncini artırma](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [PoS Ethereum'a Üç Saldırı](https://arxiv.org/abs/2110.10086)

### Likit hisseleme ve türevleri {#liquid-staking-and-derivatives}

Likit hisseleme, 32 ETH'den azına sahip olan kullanıcıların DeFi'da kullanılabilen hisselenen ether'i temsil eden bir jeton için ether takaslayarak hisseleme getirisi elde edebilmesini sağlar. Ancak, Ethereum'un güvenliği (ör. merkeziyetsizlik riskleri) üzerindeki etkisi gibi, likit hisseleme ile ilgili teşvik ve piyasa dinamikleri de hâlâ keşfedilmektedir.

#### Arka plan okuması {#background-reading-12}

- [Ethresear.ch likit hisseleme](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Güvene dayanmayan Ethereum hisselemesine giden yol](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Hisseleme protokolü tanıtımı](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Yakın geçmişteki araştırmalar {#recent-research-12}

- [Lido'dan geri çekimleri işlemek](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Çekim kimlik bilgileri](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Likit Hisseleme Türevlerinin riskleri](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Test etme {#testing}

### Resmi doğrulama {#formal-verification}

Resmi doğrulama, Ethereum'un mutabakat özelliklerinin doğru ve hatasız olduğunu doğrulamak için kod yazmaktır. Spesifikasyonun, bakım ve geliştirme gerektiren ve Python'da yazılmış çalıştırılabilir bir versiyonu da bulunmaktadır. Yapılacak yeni araştırmalar, spesifikasyonun Python uygulamasını iyileştirmeye ve doğruluğu daha etkin bir şekilde doğrulayıp sorunları belirleyebilen araçlar eklenmesine yardımcı olabilir.

#### Arka plan okuması {#background-reading-13}

- [Resmi doğrulamaya giriş](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Resmi Doğrulama (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Yakın geçmişteki araştırmalar {#recent-research-13}

- [Depozito sözleşmesinin resmi doğrulaması](https://github.com/runtimeverification/deposit-contract-verification)
- [Beacon zincirinin spesifikasyonunun resmi doğrulaması](https://github.com/runtimeverification/deposit-contract-verification)

## Veri bilimi ve analitiği {#data-science-and-analytics}

Ethereum üzerindeki aktiviteler ve ağın sağlığı hakkında detaylı bilgi sunan daha fazla veri analiz aracına ve gösterge paneline ihtiyaç vardır.

### Arka plan okuması {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [İstemci çeşitliliği panosu](https://clientdiversity.org/)

#### Yakın geçmişteki araştırmalar {#recent-research-14}

- [Robust Incentives Group Veri Analizi](https://ethereum.github.io/rig/)

## Uygulamalar ve araçlar {#apps-and-tooling}

Uygulama katmanı, Ethereum'un ana katmanında işlemleri çözen çeşitli programlardan oluşan bir ekosistemi destekler. Geliştirme ekipleri devamlı biçimde önemli Web2 uygulamalarının birleştirilebilir, izin gerektirmeyen ve sansüre dayanıklı sürümlerini oluşturmak veya tamamen yeni Web3'ye ait konseptler oluşturmak için Ethereum'u kullanmanın yeni yollarını bulmaktadır. Aynı zamanda, Ethereum üzerinde merkeziyetsiz uygulamalar inşa etmeyi daha az karmaşıklaştıran yeni araçlar geliştirilmektedir.

### DeFi {#defi}

Merkeziyetsiz finans (DeFi), Ethereum'un üzerine inşa edilmiş birincil uygulama sınıflarından biridir. DeFi kullanıcıların kripto varlıkları akıllı sözleşmeler aracılığıyla depolayabilecekleri, transfer edebilecekleri, ödünç verebilecekleri, borç alabilecekleri birleştirilebilir "para legoları" oluşturmayı hedeflemektedir. DeFi, hareketli ve sürekli güncellenen bir alandır. Güvenli, verimli ve erişilebilir protokollerin araştırılmasına sürekli ihtiyaç duyulur.

#### Arka plan okuması {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: DeFi nedir?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Yakın geçmişteki araştırmalar {#recent-research-15}

- [Merkeziyetsiz finans, merkezi mülkiyet?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: Bir dolardan küçük işlemlere giden yol](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO'lar {#daos}

Ethereum için etkili bir kullanım alanı, DAO'lar aracılığıyla merkeziyetsiz bir biçimde organize olabilme kabiliyetidir. Ethereum üzerindeki DAO'ların kişilerin seçeneklerini geleneksel şirketlerin ve organizasyonların ardına genişleten, minimize güven gerektiren bir koordinasyon aracı olarak gelişmiş yönetişim formlarını yürütmek için nasıl geliştirilebileceği ve kullanılabileceği ile ilgili birçok aktif araştırma bulunmaktadır.

#### Arka plan okuması {#background-reading-16}

- [DAO'lara giriş](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Yakın geçmişteki araştırmalar {#recent-research-16}

- [DAO ekosisteminin haritalandırılması](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Geliştirici araçları {#developer-tools}

Ethereum geliştiricilerine yönelik araçlar hızla gelişiyor. Bu genel alanda yapılabilecek birçok aktif araştırma ve geliştirme bulunmaktadır.

#### Arka plan okuması {#background-reading-17}

- [Programlama diline göre araçlar](/developers/docs/programming-languages/)
- [Geliştirici Çerçeveleri](/developers/docs/frameworks/)
- [Mutabakat geliştirici araçlarının listesi](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Jeton standartları](/developers/docs/standards/tokens/)
- [CryptoDevHub: EVM Araçları](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Yakın geçmişteki araştırmalar {#recent-research-17}

- [Eth R&D Discord Mutabakat Araçları kanalı](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Kâhinler {#oracles}

Kâhinler, zincir dışındaki verileri blokzincire izin gerektirmeyen ve merkeziyetsiz bir şekilde taşır. Bu verileri zincir üstünde alabilmek, merkeziyetsiz uygulamaların dünyadaki varlıklardaki fiyat hareketlilikleri, zincir dışındaki uygulamalardaki olaylar ve hatta hava durumu değişiklikleri gibi gerçek hayattaki olaylara karşı tepki verebilir olmasını sağlar.

#### Arka plan okuması {#background-reading-18}

- [Kâhinlere giriş](/developers/docs/oracles/)

#### Yakın Geçmişteki Araştırmalar {#recent-research-18}

- [Blokzincir kâhinlerinin incelenmesi](https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlink teknik dokümanı](https://chain.link/whitepaper)

### Uygulama güvenliği {#app-security}

Ethereum'a yönelik saldırılar, genellikle protokolün kendisindeki güvenlik açıklarından ziyade, bağımsız uygulamalardaki güvenlik açıklarından yararlanır. Bilgisayar korsanları ve uygulama geliştiricileri, yeni saldırı ve savunmalar geliştirmek için bir silahlanma yarışına girmiş durumdadır. Bu, uygulamaları saldırılara karşı korumak için her zaman önemli araştırma ve geliştirme faaliyetleri yapılması gerektiği anlamına gelir.

#### Arka plan okuması {#background-reading-19}

- [Wormhole istismar raporu](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Ethereum sözleşme saldırıları sonrası analizlerin listesi](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt Haberleri](https://twitter.com/RektHQ?s=20\&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Yakın geçmişteki araştırmalar {#recent-research-19}

- [ethresear.ch Uygulamaları](https://ethresear.ch/c/applications/18)

### Teknoloji yığını {#technology-stack}

Tüm Ethereum teknoloji yığınını merkeziyetsizleştirmek, önemli bir araştırma alanıdır. Ethereum üzerindeki merkeziyetsiz uygulamalar, şu anda bazı merkezi noktalara sahiptir çünkü merkezi araçlar veya altyapılara dayanır.

#### Arka plan okuması {#background-reading-20}

- [Ethereum yığını](/developers/docs/ethereum-stack/)
- [Coinbase: Web3 Yığınına Giriş](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Akıllı sözleşmelere giriş](/developers/docs/smart-contracts/)
- [Merkeziyetsiz depolamaya giriş](/developers/docs/storage/)

#### Yakın geçmişteki araştırmalar {#recent-research-20}

- [Akıllı sözleşme birleştirilebilirliği](/developers/docs/smart-contracts/composability/)
