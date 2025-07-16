---
title: Ağlar
description: Ethereum'un ağlarına ve uygulamanızı test etmek için test ağı ether'inin (ETH) nereden alınacağına genel bir bakış.
lang: tr
---

Ethereum ağları, Ethereum protokolü kullanarak iletişim kuran bağlantılı bilgisayar gruplarıdır. Sadece tek bir Ethereum ana ağı vardır ama aynı protokol ile uyumlu bağımsız ağlar da test ve geliştirme amaçları için kullanılabilir. Birbirleriyle etkileşime girmeden protokol ile uyumlu pek çok bağımsız "ağ" vardır. Kendi akıllı sözleşmelerini ve web3 uygulamalarını test etmek için bile bilgisayarında yerel bir ağ kurabilirsin.

Ethereum hesabınız farklı ağlarda çalışacaktır, ancak hesap bakiyeniz ve işlem geçmişiniz ana Ethereum ağından taşınmayacaktır. Test amacıyla, hangi ağların mevcut olduğunu ve oynamak için test ağı ETH'sinin nasıl elde edileceğini bilmek yararlıdır. Güvenlik sebeplerinden dolayı test ağlarının ana ağlarda kullanılması veya bunun tam tersi genellikle önerilmez.

## Ön koşullar {#prerequisites}

