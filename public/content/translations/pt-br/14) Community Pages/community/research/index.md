---
title: Áreas ativas de pesquisa do Ethereum
description: Acesse diferentes áreas de pesquisa aberta e saiba como participar.
lang: pt-br
---

# Áreas ativas de pesquisa da Ethereum {#active-areas-of-ethereum-research}

Um dos principais pontos fortes do Ethereum é ele está sendo constantemente aprimorado por meio de uma comunidade ativa de pesquisa e engenharia. Muitas pessoas entusiasmadas e capacitadas ao redor do mundo gostariam de se dedicar a questões pendentes no Ethereum, mas nem sempre é fácil descobrir quais são essas questões. Esta página descreve as principais áreas de pesquisa ativas como um guia aproximado da tecnologia de ponta do Ethereum.

## Como funciona da pesquisa do Ethereum {#how-ethereum-research-works}

A pesquisa do Ethereum é aberta e transparente, incorporando os princípios da [Ciência Descentralizada (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). A cultura é tornar as ferramentas e os resultados de pesquisa tão abertos e interativos quanto possível, por exemplo, por meio de notebooks executáveis. A pesquisa sobre o Ethereum avança rapidamente, com novas descobertas publicadas e discutidas abertamente em fóruns como o [ethresear.ch] (https://ethresear.ch/), em vez de chegar à comunidade por meio de publicações tradicionais após rodadas de revisão por pares.

## Recursos para pesquisa comum {#general-research-resources}

Independentemente do tópico específico, há uma grande quantidade de informações sobre a pesquisa da Ethereum que podem ser encontradas em [ethresear.ch](https://ethresear.ch) e no [Eth R&D Discord channel](https://discord.gg/qGpsxSA). Esses são os principais locais onde os pesquisadores do Ethereum discutem as ideias e oportunidades mais recentes de desenvolvimento.

Esse relatório que foi publicado em maio de 2022 pela [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) fornece uma boa visão geral sobre o plano de ação da Ethereum.

## Fontes de financiamento {#sources-of-funding}

Você pode participar da pesquisa do Ethereum e ser pago por isso! Por exemplo, a [Fundação Ethereum](/foundation/) realizou recentemente uma rodada de financiamento [Academic Grants](https://esp.ethereum.foundation/academic-grants). Você pode encontrar informações sobre oportunidades de financiamento ativas e futuras na [página de concessões da Ethereum] (/community/grants/).

## Pesquisa de protocolo {#protocol-research}

A pesquisa de protocolo está relacionada à camada de base da Ethereum, o conjunto de regras que define como os nós se conectam, se comunicam, trocam e armazenam dados do Ethereum e chegam a um consenso sobre o estado do blockchain. A pesquisa de protocolos é dividida em duas categorias de nível superior: consenso e execução.

### Consenso {#consensus}

A pesquisa sobre consenso se preocupa com o [mecanismo de prova de participação da Ethereum](/developers/docs/consensus-mechanisms/pos/). Alguns exemplos de tópicos de pesquisa de consenso são:

- identificar e resolver vulnerabilidades;
- quantificar a segurança criptoeconômica;
- aumentar a segurança ou desempenho de implementações do cliente;
- e desenvolver clientes leves.

Além da pesquisa voltada para o futuro, algumas reformulações fundamentais do protocolo, como a finalidade de espaço único, estão sendo pesquisadas para permitir melhorias significativas no Ethereum. Além disso, a eficiência, a segurança e o monitoramento da rede ponto a ponto entre clientes de consenso também são importantes tópicos de pesquisa.

#### Leitura de apoio {#background-reading}

- [Introdução à prova de participação](/developers/docs/consensus-mechanisms/pos/)
- [Artigo Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Explicando o Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Artigo Gasper](https://arxiv.org/abs/2003.03052)

#### Pesquisa recente {#recent-research}

- [Ethresear.ch Consenso](https://ethresear.ch/c/consensus/29)
- [Dilema disponibilidade/finalidade](https://arxiv.org/abs/2009.04987)
- [Finalidade de posição única](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Separação sugestor-construtor](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Execução {#execution}

A camada de execução é responsável pelas transações em execução, o funcionamento da [máquina virtual Ethereum (EVM)](/developers/docs/evm/) e a geração de cargas de execução para serem transferidas para a camada de consenso. Há muitas áreas ativas de pesquisa, incluindo:

- desenvolvimento de suporte a cliente leve;
- pesquisa de limites de gás;
- e incorporar novas estruturas de dados (por exemplo, Verkle Trees).

#### Leitura de apoio {#background-reading-1}

- [Introdução à EVM](/developers/docs/evm)
- [Ethresear.ch camada de execução](https://ethresear.ch/c/execution-layer-research/37)

#### Pesquisa recente {#recent-research-1}

- [Otimizações da base de dados](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Término de estado](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Caminhos para o término de estado](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Verkle e a proposta do término de estado](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Gerenciamento de histórico](https://eips.ethereum.org/EIPS/eip-4444)
- [Árvores Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Amostragem de disponibilidade de dados](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Desenvolvimento de cliente {#client-development}

Os clientes Ethereum são implementações do protocolo Ethereum. O desenvolvimento do cliente transforma os resultados da pesquisa de protocolo em realidade ao incorporá-los nesses clientes. O desenvolvimento do cliente inclui a atualização das especificações do cliente, bem como a criação de implementações específicas.

Um nó Ethereum é necessário para executar dois softwares:

1. um cliente de consenso para manter o controle da cabeça do blockchain, blocos de transmissão e para processar a lógica de consenso
2. um cliente de execução para oferecer suporte à Máquina Virtual do Ethereum e executar transações e contratos inteligentes

Consulte a página [nós e clientes] (/developers/docs/nodes-and-clients/) para obter mais detalhes sobre nós e clientes e para obter uma lista de todas as implementações atuais de clientes. Você também pode encontrar um histórico de todas as atualizações do Ethereum na página [historia page](/history/).

### Clientes de execução {#execution-clients}

- [Especificação do cliente de execução] (https://github.com/ethereum/execution-specs)
- [Especificação da API de execução] (https://github.com/ethereum/execution-apis)

### Clientes de consenso {#consensus-clients}

- Clientes de consenso {#consensus-clients}
- [Especificação da API do Beacon] (https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Escalabilidade e desempenho {#escalonamento-e-desempenho}

A escalabilidade do Ethereum é uma importnate área de foco dos pesquisadores Ethereum. As abordagens atuais incluem descarregar transações em rollups e torná-las o mais financeiramente acessíveis possível usando blobs de dados. Informações introdutórias sobre a escalabilidade da Ethereum estão disponíveis em nossa [página de escala] (/developers/docs/scaling).

### Camada 2 {#layer-2}

Atualmente, há vários protocolos de camada 2 que dimensionam o Ethereum por meio de diferentes técnicas para agrupar transações e protegê-las na camada 1 do Ethereum. Esse é um tópico de crescimento muito rápido, com muito potencial de pesquisa e desenvolvimento.

#### Leitura de apoio {#background-reading-2}

- [Introdução à camada 2](/layer-2/)
- [Polynya: Rollups, DA e cadeias modulares](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Pesquisa recente {#recent-research-2}

- [Ordenação justa do Arbitrum para sequenciadores](https://eprint.iacr.org/2021/1465)
- [ethresear.ch Camada 2](https://ethresear.ch/c/layer-2/32)
- [Roteiro centrado em rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Pontes {#bridges}

Uma área específica da camada 2 que exige mais pesquisa e desenvolvimento são as pontes seguras e de bom desempenho. Isso inclui pontes entre várias Camadas 2 e entre a Camada 1 e a Camada 2. Essa é uma área de pesquisa particularmente importante porque os hackers normalmente visam as pontes (bridges).

#### Leitura de apoio {#background-reading-3}

- [Introdução às pontes de blockchain](/bridges/)
- [Vitalik abordando as pontes](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Artigo das pontes do Blockchain](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Valor bloqueado em pontes](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Pesquisa recente {#recent-research-3}

- [Validação de pontes](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding {#sharding}

A fragmentação do blockchain do Ethereum faz parte do roadmap de desenvolvimento há muito tempo. Entretanto, novas soluções de escalabilidade, como "Danksharding", atualmente ocupam o centro das atenções.

O precursor do Danksharding completo, conhecido como Proto-Danksharding, entrou em operação com a atualização da rede Cancun-Deneb ("Dencun").

[Mais informações sobre a atualização do Dencun](/roadmap/dencun/)

#### Leitura de apoio {#background-reading-4}

- [Notas sobre o Proto-Danksharding] (https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Vídeo de Danksharding sem banco](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Compêndio de pesquisa sobre fragmentação da Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Pesquisa recente {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik sobre sharding e amostragem de disponibilidade de dados] (https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[A execução de nós](/developers/docs/nodes-and-clients/run-a-node/) em hardware modesto é fundamental para manter a descentralização da Ethereum. Portanto, a pesquisa ativa para minimizar os requisitos de hardware para executar os nós é uma importante área de pesquisa.

#### Leitura de apoio {#background-reading-5}

- [Ethereum em ARM] (https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Pesquisa recente {#recent-research-5}

- [ecdsa sobre FPGAs](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Segurança {#security}

Segurança é um tópico amplo que pode incluir prevenção de spam/scam, segurança de carteira, segurança de hardware, segurança criptoeconômica, caça a bugs e testes de aplicativos e software cliente, bem como gerenciamento de chaves. Contribuir para o conhecimento nessas áreas ajudará a incentivar a adoção generalizada.

### Criptografia e ZKP {#cryptography--zkp}

As provas de conhecimento zero (ZKP) e criptografia são essenciais para o desenvolvimento de privacidade e segurança no Ethereum e em seus aplicativos. O conhecimento zero é um espaço relativamente novo, mas em rápida evolução, com muitas oportunidades abertas de pesquisa e desenvolvimento. Algumas possibilidades incluem o desenvolvimento de implementações mais eficientes do [algoritmo de hashing Keccak] (https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), a descoberta de compromissos polinomiais melhores do que os existentes atualmente ou a redução do custo dos circuitos de geração de chaves públicas e de verificação de assinaturas da ecdsa.

#### Leitura de apoio {#background-reading-6}

- [Blog do 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast do Zero Knowledge](https://zeroknowledge.fm/)

#### Pesquisa recente {#recent-research-6}

- [Avanços recentes na criptografia de curva elíptica](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Carteiras {#wallets}

As carteiras Ethereum podem ser extensões de navegador, aplicativos móveis e de desktop ou contratos inteligentes no Ethereum. Há uma pesquisa ativa sobre carteiras de recuperação social que reduzem parte do risco associado ao gerenciamento de chaves de usuários individuais. Associada ao desenvolvimento de carteiras está a pesquisa de formas alternativas de abstração de contas, que é uma área importante de pesquisa emergente.

#### Leitura de apoio {#background-reading-7}

- [Introdução às carteiras](/wallets/)
- [Introdução à segurança da carteira](/security/)
- [Segurança em ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938 Abstração de contas](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Abstração de contas](https://eips.ethereum.org/EIPS/eip-4337)

#### Pesquisa recente {#recent-research-7}

- [Carteiras de contratos inteligentes com foco em validação] (https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [O futuro das contas] (https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH e os AUTHCALL Opcodes] (https://eips.ethereum.org/EIPS/eip-3074)
- [Código de publicação em um endereço EOA] (https://eips.ethereum.org/EIPS/eip-5003)

## Comunidade, educação e alcance {#community-education-and-outreach}

A integração de novos usuários ao Ethereum exige novos recursos educacionais e abordagens de divulgação. Isso pode incluir postagens e artigos de blog, livros, podcasts, memes, recursos de aprendizagem, eventos e qualquer outra coisa que crie comunidades, dê as boas-vindas a novos iniciantes e instrua as pessoas sobre a Ethereum.

### UX/UI {#uxui}

Para atrair mais pessoas para o Ethereum, o ecossistema precisa melhorar a UX/UI. Isso exigirá que designers e especialistas de produtos reexaminem o design de carteiras e aplicativos.

#### Leitura de apoio {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Pesquisa recente {#recent-research-8}

- [Web3 design no Discord](https://discord.gg/FsCFPMTSm9)
- [Princípios de design da Web3 no Discord](https://www.web3designprinciples.com/)
- [Discussão sobre o UX do Ethereum Magicians] (https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Economia {#economics}

De modo geral, a pesquisa de economia no Ethereum segue duas abordagens: validar a segurança dos mecanismos que dependem de incentivos econômicos ("microeconomia") e analisar os fluxos de valor entre protocolos, aplicativos e usuários ("macroeconomia"). Há fatores criptoeconômicos complexos relacionados ao ativo nativo do Ethereum (ether) e aos tokens criados com base nele (por exemplo, NFTs e tokens ERC20).

#### Leitura de apoio {#background-reading-9}

- [Grupo de Incentivos Robustos](https://ethereum.github.io/rig/)
- [Workshop de ETHconomics na Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Pesquisa recente {#recent-research-9}

- [Análise empírica do EIP1559] (https://arxiv.org/abs/2201.05574)
- [Equilíbrio de abastecimento circulante](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantificando o MEV: quão escura é a floresta?] (https://arxiv.org/abs/2101.05511)

### Espaço de blocos e mercados de taxas {#blockspace-fee-markets}

Os mercados de espaço de bloco regem a inclusão de transações de usuários finais, seja diretamente na Ethereum (Camada 1) ou em redes em ponte, por exemplo, rollups (Camada 2). No Ethereum, as transações são enviadas ao mercado de taxas implantado no protocolo como EIP-1559, protegendo a cadeia contra spam e congestionamento de preços. Em ambas as camadas, as transações podem produzir externalidades, conhecidas como Valor Máximo Extraível (MEV), que induzem novas estruturas de mercado para capturar ou gerenciar essas externalidades.

#### Leitura de apoio {#background-reading-10}

- [Design do mecanismo da taxa de transação para Blockchain Ethereum: uma análise econômica do EIP-1559 (Tim Roughgarden, 2020](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulações da EIP-1559 (Grupo de Incentivos Robustos)] (https://ethereum.github.io/abm1559)
- [Economia de rollup a partir dos primeiros princípios](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, Reordenação de Transações e Instabilidade de Consenso em Exchanges Descentralizadas](https://arxiv.org/abs/1904.05234)

#### Pesquisa recente {#recent-research-10}

- [Apresentação em vídeo do EIP-1559 multidimensional] (https://youtu.be/QbR4MTgnCko)
- [MEV de domínio cruzado] (http://arxiv.org/abs/2112.01472)
- [Leilões MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Incentivos de prova de participação {#proof-of-stake-incentives}

Os validadores usam o ativo nativo do Ethereum (ether) como garantia contra comportamento desonesto. As criptoeconomias disso determinam a segurança da rede. Validadores sofisticados podem ser capazes de explorar as nuances da camada de incentivo para lançar ataques explícitos.

#### Leitura de apoio {#background-reading-11}

- [Aula magna de economia do Ethereum e modelo econômico] (https://github.com/CADLabs/ethereum-economic-model)
- [Simulações de incentivos de PoS (Grupo de Incentivos Robustos)] (https://ethereum.github.io/beaconrunner/)

#### Pesquisa recente {#recent-research-11}

- [Aumento da resistência à censura de transações sob separação entre proponente e construtor (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Três ataques ao PoS Ethereum](https://arxiv.org/abs/2110.10086)

### Estaca líquida e derivativos {#liquid-staking-and-derivatives}

A participação líquida permite que os usuários com menos de 32 ETH recebam rendimentos de participação ao trocar ether por um token que representa o ether participado que pode ser utilizado em DeFi. Entretanto, os incentivos e a dinâmica de mercado associados à participação líquida ainda estão sendo descobertos, bem como seu efeito na segurança do Ethereum (por exemplo, riscos de centralização).

#### Leitura de apoio {#background-reading-12}

- [Estaca líquida em Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: O caminho para o staking de Ethereum sem confiança](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Introdução ao protocolo de staking](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Pesquisa recente {#recent-research-12}

- [Tratamento de retiradas do Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Credenciais de retirada] (https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Os riscos dos derivativos de estaca líquida] (https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Testes {#testing}

### Verificação formal {#formal-verification}

A verificação formal consiste em escrever código para verificar se as especificações de consenso do Ethereum estão corretas e sem erros. Há uma versão executável da especificação escrita em Python que exige manutenção e desenvolvimento. Pesquisas adicionais podem ajudar a aprimorar a implementação da especificação em Python e adicionar ferramentas que possam verificar a correção e identificar problemas de uma maneira mais eficiente.

#### Leitura de apoio {#background-reading-13}

- [Introdução à verificação formal] (https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Verificação Formal (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Pesquisa recente {#recent-research-13}

- [Verificação formal do contrato de depósito] (https://github.com/runtimeverification/deposit-contract-verification)
- [Verificação formal da especificação da cadeia de Sinalizador] (https://github.com/runtimeverification/deposit-contract-verification)

## Ciência de dados e Analíticos {#data-science-and-analytics}

São necessárias mais ferramentas de análise de dados e painéis que ofereçam informações detalhadas sobre a atividade no Ethereum e a integridade da rede.

### Leitura de apoio {#background-reading-14}

- [Analíticos Dune](https://dune.com/browse/dashboards)
- [Painel de diversidade do cliente] (https://clientdiversity.org/)

#### Pesquisa recente {#recent-research-14}

- [Análise robusta de dados do grupo de incentivos] (https://ethereum.github.io/rig/)

## Aplicativos e ferramentas {#apps-and-tooling}

A camada de aplicativos oferece suporte a um ecossistema diversificado de programas que liquidam transações na camada de base do Ethereum. As equipes de desenvolvimento estão constantemente encontrando novas maneiras de utilizar o Ethereum para criar versões compostas, sem permissão e resistentes à censura de aplicativos importantes de Web2 ou criar conceitos nativos de Web3 completamente novos. Ao mesmo tempo, estão sendo desenvolvidas novas ferramentas que fazem com que a criação de dApps no Ethereum seja menos complexa.

### DeFi {#defi}

Finanças Descentralizadas (DeFi) é uma das principais classes de aplicações criadas com base no Ethereum. O objetivo da DeFi é criar "legos de dinheiro" compostos que permitam aos usuários armazenar, transferir, emprestar, tomar emprestado e investir ativos criptográficos utilizando contratos inteligentes. DeFi é um espaço em rápida evolução que está em constante atualização. Pesquisas sobre protocolos seguros, eficientes e acessíveis são continuamente necessárias.

#### Leitura de apoio {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: O que é DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Pesquisa recente {#recent-research-15}

- [Finanças descentralizadas, propriedade centralizada?](https://arxiv.org/pdf/2012.09306.pdf)
- [Otimismo: O caminho para transações abaixo do dólar](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAOs {#daos}

Um caso de uso de impacto para o Ethereum é a capacidade de se organizar de forma descentralizada por meio da utilização de DAOs. Há muitas pesquisas ativas sobre como as organizações autônomas descentralizadas (DAOs) no Ethereum podem ser desenvolvidas e utilizadas para executar formas aprimoradas de governança, como uma ferramenta de coordenação com minimização de confiança, o que amplia bastante as opções das pessoas além das corporações e organizações tradicionais.

#### Leitura de apoio {#background-reading-16}

- [Introdução aos DAOs](/dao/)
- [Coletivo Dao] (https://daocollective.xyz/)

#### Pesquisa recente {#recent-research-16}

- [Mapeamento do ecossistema DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Ferramentas do desenvolvedor {#developer-tools}

As ferramentas para desenvolvedores do Ethereum têm melhorado rapidamente. Há muita pesquisa e desenvolvimento ativos a serem feitos nessa área geral.

#### Leitura de apoio {#background-reading-17}

- [Ferramentas por linguagem de programação](/developers/docs/programming-languages/)
- [Estruturas de desenvolvedor](/developers/docs/frameworks/)
- [Lista de ferramentas de desenvolvedor do consenso] (https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Padrões de token](/developers/docs/standards/tokens/)
- [CryptoDevHub: Ferramentas EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Pesquisa recente {#recent-research-17}

- [Canal no Discord de ferramentas de consenso do Eth R&D](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oráculos {#oracles}

Os oráculos importam dados fora da cadeia para o blockchain de uma maneira descentralizada e sem permissão. A obtenção desses dados em cadeia permite que os dApps sejam reativos a fenômenos reais, como flutuações de preço em ativos reais, eventos em aplicativos fora da cadeia ou inclusive alterações climáticas.

#### Leitura de apoio {#background-reading-18}

- [Introdução aos oráculos](/developers/docs/oracles/)

#### Pesquisa recente {#recent-research-18}

- [Pesquisa sobre oráculos de blockchain] (https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlink white paper](https://chain.link/whitepaper)

### Segurança de aplicativos {#app-security}

Os hacks na Ethereum geralmente exploram vulnerabilidades em aplicativos individuais, em vez de no próprio protocolo. Os hackers e os desenvolvedores de aplicativos estão em uma luta de braço para desenvolver novos ataques e defesas. Isso significa que sempre há necessidade de pesquisa e desenvolvimento importantes para manter os aplicativos protegidos contra invasões.

#### Leitura de apoio {#background-reading-19}

- [Relatório de exploração de wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Lista de post-mortems de hack de contrato da Ethereum] (https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://twitter.com/RektHQ?s=20\&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Pesquisa recente {#recent-research-19}

- [Aplicativos em ethresear.ch] (https://ethresear.ch/c/applications/18)

### Stack de tecnologia {#technology-stack}

A descentralização de toda a pilha de tecnologia Ethereum é uma importante área de pesquisa. Atualmente, os dApps no Ethereum geralmente têm alguns pontos de centralização porque dependem de ferramental ou infraestrutura centralizadas.

#### Leitura de apoio {#background-reading-20}

- [Ethereum stack](/developers/docs/ethereum-stack/)
- [Coinbase: Introdução ao Web3 Stack](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Introdução aos contratos inteligentes](/developers/docs/smart-contracts/)
- [Introdução ao armazenamento descentralizado](/developers/docs/storage/)

#### Pesquisa recente {#recent-research-20}

- [Composição de contratos inteligentes](/developers/docs/smart-contracts/composability/)
