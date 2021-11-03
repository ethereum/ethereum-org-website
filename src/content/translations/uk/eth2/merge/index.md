---
title: Злиття основної мережі з оновленням Eth2
description: Дізнайтеся більше про злиття основної мережі Ethereum із системою керування доказами часток Beacon Chain.
lang: uk
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    "Зрештою основну мережу Ethereum буде поєднано з іншими оновленнями Eth2.",
    "У процесі злиття основна мережа Eth1 поєднається з оновленням Beacon Chain Eth2 й системою створення сегментів даних.",
    "У мережі Ethereum більше не використовуватимуться докази виконаної роботи. Натомість відбудеться повний перехід на докази частки.",
    'На технічних картах це оновлення позначено як "Фаза 1,5".',
  ]
---

<UpgradeStatus date="~Q1/Q2 2022">
    Це оновлення буде додано після впровадження ланцюгів сегментів даних. Таким чином <a href="/eth2/vision/">оновлення Eth2</a> буде повністю реалізовано: стейкінг у мережі стане безпечнішим і надійнішим, його можна буде масштабувати.
</UpgradeStatus>

## Що таке злиття? {#what-is-the-docking}

Важливо пам’ятати, що інші оновлення Eth2 впроваджено окремо від [основної мережі](/glossary/#mainnet), що наразі використовується. Основну мережу Ethereum і далі буде захищено завдяки принципу [доказу виконаної роботи](/developers/docs/consensus-mechanisms/pow/), навіть коли оновлення [Beacon Chain](/eth2/beacon-chain/) і [ланцюги сегментів даних](/eth2/shard-chains/) функціонуватимуть паралельно за принципом [доказу частки](/developers/docs/consensus-mechanisms/pos/). Злиття – це етап поєднання цих двох систем.

Уявіть, що мережа Ethereum – це космічний корабель, який не зовсім готовий до польоту в космос. Завдяки оновленню Beacon Chain і впровадженню ланцюгів сегментів даних спільнота створила новий двигун і міцніший корпус. Коли настане час, у наявний корабель буде вбудовано цю нову систему. Так він буде готовим до польоту тривалістю кілька світлових років і зможе підкорити космос.

## Злиття основної мережі {#docking-mainnet}

Після завершення всіх налаштувань основна мережа Ethereum поєднається з оновленням Beacon Chain і стане окремим сегментом даних, що працюватиме за принципом доказу частки замість принципу [доказу виконаної роботи](/developers/docs/consensus-mechanisms/pow/).

Основна мережа дасть змогу запускати розумні контракти в системі доказу частки, а також керувати всією історією та поточним станом мережі Ethereum. Так перехід на нову версію буде плавним для всіх власників криптовалюти й користувачів мережі Ethereum.

<!-- ### Improving mainnet

Before mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/en/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## Що відбудеться після злиття {#after-the-docking}

Принцип доказу виконаної роботи більше не використовуватиметься, і в мережі Ethereum розпочнеться новий етап надійнішої й екологічнішої роботи. Мережу Ethereum буде масштабовано й захищено в рамках запуску [оновлень Eth2](/eth2/vision/).

## Зв’язок між оновленнями {#relationship-between-upgrades}

Усі оновлення Eth2 певним чином пов’язані. Нижче пояснено, як злиття впливає на інші оновлення.

### Злиття й оновлення Beacon Chain {#docking-and-beacon-chain}

Після завершення злиття для валідації основної мережі Ethereum буде призначено стейкерів. Те саме стосується ланцюгів сегментів даних. [Майнінг](/developers/docs/consensus-mechanisms/pow/mining/) більше не використовуватиметься, тому майнери з великою ймовірністю інвестують свої кошти в стейкінг у новій системі доказу частки.

<ButtonLink to="/eth2/beacon-chain/">Beacon Chain</ButtonLink>

### Злиття та ланцюги сегментів даних {#docking-and-shard-chains}

Оскільки основна мережа стане сегментом даних, успішний запуск ланцюгів сегментів даних є ключовою умовою для цього оновлення. Імовірно, що цей перехід допоможе спільноті вирішити, чи потрібно запускати друге оновлення сегментів даних. У рамках цього оновлення інші сегменти даних стануть схожими на основну мережу. Вони керуватимуть транзакціями й розумними контрактами, а не лише надаватимуть докладніші дані.

<ButtonLink to="/eth2/shard-chains/">Ланцюги сегментів даних</ButtonLink>
