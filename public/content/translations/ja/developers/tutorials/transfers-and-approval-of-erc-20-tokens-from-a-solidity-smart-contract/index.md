---
title: Solidityスマート・コントラクトからのERC-20トークンの送金と承認
description: Solidityを使用して、ERC-20トークンの送金と承認を処理するDEXスマート・コントラクトを構築します。
author: "jdourlens"
tags: ["スマート・コントラクト", "トークン", "solidity", "erc-20"]
skill: intermediate
breadcrumb: ERC-20の送金
lang: ja
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

前回のチュートリアルでは、イーサリアム・ブロックチェーン上での[SolidityによるERC-20トークンの構造](/developers/tutorials/understand-the-erc-20-token-smart-contract/)について学びました。この記事では、Solidity言語を使用して、スマート・コントラクトからトークンと対話する方法を見ていきます。

このスマート・コントラクトでは、ユーザーがイーサを新しくデプロイされた[ERC-20トークン](/developers/docs/standards/tokens/erc-20/)と取引できる、実際のダミーの分散型取引所 (DEX) を作成します。

このチュートリアルでは、前回のチュートリアルで記述したコードをベースとして使用します。私たちのDEXは、コンストラクタでコントラクトのインスタンスを生成し、以下の操作を実行します。

- トークンからイーサへの交換
- イーサからトークンへの交換

シンプルなERC20コードベースを追加して、分散型取引所のコードを書き始めましょう。

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

新しいDEXスマート・コントラクトはERC-20をデプロイし、供給されたすべてのトークンを取得します。

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

これでDEXが完成し、すべてのトークン準備金が利用可能になりました。このコントラクトには2つの関数があります。

- `buy`: ユーザーはイーサを送信し、代わりにトークンを受け取ることができます。
- `sell`: ユーザーはトークンを送信し、イーサを取り戻すことができます。

## buy関数 {#the-buy-function}

buy関数をコーディングしましょう。まず、メッセージに含まれるイーサの量を確認し、コントラクトが十分なトークンを所有していること、およびメッセージにイーサが含まれていることを検証する必要があります。コントラクトが十分なトークンを所有している場合、ユーザーにその数のトークンを送金し、`Bought`イベントを発行します。

エラーが発生した場合にrequire関数を呼び出すと、送信されたイーサは直接リバートされ、ユーザーに返還されることに注意してください。

シンプルにするため、1トークンを1 Weiと交換します。

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

購入が成功した場合、トランザクション内に2つのイベントが表示されるはずです。トークンの`Transfer`イベントと`Bought`イベントです。

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## sell関数 {#the-sell-function}

売却を担当する関数では、まずユーザーが事前にapprove関数を呼び出して、その金額を承認している必要があります。送金を承認するには、DEXによってインスタンス化されたERC20Basicトークンをユーザーが呼び出す必要があります。これを実現するには、まずDEXコントラクトの`token()`関数を呼び出して、DEXが`token`というERC20Basicコントラクトをデプロイしたアドレスを取得します。次に、セッション内でそのコントラクトのインスタンスを作成し、その`approve`関数を呼び出します。その後、DEXの`sell`関数を呼び出して、トークンをイーサにスワップして戻すことができます。たとえば、対話型のBrownieセッションでは次のようになります。

```python
#### 対話型BrownieコンソールでのPython...

# DEXをデプロイする
dex = DEX.deploy({'from':account1})

# buy関数を呼び出してイーサをトークンにスワップする
# 1e18はWei単位で表した1イーサである
dex.buy({'from': account2, 1e18})

# ERC20トークンのデプロイ先アドレスを取得する
# DEXコントラクトの作成中にデプロイされた
# dex.token()はトークンのデプロイ先アドレスを返す
token = ERC20Basic.at(dex.token())

# トークンのapprove関数を呼び出す
# dexのアドレスをspenderとして承認する
# そして、あなたのトークンのうちどれだけの消費を許可するか
token.approve(dex.address, 3e18, {'from':account2})

```

そして、sell関数が呼び出されたとき、呼び出し元のアドレスからコントラクトのアドレスへの送金が成功したかどうかを確認し、イーサを呼び出し元のアドレスに送り返します。

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

すべてが機能すれば、トランザクション内に2つのイベント（`Transfer`と`Sold`）が表示され、トークン残高とイーサ残高が更新されるはずです。

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

このチュートリアルでは、ERC-20トークンの残高とアローワンスを確認する方法、およびインターフェースを使用してERC20スマート・コントラクトの`Transfer`と`TransferFrom`を呼び出す方法を見てきました。

トランザクションを作成した後は、コントラクトに対して行われた[トランザクションを待機して詳細を取得する](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)ためのJavaScriptチュートリアルや、ABIがある限り、[トークンの送金やその他のイベントによって生成されたイベントをデコードするためのチュートリアル](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/)があります。

以下は、このチュートリアルの完全なコードです。

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


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```