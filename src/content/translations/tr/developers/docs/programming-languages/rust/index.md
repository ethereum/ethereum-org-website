---
title: Rust geliştiricileri için Ethereum
description: Ethereum için Rust temelli projeler ve araçlar kullanarak nasıl geliştireceğinizi öğrenin
lang: tr
incomplete: true
---

<div class="featured">Rust tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin</div>

Kripto Para ve Blok Zincirinin avantajlarını kullanarak Merkezsiz uygulamalar (veya "dApps") oluşturmak için Ethereum'u kullanın. Bu dapp'ler güvenilir olabilir, yani Ethereum'a dağıtıldıktan sonra her zaman programlandığı gibi çalışırlar. Yeni tür finansal uygulamalar oluşturmak için dijital varlıkları kontrol edebilirler. Merkezsiz olabilirler, yani hiç bir kurum veya kişi onları kontrol edemez ve sansürlenmeleri neredeyse imkansızdır.

## Akıllı Sözleşmeler ve Solidity Dilini Öğrenmeye Başlangıç {#getting-started-with-smart-contracts-and-solidity}

**Rust ve Ethereum'u entegre etmek için ilk adımlarınızı atın**

Başlamadan önce daha temel bir bilgiye mi ihtiyacınız var? [ethereum.org/learn](/learn/) veya [ethereum.org/developers](/developers/)'a göz atın.

- [Blockchain Açıklaması](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Akıllı Sözleşmeleri Anlamak](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [İlk Akıllı Sözleşmenizi Yazın](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity'i Nasıl Derleyeceğinizi ve Dağıtacağınızı Öğrenin](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Başlangıç ​​seviyesi makaleler {#beginner-articles}

- [Ethereum İstemcisi Seçimi](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [The Rust Ethereum Client](https://openethereum.github.io/) \* **OpenEthereum'un [kullanımdan kaldırıldığını](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ve artık bakıma tabi olmadığını unutmayın.** Dikkatli kullanın ve tercihen başka bir istemci uygulamasına geçin.
- [Rust Kullanarak Ethereum'a İşlem Göndermek](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Parity Ethereum İstemcisiyle Akıllı Sözleşmelere Giriş](https://wiki.parity.io/Smart-Contracts)
- [Oasis SDK geliştirme ortamınızı kurma](https://docs.oasis.dev/oasis-sdk/guide/getting-started)
- [Kovan için rust wasm ile sözleşme yazma hakkında adım adım öğretici](https://github.com/paritytech/pwasm-tutorial)

## Orta seviye makaleler {#intermediate-articles}

- [Rust-Web3 Belgeleri](https://tomusdrw.github.io/rust-web3/web3/index.html)
- [Rust-Web3 Çalışma Örnekleri](https://github.com/tomusdrw/rust-web3/blob/master/examples)

## İleri düzey kullanım Şşkilleri {#advanced-use-patterns}

- [Ethereum benzeri ağ ile etkileşim kurmak için pwasm_ethereum externs kütüphanesi](https://github.com/openethereum/pwasm-ethereum)
- [JavaScript ve Rust Kullanarak Merkezsiz Bir Sohbet Oluşturun](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js ve Rust kullanarak Merkezietsiz bir Yapılacaklar Listesi Uygulaması oluşturun](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)
- [Enigma'ya Başlarken - Rust Programlama Dilinde](https://blog.enigma.co/getting-started-with-discovery-the-rust-programming-language-4d1e0b06de15)
- [Gizli Sözleşmelere Giriş](https://blog.enigma.co/getting-started-with-enigma-an-intro-to-secret-contracts-cdba4fe501c2)
- [Oasis üzerinde Solidity Sözleşmeleri Dağıtma (Bileşik)](https://docs.oasis.dev/tutorials/deploy-solidity.html#deploy-using-truffle)

## Rust Projeleri ve Araçları {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _Ethereum benzeri ağ ile etkileşime girecek externs koleksiyonu._
- [Lighthouse](https://github.com/sigp/lighthouse) - _Hızlı Ethereum mutabakat katmanı istemcisi_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/)
- [oasis_std](https://docs.rs/oasis-std/0.2.7/oasis_std/) - _OASIS API referansı_
- [Solaris](https://github.com/paritytech/sol-rs)
- [SputnikVM](https://github.com/sorpaas/rust-evm) - _Rust Ethereum Sanal Makinesi Uygulaması_
- [rust-web3](https://github.com/tomusdrw/rust-web3) - _Web3.js kütüphanesinin Rust uygulaması_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Rust'ta Wavelet akıllı sözleşme_
- [Foundry](https://github.com/gakonst/foundry)- _Ethereum uygulama geliştirme için araç takımı_
- [Ethers_rs](https://github.com/gakonst/ethers-rs)- _Ethereum kütüphanesi ve cüzdan uygulaması_
- [evm_rs](https://github.com/rust-blockchain/evm)- _Rust'ta Ethereum sanal makinesi uygulaması_
- [SewUp](https://github.com/second-state/SewUp) - _Tıpkı ortak bir arka uçta geliştiriyormuş gibi Rust ile Ethereum webassembly sözleşmenizi oluşturmanıza yardımcı olacak bir kütüphane_

Daha fazla kaynak mı arıyorsunuz? Göz atın: [ethereum.org/developers](/developers/).

## Rust Topluluğuna Katkıda Bulunanlar {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
