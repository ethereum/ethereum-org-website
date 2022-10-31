---
title: Ağlar
description: Ethereum'un ağlarına ve uygulamanızı test etmek için test ağı ether'inin (ETH) nereden alınacağına genel bir bakış.
lang: tr
---

Ethereum'un bir protokol olması, birbiriyle etkileşime girmeyen bu protokole uygun birden fazla bağımsız "ağ" olabileceği anlamına gelir.

Ağlar; geliştirme, test etme veya üretim kullanım alanları için erişebileceğiniz farklı Ethereum ortamlarıdır. Ethereum hesabınız farklı ağlarda çalışır ancak hesap bakiyeniz ve işlem geçmişiniz ana Ethereum ağından taşınmaz. Test amacı için, hangi ağların mevcut olduğunu ve test ağı ETH'si ile denemeler yapabilmek onun nasıl alınacağını bilmek faydalıdır.

## Ön koşullar {#prerequisites}

Farklı ağları okumadan önce Ethereum'un temellerini anlamalısınız, çünkü test ağları size deneme yapmanız için ucuz ve güvenli bir Ethereum sürümü sağlar. [Ethereum'a giriş](/developers/docs/intro-to-ethereum/) makalemizden başlayın.

## Genel ağlar {#public-networks}

Genel ağlara, internet bağlantısı olan herkes dünyanın her yerinde erişebilir. Herkes halka açık bir blok zincirinde işlemleri okuyabilir veya oluşturabilir ve yürütülen işlemleri doğrulayabilir. İşlemler ve ağın durumu üzerindeki anlaşma, eşlerin mutabakatı ile kararlaştırılır.

### Ana Ağ {#mainnet}

Mainnet, dağıtılmış defterde gerçek değer işlemlerinin gerçekleştiği birincil halka açık Ethereum üretim blok zinciridir.

İnsanlar ve borsalar ETH fiyatlarını tartışırken Mainnet ETH'den bahsederler.

### Test Ağları {#testnets}

Mainnet'e ek olarak, genel test ağları vardır. Bunlar, protokol geliştiricileri veya akıllı sözleşme geliştiricileri tarafından, Mainnet'e dağıtımdan önce üretim benzeri bir ortamda hem protokol yükseltmelerini hem de potansiyel akıllı sözleşmeleri test etmek için kullanılan ağlardır. Bunu, üretime karşı hazırlama sunucularına bir analog olarak düşünün.

Mainnet'e dağıtmadan önce bir test ağına yazdığınız herhangi bir sözleşme kodunu test etmek genellikle önemlidir. Mevcut akıllı sözleşmelerle bütünleşen bir dapp oluşturuyorsanız, çoğu projede etkileşim kurabileceğiniz test ortamlarına dağıtılmış kopyalar bulunur.

Çoğu test ağı, bir yetki ispatı mutabakat mekanizması kullanır. Bu, işlemleri doğrulamak ve yeni bloklar oluşturmak için az sayıda düğümün seçildiği anlamına gelir: Düğümler bu süreçte kimliklerini stake ederler. Madenciliği, ağı savunmasız bırakabilecek bir iş ispatı test ağında teşvik etmek zordur.

Test ağlarındaki ETH'nin gerçek bir değeri yoktur; bu nedenle, test ağı ETH'si için piyasalar yoktur. Ethereum ile gerçekten etkileşim kurmak için ETH'ye ihtiyacınız olduğundan, çoğu insan musluklardan test ağı ETH'si alır. Çoğu musluk, ETH'nin gönderilmesini istediğiniz bir adresi girebileceğiniz web uygulamalarıdır.

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

