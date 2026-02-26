---
title: "智慧型合約結構"
description: "智慧型合約深入解析：功能、資料、變數。"
lang: zh-tw
---

智慧型合約是在以太坊地址運作的程式。 由可以在接收交易後執行的資料與函數組成。 此為智慧型合約組成的概覽。

## 先決條件 {#prerequisites}

請務必先閱讀關於 [智能合約](/developers/docs/smart-contracts/) 的內容。 此文件假設你已熟悉 JavaScript 或 Python 等程式語言。

## 資料 {#data}

任何合約資料都必須指派到一個位置：`storage` 或 `memory`。 修改智慧型合約的存儲很麻煩，所以必須謹慎思考要將資料儲存至何處。

### Storage {#storage}

永久資料也稱為存儲，並由狀態變數表示。 這些值會永久儲存於區塊鏈上。 你需要聲明一個類型，以便於合約在編譯時可以追蹤在區塊鏈上需要多少存儲空間。

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

如果已編寫過物件導向程式語言，應該會熟悉大多數類型。 但是，如果你是剛接觸以太坊開發的新手，應該會對 `address` 感到陌生。

`address` 類型可以儲存一個以太坊地址，相當於 20 個位元組或 160 位元。 它會以十六進制的形式傳回，前綴是 0x。

其他類型包含：

- 布林值
- 整數
- 定點數
- 固定規模的位元組陣列
- 動態大小的位元組陣列
- 有理數與整數常值
- 字串常值
- 十六進位常值
- 列舉

如需更多說明，請參閱文件：

