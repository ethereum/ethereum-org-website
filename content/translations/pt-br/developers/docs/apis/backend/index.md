---
title: Bibliotecas de API no Backend
description: Uma introdução as API's do Ethereum que permitem interações de seu App com a Blockchain.
lang: pt-br
---

Para um aplicativo de software interagir com a blockchain Ethereum (ou seja, leia os dados da blockchain e/ou envie transações para a rede), ele deve se conectar a um nó do Ethereum.

Para isso, cada cliente Ethereum implementa a especificação [JSON-RPC](/developers/docs/apis/json-rpc/), portanto, há um conjunto uniforme de [métodos](/developers/docs/apis/json-rpc/#json-rpc-methods) com os quais as aplicações podem contar.

Se você quiser usar uma linguagem de programação específica para se conectar com um nó Ethereum, existem várias bibliotecas de conveniência dentro do ecossistema que tornam isso muito mais fácil. Com essas bibliotecas, os desenvolvedores podem escrever intuitivamente métodos on-line para iniciar requisições JSON RPC (por debaixo dos panos) que interajam com a Ethereum.

## Pré-requisitos {#prerequisites}

Pode ser útil para entender a [stack da Ethereum](/developers/docs/ethereum-stack/) e [clientes Ethereum](/developers/docs/nodes-and-clients/).

## Por que usar uma biblioteca? {#why-use-a-library}

Essas bibliotecas abstraem muito da complexidade de interagir diretamente com um nó Ethereum. Eles também fornecem funções de utilidade (por exemplo, Convertendo ETH para Gwei) para que como desenvolvedor você possa passar menos tempo lidando com as complexidades de clientes da Ethereum e mais tempo focado na funcionalidade única do seu aplicativo.

## Bibliotecas disponíveis {#available-libraries}

**Alchemy -** **_Plataforma de Desenvolvimento Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentação](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**BlockCypher -** **_APIs Web Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentação](https://www.blockcypher.com/dev/ethereum/)

**Blast, da Bware Labs -\*\***_ APIs descentralizadas para a Ethereum Mainnet ant Testnets._\*\*

- [blastapi.io](https://blastapi.io/)
- [Documentação](https://docs.blastapi.io)
- [Discord](https://discord.com/invite/VPkWESgtvV)

**Infura -** **_A API da Ethereum como serviço._**

- [infura.io](https://infura.io)
- [Documentação](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Gateway Cloudflare de Ethereum.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nó da Nuvem da Coinbase -** **_API de infraestrutura Blockchain._**

- [Nó da Nuvem da Coinbase](https://www.coinbase.com/cloud/products/node)
- [Documentação](https://docs.cloud.coinbase.com/node/reference/welcome-to-node)

**DataHub por Figment -** **_Serviços de API Web3 API com rede principal Ethereum e rede de testes._**

- [DataHub](https://www.figment.io/datahub)
- [Documentação](https://docs.figment.io/introduction/what-is-datahub)

**NFTPort -** **_Dados Ethereum e APIs Mint._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentação](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Nodesmith -** **_Acesso por API JSON-RPC a rede principal e rede de testes Ethereum._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Documentação](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_Execute o seu próprio serviço de API da Ethereum que suporta ETH e ETC._**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_Nós Ethereum compartilhados e dedicados como serviço._**

- [chainstack.com](https://chainstack.com)
- [Documentação](https://docs.chainstack.com)
- [Referência da API Ethereum](https://docs.chainstack.com/api/ethereum/ethereum-api-reference)

**QuickNode -** **_Infraestrutura Blockchain como Serviço._**

- [quicknode.com](https://quicknode.com)
- [Documentação](https://www.quicknode.com/docs)
- [Discord](https://discord.gg/NaR7TtpvJq)

**Python Tooling -** **_Variedade de bibliotecas para interação com a Ethereum via Python._**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**web3j -** **_Uma biblioteca de integração para Ethereum em Java/Android/Kotlin/Scala._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentação](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_Ethereum e Ethereum Classic APIs como serviço, desenvolvido por software de código aberto._**

- [rivet.cloud](https://rivet.cloud)
- [Documentação](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_Uma biblioteca de integração .NET de código aberto para blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentação](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**QuikNode -** **_A plataforma definitiva de desenvolvimento de blockchains_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentação](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Watchdata -** **_Fornecer acesso API simples e confiável à blockchain Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentação](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Zmok -** **_Nós Ethereum orientados a velocidade como JSON-RPC/WebSockets API._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentação](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

**NOWNodes - _Nós Completos e Exploradores de Blocos._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentação](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**Moralis -** **_Provedor de API para EVM para uso corporativo._**

- [moralis.io](http://moralis.io)
- [Documentação](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://discord.com/invite/KYswaxwEtg)
- [Fórum](https://forum.moralis.io/)

\*_GetBlock- Blockchain como serviço para desenvolvimento Web3_

- [GetBlock.io](https://getblock.io/)
- [Documentação](https://getblock.io/docs/)

## Leitura adicional {#further-reading}

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione!_

## Tópicos relacionados {#related-topics}

- [Nós e clientes](/developers/docs/nodes-and-clients/)
- [Estruturas de desenvolvimento](/developers/docs/frameworks/)

## Tutoriais relacionados {#related-tutorials}

- [Configure o Web3js para usar a blockchain Ethereum em JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instruções para configurar o web3.js em seu projeto._
- [Chamando um contrato inteligente do JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando o token do DAI, veja como os contratos de chamadas funcionam usando JavaScript._
