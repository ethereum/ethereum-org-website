---
title: "スマートコントラクトの解剖学"
description: "スマートコンタクトの構造、すなわち機能、データ、変数について詳しく調べます。"
lang: ja
---

スマートコントラクトは、イーサリアム上のアドレスで実行されるプログラムです。 それらはトランザクションの受信時に実行できるデータと関数で構成されています。 ここでは、スマートコントラクトの構成要素の概要を説明します。

## 前提条件{#prerequisites}

まず「[スマートコントラクト](/developers/docs/smart-contracts/)」についてお読みください。 このドキュメントは、JavaScriptやPythonなどのプログラミング言語に精通していることを前提としています。

## データ {#data}

すべてのコントラクトデータは、`storage`または`memory`のいずれかの場所に割り当てる必要があります。 スマートコントラクトのストレージの変更にはコストがかかりますので、データをどこに格納するかを考える必要があります。

### EVMストレージ {#storage}

永続データはストレージと呼ばれ、状態変数で表されます。 これらの値は、ブロックチェーンに永続的に保存されます。 コントラクトがコンパイル時に必要なブロックチェーンのストレージ容量を追跡できるように、型を宣言する必要があります。

```solidity
// Solidityの例
contract SimpleStorage {
    uint storedData; // 状態変数
    // ...
}
```

```python
# Vyperの例
storedData: int128
```

オブジェクト指向言語でのプログラミングの経験がある場合は、ほとんどの型になじみがあるでしょう。 しかし、イーサリアムの開発が初めての場合、`address`は目新しいかもしれません。

`address`型は、20バイトまたは160ビットに相当するイーサリアムアドレスを保持できます。 先頭が0xの16進数を返します。

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

