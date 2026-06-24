---
title: Redes
description: "Uma visão geral das redes Ethereum e onde obter ether (ETH) da rede de testes para testar seu aplicativo."
lang: pt-br
---

Redes Ethereum são grupos de computadores conectados que se comunicam usando o protocolo Ethereum. Só há uma Ethereum Mainnet, mas redes independentes seguindo as mesmas regras de protocolo podem ser criadas para finalidade de testes e desenvolvimento. Há várias "redes" independentes que seguem o protocolo sem interagir uma com a outra. Você pode até iniciar uma localmente no seu próprio computador para testar seus contratos inteligentes e apps web3.

Sua conta Ethereum funcionará nas diferentes redes, mas o saldo da sua conta e o histórico de transações não serão transferidos da rede Ethereum principal. Para fins de teste, é útil saber quais redes estão disponíveis e como obter a rede de testes ETH para brincar. Em geral, por razões de segurança, não é recomendado reutilizar contas da rede principal em redes de testes ou vice-versa.

## Pré-requisitos {#prerequisites}

Você deve entender os [conceitos básicos do Ethereum](/developers/docs/intro-to-ethereum/) antes de ler sobre as diferentes redes, pois as redes de teste lhe darão uma versão barata e segura do Ethereum para experimentar.

## Redes públicas {#public-networks}

As redes públicas são acessíveis a qualquer pessoa no mundo com uma conexão à Internet. Qualquer um pode ler ou criar transações em uma blockchain pública e validar as transações que estão sendo executadas. O consenso entre os pares decide sobre a inclusão de transações e o estado da rede.

### Mainnet do Ethereum {#ethereum-mainnet}

A rede principal é a blockchain de produção Ethereum pública primária, onde as transações de valor real ocorrem no livro-razão distribuído.

Quando as pessoas e as exchanges discutem os preços do ETH, eles estão falando sobre a rede principal ETH.

### Redes de teste do Ethereum {#ethereum-testnets}

Além da rede principal, existem redes de teste públicas. Essas são redes usadas por desenvolvedores de protocolo ou desenvolvedores de contrato inteligente para testar as atualizações de protocolo e também os contratos inteligentes em potencial em um ambiente de produção antes da implantação na rede principal. Pense nisso como um análogo a servidores de produção versus servidores de teste.

Você deve testar qualquer código de contrato que você escrever em uma rede de testes antes de publicar na Rede principal. Entre os dapps que se integram com contratos inteligentes existentes, a maioria dos projetos tem cópias publicadas em redes de teste.

A maioria das redes de teste começou usando um mecanismo de consenso de prova de autoridade permitido. Isso significa que um pequeno número de nós é escolhido para validar as transações e criar novos blocos, incluindo sua identidade no processo. Como alternativa, algumas redes de testes apresentam um mecanismo de consenso de prova de participação aberto, no qual todos podem testar a execução de um validador, assim como a Rede principal do Ethereum.

ETH em redes de teste (testnets) supostamente não tem valor real; entretanto, tem sido criados mercados para certos tipos de ETH de testnet que têm se tornado escassos ou difíceis de se obter. Como você precisa do ETH para realmente interagir com o Ethereum (mesmo em redes de teste), a maioria das pessoas obtém ETH em redes de teste gratuitamente em torneiras (faucets). A maioria das torneiras são aplicativos Web em que você pode inserir um endereço para o qual deseja que o ETH seja enviado.

#### Qual rede de testes devo usar?

As duas redes de teste públicas que os desenvolvedores do cliente estão mantendo atualmente são Sepolia e Hoodi. Sepolia é uma rede para desenvolvedores de contrato e aplicativos para testar seus aplicativos. A rede Hoodi permite que desenvolvedores de protocolo testem atualizações de rede e que stakers testem validadores em execução.

#### Sepolia {#sepolia}

**Sepolia é a rede de teste padrão recomendada para desenvolvimento de aplicativos**. A rede Sepolia usa um conjunto de validadores permissionado controlado por equipes de clientes e de testes.

##### Recursos

