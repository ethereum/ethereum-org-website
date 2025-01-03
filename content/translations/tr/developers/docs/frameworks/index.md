---
title: Dapp Geliştirme Çerçeveleri
description: Çerçevelerin avantajlarını keşfedin ve uygun seçenekleri karşılaştırın.
lang: tr
---

## Çerçevelere giriş {#introduction-to-frameworks}

Tam teşekküllü bir dapp inşa etmek teknolojinin farklı parçalarını gerektirir. Yazılım çerçeveleri gereken özelliklerin çoğunu içerirler veya istediğiniz araçları seçmeniz için kolay eklenti sistemleri sağlarlar.

Çerçeveler, aşağıdakiler gibi birçok ezber bozan işlevsellikle gelirler:

- Yerel bir blok zinciri örneği başlatmak için özellikler.
- Akıllı sözleşmelerinizi derlemek ve test etmek için yardımcı programlar.
- Kullanıcı odaklı uygulamanızı aynı projede/depoda oluşturmak için istemci geliştirme eklentileri.
- Ethereum ağlarına bağlanmak ve yerel olarak çalışan bir örneğe veya Ethereum'un genel ağlarından birine sözleşmeleri dağıtmak için yapılandırma.
- Merkeziyetsiz uygulama dağıtımı - IPFS gibi depolama seçenekleri ile entegrasyonlar.

## Ön Koşullar {#prerequisites}

Çerçevelere girmeden önce, [dapp'ler](/developers/docs/dapps/) ve [Ethereum yığını](/developers/docs/ethereum-stack/) konularına girişimizi okumanızı öneririz.

## Mevcut çerçeveler {#available-frameworks}

**Foundry** - **_Foundry, Ethereum uygulamaları geliştirmeye yönelik son derece hızlı, taşınabilir ve modüler bir araç setidir_**

- [Foundry'yi yükleyin](https://book.getfoundry.sh/)
- [Foundry kitabı](https://book.getfoundry.sh/)
- [Telegram'da Foundry topluluğu sohbet grubu](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_Profesyoneller için Ethereum geliştirme platformu._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Pythoncular, Veri Bilimciler ve Güvenlik Uzmanları için akıllı sözleşme geliştirme aracı._**

- [Belgeler](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM üzerinde blokzincir uygulamaları geliştirmeye yönelik bir platformdur._**

- [Ana Sayfa](https://www.web3labs.com/web3j-sdk)
- [Dokümanlar](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVM tabanlı blokzincirler için eşzamansız, yüksek performanslı Kotlin/Java/Android kütüphanesi._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Örnekler](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_Tek bir komutla Ethereum destekli uygulamalar oluşturun. Seçebileceğiniz geniş bir kullanıcı arayüzü çerçevesi ve DeFi şablonu yelpazesi bulunur._**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [Şablonlar](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Web3 için Ethers.js + Hardhat + React bileşenleri ve kancaları: akıllı sözleşmeler tarafından desteklenen merkeziyetsiz uygulamalar inşa etmeye başlamanız için ihtiyaç duyduğunuz her şey._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Blok zincir geliştiricilerinin akıllı sözleşmeler oluşturmasını, test etmesini, hata ayıklamasını, izlemesini ve çalıştırmasını ve dapp UX'i geliştirmesini sağlayan Web3 geliştirme platformu._**

- [Web sitesi](https://tenderly.co/)
- [Dokümanlar](https://docs.tenderly.co/ethereum-development-practices)

**The Graph -** **_Blokzincir verilerini verimli şekilde sorgulamaya yarayan The Graph_**

- [Web sitesi](https://thegraph.com/)
- [Öğretici](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_Ethereum Geliştirme Platformu._**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_Ethereum Geliştirme Platformu._**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_Güçlü SDK'larımız ve CLI kullanarak akıllı sözleşmelerinizle etkileşimde bulunabilecek web3 uygulamaları oluşturun._**

- [Dokümanlar](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (Ethereum ve diğer) Geliştirme Platformu._**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_Tüm büyük EVM zincirleri (ve diğerleri) üzerinde NFT uygulamaları oluşturmanıza olanak tanıyan, kurumsal düzeyde Web3 geliştirme platformudur._**

- [Web sitesi](https://www.crossmint.com)
- [Dokümanlar](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_Python tabanlı geliştirme ortamı ve test çerçevesidir._**

- [Dokümanlar](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie şu anda yönetilmemektedir**

**OpenZeppelin SDK -** **_Akıllı Sözleşmeler İçin Temel Araç Kiti: Akıllı sözleşmeler geliştirmenize, derlemenize, yükseltmenize, dağıtmanıza ve bunlarla etkileşime geçmenize yardımcı olacak bir dizi araç._**

- [OpenZeppelin SDK](https://openzeppelin.com/sdk/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [Topluluk Forumu](https://forum.openzeppelin.com/c/support/17)
- **OpenZeppelin SDK'nin geliştirme aşaması sona erdi**

**Catapulta -** **_Çok zincirli akıllı sözleşme dağıtım aracı, blok arayıcılarda doğrulamaları otomatikleştirin, dağıtılan akıllı sözleşmeleri takip edin ve dağıtım raporlarını paylaşın, Foundry ve Hardhat projeleri için tak ve çalıştır özelliği._**

- [Web sitesi](https://catapulta.sh/)
- [Dokümanlar](https://catapulta.sh/docs)
- [Github](https://github.com/catapulta-sh)

**Covalent -** **_200+ Zincir için Zenginleştirilmiş Blokzincir API'leri._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Dokümanlar](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_Sözleşme testleri, bulanıklaştırma, dağıtım, güvenlik açığı taraması ve kodda gezinme için hepsi bir arada Python çerçevesi._**

- [Ana Sayfa](https://getwake.io/)
- [Dokümanlar](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code Uzantısı](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

## daha fazla okuma {#further-reading}

_Size yardımcı olan bir topluluk kaynağı biliyor musunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [Yerel bir geliştirme ortamı oluşturun](/developers/local-environment/)
