---
title: Використання нульового розголошення для секретного стану
description: Ончейн-ігри обмежені, оскільки вони не можуть зберігати жодної прихованої інформації. Після прочитання цього посібника читач зможе поєднати доведення з нульовим розголошенням та серверні компоненти для створення ігор, що піддаються верифікації, із секретним станом та позамережевим компонентом. Ця техніка буде продемонстрована на прикладі створення гри «Сапер».
author: Орі Померанц
tags:
  - сервер
  - позамережевий
  - централізований
  - нульове розголошення
  - zokrates
  - mud
  - конфіденційність
skill: advanced
breadcrumb: Секретний стан ZK
lang: uk
published: 2025-03-15
---

_У блокчейні немає секретів_. Усе, що публікується в блокчейні, відкрите для читання кожному. Це необхідно, оскільки блокчейн базується на тому, що будь-хто може його верифікувати. Однак ігри часто покладаються на секретний стан. Наприклад, гра [«Сапер»](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) втрачає будь-який сенс, якщо ви можете просто зайти в оглядач блоків і побачити карту.

Найпростіше рішення — використати [серверний компонент](/developers/tutorials/server-components/) для зберігання секретного стану. Однак причина, чому ми використовуємо блокчейн, полягає в запобіганні шахрайству з боку розробника гри. Нам потрібно гарантувати чесність серверного компонента. Сервер може надати хеш стану та використати [доведення з нульовим розголошенням](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important), щоб довести, що стан, використаний для обчислення результату ходу, є правильним.

Після прочитання цієї статті ви дізнаєтеся, як створити такий сервер для зберігання секретного стану, клієнт для відображення стану та ончейн-компонент для зв'язку між ними. Основні інструменти, які ми будемо використовувати:

