---
title: Nós e clientes
description: Uma visão geral dos nós do Ethereum e do software do cliente, além de como configurar um nó e por que você deve fazer isso.
lang: pt-br
sidebarDepth: 2
---

O Ethereum é uma rede distribuída de computadores (conhecidos como nós) executando softwares que podem verificar blocos e dados de transação. O software tem de ser rodado no seu computador para ele se tornar um nó Ethereum. Existem dois pedaços separados de software (conhecidos como 'clientes') necessários para formar um nó.

## Pré-requisitos {#prerequisites}

Você deve entender o conceito de uma rede peer-to-peer e os conceitos básicos [do EVM](/developers/docs/evm/) antes de mergulhar mais fundo e executar a sua própria instância de um cliente Ethereum. Veja nossa [introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

Se você é novo no tema dos nós, recomendamos primeiro verificar nossa introdução amigável no [rodando um nó Ethereum](/run-a-node).

## O que são nós e clientes? {#what-are-nodes-and-clients}

Um "nó" é qualquer instância de software do cliente Ethereum que esteja conectado a outros computadores também executando o software Ethereum, formando uma rede. Um cliente é uma implementação do Ethereum que verifica os dados em relação às regras do protocolo e mantém a rede segura. Um nó tem que rodar dois clientes: um cliente de consenso e um cliente de execução.

- O cliente de execução (também conhecido como Execution Engine, cliente EL ou anteriormente cliente Eth1) ouve novas transações transmitidas na rede, executa-as na EVM e mantém o estado mais recente e o banco de dados de todos os dados atuais do Ethereum.
- O cliente de consenso (também conhecido como Beacon Node, cliente CL ou anteriormente cliente Eth2) implementa o algoritmo de consenso de prova de participação, o qual permite que a rede realize um acordo com base nos dados validados do cliente de execução. Há também um terceiro pedaço de software, conhecido como 'validador' que pode ser adicionado ao cliente de consenso, permitindo que um nó participe na segurança da rede.

Estes clientes trabalham juntos para manter rastreabilidade da cabeça da cadeia Ethereum e permitir usuários interagir com a rede Ethereum. O desenho modular com várias peças de software trabalhando em conjunto é chamado de [complexidade encapsulada](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Esta abordagem facilitou executar o [The Merge](/roadmap/merge) perfeitamente, faz softwares clientes mais fáceis de manter e desenvolver, e permite reusar clientes individuais, por exemplo, no [ecossistema camada 2](/layer-2/).

![Execução de acoplamento e clientes de consenso](./eth1eth2client.png) Diagrama simplificado de uma execução associada e de um cliente de consenso.

### Diversidade dos clientes {#client-diversity}

Tanto [clientes de execução](/developers/docs/nodes-and-clients/#execution-clients) quanto [clientes de consenso](/developers/docs/nodes-and-clients/#consensus-clients) existem em uma variedade de linguagens de programação desenvolvidas por diferentes equipes.

As implementações de vários clientes podem tornar a rede mais forte, reduzindo sua dependência de uma única base de código. O objetivo ideal é alcançar a diversidade sem que nenhum cliente domine a rede, eliminando assim um ponto único de falha potencial. A variedade de idiomas também convida uma comunidade de desenvolvedores mais ampla e permite que eles criem integrações em seu idioma preferido.

Saiba mais sobre a [diversidade do cliente](/developers/docs/nodes-and-clients/client-diversity/).

O que essas implementações têm em comum é que todas seguem uma única especificação. As especificações ditam como a rede Ethereum e a cadeia de blocos funcionam. Cada detalhe técnico é definido e as especificações podem ser encontradas como:

- Originalmente, o [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Especificações de execução](https://github.com/ethereum/execution-specs/)
- [Especificações de consenso](https://github.com/ethereum/consensus-specs)
- [EIPs](https://eips.ethereum.org/) implementados em várias [atualizações de rede](/history/)

### Rastreamento de nós na rede {#network-overview}

Vários rastreadores oferecem uma visão geral em tempo real dos nós na rede Ethereum. Observe que, devido à natureza das redes descentralizadas, esses rastreadores podem fornecer apenas uma visão limitada da rede e podem relatar resultados diferentes.

- Mapa de nós pela Etherscan
- Ethernodes da Bitfly
- [Nodewatch](https://www.nodewatch.io/) por Chainsafe, rastreando nós de consenso

## Tipos de nó {#node-types}

Se você quer [executar o seu próprio nó](/developers/docs/nodes-and-clients/run-a-node/), você deve entender que existem diferentes tipos de nós que consomem dados de modo diferente. Na verdade, os clientes podem executar 3 tipos diferentes de nó: leve, completo e arquivo. Existem também opções de diferentes estratégias de sincronização que permitem um tempo de sincronização mais rápida. A sincronização se refere ao quão rápido ele pode obter as informações mais atualizadas sobre o estado do Ethereum.

### Nó completo {#full-node}

Nós completos fazem uma validação bloco-a-bloco do blockchain, incluindo baixar e verificar o corpo do bloco e dados de estado para cada bloco. Há diferentes classes de nó completo - algumas começam do bloco gênesis e verificam cada bloco no histórico inteiro do blockchain. Outras começam sua verificação em um bloco mais recente que eles confiam ser válido (por exemplo, o 'snap sync' do Geth). Independente de onde a verificação começa, nós completos somente mantém uma cópia local de dados relativamente recentes (tipicamente os 128 blocos mais recentes), permitindo dados mais antigos serem excluídos para economizar espaço em disco. Dados mais antigos podem ser regerados quando necessário.

- Armazena os dados completos da cadeia de blocos (embora isso seja periodicamente reduzido para que um nó completo não armazene todos os dados de estado de volta à origem)
- Participa na validação de bloco, verifica todos os blocos e estados.
- Todos os estados podem ser recuperados do storage local ou regerados dos 'snapshots' por um nó completo.
- Serve a rede e fornece dados mediante solicitação.

### Nó de arquivo {#archive-node}

Nós de arquivo são nós completos que verificam cada bloco desde o gênese e nunca excluem nada dos dados baixados.

- Armazena tudo o que é mantido no nó completo e constrói um arquivo de estados históricos. Ele é necessário se você quiser consultar algo como um saldo de conta no bloco #4.000.000, ou testar de forma simples e confiável seu próprio conjunto de transações sem minerá-las usando rastreamento.
- Esses dados representam unidades de terabytes, o que torna os nós de arquivo menos atraentes para usuários comuns, mas pode ser útil para serviços como exploradores de blocos, fornecedores de carteiras e análises da cadeia.

Sincronizar clientes em qualquer modo que não seja o de arquivo resultará na remoção de dados da cadeia de blocos. Isso significa que não há arquivo de todo o estado histórico, mas o nó completo é capaz de criá-lo sob demanda.

Saiba mais sobre [Nós de arquivo](/developers/docs/nodes-and-clients/archive-nodes).

### Nó leve {#light-node}

Em vez de baixar cada bloco, nós leves baixam somente os cabeçalhos dos blocos. Esses cabeçalhos contêm informações resumidas sobre o conteúdo dos blocos. Qualquer outra informação necessária pelo nó leve é solicitada de um nó completo. O nó leve pode então verificar de modo independente os dados que ele recebe em relação às raízes de estado nos cabeçalhos de bloco. Os nós leves permitem que os usuários participem da rede Ethereum sem o hardware poderoso ou a alta largura de banda necessária para executar nós completos. Por fim, os nós leves podem ser executados em telefones celulares ou dispositivos embutidos. Os nós leves não participam do consenso (ou seja, eles não podem ser mineradores/validadores), mas podem acessar a cadeia de blocos Ethereum com as mesmas funcionalidades e garantias de segurança de um nó completo.

Clientes leves são uma área de desenvolvimento ativo para o Ethereum e esperamos ver em breve novos clientes leves para a camada de consenso e a camada de execução. Também existem rotas em potencial para fornecer dados de clientes leves pela [rede gossip](https://www.ethportal.net/). Isso é vantajoso porque a rede gossip pode suportar uma rede de nós leves sem exigir nós completos para atender às solicitações.

O Ethereum ainda não suporta uma grande quantidade de nós leves, mas o suporte a nós leves é uma área que deve se desenvolver rapidamente em um futuro próximo. Em particular, clientes como [Nimbus](https://nimbus.team/), [Hélios](https://github.com/a16z/helios), e [LodeStar](https://lodestar.chainsafe.io/) atualmente estão bastante concentrados em nós leves.

## Por que devo executar um nó Ethereum? {#why-should-i-run-an-ethereum-node}

A execução de um nó permite que você use o Ethereum de forma direta, confiável e privada, enquanto dá suporte à rede, mantendo-a mais robusta e descentralizada.

### Vantagens para você {#benefits-to-you}

A execução de seu próprio nó permite que você use o Ethereum de maneira privada, autossuficiente e confiável. Você não precisa confiar na rede porque você pode verificar os dados por conta própria com seu cliente. “Não confie, verifique” é um mantra popular da cadeia de blocos.

- Seu nó verifica todas as transações e blocos contra as regras de consenso por si só. Isso significa que você não precisa confiar em nenhum outro nó da rede nem confiar totalmente neles.
- Você pode usar uma carteira Ethereum com seu próprio nó. Você pode usar dapps com mais segurança e privacidade porque você não precisará vazar seus endereços e saldos para intermediários. Tudo pode ser verificado com seu próprio cliente. [MetaMask](https://metamask.io), [Frame](https://frame.sh/) e [muitas outras carteiras](/wallets/find-wallet/) oferecem importação de RPC, permitindo que elas usem seu nó.
- Você pode executar e auto-hospedar outros serviços que dependem de dados do Ethereum. Por exemplo, isso pode ser um validador Beacon Chain, software como camada 2, infraestrutura, exploradores de bloco, processadores de pagamento etc.
- Você pode fornecer seus próprios [pontos de extremidade RPC](/developers/docs/apis/json-rpc/) personalizados. Você pode até oferecer endpoints publicamente para a comunidade para ajudá-los a evitar fornecedores grandes centralizados.
- Você pode se conectar ao seu nó usando **Comunicações entre processos (IPC)** ou reescrever o nó para carregar seu programa como um plugin. Isso garante baixa latência, o que ajuda muito, por exemplo, ao processar muitos dados usando bibliotecas Web3 ou quando você precisa substituir suas transações o mais rápido possível (isto é, de forma acelerada).
- Você pode colocar ETH diretamente para proteger a rede e ganhar recompensas. Veja [participação solo](/staking/solo/) para começar.

![Como você acessar o Ethereum através do seu aplicativo e nós](./nodes.png)

### Benefícios da rede {#network-benefits}

Um conjunto diversificado de nós é importante para a integridade, segurança e resiliência operacional do Ethereum.

- Os nós completos impõem as regras de consenso para que não possam ser induzidos a aceitar blocos que não as seguem. Isso fornece segurança extra na rede, pois se todos os nós fossem nós leves, que não fazem a verificação completa, os validadores poderiam atacar a rede.
- No caso de um ataque que supere as defesas criptoeconômicas de [prova de participação](/developers/docs/consensus-mechanisms/pos/#what-is-pos), uma recuperação social pode ser realizada por nós completos escolhendo seguir a cadeia honesta.
- Mais nós na rede resultam em uma rede mais diversificada e robusta, o objetivo final da descentralização, que permite um sistema confiável e resistente à censura.
- Nós completos fornecem acesso a dados do blockchain para clientes leves que dependem disso. Os nós leves não armazenam toda a cadeia de blocos. Em vez disso, eles verificam dados por meio das [raízes do estado nos cabeçalhos de blocos](/developers/docs/blocks/#block-anatomy). Eles podem solicitar mais informações dos nós completos, se precisarem.

Se você rodar um nó completo, toda a rede Ethereum se beneficia dele, mesmo se você não rodar um validador.

## Executando seu próprio nó {#running-your-own-node}

Interessado em executar o seu próprio cliente Ethereum?

Para ver uma introdução simplificada para iniciantes, visite a nossa página [Executar um nó](/run-a-node) para saber mais.

Se você é mais que um usuário técnico, mergulhe em mais detalhes e opções sobre como [executar o seu próprio nó](/developers/docs/nodes-and-clients/run-a-node/).

## Alternativas {#alternatives}

Configurar seu próprio nó pode custar tempo e recursos, mas nem sempre você precisa executar sua própria instância. Nesse caso, é possível usar um provedor de APIs externo. Para obter uma visão geral do uso desses serviços, confira [nós como serviço](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Se alguém executar um nó do Ethereum com uma API pública em sua comunidade, você pode apontar suas carteiras para um nó da comunidade por meio de um RPC personalizado.

Por outro lado, se você executar um cliente, você pode compartilhá-lo com quem precisar.

## Clientes de execução {#execution-clients}

A comunidade do Ethereum mantém vários clientes de execução (previamente conhecidos como clientes “Eth1”, ou apenas “clientes Ethereum”) de código aberto, desenvolvidos por diferentes equipes usando diferentes linguagens de programação. Isso torna a rede mais forte e [diversificada](/developers/docs/nodes-and-clients/client-diversity/). O objetivo ideal é alcançar a diversidade sem que nenhum cliente predomine, a fim de reduzir os pontos únicos de falha.

Essa tabela resume os diferentes clientes. Todos eles passam por [testes de cliente](https://github.com/ethereum/tests) e são mantidos ativamente para ter as atualizações de rede em dia.

| Client                                                                   | Linguagem de programação | Sistemas operacionais | Redes                            | Estratégias de sincronização                                            | Limpeza de estado |
| ------------------------------------------------------------------------ | ------------------------ | --------------------- | -------------------------------- | ----------------------------------------------------------------------- | ----------------- |
| [Geth](https://geth.ethereum.org/)                                       | Go                       | Linux, Windows, macOS | Rede principal, Sepolia, Holesky | [Instantânea](#snap-sync), [Completa](#full-sync)                       | Arquivo, Removido |
| [Nethermind](https://www.nethermind.io/)                                 | C#, .NET                 | Linux, Windows, macOS | Rede principal, Sepolia, Holesky | [Instantânea](#snap-sync) (sem serviço), Rápida, [Completa](#full-sync) | Arquivo, Removido |
| [Besu](https://besu.hyperledger.org/en/stable/)                          | Java                     | Linux, Windows, macOS | Rede principal, Sepolia, Holesky | [Instantânea](#snap-sync), [Rápida](#fast-sync), [Completa](#full-sync) | Arquivo, Removido |
| [Erigon](https://github.com/ledgerwatch/erigon)                          | Go                       | Linux, Windows, macOS | Rede principal, Sepolia, Holesky | [Completo](#full-sync)                                                  | Arquivo, Removido |
| [Reth](https://reth.rs/)                                                 | Rust                     | Linux, Windows, macOS | Rede principal, Sepolia, Holesky | [Completo](#full-sync)                                                  | Arquivo, Removido |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(beta)_ | TypeScript               | Linux, Windows, macOS | Sepolia, Holesky                 | [Completo](#full-sync)                                                  | Removido          |

Para saber mais sobre redes suportadas, leia sobre as [redes Ethereum](/developers/docs/networks/).

Cada cliente tem casos de uso e vantagens exclusivas, então você deve escolher um com base nas suas próprias preferências. A diversidade permite que as implementações se concentrem em diferentes recursos e públicos de usuários. Você pode escolher um cliente baseado em recursos, suporte, linguagem de programação ou licenças.

### Besu {#besu}

Hyperledger Besu é um cliente Ethereum de nível empresarial para redes públicas e autorizadas. Ele executa todos os recursos da Rede principal (Mainnet) do Ethereum, do rastreamento ao GraphQL, possui monitoramento extensivo e é suportado pela ConsenSys, tanto em canais comunitários abertos, quanto por meio de SLAs (contratos) comerciais para empresas. Ele é escrito em Java e tem licença Apache 2.0.

A extensa [documentação](https://besu.hyperledger.org/en/stable/) do Besu irá guiar você por todos os detalhes sobre seus recursos e configurações.

### Erigon {#erigon}

Erigon, anteriormente conhecido como Turbo-Geth, começou como uma bifurcação do Go Ethereum orientado para velocidade e eficiência de espaço em disco. Erigon é uma implementação completamente rearquitetada do Ethereum, atualmente escrita em Go, mas com implementações em outras linguagens em desenvolvimento. O objetivo do Erigon é fornecer uma implementação mais rápida, modular e otimizada do Ethereum. Ele pode realizar uma sincronização completa do nó de arquivamento usando cerca de 2 TB de espaço em disco, em menos de 3 dias.

### Go Ethereum {#geth}

Go Ethereum (Geth, para abreviar) é uma das implementações originais do protocolo Ethereum. Atualmente, ele é o cliente mais difundido, com a maior base de usuários e variedade de ferramentas para usuários e desenvolvedores. Ele está escrito em Go, é totalmente de código aberto e sob licença GNU LGPL v3.

Saiba mais sobre Geth em sua [documentação](https://geth.ethereum.org/docs/).

### Nethermind {#nethermind}

Nethermind é uma implementação do Ethereum criada com a pilha de tecnologia C# .NET, licenciada com LGPL-3.0, em execução em todas as principais plataformas, incluindo ARM. Ela oferece grande desempenho com:

- uma máquina virtual otimizada
- acesso ao estado
- rede e recursos avançados, como painéis Prometheus/Grafana, suporte a registro de logs com Seq. Enterprise, rastreamento JSON-RPC e plugins de análise.

Nethermind também tem uma [documentação detalhada](https://docs.nethermind.io), um suporte eficaz ao desenvolvedor, uma comunidade online e suporte 24 horas por dia disponível para usuários Premium.

### Reth {#reth}

O Reth (abreviação de Rust Ethereum) é uma implementação de nó completo do Ethereum fácil de usar, altamente modular, rápida e eficiente. O Reth foi originalmente desenvolvido e impulsionado pela Paradigm e está sob as licenças Apache e MIT.

O Reth está pronto para produção e é adequado para uso em ambientes de essenciais, como staking ou serviços que exigem um tempo de atividade alto. Apresenta bom desempenho em casos de uso em que é necessário alto desempenho com grandes margens, como RPC, MEV, indexação, simulações e atividades P2P.

Para saber mais, consulte o [Reth Book](https://reth.rs/) ou o repositório [Reth GitHub](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### Em desenvolvimento {#execution-in-development}

Esses clientes ainda estão em estágios iniciais de desenvolvimento e ainda não são recomendados para uso em produção.

#### EthereumJS {#ethereumjs}

O cliente de execução EthereumJS (EthereumJS) foi escrito em TypeScript e é composto de vários pacotes, incluindo os principais primitivos do Ethereum representados pelas classes Block, Transaction e Merkle-Patricia Trie e os principais componentes do cliente, incluindo uma implementação da Máquina Virtual do Ethereum (EVM), uma classe de blockchain, e a pilha de rede DevP2P.

Saiba mais sobre ele lendo a [documentação](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master) correspondente

## Clientes de consenso {#consensus-clients}

Existem vários clientes de consenso (anteriormente conhecidos como clientes “Eth2”) para oferecer suporte às [atualizações de consenso](/roadmap/beacon-chain/). Eles são responsáveis por toda lógica de consenso, incluindo o algoritmo de escolha de fork, atestados de processamento e gerenciamento de recompensas e penalidades [proof-of-stake](/developers/docs/consensus-mechanisms/pos).

| Cliente                                                       | Linguagem de programação | Sistemas operacionais | Redes                                                          |
| ------------------------------------------------------------- | ------------------------ | --------------------- | -------------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust                     | Linux, Windows, macOS | Beacon Chain, Goerli, Pyrmont, Sepolia, Ropsten e mais         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript               | Linux, Windows, macOS | Beacon Chain, Goerli, Sepolia, Ropsten e mais                  |
| [Nimbus](https://nimbus.team/)                                | Nim                      | Linux, Windows, macOS | Beacon Chain, Goerli, Sepolia, Ropsten e mais                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/)   | Go                       | Linux, Windows, macOS | Beacon Chain, Gnosis, Goerli, Pyrmont, Sepolia, Ropsten e mais |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java                     | Linux, Windows, macOS | Beacon Chain, Gnosis, Goerli, Sepolia, Ropsten e mais          |

### Lighthouse {#lighthouse}

Lighthouse é uma implementação de cliente de consenso escrita em Rust sob licença Apache-2.0. Ele é mantido pela Sigma Prime e tem estado estável e pronto para produção desde a origem da Beacon Chain. Ele é utilizado por várias empresas, pools de participação (staking) e indivíduos. Ela visa ser segura, eficiente e interoperável em uma ampla variedade de ambientes, de PCs desktop a implantações automatizadas sofisticadas.

A documentação está disponível no [Livro da Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar é uma implementação de cliente de consenso pronta para produção escrita em Typescript sob a licença LGPL-3.0. Ele é mantido pela ChainSafe Systems e é o mais novo dos clientes de consenso para participantes-solo (solo-stakers), desenvolvedores e pesquisadores. A Lodestar consiste em um nó beacon e um cliente validador alimentado por implementações JavaScript de protocolos Ethereum. O Lodestar visa melhorar a usabilidade do Ethereum com clientes leves, expandir a acessibilidade a um grupo maior de desenvolvedores e contribuir ainda mais para a diversidade do ecossistema.

Mais informações podem ser encontradas em nosso [site da Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus é uma implementação de cliente de consenso escrita em Nim sob a licença Apache-2.0. Ele é um cliente pronto para produção em uso por participantes-solo e pools de participação (staking). A Nimbus foi projetada para eficiência de recursos, facilitando a execução em dispositivos com recursos restritos e infraestrutura corporativa com a mesma facilidade, sem comprometer a estabilidade ou o desempenho da recompensa. Uma memória de recursos mais leve significa que o cliente tem uma maior margem de segurança quando a rede está sob estresse.

Saiba mais na [documentação da Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

O Prysm é um cliente de consenso de código aberto completo, escrito em Go sob a licença GPL-3.0. Ele apresenta uma interface de usuário de aplicativo Web opcional e prioriza a experiência do usuário, a documentação e a configurabilidade para usuários institucionais e particulares.

Visite a [documentação do Prysm](https://docs.prylabs.network/docs/getting-started/) para saber mais.

### Teku {#teku}

Teku é um dos clientes originais da origem da Beacon Chain. Além dos objetivos habituais (segurança, robustez, estabilidade, usabilidade, desempenho), o Teku visa especificamente cumprir integralmente todos os padrões de cliente de consenso.

O Teku oferece opções de implantação muito flexíveis. O nó beacon e o cliente validador podem ser executados juntos como um único processo, o que é extremamente conveniente para participantes solo (solo stakers), ou os nós podem ser executados separadamente para operações de participação sofisticadas. Além disso, o Teku é totalmente interoperável com o [Web3Signer](https://github.com/ConsenSys/web3signer/) para proteger as chaves de assinatura e protegê-las contra remoções.

O Teku é escrito em Java e sob a licença Apache 2.0. Ele é desenvolvido pela equipe de Protocolos da ConsenSys, que também é responsável pelo Besu e Web3Signer. Saiba mais na [documentação do Teku](https://docs.teku.consensys.net/en/latest/).

## Modos de sincronização {#sync-modes}

Para acompanhar e verificar os dados atuais na rede, o cliente Ethereum precisa sincronizar com o estado da rede mais recente. Para isso, é necessário baixar dados de pares, verificar criptograficamente sua integridade e construir um banco de dados local da cadeia de blocos.

Os modos de sincronização representam diferentes abordagens para esse processo com várias compensações. Os clientes também variam em sua implementação de algoritmos de sincronização. Sempre consulte a documentação oficial do cliente escolhido para obter detalhes sobre a implementação.

### Modos de sincronização na camada de execução {#execution-layer-sync-modes}

A camada de execução pode ser executada em diferentes modos para se adequar a diferentes casos de uso, desde a reexecução do estado geral da blockchain até a sincronização apenas com a parte inicial da cadeia a partir de um ponto de verificação confiável.

#### Sincronização completa {#full-sync}

Uma sincronização completa faz o download de todos os blocos (incluindo cabeçalhos e corpos de blocos) e regenera o estado da blockchain de forma incremental, executando cada bloco desde a gênese.

- Minimiza a confiança e oferece a mais alta segurança, verificando cada transação.
- Com um número crescente de transações, pode levar dias ou semanas para processar todas as transações.

Os [nós de arquivo](#archive-node) realizam uma sincronização completa para criar (e manter) um histórico completo das alterações de estado feitas por cada transação em cada bloco.

#### Sincronização rápida {#fast-sync}

Assim como uma sincronização completa, uma sincronização rápida baixa todos os blocos (incluindo cabeçalhos, transações e recibos). No entanto, em vez de reprocessar as transações históricas, uma sincronização rápida se baseia nos recibos até chegar a um cabeçalho recente, quando passa a importar e processar blocos para fornecer um nó completo.

- Estratégia de sincronização rápida.
- Reduz a demanda de processamento em favor do uso da largura de banda.

#### Sincronização instantânea {#snap-sync}

As sincronizações instantâneas também verificam a cadeia bloco a bloco. No entanto, em vez de começar no bloco de gênese, uma sincronização instantânea começa em um ponto de verificação "confiável" mais recente conhecido por fazer parte da verdadeira blockchain. O nó grava pontos de checagem periódicos enquanto exclui dados mais velhos que uma certa idade. Esses instantâneos são usados para regenerar os dados de estado conforme necessário, em vez de armazená-los para sempre.

- Estratégia de sincronização mais rápida, atualmente padrão na rede principal Ethereum.
- Economiza muito uso de disco e largura de banda de rede sem sacrificar a segurança.

[Mais sobre sincronização instantânea](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Sincronização leve {#light-sync}

O modo cliente leve baixa todos os cabeçalhos de bloco, dados de bloco e verifica alguns aleatoriamente. Somente sincroniza a ponta da cadeia do ponto de verificação confiável.

- Obtém apenas o estado mais recente, enquanto conta com a confiança dos desenvolvedores e o mecanismo de consenso.
- Cliente pronto para uso com o estado atual da rede em poucos minutos.

**NB** A sincronização leve ainda não funciona com a prova de participação do Ethereum — novas versões de sincronização leve deverão ser lançadas em breve!

[Mais sobre clientes leves](/developers/docs/nodes-and-clients/light-clients/)

### Modos de sincronização de camada de consenso {#consensus-layer-sync-modes}

#### Sincronização otimista {#optimistic-sync}

A sincronização otimista é uma estratégia de sincronização pós-fusão projetada para ser compatível por aceitação (opt-in) e com versões anteriores, permitindo que os nós de execução sincronizem por meio de métodos estabelecidos. O mecanismo de execução pode, de modo _otimista_, importar blocos beacon sem verificá-los completamente, encontrar o cabeçalho mais recente e começar a sincronizar a cadeia com os métodos acima. Em seguida, após a atualização do cliente de execução, ele informará ao cliente de consenso sobre a validade das transações na Beacon Chain.

[Mais sobre sincronização otimista](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### Sincronização de ponto de verificação {#checkpoint-sync}

Uma sincronização de ponto de verificação, também conhecida como sincronização de subjetividade fraca, cria uma experiência de usuário superior para a sincronização de um Beacon Node. Ela se baseia em suposições de [subjetividade fraca](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) que permitem a sincronização da Beacon Chain a partir de um ponto de verificação recente de subjetividade fraca em vez da gênese. As sincronizações de ponto de verificação tornam o tempo de sincronização inicial significativamente mais rápido com suposições de confiança semelhantes às da sincronização de [gênese](/glossary/#genesis-block).

Na prática, isso significa que seu nó se conecta a um serviço remoto para baixar os estados finalizados recentes e continua verificando os dados a partir desse ponto. O terceiro que fornece os dados é confiável e deve ser escolhido com cuidado.

Mais sobre [sincronização do ponto de verificação](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Leitura adicional {#further-reading}

- [Ethereum 101 – Parte 2 – Entendendo os nós](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _–Wil Barnes, 13 de fevereiro de 2019_
- [Executando nós completos do Ethereum: um guia para os pouco motivados](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _— Justin Leroux, 7 de novembro de 2019_

## Tópicos relacionados {#related-topics}

- [Blocos](/developers/docs/blocks/)
- [Redes](/developers/docs/networks/)

## Tutoriais relacionados {#related-tutorials}

- [Transforme seu Raspberry Pi 4 em um nó validador apenas instalando o cartão MicroSD – Guia de instalação](/developers/tutorials/run-node-raspberry-pi/) _– Ligue seu Raspberry Pi 4, conecte um cabo Ethernet, conecte o disco SSD e ligue o dispositivo para transformar o Raspberry Pi 4 em um nó Ethereum completo executando a camada de execução (Rede principal) e/ou a camada de consenso (Beacon Chain / validador)._
