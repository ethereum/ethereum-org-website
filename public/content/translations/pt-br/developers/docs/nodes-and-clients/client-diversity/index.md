---
title: Diversidade de clientes
description: Uma explicação de alto nível sobre a importância da diversidade de clientes do Ethereum.
lang: pt-br
sidebarDepth: 2
---

O comportamento de um nó do [Ethereum](/) é controlado pelo software cliente que ele executa. Existem vários clientes do Ethereum em nível de produção, cada um desenvolvido e mantido em diferentes linguagens por equipes separadas. Os clientes são construídos de acordo com uma especificação comum que garante que eles se comuniquem perfeitamente entre si, tenham a mesma funcionalidade e forneçam uma experiência de usuário equivalente. No entanto, no momento, a distribuição de clientes entre os nós não é igual o suficiente para realizar essa fortificação da rede em todo o seu potencial. Idealmente, os usuários se dividem de forma aproximadamente igual entre os vários clientes para trazer a maior diversidade de clientes possível para a rede.

## Pré-requisitos {#prerequisites}

Se você ainda não entende o que são nós e clientes, confira [nós e clientes](/developers/docs/nodes-and-clients/). As camadas de [execução](/glossary/#execution-layer) e [consenso](/glossary/#consensus-layer) estão definidas no glossário.

## Por que existem vários clientes? {#why-multiple-clients}

Existem vários clientes desenvolvidos e mantidos de forma independente porque a diversidade de clientes torna a rede mais resiliente a ataques e bugs. Ter vários clientes é um ponto forte exclusivo do Ethereum - outras blockchains dependem da infalibilidade de um único cliente. No entanto, não basta simplesmente ter vários clientes disponíveis, eles precisam ser adotados pela comunidade e o total de nós ativos deve ser distribuído de forma relativamente uniforme entre eles.

## Por que a diversidade de clientes é importante? {#client-diversity-importance}

Ter muitos clientes desenvolvidos e mantidos de forma independente é vital para a saúde de uma rede descentralizada. Vamos explorar os motivos.

### Bugs {#bugs}

Um bug em um cliente individual é um risco menor para a rede quando ele representa uma minoria dos nós do Ethereum. Com uma distribuição aproximadamente uniforme de nós entre muitos clientes, a probabilidade de a maioria dos clientes sofrer de um problema compartilhado é pequena e, como resultado, a rede é mais robusta.

### Resiliência a ataques {#resilience}

A diversidade de clientes também oferece resiliência a ataques. Por exemplo, um ataque que [engana um cliente específico](https://twitter.com/vdWijden/status/1437712249926393858) para um ramo específico da cadeia tem pouca probabilidade de ser bem-sucedido porque é improvável que outros clientes sejam exploráveis da mesma maneira e a cadeia canônica permanece não corrompida. A baixa diversidade de clientes aumenta o risco associado a um hack no cliente dominante. A diversidade de clientes já provou ser uma defesa importante contra ataques maliciosos na rede, por exemplo, o ataque de negação de serviço Shanghai em 2016 foi possível porque os invasores conseguiram enganar o cliente dominante (Geth) para executar uma operação lenta de E/S de disco dezenas de milhares de vezes por bloco. Como clientes alternativos também estavam online e não compartilhavam a vulnerabilidade, o Ethereum conseguiu resistir ao ataque e continuar a operar enquanto a vulnerabilidade no Geth era corrigida.

### Finalidade da Prova de Participação (PoS) {#finality}

Um bug em um cliente de consenso com mais de 33% dos nós do Ethereum poderia impedir a camada de consenso de atingir a finalidade, o que significa que os usuários não poderiam confiar que as transações não seriam revertidas ou alteradas em algum momento. Isso seria muito problemático para muitos dos aplicativos construídos sobre o Ethereum, particularmente finanças descentralizadas (DeFi).

<Emoji text="🚨" className="me-4" /> Pior ainda, um bug crítico em um cliente com uma supermaioria de dois terços poderia fazer com que a cadeia se <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">dividisse e finalizasse incorretamente</a>, levando um grande conjunto de validadores a ficar preso em uma cadeia inválida. Se quiserem voltar à cadeia correta, esses validadores enfrentarão uma penalização ou um saque voluntário e reativação lentos e caros. A magnitude de uma penalização aumenta com o número de nós culpados, com uma supermaioria de dois terços sendo penalizada ao máximo (32 ETH).

Embora esses sejam cenários improváveis, o ecossistema do Ethereum pode mitigar seu risco nivelando a distribuição de clientes entre os nós ativos. Idealmente, nenhum cliente de consenso jamais alcançaria uma participação de 33% do total de nós.

### Responsabilidade compartilhada {#responsibility}

Há também um custo humano em ter clientes majoritários. Isso coloca excesso de tensão e responsabilidade em uma pequena equipe de desenvolvimento. Quanto menor a diversidade de clientes, maior o fardo de responsabilidade para os desenvolvedores que mantêm o cliente majoritário. Distribuir essa responsabilidade por várias equipes é bom tanto para a saúde da rede de nós do Ethereum quanto para sua rede de pessoas.

## Diversidade de clientes atual {#current-client-diversity}

### Clientes de execução {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Clientes de consenso {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Other", value: 0.07 }
]}
/>

