---
title: Redes
description: "Uma visão geral das redes do Ethereum e onde obter ether (ETH) de rede de teste para testar seu aplicativo."
lang: pt-br
---

As redes do [Ethereum](/) são grupos de computadores conectados que se comunicam usando o protocolo Ethereum. Existe apenas uma Rede Principal do Ethereum (Mainnet), mas redes independentes em conformidade com as mesmas regras do protocolo podem ser criadas para fins de teste e desenvolvimento. Existem muitas "redes" independentes que estão em conformidade com o protocolo sem interagir umas com as outras. Você pode até iniciar uma localmente em seu próprio computador para testar seus contratos inteligentes e aplicativos Web3.

Sua conta Ethereum funcionará nas diferentes redes, mas o saldo da sua conta e o histórico de transações não serão transferidos da rede principal do Ethereum. Para fins de teste, é útil saber quais redes estão disponíveis e como obter ETH de rede de teste para experimentar. Em geral, por questões de segurança, não é recomendado reutilizar contas da Mainnet em redes de teste ou vice-versa.

## Pré-requisitos {#prerequisites}

Você deve entender o [básico do Ethereum](/developers/docs/intro-to-ethereum/) antes de ler sobre as diferentes redes, pois as redes de teste fornecerão uma versão barata e segura do Ethereum para você experimentar.

## Redes públicas {#public-networks}

As redes públicas são acessíveis a qualquer pessoa no mundo com uma conexão à internet. Qualquer pessoa pode ler ou criar transações em uma blockchain pública e validar as transações sendo executadas. O consenso entre os pares decide sobre a inclusão de transações e o estado da rede.

### Rede Principal do Ethereum {#ethereum-mainnet}

A Mainnet é a principal blockchain pública de produção do Ethereum, onde transações de valor real ocorrem no livro-razão distribuído.

Quando as pessoas e as corretoras discutem os preços do ETH, elas estão falando sobre o ETH da Mainnet.

### Redes de teste do Ethereum {#ethereum-testnets}

Além da Mainnet, existem redes de teste públicas. Estas são redes usadas por desenvolvedores de protocolo ou desenvolvedores de contratos inteligentes para testar tanto atualizações de protocolo quanto potenciais contratos inteligentes em um ambiente semelhante ao de produção antes da implantação na Mainnet. Pense nisso como um análogo a servidores de produção versus servidores de homologação.

Você deve testar qualquer código de contrato que escrever em uma rede de teste antes de implantar na Mainnet. Entre os aplicativos descentralizados (dapps) que se integram a contratos inteligentes existentes, a maioria dos projetos tem cópias implantadas em redes de teste.

A maioria das redes de teste começou usando um mecanismo de consenso de prova de autoridade (PoA) permissionado. Isso significa que um pequeno número de nós é escolhido para validar transações e criar novos blocos – colocando sua identidade em staking no processo. Alternativamente, algumas redes de teste apresentam um mecanismo de consenso de Prova de Participação (PoS) aberto, onde todos podem testar a execução de um validador, assim como na Rede Principal do Ethereum.

O ETH em redes de teste não deve ter valor real; no entanto, foram criados mercados para certos tipos de ETH de rede de teste que se tornaram escassos ou difíceis de obter. Como você precisa de ETH para realmente interagir com o Ethereum (mesmo em redes de teste), a maioria das pessoas obtém ETH de rede de teste gratuitamente em faucets. A maioria dos faucets são aplicativos da web onde você pode inserir um endereço para o qual solicita que o ETH seja enviado.

#### Qual rede de teste devo usar? {#which-testnet-should-i-use}

As duas redes de teste públicas que os desenvolvedores de clientes estão mantendo atualmente são Sepolia e Hoodi. A Sepolia é uma rede para desenvolvedores de contratos e aplicativos testarem seus aplicativos. A rede Hoodi permite que os desenvolvedores de protocolo testem atualizações de rede e permite que os stakers testem a execução de validadores.

#### Sepolia {#sepolia}

