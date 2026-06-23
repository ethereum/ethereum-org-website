---
title: "テスト用にSolidityスマートコントラクトをモックする方法"
description: "テスト時にコントラクトをモック（からかう）すべき理由"
author: "マーカス・ワース"
lang: ja
tags: ["Solidity", "スマートコントラクト", "テスト", "モック"]
skill: intermediate
breadcrumb: "コントラクトのモック"
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[モックオブジェクト](https://wikipedia.org/wiki/Mock_object)は、オブジェクト指向プログラミングにおける一般的なデザインパターンです。「からかう」という意味の古いフランス語「mocquer」に由来し、「本物を模倣する」という意味に進化しました。これはまさに私たちがプログラミングで行っていることです。スマートコントラクトをからかうのは気が向いたときだけにしてほしいですが、可能な限りモックを作成してください。そうすることで、開発が楽になります。

## モックを使用したコントラクトのユニットテスト {#unit-testing-contracts-with-mocks}

コントラクトをモックするとは、基本的には元のコントラクトと非常に似た動作をするものの、開発者が簡単に制御できる2つ目のバージョンのコントラクトを作成することを意味します。複雑なコントラクトを作成し、[コントラクトの小さな部分だけをユニットテスト](/developers/docs/smart-contracts/testing/)したいと思うことはよくあります。問題は、この小さな部分をテストするために、到達するのが難しい非常に特定のコントラクトの状態が必要な場合、どうすればよいかということです。

コントラクトを必要な状態にするための複雑なテストセットアップロジックを毎回書くこともできますし、モックを書くこともできます。継承を使用すれば、コントラクトのモックは簡単です。元のコントラクトを継承する2つ目のモックコントラクトを作成するだけです。これで、モックの関数をオーバーライドできるようになります。例を見てみましょう。

## 例: プライベートなERC-20 {#example-private-erc20}

初期のプライベート期間を持つERC-20コントラクトの例を使用します。オーナーはプライベートユーザーを管理でき、最初はそれらのユーザーのみがトークンを受け取ることができます。一定の時間が経過すると、誰もがトークンを使用できるようになります。ちなみに、ここでは新しいオープンツェッペリンコントラクトv3の[`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks)フックを使用しています。

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

では、これをモックしてみましょう。

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

以下のいずれかのエラーメッセージが表示されます。

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

新しいSolidityバージョン0.6を使用しているため、オーバーライド可能な関数には`virtual`キーワードを追加し、オーバーライドする関数にはoverrideを追加する必要があります。したがって、両方の`isPublic`関数にこれらを追加しましょう。

これで、ユニットテストで代わりに`PrivateERC20Mock`を使用できるようになります。プライベート使用期間中の動作をテストしたい場合は`setIsPublic(false)`を使用し、同様にパブリック使用期間をテストする場合は`setIsPublic(true)`を使用します。もちろん、この例では[タイムヘルパー](https://docs.openzeppelin.com/test-helpers/0.5/api#increase)を使用して、それに応じて時間を変更することもできます。しかし、モックの概念はこれで明確になったはずです。単に時間を進めるだけでは済まないようなシナリオも想像できるでしょう。

## 複数のコントラクトのモック {#mocking-many-contracts}

すべてのモックに対して別のコントラクトを作成しなければならない場合、コードが煩雑になる可能性があります。これが気になる場合は、[MockContract](https://github.com/gnosis/mock-contract)ライブラリを見てみるとよいでしょう。これにより、コントラクトの動作をその場でオーバーライドして変更することができます。ただし、これは別のコントラクトへの呼び出しをモックする場合にのみ機能するため、今回の例では機能しません。

## モックはさらに強力になる {#mocking-can-be-even-more-powerful}

モックの力はそれだけにとどまりません。

- 関数の追加: 特定の関数をオーバーライドするだけでなく、単に追加の関数を追加することも役立ちます。トークンの良い例は、任意のユーザーが無料で新しいトークンを取得できるようにする追加の`mint`関数を持つことです。
- テストネットでの使用: 分散型アプリケーション (dapp) と一緒にテストネットにコントラクトをデプロイしてテストする場合は、モックバージョンの使用を検討してください。本当に必要な場合を除き、関数のオーバーライドは避けてください。結局のところ、実際のロジックをテストしたいはずです。しかし、例えば、新しいデプロイを必要とせずにコントラクトの状態を初期状態にリセットするだけのリセット関数を追加することは役立ちます。当然ながら、メインネットのコントラクトにはそのような機能を持たせたくないでしょう。