---
title: Java geliştiricileri için Ethereum
description: Java tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin
lang: tr
incomplete: true
---

<FeaturedText>Java tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin</FeaturedText>

Ethereum'u, kripto para birimi ve blok zinciri teknolojisinin faydalarını kullanan merkeziyetsiz uygulamalar (veya "dapp'ler") oluşturmak için kullanın. Bu dapp'ler güvenilir olabilir, yani Ethereum'a dağıtıldıktan sonra her zaman programlandığı gibi çalışırlar. Yeni tür finansal uygulamalar oluşturmak için dijital varlıkları kontrol edebilirler. Merkeziyetsiz olabilirler, yani hiç bir kurum veya kişi onları kontrol edemez ve sansürlenmeleri neredeyse imkansızdır.

## Akıllı sözleşmeler ve Solidity dilini öğrenmeye başlangıç {#getting-started-with-smart-contracts-and-solidity}

**Java ve Ethereum'u entegre etmek için ilk adımlarınızı atın**

Başlamadan önce temel bilgilere mi ihtiyacınız var? [ethereum.org/learn](/learn/) veya [ethereum.org/developers](/developers/) adreslerine göz atın.

- [Blok Zinciri Açıklaması](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Akıllı Sözleşmeleri Anlamak](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [İlk Akıllı Sözleşmenizi Yazın](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity'yi Nasıl Derleyeceğinizi ve Dağıtacağınızı Öğrenin](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Ethereum müşterileri ile çalışma {#working-with-ethereum-clients}

İki öncü Java Ethereum istemcisi olan [Web3J](https://github.com/web3j/web3j) ve Hyperledger Besu'nun kullanımını öğrenin

- [Java, Eclipse ve Web3J ile bir Ethereum istemcisine bağlanmak](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [Bir Ethereum hesabını Java ve Web3j ile yönetin](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [Akıllı Sözleşmenizden bir Java Paketleyicisi oluşturun](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [Bir Ethereum Akıllı Sözleşmesiyle etkileşime girmek](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [Ethereum Akıllı Sözleşmesi Olaylarını Dinlemek](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Java Ethereum İstemcisi olan Besu'yu (Pantheon) Linux'la kullanmak](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Java Entegrasyon Testlerinde Hyperledger Besu (Pantheon) Düğümü Çalıştırma](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j Kopya Kağıdı](https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c)

EVM tabanlı blokzincirlerle etkileşim için asenkron, yüksek performanslı bir Kotlin kütüphanesi olan [ethers-kt](https://github.com/Kr1ptal/ethers-kt)'yi nasıl kullanacağınızı öğrenin. JVM ve Android platformlarını hedefler.
- [ERC20 jetonlarını transfer etme](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [Olay dinleme ile UniswapV2 takası](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH/ERC20 bakiye izleyicisi](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## Orta seviye makaleler {#intermediate-articles}

- [IPFS ile bir Java uygulamasında depolama yönetimi](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [ERC20 token'larını Java'da Web3j ile yönetin](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3j İşlem Yöneticileri](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## İleri Düzey Kullanım Şekilleri {#advanced-use-patterns}

- [Java akıllı sözleşmesi veri önbelleği oluşturmak için Eventeum'u kullanma](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Java projeleri ve araçları {#java-projects-and-tools}

- [Hyperledger Besu (Panteon) (Ethereum İstemcisi)](https://docs.pantheon.pegasys.tech/en/stable/)
- [Web3J (Ethereum İstemcileriyle Etkileşim Kütüphanesi)](https://github.com/web3j/web3j)
- [ethers-kt (Async, EVM tabanlı blokzincirler için yüksek performanslı Kotlin/Java/Android kütüphanesi.)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (Olay Dinleyici)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS Geliştirici Araçları)](https://github.com/ConsenSys/mahuta)

Daha fazla kaynak mı arıyorsunuz? Göz atın: [ethereum.org/developers](/developers/).

## Java topluluğuna katkıda bulunanlar {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)
- [Besu HL sohbeti](https://chat.hyperledger.org/channel/besu)
