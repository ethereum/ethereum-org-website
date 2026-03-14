---
title: "Pectra 7702 操作指南"
description: "深入了解 Pectra 發行版的 7702"
lang: zh-tw
---

# Pectra 7702

## 概要 {#abstract}

EIP 7702 定義了一種向外部賬戶添加代碼的機制。 該提案允許以太坊外部賬戶獲得短期功能改進，從而提高應用程式的易用性。 此操作是透過設定指向已部署代碼的指標來實現，使用新的交易類型：4。

此新交易類型引入了一個授權清單。 清單中的每一個授權元組被定義為

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** 代表委派對象（已部署的位元組碼，將由外部帳戶使用）
**chain_id** 將授權鎖定至特定鏈（或設定為0代表所有鏈）
**nonce** 將授權鎖定至特定帳戶的隨機數
(**y_parity, r, s**) 為授權元組的簽名，定義為 keccak(0x05 || rlp ([chain_id ,address, nonce])) 運算結果，由該授權所屬的 EOA 私鑰（亦稱授權方）執行簽署

可透過將委派轉移至空地址來重置委派關係。

EOA 的私鑰在委派後仍對帳戶保有完全控制權。 例如，將權限委派給一個安全保管庫（Safe）並不會使該帳戶成為多重簽名帳戶，因為仍存在單一金鑰可繞過任何簽署政策。 今後，開發人員應以「系統中的任何參與者都可能成為智能合約」為前提進行設計。 對於智慧合約開發者而言，已不能再安全地假設 `tx.origin` 指涉的是 EOA。

## 最佳實踐 {#best-practices}

**帳戶抽象化**：委派合約應遵循以太坊更廣泛的帳戶（AA）標準，以實現最大程度的相容性。 特別是，它理想上應符合或相容於 ERC-4337 標準。

