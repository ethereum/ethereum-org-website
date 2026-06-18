---
title: Redes de desenvolvimento
description: Uma visão geral das redes de desenvolvimento e das ferramentas disponíveis para ajudar a criar aplicativos Ethereum.
lang: pt-br
---

Ao criar um aplicativo [Ethereum](/) com contratos inteligentes, você vai querer executá-lo em uma rede local para ver como ele funciona antes de implantá-lo.

Semelhante a como você pode executar um servidor local no seu computador para desenvolvimento web, você pode usar uma rede de desenvolvimento para criar uma instância local de blockchain para testar seu aplicativo descentralizado (dapp). Essas redes de desenvolvimento Ethereum fornecem recursos que permitem uma iteração muito mais rápida do que uma rede de teste pública (por exemplo, você não precisa lidar com a aquisição de ETH de um faucet de testnet).

## Pré-requisitos {#prerequisites}

Você deve entender o [básico da pilha Ethereum](/developers/docs/ethereum-stack/) e das [redes Ethereum](/developers/docs/networks/) antes de mergulhar nas redes de desenvolvimento.

## O que é uma rede de desenvolvimento? {#what-is-a-development-network}

Redes de desenvolvimento são essencialmente clientes Ethereum (implementações do Ethereum) projetados especificamente para desenvolvimento local.

**Por que não executar apenas um nó Ethereum padrão localmente?**

Você _poderia_ [executar um nó](/developers/docs/nodes-and-clients/#running-your-own-node), mas como as redes de desenvolvimento são criadas especificamente para o desenvolvimento, elas geralmente vêm repletas de recursos convenientes, como:

- Preenchimento determinístico da sua blockchain local com dados (por exemplo, contas com saldos em ETH)
- Produção instantânea de blocos com cada transação que recebe, em ordem e sem atraso
- Funcionalidade aprimorada de depuração e registro (logging)

## Ferramentas disponíveis {#available-projects}

**Nota**: A maioria dos [frameworks de desenvolvimento](/developers/docs/frameworks/) inclui uma rede de desenvolvimento integrada. Recomendamos começar com um framework para [configurar seu ambiente de desenvolvimento local](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

Uma rede Ethereum local projetada para desenvolvimento. Ela permite que você implante seus contratos, execute seus testes e depure seu código.

A Hardhat Network vem integrada ao Hardhat, um ambiente de desenvolvimento Ethereum para profissionais.

- [Site](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Beacon Chains locais {#local-beacon-chains}

Alguns clientes de consenso têm ferramentas integradas para criar beacon chains locais para fins de teste. Instruções para Lighthouse, Nimbus e Lodestar estão disponíveis:

- [Rede de teste local usando Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Rede de teste local usando Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Cadeias de teste públicas do Ethereum {#public-beacon-testchains}

Existem também duas implementações de teste públicas mantidas do Ethereum: Sepolia e Hoodi. A rede de teste recomendada com suporte de longo prazo é a Hoodi, na qual qualquer pessoa é livre para validar. A Sepolia usa um conjunto de validadores permissionado, o que significa que não há acesso geral a novos validadores nesta rede de teste.

- [Plataforma de lançamento de staking da Hoodi](https://hoodi.launchpad.ethereum.org/)

### Pacote Ethereum Kurtosis {#kurtosis}

Kurtosis é um sistema de compilação para ambientes de teste de vários contêineres que permite aos desenvolvedores criar localmente instâncias reproduzíveis de redes blockchain.

O pacote Ethereum Kurtosis pode ser usado para instanciar rapidamente uma rede de teste Ethereum parametrizável, altamente escalável e privada sobre Docker ou Kubernetes. O pacote suporta todos os principais clientes da Camada de Execução (EL) e da Camada de Consenso (CL). O Kurtosis lida de forma elegante com todos os mapeamentos de portas locais e conexões de serviço para uma rede representativa a ser usada em fluxos de trabalho de validação e teste relacionados à infraestrutura principal do Ethereum.

- [Pacote de rede Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Site](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Documentação](https://docs.kurtosis.com/)

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Frameworks de desenvolvimento](/developers/docs/frameworks/)
- [Configurar um ambiente de desenvolvimento local](/developers/local-environment/)

## Tutoriais: Redes de desenvolvimento e ambientes de teste no Ethereum {#tutorials}

- [Desenvolva e teste dApps com uma rede de teste Ethereum local de vários clientes](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Como criar uma rede de teste Ethereum local de vários clientes com Kurtosis para desenvolvimento e teste de dApps._