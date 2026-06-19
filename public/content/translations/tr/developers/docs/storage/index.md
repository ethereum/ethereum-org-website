---
title: Merkeziyetsiz Depolama
description: Merkeziyetsiz depolamanın ne olduğuna ve onu bir merkeziyetsiz uygulamaya (dapp) entegre etmek için mevcut araçlara genel bakış.
lang: tr
authors: ["Patrick Collins"]
---

Tek bir şirket veya kuruluş tarafından işletilen merkezi bir sunucunun aksine, merkeziyetsiz depolama sistemleri, genel verilerin bir kısmını elinde tutan kullanıcı-operatörlerin oluşturduğu eşler arası bir ağdan oluşur ve dayanıklı bir dosya depolama paylaşım sistemi yaratır. Bunlar blokzincir tabanlı bir uygulamada veya herhangi bir eşler arası tabanlı ağda olabilir.

Ethereum'un kendisi merkeziyetsiz bir depolama sistemi olarak kullanılabilir ve tüm akıllı sözleşmelerdeki kod depolaması söz konusu olduğunda öyledir. Ancak, büyük miktarda veri söz konusu olduğunda, Ethereum bunun için tasarlanmamıştır. Zincir istikrarlı bir şekilde büyüyor, ancak bu yazının yazıldığı sırada Ethereum zinciri yaklaşık 500GB - 1TB civarındadır ([istemciye bağlı olarak](https://etherscan.io/chartsync/chaindefault)) ve ağdaki her düğümün tüm verileri depolayabilmesi gerekir. Zincir büyük miktarda veriye (örneğin 5TB) genişleyecek olsaydı, tüm düğümlerin çalışmaya devam etmesi mümkün olmazdı. Ayrıca, bu kadar veriyi Ana Ağ'a dağıtmanın maliyeti, [Gaz](/developers/docs/gas) ücretleri nedeniyle aşırı derecede pahalı olacaktır.

Bu kısıtlamalar nedeniyle, büyük miktarda veriyi merkeziyetsiz bir şekilde depolamak için farklı bir zincire veya metodolojiye ihtiyacımız var.

Merkeziyetsiz depolama (dStorage) seçeneklerine bakarken, bir kullanıcının aklında tutması gereken birkaç şey vardır.

- Kalıcılık mekanizması / teşvik yapısı
- Veri saklama zorunluluğu
- Merkeziyetsizlik
- Mutabakat

## Kalıcılık mekanizması / teşvik yapısı {#persistence-mechanism}

### Blokzincir tabanlı {#blockchain-based}

Bir veri parçasının sonsuza kadar kalıcı olması için bir kalıcılık mekanizması kullanmamız gerekir. Örneğin, Ethereum'da kalıcılık mekanizması, bir düğüm çalıştırılırken tüm zincirin hesaba katılması gerektiğidir. Yeni veri parçaları zincirin sonuna eklenir ve büyümeye devam eder; bu da her düğümün gömülü tüm verileri çoğaltmasını gerektirir.

Bu, **blokzincir tabanlı** kalıcılık olarak bilinir.

Blokzincir tabanlı kalıcılıkla ilgili sorun, zincirin tüm verileri makul bir şekilde korumak ve depolamak için çok fazla büyüyebilmesidir (örneğin, [birçok kaynak](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) İnternet'in 40 Zettabayt'ın üzerinde depolama kapasitesi gerektirdiğini tahmin etmektedir).

Blokzincirin ayrıca bir tür teşvik yapısına sahip olması gerekir. Blokzincir tabanlı kalıcılık için doğrulayıcıya yapılan bir ödeme vardır. Veriler zincire eklendiğinde, doğrulayıcılara verileri eklemeleri için ödeme yapılır.