| Інструмент                                          | Призначення                                                 | Перевірено на версії |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | Доведення з нульовим розголошенням та їх верифікація            |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | Мова програмування для сервера та клієнта |               5.4.2 |
| [Node](https://nodejs.org/en)                 | Запуск сервера                                      |             20.18.2 |
| [Viem](https://viem.sh/)                      | Зв'язок із блокчейном                       |              2.9.20 |
| [MUD](https://mud.dev/)                       | Управління ончейн-даними                                 |              2.0.12 |
| [React](https://react.dev/)                   | Інтерфейс користувача клієнта                                   |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | Обслуговування клієнтського коду                                 |               4.2.1 |

## Приклад Minesweeper {#minesweeper}

[Minesweeper](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) — це гра, яка містить секретну карту з мінним полем. Гравець вибирає місце для копання. Якщо в цьому місці є міна, гра закінчується. В іншому випадку гравець отримує кількість мін у восьми квадратах, що оточують це місце.

Цей застосунок написано з використанням [MUD](https://mud.dev/) — фреймворку, який дозволяє нам зберігати дані ончейн за допомогою [бази даних типу «ключ-значення»](https://aws.amazon.com/nosql/key-value/) та автоматично синхронізувати ці дані з позамережевими компонентами. Окрім синхронізації, MUD полегшує забезпечення контролю доступу, а також дозволяє іншим користувачам [розширювати](https://mud.dev/guides/extending-a-world) наш застосунок без дозволів.

### Запуск прикладу Minesweeper {#running-minesweeper-example}

Щоб запустити приклад Minesweeper:

1. Переконайтеся, що у вас [встановлено необхідне програмне забезпечення](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads) та [`mprocs`](https://github.com/pvolok/mprocs).

2. Клонуйте репозиторій.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Встановіть пакети.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Якщо Foundry було встановлено як частину `pnpm install`, вам потрібно перезапустити оболонку командного рядка.

4. Скомпілюйте контракти

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. Запустіть програму (включно з блокчейном [anvil](https://book.getfoundry.sh/anvil/)) і зачекайте.

   ```sh copy
   mprocs
   ```

   Зверніть увагу, що запуск займає багато часу. Щоб побачити прогрес, спочатку скористайтеся стрілкою вниз для прокручування до вкладки _contracts_, щоб побачити, як розгортаються контракти MUD. Коли ви отримаєте повідомлення _Waiting for file changes…_, контракти розгорнуто, і подальший прогрес відбуватиметься на вкладці _server_. Там ви чекаєте, поки не отримаєте повідомлення _Verifier address: 0x...._.

   Якщо цей крок виконано успішно, ви побачите екран `mprocs` з різними процесами зліва та виводом консолі для поточного вибраного процесу справа.

   ![The mprocs screen](./mprocs.png)

   Якщо виникла проблема з `mprocs`, ви можете запустити чотири процеси вручну, кожен у власному вікні командного рядка:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contracts** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```  

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```  

6. Тепер ви можете перейти до [клієнта](http://localhost:3000), натиснути **New Game** і почати грати.

### Таблиці {#tables}

Нам потрібно [кілька таблиць](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) ончейн.

- `Configuration`: Ця таблиця є синглтоном, вона не має ключа та містить єдиний запис. Вона використовується для зберігання інформації про конфігурацію гри:
  - `height`: Висота мінного поля
  - `width`: Ширина мінного поля
  - `numberOfBombs`: Кількість бомб на кожному мінному полі
- `VerifierAddress`: Ця таблиця також є синглтоном. Вона використовується для зберігання однієї частини конфігурації — адреси контракту верифікатора (`verifier`). Ми могли б помістити цю інформацію в таблицю `Configuration`, але вона встановлюється іншим компонентом, сервером, тому її простіше розмістити в окремій таблиці.

- `PlayerGame`: Ключем є адреса гравця. Дані:

  - `gameId`: 32-байтове значення, яке є хешем карти, на якій грає гравець (ідентифікатор гри).
  - `win`: логічне значення, яке вказує, чи виграв гравець гру.
  - `lose`: логічне значення, яке вказує, чи програв гравець гру.
  - `digNumber`: кількість успішних копань у грі.

- `GamePlayer`: Ця таблиця містить зворотне відображення, від `gameId` до адреси гравця.

- `Map`: Ключем є кортеж із трьох значень:

  - `gameId`: 32-байтове значення, яке є хешем карти, на якій грає гравець (ідентифікатор гри).
  - координата `x`
  - координата `y`

  Значенням є одне число. Воно дорівнює 255, якщо було виявлено бомбу. В іншому випадку це кількість бомб навколо цього місця плюс один. Ми не можемо просто використовувати кількість бомб, оскільки за замовчуванням усе сховище в EVM і всі значення рядків у MUD дорівнюють нулю. Нам потрібно розрізняти ситуації «гравець тут ще не копав» і «гравець копав тут і виявив, що навколо нуль бомб».

Крім того, зв'язок між клієнтом і сервером відбувається через ончейн-компонент. Це також реалізовано за допомогою таблиць.

- `PendingGame`: Необроблені запити на початок нової гри.
- `PendingDig`: Необроблені запити на копання в певному місці в певній грі. Це [позамережева таблиця](https://mud.dev/store/tables#types-of-tables), що означає, що вона не записується до сховища EVM, а доступна для читання лише позамережево за допомогою подій.

### Потоки виконання та даних {#execution-data-flows}

Ці потоки координують виконання між клієнтом, ончейн-компонентом і сервером.

#### Ініціалізація {#initialization-flow}

Коли ви запускаєте `mprocs`, відбуваються такі кроки:

1. [`mprocs`](https://github.com/pvolok/mprocs) запускає чотири компоненти:

   - [Anvil](https://book.getfoundry.sh/anvil/), який запускає локальний блокчейн
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), який компілює (за потреби) та розгортає контракти для MUD
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), який запускає [Vite](https://vitejs.dev/) для обслуговування інтерфейсу користувача та клієнтського коду для веббраузерів.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), який виконує дії сервера

2. Пакет `contracts` розгортає контракти MUD, а потім запускає [скрипт `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Цей скрипт встановлює конфігурацію. Код із GitHub визначає [мінне поле 10x5 із вісьмома мінами на ньому](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Сервер](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) починає з [налаштування MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Крім іншого, це активує синхронізацію даних, щоб копія відповідних таблиць існувала в пам'яті сервера.

4. Сервер підписує функцію для виконання, [коли таблиця `Configuration` змінюється](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Ця функція](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) викликається після того, як `PostDeploy.s.sol` виконується та змінює таблицю.

5. Коли функція ініціалізації сервера отримує конфігурацію, [вона викликає `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) для ініціалізації [частини сервера з нульовим розголошенням](#using-zokrates-from-typescript). Це не може відбутися, доки ми не отримаємо конфігурацію, оскільки функції з нульовим розголошенням повинні мати ширину та висоту мінного поля як константи.

6. Після ініціалізації частини сервера з нульовим розголошенням наступним кроком є [розгорнути контракт верифікації з нульовим розголошенням у блокчейні](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) та встановити адресу верифікатора в MUD.

7. Нарешті, ми підписуємося на оновлення, щоб бачити, коли гравець робить запит [на початок нової гри](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) або [на копання в наявній грі](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Нова гра {#new-game-flow}

Ось що відбувається, коли гравець робить запит на нову гру.

1. Якщо для цього гравця немає поточної гри, або вона є, але з gameId, що дорівнює нулю, клієнт відображає [кнопку нової гри](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Коли користувач натискає цю кнопку, [React запускає функцію `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) — це виклик `System`. У MUD усі виклики маршрутизуються через контракт `World`, і в більшості випадків ви викликаєте `<namespace>__<function name>`. У цьому випадку виклик здійснюється до `app__newGame`, який MUD потім маршрутизує до [`newGame` у `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Ончейн-функція перевіряє, чи немає у гравця поточної гри, і якщо її немає, [додає запит до таблиці `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Сервер виявляє зміну в `PendingGame` і [запускає підписану функцію](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Ця функція викликає [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), яка своєю чергою викликає [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Перше, що робить `createGame`, це [створює випадкову карту з відповідною кількістю мін](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Потім вона викликає [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166), щоб створити карту з порожніми межами, що необхідно для Zokrates. Нарешті, `createGame` викликає [`calculateMapHash`](#calculatemaphash), щоб отримати хеш карти, який використовується як ідентифікатор гри.

6. Функція `newGame` додає нову гру до `gamesInProgress`.

7. Останнє, що робить сервер, це викликає [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), яка є ончейн. Ця функція знаходиться в іншому `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), щоб увімкнути контроль доступу. Контроль доступу визначається у [файлі конфігурації MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Список доступу дозволяє лише одній адресі викликати `System`. Це обмежує доступ до функцій сервера однією адресою, тому ніхто не може видати себе за сервер.

8. Ончейн-компонент оновлює відповідні таблиці:

   - Створює гру в `PlayerGame`.
   - Встановлює зворотне відображення в `GamePlayer`.
   - Видаляє запит із `PendingGame`.

9. Сервер ідентифікує зміну в `PendingGame`, але нічого не робить, оскільки [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) має значення false.

10. На клієнті [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) встановлюється на запис `PlayerGame` для адреси гравця. Коли змінюється `PlayerGame`, змінюється і `gameRecord`.

11. Якщо в `gameRecord` є значення, і гра не була виграна або програна, клієнт [відображає карту](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Копання {#dig-flow}

1. Гравець [натискає кнопку клітинки карти](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), що викликає [функцію `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Ця функція викликає [`dig` ончейн](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Ончейн-компонент [виконує низку перевірок на коректність](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), і в разі успіху додає запит на копання до [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Сервер [виявляє зміну в `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Якщо вона дійсна](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), він [викликає код із нульовим розголошенням](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (пояснюється нижче), щоб згенерувати як результат, так і доведення його дійсності.

4. [Сервер](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) викликає [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) ончейн.

5. `digResponse` робить дві речі. Спочатку він перевіряє [доведення з нульовим розголошенням](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Потім, якщо доведення проходить перевірку, він викликає [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) для фактичної обробки результату.

6. `processDigResult` перевіряє, чи була гра [програна](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) або [виграна](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), і [оновлює `Map`, ончейн-карту](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Клієнт автоматично підхоплює оновлення та [оновлює карту, що відображається гравцеві](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), і, якщо застосовно, повідомляє гравцеві про перемогу чи поразку.

## Використання Zokrates {#using-zokrates}

У процесах, описаних вище, ми пропустили частини з нульовим розголошенням, розглядаючи їх як чорний ящик. Тепер давайте відкриємо його і подивимося, як написаний цей код.

### Хешування карти {#hashing-map}

Ми можемо використати [цей код JavaScript](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) для реалізації [Poseidon](https://www.poseidon-hash.info), хеш-функції Zokrates, яку ми використовуємо. Однак, хоча це було б швидше, це також було б складніше, ніж просто використати хеш-функцію Zokrates для цього. Це посібник, тому код оптимізовано для простоти, а не для продуктивності. Отже, нам потрібні дві різні програми Zokrates: одна для простого обчислення хешу карти (`hash`), а інша — для фактичного створення доведення з нульовим розголошенням результату розкопок у певному місці на карті (`dig`).

### Хеш-функція {#hash-function}

Це функція, яка обчислює хеш карти. Ми розглянемо цей код рядок за рядком.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Ці два рядки імпортують дві функції зі [стандартної бібліотеки Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [Перша функція](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) — це [хеш Poseidon](https://www.poseidon-hash.info/). Вона приймає масив [елементів `field`](https://zokrates.github.io/language/types.html#field) і повертає `field`.

Елемент поля в Zokrates зазвичай має довжину менше 256 біт, але не набагато. Щоб спростити код, ми обмежуємо карту до 512 біт і хешуємо масив із чотирьох полів, причому в кожному полі ми використовуємо лише 128 біт. [Функція `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) перетворює масив зі 128 біт на `field` для цієї мети.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Цей рядок починає визначення функції. `hashMap` отримує єдиний параметр під назвою `map`, двовимірний масив `bool`(ean). Розмір карти становить `width+2` на `height+2` з причин, які [пояснюються нижче](#why-map-border).

Ми можемо використовувати `${width+2}` та `${height+2}`, оскільки програми Zokrates зберігаються в цьому застосунку як [шаблонні рядки](https://www.w3schools.com/js/js_string_templates.asp). Код між `${` та `}` обчислюється за допомогою JavaScript, і таким чином програму можна використовувати для різних розмірів карти. Параметр карти має межу шириною в одну клітинку по всьому периметру без жодних бомб, саме тому нам потрібно додати два до ширини та висоти.

Значення, що повертається, — це `field`, яке містить хеш.

```
bool[512] mut map1d = [false; 512];
```

Карта є двовимірною. Однак функція `pack128` не працює з двовимірними масивами. Тому ми спочатку перетворюємо карту на одновимірний 512-байтовий масив, використовуючи `map1d`. За замовчуванням змінні Zokrates є константами, але нам потрібно присвоювати значення цьому масиву в циклі, тому ми визначаємо його як [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Нам потрібно ініціалізувати масив, оскільки Zokrates не має `undefined`. Вираз `[false; 512]` означає [масив із 512 значень `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
u32 mut counter = 0;
```

Нам також потрібен лічильник, щоб розрізняти біти, які ми вже заповнили в `map1d`, і ті, які ще ні.

```
for u32 x in 0..${width+2} {
```

Ось як ви оголошуєте [цикл `for`](https://zokrates.github.io/language/control_flow.html#for-loops) у Zokrates. Цикл `for` у Zokrates повинен мати фіксовані межі, оскільки, хоча він і виглядає як цикл, компілятор насправді «розгортає» його. Вираз `${width+2}` є константою часу компіляції, оскільки `width` встановлюється кодом TypeScript перед викликом компілятора.

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Для кожної клітинки на карті помістіть це значення в масив `map1d` і збільште лічильник.

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` створює масив із чотирьох значень `field` з `map1d`. У Zokrates `array[a..b]` означає зріз масиву, який починається з `a` і закінчується на `b-1`.

```
return poseidon(hashMe);
}
```

Використайте `poseidon`, щоб перетворити цей масив на хеш.

### Програма хешування {#hash-program}

Серверу потрібно викликати `hashMap` безпосередньо для створення ідентифікаторів гри. Однак Zokrates може викликати лише функцію `main` у програмі для запуску, тому ми створюємо програму з `main`, яка викликає хеш-функцію.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Програма розкопок {#dig-program}

Це серце частини застосунку з нульовим розголошенням, де ми створюємо доведення, які використовуються для перевірки результатів розкопок.

```
${hashFragment}

// Кількість мін у клітинці (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Навіщо потрібна межа карти {#why-map-border}

Доведення з нульовим розголошенням використовують [арифметичні схеми](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), які не мають простого еквівалента оператору `if`. Замість цього вони використовують еквівалент [умовного оператора](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Якщо `a` може бути нулем або одиницею, ви можете обчислити `if a { b } else { c }` як `ab+(1-a)c`.

Через це оператор `if` у Zokrates завжди обчислює обидві гілки. Наприклад, якщо у вас є такий код:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Він видасть помилку, оскільки йому потрібно обчислити `arr[10]`, навіть якщо це значення пізніше буде помножено на нуль.

Саме тому нам потрібна межа шириною в одну клітинку по всьому периметру карти. Нам потрібно обчислити загальну кількість мін навколо клітинки, а це означає, що нам потрібно бачити клітинки на один рядок вище і нижче, ліворуч і праворуч від місця, де ми копаємо. Це означає, що ці клітинки повинні існувати в масиві карти, який надається Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

За замовчуванням доведення Zokrates включають свої вхідні дані. Немає сенсу знати, що навколо певного місця є п'ять мін, якщо ви насправді не знаєте, що це за місце (і ви не можете просто зіставити його зі своїм запитом, оскільки тоді доводжувач міг би використати інші значення і не повідомити вам про це). Однак нам потрібно тримати карту в секреті, надаючи її Zokrates. Рішення полягає у використанні параметра `private`, який _не_ розкривається доведенням.

Це відкриває ще один шлях для зловживань. Доводжувач міг би використати правильні координати, але створити карту з будь-якою кількістю мін навколо клітинки, а можливо, і в самій клітинці. Щоб запобігти цьому зловживанню, ми робимо так, щоб доведення з нульовим розголошенням включало хеш карти, який є ідентифікатором гри.

```
return (hashMap(map),
```

Значення, що повертається тут, — це кортеж, який включає масив хешу карти, а також результат розкопок.

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Ми використовуємо 255 як спеціальне значення на випадок, якщо в самій клітинці є бомба.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Якщо гравець не натрапив на міну, додайте кількість мін для області навколо клітинки та поверніть це значення.

### Використання Zokrates із TypeScript {#using-zokrates-from-typescript}

Zokrates має інтерфейс командного рядка, але в цій програмі ми використовуємо його в [коді TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

Бібліотека, яка містить визначення Zokrates, називається [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Імпортуйте [прив'язки JavaScript для Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Нам потрібна лише функція [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize), оскільки вона повертає проміс (promise), який вирішується всіма визначеннями Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Подібно до самого Zokrates, ми також експортуємо лише одну функцію, яка також є [асинхронною](https://www.w3schools.com/js/js_async.asp). Коли вона зрештою повертає результат, вона надає кілька функцій, як ми побачимо нижче.

```typescript
const zokrates = await zokratesInitialize()
```

Ініціалізуйте Zokrates, отримайте все необхідне з бібліотеки.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

Далі ми маємо хеш-функцію та дві програми Zokrates, які ми бачили вище.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Тут ми компілюємо ці програми.

```typescript
// Створіть ключі для верифікації з нульовим розголошенням.
// У виробничій системі варто використовувати церемонію налаштування.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

У виробничій системі ми могли б використати складнішу [церемонію налаштування](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony), але цього достатньо для демонстрації. Немає проблеми в тому, що користувачі можуть знати ключ доводжувача — вони все одно не зможуть використати його для доведення речей, якщо вони не є істинними. Оскільки ми вказуємо ентропію (другий параметр, `""`), результати завжди будуть однаковими.

**Примітка:** Компіляція програм Zokrates і створення ключів — це повільні процеси. Немає потреби повторювати їх щоразу, лише коли змінюється розмір карти. У виробничій системі ви б зробили це один раз, а потім зберегли результат. Єдина причина, чому я не роблю цього тут, — заради простоти.

#### `calculateMapHash` {#calculatemaphash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

Функція [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) фактично запускає програму Zokrates. Вона повертає структуру з двома полями: `output`, яке є виводом програми у вигляді рядка JSON, і `witness`, яке є інформацією, необхідною для створення доведення з нульовим розголошенням результату. Тут нам потрібен лише вивід.

Вивід — це рядок у формі `"31337"`, десяткове число, взяте в лапки. Але вивід, який нам потрібен для `viem`, — це шістнадцяткове число у формі `0x60A7`. Тому ми використовуємо `.slice(1,-1)`, щоб видалити лапки, а потім `BigInt`, щоб перетворити рядок, що залишився, який є десятковим числом, на [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` перетворює цей `BigInt` на шістнадцятковий рядок, а `"0x"+` додає маркер для шістнадцяткових чисел.

```typescript
// Викопати та повернути доведення з нульовим розголошенням результату
// (код на стороні сервера)
```

Доведення з нульовим розголошенням включає публічні вхідні дані (`x` та `y`) і результати (хеш карти та кількість бомб).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Перевірити, чи виходить індекс за межі в Zokrates, є проблемою, тому ми робимо це тут.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Виконайте програму розкопок.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Використайте [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) і поверніть доведення.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Верифікатор Solidity — смарт-контракт, який ми можемо розгорнути в блокчейні та використовувати для перевірки доведень, згенерованих за допомогою `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Нарешті, поверніть усе, що може знадобитися іншому коду.

## Тестування безпеки {#security-tests}

Тестування безпеки є важливим, оскільки помилка у функціональності з часом проявить себе. Але якщо застосунок є небезпечним, це, швидше за все, залишатиметься прихованим протягом тривалого часу, перш ніж це виявиться через те, що хтось схитрує та заволодіє ресурсами, які належать іншим.

### Дозволи {#permissions}

У цій грі є одна привілейована сутність — сервер. Це єдиний користувач, якому дозволено викликати функції у [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Ми можемо використати [`cast`](https://book.getfoundry.sh/cast/), щоб перевірити, що виклики функцій з обмеженим доступом дозволені лише для акаунта сервера.

[Приватний ключ сервера знаходиться у `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. На комп'ютері, де запущено `anvil` (блокчейн), встановіть ці змінні середовища.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Використайте `cast`, щоб спробувати встановити адресу верифікатора як неавторизовану адресу.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` не лише повідомляє про помилку, але ви також можете відкрити **MUD Dev Tools** у грі в браузері, натиснути **Tables** і вибрати **app\_\_VerifierAddress**. Переконайтеся, що адреса не дорівнює нулю.

3. Встановіть адресу верифікатора як адресу сервера.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Адреса в **app\_\_VerifiedAddress** тепер має дорівнювати нулю.

Усі функції MUD у тому самому `System` проходять через однаковий контроль доступу, тому я вважаю цей тест достатнім. Якщо ви так не вважаєте, можете перевірити інші функції у [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Зловживання нульовим розголошенням {#zero-knowledge-abuses}

Математика для перевірки Zokrates виходить за рамки цього посібника (і моїх можливостей). Однак ми можемо запустити різні перевірки коду з нульовим розголошенням, щоб переконатися, що якщо він виконаний неправильно, то завершиться помилкою. Усі ці тести вимагатимуть від нас змінити [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) і перезапустити весь застосунок. Недостатньо просто перезапустити процес сервера, оскільки це переводить застосунок у неможливий стан (гравець має розпочату гру, але гра більше не доступна для сервера).

#### Неправильна відповідь {#wrong-answer}

Найпростіша можливість — надати неправильну відповідь у доведенні з нульовим розголошенням. Для цього ми переходимо до `zkDig` і [змінюємо рядок 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Це означає, що ми завжди будемо стверджувати, що є одна бомба, незалежно від правильної відповіді. Спробуйте пограти з цією версією, і ви побачите на вкладці **server** екрана `pnpm dev` таку помилку:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Отже, такий вид шахрайства не спрацьовує.

#### Неправильне доведення {#wrong-proof}

Що станеться, якщо ми надамо правильну інформацію, але просто матимемо неправильні дані доведення? Тепер замініть рядок 91 на:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

Він усе одно завершується помилкою, але тепер без вказання причини, оскільки це відбувається під час виклику верифікатора.

### Як користувач може перевірити код з нульовою довірою? {#user-verify-zero-trust}

Смарт-контракти відносно легко перевірити. Зазвичай розробник публікує вихідний код в оглядачі блоків, і оглядач блоків перевіряє, чи компілюється вихідний код у код у [транзакції розгортання контракту](/developers/docs/smart-contracts/deploying/). У випадку з `System` MUD це [трохи складніше](https://mud.dev/cli/verify), але не набагато.

З нульовим розголошенням це складніше. Верифікатор містить деякі константи та виконує над ними певні обчислення. Це не говорить вам про те, що саме доводиться.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Рішення, принаймні доки оглядачі блоків не додадуть перевірку Zokrates до своїх інтерфейсів користувача, полягає в тому, щоб розробники застосунків робили програми Zokrates доступними, а принаймні деякі користувачі компілювали їх самостійно з відповідним ключем перевірки.

Для цього:

1. [Встановіть Zokrates](https://zokrates.github.io/gettingstarted.html).
2. Створіть файл `dig.zok` з програмою Zokrates. Наведений нижче код передбачає, що ви зберегли початковий розмір карти — 10x5.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // Кількість мін у позиції (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Скомпілюйте код Zokrates і створіть ключ перевірки. Ключ перевірки має бути створений з тією ж ентропією, що використовувалася на оригінальному сервері, [у цьому випадку — з порожнім рядком](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Створіть верифікатор Solidity самостійно та переконайтеся, що він функціонально ідентичний тому, що знаходиться в блокчейні (сервер додає коментар, але це не важливо).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Проєктні рішення {#design}

У будь-якому достатньо складному застосунку існують конкуруючі цілі проєктування, які вимагають компромісів. Розгляньмо деякі з цих компромісів і те, чому поточне рішення є кращим за інші варіанти.

### Чому нульове розголошення {#why-zero-knowledge}

Для сапера вам насправді не потрібне нульове розголошення. Сервер завжди може зберігати мапу, а потім просто розкрити її всю, коли гра закінчиться. Тоді, наприкінці гри, смарт-контракт може обчислити хеш мапи, перевірити, чи він збігається, і якщо ні — оштрафувати сервер або взагалі скасувати гру.

Я не використав це простіше рішення, оскільки воно працює лише для коротких ігор із чітко визначеним кінцевим станом. Коли гра потенційно нескінченна (як у випадку з [автономними світами](https://0xparc.org/blog/autonomous-worlds)), вам потрібне рішення, яке доводить стан _без_ його розкриття.

Оскільки це посібник, для цієї статті потрібна була коротка гра, яку легко зрозуміти, але цей метод найбільш корисний для триваліших ігор.

### Чому Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) — не єдина доступна бібліотека з нульовим розголошенням, але вона схожа на звичайну [імперативну](https://en.wikipedia.org/wiki/Imperative_programming) мову програмування та підтримує булеві змінні.

Для вашого застосунку з іншими вимогами ви можете віддати перевагу [Circum](https://docs.circom.io/getting-started/installation/) або [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Коли компілювати Zokrates {#when-compile-zokrates}

У цій програмі ми компілюємо програми Zokrates [щоразу під час запуску сервера](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Це очевидна трата ресурсів, але це посібник, оптимізований для простоти.

Якби я писав застосунок виробничого рівня, я б перевірив, чи є в мене файл зі скомпільованими програмами Zokrates для цього розміру мінного поля, і якщо так, використав би його. Те саме стосується розгортання контракту верифікатора ончейн.

### Створення ключів верифікатора та доводжувача {#key-creation}

[Створення ключів](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) — це ще одне чисте обчислення, яке не потрібно виконувати більше одного разу для заданого розміру мінного поля. Знову ж таки, це робиться лише один раз заради простоти.

Крім того, ми могли б використати [церемонію налаштування](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Перевага церемонії налаштування полягає в тому, що вам потрібна або ентропія, або якийсь проміжний результат від кожного учасника, щоб сфальсифікувати доведення з нульовим розголошенням. Якщо хоча б один учасник церемонії є чесним і видаляє цю інформацію, доведення з нульовим розголошенням захищені від певних атак. Однак _немає механізму_ для перевірки того, що інформація була видалена звідусіль. Якщо доведення з нульовим розголошенням критично важливі, вам варто взяти участь у церемонії налаштування.

Тут ми покладаємося на [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), у якій брали участь десятки учасників. Ймовірно, це достатньо безпечно і набагато простіше. Ми також не додаємо ентропію під час створення ключів, що полегшує користувачам [перевірку конфігурації нульового розголошення](#user-verify-zero-trust).

### Де проводити перевірку {#where-verification}

Ми можемо перевіряти доведення з нульовим розголошенням або ончейн (що коштує газу), або в клієнті (використовуючи [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Я вибрав перший варіант, оскільки це дозволяє вам [перевірити верифікатор](#user-verify-zero-trust) один раз, а потім довіряти, що він не зміниться, доки адреса контракту для нього залишається незмінною. Якби перевірка виконувалася на клієнті, вам довелося б перевіряти отриманий код щоразу під час завантаження клієнта.

Крім того, хоча ця гра є однокористувацькою, багато блокчейн-ігор є багатокористувацькими. Перевірка ончейн означає, що ви перевіряєте доведення з нульовим розголошенням лише один раз. Виконання цього в клієнті вимагало б від кожного клієнта незалежної перевірки.

### Сплощувати мапу в TypeScript чи Zokrates? {#where-flatten}

Загалом, коли обробку можна виконати як у TypeScript, так і в Zokrates, краще робити це в TypeScript, який працює набагато швидше і не вимагає доведень з нульовим розголошенням. Це є причиною, наприклад, того, що ми не надаємо Zokrates хеш і не змушуємо його перевіряти його правильність. Хешування має виконуватися всередині Zokrates, але порівняння повернутого хешу з хешем ончейн може відбуватися поза ним.

Однак ми все одно [сплощуємо мапу в Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), хоча могли б зробити це в TypeScript. Причина в тому, що інші варіанти, на мій погляд, гірші.

- Надати одновимірний масив булевих значень коду Zokrates і використати вираз на кшталт `x*(height+2)
+y`, щоб отримати двовимірну мапу. Це зробило б [код](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) дещо складнішим, тому я вирішив, що приріст продуктивності не вартий того для посібника.

- Надіслати Zokrates як одновимірний, так і двовимірний масиви. Однак це рішення нічого нам не дає. Коду Zokrates довелося б перевіряти, чи дійсно наданий йому одновимірний масив є правильним поданням двовимірного масиву. Тому жодного приросту продуктивності не було б.

- Сплостити двовимірний масив у Zokrates. Це найпростіший варіант, тому я вибрав його.

### Де зберігати мапи {#where-store-maps}

У цьому застосунку [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) — це просто змінна в пам'яті. Це означає, що якщо ваш сервер вийде з ладу і його потрібно буде перезапустити, уся збережена ним інформація буде втрачена. Гравці не лише не зможуть продовжити свою гру, вони навіть не зможуть розпочати нову, оскільки компонент ончейн вважатиме, що їхня гра все ще триває.

Це очевидно погане проєктне рішення для виробничої системи, у якій ви б зберігали цю інформацію в базі даних. Єдина причина, чому я використав тут змінну, полягає в тому, що це посібник, і простота є головним міркуванням.

## Висновок: за яких умов ця техніка є доречною? {#conclusion}

Отже, тепер ви знаєте, як написати гру із сервером, який зберігає секретний стан, що не має бути ончейн. Але в яких випадках це варто робити? Є два основні міркування.

- _Тривала гра_: [Як зазначалося вище](#why-zero-knowledge), у короткій грі ви можете просто опублікувати стан після завершення гри та перевірити все тоді. Але це не варіант, коли гра триває довго або невизначений час, і стан має залишатися секретним.

- _Прийнятна певна централізація_: Доведення з нульовим розголошенням можуть підтвердити цілісність, тобто те, що сутність не підробляє результати. Чого вони не можуть зробити, так це гарантувати, що сутність залишатиметься доступною та відповідатиме на повідомлення. У ситуаціях, коли доступність також має бути децентралізованою, доведення з нульовим розголошенням не є достатнім рішенням, і вам потрібні [багатосторонні обчислення](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Більше моїх робіт можна знайти тут](https://cryptodocguy.pro/).

### Подяки {#acknowledgements}

- Альваро Алонсо прочитав чернетку цієї статті та прояснив деякі мої непорозуміння щодо Zokrates.

За будь-які помилки, що залишилися, відповідаю я.