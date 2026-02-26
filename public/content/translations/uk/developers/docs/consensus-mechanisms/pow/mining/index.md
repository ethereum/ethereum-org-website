---
title: Mining
description: "Пояснення того, як працював майнінг в Ethereum."
lang: uk
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Підтвердження роботи більше не лежить в основі механізму консенсусу Ethereum, що означає, що майнінг було вимкнено. Натомість безпека Ethereum забезпечується валідаторами, які роблять стейкінг ETH. Ви можете почати робити ставку ETH вже сьогодні. Дізнайтеся більше про <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>доказ частки</a> та <a href='/staking/'>стейкінг</a>. Ця сторінка лише для історичного інтересу.
</AlertDescription>
</AlertContent>
</Alert>

## Передумови {#prerequisites}

Щоб краще зрозуміти цю сторінку, радимо спочатку ознайомитися з [транзакціями](/developers/docs/transactions/), [блоками](/developers/docs/blocks/) та [підтвердженням роботи](/developers/docs/consensus-mechanisms/pow/).

## Що являє собою видобуток Ethereum? Що таке майнінг Ethereum? {#what-is-ethereum-mining}

Майнінг — це процес створення блоку транзакцій для додавання до блокчейну Ethereum у застарілій архітектурі Ethereum, що базується на підтвердженні роботи.

Слово «майнінг» походить з аналогії із золотом для криптовалют. Золото або дорогоцінні метали є дефіцитними, так само як і цифрові токени, і єдиний спосіб збільшити загальний обсяг у системі підтвердження роботи — це майнінг. У системі Ethereum на основі підтвердження роботи єдиним способом емісії був майнінг. Однак, на відміну від золота чи дорогоцінних металів, майнінг Ethereum був також способом захисту мережі шляхом створення, перевірки, публікації та поширення блоків у блокчейні.

Майнінг ефіру = захист мережі

