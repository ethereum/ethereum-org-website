---
title: Redes de desenvolvimento
description: "Uma visão geral das redes de desenvolvimento e ferramentas disponíveis para ajudar a construir aplicativos Ethereum."
lang: pt-br
---

Quando fizer um aplicativo Ethereum com contratos inteligentes, você poderá rodar ele em uma rede local para ver como funciona antes de implementar.

Assim como é possível executar um servidor local do seu computador para desenvolvimento web, você pode usar uma rede de desenvolvimento para criar uma instância local de cadeia de blocos para testar seu dapp. Essas redes de desenvolvimento da Ethereum fornecem recursos que permitem uma iteração muito mais rápida do que uma rede de testes pública (por exemplo, você não precisa lidar com a aquisição de ETH de uma faucet de rede de testes).

## Pré-requisitos {#prerequisites}

Você deve entender os [conceitos básicos da pilha de Ethereum](/developers/docs/ethereum-stack/) e das [redes Ethereum](/developers/docs/networks/) antes de mergulhar nas redes de desenvolvimento.

## O que é uma rede de desenvolvimento? {#what-is-a-development-network}

Redes de desenvolvimento são essencialmente clientes Ethereum (implementações da Ethereum) concebidas especificamente para desenvolvimento local.

**Por quê não executar somente um nó Ethereum localmente?**

Você _poderia_ [executar um nó](/developers/docs/nodes-and-clients/#running-your-own-node), mas como as redes de desenvolvimento são criadas especificamente para o desenvolvimento, elas geralmente vêm repletas de recursos convenientes, como:

- Semeando deterministicamente sua cadeia de blocos local com dados (por exemplo, contas com saldos de ETH)
- Produzir instantaneamente blocos com cada transação que receber, em ordem e sem atraso
- Funcionalidade de depuração e registro aprimorado

## Ferramentas disponíveis {#available-projects}

**Observação**: a maioria dos [frameworks de desenvolvimento](/developers/docs/frameworks/) inclui uma rede de desenvolvimento integrada. Recomendamos começar com um framework para [configurar seu ambiente de desenvolvimento local](/developers/local-environment/).

### Rede Hardhat {#hardhat-network}

Uma rede local Ethereum concebida para desenvolvedores. Isso permite que você implante seus contratos, execute os testes e depure seu código.

A rede Hardhat vem integrada com Hardhat, um ambiente de desenvolvimento para profissionais.

- [Site](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Beacon Chains locais {#local-beacon-chains}

Alguns clientes de consenso têm ferramentas integradas para ativar as cadeias Beacon locais para fins de teste. Instruções para Lighthouse, Nimbus e Lodestar estão disponíveis:

- [Rede de teste local usando Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Rede de teste local usando Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Redes de teste públicas da Ethereum {#public-beacon-testchains}

Há também duas implementações de testes públicos mantidas do Ethereum: Sepolia e Hoodi. A rede de testes recomendada com suporte de longo prazo é a Hoodi, que qualquer pessoa pode validar livremente. Sepolia usa um conjunto de validadores com permissão, o que significa que não há acesso geral a novos validadores nesta rede de teste.

- [Plataforma de lançamento de participação da Hoodi](https://hoodi.launchpad.ethereum.org/)

### Pacote Kurtosis do Ethereum {#kurtosis}

Kurtosis é um sistema de construção para ambientes de teste em vários contêineres, que permite aos desenvolvedores gerar localmente instâncias reproduzíveis de redes blockchain.

O pacote Ethereum Kurtosis pode ser usado para instanciar rapidamente uma rede de teste Ethereum parametrizável, altamente dimensionável e privada no Docker ou no Kubernetes. O pacote é compatível com todos os principais clientes da camada de execução (EL) e da camada de consenso (CL). A Kurtosis lida com todos os mapeamentos de portas locais e conexões de serviço para uma rede representativa a ser usada em fluxos de trabalho de validação e teste relacionados à infraestrutura principal do Ethereum.

- [Pacote de rede Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Site](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Documentação](https://docs.kurtosis.com/)

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_

## Tópicos relacionados {#related-topics}

- [Frameworks de desenvolvimento](/developers/docs/frameworks/)
- [Configure um ambiente de desenvolvimento local](/developers/local-environment/)
