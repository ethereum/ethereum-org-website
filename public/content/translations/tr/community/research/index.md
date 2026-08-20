---
title: "Ethereum araştırmalarının aktif alanları"
description: "Açık araştırmaların farklı alanlarını keşfedin ve nasıl dahil olabileceğinizi öğrenin."
lang: tr
---

Ethereum'un temel güçlerinden biri, aktif bir araştırma ve mühendislik topluluğunun onu sürekli olarak geliştirmesidir. Dünya çapında birçok hevesli ve yetenekli insan, kendilerini Ethereum'daki öne çıkan sorunlara adamak istiyor, ancak bu sorunların ne olduğunu bulmak her zaman kolay olmuyor. Bu sayfa, Ethereum'un en ileri teknolojisine kaba bir rehber olarak temel aktif araştırma alanlarını özetlemektedir.

## Ethereum araştırmaları nasıl yürütülür {#how-ethereum-research-works}

Ethereum araştırmaları açık ve şeffaftır. Kültür, araştırma araçlarını ve çıktılarını, örneğin çalıştırılabilir not defterleri aracılığıyla, mümkün olduğunca açık ve etkileşimli hale getirmektir. Ethereum araştırmaları hızlı ilerler; yeni bulgular, akran değerlendirmesi turlarından sonra geleneksel yayınlar aracılığıyla topluluğa ulaşmak yerine [ethresear.ch](https://ethresear.ch/) gibi forumlarda açıkça yayınlanır ve tartışılır. Ethereum Vakfı ayrıca neye öncelik verdiğini ve nedenini de yayınlar, böylece herkes şu anda hangi sorunların acil kabul edildiğini görebilir.

## Genel araştırma kaynakları {#general-research-resources}

Belirli bir konudan bağımsız olarak, Ethereum araştırmaları hakkında [ethresear.ch](https://ethresear.ch) ve [Eth R&D Discord kanalında](https://discord.gg/qGpsxSA) bulunabilecek zengin bir bilgi birikimi vardır. Buralar, Ethereum araştırmacılarının en son fikirleri ve geliştirme fırsatlarını tartıştığı başlıca yerlerdir.

Protokolün nereye gittiğine dair genel bir bakış için [Ethereum yol haritası](/roadmap/) ile başlayın, ardından Ethereum Vakfı'nın [2026 Protokol Öncelikleri Güncellemesi](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)'ni ve buna karşı kaydedilen ilerlemeyi bildiren [protokol kümesi güncellemelerini](https://blog.ethereum.org/2026/05/11/protocol-update-may-26) okuyun. [Ethereum Protokol Çalışmaları](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26), protokolün kendisi üzerinde çalışmak isteyen kişiler için yapılandırılmış bir giriş noktasıdır.

## Fon Kaynakları {#sources-of-funding}

Ethereum araştırmalarına dahil olabilir ve bunun için ödeme alabilirsiniz. [Ethereum Vakfı](/foundation/), çözülmesini istediği sorunları açıklayan istek listesi öğeleri ve teklif çağrıları yayınlayan [Ekosistem Destek Programı](https://esp.ethereum.foundation/applicants) aracılığıyla araştırmaları ve kamusal malları finanse eder. Aktif ve yaklaşan fon fırsatları hakkında bilgiyi [Ethereum hibe sayfasında](/community/grants/) bulabilirsiniz.

## Protokol araştırması {#protocol-research}

Protokol araştırması, Ethereum'un temel katmanıyla ilgilenir: düğümlerin nasıl bağlandığını, iletişim kurduğunu, Ethereum verilerini nasıl alıp verdiğini ve depoladığını ve blokzincirin durumu hakkında nasıl mutabakata vardığını tanımlayan kurallar bütünü. Uzun süredir devam eden iki kategorisi mutabakat ve yürütmedir ve artık çeşitli araştırma konuları her ikisini de kesmektedir.

### Mutabakat {#consensus}

Mutabakat araştırması, [Ethereum'un Hisse Kanıtı (PoS) mekanizması](/developers/docs/consensus-mechanisms/pos/) ile ilgilenir: çatal seçimi kuralının ve kesinlik aracının güvenliği, staking'in kriptoekonomisi, blokları, onayları ve blob verilerini taşıyan eşler arası ağ ve doğrulayıcıların imza attığı kriptografi. Bazı örnek mutabakat araştırma konuları şunlardır:

- güvenlik açıklarını belirleme ve yamalama;
- kriptoekonomik güvenliği ölçme;
- bir bloğun kesinliğe ulaşması için geçen süreyi azaltma;
- ve fikir birliği istemcileri arasındaki eşler arası ağın verimliliğini, güvenliğini ve izlenmesini iyileştirme.

Bu çalışmaların çoğu kağıt üzerinden spesifikasyona taşındı. Veri kullanılabilirliği örneklemesi (DAS) [Fusaka](/roadmap/fusaka/) yükseltmesinde kullanıma sunuldu, blokların nasıl oluşturulduğuna ve işlemlerin dahil edilmesinin nasıl garanti altına alındığına dair değişiklikler yaklaşan yükseltmeler için belirlendi ve yalın mutabakat (lean consensus) olarak bilinen daha uzun ufuklu bir yeniden tasarım, kuantum sonrası imzalarla birlikte daha hızlı kesinliği araştırıyor.

#### Arka plan okuması {#background-reading}

- [Hisse kanıtına giriş](/developers/docs/consensus-mechanisms/pos/)
- [Tek slot kesinliği](/roadmap/single-slot-finality/)
- [Casper FFG makalesi](https://arxiv.org/abs/1710.09437)
- [Gasper makalesi](https://arxiv.org/abs/2003.03052)
- [yalın Ethereum](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### Son araştırmalar {#recent-research}

- [Ethresear.ch Mutabakat](https://ethresear.ch/c/consensus/29)
- [Kullanılabilirlik/Kesinlik ikilemi](https://arxiv.org/abs/2009.04987)
- [3-slot kesinliği: SSF "tek" slot ile ilgili değildir](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### Yürütme {#execution}

Yürütme katmanı, işlemleri yürütmek, [Ethereum sanal makinesini (EVM)](/developers/docs/evm/) çalıştırmak ve mutabakat katmanına iletilecek yürütme yüklerini oluşturmakla ilgilenir. Buradaki araştırmalar iki kola ayrılır: durumu tutmayı ve kanıtlamayı ucuz hale getirmek ve düğümleri çalıştıran kişilere daha fazla maliyet yüklemeden işlem kapasitesini artırmak. Aşağıdakiler de dahil olmak üzere birçok aktif araştırma alanı vardır:

- durum oluşturan işlemlerin gaz maliyetini yeniden fiyatlandırmak;
- düğümlerin artık sunmasına gerek kalmayan geçmiş sonlanması;
- işlemlerin paralel olarak doğrulanmasına olanak tanıyan blok düzeyinde erişim listeleri;
- durum, veri ve hesaplamayı ayrı ayrı fiyatlandıran çok boyutlu ücret piyasaları;
- ve katman 1 (l1) bloklarının yürütülmesini bir zkEVM ile kanıtlamak.

#### Arka plan okuması {#background-reading-1}

- [EVM'ye giriş](/developers/docs/evm/)
- [Ethresear.ch yürütme katmanı](https://ethresear.ch/c/execution-layer-research/37)
- [Ethereum yürütme katmanı spesifikasyonları](https://github.com/ethereum/execution-specs)
- [Veritabanı optimizasyonları](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Son araştırmalar {#recent-research-1}

- [EIP-7928: Blok düzeyinde erişim listeleri](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: Durum oluşturma gaz maliyeti artışı](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: Birleşik çok boyutlu ücret piyasası](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69, geçmiş sonlanması ve daha basit makbuzlar](https://eips.ethereum.org/EIPS/eip-7642)
- [Bir L1 zkEVM sunmak: gerçek zamanlı kanıtlama](https://blog.ethereum.org/2025/07/10/realtime-proving)

### Sansür direnci ve blok oluşturma {#censorship-resistance-and-block-building}

Çoğu Ethereum bloğu şu anda az sayıda uzmanlaşmış oluşturucu tarafından bir araya getirilmektedir, bu da hangi işlemlerin dahil edileceğine karar verme gücünü yoğunlaştırmaktadır. Bu alandaki araştırmalar, oluşturucu piyasasını protokolün kendisine dahil etmeyi kapsar; böylece bir bloğu teklif etme ve oluşturma rolleri, protokol dışı yazılımlar yerine mutabakat kuralları ile ayrılır ve doğrulayıcılara, oluşturucuların dışarıda bıraktığı işlemlerin dahil edilmesini zorlama yolu verilir.

#### Arka plan okuması {#background-reading-21}

- [Teklifçi-oluşturucu ayrımı (PBS)](/roadmap/pbs/)
- [Tek gizli lider seçimi](/roadmap/secret-leader-election/)

#### Son araştırmalar {#recent-research-21}

- [EIP-7732: Protokole dahil edilmiş teklifçi-oluşturucu ayrımı](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: Çatal seçimi zorunlu dahil etme listeleri](https://eips.ethereum.org/EIPS/eip-7805)
- [Teklifçi/oluşturucu ayrımı altında işlemlerin sansür direncini artırma](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Durum büyümesi ve durumsuzluk {#state-growth-and-statelessness}

Her tam düğüm Ethereum'un durumunu depolar, bu nedenle bu durumun büyüme hızı, bir düğüm çalıştırmanın maliyeti için bir taban belirler. Kısa vadede araştırmalar, durum oluşturan işlemleri yeniden fiyatlandırmaya ve düğümlerin artık tutmasına gerek kalmayan geçmiş sonlanmasına odaklanmaktadır. Daha uzun vadede plan, Ethereum'un on altılı Merkle-Patricia ağacını çok daha küçük ispatlar üreten ikili bir ağaçla değiştirmek ve bir düğümün tüm durumu tutmadan blokları doğrulayabilmesi için durumsuzluğa doğru ilerlemektir. Bu alandaki önceki çalışmalar Verkle Ağaçları'nı varsayıyordu; mevcut teklif, bu önceki çalışma çizgisi için belirlenen tanık gaz programını taşıyan birleşik bir ikili ağaçtır.

#### Arka plan okuması {#background-reading-22}

- [Durumsuzluk ve durum zaman aşımı](/roadmap/statelessness/)
- [Ethereum durumsuzluk kitabı](https://stateless.fyi/)

#### Son araştırmalar {#recent-research-22}

- [EIP-7864: Birleşik ikili ağaç kullanan Ethereum durumu](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: Durumsuzluk gaz maliyeti değişiklikleri](https://eips.ethereum.org/EIPS/eip-4762)
- [Merkeziyetsiz durum Ethereum için neden önemlidir?](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### Kuantum sonrası kriptografi {#post-quantum-cryptography}

Ethereum'un doğrulayıcı imzaları ve uygulama katmanının çoğu, yeterince yetenekli bir kuantum bilgisayarın kırabileceği eliptik eğri kriptografisine dayanır. Ethereum'u kuantum dirençli hale getirmek, bu imzaları hash tabanlı veya kafes tabanlı alternatiflerle değiştirmek, imza toplamayı büyük bir doğrulayıcı seti için yeterince verimli tutmak ve mevcut hesaplara bir geçiş yolu sağlamak anlamına gelir. Ethereum Vakfı özel bir kuantum sonrası ekip yönetmektedir ve bu, yol haritasındaki en uzun ufuklu programlardan biridir.

#### Arka plan okuması {#background-reading-23}

- [Kuantum direnci](/roadmap/security/quantum-resistance/)
- [Kuantum sonrası Ethereum](https://pq.ethereum.org/)

#### Son araştırmalar {#recent-research-23}

- [yalın Ethereum](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Ethresear.ch kriptografi](https://ethresear.ch/c/cryptography/28)
- [yalın Ethereum uygulamaları](https://github.com/leanEthereum)

## İstemci Geliştirme {#client-development}

Ethereum istemcileri, Ethereum protokolünün uygulamalarıdır. İstemci geliştirme, protokol araştırmalarından elde edilen sonuçları bu istemcilere entegre ederek gerçeğe dönüştürür. İstemci geliştirme, istemci spesifikasyonlarını güncellemeyi ve belirli uygulamalar oluşturmayı içerir.

Bir Ethereum düğümünün iki yazılım parçasını çalıştırması gerekir:

1. blokzincirin başını takip etmek, blokları yaymak ve mutabakat mantığını işlemek için bir fikir birliği istemcisi
2. Ethereum Sanal Makinesi'ni desteklemek ve işlemleri ve akıllı sözleşmeleri yürütmek için bir yürütme istemcisi

Bu ikisinin yanı sıra, katman 1 (l1) bloklarının yürütülmesini kanıtlayan istemciler ve kuantum sonrası imzalar etrafında oluşturulmuş yalın fikir birliği istemcileri de dahil olmak üzere yeni istemci sınıflarının prototipleri oluşturulmaktadır.

Düğümler ve istemciler hakkında daha fazla ayrıntı ve mevcut tüm istemci uygulamalarının bir listesi için [düğümler ve istemciler sayfasına](/developers/docs/nodes-and-clients/) bakın. Ayrıca tüm Ethereum yükseltmelerinin geçmişini [geçmiş sayfasında](/ethereum-forks/) bulabilirsiniz.

### Yürütme İstemcileri {#execution-clients}

- [Yürütme istemcisi spesifikasyonu](https://github.com/ethereum/execution-specs)
- [Yürütme API spesifikasyonu](https://github.com/ethereum/execution-apis)

### Fikir Birliği İstemcileri {#consensus-clients}

- [Fikir birliği istemcisi spesifikasyonu](https://github.com/ethereum/consensus-specs)
- [İşaret (Beacon) API spesifikasyonu](https://ethereum.github.io/beacon-APIs/)

### zkEVM istemcileri {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Bir L1 zkEVM sunmak: güvenlik temelleri](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## Ölçeklendirme ve performans {#scaling-and-performance}

Ethereum'u ölçeklendirmek, Ethereum araştırmacıları için büyük bir odak alanıdır ve aynı anda iki yolda ilerler: katman 1'in (l1) kendi işlem kapasitesini artırmak ve yürütmeyi verilerini Ethereum'a gönderen toplamalar (rollups) üzerine taşımak. Mevcut çalışmalar arasında blok gaz limitini artırmak, durum büyümesini yeniden fiyatlandırmak, Rollup verileri için blob kapasitesini genişletmek ve bir düğümün depolaması ve doğrulaması gerekenleri azaltmak yer alıyor. Ethereum'u ölçeklendirme hakkında giriş niteliğindeki bilgiler [ölçeklendirme sayfamızda](/developers/docs/scaling/) ve [ölçeklendirme yol haritasında](/roadmap/scaling/) mevcuttur.

### Katman 2 {#layer-2}

Artık işlemleri toplu işleme (batching) ve bunları Ethereum katman 1 (l1) üzerinde güvence altına alma konusunda farklı teknikler kullanarak Ethereum'u ölçeklendiren çeşitli katman 2 (l2) protokolleri bulunmaktadır. Açık araştırmalar, kanıtlamanın gecikmesini ve maliyetini azaltmayı, bir işlemin güven gerektirmeyen kesinliğe ulaşması için geçen süreyi kısaltmayı ve kullanıcılara birçok Rollup genelinde tek bir tutarlı deneyim sunmayı içerir.

#### Arka plan okuması {#background-reading-2}

- [Katman 2'ye giriş](/layer-2/)
- [L2BEAT: ölçeklendirme özeti](https://l2beat.com/scaling/summary)
- [Rollup merkezli bir ethereum yol haritası](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### Son araştırmalar {#recent-research-2}

- [Ethresear.ch Katman 2](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: zincir içi maliyetler](https://l2beat.com/scaling/costs)
- [2026'da Ethereum üzerinde inşa etmek: neler değişti](/latest/building-on-ethereum-in-2026/)

### Birlikte çalışabilirlik {#interoperability}

Kullanıcılar ve varlıklar Ethereum katman 1 (l1) ve birçok katman 2 (l2) üzerine yayılmıştır ve araştırma problemi, bir aracıya güvenmeden bu zincirler arası hareket etmelerine ve işlem yapmalarına izin vermektir. Buradaki çalışmalar, niyet odaklı transferleri, standartlaştırılmış zincirler arası adresleme ve isimlendirmeyi, genel mesaj iletimini ve cüzdan düzeyinde zincir soyutlamasını kapsar. Bu, emanetçi köprülerin varlıkları tuttuğu bir modelin yerini alır ve köprüler tarihsel olarak ekosistemdeki en büyük kayıp kaynaklarından biri olmuştur, bu nedenle herhangi bir zincirler arası mekanizmanın güvenliği merkezi bir endişe olmaya devam etmektedir.

#### Arka plan okuması {#background-reading-3}

- [Blokzincir köprülerine giriş](/bridges/)
- [Ethereum'u yeniden tek bir zincir gibi hissettirmek](https://blog.ethereum.org/2025/11/18/eil)
- [Açık Niyetler Çerçevesi](https://openintents.xyz/)
- [Köprüleri doğrulama](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Son araştırmalar {#recent-research-3}

- [ERC-7683: Zincirler arası niyetler](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: Birlikte çalışabilir adresler](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: Birlikte çalışabilir isimler](https://eips.ethereum.org/EIPS/eip-7828)

### Veri kullanılabilirliği ve blob ölçeklendirmesi {#data-availability-and-blob-scaling}

Toplamalar (Rollup'lar) verilerini Ethereum'a blob'lar halinde gönderir ve bu veri katmanını ölçeklendirmek, yürütmeyi ölçeklendirmekten ayrı, başlı başına bir araştırma problemidir. Ethereum artık veri kullanılabilirliği örneklemesi (DAS) kullanıyor, böylece doğrulayıcılar blob verilerinin tamamını indirmek yerine parçalarını örnekleyerek yayınlandığını doğrulayabilir ve blob kapasitesi, yalnızca blob parametrelerine ayrılmış çatallanmalar yoluyla kademeli olarak artırılır. Açık sorular arasında örneklemenin ne kadar ileri götürülebileceği, evde staking yapan kişiler için bant genişliği gereksinimlerinin nasıl yönetilebilir tutulacağı ve blob fiyatlandırmasının talebe nasıl yanıt vermesi gerektiği yer alıyor.

#### Arka plan okuması {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Fusaka yükseltmesi](/roadmap/fusaka/)
- [danksharding](/roadmap/danksharding/)
- [Veri kullanılabilirliği](/developers/docs/data-availability/)
- [EIP-4844: Parça blob işlemleri](https://eips.ethereum.org/EIPS/eip-4844)
- [Proto-Danksharding notları](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### Son araştırmalar {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: Yalnızca blob parametreli sert çatallanmalar](https://eips.ethereum.org/EIPS/eip-7892)
- [Ethresear.ch Parçalama (Sharding)](https://ethresear.ch/c/sharding/6)

### Donanım {#hardware}

Mütevazı donanımlarda [düğümler çalıştırmak](/developers/docs/nodes-and-clients/run-a-node/), Ethereum'u merkeziyetsiz tutmanın temelidir, bu nedenle işlem kapasitesindeki her artış, bir düğüm operatörüne maliyetiyle tartılmalıdır. Blok gaz limitinin artması ve daha fazla artışın planlanmasıyla birlikte aktif araştırmalar; durum büyümesini ve bunun nasıl fiyatlandırılacağını, daha büyük durumlarda eşzamanlama ve veritabanı performansını, geçmiş sonlanmasından elde edilebilecek disk tasarruflarını ve nihayetinde durumsuzluğu kapsamaktadır.

#### Arka plan okuması {#background-reading-5}

- [Kendi Ethereum düğümünüzü kurun](/developers/docs/nodes-and-clients/run-a-node/)
- [Durumsuzluk ve durum zaman aşımı](/roadmap/statelessness/)
- [ARM üzerinde Ethereum](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Son araştırmalar {#recent-research-5}

- [Ethereum'u Ölçeklendirme: daha yüksek bir gaz limitine ve ötesine giden yol](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: Gaz limiti programı](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: Durum oluşturma gaz maliyeti artışı](https://eips.ethereum.org/EIPS/eip-8037)

## Güvenlik {#security}

Güvenlik; spam ve dolandırıcılığı önleme, cüzdan güvenliği, donanım güvenliği, kriptoekonomik güvenlik, sansür direnci, kuantum sonrası hazırlık, hata avcılığı ve uygulamaların ve istemci yazılımlarının test edilmesi ve doğrulanmasını içerebilecek geniş bir konudur. Ethereum'un [güvenlik yol haritası](/roadmap/security/) protokol düzeyindeki çalışmaları kapsar.

### Kriptografi ve ZKP {#cryptography--zkp}

Sıfır bilgi ispatı (ZKP) ve kriptografi, Ethereum ve uygulamalarına gizlilik ve güvenlik inşa etmek için kritik öneme sahiptir. Sıfır bilgi kanıtlama, araştırmadan üretim altyapısına geçmiştir: gerçek Ethereum bloklarını kanıtlayan kanıtlayıcılar artık gecikme, maliyet ve sağlamlık açısından halka açık olarak kıyaslanmaktadır. Açık problemler de buna bağlı olarak, katman 1 (l1) bloklarını gerçek zamanlı yapacak kadar hızlı kanıtlamaya, kullanımda olan ispat sistemlerinin güvenliğini titizlikle hesaba katmaya ve kuantum sonrası kriptografiye hazırlanmaya doğru kaymıştır.

#### Arka plan okuması {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Gizlilik](/roadmap/privacy/)
- [Sıfır Bilgi (Zero Knowledge) podcast'i](https://zeroknowledge.fm/)

#### Son araştırmalar {#recent-research-6}

- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Ethresear.ch kriptografi](https://ethresear.ch/c/cryptography/28)
- [Hash tabanlı zkEVM ispat sistemleri için sağlamlık hesaplayıcısı](https://github.com/ethereum/soundcalc)
- [Bir L1 zkEVM sunmak: güvenlik temelleri](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### Cüzdanlar {#wallets}

Ethereum cüzdanları tarayıcı eklentileri, masaüstü ve mobil uygulamalar veya Ethereum üzerindeki akıllı sözleşmeler olabilir. Hesap soyutlama artık deneysel değildir: ERC-4337, protokol değişiklikleri olmadan akıllı hesaplar sağlar ve EIP-7702, sıradan bir hesabın kod ayarlamasına izin verir, böylece toplu işleme, gaz sponsorluğu ve sosyal kurtarma, kullanıcının zaten sahip olduğu adresle çalışır. Açık araştırmalar artık protokolün kendisinde yerel hesap soyutlamaya, modüler ve denetlenebilir hesap mimarilerine ve sıradan insanların güvenle çalıştırabileceği anahtar yönetimi ve kurtarmaya odaklanmaktadır.

#### Arka plan okuması {#background-reading-7}

- [Cüzdanlara giriş](/wallets/)
- [Cüzdan güvenliğine giriş](/security/)
- [Hesap soyutlama](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Ethresear.ch Güvenlik](https://ethresear.ch/c/security/25)

#### Son araştırmalar {#recent-research-7}

- [EIP-8141: Çerçeve işlemi](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: Cüzdan çağrı API'si](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: Çoklu enjekte edilmiş sağlayıcı keşfi](https://eips.ethereum.org/EIPS/eip-6963)
- [Doğrulama odaklı akıllı sözleşme cüzdanları](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## Topluluk, eğitim ve erişim {#community-education-and-outreach}

Yeni kullanıcıların Ethereum'a sisteme katılımı, yeni eğitim kaynakları ve erişim yaklaşımları gerektirir. Bu; blog yazıları ve makaleler, kitaplar, podcast'ler, memler, öğretim kaynakları, etkinlikler ve topluluklar oluşturan, yeni başlayanları karşılayan ve insanları Ethereum hakkında eğiten diğer her şeyi içerebilir.

### Tasarım ve Kullanıcı Deneyimi (UX) {#design-and-ux}

Daha fazla insanı Ethereum'a dahil etmek için ekosistemin tasarımını ve kullanıcı deneyimini geliştirmesi gerekir. Bu, tasarımcıların ve ürün uzmanlarının cüzdanların ve uygulamaların nasıl çalıştığını yeniden incelemesini gerektirir ve giderek artan bir şekilde halihazırda var olan standartlara göre tasarım yapmak anlamına gelir: toplu cüzdan çağrıları, gaz sponsorluğu, kurtarılabilen hesaplar ve ait oldukları zinciri taşıyan insan tarafından okunabilir adresler. Web3 UX araştırmaları için nispeten az sayıda kurallı mekan vardır, bu nedenle yayınlanmış çalışmalar ve tasarım rehberliği genellikle dağınıktır.

#### Arka plan okuması {#background-reading-8}

- [Web3'te Tasarım ve UX](/developers/docs/design-and-ux/)
- [Ethereum kullanıcı deneyimi yol haritası](/roadmap/user-experience/)
- [Web3 Tasarım Başucu Kitabı](https://learnweb3.design/)
- [Web3 UX Tasarım El Kitabı](https://web3ux.design/)

#### Son araştırmalar {#recent-research-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: Cüzdan çağrı API'si](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: Birlikte çalışabilir isimler](https://eips.ethereum.org/EIPS/eip-7828)

### Ekonomi {#economics}

Ethereum'daki ekonomi araştırmaları genel olarak iki yaklaşımı izler: ekonomik teşviklere dayanan mekanizmaların güvenliğini doğrulamak ("mikroekonomi") ve protokoller, uygulamalar ve kullanıcılar arasındaki değer akışlarını analiz etmek ("makroekonomi"). Ethereum'un yerel varlığı (Ether) ve üzerine inşa edilen token'lar (örneğin NFT'ler ve ERC-20 token'ları) ile ilgili karmaşık kriptoekonomik faktörler vardır.

#### Arka plan okuması {#background-reading-9}

- [Sağlam Teşvikler Grubu (Robust Incentives Group)](https://rig.ethereum.org/)
- [Ethereum ekonomisi ustalık sınıfı ve ekonomik model](https://github.com/CADLabs/ethereum-economic-model)

#### Son araştırmalar {#recent-research-9}

- [Ethresear.ch Ekonomi](https://ethresear.ch/c/economics/16)
- [Dolaşımdaki arz dengesi](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [MEV'i Ölçmek: Orman ne kadar karanlık?](https://arxiv.org/abs/2101.05511)

### Blok alanı ve ücret piyasaları {#blockspace-fee-markets}

Blok alanı piyasaları, son kullanıcı işlemlerinin doğrudan Ethereum'a (Katman 1) veya köprülenmiş ağlara, örn. toplamalara (Katman 2) dahil edilmesini yönetir. Ethereum'da işlemler, zinciri spam'den koruyan ve tıkanıklığı fiyatlandıran EIP-1559 olarak protokol içinde dağıtılan ücret piyasasına sunulur. Her iki katmanda da işlemler, bu dışsallıkları yakalamak veya yönetmek için yeni piyasa yapılarını teşvik eden Maksimum Çıkarılabilir Değer (MEV) olarak bilinen dışsallıklar üretebilir. Mevcut çalışmalar, durum, veri ve hesaplama bağımsız olarak tıkandığından, bunu aynı anda birkaç kaynağı fiyatlandırmaya ve blokları kimin ve hangi koşullarda bir araya getirdiğini değiştirmeye kadar genişletmektedir.

#### Arka plan okuması {#background-reading-10}

- [Ethereum Blokzinciri için İşlem Ücreti Mekanizması Tasarımı: EIP-1559'un Ekonomik Analizi (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559 Simülasyonları (Sağlam Teşvikler Grubu)](https://ethereum.github.io/abm1559)
- [Temel ilkelerden Rollup ekonomisi](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Merkeziyetsiz Borsalarda Önden Koşma (Frontrunning), İşlem Yeniden Sıralama ve Mutabakat İstikrarsızlığı](https://arxiv.org/abs/1904.05234)

#### Son araştırmalar {#recent-research-10}

- [EIP-7999: Birleşik çok boyutlu ücret piyasası](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: Blok düzeyinde erişim listeleri](https://eips.ethereum.org/EIPS/eip-7928)
- [Alanlar arası MEV](https://arxiv.org/abs/2112.01472)

### Hisse kanıtı teşvikleri {#proof-of-stake-incentives}

Doğrulayıcılar, dürüst olmayan davranışlara karşı teminat olarak Ethereum'un yerel varlığını (Ether) kullanırlar. Bunun kriptoekonomisi ağın güvenliğini belirler. Gelişmiş doğrulayıcılar, açık saldırılar başlatmak için teşvik katmanının nüanslarından yararlanabilirler. Pectra yükseltmesinden bu yana, doğrulayıcılar çok daha büyük bir etkin bakiye tutabilir ve bundan kazanç sağlayabilir ve birkaç doğrulayıcıyı tek bir doğrulayıcıda birleştirebilir, bu da onları çalıştırmanın ekonomisini değiştirir.

#### Arka plan okuması {#background-reading-11}

- [Maksimum etkin bakiye](/roadmap/pectra/maxeb/)
- [Ethereum ekonomisi ustalık sınıfı ve ekonomik model](https://github.com/CADLabs/ethereum-economic-model)
- [PoS teşviklerinin simülasyonları (Sağlam Teşvikler Grubu)](https://ethereum.github.io/beaconrunner/)

#### Son araştırmalar {#recent-research-11}

- [Sağlam Teşvikler Grubu](https://rig.ethereum.org/)
- [PoS Ethereum'a Üç Saldırı](https://arxiv.org/abs/2110.10086)

### Likit staking ve türevleri {#liquid-staking-and-derivatives}

Likit staking, 32 ETH'den daha azına sahip kullanıcıların, Ether'i merkeziyetsiz finansta (DeFi) kullanılabilecek stake edilmiş Ether'i temsil eden bir token ile değiştirerek staking getirileri elde etmelerini sağlar. Bununla birlikte, likit staking ile ilişkili teşvikler ve piyasa dinamiklerinin yanı sıra Ethereum'un güvenliği üzerindeki etkisi (örneğin, merkezileşme riskleri) hala keşfedilmektedir.

#### Arka plan okuması {#background-reading-12}

- [Ethresear.ch likit staking](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Güven gerektirmeyen Ethereum staking'ine giden yol](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### Son araştırmalar {#recent-research-12}

- [Likit Staking Türevlerinin riskleri](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [Lido'dan para çekme işlemlerini yönetme](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## Test Etme {#testing}

### İstemci ve ağ testi {#client-and-network-testing}

Ethereum'un spesifikasyonları çalıştırılabilirdir ve bunlardan üretilen test fikstürleri, istemci ekiplerinin uygulamalarını kontrol ettikleri şeylerdir. Bunların yanı sıra, paylaşılan test donanımları istemcileri birbirlerine ve kasıtlı olarak düşmanca ağ koşullarına karşı çalıştırır ve halka açık test ağları (testnet), yükseltmeleri Ana Ağ'a (mainnet) ulaşmadan önce dener. Bu altyapıyı geliştirmek, mevcut en yüksek kaldıraçlı çalışmalardan bazılarıdır, çünkü hatalar kullanıcılara ulaşmadan önce bu şekilde yakalanır.

#### Arka plan okuması {#background-reading-24}

- [Ethereum yürütme katmanı spesifikasyonları](https://github.com/ethereum/execution-specs)
- [Fikir birliği istemcisi spesifikasyonu](https://github.com/ethereum/consensus-specs)

#### Son araştırmalar {#recent-research-24}

- [hive, uçtan uca bir istemci test donanımı](https://github.com/ethereum/hive)
- [Assertoor, bir test ağı test aracı](https://github.com/ethpandaops/assertoor)

### Biçimsel doğrulama {#formal-verification}

Biçimsel doğrulama, bir spesifikasyonun veya uygulamanın amaçlandığı gibi davrandığını belirlemek için makine kontrollü matematiksel ispat kullanır. Ethereum'da bu, EVM uygulamalarının biçimsel bir anlambilimle eşleştiğini kanıtlamayı, sıfır bilgi kanıtlayıcılarının dayandığı devrelerin ve ispat sistemlerinin sağlamlığını kanıtlamayı ve bunların altındaki kriptografik ilkelleri doğrulamayı kapsar. Daha fazla araştırma bu ispatları güçlendirebilir ve yığının daha büyük bir kısmına genişletebilir.

#### Arka plan okuması {#background-reading-13}

- [Doğrulanmış zkEVM'ler](https://verified-zkevm.org/)
- [Biçimsel Doğrulama (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Son araştırmalar {#recent-research-13}

- [Doğrulanmış zkEVM projesine genel bakış](https://github.com/Verified-zkEVM/Overview)
- [KEVM: K'de EVM'nin anlambilimi](https://github.com/runtimeverification/evm-semantics)
- [Yatırma sözleşmesinin biçimsel doğrulaması](https://github.com/runtimeverification/deposit-contract-verification)

## Veri bilimi ve analitik {#data-science-and-analytics}

Ethereum'daki etkinlik ve ağın sağlığı hakkında ayrıntılı bilgi veren daha fazla veri analizi aracına ve kontrol paneline ihtiyaç vardır. Temel verilerin çoğu halka açık ve sorgulanabilirdir, bu nedenle boşluk genellikle erişimden ziyade analiz ve sunumdadır.

### Arka plan okuması {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [İstemci çeşitliliği kontrol paneli](https://clientdiversity.org/)
- [Ethereum JSON-RPC yürütme API spesifikasyonu](https://ethereum.github.io/execution-apis/)

#### Son araştırmalar {#recent-research-14}

- [Sağlam Teşvikler Grubu Veri Analizi](https://rig.ethereum.org/)
- [ethPandaOps açık verileri](https://ethpandaops.io/data/)
- [L2BEAT: ölçeklendirme özeti](https://l2beat.com/scaling/summary)

## Uygulamalar ve araçlar {#apps-and-tooling}

Uygulama katmanı, işlemleri Ethereum'un temel katmanında sonuçlandıran çeşitli bir program ekosistemini destekler. Geliştirme ekipleri, önemli Web2 uygulamalarının birleştirilebilir, izinsiz ve sansüre dirençli sürümlerini oluşturmak veya tamamen yeni Web3'e özgü kavramlar yaratmak için Ethereum'dan yararlanmanın yeni yollarını sürekli olarak buluyor. Aynı zamanda, Ethereum üzerinde merkeziyetsiz uygulama (dapp) oluşturmayı daha az karmaşık hale getiren yeni araçlar geliştiriliyor.

### DeFi {#defi}

Merkeziyetsiz finans (DeFi), Ethereum üzerine inşa edilen birincil uygulama sınıflarından biridir. DeFi, kullanıcıların akıllı sözleşmeler kullanarak kripto varlıkları depolamasına, transfer etmesine, ödünç vermesine, ödünç almasına ve yatırım yapmasına olanak tanıyan birleştirilebilir "para legoları" oluşturmayı amaçlar. DeFi, sürekli güncellenen hızlı hareket eden bir alandır. Güvenli, verimli ve erişilebilir protokoller üzerine araştırmalara sürekli ihtiyaç duyulmaktadır.

#### Arka plan okuması {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: DeFi nedir?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Son araştırmalar {#recent-research-15}

- [Merkeziyetsiz finans, merkezi mülkiyet mi?](https://arxiv.org/pdf/2012.09306.pdf)
- [Ethresear.ch Uygulamalar](https://ethresear.ch/c/applications/18)

### DAO'lar {#daos}

Ethereum için etkili bir kullanım durumu, DAO'ların kullanımı yoluyla merkeziyetsiz bir şekilde organize olma yeteneğidir. Ethereum'daki DAO'ların, insanların seçeneklerini geleneksel şirketlerin ve kuruluşların ötesine büyük ölçüde genişleten, güveni minimize edilmiş bir koordinasyon aracı olarak gelişmiş yönetişim biçimlerini yürütmek için nasıl geliştirilebileceği ve kullanılabileceği konusunda birçok aktif araştırma bulunmaktadır.

#### Arka plan okuması {#background-reading-16}

- [DAO'lara giriş](/dao/)

#### Son araştırmalar {#recent-research-16}

- [DAO ekosisteminin haritasını çıkarmak](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Geliştirici araçları {#developer-tools}

Ethereum geliştiricileri için araçlar hızla gelişiyor. Bu genel alanda yapılacak çok sayıda aktif araştırma ve geliştirme var.

#### Arka plan okuması {#background-reading-17}

- [Programlama diline göre araçlar](/developers/docs/programming-languages/)
- [Geliştirici Çerçeveleri](/developers/docs/frameworks/)
- [Dapp'lere giriş](/developers/docs/dapps/)
- [Token standartları](/developers/docs/standards/tokens/)

#### Son araştırmalar {#recent-research-17}

- [Eth R&D Discord](https://discord.gg/qGpsxSA)
- [Ethereum yürütme API spesifikasyonları](https://github.com/ethereum/execution-apis)

### Oracle'lar {#oracles}

Oracle'lar, zincir dışı verileri izinsiz ve merkeziyetsiz bir şekilde blokzincire aktarır. Bu verileri zincir içine almak, dapp'lerin gerçek dünya varlıklarındaki fiyat dalgalanmaları, zincir dışı uygulamalardaki olaylar veya hatta hava durumundaki değişiklikler gibi gerçek dünya olaylarına tepki vermesini sağlar.

#### Arka plan okuması {#background-reading-18}

- [Oracle'lara giriş](/developers/docs/oracles/)

#### Son araştırmalar {#recent-research-18}

- [Blokzincir oracle'ları anketi](https://arxiv.org/pdf/2004.07140.pdf)

### Uygulama güvenliği {#app-security}

Ethereum'daki hack'ler genellikle protokolün kendisinden ziyade bireysel uygulamalardaki güvenlik açıklarından yararlanır. Hacker'lar ve uygulama geliştiricileri, yeni saldırılar ve savunmalar geliştirmek için bir silahlanma yarışına kilitlenmiş durumdalar. Bu, uygulamaları hack'lerden korumak için her zaman önemli araştırma ve geliştirmelerin gerektiği anlamına gelir.

#### Arka plan okuması {#background-reading-19}

- [Akıllı sözleşme güvenliği](/developers/docs/smart-contracts/security/)
- [Wormhole istismar raporu](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [Ethereum sözleşme hack'i otopsileri listesi](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### Son araştırmalar {#recent-research-19}

- [Ethresear.ch Uygulamalar](https://ethresear.ch/c/applications/18)

### Teknoloji yığını {#technology-stack}

Tüm Ethereum teknoloji yığınını merkeziyetsizleştirmek önemli bir araştırma alanıdır. Şu anda, Ethereum'daki dapp'ler genellikle merkezi araçlara veya altyapıya dayandıkları için bazı merkezileşme noktalarına sahiptir. Bu bağımlılığı azaltmak, uygulamaların tek bir sağlayıcıya güvenmeden Ethereum'u okumasını pratik hale getirmek anlamına gelir; işte burada hafif istemciler ve düğüm verilerine güven gerektirmeyen erişim devreye girer.

#### Arka plan okuması {#background-reading-20}

- [Ethereum yığını](/developers/docs/ethereum-stack/)
- [Hafif istemciler](/developers/docs/nodes-and-clients/light-clients/)
- [Akıllı sözleşmelere giriş](/developers/docs/smart-contracts/)
- [Merkeziyetsiz depolamaya giriş](/developers/docs/storage/)

#### Son araştırmalar {#recent-research-20}

- [Akıllı sözleşme birleştirilebilirliği](/developers/docs/smart-contracts/composability/)
- [Coinbase: Web3 Yığınına Giriş](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)