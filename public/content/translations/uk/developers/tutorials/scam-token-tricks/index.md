---
title: "Деякі хитрощі, які використовують шахрайські токени, та як їх виявити"
description: "У цьому посібнику ми розбираємо шахрайський токен, щоб побачити деякі хитрощі, до яких вдаються шахраї, як вони їх реалізують і як ми можемо їх виявити."
author: "Орі Померанц"
tags: ["шахрайство", "Solidity", "erc-20", "JavaScript", "TypeScript"]
skill: intermediate
breadcrumb: "Хитрощі шахрайських токенів"
published: 2023-09-15
lang: uk
---

У цьому посібнику ми розбираємо [шахрайський токен](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), щоб побачити деякі хитрощі, до яких вдаються шахраї, і як вони їх реалізують. До кінця посібника ви матимете більш повне уявлення про контракти токенів ERC-20, їхні можливості та чому необхідний скептицизм. Потім ми розглянемо події, які генерує цей шахрайський токен, і побачимо, як ми можемо автоматично визначити, що він не є легітимним.

## Шахрайські токени — що це таке, навіщо їх створюють і як їх уникнути {#scam-tokens}

Одне з найпоширеніших застосувань Етеріуму — це створення групою людей токена для торгівлі, у певному сенсі власної валюти. Однак скрізь, де є легітимні варіанти використання, що приносять цінність, є також злочинці, які намагаються вкрасти цю цінність для себе.

Ви можете прочитати більше на цю тему [в інших розділах ethereum.org](/guides/how-to-id-scam-tokens/) з точки зору користувача. Цей посібник зосереджений на розборі шахрайського токена, щоб побачити, як це робиться і як його можна виявити.

### Звідки мені знати, що wARB — це шахрайство? {#warb-scam}

