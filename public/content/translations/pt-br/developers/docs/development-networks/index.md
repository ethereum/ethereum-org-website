---
title: Redes de desenvolvimento
description: Uma visão geral das redes de desenvolvimento e ferramentas disponíveis para ajudar a construir aplicativos Ethereum.
lang: pt-br
---

Quando fizer um aplicativo Ethereum com contratos inteligentes, você poderá rodar ele em uma rede local para ver como funciona antes de implementar.

Assim como é possível executar um servidor local do seu computador para desenvolvimento web, você pode usar uma rede de desenvolvimento para criar uma instância local de cadeia de blocos para testar seu dapp. Essas redes de desenvolvimento da Ethereum fornecem recursos que permitem uma iteração muito mais rápida do que uma rede de testes pública (por exemplo, você não precisa lidar com a aquisição de ETH de uma faucet de rede de testes).

## Pré-requisitos {#prerequisites}

Você precisa entender conceitos [básicos da pilha de Ethereum](/developers/docs/ethereum-stack/) e [das redes de Ethereum](/developers/docs/networks/) antes de mergulhar nas redes de desenvolvimento.

## O que é uma rede de desenvolvimento? {#what-is-a-development-network}

Redes de desenvolvimento são essencialmente clientes Ethereum (implementações da Ethereum) concebidas especificamente para desenvolvimento local.

**Por quê não executar somente um nó Ethereum localmente?**

Você _poderia_ [executar um nó](/developers/docs/nodes-and-clients/#running-your-own-node), mas como as redes de desenvolvimento são criadas especificamente para o desenvolvimento, elas geralmente vêm com recursos convenientes, como:

- Semeando deterministicamente sua blockchain local com dados (por exemplo, contas com saldo ETH)
- Produzir instantaneamente blocos com cada transação que receber, em ordem e sem atraso
- Funcionalidade de depuração e registro aprimorado

## Ferramentas disponíveis {#available-projects}

**Nota**: [A maioria dos frameworks desenvolvidos](/developers/docs/frameworks/) incluem uma rede de desenvolvimento integrada. Recomendamos começar com um framework para [configurar seu ambiente de desenvolvimento local](/developers/local-environment/).

### Rede Hardhat {#hardhat-network}

Uma rede local Ethereum concebida para desenvolvedores. Isso permite que você implante seus contratos, execute os testes e depure seu código.

A rede Hardhat vem integrada com Hardhat, um ambiente de desenvolvimento para profissionais.

- [Website](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### Beacon Chains Locais {#local-beacon-chains}

Alguns clientes de consenso têm ferramentas integradas para ativar as cadeias Beacon locais para fins de teste. Instruções para Lighthouse, Nimbus e Lodestar estão disponíveis:

- [Testnet local usando Lodestar](https://chainsafe.github.io/lodestar/usage/local/)
- [Testnet local usando Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)
- [Testnet local usando Nimbus](https://github.com/status-im/nimbus-eth1/blob/master/fluffy/docs/local_testnet.md)

### Cadeias de teste públicas da Ethereum {#public-beacon-testchains}

Existem também duas implementações públicas de testes da Ethereum: Goerli e Sepolia. A rede de testes recomendada com apoio em longo prazo é Goerli, sobre a qual qualquer pessoa tem liberdade para validar. Sepolia é uma cadeia mais nova e menor que também deve ser mantida em um futuro previsível, com um conjunto de validadores autorizados (o que significa que não há acesso geral a novos validadores nesta rede de teste). Espera-se que a cadeia de Ropsten seja descontinuada no quarto trimestre de 2022, e espera-se que a cadeia de Rinkeby seja descontinuada no segundo ou terceiro trimestre de 2023.

- [Plataforma de lançamento de staking Goerli](https://goerli.launchpad.ethereum.org/)
- [Anúncio de descontinuação da Ropsten, Rinkeby & Kiln](https://blog.ethereum.org/2022/06/21/testnet-deprecation)

## Leitura adicional {#further-reading}

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione!_

## Tópicos relacionados {#related-topics}

- [Estruturas de desenvolvimento](/developers/docs/frameworks/)
- [Configure um ambiente de desenvolvimento](/developers/local-environment/)
