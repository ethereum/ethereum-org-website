---
title: Redes
description: Uma visão geral das redes Ethereum e onde obter ether (ETH) da rede de testes para testar seu aplicativo.
lang: pt-br
---

Redes são ambientes diferentes do Ethereum que você pode acessar para desenvolvimento, teste ou produção. Como o Ethereum é um protocolo, podem existir várias "redes" independentes em conformidade com o protocolo sem interagir umas com as outras.

Sua conta Ethereum funcionará nas diferentes redes, mas o saldo da sua conta e o histórico de transações não serão transferidos da rede Ethereum principal. Para fins de teste, é útil saber quais redes estão disponíveis e como obter a rede de testes ETH para brincar.

## Pré-requisitos {#prerequisites}

Você deveria entender as [noções básicas do Ethereum](/developers/docs/intro-to-ethereum/) antes de ler sobre as diferentes redes, pois as redes de teste lhe darão uma versão barata e segura do Ethereum para brincar.

## Redes públicas {#public-networks}

As redes públicas são acessíveis a qualquer pessoa no mundo com uma conexão à Internet. Qualquer um pode ler ou criar transações em uma blockchain pública e validar as transações que estão sendo executadas. O consenso entre os pares decide sobre a inclusão de transações e o estado da rede.

### Rede Principal Ethereum {#ethereum-mainnet}

A rede principal é a blockchain de produção Ethereum pública primária, onde as transações de valor real ocorrem no livro-razão distribuído.

Quando as pessoas e as exchanges discutem os preços do ETH, eles estão falando sobre a rede principal ETH.

### Redes de Testes Ethereum {#ethereum-testnets}

Além da rede principal, existem redes de teste públicas. Essas são redes usadas por desenvolvedores de protocolo ou desenvolvedores de contrato inteligente para testar as atualizações de protocolo e também os contratos inteligentes em potencial em um ambiente de produção antes da implantação na rede principal. Pense nisso como um análogo a servidores de produção versus servidores de teste.

Você deve testar qualquer código de contrato que você escrever em uma rede de testes antes de publicar na Rede principal. Entre os dapps que se integram com contratos inteligentes existentes, a maioria dos projetos tem cópias publicadas em redes de teste.

A maioria das redes de teste começou usando um mecanismo de consenso de prova de autoridade. Isso significa que um pequeno número de nós é escolhido para validar as transações e criar novos blocos, incluindo sua identidade no processo. Alternativamente, algumas redes de teste começaram usando um mecanismo de consenso de prova de trabalho com apenas alguns mineradores autorizados. No entanto, em preparação para [A Fusão](/upgrades/merge), essas redes de teste passaram por suas próprias transições para a prova de participação, oferecendo a oportunidade de realizar vários "ensaios gerais" antes que os desenvolvedores fundissem a rede principal do Ethereum. As redes de teste do Ethereum agora são prova de participação, assim como a rede principal do Ethereum.

O ETH em redes de teste não tem valor real; portanto, não há mercados para ETH de redes de teste. Como você precisa do ETH para interagir de fato com o Ethereum, a maioria das pessoas obtém o ETH via "torneiras". A maioria das torneiras são aplicativos Web em que você pode inserir um endereço para o qual deseja que o ETH seja enviado.

#### Goerli {#goerli}

Goerli é uma rede de testes de prova de participação. É esperado que ela seja mantida a longo prazo como uma rede de testes estável para desenvolvedores de aplicativos. Antes da fusão com a rede de testes, Goerli era uma rede de testes de prova de autoridade.

