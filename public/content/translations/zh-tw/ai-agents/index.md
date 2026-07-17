---
title: "AI 代理"
metaTitle: "AI 代理 | 以太坊上的 AI 代理"
description: "以太坊上的 AI 代理概覽"
lang: zh-tw
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: "聚集在終端桌旁的人們"
summaryPoints:
  - "與區塊鏈互動並獨立交易的 AI"
  - "控制鏈上錢包與資金"
  - "僱用人類或其他代理來工作"
buttons:
  - content: 什麼是 AI 代理？
    toId: what-are-ai-agents
  - content: 探索代理
    toId: ai-agents-on-ethereum
    isSecondary: false
---

想像一下，在以太坊上有一位 AI 助理為您導航，它全天候 24 小時研究鏈上市場趨勢、回答問題，甚至代您執行交易。歡迎來到 AI 代理的世界——這些智慧系統旨在簡化您的數位生活。

在以太坊上，我們看到了 AI 代理的創新，從虛擬網紅、自主內容創作者到即時市場分析平台，透過提供洞察、娛樂和營運效率來賦能使用者。

## 什麼是 AI 代理？ {#what-are-ai-agents}

AI 代理是使用人工智慧來執行任務或自行做出決策的軟體程式。它們從資料中學習、適應變化並處理複雜的任務。它們不間斷地運作，並能立即察覺機會。

### AI 代理如何與區塊鏈協作 {#how-ai-agents-work-with-blockchains}

在傳統金融中，AI 代理通常在資料輸入有限的中心化環境中運作。這阻礙了它們自主學習或管理資產的能力。

相比之下，以太坊的去中心化生態系統提供了幾個關鍵優勢：

- <strong>透明的資料：</strong>存取即時的區塊鏈資訊。
- <strong>真正的資產所有權：</strong>數位資產完全由 AI 代理擁有。
- <strong>強大的鏈上功能：</strong>使 AI 代理能夠執行交易、與智能合約互動、提供流動性，並跨協定進行協作。

這些因素將 AI 代理從簡單的機器人轉變為動態、自我完善的系統，在多個領域提供顯著的價值：

<Grid>
  <Card title="自動化 DeFi" emoji=":money_with_wings:" description="AI 代理密切關注市場趨勢、執行交易並管理投資組合，讓複雜的 DeFi 世界變得更加平易近人。"/>
  <Card title="全新 AI 代理經濟" emoji="🌎" description="AI 代理可以聘請具備不同技能的其他代理（或人類）來為其執行專業任務。" />
  <Card title="風險管理" emoji="🛠️" description="透過監控交易活動，AI 代理能協助識別詐騙，並更好、更快地保護您的數位資產。" />
</Grid>

## 可驗證的 AI {#verifiable-ai}

在鏈下運作的 AI 代理通常表現得像「黑盒子」——它們的推理、輸入和輸出無法被獨立驗證。以太坊改變了這一點。透過將代理行為錨定在鏈上，開發人員可以建立_無須信任_、_透明_且_經濟自主_的代理。此類代理的行為可以被稽核、約束和證明。

### 可驗證的推論 {#verifiable-inference}

AI 推論傳統上發生在鏈下，那裡的執行成本低廉，但模型執行是不透明的。在以太坊上，開發人員可以使用幾種技術將代理與可驗證的運算結合：

- [**zkML（零知識機器學習）**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04)讓代理能夠證明模型已正確執行，而無須揭露模型或輸入
- [**TEE（可信賴執行環境）證明**](https://en.wikipedia.org/wiki/Trusted_execution_environment)允許硬體支援的證明，證明代理執行了特定的模型或程式碼路徑
- <strong>鏈上不可竄改性</strong>確保這些證明和憑證可以被任何合約或代理參考、重播和信任

## 使用 x402 進行支付與商業活動 {#x402}

部署在以太坊和 L2 上的 [x402 協定](https://www.x402.org/)，為代理提供了一種原生的方式來支付資源費用並在沒有人類干預的情況下進行經濟互動。代理可以：

- 使用穩定幣支付運算、資料和 API 呼叫的費用
- 向其他代理或服務請求或驗證證明
- 參與代理對代理的商業活動，買賣運算、資料或模型輸出

x402 將以太坊轉變為自主代理的可程式化經濟層，實現按使用量付費的互動，而不是帳戶、訂閱或中心化計費。

### 代理金融安全 {#agentic-finance-security}

自主代理需要護欄。以太坊在錢包和合約層面提供了這些護欄：

- [智能帳戶 (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337)讓開發人員能夠強制執行支出限制、白名單、工作階段金鑰和精細的權限
- 智能合約中的程式化約束可以限制代理被允許執行的操作
- 基於推論的限制（例如，在執行高風險操作之前需要 zkML 證明）增加了另一層安全性

這些控制措施使得部署受約束的自主代理成為可能。

### 鏈上註冊表：ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) 定義了用於代理身分、聲譽和驗證的鏈上註冊表。它由梅塔馬斯克、以太坊基金會、Google 和 Coinbase 的貢獻者共同編寫，並部署在包括以太坊主網、Base、Polygon、Arbitrum 等 16 個網路上。

它提供了：

- 用於可攜式、抗審查代理識別碼的**身分註冊表**
- 用於跨應用程式標準化回饋訊號的**聲譽註冊表**
- 用於請求獨立驗證（zkML、TEE、質押重新執行）的**驗證註冊表**

ERC-8004 使代理更容易在完全去中心化的環境中相互發現、驗證和交易。

## 以太坊上的 AI 代理 {#ai-agents-on-ethereum}

我們正開始探索 AI 代理的全部潛力，而各專案已經在利用 AI 和區塊鏈之間的綜效——特別是在透明度和貨幣化方面。

<AiAgentProductLists list="ai-agents" />

<strong>Luna 首次作為 Podcast 嘉賓亮相</strong>

<VideoWatch slug="ai-agents-interview-luna" />

## 代理控制的錢包 {#agent-controlled-wallets}

像 Luna 或 AIXBT 這樣的代理控制著自己的鏈上錢包（[AIXBT 的錢包](https://clusters.xyz/aixbt)、[Luna 的錢包](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)），使它們能夠給粉絲小費並參與經濟活動。

在 Luna 的 X 社群活動 #LunaMuralChallenge 期間，Luna 透過她的 Base 錢包選出並獎勵了獲勝者——這標誌著<strong>AI 首次為了加密貨幣獎勵而僱用人類的實例</strong>。

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>溫馨提示</strong></p>
<p className="mt-2">AI 代理及相關工具仍處於早期開發階段，且極具實驗性質——請謹慎使用。</p>
</AlertContent>
</Alert>

## 使用聊天指令控制您的錢包 {#control-your-wallet-using-chat-commands}

您可以跳過去中心化金融 (DeFi) 複雜的介面，並使用簡單的聊天指令來管理您的加密貨幣。

這種直覺的方法使交易更快、更容易，並且不易發生將資金發送到錯誤地址或超付手續費等錯誤。

<AiAgentProductLists list="chat" />

## AI 代理與 AI 機器人 {#ai-agents-vs-ai-bots}

AI 代理和 AI 機器人之間的區別有時可能會令人困惑，因為兩者都會根據輸入執行自動化操作。

- AI 機器人就像自動化助理——它們遵循特定的、預先編寫好程式的指令來執行例行任務。
- AI 代理更像是智慧伴侶——它們從經驗中學習、適應新資訊，並自行做出決策。

|                     | AI 代理                                                              | AI 機器人                                     |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **互動**    | 複雜、具適應性、自主                                         | 簡單、預先定義的範圍、寫死在程式碼中        |
| **學習**        | 持續學習，可以實驗並即時適應新資料 | 根據預先訓練的資料或固定規則運作 |
| **任務完成** | 旨在實現更廣泛的目標                                     | 僅專注於特定任務              |

## 深入了解 {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## 您可以建立自己的 AI 代理 {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />