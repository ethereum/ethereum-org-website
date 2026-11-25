---
title: "Áreas ativas de pesquisa da Ethereum"
description: "Explore diferentes áreas de pesquisa aberta e saiba como se envolver."
lang: pt-br
---

Um dos principais pontos fortes da Ethereum é que uma comunidade ativa de pesquisa e engenharia a está melhorando constantemente. Muitas pessoas entusiasmadas e qualificadas em todo o mundo gostariam de se dedicar a questões pendentes na Ethereum, mas nem sempre é fácil descobrir quais são essas questões. Esta página descreve as principais áreas ativas de pesquisa como um guia geral para a vanguarda da Ethereum.

## Como funciona a pesquisa da Ethereum {#how-ethereum-research-works}

A pesquisa da Ethereum é aberta e transparente. A cultura é tornar as ferramentas e os resultados de pesquisa o mais abertos e interativos possível, por exemplo, por meio de notebooks executáveis. A pesquisa da Ethereum avança rapidamente, com novas descobertas publicadas e discutidas abertamente em fóruns como o [ethresear.ch](https://ethresear.ch/), em vez de chegar à comunidade por meio de publicações tradicionais após rodadas de revisão por pares. A Fundação Ethereum também publica o que está priorizando e por que, para que qualquer pessoa possa ver quais problemas são atualmente considerados urgentes.

## Recursos gerais de pesquisa {#general-research-resources}

Independentemente do tópico específico, há uma riqueza de informações sobre a pesquisa da Ethereum a serem encontradas no [ethresear.ch](https://ethresear.ch) e no [canal do Discord Eth R&D](https://discord.gg/qGpsxSA). Estes são os principais lugares onde os pesquisadores da Ethereum discutem as ideias mais recentes e as oportunidades de desenvolvimento.

Para uma visão geral de para onde o protocolo está indo, comece com o [roteiro da Ethereum](/roadmap/), depois leia a [Atualização de Prioridades do Protocolo para 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026) da Fundação Ethereum e as [atualizações do cluster do protocolo](https://blog.ethereum.org/2026/05/11/protocol-update-may-26) que relatam o progresso em relação a ele. O [Ethereum Protocol Studies](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) é um ponto de entrada estruturado para pessoas que desejam trabalhar no próprio protocolo.

## Fontes de financiamento {#sources-of-funding}

Você pode se envolver com a pesquisa da Ethereum e ser pago por isso. [A Fundação Ethereum](/foundation/) financia pesquisas e bens públicos por meio de seu [Programa de Suporte ao Ecossistema](https://esp.ethereum.foundation/applicants), que publica itens de lista de desejos e solicitações de propostas descrevendo problemas que gostaria de ver resolvidos. Você pode encontrar informações sobre oportunidades de financiamento ativas e futuras na [página de subsídios da Ethereum](/community/grants/).

## Pesquisa de protocolo {#protocol-research}

A pesquisa de protocolo se preocupa com a camada base da Ethereum: o conjunto de regras que define como os nós se conectam, se comunicam, trocam e armazenam dados da Ethereum e chegam a um consenso sobre o estado da blockchain. Suas duas categorias de longa data são consenso e execução, e vários tópicos de pesquisa agora abrangem ambas.

### Consenso {#consensus}

A pesquisa de consenso se preocupa com o [mecanismo de Prova de Participação (PoS) da Ethereum](/developers/docs/consensus-mechanisms/pos/): a segurança da regra de escolha de bifurcação e o dispositivo de finalidade, a criptoeconomia do staking, a rede ponto a ponto que transporta blocos, atestados e dados de blob, e a criptografia com a qual os validadores assinam. Alguns exemplos de tópicos de pesquisa de consenso são:

- identificar e corrigir vulnerabilidades;
- quantificar a segurança criptoeconômica;
- reduzir o tempo que leva para um bloco atingir a finalidade;
- e melhorar a eficiência, a segurança e o monitoramento da rede ponto a ponto entre clientes de consenso.

Grande parte desse trabalho passou do papel para a especificação. A amostragem de disponibilidade de dados foi lançada na atualização [Fusaka](/roadmap/fusaka/), mudanças em como os blocos são construídos e como as transações têm inclusão garantida são especificadas para atualizações futuras, e um redesenho de horizonte mais longo conhecido como consenso enxuto (lean consensus) está explorando uma finalidade mais rápida junto com assinaturas pós-quânticas.

#### Leitura de base {#background-reading}

- [Introdução à Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Finalidade de slot único](/roadmap/single-slot-finality/)
- [Artigo sobre Casper FFG](https://arxiv.org/abs/1710.09437)
- [Artigo sobre Gasper](https://arxiv.org/abs/2003.03052)
- [Ethereum enxuta (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### Pesquisa recente {#recent-research}

- [Consenso no Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilema de Disponibilidade/Finalidade](https://arxiv.org/abs/2009.04987)
- [Finalidade de 3 slots: SSF não é sobre um "único" slot](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### Execução {#execution}

A camada de execução se preocupa em executar transações, rodar a [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/) e gerar cargas de execução para passar para a camada de consenso. A pesquisa aqui se divide em duas vertentes: tornar o estado barato de manter e provar, e aumentar a vazão sem impor mais custos às pessoas que executam nós. Existem muitas áreas ativas de pesquisa, incluindo:

- reprecificar o custo de gas das operações que criam estado;
- expiração de histórico que os nós não precisam mais servir;
- listas de acesso em nível de bloco que permitem que as transações sejam validadas em paralelo;
- mercados de taxas multidimensionais que precificam estado, dados e computação separadamente;
- e provar a execução de blocos da camada 1 (l1) com uma zkEVM.

#### Leitura de base {#background-reading-1}

- [Introdução à EVM](/developers/docs/evm/)
- [Camada de execução no Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)
- [Especificações da camada de execução da Ethereum](https://github.com/ethereum/execution-specs)
- [Otimizações de banco de dados](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Pesquisa recente {#recent-research-1}

- [EIP-7928: Listas de acesso em nível de bloco](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: Aumento do custo de gas para criação de estado](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: Mercado unificado de taxas multidimensionais](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69, expiração de histórico e recibos mais simples](https://eips.ethereum.org/EIPS/eip-7642)
- [Lançando uma zkEVM de l1: prova em tempo real](https://blog.ethereum.org/2025/07/10/realtime-proving)

### Resistência à censura e construção de blocos {#censorship-resistance-and-block-building}

A maioria dos blocos da Ethereum é atualmente montada por um pequeno número de construtores especializados, o que concentra o poder de decidir quais transações são incluídas. A pesquisa nesta área abrange trazer o mercado de construtores para o próprio protocolo, de modo que os papéis de propor e construir um bloco sejam separados por regras de consenso em vez de por software fora do protocolo, e dar aos validadores uma maneira de forçar a inclusão de transações que os construtores deixam de fora.

#### Leitura de base {#background-reading-21}

- [Separação propositor-construtor (PBS)](/roadmap/pbs/)
- [Eleição secreta de líder único (SSLE)](/roadmap/secret-leader-election/)

#### Pesquisa recente {#recent-research-21}

- [EIP-7732: Separação propositor-construtor consagrada](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: Listas de inclusão aplicadas por escolha de bifurcação](https://eips.ethereum.org/EIPS/eip-7805)
- [Aumentando a resistência à censura de transações sob a separação propositor-construtor](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Crescimento de estado e ausência de estado {#state-growth-and-statelessness}

Todo nó completo armazena o estado da Ethereum, portanto, a taxa na qual esse estado cresce define um piso para o custo de executar um. No curto prazo, a pesquisa se concentra em reprecificar as operações que criam estado e na expiração de histórico que os nós não precisam mais manter. A longo prazo, o plano é substituir a trie Merkle-Patricia hexária da Ethereum por uma árvore binária que produz provas muito menores, e avançar em direção à ausência de estado, para que um nó possa verificar blocos sem manter todo o estado. Trabalhos anteriores nesta área assumiam árvores Verkle; a proposta atual é uma árvore binária unificada, que transporta o cronograma de gas de testemunha especificado para essa linha de trabalho anterior.

#### Leitura de base {#background-reading-22}

- [Ausência de estado e expiração de estado](/roadmap/statelessness/)
- [Livro sobre ausência de estado da Ethereum](https://stateless.fyi/)

#### Pesquisa recente {#recent-research-22}

- [EIP-7864: Estado da Ethereum usando uma árvore binária unificada](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: Mudanças no custo de gas para ausência de estado](https://eips.ethereum.org/EIPS/eip-4762)
- [Por que o estado descentralizado é importante para a Ethereum](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### Criptografia pós-quântica {#post-quantum-cryptography}

As assinaturas de validador da Ethereum e grande parte de sua camada de aplicativos dependem de criptografia de curva elíptica, que um computador quântico suficientemente capaz quebraria. Tornar a Ethereum resistente a computadores quânticos significa substituir essas assinaturas por alternativas baseadas em hash ou em reticulados (lattice-based), mantendo a agregação de assinaturas eficiente o suficiente para um grande conjunto de validadores e dando às contas existentes um caminho de migração. A Fundação Ethereum administra uma equipe dedicada ao pós-quântico, e este é um dos programas de horizonte mais longo no roteiro.

#### Leitura de base {#background-reading-23}

- [Resistência quântica](/roadmap/security/quantum-resistance/)
- [Ethereum pós-quântica](https://pq.ethereum.org/)

#### Pesquisa recente {#recent-research-23}

- [Ethereum enxuta (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Criptografia no Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Implementações da Ethereum enxuta](https://github.com/leanEthereum)

## Desenvolvimento de clientes {#client-development}

Os clientes da Ethereum são implementações do protocolo da Ethereum. O desenvolvimento de clientes transforma os resultados da pesquisa de protocolo em realidade, integrando-os a esses clientes. O desenvolvimento de clientes inclui a atualização das especificações do cliente, bem como a construção de implementações específicas.

Um nó da Ethereum precisa executar dois softwares:

1. um cliente de consenso para acompanhar o topo da blockchain, propagar blocos e lidar com a lógica de consenso
2. um cliente de execução para suportar a Máquina Virtual Ethereum e executar transações e contratos inteligentes

Novas classes de clientes estão sendo prototipadas junto com essas duas, incluindo clientes que provam a execução de blocos da camada 1 (l1) e clientes de consenso enxutos construídos em torno de assinaturas pós-quânticas.

Consulte a [página de nós e clientes](/developers/docs/nodes-and-clients/) para obter mais detalhes sobre nós e clientes e para obter uma lista de todas as implementações de clientes atuais. Você também pode encontrar um histórico de todas as atualizações da Ethereum na [página de histórico](/ethereum-forks/).

### Clientes de execução {#execution-clients}

- [Especificação do cliente de execução](https://github.com/ethereum/execution-specs)
- [Especificação da API de execução](https://github.com/ethereum/execution-apis)

### Clientes de consenso {#consensus-clients}

- [Especificação do cliente de consenso](https://github.com/ethereum/consensus-specs)
- [Especificação da API do Beacon](https://ethereum.github.io/beacon-APIs/)

### Clientes zkEVM {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Lançando uma zkEVM de l1: as bases de segurança](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## Escalabilidade e desempenho {#scaling-and-performance}

Escalar a Ethereum é uma grande área de foco para os pesquisadores da Ethereum, e ocorre em duas frentes ao mesmo tempo: aumentar a vazão da própria camada 1 (l1) e mover a execução para rollups que publicam seus dados na Ethereum. O trabalho atual inclui aumentar o limite de gas do bloco, reprecificar o crescimento do estado, expandir a capacidade de blob para dados de rollup e reduzir o que um nó precisa armazenar e verificar. Informações introdutórias sobre a escalabilidade da Ethereum estão disponíveis em nossa [página de escalabilidade](/developers/docs/scaling/) e no [roteiro de escalabilidade](/roadmap/scaling/).

### Camada 2 {#layer-2}

Agora existem vários protocolos de camada 2 (l2) que escalam a Ethereum usando diferentes técnicas para o processamento em lote de transações e para protegê-las na camada 1 (l1) da Ethereum. A pesquisa aberta inclui reduzir a latência e o custo da prova, encurtar o tempo que leva para uma transação atingir a finalidade sem necessidade de confiança e dar aos usuários uma experiência única e coerente em muitos rollups.

#### Leitura de base {#background-reading-2}

- [Introdução à camada 2 (l2)](/layer-2/)
- [L2BEAT: resumo de escalabilidade](https://l2beat.com/scaling/summary)
- [Um roteiro da Ethereum centrado em rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### Pesquisa recente {#recent-research-2}

- [Camada 2 no Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: custos onchain](https://l2beat.com/scaling/costs)
- [Construindo na Ethereum em 2026: o que mudou](/latest/building-on-ethereum-in-2026/)

### Interoperabilidade {#interoperability}

Usuários e ativos estão espalhados pela camada 1 (l1) da Ethereum e por muitas camadas 2 (l2), e o problema de pesquisa é permitir que eles se movam e atuem nessas cadeias sem confiar em um intermediário. O trabalho aqui abrange transferências baseadas em intenção, endereçamento e nomenclatura cross-chain padronizados, passagem geral de mensagens e abstração de cadeia no nível da carteira. Isso substitui um modelo no qual pontes de custódia mantinham os ativos, e as pontes têm sido historicamente uma das maiores fontes de perdas no ecossistema, portanto, a segurança de qualquer mecanismo cross-chain continua sendo uma preocupação central.

#### Leitura de base {#background-reading-3}

- [Introdução a pontes de blockchain](/bridges/)
- [Fazendo a Ethereum parecer uma única cadeia novamente](https://blog.ethereum.org/2025/11/18/eil)
- [Estrutura de Intenções Abertas (Open Intents Framework)](https://openintents.xyz/)
- [Validando pontes](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Pesquisa recente {#recent-research-3}

- [ERC-7683: Intenções cross-chain](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: Endereços interoperáveis](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: Nomes interoperáveis](https://eips.ethereum.org/EIPS/eip-7828)

### Disponibilidade de dados e escalabilidade de blob {#data-availability-and-blob-scaling}

Os rollups publicam seus dados na Ethereum em blobs, e escalar essa camada de dados é um problema de pesquisa por si só, separado da escalabilidade da execução. A Ethereum agora usa amostragem de disponibilidade de dados, para que os validadores possam verificar se os dados do blob foram publicados amostrando partes deles em vez de baixar tudo, e a capacidade do blob é aumentada incrementalmente por meio de bifurcações dedicadas apenas a parâmetros de blob. As questões em aberto incluem até onde a amostragem pode ser levada, como manter os requisitos de largura de banda gerenciáveis para pessoas fazendo staking em casa e como a precificação do blob deve responder à demanda.

#### Leitura de base {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Atualização Fusaka](/roadmap/fusaka/)
- [Danksharding](/roadmap/danksharding/)
- [Disponibilidade de dados](/developers/docs/data-availability/)
- [EIP-4844: Transações de blob de fragmento](https://eips.ethereum.org/EIPS/eip-4844)
- [Notas sobre Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### Pesquisa recente {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: Hardforks apenas de parâmetros de blob](https://eips.ethereum.org/EIPS/eip-7892)
- [Sharding no Ethresear.ch](https://ethresear.ch/c/sharding/6)

### Hardware {#hardware}

[Executar nós](/developers/docs/nodes-and-clients/run-a-node/) em hardware modesto é fundamental para manter a Ethereum descentralizada, portanto, cada aumento na vazão deve ser ponderado em relação ao que custa a um operador de nó. Com o limite de gas do bloco aumentando e novos aumentos planejados, a pesquisa ativa abrange o crescimento do estado e como precificá-lo, o desempenho da sincronização e do banco de dados em um estado maior, a economia de disco disponível com a expiração de histórico e, eventualmente, a ausência de estado.

#### Leitura de base {#background-reading-5}

- [Crie seu próprio nó da Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Ausência de estado e expiração de estado](/roadmap/statelessness/)
- [Ethereum em ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Pesquisa recente {#recent-research-5}

- [Escalando a Ethereum: o caminho para um limite de gas mais alto e além](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: Cronograma de limite de gas](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: Aumento do custo de gas para criação de estado](https://eips.ethereum.org/EIPS/eip-8037)

## Segurança {#security}

A segurança é um tópico amplo que pode incluir prevenção de spam e golpes, segurança de carteira, segurança de hardware, segurança criptoeconômica, resistência à censura, prontidão pós-quântica, caça a bugs e o teste e verificação de aplicativos e software de cliente. O [roteiro de segurança](/roadmap/security/) da Ethereum abrange o trabalho no nível do protocolo.

### Criptografia e ZKP {#cryptography--zkp}

As provas de conhecimento zero (ZKP) e a criptografia são essenciais para incorporar privacidade e segurança à Ethereum e a seus aplicativos. A prova de conhecimento zero passou da pesquisa para a infraestrutura de produção: provadores que provam blocos reais da Ethereum agora são avaliados publicamente em termos de latência, custo e solidez. Os problemas em aberto mudaram de acordo, em direção a provar blocos da camada 1 (l1) rápido o suficiente para fazê-lo em tempo real, contabilizando rigorosamente a segurança dos sistemas de prova em uso e preparando-se para a criptografia pós-quântica.

#### Leitura de base {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Privacidade](/roadmap/privacy/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Pesquisa recente {#recent-research-6}

- [ZK no Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Criptografia no Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Calculadora de solidez para sistemas de prova zkEVM baseados em hash](https://github.com/ethereum/soundcalc)
- [Lançando uma zkEVM de l1: as bases de segurança](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### Carteiras {#wallets}

As carteiras da Ethereum podem ser extensões de navegador, aplicativos para desktop e dispositivos móveis ou contratos inteligentes na Ethereum. A abstração de conta não é mais experimental: o ERC-4337 fornece contas inteligentes sem alterações no protocolo, e o EIP-7702 permite que uma conta comum defina código para que o processamento em lote de transações, o patrocínio de gas e a recuperação social funcionem com o endereço que o usuário já possui. A pesquisa aberta agora se concentra na abstração de conta nativa no próprio protocolo, em arquiteturas de conta modulares e auditáveis, e no gerenciamento e recuperação de chaves que pessoas comuns possam operar com segurança.

#### Leitura de base {#background-reading-7}

- [Introdução a carteiras](/wallets/)
- [Introdução à segurança de carteiras](/security/)
- [Abstração de conta](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Segurança no Ethresear.ch](https://ethresear.ch/c/security/25)

#### Pesquisa recente {#recent-research-7}

- [EIP-8141: Transação de quadro (Frame transaction)](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: API de chamada de carteira](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: Descoberta de provedor injetado múltiplo](https://eips.ethereum.org/EIPS/eip-6963)
- [Carteiras de contrato inteligente focadas em validação](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## Comunidade, educação e divulgação {#community-education-and-outreach}

A integração de novos usuários na Ethereum requer novos recursos educacionais e abordagens de divulgação. Isso pode incluir postagens de blog e artigos, livros, podcasts, memes, recursos de ensino, eventos e qualquer outra coisa que construa comunidades, dê as boas-vindas a iniciantes e eduque as pessoas sobre a Ethereum.

### Design e UX {#design-and-ux}

Para integrar mais pessoas na Ethereum, o ecossistema deve melhorar seu design e experiência do usuário. Isso exige que designers e especialistas em produtos reexaminem como as carteiras e os aplicativos funcionam, e cada vez mais significa projetar em relação a padrões que já existem: chamadas de carteira em lote, patrocínio de gas, contas que podem ser recuperadas e endereços legíveis por humanos que carregam a cadeia à qual pertencem. Existem comparativamente poucos locais canônicos para pesquisa de UX na Web3, portanto, estudos publicados e orientações de design tendem a ser dispersos.

#### Leitura de base {#background-reading-8}

- [Design e UX na Web3](/developers/docs/design-and-ux/)
- [Roteiro de experiência do usuário da Ethereum](/roadmap/user-experience/)
- [Manual de Design da Web3](https://learnweb3.design/)
- [Manual de Design de UX da Web3](https://web3ux.design/)

#### Pesquisa recente {#recent-research-8}

- [UX/UI no Ethresear.ch](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: API de chamada de carteira](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: Nomes interoperáveis](https://eips.ethereum.org/EIPS/eip-7828)

### Economia {#economics}

A pesquisa econômica na Ethereum segue amplamente duas abordagens: validar a segurança de mecanismos que dependem de incentivos econômicos ("microeconomia") e analisar os fluxos de valor entre protocolos, aplicativos e usuários ("macroeconomia"). Existem fatores criptoeconômicos complexos relacionados ao ativo nativo da Ethereum (ether) e aos tokens construídos sobre ele (por exemplo, NFTs e tokens ERC-20).

#### Leitura de base {#background-reading-9}

- [Grupo de Incentivos Robustos (Robust Incentives Group)](https://rig.ethereum.org/)
- [Masterclass de economia da Ethereum e modelo econômico](https://github.com/CADLabs/ethereum-economic-model)

#### Pesquisa recente {#recent-research-9}

- [Economia no Ethresear.ch](https://ethresear.ch/c/economics/16)
- [Equilíbrio da oferta circulante](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantificando MEV: Quão escura é a floresta?](https://arxiv.org/abs/2101.05511)

### Espaço de bloco e mercados de taxas {#blockspace-fee-markets}

Os mercados de espaço de bloco governam a inclusão de transações de usuários finais, seja diretamente na Ethereum (camada 1) ou em redes conectadas por pontes, por exemplo, rollups (camada 2). Na Ethereum, as transações são enviadas ao mercado de taxas implantado no protocolo como EIP-1559, protegendo a cadeia contra spam e precificando o congestionamento. Em ambas as camadas, as transações podem produzir externalidades, conhecidas como Valor Máximo Extraível (MEV), que induzem novas estruturas de mercado para capturar ou gerenciar essas externalidades. O trabalho atual estende isso para precificar vários recursos de uma só vez, já que estado, dados e computação congestionam de forma independente, e para mudar quem monta os blocos e em quais termos.

#### Leitura de base {#background-reading-10}

- [Design do Mecanismo de Taxa de Transação para a Blockchain Ethereum: Uma Análise Econômica do EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulações do EIP-1559 (Grupo de Incentivos Robustos)](https://ethereum.github.io/abm1559)
- [Economia de rollup a partir de primeiros princípios](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, Reordenação de Transações e Instabilidade de Consenso em Exchanges Descentralizadas](https://arxiv.org/abs/1904.05234)

#### Pesquisa recente {#recent-research-10}

- [EIP-7999: Mercado unificado de taxas multidimensionais](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: Listas de acesso em nível de bloco](https://eips.ethereum.org/EIPS/eip-7928)
- [MEV de domínio cruzado (Cross domain MEV)](https://arxiv.org/abs/2112.01472)

### Incentivos da Prova de Participação {#proof-of-stake-incentives}

Os validadores usam o ativo nativo da Ethereum (ether) como colateral contra comportamento desonesto. A criptoeconomia disso determina a segurança da rede. Validadores sofisticados podem ser capazes de explorar as nuances da camada de incentivos para lançar ataques explícitos. Desde a atualização Pectra, os validadores também podem manter e ganhar sobre um saldo efetivo muito maior e consolidar vários validadores em um só, o que muda a economia de executá-los.

#### Leitura de base {#background-reading-11}

- [Saldo efetivo máximo](/roadmap/pectra/maxeb/)
- [Masterclass de economia da Ethereum e modelo econômico](https://github.com/CADLabs/ethereum-economic-model)
- [Simulações de incentivos de PoS (Grupo de Incentivos Robustos)](https://ethereum.github.io/beaconrunner/)

#### Pesquisa recente {#recent-research-11}

- [Grupo de Incentivos Robustos](https://rig.ethereum.org/)
- [Três Ataques à Ethereum PoS](https://arxiv.org/abs/2110.10086)

### Staking líquido e derivativos {#liquid-staking-and-derivatives}

O staking líquido permite que usuários com menos de 32 ETH recebam rendimentos de staking trocando ether por um token que representa o ether em staking que pode ser usado em DeFi. No entanto, os incentivos e a dinâmica de mercado associados ao staking líquido ainda estão sendo descobertos, bem como seu efeito na segurança da Ethereum (por exemplo, riscos de centralização).

#### Leitura de base {#background-reading-12}

- [Staking líquido no Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: O caminho para o staking da Ethereum sem necessidade de confiança](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### Pesquisa recente {#recent-research-12}

- [Os riscos dos Derivativos de Staking Líquido](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [Lidando com saques da Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## Testes {#testing}

### Testes de cliente e rede {#client-and-network-testing}

As especificações da Ethereum são executáveis, e os fixtures de teste gerados a partir delas são o que as equipes de clientes usam para verificar suas implementações. Paralelamente a isso, ambientes de teste compartilhados executam clientes uns contra os outros e contra condições de rede deliberadamente hostis, e redes de teste públicas exercitam atualizações antes que cheguem à Mainnet. Melhorar essa infraestrutura é um dos trabalhos de maior alavancagem disponíveis, porque é assim que os bugs são detectados antes de chegarem aos usuários.

#### Leitura de base {#background-reading-24}

- [Especificações da camada de execução da Ethereum](https://github.com/ethereum/execution-specs)
- [Especificação do cliente de consenso](https://github.com/ethereum/consensus-specs)

#### Pesquisa recente {#recent-research-24}

- [hive, um ambiente de teste de cliente de ponta a ponta](https://github.com/ethereum/hive)
- [Assertoor, uma ferramenta de teste de rede de teste](https://github.com/ethpandaops/assertoor)

### Verificação formal {#formal-verification}

A verificação formal usa prova matemática verificada por máquina para estabelecer que uma especificação ou implementação se comporta conforme o planejado. Na Ethereum, isso abrange provar que as implementações da EVM correspondem a uma semântica formal, provar a solidez dos circuitos e sistemas de prova nos quais os provadores de conhecimento zero confiam e verificar as primitivas criptográficas subjacentes a eles. Pesquisas adicionais podem fortalecer essas provas e estendê-las a mais partes da pilha.

#### Leitura de base {#background-reading-13}

- [zkEVMs verificadas](https://verified-zkevm.org/)
- [Verificação Formal (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Pesquisa recente {#recent-research-13}

- [Visão geral do projeto de zkEVM verificada](https://github.com/Verified-zkEVM/Overview)
- [KEVM: semântica da EVM em K](https://github.com/runtimeverification/evm-semantics)
- [Verificação formal do contrato de depósito](https://github.com/runtimeverification/deposit-contract-verification)

## Ciência de dados e análise {#data-science-and-analytics}

Há uma necessidade de mais ferramentas de análise de dados e painéis que forneçam informações detalhadas sobre a atividade na Ethereum e a saúde da rede. Grande parte dos dados subjacentes é pública e consultável, portanto, a lacuna geralmente está na análise e apresentação, e não no acesso.

### Leitura de base {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Painel de diversidade de clientes](https://clientdiversity.org/)
- [Especificação da API de execução JSON-RPC da Ethereum](https://ethereum.github.io/execution-apis/)

#### Pesquisa recente {#recent-research-14}

- [Análise de Dados do Grupo de Incentivos Robustos](https://rig.ethereum.org/)
- [Dados abertos do ethPandaOps](https://ethpandaops.io/data/)
- [L2BEAT: resumo de escalabilidade](https://l2beat.com/scaling/summary)

## Aplicativos e ferramentas {#apps-and-tooling}

A camada de aplicativos suporta um ecossistema diversificado de programas que liquidam transações na camada base da Ethereum. As equipes de desenvolvimento estão constantemente encontrando novas maneiras de alavancar a Ethereum para criar versões compuníveis, não permissionadas e resistentes à censura de aplicativos importantes da Web2 ou criar conceitos nativos da Web3 completamente novos. Ao mesmo tempo, novas ferramentas estão sendo desenvolvidas para tornar a construção de dapps na Ethereum menos complexa.

### DeFi {#defi}

As finanças descentralizadas (DeFi) são uma das principais classes de aplicativos construídos sobre a Ethereum. DeFi visa criar "legos de dinheiro" compuníveis que permitem aos usuários armazenar, transferir, emprestar, tomar emprestado e investir criptoativos usando contratos inteligentes. DeFi é um espaço em rápida evolução que está em constante atualização. A pesquisa sobre protocolos seguros, eficientes e acessíveis é continuamente necessária.

#### Leitura de base {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: O que é DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Pesquisa recente {#recent-research-15}

- [Finanças descentralizadas, propriedade centralizada?](https://arxiv.org/pdf/2012.09306.pdf)
- [Aplicativos no Ethresear.ch](https://ethresear.ch/c/applications/18)

### DAOs {#daos}

Um caso de uso impactante para a Ethereum é a capacidade de se organizar de maneira descentralizada por meio do uso de DAOs. Há muita pesquisa ativa sobre como as DAOs na Ethereum podem ser desenvolvidas e utilizadas para executar formas aprimoradas de governança, como uma ferramenta de coordenação minimizada em confiança, expandindo muito as opções das pessoas além das corporações e organizações tradicionais.

#### Leitura de base {#background-reading-16}

- [Introdução a DAOs](/dao/)

#### Pesquisa recente {#recent-research-16}

- [Mapeando o ecossistema de DAOs](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Ferramentas de desenvolvedor {#developer-tools}

As ferramentas para desenvolvedores da Ethereum estão melhorando rapidamente. Há muita pesquisa e desenvolvimento ativos a serem feitos nesta área geral.

#### Leitura de base {#background-reading-17}

- [Ferramentas por linguagem de programação](/developers/docs/programming-languages/)
- [Estruturas de desenvolvedor (Frameworks)](/developers/docs/frameworks/)
- [Introdução a dapps](/developers/docs/dapps/)
- [Padrões de token](/developers/docs/standards/tokens/)

#### Pesquisa recente {#recent-research-17}

- [Discord Eth R&D](https://discord.gg/qGpsxSA)
- [Especificações da API de execução da Ethereum](https://github.com/ethereum/execution-apis)

### Oráculos {#oracles}

Os oráculos importam dados offchain para a blockchain de forma não permissionada e descentralizada. Obter esses dados onchain permite que os dapps sejam reativos a fenômenos do mundo real, como flutuações de preços em ativos do mundo real, eventos em aplicativos offchain ou até mesmo mudanças no clima.

#### Leitura de base {#background-reading-18}

- [Introdução a Oráculos](/developers/docs/oracles/)

#### Pesquisa recente {#recent-research-18}

- [Pesquisa sobre oráculos de blockchain](https://arxiv.org/pdf/2004.07140.pdf)

### Segurança de aplicativos {#app-security}

Os hacks na Ethereum geralmente exploram vulnerabilidades em aplicativos individuais, em vez de no próprio protocolo. Hackers e desenvolvedores de aplicativos estão travados em uma corrida armamentista para desenvolver novos ataques e defesas. Isso significa que sempre há pesquisas e desenvolvimentos importantes necessários para manter os aplicativos protegidos contra hacks.

#### Leitura de base {#background-reading-19}

- [Segurança de contratos inteligentes](/developers/docs/smart-contracts/security/)
- [Relatório de exploração da Wormhole](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [Lista de post-mortems de hacks de contratos da Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### Pesquisa recente {#recent-research-19}

- [Aplicativos no Ethresear.ch](https://ethresear.ch/c/applications/18)

### Pilha de tecnologia {#technology-stack}

Descentralizar toda a pilha de tecnologia da Ethereum é uma área de pesquisa importante. Atualmente, os dapps na Ethereum comumente têm alguns pontos de centralização porque dependem de ferramentas ou infraestrutura centralizadas. Reduzir essa dependência significa tornar prático para os aplicativos lerem a Ethereum sem confiar em um único provedor, que é onde entram os clientes leves e o acesso sem necessidade de confiança aos dados do nó.

#### Leitura de base {#background-reading-20}

- [Pilha da Ethereum](/developers/docs/ethereum-stack/)
- [Clientes leves](/developers/docs/nodes-and-clients/light-clients/)
- [Introdução a contratos inteligentes](/developers/docs/smart-contracts/)
- [Introdução ao armazenamento descentralizado](/developers/docs/storage/)

#### Pesquisa recente {#recent-research-20}

- [Composabilidade de contratos inteligentes](/developers/docs/smart-contracts/composability/)
- [Coinbase: Introdução à Pilha da Web3](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)