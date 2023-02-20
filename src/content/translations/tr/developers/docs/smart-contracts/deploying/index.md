---
title: Akıllı kontratlar dağıtmak
description:
lang: tr
---

Ethereum ağının kullanıcılarının akıllı sözleşmenizi kullanabilmeleri için onu dağıtmalısınız.

Bir akıllı sözleşmeyi dağıtmak için, bir alıcı belirtmeden akıllı sözleşmenin derlenmiş kodunu içeren bir Ethereum işlemi göndermeniz yeterlidir.

## Ön koşullar {#prerequisites}

Akıllı sözleşme dağıtmadan önce [Ethereum ağlarını](/developers/docs/networks/), [işlemlerini](/developers/docs/transactions/) ve [akıllı sözleşmelerin anatomisini](/developers/docs/smart-contracts/anatomy/) anlamalısınız.

Bir sözleşmeyi dağıtmanın da ether (ETH) maliyeti vardır, bundan dolayı Ethereum'daki [gaz ve ücretlere](/developers/docs/gas/) de aşina olmalısınız.

Son olarak, sözleşmenizi dağıtmadan önce onu derlemeniz gerekir, bu yüzden [akıllı sözleşmeleri derleme](/developers/docs/smart-contracts/compiling/) hakkında bilgi edinmeyi de unutmayın.

## Bir akıllı sözleşme nasıl dağıtılır {#how-to-deploy-a-smart-contract}

### İhtiyacınız olanlar {#what-youll-need}

- sözleşmenizin bytecode'u - bu, [derleme](/developers/docs/smart-contracts/compiling/) aracılığıyla oluşturulur
- Gaz için ETH - gaz limitinizi diğer işlemler gibi ayarlayacağınız için sözleşme dağıtımının basit bir ETH aktarımından çok daha fazla gaz gerektirdiğini unutmayın
- bir dağıtım komut dosyası veya eklentisi
- kendiniz çalıştırarak, herkese açık bir düğüme bağlanarak veya bir API anahtarı aracılığıyla Infura ya da Alchemy gibi bir [düğüm hizmeti](/developers/docs/nodes-and-clients/nodes-as-a-service/) kullanarak bir [Ethereum düğümüne](/developers/docs/nodes-and-clients/) erişim

### Bir akıllı sözleşme dağıtmanın aşamaları {#steps-to-deploy}

Belirli aşamalar kullandığınız araçlara göre değişecektir. Örnek olarak, [sözleşmelerinizin dağıtımı hakkında Hardhat belgeleri](https://hardhat.org/guides/deploying.html) veya [Ağlar ve uygulama dağıtımı üzerine Truffle belgelerine](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment) göz atın. Bu ikisi de dağıtım aşamalarını idare etmek için bir komut dosyası yazımını gerektiren ve akıllı sözleşme geliştirme için en popüler araçlardır.

Dağıtıldığında, sözleşmeniz diğer [hesaplar](/developers/docs/accounts/) gibi bir Ethereum adresine sahip olacaktır.

## İlgili araçlar {#related-tools}

**Remix - _Remix IDE Ethereum'a benzer blok zincirleri için akıllı sözleşme geliştirme, dağıtımı ve yönetimi sağlar_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Gerçek zamanlı verilerle EVM uyumlu zincirlerdeki her şeyi simüle edin, hatalarını ayıklayın ve izleyin_**

- [tenderly.co](https://tenderly.co/)
- [Belgeler](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Ethereum yazılımınızı derlemeniz, dağıtmanız, test etmeniz ve hatalarından arındırmanız için bir geliştirme ortamı_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Sözleşme dağıtımı üzerine belgeler](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**Truffle -** **_Bir geliştirme ortamı, test çerçevesi, yapı hattı ve diğer araçlar._**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [Ağlar ve uygulama geliştirme üzerine belgeler](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment)
- [GitHub](https://github.com/trufflesuite/truffle)

## İlgili öğreticiler {#related-tutorials}

- [İlk akıllı sözleşmenizi dağıtma](/developers/tutorials/deploying-your-first-smart-contract/) _– Bir Ethereum test ağı üzerinde ilk akıllı sözleşmenizi dağıtmaya giriş._
- [Solidity ile başka sözleşmelerle etkileşime geçmek](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Mevcut bir sözleşmeden bir akıllı sözleşme dağıtma ve onunla etkileşime geçme._
- [Sözleşme boyutunu azaltma](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Gaz tasarrufu yapmak ve boyutu limitin altında tutmak için sözleşmenizin boyutunu azaltma_

## Daha fazla bilgi {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat ile sözleşmelerinizi dağıtma](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## İlgili konular {#related-topics}

- [Geliştirme çerçeveleri](/developers/docs/frameworks/)
- [Bir Ethereum düğümü çalıştırın](/developers/docs/nodes-and-clients/run-a-node/)
