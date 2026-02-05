---
title: "如何模擬 Solidity 智能合約進行測試"
description: "為什麼在測試時應該要取笑你的合約"
author: Markus Waas
lang: zh-tw
tags: [ "穩固", "智能合約", "測試", "模擬" ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[模擬物件](https://wikipedia.org/wiki/Mock_object) 是物件導向編程中一種常見的設計模式。 這個詞源自古法語單字「mocquer」，意思是「取笑」，後來演變成「模仿真實的東西」，這正是我們在編程中所做的事。 如果你想的話，可以盡情取笑你的智能合約，但只要可以，就請模擬它們。 這能讓你的日子更輕鬆。

## 使用模擬進行合約的單元測試 {#unit-testing-contracts-with-mocks}

模擬合約基本上是指建立該合約的第二個版本，其行為與原始版本非常相似，但開發者能輕易控制其行為。 你經常會遇到複雜的合約，而你只想[對合約的一小部分進行單元測試](/developers/docs/smart-contracts/testing/)。 問題是，如果測試這一小部分需要一個很難達到的特定合約狀態，該怎麼辦？

你可以每次都編寫複雜的測試設定邏輯，將合約帶入所需的狀態，或者你也可以編寫一個模擬。 透過繼承來模擬合約很簡單。 只要建立一個繼承自原始合約的第二個模擬合約即可。 現在你可以為你的模擬覆寫函數。 讓我們來看一個例子。

## 範例：私有 ERC20 {#example-private-erc20}

我們使用一個範例 ERC-20 合約，它有一個初始的私有時間。 擁有者可以管理私有使用者，而且一開始只有這些使用者可以接收代幣。 一旦經過特定時間，所有人都可以使用這些代幣。 如果你感到好奇，我們使用的是新版 OpenZeppelin 合約 v3 中的 [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) 掛鉤。

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

        require(_validRecipient(to), "PrivateERC20：無效的接收者");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

現在讓我們來模擬它。

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

你會收到以下其中一則錯誤訊息：

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

由於我們使用的是新版 Solidity 0.6，我們必須為可被覆寫的函數加上 `virtual` 關鍵字，並為進行覆寫的函數加上 `override` 關鍵字。 所以讓我們將這些關鍵字加到兩個 `isPublic` 函數中。

現在，在你的單元測試中，你可以改用 `PrivateERC20Mock`。 當你想在私有使用期間測試其行為時，請使用 `setIsPublic(false)`；同樣地，測試公開使用期間時請用 `setIsPublic(true)`。 當然，在我們的範例中，我們也可以使用[時間輔助工具](https://docs.openzeppelin.com/test-helpers/0.5/api#increase)來相應地更改時間。 但現在模擬的概念應該很清楚了，你可以想像在某些情境下，事情並不像單純推進時間那麼簡單。

## 模擬多個合約 {#mocking-many-contracts}

如果你必須為每一個模擬都建立另一個合約，事情可能會變得很混亂。 如果這困擾著你，你可以看看 [MockContract](https://github.com/gnosis/mock-contract) 函式庫。 它讓你能即時覆寫和改變合約的行為。 然而，它只適用於模擬對另一個合約的呼叫，所以在我們的範例中行不通。

## 模擬的功能可以更強大 {#mocking-can-be-even-more-powerful}

模擬的功能不止於此。

- 新增函數：不僅覆寫特定函數很有用，單純新增額外函數也同樣有用。 一個關於代幣的好例子是，增加一個額外的 `mint` 函數，讓任何使用者都能免費獲得新代幣。
- 在測試網上使用：當你在測試網上部署和測試你的合約以及去中心化應用程序時，請考慮使用模擬合約。 除非真的有必要，否則請避免覆寫函數。 畢竟，你想要測試的是真實的邏輯。 但舉例來說，新增一個重設函數可能很有用，它可以簡單地將合約狀態重設回初始狀態，而無需重新部署。 當然，你不會想在主網合約中新增這樣的函式。
