---
title: "Написання специфічної для застосунку Плазми, що зберігає приватність"
description: "У цьому посібнику ми створюємо напівтаємний банк для депозитів. Банк є централізованим компонентом; він знає баланс кожного користувача. Однак ця інформація не зберігається ончейн. Натомість банк публікує хеш стану. Щоразу, коли відбувається транзакція, банк публікує новий хеш разом із доведенням з нульовим розголошенням того, що він має підписану транзакцію, яка змінює стан хешу на новий. Після прочитання цього посібника ви зрозумієте не лише те, як використовувати доведення з нульовим розголошенням, але й чому ви їх використовуєте та як робити це безпечно."
author: "Орі Померанц"
tags: ["нульове розголошення", "сервер", "позамережевий", "приватність"]
skill: advanced
breadcrumb: "Специфічна для застосунку Плазма"
lang: uk
published: 2025-10-15
---

## Вступ {#introduction}

На відміну від [ролапів](/developers/docs/scaling/zk-rollups/), [Плазми](/developers/docs/scaling/plasma) використовують головну мережу Ethereum для цілісності, але не для доступності. У цій статті ми пишемо застосунок, який поводиться як Плазма, де Етеріум гарантує цілісність (відсутність несанкціонованих змін), але не доступність (централізований компонент може вийти з ладу і вимкнути всю систему).

Застосунок, який ми тут пишемо, — це банк, що зберігає приватність. Різні адреси мають акаунти з балансами, і вони можуть переказувати гроші (ETH) на інші акаунти. Банк публікує хеші стану (акаунтів та їхніх балансів) і транзакцій, але зберігає фактичні баланси позамережево, де вони можуть залишатися приватними.

## Дизайн {#design}

Це не готова до використання в продакшені система, а навчальний інструмент. Тому вона написана з кількома спрощувальними припущеннями.

- Фіксований пул акаунтів. Існує певна кількість акаунтів, і кожен акаунт належить заздалегідь визначеній адресі. Це робить систему набагато простішою, оскільки в доведеннях з нульовим розголошенням важко обробляти структури даних змінного розміру. Для готової до продакшену системи ми можемо використовувати [корінь Меркла](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) як хеш стану та надавати доведення Меркла для необхідних балансів.

- Зберігання в пам'яті. У робочій системі нам потрібно записувати всі баланси акаунтів на диск, щоб зберегти їх на випадок перезапуску. Тут немає нічого страшного, якщо інформація просто втратиться.

- Лише перекази. Робоча система вимагала б способу внесення активів у банк та їх зняття. Але мета тут полягає лише в ілюстрації концепції, тому цей банк обмежується переказами.

### Доведення з нульовим розголошенням {#zero-knowledge-proofs}

На фундаментальному рівні доведення з нульовим розголошенням показує, що доводжувач знає деякі дані, _Data<sub>private</sub>_, такі, що існує зв'язок _Relationship_ між деякими публічними даними, _Data<sub>public</sub>_, та _Data<sub>private</sub>_. Верифікатор знає _Relationship_ і _Data<sub>public</sub>_.

