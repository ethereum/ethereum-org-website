---
title: "Использование 0-знания для секретного состояния"
description: "Ончейн-игры ограничены, потому что они не могут хранить скрытую информацию. После прочтения этого руководства читатель сможет комбинировать доказательства с 0-знанием и серверные компоненты для создания верифицируемых игр с секретным офчейн-компонентом состояния. Техника для этого будет продемонстрирована на примере создания игры «Сапер»."
author: Ori Pomerantz
tags:
  [
    "сервер",
    "офчейн",
    "централизованный",
    "с нулевым разглашением",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: ru
published: 2025-03-15
---

_В блокчейне не существует секретов_. Все, что публикуется в блокчейне, открыто для чтения каждому. Это необходимо, потому что блокчейн основан на том, что любой может его проверить. Однако игры часто полагаются на секретное состояние. Например, игра [«Сапер»](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) не имеет абсолютно никакого смысла, если можно просто зайти в обозреватель блокчейна и посмотреть карту.

Самое простое решение — использовать [серверный компонент](/developers/tutorials/server-components/) для хранения секретного состояния. Однако мы используем блокчейн для предотвращения мошенничества со стороны разработчика игры. Нам нужно обеспечить честность серверного компонента. Сервер может предоставить Хэш состояния и использовать [доказательства с 0-знанием](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important), чтобы доказать, что состояние, использованное для вычисления результата хода, является правильным.

Прочитав эту статью, вы узнаете, как создать такой сервер для хранения секретного состояния, клиент для его отображения и ончейн-компонент для связи между ними. Основные инструменты, которые мы будем использовать:

| Инструмент                                    | Цель                                        |                     Проверено на версии |
| --------------------------------------------- | ------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Доказательства с 0-знанием и их верификация |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Язык программирования для сервера и клиента |   5.4.2 |
| [Node](https://nodejs.org/en)                 | Запуск сервера                              | 20.18.2 |
| [Viem](https://viem.sh/)                      | Связь с блокчейном                          |  2.9.20 |
| [MUD](https://mud.dev/)                       | Управление ончейн-данными                   |  2.0.12 |
| [React](https://react.dev/)                   | Клиентский пользовательский интерфейс       |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Обслуживание кода клиента                   |   4.2.1 |

## Пример игры «Сапер» {#minesweeper}

[«Сапер»](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) — это игра, в которой есть секретная карта с минным полем. Игрок выбирает место для раскопок. Если в этом месте есть мина, игра окончена. В противном случае игрок получает информацию о количестве мин в восьми квадратах, окружающих это место.

Это приложение написано с использованием [MUD](https://mud.dev/), фреймворка, который позволяет нам хранить данные ончейн с помощью [базы данных «ключ-значение»](https://aws.amazon.com/nosql/key-value/) и автоматически синхронизировать эти данные с офчейн-компонентами. Помимо синхронизации, MUD упрощает контроль доступа и позволяет другим пользователям [расширять](https://mud.dev/guides/extending-a-world) наше приложение без разрешений.

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

   Если Foundry был установлен как часть `pnpm install`, вам необходимо перезапустить командную оболочку.

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

   Обратите внимание, что запуск занимает много времени. Чтобы увидеть прогресс, сначала используйте стрелку вниз, чтобы прокрутить до вкладки _contracts_ и увидеть развертывание контрактов MUD. Когда вы получите сообщение _Waiting for file changes…_, контракты будут развернуты, а дальнейший прогресс будет отображаться на вкладке _server_. Там дождитесь сообщения _Verifier address: 0x...._.

   Если этот шаг будет успешным, вы увидите экран `mprocs` с различными процессами слева и выводом консоли для текущего выбранного процесса справа.

   ![Экран mprocs](./mprocs.png)

   Если возникла проблема с `mprocs`, вы можете запустить четыре процесса вручную, каждый в своем окне командной строки:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Контракты**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Сервер**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **Клиент**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. Теперь вы можете перейти к [клиенту](http://localhost:3000), нажать **Новая игра** и начать играть.

### Таблицы {#tables}

Нам нужно [несколько таблиц](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) ончейн.

- `Configuration`: эта таблица является синглтоном, у нее нет ключа и одна запись. Она используется для хранения информации о конфигурации игры:
  - `height`: высота минного поля
  - `width`: ширина минного поля
  - `numberOfBombs`: количество бомб на каждом минном поле

- `VerifierAddress`: эта таблица также является синглтоном. Она используется для хранения одной части конфигурации — адреса контракта верификатора (`verifier`). Мы могли бы поместить эту информацию в таблицу `Configuration`, но она устанавливается другим компонентом, сервером, поэтому ее проще поместить в отдельную таблицу.

- `PlayerGame`: ключ — это адрес игрока. Данные:

  - `gameId`: 32-байтовое значение, которое является Хэшем карты, на которой играет игрок (идентификатор игры).
  - `win`: логическое значение, указывающее, выиграл ли игрок игру.
  - `lose`: логическое значение, указывающее, проиграл ли игрок игру.
  - `digNumber`: количество успешных раскопок в игре.

- `GamePlayer`: эта таблица содержит обратное сопоставление, от `gameId` к адресу игрока.

- `Map`: ключ представляет собой кортеж из трех значений:

  - `gameId`: 32-байтовое значение, которое является Хэшем карты, на которой играет игрок (идентификатор игры).
  - координата `x`
  - координата `y`

  Значение — это одно число. Это 255, если обнаружена бомба. В противном случае это количество бомб вокруг этого места плюс один. Мы не можем просто использовать количество бомб, потому что по умолчанию все хранилища в EVM и все значения строк в MUD равны нулю. Нам нужно различать "игрок здесь еще не копал" и "игрок здесь копал и обнаружил, что вокруг нет бомб".

Кроме того, связь между клиентом и сервером происходит через ончейн-компонент. Это также реализовано с использованием таблиц.

- `PendingGame`: необслуженные запросы на начало новой игры.
- `PendingDig`: необслуженные запросы на раскопки в определенном месте в определенной игре. Это [офчейн-таблица](https://mud.dev/store/tables#types-of-tables), что означает, что она не записывается в хранилище EVM, а доступна для чтения только офчейн с помощью событий.

### Выполнение и потоки данных {#execution-data-flows}

Эти потоки координируют выполнение между клиентом, ончейн-компонентом и сервером.

#### Инициализация {#initialization-flow}

При запуске `mprocs` происходят следующие шаги:

1. [`mprocs`](https://github.com/pvolok/mprocs) запускает четыре компонента:

   - [Anvil](https://book.getfoundry.sh/anvil/), который запускает локальный блокчейн
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), который компилирует (при необходимости) и развертывает контракты для MUD
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), который запускает [Vite](https://vitejs.dev/) для обслуживания пользовательского интерфейса и клиентского кода в веб-браузерах.
   - [Сервер](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), который выполняет действия сервера

2. Пакет `contracts` развертывает контракты MUD, а затем запускает [скрипт `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Этот скрипт устанавливает конфигурацию. Код с GitHub задает [минное поле размером 10x5 с восемью минами](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Сервер](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) начинает с [настройки MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Среди прочего, это активирует синхронизацию данных, так что копия соответствующих таблиц существует в памяти сервера.

4. Сервер подписывает функцию на выполнение [при изменении таблицы `Configuration`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Эта функция](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) вызывается после того, как `PostDeploy.s.sol` выполнится и изменит таблицу.

5. Когда функция инициализации сервера получает конфигурацию, [она вызывает `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) для инициализации [части сервера, отвечающей за 0-знание](#using-zokrates-from-typescript). Это не может произойти до получения конфигурации, потому что функции 0-знания должны иметь ширину и высоту минного поля в качестве констант.

6. После инициализации части сервера, отвечающей за 0-знание, следующим шагом является [развертывание контракта верификации 0-знания в блокчейне](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) и установка адреса верификатора в MUD.

7. Наконец, мы подписываемся на обновления, чтобы видеть, когда игрок запрашивает либо [начало новой игры](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71), либо [раскопки в существующей игре](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Новая игра {#new-game-flow}

Вот что происходит, когда игрок запрашивает новую игру.

1. Если для этого игрока нет игры в процессе или она есть, но с gameId равным нулю, клиент отображает [кнопку «Новая игра»](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Когда пользователь нажимает эту кнопку, [React запускает функцию `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) — это системный вызов `System`. В MUD все вызовы маршрутизируются через контракт `World`, и в большинстве случаев вы вызываете `<namespace>__<function name>`. В этом случае вызов идет к `app__newGame`, который MUD затем маршрутизирует к [`newGame` в `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Ончейн-функция проверяет, что у игрока нет игры в процессе, и если нет, [добавляет запрос в таблицу `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Сервер обнаруживает изменение в `PendingGame` и [запускает подписанную функцию](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Эта функция вызывает [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), которая, в свою очередь, вызывает [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Первое, что делает `createGame`, — [создает случайную карту с соответствующим количеством мин](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Затем она вызывает [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166), чтобы создать карту с пустыми границами, что необходимо для Zokrates. Наконец, `createGame` вызывает [`calculateMapHash`](#calculateMapHash), чтобы получить Хэш карты, который используется в качестве ID игры.

6. Функция `newGame` добавляет новую игру в `gamesInProgress`.

7. Последнее, что делает сервер, — вызывает [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) ончейн. Эта функция находится в другой `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), чтобы обеспечить контроль доступа. Контроль доступа определен в [файле конфигурации MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Список доступа разрешает вызывать `System` только одному адресу. Это ограничивает доступ к функциям сервера одним адресом, поэтому никто не может выдать себя за сервер.

8. Ончейн-компонент обновляет соответствующие таблицы:

   - Создайте игру в `PlayerGame`.
   - Установите обратное сопоставление в `GamePlayer`.
   - Удалите запрос из `PendingGame`.

9. Сервер определяет изменение в `PendingGame`, но ничего не делает, потому что [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) равно false.

10. На клиенте [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) устанавливается на запись `PlayerGame` для адреса игрока. При изменении `PlayerGame` меняется и `gameRecord`.

11. Если в `gameRecord` есть значение и игра еще не выиграна или проиграна, клиент [отображает карту](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Раскопки {#dig-flow}

1. Игрок [нажимает на кнопку ячейки карты](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), что вызывает [функцию `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Эта функция вызывает [`dig` ончейн](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Ончейн-компонент [выполняет ряд проверок на вменяемость](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30) и в случае успеха добавляет запрос на раскопки в [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Сервер [обнаруживает изменение в `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Если он действителен](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), он [вызывает код 0-знания](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (объясняется ниже) для генерации как результата, так и доказательства его действительности.

4. [Сервер](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) вызывает [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) ончейн.

5. `digResponse` делает две вещи. Во-первых, он проверяет [доказательство с 0-знанием](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Затем, если доказательство проходит проверку, он вызывает [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) для фактической обработки результата.

6. `processDigResult` проверяет, была ли игра [проиграна](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) или [выиграна](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), и [обновляет `Map`, ончейн-карту](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Клиент автоматически подхватывает обновления и [обновляет карту, отображаемую игроку](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), и, если применимо, сообщает игроку, выиграл он или проиграл.

## Использование Zokrates {#using-zokrates}

В потоках, объясненных выше, мы пропустили части, связанные с 0-знанием, рассматривая их как черный ящик. Теперь давайте вскроем его и посмотрим, как написан этот код.

### Хэширование карты {#hashing-map}

Мы можем использовать [этот код JavaScript](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) для реализации [Poseidon](https://www.poseidon-hash.info), функции Хэширования Zokrates, которую мы используем. Однако, хотя это было бы быстрее, это было бы и сложнее, чем просто использовать для этого функцию Хэширования Zokrates. Это руководство, и поэтому код оптимизирован для простоты, а не для производительности. Поэтому нам нужны две разные программы Zokrates: одна для вычисления Хэша карты (`hash`) и одна для создания доказательства с 0-знанием результата раскопок в определенном месте на карте (`dig`).

### Функция Хэширования {#hash-function}

Это функция, которая вычисляет Хэш карты. Мы разберем этот код построчно.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Эти две строки импортируют две функции из [стандартной библиотеки Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [Первая функция](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) — это [Хэш Poseidon](https://www.poseidon-hash.info/). Она принимает массив [элементов `field`](https://zokrates.github.io/language/types.html#field) и возвращает `field`.

Элемент поля в Zokrates обычно имеет длину менее 256 бит, но не намного. Чтобы упростить код, мы ограничиваем карту размером до 512 бит и Хэшируем массив из четырех полей, и в каждом поле мы используем только 128 бит. [Функция `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) для этой цели преобразует массив из 128 бит в `field`.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Эта строка начинает определение функции. `hashMap` получает один параметр под названием `map`, двумерный `bool`(ean) массив. Размер карты равен `width+2` на `height+2` по причинам, которые [объясняются ниже](#why-map-border).

Мы можем использовать `${width+2}` и `${height+2}`, потому что программы Zokrates хранятся в этом приложении как [шаблонные строки](https://www.w3schools.com/js/js_string_templates.asp). Код между `${` и `}` вычисляется JavaScript, и таким образом программа может использоваться для разных размеров карт. Параметр map имеет рамку шириной в одно местоположение вокруг него без каких-либо бомб, что и является причиной, по которой нам нужно добавить два к ширине и высоте.

Возвращаемое значение — это `field`, содержащий Хэш.

```
   bool[512] mut map1d = [false; 512];
```

Карта двумерна. Однако функция `pack128` не работает с двумерными массивами. Поэтому мы сначала выравниваем карту в 512-байтовый массив, используя `map1d`. По умолчанию переменные Zokrates являются константами, но нам нужно присваивать значения этому массиву в цикле, поэтому мы определяем его как [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Нам нужно инициализировать массив, потому что в Zokrates нет `undefined`. Выражение `[false; 512]` означает [массив из 512 значений `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

Нам также нужен счетчик, чтобы различать биты, которые мы уже заполнили в `map1d`, и те, которые еще не заполнили.

```
   for u32 x in 0..${width+2} {
```

Так объявляется [цикл `for`](https://zokrates.github.io/language/control_flow.html#for-loops) в Zokrates. Цикл `for` в Zokrates должен иметь фиксированные границы, потому что, хотя он и выглядит как цикл, компилятор на самом деле «разворачивает» его. Выражение `${width+2}` является константой времени компиляции, потому что `width` устанавливается кодом TypeScript до вызова компилятора.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Для каждого местоположения на карте поместите это значение в массив `map1d` и увеличьте счетчик.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` для создания массива из четырех значений `field` из `map1d`. В Zokrates `array[a..b]` означает срез массива, который начинается с `a` и заканчивается на `b-1`.

```
    return poseidon(hashMe);
}
```

Используйте `poseidon`, чтобы преобразовать этот массив в Хэш.

### Программа Хэширования {#hash-program}

Серверу необходимо вызывать `hashMap` напрямую для создания идентификаторов игр. Однако Zokrates может вызывать только функцию `main` в программе для запуска, поэтому мы создаем программу с `main`, которая вызывает функцию Хэширования.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Программа раскопок {#dig-program}

Это сердце части приложения, отвечающей за 0-знание, где мы производим доказательства, используемые для проверки результатов раскопок.

```
${hashFragment}

// Количество мин в местоположении (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Почему граница карты {#why-map-border}

Доказательства с 0-знанием используют [арифметические схемы](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), у которых нет простого эквивалента оператора `if`. Вместо этого они используют эквивалент [условного оператора](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Если `a` может быть либо нулем, либо единицей, вы можете вычислить `if a { b } else { c }` как `ab+(1-a)c`.

Из-за этого оператор `if` в Zokrates всегда вычисляет обе ветви. Например, если у вас есть этот код:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Он выдаст ошибку, потому что ему нужно вычислить `arr[10]`, даже если это значение позже будет умножено на ноль.

Именно поэтому нам нужна рамка шириной в одно местоположение вокруг карты. Нам нужно вычислить общее количество мин вокруг местоположения, а это значит, что нам нужно видеть местоположения на одну строку выше и ниже, слева и справа от того места, где мы копаем. Это означает, что эти местоположения должны существовать в массиве карты, который предоставляется Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

По умолчанию доказательства Zokrates включают свои входные данные. Бесполезно знать, что вокруг точки пять мин, если вы на самом деле не знаете, какая это точка (и вы не можете просто сопоставить ее с вашим запросом, потому что тогда доказывающий мог бы использовать другие значения и не сообщать вам об этом). Однако нам нужно сохранить карту в секрете, предоставляя ее Zokrates. Решение — использовать `private` параметр, который _не_ раскрывается доказательством.

Это открывает еще одну возможность для злоупотреблений. Доказывающий мог бы использовать правильные координаты, но создать карту с любым количеством мин вокруг местоположения и, возможно, в самом местоположении. Чтобы предотвратить это злоупотребление, мы делаем так, чтобы доказательство с 0-знанием включало Хэш карты, который является идентификатором игры.

```
   return (hashMap(map),
```

Возвращаемое значение здесь — это кортеж, который включает в себя массив Хэшей карты, а также результат раскопок.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Мы используем 255 как специальное значение в случае, если в самом местоположении есть бомба.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Если игрок не наткнулся на мину, сложите количество мин для области вокруг местоположения и верните это значение.

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

Инициализируйте Zokrates, получите все необходимое из библиотеки.

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

Далее у нас есть функция Хэширования и две программы Zokrates, которые мы видели выше.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Здесь мы компилируем эти программы.

```typescript
// Создайте ключи для верификации 0-знания.
// В производственной системе вы бы захотели использовать церемонию установки.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

В производственной системе мы могли бы использовать более сложную [церемонию установки](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony), но для демонстрации этого достаточно. Нет проблем в том, что пользователи могут знать ключ доказывающего — они все равно не смогут использовать его для доказательства чего-либо, если это неправда. Поскольку мы указываем энтропию (второй параметр, `""`), результаты всегда будут одинаковыми.

**Примечание:** компиляция программ Zokrates и создание ключей — это медленные процессы. Нет необходимости повторять их каждый раз, только при изменении размера карты. В производственной системе вы бы сделали это один раз, а затем сохранили бы результат. Единственная причина, по которой я не делаю этого здесь, — это простота.

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

Функция [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) фактически запускает программу Zokrates. Она возвращает структуру с двумя полями: `output`, который является выводом программы в виде строки JSON, и `witness`, который является информацией, необходимой для создания доказательства с 0-знанием результата. Здесь нам нужен только вывод.

Вывод представляет собой строку вида `"31337"` — десятичное число, заключенное в кавычки. Но вывод, который нам нужен для `viem`, — это шестнадцатеричное число вида `0x60A7`. Поэтому мы используем `.slice(1,-1)` для удаления кавычек, а затем `BigInt` для преобразования оставшейся строки, которая является десятичным числом, в [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` преобразует этот `BigInt` в шестнадцатеричную строку, а `"0x"+` добавляет маркер для шестнадцатеричных чисел.

```typescript
// Выкопать и вернуть доказательство с 0-знанием результата
// (код на стороне сервера)
```

Доказательство с 0-знанием включает в себя публичные входные данные (`x` и `y`) и результаты (Хэш карты и количество бомб).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Проверять, выходит ли индекс за границы, в Zokrates проблематично, поэтому мы делаем это здесь.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Выполните программу раскопок.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Используйте [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) и верните доказательство.

```typescript
const solidityVerifier = `
        // Размер карты: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Верификатор Solidity, умный контракт, который мы можем развернуть в блокчейне и использовать для проверки доказательств, сгенерированных `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Наконец, верните все, что может понадобиться другому коду.

## Тесты безопасности {#security-tests}

Тесты безопасности важны, потому что ошибка функциональности в конечном итоге проявит себя. Но если приложение небезопасно, это, скорее всего, будет долгое время скрыто, прежде чем его обнаружит кто-то, кто обманет и завладеет ресурсами, принадлежащими другим.

### Разрешения {#permissions}

В этой игре есть одна привилегированная сущность — сервер. Это единственный пользователь, которому разрешено вызывать функции в [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Мы можем использовать [`cast`](https://book.getfoundry.sh/cast/) для проверки того, что вызовы функций с правами доступа разрешены только с аккаунта сервера.

[Приватный ключ сервера находится в `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. На компьютере, на котором запущен `anvil` (блокчейн), установите эти переменные окружения.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Используйте `cast`, чтобы попытаться установить адрес верификатора как неавторизованный адрес.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Мало того, что `cast` сообщает о сбое, вы также можете открыть **MUD Dev Tools** в игре в браузере, нажать **Tables** и выбрать **app\_\_VerifierAddress**. Убедитесь, что адрес не равен нулю.

3. Установите адрес верификатора как адрес сервера.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Адрес в **app\_\_VerifiedAddress** теперь должен быть равен нулю.

Все функции MUD в одной `System` проходят через один и тот же контроль доступа, поэтому я считаю этот тест достаточным. Если вы так не считаете, вы можете проверить другие функции в [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Злоупотребления с 0-знанием {#zero-knowledge-abuses}

Математика для проверки Zokrates выходит за рамки этого руководства (и моих способностей). Однако мы можем провести различные проверки кода с 0-знанием, чтобы убедиться, что если он выполнен неправильно, он терпит неудачу. Все эти тесты потребуют от нас изменения [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) и перезапуска всего приложения. Недостаточно перезапустить процесс сервера, потому что это переводит приложение в невозможное состояние (у игрока есть игра в процессе, но игра больше не доступна серверу).

#### Неправильный ответ {#wrong-answer}

Самая простая возможность — предоставить неверный ответ в доказательстве с 0-знанием. Для этого мы заходим в `zkDig` и [изменяем строку 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Это означает, что мы всегда будем утверждать, что есть одна бомба, независимо от правильного ответа. Попробуйте поиграть с этой версией, и вы увидите на вкладке **server** экрана `pnpm dev` эту ошибку:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Так что этот вид мошенничества не работает.

#### Неверное доказательство {#wrong-proof}

Что произойдет, если мы предоставим правильную информацию, но просто с неверными данными доказательства? Теперь замените строку 91 на:

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

Это все равно не работает, но теперь ошибка происходит без причины, потому что это случается во время вызова верификатора.

### Как пользователь может проверить код нулевого доверия? {#user-verify-zero-trust}

Умные контракты относительно легко проверить. Как правило, разработчик публикует исходный код в обозревателе блокчейна, и обозреватель блокчейна проверяет, что исходный код компилируется в код в [транзакции развертывания контракта](/developers/docs/smart-contracts/deploying/). В случае с `System` от MUD это [немного сложнее](https://mud.dev/cli/verify), но ненамного.

С 0-знанием это сложнее. Верификатор включает в себя некоторые константы и выполняет с ними некоторые вычисления. Это не говорит вам, что доказывается.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Решение, по крайней мере до тех пор, пока обозреватели блокчейна не добавят верификацию Zokrates в свои пользовательские интерфейсы, заключается в том, чтобы разработчики приложений делали доступными программы Zokrates, а по крайней мере некоторые пользователи компилировали их самостоятельно с соответствующим ключом верификации.

Чтобы сделать это:

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


    // Количество мин в местоположении (x,y)
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

3. Скомпилируйте код Zokrates и создайте ключ верификации. Ключ верификации должен быть создан с той же энтропией, что и в исходном сервере, [в данном случае — пустой строкой](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

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

В любом достаточно сложном приложении существуют конкурирующие цели проектирования, требующие компромиссов. Давайте рассмотрим некоторые из компромиссов и почему текущее решение предпочтительнее других вариантов.

### Зачем 0-знание {#why-zero-knowledge}

Для «Сапера» вам на самом деле не нужно 0-знание. Сервер всегда может хранить карту, а затем просто раскрыть ее полностью, когда игра закончится. Затем, в конце игры, умный контракт может вычислить Хэш карты, проверить, что он совпадает, и, если нет, наказать сервер или полностью проигнорировать игру.

Я не использовал это более простое решение, потому что оно работает только для коротких игр с четко определенным конечным состоянием. Когда игра потенциально бесконечна (как в случае с [автономными мирами](https://0xparc.org/blog/autonomous-worlds)), вам нужно решение, которое доказывает состояние _без_ его раскрытия.

В качестве руководства эта статья требовала короткой и понятной игры, но эта техника наиболее полезна для более длинных игр.

### Почему Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) — не единственная доступная библиотека 0-знания, но она похожа на обычный [императивный](https://en.wikipedia.org/wiki/Imperative_programming) язык программирования и поддерживает булевы переменные.

Для вашего приложения с другими требованиями вы можете предпочесть использовать [Circum](https://docs.circom.io/getting-started/installation/) или [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Когда компилировать Zokrates {#when-compile-zokrates}

В этой программе мы компилируем программы Zokrates [каждый раз при запуске сервера](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Это явная трата ресурсов, но это руководство, оптимизированное для простоты.

Если бы я писал приложение производственного уровня, я бы проверял, есть ли у меня файл со скомпилированными программами Zokrates для этого размера минного поля, и если да, использовал бы его. То же самое касается развертывания контракта-верификатора ончейн.

### Создание верификатора и ключей доказывающего {#key-creation}

[Создание ключей](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) — это еще одно чистое вычисление, которое не нужно выполнять более одного раза для данного размера минного поля. Опять же, это делается только один раз ради простоты.

Кроме того, мы могли бы использовать [церемонию установки](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Преимущество церемонии установки заключается в том, что для обмана доказательства с 0-знанием вам нужна либо энтропия, либо какой-то промежуточный результат от каждого участника. Если хотя бы один участник церемонии честен и удаляет эту информацию, доказательства с 0-знанием защищены от определенных атак. Однако _нет механизма_ для проверки того, что информация была удалена отовсюду. Если доказательства с 0-знанием критически важны, вы захотите участвовать в церемонии установки.

Здесь мы полагаемся на [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), в которой участвовали десятки участников. Вероятно, это достаточно безопасно и гораздо проще. Мы также не добавляем энтропию во время создания ключей, что облегчает пользователям [проверку конфигурации 0-знания](#user-verify-zero-trust).

### Где проверять {#where-verification}

Мы можем проверять доказательства с 0-знанием либо ончейн (что стоит газа), либо в клиенте (используя [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Я выбрал первое, потому что это позволяет вам [проверить верификатор](#user-verify-zero-trust) один раз, а затем доверять тому, что он не изменится, пока адрес его контракта остается прежним. Если бы верификация проводилась на клиенте, вам пришлось бы проверять получаемый код каждый раз при загрузке клиента.

Кроме того, хотя эта игра одиночная, многие блокчейн-игры многопользовательские. ончейн-верификация означает, что вы проверяете доказательство с 0-знанием только один раз. Выполнение этого в клиенте потребовало бы, чтобы каждый клиент проверял его независимо.

### Выравнивать карту в TypeScript или Zokrates? {#where-flatten}

В целом, когда обработка может быть выполнена либо в TypeScript, либо в Zokrates, лучше делать это в TypeScript, который намного быстрее и не требует доказательств с 0-знанием. Это причина, например, по которой мы не предоставляем Zokrates Хэш и не заставляем его проверять, что он правильный. Хэширование должно выполняться внутри Zokrates, но сопоставление возвращенного Хэша с Хэшем ончейн может происходить вне его.

Однако мы все же [выравниваем карту в Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), тогда как могли бы сделать это в TypeScript. Причина в том, что другие варианты, на мой взгляд, хуже.

- Предоставить одномерный массив логических значений коду Zokrates и использовать выражение типа `x*(height+2)
  +y` для получения двумерной карты. Это сделало бы [код](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) несколько сложнее, поэтому я решил, что прирост производительности не стоит того для руководства.

- Отправить Zokrates и одномерный, и двумерный массив. Однако это решение нам ничего не дает. Код Zokrates должен был бы проверить, что предоставленный ему одномерный массив действительно является правильным представлением двумерного массива. Так что прироста производительности не было бы.

- Выровняйте двумерный массив в Zokrates. Это самый простой вариант, поэтому я выбрал его.

### Где хранить карты {#where-store-maps}

В этом приложении [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) — это просто переменная в памяти. Это означает, что если ваш сервер выйдет из строя и его потребуется перезапустить, вся хранящаяся в нем информация будет утеряна. Игроки не только не смогут продолжить свою игру, они даже не смогут начать новую, потому что ончейн-компонент думает, что у них все еще идет игра.

Это явно плохой дизайн для производственной системы, в которой вы бы хранили эту информацию в базе данных. Единственная причина, по которой я использовал здесь переменную, заключается в том, что это руководство, и простота является основным соображением.

## Заключение: При каких условиях эта техника является подходящей? {#conclusion}

Итак, теперь вы знаете, как написать игру с сервером, который хранит секретное состояние, не предназначенное для ончейна. Но в каких случаях вам следует это делать? Есть два основных соображения.

- _Долгоиграющая игра_: [Как упоминалось выше](#why-zero-knowledge), в короткой игре можно просто опубликовать состояние после ее окончания и все проверить тогда. Но это не вариант, когда игра длится долгое или неопределенное время, и состояние должно оставаться секретным.

- _Некоторая централизация приемлема_: доказательства с 0-знанием могут проверить целостность, то есть что сущность не подделывает результаты. Что они не могут сделать, так это гарантировать, что сущность все еще будет доступна и будет отвечать на сообщения. В ситуациях, когда доступность также должна быть децентрализована, доказательства с 0-знанием не являются достаточным решением, и вам нужны [многосторонние вычисления](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Больше моих работ смотрите здесь](https://cryptodocguy.pro/).

### Благодарности {#acknowledgements}

- Альваро Алонсо прочитал черновик этой статьи и прояснил некоторые из моих недопониманий о Zokrates.

Ответственность за любые оставшиеся ошибки лежит на мне.
