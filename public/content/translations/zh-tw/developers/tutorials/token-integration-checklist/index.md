---
title: 代幣整合檢查清單
description: 與代幣互動時應考慮的事項檢查清單
author: "Trailofbits"
lang: zh-tw
tags: ["solidity", "智能合約", "安全性", "代幣"]
skill: intermediate
breadcrumb: 代幣整合
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

與任意代幣互動時，請遵循此檢查清單。確保你了解每個項目相關的風險，並為這些規則的任何例外情況提出合理說明。

為了方便起見，所有斯立瑟 (Slither) [實用程式](https://github.com/crytic/slither#tools)都可以直接在代幣地址上執行，例如：

[使用斯立瑟教學](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

要遵循此檢查清單，你會需要斯立瑟針對該代幣輸出的以下結果：

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # 要求配置，並使用埃奇德納與曼蒂科爾
```

## 一般注意事項 {#general-considerations}

- **合約已通過安全性審查。** 避免與缺乏安全性審查的合約互動。檢查評估的時間長度（又稱「投入程度」）、安全公司的聲譽，以及發現問題的數量與嚴重程度。
- **你已聯絡開發人員。** 你可能需要向他們的團隊通報事件。請在 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) 上尋找合適的聯絡人。
- **他們有針對重大公告的安全性郵件清單。** 當發現重大問題或進行升級時，他們的團隊應該通知使用者（例如你！）。

## ERC 合規性 {#erc-conformity}

斯立瑟包含一個實用程式 [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)，用於審查代幣是否符合許多相關的 ERC 標準。使用 slither-check-erc 來審查以下內容：

- **轉帳 (transfer) 與 transferFrom 會回傳布林值。** 有些代幣在這些函式上不會回傳布林值。這可能導致合約中呼叫這些函式時失敗。
- **如果使用了 name、decimals 和 symbol 函式，則它們必須存在。** 這些函式在 ERC-20 標準中是選用的，可能不存在。
- **decimals 回傳 uint8。** 有些代幣會錯誤地回傳 uint256。如果是這種情況，請確保回傳的值低於 255。
- **代幣緩解了已知的 [ERC-20 競爭危害 (race condition)](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)。** ERC-20 標準有一個已知的 ERC-20 競爭危害，必須加以緩解以防止攻擊者竊取代幣。
- **該代幣不是 ERC-777 代幣，且在轉帳 (transfer) 與 transferFrom 中沒有外部函式呼叫。** 轉帳函式中的外部呼叫可能會導致重入 (reentrancy) 攻擊。

斯立瑟包含一個實用程式 [slither-prop](https://github.com/crytic/slither/wiki/Property-generation)，可產生單元測試與安全性屬性，從而發現許多常見的 ERC 缺陷。使用 slither-prop 來審查以下內容：

- **合約通過了 slither-prop 的所有單元測試與安全性屬性。** 執行產生的單元測試，然後使用 [埃奇德納](https://github.com/crytic/echidna) 與 [曼蒂科爾](https://manticore.readthedocs.io/en/latest/verifier.html) 檢查屬性。

最後，有些特徵很難自動識別。請手動審查以下情況：

- **轉帳 (transfer) 與 transferFrom 不應收取費用。** 通縮型代幣可能會導致非預期的行為。
- **已將代幣可能賺取的利息納入考量。** 有些代幣會向代幣持有者分配利息。如果未將其納入考量，這些利息可能會被困在合約中。

## 合約組成 {#contract-composition}

- **合約避免了不必要的複雜性。** 代幣應該是一個簡單的合約；程式碼複雜的代幣需要更高標準的審查。使用斯立瑟的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) 來識別複雜的程式碼。
- **合約使用了 SafeMath。** 未使用 SafeMath 的合約需要更高標準的審查。請手動檢查合約中 SafeMath 的使用情況。
- **合約只有少數與代幣無關的函式。** 與代幣無關的函式會增加合約出現問題的可能性。使用斯立瑟的 [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) 來廣泛審查合約中使用的程式碼。
- **代幣只有一個地址。** 具有多個餘額更新入口點的代幣可能會破壞基於地址的內部記帳（例如，`balances[token_address][msg.sender]` 可能無法反映實際餘額）。

## 擁有者權限 {#owner-privileges}

- **代幣不可升級。** 可升級的合約可能會隨著時間改變其規則。使用斯立瑟的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) 來判斷合約是否可升級。
- **擁有者的鑄造能力受到限制。** 惡意或遭入侵的擁有者可能會濫用鑄造能力。使用斯立瑟的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) 來審查鑄造能力，並考慮手動審查程式碼。
- **代幣不可暫停。** 惡意或遭入侵的擁有者可能會困住依賴可暫停代幣的合約。請手動識別可暫停的程式碼。
- **擁有者無法將合約列入黑名單。** 惡意或遭入侵的擁有者可能會困住依賴具有黑名單功能代幣的合約。請手動識別黑名單功能。
- **代幣背後的團隊是公開的，且能對濫用行為負責。** 由匿名開發團隊開發或位於法律避風港的合約，應要求更高標準的審查。

## 代幣稀缺性 {#token-scarcity}

審查代幣稀缺性問題需要手動進行。請檢查以下情況：

- **沒有單一使用者擁有大部分的供應量。** 如果少數使用者擁有大部分的代幣，他們可以根據代幣的重新分配來影響營運。
- **總供應量充足。** 總供應量低的代幣很容易被操縱。
- **代幣分佈在多個交易所中。** 如果所有代幣都在同一個交易所，該交易所遭到入侵可能會危及依賴該代幣的合約。
- **使用者了解大額資金或閃電貸的相關風險。** 依賴代幣餘額的合約必須仔細考量擁有大額資金的攻擊者或透過閃電貸進行的攻擊。
- **代幣不允許閃電鑄造。** 閃電鑄造可能會導致餘額與總供應量大幅波動，這需要在代幣的運作中進行嚴格且全面的溢位檢查。