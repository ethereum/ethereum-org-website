---
title: "以太坊開發標準"
description: "了解以太坊標準，包括 EIPs、ERC-20 和 ERC-721 等代幣標準，以及開發慣例。"
lang: zh-tw
incomplete: true
---

## 標準概覽 {#standards-overview}

以太坊社群已採用多項標準，以利於專案（例如[以太坊用戶端](/developers/docs/nodes-and-clients/)與錢包）在不同實作之間保持互通性，並確保智慧合約與去中心化應用程式維持可組合性。

標準通常以[以太坊改進提案](/eips/) (EIP) 的形式提出，並由社群成員透過[標準程序](https://eips.ethereum.org/EIPS/eip-1)進行討論。

- [EIP 簡介](/eips/)
- [EIP 列表](https://eips.ethereum.org/)
- [EIP GitHub 儲存庫](https://github.com/ethereum/EIPs)
- [EIP 討論區](https://ethereum-magicians.org/c/eips)
- [以太坊管理體系簡介](/governance/)
- [以太坊管理體系概覽](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _2019 年 3 月 31 日 - Boris Mann_
- [以太坊協議開發管理體系與網路升級協調](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _2020 年 3 月 23 日 - Hudson Jameson_
- [所有以太坊核心開發者會議的播放清單](https://www.youtube.com/@EthereumProtocol) _(YouTube 播放清單)_

## 標準類型 {#types-of-standards}

EIP 有三種類別：

- 標準類別：任何影響多數或全部以太坊實作的改變
- [元類別](https://eips.ethereum.org/meta)：描述與以太坊相關的程序，或提議對程序進行變更
- [資訊類別](https://eips.ethereum.org/informational)：描述以太坊的設計問題，或向以太坊社群提供一般性的指導方針或資訊

此外，標準類別還能被細分為四個子類別：

- [核心](https://eips.ethereum.org/core)：需要共識分叉的改進
- [網路](https://eips.ethereum.org/networking)：關於 devp2p 和輕量級以太坊子協議的改進，以及對 whisper 和 swarm 網路協議規範的建議改進。
- [介面](https://eips.ethereum.org/interface)：關於用戶端 API/RPC 規範和標準的改進，以及某些語言層級的標準，例如方法名稱和合約 ABI。
- [ERC](https://eips.ethereum.org/erc)：應用程式層級的標準與慣例

關於這些不同類型和類別的更多詳細資訊，可在 [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types) 中找到

### 代幣標準 {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 一種適用於同質化（可互換）代幣的標準介面，例如投票代幣、質押代幣或虛擬貨幣。
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - 一種同質化代幣標準，讓代幣的行為與以太幣相同，並支援接收端處理代幣轉帳。
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - ERC-20 代幣的擴充介面，支援在單一交易中對接收方合約執行回呼。
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - 一種非同質化代幣的標準介面，例如藝術品或歌曲的契約。
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - 一種標準化事件，在使用連續的代幣識別碼建立/轉移一個或多個非同質化代幣時發出。
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - EIP-721 消費者角色的介面擴充。
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - 為 ERC-721 代幣新增具備受限權限且有時限的角色。
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(不建議使用)** 一種改進 ERC-20 的代幣標準。
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - 一種可同時包含同質化與非同質化資產的代幣標準。
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - 一種代幣化金庫標準，旨在最佳化和統一具收益金庫的技術參數。

深入了解[代幣標準](/developers/docs/standards/tokens/)。

## 延伸閱讀 {#further-reading}

- [以太坊改進提案 (EIP)](/eips/)

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_
