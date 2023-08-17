---
title: Solidityを使用した他のコントラクトの活用
description: 既存のコントラクトからスマートコントラクトをデプロイし、それを活用する方法
author: "jdourlens"
tags:
  - "スマートコントラクト"
  - "Solidity"
  - "Remix"
  - "デプロイ"
  - "構成可能性"
skill: advanced
lang: ja
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

これまでのチュートリアルでは、[最初のスマートコントラクトをデプロイする方法](/developers/tutorials/deploying-your-first-smart-contract/)と、[修飾子によるアクセス制御](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/)や[Solidity でのエラー処理](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)といったいくつかの機能を追加する方法について学びました。 このチュートリアルでは、既存のコントラクトからスマートコントラクトをデプロイし、それを活用する方法について説明します。

ここでは、`CounterFactory`という名前のファクトリーを作成することで、誰でも自分の`Counter`スマートコントラクトを所有できるようにするコントラクトを作成します。 初めに、これが`Counter`スマートコントラクトの初期コードです。

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

ファクトリーのアドレスとコントラクト所有者のアドレスを追跡するために、コントラクトコードを少し変更していることに注意してください。 他のコントラクトからコントラクトコードを呼び出した場合、msg.sender はコントラクトファクトリーのアドレスを参照します。 コントラクトを使用して他のコントラクトとやり取りすることはよくあることなので、これは**理解しておくべき非常に重要なポイント**です。 したがって、複雑なケースでは誰が送信者なのかに注意を払う必要があります。

このために、`onlyFactory`という修飾子も追加しました。この修飾子は、元の呼び出し元をパラメータとして渡すファクトリーのみが、状態変更関数を呼び出せるようにします。

他のすべてのカウンターを管理する新しい`CounterFactory`内で、所有者をカウンターコントラクトのアドレスに関連付けるマッピングを追加します。

```solidity
mapping(address => Counter) _counters;
```

イーサリアムでは、マッピングは JavaScript のオブジェクトに相当します。これは、型 A のキーを型 B の値にマッピングできます。ここでは、所有者のアドレスをそのカウンターのインスタンスにマッピングしています。

ユーザーのために新しいカウンターをインスタンス化する場合は、次のようになります。

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

まず、そのユーザーがすでにカウンターを所有しているかどうかを確認します。 もしカウンターを所有していなければ(カウンターの数が 0 ならば)、そのアドレスを`Counter`コンストラクタに渡して新しいカウンターをインスタンス化し、新しく作成したインスタンスをマッピングに割り当てます。

特定のカウンターの数を取得する場合は、次のようになります。

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

最初の関数は、指定されたアドレスに Counter コントラクトが存在するかどうかをチェックし、存在する場合にインスタンスから`getCount`メソッドを呼び出します。 2 番目の関数`getMyCount`は、msg.sender を直接`getCount`関数に渡す短い関数です。

`increment`関数もかなり類似していますが、`Counter`コントラクトに元のトランザクション送信者を渡します。

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

この関数を何度も呼び出すと、カウンターがオーバーフローする可能性がありますので注意してください。 オーバーフローが発生しないように、できる限り[SafeMath ライブラリ](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)を使用してください。

このコントラクトをデプロイするためには、`CounterFactory`と`Counter`の両方のコードが必要です。 例えば Remix でデプロイする場合、CounterFactory を選択する必要があります。

これが完成したコードです。

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

コンパイル後、Remix のデプロイセクションで、デプロイするファクトリーを選択します。

![Remixにデプロイするファクトリーの選択](./counterfactory-deploy.png)

コントラクトファクトリーを使うと、値の変化を確認できます。 もし、別のアドレスからスマートコントラクトを呼び出したい場合は、Remix のアカウントの選択で別のアドレスに変更する必要があります。
