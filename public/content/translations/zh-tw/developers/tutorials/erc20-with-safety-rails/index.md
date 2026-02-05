---
title: 帶有安全措施的 ERC-20
description: 如何幫助人們避免愚蠢的錯誤
author: 作者：Ori Pomerantz
lang: zh-tw
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## 介紹 {#introduction}

以太坊的一大優點是沒有中央機構可以修改或撤銷您的交易。 以太坊的一大問題是沒有中央機構有權力撤銷使用者錯誤或非法交易。 在本文中，您將了解使用者在使用 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代幣時常犯的一些錯誤，以及如何創建 ERC-20 合約來幫助使用者避免這些錯誤，或賦予中央機構某些權力（例如凍結帳戶）。

請注意，雖然我們將使用 [OpenZeppelin ERC-20 代幣合約](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)，但本文不會詳細解釋它。 您可以在[此處](/developers/tutorials/erc20-annotated-code)找到此資訊。

如果您想查看完整的原始碼：

1. 開啟 [Remix IDE](https://remix.ethereum.org/)。
2. 點擊複製 github 圖示 (![clone github icon](icon-clone.png))。
3. 複製 github 儲存庫 `https://github.com/qbzzt/20220815-erc20-safety-rails`。
4. 開啟 **contracts > erc20-safety-rails.sol**。

## 建立 ERC-20 合約 {#creating-an-erc-20-contract}

在新增安全措施功能之前，我們需要一個 ERC-20 合約。 在本文中，我們將使用 [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard)。 在另一個瀏覽器中開啟它，並按照以下說明操作：

1. 選擇 **ERC20**。

2. 輸入以下設定：

   | 參數      | 數值               |
   | ------- | ---------------- |
   | 名稱      | SafetyRailsToken |
   | 符號      | SAFE             |
   | Premint | 1000             |
   | 功能      | 無                |
   | 存取控制    | Ownable          |
   | 可升級性    | 無                |

3. 向上捲動並點擊 **在 Remix 中開啟** (適用於 Remix) 或 **下載** 以使用不同的環境。 我將假設您正在使用 Remix，如果您使用其他工具，請進行相應的變更。

4. 我們現在有了一個功能齊全的 ERC-20 合約。 您可以展開 `.deps` > `npm` 以查看匯入的程式碼。

5. 編譯、部署並操作合約，以確認它能作為 ERC-20 合約運作。 如果您需要學習如何使用 Remix，請[使用此教學](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)。

## 常見錯誤 {#common-mistakes}

### 錯誤 {#the-mistakes}

使用者有時會將代幣傳送到錯誤的地址。 雖然我們無法讀懂他們的心思來了解他們想做什麼，但有兩種經常發生且易於偵測的錯誤類型：

1. 將代幣傳送到合約自己的地址。 例如，[Optimism 的 OP 代幣](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) 在不到兩個月的時間裡累積了[超過 120,000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) 個 OP 代幣。 這代表著一筆巨大的財富，推測是人們剛剛損失的。

2. 將代幣傳送到一個空地址，該地址不對應於[外部擁有帳戶](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)或[智能合約](/developers/docs/smart-contracts)。 雖然我沒有關於這種情況發生頻率的統計數據，但[一次事件可能造成 20,000,000 個代幣的損失](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)。

### 防止轉帳 {#preventing-transfers}

OpenZeppelin ERC-20 合約包含一個[掛鉤 `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)，它在代幣轉移之前被調用。 預設情況下，這個掛鉤不做任何事情，但我們可以在其上掛載自己的功能，例如在出現問題時回復的檢查。

要使用此掛鉤，請在建構函式後新增此函式：

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

如果您對 Solidity 不太熟悉，此函式的某些部分可能對您來說是新的：

```solidity
        internal virtual
```

`virtual` 關鍵字表示，正如我們從 `ERC20` 繼承功能並覆寫此函式一樣，其他合約也可以從我們這裡繼承並覆寫此函式。

```solidity
        override(ERC20)
```

我們必須明確指定我們正在[覆寫](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) `_beforeTokenTransfer` 的 ERC20 代幣定義。 一般來說，從安全角度來看，明確的定義比隱含的定義好得多——如果事情就在您眼前，您就不會忘記您做了什麼。 這也是我們需要指定我們正在覆寫哪個父類的 `_beforeTokenTransfer` 的原因。

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

此行調用我們從其繼承的合約中擁有 `_beforeTokenTransfer` 函式的函式。 在這種情況下，只有 `ERC20` 有這個掛鉤，`Ownable` 沒有。 儘管目前 `ERC20._beforeTokenTransfer` 不做任何事情，我們還是調用它，以防將來新增功能（然後我們決定重新部署合約，因為合約在部署後不會改變）。

### 編寫要求 {#coding-the-requirements}

我們希望向函式新增這些要求：

- `to` 地址不能等於 `address(this)`，即 ERC-20 合約本身的地址。
- `to` 地址不能為空，它必須是：
  - 一個外部擁有帳戶 (EOA)。 我們無法直接檢查一個地址是否為 EOA，但我們可以檢查一個地址的 ETH 餘額。 EOA 幾乎總是有餘額，即使它們不再使用——很難將它們清零到最後一個 wei。
  - 一個智能合約。 測試一個地址是否為智能合約有點困難。 有一個檢查外部程式碼長度的 opcode，稱為 [`EXTCODESIZE`](https://www.evm.codes/#3b)，但它在 Solidity 中不能直接使用。 我們必須為此使用 [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)，它是一種 EVM 組合語言。 我們可以使用 Solidity 中的其他值（[`<address>.code` 和 `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)），但它們的成本更高。

讓我們逐行查看新的程式碼：

```solidity
        require(to != address(this), "不能將代幣傳送到合約地址");
```

這是第一個要求，檢查 `to` 和 `this(address)` 是否不是同一個東西。

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

這是我們檢查一個地址是否為合約的方式。 我們無法直接從 Yul 接收輸出，因此我們定義一個變數來儲存結果（在本例中為 `isToContract`）。 Yul 的工作方式是每個 opcode 都被視為一個函式。 所以首先我們調用 [`EXTCODESIZE`](https://www.evm.codes/#3b) 來獲取合約大小，然後使用 [`GT`](https://www.evm.codes/#11) 來檢查它是否不為零（我們處理的是無符號整數，所以它當然不能是負數）。 然後我們將結果寫入 `isToContract`。

```solidity
        require(to.balance != 0 || isToContract, "不能將代幣傳送到空地址");
```

最後，我們有了對空地址的實際檢查。

## 管理員存取權 {#admin-access}

有時，有一個可以撤銷錯誤的管理員是很有用的。 為了減少濫用的可能性，這個管理員可以是一個[多重簽名](https://blog.logrocket.com/security-choices-multi-signature-wallets/)，這樣就需要多個人同意一項操作。 在本文中，我們將介紹兩種管理功能：

1. 凍結和解凍帳戶。 這很有用，例如，當一個帳戶可能被盜用時。
2. 資產清理。

   有時，詐騙者會將欺詐性代幣傳送到真實代幣的合約中以獲得合法性。 例如，[請看這裡](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)。 合法的 ERC-20 合約是 [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042)。 冒充它的詐騙是 [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe)。

   人們也可能錯誤地將合法的 ERC-20 代幣傳送到我們的合約中，這也是我們希望有辦法將它們取出的另一個原因。

OpenZeppelin 提供了兩種啟用管理員存取權的機制：

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) 合約只有一個擁有者。 具有 `onlyOwner` [修飾符](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)的函式只能由該擁有者調用。 擁有者可以將所有權轉讓給其他人或完全放棄。 所有其他帳戶的權利通常是相同的。
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) 合約具有[基於角色的存取控制 (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)。

為簡單起見，本文我們使用 `Ownable`。

### 凍結和解凍合約 {#freezing-and-thawing-contracts}

凍結和解凍合約需要進行幾項變更：

- 一個從地址到[布林值](https://en.wikipedia.org/wiki/Boolean_data_type)的[對應](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)，用於追蹤哪些地址被凍結。 所有值最初都為零，對於布林值，這被解釋為 false。 這就是我們想要的，因為預設情況下帳戶是未凍結的。

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- 當帳戶被凍結或解凍時，使用[事件](https://www.tutorialspoint.com/solidity/solidity_events.htm)通知任何感興趣的人。 從技術上講，這些操作不需要事件，但它有助於鏈外程式碼能夠監聽這些事件並了解正在發生的事情。 當發生可能與他人相關的事情時，智能合約發出事件被認為是一種良好的習慣。

  事件被索引，因此可以搜尋帳戶被凍結或解凍的所有次數。

  ```solidity
    // 當帳戶被凍結或解凍時
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- 用於凍結和解凍帳戶的函式。 這兩個函式幾乎相同，所以我們只會介紹凍結函式。

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  標記為 [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) 的函式可以從其他智能合約或直接透過交易調用。

  ```solidity
    {
        require(!frozenAccounts[addr], "帳戶已凍結");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  如果帳戶已凍結，則回復。 否則，凍結它並 `emit` 一個事件。

- 變更 `_beforeTokenTransfer` 以防止資金從凍結帳戶中移出。 請注意，資金仍然可以轉入凍結帳戶。

  ```solidity
       require(!frozenAccounts[from], "帳戶已凍結");
  ```

### 資產清理 {#asset-cleanup}

要釋放此合約持有的 ERC-20 代幣，我們需要調用它們所屬代幣合約上的一個函式，可以是 [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) 或 [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)。 在這種情況下，在授權上浪費 Gas 是沒有意義的，我們不如直接轉帳。

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

這是我們在收到地址時為合約建立物件的語法。 我們可以這樣做，因為我們的原始碼中包含了 ERC20 代幣的定義（參見第 4 行），並且該檔案包含了 [IERC20 的定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)，這是 OpenZeppelin ERC-20 合約的介面。

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

這是一個清理函式，所以我們大概不希望留下任何代幣。 與其手動從使用者那裡獲取餘額，我們不如自動化這個過程。

## 結論 {#conclusion}

這不是一個完美的解決方案——對於「使用者犯錯」這個問題，沒有完美的解決方案。 然而，使用這類檢查至少可以防止一些錯誤。 凍結帳戶的能力雖然危險，但可以用來限制某些駭客攻擊的損害，方法是拒絕駭客竊取資金。

[在此查看我的更多作品](https://cryptodocguy.pro/)。
