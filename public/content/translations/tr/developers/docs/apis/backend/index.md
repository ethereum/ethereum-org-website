---
title: "Arka uç API'si kütüphaneleri"
description: "Uygulamanızdan blok zinciri ile etkileşime girmenizi sağlayan Ethereum istemci API'lerine giriş."
lang: tr
---

Bir yazılım uygulamasının Ethereum blok zinciri ile etkileşime girmesi (yani blok zinciri verilerini okuması ve/veya ağa işlem göndermesi) için bir Ethereum düğümüne bağlanması gerekir.

Bu amaç doğrultusunda her Ethereum istemcisi [JSON-RPC](/developers/docs/apis/json-rpc/) spesifikasyonunu uygular, böylece uygulamaların güvenebileceği tek tip bir [yöntemler](/developers/docs/apis/json-rpc/#json-rpc-methods) kümesi mevcut olur.

Bir Ethereum düğümüne bağlanmak için belirli bir programlama dili kullanmak istiyorsanız, ekosistem içinde bunu çok daha kolay hâle getiren birkaç kolaylık kütüphanesi vardır. Bu kütüphanelerle geliştiriciler, Ethereum ile etkileşime giren JSON RPC taleplerini (arka planda) başlatmak için sezgisel ve tek satırlı yöntemler yazabilirler.

## Ön Koşullar {#prerequisites}

[Ethereum yığınını](/developers/docs/ethereum-stack/) ve [Ethereum istemcilerini](/developers/docs/nodes-and-clients/) anlamak faydalı olabilir.

## Neden bir kütüphane kullanılır? {#why-use-a-library}

Bu kütüphaneler, bir Ethereum düğümü ile doğrudan etkileşim kurmanın karmaşıklığının çoğunu ortadan kaldırır. Ayrıca, bir geliştirici olarak Ethereum istemcilerinin karmaşıklıkları ile daha az zaman harcayarak ve uygulamanızın benzersiz işlevselliğine daha fazla zaman ayırabilmeniz için yardımcı işlevler (örneğin, ETH'yi Gwei'ye dönüştürmek) sağlarlar.

## Mevcut kütüphaneler {#available-libraries}

### Altyapı ve düğüm hizmetleri {#infrastructure-and-node-services}

**Alchemy -** **_Ethereum Geliştirme Platformu._**

- [alchemy.com](https://www.alchemy.com/)
- [Dökümanlar](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Hizmet Olarak Düğüm._**

- [All That Node.com](https://www.allthatnode.com/)
- [Dökümanlar](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_Ethereum Ana Ağı ve Test Ağları için Merkeziyetsiz API'lar._**

- [blastapi.io](https://blastapi.io/)
- [Dökümanlar](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Daha verimli ve hızlı RPC hizmetleri_**

- [blockpi.io](https://blockpi.io/)
- [Dökümanlar](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Ağ Geçidi.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Blok Kâşifi ve İşlem API'leri**

- [Dökümanlar](https://docs.etherscan.io/)

**Blockscout - Açık Kaynaklı Blok Arayıcısı**

- [Dökümanlar](https://docs.blockscout.com/)

**GetBlock -** **_Web3 geliştirmesi için Hizmet Olarak Blok Zinciri_**

- [GetBlock.io](https://getblock.io/)
- [Dökümanlar](https://docs.getblock.io/)

**Infura -** **_Hizmet olarak Ethereum API'ı._**

- [infura.io](https://infura.io)
- [Dökümanlar](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Uygun maliyetli EVM JSON-RPC sağlayıcısı_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Dökümanlar](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Tam Düğümler ve Blok Arayıcıları._**

- [NOWNodes.io](https://nownodes.io/)
- [Dökümanlar](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Hizmet Olarak Blok Zinciri Altyapısı._**

- [quicknode.com](https://quicknode.com)
- [Dökümanlar](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_Açık kaynaklı yazılımla desteklenen, hizmet olarak Ethereum ve Ethereum Classic API'ları._**

- [rivet.cloud](https://rivet.cloud)
- [Dökümanlar](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSockets API'ı olarak hız odaklı Ethereum düğümleri._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Dökümanlar](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Geliştirme araçları {#development-tools}

**ethers-kt -** **_EVM tabanlı blokzincirler için eşzamansız, yüksek performanslı Kotlin/Java/Android kütüphanesi._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Örnekler](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Blok zinciri için açık kaynaklı bir .NET entegrasyon kütüphanesi._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Dökümanlar](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Araçları -** **_Python aracılığıyla Ethereum etkileşimi için çeşitli kütüphaneler._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Sohbet](https://gitter.im/ethereum/web3.py)

**Tatum -** **_Üst düzey blok zinciri geliştirme platformu._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Dökümanlar](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Ethereum için bir Java/Android/Kotlin/Scala entegrasyon kütüphanesi._**

- [GitHub](https://github.com/web3j/web3j)
- [Dökümanlar](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Blok zinciri hizmetleri {#blockchain-services}

**BlockCypher -** **_Ethereum Web API'leri._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dökümanlar](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Ethereum için hepsi bir arada web3 veri altyapısı._**

- [chainbase.com](https://chainbase.com/)
- [Dökümanlar](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Hizmet olarak esnek ve özel Ethereum düğümleri._**

- [chainstack.com](https://chainstack.com)
- [Dökümanlar](https://docs.chainstack.com/)
- [Ethereum API referansı](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_Blok Zinciri Altyapı API'ı._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Dökümanlar](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_Ethereum Ana Ağı ve test ağları ile Web3 API hizmetleri._**

- [DataHub](https://www.figment.io/)
- [Dökümanlar](https://docs.figment.io/)

**Moralis -** **_Kurumsal Düzeyde EVM API Sağlayıcısı._**

- [moralis.io](https://moralis.io)
- [Dökümanlar](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_Ethereum Veri ve Basım API'leri._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Dökümanlar](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_Genel Çoklu Kripto Blok Zinciri API Platformu._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Dökümanlar](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Ethereum blok zincirine basit ve güvenilir API erişimi sağlar._**

- [Watchdata](https://watchdata.io/)
- [Dökümanlar](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_200'den fazla Zincir için Zenginleştirilmiş blok zinciri API'leri._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Dökümanlar](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## Daha fazla kaynak {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## Alakalı başlıklar {#related-topics}

- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
- [Geliştirme çerçeveleri](/developers/docs/frameworks/)

## İlgili öğreticiler {#related-tutorials}

- [JavaScript'te Ethereum blok zincirini kullanmak için Web3js'yi Kurma](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Projenizde web3.js kurulumuna yönelik talimatlar._
- [JavaScript'ten Akıllı Sözleşme Çağırma](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI jetonunu kullanarak JavaScript ile sözleşme fonksiyonlarının nasıl çağrılacağını görün._
