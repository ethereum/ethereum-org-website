---
title: "Деякі прийоми, що використовуються в шахрайських токенах, і як їх виявити"
description: "У цьому посібнику ми розберемо шахрайський токен, щоб побачити деякі з прийомів, до яких вдаються шахраї, як вони їх реалізують, і як ми можемо їх виявити."
author: Ori Pomerantz
tags:
  [
    "шахрайство",
    "мова програмування",
    "erc-20",
    "javaScript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: uk
---

У цьому посібнику ми розберемо [шахрайський токен](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), щоб побачити деякі з прийомів, до яких вдаються шахраї та як вони їх реалізують. Наприкінці посібника ви матимете більш повне уявлення про контракти токенів ERC-20, їхні можливості та чому необхідний скептицизм. Потім ми розглянемо події, що генеруються цим шахрайським токеном, і побачимо, як можна автоматично визначити, що він не є легітимним.

## Шахрайські токени: що це таке, навіщо їх створюють і як їх уникнути {#scam-tokens}

Одне з найпоширеніших застосувань Ethereum – це створення групою осіб торгового токена, у певному сенсі – своєї власної валюти. Однак скрізь, де є законні способи використання, що приносять вигоду, завжди з’являються злочинці, які намагаються вкрасти її.

Ви можете прочитати більше на цю тему [в іншому місці на ethereum.org](/guides/how-to-id-scam-tokens/) з точки зору користувача. Цей посібник присвячено розбору шахрайського токена, щоб побачити, як він створений і як його можна виявити.

### Як дізнатися, що wARB — це шахрайський токен? {#warb-scam}

Токен, який ми розбираємо, — це [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), що видає себе за еквівалент легітимного [токена ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

Найпростіший спосіб дізнатися, який токен є легітимним, — це подивитися на організацію-засновника, [Arbitrum](https://arbitrum.foundation/). Легітимні адреси вказані [в їхній документації](https://docs.arbitrum.foundation/deployment-addresses#token).

### Чому вихідний код доступний? {#why-source}

Зазвичай ми очікуємо, що люди, які намагаються обдурити інших, будуть потайними, і справді, багато шахрайських токенів не мають доступного коду (наприклад, [цей](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) і [цей](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Однак легітимні токени зазвичай публікують свій вихідний код, тому, щоб здаватися легітимними, автори шахрайських токенів іноді роблять те саме. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) — один із тих токенів, вихідний код яких доступний, що полегшує його розуміння.

Хоча розробники контракту можуть обирати, публікувати вихідний код чи ні, вони _не можуть_ опублікувати неправильний вихідний код. Оглядач блоків незалежно компілює наданий вихідний код, і якщо не отримує точно такий самий байт-код, він відхиляє цей вихідний код. [Ви можете прочитати більше про це на сайті Etherscan](https://etherscan.io/verifyContract).

## Порівняння з легітимними токенами ERC-20 {#compare-legit-erc20}

Ми порівняємо цей токен з легітимними токенами ERC-20. Якщо ви не знайомі з тим, як зазвичай пишуться легітимні токени ERC-20, [перегляньте цей посібник](/developers/tutorials/erc20-annotated-code/).

### Константи для привілейованих адрес {#constants-for-privileged-addresses}

Контрактам іноді потрібні привілейовані адреси. Контракти, розроблені для довгострокового використання, дозволяють деяким привілейованим адресам змінювати ці адреси, наприклад, щоб увімкнути використання нового контракту з мультипідписом. Існує кілька способів це зробити.

[Контракт токена `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) використовує патерн [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Привілейована адреса зберігається в сховищі, в полі під назвою `_owner` (див. третій файл, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[Контракт токена `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) не має привілейованої адреси безпосередньо. Однак він йому й не потрібен. Він знаходиться за [`проксі`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) за [адресою `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Цей контракт має привілейовану адресу (див. четвертий файл, `ERC1967Upgrade.sol`), яка може використовуватися для оновлень.

```solidity
    /**
     * @dev Зберігає нову адресу в слоті адміністратора EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: новий адміністратор — це нульова адреса");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Натомість, контракт `wARB` має жорстко закодованого `contract_owner`.

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

[Цей власник контракту](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) — це не контракт, яким могли б керувати різні облікові записи в різний час, а [зовнішній обліковий запис](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Це означає, що він, імовірно, розроблений для короткострокового використання окремою особою, а не як довгострокове рішення для контролю ERC-20, що залишатиметься цінним.

І справді, якщо ми подивимося на Etherscan, то побачимо, що шахрай використовував цей контракт лише 12 годин (від [першої транзакції](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) до [останньої транзакції](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) 19 травня 2023 року.

### Підроблена функція `_transfer` {#the-fake-transfer-function}

Стандартною практикою є виконання фактичних переказів за допомогою [внутрішньої функції `_transfer`](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

У `wARB` ця функція виглядає майже легітимною:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: переказ із нульової адреси");
        require(recipient != address(0), "ERC20: переказ на нульову адресу");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: сума переказу перевищує баланс");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Підозріла частина:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Якщо власник контракту надсилає токени, чому подія `Transfer` показує, що вони надходять від `deployer`?

Однак є більш важлива проблема. Хто викликає цю функцію `_transfer`? Її не можна викликати ззовні, оскільки вона позначена як `internal`. І код, який у нас є, не містить жодних викликів `_transfer`. Очевидно, що вона тут для відводу очей.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: сума переказу перевищує дозволену"));
        return true;
    }
```

Коли ми дивимося на функції, які викликаються для переказу токенів, `transfer` і `transferFrom`, ми бачимо, що вони викликають зовсім іншу функцію, `_f_`.

### Справжня функція `_f_` {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: переказ із нульової адреси");
        require(recipient != address(0), "ERC20: переказ на нульову адресу");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: сума переказу перевищує баланс");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

У цій функції є два потенційно підозрілі моменти.

- Використання [модифікатора функції](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Однак, коли ми заглядаємо у вихідний код, ми бачимо, що `_mod_` насправді нешкідливий.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Та сама проблема, яку ми бачили в `_transfer`: коли `contract_owner` надсилає токени, вони виглядають так, ніби надходять від `deployer`.

### Функція підроблених подій `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Тепер ми підійшли до чогось, що виглядає як справжнє шахрайство. Я трохи відредагував функцію для кращої читабельності, але функціонально вона еквівалентна.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Ця функція має модифікатор `auth()`, що означає, що її може викликати лише власник контракту.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Взаємодія заборонена");
    _;
}
```

Це обмеження є цілком логічним, оскільки ми б не хотіли, щоб випадкові облікові записи розповсюджували токени. Однак решта функції є підозрілою.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Функція для переказу з облікового запису пулу масиву отримувачів масиву сум є цілком логічною. Існує багато випадків використання, у яких ви захочете розподілити токени з одного джерела на кілька одержувачів, наприклад, для виплати зарплати, ейрдропів тощо. Це дешевше (за газ) зробити в одній транзакції, замість того, щоб створювати кілька транзакцій або навіть викликати ERC-20 кілька разів з іншого контракту в рамках однієї транзакції.

Однак, `dropNewTokens` цього не робить. Вона генерує [`події `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), але насправді не переказує жодних токенів. Немає жодної легітимної причини вводити в оману позаланцюгові застосунки, повідомляючи їм про переказ, якого насправді не було.

### Функція `Approve`, що спалює токени {#the-burning-approve-function}

Контракти ERC-20 повинні мати [функцію `approve`](/developers/tutorials/erc20-annotated-code/#approve) для дозволів, і справді, наш шахрайський токен має таку функцію, і вона навіть правильна. Однак, оскільки Solidity походить від C, він чутливий до регістру. «Approve» та «approve» — це різні рядки.

Крім того, функціональність не пов'язана з `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Ця функція викликається з масивом адрес власників токенів.

```solidity
    public approver() {
```

Модифікатор `approver()` гарантує, що лише `contract_owner` може викликати цю функцію (див. нижче).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: спалювана сума перевищує баланс");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Для кожної адреси власника функція переміщує весь баланс власника на адресу `0x00...01`, фактично спалюючи його (справжній `burn` у стандарті також змінює загальну пропозицію та переказує токени на `0x00...00`). Це означає, що `contract_owner` може видаляти активи будь-якого користувача. Це не схоже на функцію, яку ви хотіли б бачити в токені управління.

### Проблеми з якістю коду {#code-quality-issues}

Ці проблеми з якістю коду не _доводять_, що цей код є шахрайським, але вони роблять його підозрілим. Організовані компанії, такі як Arbitrum, зазвичай не випускають такий поганий код.

#### Функція `mount` {#the-mount-function}

Хоча це не вказано в [стандарті](https://eips.ethereum.org/EIPS/eip-20), загалом кажучи, функція, що створює нові токени, називається [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Якщо ми подивимося в конструктор `wARB`, ми побачимо, що функцію карбування з якоїсь причини перейменовано на `mount` і викликається п’ять разів з п’ятою частиною початкової пропозиції, замість одного разу для всієї суми для ефективності.

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

Сама функція `mount` також підозріла.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: карбування на нульову адресу");
```

Дивлячись на `require`, ми бачимо, що лише власнику контракту дозволено карбувати токени. Це легітимно. Але повідомлення про помилку має бути _карбувати може лише власник_ або щось подібне. Натомість, це недоречне _ERC20: карбування на нульову адресу_. Правильна перевірка для карбування на нульову адресу — це `require(account != address(0), "<повідомлення про помилку>")`, яку контракт ніколи не перевіряє.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Є ще два підозрілих факти, безпосередньо пов'язаних з карбуванням:

- Є параметр `account`, який, імовірно, є обліковим записом, що повинен отримати накарбовану суму. Але баланс, що збільшується, насправді належить `contract_owner`.

- Хоча збільшений баланс належить `contract_owner`, згенерована подія показує переказ на `account`.

### Навіщо і `auth`, і `approver`? Навіщо `mod`, який нічого не робить? Чи впливає це оновлення на всі вузли та валідаторів Ethereum? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Цей контракт містить три модифікатори: `_mod_`, `auth` і `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` приймає три параметри і нічого з ними не робить. Навіщо він потрібен?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Взаємодія заборонена");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Взаємодія заборонена");
        _;
    }
```

`auth` та `approver` мають більше сенсу, тому що вони перевіряють, що контракт був викликаний `contract_owner`. Ми очікували б, що певні привілейовані дії, такі як карбування, будуть обмежені цим обліковим записом. Однак, який сенс мати дві окремі функції, які роблять _точно те саме_?

## Що ми можемо виявити автоматично? {#what-can-we-detect-automatically}

Ми можемо побачити, що `wARB` — це шахрайський токен, подивившись на Etherscan. Однак це централізоване рішення. Теоретично, Etherscan може бути підроблений або зламаний. Краще вміти самостійно з'ясувати, чи є токен легітимним чи ні.

Є кілька прийомів, які ми можемо використовувати, щоб визначити, що токен ERC-20 є підозрілим (або шахрайським, або дуже погано написаним), подивившись на події, які вони генерують.

## Підозрілі події `Approval` {#suspicious-approval-events}

[`Події `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) повинні відбуватися лише за прямим запитом (на відміну від [`подій `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), які можуть відбуватися в результаті дозволу). [Дивіться документацію Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) для детального пояснення цієї проблеми та того, чому запити мають бути прямими, а не опосередкованими контрактом.

Це означає, що події `Approval`, які дозволяють витрачати кошти із [зовнішнього облікового запису](/developers/docs/accounts/#types-of-account), мають походити від транзакцій, які походять з цього облікового запису, і чиїм пунктом призначення є контракт ERC-20. Будь-який інший вид дозволу із зовнішнього облікового запису є підозрілим.

Ось [програма, яка ідентифікує цей тип подій](https://github.com/qbzzt/20230915-scam-token-detection), використовуючи [viem](https://viem.sh/) і [TypeScript](https://www.typescriptlang.org/docs/), варіант JavaScript з безпекою типів. Щоб запустити її:

1. Скопіюйте `.env.example` до `.env`.
2. Відредагуйте `.env`, щоб надати URL-адресу вузла основної мережі Ethereum.
3. Запустіть `pnpm install`, щоб встановити необхідні пакунки.
4. Запустіть `pnpm susApproval`, щоб знайти підозрілі дозволи.

Ось пояснення по рядках:

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

Імпортуйте визначення типів, функцій та визначення ланцюжка з `viem`.

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

Адреса підозрілого контракту ERC-20 та блоки, в межах яких ми будемо шукати події. Провайдери вузлів зазвичай обмежують нашу можливість читати події, оскільки пропускна здатність може бути дорогою. На щастя, `wARB` не використовувався протягом вісімнадцяти годин, тому ми можемо шукати всі події (їх було лише 13).

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

Це спосіб запитати інформацію про події у Viem. Коли ми надаємо точний підпис події, включаючи назви полів, він розбирає подію для нас.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Наш алгоритм застосовується лише до зовнішніх облікових записів. Якщо `client.getBytecode` повертає будь-який байт-код, це означає, що це контракт, і ми повинні просто пропустити його.

Якщо ви раніше не використовували TypeScript, визначення функції може виглядати трохи дивно. Ми не просто говоримо, що перший (і єдиний) параметр називається `addr`, але також, що він має тип `Address`. Аналогічно, частина `: boolean` повідомляє TypeScript, що значення, яке повертає функція, є логічним.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Ця функція отримує квитанцію про транзакцію з події. Нам потрібна квитанція, щоб переконатися, що ми знаємо, яким був пункт призначення транзакції.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Це найважливіша функція, та, що насправді вирішує, чи є подія підозрілою чи ні. Тип повернення `(Event | null)` повідомляє TypeScript, що ця функція може повертати або `Event`, або `null`. Ми повертаємо `null`, якщо подія не є підозрілою.

```typescript
const owner = ev.args._owner
```

Viem має назви полів, тому він розібрав подію для нас. `_owner` — це власник токенів, які будуть витрачені.

```typescript
// Дозволи від контрактів не є підозрілими
if (await isContract(owner)) return null
```

Якщо власником є контракт, припустимо, що цей дозвіл не є підозрілим. Щоб перевірити, чи є дозвіл контракту підозрілим, нам потрібно буде простежити повне виконання транзакції, щоб побачити, чи дійшла вона до контракту власника, і чи цей контракт викликав контракт ERC-20 безпосередньо. Це набагато більш ресурсоємно, ніж ми хотіли б робити.

```typescript
const txn = await getEventTxn(ev)
```

Якщо дозвіл надходить із зовнішнього облікового запису, отримайте транзакцію, яка його спричинила.

```typescript
// Дозвіл є підозрілим, якщо він надходить від власника EOA, який не є полем «from» транзакції
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Ми не можемо просто перевіряти на рівність рядків, оскільки адреси є шістнадцятковими, тому вони містять літери. Іноді, наприклад, у `txn.from`, ці літери всі в нижньому регістрі. В інших випадках, наприклад, у `ev.args._owner`, адреса має [змішаний регістр для ідентифікації помилок](https://eips.ethereum.org/EIPS/eip-55).

Але якщо транзакція не від власника, і цей власник є зовнішнім, то ми маємо підозрілу транзакцію.

```typescript
// Це також підозріло, якщо пункт призначення транзакції не є контрактом ERC-20, який ми
// розслідуємо
if (txn.to.toLowerCase() != testedAddress) return ev
```

Аналогічно, якщо адреса `to` транзакції, тобто перший викликаний контракт, не є контрактом ERC-20, що розслідується, то вона є підозрілою.

```typescript
    // Якщо немає причин для підозр, поверніть null.
    return null
}
```

Якщо жодна з умов не виконується, то подія `Approval` не є підозрілою.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Функція `async`](https://www.w3schools.com/js/js_async.asp) повертає об’єкт `Promise`. Зі звичайним синтаксисом, `await x()`, ми чекаємо, поки цей `Promise` буде виконано, перш ніж продовжити обробку. Це просто програмувати і відстежувати, але це також неефективно. Поки ми чекаємо, поки `Promise` для конкретної події буде виконано, ми вже можемо працювати над наступною подією.

Тут ми використовуємо [`map`](https://www.w3schools.com/jsref/jsref_map.asp), щоб створити масив об’єктів `Promise`. Потім ми використовуємо [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/), щоб дочекатися, поки всі ці проміси будуть вирішені. Потім ми [`фільтруємо`](https://www.w3schools.com/jsref/jsref_filter.asp) ці результати, щоб видалити непідозрілі події.

### Підозрілі події `Transfer` {#suspicious-transfer-events}

Інший можливий спосіб ідентифікації шахрайських токенів — це перевірити, чи є у них підозрілі перекази. Наприклад, перекази з облікових записів, які не мають такої великої кількості токенів. Ви можете побачити, [як реалізувати цей тест](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), але `wARB` не має цієї проблеми.

## Висновок {#conclusion}

Автоматичне виявлення шахрайства з ERC-20 страждає від [хибнонегативних результатів](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), тому що шахрайство може використовувати абсолютно нормальний контракт токена ERC-20, який просто не представляє нічого реального. Тому ви завжди повинні намагатися _отримувати адресу токена з надійного джерела_.

Автоматичне виявлення може допомогти в певних випадках, наприклад, у DeFi, де є багато токенів і їх потрібно обробляти автоматично. Але, як завжди, [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp) (покупець, будь обережним), проводьте власне дослідження та заохочуйте своїх користувачів робити те саме.

[Більше моїх робіт дивіться тут](https://cryptodocguy.pro/).
