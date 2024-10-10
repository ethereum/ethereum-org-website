---
title: 详解智能合约
description: 深入解读智能合约：函数、数据和变量。
lang: zh
---

智能合约是一种在以太坊某个地址上运行的程序。 它们是由数据和函数组成的，可以在收到交易时执行。 以下概述一个智能合约的组成。

## 前提条件 {#prerequisites}

确保你已经先阅读了[智能合约](/developers/docs/smart-contracts/)。 本文档假设你已经熟悉某种编程语言，例如 JavaScript 或 Python。

## 数据 {#data}

任何合约数据必须分配到一个位置：要么是`存储`，要么是`内存`。 在智能合约中修改存储消耗很大，因此你需要考虑数据在哪里存取。

### 存储 {#storage}

持久性数据被称之为存储，由状态变量表示。 这些值被永久地存储在区块链上。 你需要声明一个类型，以便于合约在编译时可以跟踪它在区块链上需要多少存储。

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

如果用过面向对象编程语言，应该会熟悉大多数类型。 但如果是刚接触以太坊开发，则会发现 `address` 是一个新类型。

一个 `address` 类型可以容纳一个以太坊地址，相当于 20 个字节或 160 位。 它以十六进制的形式返回，前导是 0x。

其它类型包括：

- 布尔
- 整数（integer）
- 定点数（fixed point numbers）
- 固定大小的字节数组（fixed-size byte arrays）
- 动态大小的字节数组（dynamically-sized byte arrays）
- 有理数和整数常量（Rational and integer literals）
- 字符常量（String literals）
- 十六进制常量（Hexadecimal literals）
- 枚举（Enums）

了解更多信息，请参阅文档：

