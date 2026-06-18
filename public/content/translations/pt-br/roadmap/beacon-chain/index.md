---
title: A Beacon Chain
description: Aprenda sobre a Beacon Chain - a atualização que introduziu a Prova de Participação (PoS) no Ethereum.
lang: pt-br
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - "A Beacon Chain introduziu a Prova de Participação (PoS) no ecossistema Ethereum."
  - "Ela foi fundida com a cadeia original de Prova de Trabalho (PoW) do Ethereum em setembro de 2022."
  - "A Beacon Chain introduziu a lógica de consenso e o protocolo de propagação de blocos (gossip) que agora protege o Ethereum."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  A Beacon Chain foi lançada em 1º de dezembro de 2020 e formalizou a Prova de Participação (PoS) como o mecanismo de consenso do Ethereum com a atualização The Merge em 15 de setembro de 2022.
</UpgradeStatus>

## O que é a Beacon Chain? {#what-is-the-beacon-chain}

A Beacon Chain é o nome da blockchain original de Prova de Participação (PoS) que foi lançada em 2020. Ela foi criada para garantir que a lógica de consenso de Prova de Participação fosse sólida e sustentável antes de ativá-la na Rede Principal do [Ethereum](/) (Mainnet). Portanto, ela funcionou paralelamente ao Ethereum original de Prova de Trabalho (PoW). A Beacon Chain era uma cadeia de blocos 'vazios', mas desligar a Prova de Trabalho e ligar a Prova de Participação no Ethereum exigia instruir a Beacon Chain a aceitar dados de transação dos clientes de execução, agrupá-los em blocos e, em seguida, organizá-los em uma blockchain usando um mecanismo de consenso baseado em Prova de Participação. No mesmo momento, os clientes originais do Ethereum desligaram sua mineração, propagação de bloco e lógica de consenso, transferindo tudo isso para a Beacon Chain. Este evento ficou conhecido como [The Merge](/roadmap/merge/). Uma vez que o The Merge aconteceu, não havia mais duas blockchains. Em vez disso, havia apenas um Ethereum de Prova de Participação, que agora requer dois clientes diferentes por nó. A Beacon Chain agora é a camada de consenso, uma rede ponto a ponto de clientes de consenso que lida com a propagação de blocos (gossip) e a lógica de consenso, enquanto os clientes originais formam a camada de execução, que é responsável por propagar e executar transações, e gerenciar o estado do Ethereum. As duas camadas podem se comunicar uma com a outra usando a Engine API.

## O que a Beacon Chain faz? {#what-does-the-beacon-chain-do}

A Beacon Chain é o nome dado a um livro-razão de contas que conduziu e coordenou a rede de [stakers](/staking/) do Ethereum antes que esses stakers começassem a validar blocos reais do Ethereum. No entanto, ela não processa transações nem lida com interações de contratos inteligentes, porque isso está sendo feito na camada de execução.
A Beacon Chain é responsável por coisas como o manuseio de blocos e atestações, a execução do algoritmo de escolha de fork e o gerenciamento de recompensas e penalidades.
Leia mais em nossa [página de arquitetura de nó](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Impacto da Beacon Chain {#beacon-chain-features}

### Introduzindo o staking {#introducing-staking}

A Beacon Chain introduziu a [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/) no Ethereum. Isso mantém o Ethereum seguro e faz com que os validadores ganhem mais ETH no processo. Na prática, o staking envolve fazer stake de ETH para ativar o software do validador. Como um staker, você executa o software que cria e valida novos blocos na cadeia.

O staking serve a um propósito semelhante ao que a [mineração](/developers/docs/consensus-mechanisms/pow/mining/) costumava servir, mas é diferente de muitas maneiras. A mineração exigia grandes despesas iniciais na forma de hardware poderoso e consumo de energia, resultando em economias de escala e promovendo a centralização. A mineração também não vinha com nenhum requisito de bloquear ativos como colateral, limitando a capacidade do protocolo de punir maus atores após um ataque.

A transição para a Prova de Participação tornou o Ethereum significativamente mais seguro e descentralizado em comparação com a Prova de Trabalho. Quanto mais pessoas participam da rede, mais descentralizada e segura contra ataques ela se torna.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Se você estiver interessado em se tornar um validador e ajudar a proteger o Ethereum, [saiba mais sobre staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Preparando para a fragmentação {#setting-up-for-sharding}

Desde que a Beacon Chain se fundiu com a Rede Principal do Ethereum (Mainnet) original, a comunidade Ethereum começou a buscar escalar a rede.

A Prova de Participação tem a vantagem de ter um registro de todos os produtores de blocos aprovados em qualquer momento, cada um com ETH em stake. Este registro prepara o terreno para a capacidade de dividir e conquistar, mas dividindo de forma confiável responsabilidades específicas da rede.

Essa responsabilidade contrasta com a Prova de Trabalho, onde os mineradores não têm obrigação com a rede e poderiam parar de minerar e desligar o software do seu nó permanentemente em um instante sem repercussão. Também não há registro de proponentes de blocos conhecidos e nenhuma maneira confiável de dividir as responsabilidades da rede com segurança.

[Mais sobre fragmentação](/roadmap/danksharding/)

## Relação entre as atualizações {#relationship-between-upgrades}

As atualizações do Ethereum estão todas de certa forma inter-relacionadas. Então, vamos recapitular como a Beacon Chain afeta as outras atualizações.

### A Beacon Chain e o The Merge {#merge-and-beacon-chain}

No início, a Beacon Chain existia separadamente da Rede Principal do Ethereum (Mainnet), mas elas foram fundidas em 2022.

<ButtonLink href="/roadmap/merge/">
  The Merge
</ButtonLink>

### Fragmentos e a Beacon Chain {#shards-and-beacon-chain}

A fragmentação só pode entrar com segurança no ecossistema Ethereum com um mecanismo de consenso de Prova de Participação em vigor. A Beacon Chain introduziu o staking, que se 'fundiu' com a Mainnet, abrindo caminho para a fragmentação ajudar a escalar ainda mais o Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Cadeias de fragmentos
</ButtonLink>

## Leitura adicional {#further-reading}

- [Mais sobre arquitetura de nó](/developers/docs/nodes-and-clients/node-architecture)
- [Mais sobre Prova de Participação](/developers/docs/consensus-mechanisms/pos)