---
title: Ağlar
description: Ethereum ağlarına genel bir bakış ve uygulamanızı test etmek için test ağı ether'ini (ETH) nereden alabileceğiniz.
lang: tr
---

[Ethereum](/) ağları, Ethereum protokolünü kullanarak iletişim kuran birbirine bağlı bilgisayar gruplarıdır. Sadece bir tane Ethereum Ana Ağı vardır, ancak test ve geliştirme amaçları için aynı protokol kurallarına uyan bağımsız ağlar oluşturulabilir. Birbirleriyle etkileşime girmeden protokole uyan birçok bağımsız "ağ" vardır. Akıllı sözleşmelerinizi ve Web3 uygulamalarınızı test etmek için kendi bilgisayarınızda yerel olarak bile bir tane başlatabilirsiniz.

Ethereum hesabınız farklı ağlarda çalışacaktır, ancak hesap bakiyeniz ve işlem geçmişiniz ana Ethereum ağından aktarılmayacaktır. Test amaçları için, hangi ağların mevcut olduğunu ve denemeler yapmak için test ağı ETH'sini nasıl alacağınızı bilmek faydalıdır. Genel olarak, güvenlik hususları nedeniyle, ana ağ hesaplarını test ağlarında veya tam tersi şekilde yeniden kullanmak önerilmez.

## Ön Koşullar {#prerequisites}

Test ağları size denemeler yapmanız için Ethereum'un ucuz ve güvenli bir sürümünü sunacağından, farklı ağlar hakkında okumadan önce [Ethereum'un temellerini](/developers/docs/intro-to-ethereum/) anlamalısınız.

## Herkese açık ağlar {#public-networks}

Herkese açık ağlara, internet bağlantısı olan dünyadaki herkes erişebilir. Herkes herkese açık bir blokzincirde işlemleri okuyabilir veya oluşturabilir ve yürütülen işlemleri doğrulayabilir. Eşler arasındaki mutabakat, işlemlerin dahil edilmesine ve ağın durumuna karar verir.

### Ethereum Ana Ağı {#ethereum-mainnet}

Ana Ağ, dağıtık defterde gerçek değerli işlemlerin gerçekleştiği birincil herkese açık Ethereum üretim blokzinciridir.

İnsanlar ve borsalar ETH fiyatlarını tartıştıklarında, Ana Ağ ETH'sinden bahsederler.

### Ethereum Test Ağları {#ethereum-testnets}

Ana Ağ'a ek olarak, herkese açık test ağları vardır. Bunlar, protokol geliştiricileri veya akıllı sözleşme geliştiricileri tarafından hem protokol yükseltmelerini hem de potansiyel akıllı sözleşmeleri Ana Ağ'a dağıtımdan önce üretime benzer bir ortamda test etmek için kullanılan ağlardır. Bunu, üretim sunucularına karşı hazırlık (staging) sunucularının bir benzeri olarak düşünün.

Yazdığınız herhangi bir sözleşme kodunu Ana Ağ'a dağıtmadan önce bir test ağında test etmelisiniz. Mevcut akıllı sözleşmelerle entegre olan merkeziyetsiz uygulamalar (dapp'ler) arasında, çoğu projenin test ağlarına dağıtılmış kopyaları vardır.

Çoğu test ağı, izinli bir yetki kanıtı mutabakat mekanizması kullanarak başladı. Bu, işlemleri doğrulamak ve yeni bloklar oluşturmak için az sayıda düğümün seçildiği ve bu süreçte kimliklerini ortaya koydukları (staking) anlamına gelir. Alternatif olarak, bazı test ağları, tıpkı Ethereum Ana Ağı gibi herkesin bir doğrulayıcı çalıştırmayı test edebileceği açık bir Hisse Kanıtı (PoS) mutabakat mekanizmasına sahiptir.

Test ağlarındaki ETH'nin gerçek bir değeri olmaması gerekir; ancak, kıtlaşan veya elde edilmesi zorlaşan belirli test ağı ETH türleri için oluşturulmuş piyasalar olmuştur. Ethereum ile gerçekten etkileşime girmek için (test ağlarında bile) ETH'ye ihtiyacınız olduğundan, çoğu insan test ağı ETH'sini musluklardan ücretsiz olarak alır. Çoğu musluk, ETH'nin gönderilmesini talep ettiğiniz bir adresi girebileceğiniz web uygulamalarıdır.

#### Hangi Test Ağını kullanmalıyım? {#which-testnet-should-i-use}

İstemci geliştiricilerinin şu anda sürdürdüğü iki herkese açık test ağı Sepolia ve Hoodi'dir. Sepolia, sözleşme ve uygulama geliştiricilerinin uygulamalarını test etmeleri için bir ağdır. Hoodi ağı, protokol geliştiricilerinin ağ yükseltmelerini test etmesine ve staker'ların doğrulayıcı çalıştırmayı test etmesine olanak tanır.

#### Sepolia {#sepolia}

