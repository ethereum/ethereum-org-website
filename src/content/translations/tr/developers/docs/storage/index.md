---
title: Merkeziyetsiz Depolama
description: Merkeziyetsiz depolamanın ne olduğuna ve onu bir dapp'ye entegre etmeye yarayan mevcut araçlara genel bakış.
lang: tr
---

Tek bir şirket veya kuruluş tarafından işletilen merkezi bir sunucunun aksine, merkeziyetsiz depolama sistemleri, genel verilerin bir bölümünü tutan ve esnek bir dosya depolama paylaşım sistemi oluşturan eşler arası bir kullanıcı operatörleri ağından oluşur. Bunlar, blok zinciri tabanlı bir uygulamada veya herhangi bir eşler arası tabanlı ağda olabilir.

Tüm akıllı sözleşmelerde kod depolaması söz konusu olduğunda, Ethereum'un kendisi merkeziyetsiz bir depolama sistemi olarak kullanılabilir. Ancak, büyük miktarda veri söz konusu olduğunda, Ethereum'un tasarımı buna uygun değildir. Zincir istikrarlı bir şekilde büyüse de bu yazının yazıldığı sırada Ethereum zinciri 500 GB - 1 TB ([istemciye bağlı olarak](https://etherscan.io/chartsync/chaindefault)) civarında bir boyuta sahiptir ve ağdaki her düğümün tüm verileri depolayabilmesi gerekir. Zincir büyük miktarda veriye (diyelim ki 5 TB) genişleyecek olsaydı, tüm düğümlerin çalışmaya devam etmesi mümkün olmazdı. Ayrıca, bu kadar çok veriyi Mainnet'e dağıtmanın maliyeti, [gaz](/developers/docs/gas) ücretleri nedeniyle aşırı derecede pahalı olurdu.

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

Blok zinciri tabanlı kalıcılık ile ilgili sıkıntı, zincirin muhafaza edilemeyecek ve tüm verinin makul bir şekilde depolanamayacak kadar büyüyebilecek olmasıdır (örneğin [birçok kaynak](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/), internetin 40 Zetabayttan fazla depolama kapasitesine gerek duyacağını tahmin ediyor).

Blok zinciri ayrıca bir tür teşvik yapısına sahip olmalıdır. Blok zinciri tabanlı kalıcılık için madenciye yapılan bir ödeme bulunur. Veriler zincire eklendiğinde, düğümlere veri eklemeleri için ödeme yapılır.

Blok zinciri tabanlı kalıcılığa sahip platformlar:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Sözleşme tabanlı {#contract-based}

**Sözleşme tabanlı** kalıcılık, verinin her düğüm tarafından kopyalanıp sonsuza kadar depolanamayacağını öngörür, buna göre bunun yerine sözleşme anlaşmaları ile idame edilmelidir. Bunlar, belirli bir süre için bir veri parçasını tutma sözü veren birden fazla düğümle yapılan sözleşmelerdir. Verilerin kalıcı olmasını sağlamak için bittiklerinde iade edilmeleri veya yenilenmeleri gerekir.

Çoğu durumda, tüm verileri zincir üzerinde depolamak yerine, verilerin bir zincirde bulunduğu yerin hash değeri depolanır. Bu şekilde, tüm verileri tutmak için tüm zincirin ölçeklenmesi gerekmez.

Sözleşme tabanlı kalıcılığa sahip platformlar:

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [0Chain](https://0chain.net/)

### Göz önüne almanız gereken ek kavramlar {#additional-consideration}

IPFS; dosyaları, web sitelerini, uygulamaları ve verileri depolamaya ve bunlara erişmeye yarayan dağıtılmış bir sistemdir. Dahili bir teşvik düzenine sahip değildir ama bunun yerine yukarıdaki sözleşme esaslı teşvik çözümlerinin herhangi biriyle daha uzun süreli kalıcılık için kullanılabilir. IPFS üzerinde veriyi kalıcı kılmanın başka bir yolu ise verinizi sizin için "iliştirecek" bir iliştirme hizmeti ile çalışmaktır. Kendinizin ve/veya başkalarının verilerini kalıcı kılmak için kendi IPFS düğümünüzü bile çalıştırıp ağa katkı sağlayabilirsiniz!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS iliştirme hizmeti)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin iliştirme hizmeti)_
- [Infura](https://infura.io/product/ipfs) _(IPFS iliştirme hizmeti)_

## Veri tutma {#data-retention}

Sistemlerin verileri tutmak için verilerin tutulduğundan emin olmalarını sağlayan bir tür mekanizmaya sahip olmaları gerekir.

### Zorluk mekanizması {#challenge-mechanism}

Verilerin tutulduğundan emin olmanın en popüler yollarından biri, hâlâ verilere sahip olduklarından emin olmak için düğümlere verilen bir tür kriptografik sorgulama kullanmaktır. Arweave'in erişim ispatına bakarak basit bir yöntemi görebilirsiniz. Hem en son blokta hem de geçmişte rastgele bir blokta verilere sahip olup olmadıklarını görmek için düğümlere bir meydan okuma gönderirler. Düğüm, cevabı bulamazsa cezalandırılır.

Bir meydan okuma mekanizmasına sahip dStorage türleri:

- 0Chain
- Skynet
- Arweave
- Filecoin

### Merkeziyetsizlik {#decentrality}

Platformların merkeziyetsizlik düzeyini ölçmek için pek iyi araçlar olmasa da merkezileştirilmediklerini kanıtlamak için bir tür KYC içermeyen araçlar kullanmanız iyi olur.

KYC'siz merkeziyetsiz araçlar:

- 0Chain (KYC'siz bir sürüm kullanır)
- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum

### Mutabakat {#consensus}

Bu araçların çoğu kendi [mutabakat mekanizması](/developers/docs/consensus-mechanisms/) versiyonuna sahiptir ancak genellikle ya [**iş ispatı (PoW)**](/developers/docs/consensus-mechanisms/pow/) ya da [**hisse ispatı (PoS)**](/developers/docs/consensus-mechanisms/pos/) üzerine kuruludur.

İş İspatı tabanlı:

- Skynet
- Arweave
- Ethereum

Hisse İspatı tabanlı:

- [İşaret Zinciri](/upgrades/beacon-chain/)
- Filecoin
- 0Chain

## İlgili araçlar {#related-tools}

**IPFS - _InterPlanetary File System (Gezegenler Arası Dosya Sistemi), Ethereum için merkeziyetsiz bir depolama ve dosya referans sistemidir._**

- [Ipfs.io](https://ipfs.io/)
- [Belgeler](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Geliştiriciler için güvenli, özel ve S3 uyumlu merkeziyetsiz bulut nesnesi deposu._**

- [Storj.io](https://storj.io/)
- [Belgeler](https://docs.storj.io/)

**Skynet - _Skynet, merkeziyetsiz bir ağa özel, merkeziyetsiz bir iş ispatı zinciridir._**

- [Skynet.net](https://siasky.net/)
- [Belgeler](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin - _Filecoin, IPFS'nin ardındaki aynı ekip tarafından oluşturuldu. IPFS ideallerine ek olarak bir teşvik katmanıdır._**

- [Filecoin.io](https://filecoin.io/)
- [Belgeler](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave, veri depolamaya yarayan bir dStorage platformudur._**

- [Arweave.org](https://www.arweave.org/)
- [Belgeler](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**0chain - _0Chain, parçalama ve balonlayıcılara (blobber) sahip bir hisse ispatı dStorage platformudur._**

- [0Chain.net](https://0chain.net/)
- [Belgeler](https://docs.0chain.net/0chain/)
- [GitHub](https://github.com/0chain/)

**Swarm - _Ethereum web3 yığını için dağıtılmış bir depolama platformu ve içerik dağıtım hizmeti._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Belgeler](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _IPFS'ye ek olarak merkeziyetsiz bir eşler arası veri tabanı._**

- [OrbitDB.org](https://orbitdb.org/)
- [Belgeler](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Merkeziyetsiz bulut projesi (veri tabanı, dosya depolama, bilgi işlem ve DID). Zincir dışı ve zincir üstü eşler arası teknolojinin benzersiz bir karışımı. IPFS ve çoklu zincir uyumluluğu._**

- [Aleph.im](https://aleph.im/)
- [Belgeler](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Veri açısından zengin ve etkileşimli uygulamalar için kullanıcı kontrollü IPFS veri tabanı depolaması._**

- [Ceramic.network](https://ceramic.network/)
- [Belgeler](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _IPFS, Sia, Skynet ve Storj dahil olmak üzere birden fazla merkezi olmayan depolama ağında veri depolamanıza izin veren ilk S3 uyumlu nesne depolama platformu._**

- [Filebase.com](https://filebase.com/)
- [Belgeler](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

## Daha fazla bilgi {#further-reading}

- [Merkeziyetsiz Depolama Nedir?](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Merkeziyetsiz Depolamayla İlgili Beş Yaygın Efsanenin Çürütülmesi](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## İlgili konular {#related-topics}

- [Geliştirme çerçeveleri](/developers/docs/frameworks/)
