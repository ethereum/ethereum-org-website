---
title: "Напишите специфичное для приложения plasma, которое сохраняет конфиденциальность"
description: "В этом руководстве мы создадим полусекретный банк для депозитов. Банк — это централизованный компонент; он знает баланс каждого пользователя. Однако эта информация не хранится ончейн. Вместо этого банк публикует хэш состояния. Каждый раз, когда происходит транзакция, банк публикует новый хэш вместе с доказательством с нулевым разглашением того, что у него есть подписанная транзакция, которая изменяет состояние хэша на новое. Прочитав это руководство, вы поймете не только, как использовать доказательства с нулевым разглашением, но и зачем их использовать и как делать это безопасно."
author: "Ори Померанц"
tags:
  [
    "с нулевым разглашением",
    "сервер",
    "офчейн",
    "конфиденциальность"
  ]
skill: advanced
lang: ru
published: 2025-10-15
---

## Введение {#introduction}

В отличие от [роллапов](/developers/docs/scaling/zk-rollups/), [плазмы](/developers/docs/scaling/plasma) используют основную сеть Ethereum для целостности, но не для доступности. В этой статье мы напишем приложение, которое ведет себя как плазма, где Ethereum гарантирует целостность (отсутствие несанкционированных изменений), но не доступность (централизованный компонент может выйти из строя и отключить всю систему).

Приложение, которое мы здесь пишем, — это банк, сохраняющий конфиденциальность. Разные адреса имеют аккаунты с балансами, и они могут отправлять деньги (ETH) на другие аккаунты. Банк публикует хэши состояния (аккаунты и их балансы) и транзакции, но хранит фактические балансы оффчейн, где они могут оставаться приватными.

## Проектирование {#design}

Это не готовая к эксплуатации система, а учебный инструмент. Поэтому она написана с несколькими упрощающими допущениями.

- Фиксированный пул аккаунтов. Существует определенное количество аккаунтов, и каждый аккаунт принадлежит предопределенному адресу. Это значительно упрощает систему, поскольку в доказательствах с нулевым разглашением сложно обрабатывать структуры данных переменного размера. Для системы, готовой к производству, мы можем использовать [корень Меркла](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) в качестве хэша состояния и предоставлять доказательства Меркла для требуемых балансов.

- Хранение в памяти. В производственной системе нам необходимо записывать все балансы аккаунтов на диск, чтобы сохранить их в случае перезапуска. Здесь же допустимо, если информация просто будет утеряна.

- Только переводы. Производственная система потребовала бы способа вносить активы в банк и выводить их. Но здесь цель — просто проиллюстрировать концепцию, поэтому этот банк ограничен переводами.

### Доказательства с нулевым разглашением {#zero-knowledge-proofs}

На фундаментальном уровне доказательство с нулевым разглашением показывает, что доказывающий знает некоторые данные, _Data<sub>private</sub>_, такие, что существует связь _Relationship_ между некоторыми публичными данными, _Data<sub>public</sub>_, и _Data<sub>private</sub>_. Верификатор знает _Relationship_ и _Data<sub>public</sub>_.

