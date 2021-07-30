---
title: Стыковка основной сети с Eth2
description: Узнайте о стыковке - когда основная сеть Ethereum присоединится к системе доказательства владения, координируемой Beacon Chain.
lang: ru
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    "В конце концов основная сеть Ethereum состыкуется с остальными обновлениями Eth2.",
    "Стыковка объединит основную сеть Eth1 с Beacon Chain Eth2 и системой цепочек-осколков.",
    "Это ознаменует конец доказательства работы для Ethereum и полный переход к доказательству владения.",
    'Вы можете знать это как "Этап 1.5" на технических дорожных картах.',
  ]
---

<UpgradeStatus date="~2021/22">
    Это обновление последует за появлением цепочек-осколков. Но именно в этот момент <a href="/eth2/vision/">видение Eth2</a> становится полностью реализованным – больше универсальности, безопасности и устойчивости с поддержкой вложений для всей сети.
</UpgradeStatus>

## Что такое стыковка? {#what-is-the-docking}

Важно помнить, что изначально другие обновления Eth2 происходят отдельно от [основной сети](/glossary/#mainnet) - цепочки, которую мы используем сегодня. Основная сеть Ethereum будет по-прежнему защищена [доказательством работы](/developers/docs/consensus-mechanisms/pow/), даже в то время как [Beacon Chain](/eth2/beacon-chain/) и его [цепочки-осколки](/eth2/shard-chains/) работают параллельно, используя [доказательство владения](/developers/docs/consensus-mechanisms/pos/). Стыковка происходит, когда эти две системы сливаются вместе.

Представьте себе, что Ethereum - это космический корабль, который еще не совсем готов к межзвездному путешествию. С помощью Beacon Chain и цепочек-осколков сообщество построило новый двигатель и закаленный корпус. Когда придет время, нынешний корабль состыкуется с этой новой системой, так что он может стать одним кораблем, готовым поставить несколько серьезных световых лет и взять на себя вселенную.

## Стыковка с основной сетью {#docking-mainnet}

После готовности основная сеть Ethereum состыкуется с Beacon Chain, став своим собственным осколком, который использует доказательство владения вместо [доказательства работы](/developers/docs/consensus-mechanisms/pow/).

Основная сеть привнесет возможность запуска смарт-контрактов в систему доказательства владения, а также полную историю и текущее состояние Ethereum, чтобы обеспечить плавный переход для всех держателей и пользователей ETH.

<!-- ### Improving mainnet

Before mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/en/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## После стыковки {#after-the-docking}

Это будет означать конец доказательства работы для Ethereum и начало эры более устойчивого, экологически чистого Ethereum. На этом этапе Ethereum будет иметь масштаб, безопасность и устойчивость, описанные в его [видении Eth2](/eth2/vision/).

## Взаимосвязь между обновлениями {#relationship-between-upgrades}

Все обновления Eth2 в некоторой степени взаимосвязаны. Итак, давайте рассмотрим, как стыковка связана с другими обновлениями.

### Стыковка и Beacon Chain {#docking-and-beacon-chain}

Как только стыковка произойдет, будут назначены стейкеры для проверки основной сети Ethereum. Точно так же с цепочками-осколками. [Майнинг](/developers/docs/consensus-mechanisms/pow/mining/) больше не потребуется, поэтому майнерам будет выгоднее инвестировать свой заработок в долю в новой системе доказательства владения.<ButtonLink to="/eth2/beacon-chain/">Beacon Chain</ButtonLink>

### Стыковка и цепочки-осколки {#docking-and-shard-chains}

Поскольку основная сеть становится осколком, успешная реализация цепочек-осколков имеет решающее значение для этого обновления. Вполне вероятно, что этот переход сыграет важную роль в том, чтобы помочь сообществу решить, стоит ли развертывать второе обновление до шардинга. Это обновление сделает другие осколки похожими на основную сеть: они смогут обрабатывать транзакции и смарт-контракты, а не просто предоставлять больше данных.<ButtonLink to="/eth2/shard-chains/">Цепочки-осколки</ButtonLink>
