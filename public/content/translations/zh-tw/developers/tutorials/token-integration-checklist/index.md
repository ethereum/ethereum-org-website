---
title: "代幣整合檢查清單"
description: "與代幣互動時應考慮的事項檢查清單"
author: "Trailofbits"
lang: zh-tw
tags: ["Solidity", "智能合約", "安全性", "代幣"]
skill: intermediate
breadcrumb: "代幣整合"
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

與任意代幣互動時，請遵循此檢查清單。確保你了解每個項目相關的風險，並為這些規則的任何例外情況提出合理理由。

為了方便起見，所有 Slither [公用程式](https://github.com/crytic/slither#tools)都可以直接在代幣地址上執行，例如：

[使用 Slither 教學](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

從 Etherscan 擷取經過驗證的原始碼需要 [Etherscan API 金鑰](https://docs.etherscan.io/set-up-your-api-key)（免費金鑰即可）。透過 `--etherscan-apikey` 傳遞它，或設定 `ETHERSCAN_API_KEY` 環境變數，Slither 也會讀取該變數：

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

如果沒有金鑰，命令將會失敗並顯示 `Invalid etherscan API Key` 錯誤。

要遵循此檢查清單，你會需要 Slither 針對該代幣提供以下輸出：

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # 要求設定，並使用 Echidna
```

## 一般注意事項 {#general-considerations}

- **合約已通過安全性審查。** 避免與缺乏安全性審查的合約互動。檢查評估的時間長度（又稱「投入程度」）、安全公司的聲譽，以及發現問題的數量與嚴重程度。
- **你已聯絡開發人員。** 你可能需要向他們的團隊通報事件。請在 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) 上尋找合適的聯絡人。
- **他們有針對重大公告的安全性郵件清單。** 當發現重大問題或進行升級時，他們的團隊應該通知使用者（例如你！）。

## ERC 一致性 {#erc-conformity}

Slither 包含一個公用程式 [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)，可審查代幣是否符合許多相關的 ERC 標準。使用 slither-check-erc 來審查：

- **Transfer 和 transferFrom 回傳布林值。** 有些代幣在這些函式上不會回傳布林值。因此，合約中對它們的呼叫可能會失敗。
- **如果使用了 name、decimals 和 symbol 函式，它們必須存在。** 這些函式在 ERC-20 標準中是選用的，可能不存在。
- **Decimals 回傳 uint8。** 有些代幣錯誤地回傳 uint256。如果是這種情況，請確保回傳的值低於 255。
- **代幣緩解了已知的 [ERC-20 競爭危害 (race condition)](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)。** ERC-20 標準有一個已知的 ERC-20 競爭危害，必須加以緩解以防止攻擊者竊取代幣。
- **代幣不是 ERC-777 代幣，且在 transfer 和 transferFrom 中沒有外部函式呼叫。** 轉帳函式中的外部呼叫可能會導致重入攻擊。

Slither 包含一個公用程式 [slither-prop](https://github.com/crytic/slither/wiki/Property-generation)，可產生單元測試和安全性屬性，從而發現許多常見的 ERC 缺陷。使用 slither-prop 來審查：

- **合約通過了 slither-prop 的所有單元測試和安全性屬性。** 執行產生的單元測試，然後使用 [Echidna](https://github.com/crytic/echidna) 檢查屬性。

最後，有些特徵很難自動識別。請手動審查這些情況：

- **Transfer 和 transferFrom 不應收取費用。** 通縮型代幣可能會導致非預期的行為。
- **已將代幣可能賺取的利息納入考量。** 有些代幣會向代幣持有者分配利息。如果未將其納入考量，這些利息可能會被困在合約中。

## 合約組成 {#contract-composition}

- **合約避免了不必要的複雜性。** 代幣應該是一個簡單的合約；程式碼複雜的代幣需要更高標準的審查。使用 Slither 的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) 來識別複雜的程式碼。
- **合約使用經過檢查的算術運算。** Solidity 0.8 及更高版本預設會在溢位和下溢時回滾；較舊的合約需要 SafeMath 來提供相同的保護。使用較舊版本編譯且沒有 SafeMath 的合約，或使用 `unchecked` 區塊的合約，需要更高標準的審查。請手動檢查算術運算，特別是在 `unchecked` 區塊和行內組合語言 (inline assembly) 中。
- **合約只有少數與代幣無關的函式。** 與代幣無關的函式會增加合約出現問題的可能性。使用 Slither 的 [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) 來廣泛審查合約中使用的程式碼。
- **代幣只有一個地址。** 具有多個餘額更新進入點的代幣可能會破壞基於地址的內部記帳（例如，`balances[token_address][msg.sender]` 可能無法反映實際餘額）。

## 擁有者權限 {#owner-privileges}

- **代幣不可升級。** 可升級的合約可能會隨著時間改變其規則。使用斯立瑟的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) 來判斷合約是否可升級。
- **擁有者的鑄造能力受到限制。** 惡意或遭入侵的擁有者可能會濫用鑄造能力。使用斯立瑟的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) 來審查鑄造能力，並考慮手動審查程式碼。
- **代幣不可暫停。** 惡意或遭入侵的擁有者可能會困住依賴可暫停代幣的合約。請手動識別可暫停的程式碼。
- **擁有者無法將合約列入黑名單。** 惡意或遭入侵的擁有者可能會困住依賴具有黑名單功能代幣的合約。請手動識別黑名單功能。
- **代幣背後的團隊是公開的，且能對濫用行為負責。** 由匿名開發團隊開發或位於法律避風港的合約，應要求更高標準的審查。

## 代幣稀缺性 {#token-scarcity}

審查代幣稀缺性問題需要手動審查。請檢查以下情況：

- **沒有使用者擁有大部分的供應量。** 如果少數使用者擁有大部分的代幣，他們可以根據代幣的重新分配來影響營運。
- **總供應量充足。** 總供應量低的代幣很容易被操縱。
- **代幣分佈在多個交易所。** 如果所有代幣都在同一個交易所，該交易所遭到入侵可能會危及依賴該代幣的合約。
- **使用者了解大額資金或閃電貸的相關風險。** 依賴代幣餘額的合約必須仔細考量擁有大額資金的攻擊者或透過閃電貸進行的攻擊。
- **代幣不允許閃電鑄造。** 閃電鑄造可能會導致餘額和總供應量大幅波動，這需要在代幣的運作中進行嚴格且全面的溢位檢查。
## 已知的非標準 ERC-20 代幣 {#known-non-standard-erc20-tokens}

允許與任意代幣整合的協定必須小心妥善處理某些著名的非標準 ERC-20 代幣。請參閱[非標準代幣清單](https://secure-contracts.com/development-guidelines/non-standard-tokens.html)，了解帶有額外風險的著名代幣。

## ERC-721 代幣 {#erc721-tokens}

### ERC-721 一致性檢查 {#erc721-conformity-checks}

某些合約的行為可能與原始 ERC 規範不同。請手動審查以下情況：

- **將代幣轉帳至 0x0 地址會回滾。** 有些代幣允許轉帳至 0x0，並將發送到該地址的代幣視為已銷毀；然而，ERC-721 標準要求此類轉帳必須回滾。
- **`safeTransferFrom` 函式使用正確的簽章實作。** 有些代幣合約並未實作這些函式。將 NFT 轉帳至這些合約之一可能會導致資產遺失。
- **如果使用了 `name`、`decimals` 和 `symbol` 函式，它們必須存在。** 這些函式在 ERC-721 標準中是選用的，可能不存在。
- **如果使用了 `decimals`，它會回傳 `uint8(0)`。** 其他值都是無效的。
- **`name` 和 `symbol` 函式可以回傳空字串。** 標準允許這種行為。
- **如果 `tokenId` 無效或指向已銷毀的代幣，`ownerOf` 函式會回滾。** 該函式不能回傳 0x0。這是標準所要求的行為，但可能並不總是正確實作。
- **NFT 的轉帳會清除其授權。** 這是標準所要求的。
- **NFT 的代幣 ID 在其生命週期內無法更改。** 這是標準所要求的。

### ERC-721 標準的常見風險 {#common-risks-of-the-erc721-standard}

透過手動審查以下情況，緩解與 ERC-721 合約相關的風險：

- **已將 `onERC721Received` 回呼 (callback) 納入考量。** 轉帳函式中的外部呼叫可能會導致重入攻擊，特別是當回呼不明確時（例如在 [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code) 呼叫中）。
- **鑄造 NFT 時，它會安全地轉帳至智能合約。** 如果存在鑄造函式，其行為應類似於 `safeTransferFrom`，並妥善處理將新代幣鑄造至智能合約的過程，以防止資產遺失。
- **銷毀代幣會清除其授權。** 如果存在銷毀函式，它應該清除代幣先前的授權。
