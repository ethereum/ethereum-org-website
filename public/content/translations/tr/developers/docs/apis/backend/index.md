---
title: Arka uç API'si kütüphaneleri
description: Uygulamanızdan blok zinciri ile etkileşime girmenizi sağlayan Ethereum istemci API'lerine giriş.
lang: tr
---

Bir yazılım uygulamasının Ethereum blok zinciri ile etkileşime girmesi (yani blok zinciri verilerini okuması ve/veya ağa işlem göndermesi) için bir Ethereum düğümüne bağlanması gerekir.

Bu amaç doğrultusunda her Ethereum istemcisi [JSON-RPC](/developers/docs/apis/json-rpc/) spesifikasyonunu uygular, böylece uygulamaların güvenebileceği tek tip bir [yöntem](/developers/docs/apis/json-rpc/#json-rpc-methods) kümesi mevcut olur.

Bir Ethereum düğümüne bağlanmak için belirli bir programlama dili kullanmak istiyorsanız, ekosistem içinde bunu çok daha kolay hâle getiren birkaç kolaylık kütüphanesi vardır. Bu kütüphanelerle geliştiriciler, Ethereum ile etkileşime giren JSON RPC taleplerini (arka planda) başlatmak için sezgisel ve tek satırlı yöntemler yazabilirler.

## Ön Koşullar {#prerequisites}

[Ethereum yığınını](/developers/docs/ethereum-stack/) ve [Ethereum istemcilerini](/developers/docs/nodes-and-clients/) anlamak yardımcı olabilir.

## Neden bir kütüphane kullanılır? {#why-use-a-library}

Bu kütüphaneler, bir Ethereum düğümü ile doğrudan etkileşim kurmanın karmaşıklığının çoğunu ortadan kaldırır. Ayrıca, bir geliştirici olarak Ethereum istemcilerinin karmaşıklıkları ile daha az zaman harcayarak ve uygulamanızın benzersiz işlevselliğine daha fazla zaman ayırabilmeniz için yardımcı işlevler (örneğin, ETH'yi Gwei'ye dönüştürmek) sağlarlar.

## Mevcut kütüphaneler {#available-libraries}

### Altyapı ve düğüm servisleri {#infrastructure-and-node-services}

**Alchemy -** **_Ethereum Geliştirme Platformu._**

- [alchemy.com](https://www.alchemy.com/)
- [Belgeler](https://docs.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**Düğüm ile İlgili Her Şey -** **_Hizmet olarak Düğüm._**

- [All That Node.com](https://www.allthatnode.com/)
- [Belgeler](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Bware Labs'den Blast -** **_Ethereum Ana Ağı ve Test Ağları için Merkeziyetsiz API'lar._**

- [blastapi.io](https://blastapi.io/)
- [Belgeler](https://docs.blastapi.io)
- [Discord](https://discord.gg/bwarelabs)

**BlockPi -** **_Daha verimli ve hızlı RPC servisleri sağlamak_**

- [blockpi.io](https://blockpi.io/)
- [Belgeler](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Ağ Geçidi.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Blok Kâşifi ve İşlem API'leri**
- [Belgeler](https://docs.etherscan.io/)

**GetBlock-** **_Web3 geliştirme için servis olarak blok zincir_**

- [GetBlock.io](https://getblock.io/)
- [Belgeler](https://getblock.io/docs/)

**Infura -** **_Hizmet olarak Ethereum API._**

- [infura.io](https://infura.io)
- [Dokümanlar](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Uygun maliyetli EVM JSON-RPC sağlayıcı_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Belgeler](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Tam Düğümler ve Blok Arayıcıları._**

- [NOWNodes.io](https://nownodes.io/)
- [Dokümanlar](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**QuickNode -** **_Bir Hizmet Olarak Blok Zincir Altyapısı._**

- [quicknode.com](https://quicknode.com)
- [Belgeler](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_Ethereum ve açık kaynaklı yazılım tarafından desteklenen bir hizmet olarak Ethereum Classic API'ları._**

- [rivet.cloud](https://rivet.cloud)
- [Belgeler](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSocket API olarak hız odaklı Ethereum düğümleri._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Belgeler](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Geliştirme araçları {#development-tools}

**ethers-kt -** **_EVM tabanlı blokzincirler için eşzamansız, yüksek performanslı Kotlin/Java/Android kütüphanesi._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Örnekler](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum ** **_ Blok zincir için açık kaynaklı bir .NET entegrasyon kütüphanesi._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Belgeler](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Python üzerinden Ethereum etkileşimi için çeşitli kütüphaneler._**

- [py.ethereum.org](https://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Sohbeti](https://gitter.im/ethereum/web3.py)

**Tatum -** **_üstün blok zincir geliştirme platformu._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Belgeler](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Ethereum için bir Java/Android/Kotlin/Scala entegrasyon kütüphanesi._**

- [GitHub](https://github.com/web3j/web3j)
- [Belgeler](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Blokzincir servisleri {#blockchain-services}

**BlockCypher -** **_Ethereum Web API'leri._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dokümanlar](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Ethereum için hepsi bir arada web3 veri altyapısı._**

- [chainbase.com](https://chainbase.com/)
- [Dokümanlar](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Esnek ve özel Ethereum düğüm servisleri._**

- [chainstack.com](https://chainstack.com)
- [Dokümanlar](https://docs.chainbase.com/docs)
- [Ethereum API referansı](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Bulut Düğümü -** **_Blok Zincir Altyapısı API'sı._**

- [Coinbase Bulut Düğümü](https://www.coinbase.com/cloud)
- [Dokümanlar](https://docs.cloud.coinbase.com/)

**DataHub by Figment -** **_Ethereum Ana Ağı ve test ağları ile Web3 API hizmetleri._**

- [DataHub](https://www.figment.io/)
- [Dokümanlar](https://docs.figment.io/)

**Moralis -** **_Kuruluş Seviyesi EVM API Sağlayıcısı._**

- [moralis.io](https://moralis.io)
- [Dokümanlar](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_Ethereum Verisi ve Basım API'ları._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Dokümanlar](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_Genel Multi Kripto Blok Zincir API'lar Platformu_**

- [services.tokenview.io](https://services.tokenview.io/)
- [Dokümanlar](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Ethereum blok zincirine basit ve güvenilir API erişimi sağlayın._**

- [Watchdata](https://watchdata.io/)
- [Dokümanlar](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_200+ Zincir için Zenginleştirilmiş Blokzincir API'leri._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Dokümanlar](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı biliyor musunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [ Düğümler ve İstemciler](/developers/docs/nodes-and-clients/)
- [Geliştirici çerçeveleri](/developers/docs/frameworks/)

## İlgili öğreticiler {#related-tutorials}

- [JavaScript'te Ethereum blok zincirini kullanmak için Web3js'yi kurun](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Projenizde web3.js kurulumu için talimatlar._
- [JavaScript'ten akıllı sözleşme çağırma](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI belirtecini kullanarak, JavaScript kullanan sözleşme işlevini nasıl çağıracağınızı görün._
