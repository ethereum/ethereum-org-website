---
title: Akıllı kontratları dağıtmak
description: Akıllı sözleşmelerin ön koşullar, araçlar ve dağıtım adımları da dahil olmak üzere Ethereum ağlarına nasıl dağıtılacağını öğrenin.
lang: tr
---

Ethereum ağının kullanıcılarının akıllı sözleşmenizi kullanabilmeleri için onu dağıtmalısınız.

Bir akıllı sözleşmeyi dağıtmak için, bir alıcı belirtmeden akıllı sözleşmenin derlenmiş kodunu içeren bir Ethereum işlemi göndermeniz yeterlidir.

## Ön Koşullar {#prerequisites}

Akıllı sözleşmeleri dağıtmadan önce [Ethereum ağlarını](/developers/docs/networks/), [işlemleri](/developers/docs/transactions/) ve [akıllı sözleşmelerin anatomisini](/developers/docs/smart-contracts/anatomy/) anlamanız gerekir.

Sözleşmeler blokzincirde saklandığı için bir sözleşmeyi dağıtmak ether (ETH) maliyetine sahiptir, bu nedenle Ethereum'daki [gaz ve ücretler](/developers/docs/gas/) hakkında bilgi sahibi olmalısınız.

Son olarak, sözleşmenizi dağıtmadan önce derlemeniz gerekir, bu nedenle [akıllı sözleşmeleri derleme](/developers/docs/smart-contracts/compiling/) hakkında okuduğunuzdan emin olun.

## Bir akıllı sözleşme nasıl dağıtılır {#how-to-deploy-a-smart-contract}

### İhtiyaç duyacaklarınız {#what-youll-need}

- Sözleşmenizin bit kodu – bu, [derleme](/developers/docs/smart-contracts/compiling/) yoluyla oluşturulur
- Gaz için ETH - gaz limitinizi diğer işlemler gibi ayarlayacağınız için sözleşme dağıtımının basit bir ETH aktarımından çok daha fazla gaz gerektirdiğini unutmayın
- bir dağıtım komut dosyası veya eklentisi
- Kendi düğümünüzü çalıştırarak, halka açık bir düğüme bağlanarak veya bir [düğüm hizmeti](/developers/docs/nodes-and-clients/nodes-as-a-service/) kullanarak bir API anahtarı aracılığıyla bir [Ethereum düğümüne](/developers/docs/nodes-and-clients/) erişim

### Bir akıllı sözleşmeyi dağıtma adımları {#steps-to-deploy}

İlgili spesifik adımlar, söz konusu geliştirme çerçevesine bağımlı olacaktır. Örneğin, [Hardhat'in sözleşmelerinizi dağıtma hakkındaki dokümanlarına](https://hardhat.org/docs/tutorial/deploying) veya [Foundry'nin bir akıllı sözleşmeyi dağıtma ve doğrulama hakkındaki dokümanlarına](https://book.getfoundry.sh/forge/deploying) göz atabilirsiniz. Dağıtıldıktan sonra sözleşmeniz, diğer [hesaplar](/developers/docs/accounts/) gibi bir Ethereum adresine sahip olacak ve [kaynak kodu doğrulama araçları](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) kullanılarak doğrulanabilecektir.

## İlgili araçlar {#related-tools}

**Remix - _Remix IDE, Ethereum benzeri blokzincirler için akıllı sözleşmelerin geliştirilmesine, dağıtılmasına ve yönetilmesine olanak tanır_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Akıllı sözleşmeleri geliştirmek, test etmek, izlemek ve işletmek için hata ayıklama, gözlemlenebilirlik ve altyapı yapı taşları sağlayan Web3 geliştirme platformu_**

- [tenderly.co](https://tenderly.co/)
- [Dokümanlar](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Ethereum yazılımınızı derlemek, dağıtmak, test etmek ve hatalarını ayıklamak için bir geliştirme ortamı_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Sözleşmelerinizi dağıtma üzerine dokümanlar](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Tek bir komut kullanarak herhangi bir sözleşmeyi, Ethereum Sanal Makinesi uyumlu herhangi bir zincire kolayca dağıtın_**

- [Dokümanlar](https://portal.thirdweb.com/deploy/)

**Crossmint - _Akıllı sözleşmeleri dağıtmak, kredi kartı ödemelerini ve zincirler arası ödemeleri mümkün kılmak ve API'leri kullanarak NFT oluşturmak, dağıtmak, satmak, depolamak ve düzenlemek amaçlı kurumsal bir Web3 geliştirme platformudur._**

- [crossmint.com](https://www.crossmint.com)
- [Dokümantasyon](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## İlgili öğreticiler {#related-tutorials}

- [İlk akıllı sözleşmenizi dağıtma](/developers/tutorials/deploying-your-first-smart-contract/) _– Bir Ethereum test ağı üzerinde ilk akıllı sözleşmenizi dağıtmaya giriş._
- [Merhaba Dünya | akıllı sözleşme öğreticisi](/developers/tutorials/hello-world-smart-contract/) _– Ethereum'da temel bir akıllı sözleşme oluşturmak ve dağıtmak için takip etmesi kolay bir öğretici._
- [Solidity'den diğer sözleşmelerle etkileşim kurma](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Mevcut bir sözleşmeden bir akıllı sözleşmenin nasıl dağıtılacağı ve onunla nasıl etkileşim kurulacağı._
- [Sözleşme boyutunu nasıl küçültebilirsiniz](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Sözleşmenizin boyutunu sınırın altında tutmak ve gazdan tasarruf etmek için nasıl küçülteceğiniz_

## Daha fazla kaynak {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat ile sözleşmelerinizi dağıtma](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## Alakalı başlıklar {#related-topics}

- [Geliştirme çerçeveleri](/developers/docs/frameworks/)
- [Bir Ethereum düğümü çalıştırın](/developers/docs/nodes-and-clients/run-a-node/)
- [Hizmet olarak düğümler](/developers/docs/nodes-and-clients/nodes-as-a-service)