- [查看 Vyper 類型](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [查看 Solidity 類型](https://docs.soliditylang.org/en/latest/types.html#value-types)

### 記憶體 {#memory}

僅在合約函數的執行生命週期儲存的值稱為記憶體變數。 由於這些變數不是永久儲存在區塊鏈上，所以使用成本要低得多。

在 [Solidity 文件](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)中，深入了解 EVM 如何儲存資料 (儲存體、記憶體與堆疊)。

### 環境變數 {#environment-variables}

除了在自已的合約上定義的變數外，還有一些特殊的全域變數。 它們主要用於提供有關區塊鏈或目前交易的資訊。

範例：

| **屬性**            | **狀態變數** | **描述**      |
| ----------------- | -------- | ----------- |
| `block.timestamp` | uint256  | 目前區塊時期的時間戳  |
| `msg.sender`      | address  | 訊息發送者（目前調用） |

## 函數 {#functions}

用最簡單的術語來說，函數可以取得資訊或者設定資訊來回應傳入的交易。

有兩種函數調用方式：

- `internal` – 這些不會建立 EVM 呼叫
  - 內部函數和狀態變數只能在內部存取 (即從目前合約或衍生自它的合約中存取)
- `external` – 這些會建立 EVM 呼叫
  - 外部函數是合約介面的一部分，這表示可以從其他合約與透過交易調用。 外部函數 `f` 無法在內部呼叫 (即 `f()` 無法運作，但 `this.f()` 可以)。

它們也可以是 `public` 或 `private`

- `public` 函數可以從合約內部或透過訊息從外部呼叫
- `private` 函數只有在定義它們的合約中才可見，在衍生合約中則不可見

函數和狀態變數都可以被定義為 Public 或 Private

以下是更新合約狀態變數的函數：

```solidity
// Solidity 範例
function update_name(string value) public {
    dapp_name = value;
}
```

- 類型為 `string` 的參數 `value` 會傳遞至函數：`update_name`
- 它被宣告為 `public`，代表任何人都可以存取
- 它未被宣告為 `view`，因此可以修改合約狀態

### 檢視函數 {#view-functions}

這些函數保證不會修改合約資料的狀態。 常見範例為「getter」函數，例如，你可能用此接收使用者的餘額。

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

以下情況被視為修改狀態：

1. 寫入狀態變數。
2. [發出事件](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)。
3. [建立其他合約](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)。
4. 使用 `selfdestruct`。
5. 透過調用傳送以太幣。
6. 呼叫任何未標示為 `view` 或 `pure` 的函數。
7. 使用低階調用。
8. 使用包含特定作業碼的行內組譯。

### 建構函數 {#constructor-functions}

`constructor` 函數只會在合約首次部署時執行一次。 與許多以類別為基礎的程式語言中的 `constructor` 類似，這些函數通常會將狀態變數初始化為其指定值。

```solidity
// Solidity 範例
// 初始化合約的資料，將 `owner`
// 設定為合約建立者的地址。
constructor() public {
    // 所有智能合約都依賴外部交易來觸發其函數。
    // `msg` 是一個全域變數，其中包含關於特定交易的相關資料，
    // 例如傳送者的地址以及交易中包含的 ETH 值。
    // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
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

### 內建函數 {#built-in-functions}

除了自己合約上定義的變數與函數外，還有一些特殊的內建函數。 最明顯的例子：

- `address.send()` – Solidity
- `send(address)` – Vyper

這讓合約可以給其他帳戶傳送以太幣。

## 撰寫函數 {#writing-functions}

你的函數需要：

- 參數變數及其類型（若接受參數）
- 聲明為 internal/external
- 聲明為 pure/view/payable
- 傳回類型（若傳回值）

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // 狀態變數

    // 在合約部署時呼叫，並初始化數值
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get 函數
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set 函數
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

完整的合約看起來可能如上所示。 此處的 `constructor` 函數為 `dapp_name` 變數提供了一個初始值。

## 事件與日誌 {#events-and-logs}

事件讓你的智慧型合約能夠與你的前端或其他訂閱應用程式進行通訊。 一旦交易被驗證並新增到區塊中，智慧型合約就可以發出事件和記錄訊息，然後前端就能夠處理和利用這些資訊。

## 附註範例 {#annotated-examples}

以下是一些用 Solidity 編寫的範例。 如果你想試用這些程式碼，可以在 [Remix](http://remix.ethereum.org) 中與其互動。

### Hello world {#hello-world}

```solidity
// 指定 Solidity 的版本，使用語意化版本控制。
// 深入了解：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// 定義一個名為 `HelloWorld` 的合約。
// 合約是函數和資料 (其狀態) 的集合。
// 部署之後，合約會存放在以太坊區塊鏈的特定地址上。
// 深入了解：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // 宣告一個類型為 `string` 的狀態變數 `message`。
    // 狀態變數的值會永久儲存在合約儲存體中。
    // `public` 關鍵字讓變數可以從合約外部存取，
    // 並建立一個可供其他合約或用戶端呼叫以存取其值的函數。
    string public message;

    // 與許多以類別為基礎的物件導向語言相似，建構函式是
    // 一個只在合約建立時執行的特殊函數。
    // 建構函式是用來初始化合約的資料。
    // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // 接受一個字串引數 `initMessage` 並將值設定
        // 到合約的 `message` 儲存變數中)。
        message = initMessage;
    }

    // 一個公開函數，它接受一個字串引數
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
    // `address` 類似於電子郵件地址，用來識別以太坊上的帳戶。
    // 地址可以代表一個智能合約或一個外部 (使用者) 帳戶。
    // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` 本質上是一種雜湊表資料結構。
    // 這個 `mapping` 會將一個無正負號整數 (代幣餘額) 指派給一個地址 (代幣持有者)。
    // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // 事件允許在區塊鏈上紀錄活動。
    // 以太坊用戶端可以監聽事件，以便對合約狀態變更做出反應。
    // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // 初始化合約的資料，將 `owner`
    // 設定為合約建立者的地址。
    constructor() public {
        // 所有智能合約都依賴外部交易來觸發其函數。
        // `msg` 是一個全域變數，其中包含關於特定交易的相關資料，
        // 例如傳送者的地址以及交易中包含的 ETH 值。
        // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // 建立一定數量的新代幣並將其傳送到一個地址。
    function mint(address receiver, uint amount) public {
        // `require` 是一種控制結構，用於強制執行某些條件。
        // 如果 `require` 陳述式求值為 `false`，則會觸發例外，
        // 它會還原在目前呼叫期間對狀態所做的所有變更。
        // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 只有合約擁有者可以呼叫此函數
        require(msg.sender == owner, "您不是擁有者。");

        // 強制執行代幣的最大數量
        require(amount < 1e60, "已超過最大發行量");

        // 將 `receiver` 的餘額增加 `amount`
        balances[receiver] += amount;
    }

    // 從任何呼叫者傳送一定數量的現有代幣到一個地址。
    function transfer(address receiver, uint amount) public {
        // 傳送者必須有足夠的代幣才能傳送
        require(amount <= balances[msg.sender], "餘額不足。");

        // 調整兩個地址的代幣餘額
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

// 從其他檔案將符號匯入到目前合約中。
// 在此案例中，是來自 OpenZeppelin 的一系列輔助合約。
// 深入了解：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` 關鍵字用於從外部合約繼承函數和關鍵字。
// 在此案例中，`CryptoPizza` 繼承自 `IERC721` 和 `ERC165` 合約。
// 深入了解：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // 使用 OpenZeppelin 的 SafeMath 程式庫來安全地執行算術運算。
    // 深入了解：https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity 中的常數狀態變數與其他語言相似，
    // 但您必須從一個在編譯時期為常數的運算式指派。
    // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct 類型讓您可以定義自己的類型
    // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // 建立一個 Pizza 結構的空陣列
    Pizza[] public pizzas;

    // 從 pizza ID 到其擁有者地址的對應
    mapping(uint256 => address) public pizzaToOwner;

    // 從擁有者地址到所擁有代幣數量的對應
    mapping(address => uint256) public ownerPizzaCount;

    // 從代幣 ID 到已核准地址的對應
    mapping(uint256 => address) pizzaApprovals;

    // 您可以巢狀化對應，此範例將擁有者對應到操作員核准
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // 從字串 (名稱) 和 DNA 建立隨機 Pizza 的內部函數
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` 關鍵字表示此函數僅在此合約
        // 和衍生自此合約的合約中可見
        // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` 是一個函數修飾詞，用於檢查 pizza 是否已存在
        // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // 將 Pizza 加入 Pizzas 陣列並取得 id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // 檢查 Pizza 擁有者是否與目前使用者相同
        // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 請注意 address(0) 是零地址，
        // 表示 pizza[id] 尚未分配給特定使用者。

        assert(pizzaToOwner[id] == address(0));

        // 將 Pizza 對應到擁有者
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // 從字串 (名稱) 建立隨機 Pizza
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // 從字串 (名稱) 和擁有者 (建立者) 的地址產生隨機 DNA
    function generateRandomDna(string memory _str, address _owner)
        public
        // 標示為 `pure` 的函數保證不會讀取或修改狀態
        // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // 從字串 (名稱) + 地址 (擁有者) 產生隨機 uint
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // 傳回由擁有者找到的 Pizzas 陣列
    function getPizzasByOwner(address _owner)
        public
        // 標示為 `view` 的函數保證不會修改狀態
        // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // 使用 `memory` 儲存位置來儲存僅在此函數呼叫
        // 的生命週期內有效的值。
        // 深入了解：https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // 將 Pizza 和所有權轉移到其他地址
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "無效地址。");
        require(_exists(_pizzaId), "Pizza 不存在。");
        require(_from != _to, "無法轉移到相同地址。");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "地址未經核准。");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // 發出匯入的 IERC721 合約中定義的事件
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * 安全地將指定代幣 ID 的所有權轉移到另一個地址
     * 如果目標地址是合約，則必須實作 `onERC721Received`，
     * 它會在安全轉移時呼叫，並傳回魔術值
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
     * 安全地將指定代幣 ID 的所有權轉移到另一個地址
     * 如果目標地址是合約，則必須實作 `onERC721Received`，
     * 它會在安全轉移時呼叫，並傳回魔術值
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
        require(_checkOnERC721Received(from, to, pizzaId, _data), "必須實作 onERC721Received。");
    }

    /**
     * 在目標地址上叫用 `onERC721Received` 的內部函數
     * 如果目標地址不是合約，則不會執行此呼叫
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

    // 銷毀 Pizza - 完全摧毀代幣
    // `external` 函數修飾詞表示此函數是
    // 合約介面的一部分，其他合約可以呼叫它
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "無效地址。");
        require(_exists(_pizzaId), "Pizza 不存在。");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "地址未經核准。");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // 依地址傳回 Pizzas 的計數
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // 依 id 傳回找到的 Pizza 的擁有者
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "無效的 Pizza ID。");
        return owner;
    }

    // 核准其他地址轉移 Pizza 的所有權
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "必須是 Pizza 擁有者。");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // 傳回特定 Pizza 的已核准地址
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza 不存在。");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * 清除指定代幣 ID 目前核准的私有函數
     * 如果指定地址確實不是代幣的擁有者，則還原
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "必須是 pizza 擁有者。");
        require(_exists(_pizzaId), "Pizza 不存在。");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * 設定或取消設定指定操作員的核准
     * 操作員被允許代表傳送者轉移其所有代幣
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "無法核准自己的地址");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // 告知操作員是否已由指定擁有者核准
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // 取得 Pizza 的所有權 - 僅限已核准的使用者
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "地址未經核准。");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // 檢查 Pizza 是否存在
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // 檢查地址是否為擁有者或已獲准轉移 Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // 因下列問題停用 solium 檢查
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // 檢查 Pizza 是否獨一無二且尚不存在
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
        require(result, "具有此名稱的 Pizza 已存在。");
        _;
    }

    // 傳回目標地址是否為合約
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // 目前沒有比檢查該地址的程式碼大小更好的方法來檢查地址中是否有合約。
        // 如需有關其運作方式的更多詳細資訊，請參閱 https://ethereum.stackexchange.com/a/14016/36603。
        // TODO 在 Serenity 發布前再次檢查，因為屆時所有地址都將是
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

請參閱 Solidity 和 Vyper 文件，獲得智慧型合約更完整的概觀：

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## 相關主題 {#related-topics}

- [智能合約](/developers/docs/smart-contracts/)
- [以太坊虛擬機](/developers/docs/evm/)

## 相關教學 {#related-tutorials}

- [縮減合約以克服合約大小限制](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– 一些縮減智能合約大小的實用技巧。_
- [使用事件記錄智能合約的資料](/developers/tutorials/logging-events-smart-contracts/) _– 智能合約事件簡介，以及如何使用它們來記錄資料。_
- [從 Solidity 與其他合約互動](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 如何從現有合約部署智能合約並與其互動。_
