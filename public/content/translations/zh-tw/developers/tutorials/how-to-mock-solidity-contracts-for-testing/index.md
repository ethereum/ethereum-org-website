---
title: "如何在測試中模擬 Solidity 智能合約"
description: "為什麼你應該在測試時「取笑」你的合約"
author: "馬庫斯·瓦斯"
lang: zh-tw
tags: ["Solidity", "智能合約", "測試", "模擬"]
skill: intermediate
breadcrumb: "模擬合約"
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[模擬物件 (Mock objects)](https://wikipedia.org/wiki/Mock_object) 是物件導向程式設計中常見的設計模式。這個詞源自古法語單字「mocquer」，意思是「取笑」，後來演變成「模仿真實事物」，這正是我們在程式設計中所做的事情。除非你真的想，否則請不要隨便取笑你的智能合約，但只要情況允許，請盡量模擬 (mock) 它們。這會讓你的生活更輕鬆。

## 使用模擬進行合約單元測試 {#unit-testing-contracts-with-mocks}

模擬合約本質上意味著建立該合約的第二個版本，其行為與原始版本非常相似，但開發人員可以輕鬆控制它。你經常會遇到複雜的合約，而你只想[對合約的一小部分進行單元測試](/developers/docs/smart-contracts/testing/)。問題是，如果測試這一小部分需要一個非常特定且難以達到的合約狀態，該怎麼辦？

你可以每次都編寫複雜的測試設定邏輯，使合約進入所需狀態，或者你可以編寫一個模擬。透過繼承來模擬合約非常簡單。只需建立第二個繼承自原始合約的模擬合約即可。現在你可以覆寫模擬合約中的函式。讓我們透過一個範例來看看。

## 範例：私有 ERC-20 {#example-private-erc20}

我們使用一個具有初始私有時間的 ERC-20 合約範例。擁有者可以管理私有使用者，一開始只有這些使用者才被允許接收代幣。一旦經過特定時間，每個人都將被允許使用代幣。如果你很好奇，我們使用的是新版歐本齊柏林 (OpenZeppelin) 合約 v3 中的 [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) 掛鉤 (hook)。

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

你將會收到以下其中一個錯誤訊息：

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

由於我們使用的是新的 0.6 版 Solidity，我們必須為可以被覆寫的函式加上 `virtual` 關鍵字，並為執行覆寫的函式加上 override。所以讓我們將這些關鍵字加到這兩個 `isPublic` 函式中。

現在在你的單元測試中，你可以改用 `PrivateERC20Mock`。當你想測試私有使用時間內的行為時，請使用 `setIsPublic(false)`，同樣地，使用 `setIsPublic(true)` 來測試公開使用時間。當然，在我們的範例中，我們也可以直接使用[時間輔助工具 (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) 來相應地更改時間。但現在模擬的概念應該很清楚了，你可以想像在某些情境下，事情並不像單純推進時間那麼簡單。

## 模擬多個合約 {#mocking-many-contracts}

如果你必須為每個模擬建立另一個合約，情況可能會變得混亂。如果這對你造成困擾，你可以參考 [MockContract](https://github.com/gnosis/mock-contract) 函式庫。它允許你即時覆寫和更改合約的行為。然而，它僅適用於模擬對另一個合約的呼叫，因此它不適用於我們的範例。

## 模擬可以更強大 {#mocking-can-be-even-more-powerful}

模擬的強大之處不僅止於此。

- 新增函式：不僅覆寫特定函式很有用，單純新增額外的函式也很有幫助。對於代幣來說，一個很好的例子是增加一個額外的 `mint` 函式，允許任何使用者免費獲得新代幣。
- 在測試網中使用：當你在測試網上將合約與你的去中心化應用程式 (dapp) 一起部署和測試時，請考慮使用模擬版本。除非絕對必要，否則請避免覆寫函式。畢竟你想要測試的是真實邏輯。但是，例如新增一個重設函式可能會很有用，它可以簡單地將合約狀態重設回初始狀態，而無需重新部署。顯然，你不會希望在主網 (Mainnet) 合約中包含這個功能。