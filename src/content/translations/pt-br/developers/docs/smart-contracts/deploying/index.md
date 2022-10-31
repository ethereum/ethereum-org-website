---
title: Implantação de contratos inteligentes
description:
lang: pt-br
---

Você precisa implantar o seu contrato inteligente para que ele esteja disponível para os usuários de uma rede Ethereum.

Para implantar um contrato inteligente, você apenas envia uma transação Ethereum que contém o código do contrato inteligente compilado sem especificar os destinatários.

## Pré-Requisitos {#prerequisites}

Você deve entender as [redes Ethereum](/developers/docs/networks/), [transações](/developers/docs/transactions/) e a [anatomia de contratos inteligentes](/developers/docs/smart-contracts/anatomy/) antes de implantar contratos inteligentes.

Implantar um contrato também custa ETH, então você deve estar familiarizado com [gás e taxas](/developers/docs/gas/) na Ethereum.

Finalmente, você precisará compilar seu contrato antes de implantá-lo, então certifique-se de ter lido sobre [compilação de contratos inteligentes](/developers/docs/smart-contracts/compiling/).

## Como implantar um contrato inteligente {#how-to-deploy-a-smart-contract}

### O que você precisará {#what-youll-need}

- bytecode do seu contrato - isto é gerado através da [compilação](/developers/docs/smart-contracts/compiling/).
- Ether para gás – você vai definir o seu limite de gás como outras transações, então esteja ciente de que a implantação do contrato precisa de muito mais gás do que uma simples transferência de ETH.
- um script de implantação ou um plugin
- acesso a um [nó Ethereum](/developers/docs/nodes-and-clients/), executando o seu próprio, conectando a um nó público, ou através de uma chave de API usando um [serviço de nó](/developers/docs/nodes-and-clients/nodes-as-a-service/) como Infura ou Alquimia

### Como implantar um contrato inteligente {#steps-to-deploy}

Os passos específicos envolvidos dependerão das ferramentas que você usa. Por exemplo, confira a [documentação de hardware sobre a implantação de seus contratos](https://hardhat.org/guides/deploying.html) ou [documentação do Truffle sobre redes e implantação de aplicativos](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment). Estas são duas das ferramentas mais populares para a implantação de contratos inteligentes, que envolvem a elaboração de um script para manipular as etapas de implementação.

Uma vez implantado, o seu contrato terá um endereço Ethereum, como outras [contas](/developers/docs/accounts/).

## Ferramentas relacionadas {#related-tools}

**Remix - _Remix IDE permite desenvolver, implantar e administrar contratos inteligentes para Ethereum como as cadeias de blocos._**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Simular, depurar e monitorar qualquer coisa em cadeias compatíveis com EVM, com dados em tempo real_**

- [tenderly.com](https://tenderly.co/)
- [Documentação](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Um ambiente de desenvolvimento para compilar, implantar, testar e depurar seu software de Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentos na implantação de seus contratos](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**Truffle -** **_Um ambiente de desenvolvimento, teste de framework, compilação e outras ferramentas._**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [Documentos em redes e implantação de aplicativos](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment)
- [GitHub](https://github.com/trufflesuite/truffle)

## Tutoriais relacionados {#related-tutorials}

- [Implantando o seu primeiro contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) _– Uma introdução à implantação do seu primeiro contrato inteligente em uma rede de teste da Ethereum._
- [Interaja com outros contratos da Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Como implantar um contrato inteligente a partir de um contrato existente e interagir com ele._
- [Como diminuir o tamanho de seu contrato](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Como reduzir o tamanho do seu contrato para mantê-lo abaixo do limite e economizar gás_

## Leia mais {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Implementando seus contratos com Hardhat](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Estruturas de desenvolvimento](/developers/docs/frameworks/)
- [Executando um nó Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
