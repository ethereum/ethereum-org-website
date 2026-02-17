---
title: "Ağlar"
description: "Ethereum'un ağlarına ve uygulamanızı test etmek için test ağı ether'inin (ETH) nereden alınacağına genel bir bakış."
lang: tr
---

Ethereum ağları, Ethereum protokolü kullanarak iletişim kuran bağlantılı bilgisayar gruplarıdır. Sadece tek bir Ethereum ana ağı vardır ama aynı protokol ile uyumlu bağımsız ağlar da test ve geliştirme amaçları için kullanılabilir. Birbirleriyle etkileşime girmeden protokol ile uyumlu pek çok bağımsız "ağ" vardır. Kendi akıllı sözleşmelerini ve web3 uygulamalarını test etmek için bile bilgisayarında yerel bir ağ kurabilirsin.

Ethereum hesabınız farklı ağlarda çalışacaktır, ancak hesap bakiyeniz ve işlem geçmişiniz ana Ethereum ağından taşınmayacaktır. Test amacıyla, hangi ağların mevcut olduğunu ve oynamak için test ağı ETH'sinin nasıl elde edileceğini bilmek yararlıdır. Güvenlik sebeplerinden dolayı test ağlarının ana ağlarda kullanılması veya bunun tam tersi genellikle önerilmez.

## Ön Koşullar {#prerequisites}

Farklı ağlar hakkında okumadan önce [Ethereum'un temellerini](/developers/docs/intro-to-ethereum/) anlamalısınız, çünkü test ağları size oynamanız için Ethereum'un ucuz ve güvenli bir sürümünü sunacaktır.

## Halka açık ağlar {#public-networks}

Genel ağlara, internet bağlantısı olan herkes dünyanın her yerinde erişebilir. Herkes halka açık bir blok zincirinde işlemleri okuyabilir veya oluşturabilir ve yürütülen işlemleri doğrulayabilir. Akranlar arasındaki mutabakat, işlemlerin dahil edilmesine ve ağın durumuna karar verir.

### Ethereum Ana Ağı {#ethereum-mainnet}

Mainnet, dağıtılmış defterde gerçek değer işlemlerinin gerçekleştiği birincil halka açık Ethereum üretim blok zinciridir.

İnsanlar ve borsalar ETH fiyatlarını tartışırken Mainnet ETH'den bahsederler.

### Ethereum Test Ağları {#ethereum-testnets}

Mainnet'e ek olarak, genel test ağları vardır. Bunlar, protokol geliştiricileri veya akıllı sözleşme geliştiricileri tarafından, Mainnet'e dağıtımdan önce üretim benzeri bir ortamda hem protokol yükseltmelerini hem de potansiyel akıllı sözleşmeleri test etmek için kullanılan ağlardır. Bunu, üretime karşı hazırlama sunucularına bir analog olarak düşünün.

Yazdığınız herhangi bir sözleşme kodunu Ana Ağ'a dağıtmadan önce bir test ağı üzerinde test etmelisiniz. Mevcut akıllı sözleşmelerle entegre olan merkeziyetsiz uygulamalar arasında çoğu projenin test ağlarına dağıtılmış kopyaları bulunmaktadır.

Çoğu test ağı izin gerektiren otorite ispatlı bir mutabakat mekanizması kullanarak başlamıştır. Bu, işlemleri doğrulamak ve yeni bloklar oluşturmak için az sayıda düğümün seçildiği anlamına gelir: Düğümler bu süreçte kimliklerini stake ederler. Alternatif olarak, bazı test ağları tıpkı Ethereum Ana Ağı'nda olduğu gibi herkesin bir doğrulayıcı çalıştırmayı test edebileceği açık hisse ispatı mutabakat mekanizmaları kullanmışlardır.

Test ağlarındaki ETH'nin gerçek değeri olmamalıdır; ancak nadirleşmiş veya edinilmesi zorlaşmış bazı test ağı ETH türleri için piyasalar oluşturulmuştur. Ethereum ile sahiden etkileşime geçmek için (test ağlarında bile) ETH'ye ihtiyacınız olduğu için çoğu kişi test ağı ETH'sini musluklardan ücretsiz şekilde alır. Çoğu musluk, ETH'nin gönderilmesini istediğiniz bir adresi girebileceğiniz web uygulamalarıdır.

#### Hangi Test Ağını kullanmalıyım?

İstemci geliştiricilerinin şu anda bakımını yaptığı iki halka açık test ağı Sepolia ve Hoodi'dir. Sepolia, sözleşme ve uygulama geliştiricilerinin uygulamalarını test etmek için kullandığı bir ağdır. Hoodi ağı, protokol geliştiricilerinin ağ yükseltmelerini test etmelerine ve paydaşların çalışan doğrulayıcıları test etmelerine olanak tanır.

#### Sepolia {#sepolia}

**Sepolia uygulama geliştirme için önerilen test ağıdır**. Sepolia ağı, istemci ve test ekipleri tarafından kontrol edilen izinli bir doğrulayıcı seti kullanır.

##### Kaynaklar

- [Web sitesi](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Musluklar

- [Alchemy Sepolia Musluğu](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Chain Platform Sepolia Musluğu](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Chainstack Sepolia Musluğu](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Ethereum Ekosistem Musluğu](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [ethfaucet.com Sepolia Musluğu](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepolia Musluğu](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia Musluğu](https://www.infura.io/faucet)
- [PoW Musluğu](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia Musluğu](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi, doğrulamayı ve hisselemeyi test etmeye yönelik bir test ağıdır. Hoodi ağı, bir test ağı doğrulayıcısı çalıştırmak isteyen kullanıcılara açıktır. Ana ağa dağıtılmadan önce protokol yükseltmelerini test etmek isteyen paydaşlar bu nedenle Hoodi'yi kullanmalıdır.

- Açık doğrulayıcı dizisi, paydaşlar ağ yükseltmelerini test edebilirler
- Büyük durum, kompleks akıllı sözleşme etkileşimlerini test etmek için kullanışlıdır
- Eşlenmesi daha uzun sürer ve düğüm çalıştırmak için daha çok depolama gerektirir

##### Kaynaklar

- [Web sitesi](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Gezgin](https://explorer.hoodi.ethpandaops.io/)
- [Kontrol Noktası Senkronizasyonu](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Musluklar

- [Chain Platform Hoodi Musluğu](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi Musluğu](https://hoodi.ethpandaops.io/)
- [PoW Musluğu](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery, her ay tamamen sıfırlanan benzersiz bir test ağı türüdür. Yürütme ve mutabakat durumu her 28 günde bir başlangıç durumuna geri döner, bu da test ağında olan her şeyin geçici olduğu anlamına gelir. Bu, onu kısa süreli testler, hızlı düğüm önyüklemesi ve kalıcılığa ihtiyaç duymayan 'merhaba dünya' türü uygulamalar için ideal kılar.

- Her zaman yeni durum, doğrulayıcıların ve uygulamaların kısa süreli test edilmesi
- Yalnızca temel sözleşme setini içerir
- Açık doğrulayıcı seti ve büyük miktarda fona kolay erişim
- En düşük düğüm gereksinimleri ve en hızlı senkronizasyon, ortalama &lt;5GB

##### Kaynaklar

- [Web sitesi](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [Topluluk sohbeti](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Beacon gezgini](https://beaconlight.ephemery.dev/)
- [Kontrol Noktası Senkronizasyonu](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Musluklar

- [Bordel Musluğu](https://faucet.bordel.wtf/)
- [Pk910 PoW Musluğu](https://ephemery-faucet.pk910.de/)

#### Holesky (kullanımdan kaldırıldı) {#holesky}

Holesky test ağı Eylül 2025 itibarıyla kullanımdan kaldırılmıştır. Hisseleme operatörleri ve altyapı sağlayıcıları bunun yerine doğrulayıcı testi için Hoodi'yi kullanmalıdır.

- [Holesky Test Ağı Kapatma Duyurusu](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _EF Blog, 1 Eylül 2025_
- [Holesky ve Hoodi Test Ağı Güncellemeleri](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _EF Blog, 18 Mart 2025_

### Katman 2 test ağları {#layer-2-testnets}

[Katman 2 (L2)](/layer-2/), belirli bir Ethereum ölçeklendirme çözümleri setini tanımlamak için kullanılan kolektif bir terimdir. Katman 2, Ethereum'u genişleten ve Ethereum'un güvenlik garantilerini devralan ayrı bir blok zincirdir. Katman 2 test ağları genellikle genel Ethereum test ağlarına sıkı sıkıya bağlıdır.

#### Arbitrum Sepolia {#arbitrum-sepolia}

[Arbitrum](https://arbitrum.io/) için bir test ağı.

##### Kaynaklar

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Musluklar

- [Alchemy Arbitrum Sepolia Musluğu](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia musluğu](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia Musluğu](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia Musluğu](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[Optimism](https://www.optimism.io/) için bir test ağı.

##### Kaynaklar

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Musluklar

- [Alchemy Musluğu](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlink Musluğu](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia Musluğu](https://ethfaucet.com/networks/optimism)
- [Test Ağı Musluğu](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

[Starknet](https://www.starknet.io) için bir test ağı.

##### Kaynaklar

- [Starkscan](https://sepolia.starkscan.co/)

##### Musluklar

- [Alchemy Musluğu](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia Musluğu](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet Musluğu](https://starknet-faucet.vercel.app/)

## Özel ağlar {#private-networks}

Bir Ethereum ağı, düğümleri halka açık bir ağa (yani Ana Ağ veya bir test ağı) bağlı değilse özel bir ağdır. Bu bağlamda özel, korumalı veya güvenli olmaktan ziyade yalnızca ayrılmış veya izole anlamına gelir.

### Geliştirme ağları {#development-networks}

Bir Ethereum uygulaması geliştirmek için dağıtmadan önce nasıl çalıştığını görmek amacıyla bunu özel bir ağda çalıştırmanız faydalı olur. Web geliştirme için bilgisayarınızda yerel bir sunucu oluşturmanıza benzer şekilde, merkeziyetsiz uygulamanızı test etmek için yerel bir blokzincir örneği oluşturabilirsiniz. Bu, genel bir test ağından çok daha hızlı yinelemeye izin verir.

Buna yardımcı olmak için ayrılmış projeler ve araçlar bulunuyor. [Geliştirme ağları](/developers/docs/development-networks/) hakkında daha fazla bilgi edinin.

### Konsorsiyum ağları {#consortium-networks}

Mutabakat süreci, güvenilen önceden tanımlanmış bir dizi düğüm tarafından kontrol edilir. Örneğin, her biri tek bir düğümü yöneten ünlü akademik kurumlardan oluşan özel bir ağ ve ağ içindeki bir imza sahibi eşiği tarafından doğrulanan bloklar.

Genel bir Ethereum ağı genel internete benziyorsa, bir konsorsiyum ağı özel bir intranet gibidir.

## <Emoji text="🚉" /> Ethereum test ağlarına neden metro istasyonlarının adları veriliyor? {#why-naming}

Birçok Ethereum test ağı, adını gerçek dünyadaki metro veya tren istasyonlarından alır. Bu adlandırma geleneği erken başlamıştır ve katkıda bulunanların yaşadığı veya çalıştığı küresel şehirleri yansıtır. Sembolik, akılda kalıcı ve pratiktir. Test ağlarının Ethereum ana ağından izole edilmesi gibi, metro hatları da yüzey trafiğinden ayrı olarak çalışır.

### <Emoji text="🚧" /> Yaygın olarak kullanılan ve eski test ağları {#common-and-legacy-testnets}

- **Sepolia** - Yunanistan'ın Atina kentinde metro bağlantılı bir mahalle. Şu anda akıllı sözleşme ve dApp testi için kullanılmaktadır.
- **Hoodi** - Adını Hindistan'ın Bengaluru kentindeki Hoodi metro istasyonundan almıştır. Doğrulayıcı ve protokol yükseltme testi için kullanılır.
- **Goerli** _(kullanımdan kaldırıldı)_ - Adını Almanya'nın Berlin kentindeki Görlitzer Bahnhof'tan almıştır.
- **Rinkeby** _(kullanımdan kaldırıldı)_ - Adını Stockholm'de metro istasyonu olan bir banliyöden almıştır.
- **Ropsten** _(kullanımdan kaldırıldı)_ - Stockholm'de bir bölgeye ve eski feribot/metro terminaline atıfta bulunur.
- **Kovan** _(kullanımdan kaldırıldı)_ - Adını Singapur'daki bir MRT istasyonundan almıştır.
- **Morden** _(kullanımdan kaldırıldı)_ - Adını Londra Metrosu'ndaki bir istasyondan almıştır. Ethereum'un ilk halka açık test ağı.

### <Emoji text="🧪" /> Diğer özel test ağları {#other-testnets}

Bazı test ağları kısa süreli veya yükseltmeye özel testler için oluşturulmuştur ve metro temalı olmak zorunda değildir:

- **Holesky** _(kullanımdan kaldırıldı)_ - Adını Prag'daki Holešovice istasyonundan almıştır. Doğrulayıcı testi için kullanılmıştır; 2025'te kullanımdan kaldırılmıştır.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(tümü kullanımdan kaldırıldı)_ ve **Ephemery** - Birleşim, Shanghai gibi yükseltme simülasyonları veya doğrulayıcı deneyleri için özel olarak oluşturulmuştur. Bazı isimler metro tabanlı olmaktan çok bölgesel veya tematiktir.

Metro istasyonu adlarını kullanmak, geliştiricilerin sayısal zincir kimliklerine güvenmek zorunda kalmadan test ağlarını hızlı bir şekilde tanımlamasına ve hatırlamasına yardımcı olur. Aynı zamanda Ethereum'un kültürünü de yansıtır: pratik, küresel ve insan merkezli.

## İlgili araçlar {#related-tools}

- [Chainlist](https://chainlist.org/) _cüzdanları ve sağlayıcıları uygun Zincir Kimliğine ve Ağ Kimliğine bağlamak için kullanılan EVM ağları listesi_
- [EVM tabanlı Zincirler](https://github.com/ethereum-lists/chains) _Chainlist'i güçlendiren zincir meta verilerinin GitHub deposu_

## Daha fazla kaynak {#further-reading}

- [Öneri: Öngörülebilir Ethereum Test Ağı Yaşam Döngüsü](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Ethereum Test Ağlarının Evrimi](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
