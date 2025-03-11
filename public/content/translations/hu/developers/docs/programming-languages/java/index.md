---
title: Ethereum Java-fejlesztők számára
description: Tanuljon meg Ethereumon fejleszteni Java alapú projektek és eszközök használatával
lang: hu
incomplete: true
---

<FeaturedText>Tanuljon meg Ethereumon fejleszteni Java alapú projektek és eszközök használatával</FeaturedText>

Használjon Ethereumot decentralizált alkalmazások (dappok) fejlesztésére, melyek kihasználják a kriptovaluta és a blokklánc technológia nyújtotta előnyöket. Ezek a dappok megbízhatóak, ami azt jelenti, hogyha egyszer telepítették az Ethereumba, akkor mindig úgy fognak futni, ahogy programozták őket. Digitális vagyontárgyakat irányíthatnak, lehetőséget teremtve ezzel újfajta pénzügyi alkalmazások létrejöveteléhez. Decentralizáltak lehetnek, mely azt jelenti, hogy semmilyen entitás vagy személy nem irányítja őket és közel lehetetlen őket cenzúrázni.

## Kezdő lépések az okosszerződésekkel és a Solidity nyelvvel {#getting-started-with-smart-contracts-and-solidity}

**Tegye meg az első lépést, hogy a Java-t integrálja az Ethereummal**

Szüksége van egy kezdőknek szóló bevezetőre? Tekintse meg az [ethereum.org/learn](/learn/) vagy az [ethereum.org/developers](/developers/) oldalt.

- [Blokklánc ismertetése](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Okosszerződések értelmezése](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Írja meg az első okosszerződését](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tanulja meg a Solidity fordítását és telepítését](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Az Ethereum-kliensek használata {#working-with-ethereum-clients}

Tanulja meg a [Web3J](https://github.com/web3j/web3j) és a Hyperledger Besu, a két vezető Java Ethereum kliens használatát

- [Csatlakozás Ethereum klienshez Java-val, Eclipse-szel és Web3J-vel](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [Egy Ethereum számla kezelése Java-val és Web3J-vel](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [Generáljon egy Java Wrappert az okosszerződéséből](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [Kapcsolódás egy Ethereum okosszerződéshez](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [Ethereum okosszerződés események hallgatása](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Besu (Pantheon), a Java Ethereum kliens használata Linux-szal](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Egy Hyperledger Besu (Pantheon) csomópont futtatása Java integrációs teszteken](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j Puska](https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c)

Ismerje meg az [ethers-kt](https://github.com/Kr1ptal/ethers-kt) használatát, ami egy aszinkron, nagy teljesítményű Kotlin könyvtár az EVM-alapú blokkláncokkal való interakcióhoz. JVM és Android platformokat céloz meg.
- [ERC-20 tokenek transzferje](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [UniswapV2 átváltás eseményfigyeléssel](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH / ERC-20 egyenlegkövetés](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## Köztes cikkek {#intermediate-articles}

- [Tárhelykezelés Java alkalmazásokban IPFS-szel](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [ERC20 tokenek kezelése Java-ban Web3j-vel](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3j tranzakciókezelők](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## Speciális használati minták {#advanced-use-patterns}

- [Ethereum használata Java okosszerződés adat cache építésére](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Java-projektek és -eszközök {#java-projects-and-tools}

- [Hyperledger Besu (Pantheon) (Ethereum kliens)](https://docs.pantheon.pegasys.tech/en/stable/)
- [Web3J (könyvtár az Ethereum kliensekkel való interakcióhoz)](https://github.com/web3j/web3j)
- [ethers-kt (aszinkron, nagy teljesítményű Kotlin/Java/Android könyvtár EVM-alapú blokkláncokhoz)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (Event Listener)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS Fejlesztői Eszközök)](https://github.com/ConsenSys/mahuta)

Több anyagra lenne szüksége? Tekintsd meg az [ethereum.org/developers](/developers/) oldalt

## Java közösségi hozzájárulók {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)
- [Besu HL chat](https://chat.hyperledger.org/channel/besu)
