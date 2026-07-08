---
title: "Akıllı sözleşmeleri dağıtmak"
description: "Ön koşullar, araçlar ve dağıtım adımları dahil olmak üzere akıllı sözleşmeleri Ethereum ağlarına nasıl dağıtacağınızı öğrenin."
lang: tr
---

Akıllı sözleşmenizin bir Ethereum ağı kullanıcıları tarafından kullanılabilir olması için onu dağıtmanız gerekir.

Bir akıllı sözleşmeyi dağıtmak için, herhangi bir alıcı belirtmeden yalnızca akıllı sözleşmenin derlenmiş kodunu içeren bir Ethereum işlemi göndermeniz yeterlidir.

## Ön koşullar {#prerequisites}

Akıllı sözleşmeleri dağıtmadan önce [Ethereum ağlarını](/developers/docs/networks/), [işlemleri](/developers/docs/transactions/) ve [akıllı sözleşmelerin anatomisini](/developers/docs/smart-contracts/anatomy/) anlamalısınız.

Bir sözleşmeyi dağıtmak, blokzincir üzerinde depolandıkları için Ether (ETH) maliyetine de sahiptir, bu nedenle Ethereum'daki [gaz ve ücretlere](/developers/docs/gas/) aşina olmalısınız.

Son olarak, sözleşmenizi dağıtmadan önce derlemeniz gerekecek, bu nedenle [akıllı sözleşmeleri derleme](/developers/docs/smart-contracts/compiling/) hakkında okuduğunuzdan emin olun.

## Bir akıllı sözleşme nasıl dağıtılır {#how-to-deploy-a-smart-contract}

### İhtiyacınız olacaklar {#what-youll-need}

- Sözleşmenizin baytkodu – bu, [derleme](/developers/docs/smart-contracts/compiling/) yoluyla oluşturulur
- Gaz için ETH – gaz limitinizi diğer işlemler gibi ayarlayacaksınız, bu nedenle sözleşme dağıtımının basit bir ETH transferinden çok daha fazla gaza ihtiyaç duyduğunun farkında olun
- bir dağıtım betiği veya eklentisi
- kendi düğümünüzü çalıştırarak, halka açık bir düğüme bağlanarak veya bir [düğüm hizmeti](/developers/docs/nodes-and-clients/nodes-as-a-service/) kullanarak bir API anahtarı aracılığıyla bir [Ethereum düğümüne](/developers/docs/nodes-and-clients/) erişim

### Bir akıllı sözleşmeyi dağıtma adımları {#steps-to-deploy}

İlgili belirli adımlar, söz konusu geliştirme çerçevesine bağlı olacaktır. Örneğin, [Hardhat'in sözleşmelerinizi dağıtma hakkındaki belgelerine](https://hardhat.org/docs/tutorial/deploying) veya [Foundry'nin bir akıllı sözleşmeyi dağıtma ve doğrulama hakkındaki belgelerine](https://book.getfoundry.sh/forge/deploying) göz atabilirsiniz. Dağıtıldıktan sonra, sözleşmeniz diğer [hesaplar](/developers/docs/accounts/) gibi bir Ethereum adresine sahip olacak ve [kaynak kodu doğrulaması araçları](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) kullanılarak doğrulanabilecektir.

## İlgili araçlar {#related-tools}

**Remix - _Remix IDE, Ethereum benzeri blokzincirler için akıllı sözleşmeler geliştirmeye, dağıtmaya ve yönetmeye olanak tanır_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Akıllı sözleşmeleri geliştirmek, test etmek, izlemek ve işletmek için hata ayıklama, gözlemlenebilirlik ve altyapı yapı taşları sağlayan Web3 geliştirme platformu_**

- [tenderly.co](https://tenderly.co/)
- [Belgeler](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Ethereum yazılımınızı derlemek, dağıtmak, test etmek ve hata ayıklamak için bir geliştirme ortamı_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Sözleşmelerinizi dağıtma hakkındaki belgeler](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Tek bir komut kullanarak herhangi bir sözleşmeyi EVM uyumlu herhangi bir zincire kolayca dağıtın_**

- [Belgeler](https://portal.thirdweb.com/deploy/)

**Crossmint - _Akıllı sözleşmeleri dağıtmak, kredi kartı ve zincirler arası ödemeleri etkinleştirmek ve NFT'ler oluşturmak, dağıtmak, satmak, depolamak ve düzenlemek için API'leri kullanmak üzere kurumsal düzeyde Web3 geliştirme platformu._**

- [crossmint.com](https://www.crossmint.com)
- [Belgeler](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## İlgili eğitimler {#related-tutorials}

- [İlk akıllı sözleşmenizi dağıtmak](/developers/tutorials/deploying-your-first-smart-contract/) _– Bir Ethereum test ağında ilk akıllı sözleşmenizi dağıtmaya giriş._
- [Merhaba Dünya | akıllı sözleşme eğitimi](/developers/tutorials/hello-world-smart-contract/) _– Ethereum üzerinde temel bir akıllı sözleşme oluşturmak ve dağıtmak için takip etmesi kolay bir eğitim._
- [Solidity'den diğer sözleşmelerle etkileşim kurun](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Mevcut bir sözleşmeden bir akıllı sözleşme nasıl dağıtılır ve onunla nasıl etkileşim kurulur._
- [Sözleşme boyutunuzu nasıl küçültürsünüz](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Sözleşmenizin boyutunu sınırın altında tutmak ve gazdan tasarruf etmek için nasıl azaltırsınız_

## Daha fazla bilgi {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat ile sözleşmelerinizi dağıtmak](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [Geliştirme çerçeveleri](/developers/docs/frameworks/)
- [Bir Ethereum düğümü çalıştırın](/developers/docs/nodes-and-clients/run-a-node/)
- [Hizmet olarak düğümler](/developers/docs/nodes-and-clients/nodes-as-a-service)