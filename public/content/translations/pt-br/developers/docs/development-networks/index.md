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

- [Testnet local usando Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Testnet local usando Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Cadeias de teste públicas do Ethereum {#public-beacon-testchains}

Existem também duas implementações públicas de testes da Ethereum: Sepolia e Hoodi. Sepolia é a rede de testes padrão recomendada para o desenvolvimento de aplicativos, com um conjunto fechado de validadores para sincronização rápida. Hoodi é uma rede de testes para validação e staking, que usa um conjunto aberto de validadores e permite potencialmente que qualquer pessoa valide.

- [Plataforma de lançamento de staking Hoodi](https://hoodi.launchpad.ethereum.org/en/)
- [Website Sepolia](https://sepolia.dev/)
- [Website Hoodi](https://hoodi.ethpandaops.io/)

### Pacote Kurtosis do Ethereum {#kurtosis}

Kurtosis é um sistema de construção para ambientes de teste em vários contêineres, que permite aos desenvolvedores gerar localmente instâncias reproduzíveis de redes blockchain.

O pacote Ethereum Kurtosis pode ser usado para instanciar rapidamente uma rede de teste Ethereum parametrizável, altamente dimensionável e privada no Docker ou no Kubernetes. O pacote é compatível com todos os principais clientes da camada de execução (EL) e da camada de consenso (CL). A Kurtosis lida com todos os mapeamentos de portas locais e conexões de serviço para uma rede representativa a ser usada em fluxos de trabalho de validação e teste relacionados à infraestrutura principal do Ethereum.

- [Pacote de rede Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Website](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Documentação](https://docs.kurtosis.com/)

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que te ajudou? Edite essa página e adicione!_

## Tópicos relacionados {#related-topics}

- [Estruturas de desenvolvimento](/developers/docs/frameworks/)
- [Configure um ambiente de desenvolvimento](/developers/local-environment/)
