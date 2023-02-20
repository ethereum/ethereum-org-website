---
title: Redes de desenvolvimento
description: Uma visão geral das redes de desenvolvimento e ferramentas disponíveis para ajudar a construir aplicativos Ethereum.
lang: pt-br
---

Quando fizer um aplicativo Ethereum com contratos inteligentes, você poderá rodar ele em uma rede local para ver como funciona antes de implementar.

Tal como você pode executar um servidor local do seu computador para desenvolvimento web, você pode usar uma rede de desenvolvimento para criar uma instância local de cadeia de blocos para testar seu dapp. Essas redes de desenvolvimento da Ethereum fornecem recursos que permitem uma iteração muito mais rápida do que uma rede de testes pública (por exemplo, você não precisa lidar com a aquisição de ETH de uma faucet de rede de testes).

## Pré-requisitos {#prerequisites}

Você precisa entender conceitos [básicos da pilha de Ethereum](/developers/docs/ethereum-stack/) e [das redes de Ethereum](/developers/docs/networks/) antes de mergulhar nas redes de desenvolvimento.

## O que é uma rede de desenvolvimento? {#what-is-a-development-network}

Redes de desenvolvimento são essencialmente clientes Ethereum (implementações da Ethereum) desenhadas especificamente para desenvolvimento local.

**Por quê não executar somente um nó Ethereum localmente?**

Você _pode_ [executar um nó](/developers/docs/nodes-and-clients/#running-your-own-node) (como o Geth, Erigon, ou Nethermind) mas como as redes de desenvolvimento são construídas de propósito para o desenvolvimento, elas geralmente vêm cheias de recursos convenientes, como:

- Semeando deterministicamente sua cadeia de blocos local com dados (por exemplo, contas com saldo ETH)
- Minerando instantaneamente blocos com cada transação recebida, a receber ou sem atraso
- Funcionalidade de depuração e registro aprimorado

## Ferramentas disponíveis {#available-projects}

**Nota**: [A maioria dos frameworks desenvolvidos](/developers/docs/frameworks/) incluem uma rede de desenvolvimento integrada. Recomendamos começar com uma estrutura para [configurar seu ambiente de desenvolvimento local](/developers/local-environment/).

### Ganache {#ganache}

Crie uma cadeia de blocos Ethereum pessoal que você possa usar para testes, executar comandos e inspecionar seu estado, enquanto controla como a cadeia irá operar.

Ganache fornece tanto um aplicativo de desktop (Ganache UI), como uma linha de comando (`ganache-cli`). Isso é uma parte da suíte de ferramentas Truffle.

- [Website](https://www.trufflesuite.com/ganache)
- [GitHub](https://github.com/trufflesuite/ganache)
- [Documentação](https://www.trufflesuite.com/docs/ganache/overview)

### Rede Hardhat {#hardhat-network}

Uma rede local Ethereum desenhada para desenvolvedores. Isso permite que você implante seus contratos, execute os testes e depure seu código.

A rede Hardhat vem integrada com Hardhat, um ambiente de desenvolvimento para profissionais.

- [Website](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

## Leitura adicional {#further-reading}

_Conhece algum recurso da comunidade que já o ajudou? Edite essa página e o adicione aqui!_

## Tópicos relacionados {#related-topics}

- [Estruturas de desenvolvimento](/developers/docs/frameworks/)
- [Configure um ambiente de desenvolvimento](/developers/local-environment/)
