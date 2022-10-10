---
title: Ethereum Mainnet'te İşletme
description: Herkese açık Ethereum blok zincirindeki işletme uygulamaları hakkında kılavuzlar, makaleler ve araçlar
lang: tr
---

# İşletmeler için Ethereum Mainnet {#ethereum-for-enterprise}

Blockchain uygulamaları işletmelere yardımcı olur:

- Güveni artırır ve iş tarafları arasındaki koordinasyon maliyetini azaltır
- İş ağı mesuliyetini ve operasyonel verimliliği iyileştirir
- Yeni iş modelleri ve değer yaratma fırsatları oluşturur
- Kuruluşlarını rekabetçi bir şekilde geleceğe hazırlar

İşletmeler için blok zinciri uygulamaları, genel izinsiz Ethereum [Mainnet](/glossary/#mainnet) veya Ethereum teknolojisine dayalı özel blok zincirleri üzerine kurulabilir. [Özel İşletme Ethereum zincirleri](/enterprise/private-ethereum/) hakkında daha fazla bilgiye erişin.

## Genel ve özel Ethereum {#private-vs-public}

Yalnızca bir genel Ethereum Mainnet vardır. Mainnet üzerinde oluşturulan uygulamalar, İnternet üzerinde oluşturulan uygulamaların birbirine bağlanma şekilleriyle benzer şekilde birlikte çalışabilir ve merkeziyetsiz blok zincirinin tüm potansiyelinden yararlanır.

Birçok işletme ve konsorsiyum, Ethereum teknolojisine dayalı belirli uygulamalar için özel ve izinli blok zincirleri dağıttı.

### Anahtar farklılıkları {#key-differences}

- Blok Zinciri Güvenliği/Değişmezliği - Bir blok zincirinin kurcalamaya karşı direnci, mutabakat algoritması tarafından belirlenir. Ethereum Mainnet, dünya çapında bireyler ve madenciler tarafından işletilen binlerce bağımsız düğümün etkileşimi ile güvence altına alınmıştır. Özel zincirler tipik olarak bir veya birkaç kuruluş tarafından kontrol edilen az sayıda düğüme sahiptir; bu düğümler sıkı bir şekilde kontrol edilebilir ancak zinciri yeniden yazmak veya sahte işlemler yapmak için yalnızca birkaçının güvenliği ihlal edilmesi yeterli olur.
- Performans - Özel Kurumsal Ethereum zincirleri, özel donanım gereksinimleri ve Yetki İspatı gibi farklı mutabakat algoritmaları olan yüksek performanslı düğümler kullanabildiğinden, temel katmanda (Katman 1) daha yüksek işlem verimi elde edebilirler. Ethereum Mainnet'te, [Katman 2 ölçeklendirme çözümleri](/developers/docs/scaling/#layer-2-scaling) kullanılarak yüksek verim elde edilebilir.
- Maliyet - Özel bir zinciri çalıştırmanın maliyeti, öncelikle zinciri kurmak ve yönetmek için iş gücüne ve onu çalıştıracak sunuculara yansıtılır. Ethereum Mainnet'e bağlanmanın herhangi bir maliyeti olmasa da, her işlem için ether ile ödenmesi gereken bir gaz maliyeti vardır. Son kullanıcıların ve hatta işletmelerin işlemlerinde doğrudan ether kullanma ihtiyacını ortadan kaldırmak için işlem aktarıcıları (Gaz İstasyonları) geliştirilmektedir. Bazı [analizler](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf), bir uygulamayı çalıştırmanın toplam maliyetinin Mainnet'te özel bir zincir çalıştırmaya göre daha düşük olabileceğini göstermiştir.
- Düğüm İzni Verme - Özel zincirlere yalnızca yetkili düğümler katılabilir. Ethereum Mainnet'te herkes bir düğüm kurabilir.
- Gizlilik - Özel zincirlere yazılan verilere erişim, ağa erişimi kısıtlayarak ve erişim kontrolleri ve özel işlemlerle daha ayrıntılı bir şekilde kontrol edilebilir. Mainnet Katman 1'e yazılan tüm veriler herkes tarafından görüntülenebilir, bu nedenle hassas bilgiler zincir dışında saklanmalı ve iletilmeli veya başka bir şekilde şifrelenmelidir. Bunu kolaylaştıran tasarım kalıpları (örneğin, Baseline, Aztek) ve ayrıca verileri bölümlere ayrılmış ve Katman 1'in dışında tutabilen Katman 2 çözümleri ortaya çıkıyor.

### Neden Ethereum Mainnet üzerinde geliştirmelisiniz {#why-build-on-ethereum-mainnet}

İşletmeler; Hyperledger, Quorum ve Corda projelerinin başlatıldığı 2016 yılından bu yana blok zinciri teknolojisini deniyorlar. Odak noktası büyük ölçüde özel izinli kurumsal blok zincirleri üzerindeydi, ancak 2019'dan itibaren iş uygulamaları için halka açık ve özel blok zincirleri hakkında düşünmede bir değişiklik oldu. Forrester tarafından yürütülen bir [ankete](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf) göre "Ankete katılanlar ... bu potansiyeli görüyorlar, %75'i gelecekte halka açık blok zincirlerinden yararlanma olasılığının yüksek olduğunu ve yaklaşık üçte biri bunun çok muhtemel olduğunu söylüyor". EY'den Paul Brody, daha güçlü güvenlik/değişmezlik, şeffaflık, daha düşük toplam sahip olma maliyeti ve aynı zamanda Mainnet'te bulunan diğer tüm uygulamalarla birlikte çalışma yeteneği (ağ etkileri) gibi herkese açık blok zinciri oluşturmanın yararlarından (uygulamaya bağlı olarak) [bahsetti](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668). İşletmeler arasında ortak bir referans çerçevesinin paylaşılması, birbirleriyle iletişim kuramayan, bilgileri paylaşamayan veya senkronize edemeyen çok sayıda izole siloların gereksiz yere oluşturulmasını önler.

Odağı halka açık blok zincirlerine kaydıran bir başka gelişme de [katman 2'dir](/developers/docs/scaling/layer-2). Katman 2, öncelikle, genel zincirlerde yüksek verimli uygulamaları mümkün kılan bir ölçeklenebilirlik teknolojisi kategorisidir. Ancak Katman 2 çözümleri aynı zamanda [işletme geliştiricilerini geçmişte özel zincirleri seçmeye iten diğer zorlukların bazılarına da hitap edebilir.](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

Temel Protokol, zincir üzerinde herhangi bir hassas veri bırakmadan işletmeler arasında gizli ve karmaşık iş birliğine olanak tanıyan bir protokol tanımlayan önemli bir projedir. 2020 boyunca önemli bir [ivme](https://www.oasis-open.org/2020/08/26/baseline-protocol-achieves-key-milestone-with-release-of-v0-1-implementation-for-enterprise/) kazandı.

## İşletme geliştiricisi kaynakları {#enterprise-developer-resources}

### Organizasyonlar {#organizations}

Ethereum'u işletme dostu hâle getirmek için bazı ortak çabalar farklı kuruluşlar tarafından yapılmıştır:

- [Enterprise Ethereum Alliance (EEA)](https://entethalliance.org/) EEA, kuruluşların Ethereum teknolojisini günlük iş operasyonlarında benimsemelerini ve kullanmalarını sağlar. Ethereum ekosistemini, yeni iş fırsatları geliştirmesi, endüstrinin benimsenmesini teşvik etmesi ve birbirleriyle öğrenmesi ve iş birliği yapması için güçlendirir. EEA'nın Mainnet çalışma grubu, halka açık Ethereum Mainnet'i oluşturmakla ilgilenen işletmelerin temsilcilerinin yanı sıra onları desteklemek isteyen Ethereum topluluğunun üyeleri için bir odak noktasıdır.
- [Ethereum OASIS Open Project](https://github.com/ethereum-oasis/oasis-open-project) Ethereum OASIS Open Project, Ethereum'un uzun ömürlülüğünü, birlikte çalışabilirliğini ve entegrasyon kolaylığını kolaylaştıran yüksek kaliteli özellikler oluşturmak için çeşitli paydaşlara tarafsız bir forum sağlamak için var olan bir OASIS Open Project'tir. Proje, Ethereum protokolünde yeni özellikler ve geliştirmeleri kolaylaştıran net, açık standartlar, yüksek kaliteli belgeler ve paylaşılan test paketleri geliştirmeyi amaçlıyor.
- [Baseline Project](https://www.baseline-protocol.org/) Baseline Protocol, halka açık Ethereum Mainnet aracılığıyla düşük maliyetle güvenli ve özel iş süreçleri sağlamak için kriptografi, mesajlaşma ve blok zincirindeki ilerlemeleri birleştiren açık kaynaklı bir girişimdir. Protokol, zincir üzerinde herhangi bir hassas veri bırakmadan işletmeler arasında gizli ve karmaşık iş birliğine olanak tanır. Baseline Project, Ethereum OASIS Open Project'in bir alt projesidir ve Baseline Technical Steering Committee (Temel Teknik Yönlendirme Komitesi) tarafından koordine edilir.

### Ürünler ve hizmetler {#products-and-services}

- [Alchemy](https://www.alchemy.com/) _Ethereum üzerinde uygulamalar oluşturmak ve izlemek için API hizmetleri ve araçları sağlar_
- [Blockapps](https://blockapps.net/) _STRATO platformunu oluşturan Enterprise Ethereum protokolünün, araçlarının ve API'lerinin uygulanması_
- [Chainstack](https://chainstack.com/) _herkese açık ve izole müşteri bulutlarında barındırılan mainnet ve test ağı Ethereum altyapısı_
- [ConsenSys](https://consensys.net/) _Ethereum üzerine inşa etmek için bir dizi ürün ve aracın yanı sıra danışmanlık ve özel geliştirme hizmetleri sağlar_
- [Envision Blockchain](https://envisionblockchain.com/) _Ethereum Mainnet'te uzmanlaşmış kurumsal odaklı danışmanlık ve geliştirme hizmetleri sağlar_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _RFQ'ları, sözleşmeleri, satın alma emirleri ve güvenilir iş ortakları ağınızdaki faturalar vererek bir tedarik iş akışı sağlar_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _Apache 2.0 lisansı altında geliştirilen kurumsal odaklı açık kaynaklı bir Ethereum istemcisi, Java ile yazılmıştır_
- [Infura](https://infura.io/) _Ethereum ve IPFS ağlarına ölçeklenebilir API erişimi_
- [Provide](https://provide.services/) _Kurumsal Web3 uygulamaları için altyapı ve API'ler_
- [QuickNode](https://www.quicknode.com/) _birleşik bir ürün grubu ve kuruluş kademesinde çözümler sunarken NFT API, Jeton API gibi yüksek düzey API'lerle güvenilir ve hızlı düğümler düğümler sağlar_
- [Unibright](https://unibright.io/) _iş süreçleri ve entegrasyon alanında 20 yılı aşkın deneyime sahip blok zinciri uzmanları, mimarlar, geliştiriciler ve danışmanlardan oluşan bir ekip_

### Araçlar ve kütüphaneler {#tooling-and-libraries}

- [Alethio](https://explorer.aleth.io/) _Ethereum Veri Analizi Platformu_
- [Epirus](https://www.web3labs.com/epirus) _Web3 Labs'e ait, blok zinciri uygulamaları geliştirmek, dağıtmak ve izlemek için bir platform_
- [Ernst & Young'ın "Nightfall"u](https://github.com/EYBlockchain/nightfall) _özel işlemler için bir araç takımı_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _bir web3 sağlayıcısıyla kullanılacak bir işlem imzalama uygulaması_
- [Tenderly](https://tenderly.co/)_gerçek zamanlı analizler sağlayan, özel ağlar için destek sunarak uyarılarda bulunan ve izleme gerçekleştiren bir Veri Platformudur_
- [Truffle Suite](https://trufflesuite.com) _blok zinciri geliştirme paketi (Truffle, Ganache, Drizzle)_

### Ölçeklenebilirlik çözümleri {#scalability-solutions}

[Katman 2](/developers/docs/scaling/#layer-2-scaling), Ethereum'un (Katman 1) üzerinde çalışan, güvenlik özelliklerini Katman 1'den devralan ve daha yüksek işlem işleme kapasitesi (iş hacmi), daha düşük işlem ücretleri (yürütme maliyeti) ve Katman 1'den daha hızlı olarak işlem onayları sağlayan bir dizi teknoloji veya sistemdir. Katman 2 ölçeklendirme çözümleri, Katman 1 tarafından güvence altına alınır ama blok zinciri uygulamalarının Katman 1'in barındırabileceğinden çok daha fazla kullanıcıyı, eylemi veya veriyi işlemesine olanak tanır. Birçoğu, performansı ve güvenliği en üst düzeye çıkarmak için kriptografi ve sıfır-bilgi (ZK) ispatlarındaki son gelişmelerden yararlanır.

Uygulamanızı Katman 2 ölçeklenebilirlik çözümünün üzerine inşa etmek, [Önceden şirketleri özel blok zincirleri üzerine inşa etmeye yönlendiren endişelerin çoğuna yardımcı olurken](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/) aynı zamanda Mainnet'te geliştirmenin faydalarını korur.

Üretime hazır olan veya yakında sunulacak olan Katman 2 çözümlerine örnekler:

- İyimser toplamalar (zincir üstünde veriler, dolandırıcılık kanıtları)
  - [İyimserlik](https://optimism.io/)
  - [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
  - [Fuel Network](https://fuel.sh)
- ZK-toplamaları (zincir üstünde veriler, ZK doğruluk ispatları)
  - [Loopring](https://loopring.org)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkSync](https://matter-labs.io/)
  - [Aztec 2.0](https://aztec.network/)
- Validium (zincir dışı veriler, ZK doğruluk ispatları)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkPorter](https://matter-labs.io/)
- Plazma (zincir dışı veriler, dolandırıcılık kanıtları)
  - [OMG Network](https://omg.network/)
  - [Gazelle](https://gzle.io)
  - [Matic Network](https://matic.network/)
  - [LeapDAO](https://ipfs.leapdao.org/)
- Durum kanalları
  - [Connext](https://connext.network/)
  - [Kchannels](https://www.kchannels.io/)
  - [Perun](https://perun.network)
  - [Raiden](https://raiden.network/)
- Yan zincirler
  - [Skale](https://skale.network)
  - [POA Network](https://www.poa.network/)
- Birden çok kategorinin özelliklerini birleştiren hibrit çözümler
  - [Celer](https://celer.network)

## Mainnet'te kullanımda olan işletme uygulamaları {#enterprise-live-on-mainnet}

İşte genel Ethereum Mainnet'e dağıtılmış bazı işletme uygulamaları

### Ödemeler {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _kullanıcılara reklamlara yönelttikleri dikkat karşılığında ödeme yapar ve kullanıcılar yayımcıları desteklemek için Temel Dikkat Jetonu aracılığıyla onlara ödeme yapabilir_
- [hCaptcha](https://www.hcaptcha.com/) _Bot önleme CAPTCHA sistemi, web sitesi operatörlerine, makine öğrenimi için verileri etiketlemek üzere kullanıcılar tarafından yapılan iş için ödeme yapar. Artık Cloudflare tarafından dağıtılıyor_
- [Audius](https://audius.co/) _müzik tutkunlarını sanatçılarla doğrudan buluşturan ve sanatçılara her dinleme için doğrudan ve anında tam olarak hayranları tarafından ödeme yapılmasına olanak tanıyan bir yayınlama hizmetidir_
- [EthereumAds](https://ethereumads.com/) _web sitesi operatörlerinin reklam alanı satmasına ve Ethereum aracılığıyla ödeme almasına olanak tanır_

### Finans {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _tahvil ihracı ve uzlaşma_
- [Societe Generale](https://www.societegenerale.com/en/news/newsroom/societe-generale-performs-first-financial-transaction-settled-central-bank-digital) _tahvil ihracı_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _FAT Markaları için tahvil teklifi ve token'laştırma_
- [Sila](https://silamoney.com/) _bankacılık ve ACH ödemeleri için hizmet biçiminde altyapı_
- [Tinlake](https://tinlake.centrifuge.io/) _faturalar, ipotekler veya yayınlama telif ücretleri gibi token'laştırılmış gerçek dünya varlıkları yoluyla alacak finansmanı_
- [Kratos](https://triterras.com/kratos) _emtia ticareti yapanların ticaret yapmasına ve doğrudan çevrimiçi olarak borç verenlerden sermaye sağlamasına olanak tanıyan emtia ticareti ve ticaret finansmanı platformu_
- [Fasset](https://www.fasset.com/) _sürdürülebilir altyapıyı destekleyen bir platform_
- [Taurus](https://www.taurushq.com/) _token'laştırılmış menkul kıymetler verir_

### Verilerin noter tasdiki {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _kesinleşmiş kredilerin ayrıntıları hash'lenir ve Mainnet'te kaydedilir_
- [Splunk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _veri bütünlüğü, endekslenen verilerin hash'lerini düzenli aralıklarla Mainnet'e yazarak sağlanabilir_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _İtalya'nın en büyük haber ajansı sahte haberlerle mücadele ediyor ve okuyucuların haberleri Mainnet'e kaydederek haberlerin kaynağını doğrulamasını sağlıyor_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _kurumsal mesuliyeti ve güveni sağlamak için Ethereum'daki basın bültenlerini günlüğe kaydeder_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _saatlerin kökenini ve onarım geçmişini Ethereum'a kaydeder_
- [EthSign](https://ethsign.xyz/) _Ethereum blok zincirindeki imzalı elektronik belgeleri kaydeder_

### Tedarik zinciri {#supply-chain}

- [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _konşimento ve belge transfer sağlayıcısı_
- [Morpheus.network](https://morpheus.network/) _Ethereum Mainnet'te noter tasdikli verilerle özel zincirlerin bir karışımını uygulayan tedarik zinciri otomasyon platformu; Kanadalı gıda, petrol ve gaz distribütörü Federated Co-op Ltd. ve Arjantinli evcil hayvan maması sağlayıcısı Vitalcan tarafından kullanılır_
- [Minespider](https://www.minespider.com/) _tedarik zinciri takibi_
- [Follow Our Fibre](https://www.followourfibre.com) _viskoz tedarik zinciri izlenebilirliği_
- [EY OpsChain Network Procurement](https://blockchain.ey.com/products/contract-manager) _Şirketlerin, güvenilir iş ortaklarından oluşan ağınız genelinde RFQ'lar, sözleşmeler, satın alma emirleri ve faturalar yayınlayarak bir tedarik iş akışına dahil olmalarını sağlar_
- [Treum](https://treum.io/) _Blok zinciri teknolojisini kullanarak tedarik zincirlerine şeffaflık, izlenebilirlik ve ticaret kolaylığı getiriyor_
- [TradeTrust](https://www.tradetrust.io/) _uluslararası nakliye için elektronik Konşimentoları (eBL'ler) doğrular_
- [Birra Peroni](https://www.ey.com/en_gl/news/2021/05/birra-peroni-is-the-first-industrial-organization-to-mint-unique-non-fungible-tokens-using-ey-opschain-traceability) _her yeni bira partisi için NFT'ler üreterek tedarik zincirinde daha fazla görünürlük ve verimlilik sağlıyor_

### Referanslar ve sertifikalar {#credentials}

- [Utah Yerel Yönetimleri](http://www.utahcounty.gov/Dept/ClerkAud/DigitalCertCopy.html) _Ethereum'da dijital evlilik sertifikaları veriyor_
- [İki İtalyan lisesi](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _Ethereum Mainnet'te dijital diplomalar verdi_
- [St. Gallen Üniversitesi](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _bir İsviçre üniversitesinin diplomaları doğrulamaya yönelik pilot projesi_
- [Malta](https://cointelegraph.com/news/malta-to-store-education-certificates-on-a-blockchain) _ tüm eğitim sertifikaları [Hyland](https://www.learningmachine.com/) tarafından Mainnet'te kaydedilir_
- [Pohang Bilim ve Teknoloji Üniversitesi](https://www.theblockcrypto.com/linked/55176/south-korean-university-issues-blockchain-stored-diplomas-amid-the-spread-of-the-coronavirus) _Güney Kore üniversitesi yeni mezunlarına blok zincirinde saklanan diplomalar veriyor_
- [OpenCerts](https://opencerts.io/) _Singapur'da blok zinciri eğitim belgeleri yayınlıyor_
- [BlockCerts](https://www.blockcerts.org/) _blok zinciri kimlik bilgileri için açık bir standart geliştirdi_
- [SkillTree](http://skilltree.org/) _sona erme tetikleyicileri veya diğer becerilere dayanarak yapılandırılabilen çevrimiçi yetenek eğitimi ve sertifikaları_

### Yardımcı Araçlar {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _elektrik ödemeleri_

Bu listeye bir şeyler eklemek isterseniz, lütfen [katkıda bulunma talimatlarına](/contributing/) bakın.
