---
title: "智能合约剖析"
description: "深入了解智能合约的剖析——函数、数据和变量。"
lang: zh
---

智能合约是在以太坊上的一个地址运行的程序。它们由数据和函数组成，可以在收到交易后执行。以下是智能合约的组成概述。

## 前提条件 {#prerequisites}

请确保你已经阅读过关于[智能合约](/developers/docs/smart-contracts/)的内容。本文档假设你已经熟悉 JavaScript 或 Python 等编程语言。

## 数据 {#data}

任何合约数据都必须分配到一个位置：`storage` 或 `memory`。在智能合约中修改存储的成本很高，因此你需要考虑数据应该存放在哪里。

### 存储 {#storage}

持久性数据被称为存储，由状态变量表示。这些值永久存储在区块链上。你需要声明类型，以便合约在编译时能够跟踪它在区块链上需要多少存储空间。

```solidity
// Solidity 示例
contract SimpleStorage {
    uint storedData; // 状态变量
    // ...
}
```

```python
# Vyper 示例
storedData: int128
```

如果你已经使用过面向对象语言进行编程，你可能会对大多数类型很熟悉。然而，如果你刚接触[以太坊](/)开发，`address` 对你来说应该是个新概念。

`address` 类型可以保存一个以太坊地址，相当于 20 字节或 160 位。它以十六进制表示法返回，并带有前导 0x。

其他类型包括：

- 布尔值
- 整数
- 定点数
- 固定大小的字节数组
- 动态大小的字节数组
- 有理数和整数常量
- 字符串常量
- 十六进制常量
- 枚举

更多解释，请查看文档：