**A Sepolia é a rede de teste padrão recomendada para o desenvolvimento de aplicativos**. A rede Sepolia usa um conjunto de validadores permissionado controlado por equipes de clientes e de testes.

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
- [Faucet da Sepolia do ethfaucet.com](https://ethfaucet.com/networks/ethereum)
- [Faucet da Sepolia do Google Cloud Web3](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet da Sepolia da Infura](https://www.infura.io/faucet)
- [Faucet PoW](https://sepolia-faucet.pk910.de/)
- [Faucet da Sepolia da QuickNode](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

A Hoodi é uma rede de teste para testar a validação e o staking. A rede Hoodi é aberta para usuários que desejam executar um validador de rede de teste. Os stakers que desejam testar atualizações de protocolo antes de serem implantadas na Mainnet devem, portanto, usar a Hoodi.

- Conjunto de validadores aberto, os stakers podem testar atualizações de rede
- Estado grande, útil para testar interações complexas de contratos inteligentes
- Mais tempo para sincronização e requer mais armazenamento para executar um nó

##### Recursos

- [Site](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorador](https://explorer.hoodi.ethpandaops.io/)
- [Sincronização de ponto de verificação](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucets

- [Faucet da Hoodi da Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Faucet da Hoodi](https://hoodi.ethpandaops.io/)
- [Faucet PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

A Ephemery é um tipo único de rede de teste que é totalmente redefinida todos os meses. O estado de execução e consenso reverte para a gênese a cada 28 dias, o que significa que tudo o que acontece na rede de teste é efêmero. Isso a torna ideal para testes de curto prazo, inicialização rápida de nós e aplicativos do tipo 'hello world' que não precisam de permanência.

- Estado sempre novo, testes de curto prazo de validadores e aplicativos
- Inclui apenas um conjunto básico de contratos
- Conjunto de validadores aberto e fácil acesso a grandes quantidades de fundos
- Menores requisitos de nó e sincronização mais rápida, &lt;5GB em média

##### Recursos

- [Site](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Bate-papo da comunidade](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Explorador da Beacon](https://beaconlight.ephemery.dev/)
- [Sincronização de ponto de verificação](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucets {#faucets}

- [Faucet Bordel](https://faucet.bordel.wtf/)
- [Faucet PoW Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (obsoleta) {#holesky}

A rede de teste Holesky foi descontinuada a partir de setembro de 2025. Operadores de staking e provedores de infraestrutura devem usar a Hoodi para testes de validador em vez disso.

- [Anúncio de encerramento da rede de teste Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog da EF, 1 de setembro de 2025_
- [Atualizações das redes de teste Holesky e Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _Blog da EF, 18 de março de 2025_

### Redes de teste de camada 2 {#layer-2-testnets}

[camada 2 (l2)](/layer-2/) é um termo coletivo para descrever um conjunto específico de soluções de escalabilidade do Ethereum. Uma camada 2 é uma blockchain separada que estende o Ethereum e herda as garantias de segurança do Ethereum. As redes de teste de camada 2 geralmente estão intimamente acopladas às redes de teste públicas do Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Uma rede de teste para a [Arbitrum](https://arbitrum.io/).

##### Recursos

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Faucet da Arbitrum Sepolia da Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Faucet da Arbitrum Sepolia da Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Faucet da Arbitrum Sepolia do ethfaucet.com](https://ethfaucet.com/networks/arbitrum)
- [Faucet da Arbitrum Sepolia da QuickNode](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Uma rede de teste para a [Optimism](https://www.optimism.io/).

##### Recursos

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Faucet da Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Faucet da Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Faucet da Optimism Sepolia do ethfaucet.com](https://ethfaucet.com/networks/optimism)
- [Faucet de rede de teste](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Uma rede de teste para a [Starknet](https://www.starknet.io).

##### Recursos

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucets

- [Faucet da Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Faucet da Starknet Sepolia da Blast](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Faucet da Starknet](https://starknet-faucet.vercel.app/)

## Redes privadas {#private-networks}

Uma rede Ethereum é uma rede privada se seus nós não estiverem conectados a uma rede pública (ou seja, Mainnet ou uma rede de teste). Neste contexto, privada significa apenas reservada ou isolada, em vez de protegida ou segura.

### Redes de desenvolvimento {#development-networks}

Para desenvolver um aplicativo Ethereum, você vai querer executá-lo em uma rede privada para ver como ele funciona antes de implantá-lo. Semelhante a como você cria um servidor local em seu computador para desenvolvimento web, você pode criar uma instância de blockchain local para testar seu aplicativo descentralizado (dapp). Isso permite uma iteração muito mais rápida do que uma rede de teste pública.

Existem projetos e ferramentas dedicados a ajudar com isso. Saiba mais sobre [redes de desenvolvimento](/developers/docs/development-networks/).

### Redes de consórcio {#consortium-networks}

O processo de consenso é controlado por um conjunto predefinido de nós que são confiáveis. Por exemplo, uma rede privada de instituições acadêmicas conhecidas que governam cada uma um único nó, e os blocos são validados por um limite de signatários dentro da rede.

Se uma rede pública do Ethereum é como a internet pública, uma rede de consórcio é como uma intranet privada.

## <Emoji text="🚉" /> Por que as redes de teste do Ethereum têm nomes de estações de metrô? {#why-naming}

Muitas redes de teste do Ethereum têm nomes de estações de metrô ou trem do mundo real. Essa tradição de nomenclatura começou cedo e reflete as cidades globais onde os colaboradores viveram ou trabalharam. É simbólico, memorável e prático. Assim como as redes de teste são isoladas da Mainnet do Ethereum, as linhas de metrô funcionam separadamente do tráfego de superfície.

### <Emoji text="🚧" /> Redes de teste comumente usadas e legadas {#common-and-legacy-testnets}

- **Sepolia** - Um bairro ligado ao metrô em Atenas, Grécia. Atualmente usada para testes de contratos inteligentes e dapps.
- **Hoodi** - Nomeada em homenagem à estação de metrô Hoodi em Bengaluru, Índia. Usada para testes de validador e atualização de protocolo.
- **Goerli** _(obsoleta)_ - Nomeada em homenagem à Görlitzer Bahnhof em Berlim, Alemanha.
- **Rinkeby** _(obsoleta)_ - Nomeada em homenagem a um subúrbio de Estocolmo com uma estação de metrô.
- **Ropsten** _(obsoleta)_ - Refere-se a uma área e antigo terminal de balsa/metrô em Estocolmo.
- **Kovan** _(obsoleta)_ - Nomeada em homenagem a uma estação de MRT de Singapura.
- **Morden** _(obsoleta)_ - Nomeada em homenagem a uma estação do metrô de Londres. A primeira rede de teste pública do Ethereum.

### <Emoji text="🧪" /> Outras redes de teste especializadas {#other-testnets}

Algumas redes de teste foram criadas para testes de curto prazo ou específicos de atualização e não têm necessariamente o tema de metrô:

- **Holesky** _(obsoleta)_ - Nomeada em homenagem à estação Holešovice em Praga. Usada para testes de validador; descontinuada em 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(todas obsoletas)_ e **Ephemery** - Construídas especificamente para simulações de atualização como The Merge, Shanghai ou experimentos de validador. Alguns nomes são regionais ou temáticos em vez de baseados em metrô.

Usar nomes de estações de metrô ajuda os desenvolvedores a identificar e lembrar rapidamente das redes de teste sem precisar depender de IDs de cadeia numéricos. Isso também reflete a cultura do Ethereum: prática, global e centrada no ser humano.

## Ferramentas relacionadas {#related-tools}

- [Chainlist](https://chainlist.org/) _lista de redes EVM para conectar carteiras e provedores ao ID de cadeia e ID de rede apropriados_
- [Cadeias baseadas em EVM](https://github.com/ethereum-lists/chains) _Repositório do GitHub de metadados de cadeia que alimenta a Chainlist_

## Leitura adicional {#further-reading}

- [Proposta: Ciclo de vida previsível da rede de teste do Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [A evolução das redes de teste do Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)