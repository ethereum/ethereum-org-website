---
title: Arka uç API'si kütüphaneleri
description: Uygulamanızdan blok zinciri ile etkileşime girmenizi sağlayan Ethereum istemci API'lerine giriş.
lang: tr
---

Bir yazılım uygulamasının Ethereum blok zinciri ile etkileşime girmesi (yani blok zinciri verilerini okuması ve/veya ağa işlem göndermesi) için bir Ethereum düğümüne bağlanması gerekir.

Bu amaçla, her Ethereum istemcisi [JSON-RPC](/developers/docs/apis/json-rpc/) şartnamesini uygular, bu nedenle uygulamaların güvenebileceği tek tip bir [uç noktaları](/developers/docs/apis/json-rpc/#json-rpc-methods) vardır.

Bir Ethereum düğümüne bağlanmak için belirli bir programlama dili kullanmak istiyorsanız, ekosistem içinde bunu çok daha kolay hâle getiren birkaç kolaylık kütüphanesi vardır. Bu kütüphanelerle geliştiriciler, Ethereum ile etkileşime giren JSON RPC taleplerini (arka planda) başlatmak için sezgisel ve tek satırlı yöntemler yazabilirler.

## Ön koşullar {#prerequisites}

[Ethereum yığınını](/developers/docs/ethereum-stack/) ve [Ethereum istemcilerini](/developers/docs/nodes-and-clients/) anlamak yardımcı olabilir.

## Neden bir kütüphane kullanılır? {#why-use-a-library}

Bu kütüphaneler, bir Ethereum düğümü ile doğrudan etkileşim kurmanın karmaşıklığının çoğunu ortadan kaldırır. Ayrıca, bir geliştirici olarak Ethereum istemcilerinin karmaşıklıkları ile daha az zaman harcayarak ve uygulamanızın benzersiz işlevselliğine daha fazla zaman ayırabilmeniz için yardımcı işlevler (örneğin, ETH'yi Gwei'ye dönüştürmek) sağlarlar.

## Mevcut kütüphaneler {#available-libraries}

**Alchemy -** **_Ethereum Geliştirme Platformu._**

- [alchemy.com](https://www.alchemy.com/)
- [Belgeler](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**BlockCypher -** **_Ethereum Web API'leri._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Belgeler](https://www.blockcypher.com/dev/ethereum/)

**Infura -** **_Hizmet olarak Ethereum API._**

- [infura.io](https://infura.io)
- [Belgeler](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare Ethereum Ağ Geçidi.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**DataHub by Figment -** **_Ethereum Mainnet ve test ağları ile Web3 API hizmetleri._**

- [DataHub](https://www.figment.io/datahub)
- [Belgeler](https://docs.figment.io/introduction/what-is-datahub)

**Nodesmith -** **_Ethereum Mainnet ve test ağlarına JSON-RPC API erişimi._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Belgeler](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_Hem ETH hem de ETC'yi destekleyen kendi Ethereum API hizmetinizi çalıştırın._**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_Hizmet olarak paylaşımlı ve özel Ethereum düğümleri._**

- [chainstack.com](https://chainstack.com)
- [Belgeler](https://docs.chainstack.com)

**QuickNode -** **_Bir Hizmet Olarak Blok Zinciri Altyapısı._**

- [quicknode.com](https://quicknode.com)
- [Belgeler](https://www.quicknode.com/docs)
- [Discord](https://discord.gg/NaR7TtpvJq)

**Python Tooling -** **_Python üzerinden Ethereum etkileşimi için çeşitli kütüphaneler._**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Sohbeti](https://gitter.im/ethereum/web3.py)

**web3j -** **_Ethereum için bir Java/Android/Kotlin/Scala entegrasyon kütüphanesi._**

- [GitHub](https://github.com/web3j/web3j)
- [Belgeler](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_Ethereum ve açık kaynaklı yazılım tarafından desteklenen bir hizmet olarak Ethereum Classic API'leri._**

- [rivet.cloud](https://rivet.cloud)
- [Belgeler](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum ** **_ Blok zinciri için açık kaynaklı bir .NET entegrasyon kütüphanesi._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Belgeler](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Tatum -** **_üstün blok zinciri geliştirme platformu._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Belgeler](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Watchdata -** **_Ethereum blok zincirine basit ve güvenilir API erişimi sağlayın._**

- [Watchdata](https://watchdata.io/)
- [Belgeler](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Zmok -** **_JSON-RPC/WebSocket API olarak hız odaklı Ethereum düğümleri._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Belgeler](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## İlgili konular {#related-topics}

- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
- [Geliştirme çerçeveleri](/developers/docs/frameworks/)

## İlgili öğreticiler {#related-tutorials}

- [JavaScript'te Ethereum blok zincirini kullanmak için Web3js'yi kurun](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Projenizde web3.js kurulumu için talimatlar._
- [JavaScript'ten akıllı sözleşme çağırma](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI token'ını kullanarak, JavaScript ile sözleşme fonksiyonunu nasıl çağıracağınızı görün._
