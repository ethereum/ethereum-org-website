---
title: ERC-223 トークン標準
description: ERC-223代替性トークン標準の概要、その仕組み、およびERC-20との比較。
lang: ja
---

## はじめに {#introduction}

### ERC-223とは？ {#what-is-erc223}

ERC-223は、ERC-20標準と同様の代替性トークンのための標準です。主な違いは、ERC-223がトークンのAPIだけでなく、送信者から受信者へトークンを送金するロジックも定義している点です。これにより、トークンの送金を受信者側で処理できる通信モデルが導入されています。

### ERC-20との違い {#erc20-differences}

ERC-223はERC-20のいくつかの制限に対処し、トークンコントラクトとトークンを受信する可能性のあるコントラクトとの間の新しい相互作用の方法を導入しています。ERC-20では不可能ですが、ERC-223では可能ないくつかの点があります。

- 受信者側でのトークン送金処理: 受信者は、ERC-223トークンが入金されていることを検知できます。
- 不適切に送信されたトークンの拒否: ユーザーがトークンを受信することを想定していないコントラクトにERC-223トークンを送信した場合、コントラクトはトランザクションを拒否し、トークンの喪失を防ぐことができます。
- 送金時のメタデータ: ERC-223トークンにはメタデータを含めることができ、トークンのトランザクションに任意の情報を添付できます。

## 前提知識 {#prerequisites}

- [アカウント](/developers/docs/accounts)
- [スマート・コントラクト](/developers/docs/smart-contracts/)
- [トークン標準](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 本文 {#body}

ERC-223は、スマート・コントラクト内のトークン用APIを実装するトークン標準です。また、ERC-223トークンを受信することを想定したコントラクト用のAPIも宣言しています。ERC-223 Receiver APIをサポートしていないコントラクトはERC-223トークンを受信できないため、ユーザーのエラーを防ぐことができます。

スマート・コントラクトが以下のメソッドとイベントを実装している場合、それはERC-223互換のトークンコントラクトと呼ぶことができます。デプロイされると、イーサリアム上で作成されたトークンを追跡する役割を担います。

コントラクトはこれらの関数のみを持つ義務はなく、開発者は他のトークン標準から任意の機能を追加することができます。例えば、`approve`や`transferFrom`関数はERC-223標準の一部ではありませんが、必要であればこれらの関数を実装することができます。

[EIP-223](https://eips.ethereum.org/EIPS/eip-223)より:

### メソッド {#methods}

ERC-223トークンは以下のメソッドを実装する必要があります。

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ERC-223トークンを受信することを想定しているコントラクトは、以下のメソッドを実装する必要があります。

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

ERC-223トークンが`tokenReceived(..)`関数を実装していないコントラクトに送信された場合、送金は失敗し、送信者の残高からトークンが移動してはなりません。

### イベント {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### 例 {#examples}

ERC-223トークンのAPIはERC-20のAPIと似ているため、UI開発の観点からは違いはありません。唯一の例外は、ERC-223トークンには`approve`および`transferFrom`関数がない場合があることです。これらはこの標準ではオプションであるためです。

#### Solidityの例 {#solidity-example}

以下の例は、基本的なERC-223トークンコントラクトがどのように動作するかを示しています。

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

次に、tokenAがERC-223トークンであると仮定して、別のコントラクトが`tokenA`の入金を受け付けるようにします。このコントラクトはtokenAのみを受け付け、他のトークンは拒否しなければなりません。コントラクトがtokenAを受け取ったとき、`Deposit()`イベントを発行し、内部の`deposits`変数の値を増加させる必要があります。

コードは以下の通りです。

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // 受け入れる唯一のトークン。
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // この関数内では以下のことを理解しておくことが重要です。
        // msg.sender は受信しているトークンのアドレスであり、
        // ほとんどの場合、トークンコントラクトはイーサを所有または送信しないため、msg.value は常に 0 であり、
        // _from はトークン送金の送信者であり、
        // _value は預け入れられたトークンの量です。
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## よくある質問 {#faq}

### コントラクトにtokenBを送信するとどうなりますか？ {#sending-tokens}

トランザクションは失敗し、トークンの送金は行われません。トークンは送信者のアドレスに返還されます。

### このコントラクトにどうやって入金できますか？ {#contract-deposits}

`RecipientContract`のアドレスを指定して、ERC-223トークンの`transfer(address,uint256)`または`transfer(address,uint256,bytes)`関数を呼び出します。

### このコントラクトにERC-20トークンを送金するとどうなりますか？ {#erc-20-transfers}

ERC-20トークンが`RecipientContract`に送信された場合、トークンは送金されますが、その送金は認識されません（`Deposit()`イベントは発行されず、入金値も変更されません）。望まないERC-20の入金をフィルタリングしたり防いだりすることはできません。

### トークンの入金完了後に何らかの関数を実行したい場合はどうすればよいですか？ {#function-execution}

これを行うには複数の方法があります。この例では、ERC-223の送金をイーサの送金と同じにする方法に従います。

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // 受け入れる唯一のトークン。
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // 受信したトランザクションを処理し、後続の関数呼び出しを実行します。
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

`RecipientContract`がERC-223トークンを受け取ると、コントラクトはトークントランザクションの`_data`パラメータとしてエンコードされた関数を実行します。これは、イーサのトランザクションが関数呼び出しをトランザクションの`data`としてエンコードするのと同じです。詳細については、[データフィールド](/developers/docs/transactions/#the-data-field)をお読みください。

上記の例では、ERC-223トークンは`transfer(address,uin256,bytes calldata _data)`関数を使用して`RecipientContract`のアドレスに送金される必要があります。データパラメータが`0xc2985578`（`foo()`関数の署名）である場合、トークンの入金を受け取った後にfoo()関数が呼び出され、Foo()イベントが発行されます。

パラメータはトークン送金の`data`にエンコードすることもできます。例えば、`_someNumber`に12345の値を指定してbar()関数を呼び出すことができます。この場合、`data`は`0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`でなければなりません。ここで、`0x0423a132`は`bar(uint256)`関数の署名であり、`00000000000000000000000000000000000000000000000000000000000004d2`はuint256としての12345です。

## 制限事項 {#limitations}

ERC-223はERC-20標準に見られるいくつかの問題に対処していますが、独自の制限がないわけではありません。

- 普及と互換性: ERC-223はまだ広く普及していないため、既存のツールやプラットフォームとの互換性が制限される可能性があります。
- 下位互換性: ERC-223はERC-20との下位互換性がありません。つまり、既存のERC-20コントラクトやツールは、変更を加えない限りERC-223トークンでは機能しません。
- ガス代: ERC-223の送金における追加のチェックや機能により、ERC-20のトランザクションと比較してガス代が高くなる可能性があります。

## 参考文献 {#further-reading}

- [EIP-223: ERC-223 トークン標準](https://eips.ethereum.org/EIPS/eip-223)
- [初期のERC-223提案](https://github.com/ethereum/eips/issues/223)