---
title: "網路地址"
description: "網路地址簡介。"
lang: zh-tw
sidebarDepth: 2
---

[以太坊](/)節點必須使用一些基本資訊來識別自己，以便連接到對等節點。為了確保任何潛在的對等節點都能解讀這些資訊，它會以任何以太坊節點都能理解的三種標準化格式之一進行中繼：multiaddr、enode 或以太坊節點記錄 (ENR)。ENR 是目前以太坊網路地址的標準。

## 先決條件 {#prerequisites}

需要對以太坊的[網路層](/developers/docs/networking-layer/)有所了解才能理解此頁面。

## Multiaddr {#multiaddr}

最初的以太坊節點地址格式是「multiaddr」（「multi-addresses」的縮寫）。Multiaddr 是專為點對點網路設計的通用格式。地址表示為鍵值對，鍵和值之間用正斜線分隔。例如，IPv4 地址為 `192.168.22.27` 且監聽 TCP 埠 `33000` 的節點的 multiaddr 如下所示：

`/ip4/192.168.22.27/tcp/33000`

對於以太坊節點，multiaddr 包含節點 ID（其公鑰的雜湊）：

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

enode 是一種使用 URL 地址格式來識別以太坊節點的方法。十六進位的節點 ID 被編碼在 URL 的使用者名稱部分，並使用 @ 符號與主機分隔。主機名稱只能以 IP 地址的形式提供；不允許使用 DNS 名稱。主機名稱部分的埠是 TCP 監聽埠。如果 TCP 和 UDP（節點發現）埠不同，則 UDP 埠會被指定為查詢參數「discport」。

在以下範例中，節點 URL 描述了一個 IP 地址為 `10.3.58.6`、TCP 埠為 `30303` 且 UDP 節點發現埠為 `30301` 的節點。

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## 以太坊節點記錄 (ENR) {#enr}

以太坊節點記錄 (ENR) 是以太坊上網路地址的標準化格式。它們取代了 multiaddr 和 enode。這些記錄特別有用，因為它們允許節點之間進行更多的資訊交換。ENR 包含簽章、序號以及詳細說明用於產生和驗證簽章的身分方案的欄位。ENR 也可以填入組織為鍵值對的任意資料。這些鍵值對包含節點的 IP 地址以及有關節點能夠使用的子協定的資訊。共識客戶端使用[特定的 ENR 結構](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)來識別啟動節點，並包含一個 `eth2` 欄位，其中包含有關目前以太坊分叉和證明 gossip 子網的資訊（這會將節點連接到一組特定的對等節點，這些對等節點的證明會被聚合在一起）。

## 延伸閱讀 {#further-reading}

- [EIP-778：以太坊節點記錄 (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [libp2p：Multiaddr-Enode-ENR？！](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)