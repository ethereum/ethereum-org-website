---
title: "详解智能合约"
description: "深入解读智能合约：函数、数据和变量。"
lang: zh
---

智能合约是一种在以太坊某个地址上运行的程序。 它们是由数据和函数组成的，可以在收到交易时执行。 以下概述一个智能合约的组成。

## 前提条件 {#prerequisites}

请先确保您已阅读[智能合约](/developers/docs/smart-contracts/)的相关信息。 本文档假设你已经熟悉某种编程语言，例如 JavaScript 或 Python。

## 数据 {#data}

任何合约数据都必须分配到一个位置：`storage` 或 `memory`。 在智能合约中修改存储消耗很大，因此你需要考虑数据在哪里存取。

### 存储 {#storage}

持久性数据被称之为存储，由状态变量表示。 这些值被永久地存储在区块链上。 你需要声明一个类型，以便于合约在编译时可以跟踪它在区块链上需要多少存储。

```solidity
// Solidity 示例
contract SimpleStorage {
    uint storedData; // 状态变量
    // ...
}
```

```python
# Vyper example
storedData: int128
```

如果用过面向对象编程语言，应该会熟悉大多数类型。 但如果是刚接触以太坊开发，则会发现 `address` 是一个新类型。

`address` 类型可以容纳一个以太坊地址，相当于 20 字节或 160 位。 它以十六进制的形式返回，前导是 0x。

其它类型包括：

- 布尔
- 整数（integer）
- 定点数（fixed point numbers）
- 固定大小的字节数组（fixed-size byte arrays）
- 动态大小字节数组
- 有理数和整数字面量
- 字符串字面量
- 十六进制字面量
- 枚举

了解更多信息，请参阅文档：

- [查看 Vyper 类型](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [查看 Solidity 类型](https://docs.soliditylang.org/en/latest/types.html#value-types)

### 内存 {#memory}

仅在合约函数执行期间存储的值被称为内存变量。 由于这些变量不是永久地存储在区块链上，所以它们的使用成本要低得多。

在 [Solidity 文档](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)中了解更多关于 EVM 如何存储数据（存储、内存和堆栈）的信息。

### 环境变量 {#environment-variables}

除了在自己合约上定义的变量之外，还有一些特殊的全局变量。 它们主要用于提供有关区块链或当前交易的信息。

例子：

| **属性**  | **状态变量** | **描述**       |
| ------- | -------- | ------------ |
| `区块时间戳` | uint256  | 当前区块的时间戳     |
| `发送者`   | 地址       | 消息的发送者（当前调用） |

## 函数 {#functions}

用最简单的术语来说，函数可以获得信息或设置信息，以响应传入的交易。

有两种函数调用方式：

- `internal` – 不会创建 EVM 调用
  - 内部函数和状态变量只能在内部访问（即从当前合约或其派生合约中访问）
- `external` – 会创建 EVM 调用
  - External 函数是合约接口的一部分，这意味着他可以被其它合约和交易调用。 外部函数 `f` 不能在内部调用（即 `f()` 不起作用，但 `this.f()` 可以）。

它们也可以是 `public` 或 `private`

- `public` 函数可以从合约内部调用，也可以通过消息从外部调用
- `private` 函数仅在定义它们的合约中可见，在其派生合约中不可见

函数和状态变量都可以被定义为 public 或 private

下面是更新合约上一个状态变量的函数：

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- 类型为 `string` 的参数 `value` 被传递到函数 `update_name`
- 它被声明为 `public`，意味着任何人都可以访问它
- 它没有声明为 `view`，所以可以修改合约状态

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
2. [触发事件](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)。
3. [创建其他合约](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)。
4. 使用 `selfdestruct`。
5. 通过调用发送 ether。
6. 调用任何未标记 `view` 或 `pure` 的函数。
7. 使用底层调用。
8. 使用包含某些操作码的内联程序组。

### 构造函数 {#constructor-functions}

`constructor` 函数仅在首次部署合约时执行一次。 与许多基于类的编程语言中的 `constructor` 一样，这些函数通常会将状态变量初始化为其指定值。

```solidity
// Solidity 示例
// 初始化合约的数据，将“所有者”
// 设置为合约创建者的地址。
constructor() public {
    // 所有智能合约都依靠外部交易来触发其函数。
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
    string dapp_name; // 状态变量

    // 在部署合约并初始化其值时调用
    constructor() public {
        dapp_name = "我的示例 dapp";
    }

    // Get 函数
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set 函数
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

一个完整的合约可能就是这样。 这里的 `constructor` 函数为 `dapp_name` 变量提供了一个初始值。

## 事件和日志 {#events-and-logs}

事件让你的智能合约能够与前端或其他订阅应用程序进行通信。 一旦交易被验证并添加到区块中，智能合约就可以触发事件并记录信息，然后前端就可以处理和利用这些信息。

## 带注解的示例 {#annotated-examples}

这是一些用 Solidity 写的例子。 如果你想体验一下这些代码，可以在 [Remix](http://remix.ethereum.org) 中与它们交互。

### Hello world {#hello-world}

```solidity
// 指定 Solidity 的版本，使用语义版本控制。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// 定义一个名为 `HelloWorld` 的合约。
// 合约是函数和数据（其状态）的集合。
// 一旦部署，合约便会存在于以太坊区块链上的一个特定地址。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // 声明一个类型为 `string` 的状态变量 `message`。
    // 状态变量是其值被永久存储在合约存储中的变量。
    // 关键字 `public` 使变量可以从合约外部访问
    // 并创建一个其他合约或客户端可以调用以访问该值的函数。
    string public message;

    // 与许多基于类的面向对象语言类似，构造函数是
    // 一个仅在创建合约时执行的特殊函数。
    // 构造函数用于初始化合约的数据。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // 接受一个字符串参数 `initMessage` 并将该值设置
        // 到合约的 `message` 存储变量中）。
        message = initMessage;
    }

    // 一个接受字符串参数并更新 `message` 存储变量的
    // public 函数。
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### 代币 {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address` 类似于电子邮件地址 - 用于在以太坊上标识帐户。
    // 地址可以表示智能合约或外部（用户）帐户。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` 本质上是一个哈希表数据结构。
    // 此 `mapping` 将一个无符号整数（代币余额）分配给一个地址（代币持有者）。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // 事件允许在区块链上记录活动日志。
    // 以太坊客户端可以侦听事件，以便对合约状态更改做出反应。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // 初始化合约数据，将“所有者”
    // 设置为合约创建者的地址。
    constructor() public {
        // 所有智能合约都依靠外部交易来触发其函数。
        // `msg` 是一个全局变量，包含给定交易的相关数据，
        // 例如发送者地址和交易中包含的 ETH 值。
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // 创建一定数量的新代币并将其发送到一个地址。
    function mint(address receiver, uint amount) public {
        // `require` 是一个用于强制执行某些条件的控制结构。
        // 如果 `require` 语句的计算结果为 `false`，则会触发异常，
        // 这将恢复在当前调用期间对状态所做的所有更改。
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 只有合约所有者可以调用此函数
        require(msg.sender == owner, "你不是所有者。");

        // 强制执行代币的最大数量
        require(amount < 1e60, "已超出最大发行量");

        // 将 `receiver` 的余额增加 `amount`
        balances[receiver] += amount;
    }

    // 从任何调用者向一个地址发送一定数量的现有代币。
    function transfer(address receiver, uint amount) public {
        // 发送者必须有足够的代币才能发送
        require(amount <= balances[msg.sender], "余额不足。");

        // 调整两个地址的代币余额
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // 触发之前定义的事件
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### 独特的数字资产 {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// 将其他文件中的符号导入当前合约。
// 在本例中，为来自 OpenZeppelin 的一系列辅助合约。
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

    // Solidity 中的常量状态变量与其他语言类似
    // 但你必须从编译时为常量的表达式中赋值。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // 结构类型允许你定义自己的类型
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // 创建一个空的 Pizza 结构数组
    Pizza[] public pizzas;

    // 从披萨 ID 到其所有者地址的映射
    mapping(uint256 => address) public pizzaToOwner;

    // 从所有者地址到所拥有代币数量的映射
    mapping(address => uint256) public ownerPizzaCount;

    // 从代币 ID 到批准地址的映射
    mapping(uint256 => address) pizzaApprovals;

    // 你可以嵌套映射，此示例将所有者映射到操作员批准
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // 从字符串（名称）和 DNA 创建随机 Pizza 的内部函数
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` 关键字意味着此函数仅在此合约和派生此合约的
        // 合约中可见
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` 是一个函数修饰符，用于检查披萨是否已存在
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // 将 Pizza 添加到 Pizzas 数组并获取 id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // 检查 Pizza 所有者是否与当前用户相同
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 请注意，address(0) 是零地址，
        // 表示 pizza[id] 尚未分配给特定用户。

        assert(pizzaToOwner[id] == address(0));

        // 将 Pizza 映射到所有者
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // 从字符串（名称）创建随机 Pizza
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // 从字符串（名称）和所有者（创建者）的地址生成随机 DNA
    function generateRandomDna(string memory _str, address _owner)
        public
        // 标记为 `pure` 的函数保证不会读取或修改状态
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

    // 返回按所有者找到的 Pizzas 数组
    function getPizzasByOwner(address _owner)
        public
        // 标记为 `view` 的函数保证不会修改状态
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // 使用 `memory` 存储位置来仅在此函数调用的
        // 生命周期内存储值。
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

    // 将 Pizza 和所有权转移到其他地址
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "无效地址。");
        require(_exists(_pizzaId), "披萨不存在。");
        require(_from != _to, "不能转移到相同地址。");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "地址未经批准。");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // 触发导入的 IERC721 合约中定义的事件
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * 将给定代币 ID 的所有权安全地转移到另一个地址
     * 如果目标地址是合约，则它必须实现 `onERC721Received`，
     * 它在安全转移时被调用，并返回 magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`；
     * 否则，转移将被还原。
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * 将给定代币 ID 的所有权安全地转移到另一个地址
     * 如果目标地址是合约，则它必须实现 `onERC721Received`，
     * 它在安全转移时被调用，并返回 magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`；
     * 否则，转移将被还原。
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "必须实现 onERC721Received。");
    }

    /**
     * 在目标地址上调用 `onERC721Received` 的内部函数
     * 如果目标地址不是合约，则不执行调用
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

    // 销毁一个 Pizza - 完全销毁代币
    // `external` 函数修饰符表示此函数是
    // 合约接口的一部分，其他合约可以调用它
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "无效地址。");
        require(_exists(_pizzaId), "披萨不存在。");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "地址未经批准。");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // 按地址返回 Pizzas 的数量
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // 按 id 返回找到的 Pizza 的所有者
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "无效披萨 ID。");
        return owner;
    }

    // 批准其他地址转移 Pizza 的所有权
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "必须是披萨所有者。");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // 返回特定 Pizza 的批准地址
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "披萨不存在。");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * 清除给定代币 ID 的当前批准的私有函数
     * 如果给定地址不是代币的真正所有者，则还原
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "必须是披萨所有者。");
        require(_exists(_pizzaId), "披萨不存在。");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * 设置或取消设置给定操作员的批准
     * 允许操作员代表发送者转移其所有代币
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "不能批准自己的地址");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // 告知操作员是否获得给定所有者的批准
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // 取得 Pizza 的所有权 - 仅限批准的用户
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "地址未经批准。");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // 检查 Pizza 是否存在
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // 检查地址是否为所有者或被批准转移 Pizza
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

    // 检查 Pizza 是否唯一且尚不存在
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
        require(result, "具有此类名称的披萨已存在。");
        _;
    }

    // 返回目标地址是否是合约
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // 目前，没有比检查地址处的代码大小更好的方法来检查地址中是否存在合约。
        // 有关其工作原理的更多详细信息，
        // 请参阅 https://ethereum.stackexchange.com/a/14016/36603。
        // TODO 在 Serenity 发布之前再次检查，因为届时所有地址都将是
        // 合约。
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## 扩展阅读{#further-reading}

查阅 Solidity 和 Vyper 文档，以获得关于智能合约的更完整概述：

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## 相关话题 {#related-topics}

- [智能合约](/developers/docs/smart-contracts/)
- [以太坊虚拟机](/developers/docs/evm/)

## 相关教程 {#related-tutorials}

- [缩减合约以对抗合约大小限制](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/)_– 一些减小智能合约大小的实用技巧。_
- [使用事件记录智能合约中的数据](/developers/tutorials/logging-events-smart-contracts/)_– 智能合约事件简介以及如何使用它们来记录数据。_
- [在 Solidity 中与其他合约交互](/developers/tutorials/interact-with-other-contracts-from-solidity/)_– 如何从现有合约部署智能合约并与之交互。_
