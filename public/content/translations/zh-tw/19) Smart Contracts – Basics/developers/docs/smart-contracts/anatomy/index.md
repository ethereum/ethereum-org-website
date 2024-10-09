---
title: 智慧型合約結構
description: 智慧型合約深入解析：功能、資料、變數。
lang: zh-tw
---

智慧型合約是在以太坊地址運作的程式。 由可以在接收交易後執行的資料與函數組成。 此為智慧型合約組成的概覽。

## 先決條件 {#prerequisites}

務必先瞭解[智慧型合約](/developers/docs/smart-contracts/)。 此文件假設你已熟悉 JavaScript 或 Python 等程式語言。

## 資料 {#data}

任何合約資料都須指定至 `storage` 或 `memory` 這兩個位置。 修改智慧型合約的存儲很麻煩，所以必須謹慎思考要將資料儲存至何處。

### 儲存 {#storage}

永久資料也稱為存儲，並由狀態變數表示。 這些值會永久儲存於區塊鏈上。 你需要聲明一個類型，以便於合約在編譯時可以追蹤在區塊鏈上需要多少存儲空間。

```solidity
// Solidity 範例
contract SimpleStorage {
    uint storedData; //狀態變量
    // ...
}
```

```python
# Vyper 範例
storedData: int128
```

如果已編寫過物件導向程式語言，應該會熟悉大多數類型。 但如果剛接觸以太坊開發，則會不熟悉 `address` 類型。

一個 `address` 類型可以容納一個以太坊地址，相當於 20 個位元組或 160 個位元。 它會以十六進制的形式傳回，前綴是 0x。

其他類型包含：

- 布林值
- 整數
- 定點數
- 固定規模的位元組陣列
- 動態規模的位元組陣列
- 有理數和整數常值
- 字串常值
- 十六進位常值
- 列舉

如需更多說明，請參閱文件：

