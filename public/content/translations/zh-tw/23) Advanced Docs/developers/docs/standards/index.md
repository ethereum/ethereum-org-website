---
title: 以太坊開發標準
description:
lang: zh-tw
incomplete: true
---

## 標準概覽 {#standards-overview}

以太坊社群導入許多標準幫助其多項計畫(例如[以太坊客戶](/developers/docs/nodes-and-clients/)及錢包), 並確保智慧型合約與Dapp互通性.

常見標準稱為[Ethereum 改進提案](/eips/) (EIP), 由社群成員透過[標準的討論過程](https://eips.ethereum.org/EIPS/eip-1)確定。

- [EIP 簡介](/eips/)
- [EIP 列表](https://eips.ethereum.org/)
- [EIP GItHub 程式碼庫](https://github.com/ethereum/EIPs)
- [EIP 討論板](https://ethereum-magicians.org/c/eips)
- [以太坊管制導論](/governance/)
- [Ethereum Governance Overview](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _March 31, 2019 - Boris Mann_
- [以太坊共識管理發展及網路合作更新](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _March 23, 2020 - Hudson Jameson_
- [以太坊核心開發會議者播放列](https://www.youtube.com/@EthereumProtocol) _(YouTube Playlist)_

## 標準種類 {#types-of-standards}

EIP 有三種類別：

- 標準類別：任何影響多數或全部以太坊實作的改變
- [元類別](https://eips.ethereum.org/meta)：描述與以太坊相關的進程（process），或是提議改變一個進程
- [資訊類別](https://eips.ethereum.org/informational)：以太坊的設計問題、關於以太坊社群的資訊或一般指導原則

此外，標準類別還能被細分為四個子類別：

- [核心](https://eips.ethereum.org/core)：需要共識層級的分叉的改進
- [網路](https://eips.ethereum.org/networking)：關於 devp2p、Light Ethereum Subprotocol、whisper 和 swarm 網路協議規範的改進
- [介面](https://eips.ethereum.org/interface)：關於用戶端應用程式介面（API）／RPC 及標準的改進，以及語言級別的標準，如程式方法名稱及合約的 ABI
- [ERC（以太坊評論請求）](https://eips.ethereum.org/erc)：應用層的標準與慣例

更多這些不同類別的詳細資訊，詳見[EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### 權杖標準 {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) -- 一標準互動介面為同質性(可替代) 代幣, 例如投票代幣, 質押代幣, 或虛擬代幣.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/)：一同質化代幣標準，讓代幣能與以太幣一樣，支援收受代幣端（合約）在接收到代幣轉帳時進行邏輯的處理。
  - [ERC-1363](https://eips.ethereum.org/EIPS/eip-1363)：與 ERC-20 代幣相容的介面，支援代幣接收者在 transfer 與 transferFrom 兩方法被調用後、及被授權代幣操作者在 approve 方法被調用後的邏輯執行。
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - 非同質化代幣的標準接口，例如藝術品或歌曲的契約。
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309)：在單一或是許多 ERC-721 代幣創造與轉移時，合約事件（event）的標準化發布方法。
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400)：為 ERC-721 加入一“消費者／使用者”的擴充介面。
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907)：為 ERC-721 加入具時效性、有限權力的角色。
- [ERC-777](/developers/docs/standards/tokens/erc-777/)：**（不建議使用）** 一改進 ERC-20 的代幣標準。
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)：一兼容同質化、非同質化代幣的代幣標準。
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/)：一 ERC-20 代幣化的金庫（vault，通常指收受使用者存款進行保管或投資的智能合約）標準，以標準化、最佳化會產生利息的金庫的技術規範。

了解更多代幣標準的詳情 [ 代幣標準](/developers/docs/standards/tokens/)。

## 衍生閱讀 {#further-reading}

- [以太坊改進提案（ＥＩＰ）](/eips/)

_認識社區或社團資源能幫助大家學習更多? 歡迎自由編輯或添加於本頁!!_
