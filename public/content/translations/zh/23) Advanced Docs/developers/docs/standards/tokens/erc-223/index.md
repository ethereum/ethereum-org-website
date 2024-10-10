---
title: ERC-223 代币标准
description: 关于 ERC-223 同质化代币标准的概述、它的运作方式以及与 ERC-20 的对比。
lang: zh
---

## 简介 {#introduction}

### 什么是 ERC-223？ {#what-is-erc223}

ERC-223 是一种同质化代币标准，与 ERC-20 标准类似。 主要的区别在于，ERC-223 不仅定义了代币应用程序接口，还定义了从发送者向接收者转移代币的逻辑。 它引入了一个交流模型，使代币转账能够能在接收方进行处理。

### 与 ERC-20 的区别 {#erc20-differences}

ERC-223 解决了 ERC-20 存在的一些限制，并在代币合约与可能接收代币的合约之间引入了一种新的交互方法。 有几件事情是 ERC-223 能够做到但 ERC-20 不能做到的：

- 在接收方处理代币转账：接收者可以检测到 ERC-223 代币的存入。
- 拒绝不当发送的代币：如果用户向不应该接收代币的合约发送 ERC-223 代币，合约可以拒绝该交易，以避免损失代币。
- 转账中的元数据：ERC-223 代币可以包含元数据，允许代币交易上附加任意信息。

## 前提条件 {#prerequisites}

- [帐户](/developers/docs/accounts)
- [智能合约](/developers/docs/smart-contracts/)
- [代币标准](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 正文 {#body}

ERC-223 是一种在智能合约中实现代币应用程序接口的代币标准。 它也为应该接收 ERC-223 代币的合约声明了一个应用程序接口。 不支持 ERC-223 接收者应用程序接口的合约无法接收 ERC-223 代币，防止了用户出错。

实现了以下方法和事件的智能合约可以被称为兼容 ERC-223 的代币合约。 一旦被部署，它将负责追踪在以太坊上创建的代币。

合约能够拥有的函数不止这些，开发者可以将各种代币标准的任何其他功能添加到该合约。 例如，`approve` 和 `transferFrom` 函数不是 ERC-223 标准的一部分，但如果有必要，可以实现这些函数。

来自 [EIP-223](https://eips.ethereum.org/EIPS/eip-223)：

### 方法 {#methods}

ERC-223 代币必须实现以下方法:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

应该接收 ERC-223 代币的合约必须实现以下方法：

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

如果 ERC-223 代币被发送到没有实现 `tokenReceived(..)` 函数的合约，那么这笔转账必定会失败，并且代币不会从发送者的余额中移走。

### 事件 {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### 示例 {#examples}

ERC-223 代币的应用程序接口与 ERC-20 的相似，因此从用户界面开发的角度上看两者没有区别。 唯一的区别是，ERC-223 代币可能不具有 `approve` + `transferFrom` 函数，因为这些函数对该标准来说是可选的。

#### Solidity 的示例 {#solidity-example}

以下示例说明了基础 ERC-223 代币合约是如何运作的：

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

现在我们希望另一个合约接受 `tokenA` 存款（假设该 tokenA 是一种 ERC-223 代币）。 该合约必须只接受 tokenA 并拒绝其他代币。 当合约接收 tokenA 时，它必须触发一个 `Deposit()` 事件并增加 `deposits` 内部变量的值。

代码如下：

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // It is important to understand that within this function
        // msg.sender is the address of a token that is being received,
        // msg.value  is always 0 as the token contract does not own or send Ether in most cases,
        // _from      is the sender of the token transfer,
        // _value     is the amount of tokens that was deposited.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## 常见问题{#faq}

### 如果我们将一些 tokenB 发送到合约会发生什么？ {#sending-tokens}

交易会失败，并且不会发生代币的转移。 代币将被退回到发送者的地址。

### 我们如何向该合约存款？ {#contract-deposits}

调用 ERC-223 代币的 `transfer(address,uint256)` 或 `transfer(address,uint256,bytes)` 函数，指定 `RecipientContract` 的地址。

### 如果我们将 ERC-20 代币转移到该合约会发生什么？ {#erc-20-transfers}

如果 ERC-20 代币被发送到 `RecipientContract`，这些代币将被转移，但转账不会被识别（不会触发 `Deposit()` 事件，存款值不会发生改变）。 无法过滤或防止不必要的 ERC-20 存款。

### 如果我们希望在代币存款完成后执行一些函数呢？ {#function-execution}

有多种方法可以做到这点。 在此示例中，我们将使用的方法会使 ERC-223 转账与以太币转账相同：

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

当 `RecipientContract` 收到 ERC-223 代币时，合约会执行一个编码为代币交易参数 `_data` 的函数，这与以太币交易将函数调用编码为交易 `data` 相同。 阅读[数据字段](https://ethereum.org/en/developers/docs/transactions/#the-data-field)以获取更多信息。

在上述示例中，ERC-223 代币必须通过 `transfer(address,uin256,bytes calldata _data)` 函数转移到 `RecipientContract` 的地址。 如果数据参数将为 `0xc2985578`（`foo()` 函数的签名），那么在收到代币存款之后，将会调用 foo() 函数并触发事件 Foo()。

也可以将参数编码到代币转账的 `data` 中，例如我们可以使用数值 12345 作为 `_someNumber` 来调用 bar() 函数。 在这种情况下，`data` 必须为 `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`，其中 `0x0423a132` 是 `bar(uint256)` 函数的签名，`00000000000000000000000000000000000000000000000000000000000004d2` 是 uint256 类型的 12345。

## 局限性 {#limitations}

虽然 ERC-223 解决了 ERC-20 标准中存在的一些问题，但它也有自己的局限性：

- 采用与兼容性：ERC-223 目前还未被广泛采用，这可能会限制其与现有工具和平台的兼容性。
- 向后兼容性：ERC-223 不向后兼容 ERC-20，这意味着现有的 ERC-20 合约和工具在未经修改的情况下无法与 ERC-223 代币一起使用。
- 燃料成本：与 ERC-20 交易相比，ERC-223 转账中的额外检查与功能可能导致更高的燃料成本。

## 扩展阅读{#further-reading}

- [EIP-223：ERC-223 代币标准](https://eips.ethereum.org/EIPS/eip-223)
- [初始 ERC-223 提案](https://github.com/ethereum/eips/issues/223)