**Sepolia, uygulama geliştirme için önerilen varsayılan test ağıdır**. Sepolia ağı, istemci ve test ekipleri tarafından kontrol edilen izinli bir doğrulayıcı seti kullanır.

##### Kaynaklar {#hoodi}

- [Web sitesi](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Musluklar {#ephemery}

- [Alchemy Sepolia Musluğu](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Chain Platform Sepolia Musluğu](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Chainstack Sepolia Musluğu](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Ethereum Ekosistemi Musluğu](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [ethfaucet.com Sepolia Musluğu](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepolia Musluğu](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia Musluğu](https://www.infura.io/faucet)
- [PoW Musluğu](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia Musluğu](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#faucets}

Hoodi, doğrulama ve staking'i test etmek için bir test ağıdır. Hoodi ağı, bir test ağı doğrulayıcısı çalıştırmak isteyen kullanıcılara açıktır. Bu nedenle, protokol yükseltmelerini Ana Ağ'a dağıtılmadan önce test etmek isteyen staker'lar Hoodi'yi kullanmalıdır.

- Açık doğrulayıcı seti, staker'lar ağ yükseltmelerini test edebilir
- Büyük durum, karmaşık akıllı sözleşme etkileşimlerini test etmek için kullanışlıdır
- Eşzamanlaması daha uzun sürer ve bir düğüm çalıştırmak için daha fazla depolama alanı gerektirir

##### Kaynaklar {#holesky}

- [Web sitesi](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Gezgin](https://explorer.hoodi.ethpandaops.io/)
- [Kontrol Noktası Eşzamanlaması](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Musluklar {#layer-2-testnets}

- [Chain Platform Hoodi Musluğu](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi Musluğu](https://hoodi.ethpandaops.io/)
- [PoW Musluğu](https://hoodi-faucet.pk910.de/)

#### Ephemery {#arbitrum-sepolia}

Ephemery, her ay tamamen sıfırlanan benzersiz bir test ağı türüdür. Yürütme ve mutabakat durumu her 28 günde bir başlangıca (genesis) geri döner, bu da test ağında olan her şeyin geçici olduğu anlamına gelir. Bu, onu kısa vadeli testler, hızlı düğüm başlatma ve kalıcılığa ihtiyaç duymayan 'merhaba dünya' türü uygulamalar için ideal hale getirir.

- Her zaman taze durum, doğrulayıcıların ve uygulamaların kısa vadeli testi
- Yalnızca temel sözleşme setini içerir
- Açık doğrulayıcı seti ve büyük miktarda fona kolay erişim
- En küçük düğüm gereksinimleri ve en hızlı eşzamanlama, ortalama &lt;5GB

##### Kaynaklar {#optimistic-sepolia}

- [Web sitesi](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Topluluk sohbeti](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [İşaret (Beacon) gezgini](https://beaconlight.ephemery.dev/)
- [Kontrol Noktası Eşzamanlaması](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Musluklar {#starknet-sepolia}

- [Bordel Musluğu](https://faucet.bordel.wtf/)
- [Pk910 PoW Musluğu](https://ephemery-faucet.pk910.de/)

#### Holesky (kullanımdan kaldırıldı) {#private-networks}

Holesky test ağı Eylül 2025 itibarıyla kullanımdan kaldırılmıştır. Staking operatörleri ve altyapı sağlayıcıları, doğrulayıcı testi için bunun yerine Hoodi'yi kullanmalıdır.

- [Holesky Test Ağı Kapatılma Duyurusu](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _EF Blog, 1 Eylül 2025_
- [Holesky ve Hoodi Test Ağı Güncellemeleri](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _EF Blog, 18 Mart 2025_

### Katman 2 test ağları {#development-networks}

[Katman 2 (l2)](/layer-2/), belirli bir Ethereum ölçeklendirme çözümleri setini tanımlamak için kullanılan ortak bir terimdir. Bir katman 2, Ethereum'u genişleten ve Ethereum'un güvenlik garantilerini devralan ayrı bir blokzincirdir. Katman 2 test ağları genellikle herkese açık Ethereum test ağlarına sıkı sıkıya bağlıdır.

#### Arbitrum Sepolia {#consortium-networks}

[Arbitrum](https://arbitrum.io/) için bir test ağı.

##### Kaynaklar {#why-naming}

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Musluklar {#common-and-legacy-testnets}

- [Alchemy Arbitrum Sepolia Musluğu](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia Musluğu](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia Musluğu](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia Musluğu](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#other-testnets}

[Optimism](https://www.optimism.io/) için bir test ağı.

##### Kaynaklar {#related-tools}

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Musluklar {#further-reading}

- [Alchemy Musluğu](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlink Musluğu](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia Musluğu](https://ethfaucet.com/networks/optimism)
- [Test Ağı Musluğu](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia

[Starknet](https://www.starknet.io) için bir test ağı.

##### Kaynaklar

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Musluklar

- [Alchemy Musluğu](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia Musluğu](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet Musluğu](https://starknet-faucet.vercel.app/)

## Özel ağlar

Bir Ethereum ağı, düğümleri herkese açık bir ağa (yani Ana Ağ veya bir test ağı) bağlı değilse özel bir ağdır. Bu bağlamda özel, korumalı veya güvenli olmaktan ziyade yalnızca ayrılmış veya izole edilmiş anlamına gelir.

### Geliştirme ağları

Bir Ethereum uygulaması geliştirmek için, onu dağıtmadan önce nasıl çalıştığını görmek amacıyla özel bir ağda çalıştırmak isteyeceksiniz. Web geliştirme için bilgisayarınızda yerel bir sunucu oluşturmanıza benzer şekilde, merkeziyetsiz uygulamanızı (dapp) test etmek için yerel bir blokzincir örneği oluşturabilirsiniz. Bu, herkese açık bir test ağından çok daha hızlı yineleme (iterasyon) sağlar.

Buna yardımcı olmaya adanmış projeler ve araçlar vardır. [Geliştirme ağları](/developers/docs/development-networks/) hakkında daha fazla bilgi edinin.

### Konsorsiyum ağları

Mutabakat süreci, güvenilen önceden tanımlanmış bir düğüm seti tarafından kontrol edilir. Örneğin, her birinin tek bir düğümü yönettiği bilinen akademik kurumlardan oluşan özel bir ağ ve bloklar ağ içindeki bir imza sahibi eşiği tarafından doğrulanır.

Herkese açık bir Ethereum ağı herkese açık internet gibiyse, bir konsorsiyum ağı özel bir intranet gibidir.

## <Emoji text="🚉" /> Ethereum test ağlarına neden metro istasyonlarının isimleri veriliyor?

Birçok Ethereum test ağı, adını gerçek dünyadaki metro veya tren istasyonlarından alır. Bu isimlendirme geleneği erken başladı ve katkıda bulunanların yaşadığı veya çalıştığı küresel şehirleri yansıtıyor. Sembolik, akılda kalıcı ve pratiktir. Tıpkı test ağlarının Ethereum ana ağından izole olması gibi, metro hatları da yüzey trafiğinden ayrı çalışır.

### <Emoji text="🚧" /> Yaygın olarak kullanılan ve eski test ağları

- **Sepolia** - Yunanistan'ın Atina kentinde metro bağlantılı bir mahalle. Şu anda akıllı sözleşme ve dApp testi için kullanılıyor.
- **Hoodi** - Adını Hindistan'ın Bengaluru kentindeki Hoodi metro istasyonundan almıştır. Doğrulayıcı ve protokol yükseltme testi için kullanılır.
- **Goerli** _(kullanımdan kaldırıldı)_ - Adını Almanya'nın Berlin kentindeki Görlitzer Bahnhof'tan almıştır.
- **Rinkeby** _(kullanımdan kaldırıldı)_ - Adını metro istasyonu olan bir Stockholm banliyösünden almıştır.
- **Ropsten** _(kullanımdan kaldırıldı)_ - Stockholm'deki bir bölgeyi ve eski feribot/metro terminalini ifade eder.
- **Kovan** _(kullanımdan kaldırıldı)_ - Adını bir Singapur MRT istasyonundan almıştır.
- **Morden** _(kullanımdan kaldırıldı)_ - Adını bir Londra Metrosu istasyonundan almıştır. Ethereum'un ilk herkese açık test ağıdır.

### <Emoji text="🧪" /> Diğer özel test ağları

Bazı test ağları kısa vadeli veya yükseltmeye özel testler için oluşturulmuştur ve illa metro temalı olmaları gerekmez:

- **Holesky** _(kullanımdan kaldırıldı)_ - Adını Prag'daki Holešovice istasyonundan almıştır. Doğrulayıcı testi için kullanılmıştır; 2025'te kullanımdan kaldırılmıştır.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(tümü kullanımdan kaldırıldı)_ ve **Ephemery** - Birleşme, Şanghay veya doğrulayıcı deneyleri gibi yükseltme simülasyonları için özel olarak oluşturulmuştur. Bazı isimler metro tabanlı olmaktan ziyade bölgesel veya tematiktir.

Metro istasyonu isimlerini kullanmak, geliştiricilerin sayısal zincir kimliklerine (chain ID) güvenmeye gerek kalmadan test ağlarını hızlı bir şekilde tanımlamasına ve hatırlamasına yardımcı olur. Aynı zamanda Ethereum'un kültürünü de yansıtır: pratik, küresel ve insan merkezli.

## İlgili araçlar

- [Chainlist](https://chainlist.org/) _cüzdanları ve sağlayıcıları uygun Zincir Kimliğine ve Ağ Kimliğine bağlamak için EVM ağlarının listesi_
- [EVM tabanlı Zincirler](https://github.com/ethereum-lists/chains) _Chainlist'e güç veren zincir meta verilerinin GitHub deposu_

## Daha fazla bilgi

- [Teklif: Öngörülebilir Ethereum Test Ağı Yaşam Döngüsü](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Ethereum Test Ağlarının Evrimi](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)