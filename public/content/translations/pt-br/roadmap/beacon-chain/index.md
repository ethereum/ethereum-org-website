---
title: A Beacon Chain
description: Saiba mais sobre a Beacon Chain — a melhoria que introduziu a prova de participação no Ethereum.
lang: pt-br
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: A Beacon Chain introduziu a prova de participação no ecossistema Ethereum.
summaryPoint2: Ela foi integrada à cadeia de prova de trabalho do Ethereum original em setembro de 2022.
summaryPoint3: A Beacon Chain introduziu a lógica de consenso e o protocolo de propagação de blocos que agora protege o Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  A Beacon Chain foi lançada em 1º de Dezembro de 2020 e formalizou a prova de participação como mecanismo de consenso da Ethereum, com a atualização da Fusão em 15 de setembro de 2022.
</UpgradeStatus>

## O que é a Beacon Chain? {#what-is-the-beacon-chain}

Beacon Chain é o nome do blockchain de prova de participação original que foi lançado em 2020. Ela foi criada para garantir que a lógica de consenso de prova de participação era sólida e sustentável antes de implementá-la na rede principal do Ethereum. Portanto, ela existia paralelamente à prova de trabalho do Ethereum. Beacon Chain era uma cadeia de blocos '"vazios", mas para desativar a prova de trabalho e ativar a prova de participação no Ethereum era necessário instruir a Beacon Chain a aceitar dados de transação de clientes de execução, agrupá-los em blocos e depois organizá-los em um blockchain usando um mecanismo de consenso com base em prova de participação. Ao mesmo tempo, os nós da rede original do Ethereum desligaram sua lógica de consenso, propagação de blocos e mineração, passando essas funções para a Beacon Chain. Este evento ficou conhecido como [The Merge](/roadmap/merge/). Após a Fusão, não havia mais dois blockchains. Em vez disso, havia apenas um Ethereum de prova de participação, que agora exige dois clientes diferentes por nó. Agora, a Beacon Chain é a camada de consenso, uma rede ponto a ponto de clientes de consenso que processa a lógica de consenso e transmissão de blocos, enquanto os clientes originais formam a camada de execução, responsável pela transmissão e execução de transações e pelo gerenciamento do estado do Ethereum. As duas camadas podem se comunicar mutuamente por meio da Engine API.

## O que a Beacon Chain faz? {#what-does-the-beacon-chain-do}

Beacon Chain é o nome dado a um registro de contas que orientava e coordenava a rede de [stakers](/participantes/) do Ethereum antes que começassem a validar blocos reais do Ethereum. Entretanto, não processa transações nem interações de contratos inteligentes, pois isso é feito na camada de execução. A Beacon Chain é responsável por atividades como processamento de blocos e atestações, executação do algoritmo de escolha de bifurcação e gerenciamento de recompensas e penalidades. Leia mais em nossa [página de arquitetura de nós](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## O impacto da Beacon Chain {#beacon-chain-features}

### Participação (staking) {#introducing-staking}

A Beacon Chain introduziu a [prova de participação](/developers/docs/consensus-mechanisms/pos/) no Ethereum. Isso mantém o Ethereum protegido e os validadores recebem mais ETH no processo. Na prática, você precisará participar com os seus ETH para ativar o software de validador. Como participante, você executa o software que cria e valida novos blocos na cadeia.

O processo de participação tem um objetivo semelhante ao da [mineração](/developers/docs/consensus-mechanisms/pow/mining/), mas tem muitas diferenças. A mineração exigia grandes investimentos iniciais na forma de um hardware potente e consumo de energia, o que resultava em economias de escala e promovia a centralização. A mineração também não tem como garantia uma exigência de bloqueio de ativos, o que limita a capacidade do protocolo de punir os malfeitores após um ataque.

A transição para a prova de participação tornou o Ethereum consideravelmente mais seguro e descentralizado, em comparação com a prova de trabalho. Quanto mais pessoas participarem da rede, mais descentralizada e segura contra ataques ela será.

E utilizar a prova de participação como mecanismo de consenso é um componente fundamental para [o Ethereum seguro, ecológico e dimensionável que temos agora](/roadmap/vision/).

<InfoBanner emoji=":money_bag:">
  Se você estiver interessado em se tornar um validador e ajudar a manter o Ethereum seguro, <a href="/staking/">saiba mais sobre o conceito de participação</a>.
</InfoBanner>

### Preparação para a fragmentação {#setting-up-for-sharding}

Desde que a Beacon Chain se fundiu à rede principal original do Ethereum, a comunidade Ethereum começou tentar dimensionar a rede.

A prova de participação tem a vantagem de manter um registro de todos os produtores de blocos aprovados a qualquer momento, cada um com ETH participado. Esse registro prepara o cenário para a capacidade de dividir e conquistar, mas dividir de forma confiável as responsabilidades específicas da rede.

Essa responsabilidade contrasta com a prova de trabalho, em que os mineradores não têm nenhuma obrigação com a rede e podem interromper a mineração e desligar o software do nó permanentemente, em um instante, sem repercussão. Também não há registro de proponentes de blocos conhecidos e nenhuma maneira confiável de dividir as responsabilidades da rede com segurança.

[Mais sobre fragmentação](/roadmap/danksharding/)

## Relação entre as melhorias {#relationship-between-upgrades}

As melhorias do Ethereum estão, de certa forma, relacionadas. Vamos recapitular como a Beacon Chain afeta as outras melhorias.

### Beacon Chain e A Fusão {#merge-and-beacon-chain}

No começo, a Beacon Chain existia separadamente da rede principal do Ethereum, mas ocorreu uma fusão em 2022.

<ButtonLink href="/roadmap/merge/">
  A integração
</ButtonLink>

### Fragmentos e a Beacon Chain {#shards-and-beacon-chain}

As cadeias de fragmentação apenas podem ser introduzidas no ecossistema Ethereum por meio do estabelecimento de um mecanismo de consenso de prova de participação. A Beacon Chain introduziu a participação, que se "fundiu" com a rede principal, abrindo caminho para a fragmentação, de forma a ajudar a dimensionar ainda mais o Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Cadeias de fragmentos
</ButtonLink>

## Leituras adicionais

- [Mais informações sobre as futuras atualizações do Ethereum](/roadmap/vision)
- [Mais sobre arquitetura de nós](/developers/docs/nodes-and-clients/node-architecture)
- [Mais sobre prova de participação](/developers/docs/consensus-mechanisms/pos)
