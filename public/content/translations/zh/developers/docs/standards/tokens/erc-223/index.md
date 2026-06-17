---
title: ERC-223 代币标准
description: ERC-223 同质化代币标准概述、工作原理以及与 ERC-20 的比较。
lang: zh
---

## 简介 {#introduction}

### 什么是 ERC-223？ {#what-is-erc223}

ERC-223 是一种同质化代币标准，类似于 ERC-20 标准。主要区别在于，ERC-223 不仅定义了代币 API，还定义了从发送方到接收方的代币转账逻辑。它引入了一种通信模型，允许在接收方处理代币转账。

### 与 ERC-20 的区别 {#erc20-differences}

ERC-223 解决了一些 ERC-20 的局限性，并引入了代币合约与可能接收代币的合约之间交互的新方法。有几项功能是 ERC-223 可以实现而 ERC-20 无法实现的：

- 接收方的代币转账处理：接收方可以检测到 ERC-223 代币正在被存入。
- 拒绝不当发送的代币：如果用户将 ERC-223 代币发送到不应接收代币的合约，该合约可以拒绝该交易，从而防止代币丢失。
- 转账中的元数据：ERC-223 代币可以包含元数据，允许将任意信息附加到代币交易中。

## 前提条件 {#prerequisites}

- [账户](/developers/docs/accounts)
- [智能合约](/developers/docs/smart-contracts/)
- [代币标准](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 正文 {#body}

ERC-223 是一种代币标准，它在智能合约中实现了代币的 API。它还为应该接收 ERC-223 代币的合约声明了一个 API。不支持 ERC-223 接收者 API 的合约无法接收 ERC-223 代币，从而防止了用户错误。

如果智能合约实现了以下方法和事件，则可以称之为兼容 ERC-223 的代币合约。一旦部署，它将负责跟踪以太坊上创建的代币。

该合约并不局限于仅包含这些函数，开发者可以向该合约添加来自不同代币标准的任何其他功能。例如，`approve` 和 `transferFrom` 函数不是 ERC-223 标准的一部分，但如果需要，也可以实现这些函数。

摘自 [EIP-223](https://eips.ethereum.org/EIPS/eip-223)：

### 方法 {#methods}

ERC-223 代币必须实现以下方法：

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

如果将 ERC-223 代币发送到未实现 `tokenReceived(..)` 函数的合约，则转账必须失败，并且代币不得从发送方的余额中扣除。

### 事件 {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### 示例 {#examples}

ERC-223 代币的 API 与 ERC-20 类似，因此从用户界面 (UI) 开发的角度来看没有区别。唯一的例外是 ERC-223 代币可能没有 `approve` + `transferFrom` 函数，因为这些函数对于该标准是可选的。

#### Solidity 示例 {#solidity-example}

以下示例说明了基本的 ERC-223 代币合约是如何运作的：

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

现在我们希望另一个合约接受 `tokenA` 的存款，假设 tokenA 是一个 ERC-223 代币。该合约必须仅接受 tokenA 并拒绝任何其他代币。当合约接收到 tokenA 时，它必须触发一个 `Deposit()` 事件并增加内部 `deposits` 变量的值。

代码如下：

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // 我们唯一想要接收的代币。
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // 重要的是要理解在这个函数中
        // msg.sender 是正在接收的代币的地址，
        // msg.value 始终为 0，因为在大多数情况下代币合约不拥有或发送以太币，
        // _from 是代币转账的发送者，
        // _value 是存入的代币数量。
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## 常见问题 {#faq}

### 如果我们将一些 tokenB 发送到该合约会发生什么？ {#sending-tokens}

交易将失败，代币转账不会发生。代币将退还到发送方的地址。

### 我们如何向该合约存款？ {#contract-deposits}

调用 ERC-223 代币的 `transfer(address,uint256)` 或 `transfer(address,uint256,bytes)` 函数，并指定 `RecipientContract` 的地址。

### 如果我们将 ERC-20 代币转账到该合约会发生什么？ {#erc-20-transfers}

如果将 ERC-20 代币发送到 `RecipientContract`，代币将被转账，但该转账不会被识别（不会触发 `Deposit()` 事件，存款值也不会改变）。无法过滤或阻止不需要的 ERC-20 存款。

### 如果我们想在代币存款完成后执行某些函数怎么办？ {#function-execution}

有多种方法可以做到这一点。在这个示例中，我们将采用使 ERC-223 转账与以太币转账完全相同的方法：

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // 我们唯一想要接收的代币。
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // 处理传入的交易并执行后续的函数调用。
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

当 `RecipientContract` 接收到 ERC-223 代币时，合约将执行编码为代币交易 `_data` 参数的函数，这与以太币交易将函数调用编码为交易 `data` 的方式完全相同。阅读[数据字段](/developers/docs/transactions/#the-data-field)了解更多信息。

在上述示例中，必须使用 `transfer(address,uin256,bytes calldata _data)` 函数将 ERC-223 代币转账到 `RecipientContract` 的地址。如果数据参数为 `0xc2985578`（`foo()` 函数的签名），则在收到代币存款后将调用 foo() 函数，并触发 Foo() 事件。

参数也可以编码在代币转账的 `data` 中，例如我们可以调用 bar() 函数，并将 `_someNumber` 的值设为 12345。在这种情况下，`data` 必须是 `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`，其中 `0x0423a132` 是 `bar(uint256)` 函数的签名，而 `00000000000000000000000000000000000000000000000000000000000004d2` 是作为 uint256 的 12345。

## 局限性 {#limitations}

虽然 ERC-223 解决了 ERC-20 标准中发现的几个问题，但它也有自身的局限性：

- 采用与兼容性：ERC-223 尚未被广泛采用，这可能会限制其与现有工具和平台的兼容性。
- 向后兼容性：ERC-223 不向后兼容 ERC-20，这意味着现有的 ERC-20 合约和工具在未经修改的情况下无法与 ERC-223 代币一起使用。
- Gas 成本：与 ERC-20 交易相比，ERC-223 转账中的额外检查和功能可能会导致更高的 Gas 成本。

## 延伸阅读 {#further-reading}

- [EIP-223：ERC-223 代币标准](https://eips.ethereum.org/EIPS/eip-223)
- [最初的 ERC-223 提案](https://github.com/ethereum/eips/issues/223)