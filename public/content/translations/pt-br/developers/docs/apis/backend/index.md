---
title: Bibliotecas de API no Backend
description: "Uma introdução as API's do Ethereum que permitem interações de seu App com a Blockchain."
lang: pt-br
---

Para que um aplicativo de software interaja com a blockchain Ethereum (ou seja, para ler dados da blockchain e/ou enviar transações para a rede), ele deve se conectar a um nó Ethereum.

Para este propósito, cada cliente Ethereum implementa a especificação [JSON-RPC](/developers/docs/apis/json-rpc/), então há um conjunto uniforme de [métodos](/developers/docs/apis/json-rpc/#json-rpc-methods) nos quais os aplicativos podem confiar.

Se você quiser usar uma linguagem de programação específica para se conectar com um nó Ethereum, existem várias bibliotecas de conveniência dentro do ecossistema que tornam isso muito mais fácil. Com essas bibliotecas, os desenvolvedores podem escrever intuitivamente métodos on-line para iniciar requisições JSON RPC (por debaixo dos panos) que interajam com a Ethereum.

## Pré-requisitos {#prerequisites}

Pode ser útil entender a [pilha Ethereum](/developers/docs/ethereum-stack/) e os [clientes Ethereum](/developers/docs/nodes-and-clients/).

## Por que usar uma biblioteca? {#why-use-a-library}

Essas bibliotecas abstraem muito da complexidade de interagir diretamente com um nó Ethereum. Elas também fornecem funções utilitárias (p. ex., converter ETH para Gwei), de modo que, como desenvolvedor, você pode gastar menos tempo lidando com as complexidades dos clientes Ethereum e mais tempo focado na funcionalidade exclusiva do seu aplicativo.

## Bibliotecas disponíveis {#available-libraries}

### Infraestrutura e serviços de nó {#infrastructure-and-node-services}

**Alchemy -** **_Plataforma de Desenvolvimento Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentação](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Nó como serviço._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentação](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast da Bware Labs -** **_APIs descentralizadas para a Mainnet e Testnets da Ethereum._**

- [blastapi.io](https://blastapi.io/)
- [Documentação](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Fornece serviços RPC mais eficientes e rápidos._**

- [blockpi.io](https://blockpi.io/)
- [Documentação](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Explorador de blocos e APIs de transações**

- [Documentação](https://docs.etherscan.io/)

**Blockscout - Explorador de Blocos de Código Aberto**

- [Documentação](https://docs.blockscout.com/)

**GetBlock-** **_Blockchain como serviço para desenvolvimento Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentação](https://docs.getblock.io/)

**Infura -** **_A API da Ethereum como serviço._**

- [infura.io](https://infura.io)
- [Documentação](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Provedor de EVM JSON-RPC econômico_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentação](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Nós Completos e Exploradores de Blocos._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentação](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Infraestrutura de blockchain como serviço._**

- [quicknode.com](https://quicknode.com)
- [Documentação](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_APIs do Ethereum e Ethereum Classic como serviço, desenvolvidas com software de código aberto._**

- [rivet.cloud](https://rivet.cloud)
- [Documentação](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nós Ethereum orientados à velocidade como API JSON-RPC/WebSockets._**

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

**Ferramentas Python -** **_Variedade de bibliotecas para interação com o Ethereum via Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [GitHub do web3.py](https://github.com/ethereum/web3.py)
- [Bate-papo do web3.py](https://gitter.im/ethereum/web3.py)

**Tatum -** **_A plataforma definitiva de desenvolvimento de blockchain._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentação](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Uma biblioteca de integração para Ethereum em Java/Android/Kotlin/Scala._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentação](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Serviços de blockchain {#blockchain-services}

**BlockCypher -** **_APIs web do Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentação](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Infraestrutura de dados Web3 tudo-em-um para o Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Documentação](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Nós Ethereum elásticos e dedicados como serviço._**

- [chainstack.com](https://chainstack.com)
- [Documentação](https://docs.chainstack.com/)
- [Referência da API do Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_API de infraestrutura de blockchain._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Documentação](https://docs.cdp.coinbase.com/)

**DataHub da Figment -** **_Serviços de API Web3 com a Mainnet e as testnets do Ethereum._**

- [DataHub](https://www.figment.io/)
- [Documentação](https://docs.figment.io/)

**Moralis -** **_Provedor de API EVM de nível empresarial._**

- [moralis.io](https://moralis.io)
- [Documentação](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Fórum](https://forum.moralis.io/)

**NFTPort -** **_Dados do Ethereum e APIs de cunhagem._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentação](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_A plataforma geral de APIs de blockchain para múltiplas criptos._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentação](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Fornece acesso simples e confiável via API à blockchain do Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentação](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_APIs de blockchain enriquecidas para mais de 200 redes._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentação](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite essa página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Nós e clientes](/developers/docs/nodes-and-clients/)
- [Frameworks de desenvolvimento](/developers/docs/frameworks/)

## Tutoriais relacionados {#related-tutorials}

- [Configurar o Web3js para usar a blockchain Ethereum em JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instruções para configurar o web3.js em seu projeto._
- [Chamando um contrato inteligente a partir do JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando o token DAI, veja como chamar funções de contratos usando JavaScript._