**無許可且抗審查的設計**：以太坊重視無許可參與。 委派合約禁止硬編碼或依賴任何單一「可信」中繼器或服務。 若中繼器離線，此操作將導致帳戶無法使用。 像批次處理（例如 approve+transferFrom）這類功能，EOA 本身就可以使用，不需中繼器。 對於希望使用 7702 啟用之進階功能（Gas 抽象化、隱私保護提款）的應用程式開發者，您需要一個中繼器。 雖然存在不同的中繼器結構，我們仍然推薦使用指向至少[entry point 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) 的 [4337 bundlers](https://www.erc4337.io/bundlers)，原因如下：

- 他們為中繼提供標準化的介面
- 包含内建的薪資支付系統
- 確保向前的兼容性
- 可透過[mempool公共記憶池](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)支援抗審查機制
- 可要求 init 函式只能從 [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) 呼叫

換言之，只要能提供該帳戶所需的有效簽名或 UserOperation，任何人都應能擔任交易發起人/中繼者。 這確保了抗審查性：若無需自建基礎設施，用戶的交易便無法被守門人中繼節點任意阻斷。 例如，[MetaMask 的委託工具包](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) 明確支援任何鏈上的 ERC-4337 捆綁器或支付管理員，而非僅限於 MetaMask 專屬伺服器。

通過錢包介面交互的去中心化應用程式：

鑑於錢包將針對EIP-7702將特定委託合約列入白名單，去中心化應用程式不應期望能直接請求7702授權。 相反地，整合應透過標準化的錢包介面實現：

- **ERC-5792 (`wallet_sendCalls`)**：允許去中心化應用程式要求錢包執行批次呼叫，從而實現交易批次處理與gas抽象等功能。

- **ERC-6900**：允許去中心化應用程式（dApps）透過錢包管理的模組，運用模組化智慧帳戶功能，例如會話密鑰與帳戶恢復機制。

透過運用這些介面，去中心化應用程式得以存取EIP-7702提供的智慧帳戶功能，無需直接管理委託關係，從而確保在不同錢包實作間的相容性與安全性。

> 註：目前尚無標準化方法供去中心化應用程式直接請求 7702 授權簽名。 去中心化應用程式必須依賴特定錢包介面（如 ERC-6900）才能運用 EIP-7702 的功能。

更多信息：

- [ERC-5792 規範](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [ERC-6900 規範](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**避免供應商鎖定**：基於上述原則，良好的實作應具備供應商中立性與互通性。 這通常意味著遵循智慧帳戶的新興標準。 例如，[Alchemy 的模組化帳戶](https://github.com/alchemyplatform/modular-account)採用 ERC-6900 標準打造模組化智慧帳戶，其設計理念著重於「無許可的互通性應用」。

**隱私保護**：儘管鏈上隱私存在限制，委託合約應致力於最小化數據暴露與關聯性。 這可透過支援諸如以下功能來實現：以 ERC-20 代幣支付 gas 費用（使用者無需維持公開的 ETH 余額，從而提升隱私性與使用者體驗），以及採用一次性會話密鑰（降低對單一長期密鑰的依賴）。 例如，EIP-7702 允許透過贊助交易使用代幣支付 gas 費用，而良好的實作方案將使整合此類支付方變得簡易，同時避免洩露超出必要範圍的資訊。 此外，透過鏈下委託處理特定核准流程（使用鏈上驗證的簽名），可減少使用者主金鑰涉及的鏈上交易次數，從而提升隱私保護。 需要使用中繼器的帳戶會迫使用戶揭露其IP位址。 公共記憶池改進了這一點：當一筆交易/用戶操作透過記憶池傳播時，你無法判斷它究竟是源自發送該交易的原始 IP，還是僅透過點對點協議中繼傳遞至該 IP。

**可擴展性與模組化安全性**：帳戶實作應具備可擴展性，使其能隨著新功能與安全性改進而持續演進。 EIP-7702 本質上具備可升級性（因為 EOA 始終能在未來將權限委派給新合約以升級其邏輯）。 除了可升級性之外，優秀的設計還能實現模組化——例如針對不同簽名方案或支出政策採用可插拔模組——而無需重新部署整個系統。 Alchemy 的帳戶套件便是絕佳範例，它允許開發者安裝驗證模組（適用於不同簽名類型，例如 ECDSA、BLS 等） 以及執行自訂邏輯的執行模組。 為使啟用 EIP-7702 的帳戶具備更高靈活性與安全性，開發者應優先將權限委派予代理合約，而非直接委派給特定實作方案。 此方法允許無縫升級與模組化，無需針對每次變更額外申請EIP-7702授權。

代理模式的優勢：

- **可升級性**：透過將代理指向新的實作合約來更新合約邏輯。

- **自訂初始化邏輯**：在代理程式內整合初始化函式，以安全方式設定必要的狀態變數。

例如，[SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) 展示了如何運用代理機制，在符合 EIP-7702 標準的帳戶中安全地初始化與管理委託操作。

代理模式之劣勢：

- **對外部行為者的依賴**：您必須仰賴外部團隊，才能避免升級至不安全的合約。

## 安全性考慮 {#security-considerations}

**再入保護機制**：隨著EIP-7702委託機制的引入，用戶帳戶可動態切換於外部擁有帳戶（EOA）與智慧合約（SC）之間。 這一靈活性使該帳戶既能發起交易，亦可成為呼叫的目標。 因此，當帳戶呼叫自身並執行外部呼叫時，`msg.sender` 將等於 `tx.origin`，這將破壞某些安全假設——這些假設原本依賴於 `tx.origin` 始終為外部帳戶（EOA）。

對於智慧合約開發者而言，已不能再安全地假設 `tx.origin` 指涉的是 EOA。 同樣地，使用 `msg.sender == tx.origin` 作為防範再入攻擊的保護措施，已不再是可靠的策略。

今後，開發人員應以「系統中的任何參與者都可能成為智能合約」為前提進行設計。 或者，他們可以採用帶有 `nonReentrant` 修飾符的模式，透過再入保護機制來實現明確的再入保護。 我們建議遵循經過稽核的修飾器，例如 [Open Zeppelin 的重入性保護機制](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol)。 他們也可以使用一個[暫存儲存變數](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html)。

**初始化安全性考量事項**

實施 EIP-7702 委託合約會帶來特定的安全性挑戰，尤其涉及初始化流程。 當初始化函式（`init`）與委派流程以原子性方式結合時，便會產生關鍵性漏洞。 在此類情況下，攻擊者可能截取委派簽名並以篡改的參數執行 `init` 函數，從而潛在取得帳戶控制權。

此風險在嘗試將現有智能合約帳戶（SCA）實作與EIP-7702結合使用時尤為關鍵，尤其當未修改其初始化機制時。

**緩解初始化漏洞的解決方案**

- 實作 `initWithSig` 函式  
  將標準的 `init` 函式替換為 `initWithSig` 函式，要求使用者對初始化參數簽署。 此方法確保初始化程序僅能在獲得明確使用者同意後方可進行，從而降低未經授權的初始化風險。

- 使用 ERC-4337 的 EntryPoint  
  要求初始化函式必須僅從 ERC-4337 EntryPoint 合約中呼叫。 此方法利用 ERC-4337 提供的標準化驗證與執行框架，為初始化流程增添額外的安全層級。  
  _(參見：[安全文件](https://docs.safe.global/advanced/eip-7702/7702-safe))_

透過採用這些解決方案，開發人員可強化EIP-7702委託合約的安全性，在初始化階段防範潛在的搶跑攻擊。

**儲存衝突**委派程式碼不會清除現有儲存空間。 當從一個委派合約遷移至另一個時，先前合約的殘留資料仍會保留。 若新合約使用相同的儲存槽位卻賦予其不同解讀，可能導致非預期行為。 例如，若初始委託的合約中儲存槽位代表 `bool` 類型，而後續委託的合約中相同槽位代表 `uint` 類型，此類不匹配情況可能導致不可預測的結果。

**網路釣魚風險**隨著EIP-7702委託機制的實施，用戶帳戶中的資產可能完全由智能合約掌控。 若用戶在不知情的情況下將帳戶授權給惡意合約，攻擊者便能輕易取得控制權並竊取資金。 使用 `chain_id=0` 時，委派會套用於所有鏈 ID。 僅將權限委派給不可變契約（切勿委派給代理契約），且僅限於使用 CREATE2 部署的契約（採用標準初始化程式碼，不包含變形契約），如此部署者便無法將不同內容部署至相同地址的其他位置。 否則您的授權將使您的帳戶在所有其他 EVM 鏈上面臨風險。

當用戶執行委託簽署時，接收委託的目標合約應以清晰醒目的方式顯示，以協助降低釣魚攻擊風險。

**最小信任表面與安全性**：在提供靈活性的同時，委託合約應保持其核心邏輯簡潔且可稽核。 該合約實質上是使用者外部帳戶（EOA）的延伸，因此任何缺陷都可能造成災難性後果。 實施方案應遵循智能合約安全社群的最佳實踐。 例如，構造函式或初始化函式必須經過嚴密防護——正如 Alchemy 所強調的，若在 7702 協定下使用代理模式，未受保護的初始化函式可能讓攻擊者取得帳戶控制權。 團隊應致力於保持鏈上代碼的簡潔性：Ambire 的 7702 合約僅使用約 200 行 Solidity 代碼，刻意降低複雜度以減少錯誤。 必須在功能豐富的邏輯與便於稽核的簡潔性之間取得平衡。

### 已知實施方案 {#known-implementations}

基於 EIP 7702 的特性，建議錢包在協助用戶將權限委派給第三方合約時務必謹慎行事。 以下是經稽核之已知實現方案清單：

| 合約地址                                       | 來源                                                                                                                            | 審核                                                                                                                                                        |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                         | [稽核](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                             | [稽核](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol) | [稽核](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                       | [稽核](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Ethereum Foundation AA team](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol)  | [稽核](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                         | [稽核](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## 硬體錢包指南 {#hardware-wallet-guidelines}

硬體錢包不應允許任意授權。 硬體錢包領域的共識是採用一份可信委託合約清單。 我們建議允許上述已知的實作方案，並針對其他方案逐案審核。 由於將您的 EOA 委派給合約將賦予對所有資產的控制權，硬體錢包在實作 7702 時應保持謹慎。

### 伴隨應用程式的整合情境 {#integration-scenarios-for-companion-apps}

#### 懶惰 {#lazy}

由於EOA仍照常運作，無需採取任何行動。

注意：部分資產可能因委託代碼而遭自動拒絕，例如 ERC 1155 NFT，支援團隊應知悉此情況。

#### 覺知 {#aware}

檢查該外部帳戶（EOA）的代碼，通知使用者該帳戶已設定委派關係，並可選擇性提供移除委派的選項。

#### 常規委派 {#common-delegation}

硬體供應商將已知的委派合約列入白名單，並在軟體伴侶中實現對其的支援。 建議選擇具備完整 ERC 4337 支援的合約。

委派給不同個體的外部賬戶將會被當作標準賬戶處理。

#### 自訂委派 {#custom-delegation}

硬體供應商實施其專屬的委派合約，並將其加入清單，同時在軟體伴侶中實現其支援功能。

委派給不同個體的外部賬戶將會被當作標準賬戶處理。
