---
title: Geliştirme Ağları
description: Geliştirme ağlarına ve Ethereum uygulamaları oluşturmaya yardımcı mevcut araçlara genel bakış.
lang: tr
---

Akıllı sözleşmelerle bir Ethereum uygulaması geliştirirken, onu dağıtmadan önce nasıl çalıştığını görmek amacıyla yerel bir ağda çalıştırmanız faydalı olur.

Web geliştirme için bilgisayarınızda yerel bir sunucu çalıştırmaya benzer şekilde, bir geliştirici ağı kullanarak dapp'inizi test etmek için yerel bir blok zinciri örneği oluşturabilirsiniz. Bu Ethereum geliştirme ağları, genel bir test ağından çok daha hızlı yinelemeye izin veren özellikler sunar (örneğin, bir test ağı musluğundan ETH almakla uğraşmanıza gerek yoktur).

## Ön koşullar {#prerequisites}

Geliştirme ağlarına dalmadan önce [Ethereum yığınının temellerini](/developers/docs/ethereum-stack/) ve [Ethereum ağlarını](/developers/docs/networks/) anlamalısınız.

## Bir geliştirme ağı nedir? {#what-is-a-development-network}

Geliştirme ağları, özünde yerel geliştirme için özel olarak tasarlanmış Ethereum istemcileridir (Ethereum uygulamaları).

**Neden standart bir Ethereum düğümünü yerel olarak çalıştırmıyoruz ki?**

Siz [bir düğüm](/developers/docs/nodes-and-clients/#running-your-own-node) _çalıştırabilirsiniz_, ancak geliştirme ağları özellikle geliştirme amacıyla özel olarak tasarlandığı için, genellikle şunlar gibi kullanışlı özelliklerle sahip olurlar:

- Yerel blok zincirinizi deterministik olarak verilerle tohumlama (ör. ETH bakiyeli hesaplar)
- Aldığı her işlemle anlık ve sırasıyla, herhangi bir gecikme olmaksızın blok üretme
- Gelişmiş hata ayıklama ve kaydetme işlevi

## Mevcut araçlar {#available-projects}

**Not**: Çoğu [geliştirme çerçevesi](/developers/docs/frameworks/) yerleşik bir geliştirme ağı içerir. [Yerel geliştirme ortamınızı kurmak](/developers/local-environment/) için bir çerçeve ile başlamanızı öneririz.

### Hardhat Ağı {#hardhat-network}

Geliştirme için tasarlanmış yerel bir Ethereum ağı. Sözleşmelerinizi dağıtmanıza, testlerinizi çalıştırmanıza ve kodunuzda hata ayıklamanıza olanak tanır.

Hardhat Network, profesyoneller için bir Ethereum geliştirme ortamı olan Hardhat ile yerleşik olarak gelir.

- [Web sitesi](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### Yerel İşaret Zincirleri {#local-beacon-chains}

Bazı fikir birliği istemcileri, test amacıyla yerel işaret zincirleri oluşturmak için yerleşik araçlara sahiptir. Lighthouse, Nimbus ve Lodestar için talimatlar mevcuttur:

- [Lodestar kullanan yerel test ağı](https://chainsafe.github.io/lodestar/usage/local/)
- [Lighthouse kullanan yerel test ağı](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)
- [Nimbus kullanan yerel test ağı](https://github.com/status-im/nimbus-eth1/blob/master/fluffy/docs/local_testnet.md)

### Herkese açık Ethereum Test zincileri {#public-beacon-testchains}

Ayrıca Ethereum'un halka açık iki test uygulaması da bulunmaktadır: Goerli ve Sepolia. Uzun vadeli desteğe sahip ve önerilen test ağı Goerli'dir ve herkes bu ağda doğrulama yapmakta serbesttir. Sepolia, izinli bir doğrulayıcı kümesiyle (yani bu test ağında yeni doğrulayıcılara genel bir erişim yoktur) daha yeni, daha küçük bir zincirdir ve öngörülebilir gelecekte de desteğin sürdürülmesi beklenmektedir. Ropsten zinciri 2022 yılının 4.çeyreğinde, Rinkeby zinciri ise 2023 yılının 2 veya 3.çeyreğinde kullanımdan kaldırılması beklenmektedir.

- [Goerli Hisseleme Başlama Noktası](https://goerli.launchpad.ethereum.org/)
- [Ropsten, Rinkeby ve Kiln Kaldırma Duyurusu](https://blog.ethereum.org/2022/06/21/testnet-deprecation)

### Kurtosis Ethereum Paketi {#kurtosis}

Kurtosis, geliştiriciler için blok zincir ağlarının tekrarlanabilir örneklerini yerel olarak oluşturmalarını sağlayan çoklu konteyner test ortamlarının yapısal bir sistemidir.

Ethereum Kurtosis paketi, Docker veya Kubernetes üzerinde parametrelendirilebilir, yüksek oranda ölçeklenebilir ve özel bir Ethereum test ağını hızlı bir şekilde örneklendirmek için kullanılabilir. Paket, tüm büyük Yürütüm Katmanı (EL) ve Fikir Birliği Katmanı (CL) istemcilerini destekler. Kurtosis, Ethereum'un çekirdek altyapısıyla ilgili doğrulama ve test iş akışlarında kullanılacak temsili bir ağ için tüm yerel bağlantı noktası eşlemelerini ve hizmet bağlantılarını incelikli bir şekilde yönetir.

- [Ethereum ağ paketi](https://github.com/kurtosis-tech/ethereum-package)
- [Web sitesi](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Dokümanlar](https://docs.kurtosis.com/)

## daha fazla okuma {#further-reading}

_Size yardımcı olan bir topluluk kaynağı biliyor musunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [Geliştirici çerçeveleri](/developers/docs/frameworks/)
- [Yerel bir geliştirme ortamı oluşturun](/developers/local-environment/)
