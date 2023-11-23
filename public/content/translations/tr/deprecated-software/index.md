---
title: Kullanımdan kaldırılmış yazılım
description: Geliştiricileri tarafından kullanımdan kaldırılmış yazılım
lang: tr
sidebarDepth: 2
---

# Kullanımdan kaldırılmış yazılım {#summary-deprecated-software}

Bu, Ethereum ile ilgili kullanımdan kaldırılmış veya artık desteklenmeyen önemli proje ve kaynakların bir listesidir. Kullanımdan kaldırılmış çalışmaları vurgulamak, kullanıcıların işlevsel alternatifleri bulmalarını sağlamak ve kötü amaçlı sürümlerin dağıtılmasını önlemek açısından önemlidir.

Bu liste topluluğumuz tarafından hazırlanmıştır. Eksik veya yanlış bir şey varsa, lütfen bu sayfayı düzenleyin!

## İş ispatı {#pow}

[İş ispatı](/developers/docs/consensus-mechanisms/pow), Ethereum'da Eylül 2022'ye kadar kullanılan bir mutabakat motorudur. Ethereum, [hisse ispatı](/developers/docs/consensus-mechanisms/pos) tabanlı bir mutabakat mekanizmasına geçiş yaptığında kullanımı sona ermiştir. Bu, istemci yazılımının [Ethhash](/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethhash) (madencilik algoritması) ve başlangıçta yürütüm istemcilerinde tümleşik olarak sunulan mutabakat mantığı ve blok yayılım işlevselliğininin tümü dahil olmak üzere iş ispatı madenciliği ile ilgili kısımlarının kullanımdan kaldırılmasıyla gerçekleştirildi. İstemcilerin kendileri değil, bazı temel bileşenleri kullanımdan kaldırılmıştır. İş ispatı kavramı, istemci yazılımının ilgili bileşenlerinin kaldırılmasının yarattığı genel etki sonucunda kullanımdan kaldırılmıştır.

## Yazılım {#software}

Bu bölüm, kullanımdan kaldırılmış masaüstü, komut satırı veya sunucu yazılımlarını içerir. Başlıca türleri arasında cüzdanlar, entegre geliştirme ortamları, diller ve Ethereum istemcileri yer alır. Kullanımdan kaldırılmış yazılımı, https://github.com/ethereum adresi altında barındırılan bir depo gibi orijinal kaynaktan geldiğinden emin olmadan yüklememeye dikkat edin.

### OpenEthereum {#open-ethereum}

Temmuz 2021'de kullanımdan kaldırılmıştır

**Özet**

OpenEthereum, düğüm sayısı bakımından ikinci en büyük Ethereum uygulamasıydı. OpenEthereum, Etherscan ve Gnosis Safe gibi Ethereum'un en büyük kullanıcılarından bazıları için anahtar altyapı parçası olması yönüyle önemli bir rol oynamıştır. İzleme yetenekleri, veri sağlayıcılar için güvenilir ve hızlı senkronizasyon sağlayarak onu diğer istemcilerden öne çıkarmıştır.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/openethereum/openethereum)

**Tarihçe**

OpenEthereum, madenciler, hizmet sağlayıcılar ve hızlı senkronizasyon ile maksimum çalışma süresine ihtiyaç duyan borsalar için tasarlanmıştır. OpenEthereum, hızlı ve güvenilir hizmetler için gereken temel altyapıyı sağlamıştır.

**Alternatifler**

[Tüm Ethereum yürütüm istemcisi seçeneklerini karşılaştırın](/developers/docs/nodes-and-clients/#execution-clients).

### Grid {#grid}

10 Ocak 2020'de kullanımdan kaldırılmıştır

**Özet**

Grid; Ethereum, IPFS ve merkeziyetsiz diğer ağlara güvenli bir şekilde erişmenizi sağlayan JavaScript tabanlı bir masaüstü uygulamasıydı. Grid, daha az teknik bilgiye sahip kullanıcıların merkeziyetsiz uygulamalarla güvenli bir şekilde etkileşime girmelerine yardımcı olmak için kullanıcı dostu bir arayüz sunuyordu ve bu da herkes için erişilebilirliği artırıyordu.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/ethereum/grid)

