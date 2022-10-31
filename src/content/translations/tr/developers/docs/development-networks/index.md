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

_İsterseniz_ [bir düğüm çalıştırabilirsiniz](/developers/docs/nodes-and-clients/#running-your-own-node) (Geth, Erigon veya Nethermind gibi) ancak geliştirme ağları geliştirme için özel olarak oluşturulduğundan, genellikle aşağıdakiler gibi kullanışlı özelliklerle birlikte gelirler:

- Yerel blok zincirinizi deterministik olarak verilerle tohumlama (ör. ETH bakiyeli hesaplar)
- Sırayla ve gecikme olmadan, aldığı her işlemle anında blok madenciliği yapma
- Gelişmiş hata ayıklama ve kaydetme işlevi

## Mevcut araçlar {#available-projects}

**Not**: Çoğu [geliştirme çerçevesi](/developers/docs/frameworks/) yerleşik bir geliştirme ağı içerir. [Yerel geliştirme ortamınızı kurmak](/developers/local-environment/) için bir çerçeve ile başlamanızı öneririz.

### Ganache {#ganache}

Test yapmak, komutları yürütmek ve zincirin nasıl çalıştığını kontrol ederken durumu incelemek için kullanabileceğiniz kişisel bir Ethereum blok zincirini hızla çalıştırın.

Ganache, hem bir masaüstü uygulaması (Ganache UI) hem de bir komut satırı aracı (`ganache-cli`) sağlar. Truffle araç takımının bir parçasıdır.

- [Web sitesi](https://www.trufflesuite.com/ganache)
- [GitHub](https://github.com/trufflesuite/ganache)
- [Belgeler](https://www.trufflesuite.com/docs/ganache/overview)

### Hardhat Ağı {#hardhat-network}

Geliştirme için tasarlanmış yerel bir Ethereum ağı. Sözleşmelerinizi dağıtmanıza, testlerinizi çalıştırmanıza ve kodunuzda hata ayıklamanıza olanak tanır.

Hardhat Network, profesyoneller için bir Ethereum geliştirme ortamı olan Hardhat ile yerleşik olarak gelir.

- [Web sitesi](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## İlgili konular {#related-topics}

- [Geliştirme çerçeveleri](/developers/docs/frameworks/)
- [Yerel bir geliştirme ortamı oluşturun](/developers/local-environment/)