Токен, який ми розбираємо, — це [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), який прикидається еквівалентом легітимного [токена ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

Найпростіший спосіб дізнатися, який токен є легітимним, — подивитися на організацію-розробника, [Arbitrum](https://arbitrum.foundation/). Легітимні адреси вказані [в їхній документації](https://docs.arbitrum.foundation/deployment-addresses#token).

### Чому вихідний код доступний? {#why-source}

Зазвичай ми очікуємо, що люди, які намагаються обдурити інших, будуть потайливими, і дійсно, багато шахрайських токенів не мають відкритого коду (наприклад, [цей](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) і [цей](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Однак легітимні токени зазвичай публікують свій вихідний код, тому, щоб здаватися легітимними, автори шахрайських токенів іноді роблять те саме. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) — один із таких токенів із доступним вихідним кодом, що полегшує його розуміння.

Хоча розгортачі контрактів можуть вибирати, публікувати вихідний код чи ні, вони _не можуть_ опублікувати неправильний вихідний код. Оглядач блоків компілює наданий вихідний код незалежно, і якщо він не отримує точно такий самий байт-код, він відхиляє цей вихідний код. [Ви можете прочитати більше про це на сайті Etherscan](https://etherscan.io/verifyContract).

## Порівняння з легітимними токенами ERC-20 {#compare-legit-erc20}

Ми збираємося порівняти цей токен із легітимними токенами ERC-20. Якщо ви не знайомі з тим, як зазвичай пишуться легітимні токени ERC-20, [перегляньте цей посібник](/developers/tutorials/erc20-annotated-code/).

### Константи для привілейованих адрес {#constants-for-privileged-addresses}

Контрактам іноді потрібні привілейовані адреси. Контракти, розроблені для довгострокового використання, дозволяють певній привілейованій адресі змінювати ці адреси, наприклад, щоб уможливити використання нового контракту з мультипідписом. Існує кілька способів зробити це.

[Контракт токена `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) використовує патерн [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Привілейована адреса зберігається у сховищі, у полі під назвою `_owner` (див. третій файл, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[Контракт токена `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) не має привілейованої адреси безпосередньо. Однак вона йому і не потрібна. Він знаходиться за [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) за [адресою `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Цей контракт має привілейовану адресу (див. четвертий файл, `ERC1967Upgrade.sol`), яка може бути використана для оновлень.

```solidity
    /**
     * @dev Зберігає нову адресу у слоті адміністратора EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Натомість контракт `wARB` має жорстко закодовану `contract_owner`.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[Цей власник контракту](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) — це не контракт, який міг би контролюватися різними акаунтами в різний час, а [зовнішній акаунт](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Це означає, що він, імовірно, розроблений для короткострокового використання однією особою, а не як довгострокове рішення для контролю над ERC-20, який залишатиметься цінним.

І дійсно, якщо ми подивимося в Etherscan, то побачимо, що шахрай використовував цей контракт лише 12 годин (від [першої транзакції](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) до [останньої транзакції](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) протягом 19 травня 2023 року.

### Фейкова функція `_transfer` {#the-fake-transfer-function}

Стандартною практикою є здійснення фактичних переказів за допомогою [внутрішньої функції `_transfer`](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

У `wARB` ця функція виглядає майже легітимною:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Підозрілою частиною є:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Якщо власник контракту надсилає токени, чому подія `Transfer` показує, що вони надходять від `deployer`?

Однак є більш важлива проблема. Хто викликає цю функцію `_transfer`? Її не можна викликати ззовні, вона позначена як `internal`. І код, який ми маємо, не містить жодних викликів `_transfer`. Очевидно, вона тут як приманка.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

Коли ми дивимося на функції, які викликаються для переказу токенів, `transfer` та `transferFrom`, ми бачимо, що вони викликають зовсім іншу функцію, `_f_`.

### Справжня функція `_f_` {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

У цій функції є два потенційні тривожні сигнали.

- Використання [модифікатора функції](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Однак, коли ми заглядаємо у вихідний код, ми бачимо, що `_mod_` насправді нешкідливий.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Та сама проблема, яку ми бачили в `_transfer`, а саме: коли `contract_owner` надсилає токени, здається, що вони надходять від `deployer`.

### Фейкова функція подій `dropNewTokens` {#the-fake-events-function-dropnewtokens}

Тепер ми підійшли до того, що виглядає як справжнє шахрайство. Я трохи відредагував функцію для зручності читання, але функціонально вона еквівалентна.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Ця функція має модифікатор `auth()`, що означає, що її може викликати лише власник контракту.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Це обмеження має цілковитий сенс, оскільки ми б не хотіли, щоб випадкові акаунти розповсюджували токени. Однак решта функції є підозрілою.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Функція для переказу з пулового акаунта на масив одержувачів масиву сум має цілковитий сенс. Існує багато варіантів використання, коли ви захочете розподілити токени з одного джерела до кількох місць призначення, наприклад, для виплати заробітної плати, аірдропів тощо. Це дешевше (у газі) зробити в одній транзакції замість того, щоб ініціювати кілька транзакцій, або навіть викликати ERC-20 кілька разів з іншого контракту в рамках тієї ж транзакції.

Однак `dropNewTokens` цього не робить. Вона генерує [події `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), але насправді не переказує жодних токенів. Немає жодної легітимної причини плутати позамережеві застосунки, повідомляючи їм про переказ, якого насправді не було.

### Функція спалювання `Approve` {#the-burning-approve-function}

Контракти ERC-20 повинні мати [функцію `approve`](/developers/tutorials/erc20-annotated-code/#approve) для дозволів, і дійсно, наш шахрайський токен має таку функцію, і вона навіть правильна. Однак, оскільки Solidity походить від C, він чутливий до регістру. «Approve» та «approve» — це різні рядки.

Крім того, функціональність не пов'язана зі `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Ця функція викликається з масивом адрес власників токена.

```solidity
    public approver() {
```

Модифікатор `approver()` гарантує, що лише `contract_owner` дозволено викликати цю функцію (див. нижче).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Для кожної адреси власника функція переміщує весь баланс власника на адресу `0x00...01`, фактично спалюючи його (справжня функція `burn` у стандарті також змінює загальну пропозицію та переказує токени на `0x00...00`). Це означає, що `contract_owner` може вилучити активи будь-якого користувача. Це не схоже на функцію, яку ви хотіли б бачити в токені управління.

### Проблеми з якістю коду {#code-quality-issues}

Ці проблеми з якістю коду не _доводять_, що цей код є шахрайством, але вони роблять його підозрілим. Організовані компанії, такі як Arbitrum, зазвичай не випускають настільки поганий код.

#### Функція `mount` {#the-mount-function}

Хоча це не вказано в [стандарті](https://eips.ethereum.org/EIPS/eip-20), загалом функція, яка створює нові токени, називається [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Якщо ми подивимося в конструктор `wARB`, то побачимо, що функція карбування з якоїсь причини була перейменована на `mount` і викликається п'ять разів з п'ятою частиною початкової пропозиції, замість одного разу для всієї суми задля ефективності.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

Сама функція `mount` також є підозрілою.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Дивлячись на `require`, ми бачимо, що карбувати дозволено лише власнику контракту. Це легітимно. Але повідомлення про помилку має бути _only owner is allowed to mint_ (лише власнику дозволено карбувати) або щось подібне. Натомість це нерелевантне _ERC20: mint to the zero address_ (ERC20: карбування на нульову адресу). Правильна перевірка для карбування на нульову адресу — це `require(account != address(0), "<error message>")`, яку контракт навіть не намагається перевірити.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Є ще два підозрілі факти, безпосередньо пов'язані з карбуванням:

- Існує параметр `account`, який, імовірно, є акаунтом, що має отримати викарбувану суму. Але баланс, який збільшується, насправді належить `contract_owner`.

- Хоча збільшений баланс належить `contract_owner`, згенерована подія показує переказ на `account`.

### Навіщо і `auth`, і `approver`? Навіщо `mod`, який нічого не робить? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Цей контракт містить три модифікатори: `_mod_`, `auth` та `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` приймає три параметри і нічого з ними не робить. Навіщо він потрібен?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` та `approver` мають більше сенсу, оскільки вони перевіряють, що контракт був викликаний `contract_owner`. Ми очікували б, що певні привілейовані дії, такі як карбування, будуть обмежені цим акаунтом. Однак який сенс мати дві окремі функції, які роблять _абсолютно те саме_?

## Що ми можемо виявити автоматично? {#what-can-we-detect-automatically}

Ми можемо побачити, що `wARB` є шахрайським токеном, подивившись на Etherscan. Однак це централізоване рішення. Теоретично Etherscan може бути скомпрометований або зламаний. Краще мати можливість самостійно з'ясувати, чи є токен легітимним, чи ні.

Існують деякі хитрощі, які ми можемо використати, щоб визначити, що токен ERC-20 є підозрілим (або шахрайським, або дуже погано написаним), подивившись на події, які він генерує.

## Підозрілі події `Approval` {#suspicious-approval-events}

[Події `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) повинні відбуватися лише за прямого запиту (на відміну від [подій `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), які можуть відбуватися в результаті дозволу). [Дивіться документацію Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) для детального пояснення цієї проблеми та того, чому запити мають бути прямими, а не опосередкованими контрактом.

Це означає, що події `Approval`, які схвалюють витрати із [зовнішнього акаунта](/developers/docs/accounts/#types-of-account), повинні надходити від транзакцій, які ініціюються в цьому акаунті, і місцем призначення яких є контракт ERC-20. Будь-який інший вид схвалення від зовнішнього акаунта є підозрілим.

Ось [програма, яка ідентифікує цей тип подій](https://github.com/qbzzt/20230915-scam-token-detection), використовуючи [Viem](https://viem.sh/) та [TypeScript](https://www.typescriptlang.org/docs/), варіант JavaScript із безпекою типів. Щоб запустити її:

1. Скопіюйте `.env.example` у `.env`.
2. Відредагуйте `.env`, щоб надати URL-адресу вузла головної мережі Ethereum.
3. Запустіть `pnpm install`, щоб встановити необхідні пакети.
4. Запустіть `pnpm susApproval`, щоб знайти підозрілі схвалення.

Ось пояснення рядок за рядком:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

Імпортуйте визначення типів, функції та визначення ланцюга з `viem`.

```typescript
import { config } from "dotenv"
config()
```

Прочитайте `.env`, щоб отримати URL-адресу.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Створіть клієнт Viem. Нам потрібно лише читати з блокчейну, тому цьому клієнту не потрібен приватний ключ.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Адреса підозрілого контракту ERC-20 та блоки, у межах яких ми шукатимемо події. Провайдери вузлів зазвичай обмежують нашу здатність читати події, оскільки пропускна здатність може бути дорогою. На щастя, `wARB` не використовувався протягом вісімнадцяти годин, тому ми можемо переглянути всі події (загалом їх було лише 13).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Це спосіб запитати у Viem інформацію про подію. Коли ми надаємо йому точну сигнатуру події, включно з іменами полів, він аналізує подію для нас.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Наш алгоритм застосовний лише до зовнішніх акаунтів. Якщо `client.getBytecode` повертає будь-який байт-код, це означає, що це контракт, і ми повинні просто пропустити його.

Якщо ви раніше не використовували TypeScript, визначення функції може здатися трохи дивним. Ми не просто кажемо йому, що перший (і єдиний) параметр називається `addr`, але й те, що він має тип `Address`. Подібним чином частина `: boolean` повідомляє TypeScript, що значення, яке повертає функція, є логічним (boolean).

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Ця функція отримує квитанцію транзакції з події. Нам потрібна квитанція, щоб переконатися, що ми знаємо, яким було місце призначення транзакції.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Це найважливіша функція, яка власне вирішує, чи є подія підозрілою, чи ні. Тип повернення, `(Event | null)`, повідомляє TypeScript, що ця функція може повертати або `Event`, або `null`. Ми повертаємо `null`, якщо подія не є підозрілою.

```typescript
const owner = ev.args._owner
```

Viem має імена полів, тому він проаналізував подію для нас. `_owner` — це власник токенів, які будуть витрачені.

```typescript
// Схвалення контрактами не є підозрілими
if (await isContract(owner)) return null
```

Якщо власником є контракт, припускаємо, що це схвалення не є підозрілим. Щоб перевірити, чи є схвалення контракту підозрілим, нам потрібно буде відстежити повне виконання транзакції, щоб побачити, чи дійшла вона коли-небудь до контракту власника, і чи викликав цей контракт контракт ERC-20 безпосередньо. Це набагато більш ресурсомістко, ніж ми хотіли б робити.

```typescript
const txn = await getEventTxn(ev)
```

Якщо схвалення надходить від зовнішнього акаунта, отримайте транзакцію, яка його викликала.

```typescript
// Схвалення є підозрілим, якщо воно надходить від власника EOA, який не є `from` транзакції
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Ми не можемо просто перевірити рівність рядків, оскільки адреси є шістнадцятковими, тому вони містять літери. Іноді, наприклад у `txn.from`, ці літери всі малі. В інших випадках, таких як `ev.args._owner`, адреса має [змішаний регістр для ідентифікації помилок](https://eips.ethereum.org/EIPS/eip-55).

Але якщо транзакція не від власника, і цей власник є зовнішнім акаунтом, то ми маємо підозрілу транзакцію.

```typescript
// Також підозріло, якщо призначенням транзакції не є контракт ERC-20, який ми
// досліджуємо
if (txn.to.toLowerCase() != testedAddress) return ev
```

Подібним чином, якщо адреса `to` транзакції, перший викликаний контракт, не є досліджуваним контрактом ERC-20, то вона є підозрілою.

```typescript
    // Якщо немає причин для підозр, поверніть null.
    return null
}
```

Якщо жодна з умов не є істинною, то подія `Approval` не є підозрілою.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Функція `async`](https://www.w3schools.com/js/js_async.asp) повертає об'єкт `Promise`. Зі звичайним синтаксисом, `await x()`, ми чекаємо на виконання цього `Promise`, перш ніж продовжити обробку. Це просто запрограмувати та відстежити, але це також неефективно. Поки ми чекаємо на виконання `Promise` для конкретної події, ми вже можемо почати працювати над наступною подією.

Тут ми використовуємо [`map`](https://www.w3schools.com/jsref/jsref_map.asp) для створення масиву об'єктів `Promise`. Потім ми використовуємо [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/), щоб дочекатися вирішення всіх цих промісів. Після цього ми застосовуємо [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) до цих результатів, щоб видалити непідозрілі події.

### Підозрілі події `Transfer` {#suspicious-transfer-events}

Інший можливий спосіб ідентифікувати шахрайські токени — перевірити, чи є в них підозрілі перекази. Наприклад, перекази з акаунтів, які не мають такої кількості токенів. Ви можете побачити, [як реалізувати цей тест](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), але `wARB` не має цієї проблеми.

## Висновок {#conclusion}

Автоматизоване виявлення шахрайства з ERC-20 страждає від [хибнонегативних результатів](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), оскільки шахрайство може використовувати абсолютно нормальний контракт токена ERC-20, який просто не представляє нічого реального. Тому вам завжди слід намагатися _отримувати адресу токена з надійного джерела_.

Автоматизоване виявлення може допомогти в певних випадках, наприклад, у компонентах децентралізованих фінансів (DeFi), де є багато токенів і їх потрібно обробляти автоматично. Але, як завжди, [нехай покупець буде пильним](https://www.investopedia.com/terms/c/caveatemptor.asp) (caveat emptor), проводьте власні дослідження та заохочуйте своїх користувачів робити те саме.

[Дивіться тут більше моїх робіт](https://cryptodocguy.pro/).