[Arbitrum](https://arbitrum.io/) için bir test ağı.

##### Arbitrum Rinkeby musluğu

- [FaucETH](https://fauceth.komputing.org)(Sosyal hesap gerektirmeyen çok zincirli musluk)
- [Chainlink musluğu](https://faucets.chain.link/)
- [Paradigm musluğu](https://faucet.paradigm.xyz/)

#### Görli {#goerli}

İstemciler arasında çalışan bir yetki ispatı test ağı.

##### Görli muslukları

- [Görli musluk](https://faucet.goerli.mudit.blog/)
- [Chainlink musluğu](https://faucets.chain.link/)
- [Alchemy Goerli Musluğu](https://goerlifaucet.com/)

#### Kintsugi {#kintsugi}

Ethereum için bir birleştirme test ağı.

##### Kintsugi muslukları

- [FaucETH](https://fauceth.komputing.org)(Sosyal hesap gerektirmeyen çok zincirli musluk)
- [Kintsugi musluğu](https://faucet.kintsugi.themerge.dev/)

#### Kovan {#kovan}

OpenEthereum istemcileri çalıştıranlar için bir yetki ispatı test ağı.

##### Kovan muslukları

- [FaucETH](https://fauceth.komputing.org)(Sosyal hesap gerektirmeyen çok zincirli musluk)
- [Kovan musluğu](https://faucet.kovan.network/)
- [Chainlink musluğu](https://faucets.chain.link/)
- [Paradigm musluğu](https://faucet.paradigm.xyz/)

#### Optimistic Kovan {#optimistic-kovan}

[Optimism](https://www.optimism.io/) için bir test ağı.

##### Optimistic Kovan muslukları

- [FaucETH](https://fauceth.komputing.org)(Sosyal hesap gerektirmeyen çok zincirli musluk)
- [Paradigm musluğu](https://faucet.paradigm.xyz/)

#### Rinkeby {#rinkeby}

Geth istemcisini çalıştıranlar için bir yetki ispatı test ağı.

##### Rinkeby muslukları

- [FaucETH](https://fauceth.komputing.org)(Sosyal hesap gerektirmeyen çok zincirli musluk)
- [Alchemy musluğu](https://RinkebyFaucet.com)
- [Chainlink musluğu](https://faucets.chain.link/)
- [Paradigm musluğu](https://faucet.paradigm.xyz/)
- [Rinkeby musluğu](https://faucet.rinkeby.io/)

#### Ropsten {#ropsten}

İş ispatı test ağı. Bu, Ethereum'un en benzer temsili olduğu anlamına gelir.

##### Ropsten muslukları

- [FaucETH](https://fauceth.komputing.org)(Sosyal hesap gerektirmeyen çok zincirli musluk)
- [Paradigm musluğu](https://faucet.paradigm.xyz/)

## Özel ağlar {#private-networks}

Bir Ethereum ağı, düğümleri genel bir ağa (yani Mainnet veya bir testnet) bağlı değilse özel bir ağdır. Bu bağlamda özel, korumalı veya güvenli olmaktan ziyade yalnızca ayrılmış veya izole anlamına gelir.

### Geliştirme ağları {#development-networks}

Bir Ethereum uygulaması geliştirmek için, onu dağıtmadan önce nasıl çalıştığını görmek amacıyla özel bir ağda çalıştırmanız faydalı olur. Web geliştirme için bilgisayarınızda yerel bir sunucu oluşturmanıza benzer şekilde, dapp'inizi test etmek için yerel bir blok zinciri örneği oluşturabilirsiniz. Bu, genel bir test ağından çok daha hızlı yinelemeye izin verir.

Buna yardımcı olmak için ayrılmış projeler ve araçlar bulunuyor. [Geliştirme ağları](/developers/docs/development-networks/) hakkında daha fazla bilgi edinin.

### Konsorsiyum ağları {#consortium-networks}

Mutabakat süreci, güvenilen önceden tanımlanmış bir dizi düğüm tarafından kontrol edilir. Örneğin, her biri tek bir düğümü yöneten ünlü akademik kurumlardan oluşan özel bir ağ ve ağ içindeki ağ içindeki bir imza sahibi eşiği tarafından doğrulanan bloklar.

Genel bir Ethereum ağının genel internete benzediğini varsayarsak, bir konsorsiyum ağını özel bir intranet olarak düşünebilirsiniz.

## İlgili araçlar {#related-tools}

- [Chainlist](https://chainlist.org/) _Cüzdanları ve sağlayıcıları uygun Zincir ve Ağ ID'lerine bağlamak için bir EVM ağı listesi_
- [EVM tabanlı Zincirler](https://github.com/ethereum-lists/chains) _Chainlist'i destekleyen zincir üstverisinin GitHub deposu_

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
