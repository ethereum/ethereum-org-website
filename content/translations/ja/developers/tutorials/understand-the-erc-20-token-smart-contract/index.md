---
title: ERC-20トークンのスマートコントラクトを理解する
description: イーサリアムのテストネットワーク上で最初のスマートコントラクトをデプロイする手順
author: "jdourlens"
tags:
  - "スマートコントラクト"
  - "トークン"
  - "Solidity"
  - "erc-20"
skill: beginner
lang: ja
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

[ERC-20](/developers/docs/standards/tokens/erc-20/)は、イーサリアムで最も重要な[スマートコントラクト](/developers/docs/standards/)の1つとして知られており、イーサリアムブロックチェーン上のすべてのスマートコントラクトで代替可能なトークンを実装するために用いられる規格として開発されました。

ERC-20では、すべての代替可能なイーサリアムトークンが順守すべき共通ルールを定義しています。 この規格によって、開発者はイーサリアムの大規模なシステム内で新しいトークンがどのように機能するかを正確に予測できます。 トークンが技術標準のルールに従う限り、すべてのプロジェクトにおいて、新しいトークンがリリースされるたびに最初から開発し直す必要がなくなるため、開発者の負担が軽減されます。

ERC-20で実装しなければならないインターフェイスを以下に提示します。 インターフェイスの詳細については、Solidityの[OOPプログラミング](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/)についての記事をご覧ください。

```solidity
pragma solidity ^0.6.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

ここでは、それぞれの関数の役割について説明しています。 その後、ERC-20トークンの簡単な実装をご紹介します。

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

存在するトークンの総量を返します。 この関数はgetter関数であり、コントラクトの状態を変更することはありません。 Solidityには浮動小数点が存在しないことに注意してください。 したがって、ほとんどのトークンは18桁で表記され、1トークンに対して10000000000000000となるように総供給量などの結果を返します。 ただし、すべてのトークンが18桁ではないため、トークンを扱うときには注意が必要です。

```solidity
function balanceOf(address account) external view returns (uint256);
```

アドレス(`account`)が所有するトークンの量を返します。 この関数はgetter関数であり、コントラクトの状態を変更することはありません。

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20は、あるアドレスが他のアドレスに権限を与え、そのアドレスからトークンを取り戻すことができます。 この関数は、`spender`が`owner`のために使用可能なトークンの残数を返します。 この関数はgetter関数であり、コントラクトの状態を変更することはありません。したがってデフォルトで0が返ってきます

## 関数 {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

関数を呼び出したアドレス(`msg.sender`)から受け取りアドレスに`amount`のトークンを送信します。 この関数は、後で定義する`Transfer`イベントを発行します。 トークンの送金が可能な場合、trueを返します。

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

関数を呼び出したアドレス(`msg.sender`)の残高から`spender`が送金できる`allowance`を設定します。 この関数は、承認イベントを発行します。 この関数は、承認が成功したか否かを返します。

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

`amount`のトークンを`sender`から`recipient`へ承認メカニズムを使って送金します。 関数を呼び出したアドレスから手数料が差し引かれます。 この関数は、`Transfer`イベントを発行します。

## イベント {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

トークンの量(値)が`from`アドレスから`to`アドレスに送信されると、このイベントが発行されます。

新しいトークンをミントする場合、送金イベントは通常`from`0x00...0000アドレスであるのに対し、トークンをバーンする場合は`to`0x00...0000となります。

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

このイベントは、トークンの量(`value`)が`owner`によって、`spender`に使用することが承認されたときに発行されるものです。

## ERC-20トークンの基本的な実装 {#a-basic-implementation-of-erc-20-tokens}

ERC-20トークンのベースとなるシンプルなコードを以下にご紹介します。

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
    balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
    return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
```

ERC-20トークン規格のもう1つのすばらしい実装として、[OpenZeppelin ERC-20実装](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)があります。
