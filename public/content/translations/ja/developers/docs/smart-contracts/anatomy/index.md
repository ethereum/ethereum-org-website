---
title: "スマート・コントラクトの構造"
description: "スマート・コントラクトの構造（関数、データ、変数）についての詳細な解説。"
lang: ja
---

スマート・コントラクトは、イーサリアム上のアドレスで実行されるプログラムです。トランザクションを受信した際に実行できるデータと関数で構成されています。ここでは、スマート・コントラクトを構成する要素の概要を説明します。

## 前提条件 {#prerequisites}

まず、[スマート・コントラクト](/developers/docs/smart-contracts/)について読んでおいてください。このドキュメントは、JavaScriptやPythonなどのプログラミング言語にすでに精通していることを前提としています。

## データ {#data}

コントラクトのデータは、`storage`または`memory`のいずれかの場所に割り当てる必要があります。スマート・コントラクトのストレージを変更するにはコストがかかるため、データをどこに配置するかを考慮する必要があります。

### ストレージ {#storage}

永続的なデータはストレージと呼ばれ、状態変数によって表されます。これらの値はブロックチェーン上に永続的に保存されます。コンパイル時にコントラクトがブロックチェーン上でどれだけのストレージを必要とするかを把握できるように、型を宣言する必要があります。

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

オブジェクト指向言語でのプログラミング経験があれば、ほとんどの型には馴染みがあるでしょう。ただし、[イーサリアム](/)開発が初めての場合、`address`は新しい概念かもしれません。

`address`型は、20バイトまたは160ビットに相当するイーサリアムのアドレスを保持できます。先頭に0xが付いた16進数表記で返されます。

その他の型には以下のものがあります。

- ブール値
- 整数
- 固定小数点数
- 固定長バイト配列
- 可変長バイト配列
- 有理数および整数リテラル
- 文字列リテラル
- 16進数リテラル
- 列挙型 (enum)

詳細な説明については、ドキュメントを参照してください。

- [Vyperの型を見る](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidityの型を見る](https://docs.soliditylang.org/en/latest/types.html#value-types)

### メモリ {#memory}

コントラクト関数の実行期間中のみ保存される値は、メモリ変数と呼ばれます。これらはブロックチェーン上に永続的に保存されないため、はるかに低コストで使用できます。

EVMがデータを保存する方法（ストレージ、メモリ、スタック）の詳細については、[Solidityのドキュメント](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)を参照してください。

### 環境変数 {#environment-variables}

コントラクトで定義する変数に加えて、いくつかの特別なグローバル変数が存在します。これらは主に、ブロックチェーンや現在のトランザクションに関する情報を提供するために使用されます。

例:

| **プロパティ**          | **状態変数** | **説明**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | 現在のブロックのエポックのタイムスタンプ        |
| `msg.sender`      | address            | メッセージの送信者（現在の呼び出し） |

## 関数 {#functions}

最も単純に言えば、関数は受信したトランザクションに応答して情報を取得したり、情報を設定したりすることができます。

関数呼び出しには2つのタイプがあります。

- `internal` – これらはEVM呼び出しを作成しません
  - 内部関数と状態変数は、内部的に（つまり、現在のコントラクト内、またはそこから派生したコントラクト内から）のみアクセスできます。
- `external` – これらはEVM呼び出しを作成します
  - 外部関数はコントラクトインターフェースの一部であり、他のコントラクトから、またはトランザクションを介して呼び出すことができます。外部関数`f`は内部的に呼び出すことはできません（つまり、`f()`は機能しませんが、`this.f()`は機能します）。

また、`public`または`private`にすることもできます。

- `public`関数は、コントラクト内から内部的に呼び出すことも、メッセージを介して外部から呼び出すこともできます。
- `private`関数は、定義されているコントラクトでのみ可視であり、派生コントラクトでは可視ではありません。

関数と状態変数の両方をpublicまたはprivateにすることができます。

以下は、コントラクトの状態変数を更新するための関数です。

```solidity
// Solidityの例
function update_name(string value) public {
    dapp_name = value;
}
```

- `string`型のパラメータ`value`が関数に渡されます: `update_name`
- `public`として宣言されているため、誰でもアクセスできます。
- `view`として宣言されていないため、コントラクトの状態を変更できます。

### View関数 {#view-functions}

これらの関数は、コントラクトのデータの状態を変更しないことを保証します。一般的な例は「ゲッター」関数です。たとえば、ユーザーの残高を取得するために使用します。

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

状態の変更とみなされる操作:

1. 状態変数への書き込み。
2. [イベントの発行](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)。
3. [他のコントラクトの作成](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)。
4. `selfdestruct`の使用。
5. 呼び出し（call）によるイーサの送信。
6. `view`または`pure`とマークされていない関数の呼び出し。
7. 低レベル呼び出し（low-level calls）の使用。
8. 特定のオペコードを含むインラインアセンブリの使用。

### コンストラクタ関数 {#constructor-functions}

`constructor`関数は、コントラクトが最初にデプロイされたときに1回だけ実行されます。多くのクラスベースのプログラミング言語における`constructor`と同様に、これらの関数は多くの場合、状態変数を指定された値に初期化します。

```solidity
// Solidityの例
// コントラクトのデータを初期化し、`owner`を
// コントラクト作成者のアドレスに設定します。
constructor() public {
    // すべてのスマート・コントラクトは、その関数をトリガーするために外部のトランザクションに依存しています。
    // `msg`は、指定されたトランザクションに関する関連データを含むグローバル変数であり、
    // 送信者のアドレスやトランザクションに含まれるETHの値などがあります。
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

コントラクトで定義する変数や関数に加えて、いくつかの特別な組み込み関数が存在します。最もわかりやすい例は以下の通りです。

- `address.send()` – Solidity
- `send(address)` – Vyper

これらにより、コントラクトは他のアカウントにETHを送信できます。

## 関数の記述 {#writing-functions}

関数には以下が必要です。

- パラメータ変数と型（パラメータを受け取る場合）
- internal/externalの宣言
- pure/view/payableの宣言
- 戻り値の型（値を返す場合）

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

完全なコントラクトは以下のようになります。ここでは、`constructor`関数が`dapp_name`変数に初期値を提供しています。

## イベントとログ {#events-and-logs}

イベントにより、スマート・コントラクトはフロントエンドや他のサブスクライブしているアプリケーションと通信できるようになります。トランザクションが検証されてブロックに追加されると、スマート・コントラクトはイベントを発行して情報をログに記録でき、フロントエンドはそれを処理して利用できます。

## 注釈付きの例 {#annotated-examples}

これらはSolidityで書かれたいくつかの例です。コードを試してみたい場合は、[Remix](https://remix.ethereum.org)で操作できます。

### Hello world {#hello-world}

```solidity
// セマンティック・バージョニングを使用して、Solidityのバージョンを指定します。
// 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld`という名前のコントラクトを定義します。
// コントラクトは、関数とデータ（その状態）の集合です。
// デプロイされると、コントラクトはイーサリアムのブロックチェーン上の特定のアドレスに配置されます。
// 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string`型の状態変数`message`を宣言します。
    // 状態変数は、その値がコントラクトのストレージに永続的に保存される変数です。
    // `public`キーワードは、変数をコントラクトの外部からアクセス可能にし、
    // 他のコントラクトやクライアントが値にアクセスするために呼び出せる関数を作成します。
    string public message;

    // 多くのクラスベースのオブジェクト指向言語と同様に、コンストラクタは
    // コントラクトの作成時にのみ実行される特別な関数です。
    // コンストラクタは、コントラクトのデータを初期化するために使用されます。
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // 文字列の引数`initMessage`を受け取り、その値を
        // コントラクトの`message`ストレージ変数に設定します）。
        message = initMessage;
    }

    // 文字列の引数を受け取り、
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
    // `address`はメールアドレスに似ており、イーサリアム上のアカウントを識別するために使用されます。
    // アドレスは、スマート・コントラクトまたは外部（ユーザー）アカウントを表すことができます。
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping`は、基本的にはハッシュテーブルのデータ構造です。
    // この`mapping`は、符号なし整数（トークンの残高）をアドレス（トークンの保有者）に割り当てます。
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // イベントにより、ブロックチェーン上のアクティビティのログ記録が可能になります。
    // イーサリアムのクライアントは、コントラクトの状態の変化に反応するためにイベントをリッスンできます。
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // コントラクトのデータを初期化し、`owner`を
    // コントラクト作成者のアドレスに設定します。
    constructor() public {
        // すべてのスマート・コントラクトは、その関数をトリガーするために外部のトランザクションに依存しています。
        // `msg`は、指定されたトランザクションに関する関連データを含むグローバル変数であり、
        // 送信者のアドレスやトランザクションに含まれるETHの値などがあります。
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // 指定された量の新しいトークンを作成し、アドレスに送信します。
    function mint(address receiver, uint amount) public {
        // `require`は、特定の条件を強制するために使用される制御構造です。
        // `require`文が`false`と評価された場合、例外がトリガーされ、
        // 現在の呼び出し中に状態に加えられたすべての変更が元に戻されます。
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // コントラクトの所有者のみがこの関数を呼び出すことができます
        require(msg.sender == owner, "You are not the owner.");

        // トークンの最大量を強制します
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver`の残高を`amount`だけ増やします
        balances[receiver] += amount;
    }

    // 任意の呼び出し元からアドレスへ、指定された量の既存のトークンを送信します。
    function transfer(address receiver, uint amount) public {
        // 送信者は送信するのに十分なトークンを持っている必要があります
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // 2つのアドレスのトークン残高を調整します
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // 先ほど定義したイベントを発行します
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### 独自のデジタル資産 {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// 他のファイルから現在のコントラクトにシンボルをインポートします。
// この場合、OpenZeppelinの一連のヘルパー・コントラクトです。
// 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is`キーワードは、外部のコントラクトから関数やキーワードを継承するために使用されます。
// この場合、`CryptoPizza`は`IERC721`および`ERC165`コントラクトを継承します。
// 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // OpenZeppelinのSafeMathライブラリを使用して、算術演算を安全に実行します。
    // 詳細はこちら: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidityの定数の状態変数は他の言語と似ていますが、
    // コンパイル時に定数となる式から代入する必要があります。
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // 構造体（Struct）型を使用すると、独自の型を定義できます
    // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza構造体の空の配列を作成します
    Pizza[] public pizzas;

    // ピザのIDからその所有者のアドレスへのマッピング
    mapping(uint256 => address) public pizzaToOwner;

    // 所有者のアドレスから所有するトークン数へのマッピング
    mapping(address => uint256) public ownerPizzaCount;

    // トークンIDから承認されたアドレスへのマッピング
    mapping(uint256 => address) pizzaApprovals;

    // マッピングはネストできます。この例では、所有者からオペレーターの承認へマッピングします
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // 文字列（名前）とDNAからランダムなPizzaを作成する内部関数
    function _createPizza(string memory _name, uint256 _dna)
        // `internal`キーワードは、この関数がこのコントラクトおよび
        // このコントラクトを継承するコントラクト内でのみ参照可能であることを意味します
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique`は、ピザがすでに存在するかどうかを確認する関数修飾子です
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Pizzaの配列にPizzaを追加し、IDを取得します
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Pizzaの所有者が現在のユーザーと同じであることを確認します
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // address(0)はゼロアドレスであり、
        // pizza[id]がまだ特定のユーザーに割り当てられていないことを示していることに注意してください。

        assert(pizzaToOwner[id] == address(0));

        // Pizzaを所有者にマッピングします
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // 文字列（名前）からランダムなPizzaを作成します
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // 文字列（名前）と所有者（作成者）のアドレスからランダムなDNAを生成します
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure`としてマークされた関数は、状態を読み取ったり変更したりしないことを約束します
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // 文字列（名前）+ アドレス（所有者）からランダムなuintを生成します
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // 所有者によって見つけられたPizzaの配列を返します
    function getPizzasByOwner(address _owner)
        public
        // `view`としてマークされた関数は、状態を変更しないことを約束します
        // 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // `memory`ストレージの場所を使用して、この関数呼び出しの
        // ライフサイクル中のみ値を保存します。
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

    // Pizzaと所有権を他のアドレスに転送します
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
     * ターゲットのアドレスがコントラクトの場合、`onERC721Received`を実装している必要があります。
     * これは安全な転送時に呼び出され、マジックバリュー
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`を返す必要があります。
     * そうでない場合、転送は元に戻されます。
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * 指定されたトークンIDの所有権を別のアドレスに安全に転送します
     * ターゲットのアドレスがコントラクトの場合、`onERC721Received`を実装している必要があります。
     * これは安全な転送時に呼び出され、マジックバリュー
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`を返す必要があります。
     * そうでない場合、転送は元に戻されます。
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
     * ターゲットのアドレスで`onERC721Received`を呼び出す内部関数
     * ターゲットのアドレスがコントラクトでない場合、呼び出しは実行されません
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

    // Pizzaをバーンします - トークンを完全に破壊します
    // `external`関数修飾子は、この関数が
    // コントラクトのインターフェースの一部であり、他のコントラクトがそれを呼び出せることを意味します
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

    // アドレスごとのPizzaの数を返します
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // IDで見つけられたPizzaの所有者を返します
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Pizzaの所有権を転送するために他のアドレスを承認します
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // 特定のPizzaの承認されたアドレスを返します
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
     * 指定されたアドレスが実際にトークンの所有者でない場合は元に戻されます
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
     * オペレーターは、送信者に代わって送信者のすべてのトークンを転送することが許可されます
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // オペレーターが指定された所有者によって承認されているかどうかを伝えます
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Pizzaの所有権を取得します - 承認されたユーザーのみ
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Pizzaが存在するかどうかを確認します
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // アドレスが所有者であるか、Pizzaの転送を承認されているかを確認します
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // 以下の理由によりsoliumのチェックを無効にします
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Pizzaが一意であり、まだ存在しないかどうかを確認します
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

    // ターゲットのアドレスがコントラクトであるかどうかを返します
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // 現在、アドレスにコントラクトがあるかどうかを確認するより良い方法は、
        // そのアドレスのコードのサイズを確認すること以外にありません。
        // https://ethereum.stackexchange.com/a/14016/36603 を参照してください
        // これがどのように機能するかの詳細について。
        // TODO: Serenityリリースの前にこれを再確認してください。なぜなら、すべてのアドレスが
        // その時にはコントラクトになるからです。
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## 参考文献 {#further-reading}

スマート・コントラクトのより完全な概要については、SolidityとVyperのドキュメントを確認してください。

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## 関連トピック {#related-topics}

- [スマート・コントラクト](/developers/docs/smart-contracts/)
- [イーサリアム仮想マシン (EVM)](/developers/docs/evm/)

## 関連チュートリアル {#related-tutorials}

- [コントラクトサイズ制限に対処するためのコントラクトの縮小](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– スマート・コントラクトのサイズを縮小するための実践的なヒント。_
- [イベントを使用したスマート・コントラクトからのデータのログ記録](/developers/tutorials/logging-events-smart-contracts/) _– スマート・コントラクトのイベントと、それを使用してデータをログに記録する方法の紹介。_
- [Solidityから他のコントラクトと対話する](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 既存のコントラクトからスマート・コントラクトをデプロイし、それと対話する方法。_