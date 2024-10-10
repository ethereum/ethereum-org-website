---
title: スマートコントラクトの解剖学
description: スマートコンタクトの構造、すなわち機能、データ、変数について詳しく調べます。
lang: ja
---

スマートコントラクトは、イーサリアム上のアドレスで実行されるプログラムです。 それらはトランザクションの受信時に実行できるデータと関数で構成されています。 ここでは、スマートコントラクトの構成要素の概要を説明します。

## 前提知識 {#prerequisites}

最初に、[スマートコントラクト](/developers/docs/smart-contracts/)を必ずお読みください。 このドキュメントは、JavaScriptやPythonなどのプログラミング言語に精通していることを前提としています。

## データ {#data}

すべてのコントラクトのデータは、`storage`または`memory`のいずれかのロケーションに割り当てる必要があります。 スマートコントラクトのストレージの変更にはコストがかかりますので、データをどこに格納するかを考える必要があります。

### ストレージ {#storage}

永続データはストレージと呼ばれ、状態変数で表されます。 これらの値は、ブロックチェーンに永続的に保存されます。 コントラクトがコンパイル時に必要なブロックチェーンのストレージ容量を追跡できるように、型を宣言する必要があります。

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

オブジェクト指向言語でのプログラミングの経験がある場合は、ほとんどの型になじみがあるでしょう。 しかし、イーサリアムの開発が初めての場合、`address`は目新しいかもしれません。

`address`型は、20バイトまたは160ビットに相当するイーサリアムアドレスを保持します。 先頭が0xの16進数を返します。

その他の型には次のものがあります。

- ブール値
- 整数
- 固定小数点数
- 固定サイズのバイト配列
- 動的サイズのバイト配列
- 有理数リテラルと整数リテラル
- 文字列リテラル
- 16進数リテラル
- 列挙型

詳細については、以下のドキュメントをご覧ください。