Чтобы сохранить конфиденциальность, нам необходимо, чтобы состояния и транзакции были приватными. Но для обеспечения целостности нам необходимо, чтобы [криптографический хэш](https://en.wikipedia.org/wiki/Cryptographic_hash_function) состояний был публичным. Чтобы доказать людям, которые отправляют транзакции, что эти транзакции действительно произошли, нам также нужно публиковать хэши транзакций.

В большинстве случаев _Data<sub>private</sub>_ — это входные данные для программы доказательства с нулевым разглашением, а _Data<sub>public</sub>_ — выходные.

Эти поля в _Data<sub>private</sub>_:

- _State<sub>n</sub>_, старое состояние
- _State<sub>n+1</sub>_, новое состояние
- _Транзакция_, транзакция, которая изменяет старое состояние на новое. Эта транзакция должна включать следующие поля:
  - _Адрес назначения_, который получает перевод
  - _Сумма_ перевода
  - _Nonce_ для гарантии того, что каждая транзакция может быть обработана только один раз.
    Адрес источника не обязательно должен быть в транзакции, поскольку его можно восстановить из подписи.
- _Подпись_, подпись, которая авторизована для выполнения транзакции. В нашем случае единственный адрес, авторизованный для выполнения транзакции, — это адрес источника. Поскольку наша система с нулевым разглашением работает именно так, нам также нужен публичный ключ аккаунта в дополнение к подписи Ethereum.

Это поля в _Data<sub>public</sub>_:

- _Hash(State<sub>n</sub>)_ — хэш старого состояния
- _Hash(State<sub>n+1</sub>)_ — хэш нового состояния
- _Hash(Transaction)_ — хэш транзакции, которая изменяет состояние со _State<sub>n</sub>_ на _State<sub>n+1</sub>_.

Связь проверяет несколько условий:

- Публичные хэши действительно являются правильными хэшами для приватных полей.
- Транзакция при применении к старому состоянию приводит к новому состоянию.
- Подпись исходит от адреса источника транзакции.

Благодаря свойствам криптографических хэш-функций, доказательство этих условий достаточно для обеспечения целостности.

### Структуры данных {#data-structures}

Основная структура данных — это состояние, хранимое сервером. Для каждого аккаунта сервер отслеживает баланс аккаунта и [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), используемый для предотвращения [атак повторного воспроизведения](https://en.wikipedia.org/wiki/Replay_attack).

### Компоненты {#components}

Эта система требует двух компонентов:

- _Сервер_, который получает транзакции, обрабатывает их и публикует хэши в блокчейн вместе с доказательствами с нулевым разглашением.
- _Смарт-контракт_, который хранит хэши и проверяет доказательства с нулевым разглашением, чтобы убедиться в легитимности переходов состояний.

### Потоки данных и управления {#flows}

Это способы, которыми различные компоненты взаимодействуют для перевода с одного аккаунта на другой.

1. Веб-браузер отправляет подписанную транзакцию, запрашивая перевод со счета подписывающего на другой счет.

2. Сервер проверяет, что транзакция действительна:

   - У подписывающего есть счет в банке с достаточным балансом.
   - У получателя есть счет в банке.

3. Сервер вычисляет новое состояние, вычитая переведенную сумму из баланса подписывающего и добавляя ее к балансу получателя.

4. Сервер вычисляет доказательство с нулевым разглашением того, что изменение состояния является действительным.

5. Сервер отправляет в Ethereum транзакцию, которая включает:

   - Хэш нового состояния
   - Хэш транзакции (чтобы отправитель транзакции мог знать, что она обработана)
   - Доказательство с нулевым разглашением, которое доказывает, что переход к новому состоянию действителен

6. Смарт-контракт проверяет доказательство с нулевым разглашением.

7. Если доказательство с нулевым разглашением проходит проверку, смарт-контракт выполняет следующие действия:
   - Обновляет текущий хэш состояния на новый хэш состояния
   - Генерирует запись в журнале с новым хэшем состояния и хэшем транзакции

### Инструменты {#tools}

Для клиентского кода мы будем использовать [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) и [Wagmi](https://wagmi.sh/). Это стандартные отраслевые инструменты; если вы с ними не знакомы, можете воспользоваться [этим руководством](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Большая часть сервера написана на JavaScript с использованием [Node](https://nodejs.org/en). Часть с нулевым разглашением написана на [Noir](https://noir-lang.org/). Нам нужна версия `1.0.0-beta.10`, поэтому после того, как вы [установите Noir согласно инструкции](https://noir-lang.org/docs/getting_started/quick_start), выполните:

```
noirup -v 1.0.0-beta.10
```

Блокчейн, который мы используем, — это `anvil`, локальный тестовый блокчейн, который является частью [Foundry](https://getfoundry.sh/introduction/installation).

## Реализация {#implementation}

Поскольку это сложная система, мы будем реализовывать ее поэтапно.

### Этап 1 — Ручное нулевое разглашение {#stage-1}

На первом этапе мы подпишем транзакцию в браузере, а затем вручную предоставим информацию для доказательства с нулевым разглашением. Код с нулевым разглашением ожидает получить эту информацию в `server/noir/Prover.toml` (документация [здесь](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Чтобы увидеть это в действии:

1. Убедитесь, что у вас установлены [Node](https://nodejs.org/en/download) и [Noir](https://noir-lang.org/install). Желательно установить их в UNIX-системе, такой как macOS, Linux или [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Загрузите код этапа 1 и запустите веб-сервер для обслуживания клиентского кода.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Причина, по которой здесь нужен веб-сервер, заключается в том, что для предотвращения некоторых видов мошенничества многие кошельки (например, MetaMask) не принимают файлы, обслуживаемые непосредственно с диска.

3. Откройте браузер с кошельком.

4. В кошельке введите новую кодовую фразу. Обратите внимание, что это удалит вашу существующую кодовую фразу, поэтому _убедитесь, что у вас есть резервная копия_.

   Кодовая фраза — `test test test test test test test test test test test junk`, стандартная тестовая кодовая фраза для anvil.

5. Перейдите к [клиентскому коду](http://localhost:5173/).

6. Подключитесь к кошельку и выберите аккаунт назначения и сумму.

7. Нажмите **Sign** (Подписать) и подпишите транзакцию.

8. Под заголовком **Prover.toml** вы найдете текст. Замените `server/noir/Prover.toml` этим текстом.

9. Выполните доказательство с нулевым разглашением.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Вывод должен быть похож на

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Сравните последние два значения с хэшем, который вы видите в веб-браузере, чтобы проверить, правильно ли хэшировано сообщение.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Этот файл](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) показывает формат информации, ожидаемый Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Сообщение представлено в текстовом формате, что облегчает его понимание пользователем (что необходимо при подписи) и разбор кодом Noir. Сумма указана в finney, чтобы, с одной стороны, обеспечить возможность дробных переводов, а с другой — быть легко читаемой. Последнее число — это [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Строка имеет длину 100 символов. Доказательства с нулевым разглашением плохо работают с данными переменного размера, поэтому часто необходимо дополнять данные.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Эти три параметра являются массивами байтов фиксированного размера.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

Это способ задания массива структур. Для каждой записи мы указываем адрес, баланс (в milliETH, т. е. [finney](https://cryptovalleyjournal.com/glossary/finney/)) и следующее значение nonce.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Этот файл](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) реализует обработку на стороне клиента и генерирует файл `server/noir/Prover.toml` (тот, который включает параметры с нулевым разглашением).

Вот объяснение наиболее интересных частей.

```tsx
export default attrs =>  {
```

Эта функция создает компонент `Transfer` React, который могут импортировать другие файлы.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Это адреса аккаунтов, адреса, созданные `test ...` кодовой фразой `test junk`. Если вы хотите использовать свои собственные адреса, просто измените это определение.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Эти [хуки Wagmi](https://wagmi.sh/react/api/hooks) позволяют нам получить доступ к библиотеке [viem](https://viem.sh/) и кошельку.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Это сообщение, дополненное пробелами. Каждый раз, когда изменяется одна из переменных [`useState`](https://react.dev/reference/react/useState), компонент перерисовывается, а `message` обновляется.

```tsx
  const sign = async () => {
```

Эта функция вызывается, когда пользователь нажимает кнопку **Sign** (Подписать). Сообщение обновляется автоматически, но подпись требует подтверждения пользователя в кошельке, и мы не хотим запрашивать его без необходимости.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Попросить кошелек [подписать сообщение](https://viem.sh/docs/accounts/local/signMessage).

```tsx
    const hash = hashMessage(message)
```

Получить хэш сообщения. Полезно предоставить его пользователю для отладки (кода Noir).

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Получить публичный ключ](https://viem.sh/docs/utilities/recoverPublicKey). Это необходимо для функции [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Установить переменные состояния. Это действие перерисовывает компонент (после завершения функции `sign`) и показывает пользователю обновленные значения.

```tsx
    let proverToml = `
```

Текст для `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem предоставляет нам публичный ключ в виде 65-байтовой шестнадцатеричной строки. Первый байт — `0x04`, маркер версии. За ним следуют 32 байта для `x` публичного ключа, а затем 32 байта для `y` публичного ключа.

Однако Noir ожидает получить эту информацию в виде двух массивов байтов, один для `x` и один для `y`. Проще разобрать это здесь, на клиенте, а не в рамках доказательства с нулевым разглашением.

Обратите внимание, что это хорошая практика в области доказательств с нулевым разглашением в целом. Код внутри доказательства с нулевым разглашением является дорогостоящим, поэтому любая обработка, которая может быть выполнена вне доказательства с нулевым разглашением, _должна_ быть выполнена вне доказательства с нулевым разглашением.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Подпись также предоставляется в виде 65-байтовой шестнадцатеричной строки. Однако последний байт необходим только для восстановления публичного ключа. Поскольку публичный ключ уже будет предоставлен коду Noir, он нам не нужен для проверки подписи, и код Noir его не требует.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Предоставьте аккаунты.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Перевод</h2>
```

Это формат HTML (точнее, [JSX](https://react.dev/learn/writing-markup-with-jsx)) компонента.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Этот файл](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) является фактическим кодом с нулевым разглашением.

```
use std::hash::pedersen_hash;
```

[Хэш Педерсена](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) предоставляется стандартной библиотекой [Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Доказательства с нулевым разглашением обычно используют эту хэш-функцию. Ее гораздо проще вычислять внутри [арифметических схем](https://rareskills.io/post/arithmetic-circuit) по сравнению со стандартными хэш-функциями.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Эти две функции являются внешними библиотеками, определенными в [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Они представляют собой именно то, для чего они названы: функция, которая вычисляет [хэш keccak256](https://emn178.github.io/online-tools/keccak_256.html), и функция, которая проверяет подписи Ethereum и восстанавливает адрес Ethereum подписывающего.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir вдохновлен [Rust](https://www.rust-lang.org/). Переменные по умолчанию являются константами. Так мы определяем глобальные константы конфигурации. В частности, `ACCOUNT_NUMBER` — это количество аккаунтов, которые мы храним.

Типы данных с именем `u<number>` — это беззнаковые числа с указанным количеством битов. Единственными поддерживаемыми типами являются `u8`, `u16`, `u32`, `u64` и `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Эта переменная используется для хэша Педерсена аккаунтов, как объяснено ниже.

```
global MESSAGE_LENGTH : u32 = 100;
```

Как объяснялось выше, длина сообщения фиксирована. Она указана здесь.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[Подписи EIP-191](https://eips.ethereum.org/EIPS/eip-191) требуют буфер с 26-байтовым префиксом, за которым следует длина сообщения в ASCII и, наконец, само сообщение.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Информация, которую мы храним об аккаунте. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) — это число, обычно до 253 бит, которое можно использовать непосредственно в [арифметической схеме](https://rareskills.io/post/arithmetic-circuit), реализующей доказательство с нулевым разглашением. Здесь мы используем `Field` для хранения 160-битного адреса Ethereum.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Информация, которую мы храним для транзакции перевода.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Определение функции. Параметром является информация об `аккаунте`. Результатом является массив переменных `Field`, длина которого равна `FLAT_ACCOUNT_FIELDS`.

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Первое значение в массиве — это адрес аккаунта. Второе включает в себя как баланс, так и nonce. Вызовы `.into()` изменяют число на тот тип данных, которым оно должно быть. `account.nonce` — это значение `u32`, но чтобы добавить его к `account.balance << 32`, значению `u128`, оно должно быть `u128`. Это первый `.into()`. Второй преобразует результат `u128` в `Field`, чтобы он поместился в массив.

```
    flat
}
```

В Noir функции могут возвращать значение только в конце (нет раннего возврата). Чтобы указать возвращаемое значение, вы вычисляете его непосредственно перед закрывающей скобкой функции.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Эта функция преобразует массив аккаунтов в массив `Field`, который можно использовать в качестве входных данных для хэша Петерсена.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Так вы указываете изменяемую переменную, то есть _не_ константу. Переменные в Noir всегда должны иметь значение, поэтому мы инициализируем эту переменную всеми нулями.

```
    for i in 0..ACCOUNT_NUMBER {
```

Это цикл `for`. Обратите внимание, что границы являются константами. В Noir границы циклов должны быть известны во время компиляции. Причина в том, что арифметические схемы не поддерживают управление потоком. При обработке цикла `for` компилятор просто помещает код внутри него несколько раз, по одному на каждую итерацию.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Наконец, мы дошли до функции, которая хэширует массив аккаунтов.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Эта функция находит аккаунт с определенным адресом. Эта функция была бы ужасно неэффективной в стандартном коде, потому что она перебирает все аккаунты, даже после того, как нашла адрес.

Однако в доказательствах с нулевым разглашением нет управления потоком. Если нам когда-либо понадобится проверить условие, мы должны проверять его каждый раз.

Аналогичная вещь происходит с операторами `if`. Оператор `if` в приведенном выше цикле преобразуется в эти математические утверждения.

_condition<sub>result</sub> = accounts[i].address == address_ // единица, если они равны, ноль в противном случае

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

Функция [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) вызывает сбой доказательства с нулевым разглашением, если утверждение ложно. В данном случае, если мы не можем найти аккаунт с соответствующим адресом. Чтобы сообщить адрес, мы используем [форматированную строку](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Эта функция применяет транзакцию перевода и возвращает новый массив аккаунтов.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Мы не можем получить доступ к элементам структуры внутри форматированной строки в Noir, поэтому мы создаем пригодную для использования копию.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

Это два условия, которые могут сделать транзакцию недействительной.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Создайте новый массив аккаунтов, а затем верните его.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Эта функция считывает адрес из сообщения.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Адрес всегда имеет длину 20 байт (т. е. 40 шестнадцатеричных цифр) и начинается с символа №7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Считайте сумму и nonce из сообщения.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

В сообщении первое число после адреса — это сумма в finney (т. е. тысячная доля ETH) для перевода. Второе число — это nonce. Любой текст между ними игнорируется.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Возврат [кортежа](https://noir-lang.org/docs/noir/concepts/data_types/tuples) — это способ в Noir вернуть несколько значений из функции.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Эта функция преобразует сообщение в байты, а затем преобразует суммы в `TransferTxn`.

```rust
// The equivalent to Viem's hashMessage
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Мы смогли использовать хэш Педерсена для аккаунтов, потому что они хэшируются только внутри доказательства с нулевым разглашением. Однако в этом коде нам нужно проверить подпись сообщения, которая генерируется браузером. Для этого нам нужно следовать формату подписи Ethereum в [EIP-191](https://eips.ethereum.org/EIPS/eip-191). Это означает, что нам нужно создать объединенный буфер со стандартным префиксом, длиной сообщения в ASCII и самим сообщением, и использовать стандартный для Ethereum keccak256 для его хэширования.

```rust
    // ASCII prefix
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Чтобы избежать случаев, когда приложение просит пользователя подписать сообщение, которое может быть использовано как транзакция или для какой-либо другой цели, EIP-191 указывает, что все подписанные сообщения начинаются с символа 0x19 (недействительный символ ASCII), за которым следует `Ethereum Signed Message:` и новая строка.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

Обрабатывать длины сообщений до 999 и выдавать ошибку, если она больше. Я добавил этот код, хотя длина сообщения является константой, потому что это упрощает ее изменение. В производственной системе вы, вероятно, просто предположите, что `MESSAGE_LENGTH` не изменится ради лучшей производительности.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Используйте стандартную функцию Ethereum `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

Эта функция проверяет подпись, что требует хэша сообщения. Затем она предоставляет нам адрес, который ее подписал, и хэш сообщения. Хэш сообщения предоставляется в виде двух значений `Field`, потому что их проще использовать в остальной части программы, чем массив байтов.

Нам нужно использовать два значения `Field`, потому что вычисления с полями выполняются [по модулю](https://en.wikipedia.org/wiki/Modulo) большого числа, но это число обычно меньше 256 бит (иначе было бы трудно выполнять эти вычисления в EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Укажите `hash1` и `hash2` как изменяемые переменные и запишите в них хэш побайтово.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

Это похоже на [`ecrecover` в Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), с двумя важными отличиями:

- Если подпись недействительна, вызов не проходит `assert`, и программа прерывается.
- Хотя публичный ключ можно восстановить из подписи и хэша, это обработка, которую можно выполнить извне, и, следовательно, не стоит делать внутри доказательства с нулевым разглашением. Если кто-то попытается обмануть нас здесь, проверка подписи не удастся.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

Наконец, мы добрались до функции `main`. Нам нужно доказать, что у нас есть транзакция, которая действительным образом изменяет хэш аккаунтов со старого значения на новое. Нам также нужно доказать, что у нее есть этот конкретный хэш транзакции, чтобы человек, который ее отправил, знал, что его транзакция была обработана.

```rust
{
    let mut txn = readTransferTxn(message);
```

Нам нужно, чтобы `txn` был изменяемым, потому что мы не читаем адрес «от кого» из сообщения, мы читаем его из подписи.

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Этап 2 — Добавление сервера {#stage-2}

На втором этапе мы добавляем сервер, который получает и реализует транзакции перевода из браузера.

Чтобы увидеть это в действии:

1. Остановите Vite, если он запущен.

2. Загрузите ветку, которая включает сервер, и убедитесь, что у вас есть все необходимые модули.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Нет необходимости компилировать код Noir, он такой же, как код, который вы использовали для этапа 1.

3. Запустите сервер.

   ```sh
   npm run start
   ```

4. В отдельном окне командной строки запустите Vite для обслуживания кода браузера.

   ```sh
   cd client
   npm run dev
   ```

5. Перейдите к клиентскому коду по адресу [http://localhost:5173](http://localhost:5173).

6. Прежде чем вы сможете выполнить транзакцию, вам нужно знать nonce, а также сумму, которую вы можете отправить. Чтобы получить эту информацию, нажмите **Update account data** (Обновить данные аккаунта) и подпишите сообщение.

   Здесь у нас дилемма. С одной стороны, мы не хотим подписывать сообщение, которое может быть использовано повторно ([атака повторного воспроизведения](https://en.wikipedia.org/wiki/Replay_attack)), и именно поэтому нам в первую очередь нужен nonce. Однако у нас еще нет nonce. Решение состоит в том, чтобы выбрать nonce, который можно использовать только один раз и который у нас уже есть с обеих сторон, например, текущее время.

   Проблема с этим решением в том, что время может быть не идеально синхронизировано. Поэтому вместо этого мы подписываем значение, которое меняется каждую минуту. Это означает, что наше окно уязвимости для атак повторного воспроизведения составляет не более одной минуты. Учитывая, что в производственной среде подписанный запрос будет защищен TLS, и что другая сторона туннеля — сервер — уже может раскрыть баланс и nonce (он должен их знать для работы), это приемлемый риск.

7. Как только браузер получает обратно баланс и nonce, он показывает форму перевода. Выберите адрес назначения и сумму и нажмите **Transfer** (Перевести). Подпишите этот запрос.

8. Чтобы увидеть перевод, либо **обновите данные аккаунта**, либо посмотрите в окне, где вы запускаете сервер. Сервер регистрирует состояние каждый раз, когда оно меняется.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Этот файл](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) содержит серверный процесс и взаимодействует с кодом Noir в [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Вот объяснение интересных частей.

```js
import { Noir } from '@noir-lang/noir_js'
```

Библиотека [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) взаимодействует между кодом JavaScript и кодом Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Загрузите арифметическую схему — скомпилированную программу Noir, которую мы создали на предыдущем этапе, — и подготовьтесь к ее выполнению.

```js
// Мы предоставляем информацию об аккаунте только в ответ на подписанный запрос
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Для предоставления информации об аккаунте нам нужна только подпись. Причина в том, что мы уже знаем, каким будет сообщение, и, следовательно, хэш сообщения.

```js
const processMessage = async (message, signature) => {
```

Обработайте сообщение и выполните закодированную в нем транзакцию.

```js
    // Получить публичный ключ
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Теперь, когда мы запускаем JavaScript на сервере, мы можем получить публичный ключ там, а не на клиенте.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` запускает программу Noir. Параметры эквивалентны тем, что предоставлены в [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Обратите внимание, что длинные значения предоставляются как массив шестнадцатеричных строк (`["0x60", "0xA7"]`), а не как одно шестнадцатеричное значение (`0x60A7`), как это делает Viem.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Если возникла ошибка, перехватите ее, а затем передайте упрощенную версию клиенту.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Примените транзакцию. Мы уже сделали это в коде Noir, но здесь проще сделать это снова, чем извлекать результат оттуда.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Начальная структура `Accounts`.

### Этап 3 — Смарт-контракты Ethereum {#stage-3}

1. Остановите процессы сервера и клиента.

2. Загрузите ветку со смарт-контрактами и убедитесь, что у вас есть все необходимые модули.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Запустите `anvil` в отдельном окне командной строки.

4. Сгенерируйте ключ верификации и верификатор Solidity, затем скопируйте код верификатора в проект Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Перейдите к смарт-контрактам и установите переменные среды для использования блокчейна `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Разверните `Verifier.sol` и сохраните адрес в переменной среды.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Разверните контракт `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   Значение `0x199..67b` — это хэш Педерсена начального состояния `Accounts`. Если вы измените это начальное состояние в `server/index.mjs`, вы можете запустить транзакцию, чтобы увидеть начальный хэш, сообщаемый доказательством с нулевым разглашением.

8. Запустите сервер.

   ```sh
   cd ../server
   npm run start
   ```

9. Запустите клиент в другом окне командной строки.

   ```sh
   cd client
   npm run dev
   ```

10. Выполните несколько транзакций.

11. Чтобы убедиться, что состояние изменилось в блокчейне, перезапустите процесс сервера. Убедитесь, что `ZkBank` больше не принимает транзакции, потому что исходное значение хэша в транзакциях отличается от значения хэша, хранящегося в блокчейне.

    Это ожидаемый тип ошибки.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Изменения в этом файле в основном касаются создания фактического доказательства и его отправки в блокчейн.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Нам нужно использовать [пакет Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) для создания фактического доказательства для отправки в блокчейн. Мы можем использовать этот пакет либо через интерфейс командной строки (`bb`), либо с помощью [библиотеки JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). Библиотека JavaScript работает намного медленнее, чем нативный код, поэтому мы используем [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) для использования командной строки.

Обратите внимание, что если вы решите использовать `bb.js`, вам нужно будет использовать версию, совместимую с версией Noir, которую вы используете. На момент написания статьи текущая версия Noir (1.0.0-beta.11) использует `bb.js` версии 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Адрес здесь — это тот, который вы получаете, начиная с чистого `anvil` и следуя приведенным выше инструкциям.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Этот приватный ключ — один из стандартных предварительно пополненных аккаунтов в `anvil`.

```js
const generateProof = async (witness, fileID) => {
```

Сгенерируйте доказательство с помощью исполняемого файла `bb`.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Запишите свидетельство в файл.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Фактически создайте доказательство. Этот шаг также создает файл с публичными переменными, но нам он не нужен. Мы уже получили эти переменные из `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Доказательство представляет собой JSON-массив значений `Field`, каждое из которых представлено шестнадцатеричным значением. Однако нам нужно отправить его в транзакции как одно значение `bytes`, которое Viem представляет большой шестнадцатеричной строкой. Здесь мы изменяем формат, объединяя все значения, удаляя все `0x` и затем добавляя один в конце.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Очистка и возврат доказательства.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Публичные поля должны быть массивом 32-байтовых значений. Однако, поскольку нам нужно было разделить хэш транзакции на два значения `Field`, он отображается как 16-байтовое значение. Здесь мы добавляем нули, чтобы Viem понял, что это на самом деле 32 байта.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Каждый адрес использует каждый nonce только один раз, поэтому мы можем использовать комбинацию `fromAddress` и `nonce` в качестве уникального идентификатора для файла свидетельства и выходного каталога.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

Отправьте транзакцию в блокчейн.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Это ончейн-код, который получает транзакцию.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

Ончейн-код должен отслеживать две переменные: верификатор (отдельный контракт, созданный `nargo`) и текущий хэш состояния.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Каждый раз, когда состояние изменяется, мы генерируем событие `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Эта функция обрабатывает транзакции. Она получает доказательство (как `bytes`) и публичные входные данные (как массив `bytes32`) в формате, требуемом верификатором (для минимизации обработки в блокчейне и, следовательно, затрат на газ).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

Доказательство с нулевым разглашением должно доказывать, что транзакция изменяет наш текущий хэш на новый.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Вызовите контракт верификатора для проверки доказательства с нулевым разглашением. Этот шаг отменяет транзакцию, если доказательство с нулевым разглашением неверно.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Если все в порядке, обновите хэш состояния до нового значения и сгенерируйте событие `TransactionProcessed`.

## Злоупотребления со стороны централизованного компонента {#abuses}

Информационная безопасность состоит из трех атрибутов:

- _Конфиденциальность_ — пользователи не могут читать информацию, на чтение которой они не авторизованы.
- _Целостность_ — информация не может быть изменена, кроме как авторизованными пользователями авторизованным способом.
- _Доступность_ — авторизованные пользователи могут использовать систему.

В этой системе целостность обеспечивается с помощью доказательств с нулевым разглашением. Доступность гораздо сложнее гарантировать, а конфиденциальность невозможна, потому что банк должен знать баланс каждого аккаунта и все транзакции. Невозможно помешать сущности, обладающей информацией, делиться этой информацией.

Возможно, удастся создать действительно конфиденциальный банк с использованием [скрытых адресов](https://vitalik.eth.limo/general/2023/01/20/stealth.html), но это выходит за рамки данной статьи.

### Ложная информация {#false-info}

Один из способов, которым сервер может нарушить целостность, — это предоставление ложной информации при [запросе данных](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Чтобы решить эту проблему, мы можем написать вторую программу Noir, которая получает аккаунты в качестве приватного ввода и адрес, для которого запрашивается информация, в качестве публичного ввода. Выводом являются баланс и nonce этого адреса, а также хэш аккаунтов.

Конечно, это доказательство не может быть проверено в блокчейне, потому что мы не хотим публиковать nonce и балансы в блокчейне. Однако оно может быть проверено клиентским кодом, работающим в браузере.

### Принудительные транзакции {#forced-txns}

Обычный механизм для обеспечения доступности и предотвращения цензуры на L2 — это [принудительные транзакции](https://docs.optimism.io/stack/transactions/forced-transaction). Но принудительные транзакции не сочетаются с доказательствами с нулевым разглашением. Сервер — единственная сущность, которая может проверять транзакции.

Мы можем изменить `smart-contracts/src/ZkBank.sol`, чтобы он принимал принудительные транзакции и не позволял серверу изменять состояние до их обработки. Однако это открывает нас для простой атаки типа «отказ в обслуживании». Что если принудительная транзакция недействительна и поэтому ее невозможно обработать?

Решение — иметь доказательство с нулевым разглашением того, что принудительная транзакция недействительна. Это дает серверу три варианта:

- Обработать принудительную транзакцию, предоставив доказательство с нулевым разглашением того, что она была обработана, и новый хэш состояния.
- Отклонить принудительную транзакцию и предоставить контракту доказательство с нулевым разглашением того, что транзакция недействительна (неизвестный адрес, неверный nonce или недостаточный баланс).
- Игнорировать принудительную транзакцию. Невозможно заставить сервер действительно обработать транзакцию, но это означает, что вся система недоступна.

#### Облигации доступности {#avail-bonds}

В реальной реализации, вероятно, будет какой-то мотив прибыли для поддержания работы сервера. Мы можем усилить этот стимул, заставив сервер разместить облигацию доступности, которую любой может сжечь, если принудительная транзакция не будет обработана в течение определенного периода.

### Неправильный код Noir {#bad-noir-code}

Обычно, чтобы заставить людей доверять смарт-контракту, мы загружаем исходный код в [обозреватель блоков](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Однако в случае доказательств с нулевым разглашением этого недостаточно.

`Verifier.sol` содержит ключ верификации, который является функцией программы Noir. Однако этот ключ не говорит нам, какой была программа Noir. Чтобы действительно иметь доверенное решение, вам нужно загрузить программу Noir (и версию, которая ее создала). В противном случае доказательства с нулевым разглашением могут отражать другую программу, с бэкдором.

Пока обозреватели блоков не начнут позволять нам загружать и проверять программы Noir, вам следует делать это самостоятельно (предпочтительно в [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Тогда опытные пользователи смогут загрузить исходный код, скомпилировать его самостоятельно, создать `Verifier.sol` и убедиться, что он идентичен тому, что находится в блокчейне.

## Заключение {#conclusion}

Приложения типа Plasma требуют централизованного компонента для хранения информации. Это открывает потенциальные уязвимости, но взамен позволяет нам сохранять конфиденциальность способами, недоступными в самом блокчейне. С помощью доказательств с нулевым разглашением мы можем обеспечить целостность и, возможно, сделать экономически выгодным для того, кто управляет централизованным компонентом, поддерживать доступность.

[Больше моих работ смотрите здесь](https://cryptodocguy.pro/).

## Благодарности {#acknowledgements}

- Джош Крайтс прочитал черновик этой статьи и помог мне с запутанным вопросом по Noir.

Ответственность за любые оставшиеся ошибки лежит на мне.