- [查看 Vyper 类型](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [查看 Solidity 类型](https://docs.soliditylang.org/en/latest/types.html#value-types)

### 内存 {#memory}

仅在合约函数执行期间存储的值称为内存变量。由于这些变量不会永久存储在区块链上，因此使用它们的成本要低得多。

在 [Solidity 文档](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)中了解更多关于以太坊虚拟机 (EVM) 如何存储数据（存储、内存和栈）的信息。

### 环境变量 {#environment-variables}

除了你在合约中定义的变量外，还有一些特殊的全局变量。它们主要用于提供有关区块链或当前交易的信息。

示例：

| **属性**          | **状态变量** | **描述**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | 当前区块时段的时间戳        |
| `msg.sender`      | address            | 消息的发送者（当前调用） |

## 函数 {#functions}

简单来说，函数可以获取信息或设置信息，以响应传入的交易。

函数调用有两种类型：

- `internal` —— 这些不会创建 EVM 调用
  - 内部函数和状态变量只能在内部访问（即从当前合约或派生自它的合约内部）
- `external` —— 这些会创建 EVM 调用
  - 外部函数是合约接口的一部分，这意味着它们可以从其他合约和通过交易被调用。外部函数 `f` 不能在内部调用（即 `f()` 不起作用，但 `this.f()` 起作用）。

它们也可以是 `public` 或 `private`

- `public` 函数可以在合约内部调用，也可以通过消息在外部调用
- `private` 函数仅在定义它们的合约中可见，在派生合约中不可见

函数和状态变量都可以设为公开 (public) 或私有 (private)

以下是用于更新合约上状态变量的函数：

```solidity
// Solidity 示例
function update_name(string value) public {
    dapp_name = value;
}
```

- 类型为 `string` 的参数 `value` 被传递到函数中：`update_name`
- 它被声明为 `public`，意味着任何人都可以访问它
- 它没有被声明为 `view`，因此它可以修改合约状态

### 视图函数 {#view-functions}

这些函数承诺不修改合约数据的状态。常见的例子是“getter”函数——例如，你可能会使用它来获取用户的余额。

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

哪些操作被视为修改状态：

1. 写入状态变量。
2. [触发事件](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)。
3. [创建其他合约](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)。
4. 使用 `selfdestruct`。
5. 通过调用发送以太币。
6. 调用任何未标记为 `view` 或 `pure` 的函数。
7. 使用底层调用。
8. 使用包含某些操作码的内联汇编。

### 构造函数 {#constructor-functions}

`constructor` 函数仅在合约首次部署时执行一次。与许多基于类的编程语言中的 `constructor` 一样，这些函数通常将状态变量初始化为其指定的值。

```solidity
// Solidity 示例
// 初始化合约的数据，将 `owner` 设置
// 为合约创建者的地址。
constructor() public {
    // 所有智能合约都依赖外部交易来触发其函数。
    // `msg` 是一个全局变量，包含给定交易的相关数据，
    // 例如发送者的地址和交易中包含的 ETH 值。
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

除了你在合约中定义的变量和函数外，还有一些特殊的内置函数。最明显的例子是：

- `address.send()` —— Solidity
- `send(address)` —— Vyper

这些函数允许合约向其他账户发送 ETH。

## 编写函数 {#writing-functions}

你的函数需要：

- 参数变量和类型（如果它接受参数）
- 内部/外部 (internal/external) 声明
- pure/view/payable 声明
- 返回类型（如果它返回值）

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // 状态变量

    // 在部署合约时调用并初始化该值
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // 获取函数
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // 设置函数
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

一个完整的合约可能看起来像这样。在这里，`constructor` 函数为 `dapp_name` 变量提供了一个初始值。

## 事件和日志 {#events-and-logs}

事件使你的智能合约能够与前端或其他订阅应用程序进行通信。一旦交易被验证并添加到区块中，智能合约就可以触发事件并记录日志信息，然后前端可以处理和利用这些信息。

## 带注释的示例 {#annotated-examples}

这些是一些用 Solidity 编写的示例。如果你想尝试这些代码，可以在 [Remix](https://remix.ethereum.org) 中与它们进行交互。

### Hello world {#hello-world}

```solidity
// 使用语义化版本控制指定 Solidity 的版本。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// 定义一个名为 `HelloWorld` 的合约。
// 合约是函数和数据（其状态）的集合。
// 一旦部署，合约就驻留在以太坊区块链上的特定地址。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // 声明一个 `string` 类型的状态变量 `message`。
    // 状态变量是其值永久存储在合约存储中的变量。
    // 关键字 `public` 使变量可以从合约外部访问，
    // 并创建一个其他合约或客户端可以调用以访问该值的函数。
    string public message;

    // 与许多基于类的面向对象语言类似，构造函数是
    // 一个仅在合约创建时执行的特殊函数。
    // 构造函数用于初始化合约的数据。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // 接受一个字符串参数 `initMessage` 并将该值设置
        // 到合约的 `message` 存储变量中）。
        message = initMessage;
    }

    // 一个接受字符串参数的公共函数，
    // 并更新 `message` 存储变量。
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### 代币 {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address`（地址）类似于电子邮件地址——它用于标识以太坊上的帐户。
    // 地址可以代表智能合约或外部（用户）帐户。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping`（映射）本质上是一个哈希表数据结构。
    // 此 `mapping` 将一个无符号整数（代币余额）分配给一个地址（代币持有者）。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // 事件允许在区块链上记录活动日志。
    // 以太坊客户端可以监听事件，以便对合约状态变化做出反应。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // 初始化合约的数据，将 `owner` 设置
    // 为合约创建者的地址。
    constructor() public {
        // 所有智能合约都依赖外部交易来触发其函数。
        // `msg` 是一个全局变量，包含给定交易的相关数据，
        // 例如发送者的地址和交易中包含的 ETH 值。
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // 创建一定数量的新代币并将其发送到一个地址。
    function mint(address receiver, uint amount) public {
        // `require` 是一个用于强制执行特定条件的控制结构。
        // 如果 `require` 语句的计算结果为 `false`，则会触发异常，
        // 这将撤销在当前调用期间对状态所做的所有更改。
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 只有合约所有者才能调用此函数
        require(msg.sender == owner, "You are not the owner.");

        // 强制执行代币的最大数量
        require(amount < 1e60, "Maximum issuance exceeded");

        // 将 `receiver` 的余额增加 `amount`
        balances[receiver] += amount;
    }

    // 将一定数量的现有代币从任何调用者发送到一个地址。
    function transfer(address receiver, uint amount) public {
        // 发送者必须有足够的代币来发送
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // 调整这两个地址的代币余额
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // 触发前面定义的事件
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### 独特的数字资产 {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// 将其他文件中的符号导入到当前合约中。
// 在本例中，是来自 OpenZeppelin 的一系列辅助合约。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` 关键字用于从外部合约继承函数和关键字。
// 在本例中，`CryptoPizza` 继承自 `IERC721` 和 `ERC165` 合约。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // 使用 OpenZeppelin 的 SafeMath 库安全地执行算术运算。
    // 了解更多：https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity 中的常量状态变量与其他语言类似，
    // 但必须通过在编译时为常量的表达式进行赋值。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // 结构体（Struct）类型允许你定义自己的类型
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // 创建一个空的 Pizza 结构体数组
    Pizza[] public pizzas;

    // 从披萨 ID 到其所有者地址的映射
    mapping(uint256 => address) public pizzaToOwner;

    // 从所有者地址到所拥有代币数量的映射
    mapping(address => uint256) public ownerPizzaCount;

    // 从代币 ID 到授权地址的映射
    mapping(uint256 => address) pizzaApprovals;

    // 你可以嵌套映射，此示例将所有者映射到操作员授权
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // 从字符串（名称）和 DNA 创建随机披萨的内部函数
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` 关键字意味着此函数仅在
        // 此合约以及派生自此合约的合约内可见
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` 是一个函数修饰符，用于检查披萨是否已存在
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // 将披萨添加到披萨数组并获取 ID
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // 检查披萨所有者是否与当前用户相同
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 请注意，address(0) 是零地址，
        // 表示 pizza[id] 尚未分配给特定用户。

        assert(pizzaToOwner[id] == address(0));

        // 将披萨映射到所有者
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // 从字符串（名称）创建一个随机披萨
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // 从字符串（名称）和所有者（创建者）的地址生成随机 DNA
    function generateRandomDna(string memory _str, address _owner)
        public
        // 标记为 `pure` 的函数承诺不读取或修改状态
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // 从字符串（名称）+ 地址（所有者）生成随机 uint
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // 返回按所有者查找的披萨数组
    function getPizzasByOwner(address _owner)
        public
        // 标记为 `view` 的函数承诺不修改状态
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // 使用 `memory` 存储位置仅在
        // 此函数调用的生命周期内存储值。
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

    // 将披萨及其所有权转移到其他地址
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // 触发在导入的 IERC721 合约中定义的事件
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * 安全地将给定代币 ID 的所有权转移到另一个地址
     * 如果目标地址是合约，它必须实现 `onERC721Received`，
     * 该函数在安全转移时被调用，并返回魔术值
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`；
     * 否则，转移将被撤销。
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * 安全地将给定代币 ID 的所有权转移到另一个地址
     * 如果目标地址是合约，它必须实现 `onERC721Received`，
     * 该函数在安全转移时被调用，并返回魔术值
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`；
     * 否则，转移将被撤销。
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
     * 在目标地址上调用 `onERC721Received` 的内部函数
     * 如果目标地址不是合约，则不执行该调用
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

    // 销毁披萨 - 完全销毁代币
    // `external` 函数修饰符意味着此函数是
    // 合约接口的一部分，其他合约可以调用它
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

    // 按地址返回披萨数量
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // 返回按 ID 查找的披萨的所有者
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // 授权其他地址转移披萨的所有权
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // 返回特定披萨的授权地址
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * 清除给定代币 ID 当前授权的私有函数
     * 如果给定地址确实不是代币的所有者，则撤销
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * 设置或取消设置给定操作员的授权
     * 允许操作员代表发送者转移其所有代币
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // 查询操作员是否已获得给定所有者的授权
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // 获取披萨的所有权 - 仅限授权用户
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // 检查披萨是否存在
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // 检查地址是否为所有者或已获授权转移披萨
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // 禁用 solium 检查，因为
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // 检查披萨是否唯一且尚不存在
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

    // 返回目标地址是否为合约
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // 目前没有更好的方法来检查地址中是否存在合约，
        // 只能检查该地址的代码大小。
        // 参见 https://ethereum.stackexchange.com/a/14016/36603
        // 了解有关其工作原理的更多详细信息。
        // TODO 在 Serenity 发布之前再次检查此项，因为届时所有地址都将是
        // 合约。
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## 延伸阅读 {#further-reading}

查看 Solidity 和 Vyper 的文档，以获取更完整的智能合约概述：

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## 相关主题 {#related-topics}

- [智能合约](/developers/docs/smart-contracts/)
- [以太坊虚拟机 (EVM)](/developers/docs/evm/)

## 相关教程 {#related-tutorials}

- [缩减合约以应对合约大小限制](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _—— 减小智能合约大小的一些实用技巧。_
- [使用事件记录智能合约中的数据](/developers/tutorials/logging-events-smart-contracts/) _—— 智能合约事件简介以及如何使用它们来记录数据。_
- [从 Solidity 与其他合约交互](/developers/tutorials/interact-with-other-contracts-from-solidity/) _—— 如何从现有合约部署智能合约并与之交互。_