Farklı ağları okumadan önce [Ethereum'un temellerini](/developers/docs/intro-to-ethereum/) anlamalısınız çünkü test ağları size Ethereum'un ucuz ve güvenli bir versiyonunu sunacaktır.

## Genel ağlar {#public-networks}

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

Mevcut olarak istemci geliştiricilerin sürdürdüğü iki genel test ağı Sepolia ve Hoodi'dir. Sepolia, sözleşme ve uygulama geliştiricilerinin uygulamalarını test etmek için kullandığı bir ağdır. Hoodi ağı, protokol geliştiricilerinin ağ yükseltmelerini test etmelerine ve paydaşların doğrulayıcıları çalıştırmayı test etmelerine olanak sağlar.

#### Sepolia {#sepolia}

**Sepolia uygulama geliştirme için önerilen test ağıdır**. Sepolia ağı izinli bir doğrulayıcı seti kullanır. Aslında bu oldukça yenidir, yani durum ve işlem geçmişi oldukça küçüktür. Yani bu, ağın senkronizasyon için hızlı olduğu ve ağın üzerinde düğüm çalıştırmanın düşük depolama alanı gerektirdiği anlamına gelir. Hızlıca düğüm çalıştırmak ve ağ ile doğrudan etkileşime geçmek isteyen kullanıcılar için kullanışlıdır.

- İstemci ve test ekipleri tarafından kontrol edilen kapalı doğrulayıcı seti
- Yeni test ağı, diğer ağlara kıyasla daha az uygulama içerir
- Hızlı senkronizasyon ve düşük disk alanı gerektiren düğüm çalıştırma süreci

##### Kaynaklar

- [Web sitesi](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Musluklar

- [QuickNode Sepolia Musluğu](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [İş İspatı Musluğu](https://sepolia-faucet.pk910.de/)
- [Coinbase Cüzdanı Musluğu | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia musluğu](https://sepoliafaucet.com/)
- [Infura Sepolia Musluğu](https://www.infura.io/faucet)
- [Chainstack Sepolia Musluğu](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Ethereum Ekosistemi musluğu](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Hoodi {#hoodi}

_Not: [Goerli test ağı kullanımdan kaldırılmıştır](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) ve Hoodi ile değiştirilmiştir. Lütfen uygulamalarınızı Sepolia'ya taşımayı düşünün._

Hoodi doğrulama ve hisselemeyi test etme amaçlı bir test ağıdır. Hoodi ağı, bir test ağı doğrulayıcısı çalıştırmak isteyen kullanıcılara açıktır. Protokol yükseltmelerini ana ağa dağıtılmadan önce test etmek isteyen paydaşlar bundan dolayı Hoodi'yi kullanmalıdır.

- Açık doğrulayıcı dizisi, paydaşlar ağ yükseltmelerini test edebilirler
- Büyük durum, kompleks akıllı sözleşme etkileşimlerini test etmek için kullanışlıdır
- Eşlenmesi daha uzun sürer ve düğüm çalıştırmak için daha çok depolama gerektirir

##### Kaynaklar

- [Web sitesi](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)

##### Musluklar

- [Hoodi Musluğu](https://hoodi.ethpandaops.io/)

Hoodi test ağında bir Doğrulayıcı başlatmak için, [Hoodi başlangıç platformunu](https://hoodi.launchpad.ethereum.org/en/) kullanın.

### Katman 2 test ağları {#layer-2-testnets}

[Katman 2 (L2)](/layer-2/), belirli Ethereum ölçeklendirme çözümlerini tanımlamak için kullanılan toplu bir terimdir. Katman 2, Ethereum'u genişleten ve Ethereum'un güvenlik garantilerini devralan ayrı bir blok zincirdir. Katman 2 test ağları genellikle genel Ethereum test ağlarına sıkı sıkıya bağlıdır.

#### Arbitrum Sepolia {#arbitrum-sepolia}

[Arbitrum](https://arbitrum.io/) için bir test ağı.

##### Musluklar

- [Chainlink musluğu](https://faucets.chain.link/arbitrum-sepolia)
- [Alchemy musluğu](https://www.alchemy.com/faucets/arbitrum-sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[Optimism](https://www.optimism.io/) için test ağı.

##### Musluklar

- [Chainlink musluğu](https://faucets.chain.link/optimism-sepolia)
- [Alchemy musluğu](https://www.alchemy.com/faucets/optimism-sepolia)

#### Starknet Sepolia {#starknet-sepolia}

[Starknet](https://www.starknet.io) için test ağı.

##### Musluklar

- [Alchemy musluğu](https://www.alchemy.com/faucets/starknet-sepolia)

## Özel ağlar {#private-networks}

Bir Ethereum ağı, düğümleri genel bir ağa (yani Ana Ağ veya bir test ağı) bağlı değilse özel bir ağ değildir. Bu bağlamda özel, korumalı veya güvenli olmaktan ziyade yalnızca ayrılmış veya izole anlamına gelir.

### Geliştirme ağları {#development-networks}

Bir Ethereum uygulaması geliştirmek için dağıtmadan önce nasıl çalıştığını görmek amacıyla bunu özel bir ağda çalıştırmanız faydalı olur. Web geliştirme için bilgisayarınızda yerel bir sunucu oluşturmanıza benzer şekilde, merkeziyetsiz uygulamanızı test etmek için yerel bir blokzincir örneği oluşturabilirsiniz. Bu, genel bir test ağından çok daha hızlı yinelemeye izin verir.

Buna yardımcı olmak için ayrılmış projeler ve araçlar bulunuyor. [Geliştirme ağları](/developers/docs/development-networks/) hakkında daha fazla bilgi edinin.

### Konsorsiyum ağları {#consortium-networks}

Mutabakat süreci, güvenilen önceden tanımlanmış bir dizi düğüm tarafından kontrol edilir. Örneğin, her biri tek bir düğümü yöneten ünlü akademik kurumlardan oluşan özel bir ağ ve ağ içindeki bir imza sahibi eşiği tarafından doğrulanan bloklar.

Genel bir Ethereum ağı genel internete benziyorsa, bir konsorsiyum ağı özel bir intranet gibidir.

## İlgili araçlar {#related-tools}

- [Chainlist](https://chainlist.org/) _Cüzdanları ve sağlayıcıları uygun Zincir ve Ağ Kimliklerine bağlamaya yarayan bir EVM ağları listesi_
- [EVM Tabanlı Zincirler](https://github.com/ethereum-lists/chains) _Chainlist'i destekleyen zincir üst verisinin GitHub deposu_

## Daha fazla bilgi {#further-reading}

- [Öneri: Tahmin Edilebilir Ethereum Test Ağı Yaşam Döngüsü](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Ethereum Test Ağlarının Gelişimi](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