**Tarihçe**

Grid, aynı zamanda Mist'in varisi olarak görülebilir. Mist de bağımsız bir JavaScript tabanlı masaüstü uygulamasıydı ve bir Geth düğümü içeriyordu. Grid, cüzdan işlevini kaldırdı ve farklı türde düğümleri çalıştırmaya yönelik eklenti tarzında bir yaklaşım getirdi.

**Alternatifler**

[DAppNode](https://dappnode.io/), merkeziyetsiz uygulamaları, P2P istemcilerini ve blokzincir düğümlerini dağıtmaya ve barındırmaya yarayan bir platformdur.

### Ethereum Studio {#ethereum-studio}

7 Aralık 2020'de kullanımdan kaldırılmıştır

**Özet**

Ethereum Studio, kullanıcıların akıllı sözleşmeler oluşturmasına, test etmesine ve bunlar için ön yüzler geliştirmesine olanak tanıyan web tabanlı bir IDE idi.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/SuperblocksHQ/ethereum-studio)

**Tarihçe**

Ethereum Studio, kullanıcılara tümleşik bir Ethereum blokzinciri ve Solidity derleyicisine sahip bir IDE sunmak amacıyla geliştirilmiştir. Bunun yanı sıra, canlı kod düzenlemesi yapma ve bir terminal ihtiyacı olmadan tam merkeziyetsiz uygulamalar çıkarabilme olanağı da sağlamıştır.

**Alternatifler**

[Remix](https://remix.ethereum.org/), Solidity geliştirmeleri için alternatif bir web IDE'sidir. Ayrıca [Geliştirici Portalı](/developers/), web ve yerel geliştirme, belgeleme ve daha fazlası için araçlar sunmaktadır.

### Meteor Dapp Wallet {#meteor-dapp-wallet}

27 Mart 2019'da kullanımdan kaldırılmıştır

**Özet**

Meteor Dapp Wallet, Ethereum hesaplarını yönetmeye ve akıllı sözleşmelerle etkileşime girmeye yarayan bir Ethereum cüzdanı olan Mist'in bir bileşeniydi. Meteor Dapp Wallet web kullanıcı arayüzü, uzun yıllar boyunca "wallet.ethereum.org" alt alan adı olarak barındırılmıştır.

Ayrıca, Mist Çok İmzalı Sözleşmesi (solidity kodu) de dahil edilmiş ve Meteor Dapp Wallet, bu sözleşmeyi yapılandırmaya ve dağıtmaya yönelik bir kullanıcı arayüzü de sunmuştur.

**Kullanımdan kaldırılmamıştır: dağıtılmış Mist Çoklu İmzaları**

Binlerce kullanıcı tarafından Ethereum Ana Ağı'na bayt kodu olarak dağıtılmış olan Mist Çoklu İmzası, olaysız biçimde değerleri depolamak ve yönetmek amacıyla kullanılmaya devam etmektedir. [Bir Mist Çok İmzalı Sözleşmesiyle Etkileşim Kurma](https://support.mycrypto.com/how-to/sending/how-to-interact-with-a-multisig-contract), bu akıllı sözleşmelerin nasıl kullanılacağıyla ilgili iyi bir genel görünüm sunar.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/ethereum/meteor-dapp-wallet)

**Tarihçe**

Aşağıda Mist'e göz atın.

**Alternatifler**

Ethereum.org'da [Ethereum Cüzdanları](/wallets/) sayfasına göz atın.

### Mist {#mist}

27 Mart 2019'da kullanımdan kaldırılmıştır

**Özet**

Mist, Electron ile geliştirilmiş ve kullanıcıların Ethereum hesaplarını yönetmesini ve geleneksel internette barındırılan merkeziyetsiz uygulamalarla etkileşime geçmesini sağlayan özelleştirilmiş bir tarayıcıydı.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/ethereum/mist)

