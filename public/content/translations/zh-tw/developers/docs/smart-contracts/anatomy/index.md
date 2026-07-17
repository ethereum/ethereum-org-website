---
title: "智能合約的剖析"
description: "深入探討智能合約的剖析：函式、資料與變數。"
lang: zh-tw
---

智能合約是在以太坊上某個地址執行的程式。它們由資料和函式組成，可以在收到交易時執行。以下是構成智能合約的要素概述。

## 先決條件 {#prerequisites}

請確保你已經先閱讀過[智能合約](/developers/docs/smart-contracts/)。本文件假設你已經熟悉 JavaScript 或 Python 等程式語言。

## 資料 {#data}

任何合約資料都必須指派一個位置：`storage` 或 `memory`。在智能合約中修改儲存空間的成本很高，因此你需要考慮資料應該存放在哪裡。

### 儲存空間 (Storage) {#storage}

永久性資料被稱為儲存空間，並由狀態變數表示。這些值會永久儲存在區塊鏈上。你需要宣告型別，以便合約在編譯時能追蹤它需要多少區塊鏈上的儲存空間。

```solidity
// Solidity 範例
contract SimpleStorage {
    uint storedData; // 狀態變數
    // ...
}
```

```python
# Vyper 範例
storedData: int128
```

如果你已經寫過物件導向語言的程式，你可能對大多數的型別都很熟悉。然而，如果你剛接觸[以太坊](/)開發，`address` 對你來說應該是個新概念。

`address` 型別可以容納一個以太坊地址，相當於 20 個位元組或 160 個位元。它會以 0x 開頭的十六進位表示法回傳。

其他型別包括：

- 布林值 (boolean)
- 整數 (integer)
- 定點數 (fixed point numbers)
- 固定大小的位元組陣列 (fixed-size byte arrays)
- 動態大小的位元組陣列 (dynamically sized byte arrays)
- 有理數與整數常值 (rational and integer literals)
- 字串常值 (string literals)
- 十六進位常值 (hexadecimal literals)
- 列舉 (enums)

如需更多說明，請查看文件：

