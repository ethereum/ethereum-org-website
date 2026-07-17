---
title: "Использование нулевого разглашения для секретного состояния"
description: "Ончейн-игры ограничены, поскольку они не могут хранить скрытую информацию. После прочтения этого руководства читатель сможет комбинировать доказательства с нулевым разглашением и серверные компоненты для создания проверяемых игр с секретным состоянием и офчейн-компонентом. Этот метод будет продемонстрирован на примере создания игры «Сапер»."
author: "Ори Померанц"
tags:
  - сервер
  - офчейн
  - централизованный
  - нулевое разглашение
  - Zokrates
  - MUD
  - конфиденциальность
skill: advanced
breadcrumb: "Секретное состояние ZK"
lang: ru
published: 2025-03-15
---

_В блокчейне нет секретов_. Все, что публикуется в блокчейне, открыто для чтения каждому. Это необходимо, поскольку блокчейн основан на том, что любой может его проверить. Однако игры часто полагаются на секретное состояние. Например, игра [«Сапер»](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) теряет всякий смысл, если вы можете просто зайти в обозреватель блоков и посмотреть карту.

Самое простое решение — использовать [серверный компонент](/developers/tutorials/server-components/) для хранения секретного состояния. Однако причина, по которой мы используем блокчейн, заключается в предотвращении мошенничества со стороны разработчика игры. Нам нужно убедиться в честности серверного компонента. Сервер может предоставить хеш состояния и использовать [доказательства с нулевым разглашением](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important), чтобы доказать, что состояние, используемое для вычисления результата хода, является правильным.

После прочтения этой статьи вы узнаете, как создать такой сервер, хранящий секретное состояние, клиент для отображения состояния и ончейн-компонент для связи между ними. Основные инструменты, которые мы будем использовать:

| Инструмент                                          | Назначение                                                 | Проверено на версии |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | Доказательства с нулевым разглашением и их верификация            |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | Язык программирования как для сервера, так и для клиента |               5.4.2 |
| [Node](https://nodejs.org/en)                 | Запуск сервера                                      |             20.18.2 |
| [Viem](https://viem.sh/)                      | Взаимодействие с блокчейном                       |              2.9.20 |
| [MUD](https://mud.dev/)                       | Управление ончейн-данными                                 |              2.0.12 |
| [React](https://react.dev/)                   | Пользовательский интерфейс клиента                                   |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | Обслуживание клиентского кода                                 |               4.2.1 |

## Пример игры «Сапер» {#minesweeper}

[«Сапер»](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) — это игра, в которой есть секретная карта с минным полем. Игрок выбирает определенное место, чтобы раскопать его. Если в этом месте находится мина, игра заканчивается. В противном случае игрок получает количество мин в восьми клетках, окружающих это место.

Это приложение написано с использованием [MUD](https://mud.dev/) — фреймворка, который позволяет нам хранить данные ончейн с помощью [базы данных «ключ-значение»](https://aws.amazon.com/nosql/key-value/) и автоматически синхронизировать эти данные с офчейн-компонентами. Помимо синхронизации, MUD упрощает обеспечение контроля доступа, а также позволяет другим пользователям [расширять](https://mud.dev/guides/extending-a-world) наше приложение без разрешений.

### Запуск примера игры «Сапер» {#running-minesweeper-example}

Чтобы запустить пример игры «Сапер»:

1. Убедитесь, что у вас [установлены необходимые компоненты](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads) и [`mprocs`](https://github.com/pvolok/mprocs).

2. Клонируйте репозиторий.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Установите пакеты.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Если Foundry был установлен как часть `pnpm install`, вам необходимо перезапустить оболочку командной строки.

4. Скомпилируйте контракты

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. Запустите программу (включая блокчейн [anvil](https://book.getfoundry.sh/anvil/)) и подождите.

   ```sh copy
   mprocs
   ```

   Обратите внимание, что запуск занимает много времени. Чтобы увидеть прогресс, сначала используйте стрелку вниз для прокрутки до вкладки _contracts_, чтобы увидеть, как развертываются контракты MUD. Когда вы получите сообщение _Waiting for file changes…_, контракты развернуты, и дальнейший прогресс будет происходить на вкладке _server_. Там вы ждете, пока не получите сообщение _Verifier address: 0x...._.

   Если этот шаг выполнен успешно, вы увидите экран `mprocs` с различными процессами слева и выводом консоли для текущего выбранного процесса справа.

   ![The mprocs screen](./mprocs.png)

   Если возникла проблема с `mprocs`, вы можете запустить четыре процесса вручную, каждый в своем окне командной строки:

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

6. Теперь вы можете перейти к [клиенту](http://localhost:3000), нажать **New Game** и начать играть.

### Таблицы {#tables}

Нам нужно [несколько таблиц](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) ончейн.

- `Configuration`: Эта таблица представляет собой синглтон, у нее нет ключа и есть только одна запись. Она используется для хранения информации о конфигурации игры:
  - `height`: Высота минного поля
  - `width`: Ширина минного поля
  - `numberOfBombs`: Количество бомб на каждом минном поле
- `VerifierAddress`: Эта таблица также является синглтоном. Она используется для хранения одной части конфигурации — адреса контракта верификатора (`verifier`). Мы могли бы поместить эту информацию в таблицу `Configuration`, но она устанавливается другим компонентом — сервером, поэтому ее проще вынести в отдельную таблицу.

- `PlayerGame`: Ключом является адрес игрока. Данные:

  - `gameId`: 32-байтовое значение, которое является хешем карты, на которой играет игрок (идентификатор игры).
  - `win`: логическое значение, указывающее, выиграл ли игрок игру.
  - `lose`: логическое значение, указывающее, проиграл ли игрок игру.
  - `digNumber`: количество успешных раскопок в игре.

- `GamePlayer`: Эта таблица содержит обратное сопоставление: от `gameId` к адресу игрока.

- `Map`: Ключом является кортеж из трех значений:

  - `gameId`: 32-байтовое значение, которое является хешем карты, на которой играет игрок (идентификатор игры).
  - координата `x`
  - координата `y`

  Значение представляет собой одно число. Оно равно 255, если была обнаружена бомба. В противном случае это количество бомб вокруг этого места плюс один. Мы не можем просто использовать количество бомб, потому что по умолчанию все хранилище в EVM и все значения строк в MUD равны нулю. Нам нужно различать ситуации «игрок здесь еще не копал» и «игрок здесь копал и обнаружил, что вокруг ноль бомб».

Кроме того, связь между клиентом и сервером происходит через ончейн-компонент. Это также реализовано с использованием таблиц.

- `PendingGame`: Необработанные запросы на начало новой игры.
- `PendingDig`: Необработанные запросы на раскопку в определенном месте в конкретной игре. Это [офчейн-таблица](https://mud.dev/store/tables#types-of-tables), что означает, что она не записывается в хранилище EVM, а доступна для чтения только офчейн с использованием событий.

### Потоки выполнения и данных {#execution-data-flows}

Эти потоки координируют выполнение между клиентом, ончейн-компонентом и сервером.

#### Инициализация {#initialization-flow}

Когда вы запускаете `mprocs`, происходят следующие шаги:

1. [`mprocs`](https://github.com/pvolok/mprocs) запускает четыре компонента:

   - [Anvil](https://book.getfoundry.sh/anvil/), который запускает локальный блокчейн
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), который компилирует (при необходимости) и развертывает контракты для MUD
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), который запускает [Vite](https://vitejs.dev/) для обслуживания пользовательского интерфейса и клиентского кода для веб-браузеров.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), который выполняет действия сервера

2. Пакет `contracts` развертывает контракты MUD, а затем запускает [скрипт `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Этот скрипт задает конфигурацию. Код из GitHub указывает [минное поле 10x5 с восемью минами на нем](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Сервер](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) начинает с [настройки MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Помимо прочего, это активирует синхронизацию данных, так что копия соответствующих таблиц существует в памяти сервера.

4. Сервер подписывает функцию для выполнения [при изменении таблицы `Configuration`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Эта функция](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) вызывается после того, как `PostDeploy.s.sol` выполняется и изменяет таблицу.

5. Когда функция инициализации сервера получает конфигурацию, [она вызывает `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) для инициализации [части сервера, отвечающей за нулевое разглашение](#using-zokrates-from-typescript). Это не может произойти до получения конфигурации, поскольку функции с нулевым разглашением должны иметь ширину и высоту минного поля в качестве констант.

6. После инициализации части сервера с нулевым разглашением следующим шагом является [развертывание контракта верификации с нулевым разглашением в блокчейне](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) и установка адреса верификатора в MUD.

7. Наконец, мы подписываемся на обновления, чтобы видеть, когда игрок запрашивает [начало новой игры](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) или [раскопку в существующей игре](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Новая игра {#new-game-flow}

Вот что происходит, когда игрок запрашивает новую игру.

1. Если для этого игрока нет текущей игры, или она есть, но с gameId равным нулю, клиент отображает [кнопку новой игры](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Когда пользователь нажимает эту кнопку, [React запускает функцию `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) — это вызов `System`. В MUD все вызовы маршрутизируются через контракт `World`, и в большинстве случаев вы вызываете `<namespace>__<function name>`. В данном случае вызов идет к `app__newGame`, который MUD затем маршрутизирует к [`newGame` в `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Ончейн-функция проверяет, что у игрока нет текущей игры, и если ее нет, [добавляет запрос в таблицу `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Сервер обнаруживает изменение в `PendingGame` и [запускает подписанную функцию](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Эта функция вызывает [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), которая, в свою очередь, вызывает [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Первое, что делает `createGame`, — это [создает случайную карту с соответствующим количеством мин](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Затем она вызывает [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) для создания карты с пустыми границами, что необходимо для Zokrates. Наконец, `createGame` вызывает [`calculateMapHash`](#calculatemaphash), чтобы получить хеш карты, который используется в качестве идентификатора игры.

6. Функция `newGame` добавляет новую игру в `gamesInProgress`.

7. Последнее, что делает сервер, — вызывает [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), которая находится ончейн. Эта функция находится в другом `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), для обеспечения контроля доступа. Контроль доступа определяется в [файле конфигурации MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Список доступа разрешает вызывать `System` только одному адресу. Это ограничивает доступ к функциям сервера одним адресом, поэтому никто не может выдать себя за сервер.

8. Ончейн-компонент обновляет соответствующие таблицы:

   - Создает игру в `PlayerGame`.
   - Устанавливает обратное сопоставление в `GamePlayer`.
   - Удаляет запрос из `PendingGame`.

9. Сервер идентифицирует изменение в `PendingGame`, но ничего не делает, потому что [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) имеет значение false.

10. На клиенте [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) устанавливается на запись `PlayerGame` для адреса игрока. Когда изменяется `PlayerGame`, изменяется и `gameRecord`.

11. Если в `gameRecord` есть значение, и игра не была выиграна или проиграна, клиент [отображает карту](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Раскопка {#dig-flow}

1. Игрок [нажимает кнопку ячейки карты](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), что вызывает [функцию `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Эта функция вызывает [`dig` ончейн](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Ончейн-компонент [выполняет ряд проверок на корректность](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30) и в случае успеха добавляет запрос на раскопку в [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Сервер [обнаруживает изменение в `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Если оно действительно](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), он [вызывает код с нулевым разглашением](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (объясняется ниже) для генерации как результата, так и доказательства его действительности.

4. [Сервер](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) вызывает [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) ончейн.

5. `digResponse` делает две вещи. Сначала он проверяет [доказательство с нулевым разглашением](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Затем, если доказательство проходит проверку, он вызывает [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) для фактической обработки результата.

6. `processDigResult` проверяет, была ли игра [проиграна](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) или [выиграна](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), и [обновляет `Map` — ончейн-карту](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Клиент автоматически подхватывает обновления и [обновляет карту, отображаемую игроку](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), а также, если применимо, сообщает игроку о победе или поражении.

## Использование Zokrates {#using-zokrates}

В описанных выше процессах мы пропустили части, связанные с нулевым разглашением, рассматривая их как черный ящик. Теперь давайте заглянем внутрь и посмотрим, как написан этот код.

### Хеширование карты {#hashing-map}

Мы можем использовать [этот код на JavaScript](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) для реализации [Poseidon](https://www.poseidon-hash.info), используемой нами хеш-функции Zokrates. Однако, хотя это было бы быстрее, это также было бы сложнее, чем просто использовать хеш-функцию Zokrates. Это руководство, поэтому код оптимизирован для простоты, а не для производительности. Следовательно, нам нужны две разные программы Zokrates: одна просто для вычисления хеша карты (`hash`), а другая — для фактического создания доказательства с нулевым разглашением результата раскопки в определенном месте на карте (`dig`).

### Хеш-функция {#hash-function}

Это функция, которая вычисляет хеш карты. Мы разберем этот код построчно.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Эти две строки импортируют две функции из [стандартной библиотеки Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [Первая функция](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) — это [хеш Poseidon](https://www.poseidon-hash.info/). Она принимает массив [элементов `field`](https://zokrates.github.io/language/types.html#field) и возвращает `field`.

Элемент поля в Zokrates обычно имеет длину менее 256 бит, но ненамного. Чтобы упростить код, мы ограничиваем карту до 512 бит и хешируем массив из четырех полей, причем в каждом поле мы используем только 128 бит. [Функция `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) преобразует массив из 128 бит в `field` для этой цели.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Эта строка начинает определение функции. `hashMap` получает один параметр с именем `map`, двумерный массив типа `bool`(ean). Размер карты составляет `width+2` на `height+2` по причинам, которые [объясняются ниже](#why-map-border).

Мы можем использовать `${width+2}` и `${height+2}`, потому что программы Zokrates хранятся в этом приложении как [шаблонные строки](https://www.w3schools.com/js/js_string_templates.asp). Код между `${` и `}` вычисляется с помощью JavaScript, и таким образом программу можно использовать для карт разных размеров. Параметр карты имеет границу шириной в одну ячейку по всему периметру без каких-либо бомб, по этой причине нам нужно прибавить два к ширине и высоте.

Возвращаемое значение — это `field`, которое содержит хеш.

```
bool[512] mut map1d = [false; 512];
```

Карта двумерная. Однако функция `pack128` не работает с двумерными массивами. Поэтому мы сначала преобразуем карту в плоский 512-байтовый массив, используя `map1d`. По умолчанию переменные Zokrates являются константами, но нам нужно присваивать значения этому массиву в цикле, поэтому мы определяем его как [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Нам нужно инициализировать массив, потому что в Zokrates нет `undefined`. Выражение `[false; 512]` означает [массив из 512 значений `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
u32 mut counter = 0;
```

Нам также нужен счетчик, чтобы различать биты, которые мы уже заполнили в `map1d`, и те, которые еще нет.

```
for u32 x in 0..${width+2} {
```

Вот как объявляется [цикл `for`](https://zokrates.github.io/language/control_flow.html#for-loops) в Zokrates. Цикл `for` в Zokrates должен иметь фиксированные границы, потому что, хотя он и выглядит как цикл, компилятор на самом деле «разворачивает» его. Выражение `${width+2}` является константой времени компиляции, поскольку `width` устанавливается кодом TypeScript до вызова компилятора.

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Для каждой ячейки на карте поместите это значение в массив `map1d` и увеличьте счетчик.

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

Используем `pack128` для создания массива из четырех значений `field` из `map1d`. В Zokrates `array[a..b]` означает срез массива, который начинается с `a` и заканчивается на `b-1`.

```
return poseidon(hashMe);
}
```

Используйте `poseidon` для преобразования этого массива в хеш.

### Программа хеширования {#hash-program}

Серверу необходимо вызывать `hashMap` напрямую для создания идентификаторов игры. Однако Zokrates может вызывать только функцию `main` для запуска программы, поэтому мы создаем программу с `main`, которая вызывает хеш-функцию.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Программа раскопки {#dig-program}

Это сердце части приложения с нулевым разглашением, где мы создаем доказательства, которые используются для проверки результатов раскопки.

```
${hashFragment}

// Количество мин в ячейке (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Зачем нужна граница карты {#why-map-border}

Доказательства с нулевым разглашением используют [арифметические схемы](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), которые не имеют простого эквивалента оператору `if`. Вместо этого они используют эквивалент [условного оператора](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Если `a` может быть равно нулю или единице, вы можете вычислить `if a { b } else { c }` как `ab+(1-a)c`.

Из-за этого оператор `if` в Zokrates всегда вычисляет обе ветви. Например, если у вас есть такой код:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Он выдаст ошибку, потому что ему нужно вычислить `arr[10]`, даже если это значение позже будет умножено на ноль.

По этой причине нам нужна граница шириной в одну ячейку по всему периметру карты. Нам нужно вычислить общее количество мин вокруг ячейки, а это значит, что нам нужно видеть ячейки на одну строку выше и ниже, слева и справа от того места, где мы копаем. Это означает, что эти ячейки должны существовать в массиве карты, который предоставляется Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

По умолчанию доказательства Zokrates включают свои входные данные. Нет никакой пользы в том, чтобы знать, что вокруг какого-то места есть пять мин, если вы на самом деле не знаете, что это за место (и вы не можете просто сопоставить его со своим запросом, потому что тогда прувер мог бы использовать другие значения и не сообщить вам об этом). Однако нам нужно сохранить карту в секрете, предоставляя ее Zokrates. Решение состоит в том, чтобы использовать параметр `private`, который _не_ раскрывается доказательством.

Это открывает еще одну возможность для злоупотреблений. Прувер мог бы использовать правильные координаты, но создать карту с любым количеством мин вокруг этого места и, возможно, в самом этом месте. Чтобы предотвратить это злоупотребление, мы делаем так, чтобы доказательство с нулевым разглашением включало хеш карты, который является идентификатором игры.

```
return (hashMap(map),
```

Возвращаемое значение здесь — это кортеж, который включает массив хеша карты, а также результат раскопки.

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Мы используем 255 в качестве специального значения на случай, если в самой ячейке есть бомба.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Если игрок не попал на мину, сложите количество мин для области вокруг ячейки и верните это значение.

### Использование Zokrates из TypeScript {#using-zokrates-from-typescript}

У Zokrates есть интерфейс командной строки, но в этой программе мы используем его в [коде TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

Библиотека, содержащая определения Zokrates, называется [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Импортируйте [привязки Zokrates для JavaScript](https://zokrates.github.io/toolbox/zokrates_js.html). Нам нужна только функция [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize), потому что она возвращает промис, который разрешается во все определения Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Подобно самому Zokrates, мы также экспортируем только одну функцию, которая также является [асинхронной](https://www.w3schools.com/js/js_async.asp). Когда она в конечном итоге возвращает результат, она предоставляет несколько функций, как мы увидим ниже.

```typescript
const zokrates = await zokratesInitialize()
```

Инициализируем Zokrates, получаем все необходимое из библиотеки.

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

Далее у нас есть хеш-функция и две программы Zokrates, которые мы видели выше.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Здесь мы компилируем эти программы.

```typescript
// Создать ключи для верификации с нулевым разглашением.
// В рабочей системе желательно использовать церемонию настройки.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

В рабочей системе мы могли бы использовать более сложную [церемонию настройки](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony), но для демонстрации этого достаточно. То, что пользователи могут знать ключ прувера, не является проблемой — они все равно не смогут использовать его для доказательства чего-либо, если это не является правдой. Поскольку мы указываем энтропию (второй параметр, `""`), результаты всегда будут одинаковыми.

**Примечание:** Компиляция программ Zokrates и создание ключей — медленные процессы. Нет необходимости повторять их каждый раз, только при изменении размера карты. В рабочей системе вы бы сделали это один раз, а затем сохранили результат. Единственная причина, по которой я не делаю этого здесь, — ради простоты.

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

Функция [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) фактически запускает программу Zokrates. Она возвращает структуру с двумя полями: `output`, которое является выводом программы в виде строки JSON, и `witness`, которое содержит информацию, необходимую для создания доказательства с нулевым разглашением результата. Здесь нам нужен только вывод.

Вывод представляет собой строку вида `"31337"`, десятичное число, заключенное в кавычки. Но вывод, который нам нужен для `viem`, — это шестнадцатеричное число вида `0x60A7`. Поэтому мы используем `.slice(1,-1)`, чтобы удалить кавычки, а затем `BigInt`, чтобы преобразовать оставшуюся строку, которая является десятичным числом, в [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` преобразует этот `BigInt` в шестнадцатеричную строку, а `"0x"+` добавляет маркер для шестнадцатеричных чисел.

```typescript
// Выкопать и вернуть доказательство с нулевым разглашением результата
// (код на стороне сервера)
```

Доказательство с нулевым разглашением включает публичные входные данные (`x` и `y`) и результаты (хеш карты и количество бомб).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Проверка выхода индекса за пределы в Zokrates является проблемой, поэтому мы делаем это здесь.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Выполняем программу раскопки.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Используем [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) и возвращаем доказательство.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Верификатор Solidity — смарт-контракт, который мы можем развернуть в блокчейне и использовать для проверки доказательств, сгенерированных `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Наконец, возвращаем все, что может понадобиться другому коду.

## Тесты безопасности {#security-tests}

Тесты безопасности важны, поскольку ошибка в функциональности рано или поздно проявит себя. Но если приложение небезопасно, это, скорее всего, будет оставаться скрытым долгое время, пока кто-нибудь не воспользуется уязвимостью и не завладеет чужими ресурсами.

### Разрешения {#permissions}

В этой игре есть одна привилегированная сущность — сервер. Это единственный пользователь, которому разрешено вызывать функции в [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Мы можем использовать [`cast`](https://book.getfoundry.sh/cast/), чтобы убедиться, что вызовы функций с разрешенным доступом разрешены только для аккаунта сервера.

[Приватный ключ сервера находится в `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. На компьютере, где запущен `anvil` (блокчейн), задайте эти переменные среды.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Используйте `cast`, чтобы попытаться установить адрес верификатора с неавторизованного адреса.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Мало того, что `cast` сообщает об ошибке, вы также можете открыть **MUD Dev Tools** в игре в браузере, нажать **Tables** и выбрать **app\_\_VerifierAddress**. Убедитесь, что адрес не равен нулю.

3. Установите адрес верификатора как адрес сервера.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Адрес в **app\_\_VerifiedAddress** теперь должен быть равен нулю.

Все функции MUD в одном и том же `System` проходят через один и тот же контроль доступа, поэтому я считаю этот тест достаточным. Если вы так не считаете, можете проверить другие функции в [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Злоупотребления нулевым разглашением {#zero-knowledge-abuses}

Математика для проверки Zokrates выходит за рамки этого руководства (и моих способностей). Однако мы можем запустить различные проверки кода с нулевым разглашением, чтобы убедиться, что если он выполнен неправильно, то завершается с ошибкой. Все эти тесты потребуют от нас изменить [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) и перезапустить все приложение. Недостаточно просто перезапустить процесс сервера, потому что это переводит приложение в невозможное состояние (у игрока есть незавершенная игра, но она больше не доступна серверу).

#### Неправильный ответ {#wrong-answer}

Самая простая возможность — предоставить неправильный ответ в доказательстве с нулевым разглашением. Для этого мы переходим в `zkDig` и [изменяем строку 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Это означает, что мы всегда будем утверждать, что есть одна бомба, независимо от правильного ответа. Попробуйте поиграть с этой версией, и вы увидите на вкладке **server** экрана `pnpm dev` следующую ошибку:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Так что этот вид мошенничества не срабатывает.

#### Неправильное доказательство {#wrong-proof}

Что произойдет, если мы предоставим правильную информацию, но с неверными данными доказательства? Теперь замените строку 91 на:

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

Оно по-прежнему завершается с ошибкой, но теперь без указания причины, потому что это происходит во время вызова верификатора.

### Как пользователь может проверить код с нулевым доверием? {#user-verify-zero-trust}

Смарт-контракты относительно легко проверить. Обычно разработчик публикует исходный код в обозревателе блоков, и обозреватель блоков проверяет, что исходный код действительно компилируется в код в [транзакции развертывания контракта](/developers/docs/smart-contracts/deploying/). В случае с `System` MUD это [немного сложнее](https://mud.dev/cli/verify), но ненамного.

С нулевым разглашением все сложнее. Верификатор включает некоторые константы и выполняет над ними вычисления. Это не говорит вам о том, что именно доказывается.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Решение, по крайней мере до тех пор, пока обозреватели блоков не добавят проверку Zokrates в свои пользовательские интерфейсы, заключается в том, чтобы разработчики приложений предоставляли программы Zokrates, а хотя бы некоторые пользователи компилировали их самостоятельно с соответствующим ключом верификации.

Для этого:

1. [Установите Zokrates](https://zokrates.github.io/gettingstarted.html).
2. Создайте файл `dig.zok` с программой Zokrates. Приведенный ниже код предполагает, что вы сохранили исходный размер карты, 10x5.

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


    // Количество мин в локации (x,y)
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

3. Скомпилируйте код Zokrates и создайте ключ верификации. Ключ верификации должен быть создан с той же энтропией, которая использовалась на исходном сервере, [в данном случае это пустая строка](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Создайте верификатор Solidity самостоятельно и убедитесь, что он функционально идентичен тому, что находится в блокчейне (сервер добавляет комментарий, но это неважно).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Проектные решения {#design}

В любом достаточно сложном приложении существуют конкурирующие цели проектирования, требующие компромиссов. Давайте рассмотрим некоторые из них и выясним, почему текущее решение предпочтительнее других вариантов.

### Почему нулевое разглашение {#why-zero-knowledge}

Для сапера вам на самом деле не нужно нулевое разглашение. Сервер всегда может хранить карту, а затем просто раскрыть ее целиком, когда игра закончится. Затем, в конце игры, смарт-контракт может вычислить хеш карты, проверить его совпадение, и если он не совпадает, оштрафовать сервер или полностью аннулировать игру.

Я не использовал это более простое решение, потому что оно работает только для коротких игр с четко определенным конечным состоянием. Когда игра потенциально бесконечна (как в случае с [автономными мирами](https://0xparc.org/blog/autonomous-worlds)), вам нужно решение, которое доказывает состояние, _не_ раскрывая его.

Поскольку это руководство, для статьи требовалась короткая и простая для понимания игра, но этот метод наиболее полезен для более длительных игр.

### Почему Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) — не единственная доступная библиотека с нулевым разглашением, но она похожа на обычный [императивный](https://en.wikipedia.org/wiki/Imperative_programming) язык программирования и поддерживает логические переменные.

Для вашего приложения с другими требованиями вы можете предпочесть использовать [Circum](https://docs.circom.io/getting-started/installation/) или [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Когда компилировать Zokrates {#when-compile-zokrates}

В этой программе мы компилируем программы Zokrates [при каждом запуске сервера](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Это явно пустая трата ресурсов, но это руководство, оптимизированное для простоты.

Если бы я писал приложение производственного уровня, я бы проверил, есть ли у меня файл со скомпилированными программами Zokrates для этого размера минного поля, и если да, использовал бы его. То же самое относится и к развертыванию контракта верификатора ончейн.

### Создание ключей верификатора и прувера {#key-creation}

[Создание ключей](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) — это еще одно чистое вычисление, которое не нужно выполнять более одного раза для заданного размера минного поля. Опять же, ради простоты это делается только один раз.

Кроме того, мы могли бы использовать [церемонию установки (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Преимущество церемонии установки заключается в том, что для подделки доказательства с нулевым разглашением вам понадобится либо энтропия, либо какой-то промежуточный результат от каждого участника. Если хотя бы один участник церемонии честен и удаляет эту информацию, доказательства с нулевым разглашением защищены от определенных атак. Однако _нет механизма_ для проверки того, что информация была удалена отовсюду. Если доказательства с нулевым разглашением критически важны, вам стоит принять участие в церемонии установки.

Здесь мы полагаемся на [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), в которой участвовали десятки человек. Вероятно, это достаточно безопасно и намного проще. Мы также не добавляем энтропию во время создания ключа, что упрощает для пользователей [проверку конфигурации с нулевым разглашением](#user-verify-zero-trust).

### Где проводить верификацию {#where-verification}

Мы можем проверять доказательства с нулевым разглашением либо ончейн (что стоит газа), либо в клиенте (используя [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Я выбрал первое, потому что это позволяет вам [проверить верификатор](#user-verify-zero-trust) один раз, а затем быть уверенным, что он не изменится, пока адрес контракта для него остается прежним. Если бы верификация выполнялась на клиенте, вам пришлось бы проверять получаемый код каждый раз при загрузке клиента.

Кроме того, хотя эта игра однопользовательская, многие блокчейн-игры являются многопользовательскими. Верификация ончейн означает, что вы проверяете доказательство с нулевым разглашением только один раз. Выполнение этого в клиенте потребовало бы от каждого клиента независимой проверки.

### Преобразовывать карту в одномерный массив в TypeScript или Zokrates? {#where-flatten}

В целом, когда обработку можно выполнить либо в TypeScript, либо в Zokrates, лучше делать это в TypeScript, который работает намного быстрее и не требует доказательств с нулевым разглашением. По этой причине, например, мы не передаем хеш в Zokrates и не заставляем его проверять правильность. Хеширование должно выполняться внутри Zokrates, но проверка совпадения возвращенного хеша и хеша ончейн может происходить за его пределами.

Однако мы все равно [преобразуем карту в одномерный массив в Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), хотя могли бы сделать это в TypeScript. Причина в том, что другие варианты, на мой взгляд, хуже.

- Передать одномерный массив логических значений в код Zokrates и использовать выражение вроде `x*(height+2)
+y` для получения двумерной карты. Это сделало бы [код](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) несколько сложнее, поэтому я решил, что прирост производительности не стоит того в рамках руководства.

- Отправить в Zokrates как одномерный, так и двумерный массивы. Однако это решение ничего нам не дает. Коду Zokrates пришлось бы проверять, что предоставленный ему одномерный массив действительно является правильным представлением двумерного массива. Так что никакого прироста производительности не было бы.

- Преобразовать двумерный массив в одномерный в Zokrates. Это самый простой вариант, поэтому я выбрал его.

### Где хранить карты {#where-store-maps}

В этом приложении [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) — это просто переменная в памяти. Это означает, что если ваш сервер упадет и его потребуется перезапустить, вся хранящаяся на нем информация будет потеряна. Игроки не только не смогут продолжить свою игру, они даже не смогут начать новую, потому что компонент ончейн будет считать, что их игра все еще продолжается.

Это явно плохой дизайн для производственной системы, в которой вы бы хранили эту информацию в базе данных. Единственная причина, по которой я использовал здесь переменную, заключается в том, что это руководство, и простота является главным соображением.

## Заключение: при каких условиях уместен этот метод? {#conclusion}

Итак, теперь вы знаете, как написать игру с сервером, который хранит секретное состояние, которому не место ончейн. Но в каких случаях следует это делать? Нужно учитывать два основных фактора.

- _Продолжительная игра_: [Как упоминалось выше](#why-zero-knowledge), в короткой игре вы можете просто опубликовать состояние после окончания игры и затем все верифицировать. Но это не вариант, когда игра занимает много времени или длится неопределенный срок, а состояние должно оставаться секретным.

- _Допустима некоторая централизация_: доказательства с нулевым разглашением могут верифицировать целостность, то есть то, что субъект не подделывает результаты. Чего они не могут сделать, так это гарантировать, что субъект по-прежнему будет доступен и будет отвечать на сообщения. В ситуациях, когда доступность также должна быть децентрализованной, доказательства с нулевым разглашением не являются достаточным решением, и вам требуются [многосторонние вычисления](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Здесь вы можете найти больше моих работ](https://cryptodocguy.pro/).

### Благодарности {#acknowledgements}

- Альваро Алонсо прочитал черновик этой статьи и прояснил некоторые мои недопонимания относительно Zokrates.

Ответственность за любые оставшиеся ошибки лежит на мне.