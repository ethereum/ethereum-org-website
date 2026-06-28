---
title: 佩克特拉 7702
metaTitle: 佩克特拉 7702 指南
description: 了解更多關於佩克特拉版本中的 7702
lang: zh-tw
---

## 摘要 {#abstract}

EIP-7702 定義了一種將程式碼新增至 EOA 的機制。此提案允許 EOA（傳統的以太坊帳戶）獲得短期的功能改進，從而提高應用程式的可用性。這是透過使用新的交易類型 4，設定一個指向已部署程式碼的指標來完成的。

這個新的交易類型引入了一個授權清單。清單中的每個授權元組定義為

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** 是委託（EOA 將使用的已部署位元組碼）
**chain_id** 將授權鎖定到特定鏈（或 0 表示所有鏈）
**nonce** 將授權鎖定到特定帳戶隨機數
(**y_parity, r, s**) 是授權元組的簽章，定義為由適用該授權的 EOA（也稱為授權機構）的私鑰對 keccak(0x05 || rlp ([chain_id ,address, nonce])) 進行簽署

可以透過委託給空地址來重設委託。

EOA 的私鑰在委託後保留對帳戶的完全控制權。例如，委託給 Safe 並不會使帳戶變成多方簽名，因為仍然有一個單一金鑰可以繞過任何簽署策略。展望未來，開發人員在設計時應假設系統中的任何參與者都可能是智能合約。對於智能合約開發人員來說，假設 `tx.origin` 指的是 EOA 已經不再安全。

## 最佳實踐 {#best-practices}

**帳戶抽象化**：委託合約應與以太坊更廣泛的帳戶抽象化 (AA) 標準保持一致，以最大化相容性。特別是，它最好符合或相容於 ERC-4337。

