---
title: Merkeziyetsiz Depolama
description: Merkeziyetsiz depolamanın ne olduğuna ve onu bir dapp'ye entegre etmeye yarayan mevcut araçlara genel bakış.
lang: tr
---

Tek bir şirket veya kuruluş tarafından işletilen merkezi bir sunucunun aksine, merkeziyetsiz depolama sistemleri, genel verilerin bir bölümünü tutan ve esnek bir dosya depolama paylaşım sistemi oluşturan eşler arası bir kullanıcı operatörleri ağından oluşur. Bunlar, blok zinciri tabanlı bir uygulamada veya herhangi bir eşler arası tabanlı ağda olabilir.

Tüm akıllı sözleşmelerde kod depolaması söz konusu olduğunda, Ethereum'un kendisi merkeziyetsiz bir depolama sistemi olarak kullanılabilir. Ancak, büyük miktarda veri söz konusu olduğunda, Ethereum'un tasarımı buna uygun değildir. Zincir istikrarlı bir şekilde büyüyor, ancak bu yazının yazıldığı sırada Ethereum zinciri yaklaşık 500 GB - 1 TB ([istemciye bağlı olarak](https://etherscan.io/chartsync/chaindefault)) ve ağdaki her düğümün tüm verileri depolayabilmesi gerekiyor. Zincir büyük miktarda veriye (diyelim ki 5 TB) genişleyecek olsaydı, tüm düğümlerin çalışmaya devam etmesi mümkün olmazdı. Ayrıca, bu kadar çok veriyi Ana Ağ'a dağıtmanın maliyeti, [gaz](/developers/docs/gas) ücretleri nedeniyle aşırı derecede pahalı olacaktır.

Bu kısıtlamalar nedeniyle, büyük miktarda veriyi merkeziyetsiz bir şekilde depolamak için farklı bir zincire veya metodolojiye ihtiyacımız var.

Merkeziyetsiz depolama (dStorage) seçeneklerine bakarken, kullanıcının göz önünde bulundurması gereken birkaç şey vardır.

- Kalıcılık mekanizması / teşvik yapısı
- Veri tutma zorunluluğu
- Merkeziyetsizlik
- Mutabakat

## Kalıcılık mekanizması / teşvik yapısı {#persistence-mechanism}

### Blok zinciri tabanlı {#blockchain-based}

Bir veri parçasının sonsuza kadar kalıcı olması için bir kalıcılık mekanizması kullanmamız gerekir. Örneğin Ethereum'daki kalıcılık mekanizması, bir düğüm çalıştırılırken tüm zincirin hesaba katılması gerekmesidir. Yeni veri parçaları zincirin sonuna katılır ve zincir büyümeye devam eder: Bu da her düğümün gömülü verinin tamamını kopyalamasını gerektirir.

Bu, **blok zinciri tabanlı** kalıcılık olarak bilinir.

Blok zinciri tabanlı kalıcılıkla ilgili sorun, zincirin, tüm verilerin bakımının yapılamayacağı ve makul bir şekilde depolanamayacağı kadar büyüyebilmesidir (örneğin, [birçok kaynak](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/), İnternet'in 40 Zettabayttan fazla depolama kapasitesi gerektireceğini tahmin etmektedir).

Blok zinciri ayrıca bir tür teşvik yapısına sahip olmalıdır. Block zincir tabanlı süreklilik için, doğrulayıcıya ödeme yapılır. Veri zincire eklendiğinde, doğrulayıcılar zincire eklenmesi için ödeme yapar.

Blok zinciri tabanlı kalıcılığa sahip platformlar:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Sözleşme tabanlı {#contract-based}

**Sözleşme tabanlı** kalıcılık, verilerin her düğüm tarafından kopyalanamayacağı ve sonsuza kadar saklanamayacağı, bunun yerine sözleşme anlaşmalarıyla sürdürülmesi gerektiği anlayışına dayanır. Bunlar, belirli bir süre için bir veri parçasını tutma sözü veren birden fazla düğümle yapılan sözleşmelerdir. Verilerin kalıcı olmasını sağlamak için bittiklerinde iade edilmeleri veya yenilenmeleri gerekir.

Çoğu durumda, tüm verileri zincir üstünde depolamak yerine, verilerin bir zincirde bulunduğu yerin hash değeri depolanır. Bu şekilde, tüm verileri tutmak için tüm zincirin ölçeklenmesi gerekmez.

Sözleşme tabanlı kalıcılığa sahip platformlar:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Ek hususlar {#additional-consideration}

IPFS; dosyaları, web sitelerini, uygulamaları ve verileri depolamaya ve bunlara erişmeye yarayan dağıtılmış bir sistemdir. Dahili bir teşvik düzenine sahip değildir ama bunun yerine yukarıdaki sözleşme esaslı teşvik çözümlerinin herhangi biriyle daha uzun süreli kalıcılık için kullanılabilir. IPFS üzerinde veriyi kalıcı kılmanın başka bir yolu ise verinizi sizin için "iliştirecek" bir iliştirme hizmeti ile çalışmaktır. Kendinizin ve/veya başkalarının verilerini kalıcı kılmak için kendi IPFS düğümünüzü bile çalıştırıp ağa katkı sağlayabilirsiniz!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS sabitleme hizmeti)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin sabitleme hizmeti)_
- [Infura](https://infura.io/product/ipfs) _(IPFS sabitleme hizmeti)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS sabitleme gezgini)_
- [4EVERLAND](https://www.4everland.org/)_（IPFS sabitleme hizmeti）_
- [Filebase](https://filebase.com) _(IPFS Sabitleme Hizmeti)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoin sabitleme hizmeti)_

SWARM, bir depolama teşvik sistemi ve bir depolama fiyatı kahinine sahip merkeziyetsiz bir veri depolama dağıtım teknolojisidir.

## Veri saklama {#data-retention}

Sistemlerin verileri tutmak için verilerin tutulduğundan emin olmalarını sağlayan bir tür mekanizmaya sahip olmaları gerekir.

### Meydan okuma mekanizması {#challenge-mechanism}

Verilerin tutulduğundan emin olmanın en popüler yollarından biri, hâlâ verilere sahip olduklarından emin olmak için düğümlere verilen bir tür kriptografik sorgulama kullanmaktır. Arweave'in erişim ispatına bakarak basit bir yöntemi görebilirsiniz. Hem en son blokta hem de geçmişte rastgele bir blokta verilere sahip olup olmadıklarını görmek için düğümlere bir meydan okuma gönderirler. Düğüm, cevabı bulamazsa cezalandırılır.

Bir meydan okuma mekanizmasına sahip dStorage türleri:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Merkeziyetsizlik {#decentrality}

Platformların merkeziyetsizlik düzeyini ölçmek için pek iyi araçlar olmasa da merkezileştirilmediklerini kanıtlamak için bir tür KYC içermeyen araçlar kullanmanız iyi olur.

KYC'siz merkeziyetsiz araçlar:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Mutabakat {#consensus}

Bu araçların çoğunun kendi [mutabakat mekanizması](/developers/docs/consensus-mechanisms/) sürümü vardır, ancak bunlar genellikle ya [**İş İspatı'na (PoW)**](/developers/docs/consensus-mechanisms/pow/) ya da [**Hisse İspatı'na (PoS)**](/developers/docs/consensus-mechanisms/pos/) dayanır.

İş ispatı tabanlı:

- Skynet
- Arweave

Hisse ispatı tabanlı:

- Ethereum
- Filecoin
- Züs
- Crust Network

## İlgili araçlar {#related-tools}

**IPFS - _InterPlanetary File System (Gezegenlerarası Dosya Sistemi), Ethereum için merkeziyetsiz bir depolama ve dosya referanslama sistemidir._**

- [Ipfs.io](https://ipfs.io/)
- [Dökümanlar](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Geliştiriciler için güvenli, özel ve S3 uyumlu merkeziyetsiz bulut nesne depolaması._**

- [Storj.io](https://storj.io/)
- [Dökümanlar](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _Alıcıların ve satıcıların doğrudan işlem yapmasına olanak tanıyan, güven gerektirmeyen bir bulut depolama pazar yeri oluşturmak için kriptografiden yararlanır._**

- [Skynet.net](https://sia.tech/)
- [Dökümanlar](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin, IPFS'nin ardındaki aynı ekip tarafından oluşturuldu._** IPFS ideallerine ek olarak bir teşvik katmanıdır._\*\*

- [Filecoin.io](https://filecoin.io/)
- [Dökümanlar](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave, veri depolamaya yarayan bir dStorage platformudur._**

- [Arweave.org](https://www.arweave.org/)
- [Dökümanlar](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs, parçalama ve blobber'lara sahip, bir hisse ispatı dStorage platformudur._**

- [zus.network](https://zus.network/)
- [Dökümanlar](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust, IPFS üzerine kurulu bir dStorage platformudur._**

- [Crust.network](https://crust.network)
- [Dökümanlar](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Ethereum web3 yığını için dağıtılmış bir depolama platformu ve içerik dağıtım hizmeti._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Dökümanlar](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _IPFS üzerinde çalışan, merkeziyetsiz bir eşler arası veritabanı._**

- [OrbitDB.org](https://orbitdb.org/)
- [Dökümanlar](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Merkeziyetsiz bulut projesi (veritabanı, dosya depolama, bilgi işlem ve DID)._** Zincir dışı ve zincir üstü eşler arası teknolojinin benzersiz bir karışımı. IPFS ve çoklu zincir uyumluluğu._\*\*

- [Aleph.im](https://aleph.cloud/)
- [Dökümanlar](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Veri açısından zengin ve etkileşimli uygulamalar için kullanıcı kontrollü IPFS veritabanı depolaması._**

- [Ceramic.network](https://ceramic.network/)
- [Dökümanlar](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _S3 uyumlu merkeziyetsiz depolama ve coğrafi olarak yedekli IPFS sabitleme hizmeti. Filebase aracılığıyla IPFS'ye yüklenen tüm dosyalar, dünya çapında 3 kat çoğaltma ile otomatik olarak Filebase altyapısına sabitlenir._**

- [Filebase.com](https://filebase.com/)
- [Dökümanlar](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Depolama, hesaplama ve ağ oluşturma temel yeteneklerini entegre eden, S3 uyumlu olan ve IPFS ve Arweave gibi merkeziyetsiz depolama ağlarında senkronize veri depolaması sağlayan bir Web 3.0 bulut bilişim platformu._**

- [4everland.org](https://www.4everland.org/)
- [Dökümanlar](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Tek tıkla çalışan IPFS Düğümlerine sahip bir Hizmet Olarak Blok Zinciri platformu_**

- [Kaleido](https://kaleido.io/)
- [Dökümanlar](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron, uygulamalarını en iyi performansla merkeziyetsiz altyapıda başlatmak isteyen merkeziyetsiz uygulamalar için tasarlanmış bir hizmet olarak platformdur (PaaS). Anında hesaplama, merkeziyetsiz depolama, CDN ve web barındırma hizmeti sunar._**

- [spheron.network](https://spheron.network/)
- [Dökümanlar](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Daha fazla kaynak {#further-reading}

- [Merkeziyetsiz Depolama Nedir?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Merkeziyetsiz Depolama Hakkında Beş Yaygın Efsaneyi Çürütmek](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Size yardımcı olan bir topluluk kaynağı biliyor musunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## Alakalı başlıklar {#related-topics}

- [Geliştirme çerçeveleri](/developers/docs/frameworks/)
