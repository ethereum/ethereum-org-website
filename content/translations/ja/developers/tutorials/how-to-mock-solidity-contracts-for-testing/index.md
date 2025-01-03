---
title: Solidity で、スマートコントラクトのテスト用モックアップを作成する方法
description: テストでは、コントラクトのモックアップを使用すべき理由
author: Markus Waas
lang: ja
tags:
  - "Solidity"
  - "スマートコントラクト"
  - "テスト"
  - "モック"
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[モック・オブジェクト](https://wikipedia.org/wiki/Mock_object) は、オブジェクト指向プログラミングにおいて一般的なデザインパターンです。 「モック」という言葉は、古フランス語で「からかう」という意味を持つ「mocquer」が由来で、「本物を模倣する」という意味に発展しました。これこそ、プログラミングにで「モックアップ」を作成する作業です。 あなたが作成したスマートコントラクトについて「からかう」必要はありませんが、「モックアップ」の作成はできる限り必ず行ってください。 後々、楽になります。

## コントラクトのモックアップを使った単体テスト {#unit-testing-contracts-with-mocks}

コントラクトのモックアップを作成するとは、究極的に、オリジナルとほぼ同様に動作するものの、デベロッパが簡単に管理できる第2のバージョンを作成することです。 複雑なコントラクトを開発すると、[コントラクト全体の一部のみを単体テストする](/developers/docs/smart-contracts/testing/)必要が発生する場合が少なくありません。 問題となるのは、この一部分をテストする上で、非常に具体的なコントラクトの状態を再現する必要があるものの、再現するのが難しい場合です。

テストに求められる状態を再現するために、テストを設定するための複雑なロジックを作成する代わりに、モックアップを作成すればよいのです。 コントラクトのモックアップは、継承を使って簡単に作成できます。 オリジナル版を継承したモックアップのコントラクトを作成するだけです。 モックアップでは、機能をオーバーライドすることができます。 この点については、具体例で見てみましょう。

## 例：プライベートのERC-20コントラクト {#example-private-erc20}

ここでは、当初にプライベート期間が設定された ERC-20 コントラクトを使って説明します。 トークン所有者はプライベートユーザーを管理でき、当初トークンを受け取ることができるのはプライベートユーザーのみになります。 設定した時間が経過した後は、すべてのユーザーがトークンを使用できるようになります。 参考までに、この例では新しいOpenZeppelinコントラクトv3に含まれている[`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/3.x/extending-contracts#using-hooks)フックを使用しています。

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

Solidityの新しいバージョン（0.6）を使用しているため、オーバーライド可能な関数については`virtual`のキーワードを追加して、オーバーライド関数をオーバーライドする必要があります。 このため、両方の`isPublic`関数にこのキーワードを追加します。

これで、単体テストで`PrivateERC20Mock`を使えるようになりました。 プライベート利用期間中の動作をテストしたい場合は、`setIsPublic(false)`を使用し、パブリック利用期間については`setIsPublic(true)`を使ってテストしてください。 もちろん、[time helpers](https://docs.openzeppelin.com/test-helpers/0.5/api#increase)を使って、対象時間を変更することもできます。 しかし、すでにモックアップの有用性について理解できたでしょう。単に時間を進めるよりも、モックアップを利用した方が望ましいシナリオがすぐに思い浮かぶはずです。

## 複数のコントラクトに対してモックアップを作成する場合 {#mocking-many-contracts}

モックアップごとに新たなコントラクトを作成するのは煩雑な作業ですね。 これを避けたい場合は、[MockContract](https://github.com/gnosis/mock-contract)ライブラリを参照してください。 このライブラリを用いることで、コントラクトの動作をその場でオーバーライドし、変更することができます。 ただしこのライブラリは、別のコントラクトに対する呼び出しのみに対応していますので、今回は使用できません。

## モックアップは、その他にも利点があります {#mocking-can-be-even-more-powerful}

モックアップ作成のメリットは、他にもあります。

- 関数の追加：特定の関数をオーバーライドする機能だけでなく、関数を追加できることも有益です。 トークンを対象とする場合のよい例としては、`ミント`機能を追加することで、ユーザーが新規トークンを無料で手に入れられるようにすることができます。
- テストネットでの使用：Dapp と共に、テストネット上でコントラクトをデプロイ、テストする際は、モックアップの活用を検討すべきです。 本当に必要な場合を除き、関数をオーバーライドすることは避けるべきです。 結局のところ、実際のロジックをテストする必要があるからです。 しかし例えば、コントラクトのステートを、新たにデプロイする必要なしで開始時点にリセットするだけのリセット機能は、有益な場合があるでしょう。 言うまでもなく、メインネット用のコントラクトにはこのようなリセット機能を含めてはなりません。