- [Vyperの型を見る](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Solidityの型を見る](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### メモリ {#memory}

コントラクト関数の実行期間にのみ保存される値は、メモリ変数と呼ばれます。 これらはブロックチェーンに永続的に保存されることはないため、低コストで使用できます

EVMがデータ(ストレージ、メモリ、スタック)を格納する方法の詳細については、[Solidityのドキュメント](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack)をご覧ください。

### 環境変数 {#environment-variables}

コントラクトで定義した変数に加え、特別なグローバル変数がいくつかあります。 これらは主にブロックチェーンや現在のトランザクションに関する情報を提供するために使用されます。

例:

| **プロパティ**         | **状態変数** | **説明**             |
| ----------------- | -------- | ------------------ |
| `block.timestamp` | uint256  | 現在のブロックエポックタイムスタンプ |
| `msg.sender`      | address  | メッセージの送信者(現在の呼び出し) |

## 関数 {#functions}

簡単に言うと、関数は受信トランザクションに応じて情報を取得したり、情報を設定したりすることができます。

関数呼び出しには、以下の2種類があります。

- `internal` - これらはEVM呼び出しを作成しません。
  - internal関数と状態変数は、内部(つまり、現在のコントラクト内またはそれから派生したコントラクト内)からのみアクセスできます。
- `external` - これらはEVM呼び出しを作成します。
  - external関数はコントラクトインターフェイスの一部であり、他のコントラクトから呼び出したり、トランザクションを介して呼び出したりすることができます。 external関数`f`を内部で呼び出すことはできません(つまり、`f()`は動作しませんが、`this.f()`は動作します)。

`public`または`private`にすることもできます。

- `public`関数は、コントラクト内から内部で呼び出すことも、メッセージを介して外部から呼び出すこともできます。
- `private`関数は、それらが定義されているコントラクトからのみ参照できます。派生したコントラクトからは参照できません。

関数と状態変数はどちらもpublicまたはprivateにすることができます。

コントラクトの状態変数を更新するための関数は次のとおりです。

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- `string`型のパラメータ`value`が`update_name`関数に渡されます。
- `public`と宣言されており、誰でもアクセスできます。
- `view`が宣言されていないため、コントラクトの状態を変更できます。

### View関数 {#view-functions}

これらの関数によって、コントラクトのデータの状態を変更しないことを指定します。 一般的な例としては、「getter」関数があります。例えば、これを使用してユーザーの残高を受け取ることができます。

```solidity
// Solidity example
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

状態の変更と見なされるものは、以下のとおりです。

1. 状態変数への書き込み。
2. [イベントの発行](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events)。
3. [他のコントラクトの作成](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts)。
4. `selfdestruct`の使用。
5. 呼び出しによるイーサ(ETH)の送信。
6. `view`や`pure`が指定されていない関数の呼び出し。
7. 低レベル呼び出しの使用。
8. 特定のオペコードを含むインラインアセンブリの使用。

### コンストラクタ関数 {#constructor-functions}

`constructor`関数は、コントラクトが最初にデプロイされたときに1回だけ実行されます。 多くのクラスベースのプログラミング言語の`constructor`と同様に、これらの関数はしばしば、指定された値に状態変数を初期化します。

```solidity
// Solidity example
// Initializes the contract's data, setting the `owner`
// to the address of the contract creator.
constructor() public {
    // All smart contracts rely on external transactions to trigger its functions.
    // `msg` is a global variable that includes relevant data on the given transaction,
    // such as the address of the sender and the ETH value included in the transaction.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper example

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### 組み込み関数 {#built-in-functions}

コントラクトで定義した変数と関数に加え、特別な組み込み関数がいくつかあります。 最もわかりやすい例は、以下のとおりです。

- `address.send()` – Solidity
- `send(address)` – Vyper

これらの関数により、コントラクトは他のアカウントにETHを送信することができます。

## 関数を書く {#writing-functions}

関数には以下のものが必要です。

- パラメータ変数と型(パラメータを受け取る場合)
- internal/externalの宣言
- pure/view/payableの宣言
- 戻り値の型(値を返す場合)

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

完全なコントラクトはこのようになります。 ここで、`constructor`関数は、`dapp_name`変数の初期値を提供します。

## イベントとログ {#events-and-logs}

イベントは、スマートコントラクトがフロントエンドや他のサブスクライブしているアプリケーションと通信することを可能にします。 トランザクションが検証されてブロックに追加されると、スマートコントラクトはイベントを発行し、情報をログに記録できます。これをフロントエンドが処理して活用します。

## 注釈付きの例 {#annotated-examples}

Solidityで書かれた例を以下に示します。 コードを実行したい場合は、[Remix](http://remix.ethereum.org)で操作できます。

### Hello World {#hello-world}

```solidity
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state).
// Once deployed, a contract resides at a specific address on the Ethereum blockchain.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declares a state variable `message` of type `string`.
    // State variables are variables whose values are permanently stored in contract storage.
    // The keyword `public` makes variables accessible from outside a contract
    // and creates a function that other contracts or clients can call to access the value.
    string public message;

    // Similar to many class-based object-oriented languages, a constructor is
    // a special function that is only executed upon contract creation.
    // Constructors are used to initialize the contract's data.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Accepts a string argument `initMessage` and sets the value
        // into the contract's `message` storage variable).
        message = initMessage;
    }

    // A public function that accepts a string argument
    // and updates the `message` storage variable.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### トークン {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // An `address` is comparable to an email address - it's used to identify an account on Ethereum.
    // Addresses can represent a smart contract or an external (user) accounts.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // A `mapping` is essentially a hash table data structure.
    // This `mapping` assigns an unsigned integer (the token balance) to an address (the token holder).
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Events allow for logging of activity on the blockchain.
    // Ethereum clients can listen for events in order to react to contract state changes.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Initializes the contract's data, setting the `owner`
    // to the address of the contract creator.
    constructor() public {
        // All smart contracts rely on external transactions to trigger its functions.
        // `msg` is a global variable that includes relevant data on the given transaction,
        // such as the address of the sender and the ETH value included in the transaction.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Creates an amount of new tokens and sends them to an address.
    function mint(address receiver, uint amount) public {
        // `require` is a control structure used to enforce certain conditions.
        // If a `require` statement evaluates to `false`, an exception is triggered,
        // which reverts all changes made to the state during the current call.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Only the contract owner can call this function
        require(msg.sender == owner, "You are not the owner.");

        // Enforces a maximum amount of tokens
        require(amount < 1e60, "Maximum issuance exceeded");

        // Increases the balance of `receiver` by `amount`
        balances[receiver] += amount;
    }

    // Sends an amount of existing tokens from any caller to an address.
    function transfer(address receiver, uint amount) public {
        // The sender must have enough tokens to send
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Adjusts token balances of the two addresses
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emits the event defined earlier
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### 固有のデジタル資産 {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Imports symbols from other files into the current contract.
// In this case, a series of helper contracts from OpenZeppelin.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// The `is` keyword is used to inherit functions and keywords from external contracts.
// In this case, `CryptoPizza` inherits from the `IERC721` and `ERC165` contracts.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Uses OpenZeppelin's SafeMath library to perform arithmetic operations safely.
    // Learn more: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Constant state variables in Solidity are similar to other languages
    // but you must assign from an expression which is constant at compile time.
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
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Transfers Pizza and ownership to other address
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emits event defined in the imported IERC721 contract
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
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
        // どのように動くかの詳細は、
        // https://ethereum.stackexchange.com/a/14016/36603 を確認する。
        // TODO すべてのアドレスが縮小されるので、
        // セレニティリリースの前に、ここをもう一度確認する。
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## 参考文献 {#further-reading}

スマートコントラクトの全体的な概要については、SolidityとVyperのドキュメントをご確認ください。

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## 関連トピック {#related-topics}

- [スマートコントラクト](/developers/docs/smart-contracts/)
- [イーサリアム仮想マシン(EVM)](/developers/docs/evm/)

## 関連チュートリアル {#related-tutorials}

- [コントラクトのサイズ制限に対処するためのコントラクトのサイズ縮小](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- スマートコントラクトのサイズを小さくするための実用的なヒント_
- [イベントを使用してスマートコントラクトからデータをログに記録](/developers/tutorials/logging-events-smart-contracts/) _- スマートコントラクトのイベントの紹介と、それを使ってデータをログに記録する方法_
- [Solidityを使用した他のコントラクトとの連携](/developers/tutorials/interact-with-other-contracts-from-solidity/) _- 既存のコントラクトからスマートコントラクトをデプロイし、それを扱う方法_