- [查看 Vyper 類型](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [查看 Solidity 類型](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### 記憶體 {#memory}

僅在合約函數的執行生命週期儲存的值稱為記憶體變數。 由於這些變數不是永久儲存在區塊鏈上，所以使用成本要低得多。

在 [Solidity 文件](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack)中深入瞭解以太坊虛擬機如何儲存資料（存儲、記憶體和堆疊）。

### 環境變數 {#environment-variables}

除了在自已的合約上定義的變數外，還有一些特殊的全域變數。 它們主要用於提供有關區塊鏈或目前交易的資訊。

範例：

| **屬性**            | **狀態變數** | **描述**      |
| ----------------- | -------- | ----------- |
| `block.timestamp` | uint256  | 目前區塊時期的時間戳  |
| `msg.sender`      | address  | 訊息發送者（目前調用） |

## 函式 {#functions}

用最簡單的術語來說，函數可以取得資訊或者設定資訊來回應傳入的交易。

有兩種函數調用方式：

- `Internal` – 不會建立以太坊虛擬機調用
  - 內部函數和狀態變數只能在內部存取（如在目前合約內部或從其衍生的合約存取）
- `External` – 會建立以太坊虛擬機調用
  - 外部函數是合約介面的一部分，這表示可以從其他合約與透過交易調用。 一個外部函數 `f` 不可以被內部調用（即 `f()` 無法工作，但 `this.f()` 可以）。

它們還可以是 `Public` 或 `Private`

- `public` 函數可以在合約內部調用或者透過訊息在合約外部調用
- `Private` 函數僅定義它們的合約內部可見，而不會出現在衍生合約中

函數和狀態變數都可以被定義為 Public 或 Private

以下是更新合約狀態變數的函數：

```solidity
// Solidity 範例
function update_name(string value) public {
    dapp_name = value;
}
```

- `String` 類型的參數 `Value` 傳入函數 `update_name`
- 該函數聲明為 `public`，表示任何人都能存取
- 該函數未聲明為 `view`，因此可以修改合約狀態

### 檢視函式 {#view-functions}

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
2. [釋出事件](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events)。
3. [建立其他合約](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts)。
4. 使用 `selfdestruct` 。
5. 透過調用傳送以太幣。
6. 調用任何未標記為 `view` 或 `pure` 的函數。
7. 使用低階調用。
8. 使用包含特定作業碼的行內組譯。

### Constructor 函式 {#constructor-functions}

`constructor` 函數只在首次部署時執行一次。 與許多基於類型之程式語言的 `constructor` 函數類似，這些函數常將狀態變數初始化為指定值。

```solidity
// Solidity 示例
// 初始化合約數據, 設置 `owner`為合約的創建者。
constructor() public {
    // 所有智慧型合約依賴外部交易來觸發其函數。
    // `msg` 是一個全局變量，包含了給定交易的相關數據，
    // 例如發送者的地址和交易中包含的ETH數量。
    // 了解更多: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
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

除了自己合約上定義的變數與函數外，還有一些特殊的內建函數。 最明顯的例子：

- `address.send()` – Solidity
- `send(address)` – Vyper

這讓合約可以給其他帳戶傳送以太幣。

## 編寫函式 {#writing-functions}

你的函數需要：

- 參數變數及其類型（若接受參數）
- 聲明為 internal/external
- 聲明為 pure/view/payable
- 傳回類型（若傳回值）

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
   string dapp_name; //state variable

   /*在合約部署時調用以初始化數據*/
   constructor() public{
        dapp_name = "My Example dapp";
    }

    // Get 函數
    function read_name() public view returns(string){
       return dapp_name;
        }

    // Set 函數
    function update_name(string value) public {
        dapp_name = value;
        }
}
```

完整的合約看起來可能如上所示。 這裡的 `constructor` 函數為 `dapp_name` 變數提供初始值。

## 事件與記錄 {#events-and-logs}

事件讓你的智慧型合約能夠與你的前端或其他訂閱應用程式進行通訊。 一旦交易被驗證並新增到區塊中，智慧型合約就可以發出事件和記錄訊息，然後前端就能夠處理和利用這些資訊。

## 附註範例 {#annotated-examples}

以下是一些用 Solidity 編寫的範例。 若你想試著編寫程式碼，可以在 [Remix](http://remix.ethereum.org) 中與這些範例互動。

### Hello world {#hello-world}

```solidity
// 確定Solidity版本，使用語義化版本。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// 定義合約名稱 `HelloWorld`.
// 一個合約是函數和數據 (其狀態) 的集合。
// 一旦部署，合約就會留在以太坊區塊鏈的一個特定地址上。
// 了解更多： https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // 定義`string`類型變量 `message`
    // 狀態變量是其值永久存儲在合約存儲中的變量。
    // 關鍵字 `public` 使得可以從合約外部訪問。
    // 並創建了一個其它合約或客戶可以調用訪問該值的函數。
    string public message;

    // 類似於很多基於類的面向對象語言，
    // 構造函數是僅在合約創建時執行的特殊函數。
    // 構造器用於初始化合約的數據。
    // 了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // 接受一個字符變量 `initMessage`
        // 並為合約的存儲變量`message` 賦值
        message = initMessage;
    }

    // 一個public函數接受字符參數並更新存儲變量 `message`
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### 代幣 {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // 一個 `address` 類比於郵件地址 - 它用來識別以太坊的一個帳戶.
    // 地址可以代表一個智慧型合約或一個外部（用戶）帳戶。
    // 了解更多: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    //  `mapping` 是一個哈希表（hash table）數據結構
    // 此 `mapping` 將一個無符號整數 (代幣餘額) 分配給地址 (代幣持有者)。
    // 了解更多： https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

// 事件（Events）允許在區塊鏈上記錄活動。
    // 以太坊客戶端可以監聽事件，以便對合約狀態更改作出反應。
    // 了解更多： https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // 初始化合約數據，設置 `owner`為合約創建者的地址。
    constructor() public {
    // 所有智慧型合約依賴外部交易來觸發其函數。
        // `msg` 是一個全局變量，包含了給定交易的相關數據，
    // 例如發送者的地址和交易中包含的ETH數量。
        // 了解更多: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // 創建一些新代幣並發送給一個地址
    function mint(address receiver, uint amount) public {
        // `require` 是一個用於強制執行某些條件的控制結構。
        // 如果 `require` 的條件為 `false`, 則異常被觸發,
        // 所有在當前調用中對狀態的更改將被還原。
        // 了解更多： https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 只有合約的擁有者可以調用這個函數
        require(msg.sender == owner, "You are not the owner.");

        // 保證代幣的最大數量
        require(amount < 1e60, "Maximum issuance succeeded");

        // 將 `receiver` 持有的代幣數量數量增加 `amount`
        balances[receiver] += amount;
    }

    // 發送一定數量調用者的代幣給一個地址
    function transfer(address receiver, uint amount) public {
        // 發送者必須有足夠數量的代幣用於發送
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // 調整兩個帳戶的餘額
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // 觸發之前定義的事件。
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### 獨特的數位資產 {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// 從其它文件向當前合約中導入符號
// 本例使用一系列來自OpenZeppelin的輔助合約.
// 了解更多： https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` 關鍵字用於從其它外部合約繼承函數和關鍵字。
// 本例中, `CryptoPizza` 繼承 `IERC721` 和 `ERC165` 合約.
// 了解更多： https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // 使用 OpenZeppelin's SafeMath 庫來安全執行算數操作。
    // 了解更多： https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    //Solidity語言中的常量（Constant）狀態變量與其他語言類似。
    // 但是必須用一個表達式為常量賦值，而這個表達式本身必須在編譯時是一個常量。
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
        // 了解更多: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // 轉移 Pizza 和歸屬關係到其它地址
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // 觸發繼承自 IERC721 合約中定義的事件。
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * 安全轉帳給定代幣 ID 的所有權到其它地址
     * 如果目標地址是一個合約，則該合約必須實現 `onERC721Received`函數,
     * 該函數調用了安全轉帳並且返回一個magic value。
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * 否則, 轉帳被回退.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * 安全轉帳給定代幣ID所有權到其它地址
     * 如果目標地址是一個合約，則該合約必須實現`onERC721Received`函數,
     * 該函數調用安全轉帳並返回一個magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * 否則，轉帳被回退.
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
        // 參閱 https://ethereum.stackexchange.com/a/14016/36603
        // 了解更多信息.
        // TODO： 在Serenity發布前再次檢查這裡,
        // 否則到時所有地址都將判斷為合約.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## 了解更多 {#further-reading}

請參閱 Solidity 和 Vyper 文件，獲得智慧型合約更完整的概觀：

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## 相關主題 {#related-topics}

- [智慧型合約](/developers/docs/smart-contracts/)
- [以太坊虛擬機](/developers/docs/evm/)

## 相關教學 {#related-tutorials}

- [縮減合約大小應對合約大小限制](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– 減少智慧型合約大小的實用秘訣。_
- [用事件記錄智慧型合約資料](/developers/tutorials/logging-events-smart-contracts/) _ – 對智慧型合約事件進行介紹，以及如何使用事件來記錄資料。_
- [與其他 Solidity 合約互動](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 如何從現有合約部署智慧型合約並與之互動。_
