---
title: Implantando contratos inteligentes
description: "Aprenda como implantar contratos inteligentes nas redes Ethereum, incluindo pré-requisitos, ferramentas e etapas de implantação."
lang: pt-br
---

Você precisa implantar seu contrato inteligente para que ele esteja disponível para os usuários de uma rede Ethereum.

Para implantar um contrato inteligente, você simplesmente envia uma transação Ethereum contendo o código compilado do contrato inteligente sem especificar nenhum destinatário.

## Pré-requisitos {#prerequisites}

Você deve entender as [redes Ethereum](/developers/docs/networks/), as [transações](/developers/docs/transactions/) e a [anatomia dos contratos inteligentes](/developers/docs/smart-contracts/anatomy/) antes de implantar contratos inteligentes.

A implantação de um contrato também custa ether (ETH), pois eles são armazenados na blockchain, portanto, você deve estar familiarizado com [gás e taxas](/developers/docs/gas/) no Ethereum.

Por fim, você precisará compilar seu contrato antes de implantá-lo, portanto, certifique-se de ter lido sobre a [compilação de contratos inteligentes](/developers/docs/smart-contracts/compiling/).

## Como implantar um contrato inteligente {#how-to-deploy-a-smart-contract}

### O que você vai precisar {#what-youll-need}

- O bytecode do seu contrato – isso é gerado por meio da [compilação](/developers/docs/smart-contracts/compiling/)
- ETH para o gás – você definirá seu limite de gás como em outras transações, portanto, esteja ciente de que a implantação de contratos precisa de muito mais gás do que uma simples transferência de ETH
- um script ou plugin de implantação
- acesso a um [nó Ethereum](/developers/docs/nodes-and-clients/), seja executando o seu próprio, conectando-se a um nó público ou por meio de uma chave de API usando um [serviço de nó](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Etapas para implantar um contrato inteligente {#steps-to-deploy}

As etapas específicas envolvidas dependerão do framework de desenvolvimento em questão. Por exemplo, você pode conferir a [documentação do Hardhat sobre a implantação de seus contratos](https://hardhat.org/docs/tutorial/deploying) ou a [documentação do Foundry sobre a implantação e verificação de um contrato inteligente](https://book.getfoundry.sh/forge/deploying). Uma vez implantado, seu contrato terá um endereço Ethereum como outras [contas](/developers/docs/accounts/) e poderá ser verificado usando [ferramentas de verificação de código-fonte](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Ferramentas relacionadas {#related-tools}

**Remix - _O Remix IDE permite desenvolver, implantar e administrar contratos inteligentes para blockchains semelhantes ao Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Plataforma de desenvolvimento Web3 que fornece depuração, observabilidade e blocos de construção de infraestrutura para desenvolver, testar, monitorar e operar contratos inteligentes_**

- [tenderly.co](https://tenderly.co/)
- [Documentação](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Um ambiente de desenvolvimento para compilar, implantar, testar e depurar seu software Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentação sobre a implantação de seus contratos](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Implante facilmente qualquer contrato em qualquer cadeia compatível com EVM, usando um único comando_**

- [Documentação](https://portal.thirdweb.com/deploy/)

**Crossmint - _Plataforma de desenvolvimento Web3 de nível corporativo para implantar contratos inteligentes, habilitar pagamentos com cartão de crédito e entre cadeias, e usar APIs para criar, distribuir, vender, armazenar e editar NFTs._**

- [crossmint.com](https://www.crossmint.com)
- [Documentação](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Tutoriais relacionados {#related-tutorials}

- [Implantando seu primeiro contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) _– Uma introdução à implantação do seu primeiro contrato inteligente em uma rede de teste Ethereum._
- [Hello World | tutorial de contrato inteligente](/developers/tutorials/hello-world-smart-contract/) _– Um tutorial fácil de seguir para criar e implantar um contrato inteligente básico no Ethereum._
- [Interaja com outros contratos a partir do Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Como implantar um contrato inteligente a partir de um contrato existente e interagir com ele._
- [Como reduzir o tamanho do seu contrato](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Como reduzir o tamanho do seu contrato para mantê-lo abaixo do limite e economizar no gas_

## Leitura adicional {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Implantando seus contratos com o Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Frameworks de desenvolvimento](/developers/docs/frameworks/)
- [Execute um nó Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nós como serviço](/developers/docs/nodes-and-clients/nodes-as-a-service)