**Tarihçe**

Mist, Ethereum anahtarlarının nasıl yönetileceğini keşfettiği, kullanıcılara çoklu imzalar gibi finansal araçları tanıttığı ve Web3'ün nasıl çalışacağını gösterdiği için önemli bir erken deneme olmuştur. Ayrıca kullanıcılara, Ethereum anahtarlarını temsil eden şirin ve akılda kalıcı 8 bit stili grafikler olan blokçukları da tanıtmıştır.

**Alternatifler**

[MetaMask](https://metamask.io/), Ethereum anahtarlarını yönetmenizi ve merkeziyetsiz uygulamalarla etkileşime geçmenizi sağlayan bir tarayıcı içi cüzdandır. Google Chrome ve Firefox'ta uzantı olarak mevcuttur ve [Brave Tarayıcı](https://brave.com/)'da da bulunur.

### Mix {#mix}

11 Ağustos 2016'da kullanımdan kaldırılmıştır

**Özet**

Mix, geliştiricilerin Ethereum'da akıllı sözleşme oluşturmasını ve dağıtmasını sağlayan, C++'da yazılmış bir IDE idi.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/ethereum/mix)

**Tarihçe**

Mix, Ethereum'la ilgili en eski uygulamalardan biridir. [Devcon0'da Gavin Wood tarafından yapılan bu sunuma](https://www.youtube.com/watch?v=hcP_z_wBlaM) göz atın.

**Alternatifler**

[Remix](https://remix.ethereum.org/), Solidity/akıllı sözleşme geliştiriciliği, testleri ve dağıtılması için tarayıcıda barındırılan bir IDE'dir. Bir masaüstü seçeneği de vardır.

### Minimal {#minimal}

2020'de kullanımdan kaldırılmıştır.

**Özet**

Minimal, Ethereum blokzincirinin Go'da yazılmış modüler bir uygulamasıydı.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/umbracle/minimal)

**Tarihçe**

Minimal'in yerini [polgon-sdk](https://github.com/0xPolygon/polygon-edge) almıştır

### Hyperledger Burrow {#hyperledger-burrow}

2022'de kullanımdan kaldırılmıştır.

**Özet**

Hyperledger Burrow, izin verilmiş bir Ethereum akıllı sözleşme blokzincir düğümüydü. Ethereum EVM'yi ve WASM akıllı sözleşme kodunu, izin verilen sanal makinelerde çalıştırmıştır.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/hyperledger/burrow)

### Mana-Ethereum {#mana-ethereum}

**Özet**

Mana-Ethereum, Elixir kullanılarak geliştirilmiş bir Ethereum istemcisiydi.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/mana-ethereum/mana)

**Tarihçe**

Mana-Ethereum'un Github deposu, henüz açık bir şekilde arşivlenmemiştir ancak son giriş 2019'da yapılmıştır.

### Aleth (cpp-ethereum) {#aleth}

6 Ekim 2021'de kullanımdan kaldırılmıştır

**Özet**

Aleth (önceden cpp-ethereum olarak bilinirdi) C++'da yazılmış bir Ethereum istemcisiydi.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/ethereum/aleth)

**Tarihçe**

Aleth, 6 Ekim 2021'de kullanımdan kaldırılmadan önce Ethereum'un en popüler üçüncü istemcisiydi.

**Alternatifler**

[Geth](https://geth.ethereum.org/), iyi bilinen alternatif bir Ethereum istemcisidir.

### Ethereum-H {#ethereum-h}

**Arşivler**

Ethereum-H arşivleri GitHub'dan kaldırılmıştır.

**Tarihçe**

Ethereum-H, Haskell'de yazılmış bir Ethereum istemcisiydi. 2015 civarında kullanımdan kaldırılmıştır.

**Alternatifler**

[Geth](https://geth.ethereum.org/), [Nethermind](http://nethermind.io/), [Besu](https://besu.hyperledger.org/en/stable/) ve [Erigon](https://github.com/ledgerwatch/erigon) uygulanabilir alternatif Ethereum istemcileridir - güncel bir Haskell istemcisi yoktur.

### ruby-ethereum {#ruby-ethereum}

**Arşivler**

[ruby-ethereum GitHub deposu](https://github.com/cryptape/ruby-ethereum)

**Tarihçe**

ruby-ethereum, Ruby'de yazılmış bir Ethereum istemcisiydi. 2018 civarında kullanımdan kaldırılmıştır.

**Alternatifler**

[Geth](https://geth.ethereum.org/), [Nethermind](http://nethermind.io/), [Besu](https://besu.hyperledger.org/en/stable/) and [Erigon](https://github.com/ledgerwatch/erigon) uygulanabilir alternatif Ethereum istemcileridir. Güncel bir Ruby istemcisi yoktur.

### Parity {#parity}

2 Haziran 2020'de kullanımdan kaldırılmıştır

**Özet**

Parity, Rust'ta yazılmış bir Ethereum istemcisiydi.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/openethereum/parity-ethereum)

**Tarihçe**

Ethereum'un ilk yıllarındaki iki önde gelen uygulanabilir istemciden biri olan (diğeri Geth) Parity, ekosistemin çok önemli bir parçasıydı. 2016'daki Şanghay Saldırıları sırasında Parity, Geth gibi istemciler saldırı tarafından durdurulduğunda Ethereum Ağı'nın çalışmaya devam etmesini sağlamıştır, bu da istemci çeşitliliğinin önemini kanıtlar.

**Alternatifler**

[Erigon](https://github.com/ledgerwatch/erigon) (önceden Turbo-Geth diye adlandırılıyordu), Go'da yazılmış, verimlilik cephesindeki yeni nesil bir Ethereum istemcisidir.

**Not:** _Parity Ethereum istemcisinin yerine geçtiği proje olan [OpenEthereum](https://github.com/openethereum/openethereum)**, o tarihten beri kullanımdan kalkmış durumdadır.**_

Ethereum.org'daki ["Kendi Ethereum düğümünüzü programlayın"](/developers/docs/nodes-and-clients/run-a-node/#getting-the-client) kaynağı, bir Ethereum istemcisini indirme, kurma ve çalıştırma bölümlerini kapsar.

### Trinity {#trinity}

1 Temmuz 2021'de kullanımdan kaldırılmıştır

**Özet**

Trinity, topluluk için bir araştırma ve eğitim aracı olarak hizmet eden python tabanlı bir Ethereum istemcisiydi. Trinity ile ilgisi olan çok sayıda python tabanlı modül, hala aynı takım tarafından yönetilmektedir; bunlara, [Py-EVM](https://github.com/ethereum/py-evm) de dahildir.

**Arşivler**

[Arşivlenmiş GitHub deposu](https://github.com/ethereum/trinity)

**Tarihçe**

Trinity, python tabanlı ilk Ethereum istemcilerinden biri olan [pyethereum](https://github.com/ethereum/pyethereum/tree/b704a5c6577863edc539a1ec3d2620a443b950fb)'un yerine almıştır.

**Alternatifler**

Ethereum.org'daki ["Kendi Ethereum düğümünüzü programlayın"](/developers/docs/nodes-and-clients/run-a-node/#getting-the-client) kaynağı, bir Ethereum istemcisini indirme, kurma ve çalıştırma bölümlerini kapsar.

[EthereumJS](https://github.com/ethereumjs) projesi de Trinity ile benzer bir araştırma ve eğitim amaçlı kullanım senaryosuna sahiptir.

## Merkeziyetsiz Uygulamalar ve Hizmetler {#dapps-and-services}

Bu bölüm, Ethereum Ana Ağı'na ve EVM tabanlı diğer ağlara dağıtılmış olan hizmetlere yöneliktir. Buradaki merkeziyetsiz uygulama ve hizmetlerin bakımsızlık, protokol değişiklikleri, vs. gibi sebeplerden hack'lenmiş ya da güvenlik açıklarına sahip olan DeFi uygulamalarını kapsayabileceğini göz önünde bulundurun.

### Cover Protokolü {#cover-protocol}

2021 sonbaharında kapatılmıştır

**Özet**

Cover, Ethereum ve diğer EVM tabanlı ağlarda çalışan bir DeFi sigorta protokolüydü.

**Arşivler**

[Web sitesi](https://wayback.archive-it.org/17679/20211004074635/https://www.coverprotocol.com/)

[Medium makaleleri](https://wayback.archive-it.org/17679/20211004074633/https://coverprotocol.medium.com/)

[Github depoları](https://github.com/CoverProtocol/cover-core-v1)

[Dokümanlar](https://wayback.archive-it.org/17679/20211004074634/https://docs.coverprotocol.com/)

### DAO {#the-dao}

2016 yazında hack'lenmiş ve kapatılmıştır

**Özet**

DAO, projelerin fonlanmasını organize etmeye yönelik bir akıllı sözleşme, merkeziyetsiz uygulama ve forumdu. Bir güvenlik açığından faydalanarak ETH'nin çoğu boşaltıldı, bu da DAO'ya yatırmış olanların ETH'lerini geri vermek için topluluk tarafından organize edilen bir sert çatallanmayı beraberinde getirdi. UX ön yüzü ve forum kapatıldı.

**Arşivler**

[14 Mayıs 2016 tarihli "daohub.org" İnternet Arşivi](https://web.archive.org/web/20160514105232/https://daohub.org/)

**Tarihçe**

DAO başarısız olmasına rağmen, konsept devam ettirildi. DAO için geliştirilmiş temel teknik, sosyal ve yönetişim özellikli model, DeFi, NFT ve proje fonlama topluluklarında yaygın biçimde kullanılmaktadır.

[ethereum.org'daki "DAO Çatallanması"](/history/#dao-fork)

["DAO" için Wikipedia girdisi](<https://wikipedia.org/wiki/The_DAO_(organization)>)

**Alternatifler**

[ethereum.org'daki "DAO'lar"](/dao/)

[MolochDAO](https://www.molochdao.com/)

[Gitcoin Hibeleri](https://gitcoin.co/grants/)

### SparkPool {#sparkpool}

2021 sonbaharında kapatılmıştır

**Özet**

Merkezi Hangzhou'da bulunan Sparkpool hizmeti ve topluluğu, dünyanın Ethereum merkezli madencilik havuzlarının en büyüklerinden biriydi.

**Arşivler**

**Tarihçe**

EthFans topluluğu ile ilişkili olan hizmet, 2015'te başlatıldı. Spankpool, yasal düzenlemelerin daha katı hale gelmesinin sonucu olarak 2021 sonbaharında dağıldı.

**Alternatifler**

[Ethermine](https://ethermine.org/)

## Dokümantasyon ve Bilgi Kaynakları {#documentation-and-information-sources}

Şu anda kaldırılmış ya da mevcut olmasına rağmen sürdürülmeyen sayısız dokümantasyon, makale, öğretici ve forum kaynağı vardır. Önemli olan ya da güncel durumu kullanımdan kaldırılmış olmasına rağmen kafa karışıklığına ya da dolandırıcılık girişimlerine sebep olabilecek birkaç taneyi seçtik.

### Legacy Wiki ve eth.wiki {#eth-wiki}

**Özet**

Legacy Wiki ve eth.wiki, topluluğun geneli için Ethereum Foundation tarafından yönetilen wiki'lerdi. Bunlar, daha çok Ethereum platformunun temel yönleri hakkında detaylı açıklamaları ve teknik yol haritalarının özetlerini barındırmaya yöneliklerdi.

**Arşivler**

[eth.wiki için arşivlenmiş GitHub deposu](https://github.com/ethereum/eth-wiki)

[Legacy Wiki için arşivlenmiş bir GitHub deposu](https://github.com/ethereum/wiki/wiki)

**Tarihçe**

Legacy Wiki, bir GitHub wiki'siydi ve teknik içeriklerden (orijinal Ethereum Tanıtım Belgesi de dahil) oluşan erken bir alandı. Ethereum geliştiricileri, zaman içinde kendi dokümantasyonlarını, spesifikasyonlarını ve teknik açıklama çalışmalarını [Dokümanları Okuyun](https://readthedocs.org/) gibi diğer platformlara ve GitHub'da barındırılan içeriklere taşıdılar.

2019 ve 2020'de eth.wiki, Legacy Wiki'nin yerini aldı ancak katkıda bulunan katılımcılardan oluşan sağlam bir topluluk oluşmadı.

**Alternatifler**

Topluluk tarafından yönetilen içerik: [Ethereum.org Web Sitesi](/)

Ethereum yazılım projeleri, genelde dokümantasyonlarını [Dokümanları Okuyun](https://readthedocs.org/) içinde barındırır

Github'da barındırılan teknik spesifikasyonlar: [EIP'ler](https://github.com/ethereum/EIPs), [Yürütüm Spesifikasyonları](https://github.com/ethereum/execution-specs), [Mutabakat Spesifikasyonları](https://github.com/ethereum/consensus-specs)

### forum.ethereum.org {#forum-ethereum-org}

**Özet**

Ethereum Topluluk Forumu, Ethereum Foundation tarafından yönetilen ve Vanilla Forums üzerinde barındırılan bir tartışma panosuydu. Bu pano, "forum.ethereum.org" alt etki alanını kullanıyordu.

**Arşivler**

Arşiv URL'si: [https://wayback.archive-it.org/16516/20210618210825/https://forum.ethereum.org/](https://wayback.archive-it.org/16516/20210618210825/https://forum.ethereum.org/)

**Tarihçe**

Bu Forum, erken dönemlerde Ethereum topluluğunun "resmi" tartışma panosuydu. Forum, [/r/ethereum](https://reddit.com/r/ethereum) ve birkaç Skype kanalı ile birlikte geliştiriciler, tasarımcılar ve idareciler için önemli bir koordinasyon noktasıydı. Yıllar geçtikçe Forumun katılımcıları başka yerlere geçti ve burası daha çok bir madencilik topluluğuna dönüştü.

**Alternatifler**

[/r/ethereum](https://reddit.com/r/ethereum) ve çok sayıda DAO Forum ile Discord sunucusu.

## Gitter Kanalları {#gitter-channels}

### AllCoreDevs {#allcorewdevs-gitter}

**Özet**

AllCoreDevs Gitter, [Ethereum istemcisinin temel geliştiricileri](https://github.com/ethereum/pm/) için herkese açık ana koordinasyon iletişim kanalıydı.

**Arşivler**

[ethereum/AllCoreDevs Gitter Kanalı](https://gitter.im/ethereum/AllCoreDevs)

**Alternatifler**

Lütfen [EthR&D Discord Sunucusu](https://discord.gg/qHv7AjTDuK)'ndaki "allcoredevs" kanalını kullanın

### EthereumJS {#ethereumjs-gitter}

**Özet**

EthereumJS Gitter, [EthereumJS projesinin](https://ethereumjs.github.io/) herkese açık ana koordinasyon iletişim kanalıydı.

**Arşivler**

[ethereum/EthereumJS Gitter Kanalı](https://gitter.im/ethereum/ethereumjs)

**Alternatifler**

Lütfen [EthereumJS Discord Sunucusu](https://discord.gg/TNwARpR)'nu kullanın
