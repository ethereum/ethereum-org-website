---
title: Implantação de contratos inteligentes
description: Aprender como implantar contratos inteligentes para redes Ethereum, incluindo pré-requisitos, ferramentas e etapas de implantação.
lang: pt-br
---

Você precisa implantar o seu contrato inteligente para que ele esteja disponível para os usuários de uma rede Ethereum.

Para implantar um contrato inteligente, você apenas envia uma transação Ethereum que contém o código do contrato inteligente compilado sem especificar os destinatários.

## Pré-requisitos {#prerequisites}

Você deve entender sobre [redes Ethereum](/developers/docs/networks/), [transações](/developers/docs/transactions/) e a [anatomia de contratos inteligentes](/developers/docs/smart-contracts/anatomy/) antes de implantar contratos inteligentes.

Implantar um contrato também custa ether (ETH), uma vez que eles são armazenados na blockchain, então você deve estar familiarizado com [gás e taxas](/developers/docs/gas/) no Ethereum.

Finalmente, você precisará compilar seu contrato antes de implantá-lo, portanto, certifique-se de que leu sobre a [compilação de contratos inteligentes](/developers/docs/smart-contracts/compiling/).

## Como implantar um contrato inteligente {#how-to-deploy-a-smart-contract}

### Do que você vai precisar {#what-youll-need}

- O bytecode do seu contrato – gerado através da [compilação](/developers/docs/smart-contracts/compiling/)
- Ether para gás – você definirá o seu limite de gás como outras transações, então esteja ciente de que a implantação do contrato precisa de muito mais gás do que uma simples transferência de ETH
- um script de implantação ou um plugin
- acesso a um [nó do Ethereum](/developers/docs/nodes-and-clients/), seja executando o seu próprio, conectando-se a um nó público ou por meio de uma chave de API usando um [serviço de nós](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Passos para implantar um contrato inteligente {#steps-to-deploy}

Os passos específicos envolvidos dependerão do framework de desenvolvimento em questão. Por exemplo, você pode conferir a [documentação do Hardhat sobre a implantação de seus contratos](https://hardhat.org/docs/tutorial/deploying) ou a [documentação do Foundry sobre a implantação e verificação de um contrato inteligente](https://book.getfoundry.sh/forge/deploying). Uma vez implantado, seu contrato terá um endereço Ethereum como outras [contas](/developers/docs/accounts/) e poderá ser verificado usando [ferramentas de verificação de código-fonte](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Ferramentas relacionadas {#related-tools}

**Remix - _O Remix IDE permite desenvolver, implantar e administrar contratos inteligentes para blockchains como o Ethereum_**

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

**Crossmint - _Plataforma de desenvolvimento web3 de nível empresarial para implantar contratos inteligentes, habilitar pagamentos com cartão de crédito e cross-chain e usar APIs para criar, distribuir, vender, armazenar e editar NFTs._**

- [crossmint.com](https://www.crossmint.com)
- [Documentação](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Tutoriais relacionados {#related-tutorials}

- [Implantando seu primeiro contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) _– Uma introdução à implantação de seu primeiro contrato inteligente em uma rede de teste da Ethereum._
- [Hello World | tutorial de contrato inteligente](/developers/tutorials/hello-world-smart-contract/) _– Um tutorial fácil de seguir para criar e implantar um contrato inteligente básico no Ethereum._
- [Interaja com outros contratos a partir do Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Como implantar um contrato inteligente a partir de um contrato existente e interagir com ele._
- [Como reduzir o tamanho do seu contrato](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Como reduzir o tamanho do seu contrato para mantê-lo abaixo do limite e economizar gás_

## Leitura adicional {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Implantando seus contratos com o Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_

## Tópicos relacionados {#related-topics}

- [Frameworks de desenvolvimento](/developers/docs/frameworks/)
- [Executar um nó Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nós como serviço](/developers/docs/nodes-and-clients/nodes-as-a-service)
