---
title: Написання специфічної для застосунку плазми, яка зберігає конфіденційність
description: У цьому посібнику ми створюємо напівтаємний банк для депозитів. Банк — це централізований компонент; він знає баланс кожного користувача. Однак ця інформація не зберігається в ланцюжку. Натомість банк публікує хеш стану. Щоразу, коли відбувається транзакція, банк публікує новий хеш разом із доказом із нульовим розголошенням, що він має підписану транзакцію, яка змінює стан хешу на новий. Прочитавши цей посібник, ви зрозумієте не тільки як використовувати докази з нульовим розголошенням, а й чому ви їх використовуєте та як робити це безпечно.
author: Орі Померанц
tags:
  [
    "нульове розголошення",
    "сервер",
    "поза ланцюжком",
    "конфіденційність"
  ]
skill: advanced
lang: uk
published: 2025-10-15
---

## Вступ {#introduction}

На відміну від [зведень](/developers/docs/scaling/zk-rollups/), [плазми](/developers/docs/scaling/plasma) використовують головну мережу Ethereum для цілісності, але не для доступності. У цій статті ми пишемо застосунок, який поводиться як плазма, де Ethereum гарантує цілісність (відсутність неавторизованих змін), але не доступність (централізований компонент може вийти з ладу й вимкнути всю систему).

Застосунок, який ми тут пишемо, — це банк, що зберігає конфіденційність. Різні адреси мають облікові записи з балансами, і вони можуть надсилати гроші (ETH) на інші облікові записи. Банк публікує хеші стану (облікові записи та їхні баланси) і транзакції, але зберігає фактичні баланси поза ланцюжком, де вони можуть залишатися приватними.

## Проєкт {#design}

Це не готова до виробництва система, а навчальний інструмент. Тому вона написана з кількома спрощеними припущеннями.

- Фіксований пул облікових записів. Існує певна кількість облікових записів, і кожен обліковий запис належить до заздалегідь визначеної адреси. Це робить систему набагато простішою, оскільки важко обробляти структури даних змінного розміру в доказах із нульовим розголошенням. Для готової до виробництва системи ми можемо використовувати [корінь Меркла](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) як хеш стану та надавати докази Меркла для необхідних балансів.

- Зберігання в пам'яті. У виробничій системі нам потрібно записувати всі баланси облікових записів на диск, щоб зберегти їх у разі перезавантаження. Тут нічого страшного, якщо інформація просто втрачається.

- Лише перекази. Виробнича система вимагала б спосіб внесення активів у банк та їхнього виведення. Але мета тут лише в тому, щоб проілюструвати концепцію, тому цей банк обмежений переказами.

### Докази з нульовим розголошенням {#zero-knowledge-proofs}

На фундаментальному рівні доказ із нульовим розголошенням показує, що той, хто доводить, знає деякі дані, _Data<sub>private</sub>_, такі що існує зв'язок _Relationship_ між деякими публічними даними, _Data<sub>public</sub>_, і _Data<sub>private</sub>_. Верифікатор знає _Relationship_ та _Data<sub>public</sub>_.

Щоб зберегти конфіденційність, нам потрібно, щоб стани та транзакції були приватними. Але для забезпечення цілісності нам потрібно, щоб [криптографічний хеш](https://en.wikipedia.org/wiki/Cryptographic_hash_function) станів був публічним. Щоб довести людям, які надсилають транзакції, що ці транзакції дійсно відбулися, нам також потрібно публікувати хеші транзакцій.

У більшості випадків _Data<sub>private</sub>_ є вхідними даними для програми доказу з нульовим розголошенням, а _Data<sub>public</sub>_ — вихідними.

Ці поля в _Data<sub>private</sub>_:

- _State<sub>n</sub>_, старий стан
- _State<sub>n+1</sub>_, новий стан
- _Transaction_, транзакція, яка змінює старий стан на новий. Ця транзакція має містити такі поля:
  - _Адреса призначення_, яка отримує переказ
  - _Сума_ переказу
  - _Nonce_, щоб гарантувати, що кожна транзакція може бути оброблена лише один раз.
    Адреса джерела не повинна бути в транзакції, оскільки її можна відновити з підпису.
- _Підпис_, підпис, який уповноважений на виконання транзакції. У нашому випадку єдиною адресою, уповноваженою на виконання транзакції, є адреса джерела. Оскільки наша система нульового розголошення працює саме так, нам також потрібен публічний ключ облікового запису, на додаток до підпису Ethereum.

Це поля в _Data<sub>public</sub>_:

- _Hash(State<sub>n</sub>)_ хеш старого стану
- _Hash(State<sub>n+1</sub>)_ хеш нового стану
- _Hash(Transaction)_ хеш транзакції, яка змінює стан з _State<sub>n</sub>_ на _State<sub>n+1</sub>_.

Зв'язок перевіряє кілька умов:

- Публічні хеші дійсно є правильними хешами для приватних полів.
- Транзакція, застосована до старого стану, призводить до нового стану.
- Підпис походить від адреси джерела транзакції.

Через властивості криптографічних хеш-функцій доведення цих умов достатньо для забезпечення цілісності.

### Структури даних {#data-structures}

Основна структура даних — це стан, який утримується сервером. Для кожного облікового запису сервер відстежує баланс облікового запису та [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), який використовується для запобігання [атакам повторного відтворення](https://en.wikipedia.org/wiki/Replay_attack).

### Компоненти {#components}

Ця система потребує двох компонентів:

- _Сервер_, який отримує транзакції, обробляє їх і публікує хеші в ланцюжку разом із доказами з нульовим розголошенням.
- _Смарт-контракт_, який зберігає хеші та перевіряє докази з нульовим розголошенням, щоб гарантувати законність переходів стану.

### Потоки даних і керування {#flows}

Це способи, якими різні компоненти взаємодіють для переказу з одного облікового запису на інший.

1. Веббраузер надсилає підписану транзакцію із запитом на переказ з облікового запису підписувача на інший обліковий запис.

2. Сервер перевіряє, що транзакція є дійсною:

   - Підписувач має обліковий запис у банку з достатнім балансом.
   - Одержувач має обліковий запис у банку.

3. Сервер обчислює новий стан, віднімаючи суму переказу від балансу підписувача та додаючи її до балансу одержувача.

4. Сервер обчислює доказ із нульовим розголошенням, що зміна стану є дійсною.

5. Сервер надсилає до Ethereum транзакцію, яка містить:

   - Новий хеш стану
   - Хеш транзакції (щоб відправник транзакції міг знати, що вона оброблена)
   - Доказ із нульовим розголошенням, який доводить, що перехід до нового стану є дійсним

6. Смарт-контракт перевіряє доказ із нульовим розголошенням.

7. Якщо доказ із нульовим розголошенням проходить перевірку, смарт-контракт виконує такі дії:
   - Оновити поточний хеш стану на новий хеш стану
   - Випустити запис у журналі з новим хешем стану та хешем транзакції

### Інструменти {#tools}

Для клієнтського коду ми будемо використовувати [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) та [Wagmi](https://wagmi.sh/). Це стандартні інструменти; якщо ви з ними не знайомі, можете скористатися [цим посібником](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Більша частина сервера написана на JavaScript з використанням [Node](https://nodejs.org/en). Частина з нульовим розголошенням написана на [Noir](https://noir-lang.org/). Нам потрібна версія `1.0.0-beta.10`, тому після того, як ви [встановите Noir згідно з інструкцією](https://noir-lang.org/docs/getting_started/quick_start), виконайте:

```
noirup -v 1.0.0-beta.10
```

Блокчейн, який ми використовуємо, — це `anvil`, локальний тестовий блокчейн, який є частиною [Foundry](https://getfoundry.sh/introduction/installation).

## Реалізація {#implementation}

Оскільки це складна система, ми будемо реалізовувати її поетапно.

### Етап 1. Ручне нульове розголошення {#stage-1}

На першому етапі ми підпишемо транзакцію в браузері, а потім вручну надамо інформацію для доказу з нульовим розголошенням. Код з нульовим розголошенням очікує отримати цю інформацію у файлі `server/noir/Prover.toml` (документація [тут](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Щоб побачити це в дії:

1. Переконайтеся, що у вас встановлено [Node](https://nodejs.org/en/download) і [Noir](https://noir-lang.org/install). Бажано встановлювати їх у системі UNIX, наприклад macOS, Linux або [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Завантажте код етапу 1 і запустіть вебсервер для обслуговування клієнтського коду.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Причина, через яку тут потрібен вебсервер, полягає в тому, що для запобігання певним видам шахрайства багато гаманців (наприклад, MetaMask) не приймають файли, що подаються безпосередньо з диска

3. Відкрийте браузер із гаманцем.

4. У гаманці введіть нову кодову фразу. Зверніть увагу, що це видалить вашу наявну кодову фразу, тому _переконайтеся, що у вас є резервна копія_.

   Кодова фраза — `test test test test test test test test test test test junk`, стандартна тестова кодова фраза для anvil.

5. Перейдіть до [клієнтського коду](http://localhost:5173/).

6. Підключіться до гаманця та виберіть обліковий запис призначення та суму.

7. Натисніть **Підписати** і підпишіть транзакцію.

8. Під заголовком **Prover.toml** ви знайдете текст. Замініть `server/noir/Prover.toml` цим текстом.

9. Виконайте доказ з нульовим розголошенням.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Вивід має бути схожий на

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Порівняйте два останні значення з хешем, який ви бачите у веббраузері, щоб перевірити, чи правильно захешовано повідомлення.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Цей файл](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) показує формат інформації, очікуваний Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Повідомлення має текстовий формат, що полегшує його розуміння користувачем (що необхідно при підписанні) та аналіз кодом Noir. Сума вказана у фінні, щоб, з одного боку, уможливити дробові перекази, а з іншого — бути легко читабельною. Останнє число — це [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Рядок має довжину 100 символів. Докази з нульовим розголошенням погано обробляють дані змінного розміру, тому часто необхідно доповнювати дані.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Ці три параметри є масивами байтів фіксованого розміру.

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

Це спосіб вказати масив структур. Для кожного запису ми вказуємо адресу, баланс (в міліETH, також відомих як [finney](https://cryptovalleyjournal.com/glossary/finney/)), та наступне значення nonce.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Цей файл](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) реалізує обробку на стороні клієнта та генерує файл `server/noir/Prover.toml` (той, що містить параметри нульового розголошення).

Ось пояснення найцікавіших частин.

```tsx
export default attrs =>  {
```

Ця функція створює компонент React `Transfer`, який можуть імпортувати інші файли.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Це адреси облікових записів, адреси, створені за допомогою `test ...` кодової фрази test junk\`. Якщо ви хочете використовувати власні адреси, просто змініть це визначення.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Ці [хуки Wagmi](https://wagmi.sh/react/api/hooks) дозволяють нам отримати доступ до бібліотеки [viem](https://viem.sh/) та гаманця.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Це повідомлення, доповнене пробілами. Щоразу, коли змінюється одна зі змінних [`useState`](https://react.dev/reference/react/useState), компонент перемальовується, а `message` оновлюється.

```tsx
  const sign = async () => {
```

Ця функція викликається, коли користувач натискає кнопку **Підписати**. Повідомлення оновлюється автоматично, але підпис потребує схвалення користувача в гаманці, і ми не хочемо запитувати його без потреби.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Попросіть гаманець [підписати повідомлення](https://viem.sh/docs/accounts/local/signMessage).

```tsx
    const hash = hashMessage(message)
```

Отримати хеш повідомлення. Корисно надати його користувачеві для налагодження (коду Noir).

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Отримати публічний ключ](https://viem.sh/docs/utilities/recoverPublicKey). Це необхідно для функції Noir [`ecrecover`](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Встановити змінні стану. Це перемальовує компонент (після виходу з функції `sign`) і показує користувачеві оновлені значення.

```tsx
    let proverToml = `
```

Текст для `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem надає нам публічний ключ у вигляді 65-байтового шістнадцяткового рядка. Перший байт — це `0x04`, маркер версії. Далі йдуть 32 байти для `x` публічного ключа, а потім 32 байти для `y` публічного ключа.

Однак Noir очікує отримати цю інформацію у вигляді двох байтових масивів, один для `x` і один для `y`. Це простіше розібрати тут, на клієнті, ніж як частину доказу з нульовим розголошенням.

Зауважте, що це є хорошою практикою в нульовому розголошенні загалом. Код всередині доказу з нульовим розголошенням є дорогим, тому будь-яка обробка, яку можна виконати поза доказом з нульовим розголошенням, _повинна_ виконуватися поза ним.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Підпис також надається у вигляді 65-байтового шістнадцяткового рядка. Однак останній байт необхідний лише для відновлення публічного ключа. Оскільки публічний ключ уже буде надано коду Noir, нам не потрібно його для перевірки підпису, і код Noir його не вимагає.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Надайте облікові записи.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Переказ</h2>
```

Це формат HTML (точніше, [JSX](https://react.dev/learn/writing-markup-with-jsx)) компонента.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Цей файл](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) є фактичним кодом з нульовим розголошенням.

```
use std::hash::pedersen_hash;
```

[Хеш Педерсена](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) надається зі [стандартною бібліотекою Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Докази з нульовим розголошенням зазвичай використовують цю хеш-функцію. Його набагато простіше обчислити всередині [арифметичних схем](https://rareskills.io/post/arithmetic-circuit) порівняно зі стандартними хеш-функціями.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Ці дві функції є зовнішніми бібліотеками, визначеними в [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Вони є саме тим, за що їх названо: функція, яка обчислює [хеш keccak256](https://emn178.github.io/online-tools/keccak_256.html), і функція, яка перевіряє підписи Ethereum і відновлює адресу Ethereum підписувача.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir натхненний [Rust](https://www.rust-lang.org/). Змінні за замовчуванням є константами. Так ми визначаємо глобальні константи конфігурації. Зокрема, `ACCOUNT_NUMBER` — це кількість облікових записів, які ми зберігаємо.

Типи даних з назвою `u<число>` — це беззнакові числа з такою кількістю бітів. Єдиними підтримуваними типами є `u8`, `u16`, `u32`, `u64` та `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Ця змінна використовується для хешу Педерсена облікових записів, як пояснено нижче.

```
global MESSAGE_LENGTH : u32 = 100;
```

Як пояснено вище, довжина повідомлення фіксована. Вона вказана тут.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[Підписи EIP-191](https://eips.ethereum.org/EIPS/eip-191) вимагають буфер з 26-байтовим префіксом, за яким слідує довжина повідомлення в ASCII і, нарешті, саме повідомлення.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Інформація, яку ми зберігаємо про обліковий запис. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) — це число, зазвичай до 253 біт, яке можна використовувати безпосередньо в [арифметичній схемі](https://rareskills.io/post/arithmetic-circuit), що реалізує доказ із нульовим розголошенням. Тут ми використовуємо `Field` для зберігання 160-бітової адреси Ethereum.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Інформація, яку ми зберігаємо для транзакції переказу.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Визначення функції. Параметр — це інформація `Account`. Результатом є масив змінних `Field`, довжина якого дорівнює `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Перше значення в масиві — це адреса облікового запису. Друге включає як баланс, так і nonce. Виклики `.into()` змінюють число на тип даних, яким воно має бути. `account.nonce` є значенням `u32`, але щоб додати його до `account.balance << 32`, значення `u128`, воно має бути `u128`. Це перший `.into()`. Другий перетворює результат `u128` на `Field`, щоб він вмістився в масив.

```
    flat
}
```

У Noir функції можуть повертати значення лише в кінці (немає раннього повернення). Щоб вказати значення, що повертається, ви обчислюєте його безпосередньо перед закриваючою дужкою функції.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Ця функція перетворює масив облікових записів на масив `Field`, який можна використовувати як вхідні дані для хешу Педерсена.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Так ви вказуєте змінну, що змінюється, тобто _не_ константу. Змінні в Noir завжди повинні мати значення, тому ми ініціалізуємо цю змінну нулями.

```
    for i in 0..ACCOUNT_NUMBER {
```

Це цикл `for`. Зауважте, що межі є константами. Цикли Noir повинні мати свої межі, відомі на етапі компіляції. Причина в тому, що арифметичні схеми не підтримують керування потоком. Під час обробки циклу `for` компілятор просто вставляє код всередині нього кілька разів, по одному на кожну ітерацію.

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

Нарешті, ми дійшли до функції, яка хешує масив облікових записів.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Ця функція знаходить обліковий запис за вказаною адресою. Ця функція була б жахливо неефективною в стандартному коді, оскільки вона перебирає всі облікові записи, навіть після того, як знайшла адресу.

Однак у доказах із нульовим розголошенням немає керування потоком. Якщо нам коли-небудь знадобиться перевірити умову, ми повинні перевіряти її кожного разу.

Подібне відбувається з операторами `if`. Оператор `if` у циклі вище перекладається в такі математичні вирази.

_condition<sub>result</sub> = accounts[i].address == address_ // одиниця, якщо вони рівні, нуль в іншому випадку

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} не має облікового запису");

    account
}
```

Функція [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) призводить до збою доказу з нульовим розголошенням, якщо твердження є хибним. У цьому випадку, якщо ми не можемо знайти обліковий запис із відповідною адресою. Щоб повідомити адресу, ми використовуємо [рядок форматування](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Ця функція застосовує транзакцію переказу та повертає новий масив облікових записів.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Ми не можемо отримати доступ до елементів структури всередині рядка форматування в Noir, тому ми створюємо придатну для використання копію.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} не має {txnAmount} фінні");

    assert (accounts[from].nonce == txn.nonce,
        f"Транзакція має nonce {txnNonce}, але очікується, що обліковий запис використовуватиме {accountNonce}");
```

Це дві умови, які можуть зробити транзакцію недійсною.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Створити новий масив облікових записів, а потім повернути його.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Ця функція зчитує адресу з повідомлення.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Адреса завжди має довжину 20 байтів (також відомі як 40 шістнадцяткових цифр) і починається з 7-го символу.

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

Зчитати суму та nonce з повідомлення.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

У повідомленні перше число після адреси — це сума у фінні (також відомі як тисячна частина ETH) для переказу. Друге число — це nonce. Будь-який текст між ними ігнорується.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // Ми щойно його знайшли
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

Повернення [кортежу](https://noir-lang.org/docs/noir/concepts/data_types/tuples) — це спосіб Noir повернути кілька значень з функції.

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

Ця функція перетворює повідомлення на байти, а потім перетворює суми на `TransferTxn`.

```rust
// Еквівалент hashMessage від Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Ми могли використовувати хеш Педерсена для облікових записів, тому що вони хешуються лише всередині доказу з нульовим розголошенням. Однак у цьому коді нам потрібно перевірити підпис повідомлення, який генерується браузером. Для цього нам потрібно дотримуватися формату підпису Ethereum, визначеного в [EIP 191](https://eips.ethereum.org/EIPS/eip-191). Це означає, що нам потрібно створити комбінований буфер зі стандартним префіксом, довжиною повідомлення в ASCII та самим повідомленням, і використовувати стандартний для Ethereum keccak256 для його хешування.

```rust
    // префікс ASCII
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

Щоб уникнути випадків, коли застосунок просить користувача підписати повідомлення, яке можна використати як транзакцію або для іншої мети, EIP 191 визначає, що всі підписані повідомлення починаються з символу 0x19 (недійсний символ ASCII), за яким слідує `Ethereum Signed Message:` та новий рядок.

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

    assert(MESSAGE_LENGTH < 1000, "Повідомлення, довжина яких перевищує три цифри, не підтримуються");
```

Обробляти довжину повідомлень до 999 і видавати помилку, якщо вона більша. Я додав цей код, хоча довжина повідомлення є константою, оскільки це полегшує його зміну. У виробничій системі ви, ймовірно, просто припустили б, що `MESSAGE_LENGTH` не змінюється заради кращої продуктивності.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Використовуйте стандартну функцію Ethereum `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // адреса, перші 16 байтів хешу, останні 16 байтів хешу        
{
```

Ця функція перевіряє підпис, для чого потрібен хеш повідомлення. Потім вона надає нам адресу, яка його підписала, та хеш повідомлення. Хеш повідомлення подається у двох значеннях `Field`, оскільки їх легше використовувати в решті програми, ніж байтовий масив.

Нам потрібно використовувати два значення `Field`, оскільки обчислення в полі виконуються за [модулем](https://en.wikipedia.org/wiki/Modulo) великого числа, але це число зазвичай менше 256 біт (інакше було б важко виконувати ці обчислення в EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Вкажіть `hash1` та `hash2` як змінні, що змінюються, і запишіть в них хеш побайтово.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

Це схоже на `ecrecover` у [Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), але з двома важливими відмінностями:

- Якщо підпис недійсний, виклик не проходить `assert`, і програма переривається.
- Хоча публічний ключ можна відновити з підпису та хешу, це обробка, яку можна виконати ззовні, і тому не варто робити всередині доказу з нульовим розголошенням. Якщо хтось спробує нас тут обдурити, перевірка підпису не вдасться.

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
        Field,  // Хеш старого масиву облікових записів
        Field,  // Хеш нового масиву облікових записів
        Field,  // Перші 16 байтів хешу повідомлення
        Field,  // Останні 16 байтів хешу повідомлення
    )
```

Нарешті, ми дійшли до функції `main`. Нам потрібно довести, що ми маємо транзакцію, яка дійсно змінює хеш облікових записів зі старого значення на нове. Нам також потрібно довести, що вона має цей конкретний хеш транзакції, щоб людина, яка її надіслала, знала, що її транзакція була оброблена.

```rust
{
    let mut txn = readTransferTxn(message);
```

Нам потрібно, щоб `txn` була змінною, тому що ми не зчитуємо адресу відправника з повідомлення, а зчитуємо її з підпису.

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

### Етап 2. Додавання сервера {#stage-2}

На другому етапі ми додаємо сервер, який отримує та реалізує транзакції переказу з браузера.

Щоб побачити це в дії:

1. Зупиніть Vite, якщо він запущений.

2. Завантажте гілку, яка містить сервер, і переконайтеся, що у вас є всі необхідні модулі.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Немає потреби компілювати код Noir, він такий самий, як і код, який ви використовували на етапі 1.

3. Запустіть сервер.

   ```sh
   npm run start
   ```

4. В окремому вікні командного рядка запустіть Vite для обслуговування коду браузера.

   ```sh
   cd client
   npm run dev
   ```

5. Перейдіть до клієнтського коду за адресою [http://localhost:5173](http://localhost:5173)

6. Перш ніж ви зможете видати транзакцію, вам потрібно знати nonce, а також суму, яку ви можете надіслати. Щоб отримати цю інформацію, натисніть **Оновити дані облікового запису** та підпишіть повідомлення.

   Тут у нас дилема. З одного боку, ми не хочемо підписувати повідомлення, яке можна повторно використати (атака [повторного відтворення](https://en.wikipedia.org/wiki/Replay_attack)), і саме тому нам потрібен nonce. Однак у нас ще немає nonce. Рішення полягає в тому, щоб вибрати nonce, який можна використовувати лише один раз і який ми вже маємо з обох сторін, наприклад, поточний час.

   Проблема цього рішення полягає в тому, що час може бути не ідеально синхронізований. Тому замість цього ми підписуємо значення, яке змінюється щохвилини. Це означає, що наше вікно вразливості до атак повторного відтворення становить щонайбільше одну хвилину. Враховуючи, що у виробництві підписаний запит буде захищений TLS, і що інша сторона тунелю — сервер — уже може розкрити баланс і nonce (він повинен їх знати, щоб працювати), це є прийнятним ризиком.

7. Коли браузер отримує баланс і nonce, він показує форму переказу. Виберіть адресу призначення та суму й натисніть **Переказ**. Підпишіть цей запит.

8. Щоб побачити переказ, або **Оновіть дані облікового запису**, або подивіться у вікні, де ви запускаєте сервер. Сервер реєструє стан щоразу, коли він змінюється.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    Прослуховування порту 3000
    Транзакція send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 оброблена
    Новий стан:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 має 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 має 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC має 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 має 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 має 100000 (0)
    Транзакція send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 оброблена
    Новий стан:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 має 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 має 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC має 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 має 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 має 100000 (0)
    Транзакція send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 оброблена
    Новий стан:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 має 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 має 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC має 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 має 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 має 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Цей файл](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) містить процес сервера та взаємодіє з кодом Noir у [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Ось пояснення найцікавіших частин.

```js
import { Noir } from '@noir-lang/noir_js'
```

Бібліотека [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) забезпечує взаємодію між кодом JavaScript і кодом Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Завантажте арифметичну схему — скомпільовану програму Noir, яку ми створили на попередньому етапі, — і підготуйтеся до її виконання.

```js
// Ми надаємо інформацію про обліковий запис лише у відповідь на підписаний запит
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Щоб надати інформацію про обліковий запис, нам потрібен лише підпис. Причина в тому, що ми вже знаємо, яким буде повідомлення, а отже, і хеш повідомлення.

```js
const processMessage = async (message, signature) => {
```

Обробити повідомлення та виконати транзакцію, яку воно кодує.

```js
    // Отримати публічний ключ
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Тепер, коли ми запускаємо JavaScript на сервері, ми можемо отримати публічний ключ там, а не на клієнті.

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

`noir.execute` запускає програму Noir. Параметри еквівалентні тим, що надані в [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Зауважте, що довгі значення надаються як масив шістнадцяткових рядків (`["0x60", "0xA7"]`), а не як єдине шістнадцяткове значення (`0x60A7`), як це робить Viem.

```js
    } catch (err) {
        console.log(`Помилка Noir: ${err}`)
        throw Error("Недійсна транзакція, не оброблено")
    }
```

Якщо виникає помилка, перехопіть її, а потім передайте спрощену версію клієнту.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Застосувати транзакцію. Ми вже зробили це в коді Noir, але простіше зробити це знову тут, ніж витягувати результат звідти.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Початкова структура `Accounts`.

### Етап 3. Смарт-контракти Ethereum {#stage-3}

1. Зупиніть процеси сервера та клієнта.

2. Завантажте гілку зі смарт-контрактами та переконайтеся, що у вас є всі необхідні модулі.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Запустіть `anvil` в окремому вікні командного рядка.

4. Згенеруйте ключ верифікації та верифікатор Solidity, потім скопіюйте код верифікатора до проєкту Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Перейдіть до смарт-контрактів і встановіть змінні середовища для використання блокчейну `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Розгорніть `Verifier.sol` і збережіть адресу в змінній середовища.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Розгорніть контракт `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   Значення `0x199..67b` є хешем Педерсена початкового стану `Accounts`. Якщо ви зміните цей початковий стан у `server/index.mjs`, ви можете запустити транзакцію, щоб побачити початковий хеш, про який повідомляє доказ із нульовим розголошенням.

8. Запустіть сервер.

   ```sh
   cd ../server
   npm run start
   ```

9. Запустіть клієнт в іншому вікні командного рядка.

   ```sh
   cd client
   npm run dev
   ```

10. Виконайте кілька транзакцій.

11. Щоб перевірити, що стан змінився в ланцюжку, перезапустіть процес сервера. Подивіться, що `ZkBank` більше не приймає транзакції, оскільки початкове значення хешу в транзакціях відрізняється від значення хешу, що зберігається в ланцюжку.

    Це очікуваний тип помилки.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Прослуховування порту 3000
    Помилка верифікації: ContractFunctionExecutionError: Функція контракту "processTransaction" відхилена з наступної причини:
    Неправильний старий хеш стану

    Виклик контракту:
        адреса:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        функція:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        аргументи: (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Зміни в цьому файлі в основному стосуються створення фактичного доказу та його подання в ланцюжок.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Нам потрібно використовувати [пакет Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) для створення фактичного доказу, який буде відправлено в ланцюжок. Ми можемо використовувати цей пакет або за допомогою інтерфейсу командного рядка (`bb`), або за допомогою [бібліотеки JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). Бібліотека JavaScript набагато повільніша, ніж запуск коду нативно, тому ми використовуємо [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) тут, щоб використовувати командний рядок.

Зауважте, що якщо ви вирішите використовувати `bb.js`, вам потрібно використовувати версію, сумісну з версією Noir, яку ви використовуєте. На момент написання статті поточна версія Noir (1.0.0-beta.11) використовує `bb.js` версії 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Адреса тут — це та, яку ви отримуєте, коли починаєте з чистого `anvil` і дотримуєтеся наведених вище вказівок.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Цей приватний ключ є одним із стандартних попередньо профінансованих облікових записів в `anvil`.

```js
const generateProof = async (witness, fileID) => {
```

Згенерувати доказ за допомогою виконуваного файлу `bb`.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Записати свідоцтво у файл.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Фактично створити доказ. Цей крок також створює файл із публічними змінними, але нам він не потрібен. Ми вже отримали ці змінні з `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Доказ — це масив JSON значень `Field`, кожне з яких представлено шістнадцятковим значенням. Однак нам потрібно надіслати його в транзакції як єдине значення `bytes`, яке Viem представляє великим шістнадцятковим рядком. Тут ми змінюємо формат, конкатенуючи всі значення, видаляючи всі `0x` і додаючи один в кінці.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Очищення та повернення доказу.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Публічні поля мають бути масивом 32-байтових значень. Однак, оскільки нам потрібно було розділити хеш транзакції між двома значеннями `Field`, він виглядає як 16-байтове значення. Тут ми додаємо нулі, щоб Viem зрозумів, що це насправді 32 байти.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Кожна адреса використовує кожен nonce лише один раз, тому ми можемо використовувати комбінацію `fromAddress` і `nonce` як унікальний ідентифікатор для файлу-свідка та вихідного каталогу.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Помилка верифікації: ${err}`)
        throw Error("Не вдається перевірити транзакцію в ланцюжку")
    }
    .
    .
    .
}
```

Надіслати транзакцію до ланцюга.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Це код у ланцюжку, який отримує транзакцію.

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

Код у ланцюжку повинен відстежувати дві змінні: верифікатор (окремий контракт, створений `nargo`) та поточний хеш стану.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Щоразу, коли стан змінюється, ми генеруємо подію `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Ця функція обробляє транзакції. Вона отримує доказ (як `bytes`) і публічні вхідні дані (як масив `bytes32`), у форматі, який вимагає верифікатор (для мінімізації обробки в ланцюжку і, отже, вартості газу).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Неправильний старий хеш стану");
```

Доказ із нульовим розголошенням має доводити, що транзакція змінює наш поточний хеш на новий.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Викличте контракт-верифікатор для перевірки доказу з нульовим розголошенням. Цей крок відхиляє транзакцію, якщо доказ із нульовим розголошенням є хибним.

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

Якщо все перевірено, оновіть хеш стану на нове значення та генеруйте подію `TransactionProcessed`.

## Зловживання з боку централізованого компонента {#abuses}

Інформаційна безпека складається з трьох атрибутів:

- _Конфіденційність_, користувачі не можуть читати інформацію, на читання якої вони не уповноважені.
- _Цілісність_, інформація не може бути змінена, окрім як уповноваженими користувачами уповноваженим чином.
- _Доступність_, уповноважені користувачі можуть використовувати систему.

У цій системі цілісність забезпечується за допомогою доказів із нульовим розголошенням. Доступність набагато важче гарантувати, а конфіденційність неможлива, оскільки банк повинен знати баланс кожного облікового запису та всі транзакції. Немає способу запобігти тому, щоб суб'єкт, який володіє інформацією, ділився цією інформацією.

Можливо, можна створити справді конфіденційний банк за допомогою [прихованих адрес](https://vitalik.eth.limo/general/2023/01/20/stealth.html), але це виходить за рамки цієї статті.

### Неправдива інформація {#false-info}

Один зі способів, яким сервер може порушити цілісність, — це надання неправдивої інформації, коли [запитуються дані](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Щоб вирішити цю проблему, ми можемо написати другу програму Noir, яка отримує облікові записи як приватні вхідні дані та адресу, для якої запитується інформація, як публічні вхідні дані. Виводом є баланс і nonce цієї адреси, а також хеш облікових записів.

Звісно, цей доказ не можна перевірити в ланцюжку, оскільки ми не хочемо публікувати nonces і баланси в ланцюжку. Однак його можна перевірити за допомогою клієнтського коду, що працює в браузері.

### Примусові транзакції {#forced-txns}

Звичайним механізмом для забезпечення доступності та запобігання цензурі на L2 є [примусові транзакції](https://docs.optimism.io/stack/transactions/forced-transaction). Але примусові транзакції не поєднуються з доказами з нульовим розголошенням. Сервер — єдиний суб'єкт, який може перевіряти транзакції.

Ми можемо змінити `smart-contracts/src/ZkBank.sol`, щоб приймати примусові транзакції та запобігати зміні стану сервером, доки вони не будуть оброблені. Ми можемо змінити `smart-contracts/src/ZkBank.sol` для прийому примусових транзакцій і запобігання зміні стану сервером до їх обробки. Однак це відкриває нас для простої атаки типу «відмова в обслуговуванні».

Що, якщо примусова транзакція недійсна і, отже, її неможливо обробити? Рішення полягає в тому, щоб мати доказ із нульовим розголошенням, що примусова транзакція недійсна.

- Це дає серверу три варіанти:
- Обробити примусову транзакцію, надавши доказ із нульовим розголошенням, що вона була оброблена, і новий хеш стану.
- Відхилити примусову транзакцію і надати контракту доказ із нульовим розголошенням, що транзакція недійсна (невідома адреса, поганий nonce або недостатній баланс). Ігнорувати примусову транзакцію.

#### Немає способу змусити сервер фактично обробити транзакцію, але це означає, що вся система недоступна.

Гарантії доступності {#avail-bonds} У реальній реалізації, ймовірно, був би якийсь мотив прибутку для підтримки роботи сервера.

### Ми можемо посилити цей стимул, змусивши сервер розміщувати гарантію доступності, яку кожен може спалити, якщо примусова транзакція не буде оброблена протягом певного періоду.

Поганий код Noir {#bad-noir-code} Зазвичай, щоб змусити людей довіряти смарт-контракту, ми завантажуємо вихідний код до [оглядача блоків](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract).

Однак у випадку з доказами з нульовим розголошенням цього недостатньо. `Verifier.sol` містить ключ верифікації, який є функцією програми Noir. Однак цей ключ не говорить нам, якою була програма Noir. Щоб дійсно мати довірене рішення, вам потрібно завантажити програму Noir (і версію, яка її створила).

В іншому випадку докази з нульовим розголошенням можуть відображати іншу програму, з бекдором. Поки оглядачі блоків не дозволять нам завантажувати та перевіряти програми Noir, ви повинні робити це самостійно (бажано в [IPFS](/developers/tutorials/ipfs-decentralized-ui/)).

## Висновок {#conclusion}

Застосунки типу Plasma вимагають централізованого компонента для зберігання інформації. Це створює потенційні вразливості, але, натомість, дозволяє нам зберігати конфіденційність способами, недоступними на самому блокчейні. За допомогою доказів із нульовим розголошенням ми можемо забезпечити цілісність і, можливо, зробити економічно вигідним для того, хто керує централізованим компонентом, підтримувати доступність.

[Більше моїх робіт дивіться тут](https://cryptodocguy.pro/).

## Подяки {#acknowledgements}

- Джош Крайтс прочитав чернетку цієї статті та допоміг мені з каверзним питанням щодо Noir.

Відповідальність за будь-які помилки, що залишилися, лежить на мені.
