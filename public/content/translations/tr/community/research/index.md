---
title: Aktif Ethereum araştırması alanları
description: Farklı açık araştırma alanlarını keşfedin ve nasıl dahil olabileceğinizi öğrenin.
lang: tr
---

Ethereum'un temel güçlerinden biri, aktif bir araştırma ve mühendislik topluluğunun onu sürekli olarak geliştirmesidir. Dünya çapında birçok hevesli ve yetenekli insan, kendilerini Ethereum'daki bekleyen sorunlara adamak istiyor, ancak bu sorunların ne olduğunu bulmak her zaman kolay olmuyor. Bu sayfa, Ethereum'un en ileri teknolojisine kaba bir rehber olarak temel aktif araştırma alanlarını özetlemektedir.

## Ethereum araştırması nasıl çalışır? {#how-ethereum-research-works}

Ethereum araştırması açık ve şeffaftır ve [merkeziyetsiz bilim (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science) ilkelerini somutlaştırır. Kültür, araştırma araçlarını ve çıktılarını, örneğin çalıştırılabilir not defterleri aracılığıyla, mümkün olduğunca açık ve etkileşimli hale getirmektir. Ethereum araştırması hızlı ilerler; yeni bulgular, akran değerlendirmesi turlarından sonra geleneksel yayınlar aracılığıyla topluluğa ulaşmak yerine [ethresear.ch](https://ethresear.ch/) gibi forumlarda açıkça yayınlanır ve tartışılır.

## Genel araştırma kaynakları {#general-research-resources}

Belirli bir konudan bağımsız olarak, [ethresear.ch](https://ethresear.ch) adresinde ve [Eth R&D Discord kanalında](https://discord.gg/qGpsxSA) Ethereum araştırmaları hakkında zengin bir bilgi birikimi bulunabilir. Bunlar, Ethereum araştırmacılarının en son fikirleri ve geliştirme fırsatlarını tartıştığı başlıca yerlerdir.

Mayıs 2022'de [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) tarafından yayınlanan bu rapor, Ethereum yol haritasına iyi bir genel bakış sunmaktadır.

## Fon Kaynakları {#sources-of-funding}

Ethereum araştırmalarına dahil olabilir ve bunun için ödeme alabilirsiniz! Örneğin, [Ethereum Vakfı](/foundation/) yakın zamanda bir [Akademik Hibeler fonlama turu](https://esp.ethereum.foundation/academic-grants) düzenledi. Aktif ve yaklaşan fonlama fırsatları hakkında bilgiyi [Ethereum hibeler sayfasında](/community/grants/) bulabilirsiniz.

## Protokol araştırması {#protocol-research}

Protokol araştırması, Ethereum'un temel katmanıyla ilgilenir; bu, düğümlerin nasıl bağlandığını, iletişim kurduğunu, Ethereum verilerini nasıl alıp verdiğini ve depoladığını ve Blokzincir'in durumu hakkında nasıl mutabakata vardığını tanımlayan kurallar dizisidir. Protokol araştırması iki üst düzey kategoriye ayrılır: mutabakat ve yürütme.

### Mutabakat {#consensus}

Mutabakat araştırması, [Ethereum'un Hisse Kanıtı (PoS) mekanizması](/developers/docs/consensus-mechanisms/pos/) ile ilgilenir. Bazı örnek mutabakat araştırma konuları şunlardır:

- güvenlik açıklarını belirleme ve yamalama;
- kriptoekonomik güvenliği ölçme;
- istemci uygulamalarının güvenliğini veya performansını artırma;
- ve hafif istemciler geliştirme.

İleriye dönük araştırmaların yanı sıra, Ethereum'da önemli iyileştirmelere olanak sağlamak için tek slot kesinliği gibi protokolün bazı temel yeniden tasarımları da araştırılmaktadır. Ayrıca, fikir birliği istemcileri arasındaki eşler arası ağ iletişiminin verimliliği, güvenliği ve izlenmesi de önemli araştırma konularıdır.

#### Arka plan okuması {#background-reading}

- [Hisse Kanıtı'na (PoS) giriş](/developers/docs/consensus-mechanisms/pos/)
- [Casper FFG makalesi](https://arxiv.org/abs/1710.09437)
- [Casper FFG açıklayıcısı](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Gasper makalesi](https://arxiv.org/abs/2003.03052)

#### Son araştırmalar {#recent-research}

- [Ethresear.ch Mutabakatı](https://ethresear.ch/c/consensus/29)
- [Kullanılabilirlik/Kesinlik ikilemi](https://arxiv.org/abs/2009.04987)
- [Tek slot kesinliği](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Teklifçi-oluşturucu ayrımı (PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Yürütme {#execution}

Yürütme katmanı, işlemleri yürütmek, [Ethereum sanal makinesini (EVM)](/developers/docs/evm/) çalıştırmak ve mutabakat katmanına iletilecek yürütme yüklerini oluşturmakla ilgilenir. Aşağıdakiler de dahil olmak üzere birçok aktif araştırma alanı vardır:

- hafif istemci desteği oluşturmak;
- Gaz limitlerini araştırmak;
- ve yeni veri yapılarını (ör. Verkle Ağaçları) dahil etmek.

#### Arka plan okuması {#background-reading-1}

- [EVM'ye giriş](/developers/docs/evm)
- [Ethresear.ch yürütme katmanı](https://ethresear.ch/c/execution-layer-research/37)

#### Son araştırmalar {#recent-research-1}

- [Veritabanı optimizasyonları](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Durum zaman aşımı](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Durum zaman aşımına giden yollar](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Verkle ve durum zaman aşımı teklifi](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Geçmiş yönetimi](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle Ağaçları](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Veri kullanılabilirliği örneklemesi (DAS)](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## İstemci Geliştirme {#client-development}

Ethereum istemcileri, Ethereum protokolünün uygulamalarıdır. İstemci geliştirme, protokol araştırmasından elde edilen sonuçları bu istemcilere entegre ederek gerçeğe dönüştürür. İstemci geliştirme, istemci spesifikasyonlarını güncellemeyi ve belirli uygulamalar oluşturmayı içerir.

Bir Ethereum düğümünün iki yazılım parçasını çalıştırması gerekir:

1. Blokzincir'in başını takip etmek, blokları yaymak (gossip) ve mutabakat mantığını işlemek için bir fikir birliği istemcisi
2. Ethereum Sanal Makinesi'ni desteklemek ve işlemleri ve akıllı sözleşmeleri yürütmek için bir yürütme istemcisi

Düğümler ve istemciler hakkında daha fazla ayrıntı ve mevcut tüm istemci uygulamalarının bir listesi için [düğümler ve istemciler sayfasına](/developers/docs/nodes-and-clients/) bakın. Ayrıca tüm Ethereum güncellemelerinin geçmişini [geçmiş sayfasında](/ethereum-forks/) bulabilirsiniz.

### Yürütme İstemcileri {#execution-clients}

- [Yürütme istemcisi spesifikasyonu](https://github.com/ethereum/execution-specs)
- [Yürütme API'si spesifikasyonu](https://github.com/ethereum/execution-apis)

### Fikir Birliği İstemcileri {#consensus-clients}

- [Fikir birliği istemcisi spesifikasyonu](https://github.com/ethereum/consensus-specs)
- [İşaret (Beacon) API'si spesifikasyonu](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Ölçeklendirme ve performans {#scaling-and-performance}

Ethereum'u ölçeklendirmek, Ethereum araştırmacıları için büyük bir odak alanıdır. Mevcut yaklaşımlar, işlemleri toplamalara (rollups) aktarmayı ve veri blobları kullanarak bunları mümkün olduğunca ucuz hale getirmeyi içerir. Ethereum'u ölçeklendirme hakkında giriş niteliğindeki bilgiler [ölçeklendirme sayfamızda](/developers/docs/scaling) mevcuttur.

### Katman 2 (L2) {#layer-2}

Şu anda işlemleri toplu işleme (batching) ve bunları Ethereum katman 1 (L1) üzerinde güvence altına alma konusunda farklı teknikler kullanarak Ethereum'u ölçeklendiren çeşitli katman 2 (L2) protokolleri bulunmaktadır. Bu, çok fazla araştırma ve geliştirme potansiyeline sahip, çok hızlı büyüyen bir konudur.

#### Arka plan okuması {#background-reading-2}

- [Katman 2'ye (L2) giriş](/layer-2/)
- [Polynya: Toplamalar, DA ve modüler zincirler](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Son araştırmalar {#recent-research-2}

- [Sıralayıcılar için Arbitrum'un adil sıralaması](https://eprint.iacr.org/2021/1465)
- [Ethresear.ch Katman 2](https://ethresear.ch/c/layer-2/32)
- [Toplama odaklı yol haritası](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2BEAT](https://l2beat.com/)

### Köprüler {#bridges}

Katman 2'nin daha fazla araştırma ve geliştirme gerektiren belirli bir alanı, güvenli ve performanslı köprülerdir. Bu, çeşitli Katman 2'ler arasındaki köprüleri ve Katman 1 ile Katman 2 arasındaki köprüleri içerir. Bu, özellikle önemli bir araştırma alanıdır çünkü köprüler genellikle bilgisayar korsanları tarafından hedef alınır.

#### Arka plan okuması {#background-reading-3}

- [Blokzincir köprülerine giriş](/bridges/)
- [Vitalik'in köprüler hakkındaki görüşleri](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Blokzincir köprüleri makalesi](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Köprülerde kilitlenen değer](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Son araştırmalar {#recent-research-3}

- [Köprüleri doğrulama](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Parçalama (Sharding) {#sharding}

Ethereum'un Blokzincir'ini parçalara ayırmak (sharding) uzun zamandır geliştirme yol haritasının bir parçası olmuştur. Ancak, "danksharding" gibi yeni ölçeklendirme çözümleri şu anda merkezde yer almaktadır.

Tam danksharding'in öncüsü olan Proto-Danksharding, Cancun-Deneb ("Dencun") ağ güncellemesi ile yayına girdi.

[Dencun güncellemesi hakkında daha fazla bilgi](/roadmap/dencun/)

#### Arka plan okuması {#background-reading-4}

- [Proto-Danksharding notları](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless Danksharding videosu](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Ethereum Parçalama (Sharding) Araştırma Özeti](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Son araştırmalar {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik'in parçalama ve veri kullanılabilirliği örneklemesi (DAS) hakkındaki görüşleri](https://hackmd.io/@vbuterin/sharding_proposal)

### Donanım {#hardware}

Mütevazı donanımlarda [düğümleri çalıştırmak](/developers/docs/nodes-and-clients/run-a-node/), Ethereum'u merkeziyetsiz tutmak için temeldir. Bu nedenle, düğümleri çalıştırmak için donanım gereksinimlerini en aza indirmeye yönelik aktif araştırmalar önemli bir araştırma alanıdır.

#### Arka plan okuması {#background-reading-5}

- [ARM üzerinde Ethereum](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Son araştırmalar {#recent-research-5}

- [FPGA'lerde ECDSA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Güvenlik {#security}

Güvenlik; spam/dolandırıcılık önleme, Cüzdan güvenliği, donanım güvenliği, kriptoekonomik güvenlik, hata avcılığı ve uygulamaların ve istemci yazılımlarının test edilmesi ile anahtar yönetimini içerebilen geniş bir konudur. Bu alanlardaki bilgi birikimine katkıda bulunmak, ana akım benimsenmeyi teşvik etmeye yardımcı olacaktır.

### Kriptografi ve ZKP {#cryptography--zkp}

Sıfır bilgi ispatları (ZKP) ve kriptografi, Ethereum ve uygulamalarına gizlilik ve güvenlik oluşturmak için kritik öneme sahiptir. Sıfır bilgi, birçok açık araştırma ve geliştirme fırsatına sahip, nispeten genç ancak hızlı ilerleyen bir alandır. Bazı olasılıklar arasında [Keccak hashleme algoritmasının](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview) daha verimli uygulamalarını geliştirmek, şu anda var olanlardan daha iyi polinom taahhütleri bulmak veya ECDSA açık anahtar üretimi ve imza doğrulama devrelerinin maliyetini azaltmak yer alır.

#### Arka plan okuması {#background-reading-6}

- [0xparc blogu](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Zero Knowledge podcast'i](https://zeroknowledge.fm/)

#### Son araştırmalar {#recent-research-6}

- [Eliptik eğri kriptografisindeki son gelişmeler](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Cüzdanlar {#wallets}

Ethereum cüzdanları tarayıcı eklentileri, masaüstü ve mobil uygulamalar veya Ethereum üzerindeki akıllı sözleşmeler olabilir. Bireysel kullanıcı anahtar yönetimiyle ilişkili bazı riskleri azaltan sosyal kurtarma cüzdanları üzerine aktif araştırmalar bulunmaktadır. Cüzdanların geliştirilmesiyle bağlantılı olarak, yeni gelişen önemli bir araştırma alanı olan hesap soyutlamanın alternatif biçimlerine yönelik araştırmalar da mevcuttur.

#### Arka plan okuması {#background-reading-7}

- [Cüzdanlara giriş](/wallets/)
- [Cüzdan güvenliğine giriş](/security/)
- [Ethresear.ch Güvenliği](https://ethresear.ch/tag/security)
- [EIP-2938 Hesap Soyutlama](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Hesap Soyutlama](https://eips.ethereum.org/EIPS/eip-4337)

#### Son araştırmalar {#recent-research-7}

- [Doğrulama odaklı akıllı sözleşme cüzdanları](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Hesapların geleceği](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH ve AUTHCALL İşlem Kodları (Opcodes)](https://eips.ethereum.org/EIPS/eip-3074)
- [Bir EOA adresinde kod yayınlama](https://eips.ethereum.org/EIPS/eip-5003)

## Topluluk, eğitim ve sosyal yardım {#community-education-and-outreach}

Yeni kullanıcıların Ethereum sistemine katılımı (onboarding), yeni eğitim kaynakları ve sosyal yardım yaklaşımları gerektirir. Bu; blog yazıları ve makaleler, kitaplar, podcast'ler, memler, öğretim kaynakları, olaylar ve topluluklar oluşturan, yeni başlayanları karşılayan ve insanları Ethereum hakkında eğiten diğer her şeyi içerebilir.

### UX/UI {#uxui}

Daha fazla insanı Ethereum sistemine katmak için ekosistemin UX/UI'ı iyileştirmesi gerekir. Bu, tasarımcıların ve ürün uzmanlarının cüzdanların ve uygulamaların tasarımını yeniden incelemesini gerektirecektir.

#### Arka plan okuması {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Son araştırmalar {#recent-research-8}

- [Web3 Design Discord'u](https://discord.gg/FsCFPMTSm9)
- [Web3 Tasarım İlkeleri](https://www.web3designprinciples.com/)
- [Ethereum Magicians UX tartışması](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Ekonomi {#economics}

Ethereum'daki ekonomi araştırmaları genel olarak iki yaklaşımı izler: ekonomik teşviklere dayanan mekanizmaların güvenliğini doğrulamak ("mikroekonomi") ve protokoller, uygulamalar ve kullanıcılar arasındaki değer akışlarını analiz etmek ("makroekonomi"). Ethereum'un yerel varlığı (Ether) ve üzerine inşa edilen token'lar (örneğin NFT'ler ve ERC-20 token'ları) ile ilgili karmaşık kriptoekonomik faktörler vardır.

#### Arka plan okuması {#background-reading-9}

- [Sağlam Teşvikler Grubu (Robust Incentives Group)](https://rig.ethereum.org/)
- [Devconnect'te ETHconomics atölyesi](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Son araştırmalar {#recent-research-9}

- [EIP-1559'un ampirik analizi](https://arxiv.org/abs/2201.05574)
- [Dolaşımdaki arz dengesi](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [MEV'i Ölçmek: Orman ne kadar karanlık?](https://arxiv.org/abs/2101.05511)

### Blok alanı ve ücret piyasaları {#blockspace-fee-markets}

Blok alanı piyasaları, son kullanıcı işlemlerinin doğrudan Ethereum'a (Katman 1) veya köprülenmiş ağlara, ör. toplamalara (Katman 2) dahil edilmesini yönetir. Ethereum'da işlemler, zinciri spam'den koruyan ve tıkanıklığı fiyatlandıran EIP-1559 olarak protokol içinde dağıtılan ücret piyasasına sunulur. Her iki katmanda da işlemler, bu dışsallıkları yakalamak veya yönetmek için yeni piyasa yapılarını teşvik eden Maksimum Çıkarılabilir Değer (MEV) olarak bilinen dışsallıklar üretebilir.

#### Arka plan okuması {#background-reading-10}

- [Ethereum Blokzinciri İçin İşlem Ücreti Mekanizması Tasarımı: EIP-1559'un Ekonomik Analizi (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559 Simülasyonları (Sağlam Teşvikler Grubu)](https://ethereum.github.io/abm1559)
- [Temel ilkelerden Toplama (Rollup) ekonomisi](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Merkeziyetsiz Borsalarda Önden Koşma (Frontrunning), İşlem Yeniden Sıralama ve Mutabakat İstikrarsızlığı](https://arxiv.org/abs/1904.05234)

#### Son araştırmalar {#recent-research-10}

- [Çok boyutlu EIP-1559 video sunumu](https://youtu.be/QbR4MTgnCko)
- [Etki alanları arası MEV](https://arxiv.org/abs/2112.01472)
- [MEV müzayedeleri](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Hisse Kanıtı (PoS) teşvikleri {#proof-of-stake-incentives}

Doğrulayıcılar, dürüst olmayan davranışlara karşı teminat olarak Ethereum'un yerel varlığını (Ether) kullanırlar. Bunun kriptoekonomisi ağın güvenliğini belirler. Gelişmiş doğrulayıcılar, açık saldırılar başlatmak için teşvik katmanının nüanslarından yararlanabilirler.

#### Arka plan okuması {#background-reading-11}

- [Ethereum ekonomisi ustalık sınıfı ve ekonomik model](https://github.com/CADLabs/ethereum-economic-model)
- [PoS teşviklerinin simülasyonları (Sağlam Teşvikler Grubu)](https://ethereum.github.io/beaconrunner/)

#### Son araştırmalar {#recent-research-11}

- [Teklifçi-oluşturucu ayrımı (PBS) altında işlemlerin sansür direncini artırma](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [PoS Ethereum'a Yönelik Üç Saldırı](https://arxiv.org/abs/2110.10086)

### Likit staking ve türevler {#liquid-staking-and-derivatives}

Likit staking, 32 ETH'den daha azına sahip kullanıcıların, Ether'i DeFi'de kullanılabilecek stake edilmiş Ether'i temsil eden bir token ile değiştirerek staking getirileri elde etmelerini sağlar. Ancak, likit staking ile ilişkili teşvikler ve piyasa dinamiklerinin yanı sıra bunun Ethereum'un güvenliği üzerindeki etkisi (ör. merkezileşme riskleri) hala keşfedilmektedir.

#### Arka plan okuması {#background-reading-12}

- [Ethresear.ch likit staking](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Güven gerektirmeyen Ethereum staking'ine giden yol](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Staking protokolüne giriş](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Son araştırmalar {#recent-research-12}

- [Lido'dan çekim işlemlerini yönetme](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Çekim kimlik bilgileri](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Likit Staking Türevlerinin riskleri](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Test Etme {#testing}

### Biçimsel doğrulama {#formal-verification}

Biçimsel doğrulama, Ethereum'un mutabakat spesifikasyonlarının doğru ve hatasız olduğunu doğrulamak için kod yazmaktır. Spesifikasyonun Python ile yazılmış, bakım ve geliştirme gerektiren çalıştırılabilir bir sürümü vardır. Daha fazla araştırma, spesifikasyonun Python uygulamasını iyileştirmeye ve doğruluğu daha sağlam bir şekilde doğrulayabilen ve sorunları belirleyebilen araçlar eklemeye yardımcı olabilir.

#### Arka plan okuması {#background-reading-13}

- [Biçimsel doğrulamaya giriş](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Biçimsel Doğrulama (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Son araştırmalar {#recent-research-13}

- [Yatırma sözleşmesinin biçimsel doğrulaması](https://github.com/runtimeverification/deposit-contract-verification)
- [İşaret Zinciri spesifikasyonunun biçimsel doğrulaması](https://github.com/runtimeverification/deposit-contract-verification)

## Veri bilimi ve analitik {#data-science-and-analytics}

Ethereum'daki etkinlik ve ağın sağlığı hakkında ayrıntılı bilgi veren daha fazla veri analizi aracına ve kontrol paneline ihtiyaç vardır.

### Arka plan okuması {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [İstemci çeşitliliği kontrol paneli](https://clientdiversity.org/)

#### Son araştırmalar {#recent-research-14}

- [Sağlam Teşvikler Grubu Veri Analizi](https://rig.ethereum.org/)

## Uygulamalar ve araçlar {#apps-and-tooling}

Uygulama katmanı, işlemleri Ethereum'un temel katmanında sonuçlandıran çeşitli bir program ekosistemini destekler. Geliştirme ekipleri, önemli Web2 uygulamalarının birleştirilebilir, izinsiz ve sansüre dirençli sürümlerini oluşturmak veya tamamen yeni Web3'e özgü kavramlar yaratmak için Ethereum'dan yararlanmanın yeni yollarını sürekli olarak buluyor. Aynı zamanda, Ethereum üzerinde merkeziyetsiz uygulamalar (dapp'ler) oluşturmayı daha az karmaşık hale getiren yeni araçlar geliştirilmektedir.

### DeFi {#defi}

Merkeziyetsiz finans (DeFi), Ethereum üzerine inşa edilen birincil uygulama sınıflarından biridir. DeFi, kullanıcıların akıllı sözleşmeler kullanarak kripto varlıkları depolamasına, transfer etmesine, borç vermesine, borç almasına ve yatırım yapmasına olanak tanıyan birleştirilebilir "para legoları" oluşturmayı amaçlar. DeFi, sürekli güncellenen, hızlı ilerleyen bir alandır. Güvenli, verimli ve erişilebilir protokollere yönelik araştırmalara sürekli ihtiyaç duyulmaktadır.

#### Arka plan okuması {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: DeFi nedir?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Son araştırmalar {#recent-research-15}

- [Merkeziyetsiz finans, merkezi mülkiyet mi?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: Dolar altı işlemlere giden yol](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO'lar {#daos}

Ethereum için etkili bir kullanım durumu, DAO'ların kullanımı yoluyla merkeziyetsiz bir şekilde organize olma yeteneğidir. İnsanların seçeneklerini geleneksel şirketlerin ve organizasyonların ötesine büyük ölçüde genişleterek, güveni minimize edilmiş bir koordinasyon aracı olarak gelişmiş yönetişim biçimlerini yürütmek için Ethereum'daki DAO'ların nasıl geliştirilebileceği ve kullanılabileceği konusunda çok sayıda aktif araştırma bulunmaktadır.

#### Arka plan okuması {#background-reading-16}

- [DAO'lara giriş](/dao/)
- [DAO Collective](https://daocollective.xyz/)

#### Son araştırmalar {#recent-research-16}

- [DAO ekosisteminin haritasını çıkarma](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Geliştirici araçları {#developer-tools}

Ethereum geliştiricileri için araçlar hızla gelişiyor. Bu genel alanda yapılacak çok sayıda aktif araştırma ve geliştirme var.

#### Arka plan okuması {#background-reading-17}

- [Programlama diline göre araçlar](/developers/docs/programming-languages/)
- [Geliştirici Çerçeveleri](/developers/docs/frameworks/)
- [Fikir birliği geliştirici araçları listesi](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Token standartları](/developers/docs/standards/tokens/)
- [CryptoDevHub: EVM Araçları](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Son araştırmalar {#recent-research-17}

- [Eth R&D Discord Fikir Birliği Araçları kanalı](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Kâhinler (Oracles) {#oracles}

Kâhinler (Oracles), zincir dışı verileri izinsiz ve merkeziyetsiz bir şekilde Blokzincir'e aktarır. Bu verileri zincir içine almak, dapp'lerin gerçek dünyadaki varlıklardaki fiyat dalgalanmaları, zincir dışı uygulamalardaki olaylar veya hatta hava durumundaki değişiklikler gibi gerçek dünya olaylarına tepki vermesini sağlar.

#### Arka plan okuması {#background-reading-18}

- [Kâhinlere (Oracles) Giriş](/developers/docs/oracles/)

#### Son araştırmalar {#recent-research-18}

- [Blokzincir kâhinleri anketi](https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlink teknik incelemesi (white paper)](https://chain.link/whitepaper)

### Uygulama güvenliği {#app-security}

Ethereum'daki hack'ler genellikle protokolün kendisinden ziyade bireysel uygulamalardaki güvenlik açıklarından yararlanır. Bilgisayar korsanları ve uygulama geliştiricileri, yeni saldırılar ve savunmalar geliştirmek için bir silahlanma yarışına kilitlenmiş durumdadır. Bu, uygulamaları hack'lerden korumak için her zaman önemli araştırma ve geliştirmelerin gerektiği anlamına gelir.

#### Arka plan okuması {#background-reading-19}

- [Wormhole istismar raporu](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Ethereum sözleşme hack'i otopsileri listesi](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Son araştırmalar {#recent-research-19}

- [Ethresear.ch Uygulamaları](https://ethresear.ch/c/applications/18)

### Teknoloji yığını {#technology-stack}

Tüm Ethereum teknoloji yığınını merkeziyetsizleştirmek önemli bir araştırma alanıdır. Şu anda, Ethereum üzerindeki dapp'ler genellikle merkezi araçlara veya altyapıya dayandıkları için bazı merkezileşme noktalarına sahiptir.

#### Arka plan okuması {#background-reading-20}

- [Ethereum yığını](/developers/docs/ethereum-stack/)
- [Coinbase: Web3 Yığınına Giriş](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Akıllı sözleşmelere giriş](/developers/docs/smart-contracts/)
- [Merkeziyetsiz depolamaya giriş](/developers/docs/storage/)

#### Son araştırmalar {#recent-research-20}

- [Akıllı sözleşme birleştirilebilirliği](/developers/docs/smart-contracts/composability/)