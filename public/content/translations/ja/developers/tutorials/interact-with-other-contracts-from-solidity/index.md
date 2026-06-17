---
title: Solidityから他のコントラクトと対話する
description: 既存のコントラクトからスマート・コントラクトをデプロイし、対話する方法
author: "jdourlens"
tags: ["スマート・コントラクト", "solidity", "remix", "デプロイ", "コンポーザビリティ"]
skill: advanced
breadcrumb: コントラクトの対話
lang: ja
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

これまでのチュートリアルでは、[初めてのスマート・コントラクトをデプロイする方法](/developers/tutorials/deploying-your-first-smart-contract/)や、[修飾子を使用したアクセス制御](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/)、[Solidityでのエラー処理](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)などの機能を追加する方法について多くを学びました。このチュートリアルでは、既存のコントラクトからスマート・コントラクトをデプロイし、それと対話する方法を学びます。

ファクトリを作成することで、誰でも独自の`Counter`スマート・コントラクトを持てるようにするコントラクトを作成します。その名前は`CounterFactory`になります。まず、最初の`Counter`スマート・コントラクトのコードを以下に示します。

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

ファクトリのアドレスとコントラクトの所有者のアドレスを追跡するために、コントラクトのコードをわずかに変更したことに注意してください。別のコントラクトからコントラクトのコードを呼び出す場合、msg.senderはコントラクトファクトリのアドレスを参照します。コントラクトを使用して他のコントラクトと対話することは一般的な手法であるため、これは**理解しておくべき非常に重要なポイント**です。したがって、複雑なケースでは誰が送信者であるかに注意する必要があります。

このため、状態を変更する関数が、元の呼び出し元をパラメータとして渡すファクトリによってのみ呼び出されることを保証する`onlyFactory`修飾子も追加しました。

他のすべてのCounterを管理する新しい`CounterFactory`の中に、所有者とそのCounterコントラクトのアドレスを関連付けるマッピングを追加します。

```solidity
mapping(address => Counter) _counters;
```

イーサリアムでは、マッピングはJavaScriptのオブジェクトに相当し、タイプAの鍵をタイプBの値にマッピングできます。この場合、所有者のアドレスをそのCounterのインスタンスにマッピングします。

誰かのために新しいCounterをインスタンス化するコードは次のようになります。

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

まず、その人がすでにCounterを所有しているかどうかを確認します。Counterを所有していない場合は、その人のアドレスを`Counter`コンストラクタに渡して新しいCounterをインスタンス化し、新しく作成されたインスタンスをマッピングに割り当てます。

特定のCounterのカウントを取得するコードは次のようになります。

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

最初の関数は、指定されたアドレスに対してCounterコントラクトが存在するかどうかを確認し、インスタンスから`getCount`メソッドを呼び出します。2番目の関数である`getMyCount`は、msg.senderを直接`getCount`関数に渡すための単なるショートカットです。

`increment`関数も非常に似ていますが、元のトランザクション送信者を`Counter`コントラクトに渡します。

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

何度も呼び出されると、Counterがオーバーフローの被害に遭う可能性があることに注意してください。このような可能性から保護するために、可能な限り[SafeMathライブラリ](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)を使用する必要があります。

コントラクトをデプロイするには、`CounterFactory`と`Counter`の両方のコードを提供する必要があります。たとえばRemixでデプロイする場合、CounterFactoryを選択する必要があります。

完全なコードは以下の通りです。

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

コンパイル後、Remixのデプロイセクションで、デプロイするファクトリを選択します。

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

その後、コントラクトファクトリを操作して、値が変化することを確認できます。別のアドレスからスマート・コントラクトを呼び出したい場合は、Remixのアカウント選択でアドレスを変更する必要があります。