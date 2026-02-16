---
title: "ERC-20トークンのスマートコントラクトを理解する"
description: "完全なSolidityスマートコントラクトの例と解説で、ERC-20トークン標準の実装方法を学びます。"
author: "jdourlens"
tags: ["smart contracts", "tokens", "solidity", "erc-20"]
skill: beginner
lang: ja
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

イーサリアムにおける最も重要な[スマートコントラクト標準](/developers/docs/standards/)の1つは[ERC-20](/developers/docs/standards/tokens/erc-20/)として知られており、これは、代替可能なトークン実装のためにイーサリアムブロックチェーン上のすべてのスマートコントラクトで使用される技術標準として登場しました。

ERC-20は、すべての代替可能なイーサリアムトークンが準拠すべき共通のルールリストを定義します。 その結果、このトークン標準により、あらゆる種類の開発者が、より大きなイーサリアムシステム内で新しいトークンがどのように機能するかを正確に予測できるようになります。 これにより開発者のタスクは簡素化され、容易になります。トークンがルールに従っている限り、新しいトークンがリリースされるたびに、それぞれの新しいプロジェクトをやり直す必要がないと分かった上で、作業を進めることができるからです。

以下は、ERC-20が実装しなければならない関数をインターフェイスとして提示したものです。 インターフェイスが何であるかよくわからない場合は、[SolidityでのOOPプログラミング](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/)に関する私たちの記事を確認してください。

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

ここでは、すべての関数が何のためにあるのかを一行ずつ解説します。 この後、ERC-20トークンの簡単な実装を紹介します。

## ゲッター {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

存在するトークンの総量を返します。 この関数はゲッターであり、コントラクトの状態を変更しません。 Solidityには浮動小数点数がないことに注意してください。 したがって、ほとんどのトークンは18桁の小数を採用しており、1トークンに対して1000000000000000000のように総供給量やその他の結果を返します。 すべてのトークンが18桁の小数を持つわけではなく、これはトークンを扱う際に本当に注意する必要があることです。

```solidity
function balanceOf(address account) external view returns (uint256);
```

アドレス(`account`)が所有するトークンの量を返します。 この関数はゲッターであり、コントラクトの状態を変更しません。

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20標準では、あるアドレスが別のアドレスに対し、そのアドレスからトークンを取得できる許可(allowance)を与えることができます。 このゲッターは、`spender`が`owner`に代わって使用できる、許可されたトークンの残量を返します。 この関数はゲッターであり、コントラクトの状態を変更しません。デフォルトでは0を返すべきです。

## 関数 {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

`amount`のトークンを、関数呼び出し元のアドレス(`msg.sender`)から受取人アドレスに移動します。 この関数は、後で定義される`Transfer`イベントを発行します。 送金が可能だった場合は、trueを返します。

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

`spender`が関数呼び出し元(`msg.sender`)の残高から送金できる`allowance`(許可額)を設定します。 この関数は`Approval`イベントを発行します。 この関数は、allowanceが正常に設定されたかどうかを返します。

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

allowanceの仕組みを使い、`amount`のトークンを`sender`から`recipient`に移動させます。 `amount`は、呼び出し元のallowanceから差し引かれます。 この関数は`Transfer`イベントを発行します。

## イベント {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

このイベントは、トークンの量(`value`)が`from`アドレスから`to`アドレスに送金されたときに発行されます。

新しいトークンをミントする場合、送金は通常`from`が0x00..0000アドレスとなり、トークンをバーンする場合は`to`が0x00..0000となります。

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

このイベントは、トークンの量(`value`)が`owner`によって`spender`に使用されることが承認されたときに発行されます。

## ERC-20トークンの基本的な実装 {#a-basic-implementation-of-erc-20-tokens}

ERC-20トークンのベースとなる最もシンプルなコードを以下に示します。

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

ERC-20トークン標準のもう一つの優れた実装として、[OpenZeppelinのERC-20実装](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)があります。