Щоб зберегти приватність, нам потрібно, щоб стани та транзакції були приватними. Але для забезпечення цілісності нам потрібно, щоб [криптографічний хеш](https://en.wikipedia.org/wiki/Cryptographic_hash_function) станів був публічним. Щоб довести людям, які надсилають транзакції, що ці транзакції дійсно відбулися, нам також потрібно публікувати хеші транзакцій.

У більшості випадків _Data<sub>private</sub>_ є входом для програми доведення з нульовим розголошенням, а _Data<sub>public</sub>_ — виходом.

Ці поля в _Data<sub>private</sub>_:

- _State<sub>n</sub>_, старий стан
- _State<sub>n+1</sub>_, новий стан
- _Transaction_, транзакція, яка змінює старий стан на новий. Ця транзакція повинна включати такі поля:
  - _Destination address_ (адреса призначення), яка отримує переказ
  - _Amount_ (сума), що переказується
  - _Nonce_ (нонс), щоб гарантувати, що кожна транзакція може бути оброблена лише один раз.
    Адреса відправника не обов'язково має бути в транзакції, оскільки її можна відновити з підпису.
- _Signature_ (підпис), підпис, який уповноважений виконувати транзакцію. У нашому випадку єдиною адресою, уповноваженою виконувати транзакцію, є адреса відправника. Оскільки наша система з нульовим розголошенням працює саме так, нам також потрібен відкритий ключ акаунта на додаток до підпису Етеріуму.

Ось поля в _Data<sub>public</sub>_:

- _Hash(State<sub>n</sub>)_ хеш старого стану
- _Hash(State<sub>n+1</sub>)_ хеш нового стану
- _Hash(Transaction)_ хеш транзакції, яка змінює стан з _State<sub>n</sub>_ на _State<sub>n+1</sub>_.

Зв'язок перевіряє кілька умов:

- Публічні хеші дійсно є правильними хешами для приватних полів.
- Транзакція при застосуванні до старого стану призводить до нового стану.
- Підпис походить від адреси відправника транзакції.

Завдяки властивостям криптографічних хеш-функцій доведення цих умов достатньо для забезпечення цілісності.

### Структури даних {#data-structures}

Основною структурою даних є стан, який зберігається на сервері. Для кожного акаунта сервер відстежує баланс акаунта та [нонс](https://en.wikipedia.org/wiki/Cryptographic_nonce), що використовується для запобігання [атакам повторного відтворення](https://en.wikipedia.org/wiki/Replay_attack).

### Компоненти {#components}

Ця система вимагає двох компонентів:

- _Сервер_, який отримує транзакції, обробляє їх і публікує хеші в ланцюг разом із доведеннями з нульовим розголошенням.
- _Смарт-контракт_, який зберігає хеші та перевіряє доведення з нульовим розголошенням, щоб переконатися, що переходи станів є законними.

### Потік даних і керування {#flows}

Ось способи взаємодії різних компонентів для переказу з одного акаунта на інший.

1. Веббраузер надсилає підписану транзакцію із запитом на переказ з акаунта підписанта на інший акаунт.

2. Сервер перевіряє, чи є транзакція дійсною:

   - Підписант має акаунт у банку з достатнім балансом.
   - Одержувач має акаунт у банку.

3. Сервер обчислює новий стан, віднімаючи переказану суму від балансу підписанта та додаючи її до балансу одержувача.

4. Сервер обчислює доведення з нульовим розголошенням того, що зміна стану є дійсною.

5. Сервер надсилає в Етеріум транзакцію, яка включає:

   - Хеш нового стану
   - Хеш транзакції (щоб відправник транзакції міг знати, що вона була оброблена)
   - Доведення з нульовим розголошенням, яке доводить, що перехід до нового стану є дійсним

6. Смарт-контракт перевіряє доведення з нульовим розголошенням.

7. Якщо доведення з нульовим розголошенням успішно перевірено, смарт-контракт виконує такі дії:
   - Оновлює поточний хеш стану на хеш нового стану
   - Випускає лог-запис із хешем нового стану та хешем транзакції

### Інструменти {#tools}

Для клієнтського коду ми будемо використовувати [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) та [Wagmi](https://wagmi.sh/). Це стандартні галузеві інструменти; якщо ви з ними не знайомі, можете скористатися [цим посібником](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Більша частина сервера написана на JavaScript з використанням [Node](https://nodejs.org/en). Частина з нульовим розголошенням написана на [Noir](https://noir-lang.org/). Нам потрібна версія `1.0.0-beta.10`, тому після того, як ви [встановите Noir згідно з інструкціями](https://noir-lang.org/docs/getting_started/quick_start), виконайте:

```
noirup -v 1.0.0-beta.10
```

Блокчейн, який ми використовуємо, — це `anvil`, локальний тестовий блокчейн, який є частиною [Foundry](https://getfoundry.sh/introduction/installation).

## Реалізація {#implementation}

Оскільки це складна система, ми будемо реалізовувати її поетапно.

### Етап 1 - Ручне нульове розголошення {#stage-1}

На першому етапі ми підпишемо транзакцію в браузері, а потім вручну надамо інформацію для доведення з нульовим розголошенням. Код з нульовим розголошенням очікує отримати цю інформацію у файлі `server/noir/Prover.toml` (документація [тут](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Щоб побачити це в дії:

1. Переконайтеся, що у вас встановлені [Node](https://nodejs.org/en/download) та [Noir](https://noir-lang.org/docs/installation). Бажано встановлювати їх на UNIX-системі, такій як macOS, Linux або [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Завантажте код етапу 1 і запустіть вебсервер для обслуговування клієнтського коду.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Причина, чому вам тут потрібен вебсервер, полягає в тому, що для запобігання певним видам шахрайства багато гаманців (наприклад, МетаМаск) не приймають файли, які обслуговуються безпосередньо з диска

3. Відкрийте браузер із гаманцем.

4. У гаманці введіть нову сід-фразу (passphrase). Зауважте, що це видалить вашу поточну сід-фразу, тому _переконайтеся, що у вас є резервна копія_.

   Сід-фраза — `test test test test test test test test test test test junk`, стандартна тестова сід-фраза для anvil.

5. Перейдіть до [клієнтського коду](http://localhost:5173/).

6. Підключіться до гаманця та виберіть акаунт призначення і суму.

7. Натисніть **Sign** (Підписати) і підпишіть транзакцію.

8. Під заголовком **Prover.toml** ви знайдете текст. Замініть вміст `server/noir/Prover.toml` на цей текст.

9. Виконайте доведення з нульовим розголошенням.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Вивід має бути схожим на

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Порівняйте останні два значення з хешем, який ви бачите у веббраузері, щоб перевірити, чи правильно хешується повідомлення.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Цей файл](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) показує формат інформації, який очікує Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Повідомлення має текстовий формат, що полегшує його розуміння користувачем (що необхідно під час підписання) та аналіз кодом Noir. Сума вказується у фіні, щоб, з одного боку, дозволити дробові перекази, а з іншого — бути легко читабельною. Останнє число — це [нонс](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Рядок має довжину 100 символів. Доведення з нульовим розголошенням погано обробляють дані змінного розміру, тому часто необхідно доповнювати дані.

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

Це спосіб вказати масив структур. Для кожного запису ми вказуємо адресу, баланс (у міліETH, тобто [фіні](https://cryptovalleyjournal.com/glossary/finney/)) та наступне значення нонсу.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Цей файл](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) реалізує обробку на стороні клієнта та генерує файл `server/noir/Prover.toml` (той, що містить параметри нульового розголошення).

Ось пояснення найцікавіших частин.

```tsx
export default attrs =>  {
```

Ця функція створює React-компонент `Transfer`, який можуть імпортувати інші файли.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Це адреси акаунтів, адреси, створені сід-фразою `test ... test junk`. Якщо ви хочете використовувати власні адреси, просто змініть це визначення.

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

Це повідомлення, доповнене пробілами. Щоразу, коли одна зі змінних [`useState`](https://react.dev/reference/react/useState) змінюється, компонент перемальовується і `message` оновлюється.

```tsx
  const sign = async () => {
```

Ця функція викликається, коли користувач натискає кнопку **Sign** (Підписати). Повідомлення оновлюється автоматично, але підпис вимагає схвалення користувача в гаманці, і ми не хочемо просити про нього без потреби.

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

Отримайте хеш повідомлення. Корисно надати його користувачеві для налагодження (коду Noir). 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Отримайте відкритий ключ](https://viem.sh/docs/utilities/recoverPublicKey). Це необхідно для функції [`ecrecover` у Noir](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Встановіть змінні стану. Це перемальовує компонент (після завершення функції `sign`) і показує користувачеві оновлені значення.

```tsx
    let proverToml = `
```

Текст для `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem надає нам відкритий ключ у вигляді 65-байтового шістнадцяткового рядка. Перший байт — це `0x04`, маркер версії. За ним ідуть 32 байти для координати `x` відкритого ключа, а потім 32 байти для координати `y` відкритого ключа.

Однак Noir очікує отримати цю інформацію у вигляді двох масивів байтів: одного для `x` і одного для `y`. Легше розпарсити це тут, на клієнті, а не як частину доведення з нульовим розголошенням.

Зверніть увагу, що це загалом є хорошою практикою в системах з нульовим розголошенням. Код усередині доведення з нульовим розголошенням є дорогим, тому будь-яка обробка, яку можна виконати поза доведенням з нульовим розголошенням, _повинна_ виконуватися поза ним.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Підпис також надається у вигляді 65-байтового шістнадцяткового рядка. Однак останній байт потрібен лише для відновлення відкритого ключа. Оскільки відкритий ключ уже буде надано коду Noir, він нам не потрібен для перевірки підпису, і код Noir його не вимагає.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Надайте акаунти.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

Це HTML-формат (точніше, [JSX](https://react.dev/learn/writing-markup-with-jsx)) компонента.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Цей файл](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) є фактичним кодом з нульовим розголошенням.

```
use std::hash::pedersen_hash;
```

[Хеш Педерсена](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) надається зі [стандартною бібліотекою Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Доведення з нульовим розголошенням зазвичай використовують цю хеш-функцію. Її набагато легше обчислити всередині [арифметичних схем](https://rareskills.io/post/arithmetic-circuit) порівняно зі стандартними хеш-функціями.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Ці дві функції є зовнішніми бібліотеками, визначеними в [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Вони роблять саме те, що вказано в їхніх назвах: функція, яка обчислює [хеш keccak256](https://emn178.github.io/online-tools/keccak_256.html), та функція, яка перевіряє підписи Етеріуму і відновлює адресу Етеріуму підписанта.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir натхненний [Rust](https://www.rust-lang.org/). Змінні за замовчуванням є константами. Саме так ми визначаємо глобальні константи конфігурації. Зокрема, `ACCOUNT_NUMBER` — це кількість акаунтів, які ми зберігаємо.

Типи даних з назвою `u<number>` мають відповідну кількість бітів, без знаку. Підтримуються лише типи `u8`, `u16`, `u32`, `u64` та `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Ця змінна використовується для хешу Педерсена акаунтів, як пояснюється нижче.

```
global MESSAGE_LENGTH : u32 = 100;
```

Як пояснювалося вище, довжина повідомлення фіксована. Вона вказується тут.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[Підписи EIP-191](https://eips.ethereum.org/EIPS/eip-191) вимагають буфера з 26-байтовим префіксом, за яким іде довжина повідомлення в ASCII і, нарешті, саме повідомлення.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Інформація, яку ми зберігаємо про акаунт. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) — це число, зазвичай до 253 бітів, яке можна використовувати безпосередньо в [арифметичній схемі](https://rareskills.io/post/arithmetic-circuit), що реалізує доведення з нульовим розголошенням. Тут ми використовуємо `Field` для зберігання 160-бітної адреси Етеріуму.

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

Визначення функції. Параметром є інформація про `Account`. Результатом є масив змінних `Field`, довжина якого дорівнює `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Перше значення в масиві — це адреса акаунта. Друге включає як баланс, так і нонс. Виклики `.into()` змінюють число на потрібний тип даних. `account.nonce` є значенням `u32`, але щоб додати його до `account.balance << 32`, значення `u128`, воно має бути `u128`. Це перший виклик `.into()`. Другий перетворює результат `u128` на `Field`, щоб він помістився в масив.

```
    flat
}
```

У Noir функції можуть повертати значення лише в кінці (раннього повернення немає). Щоб вказати значення, що повертається, ви обчислюєте його безпосередньо перед закриваючою дужкою функції.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Ця функція перетворює масив акаунтів на масив `Field`, який можна використовувати як вхідні дані для хешу Педерсена.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Ось як ви вказуєте змінну, що може змінюватися (mutable), тобто _не_ константу. Змінні в Noir завжди повинні мати значення, тому ми ініціалізуємо цю змінну нулями.

```
    for i in 0..ACCOUNT_NUMBER {
```

Це цикл `for`. Зверніть увагу, що межі є константами. Цикли в Noir повинні мати межі, відомі під час компіляції. Причина полягає в тому, що арифметичні схеми не підтримують керування потоком. Під час обробки циклу `for` компілятор просто вставляє код усередині нього кілька разів, по одному для кожної ітерації.

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

Нарешті, ми дійшли до функції, яка хешує масив акаунтів.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Ця функція знаходить акаунт із певною адресою. Ця функція була б страшенно неефективною в стандартному коді, оскільки вона перебирає всі акаунти, навіть після того, як знайшла адресу.

Однак у доведеннях з нульовим розголошенням немає керування потоком. Якщо нам коли-небудь потрібно перевірити умову, ми повинні перевіряти її щоразу.

Подібна річ відбувається з операторами `if`. Оператор `if` у циклі вище перекладається в такі математичні твердження.

_condition<sub>result</sub> = accounts[i].address == address_ // одиниця, якщо вони рівні, нуль в іншому випадку

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

Функція [`assert`](https://noir-lang.org/docs/language/assert) призводить до збою доведення з нульовим розголошенням, якщо твердження хибне. У цьому випадку, якщо ми не можемо знайти акаунт із відповідною адресою. Для повідомлення адреси ми використовуємо [форматований рядок](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Ця функція застосовує транзакцію переказу та повертає новий масив акаунтів.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Ми не можемо отримати доступ до елементів структури всередині форматованого рядка в Noir, тому ми створюємо придатну для використання копію.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
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

Створіть новий масив акаунтів і поверніть його.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Ця функція зчитує адресу з повідомлення. 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Адреса завжди має довжину 20 байтів (тобто 40 шістнадцяткових цифр) і починається з символу №7.

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

Зчитайте суму та нонс із повідомлення. 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

У повідомленні перше число після адреси — це сума у фіні (тобто тисячних частках ETH) для переказу. Друге число — це нонс. Будь-який текст між ними ігнорується.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // Ми щойно це знайшли
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

Повернення [кортежу (tuple)](https://noir-lang.org/docs/noir/concepts/data_types/tuples) — це спосіб Noir повернути кілька значень з функції.

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
// Еквівалент hashMessage з Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Ми змогли використати хеш Педерсена для акаунтів, оскільки вони хешуються лише всередині доведення з нульовим розголошенням. Однак у цьому коді нам потрібно перевірити підпис повідомлення, який генерується браузером. Для цього нам потрібно дотримуватися формату підписання Етеріуму у [EIP-191](https://eips.ethereum.org/EIPS/eip-191). Це означає, що нам потрібно створити комбінований буфер зі стандартним префіксом, довжиною повідомлення в ASCII та самим повідомленням, і використати стандартний для Етеріуму keccak256 для його хешування.

```rust
    // Префікс ASCII
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

Щоб уникнути випадків, коли застосунок просить користувача підписати повідомлення, яке може бути використане як транзакція або для якоїсь іншої мети, EIP-191 вказує, що всі підписані повідомлення починаються з символу 0x19 (недійсний символ ASCII), за яким іде `Ethereum Signed Message:` та новий рядок.

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

Обробляйте довжину повідомлення до 999 і завершуйте з помилкою, якщо вона більша. Я додав цей код, хоча довжина повідомлення є константою, оскільки це полегшує її зміну. У робочій системі ви, ймовірно, просто припустили б, що `MESSAGE_LENGTH` не змінюється задля кращої продуктивності.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Використовуйте стандартну функцію Етеріуму `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // адреса, перші 16 байтів хешу, останні 16 байтів хешу        
{
```

Ця функція перевіряє підпис, для чого потрібен хеш повідомлення. Потім вона надає нам адресу, яка його підписала, і хеш повідомлення. Хеш повідомлення надається у двох значеннях `Field`, оскільки їх легше використовувати в решті програми, ніж масив байтів.

Нам потрібно використовувати два значення `Field`, оскільки обчислення в полі виконуються за [модулем](https://en.wikipedia.org/wiki/Modulo) великого числа, але це число зазвичай менше ніж 256 бітів (інакше було б важко виконувати ці обчислення в EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Вкажіть `hash1` та `hash2` як змінні, що можуть змінюватися (mutable), і запишіть у них хеш побайтово.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
Це схоже на [`ecrecover` у Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), з двома важливими відмінностями:

- Якщо підпис недійсний, виклик не проходить перевірку `assert`, і програма переривається.
- Хоча відкритий ключ можна відновити з підпису та хешу, це обробка, яку можна виконати ззовні, і тому її не варто робити всередині доведення з нульовим розголошенням. Якщо хтось спробує обдурити нас тут, перевірка підпису завершиться невдало.

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
        Field,  // Хеш масиву старих акаунтів
        Field,  // Хеш масиву нових акаунтів
        Field,  // Перші 16 байтів хешу повідомлення
        Field,  // Останні 16 байтів хешу повідомлення
    )
```

Нарешті, ми досягаємо функції `main`. Нам потрібно довести, що у нас є транзакція, яка дійсно змінює хеш акаунтів зі старого значення на нове. Нам також потрібно довести, що вона має саме цей хеш транзакції, щоб особа, яка її надіслала, знала, що її транзакція була оброблена.

```rust
{
    let mut txn = readTransferTxn(message);
```

Нам потрібно, щоб `txn` була змінною (mutable), оскільки ми не зчитуємо адресу відправника з повідомлення, ми зчитуємо її з підпису. 

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

### Етап 2 - Додавання сервера {#stage-2}

На другому етапі ми додаємо сервер, який отримує та реалізує транзакції переказу з браузера.

Щоб побачити це в дії:

1. Зупиніть Vite, якщо він запущений.

2. Завантажте гілку, яка включає сервер, і переконайтеся, що у вас є всі необхідні модулі.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Немає потреби компілювати код Noir, це той самий код, який ви використовували для етапу 1.

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

6. Перш ніж ви зможете виконати транзакцію, вам потрібно знати нонс, а також суму, яку ви можете надіслати. Щоб отримати цю інформацію, натисніть **Update account data** (Оновити дані акаунта) і підпишіть повідомлення.

   Тут у нас дилема. З одного боку, ми не хочемо підписувати повідомлення, яке можна використати повторно ([атака повторного відтворення](https://en.wikipedia.org/wiki/Replay_attack)), саме тому нам насамперед потрібен нонс. Однак у нас ще немає нонсу. Рішення полягає в тому, щоб вибрати нонс, який можна використати лише один раз і який ми вже маємо з обох сторін, наприклад, поточний час.

   Проблема з цим рішенням полягає в тому, що час може бути не ідеально синхронізований. Тому натомість ми підписуємо значення, яке змінюється щохвилини. Це означає, що наше вікно вразливості до атак повторного відтворення становить щонайбільше одну хвилину. З огляду на те, що в продакшені підписаний запит буде захищений за допомогою TLS, а інша сторона тунелю — сервер — вже може розкрити баланс і нонс (він повинен їх знати для роботи), це прийнятний ризик.

7. Щойно браузер отримає баланс і нонс, він покаже форму переказу. Виберіть адресу призначення та суму і натисніть **Transfer** (Переказати). Підпишіть цей запит.

8. Щоб побачити переказ, або натисніть **Update account data** (Оновити дані акаунта), або подивіться у вікно, де запущено сервер. Сервер записує стан у лог щоразу, коли він змінюється.

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

[Цей файл](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) містить процес сервера та взаємодіє з кодом Noir у [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Ось пояснення цікавих частин.

```js
import { Noir } from '@noir-lang/noir_js'
```

Бібліотека [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) є інтерфейсом між кодом JavaScript та кодом Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Завантажте арифметичну схему — скомпільовану програму Noir, яку ми створили на попередньому етапі, — і підготуйте її до виконання.

```js
// Ми надаємо інформацію про акаунт лише у відповідь на підписаний запит
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Щоб надати інформацію про акаунт, нам потрібен лише підпис. Причина полягає в тому, що ми вже знаємо, яким буде повідомлення, а отже, і хеш повідомлення.

```js
const processMessage = async (message, signature) => {
```

Обробіть повідомлення та виконайте транзакцію, яку воно кодує.

```js
    // Отримати відкритий ключ
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Тепер, коли ми запускаємо JavaScript на сервері, ми можемо отримати відкритий ключ там, а не на клієнті.

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

`noir.execute` запускає програму Noir. Параметри еквівалентні тим, що надані в [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Зверніть увагу, що довгі значення надаються як масив шістнадцяткових рядків (`["0x60", "0xA7"]`), а не як одне шістнадцяткове значення (`0x60A7`), як це робить Viem.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Якщо виникає помилка, перехопіть її, а потім передайте спрощену версію клієнту.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Застосуйте транзакцію. Ми вже зробили це в коді Noir, але легше зробити це знову тут, ніж витягувати результат звідти.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Початкова структура `Accounts`.

### Етап 3 - Смарт-контракти Етеріуму {#stage-3}

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

4. Згенеруйте ключ верифікації та верифікатор Solidity, а потім скопіюйте код верифікатора в проєкт Solidity.

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

   Значення `0x199..67b` — це хеш Педерсена початкового стану `Accounts`. Якщо ви зміните цей початковий стан у `server/index.mjs`, ви можете виконати транзакцію, щоб побачити початковий хеш, про який повідомляє доведення з нульовим розголошенням.

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

11. Щоб переконатися, що стан змінився ончейн, перезапустіть процес сервера. Переконайтеся, що `ZkBank` більше не приймає транзакції, оскільки початкове значення хешу в транзакціях відрізняється від значення хешу, що зберігається ончейн.

    Ось тип помилки, який очікується.

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

Зміни в цьому файлі стосуються здебільшого створення фактичного доведення та його надсилання ончейн.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Нам потрібно використати [пакет Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg), щоб створити фактичне доведення для надсилання ончейн. Ми можемо використовувати цей пакет або запустивши інтерфейс командного рядка (`bb`), або використовуючи [бібліотеку JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). Бібліотека JavaScript працює набагато повільніше, ніж нативний код, тому тут ми використовуємо [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) для використання командного рядка.

Зверніть увагу, що якщо ви все ж вирішите використовувати `bb.js`, вам потрібно використовувати версію, яка сумісна з версією Noir, яку ви використовуєте. На момент написання статті поточна версія Noir (1.0.0-beta.11) використовує `bb.js` версії 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Адреса тут — це та, яку ви отримуєте, коли починаєте з чистого `anvil` і дотримуєтесь вказівок вище.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Цей приватний ключ є одним із попередньо поповнених акаунтів за замовчуванням у `anvil`. 

```js
const generateProof = async (witness, fileID) => {
```

Згенеруйте доведення за допомогою виконуваного файлу `bb`.

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Запишіть свідка у файл.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Фактично створіть доведення. Цей крок також створює файл із публічними змінними, але він нам не потрібен. Ми вже отримали ці змінні з `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Доведення — це JSON-масив значень `Field`, кожне з яких представлено як шістнадцяткове значення. Однак нам потрібно надіслати його в транзакції як єдине значення `bytes`, яке Viem представляє у вигляді великого шістнадцяткового рядка. Тут ми змінюємо формат, об'єднуючи всі значення, видаляючи всі `0x` і потім додаючи одне в кінці.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Очистіть і поверніть доведення.

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

Кожна адреса використовує кожен нонс лише один раз, щоб ми могли використовувати комбінацію `fromAddress` та `nonce` як унікальний ідентифікатор для файлу свідка та вихідного каталогу.

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

Надішліть транзакцію в ланцюг.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Це ончейн-код, який отримує транзакцію.

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

Ончейн-коду потрібно відстежувати дві змінні: верифікатор (окремий контракт, який створюється за допомогою `nargo`) і поточний хеш стану.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Щоразу, коли стан змінюється, ми випускаємо подію `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Ця функція обробляє транзакції. Вона отримує доведення (як `bytes`) і публічні вхідні дані (як масив `bytes32`) у форматі, який вимагає верифікатор (щоб мінімізувати ончейн-обробку, а отже, і витрати газу).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

Доведення з нульовим розголошенням має підтверджувати, що транзакція змінює наш поточний хеш на новий.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Викличте контракт верифікатора, щоб перевірити доведення з нульовим розголошенням. Цей крок скасовує транзакцію, якщо доведення з нульовим розголошенням є неправильним.

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

Якщо все перевірено успішно, оновіть хеш стану до нового значення та випустіть подію `TransactionProcessed`.

## Зловживання з боку централізованого компонента {#abuses}

Інформаційна безпека складається з трьох атрибутів:

- _Конфіденційність_: користувачі не можуть читати інформацію, на читання якої вони не мають дозволу.
- _Цілісність_: інформація не може бути змінена, окрім як авторизованими користувачами в дозволений спосіб.
- _Доступність_: авторизовані користувачі можуть використовувати систему.

У цій системі цілісність забезпечується за допомогою доведень з нульовим розголошенням. Доступність гарантувати набагато важче, а конфіденційність неможлива, оскільки банк повинен знати баланс кожного акаунта та всі транзакції. Неможливо завадити суб'єкту, який володіє інформацією, поділитися цією інформацією.

Можливо, вдасться створити дійсно конфіденційний банк за допомогою [прихованих адрес (stealth addresses)](https://vitalik.eth.limo/general/2023/01/20/stealth.html), але це виходить за рамки цієї статті.

### Неправдива інформація {#false-info}

Один зі способів, яким сервер може порушити цілісність, — це надання неправдивої інформації під час [запиту даних](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Щоб вирішити цю проблему, ми можемо написати другу програму Noir, яка отримує акаунти як приватні вхідні дані, а адресу, для якої запитується інформація, — як публічні вхідні дані. На виході ми отримаємо баланс і нонс цієї адреси, а також хеш акаунтів.

Звісно, це доведення не може бути перевірено ончейн, оскільки ми не хочемо публікувати нонси та баланси ончейн. Однак воно може бути перевірено клієнтським кодом, що працює в браузері.

### Примусові транзакції {#forced-txns}

Звичайним механізмом забезпечення доступності та запобігання цензурі на L2 є [примусові транзакції](https://docs.optimism.io/stack/transactions/forced-transaction). Але примусові транзакції не поєднуються з доведеннями з нульовим розголошенням. Сервер є єдиною сутністю, яка може перевіряти транзакції.

Ми можемо змінити `smart-contracts/src/ZkBank.sol`, щоб він приймав примусові транзакції та запобігав зміні стану сервером до їхньої обробки. Однак це відкриває нас для простої атаки типу «відмова в обслуговуванні» (DoS). Що, якщо примусова транзакція є недійсною і тому її неможливо обробити?

Рішення полягає в тому, щоб мати доведення з нульовим розголошенням того, що примусова транзакція є недійсною. Це дає серверу три варіанти:

- Обробити примусову транзакцію, надавши доведення з нульовим розголошенням того, що її було оброблено, та хеш нового стану.
- Відхилити примусову транзакцію та надати контракту доведення з нульовим розголошенням того, що транзакція є недійсною (невідома адреса, неправильний нонс або недостатній баланс).
- Проігнорувати примусову транзакцію. Немає способу змусити сервер фактично обробити транзакцію, але це означає, що вся система недоступна.

#### Застави доступності {#avail-bonds}

У реальній реалізації, ймовірно, був би якийсь мотив прибутку для підтримки роботи сервера. Ми можемо посилити цей стимул, змусивши сервер внести заставу доступності, яку будь-хто може спалити, якщо примусова транзакція не буде оброблена протягом певного періоду.

### Поганий код Noir {#bad-noir-code}

Зазвичай, щоб змусити людей довіряти смарт-контракту, ми завантажуємо вихідний код в [оглядач блоків](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Однак у випадку доведень з нульовим розголошенням цього недостатньо.

`Verifier.sol` містить ключ верифікації, який є функцією програми Noir. Однак цей ключ не говорить нам, якою була програма Noir. Щоб дійсно мати надійне рішення, вам потрібно завантажити програму Noir (і версію, яка її створила). Інакше доведення з нульовим розголошенням можуть відображати іншу програму, з бекдором.

Поки оглядачі блоків не дозволять нам завантажувати та перевіряти програми Noir, вам слід робити це самостійно (бажано в [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Тоді досвідчені користувачі зможуть завантажити вихідний код, самостійно скомпілювати його, створити `Verifier.sol` і переконатися, що він ідентичний тому, що знаходиться ончейн.

## Висновок {#conclusion}

Застосунки типу Плазма вимагають централізованого компонента як сховища інформації. Це відкриває потенційні вразливості, але натомість дозволяє нам зберігати приватність способами, які недоступні в самому блокчейні. За допомогою доведень з нульовим розголошенням ми можемо забезпечити цілісність і, можливо, зробити економічно вигідним для того, хто керує централізованим компонентом, підтримувати доступність.

[Дивіться тут більше моїх робіт](https://cryptodocguy.pro/).

## Подяки {#acknowledgements}

- Джош Крайтс (Josh Crites) прочитав чернетку цієї статті та допоміг мені зі складною проблемою Noir.

За будь-які помилки, що залишилися, відповідаю я.
