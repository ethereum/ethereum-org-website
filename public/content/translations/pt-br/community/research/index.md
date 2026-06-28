---
title: Áreas ativas de pesquisa da Ethereum
description: Explore diferentes áreas de pesquisa aberta e saiba como se envolver.
lang: pt-br
---

Um dos principais pontos fortes da Ethereum é que uma comunidade ativa de pesquisa e engenharia a está melhorando constantemente. Muitas pessoas entusiasmadas e qualificadas em todo o mundo gostariam de se dedicar a questões pendentes na Ethereum, mas nem sempre é fácil descobrir quais são essas questões. Esta página descreve as principais áreas de pesquisa ativas como um guia geral para a vanguarda da Ethereum.

## Como funciona a pesquisa da Ethereum {#how-ethereum-research-works}

A pesquisa da Ethereum é aberta e transparente, incorporando princípios da [ciência descentralizada (desci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). A cultura é tornar as ferramentas e os resultados de pesquisa o mais abertos e interativos possível, por exemplo, por meio de notebooks executáveis. A pesquisa da Ethereum avança rapidamente, com novas descobertas publicadas e discutidas abertamente em fóruns como o [ethresear.ch](https://ethresear.ch/), em vez de chegar à comunidade por meio de publicações tradicionais após rodadas de revisão por pares.

## Recursos gerais de pesquisa {#general-research-resources}

Independentemente do tópico específico, há uma riqueza de informações sobre a pesquisa da Ethereum a serem encontradas no [ethresear.ch](https://ethresear.ch) e no [canal do Discord de P&D da Eth](https://discord.gg/qGpsxSA). Esses são os principais lugares onde os pesquisadores da Ethereum discutem as ideias mais recentes e as oportunidades de desenvolvimento.

Este relatório publicado em maio de 2022 pela [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) fornece uma boa visão geral do roteiro da Ethereum.

## Fontes de financiamento {#sources-of-funding}

Você pode se envolver com a pesquisa da Ethereum e ser pago por isso! Por exemplo, a [Fundação Ethereum](/foundation/) realizou recentemente uma [rodada de financiamento de Subsídios Acadêmicos](https://esp.ethereum.foundation/academic-grants). Você pode encontrar informações sobre oportunidades de financiamento ativas e futuras na [página de subsídios da Ethereum](/community/grants/).

## Pesquisa de protocolo {#protocol-research}

A pesquisa de protocolo se preocupa com a camada base da Ethereum - o conjunto de regras que define como os nós se conectam, se comunicam, trocam e armazenam dados da Ethereum e chegam a um consenso sobre o estado da blockchain. A pesquisa de protocolo é dividida em duas categorias de nível superior: consenso e execução.

### Consenso {#consensus}

A pesquisa de consenso se preocupa com o [mecanismo de Prova de Participação (PoS) da Ethereum](/developers/docs/consensus-mechanisms/pos/). Alguns exemplos de tópicos de pesquisa de consenso são:

- identificar e corrigir vulnerabilidades;
- quantificar a segurança da criptoeconomia;
- aumentar a segurança ou o desempenho das implementações de clientes;
- e desenvolver clientes leves.

Além de pesquisas voltadas para o futuro, alguns redesenhos fundamentais do protocolo, como a finalidade de slot único, estão sendo pesquisados para permitir melhorias significativas na Ethereum. Além disso, a eficiência, a segurança e o monitoramento da rede ponto a ponto entre clientes de consenso também são tópicos de pesquisa importantes.

#### Leitura de base {#background-reading}

- [Introdução à Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Artigo sobre Casper FFG](https://arxiv.org/abs/1710.09437)
- [Explicação sobre Casper FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Artigo sobre Gasper](https://arxiv.org/abs/2003.03052)

#### Pesquisa recente {#recent-research}

- [Consenso no Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilema de Disponibilidade/Finalidade](https://arxiv.org/abs/2009.04987)
- [Finalidade de slot único](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Separação propositor-construtor (PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Execução {#execution}

A camada de execução se preocupa em executar transações, executar a [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/) e gerar cargas de execução para passar para a camada de consenso. Existem muitas áreas ativas de pesquisa, incluindo:

- desenvolver suporte para clientes leves;
- pesquisar limites de gás;
- e incorporar novas estruturas de dados (por exemplo, árvores Verkle).

#### Leitura de base {#background-reading-1}

- [Introdução à EVM](/developers/docs/evm)
- [Camada de execução no Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Pesquisa recente {#recent-research-1}

- [Otimizações de banco de dados](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Expiração de estado](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Caminhos para a expiração de estado](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Proposta de Verkle e expiração de estado](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Gerenciamento de histórico](https://eips.ethereum.org/EIPS/eip-4444)
- [Árvores Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Amostragem de disponibilidade de dados (DAS)](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Desenvolvimento de clientes {#client-development}

Os clientes Ethereum são implementações do protocolo Ethereum. O desenvolvimento de clientes transforma os resultados da pesquisa de protocolo em realidade, integrando-os a esses clientes. O desenvolvimento de clientes inclui a atualização das especificações do cliente, bem como a construção de implementações específicas.

Um nó Ethereum precisa executar dois softwares:

1. um cliente de consenso para acompanhar o topo da blockchain, propagar blocos e lidar com a lógica de consenso
2. um cliente de execução para dar suporte à Máquina Virtual Ethereum e executar transações e contratos inteligentes

Consulte a [página de nós e clientes](/developers/docs/nodes-and-clients/) para obter mais detalhes sobre nós e clientes e para obter uma lista de todas as implementações de clientes atuais. Você também pode encontrar um histórico de todas as atualizações da Ethereum na [página de histórico](/ethereum-forks/).

### Clientes de execução {#execution-clients}

- [Especificação do cliente de execução](https://github.com/ethereum/execution-specs)
- [Especificação da API de execução](https://github.com/ethereum/execution-apis)

### Clientes de consenso {#consensus-clients}

- [Especificação do cliente de consenso](https://github.com/ethereum/consensus-specs)
- [Especificação da API do Beacon](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Dimensionamento e desempenho {#scaling-and-performance}

Escalar a Ethereum é uma grande área de foco para os pesquisadores da Ethereum. As abordagens atuais incluem descarregar transações em rollups e torná-las o mais baratas possível usando blobs de dados. Informações introdutórias sobre o dimensionamento da Ethereum estão disponíveis em nossa [página de dimensionamento](/developers/docs/scaling).

### Camada 2 {#layer-2}

Existem agora vários protocolos de camada 2 (l2) que escalam a Ethereum usando diferentes técnicas para o processamento em lote de transações e para protegê-las na camada 1 (l1) da Ethereum. Este é um tópico de crescimento muito rápido com muito potencial de pesquisa e desenvolvimento.

#### Leitura de base {#background-reading-2}

- [Introdução à camada 2 (l2)](/layer-2/)
- [Polynya: Rollups, DA e cadeias modulares](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Pesquisa recente {#recent-research-2}

- [Ordenação justa da Arbitrum para sequenciadores](https://eprint.iacr.org/2021/1465)
- [Camada 2 no Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Roteiro centrado em rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2BEAT](https://l2beat.com/)

### Pontes {#bridges}

Uma área específica da camada 2 (l2) que requer mais pesquisa e desenvolvimento são as pontes seguras e de alto desempenho. Isso inclui pontes entre várias camadas 2 e pontes entre a camada 1 (l1) e a camada 2. Esta é uma área de pesquisa particularmente importante porque as pontes são comumente alvos de hackers.

#### Leitura de base {#background-reading-3}

- [Introdução às pontes de blockchain](/bridges/)
- [Vitalik sobre pontes](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Artigo sobre pontes de blockchain](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Valor bloqueado em pontes](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Pesquisa recente {#recent-research-3}

- [Validando pontes](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Fragmentação {#sharding}

A fragmentação da blockchain da Ethereum faz parte do roteiro de desenvolvimento há muito tempo. No entanto, novas soluções de dimensionamento, como o "danksharding", estão atualmente no centro das atenções.

O precursor do danksharding completo, conhecido como Proto-Danksharding, entrou no ar com a atualização da rede Cancun-Deneb ("Dencun").

[Mais sobre a atualização Dencun](/roadmap/dencun/)

#### Leitura de base {#background-reading-4}

- [Notas sobre o Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Vídeo do Bankless sobre danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Compêndio de pesquisa sobre fragmentação da Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Pesquisa recente {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik sobre fragmentação e amostragem de disponibilidade de dados](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[Executar nós](/developers/docs/nodes-and-clients/run-a-node/) em hardware modesto é fundamental para manter a Ethereum descentralizada. Portanto, a pesquisa ativa para minimizar os requisitos de hardware para executar nós é uma área importante de pesquisa.

#### Leitura de base {#background-reading-5}

- [Ethereum em ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Pesquisa recente {#recent-research-5}

- [ECDSA em FPGAs](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Segurança {#security}

A segurança é um tópico amplo que pode incluir prevenção de spam/golpes, segurança de carteira, segurança de hardware, segurança da criptoeconomia, caça a bugs e testes de aplicativos e software de cliente, além de gerenciamento de chaves. Contribuir para o conhecimento nessas áreas ajudará a estimular a adoção em massa.

### Criptografia e ZKP {#cryptography--zkp}

As provas de conhecimento zero (ZKP) e a criptografia são essenciais para incorporar privacidade e segurança à Ethereum e aos seus aplicativos. O conhecimento zero é um espaço relativamente jovem, mas de rápido movimento, com muitas oportunidades abertas de pesquisa e desenvolvimento. Algumas possibilidades incluem o desenvolvimento de implementações mais eficientes do [algoritmo de geração de hash Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), encontrar melhores compromissos polinomiais do que os existentes atualmente ou reduzir o custo da geração de chave pública ECDSA e dos circuitos de verificação de assinatura.

#### Leitura de base {#background-reading-6}

- [Blog da 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Pesquisa recente {#recent-research-6}

- [Avanço recente na criptografia de curva elíptica](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [ZK no Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### Carteiras {#wallets}

As carteiras Ethereum podem ser extensões de navegador, aplicativos para desktop e dispositivos móveis ou contratos inteligentes na Ethereum. Há pesquisas ativas sobre carteiras de recuperação social que reduzem parte do risco associado ao gerenciamento de chaves de usuários individuais. Associada ao desenvolvimento de carteiras está a pesquisa de formas alternativas de abstração de conta, que é uma importante área de pesquisa nascente.

#### Leitura de base {#background-reading-7}

- [Introdução às carteiras](/wallets/)
- [Introdução à segurança de carteiras](/security/)
- [Segurança no Ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938: Abstração de conta](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337: Abstração de conta](https://eips.ethereum.org/EIPS/eip-4337)

#### Pesquisa recente {#recent-research-7}

- [Carteiras de contrato inteligente focadas em validação](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [O futuro das contas](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074: Opcodes AUTH e AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Publicação de código em um endereço EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Comunidade, educação e divulgação {#community-education-and-outreach}

A integração de novos usuários na Ethereum requer novos recursos educacionais e abordagens de divulgação. Isso pode incluir postagens de blog e artigos, livros, podcasts, memes, recursos de ensino, eventos e qualquer outra coisa que construa comunidades, dê as boas-vindas a iniciantes e eduque as pessoas sobre a Ethereum.

### UX/UI {#uxui}

Para integrar mais pessoas na Ethereum, o ecossistema deve melhorar a UX/UI. Isso exigirá que designers e especialistas em produtos reexaminem o design de carteiras e aplicativos.

#### Leitura de base {#background-reading-8}

- [UX/UI no Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Pesquisa recente {#recent-research-8}

- [Discord de Design da Web3](https://discord.gg/FsCFPMTSm9)
- [Princípios de Design da Web3](https://www.web3designprinciples.com/)
- [Discussão sobre UX no Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Economia {#economics}

A pesquisa econômica na Ethereum segue amplamente duas abordagens: validar a segurança de mecanismos que dependem de incentivos econômicos ("microeconomia") e analisar os fluxos de valor entre protocolos, aplicativos e usuários ("macroeconomia"). Existem fatores complexos da criptoeconomia relacionados ao ativo nativo da Ethereum (ether) e aos tokens construídos sobre ela (por exemplo, NFTs e tokens ERC-20).

#### Leitura de base {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Workshop ETHconomics na Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Pesquisa recente {#recent-research-9}

- [Análise empírica da EIP-1559](https://arxiv.org/abs/2201.05574)
- [Equilíbrio da oferta circulante](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantificando o MEV: Quão escura é a floresta?](https://arxiv.org/abs/2101.05511)

### Mercados de espaço de bloco e taxas {#blockspace-fee-markets}

Os mercados de espaço de bloco governam a inclusão de transações de usuários finais, seja diretamente na Ethereum (camada 1) ou em redes conectadas por pontes, por exemplo, rollups (camada 2). Na Ethereum, as transações são enviadas ao mercado de taxas implantado no protocolo como EIP-1559, protegendo a cadeia contra spam e precificando o congestionamento. Em ambas as camadas, as transações podem produzir externalidades, conhecidas como Valor Máximo Extraível (MEV), que induzem novas estruturas de mercado para capturar ou gerenciar essas externalidades.

#### Leitura de base {#background-reading-10}

- [Design do mecanismo de taxa de transação para a blockchain da Ethereum: Uma análise econômica da EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulações da EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Economia de rollups a partir de primeiros princípios](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, reordenação de transações e instabilidade de consenso em exchanges descentralizadas](https://arxiv.org/abs/1904.05234)

#### Pesquisa recente {#recent-research-10}

- [Apresentação em vídeo da EIP-1559 multidimensional](https://youtu.be/QbR4MTgnCko)
- [MEV de domínio cruzado](https://arxiv.org/abs/2112.01472)
- [Leilões de MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Incentivos de Prova de Participação {#proof-of-stake-incentives}

Os validadores usam o ativo nativo da Ethereum (ether) como colateral contra comportamento desonesto. A criptoeconomia disso determina a segurança da rede. Validadores sofisticados podem ser capazes de explorar as nuances da camada de incentivo para lançar ataques explícitos.

#### Leitura de base {#background-reading-11}

- [Masterclass de economia da Ethereum e modelo econômico](https://github.com/CADLabs/ethereum-economic-model)
- [Simulações de incentivos de PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Pesquisa recente {#recent-research-11}

- [Aumentando a resistência à censura de transações sob a separação propositor-construtor (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Três ataques à Ethereum PoS](https://arxiv.org/abs/2110.10086)

### Staking líquido e derivativos {#liquid-staking-and-derivatives}

O staking líquido permite que usuários com menos de 32 ETH recebam rendimentos de staking trocando ether por um token que representa o ether em staking que pode ser usado em DeFi. No entanto, os incentivos e a dinâmica de mercado associados ao staking líquido ainda estão sendo descobertos, bem como seu efeito na segurança da Ethereum (por exemplo, riscos de centralização).

#### Leitura de base {#background-reading-12}

- [Staking líquido no Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: O caminho para o staking da Ethereum sem necessidade de confiança](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Introdução ao protocolo de staking](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Pesquisa recente {#recent-research-12}

- [Lidando com saques da Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Credenciais de saque](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Os riscos dos derivativos de staking líquido](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Testes {#testing}

### Verificação formal {#formal-verification}

A verificação formal é escrever código para verificar se as especificações de consenso da Ethereum estão corretas e livres de bugs. Existe uma versão executável da especificação escrita em Python que requer manutenção e desenvolvimento. Pesquisas adicionais podem ajudar a melhorar a implementação em Python da especificação e adicionar ferramentas que possam verificar a exatidão de forma mais robusta e identificar problemas.

#### Leitura de base {#background-reading-13}

- [Introdução à verificação formal](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Verificação formal (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Pesquisa recente {#recent-research-13}

- [Verificação formal do contrato de depósito](https://github.com/runtimeverification/deposit-contract-verification)
- [Verificação formal da especificação da Beacon Chain](https://github.com/runtimeverification/deposit-contract-verification)

## Ciência de dados e análise {#data-science-and-analytics}

Há uma necessidade de mais ferramentas de análise de dados e painéis que forneçam informações detalhadas sobre a atividade na Ethereum e a integridade da rede.

### Leitura de base {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Painel de diversidade de clientes](https://clientdiversity.org/)

#### Pesquisa recente {#recent-research-14}

- [Análise de dados do Robust Incentives Group](https://rig.ethereum.org/)

## Aplicativos e ferramentas {#apps-and-tooling}

A camada de aplicativo suporta um ecossistema diversificado de programas que liquidam transações na camada base da Ethereum. As equipes de desenvolvimento estão constantemente encontrando novas maneiras de aproveitar a Ethereum para criar versões compuníveis, não permissionadas e resistentes à censura de aplicativos importantes da Web2 ou criar conceitos totalmente novos nativos da Web3. Ao mesmo tempo, novas ferramentas estão sendo desenvolvidas para tornar a construção de dapps na Ethereum menos complexa.

### DeFi {#defi}

As finanças descentralizadas (DeFi) são uma das principais classes de aplicativos construídos sobre a Ethereum. As DeFi visam criar "legos de dinheiro" compuníveis que permitem aos usuários armazenar, transferir, emprestar, tomar emprestado e investir criptoativos usando contratos inteligentes. As DeFi são um espaço de movimento rápido que está em constante atualização. A pesquisa de protocolos seguros, eficientes e acessíveis é continuamente necessária.

#### Leitura de base {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: O que são DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Pesquisa recente {#recent-research-15}

- [Finanças descentralizadas, propriedade centralizada?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: O caminho para transações abaixo de um dólar](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAOs {#daos}

Um caso de uso impactante para a Ethereum é a capacidade de se organizar de maneira descentralizada por meio do uso de DAOs. Há muita pesquisa ativa sobre como as DAOs na Ethereum podem ser desenvolvidas e utilizadas para executar formas aprimoradas de governança, como uma ferramenta de coordenação minimizada em confiança, expandindo muito as opções das pessoas além das corporações e organizações tradicionais.

#### Leitura de base {#background-reading-16}

- [Introdução às DAOs](/dao/)
- [DAO Collective](https://daocollective.xyz/)

#### Pesquisa recente {#recent-research-16}

- [Mapeando o ecossistema de DAOs](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Ferramentas para desenvolvedores {#developer-tools}

As ferramentas para desenvolvedores da Ethereum estão melhorando rapidamente. Há muita pesquisa e desenvolvimento ativos a serem feitos nessa área em geral.

#### Leitura de base {#background-reading-17}

- [Ferramentas por linguagem de programação](/developers/docs/programming-languages/)
- [Frameworks para desenvolvedores](/developers/docs/frameworks/)
- [Lista de ferramentas para desenvolvedores de consenso](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Padrões de token](/developers/docs/standards/tokens/)
- [CryptoDevHub: Ferramentas da EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Pesquisa recente {#recent-research-17}

- [Canal de ferramentas de consenso no Discord de P&D da Eth](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oráculos {#oracles}

Os oráculos importam dados offchain para a blockchain de forma não permissionada e descentralizada. Obter esses dados onchain permite que os dapps sejam reativos a fenômenos do mundo real, como flutuações de preços em ativos do mundo real, eventos em aplicativos offchain ou até mesmo mudanças no clima.

#### Leitura de base {#background-reading-18}

- [Introdução aos oráculos](/developers/docs/oracles/)

#### Pesquisa recente {#recent-research-18}

- [Pesquisa sobre oráculos de blockchain](https://arxiv.org/pdf/2004.07140.pdf)
- [White paper da Chainlink](https://chain.link/whitepaper)

### Segurança de aplicativos {#app-security}

Os hacks na Ethereum geralmente exploram vulnerabilidades em aplicativos individuais, em vez de no próprio protocolo. Hackers e desenvolvedores de aplicativos estão travando uma corrida armamentista para desenvolver novos ataques e defesas. Isso significa que sempre há pesquisas e desenvolvimentos importantes necessários para manter os aplicativos protegidos contra hacks.

#### Leitura de base {#background-reading-19}

- [Relatório de exploração da Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Lista de post-mortems de hacks de contratos da Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Pesquisa recente {#recent-research-19}

- [Aplicativos no Ethresear.ch](https://ethresear.ch/c/applications/18)

### Pilha de tecnologia {#technology-stack}

Descentralizar toda a pilha de tecnologia da Ethereum é uma importante área de pesquisa. Atualmente, os dapps na Ethereum geralmente têm alguns pontos de centralização porque dependem de ferramentas ou infraestrutura centralizadas.

#### Leitura de base {#background-reading-20}

- [Pilha da Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase: Introdução à pilha da Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Introdução aos contratos inteligentes](/developers/docs/smart-contracts/)
- [Introdução ao armazenamento descentralizado](/developers/docs/storage/)

#### Pesquisa recente {#recent-research-20}

- [Composabilidade de contratos inteligentes](/developers/docs/smart-contracts/composability/)