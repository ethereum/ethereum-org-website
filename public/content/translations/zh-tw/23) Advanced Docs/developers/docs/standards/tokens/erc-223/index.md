---
title: ERC-223代幣標準
description: 關於 ERC-223 同質性代筆標準的概述，包含它的運作方式以及與 ERC-20 的對代幣
lang: zh-tw
---

## 介紹 {#introduction}

### 什麼是ERC-223? {#what-is-erc223}

ERC-223 是一種同質性代筆標準，與 ERC-20 標準類似。 主要的區別在於 ERC-223 不但定義了代幣應用程式介面，還定義了從發送者向接收者傳送代幣的邏輯。 它引入了一個交流模型，使代幣傳送能夠在接收者處進行處理。

### 與 ERC-20 的區別 {#erc20-differences}

ERC-223 解決了 ERC-20 的一些限制，並在代幣合約與可能接受代幣的合約之間引入了一種新的互動方法。 有幾件事情是 ERC-223 可以做到但 ERC-20 不能做到的:

- 在接收者處處理代幣傳送: 接收者可以檢測 ERC-223 代幣的存入。
- 拒絕不正確發送的代幣: 如果使用者向不應該接收代幣的合約傳送 ERC-223 代幣，合約可以拒絕該交易，以避免損失代幣。
- 傳送中的元數據: ERC-223 代幣可以包含元數據，允許在代幣交易上附加任意資訊。

## 先決條件 {#prerequisites}

- [賬戶](/developers/docs/accounts)
- [智能合約](/developers/docs/smart-contracts/)
- [代幣標準](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 主旨 {#body}

ERC-223 是一種在智能合約中實現代幣應用程式介面的代幣標準。 它也爲應該接收 ERC-223 代幣的合約聲明了一個應用程式介面。 不支持 ERC-223 接收者應用程式介面的合約無法接收 ERC-223 代幣，這防止了使用者出錯。

實現了以下方法和事件的智能合約可以被稱爲 ERC-223 兼容代幣合約。 一旦被部署，它將負責追蹤在以太坊上創建的代幣。

合約能夠擁有的函數不只有這些，並且可以將各種代幣標準的任意其他功能添加到該合約。 例如，`approve` 和 `transferFrom` 函數不是 ERC-223 標準的一部分，但如果有必要，這些函數可以被實現。

來自 [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### 方法 {#methods}

ERC-223 代幣必須實現一下方法:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

應該接收 ERC-223 代幣的合約必須實現以下方法:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

如果 ERC-223 代筆被發送到沒有實現 `tokenReceived(..)` 函數的合約，該傳送則必定會失效，並且代幣不會從發送者的餘額中移動。

### Events {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### 範例 {#examples}

ERC-223 代幣的應用程式介面與 ERC-20 的相似，因此從使用者介面開發的角度上看沒有區別。 唯一的區別是 ERC-223 代幣可能沒有 `approve` + `transferFrom` 函數，因爲這些函數對於該標準是可以選擇的。

#### Solidity 範例 {#solidity-example}

以下範例説明了基礎的 ERC-223 代幣是如何運作的:

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
    function symbol() public view returns (string memory) { return _symbol; }
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

現在我們希望另一個合約接受 `tokenA` 存款 (假設該 tokenA 是 ERC-223 代幣)。 該合約必須只接受 tokenA 並拒絕其他代幣。 當合約接收 tokenA 時，它必須釋出一個 `Deposit()` 事件並增加 `deposits` 變數的值。

程式碼如下:

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

## 常見問題 {#faq}

### 如果我們將一些 tokenB 發送到合約會發生什麽？ {#sending-tokens}

交易會失敗，並且不會發生代幣傳送。 代幣將返回至發送者的地址。

### 我們要如何向該合約存款？ {#contract-deposits}

調用 ERC-223 代幣的 `transfer(address,uint256)` 或 `transfer(address,uint256,bytes)` 函數，指定 `RecipientContract` 的地址。

### 如果我們將 ERC-20 代币傳送到該合約會發生什麽？ {#erc-20-transfers}

如果 ERC-20 代幣被發送到 `RecipientContract`，這些代幣將被傳送，但該傳送不會被識別 (不會釋出 `Deposit()` 事件，存款值不會發生改變)。 無法過濾或防止不必要的 ERC-20 存款。

### 如果我們希望在代幣存款完成後執行一些函數呢？ {#function-execution}

有多種方法可以做到這一點。 在該範例中我們將繼續使用讓 ERC-223 傳送與以太幣傳送相同的方法:

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

當 `RecipientContract` 接收 ERC-223 代幣時，合約會執行一個編碼為 `_data` 代幣交易參數的函數，與以太坊交易編碼函數調用交易 `data` 相同。 閲讀 [數據欄位](https://ethereum.org/en/developers/docs/transactions/#the-data-field) 以獲取更多資訊。

在上述範例中，ERC-223 必須被傳送到具有 `transfer(address,uin256,bytes calldata _data)` 函數的 `RecipientContract` 地址。 如果數據參數為 `0xc2985578` (`foo()` 函數的簽名)，則在代幣存款被接收之後，foo() 函數將被調用，並且 Foo() 事件將會釋出。

參數也可以編碼在代幣傳送的「data」中，例如我們可以使用「_someNumber」的 12345 值來呼叫 bar() 函數。 在這種情況下，`data` 必須為`0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`，其中 `0x0423a132` 是 `bar(uint256)` 函數的簽名，`00000000000000000000000000000000000000000000000000000000000004d2` 是 12345 作爲 uint256。

## 限制 {#limitations}

雖然 ERC-223 解決了 ERC-20 標準中的一些問題，但它也有自己的限制:

- 采用與兼容性: ERC-223 目前還未被廣泛采用，這可能會限制其與現存工具和平台的兼容性。
- 向後兼容性: ERC-223 不向後兼容 ERC-20，這意味著現存的 ERC-20 合約和工具無法再未經修改的情況下與 ERC-223 代幣一起使用。
- 燃料成本: 與 ERC-20 的交易相比，ERC-223 中的額外檢查與功能可能會導致更高的燃料成本。

## 延伸閱讀 {#further-reading}

- [EIP-223: ERC-223 代幣標準](https://eips.ethereum.org/EIPS/eip-223)
- [初始 ERC-223 提案](https://github.com/ethereum/eips/issues/223)
