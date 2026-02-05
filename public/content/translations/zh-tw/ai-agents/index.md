---
title: AI 代理
metaTitle: AI agents | 以太坊上的 AI agents
description: 以太坊上的 AI agents 總覽
lang: zh-tw
template: use-cases
emoji: ":robot:"
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: 人們聚集電腦終端機桌前
summaryPoint1: 與區塊鏈交互並獨立交易的AI
summaryPoint2: 控制鏈上錢包與資金
summaryPoint3: 雇傭人類或其他智能體工作
buttons:
  - content: 什麽是 AI agents？
    toId: what-are-ai-agents
  - content: 探索智能體
    toId: ai-agents-on-ethereum
    isSecondary: false
---

想像一下，你可以藉助一個 AI 助手瀏覽以太坊，它可以 24 小時 / 7 天研究鏈上市場趨勢、回答問題，甚至代替你執行交易。 歡迎來到旨在簡化數字生活的 AI 智能體系統的世界。

在以太坊上，我們正見證 AI 智能體的創新 —— 從虛擬網紅、自主內容創作者到實時市場分析平台，這些創新透過提供洞見、娛樂體驗和運營效率，賦能廣大用戶。

## 什麽是 AI agents？ {#what-are-ai-agents}

AI 智能體是使用人工智慧來執行任務或做出自主決策的軟件程序/軟體。 它們從數據中學習，能適應變化，並可以處理複雜任務。 它們無休止地運行，並可以即刻發現機會。

### AI智能體如何與區塊鏈協作 {#how-ai-agents-work-with-blockchains}

在傳統金融中，AI 智能體常常在中心化的環境中運行，獲取的數據輸入有限。 這阻礙了他們學習或自主管理資產的能力。

相比之下，以太坊生態系統提供了一些關鍵優勢：

- <strong>透明的數據：</strong> 訪問實時區塊鏈信息。
- <strong>真實資產所有權：</strong> 數字資產完全由AI智能體所有。
- <strong>强大的鏈上功能：</strong> 允許 AI 智能體執行交易、與智能合約交互、提供流動性，並進行跨協議合作。

這些因素把AI智能體從簡單的機器人變成動態的、自主改進的系統，這提供了跨越衆多領域的重要價值：

<CardGrid>
  <Card title="自動化 DeFi" emoji=":money_with_wings:" description="AI 代理會密切關注市場趨勢、執行交易並管理投資組合，讓複雜的 DeFi 世界變得更加平易近人。"/>
  <Card title="新 AI 代理經濟" emoji="🌎" description="AI 代理可以僱用其他具備不同技能的代理（或人類），為它們執行專門的任務。" />
  <Card title="風險管理" emoji="🛠️" description="透過監控交易活動，AI 代理可以更快、更好地幫助您識別詐騙並保護您的數位資產。" />
</CardGrid>

## 可驗證的 AI {#verifiable-ai}

在鏈外運作的 AI 代理通常表現得像「黑盒子」——其推理、輸入和輸出無法獨立驗證。 以太坊改變了這一點。 透過將代理的行為錨定在鏈上，開發者可以建立 _免信任_、_透明_ 且 _經濟自主的_ 代理。 這些代理的行為可以被審核、約束和證明。

### 可驗證的推理 {#verifiable-inference}

AI 推理傳統上在鏈外進行，那裡的執行成本較低，但模型執行不透明。 在以太坊上，開發者可以使用多種技術將代理與可驗證的計算配對：