- [Vyperの型を参照](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidityの型を参照](https://docs.soliditylang.org/en/latest/types.html#value-types)

### メモリ {#memory}

コントラクト関数の実行期間にのみ保存される値は、メモリ変数と呼ばれます。 これらはブロックチェーンに永続的に保存されることはないため、低コストで使用できます

EVMがどのようにデータを格納するか（ストレージ、メモリ、スタック）についての詳細は、[Solidityドキュメント](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)を参照してください。

### 環境変数 {#environment-variables}

コントラクトで定義した変数に加え、特別なグローバル変数がいくつかあります。 これらは主にブロックチェーンや現在のトランザクションに関する情報を提供するために使用されます。

例：

| **プロパティ**         | **状態変数** | **説明**                                |
| ----------------- | -------- | ------------------------------------- |
| `block.timestamp` | uint256  | 現在のブロックエポックタイムスタンプ                    |
| `msg.sender`      | address  | メッセージの送信者(現在の呼び出し) |

## 関数 {#functions}

簡単に言うと、関数は受信トランザクションに応じて情報を取得したり、情報を設定したりすることができます。

関数呼び出しには、以下の2種類があります。

- `internal` – これらはEVMコールを作成しません
  - Internal関数と状態変数は、内部(つまり、現在のコントラクトまたはそこから派生したコントラクト内)からのみアクセスできます。
- `external` – これらはEVMコールを作成します
  - external関数はコントラクトインターフェイスの一部であり、他のコントラクトから呼び出したり、トランザクションを介して呼び出したりすることができます。 external関数`f`は内部では呼び出せません(つまり、`f()`は機能しませんが、`this.f()`は機能します)。

`public`または`private`にすることもできます

- `public`関数は、コントラクト内から内部的に呼び出すことも、メッセージを介して外部から呼び出すこともできます。
- `private`関数は、それらが定義されたコントラクトからのみ参照でき、派生コントラクトからは参照できません。

関数と状態変数はどちらもpublicまたはprivateにすることができます。

コントラクトの状態変数を更新するための関数は次のとおりです。

```solidity
// Solidityの例
function update_name(string value) public {
    dapp_name = value;
}
```

- `string`型の`value`が、関数`update_name`に渡されます。
- `public`と宣言されており、誰でもアクセスできます。
- `view`が宣言されていないため、コントラクトの状態を変更できます。

### View関数 {#view-functions}

これらの関数によって、コントラクトのデータの状態を変更しないことを指定します。 一般的な例としては、「getter」関数があります。例えば、これを使用してユーザーの残高を受け取ることができます。

```solidity
// Solidityの例
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
2. [イベントの発行](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)。
3. [他のコントラクトの作成](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)。
4. `selfdestruct`の使用。
5. 呼び出しによるイーサ(ETH)の送信。
6. `view`または`pure`が指定されていない関数の呼び出し。
7. 低レベル呼び出しの使用。
8. 特定のオペコードを含むインラインアセンブリの使用。

### コンストラクタ関数 {#constructor-functions}

`constructor`関数は、コントラクトが最初にデプロイされたときに1回だけ実行されます。 多くのクラスベースのプログラミング言語の`constructor`と同様に、これらの関数はしばしば、指定された値に状態変数を初期化します。

```solidity
// Solidityの例
// コントラクトのデータを初期化し、`owner`を
// コントラクト作成者のアドレスに設定します。
constructor() public {
    // すべてのスマートコントラクトは、その関数をトリガーするために外部トランザクションに依存します。
    // `msg`は、送信者のアドレスやトランザクションに含まれるETHの量など、
    // 特定のトランザクションに関する関連データを含むグローバル変数です。
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyperの例

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

## 関数の記述 {#writing-functions}

関数には以下のものが必要です。

- パラメータ変数と型(パラメータを受け取る場合)
- internal/externalの宣言
- pure/view/payableの宣言
- 戻り値の型(値を返す場合)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // 状態変数

    // コントラクトがデプロイされたときに呼び出され、値を初期化します
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get関数
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set関数
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

完全なコントラクトはこのようになります。 ここで、`constructor`関数は、`dapp_name`変数の初期値を提供します。

## イベントとログ {#events-and-logs}

イベントは、スマートコントラクトがフロントエンドや他のサブスクライブしているアプリケーションと通信することを可能にします。 トランザクションが検証されてブロックに追加されると、スマートコントラクトはイベントを発行し、情報をログに記録できます。これをフロントエンドが処理して活用します。

## 注釈付きの例 {#annotated-examples}

Solidityで書かれた例を以下に示します。 コードを試したい場合は、[Remix](http://remix.ethereum.org)で操作できます。

### Hello world {#hello-world}

```solidity
// セマンティックバージョニングを使用して、Solidityのバージョンを指定します。
// 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld`という名前のコントラクトを定義します。
// コントラクトは、関数とデータ(その状態)のコレクションです。
// デプロイされると、コントラクトはイーサリアムブロックチェーン上の特定のアドレスに配置されます。
// 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string`型の状態変数`message`を宣言します。
    // 状態変数は、その値がコントラクトのストレージに永続的に保存される変数です。
    // `public`キーワードは、変数をコントラクトの外部からアクセス可能にし、
    // 他のコントラクトやクライアントが値をアクセスするために呼び出すことができる関数を作成します。
    string public message;

    // 多くのクラスベースのオブジェクト指向言語と同様に、コンストラクタは
    // コントラクトの作成時にのみ実行される特別な関数です。
    // コンストラクタは、コントラクトのデータを初期化するために使用されます。
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // 文字列引数`initMessage`を受け入れ、その値を
        // コントラクトの`message`ストレージ変数に設定します)。
        message = initMessage;
    }

    // 文字列引数を受け入れ、
    // `message`ストレージ変数を更新するpublic関数です。
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### トークン {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address`はEメールアドレスに似ています - イーサリアム上のアカウントを識別するために使用されます。
    // アドレスは、スマートコントラクトまたは外部(ユーザー)アカウントを表すことができます。
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping`は、本質的にハッシュテーブルのデータ構造です。
    // この`mapping`は、符号なし整数(トークン残高)をアドレス(トークン保有者)に割り当てます。
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) balances;

    // イベントにより、ブロックチェーン上のアクティビティをログに記録できます。
    // イーサリアムクライアントは、コントラクトの状態変更に反応するためにイベントをリッスンできます。
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // コントラクトのデータを初期化し、`owner`を
    // コントラクト作成者のアドレスに設定します。
    constructor() public {
        // すべてのスマートコントラクトは、その関数をトリガーするために外部トランザクションに依存します。
        // `msg`は、送信者のアドレスやトランザクションに含まれるETHの量など、
        // 特定のトランザクションに関する関連データを含むグローバル変数です。
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // 新しいトークンを作成し、アドレスに送信します。
    function mint(address receiver, uint amount) public {
        // `require`は、特定の条件を強制するために使用される制御構造です。
        // `require`ステートメントが`false`と評価された場合、例外がトリガーされ、
        // 現在の呼び出し中に行われた状態へのすべての変更が元に戻されます。
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // コントラクトのオーナーのみがこの関数を呼び出すことができます
        require(msg.sender == owner, "You are not the owner.");

        // トークンの最大量を強制します
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver`の残高を`amount`だけ増やします
        balances[receiver] += amount;
    }

    // 任意の呼び出し元からアドレスに既存のトークンを送信します。
    function transfer(address receiver, uint amount) public {
        // 送信者は送信するのに十分なトークンを持っている必要があります
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // 2つのアドレスのトークン残高を調整します
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // 先に定義されたイベントを発行します
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### ユニークなデジタル資産 {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// 他のファイルから現在のコントラクトにシンボルをインポートします。
// このケースでは、OpenZeppelinの一連のヘルパーコントラクトです。
// 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is`キーワードは、外部コントラクトから関数とキーワードを継承するために使用されます。
// このケースでは、`CryptoPizza`は`IERC721`と`ERC165`コントラクトから継承します。
// 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // OpenZeppelinのSafeMathライブラリを使用して、算術演算を安全に実行します。
    // 詳細はこちら: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidityの定数状態変数は他の言語に似ていますが、
    // コンパイル時に定数である式から代入する必要があります。
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct型を使用すると、独自の型を定義できます
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza構造体の空の配列を作成します
    Pizza[] public pizzas;

    // ピザIDからそのオーナーのアドレスへのマッピング
    mapping(uint256 => address) public pizzaToOwner;

    // オーナーのアドレスから所有トークン数へのマッピング
    mapping(address => uint256) public ownerPizzaCount;

    // トークンIDから承認済みアドレスへのマッピング
    mapping(uint256 => address) pizzaApprovals;

    // マッピングをネストすることができます。この例では、オーナーをオペレーターの承認にマッピングします
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // 文字列(名前)とDNAからランダムなピザを作成する内部関数
    function _createPizza(string memory _name, uint256 _dna)
        // `internal`キーワードは、この関数がこのコントラクトおよび
        // このコントラクトを派生するコントラクト内でのみ参照可能であることを意味します
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique`は、ピザがすでに存在するかどうかをチェックする関数修飾子です
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // ピザをピザ配列に追加し、IDを取得します
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // ピザのオーナーが現在のユーザーと同じであることを確認します
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // address(0)はゼロアドレスであり、
        // pizza[id]がまだ特定のユーザーに割り当てられていないことを示します。

        assert(pizzaToOwner[id] == address(0));

        // ピザをオーナーにマッピングします
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // 文字列(名前)からランダムなピザを作成します
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // 文字列(名前)とオーナーのアドレス(作成者)からランダムなDNAを生成します
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure`とマークされた関数は、状態の読み取りや変更を行わないことを約束します
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // 文字列(名前) + アドレス(オーナー)からランダムなuintを生成します
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // オーナーによって見つかったピザの配列を返します
    function getPizzasByOwner(address _owner)
        public
        // `view`とマークされた関数は、状態を変更しないことを約束します
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // `memory`ストレージの場所を使用して、この関数呼び出しの
        // ライフサイクル中のみ値を格納します。
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // ピザと所有権を他のアドレスに転送します
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // インポートされたIERC721コントラクトで定義されたイベントを発行します
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * 指定されたトークンIDの所有権を別のアドレスに安全に転送します
     * ターゲットアドレスがコントラクトの場合、`onERC721Received`を実装する必要があります。
     * これは安全な転送時に呼び出され、マジック値を返します
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * そうでない場合、転送は取り消されます。
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * 指定されたトークンIDの所有権を別のアドレスに安全に転送します
     * ターゲットアドレスがコントラクトの場合、`onERC721Received`を実装する必要があります。
     * これは安全な転送時に呼び出され、マジック値を返します
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * そうでない場合、転送は取り消されます。
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
     * ターゲットアドレスで`onERC721Received`を呼び出す内部関数
     * ターゲットアドレスがコントラクトでない場合、呼び出しは実行されません
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

    // ピザを燃やす - トークンを完全に破壊する
    // `external`関数修飾子は、この関数が
    // コントラクトインターフェースの一部であり、他のコントラクトがそれを呼び出すことができることを意味します
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

    // アドレスごとのピザの数を返します
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // IDで見つかったピザのオーナーを返します
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // 他のアドレスがピザの所有権を転送することを承認します
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // 特定のピザの承認済みアドレスを返します
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * 指定されたトークンIDの現在の承認をクリアするプライベート関数
     * 指定されたアドレスがトークンのオーナーでない場合、取り消されます
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * 指定されたオペレーターの承認を設定または解除します
     * オペレーターは、送信者に代わってすべてのトークンを転送することが許可されます
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // オペレーターが指定されたオーナーによって承認されているかどうかを通知します
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // ピザの所有権を取得する - 承認されたユーザーのみ
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // ピザが存在するかどうかを確認します
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // アドレスがオーナーであるか、ピザの転送が承認されているかを確認します
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // 以下によるソリウムチェックの無効化
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // ピザがユニークでまだ存在しないかを確認します
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

    // ターゲットアドレスがコントラクトであるかどうかを返します
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // 現在、アドレスにコントラクトがあるかどうかを確認するのに、
        // そのアドレスのコードのサイズを確認するより良い方法はありません。
        // これがどのように機能するかについての詳細は、https://ethereum.stackexchange.com/a/14016/36603
        // を参照してください。
        // TODO Serenityリリースの前にこれを再確認してください。すべての
        // アドレスがコントラクトになるためです。
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## 参考リンク{#further-reading}

スマートコントラクトの全体的な概要については、SolidityとVyperのドキュメントをご確認ください。

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## 関連トピック{#related-topics}

- [スマートコントラクト](/developers/docs/smart-contracts/)
- [イーサリアム仮想マシン](/developers/docs/evm/)

## 関連チュートリアル {#related-tutorials}

- [コントラクトサイズ制限と戦うためのコントラクトの縮小](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– スマートコントラクトのサイズを縮小するための実践的なヒント。_
- [イベントを使用してスマートコントラクトからデータをログに記録する](/developers/tutorials/logging-events-smart-contracts/) _– スマートコントラクトのイベントの紹介と、それらを使用してデータをログに記録する方法。_
- [Solidityから他のコントラクトと対話する](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 既存のコントラクトからスマートコントラクトをデプロイし、それと対話する方法。_