Майнінг є життєвою силою будь-якого блокчейну на основі підтвердження роботи. Майнери Ethereum (комп'ютери, на яких запущено програмне забезпечення) використовували свій час та обчислювальну потужність для обробки транзакцій та створення блоків до переходу на доказ частки.

## Навіщо потрібні майнери? {#why-do-miners-exist}

У децентралізованих системах, як-от Ethereum, необхідно забезпечити, щоб усі погоджувалися з порядком транзакцій. Майнери сприяли цьому, вирішуючи складні обчислювальні завдання для створення блоків, захищаючи мережу від атак.

[Докладніше про підтвердження роботи](/developers/docs/consensus-mechanisms/pow/)

Раніше будь-хто міг майнити в мережі Ethereum за допомогою свого комп'ютера. Однак не кожен міг вигідно майнити ефір (ETH). У більшості випадків майнерам доводилося купувати спеціалізоване комп'ютерне обладнання та мати доступ до недорогих джерел енергії. Звичайний комп’ютер навряд чи заробив би достатньо винагород за блоки, щоб покрити пов’язані з майнінгом витрати.

### Вартість майнінгу {#cost-of-mining}

- Потенційні витрати на обладнання, необхідні для створення та обслуговування майнінгової установки
- Вартість електроенергії для живлення майнінгової установки
- Якщо ви займалися майнінгом у пулі, ці пули зазвичай стягували фіксовану відсоткову комісію за кожен блок, згенерований пулом.
- Потенційна вартість обладнання для підтримки майнінгової установки (вентиляція, моніторинг енергії, електропроводка тощо)

Щоб детальніше вивчити прибутковість майнінгу, скористайтеся калькулятором майнінгу, наприклад, тим, що надає [Etherscan](https://etherscan.io/ether-mining-calculator).

## Як відбувався майнінг транзакцій в Ethereum {#how-ethereum-transactions-were-mined}

Нижче наведено огляд того, як відбувався майнінг транзакцій у системі Ethereum на основі підтвердження роботи. Аналогічний опис цього процесу для Ethereum на основі доказу частки можна знайти [тут](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Користувач створює та підписує запит на [транзакцію](/developers/docs/transactions/) за допомогою приватного ключа певного [облікового запису](/developers/docs/accounts/).
2. Користувач транслює запит на транзакцію в усій мережі Ethereum з певного [вузла](/developers/docs/nodes-and-clients/).
3. Після того, як будуть отримані нові запити на транзакції, кожен вузол мережі Ethereum додасть запит у свій локальний mempool, що є списком всіх запитів на транзакції, які ще не були зафіксовані в даних блоку.
4. У певний момент майнінговий вузол об'єднує кілька десятків або сотень запитів на транзакції в потенційний [блок](/developers/docs/blocks/) таким чином, щоб максимізувати [комісії за транзакції](/developers/docs/gas/), які він заробляє, залишаючись при цьому в межах ліміту газу для блоку. Таким чином, вузол видобування:
   1. Перевіряє дійсність кожного запиту на транзакцію (тобто ніхто не намагається переказати ефір з облікового запису, для якого не створено підпис, запит не є спотвореним тощо), а потім виконує код запиту, змінюючи стан своєї локальної копії EVM. The miner awards the transaction fee for each such transaction request to their own account.
   2. Починає процес створення «сертифіката легітимності» з підтвердженням роботи для потенційного блоку, після того як усі запити на транзакції в блоці будуть перевірені та виконані на локальній копії EVM.
5. Eventually, a miner will finish producing a certificate for a block which includes our specific transaction request. The miner then broadcasts the completed block, which includes the certificate and a checksum of the claimed new EVM state.
6. Other nodes hear about the new block. They verify the certificate, execute all transactions on the block themselves (including the transaction originally broadcasted by our user), and verify that the checksum of their new EVM state after the execution of all transactions matches the checksum of the state claimed by the"miner’s"block. Only then do these nodes append this block to the tail of their blockchain, and accept the new EVM state as the canonical state.
7. Each node removes all transactions in the new block from their local mempool of unfulfilled transaction requests.
8. New nodes joining the network download all blocks in sequence, including the block containing our transaction of interest. They initialize a local EVM copy (which starts as a blank-state EVM), and then go through the process of executing every transaction in every block on top of their local EVM copy, verifying state checksums at each block along the way.

Every transaction is mined (included in a new block and propagated for the first time) once, but executed and verified by every participant in the process of advancing the canonical EVM state. Це підкреслює одну з центральних мантр блокчейну: **не довіряй, а перевіряй**.

## Блоки оммер (uncle) {#ommer-blocks}

Майнінг блоків на основі підтвердження роботи був імовірнісним, тобто іноді два дійсні блоки публікувалися одночасно через затримку в мережі. У цьому випадку протокол мав визначити найдовший (і, отже, найбільш "дійсний") ланцюг, забезпечуючи при цьому справедливість щодо майнерів шляхом часткової винагороди за невключений запропонований дійсний блок. Це заохочувало подальшу децентралізацію мережі, оскільки менші майнери, які могли стикатися з більшою затримкою, все одно могли отримувати прибуток через винагороди за [оммер](/glossary/#ommer) блоки.

Термін " оммер "є нейтральним з гендерної точки зору терміном для брата або сестри батьківського блоку, але його також іноді називають"дядьком". **Після переходу Ethereum на доказ частки оммер-блоки більше не майняться**, оскільки в кожному слоті обирається лише один автор блоку. Ви можете побачити цю зміну, переглянувши [історичний графік](https://ycharts.com/indicators/ethereum_uncle_rate) видобутих оммер-блоків.

## Наочна демонстрація {#a-visual-demo}

Watch Austin walk you through mining and the proof-of-work blockchain.

<YouTube id="zcX7OJ-L8XQ" />

## Алгоритм майнінгу {#mining-algorithm}

Основна мережа Ethereum (Mainnet) використовувала лише один алгоритм майнінгу — ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash був наступником оригінального алгоритму для досліджень та розробок, відомого як ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Докладніше про алгоритми майнінгу](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Пов'язані теми {#related-topics}

- [Газ](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Підтвердження роботи](/developers/docs/consensus-mechanisms/pow/)
