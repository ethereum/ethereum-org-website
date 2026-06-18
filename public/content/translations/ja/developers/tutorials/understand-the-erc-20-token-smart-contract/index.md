---
title: ERC-20トークンのスマート・コントラクトを理解する
description: 完全なSolidityスマート・コントラクトの例と解説を通じて、ERC-20トークン標準の実装方法を学びます。
author: "jdourlens"
tags:
  - スマート・コントラクト
  - トークン
  - solidity
  - erc-20
skill: beginner
breadcrumb: ERC-20トークンの基礎
lang: ja
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

イーサリアム上で最も重要な[スマート・コントラクト標準](/developers/docs/standards/)の1つは[ERC-20](/developers/docs/standards/tokens/erc-20/)として知られており、イーサリアム・ブロックチェーン上のすべてのスマート・コントラクトで代替可能トークンを実装するための技術標準として普及しています。

ERC-20は、すべての代替可能なイーサリアムトークンが準拠すべき共通のルールリストを定義しています。その結果、このトークン標準により、あらゆるタイプの開発者が、新しいトークンがより広範なイーサリアムシステム内でどのように機能するかを正確に予測できるようになります。トークンがルールに従っている限り、新しいトークンがリリースされるたびに新しいプロジェクトを最初からやり直す必要がないことがわかっているため、開発者の作業が簡素化され、容易になります。

以下は、ERC-20が実装しなければならない関数をインターフェースとして提示したものです。インターフェースとは何かわからない場合は、[Solidityでのオブジェクト指向プログラミング(OOP)](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/)に関する記事を確認してください。

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

以下は、各関数が何のためのものかを1行ずつ説明したものです。この後、ERC-20トークンのシンプルな実装を紹介します。

## ゲッター {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

存在するトークンの総量を返します。この関数はゲッターであり、コントラクトの状態を変更しません。Solidityには浮動小数点数がないことに注意してください。そのため、ほとんどのトークンは18桁の小数を採用しており、1トークンに対して `1000000000000000000` のように総供給量やその他の結果を返します。すべてのトークンが18桁の小数を持っているわけではないため、トークンを扱う際にはこの点に十分注意する必要があります。

```solidity
function balanceOf(address account) external view returns (uint256);
```

アドレス (`account`) が所有するトークンの量を返します。この関数はゲッターであり、コントラクトの状態を変更しません。

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20標準では、あるアドレスが別のアドレスに対して、自身からトークンを引き出すためのアローワンスを与えることができます。このゲッターは、`spender` が `owner` に代わって消費することを許可されているトークンの残数を返します。この関数はゲッターであり、コントラクトの状態を変更せず、デフォルトでは0を返す必要があります。

## 関数 {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

関数を呼び出したアドレス (`msg.sender`) から受信者のアドレスへ、`amount` 分のトークンを送金します。この関数は、後述する `Transfer` イベントを発行します。送金が可能であった場合は true を返します。

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

関数呼び出し元 (`msg.sender`) の残高から、`spender` が送金できる `allowance` を設定します。この関数は Approval イベントを発行します。関数は、アローワンスが正常に設定されたかどうかを返します。

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

アローワンスの仕組みを使用して、`sender` から `recipient` へ `amount` 分のトークンを送金します。その後、呼び出し元のアローワンスから amount が差し引かれます。この関数は `Transfer` イベントを発行します。

## イベント {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

このイベントは、トークンの量 (value) が `from` アドレスから `to` アドレスに送金されたときに発行されます。

新しいトークンをミンティングする場合、通常は `0x00..0000` アドレスを `from` とした送金になり、トークンをバーンする場合は `0x00..0000` アドレスを `to` とした送金になります。

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

このイベントは、トークンの量 (`value`) が `owner` によって承認され、`spender` が使用できるようになったときに発行されます。

## ERC-20トークンの基本的な実装 {#a-basic-implementation-of-erc-20-tokens}

以下は、独自のERC-20トークンのベースとなる最もシンプルなコードです。

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

ERC-20トークン標準のもう1つの優れた実装として、[オープンツェッペリンのERC-20実装](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)があります。