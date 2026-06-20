---
title: Bibliotecas de API de back-end
description: "Uma introdução às APIs de cliente Ethereum que permitem interagir com a blockchain a partir do seu aplicativo."
lang: pt-br
---

Para que um aplicativo de software interaja com a blockchain do [Ethereum](/) (ou seja, leia dados da blockchain e/ou envie transações para a rede), ele deve se conectar a um nó do Ethereum.

Para esse propósito, todo cliente Ethereum implementa a especificação [JSON-RPC](/developers/docs/apis/json-rpc/), de modo que haja um conjunto uniforme de [métodos](/developers/docs/apis/json-rpc/#json-rpc-methods) nos quais os aplicativos podem confiar.

Se você quiser usar uma linguagem de programação específica para se conectar a um nó do Ethereum, existem muitas bibliotecas de conveniência dentro do ecossistema que tornam isso muito mais fácil. Com essas bibliotecas, os desenvolvedores podem escrever métodos intuitivos de uma linha para inicializar solicitações JSON-RPC (internamente) que interagem com o Ethereum.

## Pré-requisitos {#prerequisites}

Pode ser útil entender a [pilha do Ethereum](/developers/docs/ethereum-stack/) e os [clientes Ethereum](/developers/docs/nodes-and-clients/).

## Por que usar uma biblioteca? {#why-use-a-library}

Essas bibliotecas abstraem grande parte da complexidade de interagir diretamente com um nó do Ethereum. Elas também fornecem funções utilitárias (por exemplo, converter ETH para gwei) para que, como desenvolvedor, você possa gastar menos tempo lidando com as complexidades dos clientes Ethereum e mais tempo focado na funcionalidade exclusiva do seu aplicativo.

## Bibliotecas disponíveis {#available-libraries}

### Infraestrutura e serviços de nó {#infrastructure-and-node-services}

**Alchemy -** **_Plataforma de desenvolvimento Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentação](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_Nó como serviço (Node-as-a-Service)._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentação](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_APIs descentralizadas para a Rede Principal do Ethereum e redes de teste._**

- [blastapi.io](https://blastapi.io/)
- [Documentação](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Fornece serviços RPC mais eficientes e rápidos_**

- [blockpi.io](https://blockpi.io/)
- [Documentação](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Explorador de blocos e APIs de transação**
- [Documentação](https://docs.etherscan.io/)

**Blockscout - Explorador de blocos de código aberto**
- [Documentação](https://docs.blockscout.com/)

**GetBlock-** **_Blockchain como serviço para desenvolvimento Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentação](https://docs.getblock.io/)

**Infura -** **_A API do Ethereum como serviço._**

- [infura.io](https://infura.io)
- [Documentação](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Provedor JSON-RPC EVM econômico_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentação](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Nós completos e exploradores de blocos._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentação](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Infraestrutura de blockchain como serviço._**

- [quicknode.com](https://quicknode.com)
- [Documentação](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_APIs do Ethereum e Ethereum Classic como serviço alimentado por software de código aberto._**

- [rivet.cloud](https://rivet.cloud)
- [Documentação](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nós do Ethereum orientados à velocidade como API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentação](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Ferramentas de desenvolvimento {#development-tools}

**ethers-kt -** **_Biblioteca Kotlin/Java/Android assíncrona e de alto desempenho para blockchains baseadas em EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Exemplos](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Uma biblioteca de integração .NET de código aberto para blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentação](https://docs.nethereum.com/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Ferramentas Python -** **_Variedade de bibliotecas para interação com o Ethereum via Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [Web3.py GitHub](https://github.com/ethereum/web3.py)
- [Web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_A plataforma definitiva de desenvolvimento de blockchain._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentação](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_Uma biblioteca de integração Java/Android/Kotlin/Scala para Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentação](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Serviços de blockchain {#blockchain-services}

**BlockCypher -** **_APIs Web do Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentação](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Infraestrutura de dados Web3 completa para Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Documentação](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Nós do Ethereum elásticos e dedicados como serviço._**

- [chainstack.com](https://chainstack.com)
- [Documentação](https://docs.chainstack.com/)
- [Referência da API do Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_API de infraestrutura de blockchain._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Documentação](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_Serviços de API Web3 com a Rede Principal do Ethereum e redes de teste._**

- [DataHub](https://www.figment.io/)
- [Documentação](https://docs.figment.io/)

**Moralis -** **_Provedor de API EVM de nível corporativo._**

- [moralis.io](https://moralis.io)
- [Documentação](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Fórum](https://forum.moralis.io/)

**NFTPort -** **_APIs de dados e cunhagem do Ethereum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentação](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_A plataforma geral de APIs de blockchain multicripto._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentação](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Fornece acesso simples e confiável à API da blockchain do Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentação](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_API de dados de blockchain enriquecidos em tempo real em dezenas de redes._**

- [codex.io](https://www.codex.io/)
- [Documentação](https://docs.codex.io)
- [Explorador](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_APIs de blockchain enriquecidas para mais de 200 redes._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentação](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Nós e clientes](/developers/docs/nodes-and-clients/)
- [Frameworks de desenvolvimento](/developers/docs/frameworks/)

## Tutoriais relacionados {#related-tutorials}

- [Configure o Web3.js para usar a blockchain do Ethereum em JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instruções para configurar o Web3.js no seu projeto._
- [Chamando um contrato inteligente a partir do JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando o token DAI, veja como chamar funções de contratos usando JavaScript._