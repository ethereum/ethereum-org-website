---
title: Solidity で、スマートコントラクトのテスト用モックアップを作成する方法
description: テストでは、コントラクトのモックアップを使用すべき理由
author: Markus Waas
lang: ja
tags: [ "Solidity", "スマート契約", "テスト", "モックアップ作成" ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

「[モックオブジェクト](https://wikipedia.org/wiki/Mock_object)」は、オブジェクト指向プログラミングにおいて一般的なデザインパターンです。 「モック」という言葉は、古フランス語で「からかう」という意味を持つ「mocquer」が由来で、「本物を模倣する」という意味に発展しました。これこそ、プログラミングにで「モックアップ」を作成する作業です。 あなたが作成したスマートコントラクトについて「からかう」必要はありませんが、「モックアップ」の作成はできる限り必ず行ってください。 後々、楽になります。

## モックを使ったコントラクトの単体テスト {#unit-testing-contracts-with-mocks}

コントラクトのモックアップを作成するとは、究極的に、オリジナルとほぼ同様に動作するものの、デベロッパが簡単に管理できる第2のバージョンを作成することです。 複雑なコントラクトを扱うことになると、[コントラクトのごく一部だけを単体テスト](/developers/docs/smart-contracts/testing/)したい場合がよくあります。 問題となるのは、この一部分をテストする上で、非常に具体的なコントラクトの状態を再現する必要があるものの、再現するのが難しい場合です。

テストに求められる状態を再現するために、テストを設定するための複雑なロジックを作成する代わりに、モックアップを作成すればよいのです。 コントラクトのモックアップは、継承を使って簡単に作成できます。 オリジナル版を継承したモックアップのコントラクトを作成するだけです。 モックアップでは、機能をオーバーライドすることができます。 この点については、具体例で見てみましょう。

## 例: Private ERC20 {#example-private-erc20}

ここでは、当初にプライベート期間が設定された ERC-20 コントラクトを使って説明します。 トークン所有者はプライベートユーザーを管理でき、当初トークンを受け取ることができるのはプライベートユーザーのみになります。 設定した時間が経過した後は、すべてのユーザーがトークンを使用できるようになります。 ちなみに、新しいOpenZeppelin contracts v3の[`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks)フックを使用しています。

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

さっそく、このコントラクトのモックアップを作成しましょう。

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

以下のエラーメッセージのどちらかが表示されます：

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

新しいSolidityバージョン0.6を使用しているため、オーバーライドされる関数には`virtual`キーワードを、オーバーライドする関数には`override`を追加する必要があります。 では、両方の`isPublic`関数にそれらを追加しましょう。

これで、単体テストで代わりに`PrivateERC20Mock`を使用できます。 プライベート利用期間中の動作をテストしたい場合は`setIsPublic(false)`を、同様にパブリック利用期間のテストには`setIsPublic(true)`を使用します。 もちろん、この例では[タイムヘルパー](https://docs.openzeppelin.com/test-helpers/0.5/api#increase)を使って、時間も同様に変更することもできます。 しかし、すでにモックアップの有用性について理解できたでしょう。単に時間を進めるよりも、モックアップを利用した方が望ましいシナリオがすぐに思い浮かぶはずです。

## 多数のコントラクトのモック {#mocking-many-contracts}

モックアップごとに新たなコントラクトを作成するのは煩雑な作業ですね。 これが気になる場合は、[MockContract](https://github.com/gnosis/mock-contract)ライブラリをご覧ください。 これにより、コントラクトの動作をその場でオーバーライドして変更できます。 ただしこのライブラリは、別のコントラクトに対する呼び出しのみに対応していますので、今回は使用できません。

## モックはさらに強力になりうる {#mocking-can-be-even-more-powerful}

モックアップ作成のメリットは、他にもあります。

- 関数の追加：特定の関数をオーバーライドする機能だけでなく、関数を追加できることも有益です。 トークンの良い例として、追加の`mint`関数を持たせることで、どのユーザーでも新しいトークンを無料で取得できるようにすることが挙げられます。
- テストネットでの使用：Dapp と共に、テストネット上でコントラクトをデプロイ、テストする際は、モックアップの活用を検討すべきです。 本当に必要な場合を除き、関数をオーバーライドすることは避けるべきです。 結局のところ、実際のロジックをテストする必要があるからです。 しかし例えば、コントラクトのステートを、新たにデプロイする必要なしで開始時点にリセットするだけのリセット機能は、有益な場合があるでしょう。 言うまでもなく、メインネット用のコントラクトにはこのようなリセット機能を含めてはなりません。
