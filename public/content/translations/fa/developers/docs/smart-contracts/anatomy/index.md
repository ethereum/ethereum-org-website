---
title: آناتومی قراردادهای هوشمند
description: یک نگاه عمیق به آناتومی قرارداد هوشمند - توابع، داده‌ها و متغیرها.
lang: fa
---

قرارداد هوشمند برنامه ای است که در آدرسی در اتریوم اجرا می شود. آنها از داده ها و توابعی تشکیل شده اند که می توانند هنگام دریافت تراکنش اجرا شوند. در اینجا یک نمای کلی از آنچه که یک قرارداد هوشمند را تشکیل می دهد آورده شده است.

## پیش‌نیازها {#prerequisites}

مطمئن شوید که ابتدا درباره‌ [قراردادهای هوشمند](/developers/docs/smart-contracts/) بخوانید. این سند فرض می کند که شما قبلاً با زبان های برنامه نویسی مانند جاوا اسکریپت یا پایتون آشنا هستید.

## داده‌‌ها {#data}

هر گونه داده‌ قرارداد باید به مکانی اختصاص داده شود: یا به `حافظه` یا `مموری`. تغییر فضای ذخیره‌سازی در یک قرارداد هوشمند پرهزینه است، بنابراین باید در نظر بگیرید که داده های شما در کجا قرار دارند.

### ذخیره‌سازی {#storage}

داده های پایدار به عنوان ذخیره‌سازی نامیده می شوند و با متغیرهای وضعیت نمایش داده می شوند. این مقادیر به طور دائم در زنجیره بلوکی ذخیره می شوند. باید نوع آن را اعلام کنید تا قرارداد بتواند در هنگام کامپایل کردن زنجیره بلوکی میزان فضای ذخیره‌سازی مورد نیاز خود را پیگیری کند.

```solidity
// Solidity example
contract SimpleStorage {
    uint storedData; // State variable
    // ...
}
```

```python
# Vyper example
storedData: int128
```

اگر قبلاً زبان های شی‌گرا را برنامه ریزی کرده اید، احتمالاً با بیشتر انواع آن آشنا خواهید بود. با این حال، اگر در توسعه اتریوم تازه‌کار هستید، `آدرس` باید برای شما جدید باشد.

یک نوع `آدرس` می‌تواند یک آدرس اتریوم را که برابر با 20 بایت یا 160 بیت است، در خود جای دهد. در نماد هگزادسیمال (مبنای ۱۶) با 0x در ابتدا برمی گردد.

انواع دیگر شامل موارد زیر است:

- Boolean
- عدد صحیح
- اعداد با نقطه ثابت
- آرایه بایتی با سایز ثابت
- آرایه بایتی با سایز پویا
- لیترال صحیح و منطقی
- لیترال‌های رشته‌ای
- اعداد هگز
- اینام ها

برای توضیحات بیشتر نگاهی به اسناد بیاندازید:

