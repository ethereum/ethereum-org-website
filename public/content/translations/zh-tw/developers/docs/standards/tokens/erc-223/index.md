---
title: ERC-223 代幣標準
description: ERC-223 同質化代幣標準的概述、運作方式，以及與 ERC-20 的比較。
lang: zh-tw
---

## 簡介 {#introduction}

### 什麼是 ERC-223？ {#what-is-erc223}

ERC-223 是同質化代幣的標準，類似於 ERC-20 標準。主要差異在於 ERC-223 不僅定義了代幣 API，還定義了從發送者到接收者的代幣轉帳邏輯。它引入了一種通訊模型，允許在接收者端處理代幣轉帳。

### 與 ERC-20 的差異 {#erc20-differences}

ERC-223 解決了 ERC-20 的一些限制，並引入了代幣合約與可能接收代幣的合約之間互動的新方法。有幾件事是 ERC-223 可以做到，但 ERC-20 做不到的：

- 接收者端的代幣轉帳處理：接收者可以偵測到 ERC-223 代幣正在被存入。
- 拒絕不當發送的代幣：如果使用者將 ERC-223 代幣發送到不應該接收代幣的合約，該合約可以拒絕交易，從而防止代幣遺失。
- 轉帳中的中繼資料：ERC-223 代幣可以包含中繼資料，允許將任意資訊附加到代幣交易中。

## 先決條件 {#prerequisites}

- [帳戶](/developers/docs/accounts)
- [智能合約](/developers/docs/smart-contracts/)
- [代幣標準](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 內文 {#body}

ERC-223 是一種代幣標準，為智能合約內的代幣實作了 API。它還為應該接收 ERC-223 代幣的合約宣告了 API。不支援 ERC-223 接收者 API 的合約無法接收 ERC-223 代幣，從而防止使用者錯誤。

如果智能合約實作了以下方法與事件，則可以稱為相容於 ERC-223 的代幣合約。一旦部署，它將負責追蹤在以太坊上建立的代幣。

該合約不強制僅具有這些函式，開發人員可以將不同代幣標準的任何其他功能新增至此合約中。例如，`approve` 與 `transferFrom` 函式不是 ERC-223 標準的一部分，但如果需要，可以實作這些函式。

來自 [EIP-223](https://eips.ethereum.org/EIPS/eip-223)：

### 方法 {#methods}

ERC-223 代幣必須實作以下方法：

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

應該接收 ERC-223 代幣的合約必須實作以下方法：

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

如果將 ERC-223 代幣發送到未實作 `tokenReceived(..)` 函式的合約，則轉帳必須失敗，且代幣不得從發送者的餘額中移出。

### 事件 {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### 範例 {#examples}

ERC-223 代幣的 API 類似於 ERC-20，因此從使用者介面 (UI) 開發的角度來看沒有差異。唯一的例外是 ERC-223 代幣可能沒有 `approve` + `transferFrom` 函式，因為這些在此標準中是選用的。

#### Solidity 範例 {#solidity-example}

以下範例說明了基本的 ERC-223 代幣合約如何運作：

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

現在我們希望另一個合約接受 `tokenA` 的存款，假設 tokenA 是 ERC-223 代幣。該合約必須僅接受 tokenA 並拒絕任何其他代幣。當合約接收到 tokenA 時，它必須觸發 `Deposit()` 事件並增加內部 `deposits` 變數的值。

程式碼如下：

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // 我們唯一想要接受的代幣。
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // 重要的是要了解在此函式中
        // msg.sender 是正在接收的代幣地址，
        // msg.value 總是為 0，因為在大多數情況下代幣合約並不擁有或發送以太幣，
        // _from 是代幣轉帳的發送者，
        // _value 是已存入的代幣數量。
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## 常見問題 {#faq}

### 如果我們發送一些 tokenB 到合約會發生什麼事？ {#sending-tokens}

交易將會失敗，且代幣轉帳不會發生。代幣將退還至發送者的地址。

### 我們如何向此合約存款？ {#contract-deposits}

呼叫 ERC-223 代幣的 `transfer(address,uint256)` 或 `transfer(address,uint256,bytes)` 函式，並指定 `RecipientContract` 的地址。

### 如果我們將 ERC-20 代幣轉帳到此合約會發生什麼事？ {#erc-20-transfers}

如果將 ERC-20 代幣發送到 `RecipientContract`，代幣將被轉帳，但該轉帳不會被識別（不會觸發 `Deposit()` 事件，且存款值不會改變）。無法過濾或防止不必要的 ERC-20 存款。

### 如果我們想在代幣存款完成後執行某些函式怎麼辦？ {#function-execution}

有多種方法可以做到這一點。在此範例中，我們將遵循使 ERC-223 轉帳與以太幣轉帳相同的方法：

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // 我們唯一想要接受的代幣。
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // 處理傳入的交易並執行後續的函式呼叫。
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

當 `RecipientContract` 接收到 ERC-223 代幣時，合約將執行編碼為代幣交易 `_data` 參數的函式，這與以太幣交易將函式呼叫編碼為交易 `data` 的方式相同。閱讀[資料欄位](/developers/docs/transactions/#the-data-field)以了解更多資訊。

在上述範例中，必須使用 `transfer(address,uin256,bytes calldata _data)` 函式將 ERC-223 代幣轉帳到 `RecipientContract` 的地址。如果資料參數為 `0xc2985578`（`foo()` 函式的簽章），則在收到代幣存款後將呼叫 foo() 函式，並觸發 Foo() 事件。

參數也可以編碼在代幣轉帳的 `data` 中，例如我們可以呼叫 bar() 函式，並將 `_someNumber` 的值設為 12345。在這種情況下，`data` 必須是 `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`，其中 `0x0423a132` 是 `bar(uint256)` 函式的簽章，而 `00000000000000000000000000000000000000000000000000000000000004d2` 是作為 uint256 的 12345。

## 限制 {#limitations}

雖然 ERC-223 解決了 ERC-20 標準中發現的幾個問題，但它也有其自身的限制：

- 採用與相容性：ERC-223 尚未被廣泛採用，這可能會限制其與現有工具和平台的相容性。
- 向後相容性：ERC-223 不向後相容於 ERC-20，這意味著現有的 ERC-20 合約和工具在未經修改的情況下無法與 ERC-223 代幣一起運作。
- 燃料成本：與 ERC-20 交易相比，ERC-223 轉帳中的額外檢查與功能可能會導致更高的燃料成本。

## 延伸閱讀 {#further-reading}

- [EIP-223：ERC-223 代幣標準](https://eips.ethereum.org/EIPS/eip-223)
- [最初的 ERC-223 提案](https://github.com/ethereum/eips/issues/223)