Blokzincir tabanlı kalıcılığa sahip platformlar:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Sözleşme tabanlı {#contract-based}

**Sözleşme tabanlı** kalıcılık, verilerin her düğüm tarafından çoğaltılamayacağı ve sonsuza kadar saklanamayacağı, bunun yerine sözleşme anlaşmalarıyla korunması gerektiği sezgisine sahiptir. Bunlar, bir veri parçasını belirli bir süre tutma sözü veren birden fazla düğümle yapılan anlaşmalardır. Verilerin kalıcı olmasını sağlamak için süreleri dolduğunda iade edilmeli veya yenilenmelidirler.

Çoğu durumda, tüm verileri zincir içi depolamak yerine, verilerin bir zincirde nerede bulunduğunun hash'i depolanır. Bu şekilde, tüm verileri tutmak için tüm zincirin ölçeklenmesi gerekmez.

Sözleşme tabanlı kalıcılığa sahip platformlar:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Ek hususlar {#additional-consideration}

IPFS, dosyaları, web sitelerini, uygulamaları ve verileri depolamak ve bunlara erişmek için dağıtık bir sistemdir. Yerleşik bir teşvik şemasına sahip değildir, ancak daha uzun vadeli kalıcılık için yukarıdaki sözleşme tabanlı teşvik çözümlerinden herhangi biriyle kullanılabilir. IPFS'de verileri kalıcı hale getirmenin bir başka yolu da verilerinizi sizin için "sabitleyecek" (pin) bir sabitleme hizmetiyle çalışmaktır. Hatta kendi IPFS düğümünüzü çalıştırabilir ve kendi verilerinizi ve/veya başkalarının verilerini ücretsiz olarak kalıcı hale getirmek için ağa katkıda bulunabilirsiniz!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS sabitleme hizmeti)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin sabitleme hizmeti)_
- [Infura](https://infura.io/product/ipfs) _(IPFS sabitleme hizmeti)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS sabitleme gezgini)_
- [4EVERLAND](https://www.4everland.org/)_（IPFS sabitleme hizmeti）_
- [Filebase](https://filebase.com) _(IPFS Sabitleme Hizmeti)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoin sabitleme hizmeti)_

Swarm, bir depolama teşvik sistemi ve bir depolama kira fiyatı kâhini içeren merkeziyetsiz bir veri depolama ve dağıtım teknolojisidir.

## Veri saklama {#data-retention}

Verileri saklamak için sistemlerin, verilerin saklandığından emin olmak adına bir tür mekanizmaya sahip olması gerekir.

### Meydan okuma mekanizması {#challenge-mechanism}

Verilerin saklandığından emin olmanın en popüler yollarından biri, düğümlere veriye hala sahip olduklarından emin olmak için verilen bir tür kriptografik meydan okuma kullanmaktır. Basit bir örnek, Arweave'in erişim kanıtına bakmaktır. Düğümlere, hem en son blokta hem de geçmişteki rastgele bir blokta veriye sahip olup olmadıklarını görmek için bir meydan okuma yayınlarlar. Düğüm cevabı bulamazsa cezalandırılır.

Meydan okuma mekanizmasına sahip dStorage türleri:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Merkeziyetsizlik {#decentrality}

Platformların merkeziyetsizlik düzeyini ölçmek için harika araçlar yoktur, ancak genel olarak, merkezi olmadıklarına dair kanıt sağlamak için bir tür KYC'ye sahip olmayan araçları kullanmak isteyeceksiniz.

KYC gerektirmeyen merkeziyetsiz araçlar:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Mutabakat {#consensus}

Bu araçların çoğu kendi [mutabakat mekanizması](/developers/docs/consensus-mechanisms/) sürümüne sahiptir ancak genellikle ya [**İş Kanıtı (PoW)**](/developers/docs/consensus-mechanisms/pow/) ya da [**Hisse Kanıtı (PoS)**](/developers/docs/consensus-mechanisms/pos/) tabanlıdırlar.

İş Kanıtı tabanlı:

- Skynet
- Arweave

Hisse Kanıtı tabanlı:

- Ethereum
- Filecoin
- Züs
- Crust Network

## İlgili araçlar {#related-tools}

**IPFS - _InterPlanetary File System, Ethereum için merkeziyetsiz bir depolama ve dosya referans sistemidir._**

- [Ipfs.io](https://ipfs.io/)
- [Belgeler](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Geliştiriciler için güvenli, gizli ve S3 uyumlu merkeziyetsiz bulut nesne depolaması._**

- [Storj.io](https://storj.io/)
- [Belgeler](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _Alıcıların ve satıcıların doğrudan işlem yapmasına olanak tanıyan, güven gerektirmeyen bir bulut depolama pazarı oluşturmak için kriptografiden yararlanır._**

- [Skynet.net](https://sia.tech/)
- [Belgeler](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin, IPFS'nin arkasındaki aynı ekip tarafından oluşturulmuştur. IPFS ideallerinin üzerinde bir teşvik katmanıdır._**

- [Filecoin.io](https://filecoin.io/)
- [Belgeler](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave, verileri depolamak için bir dStorage platformudur._**

- [Arweave.org](https://www.arweave.org/)
- [Belgeler](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs, parça zinciri (sharding) ve blobber'lara sahip bir Hisse Kanıtı dStorage platformudur._**

- [zus.network](https://zus.network/)
- [Belgeler](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust, IPFS'nin üzerinde bir dStorage platformudur._**

- [Crust.network](https://crust.network)
- [Belgeler](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Ethereum Web3 yığını için dağıtık bir depolama platformu ve içerik dağıtım hizmeti._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Belgeler](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _IPFS üzerinde merkeziyetsiz eşler arası bir veritabanı._**

- [OrbitDB.org](https://orbitdb.org/)
- [Belgeler](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Merkeziyetsiz bulut projesi (veritabanı, dosya depolama, bilgi işlem ve merkeziyetsiz kimlik (DID)). Zincir dışı ve zincir içi eşler arası teknolojinin benzersiz bir karışımı. IPFS ve çoklu zincir uyumluluğu._**

- [Aleph.im](https://aleph.cloud/)
- [Belgeler](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Veri açısından zengin ve ilgi çekici uygulamalar için kullanıcı kontrollü IPFS veritabanı depolaması._**

- [Ceramic.network](https://ceramic.network/)
- [Belgeler](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _S3 uyumlu merkeziyetsiz depolama ve coğrafi olarak yedekli IPFS sabitleme hizmeti. Filebase aracılığıyla IPFS'ye yüklenen tüm dosyalar, dünya çapında 3 kat çoğaltma ile otomatik olarak Filebase altyapısına sabitlenir._**

- [Filebase.com](https://filebase.com/)
- [Belgeler](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Depolama, bilgi işlem ve ağ oluşturma temel yeteneklerini entegre eden, S3 uyumlu olan ve IPFS ile Arweave gibi merkeziyetsiz depolama ağlarında senkronize veri depolaması sağlayan bir Web 3.0 bulut bilişim platformu._**

- [4everland.org](https://www.4everland.org/)
- [Belgeler](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Tıklama düğmeli IPFS Düğümlerine sahip bir hizmet olarak blokzincir platformu_**

- [Kaleido](https://kaleido.io/)
- [Belgeler](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron, uygulamalarını en iyi performansla merkeziyetsiz altyapıda başlatmak isteyen merkeziyetsiz uygulamalar (dapp'ler) için tasarlanmış bir hizmet olarak platformdur (PaaS). Bilgi işlem, merkeziyetsiz depolama, CDN ve web barındırma hizmetlerini varsayılan olarak sağlar._**

- [spheron.network](https://spheron.network/)
- [Belgeler](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 - _eth.limo'ya benzer şekilde, tüm türleri destekleyen ve ENS ile IPFS ile sınırlı olmayan merkeziyetsiz web sayfaları için çözümleyici._**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass - _IPFS + ENS destekli merkeziyetsiz web siteleri için arama motoru._**

- [web3compass.net](https://www.web3compass.net/)
- [Belgeler](https://www.web3compass.net/statistics)

## Daha fazla bilgi {#further-reading}

- [Merkeziyetsiz Depolama Nedir?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Merkeziyetsiz Depolama Hakkında Yaygın Beş Efsaneyi Çürütmek](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [Geliştirme çerçeveleri](/developers/docs/frameworks/)