---
title: Diversidade dos clientes
description: "Uma explicação de alto nível sobre a importância da diversidade de clientes do Ethereum."
lang: pt-br
sidebarDepth: 2
---

O comportamento de um nó Ethereum é controlado pelo software do cliente que ele executa. Existem vários clientes Ethereum em nível de produção, cada um desenvolvido e mantido em diferentes idiomas por equipes separadas. Os clientes são construídos para uma especificação comum que garante que os clientes se comuniquem perfeitamente entre si e tenham a mesma funcionalidade e forneçam uma experiência de usuário equivalente. No entanto, no momento, a distribuição de clientes entre os nós não é igual o suficiente para realizar essa fortificação de rede em todo o seu potencial. O ideal é que os usuários se dividam de forma aproximadamente igualitária entre os vários clientes para trazer o máximo de diversidade de clientes possível para a rede.

## Pré-requisitos {#prerequisites}

Se você ainda não entende o que são nós e clientes, confira [nós e clientes](/developers/docs/nodes-and-clients/). As camadas de [execução](/glossary/#execution-layer) e de [consenso](/glossary/#consensus-layer) são definidas no glossário.

## Por que existem vários clientes? {#why-multiple-clients}

Vários clientes desenvolvidos e mantidos de forma independente existem porque a diversidade do cliente torna a rede mais resiliente a ataques e bugs. Vários clientes são uma força única para o Ethereum – outras cadeias de blocos dependem da infalibilidade de um único cliente. No entanto, não basta simplesmente ter vários clientes disponíveis, eles têm que ser adotados pela comunidade e o total de nós ativos distribuídos de forma relativamente uniforme entre eles.

## Por que a diversidade de clientes é importante? {#client-diversity-importance}

Ter muitos clientes desenvolvidos e mantidos de forma independente é vital para a saúde de uma rede descentralizada. Vamos explorar as razões do porquê.

### Bugs {#bugs}

Um bug em um cliente individual é um risco menor para a rede ao representar uma minoria de nós Ethereum. Com uma distribuição aproximadamente uniforme de nós entre muitos clientes, a probabilidade de a maioria dos clientes sofrer de um problema compartilhado é pequena e, como resultado, a rede é mais robusta.

### Resiliência a ataques {#resilience}

A diversidade de clientes também oferece resiliência a ataques. Por exemplo, um ataque que [engana um determinado cliente](https://twitter.com/vdWijden/status/1437712249926393858) em um determinado ramo da cadeia tem poucas chances de ser bem-sucedido, pois é improvável que outros clientes sejam exploráveis da mesma forma e a cadeia canônica permanece incorrupta. A baixa diversidade de clientes aumenta o risco associado a um hack no cliente dominante. A diversidade de clientes já provou ser uma defesa importante contra ataques maliciosos na rede, por exemplo, o ataque de negação de serviço de Xangai em 2016 foi possível porque os invasores conseguiram enganar o cliente dominante (Geth) para executar uma operação lenta de E/S de disco dezenas de milhares de vezes por bloco. Como clientes alternativos também estavam online e não compartilharam a vulnerabilidade, o Ethereum foi capaz de resistir ao ataque e continuar operando enquanto a vulnerabilidade no Geth foi corrigida.

### Finalidade da prova de participação {#finality}

Um erro em um cliente de consenso com mais de 33% dos nós Ethereum poderia impedir a finalização da camada de consenso, e isso deixaria os utilizadores em dúvida com respeito à probabilidade de as transações não serem revertidas ou alteradas em algum momento. Isso seria muito problemático para muitos dos aplicativos construídos em cima do Ethereum, particularmente o DeFi.

<Emoji text="🚨" className="me-4" /> Pior ainda, um bug crítico em um cliente com uma maioria de dois terços poderia fazer com que a cadeia <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">se dividisse e finalizasse incorretamente</a>, levando a um grande conjunto de validadores que ficariam presos em uma cadeia inválida. Se quiserem voltar a integrar à cadeia correta, esses validadores enfrentam cortes ou uma lenta e cara retirada e reativação voluntária. A magnitude de uma escala de remoção com o número de nós culpáveis com uma maioria de dois terços reduzido ao máximo (32 ETH).

Embora estes sejam cenários improváveis, o ecossistema Ethereum pode mitigar seus riscos nivelando a distribuição de clientes entre os nós ativos. Idealmente, nenhum cliente de consenso chegaria a uma participação de 33% dos nós totais.

### Responsabilidade compartilhada {#responsibility}

Há também um custo humano para ter a maioria dos clientes. Isso coloca excesso de tensão e responsabilidade em uma pequena equipe de desenvolvimento. Quanto menor a diversidade de clientes, maior a carga de responsabilidade para os desenvolvedores que mantêm a maioria dos clientes. Promover essa responsabilidade em várias equipes é bom tanto para a saúde da rede de nós do Ethereum quanto para sua rede de pessoas.

## Diversidade atual de clientes {#current-client-diversity}

### Clientes de Execução {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Clientes de Consenso {#consensus-clients-breakdown}

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

Os dois gráficos de pizza acima mostram um panorama da diversidade atual de clientes para as camadas de execução e de consenso (no momento da redação, em outubro de 2025). A diversidade de clientes melhorou ao longo dos anos, e a camada de execução viu uma redução no domínio do [Geth](https://geth.ethereum.org/), com o [Nethermind](https://www.nethermind.io/nethermind-client) em segundo lugar, o [Besu](https://besu.hyperledger.org/) em terceiro e o [Erigon](https://github.com/ledgerwatch/erigon) em quarto, com outros clientes compreendendo menos de 3% da rede. O cliente mais comumente usado na camada de consenso — [Lighthouse](https://lighthouse.sigmaprime.io/) — está bem próximo do segundo mais usado. [Prysm](https://prysmaticlabs.com/#projects) e [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) representam ~31% e ~14%, respectivamente, e outros clientes são raramente usados.

Os dados da camada de execução foram obtidos de [supermajority.info](https://supermajority.info/) em 26 de outubro de 2025. Os dados para clientes de consenso foram obtidos de [Michael Sproul](https://github.com/sigp/blockprint). Os dados dos clientes de consenso são mais difíceis de obter porque os clientes da camada de consenso nem sempre têm traços inequívocos que possam ser utilizados para identificá-los. Os dados foram gerados usando um algoritmo de classificação que às vezes confunde alguns dos clientes minoritários (veja mais detalhes [aqui](https://twitter.com/sproulM_/status/1440512518242197516)). No diagrama acima, essas classificações ambíguas são tratadas com um rótulo do tipo ou/ou (p. ex., Nimbus/Teku). No entanto, é claro que a maior parte da rede está executando o Prysm. Apesar de serem apenas capturas, os valores no diagrama fornecem uma boa noção geral do estado atual da diversidade do cliente.

Dados atualizados sobre a diversidade de clientes para a camada de consenso estão agora disponíveis em [clientdiversity.org](https://clientdiversity.org/).

## Camada de execução {#execution-layer}

Até agora, a conversação em torno da diversidade do cliente tem se concentrado principalmente na camada de consenso. No entanto, o cliente de execução [Geth](https://geth.ethereum.org) representa atualmente cerca de 85% de todos os nós. Essa porcentagem é problemática pelos mesmos motivos dos clientes de consenso. Por exemplo, um bug no Geth afetando a manipulação de transações ou a construção de cargas de execução pode fazer com que clientes de consenso finalizem transações problemáticas ou com bugs. Portanto, o Ethereum seria mais saudável com uma distribuição mais uniforme dos clientes de execução, idealmente sem nenhum cliente representando mais de 33% da rede.

## Use um cliente minoritário {#use-minority-client}

Endereçar a diversidade do cliente requer mais do que usuários individuais para escolher clientes minoritários – requer pools de validadores e instituições como os principais dapps e exchanges para mudar também os clientes. No entanto, todos os usuários podem fazer sua parte para reparar o desequilíbrio atual e normalizar o uso de todo o software Ethereum disponível. Após A Fusão, todos os operadores de nó serão obrigados a executar um cliente de execução e um cliente de consenso. Escolher combinações dos clientes sugeridos abaixo ajudará a aumentar a diversidade do cliente.

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

Os usuários técnicos podem ajudar a acelerar esse processo escrevendo mais tutoriais e documentações para clientes minoritários e encorajando seus pares operacionais de nó a migrar para longe dos clientes dominantes. Guias para mudar para um cliente de consenso minoritário estão disponíveis em [clientdiversity.org](https://clientdiversity.org/).

## Painéis de diversidade de clientes {#client-diversity-dashboards}

Vários painéis fornecem estatísticas de diversidade de cliente em tempo real para a camada de execução e consenso.

**Camada de consenso:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Camada de execução:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Leitura adicional {#further-reading}

- [Diversidade de clientes na camada de consenso do Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum Merge: Use o cliente majoritário por sua conta e risco!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 de março de 2022_
- [Importância da diversidade de clientes](https://our.status.im/the-importance-of-client-diversity/)
- [Lista de serviços de nós Ethereum](https://ethereumnodes.com/)
- [Os "Cinco Porquês" do problema da diversidade de clientes](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Diversidade do Ethereum e como resolvê-la (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Tópicos relacionados {#related-topics}

- [Execute um nó Ethereum](/run-a-node/)
- [Nós e clientes](/developers/docs/nodes-and-clients/)