**無需許可與抗審查設計**：以太坊重視無需許可的參與。委託合約絕不能硬編碼或依賴任何單一的「受信任」中繼者或服務。如果中繼者離線，這將導致帳戶無法使用。像批次處理（例如授權 (approve) + transferFrom）這樣的功能可以由 EOA 本身使用，而無需中繼者。對於想要使用由 7702 啟用的進階功能（燃料抽象化、保護隱私的提款）的應用程式開發人員，您將需要一個中繼者。雖然有不同的中繼者架構，但我們的建議是使用指向至少 [entry point 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) 的 [4337 捆綁器](https://www.erc4337.io/bundlers)，因為：

- 它們提供了標準化的中繼介面
- 包含內建的代付合約系統
- 確保向前相容性
- 可以透過[公共記憶體池](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)支援抗審查性
- 可以要求 init 函式只能從 [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) 呼叫

換句話說，只要提供來自帳戶所需的有效簽章或用戶操作 (UserOperation)，任何人都可以充當交易贊助者/中繼者。這確保了抗審查性：如果不需要自訂基礎設施，使用者的交易就不會被守門的中繼者任意阻擋。例如，[梅塔馬斯克的 Delegation Toolkit](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) 明確支援任何鏈上的任何 ERC-4337 捆綁器或代付合約，而不是要求使用梅塔馬斯克專用的伺服器。

**透過錢包介面整合去中心化應用程式 (dapp)**：

鑑於錢包會將特定的 EIP-7702 委託合約列入白名單，dapp 不應期望直接請求 7702 授權。相反地，整合應透過標準化的錢包介面進行：

- **ERC-5792 (`wallet_sendCalls`)**：使 dapp 能夠請求錢包執行批次呼叫，從而促進交易批次處理和燃料抽象化等功能。

- **ERC-6900**：允許 dapp 透過錢包管理的模組來利用模組化智能帳戶功能，例如工作階段金鑰和帳戶復原。

透過利用這些介面，dapp 可以存取由 EIP-7702 提供的智能帳戶功能，而無需直接管理委託，從而確保在不同錢包實作中的相容性和安全性。

> 注意：目前沒有標準化的方法讓 dapp 直接請求 7702 授權簽章。dapp 必須依賴特定的錢包介面（如 ERC-6900）來利用 EIP-7702 的功能。

更多資訊：

- [ERC-5792 規範](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [ERC-6900 規範](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**避免供應商鎖定**：與上述一致，一個好的實作應該是供應商中立且可互操作的。這通常意味著要遵守新興的智能帳戶標準。例如，[Alchemy 的 Modular Account](https://github.com/alchemyplatform/modular-account) 使用 ERC-6900 標準來建立模組化智能帳戶，並在設計時考慮了「無需許可的可互操作的使用」。

**隱私保護**：雖然鏈上隱私有限，但委託合約應努力將資料暴露和可連結性降至最低。這可以透過支援以 ERC-20 代幣支付燃料（因此使用者無需維持公開的 ETH 餘額，這改善了隱私和使用者體驗）以及一次性工作階段金鑰（減少對單一長期金鑰的依賴）等功能來實現。例如，EIP-7702 允許透過贊助交易以代幣支付燃料，而一個好的實作將使其易於整合此類代付合約，而不會洩漏不必要的資訊。此外，某些授權的鏈下委託（使用在鏈上驗證的簽章）意味著使用者的主要金鑰進行的鏈上交易更少，這有助於隱私。需要使用中繼者的帳戶會迫使使用者透露其 IP 地址。公共記憶體池改善了這一點，當交易/用戶操作在記憶體池中傳播時，您無法分辨它是源自發送它的 IP，還是僅透過 p2p 協定中繼。

**擴充性與模組化安全**：帳戶實作應該是可擴充的，以便它們可以隨著新功能和安全性改進而發展。EIP-7702 本質上支援可升級性（因為 EOA 始終可以在未來委託給新合約以升級其邏輯）。除了可升級性之外，良好的設計還允許模組化——例如，用於不同簽章方案或支出策略的外掛模組——而無需完全重新部署。Alchemy 的 Account Kit 是一個很好的例子，它允許開發人員安裝驗證模組（用於 ECDSA、BLS 等不同簽章類型）和用於自訂邏輯的執行模組。為了在啟用 EIP-7702 的帳戶中實現更大的靈活性和安全性，鼓勵開發人員委託給代理合約，而不是直接委託給特定的實作。這種方法允許無縫升級和模組化，而無需為每次變更進行額外的 EIP-7702 授權。

代理模式的好處：

- **可升級性**：透過將代理指向新的實作合約來更新合約邏輯。

- **自訂初始化邏輯**：在代理中整合初始化函式，以安全地設定必要的狀態變數。

例如，[SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) 展示了如何利用代理在相容 EIP-7702 的帳戶中安全地初始化和管理委託。

代理模式的缺點：

- **依賴外部參與者**：您必須依賴外部團隊不升級到不安全的合約。

## 安全性考量 {#security-considerations}

**重入保護**：隨著 EIP-7702 委託的引入，使用者的帳戶可以在外部擁有帳戶 (EOA) 和智能合約 (SC) 之間動態切換。這種靈活性使帳戶既能發起交易，又能成為呼叫的目標。因此，在帳戶呼叫自身並進行外部呼叫的場景中，`msg.sender` 將等於 `tx.origin`，這破壞了以前依賴 `tx.origin` 始終是 EOA 的某些安全性假設。

對於智能合約開發人員來說，假設 `tx.origin` 指的是 EOA 已經不再安全。同樣地，使用 `msg.sender == tx.origin` 作為防範重入攻擊的保護措施也不再是可靠的策略。

展望未來，開發人員在設計時應假設系統中的任何參與者都可能是智能合約。或者，他們可以使用帶有 `nonReentrant` 修飾符模式的重入保護來實作明確的重入保護。我們建議遵循經過稽核的修飾符，例如 [OpenZeppelin 的重入保護](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol)。他們也可以使用[暫時性儲存變數](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html)。

**初始化安全性考量**

實作 EIP-7702 委託合約會帶來特定的安全性挑戰，特別是關於初始化過程。當初始化函式 (`init`) 與委託過程原子性地耦合時，就會出現一個嚴重的漏洞。在這種情況下，搶跑者可能會攔截委託簽章並使用更改的參數執行 `init` 函式，從而可能控制該帳戶。

當嘗試將現有的智能合約帳戶 (SCA) 實作與 EIP-7702 一起使用而不修改其初始化機制時，這種風險尤其相關。

**減輕初始化漏洞的解決方案**

- 實作 `initWithSig`  
  將標準的 `init` 函式替換為要求使用者簽署初始化參數的 `initWithSig` 函式。這種方法確保初始化只能在使用者明確同意的情況下進行，從而減輕未經授權的初始化風險。

- 利用 ERC-4337 的 EntryPoint  
  要求初始化函式只能從 ERC-4337 EntryPoint 合約呼叫。此方法利用了 ERC-4337 提供的標準化驗證和執行框架，為初始化過程增加了一層額外的安全性。  
  _（請參閱：[Safe 文件](https://docs.safe.global/advanced/eip-7702/7702-safe)）_

透過採用這些解決方案，開發人員可以增強 EIP-7702 委託合約的安全性，防範在初始化階段潛在的搶跑攻擊。

**儲存衝突**：委託程式碼不會清除現有的儲存空間。當從一個委託合約遷移到另一個委託合約時，前一個合約的殘留資料仍然存在。如果新合約利用相同的儲存時槽但以不同方式解釋它們，則可能會導致意外行為。例如，如果最初的委託是給一個儲存時槽代表 `bool` 的合約，而隨後的委託是給一個相同時槽代表 `uint` 的合約，這種不匹配可能會導致不可預測的結果。

**網路釣魚風險**：隨著 EIP-7702 委託的實作，使用者帳戶中的資產可能完全由智能合約控制。如果使用者在不知情的情況下將其帳戶委託給惡意合約，攻擊者可以輕易獲得控制權並竊取資金。當使用 `chain_id=0` 時，委託將應用於所有鏈 ID。只委託給不可變的合約（絕不委託給代理），並且只委託給使用 CREATE2 部署的合約（使用標準的 initcode - 沒有變形合約），這樣部署者就無法在其他地方將不同的東西部署到相同的地址。否則，您的委託會使您的帳戶在所有其他 EVM 鏈上面臨風險。

當使用者執行委託簽章時，應清晰醒目地顯示接收委託的目標合約，以幫助減輕網路釣魚風險。

**最小化信任表面與安全性**：在提供靈活性的同時，委託合約應保持其核心邏輯最小化且可稽核。該合約實際上是使用者 EOA 的延伸，因此任何缺陷都可能是災難性的。實作應遵循智能合約安全社群的最佳實踐。例如，建構函式或初始化函式必須受到仔細保護——正如 Alchemy 所強調的，如果在 7702 下使用代理模式，未受保護的初始化函式可能會讓攻擊者接管帳戶。團隊應致力於保持鏈上程式碼簡單：Ambire 的 7702 合約只有大約 200 行 Solidity，刻意將複雜性降至最低以減少錯誤。必須在功能豐富的邏輯和易於稽核的簡單性之間取得平衡。

### 已知實作 {#known-implementations}

由於 EIP-7702 的性質，建議錢包在幫助使用者委託給第三方合約時要謹慎。以下列出了一些經過稽核的已知實作：

| 合約地址                           | 來源                                                                                                                                     | 稽核                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [稽核](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [稽核](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [稽核](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [稽核](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [以太坊基金會 AA 團隊](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [稽核](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [稽核](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## 硬體錢包指南 {#hardware-wallet-guidelines}

硬體錢包不應暴露任意委託。硬體錢包領域的共識是使用受信任的委託合約清單。我們建議允許上述列出的已知實作，並逐案考慮其他實作。由於將您的 EOA 委託給合約會賦予對所有資產的控制權，因此硬體錢包在實作 7702 的方式上應保持謹慎。

### 配套應用程式的整合場景 {#integration-scenarios-for-companion-apps}

#### 消極 {#lazy}

由於 EOA 仍照常運作，因此無需執行任何操作。

注意：某些資產可能會被委託程式碼自動拒絕，例如 ERC-1155 NFT，支援團隊應意識到這一點。

#### 感知 {#aware}

透過檢查其程式碼，通知使用者 EOA 已設定委託，並可選擇提供移除委託的功能。

#### 常見委託 {#common-delegation}

硬體供應商將已知的委託合約列入白名單，並在軟體配套程式中實作對它們的支援。建議選擇完全支援 ERC-4337 的合約。

委託給不同合約的 EOA 將作為標準 EOA 處理。

#### 自訂委託 {#custom-delegation}

硬體供應商實作自己的委託合約，將其新增至清單中，並在軟體配套程式中實作其支援。建議建立一個完全支援 ERC-4337 的合約。

委託給不同合約的 EOA 將作為標準 EOA 處理。