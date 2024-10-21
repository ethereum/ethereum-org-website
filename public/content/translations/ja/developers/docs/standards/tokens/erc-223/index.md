---
title: ERC-223 トークン規格
description: ERC-223 ファンジブルトークン規格の概要、その仕組み、およびERC-20との比較。
lang: ja
---

## はじめに {#introduction}

### ERC-223とは何か？ {#what-is-erc223}

ERC-223は、ファンジブルトークンのための規格であり、ERC-20規格に似ています。 主な違いは、ERC-223がトークンAPIだけでなく、送信者から受信者へのトークン転送のロジックも定義している点です。 ERC-223は、トークン転送を受信者側で処理できる通信モデルを導入しています。

### ERC-20との違い {#erc20-differences}

ERC-223は、ERC-20のいくつかの制限を解決し、トークンコントラクトとトークンを受け取る可能性のあるコントラクトとの新しい相互作用方法を導入しています。 ERC-223では可能で、ERC-20ではできないことがいくつかあります。

- 受信者側でのトークン転送処理：受信者は、ERC-223トークンが入金されていることを検出できます。
- 誤って送信されたトークンの拒否：ユーザーがトークンを受け取るべきではないコントラクトにERC-223トークンを送信した場合、そのコントラクトはトランザクションを拒否し、トークンの損失を防ぐことができます。
- 転送時のメタデータ：ERC-223トークンはメタデータを含めることができ、トークントランザクションに任意の情報を添付することが可能です。

## 前提条件{#prerequisites}

- [アカウント](/developers/docs/accounts)
- [スマートコントラクト](/developers/docs/smart-contracts/)
- [トークン規格](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 規格の概要 {#body}

ERC-223は、スマートコントラクト内でトークンを操作するためのAPIを実装したトークン規格です。 また、ERC-223トークンを受け取ることを想定したコントラクト用のAPIも定義しています。 ERC-223 Receiver APIをサポートしないコントラクトはERC-223トークンを受け取ることができないため、ユーザーのミスを防ぐことができます。

以下のメソッドとイベントを実装するスマートコントラクトは、ERC-223互換のトークンコントラクトと呼ぶことができます。 デプロイされると、イーサリアム上で作成されたトークンの追跡を行います。

コントラクトはこれらの機能のみを持つ必要はなく、デベロッパーは他のトークン規格からの機能を追加することができます。 たとえば、 `approve` や `transferFrom` 機能はERC-223規格には含まれていませんが、必要に応じてこれらの機能を実装することも可能です。

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) から引用：

### メソッド {#methods}

ERC-223トークンは、以下のメソッドを実装する必要があります：

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ERC-223トークンを受け取ることを想定しているコントラクトは、以下のメソッドを実装する必要があります：

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

もし、ERC-223トークンが `tokenReceived(..)` 関数を実装していないコントラクトに送信された場合、その転送は失敗し、トークンは送信者の残高から移動しません。

### イベント {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### 実例 {#examples}

ERC-223トークンのAPIはERC-20トークンのAPIと似ているため、UI開発の観点からは違いはほとんどありません。 ただし例外として、ERC-223では `approve` や `transferFrom` 関数がオプションであるため、ERC-223トークンはこれらを持たない場合があります。

#### Solidityの実例 {#solidity-example}

以下の例は、基本的なERC-223トークンコントラクトがどのように動作するかを示しています：

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

次に、tokenAがERC-223トークンであると仮定し、別のコントラクトがtokenAのデポジットを受け入れるようにしたいとします。 このコントラクトはtokenAのみを受け入れ、他のトークンは拒否する必要があります。 コントラクトがtokenAを受け取ると、 `Deposit()` イベントを発生させ、内部の `deposits` 変数の値を増加させます。

以下がそのコードです：

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // 受け入れたい唯一のトークン
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // この関数内で理解するべき重要な点：
        // msg.senderは、受け取っているトークンのアドレスです。
        // msg.valueは常に0です。なぜなら、通常トークンコントラクトはEtherを保有したり送信したりしないためです。
        // _from      はトークン転送の送信者です。
        // _value     は預け入れられたトークンの量です。
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## よくある質問 {#faq}

### 他のトークン（tokenB）をこのコントラクトに送信した場合、どうなりますか？ {#sending-tokens}

トランザクションは失敗し、トークンの転送は行われません。 トークンは送信者のアドレスに返却されます。

### どうやってこのコントラクトにデポジットを行うことができますか？ {#contract-deposits}

`RecipientContract` のアドレスを指定して、ERC-223トークンの `transfer(address,uint256)` または `transfer(address,uint256,bytes)` 関数を呼び出します。

### ERC-20トークンをこのコントラクトに送信した場合、どうなりますか？ {#erc-20-transfers}

ERC-20トークンが `RecipientContract` に送信されると、トークンは転送されますが、その転送は認識されません（ `Deposit()` イベントは発行されず、depositsの値も変わりません）。 不要なERC-20トークンのデポジットはフィルタリングや防止ができません。

### トークンのデポジット完了後に関数を実行したい場合、どうすればよいですか？ {#function-execution}

これには複数の方法があります。 この例では、ERC-223の転送をイーサの転送と同じように処理する方法を紹介します：

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // 受け入れたい唯一のトークン
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // トランザクションを処理し、その後の関数呼び出しを実行
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

`RecipientContract` がERC-223トークンを受け取ると、そのコントラクトはトークントランザクションの `_data` パラメータにエンコードされた関数を実行します。これはイーサのトランザクションが関数呼び出しをトランザクションの `data` としてエンコードするのと同じです。 詳細については [dataフィールド](https://ethereum.org/en/developers/docs/transactions/#the-data-field) を参照してください。

上記の例では、ERC-223トークンは `transfer(address,uin256,bytes calldata _data)` 関数を使用して `RecipientContract` のアドレスに転送される必要があります。 dataパラメータが `0xc2985578` （ `foo()` 関数のシグネチャ）である場合、トークンデポジットが完了した後にfoo()関数が呼び出され、Foo()イベントが発行されます。

パラメータはトークン転送の `data` にエンコードすることもできます。例えば、`_someNumber` に 12345 を指定して bar() 関数を呼び出すことができます。 その場合の `data` は `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` となる必要があります。 `0x0423a132` は `bar(uint256)` 関数のシグネチャであり、 `00000000000000000000000000000000000000000000000000000000000004d2` は uint256 としての 12345 を表しています。

## 制約事項 {#limitations}

ERC-223は、ERC-20規格で見られるいくつかの問題に対処していますが、独自の制約があります：

- 普及と互換性：ERC-223はまだ広く普及していないため、既存のツールやプラットフォームとの互換性が制限される可能性があります。
- 後方互換性：ERC-223はERC-20と後方互換性がないため、既存のERC-20コントラクトやツールは、修正なしではERC-223トークンと連携できません。
- ガス代：ERC-223の転送には追加のチェックや機能が含まれるため、ERC-20トランザクションに比べてガス代が高くなる可能性があります。

## 参考リンク{#further-reading}

- [EIP-223: ERC-223トークン規格](https://eips.ethereum.org/EIPS/eip-223)
- [初期のERC-223提案](https://github.com/ethereum/eips/issues/223)
