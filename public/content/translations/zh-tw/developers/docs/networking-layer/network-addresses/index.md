---
title: 網路地址（Network addresses）
description: 網路地址簡介
lang: zh-tw
sidebarDepth: 2
---

以太坊節點必須使用一些基本資訊識別自身，以連接對等節點。 為了確保任何潛在對等節點都能解釋該資訊，需要使用任何以太網節點都能理解的三種標準化格式中的一種進行轉送：Multiaddr、Enode 或以太坊節點記錄 (ENR)。 以太坊節點紀錄 (ENR) 是目前的以太坊網路地址標準。

## 先備知識 {#prerequisites}

要理解本頁內容，需具備一些以太坊[網路層](/developers/docs/networking-layer/)的基本知識。

## Multiaddr {#multiaddr}

原始以太坊節點地址的格式為「multiaddr」（簡稱「多重地址」）。 Multiaddr 是為點對點網絡設計的通用格式。 這些地址利用鍵值配對表示，其中的鍵與值以斜線分隔。 例如，對於一個 IPv4 地址為 `192.168.22.27`、監聽傳輸控制通訊協定 (TCP) 連接埠 `33000` 的節點，其 Multiaddr 可以表示為：

`/ip4/192.168.22.27/tcp/33000`

若以太坊節點為例，含有節點 ID（其公鑰的雜湊值）的 Multiaddr 可以表示為：

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode 使得以太坊節點可以用統一資源定位器地址格式識別。 在統一資源定位器的使用者名稱部分編碼十六進位的節點 ID，並使用 @ 將其與主機名稱分開。 主機名稱只能使用 IP 地址表示；不能使用網域名稱服務名稱。 主機名稱部分的連接埠是傳輸控制通訊協定 (TCP) 監聽連接埠。 如果傳輸控制通訊協定 (TCP) 與使用者資料包通訊協定 (UDP) 連接埠不同，則使用者資料包通訊協定 (UDP) 連接埠必須宣告為查詢參數「discport」。

下述範例中，節點統一資源定位器由 IP 地址 `10.3.58.6`、傳輸控制通訊協定 (TCP) 連接埠 `30303` 以及使用者資料包通訊協定 (UDP) 探索連接埠 `30301` 組成。

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## 以太坊節點紀錄 (ENR) {#enr}

以太坊節點紀錄 (ENR) 是目前以太坊網路地址的標準化格式。 它取代了 Multiaddr 與 Encode 格式， 並允許節點間更大量的資訊交換，這一點尤其有用。 以太坊節點紀錄包含簽章、序列編號和多個欄位，這些欄位詳細說明用於產生和驗證簽章的身分識別方案。 以太坊節點紀錄也可以填入任意組織為鍵值配對形式的資料。 這些鍵值配對包含節點的 IP 地址以及節點能使用的子通訊協定相關資訊。 共識用戶端使用一種[特定的以太坊節點記錄結構](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure)來識別引導節點，並且也包含一個 `eth2` 欄位，其中包含有關目前以太坊分叉和證明八卦子網路（該子網路將節點連線到一組已將其證明彙總到一起的特定對等方）的資訊。

## 衍生閱讀 {#further-reading}

- [EIP-778：以太坊節點記錄 (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [以太坊中的網路地址](https://dean.eigenmann.me/blog/2020/01/21/network-addresses-in-ethereum/)
- [LibP2P：Multiaddr-Enode-ENR？！](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
