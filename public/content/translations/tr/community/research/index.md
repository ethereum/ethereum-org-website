---
title: Ethereum araştırmasının aktif alanları
description: Açık araştırmanın farklı alanlarını keşfet ve nasıl katkı vereceğini öğren.
lang: tr
---

# Ethereum araştırmasının aktif alanları {#active-areas-of-ethereum-research}

Ethereum'un birincil güçlerinden birisi aktif araştırma ve mühendislik topluluğunun sürekli onu geliştirmesidir. Dünya çapındaki birçok hevesli ve yetenekli insan kendilerini Ethereum'un kalbur üstü sorunlarına atamak ister, ancak bu sorunların ne olduğunu bulmak her zaman kolay değildir. Bu sayfa, Ethereum'un bıçak ağzı kenarlarına kaba bir rehber gibi ana aktif araştırma alanlarını belirler.

## Ethereum araştırması nasıl işler {#how-ethereum-research-works}

Ethereum araştırması, [Merkeziyetsiz Bilim (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science)'in prensiplerini benimsediği için açık ve şeffaftır. Kültür; mesela çalıştırılabilir defterler aracılığıyla araştırma araçlarını ve çıktılarını mümkün olduğunca açık ve interaktif yapmaktır. Ethereum araştırmaları; yeni bulguların topluluğa geleneksel yayınların tekrar tekrar incelenmelerinin ardından yayınlanmasının aksine [ethresear.ch](https://ethresear.ch/) gibi forumlarda yayımlanması ve tartışılması ile kolayca ilerler.

## Genel araştırma kaynakları {#general-research-resources}

Özgül konudan bağımsız olarak [ethresear.ch](https://ethresear.ch)'da ve [Eth R&D Discord sunucusunda](https://discord.gg/qGpsxSA) bulunabilecek bilgi varlığına sahiptir. Ethereum araştırmacılarının en güncel fikirleri ve geliştirme fırsatlarını tartıştığı birincil mekanlar mevcuttur.

Ethereum yol haritasına iyi bir genel bakış sağlayan bu rapor [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) tarafından Mayıs 2022'de yayımlandı.

## Geleir Kaynakları {#sources-of-funding}

Ethereum araştırmalarında yer alabilir ve bundan gelir elde edebilirsiniz! Örneğin, yakın zamanda [Ethereum Vakfı](/foundation/) bir [Akademik hibe gelir turu](https://esp.ethereum.foundation/academic-grants) yürüttü. Aktif ve gelecek gelir fırsatları hakkında [Ethereum hibeler sayfası](/community/grants/)ndan bilgi edinebilirsiniz.

## Protokol araştırması {#protocol-research}

Protokol araştırması Ethereum'un ana katmanı ile ilgilidir - bunlar düğümlerin nasıl bağlandığı, iletişim kurduğu, takas ettiği, Ethereum verisini depoladığı ve blok zincirin durumu hakkında mutabakata vardığını belirleyen birtakım kurallardır. Protokol araştırması iki üst kategoriye bölünür: mutabakat ve yürütme.

### Mutabakat {#consensus}

Mutabakat araştırması [Ethereum'un hisse ispatı mekanizması](/developers/docs/consensus-mechanisms/pos/) ile ilgilidir. Bazı örnek mutabakat araştırma konuları şunlardır:

- açıkları tespit etmek ve kapatmak;
- kriptoekonomik güvenliği hesaplamak;
- istemci uygulamalarının güvenliğini veya performansını artırmak
- ve hafif istemciler geliştirmek.

İleriye dönük araştırmayla birlikte, protokole yuva kesinliği gibi bazı esaslı yeniden tasarım uygulamaları, Ethereum'da önemli gelişmelerin önünü açmak için araştırılıyor. Dahası, fikir birliği istemcileri arasındaki eşler arası ağ oluşumunun verimliliği, güvenliği ve gözlemlenmesi konuları da önemli araştırma konularıdır.

#### Arkaplan okuması {#background-reading}

- [Hisse İspatı'na Giriş](/developers/docs/consensus-mechanisms/pos/)
- [Casper-FFG belgesi](https://arxiv.org/abs/1710.09437)
- [Casper-FFG açıklayıcısı](https://arxiv.org/abs/1710.09437)
- [Gasper belgesi](https://arxiv.org/abs/2003.03052)

#### Güncel araştırma {#recent-research}

- [Ethresear.ch Mutabakatı](https://ethresear.ch/c/consensus/29)
- [Kullanılabilirlik/Kesinlik ikilemi](https://arxiv.org/abs/2009.04987)
- [Tek yuva kesinliği](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Teklifi yapan-oluşturucu ayrımı](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Yürütme {#execution}

Yürütüm katmanı, işlemlerin yürütülmesi, [Ethereum sanal makinesinin (EVM)](/developers/docs/evm/) çalıştırılması ve yürütme yüklerinin oluşturulup fikir birliği katmanına iletilmesiyle ilgilenir. Konu ile ilgili aşağıdakiler dahil birçok aktif araştırma alanı vardır:

- hafif-istemci desteğini geliştirmek;
- gaz limiti araştırmaları;
- yeni veri yapılarını birleştirmek (ör. Verkle Ağaçları).

#### Arkaplan okuması {#background-reading-1}

- [EVM'ye giriş](/developers/docs/evm)
- [Ethresear.ch yürütüm katmanı](https://ethresear.ch/c/execution-layer-research/37)

#### Güncel araştırma {#recent-research-1}

- [Veritabanı optimizasyonları](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Durum sonlanması](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Durum sonlanmasına giden yollar](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Verkel ve durum sonlanması teklifleri](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Geçmiş yönetimi](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle Ağaçları](https://vitalik.ca/general/2021/06/18/verkle.html)
- [Veri kullanılabilirlik örneklendirmesi](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## İstemci Geliştirme {#client-development}

Ethereum istemcileri Ethereum protokolünün uygulamalarıdır. İstemci geliştirme süreci protokol araştırmalarını istemciler içine inşa ederek gerçeğe dönüştürüyor. İstemci geliştirme, spesifik uygulamaları inşa etmekle birlikte istemci özelleştirmelerini de kapsıyor.

Bir Ethereum düğümü 2 parça yazılım olarak çalışmak zorunda:

1. dedikodu bloklarının, mutabakat mantığının ve blok zincirin başının kaydını tutan bir fikir birliği istemcisi
2. ethereum Sanal Makinesi'ni destekleyen ve akıllı sözleşmeler ile işlemleri yürürlüğe sokan bir yürütüm işlemcisi

Düğümler ve istemciler hakkında daha detaylı bilgi ve güncel istemcilerin bir listesi için buraya [göz atın](/developers/docs/nodes-and-clients/). Ayrıca bütün Ethereum güncellemelerinin geçmişini [geçmiş sayfasında](/history/) da bulabilirsiniz.

### Yürütüm İstemcileri {#execution-clients}

- [Yürütüm istemcisi özellikleri](https://github.com/ethereum/execution-specs)
- [Yürütme API özellikleri](https://github.com/ethereum/execution-apis)

### Fikir Birliği İstemcileri {#consensus-clients}

- [Fikir birliği istemcisi özellikleri](https://github.com/ethereum/consensus-specs)
- [İşaret API özellikleri](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Ölçeklendirme ve performans {#scaling-and-performance}

Ethereum'un ölçeklendirilmesi Ethereum araştırmacılarının büyük bir odak noktasıdır. Şu andaki yaklaşımlar, işlemlerinin yükünü toplamalara bindirme ve onları veri damlaları kullanarak olabildiğince masrafsız hale getirmeyi kapsıyor. Ethereum'u ölçeklendirmeyle ilgili giriş bilgisileri [ölçeklendirme](/developers/docs/scaling)sayfamızda mevcuttur.

### Katman 2 {#layer-2}

Şu anda işlemleri harmanlamak ve Ethereum Katman 1'de güvende tutmak için farklı teknikler kullanarak Ethereumu ölçeklendiren birkaç Katman 2 protokolü var. Bu, yoğun araştırma ve geliştirme süreçleriyle hızla büyüyen bir konu.

#### Arkaplan okuması {#background-reading-2}

- [Katman 2'ye giriş](/layer-2/)
- [Polynya: Toplamalar, DA ve modüler zincirler](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Güncel araştırma {#recent-research-2}

- [Arbitrum'un sıralayıcılar için adil düzenlemesi](https://eprint.iacr.org/2021/1465)
- [ethresear.ch Katman 2](https://ethresear.ch/c/layer-2/32)
- [Toplama merkezli yol haritası](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Köprüler {#bridges}

Katman 2'nin daha çok araştırma ve geliştirme gerektiren spesifik alanlarından biri güvenli ve performanslı köprülerdir. Buna farklı Katman 2'ler ve Katman 1 ile Katman 2 arası köprüler dahildir. Bu özel olarak önemli bir araştırma alanıdır çünkü köprüler hackerlar tarafından yaygın olarak hedef alınırlar.

#### Arkaplan okuması {#background-reading-3}

- [Blok zincir köprülerine giriş](/bridges/)
- [Köprüler üzerine, Vitalik](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Blok zincir köprüleri makalesi](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Köprülerde kilitli değer](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Güncel araştırma {#recent-research-3}

- [Köprüleri doğrulama](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Parçalama {#sharding}

Ethereum blok zincirinin parçalanması, uzun süredir gelişim yol haritasının bir parçası olmuştur. Ancak, "Danksharding" gibi yeni ölçeklendirme çözümleri şu anda ön plandadır.

#### Arkaplan okuması {#background-reading-4}

- [Proto-Danksharding notları](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankasız Danksharding videosu](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Ethereum Parçalama Araştırma Özeti](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Güncel araştırma {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Parçalama ve veri kullanılabilirliği örneklendirmesi üzerine, Vitalik](https://hackmd.io/@vbuterin/sharding_proposal)

### Donanım {#hardware}

Ortalama bir donanımda [düğüm çalıştırmak](/developers/docs/nodes-and-clients/run-a-node/) Ethereum'u merkeziyetsiz kılmak için esastır. Bundan dolayı, düğüm çalıştırmak için gereken donanım gerekliliklerini minimize etmeye yönelik aktif araştırmalar önemli bir araştırma alanıdır.

#### Arkaplan okuması {#background-reading-5}

- [KOL üzerinde Ethereum](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Güncel araştırma {#recent-research-5}

- [FGPA'lar üzerine, ecdsa](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Güvenlik {#security}

Güvenlik; dolandırıcılık/taciz koruması, cüzdan koruması, donanım koruması, kripto-ekonomik koruması, hata tespiti, uygulama testleri, istemci yazılımcıları ve anahtar yönetimi gibi konuları kapsayan çok geniş bir konu. Bu alanlardaki bilgilere katkı sağlamak ana görüşlerden bazılarını öğrenmenizi sağlar.

### Kriptografi ve ZKP {#cryptography--zkp}

Sıfır bilgili ispat (ZKP) ve kriptografi gizliliği, güvenliği Ethereum ve uygulamalarına inşa etmede çok kritiktir. Sıfır bilgi birçok açık araştırma ve geliştirme imkânına sahip oldukça genç ama hızlı ilerleyen bir alandır. Bazı imkânlar [Keccak düğüm algoritmasını](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), şu andakilerden daha iyi polinom taahhütleri bularak ya da ecdsa açık anahtarını oluşturmanın ve imza onay çevirimlerinin daha ucuza yapılmasını sağlamak amacıyla geliştirmeyi kapsar.

#### Arkaplan okuması {#background-reading-6}

- [0xparc blogu](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Sıfır Bilgi podcasti](https://zeroknowledge.fm/)

#### Güncel araştırma {#recent-research-6}

- [Eliptik eğri kriptografisinde yakın zamanda gerçekleşen ilerleme](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Cüzdanlar {#wallets}

Ethereum cüzdanları tarayıcı eklentileri, masaüstü ve mobil uygulamalar veya Ethereum üzerindeki akıllı sözleşmeler olabilir. Tekil kullanıcı anahtar yönetimi ile ilgili risklerin bir kısmını azaltmaya yönelik sosyal kurtarma cüzdanlarına yönelik aktif araştırmalar bulunmaktadır. Cüzdanların geliştirilmesi ile ilgili olan bir araştırma da hesap soyutlamasının alternatif formlarına yöneliktir, bu da yeni oluşmaya başlamış önemli bir araştırmadır.

#### Arkaplan okuması {#background-reading-7}

- [Cüzdanlara giriş](/wallets/)
- [Cüzdan güvenliğine giriş](/security/)
- [ethresear.ch Güvenlik](https://ethresear.ch/tag/security)
- [EIP-2938 Hesap Soyutlanması](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Hesap Soyutlanması](https://eips.ethereum.org/EIPS/eip-4337)

#### Güncel araştırma {#recent-research-7}

- [Doğrulama odaklı akıllı sözleşme cüzdanları](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Hesapların geleceği](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH ve AUTHCALL İşlem Kodları](https://eips.ethereum.org/EIPS/eip-3074)
- [Bir EOA adresinde kod yayımlama](https://eips.ethereum.org/EIPS/eip-5003)

## Topluluk, eğitim ve herkese ulaşma {#community-education-and-outreach}

Ethereum'a yeni kullanıcılar çekmek yeni eğitim kaynakları ve topluma ulaşma yöntemleri gerektirir. Buna blog gönderileri ve makaleler, kitaplar, podcastler, miimler, eğitim kaynakları etkinlikleri veya topluluklar inşa eden, acemileri hoş karşılayan ve insanları Ethereum ile ilgili bilgilendiren her türlü şey dahil olabilir.

### UX/UI {#uxui}

Daha çok kişiyi Ethereum'a başlatmak için ekosistem, UX/UI'yi geliştirmelidir. Bu tasarımcıların ve ürün uzmanlarının, cüzdanların ve uygulamaların tasarımlarını yeniden incelemesini gerektirecektir.

#### Arkaplan okuması {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Güncel araştırma {#recent-research-8}

- [Web3 Tasarımı, Discord](https://discord.gg/FsCFPMTSm9)
- [Web3 Tasarım İlkeleri](https://www.web3designprinciples.com/)
- [Ethereum Sihirbazları UX tartışması](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Ekonomi {#economics}

Ethereum'da ekonomi araştırmaları genel olarak iki yaklaşımı kullanır: ekonomik teşviklere dayanan mekanizmaların güvenliğini doğrulamak ("mikroekonomi") ve protokoller, uygulamalar ve kullanıcılar arası değer akışını analiz etmek ("makroekonomi"). Ethereum'un kendi varlığına (ether) ve üzerinde inşa edilmiş token'lara (örneğin, NFT'ler ve ERC20 token'ları) bağlı olan kompleks kriptoekonomik faktörler bulunmaktadır.

#### Arkaplan okuması {#background-reading-9}

- [Güçlü Teşvik Grubu](https://ethereum.github.io/rig/)
- [Devconnect'te ETHconomics atölyesi](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Güncel araştırma {#recent-research-9}

- [EIP1559'un deneysel bir analizi](https://arxiv.org/abs/2201.05574)
- [Dolaşan arz dengesi](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [MEV'i ölçmek: Orman ne kadar karanlık?](https://arxiv.org/abs/2101.05511)

### Blok alanı ve ücret piyasaları {#blockspace-fee-markets}

Blok alanı piyasaları ya doğrudan Ethereum'da (Katman 1) ya da örneğin toplamalar gibi köprülenmiş ağlarda (Katman 2) son kullanıcı işlemlerinin dahiliyetini yönetirler. Ethereum üzerinde, işlemler protokolde EIP-1559 olarak yayınlanmış bulunan ücret piyasasına gönderilirler, bu da zinciri spamdan ve fiyat tıkanıklıklarından korur. İki katmanda da, işlemler Maksimum Çıkarılabilir Değer (MEV) olarak bilinen dışsallıklar ortaya çıkarabilir, bu da bu dışsallıkların elde edilmesi veya yönetilmesi için yeni piyasa yapılarını teşvik eder.

#### Arkaplan okuması {#background-reading-10}

- [Ethereum Blok Zinciri için İşlem Ücreti Mekanizması Tasarımı: EIP-1559'un Ekonomik Bir Analizi (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559'un Simülasyonları (Güçlü Teşvik Grubu)](https://ethereum.github.io/abm1559)
- [İlk ilkelerden toplama ekonomisi](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, İşlem Yeniden Sıralaması ve Merkeziyetsiz Borsalarda Mutabakat İstikrarsızlığı](https://arxiv.org/abs/1904.05234)

#### Güncel araştırma {#recent-research-10}

- [Çok boyutlu EIP-1559 video sunumu](https://youtu.be/QbR4MTgnCko)
- [Etki alanları arası MEV](http://arxiv.org/abs/2112.01472)
- [MEV ihaleleri](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Hisse ispatı teşvikleri {#proof-of-stake-incentives}

Doğrulayıcılar Ethereum'un kendi varlığını (ether) aldatıcı davranışlara karşı teminat olarak kullanırlar. Bunun kriptoekonomik kısmı, ağın güvenliliğini belirler. Bilgili doğrulayıcılar açık saldırılar gerçekleştirmek için teşvik katmanının inceliklerini kötüye kullanabilirler.

#### Arkaplan okuması {#background-reading-11}

- [Ethereum ekonomisi dersi ve ekonomik model](https://github.com/CADLabs/ethereum-economic-model)
- [PoS Teşvik Simülasyonları (Güçlü Teşvik Grubu)](https://ethereum.github.io/beaconrunner/)

#### Güncel araştırma {#recent-research-11}

- [Önerici/inşacı ayrımı (PBS) altında işlemlerin sansüre dayanıklılığının arttırılması](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [PoS Ethereum'da 3 Saldırı](https://arxiv.org/abs/2110.10086)

### Likit hisseleme ve türevleri {#liquid-staking-and-derivatives}

Likit hisseleme 32 ETH'den azına sahip olan kullanıcıların DeFi'da kullanılabilen hisselenen etheri temsil eden bir token için ether takaslayarak hisseleme getirisi elde edebilmesini sağlar. Ancak, Ethereum'un güvenliği (ör. merkeziyetsizlik riskleri) üzerindeki etkisi gibi, likit hisseleme ile ilgili teşvik ve piyasa dinamikleri de hâlâ keşfedilmektedir.

#### Arkaplan okuması {#background-reading-12}

- [Ethresear.ch likit hisseleme](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Güven gerektirmeyen Ethereum hisselemeye giden yol](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Hisseleme protokolüne giriş](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Güncel araştırma {#recent-research-12}

- [Lido'dan çekimleri halletmek](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Para çekme kimlik bilgileri](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Likit Hisseleme Türevlerinin riskleri](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Test {#testing}

### Resmî doğrulama {#formal-verification}

Resmi doğrulama Ethereum'un mutabakat özelliklerinin doğru ve hatasız olduğunu doğrulamak için kod yazmaktır. Bu şartnamenin yönetim ve geliştirme gerektiren çalıştırılabilir bir sürümü Phytonda yazılmıştır. Bununla ilgili daha fazla araştırma bu şartnamenin Phyton üzerinde çalıştırılmasına yardımcı olabilir, doğruluğu daha güçlü bir şekilde doğrulayabilir ve sorunları tanımlayabilir.

#### Arkaplan okuması {#background-reading-13}

- [Resmi doğrulamaya giriş](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Resmi Doğrulama (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Güncel araştırma {#recent-research-13}

- [Depozito Sözleşmesinin resmi doğrulaması](https://github.com/runtimeverification/deposit-contract-verification)
- [İşaret Zinciri şartnamesinin resmi doğrulaması](https://github.com/runtimeverification/deposit-contract-verification)

## Veri bilimi ve analizler {#data-science-and-analytics}

Ethereum aktiviteleri ve ağın sağlığı hakkında detaylı bilgi veren daha çok veri analizi aracı ve gösterge paneline ihtiyaç var.

### Arkaplan okuması {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [İstemci çeşitliliği gösterge paneli](https://clientdiversity.org/)

#### Güncel araştırma {#recent-research-14}

- [Güçlü Teşvik Grubu Veri Analizi](https://ethereum.github.io/rig/)

## Uygulamalar ve araçlar {#apps-and-tooling}

Uygulama katmanı Ethereum'un ana katmanında işlemleri tamamlayan çeşitli programların ekosistemini destekler. Geliştirme ekipleri devamlı biçimde önemli Web2 uygulamalarının birleştirilebilir, izin gerektirmeyen ve sansüre dayanıklı sürümlerini oluşturmak veya tamamen yeni Web3'ye ait konseptler oluşturmak için Ethereum'u kullanmanın yeni yollarını bulmaktadır. Aynı zamanda, Ethereum üzerinde merkeziyetsiz uygulamalar inşa etmeyi daha az karmaşıklaştıran yeni araçlar geliştirilmektedir.

### DeFi {#defi}

Merkeziyetsiz finans (DeFi), Ethereum'un üzerine inşa edilmiş birincil uygulama sınıflarından biridir. DeFi kullanıcıların kripto varlıkları akıllı sözleşmeler aracılığıyla depolayabilecekleri, transfer edebilecekleri, ödünç verebilecekleri, borç alabilecekleri birleştirilebilir "para legoları" oluşturmayı hedeflemektedir. DeFi hareketli ve sürekli güncellenen bir alandır. Güvenli, verimli ve erişilebilir protokollerin araştırılmasına sürekli ihtiyaç duyulur.

#### Arkaplan okuması {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: DeFi nedir?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Güncel araştırma {#recent-research-15}

- [Merkeziyetsiz finans, merkezi sahiplik?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: Dolar altı işlemlere giden yol](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO'lar {#daos}

Ethereum için etkili bir kullanım alanı DAO'lar aracılığıyla merkeziyetsiz bir biçimde organize olabilme kabiliyetidir. Ethereum üzerindeki DAO'ların kişilerin seçeneklerini geleneksel şirketlerin ve organizasyonların ardına genişleten, minimize güven gerektiren bir koordinasyon aracı olarak gelişmiş yönetişim formlarını yürütmek için nasıl geliştirilebileceği ve kullanılabileceği ile ilgili birçok aktif araştırma bulunmaktadır.

#### Arkaplan okuması {#background-reading-16}

- [DAO'lara giriş](/dao/)
- [Dao Topluluğu](https://daocollective.xyz/)

#### Güncel araştırma {#recent-research-16}

- [DAO ekosistemini haritalamak](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Geliştirici araçları {#developer-tools}

Ethereum geliştiricileri için araçlar hızlıca gelişiyor. Bu genel alanda yapılabilecek birçok aktif araştırma ve geliştirme bulunmaktadır.

#### Arkaplan okuması {#background-reading-17}

- [Programlama diline göre araçlar](/developers/docs/programming-languages/)
- [Geliştirici Çerçeveleri](/developers/docs/frameworks/)
- [Mutabakat geliştirici araçları listesi](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Token standartları](/developers/docs/standards/tokens/)
- [CryptoDevHub: EVM Araçları](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Güncel araştırma {#recent-research-17}

- [Eth ArGe Discord Mutabakat Araçları kanalı](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oracles {#oracles}

Kahinler zincir dışı veriyi blok zincir üzerine izin gerektirmeyen ve merkeziyetsiz bir şekilde taşırlar. Bu veriyi zincir üzerinde alabilmek merkeziyetsiz uygulamaların dünyadaki varlıklardaki fiyat hareketlilikleri, zincir dışı uygulamalardaki olaylar ve hatta hava durumu değişiklikleri gibi gerçek hayattaki olaylara karşı tepki verebilir olmasını sağlar.

#### Arkaplan okuması {#background-reading-18}

- [Kahinlere Giriş](/developers/docs/oracles/)

#### Güncel Araştırma {#recent-research-18}

- [Blok zincir kahinleri anketi](https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlink tanıtım belgesi](https://chain.link/whitepaper)

### Uygulama güvenliği {#app-security}

Ethereum üzerindeki hackler genelde protokolün kendisindense tekil uygulamalardaki açıkları kullanırlar. Bilgisayar korsanları ve uygulama geliştiricileri, yeni saldırı ve savunmalar geliştirmek için bir silahlanma yarışına girmiş durumda. Bu her zaman uygulamaları hacklerden korumak için önemli araştırma ve geliştirmelerde bulunulduğu anlamına gelir.

#### Arkaplan okuması {#background-reading-19}

- [Wormhole saldırı raporu](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Ethereum sözleşme hack otopsileri listesi](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt Haber](https://twitter.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Güncel araştırma {#recent-research-19}

- [ethresear.ch Uygulamaları](https://ethresear.ch/c/applications/18)

### Teknoloji yığını {#technology-stack}

Tüm Ethereum teknoloji yığınını merkeziyetsizleştirmek önemli bir araştırma alanıdır. Mevcut olarak, Ethereum üzerindeki merkeziyetsiz uygulamalar bazı merkezi noktalara sahiptirler çünkü merkezi araçlar veya altyapılara dayanırlar.

#### Arkaplan okuması {#background-reading-20}

- [Ethereum yığını](/developers/docs/ethereum-stack/)
- [Coinbase: Web3 Yığınına Giriş](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Akıllı sözleşmelere giriş](/developers/docs/smart-contracts/)
- [Merkeziyetsiz depolamaya giriş](/developers/docs/storage/)

#### Güncel araştırma {#recent-research-20}

- [Akıllı sözleşme birleştirilebilirliği](/developers/docs/smart-contracts/composability/)