- [查看 Vyper 类型](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [查看 Solidity 类型](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### 内存 {#memory}

仅在合约函数执行期间存储的值被称为内存变量。 由于这些变量不是永久地存储在区块链上，所以它们的使用成本要低得多。

在 [Solidity 文档](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack)中了解更多关于以太坊虚拟机如何存储数据（存储、内存和栈）。

### 环境变量 {#environment-variables}

除了在自己合约上定义的变量之外，还有一些特殊的全局变量。 它们主要用于提供有关区块链或当前交易的信息。

示例：

| **属性**            | **状态变量** | **描述**       |
| ----------------- | -------- | ------------ |
| `block.timestamp` | uint256  | 当前区块的时间戳     |
| `msg.sender`      | 地址       | 消息的发送者（当前调用） |

## 函数 {#functions}

用最简单的术语来说，函数可以获得信息或设置信息，以响应传入的交易。

有两种函数调用方式：

- `internal` – 不会创建以太坊虚拟机调用
  - Internal 函数和状态变量只能在内部访问（只能在合约内部或者从其继承的合约内部访问）。
- `external` – 会创建以太坊虚拟机调用
  - External 函数是合约接口的一部分，这意味着他可以被其它合约和交易调用。 一个 external 函数 `f` 不可以被内部调用（即 `f()` 不行，但 `this.f()` 可以）。

它们可以是 `public` 或 `private`

- `public` 函数可以在合约内部调用或者通过消息在合约外部调用
- `private` 函数仅在其被定义的合约内部可见，并且在该合约的派生合约中不可见。

函数和状态变量都可以被定义为 public 或 private

下面是更新合约上一个状态变量的函数：

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` 类型的参数 `value` 传入函数 `update_name`
- 函数声明为 `public`，意味着任何人都能访问它
- 函数没有被声明为 `view`，因此它可以修改合约状态

### 视图函数 {#view-functions}

这些函数保证不会修改合约数据的状态。 常见的示例是 "getter" 函数 - 例如，它可以用于接收用户的余额。

```solidity
// Solidity 示例
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

这些操作被视为修改状态：

1. 写入状态变量。
2. [正在导出事件](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events)。
3. [创建其它合约](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts)。
4. 使用 `selfdestruct`。
5. 通过调用发送 ether。
6. 调用任何未标记为 `view` 或 `pure` 的函数。
7. 使用底层调用。
8. 使用包含某些操作码的内联程序组。

### 构造函数 {#constructor-functions}

`constructor` 函数只在首次部署合约时执行一次。 与许多基于类的编程语言中的 `constructor` 函数类似，这些函数常将状态变量初始化到指定的值。

```solidity
// Solidity 示例
// 初始化合约数据，设置 `owner`为合约的创建者。
constructor() public {
    // 所有智能合约依赖外部交易来触发其函数。
    // `msg` 是一个全局变量，包含了给定交易的相关数据，
    // 例如发送者的地址和交易中包含的 ETH 数量。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper 示例

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### 内置函数 {#built-in-functions}

除了自己在合约中定义的变量和函数外，还有一些特殊的内置函数。 最明显的例子是：

- `address.send()` – Solidity
- `send(address)` – Vyper

这使合约可以发送以太币给其它帐户。

## 编写函数 {#writing-functions}

你的函数需要：

- 参数变量及其类型（如果它接受参数）
- 声明为 internal/external
- 声明为 pure/view/payable
- 返回类型（如果它返回值）

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

一个完整的合约可能就是这样。 在这里，`constructor` 函数为 `dapp_name` 变量提供了初始化值。

## 事件和日志 {#events-and-logs}

事件让你的智能合约能够与前端或其他订阅应用程序进行通信。 一旦交易被验证并添加到区块中，智能合约就可以触发事件并记录信息，然后前端就可以处理和利用这些信息。

## 附带注解的示例 {#annotated-examples}

这是一些用 Solidity 写的例子。 如果希望运行这些代码，你可以在 [Remix](http://remix.ethereum.org) 中调试。

### Hello world {#hello-world}

```solidity
// Specifies the version of Solidity, using semantic versioning.
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// 定义合约名称 `HelloWorld`。
// 一个合约是函数和数据（其状态）的集合。
// 一旦部署，合约就会留在以太坊区块链的一个特定地址上。
// 了解更多： https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // 定义`string`类型变量 `message`
    // 状态变量是其值永久存储在合约存储中的变量。
    // 关键字 `public` 使得可以从合约外部访问。
    // 并创建了一个其它合约或客户端可以调用访问该值的函数。
    string public message;

    // 类似于很多基于类的面向对象语言，
    // 构造函数是仅在合约创建时执行的特殊函数。
    // 构造器用于初始化合约的数据。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // 接受一个字符变量 `initMessage` 
        // 并为合约的存储变量`message` 赋值
        message = initMessage;
    }

    // 一个 public 函数接受字符参数并更新存储变量 `message`
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### 代币 {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // 一个 `address` 类比于邮件地址 - 它用来识别以太坊的一个帐户。
    // 地址可以代表一个智能合约或一个外部（用户）帐户。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    //  `mapping` 是一个哈希表数据结构。
    // 此 `mapping` 将一个无符号整数（代币余额）分配给地址（代币持有者）。
    // 了解更多： https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // 事件允许在区块链上记录活动。
    // 以太坊客户端可以监听事件，以便对合约状态更改作出反应。
    // 了解更多： https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // 初始化合约数据，设置 `owner`为合约创建者的地址。
    constructor() public {
        // 所有智能合约依赖外部交易来触发其函数。
        // `msg` 是一个全局变量，包含了给定交易的相关数据，
        // 例如发送者的地址和包含在交易中的 ETH 数量。
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // 创建一些新代币并发送给一个地址。
    function mint(address receiver, uint amount) public {
        // `require` 是一个用于强制执行某些条件的控制结构。
        // 如果 `require` 的条件为 `false`，则异常被触发，
        // 所有在当前调用中对状态的更改将被还原。
        // 学习更多: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 只有合约创建人可以调用这个函数
        require(msg.sender == owner, "You are not the owner.");

        // 强制执行代币的最大数量
        require(amount < 1e60, "Maximum issuance exceeded");

        // 将 "收款人"的余额增加"金额"
        balances[receiver] += amount;
    }

    // 从任何调用者那里发送一定数量的代币到一个地址。
    function transfer(address receiver, uint amount) public {
        // 发送者必须有足够数量的代币用于发送
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // 调整两个帐户的余额
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // 触发之前定义的事件。
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### 唯一的数字资产 {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// 从其它文件向当前合约中导入符号。
// 本例使用一系列来自 OpenZeppelin 的辅助合约。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` 关键字用于从其它外部合约继承函数和关键字。
// 本例中，`CryptoPizza` 继承 `IERC721` 和 `ERC165` 合约。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // 使用 OpenZeppelin's SafeMath 库来安全执行算数操作。
    // 了解更多：https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity 语言中的常量状态变量与其他语言类似。
    // 但是必须用一个表达式为常量赋值，而这个表达式本身必须在编译时是一个常量。
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
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // 转移 Pizza 和归属关系到其它地址
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // 触发继承自 IERC721 合约中定义的事件。
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * 安全转账给定代币 ID 的所有权到其它地址
     * 如果目标地址是一个合约，则该合约必须实现 `onERC721Received`函数, 
     * 该函数调用了安全转账并且返回一个 magic value。
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * 否则，转账被回退。
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * 安全转账给定代币 ID 所有权到其它地址
     * 如果目标地址是一个合约，则该合约必须实现 `onERC721Received` 函数，
     * 该函数调用安全转账并返回一个 magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * 否则，转账被回退。
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
        // See https://ethereum.stackexchange.com/a/14016/36603
        // for more details about how this works.
        // TODO Check this again before the Serenity release, because all addresses will be
        // contracts then.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## 延伸阅读 {#further-reading}

查阅 Solidity 和 Vyper 文档，以获得关于智能合约的更完整概述：

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## 相关主题 {#related-topics}

- [智能合约](/developers/docs/smart-contracts/)
- [以太坊虚拟机](/developers/docs/evm/)

## 相关教程 {#related-tutorials}

- [减少合约大小以应对合约大小的限制](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– 一些减少智能合约大小的实用提示。_
- [用事件记录智能合约的数据](/developers/tutorials/logging-events-smart-contracts/) _——对智能合约事件的介绍以及如何使用它们来记录数据。_
- [在 Solidity 中与其它合约交互](/developers/tutorials/interact-with-other-contracts-from-solidity/) _——如何从现有合约中部署智能合约并与之交互。_
