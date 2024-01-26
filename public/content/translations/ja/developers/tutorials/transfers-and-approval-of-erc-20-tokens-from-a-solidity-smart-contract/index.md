---
title: SolidityスマートコントラクトによるERC-20トークンの転送と承認
description: Solidity言語で書かれたトークンとやり取りするには、スマートコントラクトをどのように使用すればよいか
author: "jdourlens"
tags:
  - "スマートコントラクト"
  - "トークン"
  - "Solidity"
  - "erc-20"
skill: intermediate
lang: ja
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

前回のチュートリアルでは、イーサリアムブロックチェーン上の[Solidity で描かれた ERC-20 トークンの構造](/developers/tutorials/understand-the-erc-20-token-smart-contract/)について学びました。 この記事では、Solidity 言語で書かれたトークンとやり取りするためのスマートコントラクトの使い方について説明します。

このスマートコントラクトのために、私たちは新しくデプロイされた[ERC-20 トークン](/developers/docs/standards/tokens/erc-20/)でイーサリアムを取引できる、ダミーの分散型取引所を実際に作成します。

このチュートリアルでは、前のチュートリアルで書いたコードをベースとして使います。 この分散型取引所(DEX)では、コントラクトのインスタンスをコンストラクタでインスタンス化し、以下の操作を実行します。

- トークンをイーサ(ETH)に交換
- イーサ(ETH)をトークンに交換

次のシンプルな ERC20 コードベースを追加することで、分散型取引所コードを開始します。

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

次の新しい分散型取引所(DEX)スマートコントラクトは 、ERC-20 をデプロイし、供給されたすべてを取得します。

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

これで分散型取引所(DEX)ができました。また、すべてのトークンリザーブが利用可能になりました。 コントラクトには、次の 2 つの関数があります。

- `buy`: ユーザーはイーサ(ETH)を送ってトークンに交換できます
- `sell`: ユーザーはトークンを送信してイーサ(ETH)を取り戻すことができます

## buy 関数 {#the-buy-function}

buy 関数をコーディングしてみましょう。 まず、メッセージに含まれるイーサ(ETH)の量を確認し、コントラクトが十分なトークンを所有していることと、そのメッセージにいくつかのイーサ(ETH)が含まれていることを検証する必要があります。 コントラクトが十分なトークンを所有している場合、ユーザーにその分のトークンを送信し、 `Bought` イベントを発行します。

require 関数の呼び出しがエラーだった場合に、送信されたイーサ(ETH)は直接元に戻され、ユーザーに返されることに注意してください。

ここではシンプルに、1 トークンと 1Wei を交換します。

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

購入が成功した場合、トランザクションには`Transfer`と`Bought`の 2 つのイベントが表示されます。

![トランザクション内の2つのイベント: TransferとBought](./transfer-and-bought-events.png)

## sell 関数 {#the-sell-function}

売却を行う関数は事前に approve 関数を呼び出し、ユーザーがその金額を承認することを要求します。 転送を承認するには、分散型取引所(DEX)によってインスタンス化された ERC20Basic トークンがユーザーによって呼び出される必要があります。 これは、まず分散型取引所(DEX)コントラクトの`token()`関数を呼び出し、分散型取引所(DEX)が`token`という ERC20Basic コントラクトをデプロイしたアドレスを取得することで実現できます。 次に、セッション内にそのコントラクトのインスタンスを作成し、その`approve`関数を呼び出します。 次に、分散型取引所(DEX)の`sell`関数を呼び出すことで、トークンをイーサ(ETH)に交換できます。 例えば、インタラクティブ・ブラウニー(interactive brownie)セッションでは、次のようになります。

```python
#### Python in interactive brownie console...

# deploy the DEX
dex = DEX.deploy({'from':account1})

# call the buy function to swap ether for token
# 1e18 is 1 ether denominated in wei
dex.buy({'from': account2, 1e18})

# get the deployment address for the ERC20 token
# that was deployed during DEX contract creation
# dex.token() returns the deployed address for token
token = ERC20Basic.at(dex.token())

# call the token's approve function
# approve the dex address as spender
# and how many of your tokens it is allowed to spend
token.approve(dex.address, 3e18, {'from':account2})

```

その後、sell 関数が呼び出されたときに、呼び出し元のアドレスからコントラクトアドレスへの転送が成功したかどうかを確認し、その後イーサ(ETH)を呼び出し元のアドレスに送信します。

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

すべてがうまくいけば、トランザクションに 2 つのイベント(`Transfer` と `Sold`)が表示され、トークンの残高とイーサリアムの残高が更新されるはずです。

![トランザクション内の2つのイベント: TransferとSold](./transfer-and-sold-events.png)

<Divider />

このチュートリアルでは、残高と ERC-20 トークンの割当量を確認する方法と、インターフェースを使用して ERC20 スマートコントラクトの`Transfer`と`TransferFrom`を呼び出す方法について説明しました。

一度トランザクションが作成されると、コントラクト用に作成されている[待機してトランザクションについての詳細を取得する](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)ための JavaScript チュートリアルや、アプリケーションバイナリインターフェース(ABI)があれば、[トークン転送や他のイベントによって発行されるイベントをデコードするチュートリアル](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/)を参照することで情報を取得できます。

チュートリアルの完全なコードは、次のようになります。

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
