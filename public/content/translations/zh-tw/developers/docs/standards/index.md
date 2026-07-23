---
title: "以太坊開發標準"
description: "了解以太坊標準，包括 EIP、ERC-20 和 ERC-721 等代幣標準，以及開發慣例。"
lang: zh-tw
incomplete: true
---

## 標準概覽 {#standards-overview}

以太坊社群採用了許多標準，這些標準有助於保持專案（例如[以太坊用戶端](/developers/docs/nodes-and-clients/)和錢包）在不同實作之間是可互操作的，並確保智能合約和去中心化應用程式 (dapp) 保持可組合的。

通常，標準會以[以太坊改進提案](/eips/) (EIP) 的形式引入，社群成員會透過[標準流程](https://eips.ethereum.org/EIPS/eip-1)對其進行討論。

- [EIP 簡介](/eips/)
- [EIP 列表](https://eips.ethereum.org/)
- [EIP GitHub 儲存庫](https://github.com/ethereum/EIPs)
- [EIP 討論區](https://ethereum-magicians.org/c/eips)
- [以太坊治理簡介](/governance/)
- [以太坊治理概覽](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _2019 年 3 月 31 日 - Boris Mann_
- [以太坊協定開發治理與網路升級協調](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _2020 年 3 月 23 日 - Hudson Jameson_
- [所有以太坊核心開發者會議播放清單](https://www.youtube.com/@EthereumProtocol) _(YouTube 播放清單)_

## 標準類型 {#types-of-standards}

EIP 分為 3 種類型：

- 標準追蹤 (Standards Track)：描述任何影響大多數或所有以太坊實作的變更
- [元追蹤 (Meta Track)](https://eips.ethereum.org/meta)：描述圍繞以太坊的流程或提議對流程進行變更
- [資訊追蹤 (Informational Track)](https://eips.ethereum.org/informational)：描述以太坊設計問題，或向以太坊社群提供一般準則或資訊

此外，標準追蹤又細分為 4 個類別：

- [核心 (Core)](https://eips.ethereum.org/core)：需要共識分叉的改進
- [網路 (Networking)](https://eips.ethereum.org/networking)：圍繞 devp2p 和輕量級以太坊子協定 (Light Ethereum Subprotocol) 的改進，以及對 whisper 和蜂群 (Swarm) 網路協定規範的提議改進。
- [介面 (Interface)](https://eips.ethereum.org/interface)：圍繞用戶端 API/RPC 規範和標準的改進，以及某些語言層級的標準，例如方法名稱和合約 ABI。
- [ERC](https://eips.ethereum.org/erc)：應用程式層級的標準和慣例

有關這些不同類型和類別的更詳細資訊，請參閱 [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### 代幣標準 {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 同質化（可互換）代幣的標準介面，例如投票代幣、質押代幣或虛擬貨幣。
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - 一種同質化代幣標準，使代幣的行為與以太幣完全相同，並支援在接收方處理代幣轉帳。
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - ERC-20 代幣的擴充介面，支援在單筆交易中於接收方合約上執行回呼。
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - 非同質化代幣的標準介面，例如藝術品或歌曲的契約。
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - 使用連續的代幣識別碼建立/轉移一個或多個非同質化代幣時觸發的標準化事件。
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - 針對 EIP-721 消費者角色的介面擴充。
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - 為 ERC-721 代幣新增具有受限權限且有時間限制的角色。
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **（不推薦）** 對 ERC-20 進行改進的代幣標準。
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - 可同時包含同質化和非同質化資產的代幣標準。
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - 一種代幣化金庫標準，旨在最佳化並統一生息金庫的技術參數。

了解更多關於[代幣標準](/developers/docs/standards/tokens/)的資訊。

## 延伸閱讀 {#further-reading}

- [以太坊改進提案 (EIP)](/eips/)

_知道有什麼社群資源對您有幫助嗎？編輯此頁面並加入它！_