---
title: "Використання нульового розголошення для секретного стану"
description: "Ончейн-ігри обмежені, тому що вони не можуть зберігати приховану інформацію. Прочитавши цей посібник, читач зможе поєднувати докази з нульовим розголошенням та серверні компоненти для створення ігор, що піддаються перевірці, з секретним станом і компонентом поза ланцюгом. Ця техніка буде продемонстрована шляхом створення гри «Сапер»."
author: Ori Pomerantz
tags:
  [
    "сервер",
    "поза ланцюжком",
    "централізований",
    "нульове розголошення",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: uk
published: 2025-03-15
---

_На блокчейні немає секретів_. Усе, що публікується в блокчейні, відкрито для читання всім. Це необхідно, оскільки блокчейн ґрунтується на тому, що будь-хто може його перевірити. Однак ігри часто покладаються на секретний стан. Наприклад, гра [«Сапер»](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) не має абсолютно ніякого сенсу, якщо ви можете просто зайти в оглядач блокчейнів і побачити карту.

Найпростішим рішенням є використання [серверного компонента](/developers/tutorials/server-components/) для зберігання секретного стану. Однак причина, через яку ми використовуємо блокчейн, — це запобігання шахрайству з боку розробника гри. Нам потрібно забезпечити чесність серверного компонента. Сервер може надати хеш стану і використовувати [докази з нульовим розголошенням](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important), щоб довести, що стан, який використовується для розрахунку результату ходу, є правильним.

Прочитавши цю статтю, ви дізнаєтеся, як створити такий сервер для зберігання секретного стану, клієнт для відображення стану та ончейн-компонент для зв’язку між ними. Основними інструментами, які ми будемо використовувати, будуть:

| Інструмент                                    | Мета                                                 |                    Перевірено на версії |
| --------------------------------------------- | ---------------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Докази з нульовим розголошенням та їхня верифікація  |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Мова програмування як для сервера, так і для клієнта |   5.4.2 |
| [Node](https://nodejs.org/en)                 | Запуск сервера                                       | 20.18.2 |
| [Viem](https://viem.sh/)                      | Зв'язок із блокчейном                                |  2.9.20 |
| [MUD](https://mud.dev/)                       | Керування ончейн-даними                              |  2.0.12 |
| [React](https://react.dev/)                   | Інтерфейс користувача клієнта                        |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Обслуговування клієнтського коду                     |   4.2.1 |

## Приклад гри «Сапер» {#minesweeper}

[«Сапер»](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) — це гра, що містить секретну карту з мінним полем. Гравець обирає копати в певному місці. Якщо в цьому місці є міна, гру закінчено. В іншому випадку гравець отримує кількість мін у восьми клітинках, що оточують це місце.

Цей застосунок написано з використанням [MUD](https://mud.dev/), фреймворка, що дозволяє нам зберігати ончейн-дані за допомогою [бази даних «ключ-значення»](https://aws.amazon.com/nosql/key-value/) та автоматично синхронізувати ці дані з офчейн-компонентами. Окрім синхронізації, MUD полегшує керування доступом і дозволяє іншим користувачам [розширювати](https://mud.dev/guides/extending-a-world) наш застосунок без дозволу.

### Запуск прикладу «Сапер» {#running-minesweeper-example}

Щоб запустити приклад «Сапер»:

1. Переконайтеся, що ви [встановили необхідні компоненти](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads) та [`mprocs`](https://github.com/pvolok/mprocs).

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

   Зверніть увагу, що запуск займає багато часу. Щоб побачити прогрес, спочатку за допомогою стрілки вниз прокрутіть до вкладки _contracts_, щоб побачити, як розгортаються контракти MUD. Коли ви отримаєте повідомлення _Waiting for file changes…_, контракти буде розгорнуто, а подальший прогрес відбуватиметься у вкладці _server_. Там ви чекаєте, поки не отримаєте повідомлення _Verifier address: 0x...._.

   Якщо цей крок буде успішним, ви побачите екран `mprocs` з різними процесами зліва та виводом консолі для поточного вибраного процесу справа.

   ![Екран mprocs](./mprocs.png)

   Якщо виникла проблема з `mprocs`, ви можете запустити чотири процеси вручну, кожен у своєму вікні командного рядка:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Контракти**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Сервер**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **Клієнт**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. Тепер ви можете перейти до [клієнта](http://localhost:3000), натиснути **New Game** і почати грати.

### Таблиці {#tables}

Нам потрібно [кілька таблиць](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) в ончейні.

- `Configuration`: Ця таблиця є синглтоном, вона не має ключа і має єдиний запис. Вона використовується для зберігання інформації про конфігурацію гри:
  - `height`: Висота мінного поля
  - `width`: Ширина мінного поля
  - `numberOfBombs`: Кількість бомб на кожному мінному полі

- `VerifierAddress`: Ця таблиця також є синглтоном. Вона використовується для зберігання однієї частини конфігурації, адреси контракту верифікатора (`verifier`). Ми могли б помістити цю інформацію в таблицю `Configuration`, але її встановлює інший компонент, сервер, тому простіше помістити її в окрему таблицю.

- `PlayerGame`: Ключем є адреса гравця. Дані:

  - `gameId`: 32-байтове значення, яке є хешем карти, на якій грає гравець (ідентифікатор гри).
  - `win`: логічне значення, яке вказує, чи виграв гравець.
  - `lose`: логічне значення, яке вказує, чи програв гравець.
  - `digNumber`: кількість успішних розкопок у грі.

- `GamePlayer`: Ця таблиця містить зворотне відображення від `gameId` до адреси гравця.

- `Map`: Ключ є кортежем із трьох значень:

  - `gameId`: 32-байтове значення, яке є хешем карти, на якій грає гравець (ідентифікатор гри).
  - Координата `x`
  - Координата `y`

  Значенням є одне число. Це 255, якщо було виявлено бомбу. В іншому випадку це кількість бомб навколо цього місця плюс один. Ми не можемо просто використовувати кількість бомб, тому що за замовчуванням усе сховище в EVM і всі значення рядків у MUD дорівнюють нулю. Нам потрібно розрізняти між \"гравець тут ще не копав\" і \"гравець тут копав і виявив, що навколо немає бомб\".

Крім того, зв'язок між клієнтом і сервером відбувається через ончейн-компонент. Це також реалізовано за допомогою таблиць.

- `PendingGame`: незадоволені запити на початок нової гри.
- `PendingDig`: незадоволені запити на копання в певному місці в певній грі. Це [офчейн-таблиця](https://mud.dev/store/tables#types-of-tables), що означає, що вона не записується до сховища EVM, а доступна для читання лише в офчейні за допомогою подій.

### Потоки виконання та даних {#execution-data-flows}

Ці потоки координують виконання між клієнтом, ончейн-компонентом і сервером.

#### Ініціалізація {#initialization-flow}

Коли ви запускаєте `mprocs`, відбуваються наступні кроки:

1. [`mprocs`](https://github.com/pvolok/mprocs) запускає чотири компоненти:

   - [Anvil](https://book.getfoundry.sh/anvil/), який запускає локальний блокчейн
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), який компілює (за потреби) і розгортає контракти для MUD
   - [Клієнт](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), який запускає [Vite](https://vitejs.dev/) для обслуговування інтерфейсу користувача та клієнтського коду для веб-браузерів.
   - [Сервер](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), який виконує дії сервера

2. Пакет `contracts` розгортає контракти MUD, а потім запускає [скрипт `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Цей скрипт встановлює конфігурацію. Код з GitHub визначає [мінне поле розміром 10x5 з вісьмома мінами](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Сервер](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) починає з [налаштування MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Серед іншого, це активує синхронізацію даних, так що копія відповідних таблиць існує в пам'яті сервера.

4. Сервер підписує функцію для виконання [коли таблиця `Configuration` змінюється](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Ця функція](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) викликається після виконання `PostDeploy.s.sol` і зміни таблиці.

5. Коли функція ініціалізації сервера має конфігурацію, [вона викликає `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) для ініціалізації [частини сервера з нульовим розголошенням](#using-zokrates-from-typescript). Це не може статися, доки ми не отримаємо конфігурацію, тому що функції з нульовим розголошенням повинні мати ширину та висоту мінного поля як константи.

6. Після ініціалізації частини сервера з нульовим розголошенням наступним кроком є [розгортання контракту верифікації з нульовим розголошенням у блокчейні](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) та встановлення адреси верифікатора в MUD.

7. Нарешті, ми підписуємося на оновлення, щоб бачити, коли гравець запитує або [почати нову гру](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71), або [копати в існуючій грі](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Нова гра {#new-game-flow}

Це те, що відбувається, коли гравець запитує нову гру.

1. Якщо для цього гравця немає поточної гри, або є, але з нульовим gameId, клієнт відображає [кнопку нової гри](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Коли користувач натискає цю кнопку, [React запускає функцію `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) — це системний виклик. У MUD усі виклики маршрутизуються через контракт `World`, і в більшості випадків ви викликаєте `<namespace>__<function name>`. У цьому випадку виклик відбувається до `app__newGame`, який MUD потім маршрутизує до [`newGame` в `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Ончейн-функція перевіряє, що у гравця немає поточної гри, і якщо немає, [додає запит до таблиці `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Сервер виявляє зміну в `PendingGame` і [запускає підписану функцію](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Ця функція викликає [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), яка, своєю чергою, викликає [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Перше, що робить `createGame`, — це [створює випадкову карту з відповідною кількістю мін](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Потім він викликає [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) для створення карти з порожніми рамками, що необхідно для Zokrates. Нарешті, `createGame` викликає [`calculateMapHash`](#calculateMapHash), щоб отримати хеш карти, який використовується як ID гри.

6. Функція `newGame` додає нову гру до `gamesInProgress`.

7. Останнє, що робить сервер, — викликає [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), який знаходиться в ончейні. Ця функція знаходиться в іншій `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), щоб увімкнути контроль доступу. Контроль доступу визначається у [файлі конфігурації MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Список доступу дозволяє викликати `System` лише одній адресі. Це обмежує доступ до функцій сервера однією адресою, тому ніхто не може видати себе за сервер.

8. Ончейн-компонент оновлює відповідні таблиці:

   - Створити гру в `PlayerGame`.
   - Встановити зворотне відображення в `GamePlayer`.
   - Видалити запит із `PendingGame`.

9. Сервер ідентифікує зміну в `PendingGame`, але нічого не робить, оскільки [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) є хибним.

10. На клієнті [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) встановлюється на запис `PlayerGame` для адреси гравця. Коли `PlayerGame` змінюється, `gameRecord` також змінюється.

11. Якщо в `gameRecord` є значення, і гра не була виграна або програна, клієнт [відображає карту](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Копання {#dig-flow}

1. Гравець [натискає кнопку клітинки карти](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), що викликає [функцію `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Ця функція викликає [`dig` в ончейні](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Ончейн-компонент [виконує низку перевірок на адекватність](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), і в разі успіху додає запит на копання до [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Сервер [виявляє зміну в `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Якщо він дійсний](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), він [викликає код з нульовим розголошенням](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (пояснено нижче), щоб згенерувати як результат, так і доказ його дійсності.

4. [Сервер](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) викликає [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) в ончейні.

5. `digResponse` робить дві речі. По-перше, він перевіряє [доказ із нульовим розголошенням](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Потім, якщо доказ проходить перевірку, він викликає [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) для фактичної обробки результату.

6. `processDigResult` перевіряє, чи була гра [програна](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) або [виграна](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), і [оновлює `Map`, ончейн-карту](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Клієнт автоматично отримує оновлення та [оновлює карту, що відображається гравцеві](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), і, якщо це доречно, повідомляє гравцеві, чи це виграш, чи програш.

## Використання Zokrates {#using-zokrates}

У потоках, пояснених вище, ми пропустили частини з нульовим розголошенням, розглядаючи їх як чорний ящик. Тепер давайте відкриємо його і подивимося, як написано цей код.

### Хешування карти {#hashing-map}

Ми можемо використовувати [цей код JavaScript](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) для реалізації [Poseidon](https://www.poseidon-hash.info), хеш-функції Zokrates, яку ми використовуємо. Однак, хоча це було б швидше, це також було б складніше, ніж просто використовувати для цього хеш-функцію Zokrates. Це посібник, тому код оптимізований для простоти, а не для продуктивності. Тому нам потрібні дві різні програми Zokrates, одна для обчислення хеша карти (`hash`), а інша для створення доказу з нульовим розголошенням результату розкопок у певному місці на карті (`dig`).

### Хеш-функція {#hash-function}

Це функція, яка обчислює хеш карти. Ми розглянемо цей код рядок за рядком.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Ці два рядки імпортують дві функції зі [стандартної бібліотеки Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [Перша функція](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) — це [хеш Poseidon](https://www.poseidon-hash.info/). Він приймає масив елементів [`field`](https://zokrates.github.io/language/types.html#field) і повертає `field`.

Елемент поля в Zokrates зазвичай має довжину менше 256 біт, але не набагато. Щоб спростити код, ми обмежуємо карту до 512 біт і хешуємо масив із чотирьох полів, і в кожному полі ми використовуємо лише 128 біт. [Функція `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) для цього перетворює масив із 128 бітів на `field`.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Цей рядок починає визначення функції. `hashMap` отримує один параметр під назвою `map`, двовимірний логічний масив `bool`(ean). Розмір карти становить `width+2` на `height+2` з причин, [пояснених нижче](#why-map-border).

Ми можемо використовувати `${width+2}` та `${height+2}`, оскільки програми Zokrates зберігаються в цьому застосунку як [рядки-шаблони](https://www.w3schools.com/js/js_string_templates.asp). Код між `${` і `}` обробляється JavaScript, і таким чином програму можна використовувати для карт різних розмірів. Параметр карти має рамку шириною в одну клітинку по всьому периметру без будь-яких бомб, тому нам потрібно додати два до ширини та висоти.

Повернене значення — це `field`, що містить хеш.

```
   bool[512] mut map1d = [false; 512];
```

Карта є двовимірною. Однак функція `pack128` не працює з двовимірними масивами. Тому ми спочатку вирівнюємо карту в 512-байтовий масив, використовуючи `map1d`. За замовчуванням змінні Zokrates є константами, але нам потрібно присвоювати значення цьому масиву в циклі, тому ми визначаємо його як [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Нам потрібно ініціалізувати масив, тому що в Zokrates немає `undefined`. Вираз `[false; 512]` означає [масив із 512 значень `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

Нам також потрібен лічильник, щоб розрізняти біти, які ми вже заповнили в `map1d`, і ті, які ще ні.

```
   for u32 x in 0..${width+2} {
```

Так ви оголошуєте [цикл `for`](https://zokrates.github.io/language/control_flow.html#for-loops) у Zokrates. Цикл `for` у Zokrates повинен мати фіксовані межі, тому що хоча він виглядає як цикл, компілятор насправді «розгортає» його. Вираз `${width+2}` є константою часу компіляції, оскільки `width` встановлюється кодом TypeScript перед викликом компілятора.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Для кожного місця на карті помістіть це значення в масив `map1d` і збільште лічильник.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` для створення масиву з чотирьох значень `field` з `map1d`. У Zokrates `array[a..b]` означає зріз масиву, який починається з `a` і закінчується на `b-1`.

```
    return poseidon(hashMe);
}
```

Використовуйте `poseidon` для перетворення цього масиву в хеш.

### Програма хешування {#hash-program}

Серверу потрібно викликати `hashMap` безпосередньо для створення ідентифікаторів гри. Однак Zokrates може викликати для запуску лише функцію `main` у програмі, тому ми створюємо програму з `main`, яка викликає функцію хешування.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Програма копання {#dig-program}

Це серцевина частини застосунку з нульовим розголошенням, де ми створюємо докази, які використовуються для перевірки результатів розкопок.

```
${hashFragment}

// Кількість мін у місці (x, y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Навіщо потрібна рамка карти {#why-map-border}

Докази з нульовим розголошенням використовують [арифметичні схеми](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), які не мають простого еквівалента оператора `if`. Натомість вони використовують еквівалент [умовного оператора](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Якщо `a` може бути або нулем, або одиницею, ви можете обчислити `if a { b } else { c }` як `ab+(1-a)c`.

Через це оператор `if` у Zokrates завжди обчислює обидві гілки. Наприклад, якщо у вас є такий код:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Він видасть помилку, оскільки йому потрібно обчислити `arr[10]`, навіть якщо це значення пізніше буде помножене на нуль.

Саме тому нам потрібна рамка шириною в одну клітинку по всьому периметру карти. Нам потрібно обчислити загальну кількість мін навколо певного місця, а це означає, що нам потрібно бачити місце на один рядок вище та нижче, ліворуч і праворуч від місця, де ми копаємо. Це означає, що ці місця мають існувати в масиві карти, який надається Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

За замовчуванням докази Zokrates містять свої вхідні дані. Немає користі знати, що навколо місця є п'ять мін, якщо ви насправді не знаєте, що це за місце (і ви не можете просто зіставити його зі своїм запитом, тому що тоді доказувач міг би використовувати інші значення і не повідомляти вам про це). Однак нам потрібно тримати карту в секреті, надаючи її Zokrates. Рішення — використовувати `private` параметр, який _не_ розкривається доказом.

Це відкриває ще одну можливість для зловживань. Доказувач міг би використовувати правильні координати, але створити карту з будь-якою кількістю мін навколо місця і, можливо, в самому місці. Щоб запобігти цьому зловживанню, ми робимо так, щоб доказ із нульовим розголошенням містив хеш карти, який є ідентифікатором гри.

```
   return (hashMap(map),
```

Повернене значення тут — це кортеж, який містить масив хешів карти, а також результат копання.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Ми використовуємо 255 як спеціальне значення на випадок, якщо в самому місці є бомба.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Якщо гравець не натрапив на міну, додайте кількість мін для області навколо цього місця і поверніть її.

### Використання Zokrates з TypeScript {#using-zokrates-from-typescript}

Zokrates має інтерфейс командного рядка, але в цій програмі ми використовуємо його в [коді TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

Бібліотека, що містить визначення Zokrates, називається [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Імпортуйте [зв'язки Zokrates для JavaScript](https://zokrates.github.io/toolbox/zokrates_js.html). Нам потрібна лише функція [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize), оскільки вона повертає проміс, який розв'язується до всіх визначень Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Подібно до самого Zokrates, ми також експортуємо лише одну функцію, яка також є [асинхронною](https://www.w3schools.com/js/js_async.asp). Коли вона врешті-решт повертається, вона надає кілька функцій, як ми побачимо нижче.

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
// Створення ключів для верифікації з нульовим розголошенням.
// У виробничій системі ви б хотіли використовувати церемонію налаштування.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

У виробничій системі ми могли б використовувати більш складну [церемонію налаштування](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony), але для демонстрації цього достатньо. Не проблема, що користувачі можуть знати ключ доказувача — вони все одно не можуть використовувати його для доведення речей, якщо вони не є правдивими. Оскільки ми вказуємо ентропію (другий параметр, `""`), результати завжди будуть однаковими.

**Примітка:** компіляція програм Zokrates і створення ключів — це повільні процеси. Немає потреби повторювати їх щоразу, лише коли змінюється розмір карти. У виробничій системі ви б зробили це один раз, а потім зберегли б результат. Єдина причина, чому я не роблю цього тут, — це простота.

#### `calculateMapHash` {#calculateMapHash}

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

Функція [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) фактично запускає програму Zokrates. Вона повертає структуру з двома полями: `output`, який є виводом програми у вигляді рядка JSON, і `witness`, який є інформацією, необхідною для створення доказу з нульовим розголошенням результату. Тут нам потрібен лише вивід.

Вивід — це рядок вигляду `"31337"`, десяткове число в лапках. Але вивід, який нам потрібен для `viem`, — це шістнадцяткове число вигляду `0x60A7`. Отже, ми використовуємо `.slice(1,-1)`, щоб видалити лапки, а потім `BigInt`, щоб перетворити решту рядка, який є десятковим числом, на [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` перетворює цей `BigInt` на шістнадцятковий рядок, а `"0x"+` додає маркер для шістнадцяткових чисел.

```typescript
// Викопати та повернути доказ з нульовим розголошенням результату
// (код на стороні сервера)
```

Доказ із нульовим розголошенням містить публічні вхідні дані (`x` і `y`) та результати (хеш карти та кількість бомб).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Перевіряти, чи індекс виходить за межі, в Zokrates є проблемою, тому ми робимо це тут.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Виконати програму копання.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Використовуйте [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) і поверніть доказ.

```typescript
const solidityVerifier = `
        // Розмір карти: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Верифікатор Solidity, смартконтракт, який ми можемо розгорнути в блокчейні та використовувати для верифікації доказів, згенерованих `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Нарешті, поверніть усе, що може знадобитися іншому коду.

## Тести безпеки {#security-tests}

Тести безпеки важливі, оскільки помилка функціональності рано чи пізно виявить себе. Але якщо застосунок є незахищеним, це, ймовірно, залишатиметься прихованим протягом тривалого часу, перш ніж його виявить хтось, хто шахраює і отримує ресурси, що належать іншим.

### Дозволи {#permissions}

У цій грі є одна привілейована сутність — сервер. Це єдиний користувач, якому дозволено викликати функції в [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Ми можемо використовувати [`cast`](https://book.getfoundry.sh/cast/) для перевірки того, що виклики до функцій з обмеженим доступом дозволені лише з облікового запису сервера.

[Приватний ключ сервера знаходиться в `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. На комп'ютері, де запущено `anvil` (блокчейн), встановіть ці змінні середовища.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Використовуйте `cast` для спроби встановити адресу верифікатора як неавторизовану адресу.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Не тільки `cast` повідомляє про помилку, але ви можете відкрити **MUD Dev Tools** у грі в браузері, натиснути **Tables** і вибрати **app\_\_VerifierAddress**. Переконайтеся, що адреса не є нульовою.

3. Встановіть адресу верифікатора як адресу сервера.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Адреса в **app\_\_VerifiedAddress** тепер має бути нульовою.

Усі функції MUD в одній `System` проходять через однаковий контроль доступу, тому я вважаю цей тест достатнім. Якщо ви так не вважаєте, ви можете перевірити інші функції в [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Зловживання з нульовим розголошенням {#zero-knowledge-abuses}

Математика для перевірки Zokrates виходить за рамки цього посібника (і моїх можливостей). Однак ми можемо виконати різні перевірки коду з нульовим розголошенням, щоб переконатися, що якщо він не виконаний правильно, він не спрацює. Усі ці тести вимагатимуть від нас зміни [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) і перезапуску всього застосунку. Недостатньо перезапустити процес сервера, оскільки це ставить застосунок у неможливий стан (у гравця є незакінчена гра, але ця гра більше не доступна для сервера).

#### Неправильна відповідь {#wrong-answer}

Найпростіша можливість — надати неправильну відповідь у доказі з нульовим розголошенням. Для цього ми заходимо всередину `zkDig` і [змінюємо рядок 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

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

#### Неправильний доказ {#wrong-proof}

Що станеться, якщо ми надамо правильну інформацію, але просто матимемо неправильні дані доказу? Тепер замініть рядок 91 на:

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

Це все одно не спрацює, але тепер без причини, оскільки це відбувається під час виклику верифікатора.

### Як користувач може перевірити код із нульовим розголошенням? {#user-verify-zero-trust}

Смартконтракти відносно легко перевірити. Зазвичай розробник публікує вихідний код у оглядачі блоків, і оглядач блоків перевіряє, що вихідний код компілюється в код у [транзакції розгортання контракту](/developers/docs/smart-contracts/deploying/). У випадку `System`s MUD це [трохи складніше](https://mud.dev/cli/verify), але не набагато.

З нульовим розголошенням це складніше. Верифікатор містить деякі константи та виконує з ними деякі обчислення. Це не говорить вам, що саме доводиться.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Рішення, принаймні до того, як оглядачі блоків додадуть верифікацію Zokrates до своїх користувацьких інтерфейсів, полягає в тому, щоб розробники застосунку зробили доступними програми Zokrates, і щоб принаймні деякі користувачі компілювали їх самостійно з відповідним ключем верифікації.

Для цього:

1. [Встановіть Zokrates](https://zokrates.github.io/gettingstarted.html).

2. Створіть файл `dig.zok` з програмою Zokrates. Код нижче передбачає, що ви зберегли початковий розмір карти, 10x5.

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


    // Кількість мін у місці (x,y)
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

3. Скомпілюйте код Zokrates і створіть ключ верифікації. Ключ верифікації має бути створений з тією ж ентропією, що й у вихідному сервері, [у цьому випадку — порожній рядок](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Створіть верифікатор Solidity самостійно і переконайтеся, що він функціонально ідентичний тому, що знаходиться в блокчейні (сервер додає коментар, але це неважливо).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Рішення щодо дизайну {#design}

У будь-якому достатньо складному застосунку існують конкуруючі цілі дизайну, що вимагають компромісів. Давайте розглянемо деякі з компромісів і чому поточне рішення є кращим за інші варіанти.

### Чому нульове розголошення? {#why-zero-knowledge}

Для гри «Сапер» вам насправді не потрібне нульове розголошення. Сервер завжди може тримати карту, а потім просто розкрити її всю, коли гра закінчиться. Тоді, наприкінці гри, смартконтракт може обчислити хеш карти, перевірити, чи він збігається, і якщо ні — покарати сервер або повністю проігнорувати гру.

Я не використовував це простіше рішення, оскільки воно працює лише для коротких ігор з чітко визначеним кінцевим станом. Коли гра потенційно нескінченна (як у випадку з [автономними світами](https://0xparc.org/blog/autonomous-worlds)), вам потрібне рішення, яке доводить стан, _не_ розкриваючи його.

Як посібник, ця стаття потребувала короткої гри, яку легко зрозуміти, але ця техніка є найбільш корисною для довших ігор.

### Чому Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) — не єдина доступна бібліотека з нульовим розголошенням, але вона схожа на звичайну, [імперативну](https://en.wikipedia.org/wiki/Imperative_programming) мову програмування та підтримує логічні змінні.

Для вашого застосунку з іншими вимогами ви можете віддати перевагу використанню [Circum](https://docs.circom.io/getting-started/installation/) або [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Коли компілювати Zokrates {#when-compile-zokrates}

У цій програмі ми компілюємо програми Zokrates [кожного разу, коли запускається сервер](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Це, безумовно, марна трата ресурсів, але це посібник, оптимізований для простоти.

Якби я писав застосунок для виробництва, я б перевірив, чи є у мене файл зі скомпільованими програмами Zokrates для цього розміру мінного поля, і якщо так, то використовував би його. Те саме стосується розгортання контракту верифікатора в ончейні.

### Створення ключів верифікатора та доказувача {#key-creation}

[Створення ключів](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) — це ще одне чисте обчислення, яке не потрібно виконувати більше одного разу для даного розміру мінного поля. Знову ж таки, це робиться лише один раз заради простоти.

Крім того, ми могли б використовувати [церемонію налаштування](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Перевага церемонії налаштування полягає в тому, що для шахрайства з доказом з нульовим розголошенням вам потрібна або ентропія, або якийсь проміжний результат від кожного учасника. Якщо принаймні один учасник церемонії чесний і видаляє цю інформацію, докази з нульовим розголошенням захищені від певних атак. Однак _немає механізму_ для перевірки того, що інформація була видалена звідусіль. Якщо докази з нульовим розголошенням є критично важливими, ви захочете взяти участь у церемонії налаштування.

Тут ми покладаємося на [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), у яких були десятки учасників. Це, ймовірно, достатньо безпечно і набагато простіше. Ми також не додаємо ентропію під час створення ключа, що полегшує користувачам [перевірку конфігурації з нульовим розголошенням](#user-verify-zero-trust).

### Де перевіряти {#where-verification}

Ми можемо перевіряти докази з нульовим розголошенням або в ончейні (що коштує газу), або в клієнті (використовуючи [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Я вибрав перший варіант, оскільки це дозволяє [перевірити верифікатор](#user-verify-zero-trust) один раз, а потім довіряти, що він не зміниться, доки адреса контракту для нього залишається незмінною. Якби перевірка проводилася на клієнті, вам довелося б перевіряти код, який ви отримуєте кожного разу, коли завантажуєте клієнт.

Крім того, хоча ця гра є однокористувацькою, багато блокчейн-ігор є багатокористувацькими. Ончейн-перевірка означає, що ви перевіряєте доказ з нульовим розголошенням лише один раз. Робити це в клієнті вимагало б, щоб кожен клієнт перевіряв незалежно.

### Вирівнювати карту в TypeScript чи Zokrates? {#where-flatten}

Загалом, коли обробка може бути виконана або в TypeScript, або в Zokrates, краще робити це в TypeScript, який набагато швидший і не вимагає доказів з нульовим розголошенням. З цієї причини, наприклад, ми не надаємо Zokrates хеш і не змушуємо його перевіряти, чи він правильний. Хешування має виконуватися всередині Zokrates, але зіставлення повернутого хеша з хешем в ончейні може відбуватися поза ним.

Однак ми все одно [вирівнюємо карту в Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), тоді як могли б зробити це в TypeScript. Причина в тому, що інші варіанти, на мою думку, гірші.

- Надати одновимірний масив логічних значень коду Zokrates і використовувати вираз, такий як `x*(height+2)
  +y`, щоб отримати двовимірну карту. Це зробило б [код](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) дещо складнішим, тому я вирішив, що приріст продуктивності не вартий цього для посібника.

- Надіслати Zokrates і одновимірний, і двовимірний масив. Однак це рішення нічого нам не дає. Код Zokrates мав би перевіряти, чи наданий одновимірний масив дійсно є правильним представленням двовимірного масиву. Тож приросту продуктивності не було б.

- Вирівняти двовимірний масив у Zokrates. Це найпростіший варіант, тому я його вибрав.

### Де зберігати карти {#where-store-maps}

У цьому застосунку [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) — це просто змінна в пам'яті. Це означає, що якщо ваш сервер вийде з ладу і потребуватиме перезапуску, вся збережена в ньому інформація буде втрачена. Гравці не тільки не зможуть продовжити свою гру, вони навіть не зможуть розпочати нову гру, оскільки ончейн-компонент вважає, що у них все ще є незавершена гра.

Це, безумовно, поганий дизайн для виробничої системи, в якій ви б зберігали цю інформацію в базі даних. Єдина причина, чому я використав тут змінну, — це те, що це посібник, і простота є головним міркуванням.

## Висновок: за яких умов ця техніка є доречною? {#conclusion}

Отже, тепер ви знаєте, як написати гру з сервером, який зберігає секретний стан, що не належить до ончейну. Але в яких випадках варто це робити? Є два основних міркування.

- _Довготривала гра_: [як згадувалося вище](#why-zero-knowledge), у короткій грі ви можете просто опублікувати стан, коли гра закінчиться, і все перевірити тоді. Але це не варіант, коли гра триває довго або невизначений час, і стан повинен залишатися секретним.

- _Деяка централізація є прийнятною_: докази з нульовим розголошенням можуть перевіряти цілісність, тобто те, що суб'єкт не підробляє результати. Чого вони не можуть зробити, так це гарантувати, що суб'єкт все ще буде доступним і відповідатиме на повідомлення. У ситуаціях, коли доступність також потребує децентралізації, докази з нульовим розголошенням не є достатнім рішенням, і вам потрібні [багатосторонні обчислення](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Більше моїх робіт дивіться тут](https://cryptodocguy.pro/).

### Подяки {#acknowledgements}

- Альваро Алонсо прочитав чернетку цієї статті та роз'яснив деякі з моїх непорозумінь щодо Zokrates.

Відповідальність за будь-які помилки, що залишилися, лежить на мені.
