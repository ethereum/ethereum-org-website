---
title: Solidityから他のコントラクトとやり取りする
description: 既存のコントラクトからスマートコントラクトをデプロイし、それとやり取りする方法
author: "jdourlens"
tags: [ "スマート契約", "Solidity", "Remix", "デプロイ", "構成可能性" ]
skill: advanced
lang: ja
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

これまでのチュートリアルでは、[最初のスマートコントラクトのデプロイ方法](/developers/tutorials/deploying-your-first-smart-contract/)や、[修飾子(modifier)を使ったアクセス制御](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/)、[Solidityでのエラー処理](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)といった機能の追加など、多くのことを学びました。 このチュートリアルでは、既存のコントラクトからスマートコントラクトをデプロイし、それとやり取りする方法を学びます。

ここでは、`CounterFactory`という名前のファクトリーを作成することで、誰もが自分自身の`Counter`スマートコントラクトを持てるようにするコントラクトを作成します。 まず、これが最初の`Counter`スマートコントラクトのコードです。

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "あなたはこのコントラクトの所有者ではありません");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "ファクトリーを使用する必要があります");
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

ファクトリーのアドレスとコントラクト所有者のアドレスを追跡するために、コントラクトコードを少し変更したことに注意してください。 他のコントラクトからコントラクトコードを呼び出すと、`msg.sender`は私たちのコントラクトファクトリーのアドレスを参照します。 コントラクトを使って他のコントラクトとやり取りするのは一般的な方法であるため、これは**理解しておくべき、本当に重要な点**です。 したがって、複雑なケースでは誰が送信者(`sender`)なのかに注意する必要があります。

このため、元の呼び出し元をパラメータとして渡すファクトリーによってのみ状態変更関数が呼び出されるように、`onlyFactory`修飾子も追加しました。

他のすべての`Counter`を管理する新しい`CounterFactory`の中に、所有者とそのカウンターコントラクトのアドレスを関連付けるマッピングを追加します。

```solidity
mapping(address => Counter) _counters;
```

イーサリアムでは、マッピングはJavaScriptのオブジェクトに相当し、型Aのキーを型Bの値にマッピングできます。このケースでは、所有者のアドレスをその`Counter`のインスタンスにマッピングします。

誰かのために新しい`Counter`をインスタンス化するには、次のようになります。

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

まず、その人がすでにカウンターを所有しているかどうかをチェックします。 その人がカウンターを所有していない場合、その人のアドレスを`Counter`のコンストラクタに渡して新しいカウンターをインスタンス化し、新しく作成されたインスタンスをマッピングに割り当てます。

特定の`Counter`のカウント数を取得するには、次のようになります。

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

最初の関数は、指定されたアドレスに対して`Counter`コントラクトが存在するかどうかをチェックし、その後インスタンスから`getCount`メソッドを呼び出します。 2番目の関数`getMyCount`は、`msg.sender`を直接`getCount`関数に渡すための、ただのショートカットです。

`increment`関数も非常によく似ていますが、元のトランザクションの送信者(`sender`)を`Counter`コントラクトに渡します。

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

何度も呼び出されると、カウンターがオーバーフローを起こす可能性があることに注意してください。 この可能性から保護するために、[SafeMathライブラリ](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)をできるだけ使用すべきです。

このコントラクトをデプロイするには、`CounterFactory`と`Counter`の両方のコードを提供する必要があります。 例えばRemixでデプロイする場合、`CounterFactory`を選択する必要があります。

こちらが全コードです。

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "あなたはこのコントラクトの所有者ではありません");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "ファクトリーを使用する必要があります");
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

コンパイル後、Remixのデプロイセクションで、デプロイするファクトリーを選択します。

![Remixでデプロイするファクトリーの選択](./counterfactory-deploy.png)

その後、コントラクトファクトリーを操作して、値が変化することを確認できます。 もし、異なるアドレスからスマートコントラクトを呼び出したい場合は、Remixのアカウント選択でアドレスを変更する必要があります。
