---
title: Implantação de contratos inteligentes
description:
lang: pt-br
---

Você precisa implantar o seu contrato inteligente para que ele esteja disponível para os usuários de uma rede Ethereum.

Para implantar um contrato inteligente, você apenas envia uma transação Ethereum que contém o código do contrato inteligente compilado sem especificar os destinatários.

## Pré-Requisitos {#prerequisites}

Você deve entender as [redes Ethereum](/developers/docs/networks/), [transações](/developers/docs/transactions/) e a [anatomia de contratos inteligentes](/developers/docs/smart-contracts/anatomy/) antes de implantar contratos inteligentes.

Implantar um contrato também custa ether (ETH), pois eles são armazenados na blockchain, portanto, você deveria estar familiarizado com [gás e taxas](/developers/docs/gas/) na Ethereum.

Finalmente, você precisará compilar seu contrato antes de implantá-lo, então certifique-se de ter lido sobre [compilação de contratos inteligentes](/developers/docs/smart-contracts/compiling/).

## Como implantar um contrato inteligente {#how-to-deploy-a-smart-contract}

### O que você precisará {#what-youll-need}

- Bytecode do seu contrato - isto é gerado através da [compilação](/developers/docs/smart-contracts/compiling/).
- Ether para gás – você definirá o seu limite de gás como outras transações, então esteja ciente de que a implantação do contrato precisa de muito mais gás do que uma simples transferência de ETH
- um script de implantação ou um plugin
- acesso a um [nó Ethereum](/developers/docs/nodes-and-clients/), executando o seu próprio, conectando a um nó público ou por meio de uma chave de API usando um [serviço de nó](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Como implantar um contrato inteligente {#steps-to-deploy}

Os passos específicos envolvidos dependerão do framework de desenvolvimento em questão. Por exemplo, confira [a documentação do Hardhat sobre como implementar seu contrato](https://hardhat.org/guides/deploying.html) ou [a documentação do Foundry sobre como implementar e verificar um contrato inteligente](https://book.getfoundry.sh/forge/deploying). Uma vez implementado, seu contrato terá um endereço Ethereum igual qualquer outra [conta](/developers/docs/accounts/) e poderá ser verificado usando [ferramentas de verificação de código-fonte](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Ferramentas relacionadas {#related-tools}

**Remix - _Remix IDE permite desenvolver, implantar e administrar contratos inteligentes para Ethereum como as cadeias de blocos._**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Plataforma de desenvolvimento web3 que fornece blocos de construção para debugar, observar, e para infraestrutura para desenvolvimento, testes, monitoramento e operação de contratos inteligentes_**

- [tenderly.com](https://tenderly.co/)
- [Documentação](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Um ambiente de desenvolvimento para compilar, implantar, testar e depurar seu software de Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentos na implantação de seus contratos](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Implemente facilmente qualquer contrato em qualquer cadeia compatível com EVM, usando um único comando_**

- [Documentação](https://portal.thirdweb.com/deploy/)

**Crossmint - _Plataforma de desenvolvimento web3 de nível empresarial para implantar contratos inteligentes, habilitar pagamentos com cartão de crédito e entre cadeias, e usar APIs para criar, distribuir, vender, armazenar e editar NFTs._**

- [crossmint.com](https://www.crossmint.com)
- [Documentação](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Tutoriais relacionados {#related-tutorials}

- [Implementando o seu primeiro contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) _– Uma introdução à implementação do seu primeiro contrato inteligente em uma rede de teste da Ethereum._
- [Hello World | tutorial para contrato inteligente](/developers/tutorials/hello-world-smart-contract/)_ - Um tutorial fácil de seguir para criar & implementar um contrato inteligente básico na Ethereum._
- [Interaja com outros contratos Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Como implantar um contrato inteligente a partir de um contrato existente e interagir com ele._
- [Como diminuir o tamanho de seu contrato](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Como reduzir o tamanho do seu contrato para mantê-lo abaixo do limite e economizar Gas_

## Leia mais {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Implementando seus contratos com Hardhat](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_Conhece um recurso da comunidade que te ajudou? Edite essa página e adicione!_

## Tópicos relacionados {#related-topics}

- [Estruturas de desenvolvimento](/developers/docs/frameworks/)
- [Executando um nó Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nódulos como serviço](/developers/docs/nodes-and-clients/nodes-as-a-service)
