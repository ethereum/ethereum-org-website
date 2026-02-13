---
title: "代幣整合清單"
description: "與代幣互動時應考量的事項清單"
author: "Trailofbits"
lang: zh-tw
tags: [ "穩固", "智能合約", "安全性", "代幣" ]
skill: intermediate
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

與任意代幣互動時，請遵循此清單。 請確保您瞭解各個項目的相關風險，並為這些規則的任何例外情況提供正當理由。

為方便起見，所有 Slither [公用程式](https://github.com/crytic/slither#tools) 都可以直接在代幣地址上執行，例如：

[使用 Slither 教學](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

為遵循此清單，您會需要取得 Slither 對代幣的此輸出：

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # 需要設定，並使用 Echidna 和 Manticore
```

## 一般考量事項 {#general-considerations}

- \*\*合約經過安全性審查。\*\*避免與缺乏安全性審查的合約互動。 檢查評估的篇幅 (也稱為「工作量」)、安全性公司的聲譽，以及發現結果的數量和嚴重性。
- \*\*您已聯絡開發人員。\*\*您可能需要就事件提醒他們的團隊。 在 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) 上尋找適當的聯絡人。
- \*\*他們有重要公告的安全性郵寄清單。\*\*他們的團隊應該通知像您一樣的使用者 在發現嚴重問題或進行升級時。

## ERC 合規性 {#erc-conformity}

Slither 包含一個公用程式 [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)，可以審查代幣對許多相關 ERC 標準的合規性。 使用 slither-check-erc 審查以下內容：

- \*\*Transfer 和 transferFrom 傳回布林值。\*\*有些代幣在這些函數上不會傳回布林值。 因此，它們在合約中的呼叫可能會失敗。
- \*\*如果使用，名稱、小數位和符號函數會存在。\*\*這些函數在 ERC20 標準中是選用的，可能不存在。
- \*\*小數位傳回 uint8。\*\*有些代幣會不正確地傳回 uint256。 如果發生這種情況，請確保傳回的值小於 255。
- \*\*代幣緩解了已知的 [ERC20 競爭條件](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)。\*\*ERC20 標準有一個已知的 ERC20 競爭條件，必須加以緩解，以防止攻擊者竊取代幣。
- \*\*代幣不是 ERC777 代幣，且在 transfer 和 transferFrom 中沒有外部函數呼叫。\*\*transfer 函數中的外部呼叫可能導致重入。

Slither 包含一個公用程式 [slither-prop](https://github.com/crytic/slither/wiki/Property-generation)，可以產生單元測試和安全性屬性，從而發現許多常見的 ERC 缺陷。 使用 slither-prop 審查以下內容：

- \*\*合約通過 slither-prop 的所有單元測試和安全性屬性。\*\*執行產生的單元測試，然後使用 [Echidna](https://github.com/crytic/echidna) 和 [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html) 檢查屬性。

最後，有些特性難以自動識別。 手動審查這些條件：

- \*\*Transfer 和 transferFrom 不應收取費用。\*\*緊縮代幣可能導致非預期的行為。
- \*\*從代幣賺取的潛在利息已納入考量。\*\*有些代幣會將利息分配給代幣持有者。 如果沒有納入考量，此利息可能會被困在合約中。

## 合約組成 {#contract-composition}

- \*\*合約避免了不必要的複雜性。\*\*代幣應該是簡單的合約；程式碼複雜的代幣需要更高標準的審查。 使用 Slither 的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) 來識別複雜的程式碼。
- \*\*合約使用 SafeMath。\*\*不使用 SafeMath 的合約需要更高標準的審查。 手動檢查合約的 SafeMath 使用情況。
- \*\*合約只有少數與代幣無關的函數。\*\*與代幣無關的函數會增加合約中出現問題的可能性。 使用 Slither 的 [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) 來大致審查合約中使用的程式碼。
- \*\*代幣只有一個地址。\*\*具有多個餘額更新進入點的代幣可能會破壞基於地址的內部記帳 (例如，`balances[token_address][msg.sender]` 可能無法反映實際餘額)。

## 擁有者權限 {#owner-privileges}

- \*\*代幣不可升級。\*\*可升級合約的規則可能會隨時間改變。 使用 Slither 的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) 來判斷合約是否可升級。
- \*\*擁有者具有有限的鑄造能力。\*\*惡意或受危害的擁有者可能會濫用鑄造能力。 使用 Slither 的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) 來審查鑄造能力，並考慮手動審查程式碼。
- \*\*代幣不可暫停。\*\*惡意或受危害的擁有者可能會讓依賴可暫停代幣的合約陷入困境。 手動識別可暫停的程式碼。
- \*\*擁有者無法將合約列入黑名單。\*\*惡意或受危害的擁有者可能會讓依賴具有黑名單的代幣的合約陷入困境。 手動識別黑名單功能。
- \*\*代幣背後的團隊是已知的，可以對濫用行為負責。\*\*具有匿名開發團隊或位於法律避風港的合約應需要更高標準的審查。

## 代幣稀有性 {#token-scarcity}

審查代幣稀有性問題需要手動審查。 檢查以下條件：

- \*\*沒有使用者擁有大部分供應量。\*\*如果少數使用者擁有大部分代幣，他們可以根據代幣的重新分配來影響營運。
- \*\*總供應量充足。\*\*總供應量低的代幣容易被操縱。
- \*\*代幣分散在多個交易所。\*\*如果所有代幣都在一個交易所，該交易所的危害可能會危害到依賴該代幣的合約。
- \*\*使用者瞭解大額資金或閃電貸的相關風險。\*\*依賴代幣餘額的合約必須仔細考慮擁有大額資金的攻擊者或透過閃電貸的攻擊。
- **代幣不允許閃電鑄造**。 閃電鑄造可能導致餘額和總供應量的巨大波動，這使得在代幣操作中必須進行嚴格且全面的溢位檢查。
