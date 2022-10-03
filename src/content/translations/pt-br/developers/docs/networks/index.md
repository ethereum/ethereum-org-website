---
title: Redes
description: Uma visão geral das redes Ethereum e onde obter ether (ETH) da rede de testes para testar seu aplicativo.
lang: pt-br
---

Como o Ethereum é um protocolo, isso significa que pode haver várias "redes" independentes em conformidade com este protocolo que não interajam entre si.

Redes são ambientes de Ethereum diferentes que você pode acessar para desenvolvimento, teste ou produção. Sua conta de Ethereum funcionará em diferentes redes, mas o saldo da conta e o histórico de transações não serão transferidos desde a rede principal de Ethereum. Para fins de teste, é útil saber quais redes estão disponíveis e como obter ETH para a rede de testes, para que você possa começar a testá-lo.

## Pré-requisitos {#prerequisites}

Você deveria entender os fundamentos básicos do Ethereum antes de ler sobre as diferentes redes, pois as redes de teste oferecem uma versão econômica e segura do Ethereum para começar a testar. Veja nossa [introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## Redes públicas {#public-networks}

As redes públicas são acessíveis a qualquer pessoa no mundo com uma conexão à Internet. Qualquer um pode ler ou criar transações em uma blockchain pública e validar as transações que estão sendo executadas. O acordo sobre as transações e o estado da rede é decidido por um consenso entre pares.

### Rede principal {#mainnet}

A rede principal é a blockchain de produção Ethereum pública primária, onde as transações de valor real ocorrem no livro-razão distribuído.

Quando as pessoas e as exchanges discutem os preços do ETH, eles estão falando sobre a rede principal ETH.

### Redes de teste {#testnets}

Além da rede principal, existem redes de teste públicas. Essas são redes usadas por desenvolvedores de protocolo ou desenvolvedores de contrato inteligente para testar as atualizações de protocolo e também os contratos inteligentes em potencial em um ambiente de produção antes da implantação na rede principal. Pense nisso como um análogo a servidores de produção versus servidores de teste.

Geralmente, é importante testar qualquer código de contrato que você escreve em uma rede de teste antes de implantar na rede principal. Se você estiver criando um dapp que se integra a contratos inteligentes existentes, a maioria dos projetos tem cópias implantadas em redes de teste com as quais você pode interagir.

A maioria das redes de teste usa um mecanismo de consenso de prova de autoridade. Isso significa que um pequeno número de nós é escolhido para validar as transações e criar novos blocos, incluindo sua identidade no processo. É difícil incentivar a mineração em uma rede de teste de prova de trabalho que pode deixá-la vulnerável.

O ETH em redes de teste não tem valor real; portanto, não há mercados para ETH de redes de teste. Como você precisa do ETH para interagir de fato com o Ethereum, a maioria das pessoas obtém o ETH via "faucets". A maioria dos faucets são aplicativos web onde você pode inserir um endereço para o qual deseja que o ETH seja enviado.

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

Uma rede de teste para [Arbitrum](https://arbitrum.io/).

##### Faucets Arbitrum Rinkeby

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadeia sem a necessidade de uma conta social)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

#### Görli {#goerli}

Uma rede de teste baseada em prova de autoridade que funciona em todos os clientes.

##### Faucets Görli

- [Faucet Görli](https://faucet.goerli.mudit.blog/)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)

#### Kintsugi {#kintsugi}

Uma rede de teste para fusão do Ethereum.

##### Faucets Kintsugi

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadeia sem a necessidade de uma conta social)
- [Faucets Kintsugi](https://faucet.kintsugi.themerge.dev/)

#### Kovan {#kovan}

Uma rede de teste baseada em prova de autoridade para aqueles que executam clientes OpenEthereum.

##### Faucet Kovan

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadeia sem a necessidade de uma conta social)
- [Faucet Kovan](https://faucet.kovan.network/)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

#### Optimistic Kovan {#optimistic-kovan}

Uma rede de teste para [Optimism](https://www.optimism.io/).

##### Faucets Optimistic Kovan

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadeia sem a necessidade de uma conta social)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

#### Rinkeby {#rinkeby}

Uma rede de teste baseada em prova de autoridade para aqueles que executam o cliente Geth.

##### Faucet Rinkeby

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadeia sem a necessidade de uma conta social)
- [Faucet Alchemy](https://RinkebyFaucet.com)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)
- [Faucet Rinkeby](https://faucet.rinkeby.io/)

#### Ropsten {#ropsten}

Uma rede de teste baseada em prova de trabalho. Portanto, esta é rede de teste mais semelhante ao Ethereum.

##### Faucet Ropsten

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadeia sem a necessidade de uma conta social)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

## Redes privadas {#private-networks}

Uma rede Ethereum é uma rede privada se seus nós não estiverem conectados a uma rede pública (ex: rede principal ou uma rede de testes). Neste contexto, privado significa apenas reservado ou isolado, em vez de protegido ou seguro.

### Redes de desenvolvimento {#development-networks}

Para desenvolver um aplicativo Ethereum, você deve executá-lo em uma rede privada para ver como funciona antes de implantá-lo. Semelhante a como você cria um servidor local em seu computador para desenvolvimento web, você pode criar uma instância local de blockchain para testar seu dapp. Isso permite uma iteração muito mais rápida do que uma rede de teste pública.

Existem projetos e ferramentas dedicadas a ajudá-lo com isso. Saiba mais sobre [redes de desenvolvimento](/developers/docs/development-networks/).

### Redes de consórcio {#consortium-networks}

O processo de consenso é controlado por um conjunto predefinido de nós confiáveis. Por exemplo, uma rede privada de instituições acadêmicas conhecidas, cada uma administrando um único nó, e os blocos são validados por um limite de signatários dentro da rede.

Se uma rede Ethereum pública é como a Internet pública, você pode pensar ver a rede de consórcio como uma intranet privada.

## Ferramentas relacionadas {#related-tools}

- [Chainlist](https://chainlist.org/) _: lista de redes EVM para conectar carteiras e fornecedores aos identificadores de cadeia e rede apropriados_
- [EVM-based Chains](https://github.com/ethereum-lists/chains) _: repositório de GitHub com metadatos de cadeias que alimenta a Chainlist_

## Leitura adicional {#further-reading}

_Conhece algum recurso da comunidade que o ajudou? Edite esta página e adicione-o!_