- [Website](https://goerli.net/)
- [GitHub](https://github.com/goerli/testnet)
- [Etherscan](https://goerli.etherscan.io)

##### Torneiras Goerli

- [Torneira Goerli](https://faucet.goerli.mudit.blog/)
- [Torneira Chainlink](https://faucets.chain.link/)
- [Torneira Alchemy Goerli](https://goerlifaucet.com/)

#### Sepolia {#sepolia}

Sepolia é uma rede de teste de prova de participação. Embora a Sepolia ainda esteja funcionando, no momento não está planejado que ela seja mantida a longo prazo. Antes de passar pela Fusão em junho de 2022, a Sepolia era uma rede de testes de prova de trabalho.

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/goerli/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)

##### Torneiras Sepolia

- [Torneira Sepolia](https://faucet.sepolia.dev/)
- [FaucETH](https://fauceth.komputing.org)

#### Ropsten _(obsoleta)_ {#ropsten}

_Observe que [a rede de testes Ropsten está obsoleta](https://github.com/ethereum/pm/issues/460) e não receberá mais atualizações de protocolo. Considere migrar seus aplicativos para Sepolia or Goerli._

Ropsten é uma rede de testes de prova de participação. Ropsten será descontinuada no final de 2022. Antes de passar pela Fusão em maio de 2022, a Ropsten era uma rede de testes de prova de trabalho.

##### Torneira Ropsten

- [FaucETH](https://fauceth.komputing.org) (torneira multi-cadeia sem a necessidade de conta social)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

#### Rinkeby _(descontinuada)_ {#rinkeby}

_Observação: [a rede de testes Rinkeby foi descontinuada](https://github.com/ethereum/pm/issues/460) e não receberá mais atualizações de protocolo. Por favor, considere migrar seus aplicativos para Sepolia ou Goerli._

Uma rede de testes de prova de autoridade para aqueles que executam versões antigas do cliente Geth.

##### Torneira Rinkeby

- [FaucETH](https://fauceth.komputing.org) (torneira multi-cadeia sem a necessidade de conta social)
- [Faucet Alchemy](https://RinkebyFaucet.com)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)
- [Faucet Rinkeby](https://faucet.rinkeby.io/)

#### Kovan _(descontinuada)_ {#kovan}

_Observação: [a rede de teste Kovan foi descontinuada](https://github.com/ethereum/pm/issues/460) e não receberá mais atualizações de protocolo. Considere migrar seus aplicativos para Sepolia ou Goerli._

Uma rede de testes de prova de autoridade muito antiga para aqueles que ainda executam clientes da OpenEthereum.

##### Troneira Kovan

- [FaucETH](https://fauceth.komputing.org) (torneira multi-cadeia sem a necessidade de conta social)
- [Torneira Chainlink](https://faucets.chain.link/)
- [Torneira Paradigm](https://faucet.paradigm.xyz/)

### Redes de testes de camada 2 {#layer-2-testnets}

[Camada 2 (L2)](/layer-2/) é um termo coletivo para descrever um conjunto específico de soluções de escalabilidade Ethereum. Uma camada 2 é uma cadeia de blocos separada que estende o Ethereum e herda as garantias de segurança do Ethereum. As redes de teste de camada 2 geralmente são fortemente acopladas às redes de testes públicas do Ethereum.

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

Uma rede de testes para [Arbitrum](https://arbitrum.io/).

Torneiras Arbitrum Rinkeby:

- [FaucETH](https://fauceth.komputing.org) (torneira multi-cadeia sem a necessidade de conta social)
- [Torneira Chainlink](https://faucets.chain.link/)
- [Torneira Paradigm](https://faucet.paradigm.xyz/)

#### Kovan Otimista {#optimistic-kovan}

Uma rede de testes para [Optimism](https://www.optimism.io/).

Torneiras Optimistic Kovan:

- [FaucETH](https://fauceth.komputing.org) (torneira multi-cadeia sem a necessidade de conta social)
- [Torneira Paradigm](https://faucet.paradigm.xyz/)

## Redes privadas {#private-networks}

Uma rede Ethereum é uma rede privada se seus nós não estiverem conectados a uma rede pública (ex: Rede principal e rede de testes). Neste contexto, privado significa apenas reservado ou isolado, em vez de protegido ou seguro.

### Redes de desenvolvimento {#development-networks}

Para desenvolver um aplicativo Ethereum, você deve executá-lo em uma rede privada para ver como funciona antes de implantá-lo. Tal como você pode cria um servidor local em seu computador para desenvolvimento Web, você pode criar uma instância local de cadeia de blocos para testar seu dapp. Isso permite uma iteração muito mais rápida do que uma rede de testes pública.

Existem projetos e ferramentas dedicadas a ajudá-lo com isso. Saiba mais sobre [redes de desenvolvimento](/developers/docs/development-networks/).

### Redes de consórcio {#consortium-networks}

O processo de consenso é controlado por um conjunto predefinido de nós confiáveis. Por exemplo, uma rede privada de instituições acadêmicas conhecidas, cada uma administrando um único nó, e os blocos são validados por um limite de signatários dentro da rede.

Se uma rede pública Ethereum é como a internet pública, uma rede de consórcio é como uma intranet privada.

## Ferramentas relacionadas {#related-tools}

- [Chainlist](https://chainlist.org/) _Lista de redes EVM para conectar carteiras e fornecedores aos identificadores de cadeia e rede apropriados_
- [/Cadeias baseadas na EVM](https://github.com/ethereum-lists/chains) _repositório do GitHub com metadatos de cadeias que alimenta a Chainlist_

## Leitura adicional {#further-reading}

- [A evolução das redes de testes Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
