---
title: Redes
description: Uma visão geral das redes Ethereum e onde obter ether (ETH) da rede de testes para testar seu aplicativo.
lang: pt-br
---

Redes Ethereum são grupos de computadores conectados que se comunicam usando o protocolo Ethereum. Só há uma Ethereum Mainnet, mas redes independentes seguindo as mesmas regras de protocolo podem ser criadas para finalidade de testes e desenvolvimento. Há várias "redes" independentes que seguem o protocolo sem interagir uma com a outra. Você pode até iniciar uma localmente no seu próprio computador para testar seus contratos inteligentes e apps web3.

Sua conta Ethereum funcionará nas diferentes redes, mas o saldo da sua conta e o histórico de transações não serão transferidos da rede Ethereum principal. Para fins de teste, é útil saber quais redes estão disponíveis e como obter a rede de testes ETH para brincar. Em geral, por razões de segurança, não é recomendado reutilizar contas da rede principal em redes de testes ou vice-versa.

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

A maioria das redes de teste começou usando um mecanismo de consenso de prova de autoridade permitido. Isso significa que um pequeno número de nós é escolhido para validar as transações e criar novos blocos, incluindo sua identidade no processo. Como alternativa, algumas redes de testes apresentam um mecanismo de consenso de prova de participação aberto, no qual todos podem testar a execução de um validador, assim como a Rede principal do Ethereum.

ETH em redes de teste (testnets) supostamente não tem valor real; entretanto, tem sido criados mercados para certos tipos de ETH de testnet que têm se tornado escassos ou difíceis de se obter. Como você precisa do ETH para realmente interagir com o Ethereum (mesmo em redes de teste), a maioria das pessoas obtém ETH em redes de teste gratuitamente em torneiras (faucets). A maioria das torneiras são aplicativos Web em que você pode inserir um endereço para o qual deseja que o ETH seja enviado.

#### Qual rede de testes devo usar?

As duas redes de testes públicas que os desenvolvedores dos clientes estão atualmente mantendo são Sepolia e Hoodi. Sepolia é uma rede para desenvolvedores de contrato e aplicativos para testar seus aplicativos. A rede Hoodi permite que os desenvolvedores de protocolo testem atualizações de rede e permite que os participantes façam testes usando validadores.

#### Sepolia {#sepolia}

**Sepolia é a rede de teste padrão recomendada para desenvolvimento de aplicativos**. A rede Sepolia usa um conjunto de validadores autorizados. É bastante novo, o que significa que seu estado e história são bastante pequenos. Isso significa que a rede é rápida para sincronizar e que a execução de um nó requer menos armazenamento. Isso é útil para usuários que desejam ativar rapidamente um nó e interagir diretamente com a rede.

- Conjunto de validadores fechado, controlado pelo cliente & equipes de teste
- Nova rede de teste, menos aplicativos implantados que outras redes de teste
- A sincronização rápida e a execução de um nó exigem um espaço de disco mínimo

##### Recursos

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [Faucet do QuickNode Sepolia](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet de PoW](https://sepolia-faucet.pk910.de/)
- [Faucet da Carteira Coinbase | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Faucet do Alchemy Sepolia](https://sepoliafaucet.com/)
- [Faucet do Infura Sepolia](https://www.infura.io/faucet)
- [Faucet da Chainstack Sepolia](https://faucet.chainstack.com/sepolia-faucet)
- [Faucet do ecossistema Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Hoodi {#hoodi}

_Nota: [a rede de testes Goerli está obsoleta](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) e foi substituída por Hoodi. Considere migrar seus aplicativos para a Sepolia._

Hoodi é a rede de testes usada para testar a validação e staking. A rede Hoodi está aberta para usuários que queiram executar um validador na rede de testes. Os participantes que desejam testar atualizações de protocolo antes de serem implantados na rede principal devem, portanto, usar a Hoodi.

- Conjunto de validadores abertos, com o qual os participantes podem testar atualizações de rede
- Estado grande, útil para testar interações complexas de contratos inteligentes
- Mais longo para sincronizar e requer mais armazenamento para executar um nó

##### Recursos

- [Site](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)

##### Faucets

- [Faucet Hoodi](https://hoodi.ethpandaops.io/)

Para iniciar um Validador na rede de testes Hoodi, use a [plataforma de lançamento Hoodi](https://hoodi.launchpad.ethereum.org/en/).

### Redes de testes de camada 2 {#layer-2-testnets}

[Camada 2 (L2)](/layer-2/) é um termo coletivo para descrever um conjunto específico de soluções de escalabilidade do Ethereum. Uma camada 2 é uma cadeia de blocos separada que estende o Ethereum e herda as garantias de segurança do Ethereum. Normalmente, as redes de teste de camada 2 estão fortemente associadas às redes de testes públicas do Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Uma rede de testes para [Arbitrum](https://arbitrum.io/).

##### Faucets

- [Faucet do Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Faucet do Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Uma rede de testes para [Optimism](https://www.optimism.io/).

##### Faucets

- [Faucet do Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Faucet do Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)

#### Starknet Sepolia {#starknet-sepolia}

Uma rede de teste para [Starknet](https://www.starknet.io).

##### Faucets

- [Faucet do Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)

## Redes privadas {#private-networks}

Uma rede Ethereum é uma rede privada se seus nódulos não estiverem conectados a uma rede pública (ex: Rede principal e rede de testes). Neste contexto, privado significa apenas reservado ou isolado, em vez de protegido ou seguro.

### Redes de desenvolvimento {#development-networks}

Para desenvolver um aplicativo Ethereum, você deve executá-lo em uma rede privada para ver como funciona antes de implantá-lo. Tal como você pode criar um servidor local em seu computador para desenvolvimento Web, você pode criar uma instância local de blockchain para testar seu dapp. Isso permite uma iteração muito mais rápida do que uma rede de testes pública.

Existem projetos e ferramentas dedicadas a ajudá-lo com isso. Saiba mais sobre [redes de desenvolvimento](/developers/docs/development-networks/).

### Redes de consórcio {#consortium-networks}

O processo de consenso é controlado por um conjunto predefinido de nódulos confiáveis. Por exemplo, uma rede privada de instituições acadêmicas conhecidas, cada uma administrando um único nódulo, e os blocos são validados por um limite de signatários na rede.

Se uma rede pública Ethereum é como a internet pública, uma rede de consórcio é como uma intranet privada.

## Ferramentas relacionadas {#related-tools}

- [Chainlist](https://chainlist.org/) _Lista de redes EVM para conectar carteiras e fornecedores aos identificadores de cadeia e rede apropriados_
- [/Cadeias baseadas em EVM](https://github.com/ethereum-lists/chains) _Repositório do GitHub com metadados de cadeias que alimenta a Chainlist_

## Leitura adicional {#further-reading}

- [Proposta: Ciclo de vida previsível da rede de testes do Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [A evolução das redes de testes do Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