Este diagrama pode estar desatualizado — acesse [ethernodes.org](https://ethernodes.org) e [clientdiversity.org](https://clientdiversity.org) para obter informações atualizadas.

Os dois gráficos de pizza acima mostram instantâneos da diversidade de clientes atual para as camadas de execução e consenso (no momento da redação, em outubro de 2025). A diversidade de clientes melhorou ao longo dos anos, e a camada de execução viu uma redução na dominação pelo [Geth](https://geth.ethereum.org/), com o [Nethermind](https://www.nethermind.io/nethermind-client) em um segundo lugar próximo, o [Besu](https://besu.hyperledger.org/) em terceiro e o [Erigon](https://github.com/ledgerwatch/erigon) em quarto, com outros clientes compreendendo menos de 3% da rede. O cliente mais comumente usado na camada de consenso — [Lighthouse](https://lighthouse.sigmaprime.io/) — está bem próximo do segundo mais usado. [Prysm](https://prysmaticlabs.com/#projects) e [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) representam ~31% e ~14% respectivamente, e outros clientes raramente são usados.

Os dados da camada de execução foram obtidos de [supermajority.info](https://supermajority.info/) em 26 de outubro de 2025. Os dados para clientes de consenso foram obtidos de [Michael Sproul](https://github.com/sigp/blockprint). Os dados de clientes de consenso são mais difíceis de obter porque os clientes da camada de consenso nem sempre têm rastros inequívocos que possam ser usados para identificá-los. Os dados foram gerados usando um algoritmo de classificação que às vezes confunde alguns dos clientes minoritários (veja [aqui](https://twitter.com/sproulM_/status/1440512518242197516) para mais detalhes). No diagrama acima, essas classificações ambíguas são tratadas com um rótulo de um ou outro (por exemplo, Nimbus/Teku). No entanto, é claro que a maioria da rede está executando o Prysm. Apesar de serem apenas instantâneos, os valores no diagrama fornecem uma boa noção geral do estado atual da diversidade de clientes.

Dados atualizados de diversidade de clientes para a camada de consenso agora estão disponíveis em [clientdiversity.org](https://clientdiversity.org/).

## Camada de execução {#execution-layer}

Até agora, a conversa sobre a diversidade de clientes tem se concentrado principalmente na camada de consenso. No entanto, o cliente de execução [Geth](https://geth.ethereum.org) atualmente é responsável por cerca de 85% de todos os nós. Essa porcentagem é problemática pelos mesmos motivos que para os clientes de consenso. Por exemplo, um bug no Geth afetando o tratamento de transações ou a construção de cargas de execução poderia levar os clientes de consenso a finalizar transações problemáticas ou com bugs. Portanto, o Ethereum seria mais saudável com uma distribuição mais uniforme de clientes de execução, idealmente sem nenhum cliente representando mais de 33% da rede.

## Use um cliente minoritário {#use-minority-client}

Lidar com a diversidade de clientes exige mais do que usuários individuais escolhendo clientes minoritários - exige que pools de validadores e instituições como os principais aplicativos descentralizados (dapps) e exchanges também mudem de clientes. No entanto, todos os usuários podem fazer sua parte para corrigir o desequilíbrio atual e normalizar o uso de todos os softwares do Ethereum disponíveis. Após o The Merge, todos os operadores de nós serão obrigados a executar um cliente de execução e um cliente de consenso. Escolher combinações dos clientes sugeridos abaixo ajudará a aumentar a diversidade de clientes.

### Clientes de execução {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Clientes de consenso {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Usuários técnicos podem ajudar a acelerar esse processo escrevendo mais tutoriais e documentação para clientes minoritários e incentivando seus colegas operadores de nós a migrarem dos clientes dominantes. Guias para mudar para um cliente de consenso minoritário estão disponíveis em [clientdiversity.org](https://clientdiversity.org/).

## Painéis de diversidade de clientes {#client-diversity-dashboards}

Vários painéis fornecem estatísticas de diversidade de clientes em tempo real para a camada de execução e de consenso.

**Camada de consenso:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Camada de execução:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Leitura adicional {#further-reading}

- [Diversidade de clientes na camada de consenso do Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [The Merge do Ethereum: Execute o cliente majoritário por sua própria conta e risco!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 de março de 2022_
- [Importância da diversidade de clientes](https://our.status.im/the-importance-of-client-diversity/)
- [Lista de serviços de nós do Ethereum](https://ethereumnodes.com/)
- [Os "Cinco Porquês" do problema da diversidade de clientes](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Diversidade do Ethereum e como resolvê-la (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Tópicos relacionados {#related-topics}

- [Execute um nó do Ethereum](/run-a-node/)
- [Nós e clientes](/developers/docs/nodes-and-clients/)