- [Site](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [Faucet da Sepolia da Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Faucet da Sepolia da Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Faucet da Sepolia da Chainstack](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Faucet do Ecossistema Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Faucet da Sepolia ethfaucet.com](https://ethfaucet.com/networks/ethereum)
- [Faucet da Sepolia do Google Cloud Web3](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet da Sepolia da Infura](https://www.infura.io/faucet)
- [Faucet PoW](https://sepolia-faucet.pk910.de/)
- [Faucet da Sepolia do QuickNode](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi é uma testnet para testes de validação e staking. A rede Hoodi está aberta para usuários que desejam executar um validador na rede de testes. Os participantes que desejam testar atualizações de protocolo antes de implantá-las na rede principal devem usar o Hoodi.

- Conjunto de validadores abertos, onde participantes podem testar atualizações da rede
- Estado grande, útil para testar interações complexas de contratos inteligentes
- Mais longo para sincronizar e requer mais armazenamento para executar um nó

##### Recursos

- [Site](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorador](https://explorer.hoodi.ethpandaops.io/)
- [Sincronização de Checkpoint](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucets

- [Faucet da Hoodi da Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Faucet da Hoodi](https://hoodi.ethpandaops.io/)
- [Faucet PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery é um tipo exclusivo de rede de testes que é totalmente reiniciada todo mês. O estado de execução e consenso retorna ao estado de gênese a cada 28 dias, o que significa que tudo o que acontece na rede de teste é efêmero. Isso o torna ideal para testes de curto prazo, bootstrap rápido de nós e aplicativos do tipo "olá, mundo" que não precisam de permanência.

- Estado sempre novo, testes de curto prazo de validadores e aplicativos
- Inclui apenas o conjunto básico de contratos
- Conjunto de validadores abertos e fácil acesso a grandes quantias de fundos
- Menores requisitos de nó e sincronização mais rápida, &lt;5GB em média

##### Recursos

- [Site](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Chat da comunidade](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Explorador da Beacon](https://beaconlight.ephemery.dev/)
- [Sincronização de Checkpoint](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Plataforma de lançamento](https://launchpad.ephemery.dev/)

#### Faucets

- [Faucet Bordel](https://faucet.bordel.wtf/)
- [Faucet PoW Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (obsoleta) {#holesky}

A rede de teste Holesky está obsoleta a partir de setembro de 2025. Operadores de staking e provedores de infraestrutura devem usar Hoodi para testes de validadores.

- [Anúncio de Desligamento da Rede de Teste Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog da EF, 1 de setembro de 2025_
- [Atualizações das Redes de Teste Holesky e Hoodi](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _Blog da EF, 18 de março de 2025_

### Redes de teste de camada 2 {#layer-2-testnets}

[Camada 2 (L2)](/layer-2/) é um termo coletivo para descrever um conjunto específico de soluções de escalabilidade do Ethereum. Uma camada 2 é uma cadeia de blocos separada que estende o Ethereum e herda as garantias de segurança do Ethereum. Normalmente, as redes de teste de camada 2 estão fortemente associadas às redes de testes públicas do Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Uma rede de teste para o [Arbitrum](https://arbitrum.io/).

##### Recursos

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Faucet da Arbitrum Sepolia da Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Faucet da Arbitrum Sepolia da Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Faucet da Arbitrum Sepolia ethfaucet.com](https://ethfaucet.com/networks/arbitrum)
- [Faucet da Arbitrum Sepolia do QuickNode](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Uma rede de teste para o [Optimism](https://www.optimism.io/).

##### Recursos

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Faucet da Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Faucet da Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Faucet da Optimism Sepolia ethfaucet.com](https://ethfaucet.com/networks/optimism)
- [Faucet da rede de teste](https://docs.optimism.io/app-developers/tools/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Uma rede de teste para a [Starknet](https://www.starknet.io).

##### Recursos

- [Starkscan](https://sepolia.starkscan.co/)

##### Faucets

- [Faucet da Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Faucet da Starknet Sepolia do Blast](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Faucet da Starknet](https://starknet-faucet.vercel.app/)

## Redes privadas {#private-networks}

Uma rede Ethereum é uma rede privada se seus nós não estiverem conectados a uma rede pública (ou seja, a Mainnet ou uma rede de teste). Neste contexto, privado significa apenas reservado ou isolado, em vez de protegido ou seguro.

### Redes de desenvolvimento {#development-networks}

Para desenvolver um aplicativo Ethereum, você deve executá-lo em uma rede privada para ver como funciona antes de implantá-lo. Tal como você pode criar um servidor local em seu computador para desenvolvimento Web, você pode criar uma instância local de blockchain para testar seu dapp. Isso permite uma iteração muito mais rápida do que uma rede de testes pública.

Existem projetos e ferramentas dedicadas a ajudá-lo com isso. Saiba mais sobre [redes de desenvolvimento](/developers/docs/development-networks/).

### Redes de consórcio {#consortium-networks}

O processo de consenso é controlado por um conjunto predefinido de nódulos confiáveis. Por exemplo, uma rede privada de instituições acadêmicas conhecidas, cada uma administrando um único nódulo, e os blocos são validados por um limite de signatários na rede.

Se uma rede pública Ethereum é como a internet pública, uma rede de consórcio é como uma intranet privada.

## <Emoji text="🚉" /> Por que as redes de teste do Ethereum recebem nomes de estações de metrô? {#why-naming}

Muitas redes de teste do Ethereum recebem nomes de estações de metrô ou de trem do mundo real. Essa tradição de nomenclatura começou cedo e reflete as cidades globais onde os contribuidores viveram ou trabalharam. É simbólico, memorável e prático. Assim como as redes de teste são isoladas da mainnet do Ethereum, as linhas de metrô funcionam separadamente do tráfego da superfície.

### <Emoji text="🚧" /> Redes de teste legadas e de uso comum {#common-and-legacy-testnets}

- **Sepolia** - Um bairro conectado por metrô em Atenas, Grécia. Atualmente usada para testes de contratos inteligentes e dApps.
- **Hoodi** - Nomeada em homenagem à estação de metrô Hoodi em Bengaluru, Índia. Usada para testes de validadores e de atualização de protocolo.
- **Goerli** _(obsoleta)_ - Nomeada em homenagem a Görlitzer Bahnhof em Berlim, Alemanha.
- **Rinkeby** _(obsoleta)_ - Nomeada em homenagem a um subúrbio de Estocolmo com uma estação de metrô.
- **Ropsten** _(obsoleta)_ - Refere-se a uma área e antigo terminal de balsa/metrô em Estocolmo.
- **Kovan** _(obsoleta)_ - Nomeada em homenagem a uma estação MRT de Singapura.
- **Morden** _(obsoleta)_ - Nomeada em homenagem a uma estação do metrô de Londres. A primeira rede de teste pública do Ethereum.

### <Emoji text="🧪" /> Outras redes de teste especializadas {#other-testnets}

Algumas redes de teste foram criadas para testes de curto prazo ou específicos de atualização e não são necessariamente temáticas de metrô:

- **Holesky** _(obsoleta)_ - Nomeada em homenagem à estação Holešovice em Praga. Usada para testes de validadores; obsoleta em 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(todas obsoletas)_ e **Ephemery** - Construídas especificamente para simulações de atualização como A Fusão, Xangai ou experimentos de validadores. Alguns nomes são regionais ou temáticos, em vez de baseados em metrô.

O uso de nomes de estações de metrô ajuda os desenvolvedores a identificar e lembrar rapidamente as redes de teste sem precisar depender de IDs de cadeia numéricos. Isso também reflete a cultura do Ethereum: prática, global e centrada no ser humano.

## Ferramentas relacionadas {#related-tools}

- [Chainlist](https://chainlist.org/) _lista de redes EVM para conectar carteiras e provedores aos IDs de cadeia e de rede apropriados_
- [Cadeias baseadas em EVM](https://github.com/ethereum-lists/chains) _repositório do GitHub com metadados de cadeias que alimenta o Chainlist_

## Leitura adicional {#further-reading}

- [Proposta: Ciclo de vida previsível da rede de teste do Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [A Evolução das Redes de Teste do Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
