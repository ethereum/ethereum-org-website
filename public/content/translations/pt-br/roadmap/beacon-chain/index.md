---
title: A Beacon Chain
description: Saiba mais sobre a Beacon Chain — a melhoria que introduziu a prova de participação no Ethereum.
lang: pt-br
template: upgrade
image: ../../../../../assets/upgrades/core.png
summaryPoint1: A Beacon Chain introduziu a prova de participação no ecossistema Ethereum.
summaryPoint2: Ela foi integrada à cadeia de prova de trabalho da Ethereum original em setembro de 2022.
summaryPoint3: A Beacon Chain introduziu a lógica de consenso e o protocolo de propagação de boatos de bloco que agora protege a Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
  A Beacon Chain foi lançada em 1º de Dezembro de 2020 e formalizou a prova de participação como mecanismo de consenso da Ethereum, com a atualização da Fusão em 15 de setembro de 2022.
</UpgradeStatus>

## O que era a Beacon Chain? {#what-is-the-beacon-chain}

Beacon Chain foi o nome original dado a cadeia de blocos de prova de participação lançada em 2020. Ela foi criada para garantir que a lógica de consenso de prova de participação era sólida e sustentável antes de implementá-la na rede principal do Ethereum. Portanto, ela existia paralelamente à prova de trabalho do Ethereum. Desligar a prova de trabalho e mudar para a prova de participação no Ethereum exigiu instruir a Beacon Chain a aceitar transações da cadeia original do Ethereum, juntá-las em blocos e então organizá-las em uma cadeia de blocos usando um mecanismo de consenso baseado em prova de participação. Ao mesmo tempo, os nós da rede original do Ethereum desligaram sua lógica de consenso, propagação de blocos e mineração, passando essas funções para a Beacon Chain. Este evento ficou conhecido como [The Merge](/roadmap/merge/). Assim que A Fusão aconteceu, não haviam mais duas cadeias de blocos, mas apenas uma cadeia de prova de participação do Ethereum.

## O que a Beacon Chain fazia? {#what-does-the-beacon-chain-do}

Beacon Chain foi o nome dado a um livro de contas que conduziu e coordenou a rede [participantes](/staking/) do Ethereum antes desses participantes começarem a validar transações reais do Ethereum. Ela não processou transações nem manipulou interações de contratos inteligentes.

Ela introduziu o mecanismo de consenso (ou "camada de consenso") que substituiu a mineração de prova de trabalho no Ethereum e trouxe melhorias significativas em relação ao antigo modelo.

A Beacon Chain foi um componente fundamental para [o Ethereum seguro, amigo do ambiente e escalonável que temos agora](/roadmap/vision/).

## O impacto da Beacon Chain {#beacon-chain-features}

### Participação (staking) {#introducing-staking}

A Beacon Chain introduziu a [prova de participação](/developers/docs/consensus-mechanisms/pos/) no Ethereum. Isso mantém o Ethereum seguro e recompensa os validadores com mais ETH no processo. Na prática, você precisará participar com seus ETH para ativar o software de validador. Como participante, você executa o software que cria e valida novos blocos na cadeia.

O processo de participação serve a um propósito similar ao da [mineração](/developers/docs/mining/), mas é diferente de muitas maneiras. A mineração exigia grandes despesas iniciais na forma de um potente consumo de hardware e energia, resultando em economias de escala e promovendo a centralização. A mineração também não conta com nenhum requisito de bloqueio de ativos como garantia, limitando a capacidade do protocolo de punir os maus atores após um ataque.

A transição para a prova de participação tornou o Ethereum significativamente mais seguro e descentralizado em comparação com a prova de trabalho. Quanto mais pessoas participarem da rede, mais descentralizada e segura contra ataques ela se tornará.

<InfoBanner emoji=":money_bag:">
  Se você estiver interessado em se tornar um validador e ajudar a manter o Ethereum seguro, <a href="/staking/">saiba mais sobre o conceito de participação</a>.
</InfoBanner>

### Preparação para a fragmentação {#setting-up-for-sharding}

Desde que o Beacon Chain se fundiu à rede principal do Ethereum, a comunidade começou a procurar escalar a rede.

A prova de participação tem a vantagem de manter um registro de todos os produtores de blocos aprovados a qualquer momento, cada um com ETH em jogo. Este registro prepara o cenário para a capacidade de dividir e conquistar, mas divide de forma confiável as responsabilidades específicas da rede.

Essa responsabilidade contrasta com a prova de trabalho, na qual os mineradores não têm obrigação para com a rede e poderiam parar de minerar e desligar permanentemente seus nós num instante, sem repercussões. Também não existe nenhum registo de autores de blocos conhecidos, nem uma forma confiável de dividir as responsabilidades da rede de forma segura.

[Mais sobre fragmentação](/roadmap/danksharding/)

## Relação entre as melhorias {#relationship-between-upgrades}

Todas as melhorias do Ethereum estão, de alguma forma, inter-relacionadas. Vejamos como a Beacon Chain afeta as outras melhorias.

### Beacon Chain e A Fusão {#merge-and-beacon-chain}

No começo, a Beacon Chain existia separadamente da rede principal do Ethereum, mas elas foram fundidas em 2022.

<ButtonLink to="/roadmap/merge/">
  A integração
</ButtonLink>

### Fragmentos e a Beacon Chain {#shards-and-beacon-chain}

As cadeias de fragmentos somente podem ser introduzidas ao ecossistema Ethereum com um mecanismo de consenso de prova de participação em vigor. A Beacon Chain introduziu a participação, que após a fusão com a Rede principal, pavimenta o caminho para a fragmentação, ajudando a ampliar ainda mais o Ethereum.

<ButtonLink to="/roadmap/danksharding/">
  Cadeias de fragmentos
</ButtonLink>

## Leituras adicionais

- [Mais informações sobre as futuras atualizações do Ethereum](/roadmap/vision)
- [Mais sobre prova de participação](/developers/docs/consensus-mechanisms/pos)
