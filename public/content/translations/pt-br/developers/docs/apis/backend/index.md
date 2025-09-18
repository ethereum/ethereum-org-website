---
title: Bibliotecas de API no Backend
description: Uma introdução as API's do Ethereum que permitem interações de seu App com a Blockchain.
lang: pt-br
---

Para um aplicativo de software interagir com a blockchain Ethereum (ou seja, leia os dados da blockchain e/ou envie transações para a rede), ele deve se conectar a um nó do Ethereum.

Para este propósito, todos os clientes do Ethereum implementam a especificação [JSON-RPC](/developers/docs/apis/json-rpc/), para que haja um conjunto uniforme de [métodos](/developers/docs/apis/json-rpc/#json-rpc-methods) nos quais os aplicativos podem confiar.

Se você quiser usar uma linguagem de programação específica para se conectar com um nó Ethereum, existem várias bibliotecas de conveniência dentro do ecossistema que tornam isso muito mais fácil. Com essas bibliotecas, os desenvolvedores podem escrever intuitivamente métodos on-line para iniciar requisições JSON RPC (por debaixo dos panos) que interajam com a Ethereum.

## Pré-requisitos {#prerequisites}

Pode ser útil para entender a [stack da Ethereum](/developers/docs/ethereum-stack/) e [clientes Ethereum](/developers/docs/nodes-and-clients/).

## Por que usar uma biblioteca? {#why-use-a-library}

Essas bibliotecas abstraem muito da complexidade de interagir diretamente com um nó Ethereum. Eles também fornecem funções de utilidade (por exemplo, Convertendo ETH para Gwei) para que como desenvolvedor você possa passar menos tempo lidando com as complexidades de clientes da Ethereum e mais tempo focado na funcionalidade única do seu aplicativo.

## Bibliotecas disponíveis {#available-libraries}

### Serviços de nós e infraestrutura {#infrastructure-and-node-services}

**Alchemy -** **_Plataforma de Desenvolvimento Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentação](https://docs.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node - ** **_Nós-como-um-serviço._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentação](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast, da Bware Labs -****_ APIs descentralizadas para a Ethereum Mainnet ant Testnets._**

- [blastapi.io](https://blastapi.io/)
- [Documentação](https://docs.blastapi.io)
- [Discord](https://discord.gg/bwarelabs)

**BlockPi -** **_Fornece serviços RPC mais eficientes e mais rápidos_**

- [blockpi.io](https://blockpi.io/)
- [Documentação](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Gateway Cloudflare de Ethereum.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Explorador de blocos e APIs de transações**
- [Documentação](https://docs.etherscan.io/)

**GetBlock-** **_Blockchain-as-a-service para desenvolvimento Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentação](https://getblock.io/docs/)

**Infura -** **_A API da Ethereum como serviço._**

- [infura.io](https://infura.io)
- [Documentação](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Provedor de EVM JSON-RPC econômico_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentação](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Nós Completos e Exploradores de Blocos._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentação](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**QuickNode -** **_Infraestrutura Blockchain como Serviço._**

- [quicknode.com](https://quicknode.com)
- [Documentação](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_Ethereum e Ethereum Classic APIs como serviço, desenvolvido por software de código aberto._**

- [rivet.cloud](https://rivet.cloud)
- [Documentação](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nós Ethereum orientados a velocidade como JSON-RPC/WebSockets API._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentação](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Ferramentas de desenvolvimento {#development-tools}

**ethers-kt -** **_Biblioteca assíncrona de alto desempenho em Kotlin/Java/Android para blockchains baseadas em EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Exemplos](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Uma biblioteca de integração .NET de código aberto para blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentação](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Variedade de bibliotecas para interação com a Ethereum via Python._**

- [py.ethereum.org](https://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**QuikNode -** **_A plataforma definitiva de desenvolvimento de blockchains_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentação](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Uma biblioteca de integração para Ethereum em Java/Android/Kotlin/Scala._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentação](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Serviços blockchain {#blockchain-services}

**BlockCypher -** **_APIs Web Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentação](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Infraestrutura de dados web3 tudo-em-um para Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Documentação](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Nós Ethereum compartilhados e dedicados como serviço._**

- [chainstack.com](https://chainstack.com)
- [Documentação](https://docs.chainbase.com/docs)
- [Referência da API Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Nó da Nuvem da Coinbase -** **_API de infraestrutura Blockchain._**

- [Nó da Nuvem da Coinbase](https://www.coinbase.com/cloud)
- [Documentação](https://docs.cloud.coinbase.com/)

**DataHub por Figment -** **_Serviços de API Web3 API com rede principal Ethereum e rede de testes._**

- [DataHub](https://www.figment.io/)
- [Documentação](https://docs.figment.io/)

**Moralis -** **_Provedor de API para EVM para uso corporativo._**

- [moralis.io](https://moralis.io)
- [Documentação](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Fórum](https://forum.moralis.io/)

**NFTPort -** **_Dados Ethereum e APIs Mint._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentação](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_A plataforma geral de APIs blockchain multi-cripto._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentação](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Fornecer acesso API simples e confiável à blockchain Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentação](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_APIs de blockchain enriquecidas para mais de 200 redes._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentação](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que te ajudou? Edite essa página e adicione!_

## Tópicos relacionados {#related-topics}

- [Nós e clientes](/developers/docs/nodes-and-clients/)
- [Estruturas de desenvolvimento](/developers/docs/frameworks/)

## Tutoriais relacionados {#related-tutorials}

- [Configure Web3js para usar a blockchain Ethereum em Javascript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _ – Instruções para configurar web3.js no seu projeto._
- [Chamando um contrato inteligente do JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _ – Usando o token do DAI, veja como os contratos de chamadas funcionam usando JavaScript._