- [**zkML (零知識機器學習)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) 讓代理能夠證明模型已正確執行，而無需揭露模型或輸入
- [**TEE (可信任執行環境) 證明**](https://en.wikipedia.org/wiki/Trusted_execution_environment) 允許硬體支援的證明，證明代理運行了特定的模型或程式碼路徑
- **鏈上不可變性**確保這些證明可以被任何合約或代理引用、重播和信任

## 使用 x402 的付款與商業活動 {#x402}

部署在以太坊和 L2 上的 [x402 協定](https://www.x402.org/) 為代理提供了一種原生方式來支付資源費用，並在沒有人為干預的情況下進行經濟互動。 代理可以：

- 使用穩定幣支付運算、資料和 API 呼叫的費用
- 請求或驗證來自其他代理或服務的證明
- 參與代理對代理的商業活動，買賣運算、資料或模型輸出

x402 將以太坊轉變為自主代理的可程式化經濟層，實現按次付費的互動，而非帳戶、訂閱或集中式計費。

### 代理金融安全性 {#agentic-finance-security}

自主代理需要護欄。 以太坊在錢包和合約層級提供這些護欄：

- [智能帳戶 (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) 讓開發者能夠強制執行支出限制、白名單、會話金鑰和細微性的權限
- 智能合約中的程式化限制可以限制代理被允許執行的操作
- 基於推理的限制 (例如，在執行高風險操作前要求提供 zkML 證明) 增加了另一層安全保障

這些控制措施使得部署並非無限制的自主代理成為可能。

### 鏈上註冊表：ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) 是一個新興的標準 (目前正在進行同儕審查)，它提議為代理的身分、能力和證明建立鏈上註冊表。

如果被採用，它可以提供：

- 一個共享的、免信任的代理目錄
- 標準化的證明格式
- 一個直接在以太坊主網上為「免信任代理基礎設施」而設的基礎

這將使代理更容易在完全去中心化的環境中互相發現、驗證和交易。

## 以太坊上的AI智能體{#ai-agents-on-ethereum}

我們正開始探索 AI 智能體的全部潛力，而且已經有項目在人工智慧和區塊鏈之間發揮協同效應 —— 特別是在透明度和貨幣化方面。

<AiAgentProductLists list="ai-agents" />

<strong>Luna 首次作為播客嘉賓亮相 </strong>

<YouTube id="ZCsOMxnIruA" />

## 由智能體控制的錢包{#agent-controlled-wallets}

像 Luna 或 AIXBT 這樣的智能代理控制著自己的鏈上錢包（AIXBT 錢包、Luna 錢包）(https://clusters.xyz/aixbt), [Luna的錢包](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43))，使它們能夠給粉絲打賞並參與經濟活動。

在 Luna 的 X 社交媒體營銷活動 #LunaMuralChallenge 期間，Luna 透過她的 Base 錢包選出並獎勵了贏家 —— 這標誌著 <strong>對AI 所僱傭人類進行加密獎勵的案例首次出現 </strong>。

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>建議須知</strong></p>
<p className="mt-2">AI智能體及其相關工具仍然處於早期發展且實驗性階段，要謹慎使用。</p>
</AlertContent>
</Alert>

## 在使用智能體聊天指令時要管好錢包。{#control-your-wallet-using-chat-commands}

你可以跳過去中心化金融的複雜交互界面，用簡單的智能體聊天指令管理加密貨幣。

這種直觀路徑使得交易更快、更簡單、更少導致像把資金轉向錯誤地址或過度付費之類的錯誤。

<AiAgentProductLists list="chat" />

## AI智能體 VS AI網路機器程序 {#ai-agents-vs-ai-bots}

AI智能體與AI網路機器程序的區別可以在有些時候變得令人迷惑，因爲二者都以輸入為基礎自動行動。

- AI網路機器程序像自動助手，他們遵循特定的預編程指示來執行例行程序任務。
- AI智能體更像具有智慧的同伴，他們從經驗中學習、可以適應新的信息，並依靠他們自己做出決定。

|          | AI 代理              | AI網路機器程序       |
| -------- | ------------------ | -------------- |
| **交互**   | 複雜的、可適應的、自主的       | 簡單的、預設範圍的、難編程的 |
| **學習**   | 持續學習、可以實驗並適應新的即時數據 | 通過預訓練數據或固定規則運作 |
| **任務完成** | 旨在實現更廣汎目的          | 僅僅聚焦特定目的       |

## 更深入探索 {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## 你可以構建自己的AI智能體 {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />
