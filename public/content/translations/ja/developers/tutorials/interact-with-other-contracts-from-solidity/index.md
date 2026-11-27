---
title: "Solidityから他のコントラクトと対話する"
description: "既存のコントラクトからスマート・コントラクトをデプロイし、対話する方法"
author: "jdourlens"
tags: ["スマート・コントラクト", "Solidity", "Remix", "デプロイ", "コンポーザビリティ"]
skill: advanced
breadcrumb: "コントラクトの対話"
lang: ja
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

これまでのチュートリアルでは、[初めてのスマート・コントラクトをデプロイする方法](/developers/tutorials/deploying-your-first-smart-contract/)や、[修飾子を使用したアクセス制御](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers)、[Solidityでのエラー処理](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions)などの機能を追加する方法について多くを学びました。このチュートリアルでは、既存のコントラクトからスマート・コントラクトをデプロイし、それと対話する方法を学びます。

ファクトリを作成することで、誰でも独自の`Counter`スマート・コントラクトを持てるようにするコントラクトを作成します。その名前は`CounterFactory`になります。まず、最初の`Counter`スマート・コントラクトのコードを以下に示します。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

     constructor(address owner) {
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

ファクトリのアドレスとコントラクトの所有者のアドレスを追跡するために、コントラクトのコードを少し変更したことに注意してください。別のコントラクトからコントラクトのコードを呼び出す場合、msg.senderはコントラクト・ファクトリのアドレスを参照します。コントラクトを使用して他のコントラクトと対話することは一般的な手法であるため、これは**理解しておくべき非常に重要なポイント**です。したがって、複雑なケースでは誰が送信者であるかに注意する必要があります。

このため、状態を変更する関数は、元の呼び出し元をパラメータとして渡すファクトリからのみ呼び出せるようにする`onlyFactory`修飾子も追加しました。

他のすべてのCounterを管理する新しい`CounterFactory`内に、所有者をそのcounterコントラクトのアドレスに関連付けるマッピングを追加します。

```solidity
mapping(address => Counter) _counters;
```

Solidityでは、[マッピング](https://docs.soliditylang.org/en/latest/types.html#mapping-types)はJavaScriptのオブジェクトに似ています。タイプAの鍵をタイプBの値にマッピングします。この場合、所有者のアドレスをそのCounterのインスタンスにマッピングします。

誰かのために新しいCounterをインスタンス化すると、次のようになります。

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

まず、その人がすでにcounterを所有しているかどうかを確認します。マッピングは、設定されたことのない鍵に対してデフォルト値を返します。コントラクト・タイプの場合はゼロ・アドレスであるため、保存されているコントラクトのアドレスを`address(0)`と比較します。counterを所有していない場合は、そのアドレスを`Counter`コンストラクタに渡して新しいcounterをインスタンス化し、新しく作成されたインスタンスをマッピングに割り当てます。

特定のCounterのカウントを取得するには、次のようになります。

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

最初の関数は、指定されたアドレスにCounterコントラクトが存在するかどうかを確認し、インスタンスから`getCount`メソッドを呼び出します。2番目の関数である`getMyCount`は、msg.senderを直接`getCount`関数に渡すための単なるショートカットです。

`increment`関数も非常に似ていますが、元のトランザクション送信者を`Counter`コントラクトに渡します。

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Solidity 0.8以降、算術演算は[デフォルトでチェックされます](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic)。`_count`がオーバーフローした場合、`_count++`は暗黙のうちにラップアラウンドするのではなく、トランザクションをリバートするため、SafeMathのような追加のライブラリは必要ありません。

コントラクトをデプロイするには、`CounterFactory`と`Counter`の両方のコードを提供する必要があります。たとえばRemixでデプロイする場合は、CounterFactoryを選択する必要があります。

完全なコードは以下の通りです。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

     constructor(address owner) {
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
        require(address(_counters[msg.sender]) == address(0), "You already have a counter");
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
        _counters[msg.sender].increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require(address(_counters[account]) != address(0), "This account has no counter");
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

コンパイル後、Remixのデプロイ・セクションで、デプロイするファクトリを選択します。

![Remixでデプロイするファクトリの選択](./counterfactory-deploy.png)

その後、コントラクト・ファクトリを操作して、値が変化することを確認できます。別のアドレスからスマート・コントラクトを呼び出したい場合は、RemixのAccount選択でアドレスを変更する必要があります。