- [查看 Vyper 型別](https://docs.vyperlang.org/en/stable/types.html#value-types)
- [查看 Solidity 型別](https://docs.soliditylang.org/en/latest/types.html#value-types)

### 記憶體 (Memory) {#memory}

僅在合約函式執行期間儲存的值稱為記憶體變數。由於這些變數不會永久儲存在區塊鏈上，因此使用它們的成本要低得多。

在 [Solidity 文件](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)中了解更多關於以太坊虛擬機 (EVM) 如何儲存資料（儲存空間、記憶體與堆疊）的資訊。

### 環境變數 {#environment-variables}

除了你在合約中定義的變數之外，還有一些特殊的全域變數。它們主要用於提供有關區塊鏈或當前交易的資訊。

範例：

| **屬性**          | **狀態變數** | **描述**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | 當前區塊紀元時間戳記        |
| `msg.sender`      | address            | 訊息發送者（當前呼叫） |

## 函式 {#functions}

簡單來說，函式可以獲取資訊或設定資訊，以回應傳入的交易。

函式呼叫有兩種類型：

- `internal` – 這些不會建立 EVM 呼叫
  - 內部函式和狀態變數只能在內部存取（即從當前合約或衍生自它的合約內部）
- `external` – 這些會建立 EVM 呼叫
  - 外部函式是合約介面的一部分，這意味著它們可以從其他合約和透過交易來呼叫。外部函式 `f` 不能在內部呼叫（即 `f()` 無效，但 `this.f()` 有效）。

它們也可以是 `public` 或 `private`

- `public` 函式可以從合約內部呼叫，或透過訊息從外部呼叫
- `private` 函式僅對定義它們的合約可見，在衍生合約中不可見

函式和狀態變數都可以設為公開 (public) 或私有 (private)

以下是用於更新合約上狀態變數的函式：

```solidity
// Solidity 範例
function update_name(string value) public {
    dapp_name = value;
}
```

- 型別為 `string` 的參數 `value` 被傳遞到函式中：`update_name`
- 它被宣告為 `public`，這意味著任何人都可以存取它
- 它沒有被宣告為 `view`，因此它可以修改合約狀態

### 視圖函式 (View functions) {#view-functions}

這些函式承諾不會修改合約資料的狀態。常見的例子是「getter」函式——例如，你可能會使用它來獲取使用者的餘額。

```solidity
// Solidity 範例
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

什麼被視為修改狀態：

1. 寫入狀態變數。
2. [觸發事件](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)。
3. [建立其他合約](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)。
4. 使用 `selfdestruct`。
5. 透過呼叫發送以太幣。
6. 呼叫任何未標記為 `view` 或 `pure` 的函式。
7. 使用低階呼叫。
8. 使用包含特定操作碼的行內組合語言 (inline assembly)。

### 建構函式 {#constructor-functions}

`constructor` 函式僅在合約首次部署時執行一次。就像許多基於類別的程式語言中的 `constructor` 一樣，這些函式通常會將狀態變數初始化為其指定的值。

```solidity
// Solidity 範例
// 初始化合約的資料，將 `owner` 設定
// 為合約創建者的地址。
constructor() public {
    // 所有智能合約都依賴外部交易來觸發其函式。
    // `msg` 是一個全域變數，包含給定交易的相關資料，
    // 例如發送者的地址和交易中包含的 ETH 數值。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper 範例

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### 內建函式 {#built-in-functions}

除了你在合約中定義的變數和函式之外，還有一些特殊的內建函式。最明顯的例子是：

- `address.send()` – Solidity
- `send(address)` – Vyper

這些允許合約將 ETH 發送到其他帳戶。

## 撰寫函式 {#writing-functions}

你的函式需要：

- 參數變數和型別（如果它接受參數）
- 宣告 internal/external
- 宣告 pure/view/payable
- 回傳型別（如果它回傳一個值）

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // 狀態變數

    // 在合約部署時被呼叫並初始化數值
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // 取得函式
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // 設定函式
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

一個完整的合約可能看起來像這樣。在這裡，`constructor` 函式為 `dapp_name` 變數提供了一個初始值。

## 事件與日誌 {#events-and-logs}

事件使你的智能合約能夠與你的前端或其他訂閱應用程式進行通訊。一旦交易被驗證並新增到區塊中，智能合約就可以觸發事件並記錄資訊，前端隨後可以處理和利用這些資訊。

## 附註解的範例 {#annotated-examples}

這些是一些用 Solidity 撰寫的範例。如果你想試試這些程式碼，可以在 [Remix](https://remix.ethereum.org) 中與它們互動。

### Hello world {#hello-world}

```solidity
// 指定 Solidity 的版本，使用語意化版本控制。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// 定義一個名為 `HelloWorld` 的合約。
// 合約是函式與資料（其狀態）的集合。
// 一旦部署，合約就會駐留在以太坊區塊鏈上的一個特定地址。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // 宣告一個 `string` 型別的狀態變數 `message`。
    // 狀態變數是其數值永久儲存在合約儲存空間中的變數。
    // `public` 關鍵字使變數可以從合約外部存取
    // 並建立一個其他合約或客戶端可以呼叫以存取該數值的函式。
    string public message;

    // 與許多基於類別的物件導向語言類似，建構函式是
    // 一個僅在合約創建時執行的特殊函式。
    // 建構函式用於初始化合約的資料。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // 接受一個字串參數 `initMessage` 並將其數值設定
        // 到合約的 `message` 儲存變數中）。
        message = initMessage;
    }

    // 一個接受字串參數的公開函式
    // 並更新 `message` 儲存變數。
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### 代幣 {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address` 類似於電子郵件地址 - 它用於識別以太坊上的一個帳戶。
    // 地址可以代表一個智能合約或一個外部（使用者）帳戶。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` 本質上是一個雜湊表資料結構。
    // 這個 `mapping` 將一個無號整數（代幣餘額）分配給一個地址（代幣持有者）。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // 事件允許在區塊鏈上記錄活動日誌。
    // 以太坊客戶端可以監聽事件，以便對合約狀態的變化做出反應。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // 初始化合約的資料，將 `owner` 設定
    // 為合約創建者的地址。
    constructor() public {
        // 所有智能合約都依賴外部交易來觸發其函式。
        // `msg` 是一個全域變數，包含給定交易的相關資料，
        // 例如發送者的地址和交易中包含的 ETH 數值。
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // 創建一定數量的新代幣並將它們發送到一個地址。
    function mint(address receiver, uint amount) public {
        // `require` 是一個用於強制執行特定條件的控制結構。
        // 如果 `require` 敘述的評估結果為 `false`，則會觸發一個例外，
        // 這將還原在當前呼叫期間對狀態所做的所有更改。
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 只有合約擁有者可以呼叫此函式
        require(msg.sender == owner, "You are not the owner.");

        // 強制執行代幣的最大數量
        require(amount < 1e60, "Maximum issuance exceeded");

        // 將 `receiver` 的餘額增加 `amount`
        balances[receiver] += amount;
    }

    // 將一定數量的現有代幣從任何呼叫者發送到一個地址。
    function transfer(address receiver, uint amount) public {
        // 發送者必須有足夠的代幣來發送
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // 調整這兩個地址的代幣餘額
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // 發出先前定義的事件
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### 獨特的數位資產 {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// 從其他檔案將符號匯入到當前合約中。
// 在這個例子中，是來自 OpenZeppelin 的一系列輔助合約。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` 關鍵字用於從外部合約繼承函式和關鍵字。
// 在這個例子中，`CryptoPizza` 繼承了 `IERC721` 和 `ERC165` 合約。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // 使用 OpenZeppelin 的 SafeMath 函式庫來安全地執行算術運算。
    // 了解更多：https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity 中的常數狀態變數與其他語言類似
    // 但你必須從一個在編譯時為常數的表達式進行賦值。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct（結構）型別讓你定義自己的型別
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // 創建一個空的 Pizza 結構陣列
    Pizza[] public pizzas;

    // 從 pizza ID 映射到其擁有者的地址
    mapping(uint256 => address) public pizzaToOwner;

    // 從擁有者的地址映射到擁有的代幣數量
    mapping(address => uint256) public ownerPizzaCount;

    // 從代幣 ID 映射到已授權的地址
    mapping(uint256 => address) pizzaApprovals;

    // 你可以巢狀映射，這個例子將擁有者映射到操作員的授權
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // 從字串（名稱）和 DNA 創建隨機 Pizza 的內部函式
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` 關鍵字表示此函式僅在
        // 此合約以及衍生自此合約的合約內可見
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` 是一個函式修飾子，用於檢查 pizza 是否已經存在
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // 將 Pizza 加入到 Pizzas 陣列並取得 id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // 檢查 Pizza 擁有者是否與當前使用者相同
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 注意 address(0) 是零地址，
        // 表示 pizza[id] 尚未分配給特定使用者。

        assert(pizzaToOwner[id] == address(0));

        // 將 Pizza 映射到擁有者
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // 從字串（名稱）創建一個隨機的 Pizza
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // 從字串（名稱）和擁有者（創建者）的地址生成隨機 DNA
    function generateRandomDna(string memory _str, address _owner)
        public
        // 標記為 `pure` 的函式承諾不會讀取或修改狀態
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // 從字串（名稱）+ 地址（擁有者）生成隨機 uint
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // 回傳由擁有者找到的 Pizzas 陣列
    function getPizzasByOwner(address _owner)
        public
        // 標記為 `view` 的函式承諾不會修改狀態
        // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // 使用 `memory` 儲存位置來儲存僅在
        // 此函式呼叫生命週期內的數值。
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

    // 將 Pizza 及其所有權轉移到其他地址
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // 發出在匯入的 IERC721 合約中定義的事件
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * 安全地將給定代幣 ID 的所有權轉移到另一個地址
     * 如果目標地址是一個合約，它必須實作 `onERC721Received`，
     * 該函式會在安全轉移時被呼叫，並回傳魔術數值
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`；
     * 否則，轉移將被還原。
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * 安全地將給定代幣 ID 的所有權轉移到另一個地址
     * 如果目標地址是一個合約，它必須實作 `onERC721Received`，
     * 該函式會在安全轉移時被呼叫，並回傳魔術數值
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`；
     * 否則，轉移將被還原。
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
     * 在目標地址上呼叫 `onERC721Received` 的內部函式
     * 如果目標地址不是合約，則不會執行該呼叫
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

    // 銷毀一個 Pizza - 完全摧毀代幣
    // `external` 函式修飾子表示此函式是
    // 合約介面的一部分，其他合約可以呼叫它
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

    // 依地址回傳 Pizzas 的數量
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // 回傳依 id 找到的 Pizza 的擁有者
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // 授權其他地址轉移 Pizza 的所有權
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // 回傳特定 Pizza 的已授權地址
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * 清除給定代幣 ID 當前授權的私有函式
     * 如果給定地址確實不是代幣的擁有者，則還原
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * 設定或取消設定給定操作員的授權
     * 操作員被允許代表發送者轉移其所有代幣
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // 告知操作員是否已獲得給定擁有者的授權
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // 取得 Pizza 的所有權 - 僅限已授權的使用者
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // 檢查 Pizza 是否存在
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // 檢查地址是否為擁有者或已獲授權轉移 Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // 停用 solium 檢查，因為
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // 檢查 Pizza 是否唯一且尚未存在
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

    // 回傳目標地址是否為合約
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // 目前沒有更好的方法來檢查一個地址中是否有合約
        // 只能檢查該地址的程式碼大小。
        // 請參閱 https://ethereum.stackexchange.com/a/14016/36603
        // 以了解有關其運作方式的更多詳細資訊。
        // 待辦事項：在 Serenity 發布之前再次檢查此項目，因為屆時所有地址都將是
        // 合約。
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## 延伸閱讀 {#further-reading}

查看 Solidity 和 Vyper 的文件，以獲得更完整的智能合約概述：

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## 相關主題 {#related-topics}

- [智能合約](/developers/docs/smart-contracts/)
- [以太坊虛擬機 (EVM)](/developers/docs/evm/)

## 相關教學 {#related-tutorials}

- [縮小合約以應對合約大小限制](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– 減少智能合約大小的一些實用技巧。_
- [使用事件記錄智能合約的資料](/developers/tutorials/logging-events-smart-contracts/) _– 智能合約事件的簡介，以及如何使用它們來記錄資料。_
- [從 Solidity 與其他合約互動](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 如何從現有合約部署智能合約並與之互動。_