- [نوع‌های Vyper را ببینید](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [نوع‌های Solidity را ببینید](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### مموری {#memory}

مقادیری که فقط برای طول عمر اجرای یک تابع قرارداد ذخیره می شوند، متغیرهای مموری نامیده می شوند. از آنجایی که این ها به طور دائم در زنجیره بلوکی ذخیره نمی شوند، استفاده از آنها بسیار ارزان‌تر است.

در [مستندات Solidity](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack) درباره‌ی چگونگی نگهداری داده‌ها (حافظه، مموری و پشته) در ماشین مجازی اتریوم بیاموزید.

### متغیرهای محیطی {#environment-variables}

علاوه بر متغیرهایی که در قرارداد خود تعریف می کنید، چند متغیر جهانی ویژه نیز وجود دارد. آنها در درجه اول برای ارائه اطلاعات در مورد زنجیره بلوکی یا تراکنش فعلی استفاده می شوند.

مثال ها:

| **ابزار**         | **متغیر حالت** | **توضیح**                      |
| ----------------- | -------------- | ------------------------------ |
| `block.timestamp` | uint256        | برچسب زمان ایپوک بلوک فعلی     |
| `msg.sender`      | آدرس           | فرستنده‌ی پیام (فراخوانی فعلی) |

## توابع {#functions}

به ساده‌ترین شکل، توابع می‌توانند اطلاعات دریافت کنند یا اطلاعات را در پاسخ به تراکنش‌های دریافتی تنظیم کنند.

دو نوع فراخوانی تابع وجود دارد:

- `داخلی` - این‌ها یک فراخوانی ماشین مجازی اتریوم را نمی‌سازند
  - توابع داخلی و متغیرهای حالت فقط به صورت داخلی قابل دسترسی هستند (یعنی از داخل قرارداد فعلی یا قراردادهای ناشی از آن)
- `خارجی` - این‌ها یک فراخوان ماشین مجازی اتریوم را می‌سازند
  - توابع خارجی بخشی از رابط قرارداد هستند، به این معنی که می توان آنها را از قراردادهای دیگر و از طریق تراکنش ها فراخوانی کرد. یک تابع خارجی `f` نمی‌تواند به صورت داخلی فراخوانی شود (یعنی `f()` کار نمی‌کند اما `this.f()` کار می‌کند.

توابع می‌توانند `عمومی` یا `خصوصی` باشند

- توابع `عمومی` می‌توانند به صورت داخلی از داخل قرارداد و به صورت خارجی با پیام‌ها فراخوانی شوند
- توابع `خصوصی` فقط برای خود قرارداد قابل مشاهده هستند و دیگر قراردادها آن را نمی‌بینند

هم تابع ها و هم متغیرهای حالت را می توان عمومی یا خصوصی کرد

در اینجا یک تابع برای به روز رسانی یک متغیر حالت در یک قرارداد آمده است:

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- پارامتر `value` از نوع `رشته` به تابع `update_name` داده می‌شود
- به شکل `عمومی` اعلام شده، به این معنی که هر کسی می‌تواند به آن دسترسی داشته باشد
- به شکل `view` اعلام نشده، بنابراین می تواند وضعیت قرارداد را تغییر دهد

### توابع View {#view-functions}

این توابع قرار است وضعیت داده های قرارداد را تغییر ندهند. مثال‌های رایج توابع «getter» هستند – برای مثال می‌توانید از آن برای دریافت موجودی کاربر استفاده کنید.

```solidity
// Solidity example
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

آنچه حالت اصلاحی در نظر گرفته می شود:

1. نوشتن بر روی متغیرهای حالت.
2. [بیرون دادن رویدادها](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events).
3. [ساختن دیگر قراردادها](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. استفاده از `selfdestruct`.
5. فرستادن اتر از طریق فراخوانی‌ها.
6. فراخوانی هر تابعی که `view` یا `pure` نباشد.
7. استفاده از فراخوانی‌های سطح پایین.
8. استفاده از اسمبلی به صورت درخط که شامل کدگذاری های خاصی باشد.

### توابع سازنده {#constructor-functions}

توابع `constructor` فقط یک بار زمانی که قرارداد برای اولین بار ساخته می‌شود اجرا می‌شوند. مانند `constructor` در بسیاری از زبان های برنامه نویسی مبتنی بر کلاس، این توابع اغلب متغیرهای حالت را به مقادیر مشخص شده خود مقداردهی اولیه می کنند.

```solidity
// Solidity example
// Initializes the contract's data, setting the `owner`
// to the address of the contract creator.
constructor() public {
    // All smart contracts rely on external transactions to trigger its functions.
    // `msg` is a global variable that includes relevant data on the given transaction,
    // such as the address of the sender and the ETH value included in the transaction.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper example

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### توابع Built-in {#built-in-functions}

علاوه بر متغیرها و توابعی که در قرارداد خود تعریف می کنید، چند تابع داخلی ویژه نیز وجود دارد. بدیهی‌ترین مثال این است:

- `address.send()` - Solidity
- `send(address)` – Vyper

اینها به قراردادها اجازه می دهد اتر را به حساب های دیگر ارسال کنند.

## توابع Writing {#writing-functions}

تابع شما به موارد زیر نیاز دارد:

- متغیر پارامتر و نوع (در صورت پذیرش پارامترها)
- اعلامیه داخلی/خارجی
- اعلامیه‌ی خالص/نما/قابل پرداخت
- نوع بازگشت ها ( اگر که مقداری را برمی‌گرداند)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // state variable

    // Called when the contract is deployed and initializes the value
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get Function
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set Function
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

یک قرارداد کامل ممکن است چیزی شبیه به این باشد. در اینجا تابع `constructor` یک مقدار اولیه برای متغیر `dapp_name` ارائه می‌کند.

## رویدادها و گزارش‌ها {#events-and-logs}

رویدادها، قراردادهای هوشمند شما را قادر به برقراری ارتباط با فرانت اند یا سایر اپلیکیشن هایی که نیاز به کسب اطلاع از وقایع درون قرارداد هوشمند دارند می کنند. هنگامی که یک تراکنش اعتبارسنجی شده و به یک بلاک اضافه می شود، قراردادهای هوشمند می توانند رویدادها را نمایش داده و اصطلاحاً ساتع کنند و لاگ اطلاعات را چاپ کنند، بدین ترتیب فرانت اند می تواند اطلاعاتی که ساتع شده را پردازش کرده و آن را به کار بگیرد.

## نمونه های مشروح {#annotated-examples}

اینها نمونه هایی هستند که در Solidity نوشته شده اند. اگر می‌خواهید با کد بازی کنید، می‌توانید در [Remix](http://remix.ethereum.org) با آنها تعامل داشته باشید.

### سلام دنیا {#hello-world}

```solidity
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state).
// Once deployed, a contract resides at a specific address on the Ethereum blockchain.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declares a state variable `message` of type `string`.
    // State variables are variables whose values are permanently stored in contract storage.
    // The keyword `public` makes variables accessible from outside a contract
    // and creates a function that other contracts or clients can call to access the value.
    string public message;

    // Similar to many class-based object-oriented languages, a constructor is
    // a special function that is only executed upon contract creation.
    // Constructors are used to initialize the contract's data.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Accepts a string argument `initMessage` and sets the value
        // into the contract's `message` storage variable).
        message = initMessage;
    }

    // A public function that accepts a string argument
    // and updates the `message` storage variable.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### توکن {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // An `address` is comparable to an email address - it's used to identify an account on Ethereum.
    // Addresses can represent a smart contract or an external (user) accounts.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // A `mapping` is essentially a hash table data structure.
    // This `mapping` assigns an unsigned integer (the token balance) to an address (the token holder).
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Events allow for logging of activity on the blockchain.
    // Ethereum clients can listen for events in order to react to contract state changes.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Initializes the contract's data, setting the `owner`
    // to the address of the contract creator.
    constructor() public {
        // All smart contracts rely on external transactions to trigger its functions.
        // `msg` is a global variable that includes relevant data on the given transaction,
        // such as the address of the sender and the ETH value included in the transaction.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Creates an amount of new tokens and sends them to an address.
    function mint(address receiver, uint amount) public {
        // `require` is a control structure used to enforce certain conditions.
        // If a `require` statement evaluates to `false`, an exception is triggered,
        // which reverts all changes made to the state during the current call.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Only the contract owner can call this function
        require(msg.sender == owner, "You are not the owner.");

        // Enforces a maximum amount of tokens
        require(amount < 1e60, "Maximum issuance exceeded");

        // Increases the balance of `receiver` by `amount`
        balances[receiver] += amount;
    }

    // Sends an amount of existing tokens from any caller to an address.
    function transfer(address receiver, uint amount) public {
        // The sender must have enough tokens to send
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Adjusts token balances of the two addresses
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emits the event defined earlier
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### دارایی دیجیتال منحصربفرد {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Imports symbols from other files into the current contract.
// In this case, a series of helper contracts from OpenZeppelin.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// The `is` keyword is used to inherit functions and keywords from external contracts.
// In this case, `CryptoPizza` inherits from the `IERC721` and `ERC165` contracts.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Uses OpenZeppelin's SafeMath library to perform arithmetic operations safely.
    // Learn more: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Constant state variables in Solidity are similar to other languages
    // but you must assign from an expression which is constant at compile time.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct types let you define your own type
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Creates an empty array of Pizza structs
    Pizza[] public pizzas;

    // Mapping from pizza ID to its owner's address
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping from owner's address to number of owned token
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping from token ID to approved address
    mapping(uint256 => address) pizzaApprovals;

    // You can nest mappings, this example maps owner to operator approvals
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Internal function to create a random Pizza from string (name) and DNA
    function _createPizza(string memory _name, uint256 _dna)
        // The `internal` keyword means this function is only visible
        // within this contract and contracts that derive this contract
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` is a function modifier that checks if the pizza already exists
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Adds Pizza to array of Pizzas and get id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Checks that Pizza owner is the same as current user
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // note that address(0) is the zero address,
        // indicating that pizza[id] is not yet allocated to a particular user.

        assert(pizzaToOwner[id] == address(0));

        // Maps the Pizza to the owner
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Creates a random Pizza from string (name)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generates random DNA from string (name) and address of the owner (creator)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Functions marked as `pure` promise not to read from or modify the state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generates random uint from string (name) + address (owner)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Returns array of Pizzas found by owner
    function getPizzasByOwner(address _owner)
        public
        // Functions marked as `view` promise not to modify state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Uses the `memory` storage location to store values only for the
        // lifecycle of this function call.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Transfers Pizza and ownership to other address
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emits event defined in the imported IERC721 contract
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * Internal function to invoke `onERC721Received` on a target address
     * The call is not executed if the target address is not a contract
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // Burns a Pizza - destroys Token completely
    // The `external` function modifier means this function is
    // part of the contract interface and other contracts can call it
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Returns count of Pizzas by address
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Returns owner of the Pizza found by id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Approves other address to transfer ownership of Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Returns approved address for specific Pizza
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Private function to clear current approval of a given token ID
     * Reverts if the given address is not indeed the owner of the token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Sets or unsets the approval of a given operator
     * An operator is allowed to transfer all tokens of the sender on their behalf
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Tells whether an operator is approved by a given owner
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Takes ownership of Pizza - only for approved users
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Checks if Pizza exists
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Checks if address is owner or is approved to transfer Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Check if Pizza is unique and doesn't exist yet
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza with such name already exists.");
        _;
    }

    // Returns whether the target address is a contract
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Currently there is no better way to check if there is a contract in an address
        // than to check the size of the code at that address.
        // به https://ethereum.stackexchange.com/a/14016/36603 مراجعه کنید
         // برای جزئیات بیشتر در مورد نحوه کار این.
        // TODO قبل از انتشار Serenity دوباره این مورد را بررسی کنید، زیرا همه آدرس ها خواهند بود
         // سپس قرارداد می بندد.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## بیشتر بخوانید {#further-reading}

برای بررسی کاملتر قراردادهای هوشمند، مستندات Solidity و Vyper را بررسی کنید:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## موضوعات مرتبط {#related-topics}

- [قرارداد‌های هوشمند](/developers/docs/smart-contracts/)
- [ماشین مجازی اتریوم](/developers/docs/evm/)

## آموزش‌های مرتبط {#related-tutorials}

- [کوچک کردن قراردادها برای مبارزه با محدودیت اندازه قرارداد](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _ – چند نکته کاربردی برای کاهش اندازه قرارداد هوشمند شما._
- [گزارش داده‌های قراردادهای هوشمند با رویدادها](/developers/tutorials/logging-events-smart-contracts/) _– مقدمه‌ای بر رویدادهای قرارداد هوشمند و چگونگی استفاده از آنها برای ثبت داده ها_
- [تعامل با سایر قراردادهای Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– نحوه استقرار هوشمند قرارداد از یک قرارداد موجود و تعامل با آن._
