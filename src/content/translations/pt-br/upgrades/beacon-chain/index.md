---
title: A Beacon Chain
description: Saiba mais sobre a Beacon Chain — a melhoria que introduziu a prova de participação no Ethereum.
lang: pt-br
template: upgrade
image: ../../../../../assets/upgrades/core.png
summaryPoint1: A Beacon Chain não muda nada sobre o Ethereum que usamos hoje.
summaryPoint2: Coordenará a rede, servindo de camada de consenso.
summaryPoint3: Introduziu a prova de participação para o ecossistema Ethereum.
summaryPoint4: Talvez você tenha visto isso sendo mencionado como "Fase 0" nos roadmaps técnicos.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    A Beacon Chain foi lançada em 1 de dezembro de 2020 ao meio-dia (UTC). Para saber mais, <a href="https://beaconscan.com/">conheça os dados</a>. Se você quiser ajudar a validar a cadeia, <a href="/staking/">participe com seus ETH</a>.
</UpgradeStatus>

## O que a Beacon Chain faz? {#what-does-the-beacon-chain-do}

A Beacon Chain conduzirá ou coordenará a rede estendida de [shards](/upgrades/sharding/) ("fragmentos") e [stakers](/staking/) ("participantes"). Mas não será como a [rede principal da Ethereum](/glossary/#mainnet) de hoje. Ela não será capaz de gerenciar contas ou contratos inteligentes.

O papel da Beacon Chain mudará com o tempo, mas é um componente fundamental para [o Ethereum seguro, sustentável e dimensionável rumo ao qual estamos trabalhando](/upgrades/vision/).

## Características da Beacon Chain {#beacon-chain-features}

### Participação (staking) {#introducing-staking}

A Beacon Chain iniciará a "prova de participação" ([proof-of-stake](/developers/docs/consensus-mechanisms/pos/)) do Ethereum. Essa é uma nova maneira de você ajudar a manter a rede Ethereum segura. Pense nisso como um bem público que melhorará a integridade do Ethereum e renderá a você mais ETH no processo. Na prática, você precisará participar com seus ETH para ativar o software de validador. Como validador, você processará transações e criará novos blocos na Beacon Chain.

Participar e se tornar um validador é mais fácil do que [minerar](/developers/docs/mining/) (forma como a rede é mantida segura hoje). E espera-se que isso ajude a tornar a rede Ethereum ainda mais segura em longo prazo. Quanto mais pessoas participarem da rede, mais descentralizada e segura contra ataques ela se tornará.

<InfoBanner emoji=":money_bag:">
Se você estiver interessado em se tornar um validador e ajudar a manter a Beacon Chain segura, <a href="/staking/">veja mais informações sobre como participar</a>.
</InfoBanner>

Essa também é uma mudança importante para outra melhoria do Ethereum: [as cadeias de fragmentos (shard chains)](/upgrades/sharding/).

### Preparação para as cadeias de fragmentos {#setting-up-for-shard-chains}

Depois da integração da Rede principal com a Beacon Chain, a próxima melhoria apresentará as cadeias de fragmentos à rede de provas de participação (proof-of-stake). Esses "fragmentos" aumentarão a capacidade da rede e melhorarão a velocidade de transação, estendendo a rede para 64 blockchains. A Beacon Chain é um importante primeiro passo para a introdução das cadeias de fragmentos (shard chains), uma vez que é necessário que a participação (staking) aconteça de forma segura.

A Beacon Chain também será responsável por designar aleatoriamente participantes (stakers) para que validem as cadeias de fragmentos (shard chains). Isso é importante para dificultar que participantes (stakers) conspirem entre si e assumam controle de um fragmento (shard). Isso significa que eles têm uma chance [menor que 1 em um trilhão](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relação entre as melhorias {#relationship-between-upgrades}

Todas as melhorias do Ethereum estão, de alguma forma, interrelacionadas. Vejamos como a Beacon Chain afeta as outras melhorias.

### Rede principal e a Beacon Chain {#mainnet-and-beacon-chain}

A Beacon Chain existirá, a princípio, separada da rede principal Ethereum que utilizamos hoje. No entanto, elas serão conectadas no futuro. O plano é "integrar" a rede principal ao sistema de prova de participação (proof-of-stake) que é controlado e coordenado pela Beacon Chain.

<ButtonLink to="/upgrades/merge/">
    A integração
</ButtonLink>

### Fragmentos (shards) e a Beacon Chain {#shards-and-beacon-chain}

As cadeias de fragmentos (shard chains) somente podem ser introduzidas ao ecossistema Ethereum com um mecanismo de consenso de prova de participação em vigor. A Beacon Chain introduzirá a participação (staking), preparando assim o caminho para a implementação das cadeias de fragmentos na próxima atualização.

<ButtonLink to="/upgrades/sharding/">
    Cadeias de fragmentos
</ButtonLink>

<Divider />

## Interação com a Beacon Chain {#interact-with-beacon-chain}

<BeaconChainActions />
